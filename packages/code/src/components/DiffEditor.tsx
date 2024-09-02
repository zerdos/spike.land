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
  const [error, setError] = useState<string | null>(null);

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
      try {
        const diffy = editor.createDiffEditor(containerRef.current, {
          diffAlgorithm: "advanced",
          readOnly,
          diffWordWrap: "on",
          wordWrap: "on",
          wordWrapColumn: 80,
          onlyShowAccessibleDiffViewer: true,
          hideUnchangedRegions: {
            enabled: false, // Disable this feature to avoid potential issues
          },
          lineNumbers: "off",
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          renderSideBySide: false,
          renderOverviewRuler: false,
          theme: "vs-dark",
        });

        // Delay setting the model to ensure the editor is fully initialized
        setTimeout(() => {
          try {
            if (diffy.getModel() === null) {
              const originalModel = editor.createModel(original, language);
              const modifiedModel = editor.createModel(modified, language);

              diffy.setModel({
                original: originalModel,
                modified: modifiedModel,
              });
            }

            setDiffEditor(diffy);
          } catch (err) {
            console.error("Error setting diff editor model:", err);
            setError("Failed to initialize diff view. Please try again.");
          }
        }, 500); // Increased delay to 500ms for better reliability
      } catch (err) {
        console.error("Error creating diff editor:", err);
        setError("Failed to create diff view. Please try again.");
      }
    }

    return () => {
      if (diffEditor) {
        try {
          const diffModels = diffEditor.getModel();
          if (diffModels) {
            diffModels.original.dispose();
            diffModels.modified.dispose();
          }
          diffEditor.dispose();
        } catch (err) {
          console.error("Error disposing diff editor:", err);
        }
      }
    };
  }, [diffEditor, language, original, modified, readOnly]);

  useEffect(() => {
    if (diffEditor) {
      const diffModels = diffEditor.getModel();
      if (diffModels) {
        // Use requestAnimationFrame to ensure DOM updates are complete
        requestAnimationFrame(() => {
          try {
            if (diffModels.original && diffModels.modified) {
              diffModels.original.setValue(original);
              diffModels.modified.setValue(modified);
              diffEditor.layout(); // Force layout recalculation
            }
          } catch (err) {
            console.error("Error updating diff editor content:", err);
            setError("Failed to update diff view. Please try again.");
          }
        });
      }
    }
  }, [diffEditor, original, modified]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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
