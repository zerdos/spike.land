import {
  emotionCache_default
} from "./chunk-chunk-TIL35SAU.mjs";
import {
  require_emotion_react_cjs
} from "./chunk-chunk-CTKH5FCC.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-MYCITQ4M.mjs";
import {
  hashCode,
  mST,
  md5,
  onSessionUpdate
} from "./chunk-chunk-LYLXMEXZ.mjs";
import {
  require_react
} from "./chunk-chunk-UX3KX3KY.mjs";
import {
  __commonJS,
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// ../../.yarn/__virtual__/react-error-boundary-virtual-8f70cc21a5/0/global/cache/react-error-boundary-npm-3.1.4-2310dba89e-9.zip/node_modules/react-error-boundary/dist/react-error-boundary.umd.js
var require_react_error_boundary_umd = __commonJS({
  "../../.yarn/__virtual__/react-error-boundary-virtual-8f70cc21a5/0/global/cache/react-error-boundary-npm-3.1.4-2310dba89e-9.zip/node_modules/react-error-boundary/dist/react-error-boundary.umd.js"(exports, module) {
    init_define_process();
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_react()) : typeof define === "function" && define.amd ? define(["exports", "react"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.ReactErrorBoundary = {}, global.React));
    })(exports, function(exports2, React) {
      "use strict";
      function _interopNamespace(e) {
        if (e && e.__esModule)
          return e;
        var n = /* @__PURE__ */ Object.create(null);
        if (e) {
          Object.keys(e).forEach(function(k) {
            if (k !== "default") {
              var d = Object.getOwnPropertyDescriptor(e, k);
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: function() {
                  return e[k];
                }
              });
            }
          });
        }
        n["default"] = e;
        return Object.freeze(n);
      }
      __name(_interopNamespace, "_interopNamespace");
      var React__namespace = /* @__PURE__ */ _interopNamespace(React);
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        }, "_setPrototypeOf");
        return _setPrototypeOf(o, p);
      }
      __name(_setPrototypeOf, "_setPrototypeOf");
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        _setPrototypeOf(subClass, superClass);
      }
      __name(_inheritsLoose, "_inheritsLoose");
      var changedArray = /* @__PURE__ */ __name(function changedArray2(a, b) {
        if (a === void 0) {
          a = [];
        }
        if (b === void 0) {
          b = [];
        }
        return a.length !== b.length || a.some(function(item, index) {
          return !Object.is(item, b[index]);
        });
      }, "changedArray");
      var initialState = {
        error: null
      };
      var ErrorBoundary2 = /* @__PURE__ */ function(_React$Component) {
        _inheritsLoose(ErrorBoundary3, _React$Component);
        function ErrorBoundary3() {
          var _this;
          for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
            _args[_key] = arguments[_key];
          }
          _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;
          _this.state = initialState;
          _this.resetErrorBoundary = function() {
            var _this$props;
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            _this.props.onReset == null ? void 0 : (_this$props = _this.props).onReset.apply(_this$props, args);
            _this.reset();
          };
          return _this;
        }
        __name(ErrorBoundary3, "ErrorBoundary");
        ErrorBoundary3.getDerivedStateFromError = /* @__PURE__ */ __name(function getDerivedStateFromError(error) {
          return {
            error
          };
        }, "getDerivedStateFromError");
        var _proto = ErrorBoundary3.prototype;
        _proto.reset = /* @__PURE__ */ __name(function reset() {
          this.setState(initialState);
        }, "reset");
        _proto.componentDidCatch = /* @__PURE__ */ __name(function componentDidCatch(error, info) {
          var _this$props$onError, _this$props2;
          (_this$props$onError = (_this$props2 = this.props).onError) == null ? void 0 : _this$props$onError.call(_this$props2, error, info);
        }, "componentDidCatch");
        _proto.componentDidUpdate = /* @__PURE__ */ __name(function componentDidUpdate(prevProps, prevState) {
          var error = this.state.error;
          var resetKeys = this.props.resetKeys;
          if (error !== null && prevState.error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
            var _this$props$onResetKe, _this$props3;
            (_this$props$onResetKe = (_this$props3 = this.props).onResetKeysChange) == null ? void 0 : _this$props$onResetKe.call(_this$props3, prevProps.resetKeys, resetKeys);
            this.reset();
          }
        }, "componentDidUpdate");
        _proto.render = /* @__PURE__ */ __name(function render() {
          var error = this.state.error;
          var _this$props4 = this.props, fallbackRender = _this$props4.fallbackRender, FallbackComponent = _this$props4.FallbackComponent, fallback = _this$props4.fallback;
          if (error !== null) {
            var _props = {
              error,
              resetErrorBoundary: this.resetErrorBoundary
            };
            if (/* @__PURE__ */ React__namespace.isValidElement(fallback)) {
              return fallback;
            } else if (typeof fallbackRender === "function") {
              return fallbackRender(_props);
            } else if (FallbackComponent) {
              return /* @__PURE__ */ React__namespace.createElement(FallbackComponent, _props);
            } else {
              throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop");
            }
          }
          return this.props.children;
        }, "render");
        return ErrorBoundary3;
      }(React__namespace.Component);
      function withErrorBoundary(Component, errorBoundaryProps) {
        var Wrapped = /* @__PURE__ */ __name(function Wrapped2(props) {
          return /* @__PURE__ */ React__namespace.createElement(ErrorBoundary2, errorBoundaryProps, /* @__PURE__ */ React__namespace.createElement(Component, props));
        }, "Wrapped");
        var name = Component.displayName || Component.name || "Unknown";
        Wrapped.displayName = "withErrorBoundary(" + name + ")";
        return Wrapped;
      }
      __name(withErrorBoundary, "withErrorBoundary");
      function useErrorHandler(givenError) {
        var _React$useState = React__namespace.useState(null), error = _React$useState[0], setError = _React$useState[1];
        if (givenError != null)
          throw givenError;
        if (error != null)
          throw error;
        return setError;
      }
      __name(useErrorHandler, "useErrorHandler");
      exports2.ErrorBoundary = ErrorBoundary2;
      exports2.useErrorHandler = useErrorHandler;
      exports2.withErrorBoundary = withErrorBoundary;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// js/starter.tsx
