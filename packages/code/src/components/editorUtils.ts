import type { ImageData } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { prettierToThrow, transpile } from "@/lib/shared";
import { RunMessageResult } from "src/services/websocket/types";

export interface EditorState {
  started: boolean;
  sub: boolean;
  code: string;
  setValue: (code: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

function memoize<T extends AnyFunction>(
  fn: T,
  keyResolver?: (...args: Parameters<T>) => string,
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    if (result instanceof Promise) {
      result.catch(() => {
        cache.delete(key);
      });
    }

    return result;
  }) as T;
}

type MemoizedFunctionWithAbort<T extends AnyFunction> = (
  ...args: [...Parameters<T>, AbortSignal]
) => ReturnType<T>;

export function memoizeWithAbort<T extends AnyFunction>(
  fn: T,
  keyResolver?: (...args: Parameters<T>) => string,
): MemoizedFunctionWithAbort<T> {
  interface Callbacks {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolve: (value: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reject: (reason?: any) => void;
    signal: AbortSignal;
  }

  const cache = new Map<
    string,
    { promise: Promise<ReturnType<T>>; callbacks: Callbacks[]; }
  >();

  return ((...args: [...Parameters<T>, AbortSignal]): ReturnType<T> => {
    const signal = args.pop() as AbortSignal;
    const fnArgs = args as unknown as Parameters<T>;
    const key = keyResolver ? keyResolver(...fnArgs) : JSON.stringify(fnArgs);

    if (cache.has(key)) {
      const entry = cache.get(key)!;
      const { promise, callbacks } = entry;

      if (signal.aborted) {
        return Promise.reject(
          new DOMException("Aborted", "AbortError"),
        ) as ReturnType<T>;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newPromise = new Promise<any>((resolve, reject) => {
        callbacks.push({ resolve, reject, signal });
        signal.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });

      promise.then(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (value: any) => {
          callbacks.forEach((cb) => cb.resolve(value));
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any) => {
          callbacks.forEach((cb) => cb.reject(error));
        },
      );

      return newPromise as ReturnType<T>;
    } else {
      if (signal.aborted) {
        return Promise.reject(
          new DOMException("Aborted", "AbortError"),
        ) as ReturnType<T>;
      }

      const callbacks: Callbacks[] = [];
      const promise = fn(...fnArgs).then(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (value: any) => {
          cache.delete(key);
          return value;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any) => {
          cache.delete(key);
          throw error;
        },
      );

      cache.set(key, { promise, callbacks });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newPromise = new Promise<any>((resolve, reject) => {
        callbacks.push({ resolve, reject, signal });
        signal.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });

      promise.then(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (value: any) => {
          callbacks.forEach((cb) => cb.resolve(value));
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any) => {
          callbacks.forEach((cb) => cb.reject(error));
        },
      );

      return newPromise as ReturnType<T>;
    }
  }) as MemoizedFunctionWithAbort<T>;
}

export const formatCode = memoize(async (code: string): Promise<string> => {
  try {
    return await prettierToThrow({ code, toThrow: true });
  } catch (error) {
    const errorMessage = typeof error === "string"
      ? error
      : (error as Error).message || JSON.stringify(error);
    throw new Error(
      `Prettier formatting failed: ${errorMessage.replace(/\\n/g, "\n").split('"').join('"')}`,
    );
  }
}, (code: string) => md5(code));

export const transpileCode = memoize(async (code: string): Promise<string> => {
  try {
    return await transpile({ code, originToUse: location.origin });
  } catch (error) {
    throw new Error(
      `Transpilation failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}, (code: string) => md5(code));

export const screenshot = (): Promise<ImageData> => {
  return new Promise<ImageData>((resolve) => {
    const messageHandler = (ev: MessageEvent): void => {
      if (ev.data.type === "screenshot") {
        const imageData = ev.data.imageData as ImageData;
        window.removeEventListener("message", messageHandler);

        resolve(imageData);
      }
    };

    const iframe = document.querySelector("iframe");
    // Only listen for messages from our iframe
    window.addEventListener("message", (event) => {
      if (iframe && event.source === iframe.contentWindow) {
        messageHandler(event);
      }
    });

    document.querySelector("iframe")?.contentWindow?.postMessage({
      type: "screenshot",
      sender: "Runner / Editor",
    }, "*");
  });
};

export const runCode = async (
  transpiled: string,
): Promise<RunMessageResult | false> => {
  return new Promise((resolve) => {
    const iframe = document.querySelector("iframe");
    if (!iframe || !iframe.contentWindow) {
      console.error("No iframe found for code execution");
      return resolve(false);
    }

    const messageHandler = (event: MessageEvent) => {
      if (
        iframe && event.source === iframe.contentWindow &&
        event.data.type === "code-execution-result"
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
  const { startMonaco } = await import("../monaco-edi");
  return await startMonaco(options);
}
