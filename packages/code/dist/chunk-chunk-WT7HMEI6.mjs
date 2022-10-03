import {
  require_emotion_cache_cjs,
  require_emotion_element_20108edd_cjs_prod,
  require_emotion_react_isolated_hnrs_cjs_prod,
  require_emotion_serialize_cjs,
  require_emotion_use_insertion_effect_with_fallbacks_cjs,
  require_emotion_utils_cjs,
  require_emotion_weak_memoize_cjs,
  require_extends,
  require_hoist_non_react_statics_cjs
} from "./chunk-chunk-MCYZOQUX.mjs";
import {
  init_react_preact,
  react_preact_exports
} from "./chunk-chunk-RS7EL3QA.mjs";
import {
  __commonJS,
  __toCommonJS,
  init_define_process
} from "./chunk-chunk-MYDWED46.mjs";

// ../../.yarn/__virtual__/@emotion-react-virtual-8e1a93edd4/4/Users/z/.yarn/berry/cache/@emotion-react-npm-11.10.4-00a955a9fe-9.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.prod.js
var require_emotion_react_jsx_runtime_cjs_prod = __commonJS({
  "../../.yarn/__virtual__/@emotion-react-virtual-8e1a93edd4/4/Users/z/.yarn/berry/cache/@emotion-react-npm-11.10.4-00a955a9fe-9.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.prod.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    init_react_preact();
    require_emotion_cache_cjs();
    var emotionElement = require_emotion_element_20108edd_cjs_prod();
    require_extends();
    require_emotion_weak_memoize_cjs();
    require_hoist_non_react_statics_cjs();
    require_emotion_react_isolated_hnrs_cjs_prod();
    require_emotion_utils_cjs();
    require_emotion_serialize_cjs();
    require_emotion_use_insertion_effect_with_fallbacks_cjs();
    var ReactJSXRuntime = (init_react_preact(), __toCommonJS(react_preact_exports));
    var Fragment = ReactJSXRuntime.Fragment;
    function jsx(type, props, key) {
      if (!emotionElement.hasOwnProperty.call(props, "css")) {
        return ReactJSXRuntime.jsx(type, props, key);
      }
      return ReactJSXRuntime.jsx(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
    }
    function jsxs(type, props, key) {
      if (!emotionElement.hasOwnProperty.call(props, "css")) {
        return ReactJSXRuntime.jsxs(type, props, key);
      }
      return ReactJSXRuntime.jsxs(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
    }
    exports.Fragment = Fragment;
    exports.jsx = jsx;
    exports.jsxs = jsxs;
  }
});

// ../../.yarn/__virtual__/@emotion-react-virtual-8e1a93edd4/4/Users/z/.yarn/berry/cache/@emotion-react-npm-11.10.4-00a955a9fe-9.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js
var require_emotion_react_jsx_runtime_cjs = __commonJS({
  "../../.yarn/__virtual__/@emotion-react-virtual-8e1a93edd4/4/Users/z/.yarn/berry/cache/@emotion-react-npm-11.10.4-00a955a9fe-9.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"(exports, module) {
    "use strict";
    init_define_process();
    if (true) {
      module.exports = require_emotion_react_jsx_runtime_cjs_prod();
    } else {
      module.exports = null;
    }
  }
});

export {
  require_emotion_react_jsx_runtime_cjs
};
