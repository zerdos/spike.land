import React from "react";
import CodeHistory from "./HistoryItems";


interface Version {
  timestamp: number;
  code: string;
}

interface AutoSaveHistoryProps {
  codeSpace: string;
  onRestore: (code: string) => void;
  onClose: () => void;
}

interface VersionItemProps {
  virtualItem: any;
  version: Version;
  selectedVersion: Version | null;
  handleSetSelectedVersion: (version: Version) => void;
  formatDate: (timestamp: number) => string;
  isModuleTranspiled: (index: number) => boolean;
}
const AutoSaveHistory: React.FC<AutoSaveHistoryProps> = (
  { codeSpace, onRestore, onClose },
) => {

  return (
    <div className="container mx-auto p-4">
    <CodeHistory codeSpace={codeSpace} onRestore={onRestore} onClose={onClose} />
  </div>
  );
};

export default AutoSaveHistory;
