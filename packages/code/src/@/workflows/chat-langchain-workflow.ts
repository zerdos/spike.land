import {
  ANTHROPIC_API_CONFIG,
  DEFAULT_RETURN_MODIFIED_CODE,
  MODEL_NAME,
} from "@/config/workflow-config";
import { messagesPush } from "@/lib/chat-utils";
import { HandleSendMessageProps, ICode } from "@/lib/interfaces";
import type { ImageData, Message } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
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
import { hashCache, toolResponseCache } from "../../lib/caching";
import { metrics } from "../../lib/metrics";
import { telemetry } from "../../lib/telemetry";
import { isRetryableError, withRetry } from "../../utils/retry";
import { initialClaude } from "@/lib/initial-claude";
import { replaceInFileTool } from "@/tools/replace-in-file";

const mod: {
  [codeSpace: string]: ReturnType<typeof createWorkflowWithStringReplace>;
} = {};

async function createNewMessage(
  images: ImageData[],
  claudeContent: string,
): Promise<Message> {
  // Filter out any images without URLs and create image content array
  const imagesContent = images
    .map((image) => {
      const imageUrl = image.url || image.src;
      if (!imageUrl) {
        console.warn("Image missing URL:", image);
        return null;
      }
      return {
        type: "image_url" as const,
        image_url: { url: imageUrl },
      };
    })
    .filter((content): content is { type: "image_url"; image_url: { url: string; }; } =>
      content !== null
    );

  const content = imagesContent.length > 0
    ? [...imagesContent, {
      type: "text" as const,
      text: claudeContent.trim() || "",
    }]
    : claudeContent;

  return {
    id: Date.now().toString(),
    role: "user" as const,
    content,
  };
}
export const handleSendMessage = async (
  { messages, codeSpace, prompt, images, code }: HandleSendMessageProps,
  cSess: ICode,
): Promise<void> => {
  const workflow = mod[codeSpace] || await createWorkflowWithStringReplace({
    code: code,
    codeSpace: codeSpace,
    origin: location.origin,
    lastError: "",
    isStreaming: false,
    messages: [],
    hash: getHashWithCache(code),
  }, cSess);

  mod[codeSpace] = workflow;

  const finalState = await workflow.invoke(prompt);

  console.log("Final workflow state:", finalState);
};

/**
 * Attempts to extract code from a JSON string
 * @param jsonString The JSON string to parse
 * @returns The extracted code string or null if not found/invalid
 */
const tryExtractCodeFromJson = (jsonString: string): string | null => {
  try {
    const content = JSON.parse(jsonString);
    // Check if content has code property with string value
    if (content?.code && typeof content.code === "string") {
      return content.code;
    }
    // If no code but has hash, return null to keep previous code
    if (!content?.code && content?.hash) {
      return null;
    }
  } catch (e) {
    // Silently fail on JSON parse errors
  }
  return null;
};

/**
 * Determines whether to return modified code based on tool calls
 * @param toolCalls The tool calls to analyze
 * @param code The current code
 * @returns Whether to return modified code
 */
const determineReturnModifiedCode = (
  toolCalls: Array<{ name: string; args?: unknown }>,
  code: string
): boolean => {
  for (const toolCall of toolCalls) {
    if (toolCall.name === "code_modification" && toolCall.args) {
      try {
        const args = typeof toolCall.args === "string"
          ? JSON.parse(toolCall.args)
          : toolCall.args;

        if (args.instructions) {
          return shouldReturnFullCode(args.instructions, code);
        }
      } catch (e) {
        console.warn("Failed to parse tool call args", e);
      }
    }
  }
  return DEFAULT_RETURN_MODIFIED_CODE;
};

/**
 * Gets a hash for the given code, using cache when available
 * @param code The code to hash
 * @param operationName Optional name for metrics recording
 * @returns The calculated or cached hash
 */
