import { codeModificationTool } from "@/tools/code-modification-tools";
import { AgentState } from "@/types/chat-langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import type { StateGraphArgs } from "@langchain/langgraph/web";
import { StateGraph } from "@langchain/langgraph/web";
import { MemorySaver } from "@langchain/langgraph/web";
import { v4 as uuidv4 } from "uuid";
import anthropicSystem from "../../config/initial-claude.txt";
import { md5 } from "@/lib/md5";

// Constants for better maintainability
const MODEL_NAME = "claude-3-7-sonnet-20250219";

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
  const getCodeReducer = () => ({
    reducer: (prev: string, next: unknown) => {
      try {
        if (typeof next === "string") return next;
        
        if (typeof next === "object" && next !== null) {
          // Handle tool response format
          if ('content' in next && typeof next.content === 'string') {
            try {
              const content = JSON.parse(next.content);
              if (content?.code) return content.code;
            } catch (e) {
              // If parsing fails, continue with other checks
            }
          }
          if ('code' in next) return (next as { code: string }).code;
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
  const extractToolResponseMetadata = (
    response: AIMessage, 
    currentState: AgentState
  ): { 
    documentHash?: string; 
    modifiedCodeHash?: string;
    compilationError?: string;
  } => {
    const metadata = {
      documentHash: currentState.documentHash,
      modifiedCodeHash: undefined as string | undefined,
      compilationError: undefined as string | undefined,
    };
    
    // Check if there are tool responses in the additional_kwargs
    if (response.additional_kwargs && 
        'tool_responses' in response.additional_kwargs && 
        Array.isArray(response.additional_kwargs.tool_responses)) {
      
      // Look for documentHash in tool responses
      const toolResponses = response.additional_kwargs.tool_responses;
      for (const toolResponse of toolResponses) {
        if (typeof toolResponse === 'object' && 
            toolResponse !== null && 
            'name' in toolResponse && 
            toolResponse.name === "code_modification" && 
            'content' in toolResponse) {
          
          let content: Record<string, unknown> = {};
          
          // Parse content if it's a string
          if (typeof toolResponse.content === 'string') {
            try {
              content = JSON.parse(toolResponse.content);
            } catch (e) {
              console.warn("Failed to parse tool response content", e);
              continue;
            }
          } else if (typeof toolResponse.content === 'object' && toolResponse.content !== null) {
            content = toolResponse.content as Record<string, unknown>;
          } else {
            continue;
          }
          
          // Extract metadata from content
          if ("documentHash" in content && typeof content.documentHash === 'string') {
            metadata.documentHash = content.documentHash;
          }
          
          if ("modifiedCodeHash" in content && typeof content.modifiedCodeHash === 'string') {
            metadata.modifiedCodeHash = content.modifiedCodeHash;
          }
          
          if ("error" in content && typeof content.error === 'string' && 
              content.error.includes("failed to compile")) {
            metadata.compilationError = content.error;
          }
          
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

      // Ensure documentHash is passed to the model for code modification tools
      // This is handled by the code modification tool itself, which already checks for documentHash

      const response = await model.invoke(cleanedState.messages);

      // Extract metadata from tool response
      const { documentHash, modifiedCodeHash, compilationError } = 
        extractToolResponseMetadata(response, state);

      // If code was modified during processing, update the documentHash
      const updatedState = {
        ...cleanedState,
        messages: [response],
        isStreaming: true,
        documentHash,
      };

      // If compilation error occurred, add it to lastError
      if (compilationError) {
        updatedState.lastError = compilationError;
        console.warn("Compilation error detected:", compilationError);
        
        // Add debug log about available document hashes
        updatedState.debugLogs = [
          ...(updatedState.debugLogs || []),
          `Compilation error occurred. Original hash: ${state.documentHash}, Modified code hash: ${modifiedCodeHash}`,
          "You can continue from either hash or fix the compilation error."
        ];
      }

      // If no documentHash was found in the tool response but code changed,
      // calculate a new hash
      if (state.code !== updatedState.code && updatedState.code && !documentHash) {
        updatedState.documentHash = md5(updatedState.code);
        console.log("Generated new document hash for modified code:", updatedState.documentHash);
      }

      // Add sequential change validation
      if (state.code === updatedState.code && state.code !== initialState.code) {
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
        }
      };
      
      throw new WorkflowError(
        error instanceof Error 
          ? `Message processing failed: ${error.message}` 
          : "Message processing failed with unknown error",
        errorContext
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
        
        // Add information about document hash versioning to the prompt
        const enhancedPrompt = `${prompt}\n\nNote: Previous versions of code are mapped by document hashes. If compilation fails, you can fix with a new modification or roll back to a previous hash.`;
        
        const initialStateWithMessages = {
          ...initialState,
          messages: [systemMessage, new HumanMessage(enhancedPrompt, {
            code: initialState.code,
            documentHash: initialDocumentHash,
          })],
          documentHash: initialDocumentHash, // Store hash in state for tracking
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
    if (Math.abs(changes.sizeChange) > 100 || 
        Math.abs(changes.lineCount.modified - changes.lineCount.original) > 10) {
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
} {
  // Calculate size difference
  const sizeChange = modified.length - original.length;
  
  // Calculate line count difference
  const originalLines = original.split('\n').length;
  const modifiedLines = modified.split('\n').length;
  
  return {
    sizeChange,
    lineCount: {
      original: originalLines,
      modified: modifiedLines
    }
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
