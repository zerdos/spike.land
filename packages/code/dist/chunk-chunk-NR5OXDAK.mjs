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

// ../../.yarn/__virtual__/@emotion-react-virtual-8e1a93edd4/4/Users/z/.yarn/berry/cache/@emotion-react-npm-11.10.4-00a955a9fe-9.zip/node_modules/@emotion/react/dist/emotion-react.cjs.prod.js
var require_emotion_react_cjs_prod = __commonJS({
  "../../.yarn/__virtual__/@emotion-react-virtual-8e1a93edd4/4/Users/z/.yarn/berry/cache/@emotion-react-npm-11.10.4-00a955a9fe-9.zip/node_modules/@emotion/react/dist/emotion-react.cjs.prod.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = (init_react_preact(), __toCommonJS(react_preact_exports));
    require_emotion_cache_cjs();
    var emotionElement = require_emotion_element_20108edd_cjs_prod();
    require_extends();
    require_emotion_weak_memoize_cjs();
    require_hoist_non_react_statics_cjs();
    require_emotion_react_isolated_hnrs_cjs_prod();
    var utils = require_emotion_utils_cjs();
    var serialize = require_emotion_serialize_cjs();
    var useInsertionEffectWithFallbacks = require_emotion_use_insertion_effect_with_fallbacks_cjs();
    var jsx = function jsx2(type, props) {
      var args = arguments;
      if (props == null || !emotionElement.hasOwnProperty.call(props, "css")) {
        return React.createElement.apply(void 0, args);
      }
      var argsLength = args.length;
      var createElementArgArray = new Array(argsLength);
      createElementArgArray[0] = emotionElement.Emotion;
      createElementArgArray[1] = emotionElement.createEmotionProps(type, props);
      for (var i = 2; i < argsLength; i++) {
        createElementArgArray[i] = args[i];
      }
      return React.createElement.apply(null, createElementArgArray);
    };
    var Global = emotionElement.withEmotionCache(function(props, cache) {
      var styles = props.styles;
      var serialized = serialize.serializeStyles([styles], void 0, React.useContext(emotionElement.ThemeContext));
      if (!emotionElement.isBrowser) {
        var _ref;
        var serializedNames = serialized.name;
        var serializedStyles = serialized.styles;
        var next = serialized.next;
        while (next !== void 0) {
          serializedNames += " " + next.name;
          serializedStyles += next.styles;
          next = next.next;
        }
        var shouldCache = cache.compat === true;
        var rules = cache.insert("", {
          name: serializedNames,
          styles: serializedStyles
        }, cache.sheet, shouldCache);
        if (shouldCache) {
          return null;
        }
        return React.createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + "-global " + serializedNames, _ref.dangerouslySetInnerHTML = {
          __html: rules
        }, _ref.nonce = cache.sheet.nonce, _ref));
      }
      var sheetRef = React.useRef();
      useInsertionEffectWithFallbacks.useInsertionEffectWithLayoutFallback(function() {
        var key = cache.key + "-global";
        var sheet = new cache.sheet.constructor({
          key,
          nonce: cache.sheet.nonce,
          container: cache.sheet.container,
          speedy: cache.sheet.isSpeedy
        });
        var rehydrating = false;
        var node = document.querySelector('style[data-emotion="' + key + " " + serialized.name + '"]');
        if (cache.sheet.tags.length) {
          sheet.before = cache.sheet.tags[0];
        }
        if (node !== null) {
          rehydrating = true;
          node.setAttribute("data-emotion", key);
          sheet.hydrate([node]);
        }
        sheetRef.current = [sheet, rehydrating];
        return function() {
          sheet.flush();
        };
      }, [cache]);
      useInsertionEffectWithFallbacks.useInsertionEffectWithLayoutFallback(function() {
        var sheetRefCurrent = sheetRef.current;
        var sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
        if (rehydrating) {
          sheetRefCurrent[1] = false;
          return;
        }
        if (serialized.next !== void 0) {
          utils.insertStyles(cache, serialized.next, true);
        }
        if (sheet.tags.length) {
          var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
          sheet.before = element;
          sheet.flush();
        }
        cache.insert("", serialized, sheet, false);
      }, [cache, serialized.name]);
      return null;
    });
    function css() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return serialize.serializeStyles(args);
    }
    var keyframes = function keyframes2() {
      var insertable = css.apply(void 0, arguments);
      var name = "animation-" + insertable.name;
      return {
        name,
        styles: "@keyframes " + name + "{" + insertable.styles + "}",
        anim: 1,
        toString: function toString() {
          return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
        }
      };
    };
    var classnames = function classnames2(args) {
      var len = args.length;
      var i = 0;
      var cls = "";
      for (; i < len; i++) {
        var arg = args[i];
        if (arg == null)
          continue;
        var toAdd = void 0;
        switch (typeof arg) {
          case "boolean":
            break;
          case "object": {
            if (Array.isArray(arg)) {
              toAdd = classnames2(arg);
            } else {
              toAdd = "";
              for (var k in arg) {
                if (arg[k] && k) {
                  toAdd && (toAdd += " ");
                  toAdd += k;
                }
              }
            }
            break;
          }
          default: {
            toAdd = arg;
          }
        }
        if (toAdd) {
          cls && (cls += " ");
          cls += toAdd;
        }
      }
      return cls;
    };
    function merge(registered, css2, className) {
      var registeredStyles = [];
      var rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);
      if (registeredStyles.length < 2) {
        return className;
      }
      return rawClassName + css2(registeredStyles);
    }
    var Insertion = function Insertion2(_ref) {
      var cache = _ref.cache, serializedArr = _ref.serializedArr;
      var rules = useInsertionEffectWithFallbacks.useInsertionEffectAlwaysWithSyncFallback(function() {
        var rules2 = "";
        for (var i = 0; i < serializedArr.length; i++) {
          var res = utils.insertStyles(cache, serializedArr[i], false);
          if (!emotionElement.isBrowser && res !== void 0) {
            rules2 += res;
          }
        }
        if (!emotionElement.isBrowser) {
          return rules2;
        }
      });
      if (!emotionElement.isBrowser && rules.length !== 0) {
        var _ref2;
        return React.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedArr.map(function(serialized) {
          return serialized.name;
        }).join(" "), _ref2.dangerouslySetInnerHTML = {
          __html: rules
        }, _ref2.nonce = cache.sheet.nonce, _ref2));
      }
      return null;
    };
    var ClassNames = emotionElement.withEmotionCache(function(props, cache) {
      var hasRendered = false;
      var serializedArr = [];
      var css2 = function css3() {
        if (hasRendered && false) {
          throw new Error("css can only be used during render");
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var serialized = serialize.serializeStyles(args, cache.registered);
        serializedArr.push(serialized);
        utils.registerStyles(cache, serialized, false);
        return cache.key + "-" + serialized.name;
      };
      var cx = function cx2() {
        if (hasRendered && false) {
          throw new Error("cx can only be used during render");
        }
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return merge(cache.registered, css2, classnames(args));
      };
      var content = {
        css: css2,
        cx,
        theme: React.useContext(emotionElement.ThemeContext)
      };
      var ele = props.children(content);
      hasRendered = true;
      return React.createElement(React.Fragment, null, React.createElement(Insertion, {
        cache,
        serializedArr
      }), ele);
    });
    exports.CacheProvider = emotionElement.CacheProvider;
    exports.ThemeContext = emotionElement.ThemeContext;
    exports.ThemeProvider = emotionElement.ThemeProvider;
    exports.__unsafe_useEmotionCache = emotionElement.__unsafe_useEmotionCache;
    exports.useTheme = emotionElement.useTheme;
    Object.defineProperty(exports, "withEmotionCache", {
      enumerable: true,
      get: function() {
        return emotionElement.withEmotionCache;
      }
    });
    exports.withTheme = emotionElement.withTheme;
    exports.ClassNames = ClassNames;
    exports.Global = Global;
    exports.createElement = jsx;
    exports.css = css;
    exports.jsx = jsx;
    exports.keyframes = keyframes;
  }
});

// ../../.yarn/__virtual__/@emotion-react-virtual-8e1a93edd4/4/Users/z/.yarn/berry/cache/@emotion-react-npm-11.10.4-00a955a9fe-9.zip/node_modules/@emotion/react/dist/emotion-react.cjs.js
var require_emotion_react_cjs = __commonJS({
  "../../.yarn/__virtual__/@emotion-react-virtual-8e1a93edd4/4/Users/z/.yarn/berry/cache/@emotion-react-npm-11.10.4-00a955a9fe-9.zip/node_modules/@emotion/react/dist/emotion-react.cjs.js"(exports, module) {
    "use strict";
    init_define_process();
    if (true) {
      module.exports = require_emotion_react_cjs_prod();
    } else {
      module.exports = null;
    }
  }
});

export {
  require_emotion_react_cjs
};
