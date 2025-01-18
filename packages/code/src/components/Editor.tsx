import type { ICode, ICodeSession } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { prettierToThrow } from "@/lib/shared";
import { wait } from "@/lib/wait";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useEditorState } from "../hooks/use-editor-state";
import { useErrorHandling } from "../hooks/useErrorHandling";
import { initializeMonaco } from "./editorUtils";
import { EditorNode } from "./ErrorReminder";

interface EditorProps {
  codeSpace: string;
  cSess: ICode;
}

export const Editor: React.FC<EditorProps> = ({ codeSpace, cSess }) => {
  const { containerRef, editorState, setEditorState } = useEditorState();
  const { errorType, throttledTypeCheck } = useErrorHandling("monaco");
  const [mod, _setMod] = useState({
    lastMd5s: [md5(cSess.session.code)],
    lastCode: cSess.session.code,
    controller: new AbortController(),
  });

  const initializeEditor = useMemo(() => initializeMonaco, []);

  const handleContentChange = useCallback(
    async (newCode: string) => {
      mod.controller.abort();
      mod.controller = new AbortController();
      const { signal } = mod.controller;

      if (newCode === editorState.code) return;
      try {
        const formatted = await prettierToThrow({
          code: newCode,
          toThrow: false,
        });
        if (signal.aborted) return;
        if (mod.lastCode !== cSess.session.code) {
          await wait(200);
          if (signal.aborted) return;
        }
        if (formatted === cSess.session.code) return;
        if (newCode === mod.lastCode) return;
        if (formatted === mod.lastCode) return;

        mod.lastCode = formatted;
        if (mod.lastMd5s.includes(md5(formatted))) return;
        if (mod.lastMd5s.length > 10) mod.lastMd5s.shift();
        mod.lastMd5s.push(md5(formatted));

        const code = await cSess.setCode(formatted);
        if (typeof code === "string") {
          if (!mod.lastMd5s.includes(md5(code))) mod.lastMd5s.push(md5(code));
        }

        await throttledTypeCheck();
      } catch (e) {
        console.error(e);
      }
    },
    [cSess, editorState.code, throttledTypeCheck],
  );

  // Listen for external code changes in cSess
  useEffect(() => {
    if (!editorState.started) return;

    let newCode = "";
    const unsubscribe = cSess.sub(async (sess: ICodeSession) => {
      newCode = sess.code;
      if (mod.lastMd5s.includes(md5(newCode))) return;
      mod.lastMd5s.push(md5(newCode));

      // Prevent applying changes if there's no new code or an outdated index
      if (sess.code === editorState.code) return;

      // Optional formatting check (skip if identical)
      const formatted = await prettierToThrow({
        code: editorState.code,
        toThrow: false,
      });

      // Skip if the code is the same as the formatted code
      if (sess.code == formatted) return;
      if (sess.code === editorState.code) return;

      await wait(1000);
      if (newCode !== sess.code) return;
      setEditorState((prev) => ({ ...prev, code: newCode }));
      editorState.setValue(newCode);
    });

    return () => unsubscribe();
  }, [editorState.started]);

  // Initialize the editor once containerRef is available
  useEffect(() => {
    // Validate if we need to run type checks again
    if (errorType) throttledTypeCheck();

    // Exit early if we already started or no container to render into
    if (containerRef.current === null || editorState.started) return;

    (async () => {
      const { setValue } = await initializeEditor({
        container: containerRef.current!,
        codeSpace,
        code: cSess.session.code,
        onChange: handleContentChange,
        // Add readOnly if you want to handle it:
        // readOnly,
      });

      setEditorState((prev) => ({
        ...prev,
        started: true,
        code: cSess.session.code,
        setValue,
      }));
    })();
  }, [
    errorType,
    throttledTypeCheck,
    containerRef,
    editorState.started,
    setEditorState,
    initializeEditor,
    codeSpace,
    cSess,
    handleContentChange,
  ]);

  return (
    <div className="flex h-screen w-full max-w-[800px] overflow-hidden">
      <div className="flex-grow overflow-hidden">
        <EditorNode
          engine="monaco"
          errorType={errorType}
          containerRef={containerRef}
          codeSpace={codeSpace}
        />
      </div>
    </div>
  );
};
