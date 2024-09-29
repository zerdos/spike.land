import { ChatAnthropic } from "@langchain/anthropic";
import type { BaseMessage } from "@langchain/core/messages";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import type { StateGraphArgs } from "@langchain/langgraph";
import { StateGraph } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { z } from "zod";

interface AgentState {
  messages: BaseMessage[];
}

const createWorkflow = async (prompt: string) => {
  const graphState: StateGraphArgs<AgentState>["channels"] = {
    messages: {
      reducer: (x: BaseMessage[], y: BaseMessage[]) => x.concat(y),
    },
  };

  const weatherTool = tool(
    async ({ query }) => {
      if (query.toLowerCase().includes("sf") || query.toLowerCase().includes("san francisco")) {
        return "It's 60 degrees and foggy.";
      }
      return "It's 90 degrees and sunny.";
    },
    {
      name: "weather",
      description: "Get the current weather for a location.",
      schema: z.object({
        query: z.string().describe("The location to check weather for."),
      }),
    },
  );

  const tools = [weatherTool];
  const toolNode = new ToolNode(tools, {
    return_direct: false,
  });

  const model = new ChatAnthropic({
    model: "claude-3-5-sonnet-20240620",
    anthropicApiKey: "MY_API_KEY",
    streaming: false,
    anthropicApiUrl: location.origin + "/api/anthropic",
    temperature: 0,
  }).bindTools(tools);

  const shouldContinue = (state: AgentState): "tools" | "__end__" => {
    const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
    return lastMessage.tool_calls?.length ? "tools" : "__end__";
  };

  const callModel = async (state: AgentState): Promise<Partial<AgentState>> => {
    const response = await model.invoke(state.messages);
    // Ensure the response is of type BaseMessage
    const baseMessage: BaseMessage = new AIMessage({
      content: response.content,
      tool_calls: response.tool_calls,
      additional_kwargs: response.additional_kwargs,
    });
    return { messages: [baseMessage] };
  };

  const workflow = new StateGraph<AgentState>({ channels: graphState })
    .addNode("agent", callModel)
    .addNode("tools", toolNode)
    .addEdge("__start__", "agent")
    .addConditionalEdges("agent", shouldContinue)
    .addEdge("tools", "agent");
  const checkpointer = new MemorySaver();
  const app = workflow.compile({ checkpointer }) as { invoke: (state: AgentState, config: { configurable: { thread_id: string } }) => Promise<AgentState> };

  console.log("Compiled the workflow!");

  const finalState = await app.invoke(
    { messages: [new HumanMessage(prompt)] },
    { configurable: { thread_id: "42" } },
  );

  const finalMessage = finalState.messages[finalState.messages.length - 1].content;
  console.log(finalMessage);
  return finalMessage;
};

export type { createWorkflow };
Object.assign(globalThis, { createWorkflow });
