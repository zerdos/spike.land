import type { DiffEditorProps } from "@/components/app/diff-editor";
import { lazy, Suspense } from "react";
import type { FC } from "react";

const DiffEditorLazy = lazy(() =>
  import("@/components/app/diff-editor").then((module) => ({
    default: module.DiffEditor,
  }))
);

const minHeight = 100;
const maxHeight = window.innerHeight - 200;

const calculateHeight = (text: string) => {
  const lines = text.split(/\r\n|\r|\n/).length + 2;
  return Math.min(maxHeight, Math.max(minHeight, lines * 19)) + 40;
};

const editorHeight = (original: string, modified: string) =>
  Math.max(calculateHeight(original), calculateHeight(modified));

export const DiffEditor: FC<DiffEditorProps> = (
  { original, modified, language, readOnly },
) => (
  <Suspense
    fallback={
      <div
        style={{
          width: "100%",
          height: `${editorHeight(original, modified)}px`,
          maxHeight: `${maxHeight}px`,
          minHeight: `${minHeight}px`,
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
      </div>
    }
  >
    <DiffEditorLazy
      original={original}
      modified={modified}
      language={language}
      readOnly={readOnly}
      editorHeight={editorHeight(original, modified)}
      minHeight={minHeight}
      maxHeight={maxHeight}
    />
  </Suspense>
);
