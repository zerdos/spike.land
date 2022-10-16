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
  var h4, y4, d4, k5, b4, g6, w5, x6 = i4 && i4.__k || e, C5 = x6.length;
  for (u4.__k = [], h4 = 0; h4 < l4.length; h4++)
    if (null != (k5 = u4.__k[h4] = null == (k5 = l4[h4]) || "boolean" == typeof k5 ? null : "string" == typeof k5 || "number" == typeof k5 || "bigint" == typeof k5 ? v(null, k5, null, null, k5) : Array.isArray(k5) ? v(p, { children: k5 }, null, null, null) : k5.__b > 0 ? v(k5.type, k5.props, k5.key, k5.ref ? k5.ref : null, k5.__v) : k5)) {
      if (k5.__ = u4, k5.__b = u4.__b + 1, null === (d4 = x6[h4]) || d4 && k5.key == d4.key && k5.type === d4.type)
        x6[h4] = void 0;
      else
        for (y4 = 0; y4 < C5; y4++) {
          if ((d4 = x6[y4]) && k5.key == d4.key && k5.type === d4.type) {
            x6[y4] = void 0;
            break;
          }
          d4 = null;
        }
      j(n3, k5, d4 = d4 || f, t3, o5, r3, c4, s4, a4), b4 = k5.__e, (y4 = k5.ref) && d4.ref != y4 && (w5 || (w5 = []), d4.ref && w5.push(d4.ref, null, k5), w5.push(y4, k5.__c || b4, k5)), null != b4 ? (null == g6 && (g6 = b4), "function" == typeof k5.type && k5.__k === d4.__k ? k5.__d = s4 = m(k5, s4, n3) : s4 = A(n3, k5, d4, x6, b4, s4), "function" == typeof u4.type && (u4.__d = s4)) : s4 && d4.__e == s4 && s4.parentNode != n3 && (s4 = _(d4));
    }
  for (u4.__e = g6, h4 = C5; h4--; )
    null != x6[h4] && N(x6[h4], x6[h4]);
  if (w5)
    for (h4 = 0; h4 < w5.length; h4++)
      M(w5[h4], w5[++h4], w5[++h4]);
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
  var a4, h4, v4, y4, _5, k5, b4, g6, m4, x6, A5, C5, $3, H4, I4, T5 = u4.type;
  if (void 0 !== u4.constructor)
    return null;
  null != i4.__h && (c4 = i4.__h, e3 = u4.__e = i4.__e, u4.__h = null, r3 = [e3]), (a4 = l.__b) && a4(u4);
  try {
    n:
      if ("function" == typeof T5) {
        if (g6 = u4.props, m4 = (a4 = T5.contextType) && t3[a4.__c], x6 = a4 ? m4 ? m4.props.value : a4.__ : t3, i4.__c ? b4 = (h4 = u4.__c = i4.__c).__ = h4.__E : ("prototype" in T5 && T5.prototype.render ? u4.__c = h4 = new T5(g6, x6) : (u4.__c = h4 = new d(g6, x6), h4.constructor = T5, h4.render = O), m4 && m4.sub(h4), h4.props = g6, h4.state || (h4.state = {}), h4.context = x6, h4.__n = t3, v4 = h4.__d = true, h4.__h = [], h4._sb = []), null == h4.__s && (h4.__s = h4.state), null != T5.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = s({}, h4.__s)), s(h4.__s, T5.getDerivedStateFromProps(g6, h4.__s))), y4 = h4.props, _5 = h4.state, v4)
          null == T5.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
        else {
          if (null == T5.getDerivedStateFromProps && g6 !== y4 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(g6, x6), !h4.__e && null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(g6, h4.__s, x6) || u4.__v === i4.__v) {
            for (h4.props = g6, h4.state = h4.__s, u4.__v !== i4.__v && (h4.__d = false), h4.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
              n4 && (n4.__ = u4);
            }), A5 = 0; A5 < h4._sb.length; A5++)
              h4.__h.push(h4._sb[A5]);
            h4._sb = [], h4.__h.length && f4.push(h4);
            break n;
          }
          null != h4.componentWillUpdate && h4.componentWillUpdate(g6, h4.__s, x6), null != h4.componentDidUpdate && h4.__h.push(function() {
            h4.componentDidUpdate(y4, _5, k5);
          });
        }
        if (h4.context = x6, h4.props = g6, h4.__v = u4, h4.__P = n3, C5 = l.__r, $3 = 0, "prototype" in T5 && T5.prototype.render) {
          for (h4.state = h4.__s, h4.__d = false, C5 && C5(u4), a4 = h4.render(h4.props, h4.state, h4.context), H4 = 0; H4 < h4._sb.length; H4++)
            h4.__h.push(h4._sb[H4]);
          h4._sb = [];
        } else
          do {
            h4.__d = false, C5 && C5(u4), a4 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
          } while (h4.__d && ++$3 < 25);
        h4.state = h4.__s, null != h4.getChildContext && (t3 = s(s({}, t3), h4.getChildContext())), v4 || null == h4.getSnapshotBeforeUpdate || (k5 = h4.getSnapshotBeforeUpdate(y4, _5)), I4 = null != a4 && a4.type === p && null == a4.key ? a4.props.children : a4, w(n3, Array.isArray(I4) ? I4 : [I4], u4, i4, t3, o5, r3, f4, e3, c4), h4.base = u4.__e, u4.__h = null, h4.__h.length && f4.push(h4), b4 && (h4.__E = h4.__ = null), h4.__e = false;
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
  var s4, h4, v4, y4 = i4.props, p4 = u4.props, d4 = u4.type, k5 = 0;
  if ("svg" === d4 && (o5 = true), null != r3) {
    for (; k5 < r3.length; k5++)
      if ((s4 = r3[k5]) && "setAttribute" in s4 == !!d4 && (d4 ? s4.localName === d4 : 3 === s4.nodeType)) {
        l4 = s4, r3[k5] = null;
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
        for (y4 = {}, k5 = 0; k5 < l4.attributes.length; k5++)
          y4[l4.attributes[k5].name] = l4.attributes[k5].value;
      (v4 || h4) && (v4 && (h4 && v4.__html == h4.__html || v4.__html === l4.innerHTML) || (l4.innerHTML = v4 && v4.__html || ""));
    }
    if (C(l4, p4, y4, o5, c4), v4)
      u4.__k = [];
    else if (k5 = u4.props.children, w(l4, Array.isArray(k5) ? k5 : [k5], u4, i4, t3, o5 && "foreignObject" !== d4, r3, e3, r3 ? r3[0] : i4.__k && _(i4, 0), c4), null != r3)
      for (k5 = r3.length; k5--; )
        null != r3[k5] && a(r3[k5]);
    c4 || ("value" in p4 && void 0 !== (k5 = p4.value) && (k5 !== l4.value || "progress" === d4 && !k5 || "option" === d4 && k5 !== y4.value) && H(l4, "value", k5, y4.value, false), "checked" in p4 && void 0 !== (k5 = p4.checked) && k5 !== l4.checked && H(l4, "checked", k5, y4.checked, false));
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
  var b4 = l4.pretty, x6 = b4 && "string" == typeof b4 ? b4 : "	";
  if (Array.isArray(r3)) {
    for (var k5 = "", S3 = 0; S3 < r3.length; S3++)
      b4 && S3 > 0 && (k5 += "\n"), k5 += m2(r3[S3], n3, l4, c4, _5, v4);
    return k5;
  }
  if (void 0 !== r3.constructor)
    return "";
  var w5, C5 = r3.type, O5 = r3.props, j6 = false;
  if ("function" == typeof C5) {
    if (j6 = true, !l4.shallow || !c4 && false !== l4.renderRootComponent) {
      if (C5 === p) {
        var A5 = [];
        return d2(A5, r3.props.children), m2(A5, n3, l4, false !== l4.shallowHighOrder, _5, v4);
      }
      var F3, H4 = r3.__c = h2(r3, n3);
      l.__b && l.__b(r3);
      var M4 = l.__r;
      if (C5.prototype && "function" == typeof C5.prototype.render) {
        var L4 = g2(C5, n3);
        (H4 = r3.__c = new C5(O5, L4)).__v = r3, H4._dirty = H4.__d = true, H4.props = O5, null == H4.state && (H4.state = {}), null == H4._nextState && null == H4.__s && (H4._nextState = H4.__s = H4.state), H4.context = L4, C5.getDerivedStateFromProps ? H4.state = Object.assign({}, H4.state, C5.getDerivedStateFromProps(H4.props, H4.state)) : H4.componentWillMount && (H4.componentWillMount(), H4.state = H4._nextState !== H4.state ? H4._nextState : H4.__s !== H4.state ? H4.__s : H4.state), M4 && M4(r3), F3 = H4.render(H4.props, H4.state, H4.context);
      } else
        for (var T5 = g2(C5, n3), E3 = 0; H4.__d && E3++ < 25; )
          H4.__d = false, M4 && M4(r3), F3 = C5.call(r3.__c, O5, T5);
      return H4.getChildContext && (n3 = Object.assign({}, n3, H4.getChildContext())), l.diffed && l.diffed(r3), m2(F3, n3, l4, false !== l4.shallowHighOrder, _5, v4);
    }
    C5 = (w5 = C5).displayName || w5 !== Function && w5.name || function(e3) {
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
    }(w5);
  }
  var $3, D3, N3 = "<" + C5;
  if (O5) {
    var P4 = Object.keys(O5);
    l4 && true === l4.sortAttributes && P4.sort();
    for (var W2 = 0; W2 < P4.length; W2++) {
      var I4 = P4[W2], R3 = O5[I4];
      if ("children" !== I4) {
        if (!i2.test(I4) && (l4 && l4.allAttributes || "key" !== I4 && "ref" !== I4 && "__self" !== I4 && "__source" !== I4)) {
          if ("defaultValue" === I4)
            I4 = "value";
          else if ("defaultChecked" === I4)
            I4 = "checked";
          else if ("defaultSelected" === I4)
            I4 = "selected";
          else if ("className" === I4) {
            if (void 0 !== O5.class)
              continue;
            I4 = "class";
          } else
            _5 && a2.test(I4) && (I4 = I4.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if ("htmlFor" === I4) {
            if (O5.for)
              continue;
            I4 = "for";
          }
          "style" === I4 && R3 && "object" == typeof R3 && (R3 = p2(R3)), "a" === I4[0] && "r" === I4[1] && "boolean" == typeof R3 && (R3 = String(R3));
          var U3 = l4.attributeHook && l4.attributeHook(I4, R3, n3, l4, j6);
          if (U3 || "" === U3)
            N3 += U3;
          else if ("dangerouslySetInnerHTML" === I4)
            D3 = R3 && R3.__html;
          else if ("textarea" === C5 && "value" === I4)
            $3 = R3;
          else if ((R3 || 0 === R3 || "" === R3) && "function" != typeof R3) {
            if (!(true !== R3 && "" !== R3 || (R3 = I4, l4 && l4.xml))) {
              N3 = N3 + " " + I4;
              continue;
            }
            if ("value" === I4) {
              if ("select" === C5) {
                v4 = R3;
                continue;
              }
              "option" === C5 && v4 == R3 && void 0 === O5.selected && (N3 += " selected");
            }
            N3 = N3 + " " + I4 + '="' + s2(R3) + '"';
          }
        }
      } else
        $3 = R3;
    }
  }
  if (b4) {
    var V4 = N3.replace(/\n\s*/, " ");
    V4 === N3 || ~V4.indexOf("\n") ? b4 && ~N3.indexOf("\n") && (N3 += "\n") : N3 = V4;
  }
  if (N3 += ">", i2.test(C5))
    throw new Error(C5 + " is not a valid HTML tag name in " + N3);
  var q5, z5 = o2.test(C5) || l4.voidElements && l4.voidElements.test(C5), Z2 = [];
  if (D3)
    b4 && u2(D3) && (D3 = "\n" + x6 + f2(D3, x6)), N3 += D3;
  else if (null != $3 && d2(q5 = [], $3).length) {
    for (var B5 = b4 && ~N3.indexOf("\n"), G3 = false, J3 = 0; J3 < q5.length; J3++) {
      var K3 = q5[J3];
      if (null != K3 && false !== K3) {
        var Q3 = m2(K3, n3, l4, true, "svg" === C5 || "foreignObject" !== C5 && _5, v4);
        if (b4 && !B5 && u2(Q3) && (B5 = true), Q3)
          if (b4) {
            var X3 = Q3.length > 0 && "<" != Q3[0];
            G3 && X3 ? Z2[Z2.length - 1] += Q3 : Z2.push(Q3), G3 = X3;
          } else
            Z2.push(Q3);
      }
    }
    if (b4 && B5)
      for (var Y2 = Z2.length; Y2--; )
        Z2[Y2] = "\n" + x6 + f2(Z2[Y2], x6);
  }
  if (Z2.length || D3)
    N3 += Z2.join("");
  else if (l4 && l4.xml)
    return N3.substring(0, N3.length - 1) + " />";
  return !z5 || q5 || D3 ? (b4 && ~N3.indexOf("\n") && (N3 += "\n"), N3 = N3 + "</" + C5 + ">") : N3 = N3.replace(/>$/, " />"), N3;
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
  var m4, b4, x6 = "<";
  if (x6 += _5, p4)
    for (var k5 in m4 = p4.children, p4) {
      var S3 = p4[k5];
      if (!("key" === k5 || "ref" === k5 || "__self" === k5 || "__source" === k5 || "children" === k5 || "className" === k5 && "class" in p4 || "htmlFor" === k5 && "for" in p4 || i2.test(k5))) {
        if (S3 = C2(k5 = w2(k5, a4), S3), "dangerouslySetInnerHTML" === k5)
          b4 = S3 && S3.__html;
        else if ("textarea" === _5 && "value" === k5)
          m4 = S3;
        else if ((S3 || 0 === S3 || "" === S3) && "function" != typeof S3) {
          if (true === S3 || "" === S3) {
            S3 = k5, x6 = x6 + " " + k5;
            continue;
          }
          if ("value" === k5) {
            if ("select" === _5) {
              l4 = S3;
              continue;
            }
            "option" !== _5 || l4 != S3 || "selected" in p4 || (x6 += " selected");
          }
          x6 = x6 + " " + k5 + '="' + s2(S3) + '"';
        }
      }
    }
  var F3 = x6;
  if (x6 += ">", i2.test(_5))
    throw new Error(_5 + " is not a valid HTML tag name in " + x6);
  var H4 = "", M4 = false;
  if (b4)
    H4 += b4, M4 = true;
  else if ("string" == typeof m4)
    H4 += s2(m4), M4 = true;
  else if (O2(m4)) {
    r3.__k = m4;
    for (var L4 = 0; L4 < m4.length; L4++) {
      var T5 = m4[L4];
      if (null != T5 && false !== T5) {
        var E3 = A2(T5, n3, "svg" === _5 || "foreignObject" !== _5 && a4, l4, r3);
        E3 && (H4 += E3, M4 = true);
      }
    }
  } else if (null != m4 && false !== m4 && true !== m4) {
    r3.__k = [m4];
    var $3 = A2(m4, n3, "svg" === _5 || "foreignObject" !== _5 && a4, l4, r3);
    $3 && (H4 += $3, M4 = true);
  }
  if (l.diffed && l.diffed(r3), r3.__ = void 0, l.unmount && l.unmount(r3), M4)
    x6 += H4;
  else if (o2.test(_5))
    return F3 + " />";
  return x6 + "</" + _5 + ">";
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

// js/preact/compat/server.browser.js
var init_server_browser = __esm({
  "js/preact/compat/server.browser.js"() {
    "use strict";
    init_define_process();
    init_dist();
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

// js/preact/compat/dist/compat.mjs
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
function w4(n3, e3) {
  function r3(n4) {
    var t3 = this.props.ref, r4 = t3 == n4.ref;
    return !r4 && t3 && (t3.call ? t3(null) : t3.current = null), e3 ? !e3(this.props, n4) || !r4 : C3(this.props, n4);
  }
  function u4(e4) {
    return this.shouldComponentUpdate = r3, h(n3, e4);
  }
  return u4.displayName = "Memo(" + (n3.displayName || n3.name) + ")", u4.prototype.isReactComponent = true, u4.__f = true, u4;
}
function N2(n3) {
  function t3(t4) {
    var e3 = g4({}, t4);
    return delete e3.ref, n3(e3, t4.ref || null);
  }
  return t3.$$typeof = x4, t3.render = t3, t3.prototype.isReactComponent = t3.__f = true, t3.displayName = "ForwardRef(" + (n3.displayName || n3.name) + ")", t3;
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
function F2(n3) {
  var e3, r3, u4;
  function o5(o6) {
    if (e3 || (e3 = n3()).then(function(n4) {
      r3 = n4.default || n4;
    }, function(n4) {
      u4 = n4;
    }), u4)
      throw u4;
    if (!r3)
      throw e3;
    return h(r3, o6);
  }
  return o5.displayName = "Lazy", o5.__f = true, o5;
}
function M2() {
  this.u = null, this.o = null;
}
function W(n3) {
  return this.getChildContext = function() {
    return n3.context;
  }, n3.children;
}
function P3(n3) {
  var e3 = this, r3 = n3.i;
  e3.componentWillUnmount = function() {
    P(null, e3.l), e3.l = null, e3.i = null;
  }, e3.i && e3.i !== r3 && e3.componentWillUnmount(), n3.__v ? (e3.l || (e3.i = r3, e3.l = { nodeType: 1, parentNode: r3, childNodes: [], appendChild: function(n4) {
    this.childNodes.push(n4), e3.i.appendChild(n4);
  }, insertBefore: function(n4, t3) {
    this.childNodes.push(n4), e3.i.appendChild(n4);
  }, removeChild: function(n4) {
    this.childNodes.splice(this.childNodes.indexOf(n4) >>> 1, 1), e3.i.removeChild(n4);
  } }), P(h(W, { context: e3.context }, n3.__v), e3.l)) : e3.l && e3.componentWillUnmount();
}
function $2(n3, e3) {
  var r3 = h(P3, { __v: n3, i: e3 });
  return r3.containerInfo = e3, r3;
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
function un(n3) {
  return h.bind(null, n3);
}
function on(n3) {
  return !!n3 && n3.$$typeof === j4;
}
function ln(n3) {
  return on(n3) ? q.apply(null, arguments) : n3;
}
function cn(n3) {
  return !!n3.__k && (P(null, n3), true);
}
function fn(n3) {
  return n3 && (n3.base || 1 === n3.nodeType && n3) || null;
}
function vn(n3) {
  n3();
}
function dn(n3) {
  return n3;
}
function pn() {
  return [false, vn];
}
function yn(n3, t3) {
  var e3 = t3(), r3 = p3({ h: { __: e3, v: t3 } }), u4 = r3[0].h, o5 = r3[1];
  return s3(function() {
    u4.__ = e3, u4.v = t3, u4.__ !== t3() && o5({ h: u4 });
  }, [n3, e3, t3]), h3(function() {
    return u4.__ !== u4.v() && o5({ h: u4 }), n3(function() {
      u4.__ !== u4.v() && o5({ h: u4 });
    });
  }, [n3]), e3;
}
var R, x4, k4, A4, O3, T3, V2, j4, z3, B3, H2, q3, Q, X, nn, tn, en, rn, an, sn, hn, mn, _n;
var init_compat = __esm({
  "js/preact/compat/dist/compat.mjs"() {
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
    k4 = function(n3, t3) {
      return null == n3 ? null : x(x(n3).map(t3));
    };
    A4 = { map: k4, forEach: k4, count: function(n3) {
      return n3 ? x(n3).length : 0;
    }, only: function(n3) {
      var t3 = x(n3);
      if (1 !== t3.length)
        throw "Children.only";
      return t3[0];
    }, toArray: x };
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
    en = { ReactCurrentDispatcher: { current: { readContext: function(n3) {
      return Q.__n[n3.__c].props.value;
    } } } };
    rn = "17.0.2";
    an = function(n3, t3) {
      return n3(t3);
    };
    sn = function(n3, t3) {
      return n3(t3);
    };
    hn = p;
    mn = s3;
    _n = { useState: p3, useId: V, useReducer: y3, useEffect: h3, useLayoutEffect: s3, useInsertionEffect: mn, useTransition: pn, useDeferredValue: dn, useSyncExternalStore: yn, startTransition: vn, useRef: _3, useImperativeHandle: A3, useMemo: F, useCallback: T2, useContext: q2, useDebugValue: x3, version: "17.0.2", Children: A4, render: Z, hydrate: Y, unmountComponentAtNode: cn, createPortal: $2, createElement: h, createContext: B, createFactory: un, cloneElement: ln, createRef: y, Fragment: p, isValidElement: on, findDOMNode: fn, Component: d, PureComponent: E, memo: w4, forwardRef: N2, flushSync: sn, unstable_batchedUpdates: an, StrictMode: hn, Suspense: U, SuspenseList: M2, lazy: F2, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: en };
  }
});

// js/preact/compat/dist/compat.module.js
function g5(n3, t3) {
  for (var e3 in t3)
    n3[e3] = t3[e3];
  return n3;
}
function C4(n3, t3) {
  for (var e3 in n3)
    if ("__source" !== e3 && !(e3 in t3))
      return true;
  for (var r3 in t3)
    if ("__source" !== r3 && n3[r3] !== t3[r3])
      return true;
  return false;
}
function E2(n3) {
  this.props = n3;
}
function I3(n3, t3, e3) {
  return n3 && (n3.__c && n3.__c.__H && (n3.__c.__H.__.forEach(function(n4) {
    "function" == typeof n4.__c && n4.__c();
  }), n3.__c.__H = null), null != (n3 = g5({}, n3)).__c && (n3.__c.__P === e3 && (n3.__c.__P = t3), n3.__c = null), n3.__k = n3.__k && n3.__k.map(function(n4) {
    return I3(n4, t3, e3);
  })), n3;
}
function L3(n3, t3, e3) {
  return n3 && (n3.__v = null, n3.__k = n3.__k && n3.__k.map(function(n4) {
    return L3(n4, t3, e3);
  }), n3.__c && n3.__c.__P === t3 && (n3.__e && e3.insertBefore(n3.__e, n3.__d), n3.__c.__e = true, n3.__c.__P = e3)), n3;
}
function U2() {
  this.__u = 0, this.t = null, this.__b = null;
}
function D2(n3) {
  var t3 = n3.__.__c;
  return t3 && t3.__a && t3.__a(n3);
}
function M3() {
  this.u = null, this.o = null;
}
function G2() {
}
function J2() {
  return this.cancelBubble;
}
function K2() {
  return this.defaultPrevented;
}
var R2, x5, O4, T4, V3, j5, z4, B4, H3, q4, Q2, X2, nn2, tn2;
var init_compat_module = __esm({
  "js/preact/compat/dist/compat.module.js"() {
    "use strict";
    init_define_process();
    init_preact_module();
    init_preact_module();
    init_hooks_module();
    init_hooks_module();
    (E2.prototype = new d()).isPureReactComponent = true, E2.prototype.shouldComponentUpdate = function(n3, t3) {
      return C4(this.props, n3) || C4(this.state, t3);
    };
    R2 = l.__b;
    l.__b = function(n3) {
      n3.type && n3.type.__f && n3.ref && (n3.props.ref = n3.ref, n3.ref = null), R2 && R2(n3);
    };
    x5 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
    O4 = l.__e;
    l.__e = function(n3, t3, e3, r3) {
      if (n3.then) {
        for (var u4, o5 = t3; o5 = o5.__; )
          if ((u4 = o5.__c) && u4.__c)
            return null == t3.__e && (t3.__e = e3.__e, t3.__k = e3.__k), u4.__c(n3, t3);
      }
      O4(n3, t3, e3, r3);
    };
    T4 = l.unmount;
    l.unmount = function(n3) {
      var t3 = n3.__c;
      t3 && t3.__R && t3.__R(), t3 && true === n3.__h && (n3.type = null), T4 && T4(n3);
    }, (U2.prototype = new d()).__c = function(n3, t3) {
      var e3 = t3.__c, r3 = this;
      null == r3.t && (r3.t = []), r3.t.push(e3);
      var u4 = D2(r3.__v), o5 = false, i4 = function() {
        o5 || (o5 = true, e3.__R = null, u4 ? u4(l4) : l4());
      };
      e3.__R = i4;
      var l4 = function() {
        if (!--r3.__u) {
          if (r3.state.__a) {
            var n4 = r3.state.__a;
            r3.__v.__k[0] = L3(n4, n4.__c.__P, n4.__c.__O);
          }
          var t4;
          for (r3.setState({ __a: r3.__b = null }); t4 = r3.t.pop(); )
            t4.forceUpdate();
        }
      }, c4 = true === t3.__h;
      r3.__u++ || c4 || r3.setState({ __a: r3.__b = r3.__v.__k[0] }), n3.then(i4, i4);
    }, U2.prototype.componentWillUnmount = function() {
      this.t = [];
    }, U2.prototype.render = function(n3, e3) {
      if (this.__b) {
        if (this.__v.__k) {
          var r3 = document.createElement("div"), o5 = this.__v.__k[0].__c;
          this.__v.__k[0] = I3(this.__b, r3, o5.__O = o5.__P);
        }
        this.__b = null;
      }
      var i4 = e3.__a && h(p, null, n3.fallback);
      return i4 && (i4.__h = null), [h(p, null, e3.__a ? null : n3.children), i4];
    };
    V3 = function(n3, t3, e3) {
      if (++e3[1] === e3[0] && n3.o.delete(t3), n3.props.revealOrder && ("t" !== n3.props.revealOrder[0] || !n3.o.size))
        for (e3 = n3.u; e3; ) {
          for (; e3.length > 3; )
            e3.pop()();
          if (e3[1] < e3[0])
            break;
          n3.u = e3 = e3[2];
        }
    };
    (M3.prototype = new d()).__a = function(n3) {
      var t3 = this, e3 = D2(t3.__v), r3 = t3.o.get(n3);
      return r3[0]++, function(u4) {
        var o5 = function() {
          t3.props.revealOrder ? (r3.push(u4), V3(t3, n3, r3)) : u4();
        };
        e3 ? e3(o5) : o5();
      };
    }, M3.prototype.render = function(n3) {
      this.u = null, this.o = /* @__PURE__ */ new Map();
      var t3 = x(n3.children);
      n3.revealOrder && "b" === n3.revealOrder[0] && t3.reverse();
      for (var e3 = t3.length; e3--; )
        this.o.set(t3[e3], this.u = [1, 0, this.u]);
      return n3.children;
    }, M3.prototype.componentDidUpdate = M3.prototype.componentDidMount = function() {
      var n3 = this;
      this.o.forEach(function(t3, e3) {
        V3(n3, e3, t3);
      });
    };
    j5 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
    z4 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
    B4 = "undefined" != typeof document;
    H3 = function(n3) {
      return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n3);
    };
    d.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t3) {
      Object.defineProperty(d.prototype, t3, { configurable: true, get: function() {
        return this["UNSAFE_" + t3];
      }, set: function(n3) {
        Object.defineProperty(this, t3, { configurable: true, writable: true, value: n3 });
      } });
    });
    q4 = l.event;
    l.event = function(n3) {
      return q4 && (n3 = q4(n3)), n3.persist = G2, n3.isPropagationStopped = J2, n3.isDefaultPrevented = K2, n3.nativeEvent = n3;
    };
    X2 = { configurable: true, get: function() {
      return this.class;
    } };
    nn2 = l.vnode;
    l.vnode = function(n3) {
      var t3 = n3.type, e3 = n3.props, u4 = e3;
      if ("string" == typeof t3) {
        var o5 = -1 === t3.indexOf("-");
        for (var i4 in u4 = {}, e3) {
          var l4 = e3[i4];
          B4 && "children" === i4 && "noscript" === t3 || "value" === i4 && "defaultValue" in e3 && null == l4 || ("defaultValue" === i4 && "value" in e3 && null == e3.value ? i4 = "value" : "download" === i4 && true === l4 ? l4 = "" : /ondoubleclick/i.test(i4) ? i4 = "ondblclick" : /^onchange(textarea|input)/i.test(i4 + t3) && !H3(e3.type) ? i4 = "oninput" : /^onfocus$/i.test(i4) ? i4 = "onfocusin" : /^onblur$/i.test(i4) ? i4 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i4) ? i4 = i4.toLowerCase() : o5 && z4.test(i4) ? i4 = i4.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === l4 && (l4 = void 0), /^oninput$/i.test(i4) && (i4 = i4.toLowerCase(), u4[i4] && (i4 = "oninputCapture")), u4[i4] = l4);
        }
        "select" == t3 && u4.multiple && Array.isArray(u4.value) && (u4.value = x(e3.children).forEach(function(n4) {
          n4.props.selected = -1 != u4.value.indexOf(n4.props.value);
        })), "select" == t3 && null != u4.defaultValue && (u4.value = x(e3.children).forEach(function(n4) {
          n4.props.selected = u4.multiple ? -1 != u4.defaultValue.indexOf(n4.props.value) : u4.defaultValue == n4.props.value;
        })), n3.props = u4, e3.class != e3.className && (X2.enumerable = "className" in e3, null != e3.className && (u4.class = e3.className), Object.defineProperty(u4, "className", X2));
      }
      n3.$$typeof = j5, nn2 && nn2(n3);
    };
    tn2 = l.__r;
    l.__r = function(n3) {
      tn2 && tn2(n3), Q2 = n3.__c;
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

// js/react-preact.ts
var react_preact_exports = {};
__export(react_preact_exports, {
  Children: () => A4,
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
  createRoot: () => createRoot,
  default: () => _n,
  findDOMNode: () => fn,
  flushSync: () => sn,
  forwardRef: () => N2,
  hydrate: () => Y,
  hydrateRoot: () => hydrateRoot,
  isValidElement: () => on,
  jsx: () => o4,
  jsxs: () => o4,
  lazy: () => F2,
  memo: () => w4,
  render: () => Z,
  renderToString: () => S2,
  startTransition: () => vn,
  unmountComponentAtNode: () => cn,
  unstable_batchedUpdates: () => an,
  useCallback: () => T2,
  useContext: () => q2,
  useDebugValue: () => x3,
  useDeferredValue: () => dn,
  useEffect: () => h3,
  useErrorBoundary: () => P2,
  useId: () => V,
  useImperativeHandle: () => A3,
  useInsertionEffect: () => mn,
  useLayoutEffect: () => s3,
  useMemo: () => F,
  useReducer: () => y3,
  useRef: () => _3,
  useState: () => p3,
  useSyncExternalStore: () => yn,
  useTransition: () => pn,
  version: () => rn
});
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
var init_react_preact = __esm({
  "js/react-preact.ts"() {
    init_define_process();
    init_server_browser();
    init_compat();
    init_jsx_runtime();
    init_compat();
    init_compat();
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
  E,
  w4 as w,
  N2 as N,
  A4 as A2,
  U,
  F2,
  M2 as M,
  $2 as $,
  Z,
  Y,
  en,
  rn,
  un,
  on,
  ln,
  cn,
  fn,
  an,
  sn,
  hn,
  vn,
  dn,
  pn,
  mn,
  yn,
  _n,
  o4 as o,
  createRoot,
  hydrateRoot,
  react_preact_exports,
  init_react_preact
};
