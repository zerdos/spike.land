import {
  __export,
  init_define_process
} from "./chunk-VRTUUBI3.mjs";

// react.ts
init_define_process();

// ../../.yarn/global/cache/preact-npm-10.10.2-3095575411-8.zip/node_modules/preact/dist/preact.module.js
var preact_module_exports = {};
__export(preact_module_exports, {
  Component: () => d,
  Fragment: () => p,
  cloneElement: () => q,
  createContext: () => B,
  createElement: () => h,
  createRef: () => y,
  h: () => h,
  hydrate: () => S,
  isValidElement: () => i,
  options: () => l,
  render: () => P,
  toChildArray: () => x
});
init_define_process();
var n;
var l;
var u;
var i;
var t;
var o;
var r;
var f = {};
var e = [];
var c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
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
  var t3, o5, r4, f4 = {};
  for (r4 in u4)
    "key" == r4 ? t3 = u4[r4] : "ref" == r4 ? o5 = u4[r4] : f4[r4] = u4[r4];
  if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l4 && null != l4.defaultProps)
    for (r4 in l4.defaultProps)
      void 0 === f4[r4] && (f4[r4] = l4.defaultProps[r4]);
  return v(l4, f4, t3, o5, null);
}
function v(n3, i4, t3, o5, r4) {
  var f4 = { type: n3, props: i4, key: t3, ref: o5, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r4 ? ++u : r4 };
  return null == r4 && null != l.vnode && l.vnode(f4), f4;
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
      var l4, u4, i4, t3, o5, r4;
      n4.__d && (o5 = (t3 = (l4 = n4).__v).__e, (r4 = l4.__P) && (u4 = [], (i4 = s({}, t3)).__v = t3.__v + 1, j(r4, t3, i4, l4.__n, void 0 !== r4.ownerSVGElement, null != t3.__h ? [o5] : null, u4, null == o5 ? _(t3) : o5, t3.__h), z(u4, t3), t3.__e != o5 && k(t3)));
    });
}
function w(n3, l4, u4, i4, t3, o5, r4, c4, s4, a4) {
  var h4, y3, d4, k4, b3, g5, w4, x5 = i4 && i4.__k || e, C3 = x5.length;
  for (u4.__k = [], h4 = 0; h4 < l4.length; h4++)
    if (null != (k4 = u4.__k[h4] = null == (k4 = l4[h4]) || "boolean" == typeof k4 ? null : "string" == typeof k4 || "number" == typeof k4 || "bigint" == typeof k4 ? v(null, k4, null, null, k4) : Array.isArray(k4) ? v(p, { children: k4 }, null, null, null) : k4.__b > 0 ? v(k4.type, k4.props, k4.key, null, k4.__v) : k4)) {
      if (k4.__ = u4, k4.__b = u4.__b + 1, null === (d4 = x5[h4]) || d4 && k4.key == d4.key && k4.type === d4.type)
        x5[h4] = void 0;
      else
        for (y3 = 0; y3 < C3; y3++) {
          if ((d4 = x5[y3]) && k4.key == d4.key && k4.type === d4.type) {
            x5[y3] = void 0;
            break;
          }
          d4 = null;
        }
      j(n3, k4, d4 = d4 || f, t3, o5, r4, c4, s4, a4), b3 = k4.__e, (y3 = k4.ref) && d4.ref != y3 && (w4 || (w4 = []), d4.ref && w4.push(d4.ref, null, k4), w4.push(y3, k4.__c || b3, k4)), null != b3 ? (null == g5 && (g5 = b3), "function" == typeof k4.type && k4.__k === d4.__k ? k4.__d = s4 = m(k4, s4, n3) : s4 = A(n3, k4, d4, x5, b3, s4), "function" == typeof u4.type && (u4.__d = s4)) : s4 && d4.__e == s4 && s4.parentNode != n3 && (s4 = _(d4));
    }
  for (u4.__e = g5, h4 = C3; h4--; )
    null != x5[h4] && ("function" == typeof u4.type && null != x5[h4].__e && x5[h4].__e == u4.__d && (u4.__d = _(i4, h4 + 1)), N(x5[h4], x5[h4]));
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
  var r4, f4, e4;
  if (void 0 !== l4.__d)
    r4 = l4.__d, l4.__d = void 0;
  else if (null == u4 || t3 != o5 || null == t3.parentNode)
    n:
      if (null == o5 || o5.parentNode !== n3)
        n3.appendChild(t3), r4 = null;
      else {
        for (f4 = o5, e4 = 0; (f4 = f4.nextSibling) && e4 < i4.length; e4 += 2)
          if (f4 == t3)
            break n;
        n3.insertBefore(t3, o5), r4 = o5;
      }
  return void 0 !== r4 ? r4 : t3.nextSibling;
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
      "function" == typeof u4 || (null != u4 && (false !== u4 || "a" === l4[0] && "r" === l4[1]) ? n3.setAttribute(l4, u4) : n3.removeAttribute(l4));
    }
}
function I(n3) {
  this.l[n3.type + false](l.event ? l.event(n3) : n3);
}
function T(n3) {
  this.l[n3.type + true](l.event ? l.event(n3) : n3);
}
function j(n3, u4, i4, t3, o5, r4, f4, e4, c4) {
  var a4, h4, v4, y3, _4, k4, b3, g5, m4, x5, A4, C3, $3, H3 = u4.type;
  if (void 0 !== u4.constructor)
    return null;
  null != i4.__h && (c4 = i4.__h, e4 = u4.__e = i4.__e, u4.__h = null, r4 = [e4]), (a4 = l.__b) && a4(u4);
  try {
    n:
      if ("function" == typeof H3) {
        if (g5 = u4.props, m4 = (a4 = H3.contextType) && t3[a4.__c], x5 = a4 ? m4 ? m4.props.value : a4.__ : t3, i4.__c ? b3 = (h4 = u4.__c = i4.__c).__ = h4.__E : ("prototype" in H3 && H3.prototype.render ? u4.__c = h4 = new H3(g5, x5) : (u4.__c = h4 = new d(g5, x5), h4.constructor = H3, h4.render = O), m4 && m4.sub(h4), h4.props = g5, h4.state || (h4.state = {}), h4.context = x5, h4.__n = t3, v4 = h4.__d = true, h4.__h = []), null == h4.__s && (h4.__s = h4.state), null != H3.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = s({}, h4.__s)), s(h4.__s, H3.getDerivedStateFromProps(g5, h4.__s))), y3 = h4.props, _4 = h4.state, v4)
          null == H3.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
        else {
          if (null == H3.getDerivedStateFromProps && g5 !== y3 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(g5, x5), !h4.__e && null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(g5, h4.__s, x5) || u4.__v === i4.__v) {
            h4.props = g5, h4.state = h4.__s, u4.__v !== i4.__v && (h4.__d = false), h4.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
              n4 && (n4.__ = u4);
            }), h4.__h.length && f4.push(h4);
            break n;
          }
          null != h4.componentWillUpdate && h4.componentWillUpdate(g5, h4.__s, x5), null != h4.componentDidUpdate && h4.__h.push(function() {
            h4.componentDidUpdate(y3, _4, k4);
          });
        }
        if (h4.context = x5, h4.props = g5, h4.__v = u4, h4.__P = n3, A4 = l.__r, C3 = 0, "prototype" in H3 && H3.prototype.render)
          h4.state = h4.__s, h4.__d = false, A4 && A4(u4), a4 = h4.render(h4.props, h4.state, h4.context);
        else
          do {
            h4.__d = false, A4 && A4(u4), a4 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
          } while (h4.__d && ++C3 < 25);
        h4.state = h4.__s, null != h4.getChildContext && (t3 = s(s({}, t3), h4.getChildContext())), v4 || null == h4.getSnapshotBeforeUpdate || (k4 = h4.getSnapshotBeforeUpdate(y3, _4)), $3 = null != a4 && a4.type === p && null == a4.key ? a4.props.children : a4, w(n3, Array.isArray($3) ? $3 : [$3], u4, i4, t3, o5, r4, f4, e4, c4), h4.base = u4.__e, u4.__h = null, h4.__h.length && f4.push(h4), b3 && (h4.__E = h4.__ = null), h4.__e = false;
      } else
        null == r4 && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = L(i4.__e, u4, i4, t3, o5, r4, f4, c4);
    (a4 = l.diffed) && a4(u4);
  } catch (n4) {
    u4.__v = null, (c4 || null != r4) && (u4.__e = e4, u4.__h = !!c4, r4[r4.indexOf(e4)] = null), l.__e(n4, u4, i4);
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
function L(l4, u4, i4, t3, o5, r4, e4, c4) {
  var s4, h4, v4, y3 = i4.props, p4 = u4.props, d4 = u4.type, k4 = 0;
  if ("svg" === d4 && (o5 = true), null != r4) {
    for (; k4 < r4.length; k4++)
      if ((s4 = r4[k4]) && "setAttribute" in s4 == !!d4 && (d4 ? s4.localName === d4 : 3 === s4.nodeType)) {
        l4 = s4, r4[k4] = null;
        break;
      }
  }
  if (null == l4) {
    if (null === d4)
      return document.createTextNode(p4);
    l4 = o5 ? document.createElementNS("http://www.w3.org/2000/svg", d4) : document.createElement(d4, p4.is && p4), r4 = null, c4 = false;
  }
  if (null === d4)
    y3 === p4 || c4 && l4.data === p4 || (l4.data = p4);
  else {
    if (r4 = r4 && n.call(l4.childNodes), h4 = (y3 = i4.props || f).dangerouslySetInnerHTML, v4 = p4.dangerouslySetInnerHTML, !c4) {
      if (null != r4)
        for (y3 = {}, k4 = 0; k4 < l4.attributes.length; k4++)
          y3[l4.attributes[k4].name] = l4.attributes[k4].value;
      (v4 || h4) && (v4 && (h4 && v4.__html == h4.__html || v4.__html === l4.innerHTML) || (l4.innerHTML = v4 && v4.__html || ""));
    }
    if (C(l4, p4, y3, o5, c4), v4)
      u4.__k = [];
    else if (k4 = u4.props.children, w(l4, Array.isArray(k4) ? k4 : [k4], u4, i4, t3, o5 && "foreignObject" !== d4, r4, e4, r4 ? r4[0] : i4.__k && _(i4, 0), c4), null != r4)
      for (k4 = r4.length; k4--; )
        null != r4[k4] && a(r4[k4]);
    c4 || ("value" in p4 && void 0 !== (k4 = p4.value) && (k4 !== l4.value || "progress" === d4 && !k4 || "option" === d4 && k4 !== y3.value) && H(l4, "value", k4, y3.value, false), "checked" in p4 && void 0 !== (k4 = p4.checked) && k4 !== l4.checked && H(l4, "checked", k4, y3.checked, false));
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
    t3.base = t3.__P = null;
  }
  if (t3 = n3.__k)
    for (o5 = 0; o5 < t3.length; o5++)
      t3[o5] && N(t3[o5], u4, "function" != typeof n3.type);
  i4 || null == n3.__e || a(n3.__e), n3.__e = n3.__d = void 0;
}
function O(n3, l4, u4) {
  return this.constructor(n3, u4);
}
function P(u4, i4, t3) {
  var o5, r4, e4;
  l.__ && l.__(u4, i4), r4 = (o5 = "function" == typeof t3) ? null : t3 && t3.__k || i4.__k, e4 = [], j(i4, u4 = (!o5 && t3 || i4).__k = h(p, null, [u4]), r4 || f, f, void 0 !== i4.ownerSVGElement, !o5 && t3 ? [t3] : r4 ? null : i4.firstChild ? n.call(i4.childNodes) : null, e4, !o5 && t3 ? t3 : r4 ? r4.__e : i4.firstChild, o5), z(e4, u4);
}
function S(n3, l4) {
  P(n3, l4, S);
}
function q(l4, u4, i4) {
  var t3, o5, r4, f4 = s({}, l4.props);
  for (r4 in u4)
    "key" == r4 ? t3 = u4[r4] : "ref" == r4 ? o5 = u4[r4] : f4[r4] = u4[r4];
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
n = e.slice, l = { __e: function(n3, l4, u4, i4) {
  for (var t3, o5, r4; l4 = l4.__; )
    if ((t3 = l4.__c) && !t3.__)
      try {
        if ((o5 = t3.constructor) && null != o5.getDerivedStateFromError && (t3.setState(o5.getDerivedStateFromError(n3)), r4 = t3.__d), null != t3.componentDidCatch && (t3.componentDidCatch(n3, i4 || {}), r4 = t3.__d), r4)
          return t3.__E = t3;
      } catch (l5) {
        n3 = l5;
      }
  throw n3;
} }, u = 0, i = function(n3) {
  return null != n3 && void 0 === n3.constructor;
}, d.prototype.setState = function(n3, l4) {
  var u4;
  u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n3 && (n3 = n3(s({}, u4), this.props)), n3 && s(u4, n3), null != n3 && this.__v && (l4 && this.__h.push(l4), b(this));
}, d.prototype.forceUpdate = function(n3) {
  this.__v && (this.__e = true, n3 && this.__h.push(n3), b(this));
}, d.prototype.render = p, t = [], g.__r = 0, r = 0;

// ../../.yarn/global/cache/preact-npm-10.10.2-3095575411-8.zip/node_modules/preact/compat/dist/compat.module.js
init_define_process();

// ../../.yarn/global/cache/preact-npm-10.10.2-3095575411-8.zip/node_modules/preact/hooks/dist/hooks.module.js
init_define_process();
var t2;
var r2;
var u2;
var i2;
var o2 = 0;
var c2 = [];
var f2 = [];
var e2 = l.__b;
var a2 = l.__r;
var v2 = l.diffed;
var l2 = l.__c;
var m2 = l.unmount;
function d2(t3, u4) {
  l.__h && l.__h(r2, t3, o2 || u4), o2 = 0;
  var i4 = r2.__H || (r2.__H = { __: [], __h: [] });
  return t3 >= i4.__.length && i4.__.push({ __V: f2 }), i4.__[t3];
}
function p2(n3) {
  return o2 = 1, y2(z2, n3);
}
function y2(n3, u4, i4) {
  var o5 = d2(t2++, 2);
  if (o5.t = n3, !o5.__c && (o5.__ = [i4 ? i4(u4) : z2(void 0, u4), function(n4) {
    var t3 = o5.__N ? o5.__N[0] : o5.__[0], r4 = o5.t(t3, n4);
    t3 !== r4 && (o5.__N = [r4, o5.__[1]], o5.__c.setState({}));
  }], o5.__c = r2, !o5.__c.u)) {
    o5.__c.__H.u = true;
    var c4 = o5.__c.shouldComponentUpdate;
    o5.__c.shouldComponentUpdate = function(n4, t3, r4) {
      if (!o5.__c.__H)
        return true;
      var u5 = o5.__c.__H.__.filter(function(n5) {
        return n5.__c;
      });
      return u5.every(function(n5) {
        return !n5.__N;
      }) ? !c4 || c4(n4, t3, r4) : !u5.every(function(n5) {
        if (!n5.__N)
          return true;
        var t4 = n5.__[0];
        return n5.__ = n5.__N, n5.__N = void 0, t4 === n5.__[0];
      }) && (!c4 || c4(n4, t3, r4));
    };
  }
  return o5.__N || o5.__;
}
function _2(u4, i4) {
  var o5 = d2(t2++, 3);
  !l.__s && w2(o5.__H, i4) && (o5.__ = u4, o5.i = i4, r2.__H.__h.push(o5));
}
function h2(u4, i4) {
  var o5 = d2(t2++, 4);
  !l.__s && w2(o5.__H, i4) && (o5.__ = u4, o5.i = i4, r2.__h.push(o5));
}
function s2(n3) {
  return o2 = 5, F(function() {
    return { current: n3 };
  }, []);
}
function A2(n3, t3, r4) {
  o2 = 6, h2(function() {
    return "function" == typeof n3 ? (n3(t3()), function() {
      return n3(null);
    }) : n3 ? (n3.current = t3(), function() {
      return n3.current = null;
    }) : void 0;
  }, null == r4 ? r4 : r4.concat(n3));
}
function F(n3, r4) {
  var u4 = d2(t2++, 7);
  return w2(u4.__H, r4) ? (u4.__V = n3(), u4.i = r4, u4.__h = n3, u4.__V) : u4.__;
}
function T2(n3, t3) {
  return o2 = 8, F(function() {
    return n3;
  }, t3);
}
function q2(n3) {
  var u4 = r2.context[n3.__c], i4 = d2(t2++, 9);
  return i4.c = n3, u4 ? (null == i4.__ && (i4.__ = true, u4.sub(r2)), u4.props.value) : n3.__;
}
function x2(t3, r4) {
  l.useDebugValue && l.useDebugValue(r4 ? r4(t3) : t3);
}
function b2() {
  for (var t3; t3 = c2.shift(); )
    if (t3.__P && t3.__H)
      try {
        t3.__H.__h.forEach(j2), t3.__H.__h.forEach(k2), t3.__H.__h = [];
      } catch (r4) {
        t3.__H.__h = [], l.__e(r4, t3.__v);
      }
}
l.__b = function(n3) {
  r2 = null, e2 && e2(n3);
}, l.__r = function(n3) {
  a2 && a2(n3), t2 = 0;
  var i4 = (r2 = n3.__c).__H;
  i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n4) {
    n4.__N && (n4.__ = n4.__N), n4.__V = f2, n4.__N = n4.i = void 0;
  })) : (i4.__h.forEach(j2), i4.__h.forEach(k2), i4.__h = [])), u2 = r2;
}, l.diffed = function(t3) {
  v2 && v2(t3);
  var o5 = t3.__c;
  o5 && o5.__H && (o5.__H.__h.length && (1 !== c2.push(o5) && i2 === l.requestAnimationFrame || ((i2 = l.requestAnimationFrame) || function(n3) {
    var t4, r4 = function() {
      clearTimeout(u4), g2 && cancelAnimationFrame(t4), setTimeout(n3);
    }, u4 = setTimeout(r4, 100);
    g2 && (t4 = requestAnimationFrame(r4));
  })(b2)), o5.__H.__.forEach(function(n3) {
    n3.i && (n3.__H = n3.i), n3.__V !== f2 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = f2;
  })), u2 = r2 = null;
}, l.__c = function(t3, r4) {
  r4.some(function(t4) {
    try {
      t4.__h.forEach(j2), t4.__h = t4.__h.filter(function(n3) {
        return !n3.__ || k2(n3);
      });
    } catch (u4) {
      r4.some(function(n3) {
        n3.__h && (n3.__h = []);
      }), r4 = [], l.__e(u4, t4.__v);
    }
  }), l2 && l2(t3, r4);
}, l.unmount = function(t3) {
  m2 && m2(t3);
  var r4, u4 = t3.__c;
  u4 && u4.__H && (u4.__H.__.forEach(function(n3) {
    try {
      j2(n3);
    } catch (n4) {
      r4 = n4;
    }
  }), r4 && l.__e(r4, u4.__v));
};
var g2 = "function" == typeof requestAnimationFrame;
function j2(n3) {
  var t3 = r2, u4 = n3.__c;
  "function" == typeof u4 && (n3.__c = void 0, u4()), r2 = t3;
}
function k2(n3) {
  var t3 = r2;
  n3.__c = n3.__(), r2 = t3;
}
function w2(n3, t3) {
  return !n3 || n3.length !== t3.length || t3.some(function(t4, r4) {
    return t4 !== n3[r4];
  });
}
function z2(n3, t3) {
  return "function" == typeof t3 ? t3(n3) : t3;
}

