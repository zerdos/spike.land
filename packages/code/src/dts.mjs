var te = (t =>
  typeof require < "u"
    ? require
    : typeof Proxy < "u"
    ? new Proxy(t, { get: (S, x) => (typeof require < "u" ? require : S)[x] })
    : t)(function(t) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw new Error("Dynamic require of \"" + t + "\" is not supported");
  });
var He = Object.create,
  ce = Object.defineProperty,
  Ve = Object.getOwnPropertyDescriptor,
  Ge = Object.getOwnPropertyNames,
  Qe = Object.getPrototypeOf,
  Ze = Object.prototype.hasOwnProperty,
  L = (t, S) => ce(t, "name", { value: S, configurable: !0 }),
  et = (t, S) => () => (S || t((S = { exports: {} }).exports, S), S.exports),
  tt = (t, S, x, o) => {
    if (S && typeof S == "object" || typeof S == "function") {
      for (let f of Ge(S)) {
        !Ze.call(t, f) && f !== x
          && ce(t, f, { get: () => S[f], enumerable: !(o = Ve(S, f)) || o.enumerable });
      }
    }
    return t;
  },
  Ae = (
    t,
    S,
    x,
  ) => (x = t != null ? He(Qe(t)) : {},
    tt(S || !t || !t.__esModule ? ce(x, "default", { value: t, enumerable: !0 }) : x, t)),
  Oe = et((t, S) => {
    "use strict";
    var x = typeof Reflect == "object" ? Reflect : null,
      o = x && typeof x.apply == "function" ? x.apply : L(function(d, E, i) {
        return Function.prototype.apply.call(d, E, i);
      }, "ReflectApply"),
      f;
    x && typeof x.ownKeys == "function" ? f = x.ownKeys : Object.getOwnPropertySymbols
      ? f = L(function(d) {
        return Object.getOwnPropertyNames(d).concat(Object.getOwnPropertySymbols(d));
      }, "ReflectOwnKeys")
      : f = L(function(d) {
        return Object.getOwnPropertyNames(d);
      }, "ReflectOwnKeys");
    function v(d) {
      console && console.warn && console.warn(d);
    }
    L(v, "ProcessEmitWarning");
    var c = Number.isNaN || L(function(d) {
      return d !== d;
    }, "NumberIsNaN");
    function n() {
      n.init.call(this);
    }
    L(n, "EventEmitter"),
      S.exports = n,
      S.exports.once = k,
      n.EventEmitter = n,
      n.prototype._events = void 0,
      n.prototype._eventsCount = 0,
      n.prototype._maxListeners = void 0;
    var y = 10;
    function r(d) {
      if (typeof d != "function") {
        throw new TypeError("The \"listener\" argument must be of type Function. Received type " + typeof d);
      }
    }
    L(r, "checkListener"),
      Object.defineProperty(n, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
          return y;
        },
        set: function(d) {
          if (typeof d != "number" || d < 0 || c(d)) {
            throw new RangeError(
              "The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received " + d
                + ".",
            );
          }
          y = d;
        },
      }),
      n.init = function() {
        (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events)
        && (this._events = Object.create(null), this._eventsCount = 0),
          this._maxListeners = this._maxListeners || void 0;
      },
      n.prototype.setMaxListeners = L(function(d) {
        if (typeof d != "number" || d < 0 || c(d)) {
          throw new RangeError(
            "The value of \"n\" is out of range. It must be a non-negative number. Received " + d + ".",
          );
        }
        return this._maxListeners = d, this;
      }, "setMaxListeners");
    function s(d) {
      return d._maxListeners === void 0 ? n.defaultMaxListeners : d._maxListeners;
    }
    L(s, "_getMaxListeners"),
      n.prototype.getMaxListeners = L(function() {
        return s(this);
      }, "getMaxListeners"),
      n.prototype.emit = L(function(d) {
        for (var E = [], i = 1; i < arguments.length; i++) E.push(arguments[i]);
        var m = d === "error", g = this._events;
        if (g !== void 0) m = m && g.error === void 0;
        else if (!m) return !1;
        if (m) {
          var _;
          if (E.length > 0 && (_ = E[0]), _ instanceof Error) throw _;
          var P = new Error("Unhandled error." + (_ ? " (" + _.message + ")" : ""));
          throw P.context = _, P;
        }
        var N = g[d];
        if (N === void 0) return !1;
        if (typeof N == "function") o(N, this, E);
        else for (var M = N.length, K = T(N, M), i = 0; i < M; ++i) o(K[i], this, E);
        return !0;
      }, "emit");
    function p(d, E, i, m) {
      var g, _, P;
      if (
        r(i),
          _ = d._events,
          _ === void 0
            ? (_ = d._events = Object.create(null), d._eventsCount = 0)
            : (_.newListener !== void 0 && (d.emit("newListener", E, i.listener ? i.listener : i), _ = d._events),
              P = _[E]),
          P === void 0
      ) P = _[E] = i, ++d._eventsCount;
      else if (
        typeof P == "function" ? P = _[E] = m ? [i, P] : [P, i] : m ? P.unshift(i) : P.push(i),
          g = s(d),
          g > 0 && P.length > g && !P.warned
      ) {
        P.warned = !0;
        var N = new Error(
          "Possible EventEmitter memory leak detected. " + P.length + " " + String(E)
            + " listeners added. Use emitter.setMaxListeners() to increase limit",
        );
        N.name = "MaxListenersExceededWarning", N.emitter = d, N.type = E, N.count = P.length, v(N);
      }
      return d;
    }
    L(p, "_addListener"),
      n.prototype.addListener = L(function(d, E) {
        return p(this, d, E, !1);
      }, "addListener"),
      n.prototype.on = n.prototype.addListener,
      n.prototype.prependListener = L(function(d, E) {
        return p(this, d, E, !0);
      }, "prependListener");
    function e() {
      if (!this.fired) {
        return this.target.removeListener(this.type, this.wrapFn),
          this.fired = !0,
          arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
      }
    }
    L(e, "onceWrapper");
    function a(d, E, i) {
      var m = { fired: !1, wrapFn: void 0, target: d, type: E, listener: i }, g = e.bind(m);
      return g.listener = i, m.wrapFn = g, g;
    }
    L(a, "_onceWrap"),
      n.prototype.once = L(function(d, E) {
        return r(E), this.on(d, a(this, d, E)), this;
      }, "once"),
      n.prototype.prependOnceListener = L(function(d, E) {
        return r(E), this.prependListener(d, a(this, d, E)), this;
      }, "prependOnceListener"),
      n.prototype.removeListener = L(function(d, E) {
        var i, m, g, _, P;
        if (r(E), m = this._events, m === void 0) return this;
        if (i = m[d], i === void 0) return this;
        if (i === E || i.listener === E) {
          --this._eventsCount === 0
            ? this._events = Object.create(null)
            : (delete m[d], m.removeListener && this.emit("removeListener", d, i.listener || E));
        } else if (typeof i != "function") {
          for (g = -1, _ = i.length - 1; _ >= 0; _--) {
            if (i[_] === E || i[_].listener === E) {
              P = i[_].listener, g = _;
              break;
            }
          }
          if (g < 0) return this;
          g === 0 ? i.shift() : b(i, g),
            i.length === 1 && (m[d] = i[0]),
            m.removeListener !== void 0 && this.emit("removeListener", d, P || E);
        }
        return this;
      }, "removeListener"),
      n.prototype.off = n.prototype.removeListener,
      n.prototype.removeAllListeners = L(function(d) {
        var E, i, m;
        if (i = this._events, i === void 0) return this;
        if (i.removeListener === void 0) {
          return arguments.length === 0
            ? (this._events = Object.create(null), this._eventsCount = 0)
            : i[d] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete i[d]),
            this;
        }
        if (arguments.length === 0) {
          var g = Object.keys(i), _;
          for (m = 0; m < g.length; ++m) _ = g[m], _ !== "removeListener" && this.removeAllListeners(_);
          return this.removeAllListeners("removeListener"),
            this._events = Object.create(null),
            this._eventsCount = 0,
            this;
        }
        if (E = i[d], typeof E == "function") this.removeListener(d, E);
        else if (E !== void 0) for (m = E.length - 1; m >= 0; m--) this.removeListener(d, E[m]);
        return this;
      }, "removeAllListeners");
    function l(d, E, i) {
      var m = d._events;
      if (m === void 0) return [];
      var g = m[E];
      return g === void 0 ? [] : typeof g == "function" ? i ? [g.listener || g] : [g] : i ? C(g) : T(g, g.length);
    }
    L(l, "_listeners"),
      n.prototype.listeners = L(function(d) {
        return l(this, d, !0);
      }, "listeners"),
      n.prototype.rawListeners = L(function(d) {
        return l(this, d, !1);
      }, "rawListeners"),
      n.listenerCount = function(d, E) {
        return typeof d.listenerCount == "function" ? d.listenerCount(E) : u.call(d, E);
      },
      n.prototype.listenerCount = u;
    function u(d) {
      var E = this._events;
      if (E !== void 0) {
        var i = E[d];
        if (typeof i == "function") return 1;
        if (i !== void 0) return i.length;
      }
      return 0;
    }
    L(u, "listenerCount"),
      n.prototype.eventNames = L(function() {
        return this._eventsCount > 0 ? f(this._events) : [];
      }, "eventNames");
    function T(d, E) {
      for (var i = new Array(E), m = 0; m < E; ++m) i[m] = d[m];
      return i;
    }
    L(T, "arrayClone");
    function b(d, E) {
      for (; E + 1 < d.length; E++) d[E] = d[E + 1];
      d.pop();
    }
    L(b, "spliceOne");
    function C(d) {
      for (var E = new Array(d.length), i = 0; i < E.length; ++i) E[i] = d[i].listener || d[i];
      return E;
    }
    L(C, "unwrapListeners");
    function k(d, E) {
      return new Promise(function(i, m) {
        function g(P) {
          d.removeListener(E, _), m(P);
        }
        L(g, "errorListener");
        function _() {
          typeof d.removeListener == "function" && d.removeListener("error", g), i([].slice.call(arguments));
        }
        L(_, "resolver"), w(d, E, _, { once: !0 }), E !== "error" && A(d, g, { once: !0 });
      });
    }
    L(k, "once");
    function A(d, E, i) {
      typeof d.on == "function" && w(d, "error", E, i);
    }
    L(A, "addErrorHandlerIfEventEmitter");
    function w(d, E, i, m) {
      if (typeof d.on == "function") m.once ? d.once(E, i) : d.on(E, i);
      else if (typeof d.addEventListener == "function") {
        d.addEventListener(
          E,
          L(function g(_) {
            m.once && d.removeEventListener(E, g), i(_);
          }, "wrapListener"),
        );
      } else throw new TypeError("The \"emitter\" argument must be of type EventEmitter. Received type " + typeof d);
    }
    L(w, "eventTargetAgnosticAddListener");
  }),
  rt = Ae(Oe()),
  De = Ae(Oe()),
  { EventEmitter: Ce, init: fn, listenerCount: Tn, once: hn } = De,
  { default: nt, ...it } = De,
  Sn = rt.default ?? nt ?? it;
var H = new Ce();
H.setMaxListeners(1 << 10);
var Q = typeof Deno < "u",
  W = {
    title: Q ? "deno" : "browser",
    browser: !0,
    env: Q
      ? new Proxy({}, {
        get(t, S) {
          return Deno.env.get(String(S));
        },
        ownKeys: () => Reflect.ownKeys(Deno.env.toObject()),
        getOwnPropertyDescriptor: (t, S) => {
          let x = Deno.env.toObject();
          if (S in Deno.env.toObject()) {
            let o = { enumerable: !0, configurable: !0 };
            return typeof S == "string" && (o.value = x[S]), o;
          }
        },
        set(t, S, x) {
          return Deno.env.set(String(S), String(x)), x;
        },
      })
      : {},
    argv: Q ? Deno.args ?? [] : [],
    pid: Q ? Deno.pid ?? 0 : 0,
    version: "v16.18.0",
    versions: {
      node: "16.18.0",
      v8: "9.4.146.26-node.22",
      uv: "1.43.0",
      zlib: "1.2.11",
      brotli: "1.0.9",
      ares: "1.18.1",
      modules: "93",
      nghttp2: "1.47.0",
      napi: "8",
      llhttp: "6.0.10",
      openssl: "1.1.1q+quic",
      cldr: "41.0",
      icu: "71.1",
      tz: "2022b",
      unicode: "14.0",
      ngtcp2: "0.8.1",
      nghttp3: "0.7.0",
      ...Q ? Deno.version ?? {} : {},
    },
    on: (...t) => H.on(...t),
    addListener: (...t) => H.addListener(...t),
    once: (...t) => H.once(...t),
    off: (...t) => H.off(...t),
    removeListener: (...t) => H.removeListener(...t),
    removeAllListeners: (...t) => H.removeAllListeners(...t),
    emit: (...t) => H.emit(...t),
    prependListener: (...t) => H.prependListener(...t),
    prependOnceListener: (...t) => H.prependOnceListener(...t),
    listeners: () => [],
    emitWarning: () => {
      throw new Error("process.emitWarning is not supported");
    },
    binding: () => {
      throw new Error("process.binding is not supported");
    },
    cwd: () => Q ? Deno.cwd?.() ?? "/" : "/",
    chdir: t => {
      if (Q) Deno.chdir(t);
      else throw new Error("process.chdir is not supported");
    },
    umask: () => Q ? Deno.umask ?? 0 : 0,
    nextTick: (t, ...S) => queueMicrotask(() => t(...S)),
  };
import * as pe from "https://testing.spike.land/v119/node-source-walk@6.0.0/esnext/node-source-walk.mjs";
import * as de from "https://testing.spike.land/v119/tsutils@3.21.0/esnext/util/util.js";
import * as ue from "https://testing.spike.land/v119/typescript@5.0.4/esnext/typescript.mjs";
function O(t) {
  throw new Error(`[testing.spike.land] fs: '${t}' is not implemented`);
}
var ot = null,
  at = null,
  st = null,
  ct = null,
  lt = () => O("accessaccess"),
  pt = () => O("accessSyncaccessSync"),
  ut = () => O("appendFile"),
  dt = () => O("appendFileSync"),
  yt = () => O("chmod"),
  mt = () => O("chmodSync"),
  ft = () => O("chown"),
  Tt = () => O("chownSync"),
  ht = () => O("close"),
  St = () => O("closeSync"),
  gt = new Proxy({}, { get: () => null }),
  vt = () => O("copyFile"),
  Et = () => O("copyFileSync"),
  _t = () => O("createReadStream"),
  xt = () => O("createWriteStream"),
  Pt = () => O("Dir"),
  bt = () => O("Dirent"),
  Nt = () => O("exists"),
  At = () => O("existsSync"),
  Ot = () => O("fdatasync"),
  Dt = () => O("fdatasyncSync"),
  Ct = () => O("fstat"),
  wt = () => O("fstatSync"),
  jt = () => O("fsync"),
  Mt = () => O("fsyncSync"),
  kt = () => O("ftruncate"),
  Ft = () => O("ftruncateSync"),
  Kt = () => O("futimes"),
  It = () => O("futimesSync"),
  Yt = () => O("link"),
  Lt = () => O("linkSync"),
  Rt = () => O("lstat"),
  Bt = () => O("lstatSync"),
  Jt = () => O("mkdir"),
  Xt = () => O("mkdirSync"),
  qt = () => O("mkdtemp"),
  Ut = () => O("mkdtempSync"),
  Wt = () => O("open"),
  $t = () => O("openSync"),
  zt = () => O("read"),
  Ht = () => O("readSync"),
  Vt = new Proxy({}, { get: (t, S) => O(`promises/${S}`) }),
  Gt = () => O("readdir"),
  Qt = () => O("readdirSync"),
  Zt = () => O("readFile"),
  er = () => O("readFileSync"),
  tr = () => O("readlink"),
  rr = () => O("readlinkSync"),
  nr = () => O("realpath"),
  ir = () => O("realpathSync"),
  or = () => O("rename"),
  ar = () => O("renameSync"),
  sr = () => O("rmdir"),
  cr = () => O("rmdirSync"),
  lr = () => O("rm"),
  pr = () => O("rmSync"),
  ur = () => O("stat"),
  dr = () => O("Stats"),
  yr = () => O("statSync"),
  mr = () => O("symlink"),
  fr = () => O("symlinkSync"),
  Tr = () => O("truncate"),
  hr = () => O("truncateSync"),
  Sr = () => O("unlink"),
  gr = () => O("unlinkSync"),
  vr = () => O("utimes"),
  Er = () => O("utimesSync"),
  _r = () => O("watch"),
  xr = () => O("watchFile"),
  Pr = () => O("write"),
  br = () => O("writeSync"),
  Nr = () => O("writeFile"),
  Ar = () => O("writeFileSync"),
  ne = {
    access: lt,
    accessSync: pt,
    appendFile: ut,
    appendFileSync: dt,
    chmod: yt,
    chmodSync: mt,
    chown: ft,
    chownSync: Tt,
    close: ht,
    closeSync: St,
    constants: gt,
    copyFile: vt,
    copyFileSync: Et,
    createReadStream: _t,
    createWriteStream: xt,
    Dir: Pt,
    Dirent: bt,
    exists: Nt,
    existsSync: At,
    F_OK: ot,
    fdatasync: Ot,
    fdatasyncSync: Dt,
    fstat: Ct,
    fstatSync: wt,
    fsync: jt,
    fsyncSync: Mt,
    ftruncate: kt,
    ftruncateSync: Ft,
    futimes: Kt,
    futimesSync: It,
    link: Yt,
    linkSync: Lt,
    lstat: Rt,
    lstatSync: Bt,
    mkdir: Jt,
    mkdirSync: Xt,
    mkdtemp: qt,
    mkdtempSync: Ut,
    open: Wt,
    openSync: $t,
    promises: Vt,
    R_OK: at,
    read: zt,
    readdir: Gt,
    readdirSync: Qt,
    readFile: Zt,
    readFileSync: er,
    readlink: tr,
    readlinkSync: rr,
    readSync: Ht,
    realpath: nr,
    realpathSync: ir,
    rename: or,
    renameSync: ar,
    rm: lr,
    rmdir: sr,
    rmdirSync: cr,
    rmSync: pr,
    stat: ur,
    Stats: dr,
    statSync: yr,
    symlink: mr,
    symlinkSync: fr,
    truncate: Tr,
    truncateSync: hr,
    unlink: Sr,
    unlinkSync: gr,
    utimes: vr,
    utimesSync: Er,
    W_OK: st,
    watch: _r,
    watchFile: xr,
    write: Pr,
    writeFile: Nr,
    writeFileSync: Ar,
    writeSync: br,
    X_OK: ct,
  };
