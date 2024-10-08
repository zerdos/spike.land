import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";

export const IframeWrapper: React.FC<
  { codeSpace: string; fullScreen: boolean }
> = ({
  codeSpace,
  fullScreen = false,
}) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(16 / 9); // Default aspect ratio

  const handleResize = useCallback(() => {
    if (containerRef.current && ref.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const scale = Math.min(
        containerWidth / window.innerWidth,
        containerHeight / window.innerHeight,
      );
      ref.current.style.transform = `scale(${scale})`;
      ref.current.style.width = `${window.innerWidth}px`;
      ref.current.style.height = `${window.innerHeight}px`;
    }
  }, []);

  useEffect(() => {
    const updateRatio = () => {
      setRatio(window.innerWidth / window.innerHeight);
    };
    updateRatio();
    window.addEventListener("resize", updateRatio);
    return () => window.removeEventListener("resize", updateRatio);
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    handleResize(); // Initial resize
    return () => resizeObserver.disconnect();
  }, [handleResize]);

  const springProps = useSpring({
    position: fullScreen ? "fixed" : "relative",
    top: fullScreen ? 0 : "auto",
    left: fullScreen ? 0 : "auto",
    width: fullScreen ? "100vw" : "100%",
    height: fullScreen ? "100dvh" : "auto",
    zIndex: fullScreen ? 9999 : "auto",
    config: { mass: 1, tension: 500, friction: 18 },
  });

  return (
    <animated.div
      ref={containerRef}
      style={springProps as unknown as React.CSSProperties}
      className="overflow-hidden"
    >
      <AspectRatio ratio={fullScreen ? undefined : ratio}>
        <iframe
          ref={ref}
          title="Live Preview"
          className={cn(
            "w-full h-full origin-top-left border-0",
            fullScreen ? "fixed top-0 left-0" : "",
          )}
          src={`/live/${codeSpace}/embed`}
        />
      </AspectRatio>
    </animated.div>
  );
};
