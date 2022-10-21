import {
  init_define_process
} from "./chunk-chunk-JS5E2TTE.mjs";

// js/jsx.mjs
init_define_process();
var JSX = globalThis.ReactJSXRuntime || window.ReactJSXRuntime || {
  jsxs: (...args) => JSX.jsxs(...args),
  jsx: (...args) => JSX.jsx(...args),
  Fragment: React.Fragment || ""
};
var { jsx, jsxs, Fragment } = JSX;
var jsx_default = jsx;

export {
  jsx,
  jsxs,
  Fragment,
  jsx_default
};
