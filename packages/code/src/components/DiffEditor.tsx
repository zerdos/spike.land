import { editor } from "@/external/monacoEditor";
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";

interface DiffEditorProps {
  original: string;
  modified: string;
  language?: string;
}

export const DiffEditor: React.FC<DiffEditorProps> = memo(({ original, modified, language = "typescript" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateHeight = useCallback((content: string) => {
    const lineCount = content.split("\n").length;
    const lineHeight = 20; // Adjust this value based on your font size and line spacing
    const padding = 20; // Add some padding
    return Math.min(Math.max(lineCount * lineHeight + padding, 200), 600); // Min 200px, max 600px
  }, []);

  const editorHeight = useMemo(() => {
    const originalHeight = calculateHeight(original);
    const modifiedHeight = calculateHeight(modified);
    return Math.max(originalHeight, modifiedHeight) + 2;
  }, [original, modified, calculateHeight]);

  useEffect(() => {
    if (containerRef.current) {
      const diffEditor = editor.createDiffEditor(containerRef.current, {
        diffAlgorithm: "advanced",
        readOnly: true,
        diffWordWrap: "off",
        hideUnchangedRegions: {
          enabled: true,
        },
        lineNumbers: "off",
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        renderSideBySide: true,
      });

      const originalModel = editor.createModel(original, language);
      const modifiedModel = editor.createModel(modified, language);

      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel,
      });

      return () => {
        diffEditor.dispose();
        originalModel.dispose();
        modifiedModel.dispose();
      };
    }
    return () => {};
  }, [original, modified, language, editorHeight]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        minWidth: "530px",
        height: `${editorHeight}px`,
        maxHeight: "800px",
      }}
    />
  );
});

DiffEditor.displayName = "DiffEditor";

export default DiffEditor;
