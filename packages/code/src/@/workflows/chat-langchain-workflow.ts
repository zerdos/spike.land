import { md5 } from "@/lib/md5";
import { codeModificationTool, REPLACE, SEARCH, SEPARATOR } from "@/tools/code-modification-tools";
import { AgentState } from "@/types/chat-langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import type { StateGraphArgs } from "@langchain/langgraph/web";
import { StateGraph } from "@langchain/langgraph/web";
import { MemorySaver } from "@langchain/langgraph/web";
import { v4 as uuidv4 } from "uuid";
import anthropicSystem from "../../config/initial-claude.txt";

// Constants for better maintainability
const MODEL_NAME = "claude-3-7-sonnet-20250219";
const DEFAULT_RETURN_MODIFIED_CODE = false; // Default to not returning full code to save tokens
const SMALL_FILE_THRESHOLD = 1024; // Files smaller than 1KB will always return full code
const COMPLEX_CHANGE_THRESHOLD = 500; // Changes larger than 500 chars are considered complex
const SIGNIFICANT_CHANGE_RATIO = 0.2; // Changes affecting more than 20% of file are significant
const COMPRESSION_THRESHOLD = 10240; // Files larger than 10KB will use compression

// Centralized error handling
class WorkflowError extends Error {
  constructor(
    message: string,
    public readonly context?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "WorkflowError";
  }
}

