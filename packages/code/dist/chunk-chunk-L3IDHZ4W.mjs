import {
  init_define_process
} from "./chunk-chunk-WK2SDDIY.mjs";
import {
  __esm,
  __export
} from "./chunk-chunk-477FBAEY.mjs";

// js/preact/dist/preact.module.js
function s(n3, l4) {
  for (var u4 in l4)
    n3[u4] = l4[u4];
  return n3;
}
function a(n3) {
  var l4 = n3.parentNode;
  l4 && l4.removeChild(n3);
}
function h(l4, u4, i4) {
  var t3, o5, r3, f4 = {};
  for (r3 in u4)
    "key" == r3 ? t3 = u4[r3] : "ref" == r3 ? o5 = u4[r3] : f4[r3] = u4[r3];
  if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l4 && null != l4.defaultProps)
    for (r3 in l4.defaultProps)
      void 0 === f4[r3] && (f4[r3] = l4.defaultProps[r3]);
  return v(l4, f4, t3, o5, null);
}
function v(n3, i4, t3, o5, r3) {
  var f4 = { type: n3, props: i4, key: t3, ref: o5, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r3 ? ++u : r3 };
  return null == r3 && null != l.vnode && l.vnode(f4), f4;
}
function y() {
  return { current: null };
}
function p(n3) {
  return n3.children;
}
function d(n3, l4) {
  this.props = n3, this.context = l4;
}
function _(n3, l4) {
  if (null == l4)
    return n3.__ ? _(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
  for (var u4; l4 < n3.__k.length; l4++)
    if (null != (u4 = n3.__k[l4]) && null != u4.__e)
      return u4.__e;
  return "function" == typeof n3.type ? _(n3) : null;
}
function k(n3) {
  var l4, u4;
  if (null != (n3 = n3.__) && null != n3.__c) {
    for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++)
      if (null != (u4 = n3.__k[l4]) && null != u4.__e) {
        n3.__e = n3.__c.base = u4.__e;
        break;
      }
    return k(n3);
  }
}
function b(n3) {
  (!n3.__d && (n3.__d = true) && t.push(n3) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
}
function g() {
  for (var n3; g.__r = t.length; )
    n3 = t.sort(function(n4, l4) {
      return n4.__v.__b - l4.__v.__b;
    }), t = [], n3.some(function(n4) {
      var l4, u4, i4, t3, o5, r3;
      n4.__d && (o5 = (t3 = (l4 = n4).__v).__e, (r3 = l4.__P) && (u4 = [], (i4 = s({}, t3)).__v = t3.__v + 1, j(r3, t3, i4, l4.__n, void 0 !== r3.ownerSVGElement, null != t3.__h ? [o5] : null, u4, null == o5 ? _(t3) : o5, t3.__h), z(u4, t3), t3.__e != o5 && k(t3)));
    });
}
function w(n3, l4, u4, i4, t3, o5, r3, c4, s4, a4) {
  var h4, y4, d4, k4, b4, g5, w4, x5 = i4 && i4.__k || e, C4 = x5.length;
  for (u4.__k = [], h4 = 0; h4 < l4.length; h4++)
    if (null != (k4 = u4.__k[h4] = null == (k4 = l4[h4]) || "boolean" == typeof k4 ? null : "string" == typeof k4 || "number" == typeof k4 || "bigint" == typeof k4 ? v(null, k4, null, null, k4) : Array.isArray(k4) ? v(p, { children: k4 }, null, null, null) : k4.__b > 0 ? v(k4.type, k4.props, k4.key, k4.ref ? k4.ref : null, k4.__v) : k4)) {
      if (k4.__ = u4, k4.__b = u4.__b + 1, null === (d4 = x5[h4]) || d4 && k4.key == d4.key && k4.type === d4.type)
        x5[h4] = void 0;
      else
        for (y4 = 0; y4 < C4; y4++) {
          if ((d4 = x5[y4]) && k4.key == d4.key && k4.type === d4.type) {
            x5[y4] = void 0;
            break;
          }
          d4 = null;
        }
      j(n3, k4, d4 = d4 || f, t3, o5, r3, c4, s4, a4), b4 = k4.__e, (y4 = k4.ref) && d4.ref != y4 && (w4 || (w4 = []), d4.ref && w4.push(d4.ref, null, k4), w4.push(y4, k4.__c || b4, k4)), null != b4 ? (null == g5 && (g5 = b4), "function" == typeof k4.type && k4.__k === d4.__k ? k4.__d = s4 = m(k4, s4, n3) : s4 = A(n3, k4, d4, x5, b4, s4), "function" == typeof u4.type && (u4.__d = s4)) : s4 && d4.__e == s4 && s4.parentNode != n3 && (s4 = _(d4));
    }
  for (u4.__e = g5, h4 = C4; h4--; )
    null != x5[h4] && N(x5[h4], x5[h4]);
  if (w4)
    for (h4 = 0; h4 < w4.length; h4++)
      M(w4[h4], w4[++h4], w4[++h4]);
}
function m(n3, l4, u4) {
  for (var i4, t3 = n3.__k, o5 = 0; t3 && o5 < t3.length; o5++)
    (i4 = t3[o5]) && (i4.__ = n3, l4 = "function" == typeof i4.type ? m(i4, l4, u4) : A(u4, i4, i4, t3, i4.__e, l4));
  return l4;
}
function x(n3, l4) {
  return l4 = l4 || [], null == n3 || "boolean" == typeof n3 || (Array.isArray(n3) ? n3.some(function(n4) {
    x(n4, l4);
  }) : l4.push(n3)), l4;
}
function A(n3, l4, u4, i4, t3, o5) {
  var r3, f4, e3;
  if (void 0 !== l4.__d)
    r3 = l4.__d, l4.__d = void 0;
  else if (null == u4 || t3 != o5 || null == t3.parentNode)
    n:
      if (null == o5 || o5.parentNode !== n3)
        n3.appendChild(t3), r3 = null;
      else {
        for (f4 = o5, e3 = 0; (f4 = f4.nextSibling) && e3 < i4.length; e3 += 2)
          if (f4 == t3)
            break n;
        n3.insertBefore(t3, o5), r3 = o5;
      }
  return void 0 !== r3 ? r3 : t3.nextSibling;
}
function C(n3, l4, u4, i4, t3) {
  var o5;
  for (o5 in u4)
    "children" === o5 || "key" === o5 || o5 in l4 || H(n3, o5, null, u4[o5], i4);
  for (o5 in l4)
    t3 && "function" != typeof l4[o5] || "children" === o5 || "key" === o5 || "value" === o5 || "checked" === o5 || u4[o5] === l4[o5] || H(n3, o5, l4[o5], u4[o5], i4);
}
function $(n3, l4, u4) {
  "-" === l4[0] ? n3.setProperty(l4, u4) : n3[l4] = null == u4 ? "" : "number" != typeof u4 || c.test(l4) ? u4 : u4 + "px";
}
function H(n3, l4, u4, i4, t3) {
  var o5;
  n:
    if ("style" === l4)
      if ("string" == typeof u4)
        n3.style.cssText = u4;
      else {
        if ("string" == typeof i4 && (n3.style.cssText = i4 = ""), i4)
          for (l4 in i4)
            u4 && l4 in u4 || $(n3.style, l4, "");
        if (u4)
          for (l4 in u4)
            i4 && u4[l4] === i4[l4] || $(n3.style, l4, u4[l4]);
      }
    else if ("o" === l4[0] && "n" === l4[1])
      o5 = l4 !== (l4 = l4.replace(/Capture$/, "")), l4 = l4.toLowerCase() in n3 ? l4.toLowerCase().slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + o5] = u4, u4 ? i4 || n3.addEventListener(l4, o5 ? T : I, o5) : n3.removeEventListener(l4, o5 ? T : I, o5);
    else if ("dangerouslySetInnerHTML" !== l4) {
      if (t3)
        l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("href" !== l4 && "list" !== l4 && "form" !== l4 && "tabIndex" !== l4 && "download" !== l4 && l4 in n3)
        try {
          n3[l4] = null == u4 ? "" : u4;
          break n;
        } catch (n4) {
        }
      "function" == typeof u4 || (null == u4 || false === u4 && -1 == l4.indexOf("-") ? n3.removeAttribute(l4) : n3.setAttribute(l4, u4));
    }
}
function I(n3) {
  this.l[n3.type + false](l.event ? l.event(n3) : n3);
}
function T(n3) {
  this.l[n3.type + true](l.event ? l.event(n3) : n3);
}
function j(n3, u4, i4, t3, o5, r3, f4, e3, c4) {
  var a4, h4, v4, y4, _5, k4, b4, g5, m4, x5, A4, C4, $2, H3, I3, T4 = u4.type;
  if (void 0 !== u4.constructor)
    return null;
  null != i4.__h && (c4 = i4.__h, e3 = u4.__e = i4.__e, u4.__h = null, r3 = [e3]), (a4 = l.__b) && a4(u4);
  try {
    n:
      if ("function" == typeof T4) {
        if (g5 = u4.props, m4 = (a4 = T4.contextType) && t3[a4.__c], x5 = a4 ? m4 ? m4.props.value : a4.__ : t3, i4.__c ? b4 = (h4 = u4.__c = i4.__c).__ = h4.__E : ("prototype" in T4 && T4.prototype.render ? u4.__c = h4 = new T4(g5, x5) : (u4.__c = h4 = new d(g5, x5), h4.constructor = T4, h4.render = O), m4 && m4.sub(h4), h4.props = g5, h4.state || (h4.state = {}), h4.context = x5, h4.__n = t3, v4 = h4.__d = true, h4.__h = [], h4._sb = []), null == h4.__s && (h4.__s = h4.state), null != T4.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = s({}, h4.__s)), s(h4.__s, T4.getDerivedStateFromProps(g5, h4.__s))), y4 = h4.props, _5 = h4.state, v4)
          null == T4.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
        else {
          if (null == T4.getDerivedStateFromProps && g5 !== y4 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(g5, x5), !h4.__e && null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(g5, h4.__s, x5) || u4.__v === i4.__v) {
            for (h4.props = g5, h4.state = h4.__s, u4.__v !== i4.__v && (h4.__d = false), h4.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
              n4 && (n4.__ = u4);
            }), A4 = 0; A4 < h4._sb.length; A4++)
              h4.__h.push(h4._sb[A4]);
            h4._sb = [], h4.__h.length && f4.push(h4);
            break n;
          }
          null != h4.componentWillUpdate && h4.componentWillUpdate(g5, h4.__s, x5), null != h4.componentDidUpdate && h4.__h.push(function() {
            h4.componentDidUpdate(y4, _5, k4);
          });
        }
        if (h4.context = x5, h4.props = g5, h4.__v = u4, h4.__P = n3, C4 = l.__r, $2 = 0, "prototype" in T4 && T4.prototype.render) {
          for (h4.state = h4.__s, h4.__d = false, C4 && C4(u4), a4 = h4.render(h4.props, h4.state, h4.context), H3 = 0; H3 < h4._sb.length; H3++)
            h4.__h.push(h4._sb[H3]);
          h4._sb = [];
        } else
          do {
            h4.__d = false, C4 && C4(u4), a4 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
          } while (h4.__d && ++$2 < 25);
        h4.state = h4.__s, null != h4.getChildContext && (t3 = s(s({}, t3), h4.getChildContext())), v4 || null == h4.getSnapshotBeforeUpdate || (k4 = h4.getSnapshotBeforeUpdate(y4, _5)), I3 = null != a4 && a4.type === p && null == a4.key ? a4.props.children : a4, w(n3, Array.isArray(I3) ? I3 : [I3], u4, i4, t3, o5, r3, f4, e3, c4), h4.base = u4.__e, u4.__h = null, h4.__h.length && f4.push(h4), b4 && (h4.__E = h4.__ = null), h4.__e = false;
      } else
        null == r3 && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = L(i4.__e, u4, i4, t3, o5, r3, f4, c4);
    (a4 = l.diffed) && a4(u4);
  } catch (n4) {
    u4.__v = null, (c4 || null != r3) && (u4.__e = e3, u4.__h = !!c4, r3[r3.indexOf(e3)] = null), l.__e(n4, u4, i4);
  }
}
function z(n3, u4) {
  l.__c && l.__c(u4, n3), n3.some(function(u5) {
    try {
      n3 = u5.__h, u5.__h = [], n3.some(function(n4) {
        n4.call(u5);
      });
    } catch (n4) {
      l.__e(n4, u5.__v);
    }
  });
}
function L(l4, u4, i4, t3, o5, r3, e3, c4) {
  var s4, h4, v4, y4 = i4.props, p4 = u4.props, d4 = u4.type, k4 = 0;
  if ("svg" === d4 && (o5 = true), null != r3) {
    for (; k4 < r3.length; k4++)
      if ((s4 = r3[k4]) && "setAttribute" in s4 == !!d4 && (d4 ? s4.localName === d4 : 3 === s4.nodeType)) {
        l4 = s4, r3[k4] = null;
        break;
      }
  }
  if (null == l4) {
    if (null === d4)
      return document.createTextNode(p4);
    l4 = o5 ? document.createElementNS("http://www.w3.org/2000/svg", d4) : document.createElement(d4, p4.is && p4), r3 = null, c4 = false;
  }
  if (null === d4)
    y4 === p4 || c4 && l4.data === p4 || (l4.data = p4);
  else {
    if (r3 = r3 && n.call(l4.childNodes), h4 = (y4 = i4.props || f).dangerouslySetInnerHTML, v4 = p4.dangerouslySetInnerHTML, !c4) {
      if (null != r3)
        for (y4 = {}, k4 = 0; k4 < l4.attributes.length; k4++)
          y4[l4.attributes[k4].name] = l4.attributes[k4].value;
      (v4 || h4) && (v4 && (h4 && v4.__html == h4.__html || v4.__html === l4.innerHTML) || (l4.innerHTML = v4 && v4.__html || ""));
    }
    if (C(l4, p4, y4, o5, c4), v4)
      u4.__k = [];
    else if (k4 = u4.props.children, w(l4, Array.isArray(k4) ? k4 : [k4], u4, i4, t3, o5 && "foreignObject" !== d4, r3, e3, r3 ? r3[0] : i4.__k && _(i4, 0), c4), null != r3)
      for (k4 = r3.length; k4--; )
        null != r3[k4] && a(r3[k4]);
    c4 || ("value" in p4 && void 0 !== (k4 = p4.value) && (k4 !== l4.value || "progress" === d4 && !k4 || "option" === d4 && k4 !== y4.value) && H(l4, "value", k4, y4.value, false), "checked" in p4 && void 0 !== (k4 = p4.checked) && k4 !== l4.checked && H(l4, "checked", k4, y4.checked, false));
  }
  return l4;
}
function M(n3, u4, i4) {
  try {
    "function" == typeof n3 ? n3(u4) : n3.current = u4;
  } catch (n4) {
    l.__e(n4, i4);
  }
}
function N(n3, u4, i4) {
  var t3, o5;
  if (l.unmount && l.unmount(n3), (t3 = n3.ref) && (t3.current && t3.current !== n3.__e || M(t3, null, u4)), null != (t3 = n3.__c)) {
    if (t3.componentWillUnmount)
      try {
        t3.componentWillUnmount();
      } catch (n4) {
        l.__e(n4, u4);
      }
    t3.base = t3.__P = null, n3.__c = void 0;
  }
  if (t3 = n3.__k)
    for (o5 = 0; o5 < t3.length; o5++)
      t3[o5] && N(t3[o5], u4, i4 || "function" != typeof n3.type);
  i4 || null == n3.__e || a(n3.__e), n3.__ = n3.__e = n3.__d = void 0;
}
function O(n3, l4, u4) {
  return this.constructor(n3, u4);
}
function P(u4, i4, t3) {
  var o5, r3, e3;
  l.__ && l.__(u4, i4), r3 = (o5 = "function" == typeof t3) ? null : t3 && t3.__k || i4.__k, e3 = [], j(i4, u4 = (!o5 && t3 || i4).__k = h(p, null, [u4]), r3 || f, f, void 0 !== i4.ownerSVGElement, !o5 && t3 ? [t3] : r3 ? null : i4.firstChild ? n.call(i4.childNodes) : null, e3, !o5 && t3 ? t3 : r3 ? r3.__e : i4.firstChild, o5), z(e3, u4);
}
function S(n3, l4) {
  P(n3, l4, S);
}
function q(l4, u4, i4) {
  var t3, o5, r3, f4 = s({}, l4.props);
  for (r3 in u4)
    "key" == r3 ? t3 = u4[r3] : "ref" == r3 ? o5 = u4[r3] : f4[r3] = u4[r3];
  return arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), v(l4.type, f4, t3 || l4.key, o5 || l4.ref, null);
}
function B(n3, l4) {
  var u4 = { __c: l4 = "__cC" + r++, __: n3, Consumer: function(n4, l5) {
    return n4.children(l5);
  }, Provider: function(n4) {
    var u5, i4;
    return this.getChildContext || (u5 = [], (i4 = {})[l4] = this, this.getChildContext = function() {
      return i4;
    }, this.shouldComponentUpdate = function(n5) {
      this.props.value !== n5.value && u5.some(b);
    }, this.sub = function(n5) {
      u5.push(n5);
      var l5 = n5.componentWillUnmount;
      n5.componentWillUnmount = function() {
        u5.splice(u5.indexOf(n5), 1), l5 && l5.call(n5);
      };
    }), n4.children;
  } };
  return u4.Provider.__ = u4.Consumer.contextType = u4;
}
var n, l, u, i, t, o, r, f, e, c;
var init_preact_module = __esm({
  "js/preact/dist/preact.module.js"() {
    "use strict";
    init_define_process();
    f = {};
    e = [];
    c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    n = e.slice, l = { __e: function(n3, l4, u4, i4) {
      for (var t3, o5, r3; l4 = l4.__; )
        if ((t3 = l4.__c) && !t3.__)
          try {
            if ((o5 = t3.constructor) && null != o5.getDerivedStateFromError && (t3.setState(o5.getDerivedStateFromError(n3)), r3 = t3.__d), null != t3.componentDidCatch && (t3.componentDidCatch(n3, i4 || {}), r3 = t3.__d), r3)
              return t3.__E = t3;
          } catch (l5) {
            n3 = l5;
          }
      throw n3;
    } }, u = 0, i = function(n3) {
      return null != n3 && void 0 === n3.constructor;
    }, d.prototype.setState = function(n3, l4) {
      var u4;
      u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n3 && (n3 = n3(s({}, u4), this.props)), n3 && s(u4, n3), null != n3 && this.__v && (l4 && this._sb.push(l4), b(this));
    }, d.prototype.forceUpdate = function(n3) {
      this.__v && (this.__e = true, n3 && this.__h.push(n3), b(this));
    }, d.prototype.render = p, t = [], g.__r = 0, r = 0;
  }
});

