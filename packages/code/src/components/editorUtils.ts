import { useCodeSpace } from "@/hooks/use-code-space";
import { createContextManager } from "@/lib/context-manager";
import type { ImageData } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { prettierToThrow, transpile } from "@/lib/shared";
import { useRef, useState } from "react";
import { ErrorType } from "./ErrorMessages";

export interface EditorState {
  started: boolean;
  sub: boolean;
  code: string;
  setValue: (code: string) => void;
}

export interface EditorState {
  started: boolean;
  sub: boolean;
  code: string;
  setValue: (code: string) => void;
}

export const useEditorState = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState<EditorState>({
    started: false,
    sub: false,
    code: "",
    setValue: () => {},
  });

  const engine = "monaco"; // Or determine this dynamically

  return { containerRef, engine, editorState, setEditorState };
};

// Improved error handling hook
export const useErrorHandling = () => {
  const [error, setError] = useState<ErrorType>(null);
  const contextManager = createContextManager(useCodeSpace());

  const handleError = (errorType: ErrorType, errorMessage: string) => {
    setError(errorType);
    contextManager.updateContext("errorLog", errorMessage);
  };

  const clearError = () => {
    setError(null);
    contextManager.updateContext("errorLog", "");
  };

  return { error, handleError, clearError };
};

// Improved memoize function that handles async functions and errors
function memoize<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyResolver?: (...args: Parameters<T>) => string,
): T {
  const cache = new Map<string, Promise<any>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    // Exclude the last argument (assumed to be AbortSignal) from the key
    const keyArgs = args.slice(0, -1);
    const key = keyResolver ? keyResolver(...keyArgs) : JSON.stringify(keyArgs);

    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    const promise = fn(...args);
    cache.set(key, promise);

    // Clean up cache on rejection
    promise.catch(() => {
      cache.delete(key);
    });

    return promise as ReturnType<T>;
  }) as unknown as T;
}

export function memoizeWithAbort<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyResolver?: (...args: Parameters<T>) => string,
): T {
  type Callbacks = {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
    signal: AbortSignal;
  };

  const cache = new Map<string, { promise: Promise<any>; callbacks: Callbacks[] }>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const keyArgs = args.slice(0, -1);
    const signal = args[args.length - 1] as AbortSignal;
    const key = keyResolver ? keyResolver(...keyArgs) : JSON.stringify(keyArgs);

    if (cache.has(key)) {
      const entry = cache.get(key)!;
      const { promise, callbacks } = entry;

      if (signal.aborted) {
        return Promise.reject(new DOMException("Aborted", "AbortError")) as ReturnType<T>;
      }

      const newPromise = new Promise<any>((resolve, reject) => {
        callbacks.push({ resolve, reject, signal });
        signal.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });

      promise.then(
        (value) => {
          callbacks.forEach((cb) => cb.resolve(value));
        },
        (error) => {
          callbacks.forEach((cb) => cb.reject(error));
        },
      );

      return newPromise as ReturnType<T>;
    } else {
      if (signal.aborted) {
        return Promise.reject(new DOMException("Aborted", "AbortError")) as ReturnType<T>;
      }

      const callbacks: Callbacks[] = [];
      const promise = fn(...args).then(
        (value) => {
          cache.delete(key);
          return value;
        },
        (error) => {
          cache.delete(key);
          throw error;
        },
      );

      cache.set(key, { promise, callbacks });

      const newPromise = new Promise<any>((resolve, reject) => {
        callbacks.push({ resolve, reject, signal });
        signal.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });

      promise.then(
        (value) => {
          callbacks.forEach((cb) => cb.resolve(value));
        },
        (error) => {
          callbacks.forEach((cb) => cb.reject(error));
        },
      );

      return newPromise as ReturnType<T>;
    }
  }) as unknown as T;
}

export const formatCode = memoize(async (code: string): Promise<string> => {
  try {
    return await prettierToThrow({ code, toThrow: true });
  } catch (error) {
    const errorMessage = typeof error === "string"
      ? error
      : (error as Error).message || JSON.stringify(error);
    throw new Error(`Prettier formatting failed: ${errorMessage.replace(/\\n/g, "\n").split(`\"`).join(`"`)}`);
  }
});

function getErrorDetailsFromHtml(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const preElement = doc.querySelector("details pre");
  return preElement ? preElement.textContent!.trim() : null;
}

// Refactored transpileCode function without hooks
export const transpileCode = memoize(async (code: string): Promise<string> => {
  try {
    return await transpile({ code, originToUse: location.origin });
  } catch (error) {
    throw new Error(`Transpilation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
});

// Refactored screenShot function without unused reject variable
export const screenShot = () => {
  let resolve: (img: ImageData) => void;

  const promise = new Promise<ImageData>(
    (_resolve) => {
      resolve = _resolve;
    },
  );

  window.onmessage = (ev) => {
    if (ev.data.type === "screenShot") {
      const imageData = ev.data.imageData as ImageData;
      resolve(imageData);
    }
  };

  document.querySelector("iframe")?.contentWindow?.postMessage({
    type: "screenShot",
    sender: "Runner / Editor",
  });

  return promise;
};

export const runCode = memoizeWithAbort(
  async (transpiled: string, signal: AbortSignal) => {
    const requestId = md5(transpiled);

    // Check if the signal is already aborted
    if (signal.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    return new Promise<{ html: string; css: string }>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error("Timed out"));
      }, 1500);

      const messageHandler = (ev: MessageEvent) => {
        const data = ev.data;
        if (data && data.requestId === requestId) {
          if (data.type === "result") {
            clearTimeout(timeoutId);
            cleanup();
            if (data.error) {
              reject(new Error(data.error));
            } else {
              resolve({ html: data.html, css: data.css });
            }
          }
        }
      };

      const cleanup = () => {
        window.removeEventListener("message", messageHandler);
        signal.removeEventListener("abort", onAbort);
        clearTimeout(timeoutId);
      };

      const onAbort = () => {
        cleanup();
        // Send a cancellation message to the iframe
        document.querySelector("iframe")?.contentWindow?.postMessage(
          {
            type: "cancel",
            requestId,
          },
          "*",
        );
        reject(new DOMException("Aborted", "AbortError"));
      };

      window.addEventListener("message", messageHandler);
      signal.addEventListener("abort", onAbort);

      // Send the code to the iframe along with the requestId
      document.querySelector("iframe")?.contentWindow?.postMessage(
        {
          type: "run",
          requestId,
          transpiled,
        },
        "*",
      );
    });
  },
  (transpiled) => md5(transpiled), // Memoization key based on transpiled code
);

export async function initializeMonaco(
  container: HTMLDivElement,
  codeSpace: string,
  code: string,
  onChange: (newCode: string) => void,
): Promise<{
  getValue: () => string;
  silent: boolean;
  getErrors: () => Promise<string[]>;
  isEdit: boolean;
  setValue: (_newCode: string) => void;
}> {
  const { startMonaco } = await import("../monaco-edi");
  return await startMonaco({
    container,
    codeSpace,
    code,
    onChange,
  });
}

export async function initializeAce(
  container: HTMLDivElement,
  code: string,
  onChange: (newCode: string) => void,
): Promise<{
  getValue: () => string;
  getErrors: () => Promise<string[]>;
  setValue: (code: string) => void;
}> {
  const { startAce } = await import("../startAce");
  return await startAce(code, onChange, container);
}
