import { useCodeSpace } from "@/hooks/use-code-space";
import { createContextManager } from "@/lib/context-manager";
import { prettierToThrow, transpile } from "@/lib/shared";
import { md5 } from "@src/modules";
import { useRef, useState } from "react";

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
  const [error, setError] = useState<string | null>(null);
  const contextManager = createContextManager(useCodeSpace());

  const handleError = (errorType: string, errorMessage: string) => {
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
function memoize<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  const cache = new Map();

  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      const cachedResult = cache.get(key);
      if (cachedResult instanceof Error) {
        throw cachedResult;
      }
      return cachedResult;
    }
    try {
      const result = await fn(...args);
      cache.set(key, result);
      return result;
    } catch (error) {
      cache.set(key, error);
      throw error;
    }
  }) as T;
}

export const formatCode = memoize(async (code: string): Promise<string> => {
  const { error, handleError, clearError } = useErrorHandling();

  try {
    const formattedCode = await prettierToThrow({ code, toThrow: true });
    if (error === "prettier") {
      clearError();
    }
    return formattedCode;
  } catch (error) {
    const errorMessage = typeof error === "string"
      ? error
      : (error as Error).message || JSON.stringify(error);
    handleError("prettier", errorMessage.replace(/\\n/g, "\n").split(`\"`).join(`"`));
    throw new Error("Prettier formatting failed");
  }
});

function getErrorDetailsFromHtml(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const preElement = doc.querySelector("details pre");
  return preElement ? preElement.textContent!.trim() : null;
}

export const transpileCode = memoize(async (code: string): Promise<string> => {
  const { error, handleError, clearError } = useErrorHandling();

  try {
    const transpiled = await transpile({ code, originToUse: location.origin });
    if (error === "transpile") {
      clearError();
    }
    return transpiled;
  } catch (error) {
    handleError("transpile", error instanceof Error ? error.message : String(error));
    return "";
  }
});

export const runCode = memoize(async (transpiled: string) => {
  const { error, handleError, clearError } = useErrorHandling();

  try {
    let resolve: (v: { html: string; css: string }) => void;
    let reject: (reason: string) => void;

    const promise = new Promise<{ html: string; css: string }>(
      (_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      },
    );

    window.onmessage = (ev) => {
      const data: { hash: string; html: string; css: string } = ev.data;
      const { hash, html, css } = data;
      if (hash === md5(transpiled)) {
        resolve({ html, css });
      }
    };

    console.log("Sending message iframe first to calculate css", md5(transpiled));

    document.querySelector("iframe")?.contentWindow?.postMessage({
      transpiled,
      html: "",
      css: "",
      sender: "Runner / Editor",
    });

    const clear = setTimeout(() => {
      reject("timed out");
    }, 1500);

    const res = await promise;

    clearTimeout(clear);

    const { html, css } = res;

    if (html.includes("Oops! Something went wrong")) {
      const errorDetails = getErrorDetailsFromHtml(html);
      handleError("runner", errorDetails || "Unknown error occurred");
      return false;
    }

    if (error === "runner") {
      clearError();
    }

    return { html, css };
  } catch (error) {
    handleError("runner", error instanceof Error ? error.message : String(error));
    throw error;
  }
});

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
  addCSSFile("/*monaco-editor?bundle&css");
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

export function addCSSFile(filename: string): void {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = filename;
  document.head.appendChild(link);
}
