import {
  __esm,
  __export,
  init_define_process
} from "./chunk-chunk-T62QOXZ4.mjs";

// ../../node_modules/preact/dist/preact.module.js
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
  for (var u5 in l6)
    n4[u5] = l6[u5];
  return n4;
}
function a(n4) {
  var l6 = n4.parentNode;
  l6 && l6.removeChild(n4);
}
function h(l6, u5, i5) {
  var t3, o6, r4, f5 = {};
  for (r4 in u5)
    "key" == r4 ? t3 = u5[r4] : "ref" == r4 ? o6 = u5[r4] : f5[r4] = u5[r4];
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
  for (var u5; l6 < n4.__k.length; l6++)
    if (null != (u5 = n4.__k[l6]) && null != u5.__e)
      return u5.__e;
  return "function" == typeof n4.type ? _(n4) : null;
}
function k(n4) {
  var l6, u5;
  if (null != (n4 = n4.__) && null != n4.__c) {
    for (n4.__e = n4.__c.base = null, l6 = 0; l6 < n4.__k.length; l6++)
      if (null != (u5 = n4.__k[l6]) && null != u5.__e) {
        n4.__e = n4.__c.base = u5.__e;
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
      var l6, u5, i5, t3, o6, r4;
      n5.__d && (o6 = (t3 = (l6 = n5).__v).__e, (r4 = l6.__P) && (u5 = [], (i5 = s({}, t3)).__v = t3.__v + 1, j(r4, t3, i5, l6.__n, void 0 !== r4.ownerSVGElement, null != t3.__h ? [o6] : null, u5, null == o6 ? _(t3) : o6, t3.__h), z(u5, t3), t3.__e != o6 && k(t3)));
    });
}
function w(n4, l6, u5, i5, t3, o6, r4, c6, s6, a5) {
  var h6, y5, d6, k5, b5, g7, w6, x5 = i5 && i5.__k || e, C5 = x5.length;
  for (u5.__k = [], h6 = 0; h6 < l6.length; h6++)
    if (null != (k5 = u5.__k[h6] = null == (k5 = l6[h6]) || "boolean" == typeof k5 ? null : "string" == typeof k5 || "number" == typeof k5 || "bigint" == typeof k5 ? v(null, k5, null, null, k5) : Array.isArray(k5) ? v(p, { children: k5 }, null, null, null) : k5.__b > 0 ? v(k5.type, k5.props, k5.key, k5.ref ? k5.ref : null, k5.__v) : k5)) {
      if (k5.__ = u5, k5.__b = u5.__b + 1, null === (d6 = x5[h6]) || d6 && k5.key == d6.key && k5.type === d6.type)
        x5[h6] = void 0;
      else
        for (y5 = 0; y5 < C5; y5++) {
          if ((d6 = x5[y5]) && k5.key == d6.key && k5.type === d6.type) {
            x5[y5] = void 0;
            break;
          }
          d6 = null;
        }
      j(n4, k5, d6 = d6 || f, t3, o6, r4, c6, s6, a5), b5 = k5.__e, (y5 = k5.ref) && d6.ref != y5 && (w6 || (w6 = []), d6.ref && w6.push(d6.ref, null, k5), w6.push(y5, k5.__c || b5, k5)), null != b5 ? (null == g7 && (g7 = b5), "function" == typeof k5.type && k5.__k === d6.__k ? k5.__d = s6 = m(k5, s6, n4) : s6 = A(n4, k5, d6, x5, b5, s6), "function" == typeof u5.type && (u5.__d = s6)) : s6 && d6.__e == s6 && s6.parentNode != n4 && (s6 = _(d6));
    }
  for (u5.__e = g7, h6 = C5; h6--; )
    null != x5[h6] && ("function" == typeof u5.type && null != x5[h6].__e && x5[h6].__e == u5.__d && (u5.__d = _(i5, h6 + 1)), N(x5[h6], x5[h6]));
  if (w6)
    for (h6 = 0; h6 < w6.length; h6++)
      M(w6[h6], w6[++h6], w6[++h6]);
}
function m(n4, l6, u5) {
  for (var i5, t3 = n4.__k, o6 = 0; t3 && o6 < t3.length; o6++)
    (i5 = t3[o6]) && (i5.__ = n4, l6 = "function" == typeof i5.type ? m(i5, l6, u5) : A(u5, i5, i5, t3, i5.__e, l6));
  return l6;
}
function x(n4, l6) {
  return l6 = l6 || [], null == n4 || "boolean" == typeof n4 || (Array.isArray(n4) ? n4.some(function(n5) {
    x(n5, l6);
  }) : l6.push(n4)), l6;
}
function A(n4, l6, u5, i5, t3, o6) {
  var r4, f5, e4;
  if (void 0 !== l6.__d)
    r4 = l6.__d, l6.__d = void 0;
  else if (null == u5 || t3 != o6 || null == t3.parentNode)
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
function C(n4, l6, u5, i5, t3) {
  var o6;
  for (o6 in u5)
    "children" === o6 || "key" === o6 || o6 in l6 || H(n4, o6, null, u5[o6], i5);
  for (o6 in l6)
    t3 && "function" != typeof l6[o6] || "children" === o6 || "key" === o6 || "value" === o6 || "checked" === o6 || u5[o6] === l6[o6] || H(n4, o6, l6[o6], u5[o6], i5);
}
function $(n4, l6, u5) {
  "-" === l6[0] ? n4.setProperty(l6, u5) : n4[l6] = null == u5 ? "" : "number" != typeof u5 || c.test(l6) ? u5 : u5 + "px";
}
function H(n4, l6, u5, i5, t3) {
  var o6;
  n:
    if ("style" === l6)
      if ("string" == typeof u5)
        n4.style.cssText = u5;
      else {
        if ("string" == typeof i5 && (n4.style.cssText = i5 = ""), i5)
          for (l6 in i5)
            u5 && l6 in u5 || $(n4.style, l6, "");
        if (u5)
          for (l6 in u5)
            i5 && u5[l6] === i5[l6] || $(n4.style, l6, u5[l6]);
      }
    else if ("o" === l6[0] && "n" === l6[1])
      o6 = l6 !== (l6 = l6.replace(/Capture$/, "")), l6 = l6.toLowerCase() in n4 ? l6.toLowerCase().slice(2) : l6.slice(2), n4.l || (n4.l = {}), n4.l[l6 + o6] = u5, u5 ? i5 || n4.addEventListener(l6, o6 ? T : I, o6) : n4.removeEventListener(l6, o6 ? T : I, o6);
    else if ("dangerouslySetInnerHTML" !== l6) {
      if (t3)
        l6 = l6.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("href" !== l6 && "list" !== l6 && "form" !== l6 && "tabIndex" !== l6 && "download" !== l6 && l6 in n4)
        try {
          n4[l6] = null == u5 ? "" : u5;
          break n;
        } catch (n5) {
        }
      "function" == typeof u5 || (null != u5 && (false !== u5 || "a" === l6[0] && "r" === l6[1]) ? n4.setAttribute(l6, u5) : n4.removeAttribute(l6));
    }
}
function I(n4) {
  this.l[n4.type + false](l.event ? l.event(n4) : n4);
}
function T(n4) {
  this.l[n4.type + true](l.event ? l.event(n4) : n4);
}
function j(n4, u5, i5, t3, o6, r4, f5, e4, c6) {
  var a5, h6, v6, y5, _7, k5, b5, g7, m4, x5, A5, C5, $3, H3 = u5.type;
  if (void 0 !== u5.constructor)
    return null;
  null != i5.__h && (c6 = i5.__h, e4 = u5.__e = i5.__e, u5.__h = null, r4 = [e4]), (a5 = l.__b) && a5(u5);
  try {
    n:
      if ("function" == typeof H3) {
        if (g7 = u5.props, m4 = (a5 = H3.contextType) && t3[a5.__c], x5 = a5 ? m4 ? m4.props.value : a5.__ : t3, i5.__c ? b5 = (h6 = u5.__c = i5.__c).__ = h6.__E : ("prototype" in H3 && H3.prototype.render ? u5.__c = h6 = new H3(g7, x5) : (u5.__c = h6 = new d(g7, x5), h6.constructor = H3, h6.render = O), m4 && m4.sub(h6), h6.props = g7, h6.state || (h6.state = {}), h6.context = x5, h6.__n = t3, v6 = h6.__d = true, h6.__h = []), null == h6.__s && (h6.__s = h6.state), null != H3.getDerivedStateFromProps && (h6.__s == h6.state && (h6.__s = s({}, h6.__s)), s(h6.__s, H3.getDerivedStateFromProps(g7, h6.__s))), y5 = h6.props, _7 = h6.state, v6)
          null == H3.getDerivedStateFromProps && null != h6.componentWillMount && h6.componentWillMount(), null != h6.componentDidMount && h6.__h.push(h6.componentDidMount);
        else {
          if (null == H3.getDerivedStateFromProps && g7 !== y5 && null != h6.componentWillReceiveProps && h6.componentWillReceiveProps(g7, x5), !h6.__e && null != h6.shouldComponentUpdate && false === h6.shouldComponentUpdate(g7, h6.__s, x5) || u5.__v === i5.__v) {
            h6.props = g7, h6.state = h6.__s, u5.__v !== i5.__v && (h6.__d = false), h6.__v = u5, u5.__e = i5.__e, u5.__k = i5.__k, u5.__k.forEach(function(n5) {
              n5 && (n5.__ = u5);
            }), h6.__h.length && f5.push(h6);
            break n;
          }
          null != h6.componentWillUpdate && h6.componentWillUpdate(g7, h6.__s, x5), null != h6.componentDidUpdate && h6.__h.push(function() {
            h6.componentDidUpdate(y5, _7, k5);
          });
        }
        if (h6.context = x5, h6.props = g7, h6.__v = u5, h6.__P = n4, A5 = l.__r, C5 = 0, "prototype" in H3 && H3.prototype.render)
          h6.state = h6.__s, h6.__d = false, A5 && A5(u5), a5 = h6.render(h6.props, h6.state, h6.context);
        else
          do {
            h6.__d = false, A5 && A5(u5), a5 = h6.render(h6.props, h6.state, h6.context), h6.state = h6.__s;
          } while (h6.__d && ++C5 < 25);
        h6.state = h6.__s, null != h6.getChildContext && (t3 = s(s({}, t3), h6.getChildContext())), v6 || null == h6.getSnapshotBeforeUpdate || (k5 = h6.getSnapshotBeforeUpdate(y5, _7)), $3 = null != a5 && a5.type === p && null == a5.key ? a5.props.children : a5, w(n4, Array.isArray($3) ? $3 : [$3], u5, i5, t3, o6, r4, f5, e4, c6), h6.base = u5.__e, u5.__h = null, h6.__h.length && f5.push(h6), b5 && (h6.__E = h6.__ = null), h6.__e = false;
      } else
        null == r4 && u5.__v === i5.__v ? (u5.__k = i5.__k, u5.__e = i5.__e) : u5.__e = L(i5.__e, u5, i5, t3, o6, r4, f5, c6);
    (a5 = l.diffed) && a5(u5);
  } catch (n5) {
    u5.__v = null, (c6 || null != r4) && (u5.__e = e4, u5.__h = !!c6, r4[r4.indexOf(e4)] = null), l.__e(n5, u5, i5);
  }
}
function z(n4, u5) {
  l.__c && l.__c(u5, n4), n4.some(function(u6) {
    try {
      n4 = u6.__h, u6.__h = [], n4.some(function(n5) {
        n5.call(u6);
      });
    } catch (n5) {
      l.__e(n5, u6.__v);
    }
  });
}
function L(l6, u5, i5, t3, o6, r4, e4, c6) {
  var s6, h6, v6, y5 = i5.props, p5 = u5.props, d6 = u5.type, k5 = 0;
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
      u5.__k = [];
    else if (k5 = u5.props.children, w(l6, Array.isArray(k5) ? k5 : [k5], u5, i5, t3, o6 && "foreignObject" !== d6, r4, e4, r4 ? r4[0] : i5.__k && _(i5, 0), c6), null != r4)
      for (k5 = r4.length; k5--; )
        null != r4[k5] && a(r4[k5]);
    c6 || ("value" in p5 && void 0 !== (k5 = p5.value) && (k5 !== l6.value || "progress" === d6 && !k5 || "option" === d6 && k5 !== y5.value) && H(l6, "value", k5, y5.value, false), "checked" in p5 && void 0 !== (k5 = p5.checked) && k5 !== l6.checked && H(l6, "checked", k5, y5.checked, false));
  }
  return l6;
}
function M(n4, u5, i5) {
  try {
    "function" == typeof n4 ? n4(u5) : n4.current = u5;
  } catch (n5) {
    l.__e(n5, i5);
  }
}
function N(n4, u5, i5) {
  var t3, o6;
  if (l.unmount && l.unmount(n4), (t3 = n4.ref) && (t3.current && t3.current !== n4.__e || M(t3, null, u5)), null != (t3 = n4.__c)) {
    if (t3.componentWillUnmount)
      try {
        t3.componentWillUnmount();
      } catch (n5) {
        l.__e(n5, u5);
      }
    t3.base = t3.__P = null, n4.__c = void 0;
  }
  if (t3 = n4.__k)
    for (o6 = 0; o6 < t3.length; o6++)
      t3[o6] && N(t3[o6], u5, "function" != typeof n4.type);
  i5 || null == n4.__e || a(n4.__e), n4.__ = n4.__e = n4.__d = void 0;
}
function O(n4, l6, u5) {
  return this.constructor(n4, u5);
}
function P(u5, i5, t3) {
  var o6, r4, e4;
  l.__ && l.__(u5, i5), r4 = (o6 = "function" == typeof t3) ? null : t3 && t3.__k || i5.__k, e4 = [], j(i5, u5 = (!o6 && t3 || i5).__k = h(p, null, [u5]), r4 || f, f, void 0 !== i5.ownerSVGElement, !o6 && t3 ? [t3] : r4 ? null : i5.firstChild ? n.call(i5.childNodes) : null, e4, !o6 && t3 ? t3 : r4 ? r4.__e : i5.firstChild, o6), z(e4, u5);
}
function S(n4, l6) {
  P(n4, l6, S);
}
function q(l6, u5, i5) {
  var t3, o6, r4, f5 = s({}, l6.props);
  for (r4 in u5)
    "key" == r4 ? t3 = u5[r4] : "ref" == r4 ? o6 = u5[r4] : f5[r4] = u5[r4];
  return arguments.length > 2 && (f5.children = arguments.length > 3 ? n.call(arguments, 2) : i5), v(l6.type, f5, t3 || l6.key, o6 || l6.ref, null);
}
function B(n4, l6) {
  var u5 = { __c: l6 = "__cC" + r++, __: n4, Consumer: function(n5, l7) {
    return n5.children(l7);
  }, Provider: function(n5) {
    var u6, i5;
    return this.getChildContext || (u6 = [], (i5 = {})[l6] = this, this.getChildContext = function() {
      return i5;
    }, this.shouldComponentUpdate = function(n6) {
      this.props.value !== n6.value && u6.some(b);
    }, this.sub = function(n6) {
      u6.push(n6);
      var l7 = n6.componentWillUnmount;
      n6.componentWillUnmount = function() {
        u6.splice(u6.indexOf(n6), 1), l7 && l7.call(n6);
      };
    }), n5.children;
  } };
  return u5.Provider.__ = u5.Consumer.contextType = u5;
}
var n, l, u, i, t, o, r, f, e, c;
var init_preact_module = __esm({
  "../../node_modules/preact/dist/preact.module.js"() {
    init_define_process();
    f = {};
    e = [];
    c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    n = e.slice, l = { __e: function(n4, l6, u5, i5) {
      for (var t3, o6, r4; l6 = l6.__; )
        if ((t3 = l6.__c) && !t3.__)
          try {
            if ((o6 = t3.constructor) && null != o6.getDerivedStateFromError && (t3.setState(o6.getDerivedStateFromError(n4)), r4 = t3.__d), null != t3.componentDidCatch && (t3.componentDidCatch(n4, i5 || {}), r4 = t3.__d), r4)
              return t3.__E = t3;
          } catch (l7) {
            n4 = l7;
          }
      throw n4;
    } }, u = 0, i = function(n4) {
      return null != n4 && void 0 === n4.constructor;
    }, d.prototype.setState = function(n4, l6) {
      var u5;
      u5 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n4 && (n4 = n4(s({}, u5), this.props)), n4 && s(u5, n4), null != n4 && this.__v && (l6 && this.__h.push(l6), b(this));
    }, d.prototype.forceUpdate = function(n4) {
      this.__v && (this.__e = true, n4 && this.__h.push(n4), b(this));
    }, d.prototype.render = p, t = [], g.__r = 0, r = 0;
  }
});

