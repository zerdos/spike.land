import { css } from "@emotion/react";
import { motion, MotionConfig } from "framer-motion";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { MdFullscreen as FullscreenIcon } from "react-icons/md";
import { QRButton } from "./Qr.lazy";

import { Fab, ToggleButton, ToggleButtonGroup } from "./mui";

import { md5, mST } from "session";
import { Phone, Share, Tablet, Tv } from "./icons";
// import { wait } from "./wait";

const breakPoints = [750, 1024, 1920];
const breakPointHeights = [1335, 1366, 1080];

const sizes = [10, 25, 50, 75, 100];

type DraggableWindowProps = {
  // OnRestore: (() => void);
  // children: JSX.Element;
  room: string;
};

export const DraggableWindow: FC<DraggableWindowProps> = (
  {
    // OnRestore,
    room,
    // HashCode,
  },
) => {
  const [scaleRange, changeScaleRange] = useState(100);

  const [maxScaleRange, changeMaxScaleRange] = useState(100);

  const [isVisible, setVisible] = useState(false);
  const iRef = useRef<HTMLIFrameElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  globalThis.iRef = iRef;

  iRef.current!.contentWindow?.postMessage;

  const startPositions = { bottom: 0, right: 0 };

  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidthB] = useState(window.innerWidth * devicePixelRatio);
  const [delay, _setDelay] = useState(0);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  // const videoRef = useRef(null);
  const scale = scaleRange / 100;

  const setWidth = (width: number) => {
    const breakPoint = breakPoints.findIndex((x) => x === width);
    const height = breakPointHeights[breakPoint];
    changeScaleRange(
      Math.max(100, Math.floor(window.innerHeight / height) - 10) / 2
        * devicePixelRatio,
    );
    changeMaxScaleRange(
      Math.max(100, Math.floor(40 * window.innerHeight / height)) / 2
        * devicePixelRatio,
    );

    // changeMaxScaleRange(Math.floor(100 * Math.sqrt(1 - (innerWidth / (width + 40)))));
    // changeMaxScaleRange(Math.floor(100 * (innerWidth / (width + 40))));
    setWidthB(width);
    setHeight(height);
  };

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
    if (!iRef.current) return;
    if (!dragRef.current) return;

    // zBodyRef.current.innerHTML = zBodyRef.current.innerHTML || mST().html;
    const reveal = () => {
      // await wait(300);
      // setPositions({
      //   bottom: -50 * devicePixelRatio,
      //   right: -90 * devicePixelRatio,
      // });

      if (window.innerWidth / devicePixelRatio < 600) {
        //   changeScaleRange(Math.floor(100 * breakPoints[0] / innerWidth));
        setWidth(breakPoints[0]);
        // setHeight(breakPointHeights[0]);
      }

      if (window.innerWidth / devicePixelRatio < 1200) {
        // changeScaleRange(Math.floor(100*(breakPoints[0]*breakPoints[0] / innerWidth/innerWidth)));
        setWidth(breakPoints[0]);
        // setHeight(breakPointHeights[0]);
      } else if (window.innerWidth / devicePixelRatio < 1800) {
        setWidth(breakPoints[1]);
        // setHeight(breakPointHeights[1]);

        //        changeScaleRange(Math.floor(100 * breakPoints[1] / innerWidth));
      } else if (window.innerWidth / devicePixelRatio < 2500) {
        setWidth(breakPoints[2]);
        //     changeScaleRange(Math.floor(100 * breakPoints[1] / innerWidth));
        // setHeight(breakPointHeights[1]);
      } else if (window.innerWidth / devicePixelRatio > 2500) {
        setWidth(breakPoints[2]);
        // setHeight(breakPointHeights[1]);
        //    changeScaleRange(Math.floor(100 * breakPoints[1] / innerWidth));
        // changeScaleRange(100);
      }

      setPositions({
        bottom: 20,
        right: 20,
      });
      // setDelay(0);
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

  const [r, g, b, a] = bg;

  const rgba = (r: number, g: number, b: number, a: number) => `rgba(${r},${g},${b},${a})`;

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      // setCSS(mST().css);
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

  // useEffect(() => {
  //   const intervalHandler = setInterval(() => {
  //     // setCSS(mST().css);

  //     if (iRef.current !== null) {
  //       if (iRef.current.clientWidth > window.innerWidth) {
  //         const newScale = scaleRange + Math.floor(window.innerWidth / width);
  //         changeScaleRange(newScale);
  //         changeMaxScaleRange(newScale);
  //       }
  //     }
  //   }, 1000);
  //   return () => clearInterval(intervalHandler);
  // }, [scaleRange]);

  // const [clients, setClients] = useState(Object.keys(sendChannel.rtcConns));

  // useEffect(() => {
  //   setClients([...Object.keys(sendChannel.rtcConns)]);
  // }, [sendChannel.webRtcArray.length, setClients]);

  // const delay: number = sessionStorage && Number(sessionStorage.getItem("delay")) || del;
  const duration = sessionStorage && Number(sessionStorage.getItem("duration")) || 1;

  const type = sessionStorage && sessionStorage.getItem("type") || "spring";
  return (
    <MotionConfig transition={{ delay, type, duration }}>
      <motion.div
        ref={dragRef}
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
            <motion.div
              css={css`
              overflow: hidden;
              display:flex;
              justify-content: space-evenly;`}
              initial={{ height: "0px", width: "0%", opacity: 0 }}
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
              layout="size"
              initial={{
                height: window.innerHeight * scale,
                width: window.innerWidth * scale,
              }}
              animate={{
                height: height * scale,
                width: width * scale,
              }}
            >
              {delay == 1
                ? (
                  <motion.div
                    css={css`
                position: absolute;
                  top:0;
                  opacity: 0;
                  z-index: 6;
                  left:0;
                  height: ${window.innerHeight}px;
                  width: ${window.innerWidth}px;
              `}
                    initial={{
                      opacity: 1,
                    }}
                    animate={{
                      opacity: `${isVisible ? 0 : 1}`,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: mST().html.split(md5(mST().transpiled)).join(
                        `css`,
                      ),
                    }}
                  />
                )
                : null}
              <motion.iframe
                layout="size"
                ref={iRef}
                onLoad={() => requestAnimationFrame(() => setVisible(true))}
                frameBorder={0}
                initial={{
                  width: window.innerWidth,
                  opacity: 0,
                  transformOrigin: "top left",
                  height: window.innerHeight,
                  backgroundColor: rgba(r, g, b, 0),
                  transform: `scale(1,1)`,
                }}
                animate={{
                  width: width,

                  opacity: `${isVisible ? 1 : 0}`,
                  backgroundColor: rgba(r, g, b, 0.7),
                  height: height,
                  transform: `scale(${scale},${scale})`,
                  transformOrigin: "top left",
                }}
                // ref={zBodyRef}
                // id={"z-body"}
                // data-test-id="z-body"
                css={css`
                
                  border-radius: 8px;
               
                  
                  z-index: 7;
              `}
                src={`${location.origin}/live/${room}/`}
                suppressHydrationWarning={true}
                seamless={true}
              />
            </motion.div>
            <motion.div
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
                    {size === 640
                      ? (
                        <span
                          css={css`
                        color: ${
                            width === 640
                              ? "var(--text-color-highlight)"
                              : "var(--text-color-normal)"
                          };
                        `}
                        >
                          <Phone />
                        </span>
                      )
                      : (size === 1024
                        ? (
                          <span
                            css={css`
                        color: ${
                              width === 1024
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
                              width === 1366
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
                onClick={() => open(`/live/${room}/public`)}
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