// ../../.yarn/global/cache/preact-npm-10.10.2-3095575411-8.zip/node_modules/preact/compat/dist/compat.module.js
function S2(n3, t3) {
  for (var e4 in t3)
    n3[e4] = t3[e4];
  return n3;
}
function g3(n3, t3) {
  for (var e4 in n3)
    if ("__source" !== e4 && !(e4 in t3))
      return true;
  for (var r4 in t3)
    if ("__source" !== r4 && n3[r4] !== t3[r4])
      return true;
  return false;
}
function C2(n3) {
  this.props = n3;
}
function E(n3, t3) {
  function e4(n4) {
    var e5 = this.props.ref, r5 = e5 == n4.ref;
    return !r5 && e5 && (e5.call ? e5(null) : e5.current = null), t3 ? !t3(this.props, n4) || !r5 : g3(this.props, n4);
  }
  function r4(t4) {
    return this.shouldComponentUpdate = e4, h(n3, t4);
  }
  return r4.displayName = "Memo(" + (n3.displayName || n3.name) + ")", r4.prototype.isReactComponent = true, r4.__f = true, r4;
}
(C2.prototype = new d()).isPureReactComponent = true, C2.prototype.shouldComponentUpdate = function(n3, t3) {
  return g3(this.props, n3) || g3(this.state, t3);
};
var w3 = l.__b;
l.__b = function(n3) {
  n3.type && n3.type.__f && n3.ref && (n3.props.ref = n3.ref, n3.ref = null), w3 && w3(n3);
};
var x3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function R(n3) {
  function t3(t4) {
    var e4 = S2({}, t4);
    return delete e4.ref, n3(e4, t4.ref || null);
  }
  return t3.$$typeof = x3, t3.render = t3, t3.prototype.isReactComponent = t3.__f = true, t3.displayName = "ForwardRef(" + (n3.displayName || n3.name) + ")", t3;
}
var N2 = function(n3, t3) {
  return null == n3 ? null : x(x(n3).map(t3));
};
var k3 = { map: N2, forEach: N2, count: function(n3) {
  return n3 ? x(n3).length : 0;
}, only: function(n3) {
  var t3 = x(n3);
  if (1 !== t3.length)
    throw "Children.only";
  return t3[0];
}, toArray: x };
var A3 = l.__e;
l.__e = function(n3, t3, e4, r4) {
  if (n3.then) {
    for (var u4, o5 = t3; o5 = o5.__; )
      if ((u4 = o5.__c) && u4.__c)
        return null == t3.__e && (t3.__e = e4.__e, t3.__k = e4.__k), u4.__c(n3, t3);
  }
  A3(n3, t3, e4, r4);
};
var O2 = l.unmount;
function T3() {
  this.__u = 0, this.t = null, this.__b = null;
}
function L2(n3) {
  var t3 = n3.__.__c;
  return t3 && t3.__a && t3.__a(n3);
}
function U(n3) {
  var t3, e4, r4;
  function u4(u5) {
    if (t3 || (t3 = n3()).then(function(n4) {
      e4 = n4.default || n4;
    }, function(n4) {
      r4 = n4;
    }), r4)
      throw r4;
    if (!e4)
      throw t3;
    return h(e4, u5);
  }
  return u4.displayName = "Lazy", u4.__f = true, u4;
}
function D() {
  this.u = null, this.o = null;
}
l.unmount = function(n3) {
  var t3 = n3.__c;
  t3 && t3.__R && t3.__R(), t3 && true === n3.__h && (n3.type = null), O2 && O2(n3);
}, (T3.prototype = new d()).__c = function(n3, t3) {
  var e4 = t3.__c, r4 = this;
  null == r4.t && (r4.t = []), r4.t.push(e4);
  var u4 = L2(r4.__v), o5 = false, i4 = function() {
    o5 || (o5 = true, e4.__R = null, u4 ? u4(l4) : l4());
  };
  e4.__R = i4;
  var l4 = function() {
    if (!--r4.__u) {
      if (r4.state.__a) {
        var n4 = r4.state.__a;
        r4.__v.__k[0] = function n5(t5, e5, r5) {
          return t5 && (t5.__v = null, t5.__k = t5.__k && t5.__k.map(function(t6) {
            return n5(t6, e5, r5);
          }), t5.__c && t5.__c.__P === e5 && (t5.__e && r5.insertBefore(t5.__e, t5.__d), t5.__c.__e = true, t5.__c.__P = r5)), t5;
        }(n4, n4.__c.__P, n4.__c.__O);
      }
      var t4;
      for (r4.setState({ __a: r4.__b = null }); t4 = r4.t.pop(); )
        t4.forceUpdate();
    }
  }, f4 = true === t3.__h;
  r4.__u++ || f4 || r4.setState({ __a: r4.__b = r4.__v.__k[0] }), n3.then(i4, i4);
}, T3.prototype.componentWillUnmount = function() {
  this.t = [];
}, T3.prototype.render = function(n3, t3) {
  if (this.__b) {
    if (this.__v.__k) {
      var e4 = document.createElement("div"), r4 = this.__v.__k[0].__c;
      this.__v.__k[0] = function n4(t4, e5, r5) {
        return t4 && (t4.__c && t4.__c.__H && (t4.__c.__H.__.forEach(function(n5) {
          "function" == typeof n5.__c && n5.__c();
        }), t4.__c.__H = null), null != (t4 = S2({}, t4)).__c && (t4.__c.__P === r5 && (t4.__c.__P = e5), t4.__c = null), t4.__k = t4.__k && t4.__k.map(function(t5) {
          return n4(t5, e5, r5);
        })), t4;
      }(this.__b, e4, r4.__O = r4.__P);
    }
    this.__b = null;
  }
  var u4 = t3.__a && h(p, null, n3.fallback);
  return u4 && (u4.__h = null), [h(p, null, t3.__a ? null : n3.children), u4];
};
var F2 = function(n3, t3, e4) {
  if (++e4[1] === e4[0] && n3.o.delete(t3), n3.props.revealOrder && ("t" !== n3.props.revealOrder[0] || !n3.o.size))
    for (e4 = n3.u; e4; ) {
      for (; e4.length > 3; )
        e4.pop()();
      if (e4[1] < e4[0])
        break;
      n3.u = e4 = e4[2];
    }
};
function I2(n3) {
  return this.getChildContext = function() {
    return n3.context;
  }, n3.children;
}
function M2(n3) {
  var t3 = this, e4 = n3.i;
  t3.componentWillUnmount = function() {
    P(null, t3.l), t3.l = null, t3.i = null;
  }, t3.i && t3.i !== e4 && t3.componentWillUnmount(), n3.__v ? (t3.l || (t3.i = e4, t3.l = { nodeType: 1, parentNode: e4, childNodes: [], appendChild: function(n4) {
    this.childNodes.push(n4), t3.i.appendChild(n4);
  }, insertBefore: function(n4, e5) {
    this.childNodes.push(n4), t3.i.appendChild(n4);
  }, removeChild: function(n4) {
    this.childNodes.splice(this.childNodes.indexOf(n4) >>> 1, 1), t3.i.removeChild(n4);
  } }), P(h(I2, { context: t3.context }, n3.__v), t3.l)) : t3.l && t3.componentWillUnmount();
}
function V(n3, t3) {
  var e4 = h(M2, { __v: n3, i: t3 });
  return e4.containerInfo = t3, e4;
}
(D.prototype = new d()).__a = function(n3) {
  var t3 = this, e4 = L2(t3.__v), r4 = t3.o.get(n3);
  return r4[0]++, function(u4) {
    var o5 = function() {
      t3.props.revealOrder ? (r4.push(u4), F2(t3, n3, r4)) : u4();
    };
    e4 ? e4(o5) : o5();
  };
}, D.prototype.render = function(n3) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var t3 = x(n3.children);
  n3.revealOrder && "b" === n3.revealOrder[0] && t3.reverse();
  for (var e4 = t3.length; e4--; )
    this.o.set(t3[e4], this.u = [1, 0, this.u]);
  return n3.children;
}, D.prototype.componentDidUpdate = D.prototype.componentDidMount = function() {
  var n3 = this;
  this.o.forEach(function(t3, e4) {
    F2(n3, e4, t3);
  });
};
var W = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
var P2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var $2 = "undefined" != typeof document;
var j3 = function(n3) {
  return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n3);
};
function z3(n3, t3, e4) {
  return null == t3.__k && (t3.textContent = ""), P(n3, t3), "function" == typeof e4 && e4(), n3 ? n3.__c : null;
}
function B2(n3, t3, e4) {
  return S(n3, t3), "function" == typeof e4 && e4(), n3 ? n3.__c : null;
}
d.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n3) {
  Object.defineProperty(d.prototype, n3, { configurable: true, get: function() {
    return this["UNSAFE_" + n3];
  }, set: function(t3) {
    Object.defineProperty(this, n3, { configurable: true, writable: true, value: t3 });
  } });
});
var H2 = l.event;
function Z() {
}
function Y() {
  return this.cancelBubble;
}
function q3() {
  return this.defaultPrevented;
}
l.event = function(n3) {
  return H2 && (n3 = H2(n3)), n3.persist = Z, n3.isPropagationStopped = Y, n3.isDefaultPrevented = q3, n3.nativeEvent = n3;
};
var G;
var J = { configurable: true, get: function() {
  return this.class;
} };
var K = l.vnode;
l.vnode = function(n3) {
  var t3 = n3.type, e4 = n3.props, r4 = e4;
  if ("string" == typeof t3) {
    var u4 = -1 === t3.indexOf("-");
    for (var o5 in r4 = {}, e4) {
      var i4 = e4[o5];
      $2 && "children" === o5 && "noscript" === t3 || "value" === o5 && "defaultValue" in e4 && null == i4 || ("defaultValue" === o5 && "value" in e4 && null == e4.value ? o5 = "value" : "download" === o5 && true === i4 ? i4 = "" : /ondoubleclick/i.test(o5) ? o5 = "ondblclick" : /^onchange(textarea|input)/i.test(o5 + t3) && !j3(e4.type) ? o5 = "oninput" : /^onfocus$/i.test(o5) ? o5 = "onfocusin" : /^onblur$/i.test(o5) ? o5 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o5) ? o5 = o5.toLowerCase() : u4 && P2.test(o5) ? o5 = o5.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === i4 && (i4 = void 0), /^oninput$/i.test(o5) && (o5 = o5.toLowerCase(), r4[o5] && (o5 = "oninputCapture")), r4[o5] = i4);
    }
    "select" == t3 && r4.multiple && Array.isArray(r4.value) && (r4.value = x(e4.children).forEach(function(n4) {
      n4.props.selected = -1 != r4.value.indexOf(n4.props.value);
    })), "select" == t3 && null != r4.defaultValue && (r4.value = x(e4.children).forEach(function(n4) {
      n4.props.selected = r4.multiple ? -1 != r4.defaultValue.indexOf(n4.props.value) : r4.defaultValue == n4.props.value;
    })), n3.props = r4, e4.class != e4.className && (J.enumerable = "className" in e4, null != e4.className && (r4.class = e4.className), Object.defineProperty(r4, "className", J));
  }
  n3.$$typeof = W, K && K(n3);
};
var Q = l.__r;
l.__r = function(n3) {
  Q && Q(n3), G = n3.__c;
};
var X = { ReactCurrentDispatcher: { current: { readContext: function(n3) {
  return G.__n[n3.__c].props.value;
} } } };
function tn(n3) {
  return h.bind(null, n3);
}
function en(n3) {
  return !!n3 && n3.$$typeof === W;
}
function rn(n3) {
  return en(n3) ? q.apply(null, arguments) : n3;
}
function un(n3) {
  return !!n3.__k && (P(null, n3), true);
}
function on(n3) {
  return n3 && (n3.base || 1 === n3.nodeType && n3) || null;
}
var ln = function(n3, t3) {
  return n3(t3);
};
var fn = function(n3, t3) {
  return n3(t3);
};
function an(n3) {
  n3();
}
function sn(n3) {
  return n3;
}
function hn() {
  return [false, an];
}
function dn(t3, u4) {
  var o5 = p2(u4), i4 = o5[0], l4 = o5[1], f4 = u4();
  return h2(function() {
    f4 !== i4 && l4(function() {
      return f4;
    });
  }, [t3, f4, u4]), _2(function() {
    return t3(function() {
      l4(function() {
        return u4();
      });
    });
  }, [t3, u4]), i4;
}
var compat_module_default = { useState: p2, useReducer: y2, useEffect: _2, useLayoutEffect: h2, useInsertionEffect: h2, useTransition: hn, useDeferredValue: sn, useSyncExternalStore: dn, startTransition: an, useRef: s2, useImperativeHandle: A2, useMemo: F, useCallback: T2, useContext: q2, useDebugValue: x2, version: "17.0.2", Children: k3, render: z3, hydrate: B2, unmountComponentAtNode: un, createPortal: V, createElement: h, createContext: B, createFactory: tn, cloneElement: rn, createRef: y, Fragment: p, isValidElement: en, findDOMNode: on, Component: d, PureComponent: C2, memo: E, forwardRef: R, flushSync: fn, unstable_batchedUpdates: ln, StrictMode: p, Suspense: T3, SuspenseList: D, lazy: U, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: X };

