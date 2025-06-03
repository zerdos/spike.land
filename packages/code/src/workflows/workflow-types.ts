import type { ImageData } from "@/lib/interfaces";
import type { AIMessage } from "@langchain/core/messages";
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
 * Graph state reducers for the workflow
 */
export interface GraphStateReducers {
  messages: {
    reducer: (prev: AIMessage[], next: AIMessage[]) => AIMessage[];
  };
  codeSpace: {
    reducer: (_prev: string, next: string) => string;
  };
  origin: {
    reducer: (_prev: string, next: string) => string;
  };
  code: {
    reducer: (prev: string, next: unknown) => string;
  };
  lastError: {
    reducer: (prev: string, next: unknown) => string;
  };
  isStreaming: {
    reducer: (_prev: boolean, next: boolean) => boolean;
  };
  debugLogs: {
    reducer: (prev: string[], next: string[]) => string[];
  };
  hash: {
    reducer: (_prev: string | undefined, next: string) => string;
  };
  filePath: {
    reducer: (
      _prev: string | undefined,
      next: string | undefined,
    ) => string | undefined;
  };
  recursionLimit: {
    reducer: (_prev: number, next: number) => number;
  };
}

/**
 * Result of the workflow invocation
 */
export interface WorkflowInvokeResult {
  invoke: (prompt: string, images?: ImageData[]) => Promise<AgentState>;
}
