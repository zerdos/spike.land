(() => {
  var qr = Object.create;
  var Oe = Object.defineProperty;
  var $r = Object.getOwnPropertyDescriptor;
  var Vr = Object.getOwnPropertyNames;
  var Wr = Object.getPrototypeOf, Jr = Object.prototype.hasOwnProperty;
  var Hr = (r) => Oe(r, "__esModule", { value: !0 });
  var m = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
  var Qr = (r, e, t, n) => {
      if (e && typeof e == "object" || typeof e == "function") {
        for (let i of Vr(e)) {
          !Jr.call(r, i) && (t || i !== "default") && Oe(r, i, {
            get: () => e[i],
            enumerable: !(n = $r(e, i)) || n.enumerable,
          });
        }
      }
      return r;
    },
    ce = (r, e) =>
      Qr(
        Hr(Oe(
          r != null ? qr(Wr(r)) : {},
          "default",
          !e && r && r.__esModule
            ? { get: () => r.default, enumerable: !0 }
            : { value: r, enumerable: !0 },
        )),
        r,
      );
  var zt = m((bo, Ot) => {
    "use strict";
    async function* In(r, e = {}) {
      let t = r.getReader();
      try {
        for (;;) {
          let n = await t.read();
          if (n.done) return;
          yield n.value;
        }
      } finally {
        e.preventCancel !== !0 && t.cancel(), t.releaseLock();
      }
    }
    Ot.exports = In;
  });
  var Fe = m((wo, At) => {
    "use strict";
    function Bt(r, e) {
      for (let t in e) {
        Object.defineProperty(r, t, {
          value: e[t],
          enumerable: !0,
          configurable: !0,
        });
      }
      return r;
    }
    function Cn(r, e, t) {
      if (!r || typeof r == "string") {
        throw new TypeError("Please pass an Error to err-code");
      }
      t || (t = {}), typeof e == "object" && (t = e, e = ""), e && (t.code = e);
      try {
        return Bt(r, t);
      } catch {
        t.message = r.message, t.stack = r.stack;
        let i = function () {};
        return i.prototype = Object.create(Object.getPrototypeOf(r)),
          Bt(new i(), t);
      }
    }
    At.exports = Cn;
  });
  var Ct = m((So, It) => {
    "use strict";
    It.exports = Nn;
    function Nn(r, e) {
      for (
        var t = new Array(arguments.length - 1), n = 0, i = 2, o = !0;
        i < arguments.length;
      ) {
        t[n++] = arguments[i++];
      }
      return new Promise(function (c, a) {
        t[n] = function (f) {
          if (o) {
            if (o = !1, f) a(f);
            else {
              for (
                var b = new Array(arguments.length - 1), k = 0;
                k < b.length;
              ) {
                b[k++] = arguments[k];
              }
              c.apply(null, b);
            }
          }
        };
        try {
          r.apply(e || null, t);
        } catch (l) {
          o && (o = !1, a(l));
        }
      });
    }
  });
  var jt = m((Mt) => {
    "use strict";
    var xe = Mt;
    xe.length = function (e) {
      var t = e.length;
      if (!t) return 0;
      for (var n = 0; --t % 4 > 1 && e.charAt(t) === "=";) ++n;
      return Math.ceil(e.length * 3) / 4 - n;
    };
    var ie = new Array(64), Lt = new Array(123);
    for (B = 0; B < 64;) {
      Lt[
        ie[B] = B < 26 ? B + 65 : B < 52 ? B + 71 : B < 62 ? B - 4 : B - 59 | 43
      ] = B++;
    }
    var B;
    xe.encode = function (e, t, n) {
      for (var i = null, o = [], s = 0, c = 0, a; t < n;) {
        var l = e[t++];
        switch (c) {
          case 0:
            o[s++] = ie[l >> 2], a = (l & 3) << 4, c = 1;
            break;
          case 1:
            o[s++] = ie[a | l >> 4], a = (l & 15) << 2, c = 2;
            break;
          case 2:
            o[s++] = ie[a | l >> 6], o[s++] = ie[l & 63], c = 0;
            break;
        }
        s > 8191 &&
          ((i || (i = [])).push(String.fromCharCode.apply(String, o)), s = 0);
      }
      return c && (o[s++] = ie[a], o[s++] = 61, c === 1 && (o[s++] = 61)),
        i
          ? (s && i.push(String.fromCharCode.apply(String, o.slice(0, s))),
            i.join(""))
          : String.fromCharCode.apply(String, o.slice(0, s));
    };
    var Nt = "invalid encoding";
    xe.decode = function (e, t, n) {
      for (var i = n, o = 0, s, c = 0; c < e.length;) {
        var a = e.charCodeAt(c++);
        if (a === 61 && o > 1) break;
        if ((a = Lt[a]) === void 0) throw Error(Nt);
        switch (o) {
          case 0:
            s = a, o = 1;
            break;
          case 1:
            t[n++] = s << 2 | (a & 48) >> 4, s = a, o = 2;
            break;
          case 2:
            t[n++] = (s & 15) << 4 | (a & 60) >> 2, s = a, o = 3;
            break;
          case 3:
            t[n++] = (s & 3) << 6 | a, o = 0;
            break;
        }
      }
      if (o === 1) throw Error(Nt);
      return n - i;
    };
    xe.test = function (e) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
        .test(e);
    };
  });
  var Pt = m((vo, Ft) => {
    "use strict";
    Ft.exports = ve;
    function ve() {
      this._listeners = {};
    }
    ve.prototype.on = function (e, t, n) {
      return (this._listeners[e] || (this._listeners[e] = [])).push({
        fn: t,
        ctx: n || this,
      }),
        this;
    };
    ve.prototype.off = function (e, t) {
      if (e === void 0) this._listeners = {};
      else if (t === void 0) this._listeners[e] = [];
      else {
        for (var n = this._listeners[e], i = 0; i < n.length;) {
          n[i].fn === t ? n.splice(i, 1) : ++i;
        }
      }
      return this;
    };
    ve.prototype.emit = function (e) {
      var t = this._listeners[e];
      if (t) {
        for (var n = [], i = 1; i < arguments.length;) n.push(arguments[i++]);
        for (i = 0; i < t.length;) t[i].fn.apply(t[i++].ctx, n);
      }
      return this;
    };
  });
  var Jt = m((Eo, Wt) => {
    "use strict";
    Wt.exports = Rt(Rt);
    function Rt(r) {
      return typeof Float32Array < "u"
        ? function () {
          var e = new Float32Array([-0]),
            t = new Uint8Array(e.buffer),
            n = t[3] === 128;
          function i(a, l, f) {
            e[0] = a,
              l[f] = t[0],
              l[f + 1] = t[1],
              l[f + 2] = t[2],
              l[f + 3] = t[3];
          }
          function o(a, l, f) {
            e[0] = a,
              l[f] = t[3],
              l[f + 1] = t[2],
              l[f + 2] = t[1],
              l[f + 3] = t[0];
          }
          r.writeFloatLE = n ? i : o, r.writeFloatBE = n ? o : i;
          function s(a, l) {
            return t[0] = a[l],
              t[1] = a[l + 1],
              t[2] = a[l + 2],
              t[3] = a[l + 3],
              e[0];
          }
          function c(a, l) {
            return t[3] = a[l],
              t[2] = a[l + 1],
              t[1] = a[l + 2],
              t[0] = a[l + 3],
              e[0];
          }
          r.readFloatLE = n ? s : c, r.readFloatBE = n ? c : s;
        }()
        : function () {
          function e(n, i, o, s) {
            var c = i < 0 ? 1 : 0;
            if (c && (i = -i), i === 0) n(1 / i > 0 ? 0 : 2147483648, o, s);
            else if (isNaN(i)) n(2143289344, o, s);
            else if (i > 34028234663852886e22) {
              n(
                (c << 31 | 2139095040) >>> 0,
                o,
                s,
              );
            } else if (i < 11754943508222875e-54) {
              n(
                (c << 31 | Math.round(i / 1401298464324817e-60)) >>> 0,
                o,
                s,
              );
            } else {
              var a = Math.floor(Math.log(i) / Math.LN2),
                l = Math.round(i * Math.pow(2, -a) * 8388608) & 8388607;
              n((c << 31 | a + 127 << 23 | l) >>> 0, o, s);
            }
          }
          r.writeFloatLE = e.bind(null, Ut), r.writeFloatBE = e.bind(null, qt);
          function t(n, i, o) {
            var s = n(i, o),
              c = (s >> 31) * 2 + 1,
              a = s >>> 23 & 255,
              l = s & 8388607;
            return a === 255
              ? l ? NaN : c * (1 / 0)
              : a === 0
              ? c * 1401298464324817e-60 * l
              : c * Math.pow(2, a - 150) * (l + 8388608);
          }
          r.readFloatLE = t.bind(null, $t), r.readFloatBE = t.bind(null, Vt);
        }(),
        typeof Float64Array < "u"
          ? function () {
            var e = new Float64Array([-0]),
              t = new Uint8Array(e.buffer),
              n = t[7] === 128;
            function i(a, l, f) {
              e[0] = a,
                l[f] = t[0],
                l[f + 1] = t[1],
                l[f + 2] = t[2],
                l[f + 3] = t[3],
                l[f + 4] = t[4],
                l[f + 5] = t[5],
                l[f + 6] = t[6],
                l[f + 7] = t[7];
            }
            function o(a, l, f) {
              e[0] = a,
                l[f] = t[7],
                l[f + 1] = t[6],
                l[f + 2] = t[5],
                l[f + 3] = t[4],
                l[f + 4] = t[3],
                l[f + 5] = t[2],
                l[f + 6] = t[1],
                l[f + 7] = t[0];
            }
            r.writeDoubleLE = n ? i : o, r.writeDoubleBE = n ? o : i;
            function s(a, l) {
              return t[0] = a[l],
                t[1] = a[l + 1],
                t[2] = a[l + 2],
                t[3] = a[l + 3],
                t[4] = a[l + 4],
                t[5] = a[l + 5],
                t[6] = a[l + 6],
                t[7] = a[l + 7],
                e[0];
            }
            function c(a, l) {
              return t[7] = a[l],
                t[6] = a[l + 1],
                t[5] = a[l + 2],
                t[4] = a[l + 3],
                t[3] = a[l + 4],
                t[2] = a[l + 5],
                t[1] = a[l + 6],
                t[0] = a[l + 7],
                e[0];
            }
            r.readDoubleLE = n ? s : c, r.readDoubleBE = n ? c : s;
          }()
          : function () {
            function e(n, i, o, s, c, a) {
              var l = s < 0 ? 1 : 0;
              if (l && (s = -s), s === 0) {
                n(0, c, a + i), n(1 / s > 0 ? 0 : 2147483648, c, a + o);
              } else if (isNaN(s)) n(0, c, a + i), n(2146959360, c, a + o);
              else if (s > 17976931348623157e292) {
                n(0, c, a + i), n((l << 31 | 2146435072) >>> 0, c, a + o);
              } else {
                var f;
                if (s < 22250738585072014e-324) {
                  f = s / 5e-324,
                    n(f >>> 0, c, a + i),
                    n((l << 31 | f / 4294967296) >>> 0, c, a + o);
                } else {
                  var b = Math.floor(Math.log(s) / Math.LN2);
                  b === 1024 && (b = 1023),
                    f = s * Math.pow(2, -b),
                    n(f * 4503599627370496 >>> 0, c, a + i),
                    n(
                      (l << 31 | b + 1023 << 20 | f * 1048576 & 1048575) >>> 0,
                      c,
                      a + o,
                    );
                }
              }
            }
            r.writeDoubleLE = e.bind(null, Ut, 0, 4),
              r.writeDoubleBE = e.bind(null, qt, 4, 0);
            function t(n, i, o, s, c) {
              var a = n(s, c + i),
                l = n(s, c + o),
                f = (l >> 31) * 2 + 1,
                b = l >>> 20 & 2047,
                k = 4294967296 * (l & 1048575) + a;
              return b === 2047
                ? k ? NaN : f * (1 / 0)
                : b === 0
                ? f * 5e-324 * k
                : f * Math.pow(2, b - 1075) * (k + 4503599627370496);
            }
            r.readDoubleLE = t.bind(null, $t, 0, 4),
              r.readDoubleBE = t.bind(null, Vt, 4, 0);
          }(),
        r;
    }
    function Ut(r, e, t) {
      e[t] = r & 255,
        e[t + 1] = r >>> 8 & 255,
        e[t + 2] = r >>> 16 & 255,
        e[t + 3] = r >>> 24;
    }
    function qt(r, e, t) {
      e[t] = r >>> 24,
        e[t + 1] = r >>> 16 & 255,
        e[t + 2] = r >>> 8 & 255,
        e[t + 3] = r & 255;
    }
    function $t(r, e) {
      return (r[e] | r[e + 1] << 8 | r[e + 2] << 16 | r[e + 3] << 24) >>> 0;
    }
    function Vt(r, e) {
      return (r[e] << 24 | r[e + 1] << 16 | r[e + 2] << 8 | r[e + 3]) >>> 0;
    }
  });
  var Ht = m((exports, module) => {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length)) return mod;
      } catch (r) {}
      return null;
    }
  });
  var Gt = m((Qt) => {
    "use strict";
    var Pe = Qt;
    Pe.length = function (e) {
      for (var t = 0, n = 0, i = 0; i < e.length; ++i) {
        n = e.charCodeAt(i),
          n < 128
            ? t += 1
            : n < 2048
            ? t += 2
            : (n & 64512) === 55296 && (e.charCodeAt(i + 1) & 64512) === 56320
            ? (++i, t += 4)
            : t += 3;
      }
      return t;
    };
    Pe.read = function (e, t, n) {
      var i = n - t;
      if (i < 1) return "";
      for (var o = null, s = [], c = 0, a; t < n;) {
        a = e[t++],
          a < 128
            ? s[c++] = a
            : a > 191 && a < 224
            ? s[c++] = (a & 31) << 6 | e[t++] & 63
            : a > 239 && a < 365
            ? (a = ((a & 7) << 18 | (e[t++] & 63) << 12 | (e[t++] & 63) << 6 |
              e[t++] & 63) - 65536,
              s[c++] = 55296 + (a >> 10),
              s[c++] = 56320 + (a & 1023))
            : s[c++] = (a & 15) << 12 | (e[t++] & 63) << 6 | e[t++] & 63,
          c > 8191 &&
          ((o || (o = [])).push(String.fromCharCode.apply(String, s)), c = 0);
      }
      return o
        ? (c && o.push(String.fromCharCode.apply(String, s.slice(0, c))),
          o.join(""))
        : String.fromCharCode.apply(String, s.slice(0, c));
    };
    Pe.write = function (e, t, n) {
      for (var i = n, o, s, c = 0; c < e.length; ++c) {
        o = e.charCodeAt(c),
          o < 128
            ? t[n++] = o
            : o < 2048
            ? (t[n++] = o >> 6 | 192, t[n++] = o & 63 | 128)
            : (o & 64512) === 55296 &&
                ((s = e.charCodeAt(c + 1)) & 64512) === 56320
            ? (o = 65536 + ((o & 1023) << 10) + (s & 1023),
              ++c,
              t[n++] = o >> 18 | 240,
              t[n++] = o >> 12 & 63 | 128,
              t[n++] = o >> 6 & 63 | 128,
              t[n++] = o & 63 | 128)
            : (t[n++] = o >> 12 | 224,
              t[n++] = o >> 6 & 63 | 128,
              t[n++] = o & 63 | 128);
      }
      return n - i;
    };
  });
  var Zt = m((ko, Xt) => {
    "use strict";
    Xt.exports = Ln;
    function Ln(r, e, t) {
      var n = t || 8192, i = n >>> 1, o = null, s = n;
      return function (a) {
        if (a < 1 || a > i) return r(a);
        s + a > n && (o = r(n), s = 0);
        var l = e.call(o, s, s += a);
        return s & 7 && (s = (s | 7) + 1), l;
      };
    }
  });
  var Kt = m((To, Yt) => {
    "use strict";
    Yt.exports = w;
    var de = J();
    function w(r, e) {
      this.lo = r >>> 0, this.hi = e >>> 0;
    }
    var X = w.zero = new w(0, 0);
    X.toNumber = function () {
      return 0;
    };
    X.zzEncode = X.zzDecode = function () {
      return this;
    };
    X.length = function () {
      return 1;
    };
    var Mn = w.zeroHash = "\0\0\0\0\0\0\0\0";
    w.fromNumber = function (e) {
      if (e === 0) return X;
      var t = e < 0;
      t && (e = -e);
      var n = e >>> 0, i = (e - n) / 4294967296 >>> 0;
      return t &&
        (i = ~i >>> 0,
          n = ~n >>> 0,
          ++n > 4294967295 && (n = 0, ++i > 4294967295 && (i = 0))),
        new w(n, i);
    };
    w.from = function (e) {
      if (typeof e == "number") return w.fromNumber(e);
      if (de.isString(e)) {
        if (de.Long) e = de.Long.fromString(e);
        else return w.fromNumber(parseInt(e, 10));
      }
      return e.low || e.high ? new w(e.low >>> 0, e.high >>> 0) : X;
    };
    w.prototype.toNumber = function (e) {
      if (!e && this.hi >>> 31) {
        var t = ~this.lo + 1 >>> 0, n = ~this.hi >>> 0;
        return t || (n = n + 1 >>> 0), -(t + n * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    w.prototype.toLong = function (e) {
      return de.Long
        ? new de.Long(this.lo | 0, this.hi | 0, Boolean(e))
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(e) };
    };
    var W = String.prototype.charCodeAt;
    w.fromHash = function (e) {
      return e === Mn ? X : new w(
        (W.call(e, 0) | W.call(e, 1) << 8 | W.call(e, 2) << 16 |
          W.call(e, 3) << 24) >>> 0,
        (W.call(e, 4) | W.call(e, 5) << 8 | W.call(e, 6) << 16 |
          W.call(e, 7) << 24) >>> 0,
      );
    };
    w.prototype.toHash = function () {
      return String.fromCharCode(
        this.lo & 255,
        this.lo >>> 8 & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24,
        this.hi & 255,
        this.hi >>> 8 & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24,
      );
    };
    w.prototype.zzEncode = function () {
      var e = this.hi >> 31;
      return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0,
        this.lo = (this.lo << 1 ^ e) >>> 0,
        this;
    };
    w.prototype.zzDecode = function () {
      var e = -(this.lo & 1);
      return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0,
        this.hi = (this.hi >>> 1 ^ e) >>> 0,
        this;
    };
    w.prototype.length = function () {
      var e = this.lo,
        t = (this.lo >>> 28 | this.hi << 4) >>> 0,
        n = this.hi >>> 24;
      return n === 0
        ? t === 0
          ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4
          : t < 16384
          ? t < 128 ? 5 : 6
          : t < 2097152
          ? 7
          : 8
        : n < 128
        ? 9
        : 10;
    };
  });
  var J = m((Re) => {
    "use strict";
    var u = Re;
    u.asPromise = Ct();
    u.base64 = jt();
    u.EventEmitter = Pt();
    u.float = Jt();
    u.inquire = Ht();
    u.utf8 = Gt();
    u.pool = Zt();
    u.LongBits = Kt();
    u.isNode = Boolean(
      typeof global < "u" && global && global.process &&
        global.process.versions && global.process.versions.node,
    );
    u.global = u.isNode && global || typeof window < "u" && window ||
      typeof self < "u" && self || Re;
    u.emptyArray = Object.freeze ? Object.freeze([]) : [];
    u.emptyObject = Object.freeze ? Object.freeze({}) : {};
    u.isInteger = Number.isInteger || function (e) {
      return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
    };
    u.isString = function (e) {
      return typeof e == "string" || e instanceof String;
    };
    u.isObject = function (e) {
      return e && typeof e == "object";
    };
    u.isset = u.isSet = function (e, t) {
      var n = e[t];
      return n != null && e.hasOwnProperty(t)
        ? typeof n != "object" ||
          (Array.isArray(n) ? n.length : Object.keys(n).length) > 0
        : !1;
    };
    u.Buffer = function () {
      try {
        var r = u.inquire("buffer").Buffer;
        return r.prototype.utf8Write ? r : null;
      } catch {
        return null;
      }
    }();
    u._Buffer_from = null;
    u._Buffer_allocUnsafe = null;
    u.newBuffer = function (e) {
      return typeof e == "number"
        ? u.Buffer ? u._Buffer_allocUnsafe(e) : new u.Array(e)
        : u.Buffer
        ? u._Buffer_from(e)
        : typeof Uint8Array > "u"
        ? e
        : new Uint8Array(e);
    };
    u.Array = typeof Uint8Array < "u" ? Uint8Array : Array;
    u.Long = u.global.dcodeIO && u.global.dcodeIO.Long || u.global.Long ||
      u.inquire("long");
    u.key2Re = /^true|false|0|1$/;
    u.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    u.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    u.longToHash = function (e) {
      return e ? u.LongBits.from(e).toHash() : u.LongBits.zeroHash;
    };
    u.longFromHash = function (e, t) {
      var n = u.LongBits.fromHash(e);
      return u.Long ? u.Long.fromBits(n.lo, n.hi, t) : n.toNumber(Boolean(t));
    };
    function er(r, e, t) {
      for (var n = Object.keys(e), i = 0; i < n.length; ++i) {
        (r[n[i]] === void 0 || !t) && (r[n[i]] = e[n[i]]);
      }
      return r;
    }
    u.merge = er;
    u.lcFirst = function (e) {
      return e.charAt(0).toLowerCase() + e.substring(1);
    };
    function tr(r) {
      function e(t, n) {
        if (!(this instanceof e)) return new e(t, n);
        Object.defineProperty(this, "message", {
          get: function () {
            return t;
          },
        }),
          Error.captureStackTrace
            ? Error.captureStackTrace(this, e)
            : Object.defineProperty(this, "stack", {
              value: new Error().stack || "",
            }),
          n && er(this, n);
      }
      return (e.prototype = Object.create(Error.prototype)).constructor = e,
        Object.defineProperty(e.prototype, "name", {
          get: function () {
            return r;
          },
        }),
        e.prototype.toString = function () {
          return this.name + ": " + this.message;
        },
        e;
    }
    u.newError = tr;
    u.ProtocolError = tr("ProtocolError");
    u.oneOfGetter = function (e) {
      for (var t = {}, n = 0; n < e.length; ++n) t[e[n]] = 1;
      return function () {
        for (var i = Object.keys(this), o = i.length - 1; o > -1; --o) {
          if (t[i[o]] === 1 && this[i[o]] !== void 0 && this[i[o]] !== null) {
            return i[o];
          }
        }
      };
    };
    u.oneOfSetter = function (e) {
      return function (t) {
        for (var n = 0; n < e.length; ++n) e[n] !== t && delete this[e[n]];
      };
    };
    u.toJSONOptions = { longs: String, enums: String, bytes: String, json: !0 };
    u._configure = function () {
      var r = u.Buffer;
      if (!r) {
        u._Buffer_from = u._Buffer_allocUnsafe = null;
        return;
      }
      u._Buffer_from = r.from !== Uint8Array.from && r.from || function (t, n) {
        return new r(t, n);
      },
        u._Buffer_allocUnsafe = r.allocUnsafe || function (t) {
          return new r(t);
        };
    };
  });
  var He = m((Oo, or) => {
    "use strict";
    or.exports = p;
    var _ = J(), Ue, Ee = _.LongBits, rr = _.base64, nr = _.utf8;
    function ye(r, e, t) {
      this.fn = r, this.len = e, this.next = void 0, this.val = t;
    }
    function $e() {}
    function jn(r) {
      this.head = r.head,
        this.tail = r.tail,
        this.len = r.len,
        this.next = r.states;
    }
    function p() {
      this.len = 0,
        this.head = new ye($e, 0, 0),
        this.tail = this.head,
        this.states = null;
    }
    var ir = function () {
      return _.Buffer
        ? function () {
          return (p.create = function () {
            return new Ue();
          })();
        }
        : function () {
          return new p();
        };
    };
    p.create = ir();
    p.alloc = function (e) {
      return new _.Array(e);
    };
    _.Array !== Array &&
      (p.alloc = _.pool(p.alloc, _.Array.prototype.subarray));
    p.prototype._push = function (e, t, n) {
      return this.tail = this.tail.next = new ye(e, t, n), this.len += t, this;
    };
    function Ve(r, e, t) {
      e[t] = r & 255;
    }
    function Fn(r, e, t) {
      for (; r > 127;) e[t++] = r & 127 | 128, r >>>= 7;
      e[t] = r;
    }
    function We(r, e) {
      this.len = r, this.next = void 0, this.val = e;
    }
    We.prototype = Object.create(ye.prototype);
    We.prototype.fn = Fn;
    p.prototype.uint32 = function (e) {
      return this.len += (this.tail = this.tail.next = new We(
        (e = e >>> 0) < 128
          ? 1
          : e < 16384
          ? 2
          : e < 2097152
          ? 3
          : e < 268435456
          ? 4
          : 5,
        e,
      )).len,
        this;
    };
    p.prototype.int32 = function (e) {
      return e < 0 ? this._push(Je, 10, Ee.fromNumber(e)) : this.uint32(e);
    };
    p.prototype.sint32 = function (e) {
      return this.uint32((e << 1 ^ e >> 31) >>> 0);
    };
    function Je(r, e, t) {
      for (; r.hi;) {
        e[t++] = r.lo & 127 | 128,
          r.lo = (r.lo >>> 7 | r.hi << 25) >>> 0,
          r.hi >>>= 7;
      }
      for (; r.lo > 127;) e[t++] = r.lo & 127 | 128, r.lo = r.lo >>> 7;
      e[t++] = r.lo;
    }
    p.prototype.uint64 = function (e) {
      var t = Ee.from(e);
      return this._push(Je, t.length(), t);
    };
    p.prototype.int64 = p.prototype.uint64;
    p.prototype.sint64 = function (e) {
      var t = Ee.from(e).zzEncode();
      return this._push(Je, t.length(), t);
    };
    p.prototype.bool = function (e) {
      return this._push(Ve, 1, e ? 1 : 0);
    };
    function qe(r, e, t) {
      e[t] = r & 255,
        e[t + 1] = r >>> 8 & 255,
        e[t + 2] = r >>> 16 & 255,
        e[t + 3] = r >>> 24;
    }
    p.prototype.fixed32 = function (e) {
      return this._push(qe, 4, e >>> 0);
    };
    p.prototype.sfixed32 = p.prototype.fixed32;
    p.prototype.fixed64 = function (e) {
      var t = Ee.from(e);
      return this._push(qe, 4, t.lo)._push(qe, 4, t.hi);
    };
    p.prototype.sfixed64 = p.prototype.fixed64;
    p.prototype.float = function (e) {
      return this._push(_.float.writeFloatLE, 4, e);
    };
    p.prototype.double = function (e) {
      return this._push(_.float.writeDoubleLE, 8, e);
    };
    var Pn = _.Array.prototype.set
      ? function (e, t, n) {
        t.set(e, n);
      }
      : function (e, t, n) {
        for (var i = 0; i < e.length; ++i) t[n + i] = e[i];
      };
    p.prototype.bytes = function (e) {
      var t = e.length >>> 0;
      if (!t) return this._push(Ve, 1, 0);
      if (_.isString(e)) {
        var n = p.alloc(t = rr.length(e));
        rr.decode(e, n, 0), e = n;
      }
      return this.uint32(t)._push(Pn, t, e);
    };
    p.prototype.string = function (e) {
      var t = nr.length(e);
      return t ? this.uint32(t)._push(nr.write, t, e) : this._push(Ve, 1, 0);
    };
    p.prototype.fork = function () {
      return this.states = new jn(this),
        this.head = this.tail = new ye($e, 0, 0),
        this.len = 0,
        this;
    };
    p.prototype.reset = function () {
      return this.states
        ? (this.head = this.states.head,
          this.tail = this.states.tail,
          this.len = this.states.len,
          this.states = this.states.next)
        : (this.head = this.tail = new ye($e, 0, 0), this.len = 0),
        this;
    };
    p.prototype.ldelim = function () {
      var e = this.head, t = this.tail, n = this.len;
      return this.reset().uint32(n),
        n && (this.tail.next = e.next, this.tail = t, this.len += n),
        this;
    };
    p.prototype.finish = function () {
      for (
        var e = this.head.next, t = this.constructor.alloc(this.len), n = 0;
        e;
      ) {
        e.fn(e.val, t, n), n += e.len, e = e.next;
      }
      return t;
    };
    p._configure = function (r) {
      Ue = r, p.create = ir(), Ue._configure();
    };
  });
  var cr = m((zo, ar) => {
    "use strict";
    ar.exports = j;
    var sr = He();
    (j.prototype = Object.create(sr.prototype)).constructor = j;
    var H = J();
    function j() {
      sr.call(this);
    }
    j._configure = function () {
      j.alloc = H._Buffer_allocUnsafe,
        j.writeBytesBuffer =
          H.Buffer && H.Buffer.prototype instanceof Uint8Array &&
            H.Buffer.prototype.set.name === "set"
            ? function (e, t, n) {
              t.set(e, n);
            }
            : function (e, t, n) {
              if (e.copy) e.copy(t, n, 0, e.length);
              else for (var i = 0; i < e.length;) t[n++] = e[i++];
            };
    };
    j.prototype.bytes = function (e) {
      H.isString(e) && (e = H._Buffer_from(e, "base64"));
      var t = e.length >>> 0;
      return this.uint32(t), t && this._push(j.writeBytesBuffer, t, e), this;
    };
    function Rn(r, e, t) {
      r.length < 40
        ? H.utf8.write(r, e, t)
        : e.utf8Write
        ? e.utf8Write(r, t)
        : e.write(r, t);
    }
    j.prototype.string = function (e) {
      var t = H.Buffer.byteLength(e);
      return this.uint32(t), t && this._push(Rn, t, e), this;
    };
    j._configure();
  });
  var Xe = m((Bo, pr) => {
    "use strict";
    pr.exports = g;
    var F = J(), Ge, ur = F.LongBits, Un = F.utf8;
    function A(r, e) {
      return RangeError(
        "index out of range: " + r.pos + " + " + (e || 1) + " > " + r.len,
      );
    }
    function g(r) {
      this.buf = r, this.pos = 0, this.len = r.length;
    }
    var lr = typeof Uint8Array < "u"
        ? function (e) {
          if (e instanceof Uint8Array || Array.isArray(e)) return new g(e);
          throw Error("illegal buffer");
        }
        : function (e) {
          if (Array.isArray(e)) return new g(e);
          throw Error("illegal buffer");
        },
      hr = function () {
        return F.Buffer
          ? function (t) {
            return (g.create = function (i) {
              return F.Buffer.isBuffer(i) ? new Ge(i) : lr(i);
            })(t);
          }
          : lr;
      };
    g.create = hr();
    g.prototype._slice = F.Array.prototype.subarray || F.Array.prototype.slice;
    g.prototype.uint32 = function () {
      var e = 4294967295;
      return function () {
        if (
          e = (this.buf[this.pos] & 127) >>> 0,
            this.buf[this.pos++] < 128 ||
            (e = (e | (this.buf[this.pos] & 127) << 7) >>> 0,
              this.buf[this.pos++] < 128) ||
            (e = (e | (this.buf[this.pos] & 127) << 14) >>> 0,
              this.buf[this.pos++] < 128) ||
            (e = (e | (this.buf[this.pos] & 127) << 21) >>> 0,
              this.buf[this.pos++] < 128) ||
            (e = (e | (this.buf[this.pos] & 15) << 28) >>> 0,
              this.buf[this.pos++] < 128)
        ) {
          return e;
        }
        if ((this.pos += 5) > this.len) throw this.pos = this.len, A(this, 10);
        return e;
      };
    }();
    g.prototype.int32 = function () {
      return this.uint32() | 0;
    };
    g.prototype.sint32 = function () {
      var e = this.uint32();
      return e >>> 1 ^ -(e & 1) | 0;
    };
    function Qe() {
      var r = new ur(0, 0), e = 0;
      if (this.len - this.pos > 4) {
        for (; e < 4; ++e) {
          if (
            r.lo = (r.lo | (this.buf[this.pos] & 127) << e * 7) >>> 0,
              this.buf[this.pos++] < 128
          ) {
            return r;
          }
        }
        if (
          r.lo = (r.lo | (this.buf[this.pos] & 127) << 28) >>> 0,
            r.hi = (r.hi | (this.buf[this.pos] & 127) >> 4) >>> 0,
            this.buf[this.pos++] < 128
        ) {
          return r;
        }
        e = 0;
      } else {
        for (; e < 3; ++e) {
          if (this.pos >= this.len) throw A(this);
          if (
            r.lo = (r.lo | (this.buf[this.pos] & 127) << e * 7) >>> 0,
              this.buf[this.pos++] < 128
          ) {
            return r;
          }
        }
        return r.lo = (r.lo | (this.buf[this.pos++] & 127) << e * 7) >>> 0, r;
      }
      if (this.len - this.pos > 4) {
        for (; e < 5; ++e) {
          if (
            r.hi = (r.hi | (this.buf[this.pos] & 127) << e * 7 + 3) >>> 0,
              this.buf[this.pos++] < 128
          ) {
            return r;
          }
        }
      } else {
        for (; e < 5; ++e) {
          if (this.pos >= this.len) throw A(this);
          if (
            r.hi = (r.hi | (this.buf[this.pos] & 127) << e * 7 + 3) >>> 0,
              this.buf[this.pos++] < 128
          ) {
            return r;
          }
        }
      }
      throw Error("invalid varint encoding");
    }
    g.prototype.bool = function () {
      return this.uint32() !== 0;
    };
    function De(r, e) {
      return (r[e - 4] | r[e - 3] << 8 | r[e - 2] << 16 | r[e - 1] << 24) >>> 0;
    }
    g.prototype.fixed32 = function () {
      if (this.pos + 4 > this.len) throw A(this, 4);
      return De(this.buf, this.pos += 4);
    };
    g.prototype.sfixed32 = function () {
      if (this.pos + 4 > this.len) throw A(this, 4);
      return De(this.buf, this.pos += 4) | 0;
    };
    function fr() {
      if (this.pos + 8 > this.len) throw A(this, 8);
      return new ur(De(this.buf, this.pos += 4), De(this.buf, this.pos += 4));
    }
    g.prototype.float = function () {
      if (this.pos + 4 > this.len) throw A(this, 4);
      var e = F.float.readFloatLE(this.buf, this.pos);
      return this.pos += 4, e;
    };
    g.prototype.double = function () {
      if (this.pos + 8 > this.len) throw A(this, 4);
      var e = F.float.readDoubleLE(this.buf, this.pos);
      return this.pos += 8, e;
    };
    g.prototype.bytes = function () {
      var e = this.uint32(), t = this.pos, n = this.pos + e;
      if (n > this.len) throw A(this, e);
      return this.pos += e,
        Array.isArray(this.buf)
          ? this.buf.slice(t, n)
          : t === n
          ? new this.buf.constructor(0)
          : this._slice.call(this.buf, t, n);
    };
    g.prototype.string = function () {
      var e = this.bytes();
      return Un.read(e, 0, e.length);
    };
    g.prototype.skip = function (e) {
      if (typeof e == "number") {
        if (this.pos + e > this.len) throw A(this, e);
        this.pos += e;
      } else {
        do if (this.pos >= this.len) throw A(this); while (
          this.buf[this.pos++] & 128
        );
      }
      return this;
    };
    g.prototype.skipType = function (r) {
      switch (r) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          for (; (r = this.uint32() & 7) !== 4;) this.skipType(r);
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + r + " at offset " + this.pos);
      }
      return this;
    };
    g._configure = function (r) {
      Ge = r, g.create = hr(), Ge._configure();
      var e = F.Long ? "toLong" : "toNumber";
      F.merge(g.prototype, {
        int64: function () {
          return Qe.call(this)[e](!1);
        },
        uint64: function () {
          return Qe.call(this)[e](!0);
        },
        sint64: function () {
          return Qe.call(this).zzDecode()[e](!1);
        },
        fixed64: function () {
          return fr.call(this)[e](!0);
        },
        sfixed64: function () {
          return fr.call(this)[e](!1);
        },
      });
    };
  });
  var gr = m((Ao, mr) => {
    "use strict";
    mr.exports = Z;
    var yr = Xe();
    (Z.prototype = Object.create(yr.prototype)).constructor = Z;
    var dr = J();
    function Z(r) {
      yr.call(this, r);
    }
    Z._configure = function () {
      dr.Buffer && (Z.prototype._slice = dr.Buffer.prototype.slice);
    };
    Z.prototype.string = function () {
      var e = this.uint32();
      return this.buf.utf8Slice
        ? this.buf.utf8Slice(
          this.pos,
          this.pos = Math.min(this.pos + e, this.len),
        )
        : this.buf.toString(
          "utf-8",
          this.pos,
          this.pos = Math.min(this.pos + e, this.len),
        );
    };
    Z._configure();
  });
  var wr = m((Io, br) => {
    "use strict";
    br.exports = me;
    var Ze = J();
    (me.prototype = Object.create(Ze.EventEmitter.prototype)).constructor = me;
    function me(r, e, t) {
      if (typeof r != "function") throw TypeError("rpcImpl must be a function");
      Ze.EventEmitter.call(this),
        this.rpcImpl = r,
        this.requestDelimited = Boolean(e),
        this.responseDelimited = Boolean(t);
    }
    me.prototype.rpcCall = function r(e, t, n, i, o) {
      if (!i) throw TypeError("request must be specified");
      var s = this;
      if (!o) return Ze.asPromise(r, s, e, t, n, i);
      if (!s.rpcImpl) {
        setTimeout(function () {
          o(Error("already ended"));
        }, 0);
        return;
      }
      try {
        return s.rpcImpl(
          e,
          t[s.requestDelimited ? "encodeDelimited" : "encode"](i).finish(),
          function (a, l) {
            if (a) return s.emit("error", a, e), o(a);
            if (l === null) {
              s.end(!0);
              return;
            }
            if (!(l instanceof n)) {
              try {
                l = n[s.responseDelimited ? "decodeDelimited" : "decode"](l);
              } catch (f) {
                return s.emit("error", f, e), o(f);
              }
            }
            return s.emit("data", l, e), o(null, l);
          },
        );
      } catch (c) {
        s.emit("error", c, e),
          setTimeout(function () {
            o(c);
          }, 0);
        return;
      }
    };
    me.prototype.end = function (e) {
      return this.rpcImpl &&
        (e || this.rpcImpl(null, null, null),
          this.rpcImpl = null,
          this.emit("end").off()),
        this;
    };
  });
  var xr = m((Sr) => {
    "use strict";
    var qn = Sr;
    qn.Service = wr();
  });
  var Er = m((No, vr) => {
    "use strict";
    vr.exports = {};
  });
  var Tr = m((kr) => {
    "use strict";
    var E = kr;
    E.build = "minimal";
    E.Writer = He();
    E.BufferWriter = cr();
    E.Reader = Xe();
    E.BufferReader = gr();
    E.util = J();
    E.rpc = xr();
    E.roots = Er();
    E.configure = Dr;
    function Dr() {
      E.util._configure(),
        E.Writer._configure(E.BufferWriter),
        E.Reader._configure(E.BufferReader);
    }
    Dr();
  });
  var Or = m((Mo, _r) => {
    "use strict";
    _r.exports = Tr();
  });
  var Cr = m((qo, Ir) => {
    "use strict";
    function Wn(r) {
      let [e, t] = r[Symbol.asyncIterator]
          ? [r[Symbol.asyncIterator](), Symbol.asyncIterator]
          : [r[Symbol.iterator](), Symbol.iterator],
        n = [];
      return {
        peek: () => e.next(),
        push: (i) => {
          n.push(i);
        },
        next: () => n.length ? { done: !1, value: n.shift() } : e.next(),
        [t]() {
          return this;
        },
      };
    }
    Ir.exports = Wn;
  });
  var at = (r) => {
      let { name: e, message: t, stack: n, code: i, detail: o } = r;
      return { name: e, message: t, stack: n, code: i, detail: o };
    },
    K = (r) => {
      if (r instanceof Error) return r;
      {
        let { name: e, message: t, stack: n, code: i } = r;
        return Object.assign(Gr(e, t), { name: e, stack: n, code: i });
      }
    },
    Gr = (r, e) => {
      switch (r) {
        case "RangeError":
          return new RangeError(e);
        case "ReferenceError":
          return ReferenceError(e);
        case "SyntaxError":
          return new SyntaxError(e);
        case "TypeError":
          return new TypeError(e);
        case "URIError":
          return new URIError(e);
        default:
          return new Error(e);
      }
    };
  var ze = class extends Error {
      get name() {
        return this.constructor.name;
      }
    },
    Be = class extends Error {
      get name() {
        return this.constructor.name;
      }
    },
    Ae = class extends Error {
      get name() {
        return this.constructor.name;
      }
    };
  var V = class {
    constructor(e) {
      this.port = null,
        this.id = Math.random().toString(32).slice(2),
        this.nextID = 0,
        this.queries = Object.create(null),
        e && this.connect(e);
    }
    execute(e) {
      let t = `${this.id}@${this.nextID++}`;
      return this.queries[t] = e,
        e.timeout > 0 && e.timeout < 1 / 0 &&
        (e.timerID = setTimeout(V.timeout, e.timeout, this, t)),
        e.signal &&
        e.signal.addEventListener("abort", () => this.abort(t), { once: !0 }),
        this.port && V.postQuery(this.port, t, e),
        e.result;
    }
    connect(e) {
      if (this.port) throw new Error("Transport is already open");
      this.port = e,
        this.port.addEventListener("message", this),
        this.port.start();
      for (let [t, n] of Object.entries(this.queries)) V.postQuery(e, t, n);
    }
    disconnect() {
      let e = new Ae();
      for (let [t, n] of Object.entries(this.queries)) n.fail(e), this.abort(t);
      this.port &&
        (this.port.removeEventListener("message", this), this.port.close());
    }
    static timeout(e, t) {
      let { queries: n } = e, i = n[t];
      i &&
        (delete n[t],
          i.fail(new ze("request timed out")),
          e.port && e.port.postMessage({ type: "abort", id: t }));
    }
    abort(e) {
      let { queries: t } = this, n = t[e];
      n &&
        (delete t[e],
          n.fail(new Be()),
          this.port && this.port.postMessage({ type: "abort", id: e }),
          n.timerID != null && clearTimeout(n.timerID));
    }
    static postQuery(e, t, n) {
      e.postMessage({
        type: "query",
        namespace: n.namespace,
        method: n.method,
        id: t,
        input: n.toJSON(),
      }, n.transfer());
    }
    handleEvent(e) {
      let { id: t, result: n } = e.data, i = this.queries[t];
      i &&
        (delete this.queries[t],
          n.ok ? i.succeed(n.value) : i.fail(K(n.error)),
          i.timerID != null && clearTimeout(i.timerID));
    }
  };
  var Ie = class {
    constructor(e, t, n) {
      this.result = new Promise((i, o) => {
        this.succeed = i,
          this.fail = o,
          this.signal = n.signal,
          this.input = n,
          this.namespace = e,
          this.method = t,
          this.timeout = n.timeout == null ? 1 / 0 : n.timeout,
          this.timerID = null;
      });
    }
    toJSON() {
      return this.input;
    }
    transfer() {
      return this.input.transfer;
    }
  };
  var Ce = class {
    constructor(e, t, n) {
      this.transport = n;
      let i = this;
      for (let o of t) {
        i[o] = (s) => this.transport.execute(new Ie(e, o.toString(), s));
      }
    }
  };
  var R = class {
    constructor(e, t, n) {
      this.remote = new Ce(e, t, n);
    }
  };
  var Xr = ft, ct = 128, Zr = 127, Yr = ~Zr, Kr = Math.pow(2, 31);
  function ft(r, e, t) {
    e = e || [], t = t || 0;
    for (var n = t; r >= Kr;) e[t++] = r & 255 | ct, r /= 128;
    for (; r & Yr;) e[t++] = r & 255 | ct, r >>>= 7;
    return e[t] = r | 0, ft.bytes = t - n + 1, e;
  }
  var en = Ne, tn = 128, lt = 127;
  function Ne(r, n) {
    var t = 0, n = n || 0, i = 0, o = n, s, c = r.length;
    do {
      if (o >= c) throw Ne.bytes = 0, new RangeError("Could not decode varint");
      s = r[o++],
        t += i < 28 ? (s & lt) << i : (s & lt) * Math.pow(2, i),
        i += 7;
    } while (s >= tn);
    return Ne.bytes = o - n, t;
  }
  var rn = Math.pow(2, 7),
    nn = Math.pow(2, 14),
    on = Math.pow(2, 21),
    sn = Math.pow(2, 28),
    an = Math.pow(2, 35),
    cn = Math.pow(2, 42),
    ln = Math.pow(2, 49),
    fn = Math.pow(2, 56),
    un = Math.pow(2, 63),
    hn = function (r) {
      return r < rn
        ? 1
        : r < nn
        ? 2
        : r < on
        ? 3
        : r < sn
        ? 4
        : r < an
        ? 5
        : r < cn
        ? 6
        : r < ln
        ? 7
        : r < fn
        ? 8
        : r < un
        ? 9
        : 10;
    },
    pn = { encode: Xr, decode: en, encodingLength: hn },
    dn = pn,
    le = dn;
  var fe = (r) => [le.decode(r), le.decode.bytes],
    ee = (r, e, t = 0) => (le.encode(r, e, t), e),
    te = (r) => le.encodingLength(r);
  var Bi = new Uint8Array(0);
  var ht = (r, e) => {
      if (r === e) return !0;
      if (r.byteLength !== e.byteLength) return !1;
      for (let t = 0; t < r.byteLength; t++) if (r[t] !== e[t]) return !1;
      return !0;
    },
    re = (r) => {
      if (
        r instanceof Uint8Array && r.constructor.name === "Uint8Array"
      ) {
        return r;
      }
      if (r instanceof ArrayBuffer) return new Uint8Array(r);
      if (ArrayBuffer.isView(r)) {
        return new Uint8Array(
          r.buffer,
          r.byteOffset,
          r.byteLength,
        );
      }
      throw new Error("Unknown type, must be binary type");
    };
  var pt = (r, e) => {
      let t = e.byteLength, n = te(r), i = n + te(t), o = new Uint8Array(i + t);
      return ee(r, o, 0), ee(t, o, n), o.set(e, i), new ue(r, t, e, o);
    },
    dt = (r) => {
      let e = re(r),
        [t, n] = fe(e),
        [i, o] = fe(e.subarray(n)),
        s = e.subarray(n + o);
      if (s.byteLength !== i) throw new Error("Incorrect length");
      return new ue(t, i, s, e);
    },
    yt = (r, e) =>
      r === e
        ? !0
        : r.code === e.code && r.size === e.size && ht(r.bytes, e.bytes),
    ue = class {
      constructor(e, t, n, i) {
        this.code = e, this.size = t, this.digest = n, this.bytes = i;
      }
    };
  function mn(r, e) {
    if (r.length >= 255) throw new TypeError("Alphabet too long");
    for (var t = new Uint8Array(256), n = 0; n < t.length; n++) t[n] = 255;
    for (var i = 0; i < r.length; i++) {
      var o = r.charAt(i), s = o.charCodeAt(0);
      if (t[s] !== 255) throw new TypeError(o + " is ambiguous");
      t[s] = i;
    }
    var c = r.length,
      a = r.charAt(0),
      l = Math.log(c) / Math.log(256),
      f = Math.log(256) / Math.log(c);
    function b(d) {
      if (
        d instanceof Uint8Array ||
        (ArrayBuffer.isView(d)
          ? d = new Uint8Array(d.buffer, d.byteOffset, d.byteLength)
          : Array.isArray(d) && (d = Uint8Array.from(d))),
          !(d instanceof Uint8Array)
      ) {
        throw new TypeError("Expected Uint8Array");
      }
      if (d.length === 0) return "";
      for (var x = 0, Q = 0, O = 0, I = d.length; O !== I && d[O] === 0;) {
        O++, x++;
      }
      for (var C = (I - O) * f + 1 >>> 0, T = new Uint8Array(C); O !== I;) {
        for (
          var N = d[O], $ = 0, z = C - 1;
          (N !== 0 || $ < Q) && z !== -1;
          z--, $++
        ) {
          N += 256 * T[z] >>> 0, T[z] = N % c >>> 0, N = N / c >>> 0;
        }
        if (N !== 0) throw new Error("Non-zero carry");
        Q = $, O++;
      }
      for (var P = C - Q; P !== C && T[P] === 0;) P++;
      for (var ge = a.repeat(x); P < C; ++P) ge += r.charAt(T[P]);
      return ge;
    }
    function k(d) {
      if (typeof d != "string") throw new TypeError("Expected String");
      if (d.length === 0) return new Uint8Array();
      var x = 0;
      if (d[x] !== " ") {
        for (var Q = 0, O = 0; d[x] === a;) Q++, x++;
        for (
          var I = (d.length - x) * l + 1 >>> 0, C = new Uint8Array(I);
          d[x];
        ) {
          var T = t[d.charCodeAt(x)];
          if (T === 255) return;
          for (
            var N = 0, $ = I - 1;
            (T !== 0 || N < O) && $ !== -1;
            $--, N++
          ) {
            T += c * C[$] >>> 0, C[$] = T % 256 >>> 0, T = T / 256 >>> 0;
          }
          if (T !== 0) throw new Error("Non-zero carry");
          O = N, x++;
        }
        if (d[x] !== " ") {
          for (var z = I - O; z !== I && C[z] === 0;) z++;
          for (var P = new Uint8Array(Q + (I - z)), ge = Q; z !== I;) {
            P[ge++] = C[z++];
          }
          return P;
        }
      }
    }
    function Ur(d) {
      var x = k(d);
      if (x) return x;
      throw new Error(`Non-${e} character`);
    }
    return { encode: b, decodeUnsafe: k, decode: Ur };
  }
  var gn = mn, bn = gn, mt = bn;
  var gt = class {
      constructor(e, t, n) {
        this.name = e, this.prefix = t, this.baseEncode = n;
      }
      encode(e) {
        if (e instanceof Uint8Array) {
          return `${this.prefix}${this.baseEncode(e)}`;
        }
        throw Error("Unknown type, must be binary type");
      }
    },
    bt = class {
      constructor(e, t, n) {
        this.name = e, this.prefix = t, this.baseDecode = n;
      }
      decode(e) {
        if (typeof e == "string") {
          switch (e[0]) {
            case this.prefix:
              return this.baseDecode(e.slice(1));
            default:
              throw Error(
                `Unable to decode multibase string ${
                  JSON.stringify(e)
                }, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`,
              );
          }
        } else throw Error("Can only multibase decode strings");
      }
      or(e) {
        return St(this, e);
      }
    },
    wt = class {
      constructor(e) {
        this.decoders = e;
      }
      or(e) {
        return St(this, e);
      }
      decode(e) {
        let t = e[0], n = this.decoders[t];
        if (n) return n.decode(e);
        throw RangeError(
          `Unable to decode multibase string ${
            JSON.stringify(e)
          }, only inputs prefixed with ${
            Object.keys(this.decoders)
          } are supported`,
        );
      }
    },
    St = (r, e) =>
      new wt({
        ...r.decoders || { [r.prefix]: r },
        ...e.decoders || { [e.prefix]: e },
      }),
    xt = class {
      constructor(e, t, n, i) {
        this.name = e,
          this.prefix = t,
          this.baseEncode = n,
          this.baseDecode = i,
          this.encoder = new gt(e, t, n),
          this.decoder = new bt(e, t, i);
      }
      encode(e) {
        return this.encoder.encode(e);
      }
      decode(e) {
        return this.decoder.decode(e);
      }
    },
    vt = ({ name: r, prefix: e, encode: t, decode: n }) => new xt(r, e, t, n),
    Le = ({ prefix: r, name: e, alphabet: t }) => {
      let { encode: n, decode: i } = mt(t, e);
      return vt({ prefix: r, name: e, encode: n, decode: (o) => re(i(o)) });
    },
    wn = (r, e, t, n) => {
      let i = {};
      for (let f = 0; f < e.length; ++f) i[e[f]] = f;
      let o = r.length;
      for (; r[o - 1] === "=";) --o;
      let s = new Uint8Array(o * t / 8 | 0), c = 0, a = 0, l = 0;
      for (let f = 0; f < o; ++f) {
        let b = i[r[f]];
        if (b === void 0) throw new SyntaxError(`Non-${n} character`);
        a = a << t | b, c += t, c >= 8 && (c -= 8, s[l++] = 255 & a >> c);
      }
      if (c >= t || 255 & a << 8 - c) {
        throw new SyntaxError(
          "Unexpected end of data",
        );
      }
      return s;
    },
    Sn = (r, e, t) => {
      let n = e[e.length - 1] === "=", i = (1 << t) - 1, o = "", s = 0, c = 0;
      for (let a = 0; a < r.length; ++a) {
        for (
          c = c << 8 | r[a], s += 8;
          s > t;
        ) {
          s -= t, o += e[i & c >> s];
        }
      }
      if (s && (o += e[i & c << t - s]), n) for (; o.length * t & 7;) o += "=";
      return o;
    },
    L = ({ name: r, prefix: e, bitsPerChar: t, alphabet: n }) =>
      vt({
        prefix: e,
        name: r,
        encode(i) {
          return Sn(i, n, t);
        },
        decode(i) {
          return wn(i, n, t, r);
        },
      });
  var U = Le({
      name: "base58btc",
      prefix: "z",
      alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
    }),
    Fi = Le({
      name: "base58flickr",
      prefix: "Z",
      alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
    });
  var he = L({
      prefix: "b",
      name: "base32",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567",
      bitsPerChar: 5,
    }),
    Ui = L({
      prefix: "B",
      name: "base32upper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
      bitsPerChar: 5,
    }),
    qi = L({
      prefix: "c",
      name: "base32pad",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
      bitsPerChar: 5,
    }),
    $i = L({
      prefix: "C",
      name: "base32padupper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
      bitsPerChar: 5,
    }),
    Vi = L({
      prefix: "v",
      name: "base32hex",
      alphabet: "0123456789abcdefghijklmnopqrstuv",
      bitsPerChar: 5,
    }),
    Wi = L({
      prefix: "V",
      name: "base32hexupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
      bitsPerChar: 5,
    }),
    Ji = L({
      prefix: "t",
      name: "base32hexpad",
      alphabet: "0123456789abcdefghijklmnopqrstuv=",
      bitsPerChar: 5,
    }),
    Hi = L({
      prefix: "T",
      name: "base32hexpadupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
      bitsPerChar: 5,
    }),
    Qi = L({
      prefix: "h",
      name: "base32z",
      alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
      bitsPerChar: 5,
    });
  var y = class {
      constructor(e, t, n, i) {
        this.code = t,
          this.version = e,
          this.multihash = n,
          this.bytes = i,
          this.byteOffset = i.byteOffset,
          this.byteLength = i.byteLength,
          this.asCID = this,
          this._baseCache = new Map(),
          Object.defineProperties(this, {
            byteOffset: we,
            byteLength: we,
            code: be,
            version: be,
            multihash: be,
            bytes: be,
            _baseCache: we,
            asCID: we,
          });
      }
      toV0() {
        switch (this.version) {
          case 0:
            return this;
          default: {
            let { code: e, multihash: t } = this;
            if (e !== pe) {
              throw new Error("Cannot convert a non dag-pb CID to CIDv0");
            }
            if (t.code !== Dn) {
              throw new Error(
                "Cannot convert non sha2-256 multihash CID to CIDv0",
              );
            }
            return y.createV0(t);
          }
        }
      }
      toV1() {
        switch (this.version) {
          case 0: {
            let { code: e, digest: t } = this.multihash, n = pt(e, t);
            return y.createV1(this.code, n);
          }
          case 1:
            return this;
          default:
            throw Error(
              `Can not convert CID version ${this.version} to version 0. This is a bug please report`,
            );
        }
      }
      equals(e) {
        return e && this.code === e.code && this.version === e.version &&
          yt(this.multihash, e.multihash);
      }
      toString(e) {
        let { bytes: t, version: n, _baseCache: i } = this;
        switch (n) {
          case 0:
            return vn(t, i, e || U.encoder);
          default:
            return En(t, i, e || he.encoder);
        }
      }
      toJSON() {
        return {
          code: this.code,
          version: this.version,
          hash: this.multihash.bytes,
        };
      }
      get [Symbol.toStringTag]() {
        return "CID";
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return "CID(" + this.toString() + ")";
      }
      static isCID(e) {
        return Tn(/^0\.0/, _n), !!(e && (e[Dt] || e.asCID === e));
      }
      get toBaseEncodedString() {
        throw new Error("Deprecated, use .toString()");
      }
      get codec() {
        throw new Error(
          '"codec" property is deprecated, use integer "code" property instead',
        );
      }
      get buffer() {
        throw new Error(
          "Deprecated .buffer property, use .bytes to get Uint8Array instead",
        );
      }
      get multibaseName() {
        throw new Error('"multibaseName" property is deprecated');
      }
      get prefix() {
        throw new Error('"prefix" property is deprecated');
      }
      static asCID(e) {
        if (e instanceof y) return e;
        if (e != null && e.asCID === e) {
          let { version: t, code: n, multihash: i, bytes: o } = e;
          return new y(t, n, i, o || Et(t, n, i.bytes));
        } else if (e != null && e[Dt] === !0) {
          let { version: t, multihash: n, code: i } = e, o = dt(n);
          return y.create(t, i, o);
        } else return null;
      }
      static create(e, t, n) {
        if (typeof t != "number") {
          throw new Error("String codecs are no longer supported");
        }
        switch (e) {
          case 0: {
            if (t !== pe) {
              throw new Error(
                `Version 0 CID must use dag-pb (code: ${pe}) block encoding`,
              );
            }
            return new y(e, t, n, n.bytes);
          }
          case 1: {
            let i = Et(e, t, n.bytes);
            return new y(e, t, n, i);
          }
          default:
            throw new Error("Invalid version");
        }
      }
      static createV0(e) {
        return y.create(0, pe, e);
      }
      static createV1(e, t) {
        return y.create(1, e, t);
      }
      static decode(e) {
        let [t, n] = y.decodeFirst(e);
        if (n.length) throw new Error("Incorrect length");
        return t;
      }
      static decodeFirst(e) {
        let t = y.inspectBytes(e),
          n = t.size - t.multihashSize,
          i = re(e.subarray(n, n + t.multihashSize));
        if (i.byteLength !== t.multihashSize) {
          throw new Error("Incorrect length");
        }
        let o = i.subarray(t.multihashSize - t.digestSize),
          s = new ue(t.multihashCode, t.digestSize, o, i);
        return [
          t.version === 0 ? y.createV0(s) : y.createV1(t.codec, s),
          e.subarray(t.size),
        ];
      }
      static inspectBytes(e) {
        let t = 0,
          n = () => {
            let [b, k] = fe(e.subarray(t));
            return t += k, b;
          },
          i = n(),
          o = pe;
        if (
          i === 18 ? (i = 0, t = 0) : i === 1 && (o = n()), i !== 0 && i !== 1
        ) {
          throw new RangeError(`Invalid CID version ${i}`);
        }
        let s = t, c = n(), a = n(), l = t + a, f = l - s;
        return {
          version: i,
          codec: o,
          multihashCode: c,
          digestSize: a,
          multihashSize: f,
          size: l,
        };
      }
      static parse(e, t) {
        let [n, i] = xn(e, t), o = y.decode(i);
        return o._baseCache.set(n, e), o;
      }
    },
    xn = (r, e) => {
      switch (r[0]) {
        case "Q": {
          let t = e || U;
          return [U.prefix, t.decode(`${U.prefix}${r}`)];
        }
        case U.prefix: {
          let t = e || U;
          return [U.prefix, t.decode(r)];
        }
        case he.prefix: {
          let t = e || he;
          return [he.prefix, t.decode(r)];
        }
        default: {
          if (e == null) {
            throw Error(
              "To parse non base32 or base58btc encoded CID multibase decoder must be provided",
            );
          }
          return [r[0], e.decode(r)];
        }
      }
    },
    vn = (r, e, t) => {
      let { prefix: n } = t;
      if (n !== U.prefix) {
        throw Error(
          `Cannot string encode V0 in ${t.name} encoding`,
        );
      }
      let i = e.get(n);
      if (i == null) {
        let o = t.encode(r).slice(1);
        return e.set(n, o), o;
      } else return i;
    },
    En = (r, e, t) => {
      let { prefix: n } = t, i = e.get(n);
      if (i == null) {
        let o = t.encode(r);
        return e.set(n, o), o;
      } else return i;
    },
    pe = 112,
    Dn = 18,
    Et = (r, e, t) => {
      let n = te(r), i = n + te(e), o = new Uint8Array(i + t.byteLength);
      return ee(r, o, 0), ee(e, o, n), o.set(t, i), o;
    },
    Dt = Symbol.for("@ipld/js-cid/CID"),
    be = { writable: !1, configurable: !1, enumerable: !0 },
    we = { writable: !1, enumerable: !1, configurable: !1 },
    kn = "0.0.0-dev",
    Tn = (r, e) => {
      if (r.test(kn)) console.warn(e);
      else throw new Error(e);
    },
    _n =
      `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
  var D = (r, e) => (e && e.add(r.multihash.bytes.buffer), r),
    v = (r) => {
      let e = r;
      return e._baseCache ||
        Object.defineProperty(e, "_baseCache", { value: new Map() }),
        e.asCID || Object.defineProperty(e, "asCID", { get: () => e }),
        Object.setPrototypeOf(e.multihash.digest, Uint8Array.prototype),
        Object.setPrototypeOf(e.multihash.bytes, Uint8Array.prototype),
        Object.setPrototypeOf(e.bytes, Uint8Array.prototype),
        Object.setPrototypeOf(e, y.prototype),
        Object.defineProperty(e, Symbol.for("@ipld/js-cid/CID"), { value: !0 }),
        e;
    };
  var kt = (r, e) => (e && e.add(r.buffer), r);
  var G = class extends R {
    constructor(e) {
      super("block", ["put", "get", "rm", "stat"], e);
    }
  };
  G.prototype.get = async function (e, t = {}) {
    let { transfer: n } = t,
      { block: i } = await this.remote.get({ ...t, cid: D(e, n) });
    return i;
  };
  G.prototype.put = async function (e, t = {}) {
    let { transfer: n } = t;
    delete t.progress;
    let i = await this.remote.put({
      ...t,
      block: e instanceof Uint8Array ? e : kt(e, n),
    });
    return v(i.cid);
  };
  G.prototype.rm = async function* (e, t = {}) {
    let { transfer: n } = t;
    yield* (await this.remote.rm({
      ...t,
      cids: Array.isArray(e) ? e.map((o) => D(o, n)) : [D(e, n)],
    })).map(On);
  };
  G.prototype.stat = async function (e, t = {}) {
    let { transfer: n } = t, i = await this.remote.stat({ ...t, cid: D(e, n) });
    return { ...i, cid: v(i.cid) };
  };
  var On = (r) => {
    let e = v(r.cid);
    return r.error ? { cid: e, error: K(r.error) } : { cid: e };
  };
  var Tt = ({ dagNode: r, cids: e }) => {
      for (let t of e) v(t);
      return r;
    },
    _t = (r, e) => {
      let t = [];
      return Me(r, t, e), { dagNode: r, cids: t };
    },
    Me = (r, e, t) => {
      if (r != null && typeof r == "object") {
        let n = y.asCID(r);
        if (n) e.push(n), D(n, t);
        else if (r instanceof ArrayBuffer) t && t.add(r);
        else if (ArrayBuffer.isView(r)) t && t.add(r.buffer);
        else if (Array.isArray(r)) for (let i of r) Me(i, e, t);
        else for (let i of Object.values(r)) Me(i, e, t);
      }
    };
  var ne = class extends R {
    constructor(e) {
      super("dag", ["put", "get", "resolve"], e);
    }
  };
  ne.prototype.put = async function (e, t = {}) {
    let n = await this.remote.put({ ...t, dagNode: _t(e, t.transfer) });
    return v(n);
  };
  ne.prototype.get = async function (e, t = {}) {
    let { value: n, remainderPath: i } = await this.remote.get({
      ...t,
      cid: D(e, t.transfer),
    });
    return { value: Tt(n), remainderPath: i };
  };
  ne.prototype.resolve = async function (e, t = {}) {
    let { cid: n, remainderPath: i } = await this.remote.resolve({
      ...t,
      cid: zn(e, t.transfer),
    });
    return { cid: v(n), remainderPath: i };
  };
  var zn = (r, e) => typeof r == "string" ? r : D(r, e);
  var Se = async function* ({ port: r }, e) {
      let t = (s) => {},
        n = () => new Promise((s) => t = s),
        i = () => (r.postMessage({ method: "next" }), n());
      r.onmessage = (s) => t(s.data);
      let o = !1;
      try {
        for (; !o;) {
          let { done: s, value: c, error: a } = await i();
          if (o = s, a != null) throw K(a);
          c != null && (yield e(c));
        }
      } finally {
        o || r.postMessage({ method: "return" }), r.close();
      }
    },
    M = (r, e, t) => {
      let { port1: n, port2: i } = new MessageChannel(),
        o = Bn(r),
        s = new Set();
      return n.onmessage = async ({ data: { method: c } }) => {
        switch (c) {
          case "next": {
            try {
              let { done: a, value: l } = await o.next();
              if (a) n.postMessage({ type: "next", done: !0 }), n.close();
              else {
                s.clear();
                let f = e(l, s);
                An(n, { type: "next", done: !1, value: f }, s);
              }
            } catch (a) {
              n.postMessage({ type: "throw", error: at(a) }), n.close();
            }
            break;
          }
          case "return": {
            n.close(), o.return && o.return();
            break;
          }
          default:
            break;
        }
      },
        n.start(),
        t.add(i),
        { type: "RemoteIterable", port: i };
    },
    Bn = (r) => {
      if (r != null) {
        if (typeof r[Symbol.asyncIterator] == "function") {
          return r
            [Symbol.asyncIterator]();
        }
        if (typeof r[Symbol.iterator] == "function") {
          return r
            [Symbol.iterator]();
        }
      }
      throw TypeError("Value must be async or sync iterable");
    },
    je = (r, e) => {
      let { port1: t, port2: n } = new MessageChannel();
      return t.onmessage = ({ data: i }) => r.apply(null, i),
        e.add(n),
        { type: "RemoteCallback", port: n };
    };
  var An = (r, e, t) => r.postMessage(e, t);
  var ke = ce(zt(), 1);
  var zr = ce(Fe(), 1);
  var q = ce(Or(), 1),
    oe = q.default.Reader,
    Ye = q.default.Writer,
    h = q.default.util,
    S = q.default.roots["ipfs-unixfs"] || (q.default.roots["ipfs-unixfs"] = {}),
    $n = S.Data = (() => {
      function r(e) {
        if (this.blocksizes = [], e) {
          for (
            var t = Object.keys(e), n = 0;
            n < t.length;
            ++n
          ) {
            e[t[n]] != null && (this[t[n]] = e[t[n]]);
          }
        }
      }
      return r.prototype.Type = 0,
        r.prototype.Data = h.newBuffer([]),
        r.prototype.filesize = h.Long ? h.Long.fromBits(0, 0, !0) : 0,
        r.prototype.blocksizes = h.emptyArray,
        r.prototype.hashType = h.Long ? h.Long.fromBits(0, 0, !0) : 0,
        r.prototype.fanout = h.Long ? h.Long.fromBits(0, 0, !0) : 0,
        r.prototype.mode = 0,
        r.prototype.mtime = null,
        r.encode = function (t, n) {
          if (
            n || (n = Ye.create()),
              n.uint32(8).int32(t.Type),
              t.Data != null && Object.hasOwnProperty.call(t, "Data") &&
              n.uint32(18).bytes(t.Data),
              t.filesize != null && Object.hasOwnProperty.call(t, "filesize") &&
              n.uint32(24).uint64(t.filesize),
              t.blocksizes != null && t.blocksizes.length
          ) {
            for (var i = 0; i < t.blocksizes.length; ++i) {
              n.uint32(32).uint64(
                t.blocksizes[i],
              );
            }
          }
          return t.hashType != null &&
            Object.hasOwnProperty.call(t, "hashType") &&
            n.uint32(40).uint64(t.hashType),
            t.fanout != null && Object.hasOwnProperty.call(t, "fanout") &&
            n.uint32(48).uint64(t.fanout),
            t.mode != null && Object.hasOwnProperty.call(t, "mode") &&
            n.uint32(56).uint32(t.mode),
            t.mtime != null && Object.hasOwnProperty.call(t, "mtime") &&
            S.UnixTime.encode(t.mtime, n.uint32(66).fork()).ldelim(),
            n;
        },
        r.decode = function (t, n) {
          t instanceof oe || (t = oe.create(t));
          for (
            var i = n === void 0 ? t.len : t.pos + n, o = new S.Data();
            t.pos < i;
          ) {
            var s = t.uint32();
            switch (s >>> 3) {
              case 1:
                o.Type = t.int32();
                break;
              case 2:
                o.Data = t.bytes();
                break;
              case 3:
                o.filesize = t.uint64();
                break;
              case 4:
                if (
                  o.blocksizes && o.blocksizes.length || (o.blocksizes = []),
                    (s & 7) === 2
                ) {
                  for (var c = t.uint32() + t.pos; t.pos < c;) {o.blocksizes
                      .push(t.uint64());}
                } else o.blocksizes.push(t.uint64());
                break;
              case 5:
                o.hashType = t.uint64();
                break;
              case 6:
                o.fanout = t.uint64();
                break;
              case 7:
                o.mode = t.uint32();
                break;
              case 8:
                o.mtime = S.UnixTime.decode(t, t.uint32());
                break;
              default:
                t.skipType(s & 7);
                break;
            }
          }
          if (!o.hasOwnProperty("Type")) {
            throw h.ProtocolError(
              "missing required 'Type'",
              { instance: o },
            );
          }
          return o;
        },
        r.fromObject = function (t) {
          if (t instanceof S.Data) return t;
          var n = new S.Data();
          switch (t.Type) {
            case "Raw":
            case 0:
              n.Type = 0;
              break;
            case "Directory":
            case 1:
              n.Type = 1;
              break;
            case "File":
            case 2:
              n.Type = 2;
              break;
            case "Metadata":
            case 3:
              n.Type = 3;
              break;
            case "Symlink":
            case 4:
              n.Type = 4;
              break;
            case "HAMTShard":
            case 5:
              n.Type = 5;
              break;
          }
          if (
            t.Data != null && (typeof t.Data == "string"
              ? h.base64.decode(
                t.Data,
                n.Data = h.newBuffer(h.base64.length(t.Data)),
                0,
              )
              : t.Data.length && (n.Data = t.Data)),
              t.filesize != null && (h.Long
                ? (n.filesize = h.Long.fromValue(t.filesize)).unsigned = !0
                : typeof t.filesize == "string"
                ? n.filesize = parseInt(t.filesize, 10)
                : typeof t.filesize == "number"
                ? n.filesize = t.filesize
                : typeof t.filesize == "object" &&
                  (n.filesize = new h.LongBits(
                    t.filesize.low >>> 0,
                    t.filesize.high >>> 0,
                  ).toNumber(!0))),
              t.blocksizes
          ) {
            if (!Array.isArray(t.blocksizes)) {
              throw TypeError(
                ".Data.blocksizes: array expected",
              );
            }
            n.blocksizes = [];
            for (var i = 0; i < t.blocksizes.length; ++i) {
              h.Long
                ? (n.blocksizes[i] = h.Long.fromValue(t.blocksizes[i]))
                  .unsigned = !0
                : typeof t.blocksizes[i] == "string"
                ? n.blocksizes[i] = parseInt(t.blocksizes[i], 10)
                : typeof t.blocksizes[i] == "number"
                ? n.blocksizes[i] = t.blocksizes[i]
                : typeof t.blocksizes[i] == "object" &&
                  (n.blocksizes[i] = new h.LongBits(
                    t.blocksizes[i].low >>> 0,
                    t.blocksizes[i].high >>> 0,
                  ).toNumber(!0));
            }
          }
          if (
            t.hashType != null && (h.Long
              ? (n.hashType = h.Long.fromValue(t.hashType)).unsigned = !0
              : typeof t.hashType == "string"
              ? n.hashType = parseInt(t.hashType, 10)
              : typeof t.hashType == "number"
              ? n.hashType = t.hashType
              : typeof t.hashType == "object" &&
                (n.hashType = new h.LongBits(
                  t.hashType.low >>> 0,
                  t.hashType.high >>> 0,
                ).toNumber(!0))),
              t.fanout != null && (h.Long
                ? (n.fanout = h.Long.fromValue(t.fanout)).unsigned = !0
                : typeof t.fanout == "string"
                ? n.fanout = parseInt(t.fanout, 10)
                : typeof t.fanout == "number"
                ? n.fanout = t.fanout
                : typeof t.fanout == "object" &&
                  (n.fanout = new h.LongBits(
                    t.fanout.low >>> 0,
                    t.fanout.high >>> 0,
                  ).toNumber(!0))),
              t.mode != null && (n.mode = t.mode >>> 0),
              t.mtime != null
          ) {
            if (typeof t.mtime != "object") {
              throw TypeError(
                ".Data.mtime: object expected",
              );
            }
            n.mtime = S.UnixTime.fromObject(t.mtime);
          }
          return n;
        },
        r.toObject = function (t, n) {
          n || (n = {});
          var i = {};
          if ((n.arrays || n.defaults) && (i.blocksizes = []), n.defaults) {
            if (
              i.Type = n.enums === String ? "Raw" : 0,
                n.bytes === String
                  ? i.Data = ""
                  : (i.Data = [],
                    n.bytes !== Array && (i.Data = h.newBuffer(i.Data))),
                h.Long
            ) {
              var o = new h.Long(0, 0, !0);
              i.filesize = n.longs === String
                ? o.toString()
                : n.longs === Number
                ? o.toNumber()
                : o;
            } else i.filesize = n.longs === String ? "0" : 0;
            if (h.Long) {
              var o = new h.Long(0, 0, !0);
              i.hashType = n.longs === String
                ? o.toString()
                : n.longs === Number
                ? o.toNumber()
                : o;
            } else i.hashType = n.longs === String ? "0" : 0;
            if (h.Long) {
              var o = new h.Long(0, 0, !0);
              i.fanout = n.longs === String
                ? o.toString()
                : n.longs === Number
                ? o.toNumber()
                : o;
            } else i.fanout = n.longs === String ? "0" : 0;
            i.mode = 0, i.mtime = null;
          }
          if (
            t.Type != null && t.hasOwnProperty("Type") &&
            (i.Type = n.enums === String ? S.Data.DataType[t.Type] : t.Type),
              t.Data != null && t.hasOwnProperty("Data") &&
              (i.Data = n.bytes === String
                ? h.base64.encode(t.Data, 0, t.Data.length)
                : n.bytes === Array
                ? Array.prototype.slice.call(t.Data)
                : t.Data),
              t.filesize != null && t.hasOwnProperty("filesize") &&
              (typeof t.filesize == "number"
                ? i.filesize = n.longs === String
                  ? String(t.filesize)
                  : t.filesize
                : i.filesize = n.longs === String
                  ? h.Long.prototype.toString.call(t.filesize)
                  : n.longs === Number
                  ? new h.LongBits(t.filesize.low >>> 0, t.filesize.high >>> 0)
                    .toNumber(!0)
                  : t.filesize),
              t.blocksizes && t.blocksizes.length
          ) {
            i.blocksizes = [];
            for (var s = 0; s < t.blocksizes.length; ++s) {
              typeof t.blocksizes[s] == "number"
                ? i.blocksizes[s] = n.longs === String
                  ? String(t.blocksizes[s])
                  : t.blocksizes[s]
                : i.blocksizes[s] = n.longs === String
                  ? h.Long.prototype.toString.call(t.blocksizes[s])
                  : n.longs === Number
                  ? new h.LongBits(
                    t.blocksizes[s].low >>> 0,
                    t.blocksizes[s].high >>> 0,
                  ).toNumber(!0)
                  : t.blocksizes[s];
            }
          }
          return t.hashType != null && t.hasOwnProperty("hashType") &&
            (typeof t.hashType == "number"
              ? i.hashType = n.longs === String
                ? String(t.hashType)
                : t.hashType
              : i.hashType = n.longs === String
                ? h.Long.prototype.toString.call(t.hashType)
                : n.longs === Number
                ? new h.LongBits(t.hashType.low >>> 0, t.hashType.high >>> 0)
                  .toNumber(!0)
                : t.hashType),
            t.fanout != null && t.hasOwnProperty("fanout") &&
            (typeof t.fanout == "number"
              ? i.fanout = n.longs === String ? String(t.fanout) : t.fanout
              : i.fanout = n.longs === String
                ? h.Long.prototype.toString.call(t.fanout)
                : n.longs === Number
                ? new h.LongBits(t.fanout.low >>> 0, t.fanout.high >>> 0)
                  .toNumber(!0)
                : t.fanout),
            t.mode != null && t.hasOwnProperty("mode") && (i.mode = t.mode),
            t.mtime != null && t.hasOwnProperty("mtime") &&
            (i.mtime = S.UnixTime.toObject(t.mtime, n)),
            i;
        },
        r.prototype.toJSON = function () {
          return this.constructor.toObject(this, q.default.util.toJSONOptions);
        },
        r.DataType = function () {
          let e = {}, t = Object.create(e);
          return t[e[0] = "Raw"] = 0,
            t[e[1] = "Directory"] = 1,
            t[e[2] = "File"] = 2,
            t[e[3] = "Metadata"] = 3,
            t[e[4] = "Symlink"] = 4,
            t[e[5] = "HAMTShard"] = 5,
            t;
        }(),
        r;
    })(),
    jo = S.UnixTime = (() => {
      function r(e) {
        if (e) {
          for (
            var t = Object.keys(e), n = 0;
            n < t.length;
            ++n
          ) {
            e[t[n]] != null && (this[t[n]] = e[t[n]]);
          }
        }
      }
      return r.prototype.Seconds = h.Long ? h.Long.fromBits(0, 0, !1) : 0,
        r.prototype.FractionalNanoseconds = 0,
        r.encode = function (t, n) {
          return n || (n = Ye.create()),
            n.uint32(8).int64(t.Seconds),
            t.FractionalNanoseconds != null &&
            Object.hasOwnProperty.call(t, "FractionalNanoseconds") &&
            n.uint32(21).fixed32(t.FractionalNanoseconds),
            n;
        },
        r.decode = function (t, n) {
          t instanceof oe || (t = oe.create(t));
          for (
            var i = n === void 0 ? t.len : t.pos + n, o = new S.UnixTime();
            t.pos < i;
          ) {
            var s = t.uint32();
            switch (s >>> 3) {
              case 1:
                o.Seconds = t.int64();
                break;
              case 2:
                o.FractionalNanoseconds = t.fixed32();
                break;
              default:
                t.skipType(s & 7);
                break;
            }
          }
          if (!o.hasOwnProperty("Seconds")) {
            throw h.ProtocolError("missing required 'Seconds'", {
              instance: o,
            });
          }
          return o;
        },
        r.fromObject = function (t) {
          if (t instanceof S.UnixTime) return t;
          var n = new S.UnixTime();
          return t.Seconds != null && (h.Long
            ? (n.Seconds = h.Long.fromValue(t.Seconds)).unsigned = !1
            : typeof t.Seconds == "string"
            ? n.Seconds = parseInt(t.Seconds, 10)
            : typeof t.Seconds == "number"
            ? n.Seconds = t.Seconds
            : typeof t.Seconds == "object" &&
              (n.Seconds = new h.LongBits(
                t.Seconds.low >>> 0,
                t.Seconds.high >>> 0,
              ).toNumber())),
            t.FractionalNanoseconds != null &&
            (n.FractionalNanoseconds = t.FractionalNanoseconds >>> 0),
            n;
        },
        r.toObject = function (t, n) {
          n || (n = {});
          var i = {};
          if (n.defaults) {
            if (h.Long) {
              var o = new h.Long(0, 0, !1);
              i.Seconds = n.longs === String
                ? o.toString()
                : n.longs === Number
                ? o.toNumber()
                : o;
            } else i.Seconds = n.longs === String ? "0" : 0;
            i.FractionalNanoseconds = 0;
          }
          return t.Seconds != null && t.hasOwnProperty("Seconds") &&
            (typeof t.Seconds == "number"
              ? i.Seconds = n.longs === String ? String(t.Seconds) : t.Seconds
              : i.Seconds = n.longs === String
                ? h.Long.prototype.toString.call(t.Seconds)
                : n.longs === Number
                ? new h.LongBits(t.Seconds.low >>> 0, t.Seconds.high >>> 0)
                  .toNumber()
                : t.Seconds),
            t.FractionalNanoseconds != null &&
            t.hasOwnProperty("FractionalNanoseconds") &&
            (i.FractionalNanoseconds = t.FractionalNanoseconds),
            i;
        },
        r.prototype.toJSON = function () {
          return this.constructor.toObject(this, q.default.util.toJSONOptions);
        },
        r;
    })(),
    Fo = S.Metadata = (() => {
      function r(e) {
        if (e) {
          for (
            var t = Object.keys(e), n = 0;
            n < t.length;
            ++n
          ) {
            e[t[n]] != null && (this[t[n]] = e[t[n]]);
          }
        }
      }
      return r.prototype.MimeType = "",
        r.encode = function (t, n) {
          return n || (n = Ye.create()),
            t.MimeType != null && Object.hasOwnProperty.call(t, "MimeType") &&
            n.uint32(10).string(t.MimeType),
            n;
        },
        r.decode = function (t, n) {
          t instanceof oe || (t = oe.create(t));
          for (
            var i = n === void 0 ? t.len : t.pos + n, o = new S.Metadata();
            t.pos < i;
          ) {
            var s = t.uint32();
            switch (s >>> 3) {
              case 1:
                o.MimeType = t.string();
                break;
              default:
                t.skipType(s & 7);
                break;
            }
          }
          return o;
        },
        r.fromObject = function (t) {
          if (t instanceof S.Metadata) return t;
          var n = new S.Metadata();
          return t.MimeType != null && (n.MimeType = String(t.MimeType)), n;
        },
        r.toObject = function (t, n) {
          n || (n = {});
          var i = {};
          return n.defaults && (i.MimeType = ""),
            t.MimeType != null && t.hasOwnProperty("MimeType") &&
            (i.MimeType = t.MimeType),
            i;
        },
        r.prototype.toJSON = function () {
          return this.constructor.toObject(this, q.default.util.toJSONOptions);
        },
        r;
    })();
  var Po = parseInt("0644", 8), Ro = parseInt("0755", 8);
  function Br(r) {
    if (r != null) {
      return typeof r == "number"
        ? r & 4095
        : (r = r.toString(),
          r.substring(0, 1) === "0"
            ? parseInt(r, 8) & 4095
            : parseInt(r, 10) & 4095);
    }
  }
  function Ar(r) {
    if (r == null) return;
    let e;
    if (
      r.secs != null && (e = { secs: r.secs, nsecs: r.nsecs }),
        r.Seconds != null &&
        (e = { secs: r.Seconds, nsecs: r.FractionalNanoseconds }),
        Array.isArray(r) && (e = { secs: r[0], nsecs: r[1] }),
        r instanceof Date
    ) {
      let t = r.getTime(), n = Math.floor(t / 1e3);
      e = { secs: n, nsecs: (t - n * 1e3) * 1e3 };
    }
    if (!!Object.prototype.hasOwnProperty.call(e, "secs")) {
      if (
        e != null && e.nsecs != null && (e.nsecs < 0 || e.nsecs > 999999999)
      ) {
        throw (0, zr.default)(
          new Error("mtime-nsecs must be within the range [0,999999999]"),
          "ERR_INVALID_MTIME_NSECS",
        );
      }
      return e;
    }
  }
  var Nr = ce(Cr(), 1),
    Lr = ce(Fe(), 1),
    Y = class extends R {
      constructor(e) {
        super("core", ["add", "addAll", "cat", "ls"], e);
      }
    };
  Y.prototype.addAll = async function* (e, t = {}) {
    let { timeout: n, signal: i } = t,
      o = t.transfer || new Set(),
      s = t.progress ? je(t.progress, o) : void 0,
      c = await this.remote.addAll({
        ...t,
        input: Gn(e, o),
        progress: void 0,
        progressCallback: s,
        transfer: o,
        timeout: n,
        signal: i,
      });
    yield* Se(c.data, Mr);
  };
  Y.prototype.add = async function (e, t = {}) {
    let { timeout: n, signal: i } = t,
      o = t.transfer || new Set(),
      s = t.progress ? je(t.progress, o) : void 0,
      c = await this.remote.add({
        ...t,
        input: await Qn(e, o),
        progress: void 0,
        progressCallback: s,
        transfer: o,
        timeout: n,
        signal: i,
      });
    return Mr(c.data);
  };
  Y.prototype.cat = async function* (e, t = {}) {
    let n = y.asCID(e),
      i = n ? D(n) : e,
      o = await this.remote.cat({ ...t, path: i });
    yield* Se(o.data, Hn);
  };
  Y.prototype.ls = async function* (e, t = {}) {
    let n = y.asCID(e),
      i = n ? D(n) : e,
      o = await this.remote.ls({ ...t, path: i });
    yield* Se(o.data, Jn);
  };
  var Mr = ({ path: r, cid: e, mode: t, mtime: n, size: i }) => ({
      path: r,
      cid: v(e),
      mode: t,
      mtime: n,
      size: i,
    }),
    Jn = (
      { name: r, path: e, size: t, cid: n, type: i, mode: o, mtime: s },
    ) => ({ cid: v(n), type: i, name: r, path: e, mode: o, mtime: s, size: t }),
    Hn = (r) => r,
    Qn = async (r, e) => {
      if (r instanceof Blob) return r;
      if (typeof r == "string") return r;
      if (r instanceof ArrayBuffer) return r;
      if (ArrayBuffer.isView(r)) return r;
      {
        let t = rt(r);
        if (t) return M(await Ke(t), et, e);
        let n = nt(r);
        if (n) return M(await Ke(n), se, e);
        let i = it(r);
        if (i) return M(await Ke((0, ke.default)(i)), se, e);
        let o = ot(r);
        if (o) return tt(o, e);
        throw TypeError("Unexpected input: " + typeof r);
      }
    },
    Gn = (r, e) => {
      let t = rt(r);
      if (t) return M(t, et, e);
      let n = nt(r);
      if (n) return M(n, se, e);
      let i = it(r);
      if (i) return M((0, ke.default)(i), se, e);
      throw TypeError("Unexpected input: " + typeof r);
    },
    se = (r, e) => {
      if (r instanceof ArrayBuffer) return r;
      if (ArrayBuffer.isView(r)) return r;
      if (r instanceof Blob) return { path: "", content: r };
      if (typeof r == "string") return { path: "", content: r };
      {
        let t = ot(r);
        if (t) return tt(t, e);
        throw TypeError("Unexpected input: " + typeof r);
      }
    },
    et = (r, e) => {
      if (typeof r == "number") {
        throw TypeError(
          "Iterable of numbers is not supported",
        );
      }
      if (r instanceof ArrayBuffer) return r;
      if (ArrayBuffer.isView(r)) return r;
      if (r instanceof Blob) return { path: "", content: r };
      if (typeof r == "string") return { path: "", content: r };
      {
        let t = ot(r);
        if (t) return tt(t, e);
        throw TypeError("Unexpected input: " + typeof r);
      }
    },
    tt = ({ path: r, mode: e, mtime: t, content: n }, i) => {
      let o = { path: r, mode: Br(e), mtime: Ar(t) };
      return n && (o.content = Xn(n, i)), o;
    },
    Xn = (r, e) => {
      if (r == null) return "";
      if (r instanceof ArrayBuffer || ArrayBuffer.isView(r)) return r;
      if (r instanceof Blob) return r;
      if (typeof r == "string") return r;
      {
        let t = rt(r);
        if (t) return M(t, et, e);
        let n = nt(r);
        if (n) return M(n, se, e);
        let i = it(r);
        if (i) return M((0, ke.default)(i), se, e);
        throw TypeError("Unexpected input: " + typeof r);
      }
    },
    rt = (r) => {
      let e = r;
      return e && typeof e[Symbol.iterator] == "function" ? e : null;
    },
    nt = (r) => {
      let e = r;
      return e && typeof e[Symbol.asyncIterator] == "function" ? e : null;
    },
    it = (r) => r && typeof r.getReader == "function" ? r : null,
    ot = (r) => typeof r == "object" && (r.path || r.content) ? r : null,
    Ke = async (r) => {
      let e = (0, Nr.default)(r), { value: t, done: n } = await e.peek();
      if (n) return [];
      if (
        e.push(t),
          Number.isInteger(t) || Zn(t) || typeof t == "string" ||
          t instanceof String
      ) {
        return e;
      }
      throw (0, Lr.default)(
        new Error(
          "Unexpected input: multiple items passed - if you are using ipfs.add, please use ipfs.addAll instead",
        ),
        "ERR_UNEXPECTED_INPUT",
      );
    };
  function Zn(r) {
    return ArrayBuffer.isView(r) || r instanceof ArrayBuffer;
  }
  var Te = class extends R {
    constructor(e) {
      super("files", ["stat"], e);
    }
  };
  Te.prototype.stat = async function (e, t = {}) {
    let { size: n, hash: i, withLocal: o, timeout: s, signal: c } = t,
      { stat: a } = await this.remote.stat({
        path: Yn(e),
        size: n,
        hash: i,
        withLocal: o,
        timeout: s,
        signal: c,
      });
    return Kn(a);
  };
  var Yn = (r) => y.asCID(r) ? `/ipfs/${r.toString()}` : r.toString(),
    Kn = (r) => ({ ...r, cid: v(r.cid) });
  var ae = class extends Y {
    constructor(e) {
      super(e);
      this.transport = e,
        this.dag = new ne(this.transport),
        this.files = new Te(this.transport),
        this.block = new G(this.transport);
    }
    static attach(e, t) {
      e.transport.connect(t);
    }
    static detached() {
      return new ae(new V(void 0));
    }
    static from(e) {
      return new ae(new V(e));
    }
  };
  var Fr = async (r, e = ei) => {
      let t = await jr(r), [n] = t.sort((i, o) => e(o) - e(i));
      if (n && n.visibilityState === "visible") return n;
      {
        let i = await jr(r, !0), [o] = i.sort((s, c) => e(c) - e(s));
        if (o) return o;
        throw new Error("No viable client can be found");
      }
    },
    ei = ({ frameType: r, type: e, focused: t, visibilityState: n }) => {
      let i = r === "nested" ? 0 : 1,
        o = e === "window" ? 1 : 0,
        s = n === "visible" ? 1 : 0;
      return o * (t ? 2 : 1) * s * i;
    },
    jr = async (r, e = !1) =>
      await r.clients.matchAll({ type: "window", includeUncontrolled: e }),
    Pr = () => {
      let r = {};
      return r.promise = new Promise((e, t) => {
        r.resolve = e, r.reject = t;
      }),
        r;
    },
    st = (r) => {
      let e = r[Symbol.asyncIterator]();
      return new ReadableStream({
        async pull(t) {
          try {
            let n = await e.next();
            n.done ? t.close() : t.enqueue(n.value);
          } catch (n) {
            t.error(n);
          }
        },
        cancel(t) {
          r.return && r.return(t);
        },
      });
    };
  var ti = async (r) => {
      r.waitUntil(r.target.skipWaiting());
    },
    ri = async (r) => {
      r.waitUntil(r.target.clients.claim());
    },
    ni = (r) => {
      let e = new URL(r.request.url);
      switch (e.origin) {
        case location.origin: {
          let [, t] = e.pathname.split("/");
          switch (t) {
            case "ipfs":
            case "ipns":
              return r.respondWith(ii({ url: e }));
            case "view":
              return r.respondWith(
                oi({ event: r, path: e.pathname.slice(t.length + 1) }),
              );
            default:
              return r.respondWith(fetch(r.request));
          }
        }
        default:
          return r.respondWith(fetch(r.request));
      }
    },
    ii = async ({ url: r }) => {
      let e = new Blob([`<html data-viewer>
