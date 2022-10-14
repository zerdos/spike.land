import {
  init_define_process
} from "./chunk-chunk-VOIE2EHU.mjs";

// dist/chunk-chunk-G27IKOI7.mjs
init_define_process();
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var init_define_process2 = __esm({
  "<define:process>"() {
  }
});
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
  var t2, o5, r3, f4 = {};
  for (r3 in u4)
    "key" == r3 ? t2 = u4[r3] : "ref" == r3 ? o5 = u4[r3] : f4[r3] = u4[r3];
  if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l4 && null != l4.defaultProps)
    for (r3 in l4.defaultProps)
      void 0 === f4[r3] && (f4[r3] = l4.defaultProps[r3]);
  return v(l4, f4, t2, o5, null);
}
function v(n3, i4, t2, o5, r3) {
  var f4 = { type: n3, props: i4, key: t2, ref: o5, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r3 ? ++u : r3 };
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
      var l4, u4, i4, t2, o5, r3;
      n4.__d && (o5 = (t2 = (l4 = n4).__v).__e, (r3 = l4.__P) && (u4 = [], (i4 = s({}, t2)).__v = t2.__v + 1, j(r3, t2, i4, l4.__n, void 0 !== r3.ownerSVGElement, null != t2.__h ? [o5] : null, u4, null == o5 ? _(t2) : o5, t2.__h), z(u4, t2), t2.__e != o5 && k(t2)));
    });
}
function w(n3, l4, u4, i4, t2, o5, r3, c4, s4, a4) {
  var h4, y4, d4, k5, b4, g5, w5, x5 = i4 && i4.__k || e, C5 = x5.length;
  for (u4.__k = [], h4 = 0; h4 < l4.length; h4++)
    if (null != (k5 = u4.__k[h4] = null == (k5 = l4[h4]) || "boolean" == typeof k5 ? null : "string" == typeof k5 || "number" == typeof k5 || "bigint" == typeof k5 ? v(null, k5, null, null, k5) : Array.isArray(k5) ? v(p, { children: k5 }, null, null, null) : k5.__b > 0 ? v(k5.type, k5.props, k5.key, k5.ref ? k5.ref : null, k5.__v) : k5)) {
      if (k5.__ = u4, k5.__b = u4.__b + 1, null === (d4 = x5[h4]) || d4 && k5.key == d4.key && k5.type === d4.type)
        x5[h4] = void 0;
      else
        for (y4 = 0; y4 < C5; y4++) {
          if ((d4 = x5[y4]) && k5.key == d4.key && k5.type === d4.type) {
            x5[y4] = void 0;
            break;
          }
          d4 = null;
        }
      j(n3, k5, d4 = d4 || f, t2, o5, r3, c4, s4, a4), b4 = k5.__e, (y4 = k5.ref) && d4.ref != y4 && (w5 || (w5 = []), d4.ref && w5.push(d4.ref, null, k5), w5.push(y4, k5.__c || b4, k5)), null != b4 ? (null == g5 && (g5 = b4), "function" == typeof k5.type && k5.__k === d4.__k ? k5.__d = s4 = m(k5, s4, n3) : s4 = A(n3, k5, d4, x5, b4, s4), "function" == typeof u4.type && (u4.__d = s4)) : s4 && d4.__e == s4 && s4.parentNode != n3 && (s4 = _(d4));
    }
  for (u4.__e = g5, h4 = C5; h4--; )
    null != x5[h4] && N(x5[h4], x5[h4]);
  if (w5)
    for (h4 = 0; h4 < w5.length; h4++)
      M(w5[h4], w5[++h4], w5[++h4]);
}
function m(n3, l4, u4) {
  for (var i4, t2 = n3.__k, o5 = 0; t2 && o5 < t2.length; o5++)
    (i4 = t2[o5]) && (i4.__ = n3, l4 = "function" == typeof i4.type ? m(i4, l4, u4) : A(u4, i4, i4, t2, i4.__e, l4));
  return l4;
}
function x(n3, l4) {
  return l4 = l4 || [], null == n3 || "boolean" == typeof n3 || (Array.isArray(n3) ? n3.some(function(n4) {
    x(n4, l4);
  }) : l4.push(n3)), l4;
}
function A(n3, l4, u4, i4, t2, o5) {
  var r3, f4, e3;
  if (void 0 !== l4.__d)
    r3 = l4.__d, l4.__d = void 0;
  else if (null == u4 || t2 != o5 || null == t2.parentNode)
    n:
      if (null == o5 || o5.parentNode !== n3)
        n3.appendChild(t2), r3 = null;
      else {
        for (f4 = o5, e3 = 0; (f4 = f4.nextSibling) && e3 < i4.length; e3 += 2)
          if (f4 == t2)
            break n;
        n3.insertBefore(t2, o5), r3 = o5;
      }
  return void 0 !== r3 ? r3 : t2.nextSibling;
}
function C(n3, l4, u4, i4, t2) {
  var o5;
  for (o5 in u4)
    "children" === o5 || "key" === o5 || o5 in l4 || H(n3, o5, null, u4[o5], i4);
  for (o5 in l4)
    t2 && "function" != typeof l4[o5] || "children" === o5 || "key" === o5 || "value" === o5 || "checked" === o5 || u4[o5] === l4[o5] || H(n3, o5, l4[o5], u4[o5], i4);
}
function $(n3, l4, u4) {
  "-" === l4[0] ? n3.setProperty(l4, u4) : n3[l4] = null == u4 ? "" : "number" != typeof u4 || c.test(l4) ? u4 : u4 + "px";
}
function H(n3, l4, u4, i4, t2) {
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
      if (t2)
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
function j(n3, u4, i4, t2, o5, r3, f4, e3, c4) {
  var a4, h4, v4, y4, _5, k5, b4, g5, m4, x5, A5, C5, $3, H3 = u4.type;
  if (void 0 !== u4.constructor)
    return null;
  null != i4.__h && (c4 = i4.__h, e3 = u4.__e = i4.__e, u4.__h = null, r3 = [e3]), (a4 = l.__b) && a4(u4);
  try {
    n:
      if ("function" == typeof H3) {
        g5 = u4.props, m4 = (a4 = H3.contextType) && t2[a4.__c], x5 = a4 ? m4 ? m4.props.value : a4.__ : t2, i4.__c ? b4 = (h4 = u4.__c = i4.__c).__ = h4.__E : ("prototype" in H3 && H3.prototype.render ? u4.__c = h4 = new H3(g5, x5) : (u4.__c = h4 = new d(g5, x5), h4.constructor = H3, h4.render = O), m4 && m4.sub(h4), h4.props = g5, h4.state || (h4.state = {}), h4.context = x5, h4.__n = t2, v4 = h4.__d = true, h4.__h = [], h4._sb = []), null == h4.__s && (h4.__s = h4.state), null != H3.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = s({}, h4.__s)), s(h4.__s, H3.getDerivedStateFromProps(g5, h4.__s))), y4 = h4.props, _5 = h4.state;
        for (a4 = 0; a4 < h4._sb.length; a4++)
          h4.__h.push(h4._sb[a4]), h4._sb = [];
        if (v4)
          null == H3.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
        else {
          if (null == H3.getDerivedStateFromProps && g5 !== y4 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(g5, x5), !h4.__e && null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(g5, h4.__s, x5) || u4.__v === i4.__v) {
            h4.props = g5, h4.state = h4.__s, u4.__v !== i4.__v && (h4.__d = false), h4.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
              n4 && (n4.__ = u4);
            }), h4.__h.length && f4.push(h4);
            break n;
          }
          null != h4.componentWillUpdate && h4.componentWillUpdate(g5, h4.__s, x5), null != h4.componentDidUpdate && h4.__h.push(function() {
            h4.componentDidUpdate(y4, _5, k5);
          });
        }
        if (h4.context = x5, h4.props = g5, h4.__v = u4, h4.__P = n3, A5 = l.__r, C5 = 0, "prototype" in H3 && H3.prototype.render)
          h4.state = h4.__s, h4.__d = false, A5 && A5(u4), a4 = h4.render(h4.props, h4.state, h4.context);
        else
          do {
            h4.__d = false, A5 && A5(u4), a4 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
          } while (h4.__d && ++C5 < 25);
        h4.state = h4.__s, null != h4.getChildContext && (t2 = s(s({}, t2), h4.getChildContext())), v4 || null == h4.getSnapshotBeforeUpdate || (k5 = h4.getSnapshotBeforeUpdate(y4, _5)), $3 = null != a4 && a4.type === p && null == a4.key ? a4.props.children : a4, w(n3, Array.isArray($3) ? $3 : [$3], u4, i4, t2, o5, r3, f4, e3, c4), h4.base = u4.__e, u4.__h = null, h4.__h.length && f4.push(h4), b4 && (h4.__E = h4.__ = null), h4.__e = false;
      } else
        null == r3 && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = L(i4.__e, u4, i4, t2, o5, r3, f4, c4);
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
function L(l4, u4, i4, t2, o5, r3, e3, c4) {
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
    else if (k5 = u4.props.children, w(l4, Array.isArray(k5) ? k5 : [k5], u4, i4, t2, o5 && "foreignObject" !== d4, r3, e3, r3 ? r3[0] : i4.__k && _(i4, 0), c4), null != r3)
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
  var t2, o5;
  if (l.unmount && l.unmount(n3), (t2 = n3.ref) && (t2.current && t2.current !== n3.__e || M(t2, null, u4)), null != (t2 = n3.__c)) {
    if (t2.componentWillUnmount)
      try {
        t2.componentWillUnmount();
      } catch (n4) {
        l.__e(n4, u4);
      }
    t2.base = t2.__P = null, n3.__c = void 0;
  }
  if (t2 = n3.__k)
    for (o5 = 0; o5 < t2.length; o5++)
      t2[o5] && N(t2[o5], u4, i4 || "function" != typeof n3.type);
  i4 || null == n3.__e || a(n3.__e), n3.__ = n3.__e = n3.__d = void 0;
}
function O(n3, l4, u4) {
  return this.constructor(n3, u4);
}
function P(u4, i4, t2) {
  var o5, r3, e3;
  l.__ && l.__(u4, i4), r3 = (o5 = "function" == typeof t2) ? null : t2 && t2.__k || i4.__k, e3 = [], j(i4, u4 = (!o5 && t2 || i4).__k = h(p, null, [u4]), r3 || f, f, void 0 !== i4.ownerSVGElement, !o5 && t2 ? [t2] : r3 ? null : i4.firstChild ? n.call(i4.childNodes) : null, e3, !o5 && t2 ? t2 : r3 ? r3.__e : i4.firstChild, o5), z(e3, u4);
}
function S(n3, l4) {
  P(n3, l4, S);
}
function q(l4, u4, i4) {
  var t2, o5, r3, f4 = s({}, l4.props);
  for (r3 in u4)
    "key" == r3 ? t2 = u4[r3] : "ref" == r3 ? o5 = u4[r3] : f4[r3] = u4[r3];
  return arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), v(l4.type, f4, t2 || l4.key, o5 || l4.ref, null);
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
var n;
var l;
var u;
var i;
var t;
var o;
var r;
var f;
var e;
var c;
var init_preact_module = __esm({
  "../../.yarn/global/cache/preact-npm-10.11.1-ce16a83033-9.zip/node_modules/preact/dist/preact.module.js"() {
    init_define_process2();
    f = {};
    e = [];
    c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    n = e.slice, l = { __e: function(n3, l4, u4, i4) {
      for (var t2, o5, r3; l4 = l4.__; )
        if ((t2 = l4.__c) && !t2.__)
          try {
            if ((o5 = t2.constructor) && null != o5.getDerivedStateFromError && (t2.setState(o5.getDerivedStateFromError(n3)), r3 = t2.__d), null != t2.componentDidCatch && (t2.componentDidCatch(n3, i4 || {}), r3 = t2.__d), r3)
              return t2.__E = t2;
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
function p2(t2, r3) {
  l.__h && l.__h(u2, t2, f2 || r3), f2 = 0;
  var i4 = u2.__H || (u2.__H = { __: [], __h: [] });
  return t2 >= i4.__.length && i4.__.push({ __V: e2 }), i4.__[t2];
}
function y2(n3) {
  return f2 = 1, h2(C2, n3);
}
function h2(n3, t2, i4) {
  var o5 = p2(r2++, 2);
  if (o5.t = n3, !o5.__c && (o5.__ = [i4 ? i4(t2) : C2(void 0, t2), function(n4) {
    var t3 = o5.__N ? o5.__N[0] : o5.__[0], r3 = o5.t(t3, n4);
    t3 !== r3 && (o5.__N = [r3, o5.__[1]], o5.__c.setState({}));
  }], o5.__c = u2, !u2.u)) {
    u2.u = true;
    var f4 = u2.shouldComponentUpdate;
    u2.shouldComponentUpdate = function(n4, t3, r3) {
      if (!o5.__c.__H)
        return true;
      var u4 = o5.__c.__H.__.filter(function(n5) {
        return n5.__c;
      });
      if (u4.every(function(n5) {
        return !n5.__N;
      }))
        return !f4 || f4.call(this, n4, t3, r3);
      var i5 = false;
      return u4.forEach(function(n5) {
        if (n5.__N) {
          var t4 = n5.__[0];
          n5.__ = n5.__N, n5.__N = void 0, t4 !== n5.__[0] && (i5 = true);
        }
      }), !(!i5 && o5.__c.props === n4) && (!f4 || f4.call(this, n4, t3, r3));
    };
  }
  return o5.__N || o5.__;
}
function s2(t2, i4) {
  var o5 = p2(r2++, 3);
  !l.__s && B2(o5.__H, i4) && (o5.__ = t2, o5.i = i4, u2.__H.__h.push(o5));
}
function _2(t2, i4) {
  var o5 = p2(r2++, 4);
  !l.__s && B2(o5.__H, i4) && (o5.__ = t2, o5.i = i4, u2.__h.push(o5));
}
function A2(n3) {
  return f2 = 5, T2(function() {
    return { current: n3 };
  }, []);
}
function F(n3, t2, r3) {
  f2 = 6, _2(function() {
    return "function" == typeof n3 ? (n3(t2()), function() {
      return n3(null);
    }) : n3 ? (n3.current = t2(), function() {
      return n3.current = null;
    }) : void 0;
  }, null == r3 ? r3 : r3.concat(n3));
}
function T2(n3, t2) {
  var u4 = p2(r2++, 7);
  return B2(u4.__H, t2) ? (u4.__V = n3(), u4.i = t2, u4.__h = n3, u4.__V) : u4.__;
}
function q2(n3, t2) {
  return f2 = 8, T2(function() {
    return n3;
  }, t2);
}
function x2(n3) {
  var t2 = u2.context[n3.__c], i4 = p2(r2++, 9);
  return i4.c = n3, t2 ? (null == i4.__ && (i4.__ = true, t2.sub(u2)), t2.props.value) : n3.__;
}
function P2(t2, r3) {
  l.useDebugValue && l.useDebugValue(r3 ? r3(t2) : t2);
}
function b2() {
  var n3 = p2(r2++, 11);
  return n3.__ || (n3.__ = "P" + function(n4) {
    for (var t2 = 0, r3 = n4.length; r3 > 0; )
      t2 = (t2 << 5) - t2 + n4.charCodeAt(--r3) | 0;
    return t2;
  }(u2.__v.__m) + r2), n3.__;
}
function g2() {
  for (var t2; t2 = c2.shift(); )
    if (t2.__P && t2.__H)
      try {
        t2.__H.__h.forEach(w2), t2.__H.__h.forEach(z2), t2.__H.__h = [];
      } catch (r3) {
        t2.__H.__h = [], l.__e(r3, t2.__v);
      }
}
function k2(n3) {
  var t2, r3 = function() {
    clearTimeout(u4), j2 && cancelAnimationFrame(t2), setTimeout(n3);
  }, u4 = setTimeout(r3, 100);
  j2 && (t2 = requestAnimationFrame(r3));
}
function w2(n3) {
  var t2 = u2, r3 = n3.__c;
  "function" == typeof r3 && (n3.__c = void 0, r3()), u2 = t2;
}
function z2(n3) {
  var t2 = u2;
  n3.__c = n3.__(), u2 = t2;
}
function B2(n3, t2) {
  return !n3 || n3.length !== t2.length || t2.some(function(t3, r3) {
    return t3 !== n3[r3];
  });
}
function C2(n3, t2) {
  return "function" == typeof t2 ? t2(n3) : t2;
}
var r2;
var u2;
var i2;
var o2;
var f2;
var c2;
var e2;
var a2;
var v2;
var l2;
var m2;
var d2;
var j2;
var init_hooks_module = __esm({
  "../../.yarn/global/cache/preact-npm-10.11.1-ce16a83033-9.zip/node_modules/preact/hooks/dist/hooks.module.js"() {
    init_define_process2();
    init_preact_module();
    f2 = 0;
    c2 = [];
    e2 = [];
    a2 = l.__b;
    v2 = l.__r;
    l2 = l.diffed;
    m2 = l.__c;
    d2 = l.unmount;
    l.__b = function(n3) {
      "function" != typeof n3.type || n3.__m || n3.type === p ? n3.__m || (n3.__m = n3.__ && n3.__.__m ? n3.__.__m : "") : n3.__m = (n3.__ && n3.__.__m ? n3.__.__m : "") + (n3.__ && n3.__.__k ? n3.__.__k.indexOf(n3) : 0), u2 = null, a2 && a2(n3);
    }, l.__r = function(n3) {
      v2 && v2(n3), r2 = 0;
      var t2 = (u2 = n3.__c).__H;
      t2 && (i2 === u2 ? (t2.__h = [], u2.__h = [], t2.__.forEach(function(n4) {
        n4.__N && (n4.__ = n4.__N), n4.__V = e2, n4.__N = n4.i = void 0;
      })) : (t2.__h.forEach(w2), t2.__h.forEach(z2), t2.__h = [])), i2 = u2;
    }, l.diffed = function(t2) {
      l2 && l2(t2);
      var r3 = t2.__c;
      r3 && r3.__H && (r3.__H.__h.length && (1 !== c2.push(r3) && o2 === l.requestAnimationFrame || ((o2 = l.requestAnimationFrame) || k2)(g2)), r3.__H.__.forEach(function(n3) {
        n3.i && (n3.__H = n3.i), n3.__V !== e2 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = e2;
      })), i2 = u2 = null;
    }, l.__c = function(t2, r3) {
      r3.some(function(t3) {
        try {
          t3.__h.forEach(w2), t3.__h = t3.__h.filter(function(n3) {
            return !n3.__ || z2(n3);
          });
        } catch (u4) {
          r3.some(function(n3) {
            n3.__h && (n3.__h = []);
          }), r3 = [], l.__e(u4, t3.__v);
        }
      }), m2 && m2(t2, r3);
    }, l.unmount = function(t2) {
      d2 && d2(t2);
      var r3, u4 = t2.__c;
      u4 && u4.__H && (u4.__H.__.forEach(function(n3) {
        try {
          w2(n3);
        } catch (n4) {
          r3 = n4;
        }
      }), u4.__H = void 0, r3 && l.__e(r3, u4.__v));
    };
    j2 = "function" == typeof requestAnimationFrame;
  }
});
function g3(n3, t2) {
  for (var e3 in t2)
    n3[e3] = t2[e3];
  return n3;
}
function C3(n3, t2) {
  for (var e3 in n3)
    if ("__source" !== e3 && !(e3 in t2))
      return true;
  for (var r3 in t2)
    if ("__source" !== r3 && n3[r3] !== t2[r3])
      return true;
  return false;
}
function E(n3) {
  this.props = n3;
}
function w3(n3, e3) {
  function r3(n4) {
    var t2 = this.props.ref, r4 = t2 == n4.ref;
    return !r4 && t2 && (t2.call ? t2(null) : t2.current = null), e3 ? !e3(this.props, n4) || !r4 : C3(this.props, n4);
  }
  function u4(e4) {
    return this.shouldComponentUpdate = r3, h(n3, e4);
  }
  return u4.displayName = "Memo(" + (n3.displayName || n3.name) + ")", u4.prototype.isReactComponent = true, u4.__f = true, u4;
}
function N2(n3) {
  function t2(t3) {
    var e3 = g3({}, t3);
    return delete e3.ref, n3(e3, t3.ref || null);
  }
  return t2.$$typeof = x3, t2.render = t2, t2.prototype.isReactComponent = t2.__f = true, t2.displayName = "ForwardRef(" + (n3.displayName || n3.name) + ")", t2;
}
function I2(n3, t2, e3) {
  return n3 && (n3.__c && n3.__c.__H && (n3.__c.__H.__.forEach(function(n4) {
    "function" == typeof n4.__c && n4.__c();
  }), n3.__c.__H = null), null != (n3 = g3({}, n3)).__c && (n3.__c.__P === e3 && (n3.__c.__P = t2), n3.__c = null), n3.__k = n3.__k && n3.__k.map(function(n4) {
    return I2(n4, t2, e3);
  })), n3;
}
function L2(n3, t2, e3) {
  return n3 && (n3.__v = null, n3.__k = n3.__k && n3.__k.map(function(n4) {
    return L2(n4, t2, e3);
  }), n3.__c && n3.__c.__P === t2 && (n3.__e && e3.insertBefore(n3.__e, n3.__d), n3.__c.__e = true, n3.__c.__P = e3)), n3;
}
function U() {
  this.__u = 0, this.t = null, this.__b = null;
}
function D(n3) {
  var t2 = n3.__.__c;
  return t2 && t2.__a && t2.__a(n3);
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
  }, insertBefore: function(n4, t2) {
    this.childNodes.push(n4), e3.i.appendChild(n4);
  }, removeChild: function(n4) {
    this.childNodes.splice(this.childNodes.indexOf(n4) >>> 1, 1), e3.i.removeChild(n4);
  } }), P(h(W, { context: e3.context }, n3.__v), e3.l)) : e3.l && e3.componentWillUnmount();
}
function $2(n3, e3) {
  var r3 = h(P3, { __v: n3, i: e3 });
  return r3.containerInfo = e3, r3;
}
function Z(n3, t2, e3) {
  return null == t2.__k && (t2.textContent = ""), P(n3, t2), "function" == typeof e3 && e3(), n3 ? n3.__c : null;
}
function Y(n3, t2, e3) {
  return S(n3, t2), "function" == typeof e3 && e3(), n3 ? n3.__c : null;
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
  return !!n3 && n3.$$typeof === j3;
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
function yn(n3, t2) {
  var e3 = t2(), r3 = y2({ h: { __: e3, v: t2 } }), u4 = r3[0].h, o5 = r3[1];
  return _2(function() {
    u4.__ = e3, u4.v = t2, u4.__ !== t2() && o5({ h: u4 });
  }, [n3, e3, t2]), s2(function() {
    return u4.__ !== u4.v() && o5({ h: u4 }), n3(function() {
      u4.__ !== u4.v() && o5({ h: u4 });
    });
  }, [n3]), e3;
}
var R;
var x3;
var k3;
var A3;
var O2;
var T3;
var V;
var j3;
var z3;
var B3;
var H2;
var q3;
var Q;
var X;
var nn;
var tn;
var en;
var an;
var sn;
var hn;
var mn;
var _n;
var init_compat_module = __esm({
  "../../.yarn/global/cache/preact-npm-10.11.1-ce16a83033-9.zip/node_modules/preact/compat/dist/compat.module.js"() {
    init_define_process2();
    init_preact_module();
    init_preact_module();
    init_hooks_module();
    init_hooks_module();
    (E.prototype = new d()).isPureReactComponent = true, E.prototype.shouldComponentUpdate = function(n3, t2) {
      return C3(this.props, n3) || C3(this.state, t2);
    };
    R = l.__b;
    l.__b = function(n3) {
      n3.type && n3.type.__f && n3.ref && (n3.props.ref = n3.ref, n3.ref = null), R && R(n3);
    };
    x3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
    k3 = function(n3, t2) {
      return null == n3 ? null : x(x(n3).map(t2));
    };
    A3 = { map: k3, forEach: k3, count: function(n3) {
      return n3 ? x(n3).length : 0;
    }, only: function(n3) {
      var t2 = x(n3);
      if (1 !== t2.length)
        throw "Children.only";
      return t2[0];
    }, toArray: x };
    O2 = l.__e;
    l.__e = function(n3, t2, e3, r3) {
      if (n3.then) {
        for (var u4, o5 = t2; o5 = o5.__; )
          if ((u4 = o5.__c) && u4.__c)
            return null == t2.__e && (t2.__e = e3.__e, t2.__k = e3.__k), u4.__c(n3, t2);
      }
      O2(n3, t2, e3, r3);
    };
    T3 = l.unmount;
    l.unmount = function(n3) {
      var t2 = n3.__c;
      t2 && t2.__R && t2.__R(), t2 && true === n3.__h && (n3.type = null), T3 && T3(n3);
    }, (U.prototype = new d()).__c = function(n3, t2) {
      var e3 = t2.__c, r3 = this;
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
          var t3;
          for (r3.setState({ __a: r3.__b = null }); t3 = r3.t.pop(); )
            t3.forceUpdate();
        }
      }, c4 = true === t2.__h;
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
    V = function(n3, t2, e3) {
      if (++e3[1] === e3[0] && n3.o.delete(t2), n3.props.revealOrder && ("t" !== n3.props.revealOrder[0] || !n3.o.size))
        for (e3 = n3.u; e3; ) {
          for (; e3.length > 3; )
            e3.pop()();
          if (e3[1] < e3[0])
            break;
          n3.u = e3 = e3[2];
        }
    };
    (M2.prototype = new d()).__a = function(n3) {
      var t2 = this, e3 = D(t2.__v), r3 = t2.o.get(n3);
      return r3[0]++, function(u4) {
        var o5 = function() {
          t2.props.revealOrder ? (r3.push(u4), V(t2, n3, r3)) : u4();
        };
        e3 ? e3(o5) : o5();
      };
    }, M2.prototype.render = function(n3) {
      this.u = null, this.o = /* @__PURE__ */ new Map();
      var t2 = x(n3.children);
      n3.revealOrder && "b" === n3.revealOrder[0] && t2.reverse();
      for (var e3 = t2.length; e3--; )
        this.o.set(t2[e3], this.u = [1, 0, this.u]);
      return n3.children;
    }, M2.prototype.componentDidUpdate = M2.prototype.componentDidMount = function() {
      var n3 = this;
      this.o.forEach(function(t2, e3) {
        V(n3, e3, t2);
      });
    };
    j3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
    z3 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
    B3 = "undefined" != typeof document;
    H2 = function(n3) {
      return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n3);
    };
    d.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
      Object.defineProperty(d.prototype, t2, { configurable: true, get: function() {
        return this["UNSAFE_" + t2];
      }, set: function(n3) {
        Object.defineProperty(this, t2, { configurable: true, writable: true, value: n3 });
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
      var t2 = n3.type, e3 = n3.props, u4 = e3;
      if ("string" == typeof t2) {
        var o5 = -1 === t2.indexOf("-");
        for (var i4 in u4 = {}, e3) {
          var l4 = e3[i4];
          B3 && "children" === i4 && "noscript" === t2 || "value" === i4 && "defaultValue" in e3 && null == l4 || ("defaultValue" === i4 && "value" in e3 && null == e3.value ? i4 = "value" : "download" === i4 && true === l4 ? l4 = "" : /ondoubleclick/i.test(i4) ? i4 = "ondblclick" : /^onchange(textarea|input)/i.test(i4 + t2) && !H2(e3.type) ? i4 = "oninput" : /^onfocus$/i.test(i4) ? i4 = "onfocusin" : /^onblur$/i.test(i4) ? i4 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i4) ? i4 = i4.toLowerCase() : o5 && z3.test(i4) ? i4 = i4.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === l4 && (l4 = void 0), /^oninput$/i.test(i4) && (i4 = i4.toLowerCase(), u4[i4] && (i4 = "oninputCapture")), u4[i4] = l4);
        }
        "select" == t2 && u4.multiple && Array.isArray(u4.value) && (u4.value = x(e3.children).forEach(function(n4) {
          n4.props.selected = -1 != u4.value.indexOf(n4.props.value);
        })), "select" == t2 && null != u4.defaultValue && (u4.value = x(e3.children).forEach(function(n4) {
          n4.props.selected = u4.multiple ? -1 != u4.defaultValue.indexOf(n4.props.value) : u4.defaultValue == n4.props.value;
        })), n3.props = u4, e3.class != e3.className && (X.enumerable = "className" in e3, null != e3.className && (u4.class = e3.className), Object.defineProperty(u4, "className", X));
      }
      n3.$$typeof = j3, nn && nn(n3);
    };
    tn = l.__r;
    l.__r = function(n3) {
      tn && tn(n3), Q = n3.__c;
    };
    en = { ReactCurrentDispatcher: { current: { readContext: function(n3) {
      return Q.__n[n3.__c].props.value;
    } } } };
    an = function(n3, t2) {
      return n3(t2);
    };
    sn = function(n3, t2) {
      return n3(t2);
    };
    hn = p;
    mn = _2;
    _n = { useState: y2, useId: b2, useReducer: h2, useEffect: s2, useLayoutEffect: _2, useInsertionEffect: mn, useTransition: pn, useDeferredValue: dn, useSyncExternalStore: yn, startTransition: vn, useRef: A2, useImperativeHandle: F, useMemo: T2, useCallback: q2, useContext: x2, useDebugValue: P2, version: "17.0.2", Children: A3, render: Z, hydrate: Y, unmountComponentAtNode: cn, createPortal: $2, createElement: h, createContext: B, createFactory: un, cloneElement: ln, createRef: y, Fragment: p, isValidElement: on, findDOMNode: fn, Component: d, PureComponent: E, memo: w3, forwardRef: N2, flushSync: sn, unstable_batchedUpdates: an, StrictMode: hn, Suspense: U, SuspenseList: M2, lazy: F2, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: en };
  }
});
function o3(o5, e3, n3, t2, f4) {
  var l4, s4, u4 = {};
  for (s4 in e3)
    "ref" == s4 ? l4 = e3[s4] : u4[s4] = e3[s4];
  var a4 = { type: o5, props: u4, key: n3, ref: l4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_3, __source: f4, __self: t2 };
  if ("function" == typeof o5 && (l4 = o5.defaultProps))
    for (s4 in l4)
      void 0 === u4[s4] && (u4[s4] = l4[s4]);
  return l.vnode && l.vnode(a4), a4;
}
var _3;
var init_jsxRuntime_module = __esm({
  "../../.yarn/global/cache/preact-npm-10.11.1-ce16a83033-9.zip/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js"() {
    init_define_process2();
    init_preact_module();
    init_preact_module();
    _3 = 0;
  }
});
var init_preact_jsx_runtime = __esm({
  "js/preact-jsx-runtime.ts"() {
    "use strict";
    init_define_process2();
    init_jsxRuntime_module();
  }
});
function s3(e3) {
  if (false === l3.test(e3 += ""))
    return e3;
  for (var t2 = 0, r3 = 0, n3 = "", o5 = ""; r3 < e3.length; r3++) {
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
    r3 !== t2 && (n3 += e3.slice(t2, r3)), n3 += o5, t2 = r3 + 1;
  }
  return r3 !== t2 && (n3 += e3.slice(t2, r3)), n3;
}
function p3(e3) {
  var t2 = "";
  for (var r3 in e3) {
    var o5 = e3[r3];
    null != o5 && "" !== o5 && (t2 && (t2 += " "), t2 += "-" == r3[0] ? r3 : c3[r3] || (c3[r3] = r3.replace(_4, "-$1").toLowerCase()), t2 = "number" == typeof o5 && false === n2.test(r3) ? t2 + ": " + o5 + "px;" : t2 + ": " + o5 + ";");
  }
  return t2 || void 0;
}
function d3(e3, t2) {
  return Array.isArray(t2) ? t2.reduce(d3, e3) : null != t2 && false !== t2 && e3.push(t2), e3;
}
function v3() {
  this.__d = true;
}
function h3(e3, t2) {
  return { __v: e3, context: t2, props: e3.props, setState: v3, forceUpdate: v3, __d: true, __h: [] };
}
function g4(e3, t2) {
  var r3 = e3.contextType, n3 = r3 && t2[r3.__c];
  return null != r3 ? n3 ? n3.props.value : r3.__ : t2;
}
function m3(r3, n3, l4, c4, _5, v4) {
  if (null == r3 || "boolean" == typeof r3)
    return "";
  if ("object" != typeof r3)
    return "function" == typeof r3 ? "" : s3(r3);
  var b4 = l4.pretty, x5 = b4 && "string" == typeof b4 ? b4 : "	";
  if (Array.isArray(r3)) {
    for (var k5 = "", S3 = 0; S3 < r3.length; S3++)
      b4 && S3 > 0 && (k5 += "\n"), k5 += m3(r3[S3], n3, l4, c4, _5, v4);
    return k5;
  }
  if (void 0 !== r3.constructor)
    return "";
  var w5, C5 = r3.type, O4 = r3.props, j5 = false;
  if ("function" == typeof C5) {
    if (j5 = true, !l4.shallow || !c4 && false !== l4.renderRootComponent) {
      if (C5 === p) {
        var A5 = [];
        return d3(A5, r3.props.children), m3(A5, n3, l4, false !== l4.shallowHighOrder, _5, v4);
      }
      var F3, H3 = r3.__c = h3(r3, n3);
      l.__b && l.__b(r3);
      var M3 = l.__r;
      if (C5.prototype && "function" == typeof C5.prototype.render) {
        var L3 = g4(C5, n3);
        (H3 = r3.__c = new C5(O4, L3)).__v = r3, H3._dirty = H3.__d = true, H3.props = O4, null == H3.state && (H3.state = {}), null == H3._nextState && null == H3.__s && (H3._nextState = H3.__s = H3.state), H3.context = L3, C5.getDerivedStateFromProps ? H3.state = Object.assign({}, H3.state, C5.getDerivedStateFromProps(H3.props, H3.state)) : H3.componentWillMount && (H3.componentWillMount(), H3.state = H3._nextState !== H3.state ? H3._nextState : H3.__s !== H3.state ? H3.__s : H3.state), M3 && M3(r3), F3 = H3.render(H3.props, H3.state, H3.context);
      } else
        for (var T4 = g4(C5, n3), E2 = 0; H3.__d && E2++ < 25; )
          H3.__d = false, M3 && M3(r3), F3 = C5.call(r3.__c, O4, T4);
      return H3.getChildContext && (n3 = Object.assign({}, n3, H3.getChildContext())), l.diffed && l.diffed(r3), m3(F3, n3, l4, false !== l4.shallowHighOrder, _5, v4);
    }
    C5 = (w5 = C5).displayName || w5 !== Function && w5.name || function(e3) {
      var t2 = (Function.prototype.toString.call(e3).match(/^\s*function\s+([^( ]+)/) || "")[1];
      if (!t2) {
        for (var r4 = -1, n4 = y3.length; n4--; )
          if (y3[n4] === e3) {
            r4 = n4;
            break;
          }
        r4 < 0 && (r4 = y3.push(e3) - 1), t2 = "UnnamedComponent" + r4;
      }
      return t2;
    }(w5);
  }
  var $3, D2, N3 = "<" + C5;
  if (O4) {
    var P4 = Object.keys(O4);
    l4 && true === l4.sortAttributes && P4.sort();
    for (var W2 = 0; W2 < P4.length; W2++) {
      var I3 = P4[W2], R2 = O4[I3];
      if ("children" !== I3) {
        if (!i3.test(I3) && (l4 && l4.allAttributes || "key" !== I3 && "ref" !== I3 && "__self" !== I3 && "__source" !== I3)) {
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
            _5 && a3.test(I3) && (I3 = I3.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if ("htmlFor" === I3) {
            if (O4.for)
              continue;
            I3 = "for";
          }
          "style" === I3 && R2 && "object" == typeof R2 && (R2 = p3(R2)), "a" === I3[0] && "r" === I3[1] && "boolean" == typeof R2 && (R2 = String(R2));
          var U2 = l4.attributeHook && l4.attributeHook(I3, R2, n3, l4, j5);
          if (U2 || "" === U2)
            N3 += U2;
          else if ("dangerouslySetInnerHTML" === I3)
            D2 = R2 && R2.__html;
          else if ("textarea" === C5 && "value" === I3)
            $3 = R2;
          else if ((R2 || 0 === R2 || "" === R2) && "function" != typeof R2) {
            if (!(true !== R2 && "" !== R2 || (R2 = I3, l4 && l4.xml))) {
              N3 = N3 + " " + I3;
              continue;
            }
            if ("value" === I3) {
              if ("select" === C5) {
                v4 = R2;
                continue;
              }
              "option" === C5 && v4 == R2 && void 0 === O4.selected && (N3 += " selected");
            }
            N3 = N3 + " " + I3 + '="' + s3(R2) + '"';
          }
        }
      } else
        $3 = R2;
    }
  }
  if (b4) {
    var V2 = N3.replace(/\n\s*/, " ");
    V2 === N3 || ~V2.indexOf("\n") ? b4 && ~N3.indexOf("\n") && (N3 += "\n") : N3 = V2;
  }
  if (N3 += ">", i3.test(C5))
    throw new Error(C5 + " is not a valid HTML tag name in " + N3);
  var q4, z4 = o4.test(C5) || l4.voidElements && l4.voidElements.test(C5), Z2 = [];
  if (D2)
    b4 && u3(D2) && (D2 = "\n" + x5 + f3(D2, x5)), N3 += D2;
  else if (null != $3 && d3(q4 = [], $3).length) {
    for (var B4 = b4 && ~N3.indexOf("\n"), G2 = false, J2 = 0; J2 < q4.length; J2++) {
      var K2 = q4[J2];
      if (null != K2 && false !== K2) {
        var Q2 = m3(K2, n3, l4, true, "svg" === C5 || "foreignObject" !== C5 && _5, v4);
        if (b4 && !B4 && u3(Q2) && (B4 = true), Q2)
          if (b4) {
            var X2 = Q2.length > 0 && "<" != Q2[0];
            G2 && X2 ? Z2[Z2.length - 1] += Q2 : Z2.push(Q2), G2 = X2;
          } else
            Z2.push(Q2);
      }
    }
    if (b4 && B4)
      for (var Y2 = Z2.length; Y2--; )
        Z2[Y2] = "\n" + x5 + f3(Z2[Y2], x5);
  }
  if (Z2.length || D2)
    N3 += Z2.join("");
  else if (l4 && l4.xml)
    return N3.substring(0, N3.length - 1) + " />";
  return !z4 || q4 || D2 ? (b4 && ~N3.indexOf("\n") && (N3 += "\n"), N3 = N3 + "</" + C5 + ">") : N3 = N3.replace(/>$/, " />"), N3;
}
function S2(n3, o5, i4) {
  o5 = o5 || {};
  var a4 = l.__s;
  l.__s = true;
  var l4, s4 = h(p, null);
  return s4.__k = [n3], l4 = i4 && (i4.pretty || i4.voidElements || i4.sortAttributes || i4.shallow || i4.allAttributes || i4.xml || i4.attributeHook) ? m3(n3, o5, i4) : A4(n3, o5, false, void 0, s4), l.__c && l.__c(n3, k4), l.__s = a4, k4.length = 0, l4;
}
function w4(e3, t2) {
  return "className" === e3 ? "class" : "htmlFor" === e3 ? "for" : "defaultValue" === e3 ? "value" : "defaultChecked" === e3 ? "checked" : "defaultSelected" === e3 ? "selected" : t2 && a3.test(e3) ? e3.toLowerCase().replace(/^xlink:?/, "xlink:") : e3;
}
function C4(e3, t2) {
  return "style" === e3 && null != t2 && "object" == typeof t2 ? p3(t2) : "a" === e3[0] && "r" === e3[1] && "boolean" == typeof t2 ? String(t2) : t2;
}
function A4(r3, n3, a4, l4, f4) {
  if (null == r3 || true === r3 || false === r3 || "" === r3)
    return "";
  if ("object" != typeof r3)
    return "function" == typeof r3 ? "" : s3(r3);
  if (O3(r3)) {
    var u4 = "";
    f4.__k = r3;
    for (var c4 = 0; c4 < r3.length; c4++)
      u4 += A4(r3[c4], n3, a4, l4, f4);
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
        var n4 = e3.type, o5 = g4(n4, r4), i4 = new n4(e3.props, o5);
        e3.__c = i4, i4.__v = e3, i4.__d = true, i4.props = e3.props, null == i4.state && (i4.state = {}), null == i4.__s && (i4.__s = i4.state), i4.context = o5, n4.getDerivedStateFromProps ? i4.state = j4({}, i4.state, n4.getDerivedStateFromProps(i4.props, i4.state)) : i4.componentWillMount && (i4.componentWillMount(), i4.state = i4.__s !== i4.state ? i4.__s : i4.state);
        var a5 = l.__r;
        return a5 && a5(e3), i4.render(i4.props, i4.state, i4.context);
      }(r3, n3) : function(e3, r4) {
        var n4, o5 = h3(e3, r4), i4 = g4(e3.type, r4);
        e3.__c = o5;
        for (var a5 = l.__r, l5 = 0; o5.__d && l5++ < 25; )
          o5.__d = false, a5 && a5(e3), n4 = e3.type.call(o5, e3.props, i4);
        return n4;
      }(r3, n3);
      var v4 = r3.__c;
      v4.getChildContext && (n3 = j4({}, n3, v4.getChildContext()));
    }
    var y4 = A4(d4 = null != d4 && d4.type === p && null == d4.key ? d4.props.children : d4, n3, a4, l4, r3);
    return l.diffed && l.diffed(r3), r3.__ = void 0, l.unmount && l.unmount(r3), y4;
  }
  var m4, b4, x5 = "<";
  if (x5 += _5, p4)
    for (var k5 in m4 = p4.children, p4) {
      var S3 = p4[k5];
      if (!("key" === k5 || "ref" === k5 || "__self" === k5 || "__source" === k5 || "children" === k5 || "className" === k5 && "class" in p4 || "htmlFor" === k5 && "for" in p4 || i3.test(k5))) {
        if (S3 = C4(k5 = w4(k5, a4), S3), "dangerouslySetInnerHTML" === k5)
          b4 = S3 && S3.__html;
        else if ("textarea" === _5 && "value" === k5)
          m4 = S3;
        else if ((S3 || 0 === S3 || "" === S3) && "function" != typeof S3) {
          if (true === S3 || "" === S3) {
            S3 = k5, x5 = x5 + " " + k5;
            continue;
          }
          if ("value" === k5) {
            if ("select" === _5) {
              l4 = S3;
              continue;
            }
            "option" !== _5 || l4 != S3 || "selected" in p4 || (x5 += " selected");
          }
          x5 = x5 + " " + k5 + '="' + s3(S3) + '"';
        }
      }
    }
  var F3 = x5;
  if (x5 += ">", i3.test(_5))
    throw new Error(_5 + " is not a valid HTML tag name in " + x5);
  var H3 = "", M3 = false;
  if (b4)
    H3 += b4, M3 = true;
  else if ("string" == typeof m4)
    H3 += s3(m4), M3 = true;
  else if (O3(m4)) {
    r3.__k = m4;
    for (var L3 = 0; L3 < m4.length; L3++) {
      var T4 = m4[L3];
      if (null != T4 && false !== T4) {
        var E2 = A4(T4, n3, "svg" === _5 || "foreignObject" !== _5 && a4, l4, r3);
        E2 && (H3 += E2, M3 = true);
      }
    }
  } else if (null != m4 && false !== m4 && true !== m4) {
    r3.__k = [m4];
    var $3 = A4(m4, n3, "svg" === _5 || "foreignObject" !== _5 && a4, l4, r3);
    $3 && (H3 += $3, M3 = true);
  }
  if (l.diffed && l.diffed(r3), r3.__ = void 0, l.unmount && l.unmount(r3), M3)
    x5 += H3;
  else if (o4.test(_5))
    return F3 + " />";
  return x5 + "</" + _5 + ">";
}
var n2;
var o4;
var i3;
var a3;
var l3;
var f3;
var u3;
var c3;
var _4;
var y3;
var b3;
var x4;
var k4;
var O3;
var j4;
var init_dist = __esm({
  "../../.yarn/__virtual__/preact-render-to-string-virtual-01d743af49/0/global/cache/preact-render-to-string-npm-5.2.5-f4d2453001-9.zip/node_modules/preact-render-to-string/dist/index.mjs"() {
    init_define_process2();
    init_preact_module();
    n2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
    o4 = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
    i3 = /[\s\n\\/='"\0<>]/;
    a3 = /^xlink:?./;
    l3 = /["&<]/;
    f3 = function(e3, t2) {
      return String(e3).replace(/(\n+)/g, "$1" + (t2 || "	"));
    };
    u3 = function(e3, t2, r3) {
      return String(e3).length > (t2 || 40) || !r3 && -1 !== String(e3).indexOf("\n") || -1 !== String(e3).indexOf("<");
    };
    c3 = {};
    _4 = /([A-Z])/g;
    y3 = [];
    b3 = { shallow: true };
    S2.render = S2;
    x4 = function(e3, t2) {
      return S2(e3, t2, b3);
    };
    k4 = [];
    O3 = Array.isArray;
    j4 = Object.assign;
    S2.shallowRender = x4;
  }
});
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
  default: () => _n,
  findDOMNode: () => fn,
  flushSync: () => sn,
  forwardRef: () => forwardRef,
  hydrate: () => hydrate,
  hydrateRoot: () => hydrateRoot,
  isValidElement: () => isValidElement,
  jsx: () => o3,
  jsxs: () => o3,
  lazy: () => lazy,
  memo: () => memo,
  render: () => render,
  renderToString: () => S2,
  shallowRender: () => x4,
  startTransition: () => vn,
  unmountComponentAtNode: () => unmountComponentAtNode,
  unstable_batchedUpdates: () => an,
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
var render;
var hydrate;
var unmountComponentAtNode;
var React;
var createContext;
var cloneElement;
var createFactory;
var useInsertionEffect;
var createRef;
var useCallback;
var useContext;
var useDebugValue;
var isValidElement;
var useEffect;
var useImperativeHandle;
var useLayoutEffect;
var useMemo;
var useReducer;
var useRef;
var useState;
var lazy;
var Suspense;
var StrictMode;
var useId;
var forwardRef;
var memo;
var Children;
var PureComponent;
var Component;
var version;
var init_react_preact = __esm({
  "js/react-preact.ts"() {
    init_define_process2();
    init_compat_module();
    init_compat_module();
    init_preact_jsx_runtime();
    init_preact_module();
    init_dist();
    init_compat_module();
    ({ render, hydrate, unmountComponentAtNode } = _n);
    React = window.React = window.React || { ..._n };
    ({ createContext } = React);
    ({
      cloneElement,
      createFactory,
      useInsertionEffect,
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

// dist/react-preact.mjs
init_define_process();
init_react_preact();

export {
  __commonJS,
  __toESM,
  __toCommonJS,
  init_define_process2 as init_define_process,
  h,
  p,
  $2,
  sn,
  _n,
  o3,
  S2,
  react_preact_exports,
  createRoot,
  createContext,
  cloneElement,
  useInsertionEffect,
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
  useId,
  forwardRef,
  Children,
  PureComponent,
  Component,
  init_react_preact
};
