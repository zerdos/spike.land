export const starter = `import { useState } from "react";
/** @jsx jsx */
import { motion } from "framer-motion";
import { css, jsx, Global } from "@emotion/react";;

const Slider = () => {
  const [sliderValue, setSlider] = useState(32);

  return <>
  <Global styles={css\`
      body{
          margin: 0;
          background: rgb(\${sliderValue},\${255-sliderValue*4},255);
          overflow: overlay;
        }  
    \`}/>
    <input max="128"
      css={\`
        appearance: none;
        width: 100%;
        height: 40px; 
        background: rgb(\${sliderValue*2},\${255-2*sliderValue},0); 
        outline: none; 
    \`} type="range"
      value={sliderValue} step="1"
      onChangeCapture={(e) => setSlider(Number(e.currentTarget.value))}>
    </input>
    <motion.p
      animate={{ fontSize: sliderValue + \`px\` }}>
      Example when the text gets bigger...
    </motion.p>
      <motion.p animate={{fontSize:64-sliderValue+"px"}}>
        ...or smaller
    </motion.p>
  </>
}

export default () => <>
  <Slider />
</>
`;
