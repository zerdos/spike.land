import { throttle } from "@/lib/throttle";
import { useEffect, useMemo, useState } from "react";

function useWindowSize(delay = 250) {
  const [windowSize, setWindowSize] = useState({
    width: innerWidth,
    height: innerHeight,
  });

  // Create the resize handler with throttle using useMemo
  const handleResize = useMemo(() => {
    return throttle(
      () => {
        setWindowSize({
          width: innerWidth,
          height: innerHeight,
        });
      },
      delay,
      { edges: ["leading", "trailing"] },
    );
  }, [delay]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return windowSize;
}

export default useWindowSize;
