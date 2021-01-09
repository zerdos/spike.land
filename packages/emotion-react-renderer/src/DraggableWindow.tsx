/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { motion } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom";

export const DraggableWindow: React.FC<{ onShare: () => void }> = ({
  onShare,
  children,
}) => {
  const [scale, changeScale] = React.useState(100);
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      css={`
            max-width: 50%;
            // background: red;
            // border: 4px solid; 
            border-radius: 8px;
            right: 20px;
            top: 20px;
            position: fixed;
            z-index: 900;
            overflow: hidden;
            overflow-y: overlay;
            border-radius: 8px;
          `}
      whileDrag={{
        scale: (scale / 100) * 1.1,
      }}
      animate={{
        scale: scale / 100,
      }}
      dragElastic={0.5}
      dragMomentum={false}
      drag={true}
    >
      <div
        css={css`
      display: block;
      width: 100%;
      text-align: right;
    `}
      >
        <span
          css={css`
          background: grey;
        color:white;
        padding: 7px;
        background: 
        font-family: Roboto;
        font-weight: 600;
      `}
        >
          <span
            css="font-size: 20px; margin: 5px"
            onClick={() => changeScale((x) => x - 10)}
          >
            -
          </span>
          <span>{scale}%</span>
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
