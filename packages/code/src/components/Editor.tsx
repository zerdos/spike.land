import { ICodeSession } from "@src/makeSess";
import { md5 } from "@src/md5";
import { runner } from "@src/services/runner";
import type { ForwardRefRenderFunction } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import { useEditorState } from "../hooks/useEditorState";
import { useErrorHandling } from "../hooks/useErrorHandling";
import { prettierToThrow } from "../shared";
import { EditorNode } from "./ErrorReminder";

interface EditorProps {
  codeSpace: string;
  readOnly?: boolean;
}

export interface EditorRef {
  setValue: (code: string) => void;
}

const paths = location.pathname.split("/");

const EditorComponent: ForwardRefRenderFunction<EditorRef, EditorProps> = (
  { codeSpace },
  ref,
) => {
  const {
    containerRef,
    engine,
    editorState,
    setEditorState,
    initialLoadRef,
  } = useEditorState(codeSpace);

  const { errorType, setErrorType, debouncedTypeCheck } = useErrorHandling(
    engine,
  );

  const [lastTypingTimestamp, setLastTypingTimestamp] = useState(Date.now());

  const mod = useRef({
    i: 0,
    code: "",
    html: "",
    cssIds: "",
    controller: new AbortController(),
  });

  const setEditorContent = useCallback(
    (formattedCode: string, ignoreSignals = false) => {
      if (ignoreSignals) {
        return editorState.setValue(formattedCode);
      }
      const { signal } = mod.current.controller;
      setTimeout(() => {
        if (signal.aborted) return;
        const currentTime = Date.now();
        if (currentTime - lastTypingTimestamp >= 5000) {
          editorState.setValue(formattedCode);
        }
      }, 6000);
    },
    [editorState, lastTypingTimestamp],
  );

  useImperativeHandle(ref, () => ({
    setValue: async (code: string) => {
      console.log("Setting value from parent");
      mod.current.i += 1;

      const formattedCode = await prettierToThrow({ code, toThrow: true });

      if (mod.current.code === formattedCode) return;
      mod.current.code = formattedCode;

      await runner(formattedCode, mod.current.i);

      setEditorContent(code, true);
    },
  }), [setEditorContent]);

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

    if (mod.current.code === newCode) return;

    setLastTypingTimestamp(Date.now());

    console.log("before prettier");
    mod.current.controller.abort();
    mod.current.controller = new AbortController();
    const { signal } = mod.current.controller;

    try {
      if (signal.aborted) return;
      mod.current.code = await prettierToThrow({ code: newCode, toThrow: true });
      if (signal.aborted) return;
      if (errorType === "prettier") {
        setErrorType(null);
      }
    } catch (error) {
      setErrorType("prettier");
      throw error;
    }
    console.log("Prettier succeeded");

    mod.current.i += 1;

    console.log("Running debounced runner");
    await runner(mod.current.code, mod.current.i);
    console.log("Runner succeeded");
  };

  const handleBroadcastMessage = async ({ data }: { data: ICodeSession }) => {
    console.log("Broadcast message", data.i, md5(data.code));
    if (data.i <= mod.current.i) return;
    if (data.i > mod.current.i) {
      mod.current.i = Number(data.i);

      if (mod.current.code === data.code) return;

      mod.current.code = data.code;

      console.log("Setting editor content", data.i);
      setEditorContent(data.code, true);
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
        engine={engine}
        errorType={errorType}
        containerRef={containerRef}
      />
    </Rnd>
  );

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
      onChange: handleContentChange,
    });
  }

  async function initializeAce(container: HTMLDivElement, code: string) {
    const { startAce } = await import("../startAce");
    return await startAce(code, handleContentChange, container);
  }
};

export const Editor = forwardRef<EditorRef, EditorProps>(EditorComponent);

function addCSSFile(filename: string) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = filename;
  document.head.appendChild(link);
}