// ../../.yarn/__virtual__/preact-render-to-string-virtual-01d743af49/0/global/cache/preact-render-to-string-npm-5.2.5-f4d2453001-9.zip/node_modules/preact-render-to-string/dist/index.mjs
function s2(e3) {
  if (false === l2.test(e3 += ""))
    return e3;
  for (var t3 = 0, r3 = 0, n3 = "", o5 = ""; r3 < e3.length; r3++) {
    switch (e3.charCodeAt(r3)) {
      case 34:
        o5 = "&quot;";
        break;
      case 38:
        o5 = "&amp;";
        break;
      case 60:
        o5 = "&lt;";
        break;
      default:
        continue;
    }
    r3 !== t3 && (n3 += e3.slice(t3, r3)), n3 += o5, t3 = r3 + 1;
  }
  return r3 !== t3 && (n3 += e3.slice(t3, r3)), n3;
}
function p2(e3) {
  var t3 = "";
  for (var r3 in e3) {
    var o5 = e3[r3];
    null != o5 && "" !== o5 && (t3 && (t3 += " "), t3 += "-" == r3[0] ? r3 : c2[r3] || (c2[r3] = r3.replace(_2, "-$1").toLowerCase()), t3 = "number" == typeof o5 && false === n2.test(r3) ? t3 + ": " + o5 + "px;" : t3 + ": " + o5 + ";");
  }
  return t3 || void 0;
}
function d2(e3, t3) {
  return Array.isArray(t3) ? t3.reduce(d2, e3) : null != t3 && false !== t3 && e3.push(t3), e3;
}
function v2() {
  this.__d = true;
}
function h2(e3, t3) {
  return { __v: e3, context: t3, props: e3.props, setState: v2, forceUpdate: v2, __d: true, __h: [] };
}
function g2(e3, t3) {
  var r3 = e3.contextType, n3 = r3 && t3[r3.__c];
  return null != r3 ? n3 ? n3.props.value : r3.__ : t3;
}
function m2(r3, n3, l4, c4, _5, v4) {
  if (null == r3 || "boolean" == typeof r3)
    return "";
  if ("object" != typeof r3)
    return "function" == typeof r3 ? "" : s2(r3);
  var b4 = l4.pretty, x5 = b4 && "string" == typeof b4 ? b4 : "	";
  if (Array.isArray(r3)) {
    for (var k4 = "", S3 = 0; S3 < r3.length; S3++)
      b4 && S3 > 0 && (k4 += "\n"), k4 += m2(r3[S3], n3, l4, c4, _5, v4);
    return k4;
  }
  if (void 0 !== r3.constructor)
    return "";
  var w4, C4 = r3.type, O4 = r3.props, j5 = false;
  if ("function" == typeof C4) {
    if (j5 = true, !l4.shallow || !c4 && false !== l4.renderRootComponent) {
      if (C4 === p) {
        var A4 = [];
        return d2(A4, r3.props.children), m2(A4, n3, l4, false !== l4.shallowHighOrder, _5, v4);
      }
      var F2, H3 = r3.__c = h2(r3, n3);
      l.__b && l.__b(r3);
      var M3 = l.__r;
      if (C4.prototype && "function" == typeof C4.prototype.render) {
        var L3 = g2(C4, n3);
        (H3 = r3.__c = new C4(O4, L3)).__v = r3, H3._dirty = H3.__d = true, H3.props = O4, null == H3.state && (H3.state = {}), null == H3._nextState && null == H3.__s && (H3._nextState = H3.__s = H3.state), H3.context = L3, C4.getDerivedStateFromProps ? H3.state = Object.assign({}, H3.state, C4.getDerivedStateFromProps(H3.props, H3.state)) : H3.componentWillMount && (H3.componentWillMount(), H3.state = H3._nextState !== H3.state ? H3._nextState : H3.__s !== H3.state ? H3.__s : H3.state), M3 && M3(r3), F2 = H3.render(H3.props, H3.state, H3.context);
      } else
        for (var T4 = g2(C4, n3), E2 = 0; H3.__d && E2++ < 25; )
          H3.__d = false, M3 && M3(r3), F2 = C4.call(r3.__c, O4, T4);
      return H3.getChildContext && (n3 = Object.assign({}, n3, H3.getChildContext())), l.diffed && l.diffed(r3), m2(F2, n3, l4, false !== l4.shallowHighOrder, _5, v4);
    }
    C4 = (w4 = C4).displayName || w4 !== Function && w4.name || function(e3) {
      var t3 = (Function.prototype.toString.call(e3).match(/^\s*function\s+([^( ]+)/) || "")[1];
      if (!t3) {
        for (var r4 = -1, n4 = y2.length; n4--; )
          if (y2[n4] === e3) {
            r4 = n4;
            break;
          }
        r4 < 0 && (r4 = y2.push(e3) - 1), t3 = "UnnamedComponent" + r4;
      }
      return t3;
    }(w4);
  }
  var $2, D2, N2 = "<" + C4;
  if (O4) {
    var P3 = Object.keys(O4);
    l4 && true === l4.sortAttributes && P3.sort();
    for (var W = 0; W < P3.length; W++) {
      var I3 = P3[W], R2 = O4[I3];
      if ("children" !== I3) {
        if (!i2.test(I3) && (l4 && l4.allAttributes || "key" !== I3 && "ref" !== I3 && "__self" !== I3 && "__source" !== I3)) {
          if ("defaultValue" === I3)
            I3 = "value";
          else if ("defaultChecked" === I3)
            I3 = "checked";
          else if ("defaultSelected" === I3)
            I3 = "selected";
          else if ("className" === I3) {
            if (void 0 !== O4.class)
              continue;
            I3 = "class";
          } else
            _5 && a2.test(I3) && (I3 = I3.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if ("htmlFor" === I3) {
            if (O4.for)
              continue;
            I3 = "for";
          }
          "style" === I3 && R2 && "object" == typeof R2 && (R2 = p2(R2)), "a" === I3[0] && "r" === I3[1] && "boolean" == typeof R2 && (R2 = String(R2));
          var U2 = l4.attributeHook && l4.attributeHook(I3, R2, n3, l4, j5);
          if (U2 || "" === U2)
            N2 += U2;
          else if ("dangerouslySetInnerHTML" === I3)
            D2 = R2 && R2.__html;
          else if ("textarea" === C4 && "value" === I3)
            $2 = R2;
          else if ((R2 || 0 === R2 || "" === R2) && "function" != typeof R2) {
            if (!(true !== R2 && "" !== R2 || (R2 = I3, l4 && l4.xml))) {
              N2 = N2 + " " + I3;
              continue;
            }
            if ("value" === I3) {
              if ("select" === C4) {
                v4 = R2;
                continue;
              }
              "option" === C4 && v4 == R2 && void 0 === O4.selected && (N2 += " selected");
            }
            N2 = N2 + " " + I3 + '="' + s2(R2) + '"';
          }
        }
      } else
        $2 = R2;
    }
  }
  if (b4) {
    var V3 = N2.replace(/\n\s*/, " ");
    V3 === N2 || ~V3.indexOf("\n") ? b4 && ~N2.indexOf("\n") && (N2 += "\n") : N2 = V3;
  }
  if (N2 += ">", i2.test(C4))
    throw new Error(C4 + " is not a valid HTML tag name in " + N2);
  var q4, z4 = o2.test(C4) || l4.voidElements && l4.voidElements.test(C4), Z2 = [];
  if (D2)
    b4 && u2(D2) && (D2 = "\n" + x5 + f2(D2, x5)), N2 += D2;
  else if (null != $2 && d2(q4 = [], $2).length) {
    for (var B4 = b4 && ~N2.indexOf("\n"), G2 = false, J2 = 0; J2 < q4.length; J2++) {
      var K2 = q4[J2];
      if (null != K2 && false !== K2) {
        var Q2 = m2(K2, n3, l4, true, "svg" === C4 || "foreignObject" !== C4 && _5, v4);
        if (b4 && !B4 && u2(Q2) && (B4 = true), Q2)
          if (b4) {
            var X2 = Q2.length > 0 && "<" != Q2[0];
            G2 && X2 ? Z2[Z2.length - 1] += Q2 : Z2.push(Q2), G2 = X2;
          } else
            Z2.push(Q2);
      }
    }
    if (b4 && B4)
      for (var Y2 = Z2.length; Y2--; )
        Z2[Y2] = "\n" + x5 + f2(Z2[Y2], x5);
  }
  if (Z2.length || D2)
    N2 += Z2.join("");
  else if (l4 && l4.xml)
    return N2.substring(0, N2.length - 1) + " />";
  return !z4 || q4 || D2 ? (b4 && ~N2.indexOf("\n") && (N2 += "\n"), N2 = N2 + "</" + C4 + ">") : N2 = N2.replace(/>$/, " />"), N2;
}
function S2(n3, o5, i4) {
  o5 = o5 || {};
  var a4 = l.__s;
  l.__s = true;
  var l4, s4 = h(p, null);
  return s4.__k = [n3], l4 = i4 && (i4.pretty || i4.voidElements || i4.sortAttributes || i4.shallow || i4.allAttributes || i4.xml || i4.attributeHook) ? m2(n3, o5, i4) : A2(n3, o5, false, void 0, s4), l.__c && l.__c(n3, k2), l.__s = a4, k2.length = 0, l4;
}
function w2(e3, t3) {
  return "className" === e3 ? "class" : "htmlFor" === e3 ? "for" : "defaultValue" === e3 ? "value" : "defaultChecked" === e3 ? "checked" : "defaultSelected" === e3 ? "selected" : t3 && a2.test(e3) ? e3.toLowerCase().replace(/^xlink:?/, "xlink:") : e3;
}
function C2(e3, t3) {
  return "style" === e3 && null != t3 && "object" == typeof t3 ? p2(t3) : "a" === e3[0] && "r" === e3[1] && "boolean" == typeof t3 ? String(t3) : t3;
}
function A2(r3, n3, a4, l4, f4) {
  if (null == r3 || true === r3 || false === r3 || "" === r3)
    return "";
  if ("object" != typeof r3)
    return "function" == typeof r3 ? "" : s2(r3);
  if (O2(r3)) {
    var u4 = "";
    f4.__k = r3;
    for (var c4 = 0; c4 < r3.length; c4++)
      u4 += A2(r3[c4], n3, a4, l4, f4);
    return u4;
  }
  if (void 0 !== r3.constructor)
    return "";
  r3.__ = f4, l.__b && l.__b(r3);
  var _5 = r3.type, p4 = r3.props;
  if ("function" == typeof _5) {
    var d4;
    if (_5 === p)
      d4 = p4.children;
    else {
      d4 = _5.prototype && "function" == typeof _5.prototype.render ? function(e3, r4) {
        var n4 = e3.type, o5 = g2(n4, r4), i4 = new n4(e3.props, o5);
        e3.__c = i4, i4.__v = e3, i4.__d = true, i4.props = e3.props, null == i4.state && (i4.state = {}), null == i4.__s && (i4.__s = i4.state), i4.context = o5, n4.getDerivedStateFromProps ? i4.state = j2({}, i4.state, n4.getDerivedStateFromProps(i4.props, i4.state)) : i4.componentWillMount && (i4.componentWillMount(), i4.state = i4.__s !== i4.state ? i4.__s : i4.state);
        var a5 = l.__r;
        return a5 && a5(e3), i4.render(i4.props, i4.state, i4.context);
      }(r3, n3) : function(e3, r4) {
        var n4, o5 = h2(e3, r4), i4 = g2(e3.type, r4);
        e3.__c = o5;
        for (var a5 = l.__r, l5 = 0; o5.__d && l5++ < 25; )
          o5.__d = false, a5 && a5(e3), n4 = e3.type.call(o5, e3.props, i4);
        return n4;
      }(r3, n3);
      var v4 = r3.__c;
      v4.getChildContext && (n3 = j2({}, n3, v4.getChildContext()));
    }
    var y4 = A2(d4 = null != d4 && d4.type === p && null == d4.key ? d4.props.children : d4, n3, a4, l4, r3);
    return l.diffed && l.diffed(r3), r3.__ = void 0, l.unmount && l.unmount(r3), y4;
  }
  var m4, b4, x5 = "<";
  if (x5 += _5, p4)
    for (var k4 in m4 = p4.children, p4) {
      var S3 = p4[k4];
      if (!("key" === k4 || "ref" === k4 || "__self" === k4 || "__source" === k4 || "children" === k4 || "className" === k4 && "class" in p4 || "htmlFor" === k4 && "for" in p4 || i2.test(k4))) {
        if (S3 = C2(k4 = w2(k4, a4), S3), "dangerouslySetInnerHTML" === k4)
          b4 = S3 && S3.__html;
        else if ("textarea" === _5 && "value" === k4)
          m4 = S3;
        else if ((S3 || 0 === S3 || "" === S3) && "function" != typeof S3) {
          if (true === S3 || "" === S3) {
            S3 = k4, x5 = x5 + " " + k4;
            continue;
          }
          if ("value" === k4) {
            if ("select" === _5) {
              l4 = S3;
              continue;
            }
            "option" !== _5 || l4 != S3 || "selected" in p4 || (x5 += " selected");
          }
          x5 = x5 + " " + k4 + '="' + s2(S3) + '"';
        }
      }
    }
  var F2 = x5;
  if (x5 += ">", i2.test(_5))
    throw new Error(_5 + " is not a valid HTML tag name in " + x5);
  var H3 = "", M3 = false;
  if (b4)
    H3 += b4, M3 = true;
  else if ("string" == typeof m4)
    H3 += s2(m4), M3 = true;
  else if (O2(m4)) {
    r3.__k = m4;
    for (var L3 = 0; L3 < m4.length; L3++) {
      var T4 = m4[L3];
      if (null != T4 && false !== T4) {
        var E2 = A2(T4, n3, "svg" === _5 || "foreignObject" !== _5 && a4, l4, r3);
        E2 && (H3 += E2, M3 = true);
      }
    }
  } else if (null != m4 && false !== m4 && true !== m4) {
    r3.__k = [m4];
    var $2 = A2(m4, n3, "svg" === _5 || "foreignObject" !== _5 && a4, l4, r3);
    $2 && (H3 += $2, M3 = true);
  }
  if (l.diffed && l.diffed(r3), r3.__ = void 0, l.unmount && l.unmount(r3), M3)
    x5 += H3;
  else if (o2.test(_5))
    return F2 + " />";
  return x5 + "</" + _5 + ">";
}
var n2, o2, i2, a2, l2, f2, u2, c2, _2, y2, b2, x2, k2, O2, j2;
var init_dist = __esm({
  "../../.yarn/__virtual__/preact-render-to-string-virtual-01d743af49/0/global/cache/preact-render-to-string-npm-5.2.5-f4d2453001-9.zip/node_modules/preact-render-to-string/dist/index.mjs"() {
    init_define_process();
    init_preact_module();
    n2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
    o2 = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
    i2 = /[\s\n\\/='"\0<>]/;
    a2 = /^xlink:?./;
    l2 = /["&<]/;
    f2 = function(e3, t3) {
      return String(e3).replace(/(\n+)/g, "$1" + (t3 || "	"));
    };
    u2 = function(e3, t3, r3) {
      return String(e3).length > (t3 || 40) || !r3 && -1 !== String(e3).indexOf("\n") || -1 !== String(e3).indexOf("<");
    };
    c2 = {};
    _2 = /([A-Z])/g;
    y2 = [];
    b2 = { shallow: true };
    S2.render = S2;
    x2 = function(e3, t3) {
      return S2(e3, t3, b2);
    };
    k2 = [];
    O2 = Array.isArray;
    j2 = Object.assign;
    S2.shallowRender = x2;
  }
});

// js/preact/hooks/dist/hooks.module.js
function d3(t3, u4) {
  l.__h && l.__h(r2, t3, o3 || u4), o3 = 0;
  var i4 = r2.__H || (r2.__H = { __: [], __h: [] });
  return t3 >= i4.__.length && i4.__.push({ __V: c3 }), i4.__[t3];
}
function p3(n3) {
  return o3 = 1, y3(B2, n3);
}
function y3(n3, u4, i4) {
  var o5 = d3(t2++, 2);
  if (o5.t = n3, !o5.__c && (o5.__ = [i4 ? i4(u4) : B2(void 0, u4), function(n4) {
    var t3 = o5.__N ? o5.__N[0] : o5.__[0], r3 = o5.t(t3, n4);
    t3 !== r3 && (o5.__N = [r3, o5.__[1]], o5.__c.setState({}));
  }], o5.__c = r2, !r2.u)) {
    r2.u = true;
    var f4 = r2.shouldComponentUpdate;
    r2.shouldComponentUpdate = function(n4, t3, r3) {
      if (!o5.__c.__H)
        return true;
      var u5 = o5.__c.__H.__.filter(function(n5) {
        return n5.__c;
      });
      if (u5.every(function(n5) {
        return !n5.__N;
      }))
        return !f4 || f4.call(this, n4, t3, r3);
      var i5 = false;
      return u5.forEach(function(n5) {
        if (n5.__N) {
          var t4 = n5.__[0];
          n5.__ = n5.__N, n5.__N = void 0, t4 !== n5.__[0] && (i5 = true);
        }
      }), !(!i5 && o5.__c.props === n4) && (!f4 || f4.call(this, n4, t3, r3));
    };
  }
  return o5.__N || o5.__;
}
function h3(u4, i4) {
  var o5 = d3(t2++, 3);
  !l.__s && z2(o5.__H, i4) && (o5.__ = u4, o5.i = i4, r2.__H.__h.push(o5));
}
function s3(u4, i4) {
  var o5 = d3(t2++, 4);
  !l.__s && z2(o5.__H, i4) && (o5.__ = u4, o5.i = i4, r2.__h.push(o5));
}
function _3(n3) {
  return o3 = 5, F(function() {
    return { current: n3 };
  }, []);
}
function A3(n3, t3, r3) {
  o3 = 6, s3(function() {
    return "function" == typeof n3 ? (n3(t3()), function() {
      return n3(null);
    }) : n3 ? (n3.current = t3(), function() {
      return n3.current = null;
    }) : void 0;
  }, null == r3 ? r3 : r3.concat(n3));
}
function F(n3, r3) {
  var u4 = d3(t2++, 7);
  return z2(u4.__H, r3) ? (u4.__V = n3(), u4.i = r3, u4.__h = n3, u4.__V) : u4.__;
}
function T2(n3, t3) {
  return o3 = 8, F(function() {
    return n3;
  }, t3);
}
function q2(n3) {
  var u4 = r2.context[n3.__c], i4 = d3(t2++, 9);
  return i4.c = n3, u4 ? (null == i4.__ && (i4.__ = true, u4.sub(r2)), u4.props.value) : n3.__;
}
function x3(t3, r3) {
  l.useDebugValue && l.useDebugValue(r3 ? r3(t3) : t3);
}
function P2(n3) {
  var u4 = d3(t2++, 10), i4 = p3();
  return u4.__ = n3, r2.componentDidCatch || (r2.componentDidCatch = function(n4, t3) {
    u4.__ && u4.__(n4, t3), i4[1](n4);
  }), [i4[0], function() {
    i4[1](void 0);
  }];
}
function V() {
  var n3 = d3(t2++, 11);
  return n3.__ || (n3.__ = "P" + function(n4) {
    for (var t3 = 0, r3 = n4.length; r3 > 0; )
      t3 = (t3 << 5) - t3 + n4.charCodeAt(--r3) | 0;
    return t3;
  }(r2.__v.__m) + t2), n3.__;
}
function b3() {
  for (var t3; t3 = f3.shift(); )
    if (t3.__P && t3.__H)
      try {
        t3.__H.__h.forEach(k3), t3.__H.__h.forEach(w3), t3.__H.__h = [];
      } catch (r3) {
        t3.__H.__h = [], l.__e(r3, t3.__v);
      }
}
function j3(n3) {
  var t3, r3 = function() {
    clearTimeout(u4), g3 && cancelAnimationFrame(t3), setTimeout(n3);
  }, u4 = setTimeout(r3, 100);
  g3 && (t3 = requestAnimationFrame(r3));
}
function k3(n3) {
  var t3 = r2, u4 = n3.__c;
  "function" == typeof u4 && (n3.__c = void 0, u4()), r2 = t3;
}
function w3(n3) {
  var t3 = r2;
  n3.__c = n3.__(), r2 = t3;
}
function z2(n3, t3) {
  return !n3 || n3.length !== t3.length || t3.some(function(t4, r3) {
    return t4 !== n3[r3];
  });
}
function B2(n3, t3) {
  return "function" == typeof t3 ? t3(n3) : t3;
}
var t2, r2, u3, i3, o3, f3, c3, e2, a3, v3, l3, m3, g3;
var init_hooks_module = __esm({
  "js/preact/hooks/dist/hooks.module.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    o3 = 0;
    f3 = [];
    c3 = [];
    e2 = l.__b;
    a3 = l.__r;
    v3 = l.diffed;
    l3 = l.__c;
    m3 = l.unmount;
    l.__b = function(n3) {
      "function" != typeof n3.type || n3.__m || null === n3.__ ? n3.__m || (n3.__m = n3.__ && n3.__.__m ? n3.__.__m : "") : n3.__m = (n3.__ && n3.__.__m ? n3.__.__m : "") + (n3.__ && n3.__.__k ? n3.__.__k.indexOf(n3) : 0), r2 = null, e2 && e2(n3);
    }, l.__r = function(n3) {
      a3 && a3(n3), t2 = 0;
      var i4 = (r2 = n3.__c).__H;
      i4 && (u3 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n4) {
        n4.__N && (n4.__ = n4.__N), n4.__V = c3, n4.__N = n4.i = void 0;
      })) : (i4.__h.forEach(k3), i4.__h.forEach(w3), i4.__h = [])), u3 = r2;
    }, l.diffed = function(t3) {
      v3 && v3(t3);
      var o5 = t3.__c;
      o5 && o5.__H && (o5.__H.__h.length && (1 !== f3.push(o5) && i3 === l.requestAnimationFrame || ((i3 = l.requestAnimationFrame) || j3)(b3)), o5.__H.__.forEach(function(n3) {
        n3.i && (n3.__H = n3.i), n3.__V !== c3 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = c3;
      })), u3 = r2 = null;
    }, l.__c = function(t3, r3) {
      r3.some(function(t4) {
        try {
          t4.__h.forEach(k3), t4.__h = t4.__h.filter(function(n3) {
            return !n3.__ || w3(n3);
          });
        } catch (u4) {
          r3.some(function(n3) {
            n3.__h && (n3.__h = []);
          }), r3 = [], l.__e(u4, t4.__v);
        }
      }), l3 && l3(t3, r3);
    }, l.unmount = function(t3) {
      m3 && m3(t3);
      var r3, u4 = t3.__c;
      u4 && u4.__H && (u4.__H.__.forEach(function(n3) {
        try {
          k3(n3);
        } catch (n4) {
          r3 = n4;
        }
      }), u4.__H = void 0, r3 && l.__e(r3, u4.__v));
    };
    g3 = "function" == typeof requestAnimationFrame;
  }
});

