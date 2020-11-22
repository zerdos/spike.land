export const starter = `import { useState } from "react";
import {css, Global} from "@emotion/react";;

const Counter = () => {
  const [clicks, setClicks] = useState(0);

  return <>
      <h1>Counter example</h1>
      <button css={buttonStyles("green")} onClick={() => setClicks(clicks - 1)}>
        -
     </button>
      {clicks}
      <button css={buttonStyles("red")} onClick={() => setClicks(clicks + 1)}>
        +
    </button>
  </>
}

const buttonStyles = (color: string) => css\`
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

export default () => <>
  <Global styles={css\`
      body{
          margin: 0;
        }  
      \`}
  />
  <Counter />
</>
`;
