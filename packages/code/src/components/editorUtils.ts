import type { ICodeSession } from "@/lib/interfaces";
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

const myError = {
  type: null as string | null,
  setError: (newType: string | null) => {
    myError.type = newType;
    try {
      myError.subscribers.forEach((subscriber) => {
        subscriber(myError.type);
      });
    } catch (error) {
      console.error("Error in error handling", error);
    }
  },
  onError: (onError: (err: string | null) => void) => {
    myError.subscribers.push(onError);
  },
  subscribers: [] as ((err: string | null) => void)[],
};

export const useErrorHandling = () => {
  return { error: myError.type, setError: myError.setError, onError: myError.onError };
};

function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

export const formatCode = memoize(async (code: string): Promise<string> => {
  const { error, setError } = useErrorHandling();

  try {
    const formattedCode = await prettierToThrow({ code, toThrow: true });
    console.log("Formatted successfully");
    if (error && error === "prettier") {
      setError(null);
    }
    return formattedCode;
  } catch (error) {
    console.error("Error formatting code:", error);
    setError("prettier");
    throw new Error("Prettier formatting failed");
  }
});

export const transpileCode = memoize(async (code: string): Promise<string> => {
  const { error, setError } = useErrorHandling();

  try {
    const transpiled = await transpile({ code, originToUse: location.origin });
    if (error && error === "transpile") {
      setError(null);
    }
    return transpiled;
  } catch (error) {
    setError("transpile");
    throw new Error("Transpile failed");
  }
});

export const runCode = memoize(async (transpiled: string) => {
  const { error, setError } = useErrorHandling();

  try {
    let resolve: (v: {
      html: string;
      css: string;
    }) => void;

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
      console.error("Error in runner: no html");
      setError("runner");
      return false;
    }
    if (error && error === "runner") {
      setError(null);
    }

    return { html, css };
  } catch (error) {
    console.error(error);
    setError("runner");
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
