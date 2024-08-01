import debounce from "lodash/debounce";
import type { ForwardRefRenderFunction } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { isMobile } from "../isMobile";
import { runner } from "../runner";
import { prettierToThrow } from "../shared";
import { EditorNode } from "./ErrorReminder";

const codeSpace = location.pathname.slice(1).split("/")[1];
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

const mod = {
  i: 0,
  code: "",
  controller: new AbortController(),
};

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
  const containerRef = useRef<HTMLDivElement>(null);
  const engine = isMobile() ? "ace" : "monaco";
  const [editorState, setEditorState] = useState({
    i: globalThis.cSess.session.i,
    code: globalThis.cSess.session.code,
    started: false,
    setValue: (_code: string) => {},
  });

  const setEditorContent = (formattedCode: string) => {
    const lastSignal = mod.controller.signal;
    const current = lastTypingTimestampRef.current = lastTypingTimestampRef.current || Date.now();
    setTimeout(() => {
      if (lastSignal.aborted) return;
      const currentTime = Date.now();
      if (currentTime - lastTypingTimestampRef.current >= 5000) {
        editorState.setValue(formattedCode);
      }
    }, 6000);
  };

  const [errorType, setErrorType] = useState<
    "typescript" | "prettier" | "transpile" | "render" | null
  >(null);
  const initialLoadRef = useRef(true);
  const lastTypingTimestampRef = useRef(Date.now());

  useImperativeHandle(ref, () => ({
    setValue: async (code: string) => {
      console.log("Setting value from parent");

      const formatted = await prettierToThrow({ code, toThrow: true });

      setEditorContent(formatted);
      handleContentChange(formatted);
    },
  }));

  useEffect(() => {
    if (editorState.started) return;

    const initializeEditor = async () => {
      mod.i = Number(globalThis.cSess.session.i);
      mod.code = globalThis.cSess.session.code;

      if (!containerRef || !containerRef.current) return;

      const editorModule = await (engine === "monaco"
        ? initializeMonaco(containerRef.current, codeSpace, mod.code)
        : initializeAce(containerRef.current, mod.code));

      setEditorState({
        ...editorState,
        started: true,
        code: mod.code,
        setValue: (code: string) => editorModule.setValue(code),
      });
    };

    initializeEditor();
  }, [editorState.started, ref, codeSpace]);

  const debouncedRunner = useCallback(
    debounce(
      async (code: string, i: number) => {
        let formattedCode;

        try {
          if (mod.controller.signal.aborted) return;
          formattedCode = await prettierToThrow({ code, toThrow: true });
          if (errorType === "prettier") {
            setErrorType(null);
          }
        } catch (error) {
          setErrorType("prettier");
          throw error;
        }
        try {
          if (mod.controller.signal.aborted) return;
          await runner({
            code: formattedCode,
            counter: i,
            codeSpace,
            signal: mod.controller.signal,
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

        // Update editor with formatted code after 5 seconds of inactivity

        setEditorContent(formattedCode);
      },
      300,
      { leading: true, trailing: true },
    ),
    [codeSpace, onCodeUpdate, editorState, errorType],
  );

  const debouncedTypeCheck = useCallback(
    debounce(
      async () => {
        if (engine === "monaco") {
          const monaco = await import("monaco-editor");
          const model = monaco.editor.getModels()[0];
          const worker = await monaco.languages.typescript.getTypeScriptWorker();
          const client = await worker(model.uri);
          const diagnostics = await client.getSemanticDiagnostics(
            model.uri.toString(),
          );

          if (diagnostics.length > 0 && !initialLoadRef.current) {
            setErrorType("typescript");
          } else {
            setErrorType((prevErrorType) => prevErrorType === "typescript" ? null : prevErrorType);
          }
        }
        initialLoadRef.current = false;
      },
      1000,
      { leading: true, trailing: true },
    ),
    [],
  );

  const handleContentChange = useCallback(async (newCode: string) => {
    if (mod.code === newCode) return;

    mod.i += 1;
    lastTypingTimestampRef.current = Date.now();

    mod.code = newCode;

    mod.controller.abort();
    mod.controller = new AbortController();

    debouncedRunner(newCode, mod.i);
    debouncedTypeCheck();
  }, [debouncedRunner, debouncedTypeCheck]);

  useEffect(() => {
    const handleBroadcastMessage = ({ data }: MessageEvent) => {
      if (!data.i || !data.code || data.code === mod.code || mod.i >= data.i) {
        return;
      }

      mod.i = Number(data.i);
      mod.code = data.code;
      setEditorContent(data.code);

      // setEditorState((prevState) => ({ ...prevState, ...mod }));
      // console.log("Updating editor with new code: ", data.i, mod.i);
      // editorState.setValue(mod.code);
      // setLocalCode(mod.code);
      mod.controller.abort();
      mod.controller = new AbortController();

      const { signal } = mod.controller;
      runner({ ...mod, counter: mod.i, codeSpace, signal });
    };

    BC.addEventListener("message", handleBroadcastMessage);

    return () => {
      BC.removeEventListener("message", handleBroadcastMessage);
    };
  }, [editorState]);

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
