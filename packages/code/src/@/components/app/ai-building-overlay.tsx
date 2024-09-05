import { Progress } from "@/components/ui/progress";
import { useSyncedStorage } from "@/hooks/use-synced-storage";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AIBuildingOverlayProps {
  codeSpace: string;
}

export function AIBuildingOverlay({ codeSpace }: AIBuildingOverlayProps) {
  const [isStreaming] = useSyncedStorage(`streaming-${codeSpace}`);
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
          return (prevProgress + 1) % 100;
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
        "fixed inset-x-0 bottom-0 h-16",
        "bg-gradient-to-r from-pink-500 via-blue-500 to-green-500",
        "flex flex-col justify-center items-center",
        "-z-10",
      )}
    >
      <div className="flex items-center text-white text-xl font-bold mb-2">
        <div
          className={cn(
            "w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3",
          )}
        />
        AI is building...
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
