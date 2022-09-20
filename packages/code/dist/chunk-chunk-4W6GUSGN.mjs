import {
  __esm,
  __export,
  __name,
  init_define_process
} from "./chunk-chunk-S6BTEEN4.mjs";

// node_modules/preact/dist/preact.module.js
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
function s(n4, l6) {
  for (var u6 in l6)
    n4[u6] = l6[u6];
  return n4;
}
function a(n4) {
  var l6 = n4.parentNode;
  l6 && l6.removeChild(n4);
}
function h(l6, u6, i5) {
  var t3, o6, r4, f5 = {};
  for (r4 in u6)
    "key" == r4 ? t3 = u6[r4] : "ref" == r4 ? o6 = u6[r4] : f5[r4] = u6[r4];
  if (arguments.length > 2 && (f5.children = arguments.length > 3 ? n.call(arguments, 2) : i5), "function" == typeof l6 && null != l6.defaultProps)
    for (r4 in l6.defaultProps)
      void 0 === f5[r4] && (f5[r4] = l6.defaultProps[r4]);
  return v(l6, f5, t3, o6, null);
}
function v(n4, i5, t3, o6, r4) {
  var f5 = { type: n4, props: i5, key: t3, ref: o6, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r4 ? ++u : r4 };
  return null == r4 && null != l.vnode && l.vnode(f5), f5;
}
function y() {
  return { current: null };
}
function p(n4) {
  return n4.children;
}
function d(n4, l6) {
  this.props = n4, this.context = l6;
}
function _(n4, l6) {
  if (null == l6)
    return n4.__ ? _(n4.__, n4.__.__k.indexOf(n4) + 1) : null;
  for (var u6; l6 < n4.__k.length; l6++)
    if (null != (u6 = n4.__k[l6]) && null != u6.__e)
      return u6.__e;
  return "function" == typeof n4.type ? _(n4) : null;
}
function k(n4) {
  var l6, u6;
  if (null != (n4 = n4.__) && null != n4.__c) {
    for (n4.__e = n4.__c.base = null, l6 = 0; l6 < n4.__k.length; l6++)
      if (null != (u6 = n4.__k[l6]) && null != u6.__e) {
        n4.__e = n4.__c.base = u6.__e;
        break;
      }
    return k(n4);
  }
}
function b(n4) {
  (!n4.__d && (n4.__d = true) && t.push(n4) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
}
function g() {
  for (var n4; g.__r = t.length; )
    n4 = t.sort(function(n5, l6) {
      return n5.__v.__b - l6.__v.__b;
    }), t = [], n4.some(function(n5) {
      var l6, u6, i5, t3, o6, r4;
      n5.__d && (o6 = (t3 = (l6 = n5).__v).__e, (r4 = l6.__P) && (u6 = [], (i5 = s({}, t3)).__v = t3.__v + 1, j(r4, t3, i5, l6.__n, void 0 !== r4.ownerSVGElement, null != t3.__h ? [o6] : null, u6, null == o6 ? _(t3) : o6, t3.__h), z(u6, t3), t3.__e != o6 && k(t3)));
    });
}
function w(n4, l6, u6, i5, t3, o6, r4, c6, s6, a6) {
  var h6, y5, d6, k5, b5, g6, w6, x5 = i5 && i5.__k || e, C5 = x5.length;
  for (u6.__k = [], h6 = 0; h6 < l6.length; h6++)
    if (null != (k5 = u6.__k[h6] = null == (k5 = l6[h6]) || "boolean" == typeof k5 ? null : "string" == typeof k5 || "number" == typeof k5 || "bigint" == typeof k5 ? v(null, k5, null, null, k5) : Array.isArray(k5) ? v(p, { children: k5 }, null, null, null) : k5.__b > 0 ? v(k5.type, k5.props, k5.key, k5.ref ? k5.ref : null, k5.__v) : k5)) {
      if (k5.__ = u6, k5.__b = u6.__b + 1, null === (d6 = x5[h6]) || d6 && k5.key == d6.key && k5.type === d6.type)
        x5[h6] = void 0;
      else
        for (y5 = 0; y5 < C5; y5++) {
          if ((d6 = x5[y5]) && k5.key == d6.key && k5.type === d6.type) {
            x5[y5] = void 0;
            break;
          }
          d6 = null;
        }
      j(n4, k5, d6 = d6 || f, t3, o6, r4, c6, s6, a6), b5 = k5.__e, (y5 = k5.ref) && d6.ref != y5 && (w6 || (w6 = []), d6.ref && w6.push(d6.ref, null, k5), w6.push(y5, k5.__c || b5, k5)), null != b5 ? (null == g6 && (g6 = b5), "function" == typeof k5.type && k5.__k === d6.__k ? k5.__d = s6 = m(k5, s6, n4) : s6 = A(n4, k5, d6, x5, b5, s6), "function" == typeof u6.type && (u6.__d = s6)) : s6 && d6.__e == s6 && s6.parentNode != n4 && (s6 = _(d6));
    }
  for (u6.__e = g6, h6 = C5; h6--; )
    null != x5[h6] && ("function" == typeof u6.type && null != x5[h6].__e && x5[h6].__e == u6.__d && (u6.__d = _(i5, h6 + 1)), N(x5[h6], x5[h6]));
  if (w6)
    for (h6 = 0; h6 < w6.length; h6++)
      M(w6[h6], w6[++h6], w6[++h6]);
}
function m(n4, l6, u6) {
  for (var i5, t3 = n4.__k, o6 = 0; t3 && o6 < t3.length; o6++)
    (i5 = t3[o6]) && (i5.__ = n4, l6 = "function" == typeof i5.type ? m(i5, l6, u6) : A(u6, i5, i5, t3, i5.__e, l6));
  return l6;
}
function x(n4, l6) {
  return l6 = l6 || [], null == n4 || "boolean" == typeof n4 || (Array.isArray(n4) ? n4.some(function(n5) {
    x(n5, l6);
  }) : l6.push(n4)), l6;
}
function A(n4, l6, u6, i5, t3, o6) {
  var r4, f5, e4;
  if (void 0 !== l6.__d)
    r4 = l6.__d, l6.__d = void 0;
  else if (null == u6 || t3 != o6 || null == t3.parentNode)
    n:
      if (null == o6 || o6.parentNode !== n4)
        n4.appendChild(t3), r4 = null;
      else {
        for (f5 = o6, e4 = 0; (f5 = f5.nextSibling) && e4 < i5.length; e4 += 2)
          if (f5 == t3)
            break n;
        n4.insertBefore(t3, o6), r4 = o6;
      }
  return void 0 !== r4 ? r4 : t3.nextSibling;
}
function C(n4, l6, u6, i5, t3) {
  var o6;
  for (o6 in u6)
    "children" === o6 || "key" === o6 || o6 in l6 || H(n4, o6, null, u6[o6], i5);
  for (o6 in l6)
    t3 && "function" != typeof l6[o6] || "children" === o6 || "key" === o6 || "value" === o6 || "checked" === o6 || u6[o6] === l6[o6] || H(n4, o6, l6[o6], u6[o6], i5);
}
function $(n4, l6, u6) {
  "-" === l6[0] ? n4.setProperty(l6, u6) : n4[l6] = null == u6 ? "" : "number" != typeof u6 || c.test(l6) ? u6 : u6 + "px";
}
function H(n4, l6, u6, i5, t3) {
  var o6;
  n:
    if ("style" === l6)
      if ("string" == typeof u6)
        n4.style.cssText = u6;
      else {
        if ("string" == typeof i5 && (n4.style.cssText = i5 = ""), i5)
          for (l6 in i5)
            u6 && l6 in u6 || $(n4.style, l6, "");
        if (u6)
          for (l6 in u6)
            i5 && u6[l6] === i5[l6] || $(n4.style, l6, u6[l6]);
      }
    else if ("o" === l6[0] && "n" === l6[1])
      o6 = l6 !== (l6 = l6.replace(/Capture$/, "")), l6 = l6.toLowerCase() in n4 ? l6.toLowerCase().slice(2) : l6.slice(2), n4.l || (n4.l = {}), n4.l[l6 + o6] = u6, u6 ? i5 || n4.addEventListener(l6, o6 ? T : I, o6) : n4.removeEventListener(l6, o6 ? T : I, o6);
    else if ("dangerouslySetInnerHTML" !== l6) {
      if (t3)
        l6 = l6.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("href" !== l6 && "list" !== l6 && "form" !== l6 && "tabIndex" !== l6 && "download" !== l6 && l6 in n4)
        try {
          n4[l6] = null == u6 ? "" : u6;
          break n;
        } catch (n5) {
        }
      "function" == typeof u6 || (null != u6 && (false !== u6 || "a" === l6[0] && "r" === l6[1]) ? n4.setAttribute(l6, u6) : n4.removeAttribute(l6));
    }
}
function I(n4) {
  this.l[n4.type + false](l.event ? l.event(n4) : n4);
}
function T(n4) {
  this.l[n4.type + true](l.event ? l.event(n4) : n4);
}
function j(n4, u6, i5, t3, o6, r4, f5, e4, c6) {
  var a6, h6, v6, y5, _6, k5, b5, g6, m5, x5, A5, C5, $3, H3 = u6.type;
  if (void 0 !== u6.constructor)
    return null;
  null != i5.__h && (c6 = i5.__h, e4 = u6.__e = i5.__e, u6.__h = null, r4 = [e4]), (a6 = l.__b) && a6(u6);
  try {
    n:
      if ("function" == typeof H3) {
        if (g6 = u6.props, m5 = (a6 = H3.contextType) && t3[a6.__c], x5 = a6 ? m5 ? m5.props.value : a6.__ : t3, i5.__c ? b5 = (h6 = u6.__c = i5.__c).__ = h6.__E : ("prototype" in H3 && H3.prototype.render ? u6.__c = h6 = new H3(g6, x5) : (u6.__c = h6 = new d(g6, x5), h6.constructor = H3, h6.render = O), m5 && m5.sub(h6), h6.props = g6, h6.state || (h6.state = {}), h6.context = x5, h6.__n = t3, v6 = h6.__d = true, h6.__h = []), null == h6.__s && (h6.__s = h6.state), null != H3.getDerivedStateFromProps && (h6.__s == h6.state && (h6.__s = s({}, h6.__s)), s(h6.__s, H3.getDerivedStateFromProps(g6, h6.__s))), y5 = h6.props, _6 = h6.state, v6)
          null == H3.getDerivedStateFromProps && null != h6.componentWillMount && h6.componentWillMount(), null != h6.componentDidMount && h6.__h.push(h6.componentDidMount);
        else {
          if (null == H3.getDerivedStateFromProps && g6 !== y5 && null != h6.componentWillReceiveProps && h6.componentWillReceiveProps(g6, x5), !h6.__e && null != h6.shouldComponentUpdate && false === h6.shouldComponentUpdate(g6, h6.__s, x5) || u6.__v === i5.__v) {
            h6.props = g6, h6.state = h6.__s, u6.__v !== i5.__v && (h6.__d = false), h6.__v = u6, u6.__e = i5.__e, u6.__k = i5.__k, u6.__k.forEach(function(n5) {
              n5 && (n5.__ = u6);
            }), h6.__h.length && f5.push(h6);
            break n;
          }
          null != h6.componentWillUpdate && h6.componentWillUpdate(g6, h6.__s, x5), null != h6.componentDidUpdate && h6.__h.push(function() {
            h6.componentDidUpdate(y5, _6, k5);
          });
        }
        if (h6.context = x5, h6.props = g6, h6.__v = u6, h6.__P = n4, A5 = l.__r, C5 = 0, "prototype" in H3 && H3.prototype.render)
          h6.state = h6.__s, h6.__d = false, A5 && A5(u6), a6 = h6.render(h6.props, h6.state, h6.context);
        else
          do {
            h6.__d = false, A5 && A5(u6), a6 = h6.render(h6.props, h6.state, h6.context), h6.state = h6.__s;
          } while (h6.__d && ++C5 < 25);
        h6.state = h6.__s, null != h6.getChildContext && (t3 = s(s({}, t3), h6.getChildContext())), v6 || null == h6.getSnapshotBeforeUpdate || (k5 = h6.getSnapshotBeforeUpdate(y5, _6)), $3 = null != a6 && a6.type === p && null == a6.key ? a6.props.children : a6, w(n4, Array.isArray($3) ? $3 : [$3], u6, i5, t3, o6, r4, f5, e4, c6), h6.base = u6.__e, u6.__h = null, h6.__h.length && f5.push(h6), b5 && (h6.__E = h6.__ = null), h6.__e = false;
      } else
        null == r4 && u6.__v === i5.__v ? (u6.__k = i5.__k, u6.__e = i5.__e) : u6.__e = L(i5.__e, u6, i5, t3, o6, r4, f5, c6);
    (a6 = l.diffed) && a6(u6);
  } catch (n5) {
    u6.__v = null, (c6 || null != r4) && (u6.__e = e4, u6.__h = !!c6, r4[r4.indexOf(e4)] = null), l.__e(n5, u6, i5);
  }
}
function z(n4, u6) {
  l.__c && l.__c(u6, n4), n4.some(function(u7) {
    try {
      n4 = u7.__h, u7.__h = [], n4.some(function(n5) {
        n5.call(u7);
      });
    } catch (n5) {
      l.__e(n5, u7.__v);
    }
  });
}
function L(l6, u6, i5, t3, o6, r4, e4, c6) {
  var s6, h6, v6, y5 = i5.props, p5 = u6.props, d6 = u6.type, k5 = 0;
  if ("svg" === d6 && (o6 = true), null != r4) {
    for (; k5 < r4.length; k5++)
      if ((s6 = r4[k5]) && "setAttribute" in s6 == !!d6 && (d6 ? s6.localName === d6 : 3 === s6.nodeType)) {
        l6 = s6, r4[k5] = null;
        break;
      }
  }
  if (null == l6) {
    if (null === d6)
      return document.createTextNode(p5);
    l6 = o6 ? document.createElementNS("http://www.w3.org/2000/svg", d6) : document.createElement(d6, p5.is && p5), r4 = null, c6 = false;
  }
  if (null === d6)
    y5 === p5 || c6 && l6.data === p5 || (l6.data = p5);
  else {
    if (r4 = r4 && n.call(l6.childNodes), h6 = (y5 = i5.props || f).dangerouslySetInnerHTML, v6 = p5.dangerouslySetInnerHTML, !c6) {
      if (null != r4)
        for (y5 = {}, k5 = 0; k5 < l6.attributes.length; k5++)
          y5[l6.attributes[k5].name] = l6.attributes[k5].value;
      (v6 || h6) && (v6 && (h6 && v6.__html == h6.__html || v6.__html === l6.innerHTML) || (l6.innerHTML = v6 && v6.__html || ""));
    }
    if (C(l6, p5, y5, o6, c6), v6)
      u6.__k = [];
    else if (k5 = u6.props.children, w(l6, Array.isArray(k5) ? k5 : [k5], u6, i5, t3, o6 && "foreignObject" !== d6, r4, e4, r4 ? r4[0] : i5.__k && _(i5, 0), c6), null != r4)
      for (k5 = r4.length; k5--; )
        null != r4[k5] && a(r4[k5]);
    c6 || ("value" in p5 && void 0 !== (k5 = p5.value) && (k5 !== l6.value || "progress" === d6 && !k5 || "option" === d6 && k5 !== y5.value) && H(l6, "value", k5, y5.value, false), "checked" in p5 && void 0 !== (k5 = p5.checked) && k5 !== l6.checked && H(l6, "checked", k5, y5.checked, false));
  }
  return l6;
}
function M(n4, u6, i5) {
  try {
    "function" == typeof n4 ? n4(u6) : n4.current = u6;
  } catch (n5) {
    l.__e(n5, i5);
  }
}
function N(n4, u6, i5) {
  var t3, o6;
  if (l.unmount && l.unmount(n4), (t3 = n4.ref) && (t3.current && t3.current !== n4.__e || M(t3, null, u6)), null != (t3 = n4.__c)) {
    if (t3.componentWillUnmount)
      try {
        t3.componentWillUnmount();
      } catch (n5) {
        l.__e(n5, u6);
      }
    t3.base = t3.__P = null, n4.__c = void 0;
  }
  if (t3 = n4.__k)
    for (o6 = 0; o6 < t3.length; o6++)
      t3[o6] && N(t3[o6], u6, "function" != typeof n4.type);
  i5 || null == n4.__e || a(n4.__e), n4.__ = n4.__e = n4.__d = void 0;
}
function O(n4, l6, u6) {
  return this.constructor(n4, u6);
}
function P(u6, i5, t3) {
  var o6, r4, e4;
  l.__ && l.__(u6, i5), r4 = (o6 = "function" == typeof t3) ? null : t3 && t3.__k || i5.__k, e4 = [], j(i5, u6 = (!o6 && t3 || i5).__k = h(p, null, [u6]), r4 || f, f, void 0 !== i5.ownerSVGElement, !o6 && t3 ? [t3] : r4 ? null : i5.firstChild ? n.call(i5.childNodes) : null, e4, !o6 && t3 ? t3 : r4 ? r4.__e : i5.firstChild, o6), z(e4, u6);
}
function S(n4, l6) {
  P(n4, l6, S);
}
function q(l6, u6, i5) {
  var t3, o6, r4, f5 = s({}, l6.props);
  for (r4 in u6)
    "key" == r4 ? t3 = u6[r4] : "ref" == r4 ? o6 = u6[r4] : f5[r4] = u6[r4];
  return arguments.length > 2 && (f5.children = arguments.length > 3 ? n.call(arguments, 2) : i5), v(l6.type, f5, t3 || l6.key, o6 || l6.ref, null);
}
function B(n4, l6) {
  var u6 = { __c: l6 = "__cC" + r++, __: n4, Consumer: function(n5, l7) {
    return n5.children(l7);
  }, Provider: function(n5) {
    var u7, i5;
    return this.getChildContext || (u7 = [], (i5 = {})[l6] = this, this.getChildContext = function() {
      return i5;
    }, this.shouldComponentUpdate = function(n6) {
      this.props.value !== n6.value && u7.some(b);
    }, this.sub = function(n6) {
      u7.push(n6);
      var l7 = n6.componentWillUnmount;
      n6.componentWillUnmount = function() {
        u7.splice(u7.indexOf(n6), 1), l7 && l7.call(n6);
      };
    }), n5.children;
  } };
  return u6.Provider.__ = u6.Consumer.contextType = u6;
}
var n, l, u, i, t, o, r, f, e, c;
var init_preact_module = __esm({
  "node_modules/preact/dist/preact.module.js"() {
    init_define_process();
    f = {};
    e = [];
    c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    __name(s, "s");
    __name(a, "a");
    __name(h, "h");
    __name(v, "v");
    __name(y, "y");
    __name(p, "p");
    __name(d, "d");
    __name(_, "_");
    __name(k, "k");
    __name(b, "b");
    __name(g, "g");
    __name(w, "w");
    __name(m, "m");
    __name(x, "x");
    __name(A, "A");
    __name(C, "C");
    __name($, "$");
    __name(H, "H");
    __name(I, "I");
    __name(T, "T");
    __name(j, "j");
    __name(z, "z");
    __name(L, "L");
    __name(M, "M");
    __name(N, "N");
    __name(O, "O");
    __name(P, "P");
    __name(S, "S");
    __name(q, "q");
    __name(B, "B");
    n = e.slice, l = { __e: function(n4, l6, u6, i5) {
      for (var t3, o6, r4; l6 = l6.__; )
        if ((t3 = l6.__c) && !t3.__)
          try {
            if ((o6 = t3.constructor) && null != o6.getDerivedStateFromError && (t3.setState(o6.getDerivedStateFromError(n4)), r4 = t3.__d), null != t3.componentDidCatch && (t3.componentDidCatch(n4, i5 || {}), r4 = t3.__d), r4)
              return t3.__E = t3;
          } catch (l7) {
            n4 = l7;
          }
      throw n4;
    } }, u = 0, i = /* @__PURE__ */ __name(function(n4) {
      return null != n4 && void 0 === n4.constructor;
    }, "i"), d.prototype.setState = function(n4, l6) {
      var u6;
      u6 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n4 && (n4 = n4(s({}, u6), this.props)), n4 && s(u6, n4), null != n4 && this.__v && (l6 && this.__h.push(l6), b(this));
    }, d.prototype.forceUpdate = function(n4) {
      this.__v && (this.__e = true, n4 && this.__h.push(n4), b(this));
    }, d.prototype.render = p, t = [], g.__r = 0, r = 0;
  }
});

// node_modules/preact/hooks/dist/hooks.module.js
function p2(t3, r4) {
  l.__h && l.__h(u2, t3, f2 || r4), f2 = 0;
  var i5 = u2.__H || (u2.__H = { __: [], __h: [] });
  return t3 >= i5.__.length && i5.__.push({ __V: e2 }), i5.__[t3];
}
function y2(n4) {
  return f2 = 1, h2(C2, n4);
}
function h2(n4, t3, i5) {
  var o6 = p2(r2++, 2);
  if (o6.t = n4, !o6.__c && (o6.__ = [i5 ? i5(t3) : C2(void 0, t3), function(n5) {
    var t4 = o6.__N ? o6.__N[0] : o6.__[0], r4 = o6.t(t4, n5);
    t4 !== r4 && (o6.__N = [r4, o6.__[1]], o6.__c.setState({}));
  }], o6.__c = u2, !u2.u)) {
    u2.u = true;
    var f5 = u2.shouldComponentUpdate;
    u2.shouldComponentUpdate = function(n5, t4, r4) {
      if (!o6.__c.__H)
        return true;
      var u6 = o6.__c.__H.__.filter(function(n6) {
        return n6.__c;
      });
      if (u6.every(function(n6) {
        return !n6.__N;
      }))
        return !f5 || f5.call(this, n5, t4, r4);
      var i6 = false;
      return u6.forEach(function(n6) {
        if (n6.__N) {
          var t5 = n6.__[0];
          n6.__ = n6.__N, n6.__N = void 0, t5 !== n6.__[0] && (i6 = true);
        }
      }), !!i6 && (!f5 || f5.call(this, n5, t4, r4));
    };
  }
  return o6.__N || o6.__;
}
function s2(t3, i5) {
  var o6 = p2(r2++, 3);
  !l.__s && B2(o6.__H, i5) && (o6.__ = t3, o6.i = i5, u2.__H.__h.push(o6));
}
function _2(t3, i5) {
  var o6 = p2(r2++, 4);
  !l.__s && B2(o6.__H, i5) && (o6.__ = t3, o6.i = i5, u2.__h.push(o6));
}
function A2(n4) {
  return f2 = 5, T2(function() {
    return { current: n4 };
  }, []);
}
function F(n4, t3, r4) {
  f2 = 6, _2(function() {
    return "function" == typeof n4 ? (n4(t3()), function() {
      return n4(null);
    }) : n4 ? (n4.current = t3(), function() {
      return n4.current = null;
    }) : void 0;
  }, null == r4 ? r4 : r4.concat(n4));
}
function T2(n4, t3) {
  var u6 = p2(r2++, 7);
  return B2(u6.__H, t3) ? (u6.__V = n4(), u6.i = t3, u6.__h = n4, u6.__V) : u6.__;
}
function q2(n4, t3) {
  return f2 = 8, T2(function() {
    return n4;
  }, t3);
}
function x2(n4) {
  var t3 = u2.context[n4.__c], i5 = p2(r2++, 9);
  return i5.c = n4, t3 ? (null == i5.__ && (i5.__ = true, t3.sub(u2)), t3.props.value) : n4.__;
}
function P2(t3, r4) {
  l.useDebugValue && l.useDebugValue(r4 ? r4(t3) : t3);
}
function b2() {
  var n4 = p2(r2++, 11);
  return n4.__ || (n4.__ = "P" + function(n5) {
    for (var t3 = 0, r4 = n5.length; r4 > 0; )
      t3 = (t3 << 5) - t3 + n5.charCodeAt(--r4) | 0;
    return t3;
  }(u2.__v.o) + r2), n4.__;
}
function g2() {
  for (var t3; t3 = c2.shift(); )
    if (t3.__P && t3.__H)
      try {
        t3.__H.__h.forEach(w2), t3.__H.__h.forEach(z2), t3.__H.__h = [];
      } catch (r4) {
        t3.__H.__h = [], l.__e(r4, t3.__v);
      }
}
function k2(n4) {
  var t3, r4 = /* @__PURE__ */ __name(function() {
    clearTimeout(u6), j2 && cancelAnimationFrame(t3), setTimeout(n4);
  }, "r"), u6 = setTimeout(r4, 100);
  j2 && (t3 = requestAnimationFrame(r4));
}
function w2(n4) {
  var t3 = u2, r4 = n4.__c;
  "function" == typeof r4 && (n4.__c = void 0, r4()), u2 = t3;
}
function z2(n4) {
  var t3 = u2;
  n4.__c = n4.__(), u2 = t3;
}
function B2(n4, t3) {
  return !n4 || n4.length !== t3.length || t3.some(function(t4, r4) {
    return t4 !== n4[r4];
  });
}
function C2(n4, t3) {
  return "function" == typeof t3 ? t3(n4) : t3;
}
var r2, u2, i2, o2, f2, c2, e2, a2, v2, l2, m2, d2, j2;
var init_hooks_module = __esm({
  "node_modules/preact/hooks/dist/hooks.module.js"() {
    init_define_process();
    init_preact_module();
    f2 = 0;
    c2 = [];
    e2 = [];
    a2 = l.__b;
    v2 = l.__r;
    l2 = l.diffed;
    m2 = l.__c;
    d2 = l.unmount;
    __name(p2, "p");
    __name(y2, "y");
    __name(h2, "h");
    __name(s2, "s");
    __name(_2, "_");
    __name(A2, "A");
    __name(F, "F");
    __name(T2, "T");
    __name(q2, "q");
    __name(x2, "x");
    __name(P2, "P");
    __name(b2, "b");
    __name(g2, "g");
    l.__b = function(n4) {
      "function" != typeof n4.type || n4.o || n4.type === p ? n4.o || (n4.o = n4.__ && n4.__.o ? n4.__.o : "") : n4.o = (n4.__ && n4.__.o ? n4.__.o : "") + (n4.__ && n4.__.__k ? n4.__.__k.indexOf(n4) : 0), u2 = null, a2 && a2(n4);
    }, l.__r = function(n4) {
      v2 && v2(n4), r2 = 0;
      var t3 = (u2 = n4.__c).__H;
      t3 && (i2 === u2 ? (t3.__h = [], u2.__h = [], t3.__.forEach(function(n5) {
        n5.__N && (n5.__ = n5.__N), n5.__V = e2, n5.__N = n5.i = void 0;
      })) : (t3.__h.forEach(w2), t3.__h.forEach(z2), t3.__h = [])), i2 = u2;
    }, l.diffed = function(t3) {
      l2 && l2(t3);
      var r4 = t3.__c;
      r4 && r4.__H && (r4.__H.__h.length && (1 !== c2.push(r4) && o2 === l.requestAnimationFrame || ((o2 = l.requestAnimationFrame) || k2)(g2)), r4.__H.__.forEach(function(n4) {
        n4.i && (n4.__H = n4.i), n4.__V !== e2 && (n4.__ = n4.__V), n4.i = void 0, n4.__V = e2;
      })), i2 = u2 = null;
    }, l.__c = function(t3, r4) {
      r4.some(function(t4) {
        try {
          t4.__h.forEach(w2), t4.__h = t4.__h.filter(function(n4) {
            return !n4.__ || z2(n4);
          });
        } catch (u6) {
          r4.some(function(n4) {
            n4.__h && (n4.__h = []);
          }), r4 = [], l.__e(u6, t4.__v);
        }
      }), m2 && m2(t3, r4);
    }, l.unmount = function(t3) {
      d2 && d2(t3);
      var r4, u6 = t3.__c;
      u6 && u6.__H && (u6.__H.__.forEach(function(n4) {
        try {
          w2(n4);
        } catch (n5) {
          r4 = n5;
        }
      }), u6.__H = void 0, r4 && l.__e(r4, u6.__v));
    };
    j2 = "function" == typeof requestAnimationFrame;
    __name(k2, "k");
    __name(w2, "w");
    __name(z2, "z");
    __name(B2, "B");
    __name(C2, "C");
  }
});

// node_modules/preact/compat/dist/compat.module.js
function g3(n4, t3) {
  for (var e4 in t3)
    n4[e4] = t3[e4];
  return n4;
}
function C3(n4, t3) {
  for (var e4 in n4)
    if ("__source" !== e4 && !(e4 in t3))
      return true;
  for (var r4 in t3)
    if ("__source" !== r4 && n4[r4] !== t3[r4])
      return true;
  return false;
}
function E(n4) {
  this.props = n4;
}
function w3(n4, e4) {
  function r4(n5) {
    var t3 = this.props.ref, r5 = t3 == n5.ref;
    return !r5 && t3 && (t3.call ? t3(null) : t3.current = null), e4 ? !e4(this.props, n5) || !r5 : C3(this.props, n5);
  }
  __name(r4, "r");
  function u6(e5) {
    return this.shouldComponentUpdate = r4, h(n4, e5);
  }
  __name(u6, "u");
  return u6.displayName = "Memo(" + (n4.displayName || n4.name) + ")", u6.prototype.isReactComponent = true, u6.__f = true, u6;
}
function N2(n4) {
  function t3(t4) {
    var e4 = g3({}, t4);
    return delete e4.ref, n4(e4, t4.ref || null);
  }
  __name(t3, "t");
  return t3.$$typeof = x3, t3.render = t3, t3.prototype.isReactComponent = t3.__f = true, t3.displayName = "ForwardRef(" + (n4.displayName || n4.name) + ")", t3;
}
function I2(n4, t3, e4) {
  return n4 && (n4.__c && n4.__c.__H && (n4.__c.__H.__.forEach(function(n5) {
    "function" == typeof n5.__c && n5.__c();
  }), n4.__c.__H = null), null != (n4 = g3({}, n4)).__c && (n4.__c.__P === e4 && (n4.__c.__P = t3), n4.__c = null), n4.__k = n4.__k && n4.__k.map(function(n5) {
    return I2(n5, t3, e4);
  })), n4;
}
function L2(n4, t3, e4) {
  return n4 && (n4.__v = null, n4.__k = n4.__k && n4.__k.map(function(n5) {
    return L2(n5, t3, e4);
  }), n4.__c && n4.__c.__P === t3 && (n4.__e && e4.insertBefore(n4.__e, n4.__d), n4.__c.__e = true, n4.__c.__P = e4)), n4;
}
function U() {
  this.__u = 0, this.t = null, this.__b = null;
}
function D(n4) {
  var t3 = n4.__.__c;
  return t3 && t3.__a && t3.__a(n4);
}
function F2(n4) {
  var e4, r4, u6;
  function o6(o7) {
    if (e4 || (e4 = n4()).then(function(n5) {
      r4 = n5.default || n5;
    }, function(n5) {
      u6 = n5;
    }), u6)
      throw u6;
    if (!r4)
      throw e4;
    return h(r4, o7);
  }
  __name(o6, "o");
  return o6.displayName = "Lazy", o6.__f = true, o6;
}
function M2() {
  this.u = null, this.o = null;
}
function W(n4) {
  return this.getChildContext = function() {
    return n4.context;
  }, n4.children;
}
function P3(n4) {
  var e4 = this, r4 = n4.i;
  e4.componentWillUnmount = function() {
    P(null, e4.l), e4.l = null, e4.i = null;
  }, e4.i && e4.i !== r4 && e4.componentWillUnmount(), n4.__v ? (e4.l || (e4.i = r4, e4.l = { nodeType: 1, parentNode: r4, childNodes: [], appendChild: function(n5) {
    this.childNodes.push(n5), e4.i.appendChild(n5);
  }, insertBefore: function(n5, t3) {
    this.childNodes.push(n5), e4.i.appendChild(n5);
  }, removeChild: function(n5) {
    this.childNodes.splice(this.childNodes.indexOf(n5) >>> 1, 1), e4.i.removeChild(n5);
  } }), P(h(W, { context: e4.context }, n4.__v), e4.l)) : e4.l && e4.componentWillUnmount();
}
function $2(n4, e4) {
  var r4 = h(P3, { __v: n4, i: e4 });
  return r4.containerInfo = e4, r4;
}
function Z(n4, t3, e4) {
  return null == t3.__k && (t3.textContent = ""), P(n4, t3), "function" == typeof e4 && e4(), n4 ? n4.__c : null;
}
function Y(n4, t3, e4) {
  return S(n4, t3), "function" == typeof e4 && e4(), n4 ? n4.__c : null;
}
function G() {
}
function J() {
  return this.cancelBubble;
}
function K() {
  return this.defaultPrevented;
}
function un(n4) {
  return h.bind(null, n4);
}
function on(n4) {
  return !!n4 && n4.$$typeof === j3;
}
function ln(n4) {
  return on(n4) ? q.apply(null, arguments) : n4;
}
function cn(n4) {
  return !!n4.__k && (P(null, n4), true);
}
function fn(n4) {
  return n4 && (n4.base || 1 === n4.nodeType && n4) || null;
}
function vn(n4) {
  n4();
}
function dn(n4) {
  return n4;
}
function pn() {
  return [false, vn];
}
function yn(n4, t3) {
  var e4 = t3(), r4 = y2({ h: { __: e4, v: t3 } }), u6 = r4[0].h, o6 = r4[1];
  return _2(function() {
    u6.__ = e4, u6.v = t3, u6.__ !== t3() && o6({ h: u6 });
  }, [n4, e4, t3]), s2(function() {
    return u6.__ !== u6.v() && o6({ h: u6 }), n4(function() {
      u6.__ !== u6.v() && o6({ h: u6 });
    });
  }, [n4]), e4;
}
var R, x3, k3, A3, O2, T3, V, j3, z3, B3, H2, q3, Q, X, nn, tn, en, an, sn, hn, mn, _n;
var init_compat_module = __esm({
  "node_modules/preact/compat/dist/compat.module.js"() {
    init_define_process();
    init_preact_module();
    init_preact_module();
    init_hooks_module();
    init_hooks_module();
    __name(g3, "g");
    __name(C3, "C");
    __name(E, "E");
    __name(w3, "w");
    (E.prototype = new d()).isPureReactComponent = true, E.prototype.shouldComponentUpdate = function(n4, t3) {
      return C3(this.props, n4) || C3(this.state, t3);
    };
    R = l.__b;
    l.__b = function(n4) {
      n4.type && n4.type.__f && n4.ref && (n4.props.ref = n4.ref, n4.ref = null), R && R(n4);
    };
    x3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
    __name(N2, "N");
    k3 = /* @__PURE__ */ __name(function(n4, t3) {
      return null == n4 ? null : x(x(n4).map(t3));
    }, "k");
    A3 = { map: k3, forEach: k3, count: function(n4) {
      return n4 ? x(n4).length : 0;
    }, only: function(n4) {
      var t3 = x(n4);
      if (1 !== t3.length)
        throw "Children.only";
      return t3[0];
    }, toArray: x };
    O2 = l.__e;
    l.__e = function(n4, t3, e4, r4) {
      if (n4.then) {
        for (var u6, o6 = t3; o6 = o6.__; )
          if ((u6 = o6.__c) && u6.__c)
            return null == t3.__e && (t3.__e = e4.__e, t3.__k = e4.__k), u6.__c(n4, t3);
      }
      O2(n4, t3, e4, r4);
    };
    T3 = l.unmount;
    __name(I2, "I");
    __name(L2, "L");
    __name(U, "U");
    __name(D, "D");
    __name(F2, "F");
    __name(M2, "M");
    l.unmount = function(n4) {
      var t3 = n4.__c;
      t3 && t3.__R && t3.__R(), t3 && true === n4.__h && (n4.type = null), T3 && T3(n4);
    }, (U.prototype = new d()).__c = function(n4, t3) {
      var e4 = t3.__c, r4 = this;
      null == r4.t && (r4.t = []), r4.t.push(e4);
      var u6 = D(r4.__v), o6 = false, i5 = /* @__PURE__ */ __name(function() {
        o6 || (o6 = true, e4.__R = null, u6 ? u6(l6) : l6());
      }, "i");
      e4.__R = i5;
      var l6 = /* @__PURE__ */ __name(function() {
        if (!--r4.__u) {
          if (r4.state.__a) {
            var n5 = r4.state.__a;
            r4.__v.__k[0] = L2(n5, n5.__c.__P, n5.__c.__O);
          }
          var t4;
          for (r4.setState({ __a: r4.__b = null }); t4 = r4.t.pop(); )
            t4.forceUpdate();
        }
      }, "l"), c6 = true === t3.__h;
      r4.__u++ || c6 || r4.setState({ __a: r4.__b = r4.__v.__k[0] }), n4.then(i5, i5);
    }, U.prototype.componentWillUnmount = function() {
      this.t = [];
    }, U.prototype.render = function(n4, e4) {
      if (this.__b) {
        if (this.__v.__k) {
          var r4 = document.createElement("div"), o6 = this.__v.__k[0].__c;
          this.__v.__k[0] = I2(this.__b, r4, o6.__O = o6.__P);
        }
        this.__b = null;
      }
      var i5 = e4.__a && h(p, null, n4.fallback);
      return i5 && (i5.__h = null), [h(p, null, e4.__a ? null : n4.children), i5];
    };
    V = /* @__PURE__ */ __name(function(n4, t3, e4) {
      if (++e4[1] === e4[0] && n4.o.delete(t3), n4.props.revealOrder && ("t" !== n4.props.revealOrder[0] || !n4.o.size))
        for (e4 = n4.u; e4; ) {
          for (; e4.length > 3; )
            e4.pop()();
          if (e4[1] < e4[0])
            break;
          n4.u = e4 = e4[2];
        }
    }, "V");
    __name(W, "W");
    __name(P3, "P");
    __name($2, "$");
    (M2.prototype = new d()).__a = function(n4) {
      var t3 = this, e4 = D(t3.__v), r4 = t3.o.get(n4);
      return r4[0]++, function(u6) {
        var o6 = /* @__PURE__ */ __name(function() {
          t3.props.revealOrder ? (r4.push(u6), V(t3, n4, r4)) : u6();
        }, "o");
        e4 ? e4(o6) : o6();
      };
    }, M2.prototype.render = function(n4) {
      this.u = null, this.o = /* @__PURE__ */ new Map();
      var t3 = x(n4.children);
      n4.revealOrder && "b" === n4.revealOrder[0] && t3.reverse();
      for (var e4 = t3.length; e4--; )
        this.o.set(t3[e4], this.u = [1, 0, this.u]);
      return n4.children;
    }, M2.prototype.componentDidUpdate = M2.prototype.componentDidMount = function() {
      var n4 = this;
      this.o.forEach(function(t3, e4) {
        V(n4, e4, t3);
      });
    };
    j3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
    z3 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
    B3 = "undefined" != typeof document;
    H2 = /* @__PURE__ */ __name(function(n4) {
      return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n4);
    }, "H");
    __name(Z, "Z");
    __name(Y, "Y");
    d.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t3) {
      Object.defineProperty(d.prototype, t3, { configurable: true, get: function() {
        return this["UNSAFE_" + t3];
      }, set: function(n4) {
        Object.defineProperty(this, t3, { configurable: true, writable: true, value: n4 });
      } });
    });
    q3 = l.event;
    __name(G, "G");
    __name(J, "J");
    __name(K, "K");
    l.event = function(n4) {
      return q3 && (n4 = q3(n4)), n4.persist = G, n4.isPropagationStopped = J, n4.isDefaultPrevented = K, n4.nativeEvent = n4;
    };
    X = { configurable: true, get: function() {
      return this.class;
    } };
    nn = l.vnode;
    l.vnode = function(n4) {
      var t3 = n4.type, e4 = n4.props, u6 = e4;
      if ("string" == typeof t3) {
        var o6 = -1 === t3.indexOf("-");
        for (var i5 in u6 = {}, e4) {
          var l6 = e4[i5];
          B3 && "children" === i5 && "noscript" === t3 || "value" === i5 && "defaultValue" in e4 && null == l6 || ("defaultValue" === i5 && "value" in e4 && null == e4.value ? i5 = "value" : "download" === i5 && true === l6 ? l6 = "" : /ondoubleclick/i.test(i5) ? i5 = "ondblclick" : /^onchange(textarea|input)/i.test(i5 + t3) && !H2(e4.type) ? i5 = "oninput" : /^onfocus$/i.test(i5) ? i5 = "onfocusin" : /^onblur$/i.test(i5) ? i5 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i5) ? i5 = i5.toLowerCase() : o6 && z3.test(i5) ? i5 = i5.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === l6 && (l6 = void 0), /^oninput$/i.test(i5) && (i5 = i5.toLowerCase(), u6[i5] && (i5 = "oninputCapture")), u6[i5] = l6);
        }
        "select" == t3 && u6.multiple && Array.isArray(u6.value) && (u6.value = x(e4.children).forEach(function(n5) {
          n5.props.selected = -1 != u6.value.indexOf(n5.props.value);
        })), "select" == t3 && null != u6.defaultValue && (u6.value = x(e4.children).forEach(function(n5) {
          n5.props.selected = u6.multiple ? -1 != u6.defaultValue.indexOf(n5.props.value) : u6.defaultValue == n5.props.value;
        })), n4.props = u6, e4.class != e4.className && (X.enumerable = "className" in e4, null != e4.className && (u6.class = e4.className), Object.defineProperty(u6, "className", X));
      }
      n4.$$typeof = j3, nn && nn(n4);
    };
    tn = l.__r;
    l.__r = function(n4) {
      tn && tn(n4), Q = n4.__c;
    };
    en = { ReactCurrentDispatcher: { current: { readContext: function(n4) {
      return Q.__n[n4.__c].props.value;
    } } } };
    __name(un, "un");
    __name(on, "on");
    __name(ln, "ln");
    __name(cn, "cn");
    __name(fn, "fn");
    an = /* @__PURE__ */ __name(function(n4, t3) {
      return n4(t3);
    }, "an");
    sn = /* @__PURE__ */ __name(function(n4, t3) {
      return n4(t3);
    }, "sn");
    hn = p;
    __name(vn, "vn");
    __name(dn, "dn");
    __name(pn, "pn");
    mn = _2;
    __name(yn, "yn");
    _n = { useState: y2, useId: b2, useReducer: h2, useEffect: s2, useLayoutEffect: _2, useInsertionEffect: mn, useTransition: pn, useDeferredValue: dn, useSyncExternalStore: yn, startTransition: vn, useRef: A2, useImperativeHandle: F, useMemo: T2, useCallback: q2, useContext: x2, useDebugValue: P2, version: "17.0.2", Children: A3, render: Z, hydrate: Y, unmountComponentAtNode: cn, createPortal: $2, createElement: h, createContext: B, createFactory: un, cloneElement: ln, createRef: y, Fragment: p, isValidElement: on, findDOMNode: fn, Component: d, PureComponent: E, memo: w3, forwardRef: N2, flushSync: sn, unstable_batchedUpdates: an, StrictMode: hn, Suspense: U, SuspenseList: M2, lazy: F2, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: en };
  }
});

