import {
  __esm,
  __export,
  init_define_process
} from "./chunk-chunk-JS5E2TTE.mjs";

// dist/chunk-chunk-N4DRFC7M.mjs
var __defProp, __getOwnPropNames, __esm2, __export2, init_define_process2;
var init_chunk_chunk_N4DRFC7M = __esm({
  "dist/chunk-chunk-N4DRFC7M.mjs"() {
    "use strict";
    init_define_process();
    __defProp = Object.defineProperty;
    __getOwnPropNames = Object.getOwnPropertyNames;
    __esm2 = (fn2, res) => function __init() {
      return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
    };
    __export2 = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    init_define_process2 = __esm2({
      "<define:process>"() {
      }
    });
  }
});

// dist/chunk-chunk-ILR5YIA3.mjs
function s(n2, l3) {
  for (var u3 in l3)
    n2[u3] = l3[u3];
  return n2;
}
function a(n2) {
  var l3 = n2.parentNode;
  l3 && l3.removeChild(n2);
}
function h(l3, u3, i3) {
  var t3, o4, r3, f3 = {};
  for (r3 in u3)
    "key" == r3 ? t3 = u3[r3] : "ref" == r3 ? o4 = u3[r3] : f3[r3] = u3[r3];
  if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i3), "function" == typeof l3 && null != l3.defaultProps)
    for (r3 in l3.defaultProps)
      void 0 === f3[r3] && (f3[r3] = l3.defaultProps[r3]);
  return v(l3, f3, t3, o4, null);
}
function v(n2, i3, t3, o4, r3) {
  var f3 = { type: n2, props: i3, key: t3, ref: o4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r3 ? ++u : r3 };
  return null == r3 && null != l.vnode && l.vnode(f3), f3;
}
function y() {
  return { current: null };
}
function p(n2) {
  return n2.children;
}
function d(n2, l3) {
  this.props = n2, this.context = l3;
}
function _(n2, l3) {
  if (null == l3)
    return n2.__ ? _(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
  for (var u3; l3 < n2.__k.length; l3++)
    if (null != (u3 = n2.__k[l3]) && null != u3.__e)
      return u3.__e;
  return "function" == typeof n2.type ? _(n2) : null;
}
function k(n2) {
  var l3, u3;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++)
      if (null != (u3 = n2.__k[l3]) && null != u3.__e) {
        n2.__e = n2.__c.base = u3.__e;
        break;
      }
    return k(n2);
  }
}
function b(n2) {
  (!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
}
function g() {
  for (var n2; g.__r = t.length; )
    n2 = t.sort(function(n3, l3) {
      return n3.__v.__b - l3.__v.__b;
    }), t = [], n2.some(function(n3) {
      var l3, u3, i3, t3, o4, r3;
      n3.__d && (o4 = (t3 = (l3 = n3).__v).__e, (r3 = l3.__P) && (u3 = [], (i3 = s({}, t3)).__v = t3.__v + 1, j(r3, t3, i3, l3.__n, void 0 !== r3.ownerSVGElement, null != t3.__h ? [o4] : null, u3, null == o4 ? _(t3) : o4, t3.__h), z(u3, t3), t3.__e != o4 && k(t3)));
    });
}
function w(n2, l3, u3, i3, t3, o4, r3, c3, s3, a3) {
  var h3, y3, d3, k4, b3, g4, w4, x4 = i3 && i3.__k || e, C3 = x4.length;
  for (u3.__k = [], h3 = 0; h3 < l3.length; h3++)
    if (null != (k4 = u3.__k[h3] = null == (k4 = l3[h3]) || "boolean" == typeof k4 ? null : "string" == typeof k4 || "number" == typeof k4 || "bigint" == typeof k4 ? v(null, k4, null, null, k4) : Array.isArray(k4) ? v(p, { children: k4 }, null, null, null) : k4.__b > 0 ? v(k4.type, k4.props, k4.key, k4.ref ? k4.ref : null, k4.__v) : k4)) {
      if (k4.__ = u3, k4.__b = u3.__b + 1, null === (d3 = x4[h3]) || d3 && k4.key == d3.key && k4.type === d3.type)
        x4[h3] = void 0;
      else
        for (y3 = 0; y3 < C3; y3++) {
          if ((d3 = x4[y3]) && k4.key == d3.key && k4.type === d3.type) {
            x4[y3] = void 0;
            break;
          }
          d3 = null;
        }
      j(n2, k4, d3 = d3 || f, t3, o4, r3, c3, s3, a3), b3 = k4.__e, (y3 = k4.ref) && d3.ref != y3 && (w4 || (w4 = []), d3.ref && w4.push(d3.ref, null, k4), w4.push(y3, k4.__c || b3, k4)), null != b3 ? (null == g4 && (g4 = b3), "function" == typeof k4.type && k4.__k === d3.__k ? k4.__d = s3 = m(k4, s3, n2) : s3 = A(n2, k4, d3, x4, b3, s3), "function" == typeof u3.type && (u3.__d = s3)) : s3 && d3.__e == s3 && s3.parentNode != n2 && (s3 = _(d3));
    }
  for (u3.__e = g4, h3 = C3; h3--; )
    null != x4[h3] && N(x4[h3], x4[h3]);
  if (w4)
    for (h3 = 0; h3 < w4.length; h3++)
      M(w4[h3], w4[++h3], w4[++h3]);
}
function m(n2, l3, u3) {
  for (var i3, t3 = n2.__k, o4 = 0; t3 && o4 < t3.length; o4++)
    (i3 = t3[o4]) && (i3.__ = n2, l3 = "function" == typeof i3.type ? m(i3, l3, u3) : A(u3, i3, i3, t3, i3.__e, l3));
  return l3;
}
function x(n2, l3) {
  return l3 = l3 || [], null == n2 || "boolean" == typeof n2 || (Array.isArray(n2) ? n2.some(function(n3) {
    x(n3, l3);
  }) : l3.push(n2)), l3;
}
function A(n2, l3, u3, i3, t3, o4) {
  var r3, f3, e3;
  if (void 0 !== l3.__d)
    r3 = l3.__d, l3.__d = void 0;
  else if (null == u3 || t3 != o4 || null == t3.parentNode)
    n:
      if (null == o4 || o4.parentNode !== n2)
        n2.appendChild(t3), r3 = null;
      else {
        for (f3 = o4, e3 = 0; (f3 = f3.nextSibling) && e3 < i3.length; e3 += 2)
          if (f3 == t3)
            break n;
        n2.insertBefore(t3, o4), r3 = o4;
      }
  return void 0 !== r3 ? r3 : t3.nextSibling;
}
function C(n2, l3, u3, i3, t3) {
  var o4;
  for (o4 in u3)
    "children" === o4 || "key" === o4 || o4 in l3 || H(n2, o4, null, u3[o4], i3);
  for (o4 in l3)
    t3 && "function" != typeof l3[o4] || "children" === o4 || "key" === o4 || "value" === o4 || "checked" === o4 || u3[o4] === l3[o4] || H(n2, o4, l3[o4], u3[o4], i3);
}
function $(n2, l3, u3) {
  "-" === l3[0] ? n2.setProperty(l3, u3) : n2[l3] = null == u3 ? "" : "number" != typeof u3 || c.test(l3) ? u3 : u3 + "px";
}
function H(n2, l3, u3, i3, t3) {
  var o4;
  n:
    if ("style" === l3)
      if ("string" == typeof u3)
        n2.style.cssText = u3;
      else {
        if ("string" == typeof i3 && (n2.style.cssText = i3 = ""), i3)
          for (l3 in i3)
            u3 && l3 in u3 || $(n2.style, l3, "");
        if (u3)
          for (l3 in u3)
            i3 && u3[l3] === i3[l3] || $(n2.style, l3, u3[l3]);
      }
    else if ("o" === l3[0] && "n" === l3[1])
      o4 = l3 !== (l3 = l3.replace(/Capture$/, "")), l3 = l3.toLowerCase() in n2 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + o4] = u3, u3 ? i3 || n2.addEventListener(l3, o4 ? T : I, o4) : n2.removeEventListener(l3, o4 ? T : I, o4);
    else if ("dangerouslySetInnerHTML" !== l3) {
      if (t3)
        l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("href" !== l3 && "list" !== l3 && "form" !== l3 && "tabIndex" !== l3 && "download" !== l3 && l3 in n2)
        try {
          n2[l3] = null == u3 ? "" : u3;
          break n;
        } catch (n3) {
        }
      "function" == typeof u3 || (null == u3 || false === u3 && -1 == l3.indexOf("-") ? n2.removeAttribute(l3) : n2.setAttribute(l3, u3));
    }
}
function I(n2) {
  this.l[n2.type + false](l.event ? l.event(n2) : n2);
}
function T(n2) {
  this.l[n2.type + true](l.event ? l.event(n2) : n2);
}
function j(n2, u3, i3, t3, o4, r3, f3, e3, c3) {
  var a3, h3, v3, y3, _4, k4, b3, g4, m3, x4, A4, C3, $3, H3, I3, T4 = u3.type;
  if (void 0 !== u3.constructor)
    return null;
  null != i3.__h && (c3 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, r3 = [e3]), (a3 = l.__b) && a3(u3);
  try {
    n:
      if ("function" == typeof T4) {
        if (g4 = u3.props, m3 = (a3 = T4.contextType) && t3[a3.__c], x4 = a3 ? m3 ? m3.props.value : a3.__ : t3, i3.__c ? b3 = (h3 = u3.__c = i3.__c).__ = h3.__E : ("prototype" in T4 && T4.prototype.render ? u3.__c = h3 = new T4(g4, x4) : (u3.__c = h3 = new d(g4, x4), h3.constructor = T4, h3.render = O), m3 && m3.sub(h3), h3.props = g4, h3.state || (h3.state = {}), h3.context = x4, h3.__n = t3, v3 = h3.__d = true, h3.__h = [], h3._sb = []), null == h3.__s && (h3.__s = h3.state), null != T4.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = s({}, h3.__s)), s(h3.__s, T4.getDerivedStateFromProps(g4, h3.__s))), y3 = h3.props, _4 = h3.state, v3)
          null == T4.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
        else {
          if (null == T4.getDerivedStateFromProps && g4 !== y3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(g4, x4), !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(g4, h3.__s, x4) || u3.__v === i3.__v) {
            for (h3.props = g4, h3.state = h3.__s, u3.__v !== i3.__v && (h3.__d = false), h3.__v = u3, u3.__e = i3.__e, u3.__k = i3.__k, u3.__k.forEach(function(n3) {
              n3 && (n3.__ = u3);
            }), A4 = 0; A4 < h3._sb.length; A4++)
              h3.__h.push(h3._sb[A4]);
            h3._sb = [], h3.__h.length && f3.push(h3);
            break n;
          }
          null != h3.componentWillUpdate && h3.componentWillUpdate(g4, h3.__s, x4), null != h3.componentDidUpdate && h3.__h.push(function() {
            h3.componentDidUpdate(y3, _4, k4);
          });
        }
        if (h3.context = x4, h3.props = g4, h3.__v = u3, h3.__P = n2, C3 = l.__r, $3 = 0, "prototype" in T4 && T4.prototype.render) {
          for (h3.state = h3.__s, h3.__d = false, C3 && C3(u3), a3 = h3.render(h3.props, h3.state, h3.context), H3 = 0; H3 < h3._sb.length; H3++)
            h3.__h.push(h3._sb[H3]);
          h3._sb = [];
        } else
          do {
            h3.__d = false, C3 && C3(u3), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
          } while (h3.__d && ++$3 < 25);
        h3.state = h3.__s, null != h3.getChildContext && (t3 = s(s({}, t3), h3.getChildContext())), v3 || null == h3.getSnapshotBeforeUpdate || (k4 = h3.getSnapshotBeforeUpdate(y3, _4)), I3 = null != a3 && a3.type === p && null == a3.key ? a3.props.children : a3, w(n2, Array.isArray(I3) ? I3 : [I3], u3, i3, t3, o4, r3, f3, e3, c3), h3.base = u3.__e, u3.__h = null, h3.__h.length && f3.push(h3), b3 && (h3.__E = h3.__ = null), h3.__e = false;
      } else
        null == r3 && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = L(i3.__e, u3, i3, t3, o4, r3, f3, c3);
    (a3 = l.diffed) && a3(u3);
  } catch (n3) {
    u3.__v = null, (c3 || null != r3) && (u3.__e = e3, u3.__h = !!c3, r3[r3.indexOf(e3)] = null), l.__e(n3, u3, i3);
  }
}
function z(n2, u3) {
  l.__c && l.__c(u3, n2), n2.some(function(u4) {
    try {
      n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
        n3.call(u4);
      });
    } catch (n3) {
      l.__e(n3, u4.__v);
    }
  });
}
function L(l3, u3, i3, t3, o4, r3, e3, c3) {
  var s3, h3, v3, y3 = i3.props, p3 = u3.props, d3 = u3.type, k4 = 0;
  if ("svg" === d3 && (o4 = true), null != r3) {
    for (; k4 < r3.length; k4++)
      if ((s3 = r3[k4]) && "setAttribute" in s3 == !!d3 && (d3 ? s3.localName === d3 : 3 === s3.nodeType)) {
        l3 = s3, r3[k4] = null;
        break;
      }
  }
  if (null == l3) {
    if (null === d3)
      return document.createTextNode(p3);
    l3 = o4 ? document.createElementNS("http://www.w3.org/2000/svg", d3) : document.createElement(d3, p3.is && p3), r3 = null, c3 = false;
  }
  if (null === d3)
    y3 === p3 || c3 && l3.data === p3 || (l3.data = p3);
  else {
    if (r3 = r3 && n.call(l3.childNodes), h3 = (y3 = i3.props || f).dangerouslySetInnerHTML, v3 = p3.dangerouslySetInnerHTML, !c3) {
      if (null != r3)
        for (y3 = {}, k4 = 0; k4 < l3.attributes.length; k4++)
          y3[l3.attributes[k4].name] = l3.attributes[k4].value;
      (v3 || h3) && (v3 && (h3 && v3.__html == h3.__html || v3.__html === l3.innerHTML) || (l3.innerHTML = v3 && v3.__html || ""));
    }
    if (C(l3, p3, y3, o4, c3), v3)
      u3.__k = [];
    else if (k4 = u3.props.children, w(l3, Array.isArray(k4) ? k4 : [k4], u3, i3, t3, o4 && "foreignObject" !== d3, r3, e3, r3 ? r3[0] : i3.__k && _(i3, 0), c3), null != r3)
      for (k4 = r3.length; k4--; )
        null != r3[k4] && a(r3[k4]);
    c3 || ("value" in p3 && void 0 !== (k4 = p3.value) && (k4 !== l3.value || "progress" === d3 && !k4 || "option" === d3 && k4 !== y3.value) && H(l3, "value", k4, y3.value, false), "checked" in p3 && void 0 !== (k4 = p3.checked) && k4 !== l3.checked && H(l3, "checked", k4, y3.checked, false));
  }
  return l3;
}
function M(n2, u3, i3) {
  try {
    "function" == typeof n2 ? n2(u3) : n2.current = u3;
  } catch (n3) {
    l.__e(n3, i3);
  }
}
function N(n2, u3, i3) {
  var t3, o4;
  if (l.unmount && l.unmount(n2), (t3 = n2.ref) && (t3.current && t3.current !== n2.__e || M(t3, null, u3)), null != (t3 = n2.__c)) {
    if (t3.componentWillUnmount)
      try {
        t3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u3);
      }
    t3.base = t3.__P = null, n2.__c = void 0;
  }
  if (t3 = n2.__k)
    for (o4 = 0; o4 < t3.length; o4++)
      t3[o4] && N(t3[o4], u3, i3 || "function" != typeof n2.type);
  i3 || null == n2.__e || a(n2.__e), n2.__ = n2.__e = n2.__d = void 0;
}
function O(n2, l3, u3) {
  return this.constructor(n2, u3);
}
function P(u3, i3, t3) {
  var o4, r3, e3;
  l.__ && l.__(u3, i3), r3 = (o4 = "function" == typeof t3) ? null : t3 && t3.__k || i3.__k, e3 = [], j(i3, u3 = (!o4 && t3 || i3).__k = h(p, null, [u3]), r3 || f, f, void 0 !== i3.ownerSVGElement, !o4 && t3 ? [t3] : r3 ? null : i3.firstChild ? n.call(i3.childNodes) : null, e3, !o4 && t3 ? t3 : r3 ? r3.__e : i3.firstChild, o4), z(e3, u3);
}
function S(n2, l3) {
  P(n2, l3, S);
}
function q(l3, u3, i3) {
  var t3, o4, r3, f3 = s({}, l3.props);
  for (r3 in u3)
    "key" == r3 ? t3 = u3[r3] : "ref" == r3 ? o4 = u3[r3] : f3[r3] = u3[r3];
  return arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i3), v(l3.type, f3, t3 || l3.key, o4 || l3.ref, null);
}
function B(n2, l3) {
  var u3 = { __c: l3 = "__cC" + r++, __: n2, Consumer: function(n3, l4) {
    return n3.children(l4);
  }, Provider: function(n3) {
    var u4, i3;
    return this.getChildContext || (u4 = [], (i3 = {})[l3] = this, this.getChildContext = function() {
      return i3;
    }, this.shouldComponentUpdate = function(n4) {
      this.props.value !== n4.value && u4.some(b);
    }, this.sub = function(n4) {
      u4.push(n4);
      var l4 = n4.componentWillUnmount;
      n4.componentWillUnmount = function() {
        u4.splice(u4.indexOf(n4), 1), l4 && l4.call(n4);
      };
    }), n3.children;
  } };
  return u3.Provider.__ = u3.Consumer.contextType = u3;
}
function d2(t3, u3) {
  l.__h && l.__h(r2, t3, o2 || u3), o2 = 0;
  var i3 = r2.__H || (r2.__H = { __: [], __h: [] });
  return t3 >= i3.__.length && i3.__.push({ __V: c2 }), i3.__[t3];
}
function p2(n2) {
  return o2 = 1, y2(B2, n2);
}
function y2(n2, u3, i3) {
  var o4 = d2(t2++, 2);
  if (o4.t = n2, !o4.__c && (o4.__ = [i3 ? i3(u3) : B2(void 0, u3), function(n3) {
    var t3 = o4.__N ? o4.__N[0] : o4.__[0], r3 = o4.t(t3, n3);
    t3 !== r3 && (o4.__N = [r3, o4.__[1]], o4.__c.setState({}));
  }], o4.__c = r2, !r2.u)) {
    r2.u = true;
    var f3 = r2.shouldComponentUpdate;
    r2.shouldComponentUpdate = function(n3, t3, r3) {
      if (!o4.__c.__H)
        return true;
      var u4 = o4.__c.__H.__.filter(function(n4) {
        return n4.__c;
      });
      if (u4.every(function(n4) {
        return !n4.__N;
      }))
        return !f3 || f3.call(this, n3, t3, r3);
      var i4 = false;
      return u4.forEach(function(n4) {
        if (n4.__N) {
          var t4 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
        }
      }), !(!i4 && o4.__c.props === n3) && (!f3 || f3.call(this, n3, t3, r3));
    };
  }
  return o4.__N || o4.__;
}
function h2(u3, i3) {
  var o4 = d2(t2++, 3);
  !l.__s && z2(o4.__H, i3) && (o4.__ = u3, o4.i = i3, r2.__H.__h.push(o4));
}
function s2(u3, i3) {
  var o4 = d2(t2++, 4);
  !l.__s && z2(o4.__H, i3) && (o4.__ = u3, o4.i = i3, r2.__h.push(o4));
}
function _2(n2) {
  return o2 = 5, F(function() {
    return { current: n2 };
  }, []);
}
function A2(n2, t3, r3) {
  o2 = 6, s2(function() {
    return "function" == typeof n2 ? (n2(t3()), function() {
      return n2(null);
    }) : n2 ? (n2.current = t3(), function() {
      return n2.current = null;
    }) : void 0;
  }, null == r3 ? r3 : r3.concat(n2));
}
function F(n2, r3) {
  var u3 = d2(t2++, 7);
  return z2(u3.__H, r3) ? (u3.__V = n2(), u3.i = r3, u3.__h = n2, u3.__V) : u3.__;
}
function T2(n2, t3) {
  return o2 = 8, F(function() {
    return n2;
  }, t3);
}
function q2(n2) {
  var u3 = r2.context[n2.__c], i3 = d2(t2++, 9);
  return i3.c = n2, u3 ? (null == i3.__ && (i3.__ = true, u3.sub(r2)), u3.props.value) : n2.__;
}
function x2(t3, r3) {
  l.useDebugValue && l.useDebugValue(r3 ? r3(t3) : t3);
}
function P2(n2) {
  var u3 = d2(t2++, 10), i3 = p2();
  return u3.__ = n2, r2.componentDidCatch || (r2.componentDidCatch = function(n3, t3) {
    u3.__ && u3.__(n3, t3), i3[1](n3);
  }), [i3[0], function() {
    i3[1](void 0);
  }];
}
function V() {
  var n2 = d2(t2++, 11);
  return n2.__ || (n2.__ = "P" + function(n3) {
    for (var t3 = 0, r3 = n3.length; r3 > 0; )
      t3 = (t3 << 5) - t3 + n3.charCodeAt(--r3) | 0;
    return t3;
  }(r2.__v.__m) + t2), n2.__;
}
function b2() {
  for (var t3; t3 = f2.shift(); )
    if (t3.__P && t3.__H)
      try {
        t3.__H.__h.forEach(k2), t3.__H.__h.forEach(w2), t3.__H.__h = [];
      } catch (r3) {
        t3.__H.__h = [], l.__e(r3, t3.__v);
      }
}
function j2(n2) {
  var t3, r3 = function() {
    clearTimeout(u3), g2 && cancelAnimationFrame(t3), setTimeout(n2);
  }, u3 = setTimeout(r3, 100);
  g2 && (t3 = requestAnimationFrame(r3));
}
function k2(n2) {
  var t3 = r2, u3 = n2.__c;
  "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
}
function w2(n2) {
  var t3 = r2;
  n2.__c = n2.__(), r2 = t3;
}
function z2(n2, t3) {
  return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
    return t4 !== n2[r3];
  });
}
function B2(n2, t3) {
  return "function" == typeof t3 ? t3(n2) : t3;
}
function g3(n2, t3) {
  for (var e3 in t3)
    n2[e3] = t3[e3];
  return n2;
}
function C2(n2, t3) {
  for (var e3 in n2)
    if ("__source" !== e3 && !(e3 in t3))
      return true;
  for (var r3 in t3)
    if ("__source" !== r3 && n2[r3] !== t3[r3])
      return true;
  return false;
}
function E(n2) {
  this.props = n2;
}
function w3(n2, e3) {
  function r3(n3) {
    var t3 = this.props.ref, r4 = t3 == n3.ref;
    return !r4 && t3 && (t3.call ? t3(null) : t3.current = null), e3 ? !e3(this.props, n3) || !r4 : C2(this.props, n3);
  }
  function u3(e4) {
    return this.shouldComponentUpdate = r3, h(n2, e4);
  }
  return u3.displayName = "Memo(" + (n2.displayName || n2.name) + ")", u3.prototype.isReactComponent = true, u3.__f = true, u3;
}
function N2(n2) {
  function t3(t4) {
    var e3 = g3({}, t4);
    return delete e3.ref, n2(e3, t4.ref || null);
  }
  return t3.$$typeof = x3, t3.render = t3, t3.prototype.isReactComponent = t3.__f = true, t3.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t3;
}
function I2(n2, t3, e3) {
  return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
    "function" == typeof n3.__c && n3.__c();
  }), n2.__c.__H = null), null != (n2 = g3({}, n2)).__c && (n2.__c.__P === e3 && (n2.__c.__P = t3), n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
    return I2(n3, t3, e3);
  })), n2;
}
function L2(n2, t3, e3) {
  return n2 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
    return L2(n3, t3, e3);
  }), n2.__c && n2.__c.__P === t3 && (n2.__e && e3.insertBefore(n2.__e, n2.__d), n2.__c.__e = true, n2.__c.__P = e3)), n2;
}
function U() {
  this.__u = 0, this.t = null, this.__b = null;
}
function D(n2) {
  var t3 = n2.__.__c;
  return t3 && t3.__a && t3.__a(n2);
}
function F2(n2) {
  var e3, r3, u3;
  function o4(o5) {
    if (e3 || (e3 = n2()).then(function(n3) {
      r3 = n3.default || n3;
    }, function(n3) {
      u3 = n3;
    }), u3)
      throw u3;
    if (!r3)
      throw e3;
    return h(r3, o5);
  }
  return o4.displayName = "Lazy", o4.__f = true, o4;
}
function M2() {
  this.u = null, this.o = null;
}
function W(n2) {
  return this.getChildContext = function() {
    return n2.context;
  }, n2.children;
}
function P3(n2) {
  var e3 = this, r3 = n2.i;
  e3.componentWillUnmount = function() {
    P(null, e3.l), e3.l = null, e3.i = null;
  }, e3.i && e3.i !== r3 && e3.componentWillUnmount(), n2.__v ? (e3.l || (e3.i = r3, e3.l = { nodeType: 1, parentNode: r3, childNodes: [], appendChild: function(n3) {
    this.childNodes.push(n3), e3.i.appendChild(n3);
  }, insertBefore: function(n3, t3) {
    this.childNodes.push(n3), e3.i.appendChild(n3);
  }, removeChild: function(n3) {
    this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), e3.i.removeChild(n3);
  } }), P(h(W, { context: e3.context }, n2.__v), e3.l)) : e3.l && e3.componentWillUnmount();
}
function $2(n2, e3) {
  var r3 = h(P3, { __v: n2, i: e3 });
  return r3.containerInfo = e3, r3;
}
function Z(n2, t3, e3) {
  return null == t3.__k && (t3.textContent = ""), P(n2, t3), "function" == typeof e3 && e3(), n2 ? n2.__c : null;
}
function Y(n2, t3, e3) {
  return S(n2, t3), "function" == typeof e3 && e3(), n2 ? n2.__c : null;
}
function G() {
}
function J() {
  return this.cancelBubble;
}
function K() {
  return this.defaultPrevented;
}
function un(n2) {
  return h.bind(null, n2);
}
function on(n2) {
  return !!n2 && n2.$$typeof === j3;
}
function ln(n2) {
  return on(n2) ? q.apply(null, arguments) : n2;
}
function cn(n2) {
  return !!n2.__k && (P(null, n2), true);
}
function fn(n2) {
  return n2 && (n2.base || 1 === n2.nodeType && n2) || null;
}
function vn(n2) {
  n2();
}
function dn(n2) {
  return n2;
}
function pn() {
  return [false, vn];
}
function yn(n2, t3) {
  var e3 = t3(), r3 = p2({ h: { __: e3, v: t3 } }), u3 = r3[0].h, o4 = r3[1];
  return s2(function() {
    u3.__ = e3, u3.v = t3, u3.__ !== t3() && o4({ h: u3 });
  }, [n2, e3, t3]), h2(function() {
    return u3.__ !== u3.v() && o4({ h: u3 }), n2(function() {
      u3.__ !== u3.v() && o4({ h: u3 });
    });
  }, [n2]), e3;
}
function o3(o4, e3, n2, t3, f3) {
  var l3, s3, u3 = {};
  for (s3 in e3)
    "ref" == s3 ? l3 = e3[s3] : u3[s3] = e3[s3];
  var a3 = { type: o4, props: u3, key: n2, ref: l3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_3, __source: f3, __self: t3 };
  if ("function" == typeof o4 && (l3 = o4.defaultProps))
    for (s3 in l3)
      void 0 === u3[s3] && (u3[s3] = l3[s3]);
  return l.vnode && l.vnode(a3), a3;
}
function createRoot(container) {
  return {
    render(children) {
      render(children, container);
    },
    unmount() {
      unmountComponentAtNode(container);
    }
  };
}
var n, l, u, i, t, o, r, f, e, c, init_preact_module, t2, r2, u2, i2, o2, f2, c2, e2, a2, v2, l2, m2, g2, init_hooks_module, compat_module_exports, R, x3, k3, A3, O2, T3, V2, j3, z3, B3, H2, q3, Q, X, nn, tn, en, rn, an, sn, hn, mn, _n, init_compat_module, _3, init_jsxRuntime_module, init_jsx_runtime, react_preact_exports, render, unmountComponentAtNode, Fragment, createPortal, flushSync, hydrate, Children, Component, PureComponent, StrictMode, Suspense, cloneElement, createContext, createElement, createFactory, createRef, forwardRef, isValidElement, lazy, memo, startTransition, useCallback, useContext, useDebugValue, useDeferredValue, useEffect, useId, useImperativeHandle, useInsertionEffect, useLayoutEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore, useTransition, version, props, init_react_preact;
var init_chunk_chunk_ILR5YIA3 = __esm({
  "dist/chunk-chunk-ILR5YIA3.mjs"() {
    "use strict";
    init_define_process();
    init_chunk_chunk_N4DRFC7M();
    init_preact_module = __esm2({
      "../../.yarn/global/cache/preact-npm-10.11.2-8aa7294674-9.zip/node_modules/preact/dist/preact.module.js"() {
        init_define_process2();
        f = {};
        e = [];
        c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
        n = e.slice, l = { __e: function(n2, l3, u3, i3) {
          for (var t3, o4, r3; l3 = l3.__; )
            if ((t3 = l3.__c) && !t3.__)
              try {
                if ((o4 = t3.constructor) && null != o4.getDerivedStateFromError && (t3.setState(o4.getDerivedStateFromError(n2)), r3 = t3.__d), null != t3.componentDidCatch && (t3.componentDidCatch(n2, i3 || {}), r3 = t3.__d), r3)
                  return t3.__E = t3;
              } catch (l4) {
                n2 = l4;
              }
          throw n2;
        } }, u = 0, i = function(n2) {
          return null != n2 && void 0 === n2.constructor;
        }, d.prototype.setState = function(n2, l3) {
          var u3;
          u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n2 && (n2 = n2(s({}, u3), this.props)), n2 && s(u3, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), b(this));
        }, d.prototype.forceUpdate = function(n2) {
          this.__v && (this.__e = true, n2 && this.__h.push(n2), b(this));
        }, d.prototype.render = p, t = [], g.__r = 0, r = 0;
      }
    });
    init_hooks_module = __esm2({
      "../../.yarn/global/cache/preact-npm-10.11.2-8aa7294674-9.zip/node_modules/preact/hooks/dist/hooks.module.js"() {
        init_define_process2();
        init_preact_module();
        o2 = 0;
        f2 = [];
        c2 = [];
        e2 = l.__b;
        a2 = l.__r;
        v2 = l.diffed;
        l2 = l.__c;
        m2 = l.unmount;
        l.__b = function(n2) {
          "function" != typeof n2.type || n2.__m || null === n2.__ ? n2.__m || (n2.__m = n2.__ && n2.__.__m ? n2.__.__m : "") : n2.__m = (n2.__ && n2.__.__m ? n2.__.__m : "") + (n2.__ && n2.__.__k ? n2.__.__k.indexOf(n2) : 0), r2 = null, e2 && e2(n2);
        }, l.__r = function(n2) {
          a2 && a2(n2), t2 = 0;
          var i3 = (r2 = n2.__c).__H;
          i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.forEach(function(n3) {
            n3.__N && (n3.__ = n3.__N), n3.__V = c2, n3.__N = n3.i = void 0;
          })) : (i3.__h.forEach(k2), i3.__h.forEach(w2), i3.__h = [])), u2 = r2;
        }, l.diffed = function(t3) {
          v2 && v2(t3);
          var o4 = t3.__c;
          o4 && o4.__H && (o4.__H.__h.length && (1 !== f2.push(o4) && i2 === l.requestAnimationFrame || ((i2 = l.requestAnimationFrame) || j2)(b2)), o4.__H.__.forEach(function(n2) {
            n2.i && (n2.__H = n2.i), n2.__V !== c2 && (n2.__ = n2.__V), n2.i = void 0, n2.__V = c2;
          })), u2 = r2 = null;
        }, l.__c = function(t3, r3) {
          r3.some(function(t4) {
            try {
              t4.__h.forEach(k2), t4.__h = t4.__h.filter(function(n2) {
                return !n2.__ || w2(n2);
              });
            } catch (u3) {
              r3.some(function(n2) {
                n2.__h && (n2.__h = []);
              }), r3 = [], l.__e(u3, t4.__v);
            }
          }), l2 && l2(t3, r3);
        }, l.unmount = function(t3) {
          m2 && m2(t3);
          var r3, u3 = t3.__c;
          u3 && u3.__H && (u3.__H.__.forEach(function(n2) {
            try {
              k2(n2);
            } catch (n3) {
              r3 = n3;
            }
          }), u3.__H = void 0, r3 && l.__e(r3, u3.__v));
        };
        g2 = "function" == typeof requestAnimationFrame;
      }
    });
    compat_module_exports = {};
    __export2(compat_module_exports, {
      Children: () => A3,
      Component: () => d,
      Fragment: () => p,
      PureComponent: () => E,
      StrictMode: () => hn,
      Suspense: () => U,
      SuspenseList: () => M2,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => en,
      cloneElement: () => ln,
      createContext: () => B,
      createElement: () => h,
      createFactory: () => un,
      createPortal: () => $2,
      createRef: () => y,
      default: () => _n,
      findDOMNode: () => fn,
      flushSync: () => sn,
      forwardRef: () => N2,
      hydrate: () => Y,
      isValidElement: () => on,
      lazy: () => F2,
      memo: () => w3,
      render: () => Z,
      startTransition: () => vn,
      unmountComponentAtNode: () => cn,
      unstable_batchedUpdates: () => an,
      useCallback: () => T2,
      useContext: () => q2,
      useDebugValue: () => x2,
      useDeferredValue: () => dn,
      useEffect: () => h2,
      useErrorBoundary: () => P2,
      useId: () => V,
      useImperativeHandle: () => A2,
      useInsertionEffect: () => mn,
      useLayoutEffect: () => s2,
      useMemo: () => F,
      useReducer: () => y2,
      useRef: () => _2,
      useState: () => p2,
      useSyncExternalStore: () => yn,
      useTransition: () => pn,
      version: () => rn
    });
    init_compat_module = __esm2({
      "../../.yarn/global/cache/preact-npm-10.11.2-8aa7294674-9.zip/node_modules/preact/compat/dist/compat.module.js"() {
        init_define_process2();
        init_preact_module();
        init_preact_module();
        init_hooks_module();
        init_hooks_module();
        (E.prototype = new d()).isPureReactComponent = true, E.prototype.shouldComponentUpdate = function(n2, t3) {
          return C2(this.props, n2) || C2(this.state, t3);
        };
        R = l.__b;
        l.__b = function(n2) {
          n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), R && R(n2);
        };
        x3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
        k3 = function(n2, t3) {
          return null == n2 ? null : x(x(n2).map(t3));
        };
        A3 = { map: k3, forEach: k3, count: function(n2) {
          return n2 ? x(n2).length : 0;
        }, only: function(n2) {
          var t3 = x(n2);
          if (1 !== t3.length)
            throw "Children.only";
          return t3[0];
        }, toArray: x };
        O2 = l.__e;
        l.__e = function(n2, t3, e3, r3) {
          if (n2.then) {
            for (var u3, o4 = t3; o4 = o4.__; )
              if ((u3 = o4.__c) && u3.__c)
                return null == t3.__e && (t3.__e = e3.__e, t3.__k = e3.__k), u3.__c(n2, t3);
          }
          O2(n2, t3, e3, r3);
        };
        T3 = l.unmount;
        l.unmount = function(n2) {
          var t3 = n2.__c;
          t3 && t3.__R && t3.__R(), t3 && true === n2.__h && (n2.type = null), T3 && T3(n2);
        }, (U.prototype = new d()).__c = function(n2, t3) {
          var e3 = t3.__c, r3 = this;
          null == r3.t && (r3.t = []), r3.t.push(e3);
          var u3 = D(r3.__v), o4 = false, i3 = function() {
            o4 || (o4 = true, e3.__R = null, u3 ? u3(l3) : l3());
          };
          e3.__R = i3;
          var l3 = function() {
            if (!--r3.__u) {
              if (r3.state.__a) {
                var n3 = r3.state.__a;
                r3.__v.__k[0] = L2(n3, n3.__c.__P, n3.__c.__O);
              }
              var t4;
              for (r3.setState({ __a: r3.__b = null }); t4 = r3.t.pop(); )
                t4.forceUpdate();
            }
          }, c3 = true === t3.__h;
          r3.__u++ || c3 || r3.setState({ __a: r3.__b = r3.__v.__k[0] }), n2.then(i3, i3);
        }, U.prototype.componentWillUnmount = function() {
          this.t = [];
        }, U.prototype.render = function(n2, e3) {
          if (this.__b) {
            if (this.__v.__k) {
              var r3 = document.createElement("div"), o4 = this.__v.__k[0].__c;
              this.__v.__k[0] = I2(this.__b, r3, o4.__O = o4.__P);
            }
            this.__b = null;
          }
          var i3 = e3.__a && h(p, null, n2.fallback);
          return i3 && (i3.__h = null), [h(p, null, e3.__a ? null : n2.children), i3];
        };
        V2 = function(n2, t3, e3) {
          if (++e3[1] === e3[0] && n2.o.delete(t3), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.o.size))
            for (e3 = n2.u; e3; ) {
              for (; e3.length > 3; )
                e3.pop()();
              if (e3[1] < e3[0])
                break;
              n2.u = e3 = e3[2];
            }
        };
        (M2.prototype = new d()).__a = function(n2) {
          var t3 = this, e3 = D(t3.__v), r3 = t3.o.get(n2);
          return r3[0]++, function(u3) {
            var o4 = function() {
              t3.props.revealOrder ? (r3.push(u3), V2(t3, n2, r3)) : u3();
            };
            e3 ? e3(o4) : o4();
          };
        }, M2.prototype.render = function(n2) {
          this.u = null, this.o = /* @__PURE__ */ new Map();
          var t3 = x(n2.children);
          n2.revealOrder && "b" === n2.revealOrder[0] && t3.reverse();
          for (var e3 = t3.length; e3--; )
            this.o.set(t3[e3], this.u = [1, 0, this.u]);
          return n2.children;
        }, M2.prototype.componentDidUpdate = M2.prototype.componentDidMount = function() {
          var n2 = this;
          this.o.forEach(function(t3, e3) {
            V2(n2, e3, t3);
          });
        };
        j3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
        z3 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
        B3 = "undefined" != typeof document;
        H2 = function(n2) {
          return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n2);
        };
        d.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t3) {
          Object.defineProperty(d.prototype, t3, { configurable: true, get: function() {
            return this["UNSAFE_" + t3];
          }, set: function(n2) {
            Object.defineProperty(this, t3, { configurable: true, writable: true, value: n2 });
          } });
        });
        q3 = l.event;
        l.event = function(n2) {
          return q3 && (n2 = q3(n2)), n2.persist = G, n2.isPropagationStopped = J, n2.isDefaultPrevented = K, n2.nativeEvent = n2;
        };
        X = { configurable: true, get: function() {
          return this.class;
        } };
        nn = l.vnode;
        l.vnode = function(n2) {
          var t3 = n2.type, e3 = n2.props, u3 = e3;
          if ("string" == typeof t3) {
            var o4 = -1 === t3.indexOf("-");
            for (var i3 in u3 = {}, e3) {
              var l3 = e3[i3];
              B3 && "children" === i3 && "noscript" === t3 || "value" === i3 && "defaultValue" in e3 && null == l3 || ("defaultValue" === i3 && "value" in e3 && null == e3.value ? i3 = "value" : "download" === i3 && true === l3 ? l3 = "" : /ondoubleclick/i.test(i3) ? i3 = "ondblclick" : /^onchange(textarea|input)/i.test(i3 + t3) && !H2(e3.type) ? i3 = "oninput" : /^onfocus$/i.test(i3) ? i3 = "onfocusin" : /^onblur$/i.test(i3) ? i3 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i3) ? i3 = i3.toLowerCase() : o4 && z3.test(i3) ? i3 = i3.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === l3 && (l3 = void 0), /^oninput$/i.test(i3) && (i3 = i3.toLowerCase(), u3[i3] && (i3 = "oninputCapture")), u3[i3] = l3);
            }
            "select" == t3 && u3.multiple && Array.isArray(u3.value) && (u3.value = x(e3.children).forEach(function(n3) {
              n3.props.selected = -1 != u3.value.indexOf(n3.props.value);
            })), "select" == t3 && null != u3.defaultValue && (u3.value = x(e3.children).forEach(function(n3) {
              n3.props.selected = u3.multiple ? -1 != u3.defaultValue.indexOf(n3.props.value) : u3.defaultValue == n3.props.value;
            })), n2.props = u3, e3.class != e3.className && (X.enumerable = "className" in e3, null != e3.className && (u3.class = e3.className), Object.defineProperty(u3, "className", X));
          }
          n2.$$typeof = j3, nn && nn(n2);
        };
        tn = l.__r;
        l.__r = function(n2) {
          tn && tn(n2), Q = n2.__c;
        };
        en = { ReactCurrentDispatcher: { current: { readContext: function(n2) {
          return Q.__n[n2.__c].props.value;
        } } } };
        rn = "17.0.2";
        an = function(n2, t3) {
          return n2(t3);
        };
        sn = function(n2, t3) {
          return n2(t3);
        };
        hn = p;
        mn = s2;
        _n = { useState: p2, useId: V, useReducer: y2, useEffect: h2, useLayoutEffect: s2, useInsertionEffect: mn, useTransition: pn, useDeferredValue: dn, useSyncExternalStore: yn, startTransition: vn, useRef: _2, useImperativeHandle: A2, useMemo: F, useCallback: T2, useContext: q2, useDebugValue: x2, version: "17.0.2", Children: A3, render: Z, hydrate: Y, unmountComponentAtNode: cn, createPortal: $2, createElement: h, createContext: B, createFactory: un, cloneElement: ln, createRef: y, Fragment: p, isValidElement: on, findDOMNode: fn, Component: d, PureComponent: E, memo: w3, forwardRef: N2, flushSync: sn, unstable_batchedUpdates: an, StrictMode: hn, Suspense: U, SuspenseList: M2, lazy: F2, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: en };
      }
    });
    init_jsxRuntime_module = __esm2({
      "../../.yarn/global/cache/preact-npm-10.11.2-8aa7294674-9.zip/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js"() {
        init_define_process2();
        init_preact_module();
        init_preact_module();
        _3 = 0;
      }
    });
    init_jsx_runtime = __esm2({
      "../../.yarn/global/cache/preact-npm-10.11.2-8aa7294674-9.zip/node_modules/preact/compat/jsx-runtime.mjs"() {
        init_define_process2();
        init_compat_module();
        init_jsxRuntime_module();
      }
    });
    react_preact_exports = {};
    __export2(react_preact_exports, {
      Children: () => Children,
      Component: () => Component,
      Fragment: () => Fragment,
      PureComponent: () => PureComponent,
      StrictMode: () => StrictMode,
      Suspense: () => Suspense,
      cloneElement: () => cloneElement,
      createContext: () => createContext,
      createElement: () => createElement,
      createFactory: () => createFactory,
      createPortal: () => createPortal,
      createRef: () => createRef,
      createRoot: () => createRoot,
      default: () => _n,
      flushSync: () => flushSync,
      forwardRef: () => forwardRef,
      hydrate: () => hydrate,
      isValidElement: () => isValidElement,
      jsx: () => o3,
      jsxs: () => o3,
      lazy: () => lazy,
      memo: () => memo,
      props: () => props,
      render: () => render,
      startTransition: () => startTransition,
      unmountComponentAtNode: () => unmountComponentAtNode,
      useCallback: () => useCallback,
      useContext: () => useContext,
      useDebugValue: () => useDebugValue,
      useDeferredValue: () => useDeferredValue,
      useEffect: () => useEffect,
      useId: () => useId,
      useImperativeHandle: () => useImperativeHandle,
      useInsertionEffect: () => useInsertionEffect,
      useLayoutEffect: () => useLayoutEffect,
      useMemo: () => useMemo,
      useReducer: () => useReducer,
      useRef: () => useRef,
      useState: () => useState,
      useSyncExternalStore: () => useSyncExternalStore,
      useTransition: () => useTransition,
      version: () => version
    });
    init_react_preact = __esm2({
      "js/react-preact.ts"() {
        init_define_process2();
        init_jsx_runtime();
        init_compat_module();
        init_compat_module();
        ({
          render,
          unmountComponentAtNode,
          Fragment,
          createPortal,
          flushSync,
          hydrate,
          Children,
          Component,
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
          useState,
          useSyncExternalStore,
          useTransition,
          version,
          ...props
        } = compat_module_exports);
      }
    });
  }
});

