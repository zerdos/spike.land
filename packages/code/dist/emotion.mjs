import {
  _extends,
  require_emotion_cache_cjs,
  require_emotion_serialize_cjs,
  require_emotion_use_insertion_effect_with_fallbacks_cjs,
  require_emotion_utils_cjs,
  require_emotion_weak_memoize_cjs,
  require_hoist_non_react_statics_cjs
} from "./chunk-chunk-Z7VM4D37.mjs";
import {
  createContext,
  forwardRef,
  h,
  init_react_preact,
  o,
  p,
  useContext
} from "./chunk-chunk-HNTP2YLY.mjs";
import {
  __export,
  __toESM,
  init_define_process
} from "./chunk-chunk-IA5ZPNWL.mjs";

// js/emotion.ts
init_define_process();

// node_modules/@emotion/react/dist/emotion-react.worker.esm.js
var emotion_react_worker_esm_exports = {};
__export(emotion_react_worker_esm_exports, {
  CacheProvider: () => CacheProvider,
  ClassNames: () => ClassNames,
  Global: () => Global,
  ThemeContext: () => ThemeContext,
  ThemeProvider: () => ThemeProvider,
  __unsafe_useEmotionCache: () => __unsafe_useEmotionCache,
  createElement: () => jsx,
  css: () => css,
  jsx: () => jsx,
  keyframes: () => keyframes,
  useTheme: () => useTheme,
  withEmotionCache: () => withEmotionCache,
  withTheme: () => withTheme
});
init_define_process();
init_react_preact();
var import_cache2 = __toESM(require_emotion_cache_cjs());

// node_modules/@emotion/react/dist/emotion-element-4644807c.worker.esm.js
init_define_process();
init_react_preact();
var import_cache = __toESM(require_emotion_cache_cjs());
var import_weak_memoize = __toESM(require_emotion_weak_memoize_cjs());

// node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js
init_define_process();
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
var hoistNonReactStatics = function(targetComponent, sourceComponent) {
  return (0, import_hoist_non_react_statics.default)(targetComponent, sourceComponent);
};
var emotion_react_isolated_hnrs_worker_esm_default = hoistNonReactStatics;

