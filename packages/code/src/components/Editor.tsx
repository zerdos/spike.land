import React, { useCallback, useEffect, useRef } from "react";
import { md5 } from "@/lib/md5";
import type { ICode, ICodeSession } from "@/lib/interfaces";
import { useAutoSave } from "../hooks/useAutoSave";
import { initializeAce, initializeMonaco } from "./editorUtils";
import { EditorNode } from "./ErrorReminder";
import { useEditorState } from "../hooks/use-editor-state";
import { useErrorHandling } from "../hooks/useErrorHandling";

interface EditorProps {
  codeSpace: string;
  cSess: ICode;
  readOnly?: boolean;
}

export const Editor: React.FC<EditorProps> = ({ codeSpace, cSess }) => {
  const { containerRef, engine, editorState, setEditorState } =
    useEditorState();
  const { errorType, throttledTypeCheck } = useErrorHandling(engine || "ace");

  useAutoSave(codeSpace);

  const mod = useRef({
    i: 0,
    code: "",
    html: "",
    cssIds: "",
    md5Ids: [] as string[],
    controller: new AbortController(),
    initialLoad: React.useRef(true),
  });

  const handleContentChange = useCallback((newCode: string) => {
    mod.current.md5Ids.push(md5(newCode));
    cSess.setCode(newCode);
  }, [cSess]);
  const started = editorState && editorState.started;
  const setValue = editorState && editorState.setValue;

  useEffect(() => {
    const BC = new BroadcastChannel(`${codeSpace}-chat`);
    BC.onmessage = async (event) => {
      const e = event.data;

      if (e.code && started && setValue) {
        console.log("Setting code", e.code);
        setValue(e.code);
      }
    };
    return () => {
      BC.close();
    };
  }, [started, setValue, codeSpace]);

  useEffect(() => {
    if (errorType) {
      throttledTypeCheck(mod.current.initialLoad);
    }

    if (editorState.started && !editorState.sub) {
      const handleBroadcastMessage = async (
        { data }: { data: ICodeSession },
      ) => {
        const md5Code = md5(data.code);

        if (mod.current.md5Ids.includes(md5Code)) return;

        mod.current.md5Ids.push(md5Code);
        mod.current.md5Ids = mod.current.md5Ids.slice(-10);

        console.log("Set new code to editor", md5Code);
        if (editorState.setValue) {
          editorState.setValue(data.code);
        }
      };

      cSess.sub((sess: ICodeSession) => handleBroadcastMessage({ data: sess }));

      setEditorState((e: typeof editorState) => ({ ...e, sub: true }));
      return;
    }

    const initializeEditor = async () => {
      mod.current.i = Number(cSess.session.i);
      mod.current.code = cSess.session.code;

      if (!containerRef || !containerRef.current) return;

      const editorModule = await (engine === "monaco"
        ? initializeMonaco(
          containerRef.current,
          codeSpace,
          mod.current.code,
          handleContentChange,
        )
        : initializeAce(
          containerRef.current,
          mod.current.code,
          handleContentChange,
        ));

      console.log("Editor initialized", mod.current.i);
      setEditorState({
        ...editorState,
        started: true,
        code: mod.current.code,
        setValue: (code: string) => editorModule.setValue(code),
      });
    };

    initializeEditor();
  }, []);

  return (
    <div className="flex h-screen w-full max-w-[800px] overflow-hidden">
      <div className="flex-grow overflow-hidden">
        <EditorNode
          engine={engine as "monaco" | "ace"}
          errorType={errorType}
          containerRef={containerRef}
          codeSpace={codeSpace}
        />
      </div>
    </div>
  );
};