// ../../node_modules/preact/hooks/dist/hooks.module.js
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
      var u5 = o6.__c.__H.__.filter(function(n6) {
        return n6.__c;
      });
      if (u5.every(function(n6) {
        return !n6.__N;
      }))
        return !f5 || f5.call(this, n5, t4, r4);
      var i6 = false;
      return u5.forEach(function(n6) {
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
  var u5 = p2(r2++, 7);
  return B2(u5.__H, t3) ? (u5.__V = n4(), u5.i = t3, u5.__h = n4, u5.__V) : u5.__;
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
  var t3, r4 = function() {
    clearTimeout(u5), j2 && cancelAnimationFrame(t3), setTimeout(n4);
  }, u5 = setTimeout(r4, 100);
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
  "../../node_modules/preact/hooks/dist/hooks.module.js"() {
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
        } catch (u5) {
          r4.some(function(n4) {
            n4.__h && (n4.__h = []);
          }), r4 = [], l.__e(u5, t4.__v);
        }
      }), m2 && m2(t3, r4);
    }, l.unmount = function(t3) {
      d2 && d2(t3);
      var r4, u5 = t3.__c;
      u5 && u5.__H && (u5.__H.__.forEach(function(n4) {
        try {
          w2(n4);
        } catch (n5) {
          r4 = n5;
        }
      }), u5.__H = void 0, r4 && l.__e(r4, u5.__v));
    };
    j2 = "function" == typeof requestAnimationFrame;
  }
});

