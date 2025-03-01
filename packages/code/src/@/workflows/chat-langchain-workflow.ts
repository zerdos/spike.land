import {
  ANTHROPIC_API_CONFIG,
  DEFAULT_RETURN_MODIFIED_CODE,
  MODEL_NAME,
} from "@/config/workflow-config";
import { md5 } from "@/lib/md5";
import { codeModificationTool } from "@/tools/code-modification-tools";
import { AgentState } from "@/types/chat-langchain";
import { WorkflowChannels, WorkflowContinueResult } from "@/types/workflow";
import { logCodeChanges, shouldReturnFullCode, verifyCodeIntegrity } from "@/utils/code-utils";
import {
  createCodeIntegrityError,
  handleWorkflowError,
  WorkflowError,
} from "@/utils/error-handlers";
import {
  extractToolResponseMetadata,
  handleMissingCodeResponse,
  updateToolCallsWithCodeFlag,
} from "@/utils/tool-response-utils";
import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { StateGraph } from "@langchain/langgraph/web";
import { MemorySaver } from "@langchain/langgraph/web";
import { v4 as uuidv4 } from "uuid";
import anthropicSystem from "../../config/initial-claude.txt";

export const createWorkflowWithStringReplace = (initialState: AgentState) => {
  const graphState: WorkflowChannels = {
    messages: {
      reducer: (prev: AIMessage[], next: AIMessage[]) => [...prev, ...next],
    },
    codeSpace: {
      reducer: (_prev: string, next: string) => next,
    },
    origin: {
      reducer: (_prev: string, next: string) => next,
    },
    code: {
      reducer: (prev: string, next: unknown) => {
        try {
          if (typeof next === "string") return next;

          if (typeof next === "object" && next !== null) {
            if ("content" in next && typeof next.content === "string") {
              try {
                const content = JSON.parse(next.content);
                if (content?.code && typeof content.code === "string") {
                  return content.code;
                }
                if (!content?.code && content?.documentHash) return prev;
              } catch (e) {
                // Continue if parsing fails
              }
            }

            if ("code" in next && typeof next.code === "string") {
              return next.code;
            }

            if (!("code" in next)) {
              if ("documentHash" in next) return prev;
            }
          }

          return prev;
        } catch (error) {
          console.error("Code reduction error:", error);
          throw new WorkflowError("Code reduction failed", { error, input: next });
        }
      },
    },
    lastError: {
      reducer: (prev: string, next: unknown) => {
        if (typeof next === "string") return next;
        if (typeof next === "object" && next !== null && "error" in next) {
          const err = (next as { error?: unknown }).error;
          return typeof err === "string" ? err : String(err);
        }
        return prev;
      },
    },
    isStreaming: {
      reducer: (_prev: boolean, next: boolean) => next,
    },
    debugLogs: {
      reducer: (prev: string[], next: string[]) => [...prev, ...next],
    },
    documentHash: {
      reducer: (_prev: string | undefined, next: string) => next,
    },
    filePath: {
      reducer: (_prev: string | undefined, next: string | undefined) => next,
    },
  };

  const tools = [codeModificationTool];
  const toolNode = new ToolNode(tools);

  const model = new ChatAnthropic({
    model: MODEL_NAME,
    anthropicApiKey: ANTHROPIC_API_CONFIG.apiKey,
    streaming: ANTHROPIC_API_CONFIG.streaming,
    anthropicApiUrl: ANTHROPIC_API_CONFIG.getApiUrl(initialState.origin),
    temperature: ANTHROPIC_API_CONFIG.temperature,
    maxTokens: ANTHROPIC_API_CONFIG.maxTokens,
  }).bindTools(tools);

  const processMessage = async (state: AgentState): Promise<Partial<AgentState>> => {
    try {
      if (state.documentHash && state.code) {
        const currentHash = md5(state.code);
        if (state.documentHash !== currentHash) {
          throw createCodeIntegrityError(
            "Code integrity",
            state.documentHash,
            currentHash,
            state.code.length,
          );
        }
      }

      if (state.code && state.code.length > 1000) {
        console.log(
          `Processing large code block (${state.code.length} chars)`,
        );
      }

      const cleanedState = { ...state, code: state.code };
      const lastMessage = state.messages[state.messages.length - 1];
      let returnModifiedCode = DEFAULT_RETURN_MODIFIED_CODE;

      if (lastMessage && !("content" in lastMessage)) {
        throw new WorkflowError("Invalid message format");
      }

      if (lastMessage && "tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls)) {
        for (const toolCall of lastMessage.tool_calls) {
          if (toolCall.name === "code_modification" && toolCall.args) {
            try {
              const args = typeof toolCall.args === "string"
                ? JSON.parse(toolCall.args)
                : toolCall.args;

              if (args.instructions) {
                returnModifiedCode = shouldReturnFullCode(args.instructions, state.code);
                cleanedState.debugLogs = [
                  ...(cleanedState.debugLogs || []),
                  `Optimization: ${
                    returnModifiedCode ? "Returning" : "Not returning"
                  } full code`,
                ];
                break;
              }
            } catch (e) {
              console.warn("Failed to parse tool call args", e);
            }
          }
        }
      }

      if (lastMessage && "tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls)) {
        const updatedToolCalls = updateToolCallsWithCodeFlag(
          lastMessage.tool_calls,
          returnModifiedCode,
        );
        const updatedLastMessage = { ...lastMessage, tool_calls: updatedToolCalls } as AIMessage;
        cleanedState.messages = [...state.messages.slice(0, -1), updatedLastMessage];
      }

      const response = await model.invoke(cleanedState.messages);

      const { documentHash, modifiedCodeHash, compilationError, codeWasReturned } =
        extractToolResponseMetadata(response, state);

      const updatedState = {
        ...cleanedState,
        messages: [response],
        isStreaming: true,
        documentHash,
      };

      if (!codeWasReturned && documentHash && documentHash !== state.documentHash) {
        const latestCode = await handleMissingCodeResponse(documentHash, state);
        if (latestCode) {
          updatedState.code = latestCode;
        }
      }

      if (compilationError) {
        console.warn("Compilation error detected", compilationError);
        throw new WorkflowError("Compilation error", { compilationError });
      }

      if (state.code !== updatedState.code && updatedState.code && !documentHash) {
        updatedState.documentHash = md5(updatedState.code);
      }

      if (
        updatedState.code && state.code === updatedState.code && state.code !== initialState.code
      ) {
        throw new WorkflowError("Code modification failed", {
          initialCodeLength: initialState.code.length,
          currentCodeLength: state.code.length,
        });
      }

      return updatedState;
    } catch (error) {
      const errorContext = {
        error,
        state: {
          codeLength: state.code?.length,
          documentHash: state.documentHash,
          hasMessages: state.messages?.length > 0,
        },
      };

      console.error("Error processing message:", errorContext);
      handleWorkflowError(error);
      throw error;
    }
  };

  const shouldContinue = async (state: AgentState): Promise<WorkflowContinueResult> => {
    if (state.lastError) return "end";
    const lastMessage = state.messages[state.messages.length - 1];
    return lastMessage instanceof AIMessage && lastMessage.tool_calls?.length
      ? "tools"
      : "end";
  };

  const workflow = new StateGraph({ channels: graphState })
    .addNode("process", processMessage)
    .addNode("tools", toolNode)
    .addEdge("__start__", "process")
    .addConditionalEdges("process", shouldContinue, {
      process: "process",
      tools: "tools",
      end: "__end__",
    })
    .addEdge("tools", "process");

  const app = workflow.compile({ checkpointer: new MemorySaver() });

  return {
    invoke: async (prompt: string) => {
      try {
        const systemMessage = new SystemMessage(anthropicSystem);
        const initialDocumentHash = md5(initialState.code);
        const { codeSpace } = initialState;
        const code = initialState.code;

        const initialStateWithMessages = {
          ...initialState,
          messages: [
            systemMessage,
            new HumanMessage({
              content: prompt + `
                <filePath>/live/${codeSpace}.tsx</filePath>
                <code>${code}</code>
                <documentHash>${initialDocumentHash}</documentHash>`,
              additional_kwargs: {
                code: initialState.code,
                documentHash: initialDocumentHash,
              },
            }),
          ],
          debugLogs: [
            ...(initialState.debugLogs || []),
            `Token-saving mode: ${
              DEFAULT_RETURN_MODIFIED_CODE ? "OFF" : "ON"
            }`,
          ],
        };

        const finalState = await app.invoke(initialStateWithMessages, {
          configurable: { thread_id: uuidv4() },
        });

        if (finalState.code !== initialState.code) {
          const finalDocumentHash = md5(finalState.code);
          if (!verifyCodeIntegrity(finalState.code, finalDocumentHash)) {
            throw createCodeIntegrityError(
              "Code integrity",
              initialState.documentHash,
              finalDocumentHash,
              finalState.code.length,
            );
          }

          finalState.documentHash = finalDocumentHash;
        }

        if (finalState.code !== initialState.code) {
          logCodeChanges(initialState.code, finalState.code);
        }
        return finalState;
      } catch (error) {
        if (error instanceof WorkflowError && error.message.includes("Code integrity")) {
          throw error;
        }
        handleWorkflowError(error);
        throw error;
      }
    },
  };
};