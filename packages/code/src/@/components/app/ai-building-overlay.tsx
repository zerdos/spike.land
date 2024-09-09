import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface AIBuildingOverlayProps {
  codeSpace: string;
}

const useProgressBar = (isStreaming: boolean) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isStreaming) {
      setProgress(100);
      return;
    }

    setProgress(0);
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

  return progress;
};

const useReloadEffect = (isStreaming: boolean) => {
  useEffect(() => {
    if (isStreaming) return;

    const timeoutId = setTimeout(() => {
      location.reload();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isStreaming]);
};

export function AIBuildingOverlay({ codeSpace }: AIBuildingOverlayProps) {
  const [isStreaming] = useLocalStorage<boolean>(`streaming-${codeSpace}`);
  const progress = useProgressBar(isStreaming);
  useReloadEffect(isStreaming);

  if (!isStreaming) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 h-12",
        "bg-gradient-to-r from-pink-500/60 via-blue-500/60 to-green-500/60",
        "flex flex-col justify-center items-center",
        "z-10 backdrop-blur-sm shadow-lg",
      )}
      aria-label='AI building progress indicator'
    >
      <div className='flex items-center text-white text-sm font-medium mb-2'>
        <div
          className={cn(
            "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2",
          )}
        />
        AI is building... This may take a few moments.
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}

export default function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-grow p-4 pb-16'>
        <h1 className='text-3xl font-bold mb-4'>Your App Title</h1>
        <p>Your app content goes here</p>
      </main>
      <AIBuildingOverlay codeSpace='highlightJsss' />
    </div>
  );
}