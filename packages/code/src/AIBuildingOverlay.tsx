import React, { useEffect, useState } from "react";
import { useSyncedStorage } from "./hooks/useSyncedStorage";

export const AIBuildingOverlay: React.FC<{ codeSpace: string }> = ({ codeSpace }) => {
  const [isStreaming, _setIsStreaming] = useSyncedStorage(`streaming-${codeSpace}`, undefined);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isStreaming) {
      setProgress(0);
    } else {
      setProgress(100);
    }
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 100 / (10000 / 50);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isStreaming]);
  if (!isStreaming) return null;
  return (
    <div className="fixed left-0 right-0 bottom-0 h-20 bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 flex flex-col justify-center items-center z-50">
      <div className="flex items-center text-white text-2xl font-bold mb-2">
        <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin mr-4"></div>
        AI is building...
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        >
        </div>
      </div>
    </div>
  );
};
