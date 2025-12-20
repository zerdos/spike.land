import { MotionConfig } from "framer-motion";
import type { FC } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";
import { DraggableWindowContent } from "./components/DraggableWindowContent";
import { MotionContainer } from "./components/MotionContainer";
import { useDownload } from "./hooks/useDownload";

interface Position {
  bottom: number;
  right: number;
}

interface DraggableWindowProps {
  children: React.ReactElement;
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
  const [bgColor, setBgColor] = useState([66, 66, 66, 0.5]);

  const [positions, setPositions] = useState<Position>(INITIAL_POSITION);
  const handleDownload = useDownload(codeSpace);

  const scale = useMemo(() => scaleRange / MAX_SCALE_RANGE, [scaleRange]);

  const rgba = (r: number, g: number, b: number, a: number) =>
    `rgba(${r || 1}, ${g || 1}, ${b || 1}, ${a || 0.7})`;

  const calculateRevealScale = useCallback(() => {
    // Calculate raw scale based on device characteristics
    const rawScale = Math.min(
      50,
      Math.floor(
        100 * (1 / 2 - 152 / (window.devicePixelRatio * window.innerWidth)),
      ),
    );
    // Snap to nearest predefined scale value to avoid odd percentages like 36%, 44%
    const predefinedScales = [10, 25, 50, 75, 100];
    return predefinedScales.reduce((prev, curr) =>
      Math.abs(curr - rawScale) < Math.abs(prev - rawScale) ? curr : prev
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
    type: "spring" as const,
    duration: Number(sessionStorage?.getItem("duration")) || 1,
  }), [delay]);

  return (
    <MotionConfig transition={transition}>
      <MotionContainer
        bottom={positions.bottom}
        isChatOpen={isChatOpen}
        right={positions.right}
        bgColor={bgColor}
      >
        <DraggableWindowContent
          scaleRange={scaleRange}
          rgba={rgba}
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
          bgColor={bgColor}
        >
          {children}
        </DraggableWindowContent>
      </MotionContainer>
    </MotionConfig>
  );
};
