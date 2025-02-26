import { ChatAnthropic } from "@langchain/anthropic";
import type { BaseMessage } from "@langchain/core/messages";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import type { StateGraphArgs } from "@langchain/langgraph";
import { StateGraph } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { z } from "zod";

// Types for our workflow
interface AgentState {
  messages: BaseMessage[];
}

interface WeatherInput {
  query: string;
}

/**
 * Creates a simple weather tool that returns mock weather data
 * This is an example of how to create a custom tool with LangChain
 */
const createWeatherTool = () => {
  return tool(
    async (input: WeatherInput) => {
      if (
        input.query.toLowerCase().includes("sf") ||
        input.query.toLowerCase().includes("san francisco")
      ) {
        return "It's 60 degrees and foggy.";
      }
      return "It's 90 degrees and sunny.";
    },
    {
      name: "weather",
      description: "Get the current weather for a location.",
      schema: z.object({
        query: z.string().describe("The location to check weather for"),
      }),
    },
  );
};

/**
 * Creates a ChatAnthropic model instance configured with tools
 */
const createLanguageModel = (tools: ReturnType<typeof createWeatherTool>[]) => {
  return new ChatAnthropic({
    model: "claude-3-7-sonnet-20250219",
    anthropicApiKey: "MY_API_KEY",
    streaming: false,
    anthropicApiUrl: location.origin + "/api/anthropic",
    temperature: 0,
  }).bindTools(tools);
};

/**
 * Determines if the workflow should continue processing or end
 * Returns 'tools' if the last message contains tool calls, '__end__' otherwise
 */
const determineNextStep = (state: AgentState): "tools" | "__end__" => {
  const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
  return lastMessage.tool_calls?.length ? "tools" : "__end__";
};

/**
 * Processes the current state through the language model
 * Returns a new state with the model's response
 */
const processWithModel = (model: ReturnType<typeof createLanguageModel>) => {
  return async (state: AgentState): Promise<Partial<AgentState>> => {
    const response = await model.invoke(state.messages);
    const modelMessage = new AIMessage({
      content: response.content,
      tool_calls: response.tool_calls,
      additional_kwargs: response.additional_kwargs,
    });
    return { messages: [modelMessage] };
  };
};

/**
 * Sets up the workflow graph structure
 * Defines how messages flow between the agent and tools
 */
const setupWorkflowGraph = (
  graphState: StateGraphArgs<AgentState>["channels"],
  toolNode: ToolNode,
  modelProcessor: ReturnType<typeof processWithModel>,
) => {
  return new StateGraph<AgentState>({ channels: graphState })
    .addNode("agent", modelProcessor)
    .addNode("tools", toolNode)
    .addEdge("__start__", "agent")
    .addConditionalEdges("agent", determineNextStep)
    .addEdge("tools", "agent");
};

/**
 * Main function to create and execute a workflow with the given prompt
 * This orchestrates the entire process of handling a user input and getting a response
 */
const createWorkflow = async (prompt: string) => {
  // Setup message handling
  const graphState: StateGraphArgs<AgentState>["channels"] = {
    messages: {
      reducer: (prev: BaseMessage[], next: BaseMessage[]) => prev.concat(next),
    },
  };

  // Initialize components
  const weatherTool = createWeatherTool();
  const tools = [weatherTool];
  const toolNode = new ToolNode(tools);
  const model = createLanguageModel(tools);
  const modelProcessor = processWithModel(model);

  // Create and compile the workflow
  const workflow = setupWorkflowGraph(graphState, toolNode, modelProcessor);
  const checkpointer = new MemorySaver();
  const app = workflow.compile({ checkpointer });

  // Execute the workflow with the given prompt
  const finalState = await app.invoke(
    { messages: [new HumanMessage(prompt)] },
    { configurable: { thread_id: "42" } },
  );

  // Extract and return the final response
  const finalMessage = finalState.messages[finalState.messages.length - 1].content;
  console.log("Final response:", finalMessage);
  return finalMessage;
};

export type { createWorkflow };
Object.assign(globalThis, { createWorkflow });
