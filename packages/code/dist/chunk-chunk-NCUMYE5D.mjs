import {
  require_emotion_cache_cjs,
  require_emotion_element_b63ca7c6_cjs_dev,
  require_emotion_react_isolated_hnrs_cjs_dev,
  require_emotion_serialize_cjs,
  require_emotion_use_insertion_effect_with_fallbacks_cjs,
  require_emotion_utils_cjs,
  require_emotion_weak_memoize_cjs,
  require_extends,
  require_hoist_non_react_statics_cjs,
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-chunk-5SVJH34K.mjs";
import {
  __commonJS,
  init_define_process
} from "./chunk-chunk-AIJYQNQW.mjs";

// ../../.yarn/__virtual__/react-dom-virtual-fbce32c2b9/0/global/cache/react-dom-npm-18.2.0-dd675bca1c-9.zip/node_modules/react-dom/client.js
var require_client = __commonJS({
  "../../.yarn/__virtual__/react-dom-virtual-fbce32c2b9/0/global/cache/react-dom-npm-18.2.0-dd675bca1c-9.zip/node_modules/react-dom/client.js"(exports) {
    "use strict";
    init_define_process();
    var m = require_react_dom();
    if (false) {
      exports.createRoot = m.createRoot;
      exports.hydrateRoot = m.hydrateRoot;
    } else {
      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function(c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function(c, h, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
    var i;
  }
});

// ../../.yarn/__virtual__/@emotion-react-virtual-b7da756fd5/0/global/cache/@emotion-react-npm-11.10.5-98e2cdb553-9.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.dev.js
var require_emotion_react_jsx_runtime_cjs_dev = __commonJS({
  "../../.yarn/__virtual__/@emotion-react-virtual-b7da756fd5/0/global/cache/@emotion-react-npm-11.10.5-98e2cdb553-9.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.dev.js"(exports) {
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

// ../../.yarn/__virtual__/@emotion-react-virtual-b7da756fd5/0/global/cache/@emotion-react-npm-11.10.5-98e2cdb553-9.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js
var require_emotion_react_jsx_runtime_cjs = __commonJS({
  "../../.yarn/__virtual__/@emotion-react-virtual-b7da756fd5/0/global/cache/@emotion-react-npm-11.10.5-98e2cdb553-9.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"(exports, module) {
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
  require_client,
  require_emotion_react_jsx_runtime_cjs
};
