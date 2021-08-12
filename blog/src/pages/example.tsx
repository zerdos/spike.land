/** @jsx jsx */

import React, { useState } from "react";
import { css, Global, jsx } from "@emotion/react";

const Slider = () => {
  const steps = 128;
  const [sliderValue, setSlider] = useState(steps / 2);
  return (
    <>
      <input
        max={steps}
        css={css`
        appearance: none;
        width: 100%;
        height: 40px; 
        background: rgb(${255 / steps * sliderValue} ${255 / steps *
          (steps - sliderValue)} 0); 
        outline: none; 
    `}
        type="range"
        aria-label="font size changer"
        value={sliderValue}
        step="1"
        onChangeCapture={(e) => setSlider(Number(e.currentTarget.value))}
      >
      </input>
      <p
        css={css`
        font-size: ${72 / steps * sliderValue}px
        `}
      >
        Example when the text gets bigger...
      </p>
      <p
        css={css`
        font-size: ${72 / steps * (steps - sliderValue)}px
        `}
      >
        ...or smaller
      </p>
    </>
  );
};

export default () =>
  (
    <>
      <Global
        styles={css`
      body{
          margin: 0;
          overflow: overlay;
        }  
    `}
      />
      <Slider />
    </>
  );
