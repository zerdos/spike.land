import { throttle } from "@/utils/throttle";
import { useCallback, useEffect, useState } from "react";

function useWindowSize(delay = 250) {
  const [windowSize, setWindowSize] = useState({
    width: innerWidth,
    height: innerHeight,
  });

  const handleResize = useCallback(
    throttle(
      () => {
        setWindowSize({
          width: innerWidth,
          height: innerHeight,
        });
      },
      delay,
      { edges: ["leading", "trailing"] },
    ),
    [delay],
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return windowSize;
}

export default useWindowSize;