// js/preact/compat/dist/compat.module.js
function g4(n3, t3) {
  for (var e3 in t3)
    n3[e3] = t3[e3];
  return n3;
}
function C3(n3, t3) {
  for (var e3 in n3)
    if ("__source" !== e3 && !(e3 in t3))
      return true;
  for (var r3 in t3)
    if ("__source" !== r3 && n3[r3] !== t3[r3])
      return true;
  return false;
}
function E(n3) {
  this.props = n3;
}
function I2(n3, t3, e3) {
  return n3 && (n3.__c && n3.__c.__H && (n3.__c.__H.__.forEach(function(n4) {
    "function" == typeof n4.__c && n4.__c();
  }), n3.__c.__H = null), null != (n3 = g4({}, n3)).__c && (n3.__c.__P === e3 && (n3.__c.__P = t3), n3.__c = null), n3.__k = n3.__k && n3.__k.map(function(n4) {
    return I2(n4, t3, e3);
  })), n3;
}
function L2(n3, t3, e3) {
  return n3 && (n3.__v = null, n3.__k = n3.__k && n3.__k.map(function(n4) {
    return L2(n4, t3, e3);
  }), n3.__c && n3.__c.__P === t3 && (n3.__e && e3.insertBefore(n3.__e, n3.__d), n3.__c.__e = true, n3.__c.__P = e3)), n3;
}
function U() {
  this.__u = 0, this.t = null, this.__b = null;
}
function D(n3) {
  var t3 = n3.__.__c;
  return t3 && t3.__a && t3.__a(n3);
}
function M2() {
  this.u = null, this.o = null;
}
function Z(n3, t3, e3) {
  return null == t3.__k && (t3.textContent = ""), P(n3, t3), "function" == typeof e3 && e3(), n3 ? n3.__c : null;
}
function Y(n3, t3, e3) {
  return S(n3, t3), "function" == typeof e3 && e3(), n3 ? n3.__c : null;
}
function G() {
}
function J() {
  return this.cancelBubble;
}
function K() {
  return this.defaultPrevented;
}
function cn(n3) {
  return !!n3.__k && (P(null, n3), true);
}
var R, x4, O3, T3, V2, j4, z3, B3, H2, q3, Q, X, nn, tn;
var init_compat_module = __esm({
  "js/preact/compat/dist/compat.module.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    init_preact_module();
    init_hooks_module();
    init_hooks_module();
    (E.prototype = new d()).isPureReactComponent = true, E.prototype.shouldComponentUpdate = function(n3, t3) {
      return C3(this.props, n3) || C3(this.state, t3);
    };
    R = l.__b;
    l.__b = function(n3) {
      n3.type && n3.type.__f && n3.ref && (n3.props.ref = n3.ref, n3.ref = null), R && R(n3);
    };
    x4 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
    O3 = l.__e;
    l.__e = function(n3, t3, e3, r3) {
      if (n3.then) {
        for (var u4, o5 = t3; o5 = o5.__; )
          if ((u4 = o5.__c) && u4.__c)
            return null == t3.__e && (t3.__e = e3.__e, t3.__k = e3.__k), u4.__c(n3, t3);
      }
      O3(n3, t3, e3, r3);
    };
    T3 = l.unmount;
    l.unmount = function(n3) {
      var t3 = n3.__c;
      t3 && t3.__R && t3.__R(), t3 && true === n3.__h && (n3.type = null), T3 && T3(n3);
    }, (U.prototype = new d()).__c = function(n3, t3) {
      var e3 = t3.__c, r3 = this;
      null == r3.t && (r3.t = []), r3.t.push(e3);
      var u4 = D(r3.__v), o5 = false, i4 = function() {
        o5 || (o5 = true, e3.__R = null, u4 ? u4(l4) : l4());
      };
      e3.__R = i4;
      var l4 = function() {
        if (!--r3.__u) {
          if (r3.state.__a) {
            var n4 = r3.state.__a;
            r3.__v.__k[0] = L2(n4, n4.__c.__P, n4.__c.__O);
          }
          var t4;
          for (r3.setState({ __a: r3.__b = null }); t4 = r3.t.pop(); )
            t4.forceUpdate();
        }
      }, c4 = true === t3.__h;
      r3.__u++ || c4 || r3.setState({ __a: r3.__b = r3.__v.__k[0] }), n3.then(i4, i4);
    }, U.prototype.componentWillUnmount = function() {
      this.t = [];
    }, U.prototype.render = function(n3, e3) {
      if (this.__b) {
        if (this.__v.__k) {
          var r3 = document.createElement("div"), o5 = this.__v.__k[0].__c;
          this.__v.__k[0] = I2(this.__b, r3, o5.__O = o5.__P);
        }
        this.__b = null;
      }
      var i4 = e3.__a && h(p, null, n3.fallback);
      return i4 && (i4.__h = null), [h(p, null, e3.__a ? null : n3.children), i4];
    };
    V2 = function(n3, t3, e3) {
      if (++e3[1] === e3[0] && n3.o.delete(t3), n3.props.revealOrder && ("t" !== n3.props.revealOrder[0] || !n3.o.size))
        for (e3 = n3.u; e3; ) {
          for (; e3.length > 3; )
            e3.pop()();
          if (e3[1] < e3[0])
            break;
          n3.u = e3 = e3[2];
        }
    };
    (M2.prototype = new d()).__a = function(n3) {
      var t3 = this, e3 = D(t3.__v), r3 = t3.o.get(n3);
      return r3[0]++, function(u4) {
        var o5 = function() {
          t3.props.revealOrder ? (r3.push(u4), V2(t3, n3, r3)) : u4();
        };
        e3 ? e3(o5) : o5();
      };
    }, M2.prototype.render = function(n3) {
      this.u = null, this.o = /* @__PURE__ */ new Map();
      var t3 = x(n3.children);
      n3.revealOrder && "b" === n3.revealOrder[0] && t3.reverse();
      for (var e3 = t3.length; e3--; )
        this.o.set(t3[e3], this.u = [1, 0, this.u]);
      return n3.children;
    }, M2.prototype.componentDidUpdate = M2.prototype.componentDidMount = function() {
      var n3 = this;
      this.o.forEach(function(t3, e3) {
        V2(n3, e3, t3);
      });
    };
    j4 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
    z3 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
    B3 = "undefined" != typeof document;
    H2 = function(n3) {
      return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n3);
    };
    d.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t3) {
      Object.defineProperty(d.prototype, t3, { configurable: true, get: function() {
        return this["UNSAFE_" + t3];
      }, set: function(n3) {
        Object.defineProperty(this, t3, { configurable: true, writable: true, value: n3 });
      } });
    });
    q3 = l.event;
    l.event = function(n3) {
      return q3 && (n3 = q3(n3)), n3.persist = G, n3.isPropagationStopped = J, n3.isDefaultPrevented = K, n3.nativeEvent = n3;
    };
    X = { configurable: true, get: function() {
      return this.class;
    } };
    nn = l.vnode;
    l.vnode = function(n3) {
      var t3 = n3.type, e3 = n3.props, u4 = e3;
      if ("string" == typeof t3) {
        var o5 = -1 === t3.indexOf("-");
        for (var i4 in u4 = {}, e3) {
          var l4 = e3[i4];
          B3 && "children" === i4 && "noscript" === t3 || "value" === i4 && "defaultValue" in e3 && null == l4 || ("defaultValue" === i4 && "value" in e3 && null == e3.value ? i4 = "value" : "download" === i4 && true === l4 ? l4 = "" : /ondoubleclick/i.test(i4) ? i4 = "ondblclick" : /^onchange(textarea|input)/i.test(i4 + t3) && !H2(e3.type) ? i4 = "oninput" : /^onfocus$/i.test(i4) ? i4 = "onfocusin" : /^onblur$/i.test(i4) ? i4 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i4) ? i4 = i4.toLowerCase() : o5 && z3.test(i4) ? i4 = i4.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === l4 && (l4 = void 0), /^oninput$/i.test(i4) && (i4 = i4.toLowerCase(), u4[i4] && (i4 = "oninputCapture")), u4[i4] = l4);
        }
        "select" == t3 && u4.multiple && Array.isArray(u4.value) && (u4.value = x(e3.children).forEach(function(n4) {
          n4.props.selected = -1 != u4.value.indexOf(n4.props.value);
        })), "select" == t3 && null != u4.defaultValue && (u4.value = x(e3.children).forEach(function(n4) {
          n4.props.selected = u4.multiple ? -1 != u4.defaultValue.indexOf(n4.props.value) : u4.defaultValue == n4.props.value;
        })), n3.props = u4, e3.class != e3.className && (X.enumerable = "className" in e3, null != e3.className && (u4.class = e3.className), Object.defineProperty(u4, "className", X));
      }
      n3.$$typeof = j4, nn && nn(n3);
    };
    tn = l.__r;
    l.__r = function(n3) {
      tn && tn(n3), Q = n3.__c;
    };
  }
});

