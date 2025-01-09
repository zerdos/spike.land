import type { ICode, ICodeSession } from "@/lib/interfaces";
import { prettierToThrow } from "@/lib/shared";
import React, { useCallback, useEffect, useState } from "react";
import { useEditorState } from "../hooks/use-editor-state";
import { useErrorHandling } from "../hooks/useErrorHandling";
import { initializeAce, initializeMonaco } from "./editorUtils";
import { EditorNode } from "./ErrorReminder";

interface EditorProps {
  codeSpace: string;
  cSess: ICode;
  readOnly?: boolean; // Unused prop
}

export const Editor: React.FC<EditorProps> = ({ codeSpace, cSess }) => {
  const { containerRef, engine, editorState, setEditorState } = useEditorState();
  const { errorType, throttledTypeCheck } = useErrorHandling(engine || "ace");

  // Convert to state to avoid ref mutations
  const [changeId, setChangeId] = useState(0);

  const handleContentChange = useCallback(async (newCode: string) => {
    if (newCode === editorState.code) return;

    setChangeId(id => id + 1);
    await cSess.setCode(newCode);
    throttledTypeCheck();
  }, [editorState.code, cSess]);

  useEffect(() => {
    if (!editorState.started || !editorState.setValue) return;

    const unsubscribe = cSess.sub(async (sess: ICodeSession) => {
      if (sess.code === editorState.code) return;
      if (sess.i <= changeId) return;
      setChangeId(sess.i);

      const formatted = await prettierToThrow({
        code: sess.code,
        toThrow: false,
      });

      if (formatted && formatted === sess.code) return;
      editorState.setValue(sess.code);
    });

    return () => unsubscribe();
  }, [editorState.started, cSess]);

  useEffect(() => {
    if (errorType) {
      throttledTypeCheck();
    }

    if (!containerRef.current || editorState.started) return;

    const initializeEditor = async () => {
      const initFn = engine === "monaco" ? initializeMonaco : initializeAce;
      const { setValue } = await initFn({
        container: containerRef.current!,
        codeSpace,
        code: cSess.session.code,
        onChange: handleContentChange,
      });

      setChangeId(cSess.session.i);

      setEditorState(prev => ({
        ...prev,
        started: true,
        code: cSess.session.code,
        setValue,
      }));
    };

    initializeEditor();
  }, [errorType, engine]);

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
