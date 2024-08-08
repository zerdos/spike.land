import { ICodeSession } from "@src/makeSess";
import { md5 } from "@src/md5";
import type { ForwardRefRenderFunction } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import { useEditorState } from "../hooks/useEditorState";
import { useErrorHandling } from "../hooks/useErrorHandling";
import { prettierToThrow, transpile } from "../shared";
import { EditorNode } from "./ErrorReminder";
import { createJsBlob } from "./AppRenderer";
import {toString} from "../renderToString";

interface EditorProps {
  codeSpace: string;
  onCodeUpdate: (newCode: string) => void;
  readOnly?: boolean;
}

export interface EditorRef {
  setValue: (code: string) => void;
}

const paths = location.pathname.split("/");
const codeSpace = paths[2];
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

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

 const getCssStr = (html: string)=> html.split('"css-').slice(1).map(x=>x.slice(0,7)).join("")


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
      mod.current.html = globalThis.cSess.session.html;
      mod.current.cssIds = getCssStr(mod.current.html);
     

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
    async (code: string, i: number, signal: AbortSignal) => {
      if (i < mod.current.i) return;

      try {
        if (signal.aborted) return;

        const transpiled = await transpile({
          code,
          originToUse: location.origin,
        });
        if (errorType === "transpile") {
          setErrorType(null);
        }

        const App = (await import(createJsBlob(transpiled))).default;
        const html = toString(App);
        if (!html) {
          console.error("Error in runner: no html");
          setErrorType("render");
          return;
        }
        if (errorType === "render") {
          setErrorType(null);
        }

        if (cSess.session.css ==='' ||  mod.current.cssIds !== getCssStr(html)) {
      
        document.querySelector("iframe")?.contentWindow?.postMessage({
          code,
          transpiled,
          i,
          sender: "Runner / Editor",
        });

      } else {
        mod.current.html = html;
        mod.current.cssIds = getCssStr(html);

        BC.postMessage({
          code,
          transpiled,
          html,
          css: cSess.session.css,
          i,
          sender: "Editor",
        })
      }

        mod.current.controller.abort();

        console.log("Runner succeeded");


    
      } catch (error) {
        console.error("Error in runner:", error);
        setErrorType("transpile");
      }
    },
    [codeSpace, onCodeUpdate, errorType, setErrorType, setEditorContent],
  );

  const handleContentChange = useCallback(async (newCode: string) => {
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
    await debouncedRunner(mod.current.code, mod.current.i, signal);
    console.log("Runner succeeded");
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
