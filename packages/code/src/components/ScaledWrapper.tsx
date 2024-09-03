import { Wrapper } from "@/components/app/wrapper";
import React, { useEffect, useRef, useState } from "react";

export const ScaledWrapper: React.FC<{ code: string }> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const targetWidth = window.innerWidth / 3;
        setScale(Math.min(0.3, containerWidth / targetWidth));
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-0 pb-[56.25%] relative overflow-hidden"
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Wrapper code={code} />
      </div>
    </div>
  );
};
