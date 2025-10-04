import type { ICode } from "@/lib/interfaces";
import { memo } from "react";
import { Editor } from "../Editor";

interface MemoizedEditorProps {
  codeSpace: string;
  cSess: ICode;
  replaceIframe?: (newIframe: HTMLIFrameElement) => void;
}

/**
 * Memoized version of the Editor component
 * Only re-renders when props actually change
 */
export const MemoizedEditor = memo<MemoizedEditorProps>(
  ({ codeSpace, cSess, replaceIframe }) => {
    return (
      <Editor
        codeSpace={codeSpace}
        cSess={cSess}
        replaceIframe={replaceIframe}
      />
    );
  },
  // Custom comparison function for memo
  (prevProps, nextProps) => {
    return (
      prevProps.codeSpace === nextProps.codeSpace &&
      prevProps.cSess === nextProps.cSess &&
      prevProps.replaceIframe === nextProps.replaceIframe
    );
  }
);

MemoizedEditor.displayName = "MemoizedEditor";