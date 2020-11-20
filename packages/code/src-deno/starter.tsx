export const starter = `import React from "react";
import ReactDOM from "react-dom";
/** @jsx jsx */
import styled from "@emotion/styled";

const Counter = () => {
  /** @jsx jsx */

import {
  css, jsx
} from "@emotion/react";

const Counter = () => {
  const [clicks, setClicks] = React.useState(0);

  return <div css={containerStyles}>
  <h1>Counter example</h1>
    <button css={buttonStyles("green")} onClick={() => setClicks(clicks - 1)}>
    -
    </button>
    {clicks}
    <button css={buttonStyles("red")} onClick={() => setClicks(clicks + 1)}>
      +
    </button>
  </div>;
};

const containerStyles = css\`
  margin: 2em;
  display: inline-block;
  min-width: 200px;
  background: white;
  border: 4px dotted red;
  border-radius: 30px;
  padding: 1rem;
\`;


const buttonStyles = (color: string) => css\`
  text-align: center;
  display: inline-block;
  border-radius: 6px;
  padding: 0.5rem 0;
  margin: 0.5rem 2rem;
  width: 4rem;
  background: \${color};
  color: white;
  border: none;
  :focus{
    outline: none;
  }
  \`;

export default Counter;

`;
