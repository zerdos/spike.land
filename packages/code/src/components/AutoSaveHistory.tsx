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
