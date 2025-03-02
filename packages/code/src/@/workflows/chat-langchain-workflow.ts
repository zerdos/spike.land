import {
  ANTHROPIC_API_CONFIG,
  DEFAULT_RETURN_MODIFIED_CODE,
  MODEL_NAME,
} from "@/config/workflow-config";
import { HandleSendMessageProps, ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { codeModificationTool } from "@/tools/code-modification-tools";
import { AgentState } from "@/types/chat-langchain";
import { WorkflowContinueResult } from "@/types/workflow";
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
import { hashCache, toolResponseCache } from "../../lib/caching";
import {  metrics } from "../../lib/metrics";
import { telemetry } from "../../lib/telemetry";
import { isRetryableError, withRetry } from "../../utils/retry";
import { messagesPush } from "@/lib/chat-utils";
import { Message } from "postcss";

const mod: {
  [codeSpace: string]: ReturnType<typeof createWorkflowWithStringReplace>;
} = {};

export const handleSendMessage = async (
  {messages, codeSpace, prompt, images, code }: HandleSendMessageProps, cSess: ICode
): Promise<void> => {
  const workflow = mod[codeSpace] || await createWorkflowWithStringReplace({
    code: code,
    codeSpace: codeSpace,
    origin: location.origin,
    lastError: "",
    isStreaming: false,
    messages: [],
    documentHash: md5(code)} ,cSess);
``
  mod[codeSpace] = workflow;

  const finalState = await workflow.invoke(prompt);

  console.log("Final workflow state:", finalState);
};

export const createWorkflowWithStringReplace = (initialState: AgentState, cSess: ICode) => {
  // Record workflow initialization
  telemetry.trackEvent("workflow.initialize", {
    codeLength: initialState.code?.length?.toString() || "0",
    codeSpace: initialState.codeSpace,
  });
  // Define local interfaces for type compatibility
  interface ExtendedAgentState extends AgentState {
    debugLogs?: string[];
  }

  // Define the tool response metadata interface locally
  interface ToolResponseMetadata {
    documentHash?: string;
    modifiedCodeHash?: string;
    compilationError?: string | boolean;
    codeWasReturned: boolean;
  }

  // Create the graph state with proper structure
  const graphState = {
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
    // Start performance tracking
    telemetry.startTimer("processMessage");
    const start = performance.now();
    try {
      if (state.documentHash && state.code) {
        // Use cached hash if available
        let currentHash: string;
        const cacheKey = state.code;

        const cachedHash = hashCache.get(cacheKey);
        if (cachedHash) {
          currentHash = cachedHash;
          metrics.recordOperation("hash.cache.hit", 0);
        } else {
          const hashStart = performance.now();
          currentHash = md5(state.code);
          const hashDuration = performance.now() - hashStart;
          metrics.recordOperation("hash.calculation", hashDuration);
          hashCache.set(cacheKey, currentHash);
        }

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
          `Performance optimization: Processing large code block (${state.code.length} chars)`,
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

      // Use retry mechanism for model invocation
      telemetry.startTimer("model.invoke");
      const response = await withRetry(
        () => model.invoke(cleanedState.messages),
        {
          maxRetries: 3,
          initialDelay: 1000,
          maxDelay: 10000,
          onRetry: (attempt, error, delay) => {
            telemetry.trackEvent("model.retry", {
              attempt: attempt.toString(),
              error: error.message,
              delay: delay.toString(),
            });
            console.warn(`Retrying model invocation (${attempt}/3) after error: ${error.message}`);
          },
        },
      );
      const modelDuration = telemetry.stopTimer("model.invoke");

      // Record model interaction metrics
      telemetry.trackModelInteraction({
        model: MODEL_NAME,
        promptTokens: 0, // We don't have access to token counts directly
        completionTokens: 0, // We don't have access to token counts directly
        duration: modelDuration || 0,
        success: true,
      });

      // Check cache for tool response metadata
      const responseKey = JSON.stringify({
        content: response.content,
        tool_calls: response.tool_calls,
      });

      let metadata: ToolResponseMetadata;
      const cachedResponse = toolResponseCache.get(responseKey);

      if (cachedResponse && "documentHash" in cachedResponse) {
        metadata = cachedResponse as ToolResponseMetadata;
        metrics.recordOperation("toolResponse.cache.hit", 0);
      } else {
        const metadataStart = performance.now();
        metadata = extractToolResponseMetadata(response, state);
        const metadataDuration = performance.now() - metadataStart;
        metrics.recordOperation("toolResponse.extraction", metadataDuration);

        // Cache the result with proper type conversion
        toolResponseCache.set(responseKey, {
          documentHash: metadata.documentHash,
          modifiedCodeHash: metadata.modifiedCodeHash,
          compilationError: !!metadata.compilationError,
          codeWasReturned: metadata.codeWasReturned,
        });
      }

      const { documentHash, modifiedCodeHash, compilationError, codeWasReturned } = metadata;

      // Save the AI response message to cSess
      if (response) {
        const currentMessages = cSess.getMessages();
        const aiMessageForChat = {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: typeof response.content === "string" ? response.content : "",
        };
         await   cSess.setMessages(messagesPush(cSess.getMessages(), aiMessageForChat));
      }

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
        throw new WorkflowError("failed to compile: syntax error");
      }

      if (state.code !== updatedState.code && updatedState.code && !documentHash) {
        // Use cached hash if available for the updated code
        const updatedCodeKey = updatedState.code;
        const cachedUpdatedHash = hashCache.get(updatedCodeKey);

        if (cachedUpdatedHash) {
          updatedState.documentHash = cachedUpdatedHash;
        } else {
          const hashStart = performance.now();
          updatedState.documentHash = md5(updatedState.code);
          const hashDuration = performance.now() - hashStart;
          metrics.recordOperation("hash.calculation", hashDuration);
          hashCache.set(updatedCodeKey, updatedState.documentHash);
        }
      }

      if (
        updatedState.code && state.code === updatedState.code && state.code !== initialState.code
      ) {
        throw new WorkflowError("Code modification failed", {
          initialCodeLength: initialState.code.length,
          currentCodeLength: state.code.length,
        });
      }

      // Record processing duration and success
      const duration = performance.now() - start;
      metrics.recordOperation("processMessage", duration);
      telemetry.stopTimer("processMessage", {
        codeModified: (state.code !== updatedState.code).toString(),
        codeLength: updatedState.code?.length?.toString() || "0",
      });

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

      // Record error in telemetry
      telemetry.trackError(error instanceof Error ? error : new Error(String(error)), {
        location: "processMessage",
        codeLength: state.code?.length?.toString() || "0",
        isRetryable: isRetryableError(error).toString(),
      });

      const duration = performance.now() - start;
      metrics.recordOperation("processMessage", duration, true);
      telemetry.stopTimer("processMessage", { success: "false" });

      console.error("Error processing message:", errorContext);
      handleWorkflowError(error);
      throw error;
    }
  };

  // Ensure the shouldContinue function is compatible with StateGraph
  const shouldContinue = async (state: any): Promise<WorkflowContinueResult> => {
    // Cast state to AgentState for type safety within the function
    const agentState = state as AgentState;
    if (agentState.lastError) return "end";
    const lastMessage = agentState.messages[agentState.messages.length - 1];
    return lastMessage instanceof AIMessage && lastMessage.tool_calls?.length
      ? "tools"
      : "end";
  };

  // Use type assertion to bypass TypeScript type checking for StateGraph initialization
  const workflow = new StateGraph({ channels: graphState } as any)
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
      telemetry.startTimer("workflow.invoke");
      try {
        const messages  = cSess.getMessages();

        const systemMessage = new SystemMessage(anthropicSystem);
        const initialDocumentHash = md5(initialState.code);
        const { codeSpace } = initialState;
        const code = initialState.code;

        // Create the user message
        const userMessage = new HumanMessage({
          content: prompt + `
          <filePath>/live/${codeSpace}.tsx</filePath>
          <code>${code}</code>
          <documentHash>${initialDocumentHash}</documentHash>`,
          additional_kwargs: {
            code: initialState.code,
            documentHash: initialDocumentHash,
          }
        });

        // Save the user message to cSess
 
        if (cSess) {
        await cSess.setMessages(messagesPush(cSess.getMessages(), {
          id: Date.now().toString(),
          role: "user",
          content: prompt,
        }));
        }

        const initialStateWithMessages: ExtendedAgentState = {
          ...initialState,
          messages: [
            systemMessage,
            userMessage,
          ]
        };

        const threadId = uuidv4();
        telemetry.trackEvent("workflow.start", {
          threadId,
          promptLength: prompt.length.toString(),
          codeLength: initialState.code.length.toString(),
        });

        const finalState = await app.invoke(initialStateWithMessages, {
          configurable: { thread_id: threadId },
        });

        if (finalState.code !== initialState.code) {
          // Use cached hash if available
          let finalDocumentHash: string;
          const finalCodeKey = finalState.code;

          const cachedFinalHash = hashCache.get(finalCodeKey);
          if (cachedFinalHash) {
            finalDocumentHash = cachedFinalHash;
          } else {
            finalDocumentHash = md5(finalState.code);
            hashCache.set(finalCodeKey, finalDocumentHash);
          }

          if (!verifyCodeIntegrity(finalState.code, finalDocumentHash)) {
            throw createCodeIntegrityError(
              "Code integrity",
              initialState.documentHash,
              finalDocumentHash,
              finalState.code.length,
            );
          }

          finalState.documentHash = finalDocumentHash;

          // Track code modification
          telemetry.trackCodeModification("update", {
            filePath: `/live/${initialState.codeSpace}.tsx`,
            linesChanged: Number(finalState.code.split("\n").length) - Number(initialState.code.split("\n").length),
            bytesChanged: finalState.code.length - initialState.code.length,
          });
        }

        if (finalState.code !== initialState.code) {
          logCodeChanges(initialState.code, finalState.code);
        }

        telemetry.stopTimer("workflow.invoke", {
          success: "true",
          codeModified: (finalState.code !== initialState.code).toString(),
        });

        return finalState;
      } catch (error) {
        telemetry.trackError(error instanceof Error ? error : new Error(String(error)), {
          location: "workflow.invoke",
          promptLength: prompt.length.toString(),
        });

        telemetry.stopTimer("workflow.invoke", { success: "false" });

        if (error instanceof WorkflowError && error.message.includes("Code integrity")) {
          throw error;
        }
        handleWorkflowError(error);
        throw error;
      }
    },
  };
};
