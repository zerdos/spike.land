import {
  hashCode,
  mST,
  md5,
  patchSync
} from "./chunk-chunk-YXQWNFHK.mjs";
import {
  Fragment,
  css,
  jsx,
  jsxs
} from "./chunk-chunk-GMLEY2ZM.mjs";
import {
  S2,
  _n,
  useEffect,
  useRef,
  useState
} from "./chunk-chunk-NCXKQ5D6.mjs";
import {
  init_define_process
} from "./chunk-chunk-VOIE2EHU.mjs";
import {
  __commonJS,
  __toESM
} from "./chunk-chunk-VTSDAELY.mjs";

// ../../.yarn/global/cache/is-callable-npm-1.2.7-808a303e61-9.zip/node_modules/is-callable/index.js
var require_is_callable = __commonJS({
  "../../.yarn/global/cache/is-callable-npm-1.2.7-808a303e61-9.zip/node_modules/is-callable/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var fnToStr = Function.prototype.toString;
    var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
    var badArrayLike;
    var isCallableMarker;
    if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
      try {
        badArrayLike = Object.defineProperty({}, "length", {
          get: function() {
            throw isCallableMarker;
          }
        });
        isCallableMarker = {};
        reflectApply(function() {
          throw 42;
        }, null, badArrayLike);
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null;
        }
      }
    } else {
      reflectApply = null;
    }
    var constructorRegex = /^\s*class\b/;
    var isES6ClassFn = function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    };
    var tryFunctionObject = function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = function isDocumentDotAll() {
      return false;
    };
    if (typeof document === "object") {
      all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        };
      }
    }
    var all;
    module.exports = reflectApply ? function isCallable3(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      try {
        reflectApply(value, null, badArrayLike);
      } catch (e) {
        if (e !== isCallableMarker) {
          return false;
        }
      }
      return !isES6ClassFn(value) && tryFunctionObject(value);
    } : function isCallable3(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      if (isES6ClassFn(value)) {
        return false;
      }
      var strClass = toStr.call(value);
      if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
      }
      return tryFunctionObject(value);
    };
  }
});

// js/renderToString.tsx
init_define_process();

// js/starter.tsx
init_define_process();

// js/ErrorBoundary.tsx
init_define_process();
var ErrorBoundary = class extends _n.Component {
  constructor(props) {
    super(props);
    this.state = { error: void 0, errorInfo: void 0 };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }
  render() {
    if (this.state.errorInfo) {
      return jsxs("div", {
        children: [
          jsx("h2", {
            children: "Something went wrong."
          }),
          jsxs("details", {
            style: { whiteSpace: "pre-wrap" },
            children: [
              this.state.error && this.state.error.toString(),
              jsx("br", {}),
              this.state.errorInfo.componentStack
            ]
          })
        ]
      });
    }
    return this.props.children || jsx(Fragment, {});
  }
};
var ErrorBoundary_default = ErrorBoundary;

