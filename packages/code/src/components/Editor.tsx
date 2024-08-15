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

  const { errorType, setErrorType } = useErrorHandling(
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

  const setEditorContent = (formattedCode: string, counter: number) => {
    mod.current.controller.abort();
    mod.current.controller = new AbortController();
    const { signal } = mod.current.controller;
    setTimeout(() => {
      if (signal.aborted) return;
      const currentTime = Date.now();
      if (currentTime - lastTypingTimestamp >= 200) {
        console.log("Setting editor content: ", counter);

        setTimeout(() => {
          if (signal.aborted) return;
          editorState.setValue(formattedCode);
        }, 100);

        const md5Code: string = md5(formattedCode);
        editorState.setValue(formattedCode.replace(
          "export default",
          `
          export const md5Code = "${md5Code}";
          export default`,
        ));
      }
    }, 259);
  };

  useImperativeHandle(ref, () => ({
    setValue: async (code: string) => {
      console.log("Setting value from parent");
      mod.current.controller.abort();
      mod.current.controller = new AbortController();
      const { signal } = mod.current.controller;
      mod.current.i += 1;
      let formattedCode = code;
      try {
        if (signal.aborted) return;
        formattedCode = await prettierToThrow({ code, toThrow: true });
        if (signal.aborted) return;
        if (errorType === "prettier") {
          setErrorType(null);
        }
      } catch (error) {
        setErrorType("prettier");
        return;
      }
      console.log("Prettier succeeded");

      if (mod.current.code === formattedCode) return;
      mod.current.code = formattedCode;

      await runner(formattedCode, mod.current.i);

      setEditorContent(code, mod.current.i);
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

    if (newCode.includes("/** invalid")) return;
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
    }
    console.log("Prettier succeeded");

    mod.current.i += 1;

    console.log("Running debounced runner");
    await runner(mod.current.code, mod.current.i);
    console.log("Runner succeeded");
  };

  const handleBroadcastMessage = async ({ data }: { data: ICodeSession }) => {
    console.log("Broadcast message: ", data.i);

    if (data.i <= mod.current.i) mod.current.i = data.i;
    if (data.i > mod.current.i) {
      mod.current.i = data.i;

      mod.current.code = data.code;

      console.log("delaying setting Editor", data.i);

      setEditorContent(data.code, data.i);
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
