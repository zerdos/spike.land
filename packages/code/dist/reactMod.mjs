import {
  require_react
} from "./chunk-chunk-UX3KX3KY.mjs";
import {
  __commonJS,
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

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
    var isES6ClassFn = /* @__PURE__ */ __name(function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    }, "isES6ClassFunction");
    var tryFunctionObject = /* @__PURE__ */ __name(function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    }, "tryFunctionToStr");
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = /* @__PURE__ */ __name(function isDocumentDotAll() {
      return false;
    }, "isDocumentDotAll");
    if (typeof document === "object") {
      all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = /* @__PURE__ */ __name(function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        }, "isDocumentDotAll");
      }
    }
    var all;
    module.exports = reflectApply ? /* @__PURE__ */ __name(function isCallable2(value) {
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
    }, "isCallable") : /* @__PURE__ */ __name(function isCallable2(value) {
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
    }, "isCallable");
  }
});

// ../../.yarn/__virtual__/react-error-boundary-virtual-8f70cc21a5/0/global/cache/react-error-boundary-npm-3.1.4-2310dba89e-9.zip/node_modules/react-error-boundary/dist/react-error-boundary.umd.js
var require_react_error_boundary_umd = __commonJS({
  "../../.yarn/__virtual__/react-error-boundary-virtual-8f70cc21a5/0/global/cache/react-error-boundary-npm-3.1.4-2310dba89e-9.zip/node_modules/react-error-boundary/dist/react-error-boundary.umd.js"(exports, module) {
    init_define_process();
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_react()) : typeof define === "function" && define.amd ? define(["exports", "react"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.ReactErrorBoundary = {}, global.React));
    })(exports, function(exports2, React2) {
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
      var React__namespace = /* @__PURE__ */ _interopNamespace(React2);
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
      function withErrorBoundary(Component2, errorBoundaryProps) {
        var Wrapped = /* @__PURE__ */ __name(function Wrapped2(props) {
          return /* @__PURE__ */ React__namespace.createElement(ErrorBoundary2, errorBoundaryProps, /* @__PURE__ */ React__namespace.createElement(Component2, props));
        }, "Wrapped");
        var name = Component2.displayName || Component2.name || "Unknown";
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

// js/reactMod.ts
init_define_process();
var import_is_callable = __toESM(require_is_callable(), 1);
var import_react = __toESM(require_react(), 1);
var import_react_error_boundary = __toESM(require_react_error_boundary_umd(), 1);
var {
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createRef,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  startTransition,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useSyncExternalStore,
  useTransition,
  version
} = import_react.default;
var originalUseState = import_react.default.useState;
function useState(initialState) {
  if (globalThis.workerDom) {
    const [state, setState] = originalUseState(initialState);
    const delayedSetState = /* @__PURE__ */ __name((updates) => setTimeout(() => (0, import_is_callable.default)(updates) ? setState(() => updates()) : setState(updates)), "delayedSetState");
    return [state, delayedSetState];
  }
  return originalUseState(initialState);
}
__name(useState, "useState");
Object.assign(import_react.default, { useState });
var reactMod_default = import_react.default;
var export_ErrorBoundary = import_react_error_boundary.ErrorBoundary;
export {
  Children,
  Component,
  export_ErrorBoundary as ErrorBoundary,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createRef,
  reactMod_default as default,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  startTransition,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  version
};
