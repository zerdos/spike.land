import type { HandleSendMessageProps, ICode } from "@/lib/interfaces";
import { handleSendMessage as processMessage, createWorkflowWithStringReplace as workflowCreator } from "./workflow-creator";

// Re-export for backward compatibility
export const createWorkflowWithStringReplace = workflowCreator;

/**
 * Handles sending a message to the workflow
 * 
 * This is the main entry point for the chat-langchain workflow.
 * It delegates to the refactored implementation in workflow-creator.ts
 */
export const handleSendMessage = async (
  props: HandleSendMessageProps,
  cSess: ICode,
): Promise<void> => {
  return processMessage(props, cSess);
};
