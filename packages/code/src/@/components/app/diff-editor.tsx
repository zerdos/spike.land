import { editor } from "@/external/monaco-editor";
import { useThrottle } from "@uidotdev/usehooks";
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";

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
  modified: _modified,
  language = "text/plain",
  readOnly = true,
  minHeight = 200,
  maxHeight = 600,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diffEditorRef = useRef<editor.IStandaloneDiffEditor | null>(null);
  
  const modified = useThrottle(_modified, 200);


  const calculateHeight = useCallback((content: string) => {
    const lineCount = content.split("\n").length;
    const lineHeight = 20;
    const padding = 20;
    return Math.min(Math.max(lineCount * lineHeight + padding, minHeight), maxHeight);
  }, [minHeight, maxHeight]);

  const editorHeight = useMemo(() => {
    const originalHeight = calculateHeight(original);
    const modifiedHeight = calculateHeight(_modified);
    return Math.max(originalHeight, modifiedHeight);
  }, [original, modified, calculateHeight]);

  useEffect(() => {
    if (containerRef.current && !diffEditorRef.current) {
      const diffEditor = editor.createDiffEditor(containerRef.current, {
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

      diffEditor.setModel({
        original: editor.createModel(original, language),
        modified: editor.createModel(modified, language),
      });

      diffEditorRef.current = diffEditor;
    }

    return () => {
      if (diffEditorRef.current) {
        const diffModels = diffEditorRef.current.getModel();
        diffEditorRef.current.dispose();
        if (diffModels) {
          diffModels.original.dispose();
          diffModels.modified.dispose();
        }
        diffEditorRef.current = null;
      }
    };
  }, [language, readOnly]); // Only run when language or readOnly changes

  useEffect(()=> {
    if (diffEditorRef.current) {
      const diffModels = diffEditorRef.current.getModel();
      if (diffModels) {
        if (diffModels.original.getValue() !== original) {
          diffModels.original.setValue(original);
        }

        if (diffModels.modified.getValue() !== modified) {
          diffModels.modified.setValue(modified);
        }
      }
      }}, [original, modified]);

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