<head>
  <title>${r.pathname}</title>
  <script src="https://spike.land/main.js"><\/script>
</head>
<body>
  <iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${r.pathname}"></iframe>
</body>

</html>
`], {
        type: "text/html",
      });
      return new Response(e, { status: 200 });
    },
    oi = async ({ event: r, path: e }) => {
      let [, t] = e.split("/");
      switch (t) {
        case "ipns":
          return await si({ event: r, path: e });
        case "ipfs":
          return await ai({ event: r, path: e });
        default:
          return await hi(t);
      }
    },
    si = async ({}) =>
      new Response(
        `<html>
  <body>
    <h1>IPNS protocol support is not implemented</h1>
    <p>It is left as an exercise to the viewer</p>
  </body>
</html>`,
        { statusText: "IPNS support is not implemented", status: 502 },
      ),
    ai = async ({ event: r, path: e }) => {
      let t = await pi(r);
      try {
        switch ((await t.files.stat(e)).type) {
          case "file":
            return await Rr(t, e);
          case "directory":
            if (e.endsWith("/")) {
              let i = `${e}index.html`;
              return (await t.files.stat(i).catch(() => ({ type: null })))
                  .type === "file"
                ? Rr(t, i)
                : ci(t, e);
            } else return Response.redirect(`${r.request.url}/`);
          default:
            return Response.redirect(`https://explore.ipld.io/#/explore${e}`);
        }
      } catch ({ message: n }) {
        return console.error(n),
          n.startsWith("no link named") || n.includes("does not exist")
            ? new Response(n, { statusText: n, status: 404 })
            : n.includes("invalid")
            ? new Response(n, { statusText: n, status: 400 })
            : new Response(n, { statusText: n, status: 500 });
      }
    },
    Rr = async (r, e) => {
      let t = r.cat(e),
        n = st(t),
        i = e.endsWith(".svg") ? { "content-type": "image/svg+xml" } : null;
      return new Response(n, { status: 200, headers: { ...i } });
    },
    ci = async (r, e) =>
      new Response(st(li(r, e)), {
        headers: { "content-type": "text/html" },
        status: 200,
      }),
    li = async function* (r, e, t = 64) {
      let n = new TextEncoder();
      yield n.encode(`<html><h3>Index of ${e}<h3><ul>`);
      for await (let i of r.ls(e)) if (yield n.encode(ui(e, i)), --t < 0) break;
      yield n.encode(`</ul>${t < 0 ? fi : ""}</html>`);
    },
    fi =
      "<h2>Directory has too many entries</h2><p><mark>Implementing a pagination is left as an excercise to the viewer</mark></p></h2>",
    ui = (r, e) =>
      `<li>
  <div class="type-${e.type}"><a href="/view${r}${e.name}">${e.name}<a></div>
  <small>${e.cid.toString()}</small>
  <details><pre>${JSON.stringify(e, null, 2)}</pre></details>
</li>`,
    hi = async (r) =>
      new Response(
        `<html>
    <body>
      <h1>Protocol ${r} is not supported</h1>
    </body>
</html>`,
        { statusText: `Unsupported protocol ${r}`, status: 405 },
      ),
    pi = async (r) => {
      let e = await Fr(r.target), t = await di(e);
      return ae.from(t);
    },
    di = (r) => {
      let e = _e[r.id];
      if (e == null) {
        let t = Pr();
        return _e[r.id] = t,
          r.postMessage({ method: "ipfs-message-port", id: r.id }),
          t.promise;
      } else return e.promise;
    },
    _e = Object.create(null),
    yi = ({ data: r }) => {
      if (r) {
        let e = _e[r.id];
        e != null &&
          (delete _e[r.id],
            r.port instanceof MessagePort
              ? e.resolve(r.port)
              : e.reject(new Error(r.error)));
      }
    },
    mi = (r) => {
      r.oninstall = ti, r.onactivate = ri, r.onfetch = ni, r.onmessage = yi;
    };
  mi(self);
})();
