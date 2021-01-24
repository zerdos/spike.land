/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { motion } from "framer-motion";
import React from "react";

const breakPoints = [640, 750, 1024, 1920];

export const DraggableWindow: React.FC<{
  onShare: () => void;
  position?: string;
}> = ({ onShare, position, children }) => {
  const [scale, changeScale] = React.useState(100);
  const [width, setWidth] = React.useState(breakPoints[0]);
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      css={`
            right: 20px;
            top: 20px;
            white-space: normal;
            position: ${position ? position : "fixed"};
            overflow: hidden;
            overflow-y: overlay;
          `}
      whileDrag={{
        scale: (scale / 100) * 1.1,
      }}
      animate={{
        scale: scale / 100,
        width: width,
      }}
      dragElastic={0.5}
      dragMomentum={false}
      drag={true}
    >
      <div
        css={css`
                display: block;
                font-family: Roboto;
                font-weight: 600;
                text-align: right;
            `}
      >
        <span
          css={css`
            color: white;
            display: inline-block;
            margin-right: 20px;
            span{
              margin: 4px
            }
        `}
        >
          {breakPoints.map((size) =>
            <span
              key={size}
              css={width === size
                ? css`
            background: green;
            padding: 7px;
            border-radius: 10px;
            font-size: 20px
          `
                : ``}
              onClick={() => setWidth(size)}
            >
              {size}px
            </span>
          )}
        </span>
        <span
          css={css`
            background: grey;
            color: white;
            padding: 7px;
        `}
        >
          <span
            css="font-size: 20px; margin: 5px"
            onClick={() => changeScale((x) => x - 10)}
          >
            -
          </span>
          <motion.span drag>{scale}%</motion.span>
          <span
            css="font-size: 20px; margin: 5px"
            onClick={() => changeScale((x) => x + 10)}
          >
            +
          </span>
        </span>

        <button
          css={buttonCss({})}
          onClick={() => {
            console.log(ref.current!.clientHeight);
            onShare();
          }}
        >
          🌎 Export
        </button>
      </div>
      <div
        css={css`  
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
           left: 10px;
           right: 10px;
           top: 10px;  
           bottom: 10px;
           box-shadow: inset 0 0 0 200px rgba(255,255,255,0.15);
           filter: blur(10px);
          }
          >div{
            background: white;
            padding:10px;
            border-radius: 12px;
            opacity: 0.9
          }
    `}
      >
        <div id="zbody" css={`margin: 8px`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const buttonCss = ({ color = "darkred", square = false }) =>
  css`
    background: ${color};
    
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-family: Roboto;
    padding: 8px 8px;
    outline: none;
    border: none; 
    margin-left: 20px;
    border-radius: 0px ${square ? 0 : 8}px 0px 0px;
`;

/* export default () => (
  <>
    <DraggableWindow onShare={() => {}}>
      <h1>
        Lorem ipsum
        dddddddddddd ccccccccccccccccccc ddddd d dddd dds
      </h1>
    </DraggableWindow>
  </>
); */
