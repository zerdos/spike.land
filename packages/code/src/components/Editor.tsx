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
<<<<<<< HEAD
  const [session, setSession] = useState<ICodeSession | null>(null);
  const [mod, _setMod] = useState<{
    lastMd5s: string[];
    lastCode: string;
    controller: AbortController;
  }>({
    lastMd5s: [],
=======
  const [mod, setMod] = useState({
    lastMd5s: [] as string[],
>>>>>>> c0fe85e2a (refactor: clean up code formatting and improve consistency across components)
    lastCode: "",
    controller: new AbortController(),
  });

  // Initialize session
  useEffect(() => {
<<<<<<< HEAD
    cSess.getSession().then(initialSession => {
      setSession(initialSession);
      _setMod(prev => ({
        ...prev,
        lastMd5s: [md5(initialSession.code)],
        lastCode: initialSession.code,
      }));
    });
  }, [cSess]);

  useEffect(() => {
    if (!session) return;
    
=======
>>>>>>> c0fe85e2a (refactor: clean up code formatting and improve consistency across components)
    (async () => {
      const lastCode = await cSess.getCode();
      if (mod.lastCode === lastCode) return;
      if (mod.lastMd5s.includes(md5(lastCode))) return;

<<<<<<< HEAD
      _setMod((prev) => ({
=======
      setMod((prev) => ({
>>>>>>> c0fe85e2a (refactor: clean up code formatting and improve consistency across components)
        ...prev,
        lastCode,
        lastMd5s: [...prev.lastMd5s, md5(lastCode)],
      }));
    })();
  }, [session]);

  const initializeEditor = useMemo(() => initializeMonaco, []);

  const handleContentChange = useCallback(
    async (newCode: string) => {
      if (!session) return;

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

        const currentSession = await cSess.getSession();
        if (mod.lastCode !== currentSession.code) {
          await wait(200);
          if (signal.aborted) return;
        }
        if (formatted === currentSession.code) return;
        if (newCode === mod.lastCode) return;
        if (formatted === mod.lastCode) return;

        mod.lastCode = formatted;
        if (mod.lastMd5s.includes(md5(formatted))) return;
        if (mod.lastMd5s.length > 0) mod.lastMd5s.shift();
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
    [cSess, editorState.code, throttledTypeCheck, session],
  );

  // Listen for external code changes in cSess
  useEffect(() => {
    if (!editorState.started || !cSess || !cSess.sub || !session) return;

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
  }, [editorState.started, session]);

  // Initialize the editor once containerRef is available
  useEffect(() => {
    if (!session) return;

    // Validate if we need to run type checks again
    if (errorType) throttledTypeCheck();

    // Exit early if we already started or no container to render into
    if (containerRef.current === null || editorState.started) return;

    (async () => {
      const { setValue } = await initializeEditor({
        container: containerRef.current!,
        codeSpace,
        code: session.code,
        onChange: handleContentChange,
      });

      setEditorState((prev) => ({
        ...prev,
        started: true,
        code: session.code,
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
    session,
    handleContentChange,
  ]);

  if (!session) return null;

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
