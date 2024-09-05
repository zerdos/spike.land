import { AspectRatio } from "@/components/ui/aspect-ratio";
import React, { useCallback, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

export const IframeWrapper: React.FC<{ codeSpace: string; fullScreen: boolean }> = ({
  codeSpace,
  fullScreen = false,
}) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    if (containerRef.current && ref.current) {
      const scale = containerRef.current.offsetWidth / window.innerWidth;
      ref.current.style.transform = `scale(${scale})`;
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [handleResize]);

  const ratio = window.innerWidth / window.innerHeight;

  const springProps = useSpring({
    position: fullScreen ? "fixed" : "relative",
    top: fullScreen ? 0 : "auto",
    left: fullScreen ? 0 : "auto",
    width: fullScreen ? "100vw" : "100%",
    height: fullScreen ? "100vh" : "auto",
    zIndex: fullScreen ? 9999 : "auto",
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.div ref={containerRef} style={springProps}>
      <AspectRatio ratio={fullScreen ? undefined : ratio}>
        <iframe
          ref={ref}
          className={`h-[100vh] w-[100vw] origin-top-left border-0 overflow-y-overlay overflow-x-auto touch-pan-y ${
            fullScreen ? "fixed top-0 left-0" : ""
          }`}
          src={`/live/${codeSpace}/embed`}
        />
      </AspectRatio>
    </animated.div>
  );
};
