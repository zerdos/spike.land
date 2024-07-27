// src/components/AutoSaveHistory.tsx
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as monaco from "monaco-editor";
import React, { useEffect, useState } from "react";

interface Version {
  timestamp: number;
  code: string;
}

interface AutoSaveHistoryProps {
  codeSpace: string;
  onRestore: (code: string) => void;
  onClose: () => void;
}

const AutoSaveHistory: React.FC<AutoSaveHistoryProps> = ({ codeSpace, onRestore, onClose }) => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [diffEditor, setDiffEditor] = useState<monaco.editor.IStandaloneDiffEditor | null>(null);

  useEffect(() => {
    fetchVersions();
    initDiffEditor();

    return () => {
      if (diffEditor) {
        diffEditor.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (diffEditor && selectedVersion) {
      updateDiffEditor();
    }
  }, [selectedVersion]);

  const fetchVersions = async () => {
    try {
      const response = await fetch(`https://testing.spike.land/live/${codeSpace}/auto-save/history`);
      if (response.ok) {
        const data = await response.json<Version[]>();
        setVersions(data);
      } else {
        console.error("Failed to fetch version history");
      }
    } catch (error) {
      console.error("Error fetching version history:", error);
    }
  };

  const initDiffEditor = () => {
    const editor = monaco.editor.createDiffEditor(document.getElementById("diffEditor")!, {
      automaticLayout: true,
      readOnly: true,
      renderSideBySide: false,
    });
    setDiffEditor(editor);
  };

  const updateDiffEditor = () => {
    if (!diffEditor || !selectedVersion) return;

    const originalModel = monaco.editor.createModel(versions[0].code, "typescript");
    const modifiedModel = monaco.editor.createModel(selectedVersion.code, "typescript");

    diffEditor.setModel({
      original: originalModel,
      modified: modifiedModel,
    });
  };

  const handleRestore = async () => {
    if (!selectedVersion) return;

    try {
      const response = await fetch(`https://testing.spike.land/live/${codeSpace}/auto-save/restore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp: selectedVersion.timestamp }),
      });

      if (response.ok) {
        onRestore(selectedVersion.code);
        onClose();
      } else {
        console.error("Failed to restore version");
      }
    } catch (error) {
      console.error("Error restoring version:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 w-11/12 h-5/6 flex">
        <div className="w-1/3 pr-4">
          <h2 className="text-2xl font-bold mb-4">Version History</h2>
          <ScrollArea className="h-[calc(100%-6rem)]">
            {versions.map((version) => (
              <div
                key={version.timestamp}
                className={`p-2 cursor-pointer ${
                  selectedVersion === version ? "bg-accent text-accent-foreground" : ""
                }`}
                onClick={() => setSelectedVersion(version)}
              >
                {new Date(version.timestamp).toLocaleString()}
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="w-2/3 pl-4">
          <div id="diffEditor" className="h-[calc(100%-4rem)]"></div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button onClick={handleRestore} disabled={!selectedVersion}>Restore Selected Version</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoSaveHistory;
