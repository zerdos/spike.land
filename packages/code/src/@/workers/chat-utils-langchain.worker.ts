import { ChatAnthropic } from "@langchain/anthropic";
import type { BaseMessage } from "@langchain/core/messages";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import type { StateGraphArgs } from "@langchain/langgraph";
import { StateGraph } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { replaceFirstCodeMod } from "@/lib/chat-utils";

// Types
interface AgentState {
  messages: BaseMessage[];
  code: string;
  lastError: string;
  isStreaming: boolean;
  debugLogs: string[];
}

interface CodeModification {
  code: string;
  error: string;
}

const SEARCH = "<<<<<<< SEARCH";
const REPLACE = ">>>>>>> REPLACE";

// Tools
const codeModificationTool = tool(
  async ({ code, instructions }: { code: string; instructions: string }): Promise<CodeModification> => {
    try {
      if (instructions.length === 0) {
        return { code, error: "" };
      }

      const searchIndex = instructions.indexOf(SEARCH);
      const replaceIndex = instructions.indexOf(REPLACE);

      if (searchIndex === -1 || replaceIndex === -1) {
        return { code, error: "Invalid search/replace format" };
      }

      const result = replaceFirstCodeMod(instructions, code);
      
      if (result === code) {
        return {
          code,
          error: "Could not apply search/replace modifications",
        };
      }

      return { code: result, error: "" };
    } catch (error) {
      return {
        code,
        error: error instanceof Error ? error.message : "Unknown error in code modification",
      };
    }
  },
  {
    name: "code_modification",
    description: "Modifies code using search/replace patterns",
    schema: z.object({
      code: z.string().describe("The source code to modify"),
      instructions: z.string().describe("The search/replace instructions"),
    }),
  }
);

const codeFormattingTool = tool(
  async ({ code }: { code: string }): Promise<{ code: string; error: string }> => {
    try {
      const formatted = await (globalThis as unknown as {
        prettierJs: ({ code, toThrow }: { code: string; toThrow: boolean }) => Promise<string>;
      }).prettierJs({ code, toThrow: true });

      const transpiled = await (globalThis as unknown as {
        transpile: ({ code, originToUse }: { code: string; originToUse: string }) => Promise<string>;
      }).transpile({ code: formatted, originToUse: location.origin });

      return { code: formatted, error: "" };
    } catch (error) {
      return {
        code,
        error: error instanceof Error ? error.message : "Unknown error in formatting",
      };
    }
  },
  {
    name: "code_formatting",
    description: "Formats and transpiles code",
    schema: z.object({
      code: z.string().describe("The code to format"),
    }),
  }
);

const broadcastTool = tool(
  async (input: { channel: string; data?: any }): Promise<void> => {
    const bc = new BroadcastChannel(input.channel);
    if (input.data !== undefined) {
      bc.postMessage(input.data);
    }
  },
  {
    name: "broadcast",
    description: "Broadcasts messages through BroadcastChannel",
    schema: z.object({
      channel: z.string().describe("The channel to broadcast on"),
      data: z.any().optional().describe("The data to broadcast"),
    }),
  }
);

// Workflow setup
const createWorkflow = async (initialState: Partial<AgentState>) => {
  const graphState: StateGraphArgs<AgentState>["channels"] = {
    messages: {
      reducer: (prev: BaseMessage[], next: BaseMessage[]) => prev.concat(next),
    },
    code: {
      reducer: (_prev: string, next: string) => next,
    },
    lastError: {
      reducer: (_prev: string, next: string) => next,
    },
    isStreaming: {
      reducer: (_prev: boolean, next: boolean) => next,
    },
    debugLogs: {
      reducer: (prev: string[], next: string[]) => [...prev, ...next],
    },
  };

  const tools = [codeModificationTool, codeFormattingTool, broadcastTool];
  const toolNode = new ToolNode(tools);

  const model = new ChatAnthropic({
    model: "claude-3-5-sonnet-20241022",
    anthropicApiKey: "DUMMY_API_KEY",
    streaming: false,
    anthropicApiUrl: location.origin + "/api/anthropic",
    temperature: 0,
  }).bindTools(tools);

  const shouldContinue = (state: AgentState): "process" | "tools" | "end" => {
    if (state.lastError) {
      return "process";
    }
    const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
    return lastMessage.tool_calls?.length ? "tools" : "end";
  };

  const processMessage = async (state: AgentState): Promise<Partial<AgentState>> => {
    const response = await model.invoke(state.messages);
    return {
      messages: [new AIMessage({
        content: response.content,
        tool_calls: response.tool_calls,
        additional_kwargs: response.additional_kwargs,
      })],
      isStreaming: true,
    };
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
      const state = {
        messages: [new HumanMessage(prompt)],
        code: initialState.code || "",
        lastError: "",
        isStreaming: false,
        debugLogs: [],
        ...initialState,
      };

      const finalState = await app.invoke(state, {
        configurable: { thread_id: uuidv4() },
      });

      return finalState;
    },
  };
};

export { createWorkflow };
Object.assign(globalThis, { createWorkflow });