// js/preact/jsx-runtime/dist/jsxRuntime.module.js
function o4(o5, e3, n3, t3, f4) {
  var l4, s4, u4 = {};
  for (s4 in e3)
    "ref" == s4 ? l4 = e3[s4] : u4[s4] = e3[s4];
  var a4 = { type: o5, props: u4, key: n3, ref: l4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_4, __source: f4, __self: t3 };
  if ("function" == typeof o5 && (l4 = o5.defaultProps))
    for (s4 in l4)
      void 0 === u4[s4] && (u4[s4] = l4[s4]);
  return l.vnode && l.vnode(a4), a4;
}
var _4;
var init_jsxRuntime_module = __esm({
  "js/preact/jsx-runtime/dist/jsxRuntime.module.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    init_preact_module();
    _4 = 0;
  }
});

// js/preact/compat/jsx-runtime.mjs
var init_jsx_runtime = __esm({
  "js/preact/compat/jsx-runtime.mjs"() {
    "use strict";
    init_define_process();
    init_compat_module();
    init_jsxRuntime_module();
  }
});

// js/preact/compat/client.mjs
function createRoot(container) {
  return {
    render(children) {
      Z(children, container);
    },
    unmount() {
      cn(container);
    }
  };
}
function hydrateRoot(container, children) {
  Y(children, container);
  return createRoot(container);
}
var init_client = __esm({
  "js/preact/compat/client.mjs"() {
    "use strict";
    init_define_process();
    init_compat_module();
  }
});

