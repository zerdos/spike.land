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
  const [showDiff, setShowDiff] = useState(true);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | monaco.editor.IStandaloneDiffEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      if (showDiff) {
        editorRef.current = monaco.editor.createDiffEditor(containerRef.current, {
          automaticLayout: true,
          readOnly: true,
          renderSideBySide: false,
          enableSplitViewResizing: false,
        });
      } else {
        editorRef.current = monaco.editor.create(containerRef.current, {
          automaticLayout: true,
          readOnly: true,
        });
      }
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, [showDiff]);

  useEffect(() => {
    if (editorRef.current && versions.length > 0) {
      const currentVersion = versions[versions.length - 1].code;
      const selectedVersion = versions[sliderValue].code;

      if (showDiff) {
        const diffEditor = editorRef.current as monaco.editor.IStandaloneDiffEditor;
        const originalModel = monaco.editor.createModel(currentVersion, "typescript");
        const modifiedModel = monaco.editor.createModel(selectedVersion, "typescript");

        diffEditor.setModel({
          original: originalModel,
          modified: modifiedModel,
        });

        return () => {
          originalModel.dispose();
          modifiedModel.dispose();
        };
      } else {
        const editor = editorRef.current as monaco.editor.IStandaloneCodeEditor;
        const model = monaco.editor.createModel(selectedVersion, "typescript");
        editor.setModel(model);

        return () => {
          model.dispose();
        };
      }
    }
  }, [sliderValue, versions, showDiff]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };

  const toggleDiffView = () => {
    setShowDiff(!showDiff);
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Version History</h2>
          <span className="text-sm text-muted-foreground">
            Total Versions: {versions.length}
          </span>
        </div>

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
            <span>Selected Version</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-muted-foreground">
            {versions[sliderValue] ? new Date(versions[sliderValue].timestamp).toLocaleString() : "N/A"}
          </span>
          <div className="space-x-2">
            <Button variant="outline" onClick={toggleDiffView}>
              {showDiff ? "Hide Diff" : "Show Diff"}
            </Button>
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