const getHashWithCache = (code: string, operationName = "hash.calculation"): string => {
  const cacheKey = code;
  const cachedHash = hashCache.get(cacheKey);
  
  if (cachedHash) {
    metrics.recordOperation("hash.cache.hit", 0);
    return cachedHash;
  }
  
  const hashStart = performance.now();
  const hash = md5(code);
  const hashDuration = performance.now() - hashStart;
  metrics.recordOperation(operationName, hashDuration);
  hashCache.set(cacheKey, hash);
  
  return hash;
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
    images?: ImageData[];
    hasImages?: boolean;
  }

  // Define the tool response metadata interface locally
  interface ToolResponseMetadata {
    hash?: string;
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
          // Direct string return
          if (typeof next === "string") return next;
          
          // Handle object types
          if (typeof next === "object" && next !== null) {
            // Try to extract code from content field (JSON string)
            if ("content" in next && typeof next.content === "string") {
              const extractedCode = tryExtractCodeFromJson(next.content);
              if (extractedCode) return extractedCode;
            }
            
            // Direct code field
            if ("code" in next && typeof next.code === "string") {
              return next.code;
            }
            
            // If only hash is present, keep previous code
            if (!("code" in next) && "hash" in next) return prev;
          }
          
          // Default: keep previous code
          return prev;
        } catch (error) {
          console.error("Code reduction error:", error);
          throw new WorkflowError("Code reduction failed", { error, input: next });
        }
      },
    },
    lastError: {
      reducer: (prev: string, next: unknown) => {
        try {
          // Direct string errors
          if (typeof next === "string") return next;
          
          // Object with error property
          if (typeof next === "object" && next !== null) {
            if ("error" in next) {
              const err = next.error;
              // Handle different error types
              if (typeof err === "string") return err;
              if (err instanceof Error) return err.message;
              return String(err);
            }
            
            // Try to extract message from Error objects
            if (next instanceof Error) return next.message;
          }
          
          // Default: keep previous error or convert to string
          return prev;
        } catch (e) {
          console.error("Error in lastError reducer:", e);
          return prev;
        }
      },
    },
    isStreaming: {
      reducer: (_prev: boolean, next: boolean) => next,
    },
    debugLogs: {
      reducer: (prev: string[], next: string[]) => [...prev, ...next],
    },
    hash: {
      reducer: (_prev: string | undefined, next: string) => next,
    },
    filePath: {
      reducer: (_prev: string | undefined, next: string | undefined) => next,
    },
  };

  const tools = [replaceInFileTool];
  const toolNode = new ToolNode(tools);

  const model = new ChatAnthropic({
    model: MODEL_NAME,
    cache: true,
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
      if (state.hash && state.code) {
        // Calculate hash with caching
        const currentHash = getHashWithCache(state.code);
        
        if (state.hash !== currentHash) {
          throw createCodeIntegrityError(
            "Code integrity",
            state.hash,
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
        returnModifiedCode = determineReturnModifiedCode(lastMessage.tool_calls, state.code);
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

      if (cachedResponse && "hash" in cachedResponse) {
        metadata = cachedResponse as ToolResponseMetadata;
        metrics.recordOperation("toolResponse.cache.hit", 0);
      } else {
        const metadataStart = performance.now();
        metadata = extractToolResponseMetadata(response, state);
        const metadataDuration = performance.now() - metadataStart;
        metrics.recordOperation("toolResponse.extraction", metadataDuration);

        // Cache the result with proper type conversion
        toolResponseCache.set(responseKey, {
          hash: metadata.hash,
          modifiedCodeHash: metadata.modifiedCodeHash,
          compilationError: !!metadata.compilationError,
          codeWasReturned: metadata.codeWasReturned,
        });
      }

      const { hash, modifiedCodeHash, compilationError, codeWasReturned } = metadata;

      const updatedState = {
        ...cleanedState,
        messages: [response],
        isStreaming: true,
        hash,
      };

      // Check for images in the message
      const currentHumanMessage = state.messages[state.messages.length - 1];
      if (
        currentHumanMessage instanceof HumanMessage && currentHumanMessage.additional_kwargs?.images
      ) {
        const images = currentHumanMessage.additional_kwargs.images as ImageData[];
        (updatedState as ExtendedAgentState).images = images;
        (updatedState as ExtendedAgentState).hasImages = images.length > 0;
      }

      // Save the AI response message to cSess
      if (response) {
        const currentMessages = cSess.getMessages();
        const aiMessageForChat = {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: typeof response.content === "string" ? response.content : "",
        };
        await cSess.setMessages(messagesPush(cSess.getMessages(), aiMessageForChat));
      }

      if (!codeWasReturned && hash && hash !== state.hash) {
        const latestCode = await handleMissingCodeResponse(hash, state);
        if (latestCode) {
          updatedState.code = latestCode;
        }
      }

      if (compilationError) {
        console.warn("Compilation error detected", compilationError);
        throw new WorkflowError("failed to compile: syntax error");
      }

      if (state.code !== updatedState.code && updatedState.code && !hash) {
        // Calculate hash with caching for updated code
        updatedState.hash = getHashWithCache(updatedState.code);
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
          hash: state.hash,
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
  const shouldContinue = async (state: AgentState): Promise<WorkflowContinueResult> => {
    if (state.lastError) return "end";
    const lastMessage = state.messages[state.messages.length - 1];
    return lastMessage instanceof AIMessage && lastMessage.tool_calls?.length
      ? "tools"
      : "end";
  };

  // Use type assertion for StateGraph initialization as it expects a specific structure
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
    invoke: async (prompt: string, images: ImageData[] = []) => {
      telemetry.startTimer("workflow.invoke");
      try {
        const messages = cSess.getMessages();
        const userMessageToSave = await createNewMessage(images, prompt);

        await cSess.setMessages(messagesPush(messages, userMessageToSave));

        const systemMessage = new SystemMessage(initialClaude);
        const hash = getHashWithCache(initialState.code);
        const { codeSpace } = initialState;
        const code = initialState.code;

        // Create the user message
        const userMessage = new HumanMessage(
          {
            content: prompt + `
<path>/live/${codeSpace}.tsx</path>
<code>${code}</code>
<hash>${hash}</hash>
`,
            additional_kwargs: {
              path: `/live/${codeSpace}.tsx`,
              code: initialState.code,
              hash: hash,
            },
          },
        );

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
          ],
        };

        const threadId = uuidv4();
        telemetry.trackEvent("workflow.start", {
          threadId,
          promptLength: prompt.length.toString(),
          codeLength: initialState.code.length.toString(),
          hasImages: images.length > 0 ? "true" : "false",
        });

        const finalState = await app.invoke(initialStateWithMessages, {
          configurable: { thread_id: threadId },
        });

        if (finalState.code !== initialState.code) {
          // Calculate hash with caching for final code
          const finalhash = getHashWithCache(finalState.code);

          if (!verifyCodeIntegrity(finalState.code, finalhash)) {
            throw createCodeIntegrityError(
              "Code integrity",
              initialState.hash,
              finalhash,
              finalState.code.length,
            );
          }

          finalState.hash = finalhash;

          // Track code modification
          telemetry.trackCodeModification("update", {
            filePath: `/live/${initialState.codeSpace}.tsx`,
            linesChanged: Number(finalState.code.split("\n").length) -
              Number(initialState.code.split("\n").length),
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
