import {
  broadcastTool,
  codeFormattingTool,
  codeModificationTool,
} from "@/tools/code-modification-tools";
import { AgentState } from "@/types/chat-langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import { BaseLanguageModelParams } from "@langchain/core/language_models/base";
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import type { StateGraphArgs } from "@langchain/langgraph";
import { BaseStore, StateGraph } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { v4 as uuidv4 } from "uuid";
import anthropicSystem from "../../config/initial-claude.txt";

// Workflow setup
export const createWorkflow = async (initialState: AgentState) => {
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

  const systemMessage = new SystemMessage(
    anthropicSystem + "\n" + `
  <code>
  ${initialState.code}
  </code>
    `,
  );

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
      ...state,
      messages: [
        new AIMessage({
          content: response.content,
          tool_calls: response.tool_calls,
          additional_kwargs: response.additional_kwargs,
        }),
      ],
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
      // Initialize state with code that tools can access
      const state: AgentState = {
        ...initialState,
        messages: [systemMessage, new HumanMessage(prompt)],
      };

      console.log("Initial state", state);

      const finalState = await app.invoke(state, {
        configurable: { thread_id: uuidv4() },
      });

      if (initialState.code === finalState.code) console.log("Original code didn't change");
      else {
        console.log("Original code CHANGED", {
          initialCode: initialState.code,
          finalCode: finalState.code,
        });
      }
      console.log("Final state", finalState);

      return finalState;
    },
  };
};
