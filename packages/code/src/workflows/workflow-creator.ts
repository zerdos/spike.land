import { ANTHROPIC_API_CONFIG, MODEL_NAME } from "../config/workflow-config";
import { initialClaude } from "@/lib/initial-claude";
import type { ICode, ImageData } from "@/lib/interfaces";
import { getReplaceInFileTool } from "./tools/replace-in-file";
import { logCodeChanges, verifyCodeIntegrity } from "./tools/utils/code-utils";

import type { AgentState } from "../workflows/chat-langchain";
import type { WorkflowContinueResult } from "./workflow";
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { StateGraph } from "@langchain/langgraph/web";
import { MemorySaver } from "@langchain/langgraph/web";
import { v4 as uuidv4 } from "uuid";
import { telemetry } from "./telemetry";
import {
  createCodeIntegrityError,
  handleWorkflowError,
  WorkflowError,
} from "./tools/utils/error-handlers";
import { getHashWithCache } from "./code-processing";
import { createNewMessage } from "./message-handlers";
import { processMessage } from "./message-processor";
import { createGraphStateReducers } from "./state-reducers";
import type { ExtendedAgentState, WorkflowInvokeResult } from "./workflow-types";

// Module cache for workflows
export const workflowCache: Record<string, WorkflowInvokeResult> = {};

/**
 * Creates a workflow with string replace capability
 */
export function createWorkflowWithStringReplace(
  initialState: AgentState, cSess: ICode,
): WorkflowInvokeResult {
  // Record workflow initialization
  telemetry.trackEvent("workflow.initialize", {
    codeLength: initialState.code?.length?.toString() || "0",
    codeSpace: initialState.codeSpace,
  });

  // Create the replace-in-file tool with the provided code session

  const tools = [getReplaceInFileTool(cSess)];
  const toolNode = new ToolNode(tools);

  // Create the model with bound tools
  const baseModel = new ChatAnthropic({
    model: MODEL_NAME,
    cache: true,
    anthropicApiKey: ANTHROPIC_API_CONFIG.apiKey,
    streaming: ANTHROPIC_API_CONFIG.streaming,
    anthropicApiUrl: ANTHROPIC_API_CONFIG.getApiUrl(initialState.origin),
    temperature: ANTHROPIC_API_CONFIG.temperature,
    maxTokens: ANTHROPIC_API_CONFIG.maxTokens,
  });

  // Bind tools to the model
  const modelWithTools = baseModel.bindTools(tools);

  // Create the graph state reducers
  const graphState = createGraphStateReducers();

  // Define the message processor function that will be used in the workflow
  const processMessageNode = async (state: AgentState) => {
    return processMessage(state, baseModel, cSess, initialState);
  };

  // Ensure the shouldContinue function is compatible with StateGraph
  const shouldContinue = async (state: AgentState): Promise<WorkflowContinueResult> => {
    if (state.lastError) {
      console.log("shouldContinue: Ending due to error:", state.lastError);
      return "end";
    }
    
    const lastMessage = state.messages[state.messages.length - 1];
    
    // Debug logging to verify if tool calls are being generated
    console.log("shouldContinue: Last message type:", lastMessage?.constructor?.name);
    if (lastMessage && "tool_calls" in lastMessage) {
      const toolCalls = lastMessage.tool_calls || [];
      if (Array.isArray(toolCalls) && toolCalls.length > 0) {
        console.log("shouldContinue: Tool calls detected:", 
          JSON.stringify(toolCalls.map((tc: any) => ({ 
            name: tc.name, 
            args: typeof tc.args === 'string' ? '(string)' : Object.keys(tc.args || {})
          })))
        );
      } else {
        console.log("shouldContinue: No tool calls in message");
      }
    }
    
    const result = lastMessage instanceof HumanMessage ||
        (lastMessage && "tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls) &&
          lastMessage.tool_calls.length > 0)
      ? "tools"
      : "end";
      
    console.log("shouldContinue: Returning", result);
    return result;
  };

  // Use type assertion for StateGraph initialization as it expects a specific structure
  const workflow = new StateGraph({ channels: graphState } as any)
    .addNode("process", processMessageNode)
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
    invoke: async (prompt: string, images: ImageData[] = []): Promise<AgentState> => {
      telemetry.startTimer("workflow.invoke");
      try {
        const userMessageToSave = await createNewMessage(images, prompt);

        // Use messagesPush to create the updated messages array, then add the message
        await cSess.addMessage(userMessageToSave);

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
        }) as unknown as AgentState;

        if (finalState.code !== initialState.code) {
          // Calculate hash with caching for final code
          const finalHash = getHashWithCache(finalState.code);

          if (!verifyCodeIntegrity(finalState.code, finalHash)) {
            throw createCodeIntegrityError(
              "Code integrity",
              initialState.hash,
              finalHash,
              finalState.code.length,
            );
          }

          finalState.hash = finalHash;

          // Track code modification
          telemetry.trackCodeModification("update", {
            filePath: `/live/${initialState.codeSpace}.tsx`,
            linesChanged: Number(finalState.code.split("\n").length) -
              Number(initialState.code.split("\n").length),
            bytesChanged: finalState.code.length - initialState.code.length,
          });
        }

        // Get the current code from the session
        const newCode = await cSess.getCode();

        // Check if the code has been modified during workflow execution
        if (finalState.code !== initialState.code) {
          console.log("Code changes detected in finalState, applying changes...");

          // Add timestamp to the modified code
          const newCodeWithDate = finalState.code + `
// generated: ${new Date().toISOString()}\n`;

          // Update the code in the session
          await cSess.setCode(newCodeWithDate);
          finalState.code = newCodeWithDate;
          logCodeChanges(initialState.code, finalState.code);
        } else if (newCode !== initialState.code) {
          // Fallback: If finalState.code wasn't updated but session code was
          console.log(
            "Code changes detected in session but not in finalState, applying session changes...",
          );

          const newCodeWithDate = newCode + `
// generated: ${new Date().toISOString()}\n`;

          await cSess.setCode(newCodeWithDate);
          finalState.code = newCodeWithDate;
          logCodeChanges(initialState.code, finalState.code);
        } else {
          console.log("No code changes detected");
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
}
