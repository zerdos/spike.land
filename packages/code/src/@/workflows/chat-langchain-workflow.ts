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
import { md5} from "@/lib/md5";

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
export const createWorkflow = (initialState: AgentState) => {
  const getCodeReducer = () => ({
    reducer: (prev: string, next: unknown) => {
      try {
        if (typeof next === "string") {
          return next;
        }

        if (typeof next === "object" && next !== null && "code" in next) {
          return (next as { code?: any; }).code ?? prev;
        }

        return prev;
      } catch (error) {
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
    code: getCodeReducer(),
    lastError: getErrorReducer(),
    isStreaming: {
      reducer: (_prev: boolean, next: boolean) => next,
    },
    debugLogs: {
      reducer: (prev: string[], next: string[]) => [...prev, ...next],
    },
  };

  const tools = [codeModificationTool];
  const toolNode = new ToolNode(tools);

  const createSystemMessage = (code: string): SystemMessage =>
    new SystemMessage(
      anthropicSystem + `
<code>
<documentHash>${md5(code)}</documentHash> 
${code}
</code>
    `,
    );

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
      const cleanedState = {
        ...state,
        code: state.code,
      };

      const response = await model.invoke(cleanedState.messages);

      return {
        ...cleanedState,
        messages: [response],
        isStreaming: true,
      };
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
        const systemMessage = createSystemMessage(initialState.code);
        const initialStateWithMessages = {
          ...initialState,
          messages: [systemMessage, new HumanMessage(prompt)],
        };

        const finalState = await app.invoke(initialStateWithMessages, {
          configurable: { thread_id: uuidv4() },
        });

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
    console.log("Code modified successfully", {
      changes: calculateCodeChanges(initialCode, finalCode),
    });
  }
}

function calculateCodeChanges(original: string, modified: string): number {
  // Implement proper diff calculation here
  return modified.length - original.length;
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
