import type { BaseMessage } from "@langchain/core/messages";

// Global type declarations
declare global {
  interface Window {
    currentFile?: {
      content: string;
      path: string;
    };
  }
  var currentFile: Window['currentFile'];
}

export interface AgentState {
  messages: BaseMessage[];
  code: string;
  lastError: string;
  isStreaming: boolean;
  debugLogs: string[];
}

export interface CodeModification {
  code: string;
  error: string;
  retryCount?: number;
  currentFileContent?: string;
  searchContent?: string;
  blockNumber?: number;
  totalBlocks?: number;
}
