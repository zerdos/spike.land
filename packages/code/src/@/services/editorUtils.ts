import type { ImageData } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { prettierToThrow, transpile } from "@/lib/shared";
import { tryCatch } from "@/lib/try-catch";
import type { RunMessageResult } from "./types";

export interface EditorState {
  started: boolean;
  sub: boolean;
  code: string;
  setValue: (code: string) => void;
}

/**
 * Generic function type that preserves argument and return types.
 * Use this instead of `(...args: any[]) => any` for better type safety.
 * @template TArgs - Tuple type representing function arguments
 * @template TReturn - Return type of the function
 */
type GenericFunction<TArgs extends unknown[] = unknown[], TReturn = unknown> = (
  ...args: TArgs
) => TReturn;

/**
 * Type constraint for async functions returning a Promise.
 * @template TArgs - Tuple type representing function arguments
 * @template TReturn - The unwrapped return type (what the Promise resolves to)
 */
type AsyncFunction<TArgs extends unknown[] = unknown[], TReturn = unknown> = (
  ...args: TArgs
) => Promise<TReturn>;

function memoize<TArgs extends unknown[], TReturn>(
  fn: GenericFunction<TArgs, TReturn>,
  keyResolver?: (...args: TArgs) => string,
): GenericFunction<TArgs, TReturn> {
  const cache = new Map<string, TReturn>();

  return ((...args: TArgs): TReturn => {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key) as TReturn;
    }

    const result = fn(...args);
    cache.set(key, result);

    if (result instanceof Promise) {
      result.catch(() => {
        cache.delete(key);
      });
    }

    return result;
  });
}

/**
 * Type for a memoized function that accepts an AbortSignal as the last parameter.
 * @template TArgs - Tuple type representing the original function arguments
 * @template TReturn - The unwrapped return type (what the Promise resolves to)
 */
type MemoizedFunctionWithAbort<TArgs extends unknown[], TReturn> = (
  ...args: [...TArgs, AbortSignal]
) => Promise<TReturn>;

/**
 * Callback interface for managing promise resolution with abort signals.
 * @template TReturn - The type of value the promise resolves to
 */
interface MemoizeCallbacks<TReturn> {
  resolve: (value: TReturn) => void;
  reject: (reason?: unknown) => void;
  signal: AbortSignal;
}

/**
 * Memoizes an async function with support for AbortSignal cancellation.
 * Multiple concurrent calls with the same arguments share the same underlying promise.
 * @template TArgs - Tuple type representing the original function arguments
 * @template TReturn - The unwrapped return type (what the Promise resolves to)
 * @param fn - The async function to memoize
 * @param keyResolver - Optional function to generate cache keys from arguments
 * @returns A memoized version of the function that accepts an AbortSignal as the last argument
 */
export function memoizeWithAbort<TArgs extends unknown[], TReturn>(
  fn: AsyncFunction<TArgs, TReturn>,
  keyResolver?: (...args: TArgs) => string,
): MemoizedFunctionWithAbort<TArgs, TReturn> {
  const cache = new Map<
    string,
    { promise: Promise<TReturn>; callbacks: MemoizeCallbacks<TReturn>[]; }
  >();

  return ((...args: [...TArgs, AbortSignal]): Promise<TReturn> => {
    const signal = args.pop() as AbortSignal;
    const fnArgs = args as unknown as TArgs;
    const key = keyResolver ? keyResolver(...fnArgs) : JSON.stringify(fnArgs);

    if (cache.has(key)) {
      const entry = cache.get(key)!;
      const { promise, callbacks } = entry;

      if (signal.aborted) {
        return Promise.reject(
          new DOMException("Aborted", "AbortError"),
        );
      }

      const newPromise = new Promise<TReturn>((resolve, reject) => {
        callbacks.push({ resolve, reject, signal });
        signal.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });

      promise.then(
        (value: TReturn) => {
          callbacks.forEach((cb) => cb.resolve(value));
        },
        (error: unknown) => {
          callbacks.forEach((cb) => cb.reject(error));
        },
      );

      return newPromise;
    } else {
      if (signal.aborted) {
        return Promise.reject(
          new DOMException("Aborted", "AbortError"),
        );
      }

      const callbacks: MemoizeCallbacks<TReturn>[] = [];
      const promise = fn(...fnArgs).then(
        (value: TReturn) => {
          cache.delete(key);
          return value;
        },
        (error: unknown) => {
          cache.delete(key);
          throw error;
        },
      );

      cache.set(key, { promise, callbacks });

      const newPromise = new Promise<TReturn>((resolve, reject) => {
        callbacks.push({ resolve, reject, signal });
        signal.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });

      promise.then(
        (value: TReturn) => {
          callbacks.forEach((cb) => cb.resolve(value));
        },
        (error: unknown) => {
          callbacks.forEach((cb) => cb.reject(error));
        },
      );

      return newPromise;
    }
  });
}

