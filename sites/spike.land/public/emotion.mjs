import {
  Emotion,
  createEmotionProps,
  emotion_react_browser_esm_exports,
  hasOwnProperty,
  require_emotion_cache_cjs,
  require_emotion_serialize_cjs,
  require_emotion_utils_cjs,
  require_hoist_non_react_statics_cjs
} from "./chunk-YGLY5MDB.mjs";
import {
  __toESM,
  init_define_process
} from "./chunk-CY4CZGSG.mjs";

// emotion.ts
init_define_process();

// ../../node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js
init_define_process();
var import_cache = __toESM(require_emotion_cache_cjs());
import "/react.mjs";
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
var import_utils = __toESM(require_emotion_utils_cjs());
var import_serialize = __toESM(require_emotion_serialize_cjs());
import { Fragment as Fragment$1, jsx as jsx$1, jsxs as jsxs$1 } from "/react.mjs";
function jsxs(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return jsxs$1(type, props, key);
  }
  return jsxs$1(Emotion, createEmotionProps(type, props), key);
}

// emotion.ts
var { jsx } = emotion_react_browser_esm_exports;
var { css } = emotion_react_browser_esm_exports;
var emotion_default = emotion_react_browser_esm_exports;
export {
  css,
  emotion_default as default,
  jsx,
  jsxs
};