// js/preact/compat/src/util.js
function assign(obj, props) {
  for (let i4 in props)
    obj[i4] = props[i4];
  return obj;
}
function shallowDiffers(a4, b4) {
  for (let i4 in a4)
    if (i4 !== "__source" && !(i4 in b4))
      return true;
  for (let i4 in b4)
    if (i4 !== "__source" && a4[i4] !== b4[i4])
      return true;
  return false;
}
var init_util = __esm({
  "js/preact/compat/src/util.js"() {
    "use strict";
    init_define_process();
  }
});

// js/preact/compat/src/PureComponent.js
function PureComponent(p4) {
  this.props = p4;
}
var init_PureComponent = __esm({
  "js/preact/compat/src/PureComponent.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    init_util();
    PureComponent.prototype = new d();
    PureComponent.prototype.isPureReactComponent = true;
    PureComponent.prototype.shouldComponentUpdate = function(props, state) {
      return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
    };
  }
});

// js/preact/compat/src/memo.js
function memo(c4, comparer) {
  function shouldUpdate(nextProps) {
    let ref = this.props.ref;
    let updateRef = ref == nextProps.ref;
    if (!updateRef && ref) {
      ref.call ? ref(null) : ref.current = null;
    }
    if (!comparer) {
      return shallowDiffers(this.props, nextProps);
    }
    return !comparer(this.props, nextProps) || !updateRef;
  }
  function Memoed(props) {
    this.shouldComponentUpdate = shouldUpdate;
    return h(c4, props);
  }
  Memoed.displayName = "Memo(" + (c4.displayName || c4.name) + ")";
  Memoed.prototype.isReactComponent = true;
  Memoed._forwarded = true;
  return Memoed;
}
var init_memo = __esm({
  "js/preact/compat/src/memo.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    init_util();
  }
});

