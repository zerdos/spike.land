import type { BaseMessage } from "@langchain/core/messages";

// Extended BaseMessage that includes index signature
export interface ExtendedBaseMessage extends BaseMessage {
  [key: string]: unknown;
}

export interface AgentState {
  messages: ExtendedBaseMessage[];
  origin: string;
  code: string;
  codeSpace: string;
  lastError: string;
  isStreaming: boolean;
  hash: string;
}

export interface CodeModification {
  type?: "create" | "update" | "delete";
  path?: string;
  content?: string;
  reason?: string;
  // Additional properties used by tools
  code?: string;
  error?: string;
  hash?: string;
  currentFileContent?: string;
  modifiedCodeHash?: string;
  [key: string]: unknown;
}

export interface ToolResponseMetadata {
  hash: string;
  modifiedCodeHash: string | undefined;
  compilationError: string | undefined;
  codeWasReturned: boolean;
}