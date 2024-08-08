import { ICodeSession } from "@src/makeSess";
import { Mutex } from "async-mutex";
import debounce from "lodash/debounce";
import type { ForwardRefRenderFunction } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import { useEditorState } from "../hooks/useEditorState";
import { useErrorHandling } from "../hooks/useErrorHandling";
import { prettierToThrow, transpile } from "../shared";
import { EditorNode } from "./ErrorReminder";

interface EditorProps {
  codeSpace: string;
  onCodeUpdate: (newCode: string) => void;
  readOnly?: boolean;
}

export interface EditorRef {
  setValue: (code: string) => void;
}

const EditorComponent: ForwardRefRenderFunction<EditorRef, EditorProps> = (
  { codeSpace, onCodeUpdate },
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
    controller: new AbortController(),
  });

  const mutex = new Mutex();

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
      mod.current.controller.abort();

      mod.current.controller = new AbortController();
      const { signal } = mod.current.controller;

      await debouncedRunner(code, mod.current.i, signal);
      if (signal.aborted) return;
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

  const debouncedRunner = useCallback(
    debounce(
      async (code: string, i: number, signal: AbortSignal) => {
        let formattedCode;

        try {
          if (signal.aborted) return;
          formattedCode = await prettierToThrow({ code, toThrow: true });
          if (errorType === "prettier") {
            setErrorType(null);
          }
        } catch (error) {
          setErrorType("prettier");
          throw error;
        }
        try {
          if (signal.aborted) return;

          const transpiled = await transpile({
            code: formattedCode,
            originToUse: location.origin,
          });

          document.querySelector("iframe")?.contentWindow?.postMessage({
            code: formattedCode,
            transpiled,
            i,
            sender: "Runner / Editor",
          });

          mod.current.controller.abort();

          console.log("Runner succeeded");

          if (errorType === "transpile") {
            setErrorType(null);
          }
        } catch (error) {
          console.error("Error in runner:", error);
          setErrorType("transpile");
        }
      },
      300,
      { leading: true, trailing: true },
    ),
    [codeSpace, onCodeUpdate, errorType, setErrorType, setEditorContent],
  );

  const handleContentChange = useCallback(async (newCode: string) => {
    if (mod.current.code === newCode) return;

    return mutex.runExclusive(async () => {
      setLastTypingTimestamp(Date.now());

      mod.current.code = await prettierToThrow({
        code: newCode,
        toThrow: true,
      });

      mod.current.controller.abort();
      mod.current.controller = new AbortController();
      const { signal } = mod.current.controller;
      mod.current.i += 1;

      await debouncedRunner(newCode, mod.current.i, signal);
    });
  }, [
    debouncedRunner,
    debouncedTypeCheck,
    initialLoadRef,
    lastTypingTimestamp,
  ]);

  const handleBroadcastMessage = useCallback(
    async ({ data }: { data: ICodeSession }) => {
      if (
        !data.i || !data.code || data.code === mod.current.code
        || mod.current.i >= data.i
      ) {
        return;
      }

      mod.current.i = Number(data.i);
      mod.current.code = data.code;

      mod.current.controller.abort();
      mod.current.controller = new AbortController();

      //      const { signal } = mod.current.controller;
      //   await debouncedRunner(data.code, mod.current.i, signal);
      const formattedCode = await prettierToThrow({
        code: data.code,
        toThrow: true,
      });
      setEditorContent(formattedCode, true);
    },
    [codeSpace, setEditorContent],
  );

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
