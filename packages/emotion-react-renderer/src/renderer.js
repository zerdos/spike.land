import * as Motion from "framer-motion";
import React, { Fragment } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { css, Global, jsx } from "@emotion/react";
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