// node_modules/@emotion/react/dist/emotion-element-4644807c.worker.esm.js
var import_utils = __toESM(require_emotion_utils_cjs());
var import_serialize = __toESM(require_emotion_serialize_cjs());
var import_use_insertion_effect_with_fallbacks = __toESM(require_emotion_use_insertion_effect_with_fallbacks_cjs());
var hasOwnProperty = {}.hasOwnProperty;
var EmotionCacheContext = createContext(
  typeof HTMLElement !== "undefined" ? (0, import_cache.default)({
    key: "css"
  }) : null
);
if (true) {
  EmotionCacheContext.displayName = "EmotionCacheContext";
}
var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return useContext(EmotionCacheContext);
};
var withEmotionCache = function withEmotionCache2(func) {
  return forwardRef(function(props, ref) {
    var cache = useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};
{
  withEmotionCache = function withEmotionCache4(func) {
    return function(props) {
      var cache = useContext(EmotionCacheContext);
      if (cache === null) {
        cache = (0, import_cache.default)({
          key: "css"
        });
        return h(EmotionCacheContext.Provider, {
          value: cache
        }, func(props, cache));
      } else {
        return func(props, cache);
      }
    };
  };
}
var ThemeContext = createContext({});
if (true) {
  ThemeContext.displayName = "EmotionThemeContext";
}
var useTheme = function useTheme2() {
  return useContext(ThemeContext);
};
var getTheme = function getTheme2(outerTheme, theme) {
  if (typeof theme === "function") {
    var mergedTheme = theme(outerTheme);
    if (mergedTheme == null || typeof mergedTheme !== "object" || Array.isArray(mergedTheme)) {
      throw new Error("[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!");
    }
    return mergedTheme;
  }
  if (theme == null || typeof theme !== "object" || Array.isArray(theme)) {
    throw new Error("[ThemeProvider] Please make your theme prop a plain object");
  }
  return _extends({}, outerTheme, theme);
};
var createCacheWithTheme = (0, import_weak_memoize.default)(function(outerTheme) {
  return (0, import_weak_memoize.default)(function(theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider2(props) {
  var theme = useContext(ThemeContext);
  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }
  return h(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || "Component";
  var render = function render2(props, ref) {
    var theme = useContext(ThemeContext);
    return h(Component, _extends({
      theme,
      ref
    }, props));
  };
  var WithTheme = forwardRef(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return emotion_react_isolated_hnrs_worker_esm_default(WithTheme, Component);
}
var getLastPart = function getLastPart2(functionName) {
  var parts = functionName.split(".");
  return parts[parts.length - 1];
};
var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine2(line) {
  var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
  if (match)
    return getLastPart(match[1]);
  match = /^([A-Za-z0-9$.]+)@/.exec(line);
  if (match)
    return getLastPart(match[1]);
  return void 0;
};
var internalReactFunctionNames = /* @__PURE__ */ new Set(["renderWithHooks", "processChild", "finishClassComponent", "renderToString"]);
var sanitizeIdentifier = function sanitizeIdentifier2(identifier) {
  return identifier.replace(/\$/g, "-");
};
var getLabelFromStackTrace = function getLabelFromStackTrace2(stackTrace) {
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
};
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__";
var createEmotionProps = function createEmotionProps2(type, props) {
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
};
var Insertion = function Insertion2(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
  (0, import_utils.registerStyles)(cache, serialized, isStringTag);
  var rules = (0, import_use_insertion_effect_with_fallbacks.useInsertionEffectAlwaysWithSyncFallback)(function() {
    return (0, import_utils.insertStyles)(cache, serialized, isStringTag);
  });
  if (rules !== void 0) {
    var _ref2;
    var serializedNames = serialized.name;
    var next = serialized.next;
    while (next !== void 0) {
      serializedNames += " " + next.name;
      next = next.next;
    }
    return h("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref2.nonce = cache.sheet.nonce, _ref2));
  }
  return null;
};
var Emotion = withEmotionCache(function(props, cache, ref) {
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
  return h(p, null, h(Insertion, {
    cache,
    serialized,
    isStringTag: typeof WrappedComponent === "string"
  }), h(WrappedComponent, newProps));
});
if (true) {
  Emotion.displayName = "EmotionCssPropInternal";
}

// node_modules/@emotion/react/dist/emotion-react.worker.esm.js
var import_weak_memoize2 = __toESM(require_emotion_weak_memoize_cjs());
var import_hoist_non_react_statics2 = __toESM(require_hoist_non_react_statics_cjs());
var import_utils2 = __toESM(require_emotion_utils_cjs());
var import_serialize2 = __toESM(require_emotion_serialize_cjs());
var import_use_insertion_effect_with_fallbacks2 = __toESM(require_emotion_use_insertion_effect_with_fallbacks_cjs());
var pkg = {
  name: "@emotion/react",
  version: "11.10.4",
  main: "dist/emotion-react.cjs.js",
  module: "dist/emotion-react.esm.js",
  browser: {
    "./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
  },
  exports: {
    ".": {
      module: {
        worker: "./dist/emotion-react.worker.esm.js",
        browser: "./dist/emotion-react.browser.esm.js",
        "default": "./dist/emotion-react.esm.js"
      },
      "default": "./dist/emotion-react.cjs.js"
    },
    "./jsx-runtime": {
      module: {
        worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
        browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
        "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
      },
      "default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
    },
    "./_isolated-hnrs": {
      module: {
        worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
        browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
        "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
      },
      "default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
    },
    "./jsx-dev-runtime": {
      module: {
        worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
        browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
        "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
      },
      "default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
    },
    "./package.json": "./package.json",
    "./types/css-prop": "./types/css-prop.d.ts",
    "./macro": "./macro.js"
  },
  types: "types/index.d.ts",
  files: [
    "src",
    "dist",
    "jsx-runtime",
    "jsx-dev-runtime",
    "_isolated-hnrs",
    "types/*.d.ts",
    "macro.js",
    "macro.d.ts",
    "macro.js.flow"
  ],
  sideEffects: false,
  author: "Emotion Contributors",
  license: "MIT",
  scripts: {
    "test:typescript": "dtslint types"
  },
  dependencies: {
    "@babel/runtime": "^7.18.3",
    "@emotion/babel-plugin": "^11.10.0",
    "@emotion/cache": "^11.10.0",
    "@emotion/serialize": "^1.1.0",
    "@emotion/use-insertion-effect-with-fallbacks": "^1.0.0",
    "@emotion/utils": "^1.2.0",
    "@emotion/weak-memoize": "^0.3.0",
    "hoist-non-react-statics": "^3.3.1"
  },
  peerDependencies: {
    "@babel/core": "^7.0.0",
    react: ">=16.8.0"
  },
  peerDependenciesMeta: {
    "@babel/core": {
      optional: true
    },
    "@types/react": {
      optional: true
    }
  },
  devDependencies: {
    "@babel/core": "^7.18.5",
    "@definitelytyped/dtslint": "0.0.112",
    "@emotion/css": "11.10.0",
    "@emotion/css-prettifier": "1.1.0",
    "@emotion/server": "11.10.0",
    "@emotion/styled": "11.10.4",
    "html-tag-names": "^1.1.2",
    react: "16.14.0",
    "svg-tag-names": "^1.1.1",
    typescript: "^4.5.5"
  },
  repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
  publishConfig: {
    access: "public"
  },
  "umd:main": "dist/emotion-react.umd.min.js",
  preconstruct: {
    entrypoints: [
      "./index.js",
      "./jsx-runtime.js",
      "./jsx-dev-runtime.js",
      "./_isolated-hnrs.js"
    ],
    umdName: "emotionReact",
    exports: {
      envConditions: [
        "browser",
        "worker"
      ],
      extra: {
        "./types/css-prop": "./types/css-prop.d.ts",
        "./macro": "./macro.js"
      }
    }
  }
};
var jsx = function jsx2(type, props) {
  var args = arguments;
  if (props == null || !hasOwnProperty.call(props, "css")) {
    return h.apply(void 0, args);
  }
  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  createElementArgArray[1] = createEmotionProps(type, props);
  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  }
  return h.apply(null, createElementArgArray);
};
var warnedAboutCssPropForGlobal = false;
var Global = withEmotionCache(function(props, cache) {
  if (!warnedAboutCssPropForGlobal && (props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }
  var styles = props.styles;
  var serialized = (0, import_serialize2.serializeStyles)([styles], void 0, useContext(ThemeContext));
  {
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
    return h("style", (_ref = {}, _ref["data-emotion"] = cache.key + "-global " + serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref));
  }
});
if (true) {
  Global.displayName = "EmotionGlobal";
}
function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return (0, import_serialize2.serializeStyles)(args);
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
          if (arg.styles !== void 0 && arg.name !== void 0) {
            console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.");
          }
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
function merge(registered, css3, className) {
  var registeredStyles = [];
  var rawClassName = (0, import_utils2.getRegisteredStyles)(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css3(registeredStyles);
}
var Insertion3 = function Insertion4(_ref) {
  var cache = _ref.cache, serializedArr = _ref.serializedArr;
  var rules = (0, import_use_insertion_effect_with_fallbacks2.useInsertionEffectAlwaysWithSyncFallback)(function() {
    var rules2 = "";
    for (var i = 0; i < serializedArr.length; i++) {
      var res = (0, import_utils2.insertStyles)(cache, serializedArr[i], false);
      if (res !== void 0) {
        rules2 += res;
      }
    }
    {
      return rules2;
    }
  });
  if (rules.length !== 0) {
    var _ref2;
    return h("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedArr.map(function(serialized) {
      return serialized.name;
    }).join(" "), _ref2.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref2.nonce = cache.sheet.nonce, _ref2));
  }
  return null;
};
var ClassNames = withEmotionCache(function(props, cache) {
  var hasRendered = false;
  var serializedArr = [];
  var css3 = function css4() {
    if (hasRendered && true) {
      throw new Error("css can only be used during render");
    }
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var serialized = (0, import_serialize2.serializeStyles)(args, cache.registered);
    serializedArr.push(serialized);
    (0, import_utils2.registerStyles)(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };
  var cx = function cx2() {
    if (hasRendered && true) {
      throw new Error("cx can only be used during render");
    }
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return merge(cache.registered, css3, classnames(args));
  };
  var content = {
    css: css3,
    cx,
    theme: useContext(ThemeContext)
  };
  var ele = props.children(content);
  hasRendered = true;
  return h(p, null, h(Insertion3, {
    cache,
    serializedArr
  }), ele);
});
if (true) {
  ClassNames.displayName = "EmotionClassNames";
}
if (true) {
  isBrowser = false;
  isJest = typeof jest !== "undefined";
  if (isBrowser && !isJest) {
    globalContext = typeof globalThis !== "undefined" ? globalThis : isBrowser ? window : globalThis;
    globalKey = "__EMOTION_REACT_" + pkg.version.split(".")[0] + "__";
    if (globalContext[globalKey]) {
      console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.");
    }
    globalContext[globalKey] = true;
  }
}
var isBrowser;
var isJest;
var globalContext;
var globalKey;

// js/emotionJsxRuntime.ts
init_define_process();
init_react_preact();
var import_cache3 = __toESM(require_emotion_cache_cjs(), 1);

// node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js
init_define_process();

// js/emotionJsxRuntime.ts
var import_hoist_non_react_statics4 = __toESM(require_hoist_non_react_statics_cjs(), 1);

// node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js
init_define_process();
var import_hoist_non_react_statics3 = __toESM(require_hoist_non_react_statics_cjs());
var hoistNonReactStatics2 = function(targetComponent, sourceComponent) {
  return (0, import_hoist_non_react_statics3.default)(targetComponent, sourceComponent);
};
var emotion_react_isolated_hnrs_browser_esm_default = hoistNonReactStatics2;

// js/emotionJsxRuntime.ts
var import_utils3 = __toESM(require_emotion_utils_cjs(), 1);
var import_serialize3 = __toESM(require_emotion_serialize_cjs(), 1);
var import_use_insertion_effect_with_fallbacks3 = __toESM(require_emotion_use_insertion_effect_with_fallbacks_cjs(), 1);
init_react_preact();
var Fragment = p;
function jsx3(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return o(type, props, key);
  }
  return o(Emotion, createEmotionProps(type, props), key);
}
function jsxs(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return o(type, props, key);
  }
  return o(Emotion, createEmotionProps(type, props), key);
}

// js/emotion.ts
window.EmotionReact = window.EmotionReact || emotion_react_worker_esm_exports;
var { EmotionReact } = window;
var { css: css2 } = EmotionReact;
var { CacheProvider: CacheProvider2 } = EmotionReact;
var { ClassNames: ClassNames2 } = EmotionReact;
var { Global: Global2 } = EmotionReact;
var { ThemeContext: ThemeContext2 } = EmotionReact;
var { ThemeProvider: ThemeProvider3 } = EmotionReact;
var { keyframes: keyframes3 } = EmotionReact;
var { useTheme: useTheme3 } = EmotionReact;
var { withEmotionCache: withEmotionCache3 } = EmotionReact;
var { withTheme: withTheme2 } = EmotionReact;
var emotion_default = EmotionReact;
export {
  CacheProvider2 as CacheProvider,
  ClassNames2 as ClassNames,
  Fragment,
  Global2 as Global,
  ThemeContext2 as ThemeContext,
  ThemeProvider3 as ThemeProvider,
  css2 as css,
  emotion_default as default,
  emotion_react_isolated_hnrs_browser_esm_default as hoistNonReactStatics,
  jsx3 as jsx,
  jsxs,
  keyframes3 as keyframes,
  useTheme3 as useTheme,
  withEmotionCache3 as withEmotionCache,
  withTheme2 as withTheme
};