// dist/react-preact.mjs
var react_preact_exports2 = {};
__export(react_preact_exports2, {
  Children: () => Children,
  Component: () => Component,
  Fragment: () => Fragment,
  PureComponent: () => PureComponent,
  StrictMode: () => StrictMode,
  Suspense: () => Suspense,
  cloneElement: () => cloneElement,
  createContext: () => createContext,
  createElement: () => createElement,
  createFactory: () => createFactory,
  createPortal: () => createPortal,
  createRef: () => createRef,
  createRoot: () => createRoot,
  default: () => _n,
  flushSync: () => flushSync,
  forwardRef: () => forwardRef,
  hydrate: () => hydrate,
  isValidElement: () => isValidElement,
  jsx: () => o3,
  jsxs: () => o3,
  lazy: () => lazy,
  memo: () => memo,
  props: () => props,
  render: () => render,
  startTransition: () => startTransition,
  unmountComponentAtNode: () => unmountComponentAtNode,
  useCallback: () => useCallback,
  useContext: () => useContext,
  useDebugValue: () => useDebugValue,
  useDeferredValue: () => useDeferredValue,
  useEffect: () => useEffect,
  useId: () => useId,
  useImperativeHandle: () => useImperativeHandle,
  useInsertionEffect: () => useInsertionEffect,
  useLayoutEffect: () => useLayoutEffect,
  useMemo: () => useMemo,
  useReducer: () => useReducer,
  useRef: () => useRef,
  useState: () => useState,
  useSyncExternalStore: () => useSyncExternalStore,
  useTransition: () => useTransition,
  version: () => version
});
var init_react_preact2 = __esm({
  "dist/react-preact.mjs"() {
    init_define_process();
    init_chunk_chunk_ILR5YIA3();
    init_chunk_chunk_N4DRFC7M();
    init_react_preact();
  }
});

export {
  _n,
  o3,
  createRoot,
  Fragment,
  createPortal,
  flushSync,
  Children,
  Component,
  PureComponent,
  Suspense,
  cloneElement,
  createContext,
  createElement,
  createRef,
  forwardRef,
  isValidElement,
  lazy,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  react_preact_exports2 as react_preact_exports,
  init_react_preact2 as init_react_preact
};
