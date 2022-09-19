import {
  require_emotion_cache_cjs,
  require_emotion_react_cjs,
  require_emotion_serialize_cjs,
  require_emotion_use_insertion_effect_with_fallbacks_cjs,
  require_emotion_utils_cjs,
  require_emotion_weak_memoize_cjs,
  require_hoist_non_react_statics_cjs
} from "./chunk-chunk-SEOII4AH.mjs";
import {
  createContext,
  forwardRef,
  h,
  init_react_preact,
  o,
  p,
  useContext
} from "./chunk-chunk-HV73MJXZ.mjs";
import {
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-S6BTEEN4.mjs";

// js/emotion.ts
init_define_process();
var ea = __toESM(require_emotion_react_cjs(), 1);

// js/emotionJsxRuntime.ts
init_define_process();
init_react_preact();
var import_cache2 = __toESM(require_emotion_cache_cjs(), 1);

// node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js
init_define_process();
init_react_preact();
var import_cache = __toESM(require_emotion_cache_cjs());
var import_weak_memoize = __toESM(require_emotion_weak_memoize_cjs());

// node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js
init_define_process();
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
var hoistNonReactStatics = /* @__PURE__ */ __name(function(targetComponent, sourceComponent) {
  return (0, import_hoist_non_react_statics.default)(targetComponent, sourceComponent);
}, "hoistNonReactStatics");
var emotion_react_isolated_hnrs_browser_esm_default = hoistNonReactStatics;

// node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm.js
var import_utils = __toESM(require_emotion_utils_cjs());
var import_serialize = __toESM(require_emotion_serialize_cjs());
var import_use_insertion_effect_with_fallbacks = __toESM(require_emotion_use_insertion_effect_with_fallbacks_cjs());
var hasOwnProperty = {}.hasOwnProperty;
var EmotionCacheContext = /* @__PURE__ */ createContext(
  typeof HTMLElement !== "undefined" ? /* @__PURE__ */ (0, import_cache.default)({
    key: "css"
  }) : null
);
if (true) {
  EmotionCacheContext.displayName = "EmotionCacheContext";
}
var CacheProvider = EmotionCacheContext.Provider;
var withEmotionCache = /* @__PURE__ */ __name(function withEmotionCache2(func) {
  return /* @__PURE__ */ forwardRef(function(props, ref) {
    var cache = useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
}, "withEmotionCache");
var ThemeContext = /* @__PURE__ */ createContext({});
if (true) {
  ThemeContext.displayName = "EmotionThemeContext";
}
var getLastPart = /* @__PURE__ */ __name(function getLastPart2(functionName) {
  var parts = functionName.split(".");
  return parts[parts.length - 1];
}, "getLastPart");
var getFunctionNameFromStackTraceLine = /* @__PURE__ */ __name(function getFunctionNameFromStackTraceLine2(line) {
  var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
  if (match)
    return getLastPart(match[1]);
  match = /^([A-Za-z0-9$.]+)@/.exec(line);
  if (match)
    return getLastPart(match[1]);
  return void 0;
}, "getFunctionNameFromStackTraceLine");
var internalReactFunctionNames = /* @__PURE__ */ new Set(["renderWithHooks", "processChild", "finishClassComponent", "renderToString"]);
var sanitizeIdentifier = /* @__PURE__ */ __name(function sanitizeIdentifier2(identifier) {
  return identifier.replace(/\$/g, "-");
}, "sanitizeIdentifier");
var getLabelFromStackTrace = /* @__PURE__ */ __name(function getLabelFromStackTrace2(stackTrace) {
  if (!stackTrace)
    return void 0;
  var lines = stackTrace.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var functionName = getFunctionNameFromStackTraceLine(lines[i]);
    if (!functionName)
      continue;
    if (internalReactFunctionNames.has(functionName))
      break;
    if (/^[A-Z]/.test(functionName))
      return sanitizeIdentifier(functionName);
  }
  return void 0;
}, "getLabelFromStackTrace");
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__";
var createEmotionProps = /* @__PURE__ */ __name(function createEmotionProps2(type, props) {
  if (typeof props.css === "string" && props.css.indexOf(":") !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }
  newProps[typePropName] = type;
  if (!!props.css && (typeof props.css !== "object" || typeof props.css.name !== "string" || props.css.name.indexOf("-") === -1)) {
    var label = getLabelFromStackTrace(new Error().stack);
    if (label)
      newProps[labelPropName] = label;
  }
  return newProps;
}, "createEmotionProps");
var Insertion = /* @__PURE__ */ __name(function Insertion2(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
  (0, import_utils.registerStyles)(cache, serialized, isStringTag);
  var rules = (0, import_use_insertion_effect_with_fallbacks.useInsertionEffectAlwaysWithSyncFallback)(function() {
    return (0, import_utils.insertStyles)(cache, serialized, isStringTag);
  });
  return null;
}, "Insertion");
var Emotion = /* @__PURE__ */ withEmotionCache(function(props, cache, ref) {
  var cssProp = props.css;
  if (typeof cssProp === "string" && cache.registered[cssProp] !== void 0) {
    cssProp = cache.registered[cssProp];
  }
  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = "";
  if (typeof props.className === "string") {
    className = (0, import_utils.getRegisteredStyles)(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }
  var serialized = (0, import_serialize.serializeStyles)(registeredStyles, void 0, useContext(ThemeContext));
  if (serialized.name.indexOf("-") === -1) {
    var labelFromStack = props[labelPropName];
    if (labelFromStack) {
      serialized = (0, import_serialize.serializeStyles)([serialized, "label:" + labelFromStack + ";"]);
    }
  }
  className += cache.key + "-" + serialized.name;
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== "css" && key !== typePropName && key !== labelPropName) {
      newProps[key] = props[key];
    }
  }
  newProps.ref = ref;
  newProps.className = className;
  return /* @__PURE__ */ h(p, null, /* @__PURE__ */ h(Insertion, {
    cache,
    serialized,
    isStringTag: typeof WrappedComponent === "string"
  }), /* @__PURE__ */ h(WrappedComponent, newProps));
});
if (true) {
  Emotion.displayName = "EmotionCssPropInternal";
}

// js/emotionJsxRuntime.ts
var import_weak_memoize2 = __toESM(require_emotion_weak_memoize_cjs(), 1);
var import_hoist_non_react_statics2 = __toESM(require_hoist_non_react_statics_cjs(), 1);
var import_utils2 = __toESM(require_emotion_utils_cjs(), 1);
var import_serialize2 = __toESM(require_emotion_serialize_cjs(), 1);
var import_use_insertion_effect_with_fallbacks2 = __toESM(require_emotion_use_insertion_effect_with_fallbacks_cjs(), 1);
init_react_preact();
var Fragment = p;
function jsx(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return o(type, props, key);
  }
  return o(Emotion, createEmotionProps(type, props), key);
}
__name(jsx, "jsx");
function jsxs(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return o(type, props, key);
  }
  return o(Emotion, createEmotionProps(type, props), key);
}
__name(jsxs, "jsxs");

// js/emotion.ts
var EmotionReact = window.emotionReact = window.emotionReact || ea;
var { css } = EmotionReact;
var { CacheProvider: CacheProvider2 } = EmotionReact;
var { ClassNames } = EmotionReact;
var { Global } = EmotionReact;
var { ThemeContext: ThemeContext2 } = EmotionReact;
var { ThemeProvider } = EmotionReact;
var { keyframes } = EmotionReact;
var { useTheme } = EmotionReact;
var { withEmotionCache: withEmotionCache3 } = EmotionReact;
var { withTheme } = EmotionReact;
var emotion_default = EmotionReact;
export {
  CacheProvider2 as CacheProvider,
  ClassNames,
  Fragment,
  Global,
  ThemeContext2 as ThemeContext,
  ThemeProvider,
  css,
  emotion_default as default,
  emotion_react_isolated_hnrs_browser_esm_default as hoistNonReactStatics,
  jsx,
  jsxs,
  keyframes,
  useTheme,
  withEmotionCache3 as withEmotionCache,
  withTheme
};
