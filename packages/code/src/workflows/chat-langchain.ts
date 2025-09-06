import type { BaseMessage } from "@langchain/core/messages";

export interface AgentState {
  messages: BaseMessage[];
  origin: string;
  code: string;
  codeSpace: string;
  lastError: string;
  isStreaming: boolean;
  hash: string;
}

export interface CodeModification {
  type: "create" | "update" | "delete";
  path: string;
  content?: string;
  reason?: string;
}