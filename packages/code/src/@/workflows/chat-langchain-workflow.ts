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
  };

  const tools = [codeModificationTool];
  const toolNode = new ToolNode(tools);

  // Create a system message with code and its hash for integrity verification
  const createSystemMessage = (code: string, codeSpace: string): SystemMessage => {
    const documentHash = md5(code);
    return new SystemMessage(
      anthropicSystem+ `
      <filePath>/live/${codeSpace}.tsx</filePath>
      <code>${code}</code>
      <documentHash>${documentHash}</documentHash>`,
      { 
          code: code, 
          filePath: `/live/${codeSpace}.tsx`,
          documentHash: documentHash 
      
      }
    );
  };

  // Verify code integrity using document hash
  const verifyCodeIntegrity = (code: string, expectedHash: string): boolean => {
    const actualHash = md5(code);
    if (actualHash !== expectedHash) {
      console.error(`Hash mismatch! Expected ${expectedHash} got ${actualHash}`);
      throw new WorkflowError("Code integrity violation", {
        expectedHash,
        actualHash
      });
    }
    return actualHash === expectedHash;
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

      // Extract documentHash from tool response if present
      let documentHash = state.documentHash;
      
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
              'content' in toolResponse && 
              typeof toolResponse.content === "object" && 
              toolResponse.content !== null && 
              "documentHash" in toolResponse.content) {
            
            documentHash = String(toolResponse.content.documentHash);
            break;
          }
        }
      }

      // If code was modified during processing, update the documentHash
      const updatedState = {
        ...cleanedState,
        messages: [response],
        isStreaming: true,
        documentHash
      };

      // If no documentHash was found in the tool response but code changed,
      // calculate a new hash
      if (state.code !== updatedState.code && updatedState.code && !documentHash) {
        updatedState.documentHash = md5(updatedState.code);
      }

      // Add sequential change validation
      if (state.code === updatedState.code && state.code !== initialState.code) {
        throw new WorkflowError("Code modification failed to apply changes");
      }

      return updatedState;
    } catch (error) {
      throw new WorkflowError("Message processing failed", { error, state });
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
        const systemMessage = createSystemMessage(initialState.code, initialState.codeSpace);
        const initialDocumentHash = md5(initialState.code);
        
        const initialStateWithMessages = {
          ...initialState,
          messages: [systemMessage, new HumanMessage(prompt)],
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
            });
          }
          
          // Update documentHash in final state
          finalState.documentHash = finalDocumentHash;
          console.log("Code integrity verified with updated hash", { documentHash: finalDocumentHash });
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
    
    console.log("Code modified successfully", {
      changes: calculateCodeChanges(initialCode, finalCode),
      initialHash,
      finalHash,
      hashChanged: initialHash !== finalHash,
    });
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
    throw error;
  }

  console.error("Unexpected Error:", error);
  throw new WorkflowError("Unexpected workflow error", {
    originalError: error,
  });
}
