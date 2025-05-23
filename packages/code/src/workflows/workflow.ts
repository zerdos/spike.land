import type { StateGraphArgs } from "@langchain/langgraph/web";
import type { AgentState } from "../workflows/chat-langchain";

export interface CodeChangeMetrics {
  sizeChange: number;
  lineCount: {
    original: number;
    modified: number;
  };
  changedLines: number;
  tokenSavings: number;
}

export interface ToolResponseMetadata {
  hash?: string;
  modifiedCodeHash?: string;
  compilationError?: string;
  codeWasReturned: boolean;
}

export interface SearchReplaceBlock {
  search: string;
  replace: string;
}

export type WorkflowChannels = StateGraphArgs<AgentState>["channels"];

export type WorkflowContinueResult = "process" | "tools" | "end";
