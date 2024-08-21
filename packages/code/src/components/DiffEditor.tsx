import React, { useCallback, useEffect, useMemo, useRef } from "react";

interface DiffEditorProps {
  original: string;
  modified: string;
  language?: string;
}

const DiffEditor: React.FC<DiffEditorProps> = ({ original, modified, language = "typescript" }) => {
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
    // ... (keep the existing useEffect code)
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
};

export default React.memo(DiffEditor);
