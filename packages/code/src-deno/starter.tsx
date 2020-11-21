export const starter = `/** @jsx jsx */

import {
  css, jsx, Global
} from "@emotion/react";

import {motion} from "framer-motion";

const Counter = () => {
  const [clicks, setClicks] = React.useState(0);

  return <>
    <Global styles={css\`
    body{
        margin: 0;
        height: 100vh;
        background: khaki;
      }  
    \`} />
    <motion.div 
      css={\`
        margin: 2rem;
        display: inline-block;
        min-width: 200px;
        background: white;
        border: 4px dotted red;
        border-radius: 30px;
        padding: 2rem;
      \`}
      animate={{ scale: 1 }}
      initial={{ scale: 0.7 }} 
      transition={{ duration: 0.5 }} 
      drag
      dragConstraints={{ left: 0, right: 400, bottom: 100, top: 0 }}
      >
      <h1>Counter example</h1>
      <button css={buttonStyles("green")} onClick={() => setClicks(clicks - 1)}>
        -
    </button>
      {clicks}
      <button css={buttonStyles("red")} onClick={() => setClicks(clicks + 1)}>
        +
    </button>
    </motion.div>
  </>;
};



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

export default Counter;
`;
