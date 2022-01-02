import { useState } from "react";
/** @jsx jsx */
import { css, Global, jsx } from "@emotion/react";

const Hello = () => {
  const [color, setColor] = useState("white");

  return (
    <div
      css={css`
          color: ${color}
        `}
    >
      <h1>Hello World!</h1>
      <label>
        You can change the color:
        <input
          css={css`
              margin: 12px;
            `}
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
      </label>
    </div>
  );
};

export default () => (
  <>
    <Global
      styles={css`
        body{
          background: deeppink;
          color: white;
          padding: 0 16px;
          margin: 0;
          overflow: overlay;
        }  
    `}
    />
    <Hello />
  </>
);
