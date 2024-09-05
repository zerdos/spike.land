import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React, { useRef, useState } from "react";

export const IframeWrapper: React.FC<{ codeSpace: string }> = ({ codeSpace }) => {
  const ref = useRef<HTMLIFrameElement>(null);

  const [scale, setScale] = useState(1);
  const [ratio, setRatio] = useState(window.innerWidth / window.innerHeight);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const newScale = width / window.innerWidth;
        setScale(newScale);
        setRatio(window.innerWidth / window.innerHeight);
      }
    });
    ref.current && resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref]);

  return (
    <AspectRatio ratio={ratio} ref={ref}>
      <iframe
        className={`h-[calc(100vh/${scale})] w-[calc(100vw/${scale})] origin-top-left border-0 overflow-y-overlay overflow-x-auto touch-pan-y`}
        style={{
          transform: `scale(${scale})`,
        }}
        src={`/live/${codeSpace}/embed`}
      />
    </AspectRatio>
  );
};
