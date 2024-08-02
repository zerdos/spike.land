import debounce from "lodash/debounce";
import type { ForwardRefRenderFunction } from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Rnd } from "react-rnd";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import { useEditorState } from "../hooks/useEditorState";
import { useErrorHandling } from "../hooks/useErrorHandling";
import { runner } from "../runner";
import { prettierToThrow } from "../shared";
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
    lastTypingTimestampRef,
  } = useEditorState(codeSpace);

  const { errorType, setErrorType, debouncedTypeCheck } = useErrorHandling(
    engine,
  );

  const mod = useRef({
    i: 0,
    code: "",
    controller: new AbortController(),
  });

  const setEditorContent = useCallback((formattedCode: string) => {
    const lastSignal = mod.current.controller.signal;
    const current = lastTypingTimestampRef.current =
      lastTypingTimestampRef.current || Date.now();
    setTimeout(() => {
      if (lastSignal.aborted) return;
      const currentTime = Date.now();
      if (currentTime - lastTypingTimestampRef.current >= 5000) {
        editorState.setValue(formattedCode);
      }
    }, 6000);
  }, [editorState, lastTypingTimestampRef]);

  useImperativeHandle(ref, () => ({
    setValue: async (code: string) => {
      console.log("Setting value from parent");
      const formatted = await prettierToThrow({ code, toThrow: true });
      setEditorContent(formatted);
      handleContentChange(formatted);
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
        setValue: (code: string) =>
          editorModule.setValue(code),
      });
    };

    initializeEditor();
  }, [editorState.started, codeSpace, engine, containerRef, setEditorState]);

  const debouncedRunner = useCallback(
    debounce(
      async (code: string, i: number) => {
        let formattedCode;

        try {
          if (mod.current.controller.signal.aborted) return;
          formattedCode = await prettierToThrow({ code, toThrow: true });
          if (errorType === "prettier") {
            setErrorType(null);
          }
        } catch (error) {
          setErrorType("prettier");
          throw error;
        }
        try {
          if (mod.current.controller.signal.aborted) return;
          await runner({
            code: formattedCode,
            counter: i,
            codeSpace,
            signal: mod.current.controller.signal,
          });
          console.log("Runner succeeded");
          onCodeUpdate(formattedCode);
          if (errorType === "transpile") {
            setErrorType(null);
          }
        } catch (error) {
          console.error("Error in runner:", error);
          setErrorType("transpile");
        }

        setEditorContent(formattedCode);
      },
      300,
      { leading: true, trailing: true },
    ),
    [codeSpace, onCodeUpdate, errorType, setErrorType, setEditorContent],
  );

  const handleContentChange = useCallback(async (newCode: string) => {
    if (mod.current.code === newCode) return;

    mod.current.i += 1;
    lastTypingTimestampRef.current = Date.now();

    mod.current.code = newCode;

    mod.current.controller.abort();
    mod.current.controller = new AbortController();

    debouncedRunner(newCode, mod.current.i);
    debouncedTypeCheck(initialLoadRef);
  }, [
    debouncedRunner,
    debouncedTypeCheck,
    initialLoadRef,
    lastTypingTimestampRef,
  ]);

  const handleBroadcastMessage = useCallback(({ data }: MessageEvent) => {
    if (
      !data.i || !data.code || data.code === mod.current.code ||
      mod.current.i >= data.i
    ) {
      return;
    }

    mod.current.i = Number(data.i);
    mod.current.code = data.code;
    setEditorContent(data.code);

    mod.current.controller.abort();
    mod.current.controller = new AbortController();

    const { signal } = mod.current.controller;
    runner({ ...mod.current, counter: mod.current.i, codeSpace, signal });
  }, [codeSpace, setEditorContent]);

  useBroadcastChannel(codeSpace, handleBroadcastMessage);

  return (
    <Rnd
      enableResizing
      disableDragging
      minWidth={800}
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
        width: 800,
        height: window.innerHeight,
      }}
      style={{ height: "100vh" }}
    >
      <EditorNode
        engine={engine}
        errorType={errorType}
        containerRef={containerRef}
        data-testid="editor-container"
      />
    </Rnd>
  );

  async function initializeMonaco(
    container: HTMLDivElement,
    codeSpace: string,
    code: string,
  ) {
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