// js/starter.tsx
var import_is_callable = __toESM(require_is_callable(), 1);
var renderFromString = null;
var createCache = null;
var CacheProvider = null;
async function importShim(scr) {
  if (!document.scripts) {
    throw new Error("document.scripts");
  }
  const scripts = Array.from(document.scripts);
  const imap = scripts.find((s) => s.type === "importmap");
  if (!imap) {
    throw new Error("no imap");
  }
  await import("./chunk-es-module-shims-DQZ7ESW3.mjs");
  await window.importShim.addImportMap(
    JSON.parse(
      imap.innerText
    )
  );
  importShim = window.importShim;
  return importShim(scr);
}
globalThis.apps = globalThis.apps || {};
var apps = globalThis.apps || {};
var render = {};
var AutoUpdateApp = ({ hash, codeSpace }) => {
  const [md5Hash, setMdHash] = useState(md5(mST().transpiled).slice(0, 8));
  useEffect(() => {
    const newHash = md5(mST().transpiled).slice(0, 8);
    if (newHash !== md5Hash) {
      setMdHash(newHash);
    }
  }, [hash]);
  useEffect(() => {
    const newHash = md5(mST().transpiled).slice(0, 8);
    if (newHash !== md5Hash)
      return;
    if (!renderFromString)
      return;
    render[md5Hash] = render[md5Hash] || renderFromString(codeSpace, hash);
    const { html, css: css2 } = render[md5Hash];
    if (html && css2) {
      patchSync({ ...mST(), html, css: css2 });
    } else
      delete render[md5Hash];
  }, [md5Hash]);
  const ref = useRef(null);
  const transpiled = mST().transpiled;
  const App = apps[md5(transpiled).slice(0, 8)];
  return jsx(ErrorBoundary_default, {
    ref,
    children: jsx("div", {
      style: { height: "100%" },
      id: `${codeSpace}-${md5Hash}`,
      children: jsx(App, {})
    })
  }, md5Hash);
};
var Emotion = null;
var myCache = null;
async function appFactory(transpiled = "") {
  if (Emotion === null) {
    Emotion = await importShim("@emotion/react");
    renderFromString = (await importShim("/renderToString.mjs")).renderFromString;
    createCache = Emotion.cache.default;
    CacheProvider = Emotion.CacheProvider;
    myCache = createCache({
      key: "z"
    });
  }
  const trp = transpiled.length > 0 ? transpiled : mST().transpiled;
  const hash = md5(trp).slice(0, 8);
  if (!apps[hash]) {
    try {
      const App = (await importShim(createJsBlob(trp))).default;
      if (CacheProvider === null || myCache === null) {
        return () => jsx("h1", {
          children: "error"
        });
      }
      if ((0, import_is_callable.default)(App)) {
        apps[hash] = Emotion.withEmotionCache(App);
      } else
        throw new Error("the default export is not a function!");
    } catch (error) {
      if (error instanceof SyntaxError) {
        const name = error.name;
        const message = error.message;
        apps[hash] = () => jsxs("div", {
          css: css`
        background-color: orange;
        `,
          children: [
            jsx("h1", {
              children: "Syntax Error"
            }),
            jsxs("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            jsx("p", {
              children: JSON.stringify({ err: error })
            })
          ]
        });
      } else if (error instanceof Error) {
        const name = error.name;
        const message = error.message;
        apps[hash] = () => jsxs("div", {
          css: css`
						background-color: orange;
						`,
          children: [
            jsx("h1", {
              children: "Syntax Error"
            }),
            jsxs("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            jsx("p", {
              children: JSON.stringify({ err: error })
            })
          ]
        });
      } else {
        apps[hash] = () => jsx("div", {
          css: css`
        background-color: orange;
      `,
          children: jsxs("h1", {
            children: [
              "Unknown Error: $",
              hash
            ]
          })
        });
      }
    }
  }
  return apps[hash];
}
function createJsBlob(code, fileName = "index.mjs") {
  const file = new File([code], fileName, {
    type: "application/javascript",
    lastModified: Date.now()
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}

// js/renderToString.tsx
var import_is_callable2 = __toESM(require_is_callable(), 1);
var render2 = async (transpiled, codeSpace) => {
  var _a;
  const md5hash = md5(transpiled).slice(0, 8);
  const App = await appFactory(transpiled);
  if ((0, import_is_callable2.default)(App)) {
    const html = S2(jsx(App, {}));
    const css2 = extractCritical22(html);
    const globalCss = (_a = document.querySelector("style[data-emotion=css-global]")) == null ? void 0 : _a.innerHTML;
    return {
      html: `<div id="${codeSpace}-${md5hash}" style="height:100%">
    ${(globalCss ? `<style>${globalCss}</style>` : ``) + html}</div>`,
      css: css2
    };
  } else
    return { html: null, css: null };
};
var renderFromString2 = (codeSpace, hash) => {
  var _a, _b;
  const md5hash = md5(mST().transpiled).slice(0, 8);
  if (hash !== hashCode()) {
    return { html: null, css: null };
  }
  const html = (_a = document.getElementById(`${codeSpace}-${md5hash}`)) == null ? void 0 : _a.innerHTML;
  const css2 = html ? extractCritical22(html) : "";
  const globalCss = (_b = document.querySelector("style[data-emotion=css-global]")) == null ? void 0 : _b.innerHTML;
  return {
    html: `<div id="${codeSpace}-${md5hash}" style="height:100%">
      ${(globalCss ? `<style>${globalCss}</style>` : ``) + html}</div>`,
    css: css2
  };
};
var extractCritical22 = (html) => {
  try {
    const rules = {};
    for (const i in document.styleSheets) {
      let yesFromNow = false;
      const styleSheet = document.styleSheets[i];
      if (styleSheet == null ? void 0 : styleSheet.cssRules) {
        for (const rule of Array.from(styleSheet.cssRules)) {
          if (yesFromNow || rule && rule.cssText && rule.cssText.startsWith(".css-")) {
            const selector = rule.cssText.slice(1, 9);
            const selectorText = selector;
            if (!rules[selector] && html.includes(selector) && !rule.cssText.slice(10).includes(".css-")) {
              yesFromNow = true;
              rules[selectorText] = rule.cssText;
            }
          }
        }
      }
    }
    return Object.keys(rules).map((r) => rules[r]).join(" ");
  } catch (e) {
    console.error("no css");
    return "";
  }
};

export {
  AutoUpdateApp,
  appFactory,
  render2 as render,
  renderFromString2 as renderFromString
};
