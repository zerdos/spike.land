import * as Motion from "https://unpkg.com/framer-motion@3.1.1/dist/framer-motion.cjs.js";
import React, { Fragment } from "https://unpkg.com/react@17.0.1/cjs/react.production.min.js";
import { render, unmountComponentAtNode } from "https://unpkg.com/react-dom@17.0.1/cjs/react-dom.production.min.js";
import { css, Global, jsx } from "https://unpkg.com/@emotion/react@11.1.4/dist/emotion-react.browser.cjs.js";
export { React };
export { Fragment };
export { Motion };
export const { motion } = Motion;
export { jsx };
export { css };
export { Global };
export const renderEmotion = (el, container) => {
    render(jsx(Fragment, { children: el }), container);
    return () => unmountComponentAtNode(container);
};
export default React;
