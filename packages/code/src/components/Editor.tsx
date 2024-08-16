import { ICodeSession } from "@src/makeSess";
import { md5 } from "@src/md5";
import { runner } from "@src/services/runner";
import type { ForwardRefRenderFunction } from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import { prettierToThrow } from "../shared";
import { EditorNode } from "./ErrorReminder";

interface EditorProps {
  codeSpace: string;
  readOnly?: boolean;
}

export interface EditorRef {
  setValue: (code: string) => void;
}

interface EditorState {
  started: boolean;
  code: string;
  setValue: (code: string) => void;
}

// Extracted hooks for better testability
const useEditorState = (codeSpace: string) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState<EditorState>({
    started: false,
    code: "",
    setValue: () => {},
  });

  const engine = "monaco"; // Or determine this dynamically

  return { containerRef, engine, editorState, setEditorState };
};

const useErrorHandling = (engine: string) => {
  const [errorType, setErrorType] = useState<string | null>(null);
  return { errorType, setErrorType };
};

// Extracted utility functions for better testability
const formatCode = async (code: string, signal: AbortSignal): Promise<string> => {
  if (signal.aborted) return code;
  try {
    const formattedCode = await prettierToThrow({ code, toThrow: true });
    return signal.aborted ? code : formattedCode;
  } catch (error) {
    throw new Error("Prettier formatting failed");
  }
};

const setEditorContent = (
  formattedCode: string,
  counter: number,
  signal: AbortSignal,
  setValue: (code: string) => void,
) => {
  setTimeout(() => {
    if (signal.aborted) return;
    console.log("Setting editor content: ", counter);

    setTimeout(() => {
      if (signal.aborted) return;
      setValue(formattedCode);
    }, 100);
  }, 250);
};

const EditorComponent: ForwardRefRenderFunction<EditorRef, EditorProps> = (
  { codeSpace },
  ref,
) => {
  const {
    containerRef,
    engine,
    editorState,
    setEditorState,
  } = useEditorState(codeSpace);

  const { errorType, setErrorType } = useErrorHandling(engine) as {
    errorType: "transpile" | "typescript" | "prettier" | "render" | null;
    setErrorType: (errorType: "transpile" | "typescript" | "prettier" | "render" | null) => void;
  };

  const [lastTypingTimestamp, setLastTypingTimestamp] = useState(Date.now());

  const mod = useRef({
    i: 0,
    code: "",
    html: "",
    cssIds: "",
    controller: new AbortController(),
  });

  useImperativeHandle(ref, () => ({
    setValue: async (code: string) => {
      console.log("Setting value from parent");
      mod.current.controller.abort();
      mod.current.controller = new AbortController();
      const { signal } = mod.current.controller;
      mod.current.i += 1;

      try {
        const formattedCode = await formatCode(code, signal);
        if (signal.aborted) return;
        if (errorType === "prettier") {
          setErrorType(null);
        }

        if (mod.current.code === formattedCode) return;
        mod.current.code = formattedCode;

        await runner(formattedCode, mod.current.i);

        setEditorContent(code, mod.current.i, signal, editorState.setValue);
      } catch (error) {
        setErrorType("prettier");
      }
    },
  }), [setEditorContent, errorType, setErrorType, editorState.setValue]);

  useEffect(() => {
    if (editorState.started) return;

    const initializeEditor = async () => {
      mod.current.i = Number(globalThis.cSess.session.i);
      mod.current.code = globalThis.cSess.session.code;

      if (!containerRef || !containerRef.current) return;

      const editorModule = await (engine === "monaco"
        ? initializeMonaco(containerRef.current, codeSpace, mod.current.code)
        : initializeAce(containerRef.current, mod.current.code));

      setEditorState({
        ...editorState,
        started: true,
        code: mod.current.code,
        setValue: (code: string) => editorModule.setValue(code),
      });
    };

    initializeEditor();
  }, [editorState.started, codeSpace, engine, containerRef, setEditorState]);

  const handleContentChange = async (newCode: string) => {
    console.log("Content change", mod.current.i, md5(newCode));

    if (newCode.includes("/** invalid")) return;
    if (mod.current.code === newCode) return;

    setLastTypingTimestamp(Date.now());

    console.log("before prettier");
    mod.current.controller.abort();
    mod.current.controller = new AbortController();
    const { signal } = mod.current.controller;

    try {
      const formattedCode = await formatCode(newCode, signal);
      if (signal.aborted) return;
      mod.current.code = formattedCode;
      if (errorType === "prettier") {
        setErrorType(null);
      }
    } catch (error) {
      setErrorType("prettier");
      return;
    }
    console.log("Prettier succeeded");

    mod.current.i += 1;

    console.log("Running debounced runner");
    await runner(mod.current.code, mod.current.i);
    console.log("From Editor, Runner succeeded");
  };

  const handleBroadcastMessage = async ({ data }: { data: ICodeSession }) => {
    if (data.i === mod.current.i) return;
    console.log("Broadcast message: ", data.i);

    if (data.i <= mod.current.i) mod.current.i = data.i;
    if (data.i > mod.current.i) {
      mod.current.i = data.i;
      mod.current.controller.abort();
      mod.current.controller = new AbortController();
      const { signal } = mod.current.controller;

      mod.current.code = data.code;

      console.log("delaying setting Editor", data.i);

      setEditorContent(data.code, data.i, signal, editorState.setValue);
    }
  };

  useBroadcastChannel(
    codeSpace,
    handleBroadcastMessage as unknown as (event: MessageEvent<any>) => void,
  );

  return (
    <Rnd
      enableResizing
      disableDragging
      minWidth={engine === "ace" ? window.innerWidth : 800}
      minHeight="100vh"
      bounds="body"
      allowAnyClick
      lockAspectRatio={false}
      enable={{
        top: false,
        bottom: true,
        right: true,
        left: false,
      }}
      default={{
        x: 0,
        y: 0,
        width: engine === "ace" ? window.innerWidth : 800,
        height: window.innerHeight,
      }}
      style={{ height: "100vh" }}
    >
      <EditorNode
        engine={engine as "monaco" | "ace"}
        errorType={errorType}
        containerRef={containerRef}
      />
    </Rnd>
  );
};

export const Editor = forwardRef<EditorRef, EditorProps>(EditorComponent);

async function initializeMonaco(
  container: HTMLDivElement,
  codeSpace: string,
  code: string,
) {
  addCSSFile("/*monaco-editor?bundle&css");
  const { startMonaco } = await import("../startMonaco");
  return await startMonaco({
    container,
    codeSpace,
    code,
    onChange: () => {}, // This will be set later
  });
}

async function initializeAce(container: HTMLDivElement, code: string) {
  const { startAce } = await import("../startAce");
  return await startAce(code, () => {}, container);
}

function addCSSFile(filename: string) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = filename;
  document.head.appendChild(link);
}
