import { useState } from "react";
import { Global } from "@emotion/react";

const Hello = () => {
  const [color, setColor] = useState("white");

  return (
    <div css={`
          color: ${color}
        `}>
      <h1>Hello World!</h1>
      <label>
        You can change the color:
        <input
          css={`margin: 12px`}
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
    </div>
  );
};

export default () => (
  <>
    <Global
      styles={`
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
