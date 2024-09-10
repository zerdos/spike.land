import { editor, Range } from "@/external/monaco-editor";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createContextManager } from "../contextManager";

interface DiffEditorProps {
  original: string;
  modified: string;
  language?: string;
  readOnly?: boolean;
  minHeight?: number;
  maxHeight?: number;
  codeSpace: string;
}

export const DiffEditor: React.FC<DiffEditorProps> = memo(({
  original,
  modified,
  language = "text/plain",
  readOnly = true,
  minHeight = 200,
  maxHeight = 600,
  codeSpace,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [diffEditor, setDiffEditor] = useState<editor.IStandaloneDiffEditor | null>(null);
  const contextManager = createContextManager(codeSpace);

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

  const highlightChanges = useCallback((modifiedModel: editor.ITextModel) => {
    const currentTask = contextManager.getContext('currentTask');
    if (!currentTask || !diffEditor) return;

    const decorations: editor.IModelDeltaDecoration[] = [];
    const changes = diffEditor.getLineChanges() || [];

    changes.forEach(change => {
      const startLineNumber = change.modifiedStartLineNumber;
      const endLineNumber = change.modifiedEndLineNumber || startLineNumber;

      for (let lineNumber = startLineNumber; lineNumber <= endLineNumber; lineNumber++) {
        const lineContent = modifiedModel.getLineContent(lineNumber);
        if (lineContent.toLowerCase().includes(currentTask.toLowerCase())) {
          decorations.push({
            range: new Range(lineNumber, 1, lineNumber, 1),
            options: {
              isWholeLine: true,
              className: 'highlightedChange',
              glyphMarginClassName: 'highlightedChangeGutter'
            }
          });
        }
      }
    });

    modifiedModel.deltaDecorations([], decorations);
  }, [contextManager, diffEditor]);

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
        diffEditor.dispose();
        if (diffModels) {
          diffModels.original.dispose();
          diffModels.modified.dispose();
        }
      }
    };
  }, [containerRef, containerRef.current, diffEditor, original, modified, language, readOnly]);

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

        highlightChanges(diffModels.modified);
      }
    }
  }, [diffEditor, original, modified, highlightChanges]);

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
