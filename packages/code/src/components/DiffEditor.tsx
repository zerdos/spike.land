import React, { useEffect, useRef } from "react";
import * as monaco from "../external/monacoEditor";

interface DiffEditorProps {
  original: string;
  modified: string;
  language?: string;
}

const DiffEditor: React.FC<DiffEditorProps> = ({ original, modified, language = "typescript" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const diffEditor = monaco.editor.createDiffEditor(containerRef.current, {
        automaticLayout: true,
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        renderSideBySide: true,
      });

      const originalModel = monaco.editor.createModel(original, language);
      const modifiedModel = monaco.editor.createModel(modified, language);

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
  }, [original, modified, language]);

  return <div ref={containerRef} style={{ width: "100%", height: "400px" }} />;
};

export default DiffEditor;
