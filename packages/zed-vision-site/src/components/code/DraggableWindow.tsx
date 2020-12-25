/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { motion } from "framer-motion";
import React from "react";

export const RenderDraggableWindow = ({ React, ReactDOM, onShare }) => {
  ReactDOM.render(
    jsx(DraggableWindow, {
      onShare,
    }),
    window.document.getElementById("dragabbleWindow"),
  );

  const DraggableWindow: React.FC<{ onShare: () => void }> = (
    { onShare },
  ) => {
    const [scale, changeScale] = React.useState(100);
    const ref = React.useRef<HTMLDivElement>(null);

    return <motion.div
      ref={ref}
      css={`
            background: red;
            max-width: 80%;
            left: 60%;
            border: 4px solid red; 
            border-radius: 8px;
          `}
      whileDrag={{
        scale: scale / 100 * 0.7,
      }}
      animate={{
        scale: scale / 100,
      }}
      dragElastic={0.5}
      dragMomentum={false}
      transition={{
        // duration: 0.5
      }}
      drag={true}
    >
      <div
        css={css`
      display: block;
      width: 100%;
      text-align: right;
      background: linear-gradient(0deg, darkred, red);
    `}
      >
        <button
          onClick={() => changeScale((x) => x - 10)}
          css={buttonCss({ color: "green", square: true })}
        >
          -
        </button>
        <div
          css={css`
        color:white;
        padding: 7px;
        display:inline;
        background: 
        font-family: Roboto;
        font-weight: 600;
        margin-left: 0px;
        margin-right: -25px;
      `}
        >
          {scale}%
        </div>
        <button
          onClick={() => changeScale((x) => x + 10)}
          css={buttonCss({ color: "green", square: true })}
        >
          +
        </button>

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
      display: block;
      overflow: hidden;
      min-width: 200px;
      padding: 30px;
      max-width: 600px;
      background: white;
      max-height: 800px;
      overflow-y: scroll;
      overflow-wrap: break-word;
      border-radius: 0px 0px 8px 8px;
    `}
        id="zbody"
      >
        DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
      </div>
    </motion.div>;
  };

  const buttonCss = ({ color = "darkred", square = false }) =>
    css`
              background: ${color};
              margin-top: -4px;
              margin-right: -4px;
              color: white;
              cursor: pointer;
              font-weight: bold;
              font-family: Roboto;
              padding: 8px 16px;
              outline: none;
              border: none; 
              margin-left: 20px;
              border-radius: 0px ${square ? 0 : 8}px 0px 0px;
            `;
};
