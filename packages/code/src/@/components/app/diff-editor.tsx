import React, { memo, useEffect, useRef, useCallback } from "react";
import { editor } from "@/external/monaco-editor";
import { useThrottle } from "@uidotdev/usehooks";
export interface DiffEditorProps {
  original: string;
  modified: string;
  language?: string;
  readOnly?: boolean;
  minHeight?: number;
  maxHeight?: number;
  editorHeight?: number;
}

export const DiffEditor: React.FC<DiffEditorProps> = memo(({
  original: _original = "",
  modified : _modified = "",
  minHeight = 200,
  maxHeight = Infinity,
  editorHeight = minHeight,
  language = "text/plain",
  readOnly = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diffEditorRef = useRef<editor.IStandaloneDiffEditor | null>(null);

  const { original, modified } = useThrottle({ original: _original, modified: _modified }, 1000);

  const createEditor = useCallback(() => {
    if (containerRef.current && !diffEditorRef.current) {
      const diffEditor = editor.createDiffEditor(containerRef.current, {
        readOnly,
        wordWrap: "on",
        diffAlgorithm: "advanced",
        inDiffEditor: true,
        wordWrapColumn: 80,
        padding: { top: 20, bottom: 20 },
        automaticLayout: true,
        onlyShowAccessibleDiffViewer: false,
        hideUnchangedRegions: { enabled: false },
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
      diffEditor.layout();
    }
  }, [language, readOnly, original, modified]);

  const updateEditor = useCallback(() => {
    if (diffEditorRef.current) {
      const diffModels = diffEditorRef.current.getModel();
      if (diffModels) {
        if (diffModels.original.getValue() !== original) {
          diffModels.original.setValue(original);
        }
        if (diffModels.modified.getValue() !== modified) {
          diffModels.modified.setValue(modified);
        }
        diffEditorRef.current.layout({
          height: editorHeight,
          width: containerRef.current?.clientWidth || 0,
        });
      }
    }
  }, [original, modified, editorHeight]);

  useEffect(() => {
    createEditor();
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
  }, [createEditor]);

  useEffect(() => {
    updateEditor();
  }, [updateEditor]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: `${editorHeight}px`,
        maxHeight: `${maxHeight}px`,
        minHeight: `${minHeight}px`,
        border: "1px solid #ccc",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    />
  );
});

DiffEditor.displayName = "DiffEditor";

export default DiffEditor;