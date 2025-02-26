import type { BaseMessage } from "@langchain/core/messages";

export interface AgentState {
  messages: BaseMessage[];
  code: string;
  lastError: string;
  isStreaming: boolean;
  debugLogs: string[];
}

export type CodeModification = string | {
  code?: string;
  error?: string;
  retryCount?: number;
  currentFileContent?: string;
  searchContent?: string;
  blockNumber?: number;
  totalBlocks?: number;
  documentHash: string;
};
