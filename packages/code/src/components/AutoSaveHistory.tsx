import React from "react";
import { CodeHistoryCarousel } from "./HistoryItems";

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
  { codeSpace },
) => {
  return (
    <div className="container mx-auto p-4">
      <CodeHistoryCarousel codeSpace={codeSpace}  />
    </div>
  );
};

export default AutoSaveHistory;
