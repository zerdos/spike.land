import {
  ab2str
} from "./chunk-chunk-3LGVA7LC.mjs";
import {
  require_client
} from "./chunk-chunk-34ZHNXSL.mjs";
import {
  jsx,
  jsxs
} from "./chunk-chunk-JCFFDELF.mjs";
import "./chunk-chunk-IUZYA32I.mjs";
import "./chunk-chunk-6WNVMO5F.mjs";
import "./chunk-chunk-QZAQGZXD.mjs";
import {
  md5
} from "./chunk-chunk-I52D4BQZ.mjs";
import "./chunk-chunk-SGWKU6EY.mjs";
import {
  require_react
} from "./chunk-chunk-WOINJVTR.mjs";
import {
  __commonJS,
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// node_modules/react-error-boundary/dist/react-error-boundary.umd.js
var require_react_error_boundary_umd = __commonJS({
  "node_modules/react-error-boundary/dist/react-error-boundary.umd.js"(exports, module) {
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

// js/hydrate.tsx
init_define_process();
var import_client = __toESM(require_client(), 1);
var import_react_error_boundary = __toESM(require_react_error_boundary_umd(), 1);
var r;
var root;
var lastI;
var hydrate = /* @__PURE__ */ __name(async (codeSpace, sess) => {
  if (sess?.i && sess.i === lastI)
    return;
  if (r) {
    r.unmount();
    r = null;
  }
  let App;
  const rt = document.getElementById("root");
  if (sess && sess.i && sess.html && sess.transpiled) {
    const { i: i2, css, html, transpiled } = sess;
    rt?.setAttribute("data-i", String(i2));
    rt.innerHTML = `<style>${css}</style>${html}`.split(md5(transpiled)).join(
      `css`
    );
  }
  const i = rt?.getAttribute("data-i") || 1;
  lastI = +i;
  App = (await import(`${location.origin}/live/${codeSpace}/index.js/${i}`)).default;
  root = document.getElementById(
    codeSpace + "-css"
  );
  if (!root) {
    document.getElementById("root").innerHTML = `<div style="height: 100%" id="${codeSpace}-css"></>`;
    root = document.getElementById(
      codeSpace + "-css"
    );
  }
  if (!r) {
    r = (0, import_client.createRoot)(root);
    r.render(
      /* @__PURE__ */ jsx(
        import_react_error_boundary.ErrorBoundary,
        {
          fallbackRender: ({ error }) => /* @__PURE__ */ jsxs("div", { role: "alert", children: [
            /* @__PURE__ */ jsx("div", { children: "Oh, no!!!" }),
            /* @__PURE__ */ jsx("pre", { children: error.message })
          ] }),
          children: /* @__PURE__ */ jsx(App, {})
        }
      )
    );
  }
}, "hydrate");
export {
  ab2str,
  hydrate,
  md5
};
