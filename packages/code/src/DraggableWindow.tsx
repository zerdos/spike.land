import { css } from "@emotion/react";
import { motion, MotionConfig } from "framer-motion";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MdFullscreen as FullscreenIcon } from "react-icons/md";
import { QRButton } from "./Qr.lazy";

import { Fab, ToggleButton, ToggleButtonGroup } from "./mui";

import { Phone, Share, Tablet, Tv } from "./icons";
// import { wait } from "./wait";

const breakPoints = [750, 1024, 1920];
const breakPointHeights = [1335, 1366, 1080];

const sizes = [10, 25, 50, 75, 100];

type DraggableWindowProps = {
  // OnRestore: (() => void);
  children: JSX.Element;
  codeSpace: string;
};

export const DraggableWindow: FC<DraggableWindowProps> = (
  {
    // OnRestore,
    children,
    codeSpace,
    // HashCode,
  },
) => {
  const [scaleRange, changeScaleRange] = useState(100);
  const [delay, _setDelay] = useState(2);

  // const [maxScaleRange, changeMaxScaleRange] = useState(100);
  const maxScaleRange = 100;
  // globalThis.iRef = iRef;

  const startPositions = { bottom: 0, right: 0 };

  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  // const [delay, _setDelay] = useState(Number(sessionStorage.getItem("delay")) || 0);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  // const videoRef = useRef(null);
  const scale = scaleRange / 100;

  useEffect(() => {
    const reveal = () => {
      changeScaleRange(Math.min(100, 50 / 1 / (1 / devicePixelRatio)));
      if (window.innerWidth / devicePixelRatio < 600) {
        //   changeScaleRange(Math.floor(100 * breakPoints[0] / innerWidth));
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      }

      if (window.innerWidth / devicePixelRatio < 1200) {
        // changeScaleRange(Math.floor(100*(breakPoints[0]*breakPoints[0] / innerWidth/innerWidth)));
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      } else if (window.innerWidth / devicePixelRatio < 1800) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);

        //        changeScaleRange(Math.floor(100 * breakPoints[1] / innerWidth));
      } else if (window.innerWidth / devicePixelRatio < 2500) {
        setWidth(breakPoints[2]);
        //     changeScaleRange(Math.floor(100 * breakPoints[1] / innerWidth));
        setHeight(breakPointHeights[2]);
      } else if (window.innerWidth / devicePixelRatio > 2500) {
        setWidth(breakPoints[2]);
        setHeight(breakPointHeights[2]);
        //    changeScaleRange(Math.floor(100 * breakPoints[1] / innerWidth));
        // changeScaleRange(100);
      }

      setPositions({
        bottom: 20,
        right: 20,
      });

      setTimeout(() => {
        _setDelay(0);
      }, 1000);
    };

    reveal();
  }, []);

  const bgColor = getComputedStyle(
    document.body,
    null,
  ).getPropertyValue("background-color")
    .slice(4, -1).split(",")
    .slice(0, 4)
    .map((x) => Number(x) || 0);

  const [bg, setBG] = useState(bgColor);

  const [r, g, b, a] = bg;

  const rgba = (r: number, g: number, b: number, a: number) => `rgba(${r},${g},${b},${a})`;

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      // setCSS(mST().css);
      const bgColor = getComputedStyle(
        document.body,
        null,
      ).getPropertyValue("background-color")
        .slice(4, -1).split(",")
        .slice(0, 4)
        .map((x) => Number(x) || 0);

      if (JSON.stringify(bg) !== JSON.stringify(bgColor)) setBG(bgColor);
    }, 1000 / 2);
    return () => clearInterval(intervalHandler);
  }, []);

  const duration = sessionStorage && Number(sessionStorage.getItem("duration")) || 1;

  const type = sessionStorage && sessionStorage.getItem("type") || "spring";
  return (
    <MotionConfig transition={{ delay, type, duration }}>
      <motion.div
        initial={{
          padding: 0,
          top: 0,
          backgroundColor: "rgba(0, 0,0, 0)",
          backdropFilter: `blur(0px)`,
          right: 0,
          borderRadius: 0,
        }}
        animate={{
          top: bottom,
          right: right,
          backdropFilter: "blur(15px)",
          padding: 8,
          backgroundColor: `${rgba(r | 96, g | 66, b || 160, a || .3)}`,
          borderRadius: 16,
        }}
        css={css`
          z-index: 10;
          position: fixed;
        `}
        drag={true}
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
            <motion.div
              css={css`
              overflow: hidden;
              display: flex;
              justify-content: space-evenly;`}
              initial={{ height: 0, width: 0 }}
              animate={{
                height: "42px",
                width: "100%",
              }}
            >
              <ToggleButtonGroup
                value={scaleRange}
                size="small"
                exclusive
                onChange={(_e: unknown, newScale: number) => {
                  newScale && changeScaleRange(newScale);
                }}
              >
                {Array.from(new Set([
                  ...(sizes.filter((x) => x < maxScaleRange)),
                  scaleRange,
                  maxScaleRange,
                ]).values())
                  .sort((a, b) => a - b).map((size, ind) => (
                    <ToggleButton
                      key={ind}
                      value={size}
                    >
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
            <motion.div
              layout="preserve-aspect"
              initial={{
                height: window.innerHeight,
                width: window.innerWidth,
              }}
              animate={{
                height: height * scale,
                width: width * scale,
              }}
            >
              <motion.div
                layout="size"
                css={css`
              transform-origin: top left;
              `}
                initial={{
                  backgroundColor: rgba(r, g, b, 1),
                  transform: `scale(1,1)`,
                  height: window.innerHeight,
                  width: window.innerWidth,
                  borderRadius: 0,
                }}
                animate={{
                  backgroundColor: rgba(r, g, b, 0.7),
                  transform: `scale(${scale},${scale})`,
                  height: height,
                  width: width,
                  borderRadius: 8,
                }}
              >
                {children}
              </motion.div>
            </motion.div>
            <motion.div
              css={css`
              overflow: hidden;
              display: flex;
              justify-content: space-evenly;`}
              initial={{ height: "0", width: "0" }}
              animate={{
                height: "42px",
                width: "100%",
              }}
            >
              <ToggleButtonGroup
                value={width}
                size="small"
                exclusive
                onChange={(_e: unknown, newSize: number) => {
                  if (newSize) {
                    // setHeight(
                    //   // breakPointHeights[breakPoints.indexOf(newSize)],
                    // );
                    //    changeMaxScaleRange(Math.floor(100 * newSize / innerWidth));
                    setWidth(newSize);
                  }
                }}
              >
                {breakPoints.map((size, ind) => (
                  <ToggleButton
                    key={ind}
                    value={size}
                  >
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
                      : (size === breakPoints[1]
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
                        ))}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </motion.div>
          </div>

          <motion.div
            css={css`overflow: hidden;`}
            initial={{ height: "0%", width: "0px" }}
            animate={{ height: "100%", width: "88px" }}
          >
            <div
              css={css`
              padding: 16px;
              display: flex;
              overflow: "hidden";
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

              <QRButton
                url={location.origin + `/live/${codeSpace}/public`}
              />

              {
                /* <Fab
                key="video"
                onClick={() => open(`/live/${codeSpace}/public`)}
              >
                <Share />
              </Fab> */
              }

              {false && (
                <>
                  {
                    /* <video
                        ref={videoRef}
                        onClick={
                          () => {} // startVideo(videoRef?.current!)
                        }
                        playsInline={true}
                        autoPlay={true}
                      >
                      </video>
                      {clients.map((k, index) => (
                        <video
                          id={`video-${k}`}
                          key={index}
                          // ref={videoRef}
                          playsInline={true}
                          autoPlay={true}
                        >
                        </video>
                      ))} */
                  }
                </>
              )}
              <Fab
                key="Share"
                onClick={() => open(`/live/${codeSpace}/public`)}
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