// ../../node_modules/preact/compat/dist/compat.module.js
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
  function u5(e5) {
    return this.shouldComponentUpdate = r4, h(n4, e5);
  }
  return u5.displayName = "Memo(" + (n4.displayName || n4.name) + ")", u5.prototype.isReactComponent = true, u5.__f = true, u5;
}
function N2(n4) {
  function t3(t4) {
    var e4 = g3({}, t4);
    return delete e4.ref, n4(e4, t4.ref || null);
  }
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
  var e4, r4, u5;
  function o6(o7) {
    if (e4 || (e4 = n4()).then(function(n5) {
      r4 = n5.default || n5;
    }, function(n5) {
      u5 = n5;
    }), u5)
      throw u5;
    if (!r4)
      throw e4;
    return h(r4, o7);
  }
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
  var e4 = t3(), r4 = y2({ h: { __: e4, v: t3 } }), u5 = r4[0].h, o6 = r4[1];
  return _2(function() {
    u5.__ = e4, u5.v = t3, u5.__ !== t3() && o6({ h: u5 });
  }, [n4, e4, t3]), s2(function() {
    return u5.__ !== u5.v() && o6({ h: u5 }), n4(function() {
      u5.__ !== u5.v() && o6({ h: u5 });
    });
  }, [n4]), e4;
}
var R, x3, k3, A3, O2, T3, V, j3, z3, B3, H2, q3, Q, X, nn, tn, en, an, sn, hn, mn, _n;
var init_compat_module = __esm({
  "../../node_modules/preact/compat/dist/compat.module.js"() {
    init_define_process();
    init_preact_module();
    init_preact_module();
    init_hooks_module();
    init_hooks_module();
    (E.prototype = new d()).isPureReactComponent = true, E.prototype.shouldComponentUpdate = function(n4, t3) {
      return C3(this.props, n4) || C3(this.state, t3);
    };
    R = l.__b;
    l.__b = function(n4) {
      n4.type && n4.type.__f && n4.ref && (n4.props.ref = n4.ref, n4.ref = null), R && R(n4);
    };
    x3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
    k3 = function(n4, t3) {
      return null == n4 ? null : x(x(n4).map(t3));
    };
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
        for (var u5, o6 = t3; o6 = o6.__; )
          if ((u5 = o6.__c) && u5.__c)
            return null == t3.__e && (t3.__e = e4.__e, t3.__k = e4.__k), u5.__c(n4, t3);
      }
      O2(n4, t3, e4, r4);
    };
    T3 = l.unmount;
    l.unmount = function(n4) {
      var t3 = n4.__c;
      t3 && t3.__R && t3.__R(), t3 && true === n4.__h && (n4.type = null), T3 && T3(n4);
    }, (U.prototype = new d()).__c = function(n4, t3) {
      var e4 = t3.__c, r4 = this;
      null == r4.t && (r4.t = []), r4.t.push(e4);
      var u5 = D(r4.__v), o6 = false, i5 = function() {
        o6 || (o6 = true, e4.__R = null, u5 ? u5(l6) : l6());
      };
      e4.__R = i5;
      var l6 = function() {
        if (!--r4.__u) {
          if (r4.state.__a) {
            var n5 = r4.state.__a;
            r4.__v.__k[0] = L2(n5, n5.__c.__P, n5.__c.__O);
          }
          var t4;
          for (r4.setState({ __a: r4.__b = null }); t4 = r4.t.pop(); )
            t4.forceUpdate();
        }
      }, c6 = true === t3.__h;
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
    V = function(n4, t3, e4) {
      if (++e4[1] === e4[0] && n4.o.delete(t3), n4.props.revealOrder && ("t" !== n4.props.revealOrder[0] || !n4.o.size))
        for (e4 = n4.u; e4; ) {
          for (; e4.length > 3; )
            e4.pop()();
          if (e4[1] < e4[0])
            break;
          n4.u = e4 = e4[2];
        }
    };
    (M2.prototype = new d()).__a = function(n4) {
      var t3 = this, e4 = D(t3.__v), r4 = t3.o.get(n4);
      return r4[0]++, function(u5) {
        var o6 = function() {
          t3.props.revealOrder ? (r4.push(u5), V(t3, n4, r4)) : u5();
        };
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
    H2 = function(n4) {
      return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n4);
    };
    d.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t3) {
      Object.defineProperty(d.prototype, t3, { configurable: true, get: function() {
        return this["UNSAFE_" + t3];
      }, set: function(n4) {
        Object.defineProperty(this, t3, { configurable: true, writable: true, value: n4 });
      } });
    });
    q3 = l.event;
    l.event = function(n4) {
      return q3 && (n4 = q3(n4)), n4.persist = G, n4.isPropagationStopped = J, n4.isDefaultPrevented = K, n4.nativeEvent = n4;
    };
    X = { configurable: true, get: function() {
      return this.class;
    } };
    nn = l.vnode;
    l.vnode = function(n4) {
      var t3 = n4.type, e4 = n4.props, u5 = e4;
      if ("string" == typeof t3) {
        var o6 = -1 === t3.indexOf("-");
        for (var i5 in u5 = {}, e4) {
          var l6 = e4[i5];
          B3 && "children" === i5 && "noscript" === t3 || "value" === i5 && "defaultValue" in e4 && null == l6 || ("defaultValue" === i5 && "value" in e4 && null == e4.value ? i5 = "value" : "download" === i5 && true === l6 ? l6 = "" : /ondoubleclick/i.test(i5) ? i5 = "ondblclick" : /^onchange(textarea|input)/i.test(i5 + t3) && !H2(e4.type) ? i5 = "oninput" : /^onfocus$/i.test(i5) ? i5 = "onfocusin" : /^onblur$/i.test(i5) ? i5 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i5) ? i5 = i5.toLowerCase() : o6 && z3.test(i5) ? i5 = i5.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === l6 && (l6 = void 0), /^oninput$/i.test(i5) && (i5 = i5.toLowerCase(), u5[i5] && (i5 = "oninputCapture")), u5[i5] = l6);
        }
        "select" == t3 && u5.multiple && Array.isArray(u5.value) && (u5.value = x(e4.children).forEach(function(n5) {
          n5.props.selected = -1 != u5.value.indexOf(n5.props.value);
        })), "select" == t3 && null != u5.defaultValue && (u5.value = x(e4.children).forEach(function(n5) {
          n5.props.selected = u5.multiple ? -1 != u5.defaultValue.indexOf(n5.props.value) : u5.defaultValue == n5.props.value;
        })), n4.props = u5, e4.class != e4.className && (X.enumerable = "className" in e4, null != e4.className && (u5.class = e4.className), Object.defineProperty(u5, "className", X));
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
    an = function(n4, t3) {
      return n4(t3);
    };
    sn = function(n4, t3) {
      return n4(t3);
    };
    hn = p;
    mn = _2;
    _n = { useState: y2, useId: b2, useReducer: h2, useEffect: s2, useLayoutEffect: _2, useInsertionEffect: mn, useTransition: pn, useDeferredValue: dn, useSyncExternalStore: yn, startTransition: vn, useRef: A2, useImperativeHandle: F, useMemo: T2, useCallback: q2, useContext: x2, useDebugValue: P2, version: "17.0.2", Children: A3, render: Z, hydrate: Y, unmountComponentAtNode: cn, createPortal: $2, createElement: h, createContext: B, createFactory: un, cloneElement: ln, createRef: y, Fragment: p, isValidElement: on, findDOMNode: fn, Component: d, PureComponent: E, memo: w3, forwardRef: N2, flushSync: sn, unstable_batchedUpdates: an, StrictMode: hn, Suspense: U, SuspenseList: M2, lazy: F2, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: en };
  }
});

