import type { HandleSendMessageProps, ICode } from "@/lib/interfaces";
import {
  createWorkflowWithStringReplace as workflowCreator,
  handleSendMessage as processMessage,
} from "./workflow-creator";

// Re-export for backward compatibility
export const createWorkflowWithStringReplace = workflowCreator;

/**
 * Handles sending a message to the workflow
 *
 * This is the main entry point for the chat-langchain workflow.
 * It delegates to the refactored implementation in workflow-creator.ts
 */
export const handleSendMessage = async (
  props: HandleSendMessageProps
): Promise<void> => {
  return processMessage(props);
};
