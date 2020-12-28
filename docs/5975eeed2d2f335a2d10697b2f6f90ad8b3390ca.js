(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[1],{

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var t = Object.getOwnPropertySymbols,
    e = Object.prototype.hasOwnProperty,
    r = Object.prototype.propertyIsEnumerable;

var n,
    o,
    i = function () {
  try {
    if (!Object.assign) return !1;
    var t = new String("abc");
    if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;

    for (var e = {}, r = 0; r < 10; r++) {
      e["_" + String.fromCharCode(r)] = r;
    }

    if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
      return e[t];
    }).join("")) return !1;
    var n = {};
    return "abcdefghijklmnopqrst".split("").forEach(function (t) {
      n[t] = t;
    }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("");
  } catch (t) {
    return !1;
  }
}() ? Object.assign : function (n, o) {
  for (var i, a, u = function (t) {
    if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(t);
  }(n), c = 1; c < arguments.length; c++) {
    for (var l in i = Object(arguments[c])) {
      e.call(i, l) && (u[l] = i[l]);
    }

    if (t) {
      a = t(i);

      for (var f = 0; f < a.length; f++) {
        r.call(i, a[f]) && (u[a[f]] = i[a[f]]);
      }
    }
  }

  return u;
},
    a = function a(t, e) {
  e || (e = [0, ""]), t = String(t);
  var r = parseFloat(t, 10);
  return e[0] = r, e[1] = t.match(/[\d.\-\+]*\s*(.*)/)[1] || "", e;
},
    u = function u(t) {
  return a(t)[0];
},
    c = function c(t) {
  return null == t && (t = t), function (e, r, n, o) {
    null == n && (n = t), null == o && (o = n);
    var i = a(e)[1];
    if (i === r) return e;
    var c = u(e);
    if ("px" !== i) if ("em" === i) c = u(e) * u(n);else if ("rem" === i) c = u(e) * u(t);else {
      if ("ex" !== i) return e;
      c = u(e) * u(n) * 2;
    }
    var l = c;
    if ("px" !== r) if ("em" === r) l = c / u(o);else if ("rem" === r) l = c / u(t);else {
      if ("ex" !== r) return e;
      l = c / u(o) / 2;
    }
    return parseFloat(l.toFixed(5)) + r;
  };
},
    l = a,
    f = function f(t) {
  return l(t)[1];
},
    s = function s(t) {
  return l(t)[0];
},
    p = {
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  rhythmUnit: "rem",
  defaultRhythmBorderWidth: "1px",
  defaultRhythmBorderStyle: "solid",
  roundToNearestHalfLine: !0,
  minLinePadding: "2px"
},
    v = function v(t, e) {
  var r,
      n = c(e.baseFontSize),
      o = s(n(t, "px")),
      i = s(e.baseLineHeightInPx),
      a = s(n(e.minLinePadding, "px"));
  return (r = e.roundToNearestHalfLine ? Math.ceil(2 * o / i) / 2 : Math.ceil(o / i)) * i - o < 2 * a && (r += e.roundToNearestHalfLine ? .5 : 1), r;
},
    h = function h(t) {
  var e = c(t.baseFontSize);
  return function (r, n, o) {
    null == r && (r = 1), null == n && (n = t.baseFontSize), null == o && (o = 0);
    var i = r * s(t.baseLineHeightInPx) - o + "px",
        a = e(i, t.rhythmUnit, n);
    return "px" === f(a) && (a = Math.floor(s(a)) + f(a)), parseFloat(s(a).toFixed(5)) + f(a);
  };
},
    d = "[object Number]",
    b = Object.prototype.toString;

n = function n(t) {
  return "number" == typeof t || function (t) {
    return !!t && "object" == typeof t;
  }(t) && b.call(t) == d;
}, o = {
  "minor second": 16 / 15,
  "major second": 9 / 8,
  "minor third": 1.2,
  "major third": 4 / 3,
  "diminished fourth": Math.sqrt(2),
  "perfect fifth": 1.5,
  "minor sixth": 1.6,
  golden: 1.61803398875,
  phi: 1.61803398875,
  "major sixth": 5 / 3,
  "minor seventh": 16 / 9,
  "major seventh": 15 / 8,
  octave: 2,
  "major tenth": 2.5,
  "major eleventh": 8 / 3,
  "major twelfth": 3,
  "double octave": 4
};

function g(t) {
  return !isNaN(parseFloat(t)) && isFinite(t);
}

var y = function y(t, e, r) {
  if (void 0 === e && (e = 0), void 0 === r && (r = !1), "cool" === e ? e = 237 : "slate" === e ? e = 122 : "warm" === e && (e = 69), !g(e)) throw new Error("Hue is not a number");
  if (!g(t)) throw new Error("Lightness is not a number");
  t > 100 && (t = 100), t < 0 && (t = 0);
  var n = 0;

  if (0 !== e) {
    n = 19.92978 + -.3651759 * t + .001737214 * Math.pow(t, 2);
  }

  var o = 0;
  return r ? (o = t / 100, t = "100%,") : (o = (100 - t) / 100, t = "0%,"), "hsla(" + e + "," + n + "%," + t + o + ")";
},
    m = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

function j(t, e) {
  return t(e = {
    exports: {}
  }, e.exports), e.exports;
}

var _ = "object" == typeof m && m && m.Object === Object && m,
    w = "object" == typeof self && self && self.Object === Object && self,
    O = _ || w || Function("return this")(),
    S = O.Symbol,
    x = Object.prototype,
    z = x.hasOwnProperty,
    F = x.toString,
    k = S ? S.toStringTag : void 0;

var A = function A(t) {
  var e = z.call(t, k),
      r = t[k];

  try {
    t[k] = void 0;
    var n = !0;
  } catch (t) {}

  var o = F.call(t);
  return n && (e ? t[k] = r : delete t[k]), o;
},
    L = Object.prototype.toString;

var B = function B(t) {
  return L.call(t);
},
    P = "[object Null]",
    T = "[object Undefined]",
    M = S ? S.toStringTag : void 0;

var E = function E(t) {
  return null == t ? void 0 === t ? T : P : M && M in Object(t) ? A(t) : B(t);
};

var H = function H(t) {
  var e = typeof t;
  return null != t && ("object" == e || "function" == e);
},
    N = "[object AsyncFunction]",
    W = "[object Function]",
    C = "[object GeneratorFunction]",
    I = "[object Proxy]";

var R,
    $ = function $(t) {
  if (!H(t)) return !1;
  var e = E(t);
  return e == W || e == C || e == N || e == I;
},
    U = O["__core-js_shared__"],
    D = (R = /[^.]+$/.exec(U && U.keys && U.keys.IE_PROTO || "")) ? "Symbol(src)_1." + R : "";

var q = function q(t) {
  return !!D && D in t;
},
    V = Function.prototype.toString;

