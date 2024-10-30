import { MotionConfig } from "framer-motion";
import { FC, useEffect, useState, useCallback, useMemo } from "react";
import { useWindowSize } from "react-use";
import { DraggableWindowContent } from "./components/DraggableWindowContent";
import { MotionContainer } from "./components/MotionContainer";
import { useBgColor } from "./hooks/useBgColor";
import { useDownload } from "./hooks/useDownload";

interface Position {
  bottom: number;
  right: number;
}

interface DraggableWindowProps {
  children: JSX.Element;
  codeSpace: string;
  isChatOpen: boolean;
  initialDelay?: number;
  initialScale?: number;
}

const BREAK_POINTS = {
  mobile: 750,
  tablet: 1024,
  desktop: 1920,
} as const;

const SCALE_SIZES = [10, 25, 50, 75, 100] as const;
const MAX_SCALE_RANGE = 100;
const INITIAL_POSITION: Position = { bottom: 0, right: 0 };
const REVEALED_POSITION: Position = { bottom: 20, right: 20 };

export const DraggableWindow: FC<DraggableWindowProps> = ({
  children,
  codeSpace,
  isChatOpen,
  initialDelay = 2,
  initialScale = 100,
}) => {
  const [scaleRange, setScaleRange] = useState(initialScale);
  const [delay, setDelay] = useState(initialDelay);
  const { width: innerWidth, height: innerHeight } = useWindowSize();
  const [width, setWidth] = useState(innerWidth);
  const { bgColor, setBgColor, rgba } = useBgColor();
  const [positions, setPositions] = useState<Position>(INITIAL_POSITION);
  const handleDownload = useDownload(codeSpace);

  const scale = useMemo(() => scaleRange / MAX_SCALE_RANGE, [scaleRange]);

  const calculateRevealScale = useCallback(() => {
    return Math.min(
      50,
      Math.floor(
        100 * (1 / 2 - 152 / (window.devicePixelRatio * window.innerWidth))
      )
    );
  }, []);

  const determineInitialWidth = useCallback(() => {
    return window.devicePixelRatio > 2 
      ? BREAK_POINTS.mobile 
      : BREAK_POINTS.tablet;
  }, []);

  const reveal = useCallback(() => {
    setScaleRange(calculateRevealScale());
    setWidth(determineInitialWidth());
    setBgColor([66, 66, 66, 0.5]);
    setPositions(REVEALED_POSITION);
    setDelay(0);
  }, [calculateRevealScale, determineInitialWidth, setBgColor]);

  useEffect(() => {
    const timeoutId = setTimeout(reveal, 2000);
    return () => clearTimeout(timeoutId);
  }, [reveal]);

  const transition = useMemo(() => ({
    delay,
    type: sessionStorage?.getItem("type") || "spring",
    duration: Number(sessionStorage?.getItem("duration")) || 1,
  }), [delay]);

  return (
    <MotionConfig transition={transition}>
      <MotionContainer
        bottom={positions.bottom}
        isChatOpen={isChatOpen}
        right={positions.right}
        bgColor={bgColor}
        rgba={rgba}
      >
        <DraggableWindowContent
          scaleRange={scaleRange}
          setScaleRange={setScaleRange}
          width={width}
          setWidth={setWidth}
          codeSpace={codeSpace}
          handleDownload={handleDownload}
          scale={scale}
          sizes={[...SCALE_SIZES]}
          maxScaleRange={MAX_SCALE_RANGE}
          breakPoints={Object.values(BREAK_POINTS)}
          innerHeight={innerHeight}
          rgba={rgba}
          bgColor={bgColor}
        >
          {children}
        </DraggableWindowContent>
      </MotionContainer>
    </MotionConfig>
  );
};