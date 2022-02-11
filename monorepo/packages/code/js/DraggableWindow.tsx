/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { Fragment, lazy, Suspense, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { motion } from "framer-motion";
// import { div } from "./lazyMotion";
import { QRButton } from "./Qr";
import { wait } from "./wait";
import { LazySpikeLandComponent } from "./LazyLoadedComponent";

import {
  Button as muiButton,
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
  Button as MuiButton,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "./mui";

const Button = muiButton as typeof MuiButton;
const ToggleButtonGroup = muiToggleButtonGroup as typeof MuiToggleButtonGroup;
const ToggleButton = muiToggleButton as typeof MuiToggleButton;
// Import { breakpoints } from "@mui/system";

// const {motion} = Motion;
import type { ICodeSession } from "./session";
const breakPoints = [680, 768, 1920];
const breakPointHeights = [1137, 1024, 1080];

const sizes = [10, 25, 50, 75, 100, 150];

const bg = `rgba(${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${
  Math.random() * 128 + 64
}, ${!navigator.userAgent.includes("Firefox") ? 0.3 : 0.7})`;

interface DraggableWindowProps {
  onShare: () => void;
  onRestore: (() => void);
  hashCode: number;
  session: ICodeSession;
  keepFullScreen: boolean;
  position?: string;
  room: string;
}

export const DraggableWindow: FC<DraggableWindowProps> = (
  { onShare, onRestore, position, session, keepFullScreen, room, hashCode },
) => {
  const [isStable, setIsStable] = useState(false);
  const [scaleRange, changeScaleRange] = useState(100);
  // Const [height, changeHeight] = useState(innerHeight);

  const [childArray, setChild] = useState([
    <LazySpikeLandComponent
      name={room}
      hash={hashCode}
      transpiled={session.transpiled}
      html={`<div id="root"><style>${session.css}</style><div id="zbody">${session.html}</div></div>`}
    />,
  ]);

  const startPositions = { bottom: -40, right: -90 };

  session.setChild = setChild;

  const [qrUrl, setQRUrl] = useState(session.url);
  const [errorText, setErrorText] = useState("");

  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const ref = useRef<HTMLDivElement>(null);
  const zbody = useRef<HTMLDivElement>(null);

  const child = childArray[childArray.length - 1];

  // UseEffect(() => {
  // window.addEventListener("resize", () => changeHeight(window.innerHeight));
  // });

  useEffect(() => {
    const handler = setInterval(async () => {
      if (errorText !== session.errorText) {
        const newError = session.errorText;
        setErrorText(newError);
        setIsStable(false);
        await wait(1500);
        if (session.errorText === newError) {
          setIsStable(true);
        }
      }

      if (qrUrl !== session.url) {
        setQRUrl(session.url);
      }
      // SetChild(session.children);
    }, 200);

    return () => {
      clearInterval(handler);
    };
  }, [setErrorText, setQRUrl, errorText, qrUrl]);

  const scale = scaleRange / 100;
  const [isFullScreen, setFullScreen] = useState(true);

  useEffect(() => {
    const reveal = async () => {
      const { bottom, right } = startPositions;
      if (keepFullScreen) {
        return;
      }

      await wait(1200);
      // Const root = document.getElementById("root");
      // if (root && root.remove) root.remove();
      await wait(300);

      setFullScreen(false);
      changeScaleRange(50);

      setPositions({
        bottom: window.innerHeight * 0.2,
        right: window.innerWidth * 0.2,
      });
      // ChangeScaleRange(75);
      // setHeight(height=> height)

      if (window.innerWidth / devicePixelRatio < 600) {
        changeScaleRange(50);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);

        // SetHeight(window.innerHeight * devicePixelRatio);
      }

      if (window.innerWidth / devicePixelRatio < 1200) {
        changeScaleRange(75);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);

        // SetHeight(window.innerHeight * devicePixelRatio);
      } else if (window.innerWidth / devicePixelRatio < 1800) {
        // SetHeight(breakPoints[1]);
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);

        changeScaleRange(50);
      } else if (window.innerWidth / devicePixelRatio < 2500) {
        // SetHeight(breakPointHeights[2] * devicePixelRatio);
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);

        changeScaleRange(75);
      } else if (window.innerWidth / devicePixelRatio > 2500) {
        // SetWidth(window* devicePixelRatio)
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);

        // SetHeight(breakPoints[0]);
        changeScaleRange(100);
      }

      await wait(200);
      setPositions({
        bottom: 20,
        right: 20,
      });
    };

    reveal();
  }, []);

  // If (isFullScreen) {
  //   return (
  //     <LazySpikeLandComponent
  //       name={room}
  //       cssText={session.css}
  //       html={session.html}
  //     />
  //   );
  // }

  if (isFullScreen) {
    return (
      <div
        css={css`
          z-index: 10;
          height: 100%;
  `}
      >
        child
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ bottom: startPositions.bottom, right: startPositions.right }}
      animate={{
        bottom,
        right,
      }}
      css={css`
            background-color:${bg};
            backdrop-filter: blur(15px);
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            z-index: 10;
            white-space: normal;
            position: ${position ? position : "fixed"};
          `}
      dragElastic={0.5}
      dragConstraints={{
        left: 0,
        right: width - 20 - width / 6,
        bottom: innerHeight - 100,
      }}
      dragMomentum={false}
      drag={!isFullScreen}
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
          {/* <span>{width}*{height}</span> */}

          <motion.div
            animate={{
              width: width * scale / devicePixelRatio,
              height: height * scale / devicePixelRatio,
              borderRadius: isFullScreen ? 0 : 8,
              // Opacity: isFullScreen ? 1 : 0.7,
            }}
            css={css`
                width: ${width * scale / devicePixelRatio};
                height: ${height * scale / devicePixelRatio};
                display: block;
                overflow: hidden;


                /* background-color: red; */
            `}
          >
            {errorText && errorText.trim() !== "" && (
              <pre
                css={css`
                    position: absolute;
                    z-index:3;
                    color: rgb(255, 240, 240);
                    padding: 24px;
                    font-size: 14pt;
                    background-color: rgb(255, 0, 0);
                    flex: 0 0 auto;
                    overflow: auto;
                    margin: 0;
                    font-family: monospace;
                    white-space: pre-wrap;
                `}
              >
                {isStable && errorText && errorText.trim()}
                {isStable && errorText && errorText.trim() !== "" &&
                  (
                    <div
                      css={css`
                          text-align: right;
                        `}
                    >
                      <Button
                        onClick={() => {
                          onRestore();
                          setErrorText("");
                        }}
                      >
                        Restore
                      </Button>
                    </div>
                  )}
              </pre>
            )}

            <motion.div
              initial={{
                transformOrigin: "0px 0px",
                width: window.innerWidth / devicePixelRatio,
                height: window.innerHeight / devicePixelRatio,
                scale: scaleRange / 100,
              }}
              animate={{
                transformOrigin: "0px 0px",

                width: width / devicePixelRatio,
                height: height / devicePixelRatio,
                scale: scaleRange / 100,
              }}
              css={css`
                  overflow:overlay;
                  overflow-y: hidden;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `}
            >
              {errorText
                ? (
                  <div
                    id="zbody"
                    css={`${session.css}`}
                    dangerouslySetInnerHTML={createMarkup(session.html)}
                  />
                )
                : (
                  <div
                    id="zbody"
                    key={session.i}
                    ref={zbody}
                    css={css`
                        height: 100%;
                      `}
                  >
                    {child}
                  </div>
                )} {
                /*  </div>
                   // {/* </div>
                    <iframe
                      frameborder="0"
                      scrolling="no"
                      css={css`
                      height: 100%;
                    `}
                      onLoad={(e) => {
                        console.log(e.target);
                        console.log(e.target.document);
                      }}
                      src={`https://spike.land/api/room/${room}/hydrated`}
                    /> */
              }
            </motion.div>
          </motion.div>
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
        </div>

        <div
          css={css`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              `}
        >
          <Fab
            key="fullscreen"
            onClick={() => {
              setFullScreen(true);
            }}
          >
            <FullscreenIcon key="fs" />
          </Fab>

          <QRButton url={qrUrl} key="QRButton" />

          <Fab
            key="Share"
            onClick={() => {
              onShare();
            }}
          >
            <Share />
          </Fab>
        </div>
      </div>
    </motion.div>
  );
};

function createMarkup(__html: string) {
  return { __html };
}

// function resizeIframe(obj) {
//   obj.style.height = obj.contentWindow.document.documentElement.scrollHeight +
//     "px";
// }``