init_define_process();
var import_react = __toESM(require_react(), 1);
var import_react_error_boundary = __toESM(require_react_error_boundary_umd(), 1);
var import_react2 = __toESM(require_emotion_react_cjs(), 1);

// js/wait.ts
init_define_process();
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}
__name(wait, "wait");

// js/starter.tsx
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
Object.assign(globalThis, { md5 });
var myApps = {};
var myAppCounters = {};
var controller;
onSessionUpdate(() => {
  if (controller)
    controller.abort("new i");
}, "abort");
var importIt = /* @__PURE__ */ __name(async (url) => {
  let waitingTime = 100;
  let App;
  const urlARR = url.split("/");
  const naked = +(urlARR.pop() || 0);
  const nUrl = urlARR.join("/");
  myAppCounters[nUrl] = myAppCounters[nUrl] || naked;
  while (true) {
    const betterNaked = naked < myAppCounters[nUrl] ? myAppCounters[nUrl] : naked;
    const url2 = [...urlARR, betterNaked].join("/");
    try {
      try {
        let controller2 = new AbortController();
        const signal = controller2.signal;
        let resp = await fetch(url2, { signal });
        if (resp.ok) {
          try {
            App = (await importShim(url2)).default;
            return { App, url: resp.url };
          } catch {
            const trp = await resp.text();
            try {
              App = (await import(createJsBlob(trp))).default;
            } catch {
              console.error("something went nuts");
              App = (await importShim(createJsBlob(trp))).default;
            }
            myApps[nUrl] = App;
            return { App, url: resp.url };
          }
        }
      } catch (err) {
        console.error({ err });
        console.error(
          err && err?.message || "error has been thrown"
        );
      }
    } catch {
      console.error("bad something happened;");
    } finally {
      await wait(waitingTime *= 2);
    }
  }
}, "importIt");
if (!Object.hasOwn(globalThis, "apps")) {
  Object.assign(globalThis, { apps: {}, eCaches: {} });
}
var { apps, eCaches } = globalThis;
function AutoUpdateApp({ codeSpace }) {
  let starterI = 1 * document.getElementById(`root-${codeSpace}`).getAttribute(
    "data-i"
  );
  const [{ App, i }, setApps] = (0, import_react.useState)({
    i: starterI - 1,
    App: null
  });
  (0, import_react.useEffect)(() => {
    (async () => {
      const { url, App: newApp } = await importIt(
        `${location.origin}/live/${codeSpace}/index.js/${i}`
      );
      const urlCounter = +(url.split("/").pop() || 0);
      if (i < urlCounter && newApp !== App) {
        setApps((x) => ({ ...x, i: urlCounter, App: newApp }));
      }
    })();
  }, []);
  (0, import_react.useEffect)(() => {
    (async () => {
      (async () => {
        const { url, App: newApp } = await importIt(
          `${location.origin}/live/${codeSpace}/index.js/${i + 1}`
        );
        const urlCounter = +(url.split("/").pop() || 0);
        if (i < urlCounter && newApp !== App) {
          console.log({ url, urlCounter });
          setApps((x) => ({ ...x, i: urlCounter, App: newApp }));
        }
      })();
    })();
  }, [i, setApps, App]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_error_boundary.ErrorBoundary, {
    fallbackRender: ({ error }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      role: "alert",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          children: "Oh no"
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
          children: error.message
        })
      ]
    }),
    children: App == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
      style: { height: "100%" },
      dangerouslySetInnerHTML: {
        __html: `<style>${mST().css.split("body").join(`${codeSpace}-${hashCode()}`)}</style>${mST().html}`
      }
    }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {})
  });
}
__name(AutoUpdateApp, "AutoUpdateApp");
async function appFactory(transpiled = "", codeSpace) {
  const { transpiled: mstTranspiled, i: mstI } = mST();
  const trp = transpiled.length > 0 ? transpiled : mstTranspiled;
  const hash = md5(trp);
  if (!apps[hash] || !eCaches[hash]) {
    try {
      eCaches[hash] = eCaches[hash] || emotionCache_default({
        key: hash,
        container: document.getElementById(`root-${codeSpace}`),
        insertionPoint: document.getElementById(`root-${codeSpace}`),
        speedy: false
      });
      eCaches[hash].compat = void 0;
      console.log(`i: ${mstI}: `);
      let mod;
      try {
        mod = await importShim(createJsBlob(trp));
      } catch {
        mod = new Function(trp + ` return ${trp.slice(2, 10)}`)();
      }
      const App = mod.default;
      apps[hash] = ({ appId }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        style: { height: 100 + "%" },
        id: appId,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.CacheProvider, {
          value: eCaches[hash],
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {})
        }, hash)
      }, hash);
    } catch (error) {
      if (error instanceof SyntaxError) {
        const name = error.name;
        const message = error.message;
        apps[hash] = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          css: import_react2.css`background-color: orange;`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
              children: "Syntax Error"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
              children: hash
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              children: JSON.stringify({ err: error })
            })
          ]
        });
      } else if (error instanceof Error) {
        const name = error.name;
        const message = error.message;
        apps[hash] = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          css: import_react2.css`background-color: orange;`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
              children: "Syntax Error"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              children: JSON.stringify({ err: error })
            })
          ]
        });
      } else {
        apps[hash] = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          css: import_react2.css`background-color: orange;`,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
            children: [
              "Unknown Error: $",
              hash
            ]
          })
        });
      }
    }
    if (transpiled !== "")
      return apps[hash];
  }
  return apps[hash];
}
__name(appFactory, "appFactory");
function createJsBlob(code, fileName = "index.mjs") {
  const file = new File([code], fileName, {
    type: "application/javascript",
    lastModified: Date.now()
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}
__name(createJsBlob, "createJsBlob");

export {
  wait,
  importIt,
  apps,
  eCaches,
  AutoUpdateApp,
  appFactory,
  createJsBlob
};
