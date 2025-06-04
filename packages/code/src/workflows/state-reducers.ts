import { Annotation } from "@langchain/langgraph";
import type { BaseMessage } from "@langchain/core/messages";
import { tryExtractCodeFromJson } from "./code-processing";
import { ErrorType, WorkflowError } from "./tools/utils/error-handlers";

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
      reducer: (prev: string, next: unknown): string => {
        try {
          // Direct string return
          if (typeof next === "string") return next;

          // Handle object types
          if (typeof next === "object" && next !== null) {
            // Try to extract code from content field (JSON string)
            if ("content" in next && typeof (next as Record<string, unknown>).content === "string") {
              const extractedCode = tryExtractCodeFromJson((next as Record<string, unknown>).content as string);
              if (extractedCode) return extractedCode;
            }

            // Direct code field
            if ("code" in next && typeof (next as Record<string, unknown>).code === "string") {
              return (next as Record<string, unknown>).code as string;
            }

            // If only hash is present, keep previous code
            if (!("code" in next) && "hash" in next) return prev;
          }

          // Default: keep previous code
          return prev;
        } catch (error) {
          console.error("Code reduction error:", error);
          throw new WorkflowError(
            "Code reduction failed",
            ErrorType.Unexpected,
            { error, input: next },
            "There was an error processing the code. Try simplifying your request.",
          );
        }
      },
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
