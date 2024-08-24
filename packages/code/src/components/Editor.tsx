import { css } from "@emotion/react";
import { ICodeSession } from "@src/makeSess";
import { md5 } from "@src/md5";
import { runner } from "@src/services/runner";
import { cSess } from "@src/ws";
import type { ForwardRefRenderFunction } from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useAutoSave } from "../hooks/autoSave";
import { initializeAce, initializeMonaco, useEditorState, useErrorHandling } from "./editorUtils";
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
) => {
  const {
    containerRef,
    engine,
    editorState,
    setEditorState,
  } = useEditorState();

  const { error, onError } = useErrorHandling();

  const [errorType, setError] = useState(error);

  onError((error: string | null) => {
    setError(error);
  });
  const [currentCode, setCurrentCode] = useState("");

  const mod = useRef({
    i: 0,
    code: "",
    html: "",
    cssIds: "",
    md5Ids: [] as string[],
    controller: new AbortController(),
  });

  // Use the new auto-save hook
  useAutoSave({
    key: `editor_${codeSpace}`,
    data: { code: currentCode, i: mod.current.i },
    debounceMs: 60000, // Adjust as needed
  });

  const handleContentChange = async (newCode: string) => {
    console.log("Content change", mod.current.i, md5(newCode));

    if (newCode.includes("/** invalid")) return;

    const formattedCode = await runner(newCode);
    if (typeof formattedCode === "string") {
      mod.current.code === formattedCode;
    }

    // setCurrentCode(formattedCode); // Update the current code for auto-save
  };

  // useImperativeHandle(ref, () => ({
  //   setValue: async (code: string) => {
  //     console.log("Setting value from parent");
  //     mod.current.controller.abort();
  //     mod.current.controller = new AbortController();
  //     const { signal } = mod.current.controller;

  //     await runner(code);

  //     setEditorContent(code, mod.current.i, signal, editorState.setValue);
  //   },
  // }), [editorStsetEditorContentate.setValue]);

  useEffect(() => {
    if (editorState.started && !editorState.sub) {
      const handleBroadcastMessage = async ({ data }: { data: ICodeSession }) => {
        if (data.code === mod.current.code) return;
        if (data.code === currentCode) return;

        const md5Code = md5(data.code);

        if (mod.current.md5Ids.includes(md5Code)) return;
        mod.current.md5Ids.push(md5Code);
        mod.current.md5Ids = mod.current.md5Ids.slice(-10);

        mod.current.controller.abort();
        mod.current.controller = new AbortController();
        const { signal } = mod.current.controller;

        // await wait(1000);
        // if (signal.aborted) return;

        // await wait(2000);
        // if (signal.aborted) return;

        // console.log("delaying setting Editor", data.i);

        if (signal.aborted) return;
        mod.current.code = data.code;
        setCurrentCode(data.code);
        editorState.setValue(data.code);
      };

      cSess.sub((sess: ICodeSession) => handleBroadcastMessage({ data: sess }));
      setEditorState(e => ({ ...e, sub: true }));
      return;
    }

    const initializeEditor = async () => {
      // Load the latest saved data

      mod.current.i = Number(cSess.session.i);
      mod.current.code = cSess.session.code;
      setCurrentCode(cSess.session.code);

      if (!containerRef || !containerRef.current) return;

      const editorModule = await (engine === "monaco"
        ? initializeMonaco(containerRef.current, codeSpace, mod.current.code, handleContentChange)
        : initializeAce(containerRef.current, mod.current.code, handleContentChange));

      setEditorState({
        ...editorState,
        started: true,
        code: mod.current.code,
        setValue: (code: string) => editorModule.setValue(code),
      });
    };

    initializeEditor();
  }, [editorState.started, codeSpace, engine, containerRef, setEditorState]);

  return (
    <div
      css={css`
        display: block;
        width: min(100%, 800px);
        height:100vh;
        overflow: auto;
    `}
    >
      <EditorNode
        engine={engine as "monaco" | "ace"}
        errorType={errorType as "typescript" | "prettier" | "transpile" | "render" | null}
        containerRef={containerRef}
      />
    </div>
  );
};

export const Editor = forwardRef<EditorRef, EditorProps>(EditorComponent);
