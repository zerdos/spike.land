import {
  require_emotion_react_cjs,
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-DXDEURLA.mjs";
import "./chunk-SJTURW5B.mjs";
import {
  __toESM,
  init_define_process
} from "./chunk-T3CEAVR4.mjs";

// emotion.ts
init_define_process();
var emotionReact = __toESM(require_emotion_react_cjs(), 1);
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var { jsx } = emotionReact;
var { css } = emotionReact;
var emotion_default = emotionReact;
var export_jsxs = import_jsx_runtime.jsxs;
export {
  css,
  emotion_default as default,
  jsx,
  export_jsxs as jsxs
};
