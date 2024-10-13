import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AIBuildingOverlayProps {
  codeSpace: string;
}

export function AIBuildingOverlay({ codeSpace }: AIBuildingOverlayProps) {
  const [isStreaming, setIsSteaming] = useState(false);

  useEffect(() => {
    const BC = new BroadcastChannel("chat-" + codeSpace);

    BC.onmessage = (e) => {
      if (e.data.isStreaming !== false) setIsSteaming(false);
      else      setIsSteaming(true);
    };

    const timeout = setTimeout(() => {
      setIsSteaming(false);
    }, 1000);
    
  return () => {
    clearTimeout(timeout);
    BC.close();
  }

  }, []);
  
  if (!isStreaming) return null;

  return (
    <div
      data-testid="ai-building-overlay"
      className={cn(
        "fixed inset-x-0 bottom-0 h-12",
        "bg-gradient-to-r from-pink-500/60 via-blue-500/60 to-green-500/60",
        "flex flex-col justify-center items-center",
        "z-10 backdrop-blur-sm shadow-lg",
      )}
      aria-label="AI building progress indicator"
    >
      <div className="flex items-center text-white text-sm font-medium mb-2">
        <div
          className={cn(
            "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2",
          )}
        />
        AI is building... This may take a few moments.
      </div>
      <Progress className="w-full"  />
    </div>
  );
}
