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

/**
 * Creates a workflow for processing code modifications using LangChain and Anthropic's Claude
 */
export const createWorkflowWithStringReplace = (initialState: AgentState) => {
  // Define state graph channels with type-safe reducers
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
          // Handle string responses directly
          if (typeof next === "string") return next;

          if (typeof next === "object" && next !== null) {
            // Handle tool response format
            if ("content" in next && typeof next.content === "string") {
              try {
                const content = JSON.parse(next.content);
                if (content?.code) return content.code;
                if (!content?.code && content?.documentHash) return prev;
              } catch (e) {
                // Continue with other checks if parsing fails
              }
            }

            if ("code" in next && next.code !== undefined) {
              return (next as { code: string; }).code;
            }

            if (!("code" in next) && "documentHash" in next) {
              return prev;
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
          const err = (next as { error?: unknown; }).error;
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

  // Initialize tool node with code modification capabilities
  const tools = [codeModificationTool];
  const toolNode = new ToolNode(tools);

  // Configure the language model
  const model = new ChatAnthropic({
    model: MODEL_NAME,
    anthropicApiKey: ANTHROPIC_API_CONFIG.apiKey,
    streaming: ANTHROPIC_API_CONFIG.streaming,
    anthropicApiUrl: ANTHROPIC_API_CONFIG.getApiUrl(initialState.origin),
    temperature: ANTHROPIC_API_CONFIG.temperature,
    maxTokens: ANTHROPIC_API_CONFIG.maxTokens,
  }).bindTools(tools);

  /**
   * Process incoming messages and manage code modifications
   */
  const processMessage = async (state: AgentState): Promise<Partial<AgentState>> => {
    try {
      // Early integrity check for corrupted states
      if (state.documentHash && state.code) {
        const currentHash = md5(state.code);
        // Always verify integrity and throw if there's a mismatch
        if (state.documentHash !== currentHash) {
          throw createCodeIntegrityError(
            "Code integrity",
            state.documentHash,
            currentHash,
            state.code.length,
          );
        }
      }

      // Performance optimization for large code blocks
      if (state.code && state.code.length > 1000) {
        console.log(
          `Performance optimization: Processing large code block (${state.code.length} chars)`,
        );
      }

      const cleanedState = { ...state, code: state.code };
      const lastMessage = state.messages[state.messages.length - 1];
      let returnModifiedCode = DEFAULT_RETURN_MODIFIED_CODE;

      // Handle corrupted message state
      if (lastMessage && !("content" in lastMessage)) {
        throw new WorkflowError("Code integrity violation: Invalid message format");
      }

      // Analyze tool calls to determine if we should return code
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
                  } full code based on change analysis`,
                ];
                break;
              }
            } catch (e) {
              console.warn("Failed to parse tool call args", e);
            }
          }
        }
      }

      // Update tool calls with returnModifiedCode parameter
      if (lastMessage && "tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls)) {
        lastMessage.tool_calls = updateToolCallsWithCodeFlag(
          lastMessage.tool_calls,
          returnModifiedCode,
        );
      }

      // Process the message with the model
      const response = await model.invoke(cleanedState.messages);

      // Extract metadata from tool response
      const { documentHash, modifiedCodeHash, compilationError, codeWasReturned } =
        extractToolResponseMetadata(response, state);

      // Update state with response data
      const updatedState = {
        ...cleanedState,
        messages: [response],
        isStreaming: true,
        documentHash,
      };

      // Handle case where code wasn't returned
      if (!codeWasReturned && documentHash && documentHash !== state.documentHash) {
        const latestCode = await handleMissingCodeResponse(documentHash, state);
        if (latestCode) {
          updatedState.code = latestCode;
        }
      }

      // Handle compilation errors
      if (compilationError) {
        console.warn("Compilation error detected", compilationError);
        throw new WorkflowError("failed to compile: syntax error", { compilationError });
      }

      // Generate new hash if code changed but no hash was provided
      if (state.code !== updatedState.code && updatedState.code && !documentHash) {
        updatedState.documentHash = md5(updatedState.code);
        console.log(
          "Performance optimization: Generated new document hash for modified code:",
          updatedState.documentHash,
        );
      }

      // Validate sequential changes
      if (
        updatedState.code && state.code === updatedState.code && state.code !== initialState.code
      ) {
        throw new WorkflowError("Code modification failed to apply changes", {
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

      console.error("Error processing message:", { errorContext });

      handleWorkflowError(error);
      throw error;
    }
  };

  // Define workflow continuation logic
  const shouldContinue = async (state: AgentState): Promise<WorkflowContinueResult> => {
    if (state.lastError) return "process";
    const lastMessage = state.messages[state.messages.length - 1];
    return lastMessage instanceof AIMessage && lastMessage.tool_calls?.length
      ? "tools"
      : "end";
  };

  // Create and compile the workflow
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

  // Return the invokable workflow
  return {
    invoke: async (prompt: string) => {
      try {
        // Create system message with initial code and hash
        const systemMessage = new SystemMessage(anthropicSystem);
        const initialDocumentHash = md5(initialState.code);

        // Add information about document hash versioning and token optimization to the prompt
        const enhancedPrompt =
          `${prompt}\n\nNote: Previous versions of code are mapped by document hashes. If compilation fails, you can fix with a new modification or roll back to a previous hash. For efficiency, the system may not always return the full code in responses to save tokens.`;

        const { codeSpace } = initialState;
        const code = initialState.code;
        const documentHash = initialDocumentHash;
        
        const initialStateWithMessages = {
          ...initialState,
          messages: [
            systemMessage,
            new HumanMessage(
              `${enhancedPrompt}
              
      <filePath>/live/${codeSpace}.tsx</filePath>
      <code>${code}</code>
      <documentHash>${documentHash}</documentHash>
              `, {
                code: initialState.code,
                documentHash: initialDocumentHash,
              },
            ),
          ],
          debugLogs: [
            ...(initialState.debugLogs || []),
            `Performance optimization: Token-saving mode enabled (${
              DEFAULT_RETURN_MODIFIED_CODE ? "OFF" : "ON"
            })`,
          ],
        };

        const finalState = await app.invoke(initialStateWithMessages, {
          configurable: { thread_id: uuidv4() },
        });

        // Verify final code integrity
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
          console.log("Code integrity verified with updated hash", {
            documentHash: finalDocumentHash,
            previousHash: initialState.documentHash,
          });
        }

        if (finalState.code !== initialState.code) {
          logCodeChanges(initialState.code, finalState.code);

          // Log performance optimization details
          const codeLength = finalState.code.length;
          if (codeLength > 1000) {
            console.log("Performance optimization: Processing large code block");
          }
          console.log(
            `Performance optimization: Code changes detected (${initialState.code.length} -> ${codeLength} chars)`,
          );
        }
        return finalState;
      } catch (error) {
        // If it's already a code integrity error, preserve it
        if (error instanceof WorkflowError && error.message.includes("Code integrity")) {
          throw error;
        }
        // For other errors, handle and re-throw
        handleWorkflowError(error);
        throw error;
      }
    },
  };
};
