import {
  Emotion,
  createEmotionProps,
  hasOwnProperty,
  require_extends,
  require_hoist_non_react_statics_cjs
} from "./chunk-TH6O3V5L.mjs";
import {
  e
} from "./chunk-OJOY736T.mjs";
import {
  __toESM,
  init_define_process
} from "./chunk-VRTUUBI3.mjs";

// ../../.yarn/__virtual__/@emotion-react-virtual-18b5205166/0/global/cache/@emotion-react-npm-11.10.0-06b9abb1e2-9.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js
init_define_process();
var import_extends = __toESM(require_extends());
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
function jsx(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return e(type, props, key);
  }
  return e(Emotion, createEmotionProps(type, props), key);
}
function jsxs(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return e(type, props, key);
  }
  return e(Emotion, createEmotionProps(type, props), key);
}

export {
  jsx,
  jsxs
};
