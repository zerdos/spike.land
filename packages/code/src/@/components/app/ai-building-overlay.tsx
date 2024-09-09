import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useState } from "react";

interface AIBuildingOverlayProps {
  codeSpace: string;
}

export function AIBuildingOverlay({ codeSpace }: AIBuildingOverlayProps) {
  const [isStreaming] = useLocalStorage(`streaming-${codeSpace}`);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isStreaming) {
      // lets reload the page
      // this is a hack to get the page to reload
      location.reload();
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
        "fixed inset-x-0 bottom-0 h-12",
        "bg-gradient-to-r from-pink-500/60 via-blue-500/60 to-green-500/60",
        "flex justify-center items-center",
        "z-10 backdrop-blur-sm shadow-lg",
      )}
      aria-label='AI building progress indicator'>
      <div className='flex items-center text-white text-sm font-medium'>
        <div
          className={cn(
            "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2",
          )}
        />
        AI is building... This may take a few moments.
      </div>
      <Progress value={progress} className="w-full"  />
    </div>
  );
}

export default () => (
  <div className='min-h-screen flex flex-col'>
    <main className='flex-grow p-4 pb-16'>
      <h1 className='text-3xl font-bold mb-4'></h1>
      <p>s</p>
    </main>
    <AIBuildingOverlay codeSpace='highlightJsss' />
  </div>
);