// js/preact/compat/src/forwardRef.js
function forwardRef(fn) {
  function Forwarded(props) {
    let clone = assign({}, props);
    delete clone.ref;
    return fn(clone, props.ref || null);
  }
  Forwarded.$$typeof = REACT_FORWARD_SYMBOL;
  Forwarded.render = Forwarded;
  Forwarded.prototype.isReactComponent = Forwarded._forwarded = true;
  Forwarded.displayName = "ForwardRef(" + (fn.displayName || fn.name) + ")";
  return Forwarded;
}
var oldDiffHook, REACT_FORWARD_SYMBOL;
var init_forwardRef = __esm({
  "js/preact/compat/src/forwardRef.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    init_util();
    oldDiffHook = l._diff;
    l._diff = (vnode) => {
      if (vnode.type && vnode.type._forwarded && vnode.ref) {
        vnode.props.ref = vnode.ref;
        vnode.ref = null;
      }
      if (oldDiffHook)
        oldDiffHook(vnode);
    };
    REACT_FORWARD_SYMBOL = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
  }
});

// js/preact/compat/src/Children.js
var mapFn, Children;
var init_Children = __esm({
  "js/preact/compat/src/Children.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    mapFn = (children, fn) => {
      if (children == null)
        return null;
      return x(x(children).map(fn));
    };
    Children = {
      map: mapFn,
      forEach: mapFn,
      count(children) {
        return children ? x(children).length : 0;
      },
      only(children) {
        const normalized = x(children);
        if (normalized.length !== 1)
          throw "Children.only";
        return normalized[0];
      },
      toArray: x
    };
  }
});