// ../../node_modules/preact/compat/client.mjs
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
  "../../node_modules/preact/compat/client.mjs"() {
    init_define_process();
    init_compat_module();
  }
});

// ../../node_modules/preact-render-to-string/dist/index.mjs
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
function m3(r4, n4, l6, c6, _7, v6) {
  if (null == r4 || "boolean" == typeof r4)
    return "";
  if ("object" != typeof r4)
    return s3(r4);
  var b5 = l6.pretty, x5 = b5 && "string" == typeof b5 ? b5 : "	";
  if (Array.isArray(r4)) {
    for (var k5 = "", S3 = 0; S3 < r4.length; S3++)
      b5 && S3 > 0 && (k5 += "\n"), k5 += m3(r4[S3], n4, l6, c6, _7, v6);
    return k5;
  }
  var w6, C5 = r4.type, O4 = r4.props, j5 = false;
  if ("function" == typeof C5) {
    if (j5 = true, !l6.shallow || !c6 && false !== l6.renderRootComponent) {
      if (C5 === p) {
        var A5 = [];
        return d3(A5, r4.props.children), m3(A5, n4, l6, false !== l6.shallowHighOrder, _7, v6);
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
      return H3.getChildContext && (n4 = Object.assign({}, n4, H3.getChildContext())), l.diffed && l.diffed(r4), m3(F3, n4, l6, false !== l6.shallowHighOrder, _7, v6);
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
            _7 && a3.test(I3) && (I3 = I3.toLowerCase().replace(/^xlink:?/, "xlink:"));
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
        var Q2 = m3(K2, n4, l6, true, "svg" === C5 || "foreignObject" !== C5 && _7, v6);
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
  var a5 = l.__s;
  l.__s = true;
  var l6, s6 = h(p, null);
  return s6.__k = [n4], l6 = i5 && (i5.pretty || i5.voidElements || i5.sortAttributes || i5.shallow || i5.allAttributes || i5.xml || i5.attributeHook) ? m3(n4, o6, i5) : A4(n4, o6, false, void 0, s6), l.__c && l.__c(n4, k4), l.__s = a5, k4.length = 0, l6;
}
function w4(e4, t3) {
  return "className" === e4 ? "class" : "htmlFor" === e4 ? "for" : "defaultValue" === e4 ? "value" : "defaultChecked" === e4 ? "checked" : "defaultSelected" === e4 ? "selected" : t3 && a3.test(e4) ? e4.toLowerCase().replace(/^xlink:?/, "xlink:") : e4;
}
function C4(e4, t3) {
  return "style" === e4 && null != t3 && "object" == typeof t3 ? p3(t3) : "a" === e4[0] && "r" === e4[1] && "boolean" == typeof t3 ? String(t3) : t3;
}
function A4(r4, n4, a5, l6, f5) {
  if (null == r4 || true === r4 || false === r4 || "" === r4)
    return "";
  if ("object" != typeof r4)
    return s3(r4);
  if (O3(r4)) {
    var u5 = "";
    f5.__k = r4;
    for (var c6 = 0; c6 < r4.length; c6++)
      u5 += A4(r4[c6], n4, a5, l6, f5);
    return u5;
  }
  r4.__ = f5, l.__b && l.__b(r4);
  var _7 = r4.type, p5 = r4.props;
  if ("function" == typeof _7) {
    var d6;
    if (_7 === p)
      d6 = p5.children;
    else {
      d6 = _7.prototype && "function" == typeof _7.prototype.render ? function(e4, r5) {
        var n5 = e4.type, o6 = g4(n5, r5), i5 = new n5(e4.props, o6);
        e4.__c = i5, i5.__v = e4, i5.__d = true, i5.props = e4.props, null == i5.state && (i5.state = {}), null == i5.__s && (i5.__s = i5.state), i5.context = o6, n5.getDerivedStateFromProps ? i5.state = j4({}, i5.state, n5.getDerivedStateFromProps(i5.props, i5.state)) : i5.componentWillMount && (i5.componentWillMount(), i5.state = i5.__s !== i5.state ? i5.__s : i5.state);
        var a6 = l.__r;
        return a6 && a6(e4), i5.render(i5.props, i5.state, i5.context);
      }(r4, n4) : function(e4, r5) {
        var n5, o6 = h3(e4, r5), i5 = g4(e4.type, r5);
        e4.__c = o6;
        for (var a6 = l.__r, l7 = 0; o6.__d && l7++ < 25; )
          o6.__d = false, a6 && a6(e4), n5 = e4.type.call(o6, e4.props, i5);
        return n5;
      }(r4, n4);
      var v6 = r4.__c;
      v6.getChildContext && (n4 = j4({}, n4, v6.getChildContext()));
    }
    var y5 = A4(d6, n4, a5, l6, r4);
    return l.diffed && l.diffed(r4), r4.__ = void 0, l.unmount && l.unmount(r4), y5;
  }
  var m4, b5, x5 = "<";
  if (x5 += _7, p5)
    for (var k5 in m4 = p5.children, p5) {
      var S3 = p5[k5];
      if (!("key" === k5 || "ref" === k5 || "__self" === k5 || "__source" === k5 || "children" === k5 || "className" === k5 && "class" in p5 || "htmlFor" === k5 && "for" in p5 || i3.test(k5))) {
        if (S3 = C4(k5 = w4(k5, a5), S3), "dangerouslySetInnerHTML" === k5)
          b5 = S3 && S3.__html;
        else if ("textarea" === _7 && "value" === k5)
          m4 = S3;
        else if ((S3 || 0 === S3 || "" === S3) && "function" != typeof S3) {
          if (true === S3 || "" === S3) {
            S3 = k5, x5 = x5 + " " + k5;
            continue;
          }
          if ("value" === k5) {
            if ("select" === _7) {
              l6 = S3;
              continue;
            }
            "option" !== _7 || l6 != S3 || "selected" in p5 || (x5 += " selected");
          }
          x5 = x5 + " " + k5 + '="' + s3(S3) + '"';
        }
      }
    }
  var F3 = x5;
  if (x5 += ">", i3.test(_7))
    throw new Error(_7 + " is not a valid HTML tag name in " + x5);
  var H3 = "", M3 = false;
  if (b5)
    H3 += b5, M3 = true;
  else if ("string" == typeof m4)
    H3 += s3(m4), M3 = true;
  else if (O3(m4)) {
    r4.__k = m4;
    for (var L3 = 0; L3 < m4.length; L3++) {
      var T4 = m4[L3];
      if (null != T4 && false !== T4) {
        var E2 = A4(T4, n4, "svg" === _7 || "foreignObject" !== _7 && a5, l6, r4);
        E2 && (H3 += E2, M3 = true);
      }
    }
  } else if (null != m4 && false !== m4 && true !== m4) {
    r4.__k = [m4];
    var $3 = A4(m4, n4, "svg" === _7 || "foreignObject" !== _7 && a5, l6, r4);
    $3 && (H3 += $3, M3 = true);
  }
  if (l.diffed && l.diffed(r4), r4.__ = void 0, l.unmount && l.unmount(r4), M3)
    x5 += H3;
  else if (o3.test(_7))
    return F3 + " />";
  return x5 + "</" + _7 + ">";
}
var n2, o3, i3, a3, l3, f3, u3, c3, _3, y3, b3, x4, k4, O3, j4;
var init_dist = __esm({
  "../../node_modules/preact-render-to-string/dist/index.mjs"() {
    init_define_process();
    init_preact_module();
    n2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
    o3 = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
    i3 = /[\s\n\\/='"\0<>]/;
    a3 = /^xlink:?./;
    l3 = /["&<]/;
    f3 = function(e4, t3) {
      return String(e4).replace(/(\n+)/g, "$1" + (t3 || "	"));
    };
    u3 = function(e4, t3, r4) {
      return String(e4).length > (t3 || 40) || !r4 && -1 !== String(e4).indexOf("\n") || -1 !== String(e4).indexOf("<");
    };
    c3 = {};
    _3 = /([A-Z])/g;
    y3 = [];
    b3 = { shallow: true };
    S2.render = S2;
    x4 = function(e4, t3) {
      return S2(e4, t3, b3);
    };
    k4 = [];
    O3 = Array.isArray;
    j4 = Object.assign;
    S2.shallowRender = x4;
  }
});

// ../../node_modules/preact/compat/server.browser.js
var init_server_browser = __esm({
  "../../node_modules/preact/compat/server.browser.js"() {
    init_define_process();
    init_dist();
  }
});

// ../../node_modules/@preact/signals-core/dist/signals-core.module.js
function i4() {
  throw new Error("Cycle detected");
}
function t2() {
  if (!(r3 > 1)) {
    var i5, t3 = false;
    while (void 0 !== o4) {
      var h6 = o4;
      o4 = void 0;
      n3++;
      while (void 0 !== h6) {
        var s6 = h6.o;
        h6.o = void 0;
        h6.f &= -3;
        if (!(8 & h6.f) && 4 & h6.f)
          try {
            h6.c();
          } catch (h7) {
            if (!t3) {
              i5 = h7;
              t3 = true;
            }
          }
        h6 = s6;
      }
    }
    n3 = 0;
    r3--;
    if (t3)
      throw i5;
  } else
    r3--;
}
function h4(i5) {
  if (r3 > 0)
    return i5();
  r3++;
  try {
    return i5();
  } finally {
    t2();
  }
}
function v4(i5) {
  if (void 0 !== s4) {
    var t3 = i5.n;
    if (void 0 === t3 || t3.t !== s4) {
      s4.s = t3 = { f: 0, i: 0, S: i5, p: void 0, n: s4.s, t: s4, e: void 0, x: void 0, r: t3 };
      i5.n = t3;
      if (32 & s4.f)
        i5.S(t3);
      return t3;
    } else if (1 & t3.f) {
      t3.f &= -2;
      var h6 = s4.s;
      if (t3 !== h6) {
        var o6 = t3.p, r4 = t3.n;
        if (void 0 !== o6)
          o6.n = r4;
        if (void 0 !== r4)
          r4.p = o6;
        if (void 0 !== h6)
          h6.p = t3;
        t3.p = void 0;
        t3.n = h6;
        s4.s = t3;
      }
      return t3;
    }
  }
}
function e3(i5) {
  this.v = i5;
  this.i = 0;
  this.n = void 0;
  this.t = void 0;
}
function u4(i5) {
  return new e3(i5);
}
function d4(i5) {
  for (var t3 = i5.s; void 0 !== t3; t3 = t3.n) {
    var h6 = t3.S.n;
    if (void 0 !== h6)
      t3.r = h6;
    t3.S.n = t3;
    t3.f |= 1;
  }
}
function c4(i5) {
  var t3 = i5.s, h6 = void 0;
  while (void 0 !== t3) {
    var s6 = t3.n;
    if (1 & t3.f) {
      t3.S.U(t3);
      t3.n = void 0;
    } else {
      if (void 0 !== h6)
        h6.p = t3;
      t3.p = void 0;
      t3.n = h6;
      h6 = t3;
    }
    t3.S.n = t3.r;
    if (void 0 !== t3.r)
      t3.r = void 0;
    t3 = s6;
  }
  i5.s = h6;
}
function a4(i5) {
  e3.call(this, void 0);
  this.x = i5;
  this.s = void 0;
  this.g = f4 - 1;
  this.f = 4;
}
function l4(i5) {
  return new a4(i5);
}
function w5(i5) {
  var h6 = i5.u;
  i5.u = void 0;
  if ("function" == typeof h6) {
    r3++;
    var o6 = s4;
    s4 = void 0;
    try {
      h6();
    } catch (t3) {
      i5.f &= -2;
      throw t3;
    } finally {
      s4 = o6;
      t2();
    }
  }
}
function y4(i5) {
  for (var t3 = i5.s; void 0 !== t3; t3 = t3.n)
    t3.S.U(t3);
  i5.s = void 0;
  w5(i5);
}
function _4(i5) {
  if (s4 !== this)
    throw new Error("Out-of-order effect");
  c4(this);
  s4 = i5;
  this.f &= -2;
  if (8 & this.f)
    y4(this);
  t2();
}
function g5(i5) {
  this.x = i5;
  this.u = void 0;
  this.s = void 0;
  this.o = void 0;
  this.f = 36;
}
function b4(i5) {
  var t3 = new g5(i5);
  t3.c();
  return t3.d.bind(t3);
}
var s4, o4, r3, n3, f4;
var init_signals_core_module = __esm({
  "../../node_modules/@preact/signals-core/dist/signals-core.module.js"() {
    init_define_process();
    s4 = void 0;
    o4 = void 0;
    r3 = 0;
    n3 = 0;
    f4 = 0;
    e3.prototype.h = function() {
      return true;
    };
    e3.prototype.S = function(i5) {
      if (!(2 & i5.f)) {
        i5.f |= 2;
        i5.x = this.t;
        if (void 0 !== this.t)
          this.t.e = i5;
        this.t = i5;
      }
    };
    e3.prototype.U = function(i5) {
      if (2 & i5.f) {
        i5.f &= -3;
        var t3 = i5.e, h6 = i5.x;
        if (void 0 !== t3) {
          t3.x = h6;
          i5.e = void 0;
        }
        if (void 0 !== h6) {
          h6.e = t3;
          i5.x = void 0;
        }
        if (i5 === this.t)
          this.t = h6;
      }
    };
    e3.prototype.subscribe = function(i5) {
      var t3 = this;
      return b4(function() {
        var h6 = t3.value, s6 = 32 & this.f;
        this.f &= -33;
        try {
          i5(h6);
        } finally {
          this.f |= s6;
        }
      });
    };
    e3.prototype.valueOf = function() {
      return this.value;
    };
    e3.prototype.toString = function() {
      return this.value + "";
    };
    e3.prototype.peek = function() {
      return this.v;
    };
    Object.defineProperty(e3.prototype, "value", { get: function() {
      var i5 = v4(this);
      if (void 0 !== i5)
        i5.i = this.i;
      return this.v;
    }, set: function(h6) {
      if (h6 !== this.v) {
        if (n3 > 100)
          i4();
        this.v = h6;
        this.i++;
        f4++;
        r3++;
        try {
          for (var s6 = this.t; void 0 !== s6; s6 = s6.x)
            s6.t.N();
        } finally {
          t2();
        }
      }
    } });
    (a4.prototype = new e3()).h = function() {
      this.f &= -3;
      if (1 & this.f)
        return false;
      if (32 == (36 & this.f))
        return true;
      this.f &= -5;
      if (this.g === f4)
        return true;
      this.g = f4;
      this.f |= 1;
      if (this.i > 0) {
        var i5 = this.s;
        while (void 0 !== i5) {
          if (!i5.S.h() || i5.S.i !== i5.i)
            break;
          i5 = i5.n;
        }
        if (void 0 === i5) {
          this.f &= -2;
          return true;
        }
      }
      var t3 = s4;
      try {
        d4(this);
        s4 = this;
        var h6 = this.x();
        if (16 & this.f || this.v !== h6 || 0 === this.i) {
          this.v = h6;
          this.f &= -17;
          this.i++;
        }
      } catch (i6) {
        this.v = i6;
        this.f |= 16;
        this.i++;
      }
      s4 = t3;
      c4(this);
      this.f &= -2;
      return true;
    };
    a4.prototype.S = function(i5) {
      if (void 0 === this.t) {
        this.f |= 36;
        for (var t3 = this.s; void 0 !== t3; t3 = t3.n)
          t3.S.S(t3);
      }
      e3.prototype.S.call(this, i5);
    };
    a4.prototype.U = function(i5) {
      e3.prototype.U.call(this, i5);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t3 = this.s; void 0 !== t3; t3 = t3.n)
          t3.S.U(t3);
      }
    };
    a4.prototype.N = function() {
      if (!(2 & this.f)) {
        this.f |= 6;
        for (var i5 = this.t; void 0 !== i5; i5 = i5.x)
          i5.t.N();
      }
    };
    a4.prototype.peek = function() {
      if (!this.h())
        i4();
      if (16 & this.f)
        throw this.v;
      return this.v;
    };
    Object.defineProperty(a4.prototype, "value", { get: function() {
      if (1 & this.f)
        i4();
      var t3 = v4(this);
      this.h();
      if (void 0 !== t3)
        t3.i = this.i;
      if (16 & this.f)
        throw this.v;
      return this.v;
    } });
    g5.prototype.c = function() {
      var i5 = this.S();
      try {
        if (!(8 & this.f))
          this.u = this.x();
      } finally {
        i5();
      }
    };
    g5.prototype.S = function() {
      if (1 & this.f)
        i4();
      this.f |= 1;
      this.f &= -9;
      d4(this);
      w5(this);
      r3++;
      this.f &= -5;
      var t3 = s4;
      s4 = this;
      return _4.bind(this, t3);
    };
    g5.prototype.N = function() {
      if (!(2 & this.f)) {
        this.f |= 6;
        this.o = o4;
        o4 = this;
      }
    };
    g5.prototype.d = function() {
      this.f |= 8;
      if (!(1 & this.f))
        y4(this);
    };
  }
});

// ../../node_modules/@preact/signals/dist/signals.module.js
var signals_module_exports = {};
__export(signals_module_exports, {
  Signal: () => e3,
  batch: () => h4,
  computed: () => l4,
  effect: () => b4,
  signal: () => u4,
  useComputed: () => h5,
  useSignal: () => _5,
  useSignalEffect: () => g6
});
function s5(n4, r4) {
  l[n4] = r4.bind(null, l[n4] || function() {
  });
}
function l5(n4) {
  if (v5)
    v5();
  v5 = n4 && n4.S();
}
function p4(n4) {
  var i5 = this, t3 = n4.data, f5 = _5(t3);
  f5.value = t3;
  var o6 = T2(function() {
    var n5 = i5.__v;
    while (n5 = n5.__)
      if (n5.__c) {
        n5.__c.__$f |= 4;
        break;
      }
    i5.__$u.c = function() {
      i5.base.data = o6.peek();
    };
    return l4(function() {
      var n6 = f5.value.value;
      return 0 === n6 ? 0 : true === n6 ? "" : n6 || "";
    });
  }, []);
  return o6.value;
}
function d5(n4, i5, r4, t3) {
  var f5 = i5 in n4 && void 0 === n4.ownerSVGElement, o6 = u4(r4);
  return { o: function(n5, i6) {
    o6.value = n5;
    t3 = i6;
  }, d: b4(function() {
    var r5 = o6.value.value;
    if (t3[i5] !== r5) {
      t3[i5] = r5;
      if (f5)
        n4[i5] = r5;
      else if (r5)
        n4.setAttribute(i5, r5);
      else
        n4.removeAttribute(i5);
    }
  }) };
}
function _5(n4) {
  return T2(function() {
    return u4(n4);
  }, []);
}
function h5(n4) {
  var i5 = A2(n4);
  i5.current = n4;
  c5.__$f |= 4;
  return T2(function() {
    return l4(function() {
      return i5.current();
    });
  }, []);
}
function g6(n4) {
  var i5 = A2(n4);
  i5.current = n4;
  s2(function() {
    return b4(function() {
      i5.current();
    });
  }, []);
}
var c5, v5;
var init_signals_module = __esm({
  "../../node_modules/@preact/signals/dist/signals.module.js"() {
    init_define_process();
    init_preact_module();
    init_hooks_module();
    init_signals_core_module();
    init_signals_core_module();
    p4.displayName = "_st";
    Object.defineProperties(e3.prototype, { constructor: { configurable: true }, type: { configurable: true, value: p4 }, props: { configurable: true, get: function() {
      return { data: this };
    } }, __b: { configurable: true, value: 1 } });
    s5("__b", function(n4, i5) {
      if ("string" == typeof i5.type) {
        var r4, t3 = i5.props;
        for (var f5 in t3)
          if ("children" !== f5) {
            var e4 = t3[f5];
            if (e4 instanceof e3) {
              if (!r4)
                i5.__np = r4 = {};
              r4[f5] = e4;
              t3[f5] = e4.peek();
            }
          }
      }
      n4(i5);
    });
    s5("__r", function(n4, i5) {
      l5();
      var r4, t3 = i5.__c;
      if (t3) {
        t3.__$f &= -2;
        if (void 0 === (r4 = t3.__$u))
          t3.__$u = r4 = function(n5) {
            var i6;
            b4(function() {
              i6 = this;
            });
            i6.c = function() {
              t3.__$f |= 1;
              t3.setState({});
            };
            return i6;
          }();
      }
      c5 = t3;
      l5(r4);
      n4(i5);
    });
    s5("__e", function(n4, i5, r4, t3) {
      l5();
      c5 = void 0;
      n4(i5, r4, t3);
    });
    s5("diffed", function(n4, i5) {
      l5();
      c5 = void 0;
      var r4;
      if ("string" == typeof i5.type && (r4 = i5.__e)) {
        var t3 = i5.__np, f5 = i5.props;
        if (t3) {
          var o6 = r4.U;
          if (o6)
            for (var e4 in o6) {
              var u5 = o6[e4];
              if (void 0 !== u5 && !(e4 in t3)) {
                u5.d();
                o6[e4] = void 0;
              }
            }
          else
            r4.U = o6 = {};
          for (var a5 in t3) {
            var v6 = o6[a5], s6 = t3[a5];
            if (void 0 === v6) {
              v6 = d5(r4, a5, s6, f5);
              o6[a5] = v6;
            } else
              v6.o(s6, f5);
          }
        }
      }
      n4(i5);
    });
    s5("unmount", function(n4, i5) {
      if ("string" == typeof i5.type) {
        var r4 = i5.__e;
        if (r4) {
          var t3 = r4.U;
          if (t3) {
            r4.U = void 0;
            for (var f5 in t3) {
              var o6 = t3[f5];
              if (o6)
                o6.d();
            }
          }
        }
      } else {
        var e4 = i5.__c;
        if (e4) {
          var u5 = e4.__$u;
          if (u5) {
            e4.__$u = void 0;
            u5.d();
          }
        }
      }
      n4(i5);
    });
    s5("__h", function(n4, i5, r4, t3) {
      if (t3 < 3)
        i5.__$f |= 2;
      n4(i5, r4, t3);
    });
    d.prototype.shouldComponentUpdate = function(n4, i5) {
      var r4 = this.__$u;
      if (!(r4 && void 0 !== r4.s || 4 & this.__$f))
        return true;
      if (3 & this.__$f)
        return true;
      for (var t3 in i5)
        return true;
      for (var f5 in n4)
        if ("__source" !== f5 && n4[f5] !== this.props[f5])
          return true;
      for (var o6 in this.props)
        if (!(o6 in n4))
          return true;
      return false;
    };
  }
});

// ../../node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
function o5(o6, e4, n4, t3, f5) {
  var l6, s6, u5 = {};
  for (s6 in e4)
    "ref" == s6 ? l6 = e4[s6] : u5[s6] = e4[s6];
  var a5 = { type: o6, props: u5, key: n4, ref: l6, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_6, __source: f5, __self: t3 };
  if ("function" == typeof o6 && (l6 = o6.defaultProps))
    for (s6 in l6)
      void 0 === u5[s6] && (u5[s6] = l6[s6]);
  return l.vnode && l.vnode(a5), a5;
}
var _6;
var init_jsxRuntime_module = __esm({
  "../../node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js"() {
    init_define_process();
    init_preact_module();
    init_preact_module();
    _6 = 0;
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
  computed: () => computed,
  createContext: () => createContext,
  createElement: () => h,
  createFactory: () => createFactory,
  createPortal: () => $2,
  createRef: () => createRef,
  createRoot: () => createRoot,
  default: () => react_preact_default,
  effect: () => effect,
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
  signal: () => signal,
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
var React, createContext, signal, effect, computed, hydrate, render, unmountComponentAtNode, react_preact_default, cloneElement, createFactory, useInsertionEffect, unstable_batchedUpdates, createRef, useCallback, useContext, useDebugValue, isValidElement, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef, useState, lazy, Suspense, StrictMode, useId, forwardRef, memo, Children, PureComponent, Component, version;
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
    React = window.React = window.React || { ...preact_module_exports, ..._n, ...signals_module_exports, createPortal: $2, SuspenseList: M2, findDOMNode: fn };
    ({ createContext } = React);
    ({ signal } = signals_module_exports);
    ({ effect } = signals_module_exports);
    ({ computed } = signals_module_exports);
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
  o5 as o,
  createContext,
  signal,
  effect,
  computed,
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
