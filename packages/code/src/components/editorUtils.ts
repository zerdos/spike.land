import { useRef, useState } from "react";
import { prettierToThrow } from "../shared";

export interface EditorState {
  started: boolean;
  code: string;
  setValue: (code: string) => void;
}

export const useEditorState = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState<EditorState>({
    started: false,
    code: "",
    setValue: () => {},
  });

  const engine = "monaco"; // Or determine this dynamically

  return { containerRef, engine, editorState, setEditorState };
};

export const useErrorHandling = () => {
  const [errorType, setErrorType] = useState<string | null>(null);
  return { errorType, setErrorType };
};

export const formatCode = async (code: string, signal: AbortSignal): Promise<string> => {
  if (signal.aborted) return code;
  try {
    const formattedCode = await prettierToThrow({ code, toThrow: true });
    return signal.aborted ? code : formattedCode;
  } catch (error) {
    throw new Error("Prettier formatting failed");
  }
};

export const setEditorContent = (
  formattedCode: string,
  counter: number,
  signal: AbortSignal,
  setValue: (code: string) => void,
): void => {
  setTimeout(() => {
    if (signal.aborted) return;
    console.log("Setting editor content: ", counter);

    setTimeout(() => {
      if (signal.aborted) return;
      setValue(formattedCode);
    }, 100);
  }, 250);
};

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