// js/preact/compat/src/suspense.js
function detachedClone(vnode, detachedParent, parentDom) {
  if (vnode) {
    if (vnode._component && vnode._component.__hooks) {
      vnode._component.__hooks._list.forEach((effect) => {
        if (typeof effect._cleanup == "function")
          effect._cleanup();
      });
      vnode._component.__hooks = null;
    }
    vnode = assign({}, vnode);
    if (vnode._component != null) {
      if (vnode._component._parentDom === parentDom) {
        vnode._component._parentDom = detachedParent;
      }
      vnode._component = null;
    }
    vnode._children = vnode._children && vnode._children.map(
      (child) => detachedClone(child, detachedParent, parentDom)
    );
  }
  return vnode;
}
function removeOriginal(vnode, detachedParent, originalParent) {
  if (vnode) {
    vnode._original = null;
    vnode._children = vnode._children && vnode._children.map(
      (child) => removeOriginal(child, detachedParent, originalParent)
    );
    if (vnode._component) {
      if (vnode._component._parentDom === detachedParent) {
        if (vnode._dom) {
          originalParent.insertBefore(vnode._dom, vnode._nextDom);
        }
        vnode._component._force = true;
        vnode._component._parentDom = originalParent;
      }
    }
  }
  return vnode;
}
function Suspense() {
  this._pendingSuspensionCount = 0;
  this._suspenders = null;
  this._detachOnNextRender = null;
}
function suspended(vnode) {
  let component = vnode._parent._component;
  return component && component._suspended && component._suspended(vnode);
}
function lazy(loader) {
  let prom;
  let component;
  let error;
  function Lazy(props) {
    if (!prom) {
      prom = loader();
      prom.then(
        (exports) => {
          component = exports.default || exports;
        },
        (e3) => {
          error = e3;
        }
      );
    }
    if (error) {
      throw error;
    }
    if (!component) {
      throw prom;
    }
    return h(component, props);
  }
  Lazy.displayName = "Lazy";
  Lazy._forwarded = true;
  return Lazy;
}
var oldCatchError, oldUnmount;
var init_suspense = __esm({
  "js/preact/compat/src/suspense.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    init_util();
    oldCatchError = l._catchError;
    l._catchError = function(error, newVNode, oldVNode, errorInfo) {
      if (error.then) {
        let component;
        let vnode = newVNode;
        for (; vnode = vnode._parent; ) {
          if ((component = vnode._component) && component._childDidSuspend) {
            if (newVNode._dom == null) {
              newVNode._dom = oldVNode._dom;
              newVNode._children = oldVNode._children;
            }
            return component._childDidSuspend(error, newVNode);
          }
        }
      }
      oldCatchError(error, newVNode, oldVNode, errorInfo);
    };
    oldUnmount = l.unmount;
    l.unmount = function(vnode) {
      const component = vnode._component;
      if (component && component._onResolve) {
        component._onResolve();
      }
      if (component && vnode._hydrating === true) {
        vnode.type = null;
      }
      if (oldUnmount)
        oldUnmount(vnode);
    };
    Suspense.prototype = new d();
    Suspense.prototype._childDidSuspend = function(promise, suspendingVNode) {
      const suspendingComponent = suspendingVNode._component;
      const c4 = this;
      if (c4._suspenders == null) {
        c4._suspenders = [];
      }
      c4._suspenders.push(suspendingComponent);
      const resolve2 = suspended(c4._vnode);
      let resolved = false;
      const onResolved = () => {
        if (resolved)
          return;
        resolved = true;
        suspendingComponent._onResolve = null;
        if (resolve2) {
          resolve2(onSuspensionComplete);
        } else {
          onSuspensionComplete();
        }
      };
      suspendingComponent._onResolve = onResolved;
      const onSuspensionComplete = () => {
        if (!--c4._pendingSuspensionCount) {
          if (c4.state._suspended) {
            const suspendedVNode = c4.state._suspended;
            c4._vnode._children[0] = removeOriginal(
              suspendedVNode,
              suspendedVNode._component._parentDom,
              suspendedVNode._component._originalParentDom
            );
          }
          c4.setState({ _suspended: c4._detachOnNextRender = null });
          let suspended2;
          while (suspended2 = c4._suspenders.pop()) {
            suspended2.forceUpdate();
          }
        }
      };
      const wasHydrating = suspendingVNode._hydrating === true;
      if (!c4._pendingSuspensionCount++ && !wasHydrating) {
        c4.setState({ _suspended: c4._detachOnNextRender = c4._vnode._children[0] });
      }
      promise.then(onResolved, onResolved);
    };
    Suspense.prototype.componentWillUnmount = function() {
      this._suspenders = [];
    };
    Suspense.prototype.render = function(props, state) {
      if (this._detachOnNextRender) {
        if (this._vnode._children) {
          const detachedParent = document.createElement("div");
          const detachedComponent = this._vnode._children[0]._component;
          this._vnode._children[0] = detachedClone(
            this._detachOnNextRender,
            detachedParent,
            detachedComponent._originalParentDom = detachedComponent._parentDom
          );
        }
        this._detachOnNextRender = null;
      }
      const fallback = state._suspended && h(p, null, props.fallback);
      if (fallback)
        fallback._hydrating = null;
      return [
        h(p, null, state._suspended ? null : props.children),
        fallback
      ];
    };
  }
});

// js/preact/compat/src/suspense-list.js
function SuspenseList() {
  this._next = null;
  this._map = null;
}
var SUSPENDED_COUNT, RESOLVED_COUNT, NEXT_NODE, resolve;
var init_suspense_list = __esm({
  "js/preact/compat/src/suspense-list.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    init_suspense();
    SUSPENDED_COUNT = 0;
    RESOLVED_COUNT = 1;
    NEXT_NODE = 2;
    resolve = (list, child, node) => {
      if (++node[RESOLVED_COUNT] === node[SUSPENDED_COUNT]) {
        list._map.delete(child);
      }
      if (!list.props.revealOrder || list.props.revealOrder[0] === "t" && list._map.size) {
        return;
      }
      node = list._next;
      while (node) {
        while (node.length > 3) {
          node.pop()();
        }
        if (node[RESOLVED_COUNT] < node[SUSPENDED_COUNT]) {
          break;
        }
        list._next = node = node[NEXT_NODE];
      }
    };
    SuspenseList.prototype = new d();
    SuspenseList.prototype._suspended = function(child) {
      const list = this;
      const delegated = suspended(list._vnode);
      let node = list._map.get(child);
      node[SUSPENDED_COUNT]++;
      return (unsuspend) => {
        const wrappedUnsuspend = () => {
          if (!list.props.revealOrder) {
            unsuspend();
          } else {
            node.push(unsuspend);
            resolve(list, child, node);
          }
        };
        if (delegated) {
          delegated(wrappedUnsuspend);
        } else {
          wrappedUnsuspend();
        }
      };
    };
    SuspenseList.prototype.render = function(props) {
      this._next = null;
      this._map = /* @__PURE__ */ new Map();
      const children = x(props.children);
      if (props.revealOrder && props.revealOrder[0] === "b") {
        children.reverse();
      }
      for (let i4 = children.length; i4--; ) {
        this._map.set(children[i4], this._next = [1, 0, this._next]);
      }
      return props.children;
    };
    SuspenseList.prototype.componentDidUpdate = SuspenseList.prototype.componentDidMount = function() {
      this._map.forEach((node, child) => {
        resolve(this, child, node);
      });
    };
  }
});

// js/preact/compat/src/portals.js
function ContextProvider(props) {
  this.getChildContext = () => props.context;
  return props.children;
}
function Portal(props) {
  const _this = this;
  let container = props._container;
  _this.componentWillUnmount = function() {
    P(null, _this._temp);
    _this._temp = null;
    _this._container = null;
  };
  if (_this._container && _this._container !== container) {
    _this.componentWillUnmount();
  }
  if (props._vnode) {
    if (!_this._temp) {
      _this._container = container;
      _this._temp = {
        nodeType: 1,
        parentNode: container,
        childNodes: [],
        appendChild(child) {
          this.childNodes.push(child);
          _this._container.appendChild(child);
        },
        insertBefore(child, before) {
          this.childNodes.push(child);
          _this._container.appendChild(child);
        },
        removeChild(child) {
          this.childNodes.splice(this.childNodes.indexOf(child) >>> 1, 1);
          _this._container.removeChild(child);
        }
      };
    }
    P(
      h(ContextProvider, { context: _this.context }, props._vnode),
      _this._temp
    );
  } else if (_this._temp) {
    _this.componentWillUnmount();
  }
}
function createPortal(vnode, container) {
  const el = h(Portal, { _vnode: vnode, _container: container });
  el.containerInfo = container;
  return el;
}
var init_portals = __esm({
  "js/preact/compat/src/portals.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
  }
});

