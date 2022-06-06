/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";

import { motion } from "framer-motion";
import { QRButton } from "./Qr";

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
}

const ZBody = () => {
  const zbodyRef = useRef<HTMLDivElement>(null);

  return  <div
      id="zbody"
      ref={zbodyRef}
    />
};

export const DraggableWindow: FC<DraggableWindowProps> = (
  {
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
  const top = height - bottom;
  const ref = useRef<HTMLDivElement>(null);

  const scale = scaleRange / 100;
  const [isFullScreen, setFullScreen] = useState(true);

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
        changeScaleRange(75);
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
      setFullScreen(false);
      requestAnimationFrame(() => document.querySelector("#root")?.remove());
    };

    setTimeout(reveal, 1500); 
  }, []);

 
  return (


    <motion.div
      layoutId="modal"
      ref={ref}
      animate={isFullScreen? { padding: 0, top: 0, right: 0, left: 0, bottom: 0 
       } :{
        top: 20,
        left: "auto",
        bottom: "auto",
        width: "auto",
        height: "auto",
        padding: 8,
        right,
      }}
      css={css`
            background-color:${bg};
            backdrop-filter: blur(15px);
            border-radius: 16px;
            z-index: 10;
            white-space: normal;
            position: fixed;
          `}
          {...(isFullScreen?{drag: true, 
            dragElastic: 0.5,
            dragConstraints: { 
              left: 0,
              right: width - 20 - width / 6,
              bottom: innerHeight,
            }} :{})}
     
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
        <motion.div
          layoutId="modal"
        css={css`
        overflow: hidden;
        `}
        animate = {{
          height: isFullScreen? 0:"auto",
          width: isFullScreen? 0:"auto"
        }}
        ><ToggleButtonGroup
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
        </motion.div>
        {/* <span>{width}*{height}</span> */}

        <motion.div
            layoutId="modal"
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
            `}
        >
          <motion.div
             layoutId="modal"
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
                    height: 100%;
                    background: rgba(128,128,128.0.5);
                  } 
              `}
          >
            <ZBody />
          </motion.div>
        </motion.div>
        <motion.div
          layoutId="modal"
        css={css`
          overflow: hidden;
        `}
        animate={{height: isFullScreen? 0: "auto"}}>
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
                      width === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"
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
        </motion.div>
      </div>

      <motion.div
          layoutId="modal"
      animate= {isFullScreen? {
        height: 0,
        width: 0,
        padding: 0,

      }: {
        height: "auto",
        width: "auto",
        padding: 16
      }}
        css={css`
              display: flex;
              overflow: "hidden"
              align-items: center;          
              flex-direction: column;
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

        <QRButton
          url={`https://spike.land/live/${room}/public`}
          key={`qr-${hashCode}`}
        />

        <Fab
          key="Share"
          onClick={() => open(`https://spike.land/live/${room}/public`)}
        >
          <Share />
        </Fab>
      </motion.div>
    </div>
    </motion.div>

  );
};