// ../../.yarn/__virtual__/preact-render-to-string-virtual-09aebd00f2/0/global/cache/preact-render-to-string-npm-5.2.1-4438cea7d0-8.zip/node_modules/preact-render-to-string/dist/index.module.js
init_define_process();
var r3 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
var n2 = /[&<>"]/;
function o3(e4) {
  var t3 = String(e4);
  return n2.test(t3) ? t3.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t3;
}
var a3 = function(e4, t3) {
  return String(e4).replace(/(\n+)/g, "$1" + (t3 || "	"));
};
var i3 = function(e4, t3, r4) {
  return String(e4).length > (t3 || 40) || !r4 && -1 !== String(e4).indexOf("\n") || -1 !== String(e4).indexOf("<");
};
var l3 = {};
function s3(e4) {
  var t3 = "";
  for (var n3 in e4) {
    var o5 = e4[n3];
    null != o5 && "" !== o5 && (t3 && (t3 += " "), t3 += "-" == n3[0] ? n3 : l3[n3] || (l3[n3] = n3.replace(/([A-Z])/g, "-$1").toLowerCase()), t3 += ": ", t3 += o5, "number" == typeof o5 && false === r3.test(n3) && (t3 += "px"), t3 += ";");
  }
  return t3 || void 0;
}
function f3(e4, t3) {
  for (var r4 in t3)
    e4[r4] = t3[r4];
  return e4;
}
function u3(e4, t3) {
  return Array.isArray(t3) ? t3.reduce(u3, e4) : null != t3 && false !== t3 && e4.push(t3), e4;
}
var c3 = { shallow: true };
var p3 = [];
var _3 = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
var d3 = /[\s\n\\/='"\0<>]/;
function v3() {
  this.__d = true;
}
m3.render = m3;
var g4 = function(e4, t3) {
  return m3(e4, t3, c3);
};
var h3 = [];
function m3(t3, r4, n3) {
  r4 = r4 || {}, n3 = n3 || {};
  var o5 = l.__s;
  l.__s = true;
  var a4 = x4(t3, r4, n3);
  return l.__c && l.__c(t3, h3), h3.length = 0, l.__s = o5, a4;
}
function x4(r4, n3, l4, c4, g5, h4) {
  if (null == r4 || "boolean" == typeof r4)
    return "";
  if ("object" != typeof r4)
    return o3(r4);
  var m4 = l4.pretty, y3 = m4 && "string" == typeof m4 ? m4 : "	";
  if (Array.isArray(r4)) {
    for (var b3 = "", S3 = 0; S3 < r4.length; S3++)
      m4 && S3 > 0 && (b3 += "\n"), b3 += x4(r4[S3], n3, l4, c4, g5, h4);
    return b3;
  }
  var k4, w4 = r4.type, O3 = r4.props, C3 = false;
  if ("function" == typeof w4) {
    if (C3 = true, !l4.shallow || !c4 && false !== l4.renderRootComponent) {
      if (w4 === p) {
        var A4 = [];
        return u3(A4, r4.props.children), x4(A4, n3, l4, false !== l4.shallowHighOrder, g5, h4);
      }
      var H3, j4 = r4.__c = { __v: r4, context: n3, props: r4.props, setState: v3, forceUpdate: v3, __d: true, __h: [] };
      l.__b && l.__b(r4);
      var F3 = l.__r;
      if (w4.prototype && "function" == typeof w4.prototype.render) {
        var M3 = w4.contextType, T4 = M3 && n3[M3.__c], $3 = null != M3 ? T4 ? T4.props.value : M3.__ : n3;
        (j4 = r4.__c = new w4(O3, $3)).__v = r4, j4._dirty = j4.__d = true, j4.props = O3, null == j4.state && (j4.state = {}), null == j4._nextState && null == j4.__s && (j4._nextState = j4.__s = j4.state), j4.context = $3, w4.getDerivedStateFromProps ? j4.state = f3(f3({}, j4.state), w4.getDerivedStateFromProps(j4.props, j4.state)) : j4.componentWillMount && (j4.componentWillMount(), j4.state = j4._nextState !== j4.state ? j4._nextState : j4.__s !== j4.state ? j4.__s : j4.state), F3 && F3(r4), H3 = j4.render(j4.props, j4.state, j4.context);
      } else
        for (var L3 = w4.contextType, E2 = L3 && n3[L3.__c], D2 = null != L3 ? E2 ? E2.props.value : L3.__ : n3, N3 = 0; j4.__d && N3++ < 25; )
          j4.__d = false, F3 && F3(r4), H3 = w4.call(r4.__c, O3, D2);
      return j4.getChildContext && (n3 = f3(f3({}, n3), j4.getChildContext())), l.diffed && l.diffed(r4), x4(H3, n3, l4, false !== l4.shallowHighOrder, g5, h4);
    }
    w4 = (k4 = w4).displayName || k4 !== Function && k4.name || function(e4) {
      var t3 = (Function.prototype.toString.call(e4).match(/^\s*function\s+([^( ]+)/) || "")[1];
      if (!t3) {
        for (var r5 = -1, n4 = p3.length; n4--; )
          if (p3[n4] === e4) {
            r5 = n4;
            break;
          }
        r5 < 0 && (r5 = p3.push(e4) - 1), t3 = "UnnamedComponent" + r5;
      }
      return t3;
    }(k4);
  }
  var P3, R2, U2 = "<" + w4;
  if (O3) {
    var W2 = Object.keys(O3);
    l4 && true === l4.sortAttributes && W2.sort();
    for (var q4 = 0; q4 < W2.length; q4++) {
      var z4 = W2[q4], I3 = O3[z4];
      if ("children" !== z4) {
        if (!d3.test(z4) && (l4 && l4.allAttributes || "key" !== z4 && "ref" !== z4 && "__self" !== z4 && "__source" !== z4)) {
          if ("defaultValue" === z4)
            z4 = "value";
          else if ("defaultChecked" === z4)
            z4 = "checked";
          else if ("defaultSelected" === z4)
            z4 = "selected";
          else if ("className" === z4) {
            if (void 0 !== O3.class)
              continue;
            z4 = "class";
          } else
            g5 && /^xlink:?./.test(z4) && (z4 = z4.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if ("htmlFor" === z4) {
            if (O3.for)
              continue;
            z4 = "for";
          }
          "style" === z4 && I3 && "object" == typeof I3 && (I3 = s3(I3)), "a" === z4[0] && "r" === z4[1] && "boolean" == typeof I3 && (I3 = String(I3));
          var V2 = l4.attributeHook && l4.attributeHook(z4, I3, n3, l4, C3);
          if (V2 || "" === V2)
            U2 += V2;
          else if ("dangerouslySetInnerHTML" === z4)
            R2 = I3 && I3.__html;
          else if ("textarea" === w4 && "value" === z4)
            P3 = I3;
          else if ((I3 || 0 === I3 || "" === I3) && "function" != typeof I3) {
            if (!(true !== I3 && "" !== I3 || (I3 = z4, l4 && l4.xml))) {
              U2 = U2 + " " + z4;
              continue;
            }
            if ("value" === z4) {
              if ("select" === w4) {
                h4 = I3;
                continue;
              }
              "option" === w4 && h4 == I3 && void 0 === O3.selected && (U2 += " selected");
            }
            U2 = U2 + " " + z4 + '="' + o3(I3) + '"';
          }
        }
      } else
        P3 = I3;
    }
  }
  if (m4) {
    var Z2 = U2.replace(/\n\s*/, " ");
    Z2 === U2 || ~Z2.indexOf("\n") ? m4 && ~U2.indexOf("\n") && (U2 += "\n") : U2 = Z2;
  }
  if (U2 += ">", d3.test(w4))
    throw new Error(w4 + " is not a valid HTML tag name in " + U2);
  var B3, G2 = _3.test(w4) || l4.voidElements && l4.voidElements.test(w4), J2 = [];
  if (R2)
    m4 && i3(R2) && (R2 = "\n" + y3 + a3(R2, y3)), U2 += R2;
  else if (null != P3 && u3(B3 = [], P3).length) {
    for (var K2 = m4 && ~U2.indexOf("\n"), Q2 = false, X2 = 0; X2 < B3.length; X2++) {
      var Y2 = B3[X2];
      if (null != Y2 && false !== Y2) {
        var ee = x4(Y2, n3, l4, true, "svg" === w4 || "foreignObject" !== w4 && g5, h4);
        if (m4 && !K2 && i3(ee) && (K2 = true), ee)
          if (m4) {
            var te = ee.length > 0 && "<" != ee[0];
            Q2 && te ? J2[J2.length - 1] += ee : J2.push(ee), Q2 = te;
          } else
            J2.push(ee);
      }
    }
    if (m4 && K2)
      for (var re = J2.length; re--; )
        J2[re] = "\n" + y3 + a3(J2[re], y3);
  }
  if (J2.length || R2)
    U2 += J2.join("");
  else if (l4 && l4.xml)
    return U2.substring(0, U2.length - 1) + " />";
  return !G2 || B3 || R2 ? (m4 && ~U2.indexOf("\n") && (U2 += "\n"), U2 = U2 + "</" + w4 + ">") : U2 = U2.replace(/>$/, " />"), U2;
}
m3.shallowRender = g4;

// ../../.yarn/global/cache/preact-npm-10.10.2-3095575411-8.zip/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
init_define_process();
var o4 = 0;
function e3(_4, e4, n3, t3, f4) {
  var l4, s4, u4 = {};
  for (s4 in e4)
    "ref" == s4 ? l4 = e4[s4] : u4[s4] = e4[s4];
  var a4 = { type: _4, props: u4, key: n3, ref: l4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --o4, __source: f4, __self: t3 };
  if ("function" == typeof _4 && (l4 = _4.defaultProps))
    for (s4 in l4)
      void 0 === u4[s4] && (u4[s4] = l4[s4]);
  return l.vnode && l.vnode(a4), a4;
}

// react.ts
var currentIndex;
var currentComponent;
var currentHook = 0;
var EMPTY = [];
var oldBeforeDiff = l._diff;
var oldBeforeRender = l._render;
var oldAfterDiff = l.diffed;
var oldCommit = l._commit;
var oldBeforeUnmount = l.unmount;
l._diff = (vnode) => {
  if (vnode.type === p) {
    vnode._mask = "";
  } else if (typeof vnode.type === "function" && !vnode._mask) {
    const parentMask = vnode._parent && vnode._parent._mask ? vnode._parent._mask : "";
    const position = vnode._parent && vnode._parent._children ? vnode._parent._children.indexOf(vnode) : 0;
    vnode._mask = parentMask + position;
  } else if (!vnode._mask) {
    vnode._mask = vnode._parent._mask;
  }
  currentComponent = null;
  if (oldBeforeDiff)
    oldBeforeDiff(vnode);
};
function hash(str) {
  let i4 = 0, out = 11;
  while (i4 < str.length)
    out = 101 * out + str.charCodeAt(i4++) >>> 0;
  return out;
}
function getHookState(index, type) {
  if (l._hook) {
    l._hook(currentComponent, index, currentHook || type);
  }
  currentHook = 0;
  const hooks = currentComponent.__hooks || (currentComponent.__hooks = {
    _list: [],
    _pendingEffects: []
  });
  if (index >= hooks._list.length) {
    hooks._list.push({ _pendingValue: EMPTY });
  }
  return hooks._list[index];
}
function useId() {
  const state = getHookState(currentIndex++, 11);
  if (!state._value) {
    state._value = "P" + hash(currentComponent._vnode._mask + currentIndex);
  }
  return state._value;
}
var React = window.React = window.React || { ...preact_module_exports, ...compat_module_default, createPortal: V, SuspenseList: D, findDOMNode: on };
var { createContext } = React;
var { hydrate, render, unmountComponentAtNode } = React;
var react_default = React;
var {
  createElement,
  cloneElement,
  createFactory,
  createRef,
  useCallback,
  useContext,
  useDebugValue,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  lazy,
  Suspense,
  StrictMode,
  forwardRef,
  memo,
  Children,
  PureComponent,
  Component,
  version
} = React;
var flushSync = (callback, arg) => callback(arg);
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
function hydrateRoot(container, children) {
  hydrate(children, container);
  return createRoot(container);
}

export {
  p,
  D,
  V,
  on,
  m3 as m,
  e3 as e,
  useId,
  createContext,
  hydrate,
  render,
  unmountComponentAtNode,
  react_default,
  createElement,
  cloneElement,
  createFactory,
  createRef,
  useCallback,
  useContext,
  useDebugValue,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  lazy,
  Suspense,
  StrictMode,
  forwardRef,
  memo,
  Children,
  PureComponent,
  Component,
  version,
  flushSync,
  createRoot,
  hydrateRoot
};
