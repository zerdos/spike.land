import { editor } from "@/external/monacoEditor";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

interface DiffEditorProps {
  original: string;
  modified: string;
  language?: string;
  readOnly?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

export const DiffEditor: React.FC<DiffEditorProps> = memo(({
  original,
  modified,
  language = "text/plain",
  readOnly = true,
  minHeight = 200,
  maxHeight = 600,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [diffEditor, setDiffEditor] = useState<editor.IStandaloneDiffEditor | null>(null);

  const calculateHeight = useCallback((content: string) => {
    const lineCount = content.split("\n").length;
    const lineHeight = 20; // Adjust this value based on your font size and line spacing
    const padding = 20; // Add some padding
    return Math.min(Math.max(lineCount * lineHeight + padding, minHeight), maxHeight);
  }, [minHeight, maxHeight]);

  const editorHeight = useMemo(() => {
    const originalHeight = calculateHeight(original);
    const modifiedHeight = calculateHeight(modified);
    return Math.max(originalHeight, modifiedHeight);
  }, [original, modified, calculateHeight]);

  useEffect(() => {
    if (containerRef.current && !diffEditor) {
      const diffy = editor.createDiffEditor(containerRef.current, {
        diffAlgorithm: "advanced",
        readOnly,
        diffWordWrap: "on",
        wordWrap: "on",
        wordWrapColumn: 80,
        /**
         * If the diff editor should only show the difference review mode.
         */
        onlyShowAccessibleDiffViewer: true,
        hideUnchangedRegions: {
          enabled: true,
          revealLineCount: 1,
          minimumLineCount: 0,
          contextLineCount: 2,
        },
        lineNumbers: "off",
        scrollBeyondLastLine: false,

        minimap: { enabled: false },
        renderSideBySide: false,
        renderOverviewRuler: false,
        theme: "vs-dark", // Add a dark theme
      });

      diffy.setModel({
        original: editor.createModel(original, language),
        modified: editor.createModel(modified, language),
      });
      setDiffEditor(diffy);
    }

    return () => {
      if (diffEditor) {
        const diffModels = diffEditor.getModel();
        diffEditor.dispose();
        if (diffModels) {
          diffModels.original.dispose();
          diffModels.modified.dispose();
        }
      }
    };
  }, [diffEditor, language, original, modified, readOnly]);

  useEffect(() => {
    if (diffEditor) {
      const diffModels = diffEditor.getModel();
      if (diffModels) {
        diffModels.original.setValue(original);
        diffModels.modified.setValue(modified);
      }
    }
  }, [diffEditor, original, modified]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: `${editorHeight}px`,
        maxHeight: `${maxHeight}px`,
        border: "1px solid #ccc",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    />
  );
});

DiffEditor.displayName = "DiffEditor";

export default DiffEditor;
