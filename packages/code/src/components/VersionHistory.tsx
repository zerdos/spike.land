// src/components/VersionHistory.tsx
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import * as monaco from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";

interface Version {
  timestamp: number;
  code: string;
}

interface VersionHistoryProps {
  versions: Version[];
  onRestore: (code: string) => void;
  onClose: () => void;
}

const VersionHistory: React.FC<VersionHistoryProps> = ({ versions, onRestore, onClose }) => {
  const [sliderValue, setSliderValue] = useState(versions.length - 1);
  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !diffEditorRef.current) {
      diffEditorRef.current = monaco.editor.createDiffEditor(containerRef.current, {
        automaticLayout: true,
        readOnly: true,
        renderSideBySide: false, // Render inline diff
        enableSplitViewResizing: false, // Disable split view resizing
      });
    }

    return () => {
      if (diffEditorRef.current) {
        diffEditorRef.current.dispose();
        diffEditorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (diffEditorRef.current && versions.length > 0) {
      const originalModel = monaco.editor.createModel(versions[0].code, "typescript");
      const modifiedModel = monaco.editor.createModel(versions[sliderValue].code, "typescript");

      diffEditorRef.current.setModel({
        original: originalModel,
        modified: modifiedModel,
      });

      return () => {
        originalModel.dispose();
        modifiedModel.dispose();
      };
    }
  }, [sliderValue, versions]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };

  if (versions.length === 0) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Version History</h2>
          <p>No versions available.</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 w-11/12 h-5/6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Version History</h2>

        <div className="flex-grow" ref={containerRef}></div>

        <div className="mt-4">
          <Slider
            value={[sliderValue]}
            onValueChange={handleSliderChange}
            max={versions.length - 1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Oldest Version</span>
            <span>Current Version</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-muted-foreground">
            {versions[sliderValue] ? new Date(versions[sliderValue].timestamp).toLocaleString() : "N/A"}
          </span>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button
              onClick={() => versions[sliderValue] && onRestore(versions[sliderValue].code)}
              disabled={!versions[sliderValue]}
            >
              Restore This Version
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;
