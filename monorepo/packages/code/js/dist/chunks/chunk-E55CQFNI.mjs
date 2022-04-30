import {
  A,
  B,
  D,
  S,
  _,
  d,
  l,
  p,
  q,
  v
} from "./chunk-KWFWVMVK.mjs";
import {
  __export
} from "./chunk-BZTAI3VG.mjs";

// ../../node_modules/preact/compat/dist/compat.module.js
var compat_module_exports = {};
__export(compat_module_exports, {
  Children: () => k2,
  Component: () => _,
  Fragment: () => d,
  PureComponent: () => E,
  StrictMode: () => cn,
  Suspense: () => L,
  SuspenseList: () => M,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => X,
  cloneElement: () => rn,
  createContext: () => D,
  createElement: () => v,
  createFactory: () => tn,
  createPortal: () => W,
  createRef: () => p,
  default: () => compat_module_default,
  findDOMNode: () => on,
  flushSync: () => fn,
  forwardRef: () => x2,
  hydrate: () => $,
  isValidElement: () => en,
  lazy: () => F2,
  memo: () => g2,
  render: () => B2,
  unmountComponentAtNode: () => un,
  unstable_batchedUpdates: () => ln,
  useCallback: () => A2,
  useContext: () => F,
  useDebugValue: () => T,
  useEffect: () => y,
  useErrorBoundary: () => q2,
  useImperativeHandle: () => s,
  useLayoutEffect: () => d2,
  useMemo: () => _2,
  useReducer: () => p2,
  useRef: () => h,
  useState: () => m,
  version: () => nn
});

// ../../node_modules/preact/hooks/dist/hooks.module.js
var t;
var u;
var r;
var o = 0;
var i = [];
var c = l.__b;
var f = l.__r;
var e = l.diffed;
var a = l.__c;
var v2 = l.unmount;
function l2(t2, r3) {
  l.__h && l.__h(u, t2, o || r3), o = 0;
  var i3 = u.__H || (u.__H = { __: [], __h: [] });
  return t2 >= i3.__.length && i3.__.push({}), i3.__[t2];
}
function m(n2) {
  return o = 1, p2(w, n2);
}
function p2(n2, r3, o3) {
  var i3 = l2(t++, 2);
  return i3.t = n2, i3.__c || (i3.__ = [o3 ? o3(r3) : w(void 0, r3), function(n3) {
    var t2 = i3.t(i3.__[0], n3);
    i3.__[0] !== t2 && (i3.__ = [t2, i3.__[1]], i3.__c.setState({}));
  }], i3.__c = u), i3.__;
}
function y(r3, o3) {
  var i3 = l2(t++, 3);
  !l.__s && k(i3.__H, o3) && (i3.__ = r3, i3.__H = o3, u.__H.__h.push(i3));
}
function d2(r3, o3) {
  var i3 = l2(t++, 4);
  !l.__s && k(i3.__H, o3) && (i3.__ = r3, i3.__H = o3, u.__h.push(i3));
}
function h(n2) {
  return o = 5, _2(function() {
    return { current: n2 };
  }, []);
}
function s(n2, t2, u3) {
  o = 6, d2(function() {
    return typeof n2 == "function" ? (n2(t2()), function() {
      return n2(null);
    }) : n2 ? (n2.current = t2(), function() {
      return n2.current = null;
    }) : void 0;
  }, u3 == null ? u3 : u3.concat(n2));
}
function _2(n2, u3) {
  var r3 = l2(t++, 7);
  return k(r3.__H, u3) && (r3.__ = n2(), r3.__H = u3, r3.__h = n2), r3.__;
}
function A2(n2, t2) {
  return o = 8, _2(function() {
    return n2;
  }, t2);
}
function F(n2) {
  var r3 = u.context[n2.__c], o3 = l2(t++, 9);
  return o3.c = n2, r3 ? (o3.__ == null && (o3.__ = true, r3.sub(u)), r3.props.value) : n2.__;
}
function T(t2, u3) {
  l.useDebugValue && l.useDebugValue(u3 ? u3(t2) : t2);
}
function q2(n2) {
  var r3 = l2(t++, 10), o3 = m();
  return r3.__ = n2, u.componentDidCatch || (u.componentDidCatch = function(n3) {
    r3.__ && r3.__(n3), o3[1](n3);
  }), [o3[0], function() {
    o3[1](void 0);
  }];
}
function x() {
  for (var t2; t2 = i.shift(); )
    if (t2.__P)
      try {
        t2.__H.__h.forEach(g), t2.__H.__h.forEach(j), t2.__H.__h = [];
      } catch (u3) {
        t2.__H.__h = [], l.__e(u3, t2.__v);
      }
}
l.__b = function(n2) {
  u = null, c && c(n2);
}, l.__r = function(n2) {
  f && f(n2), t = 0;
  var r3 = (u = n2.__c).__H;
  r3 && (r3.__h.forEach(g), r3.__h.forEach(j), r3.__h = []);
}, l.diffed = function(t2) {
  e && e(t2);
  var o3 = t2.__c;
  o3 && o3.__H && o3.__H.__h.length && (i.push(o3) !== 1 && r === l.requestAnimationFrame || ((r = l.requestAnimationFrame) || function(n2) {
    var t3, u3 = function() {
      clearTimeout(r3), b && cancelAnimationFrame(t3), setTimeout(n2);
    }, r3 = setTimeout(u3, 100);
    b && (t3 = requestAnimationFrame(u3));
  })(x)), u = null;
}, l.__c = function(t2, u3) {
  u3.some(function(t3) {
    try {
      t3.__h.forEach(g), t3.__h = t3.__h.filter(function(n2) {
        return !n2.__ || j(n2);
      });
    } catch (r3) {
      u3.some(function(n2) {
        n2.__h && (n2.__h = []);
      }), u3 = [], l.__e(r3, t3.__v);
    }
  }), a && a(t2, u3);
}, l.unmount = function(t2) {
  v2 && v2(t2);
  var u3, r3 = t2.__c;
  r3 && r3.__H && (r3.__H.__.forEach(function(n2) {
    try {
      g(n2);
    } catch (n3) {
      u3 = n3;
    }
  }), u3 && l.__e(u3, r3.__v));
};
var b = typeof requestAnimationFrame == "function";
function g(n2) {
  var t2 = u, r3 = n2.__c;
  typeof r3 == "function" && (n2.__c = void 0, r3()), u = t2;
}
function j(n2) {
  var t2 = u;
  n2.__c = n2.__(), u = t2;
}
function k(n2, t2) {
  return !n2 || n2.length !== t2.length || t2.some(function(t3, u3) {
    return t3 !== n2[u3];
  });
}
function w(n2, t2) {
  return typeof t2 == "function" ? t2(n2) : t2;
}

