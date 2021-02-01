import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import * as Motion from "framer-motion";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { css, Global, jsx } from "@emotion/react";

import { DraggableWindow } from "./DraggableWindow";
import { QR } from "./Qr";

export { DraggableWindow };
export { QR };
export { React };
export { Fragment };
export { Motion };

export const { AnimateSharedLayout } = Motion;
export const { motion } = Motion;

export { jsx };
export { css };
export { Global };

export const render = (
  el: EmotionJSX.Element,
  container: HTMLElement,
) => {
  ReactDOM.render(jsx(Fragment, { children: el }), container);
  return () => ReactDOM.unmountComponentAtNode(container);
};

export default React;
