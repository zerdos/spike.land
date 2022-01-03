// js/renderPreviewWindow.tsx
import { jsx as jsx3 } from "https://unpkg.com/@spike.land/esm@0.5.14/dist/emotion-react.mjs";

// js/DraggableWindow.tsx
import { css as css2, jsx as jsx2 } from "https://unpkg.com/@spike.land/esm@0.5.14/dist/emotion-react.mjs";
import React3, {
  useEffect,
  useRef,
  useState
} from "https://unpkg.com/@spike.land/esm@0.5.14/dist/react.mjs";
import { motion as motion2 } from "https://unpkg.com/@spike.land/esm@0.5.14/dist/framer-motion.mjs";

// js/wait.ts
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

// js/LazyLoadedComponent.tsx
var { React } = window;
var { Suspense } = React;
var LazySpikeLandComponent = ({ name, html, hash: hash2, transpiled }) => {
  const [hashCode, setHash] = React.useState(hash2);
  React.useEffect(() => {
    const intervalHandler = setInterval(async () => {
      const resp = await fetch(`https://code.spike.land/api/room/${name}/hashCodeSession`);
      const text = await resp.text();
      setHash(Number(text));
    }, 69e3);
    return () => {
      console.log("INTERVAL CLEARED");
      clearInterval(intervalHandler);
    };
  }, []);
  React.useEffect(() => {
    (async () => {
      const resp = await fetch(`https://code.spike.land/api/room/${name}/session`);
      const { html: html2, css: css3, transpiled: transpiled2 } = await resp.json();
      setHtmlCss({
        htmlContent: `<div id="root"><style>${css3}</style><div id="zbody">${html2}</div></div>`,
        LazyComponent: await getApp(transpiled2)
      });
    })();
  }, [hashCode]);
  const LazyComponentInit = React.lazy(async () => import(createJsBlob(transpiled)));
  const [{ htmlContent, LazyComponent }, setHtmlCss] = React.useState({
    htmlContent: html,
    LazyComponent: LazyComponentInit
  });
  return /* @__PURE__ */ React.createElement(Suspense, {
    key: hashCode,
    fallback: /* @__PURE__ */ React.createElement("div", {
      dangerouslySetInnerHTML: { __html: htmlContent }
    })
  }, /* @__PURE__ */ React.createElement(LazyComponent, {
    key: hash2
  }));
  function createJsBlob(code) {
    const blob = new Blob([code], { type: "application/javascript" });
    return URL.createObjectURL(blob);
  }
  async function getApp(transpiled2) {
    const objectUrl = createJsBlob(transpiled2);
    const App = (await import(objectUrl)).default;
    URL.revokeObjectURL(objectUrl);
    return App;
  }
};

// js/vendor/mui.mjs
var e = window.emotionReact;
var { CacheProvider: o } = e;
var { Global: s } = e;
var { ThemeContext: n } = e;
var { jsx: a } = e;
var { keyframes: m } = e;
var { withEmotionCache: i } = e;
function _objectWithoutPropertiesLoose(e13, t20) {
  if (e13 == null)
    return {};
  var o10 = {};
  var r13 = Object.keys(e13);
  var i13, n8;
  for (n8 = 0; n8 < r13.length; n8++) {
    i13 = r13[n8];
    t20.indexOf(i13) >= 0 || (o10[i13] = e13[i13]);
  }
  return o10;
}
function _extends() {
  _extends = Object.assign || function(e14) {
    for (var t21 = 1; t21 < arguments.length; t21++) {
      var n9 = arguments[t21];
      for (var r14 in n9) {
        Object.prototype.hasOwnProperty.call(n9, r14) && (e14[r14] = n9[r14]);
      }
    }
    return e14;
  };
  return _extends.apply(this, arguments);
}
var e1 = window.React;
var { createContext: t1 } = e1;
var { useDebugValue: o1 } = e1;
var { useState: s1 } = e1;
var { useId: n1 } = e1;
var { useRef: c1 } = e1;
var { useContext: r1 } = e1;
var { useEffect: p1 } = e1;
var { useLayoutEffect: x1 } = e1;
var { useReducer: a1 } = e1;
var { useCallback: u } = e1;
var { forwardRef: l1 } = e1;
var { createElement: f } = e1;
var { createFactory: m1 } = e1;
var { createRef: d } = e1;
var { Fragment: i1 } = e1;
var { Component: R } = e1;
var { Suspense: C } = e1;
var { isValidElement: E } = e1;
var { memo: y } = e1;
var { useImperativeHandle: w } = e1;
var { Children: b } = e1;
var { lazy: g } = e1;
var { isLazy: z } = e1;
var { useMemo: F } = e1;
var { cloneElement: I } = e1;
var L = e1;
var mod = {
  Children: b,
  Component: R,
  Fragment: i1,
  Suspense: C,
  cloneElement: I,
  createContext: t1,
  createElement: f,
  createFactory: m1,
  createRef: d,
  default: L,
  forwardRef: l1,
  isLazy: z,
  isValidElement: E,
  lazy: g,
  memo: y,
  useCallback: u,
  useContext: r1,
  useDebugValue: o1,
  useEffect: p1,
  useId: n1,
  useImperativeHandle: w,
  useLayoutEffect: x1,
  useMemo: F,
  useReducer: a1,
  useRef: c1,
  useState: s1
};
var _ = {};
var a2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
_ = a2;
var r2 = _;
var t2 = {};
var i2 = r2;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
t2 = function() {
  function shim(e5, t, n8, r, s5, m15) {
    if (m15 !== i2) {
      var o11 = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
      o11.name = "Invariant Violation";
      throw o11;
    }
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var e15 = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  e15.PropTypes = e15;
  return e15;
};
var n2 = t2;
var r3 = {};
r3 = n2();
var s2 = r3;
function toVal(e16) {
  var t22, r15, f23 = "";
  if (typeof e16 === "string" || typeof e16 === "number")
    f23 += e16;
  else if (typeof e16 === "object") {
    if (Array.isArray(e16)) {
      for (t22 = 0; t22 < e16.length; t22++) {
        if (e16[t22] && (r15 = toVal(e16[t22]))) {
          f23 && (f23 += " ");
          f23 += r15;
        }
      }
    } else {
      for (t22 in e16) {
        if (e16[t22]) {
          f23 && (f23 += " ");
          f23 += t22;
        }
      }
    }
  }
  return f23;
}
function clsx_m() {
  var e17, t23, r16 = 0, f24 = "";
  while (r16 < arguments.length) {
    if ((e17 = arguments[r16++]) && (t23 = toVal(e17))) {
      f24 && (f24 += " ");
      f24 += t23;
    }
  }
  return f24;
}
function isHostComponent(o12) {
  return typeof o12 === "string";
}
function appendOwnerState(r17, n10 = {}, a18) {
  return isHostComponent(r17) ? n10 : _extends({}, n10, {
    ownerState: _extends({}, n10.ownerState, a18)
  });
}
function extractEventHandlers(t24, e18 = []) {
  if (t24 === void 0)
    return {};
  const n12 = {};
  Object.keys(t24).filter((n11) => n11.match(/^on[A-Z]/) && typeof t24[n11] === "function" && !e18.includes(n11)).forEach((e5) => {
    n12[e5] = t24[e5];
  });
  return n12;
}
var e2 = {};
var t3 = 60103;
var r4 = 60106;
var n3 = 60107;
var o2 = 60108;
var i3 = 60114;
var s3 = 60109;
var c2 = 60110;
var a3 = 60112;
var f1 = 60113;
var u1 = 60120;
var l2 = 60115;
var p2 = 60116;
var d1 = 60121;
var m2 = 60122;
var $ = 60117;
var C1 = 60129;
var M = 60131;
if (typeof Symbol === "function" && Symbol.for) {
  P = Symbol.for;
  t3 = P("react.element");
  r4 = P("react.portal");
  n3 = P("react.fragment");
  o2 = P("react.strict_mode");
  i3 = P("react.profiler");
  s3 = P("react.provider");
  c2 = P("react.context");
  a3 = P("react.forward_ref");
  f1 = P("react.suspense");
  u1 = P("react.suspense_list");
  l2 = P("react.memo");
  p2 = P("react.lazy");
  d1 = P("react.block");
  m2 = P("react.server.block");
  $ = P("react.fundamental");
  C1 = P("react.debug_trace_mode");
  M = P("react.legacy_hidden");
}
var P;
function y1(e19) {
  if (typeof e19 === "object" && e19 !== null) {
    var d19 = e19.$$typeof;
    switch (d19) {
      case t3:
        switch (e19 = e19.type, e19) {
          case n3:
          case i3:
          case o2:
          case f1:
          case u1:
            return e19;
          default:
            switch (e19 = e19 && e19.$$typeof, e19) {
              case c2:
              case a3:
              case p2:
              case l2:
              case s3:
                return e19;
              default:
                return d19;
            }
        }
      case r4:
        return d19;
    }
  }
}
var v = s3;
var x2 = t3;
var S = a3;
var b1 = n3;
var g1 = p2;
var w1 = l2;
var F1 = r4;
var E1 = i3;
var _1 = o2;
var z1 = f1;
e2.ContextConsumer = c2;
e2.ContextProvider = v;
e2.Element = x2;
e2.ForwardRef = S;
e2.Fragment = b1;
e2.Lazy = g1;
e2.Memo = w1;
e2.Portal = F1;
e2.Profiler = E1;
e2.StrictMode = _1;
e2.Suspense = z1;
e2.isAsyncMode = function() {
  return false;
};
e2.isConcurrentMode = function() {
  return false;
};
e2.isContextConsumer = function(e21) {
  return y1(e21) === c2;
};
e2.isContextProvider = function(e32) {
  return y1(e32) === s3;
};
e2.isElement = function(e42) {
  return typeof e42 === "object" && e42 !== null && e42.$$typeof === t3;
};
e2.isForwardRef = function(e5) {
  return y1(e5) === a3;
};
e2.isFragment = function(e62) {
  return y1(e62) === n3;
};
e2.isLazy = function(e72) {
  return y1(e72) === p2;
};
e2.isMemo = function(e82) {
  return y1(e82) === l2;
};
e2.isPortal = function(e92) {
  return y1(e92) === r4;
};
e2.isProfiler = function(e102) {
  return y1(e102) === i3;
};
e2.isStrictMode = function(e112) {
  return y1(e112) === o2;
};
e2.isSuspense = function(e122) {
  return y1(e122) === f1;
};
e2.isValidElementType = function(e13) {
  return typeof e13 === "string" || typeof e13 === "function" || e13 === n3 || e13 === i3 || e13 === C1 || e13 === o2 || e13 === f1 || e13 === u1 || e13 === M || typeof e13 === "object" && e13 !== null && (e13.$$typeof === p2 || e13.$$typeof === l2 || e13.$$typeof === s3 || e13.$$typeof === c2 || e13.$$typeof === a3 || e13.$$typeof === $ || e13.$$typeof === d1 || e13[0] === m2);
};
e2.typeOf = y1;
var h1 = e2.ContextConsumer;
var L1 = e2.ContextProvider;
var R1 = e2.Element;
var j = e2.ForwardRef;
var k = e2.Fragment;
var A = e2.Lazy;
var O = e2.Memo;
var T = e2.Portal;
var V = e2.Profiler;
var q = e2.StrictMode;
var B = e2.Suspense;
var D = e2.isAsyncMode;
var G = e2.isConcurrentMode;
var H = e2.isContextConsumer;
var I1 = e2.isContextProvider;
var J = e2.isElement;
var K = e2.isForwardRef;
var N = e2.isFragment;
var Q = e2.isLazy;
var U = e2.isMemo;
var W = e2.isPortal;
var X = e2.isProfiler;
var Y = e2.isStrictMode;
var Z = e2.isSuspense;
var ee = e2.isValidElementType;
var te = e2.typeOf;
function chainPropTypes(e110, t110) {
  return false ? () => null : function validate(...n13) {
    return e110(...n13) || t110(...n13);
  };
}
function isPlainObject(e22) {
  return e22 !== null && typeof e22 === "object" && e22.constructor === Object;
}
function deepmerge(t25, n21, o13 = {
  clone: true
}) {
  const r18 = o13.clone ? _extends({}, t25) : t25;
  isPlainObject(t25) && isPlainObject(n21) && Object.keys(n21).forEach((e32) => {
    e32 !== "__proto__" && (isPlainObject(n21[e32]) && e32 in t25 && isPlainObject(t25[e32]) ? r18[e32] = deepmerge(t25[e32], n21[e32], o13) : r18[e32] = n21[e32]);
  });
  return r18;
}
function isClassComponent$1(e42) {
  const { prototype: t31 = {} } = e42;
  return Boolean(t31.isReactComponent);
}
function acceptingRef(e5, t42, n31, o21, r21) {
  const i14 = e5[t42];
  const u192 = r21 || t42;
  if (i14 == null || typeof window === "undefined")
    return null;
  let s18;
  const l15 = i14.type;
  typeof l15 !== "function" || isClassComponent$1(l15) || (s18 = "Did you accidentally use a plain function component for an element instead?");
  return s18 !== void 0 ? new Error(`Invalid ${o21} \`${u192}\` supplied to \`${n31}\`. Expected an element that can hold a ref. ${s18} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
var i4 = chainPropTypes(s2.element, acceptingRef);
i4.isRequired = chainPropTypes(s2.element.isRequired, acceptingRef);
function isClassComponent(e62) {
  const { prototype: t52 = {} } = e62;
  return Boolean(t52.isReactComponent);
}
function elementTypeAcceptingRef(e72, t62, n42, o32, r31) {
  const i21 = e72[t62];
  const u22 = r31 || t62;
  if (i21 == null || typeof window === "undefined")
    return null;
  let s21;
  typeof i21 !== "function" || isClassComponent(i21) || (s21 = "Did you accidentally provide a plain function component instead?");
  return s21 !== void 0 ? new Error(`Invalid ${o32} \`${u22}\` supplied to \`${n42}\`. Expected an element type that can hold a ref. ${s21} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
var u2 = chainPropTypes(s2.elementType, elementTypeAcceptingRef);
var s4 = "exact-prop: \u200B";
function exactProp(t72) {
  return false ? t72 : _extends({}, t72, {
    [s4]: (e82) => {
      const n52 = Object.keys(e82).filter((e92) => !t72.hasOwnProperty(e92));
      return n52.length > 0 ? new Error(`The following props are not supported: ${n52.map((e102) => `\`${e102}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
var l3 = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function getFunctionName(e13) {
  const t92 = `${e13}`.match(l3);
  const n62 = t92 && t92[1];
  return n62 || "";
}
function getFunctionComponentName(e14, t102 = "") {
  return e14.displayName || e14.name || getFunctionName(e14) || t102;
}
function getWrappedName(e15, t112, n72) {
  const o42 = getFunctionComponentName(t112);
  return e15.displayName || (o42 !== "" ? `${n72}(${o42})` : n72);
}
function getDisplayName(e16) {
  if (e16 != null) {
    if (typeof e16 === "string")
      return e16;
    if (typeof e16 === "function") {
      return getFunctionComponentName(e16, "Component");
    }
    if (typeof e16 === "object") {
      switch (e16.$$typeof) {
        case j:
          return getWrappedName(e16, e16.render, "ForwardRef");
        case O:
          return getWrappedName(e16, e16.type, "memo");
        default:
          return;
      }
    }
  }
}
function HTMLElementType(e17, t122, n8, o52, r41) {
  if (false)
    return null;
  const i31 = e17[t122];
  const u32 = r41 || t122;
  return i31 == null ? null : i31 && i31.nodeType !== 1 ? new Error(`Invalid ${o52} \`${u32}\` supplied to \`${n8}\`. Expected an HTMLElement.`) : null;
}
typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
var a4 = s2.oneOfType([
  s2.func,
  s2.object
]);
function capitalize(e18) {
  if (typeof e18 !== "string") {
    throw new Error(true ? "MUI: `capitalize(string)` expects a string argument." : formatMuiErrorMessage(7));
  }
  return e18.charAt(0).toUpperCase() + e18.slice(1);
}
function createChainedFunction(...e19) {
  return e19.reduce((e20, t132) => t132 == null ? e20 : function chainedFunction(...n9) {
    e20.apply(this, n9);
    t132.apply(this, n9);
  }, () => {
  });
}
function debounce(e21, t142 = 166) {
  let n10;
  function debounced(...o62) {
    const later = () => {
      e21.apply(this, o62);
    };
    clearTimeout(n10);
    n10 = setTimeout(later, t142);
  }
  debounced.clear = () => {
    clearTimeout(n10);
  };
  return debounced;
}
function ownerDocument(e25) {
  return e25 && e25.ownerDocument || document;
}
function ownerWindow(e26) {
  const t172 = ownerDocument(e26);
  return t172.defaultView || window;
}
function setRef(e29, t192) {
  typeof e29 === "function" ? e29(t192) : e29 && (e29.current = t192);
}
var d2 = typeof window !== "undefined" ? x1 : p1;
var p3 = 0;
function useId(e30) {
  const [t20, n14] = s1(e30);
  const o92 = e30 || t20;
  p1(() => {
    if (t20 == null) {
      p3 += 1;
      n14(`mui-${p3}`);
    }
  }, [
    t20
  ]);
  return o92;
}
function useControlled({ controlled: e32, default: t22, name: n15, state: o10 = "value" }) {
  const { current: i72 } = c1(e32 !== void 0);
  const [u62, s5] = s1(t22);
  const l31 = i72 ? e32 : u62;
  if (true) {
    p1(() => {
      i72 !== (e32 !== void 0) && console.error([
        `MUI: A component is changing the ${i72 ? "" : "un"}controlled ${o10} state of ${n15} to be ${i72 ? "un" : ""}controlled.`,
        "Elements should not switch from uncontrolled to controlled (or vice versa).",
        `Decide between using a controlled or uncontrolled ${n15} element for the lifetime of the component.`,
        "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
        "More info: https://fb.me/react-controlled-components"
      ].join("\n"));
    }, [
      o10,
      n15,
      e32
    ]);
    const { current: u72 } = c1(t22);
    p1(() => {
      i72 || u72 === t22 || console.error([
        `MUI: A component is changing the default ${o10} state of an uncontrolled ${n15} after being initialized. To suppress this warning opt to use a controlled ${n15}.`
      ].join("\n"));
    }, [
      JSON.stringify(t22)
    ]);
  }
  const c21 = u((e33) => {
    i72 || s5(e33);
  }, []);
  return [
    l31,
    c21
  ];
}
function useEventCallback(e34) {
  const t23 = c1(e34);
  d2(() => {
    t23.current = e34;
  });
  return u((...e35) => (0, t23.current)(...e35), []);
}
function useForkRef(e36, t24) {
  return F(() => e36 == null && t24 == null ? null : (n16) => {
    setRef(e36, n16);
    setRef(t24, n16);
  }, [
    e36,
    t24
  ]);
}
var f2 = true;
var m3 = false;
var h2;
var y2 = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};
function focusTriggersKeyboardModality(e37) {
  const { type: t, tagName: n17 } = e37;
  return !(n17 !== "INPUT" || !y2[t] || e37.readOnly) || n17 === "TEXTAREA" && !e37.readOnly || !!e37.isContentEditable;
}
function handleKeyDown(e38) {
  e38.metaKey || e38.altKey || e38.ctrlKey || (f2 = true);
}
function handlePointerDown() {
  f2 = false;
}
function handleVisibilityChange() {
  this.visibilityState === "hidden" && m3 && (f2 = true);
}
function prepare(e39) {
  e39.addEventListener("keydown", handleKeyDown, true);
  e39.addEventListener("mousedown", handlePointerDown, true);
  e39.addEventListener("pointerdown", handlePointerDown, true);
  e39.addEventListener("touchstart", handlePointerDown, true);
  e39.addEventListener("visibilitychange", handleVisibilityChange, true);
}
function isFocusVisible(e40) {
  const { target: t25 } = e40;
  try {
    return t25.matches(":focus-visible");
  } catch (e5) {
  }
  return f2 || focusTriggersKeyboardModality(t25);
}
function useIsFocusVisible() {
  const e41 = u((e42) => {
    e42 != null && prepare(e42.ownerDocument);
  }, []);
  const t26 = c1(false);
  function handleBlurVisible() {
    if (t26.current) {
      m3 = true;
      window.clearTimeout(h2);
      h2 = window.setTimeout(() => {
        m3 = false;
      }, 100);
      t26.current = false;
      return true;
    }
    return false;
  }
  function handleFocusVisible(e43) {
    if (isFocusVisible(e43)) {
      t26.current = true;
      return true;
    }
    return false;
  }
  return {
    isFocusVisibleRef: t26,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: e41
  };
}
function getScrollbarSize(e44) {
  const t27 = e44.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t27);
}
var usePreviousProps = (e47) => {
  const t30 = c1({});
  p1(() => {
    t30.current = e47;
  });
  return t30.current;
};
var g2 = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px"
};
function getTypeByValue(e48) {
  const t31 = typeof e48;
  switch (t31) {
    case "number":
      return Number.isNaN(e48) ? "NaN" : Number.isFinite(e48) ? e48 !== Math.floor(e48) ? "float" : "number" : "Infinity";
    case "object":
      return e48 === null ? "null" : e48.constructor.name;
    default:
      return t31;
  }
}
function ponyfillIsInteger(e49) {
  return typeof e49 === "number" && isFinite(e49) && Math.floor(e49) === e49;
}
var w2 = Number.isInteger || ponyfillIsInteger;
function requiredInteger(e50, t32, n19, o12) {
  const r82 = e50[t32];
  if (r82 == null || !w2(r82)) {
    const e51 = getTypeByValue(r82);
    return new RangeError(`Invalid ${o12} \`${t32}\` of type \`${e51}\` supplied to \`${n19}\`, expected \`integer\`.`);
  }
  return null;
}
function validator(e52, t33, ...n20) {
  const o13 = e52[t33];
  return o13 === void 0 ? null : requiredInteger(e52, t33, ...n20);
}
function validatorNoop() {
  return null;
}
validator.isRequired = requiredInteger;
validatorNoop.isRequired = validatorNoop;
function resolveProps(t34, n21) {
  const o14 = _extends({}, n21);
  Object.keys(t34).forEach((e5) => {
    o14[e5] === void 0 && (o14[e5] = t34[e5]);
  });
  return o14;
}
function stripDiacritics(e111) {
  return typeof e111.normalize !== "undefined" ? e111.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : e111;
}
function createFilterOptions(e23 = {}) {
  const {
    ignoreAccents: t111 = true,
    ignoreCase: n14 = true,
    limit: o14,
    matchFrom: r19 = "any",
    stringify: s19,
    trim: i15 = false
  } = e23;
  return (e32, { inputValue: l16, getOptionLabel: a19 }) => {
    let u20 = i15 ? l16.trim() : l16;
    n14 && (u20 = u20.toLowerCase());
    t111 && (u20 = stripDiacritics(u20));
    const c14 = e32.filter((e42) => {
      let o22 = (s19 || a19)(e42);
      n14 && (o22 = o22.toLowerCase());
      t111 && (o22 = stripDiacritics(o22));
      return r19 === "start" ? o22.indexOf(u20) === 0 : o22.indexOf(u20) > -1;
    });
    return typeof o14 === "number" ? c14.slice(0, o14) : c14;
  };
}
createFilterOptions();
function composeClasses(s110, e20, o15) {
  const c15 = {};
  Object.keys(s110).forEach((r) => {
    c15[r] = s110[r].reduce((s20, c16) => {
      if (c16) {
        o15 && o15[c16] && s20.push(o15[c16]);
        s20.push(e20(c16));
      }
      return s20;
    }, []).join(" ");
  });
  return c15;
}
var defaultGenerator = (e112) => e112;
var createClassNameGenerator = () => {
  let e24 = defaultGenerator;
  return {
    configure(t112) {
      e24 = t112;
    },
    generate(t26) {
      return e24(t26);
    },
    reset() {
      e24 = defaultGenerator;
    }
  };
};
var e3 = createClassNameGenerator();
var t4 = {
  active: "Mui-active",
  checked: "Mui-checked",
  completed: "Mui-completed",
  disabled: "Mui-disabled",
  error: "Mui-error",
  expanded: "Mui-expanded",
  focused: "Mui-focused",
  focusVisible: "Mui-focusVisible",
  required: "Mui-required",
  selected: "Mui-selected"
};
function generateUtilityClass(i16, r20) {
  const s22 = t4[r20];
  return s22 || `${e3.generate(i16)}-${r20}`;
}
function generateUtilityClasses(t27, s111) {
  const a20 = {};
  s111.forEach((s23) => {
    a20[s23] = generateUtilityClass(t27, s23);
  });
  return a20;
}
var r5 = {};
var e4 = Object.getOwnPropertySymbols;
var t5 = Object.prototype.hasOwnProperty;
var n4 = Object.prototype.propertyIsEnumerable;
function toObject(r110) {
  if (r110 === null || r110 === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(r110);
}
function shouldUseNative() {
  try {
    if (!Object.assign)
      return false;
    var r22 = new String("abc");
    r22[5] = "de";
    if (Object.getOwnPropertyNames(r22)[0] === "5")
      return false;
    var e113 = {};
    for (var t113 = 0; t113 < 10; t113++) {
      e113["_" + String.fromCharCode(t113)] = t113;
    }
    var n15 = Object.getOwnPropertyNames(e113).map(function(r) {
      return e113[r];
    });
    if (n15.join("") !== "0123456789")
      return false;
    var a110 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(r32) {
      a110[r32] = r32;
    });
    return Object.keys(Object.assign({}, a110)).join("") === "abcdefghijklmnopqrst";
  } catch (r) {
    return false;
  }
}
r5 = shouldUseNative() ? Object.assign : function(r42, a18) {
  var o16;
  var c17 = toObject(r42);
  var i17;
  for (var s24 = 1; s24 < arguments.length; s24++) {
    o16 = Object(arguments[s24]);
    for (var f25 in o16)
      t5.call(o16, f25) && (c17[f25] = o16[f25]);
    if (e4) {
      i17 = e4(o16);
      for (var l17 = 0; l17 < i17.length; l17++) {
        n4.call(o16, i17[l17]) && (c17[i17[l17]] = o16[i17[l17]]);
      }
    }
  }
  return c17;
};
var a5 = r5;
var mod1 = {
  default: a5
};
"default" in mod1 ? mod1.default : mod1;
var o3 = "default" in mod ? mod.default : mod;
var a6 = {};
var f3 = o3;
var n5 = 60103;
a6.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  s5 = Symbol.for;
  n5 = s5("react.element");
  a6.Fragment = s5("react.fragment");
}
var s5;
var l4 = f3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
var _2 = Object.prototype.hasOwnProperty;
var i5 = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
function q1(r111, e114, t114) {
  var o17, a111 = {}, f110 = null, s25 = null;
  t114 !== void 0 && (f110 = "" + t114);
  e114.key !== void 0 && (f110 = "" + e114.key);
  e114.ref !== void 0 && (s25 = e114.ref);
  for (o17 in e114) {
    _2.call(e114, o17) && !i5.hasOwnProperty(o17) && (a111[o17] = e114[o17]);
  }
  if (r111 && r111.defaultProps) {
    for (o17 in e114 = r111.defaultProps, e114) {
      a111[o17] === void 0 && (a111[o17] = e114[o17]);
    }
  }
  return {
    $$typeof: n5,
    type: r111,
    key: f110,
    ref: s25,
    props: a111,
    _owner: l4.current
  };
}
a6.jsx = q1;
a6.jsxs = q1;
var u3 = a6.Fragment;
var p4 = a6.jsx;
var y3 = a6.jsxs;
function getBackdropUtilityClass(e115) {
  return generateUtilityClass("MuiBackdrop", e115);
}
generateUtilityClasses("MuiBackdrop", [
  "root",
  "invisible"
]);
var l5 = [
  "classes",
  "className",
  "invisible",
  "component",
  "components",
  "componentsProps",
  "theme"
];
var useUtilityClasses = (e25) => {
  const { classes: o18, invisible: s112 } = e25;
  const t115 = {
    root: [
      "root",
      s112 && "invisible"
    ]
  };
  return composeClasses(t115, getBackdropUtilityClass, o18);
};
var f4 = l1(function BackdropUnstyled(s26, t28) {
  const {
    classes: i18,
    className: c18,
    invisible: a112 = false,
    component: p15 = "div",
    components: f111 = {},
    componentsProps: b17 = {},
    theme: d20
  } = s26, u21 = _objectWithoutPropertiesLoose(s26, l5);
  const v13 = _extends({}, s26, {
    classes: i18,
    invisible: a112
  });
  const y15 = useUtilityClasses(v13);
  const h15 = f111.Root || p15;
  const N42 = b17.root || {};
  return p4(h15, _extends({
    "aria-hidden": true
  }, N42, !isHostComponent(h15) && {
    as: p15,
    ownerState: _extends({}, v13, N42.ownerState),
    theme: d20
  }, {
    ref: t28
  }, u21, {
    className: clsx_m(y15.root, N42.className, c18)
  }));
});
true ? f4.propTypes = {
  children: s2.node,
  classes: s2.object,
  className: s2.string,
  component: s2.elementType,
  components: s2.shape({
    Root: s2.elementType
  }),
  componentsProps: s2.object,
  invisible: s2.bool
} : void 0;
function useBadge(e116) {
  const {
    anchorOrigin: o19 = {
      vertical: "top",
      horizontal: "right"
    },
    badgeContent: t116,
    invisible: n16,
    max: a113 = 99,
    showZero: r112 = false,
    variant: s113 = "standard"
  } = e116;
  const c19 = usePreviousProps({
    anchorOrigin: o19,
    badgeContent: t116,
    max: a113,
    variant: s113
  });
  let l18 = n16;
  n16 == null && (t116 === 0 && !r112 || t116 == null && s113 !== "dot") && (l18 = true);
  const {
    anchorOrigin: m16 = o19,
    badgeContent: g13,
    max: p16 = a113,
    variant: d110 = s113
  } = l18 ? c19 : e116;
  let h16 = "";
  d110 !== "dot" && (h16 = g13 && Number(g13) > p16 ? `${p16}+` : g13);
  return {
    anchorOrigin: m16,
    badgeContent: g13,
    invisible: l18,
    max: p16,
    variant: d110,
    displayValue: h16
  };
}
function getBadgeUtilityClass(e26) {
  return generateUtilityClass("MuiBadge", e26);
}
generateUtilityClasses("MuiBadge", [
  "root",
  "badge",
  "dot",
  "standard",
  "anchorOriginTopLeft",
  "anchorOriginTopRight",
  "anchorOriginBottomLeft",
  "anchorOriginBottomRight",
  "invisible"
]);
var h3 = [
  "anchorOrigin",
  "classes",
  "badgeContent",
  "component",
  "children",
  "className",
  "components",
  "componentsProps",
  "invisible",
  "max",
  "showZero",
  "variant"
];
var useUtilityClasses1 = (e31) => {
  const { variant: o23, anchorOrigin: t29, invisible: n22, classes: a21 } = e31;
  const i19 = {
    root: [
      "root"
    ],
    badge: [
      "badge",
      o23,
      `anchorOrigin${capitalize(t29.vertical)}${capitalize(t29.horizontal)}`,
      n22 && "invisible"
    ]
  };
  return composeClasses(i19, getBadgeUtilityClass, a21);
};
var b2 = l1(function BadgeUnstyled(t32, n32) {
  const {
    anchorOrigin: i22 = {
      vertical: "top",
      horizontal: "right"
    },
    classes: r23,
    component: s27,
    children: l21,
    className: m21,
    components: d21 = {},
    componentsProps: b18 = {},
    max: u22 = 99,
    showZero: f26 = false,
    variant: v14 = "standard"
  } = t32, O3 = _objectWithoutPropertiesLoose(t32, h3);
  const {
    anchorOrigin: x9,
    badgeContent: C72,
    max: y16,
    variant: B3,
    displayValue: N5,
    invisible: R5
  } = useBadge(_extends({}, t32, {
    anchorOrigin: i22,
    max: u22,
    variant: v14
  }));
  const j62 = _extends({}, t32, {
    anchorOrigin: x9,
    badgeContent: C72,
    classes: r23,
    invisible: R5,
    max: y16,
    variant: B3,
    showZero: f26
  });
  const w92 = useUtilityClasses1(j62);
  const T4 = s27 || d21.Root || "span";
  const U2 = appendOwnerState(T4, _extends({}, O3, b18.root), j62);
  const Z2 = d21.Badge || "span";
  const z5 = appendOwnerState(Z2, b18.badge, j62);
  return y3(T4, _extends({}, U2, {
    ref: n32
  }, O3, {
    className: clsx_m(w92.root, U2.className, m21),
    children: [
      l21,
      p4(Z2, _extends({}, z5, {
        className: clsx_m(w92.badge, z5.className),
        children: N5
      }))
    ]
  }));
});
true ? b2.propTypes = {
  anchorOrigin: s2.shape({
    horizontal: s2.oneOf([
      "left",
      "right"
    ]).isRequired,
    vertical: s2.oneOf([
      "bottom",
      "top"
    ]).isRequired
  }),
  badgeContent: s2.node,
  children: s2.node,
  classes: s2.object,
  className: s2.string,
  component: s2.elementType,
  components: s2.shape({
    Badge: s2.elementType,
    Root: s2.elementType
  }),
  componentsProps: s2.object,
  invisible: s2.bool,
  max: s2.number,
  showZero: s2.bool,
  variant: s2.string
} : void 0;
function getButtonUnstyledUtilityClass(e117) {
  return generateUtilityClass("ButtonUnstyled", e117);
}
generateUtilityClasses("ButtonUnstyled", [
  "root",
  "active",
  "disabled",
  "focusVisible"
]);
function useButton(t117) {
  var n17;
  const {
    component: s114,
    components: u110 = {},
    disabled: a114 = false,
    href: i110,
    ref: p17,
    tabIndex: m17 = 0,
    to: d111,
    type: v13
  } = t117;
  const b19 = c1();
  const [y17, g14] = s1(false);
  const { isFocusVisibleRef: U3, onFocus: V42, onBlur: B4, ref: T5 } = useIsFocusVisible();
  const [h17, F3] = s1(false);
  a114 && h17 && F3(false);
  p1(() => {
    U3.current = h17;
  }, [
    h17,
    U3
  ]);
  const createHandleMouseLeave = (e27) => (t210) => {
    var o110;
    h17 && t210.preventDefault();
    (o110 = e27.onMouseLeave) == null ? void 0 : o110.call(e27, t210);
  };
  const createHandleBlur = (e32) => (t33) => {
    var o24;
    B4(t33);
    U3.current === false && F3(false);
    (o24 = e32.onBlur) == null ? void 0 : o24.call(e32, t33);
  };
  const createHandleFocus = (e41) => (t41) => {
    var o31;
    b19.current || (b19.current = t41.currentTarget);
    V42(t41);
    if (U3.current === true) {
      var n23;
      F3(true);
      (n23 = e41.onFocusVisible) == null ? void 0 : n23.call(e41, t41);
    }
    (o31 = e41.onFocus) == null ? void 0 : o31.call(e41, t41);
  };
  const C8 = (n17 = s114 != null ? s114 : u110.Root) != null ? n17 : "button";
  const isNonNativeButton = () => {
    const e5 = b19.current;
    return C8 !== "button" && !((e5 == null ? void 0 : e5.tagName) === "A" && e5 != null && e5.href);
  };
  const createHandleMouseDown = (e62) => (t51) => {
    var o42;
    t51.target !== t51.currentTarget || a114 || g14(true);
    (o42 = e62.onMouseDown) == null ? void 0 : o42.call(e62, t51);
  };
  const createHandleMouseUp = (e72) => (t62) => {
    var o52;
    t62.target === t62.currentTarget && g14(false);
    (o52 = e72.onMouseUp) == null ? void 0 : o52.call(e72, t62);
  };
  const createHandleKeyDown = (e82) => (t72) => {
    var o62;
    t72.target === t72.currentTarget && isNonNativeButton() && t72.key === " " && t72.preventDefault();
    t72.target !== t72.currentTarget || t72.key !== " " || a114 || g14(true);
    (o62 = e82.onKeyDown) == null ? void 0 : o62.call(e82, t72);
    if (t72.target === t72.currentTarget && isNonNativeButton() && t72.key === "Enter" && !a114) {
      var n33;
      t72.preventDefault();
      (n33 = e82.onClick) == null ? void 0 : n33.call(e82, t72);
    }
  };
  const createHandleKeyUp = (e92) => (t82) => {
    var o72;
    t82.target === t82.currentTarget && g14(false);
    (o72 = e92.onKeyUp) == null ? void 0 : o72.call(e92, t82);
    if (t82.target === t82.currentTarget && isNonNativeButton() && t82.key === " " && !t82.defaultPrevented) {
      var n41;
      (n41 = e92.onClick) == null ? void 0 : n41.call(e92, t82);
    }
  };
  const N6 = useForkRef(T5, b19);
  const R6 = useForkRef(p17, N6);
  const [D42, k6] = s1("");
  const updateRef = (e102) => {
    var t92;
    k6((t92 = e102 == null ? void 0 : e102.tagName) != null ? t92 : "");
    setRef(R6, e102);
  };
  const M42 = {};
  if (D42 === "BUTTON") {
    M42.type = v13 != null ? v13 : "button";
    M42.disabled = a114;
  } else if (D42 !== "") {
    i110 || d111 || (M42.role = "button");
    a114 && (M42["aria-disabled"] = a114);
  }
  const getRootProps = (o82) => {
    const n51 = extractEventHandlers(t117);
    const s28 = _extends({}, n51, o82);
    const r113 = {
      onBlur: createHandleBlur(s28),
      onFocus: createHandleFocus(s28),
      onKeyDown: createHandleKeyDown(s28),
      onKeyUp: createHandleKeyUp(s28),
      onMouseDown: createHandleMouseDown(s28),
      onMouseLeave: createHandleMouseLeave(s28),
      onMouseUp: createHandleMouseUp(s28)
    };
    const l19 = _extends({}, s28, r113);
    delete l19.onFocusVisible;
    return _extends({
      tabIndex: a114 ? -1 : m17,
      type: v13,
      ref: updateRef
    }, M42, l19);
  };
  return {
    getRootProps,
    focusVisible: h17,
    setFocusVisible: F3,
    disabled: a114,
    active: y17
  };
}
var v1 = [
  "className",
  "component",
  "components",
  "componentsProps",
  "children",
  "disabled",
  "action",
  "onBlur",
  "onClick",
  "onFocus",
  "onFocusVisible",
  "onKeyDown",
  "onKeyUp",
  "onMouseLeave"
];
var useUtilityClasses2 = (e112) => {
  const { active: t102, disabled: o92, focusVisible: n62 } = e112;
  const s31 = {
    root: [
      "root",
      o92 && "disabled",
      n62 && "focusVisible",
      t102 && "active"
    ]
  };
  return composeClasses(s31, getButtonUnstyledUtilityClass, {});
};
var b3 = l1(function ButtonUnstyled(n72, r24) {
  var c110;
  const {
    className: u23,
    component: a22,
    components: i23 = {},
    componentsProps: f112 = {},
    children: d22,
    action: b21
  } = n72, y18 = _objectWithoutPropertiesLoose(n72, v1);
  const g15 = c1();
  const U4 = useForkRef(g15, r24);
  const {
    active: V5,
    focusVisible: B5,
    setFocusVisible: T6,
    getRootProps: h18
  } = useButton(_extends({}, n72, {
    ref: U4
  }));
  w(b21, () => ({
    focusVisible: () => {
      T6(true);
      g15.current.focus();
    }
  }), [
    T6
  ]);
  const F4 = _extends({}, n72, {
    active: V5,
    focusVisible: B5
  });
  const C9 = (c110 = a22 != null ? a22 : i23.Root) != null ? c110 : "button";
  const N7 = appendOwnerState(C9, _extends({}, y18, f112.root), F4);
  const R7 = useUtilityClasses2(F4);
  return p4(C9, _extends({}, h18(), N7, {
    className: clsx_m(R7.root, u23, N7.className),
    children: d22
  }));
});
true ? b3.propTypes = {
  action: s2.oneOfType([
    s2.func,
    s2.shape({
      current: s2.shape({
        focusVisible: s2.func.isRequired
      })
    })
  ]),
  children: s2.node,
  className: s2.string,
  component: s2.elementType,
  components: s2.shape({
    Root: s2.elementType
  }),
  componentsProps: s2.object,
  disabled: s2.bool,
  onClick: s2.func,
  onFocusVisible: s2.func
} : void 0;
function mapEventPropToEvent(e118) {
  return e118.substring(2).toLowerCase();
}
function clickedRootScrollbar(e28, t118) {
  return t118.documentElement.clientWidth < e28.clientX || t118.documentElement.clientHeight < e28.clientY;
}
function ClickAwayListener(t211) {
  const {
    children: c111,
    disableReactTree: s115 = false,
    mouseEvent: i20 = "onClick",
    onClickAway: l20,
    touchEvent: a23 = "onTouchEnd"
  } = t211;
  const f27 = c1(false);
  const p18 = c1(null);
  const m18 = c1(false);
  const E82 = c1(false);
  p1(() => {
    setTimeout(() => {
      m18.current = true;
    }, 0);
    return () => {
      m18.current = false;
    };
  }, []);
  const d23 = useForkRef(c111.ref, p18);
  const v15 = useEventCallback((e33) => {
    const t34 = E82.current;
    E82.current = false;
    const n18 = ownerDocument(p18.current);
    if (!m18.current || !p18.current || "clientX" in e33 && clickedRootScrollbar(e33, n18)) {
      return;
    }
    if (f27.current) {
      f27.current = false;
      return;
    }
    let r114;
    r114 = e33.composedPath ? e33.composedPath().indexOf(p18.current) > -1 : !n18.documentElement.contains(e33.target) || p18.current.contains(e33.target);
    r114 || !s115 && t34 || l20(e33);
  });
  const createHandleSynthetic = (e5) => (t42) => {
    E82.current = true;
    const n24 = c111.props[e5];
    n24 && n24(t42);
  };
  const h19 = {
    ref: d23
  };
  a23 !== false && (h19[a23] = createHandleSynthetic(a23));
  p1(() => {
    if (a23 !== false) {
      const e42 = mapEventPropToEvent(a23);
      const t52 = ownerDocument(p18.current);
      const handleTouchMove = () => {
        f27.current = true;
      };
      t52.addEventListener(e42, v15);
      t52.addEventListener("touchmove", handleTouchMove);
      return () => {
        t52.removeEventListener(e42, v15);
        t52.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [
    v15,
    a23
  ]);
  i20 !== false && (h19[i20] = createHandleSynthetic(i20));
  p1(() => {
    if (i20 !== false) {
      const e5 = mapEventPropToEvent(i20);
      const t62 = ownerDocument(p18.current);
      t62.addEventListener(e5, v15);
      return () => {
        t62.removeEventListener(e5, v15);
      };
    }
  }, [
    v15,
    i20
  ]);
  return p4(i1, {
    children: I(c111, h19)
  });
}
true ? ClickAwayListener.propTypes = {
  children: i4.isRequired,
  disableReactTree: s2.bool,
  mouseEvent: s2.oneOf([
    "onClick",
    "onMouseDown",
    "onMouseUp",
    false
  ]),
  onClickAway: s2.func.isRequired,
  touchEvent: s2.oneOf([
    "onTouchEnd",
    "onTouchStart",
    false
  ])
} : void 0;
ClickAwayListener.propTypes = exactProp(ClickAwayListener.propTypes);
var t6 = t1(void 0);
t6.displayName = "FormControlUnstyledContext";
function useFormControlUnstyled() {
  return r1(t6);
}
var d3 = generateUtilityClasses("MuiFormControl", [
  "root",
  "disabled"
]);
var p5 = [
  "defaultValue",
  "children",
  "className",
  "component",
  "components",
  "componentsProps",
  "disabled",
  "error",
  "focused",
  "onChange",
  "required",
  "value"
];
function hasValue(e29) {
  return e29 != null && !(Array.isArray(e29) && e29.length === 0) && e29 !== "";
}
var f5 = l1(function FormControlUnstyled(t119, i111) {
  var u24;
  const {
    defaultValue: c112,
    children: f113,
    className: b20,
    component: h20,
    components: y19 = {},
    componentsProps: C10 = {},
    disabled: v16 = false,
    error: g16 = false,
    focused: F5,
    onChange: U5,
    required: N8 = false,
    value: j7
  } = t119, V6 = _objectWithoutPropertiesLoose(t119, p5);
  const [x10, _7] = useControlled({
    controlled: j7,
    default: c112,
    name: "FormControl",
    state: "value"
  });
  const q42 = hasValue(x10);
  const [E9, P] = s1(false);
  v16 && E9 && P(false);
  const T7 = F5 === void 0 || v16 ? E9 : F5;
  const R8 = _extends({}, t119, {
    disabled: v16,
    error: g16,
    filled: q42,
    focused: T7,
    required: N8
  });
  let registerEffect = () => {
  };
  if (true) {
    const e34 = c1(false);
    registerEffect = () => {
      e34.current && console.error([
        "MUI: There are multiple `Input` components inside a FormControl.",
        "This creates visual inconsistencies, only use one `Input`."
      ].join("\n"));
      e34.current = true;
      return () => {
        e34.current = false;
      };
    };
  }
  const handleChange = (e43) => {
    _7(e43.target.value);
    U5 == null ? void 0 : U5(e43);
  };
  const I32 = {
    disabled: v16,
    error: g16,
    filled: q42,
    focused: T7,
    onBlur: () => {
      P(false);
    },
    onChange: handleChange,
    onFocus: () => {
      P(true);
    },
    registerEffect,
    required: N8,
    value: x10 != null ? x10 : ""
  };
  const M5 = (u24 = h20 != null ? h20 : y19.Root) != null ? u24 : "div";
  const A3 = appendOwnerState(M5, _extends({}, V6, C10.root), R8);
  return p4(t6.Provider, {
    value: I32,
    children: p4(M5, _extends({
      ref: i111
    }, A3, {
      className: clsx_m(d3.root, b20, A3 == null ? void 0 : A3.className, v16 && d3.disabled),
      children: f113
    }))
  });
});
true ? f5.propTypes = {
  children: s2.node,
  className: s2.string,
  component: s2.elementType,
  components: s2.shape({
    Root: s2.elementType
  }),
  componentsProps: s2.object,
  defaultValue: s2.any,
  disabled: s2.bool,
  error: s2.bool,
  focused: s2.bool,
  onChange: s2.func,
  required: s2.bool,
  value: s2.any
} : void 0;
var b4 = generateUtilityClasses("MuiInput", [
  "root",
  "formControl",
  "focused",
  "disabled",
  "error",
  "multiline",
  "input",
  "inputMultiline",
  "inputTypeSearch",
  "adornedStart",
  "adornedEnd"
]);
function useInput(o111, t120) {
  const {
    defaultValue: r115,
    disabled: l110 = false,
    error: a115 = false,
    onBlur: s116,
    onChange: u111,
    onFocus: m19,
    required: f114 = false,
    value: b110
  } = o111;
  const y110 = useFormControlUnstyled();
  let v17;
  let C11;
  let g17;
  let h21;
  if (y110) {
    var w10, x11, I4;
    v17 = y110.value;
    g17 = (w10 = y110.disabled) != null && w10;
    C11 = (x11 = y110.required) != null && x11;
    h21 = (I4 = y110.error) != null && I4;
  } else {
    v17 = b110;
    g17 = l110;
    C11 = f114;
    h21 = a115;
  }
  const { current: R9 } = c1(v17 != null);
  const N9 = u((e210) => {
    e210 && e210.nodeName !== "INPUT" && !e210.focus && console.error([
      "MUI: You have provided a `components.Input` to the input component",
      "that does not correctly handle the `ref` prop.",
      "Make sure the `ref` prop is called with a HTMLInputElement."
    ].join("\n"));
  }, []);
  const U6 = c1(null);
  const F6 = useForkRef(t120, N9);
  const B6 = useForkRef(U6, F6);
  const [E10, T8] = s1(false);
  p1(() => {
    if (!y110 && g17 && E10) {
      T8(false);
      s116 == null ? void 0 : s116();
    }
  }, [
    y110,
    g17,
    E10,
    s116
  ]);
  const handleFocus = (e35) => (o25) => {
    var n19;
    if (y110 != null && y110.disabled)
      o25.stopPropagation();
    else {
      (n19 = e35.onFocus) == null ? void 0 : n19.call(e35, o25);
      if (y110 && y110.onFocus) {
        var t212;
        y110 == null || (t212 = y110.onFocus) == null ? void 0 : t212.call(y110);
      } else
        T8(true);
    }
  };
  const handleBlur = (e44) => (o32) => {
    var n25;
    (n25 = e44.onBlur) == null ? void 0 : n25.call(e44, o32);
    y110 && y110.onBlur ? y110.onBlur() : T8(false);
  };
  const handleChange = (e5) => (o42, ...n34) => {
    var t35, r25;
    if (!R9) {
      const e62 = o42.target || U6.current;
      if (e62 == null) {
        throw new Error(true ? "MUI: Expected valid input target. Did you use a custom `components.Input` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info." : formatMuiErrorMessage(17));
      }
    }
    y110 == null || (t35 = y110.onChange) == null ? void 0 : t35.call(y110, o42);
    (r25 = e5.onChange) == null ? void 0 : r25.call(e5, o42, ...n34);
  };
  const handleClick = (e72) => (o52) => {
    var n42;
    U6.current && o52.currentTarget === o52.target && U6.current.focus();
    (n42 = e72.onClick) == null ? void 0 : n42.call(e72, o52);
  };
  const getRootProps = (n52) => {
    const t43 = extractEventHandlers(o111, [
      "onBlur",
      "onChange",
      "onFocus"
    ]);
    const r33 = _extends({}, t43, extractEventHandlers(n52));
    return _extends({}, n52, r33, {
      onClick: handleClick(r33)
    });
  };
  const getInputProps = (o62) => {
    const n62 = {
      onBlur: s116,
      onChange: u111,
      onFocus: m19
    };
    const t53 = _extends({}, n62, extractEventHandlers(o62));
    const l22 = _extends({}, o62, t53, {
      onBlur: handleBlur(t53),
      onChange: handleChange(t53),
      onFocus: handleFocus(t53)
    });
    return _extends({}, l22, {
      "aria-invalid": h21 || void 0,
      defaultValue: r115,
      ref: B6,
      value: v17,
      required: C11,
      disabled: g17
    });
  };
  return {
    disabled: g17,
    error: h21,
    focused: E10,
    formControlContext: y110,
    getInputProps,
    getRootProps,
    required: C11,
    value: v17
  };
}
var y4 = [
  "aria-describedby",
  "aria-label",
  "aria-labelledby",
  "autoComplete",
  "autoFocus",
  "className",
  "component",
  "components",
  "componentsProps",
  "defaultValue",
  "disabled",
  "endAdornment",
  "error",
  "id",
  "maxRows",
  "minRows",
  "multiline",
  "name",
  "onClick",
  "onChange",
  "onKeyDown",
  "onKeyUp",
  "onFocus",
  "onBlur",
  "placeholder",
  "readOnly",
  "required",
  "rows",
  "type",
  "startAdornment",
  "value"
];
var v2 = l1(function InputUnstyled(n72, r43) {
  var s29, u25, i112, d112, c113;
  const {
    "aria-describedby": p19,
    "aria-label": v21,
    "aria-labelledby": C12,
    autoComplete: g18,
    autoFocus: h22,
    className: w11,
    component: x12,
    components: I5 = {},
    componentsProps: R10 = {},
    defaultValue: N10,
    disabled: U7,
    endAdornment: F7,
    error: B7,
    id: E11,
    maxRows: T9,
    minRows: P,
    multiline: V7 = false,
    name: D5,
    onClick: j8,
    onChange: k7,
    onKeyDown: q5,
    onKeyUp: K22,
    onFocus: M6,
    onBlur: O4,
    placeholder: _8,
    readOnly: A4,
    required: S5,
    rows: L4,
    type: Y2 = "text",
    startAdornment: H22,
    value: W3
  } = n72, z6 = _objectWithoutPropertiesLoose(n72, y4);
  const {
    getRootProps: G2,
    getInputProps: J22,
    focused: Q22,
    formControlContext: X2,
    error: Z3,
    disabled: $42
  } = useInput({
    disabled: U7,
    defaultValue: N10,
    error: B7,
    onBlur: O4,
    onClick: j8,
    onChange: k7,
    onFocus: M6,
    required: S5,
    value: W3
  }, (s29 = R10.input) == null ? void 0 : s29.ref);
  const ee1 = _extends({}, n72, {
    disabled: $42,
    error: Z3,
    focused: Q22,
    formControlContext: X2,
    multiline: V7,
    type: Y2
  });
  const oe2 = clsx_m($42 && b4.disabled, Z3 && b4.error, Q22 && b4.focused, Boolean(X2) && b4.formControl, V7 && b4.multiline, Boolean(H22) && b4.adornedStart, Boolean(F7) && b4.adornedEnd);
  const ne2 = clsx_m($42 && b4.disabled, V7 && b4.multiline);
  const te1 = {
    "aria-describedby": p19,
    "aria-label": v21,
    "aria-labelledby": C12,
    autoComplete: g18,
    autoFocus: h22,
    id: E11,
    onKeyDown: q5,
    onKeyUp: K22,
    name: D5,
    placeholder: _8,
    readOnly: A4,
    type: Y2
  };
  const re = (u25 = x12 != null ? x12 : I5.Root) != null ? u25 : "div";
  const le2 = appendOwnerState(re, _extends({}, G2(_extends({}, z6, R10.root)), {
    className: clsx_m(b4.root, oe2, w11, (i112 = R10.root) == null ? void 0 : i112.className)
  }), ee1);
  let ae = (d112 = I5.Input) != null ? d112 : "input";
  let se2 = appendOwnerState(ae, _extends({}, J22(_extends({}, R10.input, te1)), {
    className: clsx_m(b4.input, ne2, (c113 = R10.input) == null ? void 0 : c113.className)
  }), ee1);
  if (V7) {
    var ue2, ie;
    const o72 = isHostComponent((ue2 = I5.Textarea) != null ? ue2 : "textarea");
    if (L4) {
      (P || T9) && console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.");
      se2 = _extends({
        type: void 0,
        minRows: o72 ? void 0 : L4,
        maxRows: o72 ? void 0 : L4
      }, se2);
    } else {
      se2 = _extends({
        type: void 0,
        maxRows: o72 ? void 0 : T9,
        minRows: o72 ? void 0 : P
      }, se2);
    }
    ae = (ie = I5.Textarea) != null ? ie : "textarea";
  }
  return y3(re, _extends({}, le2, {
    ref: r43,
    children: [
      H22,
      p4(ae, _extends({}, se2)),
      F7
    ]
  }));
});
true ? v2.propTypes = {
  "aria-describedby": s2.string,
  "aria-label": s2.string,
  "aria-labelledby": s2.string,
  autoComplete: s2.string,
  autoFocus: s2.bool,
  children: s2.node,
  className: s2.string,
  component: s2.elementType,
  components: s2.shape({
    Input: s2.elementType,
    Root: s2.elementType,
    Textarea: s2.elementType
  }),
  componentsProps: s2.object,
  defaultValue: s2.any,
  disabled: s2.bool,
  endAdornment: s2.node,
  error: s2.bool,
  id: s2.string,
  maxRows: s2.number,
  minRows: s2.number,
  multiline: s2.bool,
  name: s2.string,
  onBlur: s2.func,
  onChange: s2.func,
  onClick: s2.func,
  onFocus: s2.func,
  onKeyDown: s2.func,
  onKeyUp: s2.func,
  placeholder: s2.string,
  readOnly: s2.bool,
  required: s2.bool,
  rows: s2.number,
  startAdornment: s2.node,
  type: s2.string,
  value: s2.any
} : void 0;
var t7 = window.ReactDOM;
var c3 = t7;
function getContainer(e119) {
  return typeof e119 === "function" ? e119() : e119;
}
var a7 = l1(function Portal(r116, l111) {
  const { children: p110, container: a116, disablePortal: s30 = false } = r116;
  const [c20, f28] = s1(null);
  const u26 = useForkRef(E(p110) ? p110.ref : null, l111);
  d2(() => {
    s30 || f28(getContainer(a116) || document.body);
  }, [
    a116,
    s30
  ]);
  d2(() => {
    if (c20 && !s30) {
      setRef(l111, c20);
      return () => {
        setRef(l111, null);
      };
    }
  }, [
    l111,
    c20,
    s30
  ]);
  return s30 ? E(p110) ? I(p110, {
    ref: u26
  }) : p110 : c20 ? createPortal(p110, c20) : c20;
});
true ? a7.propTypes = {
  children: s2.node,
  container: s2.oneOfType([
    HTMLElementType,
    s2.func
  ]),
  disablePortal: s2.bool
} : void 0;
a7.propTypes = exactProp(a7.propTypes);
var a8 = [
  "input",
  "select",
  "textarea",
  "a[href]",
  "button",
  "[tabindex]",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])'
].join(",");
function getTabIndex(e120) {
  const t121 = parseInt(e120.getAttribute("tabindex"), 10);
  return Number.isNaN(t121) ? e120.contentEditable === "true" || (e120.nodeName === "AUDIO" || e120.nodeName === "VIDEO" || e120.nodeName === "DETAILS") && e120.getAttribute("tabindex") === null ? 0 : e120.tabIndex : t121;
}
function isNonTabbableRadio(e211) {
  if (e211.tagName !== "INPUT" || e211.type !== "radio")
    return false;
  if (!e211.name)
    return false;
  const getRadio = (t36) => e211.ownerDocument.querySelector(`input[type="radio"]${t36}`);
  let t213 = getRadio(`[name="${e211.name}"]:checked`);
  t213 || (t213 = getRadio(`[name="${e211.name}"]`));
  return t213 !== e211;
}
function isNodeMatchingSelectorFocusable(e36) {
  return !(e36.disabled || e36.tagName === "INPUT" && e36.type === "hidden" || isNonTabbableRadio(e36));
}
function defaultGetTabbable(e45) {
  const t44 = [];
  const n110 = [];
  Array.from(e45.querySelectorAll(a8)).forEach((e51, r117) => {
    const o112 = getTabIndex(e51);
    o112 !== -1 && isNodeMatchingSelectorFocusable(e51) && (o112 === 0 ? t44.push(e51) : n110.push({
      documentOrder: r117,
      tabIndex: o112,
      node: e51
    }));
  });
  return n110.sort((e62, t54) => e62.tabIndex === t54.tabIndex ? e62.documentOrder - t54.documentOrder : e62.tabIndex - t54.tabIndex).map((e72) => e72.node).concat(t44);
}
function defaultIsEnabled() {
  return true;
}
function Unstable_TrapFocus(t61) {
  const {
    children: o26,
    disableAutoFocus: c114 = false,
    disableEnforceFocus: a117 = false,
    disableRestoreFocus: l23 = false,
    getTabbable: i24 = defaultGetTabbable,
    isEnabled: d24 = defaultIsEnabled,
    open: f29
  } = t61;
  const b22 = c1();
  const p20 = c1(null);
  const m20 = c1(null);
  const E12 = c1(null);
  const v18 = c1(null);
  const I6 = c1(false);
  const T10 = c1(null);
  const h23 = useForkRef(o26.ref, T10);
  const N11 = c1(null);
  p1(() => {
    f29 && T10.current && (I6.current = !c114);
  }, [
    c114,
    f29
  ]);
  p1(() => {
    if (!f29 || !T10.current)
      return;
    const e82 = ownerDocument(T10.current);
    if (!T10.current.contains(e82.activeElement)) {
      if (!T10.current.hasAttribute("tabIndex")) {
        console.error([
          "MUI: The modal content node does not accept focus.",
          'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'
        ].join("\n"));
        T10.current.setAttribute("tabIndex", -1);
      }
      I6.current && T10.current.focus();
    }
    return () => {
      if (!l23) {
        if (E12.current && E12.current.focus) {
          b22.current = true;
          E12.current.focus();
        }
        E12.current = null;
      }
    };
  }, [
    f29
  ]);
  p1(() => {
    if (!f29 || !T10.current)
      return;
    const e92 = ownerDocument(T10.current);
    const contain = (t82) => {
      const { current: n26 } = T10;
      if (n26 !== null) {
        if (e92.hasFocus() && !a117 && d24() && !b22.current) {
          if (!n26.contains(e92.activeElement)) {
            if (t82 && v18.current !== t82.target || e92.activeElement !== v18.current) {
              v18.current = null;
            } else if (v18.current !== null)
              return;
            if (!I6.current)
              return;
            let c22 = [];
            e92.activeElement !== p20.current && e92.activeElement !== m20.current || (c22 = i24(T10.current));
            if (c22.length > 0) {
              var r26, o33;
              const e102 = Boolean(((r26 = N11.current) == null ? void 0 : r26.shiftKey) && ((o33 = N11.current) == null ? void 0 : o33.key) === "Tab");
              const t92 = c22[0];
              const n35 = c22[c22.length - 1];
              e102 ? n35.focus() : t92.focus();
            } else
              n26.focus();
          }
        } else
          b22.current = false;
      }
    };
    const loopFocus = (t102) => {
      N11.current = t102;
      if (!a117 && d24() && t102.key === "Tab" && e92.activeElement === T10.current && t102.shiftKey) {
        b22.current = true;
        m20.current.focus();
      }
    };
    e92.addEventListener("focusin", contain);
    e92.addEventListener("keydown", loopFocus, true);
    const t71 = setInterval(() => {
      e92.activeElement.tagName === "BODY" && contain();
    }, 50);
    return () => {
      clearInterval(t71);
      e92.removeEventListener("focusin", contain);
      e92.removeEventListener("keydown", loopFocus, true);
    };
  }, [
    c114,
    a117,
    l23,
    d24,
    f29,
    i24
  ]);
  const onFocus = (e112) => {
    E12.current === null && (E12.current = e112.relatedTarget);
    I6.current = true;
    v18.current = e112.target;
    const t112 = o26.props.onFocus;
    t112 && t112(e112);
  };
  const handleFocusSentinel = (e122) => {
    E12.current === null && (E12.current = e122.relatedTarget);
    I6.current = true;
  };
  return y3(i1, {
    children: [
      p4("div", {
        tabIndex: 0,
        onFocus: handleFocusSentinel,
        ref: p20,
        "data-test": "sentinelStart"
      }),
      I(o26, {
        ref: h23,
        onFocus
      }),
      p4("div", {
        tabIndex: 0,
        onFocus: handleFocusSentinel,
        ref: m20,
        "data-test": "sentinelEnd"
      })
    ]
  });
}
true ? Unstable_TrapFocus.propTypes = {
  children: i4,
  disableAutoFocus: s2.bool,
  disableEnforceFocus: s2.bool,
  disableRestoreFocus: s2.bool,
  getTabbable: s2.func,
  isEnabled: s2.func,
  open: s2.bool.isRequired
} : void 0;
Unstable_TrapFocus.propTypes = exactProp(Unstable_TrapFocus.propTypes);
function isOverflowing(e121) {
  const o113 = ownerDocument(e121);
  return o113.body === e121 ? ownerWindow(e121).innerWidth > o113.documentElement.clientWidth : e121.scrollHeight > e121.clientHeight;
}
function ariaHidden(e212, o27) {
  o27 ? e212.setAttribute("aria-hidden", "true") : e212.removeAttribute("aria-hidden");
}
function getPaddingRight(e37) {
  return parseInt(ownerWindow(e37).getComputedStyle(e37).paddingRight, 10) || 0;
}
function ariaHiddenSiblings(e46, o34, n111, t122 = [], s117) {
  const r118 = [
    o34,
    n111,
    ...t122
  ];
  const i113 = [
    "TEMPLATE",
    "SCRIPT",
    "STYLE"
  ];
  [].forEach.call(e46.children, (e52) => {
    r118.indexOf(e52) === -1 && i113.indexOf(e52.tagName) === -1 && ariaHidden(e52, s117);
  });
}
function findIndexOf(e62, o41) {
  let n27 = -1;
  e62.some((e72, t214) => {
    if (o41(e72)) {
      n27 = t214;
      return true;
    }
    return false;
  });
  return n27;
}
function handleContainer(e82, o52) {
  const n36 = [];
  const t37 = e82.container;
  if (!o52.disableScrollLock) {
    if (isOverflowing(t37)) {
      const e92 = getScrollbarSize(ownerDocument(t37));
      n36.push({
        value: t37.style.paddingRight,
        property: "padding-right",
        el: t37
      });
      t37.style.paddingRight = `${getPaddingRight(t37) + e92}px`;
      const o62 = ownerDocument(t37).querySelectorAll(".mui-fixed");
      [].forEach.call(o62, (o82) => {
        n36.push({
          value: o82.style.paddingRight,
          property: "padding-right",
          el: o82
        });
        o82.style.paddingRight = `${getPaddingRight(o82) + e92}px`;
      });
    }
    const e102 = t37.parentElement;
    const o72 = ownerWindow(t37);
    const s210 = (e102 == null ? void 0 : e102.nodeName) === "HTML" && o72.getComputedStyle(e102).overflowY === "scroll" ? e102 : t37;
    n36.push({
      value: s210.style.overflow,
      property: "overflow",
      el: s210
    }, {
      value: s210.style.overflowX,
      property: "overflow-x",
      el: s210
    }, {
      value: s210.style.overflowY,
      property: "overflow-y",
      el: s210
    });
    s210.style.overflow = "hidden";
  }
  const restore = () => {
    n36.forEach(({ value: e112, el: o92, property: n43 }) => {
      e112 ? o92.style.setProperty(n43, e112) : o92.style.removeProperty(n43);
    });
  };
  return restore;
}
function getHiddenSiblings(e122) {
  const o10 = [];
  [].forEach.call(e122.children, (e13) => {
    e13.getAttribute("aria-hidden") === "true" && o10.push(e13);
  });
  return o10;
}
var ModalManager = class {
  constructor() {
    this.containers = void 0;
    this.modals = void 0;
    this.modals = [];
    this.containers = [];
  }
  add(e14, o11) {
    let n53 = this.modals.indexOf(e14);
    if (n53 !== -1)
      return n53;
    n53 = this.modals.length;
    this.modals.push(e14);
    e14.modalRef && ariaHidden(e14.modalRef, false);
    const t45 = getHiddenSiblings(o11);
    ariaHiddenSiblings(o11, e14.mount, e14.modalRef, t45, true);
    const s32 = findIndexOf(this.containers, (e15) => e15.container === o11);
    if (s32 !== -1) {
      this.containers[s32].modals.push(e14);
      return n53;
    }
    this.containers.push({
      modals: [
        e14
      ],
      container: o11,
      restore: null,
      hiddenSiblings: t45
    });
    return n53;
  }
  mount(e16, o12) {
    const n8 = findIndexOf(this.containers, (o13) => o13.modals.indexOf(e16) !== -1);
    const t55 = this.containers[n8];
    t55.restore || (t55.restore = handleContainer(t55, o12));
  }
  remove(e17) {
    const o14 = this.modals.indexOf(e17);
    if (o14 === -1)
      return o14;
    const n62 = findIndexOf(this.containers, (o15) => o15.modals.indexOf(e17) !== -1);
    const t62 = this.containers[n62];
    t62.modals.splice(t62.modals.indexOf(e17), 1);
    this.modals.splice(o14, 1);
    if (t62.modals.length === 0) {
      t62.restore && t62.restore();
      e17.modalRef && ariaHidden(e17.modalRef, true);
      ariaHiddenSiblings(t62.container, e17.mount, e17.modalRef, t62.hiddenSiblings, false);
      this.containers.splice(n62, 1);
    } else {
      const e18 = t62.modals[t62.modals.length - 1];
      e18.modalRef && ariaHidden(e18.modalRef, false);
    }
    return o14;
  }
  isTopModal(e19) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === e19;
  }
};
function getModalUtilityClass(e20) {
  return generateUtilityClass("MuiModal", e20);
}
generateUtilityClasses("MuiModal", [
  "root",
  "hidden"
]);
var v3 = [
  "BackdropComponent",
  "BackdropProps",
  "children",
  "classes",
  "className",
  "closeAfterTransition",
  "component",
  "components",
  "componentsProps",
  "container",
  "disableAutoFocus",
  "disableEnforceFocus",
  "disableEscapeKeyDown",
  "disablePortal",
  "disableRestoreFocus",
  "disableScrollLock",
  "hideBackdrop",
  "keepMounted",
  "manager",
  "onBackdropClick",
  "onClose",
  "onKeyDown",
  "open",
  "theme",
  "onTransitionEnter",
  "onTransitionExited"
];
var useUtilityClasses3 = (e21) => {
  const { open: o16, exited: n72, classes: t72 } = e21;
  const s41 = {
    root: [
      "root",
      !o16 && n72 && "hidden"
    ]
  };
  return composeClasses(s41, getModalUtilityClass, t72);
};
function getContainer1(e22) {
  return typeof e22 === "function" ? e22() : e22;
}
function getHasTransition(e23) {
  return !!e23.children && e23.children.props.hasOwnProperty("in");
}
var x3 = new ModalManager();
var C2 = l1(function ModalUnstyled(t82, i25) {
  const {
    BackdropComponent: a118,
    BackdropProps: u112,
    children: p111,
    classes: f115,
    className: g19,
    closeAfterTransition: y111 = false,
    component: R11 = "div",
    components: C13 = {},
    componentsProps: T11 = {},
    container: w12,
    disableAutoFocus: M7 = false,
    disableEnforceFocus: P = false,
    disableEscapeKeyDown: S6 = false,
    disablePortal: F8 = false,
    disableRestoreFocus: H3 = false,
    disableScrollLock: O5 = false,
    hideBackdrop: A5 = false,
    keepMounted: B8 = false,
    manager: D6 = x3,
    onBackdropClick: L5,
    onClose: N12,
    onKeyDown: K3,
    open: I7,
    theme: U8,
    onTransitionEnter: j9,
    onTransitionExited: q6
  } = t82, W4 = _objectWithoutPropertiesLoose(t82, v3);
  const [Y3, _9] = s1(true);
  const $5 = c1({});
  const V8 = c1(null);
  const X3 = c1(null);
  const z7 = useForkRef(X3, i25);
  const G3 = getHasTransition(t82);
  const getDoc = () => ownerDocument(V8.current);
  const getModal = () => {
    $5.current.modalRef = X3.current;
    $5.current.mountNode = V8.current;
    return $5.current;
  };
  const handleMounted = () => {
    D6.mount(getModal(), {
      disableScrollLock: O5
    });
    X3.current.scrollTop = 0;
  };
  const J3 = useEventCallback(() => {
    const e24 = getContainer1(w12) || getDoc().body;
    D6.add(getModal(), e24);
    X3.current && handleMounted();
  });
  const Q3 = u(() => D6.isTopModal(getModal()), [
    D6
  ]);
  const Z4 = useEventCallback((e25) => {
    V8.current = e25;
    e25 && (I7 && Q3() ? handleMounted() : ariaHidden(X3.current, true));
  });
  const ee2 = u(() => {
    D6.remove(getModal());
  }, [
    D6
  ]);
  p1(() => () => {
    ee2();
  }, [
    ee2
  ]);
  p1(() => {
    I7 ? J3() : G3 && y111 || ee2();
  }, [
    I7,
    ee2,
    G3,
    y111,
    J3
  ]);
  const oe2 = _extends({}, t82, {
    classes: f115,
    closeAfterTransition: y111,
    disableAutoFocus: M7,
    disableEnforceFocus: P,
    disableEscapeKeyDown: S6,
    disablePortal: F8,
    disableRestoreFocus: H3,
    disableScrollLock: O5,
    exited: Y3,
    hideBackdrop: A5,
    keepMounted: B8
  });
  const ne2 = useUtilityClasses3(oe2);
  if (!B8 && !I7 && (!G3 || Y3))
    return null;
  const handleEnter = () => {
    _9(false);
    j9 && j9();
  };
  const handleExited = () => {
    _9(true);
    q6 && q6();
    y111 && ee2();
  };
  const handleBackdropClick = (e26) => {
    if (e26.target === e26.currentTarget) {
      L5 && L5(e26);
      N12 && N12(e26, "backdropClick");
    }
  };
  const handleKeyDown1 = (e27) => {
    K3 && K3(e27);
    if (e27.key === "Escape" && Q3() && !S6) {
      e27.stopPropagation();
      N12 && N12(e27, "escapeKeyDown");
    }
  };
  const te22 = {};
  p111.props.tabIndex === void 0 && (te22.tabIndex = "-1");
  if (G3) {
    te22.onEnter = createChainedFunction(handleEnter, p111.props.onEnter);
    te22.onExited = createChainedFunction(handleExited, p111.props.onExited);
  }
  const se2 = C13.Root || R11;
  const re = T11.root || {};
  return p4(a7, {
    ref: Z4,
    container: w12,
    disablePortal: F8,
    children: y3(se2, _extends({
      role: "presentation"
    }, re, !isHostComponent(se2) && {
      as: R11,
      ownerState: _extends({}, oe2, re.ownerState),
      theme: U8
    }, W4, {
      ref: z7,
      onKeyDown: handleKeyDown1,
      className: clsx_m(ne2.root, re.className, g19),
      children: [
        !A5 && a118 ? p4(a118, _extends({
          open: I7,
          onClick: handleBackdropClick
        }, u112)) : null,
        p4(Unstable_TrapFocus, {
          disableEnforceFocus: P,
          disableAutoFocus: M7,
          disableRestoreFocus: H3,
          isEnabled: Q3,
          open: I7,
          children: I(p111, te22)
        })
      ]
    }))
  });
});
true ? C2.propTypes = {
  BackdropComponent: s2.elementType,
  BackdropProps: s2.object,
  children: i4.isRequired,
  classes: s2.object,
  className: s2.string,
  closeAfterTransition: s2.bool,
  component: s2.elementType,
  components: s2.shape({
    Root: s2.elementType
  }),
  componentsProps: s2.object,
  container: s2.oneOfType([
    HTMLElementType,
    s2.func
  ]),
  disableAutoFocus: s2.bool,
  disableEnforceFocus: s2.bool,
  disableEscapeKeyDown: s2.bool,
  disablePortal: s2.bool,
  disableRestoreFocus: s2.bool,
  disableScrollLock: s2.bool,
  hideBackdrop: s2.bool,
  keepMounted: s2.bool,
  onBackdropClick: s2.func,
  onClose: s2.func,
  onKeyDown: s2.func,
  open: s2.bool.isRequired
} : void 0;
function NoSsr(e122) {
  const { children: s118, defer: p21 = false, fallback: n20 = null } = e122;
  const [c23, f30] = s1(false);
  d2(() => {
    p21 || f30(true);
  }, [
    p21
  ]);
  p1(() => {
    p21 && f30(true);
  }, [
    p21
  ]);
  return p4(i1, {
    children: c23 ? s118 : n20
  });
}
true ? NoSsr.propTypes = {
  children: s2.node,
  defer: s2.bool,
  fallback: s2.node
} : void 0;
NoSsr.propTypes = exactProp(NoSsr.propTypes);
function getNodeName(e30) {
  return e30 ? (e30.nodeName || "").toLowerCase() : null;
}
function getWindow(n28) {
  if (n28 == null)
    return window;
  if (n28.toString() !== "[object Window]") {
    var t30 = n28.ownerDocument;
    return t30 && t30.defaultView || window;
  }
  return n28;
}
function isElement(e38) {
  var t38 = getWindow(e38).Element;
  return e38 instanceof t38 || e38 instanceof Element;
}
function isHTMLElement(e39) {
  var t39 = getWindow(e39).HTMLElement;
  return e39 instanceof t39 || e39 instanceof HTMLElement;
}
function isShadowRoot(e40) {
  if (typeof ShadowRoot === "undefined")
    return false;
  var t40 = getWindow(e40).ShadowRoot;
  return e40 instanceof t40 || e40 instanceof ShadowRoot;
}
var r6 = "top";
var a9 = "bottom";
var e6 = "right";
var v4 = "left";
var t8 = "auto";
var n6 = [
  r6,
  a9,
  e6,
  v4
];
var o5 = "start";
var c4 = "end";
var i6 = "clippingParents";
var f6 = "viewport";
var p6 = "popper";
var u4 = "reference";
var d4 = n6.reduce(function(r119, a119) {
  return r119.concat([
    a119 + "-" + o5,
    a119 + "-" + c4
  ]);
}, []);
var b5 = [].concat(n6, [
  t8
]).reduce(function(r27, a24) {
  return r27.concat([
    a24,
    a24 + "-" + o5,
    a24 + "-" + c4
  ]);
}, []);
var g3 = "beforeRead";
var l6 = "read";
var m4 = "afterRead";
var s6 = "beforeMain";
var w3 = "main";
var M1 = "afterMain";
var R2 = "beforeWrite";
var W1 = "write";
var h4 = "afterWrite";
var x4 = [
  g3,
  l6,
  m4,
  s6,
  w3,
  M1,
  R2,
  W1,
  h4
];
function getBasePlacement(e47) {
  return e47.split("-")[0];
}
var a10 = Math.max;
var r7 = Math.min;
var t9 = Math.round;
function getBoundingClientRect(i26, o20) {
  o20 === void 0 && (o20 = false);
  var r28 = i26.getBoundingClientRect();
  var f31 = 1;
  var n29 = 1;
  if (isHTMLElement(i26) && o20) {
    var g20 = i26.offsetHeight;
    var h24 = i26.offsetWidth;
    h24 > 0 && (f31 = t9(r28.width) / h24 || 1);
    g20 > 0 && (n29 = t9(r28.height) / g20 || 1);
  }
  return {
    width: r28.width / f31,
    height: r28.height / n29,
    top: r28.top / n29,
    right: r28.right / f31,
    bottom: r28.bottom / n29,
    left: r28.left / f31,
    x: r28.left / f31,
    y: r28.top / n29
  };
}
function getLayoutRect(e48) {
  var i27 = getBoundingClientRect(e48);
  var o28 = e48.offsetWidth;
  var f32 = e48.offsetHeight;
  Math.abs(i27.width - o28) <= 1 && (o28 = i27.width);
  Math.abs(i27.height - f32) <= 1 && (f32 = i27.height);
  return {
    x: e48.offsetLeft,
    y: e48.offsetTop,
    width: o28,
    height: f32
  };
}
function contains(o29, e49) {
  var n30 = e49.getRootNode && e49.getRootNode();
  if (o29.contains(e49))
    return true;
  if (n30 && isShadowRoot(n30)) {
    var r29 = e49;
    do {
      if (r29 && o29.isSameNode(r29))
        return true;
      r29 = r29.parentNode || r29.host;
    } while (r29);
  }
  return false;
}
function getComputedStyle(e50) {
  return getWindow(e50).getComputedStyle(e50);
}
function getDocumentElement(t46) {
  return ((isElement(t46) ? t46.ownerDocument : t46.document) || window.document).documentElement;
}
function getParentNode(n37) {
  return getNodeName(n37) === "html" ? n37 : n37.assignedSlot || n37.parentNode || (isShadowRoot(n37) ? n37.host : null) || getDocumentElement(n37);
}
function isTableElement(e123) {
  return [
    "table",
    "td",
    "th"
  ].indexOf(getNodeName(e123)) >= 0;
}
function getTrueOffsetParent(e213) {
  return isHTMLElement(e213) && getComputedStyle(e213).position !== "fixed" ? e213.offsetParent : null;
}
function getContainingBlock(e310) {
  var o30 = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var f33 = navigator.userAgent.indexOf("Trident") !== -1;
  if (f33 && isHTMLElement(e310)) {
    var a25 = getComputedStyle(e310);
    if (a25.position === "fixed")
      return null;
  }
  var s33 = getParentNode(e310);
  while (isHTMLElement(s33) && [
    "html",
    "body"
  ].indexOf(getNodeName(s33)) < 0) {
    var l24 = getComputedStyle(s33);
    if (l24.transform !== "none" || l24.perspective !== "none" || l24.contain === "paint" || [
      "transform",
      "perspective"
    ].indexOf(l24.willChange) !== -1 || o30 && l24.willChange === "filter" || o30 && l24.filter && l24.filter !== "none") {
      return s33;
    }
    s33 = s33.parentNode;
  }
  return null;
}
function getOffsetParent(r120) {
  var i114 = getWindow(r120);
  var o35 = getTrueOffsetParent(r120);
  while (o35 && isTableElement(o35) && getComputedStyle(o35).position === "static") {
    o35 = getTrueOffsetParent(o35);
  }
  return o35 && (getNodeName(o35) === "html" || getNodeName(o35) === "body" && getComputedStyle(o35).position === "static") ? i114 : o35 || getContainingBlock(r120) || i114;
}
function getMainAxisFromPlacement(t47) {
  return [
    "top",
    "bottom"
  ].indexOf(t47) >= 0 ? "x" : "y";
}
function within(n38, t48, r30) {
  return a10(n38, r7(t48, r30));
}
function withinMaxClamp(i115, a120, n39) {
  var t49 = within(i115, a120, n39);
  return t49 > n39 ? n39 : t49;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(e53) {
  return Object.assign({}, getFreshSideObject(), e53);
}
function expandToHashMap(e54, t123) {
  return t123.reduce(function(t50, n8) {
    t50[n8] = e54;
    return t50;
  }, {});
}
function getVariation(t56) {
  return t56.split("-")[1];
}
var t10 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(e55) {
  return e55.replace(/left|right|bottom|top/g, function(e5) {
    return t10[e5];
  });
}
var t11 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(e56) {
  return e56.replace(/start|end/g, function(e5) {
    return t11[e5];
  });
}
function getWindowScroll(r34) {
  var e57 = getWindow(r34);
  var t57 = e57.pageXOffset;
  var l25 = e57.pageYOffset;
  return {
    scrollLeft: t57,
    scrollTop: l25
  };
}
function getWindowScrollBarX(e58) {
  return getBoundingClientRect(getDocumentElement(e58)).left + getWindowScroll(e58).scrollLeft;
}
function getViewportRect(r35) {
  var o36 = getWindow(r35);
  var n40 = getDocumentElement(r35);
  var a26 = o36.visualViewport;
  var f34 = n40.clientWidth;
  var s34 = n40.clientHeight;
  var g21 = 0;
  var m22 = 0;
  if (a26) {
    f34 = a26.width;
    s34 = a26.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      g21 = a26.offsetLeft;
      m22 = a26.offsetTop;
    }
  }
  return {
    width: f34,
    height: s34,
    x: g21 + getWindowScrollBarX(r35),
    y: m22
  };
}
function getDocumentRect(l26) {
  var c24;
  var n44 = getDocumentElement(l26);
  var m23 = getWindowScroll(l26);
  var d25 = (c24 = l26.ownerDocument) == null ? void 0 : c24.body;
  var s35 = a10(n44.scrollWidth, n44.clientWidth, d25 ? d25.scrollWidth : 0, d25 ? d25.clientWidth : 0);
  var a27 = a10(n44.scrollHeight, n44.clientHeight, d25 ? d25.scrollHeight : 0, d25 ? d25.clientHeight : 0);
  var g22 = -m23.scrollLeft + getWindowScrollBarX(l26);
  var h25 = -m23.scrollTop;
  getComputedStyle(d25 || n44).direction === "rtl" && (g22 += a10(n44.clientWidth, d25 ? d25.clientWidth : 0) - s35);
  return {
    width: s35,
    height: a27,
    x: g22,
    y: h25
  };
}
function isScrollParent(r36) {
  var e59 = getComputedStyle(r36), t58 = e59.overflow, l27 = e59.overflowX, a28 = e59.overflowY;
  return /auto|scroll|overlay|hidden/.test(t58 + a28 + l27);
}
function getScrollParent(n112) {
  return [
    "html",
    "body",
    "#document"
  ].indexOf(getNodeName(n112)) >= 0 ? n112.ownerDocument.body : isHTMLElement(n112) && isScrollParent(n112) ? n112 : getScrollParent(getParentNode(n112));
}
function listScrollParents(r121, e124) {
  var l28;
  e124 === void 0 && (e124 = []);
  var a29 = getScrollParent(r121);
  var c25 = a29 === ((l28 = r121.ownerDocument) == null ? void 0 : l28.body);
  var i28 = getWindow(a29);
  var m24 = c25 ? [
    i28
  ].concat(i28.visualViewport || [], isScrollParent(a29) ? a29 : []) : a29;
  var s36 = e124.concat(m24);
  return c25 ? s36 : s36.concat(listScrollParents(getParentNode(m24)));
}
function rectToClientRect(t124) {
  return Object.assign({}, t124, {
    left: t124.x,
    top: t124.y,
    right: t124.x + t124.width,
    bottom: t124.y + t124.height
  });
}
function getInnerBoundingClientRect(t215) {
  var e125 = getBoundingClientRect(t215);
  e125.top = e125.top + t215.clientTop;
  e125.left = e125.left + t215.clientLeft;
  e125.bottom = e125.top + t215.clientHeight;
  e125.right = e125.left + t215.clientWidth;
  e125.width = t215.clientWidth;
  e125.height = t215.clientHeight;
  e125.x = e125.left;
  e125.y = e125.top;
  return e125;
}
function getClientRectFromMixedType(o114, r122) {
  return r122 === f6 ? rectToClientRect(getViewportRect(o114)) : isElement(r122) ? getInnerBoundingClientRect(r122) : rectToClientRect(getDocumentRect(getDocumentElement(o114)));
}
function getClippingParents(t310) {
  var e214 = listScrollParents(getParentNode(t310));
  var i116 = [
    "absolute",
    "fixed"
  ].indexOf(getComputedStyle(t310).position) >= 0;
  var n113 = i116 && isHTMLElement(t310) ? getOffsetParent(t310) : t310;
  return isElement(n113) ? e214.filter(function(t410) {
    return isElement(t410) && contains(t410, n113) && getNodeName(t410) !== "body" && (!i116 || getComputedStyle(t410).position !== "static");
  }) : [];
}
function getClippingRect(t59, e311, i29) {
  var o210 = e311 === "clippingParents" ? getClippingParents(t59) : [].concat(e311);
  var r210 = [].concat(o210, [
    i29
  ]);
  var n210 = r210[0];
  var l112 = r210.reduce(function(e410, i32) {
    var o37 = getClientRectFromMixedType(t59, i32);
    e410.top = a10(o37.top, e410.top);
    e410.right = r7(o37.right, e410.right);
    e410.bottom = r7(o37.bottom, e410.bottom);
    e410.left = a10(o37.left, e410.left);
    return e410;
  }, getClientRectFromMixedType(t59, n210));
  l112.width = l112.right - l112.left;
  l112.height = l112.bottom - l112.top;
  l112.x = l112.left;
  l112.y = l112.top;
  return l112;
}
function computeOffsets(m25) {
  var f35 = m25.reference, n45 = m25.element, o38 = m25.placement;
  var u27 = o38 ? getBasePlacement(o38) : null;
  var x13 = o38 ? getVariation(o38) : null;
  var y20 = f35.x + f35.width / 2 - n45.width / 2;
  var b23 = f35.y + f35.height / 2 - n45.height / 2;
  var d26;
  switch (u27) {
    case r6:
      d26 = {
        x: y20,
        y: f35.y - n45.height
      };
      break;
    case a9:
      d26 = {
        x: y20,
        y: f35.y + f35.height
      };
      break;
    case e6:
      d26 = {
        x: f35.x + f35.width,
        y: b23
      };
      break;
    case v4:
      d26 = {
        x: f35.x - n45.width,
        y: b23
      };
      break;
    default:
      d26 = {
        x: f35.x,
        y: f35.y
      };
  }
  var g23 = u27 ? getMainAxisFromPlacement(u27) : null;
  if (g23 != null) {
    var p = g23 === "y" ? "height" : "width";
    switch (x13) {
      case o5:
        d26[g23] = d26[g23] - (f35[p] / 2 - n45[p] / 2);
        break;
      case c4:
        d26[g23] = d26[g23] + (f35[p] / 2 - n45[p] / 2);
        break;
      default:
    }
  }
  return d26;
}
function detectOverflow(v19, g24) {
  g24 === void 0 && (g24 = {});
  var b24 = g24, y21 = b24.placement, O6 = y21 === void 0 ? v19.placement : y21, x14 = b24.boundary, _10 = x14 === void 0 ? i6 : x14, w13 = b24.rootBoundary, h26 = w13 === void 0 ? f6 : w13, P = b24.elementContext, S7 = P === void 0 ? p6 : P, B9 = b24.altBoundary, C8 = B9 !== void 0 && B9, D7 = b24.padding, E13 = D7 === void 0 ? 0 : D7;
  var N13 = mergePaddingObject(typeof E13 !== "number" ? E13 : expandToHashMap(E13, n6));
  var R5 = S7 === p6 ? u4 : p6;
  var W5 = v19.rects.popper;
  var k8 = v19.elements[C8 ? R5 : S7];
  var A6 = getClippingRect(isElement(k8) ? k8 : k8.contextElement || getDocumentElement(v19.elements.popper), _10, h26);
  var F9 = getBoundingClientRect(v19.elements.reference);
  var M8 = computeOffsets({
    reference: F9,
    element: W5,
    strategy: "absolute",
    placement: O6
  });
  var V9 = rectToClientRect(Object.assign({}, W5, M8));
  var X4 = S7 === p6 ? V9 : F9;
  var q7 = {
    top: A6.top - X4.top + N13.top,
    bottom: X4.bottom - A6.bottom + N13.bottom,
    left: A6.left - X4.left + N13.left,
    right: X4.right - A6.right + N13.right
  };
  var z8 = v19.modifiersData.offset;
  if (S7 === p6 && z8) {
    var G4 = z8[O6];
    Object.keys(q7).forEach(function(t125) {
      var e126 = [
        e6,
        a9
      ].indexOf(t125) >= 0 ? 1 : -1;
      var o10 = [
        r6,
        a9
      ].indexOf(t125) >= 0 ? "y" : "x";
      q7[t125] += G4[o10] * e126;
    });
  }
  return q7;
}
function computeAutoPlacement(m26, n46) {
  n46 === void 0 && (n46 = {});
  var a30 = n46, l29 = a30.placement, d27 = a30.boundary, u28 = a30.rootBoundary, p22 = a30.padding, c26 = a30.flipVariations, j10 = a30.allowedAutoPlacements, f36 = j10 === void 0 ? b5 : j10;
  var g25 = getVariation(l29);
  var v20 = g25 ? c26 ? d4 : d4.filter(function(o115) {
    return getVariation(o115) === g25;
  }) : n6;
  var w14 = v20.filter(function(t126) {
    return f36.indexOf(t126) >= 0;
  });
  if (w14.length === 0) {
    w14 = v20;
    console.error([
      "Popper: The `allowedAutoPlacements` option did not allow any",
      "placements. Ensure the `placement` option matches the variation",
      "of the allowed placements.",
      'For example, "auto" cannot be used to allow "bottom-start".',
      'Use "auto-start" instead.'
    ].join(" "));
  }
  var P = w14.reduce(function(t216, o211) {
    t216[o211] = detectOverflow(m26, {
      placement: o211,
      boundary: d27,
      rootBoundary: u28,
      padding: p22
    })[getBasePlacement(o211)];
    return t216;
  }, {});
  return Object.keys(P).sort(function(t, o10) {
    return P[t] - P[o10];
  });
}
function applyStyles(s119) {
  var r37 = s119.state;
  Object.keys(r37.elements).forEach(function(s5) {
    var a31 = r37.styles[s5] || {};
    var o39 = r37.attributes[s5] || {};
    var n47 = r37.elements[s5];
    if (isHTMLElement(n47) && getNodeName(n47)) {
      Object.assign(n47.style, a31);
      Object.keys(o39).forEach(function(e127) {
        var t127 = o39[e127];
        t127 === false ? n47.removeAttribute(e127) : n47.setAttribute(e127, t127 === true ? "" : t127);
      });
    }
  });
}
function effect(s211) {
  var r38 = s211.state;
  var a32 = {
    popper: {
      position: r38.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(r38.elements.popper.style, a32.popper);
  r38.styles = a32;
  r38.elements.arrow && Object.assign(r38.elements.arrow.style, a32.arrow);
  return function() {
    Object.keys(r38.elements).forEach(function(s37) {
      var o40 = r38.elements[s37];
      var n48 = r38.attributes[s37] || {};
      var i30 = Object.keys(r38.styles.hasOwnProperty(s37) ? r38.styles[s37] : a32[s37]);
      var l30 = i30.reduce(function(e215, t) {
        e215[t] = "";
        return e215;
      }, {});
      if (isHTMLElement(o40) && getNodeName(o40)) {
        Object.assign(o40.style, l30);
        Object.keys(n48).forEach(function(e312) {
          o40.removeAttribute(e312);
        });
      }
    });
  };
}
var s7 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: [
    "computeStyles"
  ]
};
var d5 = function toPaddingObject(e128, r123) {
  e128 = typeof e128 === "function" ? e128(Object.assign({}, r123.rects, {
    placement: r123.placement
  })) : e128;
  return mergePaddingObject(typeof e128 !== "number" ? e128 : expandToHashMap(e128, n6));
};
function arrow(t128) {
  var i117;
  var n114 = t128.state, m9 = t128.name, u113 = t128.options;
  var v110 = n114.elements.arrow;
  var j11 = n114.modifiersData.popperOffsets;
  var g26 = getBasePlacement(n114.placement);
  var w15 = getMainAxisFromPlacement(g26);
  var O7 = [
    v4,
    e6
  ].indexOf(g26) >= 0;
  var b17 = O7 ? "height" : "width";
  if (v110 && j11) {
    var h27 = d5(u113.padding, n114);
    var y22 = getLayoutRect(v110);
    var E9 = w15 === "y" ? r6 : v4;
    var N5 = w15 === "y" ? a9 : e6;
    var _11 = n114.rects.reference[b17] + n114.rects.reference[w15] - j11[w15] - n114.rects.popper[b17];
    var P = j11[w15] - n114.rects.reference[w15];
    var D8 = getOffsetParent(v110);
    var x15 = D8 ? w15 === "y" ? D8.clientHeight || 0 : D8.clientWidth || 0 : 0;
    var S8 = _11 / 2 - P / 2;
    var V10 = h27[E9];
    var q8 = x15 - y22[b17] - h27[N5];
    var H4 = x15 / 2 - y22[b17] / 2 + S8;
    var L6 = within(V10, H4, q8);
    var M5 = w15;
    n114.modifiersData[m9] = (i117 = {}, i117[M5] = L6, i117.centerOffset = L6 - H4, i117);
  }
}
function effect1(e216) {
  var r211 = e216.state, o116 = e216.options;
  var a121 = o116.element, s120 = a121 === void 0 ? "[data-popper-arrow]" : a121;
  if (s120 != null) {
    if (typeof s120 === "string") {
      s120 = r211.elements.popper.querySelector(s120);
      if (!s120)
        return;
    }
    isHTMLElement(s120) || console.error([
      'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
      "To use an SVG arrow, wrap it in an HTMLElement that will be used as",
      "the arrow."
    ].join(" "));
    contains(r211.elements.popper, s120) ? r211.elements.arrow = s120 : console.error([
      'Popper: "arrow" modifier\'s `element` must be a child of the popper',
      "element."
    ].join(" "));
  }
}
var v5 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect1,
  requires: [
    "popperOffsets"
  ],
  requiresIfExists: [
    "preventOverflow"
  ]
};
var d6 = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(t129) {
  var e129 = t129.x, o117 = t129.y;
  var r124 = window;
  var a122 = r124.devicePixelRatio || 1;
  return {
    x: t9(e129 * a122) / a122 || 0,
    y: t9(o117 * a122) / a122 || 0
  };
}
function mapToStyles(f116) {
  var l113;
  var m110 = f116.popper, u114 = f116.popperRect, c27 = f116.placement, v22 = f116.variation, g27 = f116.offsets, y23 = f116.position, h28 = f116.gpuAcceleration, O8 = f116.adaptive, b25 = f116.roundOffsets, w16 = f116.isFixed;
  var j12 = b25 === true ? roundOffsetsByDPR(g27) : typeof b25 === "function" ? b25(g27) : g27, x16 = j12.x, S9 = x16 === void 0 ? 0 : x16, D9 = j12.y, P = D9 === void 0 ? 0 : D9;
  var R12 = g27.hasOwnProperty("x");
  var C14 = g27.hasOwnProperty("y");
  var N14 = v4;
  var V11 = r6;
  var W6 = window;
  if (O8) {
    var T12 = getOffsetParent(m110);
    var _12 = "clientHeight";
    var A7 = "clientWidth";
    if (T12 === getWindow(m110)) {
      T12 = getDocumentElement(m110);
      if (getComputedStyle(T12).position !== "static" && y23 === "absolute") {
        _12 = "scrollHeight";
        A7 = "scrollWidth";
      }
    }
    T12 = T12;
    if (c27 === r6 || (c27 === v4 || c27 === e6) && v22 === c4) {
      V11 = a9;
      var E14 = w16 && W6.visualViewport ? W6.visualViewport.height : T12[_12];
      P -= E14 - u114.height;
      P *= h28 ? 1 : -1;
    }
    if (c27 === v4 || (c27 === r6 || c27 === a9) && v22 === c4) {
      N14 = e6;
      var B10 = w16 && W6.visualViewport ? W6.visualViewport.width : T12[A7];
      S9 -= B10 - u114.width;
      S9 *= h28 ? 1 : -1;
    }
  }
  var F10 = Object.assign({
    position: y23
  }, O8 && d6);
  if (h28) {
    var H5;
    return Object.assign({}, F10, (H5 = {}, H5[V11] = C14 ? "0" : "", H5[N14] = R12 ? "0" : "", H5.transform = (W6.devicePixelRatio || 1) <= 1 ? "translate(" + S9 + "px, " + P + "px)" : "translate3d(" + S9 + "px, " + P + "px, 0)", H5));
  }
  return Object.assign({}, F10, (l113 = {}, l113[V11] = C14 ? P + "px" : "", l113[N14] = R12 ? S9 + "px" : "", l113.transform = "", l113));
}
function computeStyles(t217) {
  var e217 = t217.state, o212 = t217.options;
  var r212 = o212.gpuAcceleration, a210 = r212 === void 0 || r212, i118 = o212.adaptive, s121 = i118 === void 0 || i118, p112 = o212.roundOffsets, m27 = p112 === void 0 || p112;
  if (true) {
    var d113 = getComputedStyle(e217.elements.popper).transitionProperty || "";
    s121 && [
      "transform",
      "top",
      "right",
      "bottom",
      "left"
    ].some(function(t311) {
      return d113.indexOf(t311) >= 0;
    }) && console.warn([
      "Popper: Detected CSS transitions on at least one of the following",
      'CSS properties: "transform", "top", "right", "bottom", "left".',
      "\n\n",
      'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
      "for smooth transitions, or remove these properties from the CSS",
      "transition declaration on the popper element if only transitioning",
      "opacity or background-color for example.",
      "\n\n",
      "We recommend using the popper element as a wrapper around an inner",
      "element that can have any CSS property transitioned for animations."
    ].join(" "));
  }
  var u29 = {
    placement: getBasePlacement(e217.placement),
    variation: getVariation(e217.placement),
    popper: e217.elements.popper,
    popperRect: e217.rects.popper,
    gpuAcceleration: a210,
    isFixed: e217.options.strategy === "fixed"
  };
  e217.modifiersData.popperOffsets != null && (e217.styles.popper = Object.assign({}, e217.styles.popper, mapToStyles(Object.assign({}, u29, {
    offsets: e217.modifiersData.popperOffsets,
    position: e217.options.strategy,
    adaptive: s121,
    roundOffsets: m27
  }))));
  e217.modifiersData.arrow != null && (e217.styles.arrow = Object.assign({}, e217.styles.arrow, mapToStyles(Object.assign({}, u29, {
    offsets: e217.modifiersData.arrow,
    position: "absolute",
    adaptive: false,
    roundOffsets: m27
  }))));
  e217.attributes.popper = Object.assign({}, e217.attributes.popper, {
    "data-popper-placement": e217.placement
  });
}
var u5 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var t12 = {
  passive: true
};
function effect2(r125) {
  var n49 = r125.state, a33 = r125.instance, o42 = r125.options;
  var s38 = o42.scroll, i33 = s38 === void 0 || s38, c28 = o42.resize, f37 = c28 === void 0 || c28;
  var v23 = getWindow(n49.elements.popper);
  var d28 = [].concat(n49.scrollParents.reference, n49.scrollParents.popper);
  i33 && d28.forEach(function(e130) {
    e130.addEventListener("scroll", a33.update, t12);
  });
  f37 && v23.addEventListener("resize", a33.update, t12);
  return function() {
    i33 && d28.forEach(function(e218) {
      e218.removeEventListener("scroll", a33.update, t12);
    });
    f37 && v23.removeEventListener("resize", a33.update, t12);
  };
}
var r8 = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect2,
  data: {}
};
function getExpandedFallbackPlacements(a123) {
  if (getBasePlacement(a123) === t8)
    return [];
  var o118 = getOppositePlacement(a123);
  return [
    getOppositeVariationPlacement(a123),
    o118,
    getOppositeVariationPlacement(o118)
  ];
}
function flip(r126) {
  var d114 = r126.state, f38 = r126.options, c = r126.name;
  if (!d114.modifiersData[c]._skip) {
    var v24 = f38.mainAxis, j13 = v24 === void 0 || v24, g28 = f38.altAxis, b26 = g28 === void 0 || g28, P = f38.fallbackPlacements, y24 = f38.padding, _13 = f38.boundary, k9 = f38.rootBoundary, w17 = f38.altBoundary, x17 = f38.flipVariations, h29 = x17 === void 0 || x17, B11 = f38.allowedAutoPlacements;
    var A8 = d114.options.placement;
    var O9 = getBasePlacement(A8);
    var S10 = O9 === A8;
    var D10 = P || (S10 || !h29 ? [
      getOppositePlacement(A8)
    ] : getExpandedFallbackPlacements(A8));
    var E15 = [
      A8
    ].concat(D10).reduce(function(t130, r213) {
      return t130.concat(getBasePlacement(r213) === t8 ? computeAutoPlacement(d114, {
        placement: r213,
        boundary: _13,
        rootBoundary: k9,
        padding: y24,
        flipVariations: h29,
        allowedAutoPlacements: B11
      }) : r213);
    }, []);
    var V12 = d114.rects.reference;
    var F11 = d114.rects.popper;
    var N15 = /* @__PURE__ */ new Map();
    var R13 = true;
    var W7 = E15[0];
    for (var C15 = 0; C15 < E15.length; C15++) {
      var M9 = E15[C15];
      var q9 = getBasePlacement(M9);
      var I8 = getVariation(M9) === o5;
      var X5 = [
        r6,
        a9
      ].indexOf(q9) >= 0;
      var z5 = X5 ? "width" : "height";
      var G5 = detectOverflow(d114, {
        placement: M9,
        boundary: _13,
        rootBoundary: k9,
        altBoundary: w17,
        padding: y24
      });
      var H6 = X5 ? I8 ? e6 : v4 : I8 ? a9 : r6;
      V12[z5] > F11[z5] && (H6 = getOppositePlacement(H6));
      var J3 = getOppositePlacement(H6);
      var K4 = [];
      j13 && K4.push(G5[q9] <= 0);
      b26 && K4.push(G5[H6] <= 0, G5[J3] <= 0);
      if (K4.every(function(t218) {
        return t218;
      })) {
        W7 = M9;
        R13 = false;
        break;
      }
      N15.set(M9, K4);
    }
    if (R13) {
      var L7 = h29 ? 3 : 1;
      var Q4 = function _loop(t312) {
        var e131 = E15.find(function(e219) {
          var r39 = N15.get(e219);
          if (r39) {
            return r39.slice(0, t312).every(function(t411) {
              return t411;
            });
          }
        });
        if (e131) {
          W7 = e131;
          return "break";
        }
      };
      for (var T13 = L7; T13 > 0; T13--) {
        var U9 = Q4(T13);
        if (U9 === "break")
          break;
      }
    }
    if (d114.placement !== W7) {
      d114.modifiersData[c]._skip = true;
      d114.placement = W7;
      d114.reset = true;
    }
  }
}
var d7 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: [
    "offset"
  ],
  data: {
    _skip: false
  }
};
function getSideOffsets(e132, t131, i119) {
  i119 === void 0 && (i119 = {
    x: 0,
    y: 0
  });
  return {
    top: e132.top - t131.height - i119.y,
    right: e132.right - t131.width + i119.x,
    bottom: e132.bottom - t131.height + i119.y,
    left: e132.left - t131.width - i119.x
  };
}
function isAnySideFullyClipped(o119) {
  return [
    r6,
    e6,
    a9,
    v4
  ].some(function(e5) {
    return o119[e5] >= 0;
  });
}
function hide(e220) {
  var t219 = e220.state, i13 = e220.name;
  var r127 = t219.rects.reference;
  var s122 = t219.rects.popper;
  var p23 = t219.modifiersData.preventOverflow;
  var m28 = detectOverflow(t219, {
    elementContext: "reference"
  });
  var d29 = detectOverflow(t219, {
    altBoundary: true
  });
  var a34 = getSideOffsets(m28, r127);
  var n50 = getSideOffsets(d29, s122, p23);
  var l32 = isAnySideFullyClipped(a34);
  var f39 = isAnySideFullyClipped(n50);
  t219.modifiersData[i13] = {
    referenceClippingOffsets: a34,
    popperEscapeOffsets: n50,
    isReferenceHidden: l32,
    hasPopperEscaped: f39
  };
  t219.attributes.popper = Object.assign({}, t219.attributes.popper, {
    "data-popper-reference-hidden": l32,
    "data-popper-escaped": f39
  });
}
var s8 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: [
    "preventOverflow"
  ],
  fn: hide
};
function distanceAndSkiddingToXY(n115, i120, s39) {
  var r40 = getBasePlacement(n115);
  var o43 = [
    v4,
    r6
  ].indexOf(r40) >= 0 ? -1 : 1;
  var d30 = typeof s39 === "function" ? s39(Object.assign({}, i120, {
    placement: n115
  })) : s39, p24 = d30[0], m29 = d30[1];
  p24 = p24 || 0;
  m29 = (m29 || 0) * o43;
  return [
    v4,
    e6
  ].indexOf(r40) >= 0 ? {
    x: m29,
    y: p24
  } : {
    x: p24,
    y: m29
  };
}
function offset(e133) {
  var t132 = e133.state, f117 = e133.options, a18 = e133.name;
  var i210 = f117.offset, s40 = i210 === void 0 ? [
    0,
    0
  ] : i210;
  var r44 = b5.reduce(function(e221, f210) {
    e221[f210] = distanceAndSkiddingToXY(f210, t132.rects, s40);
    return e221;
  }, {});
  var o44 = r44[t132.placement], d31 = o44.x, p25 = o44.y;
  if (t132.modifiersData.popperOffsets != null) {
    t132.modifiersData.popperOffsets.x += d31;
    t132.modifiersData.popperOffsets.y += p25;
  }
  t132.modifiersData[a18] = r44;
}
var i7 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: [
    "popperOffsets"
  ],
  fn: offset
};
function popperOffsets(t133) {
  var a35 = t133.state, r = t133.name;
  a35.modifiersData[r] = computeOffsets({
    reference: a35.rects.reference,
    element: a35.rects.popper,
    strategy: "absolute",
    placement: a35.placement
  });
}
var t13 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(r128) {
  return r128 === "x" ? "y" : "x";
}
function preventOverflow(j12) {
  var g29 = j12.state, x18 = j12.options, w10 = j12.name;
  var y25 = x18.mainAxis, A9 = y25 === void 0 || y25, h30 = x18.altAxis, O10 = h30 !== void 0 && h30, b27 = x18.boundary, D11 = x18.rootBoundary, _14 = x18.altBoundary, B12 = x18.padding, P = x18.tether, S11 = P === void 0 || P, R14 = x18.tetherOffset, N16 = R14 === void 0 ? 0 : R14;
  var W8 = detectOverflow(g29, {
    boundary: b27,
    rootBoundary: D11,
    padding: B12,
    altBoundary: _14
  });
  var C16 = getBasePlacement(g29.placement);
  var E16 = getVariation(g29.placement);
  var L8 = !E16;
  var q10 = getMainAxisFromPlacement(C16);
  var F12 = getAltAxis(q10);
  var I9 = g29.modifiersData.popperOffsets;
  var M10 = g29.rects.reference;
  var T14 = g29.rects.popper;
  var V13 = typeof N16 === "function" ? N16(Object.assign({}, g29.rects, {
    placement: g29.placement
  })) : N16;
  var X6 = typeof V13 === "number" ? {
    mainAxis: V13,
    altAxis: V13
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, V13);
  var k10 = g29.modifiersData.offset ? g29.modifiersData.offset[g29.placement] : null;
  var z9 = {
    x: 0,
    y: 0
  };
  if (I9) {
    if (A9) {
      var G6;
      var H3 = q10 === "y" ? r6 : v4;
      var J3 = q10 === "y" ? a9 : e6;
      var K3 = q10 === "y" ? "height" : "width";
      var Q5 = I9[q10];
      var U10 = Q5 + W8[H3];
      var Y4 = Q5 - W8[J3];
      var Z5 = S11 ? -T14[K3] / 2 : 0;
      var $6 = E16 === o5 ? M10[K3] : T14[K3];
      var rr = E16 === o5 ? -T14[K3] : -M10[K3];
      var tr = g29.elements.arrow;
      var ar = S11 && tr ? getLayoutRect(tr) : {
        width: 0,
        height: 0
      };
      var er = g29.modifiersData["arrow#persistent"] ? g29.modifiersData["arrow#persistent"].padding : getFreshSideObject();
      var ir = er[H3];
      var or = er[J3];
      var sr = within(0, M10[K3], ar[K3]);
      var mr = L8 ? M10[K3] / 2 - Z5 - sr - ir - X6.mainAxis : $6 - sr - ir - X6.mainAxis;
      var nr = L8 ? -M10[K3] / 2 + Z5 + sr + or + X6.mainAxis : rr + sr + or + X6.mainAxis;
      var lr = g29.elements.arrow && getOffsetParent(g29.elements.arrow);
      var vr = lr ? q10 === "y" ? lr.clientTop || 0 : lr.clientLeft || 0 : 0;
      var dr = (G6 = k10 == null ? void 0 : k10[q10]) != null ? G6 : 0;
      var pr = Q5 + mr - dr - vr;
      var fr = Q5 + nr - dr;
      var ur = within(S11 ? r7(U10, pr) : U10, Q5, S11 ? a10(Y4, fr) : Y4);
      I9[q10] = ur;
      z9[q10] = ur - Q5;
    }
    if (O10) {
      var cr;
      var jr = q10 === "x" ? r6 : v4;
      var gr = q10 === "x" ? a9 : e6;
      var xr = I9[F12];
      var wr = F12 === "y" ? "height" : "width";
      var yr = xr + W8[jr];
      var Ar = xr - W8[gr];
      var hr = [
        r6,
        v4
      ].indexOf(C16) !== -1;
      var Or = (cr = k10 == null ? void 0 : k10[F12]) != null ? cr : 0;
      var br = hr ? yr : xr - M10[wr] - T14[wr] - Or + X6.altAxis;
      var Dr = hr ? xr + M10[wr] + T14[wr] - Or - X6.altAxis : Ar;
      var _r = S11 && hr ? withinMaxClamp(br, xr, Dr) : within(S11 ? br : yr, xr, S11 ? Dr : Ar);
      I9[F12] = _r;
      z9[F12] = _r - xr;
    }
    g29.modifiersData[w10] = z9;
  }
}
var j1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: [
    "offset"
  ]
};
function getHTMLElementScroll(l33) {
  return {
    scrollLeft: l33.scrollLeft,
    scrollTop: l33.scrollTop
  };
}
function getNodeScroll(l34) {
  return l34 !== getWindow(l34) && isHTMLElement(l34) ? getHTMLElementScroll(l34) : getWindowScroll(l34);
}
function isElementScaled(t134) {
  var e134 = t134.getBoundingClientRect();
  var o120 = t9(e134.width) / t134.offsetWidth || 1;
  var r129 = t9(e134.height) / t134.offsetHeight || 1;
  return o120 !== 1 || r129 !== 1;
}
function getCompositeRect(s123, n54, f40) {
  f40 === void 0 && (f40 = false);
  var c29 = isHTMLElement(n54);
  var p26 = isHTMLElement(n54) && isElementScaled(n54);
  var a36 = getDocumentElement(n54);
  var d32 = getBoundingClientRect(s123, p26);
  var g30 = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var j14 = {
    x: 0,
    y: 0
  };
  if (c29 || !c29 && !f40) {
    (getNodeName(n54) !== "body" || isScrollParent(a36)) && (g30 = getNodeScroll(n54));
    if (isHTMLElement(n54)) {
      j14 = getBoundingClientRect(n54, true);
      j14.x += n54.clientLeft;
      j14.y += n54.clientTop;
    } else
      a36 && (j14.x = getWindowScrollBarX(a36));
  }
  return {
    x: d32.left + g30.scrollLeft - j14.x,
    y: d32.top + g30.scrollTop - j14.y,
    width: d32.width,
    height: d32.height
  };
}
function order(e135) {
  var r130 = /* @__PURE__ */ new Map();
  var n116 = /* @__PURE__ */ new Set();
  var o121 = [];
  e135.forEach(function(e222) {
    r130.set(e222.name, e222);
  });
  function sort(e313) {
    n116.add(e313.name);
    var t135 = [].concat(e313.requires || [], e313.requiresIfExists || []);
    t135.forEach(function(e411) {
      if (!n116.has(e411)) {
        var o213 = r130.get(e411);
        o213 && sort(o213);
      }
    });
    o121.push(e313);
  }
  e135.forEach(function(e510) {
    n116.has(e510.name) || sort(e510);
  });
  return o121;
}
function orderModifiers(e61) {
  var r214 = order(e61);
  return x4.reduce(function(e72, n211) {
    return e72.concat(r214.filter(function(e82) {
      return e82.phase === n211;
    }));
  }, []);
}
function debounce1(e92) {
  var r310;
  return function() {
    r310 || (r310 = new Promise(function(n310) {
      Promise.resolve().then(function() {
        r310 = void 0;
        n310(e92());
      });
    }));
    return r310;
  };
}
function format(e102) {
  for (var r45 = arguments.length, n410 = new Array(r45 > 1 ? r45 - 1 : 0), o310 = 1; o310 < r45; o310++) {
    n410[o310 - 1] = arguments[o310];
  }
  return [].concat(n410).reduce(function(e112, r51) {
    return e112.replace(/%s/, r51);
  }, e102);
}
var c5 = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var u6 = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var p7 = [
  "name",
  "enabled",
  "phase",
  "fn",
  "effect",
  "requires",
  "options"
];
function validateModifiers(e122) {
  e122.forEach(function(r61) {
    [].concat(Object.keys(r61), p7).filter(function(e13, r71, n55) {
      return n55.indexOf(e13) === r71;
    }).forEach(function(n61) {
      switch (n61) {
        case "name":
          typeof r61.name !== "string" && console.error(format(c5, String(r61.name), '"name"', '"string"', '"' + String(r61.name) + '"'));
          break;
        case "enabled":
          typeof r61.enabled !== "boolean" && console.error(format(c5, r61.name, '"enabled"', '"boolean"', '"' + String(r61.enabled) + '"'));
          break;
        case "phase":
          x4.indexOf(r61.phase) < 0 && console.error(format(c5, r61.name, '"phase"', "either " + x4.join(", "), '"' + String(r61.phase) + '"'));
          break;
        case "fn":
          typeof r61.fn !== "function" && console.error(format(c5, r61.name, '"fn"', '"function"', '"' + String(r61.fn) + '"'));
          break;
        case "effect":
          r61.effect != null && typeof r61.effect !== "function" && console.error(format(c5, r61.name, '"effect"', '"function"', '"' + String(r61.fn) + '"'));
          break;
        case "requires":
          r61.requires == null || Array.isArray(r61.requires) || console.error(format(c5, r61.name, '"requires"', '"array"', '"' + String(r61.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(r61.requiresIfExists) || console.error(format(c5, r61.name, '"requiresIfExists"', '"array"', '"' + String(r61.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + r61.name + '" modifier, valid properties are ' + p7.map(function(e14) {
            return '"' + e14 + '"';
          }).join(", ") + '; but "' + n61 + '" was provided.');
      }
      r61.requires && r61.requires.forEach(function(n72) {
        e122.find(function(e15) {
          return e15.name === n72;
        }) == null && console.error(format(u6, String(r61.name), n72, n72));
      });
    });
  });
}
function uniqueBy(e16, r81) {
  var n8 = /* @__PURE__ */ new Set();
  return e16.filter(function(e17) {
    var o45 = r81(e17);
    if (!n8.has(o45)) {
      n8.add(o45);
      return true;
    }
  });
}
function mergeByName(e18) {
  var r92 = e18.reduce(function(e19, r102) {
    var n9 = e19[r102.name];
    e19[r102.name] = n9 ? Object.assign({}, n9, r102, {
      options: Object.assign({}, n9.options, r102.options),
      data: Object.assign({}, n9.data, r102.data)
    }) : r102;
    return e19;
  }, {});
  return Object.keys(r92).map(function(e5) {
    return r92[e5];
  });
}
var d8 = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var l7 = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var m5 = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var e20 = arguments.length, r112 = new Array(e20), n10 = 0; n10 < e20; n10++) {
    r112[n10] = arguments[n10];
  }
  return !r112.some(function(e21) {
    return !(e21 && typeof e21.getBoundingClientRect === "function");
  });
}
function popperGenerator(i121) {
  i121 === void 0 && (i121 = {});
  var c115 = i121, u115 = c115.defaultModifiers, p113 = u115 === void 0 ? [] : u115, v111 = c115.defaultOptions, b28 = v111 === void 0 ? m5 : v111;
  return function createPopper(i211, c210, u210) {
    u210 === void 0 && (u210 = b28);
    var v25 = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, m5, b28),
      modifiersData: {},
      elements: {
        reference: i211,
        popper: c210
      },
      attributes: {},
      styles: {}
    };
    var g110 = [];
    var h110 = false;
    var y26 = {
      state: v25,
      setOptions: function setOptions(e22) {
        var r122 = typeof e22 === "function" ? e22(v25.options) : e22;
        cleanupModifierEffects();
        v25.options = Object.assign({}, b28, v25.options, r122);
        v25.scrollParents = {
          reference: isElement(i211) ? listScrollParents(i211) : i211.contextElement ? listScrollParents(i211.contextElement) : [],
          popper: listScrollParents(c210)
        };
        var o51 = orderModifiers(mergeByName([].concat(p113, v25.options.modifiers)));
        v25.orderedModifiers = o51.filter(function(e23) {
          return e23.enabled;
        });
        if (true) {
          var u31 = uniqueBy([].concat(o51, v25.options.modifiers), function(e24) {
            var r13 = e24.name;
            return r13;
          });
          validateModifiers(u31);
          if (getBasePlacement(v25.options.placement) === t8) {
            var d115 = v25.orderedModifiers.find(function(e25) {
              var r14 = e25.name;
              return r14 === "flip";
            });
            d115 || console.error([
              'Popper: "auto" placements require the "flip" modifier be',
              "present and enabled to work."
            ].join(" "));
          }
          var l114 = getComputedStyle(c210), m111 = l114.marginTop, g31 = l114.marginRight, h31 = l114.marginBottom, E17 = l114.marginLeft;
          [
            m111,
            g31,
            h31,
            E17
          ].some(function(e26) {
            return parseFloat(e26);
          }) && console.warn([
            'Popper: CSS "margin" styles cannot be used to apply padding',
            "between the popper and its reference element or boundary.",
            "To replicate margin, use the `offset` modifier, as well as",
            "the `padding` option in the `preventOverflow` and `flip`",
            "modifiers."
          ].join(" "));
        }
        runModifierEffects();
        return y26.update();
      },
      forceUpdate: function forceUpdate() {
        if (!h110) {
          var n11 = v25.elements, t220 = n11.reference, i34 = n11.popper;
          if (areValidElements(t220, i34)) {
            v25.rects = {
              reference: getCompositeRect(t220, getOffsetParent(i34), v25.options.strategy === "fixed"),
              popper: getLayoutRect(i34)
            };
            v25.reset = false;
            v25.placement = v25.options.placement;
            v25.orderedModifiers.forEach(function(e27) {
              return v25.modifiersData[e27.name] = Object.assign({}, e27.data);
            });
            var a124 = 0;
            for (var s124 = 0; s124 < v25.orderedModifiers.length; s124++) {
              if (true) {
                a124 += 1;
                if (a124 > 100) {
                  console.error(l7);
                  break;
                }
              }
              if (v25.reset !== true) {
                var f118 = v25.orderedModifiers[s124], c31 = f118.fn, u41 = f118.options, p27 = u41 === void 0 ? {} : u41, m210 = f118.name;
                typeof c31 === "function" && (v25 = c31({
                  state: v25,
                  options: p27,
                  name: m210,
                  instance: y26
                }) || v25);
              } else {
                v25.reset = false;
                s124 = -1;
              }
            }
          } else
            console.error(d8);
        }
      },
      update: debounce1(function() {
        return new Promise(function(e28) {
          y26.forceUpdate();
          e28(v25);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        h110 = true;
      }
    };
    if (!areValidElements(i211, c210)) {
      console.error(d8);
      return y26;
    }
    y26.setOptions(u210).then(function(e29) {
      !h110 && u210.onFirstUpdate && u210.onFirstUpdate(e29);
    });
    function runModifierEffects() {
      v25.orderedModifiers.forEach(function(e30) {
        var r15 = e30.name, n12 = e30.options, o62 = n12 === void 0 ? {} : n12, t313 = e30.effect;
        if (typeof t313 === "function") {
          var i41 = t313({
            state: v25,
            name: r15,
            instance: y26,
            options: o62
          });
          var a211 = function noopFn() {
          };
          g110.push(i41 || a211);
        }
      });
    }
    function cleanupModifierEffects() {
      g110.forEach(function(e31) {
        return e31();
      });
      g110 = [];
    }
    return y26;
  };
}
popperGenerator();
var m6 = [
  r8,
  t13,
  u5,
  s7
];
popperGenerator({
  defaultModifiers: m6
});
var a11 = [
  r8,
  t13,
  u5,
  s7,
  i7,
  d7,
  j1,
  v5,
  s8
];
var j2 = popperGenerator({
  defaultModifiers: a11
});
var u7 = [
  "anchorEl",
  "children",
  "direction",
  "disablePortal",
  "modifiers",
  "open",
  "placement",
  "popperOptions",
  "popperRef",
  "TransitionProps"
];
var m7 = [
  "anchorEl",
  "children",
  "container",
  "direction",
  "disablePortal",
  "keepMounted",
  "modifiers",
  "open",
  "placement",
  "popperOptions",
  "popperRef",
  "style",
  "transition"
];
function flipPlacement(e136, t136) {
  if (t136 === "ltr")
    return e136;
  switch (e136) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return e136;
  }
}
function resolveAnchorEl(e223) {
  return typeof e223 === "function" ? e223() : e223;
}
var h5 = {};
var b6 = l1(function PopperTooltip(r131, i122) {
  const {
    anchorEl: s125,
    children: p114,
    direction: l115,
    disablePortal: f119,
    modifiers: m112,
    open: h111,
    placement: b111,
    popperOptions: E18,
    popperRef: y27,
    TransitionProps: v26
  } = r131, O11 = _objectWithoutPropertiesLoose(r131, u7);
  const g32 = c1(null);
  const R15 = useForkRef(g32, i122);
  const T15 = c1(null);
  const P = useForkRef(T15, y27);
  const j15 = c1(P);
  d2(() => {
    j15.current = P;
  }, [
    P
  ]);
  w(y27, () => T15.current, []);
  const M11 = flipPlacement(b111, l115);
  const [x19, w18] = s1(M11);
  p1(() => {
    T15.current && T15.current.forceUpdate();
  });
  d2(() => {
    if (!s125 || !h111)
      return;
    const handlePopperUpdate = (e314) => {
      w18(e314.placement);
    };
    const t221 = resolveAnchorEl(s125);
    if (t221 && t221.nodeType === 1) {
      const e412 = t221.getBoundingClientRect();
      e412.top === 0 && e412.left === 0 && e412.right === 0 && e412.bottom === 0 && console.warn([
        "MUI: The `anchorEl` prop provided to the component is invalid.",
        "The anchor element should be part of the document layout.",
        "Make sure the element is present in the document or that it's not display none."
      ].join("\n"));
    }
    let o122 = [
      {
        name: "preventOverflow",
        options: {
          altBoundary: f119
        }
      },
      {
        name: "flip",
        options: {
          altBoundary: f119
        }
      },
      {
        name: "onUpdate",
        enabled: true,
        phase: "afterWrite",
        fn: ({ state: e511 }) => {
          handlePopperUpdate(e511);
        }
      }
    ];
    m112 != null && (o122 = o122.concat(m112));
    E18 && E18.modifiers != null && (o122 = o122.concat(E18.modifiers));
    const n117 = j2(resolveAnchorEl(s125), g32.current, _extends({
      placement: M11
    }, E18, {
      modifiers: o122
    }));
    j15.current(n117);
    return () => {
      n117.destroy();
      j15.current(null);
    };
  }, [
    s125,
    f119,
    m112,
    h111,
    E18,
    M11
  ]);
  const N17 = {
    placement: x19
  };
  v26 !== null && (N17.TransitionProps = v26);
  return p4("div", _extends({
    ref: R15,
    role: "tooltip"
  }, O11, {
    children: typeof p114 === "function" ? p114(N17) : p114
  }));
});
var E2 = l1(function PopperUnstyled(o214, n212) {
  const {
    anchorEl: i212,
    children: s212,
    container: p28,
    direction: a125 = "ltr",
    disablePortal: l210 = false,
    keepMounted: u116 = false,
    modifiers: E21,
    open: y28,
    placement: v27 = "bottom",
    popperOptions: O12 = h5,
    popperRef: g33,
    style: R16,
    transition: T16 = false
  } = o214, P = _objectWithoutPropertiesLoose(o214, m7);
  const [j16, M12] = s1(true);
  const handleEnter = () => {
    M12(false);
  };
  const handleExited = () => {
    M12(true);
  };
  if (!u116 && !y28 && (!T16 || j16))
    return null;
  const x20 = p28 || (i212 ? ownerDocument(resolveAnchorEl(i212)).body : void 0);
  return p4(a7, {
    disablePortal: l210,
    container: x20,
    children: p4(b6, _extends({
      anchorEl: i212,
      direction: a125,
      disablePortal: l210,
      modifiers: E21,
      ref: n212,
      open: T16 ? !j16 : y28,
      placement: v27,
      popperOptions: O12,
      popperRef: g33
    }, P, {
      style: _extends({
        position: "fixed",
        top: 0,
        left: 0,
        display: y28 || !u116 || T16 && !j16 ? null : "none"
      }, R16),
      TransitionProps: T16 ? {
        in: y28,
        onEnter: handleEnter,
        onExited: handleExited
      } : null,
      children: s212
    }))
  });
});
true ? E2.propTypes = {
  anchorEl: chainPropTypes(s2.oneOfType([
    HTMLElementType,
    s2.object,
    s2.func
  ]), (e62) => {
    if (e62.open) {
      const t314 = resolveAnchorEl(e62.anchorEl);
      if (t314 && t314.nodeType === 1) {
        const e72 = t314.getBoundingClientRect();
        if (e72.top === 0 && e72.left === 0 && e72.right === 0 && e72.bottom === 0) {
          return new Error([
            "MUI: The `anchorEl` prop provided to the component is invalid.",
            "The anchor element should be part of the document layout.",
            "Make sure the element is present in the document or that it's not display none."
          ].join("\n"));
        }
      } else if (!t314 || typeof t314.getBoundingClientRect !== "function" || t314.contextElement != null && t314.contextElement.nodeType !== 1) {
        return new Error([
          "MUI: The `anchorEl` prop provided to the component is invalid.",
          "It should be an HTML element instance or a virtualElement ",
          "(https://popper.js.org/docs/v2/virtual-elements/)."
        ].join("\n"));
      }
    }
    return null;
  }),
  children: s2.oneOfType([
    s2.node,
    s2.func
  ]),
  container: s2.oneOfType([
    HTMLElementType,
    s2.func
  ]),
  direction: s2.oneOf([
    "ltr",
    "rtl"
  ]),
  disablePortal: s2.bool,
  keepMounted: s2.bool,
  modifiers: s2.arrayOf(s2.shape({
    data: s2.object,
    effect: s2.func,
    enabled: s2.bool,
    fn: s2.func,
    name: s2.any.isRequired,
    options: s2.object,
    phase: s2.oneOf([
      "afterMain",
      "afterRead",
      "afterWrite",
      "beforeMain",
      "beforeRead",
      "beforeWrite",
      "main",
      "read",
      "write"
    ]),
    requires: s2.arrayOf(s2.string),
    requiresIfExists: s2.arrayOf(s2.string)
  })),
  open: s2.bool.isRequired,
  placement: s2.oneOf([
    "auto-end",
    "auto-start",
    "auto",
    "bottom-end",
    "bottom-start",
    "bottom",
    "left-end",
    "left-start",
    "left",
    "right-end",
    "right-start",
    "right",
    "top-end",
    "top-start",
    "top"
  ]),
  popperOptions: s2.shape({
    modifiers: s2.array,
    onFirstUpdate: s2.func,
    placement: s2.oneOf([
      "auto-end",
      "auto-start",
      "auto",
      "bottom-end",
      "bottom-start",
      "bottom",
      "left-end",
      "left-start",
      "left",
      "right-end",
      "right-start",
      "right",
      "top-end",
      "top-start",
      "top"
    ]),
    strategy: s2.oneOf([
      "absolute",
      "fixed"
    ])
  }),
  popperRef: a4,
  style: s2.object,
  transition: s2.bool
} : void 0;
function getSliderUtilityClass(e137) {
  return generateUtilityClass("MuiSlider", e137);
}
var y5 = generateUtilityClasses("MuiSlider", [
  "root",
  "active",
  "focusVisible",
  "disabled",
  "dragging",
  "marked",
  "vertical",
  "trackInverted",
  "trackFalse",
  "rail",
  "track",
  "mark",
  "markActive",
  "markLabel",
  "markLabelActive",
  "thumb",
  "valueLabel",
  "valueLabelOpen",
  "valueLabelCircle",
  "valueLabelLabel"
]);
var useValueLabelClasses = (e224) => {
  const { open: t137 } = e224;
  const a126 = {
    offset: clsx_m(t137 && y5.valueLabelOpen),
    circle: y5.valueLabelCircle,
    label: y5.valueLabelLabel
  };
  return a126;
};
function SliderValueLabelUnstyled(e315) {
  const { children: t222, className: n118, value: l116, theme: s126 } = e315;
  const o123 = useValueLabelClasses(e315);
  return I(t222, {
    className: clsx_m(t222.props.className)
  }, y3(i1, {
    children: [
      t222.props.children,
      p4("span", {
        className: clsx_m(o123.offset, n118),
        theme: s126,
        "aria-hidden": true,
        children: p4("span", {
          className: o123.circle,
          children: p4("span", {
            className: o123.label,
            children: l116
          })
        })
      })
    ]
  }));
}
true ? SliderValueLabelUnstyled.propTypes = {
  children: s2.element.isRequired,
  className: s2.string,
  theme: s2.any,
  value: s2.node
} : void 0;
var x5 = [
  "aria-label",
  "aria-labelledby",
  "aria-valuetext",
  "className",
  "component",
  "classes",
  "defaultValue",
  "disableSwap",
  "disabled",
  "getAriaLabel",
  "getAriaValueText",
  "marks",
  "max",
  "min",
  "name",
  "onChange",
  "onChangeCommitted",
  "onMouseDown",
  "orientation",
  "scale",
  "step",
  "tabIndex",
  "track",
  "value",
  "valueLabelDisplay",
  "valueLabelFormat",
  "isRtl",
  "components",
  "componentsProps"
];
function asc(e413, t315) {
  return e413 - t315;
}
function clamp(e512, t412, a212) {
  return e512 == null ? t412 : Math.min(Math.max(t412, e512), a212);
}
function findClosest(e63, t510) {
  const { index: a37 } = e63.reduce((e72, a41, n213) => {
    const r132 = Math.abs(t510 - a41);
    return e72 === null || r132 < e72.distance || r132 === e72.distance ? {
      distance: r132,
      index: n213
    } : e72;
  }, null);
  return a37;
}
function trackFinger(e82, t63) {
  if (t63.current !== void 0 && e82.changedTouches) {
    for (let a51 = 0; a51 < e82.changedTouches.length; a51 += 1) {
      const n311 = e82.changedTouches[a51];
      if (n311.identifier === t63.current) {
        return {
          x: n311.clientX,
          y: n311.clientY
        };
      }
    }
    return false;
  }
  return {
    x: e82.clientX,
    y: e82.clientY
  };
}
function valueToPercent(e92, t73, a61) {
  return 100 * (e92 - t73) / (a61 - t73);
}
function percentToValue(e102, t81, a71) {
  return (a71 - t81) * e102 + t81;
}
function getDecimalPrecision(e112) {
  if (Math.abs(e112) < 1) {
    const t91 = e112.toExponential().split("e-");
    const a81 = t91[0].split(".")[1];
    return (a81 ? a81.length : 0) + parseInt(t91[1], 10);
  }
  const t101 = e112.toString().split(".")[1];
  return t101 ? t101.length : 0;
}
function roundValueToStep(e122, t1110, a91) {
  const n411 = Math.round((e122 - a91) / t1110) * t1110 + a91;
  return Number(n411.toFixed(getDecimalPrecision(t1110)));
}
function setValueIndex({ values: e13, newValue: t1210, index: a18 }) {
  const n56 = e13.slice();
  n56[a18] = t1210;
  return n56.sort(asc);
}
function focusThumb({ sliderRef: e14, activeIndex: t138, setActive: a101 }) {
  const n62 = ownerDocument(e14.current);
  e14.current.contains(n62.activeElement) && Number(n62.activeElement.getAttribute("data-index")) === t138 || e14.current.querySelector(`[type="range"][data-index="${t138}"]`).focus();
  a101 && a101(t138);
}
var k1 = {
  horizontal: {
    offset: (e15) => ({
      left: `${e15}%`
    }),
    leap: (e16) => ({
      width: `${e16}%`
    })
  },
  "horizontal-reverse": {
    offset: (e17) => ({
      right: `${e17}%`
    }),
    leap: (e18) => ({
      width: `${e18}%`
    })
  },
  vertical: {
    offset: (e19) => ({
      bottom: `${e19}%`
    }),
    leap: (e20) => ({
      height: `${e20}%`
    })
  }
};
var Identity = (e21) => e21;
var T1;
function doesSupportTouchActionNone() {
  T1 === void 0 && (T1 = typeof CSS === "undefined" || typeof CSS.supports !== "function" || CSS.supports("touch-action", "none"));
  return T1;
}
var useUtilityClasses4 = (e22) => {
  const {
    disabled: t142,
    dragging: a1110,
    marked: n72,
    orientation: r215,
    track: l211,
    classes: s213
  } = e22;
  const o215 = {
    root: [
      "root",
      t142 && "disabled",
      a1110 && "dragging",
      n72 && "marked",
      r215 === "vertical" && "vertical",
      l211 === "inverted" && "trackInverted",
      l211 === false && "trackFalse"
    ],
    rail: [
      "rail"
    ],
    track: [
      "track"
    ],
    mark: [
      "mark"
    ],
    markActive: [
      "markActive"
    ],
    markLabel: [
      "markLabel"
    ],
    markLabelActive: [
      "markLabelActive"
    ],
    valueLabel: [
      "valueLabel"
    ],
    thumb: [
      "thumb",
      t142 && "disabled"
    ],
    active: [
      "active"
    ],
    disabled: [
      "disabled"
    ],
    focusVisible: [
      "focusVisible"
    ]
  };
  return composeClasses(o215, getSliderUtilityClass, s213);
};
var Forward = ({ children: e23 }) => e23;
var S1 = l1(function SliderUnstyled(n8, d116) {
  const {
    "aria-label": v112,
    "aria-labelledby": p115,
    "aria-valuetext": b112,
    className: y112,
    component: T17 = "span",
    classes: S12,
    defaultValue: w19,
    disableSwap: A10 = false,
    disabled: N18 = false,
    getAriaLabel: V14,
    getAriaValueText: C17,
    marks: E19 = false,
    max: I10 = 100,
    min: O13 = 0,
    name: R17,
    onChange: M13,
    onChangeCommitted: F13,
    onMouseDown: D12,
    orientation: P = "horizontal",
    scale: U11 = Identity,
    step: $7 = 1,
    tabIndex: j17,
    track: z10 = "normal",
    value: Y5,
    valueLabelDisplay: q11 = "off",
    valueLabelFormat: B13 = Identity,
    isRtl: _15 = false,
    components: X7 = {},
    componentsProps: W9 = {}
  } = n8, G7 = _objectWithoutPropertiesLoose(n8, x5);
  const H7 = c1();
  const [J4, K5] = s1(-1);
  const [Q6, Z6] = s1(-1);
  const [ee3, te3] = s1(false);
  const ae = c1(0);
  const [ne2, re] = useControlled({
    controlled: Y5,
    default: w19 != null ? w19 : O13,
    name: "Slider"
  });
  const le2 = M13 && ((e24, t152, a122) => {
    const n9 = e24.nativeEvent || e24;
    const r311 = new n9.constructor(n9.type, n9);
    Object.defineProperty(r311, "target", {
      writable: true,
      value: {
        value: t152,
        name: R17
      }
    });
    M13(r311, t152, a122);
  });
  const se2 = Array.isArray(ne2);
  let oe2 = se2 ? ne2.slice().sort(asc) : [
    ne2
  ];
  oe2 = oe2.map((e25) => clamp(e25, O13, I10));
  const ie = E19 === true && $7 !== null ? [
    ...Array(Math.floor((I10 - O13) / $7) + 1)
  ].map((e5, t162) => ({
    value: O13 + $7 * t162
  })) : E19 || [];
  const { isFocusVisibleRef: ce, onBlur: ue2, onFocus: me2, ref: de2 } = useIsFocusVisible();
  const [fe, ve1] = s1(-1);
  const pe2 = c1();
  const be1 = useForkRef(de2, pe2);
  const he2 = useForkRef(d116, be1);
  const handleFocus = (e26) => {
    const t172 = Number(e26.currentTarget.getAttribute("data-index"));
    me2(e26);
    ce.current === true && ve1(t172);
    Z6(t172);
  };
  const handleBlur = (e27) => {
    ue2(e27);
    ce.current === false && ve1(-1);
    Z6(-1);
  };
  const ge2 = useEventCallback((e28) => {
    const t182 = Number(e28.currentTarget.getAttribute("data-index"));
    Z6(t182);
  });
  const ye = useEventCallback(() => {
    Z6(-1);
  });
  d2(() => {
    N18 && pe2.current.contains(document.activeElement) && document.activeElement.blur();
  }, [
    N18
  ]);
  N18 && J4 !== -1 && K5(-1);
  N18 && fe !== -1 && ve1(-1);
  const handleHiddenInputChange = (e29) => {
    const t192 = Number(e29.currentTarget.getAttribute("data-index"));
    const a132 = oe2[t192];
    const n10 = ie.map((e30) => e30.value);
    const r = n10.indexOf(a132);
    let l35 = e29.target.valueAsNumber;
    ie && $7 == null && (l35 = l35 < a132 ? n10[r - 1] : n10[r + 1]);
    l35 = clamp(l35, O13, I10);
    if (ie && $7 == null) {
      const e31 = ie.map((e32) => e32.value);
      const a18 = e31.indexOf(oe2[t192]);
      l35 = l35 < oe2[t192] ? e31[a18 - 1] : e31[a18 + 1];
    }
    if (se2) {
      A10 && (l35 = clamp(l35, oe2[t192 - 1] || -Infinity, oe2[t192 + 1] || Infinity));
      const e33 = l35;
      l35 = setValueIndex({
        values: oe2,
        newValue: l35,
        index: t192
      });
      let a142 = t192;
      A10 || (a142 = l35.indexOf(e33));
      focusThumb({
        sliderRef: pe2,
        activeIndex: a142
      });
    }
    re(l35);
    ve1(t192);
    le2 && le2(e29, l35, t192);
    F13 && F13(e29, l35);
  };
  const xe1 = c1();
  let Le = P;
  _15 && P !== "vertical" && (Le += "-reverse");
  const getFingerNewValue = ({ finger: e34, move: t20 = false, values: a152 }) => {
    const { current: n11 } = pe2;
    const { width: r46, height: l41, bottom: s310, left: o311 } = n11.getBoundingClientRect();
    let i123;
    i123 = Le.indexOf("vertical") === 0 ? (s310 - e34.y) / l41 : (e34.x - o311) / r46;
    Le.indexOf("-reverse") !== -1 && (i123 = 1 - i123);
    let c116;
    c116 = percentToValue(i123, O13, I10);
    if ($7)
      c116 = roundValueToStep(c116, $7, O13);
    else {
      const e35 = ie.map((e36) => e36.value);
      const t = findClosest(e35, c116);
      c116 = e35[t];
    }
    c116 = clamp(c116, O13, I10);
    let u117 = 0;
    if (se2) {
      u117 = t20 ? xe1.current : findClosest(a152, c116);
      A10 && (c116 = clamp(c116, a152[u117 - 1] || -Infinity, a152[u117 + 1] || Infinity));
      const e37 = c116;
      c116 = setValueIndex({
        values: a152,
        newValue: c116,
        index: u117
      });
      if (!(A10 && t20)) {
        u117 = c116.indexOf(e37);
        xe1.current = u117;
      }
    }
    return {
      newValue: c116,
      activeIndex: u117
    };
  };
  const ke1 = useEventCallback((e38) => {
    const t21 = trackFinger(e38, H7);
    if (!t21)
      return;
    ae.current += 1;
    if (e38.type === "mousemove" && e38.buttons === 0) {
      Te(e38);
      return;
    }
    const { newValue: a162, activeIndex: n12 } = getFingerNewValue({
      finger: t21,
      move: true,
      values: oe2
    });
    focusThumb({
      sliderRef: pe2,
      activeIndex: n12,
      setActive: K5
    });
    re(a162);
    !ee3 && ae.current > 2 && te3(true);
    le2 && le2(e38, a162, n12);
  });
  const Te = useEventCallback((e39) => {
    const t22 = trackFinger(e39, H7);
    te3(false);
    if (!t22)
      return;
    const { newValue: a172 } = getFingerNewValue({
      finger: t22,
      values: oe2
    });
    K5(-1);
    e39.type === "touchend" && Z6(-1);
    F13 && F13(e39, a172);
    H7.current = void 0;
    we();
  });
  const Se = useEventCallback((e40) => {
    doesSupportTouchActionNone() || e40.preventDefault();
    const t23 = e40.changedTouches[0];
    t23 != null && (H7.current = t23.identifier);
    const a18 = trackFinger(e40, H7);
    const { newValue: n13, activeIndex: r52 } = getFingerNewValue({
      finger: a18,
      values: oe2
    });
    focusThumb({
      sliderRef: pe2,
      activeIndex: r52,
      setActive: K5
    });
    re(n13);
    le2 && le2(e40, n13, r52);
    ae.current = 0;
    const s42 = ownerDocument(pe2.current);
    s42.addEventListener("touchmove", ke1);
    s42.addEventListener("touchend", Te);
  });
  const we = u(() => {
    const e41 = ownerDocument(pe2.current);
    e41.removeEventListener("mousemove", ke1);
    e41.removeEventListener("mouseup", Te);
    e41.removeEventListener("touchmove", ke1);
    e41.removeEventListener("touchend", Te);
  }, [
    Te,
    ke1
  ]);
  p1(() => {
    const { current: e42 } = pe2;
    e42.addEventListener("touchstart", Se, {
      passive: doesSupportTouchActionNone()
    });
    return () => {
      e42.removeEventListener("touchstart", Se, {
        passive: doesSupportTouchActionNone()
      });
      we();
    };
  }, [
    we,
    Se
  ]);
  p1(() => {
    N18 && we();
  }, [
    N18,
    we
  ]);
  const Ae = useEventCallback((e43) => {
    D12 && D12(e43);
    if (e43.button !== 0)
      return;
    e43.preventDefault();
    const t24 = trackFinger(e43, H7);
    const { newValue: a19, activeIndex: n14 } = getFingerNewValue({
      finger: t24,
      values: oe2
    });
    focusThumb({
      sliderRef: pe2,
      activeIndex: n14,
      setActive: K5
    });
    re(a19);
    le2 && le2(e43, a19, n14);
    ae.current = 0;
    const r62 = ownerDocument(pe2.current);
    r62.addEventListener("mousemove", ke1);
    r62.addEventListener("mouseup", Te);
  });
  const Ne = valueToPercent(se2 ? oe2[0] : O13, O13, I10);
  const Ve = valueToPercent(oe2[oe2.length - 1], O13, I10) - Ne;
  const Ce1 = _extends({}, k1[Le].offset(Ne), k1[Le].leap(Ve));
  const Ee = X7.Root || T17;
  const Ie = W9.root || {};
  const Oe = X7.Rail || "span";
  const Re = W9.rail || {};
  const Me = X7.Track || "span";
  const Fe = W9.track || {};
  const De = X7.Thumb || "span";
  const Pe = W9.thumb || {};
  const Ue = X7.ValueLabel || SliderValueLabelUnstyled;
  const $e = W9.valueLabel || {};
  const je = X7.Mark || "span";
  const ze = W9.mark || {};
  const Ye = X7.MarkLabel || "span";
  const qe = W9.markLabel || {};
  const Be = _extends({}, n8, {
    classes: S12,
    disabled: N18,
    dragging: ee3,
    isRtl: _15,
    marked: ie.length > 0 && ie.some((e44) => e44.label),
    max: I10,
    min: O13,
    orientation: P,
    scale: U11,
    step: $7,
    track: z10,
    valueLabelDisplay: q11,
    valueLabelFormat: B13
  });
  const _e2 = useUtilityClasses4(Be);
  return y3(Ee, _extends({
    ref: he2,
    onMouseDown: Ae
  }, Ie, !isHostComponent(Ee) && {
    as: T17,
    ownerState: _extends({}, Be, Ie.ownerState)
  }, G7, {
    className: clsx_m(_e2.root, Ie.className, y112),
    children: [
      p4(Oe, _extends({}, Re, !isHostComponent(Oe) && {
        ownerState: _extends({}, Be, Re.ownerState)
      }, {
        className: clsx_m(_e2.rail, Re.className)
      })),
      p4(Me, _extends({}, Fe, !isHostComponent(Me) && {
        ownerState: _extends({}, Be, Fe.ownerState)
      }, {
        className: clsx_m(_e2.track, Fe.className),
        style: _extends({}, Ce1, Fe.style)
      })),
      ie.map((t25, n15) => {
        const l51 = valueToPercent(t25.value, O13, I10);
        const s5 = k1[Le].offset(l51);
        let o46;
        o46 = z10 === false ? oe2.indexOf(t25.value) !== -1 : z10 === "normal" && (se2 ? t25.value >= oe2[0] && t25.value <= oe2[oe2.length - 1] : t25.value <= oe2[0]) || z10 === "inverted" && (se2 ? t25.value <= oe2[0] || t25.value >= oe2[oe2.length - 1] : t25.value >= oe2[0]);
        return y3(i1, {
          children: [
            p4(je, _extends({
              "data-index": n15
            }, ze, !isHostComponent(je) && {
              ownerState: _extends({}, Be, ze.ownerState),
              markActive: o46
            }, {
              style: _extends({}, s5, ze.style),
              className: clsx_m(_e2.mark, ze.className, o46 && _e2.markActive)
            })),
            t25.label != null ? p4(Ye, _extends({
              "aria-hidden": true,
              "data-index": n15
            }, qe, !isHostComponent(Ye) && {
              ownerState: _extends({}, Be, qe.ownerState)
            }, {
              markLabelActive: o46,
              style: _extends({}, s5, qe.style),
              className: clsx_m(_e2.markLabel, qe.className, o46 && _e2.markLabelActive),
              children: t25.label
            })) : null
          ]
        }, t25.value);
      }),
      oe2.map((t26, l61) => {
        const s61 = valueToPercent(t26, O13, I10);
        const o52 = k1[Le].offset(s61);
        const i213 = q11 === "off" ? Forward : Ue;
        return p4(i1, {
          children: p4(i213, _extends({
            valueLabelFormat: B13,
            valueLabelDisplay: q11,
            value: typeof B13 === "function" ? B13(U11(t26), l61) : B13,
            index: l61,
            open: Q6 === l61 || J4 === l61 || q11 === "on",
            disabled: N18
          }, $e, {
            className: clsx_m(_e2.valueLabel, $e.className)
          }, !isHostComponent(Ue) && {
            ownerState: _extends({}, Be, $e.ownerState)
          }, {
            children: p4(De, _extends({
              "data-index": l61,
              onMouseOver: ge2,
              onMouseLeave: ye
            }, Pe, {
              className: clsx_m(_e2.thumb, Pe.className, J4 === l61 && _e2.active, fe === l61 && _e2.focusVisible)
            }, !isHostComponent(De) && {
              ownerState: _extends({}, Be, Pe.ownerState)
            }, {
              style: _extends({}, o52, {
                pointerEvents: A10 && J4 !== l61 ? "none" : void 0
              }, Pe.style),
              children: p4("input", {
                tabIndex: j17,
                "data-index": l61,
                "aria-label": V14 ? V14(l61) : v112,
                "aria-labelledby": p115,
                "aria-orientation": P,
                "aria-valuemax": U11(I10),
                "aria-valuemin": U11(O13),
                "aria-valuenow": U11(t26),
                "aria-valuetext": C17 ? C17(U11(t26), l61) : b112,
                onFocus: handleFocus,
                onBlur: handleBlur,
                name: R17,
                type: "range",
                min: n8.min,
                max: n8.max,
                step: n8.step,
                disabled: N18,
                value: oe2[l61],
                onChange: handleHiddenInputChange,
                style: _extends({}, g2, {
                  direction: _15 ? "rtl" : "ltr",
                  width: "100%",
                  height: "100%"
                })
              })
            }))
          }))
        }, l61);
      })
    ]
  }));
});
true ? S1.propTypes = {
  "aria-label": chainPropTypes(s2.string, (e45) => {
    const t27 = Array.isArray(e45.value || e45.defaultValue);
    return t27 && e45["aria-label"] != null ? new Error("MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.") : null;
  }),
  "aria-labelledby": s2.string,
  "aria-valuetext": chainPropTypes(s2.string, (e46) => {
    const t28 = Array.isArray(e46.value || e46.defaultValue);
    return t28 && e46["aria-valuetext"] != null ? new Error("MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.") : null;
  }),
  children: s2.node,
  classes: s2.object,
  className: s2.string,
  component: s2.elementType,
  components: s2.shape({
    Mark: s2.elementType,
    MarkLabel: s2.elementType,
    Rail: s2.elementType,
    Root: s2.elementType,
    Thumb: s2.elementType,
    Track: s2.elementType,
    ValueLabel: s2.elementType
  }),
  componentsProps: s2.object,
  defaultValue: s2.oneOfType([
    s2.arrayOf(s2.number),
    s2.number
  ]),
  disabled: s2.bool,
  disableSwap: s2.bool,
  getAriaLabel: s2.func,
  getAriaValueText: s2.func,
  isRtl: s2.bool,
  marks: s2.oneOfType([
    s2.arrayOf(s2.shape({
      label: s2.node,
      value: s2.number.isRequired
    })),
    s2.bool
  ]),
  max: s2.number,
  min: s2.number,
  name: s2.string,
  onChange: s2.func,
  onChangeCommitted: s2.func,
  onMouseDown: s2.func,
  orientation: s2.oneOf([
    "horizontal",
    "vertical"
  ]),
  scale: s2.func,
  step: s2.number,
  tabIndex: s2.number,
  track: s2.oneOf([
    "inverted",
    "normal",
    false
  ]),
  value: s2.oneOfType([
    s2.arrayOf(s2.number),
    s2.number
  ]),
  valueLabelDisplay: s2.oneOf([
    "auto",
    "off",
    "on"
  ]),
  valueLabelFormat: s2.oneOfType([
    s2.func,
    s2.string
  ])
} : void 0;
function useSwitch(o124) {
  const {
    checked: s127,
    defaultChecked: t139,
    disabled: u118,
    onBlur: i124,
    onChange: a127,
    onFocus: d117,
    onFocusVisible: m113,
    readOnly: p116,
    required: f120
  } = o124;
  const [h112, b29] = useControlled({
    controlled: s127,
    default: Boolean(t139),
    name: "Switch",
    state: "checked"
  });
  const handleInputChange = (e138, o216) => {
    if (!e138.nativeEvent.defaultPrevented) {
      b29(e138.target.checked);
      a127 == null ? void 0 : a127(e138);
      o216 == null ? void 0 : o216(e138);
    }
  };
  const { isFocusVisibleRef: y29, onBlur: k11, onFocus: v28, ref: C18 } = useIsFocusVisible();
  const [g34, F14] = s1(false);
  u118 && g34 && F14(false);
  p1(() => {
    y29.current = g34;
  }, [
    g34,
    y29
  ]);
  const O14 = c1(null);
  const handleFocus = (e225, o312) => {
    O14.current || (O14.current = e225.currentTarget);
    v28(e225);
    if (y29.current === true) {
      F14(true);
      m113 == null ? void 0 : m113(e225);
    }
    d117 == null ? void 0 : d117(e225);
    o312 == null ? void 0 : o312(e225);
  };
  const handleBlur = (e316, o47) => {
    k11(e316);
    y29.current === false && F14(false);
    i124 == null ? void 0 : i124(e316);
    o47 == null ? void 0 : o47(e316);
  };
  const N19 = useForkRef(C18, O14);
  const getInputProps = (o53 = {}) => _extends({
    checked: s127,
    defaultChecked: t139,
    disabled: u118,
    readOnly: p116,
    required: f120,
    type: "checkbox"
  }, o53, {
    onChange: (e414) => handleInputChange(e414, o53.onChange),
    onFocus: (e513) => handleFocus(e513, o53.onFocus),
    onBlur: (e64) => handleBlur(e64, o53.onBlur),
    ref: N19
  });
  return {
    checked: h112,
    disabled: Boolean(u118),
    focusVisible: g34,
    getInputProps,
    readOnly: Boolean(p116)
  };
}
var p8 = generateUtilityClasses("MuiSwitch", [
  "root",
  "input",
  "track",
  "thumb",
  "checked",
  "disabled",
  "focusVisible",
  "readOnly"
]);
var f7 = [
  "checked",
  "className",
  "component",
  "components",
  "componentsProps",
  "defaultChecked",
  "disabled",
  "onBlur",
  "onChange",
  "onFocus",
  "onFocusVisible",
  "readOnly",
  "required"
];
var h6 = l1(function SwitchUnstyled(n119, s214) {
  var l117, c117, r133, u211, i214, h210, b30;
  const {
    checked: y30,
    className: k12,
    component: v29,
    components: C19 = {},
    componentsProps: g35 = {},
    defaultChecked: F15,
    disabled: O15,
    onBlur: N20,
    onChange: T18,
    onFocus: V15,
    onFocusVisible: B14,
    readOnly: w20
  } = n119, S13 = _objectWithoutPropertiesLoose(n119, f7);
  const P = {
    checked: y30,
    defaultChecked: F15,
    disabled: O15,
    onBlur: N20,
    onChange: T18,
    onFocus: V15,
    onFocusVisible: B14,
    readOnly: w20
  };
  const {
    getInputProps: U12,
    checked: j18,
    disabled: x21,
    focusVisible: R18,
    readOnly: q12
  } = useSwitch(P);
  const E20 = _extends({}, n119, {
    checked: j18,
    disabled: x21,
    focusVisible: R18,
    readOnly: q12
  });
  const I11 = (l117 = v29 != null ? v29 : C19.Root) != null ? l117 : "span";
  const _16 = appendOwnerState(I11, _extends({}, S13, g35.root), E20);
  const M14 = (c117 = C19.Thumb) != null ? c117 : "span";
  const D13 = appendOwnerState(M14, (r133 = g35.thumb) != null ? r133 : {}, E20);
  const L9 = (u211 = C19.Input) != null ? u211 : "input";
  const W10 = appendOwnerState(L9, (i214 = g35.input) != null ? i214 : {}, E20);
  const z11 = C19.Track === null ? () => null : (h210 = C19.Track) != null ? h210 : "span";
  const A11 = appendOwnerState(z11, (b30 = g35.track) != null ? b30 : {}, E20);
  const G8 = clsx_m(j18 && p8.checked, x21 && p8.disabled, R18 && p8.focusVisible, q12 && p8.readOnly);
  return y3(I11, _extends({
    ref: s214
  }, _16, {
    className: clsx_m(p8.root, G8, k12, _16 == null ? void 0 : _16.className),
    children: [
      p4(z11, _extends({}, A11, {
        className: clsx_m(p8.track, A11 == null ? void 0 : A11.className)
      })),
      p4(M14, _extends({}, D13, {
        className: clsx_m(p8.thumb, D13 == null ? void 0 : D13.className)
      })),
      p4(L9, _extends({}, U12(W10), {
        className: clsx_m(p8.input, W10 == null ? void 0 : W10.className)
      }))
    ]
  }));
});
true ? h6.propTypes = {
  checked: s2.bool,
  className: s2.string,
  component: s2.elementType,
  components: s2.shape({
    Input: s2.elementType,
    Root: s2.elementType,
    Thumb: s2.elementType,
    Track: s2.oneOfType([
      s2.elementType,
      s2.oneOf([
        null
      ])
    ])
  }),
  componentsProps: s2.object,
  defaultChecked: s2.bool,
  disabled: s2.bool,
  onBlur: s2.func,
  onChange: s2.func,
  onFocus: s2.func,
  onFocusVisible: s2.func,
  readOnly: s2.bool,
  required: s2.bool
} : void 0;
function getTabsUnstyledUtilityClass(o125) {
  return generateUtilityClass("TabsUnstyled", o125);
}
generateUtilityClasses("TabsUnstyled", [
  "root",
  "horizontal",
  "vertical"
]);
var useTabs = (o217) => {
  const {
    value: e139,
    defaultValue: n120,
    onChange: s128,
    orientation: r134,
    direction: l118,
    selectionFollowsFocus: i125
  } = o217;
  const [a128, m114] = useControlled({
    controlled: e139,
    default: n120,
    name: "Tabs",
    state: "value"
  });
  const p117 = useId();
  const d118 = u((o313, e226) => {
    m114(e226);
    s128 && s128(o313, e226);
  }, [
    s128,
    m114
  ]);
  const getRootProps = () => ({});
  const f121 = F(() => ({
    idPrefix: p117,
    value: a128,
    onSelected: d118,
    orientation: r134,
    direction: l118,
    selectionFollowsFocus: i125
  }), [
    p117,
    a128,
    d118,
    r134,
    l118,
    i125
  ]);
  return {
    getRootProps,
    tabsContextValue: f121
  };
};
var d9 = t1(null);
d9.displayName = "TabsContext";
function useTabContext() {
  return r1(d9);
}
function getPanelId(o48, e317) {
  const { idPrefix: t140 } = o48;
  return t140 === null ? null : `${o48.idPrefix}-P-${e317}`;
}
function getTabId(o54, e415) {
  const { idPrefix: t223 } = o54;
  return t223 === null ? null : `${o54.idPrefix}-T-${e415}`;
}
var f8 = [
  "children",
  "className",
  "value",
  "defaultValue",
  "orientation",
  "direction",
  "component",
  "components",
  "componentsProps",
  "onChange",
  "selectionFollowsFocus"
];
var useUtilityClasses5 = (o62) => {
  const { orientation: e514 } = o62;
  const t316 = {
    root: [
      "root",
      e514
    ]
  };
  return composeClasses(t316, getTabsUnstyledUtilityClass, {});
};
var b7 = l1((t413, n214) => {
  var l212, i215;
  const {
    children: a213,
    className: c118,
    orientation: u119 = "horizontal",
    direction: p29 = "ltr",
    component: b113,
    components: C20 = {},
    componentsProps: T19 = {}
  } = t413, g36 = _objectWithoutPropertiesLoose(t413, f8);
  const { tabsContextValue: x22, getRootProps: y31 } = useTabs(t413);
  const h32 = _extends({}, t413, {
    orientation: u119,
    direction: p29
  });
  const v30 = useUtilityClasses5(h32);
  const P = (l212 = b113 != null ? b113 : C20.Root) != null ? l212 : "div";
  const N21 = appendOwnerState(P, _extends({}, g36, T19.root), h32);
  return p4(P, _extends({}, y31(), N21, {
    ref: n214,
    className: clsx_m(v30.root, (i215 = T19.root) == null ? void 0 : i215.className, c118),
    children: p4(d9.Provider, {
      value: x22,
      children: a213
    })
  }));
});
true ? b7.propTypes = {
  children: s2.node,
  className: s2.string,
  component: s2.elementType,
  components: s2.shape({
    Root: s2.elementType
  }),
  componentsProps: s2.object,
  defaultValue: s2.oneOfType([
    s2.oneOf([
      false
    ]),
    s2.number,
    s2.string
  ]),
  direction: s2.oneOf([
    "ltr",
    "rtl"
  ]),
  onChange: s2.func,
  orientation: s2.oneOf([
    "horizontal",
    "vertical"
  ]),
  selectionFollowsFocus: s2.bool,
  value: s2.oneOfType([
    s2.oneOf([
      false
    ]),
    s2.number,
    s2.string
  ])
} : void 0;
function getTabPanelUnstyledUtilityClass(e140) {
  return generateUtilityClass("TabPanelUnstyled", e140);
}
generateUtilityClasses("TabPanelUnstyled", [
  "root",
  "hidden"
]);
var useTabPanel = (e227) => {
  const { value: o126 } = e227;
  const t141 = useTabContext();
  if (t141 === null)
    throw new Error("No TabContext provided");
  const n121 = o126 !== t141.value;
  const s129 = getPanelId(t141, o126);
  const r135 = getTabId(t141, o126);
  const getRootProps = () => ({
    "aria-labelledby": r135,
    hidden: n121,
    id: s129
  });
  return {
    hidden: n121,
    getRootProps
  };
};
var b8 = [
  "children",
  "className",
  "value",
  "components",
  "componentsProps",
  "component"
];
var useUtilityClasses6 = (e318) => {
  const { hidden: o218 } = e318;
  const t224 = {
    root: [
      "root",
      o218 && "hidden"
    ]
  };
  return composeClasses(t224, getTabPanelUnstyledUtilityClass, {});
};
var f9 = l1(function TabPanelUnstyled(t317, n215) {
  var l119, i126;
  const {
    children: a129,
    className: m115,
    components: c119 = {},
    componentsProps: p118 = {},
    component: u120
  } = t317, f122 = _objectWithoutPropertiesLoose(t317, b8);
  const { hidden: y32, getRootProps: h33 } = useTabPanel(t317);
  const P = _extends({}, t317, {
    hidden: y32
  });
  const T20 = useUtilityClasses6(P);
  const U13 = (l119 = u120 != null ? u120 : c119.Root) != null ? l119 : "div";
  const v31 = appendOwnerState(U13, _extends({}, f122, p118.root), P);
  return p4(U13, _extends({}, h33(), {
    ref: n215,
    role: "tabpanel"
  }, v31, {
    className: clsx_m(T20.root, (i126 = p118.root) == null ? void 0 : i126.className, m115),
    children: !y32 && a129
  }));
});
true ? f9.propTypes = {
  children: s2.node,
  className: s2.string,
  component: s2.elementType,
  components: s2.shape({
    Root: s2.elementType
  }),
  componentsProps: s2.object,
  value: s2.oneOfType([
    s2.number,
    s2.string
  ]).isRequired
} : void 0;
function getTabsListUnstyledUtilityClass(t142) {
  return generateUtilityClass("TabsListUnstyled", t142);
}
generateUtilityClasses("TabsListUnstyled", [
  "root",
  "horizontal",
  "vertical"
]);
var nextItem = (t225, e141) => t225 ? t225 === e141 ? t225.firstChild : e141 && e141.nextElementSibling ? e141.nextElementSibling : t225.firstChild : null;
var previousItem = (t318, e228) => t318 ? t318 === e228 ? t318.lastChild : e228 && e228.previousElementSibling ? e228.previousElementSibling : t318.lastChild : null;
var moveFocus = (t414, e319, o127) => {
  let r136 = false;
  let n122 = o127(t414, e319);
  while (t414 && n122) {
    if (n122 === t414.firstChild) {
      if (r136)
        return;
      r136 = true;
    }
    const e416 = n122.disabled || n122.getAttribute("aria-disabled") === "true";
    if (n122.hasAttribute("tabindex") && !e416) {
      n122.focus();
      return;
    }
    n122 = o127(t414, n122);
  }
};
var useTabsList = (e515) => {
  const {
    "aria-label": r216,
    "aria-labelledby": n216,
    children: s130,
    ref: i127
  } = e515;
  const l120 = d();
  const a130 = useForkRef(l120, i127);
  const b114 = useTabContext();
  if (b114 === null)
    throw new Error("No TabContext provided");
  const {
    value: f123,
    orientation: h113 = "horizontal",
    direction: v113 = "ltr"
  } = b114;
  const y33 = v113 === "rtl";
  const handleKeyDown2 = (t511) => {
    const e65 = l120.current;
    const o219 = ownerDocument(e65).activeElement;
    const r312 = o219 == null ? void 0 : o219.getAttribute("role");
    if (r312 !== "tab")
      return;
    let n312 = h113 === "horizontal" ? "ArrowLeft" : "ArrowUp";
    let s215 = h113 === "horizontal" ? "ArrowRight" : "ArrowDown";
    if (h113 === "horizontal" && y33) {
      n312 = "ArrowRight";
      s215 = "ArrowLeft";
    }
    switch (t511.key) {
      case n312:
        t511.preventDefault();
        moveFocus(e65, o219, previousItem);
        break;
      case s215:
        t511.preventDefault();
        moveFocus(e65, o219, nextItem);
        break;
      case "Home":
        t511.preventDefault();
        moveFocus(e65, null, nextItem);
        break;
      case "End":
        t511.preventDefault();
        moveFocus(e65, null, previousItem);
        break;
      default:
        break;
    }
  };
  const createHandleKeyDown = (t64) => (e72) => {
    var o314;
    handleKeyDown2(e72);
    (o314 = t64.onKeyDown) == null ? void 0 : o314.call(t64, e72);
  };
  const getRootProps = (o49) => {
    const s311 = extractEventHandlers(e515);
    const i216 = _extends({}, s311, o49);
    const l213 = {
      onKeyDown: createHandleKeyDown(i216)
    };
    const c120 = _extends({}, i216, l213);
    return _extends({
      "aria-label": r216,
      "aria-labelledby": n216,
      "aria-orientation": h113 === "vertical" ? "vertical" : null,
      role: "tablist",
      ref: a130
    }, c120);
  };
  const g37 = u(() => {
    const e82 = /* @__PURE__ */ new Map();
    let r47 = 0;
    const n412 = b.map(s130, (n57) => {
      if (!E(n57))
        return null;
      N(n57) && console.error([
        "MUI: The Tabs component doesn't accept a Fragment as a child.",
        "Consider providing an array instead."
      ].join("\n"));
      const s43 = n57.props.value === void 0 ? r47 : n57.props.value;
      e82.set(s43, r47);
      r47 += 1;
      return I(n57, _extends({
        value: s43
      }, r47 === 1 && f123 === false && !n57.props.tabIndex || f123 === s43 ? {
        tabIndex: 0
      } : {
        tabIndex: -1
      }));
    });
    return n412;
  }, [
    s130,
    f123
  ]);
  return {
    isRtl: y33,
    orientation: h113,
    value: f123,
    processChildren: g37,
    getRootProps
  };
};
var h7 = [
  "className",
  "children",
  "component",
  "components",
  "componentsProps"
];
var useUtilityClasses7 = (t74) => {
  const { orientation: e92 } = t74;
  const o55 = {
    root: [
      "root",
      e92
    ]
  };
  return composeClasses(o55, getTabsListUnstyledUtilityClass, {});
};
var v6 = l1((o62, r53) => {
  var s5, l36;
  const {
    className: a214,
    component: c211,
    components: p119 = {},
    componentsProps: m116 = {}
  } = o62, u121 = _objectWithoutPropertiesLoose(o62, h7);
  const {
    isRtl: d119,
    orientation: f211,
    getRootProps: v210,
    processChildren: y34
  } = useTabsList(_extends({}, o62, {
    ref: r53
  }));
  const g38 = _extends({}, o62, {
    isRtl: d119,
    orientation: f211
  });
  const C21 = useUtilityClasses7(g38);
  const w21 = (s5 = c211 != null ? c211 : p119.Root) != null ? s5 : "div";
  const E22 = appendOwnerState(w21, _extends({}, u121, m116.root), g38);
  const U14 = y34();
  return p4(w21, _extends({}, v210(), E22, {
    className: clsx_m(a214, (l36 = m116.root) == null ? void 0 : l36.className, C21.root),
    children: U14
  }));
});
true ? v6.propTypes = {
  children: s2.node,
  className: s2.string,
  component: s2.elementType,
  components: s2.shape({
    Root: s2.elementType
  }),
  componentsProps: s2.object
} : void 0;
function getTabUnstyledUtilityClass(e142) {
  return generateUtilityClass("TabUnstyled", e142);
}
generateUtilityClasses("TabUnstyled", [
  "root",
  "selected",
  "disabled"
]);
var y6 = [
  "getRootProps"
];
var useTab = (t143) => {
  const { value: s131, onChange: n123, onClick: c121, onFocus: r137 } = t143;
  const l121 = useButton(t143), { getRootProps: i128 } = l121, a131 = _objectWithoutPropertiesLoose(l121, y6);
  const f124 = useTabContext();
  if (f124 === null)
    throw new Error("No TabContext provided");
  const b115 = s131 != null ? s131 : 0;
  const g111 = f124.value === b115;
  const h114 = f124.selectionFollowsFocus;
  const C22 = {
    role: "tab",
    "aria-controls": getPanelId(f124, b115),
    id: getTabId(f124, b115),
    "aria-selected": g111,
    disabled: a131.disabled
  };
  const handleFocus = (e229) => {
    if (h114 && !g111) {
      n123 && n123(e229, b115);
      f124.onSelected(e229, b115);
    }
    r137 && r137(e229);
  };
  const handleClick = (e320) => {
    if (!g111) {
      n123 && n123(e320, b115);
      f124.onSelected(e320, b115);
    }
    c121 && c121(e320);
  };
  const getRootProps = (o128) => {
    const t226 = i128(_extends({
      onClick: handleClick,
      onFocus: handleFocus
    }, o128));
    return _extends({}, t226, C22);
  };
  return _extends({
    getRootProps
  }, a131, {
    selected: g111
  });
};
var g4 = [
  "action",
  "children",
  "value",
  "className",
  "disabled",
  "onChange",
  "onClick",
  "onFocus",
  "component",
  "components",
  "componentsProps"
];
var useUtilityClasses8 = (e417) => {
  const { selected: o220, disabled: t319 } = e417;
  const s216 = {
    root: [
      "root",
      o220 && "selected",
      t319 && "disabled"
    ]
  };
  return composeClasses(s216, getTabUnstyledUtilityClass, {});
};
var h8 = l1(function TabUnstyled(s312, r217) {
  var i217, a215;
  const {
    action: m117,
    children: u122,
    className: p120,
    disabled: d120 = false,
    component: b210,
    components: y113 = {},
    componentsProps: h211 = {}
  } = s312, C23 = _objectWithoutPropertiesLoose(s312, g4);
  const T21 = c1();
  const U15 = useForkRef(T21, r217);
  const {
    active: v32,
    focusVisible: R19,
    setFocusVisible: N22,
    selected: P,
    getRootProps: F16
  } = useTab(_extends({}, s312, {
    ref: U15
  }));
  w(m117, () => ({
    focusVisible: () => {
      N22(true);
      T21.current.focus();
    }
  }), [
    N22
  ]);
  const V16 = _extends({}, s312, {
    active: v32,
    focusVisible: R19,
    disabled: d120,
    selected: P
  });
  const j19 = useUtilityClasses8(V16);
  const x23 = (i217 = b210 != null ? b210 : y113.Root) != null ? i217 : "button";
  const k13 = appendOwnerState(x23, _extends({}, C23, h211.root), V16);
  return p4(x23, _extends({}, F16(), k13, {
    className: clsx_m(j19.root, (a215 = h211.root) == null ? void 0 : a215.className, p120),
    ref: r217,
    children: u122
  }));
});
true ? h8.propTypes = {
  action: s2.oneOfType([
    s2.func,
    s2.shape({
      current: s2.shape({
        focusVisible: s2.func.isRequired
      })
    })
  ]),
  children: s2.node,
  className: s2.string,
  component: s2.elementType,
  components: s2.shape({
    Root: s2.elementType
  }),
  componentsProps: s2.object,
  disabled: s2.bool,
  onChange: s2.func,
  onClick: s2.func,
  onFocus: s2.func,
  value: s2.oneOfType([
    s2.number,
    s2.string
  ])
} : void 0;
var c6 = [
  "onChange",
  "maxRows",
  "minRows",
  "style",
  "value"
];
function getStyleValue(e143, t) {
  return parseInt(e143[t], 10) || 0;
}
var d10 = {
  shadow: {
    visibility: "hidden",
    position: "absolute",
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    transform: "translateZ(0)"
  }
};
var m8 = l1(function TextareaAutosize(o129, m118) {
  const {
    onChange: f125,
    maxRows: p30,
    minRows: h34 = 1,
    style: b31,
    value: g39
  } = o129, y35 = _objectWithoutPropertiesLoose(o129, c6);
  const { current: v33 } = c1(g39 != null);
  const w22 = c1(null);
  const x24 = useForkRef(m118, w22);
  const R20 = c1(null);
  const S14 = c1(0);
  const [N23, O16] = s1({});
  const E23 = u(() => {
    const e230 = w22.current;
    const t144 = ownerWindow(e230);
    const r138 = t144.getComputedStyle(e230);
    if (r138.width === "0px")
      return;
    const n124 = R20.current;
    n124.style.width = r138.width;
    n124.value = e230.value || o129.placeholder || "x";
    n124.value.slice(-1) === "\n" && (n124.value += " ");
    const a132 = r138["box-sizing"];
    const i129 = getStyleValue(r138, "padding-bottom") + getStyleValue(r138, "padding-top");
    const l122 = getStyleValue(r138, "border-bottom-width") + getStyleValue(r138, "border-top-width");
    const u123 = n124.scrollHeight;
    n124.value = "x";
    const c122 = n124.scrollHeight;
    let d121 = u123;
    h34 && (d121 = Math.max(Number(h34) * c122, d121));
    p30 && (d121 = Math.min(Number(p30) * c122, d121));
    d121 = Math.max(d121, c122);
    const m211 = d121 + (a132 === "border-box" ? i129 + l122 : 0);
    const f41 = Math.abs(d121 - u123) <= 1;
    O16((e321) => {
      if (S14.current < 20 && (m211 > 0 && Math.abs((e321.outerHeightStyle || 0) - m211) > 1 || e321.overflow !== f41)) {
        S14.current += 1;
        return {
          overflow: f41,
          outerHeightStyle: m211
        };
      }
      S14.current === 20 && console.error([
        "MUI: Too many re-renders. The layout is unstable.",
        "TextareaAutosize limits the number of renders to prevent an infinite loop."
      ].join("\n"));
      return e321;
    });
  }, [
    p30,
    h34,
    o129.placeholder
  ]);
  p1(() => {
    const e418 = debounce(() => {
      S14.current = 0;
      E23();
    });
    const t227 = ownerWindow(w22.current);
    t227.addEventListener("resize", e418);
    let r218;
    if (typeof ResizeObserver !== "undefined") {
      r218 = new ResizeObserver(e418);
      r218.observe(w22.current);
    }
    return () => {
      e418.clear();
      t227.removeEventListener("resize", e418);
      r218 && r218.disconnect();
    };
  }, [
    E23
  ]);
  d2(() => {
    E23();
  });
  p1(() => {
    S14.current = 0;
  }, [
    g39
  ]);
  const handleChange = (e516) => {
    S14.current = 0;
    v33 || E23();
    f125 && f125(e516);
  };
  return y3(i1, {
    children: [
      p4("textarea", _extends({
        value: g39,
        onChange: handleChange,
        ref: x24,
        rows: h34,
        style: _extends({
          height: N23.outerHeightStyle,
          overflow: N23.overflow ? "hidden" : null
        }, b31)
      }, y35)),
      p4("textarea", {
        "aria-hidden": true,
        className: o129.className,
        readOnly: true,
        ref: R20,
        tabIndex: -1,
        style: _extends({}, d10.shadow, b31, {
          padding: 0
        })
      })
    ]
  });
});
true ? m8.propTypes = {
  className: s2.string,
  maxRows: s2.oneOfType([
    s2.number,
    s2.string
  ]),
  minRows: s2.oneOfType([
    s2.number,
    s2.string
  ]),
  onChange: s2.func,
  placeholder: s2.string,
  style: s2.object,
  value: s2.oneOfType([
    s2.arrayOf(s2.string),
    s2.number,
    s2.string
  ])
} : void 0;
function memoize(e60) {
  var t60 = /* @__PURE__ */ Object.create(null);
  return function(n58) {
    t60[n58] === void 0 && (t60[n58] = e60(n58));
    return t60[n58];
  };
}
var t14 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var r9 = memoize(function(e144) {
  return t14.test(e144) || e144.charCodeAt(0) === 111 && e144.charCodeAt(1) === 110 && e144.charCodeAt(2) < 91;
});
var e7 = true;
function getRegisteredStyles(e145, t145, r139) {
  var i35 = "";
  r139.split(" ").forEach(function(r48) {
    e145[r48] !== void 0 ? t145.push(e145[r48] + ";") : i35 += r48 + " ";
  });
  return i35;
}
var t15 = function insertStyles(t228, r49, i36) {
  var s44 = t228.key + "-" + r49.name;
  i36 !== false && e7 !== false || t228.registered[s44] !== void 0 || (t228.registered[s44] = r49.styles);
  if (t228.inserted[r49.name] === void 0) {
    var n59 = r49;
    do {
      t228.insert(r49 === n59 ? "." + s44 : "", n59, t228.sheet, true);
      n59 = n59.next;
    } while (n59 !== void 0);
  }
};
function murmur2(r50) {
  var t65 = 0;
  var a38, e66 = 0, c30 = r50.length;
  for (; c30 >= 4; ++e66, c30 -= 4) {
    a38 = 255 & r50.charCodeAt(e66) | (255 & r50.charCodeAt(++e66)) << 8 | (255 & r50.charCodeAt(++e66)) << 16 | (255 & r50.charCodeAt(++e66)) << 24;
    a38 = 1540483477 * (65535 & a38) + (59797 * (a38 >>> 16) << 16);
    a38 ^= a38 >>> 24;
    t65 = 1540483477 * (65535 & a38) + (59797 * (a38 >>> 16) << 16) ^ 1540483477 * (65535 & t65) + (59797 * (t65 >>> 16) << 16);
  }
  switch (c30) {
    case 3:
      t65 ^= (255 & r50.charCodeAt(e66 + 2)) << 16;
    case 2:
      t65 ^= (255 & r50.charCodeAt(e66 + 1)) << 8;
    case 1:
      t65 ^= 255 & r50.charCodeAt(e66);
      t65 = 1540483477 * (65535 & t65) + (59797 * (t65 >>> 16) << 16);
  }
  t65 ^= t65 >>> 13;
  t65 = 1540483477 * (65535 & t65) + (59797 * (t65 >>> 16) << 16);
  return ((t65 ^ t65 >>> 15) >>> 0).toString(36);
}
var o6 = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var r10 = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
var o7 = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var a12 = /[A-Z]|^ms/g;
var i8 = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var s9 = function isCustomProperty(e146) {
  return e146.charCodeAt(1) === 45;
};
var l8 = function isProcessableValue(e231) {
  return e231 != null && typeof e231 !== "boolean";
};
var c7 = memoize(function(e322) {
  return s9(e322) ? e322 : e322.replace(a12, "-$&").toLowerCase();
});
var u8 = function processStyleValue(e419, t146) {
  switch (e419) {
    case "animation":
    case "animationName":
      if (typeof t146 === "string") {
        return t146.replace(i8, function(e5, n125, t229) {
          E3 = {
            name: n125,
            styles: t229,
            next: E3
          };
          return n125;
        });
      }
  }
  return o6[e419] === 1 || s9(e419) || typeof t146 !== "number" || t146 === 0 ? t146 : t146 + "px";
};
if (true) {
  p9 = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  d11 = [
    "normal",
    "none",
    "initial",
    "inherit",
    "unset"
  ];
  v7 = u8;
  f10 = /^-ms-/;
  m9 = /-(.)/g;
  h9 = {};
  u8 = function processStyleValue2(e517, n217) {
    if (e517 === "content" && (typeof n217 !== "string" || d11.indexOf(n217) === -1 && !p9.test(n217) && (n217.charAt(0) !== n217.charAt(n217.length - 1) || n217.charAt(0) !== '"' && n217.charAt(0) !== "'"))) {
      throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + n217 + "\"'`");
    }
    var t320 = v7(e517, n217);
    if (t320 !== "" && !s9(e517) && e517.indexOf("-") !== -1 && h9[e517] === void 0) {
      h9[e517] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + e517.replace(f10, "ms-").replace(m9, function(e5, n313) {
        return n313.toUpperCase();
      }) + "?");
    }
    return t320;
  };
}
var p9;
var d11;
var v7;
var f10;
var m9;
var h9;
function handleInterpolation(e67, n413, t415) {
  if (t415 == null)
    return "";
  if (t415.__emotion_styles !== void 0) {
    if (t415.toString() === "NO_COMPONENT_SELECTOR") {
      throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
    }
    return t415;
  }
  switch (typeof t415) {
    case "boolean":
      return "";
    case "object":
      if (t415.anim === 1) {
        E3 = {
          name: t415.name,
          styles: t415.styles,
          next: E3
        };
        return t415.name;
      }
      if (t415.styles !== void 0) {
        var r140 = t415.next;
        if (r140 !== void 0) {
          while (r140 !== void 0) {
            E3 = {
              name: r140.name,
              styles: r140.styles,
              next: E3
            };
            r140 = r140.next;
          }
        }
        var o130 = t415.styles + ";";
        t415.map !== void 0 && (o130 += t415.map);
        return o130;
      }
      return createStringFromObject(e67, n413, t415);
    case "function":
      if (e67 !== void 0) {
        var a133 = E3;
        var s132 = t415(e67);
        E3 = a133;
        return handleInterpolation(e67, n413, s132);
      }
      console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      break;
    case "string":
      if (true) {
        var l123 = [];
        var c123 = t415.replace(i8, function(e5, n8, t512) {
          var r219 = "animation" + l123.length;
          l123.push("const " + r219 + " = keyframes`" + t512.replace(/^@keyframes animation-\w+/, "") + "`");
          return "${" + r219 + "}";
        });
        l123.length && console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(l123, [
          "`" + c123 + "`"
        ]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\ncss`" + c123 + "`");
      }
      break;
  }
  if (n413 == null)
    return t415;
  var u124 = n413[t415];
  return u124 !== void 0 ? u124 : t415;
}
function createStringFromObject(e71, n510, t66) {
  var r313 = "";
  if (Array.isArray(t66)) {
    for (var a216 = 0; a216 < t66.length; a216++) {
      r313 += handleInterpolation(e71, n510, t66[a216]) + ";";
    }
  } else {
    for (var i130 in t66) {
      var s217 = t66[i130];
      if (typeof s217 !== "object") {
        n510 != null && n510[s217] !== void 0 ? r313 += i130 + "{" + n510[s217] + "}" : l8(s217) && (r313 += c7(i130) + ":" + u8(i130, s217) + ";");
      } else {
        if (i130 === "NO_COMPONENT_SELECTOR" && true) {
          throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
        }
        if (!Array.isArray(s217) || typeof s217[0] !== "string" || n510 != null && n510[s217[0]] !== void 0) {
          var p31 = handleInterpolation(e71, n510, s217);
          switch (i130) {
            case "animation":
            case "animationName":
              r313 += c7(i130) + ":" + p31 + ";";
              break;
            default:
              i130 === "undefined" && console.error(o7);
              r313 += i130 + "{" + p31 + "}";
          }
        } else {
          for (var d33 = 0; d33 < s217.length; d33++) {
            l8(s217[d33]) && (r313 += c7(i130) + ":" + u8(i130, s217[d33]) + ";");
          }
        }
      }
    }
  }
  return r313;
}
var y7 = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var g5;
g5 = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
var E3;
var b9 = function serializeStyles(n63, t75, o221) {
  if (n63.length === 1 && typeof n63[0] === "object" && n63[0] !== null && n63[0].styles !== void 0) {
    return n63[0];
  }
  var a39 = true;
  var i218 = "";
  E3 = void 0;
  var s313 = n63[0];
  if (s313 == null || s313.raw === void 0) {
    a39 = false;
    i218 += handleInterpolation(o221, t75, s313);
  } else {
    s313[0] === void 0 && console.error(r10);
    i218 += s313[0];
  }
  for (var l214 = 1; l214 < n63.length; l214++) {
    i218 += handleInterpolation(o221, t75, n63[l214]);
    if (a39) {
      s313[l214] === void 0 && console.error(r10);
      i218 += s313[l214];
    }
  }
  var c212;
  i218 = i218.replace(g5, function(e82) {
    c212 = e82;
    return "";
  });
  y7.lastIndex = 0;
  var u212 = "";
  var p32;
  while ((p32 = y7.exec(i218)) !== null)
    u212 += "-" + p32[1];
  var d34 = murmur2(i218) + u212;
  return true ? {
    name: d34,
    styles: i218,
    map: c212,
    next: E3,
    toString: function toString() {
      return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
    }
  } : {
    name: d34,
    styles: i218,
    next: E3
  };
};
var d12 = r9;
var u9 = function testOmitPropsOnComponent(e147) {
  return e147 !== "theme";
};
var m10 = function getDefaultShouldForwardProp(e232) {
  return typeof e232 === "string" && e232.charCodeAt(0) > 96 ? d12 : u9;
};
var c8 = function composeShouldForwardProps(e323, r141, o131) {
  var t147;
  if (r141) {
    var a134 = r141.shouldForwardProp;
    t147 = e323.__emotion_forwardProp && a134 ? function(r220) {
      return e323.__emotion_forwardProp(r220) && a134(r220);
    } : a134;
  }
  typeof t147 !== "function" && o131 && (t147 = e323.__emotion_forwardProp);
  return t147;
};
var v8 = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
var f11 = function Noop() {
  return null;
};
var _3 = function createStyled1(t230, d122) {
  if (t230 === void 0) {
    throw new Error("You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.");
  }
  var u125 = t230.__emotion_real === t230;
  var _17 = u125 && t230.__emotion_base || t230;
  var h115;
  var b116;
  if (d122 !== void 0) {
    h115 = d122.label;
    b116 = d122.target;
  }
  var y36 = c8(t230, d122, u125);
  var g40 = y36 || m10(_17);
  var N24 = !g40("as");
  return function() {
    var w110 = arguments;
    var E24 = u125 && t230.__emotion_styles !== void 0 ? t230.__emotion_styles.slice(0) : [];
    h115 !== void 0 && E24.push("label:" + h115 + ";");
    if (w110[0] == null || w110[0].raw === void 0)
      E24.push.apply(E24, w110);
    else {
      w110[0][0] === void 0 && console.error(v8);
      E24.push(w110[0][0]);
      var P = w110.length;
      var S15 = 1;
      for (; S15 < P; S15++) {
        w110[0][S15] === void 0 && console.error(v8);
        E24.push(w110[S15], w110[0][S15]);
      }
    }
    var O12 = i(function(t321, a217, n126) {
      var d210 = N24 && t321.as || _17;
      var u213 = "";
      var c124 = [];
      var v114 = t321;
      if (t321.theme == null) {
        v114 = {};
        for (var h in t321)
          v114[h] = t321[h];
        v114.theme = r1(n);
      }
      typeof t321.className === "string" ? u213 = getRegisteredStyles(a217.registered, c124, t321.className) : t321.className != null && (u213 = t321.className + " ");
      var w23 = b9(E24.concat(c124), a217.registered, v114);
      t15(a217, w23, typeof d210 === "string");
      u213 += a217.key + "-" + w23.name;
      b116 !== void 0 && (u213 += " " + b116);
      var P4 = N24 && y36 === void 0 ? m10(d210) : g40;
      var S16 = {};
      for (var O17 in t321) {
        N24 && O17 === "as" || P4(O17) && (S16[O17] = t321[O17]);
      }
      S16.className = u213;
      S16.ref = n126;
      var k14 = f(d210, S16);
      var C24 = f(f11, null);
      return f(i1, null, C24, k14);
    });
    O12.displayName = h115 !== void 0 ? h115 : "Styled(" + (typeof _17 === "string" ? _17 : _17.displayName || _17.name || "Component") + ")";
    O12.defaultProps = t230.defaultProps;
    O12.__emotion_real = O12;
    O12.__emotion_base = _17;
    O12.__emotion_styles = E24;
    O12.__emotion_forwardProp = y36;
    Object.defineProperty(O12, "toString", {
      value: function value() {
        return b116 === void 0 && true ? "NO_COMPONENT_SELECTOR" : "." + b116;
      }
    });
    O12.withComponent = function(e420, r314) {
      return createStyled1(e420, _extends({}, d122, r314, {
        shouldForwardProp: c8(O12, r314, true)
      })).apply(void 0, E24);
    };
    return O12;
  };
};
var h10 = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var b10 = _3.bind();
h10.forEach(function(e518) {
  b10[e518] = b10(e518);
});
function sheetForTag(e148) {
  if (e148.sheet)
    return e148.sheet;
  for (var t67 = 0; t67 < document.styleSheets.length; t67++) {
    if (document.styleSheets[t67].ownerNode === e148) {
      return document.styleSheets[t67];
    }
  }
}
function createStyleElement(e233) {
  var t68 = document.createElement("style");
  t68.setAttribute("data-emotion", e233.key);
  e233.nonce !== void 0 && t68.setAttribute("nonce", e233.nonce);
  t68.appendChild(document.createTextNode(""));
  t68.setAttribute("data-s", "");
  return t68;
}
var e8 = function() {
  function StyleSheet(e421) {
    var t69 = this;
    this._insertTag = function(e519) {
      var r54;
      r54 = t69.tags.length === 0 ? t69.insertionPoint ? t69.insertionPoint.nextSibling : t69.prepend ? t69.container.firstChild : t69.before : t69.tags[t69.tags.length - 1].nextSibling;
      t69.container.insertBefore(e519, r54);
      t69.tags.push(e519);
    };
    this.isSpeedy = e421.speedy === void 0 ? false : e421.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = e421.nonce;
    this.key = e421.key;
    this.container = e421.container;
    this.prepend = e421.prepend;
    this.insertionPoint = e421.insertionPoint;
    this.before = null;
  }
  var e324 = StyleSheet.prototype;
  e324.hydrate = function hydrate(e68) {
    e68.forEach(this._insertTag);
  };
  e324.insert = function insert(e72) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(createStyleElement(this));
    var t70 = this.tags[this.tags.length - 1];
    if (true) {
      var r55 = e72.charCodeAt(0) === 64 && e72.charCodeAt(1) === 105;
      r55 && this._alreadyInsertedOrderInsensitiveRule && console.error("You're attempting to insert the following rule:\n" + e72 + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !r55;
    }
    if (this.isSpeedy) {
      var n60 = sheetForTag(t70);
      try {
        n60.insertRule(e72, n60.cssRules.length);
      } catch (t76) {
        /:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear){/.test(e72) || console.error('There was a problem inserting the following rule: "' + e72 + '"', t76);
      }
    } else
      t70.appendChild(document.createTextNode(e72));
    this.ctr++;
  };
  e324.flush = function flush() {
    this.tags.forEach(function(e81) {
      return e81.parentNode && e81.parentNode.removeChild(e81);
    });
    this.tags = [];
    this.ctr = 0;
    this._alreadyInsertedOrderInsensitiveRule = false;
  };
  return StyleSheet;
}();
var e9 = "-ms-";
var r11 = "-moz-";
var a13 = "-webkit-";
var c9 = "comm";
var t16 = "rule";
var n7 = "decl";
var u10 = "@import";
var v9 = "@keyframes";
var k2 = Math.abs;
var w4 = String.fromCharCode;
var x6 = Object.assign;
function hash(e149, r142) {
  return (((r142 << 2 ^ charat(e149, 0)) << 2 ^ charat(e149, 1)) << 2 ^ charat(e149, 2)) << 2 ^ charat(e149, 3);
}
function trim(e234) {
  return e234.trim();
}
function match(e325, r221) {
  return (e325 = r221.exec(e325)) ? e325[0] : e325;
}
function replace(e422, r315, a135) {
  return e422.replace(r315, a135);
}
function indexof(e520, r410) {
  return e520.indexOf(r410);
}
function charat(e69, r56) {
  return 0 | e69.charCodeAt(r56);
}
function substr(e73, r63, a218) {
  return e73.slice(r63, a218);
}
function strlen(e82) {
  return e82.length;
}
function sizeof(e91) {
  return e91.length;
}
function append(e102, r72) {
  return r72.push(e102), e102;
}
function combine(e112, r82) {
  return e112.map(r82).join("");
}
var $1 = 1;
var g6 = 1;
var z2 = 0;
var y8 = 0;
var j3 = 0;
var C3 = "";
function node(e122, r91, a310, c125, t148, n127, s133) {
  return {
    value: e122,
    root: r91,
    parent: a310,
    type: c125,
    props: t148,
    children: n127,
    line: $1,
    column: g6,
    length: s133,
    return: ""
  };
}
function copy(e13, r101) {
  return x6(node("", null, null, "", null, null, 0), e13, {
    length: -e13.length
  }, r101);
}
function __char() {
  return j3;
}
function prev() {
  j3 = y8 > 0 ? charat(C3, --y8) : 0;
  (g6--, j3 === 10) && (g6 = 1, $1--);
  return j3;
}
function next() {
  j3 = y8 < z2 ? charat(C3, y8++) : 0;
  (g6++, j3 === 10) && (g6 = 1, $1++);
  return j3;
}
function peek() {
  return charat(C3, y8);
}
function caret() {
  return y8;
}
function slice(e14, r1110) {
  return substr(C3, e14, r1110);
}
function token(e15) {
  switch (e15) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(e16) {
  return $1 = g6 = 1, z2 = strlen(C3 = e16), y8 = 0, [];
}
function dealloc(e17) {
  return C3 = "", e17;
}
function delimit(e18) {
  return trim(slice(y8 - 1, delimiter(e18 === 91 ? e18 + 2 : e18 === 40 ? e18 + 1 : e18)));
}
function whitespace(e20) {
  while (j3 = peek()) {
    if (!(j3 < 33))
      break;
    next();
  }
  return token(e20) > 2 || token(j3) > 3 ? "" : " ";
}
function escaping(e22, r122) {
  while (--r122 && next()) {
    if (j3 < 48 || j3 > 102 || j3 > 57 && j3 < 65 || j3 > 70 && j3 < 97)
      break;
  }
  return slice(e22, caret() + (r122 < 6 && peek() == 32 && next() == 32));
}
function delimiter(e23) {
  while (next()) {
    switch (j3) {
      case e23:
        return y8;
      case 34:
      case 39:
        e23 !== 34 && e23 !== 39 && delimiter(j3);
        break;
      case 40:
        e23 === 41 && delimiter(e23);
        break;
      case 92:
        next();
        break;
    }
  }
  return y8;
}
function commenter(e24, r13) {
  while (next()) {
    if (e24 + j3 === 57)
      break;
    if (e24 + j3 === 84 && peek() === 47)
      break;
  }
  return "/*" + slice(r13, y8 - 1) + "*" + w4(e24 === 47 ? e24 : next());
}
function identifier(e25) {
  while (!token(peek()))
    next();
  return slice(e25, y8);
}
function compile(e26) {
  return dealloc(parse("", null, null, null, [
    ""
  ], e26 = alloc(e26), 0, [
    0
  ], e26));
}
function parse(e27, r14, a42, c213, t231, n218, s218, i131, u126) {
  var l124 = 0;
  var o132 = 0;
  var p121 = s218;
  var f126 = 0;
  var h116 = 0;
  var v115 = 0;
  var d123 = 1;
  var m119 = 1;
  var b117 = 1;
  var k15 = 0;
  var x110 = "";
  var $11 = t231;
  var g112 = n218;
  var z12 = c213;
  var y114 = x110;
  while (m119) {
    switch (v115 = k15, k15 = next()) {
      case 40:
        if (v115 != 108 && y114.charCodeAt(p121 - 1) == 58) {
          indexof(y114 += replace(delimit(k15), "&", "&\f"), "&\f") != -1 && (b117 = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        y114 += delimit(k15);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        y114 += whitespace(v115);
        break;
      case 92:
        y114 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), r14, a42), u126);
            break;
          default:
            y114 += "/";
        }
        break;
      case 123 * d123:
        i131[l124++] = strlen(y114) * b117;
      case 125 * d123:
      case 59:
      case 0:
        switch (k15) {
          case 0:
          case 125:
            m119 = 0;
          case 59 + o132:
            h116 > 0 && strlen(y114) - p121 && append(h116 > 32 ? declaration(y114 + ";", c213, a42, p121 - 1) : declaration(replace(y114, " ", "") + ";", c213, a42, p121 - 2), u126);
            break;
          case 59:
            y114 += ";";
          default:
            append(z12 = ruleset(y114, r14, a42, l124, o132, t231, i131, x110, $11 = [], g112 = [], p121), n218);
            if (k15 === 123) {
              if (o132 === 0) {
                parse(y114, r14, z12, z12, $11, n218, p121, i131, g112);
              } else {
                switch (f126) {
                  case 100:
                  case 109:
                  case 115:
                    parse(e27, z12, z12, c213 && append(ruleset(e27, z12, z12, 0, 0, t231, i131, x110, t231, $11 = [], p121), g112), t231, g112, p121, i131, c213 ? $11 : g112);
                    break;
                  default:
                    parse(y114, z12, z12, z12, [
                      ""
                    ], g112, 0, i131, g112);
                }
              }
            }
        }
        l124 = o132 = h116 = 0, d123 = b117 = 1, x110 = y114 = "", p121 = s218;
        break;
      case 58:
        p121 = 1 + strlen(y114), h116 = v115;
      default:
        if (d123 < 1) {
          if (k15 == 123)
            --d123;
          else if (k15 == 125 && d123++ == 0 && prev() == 125)
            continue;
        }
        switch (y114 += w4(k15), k15 * d123) {
          case 38:
            b117 = o132 > 0 ? 1 : (y114 += "\f", -1);
            break;
          case 44:
            i131[l124++] = (strlen(y114) - 1) * b117, b117 = 1;
            break;
          case 64:
            peek() === 45 && (y114 += delimit(next()));
            f126 = peek(), o132 = p121 = strlen(x110 = y114 += identifier(caret())), k15++;
            break;
          case 45:
            v115 === 45 && strlen(y114) == 2 && (d123 = 0);
        }
    }
  }
  return n218;
}
function ruleset(e28, r15, a52, c32, n314, s314, i219, u214, l215, o222, p210) {
  var f212 = n314 - 1;
  var h212 = n314 === 0 ? s314 : [
    ""
  ];
  var v211 = sizeof(h212);
  for (var d211 = 0, m212 = 0, b17 = 0; d211 < c32; ++d211) {
    for (var w111 = 0, x25 = substr(e28, f212 + 1, f212 = k2(m212 = i219[d211])), $22 = e28; w111 < v211; ++w111) {
      ($22 = trim(m212 > 0 ? h212[w111] + " " + x25 : replace(x25, /&\f/g, h212[w111]))) && (l215[b17++] = $22);
    }
  }
  return node(e28, r15, a52, n314 === 0 ? t16 : u214, l215, o222, p210);
}
function comment(e29, r16, a62) {
  return node(e29, r16, a62, c9, w4(__char()), substr(e29, 2, -2), 0);
}
function declaration(e30, r17, a72, c41) {
  return node(e30, r17, a72, n7, substr(e30, 0, c41), substr(e30, c41 + 1, -1), c41);
}
function prefix(c51, t322) {
  switch (hash(c51, t322)) {
    case 5103:
      return a13 + "print-" + c51 + c51;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return a13 + c51 + c51;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return a13 + c51 + r11 + c51 + e9 + c51 + c51;
    case 6828:
    case 4268:
      return a13 + c51 + e9 + c51 + c51;
    case 6165:
      return a13 + c51 + e9 + "flex-" + c51 + c51;
    case 5187:
      return a13 + c51 + replace(c51, /(\w+).+(:[^]+)/, a13 + "box-$1$2" + e9 + "flex-$1$2") + c51;
    case 5443:
      return a13 + c51 + e9 + "flex-item-" + replace(c51, /flex-|-self/, "") + c51;
    case 4675:
      return a13 + c51 + e9 + "flex-line-pack" + replace(c51, /align-content|flex-|-self/, "") + c51;
    case 5548:
      return a13 + c51 + e9 + replace(c51, "shrink", "negative") + c51;
    case 5292:
      return a13 + c51 + e9 + replace(c51, "basis", "preferred-size") + c51;
    case 6060:
      return a13 + "box-" + replace(c51, "-grow", "") + a13 + c51 + e9 + replace(c51, "grow", "positive") + c51;
    case 4554:
      return a13 + replace(c51, /([^-])(transform)/g, "$1" + a13 + "$2") + c51;
    case 6187:
      return replace(replace(replace(c51, /(zoom-|grab)/, a13 + "$1"), /(image-set)/, a13 + "$1"), c51, "") + c51;
    case 5495:
    case 3959:
      return replace(c51, /(image-set\([^]*)/, a13 + "$1$`$1");
    case 4968:
      return replace(replace(c51, /(.+:)(flex-)?(.*)/, a13 + "box-pack:$3" + e9 + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + a13 + c51 + c51;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(c51, /(.+)-inline(.+)/, a13 + "$1$2") + c51;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(c51) - 1 - t322 > 6) {
        switch (charat(c51, t322 + 1)) {
          case 109:
            if (charat(c51, t322 + 4) !== 45)
              break;
          case 102:
            return replace(c51, /(.+:)(.+)-([^]+)/, "$1" + a13 + "$2-$3$1" + r11 + (charat(c51, t322 + 3) == 108 ? "$3" : "$2-$3")) + c51;
          case 115:
            return ~indexof(c51, "stretch") ? prefix(replace(c51, "stretch", "fill-available"), t322) + c51 : c51;
        }
      }
      break;
    case 4949:
      if (charat(c51, t322 + 1) !== 115)
        break;
    case 6444:
      switch (charat(c51, strlen(c51) - 3 - (~indexof(c51, "!important") && 10))) {
        case 107:
          return replace(c51, ":", ":" + a13) + c51;
        case 101:
          return replace(c51, /(.+:)([^;!]+)(;|!.+)?/, "$1" + a13 + (charat(c51, 14) === 45 ? "inline-" : "") + "box$3$1" + a13 + "$2$3$1" + e9 + "$2box$3") + c51;
      }
      break;
    case 5936:
      switch (charat(c51, t322 + 11)) {
        case 114:
          return a13 + c51 + e9 + replace(c51, /[svh]\w+-[tblr]{2}/, "tb") + c51;
        case 108:
          return a13 + c51 + e9 + replace(c51, /[svh]\w+-[tblr]{2}/, "tb-rl") + c51;
        case 45:
          return a13 + c51 + e9 + replace(c51, /[svh]\w+-[tblr]{2}/, "lr") + c51;
      }
      return a13 + c51 + e9 + c51 + c51;
  }
  return c51;
}
function serialize(e31, r18) {
  var a82 = "";
  var c61 = sizeof(e31);
  for (var t416 = 0; t416 < c61; t416++) {
    a82 += r18(e31[t416], t416, e31, r18) || "";
  }
  return a82;
}
function stringify(e32, r, a92, s45) {
  switch (e32.type) {
    case u10:
    case n7:
      return e32.return = e32.return || e32.value;
    case c9:
      return "";
    case v9:
      return e32.return = e32.value + "{" + serialize(e32.children, s45) + "}";
    case t16:
      e32.value = e32.props.join(",");
  }
  return strlen(a92 = serialize(e32.children, s45)) ? e32.return = e32.value + "{" + a92 + "}" : "";
}
function middleware(e33) {
  var r19 = sizeof(e33);
  return function(a102, c71, t513, n414) {
    var s5 = "";
    for (var i37 = 0; i37 < r19; i37++) {
      s5 += e33[i37](a102, c71, t513, n414) || "";
    }
    return s5;
  };
}
function prefixer(c81, s5, i13, u32) {
  if (c81.length > -1 && !c81.return) {
    switch (c81.type) {
      case n7:
        c81.return = prefix(c81.value, c81.length);
        break;
      case v9:
        return serialize([
          copy(c81, {
            value: replace(c81.value, "@", "@" + a13)
          })
        ], u32);
      case t16:
        if (c81.length) {
          return combine(c81.props, function(t610) {
            switch (match(t610, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return serialize([
                  copy(c81, {
                    props: [
                      replace(t610, /:(read-\w+)/, ":" + r11 + "$1")
                    ]
                  })
                ], u32);
              case "::placeholder":
                return serialize([
                  copy(c81, {
                    props: [
                      replace(t610, /:(plac\w+)/, ":" + a13 + "input-$1")
                    ]
                  }),
                  copy(c81, {
                    props: [
                      replace(t610, /:(plac\w+)/, ":" + r11 + "$1")
                    ]
                  }),
                  copy(c81, {
                    props: [
                      replace(t610, /:(plac\w+)/, e9 + "input-$1")
                    ]
                  })
                ], u32);
            }
            return "";
          });
        }
    }
  }
}
var y9 = function last(e150) {
  return e150.length ? e150[e150.length - 1] : null;
};
var g7 = function identifierWithPointTracking(e235, i132, s5) {
  var u127 = 0;
  var l125 = 0;
  while (true) {
    u127 = l125;
    l125 = peek();
    u127 === 38 && l125 === 12 && (i132[s5] = 1);
    if (token(l125))
      break;
    next();
  }
  return slice(e235, y8);
};
var b11 = function toRules(e326, o133) {
  var u215 = -1;
  var l216 = 44;
  do {
    switch (token(l216)) {
      case 0:
        l216 === 38 && peek() === 12 && (o133[u215] = 1);
        e326[u215] += g7(y8 - 1, o133, u215);
        break;
      case 2:
        e326[u215] += delimit(l216);
        break;
      case 4:
        if (l216 === 44) {
          e326[++u215] = peek() === 58 ? "&\f" : "";
          o133[u215] = e326[u215].length;
          break;
        }
      default:
        e326[u215] += w4(l216);
    }
  } while (l216 = next());
  return e326;
};
var w5 = function getRules(e423, r143) {
  return dealloc(b11(alloc(e423), r143));
};
var E4 = /* @__PURE__ */ new WeakMap();
var k3 = function compat(e521) {
  if (e521.type === "rule" && e521.parent && !(e521.length < 1)) {
    var r222 = e521.value, t149 = e521.parent;
    var n128 = e521.column === t149.column && e521.line === t149.line;
    while (t149.type !== "rule") {
      t149 = t149.parent;
      if (!t149)
        return;
    }
    if ((e521.props.length !== 1 || r222.charCodeAt(0) === 58 || E4.get(t149)) && !n128) {
      E4.set(e521, true);
      var o223 = [];
      var a136 = w5(r222, o223);
      var i220 = t149.props;
      for (var s134 = 0, u33 = 0; s134 < a136.length; s134++) {
        for (var l37 = 0; l37 < i220.length; l37++, u33++) {
          e521.props[u33] = o223[s134] ? a136[s134].replace(/&\f/g, i220[l37]) : i220[l37] + " " + a136[s134];
        }
      }
    }
  }
};
var A1 = function removeLabel(e610) {
  if (e610.type === "decl") {
    var r316 = e610.value;
    if (r316.charCodeAt(0) === 108 && r316.charCodeAt(2) === 98) {
      e610.return = "";
      e610.value = "";
    }
  }
};
var N1 = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
var C4 = function isIgnoringComment(e74) {
  return !!e74 && e74.type === "comm" && e74.children.indexOf(N1) > -1;
};
var P1 = function createUnsafeSelectorsAlarm(e83) {
  return function(r411, t232, n219) {
    if (r411.type === "rule") {
      var o315 = r411.value.match(/(:first|:nth|:nth-last)-child/g);
      if (o315 && e83.compat !== true) {
        var a219 = t232 > 0 ? n219[t232 - 1] : null;
        if (a219 && C4(y9(a219.children)))
          return;
        o315.forEach(function(e92) {
          console.error('The pseudo class "' + e92 + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + e92.split("-child")[0] + '-of-type".');
        });
      }
    }
  };
};
var O1 = function isImportRule(e102) {
  return e102.type.charCodeAt(1) === 105 && e102.type.charCodeAt(0) === 64;
};
var D1 = function isPrependedWithRegularRules(e112, r57) {
  for (var t323 = e112 - 1; t323 >= 0; t323--)
    if (!O1(r57[t323]))
      return true;
  return false;
};
var R3 = function nullifyElement(e122) {
  e122.type = "";
  e122.value = "";
  e122.return = "";
  e122.children = "";
  e122.props = "";
};
var V1 = function incorrectImportAlarm(e13, r64, t417) {
  if (O1(e13)) {
    if (e13.parent) {
      console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
      R3(e13);
    } else if (D1(r64, t417)) {
      console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
      R3(e13);
    }
  }
};
var _4 = [
  prefixer
];
var q2 = function createCache(r73) {
  var t514 = r73.key;
  if (!t514) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
  }
  if (t514 === "css") {
    var n315 = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n315, function(e14) {
      var r83 = e14.getAttribute("data-emotion");
      if (r83.indexOf(" ") !== -1) {
        document.head.appendChild(e14);
        e14.setAttribute("data-s", "");
      }
    });
  }
  var o410 = r73.stylisPlugins || _4;
  if (/[^a-z-]/.test(t514)) {
    throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + t514 + '" was passed');
  }
  var a311 = {};
  var i38;
  var s219 = [];
  i38 = r73.container || document.head;
  Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + t514 + ' "]'), function(e15) {
    var r92 = e15.getAttribute("data-emotion").split(" ");
    for (var t611 = 1; t611 < r92.length; t611++)
      a311[r92[t611]] = true;
    s219.push(e15);
  });
  var u42;
  var l42 = [
    k3,
    A1
  ];
  l42.push(P1({
    get compat() {
      return w112.compat;
    }
  }), V1);
  var c126;
  var y115 = [
    stringify,
    true ? function(e16) {
      e16.root || (e16.return ? c126.insert(e16.return) : e16.value && e16.type !== c9 && c126.insert(e16.value + "{}"));
    } : rulesheet(function(e17) {
      c126.insert(e17);
    })
  ];
  var g113 = middleware(l42.concat(o410, y115));
  var b118 = function stylis(e18) {
    return serialize(compile(e18), g113);
  };
  u42 = function insert(e19, r102, t77, n415) {
    c126 = t77;
    r102.map !== void 0 && (c126 = {
      insert: function insert2(e20) {
        t77.insert(e20 + r102.map);
      }
    });
    b118(e19 ? e19 + "{" + r102.styles + "}" : r102.styles);
    n415 && (w112.inserted[r102.name] = true);
  };
  var w112 = {
    key: t514,
    sheet: new e8({
      key: t514,
      container: i38,
      nonce: r73.nonce,
      speedy: r73.speedy,
      prepend: r73.prepend,
      insertionPoint: r73.insertionPoint
    }),
    nonce: r73.nonce,
    inserted: a311,
    registered: {},
    insert: u42
  };
  w112.sheet.hydrate(s219);
  return w112;
};
var i9 = q2({
  key: "css",
  prepend: true
});
function StyledEngineProvider(e151) {
  const { injectFirst: o134, children: n64 } = e151;
  return o134 ? p4(o, {
    value: i9,
    children: n64
  }) : n64;
}
true ? StyledEngineProvider.propTypes = {
  children: s2.node,
  injectFirst: s2.bool
} : void 0;
function isEmpty(t150) {
  return t150 === void 0 || t150 === null || Object.keys(t150).length === 0;
}
function GlobalStyles(t233) {
  const { styles: r58, defaultTheme: s46 = {} } = t233;
  const n65 = typeof r58 === "function" ? (t324) => r58(isEmpty(t324) ? s46 : t324) : r58;
  return p4(s, {
    styles: n65
  });
}
true ? GlobalStyles.propTypes = {
  defaultTheme: s2.object,
  styles: s2.oneOfType([
    s2.string,
    s2.object,
    s2.func
  ])
} : void 0;
function styled(o50, t151) {
  const r59 = b10(o50, t151);
  return true ? (...e152) => {
    const t78 = typeof o50 === "string" ? `"${o50}"` : "component";
    e152.length === 0 ? console.error([
      `MUI: Seems like you called \`styled(${t78})()\` without a \`style\` argument.`,
      'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'
    ].join("\n")) : e152.some((e236) => e236 === void 0) && console.error(`MUI: the styled(${t78})(...args) API requires all its args to be defined.`);
    return r59(...e152);
  } : r59;
}
var o8 = true ? s2.oneOfType([
  s2.number,
  s2.string,
  s2.object,
  s2.array
]) : {};
function merge(e153, n129) {
  return n129 ? deepmerge(e153, n129, {
    clone: false
  }) : e153;
}
var s10 = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};
var i10 = {
  keys: [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  up: (e5) => `@media (min-width:${s10[e5]}px)`
};
function handleBreakpoints(e237, n220, r144) {
  const t152 = e237.theme || {};
  if (Array.isArray(n220)) {
    const e5 = t152.breakpoints || i10;
    return n220.reduce((t234, o10, s5) => {
      t234[e5.up(e5.keys[s5])] = r144(n220[s5]);
      return t234;
    }, {});
  }
  if (typeof n220 === "object") {
    const e327 = t152.breakpoints || i10;
    return Object.keys(n220).reduce((t325, o224) => {
      if (Object.keys(e327.values || s10).indexOf(o224) !== -1) {
        const s5 = e327.up(o224);
        t325[s5] = r144(n220[o224], o224);
      } else {
        const e5 = o224;
        t325[e5] = n220[e5];
      }
      return t325;
    }, {});
  }
  const o135 = r144(n220);
  return o135;
}
function createEmptyBreakpointObject(e522 = {}) {
  var n316;
  const r317 = e522 == null || (n316 = e522.keys) == null ? void 0 : n316.reduce((n416, r412) => {
    const t = e522.up(r412);
    n416[t] = {};
    return n416;
  }, {});
  return r317 || {};
}
function removeUnusedBreakpoints(e611, n511) {
  return e611.reduce((e75, n8) => {
    const r510 = e75[n8];
    const t515 = !r510 || Object.keys(r510).length === 0;
    t515 && delete e75[n8];
    return e75;
  }, n511);
}
function getPath(e122, n11) {
  return n11 && typeof n11 === "string" ? n11.split(".").reduce((e13, n8) => e13 && e13[n8] ? e13[n8] : null, e122) : null;
}
function getValue$1(e14, n12, r93, t1111 = r93) {
  let o71;
  o71 = typeof e14 === "function" ? e14(r93) : Array.isArray(e14) ? e14[r93] || t1111 : getPath(e14, r93) || t1111;
  n12 && (o71 = n12(o71));
  return o71;
}
function style$1(e15) {
  const {
    prop: n13,
    cssProperty: r103 = e15.prop,
    themeKey: s315,
    transform: i133
  } = e15;
  const fn2 = (e16) => {
    if (e16[n13] == null)
      return null;
    const o81 = e16[n13];
    const a220 = e16.theme;
    const c127 = getPath(a220, s315) || {};
    const styleFromPropValue = (e17) => {
      let o92 = getValue$1(c127, i133, e17);
      e17 === o92 && typeof e17 === "string" && (o92 = getValue$1(c127, i133, `${n13}${e17 === "default" ? "" : capitalize(e17)}`, e17));
      return r103 === false ? o92 : {
        [r103]: o92
      };
    };
    return handleBreakpoints(e16, o81, styleFromPropValue);
  };
  fn2.propTypes = true ? {
    [n13]: o8
  } : {};
  fn2.filterProps = [
    n13
  ];
  return fn2;
}
function memoize1(e18) {
  const n14 = {};
  return (r1111) => {
    n14[r1111] === void 0 && (n14[r1111] = e18(r1111));
    return n14[r1111];
  };
}
var a14 = {
  m: "margin",
  p: "padding"
};
var c10 = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: [
    "Left",
    "Right"
  ],
  y: [
    "Top",
    "Bottom"
  ]
};
var u11 = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
};
var p10 = memoize1((e19) => {
  if (e19.length > 2) {
    if (!u11[e19]) {
      return [
        e19
      ];
    }
    e19 = u11[e19];
  }
  const [n8, r] = e19.split("");
  const t1211 = a14[n8];
  const o10 = c10[r] || "";
  return Array.isArray(o10) ? o10.map((e20) => t1211 + e20) : [
    t1211 + o10
  ];
});
var l9 = [
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginX",
  "marginY",
  "marginInline",
  "marginInlineStart",
  "marginInlineEnd",
  "marginBlock",
  "marginBlockStart",
  "marginBlockEnd"
];
var d13 = [
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingX",
  "paddingY",
  "paddingInline",
  "paddingInlineStart",
  "paddingInlineEnd",
  "paddingBlock",
  "paddingBlockStart",
  "paddingBlockEnd"
];
var g8 = [
  ...l9,
  ...d13
];
function createUnaryUnit(e21, n15, r122, t1310) {
  const o11 = getPath(e21, n15) || r122;
  if (typeof o11 === "number") {
    return (e22) => {
      if (typeof e22 === "string")
        return e22;
      typeof e22 !== "number" && console.error(`MUI: Expected ${t1310} argument to be a number or a string, got ${e22}.`);
      return o11 * e22;
    };
  }
  if (Array.isArray(o11)) {
    return (e23) => {
      if (typeof e23 === "string")
        return e23;
      Number.isInteger(e23) ? e23 > o11.length - 1 && console.error([
        `MUI: The value provided (${e23}) overflows.`,
        `The supported values are: ${JSON.stringify(o11)}.`,
        `${e23} > ${o11.length - 1}, you need to add the missing values.`
      ].join("\n")) : console.error([
        `MUI: The \`theme.${n15}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n15}\` as a number.`
      ].join("\n"));
      return o11[e23];
    };
  }
  if (typeof o11 === "function")
    return o11;
  console.error([
    `MUI: The \`theme.${n15}\` value (${o11}) is invalid.`,
    "It should be a number, an array or a function."
  ].join("\n"));
  return () => {
  };
}
function createUnarySpacing(e24) {
  return createUnaryUnit(e24, "spacing", 8, "spacing");
}
function getValue(e25, n16) {
  if (typeof n16 === "string" || n16 == null)
    return n16;
  const r13 = Math.abs(n16);
  const t1410 = e25(r13);
  return n16 >= 0 ? t1410 : typeof t1410 === "number" ? -t1410 : `-${t1410}`;
}
function getStyleFromPropValue(e26, n17) {
  return (r14) => e26.reduce((e27, t) => {
    e27[t] = getValue(n17, r14);
    return e27;
  }, {});
}
function resolveCssProperty(e28, n18, r15, t153) {
  if (n18.indexOf(r15) === -1)
    return null;
  const o12 = p10(r15);
  const s47 = getStyleFromPropValue(o12, t153);
  const i221 = e28[r15];
  return handleBreakpoints(e28, i221, s47);
}
function style(e29, n19) {
  const r16 = createUnarySpacing(e29.theme);
  return Object.keys(e29).map((t161) => resolveCssProperty(e29, n19, t161, r16)).reduce(merge, {});
}
function margin(e30) {
  return style(e30, l9);
}
margin.propTypes = true ? l9.reduce((e31, n8) => {
  e31[n8] = o8;
  return e31;
}, {}) : {};
margin.filterProps = l9;
function padding(e32) {
  return style(e32, d13);
}
padding.propTypes = true ? d13.reduce((e33, n8) => {
  e33[n8] = o8;
  return e33;
}, {}) : {};
padding.filterProps = d13;
function spacing(e34) {
  return style(e34, g8);
}
spacing.propTypes = true ? g8.reduce((e35, n8) => {
  e35[n8] = o8;
  return e35;
}, {}) : {};
spacing.filterProps = g8;
function compose(...r145) {
  const e154 = r145.reduce((o136, r223) => {
    r223.filterProps.forEach((e5) => {
      o136[e5] = r223;
    });
    return o136;
  }, {});
  const fn2 = (r318) => Object.keys(r318).reduce((s135, t) => e154[t] ? merge(s135, e154[t](r318)) : s135, {});
  fn2.propTypes = true ? r145.reduce((o225, r413) => Object.assign(o225, r413.propTypes), {}) : {};
  fn2.filterProps = r145.reduce((o316, r511) => o316.concat(r511.filterProps), []);
  return fn2;
}
function getBorder(o411) {
  return typeof o411 !== "number" ? o411 : `${o411}px solid`;
}
var u12 = style$1({
  prop: "border",
  themeKey: "borders",
  transform: getBorder
});
var d14 = style$1({
  prop: "borderTop",
  themeKey: "borders",
  transform: getBorder
});
var y10 = style$1({
  prop: "borderRight",
  themeKey: "borders",
  transform: getBorder
});
var h11 = style$1({
  prop: "borderBottom",
  themeKey: "borders",
  transform: getBorder
});
var g9 = style$1({
  prop: "borderLeft",
  themeKey: "borders",
  transform: getBorder
});
var b12 = style$1({
  prop: "borderColor",
  themeKey: "palette"
});
var x7 = style$1({
  prop: "borderTopColor",
  themeKey: "palette"
});
var P2 = style$1({
  prop: "borderRightColor",
  themeKey: "palette"
});
var v10 = style$1({
  prop: "borderBottomColor",
  themeKey: "palette"
});
var w6 = style$1({
  prop: "borderLeftColor",
  themeKey: "palette"
});
var borderRadius = (o56) => {
  if (o56.borderRadius !== void 0 && o56.borderRadius !== null) {
    const r65 = createUnaryUnit(o56.theme, "shape.borderRadius", 4, "borderRadius");
    const styleFromPropValue = (o61) => ({
      borderRadius: getValue(r65, o61)
    });
    return handleBreakpoints(o56, o56.borderRadius, styleFromPropValue);
  }
  return null;
};
borderRadius.propTypes = true ? {
  borderRadius: o8
} : {};
borderRadius.filterProps = [
  "borderRadius"
];
var K1 = compose(u12, d14, y10, h11, g9, b12, x7, P2, v10, w6, borderRadius);
var j4 = style$1({
  prop: "displayPrint",
  cssProperty: false,
  transform: (o72) => ({
    "@media print": {
      display: o72
    }
  })
});
var S2 = style$1({
  prop: "display"
});
var G1 = style$1({
  prop: "overflow"
});
var T2 = style$1({
  prop: "textOverflow"
});
var k4 = style$1({
  prop: "visibility"
});
var E5 = style$1({
  prop: "whiteSpace"
});
var O2 = compose(j4, S2, G1, T2, k4, E5);
var R4 = style$1({
  prop: "flexBasis"
});
var C5 = style$1({
  prop: "flexDirection"
});
var A2 = style$1({
  prop: "flexWrap"
});
var N2 = style$1({
  prop: "justifyContent"
});
var z3 = style$1({
  prop: "alignItems"
});
var B1 = style$1({
  prop: "alignContent"
});
var V2 = style$1({
  prop: "order"
});
var W2 = style$1({
  prop: "flex"
});
var F2 = style$1({
  prop: "flexGrow"
});
var D2 = style$1({
  prop: "flexShrink"
});
var I2 = style$1({
  prop: "alignSelf"
});
var H1 = style$1({
  prop: "justifyItems"
});
var _5 = style$1({
  prop: "justifySelf"
});
var L2 = compose(R4, C5, A2, N2, z3, B1, V2, W2, F2, D2, I2, H1, _5);
var gap = (o82) => {
  if (o82.gap !== void 0 && o82.gap !== null) {
    const r74 = createUnaryUnit(o82.theme, "spacing", 8, "gap");
    const styleFromPropValue = (o92) => ({
      gap: getValue(r74, o92)
    });
    return handleBreakpoints(o82, o82.gap, styleFromPropValue);
  }
  return null;
};
gap.propTypes = true ? {
  gap: o8
} : {};
gap.filterProps = [
  "gap"
];
var columnGap = (o10) => {
  if (o10.columnGap !== void 0 && o10.columnGap !== null) {
    const r84 = createUnaryUnit(o10.theme, "spacing", 8, "columnGap");
    const styleFromPropValue = (o11) => ({
      columnGap: getValue(r84, o11)
    });
    return handleBreakpoints(o10, o10.columnGap, styleFromPropValue);
  }
  return null;
};
columnGap.propTypes = true ? {
  columnGap: o8
} : {};
columnGap.filterProps = [
  "columnGap"
];
var rowGap = (o12) => {
  if (o12.rowGap !== void 0 && o12.rowGap !== null) {
    const r94 = createUnaryUnit(o12.theme, "spacing", 8, "rowGap");
    const styleFromPropValue = (o13) => ({
      rowGap: getValue(r94, o13)
    });
    return handleBreakpoints(o12, o12.rowGap, styleFromPropValue);
  }
  return null;
};
rowGap.propTypes = true ? {
  rowGap: o8
} : {};
rowGap.filterProps = [
  "rowGap"
];
var $2 = style$1({
  prop: "gridColumn"
});
var q3 = style$1({
  prop: "gridRow"
});
var J1 = style$1({
  prop: "gridAutoFlow"
});
var M2 = style$1({
  prop: "gridAutoColumns"
});
var Q1 = style$1({
  prop: "gridAutoRows"
});
var U1 = style$1({
  prop: "gridTemplateColumns"
});
var X1 = style$1({
  prop: "gridTemplateRows"
});
var Y1 = style$1({
  prop: "gridTemplateAreas"
});
var Z1 = style$1({
  prop: "gridArea"
});
var oo = compose(gap, columnGap, rowGap, $2, q3, J1, M2, Q1, U1, X1, Y1, Z1);
var ro = style$1({
  prop: "color",
  themeKey: "palette"
});
var eo = style$1({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette"
});
var so = style$1({
  prop: "backgroundColor",
  themeKey: "palette"
});
var to = compose(ro, eo, so);
var po = style$1({
  prop: "position"
});
var no = style$1({
  prop: "zIndex",
  themeKey: "zIndex"
});
var ao = style$1({
  prop: "top"
});
var co = style$1({
  prop: "right"
});
var io = style$1({
  prop: "bottom"
});
var lo = style$1({
  prop: "left"
});
var mo = compose(po, no, ao, co, io, lo);
var fo = style$1({
  prop: "boxShadow",
  themeKey: "shadows"
});
function transform(o14) {
  return o14 <= 1 && o14 !== 0 ? 100 * o14 + "%" : o14;
}
var uo = style$1({
  prop: "width",
  transform
});
var maxWidth = (o15) => {
  if (o15.maxWidth !== void 0 && o15.maxWidth !== null) {
    const styleFromPropValue = (r104) => {
      var e238, s220, t154;
      const p122 = ((e238 = o15.theme) == null || (s220 = e238.breakpoints) == null || (t154 = s220.values) == null ? void 0 : t154[r104]) || s10[r104];
      return {
        maxWidth: p122 || transform(r104)
      };
    };
    return handleBreakpoints(o15, o15.maxWidth, styleFromPropValue);
  }
  return null;
};
maxWidth.filterProps = [
  "maxWidth"
];
var yo = style$1({
  prop: "minWidth",
  transform
});
var ho = style$1({
  prop: "height",
  transform
});
var go = style$1({
  prop: "maxHeight",
  transform
});
var bo = style$1({
  prop: "minHeight",
  transform
});
style$1({
  prop: "size",
  cssProperty: "width",
  transform
});
style$1({
  prop: "size",
  cssProperty: "height",
  transform
});
var vo = style$1({
  prop: "boxSizing"
});
var wo = compose(uo, maxWidth, yo, ho, go, bo, vo);
var Ko = style$1({
  prop: "fontFamily",
  themeKey: "typography"
});
var jo = style$1({
  prop: "fontSize",
  themeKey: "typography"
});
var So = style$1({
  prop: "fontStyle",
  themeKey: "typography"
});
var Go = style$1({
  prop: "fontWeight",
  themeKey: "typography"
});
var To = style$1({
  prop: "letterSpacing"
});
var ko = style$1({
  prop: "lineHeight"
});
var Eo = style$1({
  prop: "textAlign"
});
var Oo = style$1({
  prop: "typography",
  cssProperty: false,
  themeKey: "typography"
});
var Ro = compose(Oo, Ko, jo, So, Go, To, ko, Eo);
var Co = {
  borders: K1.filterProps,
  display: O2.filterProps,
  flexbox: L2.filterProps,
  grid: oo.filterProps,
  positions: mo.filterProps,
  palette: to.filterProps,
  shadows: fo.filterProps,
  sizing: wo.filterProps,
  spacing: spacing.filterProps,
  typography: Ro.filterProps
};
var Ao = {
  borders: K1,
  display: O2,
  flexbox: L2,
  grid: oo,
  positions: mo,
  palette: to,
  shadows: fo,
  sizing: wo,
  spacing,
  typography: Ro
};
var No = Object.keys(Co).reduce((o16, r) => {
  Co[r].forEach((e5) => {
    o16[e5] = Ao[r];
  });
  return o16;
}, {});
function getThemeValue(o17, r1112, e328) {
  const s316 = {
    [o17]: r1112,
    theme: e328
  };
  const t235 = No[o17];
  return t235 ? t235(s316) : {
    [o17]: r1112
  };
}
function objectsHaveSameKeys(...o18) {
  const r122 = o18.reduce((o19, r13) => o19.concat(Object.keys(r13)), []);
  const e424 = new Set(r122);
  return o18.every((o20) => e424.size === Object.keys(o20).length);
}
function callIfFn(o21, r14) {
  return typeof o21 === "function" ? o21(r14) : o21;
}
function styleFunctionSx(r15) {
  const { sx: e523, theme: s48 = {} } = r15 || {};
  if (!e523)
    return null;
  function traverse(r16) {
    let e612 = r16;
    if (typeof r16 === "function")
      e612 = r16(s48);
    else if (typeof r16 !== "object")
      return r16;
    const p211 = createEmptyBreakpointObject(s48.breakpoints);
    const n130 = Object.keys(p211);
    let a137 = p211;
    Object.keys(e612).forEach((r17) => {
      const p33 = callIfFn(e612[r17], s48);
      if (p33 !== null && p33 !== void 0) {
        if (typeof p33 === "object") {
          if (No[r17])
            a137 = merge(a137, getThemeValue(r17, p33, s48));
          else {
            const e76 = handleBreakpoints({
              theme: s48
            }, p33, (o22) => ({
              [r17]: o22
            }));
            objectsHaveSameKeys(e76, p33) ? a137[r17] = styleFunctionSx({
              sx: p33,
              theme: s48
            }) : a137 = merge(a137, e76);
          }
        } else
          a137 = merge(a137, getThemeValue(r17, p33, s48));
      }
    });
    return removeUnusedBreakpoints(n130, a137);
  }
  return Array.isArray(e523) ? e523.map(traverse) : traverse(e523);
}
styleFunctionSx.filterProps = [
  "sx"
];
var zo = [
  "sx"
];
var splitProps = (o23) => {
  const r18 = {
    systemProps: {},
    otherProps: {}
  };
  Object.keys(o23).forEach((e5) => {
    No[e5] ? r18.systemProps[e5] = o23[e5] : r18.otherProps[e5] = o23[e5];
  });
  return r18;
};
function extendSxProp(o24) {
  const { sx: r19 } = o24, e84 = _objectWithoutPropertiesLoose(o24, zo);
  const { systemProps: s5, otherProps: t326 } = splitProps(e84);
  let p41;
  p41 = Array.isArray(r19) ? [
    s5,
    ...r19
  ] : typeof r19 === "function" ? (...o25) => {
    const e93 = r19(...o25);
    return isPlainObject(e93) ? _extends({}, s5, e93) : s5;
  } : _extends({}, s5, r19);
  return _extends({}, t326, {
    sx: p41
  });
}
var r12 = [
  "values",
  "unit",
  "step"
];
function createBreakpoints(t155) {
  const {
    values: o137 = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    },
    unit: i134 = "px",
    step: s136 = 5
  } = t155, a40 = _objectWithoutPropertiesLoose(t155, r12);
  const c33 = Object.keys(o137);
  function up(e155) {
    const n131 = typeof o137[e155] === "number" ? o137[e155] : e155;
    return `@media (min-width:${n131}${i134})`;
  }
  function down(e239) {
    const n221 = typeof o137[e239] === "number" ? o137[e239] : e239;
    return `@media (max-width:${n221 - s136 / 100}${i134})`;
  }
  function between(e329, n317) {
    const t236 = c33.indexOf(n317);
    return `@media (min-width:${typeof o137[e329] === "number" ? o137[e329] : e329}${i134}) and (max-width:${(t236 !== -1 && typeof o137[c33[t236]] === "number" ? o137[c33[t236]] : n317) - s136 / 100}${i134})`;
  }
  function only(e425) {
    return c33.indexOf(e425) + 1 < c33.length ? between(e425, c33[c33.indexOf(e425) + 1]) : up(e425);
  }
  function not(e524) {
    const n417 = c33.indexOf(e524);
    return n417 === 0 ? up(c33[1]) : n417 === c33.length - 1 ? down(c33[n417]) : between(e524, c33[c33.indexOf(e524) + 1]).replace("@media", "@media not all and");
  }
  return _extends({
    keys: c33,
    values: o137,
    up,
    down,
    between,
    only,
    not,
    unit: i134
  }, a40);
}
var i11 = {
  borderRadius: 4
};
function createSpacing(e613 = 8) {
  if (e613.mui)
    return e613;
  const n512 = createUnarySpacing({
    spacing: e613
  });
  const spacing1 = (...e77) => {
    e77.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${e77.length}`);
    const t327 = e77.length === 0 ? [
      1
    ] : e77;
    return t327.map((e85) => {
      const t418 = n512(e85);
      return typeof t418 === "number" ? `${t418}px` : t418;
    }).join(" ");
  };
  spacing1.mui = true;
  return spacing1;
}
var s11 = [
  "breakpoints",
  "palette",
  "spacing",
  "shape"
];
function createTheme(o226 = {}, ...r146) {
  const {
    breakpoints: a43 = {},
    palette: c34 = {},
    spacing: p34,
    shape: u30 = {}
  } = o226, m30 = _objectWithoutPropertiesLoose(o226, s11);
  const d35 = createBreakpoints(a43);
  const l38 = createSpacing(p34);
  let f42 = deepmerge({
    breakpoints: d35,
    direction: "ltr",
    components: {},
    palette: _extends({
      mode: "light"
    }, c34),
    spacing: l38,
    shape: _extends({}, i11, u30)
  }, m30);
  f42 = r146.reduce((e94, n66) => deepmerge(e94, n66), f42);
  return f42;
}
var t17 = t1(null);
t17.displayName = "ThemeContext";
function useTheme() {
  const s49 = r1(t17);
  o1(s49);
  return s49;
}
var u13 = typeof Symbol === "function" && Symbol.for;
var s12 = u13 ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function mergeOuterLocalTheme(o138, r147) {
  if (typeof r147 === "function") {
    const e156 = r147(o138);
    e156 || console.error([
      "MUI: You should return an object from your theme function, i.e.",
      "<ThemeProvider theme={() => ({})} />"
    ].join("\n"));
    return e156;
  }
  return _extends({}, o138, r147);
}
function ThemeProvider(e240) {
  const { children: r224, theme: t156 } = e240;
  const u128 = useTheme();
  u128 === null && typeof t156 === "function" && console.error([
    "MUI: You are providing a theme function prop to the ThemeProvider component:",
    "<ThemeProvider theme={outerTheme => outerTheme} />",
    "",
    "However, no outer theme is present.",
    "Make sure a theme is already injected higher in the React tree or provide a theme object."
  ].join("\n"));
  const p35 = F(() => {
    const e330 = u128 === null ? t156 : mergeOuterLocalTheme(u128, t156);
    e330 != null && (e330[s12] = u128 !== null);
    return e330;
  }, [
    t156,
    u128
  ]);
  return p4(t17.Provider, {
    value: p35,
    children: r224
  });
}
true ? ThemeProvider.propTypes = {
  children: s2.node,
  theme: s2.oneOfType([
    s2.object,
    s2.func
  ]).isRequired
} : void 0;
true ? ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes) : void 0;
function isObjectEmpty(e157) {
  return Object.keys(e157).length === 0;
}
function useTheme$1(e241 = null) {
  const s137 = useTheme();
  return !s137 || isObjectEmpty(s137) ? e241 : s137;
}
var s13 = createTheme();
function useTheme1(e331 = s13) {
  return useTheme$1(e331);
}
function InnerThemeProvider(e158) {
  const r148 = useTheme1();
  return p4(n.Provider, {
    value: typeof r148 === "object" ? r148 : {},
    children: e158.children
  });
}
true ? InnerThemeProvider.propTypes = {
  children: s2.node
} : void 0;
function ThemeProvider1(e242) {
  const { children: o139, theme: i135 } = e242;
  return p4(ThemeProvider, {
    theme: i135,
    children: p4(InnerThemeProvider, {
      children: o139
    })
  });
}
true ? ThemeProvider1.propTypes = {
  children: s2.node,
  theme: s2.oneOfType([
    s2.object,
    s2.func
  ]).isRequired
} : void 0;
true ? ThemeProvider1.propTypes = exactProp(ThemeProvider1.propTypes) : void 0;
var i12 = [
  "className",
  "component"
];
function createBox(f127 = {}) {
  const {
    defaultTheme: l39,
    defaultClassName: u34 = "MuiBox-root",
    generateClassName: d36
  } = f127;
  const x26 = styled("div")(styleFunctionSx);
  const b119 = l1(function Box(r149, t157) {
    const m120 = useTheme1(l39);
    const n132 = extendSxProp(r149), { className: f213, component: b32 = "div" } = n132, N25 = _objectWithoutPropertiesLoose(n132, i12);
    return p4(x26, _extends({
      as: b32,
      ref: t157,
      className: clsx_m(f213, d36 ? d36(u34) : u34),
      theme: m120
    }, N25));
  });
  true ? b119.propTypes = {
    children: s2.node,
    component: s2.elementType,
    sx: s2.oneOfType([
      s2.object,
      s2.array,
      s2.func
    ])
  } : void 0;
  return b119;
}
createBox();
function getThemeProps(o140) {
  const { theme: t79, name: p, props: r60 } = o140;
  return t79 && t79.components && t79.components[p] && t79.components[p].defaultProps ? resolveProps(t79.components[p].defaultProps, r60) : r60;
}
function useThemeProps({ props: e159, name: t80, defaultTheme: p36 }) {
  const r66 = useTheme1(p36);
  const s50 = getThemeProps({
    theme: r66,
    name: t80,
    props: e159
  });
  return s50;
}
var be = [
  "variant"
];
function isEmpty$1(e70) {
  return e70.length === 0;
}
function propsToClassKey(e78) {
  const { variant: o141 } = e78, t82 = _objectWithoutPropertiesLoose(e78, be);
  let r67 = o141 || "";
  Object.keys(t82).sort().forEach((o57) => {
    r67 += o57 === "color" ? isEmpty$1(r67) ? e78[o57] : capitalize(e78[o57]) : `${isEmpty$1(r67) ? o57 : capitalize(o57)}${capitalize(e78[o57].toString())}`;
  });
  return r67;
}
var Ce = [
  "name",
  "slot",
  "skipVariantsResolver",
  "skipSx",
  "overridesResolver"
];
var ve = [
  "theme"
];
var xe = [
  "theme"
];
function isEmpty1(e79) {
  return Object.keys(e79).length === 0;
}
var getStyleOverrides = (e5, o58) => o58.components && o58.components[e5] && o58.components[e5].styleOverrides ? o58.components[e5].styleOverrides : null;
var getVariantStyles = (e13, o59) => {
  let t83 = [];
  o59 && o59.components && o59.components[e13] && o59.components[e13].variants && (t83 = o59.components[e13].variants);
  const r68 = {};
  t83.forEach((e80) => {
    const o10 = propsToClassKey(e80.props);
    r68[o10] = e80.style;
  });
  return r68;
};
var variantsResolver = (e86, o60, t158, r13) => {
  var s51, n67;
  const { ownerState: a44 = {} } = e86;
  const l40 = [];
  const c35 = t158 == null || (s51 = t158.components) == null || (n67 = s51[r13]) == null ? void 0 : n67.variants;
  c35 && c35.forEach((t84) => {
    let r69 = true;
    Object.keys(t84.props).forEach((o10) => {
      a44[o10] !== t84.props[o10] && e86[o10] !== t84.props[o10] && (r69 = false);
    });
    r69 && l40.push(o60[propsToClassKey(t84.props)]);
  });
  return l40;
};
function shouldForwardProp(e87) {
  return e87 !== "ownerState" && e87 !== "theme" && e87 !== "sx" && e87 !== "as";
}
var ke = createTheme();
var lowercaseFirstLetter = (e88) => e88.charAt(0).toLowerCase() + e88.slice(1);
function createStyled(e243 = {}) {
  const {
    defaultTheme: o227 = ke,
    rootShouldForwardProp: t237 = shouldForwardProp,
    slotShouldForwardProp: r225 = shouldForwardProp
  } = e243;
  return (e332, s138 = {}) => {
    const {
      name: n68,
      slot: a45,
      skipVariantsResolver: l126,
      skipSx: c128,
      overridesResolver: i39
    } = s138, m121 = _objectWithoutPropertiesLoose(s138, Ce);
    const d37 = l126 !== void 0 ? l126 : a45 && a45 !== "Root" || false;
    const u35 = c128 || false;
    let p37;
    n68 && (p37 = `${n68}-${lowercaseFirstLetter(a45 || "Root")}`);
    let h35 = shouldForwardProp;
    a45 === "Root" ? h35 = t237 : a45 && (h35 = r225);
    const g41 = styled(e332, _extends({
      shouldForwardProp: h35,
      label: p37
    }, m121));
    const muiStyledResolver = (t328, ...r319) => {
      const s221 = r319 ? r319.map((e89) => typeof e89 === "function" && e89.__emotion_real !== e89 ? (t85) => {
        let { theme: r70 } = t85, s52 = _objectWithoutPropertiesLoose(t85, ve);
        return e89(_extends({
          theme: isEmpty1(r70) ? o227 : r70
        }, s52));
      } : e89) : [];
      let l43 = t328;
      n68 && i39 && s221.push((e90) => {
        const t86 = isEmpty1(e90.theme) ? o227 : e90.theme;
        const r75 = getStyleOverrides(n68, t86);
        return r75 ? i39(e90, r75) : null;
      });
      n68 && !d37 && s221.push((e95) => {
        const t87 = isEmpty1(e95.theme) ? o227 : e95.theme;
        return variantsResolver(e95, getVariantStyles(n68, t87), t87, n68);
      });
      u35 || s221.push((e96) => {
        const t88 = isEmpty1(e96.theme) ? o227 : e96.theme;
        return styleFunctionSx(_extends({}, e96, {
          theme: t88
        }));
      });
      const c36 = s221.length - r319.length;
      if (Array.isArray(t328) && c36 > 0) {
        const e97 = new Array(c36).fill("");
        l43 = [
          ...t328,
          ...e97
        ];
        l43.raw = [
          ...t328.raw,
          ...e97
        ];
      } else {
        typeof t328 === "function" && (l43 = (e98) => {
          let { theme: r76 } = e98, s53 = _objectWithoutPropertiesLoose(e98, xe);
          return t328(_extends({
            theme: isEmpty1(r76) ? o227 : r76
          }, s53));
        });
      }
      const m31 = g41(l43, ...s221);
      if (true) {
        let o62;
        n68 && (o62 = `${n68}${a45 || ""}`);
        o62 === void 0 && (o62 = `Styled(${getDisplayName(e332)})`);
        m31.displayName = o62;
      }
      return m31;
    };
    return muiStyledResolver;
  };
}
createStyled();
function clamp1(e99, o63 = 0, t89 = 1) {
  (e99 < o63 || e99 > t89) && console.error(`MUI: The value provided ${e99} is out of range [${o63}, ${t89}].`);
  return Math.min(Math.max(o63, e99), t89);
}
function hexToRgb(e426) {
  e426 = e426.substr(1);
  const o317 = new RegExp(`.{1,${e426.length >= 6 ? 2 : 1}}`, "g");
  let t90 = e426.match(o317);
  t90 && t90[0].length === 1 && (t90 = t90.map((e100) => e100 + e100));
  return t90 ? `rgb${t90.length === 4 ? "a" : ""}(${t90.map((e101, o64) => o64 < 3 ? parseInt(e101, 16) : Math.round(parseInt(e101, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function decomposeColor(e525) {
  if (e525.type)
    return e525;
  if (e525.charAt(0) === "#")
    return decomposeColor(hexToRgb(e525));
  const o65 = e525.indexOf("(");
  const t92 = e525.substring(0, o65);
  if ([
    "rgb",
    "rgba",
    "hsl",
    "hsla",
    "color"
  ].indexOf(t92) === -1) {
    throw new Error(true ? `MUI: Unsupported \`${e525}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, e525));
  }
  let r77 = e525.substring(o65 + 1, e525.length - 1);
  let s54;
  if (t92 === "color") {
    r77 = r77.split(" ");
    s54 = r77.shift();
    r77.length === 4 && r77[3].charAt(0) === "/" && (r77[3] = r77[3].substr(1));
    if ([
      "srgb",
      "display-p3",
      "a98-rgb",
      "prophoto-rgb",
      "rec-2020"
    ].indexOf(s54) === -1) {
      throw new Error(true ? `MUI: unsupported \`${s54}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : formatMuiErrorMessage(10, s54));
    }
  } else
    r77 = r77.split(",");
  r77 = r77.map((e102) => parseFloat(e102));
  return {
    type: t92,
    values: r77,
    colorSpace: s54
  };
}
function recomposeColor(e614) {
  const { type: o412, colorSpace: t93 } = e614;
  let { values: r78 } = e614;
  if (o412.indexOf("rgb") !== -1) {
    r78 = r78.map((e103, o66) => o66 < 3 ? parseInt(e103, 10) : e103);
  } else if (o412.indexOf("hsl") !== -1) {
    r78[1] = `${r78[1]}%`;
    r78[2] = `${r78[2]}%`;
  }
  r78 = o412.indexOf("color") !== -1 ? `${t93} ${r78.join(" ")}` : `${r78.join(", ")}`;
  return `${o412}(${r78})`;
}
function hslToRgb(e810) {
  e810 = decomposeColor(e810);
  const { values: o67 } = e810;
  const t94 = o67[0];
  const r79 = o67[1] / 100;
  const s55 = o67[2] / 100;
  const n69 = r79 * Math.min(s55, 1 - s55);
  const f43 = (e104, o68 = (e104 + t94 / 30) % 12) => s55 - n69 * Math.max(Math.min(o68 - 3, 9 - o68, 1), -1);
  let a46 = "rgb";
  const l44 = [
    Math.round(255 * f43(0)),
    Math.round(255 * f43(8)),
    Math.round(255 * f43(4))
  ];
  if (e810.type === "hsla") {
    a46 += "a";
    l44.push(o67[3]);
  }
  return recomposeColor({
    type: a46,
    values: l44
  });
}
function getLuminance(e105) {
  e105 = decomposeColor(e105);
  let o73 = e105.type === "hsl" ? decomposeColor(hslToRgb(e105)).values : e105.values;
  o73 = o73.map((o69) => {
    e105.type !== "color" && (o69 /= 255);
    return o69 <= 0.03928 ? o69 / 12.92 : ((o69 + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * o73[0] + 0.7152 * o73[1] + 0.0722 * o73[2]).toFixed(3));
}
function getContrastRatio(e106, o70) {
  const t95 = getLuminance(e106);
  const r80 = getLuminance(o70);
  return (Math.max(t95, r80) + 0.05) / (Math.min(t95, r80) + 0.05);
}
function alpha(e107, o74) {
  e107 = decomposeColor(e107);
  o74 = clamp1(o74);
  e107.type !== "rgb" && e107.type !== "hsl" || (e107.type += "a");
  e107.type === "color" ? e107.values[3] = `/${o74}` : e107.values[3] = o74;
  return recomposeColor(e107);
}
function darken(e108, o75) {
  e108 = decomposeColor(e108);
  o75 = clamp1(o75);
  if (e108.type.indexOf("hsl") !== -1)
    e108.values[2] *= 1 - o75;
  else if (e108.type.indexOf("rgb") !== -1 || e108.type.indexOf("color") !== -1) {
    for (let t96 = 0; t96 < 3; t96 += 1)
      e108.values[t96] *= 1 - o75;
  }
  return recomposeColor(e108);
}
function lighten(e109, o76) {
  e109 = decomposeColor(e109);
  o76 = clamp1(o76);
  if (e109.type.indexOf("hsl") !== -1) {
    e109.values[2] += (100 - e109.values[2]) * o76;
  } else if (e109.type.indexOf("rgb") !== -1) {
    for (let t97 = 0; t97 < 3; t97 += 1) {
      e109.values[t97] += (255 - e109.values[t97]) * o76;
    }
  } else if (e109.type.indexOf("color") !== -1) {
    for (let t419 = 0; t419 < 3; t419 += 1) {
      e109.values[t419] += (1 - e109.values[t419]) * o76;
    }
  }
  return recomposeColor(e109);
}
var f12 = {
  black: "#000",
  white: "#fff"
};
var e10 = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
var f13 = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
};
var a15 = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
};
var f14 = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
var f15 = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
var f16 = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
var e11 = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
var p11 = [
  "mode",
  "contrastThreshold",
  "tonalOffset"
];
var f17 = {
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: f12.white,
    default: f12.white
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
var b13 = {
  text: {
    primary: f12.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: f12.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function addLightOrDark(r150, t159, e160, o142) {
  const i136 = o142.light || o142;
  const s139 = o142.dark || 1.5 * o142;
  r150[t159] || (r150.hasOwnProperty(e160) ? r150[t159] = r150[e160] : t159 === "light" ? r150.light = lighten(r150.main, i136) : t159 === "dark" && (r150.dark = darken(r150.main, s139)));
}
function getDefaultPrimary(r226 = "light") {
  return r226 === "dark" ? {
    main: f16[200],
    light: f16[50],
    dark: f16[400]
  } : {
    main: f16[700],
    light: f16[400],
    dark: f16[800]
  };
}
function getDefaultSecondary(r320 = "light") {
  return r320 === "dark" ? {
    main: f13[200],
    light: f13[50],
    dark: f13[400]
  } : {
    main: f13[500],
    light: f13[300],
    dark: f13[700]
  };
}
function getDefaultError(r414 = "light") {
  return r414 === "dark" ? {
    main: f14[500],
    light: f14[300],
    dark: f14[700]
  } : {
    main: f14[700],
    light: f14[400],
    dark: f14[800]
  };
}
function getDefaultInfo(r512 = "light") {
  return r512 === "dark" ? {
    main: a15[400],
    light: a15[300],
    dark: a15[700]
  } : {
    main: a15[700],
    light: a15[500],
    dark: a15[900]
  };
}
function getDefaultSuccess(r610 = "light") {
  return r610 === "dark" ? {
    main: e11[400],
    light: e11[300],
    dark: e11[700]
  } : {
    main: e11[800],
    light: e11[500],
    dark: e11[900]
  };
}
function getDefaultWarning(r710 = "light") {
  return r710 === "dark" ? {
    main: f15[400],
    light: f15[300],
    dark: f15[700]
  } : {
    main: "#ed6c02",
    light: f15[500],
    dark: f15[900]
  };
}
function createPalette(a138) {
  const {
    mode: n133 = "light",
    contrastThreshold: d124 = 3,
    tonalOffset: l127 = 0.2
  } = a138, m122 = _objectWithoutPropertiesLoose(a138, p11);
  const g114 = a138.primary || getDefaultPrimary(n133);
  const h117 = a138.secondary || getDefaultSecondary(n133);
  const u129 = a138.error || getDefaultError(n133);
  const y37 = a138.info || getDefaultInfo(n133);
  const k16 = a138.success || getDefaultSuccess(n133);
  const O18 = a138.warning || getDefaultWarning(n133);
  function getContrastText(r85) {
    const t238 = getContrastRatio(r85, b13.text.primary) >= d124 ? b13.text.primary : f17.text.primary;
    if (true) {
      const e244 = getContrastRatio(r85, t238);
      e244 < 3 && console.error([
        `MUI: The contrast ratio of ${e244}:1 for ${t238} on ${r85}`,
        "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.",
        "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"
      ].join("\n"));
    }
    return t238;
  }
  const augmentColor = ({
    color: t329,
    name: o228,
    mainShade: a221 = 500,
    lightShade: n222 = 300,
    darkShade: i222 = 700
  }) => {
    t329 = _extends({}, t329);
    !t329.main && t329[a221] && (t329.main = t329[a221]);
    if (!t329.hasOwnProperty("main")) {
      throw new Error(true ? `MUI: The color${o228 ? ` (${o228})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${a221}\` property.` : formatMuiErrorMessage(11, o228 ? ` (${o228})` : "", a221));
    }
    if (typeof t329.main !== "string") {
      throw new Error(true ? `MUI: The color${o228 ? ` (${o228})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(t329.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, o228 ? ` (${o228})` : "", JSON.stringify(t329.main)));
    }
    addLightOrDark(t329, "light", n222, l127);
    addLightOrDark(t329, "dark", i222, l127);
    t329.contrastText || (t329.contrastText = getContrastText(t329.main));
    return t329;
  };
  const v34 = {
    dark: b13,
    light: f17
  };
  v34[n133] || console.error(`MUI: The palette mode \`${n133}\` is not supported.`);
  const w24 = deepmerge(_extends({
    common: f12,
    mode: n133,
    primary: augmentColor({
      color: g114,
      name: "primary"
    }),
    secondary: augmentColor({
      color: h117,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    error: augmentColor({
      color: u129,
      name: "error"
    }),
    warning: augmentColor({
      color: O18,
      name: "warning"
    }),
    info: augmentColor({
      color: y37,
      name: "info"
    }),
    success: augmentColor({
      color: k16,
      name: "success"
    }),
    grey: e10,
    contrastThreshold: d124,
    getContrastText,
    augmentColor,
    tonalOffset: l127
  }, v34[n133]), m122);
  return w24;
}
function createShadow(...t160) {
  return [
    `${t160[0]}px ${t160[1]}px ${t160[2]}px ${t160[3]}px rgba(0,0,0,${0.2})`,
    `${t160[4]}px ${t160[5]}px ${t160[6]}px ${t160[7]}px rgba(0,0,0,${0.14})`,
    `${t160[8]}px ${t160[9]}px ${t160[10]}px ${t160[11]}px rgba(0,0,0,${0.12})`
  ].join(",");
}
var t18 = [
  "none",
  createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
  createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
  createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
  createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
  createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
  createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
  createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
  createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
  createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
  createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
  createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
  createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
  createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
  createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
  createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
  createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
  createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
  createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
  createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
  createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
  createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
  createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
  createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
  createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)
];
function createMixins(t162, o10, n134) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [`${t162.up("xs")} and (orientation: landscape)`]: {
        minHeight: 48
      },
      [t162.up("sm")]: {
        minHeight: 64
      }
    }
  }, n134);
}
var a16 = [
  "fontFamily",
  "fontSize",
  "fontWeightLight",
  "fontWeightRegular",
  "fontWeightMedium",
  "fontWeightBold",
  "htmlFontSize",
  "allVariants",
  "pxToRem"
];
function round(e161) {
  return Math.round(1e5 * e161) / 1e5;
}
var c11 = {
  textTransform: "uppercase"
};
var u14 = '"Roboto", "Helvetica", "Arial", sans-serif';
function createTypography(n223, r151) {
  const i137 = typeof r151 === "function" ? r151(n223) : r151, {
    fontFamily: s140 = u14,
    fontSize: m123 = 14,
    fontWeightLight: l128 = 300,
    fontWeightRegular: p123 = 400,
    fontWeightMedium: h118 = 500,
    fontWeightBold: f128 = 700,
    htmlFontSize: d125 = 16,
    allVariants: g42,
    pxToRem: b33
  } = i137, y38 = _objectWithoutPropertiesLoose(i137, a16);
  if (true) {
    typeof m123 !== "number" && console.error("MUI: `fontSize` is required to be a number.");
    typeof d125 !== "number" && console.error("MUI: `htmlFontSize` is required to be a number.");
  }
  const M15 = m123 / 14;
  const x27 = b33 || ((e245) => e245 / d125 * M15 + "rem");
  const buildVariant = (t239, o143, n318, r227, i223) => _extends({
    fontFamily: s140,
    fontWeight: t239,
    fontSize: x27(o143),
    lineHeight: n318
  }, s140 === u14 ? {
    letterSpacing: `${round(r227 / o143)}em`
  } : {}, i223, g42);
  const T22 = {
    h1: buildVariant(l128, 96, 1.167, -1.5),
    h2: buildVariant(l128, 60, 1.2, -0.5),
    h3: buildVariant(p123, 48, 1.167, 0),
    h4: buildVariant(p123, 34, 1.235, 0.25),
    h5: buildVariant(p123, 24, 1.334, 0),
    h6: buildVariant(h118, 20, 1.6, 0.15),
    subtitle1: buildVariant(p123, 16, 1.75, 0.15),
    subtitle2: buildVariant(h118, 14, 1.57, 0.1),
    body1: buildVariant(p123, 16, 1.5, 0.15),
    body2: buildVariant(p123, 14, 1.43, 0.15),
    button: buildVariant(h118, 14, 1.75, 0.4, c11),
    caption: buildVariant(p123, 12, 1.66, 0.4),
    overline: buildVariant(p123, 12, 2.66, 1, c11)
  };
  return deepmerge(_extends({
    htmlFontSize: d125,
    pxToRem: x27,
    fontFamily: s140,
    fontSize: m123,
    fontWeightLight: l128,
    fontWeightRegular: p123,
    fontWeightMedium: h118,
    fontWeightBold: f128
  }, T22), y38, {
    clone: false
  });
}
var m11 = [
  "duration",
  "easing",
  "delay"
];
var l10 = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
var p12 = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195
};
function formatMs(e333) {
  return `${Math.round(e333)}ms`;
}
function getAutoHeightDuration(e427) {
  if (!e427)
    return 0;
  const t330 = e427 / 36;
  return Math.round(10 * (4 + 15 * t330 ** 0.25 + t330 / 5));
}
function createTransitions(o229) {
  const n418 = _extends({}, l10, o229.easing);
  const r321 = _extends({}, p12, o229.duration);
  const create = (e526 = [
    "all"
  ], o318 = {}) => {
    const {
      duration: i310 = r321.standard,
      easing: s222 = n418.easeInOut,
      delay: a139 = 0
    } = o318, c129 = _objectWithoutPropertiesLoose(o318, m11);
    if (true) {
      const isString = (e615) => typeof e615 === "string";
      const isNumber = (e710) => !isNaN(parseFloat(e710));
      isString(e526) || Array.isArray(e526) || console.error('MUI: Argument "props" must be a string or Array.');
      isNumber(i310) || isString(i310) || console.error(`MUI: Argument "duration" must be a number or a string but found ${i310}.`);
      isString(s222) || console.error('MUI: Argument "easing" must be a string.');
      isNumber(a139) || isString(a139) || console.error('MUI: Argument "delay" must be a number or a string.');
      Object.keys(c129).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(c129).join(",")}].`);
    }
    return (Array.isArray(e526) ? e526 : [
      e526
    ]).map((e811) => `${e811} ${typeof i310 === "string" ? i310 : formatMs(i310)} ${s222} ${typeof a139 === "string" ? a139 : formatMs(a139)}`).join(",");
  };
  return _extends({
    getAutoHeightDuration,
    create
  }, o229, {
    easing: n418,
    duration: r321
  });
}
var h12 = {
  mobileStepper: 1e3,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
var f18 = [
  "breakpoints",
  "mixins",
  "spacing",
  "palette",
  "transitions",
  "typography",
  "shape"
];
function createTheme1(a222 = {}, ...c214) {
  const {
    mixins: u130 = {},
    palette: m213 = {},
    transitions: l217 = {},
    typography: p212 = {}
  } = a222, d212 = _objectWithoutPropertiesLoose(a222, f18);
  const g43 = createPalette(m213);
  const b34 = createTheme(a222);
  let y39 = deepmerge(b34, {
    mixins: createMixins(b34.breakpoints, b34.spacing, u130),
    palette: g43,
    shadows: t18.slice(),
    typography: createTypography(g43, p212),
    transitions: createTransitions(l217),
    zIndex: _extends({}, h12)
  });
  y39 = deepmerge(y39, d212);
  y39 = c214.reduce((e910, t420) => deepmerge(e910, t420), y39);
  if (true) {
    const e1010 = [
      "active",
      "checked",
      "completed",
      "disabled",
      "error",
      "expanded",
      "focused",
      "focusVisible",
      "required",
      "selected"
    ];
    const traverse = (t516, o413) => {
      let r415;
      for (r415 in t516) {
        const i42 = t516[r415];
        if (e1010.indexOf(r415) !== -1 && Object.keys(i42).length > 0) {
          if (true) {
            const e1110 = generateUtilityClass("", r415);
            console.error([
              `MUI: The \`${o413}\` component increases the CSS specificity of the \`${r415}\` internal state.`,
              "You can not override it like this: ",
              JSON.stringify(t516, null, 2),
              "",
              `Instead, you need to use the '&.${e1110}' syntax:`,
              JSON.stringify({
                root: {
                  [`&.${e1110}`]: i42
                }
              }, null, 2),
              "",
              "https://mui.com/r/state-classes-guide"
            ].join("\n"));
          }
          t516[r415] = {};
        }
      }
    };
    Object.keys(y39.components).forEach((e122) => {
      const t612 = y39.components[e122].styleOverrides;
      t612 && e122.indexOf("Mui") === 0 && traverse(t612, e122);
    });
  }
  return y39;
}
var s14 = createTheme1();
var rootShouldForwardProp = (r152) => shouldForwardProp(r152) && r152 !== "classes";
var t19 = createStyled({
  defaultTheme: s14,
  rootShouldForwardProp
});
function useThemeProps1({ props: r86, name: s56 }) {
  return useThemeProps({
    props: r86,
    name: s56,
    defaultTheme: s14
  });
}
function _setPrototypeOf(t163, e163) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(t98, e162) {
    t98.__proto__ = e162;
    return t98;
  };
  return _setPrototypeOf(t163, e163);
}
function _inheritsLoose(o77, e164) {
  o77.prototype = Object.create(e164.prototype);
  o77.prototype.constructor = o77;
  _setPrototypeOf(o77, e164);
}
var e12 = L.createContext(null);
var s15 = {
  disabled: false
};
var a17 = true ? s2.oneOfType([
  s2.number,
  s2.shape({
    enter: s2.number,
    exit: s2.number,
    appear: s2.number
  }).isRequired
]) : null;
var u15 = true ? s2.oneOfType([
  s2.string,
  s2.shape({
    enter: s2.string,
    exit: s2.string,
    active: s2.string
  }),
  s2.shape({
    enter: s2.string,
    enterDone: s2.string,
    enterActive: s2.string,
    exit: s2.string,
    exitDone: s2.string,
    exitActive: s2.string
  })
]) : null;
var p13 = "unmounted";
var l11 = "exited";
var c12 = "entering";
var f19 = "entered";
var d15 = "exiting";
var E6 = function(n135) {
  _inheritsLoose(Transition, n135);
  function Transition(t164, e165) {
    var i138;
    i138 = n135.call(this, t164, e165) || this;
    var o144 = e165;
    var r153 = o144 && !o144.isMounting ? t164.enter : t164.appear;
    var s141;
    i138.appearStatus = null;
    if (t164.in) {
      if (r153) {
        s141 = l11;
        i138.appearStatus = c12;
      } else
        s141 = f19;
    } else
      s141 = t164.unmountOnExit || t164.mountOnEnter ? p13 : l11;
    i138.state = {
      status: s141
    };
    i138.nextCallback = null;
    return i138;
  }
  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(t240, e246) {
    var n224 = t240.in;
    return n224 && e246.status === p13 ? {
      status: l11
    } : null;
  };
  var a140 = Transition.prototype;
  a140.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  a140.componentDidUpdate = function componentDidUpdate(t331) {
    var e334 = null;
    if (t331 !== this.props) {
      var n319 = this.state.status;
      this.props.in ? n319 !== c12 && n319 !== f19 && (e334 = c12) : n319 !== c12 && n319 !== f19 || (e334 = d15);
    }
    this.updateStatus(false, e334);
  };
  a140.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  a140.getTimeouts = function getTimeouts() {
    var t421 = this.props.timeout;
    var e428, n419, i224;
    e428 = n419 = i224 = t421;
    if (t421 != null && typeof t421 !== "number") {
      e428 = t421.exit;
      n419 = t421.enter;
      i224 = t421.appear !== void 0 ? t421.appear : n419;
    }
    return {
      exit: e428,
      enter: n419,
      appear: i224
    };
  };
  a140.updateStatus = function updateStatus(t517, e527) {
    t517 === void 0 && (t517 = false);
    if (e527 !== null) {
      this.cancelNextCallback();
      e527 === c12 ? this.performEnter(t517) : this.performExit();
    } else {
      this.props.unmountOnExit && this.state.status === l11 && this.setState({
        status: p13
      });
    }
  };
  a140.performEnter = function performEnter(t613) {
    var e616 = this;
    var n513 = this.props.enter;
    var i311 = this.context ? this.context.isMounting : t613;
    var r228 = this.props.nodeRef ? [
      i311
    ] : [
      c3.findDOMNode(this),
      i311
    ], a223 = r228[0], u131 = r228[1];
    var p124 = this.getTimeouts();
    var l129 = i311 ? p124.appear : p124.enter;
    if (!t613 && !n513 || s15.disabled) {
      this.safeSetState({
        status: f19
      }, function() {
        e616.props.onEntered(a223);
      });
    } else {
      this.props.onEnter(a223, u131);
      this.safeSetState({
        status: c12
      }, function() {
        e616.props.onEntering(a223, u131);
        e616.onTransitionEnd(l129, function() {
          e616.safeSetState({
            status: f19
          }, function() {
            e616.props.onEntered(a223, u131);
          });
        });
      });
    }
  };
  a140.performExit = function performExit() {
    var t710 = this;
    var e711 = this.props.exit;
    var n610 = this.getTimeouts();
    var i43 = this.props.nodeRef ? void 0 : c3.findDOMNode(this);
    if (e711 && !s15.disabled) {
      this.props.onExit(i43);
      this.safeSetState({
        status: d15
      }, function() {
        t710.props.onExiting(i43);
        t710.onTransitionEnd(n610.exit, function() {
          t710.safeSetState({
            status: l11
          }, function() {
            t710.props.onExited(i43);
          });
        });
      });
    } else {
      this.safeSetState({
        status: l11
      }, function() {
        t710.props.onExited(i43);
      });
    }
  };
  a140.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  a140.safeSetState = function safeSetState(t810, e812) {
    e812 = this.setNextCallback(e812);
    this.setState(t810, e812);
  };
  a140.setNextCallback = function setNextCallback(t99) {
    var e911 = this;
    var n71 = true;
    this.nextCallback = function(i51) {
      if (n71) {
        n71 = false;
        e911.nextCallback = null;
        t99(i51);
      }
    };
    this.nextCallback.cancel = function() {
      n71 = false;
    };
    return this.nextCallback;
  };
  a140.onTransitionEnd = function onTransitionEnd(t102, e1011) {
    this.setNextCallback(e1011);
    var n8 = this.props.nodeRef ? this.props.nodeRef.current : c3.findDOMNode(this);
    var i61 = t102 == null && !this.props.addEndListener;
    if (n8 && !i61) {
      if (this.props.addEndListener) {
        var r322 = this.props.nodeRef ? [
          this.nextCallback
        ] : [
          n8,
          this.nextCallback
        ], s223 = r322[0], a312 = r322[1];
        this.props.addEndListener(s223, a312);
      }
      t102 != null && setTimeout(this.nextCallback, t102);
    } else
      setTimeout(this.nextCallback, 0);
  };
  a140.render = function render() {
    var e1111 = this.state.status;
    if (e1111 === p13)
      return null;
    var n9 = this.props, o230 = n9.children, s317 = (n9.in, n9.mountOnEnter, n9.unmountOnExit, n9.appear, n9.enter, n9.exit, n9.timeout, n9.addEndListener, n9.onEnter, n9.onEntering, n9.onEntered, n9.onExit, n9.onExiting, n9.onExited, n9.nodeRef, _objectWithoutPropertiesLoose(n9, [
      "children",
      "in",
      "mountOnEnter",
      "unmountOnExit",
      "appear",
      "enter",
      "exit",
      "timeout",
      "addEndListener",
      "onEnter",
      "onEntering",
      "onEntered",
      "onExit",
      "onExiting",
      "onExited",
      "nodeRef"
    ]));
    return L.createElement(e12.Provider, {
      value: null
    }, typeof o230 === "function" ? o230(e1111, s317) : L.cloneElement(L.Children.only(o230), s317));
  };
  return Transition;
}(L.Component);
E6.contextType = e12;
E6.propTypes = true ? {
  nodeRef: s2.shape({
    current: typeof Element === "undefined" ? s2.any : function(t1112, e1210, i71, o319, r416, s410) {
      var a47 = t1112[e1210];
      return s2.instanceOf(a47 && "ownerDocument" in a47 ? a47.ownerDocument.defaultView.Element : Element)(t1112, e1210, i71, o319, r416, s410);
    }
  }),
  children: s2.oneOfType([
    s2.func.isRequired,
    s2.element.isRequired
  ]).isRequired,
  in: s2.bool,
  mountOnEnter: s2.bool,
  unmountOnExit: s2.bool,
  appear: s2.bool,
  enter: s2.bool,
  exit: s2.bool,
  timeout: function timeout(t1212) {
    var e13 = a17;
    t1212.addEndListener || (e13 = e13.isRequired);
    for (var n10 = arguments.length, i81 = new Array(n10 > 1 ? n10 - 1 : 0), o414 = 1; o414 < n10; o414++) {
      i81[o414 - 1] = arguments[o414];
    }
    return e13.apply(void 0, [
      t1212
    ].concat(i81));
  },
  addEndListener: s2.func,
  onEnter: s2.func,
  onEntering: s2.func,
  onEntered: s2.func,
  onExit: s2.func,
  onExiting: s2.func,
  onExited: s2.func
} : {};
function noop() {
}
E6.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
E6.UNMOUNTED = p13;
E6.EXITED = l11;
E6.ENTERING = c12;
E6.ENTERED = f19;
E6.EXITING = d15;
function hasClass(s57, a48) {
  return s57.classList ? !!a48 && s57.classList.contains(a48) : (" " + (s57.className.baseVal || s57.className) + " ").indexOf(" " + a48 + " ") !== -1;
}
function addClass(a49, l45) {
  a49.classList ? a49.classList.add(l45) : hasClass(a49, l45) || (typeof a49.className === "string" ? a49.className = a49.className + " " + l45 : a49.setAttribute("class", (a49.className && a49.className.baseVal || "") + " " + l45));
}
function replaceClassName(s58, e166) {
  return s58.replace(new RegExp("(^|\\s)" + e166 + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function removeClass(s59, e167) {
  s59.classList ? s59.classList.remove(e167) : typeof s59.className === "string" ? s59.className = replaceClassName(s59.className, e167) : s59.setAttribute("class", replaceClassName(s59.className && s59.className.baseVal || "", e167));
}
function _assertThisInitialized(e168) {
  if (e168 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e168;
}
var l12 = function addClass1(e169, s142) {
  return e169 && s142 && s142.split(" ").forEach(function(s224) {
    return addClass(e169, s224);
  });
};
var m12 = function removeClass1(e247, s318) {
  return e247 && s318 && s318.split(" ").forEach(function(s411) {
    return removeClass(e247, s411);
  });
};
var d16 = function(n136) {
  _inheritsLoose(CSSTransition, n136);
  function CSSTransition() {
    var e335;
    for (var s5 = arguments.length, r154 = new Array(s5), t241 = 0; t241 < s5; t241++) {
      r154[t241] = arguments[t241];
    }
    e335 = n136.call.apply(n136, [
      this
    ].concat(r154)) || this;
    e335.appliedClasses = {
      appear: {},
      enter: {},
      exit: {}
    };
    e335.onEnter = function(s62, r229) {
      var n225 = e335.resolveArguments(s62, r229), t332 = n225[0], o145 = n225[1];
      e335.removeClasses(t332, "exit");
      e335.addClass(t332, o145 ? "appear" : "enter", "base");
      e335.props.onEnter && e335.props.onEnter(s62, r229);
    };
    e335.onEntering = function(s71, r323) {
      var n320 = e335.resolveArguments(s71, r323), t422 = n320[0], o231 = n320[1];
      var a141 = o231 ? "appear" : "enter";
      e335.addClass(t422, a141, "active");
      e335.props.onEntering && e335.props.onEntering(s71, r323);
    };
    e335.onEntered = function(s81, r417) {
      var n420 = e335.resolveArguments(s81, r417), t518 = n420[0], o320 = n420[1];
      var a224 = o320 ? "appear" : "enter";
      e335.removeClasses(t518, a224);
      e335.addClass(t518, a224, "done");
      e335.props.onEntered && e335.props.onEntered(s81, r417);
    };
    e335.onExit = function(s91) {
      var r513 = e335.resolveArguments(s91), n514 = r513[0];
      e335.removeClasses(n514, "appear");
      e335.removeClasses(n514, "enter");
      e335.addClass(n514, "exit", "base");
      e335.props.onExit && e335.props.onExit(s91);
    };
    e335.onExiting = function(s101) {
      var r611 = e335.resolveArguments(s101), n611 = r611[0];
      e335.addClass(n611, "exit", "active");
      e335.props.onExiting && e335.props.onExiting(s101);
    };
    e335.onExited = function(s1110) {
      var r711 = e335.resolveArguments(s1110), n72 = r711[0];
      e335.removeClasses(n72, "exit");
      e335.addClass(n72, "exit", "done");
      e335.props.onExited && e335.props.onExited(s1110);
    };
    e335.resolveArguments = function(s1210, r87) {
      return e335.props.nodeRef ? [
        e335.props.nodeRef.current,
        s1210
      ] : [
        s1210,
        r87
      ];
    };
    e335.getClassNames = function(s1310) {
      var r95 = e335.props.classNames;
      var n8 = typeof r95 === "string";
      var t614 = n8 && r95 ? r95 + "-" : "";
      var o415 = n8 ? "" + t614 + s1310 : r95[s1310];
      var a313 = n8 ? o415 + "-active" : r95[s1310 + "Active"];
      var i139 = n8 ? o415 + "-done" : r95[s1310 + "Done"];
      return {
        baseClassName: o415,
        activeClassName: a313,
        doneClassName: i139
      };
    };
    return e335;
  }
  var t165 = CSSTransition.prototype;
  t165.addClass = function addClass2(e429, s143, r105) {
    var n9 = this.getClassNames(s143)[r105 + "ClassName"];
    var t711 = this.getClassNames("enter"), o510 = t711.doneClassName;
    s143 === "appear" && r105 === "done" && o510 && (n9 += " " + o510);
    r105 === "active" && e429 && e429.scrollTop;
    if (n9) {
      this.appliedClasses[s143][r105] = n9;
      l12(e429, n9);
    }
  };
  t165.removeClasses = function removeClasses(e528, s5) {
    var r1113 = this.appliedClasses[s5], n10 = r1113.base, t811 = r1113.active, o610 = r1113.done;
    this.appliedClasses[s5] = {};
    n10 && m12(e528, n10);
    t811 && m12(e528, t811);
    o610 && m12(e528, o610);
  };
  t165.render = function render() {
    var r1210 = this.props, n11 = (r1210.classNames, _objectWithoutPropertiesLoose(r1210, [
      "classNames"
    ]));
    return L.createElement(E6, _extends({}, n11, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  };
  return CSSTransition;
}(L.Component);
d16.defaultProps = {
  classNames: ""
};
d16.propTypes = true ? _extends({}, E6.propTypes, {
  classNames: u15,
  onEnter: s2.func,
  onEntering: s2.func,
  onEntered: s2.func,
  onExit: s2.func,
  onExiting: s2.func,
  onExited: s2.func
}) : {};
function getChildMapping(e170, t166) {
  var n137 = function mapper(e248) {
    return t166 && E(e248) ? t166(e248) : e248;
  };
  var r155 = /* @__PURE__ */ Object.create(null);
  e170 && b.map(e170, function(e336) {
    return e336;
  }).forEach(function(e430) {
    r155[e430.key] = n137(e430);
  });
  return r155;
}
function mergeChildMappings(e529, t242) {
  e529 = e529 || {};
  t242 = t242 || {};
  function getValueForKey(n321) {
    return n321 in t242 ? t242[n321] : e529[n321];
  }
  var n226 = /* @__PURE__ */ Object.create(null);
  var r230 = [];
  for (var i140 in e529) {
    if (i140 in t242) {
      if (r230.length) {
        n226[i140] = r230;
        r230 = [];
      }
    } else
      r230.push(i140);
  }
  var o146;
  var a142 = {};
  for (var p125 in t242) {
    if (n226[p125]) {
      for (o146 = 0; o146 < n226[p125].length; o146++) {
        var l130 = n226[p125][o146];
        a142[n226[p125][o146]] = getValueForKey(l130);
      }
    }
    a142[p125] = getValueForKey(p125);
  }
  for (o146 = 0; o146 < r230.length; o146++) {
    a142[r230[o146]] = getValueForKey(r230[o146]);
  }
  return a142;
}
function getProp(e617, t, n421) {
  return n421[t] != null ? n421[t] : e617.props[t];
}
function getInitialChildMapping(e712, t333) {
  return getChildMapping(e712.children, function(n515) {
    return I(n515, {
      onExited: t333.bind(null, n515),
      in: true,
      appear: getProp(n515, "appear", e712),
      enter: getProp(n515, "enter", e712),
      exit: getProp(n515, "exit", e712)
    });
  });
}
function getNextChildMapping(e813, t423, n612) {
  var r324 = getChildMapping(e813.children);
  var i225 = mergeChildMappings(t423, r324);
  Object.keys(i225).forEach(function(o232) {
    var p213 = i225[o232];
    if (E(p213)) {
      var u132 = o232 in t423;
      var c130 = o232 in r324;
      var s144 = t423[o232];
      var d126 = E(s144) && !s144.props.in;
      !c130 || u132 && !d126 ? c130 || !u132 || d126 ? c130 && u132 && E(s144) && (i225[o232] = I(p213, {
        onExited: n612.bind(null, p213),
        in: s144.props.in,
        exit: getProp(p213, "exit", e813),
        enter: getProp(p213, "enter", e813)
      })) : i225[o232] = I(p213, {
        in: false
      }) : i225[o232] = I(p213, {
        onExited: n612.bind(null, p213),
        in: true,
        exit: getProp(p213, "exit", e813),
        enter: getProp(p213, "enter", e813)
      });
    }
  });
  return i225;
}
var c13 = Object.values || function(e912) {
  return Object.keys(e912).map(function(t) {
    return e912[t];
  });
};
var s16 = {
  component: "div",
  childFactory: function childFactory(e1012) {
    return e1012;
  }
};
var d17 = function(i312) {
  _inheritsLoose(TransitionGroup, i312);
  function TransitionGroup(e1112, t519) {
    var r418;
    r418 = i312.call(this, e1112, t519) || this;
    var o321 = r418.handleExited.bind(_assertThisInitialized(r418));
    r418.state = {
      contextValue: {
        isMounting: true
      },
      handleExited: o321,
      firstRender: true
    };
    return r418;
  }
  var a225 = TransitionGroup.prototype;
  a225.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };
  a225.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };
  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(e1211, t615) {
    var n73 = t615.children, r514 = t615.handleExited, i44 = t615.firstRender;
    return {
      children: i44 ? getInitialChildMapping(e1211, r514) : getNextChildMapping(e1211, n73, r514),
      firstRender: false
    };
  };
  a225.handleExited = function handleExited(e13, n8) {
    var r612 = getChildMapping(this.props.children);
    if (!(e13.key in r612)) {
      e13.props.onExited && e13.props.onExited(n8);
      this.mounted && this.setState(function(n9) {
        var r712 = _extends({}, n9.children);
        delete r712[e13.key];
        return {
          children: r712
        };
      });
    }
  };
  a225.render = function render() {
    var t712 = this.props, n10 = t712.component, r88 = t712.childFactory, i52 = _objectWithoutPropertiesLoose(t712, [
      "component",
      "childFactory"
    ]);
    var a314 = this.state.contextValue;
    var p38 = c13(this.state.children).map(r88);
    delete i52.appear;
    delete i52.enter;
    delete i52.exit;
    return n10 === null ? L.createElement(e12.Provider, {
      value: a314
    }, p38) : L.createElement(e12.Provider, {
      value: a314
    }, L.createElement(n10, i52, p38));
  };
  return TransitionGroup;
}(L.Component);
d17.propTypes = true ? {
  component: s2.any,
  children: s2.node,
  appear: s2.bool,
  enter: s2.bool,
  exit: s2.bool,
  childFactory: s2.func
} : {};
d17.defaultProps = s16;
var l13 = function(r156) {
  _inheritsLoose(ReplaceTransition, r156);
  function ReplaceTransition() {
    var e171;
    for (var n138 = arguments.length, t167 = new Array(n138), i141 = 0; i141 < n138; i141++) {
      t167[i141] = arguments[i141];
    }
    e171 = r156.call.apply(r156, [
      this
    ].concat(t167)) || this;
    e171.handleEnter = function() {
      for (var n227 = arguments.length, r231 = new Array(n227), t243 = 0; t243 < n227; t243++) {
        r231[t243] = arguments[t243];
      }
      return e171.handleLifecycle("onEnter", 0, r231);
    };
    e171.handleEntering = function() {
      for (var n322 = arguments.length, r325 = new Array(n322), t334 = 0; t334 < n322; t334++) {
        r325[t334] = arguments[t334];
      }
      return e171.handleLifecycle("onEntering", 0, r325);
    };
    e171.handleEntered = function() {
      for (var n422 = arguments.length, r419 = new Array(n422), t424 = 0; t424 < n422; t424++) {
        r419[t424] = arguments[t424];
      }
      return e171.handleLifecycle("onEntered", 0, r419);
    };
    e171.handleExit = function() {
      for (var n516 = arguments.length, r515 = new Array(n516), t520 = 0; t520 < n516; t520++) {
        r515[t520] = arguments[t520];
      }
      return e171.handleLifecycle("onExit", 1, r515);
    };
    e171.handleExiting = function() {
      for (var n613 = arguments.length, r613 = new Array(n613), t616 = 0; t616 < n613; t616++) {
        r613[t616] = arguments[t616];
      }
      return e171.handleLifecycle("onExiting", 1, r613);
    };
    e171.handleExited = function() {
      for (var n74 = arguments.length, r713 = new Array(n74), t713 = 0; t713 < n74; t713++) {
        r713[t713] = arguments[t713];
      }
      return e171.handleLifecycle("onExited", 1, r713);
    };
    return e171;
  }
  var l131 = ReplaceTransition.prototype;
  l131.handleLifecycle = function handleLifecycle(e5, n8, r89) {
    var o147;
    var l218 = this.props.children;
    var a50 = L.Children.toArray(l218)[n8];
    a50.props[e5] && (o147 = a50.props)[e5].apply(o147, r89);
    if (this.props[e5]) {
      var d38 = a50.props.nodeRef ? void 0 : c3.findDOMNode(this);
      this.props[e5](d38);
    }
  };
  l131.render = function render() {
    var n8 = this.props, r96 = n8.children, i226 = n8.in, l310 = _objectWithoutPropertiesLoose(n8, [
      "children",
      "in"
    ]);
    var a53 = L.Children.toArray(r96), d39 = a53[0], h36 = a53[1];
    delete l310.onEnter;
    delete l310.onEntering;
    delete l310.onEntered;
    delete l310.onExit;
    delete l310.onExiting;
    delete l310.onExited;
    return L.createElement(d17, l310, i226 ? L.cloneElement(d39, {
      key: "first",
      onEnter: this.handleEnter,
      onEntering: this.handleEntering,
      onEntered: this.handleEntered
    }) : L.cloneElement(h36, {
      key: "second",
      onEnter: this.handleExit,
      onEntering: this.handleExiting,
      onEntered: this.handleExited
    }));
  };
  return ReplaceTransition;
}(L.Component);
l13.propTypes = true ? {
  in: s2.bool.isRequired,
  children: function children(e249, n9) {
    return L.Children.count(e249[n9]) !== 2 ? new Error('"' + n9 + '" must be exactly two transition components.') : null;
  }
} : {};
var s17;
var u16;
function areChildrenDifferent(e172, n139) {
  return e172 !== n139 && (!L.isValidElement(e172) || !L.isValidElement(n139) || e172.key == null || e172.key !== n139.key);
}
var l14 = {
  out: "out-in",
  in: "in-out"
};
var p14 = function callHook(e250, t, n228) {
  return function() {
    var r157;
    e250.props[t] && (r157 = e250.props)[t].apply(r157, arguments);
    n228();
  };
};
var m13 = (s17 = {}, s17[l14.out] = function(e337) {
  var n323 = e337.current, o148 = e337.changeState;
  return L.cloneElement(n323, {
    in: false,
    onExited: p14(n323, "onExited", function() {
      o148(c12, null);
    })
  });
}, s17[l14.in] = function(e431) {
  var n423 = e431.current, o233 = e431.changeState, i142 = e431.children;
  return [
    n423,
    L.cloneElement(i142, {
      in: true,
      onEntered: p14(i142, "onEntered", function() {
        o233(c12);
      })
    })
  ];
}, s17);
var d18 = (u16 = {}, u16[l14.out] = function(e530) {
  var n517 = e530.children, r232 = e530.changeState;
  return L.cloneElement(n517, {
    in: true,
    onEntered: p14(n517, "onEntered", function() {
      r232(f19, L.cloneElement(n517, {
        in: true
      }));
    })
  });
}, u16[l14.in] = function(e618) {
  var n614 = e618.current, r326 = e618.children, i227 = e618.changeState;
  return [
    L.cloneElement(n614, {
      in: false,
      onExited: p14(n614, "onExited", function() {
        i227(f19, L.cloneElement(r326, {
          in: true
        }));
      })
    }),
    L.cloneElement(r326, {
      in: true
    })
  ];
}, u16);
var f20 = function(n75) {
  _inheritsLoose(SwitchTransition, n75);
  function SwitchTransition() {
    var e713;
    for (var t168 = arguments.length, r420 = new Array(t168), i313 = 0; i313 < t168; i313++) {
      r420[i313] = arguments[i313];
    }
    e713 = n75.call.apply(n75, [
      this
    ].concat(r420)) || this;
    e713.state = {
      status: f19,
      current: null
    };
    e713.appeared = false;
    e713.changeState = function(t244, n8) {
      n8 === void 0 && (n8 = e713.state.current);
      e713.setState({
        status: t244,
        current: n8
      });
    };
    return e713;
  }
  var s145 = SwitchTransition.prototype;
  s145.componentDidMount = function componentDidMount() {
    this.appeared = true;
  };
  SwitchTransition.getDerivedStateFromProps = function getDerivedStateFromProps(e814, n9) {
    return e814.children == null ? {
      current: null
    } : n9.status === c12 && e814.mode === l14.in ? {
      status: c12
    } : n9.current && areChildrenDifferent(n9.current, e814.children) ? {
      status: d15
    } : {
      current: L.cloneElement(e814.children, {
        in: true
      })
    };
  };
  s145.render = function render() {
    var e913 = this.props, n10 = e913.children, s5 = e913.mode, u133 = this.state, c37 = u133.status, l132 = u133.current;
    var p126 = {
      children: n10,
      current: l132,
      changeState: this.changeState,
      status: c37
    };
    var f129;
    switch (c37) {
      case c12:
        f129 = d18[s5](p126);
        break;
      case d15:
        f129 = m13[s5](p126);
        break;
      case f19:
        f129 = l132;
    }
    return L.createElement(e12.Provider, {
      value: {
        isMounting: !this.appeared
      }
    }, f129);
  };
  return SwitchTransition;
}(L.Component);
f20.propTypes = true ? {
  mode: s2.oneOf([
    l14.in,
    l14.out
  ]),
  children: s2.oneOfType([
    s2.element.isRequired
  ])
} : {};
f20.defaultProps = {
  mode: l14.out
};
function Ripple(e173) {
  const {
    className: t169,
    classes: n140,
    pulsate: r158 = false,
    rippleX: i143,
    rippleY: l133,
    rippleSize: c131,
    in: u134,
    onExited: a143,
    timeout: p127
  } = e173;
  const [f130, d127] = s1(false);
  const m124 = clsx_m(t169, n140.ripple, n140.rippleVisible, r158 && n140.ripplePulsate);
  const b120 = {
    width: c131,
    height: c131,
    top: -c131 / 2 + l133,
    left: -c131 / 2 + i143
  };
  const R110 = clsx_m(n140.child, f130 && n140.childLeaving, r158 && n140.childPulsate);
  u134 || f130 || d127(true);
  p1(() => {
    if (!u134 && a143 != null) {
      const e251 = setTimeout(a143, p127);
      return () => {
        clearTimeout(e251);
      };
    }
  }, [
    a143,
    u134,
    p127
  ]);
  return p4("span", {
    className: m124,
    style: b120,
    children: p4("span", {
      className: R110
    })
  });
}
true ? Ripple.propTypes = {
  classes: s2.object.isRequired,
  className: s2.string,
  in: s2.bool,
  onExited: s2.func,
  pulsate: s2.bool,
  rippleSize: s2.number,
  rippleX: s2.number,
  rippleY: s2.number,
  timeout: s2.number.isRequired
} : void 0;
var y11 = generateUtilityClasses("MuiTouchRipple", [
  "root",
  "ripple",
  "rippleVisible",
  "ripplePulsate",
  "child",
  "childLeaving",
  "childPulsate"
]);
var T3 = [
  "center",
  "classes",
  "className"
];
var v11;
var M3;
var C6;
var j5;
var _6 = (e432) => e432;
var k5 = 80;
var B2 = m(v11 || (v11 = _6`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`));
var E7 = m(M3 || (M3 = _6`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`));
var N3 = m(C6 || (C6 = _6`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`));
var V3 = t19("span", {
  name: "MuiTouchRipple",
  slot: "Root",
  skipSx: true
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
});
var P3 = t19(Ripple, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(j5 || (j5 = _6`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), y11.rippleVisible, B2, 550, ({ theme: e531 }) => e531.transitions.easing.easeInOut, y11.ripplePulsate, ({ theme: e619 }) => e619.transitions.duration.shorter, y11.child, y11.childLeaving, E7, 550, ({ theme: e714 }) => e714.transitions.easing.easeInOut, y11.childPulsate, N3, ({ theme: e815 }) => e815.transitions.easing.easeInOut);
var D3 = l1(function TouchRipple(n229, r233) {
  const i228 = useThemeProps1({
    props: n229,
    name: "MuiTouchRipple"
  });
  const { center: l219 = false, classes: c215 = {}, className: u216 } = i228, a226 = _objectWithoutPropertiesLoose(i228, T3);
  const [p214, m214] = s1([]);
  const b211 = c1(0);
  const R21 = c1(null);
  p1(() => {
    if (R21.current) {
      R21.current();
      R21.current = null;
    }
  }, [
    p214
  ]);
  const g115 = c1(false);
  const v116 = c1(null);
  const M16 = c1(null);
  const C110 = c1(null);
  p1(() => () => {
    clearTimeout(v116.current);
  }, []);
  const j110 = u((e914) => {
    const {
      pulsate: t245,
      rippleX: o149,
      rippleY: n324,
      rippleSize: r327,
      cb: i314
    } = e914;
    m214((e1013) => [
      ...e1013,
      p4(P3, {
        classes: {
          ripple: clsx_m(c215.ripple, y11.ripple),
          rippleVisible: clsx_m(c215.rippleVisible, y11.rippleVisible),
          ripplePulsate: clsx_m(c215.ripplePulsate, y11.ripplePulsate),
          child: clsx_m(c215.child, y11.child),
          childLeaving: clsx_m(c215.childLeaving, y11.childLeaving),
          childPulsate: clsx_m(c215.childPulsate, y11.childPulsate)
        },
        timeout: 550,
        pulsate: t245,
        rippleX: o149,
        rippleY: n324,
        rippleSize: r327
      }, b211.current)
    ]);
    b211.current += 1;
    R21.current = i314;
  }, [
    c215
  ]);
  const B15 = u((e1113 = {}, t335 = {}, o322) => {
    const {
      pulsate: n424 = false,
      center: s146 = l219 || t335.pulsate,
      fakeElement: r421 = false
    } = t335;
    if (e1113.type === "mousedown" && g115.current) {
      g115.current = false;
      return;
    }
    e1113.type === "touchstart" && (g115.current = true);
    const i45 = r421 ? null : C110.current;
    const c38 = i45 ? i45.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let u36;
    let a315;
    let p39;
    if (s146 || e1113.clientX === 0 && e1113.clientY === 0 || !e1113.clientX && !e1113.touches) {
      u36 = Math.round(c38.width / 2);
      a315 = Math.round(c38.height / 2);
    } else {
      const { clientX: t425, clientY: o234 } = e1113.touches ? e1113.touches[0] : e1113;
      u36 = Math.round(t425 - c38.left);
      a315 = Math.round(o234 - c38.top);
    }
    if (s146) {
      p39 = Math.sqrt((2 * c38.width ** 2 + c38.height ** 2) / 3);
      p39 % 2 === 0 && (p39 += 1);
    } else {
      const e1212 = 2 * Math.max(Math.abs((i45 ? i45.clientWidth : 0) - u36), u36) + 2;
      const t521 = 2 * Math.max(Math.abs((i45 ? i45.clientHeight : 0) - a315), a315) + 2;
      p39 = Math.sqrt(e1212 ** 2 + t521 ** 2);
    }
    if (e1113.touches) {
      if (M16.current === null) {
        M16.current = () => {
          j110({
            pulsate: n424,
            rippleX: u36,
            rippleY: a315,
            rippleSize: p39,
            cb: o322
          });
        };
        v116.current = setTimeout(() => {
          if (M16.current) {
            M16.current();
            M16.current = null;
          }
        }, k5);
      }
    } else {
      j110({
        pulsate: n424,
        rippleX: u36,
        rippleY: a315,
        rippleSize: p39,
        cb: o322
      });
    }
  }, [
    l219,
    j110
  ]);
  const E110 = u(() => {
    B15({}, {
      pulsate: true
    });
  }, [
    B15
  ]);
  const N110 = u((e13, t617) => {
    clearTimeout(v116.current);
    if (e13.type === "touchend" && M16.current) {
      M16.current();
      M16.current = null;
      v116.current = setTimeout(() => {
        N110(e13, t617);
      });
    } else {
      M16.current = null;
      m214((e14) => e14.length > 0 ? e14.slice(1) : e14);
      R21.current = t617;
    }
  }, []);
  w(r233, () => ({
    pulsate: E110,
    start: B15,
    stop: N110
  }), [
    E110,
    B15,
    N110
  ]);
  return p4(V3, _extends({
    className: clsx_m(c215.root, y11.root, u216),
    ref: C110
  }, a226, {
    children: p4(d17, {
      component: null,
      exit: true,
      children: p214
    })
  }));
});
true ? D3.propTypes = {
  center: s2.bool,
  classes: s2.object,
  className: s2.string
} : void 0;
function getButtonBaseUtilityClass(e15) {
  return generateUtilityClass("MuiButtonBase", e15);
}
var w7 = generateUtilityClasses("MuiButtonBase", [
  "root",
  "disabled",
  "focusVisible"
]);
var S3 = [
  "action",
  "centerRipple",
  "children",
  "className",
  "component",
  "disabled",
  "disableRipple",
  "disableTouchRipple",
  "focusRipple",
  "focusVisibleClassName",
  "LinkComponent",
  "onBlur",
  "onClick",
  "onContextMenu",
  "onDragLeave",
  "onFocus",
  "onFocusVisible",
  "onKeyDown",
  "onKeyUp",
  "onMouseDown",
  "onMouseLeave",
  "onMouseUp",
  "onTouchEnd",
  "onTouchMove",
  "onTouchStart",
  "tabIndex",
  "TouchRippleProps",
  "type"
];
var useUtilityClasses9 = (e16) => {
  const {
    disabled: t714,
    focusVisible: o416,
    focusVisibleClassName: n518,
    classes: s225
  } = e16;
  const r516 = {
    root: [
      "root",
      t714 && "disabled",
      o416 && "focusVisible"
    ]
  };
  const i53 = composeClasses(r516, getButtonBaseUtilityClass, s225);
  o416 && n518 && (i53.root += ` ${n518}`);
  return i53;
};
var L3 = t19("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (e5, t812) => t812.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  textDecoration: "none",
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
  },
  [`&.${w7.disabled}`]: {
    pointerEvents: "none",
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
});
var $3 = l1(function ButtonBase(n615, c42) {
  const u43 = useThemeProps1({
    props: n615,
    name: "MuiButtonBase"
  });
  const {
    action: a410,
    centerRipple: p42 = false,
    children: d213,
    className: m32,
    component: R31 = "button",
    disabled: g210 = false,
    disableRipple: y116 = false,
    disableTouchRipple: T110 = false,
    focusRipple: v212 = false,
    LinkComponent: M21 = "a",
    onBlur: C25,
    onClick: j21,
    onContextMenu: x111,
    onDragLeave: k17,
    onFocus: B21,
    onFocusVisible: E25,
    onKeyDown: N26,
    onKeyUp: V17,
    onMouseDown: P11,
    onMouseLeave: w113,
    onMouseUp: $12,
    onTouchEnd: H8,
    onTouchMove: U16,
    onTouchStart: I12,
    tabIndex: O19 = 0,
    TouchRippleProps: z13,
    type: F17
  } = u43, X8 = _objectWithoutPropertiesLoose(u43, S3);
  const K6 = c1(null);
  const Y6 = c1(null);
  const { isFocusVisibleRef: A12, onFocus: q13, onBlur: W11, ref: G9 } = useIsFocusVisible();
  const [J5, Q7] = s1(false);
  g210 && J5 && Q7(false);
  w(a410, () => ({
    focusVisible: () => {
      Q7(true);
      K6.current.focus();
    }
  }), []);
  p1(() => {
    J5 && v212 && !y116 && Y6.current.pulsate();
  }, [
    y116,
    v212,
    J5
  ]);
  function useRippleHandler(e5, t910, o511 = T110) {
    return useEventCallback((n76) => {
      t910 && t910(n76);
      const s319 = o511;
      !s319 && Y6.current && Y6.current[e5](n76);
      return true;
    });
  }
  const Z7 = useRippleHandler("start", P11);
  const ee4 = useRippleHandler("stop", x111);
  const te4 = useRippleHandler("stop", k17);
  const oe2 = useRippleHandler("stop", $12);
  const ne2 = useRippleHandler("stop", (e17) => {
    J5 && e17.preventDefault();
    w113 && w113(e17);
  });
  const se2 = useRippleHandler("start", I12);
  const re = useRippleHandler("stop", H8);
  const ie = useRippleHandler("stop", U16);
  const le2 = useRippleHandler("stop", (e18) => {
    W11(e18);
    A12.current === false && Q7(false);
    C25 && C25(e18);
  }, false);
  const ce = useEventCallback((e19) => {
    K6.current || (K6.current = e19.currentTarget);
    q13(e19);
    if (A12.current === true) {
      Q7(true);
      E25 && E25(e19);
    }
    B21 && B21(e19);
  });
  const isNonNativeButton = () => {
    const e20 = K6.current;
    return R31 && R31 !== "button" && !(e20.tagName === "A" && e20.href);
  };
  const ue2 = c1(false);
  const ae = useEventCallback((e21) => {
    if (v212 && !ue2.current && J5 && Y6.current && e21.key === " ") {
      ue2.current = true;
      Y6.current.stop(e21, () => {
        Y6.current.start(e21);
      });
    }
    e21.target === e21.currentTarget && isNonNativeButton() && e21.key === " " && e21.preventDefault();
    N26 && N26(e21);
    if (e21.target === e21.currentTarget && isNonNativeButton() && e21.key === "Enter" && !g210) {
      e21.preventDefault();
      j21 && j21(e21);
    }
  });
  const pe2 = useEventCallback((e22) => {
    if (v212 && e22.key === " " && Y6.current && J5 && !e22.defaultPrevented) {
      ue2.current = false;
      Y6.current.stop(e22, () => {
        Y6.current.pulsate(e22);
      });
    }
    V17 && V17(e22);
    j21 && e22.target === e22.currentTarget && isNonNativeButton() && e22.key === " " && !e22.defaultPrevented && j21(e22);
  });
  let fe = R31;
  fe === "button" && (X8.href || X8.to) && (fe = M21);
  const de2 = {};
  if (fe === "button") {
    de2.type = F17 === void 0 ? "button" : F17;
    de2.disabled = g210;
  } else {
    X8.href || X8.to || (de2.role = "button");
    g210 && (de2["aria-disabled"] = g210);
  }
  const me2 = useForkRef(G9, K6);
  const he2 = useForkRef(c42, me2);
  const [be22, Re] = s1(false);
  p1(() => {
    Re(true);
  }, []);
  const ge2 = be22 && !y116 && !g210;
  p1(() => {
    ge2 && !Y6.current && console.error([
      "MUI: The `component` prop provided to ButtonBase is invalid.",
      "Please make sure the children prop is rendered in this custom component."
    ].join("\n"));
  }, [
    ge2
  ]);
  const ye = _extends({}, u43, {
    centerRipple: p42,
    component: R31,
    disabled: g210,
    disableRipple: y116,
    disableTouchRipple: T110,
    focusRipple: v212,
    tabIndex: O19,
    focusVisible: J5
  });
  const Te = useUtilityClasses9(ye);
  return y3(L3, _extends({
    as: fe,
    className: clsx_m(Te.root, m32),
    ownerState: ye,
    onBlur: le2,
    onClick: j21,
    onContextMenu: ee4,
    onFocus: ce,
    onKeyDown: ae,
    onKeyUp: pe2,
    onMouseDown: Z7,
    onMouseLeave: ne2,
    onMouseUp: oe2,
    onDragLeave: te4,
    onTouchEnd: re,
    onTouchMove: ie,
    onTouchStart: se2,
    ref: he2,
    tabIndex: g210 ? -1 : O19,
    type: F17
  }, de2, X8, {
    children: [
      d213,
      ge2 ? p4(D3, _extends({
        ref: Y6,
        center: p42
      }, z13)) : null
    ]
  }));
});
true ? $3.propTypes = {
  action: a4,
  centerRipple: s2.bool,
  children: s2.node,
  classes: s2.object,
  className: s2.string,
  component: u2,
  disabled: s2.bool,
  disableRipple: s2.bool,
  disableTouchRipple: s2.bool,
  focusRipple: s2.bool,
  focusVisibleClassName: s2.string,
  href: s2.any,
  LinkComponent: s2.elementType,
  onBlur: s2.func,
  onClick: s2.func,
  onContextMenu: s2.func,
  onDragLeave: s2.func,
  onFocus: s2.func,
  onFocusVisible: s2.func,
  onKeyDown: s2.func,
  onKeyUp: s2.func,
  onMouseDown: s2.func,
  onMouseLeave: s2.func,
  onMouseUp: s2.func,
  onTouchEnd: s2.func,
  onTouchMove: s2.func,
  onTouchStart: s2.func,
  sx: s2.oneOfType([
    s2.arrayOf(s2.oneOfType([
      s2.func,
      s2.object,
      s2.bool
    ])),
    s2.func,
    s2.object
  ]),
  tabIndex: s2.number,
  TouchRippleProps: s2.object,
  type: s2.oneOfType([
    s2.oneOf([
      "button",
      "reset",
      "submit"
    ]),
    s2.string
  ])
} : void 0;
function getFabUtilityClass(o150) {
  return generateUtilityClass("MuiFab", o150);
}
var u17 = generateUtilityClasses("MuiFab", [
  "root",
  "primary",
  "secondary",
  "extended",
  "circular",
  "focusVisible",
  "disabled",
  "colorInherit",
  "sizeSmall",
  "sizeMedium",
  "sizeLarge"
]);
var b14 = [
  "children",
  "className",
  "color",
  "component",
  "disabled",
  "disableFocusRipple",
  "focusVisibleClassName",
  "size",
  "variant"
];
var useUtilityClasses10 = (o235) => {
  const { color: e174, variant: r159, classes: t170, size: i144 } = o235;
  const a144 = {
    root: [
      "root",
      r159,
      `size${capitalize(i144)}`,
      e174 === "inherit" && "colorInherit",
      e174 === "primary" && "primary",
      e174 === "secondary" && "secondary"
    ]
  };
  return composeClasses(a144, getFabUtilityClass, t170);
};
var h13 = t19($3, {
  name: "MuiFab",
  slot: "Root",
  overridesResolver: (o323, e252) => {
    const { ownerState: r234 } = o323;
    return [
      e252.root,
      e252[r234.variant],
      e252[`size${capitalize(r234.size)}`],
      r234.color === "inherit" && e252.colorInherit,
      r234.color === "primary" && e252.primary,
      r234.color === "secondary" && e252.secondary
    ];
  }
})(({ theme: o417, ownerState: r328 }) => _extends({}, o417.typography.button, {
  minHeight: 36,
  transition: o417.transitions.create([
    "background-color",
    "box-shadow",
    "border-color"
  ], {
    duration: o417.transitions.duration.short
  }),
  borderRadius: "50%",
  padding: 0,
  minWidth: 0,
  width: 56,
  height: 56,
  boxShadow: o417.shadows[6],
  "&:active": {
    boxShadow: o417.shadows[12]
  },
  color: o417.palette.getContrastText(o417.palette.grey[300]),
  backgroundColor: o417.palette.grey[300],
  "&:hover": {
    backgroundColor: o417.palette.grey.A100,
    "@media (hover: none)": {
      backgroundColor: o417.palette.grey[300]
    },
    textDecoration: "none"
  },
  [`&.${u17.focusVisible}`]: {
    boxShadow: o417.shadows[6]
  },
  [`&.${u17.disabled}`]: {
    color: o417.palette.action.disabled,
    boxShadow: o417.shadows[0],
    backgroundColor: o417.palette.action.disabledBackground
  }
}, r328.size === "small" && {
  width: 40,
  height: 40
}, r328.size === "medium" && {
  width: 48,
  height: 48
}, r328.variant === "extended" && {
  borderRadius: 24,
  padding: "0 16px",
  width: "auto",
  minHeight: "auto",
  minWidth: 48,
  height: 48
}, r328.variant === "extended" && r328.size === "small" && {
  width: "auto",
  padding: "0 8px",
  borderRadius: 17,
  minWidth: 34,
  height: 34
}, r328.variant === "extended" && r328.size === "medium" && {
  width: "auto",
  padding: "0 16px",
  borderRadius: 20,
  minWidth: 40,
  height: 40
}, r328.color === "inherit" && {
  color: "inherit"
}), ({ theme: o512, ownerState: r422 }) => _extends({}, r422.color === "primary" && {
  color: o512.palette.primary.contrastText,
  backgroundColor: o512.palette.primary.main,
  "&:hover": {
    backgroundColor: o512.palette.primary.dark,
    "@media (hover: none)": {
      backgroundColor: o512.palette.primary.main
    }
  }
}, r422.color === "secondary" && {
  color: o512.palette.secondary.contrastText,
  backgroundColor: o512.palette.secondary.main,
  "&:hover": {
    backgroundColor: o512.palette.secondary.dark,
    "@media (hover: none)": {
      backgroundColor: o512.palette.secondary.main
    }
  }
}));
var y12 = l1(function Fab(r517, t246) {
  const a227 = useThemeProps1({
    props: r517,
    name: "MuiFab"
  });
  const {
    children: s147,
    className: n141,
    color: l134 = "default",
    component: c132 = "button",
    disabled: p128 = false,
    disableFocusRipple: u135 = false,
    focusVisibleClassName: y117,
    size: g44 = "large",
    variant: f44 = "circular"
  } = a227, x28 = _objectWithoutPropertiesLoose(a227, b14);
  const w25 = _extends({}, a227, {
    color: l134,
    component: c132,
    disabled: p128,
    disableFocusRipple: u135,
    size: g44,
    variant: f44
  });
  const v35 = useUtilityClasses10(w25);
  return p4(h13, _extends({
    className: clsx_m(v35.root, n141),
    component: c132,
    disabled: p128,
    focusRipple: !u135,
    focusVisibleClassName: clsx_m(v35.focusVisible, y117),
    ownerState: w25,
    ref: t246
  }, x28, {
    children: s147
  }));
});
true ? y12.propTypes = {
  children: s2.node,
  classes: s2.object,
  className: s2.string,
  color: s2.oneOfType([
    s2.oneOf([
      "default",
      "inherit",
      "primary",
      "secondary"
    ]),
    s2.string
  ]),
  component: s2.elementType,
  disabled: s2.bool,
  disableFocusRipple: s2.bool,
  disableRipple: s2.bool,
  focusVisibleClassName: s2.string,
  href: s2.string,
  size: s2.oneOfType([
    s2.oneOf([
      "small",
      "medium",
      "large"
    ]),
    s2.string
  ]),
  sx: s2.oneOfType([
    s2.arrayOf(s2.oneOfType([
      s2.func,
      s2.object,
      s2.bool
    ])),
    s2.func,
    s2.object
  ]),
  variant: s2.oneOfType([
    s2.oneOf([
      "circular",
      "extended"
    ]),
    s2.string
  ])
} : void 0;
var o9 = t1({});
o9.displayName = "ButtonGroupContext";
function getButtonUtilityClass(e175) {
  return generateUtilityClass("MuiButton", e175);
}
var x8 = generateUtilityClasses("MuiButton", [
  "root",
  "text",
  "textInherit",
  "textPrimary",
  "textSecondary",
  "outlined",
  "outlinedInherit",
  "outlinedPrimary",
  "outlinedSecondary",
  "contained",
  "containedInherit",
  "containedPrimary",
  "containedSecondary",
  "disableElevation",
  "focusVisible",
  "disabled",
  "colorInherit",
  "textSizeSmall",
  "textSizeMedium",
  "textSizeLarge",
  "outlinedSizeSmall",
  "outlinedSizeMedium",
  "outlinedSizeLarge",
  "containedSizeSmall",
  "containedSizeMedium",
  "containedSizeLarge",
  "sizeMedium",
  "sizeSmall",
  "sizeLarge",
  "fullWidth",
  "startIcon",
  "endIcon",
  "iconSizeSmall",
  "iconSizeMedium",
  "iconSizeLarge"
]);
var v12 = [
  "children",
  "color",
  "component",
  "className",
  "disabled",
  "disableElevation",
  "disableFocusRipple",
  "endIcon",
  "focusVisibleClassName",
  "fullWidth",
  "size",
  "startIcon",
  "type",
  "variant"
];
var useUtilityClasses11 = (e253) => {
  const {
    color: t171,
    disableElevation: i145,
    fullWidth: n142,
    size: r160,
    variant: l135,
    classes: s148
  } = e253;
  const c133 = {
    root: [
      "root",
      l135,
      `${l135}${capitalize(t171)}`,
      `size${capitalize(r160)}`,
      `${l135}Size${capitalize(r160)}`,
      t171 === "inherit" && "colorInherit",
      i145 && "disableElevation",
      n142 && "fullWidth"
    ],
    label: [
      "label"
    ],
    startIcon: [
      "startIcon",
      `iconSize${capitalize(r160)}`
    ],
    endIcon: [
      "endIcon",
      `iconSize${capitalize(r160)}`
    ]
  };
  const p129 = composeClasses(c133, getButtonUtilityClass, s148);
  return _extends({}, s148, p129);
};
var commonIconStyles = (e338) => _extends({}, e338.size === "small" && {
  "& > *:nth-of-type(1)": {
    fontSize: 18
  }
}, e338.size === "medium" && {
  "& > *:nth-of-type(1)": {
    fontSize: 20
  }
}, e338.size === "large" && {
  "& > *:nth-of-type(1)": {
    fontSize: 22
  }
});
var y13 = t19($3, {
  shouldForwardProp: (e433) => rootShouldForwardProp(e433) || e433 === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e532, o151) => {
    const { ownerState: t247 } = e532;
    return [
      o151.root,
      o151[t247.variant],
      o151[`${t247.variant}${capitalize(t247.color)}`],
      o151[`size${capitalize(t247.size)}`],
      o151[`${t247.variant}Size${capitalize(t247.size)}`],
      t247.color === "inherit" && o151.colorInherit,
      t247.disableElevation && o151.disableElevation,
      t247.fullWidth && o151.fullWidth
    ];
  }
})(({ theme: e620, ownerState: t336 }) => _extends({}, e620.typography.button, {
  minWidth: 64,
  padding: "6px 16px",
  borderRadius: e620.shape.borderRadius,
  transition: e620.transitions.create([
    "background-color",
    "box-shadow",
    "border-color",
    "color"
  ], {
    duration: e620.transitions.duration.short
  }),
  "&:hover": _extends({
    textDecoration: "none",
    backgroundColor: alpha(e620.palette.text.primary, e620.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, t336.variant === "text" && t336.color !== "inherit" && {
    backgroundColor: alpha(e620.palette[t336.color].main, e620.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, t336.variant === "outlined" && t336.color !== "inherit" && {
    border: `1px solid ${e620.palette[t336.color].main}`,
    backgroundColor: alpha(e620.palette[t336.color].main, e620.palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }, t336.variant === "contained" && {
    backgroundColor: e620.palette.grey.A100,
    boxShadow: e620.shadows[4],
    "@media (hover: none)": {
      boxShadow: e620.shadows[2],
      backgroundColor: e620.palette.grey[300]
    }
  }, t336.variant === "contained" && t336.color !== "inherit" && {
    backgroundColor: e620.palette[t336.color].dark,
    "@media (hover: none)": {
      backgroundColor: e620.palette[t336.color].main
    }
  }),
  "&:active": _extends({}, t336.variant === "contained" && {
    boxShadow: e620.shadows[8]
  }),
  [`&.${x8.focusVisible}`]: _extends({}, t336.variant === "contained" && {
    boxShadow: e620.shadows[6]
  }),
  [`&.${x8.disabled}`]: _extends({
    color: e620.palette.action.disabled
  }, t336.variant === "outlined" && {
    border: `1px solid ${e620.palette.action.disabledBackground}`
  }, t336.variant === "outlined" && t336.color === "secondary" && {
    border: `1px solid ${e620.palette.action.disabled}`
  }, t336.variant === "contained" && {
    color: e620.palette.action.disabled,
    boxShadow: e620.shadows[0],
    backgroundColor: e620.palette.action.disabledBackground
  })
}, t336.variant === "text" && {
  padding: "6px 8px"
}, t336.variant === "text" && t336.color !== "inherit" && {
  color: e620.palette[t336.color].main
}, t336.variant === "outlined" && {
  padding: "5px 15px",
  border: "1px solid " + (e620.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)")
}, t336.variant === "outlined" && t336.color !== "inherit" && {
  color: e620.palette[t336.color].main,
  border: `1px solid ${alpha(e620.palette[t336.color].main, 0.5)}`
}, t336.variant === "contained" && {
  color: e620.palette.getContrastText(e620.palette.grey[300]),
  backgroundColor: e620.palette.grey[300],
  boxShadow: e620.shadows[2]
}, t336.variant === "contained" && t336.color !== "inherit" && {
  color: e620.palette[t336.color].contrastText,
  backgroundColor: e620.palette[t336.color].main
}, t336.color === "inherit" && {
  color: "inherit",
  borderColor: "currentColor"
}, t336.size === "small" && t336.variant === "text" && {
  padding: "4px 5px",
  fontSize: e620.typography.pxToRem(13)
}, t336.size === "large" && t336.variant === "text" && {
  padding: "8px 11px",
  fontSize: e620.typography.pxToRem(15)
}, t336.size === "small" && t336.variant === "outlined" && {
  padding: "3px 9px",
  fontSize: e620.typography.pxToRem(13)
}, t336.size === "large" && t336.variant === "outlined" && {
  padding: "7px 21px",
  fontSize: e620.typography.pxToRem(15)
}, t336.size === "small" && t336.variant === "contained" && {
  padding: "4px 10px",
  fontSize: e620.typography.pxToRem(13)
}, t336.size === "large" && t336.variant === "contained" && {
  padding: "8px 22px",
  fontSize: e620.typography.pxToRem(15)
}, t336.fullWidth && {
  width: "100%"
}), ({ ownerState: e715 }) => e715.disableElevation && {
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none"
  },
  [`&.${x8.focusVisible}`]: {
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none"
  },
  [`&.${x8.disabled}`]: {
    boxShadow: "none"
  }
});
var S4 = t19("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (e816, o236) => {
    const { ownerState: t } = e816;
    return [
      o236.startIcon,
      o236[`iconSize${capitalize(t.size)}`]
    ];
  }
})(({ ownerState: e915 }) => _extends({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4
}, e915.size === "small" && {
  marginLeft: -2
}, commonIconStyles(e915)));
var z4 = t19("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (e1014, o324) => {
    const { ownerState: t } = e1014;
    return [
      o324.endIcon,
      o324[`iconSize${capitalize(t.size)}`]
    ];
  }
})(({ ownerState: e1114 }) => _extends({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8
}, e1114.size === "small" && {
  marginRight: -2
}, commonIconStyles(e1114)));
var w8 = l1(function Button(i229, a145) {
  const l220 = r1(o9);
  const s226 = resolveProps(l220, i229);
  const d128 = useThemeProps1({
    props: s226,
    name: "MuiButton"
  });
  const {
    children: c216,
    color: p215 = "primary",
    component: m125 = "button",
    className: b121,
    disabled: x112 = false,
    disableElevation: w114 = false,
    disableFocusRipple: C26 = false,
    endIcon: I13,
    focusVisibleClassName: R22,
    fullWidth: $8 = false,
    size: k18 = "medium",
    startIcon: T23,
    type: B16,
    variant: O20 = "text"
  } = d128, E26 = _objectWithoutPropertiesLoose(d128, v12);
  const N27 = _extends({}, d128, {
    color: p215,
    component: m125,
    disabled: x112,
    disableElevation: w114,
    disableFocusRipple: C26,
    fullWidth: $8,
    size: k18,
    type: B16,
    variant: O20
  });
  const W12 = useUtilityClasses11(N27);
  const M17 = T23 && p4(S4, {
    className: W12.startIcon,
    ownerState: N27,
    children: T23
  });
  const j20 = I13 && p4(z4, {
    className: W12.endIcon,
    ownerState: N27,
    children: I13
  });
  return y3(y13, _extends({
    ownerState: N27,
    className: clsx_m(b121, l220.className),
    component: m125,
    disabled: x112,
    focusRipple: !C26,
    focusVisibleClassName: clsx_m(W12.focusVisible, R22),
    ref: a145,
    type: B16
  }, E26, {
    classes: W12,
    children: [
      M17,
      c216,
      j20
    ]
  }));
});
true ? w8.propTypes = {
  children: s2.node,
  classes: s2.object,
  className: s2.string,
  color: s2.oneOfType([
    s2.oneOf([
      "inherit",
      "primary",
      "secondary",
      "success",
      "error",
      "info",
      "warning"
    ]),
    s2.string
  ]),
  component: s2.elementType,
  disabled: s2.bool,
  disableElevation: s2.bool,
  disableFocusRipple: s2.bool,
  disableRipple: s2.bool,
  endIcon: s2.node,
  focusVisibleClassName: s2.string,
  fullWidth: s2.bool,
  href: s2.string,
  size: s2.oneOfType([
    s2.oneOf([
      "small",
      "medium",
      "large"
    ]),
    s2.string
  ]),
  startIcon: s2.node,
  sx: s2.oneOfType([
    s2.arrayOf(s2.oneOfType([
      s2.func,
      s2.object,
      s2.bool
    ])),
    s2.func,
    s2.object
  ]),
  type: s2.oneOfType([
    s2.oneOf([
      "button",
      "reset",
      "submit"
    ]),
    s2.string
  ]),
  variant: s2.oneOfType([
    s2.oneOf([
      "contained",
      "outlined",
      "text"
    ]),
    s2.string
  ])
} : void 0;
function getSvgIconUtilityClass(o152) {
  return generateUtilityClass("MuiSvgIcon", o152);
}
generateUtilityClasses("MuiSvgIcon", [
  "root",
  "colorPrimary",
  "colorSecondary",
  "colorAction",
  "colorError",
  "colorDisabled",
  "fontSizeInherit",
  "fontSizeSmall",
  "fontSizeMedium",
  "fontSizeLarge"
]);
var h14 = [
  "children",
  "className",
  "color",
  "component",
  "fontSize",
  "htmlColor",
  "inheritViewBox",
  "titleAccess",
  "viewBox"
];
var useUtilityClasses12 = (o237) => {
  const { color: e176, fontSize: t172, classes: r161 } = o237;
  const i146 = {
    root: [
      "root",
      e176 !== "inherit" && `color${capitalize(e176)}`,
      `fontSize${capitalize(t172)}`
    ]
  };
  return composeClasses(i146, getSvgIconUtilityClass, r161);
};
var u18 = t19("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (o325, e254) => {
    const { ownerState: t248 } = o325;
    return [
      e254.root,
      t248.color !== "inherit" && e254[`color${capitalize(t248.color)}`],
      e254[`fontSize${capitalize(t248.fontSize)}`]
    ];
  }
})(({ theme: o418, ownerState: e5 }) => {
  var t337, r235;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fill: "currentColor",
    flexShrink: 0,
    transition: o418.transitions.create("fill", {
      duration: o418.transitions.duration.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: o418.typography.pxToRem(20),
      medium: o418.typography.pxToRem(24),
      large: o418.typography.pxToRem(35)
    }[e5.fontSize],
    color: (t337 = (r235 = o418.palette[e5.color]) == null ? void 0 : r235.main) != null ? t337 : {
      action: o418.palette.action.active,
      disabled: o418.palette.action.disabled,
      inherit: void 0
    }[e5.color]
  };
});
var g10 = l1(function SvgIcon(t426, r329) {
  const n143 = useThemeProps1({
    props: t426,
    name: "MuiSvgIcon"
  });
  const {
    children: s149,
    className: l136,
    color: a146 = "inherit",
    component: f131 = "svg",
    fontSize: d129 = "medium",
    htmlColor: g116,
    inheritViewBox: S17 = false,
    titleAccess: v36,
    viewBox: y40 = "0 0 24 24"
  } = n143, x29 = _objectWithoutPropertiesLoose(n143, h14);
  const b35 = _extends({}, n143, {
    color: a146,
    component: f131,
    fontSize: d129,
    inheritViewBox: S17,
    viewBox: y40
  });
  const w26 = {};
  S17 || (w26.viewBox = y40);
  const z14 = useUtilityClasses12(b35);
  return y3(u18, _extends({
    as: f131,
    className: clsx_m(z14.root, l136),
    ownerState: b35,
    focusable: "false",
    color: g116,
    "aria-hidden": !v36 || void 0,
    role: v36 ? "img" : void 0,
    ref: r329
  }, w26, x29, {
    children: [
      s149,
      v36 ? p4("title", {
        children: v36
      }) : null
    ]
  }));
});
true ? g10.propTypes = {
  children: s2.node,
  classes: s2.object,
  className: s2.string,
  color: s2.oneOfType([
    s2.oneOf([
      "inherit",
      "action",
      "disabled",
      "primary",
      "secondary",
      "error",
      "info",
      "success",
      "warning"
    ]),
    s2.string
  ]),
  component: s2.elementType,
  fontSize: s2.oneOfType([
    s2.oneOf([
      "inherit",
      "large",
      "medium",
      "small"
    ]),
    s2.string
  ]),
  htmlColor: s2.string,
  inheritViewBox: s2.bool,
  shapeRendering: s2.string,
  sx: s2.oneOfType([
    s2.arrayOf(s2.oneOfType([
      s2.func,
      s2.object,
      s2.bool
    ])),
    s2.func,
    s2.object
  ]),
  titleAccess: s2.string,
  viewBox: s2.string
} : void 0;
g10.muiName = "SvgIcon";
function createSvgIcon(m33, a54) {
  const Component = (r162, i40) => p4(g10, _extends({
    "data-testid": `${a54}Icon`,
    ref: i40
  }, r162, {
    children: m33
  }));
  Component.displayName = `${a54}Icon`;
  Component.muiName = g10.muiName;
  return y(l1(Component));
}
function getToggleButtonUtilityClass(e177) {
  return generateUtilityClass("MuiToggleButton", e177);
}
var f21 = generateUtilityClasses("MuiToggleButton", [
  "root",
  "disabled",
  "selected",
  "standard",
  "primary",
  "secondary",
  "sizeSmall",
  "sizeMedium",
  "sizeLarge"
]);
var b15 = [
  "children",
  "className",
  "color",
  "disabled",
  "disableFocusRipple",
  "fullWidth",
  "onChange",
  "onClick",
  "selected",
  "size",
  "value"
];
var useUtilityClasses13 = (e255) => {
  const {
    classes: o153,
    fullWidth: t173,
    selected: r163,
    disabled: s150,
    size: i147,
    color: l137
  } = e255;
  const n144 = {
    root: [
      "root",
      r163 && "selected",
      s150 && "disabled",
      t173 && "fullWidth",
      `size${capitalize(i147)}`,
      l137
    ]
  };
  return composeClasses(n144, getToggleButtonUtilityClass, o153);
};
var g11 = t19($3, {
  name: "MuiToggleButton",
  slot: "Root",
  overridesResolver: (e339, o238) => {
    const { ownerState: t } = e339;
    return [
      o238.root,
      o238[`size${capitalize(t.size)}`]
    ];
  }
})(({ theme: e434, ownerState: t249 }) => {
  const r236 = t249.color === "standard" ? e434.palette.text.primary : e434.palette[t249.color].main;
  return _extends({}, e434.typography.button, {
    borderRadius: e434.shape.borderRadius,
    padding: 11,
    border: `1px solid ${e434.palette.divider}`,
    color: e434.palette.action.active
  }, t249.fullWidth && {
    width: "100%"
  }, {
    [`&.${f21.disabled}`]: {
      color: e434.palette.action.disabled,
      border: `1px solid ${e434.palette.action.disabledBackground}`
    },
    "&:hover": {
      textDecoration: "none",
      backgroundColor: alpha(e434.palette.text.primary, e434.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    [`&.${f21.selected}`]: {
      color: r236,
      backgroundColor: alpha(r236, e434.palette.action.selectedOpacity),
      "&:hover": {
        backgroundColor: alpha(r236, e434.palette.action.selectedOpacity + e434.palette.action.hoverOpacity),
        "@media (hover: none)": {
          backgroundColor: alpha(r236, e434.palette.action.selectedOpacity)
        }
      }
    }
  }, t249.size === "small" && {
    padding: 7,
    fontSize: e434.typography.pxToRem(13)
  }, t249.size === "large" && {
    padding: 15,
    fontSize: e434.typography.pxToRem(15)
  });
});
var y14 = l1(function ToggleButton(t338, r330) {
  const i230 = useThemeProps1({
    props: t338,
    name: "MuiToggleButton"
  });
  const {
    children: l221,
    className: a147,
    color: n230 = "standard",
    disabled: c134 = false,
    disableFocusRipple: p130 = false,
    fullWidth: u136 = false,
    onChange: f132,
    onClick: y118,
    selected: h37,
    size: j22 = "medium",
    value: v37
  } = i230, C27 = _objectWithoutPropertiesLoose(i230, b15);
  const T24 = _extends({}, i230, {
    color: n230,
    disabled: c134,
    disableFocusRipple: p130,
    fullWidth: u136,
    size: j22
  });
  const z15 = useUtilityClasses13(T24);
  const handleChange = (e533) => {
    if (y118) {
      y118(e533, v37);
      if (e533.defaultPrevented)
        return;
    }
    f132 && f132(e533, v37);
  };
  return p4(g11, _extends({
    className: clsx_m(z15.root, a147),
    disabled: c134,
    focusRipple: !p130,
    ref: r330,
    onClick: handleChange,
    onChange: f132,
    value: v37,
    ownerState: T24,
    "aria-pressed": h37
  }, C27, {
    children: l221
  }));
});
true ? y14.propTypes = {
  children: s2.node,
  classes: s2.object,
  className: s2.string,
  color: s2.oneOfType([
    s2.oneOf([
      "standard",
      "primary",
      "secondary",
      "error",
      "info",
      "success",
      "warning"
    ]),
    s2.string
  ]),
  disabled: s2.bool,
  disableFocusRipple: s2.bool,
  disableRipple: s2.bool,
  fullWidth: s2.bool,
  onChange: s2.func,
  onClick: s2.func,
  selected: s2.bool,
  size: s2.oneOfType([
    s2.oneOf([
      "small",
      "medium",
      "large"
    ]),
    s2.string
  ]),
  sx: s2.oneOfType([
    s2.arrayOf(s2.oneOfType([
      s2.func,
      s2.object,
      s2.bool
    ])),
    s2.func,
    s2.object
  ]),
  value: s2.any.isRequired
} : void 0;
function isValueSelected(o154, e178) {
  return e178 !== void 0 && o154 !== void 0 && (Array.isArray(e178) ? e178.indexOf(o154) >= 0 : o154 === e178);
}
function getToggleButtonGroupUtilityClass(o239) {
  return generateUtilityClass("MuiToggleButtonGroup", o239);
}
var m14 = generateUtilityClasses("MuiToggleButtonGroup", [
  "root",
  "selected",
  "vertical",
  "disabled",
  "grouped",
  "groupedHorizontal",
  "groupedVertical"
]);
var f22 = [
  "children",
  "className",
  "color",
  "disabled",
  "exclusive",
  "fullWidth",
  "onChange",
  "orientation",
  "size",
  "value"
];
var useUtilityClasses14 = (o326) => {
  const { classes: e256, orientation: r164, fullWidth: t174, disabled: s151 } = o326;
  const i148 = {
    root: [
      "root",
      r164 === "vertical" && "vertical",
      t174 && "fullWidth"
    ],
    grouped: [
      "grouped",
      `grouped${capitalize(r164)}`,
      s151 && "disabled"
    ]
  };
  return composeClasses(i148, getToggleButtonGroupUtilityClass, e256);
};
var g12 = t19("div", {
  name: "MuiToggleButtonGroup",
  slot: "Root",
  overridesResolver: (o419, e340) => {
    const { ownerState: r237 } = o419;
    return [
      {
        [`& .${m14.grouped}`]: e340.grouped
      },
      {
        [`& .${m14.grouped}`]: e340[`grouped${capitalize(r237.orientation)}`]
      },
      e340.root,
      r237.orientation === "vertical" && e340.vertical,
      r237.fullWidth && e340.fullWidth
    ];
  }
})(({ ownerState: o513, theme: r331 }) => _extends({
  display: "inline-flex",
  borderRadius: r331.shape.borderRadius
}, o513.orientation === "vertical" && {
  flexDirection: "column"
}, o513.fullWidth && {
  width: "100%"
}, {
  [`& .${m14.grouped}`]: _extends({}, o513.orientation === "horizontal" ? {
    "&:not(:first-of-type)": {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    "&:not(:last-of-type)": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${m14.selected} + .${m14.grouped}.${m14.selected}`]: {
      borderLeft: 0,
      marginLeft: 0
    }
  } : {
    "&:not(:first-of-type)": {
      marginTop: -1,
      borderTop: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    "&:not(:last-of-type)": {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${m14.selected} + .${m14.grouped}.${m14.selected}`]: {
      borderTop: 0,
      marginTop: 0
    }
  })
}));
var b16 = l1(function ToggleButtonGroup(s227, l138) {
  const n145 = useThemeProps1({
    props: s227,
    name: "MuiToggleButtonGroup"
  });
  const {
    children: a148,
    className: d130,
    color: c135 = "standard",
    disabled: m126 = false,
    exclusive: b122 = false,
    fullWidth: h38 = false,
    onChange: y41,
    orientation: v38 = "horizontal",
    size: T25 = "medium",
    value: j23
  } = n145, R23 = _objectWithoutPropertiesLoose(n145, f22);
  const x30 = _extends({}, n145, {
    disabled: m126,
    fullWidth: h38,
    orientation: v38,
    size: T25
  });
  const B17 = useUtilityClasses14(x30);
  const handleChange = (o611, e435) => {
    if (!y41)
      return;
    const r423 = j23 && j23.indexOf(e435);
    let t250;
    if (j23 && r423 >= 0) {
      t250 = j23.slice();
      t250.splice(r423, 1);
    } else {
      t250 = j23 ? j23.concat(e435) : [
        e435
      ];
    }
    y41(o611, t250);
  };
  const handleExclusiveChange = (o78, e534) => {
    y41 && y41(o78, j23 === e534 ? null : e534);
  };
  return p4(g12, _extends({
    role: "group",
    className: clsx_m(B17.root, d130),
    ref: l138,
    ownerState: x30
  }, R23, {
    children: b.map(a148, (o83) => {
      if (!E(o83))
        return null;
      N(o83) && console.error([
        "MUI: The ToggleButtonGroup component doesn't accept a Fragment as a child.",
        "Consider providing an array instead."
      ].join("\n"));
      return I(o83, {
        className: clsx_m(B17.grouped, o83.props.className),
        onChange: b122 ? handleExclusiveChange : handleChange,
        selected: o83.props.selected === void 0 ? isValueSelected(o83.props.value, j23) : o83.props.selected,
        size: o83.props.size || T25,
        fullWidth: h38,
        color: o83.props.color || c135,
        disabled: o83.props.disabled || m126
      });
    })
  }));
});
true ? b16.propTypes = {
  children: s2.node,
  classes: s2.object,
  className: s2.string,
  color: s2.oneOfType([
    s2.oneOf([
      "standard",
      "primary",
      "secondary",
      "error",
      "info",
      "success",
      "warning"
    ]),
    s2.string
  ]),
  disabled: s2.bool,
  exclusive: s2.bool,
  fullWidth: s2.bool,
  onChange: s2.func,
  orientation: s2.oneOf([
    "horizontal",
    "vertical"
  ]),
  size: s2.oneOfType([
    s2.oneOf([
      "small",
      "medium",
      "large"
    ]),
    s2.string
  ]),
  sx: s2.oneOfType([
    s2.arrayOf(s2.oneOfType([
      s2.func,
      s2.object,
      s2.bool
    ])),
    s2.func,
    s2.object
  ]),
  value: s2.any
} : void 0;
var FullscreenIcon = createSvgIcon(a("path", {
  d: "M17 4h5v5h-2V6h-3V4zM4 9V6h3V4H2v5h2zm16 6v3h-3v2h5v-5h-2zM7 18H4v-3H2v5h5v-2zM18 8H6v8h12V8z"
}), "Fullscreen");
var Phone = createSvgIcon(a("path", {
  key: "12",
  d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
}), "PhoneAndroid");
var MyButton = ({ onClick, children: children2 }) => a(w8, {
  variant: "contained",
  color: "primary",
  onClick
}, children2);
var Share = createSvgIcon(a("path", {
  key: "12",
  d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
}), "Share");
var Tablet = createSvgIcon(a("path", {
  key: "12",
  d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
}), "TabletAndroid");
var Tv = createSvgIcon(a("path", {
  key: "12",
  d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
}), "Tv");
var MyFsb = ({ onClick, children: children2 }) => a(y12, {
  variant: "extended",
  color: "primary",
  onClick
}, children2);
var QrCode = createSvgIcon(a("path", {
  key: "12",
  d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
}), "QrCode");

// js/Qr.tsx
import { css, jsx } from "https://unpkg.com/@spike.land/esm@0.5.14/dist/emotion-react.mjs";
import { motion } from "https://unpkg.com/@spike.land/esm@0.5.14/dist/framer-motion.mjs";
import React2 from "https://unpkg.com/@spike.land/esm@0.5.14/dist/react.mjs";

// ../qrious/dist/QRious.mjs
var ve2 = Object.create;
var w9 = Object.defineProperty;
var _e = Object.getOwnPropertyDescriptor;
var be2 = Object.getOwnPropertyNames;
var me = Object.getPrototypeOf;
var pe = Object.prototype.hasOwnProperty;
var ke2 = (t) => w9(t, "__esModule", { value: true });
var o4 = (t, e5) => () => (e5 || t((e5 = { exports: {} }).exports, e5), e5.exports);
var ge = (t, e5, i13, r) => {
  if (e5 && typeof e5 == "object" || typeof e5 == "function")
    for (let x of be2(e5))
      !pe.call(t, x) && (i13 || x !== "default") && w9(t, x, { get: () => e5[x], enumerable: !(r = _e(e5, x)) || r.enumerable });
  return t;
};
var N4 = (t, e5) => ge(ke2(w9(t != null ? ve2(me(t)) : {}, "default", !e5 && t && t.__esModule ? { get: () => t.default, enumerable: true } : { value: t, enumerable: true })), t);
var E8 = o4((c0, A3) => {
  "use strict";
  var B3 = function() {
  }, we = Object.prototype.hasOwnProperty, Be = Array.prototype.slice;
  function Me(t, e5) {
    var i13;
    return typeof Object.create == "function" ? i13 = Object.create(t) : (B3.prototype = t, i13 = new B3(), B3.prototype = null), e5 && y15(true, i13, e5), i13;
  }
  function qe(t, e5, i13, r) {
    var x = this;
    return typeof t != "string" && (r = i13, i13 = e5, e5 = t, t = null), typeof e5 != "function" && (r = i13, i13 = e5, e5 = function() {
      return x.apply(this, arguments);
    }), y15(false, e5, x, r), e5.prototype = Me(x.prototype, i13), e5.prototype.constructor = e5, e5.class_ = t || x.class_, e5.super_ = x, e5;
  }
  function y15(t, e5, i13) {
    i13 = Be.call(arguments, 2);
    for (var r, x, s5 = 0, a18 = i13.length; s5 < a18; s5++) {
      x = i13[s5];
      for (r in x)
        (!t || we.call(x, r)) && (e5[r] = x[r]);
    }
  }
  A3.exports = qe;
});
var C7 = o4((u0, S5) => {
  "use strict";
  var Oe = E8();
  function p() {
  }
  p.class_ = "Nevis";
  p.super_ = Object;
  p.extend = Oe;
  S5.exports = p;
});
var u19 = o4((h0, L4) => {
  "use strict";
  L4.exports = C7();
});
var M4 = o4((d0, R5) => {
  "use strict";
  var Ne = u19(), ye = Ne.extend(function(t, e5, i13) {
    this.qrious = t, this.element = e5, this.element.qrious = t, this.enabled = Boolean(i13);
  }, { draw: function(t) {
  }, getElement: function() {
    return this.enabled || (this.enabled = true, this.render()), this.element;
  }, getModuleSize: function(t) {
    var e5 = this.qrious, i13 = e5.padding || 0, r = Math.floor((e5.size - i13 * 2) / t.width);
    return Math.max(1, r);
  }, getOffset: function(t) {
    var e5 = this.qrious, i13 = e5.padding;
    if (i13 != null)
      return i13;
    var r = this.getModuleSize(t), x = Math.floor((e5.size - r * t.width) / 2);
    return Math.max(0, x);
  }, render: function(t) {
    this.enabled && (this.resize(), this.reset(), this.draw(t));
  }, reset: function() {
  }, resize: function() {
  } });
  R5.exports = ye;
});
var j6 = o4((l0, T4) => {
  "use strict";
  var Ae = M4(), Ee = Ae.extend({ draw: function(t) {
    var e5, i13, r = this.qrious, x = this.getModuleSize(t), s5 = this.getOffset(t), a18 = this.element.getContext("2d");
    for (a18.fillStyle = r.foreground, a18.globalAlpha = r.foregroundAlpha, e5 = 0; e5 < t.width; e5++)
      for (i13 = 0; i13 < t.width; i13++)
        t.buffer[i13 * t.width + e5] && a18.fillRect(x * e5 + s5, x * i13 + s5, x, x);
  }, reset: function() {
    var t = this.qrious, e5 = this.element.getContext("2d"), i13 = t.size;
    e5.lineWidth = 1, e5.clearRect(0, 0, i13, i13), e5.fillStyle = t.background, e5.globalAlpha = t.backgroundAlpha, e5.fillRect(0, 0, i13, i13);
  }, resize: function() {
    var t = this.element;
    t.width = t.height = this.qrious.size;
  } });
  T4.exports = Ee;
});
var I3 = o4((v0, z5) => {
  "use strict";
  var Se = u19(), Ce2 = Se.extend(null, { BLOCK: [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28] });
  z5.exports = Ce2;
});
var V4 = o4((_0, P) => {
  "use strict";
  var Le = u19(), Re = Le.extend(null, { BLOCKS: [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30], FINAL_FORMAT: [30660, 29427, 32170, 30877, 26159, 25368, 27713, 26998, 21522, 20773, 24188, 23371, 17913, 16590, 20375, 19104, 13663, 12392, 16177, 14854, 9396, 8579, 11994, 11245, 5769, 5054, 7399, 6608, 1890, 597, 3340, 2107], LEVELS: { L: 1, M: 2, Q: 3, H: 4 } });
  P.exports = Re;
});
var K2 = o4((b0, G2) => {
  "use strict";
  var Te = u19(), je = Te.extend(null, { EXPONENT: [1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 0], LOG: [255, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175] });
  G2.exports = je;
});
var D4 = o4((m0, U2) => {
  "use strict";
  var ze = u19(), Ie = ze.extend(null, { BLOCK: [3220, 1468, 2713, 1235, 3062, 1890, 2119, 1549, 2344, 2936, 1117, 2583, 1330, 2470, 1667, 2249, 2028, 3780, 481, 4011, 142, 3098, 831, 3445, 592, 2517, 1776, 2234, 1951, 2827, 1070, 2660, 1345, 3177] });
  U2.exports = Ie;
});
var Q2 = o4((p0, F3) => {
  "use strict";
  var Pe = u19(), Ve = I3(), _7 = V4(), l = K2(), Ge = D4(), c = Pe.extend(function(t) {
    var e5, i13, r, x, s5, a18 = t.value.length;
    for (this._badness = [], this._level = _7.LEVELS[t.level], this._polynomial = [], this._value = t.value, this._version = 0, this._stringBuffer = []; this._version < 40 && (this._version++, r = (this._level - 1) * 4 + (this._version - 1) * 16, x = _7.BLOCKS[r++], s5 = _7.BLOCKS[r++], e5 = _7.BLOCKS[r++], i13 = _7.BLOCKS[r], r = e5 * (x + s5) + s5 - 3 + (this._version <= 9), !(a18 <= r)); )
      ;
    this._dataBlock = e5, this._eccBlock = i13, this._neccBlock1 = x, this._neccBlock2 = s5;
    var n8 = this.width = 17 + 4 * this._version;
    this.buffer = c._createArray(n8 * n8), this._ecc = c._createArray(e5 + (e5 + i13) * (x + s5) + s5), this._mask = c._createArray((n8 * (n8 + 1) + 1) / 2), this._insertFinders(), this._insertAlignments(), this.buffer[8 + n8 * (n8 - 8)] = 1, this._insertTimingGap(), this._reverseMask(), this._insertTimingRowAndColumn(), this._insertVersion(), this._syncMask(), this._convertBitStream(a18), this._calculatePolynomial(), this._appendEccToData(), this._interleaveBlocks(), this._pack(), this._finish();
  }, { _addAlignment: function(t, e5) {
    var i13, r = this.buffer, x = this.width;
    for (r[t + x * e5] = 1, i13 = -2; i13 < 2; i13++)
      r[t + i13 + x * (e5 - 2)] = 1, r[t - 2 + x * (e5 + i13 + 1)] = 1, r[t + 2 + x * (e5 + i13)] = 1, r[t + i13 + 1 + x * (e5 + 2)] = 1;
    for (i13 = 0; i13 < 2; i13++)
      this._setMask(t - 1, e5 + i13), this._setMask(t + 1, e5 - i13), this._setMask(t - i13, e5 - 1), this._setMask(t + i13, e5 + 1);
  }, _appendData: function(t, e5, i13, r) {
    var x, s5, a18, n8 = this._polynomial, f10 = this._stringBuffer;
    for (s5 = 0; s5 < r; s5++)
      f10[i13 + s5] = 0;
    for (s5 = 0; s5 < e5; s5++) {
      if (x = l.LOG[f10[t + s5] ^ f10[i13]], x !== 255)
        for (a18 = 1; a18 < r; a18++)
          f10[i13 + a18 - 1] = f10[i13 + a18] ^ l.EXPONENT[c._modN(x + n8[r - a18])];
      else
        for (a18 = i13; a18 < i13 + r; a18++)
          f10[a18] = f10[a18 + 1];
      f10[i13 + r - 1] = x === 255 ? 0 : l.EXPONENT[c._modN(x + n8[0])];
    }
  }, _appendEccToData: function() {
    var t, e5 = 0, i13 = this._dataBlock, r = this._calculateMaxLength(), x = this._eccBlock;
    for (t = 0; t < this._neccBlock1; t++)
      this._appendData(e5, i13, r, x), e5 += i13, r += x;
    for (t = 0; t < this._neccBlock2; t++)
      this._appendData(e5, i13 + 1, r, x), e5 += i13 + 1, r += x;
  }, _applyMask: function(t) {
    var e5, i13, r, x, s5 = this.buffer, a18 = this.width;
    switch (t) {
      case 0:
        for (x = 0; x < a18; x++)
          for (r = 0; r < a18; r++)
            !(r + x & 1) && !this._isMasked(r, x) && (s5[r + x * a18] ^= 1);
        break;
      case 1:
        for (x = 0; x < a18; x++)
          for (r = 0; r < a18; r++)
            !(x & 1) && !this._isMasked(r, x) && (s5[r + x * a18] ^= 1);
        break;
      case 2:
        for (x = 0; x < a18; x++)
          for (e5 = 0, r = 0; r < a18; r++, e5++)
            e5 === 3 && (e5 = 0), !e5 && !this._isMasked(r, x) && (s5[r + x * a18] ^= 1);
        break;
      case 3:
        for (i13 = 0, x = 0; x < a18; x++, i13++)
          for (i13 === 3 && (i13 = 0), e5 = i13, r = 0; r < a18; r++, e5++)
            e5 === 3 && (e5 = 0), !e5 && !this._isMasked(r, x) && (s5[r + x * a18] ^= 1);
        break;
      case 4:
        for (x = 0; x < a18; x++)
          for (e5 = 0, i13 = x >> 1 & 1, r = 0; r < a18; r++, e5++)
            e5 === 3 && (e5 = 0, i13 = !i13), !i13 && !this._isMasked(r, x) && (s5[r + x * a18] ^= 1);
        break;
      case 5:
        for (i13 = 0, x = 0; x < a18; x++, i13++)
          for (i13 === 3 && (i13 = 0), e5 = 0, r = 0; r < a18; r++, e5++)
            e5 === 3 && (e5 = 0), !((r & x & 1) + !(!e5 | !i13)) && !this._isMasked(r, x) && (s5[r + x * a18] ^= 1);
        break;
      case 6:
        for (i13 = 0, x = 0; x < a18; x++, i13++)
          for (i13 === 3 && (i13 = 0), e5 = 0, r = 0; r < a18; r++, e5++)
            e5 === 3 && (e5 = 0), !((r & x & 1) + (e5 && e5 === i13) & 1) && !this._isMasked(r, x) && (s5[r + x * a18] ^= 1);
        break;
      case 7:
        for (i13 = 0, x = 0; x < a18; x++, i13++)
          for (i13 === 3 && (i13 = 0), e5 = 0, r = 0; r < a18; r++, e5++)
            e5 === 3 && (e5 = 0), !((e5 && e5 === i13) + (r + x & 1) & 1) && !this._isMasked(r, x) && (s5[r + x * a18] ^= 1);
        break;
    }
  }, _calculateMaxLength: function() {
    return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
  }, _calculatePolynomial: function() {
    var t, e5, i13 = this._eccBlock, r = this._polynomial;
    for (r[0] = 1, t = 0; t < i13; t++) {
      for (r[t + 1] = 1, e5 = t; e5 > 0; e5--)
        r[e5] = r[e5] ? r[e5 - 1] ^ l.EXPONENT[c._modN(l.LOG[r[e5]] + t)] : r[e5 - 1];
      r[0] = l.EXPONENT[c._modN(l.LOG[r[0]] + t)];
    }
    for (t = 0; t <= i13; t++)
      r[t] = l.LOG[r[t]];
  }, _checkBadness: function() {
    var t, e5, i13, r, x, s5 = 0, a18 = this._badness, n8 = this.buffer, f10 = this.width;
    for (x = 0; x < f10 - 1; x++)
      for (r = 0; r < f10 - 1; r++)
        (n8[r + f10 * x] && n8[r + 1 + f10 * x] && n8[r + f10 * (x + 1)] && n8[r + 1 + f10 * (x + 1)] || !(n8[r + f10 * x] || n8[r + 1 + f10 * x] || n8[r + f10 * (x + 1)] || n8[r + 1 + f10 * (x + 1)])) && (s5 += c.N2);
    var h = 0;
    for (x = 0; x < f10; x++) {
      for (i13 = 0, a18[0] = 0, t = 0, r = 0; r < f10; r++)
        e5 = n8[r + f10 * x], t === e5 ? a18[i13]++ : a18[++i13] = 1, t = e5, h += t ? 1 : -1;
      s5 += this._getBadness(i13);
    }
    h < 0 && (h = -h);
    var O3 = 0, b17 = h;
    for (b17 += b17 << 2, b17 <<= 1; b17 > f10 * f10; )
      b17 -= f10 * f10, O3++;
    for (s5 += O3 * c.N4, r = 0; r < f10; r++) {
      for (i13 = 0, a18[0] = 0, t = 0, x = 0; x < f10; x++)
        e5 = n8[r + f10 * x], t === e5 ? a18[i13]++ : a18[++i13] = 1, t = e5;
      s5 += this._getBadness(i13);
    }
    return s5;
  }, _convertBitStream: function(t) {
    var e5, i13, r = this._ecc, x = this._version;
    for (i13 = 0; i13 < t; i13++)
      r[i13] = this._value.charCodeAt(i13);
    var s5 = this._stringBuffer = r.slice(), a18 = this._calculateMaxLength();
    t >= a18 - 2 && (t = a18 - 2, x > 9 && t--);
    var n8 = t;
    if (x > 9) {
      for (s5[n8 + 2] = 0, s5[n8 + 3] = 0; n8--; )
        e5 = s5[n8], s5[n8 + 3] |= 255 & e5 << 4, s5[n8 + 2] = e5 >> 4;
      s5[2] |= 255 & t << 4, s5[1] = t >> 4, s5[0] = 64 | t >> 12;
    } else {
      for (s5[n8 + 1] = 0, s5[n8 + 2] = 0; n8--; )
        e5 = s5[n8], s5[n8 + 2] |= 255 & e5 << 4, s5[n8 + 1] = e5 >> 4;
      s5[1] |= 255 & t << 4, s5[0] = 64 | t >> 4;
    }
    for (n8 = t + 3 - (x < 10); n8 < a18; )
      s5[n8++] = 236, s5[n8++] = 17;
  }, _getBadness: function(t) {
    var e5, i13 = 0, r = this._badness;
    for (e5 = 0; e5 <= t; e5++)
      r[e5] >= 5 && (i13 += c.N1 + r[e5] - 5);
    for (e5 = 3; e5 < t - 1; e5 += 2)
      r[e5 - 2] === r[e5 + 2] && r[e5 + 2] === r[e5 - 1] && r[e5 - 1] === r[e5 + 1] && r[e5 - 1] * 3 === r[e5] && (r[e5 - 3] === 0 || e5 + 3 > t || r[e5 - 3] * 3 >= r[e5] * 4 || r[e5 + 3] * 3 >= r[e5] * 4) && (i13 += c.N3);
    return i13;
  }, _finish: function() {
    this._stringBuffer = this.buffer.slice();
    var t, e5, i13 = 0, r = 3e4;
    for (e5 = 0; e5 < 8 && (this._applyMask(e5), t = this._checkBadness(), t < r && (r = t, i13 = e5), i13 !== 7); e5++)
      this.buffer = this._stringBuffer.slice();
    i13 !== e5 && this._applyMask(i13), r = _7.FINAL_FORMAT[i13 + (this._level - 1 << 3)];
    var x = this.buffer, s5 = this.width;
    for (e5 = 0; e5 < 8; e5++, r >>= 1)
      r & 1 && (x[s5 - 1 - e5 + s5 * 8] = 1, e5 < 6 ? x[8 + s5 * e5] = 1 : x[8 + s5 * (e5 + 1)] = 1);
    for (e5 = 0; e5 < 7; e5++, r >>= 1)
      r & 1 && (x[8 + s5 * (s5 - 7 + e5)] = 1, e5 ? x[6 - e5 + s5 * 8] = 1 : x[7 + s5 * 8] = 1);
  }, _interleaveBlocks: function() {
    var t, e5, i13 = this._dataBlock, r = this._ecc, x = this._eccBlock, s5 = 0, a18 = this._calculateMaxLength(), n8 = this._neccBlock1, f10 = this._neccBlock2, h = this._stringBuffer;
    for (t = 0; t < i13; t++) {
      for (e5 = 0; e5 < n8; e5++)
        r[s5++] = h[t + e5 * i13];
      for (e5 = 0; e5 < f10; e5++)
        r[s5++] = h[n8 * i13 + t + e5 * (i13 + 1)];
    }
    for (e5 = 0; e5 < f10; e5++)
      r[s5++] = h[n8 * i13 + t + e5 * (i13 + 1)];
    for (t = 0; t < x; t++)
      for (e5 = 0; e5 < n8 + f10; e5++)
        r[s5++] = h[a18 + t + e5 * x];
    this._stringBuffer = r;
  }, _insertAlignments: function() {
    var t, e5, i13, r = this._version, x = this.width;
    if (r > 1)
      for (t = Ve.BLOCK[r], i13 = x - 7; ; ) {
        for (e5 = x - 7; e5 > t - 3 && (this._addAlignment(e5, i13), !(e5 < t)); )
          e5 -= t;
        if (i13 <= t + 9)
          break;
        i13 -= t, this._addAlignment(6, i13), this._addAlignment(i13, 6);
      }
  }, _insertFinders: function() {
    var t, e5, i13, r, x = this.buffer, s5 = this.width;
    for (t = 0; t < 3; t++) {
      for (e5 = 0, r = 0, t === 1 && (e5 = s5 - 7), t === 2 && (r = s5 - 7), x[r + 3 + s5 * (e5 + 3)] = 1, i13 = 0; i13 < 6; i13++)
        x[r + i13 + s5 * e5] = 1, x[r + s5 * (e5 + i13 + 1)] = 1, x[r + 6 + s5 * (e5 + i13)] = 1, x[r + i13 + 1 + s5 * (e5 + 6)] = 1;
      for (i13 = 1; i13 < 5; i13++)
        this._setMask(r + i13, e5 + 1), this._setMask(r + 1, e5 + i13 + 1), this._setMask(r + 5, e5 + i13), this._setMask(r + i13 + 1, e5 + 5);
      for (i13 = 2; i13 < 4; i13++)
        x[r + i13 + s5 * (e5 + 2)] = 1, x[r + 2 + s5 * (e5 + i13 + 1)] = 1, x[r + 4 + s5 * (e5 + i13)] = 1, x[r + i13 + 1 + s5 * (e5 + 4)] = 1;
    }
  }, _insertTimingGap: function() {
    var t, e5, i13 = this.width;
    for (e5 = 0; e5 < 7; e5++)
      this._setMask(7, e5), this._setMask(i13 - 8, e5), this._setMask(7, e5 + i13 - 7);
    for (t = 0; t < 8; t++)
      this._setMask(t, 7), this._setMask(t + i13 - 8, 7), this._setMask(t, i13 - 8);
  }, _insertTimingRowAndColumn: function() {
    var t, e5 = this.buffer, i13 = this.width;
    for (t = 0; t < i13 - 14; t++)
      t & 1 ? (this._setMask(8 + t, 6), this._setMask(6, 8 + t)) : (e5[8 + t + i13 * 6] = 1, e5[6 + i13 * (8 + t)] = 1);
  }, _insertVersion: function() {
    var t, e5, i13, r, x = this.buffer, s5 = this._version, a18 = this.width;
    if (s5 > 6)
      for (t = Ge.BLOCK[s5 - 7], e5 = 17, i13 = 0; i13 < 6; i13++)
        for (r = 0; r < 3; r++, e5--)
          1 & (e5 > 11 ? s5 >> e5 - 12 : t >> e5) ? (x[5 - i13 + a18 * (2 - r + a18 - 11)] = 1, x[2 - r + a18 - 11 + a18 * (5 - i13)] = 1) : (this._setMask(5 - i13, 2 - r + a18 - 11), this._setMask(2 - r + a18 - 11, 5 - i13));
  }, _isMasked: function(t, e5) {
    var i13 = c._getMaskBit(t, e5);
    return this._mask[i13] === 1;
  }, _pack: function() {
    var t, e5, i13, r = 1, x = 1, s5 = this.width, a18 = s5 - 1, n8 = s5 - 1, f10 = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
    for (e5 = 0; e5 < f10; e5++)
      for (t = this._stringBuffer[e5], i13 = 0; i13 < 8; i13++, t <<= 1) {
        128 & t && (this.buffer[a18 + s5 * n8] = 1);
        do
          x ? a18-- : (a18++, r ? n8 !== 0 ? n8-- : (a18 -= 2, r = !r, a18 === 6 && (a18--, n8 = 9)) : n8 !== s5 - 1 ? n8++ : (a18 -= 2, r = !r, a18 === 6 && (a18--, n8 -= 8))), x = !x;
        while (this._isMasked(a18, n8));
      }
  }, _reverseMask: function() {
    var t, e5, i13 = this.width;
    for (t = 0; t < 9; t++)
      this._setMask(t, 8);
    for (t = 0; t < 8; t++)
      this._setMask(t + i13 - 8, 8), this._setMask(8, t);
    for (e5 = 0; e5 < 7; e5++)
      this._setMask(8, e5 + i13 - 7);
  }, _setMask: function(t, e5) {
    var i13 = c._getMaskBit(t, e5);
    this._mask[i13] = 1;
  }, _syncMask: function() {
    var t, e5, i13 = this.width;
    for (e5 = 0; e5 < i13; e5++)
      for (t = 0; t <= e5; t++)
        this.buffer[t + i13 * e5] && this._setMask(t, e5);
  } }, { _createArray: function(t) {
    var e5, i13 = [];
    for (e5 = 0; e5 < t; e5++)
      i13[e5] = 0;
    return i13;
  }, _getMaskBit: function(t, e5) {
    var i13;
    return t > e5 && (i13 = t, t = e5, e5 = i13), i13 = e5, i13 += e5 * e5, i13 >>= 1, i13 += t, i13;
  }, _modN: function(t) {
    for (; t >= 255; )
      t -= 255, t = (t >> 8) + (t & 255);
    return t;
  }, N1: 3, N2: 3, N3: 40, N4: 10 });
  F3.exports = c;
});
var H2 = o4((k0, X2) => {
  "use strict";
  var Ke = M4(), Ue = Ke.extend({ draw: function() {
    this.element.src = this.qrious.toDataURL();
  }, reset: function() {
    this.element.src = "";
  }, resize: function() {
    var t = this.element;
    t.width = t.height = this.qrious.size;
  } });
  X2.exports = Ue;
});
var J2 = o4((g0, W3) => {
  "use strict";
  var De = u19(), Fe = De.extend(function(t, e5, i13, r) {
    this.name = t, this.modifiable = Boolean(e5), this.defaultValue = i13, this._valueTransformer = r;
  }, { transform: function(t) {
    var e5 = this._valueTransformer;
    return typeof e5 == "function" ? e5(t, this) : t;
  } });
  W3.exports = Fe;
});
var q4 = o4((w0, Y2) => {
  "use strict";
  var Qe = u19(), Xe = Qe.extend(null, { abs: function(t) {
    return t != null ? Math.abs(t) : null;
  }, hasOwn: function(t, e5) {
    return Object.prototype.hasOwnProperty.call(t, e5);
  }, noop: function() {
  }, toUpperCase: function(t) {
    return t != null ? t.toUpperCase() : null;
  } });
  Y2.exports = Xe;
});
var $4 = o4((B0, Z2) => {
  "use strict";
  var He = u19(), k6 = q4(), v7 = He.extend(function(t) {
    this.options = {}, t.forEach(function(e5) {
      this.options[e5.name] = e5;
    }, this);
  }, { exists: function(t) {
    return this.options[t] != null;
  }, get: function(t, e5) {
    return v7._get(this.options[t], e5);
  }, getAll: function(t) {
    var e5, i13 = this.options, r = {};
    for (e5 in i13)
      k6.hasOwn(i13, e5) && (r[e5] = v7._get(i13[e5], t));
    return r;
  }, init: function(t, e5, i13) {
    typeof i13 != "function" && (i13 = k6.noop);
    var r, x;
    for (r in this.options)
      k6.hasOwn(this.options, r) && (x = this.options[r], v7._set(x, x.defaultValue, e5), v7._createAccessor(x, e5, i13));
    this._setAll(t, e5, true);
  }, set: function(t, e5, i13) {
    return this._set(t, e5, i13);
  }, setAll: function(t, e5) {
    return this._setAll(t, e5);
  }, _set: function(t, e5, i13, r) {
    var x = this.options[t];
    if (!x)
      throw new Error("Invalid option: " + t);
    if (!x.modifiable && !r)
      throw new Error("Option cannot be modified: " + t);
    return v7._set(x, e5, i13);
  }, _setAll: function(t, e5, i13) {
    if (!t)
      return false;
    var r, x = false;
    for (r in t)
      k6.hasOwn(t, r) && this._set(r, t[r], e5, i13) && (x = true);
    return x;
  } }, { _createAccessor: function(t, e5, i13) {
    var r = { get: function() {
      return v7._get(t, e5);
    } };
    t.modifiable && (r.set = function(x) {
      v7._set(t, x, e5) && i13(x, t);
    }), Object.defineProperty(e5, t.name, r);
  }, _get: function(t, e5) {
    return e5["_" + t.name];
  }, _set: function(t, e5, i13) {
    var r = "_" + t.name, x = i13[r], s5 = t.transform(e5 != null ? e5 : t.defaultValue);
    return i13[r] = s5, s5 !== x;
  } });
  Z2.exports = v7;
});
var te2 = o4((M0, ee2) => {
  "use strict";
  var We = u19(), Je = We.extend(function() {
    this._services = {};
  }, { getService: function(t) {
    var e5 = this._services[t];
    if (!e5)
      throw new Error("Service is not being managed with name: " + t);
    return e5;
  }, setService: function(t, e5) {
    if (this._services[t])
      throw new Error("Service is already managed with name: " + t);
    e5 && (this._services[t] = e5);
  } });
  ee2.exports = Je;
});
var se = o4((q0, xe2) => {
  "use strict";
  var Ye = u19(), Ze = j6(), $e = Q2(), e0 = H2(), d11 = J2(), t0 = $4(), i0 = te2(), m9 = q4(), g13 = new t0([new d11("background", true, "white"), new d11("backgroundAlpha", true, 1, m9.abs), new d11("element"), new d11("foreground", true, "black"), new d11("foregroundAlpha", true, 1, m9.abs), new d11("level", true, "L", m9.toUpperCase), new d11("mime", true, "image/png"), new d11("padding", true, null, m9.abs), new d11("size", true, 100, m9.abs), new d11("value", true, "")]), ie = new i0(), re = Ye.extend(function(t) {
    g13.init(t, this, this.update.bind(this));
    var e5 = g13.get("element", this), i13 = ie.getService("element"), r = e5 && i13.isCanvas(e5) ? e5 : i13.createCanvas(), x = e5 && i13.isImage(e5) ? e5 : i13.createImage();
    this._canvasRenderer = new Ze(this, r, true), this._imageRenderer = new e0(this, x, x === e5), this.update();
  }, { get: function() {
    return g13.getAll(this);
  }, set: function(t) {
    g13.setAll(t, this) && this.update();
  }, toDataURL: function(t) {
    return this.canvas.toDataURL(t || this.mime);
  }, update: function() {
    var t = new $e({ level: this.level, value: this.value });
    this._canvasRenderer.render(t), this._imageRenderer.render(t);
  } }, { use: function(t) {
    ie.setService(t.getName(), t);
  } });
  Object.defineProperties(re.prototype, { canvas: { get: function() {
    return this._canvasRenderer.getElement();
  } }, image: { get: function() {
    return this._imageRenderer.getElement();
  } } });
  xe2.exports = re;
});
var ne = o4((O0, ae) => {
  "use strict";
  ae.exports = se();
});
var oe = o4((N0, fe) => {
  "use strict";
  var r0 = u19(), x0 = r0.extend({ getName: function() {
  } });
  fe.exports = x0;
});
var ue = o4((y0, ce) => {
  "use strict";
  var s0 = oe(), a0 = s0.extend({ createCanvas: function() {
  }, createImage: function() {
  }, getName: function() {
    return "element";
  }, isCanvas: function(t) {
  }, isImage: function(t) {
  } });
  ce.exports = a0;
});
var le = N4(ne(), 1);
var he = N4(ue(), 1);
var n0 = he.default.extend({ createCanvas: function() {
  return document.createElement("canvas");
}, createImage: function() {
  return document.createElement("img");
}, isCanvas: function(t) {
  return t instanceof HTMLCanvasElement;
}, isImage: function(t) {
  return t instanceof HTMLImageElement;
} });
var de = n0;
var f0 = le.default;
f0.use(new de());

// js/Qr.tsx
var QR = ({ url }) => {
  const canvasRef = React2.useRef(null);
  React2.useEffect(() => {
    const load = () => {
      const options = {
        size: 200,
        element: canvasRef.current,
        foregroundAlpha: 0.9,
        foreground: "white",
        backgroundAlpha: 1,
        padding: 16,
        background: "#1e1e1e",
        value: url
      };
      const qr = new f0(options);
    };
    load();
  }, [url]);
  return /* @__PURE__ */ jsx("canvas", {
    css: css`
        border-radius: 16px;
        margin-bottom: 8px;
  `,
    ref: canvasRef
  });
};
var QRButton = ({ url }) => {
  const [showQR, setQR] = React2.useState(false);
  return /* @__PURE__ */ jsx(motion.div, {
    animate: {
      width: showQR ? 200 : 56,
      height: showQR ? 220 : 48
    },
    onClick: (e5) => {
      setQR(!showQR);
    },
    css: css`
                margin-bottom: 12px;
              `
  }, showQR ? /* @__PURE__ */ jsx(QR, {
    key: url,
    url: url + "/edit/"
  }) : /* @__PURE__ */ jsx(MyFsb, {
    variant: "extended",
    color: "secondary",
    onClick: () => {
      setQR(!showQR);
    }
  }, /* @__PURE__ */ jsx(QrCode, null)));
};

// js/DraggableWindow.tsx
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100, 150];
var bg = `rgba(${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${!navigator.userAgent.includes("Firefox") ? 0.3 : 0.7})`;
var DraggableWindow = ({ onShare, onRestore, position, session, keepFullScreen, room }) => {
  const [isStable, setIsStable] = useState(false);
  const [scaleRange, changeScaleRange] = useState(100);
  const [childArray, setChild] = useState([
    /* @__PURE__ */ jsx2(LazySpikeLandComponent, {
      name: room,
      transpiled: session.transpiled,
      htmlContent: `<div id="root"><style>${session.css}</style><div id="zbody">${session.html}</div></div>`,
      html: session.html
    })
  ]);
  const startPositions = { bottom: -40, right: -90 };
  session.setChild = setChild;
  const [qrUrl, setQRUrl] = useState(session.url);
  const [errorText, setErrorText] = useState("");
  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const ref = useRef(null);
  const zbody = useRef(null);
  const child = childArray[childArray.length - 1];
  useEffect(() => {
    const handler = setInterval(async () => {
      if (errorText !== session.errorText) {
        const newError = session.errorText;
        setErrorText(newError);
        setIsStable(false);
        await wait(1500);
        if (session.errorText === newError) {
          setIsStable(true);
        }
      }
      if (qrUrl !== session.url) {
        setQRUrl(session.url);
      }
    }, 200);
    return () => {
      clearInterval(handler);
    };
  }, [setErrorText, setQRUrl, errorText, qrUrl]);
  const scale = scaleRange / 100;
  const [isFullScreen, setFullScreen] = useState(true);
  useEffect(() => {
    const reveal = async () => {
      const { bottom: bottom2, right: right2 } = startPositions;
      if (keepFullScreen) {
        return;
      }
      await wait(1200);
      while (!window || !window.monaco) {
        await wait(300);
      }
      setFullScreen(false);
      changeScaleRange(50);
      setPositions({
        bottom: window.innerHeight * 0.2,
        right: window.innerWidth * 0.2
      });
      if (window.innerWidth / devicePixelRatio < 600) {
        changeScaleRange(50);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      }
      if (window.innerWidth / devicePixelRatio < 1200) {
        changeScaleRange(75);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      } else if (window.innerWidth / devicePixelRatio < 1800) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(50);
      } else if (window.innerWidth / devicePixelRatio < 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(75);
      } else if (window.innerWidth / devicePixelRatio > 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(100);
      }
      await wait(200);
      setPositions({
        bottom: 20,
        right: 20
      });
    };
    reveal();
  }, []);
  return /* @__PURE__ */ jsx2(React3.StrictMode, null, /* @__PURE__ */ jsx2(motion2.div, {
    ref,
    initial: { bottom: startPositions.bottom, right: startPositions.right },
    animate: {
      bottom,
      right
    },
    css: css2`
            background-color:${bg};
            backdrop-filter: blur(15px);
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${position ? position : "fixed"};
          `,
    dragElastic: 0.5,
    dragConstraints: {
      left: 0,
      right: width - 20 - width / 6,
      bottom: innerHeight - 100
    },
    dragMomentum: false,
    drag: !isFullScreen
  }, /* @__PURE__ */ jsx2("div", {
    css: css2` 
              display: flex;
              
                `
  }, /* @__PURE__ */ jsx2("div", {
    css: css2`
            display: flex;
            flex-direction: column;
            align-items: center;
          `
  }, /* @__PURE__ */ jsx2(b16, {
    value: scaleRange,
    size: "small",
    exclusive: true,
    onChange: (_e2, newScale) => {
      newScale && changeScaleRange(newScale);
    }
  }, sizes.map((size) => /* @__PURE__ */ jsx2(y14, {
    key: size,
    value: size
  }, /* @__PURE__ */ jsx2("span", {
    css: css2`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `
  }, size, "%")))), /* @__PURE__ */ jsx2(motion2.div, {
    animate: {
      width: width * scale / devicePixelRatio,
      height: height * scale / devicePixelRatio,
      maxHeight: height * scale / devicePixelRatio,
      borderRadius: isFullScreen ? 0 : 8
    },
    css: css2`
                width: ${width * scale / devicePixelRatio};
                height: ${height * scale / devicePixelRatio};
                display: block;
                overflow: hidden;


                /* background-color: red; */
            `
  }, errorText && errorText.trim() !== "" && /* @__PURE__ */ jsx2("pre", {
    css: css2`
                    position: absolute;
                    z-index:3;
                    color: rgb(255, 240, 240);
                    padding: 24px;
                    font-size: 14pt;
                    background-color: rgb(255, 0, 0);
                    flex: 0 0 auto;
                    overflow: auto;
                    margin: 0;
                    font-family: monospace;
                    white-space: pre-wrap;
                `
  }, isStable && errorText && errorText.trim(), isStable && errorText && errorText.trim() !== "" && /* @__PURE__ */ jsx2("div", {
    css: css2`
                          text-align: right;
                        `
  }, /* @__PURE__ */ jsx2(MyButton, {
    onClick: () => {
      onRestore();
      setErrorText("");
    }
  }, "Restore"))), /* @__PURE__ */ jsx2(motion2.div, {
    initial: {
      transformOrigin: "0px 0px",
      width: window.innerWidth / devicePixelRatio,
      height: window.innerHeight / devicePixelRatio,
      scale: scaleRange / 100
    },
    animate: {
      transformOrigin: "0px 0px",
      width: width / devicePixelRatio,
      height: height / devicePixelRatio,
      scale: scaleRange / 100
    },
    css: css2`
                  overflow:overlay;
                  overflow-y: hidden;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `
  }, errorText ? /* @__PURE__ */ jsx2("div", {
    css: `${session.css}`,
    dangerouslySetInnerHTML: createMarkup(session.html)
  }) : /* @__PURE__ */ jsx2("div", {
    id: "zbody",
    key: session.i,
    ref: zbody,
    css: css2`
                        height: 100%;
                      `
  }, child), " ")), /* @__PURE__ */ jsx2(b16, {
    value: width,
    size: "small",
    exclusive: true,
    onChange: (_e2, newSize) => {
      if (newSize) {
        setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
        setWidth(newSize);
      }
    }
  }, breakPoints.map((size) => /* @__PURE__ */ jsx2(y14, {
    key: size,
    value: size
  }, size === 680 ? /* @__PURE__ */ jsx2(Phone, {
    css: css2`
                        color: ${width === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : size === 768 ? /* @__PURE__ */ jsx2(Tablet, {
    css: css2`
                        color: ${width === 768 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : /* @__PURE__ */ jsx2(Tv, {
    css: css2`
                        color: ${width === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `
  }))))), /* @__PURE__ */ jsx2("div", {
    css: css2`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              `
  }, /* @__PURE__ */ jsx2(MyFsb, {
    onClick: () => {
      setFullScreen(true);
    }
  }, /* @__PURE__ */ jsx2(FullscreenIcon, null)), /* @__PURE__ */ jsx2(QRButton, {
    url: qrUrl
  }), /* @__PURE__ */ jsx2(MyFsb, {
    onClick: () => {
      onShare();
    }
  }, /* @__PURE__ */ jsx2(Share, null))))));
};
function createMarkup(__html) {
  return { __html };
}

// js/renderPreviewWindow.tsx
var renderPreviewWindow = async (session, room, keepFullScreen) => {
  const target = document.createElement("div");
  const editor = document.querySelector("#shadowEditor");
  editor.style.opacity = "0";
  const { createRoot } = await import("https://unpkg.com/@spike.land/esm@0.5.14/dist/react-dom.mjs");
  const root = createRoot(target, {});
  root.render(/* @__PURE__ */ jsx3(DraggableWindow, {
    onShare: () => open(`https://code.spike.land/api/room/${room}/public`),
    onRestore: () => {
      const model = session.editor.getModel();
      model.setValue(session.code);
    },
    position: session.mode === "window" ? "fixed" : "absolute",
    session,
    keepFullScreen,
    room
  }));
  target.style.opacity = "0";
  document.body.append(target);
  await wait(400);
  target.style.display = "block";
  target.style.opacity = "1";
  document.querySelector("#root").remove();
  document.body.style.backgroundImage = 'url("./assets/synthwave.webp")';
  editor.style.opacity = "1";
  editor.style.display = "block";
};
export {
  renderPreviewWindow
};
//# sourceMappingURL=renderPreviewWindow.mjs.map
