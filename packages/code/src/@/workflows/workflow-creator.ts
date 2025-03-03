import { ANTHROPIC_API_CONFIG, MODEL_NAME } from "@/config/workflow-config";
import { messagesPush } from "@/lib/chat-utils";
import type { ICode, ImageData } from "@/lib/interfaces";
import { initialClaude } from "@/lib/initial-claude";
import type { AgentState } from "@/types/chat-langchain";
import type { WorkflowContinueResult } from "@/types/workflow";
import { logCodeChanges, verifyCodeIntegrity } from "@/utils/code-utils";
import { createCodeIntegrityError, handleWorkflowError, WorkflowError } from "@/utils/error-handlers";
import { createReplaceInFileTool } from "@/tools/replace-in-file";
import { ChatAnthropic } from "@langchain/anthropic";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { StateGraph } from "@langchain/langgraph/web";
import { MemorySaver } from "@langchain/langgraph/web";
import { v4 as uuidv4 } from "uuid";
import { telemetry } from "../../lib/telemetry";
import { getHashWithCache } from "./code-processing";
import { createNewMessage } from "./message-handlers";
import { processMessage } from "./message-processor";
import { createGraphStateReducers } from "./state-reducers";
import type { ExtendedAgentState, WorkflowInvokeResult } from "./workflow-types";

// Module cache for workflows
const workflowCache: Record<string, WorkflowInvokeResult> = {};

/**
 * Creates a workflow with string replace capability
 */
export function createWorkflowWithStringReplace(
  initialState: AgentState, 
  cSess: ICode
): WorkflowInvokeResult {
  // Record workflow initialization
  telemetry.trackEvent("workflow.initialize", {
    codeLength: initialState.code?.length?.toString() || "0",
    codeSpace: initialState.codeSpace,
  });

  // Create the replace-in-file tool with the provided code session
  const replaceInFileTool = createReplaceInFileTool(cSess);
  const tools = [replaceInFileTool];
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
  
  const modelWithTools = baseModel.bindTools(tools);

  // Create the graph state reducers
  const graphState = createGraphStateReducers();

  // Define the message processor function that will be used in the workflow
  const processMessageNode = async (state: AgentState) => {
    return processMessage(state, baseModel, cSess, initialState);
  };

  // Ensure the shouldContinue function is compatible with StateGraph
  const shouldContinue = async (state: AgentState): Promise<WorkflowContinueResult> => {
    if (state.lastError) return "end";
    const lastMessage = state.messages[state.messages.length - 1];
    return lastMessage instanceof HumanMessage || 
           (lastMessage && "tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls) && 
            lastMessage.tool_calls.length > 0)
      ? "tools"
      : "end";
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
        const messages = cSess.getMessages();
        const userMessageToSave = await createNewMessage(images, prompt);

        await cSess.setMessages(messagesPush(messages, userMessageToSave));

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

        // Save the user message to cSess
        if (cSess) {
          await cSess.setMessages(messagesPush(cSess.getMessages(), {
            id: Date.now().toString(),
            role: "user",
            content: prompt,
          }));
        }

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
          const finalhash = getHashWithCache(finalState.code);

          if (!verifyCodeIntegrity(finalState.code, finalhash)) {
            throw createCodeIntegrityError(
              "Code integrity",
              initialState.hash,
              finalhash,
              finalState.code.length,
            );
          }

          finalState.hash = finalhash;

          // Track code modification
          telemetry.trackCodeModification("update", {
            filePath: `/live/${initialState.codeSpace}.tsx`,
            linesChanged: Number(finalState.code.split("\n").length) -
              Number(initialState.code.split("\n").length),
            bytesChanged: finalState.code.length - initialState.code.length,
          });
        }

        if (finalState.code !== initialState.code) {
          logCodeChanges(initialState.code, finalState.code);
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

/**
 * Handles sending a message to the workflow
 */
export async function handleSendMessage(
  { messages, codeSpace, prompt, images, code }: {
    messages: unknown[];
    codeSpace: string;
    prompt: string;
    images?: ImageData[];
    code: string;
  },
  cSess: ICode,
): Promise<void> {
  // Get or create workflow for this code space
  const workflow = workflowCache[codeSpace] || await createWorkflowWithStringReplace({
    code: code,
    codeSpace: codeSpace,
    origin: location.origin,
    lastError: "",
    isStreaming: false,
    messages: [],
    hash: getHashWithCache(code),
  }, cSess);

  // Cache the workflow for future use
  workflowCache[codeSpace] = workflow;

  // Invoke the workflow with the prompt
  const finalState = await workflow.invoke(prompt, images || []);

  console.log("Final workflow state:", finalState);
}
