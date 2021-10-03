import * as Motion from "framer-motion";
import React, { Fragment } from "react";
import * as ReactDOM from "react-dom";
import { css, Global, jsx } from "@emotion/react";
import { DraggableWindow } from "./DraggableWindow";
const { motion } = Motion;
const render = (el, container) => {
  const root = ReactDOM.render(jsx(Fragment, { children: el }), container);
};
var renderer_default = React;
export {
  DraggableWindow,
  Fragment,
  Global,
  Motion,
  React,
  css,
  renderer_default as default,
  jsx,
  motion,
  render
};
