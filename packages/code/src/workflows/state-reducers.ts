import { Annotation } from "@langchain/langgraph";
import type { BaseMessage } from "@langchain/core/messages";

/**
 * Creates the graph state schema using LangGraph's Annotation system
 */
export function createGraphStateReducers() {
  return Annotation.Root({
    messages: Annotation<BaseMessage[]>({
      reducer: (prev, next) => [...prev, ...next],
      default: () => [],
    }),
    codeSpace: Annotation<string>({
      reducer: (_prev, next) => next,
      default: () => "",
    }),
    origin: Annotation<string>({
      reducer: (_prev, next) => next,
      default: () => "",
    }),
    code: Annotation<string>({
     reducer: (_prev, next) => next,
      default: () => "",
    }),
    lastError: Annotation<string>({
      reducer: (prev: string, next: unknown): string => {
        try {
          // Direct string errors
          if (typeof next === "string") return next;

          // Object with error property
          if (typeof next === "object" && next !== null) {
            if ("error" in next) {
              const err = (next as Record<string, unknown>).error;
              // Handle different error types
              if (typeof err === "string") return err;
              if (err instanceof Error) return err.message;
              return String(err);
            }

            // Try to extract message from Error objects
            if (next instanceof Error) return next.message;
          }

          // Default: keep previous error or convert to string
          return prev;
        } catch (e) {
          console.error("Error in lastError reducer:", e);
          return prev;
        }
      },
      default: () => "",
    }),
    isStreaming: Annotation<boolean>({
      reducer: (_prev, next) => next,
      default: () => false,
    }),
    debugLogs: Annotation<string[]>({
      reducer: (prev, next) => [...prev, ...next],
      default: () => [],
    }),
    hash: Annotation<string>({
      reducer: (_prev, next) => next,
      default: () => "",
    }),
    filePath: Annotation<string | undefined>({
      reducer: (_prev, next) => next,
      default: () => undefined,
    }),
    recursionLimit: Annotation<number>({
      reducer: (_prev, next) => next,
      default: () => 10,
    }),
  });
}
