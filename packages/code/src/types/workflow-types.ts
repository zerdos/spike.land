import type { AIMessage } from "@langchain/core/messages";

export interface AgentState {
  messages: AIMessage[];
  code?: string;
  origin: string;
  codeSpace: string;
  lastError?: string;
  hash?: string;
  filePath?: string;
  isStreaming?: boolean;
}

export type WorkflowContinueResult = "process" | "tools" | "end";

export interface CompiledWorkflow {
  invoke: (
    state: AgentState,
    config: { configurable: { thread_id: string; }; },
  ) => Promise<AgentState>;
}

export interface WorkflowHandler {
  processMessage: (state: AgentState) => Promise<Partial<AgentState>>;
  shouldContinue: (state: AgentState) => Promise<WorkflowContinueResult>;
}

export interface WorkflowChannels {
  messages: { reducer: (prev: AIMessage[], next: AIMessage[]) => AIMessage[]; };
  codeSpace: { reducer: (prev: string, next: string) => string; };
  origin: { reducer: (prev: string, next: string) => string; };
  code: { reducer: (prev: string, next: unknown) => string; };
  lastError: { reducer: (prev: string, next: unknown) => string; };
  isStreaming: { reducer: (prev: boolean, next: boolean) => boolean; };
  hash: { reducer: (prev: string | undefined, next: string) => string; };
  filePath: {
    reducer: (prev: string | undefined, next: string | undefined) => string | undefined;
  };
}
