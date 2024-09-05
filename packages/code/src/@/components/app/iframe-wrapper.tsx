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
        setRatio(innerWidth / innerHeight);
      }
    });
    ref.current && resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref]);

  return (
    <AspectRatio ratio={ratio} ref={ref}>
      <iframe
        css={css`
        height: calc(100vh * ${1 / scale});
        width: calc(100vw * ${1 / scale});
        scale: ${scale};
        transform-origin: top left;
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