import * as he from "https://testing.spike.land/v119/ast-module-types@5.0.0/esnext/ast-module-types.mjs";
import * as Te from "https://testing.spike.land/v119/debug@4.3.4/esnext/debug.mjs";
import * as ye from "https://testing.spike.land/v119/globby@13.1.4/esnext/globby.mjs";
import * as Se from "https://testing.spike.land/v119/is-glob@4.0.3/esnext/is-glob.mjs";
import Z from "https://testing.spike.land/v119/path-browserify@1.0.1/esnext/path-browserify.bundle.mjs";
import * as me from "https://testing.spike.land/v119/semver@7.5.0/esnext/semver.mjs";
var Or = pe.default ?? pe,
  $ = ue.default ?? ue,
  Dr = de.default ?? de,
  Cr = ye.default ?? ye,
  fe = me.default ?? me,
  V = Te.default ?? Te,
  wr = he.default ?? he,
  jr = Se.default ?? Se,
  Mr = Object.create,
  ge = Object.defineProperty,
  kr = Object.getOwnPropertyDescriptor,
  Fr = Object.getOwnPropertyNames,
  Kr = Object.getPrototypeOf,
  Ir = Object.prototype.hasOwnProperty,
  Yr =
    (t =>
      typeof te < "u" ? te : typeof Proxy < "u" ? new Proxy(t, { get: (S, x) => (typeof te < "u" ? te : S)[x] }) : t)(
        function(t) {
          if (typeof te < "u") return te.apply(this, arguments);
          throw new Error("Dynamic require of \"" + t + "\" is not supported");
        },
      ),
  F = (t, S) => () => (S || t((S = { exports: {} }).exports, S), S.exports),
  Lr = (t, S) => {
    for (var x in S) ge(t, x, { get: S[x], enumerable: !0 });
  },
  le = (t, S, x, o) => {
    if (S && typeof S == "object" || typeof S == "function") {
      for (let f of Fr(S)) {
        !Ir.call(t, f) && f !== x
          && ge(t, f, { get: () => S[f], enumerable: !(o = kr(S, f)) || o.enumerable });
      }
    }
    return t;
  },
  Rr = (t, S, x) => (le(t, S, "default"), x && le(x, S, "default")),
  je = (
    t,
    S,
    x,
  ) => (x = t != null ? Mr(Kr(t)) : {},
    le(S || !t || !t.__esModule ? ge(x, "default", { value: t, enumerable: !0 }) : x, t)),
  ie = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(r, s, p, e) {
          e === void 0 && (e = p);
          var a = Object.getOwnPropertyDescriptor(s, p);
          (!a || ("get" in a ? !s.__esModule : a.writable || a.configurable))
          && (a = {
            enumerable: !0,
            get: function() {
              return s[p];
            },
          }), Object.defineProperty(r, e, a);
        }
        : function(r, s, p, e) {
          e === void 0 && (e = p), r[e] = s[p];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(r, s) {
          Object.defineProperty(r, "default", { enumerable: !0, value: s });
        }
        : function(r, s) {
          r.default = s;
        }),
      o = t && t.__importStar || function(r) {
        if (r && r.__esModule) return r;
        var s = {};
        if (r != null) for (var p in r) p !== "default" && Object.prototype.hasOwnProperty.call(r, p) && S(s, r, p);
        return x(s, r), s;
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.typescriptVersionIsAtLeast = void 0;
    var f = o(fe), v = o($);
    function c(r) {
      return f.satisfies(v.version, `>= ${r}.0 || >= ${r}.1-rc || >= ${r}.0-beta`, { includePrerelease: !0 });
    }
    var n = ["3.7", "3.8", "3.9", "4.0", "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "5.0"], y = {};
    t.typescriptVersionIsAtLeast = y;
    for (let r of n) y[r] = c(r);
  }),
  ve = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(r, s, p, e) {
          e === void 0 && (e = p);
          var a = Object.getOwnPropertyDescriptor(s, p);
          (!a || ("get" in a ? !s.__esModule : a.writable || a.configurable))
          && (a = {
            enumerable: !0,
            get: function() {
              return s[p];
            },
          }), Object.defineProperty(r, e, a);
        }
        : function(r, s, p, e) {
          e === void 0 && (e = p), r[e] = s[p];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(r, s) {
          Object.defineProperty(r, "default", { enumerable: !0, value: s });
        }
        : function(r, s) {
          r.default = s;
        }),
      o = t && t.__importStar || function(r) {
        if (r && r.__esModule) return r;
        var s = {};
        if (r != null) for (var p in r) p !== "default" && Object.prototype.hasOwnProperty.call(r, p) && S(s, r, p);
        return x(s, r), s;
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.getDecorators = t.getModifiers = void 0;
    var f = o($), v = ie(), c = v.typescriptVersionIsAtLeast["4.8"];
    function n(r) {
      var s;
      if (r != null) {
        if (c) {
          if (f.canHaveModifiers(r)) {
            let p = f.getModifiers(r);
            return p ? Array.from(p) : void 0;
          }
          return;
        }
        return (s = r.modifiers) === null || s === void 0 ? void 0 : s.filter(p => !f.isDecorator(p));
      }
    }
    t.getModifiers = n;
    function y(r) {
      var s;
      if (r != null) {
        if (c) {
          if (f.canHaveDecorators(r)) {
            let p = f.getDecorators(r);
            return p ? Array.from(p) : void 0;
          }
          return;
        }
        return (s = r.decorators) === null || s === void 0 ? void 0 : s.filter(f.isDecorator);
      }
    }
    t.getDecorators = y;
  }),
  Br = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      t.xhtmlEntities = void 0,
      t.xhtmlEntities = {
        quot: "\"",
        amp: "&",
        apos: "'",
        lt: "<",
        gt: ">",
        nbsp: "\xA0",
        iexcl: "\xA1",
        cent: "\xA2",
        pound: "\xA3",
        curren: "\xA4",
        yen: "\xA5",
        brvbar: "\xA6",
        sect: "\xA7",
        uml: "\xA8",
        copy: "\xA9",
        ordf: "\xAA",
        laquo: "\xAB",
        not: "\xAC",
        shy: "\xAD",
        reg: "\xAE",
        macr: "\xAF",
        deg: "\xB0",
        plusmn: "\xB1",
        sup2: "\xB2",
        sup3: "\xB3",
        acute: "\xB4",
        micro: "\xB5",
        para: "\xB6",
        middot: "\xB7",
        cedil: "\xB8",
        sup1: "\xB9",
        ordm: "\xBA",
        raquo: "\xBB",
        frac14: "\xBC",
        frac12: "\xBD",
        frac34: "\xBE",
        iquest: "\xBF",
        Agrave: "\xC0",
        Aacute: "\xC1",
        Acirc: "\xC2",
        Atilde: "\xC3",
        Auml: "\xC4",
        Aring: "\xC5",
        AElig: "\xC6",
        Ccedil: "\xC7",
        Egrave: "\xC8",
        Eacute: "\xC9",
        Ecirc: "\xCA",
        Euml: "\xCB",
        Igrave: "\xCC",
        Iacute: "\xCD",
        Icirc: "\xCE",
        Iuml: "\xCF",
        ETH: "\xD0",
        Ntilde: "\xD1",
        Ograve: "\xD2",
        Oacute: "\xD3",
        Ocirc: "\xD4",
        Otilde: "\xD5",
        Ouml: "\xD6",
        times: "\xD7",
        Oslash: "\xD8",
        Ugrave: "\xD9",
        Uacute: "\xDA",
        Ucirc: "\xDB",
        Uuml: "\xDC",
        Yacute: "\xDD",
        THORN: "\xDE",
        szlig: "\xDF",
        agrave: "\xE0",
        aacute: "\xE1",
        acirc: "\xE2",
        atilde: "\xE3",
        auml: "\xE4",
        aring: "\xE5",
        aelig: "\xE6",
        ccedil: "\xE7",
        egrave: "\xE8",
        eacute: "\xE9",
        ecirc: "\xEA",
        euml: "\xEB",
        igrave: "\xEC",
        iacute: "\xED",
        icirc: "\xEE",
        iuml: "\xEF",
        eth: "\xF0",
        ntilde: "\xF1",
        ograve: "\xF2",
        oacute: "\xF3",
        ocirc: "\xF4",
        otilde: "\xF5",
        ouml: "\xF6",
        divide: "\xF7",
        oslash: "\xF8",
        ugrave: "\xF9",
        uacute: "\xFA",
        ucirc: "\xFB",
        uuml: "\xFC",
        yacute: "\xFD",
        thorn: "\xFE",
        yuml: "\xFF",
        OElig: "\u0152",
        oelig: "\u0153",
        Scaron: "\u0160",
        scaron: "\u0161",
        Yuml: "\u0178",
        fnof: "\u0192",
        circ: "\u02C6",
        tilde: "\u02DC",
        Alpha: "\u0391",
        Beta: "\u0392",
        Gamma: "\u0393",
        Delta: "\u0394",
        Epsilon: "\u0395",
        Zeta: "\u0396",
        Eta: "\u0397",
        Theta: "\u0398",
        Iota: "\u0399",
        Kappa: "\u039A",
        Lambda: "\u039B",
        Mu: "\u039C",
        Nu: "\u039D",
        Xi: "\u039E",
        Omicron: "\u039F",
        Pi: "\u03A0",
        Rho: "\u03A1",
        Sigma: "\u03A3",
        Tau: "\u03A4",
        Upsilon: "\u03A5",
        Phi: "\u03A6",
        Chi: "\u03A7",
        Psi: "\u03A8",
        Omega: "\u03A9",
        alpha: "\u03B1",
        beta: "\u03B2",
        gamma: "\u03B3",
        delta: "\u03B4",
        epsilon: "\u03B5",
        zeta: "\u03B6",
        eta: "\u03B7",
        theta: "\u03B8",
        iota: "\u03B9",
        kappa: "\u03BA",
        lambda: "\u03BB",
        mu: "\u03BC",
        nu: "\u03BD",
        xi: "\u03BE",
        omicron: "\u03BF",
        pi: "\u03C0",
        rho: "\u03C1",
        sigmaf: "\u03C2",
        sigma: "\u03C3",
        tau: "\u03C4",
        upsilon: "\u03C5",
        phi: "\u03C6",
        chi: "\u03C7",
        psi: "\u03C8",
        omega: "\u03C9",
        thetasym: "\u03D1",
        upsih: "\u03D2",
        piv: "\u03D6",
        ensp: "\u2002",
        emsp: "\u2003",
        thinsp: "\u2009",
        zwnj: "\u200C",
        zwj: "\u200D",
        lrm: "\u200E",
        rlm: "\u200F",
        ndash: "\u2013",
        mdash: "\u2014",
        lsquo: "\u2018",
        rsquo: "\u2019",
        sbquo: "\u201A",
        ldquo: "\u201C",
        rdquo: "\u201D",
        bdquo: "\u201E",
        dagger: "\u2020",
        Dagger: "\u2021",
        bull: "\u2022",
        hellip: "\u2026",
        permil: "\u2030",
        prime: "\u2032",
        Prime: "\u2033",
        lsaquo: "\u2039",
        rsaquo: "\u203A",
        oline: "\u203E",
        frasl: "\u2044",
        euro: "\u20AC",
        image: "\u2111",
        weierp: "\u2118",
        real: "\u211C",
        trade: "\u2122",
        alefsym: "\u2135",
        larr: "\u2190",
        uarr: "\u2191",
        rarr: "\u2192",
        darr: "\u2193",
        harr: "\u2194",
        crarr: "\u21B5",
        lArr: "\u21D0",
        uArr: "\u21D1",
        rArr: "\u21D2",
        dArr: "\u21D3",
        hArr: "\u21D4",
        forall: "\u2200",
        part: "\u2202",
        exist: "\u2203",
        empty: "\u2205",
        nabla: "\u2207",
        isin: "\u2208",
        notin: "\u2209",
        ni: "\u220B",
        prod: "\u220F",
        sum: "\u2211",
        minus: "\u2212",
        lowast: "\u2217",
        radic: "\u221A",
        prop: "\u221D",
        infin: "\u221E",
        ang: "\u2220",
        and: "\u2227",
        or: "\u2228",
        cap: "\u2229",
        cup: "\u222A",
        int: "\u222B",
        there4: "\u2234",
        sim: "\u223C",
        cong: "\u2245",
        asymp: "\u2248",
        ne: "\u2260",
        equiv: "\u2261",
        le: "\u2264",
        ge: "\u2265",
        sub: "\u2282",
        sup: "\u2283",
        nsub: "\u2284",
        sube: "\u2286",
        supe: "\u2287",
        oplus: "\u2295",
        otimes: "\u2297",
        perp: "\u22A5",
        sdot: "\u22C5",
        lceil: "\u2308",
        rceil: "\u2309",
        lfloor: "\u230A",
        rfloor: "\u230B",
        lang: "\u2329",
        rang: "\u232A",
        loz: "\u25CA",
        spades: "\u2660",
        clubs: "\u2663",
        hearts: "\u2665",
        diams: "\u2666",
      };
  }),
  Me = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.AST_TOKEN_TYPES = t.AST_NODE_TYPES = void 0;
    var S;
    (function(o) {
      o.AccessorProperty = "AccessorProperty",
        o.ArrayExpression = "ArrayExpression",
        o.ArrayPattern = "ArrayPattern",
        o.ArrowFunctionExpression = "ArrowFunctionExpression",
        o.AssignmentExpression = "AssignmentExpression",
        o.AssignmentPattern = "AssignmentPattern",
        o.AwaitExpression = "AwaitExpression",
        o.BinaryExpression = "BinaryExpression",
        o.BlockStatement = "BlockStatement",
        o.BreakStatement = "BreakStatement",
        o.CallExpression = "CallExpression",
        o.CatchClause = "CatchClause",
        o.ChainExpression = "ChainExpression",
        o.ClassBody = "ClassBody",
        o.ClassDeclaration = "ClassDeclaration",
        o.ClassExpression = "ClassExpression",
        o.ConditionalExpression = "ConditionalExpression",
        o.ContinueStatement = "ContinueStatement",
        o.DebuggerStatement = "DebuggerStatement",
        o.Decorator = "Decorator",
        o.DoWhileStatement = "DoWhileStatement",
        o.EmptyStatement = "EmptyStatement",
        o.ExportAllDeclaration = "ExportAllDeclaration",
        o.ExportDefaultDeclaration = "ExportDefaultDeclaration",
        o.ExportNamedDeclaration = "ExportNamedDeclaration",
        o.ExportSpecifier = "ExportSpecifier",
        o.ExpressionStatement = "ExpressionStatement",
        o.ForInStatement = "ForInStatement",
        o.ForOfStatement = "ForOfStatement",
        o.ForStatement = "ForStatement",
        o.FunctionDeclaration = "FunctionDeclaration",
        o.FunctionExpression = "FunctionExpression",
        o.Identifier = "Identifier",
        o.IfStatement = "IfStatement",
        o.ImportAttribute = "ImportAttribute",
        o.ImportDeclaration = "ImportDeclaration",
        o.ImportDefaultSpecifier = "ImportDefaultSpecifier",
        o.ImportExpression = "ImportExpression",
        o.ImportNamespaceSpecifier = "ImportNamespaceSpecifier",
        o.ImportSpecifier = "ImportSpecifier",
        o.JSXAttribute = "JSXAttribute",
        o.JSXClosingElement = "JSXClosingElement",
        o.JSXClosingFragment = "JSXClosingFragment",
        o.JSXElement = "JSXElement",
        o.JSXEmptyExpression = "JSXEmptyExpression",
        o.JSXExpressionContainer = "JSXExpressionContainer",
        o.JSXFragment = "JSXFragment",
        o.JSXIdentifier = "JSXIdentifier",
        o.JSXMemberExpression = "JSXMemberExpression",
        o.JSXNamespacedName = "JSXNamespacedName",
        o.JSXOpeningElement = "JSXOpeningElement",
        o.JSXOpeningFragment = "JSXOpeningFragment",
        o.JSXSpreadAttribute = "JSXSpreadAttribute",
        o.JSXSpreadChild = "JSXSpreadChild",
        o.JSXText = "JSXText",
        o.LabeledStatement = "LabeledStatement",
        o.Literal = "Literal",
        o.LogicalExpression = "LogicalExpression",
        o.MemberExpression = "MemberExpression",
        o.MetaProperty = "MetaProperty",
        o.MethodDefinition = "MethodDefinition",
        o.NewExpression = "NewExpression",
        o.ObjectExpression = "ObjectExpression",
        o.ObjectPattern = "ObjectPattern",
        o.PrivateIdentifier = "PrivateIdentifier",
        o.Program = "Program",
        o.Property = "Property",
        o.PropertyDefinition = "PropertyDefinition",
        o.RestElement = "RestElement",
        o.ReturnStatement = "ReturnStatement",
        o.SequenceExpression = "SequenceExpression",
        o.SpreadElement = "SpreadElement",
        o.StaticBlock = "StaticBlock",
        o.Super = "Super",
        o.SwitchCase = "SwitchCase",
        o.SwitchStatement = "SwitchStatement",
        o.TaggedTemplateExpression = "TaggedTemplateExpression",
        o.TemplateElement = "TemplateElement",
        o.TemplateLiteral = "TemplateLiteral",
        o.ThisExpression = "ThisExpression",
        o.ThrowStatement = "ThrowStatement",
        o.TryStatement = "TryStatement",
        o.UnaryExpression = "UnaryExpression",
        o.UpdateExpression = "UpdateExpression",
        o.VariableDeclaration = "VariableDeclaration",
        o.VariableDeclarator = "VariableDeclarator",
        o.WhileStatement = "WhileStatement",
        o.WithStatement = "WithStatement",
        o.YieldExpression = "YieldExpression",
        o.TSAbstractAccessorProperty = "TSAbstractAccessorProperty",
        o.TSAbstractKeyword = "TSAbstractKeyword",
        o.TSAbstractMethodDefinition = "TSAbstractMethodDefinition",
        o.TSAbstractPropertyDefinition = "TSAbstractPropertyDefinition",
        o.TSAnyKeyword = "TSAnyKeyword",
        o.TSArrayType = "TSArrayType",
        o.TSAsExpression = "TSAsExpression",
        o.TSAsyncKeyword = "TSAsyncKeyword",
        o.TSBigIntKeyword = "TSBigIntKeyword",
        o.TSBooleanKeyword = "TSBooleanKeyword",
        o.TSCallSignatureDeclaration = "TSCallSignatureDeclaration",
        o.TSClassImplements = "TSClassImplements",
        o.TSConditionalType = "TSConditionalType",
        o.TSConstructorType = "TSConstructorType",
        o.TSConstructSignatureDeclaration = "TSConstructSignatureDeclaration",
        o.TSDeclareFunction = "TSDeclareFunction",
        o.TSDeclareKeyword = "TSDeclareKeyword",
        o.TSEmptyBodyFunctionExpression = "TSEmptyBodyFunctionExpression",
        o.TSEnumDeclaration = "TSEnumDeclaration",
        o.TSEnumMember = "TSEnumMember",
        o.TSExportAssignment = "TSExportAssignment",
        o.TSExportKeyword = "TSExportKeyword",
        o.TSExternalModuleReference = "TSExternalModuleReference",
        o.TSFunctionType = "TSFunctionType",
        o.TSInstantiationExpression = "TSInstantiationExpression",
        o.TSImportEqualsDeclaration = "TSImportEqualsDeclaration",
        o.TSImportType = "TSImportType",
        o.TSIndexedAccessType = "TSIndexedAccessType",
        o.TSIndexSignature = "TSIndexSignature",
        o.TSInferType = "TSInferType",
        o.TSInterfaceBody = "TSInterfaceBody",
        o.TSInterfaceDeclaration = "TSInterfaceDeclaration",
        o.TSInterfaceHeritage = "TSInterfaceHeritage",
        o.TSIntersectionType = "TSIntersectionType",
        o.TSIntrinsicKeyword = "TSIntrinsicKeyword",
        o.TSLiteralType = "TSLiteralType",
        o.TSMappedType = "TSMappedType",
        o.TSMethodSignature = "TSMethodSignature",
        o.TSModuleBlock = "TSModuleBlock",
        o.TSModuleDeclaration = "TSModuleDeclaration",
        o.TSNamedTupleMember = "TSNamedTupleMember",
        o.TSNamespaceExportDeclaration = "TSNamespaceExportDeclaration",
        o.TSNeverKeyword = "TSNeverKeyword",
        o.TSNonNullExpression = "TSNonNullExpression",
        o.TSNullKeyword = "TSNullKeyword",
        o.TSNumberKeyword = "TSNumberKeyword",
        o.TSObjectKeyword = "TSObjectKeyword",
        o.TSOptionalType = "TSOptionalType",
        o.TSParameterProperty = "TSParameterProperty",
        o.TSPrivateKeyword = "TSPrivateKeyword",
        o.TSPropertySignature = "TSPropertySignature",
        o.TSProtectedKeyword = "TSProtectedKeyword",
        o.TSPublicKeyword = "TSPublicKeyword",
        o.TSQualifiedName = "TSQualifiedName",
        o.TSReadonlyKeyword = "TSReadonlyKeyword",
        o.TSRestType = "TSRestType",
        o.TSSatisfiesExpression = "TSSatisfiesExpression",
        o.TSStaticKeyword = "TSStaticKeyword",
        o.TSStringKeyword = "TSStringKeyword",
        o.TSSymbolKeyword = "TSSymbolKeyword",
        o.TSTemplateLiteralType = "TSTemplateLiteralType",
        o.TSThisType = "TSThisType",
        o.TSTupleType = "TSTupleType",
        o.TSTypeAliasDeclaration = "TSTypeAliasDeclaration",
        o.TSTypeAnnotation = "TSTypeAnnotation",
        o.TSTypeAssertion = "TSTypeAssertion",
        o.TSTypeLiteral = "TSTypeLiteral",
        o.TSTypeOperator = "TSTypeOperator",
        o.TSTypeParameter = "TSTypeParameter",
        o.TSTypeParameterDeclaration = "TSTypeParameterDeclaration",
        o.TSTypeParameterInstantiation = "TSTypeParameterInstantiation",
        o.TSTypePredicate = "TSTypePredicate",
        o.TSTypeQuery = "TSTypeQuery",
        o.TSTypeReference = "TSTypeReference",
        o.TSUndefinedKeyword = "TSUndefinedKeyword",
        o.TSUnionType = "TSUnionType",
        o.TSUnknownKeyword = "TSUnknownKeyword",
        o.TSVoidKeyword = "TSVoidKeyword";
    })(S = t.AST_NODE_TYPES || (t.AST_NODE_TYPES = {}));
    var x;
    (function(o) {
      o.Boolean = "Boolean",
        o.Identifier = "Identifier",
        o.JSXIdentifier = "JSXIdentifier",
        o.JSXText = "JSXText",
        o.Keyword = "Keyword",
        o.Null = "Null",
        o.Numeric = "Numeric",
        o.Punctuator = "Punctuator",
        o.RegularExpression = "RegularExpression",
        o.String = "String",
        o.Template = "Template",
        o.Block = "Block",
        o.Line = "Line";
    })(x = t.AST_TOKEN_TYPES || (t.AST_TOKEN_TYPES = {}));
  }),
  Jr = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
  }),
  Xr = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
  }),
  qr = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(f, v, c, n) {
          n === void 0 && (n = c);
          var y = Object.getOwnPropertyDescriptor(v, c);
          (!y || ("get" in y ? !v.__esModule : y.writable || y.configurable))
          && (y = {
            enumerable: !0,
            get: function() {
              return v[c];
            },
          }), Object.defineProperty(f, n, y);
        }
        : function(f, v, c, n) {
          n === void 0 && (n = c), f[n] = v[c];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(f, v) {
          Object.defineProperty(f, "default", { enumerable: !0, value: v });
        }
        : function(f, v) {
          f.default = v;
        }),
      o = t && t.__importStar || function(f) {
        if (f && f.__esModule) return f;
        var v = {};
        if (f != null) for (var c in f) c !== "default" && Object.prototype.hasOwnProperty.call(f, c) && S(v, f, c);
        return x(v, f), v;
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.TSESTree = void 0, t.TSESTree = o(Me());
  }),
  Ur = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(f, v, c, n) {
          n === void 0 && (n = c);
          var y = Object.getOwnPropertyDescriptor(v, c);
          (!y || ("get" in y ? !v.__esModule : y.writable || y.configurable))
          && (y = {
            enumerable: !0,
            get: function() {
              return v[c];
            },
          }), Object.defineProperty(f, n, y);
        }
        : function(f, v, c, n) {
          n === void 0 && (n = c), f[n] = v[c];
        }),
      x = t && t.__exportStar || function(f, v) {
        for (var c in f) c !== "default" && !Object.prototype.hasOwnProperty.call(v, c) && S(v, f, c);
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.AST_TOKEN_TYPES = t.AST_NODE_TYPES = void 0;
    var o = Me();
    Object.defineProperty(t, "AST_NODE_TYPES", {
      enumerable: !0,
      get: function() {
        return o.AST_NODE_TYPES;
      },
    }),
      Object.defineProperty(t, "AST_TOKEN_TYPES", {
        enumerable: !0,
        get: function() {
          return o.AST_TOKEN_TYPES;
        },
      }),
      x(Jr(), t),
      x(Xr(), t),
      x(qr(), t);
  }),
  Wr = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
  }),
  $r = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
  }),
  oe = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(f, v, c, n) {
          n === void 0 && (n = c);
          var y = Object.getOwnPropertyDescriptor(v, c);
          (!y || ("get" in y ? !v.__esModule : y.writable || y.configurable))
          && (y = {
            enumerable: !0,
            get: function() {
              return v[c];
            },
          }), Object.defineProperty(f, n, y);
        }
        : function(f, v, c, n) {
          n === void 0 && (n = c), f[n] = v[c];
        }),
      x = t && t.__exportStar || function(f, v) {
        for (var c in f) c !== "default" && !Object.prototype.hasOwnProperty.call(v, c) && S(v, f, c);
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.TSESTree = t.AST_TOKEN_TYPES = t.AST_NODE_TYPES = void 0;
    var o = Ur();
    Object.defineProperty(t, "AST_NODE_TYPES", {
      enumerable: !0,
      get: function() {
        return o.AST_NODE_TYPES;
      },
    }),
      Object.defineProperty(t, "AST_TOKEN_TYPES", {
        enumerable: !0,
        get: function() {
          return o.AST_TOKEN_TYPES;
        },
      }),
      Object.defineProperty(t, "TSESTree", {
        enumerable: !0,
        get: function() {
          return o.TSESTree;
        },
      }),
      x(Wr(), t),
      x($r(), t);
  }),
  ae = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(h, D, j, I) {
          I === void 0 && (I = j);
          var X = Object.getOwnPropertyDescriptor(D, j);
          (!X || ("get" in X ? !D.__esModule : X.writable || X.configurable))
          && (X = {
            enumerable: !0,
            get: function() {
              return D[j];
            },
          }), Object.defineProperty(h, I, X);
        }
        : function(h, D, j, I) {
          I === void 0 && (I = j), h[I] = D[j];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(h, D) {
          Object.defineProperty(h, "default", { enumerable: !0, value: D });
        }
        : function(h, D) {
          h.default = D;
        }),
      o = t && t.__importStar || function(h) {
        if (h && h.__esModule) return h;
        var D = {};
        if (h != null) for (var j in h) j !== "default" && Object.prototype.hasOwnProperty.call(h, j) && S(D, h, j);
        return x(D, h), D;
      };
    Object.defineProperty(t, "__esModule", { value: !0 }),
      t.isThisInTypeQuery =
        t.isThisIdentifier =
        t.identifierIsThisKeyword =
        t.firstDefined =
        t.nodeHasTokens =
        t.createError =
        t.TSError =
        t.convertTokens =
        t.convertToken =
        t.getTokenType =
        t.isChildUnwrappableOptionalChain =
        t.isChainExpression =
        t.isOptional =
        t.isComputedProperty =
        t.unescapeStringLiteralText =
        t.hasJSXAncestor =
        t.findFirstMatchingAncestor =
        t.findNextToken =
        t.getTSNodeAccessibility =
        t.getDeclarationKind =
        t.isJSXToken =
        t.isToken =
        t.getRange =
        t.canContainDirective =
        t.getLocFor =
        t.getLineAndCharacterFor =
        t.getBinaryExpressionType =
        t.isJSDocComment =
        t.isComment =
        t.isComma =
        t.getLastModifier =
        t.hasModifier =
        t.isESTreeClassMember =
        t.getTextForTokenKind =
        t.isLogicalOperator =
        t.isAssignmentOperator =
          void 0;
    var f = o($),
      v = ve(),
      c = Br(),
      n = oe(),
      y = ie(),
      r = y.typescriptVersionIsAtLeast["5.0"],
      s = f.SyntaxKind,
      p = [s.BarBarToken, s.AmpersandAmpersandToken, s.QuestionQuestionToken];
    function e(h) {
      return h.kind >= s.FirstAssignment && h.kind <= s.LastAssignment;
    }
    t.isAssignmentOperator = e;
    function a(h) {
      return p.includes(h.kind);
    }
    t.isLogicalOperator = a;
    function l(h) {
      return f.tokenToString(h);
    }
    t.getTextForTokenKind = l;
    function u(h) {
      return h.kind !== s.SemicolonClassElement;
    }
    t.isESTreeClassMember = u;
    function T(h, D) {
      return (0, v.getModifiers)(D)?.some(I => I.kind === h) === !0;
    }
    t.hasModifier = T;
    function b(h) {
      var D;
      let j = (0, v.getModifiers)(h);
      return j == null ? null : (D = j[j.length - 1]) !== null && D !== void 0 ? D : null;
    }
    t.getLastModifier = b;
    function C(h) {
      return h.kind === s.CommaToken;
    }
    t.isComma = C;
    function k(h) {
      return h.kind === s.SingleLineCommentTrivia || h.kind === s.MultiLineCommentTrivia;
    }
    t.isComment = k;
    function A(h) {
      return h.kind === s.JSDocComment;
    }
    t.isJSDocComment = A;
    function w(h) {
      return e(h)
        ? n.AST_NODE_TYPES.AssignmentExpression
        : a(h)
        ? n.AST_NODE_TYPES.LogicalExpression
        : n.AST_NODE_TYPES.BinaryExpression;
    }
    t.getBinaryExpressionType = w;
    function d(h, D) {
      let j = D.getLineAndCharacterOfPosition(h);
      return { line: j.line + 1, column: j.character };
    }
    t.getLineAndCharacterFor = d;
    function E(h, D, j) {
      return { start: d(h, j), end: d(D, j) };
    }
    t.getLocFor = E;
    function i(h) {
      if (h.kind === f.SyntaxKind.Block) {
        switch (h.parent.kind) {
          case f.SyntaxKind.Constructor:
          case f.SyntaxKind.GetAccessor:
          case f.SyntaxKind.SetAccessor:
          case f.SyntaxKind.ArrowFunction:
          case f.SyntaxKind.FunctionExpression:
          case f.SyntaxKind.FunctionDeclaration:
          case f.SyntaxKind.MethodDeclaration:
            return !0;
          default:
            return !1;
        }
      }
      return !0;
    }
    t.canContainDirective = i;
    function m(h, D) {
      return [h.getStart(D), h.getEnd()];
    }
    t.getRange = m;
    function g(h) {
      return h.kind >= s.FirstToken && h.kind <= s.LastToken;
    }
    t.isToken = g;
    function _(h) {
      return h.kind >= s.JsxElement && h.kind <= s.JsxAttribute;
    }
    t.isJSXToken = _;
    function P(h) {
      return h.flags & f.NodeFlags.Let ? "let" : h.flags & f.NodeFlags.Const ? "const" : "var";
    }
    t.getDeclarationKind = P;
    function N(h) {
      let D = (0, v.getModifiers)(h);
      if (D == null) return null;
      for (let j of D) {
        switch (j.kind) {
          case s.PublicKeyword:
            return "public";
          case s.ProtectedKeyword:
            return "protected";
          case s.PrivateKeyword:
            return "private";
          default:
            break;
        }
      }
      return null;
    }
    t.getTSNodeAccessibility = N;
    function M(h, D, j) {
      return I(D);
      function I(X) {
        return f.isToken(X) && X.pos === h.end
          ? X
          : Pe(X.getChildren(j), G => (G.pos <= h.pos && G.end > h.end || G.pos === h.end) && xe(G, j) ? I(G) : void 0);
      }
    }
    t.findNextToken = M;
    function K(h, D) {
      for (; h;) {
        if (D(h)) return h;
        h = h.parent;
      }
    }
    t.findFirstMatchingAncestor = K;
    function J(h) {
      return !!K(h, _);
    }
    t.hasJSXAncestor = J;
    function Y(h) {
      return h.replace(/&(?:#\d+|#x[\da-fA-F]+|[0-9a-zA-Z]+);/g, D => {
        let j = D.slice(1, -1);
        if (j[0] === "#") {
          let I = j[1] === "x" ? parseInt(j.slice(2), 16) : parseInt(j.slice(1), 10);
          return I > 1114111 ? D : String.fromCodePoint(I);
        }
        return c.xhtmlEntities[j] || D;
      });
    }
    t.unescapeStringLiteralText = Y;
    function B(h) {
      return h.kind === s.ComputedPropertyName;
    }
    t.isComputedProperty = B;
    function q(h) {
      return h.questionToken ? h.questionToken.kind === s.QuestionToken : !1;
    }
    t.isOptional = q;
    function R(h) {
      return h.type === n.AST_NODE_TYPES.ChainExpression;
    }
    t.isChainExpression = R;
    function U(h, D) {
      return R(D) && h.expression.kind !== f.SyntaxKind.ParenthesizedExpression;
    }
    t.isChildUnwrappableOptionalChain = U;
    function z(h) {
      let D;
      if (
        r && h.kind === s.Identifier
          ? D = f.identifierToKeywordKind(h)
          : "originalKeywordKind" in h && (D = h.originalKeywordKind), D
      ) {
        return D === s.NullKeyword
          ? n.AST_TOKEN_TYPES.Null
          : D >= s.FirstFutureReservedWord && D <= s.LastKeyword
          ? n.AST_TOKEN_TYPES.Identifier
          : n.AST_TOKEN_TYPES.Keyword;
      }
      if (h.kind >= s.FirstKeyword && h.kind <= s.LastFutureReservedWord) {
        return h.kind === s.FalseKeyword
            || h.kind === s.TrueKeyword
          ? n.AST_TOKEN_TYPES.Boolean
          : n.AST_TOKEN_TYPES.Keyword;
      }
      if (h.kind >= s.FirstPunctuation && h.kind <= s.LastPunctuation) return n.AST_TOKEN_TYPES.Punctuator;
      if (h.kind >= s.NoSubstitutionTemplateLiteral && h.kind <= s.TemplateTail) return n.AST_TOKEN_TYPES.Template;
      switch (h.kind) {
        case s.NumericLiteral:
          return n.AST_TOKEN_TYPES.Numeric;
        case s.JsxText:
          return n.AST_TOKEN_TYPES.JSXText;
        case s.StringLiteral:
          return h.parent && (h.parent.kind === s.JsxAttribute || h.parent.kind === s.JsxElement)
            ? n.AST_TOKEN_TYPES.JSXText
            : n.AST_TOKEN_TYPES.String;
        case s.RegularExpressionLiteral:
          return n.AST_TOKEN_TYPES.RegularExpression;
        case s.Identifier:
        case s.ConstructorKeyword:
        case s.GetKeyword:
        case s.SetKeyword:
        default:
      }
      return h.parent && h.kind === s.Identifier
          && (_(h.parent) || h.parent.kind === s.PropertyAccessExpression && J(h))
        ? n.AST_TOKEN_TYPES.JSXIdentifier
        : n.AST_TOKEN_TYPES.Identifier;
    }
    t.getTokenType = z;
    function ee(h, D) {
      let j = h.kind === s.JsxText ? h.getFullStart() : h.getStart(D), I = h.getEnd(), X = D.text.slice(j, I), G = z(h);
      return G === n.AST_TOKEN_TYPES.RegularExpression
        ? {
          type: G,
          value: X,
          range: [j, I],
          loc: E(j, I, D),
          regex: { pattern: X.slice(1, X.lastIndexOf("/")), flags: X.slice(X.lastIndexOf("/") + 1) },
        }
        : { type: G, value: X, range: [j, I], loc: E(j, I, D) };
    }
    t.convertToken = ee;
    function se(h) {
      let D = [];
      function j(I) {
        if (!(k(I) || A(I))) {
          if (g(I) && I.kind !== s.EndOfFileToken) {
            let X = ee(I, h);
            X && D.push(X);
          } else I.getChildren(h).forEach(j);
        }
      }
      return j(h), D;
    }
    t.convertTokens = se;
    var _e = class extends Error {
      constructor(h, D, j, I, X) {
        super(h),
          this.fileName = D,
          this.index = j,
          this.lineNumber = I,
          this.column = X,
          Object.defineProperty(this, "name", { value: new.target.name, enumerable: !1, configurable: !0 });
      }
    };
    t.TSError = _e;
    function $e(h, D, j) {
      let I = h.getLineAndCharacterOfPosition(D);
      return new _e(j, h.fileName, D, I.line + 1, I.character);
    }
    t.createError = $e;
    function xe(h, D) {
      return h.kind === s.EndOfFileToken ? !!h.jsDoc : h.getWidth(D) !== 0;
    }
    t.nodeHasTokens = xe;
    function Pe(h, D) {
      if (h !== void 0) {
        for (let j = 0; j < h.length; j++) {
          let I = D(h[j], j);
          if (I !== void 0) return I;
        }
      }
    }
    t.firstDefined = Pe;
    function be(h) {
      return (r ? f.identifierToKeywordKind(h) : h.originalKeywordKind) === s.ThisKeyword;
    }
    t.identifierIsThisKeyword = be;
    function Ne(h) {
      return !!h && h.kind === s.Identifier && be(h);
    }
    t.isThisIdentifier = Ne;
    function ze(h) {
      if (!Ne(h)) return !1;
      for (; f.isQualifiedName(h.parent) && h.parent.left === h;) h = h.parent;
      return h.parent.kind === s.TypeQuery;
    }
    t.isThisInTypeQuery = ze;
  }),
  ke = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(e, a, l, u) {
          u === void 0 && (u = l);
          var T = Object.getOwnPropertyDescriptor(a, l);
          (!T || ("get" in T ? !a.__esModule : T.writable || T.configurable))
          && (T = {
            enumerable: !0,
            get: function() {
              return a[l];
            },
          }), Object.defineProperty(e, u, T);
        }
        : function(e, a, l, u) {
          u === void 0 && (u = l), e[u] = a[l];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(e, a) {
          Object.defineProperty(e, "default", { enumerable: !0, value: a });
        }
        : function(e, a) {
          e.default = a;
        }),
      o = t && t.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var a = {};
        if (e != null) for (var l in e) l !== "default" && Object.prototype.hasOwnProperty.call(e, l) && S(a, e, l);
        return x(a, e), a;
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Converter = t.convertError = void 0;
    var f = o($), v = ve(), c = ae(), n = oe(), y = ie(), r = f.SyntaxKind;
    function s(e) {
      return (0, c.createError)(e.file, e.start, "message" in e && e.message || e.messageText);
    }
    t.convertError = s;
    var p = class {
      constructor(e, a) {
        this.esTreeNodeToTSNodeMap = new WeakMap(),
          this.tsNodeToESTreeNodeMap = new WeakMap(),
          this.allowPattern = !1,
          this.inTypeMode = !1,
          this.ast = e,
          this.options = Object.assign({}, a);
      }
      getASTMaps() {
        return { esTreeNodeToTSNodeMap: this.esTreeNodeToTSNodeMap, tsNodeToESTreeNodeMap: this.tsNodeToESTreeNodeMap };
      }
      convertProgram() {
        return this.converter(this.ast);
      }
      converter(e, a, l, u) {
        if (!e) return null;
        let T = this.inTypeMode, b = this.allowPattern;
        l !== void 0 && (this.inTypeMode = l), u !== void 0 && (this.allowPattern = u);
        let C = this.convertNode(e, a ?? e.parent);
        return this.registerTSNodeInNodeMap(e, C), this.inTypeMode = T, this.allowPattern = b, C;
      }
      fixExports(e, a) {
        let l = (0, v.getModifiers)(e);
        if (l?.[0].kind === r.ExportKeyword) {
          this.registerTSNodeInNodeMap(e, a);
          let u = l[0],
            T = l[1],
            b = T && T.kind === r.DefaultKeyword,
            C = b ? (0, c.findNextToken)(T, this.ast, this.ast) : (0, c.findNextToken)(u, this.ast, this.ast);
          if (
            a.range[0] = C.getStart(this.ast), a.loc = (0, c.getLocFor)(a.range[0], a.range[1], this.ast), b
          ) {
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ExportDefaultDeclaration,
              declaration: a,
              range: [u.getStart(this.ast), a.range[1]],
              exportKind: "value",
            });
          }
          {
            let k = a.type === n.AST_NODE_TYPES.TSInterfaceDeclaration
                || a.type === n.AST_NODE_TYPES.TSTypeAliasDeclaration,
              A = "declare" in a && a.declare === !0;
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ExportNamedDeclaration,
              declaration: a,
              specifiers: [],
              source: null,
              exportKind: k || A ? "type" : "value",
              range: [u.getStart(this.ast), a.range[1]],
              assertions: [],
            });
          }
        }
        return a;
      }
      registerTSNodeInNodeMap(e, a) {
        a && this.options.shouldPreserveNodeMaps
          && (this.tsNodeToESTreeNodeMap.has(e) || this.tsNodeToESTreeNodeMap.set(e, a));
      }
      convertPattern(e, a) {
        return this.converter(e, a, this.inTypeMode, !0);
      }
      convertChild(e, a) {
        return this.converter(e, a, this.inTypeMode, !1);
      }
      convertType(e, a) {
        return this.converter(e, a, !0, !1);
      }
      createNode(e, a) {
        let l = a;
        return l.range || (l.range = (0, c.getRange)(e, this.ast)),
          l.loc || (l.loc = (0, c.getLocFor)(l.range[0], l.range[1], this.ast)),
          l && this.options.shouldPreserveNodeMaps && this.esTreeNodeToTSNodeMap.set(l, e),
          l;
      }
      convertBindingNameWithTypeAnnotation(e, a, l) {
        let u = this.convertPattern(e);
        return a
          && (u.typeAnnotation = this.convertTypeAnnotation(a, l), this.fixParentLocation(u, u.typeAnnotation.range)),
          u;
      }
      convertTypeAnnotation(e, a) {
        let l = a?.kind === r.FunctionType || a?.kind === r.ConstructorType ? 2 : 1,
          u = e.getFullStart() - l,
          T = (0, c.getLocFor)(u, e.end, this.ast);
        return {
          type: n.AST_NODE_TYPES.TSTypeAnnotation,
          loc: T,
          range: [u, e.end],
          typeAnnotation: this.convertType(e),
        };
      }
      convertBodyExpressions(e, a) {
        let l = (0, c.canContainDirective)(a);
        return e.map(u => {
          let T = this.convertChild(u);
          if (l) {
            if (T?.expression && f.isExpressionStatement(u) && f.isStringLiteral(u.expression)) {
              let b = T.expression.raw;
              return T.directive = b.slice(1, -1), T;
            } else l = !1;
          }
          return T;
        }).filter(u => u);
      }
      convertTypeArgumentsToTypeParameters(e, a) {
        let l = (0, c.findNextToken)(e, this.ast, this.ast);
        return this.createNode(a, {
          type: n.AST_NODE_TYPES.TSTypeParameterInstantiation,
          range: [e.pos - 1, l.end],
          params: e.map(u => this.convertType(u)),
        });
      }
      convertTSTypeParametersToTypeParametersDeclaration(e) {
        let a = (0, c.findNextToken)(e, this.ast, this.ast);
        return {
          type: n.AST_NODE_TYPES.TSTypeParameterDeclaration,
          range: [e.pos - 1, a.end],
          loc: (0, c.getLocFor)(e.pos - 1, a.end, this.ast),
          params: e.map(l => this.convertType(l)),
        };
      }
      convertParameters(e) {
        return e?.length
          ? e.map(a => {
            let l = this.convertChild(a), u = (0, v.getDecorators)(a);
            return u?.length && (l.decorators = u.map(T => this.convertChild(T))), l;
          })
          : [];
      }
      convertChainExpression(e, a) {
        let { child: l, isOptional: u } = (() =>
            e.type === n.AST_NODE_TYPES.MemberExpression
              ? { child: e.object, isOptional: e.optional }
              : e.type === n.AST_NODE_TYPES.CallExpression
              ? { child: e.callee, isOptional: e.optional }
              : { child: e.expression, isOptional: !1 })(),
          T = (0, c.isChildUnwrappableOptionalChain)(a, l);
        if (!T && !u) return e;
        if (T && (0, c.isChainExpression)(l)) {
          let b = l.expression;
          e.type === n.AST_NODE_TYPES.MemberExpression
            ? e.object = b
            : e.type === n.AST_NODE_TYPES.CallExpression
            ? e.callee = b
            : e.expression = b;
        }
        return this.createNode(a, { type: n.AST_NODE_TYPES.ChainExpression, expression: e });
      }
      deeplyCopy(e) {
        if (e.kind === f.SyntaxKind.JSDocFunctionType) {
          throw (0, c.createError)(this.ast, e.pos, "JSDoc types can only be used inside documentation comments.");
        }
        let a = `TS${r[e.kind]}`;
        if (this.options.errorOnUnknownASTType && !n.AST_NODE_TYPES[a]) {
          throw new Error(`Unknown AST_NODE_TYPE: "${a}"`);
        }
        let l = this.createNode(e, { type: a });
        "type" in e && (l.typeAnnotation = e.type && "kind" in e.type && f.isTypeNode(e.type)
          ? this.convertTypeAnnotation(e.type, e)
          : null),
          "typeArguments" in e && (l.typeParameters = e.typeArguments && "pos" in e.typeArguments
            ? this.convertTypeArgumentsToTypeParameters(e.typeArguments, e)
            : null),
          "typeParameters" in e && (l.typeParameters = e.typeParameters && "pos" in e.typeParameters
            ? this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters)
            : null);
        let u = (0, v.getDecorators)(e);
        u?.length && (l.decorators = u.map(b => this.convertChild(b)));
        let T = new Set([
          "_children",
          "decorators",
          "end",
          "flags",
          "illegalDecorators",
          "heritageClauses",
          "locals",
          "localSymbol",
          "jsDoc",
          "kind",
          "modifierFlagsCache",
          "modifiers",
          "nextContainer",
          "parent",
          "pos",
          "symbol",
          "transformFlags",
          "type",
          "typeArguments",
          "typeParameters",
        ]);
        return Object.entries(e).filter(([b]) => !T.has(b)).forEach(([b, C]) => {
          Array.isArray(C)
            ? l[b] = C.map(k => this.convertChild(k))
            : C && typeof C == "object" && C.kind
            ? l[b] = this.convertChild(C)
            : l[b] = C;
        }),
          l;
      }
      convertJSXIdentifier(e) {
        let a = this.createNode(e, { type: n.AST_NODE_TYPES.JSXIdentifier, name: e.getText() });
        return this.registerTSNodeInNodeMap(e, a), a;
      }
      convertJSXNamespaceOrIdentifier(e) {
        let a = e.getText(), l = a.indexOf(":");
        if (l > 0) {
          let u = (0, c.getRange)(e, this.ast),
            T = this.createNode(e, {
              type: n.AST_NODE_TYPES.JSXNamespacedName,
              namespace: this.createNode(e, {
                type: n.AST_NODE_TYPES.JSXIdentifier,
                name: a.slice(0, l),
                range: [u[0], u[0] + l],
              }),
              name: this.createNode(e, {
                type: n.AST_NODE_TYPES.JSXIdentifier,
                name: a.slice(l + 1),
                range: [u[0] + l + 1, u[1]],
              }),
              range: u,
            });
          return this.registerTSNodeInNodeMap(e, T), T;
        }
        return this.convertJSXIdentifier(e);
      }
      convertJSXTagName(e, a) {
        let l;
        switch (e.kind) {
          case r.PropertyAccessExpression:
            if (e.name.kind === r.PrivateIdentifier) throw new Error("Non-private identifier expected.");
            l = this.createNode(e, {
              type: n.AST_NODE_TYPES.JSXMemberExpression,
              object: this.convertJSXTagName(e.expression, a),
              property: this.convertJSXIdentifier(e.name),
            });
            break;
          case r.ThisKeyword:
          case r.Identifier:
          default:
            return this.convertJSXNamespaceOrIdentifier(e);
        }
        return this.registerTSNodeInNodeMap(e, l), l;
      }
      convertMethodSignature(e) {
        let a = this.createNode(e, {
          type: n.AST_NODE_TYPES.TSMethodSignature,
          computed: (0, c.isComputedProperty)(e.name),
          key: this.convertChild(e.name),
          params: this.convertParameters(e.parameters),
          kind: (() => {
            switch (e.kind) {
              case r.GetAccessor:
                return "get";
              case r.SetAccessor:
                return "set";
              case r.MethodSignature:
                return "method";
            }
          })(),
        });
        (0, c.isOptional)(e) && (a.optional = !0),
          e.type && (a.returnType = this.convertTypeAnnotation(e.type, e)),
          (0, c.hasModifier)(r.ReadonlyKeyword, e) && (a.readonly = !0),
          e.typeParameters
          && (a.typeParameters = this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters));
        let l = (0, c.getTSNodeAccessibility)(e);
        return l && (a.accessibility = l),
          (0, c.hasModifier)(r.ExportKeyword, e) && (a.export = !0),
          (0, c.hasModifier)(r.StaticKeyword, e) && (a.static = !0),
          a;
      }
      convertAssertClasue(e) {
        return e === void 0 ? [] : e.elements.map(a => this.convertChild(a));
      }
      applyModifiersToResult(e, a) {
        if (!a) return;
        let l = [];
        for (let u of a) {
          switch (u.kind) {
            case r.ExportKeyword:
            case r.DefaultKeyword:
              break;
            case r.ConstKeyword:
              e.const = !0;
              break;
            case r.DeclareKeyword:
              e.declare = !0;
              break;
            default:
              l.push(this.convertChild(u));
              break;
          }
        }
        l.length > 0 && (e.modifiers = l);
      }
      fixParentLocation(e, a) {
        a[0] < e.range[0] && (e.range[0] = a[0], e.loc.start = (0, c.getLineAndCharacterFor)(e.range[0], this.ast)),
          a[1] > e.range[1] && (e.range[1] = a[1], e.loc.end = (0, c.getLineAndCharacterFor)(e.range[1], this.ast));
      }
      assertModuleSpecifier(e, a) {
        var l;
        if (!a && e.moduleSpecifier == null) {
          throw (0, c.createError)(this.ast, e.pos, "Module specifier must be a string literal.");
        }
        if (
          e.moduleSpecifier && ((l = e.moduleSpecifier) === null || l === void 0 ? void 0 : l.kind) !== r.StringLiteral
        ) {
          throw (0, c.createError)(this.ast, e.moduleSpecifier.pos, "Module specifier must be a string literal.");
        }
      }
      convertNode(e, a) {
        var l, u, T, b, C, k, A, w, d, E;
        switch (e.kind) {
          case r.SourceFile:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.Program,
              body: this.convertBodyExpressions(e.statements, e),
              sourceType: e.externalModuleIndicator ? "module" : "script",
              range: [e.getStart(this.ast), e.endOfFileToken.end],
            });
          case r.Block:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.BlockStatement,
              body: this.convertBodyExpressions(e.statements, e),
            });
          case r.Identifier:
            return (0, c.isThisInTypeQuery)(e)
              ? this.createNode(e, { type: n.AST_NODE_TYPES.ThisExpression })
              : this.createNode(e, { type: n.AST_NODE_TYPES.Identifier, name: e.text });
          case r.PrivateIdentifier:
            return this.createNode(e, { type: n.AST_NODE_TYPES.PrivateIdentifier, name: e.text.slice(1) });
          case r.WithStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.WithStatement,
              object: this.convertChild(e.expression),
              body: this.convertChild(e.statement),
            });
          case r.ReturnStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ReturnStatement,
              argument: this.convertChild(e.expression),
            });
          case r.LabeledStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.LabeledStatement,
              label: this.convertChild(e.label),
              body: this.convertChild(e.statement),
            });
          case r.ContinueStatement:
            return this.createNode(e, { type: n.AST_NODE_TYPES.ContinueStatement, label: this.convertChild(e.label) });
          case r.BreakStatement:
            return this.createNode(e, { type: n.AST_NODE_TYPES.BreakStatement, label: this.convertChild(e.label) });
          case r.IfStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.IfStatement,
              test: this.convertChild(e.expression),
              consequent: this.convertChild(e.thenStatement),
              alternate: this.convertChild(e.elseStatement),
            });
          case r.SwitchStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.SwitchStatement,
              discriminant: this.convertChild(e.expression),
              cases: e.caseBlock.clauses.map(i => this.convertChild(i)),
            });
          case r.CaseClause:
          case r.DefaultClause:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.SwitchCase,
              test: e.kind === r.CaseClause ? this.convertChild(e.expression) : null,
              consequent: e.statements.map(i => this.convertChild(i)),
            });
          case r.ThrowStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ThrowStatement,
              argument: this.convertChild(e.expression),
            });
          case r.TryStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TryStatement,
              block: this.convertChild(e.tryBlock),
              handler: this.convertChild(e.catchClause),
              finalizer: this.convertChild(e.finallyBlock),
            });
          case r.CatchClause:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.CatchClause,
              param: e.variableDeclaration
                ? this.convertBindingNameWithTypeAnnotation(e.variableDeclaration.name, e.variableDeclaration.type)
                : null,
              body: this.convertChild(e.block),
            });
          case r.WhileStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.WhileStatement,
              test: this.convertChild(e.expression),
              body: this.convertChild(e.statement),
            });
          case r.DoStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.DoWhileStatement,
              test: this.convertChild(e.expression),
              body: this.convertChild(e.statement),
            });
          case r.ForStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ForStatement,
              init: this.convertChild(e.initializer),
              test: this.convertChild(e.condition),
              update: this.convertChild(e.incrementor),
              body: this.convertChild(e.statement),
            });
          case r.ForInStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ForInStatement,
              left: this.convertPattern(e.initializer),
              right: this.convertChild(e.expression),
              body: this.convertChild(e.statement),
            });
          case r.ForOfStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ForOfStatement,
              left: this.convertPattern(e.initializer),
              right: this.convertChild(e.expression),
              body: this.convertChild(e.statement),
              await: !!(e.awaitModifier && e.awaitModifier.kind === r.AwaitKeyword),
            });
          case r.FunctionDeclaration: {
            let i = (0, c.hasModifier)(r.DeclareKeyword, e),
              m = this.createNode(e, {
                type: i || !e.body ? n.AST_NODE_TYPES.TSDeclareFunction : n.AST_NODE_TYPES.FunctionDeclaration,
                id: this.convertChild(e.name),
                generator: !!e.asteriskToken,
                expression: !1,
                async: (0, c.hasModifier)(r.AsyncKeyword, e),
                params: this.convertParameters(e.parameters),
                body: this.convertChild(e.body) || void 0,
              });
            return e.type && (m.returnType = this.convertTypeAnnotation(e.type, e)),
              e.typeParameters
              && (m.typeParameters = this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters)),
              i && (m.declare = !0),
              this.fixExports(e, m);
          }
          case r.VariableDeclaration: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.VariableDeclarator,
              id: this.convertBindingNameWithTypeAnnotation(e.name, e.type, e),
              init: this.convertChild(e.initializer),
            });
            return e.exclamationToken && (i.definite = !0), i;
          }
          case r.VariableStatement: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.VariableDeclaration,
              declarations: e.declarationList.declarations.map(m => this.convertChild(m)),
              kind: (0, c.getDeclarationKind)(e.declarationList),
            });
            return (0, c.hasModifier)(r.DeclareKeyword, e) && (i.declare = !0), this.fixExports(e, i);
          }
          case r.VariableDeclarationList:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.VariableDeclaration,
              declarations: e.declarations.map(i => this.convertChild(i)),
              kind: (0, c.getDeclarationKind)(e),
            });
          case r.ExpressionStatement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ExpressionStatement,
              expression: this.convertChild(e.expression),
            });
          case r.ThisKeyword:
            return this.createNode(e, { type: n.AST_NODE_TYPES.ThisExpression });
          case r.ArrayLiteralExpression:
            return this.allowPattern
              ? this.createNode(e, {
                type: n.AST_NODE_TYPES.ArrayPattern,
                elements: e.elements.map(i => this.convertPattern(i)),
              })
              : this.createNode(e, {
                type: n.AST_NODE_TYPES.ArrayExpression,
                elements: e.elements.map(i => this.convertChild(i)),
              });
          case r.ObjectLiteralExpression:
            return this.allowPattern
              ? this.createNode(e, {
                type: n.AST_NODE_TYPES.ObjectPattern,
                properties: e.properties.map(i => this.convertPattern(i)),
              })
              : this.createNode(e, {
                type: n.AST_NODE_TYPES.ObjectExpression,
                properties: e.properties.map(i => this.convertChild(i)),
              });
          case r.PropertyAssignment:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.Property,
              key: this.convertChild(e.name),
              value: this.converter(e.initializer, e, this.inTypeMode, this.allowPattern),
              computed: (0, c.isComputedProperty)(e.name),
              method: !1,
              shorthand: !1,
              kind: "init",
            });
          case r.ShorthandPropertyAssignment:
            return e.objectAssignmentInitializer
              ? this.createNode(e, {
                type: n.AST_NODE_TYPES.Property,
                key: this.convertChild(e.name),
                value: this.createNode(e, {
                  type: n.AST_NODE_TYPES.AssignmentPattern,
                  left: this.convertPattern(e.name),
                  right: this.convertChild(e.objectAssignmentInitializer),
                }),
                computed: !1,
                method: !1,
                shorthand: !0,
                kind: "init",
              })
              : this.createNode(e, {
                type: n.AST_NODE_TYPES.Property,
                key: this.convertChild(e.name),
                value: this.convertChild(e.name),
                computed: !1,
                method: !1,
                shorthand: !0,
                kind: "init",
              });
          case r.ComputedPropertyName:
            return this.convertChild(e.expression);
          case r.PropertyDeclaration: {
            let i = (0, c.hasModifier)(r.AbstractKeyword, e),
              m = (0, c.hasModifier)(r.AccessorKeyword, e),
              g = (() =>
                m
                  ? i ? n.AST_NODE_TYPES.TSAbstractAccessorProperty : n.AST_NODE_TYPES.AccessorProperty
                  : i
                  ? n.AST_NODE_TYPES.TSAbstractPropertyDefinition
                  : n.AST_NODE_TYPES.PropertyDefinition)(),
              _ = this.createNode(e, {
                type: g,
                key: this.convertChild(e.name),
                value: i ? null : this.convertChild(e.initializer),
                computed: (0, c.isComputedProperty)(e.name),
                static: (0, c.hasModifier)(r.StaticKeyword, e),
                readonly: (0, c.hasModifier)(r.ReadonlyKeyword, e) || void 0,
                declare: (0, c.hasModifier)(r.DeclareKeyword, e),
                override: (0, c.hasModifier)(r.OverrideKeyword, e),
              });
            e.type && (_.typeAnnotation = this.convertTypeAnnotation(e.type, e));
            let P = (0, v.getDecorators)(e);
            P && (_.decorators = P.map(M => this.convertChild(M)));
            let N = (0, c.getTSNodeAccessibility)(e);
            return N && (_.accessibility = N),
              (e.name.kind === r.Identifier || e.name.kind === r.ComputedPropertyName
                || e.name.kind === r.PrivateIdentifier) && e.questionToken && (_.optional = !0),
              e.exclamationToken && (_.definite = !0),
              _.key.type === n.AST_NODE_TYPES.Literal && e.questionToken && (_.optional = !0),
              _;
          }
          case r.GetAccessor:
          case r.SetAccessor:
            if (e.parent.kind === r.InterfaceDeclaration || e.parent.kind === r.TypeLiteral) {
              return this.convertMethodSignature(e);
            }
          case r.MethodDeclaration: {
            let i = this.createNode(e, {
              type: e.body ? n.AST_NODE_TYPES.FunctionExpression : n.AST_NODE_TYPES.TSEmptyBodyFunctionExpression,
              id: null,
              generator: !!e.asteriskToken,
              expression: !1,
              async: (0, c.hasModifier)(r.AsyncKeyword, e),
              body: this.convertChild(e.body),
              range: [e.parameters.pos - 1, e.end],
              params: [],
            });
            e.type && (i.returnType = this.convertTypeAnnotation(e.type, e)),
              e.typeParameters
              && (i.typeParameters = this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters),
                this.fixParentLocation(i, i.typeParameters.range));
            let m;
            if (a.kind === r.ObjectLiteralExpression) {
              i.params = e.parameters.map(g => this.convertChild(g)),
                m = this.createNode(e, {
                  type: n.AST_NODE_TYPES.Property,
                  key: this.convertChild(e.name),
                  value: i,
                  computed: (0, c.isComputedProperty)(e.name),
                  method: e.kind === r.MethodDeclaration,
                  shorthand: !1,
                  kind: "init",
                });
            } else {
              i.params = this.convertParameters(e.parameters);
              let g = (0, c.hasModifier)(r.AbstractKeyword, e)
                ? n.AST_NODE_TYPES.TSAbstractMethodDefinition
                : n.AST_NODE_TYPES.MethodDefinition;
              m = this.createNode(e, {
                type: g,
                key: this.convertChild(e.name),
                value: i,
                computed: (0, c.isComputedProperty)(e.name),
                static: (0, c.hasModifier)(r.StaticKeyword, e),
                kind: "method",
                override: (0, c.hasModifier)(r.OverrideKeyword, e),
              });
              let _ = (0, v.getDecorators)(e);
              _ && (m.decorators = _.map(N => this.convertChild(N)));
              let P = (0, c.getTSNodeAccessibility)(e);
              P && (m.accessibility = P);
            }
            return e.questionToken && (m.optional = !0),
              e.kind === r.GetAccessor
                ? m.kind = "get"
                : e.kind === r.SetAccessor
                ? m.kind = "set"
                : !m.static && e.name.kind === r.StringLiteral && e.name.text === "constructor"
                  && m.type !== n.AST_NODE_TYPES.Property && (m.kind = "constructor"),
              m;
          }
          case r.Constructor: {
            let i = (0, c.getLastModifier)(e),
              m = i && (0, c.findNextToken)(i, e, this.ast) || e.getFirstToken(),
              g = this.createNode(e, {
                type: e.body ? n.AST_NODE_TYPES.FunctionExpression : n.AST_NODE_TYPES.TSEmptyBodyFunctionExpression,
                id: null,
                params: this.convertParameters(e.parameters),
                generator: !1,
                expression: !1,
                async: !1,
                body: this.convertChild(e.body),
                range: [e.parameters.pos - 1, e.end],
              });
            e.typeParameters
            && (g.typeParameters = this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters),
              this.fixParentLocation(g, g.typeParameters.range)),
              e.type && (g.returnType = this.convertTypeAnnotation(e.type, e));
            let _ = this.createNode(e, {
                type: n.AST_NODE_TYPES.Identifier,
                name: "constructor",
                range: [m.getStart(this.ast), m.end],
              }),
              P = (0, c.hasModifier)(r.StaticKeyword, e),
              N = this.createNode(e, {
                type: (0, c.hasModifier)(r.AbstractKeyword, e)
                  ? n.AST_NODE_TYPES.TSAbstractMethodDefinition
                  : n.AST_NODE_TYPES.MethodDefinition,
                key: _,
                value: g,
                computed: !1,
                static: P,
                kind: P ? "method" : "constructor",
                override: !1,
              }),
              M = (0, c.getTSNodeAccessibility)(e);
            return M && (N.accessibility = M), N;
          }
          case r.FunctionExpression: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.FunctionExpression,
              id: this.convertChild(e.name),
              generator: !!e.asteriskToken,
              params: this.convertParameters(e.parameters),
              body: this.convertChild(e.body),
              async: (0, c.hasModifier)(r.AsyncKeyword, e),
              expression: !1,
            });
            return e.type && (i.returnType = this.convertTypeAnnotation(e.type, e)),
              e.typeParameters
              && (i.typeParameters = this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters)),
              i;
          }
          case r.SuperKeyword:
            return this.createNode(e, { type: n.AST_NODE_TYPES.Super });
          case r.ArrayBindingPattern:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ArrayPattern,
              elements: e.elements.map(i => this.convertPattern(i)),
            });
          case r.OmittedExpression:
            return null;
          case r.ObjectBindingPattern:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ObjectPattern,
              properties: e.elements.map(i => this.convertPattern(i)),
            });
          case r.BindingElement:
            if (a.kind === r.ArrayBindingPattern) {
              let i = this.convertChild(e.name, a);
              return e.initializer
                ? this.createNode(e, {
                  type: n.AST_NODE_TYPES.AssignmentPattern,
                  left: i,
                  right: this.convertChild(e.initializer),
                })
                : e.dotDotDotToken
                ? this.createNode(e, { type: n.AST_NODE_TYPES.RestElement, argument: i })
                : i;
            } else {
              let i;
              return e.dotDotDotToken
                ? i = this.createNode(e, {
                  type: n.AST_NODE_TYPES.RestElement,
                  argument: this.convertChild((l = e.propertyName) !== null && l !== void 0 ? l : e.name),
                })
                : i = this.createNode(e, {
                  type: n.AST_NODE_TYPES.Property,
                  key: this.convertChild((u = e.propertyName) !== null && u !== void 0 ? u : e.name),
                  value: this.convertChild(e.name),
                  computed: !!(e.propertyName && e.propertyName.kind === r.ComputedPropertyName),
                  method: !1,
                  shorthand: !e.propertyName,
                  kind: "init",
                }),
                e.initializer
                && (i.value = this.createNode(e, {
                  type: n.AST_NODE_TYPES.AssignmentPattern,
                  left: this.convertChild(e.name),
                  right: this.convertChild(e.initializer),
                  range: [e.name.getStart(this.ast), e.initializer.end],
                })),
                i;
            }
          case r.ArrowFunction: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.ArrowFunctionExpression,
              generator: !1,
              id: null,
              params: this.convertParameters(e.parameters),
              body: this.convertChild(e.body),
              async: (0, c.hasModifier)(r.AsyncKeyword, e),
              expression: e.body.kind !== r.Block,
            });
            return e.type && (i.returnType = this.convertTypeAnnotation(e.type, e)),
              e.typeParameters
              && (i.typeParameters = this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters)),
              i;
          }
          case r.YieldExpression:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.YieldExpression,
              delegate: !!e.asteriskToken,
              argument: this.convertChild(e.expression),
            });
          case r.AwaitExpression:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.AwaitExpression,
              argument: this.convertChild(e.expression),
            });
          case r.NoSubstitutionTemplateLiteral:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TemplateLiteral,
              quasis: [
                this.createNode(e, {
                  type: n.AST_NODE_TYPES.TemplateElement,
                  value: { raw: this.ast.text.slice(e.getStart(this.ast) + 1, e.end - 1), cooked: e.text },
                  tail: !0,
                }),
              ],
              expressions: [],
            });
          case r.TemplateExpression: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.TemplateLiteral,
              quasis: [this.convertChild(e.head)],
              expressions: [],
            });
            return e.templateSpans.forEach(m => {
              i.expressions.push(this.convertChild(m.expression)), i.quasis.push(this.convertChild(m.literal));
            }),
              i;
          }
          case r.TaggedTemplateExpression:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TaggedTemplateExpression,
              typeParameters: e.typeArguments
                ? this.convertTypeArgumentsToTypeParameters(e.typeArguments, e)
                : void 0,
              tag: this.convertChild(e.tag),
              quasi: this.convertChild(e.template),
            });
          case r.TemplateHead:
          case r.TemplateMiddle:
          case r.TemplateTail: {
            let i = e.kind === r.TemplateTail;
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TemplateElement,
              value: { raw: this.ast.text.slice(e.getStart(this.ast) + 1, e.end - (i ? 1 : 2)), cooked: e.text },
              tail: i,
            });
          }
          case r.SpreadAssignment:
          case r.SpreadElement:
            return this.allowPattern
              ? this.createNode(e, { type: n.AST_NODE_TYPES.RestElement, argument: this.convertPattern(e.expression) })
              : this.createNode(e, { type: n.AST_NODE_TYPES.SpreadElement, argument: this.convertChild(e.expression) });
          case r.Parameter: {
            let i, m;
            return e.dotDotDotToken
              ? i = m = this.createNode(e, { type: n.AST_NODE_TYPES.RestElement, argument: this.convertChild(e.name) })
              : e.initializer
              ? (i = this.convertChild(e.name),
                m = this.createNode(e, {
                  type: n.AST_NODE_TYPES.AssignmentPattern,
                  left: i,
                  right: this.convertChild(e.initializer),
                }),
                (0, v.getModifiers)(e)
                && (m.range[0] = i.range[0], m.loc = (0, c.getLocFor)(m.range[0], m.range[1], this.ast)))
              : i = m = this.convertChild(e.name, a),
              e.type
              && (i.typeAnnotation = this.convertTypeAnnotation(e.type, e),
                this.fixParentLocation(i, i.typeAnnotation.range)),
              e.questionToken
              && (e.questionToken.end > i.range[1]
                && (i.range[1] = e.questionToken.end, i.loc.end = (0, c.getLineAndCharacterFor)(i.range[1], this.ast)),
                i.optional = !0),
              (0, v.getModifiers)(e)
                ? this.createNode(e, {
                  type: n.AST_NODE_TYPES.TSParameterProperty,
                  accessibility: (T = (0, c.getTSNodeAccessibility)(e)) !== null && T !== void 0 ? T : void 0,
                  readonly: (0, c.hasModifier)(r.ReadonlyKeyword, e) || void 0,
                  static: (0, c.hasModifier)(r.StaticKeyword, e) || void 0,
                  export: (0, c.hasModifier)(r.ExportKeyword, e) || void 0,
                  override: (0, c.hasModifier)(r.OverrideKeyword, e) || void 0,
                  parameter: m,
                })
                : m;
          }
          case r.ClassDeclaration:
          case r.ClassExpression: {
            let i = (b = e.heritageClauses) !== null && b !== void 0 ? b : [],
              m = e.kind === r.ClassDeclaration
                ? n.AST_NODE_TYPES.ClassDeclaration
                : n.AST_NODE_TYPES.ClassExpression,
              g = i.find(K => K.token === r.ExtendsKeyword),
              _ = i.find(K => K.token === r.ImplementsKeyword),
              P = this.createNode(e, {
                type: m,
                id: this.convertChild(e.name),
                body: this.createNode(e, {
                  type: n.AST_NODE_TYPES.ClassBody,
                  body: [],
                  range: [e.members.pos - 1, e.end],
                }),
                superClass: g?.types[0] ? this.convertChild(g.types[0].expression) : null,
              });
            if (g) {
              if (g.types.length > 1) {
                throw (0, c.createError)(
                  this.ast,
                  g.types[1].pos,
                  "Classes can only extend a single class.",
                );
              }
              !((C = g.types[0]) === null || C === void 0) && C.typeArguments
                && (P.superTypeParameters = this.convertTypeArgumentsToTypeParameters(
                  g.types[0].typeArguments,
                  g.types[0],
                ));
            }
            e.typeParameters
            && (P.typeParameters = this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters)),
              _ && (P.implements = _.types.map(K => this.convertChild(K))),
              (0, c.hasModifier)(r.AbstractKeyword, e) && (P.abstract = !0),
              (0, c.hasModifier)(r.DeclareKeyword, e) && (P.declare = !0);
            let N = (0, v.getDecorators)(e);
            N && (P.decorators = N.map(K => this.convertChild(K)));
            let M = e.members.filter(c.isESTreeClassMember);
            return M.length && (P.body.body = M.map(K => this.convertChild(K))), this.fixExports(e, P);
          }
          case r.ModuleBlock:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSModuleBlock,
              body: this.convertBodyExpressions(e.statements, e),
            });
          case r.ImportDeclaration: {
            this.assertModuleSpecifier(e, !1);
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.ImportDeclaration,
              source: this.convertChild(e.moduleSpecifier),
              specifiers: [],
              importKind: "value",
              assertions: this.convertAssertClasue(e.assertClause),
            });
            if (
              e.importClause
              && (e.importClause.isTypeOnly && (i.importKind = "type"),
                e.importClause.name && i.specifiers.push(this.convertChild(e.importClause)),
                e.importClause.namedBindings)
            ) {
              switch (e.importClause.namedBindings.kind) {
                case r.NamespaceImport:
                  i.specifiers.push(this.convertChild(e.importClause.namedBindings));
                  break;
                case r.NamedImports:
                  i.specifiers = i.specifiers.concat(
                    e.importClause.namedBindings.elements.map(m => this.convertChild(m)),
                  );
                  break;
              }
            }
            return i;
          }
          case r.NamespaceImport:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ImportNamespaceSpecifier,
              local: this.convertChild(e.name),
            });
          case r.ImportSpecifier:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ImportSpecifier,
              local: this.convertChild(e.name),
              imported: this.convertChild((k = e.propertyName) !== null && k !== void 0 ? k : e.name),
              importKind: e.isTypeOnly ? "type" : "value",
            });
          case r.ImportClause: {
            let i = this.convertChild(e.name);
            return this.createNode(e, { type: n.AST_NODE_TYPES.ImportDefaultSpecifier, local: i, range: i.range });
          }
          case r.ExportDeclaration:
            return ((A = e.exportClause) === null || A === void 0 ? void 0 : A.kind) === r.NamedExports
              ? (this.assertModuleSpecifier(e, !0),
                this.createNode(e, {
                  type: n.AST_NODE_TYPES.ExportNamedDeclaration,
                  source: this.convertChild(e.moduleSpecifier),
                  specifiers: e.exportClause.elements.map(i => this.convertChild(i)),
                  exportKind: e.isTypeOnly ? "type" : "value",
                  declaration: null,
                  assertions: this.convertAssertClasue(e.assertClause),
                }))
              : (this.assertModuleSpecifier(e, !1),
                this.createNode(e, {
                  type: n.AST_NODE_TYPES.ExportAllDeclaration,
                  source: this.convertChild(e.moduleSpecifier),
                  exportKind: e.isTypeOnly ? "type" : "value",
                  exported: e.exportClause && e.exportClause.kind === r.NamespaceExport
                    ? this.convertChild(e.exportClause.name)
                    : null,
                  assertions: this.convertAssertClasue(e.assertClause),
                }));
          case r.ExportSpecifier:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ExportSpecifier,
              local: this.convertChild((w = e.propertyName) !== null && w !== void 0 ? w : e.name),
              exported: this.convertChild(e.name),
              exportKind: e.isTypeOnly ? "type" : "value",
            });
          case r.ExportAssignment:
            return e.isExportEquals
              ? this.createNode(e, {
                type: n.AST_NODE_TYPES.TSExportAssignment,
                expression: this.convertChild(e.expression),
              })
              : this.createNode(e, {
                type: n.AST_NODE_TYPES.ExportDefaultDeclaration,
                declaration: this.convertChild(e.expression),
                exportKind: "value",
              });
          case r.PrefixUnaryExpression:
          case r.PostfixUnaryExpression: {
            let i = (0, c.getTextForTokenKind)(e.operator);
            return i === "++" || i === "--"
              ? this.createNode(e, {
                type: n.AST_NODE_TYPES.UpdateExpression,
                operator: i,
                prefix: e.kind === r.PrefixUnaryExpression,
                argument: this.convertChild(e.operand),
              })
              : this.createNode(e, {
                type: n.AST_NODE_TYPES.UnaryExpression,
                operator: i,
                prefix: e.kind === r.PrefixUnaryExpression,
                argument: this.convertChild(e.operand),
              });
          }
          case r.DeleteExpression:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.UnaryExpression,
              operator: "delete",
              prefix: !0,
              argument: this.convertChild(e.expression),
            });
          case r.VoidExpression:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.UnaryExpression,
              operator: "void",
              prefix: !0,
              argument: this.convertChild(e.expression),
            });
          case r.TypeOfExpression:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.UnaryExpression,
              operator: "typeof",
              prefix: !0,
              argument: this.convertChild(e.expression),
            });
          case r.TypeOperator:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSTypeOperator,
              operator: (0, c.getTextForTokenKind)(e.operator),
              typeAnnotation: this.convertChild(e.type),
            });
          case r.BinaryExpression:
            if ((0, c.isComma)(e.operatorToken)) {
              let i = this.createNode(e, { type: n.AST_NODE_TYPES.SequenceExpression, expressions: [] }),
                m = this.convertChild(e.left);
              return m.type === n.AST_NODE_TYPES.SequenceExpression && e.left.kind !== r.ParenthesizedExpression
                ? i.expressions = i.expressions.concat(m.expressions)
                : i.expressions.push(m),
                i.expressions.push(this.convertChild(e.right)),
                i;
            } else {
              let i = (0, c.getBinaryExpressionType)(e.operatorToken);
              return this.allowPattern && i === n.AST_NODE_TYPES.AssignmentExpression
                ? this.createNode(e, {
                  type: n.AST_NODE_TYPES.AssignmentPattern,
                  left: this.convertPattern(e.left, e),
                  right: this.convertChild(e.right),
                })
                : this.createNode(e, {
                  type: i,
                  operator: (0, c.getTextForTokenKind)(e.operatorToken.kind),
                  left: this.converter(e.left, e, this.inTypeMode, i === n.AST_NODE_TYPES.AssignmentExpression),
                  right: this.convertChild(e.right),
                });
            }
          case r.PropertyAccessExpression: {
            let i = this.convertChild(e.expression),
              m = this.convertChild(e.name),
              g = !1,
              _ = this.createNode(e, {
                type: n.AST_NODE_TYPES.MemberExpression,
                object: i,
                property: m,
                computed: g,
                optional: e.questionDotToken !== void 0,
              });
            return this.convertChainExpression(_, e);
          }
          case r.ElementAccessExpression: {
            let i = this.convertChild(e.expression),
              m = this.convertChild(e.argumentExpression),
              g = !0,
              _ = this.createNode(e, {
                type: n.AST_NODE_TYPES.MemberExpression,
                object: i,
                property: m,
                computed: g,
                optional: e.questionDotToken !== void 0,
              });
            return this.convertChainExpression(_, e);
          }
          case r.CallExpression: {
            if (e.expression.kind === r.ImportKeyword) {
              if (e.arguments.length !== 1 && e.arguments.length !== 2) {
                throw (0, c.createError)(
                  this.ast,
                  e.arguments.pos,
                  "Dynamic import requires exactly one or two arguments.",
                );
              }
              return this.createNode(e, {
                type: n.AST_NODE_TYPES.ImportExpression,
                source: this.convertChild(e.arguments[0]),
                attributes: e.arguments[1] ? this.convertChild(e.arguments[1]) : null,
              });
            }
            let i = this.convertChild(e.expression),
              m = e.arguments.map(_ => this.convertChild(_)),
              g = this.createNode(e, {
                type: n.AST_NODE_TYPES.CallExpression,
                callee: i,
                arguments: m,
                optional: e.questionDotToken !== void 0,
              });
            return e.typeArguments
              && (g.typeParameters = this.convertTypeArgumentsToTypeParameters(e.typeArguments, e)),
              this.convertChainExpression(g, e);
          }
          case r.NewExpression: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.NewExpression,
              callee: this.convertChild(e.expression),
              arguments: e.arguments
                ? e.arguments.map(m => this.convertChild(m))
                : [],
            });
            return e.typeArguments
              && (i.typeParameters = this.convertTypeArgumentsToTypeParameters(e.typeArguments, e)),
              i;
          }
          case r.ConditionalExpression:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ConditionalExpression,
              test: this.convertChild(e.condition),
              consequent: this.convertChild(e.whenTrue),
              alternate: this.convertChild(e.whenFalse),
            });
          case r.MetaProperty:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.MetaProperty,
              meta: this.createNode(e.getFirstToken(), {
                type: n.AST_NODE_TYPES.Identifier,
                name: (0, c.getTextForTokenKind)(e.keywordToken),
              }),
              property: this.convertChild(e.name),
            });
          case r.Decorator:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.Decorator,
              expression: this.convertChild(e.expression),
            });
          case r.StringLiteral:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.Literal,
              value: a.kind === r.JsxAttribute ? (0, c.unescapeStringLiteralText)(e.text) : e.text,
              raw: e.getText(),
            });
          case r.NumericLiteral:
            return this.createNode(e, { type: n.AST_NODE_TYPES.Literal, value: Number(e.text), raw: e.getText() });
          case r.BigIntLiteral: {
            let i = (0, c.getRange)(e, this.ast),
              m = this.ast.text.slice(i[0], i[1]),
              g = m.slice(0, -1).replace(/_/g, ""),
              _ = typeof BigInt < "u" ? BigInt(g) : null;
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.Literal,
              raw: m,
              value: _,
              bigint: _ == null ? g : String(_),
              range: i,
            });
          }
          case r.RegularExpressionLiteral: {
            let i = e.text.slice(1, e.text.lastIndexOf("/")), m = e.text.slice(e.text.lastIndexOf("/") + 1), g = null;
            try {
              g = new RegExp(i, m);
            } catch {
              g = null;
            }
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.Literal,
              value: g,
              raw: e.text,
              regex: { pattern: i, flags: m },
            });
          }
          case r.TrueKeyword:
            return this.createNode(e, { type: n.AST_NODE_TYPES.Literal, value: !0, raw: "true" });
          case r.FalseKeyword:
            return this.createNode(e, { type: n.AST_NODE_TYPES.Literal, value: !1, raw: "false" });
          case r.NullKeyword:
            return !y.typescriptVersionIsAtLeast["4.0"] && this.inTypeMode
              ? this.createNode(e, { type: n.AST_NODE_TYPES.TSNullKeyword })
              : this.createNode(e, { type: n.AST_NODE_TYPES.Literal, value: null, raw: "null" });
          case r.EmptyStatement:
            return this.createNode(e, { type: n.AST_NODE_TYPES.EmptyStatement });
          case r.DebuggerStatement:
            return this.createNode(e, { type: n.AST_NODE_TYPES.DebuggerStatement });
          case r.JsxElement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.JSXElement,
              openingElement: this.convertChild(e.openingElement),
              closingElement: this.convertChild(e.closingElement),
              children: e.children.map(i => this.convertChild(i)),
            });
          case r.JsxFragment:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.JSXFragment,
              openingFragment: this.convertChild(e.openingFragment),
              closingFragment: this.convertChild(e.closingFragment),
              children: e.children.map(i => this.convertChild(i)),
            });
          case r.JsxSelfClosingElement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.JSXElement,
              openingElement: this.createNode(e, {
                type: n.AST_NODE_TYPES.JSXOpeningElement,
                typeParameters: e.typeArguments
                  ? this.convertTypeArgumentsToTypeParameters(e.typeArguments, e)
                  : void 0,
                selfClosing: !0,
                name: this.convertJSXTagName(e.tagName, e),
                attributes: e.attributes.properties.map(i => this.convertChild(i)),
                range: (0, c.getRange)(e, this.ast),
              }),
              closingElement: null,
              children: [],
            });
          case r.JsxOpeningElement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.JSXOpeningElement,
              typeParameters: e.typeArguments
                ? this.convertTypeArgumentsToTypeParameters(e.typeArguments, e)
                : void 0,
              selfClosing: !1,
              name: this.convertJSXTagName(e.tagName, e),
              attributes: e.attributes.properties.map(i => this.convertChild(i)),
            });
          case r.JsxClosingElement:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.JSXClosingElement,
              name: this.convertJSXTagName(e.tagName, e),
            });
          case r.JsxOpeningFragment:
            return this.createNode(e, { type: n.AST_NODE_TYPES.JSXOpeningFragment });
          case r.JsxClosingFragment:
            return this.createNode(e, { type: n.AST_NODE_TYPES.JSXClosingFragment });
          case r.JsxExpression: {
            let i = e.expression
              ? this.convertChild(e.expression)
              : this.createNode(e, {
                type: n.AST_NODE_TYPES.JSXEmptyExpression,
                range: [e.getStart(this.ast) + 1, e.getEnd() - 1],
              });
            return e.dotDotDotToken
              ? this.createNode(e, { type: n.AST_NODE_TYPES.JSXSpreadChild, expression: i })
              : this.createNode(e, { type: n.AST_NODE_TYPES.JSXExpressionContainer, expression: i });
          }
          case r.JsxAttribute:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.JSXAttribute,
              name: this.convertJSXNamespaceOrIdentifier(e.name),
              value: this.convertChild(e.initializer),
            });
          case r.JsxText: {
            let i = e.getFullStart(), m = e.getEnd(), g = this.ast.text.slice(i, m);
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.JSXText,
              value: (0, c.unescapeStringLiteralText)(g),
              raw: g,
              range: [i, m],
            });
          }
          case r.JsxSpreadAttribute:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.JSXSpreadAttribute,
              argument: this.convertChild(e.expression),
            });
          case r.QualifiedName:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSQualifiedName,
              left: this.convertChild(e.left),
              right: this.convertChild(e.right),
            });
          case r.TypeReference:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSTypeReference,
              typeName: this.convertType(e.typeName),
              typeParameters: e.typeArguments
                ? this.convertTypeArgumentsToTypeParameters(e.typeArguments, e)
                : void 0,
            });
          case r.TypeParameter:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSTypeParameter,
              name: this.convertType(e.name),
              constraint: e.constraint ? this.convertType(e.constraint) : void 0,
              default: e.default ? this.convertType(e.default) : void 0,
              in: (0, c.hasModifier)(r.InKeyword, e),
              out: (0, c.hasModifier)(r.OutKeyword, e),
              const: (0, c.hasModifier)(r.ConstKeyword, e),
            });
          case r.ThisType:
            return this.createNode(e, { type: n.AST_NODE_TYPES.TSThisType });
          case r.AnyKeyword:
          case r.BigIntKeyword:
          case r.BooleanKeyword:
          case r.NeverKeyword:
          case r.NumberKeyword:
          case r.ObjectKeyword:
          case r.StringKeyword:
          case r.SymbolKeyword:
          case r.UnknownKeyword:
          case r.VoidKeyword:
          case r.UndefinedKeyword:
          case r.IntrinsicKeyword:
            return this.createNode(e, { type: n.AST_NODE_TYPES[`TS${r[e.kind]}`] });
          case r.NonNullExpression: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.TSNonNullExpression,
              expression: this.convertChild(e.expression),
            });
            return this.convertChainExpression(i, e);
          }
          case r.TypeLiteral:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSTypeLiteral,
              members: e.members.map(i => this.convertChild(i)),
            });
          case r.ArrayType:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSArrayType,
              elementType: this.convertType(e.elementType),
            });
          case r.IndexedAccessType:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSIndexedAccessType,
              objectType: this.convertType(e.objectType),
              indexType: this.convertType(e.indexType),
            });
          case r.ConditionalType:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSConditionalType,
              checkType: this.convertType(e.checkType),
              extendsType: this.convertType(e.extendsType),
              trueType: this.convertType(e.trueType),
              falseType: this.convertType(e.falseType),
            });
          case r.TypeQuery:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSTypeQuery,
              exprName: this.convertType(e.exprName),
              typeParameters: e.typeArguments && this.convertTypeArgumentsToTypeParameters(e.typeArguments, e),
            });
          case r.MappedType: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.TSMappedType,
              typeParameter: this.convertType(e.typeParameter),
              nameType: (d = this.convertType(e.nameType)) !== null && d !== void 0 ? d : null,
            });
            return e.readonlyToken && (e.readonlyToken.kind === r.ReadonlyKeyword
              ? i.readonly = !0
              : i.readonly = (0, c.getTextForTokenKind)(e.readonlyToken.kind)),
              e.questionToken && (e.questionToken.kind === r.QuestionToken
                ? i.optional = !0
                : i.optional = (0, c.getTextForTokenKind)(e.questionToken.kind)),
              e.type && (i.typeAnnotation = this.convertType(e.type)),
              i;
          }
          case r.ParenthesizedExpression:
            return this.convertChild(e.expression, a);
          case r.TypeAliasDeclaration: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.TSTypeAliasDeclaration,
              id: this.convertChild(e.name),
              typeAnnotation: this.convertType(e.type),
            });
            return (0, c.hasModifier)(r.DeclareKeyword, e) && (i.declare = !0),
              e.typeParameters
              && (i.typeParameters = this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters)),
              this.fixExports(e, i);
          }
          case r.MethodSignature:
            return this.convertMethodSignature(e);
          case r.PropertySignature: {
            let i = this.createNode(e, {
                type: n.AST_NODE_TYPES.TSPropertySignature,
                optional: (0, c.isOptional)(e) || void 0,
                computed: (0, c.isComputedProperty)(e.name),
                key: this.convertChild(e.name),
                typeAnnotation: e.type ? this.convertTypeAnnotation(e.type, e) : void 0,
                initializer: this.convertChild(e.initializer) || void 0,
                readonly: (0, c.hasModifier)(r.ReadonlyKeyword, e) || void 0,
                static: (0, c.hasModifier)(r.StaticKeyword, e) || void 0,
                export: (0, c.hasModifier)(r.ExportKeyword, e) || void 0,
              }),
              m = (0, c.getTSNodeAccessibility)(e);
            return m && (i.accessibility = m), i;
          }
          case r.IndexSignature: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.TSIndexSignature,
              parameters: e.parameters.map(g => this.convertChild(g)),
            });
            e.type && (i.typeAnnotation = this.convertTypeAnnotation(e.type, e)),
              (0, c.hasModifier)(r.ReadonlyKeyword, e) && (i.readonly = !0);
            let m = (0, c.getTSNodeAccessibility)(e);
            return m && (i.accessibility = m),
              (0, c.hasModifier)(r.ExportKeyword, e) && (i.export = !0),
              (0, c.hasModifier)(r.StaticKeyword, e) && (i.static = !0),
              i;
          }
          case r.ConstructorType: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.TSConstructorType,
              params: this.convertParameters(e.parameters),
              abstract: (0, c.hasModifier)(r.AbstractKeyword, e),
            });
            return e.type && (i.returnType = this.convertTypeAnnotation(e.type, e)),
              e.typeParameters
              && (i.typeParameters = this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters)),
              i;
          }
          case r.FunctionType:
          case r.ConstructSignature:
          case r.CallSignature: {
            let i = e.kind === r.ConstructSignature
                ? n.AST_NODE_TYPES.TSConstructSignatureDeclaration
                : e.kind === r.CallSignature
                ? n.AST_NODE_TYPES.TSCallSignatureDeclaration
                : n.AST_NODE_TYPES.TSFunctionType,
              m = this.createNode(e, { type: i, params: this.convertParameters(e.parameters) });
            return e.type && (m.returnType = this.convertTypeAnnotation(e.type, e)),
              e.typeParameters
              && (m.typeParameters = this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters)),
              m;
          }
          case r.ExpressionWithTypeArguments: {
            let i = a.kind,
              m = i === r.InterfaceDeclaration
                ? n.AST_NODE_TYPES.TSInterfaceHeritage
                : i === r.HeritageClause
                ? n.AST_NODE_TYPES.TSClassImplements
                : n.AST_NODE_TYPES.TSInstantiationExpression,
              g = this.createNode(e, { type: m, expression: this.convertChild(e.expression) });
            return e.typeArguments
              && (g.typeParameters = this.convertTypeArgumentsToTypeParameters(e.typeArguments, e)),
              g;
          }
          case r.InterfaceDeclaration: {
            let i = (E = e.heritageClauses) !== null && E !== void 0 ? E : [],
              m = this.createNode(e, {
                type: n.AST_NODE_TYPES.TSInterfaceDeclaration,
                body: this.createNode(e, {
                  type: n.AST_NODE_TYPES.TSInterfaceBody,
                  body: e.members.map(g => this.convertChild(g)),
                  range: [e.members.pos - 1, e.end],
                }),
                id: this.convertChild(e.name),
              });
            if (
              e.typeParameters
              && (m.typeParameters = this.convertTSTypeParametersToTypeParametersDeclaration(e.typeParameters)),
                i.length > 0
            ) {
              let g = [], _ = [];
              for (let P of i) {
                if (P.token === r.ExtendsKeyword) for (let N of P.types) g.push(this.convertChild(N, e));
                else for (let N of P.types) _.push(this.convertChild(N, e));
              }
              g.length && (m.extends = g), _.length && (m.implements = _);
            }
            return (0, c.hasModifier)(r.AbstractKeyword, e) && (m.abstract = !0),
              (0, c.hasModifier)(r.DeclareKeyword, e) && (m.declare = !0),
              this.fixExports(e, m);
          }
          case r.TypePredicate: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.TSTypePredicate,
              asserts: e.assertsModifier !== void 0,
              parameterName: this.convertChild(e.parameterName),
              typeAnnotation: null,
            });
            return e.type
              && (i.typeAnnotation = this.convertTypeAnnotation(e.type, e),
                i.typeAnnotation.loc = i.typeAnnotation.typeAnnotation.loc,
                i.typeAnnotation.range = i.typeAnnotation.typeAnnotation.range),
              i;
          }
          case r.ImportType:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSImportType,
              isTypeOf: !!e.isTypeOf,
              parameter: this.convertChild(e.argument),
              qualifier: this.convertChild(e.qualifier),
              typeParameters: e.typeArguments ? this.convertTypeArgumentsToTypeParameters(e.typeArguments, e) : null,
            });
          case r.EnumDeclaration: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.TSEnumDeclaration,
              id: this.convertChild(e.name),
              members: e.members.map(m => this.convertChild(m)),
            });
            return this.applyModifiersToResult(i, (0, v.getModifiers)(e)), this.fixExports(e, i);
          }
          case r.EnumMember: {
            let i = this.createNode(e, { type: n.AST_NODE_TYPES.TSEnumMember, id: this.convertChild(e.name) });
            return e.initializer && (i.initializer = this.convertChild(e.initializer)),
              e.name.kind === f.SyntaxKind.ComputedPropertyName && (i.computed = !0),
              i;
          }
          case r.ModuleDeclaration: {
            let i = this.createNode(
              e,
              Object.assign(
                { type: n.AST_NODE_TYPES.TSModuleDeclaration },
                (() => {
                  let m = this.convertChild(e.name), g = this.convertChild(e.body);
                  if (e.flags & f.NodeFlags.GlobalAugmentation) {
                    if (g == null || g.type === n.AST_NODE_TYPES.TSModuleDeclaration) {
                      throw new Error(
                        "Expected a valid module body",
                      );
                    }
                    if (m.type !== n.AST_NODE_TYPES.Identifier) {
                      throw new Error(
                        "global module augmentation must have an Identifier id",
                      );
                    }
                    return { kind: "global", id: m, body: g, global: !0 };
                  } else if (e.flags & f.NodeFlags.Namespace) {
                    if (g == null) throw new Error("Expected a module body");
                    if (m.type !== n.AST_NODE_TYPES.Identifier) {
                      throw new Error(
                        "`namespace`s must have an Identifier id",
                      );
                    }
                    return { kind: "namespace", id: m, body: g };
                  } else return Object.assign({ kind: "module", id: m }, g != null ? { body: g } : {});
                })(),
              ),
            );
            return this.applyModifiersToResult(i, (0, v.getModifiers)(e)), this.fixExports(e, i);
          }
          case r.ParenthesizedType:
            return this.convertType(e.type);
          case r.UnionType:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSUnionType,
              types: e.types.map(i => this.convertType(i)),
            });
          case r.IntersectionType:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSIntersectionType,
              types: e.types.map(i => this.convertType(i)),
            });
          case r.AsExpression:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSAsExpression,
              expression: this.convertChild(e.expression),
              typeAnnotation: this.convertType(e.type),
            });
          case r.InferType:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSInferType,
              typeParameter: this.convertType(e.typeParameter),
            });
          case r.LiteralType:
            return y.typescriptVersionIsAtLeast["4.0"] && e.literal.kind === r.NullKeyword
              ? this.createNode(e.literal, { type: n.AST_NODE_TYPES.TSNullKeyword })
              : this.createNode(e, { type: n.AST_NODE_TYPES.TSLiteralType, literal: this.convertType(e.literal) });
          case r.TypeAssertionExpression:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSTypeAssertion,
              typeAnnotation: this.convertType(e.type),
              expression: this.convertChild(e.expression),
            });
          case r.ImportEqualsDeclaration:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSImportEqualsDeclaration,
              id: this.convertChild(e.name),
              moduleReference: this.convertChild(e.moduleReference),
              importKind: e.isTypeOnly ? "type" : "value",
              isExport: (0, c.hasModifier)(r.ExportKeyword, e),
            });
          case r.ExternalModuleReference:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSExternalModuleReference,
              expression: this.convertChild(e.expression),
            });
          case r.NamespaceExportDeclaration:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSNamespaceExportDeclaration,
              id: this.convertChild(e.name),
            });
          case r.AbstractKeyword:
            return this.createNode(e, { type: n.AST_NODE_TYPES.TSAbstractKeyword });
          case r.TupleType: {
            let i = "elementTypes" in e
              ? e.elementTypes.map(m => this.convertType(m))
              : e.elements.map(m => this.convertType(m));
            return this.createNode(e, { type: n.AST_NODE_TYPES.TSTupleType, elementTypes: i });
          }
          case r.NamedTupleMember: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.TSNamedTupleMember,
              elementType: this.convertType(e.type, e),
              label: this.convertChild(e.name, e),
              optional: e.questionToken != null,
            });
            return e.dotDotDotToken
              ? (i.range[0] = i.label.range[0],
                i.loc.start = i.label.loc.start,
                this.createNode(e, { type: n.AST_NODE_TYPES.TSRestType, typeAnnotation: i }))
              : i;
          }
          case r.OptionalType:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSOptionalType,
              typeAnnotation: this.convertType(e.type),
            });
          case r.RestType:
            return this.createNode(e, { type: n.AST_NODE_TYPES.TSRestType, typeAnnotation: this.convertType(e.type) });
          case r.TemplateLiteralType: {
            let i = this.createNode(e, {
              type: n.AST_NODE_TYPES.TSTemplateLiteralType,
              quasis: [this.convertChild(e.head)],
              types: [],
            });
            return e.templateSpans.forEach(m => {
              i.types.push(this.convertChild(m.type)), i.quasis.push(this.convertChild(m.literal));
            }),
              i;
          }
          case r.ClassStaticBlockDeclaration:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.StaticBlock,
              body: this.convertBodyExpressions(e.body.statements, e),
            });
          case r.AssertEntry:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.ImportAttribute,
              key: this.convertChild(e.name),
              value: this.convertChild(e.value),
            });
          case r.SatisfiesExpression:
            return this.createNode(e, {
              type: n.AST_NODE_TYPES.TSSatisfiesExpression,
              expression: this.convertChild(e.expression),
              typeAnnotation: this.convertChild(e.type),
            });
          default:
            return this.deeplyCopy(e);
        }
      }
    };
    t.Converter = p;
  }),
  zr = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(r, s, p, e) {
          e === void 0 && (e = p);
          var a = Object.getOwnPropertyDescriptor(s, p);
          (!a || ("get" in a ? !s.__esModule : a.writable || a.configurable))
          && (a = {
            enumerable: !0,
            get: function() {
              return s[p];
            },
          }), Object.defineProperty(r, e, a);
        }
        : function(r, s, p, e) {
          e === void 0 && (e = p), r[e] = s[p];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(r, s) {
          Object.defineProperty(r, "default", { enumerable: !0, value: s });
        }
        : function(r, s) {
          r.default = s;
        }),
      o = t && t.__importStar || function(r) {
        if (r && r.__esModule) return r;
        var s = {};
        if (r != null) {
          for (var p in r) p !== "default" && Object.prototype.hasOwnProperty.call(r, p) && S(s, r, p);
        }
        return x(s, r), s;
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.convertComments = void 0;
    var f = Dr, v = o($), c = ae(), n = oe();
    function y(r, s) {
      let p = [];
      return (0, f.forEachComment)(r, (e, a) => {
        let l = a.kind === v.SyntaxKind.SingleLineCommentTrivia ? n.AST_TOKEN_TYPES.Line : n.AST_TOKEN_TYPES.Block,
          u = [a.pos, a.end],
          T = (0, c.getLocFor)(u[0], u[1], r),
          b = u[0] + 2,
          C = a.kind === v.SyntaxKind.SingleLineCommentTrivia ? u[1] - b : u[1] - b - 2;
        p.push({ type: l, value: s.slice(b, b + C), range: u, loc: T });
      }, r),
        p;
    }
    t.convertComments = y;
  }),
  Fe = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var S = {
        ArrayExpression: ["elements"],
        ArrayPattern: ["elements"],
        ArrowFunctionExpression: ["params", "body"],
        AssignmentExpression: ["left", "right"],
        AssignmentPattern: ["left", "right"],
        AwaitExpression: ["argument"],
        BinaryExpression: ["left", "right"],
        BlockStatement: ["body"],
        BreakStatement: ["label"],
        CallExpression: ["callee", "arguments"],
        CatchClause: ["param", "body"],
        ChainExpression: ["expression"],
        ClassBody: ["body"],
        ClassDeclaration: ["id", "superClass", "body"],
        ClassExpression: ["id", "superClass", "body"],
        ConditionalExpression: ["test", "consequent", "alternate"],
        ContinueStatement: ["label"],
        DebuggerStatement: [],
        DoWhileStatement: ["body", "test"],
        EmptyStatement: [],
        ExperimentalRestProperty: ["argument"],
        ExperimentalSpreadProperty: ["argument"],
        ExportAllDeclaration: ["exported", "source"],
        ExportDefaultDeclaration: ["declaration"],
        ExportNamedDeclaration: ["declaration", "specifiers", "source"],
        ExportSpecifier: ["exported", "local"],
        ExpressionStatement: ["expression"],
        ForInStatement: ["left", "right", "body"],
        ForOfStatement: ["left", "right", "body"],
        ForStatement: ["init", "test", "update", "body"],
        FunctionDeclaration: ["id", "params", "body"],
        FunctionExpression: ["id", "params", "body"],
        Identifier: [],
        IfStatement: ["test", "consequent", "alternate"],
        ImportDeclaration: ["specifiers", "source"],
        ImportDefaultSpecifier: ["local"],
        ImportExpression: ["source"],
        ImportNamespaceSpecifier: ["local"],
        ImportSpecifier: ["imported", "local"],
        JSXAttribute: ["name", "value"],
        JSXClosingElement: ["name"],
        JSXClosingFragment: [],
        JSXElement: ["openingElement", "children", "closingElement"],
        JSXEmptyExpression: [],
        JSXExpressionContainer: ["expression"],
        JSXFragment: ["openingFragment", "children", "closingFragment"],
        JSXIdentifier: [],
        JSXMemberExpression: ["object", "property"],
        JSXNamespacedName: ["namespace", "name"],
        JSXOpeningElement: ["name", "attributes"],
        JSXOpeningFragment: [],
        JSXSpreadAttribute: ["argument"],
        JSXSpreadChild: ["expression"],
        JSXText: [],
        LabeledStatement: ["label", "body"],
        Literal: [],
        LogicalExpression: ["left", "right"],
        MemberExpression: ["object", "property"],
        MetaProperty: ["meta", "property"],
        MethodDefinition: ["key", "value"],
        NewExpression: ["callee", "arguments"],
        ObjectExpression: ["properties"],
        ObjectPattern: ["properties"],
        PrivateIdentifier: [],
        Program: ["body"],
        Property: ["key", "value"],
        PropertyDefinition: ["key", "value"],
        RestElement: ["argument"],
        ReturnStatement: ["argument"],
        SequenceExpression: ["expressions"],
        SpreadElement: ["argument"],
        StaticBlock: ["body"],
        Super: [],
        SwitchCase: ["test", "consequent"],
        SwitchStatement: ["discriminant", "cases"],
        TaggedTemplateExpression: ["tag", "quasi"],
        TemplateElement: [],
        TemplateLiteral: ["quasis", "expressions"],
        ThisExpression: [],
        ThrowStatement: ["argument"],
        TryStatement: ["block", "handler", "finalizer"],
        UnaryExpression: ["argument"],
        UpdateExpression: ["argument"],
        VariableDeclaration: ["declarations"],
        VariableDeclarator: ["id", "init"],
        WhileStatement: ["test", "body"],
        WithStatement: ["object", "body"],
        YieldExpression: ["argument"],
      },
      x = Object.keys(S);
    for (let n of x) Object.freeze(S[n]);
    Object.freeze(S);
    var o = new Set(["parent", "leadingComments", "trailingComments"]);
    function f(n) {
      return !o.has(n) && n[0] !== "_";
    }
    function v(n) {
      return Object.keys(n).filter(f);
    }
    function c(n) {
      let y = Object.assign({}, S);
      for (let r of Object.keys(n)) {
        if (Object.prototype.hasOwnProperty.call(y, r)) {
          let s = new Set(n[r]);
          for (let p of y[r]) s.add(p);
          y[r] = Object.freeze(Array.from(s));
        } else y[r] = Object.freeze(Array.from(n[r]));
      }
      return Object.freeze(y);
    }
    t.KEYS = S, t.getKeys = v, t.unionWith = c;
  }),
  Hr = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.getKeys = void 0;
    var S = Fe(), x = S.getKeys;
    t.getKeys = x;
  }),
  Vr = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(y, r, s, p) {
          p === void 0 && (p = s);
          var e = Object.getOwnPropertyDescriptor(r, s);
          (!e || ("get" in e ? !r.__esModule : e.writable || e.configurable))
          && (e = {
            enumerable: !0,
            get: function() {
              return r[s];
            },
          }), Object.defineProperty(y, p, e);
        }
        : function(y, r, s, p) {
          p === void 0 && (p = s), y[p] = r[s];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(y, r) {
          Object.defineProperty(y, "default", { enumerable: !0, value: r });
        }
        : function(y, r) {
          y.default = r;
        }),
      o = t && t.__importStar || function(y) {
        if (y && y.__esModule) return y;
        var r = {};
        if (y != null) for (var s in y) s !== "default" && Object.prototype.hasOwnProperty.call(y, s) && S(r, y, s);
        return x(r, y), r;
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.visitorKeys = void 0;
    var f = o(Fe()),
      v = (() => {
        let y = ["typeParameters", "params", "returnType"],
          r = [...y, "body"],
          s = ["decorators", "key", "typeAnnotation"];
        return {
          AnonymousFunction: r,
          Function: ["id", ...r],
          FunctionType: y,
          ClassDeclaration: [
            "decorators",
            "id",
            "typeParameters",
            "superClass",
            "superTypeParameters",
            "implements",
            "body",
          ],
          AbstractPropertyDefinition: ["decorators", "key", "typeAnnotation"],
          PropertyDefinition: [...s, "value"],
          TypeAssertion: ["expression", "typeAnnotation"],
        };
      })(),
      c = {
        AccessorProperty: v.PropertyDefinition,
        ArrayPattern: ["decorators", "elements", "typeAnnotation"],
        ArrowFunctionExpression: v.AnonymousFunction,
        AssignmentPattern: ["decorators", "left", "right", "typeAnnotation"],
        CallExpression: ["callee", "typeParameters", "arguments"],
        ClassDeclaration: v.ClassDeclaration,
        ClassExpression: v.ClassDeclaration,
        Decorator: ["expression"],
        ExportAllDeclaration: ["exported", "source", "assertions"],
        ExportNamedDeclaration: ["declaration", "specifiers", "source", "assertions"],
        FunctionDeclaration: v.Function,
        FunctionExpression: v.Function,
        Identifier: ["decorators", "typeAnnotation"],
        ImportAttribute: ["key", "value"],
        ImportDeclaration: ["specifiers", "source", "assertions"],
        ImportExpression: ["source", "attributes"],
        JSXClosingFragment: [],
        JSXOpeningElement: ["name", "typeParameters", "attributes"],
        JSXOpeningFragment: [],
        JSXSpreadChild: ["expression"],
        MethodDefinition: ["decorators", "key", "value", "typeParameters"],
        NewExpression: ["callee", "typeParameters", "arguments"],
        ObjectPattern: ["decorators", "properties", "typeAnnotation"],
        PropertyDefinition: v.PropertyDefinition,
        RestElement: ["decorators", "argument", "typeAnnotation"],
        StaticBlock: ["body"],
        TaggedTemplateExpression: ["tag", "typeParameters", "quasi"],
        TSAbstractAccessorProperty: v.AbstractPropertyDefinition,
        TSAbstractKeyword: [],
        TSAbstractMethodDefinition: ["key", "value"],
        TSAbstractPropertyDefinition: v.AbstractPropertyDefinition,
        TSAnyKeyword: [],
        TSArrayType: ["elementType"],
        TSAsExpression: v.TypeAssertion,
        TSAsyncKeyword: [],
        TSBigIntKeyword: [],
        TSBooleanKeyword: [],
        TSCallSignatureDeclaration: v.FunctionType,
        TSClassImplements: ["expression", "typeParameters"],
        TSConditionalType: ["checkType", "extendsType", "trueType", "falseType"],
        TSConstructorType: v.FunctionType,
        TSConstructSignatureDeclaration: v.FunctionType,
        TSDeclareFunction: v.Function,
        TSDeclareKeyword: [],
        TSEmptyBodyFunctionExpression: ["id", ...v.FunctionType],
        TSEnumDeclaration: ["id", "members"],
        TSEnumMember: ["id", "initializer"],
        TSExportAssignment: ["expression"],
        TSExportKeyword: [],
        TSExternalModuleReference: ["expression"],
        TSFunctionType: v.FunctionType,
        TSImportEqualsDeclaration: ["id", "moduleReference"],
        TSImportType: ["parameter", "qualifier", "typeParameters"],
        TSIndexedAccessType: ["indexType", "objectType"],
        TSIndexSignature: ["parameters", "typeAnnotation"],
        TSInferType: ["typeParameter"],
        TSInstantiationExpression: ["expression", "typeParameters"],
        TSInterfaceBody: ["body"],
        TSInterfaceDeclaration: ["id", "typeParameters", "extends", "body"],
        TSInterfaceHeritage: ["expression", "typeParameters"],
        TSIntersectionType: ["types"],
        TSIntrinsicKeyword: [],
        TSLiteralType: ["literal"],
        TSMappedType: ["nameType", "typeParameter", "typeAnnotation"],
        TSMethodSignature: ["typeParameters", "key", "params", "returnType"],
        TSModuleBlock: ["body"],
        TSModuleDeclaration: ["id", "body"],
        TSNamedTupleMember: ["label", "elementType"],
        TSNamespaceExportDeclaration: ["id"],
        TSNeverKeyword: [],
        TSNonNullExpression: ["expression"],
        TSNullKeyword: [],
        TSNumberKeyword: [],
        TSObjectKeyword: [],
        TSOptionalType: ["typeAnnotation"],
        TSParameterProperty: ["decorators", "parameter"],
        TSPrivateKeyword: [],
        TSPropertySignature: ["typeAnnotation", "key", "initializer"],
        TSProtectedKeyword: [],
        TSPublicKeyword: [],
        TSQualifiedName: ["left", "right"],
        TSReadonlyKeyword: [],
        TSRestType: ["typeAnnotation"],
        TSSatisfiesExpression: ["typeAnnotation", "expression"],
        TSStaticKeyword: [],
        TSStringKeyword: [],
        TSSymbolKeyword: [],
        TSTemplateLiteralType: ["quasis", "types"],
        TSThisType: [],
        TSTupleType: ["elementTypes"],
        TSTypeAliasDeclaration: ["id", "typeParameters", "typeAnnotation"],
        TSTypeAnnotation: ["typeAnnotation"],
        TSTypeAssertion: v.TypeAssertion,
        TSTypeLiteral: ["members"],
        TSTypeOperator: ["typeAnnotation"],
        TSTypeParameter: ["name", "constraint", "default"],
        TSTypeParameterDeclaration: ["params"],
        TSTypeParameterInstantiation: ["params"],
        TSTypePredicate: ["typeAnnotation", "parameterName"],
        TSTypeQuery: ["exprName", "typeParameters"],
        TSTypeReference: ["typeName", "typeParameters"],
        TSUndefinedKeyword: [],
        TSUnionType: ["types"],
        TSUnknownKeyword: [],
        TSVoidKeyword: [],
      },
      n = f.unionWith(c);
    t.visitorKeys = n;
  }),
  Ke = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.visitorKeys = t.getKeys = void 0;
    var S = Hr();
    Object.defineProperty(t, "getKeys", {
      enumerable: !0,
      get: function() {
        return S.getKeys;
      },
    });
    var x = Vr();
    Object.defineProperty(t, "visitorKeys", {
      enumerable: !0,
      get: function() {
        return x.visitorKeys;
      },
    });
  }),
  Ie = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.simpleTraverse = void 0;
    var S = Ke();
    function x(c) {
      return c != null && typeof c == "object" && typeof c.type == "string";
    }
    function o(c, n) {
      return c[n.type] ?? [];
    }
    var f = class {
      constructor(c, n = !1) {
        this.allVisitorKeys = S.visitorKeys, this.selectors = c, this.setParentPointers = n;
      }
      traverse(c, n) {
        if (!x(c)) return;
        this.setParentPointers && (c.parent = n),
          "enter" in this.selectors
            ? this.selectors.enter(c, n)
            : c.type in this.selectors && this.selectors[c.type](c, n);
        let y = o(this.allVisitorKeys, c);
        if (!(y.length < 1)) {
          for (let r of y) {
            let s = c[r];
            if (Array.isArray(s)) for (let p of s) this.traverse(p, c);
            else this.traverse(s, c);
          }
        }
      }
    };
    function v(c, n, y = !1) {
      new f(n, y).traverse(c, void 0);
    }
    t.simpleTraverse = v;
  }),
  Gr = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.astConverter = void 0;
    var S = ke(), x = zr(), o = ae(), f = Ie();
    function v(c, n, y) {
      let { parseDiagnostics: r } = c;
      if (r.length) throw (0, S.convertError)(r[0]);
      let s = new S.Converter(c, { errorOnUnknownASTType: n.errorOnUnknownASTType || !1, shouldPreserveNodeMaps: y }),
        p = s.convertProgram();
      (!n.range || !n.loc) && (0, f.simpleTraverse)(p, {
        enter: a => {
          n.range || delete a.range, n.loc || delete a.loc;
        },
      }),
        n.tokens && (p.tokens = (0, o.convertTokens)(c)),
        n.comment && (p.comments = (0, x.convertComments)(c, n.code));
      let e = s.getASTMaps();
      return { estree: p, astMaps: e };
    }
    t.astConverter = v;
  }),
  re = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(A, w, d, E) {
          E === void 0 && (E = d);
          var i = Object.getOwnPropertyDescriptor(w, d);
          (!i || ("get" in i ? !w.__esModule : i.writable || i.configurable))
          && (i = {
            enumerable: !0,
            get: function() {
              return w[d];
            },
          }), Object.defineProperty(A, E, i);
        }
        : function(A, w, d, E) {
          E === void 0 && (E = d), A[E] = w[d];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(A, w) {
          Object.defineProperty(A, "default", { enumerable: !0, value: w });
        }
        : function(A, w) {
          A.default = w;
        }),
      o = t && t.__importStar || function(A) {
        if (A && A.__esModule) return A;
        var w = {};
        if (A != null) for (var d in A) d !== "default" && Object.prototype.hasOwnProperty.call(A, d) && S(w, A, d);
        return x(w, A), w;
      },
      f = t && t.__importDefault || function(A) {
        return A && A.__esModule ? A : { default: A };
      };
    Object.defineProperty(t, "__esModule", { value: !0 }),
      t.getModuleResolver =
        t.getAstFromProgram =
        t.getCanonicalFileName =
        t.ensureAbsolutePath =
        t.createHash =
        t.createDefaultCompilerOptionsFromExtra =
        t.canonicalDirname =
        t.CORE_COMPILER_OPTIONS =
          void 0;
    var v = f(Z), c = o($), n = { noEmit: !0, noUnusedLocals: !0, noUnusedParameters: !0 };
    t.CORE_COMPILER_OPTIONS = n;
    var y = Object.assign(Object.assign({}, n), { allowNonTsExtensions: !0, allowJs: !0, checkJs: !0 });
    function r(A) {
      return A.debugLevel.has("typescript") ? Object.assign(Object.assign({}, y), { extendedDiagnostics: !0 }) : y;
    }
    t.createDefaultCompilerOptionsFromExtra = r;
    var s = c.sys !== void 0 ? c.sys.useCaseSensitiveFileNames : !0, p = s ? A => A : A => A.toLowerCase();
    function e(A) {
      let w = v.default.normalize(A);
      return w.endsWith(v.default.sep) && (w = w.slice(0, -1)), p(w);
    }
    t.getCanonicalFileName = e;
    function a(A, w) {
      return v.default.isAbsolute(A) ? A : v.default.join(w || W.cwd(), A);
    }
    t.ensureAbsolutePath = a;
    function l(A) {
      return v.default.dirname(A);
    }
    t.canonicalDirname = l;
    var u = [c.Extension.Dts, c.Extension.Dcts, c.Extension.Dmts];
    function T(A) {
      var w;
      return A ? (w = u.find(d => A.endsWith(d))) !== null && w !== void 0 ? w : v.default.extname(A) : null;
    }
    function b(A, w) {
      let d = A.getSourceFile(w.filePath), E = T(w.filePath), i = T(d?.fileName);
      if (E === i) return d && { ast: d, program: A };
    }
    t.getAstFromProgram = b;
    function C(A) {
      let w;
      try {
        w = Yr(A);
      } catch {
        let d = [
          "Could not find the provided parserOptions.moduleResolver.",
          "Hint: use an absolute path if you are not in control over where the ESLint instance runs.",
        ];
        throw new Error(d.join(`
`));
      }
      return w;
    }
    t.getModuleResolver = C;
    function k(A) {
      var w;
      return !((w = c.sys) === null || w === void 0) && w.createHash ? c.sys.createHash(A) : A;
    }
    t.createHash = k;
  }),
  Qr = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(p, e, a, l) {
          l === void 0 && (l = a);
          var u = Object.getOwnPropertyDescriptor(e, a);
          (!u || ("get" in u ? !e.__esModule : u.writable || u.configurable))
          && (u = {
            enumerable: !0,
            get: function() {
              return e[a];
            },
          }), Object.defineProperty(p, l, u);
        }
        : function(p, e, a, l) {
          l === void 0 && (l = a), p[l] = e[a];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(p, e) {
          Object.defineProperty(p, "default", { enumerable: !0, value: e });
        }
        : function(p, e) {
          p.default = e;
        }),
      o = t && t.__importStar || function(p) {
        if (p && p.__esModule) return p;
        var e = {};
        if (p != null) for (var a in p) a !== "default" && Object.prototype.hasOwnProperty.call(p, a) && S(e, p, a);
        return x(e, p), e;
      },
      f = t && t.__importDefault || function(p) {
        return p && p.__esModule ? p : { default: p };
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.createDefaultProgram = void 0;
    var v = f(V),
      c = f(Z),
      n = o($),
      y = re(),
      r = (0, v.default)("typescript-eslint:typescript-estree:createDefaultProgram");
    function s(p) {
      var e;
      if (
        r("Getting default program for: %s", p.filePath || "unnamed file"),
          ((e = p.projects) === null || e === void 0 ? void 0 : e.length) !== 1
      ) return;
      let a = p.projects[0],
        l = n.getParsedCommandLineOfConfigFile(
          a,
          (0, y.createDefaultCompilerOptionsFromExtra)(p),
          Object.assign(Object.assign({}, n.sys), { onUnRecoverableConfigFileDiagnostic: () => {} }),
        );
      if (!l) return;
      let u = n.createCompilerHost(l.options, !0);
      p.moduleResolver && (u.resolveModuleNames = (0, y.getModuleResolver)(p.moduleResolver).resolveModuleNames);
      let T = u.readFile;
      u.readFile = k => c.default.normalize(k) === c.default.normalize(p.filePath) ? p.code : T(k);
      let b = n.createProgram([p.filePath], l.options, u), C = b.getSourceFile(p.filePath);
      return C && { ast: C, program: b };
    }
    t.createDefaultProgram = s;
  }),
  Ee = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(r, s, p, e) {
          e === void 0 && (e = p);
          var a = Object.getOwnPropertyDescriptor(s, p);
          (!a || ("get" in a ? !s.__esModule : a.writable || a.configurable))
          && (a = {
            enumerable: !0,
            get: function() {
              return s[p];
            },
          }), Object.defineProperty(r, e, a);
        }
        : function(r, s, p, e) {
          e === void 0 && (e = p), r[e] = s[p];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(r, s) {
          Object.defineProperty(r, "default", { enumerable: !0, value: s });
        }
        : function(r, s) {
          r.default = s;
        }),
      o = t && t.__importStar || function(r) {
        if (r && r.__esModule) return r;
        var s = {};
        if (r != null) for (var p in r) p !== "default" && Object.prototype.hasOwnProperty.call(r, p) && S(s, r, p);
        return x(s, r), s;
      },
      f = t && t.__importDefault || function(r) {
        return r && r.__esModule ? r : { default: r };
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.getLanguageVariant = t.getScriptKind = void 0;
    var v = f(Z), c = o($);
    function n(r, s) {
      switch (v.default.extname(r).toLowerCase()) {
        case c.Extension.Js:
        case c.Extension.Cjs:
        case c.Extension.Mjs:
          return c.ScriptKind.JS;
        case c.Extension.Jsx:
          return c.ScriptKind.JSX;
        case c.Extension.Ts:
        case c.Extension.Cts:
        case c.Extension.Mts:
          return c.ScriptKind.TS;
        case c.Extension.Tsx:
          return c.ScriptKind.TSX;
        case c.Extension.Json:
          return c.ScriptKind.JSON;
        default:
          return s ? c.ScriptKind.TSX : c.ScriptKind.TS;
      }
    }
    t.getScriptKind = n;
    function y(r) {
      switch (r) {
        case c.ScriptKind.TSX:
        case c.ScriptKind.JSX:
        case c.ScriptKind.JS:
        case c.ScriptKind.JSON:
          return c.LanguageVariant.JSX;
        default:
          return c.LanguageVariant.Standard;
      }
    }
    t.getLanguageVariant = y;
  }),
  Zr = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(p, e, a, l) {
          l === void 0 && (l = a);
          var u = Object.getOwnPropertyDescriptor(e, a);
          (!u || ("get" in u ? !e.__esModule : u.writable || u.configurable))
          && (u = {
            enumerable: !0,
            get: function() {
              return e[a];
            },
          }), Object.defineProperty(p, l, u);
        }
        : function(p, e, a, l) {
          l === void 0 && (l = a), p[l] = e[a];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(p, e) {
          Object.defineProperty(p, "default", { enumerable: !0, value: e });
        }
        : function(p, e) {
          p.default = e;
        }),
      o = t && t.__importStar || function(p) {
        if (p && p.__esModule) return p;
        var e = {};
        if (p != null) for (var a in p) a !== "default" && Object.prototype.hasOwnProperty.call(p, a) && S(e, p, a);
        return x(e, p), e;
      },
      f = t && t.__importDefault || function(p) {
        return p && p.__esModule ? p : { default: p };
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.createIsolatedProgram = void 0;
    var v = f(V),
      c = o($),
      n = Ee(),
      y = re(),
      r = (0, v.default)("typescript-eslint:typescript-estree:createIsolatedProgram");
    function s(p) {
      r("Getting isolated program in %s mode for: %s", p.jsx ? "TSX" : "TS", p.filePath);
      let e = {
          fileExists() {
            return !0;
          },
          getCanonicalFileName() {
            return p.filePath;
          },
          getCurrentDirectory() {
            return "";
          },
          getDirectories() {
            return [];
          },
          getDefaultLibFileName() {
            return "lib.d.ts";
          },
          getNewLine() {
            return `
`;
          },
          getSourceFile(u) {
            return c.createSourceFile(u, p.code, c.ScriptTarget.Latest, !0, (0, n.getScriptKind)(p.filePath, p.jsx));
          },
          readFile() {},
          useCaseSensitiveFileNames() {
            return !0;
          },
          writeFile() {
            return null;
          },
        },
        a = c.createProgram(
          [p.filePath],
          Object.assign(
            { noResolve: !0, target: c.ScriptTarget.Latest, jsx: p.jsx ? c.JsxEmit.Preserve : void 0 },
            (0, y.createDefaultCompilerOptionsFromExtra)(p),
          ),
          e,
        ),
        l = a.getSourceFile(p.filePath);
      if (!l) throw new Error("Expected an ast to be returned for the single-file isolated program.");
      return { ast: l, program: a };
    }
    t.createIsolatedProgram = s;
  }),
  en = F(t => {
    "use strict";
    var S = t && t.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.describeFilePath = void 0;
    var x = S(Z);
    function o(f, v) {
      let c = x.default.relative(v, f);
      return c && !c.startsWith("..") && !x.default.isAbsolute(c)
        ? `<tsconfigRootDir>/${c}`
        : /^[(\w+:)\\/~]/.test(f) || /\.\.[/\\]\.\./.test(c)
        ? f
        : `<tsconfigRootDir>/${c}`;
    }
    t.describeFilePath = o;
  }),
  Ye = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(_, P, N, M) {
          M === void 0 && (M = N);
          var K = Object.getOwnPropertyDescriptor(P, N);
          (!K || ("get" in K ? !P.__esModule : K.writable || K.configurable))
          && (K = {
            enumerable: !0,
            get: function() {
              return P[N];
            },
          }), Object.defineProperty(_, M, K);
        }
        : function(_, P, N, M) {
          M === void 0 && (M = N), _[M] = P[N];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(_, P) {
          Object.defineProperty(_, "default", { enumerable: !0, value: P });
        }
        : function(_, P) {
          _.default = P;
        }),
      o = t && t.__importStar || function(_) {
        if (_ && _.__esModule) return _;
        var P = {};
        if (_ != null) for (var N in _) N !== "default" && Object.prototype.hasOwnProperty.call(_, N) && S(P, _, N);
        return x(P, _), P;
      },
      f = t && t.__importDefault || function(_) {
        return _ && _.__esModule ? _ : { default: _ };
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.getWatchProgramsForProjects = t.clearWatchCaches = void 0;
    var v = f(V),
      c = f(ne),
      n = f(fe),
      y = o($),
      r = re(),
      s = (0, v.default)("typescript-eslint:typescript-estree:createWatchProgram"),
      p = new Map(),
      e = new Map(),
      a = new Map(),
      l = new Map(),
      u = new Map(),
      T = new Map();
    function b() {
      p.clear(), e.clear(), a.clear(), T.clear(), l.clear(), u.clear();
    }
    t.clearWatchCaches = b;
    function C(_) {
      return (P, N) => {
        let M = (0, r.getCanonicalFileName)(P),
          K = (() => {
            let J = _.get(M);
            return J || (J = new Set(), _.set(M, J)), J;
          })();
        return K.add(N), {
          close: () => {
            K.delete(N);
          },
        };
      };
    }
    var k = { code: "", filePath: "" };
    function A(_) {
      throw new Error(y.flattenDiagnosticMessageText(_.messageText, y.sys.newLine));
    }
    function w(_, P, N) {
      let M = N.EXPERIMENTAL_useSourceOfProjectReferenceRedirect
        ? new Set(P.getSourceFiles().map(K => (0, r.getCanonicalFileName)(K.fileName)))
        : new Set(P.getRootFileNames().map(K => (0, r.getCanonicalFileName)(K)));
      return l.set(_, M), M;
    }
    function d(_) {
      let P = (0, r.getCanonicalFileName)(_.filePath), N = [];
      k.code = _.code, k.filePath = P;
      let M = e.get(P), K = (0, r.createHash)(_.code);
      T.get(P) !== K && M && M.size > 0 && M.forEach(Y => Y(P, y.FileWatcherEventKind.Changed));
      let J = new Set(_.projects);
      for (let [Y, B] of p.entries()) {
        if (!J.has(Y)) continue;
        let q = l.get(Y), R = null;
        if (q || (R = B.getProgram().getProgram(), q = w(Y, R, _)), q.has(P)) {
          return s("Found existing program for file. %s", P),
            R = R ?? B.getProgram().getProgram(),
            R.getTypeChecker(),
            [R];
        }
      }
      s("File did not belong to any existing programs, moving to create/update. %s", P);
      for (let Y of _.projects) {
        let B = p.get(Y);
        if (B) {
          let U = g(B, P, Y);
          if (!U) {
            continue;
          }
          if (U.getTypeChecker(), w(Y, U, _).has(P)) return s("Found updated program for file. %s", P), [U];
          N.push(U);
          continue;
        }
        let q = i(Y, _);
        p.set(Y, q);
        let R = q.getProgram().getProgram();
        if (R.getTypeChecker(), w(Y, R, _).has(P)) return s("Found program for file. %s", P), [R];
        N.push(R);
      }
      return N;
    }
    t.getWatchProgramsForProjects = d;
    var E = n.default.satisfies(y.version, ">=3.9.0-beta", { includePrerelease: !0 });
    function i(_, P) {
      s("Creating watch program for %s.", _);
      let N = y.createWatchCompilerHost(
        _,
        (0, r.createDefaultCompilerOptionsFromExtra)(P),
        y.sys,
        y.createAbstractBuilder,
        A,
        () => {},
      );
      P.moduleResolver && (N.resolveModuleNames = (0, r.getModuleResolver)(P.moduleResolver).resolveModuleNames);
      let M = N.readFile;
      N.readFile = (B, q) => {
        let R = (0, r.getCanonicalFileName)(B), U = R === k.filePath ? k.code : M(R, q);
        return U !== void 0 && T.set(R, (0, r.createHash)(U)), U;
      },
        N.onUnRecoverableConfigFileDiagnostic = A,
        N.afterProgramCreate = B => {
          let q = B.getConfigFileParsingDiagnostics().filter(R =>
            R.category === y.DiagnosticCategory.Error && R.code !== 18003
          );
          q.length > 0 && A(q[0]);
        },
        N.watchFile = C(e),
        N.watchDirectory = C(a);
      let K = N.onCachedDirectoryStructureHostCreate;
      N.onCachedDirectoryStructureHostCreate = B => {
        let q = B.readDirectory;
        B.readDirectory = (R, U, z, ee, se) => q(R, U ? U.concat(P.extraFileExtensions) : void 0, z, ee, se), K(B);
      },
        N.extraFileExtensions = P.extraFileExtensions.map(B => ({
          extension: B,
          isMixedContent: !0,
          scriptKind: y.ScriptKind.Deferred,
        })),
        N.trace = s,
        N.useSourceOfProjectReferenceRedirect = () => P.EXPERIMENTAL_useSourceOfProjectReferenceRedirect;
      let J;
      E
        ? (N.setTimeout = void 0, N.clearTimeout = void 0)
        : (s("Running without timeout fix"),
          N.setTimeout = (B, q, ...R) => (J = B.bind(void 0, ...R), J),
          N.clearTimeout = () => {
            J = void 0;
          });
      let Y = y.createWatchProgram(N);
      if (!E) {
        let B = Y.getProgram;
        Y.getProgram = () => (J && J(), J = void 0, B.call(Y));
      }
      return Y;
    }
    function m(_) {
      let P = c.default.statSync(_).mtimeMs, N = u.get(_);
      return u.set(_, P), N === void 0 ? !1 : Math.abs(N - P) > Number.EPSILON;
    }
    function g(_, P, N) {
      let M = _.getProgram().getProgram();
      if (W.env.TSESTREE_NO_INVALIDATION === "true") return M;
      m(N)
        && (s("tsconfig has changed - triggering program update. %s", N),
          e.get(N).forEach(z => z(N, y.FileWatcherEventKind.Changed)),
          l.delete(N));
      let K = M.getSourceFile(P);
      if (K) return M;
      s("File was not found in program - triggering folder update. %s", P);
      let J = (0, r.canonicalDirname)(P), Y = null, B = J, q = !1;
      for (; Y !== B;) {
        Y = B;
        let z = a.get(Y);
        z && (z.forEach(ee => {
          J !== Y && ee(J, y.FileWatcherEventKind.Changed), ee(Y, y.FileWatcherEventKind.Changed);
        }),
          q = !0), B = (0, r.canonicalDirname)(Y);
      }
      if (!q) return s("No callback found for file, not part of this program. %s", P), null;
      if (l.delete(N), M = _.getProgram().getProgram(), K = M.getSourceFile(P), K) return M;
      s("File was still not found in program after directory update - checking file deletions. %s", P);
      let R = M.getRootFileNames().find(z => !c.default.existsSync(z));
      if (!R) return null;
      let U = e.get((0, r.getCanonicalFileName)(R));
      return U
        ? (s("Marking file as deleted. %s", R),
          U.forEach(z => z(R, y.FileWatcherEventKind.Deleted)),
          l.delete(N),
          M = _.getProgram().getProgram(),
          K = M.getSourceFile(P),
          K
            ? M
            : (s(
              "File was still not found in program after deletion check, assuming it is not part of this program. %s",
              P,
            ),
              null))
        : (s("Could not find watch callbacks for root file. %s", R), M);
    }
  }),
  tn = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(u, T, b, C) {
          C === void 0 && (C = b);
          var k = Object.getOwnPropertyDescriptor(T, b);
          (!k || ("get" in k ? !T.__esModule : k.writable || k.configurable))
          && (k = {
            enumerable: !0,
            get: function() {
              return T[b];
            },
          }), Object.defineProperty(u, C, k);
        }
        : function(u, T, b, C) {
          C === void 0 && (C = b), u[C] = T[b];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(u, T) {
          Object.defineProperty(u, "default", { enumerable: !0, value: T });
        }
        : function(u, T) {
          u.default = T;
        }),
      o = t && t.__importStar || function(u) {
        if (u && u.__esModule) return u;
        var T = {};
        if (u != null) for (var b in u) b !== "default" && Object.prototype.hasOwnProperty.call(u, b) && S(T, u, b);
        return x(T, u), T;
      },
      f = t && t.__importDefault || function(u) {
        return u && u.__esModule ? u : { default: u };
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.createProjectProgram = void 0;
    var v = f(V),
      c = f(Z),
      n = o($),
      y = ae(),
      r = en(),
      s = Ye(),
      p = re(),
      e = (0, v.default)("typescript-eslint:typescript-estree:createProjectProgram"),
      a = [
        n.Extension.Ts,
        n.Extension.Tsx,
        n.Extension.Js,
        n.Extension.Jsx,
        n.Extension.Mjs,
        n.Extension.Mts,
        n.Extension.Cjs,
        n.Extension.Cts,
      ];
    function l(u) {
      e("Creating project program for: %s", u.filePath);
      let T = (0, s.getWatchProgramsForProjects)(u), b = (0, y.firstDefined)(T, g => (0, p.getAstFromProgram)(g, u));
      if (b || u.createDefaultProgram) return b;
      let C = g => (0, r.describeFilePath)(g, u.tsconfigRootDir),
        k = (0, r.describeFilePath)(u.filePath, u.tsconfigRootDir),
        A = u.projects.map(C),
        w = A.length === 1 ? A[0] : `
${
          A.map(g => `- ${g}`).join(`
`)
        }`,
        d = [`ESLint was configured to run on \`${k}\` using \`parserOptions.project\`: ${w}`],
        E = !1,
        i = u.extraFileExtensions || [];
      i.forEach(g => {
        g.startsWith(".")
        || d.push(
          `Found unexpected extension \`${g}\` specified with the \`parserOptions.extraFileExtensions\` option. Did you mean \`.${g}\`?`,
        ),
          a.includes(g)
          && d.push(
            `You unnecessarily included the extension \`${g}\` with the \`parserOptions.extraFileExtensions\` option. This extension is already handled by the parser by default.`,
          );
      });
      let m = c.default.extname(u.filePath);
      if (!a.includes(m)) {
        let g = `The extension for the file (\`${m}\`) is non-standard`;
        i.length > 0
          ? i.includes(m)
            || (d.push(`${g}. It should be added to your existing \`parserOptions.extraFileExtensions\`.`), E = !0)
          : (d.push(`${g}. You should add \`parserOptions.extraFileExtensions\` to your config.`), E = !0);
      }
      if (!E) {
        let [g, _] = u.projects.length === 1
          ? ["that TSConfig does not", "that TSConfig"]
          : ["none of those TSConfigs", "one of those TSConfigs"];
        d.push(
          `However, ${g} include this file. Either:`,
          "- Change ESLint's list of included files to not include this file",
          `- Change ${_} to include this file`,
          "- Create a new TSConfig that includes this file and include it in your parserOptions.project",
          "See the typescript-eslint docs for more info: https://typescript-eslint.io/linting/troubleshooting#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file",
        );
      }
      throw new Error(d.join(`
`));
    }
    t.createProjectProgram = l;
  }),
  rn = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(s, p, e, a) {
          a === void 0 && (a = e);
          var l = Object.getOwnPropertyDescriptor(p, e);
          (!l || ("get" in l ? !p.__esModule : l.writable || l.configurable))
          && (l = {
            enumerable: !0,
            get: function() {
              return p[e];
            },
          }), Object.defineProperty(s, a, l);
        }
        : function(s, p, e, a) {
          a === void 0 && (a = e), s[a] = p[e];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(s, p) {
          Object.defineProperty(s, "default", { enumerable: !0, value: p });
        }
        : function(s, p) {
          s.default = p;
        }),
      o = t && t.__importStar || function(s) {
        if (s && s.__esModule) return s;
        var p = {};
        if (s != null) for (var e in s) e !== "default" && Object.prototype.hasOwnProperty.call(s, e) && S(p, s, e);
        return x(p, s), p;
      },
      f = t && t.__importDefault || function(s) {
        return s && s.__esModule ? s : { default: s };
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.createSourceFile = void 0;
    var v = f(V), c = o($), n = Ee(), y = (0, v.default)("typescript-eslint:typescript-estree:createSourceFile");
    function r(s) {
      return y("Getting AST without type information in %s mode for: %s", s.jsx ? "TSX" : "TS", s.filePath),
        c.createSourceFile(s.filePath, s.code, c.ScriptTarget.Latest, !0, (0, n.getScriptKind)(s.filePath, s.jsx));
    }
    t.createSourceFile = r;
  }),
  Le = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(l, u, T, b) {
          b === void 0 && (b = T);
          var C = Object.getOwnPropertyDescriptor(u, T);
          (!C || ("get" in C ? !u.__esModule : C.writable || C.configurable))
          && (C = {
            enumerable: !0,
            get: function() {
              return u[T];
            },
          }), Object.defineProperty(l, b, C);
        }
        : function(l, u, T, b) {
          b === void 0 && (b = T), l[b] = u[T];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(l, u) {
          Object.defineProperty(l, "default", { enumerable: !0, value: u });
        }
        : function(l, u) {
          l.default = u;
        }),
      o = t && t.__importStar || function(l) {
        if (l && l.__esModule) return l;
        var u = {};
        if (l != null) for (var T in l) T !== "default" && Object.prototype.hasOwnProperty.call(l, T) && S(u, l, T);
        return x(u, l), u;
      },
      f = t && t.__importDefault || function(l) {
        return l && l.__esModule ? l : { default: l };
      };
    Object.defineProperty(t, "__esModule", { value: !0 }),
      t.createProgramFromConfigFile = t.useProvidedPrograms = void 0;
    var v = f(V),
      c = o(ne),
      n = o(Z),
      y = o($),
      r = re(),
      s = (0, v.default)("typescript-eslint:typescript-estree:useProvidedProgram");
    function p(l, u) {
      s("Retrieving ast for %s from provided program instance(s)", u.filePath);
      let T;
      for (let b of l) if (T = (0, r.getAstFromProgram)(b, u), T) break;
      if (!T) {
        let b = [
          "\"parserOptions.programs\" has been provided for @typescript-eslint/parser.",
          `The file was not found in any of the provided program instance(s): ${
            n.relative(u.tsconfigRootDir || W.cwd(), u.filePath)
          }`,
        ];
        throw new Error(b.join(`
`));
      }
      return T.program.getTypeChecker(), T;
    }
    t.useProvidedPrograms = p;
    function e(l, u) {
      if (y.sys === void 0) {
        throw new Error("`createProgramFromConfigFile` is only supported in a Node-like environment.");
      }
      let T = y.getParsedCommandLineOfConfigFile(l, r.CORE_COMPILER_OPTIONS, {
        onUnRecoverableConfigFileDiagnostic: C => {
          throw new Error(a([C]));
        },
        fileExists: c.existsSync,
        getCurrentDirectory: () => u && n.resolve(u) || W.cwd(),
        readDirectory: y.sys.readDirectory,
        readFile: C => c.readFileSync(C, "utf-8"),
        useCaseSensitiveFileNames: y.sys.useCaseSensitiveFileNames,
      });
      if (T.errors.length) throw new Error(a(T.errors));
      let b = y.createCompilerHost(T.options, !0);
      return y.createProgram(T.fileNames, T.options, b);
    }
    t.createProgramFromConfigFile = e;
    function a(l) {
      return y.formatDiagnostics(l, {
        getCanonicalFileName: u => u,
        getCurrentDirectory: W.cwd,
        getNewLine: () => `
`,
      });
    }
  }),
  Re = F(t => {
    "use strict";
    var S = t && t.__classPrivateFieldSet || function(n, y, r, s, p) {
        if (s === "m") throw new TypeError("Private method is not writable");
        if (s === "a" && !p) throw new TypeError("Private accessor was defined without a setter");
        if (typeof y == "function" ? n !== y || !p : !y.has(n)) {
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        }
        return s === "a" ? p.call(n, r) : p ? p.value = r : y.set(n, r), r;
      },
      x = t && t.__classPrivateFieldGet || function(n, y, r, s) {
        if (r === "a" && !s) throw new TypeError("Private accessor was defined without a getter");
        if (typeof y == "function" ? n !== y || !s : !y.has(n)) {
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        }
        return r === "m" ? s : r === "a" ? s.call(n) : s ? s.value : y.get(n);
      },
      o,
      f;
    Object.defineProperty(t, "__esModule", { value: !0 }),
      t.ExpiringCache = t.DEFAULT_TSCONFIG_CACHE_DURATION_SECONDS = void 0,
      t.DEFAULT_TSCONFIG_CACHE_DURATION_SECONDS = 30;
    var v = [0, 0],
      c = class {
        constructor(n) {
          o.set(this, void 0), f.set(this, new Map()), S(this, o, n, "f");
        }
        set(n, y) {
          return x(this, f, "f").set(n, { value: y, lastSeen: x(this, o, "f") === "Infinity" ? v : W.hrtime() }), this;
        }
        get(n) {
          let y = x(this, f, "f").get(n);
          if (y?.value != null) {
            if (x(this, o, "f") === "Infinity" || W.hrtime(y.lastSeen)[0] < x(this, o, "f")) return y.value;
            x(this, f, "f").delete(n);
          }
        }
        clear() {
          x(this, f, "f").clear();
        }
      };
    t.ExpiringCache = c, o = new WeakMap(), f = new WeakMap();
  }),
  nn = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(s, p, e, a) {
          a === void 0 && (a = e);
          var l = Object.getOwnPropertyDescriptor(p, e);
          (!l || ("get" in l ? !p.__esModule : l.writable || l.configurable))
          && (l = {
            enumerable: !0,
            get: function() {
              return p[e];
            },
          }), Object.defineProperty(s, a, l);
        }
        : function(s, p, e, a) {
          a === void 0 && (a = e), s[a] = p[e];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(s, p) {
          Object.defineProperty(s, "default", { enumerable: !0, value: p });
        }
        : function(s, p) {
          s.default = p;
        }),
      o = t && t.__importStar || function(s) {
        if (s && s.__esModule) return s;
        var p = {};
        if (s != null) for (var e in s) e !== "default" && Object.prototype.hasOwnProperty.call(s, e) && S(p, s, e);
        return x(p, s), p;
      },
      f = t && t.__importDefault || function(s) {
        return s && s.__esModule ? s : { default: s };
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.getProjectConfigFiles = void 0;
    var v = f(V), c = o(ne), n = o(Z), y = (0, v.default)("typescript-eslint:typescript-estree:getProjectConfigFiles");
    function r(s, p) {
      var e;
      if (p !== !0) return p === void 0 || Array.isArray(p) ? p : [p];
      y("Looking for tsconfig.json at or above file: %s", s.filePath);
      let a = n.dirname(s.filePath), l = [a];
      do {
        y("Checking tsconfig.json path: %s", a);
        let u = n.join(a, "tsconfig.json"),
          T = (e = s.tsconfigMatchCache.get(a)) !== null && e !== void 0 ? e : c.existsSync(u) && u;
        if (T) {
          for (let b of l) s.tsconfigMatchCache.set(b, T);
          return [T];
        }
        a = n.dirname(a), l.push(a);
      } while (a.length > 1 && a.length >= s.tsconfigRootDir.length);
      throw new Error(
        `project was set to \`true\` but couldn't find any tsconfig.json relative to '${s.filePath}' within '${s.tsconfigRootDir}'.`,
      );
    }
    t.getProjectConfigFiles = r;
  }),
  on = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.inferSingleRun = void 0;
    var S = Z;
    function x(o) {
      return o?.project == null || o?.programs != null || W.env.TSESTREE_SINGLE_RUN === "false"
        ? !1
        : !!(W.env.TSESTREE_SINGLE_RUN === "true"
          || o?.allowAutomaticSingleRunInference
            && (W.env.CI === "true" || W.argv[1].endsWith((0, S.normalize)("node_modules/.bin/eslint"))));
    }
    t.inferSingleRun = x;
  }),
  Be = F(t => {
    "use strict";
    var S = t && t.__importDefault || function(a) {
      return a && a.__esModule ? a : { default: a };
    };
    Object.defineProperty(t, "__esModule", { value: !0 }),
      t.clearGlobResolutionCache = t.resolveProjectList = t.clearGlobCache = void 0;
    var x = S(V),
      o = Cr,
      f = S(jr),
      v = re(),
      c = Re(),
      n = (0, x.default)("typescript-eslint:typescript-estree:parser:parseSettings:resolveProjectList"),
      y = null;
    function r() {
      y?.clear();
    }
    t.clearGlobCache = r;
    function s(a) {
      var l, u, T;
      let b = [];
      if (typeof a.project == "string") b.push(a.project);
      else if (Array.isArray(a.project)) for (let i of a.project) typeof i == "string" && b.push(i);
      if (b.length === 0) return [];
      let C = ((l = a.projectFolderIgnoreList) !== null && l !== void 0 ? l : ["**/node_modules/**"]).reduce(
          (i, m) => (typeof m == "string" && i.push(m), i),
          [],
        ).map(i => i.startsWith("!") ? i : `!${i}`),
        k = p({ project: b, projectFolderIgnoreList: C, tsconfigRootDir: a.tsconfigRootDir });
      if (y == null) {
        y = new c.ExpiringCache(
          a.singleRun
            ? "Infinity"
            : (T = (u = a.cacheLifetime) === null || u === void 0 ? void 0 : u.glob) !== null && T !== void 0
            ? T
            : c.DEFAULT_TSCONFIG_CACHE_DURATION_SECONDS,
        );
      } else {
        let i = y.get(k);
        if (i) return i;
      }
      let A = b.filter(i => !(0, f.default)(i)),
        w = b.filter(i => (0, f.default)(i)),
        d = new Set(
          A.concat(w.length === 0 ? [] : (0, o.sync)([...w, ...C], { cwd: a.tsconfigRootDir })).map(i =>
            (0, v.getCanonicalFileName)((0, v.ensureAbsolutePath)(i, a.tsconfigRootDir))
          ),
        );
      n("parserOptions.project (excluding ignored) matched projects: %s", d);
      let E = Array.from(d);
      return y.set(k, E), E;
    }
    t.resolveProjectList = s;
    function p({ project: a, projectFolderIgnoreList: l, tsconfigRootDir: u }) {
      let T = { tsconfigRootDir: u, project: a, projectFolderIgnoreList: [...l].sort() };
      return (0, v.createHash)(JSON.stringify(T));
    }
    function e() {
      y?.clear(), y = null;
    }
    t.clearGlobResolutionCache = e;
  }),
  an = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(a, l, u, T) {
          T === void 0 && (T = u);
          var b = Object.getOwnPropertyDescriptor(l, u);
          (!b || ("get" in b ? !l.__esModule : b.writable || b.configurable))
          && (b = {
            enumerable: !0,
            get: function() {
              return l[u];
            },
          }), Object.defineProperty(a, T, b);
        }
        : function(a, l, u, T) {
          T === void 0 && (T = u), a[T] = l[u];
        }),
      x = t && t.__setModuleDefault || (Object.create
        ? function(a, l) {
          Object.defineProperty(a, "default", { enumerable: !0, value: l });
        }
        : function(a, l) {
          a.default = l;
        }),
      o = t && t.__importStar || function(a) {
        if (a && a.__esModule) return a;
        var l = {};
        if (a != null) for (var u in a) u !== "default" && Object.prototype.hasOwnProperty.call(a, u) && S(l, a, u);
        return x(l, a), l;
      },
      f = t && t.__importDefault || function(a) {
        return a && a.__esModule ? a : { default: a };
      };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.warnAboutTSVersion = void 0;
    var v = f(fe),
      c = o($),
      n = ">=3.3.1 <5.1.0",
      y = ["5.0.1-rc"],
      r = c.version,
      s = v.default.satisfies(r, [n].concat(y).join(" || ")),
      p = !1;
    function e(a) {
      var l;
      if (!s && !p) {
        if (!(typeof W > "u") && !((l = W.stdout) === null || l === void 0) && l.isTTY) {
          let u = "=============",
            T = [
              u,
              "WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.",
              "You may find that it works just fine, or you may not.",
              `SUPPORTED TYPESCRIPT VERSIONS: ${n}`,
              `YOUR TYPESCRIPT VERSION: ${r}`,
              "Please only submit bug reports when using the officially supported version.",
              u,
            ];
          a.log(T.join(`

`));
        }
        p = !0;
      }
    }
    t.warnAboutTSVersion = e;
  }),
  Je = F(t => {
    "use strict";
    var S = t && t.__importDefault || function(u) {
      return u && u.__esModule ? u : { default: u };
    };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.clearTSConfigMatchCache = t.createParseSettings = void 0;
    var x = S(V),
      o = re(),
      f = Re(),
      v = nn(),
      c = on(),
      n = Be(),
      y = an(),
      r = (0, x.default)("typescript-eslint:typescript-estree:parser:parseSettings:createParseSettings"),
      s;
    function p(u, T = {}) {
      var b, C, k;
      let A = (0, c.inferSingleRun)(T),
        w = typeof T.tsconfigRootDir == "string" ? T.tsconfigRootDir : W.cwd(),
        d = {
          code: a(u),
          comment: T.comment === !0,
          comments: [],
          createDefaultProgram: T.createDefaultProgram === !0,
          debugLevel: T.debugLevel === !0
            ? new Set(["typescript-eslint"])
            : Array.isArray(T.debugLevel)
            ? new Set(T.debugLevel)
            : new Set(),
          errorOnTypeScriptSyntacticAndSemanticIssues: !1,
          errorOnUnknownASTType: T.errorOnUnknownASTType === !0,
          EXPERIMENTAL_useSourceOfProjectReferenceRedirect: T.EXPERIMENTAL_useSourceOfProjectReferenceRedirect === !0,
          extraFileExtensions: Array.isArray(T.extraFileExtensions) && T.extraFileExtensions.every(E =>
              typeof E == "string"
            )
            ? T.extraFileExtensions
            : [],
          filePath: (0, o.ensureAbsolutePath)(
            typeof T.filePath == "string" && T.filePath !== "<input>" ? T.filePath : l(T.jsx),
            w,
          ),
          jsx: T.jsx === !0,
          loc: T.loc === !0,
          log: typeof T.loggerFn == "function" ? T.loggerFn : T.loggerFn === !1 ? () => {} : console.log,
          moduleResolver: (b = T.moduleResolver) !== null && b !== void 0 ? b : "",
          preserveNodeMaps: T.preserveNodeMaps !== !1,
          programs: Array.isArray(T.programs) ? T.programs : null,
          projects: [],
          range: T.range === !0,
          singleRun: A,
          tokens: T.tokens === !0 ? [] : null,
          tsconfigMatchCache: s ?? (s = new f.ExpiringCache(
            A
              ? "Infinity"
              : (k = (C = T.cacheLifetime) === null || C === void 0 ? void 0 : C.glob) !== null && k !== void 0
              ? k
              : f.DEFAULT_TSCONFIG_CACHE_DURATION_SECONDS,
          )),
          tsconfigRootDir: w,
        };
      if (d.debugLevel.size > 0) {
        let E = [];
        d.debugLevel.has("typescript-eslint") && E.push("typescript-eslint:*"),
          (d.debugLevel.has("eslint") || x.default.enabled("eslint:*,-eslint:code-path"))
          && E.push("eslint:*,-eslint:code-path"),
          x.default.enable(E.join(","));
      }
      if (Array.isArray(T.programs)) {
        if (!T.programs.length) {
          throw new Error(
            "You have set parserOptions.programs to an empty array. This will cause all files to not be found in existing programs. Either provide one or more existing TypeScript Program instances in the array, or remove the parserOptions.programs setting.",
          );
        }
        r("parserOptions.programs was provided, so parserOptions.project will be ignored.");
      }
      return d.programs
        || (d.projects = (0, n.resolveProjectList)({
          cacheLifetime: T.cacheLifetime,
          project: (0, v.getProjectConfigFiles)(d, T.project),
          projectFolderIgnoreList: T.projectFolderIgnoreList,
          singleRun: d.singleRun,
          tsconfigRootDir: w,
        })),
        (0, y.warnAboutTSVersion)(d),
        d;
    }
    t.createParseSettings = p;
    function e() {
      s?.clear();
    }
    t.clearTSConfigMatchCache = e;
    function a(u) {
      return typeof u != "string" ? String(u) : u;
    }
    function l(u) {
      return u ? "estree.tsx" : "estree.ts";
    }
  }),
  sn = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.getFirstSemanticOrSyntacticError = void 0;
    var S = $;
    function x(v, c) {
      try {
        let n = o(v.getSyntacticDiagnostics(c));
        if (n.length) return f(n[0]);
        let y = o(v.getSemanticDiagnostics(c));
        return y.length ? f(y[0]) : void 0;
      } catch (n) {
        console.warn(`Warning From TSC: "${n.message}`);
        return;
      }
    }
    t.getFirstSemanticOrSyntacticError = x;
    function o(v) {
      return v.filter(c => {
        switch (c.code) {
          case 1013:
          case 1014:
          case 1044:
          case 1045:
          case 1048:
          case 1049:
          case 1070:
          case 1071:
          case 1085:
          case 1090:
          case 1096:
          case 1097:
          case 1098:
          case 1099:
          case 1117:
          case 1121:
          case 1123:
          case 1141:
          case 1162:
          case 1164:
          case 1172:
          case 1173:
          case 1175:
          case 1176:
          case 1190:
          case 1196:
          case 1200:
          case 1206:
          case 1211:
          case 1242:
          case 1246:
          case 1255:
          case 1308:
          case 2364:
          case 2369:
          case 2452:
          case 2462:
          case 8017:
          case 17012:
          case 17013:
            return !0;
        }
        return !1;
      });
    }
    function f(v) {
      return Object.assign(Object.assign({}, v), {
        message: (0, S.flattenDiagnosticMessageText)(v.messageText, S.sys.newLine),
      });
    }
  }),
  Xe = F(t => {
    "use strict";
    var S = t && t.__importDefault || function(d) {
      return d && d.__esModule ? d : { default: d };
    };
    Object.defineProperty(t, "__esModule", { value: !0 }),
      t.clearParseAndGenerateServicesCalls =
        t.clearProgramCache =
        t.parseWithNodeMaps =
        t.parseAndGenerateServices =
        t.parse =
          void 0;
    var x = S(V),
      o = Gr(),
      f = ke(),
      v = Qr(),
      c = Zr(),
      n = tn(),
      y = rn(),
      r = Le(),
      s = Je(),
      p = sn(),
      e = (0, x.default)("typescript-eslint:typescript-estree:parser"),
      a = new Map();
    function l() {
      a.clear();
    }
    t.clearProgramCache = l;
    function u(d, E) {
      return d.programs && (0, r.useProvidedPrograms)(d.programs, d) || E && (0, n.createProjectProgram)(d)
        || E && d.createDefaultProgram && (0, v.createDefaultProgram)(d) || (0, c.createIsolatedProgram)(d);
    }
    function T(d, E) {
      let { ast: i } = b(d, E, !1);
      return i;
    }
    t.parse = T;
    function b(d, E, i) {
      let m = (0, s.createParseSettings)(d, E);
      if (E?.errorOnTypeScriptSyntacticAndSemanticIssues) {
        throw new Error(
          "\"errorOnTypeScriptSyntacticAndSemanticIssues\" is only supported for parseAndGenerateServices()",
        );
      }
      let g = (0, y.createSourceFile)(m), { estree: _, astMaps: P } = (0, o.astConverter)(g, m, i);
      return { ast: _, esTreeNodeToTSNodeMap: P.esTreeNodeToTSNodeMap, tsNodeToESTreeNodeMap: P.tsNodeToESTreeNodeMap };
    }
    function C(d, E) {
      return b(d, E, !0);
    }
    t.parseWithNodeMaps = C;
    var k = {};
    function A() {
      k = {};
    }
    t.clearParseAndGenerateServicesCalls = A;
    function w(d, E) {
      var i, m;
      let g = (0, s.createParseSettings)(d, E);
      E !== void 0 && typeof E.errorOnTypeScriptSyntacticAndSemanticIssues == "boolean"
      && E.errorOnTypeScriptSyntacticAndSemanticIssues && (g.errorOnTypeScriptSyntacticAndSemanticIssues = !0),
        g.singleRun && !g.programs && ((i = g.projects) === null || i === void 0 ? void 0 : i.length) > 0
        && (g.programs = {
          *[Symbol.iterator]() {
            for (let Y of g.projects) {
              let B = a.get(Y);
              if (B) yield B;
              else {
                e("Detected single-run/CLI usage, creating Program once ahead of time for project: %s", Y);
                let q = (0, r.createProgramFromConfigFile)(Y);
                a.set(Y, q), yield q;
              }
            }
          },
        });
      let _ = g.programs != null || ((m = g.projects) === null || m === void 0 ? void 0 : m.length) > 0;
      g.singleRun && E.filePath && (k[E.filePath] = (k[E.filePath] || 0) + 1);
      let { ast: P, program: N } = g.singleRun && E.filePath && k[E.filePath] > 1
          ? (0, c.createIsolatedProgram)(g)
          : u(g, _),
        M = typeof g.preserveNodeMaps == "boolean" ? g.preserveNodeMaps : !0,
        { estree: K, astMaps: J } = (0, o.astConverter)(P, g, M);
      if (N && g.errorOnTypeScriptSyntacticAndSemanticIssues) {
        let Y = (0, p.getFirstSemanticOrSyntacticError)(N, P);
        if (Y) throw (0, f.convertError)(Y);
      }
      return {
        ast: K,
        services: {
          hasFullTypeInformation: _,
          program: N,
          esTreeNodeToTSNodeMap: J.esTreeNodeToTSNodeMap,
          tsNodeToESTreeNodeMap: J.tsNodeToESTreeNodeMap,
        },
      };
    }
    t.parseAndGenerateServices = w;
  }),
  cn = F(t => {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.clearProgramCache = t.clearCaches = void 0;
    var S = Ye(), x = Xe(), o = Je(), f = Be();
    function v() {
      (0, x.clearProgramCache)(), (0, S.clearWatchCaches)(), (0, o.clearTSConfigMatchCache)(), (0, f.clearGlobCache)();
    }
    t.clearCaches = v, t.clearProgramCache = v;
  }),
  ln = F((t, S) => {
    S.exports = {
      name: "@typescript-eslint/typescript-estree",
      version: "5.59.2",
      description: "A parser that converts TypeScript source code into an ESTree compatible form",
      main: "dist/index.js",
      types: "dist/index.d.ts",
      files: ["dist", "_ts3.4", "README.md", "LICENSE"],
      engines: { node: "^12.22.0 || ^14.17.0 || >=16.0.0" },
      repository: {
        type: "git",
        url: "https://github.com/typescript-eslint/typescript-eslint.git",
        directory: "packages/typescript-estree",
      },
      bugs: { url: "https://github.com/typescript-eslint/typescript-eslint/issues" },
      license: "BSD-2-Clause",
      keywords: ["ast", "estree", "ecmascript", "javascript", "typescript", "parser", "syntax"],
      scripts: {
        build: "tsc -b tsconfig.build.json",
        postbuild: "downlevel-dts dist _ts3.4/dist",
        clean: "tsc -b tsconfig.build.json --clean",
        postclean: "rimraf dist && rimraf _ts3.4 && rimraf coverage",
        format:
          "prettier --write \"./**/*.{ts,mts,cts,tsx,js,mjs,cjs,jsx,json,md,css}\" --ignore-path ../../.prettierignore",
        lint: "nx lint",
        test: "jest --coverage",
        typecheck: "tsc -p tsconfig.json --noEmit",
      },
      dependencies: {
        "@typescript-eslint/types": "5.59.2",
        "@typescript-eslint/visitor-keys": "5.59.2",
        debug: "^4.3.4",
        globby: "^11.1.0",
        "is-glob": "^4.0.3",
        semver: "^7.3.7",
        tsutils: "^3.21.0",
      },
      devDependencies: {
        "@babel/code-frame": "*",
        "@babel/parser": "*",
        "@types/babel__code-frame": "*",
        "@types/debug": "*",
        "@types/glob": "*",
        "@types/is-glob": "*",
        "@types/semver": "*",
        "@types/tmp": "*",
        glob: "*",
        "jest-specific-snapshot": "*",
        "make-dir": "*",
        tmp: "*",
        typescript: "*",
      },
      peerDependenciesMeta: { typescript: { optional: !0 } },
      funding: { type: "opencollective", url: "https://opencollective.com/typescript-eslint" },
      typesVersions: { "<3.8": { "*": ["_ts3.4/*"] } },
      gitHead: "ce5f5165c9d4c5843c86d48b6e6e9a488eb06b0a",
    };
  }),
  pn = F(t => {
    "use strict";
    var S = t && t.__createBinding || (Object.create
        ? function(y, r, s, p) {
          p === void 0 && (p = s);
          var e = Object.getOwnPropertyDescriptor(r, s);
          (!e || ("get" in e ? !r.__esModule : e.writable || e.configurable))
          && (e = {
            enumerable: !0,
            get: function() {
              return r[s];
            },
          }), Object.defineProperty(y, p, e);
        }
        : function(y, r, s, p) {
          p === void 0 && (p = s), y[p] = r[s];
        }),
      x = t && t.__exportStar || function(y, r) {
        for (var s in y) s !== "default" && !Object.prototype.hasOwnProperty.call(r, s) && S(r, y, s);
      };
    Object.defineProperty(t, "__esModule", { value: !0 }),
      t.version =
        t.visitorKeys =
        t.typescriptVersionIsAtLeast =
        t.createProgram =
        t.simpleTraverse =
        t.parseWithNodeMaps =
        t.parseAndGenerateServices =
        t.parse =
          void 0;
    var o = Xe();
    Object.defineProperty(t, "parse", {
      enumerable: !0,
      get: function() {
        return o.parse;
      },
    }),
      Object.defineProperty(t, "parseAndGenerateServices", {
        enumerable: !0,
        get: function() {
          return o.parseAndGenerateServices;
        },
      }),
      Object.defineProperty(t, "parseWithNodeMaps", {
        enumerable: !0,
        get: function() {
          return o.parseWithNodeMaps;
        },
      });
    var f = Ie();
    Object.defineProperty(t, "simpleTraverse", {
      enumerable: !0,
      get: function() {
        return f.simpleTraverse;
      },
    }), x(oe(), t);
    var v = Le();
    Object.defineProperty(t, "createProgram", {
      enumerable: !0,
      get: function() {
        return v.createProgramFromConfigFile;
      },
    }), x(Ee(), t);
    var c = ie();
    Object.defineProperty(t, "typescriptVersionIsAtLeast", {
      enumerable: !0,
      get: function() {
        return c.typescriptVersionIsAtLeast;
      },
    }),
      x(ve(), t),
      x(cn(), t);
    var n = Ke();
    Object.defineProperty(t, "visitorKeys", {
      enumerable: !0,
      get: function() {
        return n.visitorKeys;
      },
    }), t.version = ln().version;
  }),
  qe = F((t, S) => {
    "use strict";
    var x = pn(), o = Or, f = wr;
    S.exports = (n, y = {}) => {
      if (n === void 0) throw new Error("src not given");
      if (n === "") return [];
      let r = { ...y, parser: x }, s = !!y.skipTypeImports;
      delete r.skipTypeImports;
      let p = !!y.mixedImports;
      delete r.mixedImports;
      let e = new o(r), a = [];
      return e.walk(n, l => {
        switch (l.type) {
          case "ImportExpression":
            !y.skipAsyncImports && l.source && l.source.value && a.push(l.source.value);
            break;
          case "ImportDeclaration":
            if (s && l.importKind === "type") break;
            l.source && l.source.value && a.push(l.source.value);
            break;
          case "ExportNamedDeclaration":
          case "ExportAllDeclaration":
            l.source && l.source.value && a.push(l.source.value);
            break;
          case "TSExternalModuleReference":
            l.expression && l.expression.value && a.push(l.expression.value);
            break;
          case "TSImportType":
            !s && l.parameter.type === "TSLiteralType" && a.push(l.parameter.literal.value);
            break;
          case "CallExpression":
            if (!p || !f.isRequire(l) || !l.arguments || !l.arguments.length) break;
            if (f.isPlainRequire(l)) {
              let u = v(l);
              u && a.push(u);
            } else f.isMainScopedRequire(l) && a.push(c(l));
            break;
          default:
        }
      }),
        a;
    }, S.exports.tsx = (n, y = {}) => S.exports(n, { ...y, jsx: !0 });
    function v(n) {
      if (n.arguments[0].type === "Literal" || n.arguments[0].type === "StringLiteral") return n.arguments[0].value;
      if (n.arguments[0].type === "TemplateLiteral") return n.arguments[0].quasis[0].value.raw;
    }
    function c(n) {
      return n.arguments[0].value;
    }
  }),
  Ue = {};
Lr(Ue, { default: () => yn, tsx: () => un });
var We = je(qe());
Rr(Ue, je(qe()));
var { tsx: un } = We, { default: we, ...dn } = We, yn = we !== void 0 ? we : dn;
export { un as tsx, yn as default };
