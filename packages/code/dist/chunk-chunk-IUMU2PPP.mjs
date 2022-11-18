import {
  require_jsx_runtime
} from "./chunk-chunk-42ITZKCC.mjs";
import {
  require_emotion_element_b63ca7c6_cjs_dev,
  require_emotion_react_isolated_hnrs_cjs_dev,
  require_emotion_serialize_cjs,
  require_emotion_use_insertion_effect_with_fallbacks_cjs,
  require_emotion_utils_cjs,
  require_extends,
  require_hoist_non_react_statics_cjs
} from "./chunk-chunk-OR5G2ZVL.mjs";
import {
  require_emotion_cache_cjs,
  require_emotion_weak_memoize_cjs
} from "./chunk-chunk-BQIBPPQA.mjs";
import {
  require_react
} from "./chunk-chunk-BH3GJV4T.mjs";
import {
  __commonJS,
  __name,
  init_define_process
} from "./chunk-chunk-CIPP7HWN.mjs";

// ../../node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.dev.js
var require_emotion_react_jsx_runtime_cjs_dev = __commonJS({
  "../../node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.dev.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    require_react();
    require_emotion_cache_cjs();
    var emotionElement = require_emotion_element_b63ca7c6_cjs_dev();
    require_extends();
    require_emotion_weak_memoize_cjs();
    require_hoist_non_react_statics_cjs();
    require_emotion_react_isolated_hnrs_cjs_dev();
    require_emotion_utils_cjs();
    require_emotion_serialize_cjs();
    require_emotion_use_insertion_effect_with_fallbacks_cjs();
    var ReactJSXRuntime = require_jsx_runtime();
    var Fragment = ReactJSXRuntime.Fragment;
    function jsx(type, props, key) {
      if (!emotionElement.hasOwnProperty.call(props, "css")) {
        return ReactJSXRuntime.jsx(type, props, key);
      }
      return ReactJSXRuntime.jsx(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
    }
    __name(jsx, "jsx");
    function jsxs(type, props, key) {
      if (!emotionElement.hasOwnProperty.call(props, "css")) {
        return ReactJSXRuntime.jsxs(type, props, key);
      }
      return ReactJSXRuntime.jsxs(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
    }
    __name(jsxs, "jsxs");
    exports.Fragment = Fragment;
    exports.jsx = jsx;
    exports.jsxs = jsxs;
  }
});

// ../../node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js
var require_emotion_react_jsx_runtime_cjs = __commonJS({
  "../../node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"(exports, module) {
    "use strict";
    init_define_process();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_react_jsx_runtime_cjs_dev();
    }
  }
});

export {
  require_emotion_react_jsx_runtime_cjs
};