export const formatCode = memoize(async (code: string): Promise<string> => {
  const { data, error } = await tryCatch(
    prettierToThrow({ code, toThrow: true }),
  );
  if (error) {
    const errorMessage = typeof error === "string"
      ? error
      : (error as Error).message || JSON.stringify(error);
    throw new Error(
      `Prettier formatting failed: ${errorMessage.replace(/\\n/g, "\n").split('"').join('"')}`,
    );
  }
  if (data === null || data === undefined) {
    throw new Error("Prettier formatting returned null or undefined.");
  }
  return data;
}, (code: string) => md5(code));

export const transpileCode = memoize(async (code: string): Promise<string> => {
  const { data, error } = await tryCatch(
    transpile({ code, originToUse: location.origin }),
  );
  if (error) {
    throw new Error(
      `Transpilation failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  if (data === null || data === undefined) {
    throw new Error("Transpilation returned null or undefined.");
  }
  return data;
}, (code: string) => md5(code));

/**
 * Message data structure for screenshot responses from the iframe.
 */
interface ScreenshotMessageData {
  type: "screenshot";
  imageData: ImageData;
}

/**
 * Type guard to check if message data is a screenshot response.
 * @param data - The message data to check
 * @returns True if the data is a valid screenshot response
 */
function isScreenshotMessage(data: unknown): data is ScreenshotMessageData {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    (data as ScreenshotMessageData).type === "screenshot" &&
    "imageData" in data
  );
}

/**
 * Captures a screenshot from the iframe content.
 * @returns A promise that resolves with the screenshot image data
 */
export const screenshot = (): Promise<ImageData> => {
  return new Promise<ImageData>((resolve) => {
    const iframe = document.querySelector("iframe");

    const messageHandler = (event: MessageEvent<unknown>): void => {
      if (iframe && event.source === iframe.contentWindow && isScreenshotMessage(event.data)) {
        window.removeEventListener("message", messageHandler);
        resolve(event.data.imageData);
      }
    };

    window.addEventListener("message", messageHandler);

    iframe?.contentWindow?.postMessage({
      type: "screenshot",
      sender: "Runner / Editor",
    }, "*");
  });
};

/**
 * Message data structure for code execution results from the iframe.
 */
interface CodeExecutionResultMessageData {
  type: "code-execution-result";
  result: RunMessageResult;
}

/**
 * Type guard to check if message data is a code execution result.
 * @param data - The message data to check
 * @returns True if the data is a valid code execution result
 */
function isCodeExecutionResultMessage(
  data: unknown,
): data is CodeExecutionResultMessageData {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    (data as CodeExecutionResultMessageData).type === "code-execution-result" &&
    "result" in data
  );
}

/**
 * Executes transpiled code in the iframe and returns the result.
 * @param transpiled - The transpiled JavaScript code to execute
 * @returns A promise that resolves with the execution result or false on failure
 */
export const runCode = async (
  transpiled: string,
): Promise<RunMessageResult | false> => {
  return new Promise((resolve) => {
    const iframe = document.querySelector("iframe");
    if (!iframe || !iframe.contentWindow) {
      console.error("No iframe found for code execution");
      return resolve(false);
    }

    const messageHandler = (event: MessageEvent<unknown>): void => {
      if (
        iframe &&
        event.source === iframe.contentWindow &&
        isCodeExecutionResultMessage(event.data)
      ) {
        window.removeEventListener("message", messageHandler);
        resolve(event.data.result);
      }
    };

    window.addEventListener("message", messageHandler);

    iframe.contentWindow.postMessage({
      type: "execute-code",
      code: transpiled,
    }, "*");

    // Add timeout to prevent hanging
    setTimeout(() => {
      window.removeEventListener("message", messageHandler);
      console.error("Code execution timed out");
      resolve(false);
    }, 5000);
  });
};

export interface EditorInitOptions {
  container: HTMLDivElement;
  codeSpace: string;
  code: string;
  onChange: (newCode: string) => void;
}

export interface EditorInstance {
  getValue: () => string;
  silent: boolean;
  getErrors: () => Promise<string[]>;
  isEdit: boolean;
  setValue: (_newCode: string) => void;
}

export async function initializeMonaco(
  options: EditorInitOptions,
): Promise<EditorInstance> {
  const { startMonacoEditor } = await import("@/components/app/monaco-edi");
  const { data, error } = await tryCatch(startMonacoEditor(options));
  if (error) {
    throw new Error(`Monaco initialization failed: ${String(error)}`);
  }
  if (!data) {
    throw new Error("Monaco initialization failed: No data returned");
  }
  const { getValue, silent, getErrors, isEdit, setValue } = data;
  return {
    getValue,
    silent,
    getErrors,
    isEdit,
    setValue,
  };
}
