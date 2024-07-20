import { css } from "@emotion/react";
import { motion, MotionConfig } from "framer-motion";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MdFullscreen as FullscreenIcon } from "react-icons/md";
import { Phone, Share, Tablet, Tv } from "./icons";
import { Fab, ToggleButton, ToggleButtonGroup } from "./mui";
import { QRButton } from "./Qr.lazy";
import { FaDownload } from 'react-icons/fa';
import { stat, readFile } from "./memfs";
import { ScaleRangeButtons } from "./components/ScaleRangeButtons";
import { BreakpointButtons } from "./components/BreakpointButtons";
import { ActionButtons } from "./components/ActionButtons";
import { useWindowSize } from "./hooks/useWindowSize";
import { useBgColor } from "./hooks/useBgColor";
import { useDownload } from "./hooks/useDownload";

// Define breakpoints and sizes
const breakPoints = [750, 1024, 1920];
const sizes = [10, 25, 50, 75, 100];

type DraggableWindowProps = {
  children: JSX.Element;
  codeSpace: string;
};

export const DraggableWindow: FC<DraggableWindowProps> = ({ children, codeSpace }) => {
  const [scaleRange, setScaleRange] = useState(100);
  const [delay, setDelay] = useState(2);
  const [width, setWidth] = useState(innerWidth);
  const { bgColor, setBgColor, rgba } = useBgColor();
  const maxScaleRange = 100;
  const startPositions = { bottom: 0, right: 0 };
  const [{ bottom, right }, setPositions] = useState(startPositions);
  const scale = scaleRange / 100;
  const { innerWidth, innerHeight } = useWindowSize();
  const handleDownload = useDownload(codeSpace);

  useEffect(() => {
    const reveal = () => {
      setScaleRange(Math.min(50, 50 / (1 / devicePixelRatio)));
      setWidth(breakPoints[1]);
      setBgColor([66,66,66,.5]);
      setPositions({ bottom: 20, right: 20 });
      setDelay(0);
    };
    const timeoutId = setTimeout(reveal, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const duration = Number(sessionStorage?.getItem("duration")) || 1;
  const type = sessionStorage?.getItem("type") || "spring";

  return (
    <MotionConfig transition={{ delay, type, duration }}>
      <motion.div
        layout
        initial={{ padding: 0, top: 0, right: 0, borderRadius: 0 }}
        animate={{
          padding: 8,
          top: bottom,
          right: right,
          backgroundColor: rgba(...bgColor),
          borderRadius: 16,
        }}
        style={{ backgroundColor: rgba(...bgColor) }}
        css={css`
          z-index: 10;
          backdrop-filter: blur(15px);
          position: fixed;
        `}
        drag
        dragMomentum={false}
        dragConstraints={{
          left: -innerWidth,
          right: width - 20 - width / 6,
          bottom: innerHeight,
        }}
        dragElastic={0.5}
      >
        <div style={{ display: "flex" }}>
          <div
            css={css`
              display: flex;
              width: 100%;
              flex-direction: column;
              align-items: center;
            `}
          >
            <ScaleRangeButtons
              scaleRange={scaleRange}
              setScaleRange={setScaleRange}
              sizes={sizes}
              maxScaleRange={maxScaleRange}
            />
            <motion.div
              transition={{ scale: { type } }}
              css={css`
                display: block;
                border-radius: 8px;
                background-color: ${rgba(...bgColor)};
              `}
              initial={{ height: innerHeight, width: innerWidth }}
              animate={{
                height: innerHeight * scale,
                width: width * scale,
              }}
            >
              <motion.div
                transition={{ zoom: { type: "spring" }, delay: 0 }}
                css={css`
                  transform-origin: top left;
                  display: inline-block;
                  border-radius: 8px;
                  background-color: ${rgba(...bgColor)};
                  overflow: hidden;
                `}
                initial={{
                  height: innerHeight,
                  width: innerWidth,
                  scale: 1,
                }}
                animate={{ height: innerHeight, width, scale }}
              >
                {children}
              </motion.div>
            </motion.div>
            <BreakpointButtons
              width={width}
              setWidth={setWidth}
              breakPoints={breakPoints}
            />
          </div>
          <ActionButtons
            codeSpace={codeSpace}
            handleDownload={handleDownload}
          />
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export default DraggableWindow;
