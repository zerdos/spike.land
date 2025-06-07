import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

export const IframeWrapper: React.FC<
  { codeSpace: string; fullScreen: boolean; }
> = ({
  codeSpace,
  fullScreen = false,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(16 / 9); // default ratio

  const handleResize = useCallback(() => {
    if (!containerRef.current || !iframeRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    const scale = Math.min(
      containerWidth / window.innerWidth,
      containerHeight / window.innerHeight,
    );

    iframeRef.current.style.transform = `scale(${scale})`;
    iframeRef.current.style.width = `${window.innerWidth}px`;
    iframeRef.current.style.height = `${window.innerHeight}px`;
  }, []);

  useEffect(() => {
    const onResize = () => {
      setRatio(window.innerWidth / window.innerHeight);
      handleResize();
    };
    onResize();

    // Listen for window resizes
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [handleResize]);

  // Conditionally apply full-screen or relative positioning
  const style: React.CSSProperties = {
    position: fullScreen ? "fixed" : "relative",
    top: fullScreen ? 0 : "auto",
    left: fullScreen ? 0 : "auto",
    width: fullScreen ? "100vw" : "100%",
    height: fullScreen ? "100dvh" : "auto",
    zIndex: fullScreen ? 9999 : "auto",
  };

  return (
    <div ref={containerRef} style={style} className="overflow-hidden">
      <AspectRatio ratio={fullScreen ? 1 : (ratio ?? 1)}>
        <iframe
          ref={iframeRef}
          title="Live Preview"
          className={cn(
            "w-full h-full origin-top-left border-0",
            fullScreen && "fixed top-0 left-0",
          )}
          src={`/live/${codeSpace}/embed`}
        />
      </AspectRatio>
    </div>
  );
};
