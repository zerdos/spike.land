import { css } from "@emotion/react";
import { motion, MotionConfig } from "framer-motion";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MdFullscreen as FullscreenIcon } from "react-icons/md";
import { Phone, Share, Tablet, Tv } from "./icons";
import { Fab, ToggleButton, ToggleButtonGroup } from "./mui";
import { QRButton } from "./Qr.lazy";

// Define breakpoints and sizes
const breakPoints = [
  innerWidth < 750 ? innerWidth : 750,
  innerWidth < 1025 && innerWidth > 750 ? innerWidth : 1024,
  innerWidth > 1024 ? innerWidth : 1920,
];

const sizes = [10, 25, 50, 75, 100];

type DraggableWindowProps = {
  children: JSX.Element;
  codeSpace: string;
};

export const DraggableWindow: FC<DraggableWindowProps> = (
  { children, codeSpace },
) => {
  const [scaleRange, setScaleRange] = useState(100);
  const [delay, setDelay] = useState(2);
  const [width, setWidth] = useState(innerWidth);
  const [bgColor, setBgColor] = useState<[number, number, number, number]>([
    0,
    0,
    0,
    0,
  ]);
  const maxScaleRange = 100;
  const startPositions = { bottom: 0, right: 0 };
  const [{ bottom, right }, setPositions] = useState(startPositions);
  const scale = scaleRange / 100;

  // Set initial positions and scale range
  useEffect(() => {
    const reveal = () => {
      setScaleRange(Math.min(50, 50 / (1 / devicePixelRatio)));
      setWidth(breakPoints[1]);
      setBgColor([66, 66, 66, .5]);
      setPositions({ bottom: 20, right: 20 });
      setDelay(0);
    };
    const timeoutId = setTimeout(reveal, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Update background color periodically
  // useEffect(() => {
  //   const updateBgColor = () => {
  //     const bgColorString = getComputedStyle(document.body).backgroundColor;
  //     const bgColorArray = bgColorString
  //       .slice(4, -1)
  //       .split(",")
  //       .map(Number)
  //       .map((value) => (isNaN(value) ? 0 : value));

  //     if (bgColor.join(",") !== bgColorArray.join(",")) {
  //       setBgColor(bgColorArray as [number, number, number, number]);
  //     }
  //   };

  //   const intervalId = setInterval(updateBgColor, 500);
  //   return () => clearInterval(intervalId);
  // }, [bgColor]);

  while (bgColor.length < 4) bgColor.push(1);
  const [r, g, b, a] = bgColor.includes(NaN)
    ? [0, 0, 0, 0]
    : bgColor.map((x) => x ? x : 1);
  const rgba = (r: number, g: number, b: number, a: number) => `rgba(${r || 1}, ${g || 1}, ${b || 1}, ${a || 0.7})`;

  const duration = sessionStorage?.getItem("duration")
    ? Number(sessionStorage.getItem("duration"))
    : 1;
  const type = sessionStorage?.getItem("type") || "spring";

  return (
    <MotionConfig transition={{ delay, type, duration }}>
      <motion.div
        layout
        initial={{
          padding: 0,
          top: 0,
          right: 0,
          borderRadius: 0,
        }}
        animate={{
          padding: 8,
          top: bottom,
          right: right,
          backgroundColor: rgba(r, g, b, a),
          borderRadius: 16,
        }}
        style={{ backgroundColor: rgba(r, g, b, a) }}
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
            {/* Scale range buttons */}
            <motion.div
              layout
              css={css`
                overflow: hidden;
                display: flex;
                justify-content: space-evenly;
              `}
              initial={{ height: 0, width: 0 }}
              animate={{ height: "42px", width: "100%" }}
            >
              <ToggleButtonGroup
                value={scaleRange}
                size="small"
                exclusive
                onChange={(_e, newScale) => {
                  if (newScale) setScaleRange(newScale);
                }}
              >
                {Array.from(
                  new Set([
                    ...(sizes.filter((x) => x < maxScaleRange)),
                    scaleRange,
                    maxScaleRange,
                  ]),
                )
                  .sort((a, b) => a - b)
                  .map((size) => (
                    <ToggleButton key={size} value={size}>
                      <span
                        css={css`
                          color: ${
                          size === scaleRange
                            ? "var(--text-color-highlight)"
                            : "var(--text-color-normal)"
                        };
                        `}
                      >
                        {size}%
                      </span>
                    </ToggleButton>
                  ))}
              </ToggleButtonGroup>
            </motion.div>
            {/* Content area with scale */}
            <motion.div
              transition={{ scale: { type } }}
              css={css`
                display: block;
                border-radius: 8px;
                background-color: rgba(r, g, b, 0.7);
              `}
              initial={{ height: window.innerHeight, width: window.innerWidth }}
              animate={{
                height: window.innerHeight * scale,
                width: width * scale,
              }}
            >
              <motion.div
                transition={{ zoom: { type: "spring" }, delay: 0 }}
                css={css`
                  transform-origin: top left;
                  display: inline-block;
                  border-radius: 8px;
                  background-color: rgba(r, g, b, 0.7);
                  overflow: hidden;
                `}
                initial={{
                  height: window.innerHeight,
                  width: window.innerWidth,
                  scale: 1,
                }}
                animate={{ height: window.innerHeight, width, scale }}
              >
                {children}
              </motion.div>
            </motion.div>
            {/* Breakpoint buttons */}
            <motion.div
              layout
              css={css`
                overflow: hidden;
                display: flex;
                justify-content: space-evenly;
              `}
              initial={{ height: 0, width: "0%" }}
              animate={{ height: 42, width: "100%" }}
            >
              <ToggleButtonGroup
                value={width}
                size="small"
                exclusive
                onChange={(_e, newSize) => {
                  if (newSize) setWidth(newSize);
                }}
              >
                {breakPoints.map((size) => (
                  <ToggleButton key={size} value={size}>
                    {size === breakPoints[0]
                      ? (
                        <span
                          css={css`
                          color: ${
                            width === breakPoints[0]
                              ? "var(--text-color-highlight)"
                              : "var(--text-color-normal)"
                          };
                        `}
                        >
                          <Phone />
                        </span>
                      )
                      : size === breakPoints[1]
                      ? (
                        <span
                          css={css`
                          color: ${
                            width === breakPoints[1]
                              ? "var(--text-color-highlight)"
                              : "var(--text-color-normal)"
                          };
                        `}
                        >
                          <Tablet />
                        </span>
                      )
                      : (
                        <span
                          css={css`
                          color: ${
                            width === breakPoints[2]
                              ? "var(--text-color-highlight)"
                              : "var(--text-color-normal)"
                          };
                        `}
                        >
                          <Tv />
                        </span>
                      )}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </motion.div>
          </div>
          {/* Action buttons */}
          <motion.div
            layout
            css={css`overflow: hidden;`}
            initial={{ height: "0%", width: "0px" }}
            animate={{ height: "100%", width: "88px" }}
          >
            <div
              css={css`
                padding: 16px;
                display: flex;
                overflow: hidden;
                align-items: center;
                flex-direction: column;
              `}
            >
              <Fab
                key="fullscreen"
                onClick={() => {
                  document.querySelector("#root")?.requestFullscreen();
                }}
              >
                <span
                  css={css`
                    font-size: 20pt;
                  `}
                >
                  <FullscreenIcon key="fs" />
                </span>
              </Fab>
              <QRButton url={`${location.origin}/live/${codeSpace}/public`} />
              <Fab
                key="Share"
                onClick={() => window.open(`/live/${codeSpace}/public`)}
              >
                <Share />
              </Fab>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export default DraggableWindow;
