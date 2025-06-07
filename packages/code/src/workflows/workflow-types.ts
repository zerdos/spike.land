import type { ImageData } from "@/lib/interfaces";
import type { AgentState } from "../workflows/chat-langchain";

/**
 * Extended agent state with additional properties for workflow processing
 */
export interface ExtendedAgentState extends AgentState {
  debugLogs?: string[];
  images?: ImageData[];
  hasImages?: boolean;
}

/**
 * Metadata extracted from tool responses
 */
export interface ToolResponseMetadata {
  hash?: string;
  modifiedCodeHash?: string;
  compilationError?: string | boolean;
  codeWasReturned: boolean;
}

/**
 * Result of the workflow invocation
 */
export interface WorkflowInvokeResult {
  invoke: (prompt: string, images?: ImageData[]) => Promise<AgentState>;
}
