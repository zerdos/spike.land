import type { ICode, ICodeSession } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import React, { useEffect, useRef } from "react";
import { useEditorState } from "../hooks/use-editor-state";
import { useErrorHandling } from "../hooks/useErrorHandling";
import { initializeAce, initializeMonaco } from "./editorUtils";
import { EditorNode } from "./ErrorReminder";

interface EditorProps {
  codeSpace: string;
  cSess: ICode;
  readOnly?: boolean;
}

export const Editor: React.FC<EditorProps> = ({ codeSpace, cSess }) => {
  const { containerRef, engine, editorState, setEditorState } = useEditorState();
  const { errorType, throttledTypeCheck } = useErrorHandling(engine || "ace");

  const mod = useRef({
    ...(cSess.session),
    md5Ids: [] as string[],
    controller: new AbortController(),
    initialLoad: React.useRef(true),
  });

  const handleContentChange = (newCode: string) => {
    if (newCode === mod.current.code) return;

    const md5NewCode = md5(newCode);

    if (mod.current.md5Ids.includes(md5NewCode)) return;
    mod.current.md5Ids.push(md5NewCode);

    mod.current.i++;
    cSess.setCode(newCode).then(() => {
      const md5NewCode = md5(md5(cSess.session.code));
      if (mod.current.md5Ids.includes(md5NewCode)) return;

      mod.current.md5Ids.push(md5NewCode);
    }).then(() => throttledTypeCheck(mod.current.initialLoad));
  };

  useEffect(() => {
    if (!editorState || !editorState.started || !editorState.setValue) return;

    cSess.sub((sess: ICodeSession) => {
      if (sess.code === editorState.code) return;

      if (mod.current.i === sess.i) return;
      editorState.setValue(sess.code);
    });
  }, [editorState.started, cSess]);

  // const BC = new BroadcastChannel(
  //   `${location.origin}/live/${codeSpace}/`,
  // );

  // BC.onmessage = async (event) => {
  //   const e = event.data;

  //   if (e.code) {
  //     if (mod.current.md5Ids.includes(md5(e.code))) return;
  //     mod.current.md5Ids.push(md5(e.code));
  //     mod.current.md5Ids = mod.current.md5Ids.slice(-10);

  //     if (e.i === mod.current.i) return;
  //     mod.current.i = e.i;

  //     console.log("Setting code", e.code);
  //     editorState.setValue(e.code);
  //   }
  // };

  useEffect(() => {
    if (errorType) {
      throttledTypeCheck(mod.current.initialLoad);
    }

    if (editorState.started && !editorState.sub) {
      const handleBroadcastMessage = async (
        { data }: { data: ICodeSession; },
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

      if (!containerRef.current) return;

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
