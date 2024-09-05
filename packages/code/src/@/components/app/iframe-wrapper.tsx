import { AspectRatio } from "@/components/ui/aspect-ratio";
import React, { useCallback, useRef } from "react";

export const IframeWrapper: React.FC<{ codeSpace: string }> = ({ codeSpace }) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    if (containerRef.current && ref.current) {
      const scale = containerRef.current.offsetWidth / window.innerWidth;
      ref.current.style.transform = `scale(${scale})`;
    }
  }, []);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [handleResize]);

  const ratio = window.innerWidth / window.innerHeight;

  return (
    <div ref={containerRef}>
      <AspectRatio ratio={ratio}>
        <iframe
          ref={ref}
          className="h-[100vh] w-[100vw] origin-top-left border-0 overflow-y-overlay overflow-x-auto touch-pan-y"
          src={`/live/${codeSpace}/embed`}
        />
      </AspectRatio>
    </div>
  );
};