// node_modules/preact/compat/client.mjs
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
  "node_modules/preact/compat/client.mjs"() {
    init_define_process();
    init_compat_module();
    __name(createRoot, "createRoot");
    __name(hydrateRoot, "hydrateRoot");
  }
});

// node_modules/preact-render-to-string/dist/index.mjs
function s3(e4) {
  if (false === l3.test(e4 += ""))
    return e4;
  for (var t3 = 0, r4 = 0, n4 = "", o6 = ""; r4 < e4.length; r4++) {
    switch (e4.charCodeAt(r4)) {
      case 34:
        o6 = "&quot;";
        break;
      case 38:
        o6 = "&amp;";
        break;
      case 60:
        o6 = "&lt;";
        break;
      default:
        continue;
    }
    r4 !== t3 && (n4 += e4.slice(t3, r4)), n4 += o6, t3 = r4 + 1;
  }
  return r4 !== t3 && (n4 += e4.slice(t3, r4)), n4;
}
function p3(e4) {
  var t3 = "";
  for (var r4 in e4) {
    var o6 = e4[r4];
    null != o6 && "" !== o6 && (t3 && (t3 += " "), t3 += "-" == r4[0] ? r4 : c3[r4] || (c3[r4] = r4.replace(_3, "-$1").toLowerCase()), t3 = "number" == typeof o6 && false === n2.test(r4) ? t3 + ": " + o6 + "px;" : t3 + ": " + o6 + ";");
  }
  return t3 || void 0;
}
function d3(e4, t3) {
  return Array.isArray(t3) ? t3.reduce(d3, e4) : null != t3 && false !== t3 && e4.push(t3), e4;
}
function v3() {
  this.__d = true;
}
function h3(e4, t3) {
  return { __v: e4, context: t3, props: e4.props, setState: v3, forceUpdate: v3, __d: true, __h: [] };
}
function g4(e4, t3) {
  var r4 = e4.contextType, n4 = r4 && t3[r4.__c];
  return null != r4 ? n4 ? n4.props.value : r4.__ : t3;
}
function m3(r4, n4, l6, c6, _6, v6) {
  if (null == r4 || "boolean" == typeof r4)
    return "";
  if ("object" != typeof r4)
    return s3(r4);
  var b5 = l6.pretty, x5 = b5 && "string" == typeof b5 ? b5 : "	";
  if (Array.isArray(r4)) {
    for (var k5 = "", S4 = 0; S4 < r4.length; S4++)
      b5 && S4 > 0 && (k5 += "\n"), k5 += m3(r4[S4], n4, l6, c6, _6, v6);
    return k5;
  }
  var w6, C5 = r4.type, O4 = r4.props, j5 = false;
  if ("function" == typeof C5) {
    if (j5 = true, !l6.shallow || !c6 && false !== l6.renderRootComponent) {
      if (C5 === p) {
        var A5 = [];
        return d3(A5, r4.props.children), m3(A5, n4, l6, false !== l6.shallowHighOrder, _6, v6);
      }
      var F3, H3 = r4.__c = h3(r4, n4);
      l.__b && l.__b(r4);
      var M3 = l.__r;
      if (C5.prototype && "function" == typeof C5.prototype.render) {
        var L3 = g4(C5, n4);
        (H3 = r4.__c = new C5(O4, L3)).__v = r4, H3._dirty = H3.__d = true, H3.props = O4, null == H3.state && (H3.state = {}), null == H3._nextState && null == H3.__s && (H3._nextState = H3.__s = H3.state), H3.context = L3, C5.getDerivedStateFromProps ? H3.state = Object.assign({}, H3.state, C5.getDerivedStateFromProps(H3.props, H3.state)) : H3.componentWillMount && (H3.componentWillMount(), H3.state = H3._nextState !== H3.state ? H3._nextState : H3.__s !== H3.state ? H3.__s : H3.state), M3 && M3(r4), F3 = H3.render(H3.props, H3.state, H3.context);
      } else
        for (var T4 = g4(C5, n4), E2 = 0; H3.__d && E2++ < 25; )
          H3.__d = false, M3 && M3(r4), F3 = C5.call(r4.__c, O4, T4);
      return H3.getChildContext && (n4 = Object.assign({}, n4, H3.getChildContext())), l.diffed && l.diffed(r4), m3(F3, n4, l6, false !== l6.shallowHighOrder, _6, v6);
    }
    C5 = (w6 = C5).displayName || w6 !== Function && w6.name || function(e4) {
      var t3 = (Function.prototype.toString.call(e4).match(/^\s*function\s+([^( ]+)/) || "")[1];
      if (!t3) {
        for (var r5 = -1, n5 = y3.length; n5--; )
          if (y3[n5] === e4) {
            r5 = n5;
            break;
          }
        r5 < 0 && (r5 = y3.push(e4) - 1), t3 = "UnnamedComponent" + r5;
      }
      return t3;
    }(w6);
  }
  var $3, D2, N3 = "<" + C5;
  if (O4) {
    var P4 = Object.keys(O4);
    l6 && true === l6.sortAttributes && P4.sort();
    for (var W2 = 0; W2 < P4.length; W2++) {
      var I3 = P4[W2], R2 = O4[I3];
      if ("children" !== I3) {
        if (!i3.test(I3) && (l6 && l6.allAttributes || "key" !== I3 && "ref" !== I3 && "__self" !== I3 && "__source" !== I3)) {
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
            _6 && a3.test(I3) && (I3 = I3.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if ("htmlFor" === I3) {
            if (O4.for)
              continue;
            I3 = "for";
          }
          "style" === I3 && R2 && "object" == typeof R2 && (R2 = p3(R2)), "a" === I3[0] && "r" === I3[1] && "boolean" == typeof R2 && (R2 = String(R2));
          var U2 = l6.attributeHook && l6.attributeHook(I3, R2, n4, l6, j5);
          if (U2 || "" === U2)
            N3 += U2;
          else if ("dangerouslySetInnerHTML" === I3)
            D2 = R2 && R2.__html;
          else if ("textarea" === C5 && "value" === I3)
            $3 = R2;
          else if ((R2 || 0 === R2 || "" === R2) && "function" != typeof R2) {
            if (!(true !== R2 && "" !== R2 || (R2 = I3, l6 && l6.xml))) {
              N3 = N3 + " " + I3;
              continue;
            }
            if ("value" === I3) {
              if ("select" === C5) {
                v6 = R2;
                continue;
              }
              "option" === C5 && v6 == R2 && void 0 === O4.selected && (N3 += " selected");
            }
            N3 = N3 + " " + I3 + '="' + s3(R2) + '"';
          }
        }
      } else
        $3 = R2;
    }
  }
  if (b5) {
    var V2 = N3.replace(/\n\s*/, " ");
    V2 === N3 || ~V2.indexOf("\n") ? b5 && ~N3.indexOf("\n") && (N3 += "\n") : N3 = V2;
  }
  if (N3 += ">", i3.test(C5))
    throw new Error(C5 + " is not a valid HTML tag name in " + N3);
  var q4, z4 = o3.test(C5) || l6.voidElements && l6.voidElements.test(C5), Z2 = [];
  if (D2)
    b5 && u3(D2) && (D2 = "\n" + x5 + f3(D2, x5)), N3 += D2;
  else if (null != $3 && d3(q4 = [], $3).length) {
    for (var B4 = b5 && ~N3.indexOf("\n"), G2 = false, J2 = 0; J2 < q4.length; J2++) {
      var K2 = q4[J2];
      if (null != K2 && false !== K2) {
        var Q2 = m3(K2, n4, l6, true, "svg" === C5 || "foreignObject" !== C5 && _6, v6);
        if (b5 && !B4 && u3(Q2) && (B4 = true), Q2)
          if (b5) {
            var X2 = Q2.length > 0 && "<" != Q2[0];
            G2 && X2 ? Z2[Z2.length - 1] += Q2 : Z2.push(Q2), G2 = X2;
          } else
            Z2.push(Q2);
      }
    }
    if (b5 && B4)
      for (var Y2 = Z2.length; Y2--; )
        Z2[Y2] = "\n" + x5 + f3(Z2[Y2], x5);
  }
  if (Z2.length || D2)
    N3 += Z2.join("");
  else if (l6 && l6.xml)
    return N3.substring(0, N3.length - 1) + " />";
  return !z4 || q4 || D2 ? (b5 && ~N3.indexOf("\n") && (N3 += "\n"), N3 = N3 + "</" + C5 + ">") : N3 = N3.replace(/>$/, " />"), N3;
}
function S2(n4, o6, i5) {
  o6 = o6 || {};
  var a6 = l.__s;
  l.__s = true;
  var l6, s6 = h(p, null);
  return s6.__k = [n4], l6 = i5 && (i5.pretty || i5.voidElements || i5.sortAttributes || i5.shallow || i5.allAttributes || i5.xml || i5.attributeHook) ? m3(n4, o6, i5) : A4(n4, o6, false, void 0, s6), l.__c && l.__c(n4, k4), l.__s = a6, k4.length = 0, l6;
}
function w4(e4, t3) {
  return "className" === e4 ? "class" : "htmlFor" === e4 ? "for" : "defaultValue" === e4 ? "value" : "defaultChecked" === e4 ? "checked" : "defaultSelected" === e4 ? "selected" : t3 && a3.test(e4) ? e4.toLowerCase().replace(/^xlink:?/, "xlink:") : e4;
}
function C4(e4, t3) {
  return "style" === e4 && null != t3 && "object" == typeof t3 ? p3(t3) : "a" === e4[0] && "r" === e4[1] && "boolean" == typeof t3 ? String(t3) : t3;
}
function A4(r4, n4, a6, l6, f5) {
  if (null == r4 || true === r4 || false === r4 || "" === r4)
    return "";
  if ("object" != typeof r4)
    return s3(r4);
  if (O3(r4)) {
    var u6 = "";
    f5.__k = r4;
    for (var c6 = 0; c6 < r4.length; c6++)
      u6 += A4(r4[c6], n4, a6, l6, f5);
    return u6;
  }
  r4.__ = f5, l.__b && l.__b(r4);
  var _6 = r4.type, p5 = r4.props;
  if ("function" == typeof _6) {
    var d6;
    if (_6 === p)
      d6 = p5.children;
    else {
      d6 = _6.prototype && "function" == typeof _6.prototype.render ? function(e4, r5) {
        var n5 = e4.type, o6 = g4(n5, r5), i5 = new n5(e4.props, o6);
        e4.__c = i5, i5.__v = e4, i5.__d = true, i5.props = e4.props, null == i5.state && (i5.state = {}), null == i5.__s && (i5.__s = i5.state), i5.context = o6, n5.getDerivedStateFromProps ? i5.state = j4({}, i5.state, n5.getDerivedStateFromProps(i5.props, i5.state)) : i5.componentWillMount && (i5.componentWillMount(), i5.state = i5.__s !== i5.state ? i5.__s : i5.state);
        var a7 = l.__r;
        return a7 && a7(e4), i5.render(i5.props, i5.state, i5.context);
      }(r4, n4) : function(e4, r5) {
        var n5, o6 = h3(e4, r5), i5 = g4(e4.type, r5);
        e4.__c = o6;
        for (var a7 = l.__r, l7 = 0; o6.__d && l7++ < 25; )
          o6.__d = false, a7 && a7(e4), n5 = e4.type.call(o6, e4.props, i5);
        return n5;
      }(r4, n4);
      var v6 = r4.__c;
      v6.getChildContext && (n4 = j4({}, n4, v6.getChildContext()));
    }
    var y5 = A4(d6, n4, a6, l6, r4);
    return l.diffed && l.diffed(r4), r4.__ = void 0, l.unmount && l.unmount(r4), y5;
  }
  var m5, b5, x5 = "<";
  if (x5 += _6, p5)
    for (var k5 in m5 = p5.children, p5) {
      var S4 = p5[k5];
      if (!("key" === k5 || "ref" === k5 || "__self" === k5 || "__source" === k5 || "children" === k5 || "className" === k5 && "class" in p5 || "htmlFor" === k5 && "for" in p5 || i3.test(k5))) {
        if (S4 = C4(k5 = w4(k5, a6), S4), "dangerouslySetInnerHTML" === k5)
          b5 = S4 && S4.__html;
        else if ("textarea" === _6 && "value" === k5)
          m5 = S4;
        else if ((S4 || 0 === S4 || "" === S4) && "function" != typeof S4) {
          if (true === S4 || "" === S4) {
            S4 = k5, x5 = x5 + " " + k5;
            continue;
          }
          if ("value" === k5) {
            if ("select" === _6) {
              l6 = S4;
              continue;
            }
            "option" !== _6 || l6 != S4 || "selected" in p5 || (x5 += " selected");
          }
          x5 = x5 + " " + k5 + '="' + s3(S4) + '"';
        }
      }
    }
  var F3 = x5;
  if (x5 += ">", i3.test(_6))
    throw new Error(_6 + " is not a valid HTML tag name in " + x5);
  var H3 = "", M3 = false;
  if (b5)
    H3 += b5, M3 = true;
  else if ("string" == typeof m5)
    H3 += s3(m5), M3 = true;
  else if (O3(m5)) {
    r4.__k = m5;
    for (var L3 = 0; L3 < m5.length; L3++) {
      var T4 = m5[L3];
      if (null != T4 && false !== T4) {
        var E2 = A4(T4, n4, "svg" === _6 || "foreignObject" !== _6 && a6, l6, r4);
        E2 && (H3 += E2, M3 = true);
      }
    }
  } else if (null != m5 && false !== m5 && true !== m5) {
    r4.__k = [m5];
    var $3 = A4(m5, n4, "svg" === _6 || "foreignObject" !== _6 && a6, l6, r4);
    $3 && (H3 += $3, M3 = true);
  }
  if (l.diffed && l.diffed(r4), r4.__ = void 0, l.unmount && l.unmount(r4), M3)
    x5 += H3;
  else if (o3.test(_6))
    return F3 + " />";
  return x5 + "</" + _6 + ">";
}
var n2, o3, i3, a3, l3, f3, u3, c3, _3, y3, b3, x4, k4, O3, j4;
var init_dist = __esm({
  "node_modules/preact-render-to-string/dist/index.mjs"() {
    init_define_process();
    init_preact_module();
    n2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
    o3 = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
    i3 = /[\s\n\\/='"\0<>]/;
    a3 = /^xlink:?./;
    l3 = /["&<]/;
    __name(s3, "s");
    f3 = /* @__PURE__ */ __name(function(e4, t3) {
      return String(e4).replace(/(\n+)/g, "$1" + (t3 || "	"));
    }, "f");
    u3 = /* @__PURE__ */ __name(function(e4, t3, r4) {
      return String(e4).length > (t3 || 40) || !r4 && -1 !== String(e4).indexOf("\n") || -1 !== String(e4).indexOf("<");
    }, "u");
    c3 = {};
    _3 = /([A-Z])/g;
    __name(p3, "p");
    __name(d3, "d");
    __name(v3, "v");
    __name(h3, "h");
    __name(g4, "g");
    y3 = [];
    __name(m3, "m");
    b3 = { shallow: true };
    S2.render = S2;
    x4 = /* @__PURE__ */ __name(function(e4, t3) {
      return S2(e4, t3, b3);
    }, "x");
    k4 = [];
    __name(S2, "S");
    __name(w4, "w");
    __name(C4, "C");
    O3 = Array.isArray;
    j4 = Object.assign;
    __name(A4, "A");
    S2.shallowRender = x4;
  }
});

// node_modules/preact/compat/server.browser.js
var init_server_browser = __esm({
  "node_modules/preact/compat/server.browser.js"() {
    init_define_process();
    init_dist();
  }
});

// node_modules/@preact/signals-core/dist/signals-core.module.js
function t2(t3, n4) {
  for (var i5 = 0; i5 < n4.length; i5++) {
    var r4 = n4[i5];
    r4.enumerable = r4.enumerable || false, r4.configurable = true, "value" in r4 && (r4.writable = true), Object.defineProperty(t3, r4.key, r4);
  }
}
function e3(t3) {
  0 == t3._p++ && t3._s.forEach(e3);
}
function f4(t3) {
  !t3._q && t3._p > 0 && 0 == --t3._p && t3._s.forEach(f4);
}
function c4(t3) {
  t3.forEach(function(t4) {
    if (t4._p > 1)
      return --t4._p;
    var n4 = true;
    if (t4._d.forEach(function(t5) {
      t5._p > 0 && (n4 = false);
    }), n4 && t4._p > 0 && 0 == --t4._p) {
      if (t4._c)
        throw Error("Cycle detected");
      t4._q = false, t4._c = true, t4._u(), t4._c = false, c4(t4._s);
    }
  });
}
function h4(t3, n4) {
  t3.t = true, t3._d.add(n4), n4._s.add(t3);
}
function s4(t3, n4) {
  t3._d.delete(n4), n4._s.delete(t3), 0 === n4._s.size && (n4.t = false, n4._d.forEach(function(t4) {
    return s4(n4, t4);
  }));
}
function v4(t3) {
  if (r3 && r3.delete(t3), t3._p = 0, t3._u(), i4) {
    var n4 = i4;
    throw i4 = null, n4;
  }
  t3._s.forEach(function(t4) {
    t4._p > 0 && (t4._p > 1 && t4._p--, a4.push(t4));
  });
}
function l4(t3) {
  t3.t = true, v4(t3);
}
function w5(t3) {
  return new o4(t3);
}
function d4(t3) {
  var n4 = new o4(void 0);
  return n4._r = true, n4._u = function() {
    var r4 = n4._();
    try {
      var u6 = t3(), o6 = n4._v === u6;
      o6 || n4._s.forEach(function(t4) {
        return t4._q = true;
      }), r4(o6, true), n4._v = u6;
    } catch (t4) {
      i4 || (i4 = t4), r4(true, false);
    }
  }, n4;
}
function y4(t3) {
  var n4 = d4(function() {
    return S3(t3);
  });
  return l4(n4), function() {
    return n4._()(true, true);
  };
}
function S3(t3) {
  if (null !== r3)
    return t3();
  var n4 = /* @__PURE__ */ new Set();
  r3 = n4;
  try {
    return t3();
  } finally {
    for (var u6; void 0 !== (u6 = a4.pop()); )
      n4.add(u6);
    if (r3 = null, c4(n4), i4) {
      var o6 = i4;
      throw i4 = null, o6;
    }
  }
}
var n3, i4, r3, u4, o4, a4;
var init_signals_core_module = __esm({
  "node_modules/@preact/signals-core/dist/signals-core.module.js"() {
    init_define_process();
    __name(t2, "t");
    i4 = null;
    r3 = null;
    u4 = /* @__PURE__ */ new Set();
    o4 = /* @__PURE__ */ function() {
      function i5(t3) {
        this._s = /* @__PURE__ */ new Set(), this._d = /* @__PURE__ */ new Set(), this._p = 0, this._v = void 0, this._r = false, this._q = false, this.t = false, this._c = false, this._v = t3;
      }
      __name(i5, "i");
      var o6, c6, a6 = i5.prototype;
      return a6.toString = function() {
        return "" + this.value;
      }, a6.peek = function() {
        return (!this.t || this._p > 0) && l4(this), this._v;
      }, a6._ = function() {
        var t3 = this, i6 = n3, r4 = u4;
        return n3 = this, u4 = this._d, this._d = /* @__PURE__ */ new Set(), function(o7, e4) {
          o7 && t3._s.forEach(f4), u4.forEach(e4 ? function(n4) {
            return s4(t3, n4);
          } : function(n4) {
            return h4(t3, n4);
          }), u4.clear(), u4 = r4, n3 = i6;
        };
      }, a6.subscribe = function(t3) {
        var n4 = this;
        return y4(function() {
          return t3(n4.value);
        });
      }, a6._u = function() {
      }, o6 = i5, (c6 = [{ key: "value", get: function() {
        return (!this.t || this._p > 0) && l4(this), n3 ? (this._s.add(n3), n3._d.add(this), u4.delete(this), this._v) : this._v;
      }, set: function(t3) {
        var n4 = this;
        if (this._r)
          throw Error("Computed signals are readonly");
        this._v !== t3 && (this._v = t3, S3(function() {
          r3.add(n4), 0 === n4._p && e3(n4);
        }));
      } }]) && t2(o6.prototype, c6), Object.defineProperty(o6, "prototype", { writable: false }), i5;
    }();
    __name(e3, "e");
    __name(f4, "f");
    __name(c4, "c");
    __name(h4, "h");
    __name(s4, "s");
    a4 = [];
    __name(v4, "v");
    __name(l4, "l");
    __name(w5, "w");
    __name(d4, "d");
    __name(y4, "y");
    __name(S3, "S");
  }
});

// node_modules/@preact/signals/dist/signals.module.js
function p4(n4, t3) {
  l[n4] = t3.bind(null, l[n4] || function() {
  });
}
function h5(n4) {
  c5 && c5(true, true), a5 = n4, c5 = n4 && n4._();
}
function g5(n4) {
  var r4 = w5(void 0);
  return r4._u = n4, r4;
}
function d5(n4) {
  var r4 = this, i5 = n4.data, o6 = m4(i5);
  o6.value = i5;
  var f5 = T2(function() {
    for (var n5 = r4.__v; n5 = n5.__; )
      if (n5.__c) {
        l5.add(n5.__c);
        break;
      }
    return a5._u = function() {
      r4.base.data = f5._v;
    }, d4(function() {
      var n6 = o6.value.value;
      return 0 === n6 ? 0 : true === n6 ? "" : n6 || "";
    });
  }, []);
  return f5.value;
}
function b4(n4) {
  var r4 = { __proto__: null }, t3 = g5(function(i5) {
    var e4 = t3.__;
    for (var f5 in e4)
      if ("children" !== f5) {
        var u6 = e4[f5];
        if (u6 instanceof o4) {
          var a6 = u6.value, c6 = r4[f5];
          r4[f5] = a6, true === i5 || c6 === a6 || (f5 in n4 ? n4[f5] = a6 : a6 ? n4.setAttribute(f5, a6) : n4.removeAttribute(f5));
        }
      }
  });
  return t3;
}
function m4(n4) {
  return T2(function() {
    return w5(n4);
  }, []);
}
var u5, a5, c5, v5, s5, l5, _4;
var init_signals_module = __esm({
  "node_modules/@preact/signals/dist/signals.module.js"() {
    init_define_process();
    init_preact_module();
    init_hooks_module();
    init_signals_core_module();
    init_signals_core_module();
    v5 = /* @__PURE__ */ new WeakSet();
    s5 = /* @__PURE__ */ new WeakSet();
    l5 = /* @__PURE__ */ new WeakSet();
    __name(p4, "p");
    _4 = /* @__PURE__ */ new WeakMap();
    __name(h5, "h");
    __name(g5, "g");
    __name(d5, "d");
    __name(b4, "b");
    __name(m4, "m");
    d5.displayName = "_st", Object.defineProperties(o4.prototype, { constructor: { configurable: true }, type: { configurable: true, value: d5 }, props: { configurable: true, get: function() {
      return { data: this };
    } }, __b: { configurable: true, value: 1 } }), p4("__b", function(n4, r4) {
      if ("string" == typeof r4.type) {
        var t3, i5 = r4.props;
        for (var e4 in i5)
          if ("children" !== e4) {
            var f5 = i5[e4];
            f5 instanceof o4 && (t3 || (r4.__np = t3 = {}), t3[e4] = f5, i5[e4] = f5.peek());
          }
      }
      n4(r4);
    }), p4("__r", function(n4, r4) {
      var t3, i5 = r4.__c;
      i5 && (v5.delete(i5), void 0 === (t3 = _4.get(i5)) && (t3 = g5(function() {
        v5.add(i5), i5.setState({});
      }), _4.set(i5, t3))), u5 = i5, h5(t3), n4(r4);
    }), p4("__e", function(n4, r4, t3, i5) {
      h5(), u5 = void 0, n4(r4, t3, i5);
    }), p4("diffed", function(n4, r4) {
      var t3, i5;
      if (h5(), u5 = void 0, "string" == typeof r4.type && (t3 = r4.__e)) {
        var o6 = r4.__np;
        o6 && ((i5 = t3._u) || (i5 = b4(t3), t3._u = i5), i5.__ = o6, h5(i5), i5._u(true));
      }
      n4(r4);
    }), p4("unmount", function(n4, r4) {
      var t3 = r4.__c, i5 = t3 && _4.get(t3);
      if (i5 && (_4.delete(t3), i5._()(true, true)), "string" == typeof r4.type) {
        var o6 = r4.__e, e4 = o6._u;
        e4 && (e4._()(true, true), o6._u = null);
      }
      n4(r4);
    }), p4("__h", function(n4, r4, t3, i5) {
      i5 < 3 && s5.add(r4), n4(r4, t3, i5);
    }), d.prototype.shouldComponentUpdate = function(n4, r4) {
      var t3, i5 = _4.get(this);
      if (!(i5 && 0 !== (null == (t3 = i5._d) ? void 0 : t3.size) || l5.has(this)))
        return true;
      if (v5.has(this))
        return true;
      if (s5.has(this))
        return true;
      for (var o6 in r4)
        return true;
      for (var e4 in n4)
        if ("__source" !== e4 && n4[e4] !== this.props[e4])
          return true;
      for (var f5 in this.props)
        if (!(f5 in n4))
          return true;
      return false;
    };
  }
});

// node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
function o5(o6, e4, n4, t3, f5) {
  var l6, s6, u6 = {};
  for (s6 in e4)
    "ref" == s6 ? l6 = e4[s6] : u6[s6] = e4[s6];
  var a6 = { type: o6, props: u6, key: n4, ref: l6, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_5, __source: f5, __self: t3 };
  if ("function" == typeof o6 && (l6 = o6.defaultProps))
    for (s6 in l6)
      void 0 === u6[s6] && (u6[s6] = l6[s6]);
  return l.vnode && l.vnode(a6), a6;
}
var _5;
var init_jsxRuntime_module = __esm({
  "node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js"() {
    init_define_process();
    init_preact_module();
    init_preact_module();
    _5 = 0;
    __name(o5, "o");
  }
});

// js/react-preact.ts
var react_preact_exports = {};
__export(react_preact_exports, {
  Children: () => Children,
  Component: () => Component,
  Fragment: () => p,
  PureComponent: () => PureComponent,
  StrictMode: () => StrictMode,
  Suspense: () => Suspense,
  SuspenseList: () => M2,
  cloneElement: () => cloneElement,
  createContext: () => createContext,
  createElement: () => h,
  createFactory: () => createFactory,
  createPortal: () => $2,
  createRef: () => createRef,
  createRoot: () => createRoot,
  default: () => react_preact_default,
  findDOMNode: () => fn,
  forwardRef: () => forwardRef,
  hydrate: () => hydrate,
  hydrateRoot: () => hydrateRoot,
  isValidElement: () => isValidElement,
  jsx: () => o5,
  jsxDEV: () => o5,
  jsxs: () => o5,
  lazy: () => lazy,
  memo: () => memo,
  render: () => render,
  renderToString: () => S2,
  shallowRender: () => x4,
  signal: () => w5,
  unmountComponentAtNode: () => unmountComponentAtNode,
  unstable_batchedUpdates: () => unstable_batchedUpdates,
  useCallback: () => useCallback,
  useContext: () => useContext,
  useDebugValue: () => useDebugValue,
  useEffect: () => useEffect,
  useId: () => useId,
  useImperativeHandle: () => useImperativeHandle,
  useInsertionEffect: () => useInsertionEffect,
  useLayoutEffect: () => useLayoutEffect,
  useMemo: () => useMemo,
  useReducer: () => useReducer,
  useRef: () => useRef,
  useState: () => useState,
  version: () => version
});
var React, createContext, hydrate, render, unmountComponentAtNode, react_preact_default, cloneElement, createFactory, useInsertionEffect, unstable_batchedUpdates, createRef, useCallback, useContext, useDebugValue, isValidElement, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef, useState, lazy, Suspense, StrictMode, useId, forwardRef, memo, Children, PureComponent, Component, version;
var init_react_preact = __esm({
  "js/react-preact.ts"() {
    init_define_process();
    init_client();
    init_server_browser();
    init_signals_module();
    init_preact_module();
    init_preact_module();
    init_dist();
    init_compat_module();
    init_compat_module();
    init_jsxRuntime_module();
    React = window.React = window.React || { ...preact_module_exports, ..._n, createPortal: $2, SuspenseList: M2, findDOMNode: fn };
    ({ createContext } = React);
    ({ hydrate, render, unmountComponentAtNode } = React);
    react_preact_default = React;
    ({
      cloneElement,
      createFactory,
      useInsertionEffect,
      unstable_batchedUpdates,
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
      useId,
      forwardRef,
      memo,
      Children,
      PureComponent,
      Component,
      version
    } = React);
  }
});

export {
  h,
  p,
  M2 as M,
  $2 as $,
  fn,
  createRoot,
  hydrateRoot,
  x4 as x,
  S2 as S,
  w5 as w,
  o5 as o,
  createContext,
  hydrate,
  render,
  unmountComponentAtNode,
  react_preact_default,
  cloneElement,
  createFactory,
  useInsertionEffect,
  unstable_batchedUpdates,
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
  useId,
  forwardRef,
  memo,
  Children,
  PureComponent,
  Component,
  version,
  react_preact_exports,
  init_react_preact
};
