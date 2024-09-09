import { MotionConfig } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { DraggableWindowContent } from "./components/DraggableWindowContent";
import { MotionContainer } from "./components/MotionContainer";
import { useBgColor } from "./hooks/useBgColor";
import { useDownload } from "./hooks/useDownload";

type DraggableWindowProps = {
  children: JSX.Element;
  codeSpace: string;
  isChatOpen: boolean;
};

const breakPoints = [750, 1024, 1920];
const sizes = [10, 25, 50, 75, 100];
export const DraggableWindow: FC<DraggableWindowProps> = (
  {
    children,
    codeSpace,
    isChatOpen,
  },
) => {
  const [scaleRange, setScaleRange] = useState(100);
  const [delay, setDelay] = useState(2);
  const { width: innerWidth, height: innerHeight } = useWindowSize();

  const [width, setWidth] = useState(innerWidth);
  const { bgColor, setBgColor, rgba } = useBgColor();
  const maxScaleRange = 100;
  const startPositions = { bottom: 0, right: 0 };
  const [{ bottom, right }, setPositions] = useState(startPositions);
  const scale = scaleRange / 100;
  const handleDownload = useDownload(codeSpace);

  useEffect(() => {
    const reveal = () => {
      setScaleRange(
        Math.min(
          50,
          Math.floor(
            100 * (1 / 2 - 152 / (devicePixelRatio * window.innerWidth)),
          ),
        ),
      );
      setWidth(devicePixelRatio > 2 ? breakPoints[0] : breakPoints[1]);
      setBgColor([66, 66, 66, .5]);
      setPositions({ bottom: 20, right: 20 });
      setDelay(0);
    };
    const timeoutId = setTimeout(reveal, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const duration = Number(sessionStorage?.getItem("duration")) || 1;
  const type = sessionStorage?.getItem("type") || "spring";

  return (
    <MotionConfig transition={{ delay, type, duration }}>
      <MotionContainer
        bottom={bottom}
        isChatOpen={isChatOpen}
        right={right}
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
          sizes={sizes}
          maxScaleRange={maxScaleRange}
          breakPoints={breakPoints}
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
