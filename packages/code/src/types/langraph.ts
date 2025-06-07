import type { RunnableConfig } from "@langchain/core/runnables";
import type { AgentState } from "./workflow-types";

/**
 * Interface for iterable readable stream
 */
interface IterableReadableStreamInterface<T> extends AsyncIterable<T> {
  getReader(): {
    read: () => Promise<{ done: boolean; value: T | undefined; }>;
    releaseLock: () => void;
  };
}

/**
 * Create an iterable readable stream from an async value
 */
async function createIterableStream<T>(
  getValue: () => Promise<T>,
): Promise<IterableReadableStreamInterface<T>> {
  let value: T;
  return {
    [Symbol.asyncIterator]: async function*() {
      if (!value) {
        value = await getValue();
      }
      yield value;
    },
    getReader() {
      let consumed = false;
      return {
        read: async () => {
          if (consumed) {
            return { done: true, value: undefined };
          }
          consumed = true;
          if (!value) {
            value = await getValue();
          }
          return { done: false, value };
        },
        releaseLock() {},
      };
    },
  };
}

/**
 * Node state and update types
 */
export type NodeState = AgentState;
export type NodeUpdate = Partial<AgentState>;

/**
 * Configuration for workflow nodes
 */
export interface NodeConfig extends RunnableConfig {
  configurable: { thread_id: string; };
}

/**
 * Interface for workflow graph nodes
 */
export interface WorkflowNode {
  invoke: (state: NodeState, config?: NodeConfig) => Promise<NodeUpdate>;
  lc_namespace: string[];
  lc_serializable: boolean;
  batch: (states: NodeState[]) => Promise<NodeUpdate[]>;
  stream: (
    input: NodeState,
    options?: Partial<NodeConfig>,
  ) => Promise<IterableReadableStreamInterface<NodeUpdate>>;
  transform: (input: AsyncGenerator<unknown>) => AsyncGenerator<NodeState>;
  getName(): string;
  lc_id: string[];
  getRuntimeEnvironment(): Record<string, unknown>;
}

/**
 * Create a workflow node with LangGraph compatibility
 */
export function createNode(
  name: string,
  processFunc: (state: NodeState) => Promise<NodeUpdate>,
): WorkflowNode {
  return {
    invoke: processFunc,
    lc_namespace: ["langchain", "graph"],
    lc_serializable: true,
    batch: async (states: NodeState[]) => Promise.all(states.map(processFunc)),
    stream: async (input: NodeState) => {
      return createIterableStream(() => processFunc(input));
    },
    transform: async function*(generator: AsyncGenerator<unknown>) {
      for await (const value of generator) {
        yield value as NodeState;
      }
    },
    getName: () => name,
    lc_id: [name],
    getRuntimeEnvironment: () => ({}),
  };
}

/**
 * Type for compiled workflow graph
 */
export interface CompiledGraph {
  invoke: (
    state: NodeState,
    options?: Partial<NodeConfig>,
  ) => Promise<NodeState>;
}

/**
 * Default state initialization
 */
export const createInitialState = (): NodeState => ({
  messages: [],
  codeSpace: "",
  origin: "",
  code: "",
  lastError: "",
  isStreaming: false,
  hash: "",
  filePath: "",
});