var J = function J(t) {
  if (null != t) {
    try {
      return V.call(t);
    } catch (t) {}

    try {
      return t + "";
    } catch (t) {}
  }

  return "";
},
    Z = /^\[object .+?Constructor\]$/,
    G = Function.prototype,
    K = Object.prototype,
    Y = RegExp("^" + G.toString.call(K.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

var Q = function Q(t) {
  return !(!H(t) || q(t)) && ($(t) ? Y : Z).test(J(t));
};

var X = function X(t, e) {
  return null == t ? void 0 : t[e];
};

var tt = function tt(t, e) {
  var r = X(t, e);
  return Q(r) ? r : void 0;
},
    et = function () {
  try {
    var t = tt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch (t) {}
}();

var rt = function rt(t, e, r) {
  "__proto__" == e && et ? et(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
};

var nt = function nt(t, e) {
  return t === e || t != t && e != e;
},
    ot = Object.prototype.hasOwnProperty;

var it = function it(t, e, r) {
  var n = t[e];
  ot.call(t, e) && nt(n, r) && (void 0 !== r || e in t) || rt(t, e, r);
},
    at = Array.isArray;

var ut = function ut(t) {
  return null != t && "object" == typeof t;
},
    ct = "[object Symbol]";

var lt = function lt(t) {
  return "symbol" == typeof t || ut(t) && E(t) == ct;
},
    ft = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    st = /^\w*$/;

var pt = function pt(t, e) {
  if (at(t)) return !1;
  var r = typeof t;
  return !("number" != r && "symbol" != r && "boolean" != r && null != t && !lt(t)) || st.test(t) || !ft.test(t) || null != e && t in Object(e);
},
    vt = tt(Object, "create");

var ht = function ht(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
},
    dt = "__lodash_hash_undefined__",
    bt = Object.prototype.hasOwnProperty;

var gt = function gt(t) {
  var e = this.__data__;

  if (vt) {
    var r = e[t];
    return r === dt ? void 0 : r;
  }

  return bt.call(e, t) ? e[t] : void 0;
},
    yt = Object.prototype.hasOwnProperty;

var mt = function mt(t) {
  var e = this.__data__;
  return vt ? void 0 !== e[t] : yt.call(e, t);
},
    jt = "__lodash_hash_undefined__";

var _t = function _t(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = vt && void 0 === e ? jt : e, this;
};

function wt(t) {
  var e = -1,
      r = null == t ? 0 : t.length;

  for (this.clear(); ++e < r;) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}

wt.prototype.clear = function () {
  this.__data__ = vt ? vt(null) : {}, this.size = 0;
}, wt.prototype.delete = ht, wt.prototype.get = gt, wt.prototype.has = mt, wt.prototype.set = _t;
var Ot = wt;

var St = function St(t, e) {
  for (var r = t.length; r--;) {
    if (nt(t[r][0], e)) return r;
  }

  return -1;
},
    xt = Array.prototype.splice;

var zt = function zt(t) {
  var e = this.__data__,
      r = St(e, t);
  return !(r < 0 || (r == e.length - 1 ? e.pop() : xt.call(e, r, 1), --this.size, 0));
};

var Ft = function Ft(t) {
  var e = this.__data__,
      r = St(e, t);
  return r < 0 ? void 0 : e[r][1];
};

var kt = function kt(t) {
  return St(this.__data__, t) > -1;
};

var At = function At(t, e) {
  var r = this.__data__,
      n = St(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
};

function Lt(t) {
  var e = -1,
      r = null == t ? 0 : t.length;

  for (this.clear(); ++e < r;) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}

Lt.prototype.clear = function () {
  this.__data__ = [], this.size = 0;
}, Lt.prototype.delete = zt, Lt.prototype.get = Ft, Lt.prototype.has = kt, Lt.prototype.set = At;
var Bt = Lt,
    Pt = tt(O, "Map");

var Tt = function Tt(t) {
  var e = typeof t;
  return "string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t;
};

var Mt = function Mt(t, e) {
  var r = t.__data__;
  return Tt(e) ? r["string" == typeof e ? "string" : "hash"] : r.map;
};

var Et = function Et(t) {
  var e = Mt(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
};

var Ht = function Ht(t) {
  return Mt(this, t).get(t);
};

var Nt = function Nt(t) {
  return Mt(this, t).has(t);
};

var Wt = function Wt(t, e) {
  var r = Mt(this, t),
      n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
};

function Ct(t) {
  var e = -1,
      r = null == t ? 0 : t.length;

  for (this.clear(); ++e < r;) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}

Ct.prototype.clear = function () {
  this.size = 0, this.__data__ = {
    hash: new Ot(),
    map: new (Pt || Bt)(),
    string: new Ot()
  };
}, Ct.prototype.delete = Et, Ct.prototype.get = Ht, Ct.prototype.has = Nt, Ct.prototype.set = Wt;
var It = Ct,
    Rt = "Expected a function";

function $t(t, e) {
  if ("function" != typeof t || null != e && "function" != typeof e) throw new TypeError(Rt);

  var r = function r() {
    var n = arguments,
        o = e ? e.apply(this, n) : n[0],
        i = r.cache;
    if (i.has(o)) return i.get(o);
    var a = t.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };

  return r.cache = new ($t.Cache || It)(), r;
}

$t.Cache = It;
var Ut = $t,
    Dt = 500;

var qt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    Vt = /\\(\\)?/g,
    Jt = function (t) {
  var e = Ut(t, function (t) {
    return r.size === Dt && r.clear(), t;
  }),
      r = e.cache;
  return e;
}(function (t) {
  var e = [];
  return 46 === t.charCodeAt(0) && e.push(""), t.replace(qt, function (t, r, n, o) {
    e.push(n ? o.replace(Vt, "$1") : r || t);
  }), e;
});

var Zt = function Zt(t, e) {
  for (var r = -1, n = null == t ? 0 : t.length, o = Array(n); ++r < n;) {
    o[r] = e(t[r], r, t);
  }

  return o;
},
    Gt = 1 / 0,
    Kt = S ? S.prototype : void 0,
    Yt = Kt ? Kt.toString : void 0;

var Qt = function t(e) {
  if ("string" == typeof e) return e;
  if (at(e)) return Zt(e, t) + "";
  if (lt(e)) return Yt ? Yt.call(e) : "";
  var r = e + "";
  return "0" == r && 1 / e == -Gt ? "-0" : r;
};

var Xt = function Xt(t) {
  return null == t ? "" : Qt(t);
};

var te = function te(t, e) {
  return at(t) ? t : pt(t, e) ? [t] : Jt(Xt(t));
},
    ee = 9007199254740991,
    re = /^(?:0|[1-9]\d*)$/;

var ne = function ne(t, e) {
  var r = typeof t;
  return !!(e = null == e ? ee : e) && ("number" == r || "symbol" != r && re.test(t)) && t > -1 && t % 1 == 0 && t < e;
},
    oe = 1 / 0;

var ie = function ie(t) {
  if ("string" == typeof t || lt(t)) return t;
  var e = t + "";
  return "0" == e && 1 / t == -oe ? "-0" : e;
};

var ae = function ae(t, e, r, n) {
  if (!H(t)) return t;

  for (var o = -1, i = (e = te(e, t)).length, a = i - 1, u = t; null != u && ++o < i;) {
    var c = ie(e[o]),
        l = r;

    if (o != a) {
      var f = u[c];
      void 0 === (l = n ? n(f, c, u) : void 0) && (l = H(f) ? f : ne(e[o + 1]) ? [] : {});
    }

    it(u, c, l), u = u[c];
  }

  return t;
};

var ue = function ue(t, e, r) {
  return null == t ? t : ae(t, e, r);
};

var ce = function ce(t, e) {
  for (var r = -1, n = null == t ? 0 : t.length; ++r < n && !1 !== e(t[r], r, t);) {
    ;
  }

  return t;
};

var le = function (t) {
  return function (e, r, n) {
    for (var o = -1, i = Object(e), a = n(e), u = a.length; u--;) {
      var c = a[t ? u : ++o];
      if (!1 === r(i[c], c, i)) break;
    }

    return e;
  };
}();

var fe = function fe(t, e) {
  for (var r = -1, n = Array(t); ++r < t;) {
    n[r] = e(r);
  }

  return n;
},
    se = "[object Arguments]";

var pe = function pe(t) {
  return ut(t) && E(t) == se;
},
    ve = Object.prototype,
    he = ve.hasOwnProperty,
    de = ve.propertyIsEnumerable,
    be = pe(function () {
  return arguments;
}()) ? pe : function (t) {
  return ut(t) && he.call(t, "callee") && !de.call(t, "callee");
};

var ge = function ge() {
  return !1;
},
    ye = j(function (t, e) {
  var r = e && !e.nodeType && e,
      n = r && t && !t.nodeType && t,
      o = n && n.exports === r ? O.Buffer : void 0;
  t.exports = (o ? o.isBuffer : void 0) || ge;
}),
    me = 9007199254740991;

var je = function je(t) {
  return "number" == typeof t && t > -1 && t % 1 == 0 && t <= me;
},
    _e = {};

_e["[object Float32Array]"] = _e["[object Float64Array]"] = _e["[object Int8Array]"] = _e["[object Int16Array]"] = _e["[object Int32Array]"] = _e["[object Uint8Array]"] = _e["[object Uint8ClampedArray]"] = _e["[object Uint16Array]"] = _e["[object Uint32Array]"] = !0, _e["[object Arguments]"] = _e["[object Array]"] = _e["[object ArrayBuffer]"] = _e["[object Boolean]"] = _e["[object DataView]"] = _e["[object Date]"] = _e["[object Error]"] = _e["[object Function]"] = _e["[object Map]"] = _e["[object Number]"] = _e["[object Object]"] = _e["[object RegExp]"] = _e["[object Set]"] = _e["[object String]"] = _e["[object WeakMap]"] = !1;

var we = function we(t) {
  return ut(t) && je(t.length) && !!_e[E(t)];
};

var Oe = function Oe(t) {
  return function (e) {
    return t(e);
  };
},
    Se = j(function (t, e) {
  var r = e && !e.nodeType && e,
      n = r && t && !t.nodeType && t,
      o = n && n.exports === r && _.process,
      i = function () {
    try {
      var t = n && n.require && n.require("util").types;

      return t || o && o.binding && o.binding("util");
    } catch (t) {}
  }();

  t.exports = i;
}),
    xe = Se && Se.isTypedArray,
    ze = xe ? Oe(xe) : we,
    Fe = Object.prototype.hasOwnProperty;

var ke = function ke(t, e) {
  var r = at(t),
      n = !r && be(t),
      o = !r && !n && ye(t),
      i = !r && !n && !o && ze(t),
      a = r || n || o || i,
      u = a ? fe(t.length, String) : [],
      c = u.length;

  for (var l in t) {
    !e && !Fe.call(t, l) || a && ("length" == l || o && ("offset" == l || "parent" == l) || i && ("buffer" == l || "byteLength" == l || "byteOffset" == l) || ne(l, c)) || u.push(l);
  }

  return u;
},
    Ae = Object.prototype;

var Le = function Le(t) {
  var e = t && t.constructor;
  return t === ("function" == typeof e && e.prototype || Ae);
};

var Be = function Be(t, e) {
  return function (r) {
    return t(e(r));
  };
},
    Pe = Be(Object.keys, Object),
    Te = Object.prototype.hasOwnProperty;

var Me = function Me(t) {
  if (!Le(t)) return Pe(t);
  var e = [];

  for (var r in Object(t)) {
    Te.call(t, r) && "constructor" != r && e.push(r);
  }

  return e;
};

var Ee = function Ee(t) {
  return null != t && je(t.length) && !$(t);
};

var He = function He(t) {
  return Ee(t) ? ke(t) : Me(t);
};

var Ne = function (t, e) {
  return function (r, n) {
    if (null == r) return r;
    if (!Ee(r)) return t(r, n);

    for (var o = r.length, i = e ? o : -1, a = Object(r); (e ? i-- : ++i < o) && !1 !== n(a[i], i, a);) {
      ;
    }

    return r;
  };
}(function (t, e) {
  return t && le(t, e, He);
});

var We = function We(t) {
  return t;
};

var Ce = function Ce(t) {
  return "function" == typeof t ? t : We;
};

var Ie = function Ie(t, e) {
  return (at(t) ? ce : Ne)(t, Ce(e));
},
    Re = "[object Number]";

var $e = function $e(t) {
  return "number" == typeof t || ut(t) && E(t) == Re;
},
    Ue = "[object String]";

var De = function De(t) {
  return "string" == typeof t || !at(t) && ut(t) && E(t) == Ue;
};

var qe = function qe(t) {
  var e = this.__data__,
      r = e.delete(t);
  return this.size = e.size, r;
};

var Ve = function Ve(t) {
  return this.__data__.get(t);
};

var Je = function Je(t) {
  return this.__data__.has(t);
},
    Ze = 200;

var Ge = function Ge(t, e) {
  var r = this.__data__;

  if (r instanceof Bt) {
    var n = r.__data__;
    if (!Pt || n.length < Ze - 1) return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new It(n);
  }

  return r.set(t, e), this.size = r.size, this;
};

function Ke(t) {
  var e = this.__data__ = new Bt(t);
  this.size = e.size;
}

Ke.prototype.clear = function () {
  this.__data__ = new Bt(), this.size = 0;
}, Ke.prototype.delete = qe, Ke.prototype.get = Ve, Ke.prototype.has = Je, Ke.prototype.set = Ge;
var Ye = Ke;

var Qe = function Qe(t, e, r) {
  (void 0 === r || nt(t[e], r)) && (void 0 !== r || e in t) || rt(t, e, r);
},
    Xe = j(function (t, e) {
  var r = e && !e.nodeType && e,
      n = r && t && !t.nodeType && t,
      o = n && n.exports === r ? O.Buffer : void 0,
      i = o ? o.allocUnsafe : void 0;

  t.exports = function (t, e) {
    if (e) return t.slice();
    var r = t.length,
        n = i ? i(r) : new t.constructor(r);
    return t.copy(n), n;
  };
}),
    tr = O.Uint8Array;

var er = function er(t) {
  var e = new t.constructor(t.byteLength);
  return new tr(e).set(new tr(t)), e;
};

var rr = function rr(t, e) {
  var r = e ? er(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
};

var nr = function nr(t, e) {
  var r = -1,
      n = t.length;

  for (e || (e = Array(n)); ++r < n;) {
    e[r] = t[r];
  }

  return e;
},
    or = Object.create,
    ir = function () {
  function t() {}

  return function (e) {
    if (!H(e)) return {};
    if (or) return or(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}(),
    ar = Be(Object.getPrototypeOf, Object);

var ur = function ur(t) {
  return "function" != typeof t.constructor || Le(t) ? {} : ir(ar(t));
};

var cr = function cr(t) {
  return ut(t) && Ee(t);
},
    lr = "[object Object]",
    fr = Function.prototype,
    sr = Object.prototype,
    pr = fr.toString,
    vr = sr.hasOwnProperty,
    hr = pr.call(Object);

var dr = function dr(t) {
  if (!ut(t) || E(t) != lr) return !1;
  var e = ar(t);
  if (null === e) return !0;
  var r = vr.call(e, "constructor") && e.constructor;
  return "function" == typeof r && r instanceof r && pr.call(r) == hr;
};

var br = function br(t, e) {
  return "__proto__" == e ? void 0 : t[e];
};

var gr = function gr(t, e, r, n) {
  var o = !r;
  r || (r = {});

  for (var i = -1, a = e.length; ++i < a;) {
    var u = e[i],
        c = n ? n(r[u], t[u], u, r, t) : void 0;
    void 0 === c && (c = t[u]), o ? rt(r, u, c) : it(r, u, c);
  }

  return r;
};

var yr = function yr(t) {
  var e = [];
  if (null != t) for (var r in Object(t)) {
    e.push(r);
  }
  return e;
},
    mr = Object.prototype.hasOwnProperty;

var jr = function jr(t) {
  if (!H(t)) return yr(t);
  var e = Le(t),
      r = [];

  for (var n in t) {
    ("constructor" != n || !e && mr.call(t, n)) && r.push(n);
  }

  return r;
};

var _r = function _r(t) {
  return Ee(t) ? ke(t, !0) : jr(t);
};

var wr = function wr(t) {
  return gr(t, _r(t));
};

var Or = function Or(t, e, r, n, o, i, a) {
  var u = br(t, r),
      c = br(e, r),
      l = a.get(c);
  if (l) Qe(t, r, l);else {
    var f = i ? i(u, c, r + "", t, e, a) : void 0,
        s = void 0 === f;

    if (s) {
      var p = at(c),
          v = !p && ye(c),
          h = !p && !v && ze(c);
      f = c, p || v || h ? at(u) ? f = u : cr(u) ? f = nr(u) : v ? (s = !1, f = Xe(c, !0)) : h ? (s = !1, f = rr(c, !0)) : f = [] : dr(c) || be(c) ? (f = u, be(u) ? f = wr(u) : (!H(u) || n && $(u)) && (f = ur(c))) : s = !1;
    }

    s && (a.set(c, f), o(f, c, n, i, a), a.delete(c)), Qe(t, r, f);
  }
};

var Sr = function t(e, r, n, o, i) {
  e !== r && le(r, function (a, u) {
    if (H(a)) i || (i = new Ye()), Or(e, r, u, n, t, o, i);else {
      var c = o ? o(br(e, u), a, u + "", e, r, i) : void 0;
      void 0 === c && (c = a), Qe(e, u, c);
    }
  }, _r);
};

var xr = function xr(t, e, r) {
  switch (r.length) {
    case 0:
      return t.call(e);

    case 1:
      return t.call(e, r[0]);

    case 2:
      return t.call(e, r[0], r[1]);

    case 3:
      return t.call(e, r[0], r[1], r[2]);
  }

  return t.apply(e, r);
},
    zr = Math.max;

var Fr = function Fr(t, e, r) {
  return e = zr(void 0 === e ? t.length - 1 : e, 0), function () {
    for (var n = arguments, o = -1, i = zr(n.length - e, 0), a = Array(i); ++o < i;) {
      a[o] = n[e + o];
    }

    o = -1;

    for (var u = Array(e + 1); ++o < e;) {
      u[o] = n[o];
    }

    return u[e] = r(a), xr(t, this, u);
  };
};

var kr = function kr(t) {
  return function () {
    return t;
  };
},
    Ar = 800,
    Lr = 16,
    Br = Date.now;

var Pr = function (t) {
  var e = 0,
      r = 0;
  return function () {
    var n = Br(),
        o = Lr - (n - r);

    if (r = n, o > 0) {
      if (++e >= Ar) return arguments[0];
    } else e = 0;

    return t.apply(void 0, arguments);
  };
}(et ? function (t, e) {
  return et(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: kr(e),
    writable: !0
  });
} : We);

var Tr = function Tr(t, e) {
  return Pr(Fr(t, e, We), t + "");
};

var Mr = function Mr(t, e, r) {
  if (!H(r)) return !1;
  var n = typeof e;
  return !!("number" == n ? Ee(r) && ne(e, r.length) : "string" == n && e in r) && nt(r[e], t);
};

var Er = function (t) {
  return Tr(function (e, r) {
    var n = -1,
        o = r.length,
        i = o > 1 ? r[o - 1] : void 0,
        a = o > 2 ? r[2] : void 0;

    for (i = t.length > 3 && "function" == typeof i ? (o--, i) : void 0, a && Mr(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), e = Object(e); ++n < o;) {
      var u = r[n];
      u && t(e, u, n, i);
    }

    return e;
  });
}(function (t, e, r) {
  Sr(t, e, r);
});

var Hr = function Hr(t, e, r, n) {
  var o = -1,
      i = null == t ? 0 : t.length;

  for (n && i && (r = t[++o]); ++o < i;) {
    r = e(r, t[o], o, t);
  }

  return r;
},
    Nr = "__lodash_hash_undefined__";

var Wr = function Wr(t) {
  return this.__data__.has(t);
};

function Cr(t) {
  var e = -1,
      r = null == t ? 0 : t.length;

  for (this.__data__ = new It(); ++e < r;) {
    this.add(t[e]);
  }
}

Cr.prototype.add = Cr.prototype.push = function (t) {
  return this.__data__.set(t, Nr), this;
}, Cr.prototype.has = Wr;
var Ir = Cr;

var Rr = function Rr(t, e) {
  for (var r = -1, n = null == t ? 0 : t.length; ++r < n;) {
    if (e(t[r], r, t)) return !0;
  }

  return !1;
};

var $r = function $r(t, e) {
  return t.has(e);
},
    Ur = 1,
    Dr = 2;

var qr = function qr(t, e, r, n, o, i) {
  var a = r & Ur,
      u = t.length,
      c = e.length;
  if (u != c && !(a && c > u)) return !1;
  var l = i.get(t);
  if (l && i.get(e)) return l == e;
  var f = -1,
      s = !0,
      p = r & Dr ? new Ir() : void 0;

  for (i.set(t, e), i.set(e, t); ++f < u;) {
    var v = t[f],
        h = e[f];
    if (n) var d = a ? n(h, v, f, e, t, i) : n(v, h, f, t, e, i);

    if (void 0 !== d) {
      if (d) continue;
      s = !1;
      break;
    }

    if (p) {
      if (!Rr(e, function (t, e) {
        if (!$r(p, e) && (v === t || o(v, t, r, n, i))) return p.push(e);
      })) {
        s = !1;
        break;
      }
    } else if (v !== h && !o(v, h, r, n, i)) {
      s = !1;
      break;
    }
  }

  return i.delete(t), i.delete(e), s;
};

var Vr = function Vr(t) {
  var e = -1,
      r = Array(t.size);
  return t.forEach(function (t, n) {
    r[++e] = [n, t];
  }), r;
};

var Jr = function Jr(t) {
  var e = -1,
      r = Array(t.size);
  return t.forEach(function (t) {
    r[++e] = t;
  }), r;
},
    Zr = 1,
    Gr = 2,
    Kr = "[object Boolean]",
    Yr = "[object Date]",
    Qr = "[object Error]",
    Xr = "[object Map]",
    tn = "[object Number]",
    en = "[object RegExp]",
    rn = "[object Set]",
    nn = "[object String]",
    on = "[object Symbol]",
    an = "[object ArrayBuffer]",
    un = "[object DataView]",
    cn = S ? S.prototype : void 0,
    ln = cn ? cn.valueOf : void 0;

var fn = function fn(t, e, r, n, o, i, a) {
  switch (r) {
    case un:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
      t = t.buffer, e = e.buffer;

    case an:
      return !(t.byteLength != e.byteLength || !i(new tr(t), new tr(e)));

    case Kr:
    case Yr:
    case tn:
      return nt(+t, +e);

    case Qr:
      return t.name == e.name && t.message == e.message;

    case en:
    case nn:
      return t == e + "";

    case Xr:
      var u = Vr;

    case rn:
      if (u || (u = Jr), t.size != e.size && !(n & Zr)) return !1;
      var c = a.get(t);
      if (c) return c == e;
      n |= Gr, a.set(t, e);
      var l = qr(u(t), u(e), n, o, i, a);
      return a.delete(t), l;

    case on:
      if (ln) return ln.call(t) == ln.call(e);
  }

  return !1;
};

var sn = function sn(t, e) {
  for (var r = -1, n = e.length, o = t.length; ++r < n;) {
    t[o + r] = e[r];
  }

  return t;
};

var pn = function pn(t, e, r) {
  var n = e(t);
  return at(t) ? n : sn(n, r(t));
};

var vn = function vn(t, e) {
  for (var r = -1, n = null == t ? 0 : t.length, o = 0, i = []; ++r < n;) {
    var a = t[r];
    e(a, r, t) && (i[o++] = a);
  }

  return i;
};

var hn = Object.prototype.propertyIsEnumerable,
    dn = Object.getOwnPropertySymbols,
    bn = dn ? function (t) {
  return null == t ? [] : (t = Object(t), vn(dn(t), function (e) {
    return hn.call(t, e);
  }));
} : function () {
  return [];
};

var gn = function gn(t) {
  return pn(t, He, bn);
},
    yn = 1,
    mn = Object.prototype.hasOwnProperty;

var jn = function jn(t, e, r, n, o, i) {
  var a = r & yn,
      u = gn(t),
      c = u.length;
  if (c != gn(e).length && !a) return !1;

  for (var l = c; l--;) {
    var f = u[l];
    if (!(a ? f in e : mn.call(e, f))) return !1;
  }

  var s = i.get(t);
  if (s && i.get(e)) return s == e;
  var p = !0;
  i.set(t, e), i.set(e, t);

  for (var v = a; ++l < c;) {
    var h = t[f = u[l]],
        d = e[f];
    if (n) var b = a ? n(d, h, f, e, t, i) : n(h, d, f, t, e, i);

    if (!(void 0 === b ? h === d || o(h, d, r, n, i) : b)) {
      p = !1;
      break;
    }

    v || (v = "constructor" == f);
  }

  if (p && !v) {
    var g = t.constructor,
        y = e.constructor;
    g != y && "constructor" in t && "constructor" in e && !("function" == typeof g && g instanceof g && "function" == typeof y && y instanceof y) && (p = !1);
  }

  return i.delete(t), i.delete(e), p;
},
    _n = tt(O, "DataView"),
    wn = tt(O, "Promise"),
    On = tt(O, "Set"),
    Sn = tt(O, "WeakMap"),
    xn = J(_n),
    zn = J(Pt),
    Fn = J(wn),
    kn = J(On),
    An = J(Sn),
    Ln = E;

(_n && "[object DataView]" != Ln(new _n(new ArrayBuffer(1))) || Pt && "[object Map]" != Ln(new Pt()) || wn && "[object Promise]" != Ln(wn.resolve()) || On && "[object Set]" != Ln(new On()) || Sn && "[object WeakMap]" != Ln(new Sn())) && (Ln = function Ln(t) {
  var e = E(t),
      r = "[object Object]" == e ? t.constructor : void 0,
      n = r ? J(r) : "";
  if (n) switch (n) {
    case xn:
      return "[object DataView]";

    case zn:
      return "[object Map]";

    case Fn:
      return "[object Promise]";

    case kn:
      return "[object Set]";

    case An:
      return "[object WeakMap]";
  }
  return e;
});
var Bn = Ln,
    Pn = 1,
    Tn = "[object Arguments]",
    Mn = "[object Array]",
    En = "[object Object]",
    Hn = Object.prototype.hasOwnProperty;

var Nn = function Nn(t, e, r, n, o, i) {
  var a = at(t),
      u = at(e),
      c = a ? Mn : Bn(t),
      l = u ? Mn : Bn(e),
      f = (c = c == Tn ? En : c) == En,
      s = (l = l == Tn ? En : l) == En,
      p = c == l;

  if (p && ye(t)) {
    if (!ye(e)) return !1;
    a = !0, f = !1;
  }

  if (p && !f) return i || (i = new Ye()), a || ze(t) ? qr(t, e, r, n, o, i) : fn(t, e, c, r, n, o, i);

  if (!(r & Pn)) {
    var v = f && Hn.call(t, "__wrapped__"),
        h = s && Hn.call(e, "__wrapped__");

    if (v || h) {
      var d = v ? t.value() : t,
          b = h ? e.value() : e;
      return i || (i = new Ye()), o(d, b, r, n, i);
    }
  }

  return !!p && (i || (i = new Ye()), jn(t, e, r, n, o, i));
};

var Wn = function t(e, r, n, o, i) {
  return e === r || (null == e || null == r || !ut(e) && !ut(r) ? e != e && r != r : Nn(e, r, n, o, t, i));
},
    Cn = 1,
    In = 2;

var Rn = function Rn(t, e, r, n) {
  var o = r.length,
      i = o,
      a = !n;
  if (null == t) return !i;

  for (t = Object(t); o--;) {
    var u = r[o];
    if (a && u[2] ? u[1] !== t[u[0]] : !(u[0] in t)) return !1;
  }

  for (; ++o < i;) {
    var c = (u = r[o])[0],
        l = t[c],
        f = u[1];

    if (a && u[2]) {
      if (void 0 === l && !(c in t)) return !1;
    } else {
      var s = new Ye();
      if (n) var p = n(l, f, c, t, e, s);
      if (!(void 0 === p ? Wn(f, l, Cn | In, n, s) : p)) return !1;
    }
  }

  return !0;
};

var $n = function $n(t) {
  return t == t && !H(t);
};

var Un = function Un(t) {
  for (var e = He(t), r = e.length; r--;) {
    var n = e[r],
        o = t[n];
    e[r] = [n, o, $n(o)];
  }

  return e;
};

var Dn = function Dn(t, e) {
  return function (r) {
    return null != r && r[t] === e && (void 0 !== e || t in Object(r));
  };
};

var qn = function qn(t) {
  var e = Un(t);
  return 1 == e.length && e[0][2] ? Dn(e[0][0], e[0][1]) : function (r) {
    return r === t || Rn(r, t, e);
  };
};

var Vn = function Vn(t, e) {
  for (var r = 0, n = (e = te(e, t)).length; null != t && r < n;) {
    t = t[ie(e[r++])];
  }

  return r && r == n ? t : void 0;
};

var Jn = function Jn(t, e, r) {
  var n = null == t ? void 0 : Vn(t, e);
  return void 0 === n ? r : n;
};

var Zn = function Zn(t, e) {
  return null != t && e in Object(t);
};

var Gn = function Gn(t, e, r) {
  for (var n = -1, o = (e = te(e, t)).length, i = !1; ++n < o;) {
    var a = ie(e[n]);
    if (!(i = null != t && r(t, a))) break;
    t = t[a];
  }

  return i || ++n != o ? i : !!(o = null == t ? 0 : t.length) && je(o) && ne(a, o) && (at(t) || be(t));
};

var Kn = function Kn(t, e) {
  return null != t && Gn(t, e, Zn);
},
    Yn = 1,
    Qn = 2;

var Xn = function Xn(t, e) {
  return pt(t) && $n(e) ? Dn(ie(t), e) : function (r) {
    var n = Jn(r, t);
    return void 0 === n && n === e ? Kn(r, t) : Wn(e, n, Yn | Qn);
  };
};

var to = function to(t) {
  return function (e) {
    return null == e ? void 0 : e[t];
  };
};

var eo = function eo(t) {
  return function (e) {
    return Vn(e, t);
  };
};

var ro = function ro(t) {
  return pt(t) ? to(ie(t)) : eo(t);
};

var no = function no(t) {
  return "function" == typeof t ? t : null == t ? We : "object" == typeof t ? at(t) ? Xn(t[0], t[1]) : qn(t) : ro(t);
};

var oo = function oo(t, e, r, n, o) {
  return o(t, function (t, o, i) {
    r = n ? (n = !1, t) : e(r, t, o, i);
  }), r;
};

var io = function io(t, e, r) {
  var n = at(t) ? Hr : oo,
      o = arguments.length < 3;
  return n(t, no(e, 4), r, o, Ne);
},
    ao = function ao(t, e, r) {
  var n;
  return void 0 === t && (t = {}), n = at(e) ? e : [e], Ie(n, function (e) {
    Ie(r, function (r, n) {
      ue(t, e + "." + n, r);
    });
  }), t;
},
    uo = ["inherit", "default", "serif", "sans-serif", "monospace", "fantasy", "cursive", "-apple-system"],
    co = function co(t) {
  return -1 !== uo.indexOf(t) ? t : "'" + t + "'";
};

var lo,
    fo = j(function (t, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = "html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,optgroup,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}";
}),
    so = (lo = fo) && lo.__esModule && Object.prototype.hasOwnProperty.call(lo, "default") ? lo.default : lo,
    po = function po(t) {
  return io(t, function (t, e, r) {
    return t += r + "{", Ie(e, function (e, r) {
      if (H(e)) {
        var n = {};
        n[r] = e, t += po(n);
      } else {
        var o = function (t, e) {
          if ("string" != typeof t) throw new TypeError("Expected a string");
          return t.replace(/([a-z\d])([A-Z])/g, "$1" + (e = void 0 === e ? "_" : e) + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + e + "$2").toLowerCase();
        }(r, "-") + ":" + e + ";";

        ["Webkit", "ms", "Moz", "O"].forEach(function (t) {
          r.slice(0, t.length) === t && (o = "-" + o);
        }), t += o;
      }
    }), t += "}";
  }, "");
};

module.exports = function (t) {
  var e,
      r,
      a,
      u,
      l = i({}, {
    baseFontSize: "16px",
    baseLineHeight: 1.45,
    headerLineHeight: 1.1,
    scaleRatio: 2,
    googleFonts: [],
    headerFontFamily: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"],
    bodyFontFamily: ["georgia", "serif"],
    headerColor: "inherit",
    bodyColor: "hsla(0,0%,0%,0.8)",
    headerWeight: "bold",
    bodyWeight: "normal",
    boldWeight: "bold",
    includeNormalize: !0,
    blockMarginBottom: 1
  }, t),
      d = (e = l, r = JSON.parse(JSON.stringify(p)), a = Object.assign({}, r, e), u = c(a.baseFontSize), f(a.baseLineHeight) ? (s(u(a.baseFontSize, "px")), a.baseLineHeightInPx = u(a.baseLineHeight, "px")) : a.baseLineHeightInPx = s(a.baseFontSize) * a.baseLineHeight + "px", {
    rhythm: h(a),
    establishBaseline: function establishBaseline() {
      return c((t = a).baseFontSize), {
        fontSize: s(t.baseFontSize) / 16 * 100 + "%",
        lineHeight: t.baseLineHeight.toString()
      };
      var t;
    },
    linesForFontSize: function linesForFontSize(t) {
      return v(t, a);
    },
    adjustFontSizeTo: function adjustFontSizeTo(t, e, r) {
      return null == e && (e = "auto"), function (t, e, r, n) {
        null == r && (r = n.baseFontSize), "%" === f(t) && (t = s(n.baseFontSize) * (s(t) / 100) + "px");
        var o = c(n.baseFontSize);
        t = o(t, "px", r = o(r, "px"));
        var i = h(n);
        return "auto" === e && (e = v(t, n)), {
          fontSize: o(t, n.rhythmUnit, r),
          lineHeight: i(e, r)
        };
      }(t, e, r, a);
    }
  });
  return d.scale = function (t) {
    var e = parseInt(l.baseFontSize, 10),
        r = function (t, e) {
      var r;
      return null == t && (t = 0), null == e && (e = "golden"), r = n(e) ? e : null != o[e] ? o[e] : o.golden, Math.pow(r, t);
    }(t, l.scaleRatio) * e + "px";

    return d.adjustFontSizeTo(r);
  }, Object.assign({}, {
    options: l
  }, d, {
    createStyles: function createStyles() {
      return this.toString();
    },
    toJSON: function toJSON() {
      return function (t, e) {
        var r = {},
            n = t.establishBaseline();
        r = ao(r, "html", {
          font: n.fontSize + "/" + n.lineHeight + " " + e.bodyFontFamily.map(co).join(","),
          boxSizing: "border-box",
          overflowY: "scroll"
        }), r = ao(r, ["*", "*:before", "*:after"], {
          boxSizing: "inherit"
        }), r = ao(r, "body", {
          color: e.bodyColor,
          fontFamily: e.bodyFontFamily.map(co).join(","),
          fontWeight: e.bodyWeight,
          wordWrap: "break-word",
          fontKerning: "normal",
          MozFontFeatureSettings: '"kern", "liga", "clig", "calt"',
          msFontFeatureSettings: '"kern", "liga", "clig", "calt"',
          WebkitFontFeatureSettings: '"kern", "liga", "clig", "calt"',
          fontFeatureSettings: '"kern", "liga", "clig", "calt"'
        }), r = ao(r, "img", {
          maxWidth: "100%"
        });
        var o = "";
        o = $e(e.blockMarginBottom) ? t.rhythm(e.blockMarginBottom) : De(e.blockMarginBottom) ? e.blockMarginBottom : t.rhythm(1), r = ao(r, ["h1", "h2", "h3", "h4", "h5", "h6", "hgroup", "ul", "ol", "dl", "dd", "p", "figure", "pre", "table", "fieldset", "blockquote", "form", "noscript", "iframe", "img", "hr", "address"], {
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          marginBottom: o
        }), r = ao(r, "blockquote", {
          marginRight: t.rhythm(1),
          marginBottom: o,
          marginLeft: t.rhythm(1)
        }), r = ao(r, ["b", "strong", "dt", "th"], {
          fontWeight: e.boldWeight
        }), r = ao(r, "hr", {
          background: y(80),
          border: "none",
          height: "1px",
          marginBottom: "calc(" + o + " - 1px)"
        }), r = ao(r, ["ol", "ul"], {
          listStylePosition: "outside",
          listStyleImage: "none",
          marginLeft: t.rhythm(1)
        }), r = ao(r, "li", {
          marginBottom: "calc(" + o + " / 2)"
        }), r = ao(r, ["ol li", "ul li"], {
          paddingLeft: 0
        }), r = ao(r, ["li > ol", "li > ul"], {
          marginLeft: t.rhythm(1),
          marginBottom: "calc(" + o + " / 2)",
          marginTop: "calc(" + o + " / 2)"
        }), r = ao(r, ["blockquote *:last-child", "li *:last-child", "p *:last-child"], {
          marginBottom: 0
        }), r = ao(r, ["li > p"], {
          marginBottom: "calc(" + o + " / 2)"
        }), r = ao(r, ["code", "kbd", "pre", "samp"], Object.assign({}, t.adjustFontSizeTo("85%"))), (r = ao(r, ["abbr", "acronym"], {
          borderBottom: "1px dotted " + y(50),
          cursor: "help"
        }))["abbr[title]"] = {
          borderBottom: "1px dotted " + y(50),
          cursor: "help",
          textDecoration: "none"
        }, r = ao(r, ["table"], Object.assign({}, t.adjustFontSizeTo(e.baseFontSize), {
          borderCollapse: "collapse",
          width: "100%"
        })), r = ao(r, ["thead"], {
          textAlign: "left"
        }), r = ao(r, ["td,th"], {
          textAlign: "left",
          borderBottom: "1px solid " + y(88),
          fontFeatureSettings: '"tnum"',
          MozFontFeatureSettings: '"tnum"',
          msFontFeatureSettings: '"tnum"',
          WebkitFontFeatureSettings: '"tnum"',
          paddingLeft: t.rhythm(2 / 3),
          paddingRight: t.rhythm(2 / 3),
          paddingTop: t.rhythm(.5),
          paddingBottom: "calc(" + t.rhythm(.5) + " - 1px)"
        }), r = ao(r, "th:first-child,td:first-child", {
          paddingLeft: 0
        }), r = ao(r, "th:last-child,td:last-child", {
          paddingRight: 0
        }), r = ao(r, ["h1", "h2", "h3", "h4", "h5", "h6"], {
          color: e.headerColor,
          fontFamily: e.headerFontFamily.map(co).join(","),
          fontWeight: e.headerWeight,
          textRendering: "optimizeLegibility"
        });
        var i = t.scale(1),
            a = t.scale(.6),
            u = t.scale(.4),
            c = t.scale(0),
            l = t.scale(-.2),
            f = t.scale(-.3);
        return Ie([i, a, u, c, l, f], function (t, n) {
          r = ue(r, "h" + (n + 1) + ".fontSize", t.fontSize), r = ue(r, "h" + (n + 1) + ".lineHeight", e.headerLineHeight);
        }), at(e.plugins) && (r = io(e.plugins, function (r, n) {
          return Er(r, n(t, e, r));
        }, r)), e.overrideStyles && $(e.overrideStyles) && (r = Er(r, e.overrideStyles(t, e, r))), e.overrideThemeStyles && $(e.overrideThemeStyles) && (r = Er(r, e.overrideThemeStyles(t, e, r))), r;
      }(d, l);
    },
    toString: function toString() {
      return function (t, e, r) {
        var n = po(r);
        return e.includeNormalize && (n = "" + so + n), n;
      }(0, l, this.toJSON());
    },
    injectStyles: function injectStyles() {
      if ("undefined" != typeof document) if (document.getElementById("typography.js")) document.getElementById("typography.js").innerHTML = this.toString();else {
        var t = document.createElement("style");
        t.id = "typography.js", t.innerHTML = this.toString();
        var e = document.head;
        e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t);
      }
    }
  });
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _grayPercentage = __webpack_require__(141);

var _grayPercentage2 = _interopRequireDefault(_grayPercentage);

var _typographyBreakpointConstants = __webpack_require__(142);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var theme = {
  title: "Wordpress Theme 2016",
  baseFontSize: "16px",
  baseLineHeight: 1.75,
  scaleRatio: 5 / 2,
  googleFonts: [{
    name: "Montserrat",
    styles: ["700"]
  }, {
    name: "Merriweather",
    styles: ["400", "400i", "700", "700i", "900", "900i"]
  }],
  headerFontFamily: ["Merriweather", "Georgia", "serif"],
  bodyFontFamily: ["Merriweather", "Georgia", "serif"],
  bodyColor: "hsla(0,0%,0%,0.9)",
  headerWeight: 900,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: function overrideStyles(_ref, options) {
    var _ref2;

    var adjustFontSizeTo = _ref.adjustFontSizeTo,
        scale = _ref.scale,
        rhythm = _ref.rhythm;
    return _ref2 = {
      h1: {
        fontFamily: ["Montserrat", "sans-serif"].join(",")
      },
      blockquote: _extends({}, scale(1 / 5), {
        color: (0, _grayPercentage2.default)(41),
        fontStyle: "italic",
        paddingLeft: rhythm(13 / 16),
        marginLeft: rhythm(-1),
        borderLeft: rhythm(3 / 16) + " solid " + (0, _grayPercentage2.default)(10)
      }),
      "blockquote > :last-child": {
        marginBottom: 0
      },
      "blockquote cite": _extends({}, adjustFontSizeTo(options.baseFontSize), {
        color: options.bodyColor,
        fontWeight: options.bodyWeight
      }),
      "blockquote cite:before": {
        content: '"— "'
      },
      ul: {
        listStyle: "disc"
      },
      "ul,ol": {
        marginLeft: 0
      }
    }, _defineProperty(_ref2, _typographyBreakpointConstants.MOBILE_MEDIA_QUERY, {
      "ul,ol": {
        marginLeft: rhythm(1)
      },
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16)
      }
    }), _defineProperty(_ref2, "h1,h2,h3,h4,h5,h6", {
      marginTop: rhythm(2)
    }), _defineProperty(_ref2, "h4", {
      letterSpacing: "0.140625em",
      textTransform: "uppercase"
    }), _defineProperty(_ref2, "h6", {
      fontStyle: "italic"
    }), _defineProperty(_ref2, "a", {
      boxShadow: "0 1px 0 0 currentColor",
      color: "#007acc",
      textDecoration: "none"
    }), _defineProperty(_ref2, "a:hover,a:active", {
      boxShadow: "none"
    }), _defineProperty(_ref2, "mark,ins", {
      background: "#007acc",
      color: "white",
      padding: rhythm(1 / 16) + " " + rhythm(1 / 8),
      textDecoration: "none"
    }), _ref2;
  }
};
exports.default = theme;

/***/ }),

/***/ 141:
/***/ (function(module, exports) {

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = function (lightness, hue, darkBackground) {
  if (typeof hue === "undefined") {
    hue = 0;
  }

  if (typeof darkBackground === "undefined") {
    darkBackground = false;
  } // Convert named hues into numeric lightness value.


  if (hue === "cool") {
    hue = 237;
  } else if (hue === "slate") {
    hue = 122;
  } else if (hue === "warm") {
    hue = 69;
  }

  if (!isNumeric(hue)) {
    throw new Error("Hue is not a number");
  }

  if (!isNumeric(lightness)) {
    throw new Error("Lightness is not a number");
  }

  if (lightness > 100) {
    lightness = 100;
  }

  if (lightness < 0) {
    lightness = 0;
  }

  var saturation = 0;

  if (hue !== 0) {
    var a = 19.92978;
    var b = -0.3651759;
    var c = 0.001737214;
    saturation = a + b * lightness + c * Math.pow(lightness, 2);
  }

  var opacity = 0;

  if (darkBackground) {
    opacity = lightness / 100;
    lightness = '100%,';
  } else {
    opacity = (100 - lightness) / 100;
    lightness = '0%,';
  }

  return "hsla(" + hue + "," + saturation + "%," + lightness + opacity + ")";
};

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LARGER_DISPLAY_WIDTH = exports.LARGER_DISPLAY_WIDTH = "1600px";
var LARGE_DISPLAY_WIDTH = exports.LARGE_DISPLAY_WIDTH = "1280px";
var DEFAULT_WIDTH = exports.DEFAULT_WIDTH = "980px";
var TABLET_WIDTH = exports.TABLET_WIDTH = "768px";
var MOBILE_WIDTH = exports.MOBILE_WIDTH = "480px";
var LARGER_DISPLAY_MEDIA_QUERY = exports.LARGER_DISPLAY_MEDIA_QUERY = "@media only screen and (max-width:1600px)";
var LARGE_DISPLAY_MEDIA_QUERY = exports.LARGE_DISPLAY_MEDIA_QUERY = "@media only screen and (max-width:1280px)";
var DEFAULT_MEDIA_QUERY = exports.DEFAULT_MEDIA_QUERY = "@media only screen and (max-width:980px)";
var TABLET_MEDIA_QUERY = exports.TABLET_MEDIA_QUERY = "@media only screen and (max-width:768px)";
var MOBILE_MEDIA_QUERY = exports.MOBILE_MEDIA_QUERY = "@media only screen and (max-width:480px)";
var MIN_LARGER_DISPLAY_MEDIA_QUERY = exports.MIN_LARGER_DISPLAY_MEDIA_QUERY = "@media (min-width:1600px)";
var MIN_LARGE_DISPLAY_MEDIA_QUERY = exports.MIN_LARGE_DISPLAY_MEDIA_QUERY = "@media (min-width:1280px)";
var MIN_DEFAULT_MEDIA_QUERY = exports.MIN_DEFAULT_MEDIA_QUERY = "@media (min-width:980px)";
var MIN_TABLET_MEDIA_QUERY = exports.MIN_TABLET_MEDIA_QUERY = "@media (min-width:768px)";
var MIN_MOBILE_MEDIA_QUERY = exports.MIN_MOBILE_MEDIA_QUERY = "@media (min-width:480px)";

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelmetExport; });
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(146);
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_side_effect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(147);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(38);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(object_assign__WEBPACK_IMPORTED_MODULE_5__);






var ATTRIBUTE_NAMES = {
  BODY: "bodyAttributes",
  HTML: "htmlAttributes",
  TITLE: "titleAttributes"
};
var TAG_NAMES = {
  BASE: "base",
  BODY: "body",
  HEAD: "head",
  HTML: "html",
  LINK: "link",
  META: "meta",
  NOSCRIPT: "noscript",
  SCRIPT: "script",
  STYLE: "style",
  TITLE: "title"
};
var VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
  return TAG_NAMES[name];
});
var TAG_PROPERTIES = {
  CHARSET: "charset",
  CSS_TEXT: "cssText",
  HREF: "href",
  HTTPEQUIV: "http-equiv",
  INNER_HTML: "innerHTML",
  ITEM_PROP: "itemprop",
  NAME: "name",
  PROPERTY: "property",
  REL: "rel",
  SRC: "src",
  TARGET: "target"
};
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate"
};
var HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
  obj[REACT_TAG_MAP[key]] = key;
  return obj;
}, {});
var SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];
var HELMET_ATTRIBUTE = "data-react-helmet";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
  var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (encode === false) {
    return String(str);
  }

  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
  var innermostTitle = getInnermostProperty(propsList, TAG_NAMES.TITLE);
  var innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);

  if (innermostTemplate && innermostTitle) {
    // use function arg to avoid need to escape $ characters
    return innermostTemplate.replace(/%s/g, function () {
      return Array.isArray(innermostTitle) ? innermostTitle.join("") : innermostTitle;
    });
  }

  var innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
  return getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
  return propsList.filter(function (props) {
    return typeof props[tagType] !== "undefined";
  }).map(function (props) {
    return props[tagType];
  }).reduce(function (tagAttrs, current) {
    return _extends({}, tagAttrs, current);
  }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
  return propsList.filter(function (props) {
    return typeof props[TAG_NAMES.BASE] !== "undefined";
  }).map(function (props) {
    return props[TAG_NAMES.BASE];
  }).reverse().reduce(function (innermostBaseTag, tag) {
    if (!innermostBaseTag.length) {
      var keys = Object.keys(tag);

      for (var i = 0; i < keys.length; i++) {
        var attributeKey = keys[i];
        var lowerCaseAttributeKey = attributeKey.toLowerCase();

        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
          return innermostBaseTag.concat(tag);
        }
      }
    }

    return innermostBaseTag;
  }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
  // Calculate list of tags, giving priority innermost component (end of the propslist)
  var approvedSeenTags = {};
  return propsList.filter(function (props) {
    if (Array.isArray(props[tagName])) {
      return true;
    }

    if (typeof props[tagName] !== "undefined") {
      warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
    }

    return false;
  }).map(function (props) {
    return props[tagName];
  }).reverse().reduce(function (approvedTags, instanceTags) {
    var instanceSeenTags = {};
    instanceTags.filter(function (tag) {
      var primaryAttributeKey = void 0;
      var keys = Object.keys(tag);

      for (var i = 0; i < keys.length; i++) {
        var attributeKey = keys[i];
        var lowerCaseAttributeKey = attributeKey.toLowerCase(); // Special rule with link tags, since rel and href are both primary tags, rel takes priority

        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        } // Special case for innerHTML which doesn't work lowercased


        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === TAG_PROPERTIES.INNER_HTML || attributeKey === TAG_PROPERTIES.CSS_TEXT || attributeKey === TAG_PROPERTIES.ITEM_PROP)) {
          primaryAttributeKey = attributeKey;
        }
      }

      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }

      var value = tag[primaryAttributeKey].toLowerCase();

      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }

      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }

      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }

      return false;
    }).reverse().forEach(function (tag) {
      return approvedTags.push(tag);
    }); // Update seen tags with tags from this instance

    var keys = Object.keys(instanceSeenTags);

    for (var i = 0; i < keys.length; i++) {
      var attributeKey = keys[i];
      var tagUnion = object_assign__WEBPACK_IMPORTED_MODULE_5___default()({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);
      approvedSeenTags[attributeKey] = tagUnion;
    }

    return approvedTags;
  }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
  for (var i = propsList.length - 1; i >= 0; i--) {
    var props = propsList[i];

    if (props.hasOwnProperty(property)) {
      return props[property];
    }
  }

  return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
  return {
    baseTag: getBaseTagFromPropsList([TAG_PROPERTIES.HREF, TAG_PROPERTIES.TARGET], propsList),
    bodyAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.BODY, propsList),
    defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
    encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
    htmlAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.HTML, propsList),
    linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
    metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.PROPERTY, TAG_PROPERTIES.ITEM_PROP], propsList),
    noscriptTags: getTagsFromPropsList(TAG_NAMES.NOSCRIPT, [TAG_PROPERTIES.INNER_HTML], propsList),
    onChangeClientState: getOnChangeClientState(propsList),
    scriptTags: getTagsFromPropsList(TAG_NAMES.SCRIPT, [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML], propsList),
    styleTags: getTagsFromPropsList(TAG_NAMES.STYLE, [TAG_PROPERTIES.CSS_TEXT], propsList),
    title: getTitleFromPropsList(propsList),
    titleAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.TITLE, propsList)
  };
};

