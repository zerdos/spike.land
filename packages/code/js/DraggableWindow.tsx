/** @jsx jsx */

/// <reference types="@emotion/react/types/css-prop" />

import { css, jsx } from "@emotion/react";
import React from "react";
import { wait } from "./wait.ts";
import type { FC } from "react";

import { Fragment, lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  Button,
  Fab,
  Phone,
  Share,
  Tablet,
  ToggleButton,
  ToggleButtonGroup,
  Tv,
} from "./vendor/mui.mjs";

import { QRButton } from "./Qr.tsx";

import { motion } from "framer-motion";

// const {motion} = Motion;

const breakPoints = [680, 768, 1920];
const breakPointHeights = [1137, 1024, 1080];

const sizes = [10, 25, 50, 75, 100];

const LazySpikeLandComponent: FC<
  { name: string; html: string; cssText: string }
> = ({ name, cssText, html }) => {
  const Sanyi = lazy(() => generator(name));
  return (
    <Suspense
      fallback={
        <div
          css={css`
      height: 100%;
      ${cssText}
    `}
          dangerouslySetInnerHTML={{ __html: html }}
        >
        </div>
      }
    >
      <Sanyi />
    </Suspense>
  );

  function generator(name: string) {
    // return import("./Qr")
    return import(`https://code.spike.land/api/room/${name}/js`);
  }
};

interface DraggableWindowProps {
  onShare: () => void;
  onRestore: (() => void);
  session: {
    i: number;
    url: string;
    html: string;
    errorText: string;
    children: any;
    css: string;
    setChild: any;
  };
  keepFullScreen: boolean;
  position?: string;
  room: string;
}

export const DraggableWindow: FC<DraggableWindowProps> = (
  { onShare, onRestore, position, session, keepFullScreen },
) => {
  const [isStable, setIsStable] = useState(false);
  const [scaleRange, changeScaleRange] = useState(100);
  // const [height, changeHeight] = useState(innerHeight);

  const [childArray, setChild] = useState([
    <LazySpikeLandComponent
      name={room}
      cssText={session.css}
      html={session.html}
    />,
  ]);

  const startPositions = { bottom: -40, right: -88 };

  session.setChild = setChild;

  const [qrUrl, setQRUrl] = useState(session.url);
  const [errorText, setErrorText] = useState("");

  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const ref = useRef<HTMLDivElement>(null);
  const zbody = useRef<HTMLDivElement>(null);

  const child = childArray[childArray.length - 1];

  // useEffect(() => {
  // window.addEventListener("resize", () => changeHeight(window.innerHeight));
  // });

  useEffect(() => {
    const handler = setInterval(async () => {
      if (errorText !== session.errorText) {
        const newErr = session.errorText;
        setErrorText(newErr);
        setIsStable(false);
        await wait(1500);
        if (session.errorText === newErr) {
          setIsStable(true);
        }
      }
      if (qrUrl !== session.url) setQRUrl(session.url);
      // setChild(session.children);
    }, 200);

    return () => clearInterval(handler);
  }, [setErrorText, setQRUrl, errorText, qrUrl]);

  const scale = scaleRange / 100;
  const [isFullScreen, setFullScreen] = useState(true);

  useEffect(() => {
    const reveal = async () => {
      const { bottom, right } = startPositions;
      if (keepFullScreen) return;
      await wait(800);
      // const root = document.getElementById("root");
      // if (root && root.remove) root.remove();
      while (!window || !window.monaco) await wait(300);
      setFullScreen(false);
      changeScaleRange(50);

      setPositions({
        bottom: window.innerHeight * 0.20,
        right: window.innerWidth * 0.20,
      });
      // changeScaleRange(75);
      // setHeight(height=> height)

      if (window.innerWidth < 600) {
        changeScaleRange(50);
        setWidth(window.innerWidth * devicePixelRatio);
        setHeight(window.innerHeight * devicePixelRatio);
      } else if (window.innerWidth < 1800) {
        setHeight(breakPointHeights[1] * devicePixelRatio);
        changeScaleRange(50);
      } else if (window.innerWidth < 2500) {
        setHeight(breakPointHeights[2] * devicePixelRatio);
        setWidth(window.innerWidth * devicePixelRatio * 0.6);
        changeScaleRange(50);
      } else if (window.innerWidth > 2500) {
        // setWidth(window* devicePixelRatio)
        setWidth(window.innerWidth * devicePixelRatio * 0.7);
        setHeight(breakPointHeights[2] * devicePixelRatio);
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

  return (
    <React.StrictMode>
      <motion.div
        ref={ref}
        initial={{ bottom: startPositions.bottom, right: startPositions.right }}
        animate={{
          bottom,
          right,
        }}
        css={css`
            background-color:rgba(92 ,92, 152, 0.8);
            backdrop-filter: blur(10px);
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
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
        drag={true}
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
              onChange={(_e, newScale) =>
                newScale && changeScaleRange(newScale)}
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
              // initial={{
              //   width: window.innerWidth,
              //   height: window.innerHeight
              // }}
              // transition={
              //   {duration: 2000}
              // }
              animate={{
                width: width * scale / devicePixelRatio,
                height: height * scale / devicePixelRatio,
                maxHeight: height * scale / devicePixelRatio,
                borderRadius: isFullScreen ? 0 : 8,
                opacity: isFullScreen ? 1 : 0.7,
              }}
              css={css`
                width: ${width * scale / devicePixelRatio};
                height: ${height * scale / devicePixelRatio};
                display: block;
                overflow: hidden;


                background-color: white;
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
                  )}
              </motion.div>
            </motion.div>
            <ToggleButtonGroup
              value={width}
              size="small"
              exclusive
              onChange={(_e, newSize) => {
                if (newSize) {
                  setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
                  setWidth(newSize);
                }
              }}
            >
              {breakPoints.map((size) => (
                <ToggleButton
                  key={size}
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
                    : size === 768
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
                    )}
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
            <QRButton url={qrUrl} />

            <Fab
              onClick={() => {
                onShare();
              }}
            >
              <Share />
            </Fab>
            <LazySpikeLandComponent name="sanyi" cssText="" html="" />
          </div>
        </div>
      </motion.div>
    </React.StrictMode>
  );
};

function createMarkup(__html: string) {
  return { __html };
}
