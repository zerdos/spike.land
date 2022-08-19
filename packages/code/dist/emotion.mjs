import {
  require_emotion_react_cjs,
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-3ZGYVGKO.mjs";
import "./chunk-chunk-PBGLV3HY.mjs";
import {
  __toESM,
  init_define_process
} from "./chunk-chunk-E5P5SGZK.mjs";

// emotion.ts
init_define_process();
var ea = __toESM(require_emotion_react_cjs(), 1);
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var EmotionReact = window.EmotionReact = window.EmotionReact || ea;
var { jsx } = EmotionReact;
var { css } = EmotionReact;
var emotion_default = EmotionReact;
var export_jsxs = import_jsx_runtime.jsxs;
export {
  css,
  emotion_default as default,
  jsx,
  export_jsxs as jsxs
};
