import {
  require_jsx_runtime
} from "./chunk-chunk-TLBU2EEL.mjs";
import {
  Emotion,
  createEmotionProps,
  hasOwnProperty,
  require_hoist_non_react_statics_cjs
} from "./chunk-chunk-ZR5PUSFB.mjs";
import {
  require_react
} from "./chunk-chunk-FCWF5IZB.mjs";
import {
  __export,
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// ../../node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js
var emotion_react_jsx_runtime_browser_esm_exports = {};
__export(emotion_react_jsx_runtime_browser_esm_exports, {
  Fragment: () => Fragment,
  jsx: () => jsx,
  jsxs: () => jsxs
});
init_define_process();
var import_react = __toESM(require_react());
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var Fragment = import_jsx_runtime.Fragment;
function jsx(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return (0, import_jsx_runtime.jsx)(type, props, key);
  }
  return (0, import_jsx_runtime.jsx)(Emotion, createEmotionProps(type, props), key);
}
__name(jsx, "jsx");
function jsxs(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return (0, import_jsx_runtime.jsxs)(type, props, key);
  }
  return (0, import_jsx_runtime.jsxs)(Emotion, createEmotionProps(type, props), key);
}
__name(jsxs, "jsxs");

export {
  jsx,
  jsxs,
  emotion_react_jsx_runtime_browser_esm_exports
};
