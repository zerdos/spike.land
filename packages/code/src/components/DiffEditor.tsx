import { editor } from "@/external/monacoEditor";

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

interface DiffEditorProps {
  original: string;
  modified: string;
  language?: string;
}

export const DiffEditor: React.FC<DiffEditorProps> = memo(({ original, modified }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [diffEditor, setDiffEditor] = useState<editor.IStandaloneDiffEditor | null>(null);

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
    if (containerRef.current && !diffEditor) {
      const diffy = editor.createDiffEditor(containerRef.current, {
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

      diffy.setModel({
        original: editor.createModel(original, "text/plain"),
        modified: editor.createModel(modified, "text/plain"),
      });
      setDiffEditor(diffy);
    }

    return () => {
      if (diffEditor) {
        const diffModels = diffEditor.getModel();
        diffEditor.dispose();
        if (!diffModels) {
          return;
        }
        const { original, modified } = diffModels;
        original.dispose();
        modified.dispose();
      }
    };
  }, [diffEditor, containerRef, containerRef.current, original, modified]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "80%",
        height: `${editorHeight}px`,
        maxHeight: "800px",
      }}
    />
  );
});

DiffEditor.displayName = "DiffEditor";

export default DiffEditor;