var rafPolyfill = function () {
  var clock = Date.now();
  return function (callback) {
    var currentTime = Date.now();

    if (currentTime - clock > 16) {
      clock = currentTime;
      callback(currentTime);
    } else {
      setTimeout(function () {
        rafPolyfill(callback);
      }, 0);
    }
  };
}();

var cafPolyfill = function cafPolyfill(id) {
  return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;
var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
  return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }

  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(function () {
      commitTagChanges(newState, function () {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
  var baseTag = newState.baseTag,
      bodyAttributes = newState.bodyAttributes,
      htmlAttributes = newState.htmlAttributes,
      linkTags = newState.linkTags,
      metaTags = newState.metaTags,
      noscriptTags = newState.noscriptTags,
      onChangeClientState = newState.onChangeClientState,
      scriptTags = newState.scriptTags,
      styleTags = newState.styleTags,
      title = newState.title,
      titleAttributes = newState.titleAttributes;
  updateAttributes(TAG_NAMES.BODY, bodyAttributes);
  updateAttributes(TAG_NAMES.HTML, htmlAttributes);
  updateTitle(title, titleAttributes);
  var tagUpdates = {
    baseTag: updateTags(TAG_NAMES.BASE, baseTag),
    linkTags: updateTags(TAG_NAMES.LINK, linkTags),
    metaTags: updateTags(TAG_NAMES.META, metaTags),
    noscriptTags: updateTags(TAG_NAMES.NOSCRIPT, noscriptTags),
    scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags),
    styleTags: updateTags(TAG_NAMES.STYLE, styleTags)
  };
  var addedTags = {};
  var removedTags = {};
  Object.keys(tagUpdates).forEach(function (tagType) {
    var _tagUpdates$tagType = tagUpdates[tagType],
        newTags = _tagUpdates$tagType.newTags,
        oldTags = _tagUpdates$tagType.oldTags;

    if (newTags.length) {
      addedTags[tagType] = newTags;
    }

    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  cb && cb();
  onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
  return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }

  updateAttributes(TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
  var elementTag = document.getElementsByTagName(tagName)[0];

  if (!elementTag) {
    return;
  }

  var helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  var attributesToRemove = [].concat(helmetAttributes);
  var attributeKeys = Object.keys(attributes);

  for (var i = 0; i < attributeKeys.length; i++) {
    var attribute = attributeKeys[i];
    var value = attributes[attribute] || "";

    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }

    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }

    var indexToSave = attributesToRemove.indexOf(attribute);

    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }

  for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
    elementTag.removeAttribute(attributesToRemove[_i]);
  }

  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};

var updateTags = function updateTags(type, tags) {
  var headElement = document.head || document.querySelector(TAG_NAMES.HEAD);
  var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
  var oldTags = Array.prototype.slice.call(tagNodes);
  var newTags = [];
  var indexToDelete = void 0;

  if (tags && tags.length) {
    tags.forEach(function (tag) {
      var newElement = document.createElement(type);

      for (var attribute in tag) {
        if (tag.hasOwnProperty(attribute)) {
          if (attribute === TAG_PROPERTIES.INNER_HTML) {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === TAG_PROPERTIES.CSS_TEXT) {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
            newElement.setAttribute(attribute, value);
          }
        }
      }

      newElement.setAttribute(HELMET_ATTRIBUTE, "true"); // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.

      if (oldTags.some(function (existingTag, index) {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }

  oldTags.forEach(function (tag) {
    return tag.parentNode.removeChild(tag);
  });
  newTags.forEach(function (tag) {
    return headElement.appendChild(tag);
  });
  return {
    oldTags: oldTags,
    newTags: newTags
  };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
  return Object.keys(attributes).reduce(function (str, key) {
    var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
    return str ? str + " " + attr : attr;
  }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
  var attributeString = generateElementAttributesAsString(attributes);
  var flattenedTitle = flattenArray(title);
  return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
  return tags.reduce(function (str, tag) {
    var attributeHtml = Object.keys(tag).filter(function (attribute) {
      return !(attribute === TAG_PROPERTIES.INNER_HTML || attribute === TAG_PROPERTIES.CSS_TEXT);
    }).reduce(function (string, attribute) {
      var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
      return string ? string + " " + attr : attr;
    }, "");
    var tagContent = tag.innerHTML || tag.cssText || "";
    var isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
    return str + "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
  }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
  var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(attributes).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key] || key] = attributes[key];
    return obj;
  }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
  var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(props).reduce(function (obj, key) {
    obj[HTML_TAG_MAP[key] || key] = props[key];
    return obj;
  }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
  var _initProps; // assigning into an array to define toString function on it


  var initProps = (_initProps = {
    key: title
  }, _initProps[HELMET_ATTRIBUTE] = true, _initProps);
  var props = convertElementAttributestoReactProps(attributes, initProps);
  return [react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
  return tags.map(function (tag, i) {
    var _mappedTag;

    var mappedTag = (_mappedTag = {
      key: i
    }, _mappedTag[HELMET_ATTRIBUTE] = true, _mappedTag);
    Object.keys(tag).forEach(function (attribute) {
      var mappedAttribute = REACT_TAG_MAP[attribute] || attribute;

      if (mappedAttribute === TAG_PROPERTIES.INNER_HTML || mappedAttribute === TAG_PROPERTIES.CSS_TEXT) {
        var content = tag.innerHTML || tag.cssText;
        mappedTag.dangerouslySetInnerHTML = {
          __html: content
        };
      } else {
        mappedTag[mappedAttribute] = tag[attribute];
      }
    });
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(type, mappedTag);
  });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
  switch (type) {
    case TAG_NAMES.TITLE:
      return {
        toComponent: function toComponent() {
          return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
        },
        toString: function toString() {
          return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
        }
      };

    case ATTRIBUTE_NAMES.BODY:
    case ATTRIBUTE_NAMES.HTML:
      return {
        toComponent: function toComponent() {
          return convertElementAttributestoReactProps(tags);
        },
        toString: function toString() {
          return generateElementAttributesAsString(tags);
        }
      };

    default:
      return {
        toComponent: function toComponent() {
          return generateTagsAsReactComponent(type, tags);
        },
        toString: function toString() {
          return generateTagsAsString(type, tags, encode);
        }
      };
  }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
  var baseTag = _ref.baseTag,
      bodyAttributes = _ref.bodyAttributes,
      encode = _ref.encode,
      htmlAttributes = _ref.htmlAttributes,
      linkTags = _ref.linkTags,
      metaTags = _ref.metaTags,
      noscriptTags = _ref.noscriptTags,
      scriptTags = _ref.scriptTags,
      styleTags = _ref.styleTags,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? "" : _ref$title,
      titleAttributes = _ref.titleAttributes;
  return {
    base: getMethodsForTag(TAG_NAMES.BASE, baseTag, encode),
    bodyAttributes: getMethodsForTag(ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
    htmlAttributes: getMethodsForTag(ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
    link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
    meta: getMethodsForTag(TAG_NAMES.META, metaTags, encode),
    noscript: getMethodsForTag(TAG_NAMES.NOSCRIPT, noscriptTags, encode),
    script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
    style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
    title: getMethodsForTag(TAG_NAMES.TITLE, {
      title: title,
      titleAttributes: titleAttributes
    }, encode)
  };
};

var Helmet = function Helmet(Component) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    inherits(HelmetWrapper, _React$Component);

    function HelmetWrapper() {
      classCallCheck(this, HelmetWrapper);
      return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
      return !react_fast_compare__WEBPACK_IMPORTED_MODULE_3___default()(this.props, nextProps);
    };

    HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
      if (!nestedChildren) {
        return null;
      }

      switch (child.type) {
        case TAG_NAMES.SCRIPT:
        case TAG_NAMES.NOSCRIPT:
          return {
            innerHTML: nestedChildren
          };

        case TAG_NAMES.STYLE:
          return {
            cssText: nestedChildren
          };
      }

      throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
    };

    HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
      var _babelHelpers$extends;

      var child = _ref.child,
          arrayTypeChildren = _ref.arrayTypeChildren,
          newChildProps = _ref.newChildProps,
          nestedChildren = _ref.nestedChildren;
      return _extends({}, arrayTypeChildren, (_babelHelpers$extends = {}, _babelHelpers$extends[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _babelHelpers$extends));
    };

    HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
      var _babelHelpers$extends2, _babelHelpers$extends3;

      var child = _ref2.child,
          newProps = _ref2.newProps,
          newChildProps = _ref2.newChildProps,
          nestedChildren = _ref2.nestedChildren;

      switch (child.type) {
        case TAG_NAMES.TITLE:
          return _extends({}, newProps, (_babelHelpers$extends2 = {}, _babelHelpers$extends2[child.type] = nestedChildren, _babelHelpers$extends2.titleAttributes = _extends({}, newChildProps), _babelHelpers$extends2));

        case TAG_NAMES.BODY:
          return _extends({}, newProps, {
            bodyAttributes: _extends({}, newChildProps)
          });

        case TAG_NAMES.HTML:
          return _extends({}, newProps, {
            htmlAttributes: _extends({}, newChildProps)
          });
      }

      return _extends({}, newProps, (_babelHelpers$extends3 = {}, _babelHelpers$extends3[child.type] = _extends({}, newChildProps), _babelHelpers$extends3));
    };

    HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
      var newFlattenedProps = _extends({}, newProps);

      Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
        var _babelHelpers$extends4;

        newFlattenedProps = _extends({}, newFlattenedProps, (_babelHelpers$extends4 = {}, _babelHelpers$extends4[arrayChildName] = arrayTypeChildren[arrayChildName], _babelHelpers$extends4));
      });
      return newFlattenedProps;
    };

    HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
      if (false) {}

      return true;
    };

    HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
      var _this2 = this;

      var arrayTypeChildren = {};
      react__WEBPACK_IMPORTED_MODULE_4___default.a.Children.forEach(children, function (child) {
        if (!child || !child.props) {
          return;
        }

        var _child$props = child.props,
            nestedChildren = _child$props.children,
            childProps = objectWithoutProperties(_child$props, ["children"]);
        var newChildProps = convertReactPropstoHtmlAttributes(childProps);

        _this2.warnOnInvalidChildren(child, nestedChildren);

        switch (child.type) {
          case TAG_NAMES.LINK:
          case TAG_NAMES.META:
          case TAG_NAMES.NOSCRIPT:
          case TAG_NAMES.SCRIPT:
          case TAG_NAMES.STYLE:
            arrayTypeChildren = _this2.flattenArrayTypeChildren({
              child: child,
              arrayTypeChildren: arrayTypeChildren,
              newChildProps: newChildProps,
              nestedChildren: nestedChildren
            });
            break;

          default:
            newProps = _this2.mapObjectTypeChildren({
              child: child,
              newProps: newProps,
              newChildProps: newChildProps,
              nestedChildren: nestedChildren
            });
            break;
        }
      });
      newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
      return newProps;
    };

    HelmetWrapper.prototype.render = function render() {
      var _props = this.props,
          children = _props.children,
          props = objectWithoutProperties(_props, ["children"]);

      var newProps = _extends({}, props);

      if (children) {
        newProps = this.mapChildrenToProps(children, newProps);
      }

      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, newProps);
    };

    createClass(HelmetWrapper, null, [{
      key: "canUseDOM",
      // Component.peek comes from react-side-effect:
      // For testing, you may use a static peek() method available on the returned component.
      // It lets you get the current state without resetting the mounted instance stack.
      // Don’t use it for anything other than testing.

      /**
       * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
       * @param {Object} bodyAttributes: {"className": "root"}
       * @param {String} defaultTitle: "Default Title"
       * @param {Boolean} defer: true
       * @param {Boolean} encodeSpecialCharacters: true
       * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
       * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
       * @param {Array} meta: [{"name": "description", "content": "Test description"}]
       * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
       * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
       * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
       * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
       * @param {String} title: "Title"
       * @param {Object} titleAttributes: {"itemprop": "name"}
       * @param {String} titleTemplate: "MySite.com - %s"
       */
      set: function set$$1(canUseDOM) {
        Component.canUseDOM = canUseDOM;
      }
    }]);
    return HelmetWrapper;
  }(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component), _class.propTypes = {
    base: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
    bodyAttributes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
    children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node]),
    defaultTitle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    defer: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
    encodeSpecialCharacters: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
    htmlAttributes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
    link: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object),
    meta: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object),
    noscript: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object),
    onChangeClientState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
    script: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object),
    style: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object),
    title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    titleAttributes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
    titleTemplate: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
  }, _class.defaultProps = {
    defer: true,
    encodeSpecialCharacters: true
  }, _class.peek = Component.peek, _class.rewind = function () {
    var mappedState = Component.rewind();

    if (!mappedState) {
      // provide fallback if mappedState is undefined
      mappedState = mapStateOnServer({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }

    return mappedState;
  }, _temp;
};

var NullComponent = function NullComponent() {
  return null;
};

var HelmetSideEffects = react_side_effect__WEBPACK_IMPORTED_MODULE_2___default()(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);
var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;
/* unused harmony default export */ var _unused_webpack_default_export = (HelmetExport);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = __webpack_require__(0);

var React__default = _interopDefault(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = /*#__PURE__*/function (_PureComponent) {
      _inheritsLoose(SideEffect, _PureComponent);

      function SideEffect() {
        return _PureComponent.apply(this, arguments) || this;
      } // Try to use displayName of wrapped component
      // Expose canUseDOM so tests can monkeypatch it


      SideEffect.peek = function peek() {
        return state;
      };

      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      var _proto = SideEffect.prototype;

      _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return /*#__PURE__*/React__default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(React.PureComponent);

    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");

    _defineProperty(SideEffect, "canUseDOM", canUseDOM);

    return SideEffect;
  };
}

module.exports = withSideEffect;

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */
var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView; // Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;

    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }

      return true;
    } // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.


    var it;

    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      it = a.entries();

      while (!(i = it.next()).done) {
        if (!b.has(i.value[0])) return false;
      }

      it = a.entries();

      while (!(i = it.next()).done) {
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      }

      return true;
    }

    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      it = a.entries();

      while (!(i = it.next()).done) {
        if (!b.has(i.value[0])) return false;
      }

      return true;
    } // END: Modifications


    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (a[i] !== b[i]) return false;
      }

      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    } // END: fast-deep-equal
    // START: react-fast-compare
    // custom handling for DOM elements


    if (hasElementType && a instanceof Element) return false; // custom handling for React/Preact

    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements
        continue;
      } // all other properties should be traversed as usual


      if (!equal(a[keys[i]], b[keys[i]])) return false;
    } // END: react-fast-compare
    // START: fast-deep-equal


    return true;
  }

  return a !== a && b !== b;
} // end fast-deep-equal


