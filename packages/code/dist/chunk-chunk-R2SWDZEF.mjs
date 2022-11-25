import {
  require_client
} from "./chunk-chunk-FFMS35Y7.mjs";
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
      function _interopNamespace(e2) {
        if (e2 && e2.__esModule)
          return e2;
        var n2 = /* @__PURE__ */ Object.create(null);
        if (e2) {
          Object.keys(e2).forEach(function(k2) {
            if (k2 !== "default") {
              var d2 = Object.getOwnPropertyDescriptor(e2, k2);
              Object.defineProperty(n2, k2, d2.get ? d2 : {
                enumerable: true,
                get: function() {
                  return e2[k2];
                }
              });
            }
          });
        }
        n2["default"] = e2;
        return Object.freeze(n2);
      }
      __name(_interopNamespace, "_interopNamespace");
      var React__namespace = /* @__PURE__ */ _interopNamespace(React);
      function _setPrototypeOf(o2, p2) {
        _setPrototypeOf = Object.setPrototypeOf || /* @__PURE__ */ __name(function _setPrototypeOf2(o3, p3) {
          o3.__proto__ = p3;
          return o3;
        }, "_setPrototypeOf");
        return _setPrototypeOf(o2, p2);
      }
      __name(_setPrototypeOf, "_setPrototypeOf");
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        _setPrototypeOf(subClass, superClass);
      }
      __name(_inheritsLoose, "_inheritsLoose");
      var changedArray = /* @__PURE__ */ __name(function changedArray2(a2, b2) {
        if (a2 === void 0) {
          a2 = [];
        }
        if (b2 === void 0) {
          b2 = [];
        }
        return a2.length !== b2.length || a2.some(function(item, index) {
          return !Object.is(item, b2[index]);
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

// ../../.yarn/global/cache/@ampproject-worker-dom-npm-0.34.0-cfc9652499-9.zip/node_modules/@ampproject/worker-dom/dist/main.mjs
init_define_process();
var e = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(8);
  return { execute: (e3, r3, s3) => (o2 && s3 && (e3 = t2.getNode(e3[r3 + 1])) && (s3 = e3.transferControlToOffscreen(), n2.messageToWorker({ 12: 9, 13: [e3._index_], 38: s3 }, [s3])), r3 + 2) };
}, "e");
var t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var n = /* @__PURE__ */ __name((e2, t2) => Array.prototype.forEach.call(e2, t2), "n");
var r = class {
  constructor(e2, t2) {
    this.nodes = this.count = this.stringContext = this.baseElement = void 0, this.createNodes = (e3, t3) => {
      let n2 = (e3 = new Uint16Array(e3)).length;
      for (let s2 = 0; s2 < n2; s2 += 5) {
        var r2 = void 0;
        if (3 === e3[s2 + 1])
          r2 = document.createTextNode(this.stringContext.get(e3[s2 + 3]));
        else if (8 === e3[s2 + 1])
          r2 = document.createComment(this.stringContext.get(e3[s2 + 3]));
        else if (11 === e3[s2 + 1])
          r2 = document.createDocumentFragment();
        else if (r2 = this.stringContext.get(e3[s2 + 2]), r2 = 0 !== e3[s2 + 4] ? document.createElementNS(this.stringContext.get(e3[s2 + 4]), r2) : document.createElement(r2), t3 && !t3.sanitize(r2))
          continue;
        this.storeNode(r2, e3[s2]);
      }
    }, this.getNode = (e3) => (e3 = this.nodes.get(e3)) && "BODY" === e3.nodeName ? this.baseElement : e3, this.storeNodes = (e3) => {
      this.storeNode(e3, ++this.count), n(e3.childNodes, (e4) => this.storeNodes(e4));
    }, this.count = 2, this.stringContext = e2, this.nodes = /* @__PURE__ */ new Map([[1, t2], [2, t2]]), this.baseElement = t2, t2._index_ = 2, n(t2.childNodes, (e3) => this.storeNodes(e3));
  }
  storeNode(e2, t2) {
    e2._index_ = t2, this.nodes.set(t2, e2);
  }
};
__name(r, "r");
var s = /* @__PURE__ */ new Map();
var o = /* @__PURE__ */ __name((e2, t2) => {
  t2 && "value" in t2 && null === t2.oninput && (t2.oninput = () => l(e2, t2));
}, "o");
var i = /* @__PURE__ */ __name((e2, t2) => {
  t2 && "value" in t2 && !s.get(t2) && (new MutationObserver((t3) => t3.map((t4) => l(e2, t4.target))).observe(t2, { attributes: true }), s.set(t2, true));
}, "i");
var l = /* @__PURE__ */ __name((e2, t2) => e2.messageToWorker({ 12: 4, 40: { 7: t2._index_, 21: t2.value } }), "l");
var u = /* @__PURE__ */ __name((e2) => Object.values(e2).map((e3) => [e3.identifier, e3.screenX, e3.screenY, e3.clientX, e3.clientY, e3.pageX, e3.pageY, e3.target._index_]), "u");
var a = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const a2 = [], c2 = s2.executorsAllowed.includes(4);
  let d2 = [window.innerWidth, window.innerHeight];
  const h2 = /* @__PURE__ */ __name((e3, t3) => (r3) => {
    t3 && r3.preventDefault();
    var s3 = r3.currentTarget;
    if (s3 && "value" in s3)
      l(n2, r3.currentTarget);
    else if ("resize" === r3.type) {
      const { innerWidth: e4, innerHeight: t4 } = window;
      if (d2[0] === e4 && d2[1] === t4)
        return;
      d2 = [window.innerWidth, window.innerHeight], n2.messageToWorker({ 12: 5, 40: d2 });
    }
    n2.messageToWorker({ 12: 1, 39: { 7: e3, 25: r3.bubbles, 26: r3.cancelable, 27: r3.cancelBubble, 28: [r3.currentTarget._index_ || 0], 29: r3.defaultPrevented, 30: r3.eventPhase, 31: r3.isTrusted, 32: r3.returnValue, 13: [r3.target._index_ || 0], 33: r3.timeStamp, 12: r3.type, 35: "keyCode" in r3 ? r3.keyCode : void 0, 60: "pageX" in r3 ? r3.pageX : void 0, 61: "pageY" in r3 ? r3.pageY : void 0, 65: "offsetX" in r3 ? r3.offsetX : void 0, 66: "offsetY" in r3 ? r3.offsetY : void 0, 62: "touches" in r3 ? u(r3.touches) : void 0, 63: "changedTouches" in r3 ? u(r3.changedTouches) : void 0 } });
  }, "h");
  return { execute(r3, s3, l2) {
    var u2 = r3[s3 + 2];
    const d3 = s3 + 4 + 2 * u2;
    if (u2 = s3 + 4 + 6 * r3[s3 + 3] + 2 * u2, c2 && l2 && (l2 = t2.getNode(r3[s3 + 1]))) {
      let c3 = s3 + 4;
      for (; c3 < u2; ) {
        const u3 = c3 <= d3;
        e: {
          s3 = l2;
          var g2 = u3, f2 = r3, p2 = c3;
          const d4 = e2.get(f2[p2]), m2 = f2[p2 + 1];
          if (s3 === t2.baseElement) {
            g2 ? addEventListener(d4, a2[m2] = h2(1, !!f2[p2 + 5])) : removeEventListener(d4, a2[m2]);
            break e;
          }
          let w2 = null !== s3.oninput;
          const x2 = "change" === d4;
          g2 ? (x2 && (w2 = true, s3.onchange = null), s3.addEventListener(d4, a2[m2] = h2(s3._index_, !!f2[p2 + 5]))) : (x2 && (w2 = false), s3.removeEventListener(d4, a2[m2])), s3 && "value" in s3 && (w2 || o(n2, s3), i(n2, s3));
        }
        c3 += u3 ? 2 : 6;
      }
    }
    return u2;
  } };
}, "a");
var c = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(5);
  return { execute: (e3, r3, s3) => (o2 && s3 && (e3 = t2.getNode(e3[r3 + 1])) && (s3 = e3.getBoundingClientRect(), n2.messageToWorker({ 12: 6, 13: [e3._index_], 38: [s3.top, s3.right, s3.bottom, s3.left, s3.width, s3.height] })), r3 + 2) };
}, "c");
var d = /* @__PURE__ */ __name((e2, { getNode: t2 }, n2, r2, s2) => {
  const l2 = s2.executorsAllowed.includes(2);
  return { execute(e3, r3, s3) {
    const u2 = e3[r3 + 4], a2 = e3[r3 + 5];
    if (l2 && s3) {
      const s4 = t2(e3[r3 + 1]);
      s4 && (0 < a2 && e3.slice(r3 + 6 + u2, r3 + 6 + u2 + a2).forEach((e4) => {
        (e4 = t2(e4)) && e4.remove();
      }), 0 < u2 && e3.slice(r3 + 6, r3 + 6 + u2).forEach((l3) => {
        const u3 = e3[r3 + 2];
        (l3 = t2(l3)) && (s4.insertBefore(l3, u3 && t2(u3) || null), o(n2, l3), i(n2, l3));
      }));
    }
    return r3 + 6 + u2 + a2;
  } };
}, "d");
var h = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(0);
  return { execute(n3, r3, i2) {
    if (o2 && i2) {
      i2 = t2.getNode(n3[r3 + 1]);
      const o3 = e2.get(n3[r3 + 2]);
      n3 = 0 !== (n3 = n3[r3 + 4]) ? e2.get(n3 - 1) : null, i2 && null != o3 && (s2.sanitizer ? s2.sanitizer.setAttribute(i2, o3, n3) : null == n3 ? i2.removeAttribute(o3) : i2.setAttribute(o3, n3));
    }
    return r3 + 5;
  } };
}, "h");
var g = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(1);
  return { execute: (n3, r3, s3) => (o2 && s3 && (s3 = t2.getNode(n3[r3 + 1]), n3 = n3[r3 + 2], s3 && n3 && (s3.textContent = e2.get(n3))), r3 + 3) };
}, "g");
var f = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(3);
  return { execute(n3, r3, i2) {
    if (o2 && i2) {
      i2 = t2.getNode(n3[r3 + 1]);
      const o3 = e2.get(n3[r3 + 2]);
      {
        const t3 = n3[r3 + 4];
        n3 = 1 === n3[r3 + 3] ? 1 === t3 : 0 !== t3 ? e2.get(t3) : null;
      }
      i2 && o3 && null != n3 && (s2.sanitizer ? s2.sanitizer.setProperty(i2, o3, String(n3)) : i2[o3] = n3);
    }
    return r3 + 5;
  } };
}, "f");
var p = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(6);
  let i2, l2 = 0;
  return { execute(e3, t3, n3) {
    if (o2 && n3 && s2.longTask)
      if (6 === e3[t3]) {
        if (l2++, !i2) {
          const e4 = new Promise((e5) => i2 = e5);
          Promise.resolve().then(() => s2.longTask && s2.longTask(e4));
        }
      } else
        7 === e3[t3] && (l2--, i2 && 0 >= l2 && (i2(), i2 = null, l2 = 0));
    return t3 + 2;
  }, get active() {
    return null !== i2;
  } };
}, "p");
var m = new Float32Array(1);
var w = new Uint16Array(m.buffer);
function x(e2, t2, n2, r2, s2, o2) {
  let i2 = [];
  for (let u2 = 0; u2 < n2; u2++)
    switch (e2[t2++]) {
      case 1:
        i2.push(e2[t2++]);
        break;
      case 2:
        w[0] = e2[t2++], w[1] = e2[t2++], i2.push(m[0]);
        break;
      case 3:
        i2.push(r2.get(e2[t2++]));
        break;
      case 4:
        var l2 = e2[t2++];
        t2 = x(e2, t2, l2, r2, s2, o2), i2.push(t2.args), t2 = t2.offset;
        break;
      case 5:
        if (!o2)
          throw Error("objectContext not provided.");
        i2.push(o2.get(e2[t2++]));
        break;
      case 6:
        l2 = s2.getNode(e2[t2++]), i2.push(l2.getContext("2d"));
        break;
      case 7:
        i2.push(s2.getNode(e2[t2++]));
        break;
      default:
        throw Error("Cannot deserialize argument.");
    }
  return { args: i2, offset: t2 };
}
__name(x, "x");
var v = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(9);
  return { execute(n3, s3, i2) {
    const l2 = e2.get(n3[s3 + 1]), u2 = n3[s3 + 2], { offset: a2, args: c2 } = x(n3, s3 + 3, 1, e2, t2, r2);
    s3 = c2[0];
    const { offset: d2, args: h2 } = x(n3, a2, u2, e2, t2, r2);
    return o2 && i2 && (b(s3, l2) ? s3[l2] = h2[0] : s3[l2](...h2)), d2;
  } };
}, "v");
function b(e2, t2) {
  if (!e2)
    throw Error(`Property ${t2} does not exist on ${e2}.`);
  let n2 = Object.getOwnPropertyDescriptor(e2, t2);
  return void 0 !== n2 ? "set" in n2 : b(Object.getPrototypeOf(e2), t2);
}
__name(b, "b");
var k = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(10);
  if (!r2)
    throw Error("objectContext is not defined.");
  return { execute(n3, s3, i2) {
    const l2 = e2.get(n3[s3 + 1]), u2 = n3[s3 + 2], a2 = n3[s3 + 3], { offset: c2, args: d2 } = x(n3, s3 + 4, 1, e2, t2, r2);
    s3 = d2[0];
    const { offset: h2, args: g2 } = x(n3, c2, a2, e2, t2, r2);
    return o2 && i2 && "new" !== l2 && r2.store(u2, s3[l2](...g2)), h2;
  } };
}, "k");
var y = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(11);
  return { execute: (e3, r3, s3) => (o2 && s3 && (s3 = t2.getNode(e3[r3 + 1])) && self.createImageBitmap(s3).then((t3) => {
    n2.messageToWorker({ 12: 10, 73: e3[r3 + 2], 38: t3 }, [t3]);
  }), r3 + 3) };
}, "y");
var N = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(12);
  return { execute(t3, r3, i2) {
    if (o2 && i2) {
      i2 = t3[r3 + 1];
      var l2 = t3[r3 + 2], u2 = t3[r3 + 3];
      const o3 = t3[r3 + 4];
      if (t3 = 0 < u2 ? e2.get(u2 - 1) : "", u2 = 0 < o3 ? e2.get(o3 - 1) : null, 1 === i2)
        ((e3, t4) => {
          s2.sanitizer && 2 === e3 && s2.sanitizer.getStorage(e3, t4).then((r4) => {
            n2.messageToWorker({ 12: 11, 74: t4, 75: e3, 21: r4 });
          });
        })(l2, t3);
      else if (2 === i2)
        if (i2 = l2, l2 = t3, t3 = u2, s2.sanitizer)
          s2.sanitizer.setStorage(i2, l2, t3);
        else {
          let e3;
          if (0 === i2 ? e3 = window.localStorage : 1 === i2 && (e3 = window.sessionStorage), e3)
            if (null == l2) {
              if (null != t3)
                throw Error("Unexpected storage operation.");
              e3.clear();
            } else
              null == t3 ? e3.removeItem(l2) : e3.setItem(l2, t3);
        }
    }
    return r3 + 5;
  } };
}, "N");
var C = 0;
var A = {};
var O = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(13);
  return { execute(t3, n3) {
    if (o2) {
      const r3 = t3[n3 + 1], s3 = t3[n3 + 2];
      t3 = t3[n3 + 3], t3 = e2.hasIndex(t3) ? JSON.parse(e2.get(t3)) : void 0, 1 === r3 ? A[s3].resolve(t3) : A[s3].reject(t3), delete A[s3];
    }
    return n3 + 4;
  } };
}, "O");
var _ = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(14);
  return { execute: (e3, n3, r3) => (o2 && r3 && (e3 = t2.getNode(e3[n3 + 1])) && e3.scrollIntoView(), n3 + 2) };
}, "_");
var E = class {
  constructor(t2, n2, r2, s2, o2) {
    this.nodeContext = this.stringContext = void 0, this.mutationQueue = [], this.pendingMutations = false, this.executors = this.sanitizer = this.mutationPumpFunction = void 0, this.syncFlush = (e2 = true) => {
      let t3 = [];
      return this.mutationQueue.forEach((n3) => {
        let r3 = n3.length, s3 = 0;
        for (; s3 < r3; ) {
          let r4 = n3[s3];
          var o3;
          if (!(o3 = e2)) {
            e:
              switch (r4) {
                case 4:
                case 5:
                case 6:
                case 7:
                case 12:
                case 8:
                case 13:
                  o3 = false;
                  break e;
                default:
                  o3 = true;
              }
            o3 = !o3;
          }
          o3 || t3.push(r4), s3 = this.executors[r4].execute(n3, s3, o3);
        }
      }), this.mutationQueue = [], this.pendingMutations = false, t3;
    }, this.stringContext = t2, this.nodeContext = n2, this.sanitizer = s2.sanitizer, this.mutationPumpFunction = s2.mutationPump, n2 = p.apply(null, t2 = [t2, n2, r2, o2, s2]), this.executors = { 2: d.apply(null, t2), 0: h.apply(null, t2), 1: g.apply(null, t2), 3: f.apply(null, t2), 4: a.apply(null, t2), 5: c.apply(null, t2), 6: n2, 7: n2, 8: e.apply(null, t2), 9: v.apply(null, t2), 10: k.apply(null, t2), 11: y.apply(null, t2), 12: N.apply(null, t2), 13: O.apply(null, t2), 14: _.apply(null, t2) };
  }
  mutate(e2, t2, n2, r2) {
    this.stringContext.storeValues(n2), this.nodeContext.createNodes(t2, this.sanitizer), this.mutationQueue = this.mutationQueue.concat(r2), this.pendingMutations || (this.pendingMutations = true, this.mutationPumpFunction(this.syncFlush, e2));
  }
};
__name(E, "E");
var T = class {
  constructor() {
    this.strings = [];
  }
  get(e2) {
    return this.strings[e2] || "";
  }
  hasIndex(e2) {
    return void 0 !== this.strings[e2];
  }
  store(e2) {
    return this.strings.push(e2), this.strings.length - 1;
  }
  storeValues(e2) {
    e2.forEach((e3) => this.store(e3));
  }
};
__name(T, "T");
var M = [8, 3];
function S(e2, t2, n2, r2) {
  var s2 = [].slice.call(e2.childNodes).filter(n2);
  return s2 = { 7: e2._index_, 11: 0, 0: e2.nodeType, 1: t2(e2.localName || e2.nodeName), 4: s2.map((e3) => S(e3, t2, n2, r2)), 2: [].map.call(e2.attributes || [], (e3) => [t2(e3.namespaceURI || "null"), t2(e3.name), t2(e3.value)]) }, null != e2.namespaceURI && (s2[6] = t2(e2.namespaceURI)), M.includes(e2.nodeType) && null !== e2.textContent && (s2[5] = t2(e2.textContent)), o(r2, e2), i(r2, e2), s2;
}
__name(S, "S");
var U = class {
  constructor(e2, t2, n2, r2, s2) {
    this[55] = void 0, this.nodeContext = t2, this.config = s2;
    let { skeleton: o2, strings: i2 } = function(e3, t3, n3) {
      t3 = t3.hydrateFilter || (() => true);
      let r3 = [], s3 = /* @__PURE__ */ new Map();
      return { skeleton: S(e3, (e4) => {
        if (s3.has(e4))
          return s3.get(e4);
        const t4 = r3.length;
        return s3.set(e4, t4), r3.push(e4), t4;
      }, t3, n3), strings: r3 };
    }(e2, s2, this);
    t2 = [];
    let l2 = [], u2 = W("localStorage"), a2 = W("sessionStorage");
    for (let n3 in e2.style)
      t2.push(n3);
    for (let t3 in e2)
      t3.startsWith("on") && l2.push(t3);
    n2 = `'use strict';(function(){${n2}self['window']=self;var workerDOM=WorkerThread.workerDOM;WorkerThread.hydrate(workerDOM.document,${JSON.stringify(i2)},${JSON.stringify(o2)},${JSON.stringify(t2)},${JSON.stringify(l2)},[${window.innerWidth},${window.innerHeight}],${JSON.stringify(u2)},${JSON.stringify(a2)});workerDOM.document[59](this);Object.assign(self,workerDOM);}).call(self);${r2}//# sourceURL=${encodeURI(s2.authorURL)}`, s2.sandbox || (this[55] = new Worker(URL.createObjectURL(new Blob([n2])))), s2.onCreateWorker && s2.onCreateWorker(e2, i2, o2, t2);
  }
  ready() {
    return this.worker.readyPromise || Promise.resolve();
  }
  get worker() {
    return this[55];
  }
  messageToWorker(e2, t2) {
    this.config.onSendMessage && this.config.onSendMessage(e2), this.worker.postMessage(e2, t2 || []);
  }
};
__name(U, "U");
function W(e2, t2) {
  try {
    return t2 ? { storage: t2.getStorage("localStorage" == e2 ? 0 : 1), errorMsg: null } : { storage: window[e2], errorMsg: null };
  } catch (e3) {
    return { errorMsg: e3.message, storage: null };
  }
}
__name(W, "W");
var P = class {
  constructor() {
    this.objects = void 0, this.objects = /* @__PURE__ */ new Map();
  }
  store(e2, t2) {
    this.objects.set(e2, t2);
  }
  get(e2) {
    let t2 = this.objects.get(e2);
    if (t2)
      return t2;
    throw Error("Object with id (" + e2 + ") does not exist.");
  }
};
__name(P, "P");
var L = class {
  constructor(e2, t2) {
    this.workerContext_ = e2, this.config = t2;
  }
  callFunction(e2, ...t2) {
    if (!this.config.executorsAllowed.includes(13))
      throw Error(`[worker-dom]: Error calling ${e2}. You must enable the FUNCTION_CALL executor within the config.`);
    let { promise: n2, index: r2 } = function() {
      let e3, t3, n3 = new Promise((n4, r4) => {
        e3 = n4, t3 = r4;
      });
      C >= Number.MAX_VALUE && (C = 0);
      let r3 = C++;
      return A[r3] = { promise: n3, resolve: e3, reject: t3 }, { promise: n3, index: r3 };
    }();
    return e2 = { 12: 12, 77: e2, 78: JSON.stringify(t2), 7: r2 }, this.workerContext_.messageToWorker(e2), n2;
  }
  set onerror(e2) {
    this.workerContext_.worker.onerror = e2;
  }
  terminate() {
    this.workerContext_.worker.terminate();
  }
};
__name(L, "L");
var R = [3, 2];
function j(e2, n2) {
  return function(e3, n3, s2) {
    var o2 = n3.dataset.shadowDom;
    if ("open" === o2 || "closed" === o2) {
      o2 = n3.attachShadow({ mode: o2 });
      let e4 = n3.cloneNode(true);
      o2.appendChild(e4), n3 = e4;
    }
    let i2 = new T(), l2 = new P(), u2 = new r(i2, n3), a2 = function(e4) {
      return Object.assign({}, { mutationPump: requestAnimationFrame.bind(null), executorsAllowed: t }, e4);
    }(s2);
    return e3.then(([e4, t2]) => {
      if (e4 && t2 && s2.authorURL) {
        let r2 = new U(n3, u2, e4, t2, a2), o3 = new E(i2, u2, r2, a2, l2);
        return r2.worker.onmessage = (e5) => {
          let { data: t3 } = e5;
          R.includes(t3[12]) && (o3.mutate(t3[54], t3[37], t3[41], new Uint16Array(t3[36])), s2.onReceiveMessage) && s2.onReceiveMessage(e5);
        }, r2.ready().then(() => new L(r2, a2));
      }
      return null;
    });
  }(Promise.all([fetch(n2.domURL).then((e3) => e3.text()), fetch(n2.authorURL).then((e3) => e3.text())]), e2, n2);
}
__name(j, "j");
function upgradeElement(e2, t2) {
  let n2 = e2.getAttribute("src");
  return n2 ? j(e2, { authorURL: n2, domURL: t2 }) : Promise.resolve(null);
}
__name(upgradeElement, "upgradeElement");

