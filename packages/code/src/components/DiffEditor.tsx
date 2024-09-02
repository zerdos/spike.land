import { editor } from "monaco-editor";
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
    const lineHeight = 20;
    const padding = 20;
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
        automaticLayout: true,
        onlyShowAccessibleDiffViewer: true,
        hideUnchangedRegions: {
          enabled: false,
        },
        lineNumbers: "off",
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        renderSideBySide: false,
        renderOverviewRuler: false,
        theme: "vs-dark",
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
        if (diffModels) {
          diffModels.original.dispose();
          diffModels.modified.dispose();
        }
        diffEditor.dispose();
      }
    };
  }, [containerRef, containerRef.current]);

  useEffect(() => {
    if (diffEditor) {
      const diffModels = diffEditor.getModel();
      if (diffModels) {
        if (diffModels.original.getValue() !== original) {
          diffModels.original.setValue(original);
        }

        if (diffModels.modified.getValue() !== modified) {
          diffModels.modified.setValue(modified);
        }
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
