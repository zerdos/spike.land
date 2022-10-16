import {
  require_emotion_react_cjs
} from "./chunk-chunk-ZK3UI4DF.mjs";
import {
  init_react_preact,
  o,
  p
} from "./chunk-chunk-L3IDHZ4W.mjs";
import {
  init_define_process
} from "./chunk-chunk-WK2SDDIY.mjs";
import {
  __toESM
} from "./chunk-chunk-477FBAEY.mjs";

// js/emotionJsxRuntime.ts
init_define_process();
init_react_preact();
var import_react = __toESM(require_emotion_react_cjs(), 1);
var x = emotionJsxRuntime_default || {};
globalThis.__JSX___ = globalThis.__JSX___ || {
  Fragment: x.Fragment || p,
  jsx: x.jsx || jsx || import_react.jsx,
  jsxs: x.jsxs || jsxs || o
};
var { __JSX___ } = globalThis;
var { Fragment, jsx, jsxs } = __JSX___;
var emotionJsxRuntime_default = __JSX___;

export {
  Fragment,
  jsx,
  jsxs,
  emotionJsxRuntime_default
};
