import { css } from "@emotion/react";
import { AnimatePresence, domAnimation, domMax, LazyMotion, m, MotionConfig } from "framer-motion";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { MdFullscreen as FullscreenIcon } from "react-icons/md";
import { QRButton } from "./Qr.lazy";
import { mST } from "./session";

import { Fab, ToggleButton, ToggleButtonGroup } from "./mui";

import { Phone, Share, Tablet, Tv } from "./icons";
import { sendChannel } from "./ws";

const breakPoints = [680, 768, 1920];
const breakPointHeights = [1137, 1024, 1080];

const sizes = [10, 25, 50, 75, 100];

type DraggableWindowProps = {
  // OnRestore: (() => void);
  children: JSX.Element;
  room: string;
};

export const DraggableWindow: FC<DraggableWindowProps> = (
  {
    children,
    // OnRestore,
    room,
    // HashCode,
  },
) => {
  const [scaleRange, changeScaleRange] = useState(100);
  const zBodyRef = useRef(null);
  globalThis.zBodyRef = zBodyRef;

  const startPositions = { bottom: 0, right: 0 };

  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const videoRef = useRef(null);
  const scale = scaleRange / 100;

  // UseEffect(()=> {

  //   ref.current?.appendChild(document.getElementById("root")!)

  // }
  //   , [ref]);

  //  const terminalRef =  useRef(null);

  //  useEffect(() => {
  //   if (!terminalRef?.current) return;

  // terminal.open(terminalRef.current)
  // fitAddon.activate(terminal)
  // fitAddon.fit();

  //   console.log = (...data) => {
  //    const params = data.map (d=> typeof d === "object"? JSON.stringify(d, null, 2): d);
  //     terminal.write(params.join(" - ") + "\r\n");
  //     origConsole.apply(console, data);
  // }

  //  }, [terminalRef]);

  useEffect(() => {
    if (!zBodyRef.current) return;
    zBodyRef.current.innerHTML = zBodyRef.current.innerHTML || mST().html;
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
    // SetTimeout(reveal, 200);
  }, []);

  const bgColor = window.getComputedStyle(
    document.body,
    null,
  ).getPropertyValue("background-color")
    .slice(4, -1).split(",")
    .slice(0, 4)
    .map((x) => Number(x) || 0);

  const [bg, setBG] = useState(bgColor);
  const [mstCss, setCSS] = useState(mST().css);
  const [r, g, b, a] = bg;

  const rgba = (r: number, g: number, b: number, a: number) => `rgba(${r},${g},${b},${a})`;

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      setCSS(mST().css);
      const bgColor = window.getComputedStyle(
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

  const [clients, setClients] = useState(Object.keys(sendChannel.rtcConns));

  useEffect(() => {
    setClients([...Object.keys(sendChannel.rtcConns)]);
  }, [sendChannel.webRtcArray.length, setClients]);

  const delay: number = sessionStorage && Number(sessionStorage.getItem("delay")) || 0;
  const duration = sessionStorage && Number(sessionStorage.getItem("duration")) || 0.8;

  const type = sessionStorage && sessionStorage.getItem("type") || "spring";
  return (
    <MotionConfig transition={{ delay, type, duration }}>
      <AnimatePresence>
        <LazyMotion features={{ ...domAnimation, ...domMax }}>
          <m.div
            layout
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
            ${mstCss.split("body").join(`[data-test-id="z-body"]`)}
            touch-action: pinch-zoom;
            background-color: ${rgba(r | 96, g | 66, b || 160, a || .3)};
            backdrop-filter: blur(15px);
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <m.div
                  css={css`
              overflow: hidden;
              display:flex;
              justify-content: space-evenly;`}
                  initial={{ height: "0px", width: "0", opacity: 0 }}
                  animate={{
                    height: "42px",
                    width: "100%",
                    opacity: 1,
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
                    {sizes.map((size, ind) => (
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
                </m.div>
                {/* <span>{width}*{height}</span> */}

                <m.div
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
                >
                  <m.div
                    initial={{
                      width: window.innerWidth,
                      height: window.innerHeight,
                      backgroundColor: rgba(r, g, b, 0),
                      scale: 1,
                    }}
                    animate={{
                      backgroundColor: rgba(r, g, b, 0.7),
                      transformOrigin: "0px 0px",
                      width: width / devicePixelRatio,
                      height: height / devicePixelRatio,
                      scale: scaleRange / 100,
                    }}
                    ref={zBodyRef}
                    id={"z-body"}
                    data-test-id="z-body"
                    css={css`
                  position: relative  ;
                  overflow: auto;    
              `}
                  />
                </m.div>
                <m.div
                  css={css`
              overflow: hidden;
              display:flex;
              justify-content: space-evenly;`}
                  initial={{ height: "0", width: "0", opacity: 0 }}
                  animate={{
                    height: "42px",
                    width: "100%",
                    opacity: 1,
                  }}
                >
                  <ToggleButtonGroup
                    value={width}
                    size="small"
                    exclusive
                    onChange={(_e: unknown, newSize: number) => {
                      if (newSize) {
                        setHeight(
                          breakPointHeights[breakPoints.indexOf(newSize)],
                        );
                        setWidth(newSize);
                      }
                    }}
                  >
                    {breakPoints.map((size, ind) => (
                      <ToggleButton
                        key={ind}
                        value={size}
                      >
                        {size === 680
                          ? (
                            <span
                              css={css`
                        color: ${
                                width === 680
                                  ? "var(--text-color-highlight)"
                                  : "var(--text-color-normal)"
                              };
                        `}
                            >
                              <Phone />
                            </span>
                          )
                          : (size === 768
                            ? (
                              <span
                                css={css`
                        color: ${
                                  width === 768
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
                                  width === 1920
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
                </m.div>
              </div>

              <m.div
                initial={{ height: 0, width: 0, opacity: 0 }}
                animate={{ height: "100%", width: "88px", opacity: 1 }}
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
                    url={location.origin + `/live/${room}/public`}
                  />

                  {
                    /* <Fab
                key="video"
                onClick={() => open(`/live/${room}/public`)}
              >
                <Share />
              </Fab> */
                  }

                  {false && (
                    <>
                      <video
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
                      ))}
                    </>
                  )}
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
      </AnimatePresence>
    </MotionConfig>
  );
};

export default DraggableWindow;
