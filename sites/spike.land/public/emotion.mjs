import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-HZNUKSYZ.mjs";
import "./chunk-DKHFQNQ5.mjs";
import "./chunk-NPH2DM7G.mjs";
import {
  __toESM,
  init_define_process
} from "./chunk-T3CEAVR4.mjs";

// emotion.ts
init_define_process();
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
window.EmotionReact = window.EmotionReact || (await import("./emotion-react.cjs-MXDF5FKQ.mjs")).default;
var { jsx } = window.EmotionReact;
var { css } = window.EmotionReact;
var emotion_default = window.EmotionReact;
var export_jsxs = import_jsx_runtime.jsxs;
export {
  css,
  emotion_default as default,
  jsx,
  export_jsxs as jsxs
};
