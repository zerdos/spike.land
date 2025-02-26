import type { BaseMessage } from "@langchain/core/messages";

export interface AgentState {
  messages: BaseMessage[];
  code: string;
  lastError: string;
  isStreaming: boolean;
  debugLogs: string[];
  documentHash: string; // Hash of the code for integrity verification
  filePath?: string; // Path to the file being modified, used for AST parsing
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
