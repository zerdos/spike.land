import {
  init_define_process
} from "./chunk-chunk-JS5E2TTE.mjs";

// js/emotionJsxRuntime.ts
init_define_process();
var JSX = globalThis.emotionReactJSXRuntime || window.emotionReactJSXRuntime || {
  jsxs: (...args) => JSX.jsxs(...args),
  jsx: (...args) => JSX.jsx(...args),
  Fragment: JSX.Fragment || ""
};
var { jsx, jsxs, Fragment } = JSX;
var emotionJsxRuntime_default = jsx;

export {
  jsx,
  jsxs,
  Fragment,
  emotionJsxRuntime_default
};
