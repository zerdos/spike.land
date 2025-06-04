import { tryExtractCodeFromJson } from "./code-processing";
import { ErrorType, WorkflowError } from "./tools/utils/error-handlers";
import type { GraphStateReducers } from "./workflow-types";

/**
 * Creates the graph state reducers for the workflow
 */
export function createGraphStateReducers(): GraphStateReducers {
  return {
    messages: {
      reducer: (prev, next) => [...prev, ...next],
    },
    codeSpace: {
      reducer: (_prev, next) => next,
    },
    origin: {
      reducer: (_prev, next) => next,
    },
    code: {
      reducer: (prev, next) => {
        try {
          // Direct string return
          if (typeof next === "string") return next;

          // Handle object types
          if (typeof next === "object" && next !== null) {
            // Try to extract code from content field (JSON string)
            if ("content" in next && typeof next.content === "string") {
              const extractedCode = tryExtractCodeFromJson(next.content);
              if (extractedCode) return extractedCode;
            }

            // Direct code field
            if ("code" in next && typeof next.code === "string") {
              return next.code;
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
    },
    lastError: {
      reducer: (prev, next) => {
        try {
          // Direct string errors
          if (typeof next === "string") return next;

          // Object with error property
          if (typeof next === "object" && next !== null) {
            if ("error" in next) {
              const err = next.error;
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
    },
    isStreaming: {
      reducer: (_prev, next) => next,
    },
    debugLogs: {
      reducer: (prev, next) => [...prev, ...next],
    },
    hash: {
      reducer: (_prev, next) => next,
    },
    filePath: {
      reducer: (_prev, next) => next,
    },
    recursionLimit: {
      reducer: (_prev, next) => next,
    },
  };
}
