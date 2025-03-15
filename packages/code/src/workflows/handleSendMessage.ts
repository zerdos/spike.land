import type { HandleSendMessageProps } from "@/lib/interfaces";
import type { AgentState } from "./chat-langchain";
import { getHashWithCache } from "./code-processing";
import {
  createEnhancedWorkflowWithStringReplace,
  enhancedWorkflowCache,
} from "./enhanced-workflow-creator";

/**
 * Handles sending a message to the workflow
 */

export async function handleSendMessage(
  { prompt, images, cSess }: HandleSendMessageProps,
): Promise<AgentState> {
  const codeSpace = cSess.getCodeSpace();
  const code = await cSess.getCode();
  // Get or create workflow for this codeSpace
  const workflow = enhancedWorkflowCache[codeSpace] ||
    await createEnhancedWorkflowWithStringReplace({
      code: code,
      codeSpace: codeSpace,
      origin: location.origin,
      lastError: "",
      isStreaming: false,
      messages: [],
      hash: getHashWithCache(code),
    }, cSess);

  // Cache the workflow for future use
  enhancedWorkflowCache[codeSpace] = workflow;

  // Invoke the workflow with the prompt
  // The workflow will automatically use the replace_in_file tool when needed
  // through the ToolNode and model.bindTools setup in createWorkflowWithStringReplace
  const finalState = await workflow.invoke(prompt, images || []);

  console.log("Final workflow state:", finalState);

  return finalState;
}
