import {
  init_define_process
} from "./chunk-chunk-JS5E2TTE.mjs";

// js/emotionJsxRuntime.ts
init_define_process();
var JSX = {
  jsxs: (...args) => ReactJSXRuntime.jsxs(...args),
  jsx: (...args) => emotionReact.jsx(...args),
  Fragment: React.Fragment || ""
};
var { jsx, jsxs, Fragment } = JSX;
var emotionJsxRuntime_default = jsx;

export {
  jsx,
  jsxs,
  Fragment,
  emotionJsxRuntime_default
};
