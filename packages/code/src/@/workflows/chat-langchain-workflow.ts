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
  // Define state graph channels with enhanced code reducer
  const graphState: StateGraphArgs<AgentState>["channels"] = {
    messages: {
      reducer: (prev: BaseMessage[], next: BaseMessage[]) => prev.concat(next),
    },
    code: {
      reducer: (prev: string, next: any) => {
        console.log('Code reducer received:', { prev, next });
        
        // Parse tool result if it's a string
        if (typeof next === 'string') {
          try {
            const parsed = JSON.parse(next);
            if (parsed && typeof parsed === 'object' && 'code' in parsed) {
              return parsed.code;
            }
          } catch {
            // If it's not JSON but a direct string, use it
            return next;
          }
        }
        
        // Handle direct tool result object
        if (next && typeof next === 'object') {
          // Handle tool result
          if ('returnValues' in next && next.returnValues?.code) {
            return next.returnValues.code;
          }
          // Handle direct code property
          if ('code' in next) {
            return next.code;
          }
        }
        
        return prev;
      },
    },
    lastError: {
      reducer: (prev: string, next: any) => {
        console.log('Error reducer received:', { prev, next });
        
        // Parse tool result if it's a string
        if (typeof next === 'string') {
          try {
            const parsed = JSON.parse(next);
            if (parsed && typeof parsed === 'object' && 'error' in parsed) {
              return parsed.error || prev;
            }
          } catch {
            // If not JSON, use string directly
            return next || prev;
          }
        }
        
        // Handle direct tool result object
        if (next && typeof next === 'object') {
          // Handle tool error
          if ('error' in next && typeof next.error === 'string') {
            return next.error;
          }
          // Handle returnValues error
          if ('returnValues' in next && next.returnValues?.error) {
            return next.returnValues.error;
          }
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
  };

  const tools = [codeModificationTool, codeFormattingTool, broadcastTool];
  const toolNode = new ToolNode(tools);

  // Clean up code helper
  const cleanCode = (code: string): string => {
    return code
      .replace(/'\s*\(see below for file content\)\s*/g, '')  // Remove markers
      .replace(/\\\"/g, '"')  // Fix escaped quotes
      .replace(/\\n/g, '\n')  // Fix newlines
      .trim();
  };

  // Create initial system message with cleaned code
  const systemMessage = new SystemMessage(
    anthropicSystem + "\n\nHere's the code to modify:\n```tsx\n" + cleanCode(initialState.code) + "\n```"
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
    // Clean the code for processing
    if (state.code) {
      state.code = cleanCode(state.code);
    }

    const response = await model.invoke(state.messages);
    
    // Create new state with response message
    const newState: Partial<AgentState> = {
      ...state,
      messages: [
        new AIMessage({
          content: response.content,
          tool_calls: response.tool_calls,
          additional_kwargs: response.additional_kwargs,
        }),
      ],
      isStreaming: true
    };

    // Clean the code in state for tools to use
    newState.code = state.code ? cleanCode(state.code) : state.code;

    // Check if the last message had tool calls that failed
    const lastMessage = state.messages[state.messages.length - 1];
    if ('additional_kwargs' in lastMessage && 
        'tool_error' in lastMessage.additional_kwargs) {
      // Extract error from tool result
      const toolError = lastMessage.additional_kwargs.tool_error;
      if (typeof toolError === 'string') {
        newState.lastError = toolError;
      }
    }

    return newState;
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

      if (initialState.code === finalState.code) {
        // Check if there were any tool calls that failed
        const hasToolCalls = finalState.messages.some((msg: { tool_calls: string | unknown[]; } ) => 
          'tool_calls' in msg && msg.tool_calls?.length > 0
        );
        
        if (hasToolCalls) {
          console.log("Code modifications were attempted but failed - code remains unchanged");
          // Log the last error if any
          if (finalState.lastError) {
            console.log("Last error:", finalState.lastError);
          }
        } else {
          console.log("No code modifications were attempted");
        }
      } else {
        console.log("Code was successfully modified", {
          initialCode: initialState.code,
          finalCode: finalState.code,
        });
      }
      console.log("Final state", finalState);

      return finalState;
    },
  };
};
