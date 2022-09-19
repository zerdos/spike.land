import { css } from "@emotion/react";

import { useEffect, useState } from "react";
import { domMax, LazyMotion, m } from "framer-motion";
import { QRButton } from "./Qr";

// import { useSpring, a } from '@react-spring/web'

import {
  Fab,
  FullscreenIcon,
  Phone,
  Share,
  Tablet,
  ToggleButton as muiToggleButton,
  ToggleButtonGroup as muiToggleButtonGroup,
  Tv,
} from "./mui";

import type {
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "./mui";
// import type{ ReactNode } from "react";

const ToggleButtonGroup = muiToggleButtonGroup as typeof MuiToggleButtonGroup;
const ToggleButton = muiToggleButton as typeof MuiToggleButton;
const breakPoints = [680, 768, 1920];
const breakPointHeights = [1137, 1024, 1080];

const sizes = [10, 25, 50, 75, 100, 150];

const bg = `rgba(${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${
  Math.random() * 128 + 64
}, ${!navigator.userAgent.includes("Firefox") ? 0.3 : 0.7})`;

interface DraggableWindowProps {
  // onRestore: (() => void);
  hashCode: number;
  position?: string;
  room: string;
  children: React.ReactNode;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = (
  {
    children,
    // onRestore,
    room,
    hashCode,
  },
) => {
  const [scaleRange, changeScaleRange] = useState(100);

  const startPositions = { bottom: 0, right: 0 };

  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  // const ref = useRef<HTMLDivElement>(null);

  const scale = scaleRange / 100;

  // useEffect(()=> {

  //   ref.current?.appendChild(document.getElementById("root")!)

  // }
  //   , [ref]);

  useEffect(() => {
    const reveal = async () => {
      setPositions({
        bottom: window.innerHeight * 0.2,
        right: window.innerWidth * 0.2,
      });

      if (window.innerWidth / devicePixelRatio < 600) {
        changeScaleRange(50);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      }

      if (window.innerWidth / devicePixelRatio < 1200) {
        changeScaleRange(100);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      } else if (window.innerWidth / devicePixelRatio < 1800) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);

        changeScaleRange(50);
      } else if (window.innerWidth / devicePixelRatio < 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);

        changeScaleRange(75);
      } else if (window.innerWidth / devicePixelRatio > 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);

        changeScaleRange(100);
      }

      setPositions({
        bottom: 20,
        right: 20,
      });
    };
    reveal();
    // setTimeout(reveal, 200);
  }, []);

  return (
    <LazyMotion features={domMax}>
      <m.div
        transition={{ delay: 0, duration: 0.4 }}
        initial={{
          top: 0,
          padding: 0,
          right: 0,
          borderRadius: 0,
        }}
        animate={{
          top: bottom,
          padding: 8,
          right,
          borderRadius: 16,
        }}
        css={css`
            background-color:${bg};
            backdrop-filter: blur(15px);
            z-index: 10;

            white-space: normal;
            position: fixed;
          `}
        drag={true}
        dragMomentum={false}
        dragConstraints={{
          left: 0,
          right: width - 20 - width / 6,
          bottom: innerHeight,
        }}
        dragElastic={0.5}
      >
        <div
          css={css` 
              display: flex;
              
                `}
        >
          <div
            css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
          >
            <m.div
              transition={{ delay: 0, duration: 0.4 }}
              initial={{ height: 0, width: 0 }}
              animate={{ height: "auto", width: "auto" }}
            >
              <ToggleButtonGroup
                value={scaleRange}
                size="small"
                exclusive
                onChange={(_e: unknown, newScale: number) => {
                  newScale && changeScaleRange(newScale);
                }}
              >
                {sizes.map((size) => (
                  <ToggleButton
                    key={size}
                    value={size}
                  >
                    <span
                      css={css`
                       color: ${
                        size === scaleRange
                          ? "rgba(255,255,255,.8)"
                          : "rgba(0,0,0,.3)"
                      };
                       `}
                    >
                      {size}%
                    </span>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </m.div>
            {/* <span>{width}*{height}</span> */}

            <m.div
              transition={{ delay: 0, duration: 0.4 }}
              initial={{
                width: window.innerWidth,
                height: window.innerHeight,
                borderRadius: 0,
                // Opacity: isFullScreen ? 1 : 0.7,
              }}
              animate={{
                width: width * scale / devicePixelRatio,
                height: height * scale / devicePixelRatio,
                borderRadius: 8,
                // Opacity: isFullScreen ? 1 : 0.7,
              }}
              css={css`

                display: block;
                overflow: hidden;
                overflow-y: hidden;
            `}
            >
              <m.div
                transition={{ delay: 0, duration: 0.4 }}
                initial={{
                  width: window.innerWidth,
                  height: window.innerHeight,
                  background: "rgba(0,0,0, 1)",
                  scale: 1,
                }}
                animate={{
                  background: "rgba(92,92,92, 0.5)",
                  transformOrigin: "0px 0px",
                  width: width / devicePixelRatio,
                  height: height / devicePixelRatio,
                  scale: scaleRange / 100,
                }}
                data-test-id="z-body"
                css={css`
                  overflow:overlay;
                  overflow-y: hidden;
              `}
              >
                {
                  /* <div
                  style={{height: "100%"}} ref={ref}> */
                }
                {children}
                {/* </div> */}
              </m.div>
            </m.div>
            <m.div
              transition={{ delay: 0, duration: 0.4 }}
            >
              <ToggleButtonGroup
                value={width}
                size="small"
                exclusive
                onChange={(_e: unknown, newSize: number) => {
                  if (newSize) {
                    setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
                    setWidth(newSize);
                  }
                }}
              >
                {breakPoints.map((size) => (
                  <ToggleButton
                    key={`size-${size}`}
                    value={size}
                  >
                    {size === 680
                      ? (
                        <Phone
                          css={css`
                        color: ${
                            width === 680
                              ? "rgba(255,255,255,.8)"
                              : "rgba(0,0,0,.3)"
                          };
                        `}
                        />
                      )
                      : (size === 768
                        ? (
                          <Tablet
                            css={css`
                        color: ${
                              width === 768
                                ? "rgba(255,255,255,.8)"
                                : "rgba(0,0,0,.3)"
                            };
                        `}
                          />
                        )
                        : (
                          <Tv
                            css={css`
                        color: ${
                              width === 1920
                                ? "rgba(255,255,255,.8)"
                                : "rgba(0,0,0,.3)"
                            };
                      `}
                          />
                        ))}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </m.div>
          </div>

          <m.div
            transition={{ delay: 0, duration: 0.4 }}
            initial={{ height: 0, width: 0 }}
            animate={{ height: "100%", width: "auto" }}
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
                  document.getElementById("root")?.requestFullscreen();
                }}
              >
                <FullscreenIcon key="fs" />
              </Fab>

              <QRButton
                url={location.origin + `/live/${room}/public`}
                key={`qr-${hashCode}`}
              />

              <Fab
                key="Share"
                onClick={() => open(`/live/${room}/public`)}
              >
                <Share />
              </Fab>
            </div>
          </m.div>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default DraggableWindow;
