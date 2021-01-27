/** @jsx jsx */
import React from "react";

import { css, jsx } from "@emotion/react";
import { motion } from "framer-motion";
import Fab from "@material-ui/core/Fab";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import Slider from "@material-ui/core/Slider";
import CssBaseline from "@material-ui/core/CssBaseline";

const breakPoints = [640, 750, 1024, 1920];

const dragHelper = {
  drag: false,
};

interface DraggableWindowProps {
  onShare: () => void;
  position?: string;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = (
  { onShare, position, children },
) => {
  const [scale, changeScale] = React.useState(100);
  const [width, setWidth] = React.useState(breakPoints[0]);
  const ref = React.useRef<HTMLDivElement>(null);

  const marks = [
    {
      value: 30,
      label: "30%",
    },
    {
      value: 100,
      label: "100%",
    },
    {
      value: 250,
      label: "250%",
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <motion.div
        ref={ref}
        css={css`
            right: 20px;
            top: 20px;
            white-space: normal;
            position: ${position ? position : "fixed"};
          `}
        dragElastic={0.5}
        onDrag={(e) => {
          dragHelper.drag = true;
        }}
        onDragEnd={(e) => {
          dragHelper.drag = false;
        }}
        dragMomentum={false}
        drag={true}
      >
        <div
          css={css`
          background: rgb(204,204,204, 06);
          border-radius: 20px;
          display: block;
          width: 600px;
          position: absolute;
          right: 0;
          top: 0;
      `}
        >
          <div
            css={css`
                display: flex;
            `}
          >
            <ToggleButtonGroup
              value={width}
              exclusive
              onChange={(_e, newSize) => setWidth(newSize)}
            >
              {breakPoints.map((size) =>
                <ToggleButton
                  key={size}
                  value={size}
                >
                  {size}px
                </ToggleButton>
              )}
            </ToggleButtonGroup>

            <div
              css={css`
                margin-left: 40px;
                margin-right: 40px;
                vertical-align: middle;
                display: inline-block;
                width: 200px;
          `}
            >
              <Slider
                value={scale}
                onChange={(_e, v) => {
                  if (typeof v === "object") {
                    return;
                  }
                  _e.stopPropagation();
                  changeScale(v);
                }}
                step={10}
                marks={marks}
                min={30}
                max={250}
              >
                {scale}%
              </Slider>
            </div>
            <div>
            </div>

            <Fab
              variant="extended"
              onClick={() => {
                console.log(ref.current!.clientHeight);
                onShare();
              }}
            >
              Export
            </Fab>
          </div>
        </div>
        <motion.div
          animate={{
            transformOrigin: "top right",
            width,
            scale: scale / 100,
          }}
          css={css`  
            top: 60px;
            max-width: 100%;
            z-index: 10;
            position: relative;
            min-width: 300px;
            min-height: 250px;
            background: inherit;
            border-radius: 2px;
            overflow-x: hidden;
            padding: 24px;
         
          
          :after{
           content: '';
           z-index: -9;
           background: inherit; 
           position: absolute;
           left: 16px;
           right: 16px;
           top: 16px;  
           bottom: 16px;
           box-shadow: inset 0 0 0 200px rgba(255,255,255,0.35);
           filter: blur(10px);
          }
          >div{
            background: white;
            padding:10px;
            border-radius: 12px;
            opacity: 0.9;
          }
    `}
        >
          <div
            id="zbody"
            css={css`
            margin: 8px;
          `}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </React.Fragment>
  );
};
interface IRenderProps extends DraggableWindowProps {
  children: React.ReactNode;
}

export const renderDraggableWindow = (
  props: DraggableWindowProps,
  element: HTMLElement,
) =>
  render(
    <DraggableWindow {...props}>{props.children}</DraggableWindow>,
    element,
  );
