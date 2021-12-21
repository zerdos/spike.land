import * as Motion from "framer-motion";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { css, Global, jsx } from "@emotion/react";

import { DraggableWindow } from "./DraggableWindow.js";

export { DraggableWindow };
export { React };
export const { Fragment } = React;
export { Motion };

export const { motion } = Motion;

export { jsx };
export { css };
export { Global };

export const render = (
  el: JSX.Element,
  container: HTMLElement,
) => {
  const root = ReactDOM.render(jsx(Fragment, { children: el }), container);
};

export default React;
