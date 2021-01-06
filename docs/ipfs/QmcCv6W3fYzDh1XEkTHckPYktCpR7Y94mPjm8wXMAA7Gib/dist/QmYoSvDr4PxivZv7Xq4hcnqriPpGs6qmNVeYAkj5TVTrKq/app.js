// @ts-nocheck
import { css, jsx, motion, React, } from "https://unpkg.com/@zedvision/emotion-react-renderer@11.4.7/dist/bundle.js";
export const DraggableWindow = ({ onShare, children, }) => {
    const [scale, changeScale] = React.useState(100);
    const ref = React.useRef(null);
    return jsx(motion.div, {
        ref: ref,
        css: `
            background: red;
            border: 4px solid red; 
            border-radius: 8px;
            right: 20px;
            top: 20px;
            position: fixed;
            z-index: 900;
            overflow: hidden;
            overflow-y: overlay;
            border-radius: 8px;
          `,
        whileDrag: {
            scale: scale / 100 * 1.1,
        },
        animate: {
            scale: scale / 100,
        },
        dragElastic: 0.5,
        dragMomentum: false,
        drag: true,
    }, jsx("div", {
        css: css `
      display: block;
      width: 100%;
      text-align: right;
      background: linear-gradient(0deg, darkred, red);
    `,
    }, jsx("span", {
        css: css `
        color:white;
        padding: 7px;
        background: 
        font-family: Roboto;
        font-weight: 600;
      `,
    }, jsx("span", {
        css: "font-size: 20px; margin: 5px",
        onClick: () => changeScale((x) => x - 10),
    }, "-"), jsx("span", null, scale, "%"), jsx("span", {
        css: "font-size: 20px; margin: 5px",
        onClick: () => changeScale((x) => x + 10),
    }, "+")), jsx("button", {
        css: buttonCss({}),
        onClick: () => {
            console.log(ref.current.clientHeight);
            onShare();
        },
    }, "\uD83C\uDF0E Export")), jsx("div", {
        css: css `  
    max-width: 500px;
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
    `,
    }, jsx("div", {
        id: "zbody",
        css: `margin: 8px`,
    }, children)));
};
const buttonCss = ({ color = "darkred", square = false, }) => css `
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
export default (() => jsx(DraggableWindow, {
    onShare: () => alert("share"),
}, jsx(Hello, null)));
const Hello = () => {
    const [name, setName] = React.useState("red");
    return jsx("div", {
        css: `color:${name}`,
    }, jsx("h1", null, "ccccccc World!"), jsx("label", null, "You can change the color:", jsx("input", {
        css: `margin: 12px`,
        value: name,
        onChange: (e) => setName(e.target.value),
    })));
};
const CounterApp = () => jsx("div", null, "Counter");
const { useState, useRef, useEffect, } = React;