// js/starter.tsx
var import_react2 = __toESM(require_emotion_react_cjs(), 1);
var import_client = __toESM(require_client(), 1);

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
var moveToWorker = /* @__PURE__ */ __name(async (codeSpace, counter) => {
  const App2 = await appFactory(mST().transpiled, codeSpace);
  const { html, css: css2, transpiled, i: i2 } = mST();
  const div2 = document.createElement("div");
  div2.setAttribute("id", `${codeSpace}-${i2}`);
  document.body.appendChild(div2);
  const mod = await toUmd(transpiled, `${codeSpace}-${i2}`);
  const js = await mod.toJs(`${codeSpace}-${i2}`);
  const scr = createJsBlob(js, `${codeSpace}-${i2}`);
  div2.setAttribute("src", scr);
  return upgradeElement(div2, `/node_modules/@ampproject/worker-dom@0.34.0/dist/worker/worker.js`);
}, "moveToWorker");
var root = (0, import_client.createRoot)(div);
root.render(
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_error_boundary.ErrorBoundary, {
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
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {})
  })
);
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
  let App2;
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
            App2 = (await importShim(url2)).default;
            return { App: App2, url: resp.url };
          } catch {
            const trp = await resp.text();
            try {
              App2 = (await import(createJsBlob(trp))).default;
            } catch {
              console.error("something went nuts");
              App2 = (await importShim(createJsBlob(trp))).default;
            }
            myApps[nUrl] = App2;
            return { App: App2, url: resp.url };
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
  const [{ App: App2, i: i2 }, setApps] = (0, import_react.useState)({
    i: starterI - 1,
    App: null
  });
  (0, import_react.useEffect)(() => {
    (async () => {
      const { url, App: newApp } = await importIt(
        `${location.origin}/live/${codeSpace}/index.js/${i2}`
      );
      const urlCounter = +(url.split("/").pop() || 0);
      if (i2 < urlCounter && newApp !== App2) {
        setApps((x2) => ({ ...x2, i: urlCounter, App: newApp }));
      }
    })();
  }, []);
  (0, import_react.useEffect)(() => {
    (async () => {
      (async () => {
        const { url, App: newApp } = await importIt(
          `${location.origin}/live/${codeSpace}/index.js/${i2 + 1}`
        );
        const urlCounter = +(url.split("/").pop() || 0);
        if (i2 < urlCounter && newApp !== App2) {
          console.log({ url, urlCounter });
          setApps((x2) => ({ ...x2, i: urlCounter, App: newApp }));
        }
      })();
    })();
  }, [i2, setApps, App2]);
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
    children: App2 == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
      style: { height: "100%" },
      dangerouslySetInnerHTML: {
        __html: `<style>${mST().css.split("body").join(`${codeSpace}-${hashCode()}`)}</style>${mST().html}`
      }
    }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App2, {})
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
        insertionPoint: document.getElementById(`root-${codeSpace}`),
        speedy: true
      });
      eCaches[hash].compat = void 0;
      console.log(`i: ${mstI}: `);
      let mod;
      try {
        mod = await importShim(createJsBlob(trp));
      } catch {
        mod = new Function(trp + ` return ${trp.slice(2, 10)}`)();
      }
      const App2 = mod.default;
      apps[hash] = ({ appId }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        style: { height: 100 + "%" },
        id: appId,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.CacheProvider, {
          value: eCaches[hash],
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App2, {})
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
  moveToWorker,
  importIt,
  apps,
  eCaches,
  AutoUpdateApp,
  appFactory,
  createJsBlob
};
