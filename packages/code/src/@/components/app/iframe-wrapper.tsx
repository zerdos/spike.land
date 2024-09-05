import { css } from "@emotion/react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React, { useRef, useState } from "react";

export const IframeWrapper: React.FC<{ codeSpace: string }> = ({ codeSpace }) => {
  const ref = useRef<HTMLIFrameElement>(null);

  const [scale, setScale] = useState(1);
  const [ratio, setRatio] = useState(innerWidth / innerHeight);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const newScale = width / innerWidth;
        setScale(newScale);
        setRatio(width / height);
      }
    });
    ref.current && resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref]);

  return (
    <AspectRatio ratio={ratio}>
      <iframe
        ref={ref}
        css={css`
        height: 100%;
        width: 100%;
        scale: ${1 / scale};
        transform-origin: 0 0;
        border: 0;
        overflow-y: overlay;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      `}
        src={`/live/${codeSpace}/embed`}
      />
    </AspectRatio>
  );
};
