import { ICodeSession } from "@src/makeSess";
import { useRef, useState } from "react";
import { prettierToThrow, transpile } from "../shared";

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
export const formatCode = async (code: string, signal: AbortSignal): Promise<string> => {
  const { error, setError } = useErrorHandling();

  if (signal.aborted) return code;
  try {
    const formattedCode = await prettierToThrow({ code, toThrow: true });
    if (error && error === "prettier") {
      setError(null);
    }
    return formattedCode;
  } catch (error) {
    setError("prettier");
    throw new Error("Prettier formatting failed");
  }
};

export const transpileCode = async (code: string, signal: AbortSignal): Promise<string> => {
  const { error, setError } = useErrorHandling();

  if (signal.aborted) return code;
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
};

export const runCode = async (sess: Partial<ICodeSession>, signal: AbortSignal) => {
  const { error, setError } = useErrorHandling();

  try {
    const { code, transpiled } = sess;
    const counter = sess.i as number;

    let resolve: (v: {
      i: number;
      html: string;
      css: string;
    }) => void;
    const promise = new Promise<{ i: number; html: string; css: string }>(
      (_resolve, _reject) => {
        resolve = _resolve;
        setTimeout(() => {
          if (signal.aborted) return resolve({ i: counter, html: "", css: "" });
        }, 3000);
      },
    );

    window.onmessage = (ev) => {
      const data: { i: number; html: string; css: string } = ev.data;

      const { i, html, css } = data;
      if (i === counter) {
        resolve({ i, html, css });
      }
    };

    if (signal.aborted) return false;
    console.log("Sending message iframe first to calculate css", counter);

    document.querySelector("iframe")?.contentWindow?.postMessage({
      transpiled,
      code,
      i: counter,
      html: "",
      css: "",
      sender: "Runner / Editor",
    });

    const res = await promise;

    if (signal.aborted) return false;

    const { html, css } = res;

    if (html.includes("Oops! Something went wrong")) {
      console.error("Error in runner: no html");

      return false;
    }
    if (error && error === "runner") {
      setError(null);
    }

    return { ...sess, html, css };
  } catch (error) {
    console.error(error);
    setError("runner");
    throw error;
  }
};

export const setEditorContent = (
  formattedCode: string,
  counter: number,
  signal: AbortSignal,
  setValue: (code: string) => void,
): void => setValue(formattedCode);

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
  const { startMonaco } = await import("../startMonaco");
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
