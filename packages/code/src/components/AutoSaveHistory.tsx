// src/components/AutoSaveHistory.tsx
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as monaco from "monaco-editor";
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { transpile } from "../shared";
import { createRoot } from "react-dom/client";
import { useVirtualizer } from '@tanstack/react-virtual';

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
  const [transpiledModules, setTranspiledModules] = useState<string[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: versions.length,
    getScrollElement: () => parentRef.current,
    scrollPaddingStart: 8,
    scrollPaddingEnd: 8,
    estimateSize: () => 150,
    overscan: 5,
  });

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
  }, [selectedVersion, versions]);

  const renderModule = useCallback((moduleUrl: string, index: number) => {
    const container = document.getElementById(`module-container-${index}`);
    if (container) {
      import(moduleUrl).then((module) => {
        const root = createRoot(container);
        root.render(React.createElement(module.default));
      }).catch((error) => {
        console.error(`Error rendering module ${index}:`, error);
      });
    }
  }, []);

  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    virtualItems.forEach((virtualItem) => {
      const moduleUrl = transpiledModules[virtualItem.index];
      if (moduleUrl) {
        renderModule(moduleUrl, virtualItem.index);
      }
    });

    return () => {
      virtualItems.forEach((virtualItem) => {
        const moduleUrl = transpiledModules[virtualItem.index];
        if (moduleUrl) {
          URL.revokeObjectURL(moduleUrl);
        }
      });
    };
  }, [transpiledModules, rowVirtualizer.getVirtualItems()]);

  const getPreviousVersion = (currentVersion: Version): Version | null => {
    const currentIndex = versions.findIndex(v => v.timestamp === currentVersion.timestamp);
    return currentIndex < versions.length - 1 ? versions[currentIndex + 1] : null;
  };

  const fetchVersions = async () => {
    try {
      const response = await fetch(`https://testing.spike.land/live/${codeSpace}/auto-save/history`);
      if (response.ok) {
        const data = await response.json<Version[]>();
        setVersions(data);
        transpileAndCreateModules(data);
      } else {
        console.error("Failed to fetch version history");
      }
    } catch (error) {
      console.error("Error fetching version history:", error);
    }
  };

  const transpileAndCreateModules = async (historyItems: Version[]) => {
    const modules = await Promise.all(
      historyItems.map(async (item) => {
        const transpiled = await transpile({
          code: item.code,
          originToUse: location.origin,
        });
        return URL.createObjectURL(
          new Blob([transpiled], {
            type: "application/javascript",
          }),
        );
      }),
    );
    setTranspiledModules(modules);
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

    const previousVersion = getPreviousVersion(selectedVersion);
    const originalModel = monaco.editor.createModel(
      previousVersion ? previousVersion.code : "",
      "typescript"
    );
    const modifiedModel = monaco.editor.createModel(selectedVersion.code, "typescript");

    diffEditor.setModel({
      original: originalModel,
      modified: modifiedModel,
    });

    // Update the diff editor title
    const titleElement = document.getElementById("diffEditorTitle");
    if (titleElement) {
      titleElement.textContent = previousVersion
        ? `Changes since ${new Date(previousVersion.timestamp).toLocaleString()}`
        : "Initial version";
    }
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
      <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 w-11/12 h-5/6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Version History</h2>
        <div className="flex-grow flex">
          <ScrollArea className="w-1/3 pr-4">
            <div
              ref={parentRef}
              className="relative"
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                const version = versions[virtualItem.index];
                return (
                  <div
                    key={version.timestamp}
                    className={`absolute top-0 left-0 w-full p-2 cursor-pointer rounded-lg transition-colors ${
                      selectedVersion === version ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                    }`}
                    style={{
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                    onClick={useCallback(() => setSelectedVersion(version), [version])}
                  >
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(version.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                    <div
                      className="border border-input rounded-md p-2 h-24 flex items-center justify-center overflow-hidden"
                    >
                      <div id={`module-container-${virtualItem.index}`} className="w-full h-full"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="w-2/3 pl-4 flex flex-col">
            <h3 id="diffEditorTitle" className="text-lg font-semibold mb-2"></h3>
            <div id="diffEditor" style={{ height: 'calc(100% - 2rem)' }}></div>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={handleRestore} disabled={!selectedVersion}>
            Restore {selectedVersion ? `Version from ${new Date(selectedVersion.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}` : 'Selected Version'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AutoSaveHistory;