// ../../node_modules/preact/compat/dist/compat.module.js
function C(n2, t2) {
  for (var e2 in t2)
    n2[e2] = t2[e2];
  return n2;
}
function S2(n2, t2) {
  for (var e2 in n2)
    if (e2 !== "__source" && !(e2 in t2))
      return true;
  for (var r3 in t2)
    if (r3 !== "__source" && n2[r3] !== t2[r3])
      return true;
  return false;
}
function E(n2) {
  this.props = n2;
}
function g2(n2, t2) {
  function e2(n3) {
    var e3 = this.props.ref, r4 = e3 == n3.ref;
    return !r4 && e3 && (e3.call ? e3(null) : e3.current = null), t2 ? !t2(this.props, n3) || !r4 : S2(this.props, n3);
  }
  function r3(t3) {
    return this.shouldComponentUpdate = e2, v(n2, t3);
  }
  return r3.displayName = "Memo(" + (n2.displayName || n2.name) + ")", r3.prototype.isReactComponent = true, r3.__f = true, r3;
}
(E.prototype = new _()).isPureReactComponent = true, E.prototype.shouldComponentUpdate = function(n2, t2) {
  return S2(this.props, n2) || S2(this.state, t2);
};
var w2 = l.__b;
l.__b = function(n2) {
  n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), w2 && w2(n2);
};
var R = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function x2(n2) {
  function t2(t3) {
    var e2 = C({}, t3);
    return delete e2.ref, n2(e2, t3.ref || null);
  }
  return t2.$$typeof = R, t2.render = t2, t2.prototype.isReactComponent = t2.__f = true, t2.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t2;
}
var N = function(n2, t2) {
  return n2 == null ? null : A(A(n2).map(t2));
};
var k2 = { map: N, forEach: N, count: function(n2) {
  return n2 ? A(n2).length : 0;
}, only: function(n2) {
  var t2 = A(n2);
  if (t2.length !== 1)
    throw "Children.only";
  return t2[0];
}, toArray: A };
var A3 = l.__e;
l.__e = function(n2, t2, e2, r3) {
  if (n2.then) {
    for (var u3, o3 = t2; o3 = o3.__; )
      if ((u3 = o3.__c) && u3.__c)
        return t2.__e == null && (t2.__e = e2.__e, t2.__k = e2.__k), u3.__c(n2, t2);
  }
  A3(n2, t2, e2, r3);
};
var O = l.unmount;
function L() {
  this.__u = 0, this.t = null, this.__b = null;
}
function U(n2) {
  var t2 = n2.__.__c;
  return t2 && t2.__e && t2.__e(n2);
}
function F2(n2) {
  var t2, e2, r3;
  function u3(u4) {
    if (t2 || (t2 = n2()).then(function(n3) {
      e2 = n3.default || n3;
    }, function(n3) {
      r3 = n3;
    }), r3)
      throw r3;
    if (!e2)
      throw t2;
    return v(e2, u4);
  }
  return u3.displayName = "Lazy", u3.__f = true, u3;
}
function M() {
  this.u = null, this.o = null;
}
l.unmount = function(n2) {
  var t2 = n2.__c;
  t2 && t2.__R && t2.__R(), t2 && n2.__h === true && (n2.type = null), O && O(n2);
}, (L.prototype = new _()).__c = function(n2, t2) {
  var e2 = t2.__c, r3 = this;
  r3.t == null && (r3.t = []), r3.t.push(e2);
  var u3 = U(r3.__v), o3 = false, i3 = function() {
    o3 || (o3 = true, e2.__R = null, u3 ? u3(l4) : l4());
  };
  e2.__R = i3;
  var l4 = function() {
    if (!--r3.__u) {
      if (r3.state.__e) {
        var n3 = r3.state.__e;
        r3.__v.__k[0] = function n4(t4, e3, r4) {
          return t4 && (t4.__v = null, t4.__k = t4.__k && t4.__k.map(function(t5) {
            return n4(t5, e3, r4);
          }), t4.__c && t4.__c.__P === e3 && (t4.__e && r4.insertBefore(t4.__e, t4.__d), t4.__c.__e = true, t4.__c.__P = r4)), t4;
        }(n3, n3.__c.__P, n3.__c.__O);
      }
      var t3;
      for (r3.setState({ __e: r3.__b = null }); t3 = r3.t.pop(); )
        t3.forceUpdate();
    }
  }, f3 = t2.__h === true;
  r3.__u++ || f3 || r3.setState({ __e: r3.__b = r3.__v.__k[0] }), n2.then(i3, i3);
}, L.prototype.componentWillUnmount = function() {
  this.t = [];
}, L.prototype.render = function(n2, t2) {
  if (this.__b) {
    if (this.__v.__k) {
      var e2 = document.createElement("div"), r3 = this.__v.__k[0].__c;
      this.__v.__k[0] = function n3(t3, e3, r4) {
        return t3 && (t3.__c && t3.__c.__H && (t3.__c.__H.__.forEach(function(n4) {
          typeof n4.__c == "function" && n4.__c();
        }), t3.__c.__H = null), (t3 = C({}, t3)).__c != null && (t3.__c.__P === r4 && (t3.__c.__P = e3), t3.__c = null), t3.__k = t3.__k && t3.__k.map(function(t4) {
          return n3(t4, e3, r4);
        })), t3;
      }(this.__b, e2, r3.__O = r3.__P);
    }
    this.__b = null;
  }
  var u3 = t2.__e && v(d, null, n2.fallback);
  return u3 && (u3.__h = null), [v(d, null, t2.__e ? null : n2.children), u3];
};
var T2 = function(n2, t2, e2) {
  if (++e2[1] === e2[0] && n2.o.delete(t2), n2.props.revealOrder && (n2.props.revealOrder[0] !== "t" || !n2.o.size))
    for (e2 = n2.u; e2; ) {
      for (; e2.length > 3; )
        e2.pop()();
      if (e2[1] < e2[0])
        break;
      n2.u = e2 = e2[2];
    }
};
function D2(n2) {
  return this.getChildContext = function() {
    return n2.context;
  }, n2.children;
}
function I(n2) {
  var t2 = this, e2 = n2.i;
  t2.componentWillUnmount = function() {
    S(null, t2.l), t2.l = null, t2.i = null;
  }, t2.i && t2.i !== e2 && t2.componentWillUnmount(), n2.__v ? (t2.l || (t2.i = e2, t2.l = { nodeType: 1, parentNode: e2, childNodes: [], appendChild: function(n3) {
    this.childNodes.push(n3), t2.i.appendChild(n3);
  }, insertBefore: function(n3, e3) {
    this.childNodes.push(n3), t2.i.appendChild(n3);
  }, removeChild: function(n3) {
    this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), t2.i.removeChild(n3);
  } }), S(v(D2, { context: t2.context }, n2.__v), t2.l)) : t2.l && t2.componentWillUnmount();
}
function W(n2, t2) {
  return v(I, { __v: n2, i: t2 });
}
(M.prototype = new _()).__e = function(n2) {
  var t2 = this, e2 = U(t2.__v), r3 = t2.o.get(n2);
  return r3[0]++, function(u3) {
    var o3 = function() {
      t2.props.revealOrder ? (r3.push(u3), T2(t2, n2, r3)) : u3();
    };
    e2 ? e2(o3) : o3();
  };
}, M.prototype.render = function(n2) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var t2 = A(n2.children);
  n2.revealOrder && n2.revealOrder[0] === "b" && t2.reverse();
  for (var e2 = t2.length; e2--; )
    this.o.set(t2[e2], this.u = [1, 0, this.u]);
  return n2.children;
}, M.prototype.componentDidUpdate = M.prototype.componentDidMount = function() {
  var n2 = this;
  this.o.forEach(function(t2, e2) {
    T2(n2, e2, t2);
  });
};
var P = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.element") || 60103;
var V = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var j2 = typeof document != "undefined";
var z = function(n2) {
  return (typeof Symbol != "undefined" && typeof Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(n2);
};
function B2(n2, t2, e2) {
  return t2.__k == null && (t2.textContent = ""), S(n2, t2), typeof e2 == "function" && e2(), n2 ? n2.__c : null;
}
function $(n2, t2, e2) {
  return q(n2, t2), typeof e2 == "function" && e2(), n2 ? n2.__c : null;
}
_.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n2) {
  Object.defineProperty(_.prototype, n2, { configurable: true, get: function() {
    return this["UNSAFE_" + n2];
  }, set: function(t2) {
    Object.defineProperty(this, n2, { configurable: true, writable: true, value: t2 });
  } });
});
var H = l.event;
function Z() {
}
function Y() {
  return this.cancelBubble;
}
function q3() {
  return this.defaultPrevented;
}
l.event = function(n2) {
  return H && (n2 = H(n2)), n2.persist = Z, n2.isPropagationStopped = Y, n2.isDefaultPrevented = q3, n2.nativeEvent = n2;
};
var G;
var J = { configurable: true, get: function() {
  return this.class;
} };
var K = l.vnode;
l.vnode = function(n2) {
  var t2 = n2.type, e2 = n2.props, r3 = e2;
  if (typeof t2 == "string") {
    var u3 = t2.indexOf("-") === -1;
    for (var o3 in r3 = {}, e2) {
      var i3 = e2[o3];
      j2 && o3 === "children" && t2 === "noscript" || o3 === "value" && "defaultValue" in e2 && i3 == null || (o3 === "defaultValue" && "value" in e2 && e2.value == null ? o3 = "value" : o3 === "download" && i3 === true ? i3 = "" : /ondoubleclick/i.test(o3) ? o3 = "ondblclick" : /^onchange(textarea|input)/i.test(o3 + t2) && !z(e2.type) ? o3 = "oninput" : /^onfocus$/i.test(o3) ? o3 = "onfocusin" : /^onblur$/i.test(o3) ? o3 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o3) ? o3 = o3.toLowerCase() : u3 && V.test(o3) ? o3 = o3.replace(/[A-Z0-9]/, "-$&").toLowerCase() : i3 === null && (i3 = void 0), r3[o3] = i3);
    }
    t2 == "select" && r3.multiple && Array.isArray(r3.value) && (r3.value = A(e2.children).forEach(function(n3) {
      n3.props.selected = r3.value.indexOf(n3.props.value) != -1;
    })), t2 == "select" && r3.defaultValue != null && (r3.value = A(e2.children).forEach(function(n3) {
      n3.props.selected = r3.multiple ? r3.defaultValue.indexOf(n3.props.value) != -1 : r3.defaultValue == n3.props.value;
    })), n2.props = r3, e2.class != e2.className && (J.enumerable = "className" in e2, e2.className != null && (r3.class = e2.className), Object.defineProperty(r3, "className", J));
  }
  n2.$$typeof = P, K && K(n2);
};
var Q = l.__r;
l.__r = function(n2) {
  Q && Q(n2), G = n2.__c;
};
var X = { ReactCurrentDispatcher: { current: { readContext: function(n2) {
  return G.__n[n2.__c].props.value;
} } } };
var nn = "17.0.2";
function tn(n2) {
  return v.bind(null, n2);
}
function en(n2) {
  return !!n2 && n2.$$typeof === P;
}
function rn(n2) {
  return en(n2) ? B.apply(null, arguments) : n2;
}
function un(n2) {
  return !!n2.__k && (S(null, n2), true);
}
function on(n2) {
  return n2 && (n2.base || n2.nodeType === 1 && n2) || null;
}
var ln = function(n2, t2) {
  return n2(t2);
};
var fn = function(n2, t2) {
  return n2(t2);
};
var cn = d;
var compat_module_default = { useState: m, useReducer: p2, useEffect: y, useLayoutEffect: d2, useRef: h, useImperativeHandle: s, useMemo: _2, useCallback: A2, useContext: F, useDebugValue: T, version: "17.0.2", Children: k2, render: B2, hydrate: $, unmountComponentAtNode: un, createPortal: W, createElement: v, createContext: D, createFactory: tn, cloneElement: rn, createRef: p, Fragment: d, isValidElement: en, findDOMNode: on, Component: _, PureComponent: E, memo: g2, forwardRef: x2, flushSync: fn, unstable_batchedUpdates: ln, StrictMode: d, Suspense: L, SuspenseList: M, lazy: F2, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: X };

