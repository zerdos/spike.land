var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x5) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x5, {
  get: (a4, b3) => (typeof require !== "undefined" ? require : a4)[b3]
}) : x5)(function(x5) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x5 + '" is not supported');
});
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// ../../node_modules/preact/dist/preact.module.js
function a(n3, l4) {
  for (var u4 in l4)
    n3[u4] = l4[u4];
  return n3;
}
function h(n3) {
  var l4 = n3.parentNode;
  l4 && l4.removeChild(n3);
}
function v(l4, u4, i4) {
  var t3, o4, r4, f4 = {};
  for (r4 in u4)
    r4 == "key" ? t3 = u4[r4] : r4 == "ref" ? o4 = u4[r4] : f4[r4] = u4[r4];
  if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), typeof l4 == "function" && l4.defaultProps != null)
    for (r4 in l4.defaultProps)
      f4[r4] === void 0 && (f4[r4] = l4.defaultProps[r4]);
  return y(l4, f4, t3, o4, null);
}
function y(n3, i4, t3, o4, r4) {
  var f4 = { type: n3, props: i4, key: t3, ref: o4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: r4 == null ? ++u : r4 };
  return r4 == null && l.vnode != null && l.vnode(f4), f4;
}
function p() {
  return { current: null };
}
function d(n3) {
  return n3.children;
}
function _(n3, l4) {
  this.props = n3, this.context = l4;
}
function k(n3, l4) {
  if (l4 == null)
    return n3.__ ? k(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
  for (var u4; l4 < n3.__k.length; l4++)
    if ((u4 = n3.__k[l4]) != null && u4.__e != null)
      return u4.__e;
  return typeof n3.type == "function" ? k(n3) : null;
}
function b(n3) {
  var l4, u4;
  if ((n3 = n3.__) != null && n3.__c != null) {
    for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++)
      if ((u4 = n3.__k[l4]) != null && u4.__e != null) {
        n3.__e = n3.__c.base = u4.__e;
        break;
      }
    return b(n3);
  }
}
function m(n3) {
  (!n3.__d && (n3.__d = true) && t.push(n3) && !g.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(g);
}
function g() {
  for (var n3; g.__r = t.length; )
    n3 = t.sort(function(n4, l4) {
      return n4.__v.__b - l4.__v.__b;
    }), t = [], n3.some(function(n4) {
      var l4, u4, i4, t3, o4, r4;
      n4.__d && (o4 = (t3 = (l4 = n4).__v).__e, (r4 = l4.__P) && (u4 = [], (i4 = a({}, t3)).__v = t3.__v + 1, j(r4, t3, i4, l4.__n, r4.ownerSVGElement !== void 0, t3.__h != null ? [o4] : null, u4, o4 == null ? k(t3) : o4, t3.__h), z(u4, t3), t3.__e != o4 && b(t3)));
    });
}
function w(n3, l4, u4, i4, t3, o4, r4, f4, s4, a4) {
  var h4, v4, p4, _4, b3, m4, g5, w4 = i4 && i4.__k || c, A4 = w4.length;
  for (u4.__k = [], h4 = 0; h4 < l4.length; h4++)
    if ((_4 = u4.__k[h4] = (_4 = l4[h4]) == null || typeof _4 == "boolean" ? null : typeof _4 == "string" || typeof _4 == "number" || typeof _4 == "bigint" ? y(null, _4, null, null, _4) : Array.isArray(_4) ? y(d, { children: _4 }, null, null, null) : _4.__b > 0 ? y(_4.type, _4.props, _4.key, null, _4.__v) : _4) != null) {
      if (_4.__ = u4, _4.__b = u4.__b + 1, (p4 = w4[h4]) === null || p4 && _4.key == p4.key && _4.type === p4.type)
        w4[h4] = void 0;
      else
        for (v4 = 0; v4 < A4; v4++) {
          if ((p4 = w4[v4]) && _4.key == p4.key && _4.type === p4.type) {
            w4[v4] = void 0;
            break;
          }
          p4 = null;
        }
      j(n3, _4, p4 = p4 || e, t3, o4, r4, f4, s4, a4), b3 = _4.__e, (v4 = _4.ref) && p4.ref != v4 && (g5 || (g5 = []), p4.ref && g5.push(p4.ref, null, _4), g5.push(v4, _4.__c || b3, _4)), b3 != null ? (m4 == null && (m4 = b3), typeof _4.type == "function" && _4.__k === p4.__k ? _4.__d = s4 = x(_4, s4, n3) : s4 = P(n3, _4, p4, w4, b3, s4), typeof u4.type == "function" && (u4.__d = s4)) : s4 && p4.__e == s4 && s4.parentNode != n3 && (s4 = k(p4));
    }
  for (u4.__e = m4, h4 = A4; h4--; )
    w4[h4] != null && (typeof u4.type == "function" && w4[h4].__e != null && w4[h4].__e == u4.__d && (u4.__d = k(i4, h4 + 1)), N(w4[h4], w4[h4]));
  if (g5)
    for (h4 = 0; h4 < g5.length; h4++)
      M(g5[h4], g5[++h4], g5[++h4]);
}
function x(n3, l4, u4) {
  for (var i4, t3 = n3.__k, o4 = 0; t3 && o4 < t3.length; o4++)
    (i4 = t3[o4]) && (i4.__ = n3, l4 = typeof i4.type == "function" ? x(i4, l4, u4) : P(u4, i4, i4, t3, i4.__e, l4));
  return l4;
}
function A(n3, l4) {
  return l4 = l4 || [], n3 == null || typeof n3 == "boolean" || (Array.isArray(n3) ? n3.some(function(n4) {
    A(n4, l4);
  }) : l4.push(n3)), l4;
}
function P(n3, l4, u4, i4, t3, o4) {
  var r4, f4, e3;
  if (l4.__d !== void 0)
    r4 = l4.__d, l4.__d = void 0;
  else if (u4 == null || t3 != o4 || t3.parentNode == null)
    n:
      if (o4 == null || o4.parentNode !== n3)
        n3.appendChild(t3), r4 = null;
      else {
        for (f4 = o4, e3 = 0; (f4 = f4.nextSibling) && e3 < i4.length; e3 += 2)
          if (f4 == t3)
            break n;
        n3.insertBefore(t3, o4), r4 = o4;
      }
  return r4 !== void 0 ? r4 : t3.nextSibling;
}
function C(n3, l4, u4, i4, t3) {
  var o4;
  for (o4 in u4)
    o4 === "children" || o4 === "key" || o4 in l4 || H(n3, o4, null, u4[o4], i4);
  for (o4 in l4)
    t3 && typeof l4[o4] != "function" || o4 === "children" || o4 === "key" || o4 === "value" || o4 === "checked" || u4[o4] === l4[o4] || H(n3, o4, l4[o4], u4[o4], i4);
}
function $(n3, l4, u4) {
  l4[0] === "-" ? n3.setProperty(l4, u4) : n3[l4] = u4 == null ? "" : typeof u4 != "number" || s.test(l4) ? u4 : u4 + "px";
}
function H(n3, l4, u4, i4, t3) {
  var o4;
  n:
    if (l4 === "style")
      if (typeof u4 == "string")
        n3.style.cssText = u4;
      else {
        if (typeof i4 == "string" && (n3.style.cssText = i4 = ""), i4)
          for (l4 in i4)
            u4 && l4 in u4 || $(n3.style, l4, "");
        if (u4)
          for (l4 in u4)
            i4 && u4[l4] === i4[l4] || $(n3.style, l4, u4[l4]);
      }
    else if (l4[0] === "o" && l4[1] === "n")
      o4 = l4 !== (l4 = l4.replace(/Capture$/, "")), l4 = l4.toLowerCase() in n3 ? l4.toLowerCase().slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + o4] = u4, u4 ? i4 || n3.addEventListener(l4, o4 ? T : I, o4) : n3.removeEventListener(l4, o4 ? T : I, o4);
    else if (l4 !== "dangerouslySetInnerHTML") {
      if (t3)
        l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (l4 !== "href" && l4 !== "list" && l4 !== "form" && l4 !== "tabIndex" && l4 !== "download" && l4 in n3)
        try {
          n3[l4] = u4 == null ? "" : u4;
          break n;
        } catch (n4) {
        }
      typeof u4 == "function" || (u4 != null && (u4 !== false || l4[0] === "a" && l4[1] === "r") ? n3.setAttribute(l4, u4) : n3.removeAttribute(l4));
    }
}
function I(n3) {
  this.l[n3.type + false](l.event ? l.event(n3) : n3);
}
function T(n3) {
  this.l[n3.type + true](l.event ? l.event(n3) : n3);
}
function j(n3, u4, i4, t3, o4, r4, f4, e3, c4) {
  var s4, h4, v4, y3, p4, k4, b3, m4, g5, x5, A4, P3 = u4.type;
  if (u4.constructor !== void 0)
    return null;
  i4.__h != null && (c4 = i4.__h, e3 = u4.__e = i4.__e, u4.__h = null, r4 = [e3]), (s4 = l.__b) && s4(u4);
  try {
    n:
      if (typeof P3 == "function") {
        if (m4 = u4.props, g5 = (s4 = P3.contextType) && t3[s4.__c], x5 = s4 ? g5 ? g5.props.value : s4.__ : t3, i4.__c ? b3 = (h4 = u4.__c = i4.__c).__ = h4.__E : ("prototype" in P3 && P3.prototype.render ? u4.__c = h4 = new P3(m4, x5) : (u4.__c = h4 = new _(m4, x5), h4.constructor = P3, h4.render = O), g5 && g5.sub(h4), h4.props = m4, h4.state || (h4.state = {}), h4.context = x5, h4.__n = t3, v4 = h4.__d = true, h4.__h = []), h4.__s == null && (h4.__s = h4.state), P3.getDerivedStateFromProps != null && (h4.__s == h4.state && (h4.__s = a({}, h4.__s)), a(h4.__s, P3.getDerivedStateFromProps(m4, h4.__s))), y3 = h4.props, p4 = h4.state, v4)
          P3.getDerivedStateFromProps == null && h4.componentWillMount != null && h4.componentWillMount(), h4.componentDidMount != null && h4.__h.push(h4.componentDidMount);
        else {
          if (P3.getDerivedStateFromProps == null && m4 !== y3 && h4.componentWillReceiveProps != null && h4.componentWillReceiveProps(m4, x5), !h4.__e && h4.shouldComponentUpdate != null && h4.shouldComponentUpdate(m4, h4.__s, x5) === false || u4.__v === i4.__v) {
            h4.props = m4, h4.state = h4.__s, u4.__v !== i4.__v && (h4.__d = false), h4.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
              n4 && (n4.__ = u4);
            }), h4.__h.length && f4.push(h4);
            break n;
          }
          h4.componentWillUpdate != null && h4.componentWillUpdate(m4, h4.__s, x5), h4.componentDidUpdate != null && h4.__h.push(function() {
            h4.componentDidUpdate(y3, p4, k4);
          });
        }
        h4.context = x5, h4.props = m4, h4.state = h4.__s, (s4 = l.__r) && s4(u4), h4.__d = false, h4.__v = u4, h4.__P = n3, s4 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s, h4.getChildContext != null && (t3 = a(a({}, t3), h4.getChildContext())), v4 || h4.getSnapshotBeforeUpdate == null || (k4 = h4.getSnapshotBeforeUpdate(y3, p4)), A4 = s4 != null && s4.type === d && s4.key == null ? s4.props.children : s4, w(n3, Array.isArray(A4) ? A4 : [A4], u4, i4, t3, o4, r4, f4, e3, c4), h4.base = u4.__e, u4.__h = null, h4.__h.length && f4.push(h4), b3 && (h4.__E = h4.__ = null), h4.__e = false;
      } else
        r4 == null && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = L(i4.__e, u4, i4, t3, o4, r4, f4, c4);
    (s4 = l.diffed) && s4(u4);
  } catch (n4) {
    u4.__v = null, (c4 || r4 != null) && (u4.__e = e3, u4.__h = !!c4, r4[r4.indexOf(e3)] = null), l.__e(n4, u4, i4);
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
function L(l4, u4, i4, t3, o4, r4, f4, c4) {
  var s4, a4, v4, y3 = i4.props, p4 = u4.props, d4 = u4.type, _4 = 0;
  if (d4 === "svg" && (o4 = true), r4 != null) {
    for (; _4 < r4.length; _4++)
      if ((s4 = r4[_4]) && "setAttribute" in s4 == !!d4 && (d4 ? s4.localName === d4 : s4.nodeType === 3)) {
        l4 = s4, r4[_4] = null;
        break;
      }
  }
  if (l4 == null) {
    if (d4 === null)
      return document.createTextNode(p4);
    l4 = o4 ? document.createElementNS("http://www.w3.org/2000/svg", d4) : document.createElement(d4, p4.is && p4), r4 = null, c4 = false;
  }
  if (d4 === null)
    y3 === p4 || c4 && l4.data === p4 || (l4.data = p4);
  else {
    if (r4 = r4 && n.call(l4.childNodes), a4 = (y3 = i4.props || e).dangerouslySetInnerHTML, v4 = p4.dangerouslySetInnerHTML, !c4) {
      if (r4 != null)
        for (y3 = {}, _4 = 0; _4 < l4.attributes.length; _4++)
          y3[l4.attributes[_4].name] = l4.attributes[_4].value;
      (v4 || a4) && (v4 && (a4 && v4.__html == a4.__html || v4.__html === l4.innerHTML) || (l4.innerHTML = v4 && v4.__html || ""));
    }
    if (C(l4, p4, y3, o4, c4), v4)
      u4.__k = [];
    else if (_4 = u4.props.children, w(l4, Array.isArray(_4) ? _4 : [_4], u4, i4, t3, o4 && d4 !== "foreignObject", r4, f4, r4 ? r4[0] : i4.__k && k(i4, 0), c4), r4 != null)
      for (_4 = r4.length; _4--; )
        r4[_4] != null && h(r4[_4]);
    c4 || ("value" in p4 && (_4 = p4.value) !== void 0 && (_4 !== l4.value || d4 === "progress" && !_4 || d4 === "option" && _4 !== y3.value) && H(l4, "value", _4, y3.value, false), "checked" in p4 && (_4 = p4.checked) !== void 0 && _4 !== l4.checked && H(l4, "checked", _4, y3.checked, false));
  }
  return l4;
}
function M(n3, u4, i4) {
  try {
    typeof n3 == "function" ? n3(u4) : n3.current = u4;
  } catch (n4) {
    l.__e(n4, i4);
  }
}
function N(n3, u4, i4) {
  var t3, o4;
  if (l.unmount && l.unmount(n3), (t3 = n3.ref) && (t3.current && t3.current !== n3.__e || M(t3, null, u4)), (t3 = n3.__c) != null) {
    if (t3.componentWillUnmount)
      try {
        t3.componentWillUnmount();
      } catch (n4) {
        l.__e(n4, u4);
      }
    t3.base = t3.__P = null;
  }
  if (t3 = n3.__k)
    for (o4 = 0; o4 < t3.length; o4++)
      t3[o4] && N(t3[o4], u4, typeof n3.type != "function");
  i4 || n3.__e == null || h(n3.__e), n3.__e = n3.__d = void 0;
}
function O(n3, l4, u4) {
  return this.constructor(n3, u4);
}
function S(u4, i4, t3) {
  var o4, r4, f4;
  l.__ && l.__(u4, i4), r4 = (o4 = typeof t3 == "function") ? null : t3 && t3.__k || i4.__k, f4 = [], j(i4, u4 = (!o4 && t3 || i4).__k = v(d, null, [u4]), r4 || e, e, i4.ownerSVGElement !== void 0, !o4 && t3 ? [t3] : r4 ? null : i4.firstChild ? n.call(i4.childNodes) : null, f4, !o4 && t3 ? t3 : r4 ? r4.__e : i4.firstChild, o4), z(f4, u4);
}
function q(n3, l4) {
  S(n3, l4, q);
}
function B(l4, u4, i4) {
  var t3, o4, r4, f4 = a({}, l4.props);
  for (r4 in u4)
    r4 == "key" ? t3 = u4[r4] : r4 == "ref" ? o4 = u4[r4] : f4[r4] = u4[r4];
  return arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), y(l4.type, f4, t3 || l4.key, o4 || l4.ref, null);
}
function D(n3, l4) {
  var u4 = { __c: l4 = "__cC" + f++, __: n3, Consumer: function(n4, l5) {
    return n4.children(l5);
  }, Provider: function(n4) {
    var u5, i4;
    return this.getChildContext || (u5 = [], (i4 = {})[l4] = this, this.getChildContext = function() {
      return i4;
    }, this.shouldComponentUpdate = function(n5) {
      this.props.value !== n5.value && u5.some(m);
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
var n, l, u, i, t, o, r, f, e, c, s;
var init_preact_module = __esm({
  "../../node_modules/preact/dist/preact.module.js"() {
    init_react_shim();
    e = {};
    c = [];
    s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    n = c.slice, l = { __e: function(n3, l4, u4, i4) {
      for (var t3, o4, r4; l4 = l4.__; )
        if ((t3 = l4.__c) && !t3.__)
          try {
            if ((o4 = t3.constructor) && o4.getDerivedStateFromError != null && (t3.setState(o4.getDerivedStateFromError(n3)), r4 = t3.__d), t3.componentDidCatch != null && (t3.componentDidCatch(n3, i4 || {}), r4 = t3.__d), r4)
              return t3.__E = t3;
          } catch (l5) {
            n3 = l5;
          }
      throw n3;
    } }, u = 0, i = function(n3) {
      return n3 != null && n3.constructor === void 0;
    }, _.prototype.setState = function(n3, l4) {
      var u4;
      u4 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), typeof n3 == "function" && (n3 = n3(a({}, u4), this.props)), n3 && a(u4, n3), n3 != null && this.__v && (l4 && this.__h.push(l4), m(this));
    }, _.prototype.forceUpdate = function(n3) {
      this.__v && (this.__e = true, n3 && this.__h.push(n3), m(this));
    }, _.prototype.render = d, t = [], o = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;
  }
});

// ../../node_modules/preact-render-to-string/dist/index.mjs
function o2(e3) {
  var t3 = String(e3);
  return n2.test(t3) ? t3.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t3;
}
function s2(e3) {
  var t3 = "";
  for (var n3 in e3) {
    var o4 = e3[n3];
    o4 != null && o4 !== "" && (t3 && (t3 += " "), t3 += n3[0] == "-" ? n3 : l2[n3] || (l2[n3] = n3.replace(/([A-Z])/g, "-$1").toLowerCase()), t3 += ": ", t3 += o4, typeof o4 == "number" && r2.test(n3) === false && (t3 += "px"), t3 += ";");
  }
  return t3 || void 0;
}
function f2(e3, t3) {
  for (var r4 in t3)
    e3[r4] = t3[r4];
  return e3;
}
function u2(e3, t3) {
  return Array.isArray(t3) ? t3.reduce(u2, e3) : t3 != null && t3 !== false && e3.push(t3), e3;
}
function v2() {
  this.__d = true;
}
function m2(t3, r4, n3) {
  r4 = r4 || {}, n3 = n3 || {};
  var o4 = l.__s;
  l.__s = true;
  var a4 = x2(t3, r4, n3);
  return l.__c && l.__c(t3, h2), h2.length = 0, l.__s = o4, a4;
}
function x2(r4, n3, l4, c4, g5, h4) {
  if (r4 == null || typeof r4 == "boolean")
    return "";
  if (typeof r4 != "object")
    return o2(r4);
  var m4 = l4.pretty, y3 = m4 && typeof m4 == "string" ? m4 : "	";
  if (Array.isArray(r4)) {
    for (var b3 = "", S3 = 0; S3 < r4.length; S3++)
      m4 && S3 > 0 && (b3 += "\n"), b3 += x2(r4[S3], n3, l4, c4, g5, h4);
    return b3;
  }
  var w4, k4 = r4.type, O3 = r4.props, C3 = false;
  if (typeof k4 == "function") {
    if (C3 = true, !l4.shallow || !c4 && l4.renderRootComponent !== false) {
      if (k4 === d) {
        var A4 = [];
        return u2(A4, r4.props.children), x2(A4, n3, l4, l4.shallowHighOrder !== false, g5, h4);
      }
      var H3, j4 = r4.__c = { __v: r4, context: n3, props: r4.props, setState: v2, forceUpdate: v2, __d: true, __h: [] };
      l.__b && l.__b(r4);
      var F3 = l.__r;
      if (k4.prototype && typeof k4.prototype.render == "function") {
        var M3 = k4.contextType, T4 = M3 && n3[M3.__c], $3 = M3 != null ? T4 ? T4.props.value : M3.__ : n3;
        (j4 = r4.__c = new k4(O3, $3)).__v = r4, j4._dirty = j4.__d = true, j4.props = O3, j4.state == null && (j4.state = {}), j4._nextState == null && j4.__s == null && (j4._nextState = j4.__s = j4.state), j4.context = $3, k4.getDerivedStateFromProps ? j4.state = f2(f2({}, j4.state), k4.getDerivedStateFromProps(j4.props, j4.state)) : j4.componentWillMount && (j4.componentWillMount(), j4.state = j4._nextState !== j4.state ? j4._nextState : j4.__s !== j4.state ? j4.__s : j4.state), F3 && F3(r4), H3 = j4.render(j4.props, j4.state, j4.context);
      } else
        for (var L3 = k4.contextType, E2 = L3 && n3[L3.__c], D3 = L3 != null ? E2 ? E2.props.value : L3.__ : n3, N3 = 0; j4.__d && N3++ < 25; )
          j4.__d = false, F3 && F3(r4), H3 = k4.call(r4.__c, O3, D3);
      return j4.getChildContext && (n3 = f2(f2({}, n3), j4.getChildContext())), l.diffed && l.diffed(r4), x2(H3, n3, l4, l4.shallowHighOrder !== false, g5, h4);
    }
    k4 = (w4 = k4).displayName || w4 !== Function && w4.name || function(e3) {
      var t3 = (Function.prototype.toString.call(e3).match(/^\s*function\s+([^( ]+)/) || "")[1];
      if (!t3) {
        for (var r5 = -1, n4 = p2.length; n4--; )
          if (p2[n4] === e3) {
            r5 = n4;
            break;
          }
        r5 < 0 && (r5 = p2.push(e3) - 1), t3 = "UnnamedComponent" + r5;
      }
      return t3;
    }(w4);
  }
  var P3, R2, U2 = "<" + k4;
  if (O3) {
    var W2 = Object.keys(O3);
    l4 && l4.sortAttributes === true && W2.sort();
    for (var q4 = 0; q4 < W2.length; q4++) {
      var z3 = W2[q4], I3 = O3[z3];
      if (z3 !== "children") {
        if (!d2.test(z3) && (l4 && l4.allAttributes || z3 !== "key" && z3 !== "ref" && z3 !== "__self" && z3 !== "__source")) {
          if (z3 === "defaultValue")
            z3 = "value";
          else if (z3 === "className") {
            if (O3.class !== void 0)
              continue;
            z3 = "class";
          } else
            g5 && z3.match(/^xlink:?./) && (z3 = z3.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if (z3 === "htmlFor") {
            if (O3.for)
              continue;
            z3 = "for";
          }
          z3 === "style" && I3 && typeof I3 == "object" && (I3 = s2(I3)), z3[0] === "a" && z3[1] === "r" && typeof I3 == "boolean" && (I3 = String(I3));
          var V2 = l4.attributeHook && l4.attributeHook(z3, I3, n3, l4, C3);
          if (V2 || V2 === "")
            U2 += V2;
          else if (z3 === "dangerouslySetInnerHTML")
            R2 = I3 && I3.__html;
          else if (k4 === "textarea" && z3 === "value")
            P3 = I3;
          else if ((I3 || I3 === 0 || I3 === "") && typeof I3 != "function") {
            if (!(I3 !== true && I3 !== "" || (I3 = z3, l4 && l4.xml))) {
              U2 += " " + z3;
              continue;
            }
            if (z3 === "value") {
              if (k4 === "select") {
                h4 = I3;
                continue;
              }
              k4 === "option" && h4 == I3 && O3.selected === void 0 && (U2 += " selected");
            }
            U2 += " " + z3 + '="' + o2(I3) + '"';
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
  if (U2 += ">", d2.test(k4))
    throw new Error(k4 + " is not a valid HTML tag name in " + U2);
  var B3, G2 = _2.test(k4) || l4.voidElements && l4.voidElements.test(k4), J2 = [];
  if (R2)
    m4 && i2(R2) && (R2 = "\n" + y3 + a2(R2, y3)), U2 += R2;
  else if (P3 != null && u2(B3 = [], P3).length) {
    for (var K2 = m4 && ~U2.indexOf("\n"), Q2 = false, X2 = 0; X2 < B3.length; X2++) {
      var Y2 = B3[X2];
      if (Y2 != null && Y2 !== false) {
        var ee = x2(Y2, n3, l4, true, k4 === "svg" || k4 !== "foreignObject" && g5, h4);
        if (m4 && !K2 && i2(ee) && (K2 = true), ee)
          if (m4) {
            var te = ee.length > 0 && ee[0] != "<";
            Q2 && te ? J2[J2.length - 1] += ee : J2.push(ee), Q2 = te;
          } else
            J2.push(ee);
      }
    }
    if (m4 && K2)
      for (var re = J2.length; re--; )
        J2[re] = "\n" + y3 + a2(J2[re], y3);
  }
  if (J2.length || R2)
    U2 += J2.join("");
  else if (l4 && l4.xml)
    return U2.substring(0, U2.length - 1) + " />";
  return !G2 || B3 || R2 ? (m4 && ~U2.indexOf("\n") && (U2 += "\n"), U2 += "</" + k4 + ">") : U2 = U2.replace(/>$/, " />"), U2;
}
var r2, n2, a2, i2, l2, c2, p2, _2, d2, g2, h2, dist_default;
var init_dist = __esm({
  "../../node_modules/preact-render-to-string/dist/index.mjs"() {
    init_react_shim();
    init_preact_module();
    r2 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
    n2 = /[&<>"]/;
    a2 = function(e3, t3) {
      return String(e3).replace(/(\n+)/g, "$1" + (t3 || "	"));
    };
    i2 = function(e3, t3, r4) {
      return String(e3).length > (t3 || 40) || !r4 && String(e3).indexOf("\n") !== -1 || String(e3).indexOf("<") !== -1;
    };
    l2 = {};
    c2 = { shallow: true };
    p2 = [];
    _2 = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
    d2 = /[\s\n\\/='"\0<>]/;
    m2.render = m2;
    g2 = function(e3, t3) {
      return m2(e3, t3, c2);
    };
    h2 = [];
    m2.shallowRender = g2;
    dist_default = m2;
  }
});

// js/preact.ts
var createContext, useDebugValue, useState, useRef, useContext, useLayoutEffect, useEffect, useReducer, useCallback, forwardRef, createElement, createFactory, createRef, Fragment, Component, Suspense, isValidElement, memo, useImperativeHandle, Children, lazy, useMemo, cloneElement;
var init_preact = __esm({
  "js/preact.ts"() {
    init_react_shim();
    init_compat_module();
    init_compat_module();
    init_dist();
    ({ createContext } = compat_module_exports);
    ({ useDebugValue } = compat_module_exports);
    ({ useState } = compat_module_exports);
    ({ useRef } = compat_module_exports);
    ({ useContext } = compat_module_exports);
    ({ useLayoutEffect } = compat_module_exports);
    ({ useEffect } = compat_module_exports);
    ({ useReducer } = compat_module_exports);
    ({ useCallback } = compat_module_exports);
    ({ forwardRef } = compat_module_exports);
    ({ createElement } = compat_module_exports);
    ({ createFactory } = compat_module_exports);
    ({ createRef } = compat_module_exports);
    ({ Fragment } = compat_module_exports);
    ({ Component } = compat_module_exports);
    ({ Suspense } = compat_module_exports);
    ({ isValidElement } = compat_module_exports);
    ({ memo } = compat_module_exports);
    ({ useImperativeHandle } = compat_module_exports);
    ({ Children } = compat_module_exports);
    ({ lazy } = compat_module_exports);
    ({ useMemo } = compat_module_exports);
    ({ cloneElement } = compat_module_exports);
  }
});

// js/react-shim.mjs
import { jsx } from "https://spike.land/dist/emotion.mjs";
var init_react_shim = __esm({
  "js/react-shim.mjs"() {
    init_preact();
  }
});

// ../../node_modules/preact/hooks/dist/hooks.module.js
function l3(t3, r4) {
  l.__h && l.__h(u3, t3, o3 || r4), o3 = 0;
  var i4 = u3.__H || (u3.__H = { __: [], __h: [] });
  return t3 >= i4.__.length && i4.__.push({}), i4.__[t3];
}
function m3(n3) {
  return o3 = 1, p3(w2, n3);
}
function p3(n3, r4, o4) {
  var i4 = l3(t2++, 2);
  return i4.t = n3, i4.__c || (i4.__ = [o4 ? o4(r4) : w2(void 0, r4), function(n4) {
    var t3 = i4.t(i4.__[0], n4);
    i4.__[0] !== t3 && (i4.__ = [t3, i4.__[1]], i4.__c.setState({}));
  }], i4.__c = u3), i4.__;
}
function y2(r4, o4) {
  var i4 = l3(t2++, 3);
  !l.__s && k2(i4.__H, o4) && (i4.__ = r4, i4.__H = o4, u3.__H.__h.push(i4));
}
function d3(r4, o4) {
  var i4 = l3(t2++, 4);
  !l.__s && k2(i4.__H, o4) && (i4.__ = r4, i4.__H = o4, u3.__h.push(i4));
}
function h3(n3) {
  return o3 = 5, _3(function() {
    return { current: n3 };
  }, []);
}
function s3(n3, t3, u4) {
  o3 = 6, d3(function() {
    return typeof n3 == "function" ? (n3(t3()), function() {
      return n3(null);
    }) : n3 ? (n3.current = t3(), function() {
      return n3.current = null;
    }) : void 0;
  }, u4 == null ? u4 : u4.concat(n3));
}
function _3(n3, u4) {
  var r4 = l3(t2++, 7);
  return k2(r4.__H, u4) && (r4.__ = n3(), r4.__H = u4, r4.__h = n3), r4.__;
}
function A2(n3, t3) {
  return o3 = 8, _3(function() {
    return n3;
  }, t3);
}
function F(n3) {
  var r4 = u3.context[n3.__c], o4 = l3(t2++, 9);
  return o4.c = n3, r4 ? (o4.__ == null && (o4.__ = true, r4.sub(u3)), r4.props.value) : n3.__;
}
function T2(t3, u4) {
  l.useDebugValue && l.useDebugValue(u4 ? u4(t3) : t3);
}
function q2(n3) {
  var r4 = l3(t2++, 10), o4 = m3();
  return r4.__ = n3, u3.componentDidCatch || (u3.componentDidCatch = function(n4) {
    r4.__ && r4.__(n4), o4[1](n4);
  }), [o4[0], function() {
    o4[1](void 0);
  }];
}
function x3() {
  for (var t3; t3 = i3.shift(); )
    if (t3.__P)
      try {
        t3.__H.__h.forEach(g3), t3.__H.__h.forEach(j2), t3.__H.__h = [];
      } catch (u4) {
        t3.__H.__h = [], l.__e(u4, t3.__v);
      }
}
function g3(n3) {
  var t3 = u3, r4 = n3.__c;
  typeof r4 == "function" && (n3.__c = void 0, r4()), u3 = t3;
}
function j2(n3) {
  var t3 = u3;
  n3.__c = n3.__(), u3 = t3;
}
function k2(n3, t3) {
  return !n3 || n3.length !== t3.length || t3.some(function(t4, u4) {
    return t4 !== n3[u4];
  });
}
function w2(n3, t3) {
  return typeof t3 == "function" ? t3(n3) : t3;
}
var t2, u3, r3, o3, i3, c3, f3, e2, a3, v3, b2;
var init_hooks_module = __esm({
  "../../node_modules/preact/hooks/dist/hooks.module.js"() {
    init_react_shim();
    init_preact_module();
    o3 = 0;
    i3 = [];
    c3 = l.__b;
    f3 = l.__r;
    e2 = l.diffed;
    a3 = l.__c;
    v3 = l.unmount;
    l.__b = function(n3) {
      u3 = null, c3 && c3(n3);
    }, l.__r = function(n3) {
      f3 && f3(n3), t2 = 0;
      var r4 = (u3 = n3.__c).__H;
      r4 && (r4.__h.forEach(g3), r4.__h.forEach(j2), r4.__h = []);
    }, l.diffed = function(t3) {
      e2 && e2(t3);
      var o4 = t3.__c;
      o4 && o4.__H && o4.__H.__h.length && (i3.push(o4) !== 1 && r3 === l.requestAnimationFrame || ((r3 = l.requestAnimationFrame) || function(n3) {
        var t4, u4 = function() {
          clearTimeout(r4), b2 && cancelAnimationFrame(t4), setTimeout(n3);
        }, r4 = setTimeout(u4, 100);
        b2 && (t4 = requestAnimationFrame(u4));
      })(x3)), u3 = null;
    }, l.__c = function(t3, u4) {
      u4.some(function(t4) {
        try {
          t4.__h.forEach(g3), t4.__h = t4.__h.filter(function(n3) {
            return !n3.__ || j2(n3);
          });
        } catch (r4) {
          u4.some(function(n3) {
            n3.__h && (n3.__h = []);
          }), u4 = [], l.__e(r4, t4.__v);
        }
      }), a3 && a3(t3, u4);
    }, l.unmount = function(t3) {
      v3 && v3(t3);
      var u4, r4 = t3.__c;
      r4 && r4.__H && (r4.__H.__.forEach(function(n3) {
        try {
          g3(n3);
        } catch (n4) {
          u4 = n4;
        }
      }), u4 && l.__e(u4, r4.__v));
    };
    b2 = typeof requestAnimationFrame == "function";
  }
});

// ../../node_modules/preact/compat/dist/compat.module.js
var compat_module_exports = {};
__export(compat_module_exports, {
  Children: () => k3,
  Component: () => _,
  Fragment: () => d,
  PureComponent: () => E,
  StrictMode: () => cn,
  Suspense: () => L2,
  SuspenseList: () => M2,
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
  forwardRef: () => x4,
  hydrate: () => $2,
  isValidElement: () => en,
  lazy: () => F2,
  memo: () => g4,
  render: () => B2,
  unmountComponentAtNode: () => un,
  unstable_batchedUpdates: () => ln,
  useCallback: () => A2,
  useContext: () => F,
  useDebugValue: () => T2,
  useEffect: () => y2,
  useErrorBoundary: () => q2,
  useImperativeHandle: () => s3,
  useLayoutEffect: () => d3,
  useMemo: () => _3,
  useReducer: () => p3,
  useRef: () => h3,
  useState: () => m3,
  version: () => nn
});
function C2(n3, t3) {
  for (var e3 in t3)
    n3[e3] = t3[e3];
  return n3;
}
function S2(n3, t3) {
  for (var e3 in n3)
    if (e3 !== "__source" && !(e3 in t3))
      return true;
  for (var r4 in t3)
    if (r4 !== "__source" && n3[r4] !== t3[r4])
      return true;
  return false;
}
function E(n3) {
  this.props = n3;
}
function g4(n3, t3) {
  function e3(n4) {
    var e4 = this.props.ref, r5 = e4 == n4.ref;
    return !r5 && e4 && (e4.call ? e4(null) : e4.current = null), t3 ? !t3(this.props, n4) || !r5 : S2(this.props, n4);
  }
  function r4(t4) {
    return this.shouldComponentUpdate = e3, v(n3, t4);
  }
  return r4.displayName = "Memo(" + (n3.displayName || n3.name) + ")", r4.prototype.isReactComponent = true, r4.__f = true, r4;
}
function x4(n3) {
  function t3(t4) {
    var e3 = C2({}, t4);
    return delete e3.ref, n3(e3, t4.ref || null);
  }
  return t3.$$typeof = R, t3.render = t3, t3.prototype.isReactComponent = t3.__f = true, t3.displayName = "ForwardRef(" + (n3.displayName || n3.name) + ")", t3;
}
function L2() {
  this.__u = 0, this.t = null, this.__b = null;
}
function U(n3) {
  var t3 = n3.__.__c;
  return t3 && t3.__e && t3.__e(n3);
}
function F2(n3) {
  var t3, e3, r4;
  function u4(u5) {
    if (t3 || (t3 = n3()).then(function(n4) {
      e3 = n4.default || n4;
    }, function(n4) {
      r4 = n4;
    }), r4)
      throw r4;
    if (!e3)
      throw t3;
    return v(e3, u5);
  }
  return u4.displayName = "Lazy", u4.__f = true, u4;
}
function M2() {
  this.u = null, this.o = null;
}
function D2(n3) {
  return this.getChildContext = function() {
    return n3.context;
  }, n3.children;
}
function I2(n3) {
  var t3 = this, e3 = n3.i;
  t3.componentWillUnmount = function() {
    S(null, t3.l), t3.l = null, t3.i = null;
  }, t3.i && t3.i !== e3 && t3.componentWillUnmount(), n3.__v ? (t3.l || (t3.i = e3, t3.l = { nodeType: 1, parentNode: e3, childNodes: [], appendChild: function(n4) {
    this.childNodes.push(n4), t3.i.appendChild(n4);
  }, insertBefore: function(n4, e4) {
    this.childNodes.push(n4), t3.i.appendChild(n4);
  }, removeChild: function(n4) {
    this.childNodes.splice(this.childNodes.indexOf(n4) >>> 1, 1), t3.i.removeChild(n4);
  } }), S(v(D2, { context: t3.context }, n3.__v), t3.l)) : t3.l && t3.componentWillUnmount();
}
function W(n3, t3) {
  return v(I2, { __v: n3, i: t3 });
}
function B2(n3, t3, e3) {
  return t3.__k == null && (t3.textContent = ""), S(n3, t3), typeof e3 == "function" && e3(), n3 ? n3.__c : null;
}
function $2(n3, t3, e3) {
  return q(n3, t3), typeof e3 == "function" && e3(), n3 ? n3.__c : null;
}
function Z() {
}
function Y() {
  return this.cancelBubble;
}
function q3() {
  return this.defaultPrevented;
}
function tn(n3) {
  return v.bind(null, n3);
}
function en(n3) {
  return !!n3 && n3.$$typeof === P2;
}
function rn(n3) {
  return en(n3) ? B.apply(null, arguments) : n3;
}
function un(n3) {
  return !!n3.__k && (S(null, n3), true);
}
function on(n3) {
  return n3 && (n3.base || n3.nodeType === 1 && n3) || null;
}
var w3, R, N2, k3, A3, O2, T3, P2, V, j3, z2, H2, G, J, K, Q, X, nn, ln, fn, cn, compat_module_default;
var init_compat_module = __esm({
  "../../node_modules/preact/compat/dist/compat.module.js"() {
    init_react_shim();
    init_hooks_module();
    init_hooks_module();
    init_preact_module();
    init_preact_module();
    (E.prototype = new _()).isPureReactComponent = true, E.prototype.shouldComponentUpdate = function(n3, t3) {
      return S2(this.props, n3) || S2(this.state, t3);
    };
    w3 = l.__b;
    l.__b = function(n3) {
      n3.type && n3.type.__f && n3.ref && (n3.props.ref = n3.ref, n3.ref = null), w3 && w3(n3);
    };
    R = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
    N2 = function(n3, t3) {
      return n3 == null ? null : A(A(n3).map(t3));
    };
    k3 = { map: N2, forEach: N2, count: function(n3) {
      return n3 ? A(n3).length : 0;
    }, only: function(n3) {
      var t3 = A(n3);
      if (t3.length !== 1)
        throw "Children.only";
      return t3[0];
    }, toArray: A };
    A3 = l.__e;
    l.__e = function(n3, t3, e3, r4) {
      if (n3.then) {
        for (var u4, o4 = t3; o4 = o4.__; )
          if ((u4 = o4.__c) && u4.__c)
            return t3.__e == null && (t3.__e = e3.__e, t3.__k = e3.__k), u4.__c(n3, t3);
      }
      A3(n3, t3, e3, r4);
    };
    O2 = l.unmount;
    l.unmount = function(n3) {
      var t3 = n3.__c;
      t3 && t3.__R && t3.__R(), t3 && n3.__h === true && (n3.type = null), O2 && O2(n3);
    }, (L2.prototype = new _()).__c = function(n3, t3) {
      var e3 = t3.__c, r4 = this;
      r4.t == null && (r4.t = []), r4.t.push(e3);
      var u4 = U(r4.__v), o4 = false, i4 = function() {
        o4 || (o4 = true, e3.__R = null, u4 ? u4(l4) : l4());
      };
      e3.__R = i4;
      var l4 = function() {
        if (!--r4.__u) {
          if (r4.state.__e) {
            var n4 = r4.state.__e;
            r4.__v.__k[0] = function n5(t5, e4, r5) {
              return t5 && (t5.__v = null, t5.__k = t5.__k && t5.__k.map(function(t6) {
                return n5(t6, e4, r5);
              }), t5.__c && t5.__c.__P === e4 && (t5.__e && r5.insertBefore(t5.__e, t5.__d), t5.__c.__e = true, t5.__c.__P = r5)), t5;
            }(n4, n4.__c.__P, n4.__c.__O);
          }
          var t4;
          for (r4.setState({ __e: r4.__b = null }); t4 = r4.t.pop(); )
            t4.forceUpdate();
        }
      }, f4 = t3.__h === true;
      r4.__u++ || f4 || r4.setState({ __e: r4.__b = r4.__v.__k[0] }), n3.then(i4, i4);
    }, L2.prototype.componentWillUnmount = function() {
      this.t = [];
    }, L2.prototype.render = function(n3, t3) {
      if (this.__b) {
        if (this.__v.__k) {
          var e3 = document.createElement("div"), r4 = this.__v.__k[0].__c;
          this.__v.__k[0] = function n4(t4, e4, r5) {
            return t4 && (t4.__c && t4.__c.__H && (t4.__c.__H.__.forEach(function(n5) {
              typeof n5.__c == "function" && n5.__c();
            }), t4.__c.__H = null), (t4 = C2({}, t4)).__c != null && (t4.__c.__P === r5 && (t4.__c.__P = e4), t4.__c = null), t4.__k = t4.__k && t4.__k.map(function(t5) {
              return n4(t5, e4, r5);
            })), t4;
          }(this.__b, e3, r4.__O = r4.__P);
        }
        this.__b = null;
      }
      var u4 = t3.__e && v(d, null, n3.fallback);
      return u4 && (u4.__h = null), [v(d, null, t3.__e ? null : n3.children), u4];
    };
    T3 = function(n3, t3, e3) {
      if (++e3[1] === e3[0] && n3.o.delete(t3), n3.props.revealOrder && (n3.props.revealOrder[0] !== "t" || !n3.o.size))
        for (e3 = n3.u; e3; ) {
          for (; e3.length > 3; )
            e3.pop()();
          if (e3[1] < e3[0])
            break;
          n3.u = e3 = e3[2];
        }
    };
    (M2.prototype = new _()).__e = function(n3) {
      var t3 = this, e3 = U(t3.__v), r4 = t3.o.get(n3);
      return r4[0]++, function(u4) {
        var o4 = function() {
          t3.props.revealOrder ? (r4.push(u4), T3(t3, n3, r4)) : u4();
        };
        e3 ? e3(o4) : o4();
      };
    }, M2.prototype.render = function(n3) {
      this.u = null, this.o = /* @__PURE__ */ new Map();
      var t3 = A(n3.children);
      n3.revealOrder && n3.revealOrder[0] === "b" && t3.reverse();
      for (var e3 = t3.length; e3--; )
        this.o.set(t3[e3], this.u = [1, 0, this.u]);
      return n3.children;
    }, M2.prototype.componentDidUpdate = M2.prototype.componentDidMount = function() {
      var n3 = this;
      this.o.forEach(function(t3, e3) {
        T3(n3, e3, t3);
      });
    };
    P2 = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.element") || 60103;
    V = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
    j3 = typeof document != "undefined";
    z2 = function(n3) {
      return (typeof Symbol != "undefined" && typeof Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(n3);
    };
    _.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n3) {
      Object.defineProperty(_.prototype, n3, { configurable: true, get: function() {
        return this["UNSAFE_" + n3];
      }, set: function(t3) {
        Object.defineProperty(this, n3, { configurable: true, writable: true, value: t3 });
      } });
    });
    H2 = l.event;
    l.event = function(n3) {
      return H2 && (n3 = H2(n3)), n3.persist = Z, n3.isPropagationStopped = Y, n3.isDefaultPrevented = q3, n3.nativeEvent = n3;
    };
    J = { configurable: true, get: function() {
      return this.class;
    } };
    K = l.vnode;
    l.vnode = function(n3) {
      var t3 = n3.type, e3 = n3.props, r4 = e3;
      if (typeof t3 == "string") {
        var u4 = t3.indexOf("-") === -1;
        for (var o4 in r4 = {}, e3) {
          var i4 = e3[o4];
          j3 && o4 === "children" && t3 === "noscript" || o4 === "value" && "defaultValue" in e3 && i4 == null || (o4 === "defaultValue" && "value" in e3 && e3.value == null ? o4 = "value" : o4 === "download" && i4 === true ? i4 = "" : /ondoubleclick/i.test(o4) ? o4 = "ondblclick" : /^onchange(textarea|input)/i.test(o4 + t3) && !z2(e3.type) ? o4 = "oninput" : /^onfocus$/i.test(o4) ? o4 = "onfocusin" : /^onblur$/i.test(o4) ? o4 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o4) ? o4 = o4.toLowerCase() : u4 && V.test(o4) ? o4 = o4.replace(/[A-Z0-9]/, "-$&").toLowerCase() : i4 === null && (i4 = void 0), r4[o4] = i4);
        }
        t3 == "select" && r4.multiple && Array.isArray(r4.value) && (r4.value = A(e3.children).forEach(function(n4) {
          n4.props.selected = r4.value.indexOf(n4.props.value) != -1;
        })), t3 == "select" && r4.defaultValue != null && (r4.value = A(e3.children).forEach(function(n4) {
          n4.props.selected = r4.multiple ? r4.defaultValue.indexOf(n4.props.value) != -1 : r4.defaultValue == n4.props.value;
        })), n3.props = r4, e3.class != e3.className && (J.enumerable = "className" in e3, e3.className != null && (r4.class = e3.className), Object.defineProperty(r4, "className", J));
      }
      n3.$$typeof = P2, K && K(n3);
    };
    Q = l.__r;
    l.__r = function(n3) {
      Q && Q(n3), G = n3.__c;
    };
    X = { ReactCurrentDispatcher: { current: { readContext: function(n3) {
      return G.__n[n3.__c].props.value;
    } } } };
    nn = "17.0.2";
    ln = function(n3, t3) {
      return n3(t3);
    };
    fn = function(n3, t3) {
      return n3(t3);
    };
    cn = d;
    compat_module_default = { useState: m3, useReducer: p3, useEffect: y2, useLayoutEffect: d3, useRef: h3, useImperativeHandle: s3, useMemo: _3, useCallback: A2, useContext: F, useDebugValue: T2, version: "17.0.2", Children: k3, render: B2, hydrate: $2, unmountComponentAtNode: un, createPortal: W, createElement: v, createContext: D, createFactory: tn, cloneElement: rn, createRef: p, Fragment: d, isValidElement: en, findDOMNode: on, Component: _, PureComponent: E, memo: g4, forwardRef: x4, flushSync: fn, unstable_batchedUpdates: ln, StrictMode: d, Suspense: L2, SuspenseList: M2, lazy: F2, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: X };
  }
});

export {
  __require,
  __esm,
  __commonJS,
  __export,
  __toESM,
  l,
  init_preact_module,
  $2 as $,
  dist_default,
  init_preact,
  init_react_shim
};