// Workflow setup with improved type safety
export const createWorkflowWithStringReplace = (initialState: AgentState) => {
  /**
   * Enhanced code reducer that handles cases where code might not be returned
   * to save tokens, using documentHash to retrieve the latest code version
   */
  const getCodeReducer = () => ({
    reducer: (prev: string, next: unknown) => {
      try {
        // Handle string responses directly
        if (typeof next === "string") return next;

        if (typeof next === "object" && next !== null) {
          // Handle tool response format
          if ("content" in next && typeof next.content === "string") {
            try {
              const content = JSON.parse(next.content);
              // If code is available, use it
              if (content?.code) return content.code;

              // If code is not available but we have documentHash, we can retrieve
              // the latest code version from the code session
              if (!content?.code && content?.documentHash) {
                // The code will be retrieved from the session in processMessage
                // based on the documentHash
                return prev;
              }
            } catch (e) {
              // If parsing fails, continue with other checks
            }
          }

          // Direct object with code property
          if ("code" in next && next.code !== undefined) {
            return (next as { code: string; }).code;
          }

          // If code is not available but we have documentHash, we can retrieve
          // the latest code version from the code session
          if (!("code" in next) && "documentHash" in next) {
            // The code will be retrieved from the session in processMessage
            // based on the documentHash
            return prev;
          }
        }

        return prev;
      } catch (error) {
        console.error("Code reduction error:", error);
        throw new WorkflowError("Code reduction failed", {
          error,
          input: next,
        });
      }
    },
  });

  const getErrorReducer = () => ({
    reducer: (prev: string, next: unknown) => {
      try {
        if (typeof next === "string") {
          return next;
        }

        if (typeof next === "object" && next !== null && "error" in next) {
          const err = (next as { error?: unknown; }).error;
          return typeof err === "string" ? err : String(err);
        }

        return prev;
      } catch (error) {
        throw new WorkflowError("Error reduction failed", {
          error,
          input: next,
        });
      }
    },
  });

  const graphState: StateGraphArgs<AgentState>["channels"] = {
    messages: {
      reducer: (prev: BaseMessage[], next: BaseMessage[]) => [...prev, ...next],
    },
    codeSpace: {
      reducer: (_prev: string, next: string) => next,
    },
    code: getCodeReducer(),
    lastError: getErrorReducer(),
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

  // Verify code integrity using document hash
  const verifyCodeIntegrity = (code: string, expectedHash: string): boolean => {
    const actualHash = md5(code);
    if (actualHash !== expectedHash) {
      console.error(`Hash mismatch! Expected ${expectedHash} got ${actualHash}`);
      throw new WorkflowError("Code integrity violation", {
        expectedHash,
        actualHash,
        codeLength: code.length,
      });
    }
    return actualHash === expectedHash;
  };

  /**
   * Extract documentHash and other metadata from tool response
   * @param response The AI message response
   * @param currentState The current state
   * @returns Object containing extracted metadata
   */
  /**
   * Extract documentHash and other metadata from tool response
   * Enhanced to handle cases where code might not be returned to save tokens
   */
  const extractToolResponseMetadata = (
    response: AIMessage,
    currentState: AgentState,
  ): {
    documentHash?: string;
    modifiedCodeHash?: string;
    compilationError?: string;
    codeWasReturned: boolean;
  } => {
    const metadata = {
      documentHash: currentState.documentHash,
      modifiedCodeHash: undefined as string | undefined,
      compilationError: undefined as string | undefined,
      codeWasReturned: false, // Track if code was returned in the response
    };

    // Check if there are tool responses in the additional_kwargs
    if (
      response.additional_kwargs &&
      "tool_responses" in response.additional_kwargs &&
      Array.isArray(response.additional_kwargs.tool_responses)
    ) {
      // Look for documentHash in tool responses
      const toolResponses = response.additional_kwargs.tool_responses;
      for (const toolResponse of toolResponses) {
        if (
          typeof toolResponse === "object" &&
          toolResponse !== null &&
          "name" in toolResponse &&
          toolResponse.name === "code_modification" &&
          "content" in toolResponse
        ) {
          let content: Record<string, unknown> = {};

          // Parse content if it's a string
          if (typeof toolResponse.content === "string") {
            try {
              content = JSON.parse(toolResponse.content);
            } catch (e) {
              console.warn("Failed to parse tool response content", e);
              continue;
            }
          } else if (typeof toolResponse.content === "object" && toolResponse.content !== null) {
            content = toolResponse.content as Record<string, unknown>;
          } else {
            continue;
          }

          // Extract metadata from content
          if ("documentHash" in content && typeof content.documentHash === "string") {
            metadata.documentHash = content.documentHash;
          }

          if ("modifiedCodeHash" in content && typeof content.modifiedCodeHash === "string") {
            metadata.modifiedCodeHash = content.modifiedCodeHash;
          }

          if (
            "error" in content && typeof content.error === "string" &&
            content.error.includes("failed to compile")
          ) {
            metadata.compilationError = content.error;
          }

          // Check if code was returned in the response
          metadata.codeWasReturned = "code" in content && content.code !== undefined;

          break;
        }
      }
    }

    return metadata;
  };

  const model = new ChatAnthropic({
    model: MODEL_NAME,
    anthropicApiKey: "DUMMY_API_KEY",
    streaming: false,
    anthropicApiUrl: `${location.origin}/api/anthropic`,
    temperature: 0,
    maxTokens: 4096,
  }).bindTools(tools);

  const shouldContinue = (state: AgentState): "process" | "tools" | "end" => {
    if (state.lastError) return "process";
    const lastMessage = state.messages[state.messages.length - 1];
    return lastMessage instanceof AIMessage && lastMessage.tool_calls?.length
      ? "tools"
      : "end";
  };

  /**
   * Determines if a code modification should return the full code
   * based on the size and complexity of the changes
   */
  const shouldReturnFullCode = (
    instructions: string,
    currentCode: string,
  ): boolean => {
    // Always return full code for small files (under threshold)
    if (currentCode.length < SMALL_FILE_THRESHOLD) return true;

    // Parse the search/replace blocks to analyze the changes
    const blocks = parseSearchReplaceBlocks(instructions);

    // If no blocks found, default to returning code
    if (blocks.length === 0) return true;

    // Calculate the total size of changes
    let totalChangeSize = 0;
    let complexChanges = false;

    for (const block of blocks) {
      // Calculate the size difference between search and replace
      const sizeDiff = Math.abs(block.replace.length - block.search.length);
      totalChangeSize += sizeDiff;

      // Check if this is a complex change (e.g., large structural changes)
      if (
        sizeDiff > COMPLEX_CHANGE_THRESHOLD ||
        block.search.split("\n").length > 10 ||
        block.replace.split("\n").length > 10
      ) {
        complexChanges = true;
      }
    }

    // Return full code if changes are significant relative to file size
    const changeRatio = totalChangeSize / currentCode.length;
    if (changeRatio > SIGNIFICANT_CHANGE_RATIO) return true; // Changes affect more than threshold % of the file

    // Return full code for complex changes
    if (complexChanges) return true;

    // Otherwise, don't return full code to save tokens
    return false;
  };

  /**
   * Compresses a string using a simple run-length encoding algorithm
   * This is a basic implementation - in production, you might use a more sophisticated algorithm
   */
  const compressCode = (code: string): string => {
    // Only compress if the code is larger than the threshold
    if (code.length < COMPRESSION_THRESHOLD) return code;

    // Simple run-length encoding for repeated characters
    let compressed = "";
    let count = 1;

    for (let i = 0; i < code.length; i++) {
      // If current character is same as next one, increment count
      if (i + 1 < code.length && code[i] === code[i + 1]) {
        count++;
      } else {
        // If count is greater than 3, use run-length encoding
        if (count > 3) {
          compressed += `${count}×${code[i]}`;
        } else {
          // Otherwise, just add the character(s)
          compressed += code[i].repeat(count);
        }
        count = 1;
      }
    }

    // Only use compression if it actually saves space
    return compressed.length < code.length ? compressed : code;
  };

  /**
   * Decompresses a string that was compressed with compressCode
   */
  const decompressCode = (compressed: string): string => {
    // Check if the string contains any compression markers
    if (!compressed.includes("×")) return compressed;

    // Decompress run-length encoded sections
    return compressed.replace(/(\d+)×(.)/g, (_, count, char) => {
      return char.repeat(parseInt(count, 10));
    });
  };

  /**
   * Parse search/replace blocks from instructions
   * Extracted from code-modification-tools.ts for local use
   */
  function parseSearchReplaceBlocks(instructions: string): { search: string; replace: string; }[] {
    if (!instructions || instructions.trim().length === 0) {
      return [];
    }

    const blocks: { search: string; replace: string; }[] = [];
    const regex = new RegExp(
      `${SEARCH}([\\s\\S]*?)${SEPARATOR}([\\s\\S]*?)${REPLACE}`,
      "g",
    );

    let match;
    while ((match = regex.exec(instructions)) !== null) {
      if (match.length === 3) {
        const search = match[1];
        if (search.trim().length === 0) {
          continue;
        }

        blocks.push({
          search,
          replace: match[2],
        });
      }
    }

    return blocks;
  }

  /**
   * Enhanced process message function that optimizes token usage
   * by conditionally returning the full code
   */
  const processMessage = async (
    state: AgentState,
  ): Promise<Partial<AgentState>> => {
    try {
      // Verify code integrity before processing if documentHash exists
      if (state.documentHash && state.code) {
        const isIntegrityValid = verifyCodeIntegrity(state.code, state.documentHash);
        if (!isIntegrityValid) {
          throw new WorkflowError("Code integrity check failed before processing", {
            expectedHash: state.documentHash,
            actualHash: md5(state.code),
            codeLength: state.code.length,
          });
        }
      }

      const cleanedState = {
        ...state,
        code: state.code,
      };

      // Check for tool calls in the last message that might use code_modification
      const lastMessage = state.messages[state.messages.length - 1];
      let returnModifiedCode = DEFAULT_RETURN_MODIFIED_CODE;

      // If the last message has tool calls, analyze them to determine if we should return code
      if (lastMessage && "tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls)) {
        for (const toolCall of lastMessage.tool_calls) {
          if (toolCall.name === "code_modification" && toolCall.args) {
            try {
              const args = typeof toolCall.args === "string"
                ? JSON.parse(toolCall.args)
                : toolCall.args;

              if (args.instructions) {
                // Determine if we should return the full code based on the nature of the changes
                returnModifiedCode = shouldReturnFullCode(args.instructions, state.code);

                // Add a debug log about the decision
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

      // Modify the last message to include the returnModifiedCode parameter if it's a code modification tool
      if (lastMessage && "tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls)) {
        const updatedToolCalls = lastMessage.tool_calls.map(toolCall => {
          if (toolCall.name === "code_modification" && toolCall.args) {
            try {
              const args = typeof toolCall.args === "string"
                ? JSON.parse(toolCall.args)
                : toolCall.args;

              // Add the returnModifiedCode parameter
              const updatedArgs = {
                ...args,
                returnModifiedCode,
              };

              return {
                ...toolCall,
                args: updatedArgs,
              };
            } catch (e) {
              console.warn("Failed to update tool call args", e);
              return toolCall;
            }
          }
          return toolCall;
        });

        // Update the last message with the modified tool calls
        if ("tool_calls" in lastMessage) {
          lastMessage.tool_calls = updatedToolCalls;
        }
      }

      // Ensure documentHash is passed to the model for code modification tools
      const response = await model.invoke(cleanedState.messages);

      // Extract metadata from tool response
      const { documentHash, modifiedCodeHash, compilationError, codeWasReturned } =
        extractToolResponseMetadata(response, state);

      // If code was modified during processing, update the documentHash
      const updatedState = {
        ...cleanedState,
        messages: [response],
        isStreaming: true,
        documentHash,
      };

      // If code wasn't returned but we have a documentHash, retrieve the code from the session
      if (!codeWasReturned && documentHash && documentHash !== state.documentHash) {
        try {
          // Get the latest code from the session
          const latestCode = await (globalThis as unknown as {
            cSess: { getCode: () => Promise<string>; };
          }).cSess.getCode();

          // Verify the hash matches
          const latestHash = md5(latestCode);
          if (latestHash === documentHash) {
            updatedState.code = latestCode;
            console.log("Retrieved latest code from session using documentHash");

            // Add debug log about token savings
            const tokenSavings = estimateTokenSavings(latestCode);
            updatedState.debugLogs = [
              ...(updatedState.debugLogs || []),
              `Token optimization: Saved approximately ${tokenSavings} tokens by not returning code`,
            ];
          } else {
            console.warn("Hash mismatch when retrieving code from session", {
              expectedHash: documentHash,
              actualHash: latestHash,
            });
          }
        } catch (error) {
          console.error("Failed to retrieve code from session", error);
        }
      }

      /**
       * Estimate token savings by not returning the code
       * This is a rough estimate based on the assumption that 1 token ≈ 4 characters
       */
      function estimateTokenSavings(code: string): number {
        if (!code) return 0;
        // Rough estimate: 1 token ≈ 4 characters
        return Math.floor(code.length / 4);
      }

      // If compilation error occurred, add it to lastError
      if (compilationError) {
        updatedState.lastError = compilationError;
        console.warn("Compilation error detected:", compilationError);

        // Add debug log about available document hashes
        updatedState.debugLogs = [
          ...(updatedState.debugLogs || []),
          `Compilation error occurred. Original hash: ${state.documentHash}, Modified code hash: ${modifiedCodeHash}`,
          "You can continue from either hash or fix the compilation error.",
        ];
      }

      // If no documentHash was found in the tool response but code changed,
      // calculate a new hash
      if (state.code !== updatedState.code && updatedState.code && !documentHash) {
        updatedState.documentHash = md5(updatedState.code);
        console.log("Generated new document hash for modified code:", updatedState.documentHash);
      }

      // Add sequential change validation - only if we have code to compare
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
      // Add more context to the error
      const errorContext = {
        error,
        state: {
          codeLength: state.code?.length,
          documentHash: state.documentHash,
          hasMessages: state.messages?.length > 0,
        },
      };

      throw new WorkflowError(
        error instanceof Error
          ? `Message processing failed: ${error.message}`
          : "Message processing failed with unknown error",
        errorContext,
      );
    }
  };

  const workflow = new StateGraph<AgentState>({ channels: graphState })
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
        // Create system message with initial code and hash
        const systemMessage = new SystemMessage(anthropicSystem);
        const initialDocumentHash = md5(initialState.code);

        // Add information about document hash versioning and token optimization to the prompt
        const enhancedPrompt =
          `${prompt}\n\nNote: Previous versions of code are mapped by document hashes. If compilation fails, you can fix with a new modification or roll back to a previous hash. For efficiency, the system may not always return the full code in responses to save tokens.`;

        const initialStateWithMessages = {
          ...initialState,
          messages: [
            systemMessage,
            new HumanMessage(enhancedPrompt, {
              code: initialState.code,
              documentHash: initialDocumentHash,
            }),
          ],
          documentHash: initialDocumentHash, // Store hash in state for tracking
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

        // Verify code integrity after workflow execution
        if (finalState.code !== initialState.code) {
          const finalDocumentHash = md5(finalState.code);
          const isIntegrityValid = verifyCodeIntegrity(finalState.code, finalDocumentHash);

          if (!isIntegrityValid) {
            throw new WorkflowError("Code integrity verification failed", {
              initialHash: initialDocumentHash,
              finalHash: finalDocumentHash,
              initialCodeLength: initialState.code.length,
              finalCodeLength: finalState.code.length,
            });
          }

          // Update documentHash in final state
          finalState.documentHash = finalDocumentHash;
          console.log("Code integrity verified with updated hash", {
            documentHash: finalDocumentHash,
            previousHash: initialDocumentHash,
          });
        }

        logCodeChanges(initialState.code, finalState.code);
        return finalState;
      } catch (error) {
        handleWorkflowError(error);
        throw error;
      }
    },
  };
};

// Helper functions
function logCodeChanges(initialCode: string, finalCode: string) {
  if (initialCode !== finalCode) {
    const initialHash = md5(initialCode);
    const finalHash = md5(finalCode);
    const changes = calculateCodeChanges(initialCode, finalCode);

    console.log("Code modified successfully", {
      changes,
      initialHash,
      finalHash,
      hashChanged: initialHash !== finalHash,
    });

    // Log more detailed information about significant changes
    if (
      Math.abs(changes.sizeChange) > 100 ||
      Math.abs(changes.lineCount.modified - changes.lineCount.original) > 10
    ) {
      console.log("Significant code changes detected:", {
        sizeChangePct: ((changes.sizeChange / initialCode.length) * 100).toFixed(2) + "%",
        lineChangePct: (((changes.lineCount.modified - changes.lineCount.original) /
          changes.lineCount.original) * 100).toFixed(2) + "%",
      });
    }
  }
}

function calculateCodeChanges(original: string, modified: string): {
  sizeChange: number;
  lineCount: { original: number; modified: number; };
  changedLines: number;
  tokenSavings: number;
} {
  // Calculate size difference
  const sizeChange = modified.length - original.length;

  // Calculate line count difference
  const originalLines = original.split("\n");
  const modifiedLines = modified.split("\n");

  // Calculate number of changed lines (simple diff)
  let changedLines = 0;
  const minLength = Math.min(originalLines.length, modifiedLines.length);

  for (let i = 0; i < minLength; i++) {
    if (originalLines[i] !== modifiedLines[i]) {
      changedLines++;
    }
  }

  // Add lines that were added or removed
  changedLines += Math.abs(originalLines.length - modifiedLines.length);

  // Estimate token savings (rough estimate: 1 token ≈ 4 characters)
  const tokenSavings = Math.floor(modified.length / 4);

  return {
    sizeChange,
    lineCount: {
      original: originalLines.length,
      modified: modifiedLines.length,
    },
    changedLines,
    tokenSavings,
  };
}

function handleWorkflowError(error: unknown): never {
  if (error instanceof WorkflowError) {
    console.error("Workflow Error:", error.message, error.context);

    // Add more helpful context for specific error types
    if (error.message.includes("Code integrity")) {
      console.error("Code integrity errors may indicate version conflicts. Check document hashes.");
    } else if (error.message.includes("failed to compile")) {
      console.error("Compilation errors can be fixed with a new modification or by rolling back.");
    }

    throw error;
  }

  console.error("Unexpected Error:", error);
  throw new WorkflowError("Unexpected workflow error", {
    originalError: error,
  });
}
