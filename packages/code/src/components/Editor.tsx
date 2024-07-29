import debounce from "lodash/debounce";
import type { ForwardRefRenderFunction } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { isMobile } from "../isMobile.mjs";
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

  const isUpdatingRef = useRef(false);
  const [errorType, setErrorType] = useState<
    "typescript" | "prettier" | "transpile" | "render" | null
  >(null);
  const initialLoadRef = useRef(true);
  const lastTypingTimestampRef = useRef(Date.now());

  useImperativeHandle(ref, () => ({
    setValue: async (code: string) => {
      const formatted = await prettierToThrow({ code, toThrow: true });
      editorState.setValue(formatted);
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
        setValue: editorModule.setValue,
      });
    };

    initializeEditor();
  }, [editorState.started, ref, codeSpace]);

  const debouncedRunner = useCallback(
    debounce(async (code: string, i: number) => {
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
      const currentTime = Date.now();
      if (currentTime - lastTypingTimestampRef.current >= 5000) {
        editorState.setValue(formattedCode);
      }
    }, 300),
    [codeSpace, onCodeUpdate, editorState, errorType],
  );

  const debouncedTypeCheck = useCallback(
    debounce(async () => {
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
    }, 1000),
    [],
  );

  const handleContentChange = useCallback(async (newCode: string) => {
    if (isUpdatingRef.current) return;

    if (mod.code === newCode) return;

    mod.i += 1;
    mod.code = newCode;

    mod.controller.abort();
    mod.controller = new AbortController();

    lastTypingTimestampRef.current = Date.now();
    debouncedRunner(newCode, mod.i);
    debouncedTypeCheck();
  }, [debouncedRunner, debouncedTypeCheck]);

  useEffect(() => {
    const handleBroadcastMessage = ({ data }: MessageEvent) => {
      if (!data.i || !data.code || data.code === mod.code || mod.i >= data.i) {
        return;
      }

      isUpdatingRef.current = true;
      mod.i = Number(data.i);
      mod.code = data.code;

      setEditorState((prevState) => ({ ...prevState, ...mod }));
      editorState.setValue(mod.code);
      // setLocalCode(mod.code);

      const { signal } = mod.controller;
      runner({ ...mod, counter: mod.i, codeSpace, signal });

      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);
    };

    BC.addEventListener("message", handleBroadcastMessage);

    return () => {
      BC.removeEventListener("message", handleBroadcastMessage);
    };
  }, [codeSpace]);

  if (engine === "ace") {
    return (
      <EditorNode
        engine="ace"
        errorType={errorType}
        containerRef={containerRef}
      />
    );
  }

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
        engine="monaco"
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

const Editor = forwardRef<EditorRef, EditorProps>(EditorComponent);

export default Editor;