module.exports = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message || '').match(/stack|recursion/i)) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    } // some other error. we should definitely know about these


    throw error;
  }
};

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SEO; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(145);



/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

var SEO = function SEO(_ref) {
  var _ref$description = _ref.description,
      description = _ref$description === void 0 ? "" : _ref$description,
      _ref$lang = _ref.lang,
      lang = _ref$lang === void 0 ? "en" : _ref$lang,
      _ref$meta = _ref.meta,
      meta = _ref$meta === void 0 ? [] : _ref$meta,
      title = _ref.title;

  var _useStaticQuery = Object(gatsby__WEBPACK_IMPORTED_MODULE_1__["useStaticQuery"])("2841359383"),
      site = _useStaticQuery.site;

  var metaDescription = description || site.siteMetadata.description;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_helmet__WEBPACK_IMPORTED_MODULE_2__[/* Helmet */ "a"], {
    htmlAttributes: {
      lang: lang
    },
    title: title,
    titleTemplate: "%s | " + site.siteMetadata.title,
    meta: [{
      name: "description",
      content: metaDescription
    }, {
      property: "og:title",
      content: title
    }, {
      property: "og:description",
      content: metaDescription
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }, {
      name: "twitter:creator",
      content: site.siteMetadata.social.twitter
    }, {
      name: "twitter:title",
      content: title
    }, {
      name: "twitter:description",
      content: metaDescription
    }].concat(meta)
  });
};

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ layout_Layout; });

