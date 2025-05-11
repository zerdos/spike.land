import type { HandleSendMessageProps } from "@/lib/interfaces";
import type { AgentState } from "./chat-langchain";
import { getHashWithCache } from "./code-processing";
import {
  createWorkflowWithStringReplace,
  workflowCache,
} from "./workflow-creator";

/**
 * Handles sending a message to the workflow
 */

export async function handleSendMessage(
  { prompt, images, cSess: codeSession }: HandleSendMessageProps, // Renamed cSess
): Promise<AgentState> {
  const codeSpace = codeSession.getCodeSpace(); // Renamed cSess
  const code = await codeSession.getCode(); // Renamed cSess
  // Get or create workflow for this codeSpace
  const workflow = workflowCache[codeSpace] ||
    await createWorkflowWithStringReplace({
      code: code,
      codeSpace: codeSpace,
      origin: location.origin,
      lastError: "",
      isStreaming: false,
      messages: [],
      hash: getHashWithCache(code),
    }, codeSession); // Renamed cSess

  // Cache the workflow for future use
  workflowCache[codeSpace] = workflow;

  // Invoke the workflow with the prompt
  // The workflow will automatically use the replace_in_file tool when needed
  // through the ToolNode and model.bindTools setup in createWorkflowWithStringReplace
  const finalState = await workflow.invoke(prompt, images || []);

  console.warn("Final workflow state:", finalState); // Changed to warn

  return finalState;
}