// js/preact/compat/src/render.js
function render(vnode, parent, callback) {
  if (parent._children == null) {
    parent.textContent = "";
  }
  P(vnode, parent);
  if (typeof callback == "function")
    callback();
  return vnode ? vnode._component : null;
}
function hydrate(vnode, parent, callback) {
  S(vnode, parent);
  if (typeof callback == "function")
    callback();
  return vnode ? vnode._component : null;
}
function empty() {
}
function isPropagationStopped() {
  return this.cancelBubble;
}
function isDefaultPrevented() {
  return this.defaultPrevented;
}
var REACT_ELEMENT_TYPE, CAMEL_PROPS, IS_DOM, onChangeInputType, oldEventHook, classNameDescriptor, oldVNodeHook, currentComponent, oldBeforeRender, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
var init_render = __esm({
  "js/preact/compat/src/render.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    REACT_ELEMENT_TYPE = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.element") || 60103;
    CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
    IS_DOM = typeof document !== "undefined";
    onChangeInputType = (type) => (typeof Symbol != "undefined" && typeof Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(type);
    d.prototype.isReactComponent = {};
    [
      "componentWillMount",
      "componentWillReceiveProps",
      "componentWillUpdate"
    ].forEach((key) => {
      Object.defineProperty(d.prototype, key, {
        configurable: true,
        get() {
          return this["UNSAFE_" + key];
        },
        set(v4) {
          Object.defineProperty(this, key, {
            configurable: true,
            writable: true,
            value: v4
          });
        }
      });
    });
    oldEventHook = l.event;
    l.event = (e3) => {
      if (oldEventHook)
        e3 = oldEventHook(e3);
      e3.persist = empty;
      e3.isPropagationStopped = isPropagationStopped;
      e3.isDefaultPrevented = isDefaultPrevented;
      return e3.nativeEvent = e3;
    };
    classNameDescriptor = {
      configurable: true,
      get() {
        return this.class;
      }
    };
    oldVNodeHook = l.vnode;
    l.vnode = (vnode) => {
      let type = vnode.type;
      let props = vnode.props;
      let normalizedProps = props;
      if (typeof type === "string") {
        const nonCustomElement = type.indexOf("-") === -1;
        normalizedProps = {};
        for (let i4 in props) {
          let value = props[i4];
          if (IS_DOM && i4 === "children" && type === "noscript") {
            continue;
          } else if (i4 === "value" && "defaultValue" in props && value == null) {
            continue;
          } else if (i4 === "defaultValue" && "value" in props && props.value == null) {
            i4 = "value";
          } else if (i4 === "download" && value === true) {
            value = "";
          } else if (/ondoubleclick/i.test(i4)) {
            i4 = "ondblclick";
          } else if (/^onchange(textarea|input)/i.test(i4 + type) && !onChangeInputType(props.type)) {
            i4 = "oninput";
          } else if (/^onfocus$/i.test(i4)) {
            i4 = "onfocusin";
          } else if (/^onblur$/i.test(i4)) {
            i4 = "onfocusout";
          } else if (/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i4)) {
            i4 = i4.toLowerCase();
          } else if (nonCustomElement && CAMEL_PROPS.test(i4)) {
            i4 = i4.replace(/[A-Z0-9]/g, "-$&").toLowerCase();
          } else if (value === null) {
            value = void 0;
          }
          if (/^oninput$/i.test(i4)) {
            i4 = i4.toLowerCase();
            if (normalizedProps[i4]) {
              i4 = "oninputCapture";
            }
          }
          normalizedProps[i4] = value;
        }
        if (type == "select" && normalizedProps.multiple && Array.isArray(normalizedProps.value)) {
          normalizedProps.value = x(props.children).forEach((child) => {
            child.props.selected = normalizedProps.value.indexOf(child.props.value) != -1;
          });
        }
        if (type == "select" && normalizedProps.defaultValue != null) {
          normalizedProps.value = x(props.children).forEach((child) => {
            if (normalizedProps.multiple) {
              child.props.selected = normalizedProps.defaultValue.indexOf(child.props.value) != -1;
            } else {
              child.props.selected = normalizedProps.defaultValue == child.props.value;
            }
          });
        }
        vnode.props = normalizedProps;
        if (props.class != props.className) {
          classNameDescriptor.enumerable = "className" in props;
          if (props.className != null)
            normalizedProps.class = props.className;
          Object.defineProperty(normalizedProps, "className", classNameDescriptor);
        }
      }
      vnode.$$typeof = REACT_ELEMENT_TYPE;
      if (oldVNodeHook)
        oldVNodeHook(vnode);
    };
    oldBeforeRender = l._render;
    l._render = function(vnode) {
      if (oldBeforeRender) {
        oldBeforeRender(vnode);
      }
      currentComponent = vnode._component;
    };
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
      ReactCurrentDispatcher: {
        current: {
          readContext(context) {
            return currentComponent._globalContext[context._id].props.value;
          }
        }
      }
    };
  }
});

// js/preact/compat/src/index.js
function createFactory(type) {
  return h.bind(null, type);
}
function isValidElement(element) {
  return !!element && element.$$typeof === REACT_ELEMENT_TYPE;
}
function cloneElement(element) {
  if (!isValidElement(element))
    return element;
  return q.apply(null, arguments);
}
function unmountComponentAtNode(container) {
  if (container._children) {
    P(null, container);
    return true;
  }
  return false;
}
function findDOMNode(component) {
  return component && (component.base || component.nodeType === 1 && component) || null;
}
function startTransition(cb) {
  cb();
}
function useDeferredValue(val) {
  return val;
}
function useTransition() {
  return [false, startTransition];
}
function useSyncExternalStore(subscribe, getSnapshot) {
  const value = getSnapshot();
  const [{ _instance }, forceUpdate] = p3({
    _instance: { _value: value, _getSnapshot: getSnapshot }
  });
  s3(() => {
    _instance._value = value;
    _instance._getSnapshot = getSnapshot;
    if (_instance._value !== getSnapshot()) {
      forceUpdate({ _instance });
    }
  }, [subscribe, value, getSnapshot]);
  h3(() => {
    if (_instance._value !== _instance._getSnapshot()) {
      forceUpdate({ _instance });
    }
    return subscribe(() => {
      if (_instance._value !== _instance._getSnapshot()) {
        forceUpdate({ _instance });
      }
    });
  }, [subscribe]);
  return value;
}
var version, unstable_batchedUpdates, flushSync, StrictMode, useInsertionEffect, src_default;
var init_src = __esm({
  "js/preact/compat/src/index.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    init_hooks_module();
    init_PureComponent();
    init_memo();
    init_forwardRef();
    init_Children();
    init_suspense();
    init_suspense_list();
    init_portals();
    init_render();
    init_hooks_module();
    version = "17.0.2";
    unstable_batchedUpdates = (callback, arg) => callback(arg);
    flushSync = (callback, arg) => callback(arg);
    StrictMode = p;
    useInsertionEffect = s3;
    src_default = {
      useState: p3,
      useId: V,
      useReducer: y3,
      useEffect: h3,
      useLayoutEffect: s3,
      useInsertionEffect,
      useTransition,
      useDeferredValue,
      useSyncExternalStore,
      startTransition,
      useRef: _3,
      useImperativeHandle: A3,
      useMemo: F,
      useCallback: T2,
      useContext: q2,
      useDebugValue: x3,
      version,
      Children,
      render,
      hydrate,
      unmountComponentAtNode,
      createPortal,
      createElement: h,
      createContext: B,
      createFactory,
      cloneElement,
      createRef: y,
      Fragment: p,
      isValidElement,
      findDOMNode,
      Component: d,
      PureComponent,
      memo,
      forwardRef,
      flushSync,
      unstable_batchedUpdates,
      StrictMode,
      Suspense,
      SuspenseList,
      lazy,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    };
  }
});

// js/react-preact.ts
var react_preact_exports = {};
__export(react_preact_exports, {
  Children: () => Children,
  Component: () => d,
  Fragment: () => p,
  PureComponent: () => PureComponent,
  StrictMode: () => StrictMode,
  Suspense: () => Suspense,
  SuspenseList: () => SuspenseList,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  cloneElement: () => cloneElement,
  createContext: () => B,
  createElement: () => h,
  createFactory: () => createFactory,
  createPortal: () => createPortal,
  createRef: () => y,
  createRoot: () => createRoot,
  default: () => src_default,
  findDOMNode: () => findDOMNode,
  flushSync: () => flushSync,
  forwardRef: () => forwardRef,
  hydrate: () => hydrate,
  hydrateRoot: () => hydrateRoot,
  isValidElement: () => isValidElement,
  jsx: () => o4,
  jsxs: () => o4,
  lazy: () => lazy,
  memo: () => memo,
  render: () => render,
  renderToString: () => S2,
  startTransition: () => startTransition,
  unmountComponentAtNode: () => unmountComponentAtNode,
  unstable_batchedUpdates: () => unstable_batchedUpdates,
  useCallback: () => T2,
  useContext: () => q2,
  useDebugValue: () => x3,
  useDeferredValue: () => useDeferredValue,
  useEffect: () => h3,
  useErrorBoundary: () => P2,
  useId: () => V,
  useImperativeHandle: () => A3,
  useInsertionEffect: () => useInsertionEffect,
  useLayoutEffect: () => s3,
  useMemo: () => F,
  useReducer: () => y3,
  useRef: () => _3,
  useState: () => p3,
  useSyncExternalStore: () => useSyncExternalStore,
  useTransition: () => useTransition,
  version: () => version
});
var init_react_preact = __esm({
  "js/react-preact.ts"() {
    init_define_process();
    init_dist();
    init_jsx_runtime();
    init_client();
    init_src();
    init_src();
  }
});

export {
  h,
  y,
  p,
  d,
  B,
  S2 as S,
  p3 as p2,
  y3 as y2,
  h3 as h2,
  s3 as s,
  _3 as _,
  A3 as A,
  F,
  T2 as T,
  q2 as q,
  x3 as x,
  P2 as P,
  V,
  o4 as o,
  createRoot,
  hydrateRoot,
  PureComponent,
  memo,
  forwardRef,
  Children,
  Suspense,
  lazy,
  SuspenseList,
  createPortal,
  render,
  hydrate,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  version,
  createFactory,
  isValidElement,
  cloneElement,
  unmountComponentAtNode,
  findDOMNode,
  unstable_batchedUpdates,
  flushSync,
  StrictMode,
  startTransition,
  useDeferredValue,
  useTransition,
  useInsertionEffect,
  useSyncExternalStore,
  src_default,
  react_preact_exports,
  init_react_preact
};