// EXTERNAL MODULE: /home/zed/z/monorepo/node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: /home/zed/z/monorepo/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js
var taggedTemplateLiteralLoose = __webpack_require__(7);

// EXTERNAL MODULE: ./src/components/utils/typography.ts
var typography = __webpack_require__(26);

// CONCATENATED MODULE: ./src/components/utils/normalize-css.tsx
var normalize = "html {\n  line-height: 1.15; \n  -webkit-text-size-adjust: 100%; \n}\nbody {\n  margin: 0;\n}\nmain {\n  display: block;\n}\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\nhr {\n  box-sizing: content-box; \n  height: 0; \n  overflow: visible; \n}\npre {\n  font-family: monospace, monospace; \n  font-size: 1em; \n}\na {\n  background-color: transparent;\n}\nabbr[title] {\n  border-bottom: none; \n  text-decoration: underline; \n  text-decoration: underline dotted; \n}\nb,\nstrong {\n  font-weight: bolder;\n}\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; \n  font-size: 1em; \n}\nsmall {\n  font-size: 80%;\n}\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\nimg {\n  border-style: none;\n}\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; \n  font-size: 100%; \n  line-height: 1.15;\n  margin: 0; \n}\nbutton,\ninput {\n  overflow: visible;\n}\nbutton,\nselect { \n  text-transform: none;\n}\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\nlegend {\n  box-sizing: border-box; \n  color: inherit; \n  display: table; \n  max-width: 100%; \n  padding: 0; \n  white-space: normal; \n}\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; \n  padding: 0; \n}\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n[type=\"search\"] {\n  -webkit-appearance: textfield; \n  outline-offset: -2px; \n}\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n::-webkit-file-upload-button {\n  -webkit-appearance: button; \n  font: inherit; \n}\ndetails {\n  display: block;\n}\nsummary {\n  display: list-item;\n}\ntemplate {\n  display: none;\n}\n[hidden] {\n  display: none;\n}";
// CONCATENATED MODULE: ./src/components/utils/fonts.ts
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,800;0,900;1,500&display=swap');
var fonts = "\n/* cyrillic-ext */\n@font-face {\n    font-family: 'Montserrat';\n    font-style: italic;\n    font-weight: 500;\n    font-display: swap;\n    src: local('Montserrat Medium Italic'), local('Montserrat-MediumItalic'), url(https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZOg3z8fZwnCo.woff2) format('woff2');\n    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n  }\n  /* cyrillic */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: italic;\n    font-weight: 500;\n    font-display: swap;\n    src: local('Montserrat Medium Italic'), local('Montserrat-MediumItalic'), url(https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZOg3z-PZwnCo.woff2) format('woff2');\n    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n  }\n  /* vietnamese */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: italic;\n    font-weight: 500;\n    font-display: swap;\n    src: local('Montserrat Medium Italic'), local('Montserrat-MediumItalic'), url(https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZOg3z8_ZwnCo.woff2) format('woff2');\n    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n  }\n  /* latin-ext */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: italic;\n    font-weight: 500;\n    font-display: swap;\n    src: local('Montserrat Medium Italic'), local('Montserrat-MediumItalic'), url(https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZOg3z8vZwnCo.woff2) format('woff2');\n    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n  }\n  /* latin */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: italic;\n    font-weight: 500;\n    font-display: swap;\n    src: local('Montserrat Medium Italic'), local('Montserrat-MediumItalic'), url(https://fonts.gstatic.com/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZOg3z_PZw.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n  }\n  /* cyrillic-ext */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: normal;\n    font-weight: 800;\n    font-display: swap;\n    src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3gTD_u50.woff2) format('woff2');\n    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n  }\n  /* cyrillic */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: normal;\n    font-weight: 800;\n    font-display: swap;\n    src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3g3D_u50.woff2) format('woff2');\n    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n  }\n  /* vietnamese */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: normal;\n    font-weight: 800;\n    font-display: swap;\n    src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3gbD_u50.woff2) format('woff2');\n    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n  }\n  /* latin-ext */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: normal;\n    font-weight: 800;\n    font-display: swap;\n    src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3gfD_u50.woff2) format('woff2');\n    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n  }\n  /* latin */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: normal;\n    font-weight: 800;\n    font-display: swap;\n    src: local('Montserrat ExtraBold'), local('Montserrat-ExtraBold'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3gnD_g.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n  }\n  /* cyrillic-ext */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: normal;\n    font-weight: 900;\n    font-display: swap;\n    src: local('Montserrat Black'), local('Montserrat-Black'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3gTD_u50.woff2) format('woff2');\n    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n  }\n  /* cyrillic */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: normal;\n    font-weight: 900;\n    font-display: swap;\n    src: local('Montserrat Black'), local('Montserrat-Black'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3g3D_u50.woff2) format('woff2');\n    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n  }\n  /* vietnamese */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: normal;\n    font-weight: 900;\n    font-display: swap;\n    src: local('Montserrat Black'), local('Montserrat-Black'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3gbD_u50.woff2) format('woff2');\n    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n  }\n  /* latin-ext */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: normal;\n    font-weight: 900;\n    font-display: swap;\n    src: local('Montserrat Black'), local('Montserrat-Black'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3gfD_u50.woff2) format('woff2');\n    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n  }\n  /* latin */\n  @font-face {\n    font-family: 'Montserrat';\n    font-style: normal;\n    font-weight: 900;\n    font-display: swap;\n    src: local('Montserrat Black'), local('Montserrat-Black'), url(https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_epG3gnD_g.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n  }\n  ";
// EXTERNAL MODULE: /home/zed/z/monorepo/node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var emotion_react_browser_esm = __webpack_require__(8);

