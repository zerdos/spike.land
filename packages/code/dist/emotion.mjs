import {
  require_emotion_cache_cjs,
  require_emotion_element_ae8cc4ba_cjs_dev,
  require_emotion_react_cjs,
  require_emotion_react_isolated_hnrs_cjs_dev,
  require_emotion_react_jsx_runtime_cjs,
  require_emotion_serialize_cjs,
  require_emotion_utils_cjs,
  require_emotion_weak_memoize_cjs,
  require_extends,
  require_hoist_non_react_statics_cjs
} from "./chunk-chunk-TLUBWX2U.mjs";
import {
  e,
  init_react_preact,
  react_preact_exports
} from "./chunk-chunk-3G2TDKOV.mjs";
import {
  __commonJS,
  __export,
  __reExport,
  __toCommonJS,
  __toESM,
  init_define_process
} from "./chunk-chunk-NZ5A3UGY.mjs";

// .yarn/__virtual__/@emotion-react-virtual-bd3d152174/3/.yarn/global/cache/@emotion-react-npm-11.10.0-06b9abb1e2-9.zip/node_modules/@emotion/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js
var require_emotion_react_jsx_dev_runtime_cjs_dev = __commonJS({
  ".yarn/__virtual__/@emotion-react-virtual-bd3d152174/3/.yarn/global/cache/@emotion-react-npm-11.10.0-06b9abb1e2-9.zip/node_modules/@emotion/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    init_react_preact();
    require_emotion_cache_cjs();
    var emotionElement = require_emotion_element_ae8cc4ba_cjs_dev();
    require_extends();
    require_emotion_weak_memoize_cjs();
    require_hoist_non_react_statics_cjs();
    require_emotion_react_isolated_hnrs_cjs_dev();
    require_emotion_utils_cjs();
    require_emotion_serialize_cjs();
    var ReactJSXRuntimeDev = (init_react_preact(), __toCommonJS(react_preact_exports));
    var Fragment = ReactJSXRuntimeDev.Fragment;
    function jsxDEV(type, props, key, isStaticChildren, source, self) {
      if (!emotionElement.hasOwnProperty.call(props, "css")) {
        return ReactJSXRuntimeDev.jsxDEV(type, props, key, isStaticChildren, source, self);
      }
      return ReactJSXRuntimeDev.jsxDEV(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key, isStaticChildren, source, self);
    }
    exports.Fragment = Fragment;
    exports.jsxDEV = jsxDEV;
  }
});

// .yarn/__virtual__/@emotion-react-virtual-bd3d152174/3/.yarn/global/cache/@emotion-react-npm-11.10.0-06b9abb1e2-9.zip/node_modules/@emotion/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js
var require_emotion_react_jsx_dev_runtime_cjs = __commonJS({
  ".yarn/__virtual__/@emotion-react-virtual-bd3d152174/3/.yarn/global/cache/@emotion-react-npm-11.10.0-06b9abb1e2-9.zip/node_modules/@emotion/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"(exports, module) {
    "use strict";
    init_define_process();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_react_jsx_dev_runtime_cjs_dev();
    }
  }
});

// js/emotion.ts
var emotion_exports = {};
__export(emotion_exports, {
  CacheProvider: () => CacheProvider,
  ClassNames: () => ClassNames,
  Global: () => Global,
  ThemeContext: () => ThemeContext,
  ThemeProvider: () => ThemeProvider,
  css: () => css,
  default: () => emotion_default,
  jsx: () => jsx,
  jsxs: () => e,
  keyframes: () => keyframes,
  useTheme: () => useTheme,
  withEmotionCache: () => withEmotionCache,
  withTheme: () => withTheme
});
init_define_process();
var ea = __toESM(require_emotion_react_cjs(), 1);
__reExport(emotion_exports, __toESM(require_emotion_react_jsx_dev_runtime_cjs(), 1));
init_react_preact();
__reExport(emotion_exports, __toESM(require_emotion_react_jsx_runtime_cjs(), 1));
var EmotionReact = window.emotionReact = window.emotionReact || ea;
var { jsx } = EmotionReact;
var { css } = EmotionReact;
var { CacheProvider } = EmotionReact;
var { ClassNames } = EmotionReact;
var { Global } = EmotionReact;
var { ThemeContext } = EmotionReact;
var { ThemeProvider } = EmotionReact;
var { keyframes } = EmotionReact;
var { useTheme } = EmotionReact;
var { withEmotionCache } = EmotionReact;
var { withTheme } = EmotionReact;
var emotion_default = EmotionReact;
export {
  CacheProvider,
  ClassNames,
  Global,
  ThemeContext,
  ThemeProvider,
  css,
  emotion_default as default,
  jsx,
  e as jsxs,
  keyframes,
  useTheme,
  withEmotionCache,
  withTheme
};