// ../../node_modules/preact-render-to-string/dist/index.mjs
var r2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
var n = /[&<>"]/;
function o2(e2) {
  var t2 = String(e2);
  return n.test(t2) ? t2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t2;
}
var a2 = function(e2, t2) {
  return String(e2).replace(/(\n+)/g, "$1" + (t2 || "	"));
};
var i2 = function(e2, t2, r3) {
  return String(e2).length > (t2 || 40) || !r3 && String(e2).indexOf("\n") !== -1 || String(e2).indexOf("<") !== -1;
};
var l3 = {};
function s2(e2) {
  var t2 = "";
  for (var n2 in e2) {
    var o3 = e2[n2];
    o3 != null && o3 !== "" && (t2 && (t2 += " "), t2 += n2[0] == "-" ? n2 : l3[n2] || (l3[n2] = n2.replace(/([A-Z])/g, "-$1").toLowerCase()), t2 += ": ", t2 += o3, typeof o3 == "number" && r2.test(n2) === false && (t2 += "px"), t2 += ";");
  }
  return t2 || void 0;
}
function f2(e2, t2) {
  for (var r3 in t2)
    e2[r3] = t2[r3];
  return e2;
}
function u2(e2, t2) {
  return Array.isArray(t2) ? t2.reduce(u2, e2) : t2 != null && t2 !== false && e2.push(t2), e2;
}
var c2 = { shallow: true };
var p3 = [];
var _3 = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
var d3 = /[\s\n\\/='"\0<>]/;
function v3() {
  this.__d = true;
}
m2.render = m2;
var g3 = function(e2, t2) {
  return m2(e2, t2, c2);
};
var h2 = [];
function m2(t2, r3, n2) {
  r3 = r3 || {}, n2 = n2 || {};
  var o3 = l.__s;
  l.__s = true;
  var a3 = x3(t2, r3, n2);
  return l.__c && l.__c(t2, h2), h2.length = 0, l.__s = o3, a3;
}
function x3(r3, n2, l4, c3, g4, h3) {
  if (r3 == null || typeof r3 == "boolean")
    return "";
  if (typeof r3 != "object")
    return o2(r3);
  var m3 = l4.pretty, y2 = m3 && typeof m3 == "string" ? m3 : "	";
  if (Array.isArray(r3)) {
    for (var b2 = "", S3 = 0; S3 < r3.length; S3++)
      m3 && S3 > 0 && (b2 += "\n"), b2 += x3(r3[S3], n2, l4, c3, g4, h3);
    return b2;
  }
  var w3, k3 = r3.type, O2 = r3.props, C2 = false;
  if (typeof k3 == "function") {
    if (C2 = true, !l4.shallow || !c3 && l4.renderRootComponent !== false) {
      if (k3 === d) {
        var A4 = [];
        return u2(A4, r3.props.children), x3(A4, n2, l4, l4.shallowHighOrder !== false, g4, h3);
      }
      var H2, j3 = r3.__c = { __v: r3, context: n2, props: r3.props, setState: v3, forceUpdate: v3, __d: true, __h: [] };
      l.__b && l.__b(r3);
      var F3 = l.__r;
      if (k3.prototype && typeof k3.prototype.render == "function") {
        var M2 = k3.contextType, T3 = M2 && n2[M2.__c], $2 = M2 != null ? T3 ? T3.props.value : M2.__ : n2;
        (j3 = r3.__c = new k3(O2, $2)).__v = r3, j3._dirty = j3.__d = true, j3.props = O2, j3.state == null && (j3.state = {}), j3._nextState == null && j3.__s == null && (j3._nextState = j3.__s = j3.state), j3.context = $2, k3.getDerivedStateFromProps ? j3.state = f2(f2({}, j3.state), k3.getDerivedStateFromProps(j3.props, j3.state)) : j3.componentWillMount && (j3.componentWillMount(), j3.state = j3._nextState !== j3.state ? j3._nextState : j3.__s !== j3.state ? j3.__s : j3.state), F3 && F3(r3), H2 = j3.render(j3.props, j3.state, j3.context);
      } else
        for (var L2 = k3.contextType, E2 = L2 && n2[L2.__c], D3 = L2 != null ? E2 ? E2.props.value : L2.__ : n2, N2 = 0; j3.__d && N2++ < 25; )
          j3.__d = false, F3 && F3(r3), H2 = k3.call(r3.__c, O2, D3);
      return j3.getChildContext && (n2 = f2(f2({}, n2), j3.getChildContext())), l.diffed && l.diffed(r3), x3(H2, n2, l4, l4.shallowHighOrder !== false, g4, h3);
    }
    k3 = (w3 = k3).displayName || w3 !== Function && w3.name || function(e2) {
      var t2 = (Function.prototype.toString.call(e2).match(/^\s*function\s+([^( ]+)/) || "")[1];
      if (!t2) {
        for (var r4 = -1, n3 = p3.length; n3--; )
          if (p3[n3] === e2) {
            r4 = n3;
            break;
          }
        r4 < 0 && (r4 = p3.push(e2) - 1), t2 = "UnnamedComponent" + r4;
      }
      return t2;
    }(w3);
  }
  var P2, R2, U2 = "<" + k3;
  if (O2) {
    var W2 = Object.keys(O2);
    l4 && l4.sortAttributes === true && W2.sort();
    for (var q4 = 0; q4 < W2.length; q4++) {
      var z2 = W2[q4], I2 = O2[z2];
      if (z2 !== "children") {
        if (!d3.test(z2) && (l4 && l4.allAttributes || z2 !== "key" && z2 !== "ref" && z2 !== "__self" && z2 !== "__source")) {
          if (z2 === "defaultValue")
            z2 = "value";
          else if (z2 === "className") {
            if (O2.class !== void 0)
              continue;
            z2 = "class";
          } else
            g4 && z2.match(/^xlink:?./) && (z2 = z2.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if (z2 === "htmlFor") {
            if (O2.for)
              continue;
            z2 = "for";
          }
          z2 === "style" && I2 && typeof I2 == "object" && (I2 = s2(I2)), z2[0] === "a" && z2[1] === "r" && typeof I2 == "boolean" && (I2 = String(I2));
          var V2 = l4.attributeHook && l4.attributeHook(z2, I2, n2, l4, C2);
          if (V2 || V2 === "")
            U2 += V2;
          else if (z2 === "dangerouslySetInnerHTML")
            R2 = I2 && I2.__html;
          else if (k3 === "textarea" && z2 === "value")
            P2 = I2;
          else if ((I2 || I2 === 0 || I2 === "") && typeof I2 != "function") {
            if (!(I2 !== true && I2 !== "" || (I2 = z2, l4 && l4.xml))) {
              U2 += " " + z2;
              continue;
            }
            if (z2 === "value") {
              if (k3 === "select") {
                h3 = I2;
                continue;
              }
              k3 === "option" && h3 == I2 && O2.selected === void 0 && (U2 += " selected");
            }
            U2 += " " + z2 + '="' + o2(I2) + '"';
          }
        }
      } else
        P2 = I2;
    }
  }
  if (m3) {
    var Z2 = U2.replace(/\n\s*/, " ");
    Z2 === U2 || ~Z2.indexOf("\n") ? m3 && ~U2.indexOf("\n") && (U2 += "\n") : U2 = Z2;
  }
  if (U2 += ">", d3.test(k3))
    throw new Error(k3 + " is not a valid HTML tag name in " + U2);
  var B3, G2 = _3.test(k3) || l4.voidElements && l4.voidElements.test(k3), J2 = [];
  if (R2)
    m3 && i2(R2) && (R2 = "\n" + y2 + a2(R2, y2)), U2 += R2;
  else if (P2 != null && u2(B3 = [], P2).length) {
    for (var K2 = m3 && ~U2.indexOf("\n"), Q2 = false, X2 = 0; X2 < B3.length; X2++) {
      var Y2 = B3[X2];
      if (Y2 != null && Y2 !== false) {
        var ee = x3(Y2, n2, l4, true, k3 === "svg" || k3 !== "foreignObject" && g4, h3);
        if (m3 && !K2 && i2(ee) && (K2 = true), ee)
          if (m3) {
            var te = ee.length > 0 && ee[0] != "<";
            Q2 && te ? J2[J2.length - 1] += ee : J2.push(ee), Q2 = te;
          } else
            J2.push(ee);
      }
    }
    if (m3 && K2)
      for (var re = J2.length; re--; )
        J2[re] = "\n" + y2 + a2(J2[re], y2);
  }
  if (J2.length || R2)
    U2 += J2.join("");
  else if (l4 && l4.xml)
    return U2.substring(0, U2.length - 1) + " />";
  return !G2 || B3 || R2 ? (m3 && ~U2.indexOf("\n") && (U2 += "\n"), U2 += "</" + k3 + ">") : U2 = U2.replace(/>$/, " />"), U2;
}
m2.shallowRender = g3;
var dist_default = m2;

// js/preact.ts
var { createContext } = compat_module_exports;
var { useDebugValue } = compat_module_exports;
var { useState } = compat_module_exports;
var { useRef } = compat_module_exports;
var { useContext } = compat_module_exports;
var { useLayoutEffect } = compat_module_exports;
var { useEffect } = compat_module_exports;
var { useReducer } = compat_module_exports;
var { useCallback } = compat_module_exports;
var { forwardRef } = compat_module_exports;
var { createElement } = compat_module_exports;
var { createFactory } = compat_module_exports;
var { createRef } = compat_module_exports;
var { Fragment } = compat_module_exports;
var { Component } = compat_module_exports;
var { Suspense } = compat_module_exports;
var { isValidElement } = compat_module_exports;
var { memo } = compat_module_exports;
var { useImperativeHandle } = compat_module_exports;
var { Children } = compat_module_exports;
var { lazy } = compat_module_exports;
var { useMemo } = compat_module_exports;
var { cloneElement } = compat_module_exports;
var preact_default = compat_module_exports;

export {
  $,
  dist_default,
  preact_default
};