// CONCATENATED MODULE: ./src/components/utils/globalStyle.tsx


function _templateObject3() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["  \n  max-width: 1140px;\n  margin: auto;\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n      ", "\n      ", "\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n      ", "\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}




/** @jsx jsx */



var styles = typography["a" /* default */].createStyles().replace(/first-child/gi, "first-of-type");
var globalStyle_GlobalStyle = function GlobalStyle() {
  return Object(emotion_react_browser_esm["c" /* jsx */])(react_default.a.Fragment, null, Object(emotion_react_browser_esm["c" /* jsx */])(emotion_react_browser_esm["a" /* Global */], {
    styles: Object(emotion_react_browser_esm["b" /* css */])(_templateObject(), normalize)
  }));
};
var globalStyle_MainContainer = function MainContainer(_ref) {
  var children = _ref.children;
  return Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    css: Object(emotion_react_browser_esm["b" /* css */])(_templateObject2(), fonts, styles)
  }, Object(emotion_react_browser_esm["c" /* jsx */])("main", {
    css: Object(emotion_react_browser_esm["b" /* css */])(_templateObject3())
  }, children));
};
// CONCATENATED MODULE: ./src/components/layout.tsx


var layout_Layout = function Layout(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"](globalStyle_GlobalStyle, null), /*#__PURE__*/react["createElement"](globalStyle_MainContainer, null, children));
};

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rhythm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return scale; });
/* harmony import */ var typography__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(139);
/* harmony import */ var typography__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typography__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(140);
/* harmony import */ var typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1__);


var typography = new typography__WEBPACK_IMPORTED_MODULE_0___default.a(typography_theme_wordpress_2016__WEBPACK_IMPORTED_MODULE_1___default.a); // // Hot reload typography in development.
// if (process.env.NODE_ENV !== `production`) {
//   typography.injectStyles();
// }

var rhythm = typography.rhythm;
var scale = typography.scale;
/* harmony default export */ __webpack_exports__["a"] = (typography);

/***/ })

}]);