import { useEffect, useRef, useState } from "react";
import { isMobile } from "../isMobile";

export const useEditorState = (codeSpace: string) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engine: "ace" | "monaco" = isMobile() ? "ace" : "monaco";
  const [editorState, setEditorState] = useState({
    i: typeof globalThis !== "undefined" && "cSess" in globalThis
      ? (globalThis as any).cSess.session.i
      : "0",
    code: typeof globalThis !== "undefined" && "cSess" in globalThis
      ? (globalThis as any).cSess.session.code
      : "",
    started: false,
    setValue: (_code: string) => {},
  });

  const initialLoadRef = useRef(true);

  useEffect(() => {
    // Use codeSpace here, for example:
    console.log(`Editor state initialized for codeSpace: ${codeSpace}`);
  }, [codeSpace]);

  return {
    containerRef,
    engine,
    editorState,
    setEditorState,
    initialLoadRef,
  };
};
