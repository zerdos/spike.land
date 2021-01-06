import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** @jsx jsx */
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import React from 'react';
export const DraggableWindow = ({ onShare, children, }) => {
    const [scale, changeScale] = React.useState(100);
    const ref = React.useRef(null);
    return (_jsxs(motion.div, Object.assign({ ref: ref, css: `
            max-width: 50%;
            // background: red;
            // border: 4px solid; 
            border-radius: 8px;
            right: 20px;
            top: 20px;
            position: fixed;
            z-index: 900;
            overflow: hidden;
            overflow-y: overlay;
            border-radius: 8px;
          `, whileDrag: {
            scale: (scale / 100) * 1.1,
        }, animate: {
            scale: scale / 100,
        }, dragElastic: 0.5, dragMomentum: false, drag: true }, { children: [_jsxs("div", Object.assign({ css: css `
      display: block;
      width: 100%;
      text-align: right;
    ` }, { children: [_jsxs("span", Object.assign({ css: css `
          background: grey;
        color:white;
        padding: 7px;
        background: 
        font-family: Roboto;
        font-weight: 600;
      ` }, { children: [_jsx("span", Object.assign({ css: "font-size: 20px; margin: 5px", onClick: () => changeScale((x) => x - 10) }, { children: "-" }), void 0),
                            _jsxs("span", { children: [scale, "%"] }, void 0),
                            _jsx("span", Object.assign({ css: "font-size: 20px; margin: 5px", onClick: () => changeScale((x) => x + 10) }, { children: "+" }), void 0)] }), void 0),
                    _jsx("button", Object.assign({ css: buttonCss({}), onClick: () => {
                            console.log(ref.current.clientHeight);
                            onShare();
                        } }, { children: "\uD83C\uDF0E Export" }), void 0)] }), void 0),
            _jsx("div", Object.assign({ css: css `  
            max-width: 100%;
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
    ` }, { children: _jsx("div", Object.assign({ id: "zbody", css: `margin: 8px` }, { children: children }), void 0) }), void 0)] }), void 0));
};
const buttonCss = ({ color = 'darkred', square = false }) => css `
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
export default () => (_jsx(DraggableWindow, Object.assign({ onShare: () => alert('share') }, { children: _jsx(Hello, {}, void 0) }), void 0));
const Hello = () => {
    const [name, setName] = React.useState('red');
    return (_jsxs("div", Object.assign({ css: `color:${name}` }, { children: [_jsx("h1", { children: "ccccccc dddddddddddddddddddddffffffffffffffffffffffffffffffffffffff dddddddddddddddddddddd dddddddddddddddddddddddddddddddddd dddddddddddddWorld!" }, void 0),
            _jsxs("label", { children: ["You can change the color:", _jsx("input", { css: `margin: 12px`, value: name, onChange: (e) => setName(e.target.value) }, void 0)] }, void 0)] }), void 0));
};
const CounterApp = () => _jsx("div", { children: "Counter" }, void 0);
