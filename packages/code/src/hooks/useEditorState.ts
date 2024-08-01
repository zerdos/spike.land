import { useState, useRef } from 'react';
import { isMobile } from '../isMobile';

export const useEditorState = (codeSpace: string) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engine = isMobile() ? "ace" : "monaco";
  const [editorState, setEditorState] = useState({
    i: globalThis.cSess.session.i,
    code: globalThis.cSess.session.code,
    started: false,
    setValue: (_code: string) => {},
  });

  const initialLoadRef = useRef(true);
  const lastTypingTimestampRef = useRef(Date.now());

  return {
    containerRef,
    engine,
    editorState,
    setEditorState,
    initialLoadRef,
    lastTypingTimestampRef,
  };
};
