export const starter = `import { useState } from "react";
/** @jsx jsx */
import { css, jsx, Global } from "@emotion/react";

const Hello = () => {
  const [name, setName] = useState(0);

  return <div>
    <h1>
      Hello {name}! 
    </h1>
    <input value={name} onChange={(e)=>setName(e.target.value)} /> 
  </div>
}

export default () => <>
  <Global styles={css\`
      body{
          margin: 0;
          overflow: overlay;
        }  
    \`}/>
  <Slider />
</>
`;
