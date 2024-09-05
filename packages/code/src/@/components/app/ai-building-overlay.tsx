import { Progress } from "@/components/ui/progress";
import { useSyncedStorage } from "@/hooks/use-synced-storage";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface AIBuildingOverlayProps {
  codeSpace: string;
}

export function AIBuildingOverlay({ codeSpace }: AIBuildingOverlayProps) {
  const [isStreaming, _setIsStreaming] = useSyncedStorage(`streaming-${codeSpace}`);
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
    <div
      className={cn(
        "fixed left-0 right-0 bottom-0 h-20",
        "bg-gradient-to-r from-pink-500 via-blue-500 to-green-500",
        "flex flex-col justify-center items-center z-50",
      )}
    >
      <div className="flex items-center text-white text-2xl font-bold mb-2">
        <div
          className={cn(
            "w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin mr-4",
          )}
        >
        </div>
        AI is building...
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
