var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn3, res) => function __init() {
  return fn3 && (res = (0, fn3[Object.keys(fn3)[0]])(fn3 = 0)), res;
};
var __commonJS = (cb2, mod3) => function __require() {
  return mod3 || (0, cb2[Object.keys(cb2)[0]])((mod3 = { exports: {} }).exports, mod3), mod3.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// js/importScript.mjs
var importScript, importCss;
var init_importScript = __esm({
  "js/importScript.mjs"() {
    importScript = (src, res = []) => {
      return window.document.head.querySelector(`script[src="${src}"]`) || new Promise(function(resolve, reject) {
        const s = window.document.createElement("script");
        s.src = src;
        s.onload = () => {
          if (res.length === 0) {
            resolve(window);
          }
          const ret = {};
          res.forEach((x2) => Object.assign(ret, window[x2]));
          resolve(ret);
        };
        s.onerror = reject;
        window.document.head.appendChild(s);
      });
    };
    importCss = (src, cssId) => {
      if (!window.document.getElementById(cssId)) {
        const head = window.document.getElementsByTagName("head")[0];
        const link = window.document.createElement("link");
        link.id = cssId;
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = src;
        link.media = "all";
        head.appendChild(link);
      }
      return true;
    };
  }
});

// js/reactLoader.mjs
var reactLoader_exports = {};
__export(reactLoader_exports, {
  run: () => run
});
var run;
var init_reactLoader = __esm({
  "js/reactLoader.mjs"() {
    init_importScript();
    run = async ({ mode, code, room: room2 }) => {
      mode = mode || "window";
      window.process = { env: { NODE_ENV: "production" } };
      if (!window.React) {
        await Promise.all([
          importScript("https://unpkg.com/react@17.0.2/umd/react.production.min.js"),
          importScript("https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"),
          importScript("https://unpkg.com/react-is@17.0.2/umd/react-is.production.min.js")
        ]);
      }
    };
  }
});

// js/workers/getWorker.mjs
var getWorker;
var init_getWorker = __esm({
  "js/workers/getWorker.mjs"() {
    getWorker = (file) => {
      let workerSrc4;
      let forceNormalWorker4 = false;
      const { pathname } = window.location;
      if (pathname.indexOf("/ipfs/") !== -1) {
        const cid = pathname.slice(6, 52);
        forceNormalWorker4 = true;
        workerSrc4 = `/ipfs/${cid}/js/workers/${file}`;
      } else if (location.origin !== "https://code.spike.land") {
        forceNormalWorker4 = true;
        workerSrc4 = window.URL.createObjectURL(new Blob([
          `self.importScripts("https://code.spike.land/js/workers/${file}");`
        ]));
      } else {
        workerSrc4 = `https://code.spike.land/js/workers/${file}`;
      }
      return {
        workerSrc: workerSrc4,
        forceNormalWorker: forceNormalWorker4
      };
    };
  }
});

// js/babel.mjs
var babel_exports = {};
__export(babel_exports, {
  baberTransform: () => baberTransform
});
import { wrap } from "https://unpkg.com/comlink@4.3.1/dist/esm/comlink.mjs";
async function baberTransform(code) {
  if (transform === null) {
    await init();
    return baberTransform(code);
  }
  const transformed = await transform(code);
  return transformed;
}
async function init() {
  if (forceNormalWorker || typeof SharedWorker === "undefined") {
    const worker2 = new Worker(workerSrc);
    const { port1, port2 } = new MessageChannel();
    const msg = {
      comlinkInit: true,
      port: port1
    };
    worker2.postMessage(msg, [port1]);
    transform = await wrap(port2);
    return transform;
  }
  const worker = new SharedWorker(workerSrc);
  worker.port.start();
  transform = await wrap(worker.port);
  return transform;
}
var workerSrc, forceNormalWorker, transform;
var init_babel = __esm({
  "js/babel.mjs"() {
    init_getWorker();
    ({ workerSrc, forceNormalWorker } = getWorker("babel.worker.js"));
    transform = null;
  }
});

// js/formatter.mjs
var formatter_exports = {};
__export(formatter_exports, {
  formatter: () => formatter
});
import { wrap as wrap2 } from "https://unpkg.com/comlink@4.3.1/dist/esm/comlink.mjs";
async function formatter(code) {
  if (format === null) {
    if (loadWebWorkerCounter-- < 0) {
      setTimeout(init2);
    }
    try {
      const resp = await fetch("https://x-spike-land.zed-vision.workers.dev/api/prettier", {
        method: "POST",
        body: code
      });
      const formatted2 = await resp.text();
      return formatted2;
    } catch (e2) {
      format = await init2();
      const formatted2 = await format(code);
      return formatted2;
    }
  }
  const formatted = await format(code);
  return formatted;
}
async function init2() {
  if (format) {
    console.log("INIT INIT");
  }
  if (forceNormalWorker2 || typeof SharedWorker === "undefined") {
    const worker2 = new Worker(workerSrc2);
    const { port1, port2 } = new MessageChannel();
    const msg = {
      comlinkInit: true,
      port: port1
    };
    worker2.postMessage(msg, [port1]);
    format = await wrap2(port2);
    return format;
  }
  const worker = new SharedWorker(workerSrc2);
  worker.port.start();
  format = await wrap2(worker.port);
  return format;
}
var workerSrc2, forceNormalWorker2, format, loadWebWorkerCounter;
var init_formatter = __esm({
  "js/formatter.mjs"() {
    init_getWorker();
    ({ workerSrc: workerSrc2, forceNormalWorker: forceNormalWorker2 } = getWorker("prettierWorker.js"));
    format = null;
    loadWebWorkerCounter = 2;
  }
});

// ../ipfs/dist/ipfs.client.mjs
function At(r, e2, t) {
  e2 = e2 || [], t = t || 0;
  for (var n = t; r >= kn; )
    e2[t++] = r & 255 | Ct, r /= 128;
  for (; r & jn; )
    e2[t++] = r & 255 | Ct, r >>>= 7;
  return e2[t] = r | 0, At.bytes = t - n + 1, e2;
}
function qe(r, e2) {
  var t = 0, e2 = e2 || 0, n = 0, o = e2, i, s = r.length;
  do {
    if (o >= s)
      throw qe.bytes = 0, new RangeError("Could not decode varint");
    i = r[o++], t += n < 28 ? (i & Bt) << n : (i & Bt) * Math.pow(2, n), n += 7;
  } while (i >= _n);
  return qe.bytes = o - e2, t;
}
function Rn(r, e2) {
  if (r.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), n = 0; n < t.length; n++)
    t[n] = 255;
  for (var o = 0; o < r.length; o++) {
    var i = r.charAt(o), s = i.charCodeAt(0);
    if (t[s] !== 255)
      throw new TypeError(i + " is ambiguous");
    t[s] = o;
  }
  var f = r.length, a = r.charAt(0), c2 = Math.log(f) / Math.log(256), l = Math.log(256) / Math.log(f);
  function w3(y) {
    if (y instanceof Uint8Array || (ArrayBuffer.isView(y) ? y = new Uint8Array(y.buffer, y.byteOffset, y.byteLength) : Array.isArray(y) && (y = Uint8Array.from(y))), !(y instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (y.length === 0)
      return "";
    for (var E2 = 0, Z2 = 0, O3 = 0, I3 = y.length; O3 !== I3 && y[O3] === 0; )
      O3++, E2++;
    for (var L3 = (I3 - O3) * l + 1 >>> 0, T2 = new Uint8Array(L3); O3 !== I3; ) {
      for (var N3 = y[O3], J3 = 0, C2 = L3 - 1; (N3 !== 0 || J3 < Z2) && C2 !== -1; C2--, J3++)
        N3 += 256 * T2[C2] >>> 0, T2[C2] = N3 % f >>> 0, N3 = N3 / f >>> 0;
      if (N3 !== 0)
        throw new Error("Non-zero carry");
      Z2 = J3, O3++;
    }
    for (var R2 = L3 - Z2; R2 !== L3 && T2[R2] === 0; )
      R2++;
    for (var xe = a.repeat(E2); R2 < L3; ++R2)
      xe += r.charAt(T2[R2]);
    return xe;
  }
  function k3(y) {
    if (typeof y != "string")
      throw new TypeError("Expected String");
    if (y.length === 0)
      return new Uint8Array();
    var E2 = 0;
    if (y[E2] !== " ") {
      for (var Z2 = 0, O3 = 0; y[E2] === a; )
        Z2++, E2++;
      for (var I3 = (y.length - E2) * c2 + 1 >>> 0, L3 = new Uint8Array(I3); y[E2]; ) {
        var T2 = t[y.charCodeAt(E2)];
        if (T2 === 255)
          return;
        for (var N3 = 0, J3 = I3 - 1; (T2 !== 0 || N3 < O3) && J3 !== -1; J3--, N3++)
          T2 += f * L3[J3] >>> 0, L3[J3] = T2 % 256 >>> 0, T2 = T2 / 256 >>> 0;
        if (T2 !== 0)
          throw new Error("Non-zero carry");
        O3 = N3, E2++;
      }
      if (y[E2] !== " ") {
        for (var C2 = I3 - O3; C2 !== I3 && L3[C2] === 0; )
          C2++;
        for (var R2 = new Uint8Array(Z2 + (I3 - C2)), xe = Z2; C2 !== I3; )
          R2[xe++] = L3[C2++];
        return R2;
      }
    }
  }
  function dn2(y) {
    var E2 = k3(y);
    if (E2)
      return E2;
    throw new Error(`Non-${e2} character`);
  }
  return { encode: w3, decodeUnsafe: k3, decode: dn2 };
}
function Kr(r) {
  if (r != null)
    return typeof r == "number" ? r & 4095 : (r = r.toString(), r.substring(0, 1) === "0" ? parseInt(r, 8) & 4095 : parseInt(r, 10) & 4095);
}
function Yr(r) {
  if (r == null)
    return;
  let e2;
  if (r.secs != null && (e2 = { secs: r.secs, nsecs: r.nsecs }), r.Seconds != null && (e2 = { secs: r.Seconds, nsecs: r.FractionalNanoseconds }), Array.isArray(r) && (e2 = { secs: r[0], nsecs: r[1] }), r instanceof Date) {
    let t = r.getTime(), n = Math.floor(t / 1e3);
    e2 = { secs: n, nsecs: (t - n * 1e3) * 1e3 };
  }
  if (!!Object.prototype.hasOwnProperty.call(e2, "secs")) {
    if (e2 != null && e2.nsecs != null && (e2.nsecs < 0 || e2.nsecs > 999999999))
      throw (0, Zr.default)(new Error("mtime-nsecs must be within the range [0,999999999]"), "ERR_INVALID_MTIME_NSECS");
    return e2;
  }
}
function Bo(r) {
  return ArrayBuffer.isView(r) || r instanceof ArrayBuffer;
}
function No(r) {
  let e2 = 0;
  return new Promise((t, n) => r.forEach((o) => o.then(t).catch(() => {
    ++e2 === r.length && n();
  })));
}
function sn(r, e2) {
  e2 || (e2 = r.reduce((o, i) => o + i.length, 0));
  let t = new Uint8Array(e2), n = 0;
  for (let o of r)
    t.set(o, n), n += o.length;
  return t;
}
function ln(r, e2, t, n) {
  return { name: r, prefix: e2, encoder: { name: r, prefix: e2, encode: t }, decoder: { decode: n } };
}
function hn(r, e2 = "utf8") {
  let t = Le[e2];
  if (!t)
    throw new Error(`Unsupported encoding "${e2}"`);
  return t.decoder.decode(`${t.prefix}${r}`);
}
function pn(r, e2 = "utf8") {
  let t = Le[e2];
  if (!t)
    throw new Error(`Unsupported encoding "${e2}"`);
  return t.encoder.encode(r).substring(1);
}
async function ri(r, e2) {
  if (typeof window == "undefined")
    return;
  let t = typeof e2 == "number" ? e2 : 999;
  try {
    let { ipfsClient: n, ipfsCat: o } = globalThis;
    if (t === 0)
      throw new Error("No more retry");
    let s = (await n.add(r, { onlyHash: true })).cid.toString();
    await o(s, { timeout: 1500 });
    let f = r.slice(-8), a = await fetch(`https://code.spike.land/signal?signal=${f}&securityrandomparam=${Math.random() * 1e4}`).then((l) => l.text()), c2 = await fetch(`https://code.spike.land/ipfs/${a}`).then((l) => l.text());
    return () => ni(c2);
  } catch (n) {
    if (t > 1)
      return ri(r, t - 1);
  }
}
function ni(r) {
  try {
    return typeof r != "string" ? r : JSON.parse(r);
  } catch (e2) {
    return r;
  }
}
async function va(r, e2) {
  let { ipfsClient: t } = globalThis;
  if (Ne(`sending signal: ${r}`), e2) {
    Ne("sending data as well....");
    let o = typeof e2 != "string" ? JSON.stringify(e2) : e2;
    Ne(o);
    let i = (await t.add(o)).cid.toString(), { pathname: s } = new URL(r);
    await fetch(`https://code.spike.land/signal/?cid=${i}&signal=${s.slice(1)}`), fetch(`https://code.spike.land/ipfs/${i}`);
  }
  let { path: n } = await t.add(r);
  return Ne(`signal sent --- ${n}`), { success: true };
}
var yn, Se, mn, bn, gn, wn, kt, m, A, xn, re, _t, Zt, We, tr, ir, ar, dr, yr, br, wr, Sr, Q, rt, Cr, it, Ur, Rr, Vr, Jr, Gr, Xr, tn, ti, Ot, ne, En, Me, Fe, Ue, H, Pe, Re, q, vn, Ct, Dn, jn, kn, Tn, _n, Bt, On, Cn, An, Bn, zn, In, Ln, Nn, Mn, Fn, Un, Pn, ue, he, oe, ie, gi, zt, V, It, Lt, ve, Mt, Ft, pe, Ve, qn, Vn, Ut, Pt, Rt, qt, Vt, $t, je, W, $n, Jn, b, M, Hn, $e, se, Wn, Gn, Qn, Xn, Zn, Kn, Yn, eo, d, to, ro, no, de, oo, Jt, Ht, ke, Te, io, so, ao, j, v, Wt, K, co, Gt, Qt, Je, ae, fo, _e, F, lo, He, uo, ze, Zr, $, fe, at, h, S, Do, hs, ps, ds, ys, rn, nn, te, on, To, _o, Oo, Co, le, ct, ft, Ao, lt, ut, ht, pt, dt, Ie, zo, Io, ge, Lo, yt, Mo, mt, Fo, bt, Uo, gt, Po, wt, Ro, qo, xt, Vo, $o, St, Jo, Ho, Wo, Go, Et, we, an, fn, Qo, Xo, vt, Zo, Xs, Zs, Dt, ta, un, jt, ei, Le, Ne, export_all;
var init_ipfs_client = __esm({
  "../ipfs/dist/ipfs.client.mjs"() {
    yn = Object.create;
    Se = Object.defineProperty;
    mn = Object.getOwnPropertyDescriptor;
    bn = Object.getOwnPropertyNames;
    gn = Object.getPrototypeOf, wn = Object.prototype.hasOwnProperty;
    kt = (r) => Se(r, "__esModule", { value: true });
    m = (r, e2) => () => (e2 || r((e2 = { exports: {} }).exports, e2), e2.exports), A = (r, e2) => {
      kt(r);
      for (var t in e2)
        Se(r, t, { get: e2[t], enumerable: true });
    }, xn = (r, e2, t) => {
      if (e2 && typeof e2 == "object" || typeof e2 == "function")
        for (let n of bn(e2))
          !wn.call(r, n) && n !== "default" && Se(r, n, { get: () => e2[n], enumerable: !(t = mn(e2, n)) || t.enumerable });
      return r;
    }, re = (r) => xn(kt(Se(r != null ? yn(gn(r)) : {}, "default", r && r.__esModule && "default" in r ? { get: () => r.default, enumerable: true } : { value: r, enumerable: true })), r);
    _t = m((ii2, Tt) => {
      "use strict";
      var Sn2 = async (r) => {
        let e2 = [];
        for await (let t of r)
          e2.push(t);
        return e2;
      };
      Tt.exports = Sn2;
    });
    Zt = m((Wi, Xt) => {
      "use strict";
      async function* ho2(r, e2 = {}) {
        let t = r.getReader();
        try {
          for (; ; ) {
            let n = await t.read();
            if (n.done)
              return;
            yield n.value;
          }
        } finally {
          e2.preventCancel !== true && t.cancel(), t.releaseLock();
        }
      }
      Xt.exports = ho2;
    });
    We = m((Gi, Yt) => {
      "use strict";
      function Kt2(r, e2) {
        for (let t in e2)
          Object.defineProperty(r, t, { value: e2[t], enumerable: true, configurable: true });
        return r;
      }
      function po2(r, e2, t) {
        if (!r || typeof r == "string")
          throw new TypeError("Please pass an Error to err-code");
        t || (t = {}), typeof e2 == "object" && (t = e2, e2 = ""), e2 && (t.code = e2);
        try {
          return Kt2(r, t);
        } catch (n) {
          t.message = r.message, t.stack = r.stack;
          let o = function() {
          };
          return o.prototype = Object.create(Object.getPrototypeOf(r)), Kt2(new o(), t);
        }
      }
      Yt.exports = po2;
    });
    tr = m((Qi, er) => {
      "use strict";
      er.exports = yo2;
      function yo2(r, e2) {
        for (var t = new Array(arguments.length - 1), n = 0, o = 2, i = true; o < arguments.length; )
          t[n++] = arguments[o++];
        return new Promise(function(f, a) {
          t[n] = function(l) {
            if (i)
              if (i = false, l)
                a(l);
              else {
                for (var w3 = new Array(arguments.length - 1), k3 = 0; k3 < w3.length; )
                  w3[k3++] = arguments[k3];
                f.apply(null, w3);
              }
          };
          try {
            r.apply(e2 || null, t);
          } catch (c2) {
            i && (i = false, a(c2));
          }
        });
      }
    });
    ir = m((or) => {
      "use strict";
      var Oe3 = or;
      Oe3.length = function(e2) {
        var t = e2.length;
        if (!t)
          return 0;
        for (var n = 0; --t % 4 > 1 && e2.charAt(t) === "="; )
          ++n;
        return Math.ceil(e2.length * 3) / 4 - n;
      };
      var ce3 = new Array(64), rr = new Array(123);
      for (B2 = 0; B2 < 64; )
        rr[ce3[B2] = B2 < 26 ? B2 + 65 : B2 < 52 ? B2 + 71 : B2 < 62 ? B2 - 4 : B2 - 59 | 43] = B2++;
      var B2;
      Oe3.encode = function(e2, t, n) {
        for (var o = null, i = [], s = 0, f = 0, a; t < n; ) {
          var c2 = e2[t++];
          switch (f) {
            case 0:
              i[s++] = ce3[c2 >> 2], a = (c2 & 3) << 4, f = 1;
              break;
            case 1:
              i[s++] = ce3[a | c2 >> 4], a = (c2 & 15) << 2, f = 2;
              break;
            case 2:
              i[s++] = ce3[a | c2 >> 6], i[s++] = ce3[c2 & 63], f = 0;
              break;
          }
          s > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, i)), s = 0);
        }
        return f && (i[s++] = ce3[a], i[s++] = 61, f === 1 && (i[s++] = 61)), o ? (s && o.push(String.fromCharCode.apply(String, i.slice(0, s))), o.join("")) : String.fromCharCode.apply(String, i.slice(0, s));
      };
      var nr = "invalid encoding";
      Oe3.decode = function(e2, t, n) {
        for (var o = n, i = 0, s, f = 0; f < e2.length; ) {
          var a = e2.charCodeAt(f++);
          if (a === 61 && i > 1)
            break;
          if ((a = rr[a]) === void 0)
            throw Error(nr);
          switch (i) {
            case 0:
              s = a, i = 1;
              break;
            case 1:
              t[n++] = s << 2 | (a & 48) >> 4, s = a, i = 2;
              break;
            case 2:
              t[n++] = (s & 15) << 4 | (a & 60) >> 2, s = a, i = 3;
              break;
            case 3:
              t[n++] = (s & 3) << 6 | a, i = 0;
              break;
          }
        }
        if (i === 1)
          throw Error(nr);
        return n - o;
      };
      Oe3.test = function(e2) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e2);
      };
    });
    ar = m((Zi, sr2) => {
      "use strict";
      sr2.exports = Ce;
      function Ce() {
        this._listeners = {};
      }
      Ce.prototype.on = function(e2, t, n) {
        return (this._listeners[e2] || (this._listeners[e2] = [])).push({ fn: t, ctx: n || this }), this;
      };
      Ce.prototype.off = function(e2, t) {
        if (e2 === void 0)
          this._listeners = {};
        else if (t === void 0)
          this._listeners[e2] = [];
        else
          for (var n = this._listeners[e2], o = 0; o < n.length; )
            n[o].fn === t ? n.splice(o, 1) : ++o;
        return this;
      };
      Ce.prototype.emit = function(e2) {
        var t = this._listeners[e2];
        if (t) {
          for (var n = [], o = 1; o < arguments.length; )
            n.push(arguments[o++]);
          for (o = 0; o < t.length; )
            t[o].fn.apply(t[o++].ctx, n);
        }
        return this;
      };
    });
    dr = m((Ki, pr2) => {
      "use strict";
      pr2.exports = cr2(cr2);
      function cr2(r) {
        return typeof Float32Array != "undefined" ? function() {
          var e2 = new Float32Array([-0]), t = new Uint8Array(e2.buffer), n = t[3] === 128;
          function o(a, c2, l) {
            e2[0] = a, c2[l] = t[0], c2[l + 1] = t[1], c2[l + 2] = t[2], c2[l + 3] = t[3];
          }
          function i(a, c2, l) {
            e2[0] = a, c2[l] = t[3], c2[l + 1] = t[2], c2[l + 2] = t[1], c2[l + 3] = t[0];
          }
          r.writeFloatLE = n ? o : i, r.writeFloatBE = n ? i : o;
          function s(a, c2) {
            return t[0] = a[c2], t[1] = a[c2 + 1], t[2] = a[c2 + 2], t[3] = a[c2 + 3], e2[0];
          }
          function f(a, c2) {
            return t[3] = a[c2], t[2] = a[c2 + 1], t[1] = a[c2 + 2], t[0] = a[c2 + 3], e2[0];
          }
          r.readFloatLE = n ? s : f, r.readFloatBE = n ? f : s;
        }() : function() {
          function e2(n, o, i, s) {
            var f = o < 0 ? 1 : 0;
            if (f && (o = -o), o === 0)
              n(1 / o > 0 ? 0 : 2147483648, i, s);
            else if (isNaN(o))
              n(2143289344, i, s);
            else if (o > 34028234663852886e22)
              n((f << 31 | 2139095040) >>> 0, i, s);
            else if (o < 11754943508222875e-54)
              n((f << 31 | Math.round(o / 1401298464324817e-60)) >>> 0, i, s);
            else {
              var a = Math.floor(Math.log(o) / Math.LN2), c2 = Math.round(o * Math.pow(2, -a) * 8388608) & 8388607;
              n((f << 31 | a + 127 << 23 | c2) >>> 0, i, s);
            }
          }
          r.writeFloatLE = e2.bind(null, fr2), r.writeFloatBE = e2.bind(null, lr);
          function t(n, o, i) {
            var s = n(o, i), f = (s >> 31) * 2 + 1, a = s >>> 23 & 255, c2 = s & 8388607;
            return a === 255 ? c2 ? NaN : f * (1 / 0) : a === 0 ? f * 1401298464324817e-60 * c2 : f * Math.pow(2, a - 150) * (c2 + 8388608);
          }
          r.readFloatLE = t.bind(null, ur2), r.readFloatBE = t.bind(null, hr2);
        }(), typeof Float64Array != "undefined" ? function() {
          var e2 = new Float64Array([-0]), t = new Uint8Array(e2.buffer), n = t[7] === 128;
          function o(a, c2, l) {
            e2[0] = a, c2[l] = t[0], c2[l + 1] = t[1], c2[l + 2] = t[2], c2[l + 3] = t[3], c2[l + 4] = t[4], c2[l + 5] = t[5], c2[l + 6] = t[6], c2[l + 7] = t[7];
          }
          function i(a, c2, l) {
            e2[0] = a, c2[l] = t[7], c2[l + 1] = t[6], c2[l + 2] = t[5], c2[l + 3] = t[4], c2[l + 4] = t[3], c2[l + 5] = t[2], c2[l + 6] = t[1], c2[l + 7] = t[0];
          }
          r.writeDoubleLE = n ? o : i, r.writeDoubleBE = n ? i : o;
          function s(a, c2) {
            return t[0] = a[c2], t[1] = a[c2 + 1], t[2] = a[c2 + 2], t[3] = a[c2 + 3], t[4] = a[c2 + 4], t[5] = a[c2 + 5], t[6] = a[c2 + 6], t[7] = a[c2 + 7], e2[0];
          }
          function f(a, c2) {
            return t[7] = a[c2], t[6] = a[c2 + 1], t[5] = a[c2 + 2], t[4] = a[c2 + 3], t[3] = a[c2 + 4], t[2] = a[c2 + 5], t[1] = a[c2 + 6], t[0] = a[c2 + 7], e2[0];
          }
          r.readDoubleLE = n ? s : f, r.readDoubleBE = n ? f : s;
        }() : function() {
          function e2(n, o, i, s, f, a) {
            var c2 = s < 0 ? 1 : 0;
            if (c2 && (s = -s), s === 0)
              n(0, f, a + o), n(1 / s > 0 ? 0 : 2147483648, f, a + i);
            else if (isNaN(s))
              n(0, f, a + o), n(2146959360, f, a + i);
            else if (s > 17976931348623157e292)
              n(0, f, a + o), n((c2 << 31 | 2146435072) >>> 0, f, a + i);
            else {
              var l;
              if (s < 22250738585072014e-324)
                l = s / 5e-324, n(l >>> 0, f, a + o), n((c2 << 31 | l / 4294967296) >>> 0, f, a + i);
              else {
                var w3 = Math.floor(Math.log(s) / Math.LN2);
                w3 === 1024 && (w3 = 1023), l = s * Math.pow(2, -w3), n(l * 4503599627370496 >>> 0, f, a + o), n((c2 << 31 | w3 + 1023 << 20 | l * 1048576 & 1048575) >>> 0, f, a + i);
              }
            }
          }
          r.writeDoubleLE = e2.bind(null, fr2, 0, 4), r.writeDoubleBE = e2.bind(null, lr, 4, 0);
          function t(n, o, i, s, f) {
            var a = n(s, f + o), c2 = n(s, f + i), l = (c2 >> 31) * 2 + 1, w3 = c2 >>> 20 & 2047, k3 = 4294967296 * (c2 & 1048575) + a;
            return w3 === 2047 ? k3 ? NaN : l * (1 / 0) : w3 === 0 ? l * 5e-324 * k3 : l * Math.pow(2, w3 - 1075) * (k3 + 4503599627370496);
          }
          r.readDoubleLE = t.bind(null, ur2, 0, 4), r.readDoubleBE = t.bind(null, hr2, 4, 0);
        }(), r;
      }
      function fr2(r, e2, t) {
        e2[t] = r & 255, e2[t + 1] = r >>> 8 & 255, e2[t + 2] = r >>> 16 & 255, e2[t + 3] = r >>> 24;
      }
      function lr(r, e2, t) {
        e2[t] = r >>> 24, e2[t + 1] = r >>> 16 & 255, e2[t + 2] = r >>> 8 & 255, e2[t + 3] = r & 255;
      }
      function ur2(r, e2) {
        return (r[e2] | r[e2 + 1] << 8 | r[e2 + 2] << 16 | r[e2 + 3] << 24) >>> 0;
      }
      function hr2(r, e2) {
        return (r[e2] << 24 | r[e2 + 1] << 16 | r[e2 + 2] << 8 | r[e2 + 3]) >>> 0;
      }
    });
    yr = m((exports, module) => {
      "use strict";
      module.exports = inquire;
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length))
            return mod;
        } catch (r) {
        }
        return null;
      }
    });
    br = m((mr2) => {
      "use strict";
      var Ge2 = mr2;
      Ge2.length = function(e2) {
        for (var t = 0, n = 0, o = 0; o < e2.length; ++o)
          n = e2.charCodeAt(o), n < 128 ? t += 1 : n < 2048 ? t += 2 : (n & 64512) == 55296 && (e2.charCodeAt(o + 1) & 64512) == 56320 ? (++o, t += 4) : t += 3;
        return t;
      };
      Ge2.read = function(e2, t, n) {
        var o = n - t;
        if (o < 1)
          return "";
        for (var i = null, s = [], f = 0, a; t < n; )
          a = e2[t++], a < 128 ? s[f++] = a : a > 191 && a < 224 ? s[f++] = (a & 31) << 6 | e2[t++] & 63 : a > 239 && a < 365 ? (a = ((a & 7) << 18 | (e2[t++] & 63) << 12 | (e2[t++] & 63) << 6 | e2[t++] & 63) - 65536, s[f++] = 55296 + (a >> 10), s[f++] = 56320 + (a & 1023)) : s[f++] = (a & 15) << 12 | (e2[t++] & 63) << 6 | e2[t++] & 63, f > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, s)), f = 0);
        return i ? (f && i.push(String.fromCharCode.apply(String, s.slice(0, f))), i.join("")) : String.fromCharCode.apply(String, s.slice(0, f));
      };
      Ge2.write = function(e2, t, n) {
        for (var o = n, i, s, f = 0; f < e2.length; ++f)
          i = e2.charCodeAt(f), i < 128 ? t[n++] = i : i < 2048 ? (t[n++] = i >> 6 | 192, t[n++] = i & 63 | 128) : (i & 64512) == 55296 && ((s = e2.charCodeAt(f + 1)) & 64512) == 56320 ? (i = 65536 + ((i & 1023) << 10) + (s & 1023), ++f, t[n++] = i >> 18 | 240, t[n++] = i >> 12 & 63 | 128, t[n++] = i >> 6 & 63 | 128, t[n++] = i & 63 | 128) : (t[n++] = i >> 12 | 224, t[n++] = i >> 6 & 63 | 128, t[n++] = i & 63 | 128);
        return n - o;
      };
    });
    wr = m((es, gr2) => {
      "use strict";
      gr2.exports = mo2;
      function mo2(r, e2, t) {
        var n = t || 8192, o = n >>> 1, i = null, s = n;
        return function(a) {
          if (a < 1 || a > o)
            return r(a);
          s + a > n && (i = r(n), s = 0);
          var c2 = e2.call(i, s, s += a);
          return s & 7 && (s = (s | 7) + 1), c2;
        };
      }
    });
    Sr = m((ts2, xr2) => {
      "use strict";
      xr2.exports = x2;
      var ye2 = Q();
      function x2(r, e2) {
        this.lo = r >>> 0, this.hi = e2 >>> 0;
      }
      var Y3 = x2.zero = new x2(0, 0);
      Y3.toNumber = function() {
        return 0;
      };
      Y3.zzEncode = Y3.zzDecode = function() {
        return this;
      };
      Y3.length = function() {
        return 1;
      };
      var bo2 = x2.zeroHash = "\0\0\0\0\0\0\0\0";
      x2.fromNumber = function(e2) {
        if (e2 === 0)
          return Y3;
        var t = e2 < 0;
        t && (e2 = -e2);
        var n = e2 >>> 0, o = (e2 - n) / 4294967296 >>> 0;
        return t && (o = ~o >>> 0, n = ~n >>> 0, ++n > 4294967295 && (n = 0, ++o > 4294967295 && (o = 0))), new x2(n, o);
      };
      x2.from = function(e2) {
        if (typeof e2 == "number")
          return x2.fromNumber(e2);
        if (ye2.isString(e2))
          if (ye2.Long)
            e2 = ye2.Long.fromString(e2);
          else
            return x2.fromNumber(parseInt(e2, 10));
        return e2.low || e2.high ? new x2(e2.low >>> 0, e2.high >>> 0) : Y3;
      };
      x2.prototype.toNumber = function(e2) {
        if (!e2 && this.hi >>> 31) {
          var t = ~this.lo + 1 >>> 0, n = ~this.hi >>> 0;
          return t || (n = n + 1 >>> 0), -(t + n * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
      };
      x2.prototype.toLong = function(e2) {
        return ye2.Long ? new ye2.Long(this.lo | 0, this.hi | 0, Boolean(e2)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(e2) };
      };
      var G2 = String.prototype.charCodeAt;
      x2.fromHash = function(e2) {
        return e2 === bo2 ? Y3 : new x2((G2.call(e2, 0) | G2.call(e2, 1) << 8 | G2.call(e2, 2) << 16 | G2.call(e2, 3) << 24) >>> 0, (G2.call(e2, 4) | G2.call(e2, 5) << 8 | G2.call(e2, 6) << 16 | G2.call(e2, 7) << 24) >>> 0);
      };
      x2.prototype.toHash = function() {
        return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
      };
      x2.prototype.zzEncode = function() {
        var e2 = this.hi >> 31;
        return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e2) >>> 0, this.lo = (this.lo << 1 ^ e2) >>> 0, this;
      };
      x2.prototype.zzDecode = function() {
        var e2 = -(this.lo & 1);
        return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e2) >>> 0, this.hi = (this.hi >>> 1 ^ e2) >>> 0, this;
      };
      x2.prototype.length = function() {
        var e2 = this.lo, t = (this.lo >>> 28 | this.hi << 4) >>> 0, n = this.hi >>> 24;
        return n === 0 ? t === 0 ? e2 < 16384 ? e2 < 128 ? 1 : 2 : e2 < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : n < 128 ? 9 : 10;
      };
    });
    Q = m((Qe2) => {
      "use strict";
      var u = Qe2;
      u.asPromise = tr();
      u.base64 = ir();
      u.EventEmitter = ar();
      u.float = dr();
      u.inquire = yr();
      u.utf8 = br();
      u.pool = wr();
      u.LongBits = Sr();
      u.isNode = Boolean(typeof global != "undefined" && global && global.process && global.process.versions && global.process.versions.node);
      u.global = u.isNode && global || typeof window != "undefined" && window || typeof self != "undefined" && self || Qe2;
      u.emptyArray = Object.freeze ? Object.freeze([]) : [];
      u.emptyObject = Object.freeze ? Object.freeze({}) : {};
      u.isInteger = Number.isInteger || function(e2) {
        return typeof e2 == "number" && isFinite(e2) && Math.floor(e2) === e2;
      };
      u.isString = function(e2) {
        return typeof e2 == "string" || e2 instanceof String;
      };
      u.isObject = function(e2) {
        return e2 && typeof e2 == "object";
      };
      u.isset = u.isSet = function(e2, t) {
        var n = e2[t];
        return n != null && e2.hasOwnProperty(t) ? typeof n != "object" || (Array.isArray(n) ? n.length : Object.keys(n).length) > 0 : false;
      };
      u.Buffer = function() {
        try {
          var r = u.inquire("buffer").Buffer;
          return r.prototype.utf8Write ? r : null;
        } catch (e2) {
          return null;
        }
      }();
      u._Buffer_from = null;
      u._Buffer_allocUnsafe = null;
      u.newBuffer = function(e2) {
        return typeof e2 == "number" ? u.Buffer ? u._Buffer_allocUnsafe(e2) : new u.Array(e2) : u.Buffer ? u._Buffer_from(e2) : typeof Uint8Array == "undefined" ? e2 : new Uint8Array(e2);
      };
      u.Array = typeof Uint8Array != "undefined" ? Uint8Array : Array;
      u.Long = u.global.dcodeIO && u.global.dcodeIO.Long || u.global.Long || u.inquire("long");
      u.key2Re = /^true|false|0|1$/;
      u.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      u.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      u.longToHash = function(e2) {
        return e2 ? u.LongBits.from(e2).toHash() : u.LongBits.zeroHash;
      };
      u.longFromHash = function(e2, t) {
        var n = u.LongBits.fromHash(e2);
        return u.Long ? u.Long.fromBits(n.lo, n.hi, t) : n.toNumber(Boolean(t));
      };
      function Er2(r, e2, t) {
        for (var n = Object.keys(e2), o = 0; o < n.length; ++o)
          (r[n[o]] === void 0 || !t) && (r[n[o]] = e2[n[o]]);
        return r;
      }
      u.merge = Er2;
      u.lcFirst = function(e2) {
        return e2.charAt(0).toLowerCase() + e2.substring(1);
      };
      function vr2(r) {
        function e2(t, n) {
          if (!(this instanceof e2))
            return new e2(t, n);
          Object.defineProperty(this, "message", { get: function() {
            return t;
          } }), Error.captureStackTrace ? Error.captureStackTrace(this, e2) : Object.defineProperty(this, "stack", { value: new Error().stack || "" }), n && Er2(this, n);
        }
        return (e2.prototype = Object.create(Error.prototype)).constructor = e2, Object.defineProperty(e2.prototype, "name", { get: function() {
          return r;
        } }), e2.prototype.toString = function() {
          return this.name + ": " + this.message;
        }, e2;
      }
      u.newError = vr2;
      u.ProtocolError = vr2("ProtocolError");
      u.oneOfGetter = function(e2) {
        for (var t = {}, n = 0; n < e2.length; ++n)
          t[e2[n]] = 1;
        return function() {
          for (var o = Object.keys(this), i = o.length - 1; i > -1; --i)
            if (t[o[i]] === 1 && this[o[i]] !== void 0 && this[o[i]] !== null)
              return o[i];
        };
      };
      u.oneOfSetter = function(e2) {
        return function(t) {
          for (var n = 0; n < e2.length; ++n)
            e2[n] !== t && delete this[e2[n]];
        };
      };
      u.toJSONOptions = { longs: String, enums: String, bytes: String, json: true };
      u._configure = function() {
        var r = u.Buffer;
        if (!r) {
          u._Buffer_from = u._Buffer_allocUnsafe = null;
          return;
        }
        u._Buffer_from = r.from !== Uint8Array.from && r.from || function(t, n) {
          return new r(t, n);
        }, u._Buffer_allocUnsafe = r.allocUnsafe || function(t) {
          return new r(t);
        };
      };
    });
    rt = m((ns, Tr2) => {
      "use strict";
      Tr2.exports = p;
      var _2 = Q(), Xe2, Ae2 = _2.LongBits, Dr = _2.base64, jr = _2.utf8;
      function me2(r, e2, t) {
        this.fn = r, this.len = e2, this.next = void 0, this.val = t;
      }
      function Ze2() {
      }
      function go2(r) {
        this.head = r.head, this.tail = r.tail, this.len = r.len, this.next = r.states;
      }
      function p() {
        this.len = 0, this.head = new me2(Ze2, 0, 0), this.tail = this.head, this.states = null;
      }
      var kr2 = function() {
        return _2.Buffer ? function() {
          return (p.create = function() {
            return new Xe2();
          })();
        } : function() {
          return new p();
        };
      };
      p.create = kr2();
      p.alloc = function(e2) {
        return new _2.Array(e2);
      };
      _2.Array !== Array && (p.alloc = _2.pool(p.alloc, _2.Array.prototype.subarray));
      p.prototype._push = function(e2, t, n) {
        return this.tail = this.tail.next = new me2(e2, t, n), this.len += t, this;
      };
      function Ke2(r, e2, t) {
        e2[t] = r & 255;
      }
      function wo2(r, e2, t) {
        for (; r > 127; )
          e2[t++] = r & 127 | 128, r >>>= 7;
        e2[t] = r;
      }
      function Ye2(r, e2) {
        this.len = r, this.next = void 0, this.val = e2;
      }
      Ye2.prototype = Object.create(me2.prototype);
      Ye2.prototype.fn = wo2;
      p.prototype.uint32 = function(e2) {
        return this.len += (this.tail = this.tail.next = new Ye2((e2 = e2 >>> 0) < 128 ? 1 : e2 < 16384 ? 2 : e2 < 2097152 ? 3 : e2 < 268435456 ? 4 : 5, e2)).len, this;
      };
      p.prototype.int32 = function(e2) {
        return e2 < 0 ? this._push(et2, 10, Ae2.fromNumber(e2)) : this.uint32(e2);
      };
      p.prototype.sint32 = function(e2) {
        return this.uint32((e2 << 1 ^ e2 >> 31) >>> 0);
      };
      function et2(r, e2, t) {
        for (; r.hi; )
          e2[t++] = r.lo & 127 | 128, r.lo = (r.lo >>> 7 | r.hi << 25) >>> 0, r.hi >>>= 7;
        for (; r.lo > 127; )
          e2[t++] = r.lo & 127 | 128, r.lo = r.lo >>> 7;
        e2[t++] = r.lo;
      }
      p.prototype.uint64 = function(e2) {
        var t = Ae2.from(e2);
        return this._push(et2, t.length(), t);
      };
      p.prototype.int64 = p.prototype.uint64;
      p.prototype.sint64 = function(e2) {
        var t = Ae2.from(e2).zzEncode();
        return this._push(et2, t.length(), t);
      };
      p.prototype.bool = function(e2) {
        return this._push(Ke2, 1, e2 ? 1 : 0);
      };
      function tt2(r, e2, t) {
        e2[t] = r & 255, e2[t + 1] = r >>> 8 & 255, e2[t + 2] = r >>> 16 & 255, e2[t + 3] = r >>> 24;
      }
      p.prototype.fixed32 = function(e2) {
        return this._push(tt2, 4, e2 >>> 0);
      };
      p.prototype.sfixed32 = p.prototype.fixed32;
      p.prototype.fixed64 = function(e2) {
        var t = Ae2.from(e2);
        return this._push(tt2, 4, t.lo)._push(tt2, 4, t.hi);
      };
      p.prototype.sfixed64 = p.prototype.fixed64;
      p.prototype.float = function(e2) {
        return this._push(_2.float.writeFloatLE, 4, e2);
      };
      p.prototype.double = function(e2) {
        return this._push(_2.float.writeDoubleLE, 8, e2);
      };
      var xo2 = _2.Array.prototype.set ? function(e2, t, n) {
        t.set(e2, n);
      } : function(e2, t, n) {
        for (var o = 0; o < e2.length; ++o)
          t[n + o] = e2[o];
      };
      p.prototype.bytes = function(e2) {
        var t = e2.length >>> 0;
        if (!t)
          return this._push(Ke2, 1, 0);
        if (_2.isString(e2)) {
          var n = p.alloc(t = Dr.length(e2));
          Dr.decode(e2, n, 0), e2 = n;
        }
        return this.uint32(t)._push(xo2, t, e2);
      };
      p.prototype.string = function(e2) {
        var t = jr.length(e2);
        return t ? this.uint32(t)._push(jr.write, t, e2) : this._push(Ke2, 1, 0);
      };
      p.prototype.fork = function() {
        return this.states = new go2(this), this.head = this.tail = new me2(Ze2, 0, 0), this.len = 0, this;
      };
      p.prototype.reset = function() {
        return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new me2(Ze2, 0, 0), this.len = 0), this;
      };
      p.prototype.ldelim = function() {
        var e2 = this.head, t = this.tail, n = this.len;
        return this.reset().uint32(n), n && (this.tail.next = e2.next, this.tail = t, this.len += n), this;
      };
      p.prototype.finish = function() {
        for (var e2 = this.head.next, t = this.constructor.alloc(this.len), n = 0; e2; )
          e2.fn(e2.val, t, n), n += e2.len, e2 = e2.next;
        return t;
      };
      p._configure = function(r) {
        Xe2 = r, p.create = kr2(), Xe2._configure();
      };
    });
    Cr = m((os, Or2) => {
      "use strict";
      Or2.exports = U3;
      var _r2 = rt();
      (U3.prototype = Object.create(_r2.prototype)).constructor = U3;
      var X3 = Q();
      function U3() {
        _r2.call(this);
      }
      U3._configure = function() {
        U3.alloc = X3._Buffer_allocUnsafe, U3.writeBytesBuffer = X3.Buffer && X3.Buffer.prototype instanceof Uint8Array && X3.Buffer.prototype.set.name === "set" ? function(e2, t, n) {
          t.set(e2, n);
        } : function(e2, t, n) {
          if (e2.copy)
            e2.copy(t, n, 0, e2.length);
          else
            for (var o = 0; o < e2.length; )
              t[n++] = e2[o++];
        };
      };
      U3.prototype.bytes = function(e2) {
        X3.isString(e2) && (e2 = X3._Buffer_from(e2, "base64"));
        var t = e2.length >>> 0;
        return this.uint32(t), t && this._push(U3.writeBytesBuffer, t, e2), this;
      };
      function So2(r, e2, t) {
        r.length < 40 ? X3.utf8.write(r, e2, t) : e2.utf8Write ? e2.utf8Write(r, t) : e2.write(r, t);
      }
      U3.prototype.string = function(e2) {
        var t = X3.Buffer.byteLength(e2);
        return this.uint32(t), t && this._push(So2, t, e2), this;
      };
      U3._configure();
    });
    it = m((is2, Lr2) => {
      "use strict";
      Lr2.exports = g2;
      var P2 = Q(), nt2, Ar = P2.LongBits, Eo2 = P2.utf8;
      function z3(r, e2) {
        return RangeError("index out of range: " + r.pos + " + " + (e2 || 1) + " > " + r.len);
      }
      function g2(r) {
        this.buf = r, this.pos = 0, this.len = r.length;
      }
      var Br2 = typeof Uint8Array != "undefined" ? function(e2) {
        if (e2 instanceof Uint8Array || Array.isArray(e2))
          return new g2(e2);
        throw Error("illegal buffer");
      } : function(e2) {
        if (Array.isArray(e2))
          return new g2(e2);
        throw Error("illegal buffer");
      }, zr2 = function() {
        return P2.Buffer ? function(t) {
          return (g2.create = function(o) {
            return P2.Buffer.isBuffer(o) ? new nt2(o) : Br2(o);
          })(t);
        } : Br2;
      };
      g2.create = zr2();
      g2.prototype._slice = P2.Array.prototype.subarray || P2.Array.prototype.slice;
      g2.prototype.uint32 = function() {
        var e2 = 4294967295;
        return function() {
          if (e2 = (this.buf[this.pos] & 127) >>> 0, this.buf[this.pos++] < 128 || (e2 = (e2 | (this.buf[this.pos] & 127) << 7) >>> 0, this.buf[this.pos++] < 128) || (e2 = (e2 | (this.buf[this.pos] & 127) << 14) >>> 0, this.buf[this.pos++] < 128) || (e2 = (e2 | (this.buf[this.pos] & 127) << 21) >>> 0, this.buf[this.pos++] < 128) || (e2 = (e2 | (this.buf[this.pos] & 15) << 28) >>> 0, this.buf[this.pos++] < 128))
            return e2;
          if ((this.pos += 5) > this.len)
            throw this.pos = this.len, z3(this, 10);
          return e2;
        };
      }();
      g2.prototype.int32 = function() {
        return this.uint32() | 0;
      };
      g2.prototype.sint32 = function() {
        var e2 = this.uint32();
        return e2 >>> 1 ^ -(e2 & 1) | 0;
      };
      function ot2() {
        var r = new Ar(0, 0), e2 = 0;
        if (this.len - this.pos > 4) {
          for (; e2 < 4; ++e2)
            if (r.lo = (r.lo | (this.buf[this.pos] & 127) << e2 * 7) >>> 0, this.buf[this.pos++] < 128)
              return r;
          if (r.lo = (r.lo | (this.buf[this.pos] & 127) << 28) >>> 0, r.hi = (r.hi | (this.buf[this.pos] & 127) >> 4) >>> 0, this.buf[this.pos++] < 128)
            return r;
          e2 = 0;
        } else {
          for (; e2 < 3; ++e2) {
            if (this.pos >= this.len)
              throw z3(this);
            if (r.lo = (r.lo | (this.buf[this.pos] & 127) << e2 * 7) >>> 0, this.buf[this.pos++] < 128)
              return r;
          }
          return r.lo = (r.lo | (this.buf[this.pos++] & 127) << e2 * 7) >>> 0, r;
        }
        if (this.len - this.pos > 4) {
          for (; e2 < 5; ++e2)
            if (r.hi = (r.hi | (this.buf[this.pos] & 127) << e2 * 7 + 3) >>> 0, this.buf[this.pos++] < 128)
              return r;
        } else
          for (; e2 < 5; ++e2) {
            if (this.pos >= this.len)
              throw z3(this);
            if (r.hi = (r.hi | (this.buf[this.pos] & 127) << e2 * 7 + 3) >>> 0, this.buf[this.pos++] < 128)
              return r;
          }
        throw Error("invalid varint encoding");
      }
      g2.prototype.bool = function() {
        return this.uint32() !== 0;
      };
      function Be2(r, e2) {
        return (r[e2 - 4] | r[e2 - 3] << 8 | r[e2 - 2] << 16 | r[e2 - 1] << 24) >>> 0;
      }
      g2.prototype.fixed32 = function() {
        if (this.pos + 4 > this.len)
          throw z3(this, 4);
        return Be2(this.buf, this.pos += 4);
      };
      g2.prototype.sfixed32 = function() {
        if (this.pos + 4 > this.len)
          throw z3(this, 4);
        return Be2(this.buf, this.pos += 4) | 0;
      };
      function Ir() {
        if (this.pos + 8 > this.len)
          throw z3(this, 8);
        return new Ar(Be2(this.buf, this.pos += 4), Be2(this.buf, this.pos += 4));
      }
      g2.prototype.float = function() {
        if (this.pos + 4 > this.len)
          throw z3(this, 4);
        var e2 = P2.float.readFloatLE(this.buf, this.pos);
        return this.pos += 4, e2;
      };
      g2.prototype.double = function() {
        if (this.pos + 8 > this.len)
          throw z3(this, 4);
        var e2 = P2.float.readDoubleLE(this.buf, this.pos);
        return this.pos += 8, e2;
      };
      g2.prototype.bytes = function() {
        var e2 = this.uint32(), t = this.pos, n = this.pos + e2;
        if (n > this.len)
          throw z3(this, e2);
        return this.pos += e2, Array.isArray(this.buf) ? this.buf.slice(t, n) : t === n ? new this.buf.constructor(0) : this._slice.call(this.buf, t, n);
      };
      g2.prototype.string = function() {
        var e2 = this.bytes();
        return Eo2.read(e2, 0, e2.length);
      };
      g2.prototype.skip = function(e2) {
        if (typeof e2 == "number") {
          if (this.pos + e2 > this.len)
            throw z3(this, e2);
          this.pos += e2;
        } else
          do
            if (this.pos >= this.len)
              throw z3(this);
          while (this.buf[this.pos++] & 128);
        return this;
      };
      g2.prototype.skipType = function(r) {
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
            for (; (r = this.uint32() & 7) != 4; )
              this.skipType(r);
            break;
          case 5:
            this.skip(4);
            break;
          default:
            throw Error("invalid wire type " + r + " at offset " + this.pos);
        }
        return this;
      };
      g2._configure = function(r) {
        nt2 = r, g2.create = zr2(), nt2._configure();
        var e2 = P2.Long ? "toLong" : "toNumber";
        P2.merge(g2.prototype, { int64: function() {
          return ot2.call(this)[e2](false);
        }, uint64: function() {
          return ot2.call(this)[e2](true);
        }, sint64: function() {
          return ot2.call(this).zzDecode()[e2](false);
        }, fixed64: function() {
          return Ir.call(this)[e2](true);
        }, sfixed64: function() {
          return Ir.call(this)[e2](false);
        } });
      };
    });
    Ur = m((ss, Fr) => {
      "use strict";
      Fr.exports = ee3;
      var Nr2 = it();
      (ee3.prototype = Object.create(Nr2.prototype)).constructor = ee3;
      var Mr2 = Q();
      function ee3(r) {
        Nr2.call(this, r);
      }
      ee3._configure = function() {
        Mr2.Buffer && (ee3.prototype._slice = Mr2.Buffer.prototype.slice);
      };
      ee3.prototype.string = function() {
        var e2 = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + e2, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + e2, this.len));
      };
      ee3._configure();
    });
    Rr = m((as, Pr2) => {
      "use strict";
      Pr2.exports = be;
      var st2 = Q();
      (be.prototype = Object.create(st2.EventEmitter.prototype)).constructor = be;
      function be(r, e2, t) {
        if (typeof r != "function")
          throw TypeError("rpcImpl must be a function");
        st2.EventEmitter.call(this), this.rpcImpl = r, this.requestDelimited = Boolean(e2), this.responseDelimited = Boolean(t);
      }
      be.prototype.rpcCall = function r(e2, t, n, o, i) {
        if (!o)
          throw TypeError("request must be specified");
        var s = this;
        if (!i)
          return st2.asPromise(r, s, e2, t, n, o);
        if (!s.rpcImpl) {
          setTimeout(function() {
            i(Error("already ended"));
          }, 0);
          return;
        }
        try {
          return s.rpcImpl(e2, t[s.requestDelimited ? "encodeDelimited" : "encode"](o).finish(), function(a, c2) {
            if (a)
              return s.emit("error", a, e2), i(a);
            if (c2 === null) {
              s.end(true);
              return;
            }
            if (!(c2 instanceof n))
              try {
                c2 = n[s.responseDelimited ? "decodeDelimited" : "decode"](c2);
              } catch (l) {
                return s.emit("error", l, e2), i(l);
              }
            return s.emit("data", c2, e2), i(null, c2);
          });
        } catch (f) {
          s.emit("error", f, e2), setTimeout(function() {
            i(f);
          }, 0);
          return;
        }
      };
      be.prototype.end = function(e2) {
        return this.rpcImpl && (e2 || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this;
      };
    });
    Vr = m((qr2) => {
      "use strict";
      var vo2 = qr2;
      vo2.Service = Rr();
    });
    Jr = m((fs2, $r) => {
      "use strict";
      $r.exports = {};
    });
    Gr = m((Wr2) => {
      "use strict";
      var D3 = Wr2;
      D3.build = "minimal";
      D3.Writer = rt();
      D3.BufferWriter = Cr();
      D3.Reader = it();
      D3.BufferReader = Ur();
      D3.util = Q();
      D3.rpc = Vr();
      D3.roots = Jr();
      D3.configure = Hr;
      function Hr() {
        D3.util._configure(), D3.Writer._configure(D3.BufferWriter), D3.Reader._configure(D3.BufferReader);
      }
      Hr();
    });
    Xr = m((us2, Qr2) => {
      "use strict";
      Qr2.exports = Gr();
    });
    tn = m((bs2, en2) => {
      "use strict";
      function ko2(r) {
        let [e2, t] = r[Symbol.asyncIterator] ? [r[Symbol.asyncIterator](), Symbol.asyncIterator] : [r[Symbol.iterator](), Symbol.iterator], n = [];
        return { peek: () => e2.next(), push: (o) => {
          n.push(o);
        }, next: () => n.length ? { done: false, value: n.shift() } : e2.next(), [t]() {
          return this;
        } };
      }
      en2.exports = ko2;
    });
    ti = re(_t());
    Ot = (r) => {
      let { name: e2, message: t, stack: n, code: o, detail: i } = r;
      return { name: e2, message: t, stack: n, code: o, detail: i };
    }, ne = (r) => {
      if (r instanceof Error)
        return r;
      {
        let { name: e2, message: t, stack: n, code: o } = r;
        return Object.assign(En(e2, t), { name: e2, stack: n, code: o });
      }
    }, En = (r, e2) => {
      switch (r) {
        case "RangeError":
          return new RangeError(e2);
        case "ReferenceError":
          return ReferenceError(e2);
        case "SyntaxError":
          return new SyntaxError(e2);
        case "TypeError":
          return new TypeError(e2);
        case "URIError":
          return new URIError(e2);
        default:
          return new Error(e2);
      }
    };
    Me = class extends Error {
      get name() {
        return this.constructor.name;
      }
    }, Fe = class extends Error {
      get name() {
        return this.constructor.name;
      }
    }, Ue = class extends Error {
      get name() {
        return this.constructor.name;
      }
    };
    H = class {
      constructor(e2) {
        this.port = null, this.id = Math.random().toString(32).slice(2), this.nextID = 0, this.queries = Object.create(null), e2 && this.connect(e2);
      }
      execute(e2) {
        let t = `${this.id}@${this.nextID++}`;
        return this.queries[t] = e2, e2.timeout > 0 && e2.timeout < 1 / 0 && (e2.timerID = setTimeout(H.timeout, e2.timeout, this, t)), e2.signal && e2.signal.addEventListener("abort", () => this.abort(t), { once: true }), this.port && H.postQuery(this.port, t, e2), e2.result;
      }
      connect(e2) {
        if (this.port)
          throw new Error("Transport is already open");
        this.port = e2, this.port.addEventListener("message", this), this.port.start();
        for (let [t, n] of Object.entries(this.queries))
          H.postQuery(e2, t, n);
      }
      disconnect() {
        let e2 = new Ue();
        for (let [t, n] of Object.entries(this.queries))
          n.fail(e2), this.abort(t);
        this.port && (this.port.removeEventListener("message", this), this.port.close());
      }
      static timeout(e2, t) {
        let { queries: n } = e2, o = n[t];
        o && (delete n[t], o.fail(new Me("request timed out")), e2.port && e2.port.postMessage({ type: "abort", id: t }));
      }
      abort(e2) {
        let { queries: t } = this, n = t[e2];
        n && (delete t[e2], n.fail(new Fe()), this.port && this.port.postMessage({ type: "abort", id: e2 }), n.timerID != null && clearTimeout(n.timerID));
      }
      static postQuery(e2, t, n) {
        e2.postMessage({ type: "query", namespace: n.namespace, method: n.method, id: t, input: n.toJSON() }, n.transfer());
      }
      handleEvent(e2) {
        let { id: t, result: n } = e2.data, o = this.queries[t];
        o && (delete this.queries[t], n.ok ? o.succeed(n.value) : o.fail(ne(n.error)), o.timerID != null && clearTimeout(o.timerID));
      }
    };
    Pe = class {
      constructor(e2, t, n) {
        this.result = new Promise((o, i) => {
          this.succeed = o, this.fail = i, this.signal = n.signal, this.input = n, this.namespace = e2, this.method = t, this.timeout = n.timeout == null ? 1 / 0 : n.timeout, this.timerID = null;
        });
      }
      toJSON() {
        return this.input;
      }
      transfer() {
        return this.input.transfer;
      }
    };
    Re = class {
      constructor(e2, t, n) {
        this.transport = n;
        let o = this;
        for (let i of t)
          o[i] = (s) => this.transport.execute(new Pe(e2, i.toString(), s));
      }
    };
    q = class {
      constructor(e2, t, n) {
        this.remote = new Re(e2, t, n);
      }
    };
    vn = At, Ct = 128, Dn = 127, jn = ~Dn, kn = Math.pow(2, 31);
    Tn = qe, _n = 128, Bt = 127;
    On = Math.pow(2, 7), Cn = Math.pow(2, 14), An = Math.pow(2, 21), Bn = Math.pow(2, 28), zn = Math.pow(2, 35), In = Math.pow(2, 42), Ln = Math.pow(2, 49), Nn = Math.pow(2, 56), Mn = Math.pow(2, 63), Fn = function(r) {
      return r < On ? 1 : r < Cn ? 2 : r < An ? 3 : r < Bn ? 4 : r < zn ? 5 : r < In ? 6 : r < Ln ? 7 : r < Nn ? 8 : r < Mn ? 9 : 10;
    }, Un = { encode: vn, decode: Tn, encodingLength: Fn }, Pn = Un, ue = Pn;
    he = (r) => [ue.decode(r), ue.decode.bytes], oe = (r, e2, t = 0) => (ue.encode(r, e2, t), e2), ie = (r) => ue.encodingLength(r);
    gi = new Uint8Array(0);
    zt = (r, e2) => {
      if (r === e2)
        return true;
      if (r.byteLength !== e2.byteLength)
        return false;
      for (let t = 0; t < r.byteLength; t++)
        if (r[t] !== e2[t])
          return false;
      return true;
    }, V = (r) => {
      if (r instanceof Uint8Array && r.constructor.name === "Uint8Array")
        return r;
      if (r instanceof ArrayBuffer)
        return new Uint8Array(r);
      if (ArrayBuffer.isView(r))
        return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
      throw new Error("Unknown type, must be binary type");
    };
    It = (r) => new TextEncoder().encode(r), Lt = (r) => new TextDecoder().decode(r);
    ve = (r, e2) => {
      let t = e2.byteLength, n = ie(r), o = n + ie(t), i = new Uint8Array(o + t);
      return oe(r, i, 0), oe(t, i, n), i.set(e2, o), new pe(r, t, e2, i);
    }, Mt = (r) => {
      let e2 = V(r), [t, n] = he(e2), [o, i] = he(e2.subarray(n)), s = e2.subarray(n + i);
      if (s.byteLength !== o)
        throw new Error("Incorrect length");
      return new pe(t, o, s, e2);
    }, Ft = (r, e2) => r === e2 ? true : r.code === e2.code && r.size === e2.size && zt(r.bytes, e2.bytes), pe = class {
      constructor(e2, t, n, o) {
        this.code = e2, this.size = t, this.digest = n, this.bytes = o;
      }
    };
    Ve = {};
    A(Ve, { base58btc: () => M, base58flickr: () => Hn });
    qn = Rn, Vn = qn, Ut = Vn;
    Pt = class {
      constructor(e2, t, n) {
        this.name = e2, this.prefix = t, this.baseEncode = n;
      }
      encode(e2) {
        if (e2 instanceof Uint8Array)
          return `${this.prefix}${this.baseEncode(e2)}`;
        throw Error("Unknown type, must be binary type");
      }
    }, Rt = class {
      constructor(e2, t, n) {
        this.name = e2, this.prefix = t, this.baseDecode = n;
      }
      decode(e2) {
        if (typeof e2 == "string")
          switch (e2[0]) {
            case this.prefix:
              return this.baseDecode(e2.slice(1));
            default:
              throw Error(`Unable to decode multibase string ${JSON.stringify(e2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
          }
        else
          throw Error("Can only multibase decode strings");
      }
      or(e2) {
        return Vt(this, e2);
      }
    }, qt = class {
      constructor(e2) {
        this.decoders = e2;
      }
      or(e2) {
        return Vt(this, e2);
      }
      decode(e2) {
        let t = e2[0], n = this.decoders[t];
        if (n)
          return n.decode(e2);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(e2)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
      }
    }, Vt = (r, e2) => new qt({ ...r.decoders || { [r.prefix]: r }, ...e2.decoders || { [e2.prefix]: e2 } }), $t = class {
      constructor(e2, t, n, o) {
        this.name = e2, this.prefix = t, this.baseEncode = n, this.baseDecode = o, this.encoder = new Pt(e2, t, n), this.decoder = new Rt(e2, t, o);
      }
      encode(e2) {
        return this.encoder.encode(e2);
      }
      decode(e2) {
        return this.decoder.decode(e2);
      }
    }, je = ({ name: r, prefix: e2, encode: t, decode: n }) => new $t(r, e2, t, n), W = ({ prefix: r, name: e2, alphabet: t }) => {
      let { encode: n, decode: o } = Ut(t, e2);
      return je({ prefix: r, name: e2, encode: n, decode: (i) => V(o(i)) });
    }, $n = (r, e2, t, n) => {
      let o = {};
      for (let l = 0; l < e2.length; ++l)
        o[e2[l]] = l;
      let i = r.length;
      for (; r[i - 1] === "="; )
        --i;
      let s = new Uint8Array(i * t / 8 | 0), f = 0, a = 0, c2 = 0;
      for (let l = 0; l < i; ++l) {
        let w3 = o[r[l]];
        if (w3 === void 0)
          throw new SyntaxError(`Non-${n} character`);
        a = a << t | w3, f += t, f >= 8 && (f -= 8, s[c2++] = 255 & a >> f);
      }
      if (f >= t || 255 & a << 8 - f)
        throw new SyntaxError("Unexpected end of data");
      return s;
    }, Jn = (r, e2, t) => {
      let n = e2[e2.length - 1] === "=", o = (1 << t) - 1, i = "", s = 0, f = 0;
      for (let a = 0; a < r.length; ++a)
        for (f = f << 8 | r[a], s += 8; s > t; )
          s -= t, i += e2[o & f >> s];
      if (s && (i += e2[o & f << t - s]), n)
        for (; i.length * t & 7; )
          i += "=";
      return i;
    }, b = ({ name: r, prefix: e2, bitsPerChar: t, alphabet: n }) => je({ prefix: e2, name: r, encode(o) {
      return Jn(o, n, t);
    }, decode(o) {
      return $n(o, n, t, r);
    } });
    M = W({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), Hn = W({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
    $e = {};
    A($e, { base32: () => se, base32hex: () => Xn, base32hexpad: () => Kn, base32hexpadupper: () => Yn, base32hexupper: () => Zn, base32pad: () => Gn, base32padupper: () => Qn, base32upper: () => Wn, base32z: () => eo });
    se = b({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Wn = b({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), Gn = b({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), Qn = b({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), Xn = b({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), Zn = b({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), Kn = b({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), Yn = b({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), eo = b({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
    d = class {
      constructor(e2, t, n, o) {
        this.code = t, this.version = e2, this.multihash = n, this.bytes = o, this.byteOffset = o.byteOffset, this.byteLength = o.byteLength, this.asCID = this, this._baseCache = /* @__PURE__ */ new Map(), Object.defineProperties(this, { byteOffset: Te, byteLength: Te, code: ke, version: ke, multihash: ke, bytes: ke, _baseCache: Te, asCID: Te });
      }
      toV0() {
        switch (this.version) {
          case 0:
            return this;
          default: {
            let { code: e2, multihash: t } = this;
            if (e2 !== de)
              throw new Error("Cannot convert a non dag-pb CID to CIDv0");
            if (t.code !== oo)
              throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
            return d.createV0(t);
          }
        }
      }
      toV1() {
        switch (this.version) {
          case 0: {
            let { code: e2, digest: t } = this.multihash, n = ve(e2, t);
            return d.createV1(this.code, n);
          }
          case 1:
            return this;
          default:
            throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
        }
      }
      equals(e2) {
        return e2 && this.code === e2.code && this.version === e2.version && Ft(this.multihash, e2.multihash);
      }
      toString(e2) {
        let { bytes: t, version: n, _baseCache: o } = this;
        switch (n) {
          case 0:
            return ro(t, o, e2 || M.encoder);
          default:
            return no(t, o, e2 || se.encoder);
        }
      }
      toJSON() {
        return { code: this.code, version: this.version, hash: this.multihash.bytes };
      }
      get [Symbol.toStringTag]() {
        return "CID";
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return "CID(" + this.toString() + ")";
      }
      static isCID(e2) {
        return so(/^0\.0/, ao), !!(e2 && (e2[Ht] || e2.asCID === e2));
      }
      get toBaseEncodedString() {
        throw new Error("Deprecated, use .toString()");
      }
      get codec() {
        throw new Error('"codec" property is deprecated, use integer "code" property instead');
      }
      get buffer() {
        throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
      }
      get multibaseName() {
        throw new Error('"multibaseName" property is deprecated');
      }
      get prefix() {
        throw new Error('"prefix" property is deprecated');
      }
      static asCID(e2) {
        if (e2 instanceof d)
          return e2;
        if (e2 != null && e2.asCID === e2) {
          let { version: t, code: n, multihash: o, bytes: i } = e2;
          return new d(t, n, o, i || Jt(t, n, o.bytes));
        } else if (e2 != null && e2[Ht] === true) {
          let { version: t, multihash: n, code: o } = e2, i = Mt(n);
          return d.create(t, o, i);
        } else
          return null;
      }
      static create(e2, t, n) {
        if (typeof t != "number")
          throw new Error("String codecs are no longer supported");
        switch (e2) {
          case 0: {
            if (t !== de)
              throw new Error(`Version 0 CID must use dag-pb (code: ${de}) block encoding`);
            return new d(e2, t, n, n.bytes);
          }
          case 1: {
            let o = Jt(e2, t, n.bytes);
            return new d(e2, t, n, o);
          }
          default:
            throw new Error("Invalid version");
        }
      }
      static createV0(e2) {
        return d.create(0, de, e2);
      }
      static createV1(e2, t) {
        return d.create(1, e2, t);
      }
      static decode(e2) {
        let [t, n] = d.decodeFirst(e2);
        if (n.length)
          throw new Error("Incorrect length");
        return t;
      }
      static decodeFirst(e2) {
        let t = d.inspectBytes(e2), n = t.size - t.multihashSize, o = V(e2.subarray(n, n + t.multihashSize));
        if (o.byteLength !== t.multihashSize)
          throw new Error("Incorrect length");
        let i = o.subarray(t.multihashSize - t.digestSize), s = new pe(t.multihashCode, t.digestSize, i, o);
        return [t.version === 0 ? d.createV0(s) : d.createV1(t.codec, s), e2.subarray(t.size)];
      }
      static inspectBytes(e2) {
        let t = 0, n = () => {
          let [w3, k3] = he(e2.subarray(t));
          return t += k3, w3;
        }, o = n(), i = de;
        if (o === 18 ? (o = 0, t = 0) : o === 1 && (i = n()), o !== 0 && o !== 1)
          throw new RangeError(`Invalid CID version ${o}`);
        let s = t, f = n(), a = n(), c2 = t + a, l = c2 - s;
        return { version: o, codec: i, multihashCode: f, digestSize: a, multihashSize: l, size: c2 };
      }
      static parse(e2, t) {
        let [n, o] = to(e2, t), i = d.decode(o);
        return i._baseCache.set(n, e2), i;
      }
    }, to = (r, e2) => {
      switch (r[0]) {
        case "Q": {
          let t = e2 || M;
          return [M.prefix, t.decode(`${M.prefix}${r}`)];
        }
        case M.prefix: {
          let t = e2 || M;
          return [M.prefix, t.decode(r)];
        }
        case se.prefix: {
          let t = e2 || se;
          return [se.prefix, t.decode(r)];
        }
        default: {
          if (e2 == null)
            throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
          return [r[0], e2.decode(r)];
        }
      }
    }, ro = (r, e2, t) => {
      let { prefix: n } = t;
      if (n !== M.prefix)
        throw Error(`Cannot string encode V0 in ${t.name} encoding`);
      let o = e2.get(n);
      if (o == null) {
        let i = t.encode(r).slice(1);
        return e2.set(n, i), i;
      } else
        return o;
    }, no = (r, e2, t) => {
      let { prefix: n } = t, o = e2.get(n);
      if (o == null) {
        let i = t.encode(r);
        return e2.set(n, i), i;
      } else
        return o;
    }, de = 112, oo = 18, Jt = (r, e2, t) => {
      let n = ie(r), o = n + ie(e2), i = new Uint8Array(o + t.byteLength);
      return oe(r, i, 0), oe(e2, i, n), i.set(t, o), i;
    }, Ht = Symbol.for("@ipld/js-cid/CID"), ke = { writable: false, configurable: false, enumerable: true }, Te = { writable: false, enumerable: false, configurable: false }, io = "0.0.0-dev", so = (r, e2) => {
      if (r.test(io))
        console.warn(e2);
      else
        throw new Error(e2);
    }, ao = `CID.isCID(v) is deprecated and will be removed in the next major release.
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
    j = (r, e2) => (e2 && e2.add(r.multihash.bytes.buffer), r), v = (r) => {
      let e2 = r;
      return e2._baseCache || Object.defineProperty(e2, "_baseCache", { value: /* @__PURE__ */ new Map() }), e2.asCID || Object.defineProperty(e2, "asCID", { get: () => e2 }), Object.setPrototypeOf(e2.multihash.digest, Uint8Array.prototype), Object.setPrototypeOf(e2.multihash.bytes, Uint8Array.prototype), Object.setPrototypeOf(e2.bytes, Uint8Array.prototype), Object.setPrototypeOf(e2, d.prototype), Object.defineProperty(e2, Symbol.for("@ipld/js-cid/CID"), { value: true }), e2;
    };
    Wt = (r, e2) => (e2 && e2.add(r.buffer), r);
    K = class extends q {
      constructor(e2) {
        super("block", ["put", "get", "rm", "stat"], e2);
      }
    };
    K.prototype.get = async function(e2, t = {}) {
      let { transfer: n } = t, { block: o } = await this.remote.get({ ...t, cid: j(e2, n) });
      return o;
    };
    K.prototype.put = async function(e2, t = {}) {
      let { transfer: n } = t;
      delete t.progress;
      let o = await this.remote.put({ ...t, block: e2 instanceof Uint8Array ? e2 : Wt(e2, n) });
      return v(o.cid);
    };
    K.prototype.rm = async function* (e2, t = {}) {
      let { transfer: n } = t;
      yield* (await this.remote.rm({ ...t, cids: Array.isArray(e2) ? e2.map((i) => j(i, n)) : [j(e2, n)] })).map(co);
    };
    K.prototype.stat = async function(e2, t = {}) {
      let { transfer: n } = t, o = await this.remote.stat({ ...t, cid: j(e2, n) });
      return { ...o, cid: v(o.cid) };
    };
    co = (r) => {
      let e2 = v(r.cid);
      return r.error ? { cid: e2, error: ne(r.error) } : { cid: e2 };
    };
    Gt = ({ dagNode: r, cids: e2 }) => {
      for (let t of e2)
        v(t);
      return r;
    }, Qt = (r, e2) => {
      let t = [];
      return Je(r, t, e2), { dagNode: r, cids: t };
    }, Je = (r, e2, t) => {
      if (r != null && typeof r == "object") {
        let n = d.asCID(r);
        if (n)
          e2.push(n), j(n, t);
        else if (r instanceof ArrayBuffer)
          t && t.add(r);
        else if (ArrayBuffer.isView(r))
          t && t.add(r.buffer);
        else if (Array.isArray(r))
          for (let o of r)
            Je(o, e2, t);
        else
          for (let o of Object.values(r))
            Je(o, e2, t);
      }
    };
    ae = class extends q {
      constructor(e2) {
        super("dag", ["put", "get", "resolve"], e2);
      }
    };
    ae.prototype.put = async function(e2, t = {}) {
      let n = await this.remote.put({ ...t, dagNode: Qt(e2, t.transfer) });
      return v(n);
    };
    ae.prototype.get = async function(e2, t = {}) {
      let { value: n, remainderPath: o } = await this.remote.get({ ...t, cid: j(e2, t.transfer) });
      return { value: Gt(n), remainderPath: o };
    };
    ae.prototype.resolve = async function(e2, t = {}) {
      let { cid: n, remainderPath: o } = await this.remote.resolve({ ...t, cid: fo(e2, t.transfer) });
      return { cid: v(n), remainderPath: o };
    };
    fo = (r, e2) => typeof r == "string" ? r : j(r, e2);
    _e = async function* ({ port: r }, e2) {
      let t = (s) => {
      }, n = () => new Promise((s) => t = s), o = () => (r.postMessage({ method: "next" }), n());
      r.onmessage = (s) => t(s.data);
      let i = false;
      try {
        for (; !i; ) {
          let { done: s, value: f, error: a } = await o();
          if (i = s, a != null)
            throw ne(a);
          f != null && (yield e2(f));
        }
      } finally {
        i || r.postMessage({ method: "return" }), r.close();
      }
    }, F = (r, e2, t) => {
      let { port1: n, port2: o } = new MessageChannel(), i = lo(r), s = /* @__PURE__ */ new Set();
      return n.onmessage = async ({ data: { method: f } }) => {
        switch (f) {
          case "next": {
            try {
              let { done: a, value: c2 } = await i.next();
              if (a)
                n.postMessage({ type: "next", done: true }), n.close();
              else {
                s.clear();
                let l = e2(c2, s);
                uo(n, { type: "next", done: false, value: l }, s);
              }
            } catch (a) {
              n.postMessage({ type: "throw", error: Ot(a) }), n.close();
            }
            break;
          }
          case "return": {
            n.close(), i.return && i.return();
            break;
          }
          default:
            break;
        }
      }, n.start(), t.add(o), { type: "RemoteIterable", port: o };
    }, lo = (r) => {
      if (r != null) {
        if (typeof r[Symbol.asyncIterator] == "function")
          return r[Symbol.asyncIterator]();
        if (typeof r[Symbol.iterator] == "function")
          return r[Symbol.iterator]();
      }
      throw TypeError("Value must be async or sync iterable");
    }, He = (r, e2) => {
      let { port1: t, port2: n } = new MessageChannel();
      return t.onmessage = ({ data: o }) => r.apply(null, o), e2.add(n), { type: "RemoteCallback", port: n };
    };
    uo = (r, e2, t) => r.postMessage(e2, t);
    ze = re(Zt());
    Zr = re(We());
    $ = re(Xr()), fe = $.default.Reader, at = $.default.Writer, h = $.default.util, S = $.default.roots["ipfs-unixfs"] || ($.default.roots["ipfs-unixfs"] = {}), Do = S.Data = (() => {
      function r(e2) {
        if (this.blocksizes = [], e2)
          for (var t = Object.keys(e2), n = 0; n < t.length; ++n)
            e2[t[n]] != null && (this[t[n]] = e2[t[n]]);
      }
      return r.prototype.Type = 0, r.prototype.Data = h.newBuffer([]), r.prototype.filesize = h.Long ? h.Long.fromBits(0, 0, true) : 0, r.prototype.blocksizes = h.emptyArray, r.prototype.hashType = h.Long ? h.Long.fromBits(0, 0, true) : 0, r.prototype.fanout = h.Long ? h.Long.fromBits(0, 0, true) : 0, r.prototype.mode = 0, r.prototype.mtime = null, r.encode = function(t, n) {
        if (n || (n = at.create()), n.uint32(8).int32(t.Type), t.Data != null && Object.hasOwnProperty.call(t, "Data") && n.uint32(18).bytes(t.Data), t.filesize != null && Object.hasOwnProperty.call(t, "filesize") && n.uint32(24).uint64(t.filesize), t.blocksizes != null && t.blocksizes.length)
          for (var o = 0; o < t.blocksizes.length; ++o)
            n.uint32(32).uint64(t.blocksizes[o]);
        return t.hashType != null && Object.hasOwnProperty.call(t, "hashType") && n.uint32(40).uint64(t.hashType), t.fanout != null && Object.hasOwnProperty.call(t, "fanout") && n.uint32(48).uint64(t.fanout), t.mode != null && Object.hasOwnProperty.call(t, "mode") && n.uint32(56).uint32(t.mode), t.mtime != null && Object.hasOwnProperty.call(t, "mtime") && S.UnixTime.encode(t.mtime, n.uint32(66).fork()).ldelim(), n;
      }, r.decode = function(t, n) {
        t instanceof fe || (t = fe.create(t));
        for (var o = n === void 0 ? t.len : t.pos + n, i = new S.Data(); t.pos < o; ) {
          var s = t.uint32();
          switch (s >>> 3) {
            case 1:
              i.Type = t.int32();
              break;
            case 2:
              i.Data = t.bytes();
              break;
            case 3:
              i.filesize = t.uint64();
              break;
            case 4:
              if (i.blocksizes && i.blocksizes.length || (i.blocksizes = []), (s & 7) == 2)
                for (var f = t.uint32() + t.pos; t.pos < f; )
                  i.blocksizes.push(t.uint64());
              else
                i.blocksizes.push(t.uint64());
              break;
            case 5:
              i.hashType = t.uint64();
              break;
            case 6:
              i.fanout = t.uint64();
              break;
            case 7:
              i.mode = t.uint32();
              break;
            case 8:
              i.mtime = S.UnixTime.decode(t, t.uint32());
              break;
            default:
              t.skipType(s & 7);
              break;
          }
        }
        if (!i.hasOwnProperty("Type"))
          throw h.ProtocolError("missing required 'Type'", { instance: i });
        return i;
      }, r.fromObject = function(t) {
        if (t instanceof S.Data)
          return t;
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
        if (t.Data != null && (typeof t.Data == "string" ? h.base64.decode(t.Data, n.Data = h.newBuffer(h.base64.length(t.Data)), 0) : t.Data.length && (n.Data = t.Data)), t.filesize != null && (h.Long ? (n.filesize = h.Long.fromValue(t.filesize)).unsigned = true : typeof t.filesize == "string" ? n.filesize = parseInt(t.filesize, 10) : typeof t.filesize == "number" ? n.filesize = t.filesize : typeof t.filesize == "object" && (n.filesize = new h.LongBits(t.filesize.low >>> 0, t.filesize.high >>> 0).toNumber(true))), t.blocksizes) {
          if (!Array.isArray(t.blocksizes))
            throw TypeError(".Data.blocksizes: array expected");
          n.blocksizes = [];
          for (var o = 0; o < t.blocksizes.length; ++o)
            h.Long ? (n.blocksizes[o] = h.Long.fromValue(t.blocksizes[o])).unsigned = true : typeof t.blocksizes[o] == "string" ? n.blocksizes[o] = parseInt(t.blocksizes[o], 10) : typeof t.blocksizes[o] == "number" ? n.blocksizes[o] = t.blocksizes[o] : typeof t.blocksizes[o] == "object" && (n.blocksizes[o] = new h.LongBits(t.blocksizes[o].low >>> 0, t.blocksizes[o].high >>> 0).toNumber(true));
        }
        if (t.hashType != null && (h.Long ? (n.hashType = h.Long.fromValue(t.hashType)).unsigned = true : typeof t.hashType == "string" ? n.hashType = parseInt(t.hashType, 10) : typeof t.hashType == "number" ? n.hashType = t.hashType : typeof t.hashType == "object" && (n.hashType = new h.LongBits(t.hashType.low >>> 0, t.hashType.high >>> 0).toNumber(true))), t.fanout != null && (h.Long ? (n.fanout = h.Long.fromValue(t.fanout)).unsigned = true : typeof t.fanout == "string" ? n.fanout = parseInt(t.fanout, 10) : typeof t.fanout == "number" ? n.fanout = t.fanout : typeof t.fanout == "object" && (n.fanout = new h.LongBits(t.fanout.low >>> 0, t.fanout.high >>> 0).toNumber(true))), t.mode != null && (n.mode = t.mode >>> 0), t.mtime != null) {
          if (typeof t.mtime != "object")
            throw TypeError(".Data.mtime: object expected");
          n.mtime = S.UnixTime.fromObject(t.mtime);
        }
        return n;
      }, r.toObject = function(t, n) {
        n || (n = {});
        var o = {};
        if ((n.arrays || n.defaults) && (o.blocksizes = []), n.defaults) {
          if (o.Type = n.enums === String ? "Raw" : 0, n.bytes === String ? o.Data = "" : (o.Data = [], n.bytes !== Array && (o.Data = h.newBuffer(o.Data))), h.Long) {
            var i = new h.Long(0, 0, true);
            o.filesize = n.longs === String ? i.toString() : n.longs === Number ? i.toNumber() : i;
          } else
            o.filesize = n.longs === String ? "0" : 0;
          if (h.Long) {
            var i = new h.Long(0, 0, true);
            o.hashType = n.longs === String ? i.toString() : n.longs === Number ? i.toNumber() : i;
          } else
            o.hashType = n.longs === String ? "0" : 0;
          if (h.Long) {
            var i = new h.Long(0, 0, true);
            o.fanout = n.longs === String ? i.toString() : n.longs === Number ? i.toNumber() : i;
          } else
            o.fanout = n.longs === String ? "0" : 0;
          o.mode = 0, o.mtime = null;
        }
        if (t.Type != null && t.hasOwnProperty("Type") && (o.Type = n.enums === String ? S.Data.DataType[t.Type] : t.Type), t.Data != null && t.hasOwnProperty("Data") && (o.Data = n.bytes === String ? h.base64.encode(t.Data, 0, t.Data.length) : n.bytes === Array ? Array.prototype.slice.call(t.Data) : t.Data), t.filesize != null && t.hasOwnProperty("filesize") && (typeof t.filesize == "number" ? o.filesize = n.longs === String ? String(t.filesize) : t.filesize : o.filesize = n.longs === String ? h.Long.prototype.toString.call(t.filesize) : n.longs === Number ? new h.LongBits(t.filesize.low >>> 0, t.filesize.high >>> 0).toNumber(true) : t.filesize), t.blocksizes && t.blocksizes.length) {
          o.blocksizes = [];
          for (var s = 0; s < t.blocksizes.length; ++s)
            typeof t.blocksizes[s] == "number" ? o.blocksizes[s] = n.longs === String ? String(t.blocksizes[s]) : t.blocksizes[s] : o.blocksizes[s] = n.longs === String ? h.Long.prototype.toString.call(t.blocksizes[s]) : n.longs === Number ? new h.LongBits(t.blocksizes[s].low >>> 0, t.blocksizes[s].high >>> 0).toNumber(true) : t.blocksizes[s];
        }
        return t.hashType != null && t.hasOwnProperty("hashType") && (typeof t.hashType == "number" ? o.hashType = n.longs === String ? String(t.hashType) : t.hashType : o.hashType = n.longs === String ? h.Long.prototype.toString.call(t.hashType) : n.longs === Number ? new h.LongBits(t.hashType.low >>> 0, t.hashType.high >>> 0).toNumber(true) : t.hashType), t.fanout != null && t.hasOwnProperty("fanout") && (typeof t.fanout == "number" ? o.fanout = n.longs === String ? String(t.fanout) : t.fanout : o.fanout = n.longs === String ? h.Long.prototype.toString.call(t.fanout) : n.longs === Number ? new h.LongBits(t.fanout.low >>> 0, t.fanout.high >>> 0).toNumber(true) : t.fanout), t.mode != null && t.hasOwnProperty("mode") && (o.mode = t.mode), t.mtime != null && t.hasOwnProperty("mtime") && (o.mtime = S.UnixTime.toObject(t.mtime, n)), o;
      }, r.prototype.toJSON = function() {
        return this.constructor.toObject(this, $.default.util.toJSONOptions);
      }, r.DataType = function() {
        let e2 = {}, t = Object.create(e2);
        return t[e2[0] = "Raw"] = 0, t[e2[1] = "Directory"] = 1, t[e2[2] = "File"] = 2, t[e2[3] = "Metadata"] = 3, t[e2[4] = "Symlink"] = 4, t[e2[5] = "HAMTShard"] = 5, t;
      }(), r;
    })(), hs = S.UnixTime = (() => {
      function r(e2) {
        if (e2)
          for (var t = Object.keys(e2), n = 0; n < t.length; ++n)
            e2[t[n]] != null && (this[t[n]] = e2[t[n]]);
      }
      return r.prototype.Seconds = h.Long ? h.Long.fromBits(0, 0, false) : 0, r.prototype.FractionalNanoseconds = 0, r.encode = function(t, n) {
        return n || (n = at.create()), n.uint32(8).int64(t.Seconds), t.FractionalNanoseconds != null && Object.hasOwnProperty.call(t, "FractionalNanoseconds") && n.uint32(21).fixed32(t.FractionalNanoseconds), n;
      }, r.decode = function(t, n) {
        t instanceof fe || (t = fe.create(t));
        for (var o = n === void 0 ? t.len : t.pos + n, i = new S.UnixTime(); t.pos < o; ) {
          var s = t.uint32();
          switch (s >>> 3) {
            case 1:
              i.Seconds = t.int64();
              break;
            case 2:
              i.FractionalNanoseconds = t.fixed32();
              break;
            default:
              t.skipType(s & 7);
              break;
          }
        }
        if (!i.hasOwnProperty("Seconds"))
          throw h.ProtocolError("missing required 'Seconds'", { instance: i });
        return i;
      }, r.fromObject = function(t) {
        if (t instanceof S.UnixTime)
          return t;
        var n = new S.UnixTime();
        return t.Seconds != null && (h.Long ? (n.Seconds = h.Long.fromValue(t.Seconds)).unsigned = false : typeof t.Seconds == "string" ? n.Seconds = parseInt(t.Seconds, 10) : typeof t.Seconds == "number" ? n.Seconds = t.Seconds : typeof t.Seconds == "object" && (n.Seconds = new h.LongBits(t.Seconds.low >>> 0, t.Seconds.high >>> 0).toNumber())), t.FractionalNanoseconds != null && (n.FractionalNanoseconds = t.FractionalNanoseconds >>> 0), n;
      }, r.toObject = function(t, n) {
        n || (n = {});
        var o = {};
        if (n.defaults) {
          if (h.Long) {
            var i = new h.Long(0, 0, false);
            o.Seconds = n.longs === String ? i.toString() : n.longs === Number ? i.toNumber() : i;
          } else
            o.Seconds = n.longs === String ? "0" : 0;
          o.FractionalNanoseconds = 0;
        }
        return t.Seconds != null && t.hasOwnProperty("Seconds") && (typeof t.Seconds == "number" ? o.Seconds = n.longs === String ? String(t.Seconds) : t.Seconds : o.Seconds = n.longs === String ? h.Long.prototype.toString.call(t.Seconds) : n.longs === Number ? new h.LongBits(t.Seconds.low >>> 0, t.Seconds.high >>> 0).toNumber() : t.Seconds), t.FractionalNanoseconds != null && t.hasOwnProperty("FractionalNanoseconds") && (o.FractionalNanoseconds = t.FractionalNanoseconds), o;
      }, r.prototype.toJSON = function() {
        return this.constructor.toObject(this, $.default.util.toJSONOptions);
      }, r;
    })(), ps = S.Metadata = (() => {
      function r(e2) {
        if (e2)
          for (var t = Object.keys(e2), n = 0; n < t.length; ++n)
            e2[t[n]] != null && (this[t[n]] = e2[t[n]]);
      }
      return r.prototype.MimeType = "", r.encode = function(t, n) {
        return n || (n = at.create()), t.MimeType != null && Object.hasOwnProperty.call(t, "MimeType") && n.uint32(10).string(t.MimeType), n;
      }, r.decode = function(t, n) {
        t instanceof fe || (t = fe.create(t));
        for (var o = n === void 0 ? t.len : t.pos + n, i = new S.Metadata(); t.pos < o; ) {
          var s = t.uint32();
          switch (s >>> 3) {
            case 1:
              i.MimeType = t.string();
              break;
            default:
              t.skipType(s & 7);
              break;
          }
        }
        return i;
      }, r.fromObject = function(t) {
        if (t instanceof S.Metadata)
          return t;
        var n = new S.Metadata();
        return t.MimeType != null && (n.MimeType = String(t.MimeType)), n;
      }, r.toObject = function(t, n) {
        n || (n = {});
        var o = {};
        return n.defaults && (o.MimeType = ""), t.MimeType != null && t.hasOwnProperty("MimeType") && (o.MimeType = t.MimeType), o;
      }, r.prototype.toJSON = function() {
        return this.constructor.toObject(this, $.default.util.toJSONOptions);
      }, r;
    })();
    ds = parseInt("0644", 8), ys = parseInt("0755", 8);
    rn = re(tn()), nn = re(We()), te = class extends q {
      constructor(e2) {
        super("core", ["add", "addAll", "cat", "ls"], e2);
      }
    };
    te.prototype.addAll = async function* (e2, t = {}) {
      let { timeout: n, signal: o } = t, i = t.transfer || /* @__PURE__ */ new Set(), s = t.progress ? He(t.progress, i) : void 0, f = await this.remote.addAll({ ...t, input: Co(e2, i), progress: void 0, progressCallback: s, transfer: i, timeout: n, signal: o });
      yield* _e(f.data, on);
    };
    te.prototype.add = async function(e2, t = {}) {
      let { timeout: n, signal: o } = t, i = t.transfer || /* @__PURE__ */ new Set(), s = t.progress ? He(t.progress, i) : void 0, f = await this.remote.add({ ...t, input: await Oo(e2, i), progress: void 0, progressCallback: s, transfer: i, timeout: n, signal: o });
      return on(f.data);
    };
    te.prototype.cat = async function* (e2, t = {}) {
      let n = d.asCID(e2), o = n ? j(n) : e2, i = await this.remote.cat({ ...t, path: o });
      yield* _e(i.data, _o);
    };
    te.prototype.ls = async function* (e2, t = {}) {
      let n = d.asCID(e2), o = n ? j(n) : e2, i = await this.remote.ls({ ...t, path: o });
      yield* _e(i.data, To);
    };
    on = ({ path: r, cid: e2, mode: t, mtime: n, size: o }) => ({ path: r, cid: v(e2), mode: t, mtime: n, size: o }), To = ({ name: r, path: e2, size: t, cid: n, type: o, mode: i, mtime: s }) => ({ cid: v(n), type: o, name: r, path: e2, mode: i, mtime: s, size: t }), _o = (r) => r, Oo = async (r, e2) => {
      if (r instanceof Blob)
        return r;
      if (typeof r == "string")
        return r;
      if (r instanceof ArrayBuffer)
        return r;
      if (ArrayBuffer.isView(r))
        return r;
      {
        let t = lt(r);
        if (t)
          return F(await dt(t), ct, e2);
        let n = ut(r);
        if (n)
          return F(await dt(n), le, e2);
        let o = ht(r);
        if (o)
          return F(await dt((0, ze.default)(o)), le, e2);
        let i = pt(r);
        if (i)
          return ft(i, e2);
        throw TypeError("Unexpected input: " + typeof r);
      }
    }, Co = (r, e2) => {
      let t = lt(r);
      if (t)
        return F(t, ct, e2);
      let n = ut(r);
      if (n)
        return F(n, le, e2);
      let o = ht(r);
      if (o)
        return F((0, ze.default)(o), le, e2);
      throw TypeError("Unexpected input: " + typeof r);
    }, le = (r, e2) => {
      if (r instanceof ArrayBuffer)
        return r;
      if (ArrayBuffer.isView(r))
        return r;
      if (r instanceof Blob)
        return { path: "", content: r };
      if (typeof r == "string")
        return { path: "", content: r };
      {
        let t = pt(r);
        if (t)
          return ft(t, e2);
        throw TypeError("Unexpected input: " + typeof r);
      }
    }, ct = (r, e2) => {
      if (typeof r == "number")
        throw TypeError("Iterable of numbers is not supported");
      if (r instanceof ArrayBuffer)
        return r;
      if (ArrayBuffer.isView(r))
        return r;
      if (r instanceof Blob)
        return { path: "", content: r };
      if (typeof r == "string")
        return { path: "", content: r };
      {
        let t = pt(r);
        if (t)
          return ft(t, e2);
        throw TypeError("Unexpected input: " + typeof r);
      }
    }, ft = ({ path: r, mode: e2, mtime: t, content: n }, o) => {
      let i = { path: r, mode: Kr(e2), mtime: Yr(t) };
      return n && (i.content = Ao(n, o)), i;
    }, Ao = (r, e2) => {
      if (r == null)
        return "";
      if (r instanceof ArrayBuffer || ArrayBuffer.isView(r))
        return r;
      if (r instanceof Blob)
        return r;
      if (typeof r == "string")
        return r;
      {
        let t = lt(r);
        if (t)
          return F(t, ct, e2);
        let n = ut(r);
        if (n)
          return F(n, le, e2);
        let o = ht(r);
        if (o)
          return F((0, ze.default)(o), le, e2);
        throw TypeError("Unexpected input: " + typeof r);
      }
    }, lt = (r) => {
      let e2 = r;
      return e2 && typeof e2[Symbol.iterator] == "function" ? e2 : null;
    }, ut = (r) => {
      let e2 = r;
      return e2 && typeof e2[Symbol.asyncIterator] == "function" ? e2 : null;
    }, ht = (r) => r && typeof r.getReader == "function" ? r : null, pt = (r) => typeof r == "object" && (r.path || r.content) ? r : null, dt = async (r) => {
      let e2 = (0, rn.default)(r), { value: t, done: n } = await e2.peek();
      if (n)
        return [];
      if (e2.push(t), Number.isInteger(t) || Bo(t) || typeof t == "string" || t instanceof String)
        return e2;
      throw (0, nn.default)(new Error("Unexpected input: multiple items passed - if you are using ipfs.add, please use ipfs.addAll instead"), "ERR_UNEXPECTED_INPUT");
    };
    Ie = class extends q {
      constructor(e2) {
        super("files", ["stat"], e2);
      }
    };
    Ie.prototype.stat = async function(e2, t = {}) {
      let { size: n, hash: o, withLocal: i, timeout: s, signal: f } = t, { stat: a } = await this.remote.stat({ path: zo(e2), size: n, hash: o, withLocal: i, timeout: s, signal: f });
      return Io(a);
    };
    zo = (r) => d.asCID(r) ? `/ipfs/${r.toString()}` : r.toString(), Io = (r) => ({ ...r, cid: v(r.cid) });
    ge = class extends te {
      constructor(e2) {
        super(e2);
        this.transport = e2, this.dag = new ae(this.transport), this.files = new Ie(this.transport), this.block = new K(this.transport);
      }
      static attach(e2, t) {
        e2.transport.connect(t);
      }
      static detached() {
        return new ge(new H(void 0));
      }
      static from(e2) {
        return new ge(new H(e2));
      }
    };
    Lo = ["https://ipfs.io/ipfs/:hash", "https://cf-ipfs.com/ipfs/:hash"];
    yt = {};
    A(yt, { identity: () => Mo });
    Mo = je({ prefix: "\0", name: "identity", encode: (r) => Lt(r), decode: (r) => It(r) });
    mt = {};
    A(mt, { base2: () => Fo });
    Fo = b({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
    bt = {};
    A(bt, { base8: () => Uo });
    Uo = b({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
    gt = {};
    A(gt, { base10: () => Po });
    Po = W({ prefix: "9", name: "base10", alphabet: "0123456789" });
    wt = {};
    A(wt, { base16: () => Ro, base16upper: () => qo });
    Ro = b({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), qo = b({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
    xt = {};
    A(xt, { base36: () => Vo, base36upper: () => $o });
    Vo = W({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), $o = W({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
    St = {};
    A(St, { base64: () => Jo, base64pad: () => Ho, base64url: () => Wo, base64urlpad: () => Go });
    Jo = b({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), Ho = b({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), Wo = b({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), Go = b({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
    Et = {};
    A(Et, { sha256: () => Qo, sha512: () => Xo });
    we = ({ name: r, code: e2, encode: t }) => new an(r, e2, t), an = class {
      constructor(e2, t, n) {
        this.name = e2, this.code = t, this.encode = n;
      }
      async digest(e2) {
        if (e2 instanceof Uint8Array) {
          let t = await this.encode(e2);
          return ve(this.code, t);
        } else
          throw Error("Unknown type, must be binary type");
      }
    };
    fn = (r) => async (e2) => new Uint8Array(await crypto.subtle.digest(r, e2)), Qo = we({ name: "sha2-256", code: 18, encode: fn("SHA-256") }), Xo = we({ name: "sha2-512", code: 19, encode: fn("SHA-512") });
    vt = {};
    A(vt, { identity: () => Zo });
    Zo = we({ name: "identity", code: 0, encode: (r) => V(r) });
    Xs = new TextEncoder(), Zs = new TextDecoder();
    Dt = { ...yt, ...mt, ...bt, ...gt, ...wt, ...$e, ...xt, ...Ve, ...St }, ta = { ...Et, ...vt };
    un = ln("utf8", "u", (r) => {
      let e2 = new TextDecoder("utf8");
      return "u" + e2.decode(r);
    }, (r) => new TextEncoder().encode(r.substring(1))), jt = ln("ascii", "a", (r) => {
      let e2 = "a";
      for (let t = 0; t < r.length; t++)
        e2 += String.fromCharCode(r[t]);
      return e2;
    }, (r) => {
      r = r.substring(1);
      let e2 = new Uint8Array(r.length);
      for (let t = 0; t < r.length; t++)
        e2[t] = r.charCodeAt(t);
      return e2;
    }), ei = { utf8: un, "utf-8": un, hex: Dt.base16, latin1: jt, ascii: jt, binary: jt, ...Dt }, Le = ei;
    Ne = (r) => {
      typeof r == "string" ? console.log(r) : typeof r == "object" ? console.table({ msg: r }) : console.log(r);
    };
    export_all = ti.default;
  }
});

// js/ipfsClient.mjs
var ipfsClient_exports = {};
__export(ipfsClient_exports, {
  all: () => export_all,
  concat: () => sn,
  ipfsCat: () => ipfsCat,
  ipfsClient: () => ipfsClient,
  toString: () => pn
});
var workerSrc3, forceNormalWorker3, port, ipfsClient, ipfsCat;
var init_ipfsClient = __esm({
  "js/ipfsClient.mjs"() {
    init_getWorker();
    init_ipfs_client();
    ({ workerSrc: workerSrc3, forceNormalWorker: forceNormalWorker3 } = getWorker("ipfsWorker.js"));
    if (typeof SharedWorker !== "undefined" && !forceNormalWorker3) {
      const ipfsWorker = new SharedWorker(workerSrc3);
      port = ipfsWorker.port;
    } else {
      const worker = new Worker(workerSrc3);
      const { port1, port2 } = new MessageChannel();
      const msg = {
        clientInit: true,
        port: port1
      };
      worker.postMessage(msg, [port1]);
      port = port2;
    }
    ipfsClient = ge.from(port);
    ipfsCat = async (cid, opts) => {
      const options = opts || {};
      const res = ipfsClient.cat(cid, options);
      const result = sn(await export_all(res));
      const resultStr = pn(result);
      return resultStr;
    };
    globalThis.ipfsClient = ipfsClient;
    globalThis.ipfsCat = ipfsCat;
  }
});

// ../shadb/dist/shaDB.mjs
var shaDB_exports = {};
__export(shaDB_exports, {
  assemble: () => B,
  diff: () => T,
  getDB: () => Y,
  getDbObj: () => Q2,
  sha256: () => M2,
  shaDB: () => Oe
});
import pe2 from "https://unpkg.com/@spike.land/esm@0.2.49/dist/ipfs-only-hash.mjs";
function _() {
  return z || (z = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function ee() {
  return C || (C = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]);
}
function ne2(n) {
  let e2 = new Promise((t, r) => {
    let i = () => {
      n.removeEventListener("success", s), n.removeEventListener("error", o);
    }, s = () => {
      t(c(n.result)), i();
    }, o = () => {
      r(n.error), i();
    };
    n.addEventListener("success", s), n.addEventListener("error", o);
  });
  return e2.then((t) => {
    t instanceof IDBCursor && V2.set(t, n);
  }).catch(() => {
  }), E.set(e2, n), e2;
}
function te2(n) {
  if (F2.has(n))
    return;
  let e2 = new Promise((t, r) => {
    let i = () => {
      n.removeEventListener("complete", s), n.removeEventListener("error", o), n.removeEventListener("abort", o);
    }, s = () => {
      t(), i();
    }, o = () => {
      r(n.error || new DOMException("AbortError", "AbortError")), i();
    };
    n.addEventListener("complete", s), n.addEventListener("error", o), n.addEventListener("abort", o);
  });
  F2.set(n, e2);
}
function R(n) {
  N = n(N);
}
function re2(n) {
  return n === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e2, ...t) {
    let r = n.call(I(this), e2, ...t);
    return J.set(r, e2.sort ? e2.sort() : [e2]), c(r);
  } : ee().includes(n) ? function(...e2) {
    return n.apply(I(this), e2), c(V2.get(this));
  } : function(...e2) {
    return c(n.apply(I(this), e2));
  };
}
function ie2(n) {
  return typeof n == "function" ? re2(n) : (n instanceof IDBTransaction && te2(n), k(n, _()) ? new Proxy(n, N) : n);
}
function c(n) {
  if (n instanceof IDBRequest)
    return ne2(n);
  if (D.has(n))
    return D.get(n);
  let e2 = ie2(n);
  return e2 !== n && (D.set(n, e2), E.set(e2, n)), e2;
}
function $2(n, e2, { blocked: t, upgrade: r, blocking: i, terminated: s } = {}) {
  let o = indexedDB.open(n, e2), f = c(o);
  return r && o.addEventListener("upgradeneeded", (a) => {
    r(c(o.result), a.oldVersion, a.newVersion, c(o.transaction));
  }), t && o.addEventListener("blocked", () => t()), f.then((a) => {
    s && a.addEventListener("close", () => s()), i && a.addEventListener("versionchange", () => i());
  }).catch(() => {
  }), f;
}
function q2(n, e2) {
  if (!(n instanceof IDBDatabase && !(e2 in n) && typeof e2 == "string"))
    return;
  if (H2.get(e2))
    return H2.get(e2);
  let t = e2.replace(/FromIndex$/, ""), r = e2 !== t, i = oe2.includes(t);
  if (!(t in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || se2.includes(t)))
    return;
  let s = async function(o, ...f) {
    let a = this.transaction(o, i ? "readwrite" : "readonly"), l = a.store;
    return r && (l = l.index(f.shift())), (await Promise.all([l[t](...f), i && a.done]))[0];
  };
  return H2.set(e2, s), s;
}
function w() {
}
function ae2(n, e2, t, r, i) {
  for (var s = 0, o = e2.length, f = 0, a = 0; s < o; s++) {
    var l = e2[s];
    if (l.removed) {
      if (l.value = n.join(r.slice(a, a + l.count)), a += l.count, s && e2[s - 1].added) {
        var d2 = e2[s - 1];
        e2[s - 1] = e2[s], e2[s] = d2;
      }
    } else {
      if (!l.added && i) {
        var p = t.slice(f, f + l.count);
        p = p.map(function(g2, x2) {
          var u = r[a + x2];
          return u.length > g2.length ? u : g2;
        }), l.value = n.join(p);
      } else
        l.value = n.join(t.slice(f, f + l.count));
      f += l.count, l.added || (a += l.count);
    }
  }
  var v2 = e2[o - 1];
  return o > 1 && typeof v2.value == "string" && (v2.added || v2.removed) && n.equals("", v2.value) && (e2[o - 2].value += v2.value, e2.pop()), e2;
}
function fe2(n) {
  return { newPos: n.newPos, components: n.components.slice(0) };
}
function P(n, e2, t) {
  return le2.diff(n, e2, t);
}
function S2(n) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? S2 = function(e2) {
    return typeof e2;
  } : S2 = function(e2) {
    return e2 && typeof Symbol == "function" && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
  }, S2(n);
}
function O(n, e2, t, r, i) {
  e2 = e2 || [], t = t || [], r && (n = r(i, n));
  var s;
  for (s = 0; s < e2.length; s += 1)
    if (e2[s] === n)
      return t[s];
  var o;
  if (ce.call(n) === "[object Array]") {
    for (e2.push(n), o = new Array(n.length), t.push(o), s = 0; s < n.length; s += 1)
      o[s] = O(n[s], e2, t, r, i);
    return e2.pop(), t.pop(), o;
  }
  if (n && n.toJSON && (n = n.toJSON()), S2(n) === "object" && n !== null) {
    e2.push(n), o = {}, t.push(o);
    var f = [], a;
    for (a in n)
      n.hasOwnProperty(a) && f.push(a);
    for (f.sort(), s = 0; s < f.length; s += 1)
      a = f[s], o[a] = O(n[a], e2, t, r, a);
    e2.pop(), t.pop();
  } else
    o = n;
  return o;
}
function Y(n = "defaultStore") {
  return async () => {
    let e2 = $2("spike-land-alpha", 1, { upgrade(r) {
      r.createObjectStore(n);
    }, blocked() {
    }, blocking() {
    }, terminated() {
    } });
    return Q2({ async get(r) {
      return (await e2).get(n, r);
    }, async put(r, i) {
      return (await e2).put(n, i, r);
    }, async delete(r) {
      return (await e2).delete(n, r);
    }, async clear() {
      return (await e2).clear(n);
    }, async keys() {
      return (await e2).getAllKeys(n);
    } });
  };
}
var k, z, C, V2, F2, J, D, E, N, I, se2, oe2, H2, le2, K2, U, X, Z, ue2, de2, ce, L, A2, T, G, B, M2, Q2, Oe;
var init_shaDB = __esm({
  "../shadb/dist/shaDB.mjs"() {
    k = (n, e2) => e2.some((t) => n instanceof t);
    V2 = new WeakMap(), F2 = new WeakMap(), J = new WeakMap(), D = new WeakMap(), E = new WeakMap();
    N = { get(n, e2, t) {
      if (n instanceof IDBTransaction) {
        if (e2 === "done")
          return F2.get(n);
        if (e2 === "objectStoreNames")
          return n.objectStoreNames || J.get(n);
        if (e2 === "store")
          return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
      }
      return c(n[e2]);
    }, set(n, e2, t) {
      return n[e2] = t, true;
    }, has(n, e2) {
      return n instanceof IDBTransaction && (e2 === "done" || e2 === "store") ? true : e2 in n;
    } };
    I = (n) => E.get(n);
    se2 = ["get", "getKey", "getAll", "getAllKeys", "count"], oe2 = ["put", "add", "delete", "clear"], H2 = /* @__PURE__ */ new Map();
    R((n) => ({ ...n, get: (e2, t, r) => q2(e2, t) || n.get(e2, t, r), has: (e2, t) => !!q2(e2, t) || n.has(e2, t) }));
    w.prototype = { diff: function(e2, t) {
      var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.callback;
      typeof r == "function" && (i = r, r = {}), this.options = r;
      var s = this;
      function o(u) {
        return i ? (setTimeout(function() {
          i(void 0, u);
        }, 0), true) : u;
      }
      e2 = this.castInput(e2), t = this.castInput(t), e2 = this.removeEmpty(this.tokenize(e2)), t = this.removeEmpty(this.tokenize(t));
      var f = t.length, a = e2.length, l = 1, p = f + a, d2 = [{ newPos: -1, components: [] }], v2 = this.extractCommon(d2[0], t, e2, 0);
      if (d2[0].newPos + 1 >= f && v2 + 1 >= a)
        return o([{ value: this.join(t), count: t.length }]);
      function g2() {
        for (var u = -1 * l; u <= l; u += 2) {
          var h2 = void 0, y = d2[u - 1], m2 = d2[u + 1], b2 = (m2 ? m2.newPos : 0) - u;
          y && (d2[u - 1] = void 0);
          var j3 = y && y.newPos + 1 < f, W3 = m2 && 0 <= b2 && b2 < a;
          if (!j3 && !W3) {
            d2[u] = void 0;
            continue;
          }
          if (!j3 || W3 && y.newPos < m2.newPos ? (h2 = fe2(m2), s.pushComponent(h2.components, void 0, true)) : (h2 = y, h2.newPos++, s.pushComponent(h2.components, true, void 0)), b2 = s.extractCommon(h2, t, e2, u), h2.newPos + 1 >= f && b2 + 1 >= a)
            return o(ae2(s, h2.components, t, e2, s.useLongestToken));
          d2[u] = h2;
        }
        l++;
      }
      if (i)
        (function u() {
          setTimeout(function() {
            if (l > p)
              return i();
            g2() || u();
          }, 0);
        })();
      else
        for (; l <= p; ) {
          var x2 = g2();
          if (x2)
            return x2;
        }
    }, pushComponent: function(e2, t, r) {
      var i = e2[e2.length - 1];
      i && i.added === t && i.removed === r ? e2[e2.length - 1] = { count: i.count + 1, added: t, removed: r } : e2.push({ count: 1, added: t, removed: r });
    }, extractCommon: function(e2, t, r, i) {
      for (var s = t.length, o = r.length, f = e2.newPos, a = f - i, l = 0; f + 1 < s && a + 1 < o && this.equals(t[f + 1], r[a + 1]); )
        f++, a++, l++;
      return l && e2.components.push({ count: l }), e2.newPos = f, a;
    }, equals: function(e2, t) {
      return this.options.comparator ? this.options.comparator(e2, t) : e2 === t || this.options.ignoreCase && e2.toLowerCase() === t.toLowerCase();
    }, removeEmpty: function(e2) {
      for (var t = [], r = 0; r < e2.length; r++)
        e2[r] && t.push(e2[r]);
      return t;
    }, castInput: function(e2) {
      return e2;
    }, tokenize: function(e2) {
      return e2.split("");
    }, join: function(e2) {
      return e2.join("");
    } };
    le2 = new w();
    K2 = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/, U = /\S/, X = new w();
    X.equals = function(n, e2) {
      return this.options.ignoreCase && (n = n.toLowerCase(), e2 = e2.toLowerCase()), n === e2 || this.options.ignoreWhitespace && !U.test(n) && !U.test(e2);
    };
    X.tokenize = function(n) {
      for (var e2 = n.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), t = 0; t < e2.length - 1; t++)
        !e2[t + 1] && e2[t + 2] && K2.test(e2[t]) && K2.test(e2[t + 2]) && (e2[t] += e2[t + 2], e2.splice(t + 1, 2), t--);
      return e2;
    };
    Z = new w();
    Z.tokenize = function(n) {
      var e2 = [], t = n.split(/(\n|\r\n)/);
      t[t.length - 1] || t.pop();
      for (var r = 0; r < t.length; r++) {
        var i = t[r];
        r % 2 && !this.options.newlineIsToken ? e2[e2.length - 1] += i : (this.options.ignoreWhitespace && (i = i.trim()), e2.push(i));
      }
      return e2;
    };
    ue2 = new w();
    ue2.tokenize = function(n) {
      return n.split(/(\S.+?[.!?])(?=\s+|$)/);
    };
    de2 = new w();
    de2.tokenize = function(n) {
      return n.split(/([{}:;,]|\s+)/);
    };
    ce = Object.prototype.toString, L = new w();
    L.useLongestToken = true;
    L.tokenize = Z.tokenize;
    L.castInput = function(n) {
      var e2 = this.options, t = e2.undefinedReplacement, r = e2.stringifyReplacer, i = r === void 0 ? function(s, o) {
        return typeof o == "undefined" ? t : o;
      } : r;
      return typeof n == "string" ? n : JSON.stringify(O(n, null, null, i), i, "  ");
    };
    L.equals = function(n, e2) {
      return w.prototype.equals.call(L, n.replace(/,([\r\n])/g, "$1"), e2.replace(/,([\r\n])/g, "$1"));
    };
    A2 = new w();
    A2.tokenize = function(n) {
      return n.slice();
    };
    A2.join = A2.removeEmpty = function(n) {
      return n;
    };
    T = async (n, e2) => {
      let t = pe2.of(n), r = P(n, e2);
      return { b: await t, c: r.map((i) => i.added ? i.value : i.removed ? -i.count : i.count) };
    }, G = (n) => {
      if (n.length < 10)
        return false;
      let e2 = [...n.slice(0, 8)].filter((r) => r < "0" || r > "f").length === 0, t = n.slice(8);
      if (e2 && t[0] === "[" && t[t.length - 1] === "]")
        try {
          return JSON.parse(t).length > 1;
        } catch (e3) {
          return false;
        }
      return false;
    }, B = (n, e2) => {
      let t = JSON.parse(e2), r = n.slice(), i = "";
      return t.forEach((s) => {
        if (Number(s) === s) {
          let o = Math.abs(s), f = r.slice(0, o);
          r = r.slice(o), s > 0 && (i += String(f));
        } else
          i += String(s);
      }), i;
    };
    M2 = async (n) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", typeof n == "string" ? new TextEncoder().encode(n) : n)).slice(0, 4)).map((e2) => ("00" + e2.toString(16)).slice(-2)).join("");
    Q2 = (n) => {
      let e2 = { async get(t, r = "string") {
        let i;
        try {
          if (i = await n.get(t), !i)
            return null;
        } catch (e3) {
          return null;
        }
        if (r === "json")
          try {
            return JSON.parse(i);
          } catch (e3) {
            return i;
          }
        let s = await i;
        if (r === "string") {
          if (typeof s == "string" && r === "string") {
            let o = s;
            if (G(o)) {
              let f = o.slice(0, 8), a = o.slice(8), l = await e2.get(f);
              return B(l, a);
            }
            return s;
          }
          return new TextDecoder().decode(s);
        }
        return i;
      }, async put(t, r) {
        let i;
        try {
          let o = await e2.get(t);
          if (typeof o == "string" && typeof r == "string" && o.length === 8 && o !== r) {
            let f = await e2.get(r), a = await e2.get(o);
            if (typeof a == "string") {
              let l = await M2(a);
              if (l === o) {
                let p = await T(f, a), d2 = p.b + JSON.stringify(p.c);
                await e2.put(l, d2);
              }
            }
          }
        } catch (e3) {
          i = "";
        }
        if (i !== "" && r === i)
          return r;
        let s;
        return typeof r != "string" ? s = new TextDecoder().decode(r) : s = r, await n.put(t, s);
      }, async delete(t) {
        return await n.delete(t);
      }, async clear() {
        return await n.clear();
      }, async keys() {
        return await n.getAllKeys();
      } };
      return e2;
    };
    Oe = { get: async (n, e2) => (await (await Y("shaDB"))()).get(n, e2), put: async (n, e2) => (await (await Y("shaDB"))()).put(n, e2) };
  }
});

// js/importmap.json
var imports, importmap_default;
var init_importmap = __esm({
  "js/importmap.json"() {
    imports = {
      "@babel/runtime/": "https://cdn.skypack.dev/@babel/runtime/",
      "@emotion/cache": "https://unpkg.com/@emotion/cache@11.7.1/dist/emotion-cache.browser.esm.js",
      "@emotion/hash": "https://unpkg.com/@emotion/hash@0.8.0/dist/hash.browser.esm.js",
      "@emotion/is-prop-valid": "https://unpkg.com/@emotion/is-prop-valid@1.1.1/dist/emotion-is-prop-valid.browser.esm.js",
      "@emotion/memoize": "https://unpkg.com/@emotion/memoize@0.7.5/dist/emotion-memoize.browser.esm.js",
      "@emotion/react": "https://unpkg.com/@emotion/react@11.7.1/dist/emotion-react.browser.esm.js",
      "@emotion/serialize": "https://unpkg.com/@emotion/serialize@1.0.2/dist/emotion-serialize.browser.esm.js",
      "@emotion/sheet": "https://unpkg.com/@emotion/sheet@1.1.0/dist/emotion-sheet.browser.esm.js",
      "@emotion/styled": "https://unpkg.com/@emotion/styled@11.6.0/dist/emotion-styled.browser.esm.js",
      "@emotion/utils": "https://unpkg.com/@emotion/utils@1.0.0/dist/emotion-utils.browser.esm.js",
      "@emotion/unitless": "https://unpkg.com/@emotion/unitless@0.7.5/dist/unitless.browser.esm.js",
      "@emotion/weak-memoize": "https://unpkg.com/@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.esm.js",
      "prop-types": "https://esm.sh/prop-types",
      "textdiff-create": "https://unpkg.com/@spike.land/esm@0.2.49/dist/textdiff-create.mjs",
      "textdiff-patch": "https://unpkg.com/@spike.land/esm@0.2.49/dist/textdiff-patch.mjs",
      "framer-motion": "https://unpkg.com/@spike.land/esm@0.2.49/dist/framer-motion.mjs",
      framesync: "https://unpkg.com/framesync@6.1.0/dist/es/index.mjs",
      "hey-listen": "https://unpkg.com/hey-listen@1.0.8/dist/hey-listen.es.js",
      "hoist-non-react-statics": "https://esm.sh/hoist-non-react-statics",
      popmotion: "https://unpkg.com/popmotion@11.0.3/dist/es/index.mjs",
      react: "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs",
      "react-dom": "https://unpkg.com/@spike.land/esm@0.2.49/dist/react-dom.mjs",
      "react-is": "https://unpkg.com/@spike.land/esm@0.2.49/dist/react-is.mjs",
      "react-transition-group": "https://esm.sh/react-transition-group",
      "react/jsx-runtime": "https://esm.sh/react/jsx-runtime",
      "@spike.land/renderer": "https://unpkg.com/@spike.land/renderer@0.2.56/dist/renderer.mjs",
      "style-value-types": "https://unpkg.com/style-value-types@5.1.0/dist/es/index.mjs",
      stylis: "https://unpkg.com/stylis@4.0.13/dist/stylis.mjs",
      "@spike.land/qrious": "https://unpkg.com/@spike.land/qrious@0.2.51/dist/QRious.mjs",
      tslib: "https://unpkg.com/tslib@2.3.1/tslib.es6.js",
      "ipfs-only-hash": "https://unpkg.com/@spike.land/esm@0.2.49/dist/ipfs-only-hash.mjs",
      "@zedvision/swm": "https://unpkg.com/@zedvision/swm@4.0.0/public/swm-esm.js",
      "uuid/": "https://unpkg.com/uuid@8.3.2/dist/esm-browser/",
      "@spike.land/code": "https://unpkg.com/@spike.land/code@0.2.56/js/reactLoader.mjs",
      "@spike.land/smart-monaco-editor": "https://unpkg.com/@spike.land/smart-monaco-editor@0.2.55/dist/editor.mjs",
      comlink: "https://unpkg.com/comlink@4.3.1/dist/esm/comlink.mjs",
      "@spike.land/ipfs": "https://unpkg.com/@spike.land/ipfs@0.2.51/dist/ipfs.client.mjs",
      "workbox-window": "https://unpkg.com/workbox-window@6.4.2/build/workbox-window.prod.es5.mjs",
      dev: "./starter.b.mjs"
    };
    importmap_default = {
      imports
    };
  }
});

// js/templates.ts
function getCss({ html }) {
  var _a2;
  const bodyClass = String((_a2 = window.document.getElementById("zbody")) == null ? void 0 : _a2.getAttribute("class"));
  let css = "";
  const cssRules = window.document.querySelector("head > style[data-emotion=css]");
  if (cssRules) {
    try {
      const sheet = window.document.querySelector("head > style[data-emotion=css]").sheet;
      if (sheet) {
        css = Array.from(sheet.cssRules).map((x2) => x2.cssText).filter((cssRule) => {
          const selector = cssRule.substring(5, 10);
          const isSelectorBody = bodyClass.indexOf(selector) !== -1;
          const isInGeneratedHtml = html.indexOf(selector) !== -1;
          const shouldInclude = isSelectorBody || isInGeneratedHtml;
          return shouldInclude;
        }).join("\n  ").replace(`#zbody`, "body");
      }
    } catch (e2) {
      console.error({ e: e2 });
    }
  }
  const globalCssRules = window.document.querySelector("head > style[data-emotion=css-global]");
  if (globalCssRules) {
    try {
      const sheet = window.document.querySelector("head > style[data-emotion=css-global]").sheet;
      if (sheet) {
        css += Array.from(sheet.cssRules).map((x2) => x2.cssText).join("\n  ").replace(`#zbody`, "body");
      }
    } catch (e2) {
      console.error({ e: e2 });
    }
  }
  return css;
}
function getHtml({ html, css }) {
  const titleStart = html.indexOf("<title>");
  const titleEnd = html.indexOf("</title>");
  const hasTitle = titleStart < titleEnd && titleStart >= -1;
  const title = hasTitle ? html.slice(titleStart, titleEnd) : "(code).spike.land :)";
  return `<!DOCTYPE html>
<html lang="en"> 
<head profile="http://www.w3.org/2005/10/profile">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="Description" content="Generated with spike.land">
<title>${title}</title>
<link rel="icon" type="image/png" href="https://code.spike.land/assets/zed-icon-big.png" />
<link rel="stylesheet" href="https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css" />

<script crossorigin src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"><\/script>
<script crossorigin src="https://unpkg.com/react-is@17.0.2/umd/react-is.production.min.js"><\/script>
<script crossorigin src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"><\/script>
<script async src="https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js"><\/script>
<script type="esms-options">
{
  "shimMode": true,
  "polyfillEnable": ["css-modules", "json-modules"],
  "nonce": "n0nce"
}
<\/script>
<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000000;
  color: white;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
${css}</style>
</head>
<body>
<a class="skip-link" href="#zbody">Jump to the page</a>
<main id="zbody">
  ${html}
</main>
<script>window.process = {env: {NODE_ENV:"production" }}<\/script>
<script type="importmap-shim">
${JSON.stringify({ imports: { ...importmap_default.imports, "app": "./app.js" } })}
<\/script>
<script type="module-shim">
  import App from 'app';
  import {jsx} from "@emotion/react"
  import ReactDOM from "react-dom"

  ReactDOM.render(jsx(App),document.getElementById('zbody'));
<\/script>
</body>
</html>
`;
}
var getEditorHTML;
var init_templates = __esm({
  "js/templates.ts"() {
    init_importmap();
    getEditorHTML = () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="icon" type="image/png" href="https://code.spike.land/assets/zed-icon-big.png" />
  
  <script crossorigin src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-is@17.0.2/umd/react-is.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"><\/script>
  <script async src="https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js"><\/script>
<title>Instant React Editor</title>
</head>
<body>
<script>window.process = {env: {NODE_ENV:"production" }}<\/script>
<script type="importmap">
${JSON.stringify({
      imports: { ...importmap_default.imports, "app": ["./app.js"] }
    })}
<\/script>
<script type="module">
import {edit} from "https://code.spike.land/js/data.mjs"
try{
  edit(location.pathname.slice(42, 52));
}catch(error){
  fetch("https://code.spike.land/error", {method: "POST",  body: JSON.stringify({error})})
}
<\/script>
</body>
</html>`;
  }
});

// js/share.mjs
var share_exports = {};
__export(share_exports, {
  shareItAsHtml: () => shareItAsHtml
});
async function addAll(files) {
  const { all, ipfsClient: ipfsClient2 } = await Promise.resolve().then(() => (init_ipfsClient(), ipfsClient_exports));
  try {
    const res = await all(ipfsClient2.addAll(files));
    return res.map((r) => {
      const CID = r.cid.toString();
      return { path: r.path, CID };
    });
  } catch (e2) {
    console.error({ error: e2 });
  }
}
var shareItAsHtml;
var init_share = __esm({
  "js/share.mjs"() {
    init_shaDB();
    init_templates();
    shareItAsHtml = async ({ transpiled, code, html }) => {
      const allContent = [
        {
          path: "/app/index.html",
          content: getHtml({ html, css: getCss({ html }), transpiled })
        },
        { path: "/app/app.js", content: transpiled },
        { path: "/app/app.tsx", content: code },
        { path: "/app/edit/index.html", content: getEditorHTML() }
      ];
      const sha = await M2(JSON.stringify(allContent));
      let rootUrl = await Oe.get(sha, "string");
      if (rootUrl === null) {
        const res = await addAll(allContent);
        const appDir = res.find((x2) => x2.path === "app");
        if (typeof appDir === "undefined")
          return null;
        rootUrl = `https://ipfs.io/ipfs/${appDir.CID}`;
        const { pathname } = new URL(window.location.href);
        if (pathname.endsWith("/edit/") || pathname.endsWith("/edit")) {
          history.pushState({}, "", `/ipfs/${appDir.CID}/edit/`);
        }
        await Oe.put(sha, rootUrl);
      }
      return rootUrl;
    };
  }
});

// ../../node_modules/uuid/lib/rng-browser.js
var require_rng_browser = __commonJS({
  "../../node_modules/uuid/lib/rng-browser.js"(exports2, module2) {
    var getRandomValues = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (getRandomValues) {
      rnds8 = new Uint8Array(16);
      module2.exports = function whatwgRNG() {
        getRandomValues(rnds8);
        return rnds8;
      };
    } else {
      rnds = new Array(16);
      module2.exports = function mathRNG() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 3) === 0)
            r = Math.random() * 4294967296;
          rnds[i] = r >>> ((i & 3) << 3) & 255;
        }
        return rnds;
      };
    }
    var rnds8;
    var rnds;
  }
});

// ../../node_modules/uuid/lib/bytesToUuid.js
var require_bytesToUuid = __commonJS({
  "../../node_modules/uuid/lib/bytesToUuid.js"(exports2, module2) {
    var byteToHex = [];
    for (i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 256).toString(16).substr(1);
    }
    function bytesToUuid(buf, offset) {
      var i2 = offset || 0;
      var bth = byteToHex;
      return [
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]]
      ].join("");
    }
    module2.exports = bytesToUuid;
    var i;
  }
});

// ../../node_modules/uuid/v4.js
var require_v4 = __commonJS({
  "../../node_modules/uuid/v4.js"(exports2, module2) {
    var rng = require_rng_browser();
    var bytesToUuid = require_bytesToUuid();
    function v43(options, buf, offset) {
      var i = buf && offset || 0;
      if (typeof options == "string") {
        buf = options === "binary" ? new Array(16) : null;
        options = null;
      }
      options = options || {};
      var rnds = options.random || (options.rng || rng)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        for (var ii2 = 0; ii2 < 16; ++ii2) {
          buf[i + ii2] = rnds[ii2];
        }
      }
      return buf || bytesToUuid(rnds);
    }
    module2.exports = v43;
  }
});

// js/data.mjs
var data_exports = {};
__export(data_exports, {
  edit: () => edit,
  getCodeToLoad: () => getCodeToLoad,
  getIPFSCodeToLoad: () => getIPFSCodeToLoad,
  getProjects: () => getProjects,
  getUserId: () => getUserId,
  saveCode: () => saveCode
});
import Hash from "https://unpkg.com/@spike.land/esm@0.2.49/dist/ipfs-only-hash.mjs";
async function addNewProject(projectName, hash) {
  uuid = await getUserId();
  const userData = await Oe.get(uuid, "json") || { list: [] };
  const projectId = (0, import_v4.default)();
  const updated = {
    ...userData,
    projects: {
      ...userData.projects,
      [projectName]: {
        projectId,
        lastOpen: Date.now()
      }
    },
    [projectId]: {
      lastOpen: Date.now()
    },
    list: [projectId, ...userData.list]
  };
  await Oe.put(uuid, JSON.stringify(updated));
  await Oe.put(projectId, hash);
}
async function getUserId() {
  if (uuid)
    return uuid;
  const newID = await Oe.get("uuid", "string");
  if (!newID) {
    const resp = await fetch("https://spike.land/register");
    const data = await resp.json();
    if (uuid)
      return uuid;
    uuid = data.uuid;
    await Oe.put("uuid", data.uuid);
    return data.uuid;
  }
  return newID;
}
async function getActiveProject() {
  if (activeProject)
    return activeProject;
  const projects = await getProjects();
  if (projects.rootUrl)
    return projects;
  activeProject = projects[0];
  return activeProject;
}
async function edit(name) {
  console.log(name);
  const rootUrl = window.location.href.endsWith("/edit/") ? window.location.href.slice(0, -5) : window.location.href.slice(0, -4);
  const appCode = await fetch(`${rootUrl}/app.tsx`).then((res) => res.text());
  const hash = await M2(appCode);
  await Oe.put(hash, appCode);
  const project = JSON.stringify({
    code: hash,
    transpiled: "",
    html: "",
    url: rootUrl
  });
  const projectSha = await M2(project);
  await Oe.put(projectSha, project);
  await addNewProject(name, projectSha);
  console.log("done");
  location.href = "https://code.spike.land";
}
async function getIPFSCodeToLoad(_rootUrl) {
  const rootUrl = _rootUrl || (window.location.href.endsWith("/edit/") ? window.location.href.slice(0, -5) : window.location.href.slice(0, -4));
  const codeReq = await fetch(rootUrl + "app.tsx");
  const code = await codeReq.text();
  const ret = {
    code,
    url: rootUrl,
    transpiled: "",
    html: ""
  };
  console.log({ ret });
  return ret;
}
async function getCodeToLoad(room2) {
  let code;
  const projectName = room2 || await getActiveProject();
  if (projectName.rootUrl) {
    return getIPFSCodeToLoad(projectName.rootUrl);
  }
  const keyToLoad = await Oe.get(projectName, "string");
  const projectDesc = await Oe.get(keyToLoad, "json");
  if (room2 !== "") {
    const resp = await fetch(`https://code.spike.land/api/room/${room2}/hashOfCode`);
    const CID = await resp.text();
    if (CID === "" && projectDesc === null) {
      code = await getStarter();
    } else if (projectDesc && projectDesc.code && CID) {
      const codeFromIdb = await Oe.get(projectDesc.code, "string");
      const CIDofCodeFromIDB = await Hash.of(codeFromIdb);
      if (CIDofCodeFromIDB && CID === CIDofCodeFromIDB) {
        code = codeFromIdb;
      }
    }
    if (!code) {
      if (CID) {
        const respCode = await fetch(`https://code.spike.land/api/room/${room2}/code`);
        code = await respCode.text();
      } else {
        code = await getStarter();
      }
    }
    const data2 = {
      code,
      transpiled: projectDesc && await Oe.get(projectDesc.transpiled, "string") || "",
      html: projectDesc && await Oe.get(projectDesc.html, "string") || ""
    };
    return data2;
  }
  const data = {
    code: await Oe.get(projectDesc, "string") || await getStarter(),
    transpiled: null,
    html: null
  };
  return data;
}
function getStarter() {
  return fetch(`https://code.spike.land/js/examples/rca.tsx`).then((res) => res.text());
}
var import_v4, sess, uuid, getProjects, activeProject, saved, toSave, saveCode;
var init_data = __esm({
  "js/data.mjs"() {
    init_shaDB();
    import_v4 = __toModule(require_v4());
    init_templates();
    sess = {};
    getProjects = async () => {
      uuid = await getUserId();
      const userData = await Oe.get(uuid, "json");
      let appHash = null;
      if (userData && userData.signal) {
        return userData.signal;
      }
      if (typeof userData === "string" || userData === null || !userData.list) {
        const projectId = (0, import_v4.default)();
        await Oe.put(uuid, JSON.stringify({
          ...userData,
          list: [projectId],
          [projectId]: {
            lastOpen: Date.now()
          }
        }));
        if (appHash !== null)
          await Oe.put(projectId, appHash);
        return [projectId];
      }
      if (appHash !== null)
        await Oe.put(userData.list[0], appHash);
      return userData.list;
    };
    saved = {
      code: "",
      html: null,
      transpiled: null,
      url: null
    };
    toSave = {
      code: "",
      html: null,
      transpiled: null
    };
    saveCode = async (opts, counter) => {
      const { code, codeNonFormatted, html, transpiled } = opts;
      toSave.code = code || await getStarter();
      if (opts.i > counter)
        return;
      if (opts.code !== toSave.code) {
        return null;
      }
      if (toSave.code === saved.code && saved.url !== null) {
        return saved.url;
      }
      toSave.code = opts.code;
      if (window.broad && codeNonFormatted) {
        const hashOfCode = await Hash.of(codeNonFormatted);
        sess.codeNonFormatted = codeNonFormatted;
        setTimeout(async () => sess.codeNonFormatted === codeNonFormatted && window.broad({
          starterCode: window.starterCode,
          code: codeNonFormatted,
          transpiled,
          i: opts.i,
          html: opts.html,
          css: getCss({ html }),
          hashOfStarterCode: window.starterCode && await Hash.of(window.starterCode),
          hashOfCode
        }), 500);
      }
      const { shareItAsHtml: shareItAsHtml2 } = await Promise.resolve().then(() => (init_share(), share_exports));
      const sharePromise = shareItAsHtml2({ code, html, transpiled });
      if (opts.i > counter)
        return;
      const url = await sharePromise;
      const projectName = opts.room || await getActiveProject();
      if (opts.i > counter)
        return;
      opts.url = url;
      const desc = {
        url: await M2(url),
        code: await M2(code),
        html: await M2(html),
        transpiled: await M2(transpiled)
      };
      const hash = await M2(JSON.stringify(desc));
      await Oe.put(hash, JSON.stringify(desc));
      if (code) {
        await Oe.put(desc.code, code);
      }
      if (html) {
        await Oe.put(desc.html, html);
      }
      if (transpiled) {
        await Oe.put(desc.transpiled, transpiled);
      }
      await Oe.put(projectName, hash);
      Object.assign(saved, { html, code, transpiled, url });
      return saved;
    };
  }
});

// ../smart-monaco-editor/dist/editor.mjs
function indentString(string, count = 1, options = {}) {
  const {
    indent = " ",
    includeEmptyLines = false
  } = options;
  if (typeof string !== "string") {
    throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof string}\``);
  }
  if (typeof count !== "number") {
    throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof count}\``);
  }
  if (count < 0) {
    throw new RangeError(`Expected \`count\` to be at least 0, got \`${count}\``);
  }
  if (typeof indent !== "string") {
    throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof indent}\``);
  }
  if (count === 0) {
    return string;
  }
  const regex = includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
  return string.replace(regex, indent.repeat(count));
}
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function cleanStack(stack, { pretty = false, basePath } = {}) {
  const basePathRegex = basePath && new RegExp(`(at | \\()${escapeStringRegexp(basePath.replace(/\\/g, "/"))}`, "g");
  if (typeof stack !== "string") {
    return void 0;
  }
  return stack.replace(/\\/g, "/").split("\n").filter((line) => {
    const pathMatches = line.match(extractPathRegex);
    if (pathMatches === null || !pathMatches[1]) {
      return true;
    }
    const match = pathMatches[1];
    if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar")) {
      return false;
    }
    return !pathRegex.test(match);
  }).filter((line) => line.trim() !== "").map((line) => {
    if (basePathRegex) {
      line = line.replace(basePathRegex, "$1");
    }
    if (pretty) {
      line = line.replace(extractPathRegex, (m2, p1) => m2.replace(p1, p1.replace(homeDir, "~")));
    }
    return line;
  }).join("\n");
}
async function pMap(iterable, mapper, {
  concurrency = Number.POSITIVE_INFINITY,
  stopOnError = true
} = {}) {
  return new Promise((resolve, reject_) => {
    if (iterable[Symbol.iterator] === void 0 && iterable[Symbol.asyncIterator] === void 0) {
      throw new TypeError(`Expected \`input\` to be either an \`Iterable\` or \`AsyncIterable\`, got (${typeof iterable})`);
    }
    if (typeof mapper !== "function") {
      throw new TypeError("Mapper function is required");
    }
    if (!((Number.isSafeInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency >= 1)) {
      throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${concurrency}\` (${typeof concurrency})`);
    }
    const result = [];
    const errors = [];
    const skippedIndexesMap = /* @__PURE__ */ new Map();
    let isRejected = false;
    let isResolved = false;
    let isIterableDone = false;
    let resolvingCount = 0;
    let currentIndex = 0;
    const iterator = iterable[Symbol.iterator] === void 0 ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
    const reject = (reason) => {
      isRejected = true;
      isResolved = true;
      reject_(reason);
    };
    const next = async () => {
      if (isResolved) {
        return;
      }
      const nextItem = await iterator.next();
      const index = currentIndex;
      currentIndex++;
      if (nextItem.done) {
        isIterableDone = true;
        if (resolvingCount === 0 && !isResolved) {
          if (!stopOnError && errors.length > 0) {
            reject(new AggregateError(errors));
            return;
          }
          isResolved = true;
          if (!skippedIndexesMap.size) {
            resolve(result);
            return;
          }
          const pureResult = [];
          for (const [index2, value] of result.entries()) {
            if (skippedIndexesMap.get(index2) === pMapSkip) {
              continue;
            }
            pureResult.push(value);
          }
          resolve(pureResult);
        }
        return;
      }
      resolvingCount++;
      (async () => {
        try {
          const element = await nextItem.value;
          if (isResolved) {
            return;
          }
          const value = await mapper(element, index);
          if (value === pMapSkip) {
            skippedIndexesMap.set(index, value);
          }
          result[index] = value;
          resolvingCount--;
          await next();
        } catch (error) {
          if (stopOnError) {
            reject(error);
          } else {
            errors.push(error);
            resolvingCount--;
            try {
              await next();
            } catch (error2) {
              reject(error2);
            }
          }
        }
      })();
    };
    (async () => {
      for (let index = 0; index < concurrency; index++) {
        try {
          await next();
        } catch (error) {
          reject(error);
          break;
        }
        if (isIterableDone || isRejected) {
          break;
        }
      }
    })();
  });
}
async function pAll(iterable, options) {
  return pMap(iterable, (element) => element(), options);
}
async function loadExtraLibs(addExtraLib, setDiagnosticsOptions) {
  const importHelper = [
    {
      name: "react",
      url: "https://unpkg.com/@types/react@17.0.37/index.d.ts",
      depend: ["global", "csstype", "react-dom", "prop-types"]
    },
    {
      name: "react/jsx-dev-runtime",
      url: "https://unpkg.com/@types/react@17.0.37/jsx-dev-runtime.d.ts",
      depend: ["global", "csstype", "react-dom", "prop-types"]
    },
    {
      name: "react-exp",
      url: "https://unpkg.com/@types/react@17.0.37/experimental.d.ts",
      depend: []
    },
    {
      name: "global",
      url: "https://unpkg.com/@types/react@17.0.37/global.d.ts",
      depend: []
    },
    {
      name: "prop-types",
      url: "https://unpkg.com/@types/prop-types@15.7.2/index.d.ts",
      depend: []
    },
    {
      name: "react-dom",
      url: "https://unpkg.com/@types/react-dom@17.0.11/index.d.ts",
      depend: []
    },
    {
      name: "csstype",
      url: "https://unpkg.com/csstype@3.0.9/index.d.ts",
      depend: []
    },
    {
      name: "@emotion/styled/base.d.ts",
      url: "https://unpkg.com/@emotion/styled@11.6.0/types/base.d.ts",
      depend: [
        "@emotion/react",
        "@emotion/serialize",
        "react"
      ]
    },
    {
      name: "@emotion/styled/index.d.ts",
      url: "https://unpkg.com/@emotion/styled@11.6.0/types/index.d.ts",
      depend: [
        "@emotion/react",
        "@emotion/serialize",
        "react"
      ]
    },
    {
      name: "@emotion/cache/index.d.ts",
      url: "https://unpkg.com/@emotion/cache@11.6.0/types/index.d.ts",
      depend: ["@emotion/utils"]
    },
    {
      name: "@emotion/react/index.d.ts",
      url: "https://unpkg.com/@emotion/react@11.7.0/types/index.d.ts",
      depend: ["@emotion/cache"]
    },
    {
      name: "@emotion/react/jsx-namespace.d.ts",
      url: "https://unpkg.com/@emotion/react@11.7.0/types/jsx-namespace.d.ts",
      depend: ["@emotion/utils", "csstype"]
    },
    {
      name: "@emotion/react/css-prop.d.ts",
      url: "https://unpkg.com/@emotion/react@11.7.0/types/css-prop.d.ts",
      depend: ["@emotion/utils", "csstype"]
    },
    {
      name: "@emotion/react/helper.d.ts",
      url: "https://unpkg.com/@emotion/react@11.7.0/types/helper.d.ts",
      depend: ["@emotion/utils", "csstype"]
    },
    {
      name: "@emotion/react/theming.d.ts",
      url: "https://unpkg.com/@emotion/react@11.7.0/types/theming.d.ts",
      depend: ["@emotion/utils", "csstype"]
    },
    {
      name: "@emotion/serialize/index.d.ts",
      url: "https://unpkg.com/@emotion/serialize@1.0.2/types/index.d.ts",
      depend: ["@emotion/utils", "csstype"]
    },
    {
      name: "@emotion/utils/index.d.ts",
      url: "https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",
      depend: []
    },
    {
      name: "framer-motion",
      url: "https://unpkg.com/framer-motion@5.4.5/types/index.d.ts",
      depend: ["popmotion"]
    },
    {
      name: "framer-motion/types/render/dom/motion.d.ts",
      url: " https://unpkg.com/framer-motion@5.4.5/types/render/dom/motion.d.ts",
      depend: ["popmotion"]
    },
    {
      name: "popmotion",
      url: "https://unpkg.com/popmotion@11.0.0/lib/index.d.ts"
    }
  ];
  const dts = importHelper.map(({ name, url }) => async () => {
    const content = await (await fetch(url)).text();
    const nameOfLib = name.includes("@") ? `/node_modules/${name}` : name.endsWith(".d.ts") ? "/node_modules/@types" + name : "/node_modules/@types/" + name + "/index.d.ts";
    addExtraLib(content, nameOfLib);
  });
  await pAll(dts, { concurrency: 2 });
  setDiagnosticsOptions({
    noSuggestionDiagnostics: false,
    noSemanticValidation: false,
    noSyntaxValidation: false
  });
}
var __create2, __defProp2, __getOwnPropDesc2, __getOwnPropNames2, __getProtoOf2, __hasOwnProp2, __defNormalProp, __markAsModule2, __commonJS2, __reExport2, __toModule2, __publicField, __accessCheck, __privateGet, __privateAdd, __privateSet, require_os, version, exp, getMonaco, import_os, extractPathRegex, pathRegex, homeDir, cleanInternalStack, _errors, AggregateError, pMapSkip, monacoProm, loadMonaco, editor_default;
var init_editor = __esm({
  "../smart-monaco-editor/dist/editor.mjs"() {
    __create2 = Object.create;
    __defProp2 = Object.defineProperty;
    __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    __getOwnPropNames2 = Object.getOwnPropertyNames;
    __getProtoOf2 = Object.getPrototypeOf;
    __hasOwnProp2 = Object.prototype.hasOwnProperty;
    __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    __markAsModule2 = (target) => __defProp2(target, "__esModule", { value: true });
    __commonJS2 = (cb2, mod3) => function __require() {
      return mod3 || (0, cb2[Object.keys(cb2)[0]])((mod3 = { exports: {} }).exports, mod3), mod3.exports;
    };
    __reExport2 = (target, module2, desc) => {
      if (module2 && typeof module2 === "object" || typeof module2 === "function") {
        for (let key of __getOwnPropNames2(module2))
          if (!__hasOwnProp2.call(target, key) && key !== "default")
            __defProp2(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc2(module2, key)) || desc.enumerable });
      }
      return target;
    };
    __toModule2 = (module2) => {
      return __reExport2(__markAsModule2(__defProp2(module2 != null ? __create2(__getProtoOf2(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
    };
    __publicField = (obj, key, value) => {
      __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    __accessCheck = (obj, member, msg) => {
      if (!member.has(obj))
        throw TypeError("Cannot " + msg);
    };
    __privateGet = (obj, member, getter) => {
      __accessCheck(obj, member, "read from private field");
      return getter ? getter.call(obj) : member.get(obj);
    };
    __privateAdd = (obj, member, value) => {
      if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
      member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    };
    __privateSet = (obj, member, value, setter) => {
      __accessCheck(obj, member, "write to private field");
      setter ? setter.call(obj, value) : member.set(obj, value);
      return value;
    };
    require_os = __commonJS2({
      "(disabled):os"() {
      }
    });
    version = "0.31.0";
    exp = {
      monaco: null
    };
    getMonaco = async () => {
      if (exp.monaco)
        return exp.monaco;
      const importScript2 = (src, res = []) => {
        if (typeof window === "undefined")
          return {};
        return window.document.head.querySelector(`script[src="${src}"]`) && window || new Promise(function(resolve, reject) {
          const s = window.document.createElement("script");
          s.src = src;
          s.async = "async";
          s.type = "application/javascript";
          s.onload = () => {
            if (res.length === 0) {
              resolve(window);
            }
            const ret = {};
            res.forEach((x2) => Object.assign(ret, window[x2]));
            resolve(ret);
          };
          s.onerror = reject;
          window.document.head.appendChild(s);
        });
      };
      const vsPath = `https://unpkg.com/monaco-editor@${version}/min/vs`;
      const { require: require2 } = await importScript2(`${vsPath}/loader.js`);
      require2.config({ paths: { "vs": vsPath }, "vs/css": { disabled: true } });
      exp.monaco = await new Promise((resolve) => require2(["vs/editor/editor.main"], (_m) => resolve(_m)));
      return exp.monaco;
    };
    import_os = __toModule2(require_os());
    extractPathRegex = /\s+at.*[(\s](.*)\)?/;
    pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
    homeDir = typeof import_os.default.homedir === "undefined" ? "" : import_os.default.homedir().replace(/\\/g, "/");
    cleanInternalStack = (stack) => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, "");
    AggregateError = class extends Error {
      constructor(errors) {
        if (!Array.isArray(errors)) {
          throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
        }
        errors = errors.map((error) => {
          if (error instanceof Error) {
            return error;
          }
          if (error !== null && typeof error === "object") {
            return Object.assign(new Error(error.message), error);
          }
          return new Error(error);
        });
        let message = errors.map((error) => {
          return typeof error.stack === "string" ? cleanInternalStack(cleanStack(error.stack)) : String(error);
        }).join("\n");
        message = "\n" + indentString(message, 4);
        super(message);
        __privateAdd(this, _errors, void 0);
        __publicField(this, "name", "AggregateError");
        __privateSet(this, _errors, errors);
      }
      get errors() {
        return __privateGet(this, _errors).slice();
      }
    };
    _errors = new WeakMap();
    pMapSkip = Symbol("skip");
    monacoProm = getMonaco();
    loadMonaco = () => {
      if (!monacoProm)
        monacoProm = getMonaco();
      return monacoProm;
    };
    editor_default = async ({ onChange, code, language, container, options }) => {
      const monaco = await monacoProm;
      const shadowRoot = container.attachShadow({
        mode: "closed"
      });
      const innerContainer = document.createElement("div");
      shadowRoot.appendChild(innerContainer);
      const parent = container.parentElement;
      if (parent) {
        const { width, height } = parent.getClientRects()[0];
        innerContainer.style.width = `${Math.min(window.innerWidth, width)}px`;
        innerContainer.style.height = `${height}px`;
        window.addEventListener("resize", (ev) => {
          const { width: width2, height: height2 } = parent.getClientRects()[0];
          innerContainer.style.width = `${Math.min(window.innerWidth, width2)}px`;
          innerContainer.style.height = `${height2}px`;
        });
      }
      const innerStyle = document.createElement("style");
      innerStyle.innerText = '@import "https://unpkg.com/monaco-editor@0.30.1/min/vs/editor/editor.main.css";';
      shadowRoot.appendChild(innerStyle);
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: 99,
        lib: [
          "DOM",
          "DOM.Iterable",
          "ES2018.Regexp",
          "ES2018.AsyncIterable",
          "ES2018",
          "ES2019"
        ],
        allowNonTsExtensions: true,
        moduleResolution: 2,
        declaration: true,
        noEmit: true,
        noEmitOnError: true,
        jsx: 5,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        allowUmdGlobalAccess: true,
        noLibCheck: true
      });
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSuggestionDiagnostics: true,
        noSemanticValidation: true,
        noSyntaxValidation: true
      });
      const { Uri } = monaco;
      const editor = monaco.editor.create(innerContainer, {
        model: monaco.editor.createModel(code, "typescript", Uri.file("/index.ts")),
        lightbulb: { enabled: true },
        language: "typescript",
        theme: "vs-dark",
        codeLens: true,
        suggest: {
          showStatusBar: true,
          preview: true
        },
        smoothScrolling: true,
        selectionHighlight: true,
        selectOnLineNumbers: true,
        cursorSmoothCaretAnimation: true,
        cursorBlinking: "smooth",
        hideCursorInOverviewRuler: true,
        cursorSurroundingLinesStyle: "all",
        cursorSurroundingLines: 8,
        formatOnPaste: true,
        formatOnType: true,
        useShadowDOM: true
      });
      function getDefaultComplierOpts() {
        return { target: 99, jsx: 1, allowNonTsExtensions: true };
      }
      window.addEventListener("resize", () => {
        editor.layout();
      });
      editor.onDidChangeModelContent((e2) => onChange(editor.getValue(), e2));
      setTimeout(() => loadExtraLibs((content, filePath) => monaco.languages.typescript.typescriptDefaults.addExtraLib(content, filePath), (opts) => monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(opts)), 100);
      return () => editor;
    };
  }
});

// ../renderer/dist/renderer.mjs
var renderer_exports = {};
__export(renderer_exports, {
  DraggableWindow: () => vf,
  Fragment: () => Sf,
  Global: () => Vi,
  Motion: () => Pf,
  React: () => M3,
  css: () => j2,
  default: () => aP,
  jsx: () => w2,
  motion: () => ft2,
  render: () => sP
});
import * as Pf from "https://unpkg.com/@spike.land/esm@0.2.49/dist/framer-motion.mjs";
import M3, { Fragment as Sf } from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as Na from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react-dom.mjs";
import { createElement as Hn2, useContext as Fi, useRef as Ui, useLayoutEffect as Kn2, Fragment as _d } from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { createContext as Fn2, useContext as Un2, forwardRef as Li, createElement as Wr, Fragment as $i } from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as aa from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as cr from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as ur from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as us from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as mr from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as ae3 from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { useContext as ml, createElement as Yr2, Fragment as hl } from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as Ns from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as Eo from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as D2 from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import Dc from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import _r from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { Children as Fc, cloneElement as Sr2, isValidElement as Cr2 } from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as wr2 from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { jsx as Xs2 } from "https://esm.sh/react/jsx-runtime";
import { jsx as Vo2 } from "https://esm.sh/react/jsx-runtime";
import { jsx as ou } from "https://esm.sh/react/jsx-runtime";
import { jsxs as nu } from "https://esm.sh/react/jsx-runtime";
import { jsx as cu } from "https://esm.sh/react/jsx-runtime";
import * as Rr2 from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as la from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { jsx as ca } from "https://esm.sh/react/jsx-runtime";
import { jsxs as gu } from "https://esm.sh/react/jsx-runtime";
import * as da from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { jsx as Eu } from "https://esm.sh/react/jsx-runtime";
import * as Ae from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { jsx as Nu } from "https://esm.sh/react/jsx-runtime";
import * as Br from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as ya from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { jsx as zu } from "https://esm.sh/react/jsx-runtime";
import { jsxs as Lu } from "https://esm.sh/react/jsx-runtime";
import { jsx as Du } from "https://esm.sh/react/jsx-runtime";
function li(e2) {
  if (e2.sheet)
    return e2.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e2)
      return document.styleSheets[t];
}
function pi(e2) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e2.key), e2.nonce !== void 0 && t.setAttribute("nonce", e2.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
function nn2(e2, t) {
  return (((t << 2 ^ q3(e2, 0)) << 2 ^ q3(e2, 1)) << 2 ^ q3(e2, 2)) << 2 ^ q3(e2, 3);
}
function Vt2(e2) {
  return e2.trim();
}
function sn2(e2, t) {
  return (e2 = t.exec(e2)) ? e2[0] : e2;
}
function N2(e2, t, r) {
  return e2.replace(t, r);
}
function mt2(e2, t) {
  return e2.indexOf(t);
}
function q3(e2, t) {
  return e2.charCodeAt(t) | 0;
}
function ke2(e2, t, r) {
  return e2.slice(t, r);
}
function ee2(e2) {
  return e2.length;
}
function Je2(e2) {
  return e2.length;
}
function Ze(e2, t) {
  return t.push(e2), e2;
}
function an2(e2, t) {
  return e2.map(t).join("");
}
function ht2(e2, t, r, o, n, a, c2) {
  return { value: e2, root: t, parent: r, type: o, props: n, children: a, line: Wt2, column: et, length: c2, return: "" };
}
function rt2(e2, t) {
  return on2(ht2("", null, null, "", null, null, 0), e2, { length: -e2.length }, t);
}
function pn2() {
  return U2;
}
function cn() {
  return U2 = te3 > 0 ? q3(tt, --te3) : 0, et--, U2 === 10 && (et = 1, Wt2--), U2;
}
function re3() {
  return U2 = te3 < ln2 ? q3(tt, te3++) : 0, et++, U2 === 10 && (et = 1, Wt2++), U2;
}
function ce2() {
  return q3(tt, te3);
}
function yt2() {
  return te3;
}
function ot(e2, t) {
  return ke2(tt, e2, t);
}
function nt(e2) {
  switch (e2) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Gt2(e2) {
  return Wt2 = et = 1, ln2 = ee2(tt = e2), te3 = 0, [];
}
function Ht2(e2) {
  return tt = "", e2;
}
function st(e2) {
  return Vt2(ot(te3 - 1, zr(e2 === 91 ? e2 + 2 : e2 === 40 ? e2 + 1 : e2)));
}
function un2(e2) {
  for (; (U2 = ce2()) && U2 < 33; )
    re3();
  return nt(e2) > 2 || nt(U2) > 3 ? "" : " ";
}
function fn2(e2, t) {
  for (; --t && re3() && !(U2 < 48 || U2 > 102 || U2 > 57 && U2 < 65 || U2 > 70 && U2 < 97); )
    ;
  return ot(e2, yt2() + (t < 6 && ce2() == 32 && re3() == 32));
}
function zr(e2) {
  for (; re3(); )
    switch (U2) {
      case e2:
        return te3;
      case 34:
      case 39:
        e2 !== 34 && e2 !== 39 && zr(U2);
        break;
      case 40:
        e2 === 41 && zr(e2);
        break;
      case 92:
        re3();
        break;
    }
  return te3;
}
function dn(e2, t) {
  for (; re3() && e2 + U2 !== 47 + 10; )
    if (e2 + U2 === 42 + 42 && ce2() === 47)
      break;
  return "/*" + ot(t, te3 - 1) + "*" + ze2(e2 === 47 ? e2 : re3());
}
function mn2(e2) {
  for (; !nt(ce2()); )
    re3();
  return ot(e2, te3);
}
function hn2(e2) {
  return Ht2(Kt("", null, null, null, [""], e2 = Gt2(e2), 0, [0], e2));
}
function Kt(e2, t, r, o, n, a, c2, f, i) {
  for (var s = 0, l = 0, p = c2, u = 0, m2 = 0, h2 = 0, d2 = 1, y = 1, b2 = 1, P2 = 0, v2 = "", S3 = n, E2 = a, T2 = o, C2 = v2; y; )
    switch (h2 = P2, P2 = re3()) {
      case 40:
        if (h2 != 108 && C2.charCodeAt(p - 1) == 58) {
          mt2(C2 += N2(st(P2), "&", "&\f"), "&\f") != -1 && (b2 = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        C2 += st(P2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        C2 += un2(h2);
        break;
      case 92:
        C2 += fn2(yt2() - 1, 7);
        continue;
      case 47:
        switch (ce2()) {
          case 42:
          case 47:
            Ze(ci(dn(re3(), yt2()), t, r), i);
            break;
          default:
            C2 += "/";
        }
        break;
      case 123 * d2:
        f[s++] = ee2(C2) * b2;
      case 125 * d2:
      case 59:
      case 0:
        switch (P2) {
          case 0:
          case 125:
            y = 0;
          case 59 + l:
            m2 > 0 && ee2(C2) - p && Ze(m2 > 32 ? gn2(C2 + ";", o, r, p - 1) : gn2(N2(C2, " ", "") + ";", o, r, p - 2), i);
            break;
          case 59:
            C2 += ";";
          default:
            if (Ze(T2 = yn2(C2, t, r, s, l, n, f, v2, S3 = [], E2 = [], p), a), P2 === 123)
              if (l === 0)
                Kt(C2, t, T2, T2, S3, a, p, f, E2);
              else
                switch (u) {
                  case 100:
                  case 109:
                  case 115:
                    Kt(e2, T2, T2, o && Ze(yn2(e2, T2, T2, 0, 0, n, f, v2, n, S3 = [], p), E2), n, E2, p, f, o ? S3 : E2);
                    break;
                  default:
                    Kt(C2, T2, T2, T2, [""], E2, 0, f, E2);
                }
        }
        s = l = m2 = 0, d2 = b2 = 1, v2 = C2 = "", p = c2;
        break;
      case 58:
        p = 1 + ee2(C2), m2 = h2;
      default:
        if (d2 < 1) {
          if (P2 == 123)
            --d2;
          else if (P2 == 125 && d2++ == 0 && cn() == 125)
            continue;
        }
        switch (C2 += ze2(P2), P2 * d2) {
          case 38:
            b2 = l > 0 ? 1 : (C2 += "\f", -1);
            break;
          case 44:
            f[s++] = (ee2(C2) - 1) * b2, b2 = 1;
            break;
          case 64:
            ce2() === 45 && (C2 += st(re3())), u = ce2(), l = p = ee2(v2 = C2 += mn2(yt2())), P2++;
            break;
          case 45:
            h2 === 45 && ee2(C2) == 2 && (d2 = 0);
        }
    }
  return a;
}
function yn2(e2, t, r, o, n, a, c2, f, i, s, l) {
  for (var p = n - 1, u = n === 0 ? a : [""], m2 = Je2(u), h2 = 0, d2 = 0, y = 0; h2 < o; ++h2)
    for (var b2 = 0, P2 = ke2(e2, p + 1, p = rn2(d2 = c2[h2])), v2 = e2; b2 < m2; ++b2)
      (v2 = Vt2(d2 > 0 ? u[b2] + " " + P2 : N2(P2, /&\f/g, u[b2]))) && (i[y++] = v2);
  return ht2(e2, t, r, n === 0 ? Xe : f, i, s, l);
}
function ci(e2, t, r) {
  return ht2(e2, t, r, Ft2, ze2(pn2()), ke2(e2, 2, -2), 0);
}
function gn2(e2, t, r, o) {
  return ht2(e2, t, r, Qe, ke2(e2, 0, o), ke2(e2, o + 1, -1), o);
}
function Lr(e2, t) {
  switch (nn2(e2, t)) {
    case 5103:
      return O2 + "print-" + e2 + e2;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return O2 + e2 + e2;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return O2 + e2 + Ye + e2 + W2 + e2 + e2;
    case 6828:
    case 4268:
      return O2 + e2 + W2 + e2 + e2;
    case 6165:
      return O2 + e2 + W2 + "flex-" + e2 + e2;
    case 5187:
      return O2 + e2 + N2(e2, /(\w+).+(:[^]+)/, O2 + "box-$1$2" + W2 + "flex-$1$2") + e2;
    case 5443:
      return O2 + e2 + W2 + "flex-item-" + N2(e2, /flex-|-self/, "") + e2;
    case 4675:
      return O2 + e2 + W2 + "flex-line-pack" + N2(e2, /align-content|flex-|-self/, "") + e2;
    case 5548:
      return O2 + e2 + W2 + N2(e2, "shrink", "negative") + e2;
    case 5292:
      return O2 + e2 + W2 + N2(e2, "basis", "preferred-size") + e2;
    case 6060:
      return O2 + "box-" + N2(e2, "-grow", "") + O2 + e2 + W2 + N2(e2, "grow", "positive") + e2;
    case 4554:
      return O2 + N2(e2, /([^-])(transform)/g, "$1" + O2 + "$2") + e2;
    case 6187:
      return N2(N2(N2(e2, /(zoom-|grab)/, O2 + "$1"), /(image-set)/, O2 + "$1"), e2, "") + e2;
    case 5495:
    case 3959:
      return N2(e2, /(image-set\([^]*)/, O2 + "$1$`$1");
    case 4968:
      return N2(N2(e2, /(.+:)(flex-)?(.*)/, O2 + "box-pack:$3" + W2 + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + O2 + e2 + e2;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return N2(e2, /(.+)-inline(.+)/, O2 + "$1$2") + e2;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (ee2(e2) - 1 - t > 6)
        switch (q3(e2, t + 1)) {
          case 109:
            if (q3(e2, t + 4) !== 45)
              break;
          case 102:
            return N2(e2, /(.+:)(.+)-([^]+)/, "$1" + O2 + "$2-$3$1" + Ye + (q3(e2, t + 3) == 108 ? "$3" : "$2-$3")) + e2;
          case 115:
            return ~mt2(e2, "stretch") ? Lr(N2(e2, "stretch", "fill-available"), t) + e2 : e2;
        }
      break;
    case 4949:
      if (q3(e2, t + 1) !== 115)
        break;
    case 6444:
      switch (q3(e2, ee2(e2) - 3 - (~mt2(e2, "!important") && 10))) {
        case 107:
          return N2(e2, ":", ":" + O2) + e2;
        case 101:
          return N2(e2, /(.+:)([^;!]+)(;|!.+)?/, "$1" + O2 + (q3(e2, 14) === 45 ? "inline-" : "") + "box$3$1" + O2 + "$2$3$1" + W2 + "$2box$3") + e2;
      }
      break;
    case 5936:
      switch (q3(e2, t + 11)) {
        case 114:
          return O2 + e2 + W2 + N2(e2, /[svh]\w+-[tblr]{2}/, "tb") + e2;
        case 108:
          return O2 + e2 + W2 + N2(e2, /[svh]\w+-[tblr]{2}/, "tb-rl") + e2;
        case 45:
          return O2 + e2 + W2 + N2(e2, /[svh]\w+-[tblr]{2}/, "lr") + e2;
      }
      return O2 + e2 + W2 + e2 + e2;
  }
  return e2;
}
function Re2(e2, t) {
  for (var r = "", o = Je2(e2), n = 0; n < o; n++)
    r += t(e2[n], n, e2, t) || "";
  return r;
}
function xn2(e2, t, r, o) {
  switch (e2.type) {
    case tn2:
    case Qe:
      return e2.return = e2.return || e2.value;
    case Ft2:
      return "";
    case Ut2:
      return e2.return = e2.value + "{" + Re2(e2.children, o) + "}";
    case Xe:
      e2.value = e2.props.join(",");
  }
  return ee2(r = Re2(e2.children, o)) ? e2.return = e2.value + "{" + r + "}" : "";
}
function bn2(e2) {
  var t = Je2(e2);
  return function(r, o, n, a) {
    for (var c2 = "", f = 0; f < t; f++)
      c2 += e2[f](r, o, n, a) || "";
    return c2;
  };
}
function vn2(e2) {
  return function(t) {
    t.root || (t = t.return) && e2(t);
  };
}
function Tn2(e2, t, r, o) {
  if (e2.length > -1 && !e2.return)
    switch (e2.type) {
      case Qe:
        e2.return = Lr(e2.value, e2.length);
        break;
      case Ut2:
        return Re2([rt2(e2, { value: N2(e2.value, "@", "@" + O2) })], o);
      case Xe:
        if (e2.length)
          return an2(e2.props, function(n) {
            switch (sn2(n, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return Re2([rt2(e2, { props: [N2(n, /:(read-\w+)/, ":" + Ye + "$1")] })], o);
              case "::placeholder":
                return Re2([rt2(e2, { props: [N2(n, /:(plac\w+)/, ":" + O2 + "input-$1")] }), rt2(e2, { props: [N2(n, /:(plac\w+)/, ":" + Ye + "$1")] }), rt2(e2, { props: [N2(n, /:(plac\w+)/, W2 + "input-$1")] })], o);
            }
            return "";
          });
    }
}
function ui(e2) {
  var t = Object.create(null);
  return function(r) {
    return t[r] === void 0 && (t[r] = e2(r)), t[r];
  };
}
function g() {
  return g = Object.assign || function(e2) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e2[o] = r[o]);
    }
    return e2;
  }, g.apply(this, arguments);
}
function gt2(e2, t, r) {
  var o = "";
  return r.split(" ").forEach(function(n) {
    e2[n] !== void 0 ? t.push(e2[n] + ";") : o += n + " ";
  }), o;
}
function Mi(e2) {
  for (var t = 0, r, o = 0, n = e2.length; n >= 4; ++o, n -= 4)
    r = e2.charCodeAt(o) & 255 | (e2.charCodeAt(++o) & 255) << 8 | (e2.charCodeAt(++o) & 255) << 16 | (e2.charCodeAt(++o) & 255) << 24, r = (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), r ^= r >>> 24, t = (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16) ^ (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (n) {
    case 3:
      t ^= (e2.charCodeAt(o + 2) & 255) << 16;
    case 2:
      t ^= (e2.charCodeAt(o + 1) & 255) << 8;
    case 1:
      t ^= e2.charCodeAt(o) & 255, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
function xt2(e2, t, r) {
  if (r == null)
    return "";
  if (r.__emotion_styles !== void 0)
    return r;
  switch (typeof r) {
    case "boolean":
      return "";
    case "object": {
      if (r.anim === 1)
        return ve2 = { name: r.name, styles: r.styles, next: ve2 }, r.name;
      if (r.styles !== void 0) {
        var o = r.next;
        if (o !== void 0)
          for (; o !== void 0; )
            ve2 = { name: o.name, styles: o.styles, next: ve2 }, o = o.next;
        var n = r.styles + ";";
        return n;
      }
      return zi(e2, t, r);
    }
    case "function": {
      if (e2 !== void 0) {
        var a = ve2, c2 = r(e2);
        return ve2 = a, xt2(e2, t, c2);
      }
      break;
    }
    case "string":
      if (false)
        var f, i;
      break;
  }
  if (t == null)
    return r;
  var s = t[r];
  return s !== void 0 ? s : r;
}
function zi(e2, t, r) {
  var o = "";
  if (Array.isArray(r))
    for (var n = 0; n < r.length; n++)
      o += xt2(e2, t, r[n]) + ";";
  else
    for (var a in r) {
      var c2 = r[a];
      if (typeof c2 != "object")
        t != null && t[c2] !== void 0 ? o += a + "{" + t[c2] + "}" : $n2(c2) && (o += Vr2(a) + ":" + jn2(a, c2) + ";");
      else if (Array.isArray(c2) && typeof c2[0] == "string" && (t == null || t[c2[0]] === void 0))
        for (var f = 0; f < c2.length; f++)
          $n2(c2[f]) && (o += Vr2(a) + ":" + jn2(a, c2[f]) + ";");
      else {
        var i = xt2(e2, t, c2);
        switch (a) {
          case "animation":
          case "animationName": {
            o += Vr2(a) + ":" + i + ";";
            break;
          }
          default:
            o += a + "{" + i + "}";
        }
      }
    }
  return o;
}
function j2() {
  for (var e2 = arguments.length, t = new Array(e2), r = 0; r < e2; r++)
    t[r] = arguments[r];
  return Le2(t);
}
function k2(e2, t) {
  if (e2 == null)
    return {};
  var r = {}, o = Object.keys(e2), n, a;
  for (a = 0; a < o.length; a++)
    n = o[a], !(t.indexOf(n) >= 0) && (r[n] = e2[n]);
  return r;
}
function ts(e2) {
  var t, r, o = "";
  if (typeof e2 == "string" || typeof e2 == "number")
    o += e2;
  else if (typeof e2 == "object")
    if (Array.isArray(e2))
      for (t = 0; t < e2.length; t++)
        e2[t] && (r = ts(e2[t])) && (o && (o += " "), o += r);
    else
      for (t in e2)
        e2[t] && (o && (o += " "), o += t);
  return o;
}
function I2() {
  for (var e2 = 0, t, r, o = ""; e2 < arguments.length; )
    (t = arguments[e2++]) && (r = ts(t)) && (o && (o += " "), o += r);
  return o;
}
function ar2(e2) {
  return e2 !== null && typeof e2 == "object" && e2.constructor === Object;
}
function Q3(e2, t, r = { clone: true }) {
  let o = r.clone ? g({}, e2) : e2;
  return ar2(e2) && ar2(t) && Object.keys(t).forEach((n) => {
    n !== "__proto__" && (ar2(t[n]) && n in e2 && ar2(e2[n]) ? o[n] = Q3(e2[n], t[n], r) : o[n] = t[n]);
  }), o;
}
function Te2(e2) {
  let t = "https://mui.com/production-error/?code=" + e2;
  for (let r = 1; r < arguments.length; r += 1)
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e2 + "; visit " + t + " for the full message.";
}
function Pe2(e2) {
  if (typeof e2 != "string")
    throw new Error(Te2(7));
  return e2.charAt(0).toUpperCase() + e2.slice(1);
}
function pr(e2, t) {
  typeof e2 == "function" ? e2(t) : e2 && (e2.current = t);
}
function fr(e2) {
  let t = ur.useRef(e2);
  return cs(() => {
    t.current = e2;
  }), ur.useCallback((...r) => (0, t.current)(...r), []);
}
function dr2(e2, t) {
  return us.useMemo(() => e2 == null && t == null ? null : (r) => {
    pr(e2, r), pr(t, r);
  }, [e2, t]);
}
function nl(e2) {
  let { type: t, tagName: r } = e2;
  return !!(r === "INPUT" && ol[t] && !e2.readOnly || r === "TEXTAREA" && !e2.readOnly || e2.isContentEditable);
}
function sl(e2) {
  e2.metaKey || e2.altKey || e2.ctrlKey || (hr = true);
}
function qr() {
  hr = false;
}
function al() {
  this.visibilityState === "hidden" && Kr2 && (hr = true);
}
function il(e2) {
  e2.addEventListener("keydown", sl, true), e2.addEventListener("mousedown", qr, true), e2.addEventListener("pointerdown", qr, true), e2.addEventListener("touchstart", qr, true), e2.addEventListener("visibilitychange", al, true);
}
function ll(e2) {
  let { target: t } = e2;
  try {
    return t.matches(":focus-visible");
  } catch (e3) {
  }
  return hr || nl(t);
}
function yr2() {
  let e2 = mr.useCallback((n) => {
    n != null && il(n.ownerDocument);
  }, []), t = mr.useRef(false);
  function r() {
    return t.current ? (Kr2 = true, window.clearTimeout(fs), fs = window.setTimeout(() => {
      Kr2 = false;
    }, 100), t.current = false, true) : false;
  }
  function o(n) {
    return ll(n) ? (t.current = true, true) : false;
  }
  return { isFocusVisibleRef: t, onFocus: o, onBlur: r, ref: e2 };
}
function lt2(e2, t) {
  let r = g({}, t);
  return Object.keys(e2).forEach((o) => {
    r[o] === void 0 && (r[o] = e2[o]);
  }), r;
}
function oe3(e2, t, r) {
  let o = {};
  return Object.keys(e2).forEach((n) => {
    o[n] = e2[n].reduce((a, c2) => (c2 && (r && r[c2] && a.push(r[c2]), a.push(t(c2))), a), []).join(" ");
  }), o;
}
function K3(e2, t) {
  return ul[t] || `${ms.generate(e2)}-${t}`;
}
function Y2(e2, t) {
  let r = {};
  return t.forEach((o) => {
    r[o] = K3(e2, o);
  }), r;
}
function Qr(e2, t) {
  return bs(e2, t);
}
function Tl(e2, t) {
  return t ? Q3(e2, t, { clone: false }) : e2;
}
function se3(e2, t, r) {
  let o = e2.theme || {};
  if (Array.isArray(t)) {
    let a = o.breakpoints || vs;
    return t.reduce((c2, f, i) => (c2[a.up(a.keys[i])] = r(t[i]), c2), {});
  }
  if (typeof t == "object") {
    let a = o.breakpoints || vs;
    return Object.keys(t).reduce((c2, f) => {
      if (Object.keys(a.values || gr).indexOf(f) !== -1) {
        let i = a.up(f);
        c2[i] = r(t[f], f);
      } else {
        let i = f;
        c2[i] = t[i];
      }
      return c2;
    }, {});
  }
  return r(t);
}
function Ts(e2 = {}) {
  var t;
  return (e2 == null || (t = e2.keys) == null ? void 0 : t.reduce((o, n) => {
    let a = e2.up(n);
    return o[a] = {}, o;
  }, {})) || {};
}
function Ps(e2, t) {
  return e2.reduce((r, o) => {
    let n = r[o];
    return (!n || Object.keys(n).length === 0) && delete r[o], r;
  }, t);
}
function xr(e2, t) {
  return !t || typeof t != "string" ? null : t.split(".").reduce((r, o) => r && r[o] ? r[o] : null, e2);
}
function Ss(e2, t, r, o = r) {
  let n;
  return typeof e2 == "function" ? n = e2(r) : Array.isArray(e2) ? n = e2[r] || o : n = xr(e2, r) || o, t && (n = t(n)), n;
}
function Pl(e2) {
  let { prop: t, cssProperty: r = e2.prop, themeKey: o, transform: n } = e2, a = (c2) => {
    if (c2[t] == null)
      return null;
    let f = c2[t], i = c2.theme, s = xr(i, o) || {};
    return se3(c2, f, (p) => {
      let u = Ss(s, n, p);
      return p === u && typeof p == "string" && (u = Ss(s, n, `${t}${p === "default" ? "" : Pe2(p)}`, p)), r === false ? u : { [r]: u };
    });
  };
  return a.propTypes = {}, a.filterProps = [t], a;
}
function Sl(...e2) {
  let t = e2.reduce((o, n) => (n.filterProps.forEach((a) => {
    o[a] = n;
  }), o), {}), r = (o) => Object.keys(o).reduce((n, a) => t[a] ? Oe2(n, t[a](o)) : n, {});
  return r.propTypes = {}, r.filterProps = e2.reduce((o, n) => o.concat(n.filterProps), []), r;
}
function Jr2(e2) {
  let t = {};
  return (r) => (t[r] === void 0 && (t[r] = e2(r)), t[r]);
}
function De(e2, t, r, o) {
  let n = xr(e2, t) || r;
  return typeof n == "number" ? (a) => typeof a == "string" ? a : n * a : Array.isArray(n) ? (a) => typeof a == "string" ? a : n[a] : typeof n == "function" ? n : () => {
  };
}
function to2(e2) {
  return De(e2, "spacing", 8, "spacing");
}
function Fe2(e2, t) {
  if (typeof t == "string" || t == null)
    return t;
  let r = Math.abs(t), o = e2(r);
  return t >= 0 ? o : typeof o == "number" ? -o : `-${o}`;
}
function wl(e2, t) {
  return (r) => e2.reduce((o, n) => (o[n] = Fe2(t, r), o), {});
}
function kl(e2, t, r, o) {
  if (t.indexOf(r) === -1)
    return null;
  let n = _l(r), a = wl(n, o), c2 = e2[r];
  return se3(e2, c2, a);
}
function ro2(e2, t) {
  let r = to2(e2.theme);
  return Object.keys(e2).map((o) => kl(e2, t, o, r)).reduce(Oe2, {});
}
function _s(e2) {
  return ro2(e2, Zr2);
}
function ws(e2) {
  return ro2(e2, eo2);
}
function oo2(e2) {
  return ro2(e2, Es);
}
function kt2(e2) {
  return typeof e2 != "number" ? e2 : `${e2}px solid`;
}
function Ne2(e2) {
  return e2 <= 1 && e2 !== 0 ? `${e2 * 100}%` : e2;
}
function Wp(e2, t, r) {
  let o = { [e2]: t, theme: r }, n = bo[e2];
  return n ? n(o) : { [e2]: t };
}
function Gp(...e2) {
  let t = e2.reduce((o, n) => o.concat(Object.keys(n)), []), r = new Set(t);
  return e2.every((o) => r.size === Object.keys(o).length);
}
function Hp(e2, t) {
  return typeof e2 == "function" ? e2(t) : e2;
}
function To2(e2) {
  let { sx: t, theme: r = {} } = e2 || {};
  if (!t)
    return null;
  function o(n) {
    let a = n;
    if (typeof n == "function")
      a = n(r);
    else if (typeof n != "object")
      return n;
    let c2 = Ts(r.breakpoints), f = Object.keys(c2), i = c2;
    return Object.keys(a).forEach((s) => {
      let l = Hp(a[s], r);
      if (l != null)
        if (typeof l == "object")
          if (bo[s])
            i = Oe2(i, vo(s, l, r));
          else {
            let p = se3({ theme: r }, l, (u) => ({ [s]: u }));
            Gp(p, l) ? i[s] = To2({ sx: l, theme: r }) : i = Oe2(i, p);
          }
        else
          i = Oe2(i, vo(s, l, r));
    }), Ps(f, i);
  }
  return Array.isArray(t) ? t.map(o) : o(t);
}
function So(e2) {
  let { values: t = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 }, unit: r = "px", step: o = 5 } = e2, n = k2(e2, Kp), a = Object.keys(t);
  function c2(l) {
    return `@media (min-width:${typeof t[l] == "number" ? t[l] : l}${r})`;
  }
  function f(l) {
    return `@media (max-width:${(typeof t[l] == "number" ? t[l] : l) - o / 100}${r})`;
  }
  function i(l, p) {
    let u = a.indexOf(p);
    return `@media (min-width:${typeof t[l] == "number" ? t[l] : l}${r}) and (max-width:${(u !== -1 && typeof t[a[u]] == "number" ? t[a[u]] : p) - o / 100}${r})`;
  }
  function s(l) {
    return a.indexOf(l) + 1 < a.length ? i(l, a[a.indexOf(l) + 1]) : c2(l);
  }
  return g({ keys: a, values: t, up: c2, down: f, between: i, only: s, unit: r }, n);
}
function Co2(e2 = 8) {
  if (e2.mui)
    return e2;
  let t = to2({ spacing: e2 }), r = (...o) => (o.length === 0 ? [1] : o).map((a) => {
    let c2 = t(a);
    return typeof c2 == "number" ? `${c2}px` : c2;
  }).join(" ");
  return r.mui = true, r;
}
function Xp(e2 = {}, ...t) {
  let { breakpoints: r = {}, palette: o = {}, spacing: n, shape: a = {} } = e2, c2 = k2(e2, Yp), f = So(r), i = Co2(n), s = Q3({ breakpoints: f, direction: "ltr", components: {}, palette: g({ mode: "light" }, o), spacing: i, shape: g({}, Os, a) }, c2);
  return s = t.reduce((l, p) => Q3(l, p), s), s;
}
function Rt2() {
  return Eo.useContext(Ms);
}
function Jp(e2) {
  return Object.keys(e2).length === 0;
}
function Zp(e2 = null) {
  let t = Rt2();
  return !t || Jp(t) ? e2 : t;
}
function tc(e2 = ec) {
  return Bs(e2);
}
function Is(e2) {
  return e2.length === 0;
}
function br2(e2) {
  let { variant: t } = e2, r = k2(e2, rc), o = t || "";
  return Object.keys(r).sort().forEach((n) => {
    n === "color" ? o += Is(o) ? e2[n] : Pe2(e2[n]) : o += `${Is(o) ? n : Pe2(n)}${Pe2(e2[n].toString())}`;
  }), o;
}
function Ot2(e2) {
  return Object.keys(e2).length === 0;
}
function Nt(e2) {
  return e2 !== "ownerState" && e2 !== "theme" && e2 !== "sx" && e2 !== "as";
}
function vr(e2 = {}) {
  let { defaultTheme: t = pc, rootShouldForwardProp: r = Nt, slotShouldForwardProp: o = Nt } = e2;
  return (n, a = {}) => {
    let { name: c2, slot: f, skipVariantsResolver: i, skipSx: s, overridesResolver: l } = a, p = k2(a, oc), u = i !== void 0 ? i : f && f !== "Root" || false, m2 = s || false, h2, d2 = Nt;
    f === "Root" ? d2 = r : f && (d2 = o);
    let y = Qr(n, g({ shouldForwardProp: d2, label: h2 }, p));
    return (P2, ...v2) => {
      let S3 = v2 ? v2.map((R2) => typeof R2 == "function" && R2.__emotion_real !== R2 ? (F3) => {
        let { theme: $3 } = F3, Z2 = k2(F3, nc);
        return R2(g({ theme: Ot2($3) ? t : $3 }, Z2));
      } : R2) : [], E2 = P2;
      c2 && l && S3.push((R2) => {
        let F3 = Ot2(R2.theme) ? t : R2.theme, $3 = ac(c2, F3);
        return $3 ? l(R2, $3) : null;
      }), c2 && !u && S3.push((R2) => {
        let F3 = Ot2(R2.theme) ? t : R2.theme;
        return lc(R2, ic(c2, F3), F3, c2);
      }), m2 || S3.push((R2) => {
        let F3 = Ot2(R2.theme) ? t : R2.theme;
        return Po2(g({}, R2, { theme: F3 }));
      });
      let T2 = S3.length - v2.length;
      if (Array.isArray(P2) && T2 > 0) {
        let R2 = new Array(T2).fill("");
        E2 = [...P2, ...R2], E2.raw = [...P2.raw, ...R2];
      } else
        typeof P2 == "function" && (E2 = (R2) => {
          let { theme: F3 } = R2, $3 = k2(R2, sc);
          return P2(g({ theme: Ot2(F3) ? t : F3 }, $3));
        });
      return y(E2, ...S3);
    };
  };
}
function Tr(e2) {
  let { theme: t, name: r, props: o } = e2;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? o : lt2(t.components[r].defaultProps, o);
}
function Mt2({ props: e2, name: t, defaultTheme: r }) {
  let o = As(r);
  return Tr({ theme: o, name: t, props: e2 });
}
function _o2(e2, t = 0, r = 1) {
  return Math.min(Math.max(t, e2), r);
}
function zs(e2) {
  e2 = e2.substr(1);
  let t = new RegExp(`.{1,${e2.length >= 6 ? 2 : 1}}`, "g"), r = e2.match(t);
  return r && r[0].length === 1 && (r = r.map((o) => o + o)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((o, n) => n < 3 ? parseInt(o, 16) : Math.round(parseInt(o, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Be(e2) {
  if (e2.type)
    return e2;
  if (e2.charAt(0) === "#")
    return Be(zs(e2));
  let t = e2.indexOf("("), r = e2.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(Te2(9, e2));
  let o = e2.substring(t + 1, e2.length - 1), n;
  if (r === "color") {
    if (o = o.split(" "), n = o.shift(), o.length === 4 && o[3].charAt(0) === "/" && (o[3] = o[3].substr(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(n) === -1)
      throw new Error(Te2(10, n));
  } else
    o = o.split(",");
  return o = o.map((a) => parseFloat(a)), { type: r, values: o, colorSpace: n };
}
function Bt2(e2) {
  let { type: t, colorSpace: r } = e2, { values: o } = e2;
  return t.indexOf("rgb") !== -1 ? o = o.map((n, a) => a < 3 ? parseInt(n, 10) : n) : t.indexOf("hsl") !== -1 && (o[1] = `${o[1]}%`, o[2] = `${o[2]}%`), t.indexOf("color") !== -1 ? o = `${r} ${o.join(" ")}` : o = `${o.join(", ")}`, `${t}(${o})`;
}
function Ls(e2) {
  e2 = Be(e2);
  let { values: t } = e2, r = t[0], o = t[1] / 100, n = t[2] / 100, a = o * Math.min(n, 1 - n), c2 = (s, l = (s + r / 30) % 12) => n - a * Math.max(Math.min(l - 3, 9 - l, 1), -1), f = "rgb", i = [Math.round(c2(0) * 255), Math.round(c2(8) * 255), Math.round(c2(4) * 255)];
  return e2.type === "hsla" && (f += "a", i.push(t[3])), Bt2({ type: f, values: i });
}
function wo(e2) {
  e2 = Be(e2);
  let t = e2.type === "hsl" ? Be(Ls(e2)).values : e2.values;
  return t = t.map((r) => (e2.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function ko(e2, t) {
  let r = wo(e2), o = wo(t);
  return (Math.max(r, o) + 0.05) / (Math.min(r, o) + 0.05);
}
function ye(e2, t) {
  return e2 = Be(e2), t = _o2(t), (e2.type === "rgb" || e2.type === "hsl") && (e2.type += "a"), e2.type === "color" ? e2.values[3] = `/${t}` : e2.values[3] = t, Bt2(e2);
}
function Ro2(e2, t) {
  if (e2 = Be(e2), t = _o2(t), e2.type.indexOf("hsl") !== -1)
    e2.values[2] *= 1 - t;
  else if (e2.type.indexOf("rgb") !== -1 || e2.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e2.values[r] *= 1 - t;
  return Bt2(e2);
}
function Oo2(e2, t) {
  if (e2 = Be(e2), t = _o2(t), e2.type.indexOf("hsl") !== -1)
    e2.values[2] += (100 - e2.values[2]) * t;
  else if (e2.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e2.values[r] += (255 - e2.values[r]) * t;
  else if (e2.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e2.values[r] += (1 - e2.values[r]) * t;
  return Bt2(e2);
}
function No2(e2, t, r) {
  return g({ toolbar: { minHeight: 56, [`${e2.up("xs")} and (orientation: landscape)`]: { minHeight: 48 }, [e2.up("sm")]: { minHeight: 64 } } }, r);
}
function Ds(e2, t, r, o) {
  let n = o.light || o, a = o.dark || o * 1.5;
  e2[t] || (e2.hasOwnProperty(r) ? e2[t] = e2[r] : t === "light" ? e2.light = Oo2(e2.main, n) : t === "dark" && (e2.dark = Ro2(e2.main, a)));
}
function bc(e2 = "light") {
  return e2 === "dark" ? { main: We2[200], light: We2[50], dark: We2[400] } : { main: We2[700], light: We2[400], dark: We2[800] };
}
function vc(e2 = "light") {
  return e2 === "dark" ? { main: Ue2[200], light: Ue2[50], dark: Ue2[400] } : { main: Ue2[500], light: Ue2[300], dark: Ue2[700] };
}
function Tc(e2 = "light") {
  return e2 === "dark" ? { main: Ve2[500], light: Ve2[300], dark: Ve2[700] } : { main: Ve2[700], light: Ve2[400], dark: Ve2[800] };
}
function Pc(e2 = "light") {
  return e2 === "dark" ? { main: Ge[400], light: Ge[300], dark: Ge[700] } : { main: Ge[700], light: Ge[500], dark: Ge[900] };
}
function Sc(e2 = "light") {
  return e2 === "dark" ? { main: He2[400], light: He2[300], dark: He2[700] } : { main: He2[800], light: He2[500], dark: He2[900] };
}
function Cc(e2 = "light") {
  return e2 === "dark" ? { main: ct2[400], light: ct2[300], dark: ct2[700] } : { main: "#ed6c02", light: ct2[500], dark: ct2[900] };
}
function Bo2(e2) {
  let { mode: t = "light", contrastThreshold: r = 3, tonalOffset: o = 0.2 } = e2, n = k2(e2, xc), a = e2.primary || bc(t), c2 = e2.secondary || vc(t), f = e2.error || Tc(t), i = e2.info || Pc(t), s = e2.success || Sc(t), l = e2.warning || Cc(t);
  function p(d2) {
    return ko(d2, Mo2.text.primary) >= r ? Mo2.text.primary : js.text.primary;
  }
  let u = ({ color: d2, name: y, mainShade: b2 = 500, lightShade: P2 = 300, darkShade: v2 = 700 }) => {
    if (d2 = g({}, d2), !d2.main && d2[b2] && (d2.main = d2[b2]), !d2.hasOwnProperty("main"))
      throw new Error(Te2(11, y ? ` (${y})` : "", b2));
    if (typeof d2.main != "string")
      throw new Error(Te2(12, y ? ` (${y})` : "", JSON.stringify(d2.main)));
    return Ds(d2, "light", P2, o), Ds(d2, "dark", v2, o), d2.contrastText || (d2.contrastText = p(d2.main)), d2;
  }, m2 = { dark: Mo2, light: js };
  return Q3(g({ common: pt2, mode: t, primary: u({ color: a, name: "primary" }), secondary: u({ color: c2, name: "secondary", mainShade: "A400", lightShade: "A200", darkShade: "A700" }), error: u({ color: f, name: "error" }), warning: u({ color: l, name: "warning" }), info: u({ color: i, name: "info" }), success: u({ color: s, name: "success" }), grey: $s, contrastThreshold: r, getContrastText: p, augmentColor: u, tonalOffset: o }, m2[t]), n);
}
function _c(e2) {
  return Math.round(e2 * 1e5) / 1e5;
}
function Ao2(e2, t) {
  let r = typeof t == "function" ? t(e2) : t, { fontFamily: o = Us, fontSize: n = 14, fontWeightLight: a = 300, fontWeightRegular: c2 = 400, fontWeightMedium: f = 500, fontWeightBold: i = 700, htmlFontSize: s = 16, allVariants: l, pxToRem: p } = r, u = k2(r, Ec), m2 = n / 14, h2 = p || ((b2) => `${b2 / s * m2}rem`), d2 = (b2, P2, v2, S3, E2) => g({ fontFamily: o, fontWeight: b2, fontSize: h2(P2), lineHeight: v2 }, o === Us ? { letterSpacing: `${_c(S3 / P2)}em` } : {}, E2, l), y = { h1: d2(a, 96, 1.167, -1.5), h2: d2(a, 60, 1.2, -0.5), h3: d2(c2, 48, 1.167, 0), h4: d2(c2, 34, 1.235, 0.25), h5: d2(c2, 24, 1.334, 0), h6: d2(f, 20, 1.6, 0.15), subtitle1: d2(c2, 16, 1.75, 0.15), subtitle2: d2(f, 14, 1.57, 0.1), body1: d2(c2, 16, 1.5, 0.15), body2: d2(c2, 14, 1.43, 0.15), button: d2(f, 14, 1.75, 0.4, Fs), caption: d2(c2, 12, 1.66, 0.4), overline: d2(c2, 12, 2.66, 1, Fs) };
  return Q3(g({ htmlFontSize: s, pxToRem: h2, fontFamily: o, fontSize: n, fontWeightLight: a, fontWeightRegular: c2, fontWeightMedium: f, fontWeightBold: i }, y), u, { clone: false });
}
function L2(...e2) {
  return [`${e2[0]}px ${e2[1]}px ${e2[2]}px ${e2[3]}px rgba(0,0,0,${wc})`, `${e2[4]}px ${e2[5]}px ${e2[6]}px ${e2[7]}px rgba(0,0,0,${kc})`, `${e2[8]}px ${e2[9]}px ${e2[10]}px ${e2[11]}px rgba(0,0,0,${Rc})`].join(",");
}
function Ws(e2) {
  return `${Math.round(e2)}ms`;
}
function Ac(e2) {
  if (!e2)
    return 0;
  let t = e2 / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Io2(e2) {
  let t = g({}, Mc, e2.easing), r = g({}, Bc, e2.duration);
  return g({ getAutoHeightDuration: Ac, create: (n = ["all"], a = {}) => {
    let { duration: c2 = r.standard, easing: f = t.easeInOut, delay: i = 0 } = a, s = k2(a, Nc);
    return (Array.isArray(n) ? n : [n]).map((l) => `${l} ${typeof c2 == "string" ? c2 : Ws(c2)} ${f} ${typeof i == "string" ? i : Ws(i)}`).join(",");
  } }, e2, { easing: t, duration: r });
}
function Lc(e2 = {}, ...t) {
  let { mixins: r = {}, palette: o = {}, transitions: n = {}, typography: a = {} } = e2, c2 = k2(e2, zc), f = Bo2(o), i = Me2(e2), s = Q3(i, { mixins: No2(i.breakpoints, i.spacing, r), palette: f, shadows: Vs.slice(), typography: Ao2(f, a), transitions: Io2(n), zIndex: g({}, Gs) });
  return s = Q3(s, c2), s = t.reduce((l, p) => Q3(l, p), s), s;
}
function ne3({ props: e2, name: t }) {
  return Mt2({ props: e2, name: t, defaultTheme: Pr });
}
function It2(e2, t) {
  return It2 = Object.setPrototypeOf || function(o, n) {
    return o.__proto__ = n, o;
  }, It2(e2, t);
}
function $o2(e2, t) {
  e2.prototype = Object.create(t.prototype), e2.prototype.constructor = e2, It2(e2, t);
}
function Do2(e2) {
  if (e2 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e2;
}
function Er(e2, t) {
  var r = function(a) {
    return t && Cr2(a) ? t(a) : a;
  }, o = Object.create(null);
  return e2 && Fc.map(e2, function(n) {
    return n;
  }).forEach(function(n) {
    o[n.key] = r(n);
  }), o;
}
function Uc(e2, t) {
  e2 = e2 || {}, t = t || {};
  function r(l) {
    return l in t ? t[l] : e2[l];
  }
  var o = Object.create(null), n = [];
  for (var a in e2)
    a in t ? n.length && (o[a] = n, n = []) : n.push(a);
  var c2, f = {};
  for (var i in t) {
    if (o[i])
      for (c2 = 0; c2 < o[i].length; c2++) {
        var s = o[i][c2];
        f[o[i][c2]] = r(s);
      }
    f[i] = r(i);
  }
  for (c2 = 0; c2 < n.length; c2++)
    f[n[c2]] = r(n[c2]);
  return f;
}
function Ke(e2, t, r) {
  return r[t] != null ? r[t] : e2.props[t];
}
function qs(e2, t) {
  return Er(e2.children, function(r) {
    return Sr2(r, { onExited: t.bind(null, r), in: true, appear: Ke(r, "appear", e2), enter: Ke(r, "enter", e2), exit: Ke(r, "exit", e2) });
  });
}
function Ys(e2, t, r) {
  var o = Er(e2.children), n = Uc(t, o);
  return Object.keys(n).forEach(function(a) {
    var c2 = n[a];
    if (!!Cr2(c2)) {
      var f = a in t, i = a in o, s = t[a], l = Cr2(s) && !s.props.in;
      i && (!f || l) ? n[a] = Sr2(c2, { onExited: r.bind(null, c2), in: true, exit: Ke(c2, "exit", e2), enter: Ke(c2, "enter", e2) }) : !i && f && !l ? n[a] = Sr2(c2, { in: false }) : i && f && Cr2(s) && (n[a] = Sr2(c2, { onExited: r.bind(null, c2), in: s.props.in, exit: Ke(c2, "exit", e2), enter: Ke(c2, "enter", e2) }));
    }
  }), n;
}
function Gc(e2) {
  let { className: t, classes: r, pulsate: o = false, rippleX: n, rippleY: a, rippleSize: c2, in: f, onExited: i, timeout: s } = e2, [l, p] = wr2.useState(false), u = I2(t, r.ripple, r.rippleVisible, o && r.ripplePulsate), m2 = { width: c2, height: c2, top: -(c2 / 2) + a, left: -(c2 / 2) + n }, h2 = I2(r.child, l && r.childLeaving, o && r.childPulsate);
  return !f && !l && p(true), wr2.useEffect(() => {
    if (!f && i != null) {
      let d2 = setTimeout(i, s);
      return () => {
        clearTimeout(d2);
      };
    }
  }, [i, f, s]), Xs2("span", { className: u, style: m2, children: Xs2("span", { className: h2 }) });
}
function oa(e2) {
  return K3("MuiButtonBase", e2);
}
function sa(e2) {
  return K3("MuiFab", e2);
}
function ia(e2) {
  return K3("MuiButton", e2);
}
function fa(e2) {
  return K3("MuiToggleButton", e2);
}
function qo2(e2, t) {
  return t === void 0 || e2 === void 0 ? false : Array.isArray(t) ? t.indexOf(e2) >= 0 : e2 === t;
}
function ma(e2) {
  return K3("MuiToggleButtonGroup", e2);
}
function ha(e2) {
  return K3("MuiSvgIcon", e2);
}
function ue3(e2, t) {
  let r = (o, n) => Du(Mr, g({ "data-testid": `${t}Icon`, ref: n }, o, { children: e2 }));
  return r.muiName = Mr.muiName, Br.memo(Br.forwardRef(r));
}
function bf() {
  return w2("div", null, w2(yf, { fallback: w2("div", null, "Sanyi...") }, w2(xf, null)));
}
function Tf(e2) {
  return { __html: e2 };
}
var ei2, jt2, ti2, ri2, oi, ni2, en, si, we2, ai, ii, pe3, En2, wn2, An2, Yn2, Zn2, me, is, ps2, wa, Fu, Yo, Uu, Vu, Wu, Gu, Hu, V3, Ku, Sa, qu, Yu, fe3, Ca, Xu, Qu, Ju, Zu, ef, tf, rf, of, Ea, nf, sf, af, lf, pf, cf, uf, ff, df, mf, _a, ka, Dt2, W2, Ye, O2, Ft2, Xe, Qe, tn2, Ut2, rn2, ze2, on2, Wt2, et, ln2, te3, U2, tt, qt2, fi, di, mi, Pn2, hi, yi, gi2, xi, Sn, Ni, at2, In2, Bi, zn2, Ai, Ii, Ln2, $n2, Vr2, jn2, Dn2, ve2, Le2, sr, Vn2, ji, it2, $e2, Gr2, Wn2, Di, Gn2, Nd, w2, Vi, je2, J1, rl, cs, hr, Kr2, fs, ol, ds2, pl, cl, ms, ul, k1, fl, dl, hs2, yl, gl, ys2, gs, xl, bl, xs, vl, Xr2, bs, mh, Oe2, gr, vs, x, J2, Cl, El, Cs, _l, Zr2, eo2, Es, no2, Rl, Ol, Nl, Ml, Bl, Al, Il, zl, Ll, $l, so2, jl, ao2, Dl, Fl, Ul, Vl, Wl, Gl, io2, Hl, Kl, ql, Yl, Xl, Ql, Jl, Zl, ep, tp, rp, op, np, sp, lo2, po, co2, uo2, ap, ip, lp, pp, cp, up, fp, dp, mp, hp, fo2, yp, gp, xp, bp, mo, vp, Tp, Pp, Sp, Cp, Ep, ho, _p, yo, wp, ks, kp, Rp, Op, Np, ty, ry, Mp, Bp, go, Ap, Ip, zp, Lp, $p, jp, Dp, Fp, Up, xo, Rs, Vp, bo, vo, Po2, Kp, qp, Os, Yp, Me2, Qp, Ms, Bs, ec, As, rc, oc, nc, sc, ac, ic, lc, pc, cc, pt2, uc, $s, fc, Ue2, dc, Ve2, mc, ct2, hc, We2, yc, Ge, gc, He2, xc, js, Mo2, Ec, Fs, Us, wc, kc, Rc, Oc, Vs, Nc, Mc, Bc, Ic, Gs, zc, Hs, $c, Pr, zo2, jc, X2, Lo2, At2, Ks, d1, jo, Xg, Vc, Wc, Fo2, Uo2, n1, Qs, Hc, le3, Kc, kr, Js, Zs2, ea, ta2, Wo2, qc, Yc, Xc, Qc, Jc, Zc, eu, ra, tu, na, ru, su, au, iu, qe2, z2, lu, Go2, pu, uu, fu, du, ut2, gx, mu, zt2, hu, pa, yu, xu, ua, bu, vu, Tu, Pu, Ho2, Wx, Su, Ko, Cu, _u, wu, ku, Or, cb, fb, Ru, Se2, Ou, Mu, Bu, Au, Nr, Nb, wb, Iu, $u, ju, ga, Mr, xa, ba, va2, Ta, Pa, hf, Ra, yf, Oa, gf, xf, eP, vf, ft2, sP, aP;
var init_renderer = __esm({
  "../renderer/dist/renderer.mjs"() {
    ei2 = Object.create;
    jt2 = Object.defineProperty;
    ti2 = Object.getOwnPropertyDescriptor;
    ri2 = Object.getOwnPropertyNames;
    oi = Object.getPrototypeOf, ni2 = Object.prototype.hasOwnProperty;
    en = (e2) => jt2(e2, "__esModule", { value: true });
    si = (e2, t) => () => (e2 && (t = e2(e2 = 0)), t);
    we2 = (e2, t) => () => (t || e2((t = { exports: {} }).exports, t), t.exports), ai = (e2, t) => {
      en(e2);
      for (var r in t)
        jt2(e2, r, { get: t[r], enumerable: true });
    }, ii = (e2, t, r) => {
      if (t && typeof t == "object" || typeof t == "function")
        for (let o of ri2(t))
          !ni2.call(e2, o) && o !== "default" && jt2(e2, o, { get: () => t[o], enumerable: !(r = ti2(t, o)) || r.enumerable });
      return e2;
    }, pe3 = (e2) => ii(en(jt2(e2 != null ? ei2(oi(e2)) : {}, "default", e2 && e2.__esModule && "default" in e2 ? { get: () => e2.default, enumerable: true } : { value: e2, enumerable: true })), e2);
    En2 = we2((B2) => {
      "use strict";
      var G2 = typeof Symbol == "function" && Symbol.for, $r = G2 ? Symbol.for("react.element") : 60103, jr = G2 ? Symbol.for("react.portal") : 60106, Yt = G2 ? Symbol.for("react.fragment") : 60107, Xt = G2 ? Symbol.for("react.strict_mode") : 60108, Qt2 = G2 ? Symbol.for("react.profiler") : 60114, Jt2 = G2 ? Symbol.for("react.provider") : 60109, Zt2 = G2 ? Symbol.for("react.context") : 60110, Dr = G2 ? Symbol.for("react.async_mode") : 60111, er = G2 ? Symbol.for("react.concurrent_mode") : 60111, tr2 = G2 ? Symbol.for("react.forward_ref") : 60112, rr = G2 ? Symbol.for("react.suspense") : 60113, bi = G2 ? Symbol.for("react.suspense_list") : 60120, or = G2 ? Symbol.for("react.memo") : 60115, nr = G2 ? Symbol.for("react.lazy") : 60116, vi = G2 ? Symbol.for("react.block") : 60121, Ti = G2 ? Symbol.for("react.fundamental") : 60117, Pi = G2 ? Symbol.for("react.responder") : 60118, Si = G2 ? Symbol.for("react.scope") : 60119;
      function ie3(e2) {
        if (typeof e2 == "object" && e2 !== null) {
          var t = e2.$$typeof;
          switch (t) {
            case $r:
              switch (e2 = e2.type, e2) {
                case Dr:
                case er:
                case Yt:
                case Qt2:
                case Xt:
                case rr:
                  return e2;
                default:
                  switch (e2 = e2 && e2.$$typeof, e2) {
                    case Zt2:
                    case tr2:
                    case nr:
                    case or:
                    case Jt2:
                      return e2;
                    default:
                      return t;
                  }
              }
            case jr:
              return t;
          }
        }
      }
      function Cn2(e2) {
        return ie3(e2) === er;
      }
      B2.AsyncMode = Dr;
      B2.ConcurrentMode = er;
      B2.ContextConsumer = Zt2;
      B2.ContextProvider = Jt2;
      B2.Element = $r;
      B2.ForwardRef = tr2;
      B2.Fragment = Yt;
      B2.Lazy = nr;
      B2.Memo = or;
      B2.Portal = jr;
      B2.Profiler = Qt2;
      B2.StrictMode = Xt;
      B2.Suspense = rr;
      B2.isAsyncMode = function(e2) {
        return Cn2(e2) || ie3(e2) === Dr;
      };
      B2.isConcurrentMode = Cn2;
      B2.isContextConsumer = function(e2) {
        return ie3(e2) === Zt2;
      };
      B2.isContextProvider = function(e2) {
        return ie3(e2) === Jt2;
      };
      B2.isElement = function(e2) {
        return typeof e2 == "object" && e2 !== null && e2.$$typeof === $r;
      };
      B2.isForwardRef = function(e2) {
        return ie3(e2) === tr2;
      };
      B2.isFragment = function(e2) {
        return ie3(e2) === Yt;
      };
      B2.isLazy = function(e2) {
        return ie3(e2) === nr;
      };
      B2.isMemo = function(e2) {
        return ie3(e2) === or;
      };
      B2.isPortal = function(e2) {
        return ie3(e2) === jr;
      };
      B2.isProfiler = function(e2) {
        return ie3(e2) === Qt2;
      };
      B2.isStrictMode = function(e2) {
        return ie3(e2) === Xt;
      };
      B2.isSuspense = function(e2) {
        return ie3(e2) === rr;
      };
      B2.isValidElementType = function(e2) {
        return typeof e2 == "string" || typeof e2 == "function" || e2 === Yt || e2 === er || e2 === Qt2 || e2 === Xt || e2 === rr || e2 === bi || typeof e2 == "object" && e2 !== null && (e2.$$typeof === nr || e2.$$typeof === or || e2.$$typeof === Jt2 || e2.$$typeof === Zt2 || e2.$$typeof === tr2 || e2.$$typeof === Ti || e2.$$typeof === Pi || e2.$$typeof === Si || e2.$$typeof === vi);
      };
      B2.typeOf = ie3;
    });
    wn2 = we2((nd, _n2) => {
      "use strict";
      _n2.exports = En2();
    });
    An2 = we2((sd, Bn2) => {
      "use strict";
      var Fr = wn2(), Ci = { childContextTypes: true, contextType: true, contextTypes: true, defaultProps: true, displayName: true, getDefaultProps: true, getDerivedStateFromError: true, getDerivedStateFromProps: true, mixins: true, propTypes: true, type: true }, Ei = { name: true, length: true, prototype: true, caller: true, callee: true, arguments: true, arity: true }, _i = { $$typeof: true, render: true, defaultProps: true, displayName: true, propTypes: true }, kn2 = { $$typeof: true, compare: true, defaultProps: true, displayName: true, propTypes: true, type: true }, Ur2 = {};
      Ur2[Fr.ForwardRef] = _i;
      Ur2[Fr.Memo] = kn2;
      function Rn2(e2) {
        return Fr.isMemo(e2) ? kn2 : Ur2[e2.$$typeof] || Ci;
      }
      var wi = Object.defineProperty, ki = Object.getOwnPropertyNames, On2 = Object.getOwnPropertySymbols, Ri = Object.getOwnPropertyDescriptor, Oi = Object.getPrototypeOf, Nn2 = Object.prototype;
      function Mn2(e2, t, r) {
        if (typeof t != "string") {
          if (Nn2) {
            var o = Oi(t);
            o && o !== Nn2 && Mn2(e2, o, r);
          }
          var n = ki(t);
          On2 && (n = n.concat(On2(t)));
          for (var a = Rn2(e2), c2 = Rn2(t), f = 0; f < n.length; ++f) {
            var i = n[f];
            if (!Ei[i] && !(r && r[i]) && !(c2 && c2[i]) && !(a && a[i])) {
              var s = Ri(t, i);
              try {
                wi(e2, i, s);
              } catch (e3) {
              }
            }
          }
        }
        return e2;
      }
      Bn2.exports = Mn2;
    });
    Yn2 = we2(($d, qn2) => {
      "use strict";
      var Wi = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      qn2.exports = Wi;
    });
    Zn2 = we2((jd, Jn2) => {
      "use strict";
      var Gi = Yn2();
      function Xn2() {
      }
      function Qn2() {
      }
      Qn2.resetWarningCache = Xn2;
      Jn2.exports = function() {
        function e2(o, n, a, c2, f, i) {
          if (i !== Gi) {
            var s = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
            throw s.name = "Invariant Violation", s;
          }
        }
        e2.isRequired = e2;
        function t() {
          return e2;
        }
        var r = { array: e2, bool: e2, func: e2, number: e2, object: e2, string: e2, symbol: e2, any: e2, arrayOf: t, element: e2, elementType: e2, instanceOf: t, node: e2, objectOf: t, oneOf: t, oneOfType: t, shape: t, exact: t, checkPropTypes: Qn2, resetWarningCache: Xn2 };
        return r.PropTypes = r, r;
      };
    });
    me = we2((Ud, es) => {
      es.exports = Zn2()();
      var Dd, Fd;
    });
    is = we2((A3) => {
      "use strict";
      var ir2 = 60103, lr = 60106, bt2 = 60107, vt2 = 60108, Tt = 60114, Pt2 = 60109, St2 = 60110, Ct2 = 60112, Et2 = 60113, Hr = 60120, _t2 = 60115, wt2 = 60116, rs = 60121, os = 60122, ns = 60117, ss = 60129, as = 60131;
      typeof Symbol == "function" && Symbol.for && (H3 = Symbol.for, ir2 = H3("react.element"), lr = H3("react.portal"), bt2 = H3("react.fragment"), vt2 = H3("react.strict_mode"), Tt = H3("react.profiler"), Pt2 = H3("react.provider"), St2 = H3("react.context"), Ct2 = H3("react.forward_ref"), Et2 = H3("react.suspense"), Hr = H3("react.suspense_list"), _t2 = H3("react.memo"), wt2 = H3("react.lazy"), rs = H3("react.block"), os = H3("react.server.block"), ns = H3("react.fundamental"), ss = H3("react.debug_trace_mode"), as = H3("react.legacy_hidden"));
      var H3;
      function he2(e2) {
        if (typeof e2 == "object" && e2 !== null) {
          var t = e2.$$typeof;
          switch (t) {
            case ir2:
              switch (e2 = e2.type, e2) {
                case bt2:
                case Tt:
                case vt2:
                case Et2:
                case Hr:
                  return e2;
                default:
                  switch (e2 = e2 && e2.$$typeof, e2) {
                    case St2:
                    case Ct2:
                    case wt2:
                    case _t2:
                    case Pt2:
                      return e2;
                    default:
                      return t;
                  }
              }
            case lr:
              return t;
          }
        }
      }
      var Hi = Pt2, Ki = ir2, qi = Ct2, Yi = bt2, Xi = wt2, Qi = _t2, Ji = lr, Zi = Tt, el = vt2, tl = Et2;
      A3.ContextConsumer = St2;
      A3.ContextProvider = Hi;
      A3.Element = Ki;
      A3.ForwardRef = qi;
      A3.Fragment = Yi;
      A3.Lazy = Xi;
      A3.Memo = Qi;
      A3.Portal = Ji;
      A3.Profiler = Zi;
      A3.StrictMode = el;
      A3.Suspense = tl;
      A3.isAsyncMode = function() {
        return false;
      };
      A3.isConcurrentMode = function() {
        return false;
      };
      A3.isContextConsumer = function(e2) {
        return he2(e2) === St2;
      };
      A3.isContextProvider = function(e2) {
        return he2(e2) === Pt2;
      };
      A3.isElement = function(e2) {
        return typeof e2 == "object" && e2 !== null && e2.$$typeof === ir2;
      };
      A3.isForwardRef = function(e2) {
        return he2(e2) === Ct2;
      };
      A3.isFragment = function(e2) {
        return he2(e2) === bt2;
      };
      A3.isLazy = function(e2) {
        return he2(e2) === wt2;
      };
      A3.isMemo = function(e2) {
        return he2(e2) === _t2;
      };
      A3.isPortal = function(e2) {
        return he2(e2) === lr;
      };
      A3.isProfiler = function(e2) {
        return he2(e2) === Tt;
      };
      A3.isStrictMode = function(e2) {
        return he2(e2) === vt2;
      };
      A3.isSuspense = function(e2) {
        return he2(e2) === Et2;
      };
      A3.isValidElementType = function(e2) {
        return typeof e2 == "string" || typeof e2 == "function" || e2 === bt2 || e2 === Tt || e2 === ss || e2 === vt2 || e2 === Et2 || e2 === Hr || e2 === as || typeof e2 == "object" && e2 !== null && (e2.$$typeof === wt2 || e2.$$typeof === _t2 || e2.$$typeof === Pt2 || e2.$$typeof === St2 || e2.$$typeof === Ct2 || e2.$$typeof === ns || e2.$$typeof === rs || e2[0] === os);
      };
      A3.typeOf = he2;
    });
    ps2 = we2((qd, ls) => {
      "use strict";
      ls.exports = is();
    });
    wa = {};
    ai(wa, { QRious: () => _a });
    ka = si(() => {
      Fu = Object.create, Yo = Object.defineProperty, Uu = Object.getOwnPropertyDescriptor, Vu = Object.getOwnPropertyNames, Wu = Object.getPrototypeOf, Gu = Object.prototype.hasOwnProperty, Hu = (e2) => Yo(e2, "__esModule", { value: true }), V3 = (e2, t) => () => (t || e2((t = { exports: {} }).exports, t), t.exports), Ku = (e2, t, r) => {
        if (t && typeof t == "object" || typeof t == "function")
          for (let o of Vu(t))
            !Gu.call(e2, o) && o !== "default" && Yo(e2, o, { get: () => t[o], enumerable: !(r = Uu(t, o)) || r.enumerable });
        return e2;
      }, Sa = (e2) => Ku(Hu(Yo(e2 != null ? Fu(Wu(e2)) : {}, "default", e2 && e2.__esModule && "default" in e2 ? { get: () => e2.default, enumerable: true } : { value: e2, enumerable: true })), e2), qu = V3((e2, t) => {
        "use strict";
        var r = function() {
        }, o = Object.prototype.hasOwnProperty, n = Array.prototype.slice;
        function a(i, s) {
          var l;
          return typeof Object.create == "function" ? l = Object.create(i) : (r.prototype = i, l = new r(), r.prototype = null), s && f(true, l, s), l;
        }
        function c2(i, s, l, p) {
          var u = this;
          return typeof i != "string" && (p = l, l = s, s = i, i = null), typeof s != "function" && (p = l, l = s, s = function() {
            return u.apply(this, arguments);
          }), f(false, s, u, p), s.prototype = a(u.prototype, l), s.prototype.constructor = s, s.class_ = i || u.class_, s.super_ = u, s;
        }
        function f(i, s, l) {
          l = n.call(arguments, 2);
          for (var p, u, m2 = 0, h2 = l.length; m2 < h2; m2++) {
            u = l[m2];
            for (p in u)
              (!i || o.call(u, p)) && (s[p] = u[p]);
          }
        }
        t.exports = c2;
      }), Yu = V3((e2, t) => {
        "use strict";
        var r = qu();
        function o() {
        }
        o.class_ = "Nevis", o.super_ = Object, o.extend = r, t.exports = o;
      }), fe3 = V3((e2, t) => {
        "use strict";
        t.exports = Yu();
      }), Ca = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = r.extend(function(n, a, c2) {
          this.qrious = n, this.element = a, this.element.qrious = n, this.enabled = Boolean(c2);
        }, { draw: function(n) {
        }, getElement: function() {
          return this.enabled || (this.enabled = true, this.render()), this.element;
        }, getModuleSize: function(n) {
          var a = this.qrious, c2 = a.padding || 0, f = Math.floor((a.size - c2 * 2) / n.width);
          return Math.max(1, f);
        }, getOffset: function(n) {
          var a = this.qrious, c2 = a.padding;
          if (c2 != null)
            return c2;
          var f = this.getModuleSize(n), i = Math.floor((a.size - f * n.width) / 2);
          return Math.max(0, i);
        }, render: function(n) {
          this.enabled && (this.resize(), this.reset(), this.draw(n));
        }, reset: function() {
        }, resize: function() {
        } });
        t.exports = o;
      }), Xu = V3((e2, t) => {
        "use strict";
        var r = Ca(), o = r.extend({ draw: function(n) {
          var a, c2, f = this.qrious, i = this.getModuleSize(n), s = this.getOffset(n), l = this.element.getContext("2d");
          for (l.fillStyle = f.foreground, l.globalAlpha = f.foregroundAlpha, a = 0; a < n.width; a++)
            for (c2 = 0; c2 < n.width; c2++)
              n.buffer[c2 * n.width + a] && l.fillRect(i * a + s, i * c2 + s, i, i);
        }, reset: function() {
          var n = this.qrious, a = this.element.getContext("2d"), c2 = n.size;
          a.lineWidth = 1, a.clearRect(0, 0, c2, c2), a.fillStyle = n.background, a.globalAlpha = n.backgroundAlpha, a.fillRect(0, 0, c2, c2);
        }, resize: function() {
          var n = this.element;
          n.width = n.height = this.qrious.size;
        } });
        t.exports = o;
      }), Qu = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = r.extend(null, { BLOCK: [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28] });
        t.exports = o;
      }), Ju = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = r.extend(null, { BLOCKS: [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30], FINAL_FORMAT: [30660, 29427, 32170, 30877, 26159, 25368, 27713, 26998, 21522, 20773, 24188, 23371, 17913, 16590, 20375, 19104, 13663, 12392, 16177, 14854, 9396, 8579, 11994, 11245, 5769, 5054, 7399, 6608, 1890, 597, 3340, 2107], LEVELS: { L: 1, M: 2, Q: 3, H: 4 } });
        t.exports = o;
      }), Zu = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = r.extend(null, { EXPONENT: [1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 0], LOG: [255, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175] });
        t.exports = o;
      }), ef = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = r.extend(null, { BLOCK: [3220, 1468, 2713, 1235, 3062, 1890, 2119, 1549, 2344, 2936, 1117, 2583, 1330, 2470, 1667, 2249, 2028, 3780, 481, 4011, 142, 3098, 831, 3445, 592, 2517, 1776, 2234, 1951, 2827, 1070, 2660, 1345, 3177] });
        t.exports = o;
      }), tf = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = Qu(), n = Ju(), a = Zu(), c2 = ef(), f = r.extend(function(i) {
          var s, l, p, u, m2, h2 = i.value.length;
          for (this._badness = [], this._level = n.LEVELS[i.level], this._polynomial = [], this._value = i.value, this._version = 0, this._stringBuffer = []; this._version < 40 && (this._version++, p = (this._level - 1) * 4 + (this._version - 1) * 16, u = n.BLOCKS[p++], m2 = n.BLOCKS[p++], s = n.BLOCKS[p++], l = n.BLOCKS[p], p = s * (u + m2) + m2 - 3 + (this._version <= 9), !(h2 <= p)); )
            ;
          this._dataBlock = s, this._eccBlock = l, this._neccBlock1 = u, this._neccBlock2 = m2;
          var d2 = this.width = 17 + 4 * this._version;
          this.buffer = f._createArray(d2 * d2), this._ecc = f._createArray(s + (s + l) * (u + m2) + m2), this._mask = f._createArray((d2 * (d2 + 1) + 1) / 2), this._insertFinders(), this._insertAlignments(), this.buffer[8 + d2 * (d2 - 8)] = 1, this._insertTimingGap(), this._reverseMask(), this._insertTimingRowAndColumn(), this._insertVersion(), this._syncMask(), this._convertBitStream(h2), this._calculatePolynomial(), this._appendEccToData(), this._interleaveBlocks(), this._pack(), this._finish();
        }, { _addAlignment: function(i, s) {
          var l, p = this.buffer, u = this.width;
          for (p[i + u * s] = 1, l = -2; l < 2; l++)
            p[i + l + u * (s - 2)] = 1, p[i - 2 + u * (s + l + 1)] = 1, p[i + 2 + u * (s + l)] = 1, p[i + l + 1 + u * (s + 2)] = 1;
          for (l = 0; l < 2; l++)
            this._setMask(i - 1, s + l), this._setMask(i + 1, s - l), this._setMask(i - l, s - 1), this._setMask(i + l, s + 1);
        }, _appendData: function(i, s, l, p) {
          var u, m2, h2, d2 = this._polynomial, y = this._stringBuffer;
          for (m2 = 0; m2 < p; m2++)
            y[l + m2] = 0;
          for (m2 = 0; m2 < s; m2++) {
            if (u = a.LOG[y[i + m2] ^ y[l]], u !== 255)
              for (h2 = 1; h2 < p; h2++)
                y[l + h2 - 1] = y[l + h2] ^ a.EXPONENT[f._modN(u + d2[p - h2])];
            else
              for (h2 = l; h2 < l + p; h2++)
                y[h2] = y[h2 + 1];
            y[l + p - 1] = u === 255 ? 0 : a.EXPONENT[f._modN(u + d2[0])];
          }
        }, _appendEccToData: function() {
          var i, s = 0, l = this._dataBlock, p = this._calculateMaxLength(), u = this._eccBlock;
          for (i = 0; i < this._neccBlock1; i++)
            this._appendData(s, l, p, u), s += l, p += u;
          for (i = 0; i < this._neccBlock2; i++)
            this._appendData(s, l + 1, p, u), s += l + 1, p += u;
        }, _applyMask: function(i) {
          var s, l, p, u, m2 = this.buffer, h2 = this.width;
          switch (i) {
            case 0:
              for (u = 0; u < h2; u++)
                for (p = 0; p < h2; p++)
                  !(p + u & 1) && !this._isMasked(p, u) && (m2[p + u * h2] ^= 1);
              break;
            case 1:
              for (u = 0; u < h2; u++)
                for (p = 0; p < h2; p++)
                  !(u & 1) && !this._isMasked(p, u) && (m2[p + u * h2] ^= 1);
              break;
            case 2:
              for (u = 0; u < h2; u++)
                for (s = 0, p = 0; p < h2; p++, s++)
                  s === 3 && (s = 0), !s && !this._isMasked(p, u) && (m2[p + u * h2] ^= 1);
              break;
            case 3:
              for (l = 0, u = 0; u < h2; u++, l++)
                for (l === 3 && (l = 0), s = l, p = 0; p < h2; p++, s++)
                  s === 3 && (s = 0), !s && !this._isMasked(p, u) && (m2[p + u * h2] ^= 1);
              break;
            case 4:
              for (u = 0; u < h2; u++)
                for (s = 0, l = u >> 1 & 1, p = 0; p < h2; p++, s++)
                  s === 3 && (s = 0, l = !l), !l && !this._isMasked(p, u) && (m2[p + u * h2] ^= 1);
              break;
            case 5:
              for (l = 0, u = 0; u < h2; u++, l++)
                for (l === 3 && (l = 0), s = 0, p = 0; p < h2; p++, s++)
                  s === 3 && (s = 0), !((p & u & 1) + !(!s | !l)) && !this._isMasked(p, u) && (m2[p + u * h2] ^= 1);
              break;
            case 6:
              for (l = 0, u = 0; u < h2; u++, l++)
                for (l === 3 && (l = 0), s = 0, p = 0; p < h2; p++, s++)
                  s === 3 && (s = 0), !((p & u & 1) + (s && s === l) & 1) && !this._isMasked(p, u) && (m2[p + u * h2] ^= 1);
              break;
            case 7:
              for (l = 0, u = 0; u < h2; u++, l++)
                for (l === 3 && (l = 0), s = 0, p = 0; p < h2; p++, s++)
                  s === 3 && (s = 0), !((s && s === l) + (p + u & 1) & 1) && !this._isMasked(p, u) && (m2[p + u * h2] ^= 1);
              break;
          }
        }, _calculateMaxLength: function() {
          return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
        }, _calculatePolynomial: function() {
          var i, s, l = this._eccBlock, p = this._polynomial;
          for (p[0] = 1, i = 0; i < l; i++) {
            for (p[i + 1] = 1, s = i; s > 0; s--)
              p[s] = p[s] ? p[s - 1] ^ a.EXPONENT[f._modN(a.LOG[p[s]] + i)] : p[s - 1];
            p[0] = a.EXPONENT[f._modN(a.LOG[p[0]] + i)];
          }
          for (i = 0; i <= l; i++)
            p[i] = a.LOG[p[i]];
        }, _checkBadness: function() {
          var i, s, l, p, u, m2 = 0, h2 = this._badness, d2 = this.buffer, y = this.width;
          for (u = 0; u < y - 1; u++)
            for (p = 0; p < y - 1; p++)
              (d2[p + y * u] && d2[p + 1 + y * u] && d2[p + y * (u + 1)] && d2[p + 1 + y * (u + 1)] || !(d2[p + y * u] || d2[p + 1 + y * u] || d2[p + y * (u + 1)] || d2[p + 1 + y * (u + 1)])) && (m2 += f.N2);
          var b2 = 0;
          for (u = 0; u < y; u++) {
            for (l = 0, h2[0] = 0, i = 0, p = 0; p < y; p++)
              s = d2[p + y * u], i === s ? h2[l]++ : h2[++l] = 1, i = s, b2 += i ? 1 : -1;
            m2 += this._getBadness(l);
          }
          b2 < 0 && (b2 = -b2);
          var P2 = 0, v2 = b2;
          for (v2 += v2 << 2, v2 <<= 1; v2 > y * y; )
            v2 -= y * y, P2++;
          for (m2 += P2 * f.N4, p = 0; p < y; p++) {
            for (l = 0, h2[0] = 0, i = 0, u = 0; u < y; u++)
              s = d2[p + y * u], i === s ? h2[l]++ : h2[++l] = 1, i = s;
            m2 += this._getBadness(l);
          }
          return m2;
        }, _convertBitStream: function(i) {
          var s, l, p = this._ecc, u = this._version;
          for (l = 0; l < i; l++)
            p[l] = this._value.charCodeAt(l);
          var m2 = this._stringBuffer = p.slice(), h2 = this._calculateMaxLength();
          i >= h2 - 2 && (i = h2 - 2, u > 9 && i--);
          var d2 = i;
          if (u > 9) {
            for (m2[d2 + 2] = 0, m2[d2 + 3] = 0; d2--; )
              s = m2[d2], m2[d2 + 3] |= 255 & s << 4, m2[d2 + 2] = s >> 4;
            m2[2] |= 255 & i << 4, m2[1] = i >> 4, m2[0] = 64 | i >> 12;
          } else {
            for (m2[d2 + 1] = 0, m2[d2 + 2] = 0; d2--; )
              s = m2[d2], m2[d2 + 2] |= 255 & s << 4, m2[d2 + 1] = s >> 4;
            m2[1] |= 255 & i << 4, m2[0] = 64 | i >> 4;
          }
          for (d2 = i + 3 - (u < 10); d2 < h2; )
            m2[d2++] = 236, m2[d2++] = 17;
        }, _getBadness: function(i) {
          var s, l = 0, p = this._badness;
          for (s = 0; s <= i; s++)
            p[s] >= 5 && (l += f.N1 + p[s] - 5);
          for (s = 3; s < i - 1; s += 2)
            p[s - 2] === p[s + 2] && p[s + 2] === p[s - 1] && p[s - 1] === p[s + 1] && p[s - 1] * 3 === p[s] && (p[s - 3] === 0 || s + 3 > i || p[s - 3] * 3 >= p[s] * 4 || p[s + 3] * 3 >= p[s] * 4) && (l += f.N3);
          return l;
        }, _finish: function() {
          this._stringBuffer = this.buffer.slice();
          var i, s, l = 0, p = 3e4;
          for (s = 0; s < 8 && (this._applyMask(s), i = this._checkBadness(), i < p && (p = i, l = s), l !== 7); s++)
            this.buffer = this._stringBuffer.slice();
          l !== s && this._applyMask(l), p = n.FINAL_FORMAT[l + (this._level - 1 << 3)];
          var u = this.buffer, m2 = this.width;
          for (s = 0; s < 8; s++, p >>= 1)
            p & 1 && (u[m2 - 1 - s + m2 * 8] = 1, s < 6 ? u[8 + m2 * s] = 1 : u[8 + m2 * (s + 1)] = 1);
          for (s = 0; s < 7; s++, p >>= 1)
            p & 1 && (u[8 + m2 * (m2 - 7 + s)] = 1, s ? u[6 - s + m2 * 8] = 1 : u[7 + m2 * 8] = 1);
        }, _interleaveBlocks: function() {
          var i, s, l = this._dataBlock, p = this._ecc, u = this._eccBlock, m2 = 0, h2 = this._calculateMaxLength(), d2 = this._neccBlock1, y = this._neccBlock2, b2 = this._stringBuffer;
          for (i = 0; i < l; i++) {
            for (s = 0; s < d2; s++)
              p[m2++] = b2[i + s * l];
            for (s = 0; s < y; s++)
              p[m2++] = b2[d2 * l + i + s * (l + 1)];
          }
          for (s = 0; s < y; s++)
            p[m2++] = b2[d2 * l + i + s * (l + 1)];
          for (i = 0; i < u; i++)
            for (s = 0; s < d2 + y; s++)
              p[m2++] = b2[h2 + i + s * u];
          this._stringBuffer = p;
        }, _insertAlignments: function() {
          var i, s, l, p = this._version, u = this.width;
          if (p > 1)
            for (i = o.BLOCK[p], l = u - 7; ; ) {
              for (s = u - 7; s > i - 3 && (this._addAlignment(s, l), !(s < i)); )
                s -= i;
              if (l <= i + 9)
                break;
              l -= i, this._addAlignment(6, l), this._addAlignment(l, 6);
            }
        }, _insertFinders: function() {
          var i, s, l, p, u = this.buffer, m2 = this.width;
          for (i = 0; i < 3; i++) {
            for (s = 0, p = 0, i === 1 && (s = m2 - 7), i === 2 && (p = m2 - 7), u[p + 3 + m2 * (s + 3)] = 1, l = 0; l < 6; l++)
              u[p + l + m2 * s] = 1, u[p + m2 * (s + l + 1)] = 1, u[p + 6 + m2 * (s + l)] = 1, u[p + l + 1 + m2 * (s + 6)] = 1;
            for (l = 1; l < 5; l++)
              this._setMask(p + l, s + 1), this._setMask(p + 1, s + l + 1), this._setMask(p + 5, s + l), this._setMask(p + l + 1, s + 5);
            for (l = 2; l < 4; l++)
              u[p + l + m2 * (s + 2)] = 1, u[p + 2 + m2 * (s + l + 1)] = 1, u[p + 4 + m2 * (s + l)] = 1, u[p + l + 1 + m2 * (s + 4)] = 1;
          }
        }, _insertTimingGap: function() {
          var i, s, l = this.width;
          for (s = 0; s < 7; s++)
            this._setMask(7, s), this._setMask(l - 8, s), this._setMask(7, s + l - 7);
          for (i = 0; i < 8; i++)
            this._setMask(i, 7), this._setMask(i + l - 8, 7), this._setMask(i, l - 8);
        }, _insertTimingRowAndColumn: function() {
          var i, s = this.buffer, l = this.width;
          for (i = 0; i < l - 14; i++)
            i & 1 ? (this._setMask(8 + i, 6), this._setMask(6, 8 + i)) : (s[8 + i + l * 6] = 1, s[6 + l * (8 + i)] = 1);
        }, _insertVersion: function() {
          var i, s, l, p, u = this.buffer, m2 = this._version, h2 = this.width;
          if (m2 > 6)
            for (i = c2.BLOCK[m2 - 7], s = 17, l = 0; l < 6; l++)
              for (p = 0; p < 3; p++, s--)
                1 & (s > 11 ? m2 >> s - 12 : i >> s) ? (u[5 - l + h2 * (2 - p + h2 - 11)] = 1, u[2 - p + h2 - 11 + h2 * (5 - l)] = 1) : (this._setMask(5 - l, 2 - p + h2 - 11), this._setMask(2 - p + h2 - 11, 5 - l));
        }, _isMasked: function(i, s) {
          var l = f._getMaskBit(i, s);
          return this._mask[l] === 1;
        }, _pack: function() {
          var i, s, l, p = 1, u = 1, m2 = this.width, h2 = m2 - 1, d2 = m2 - 1, y = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
          for (s = 0; s < y; s++)
            for (i = this._stringBuffer[s], l = 0; l < 8; l++, i <<= 1) {
              128 & i && (this.buffer[h2 + m2 * d2] = 1);
              do
                u ? h2-- : (h2++, p ? d2 !== 0 ? d2-- : (h2 -= 2, p = !p, h2 === 6 && (h2--, d2 = 9)) : d2 !== m2 - 1 ? d2++ : (h2 -= 2, p = !p, h2 === 6 && (h2--, d2 -= 8))), u = !u;
              while (this._isMasked(h2, d2));
            }
        }, _reverseMask: function() {
          var i, s, l = this.width;
          for (i = 0; i < 9; i++)
            this._setMask(i, 8);
          for (i = 0; i < 8; i++)
            this._setMask(i + l - 8, 8), this._setMask(8, i);
          for (s = 0; s < 7; s++)
            this._setMask(8, s + l - 7);
        }, _setMask: function(i, s) {
          var l = f._getMaskBit(i, s);
          this._mask[l] = 1;
        }, _syncMask: function() {
          var i, s, l = this.width;
          for (s = 0; s < l; s++)
            for (i = 0; i <= s; i++)
              this.buffer[i + l * s] && this._setMask(i, s);
        } }, { _createArray: function(i) {
          var s, l = [];
          for (s = 0; s < i; s++)
            l[s] = 0;
          return l;
        }, _getMaskBit: function(i, s) {
          var l;
          return i > s && (l = i, i = s, s = l), l = s, l += s * s, l >>= 1, l += i, l;
        }, _modN: function(i) {
          for (; i >= 255; )
            i -= 255, i = (i >> 8) + (i & 255);
          return i;
        }, N1: 3, N2: 3, N3: 40, N4: 10 });
        t.exports = f;
      }), rf = V3((e2, t) => {
        "use strict";
        var r = Ca(), o = r.extend({ draw: function() {
          this.element.src = this.qrious.toDataURL();
        }, reset: function() {
          this.element.src = "";
        }, resize: function() {
          var n = this.element;
          n.width = n.height = this.qrious.size;
        } });
        t.exports = o;
      }), of = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = r.extend(function(n, a, c2, f) {
          this.name = n, this.modifiable = Boolean(a), this.defaultValue = c2, this._valueTransformer = f;
        }, { transform: function(n) {
          var a = this._valueTransformer;
          return typeof a == "function" ? a(n, this) : n;
        } });
        t.exports = o;
      }), Ea = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = r.extend(null, { abs: function(n) {
          return n != null ? Math.abs(n) : null;
        }, hasOwn: function(n, a) {
          return Object.prototype.hasOwnProperty.call(n, a);
        }, noop: function() {
        }, toUpperCase: function(n) {
          return n != null ? n.toUpperCase() : null;
        } });
        t.exports = o;
      }), nf = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = Ea(), n = r.extend(function(a) {
          this.options = {}, a.forEach(function(c2) {
            this.options[c2.name] = c2;
          }, this);
        }, { exists: function(a) {
          return this.options[a] != null;
        }, get: function(a, c2) {
          return n._get(this.options[a], c2);
        }, getAll: function(a) {
          var c2, f = this.options, i = {};
          for (c2 in f)
            o.hasOwn(f, c2) && (i[c2] = n._get(f[c2], a));
          return i;
        }, init: function(a, c2, f) {
          typeof f != "function" && (f = o.noop);
          var i, s;
          for (i in this.options)
            o.hasOwn(this.options, i) && (s = this.options[i], n._set(s, s.defaultValue, c2), n._createAccessor(s, c2, f));
          this._setAll(a, c2, true);
        }, set: function(a, c2, f) {
          return this._set(a, c2, f);
        }, setAll: function(a, c2) {
          return this._setAll(a, c2);
        }, _set: function(a, c2, f, i) {
          var s = this.options[a];
          if (!s)
            throw new Error("Invalid option: " + a);
          if (!s.modifiable && !i)
            throw new Error("Option cannot be modified: " + a);
          return n._set(s, c2, f);
        }, _setAll: function(a, c2, f) {
          if (!a)
            return false;
          var i, s = false;
          for (i in a)
            o.hasOwn(a, i) && this._set(i, a[i], c2, f) && (s = true);
          return s;
        } }, { _createAccessor: function(a, c2, f) {
          var i = { get: function() {
            return n._get(a, c2);
          } };
          a.modifiable && (i.set = function(s) {
            n._set(a, s, c2) && f(s, a);
          }), Object.defineProperty(c2, a.name, i);
        }, _get: function(a, c2) {
          return c2["_" + a.name];
        }, _set: function(a, c2, f) {
          var i = "_" + a.name, s = f[i], l = a.transform(c2 != null ? c2 : a.defaultValue);
          return f[i] = l, l !== s;
        } });
        t.exports = n;
      }), sf = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = r.extend(function() {
          this._services = {};
        }, { getService: function(n) {
          var a = this._services[n];
          if (!a)
            throw new Error("Service is not being managed with name: " + n);
          return a;
        }, setService: function(n, a) {
          if (this._services[n])
            throw new Error("Service is already managed with name: " + n);
          a && (this._services[n] = a);
        } });
        t.exports = o;
      }), af = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = Xu(), n = tf(), a = rf(), c2 = of(), f = nf(), i = sf(), s = Ea(), l = new f([new c2("background", true, "white"), new c2("backgroundAlpha", true, 1, s.abs), new c2("element"), new c2("foreground", true, "black"), new c2("foregroundAlpha", true, 1, s.abs), new c2("level", true, "L", s.toUpperCase), new c2("mime", true, "image/png"), new c2("padding", true, null, s.abs), new c2("size", true, 100, s.abs), new c2("value", true, "")]), p = new i(), u = r.extend(function(m2) {
          l.init(m2, this, this.update.bind(this));
          var h2 = l.get("element", this), d2 = p.getService("element"), y = h2 && d2.isCanvas(h2) ? h2 : d2.createCanvas(), b2 = h2 && d2.isImage(h2) ? h2 : d2.createImage();
          this._canvasRenderer = new o(this, y, true), this._imageRenderer = new a(this, b2, b2 === h2), this.update();
        }, { get: function() {
          return l.getAll(this);
        }, set: function(m2) {
          l.setAll(m2, this) && this.update();
        }, toDataURL: function(m2) {
          return this.canvas.toDataURL(m2 || this.mime);
        }, update: function() {
          var m2 = new n({ level: this.level, value: this.value });
          this._canvasRenderer.render(m2), this._imageRenderer.render(m2);
        } }, { use: function(m2) {
          p.setService(m2.getName(), m2);
        } });
        Object.defineProperties(u.prototype, { canvas: { get: function() {
          return this._canvasRenderer.getElement();
        } }, image: { get: function() {
          return this._imageRenderer.getElement();
        } } }), t.exports = u;
      }), lf = V3((e2, t) => {
        "use strict";
        t.exports = af();
      }), pf = V3((e2, t) => {
        "use strict";
        var r = fe3(), o = r.extend({ getName: function() {
        } });
        t.exports = o;
      }), cf = V3((e2, t) => {
        "use strict";
        var r = pf(), o = r.extend({ createCanvas: function() {
        }, createImage: function() {
        }, getName: function() {
          return "element";
        }, isCanvas: function(n) {
        }, isImage: function(n) {
        } });
        t.exports = o;
      }), uf = Sa(lf()), ff = Sa(cf()), df = ff.default.extend({ createCanvas: function() {
        return document.createElement("canvas");
      }, createImage: function() {
        return document.createElement("img");
      }, isCanvas: function(e2) {
        return e2 instanceof HTMLCanvasElement;
      }, isImage: function(e2) {
        return e2 instanceof HTMLImageElement;
      } }), mf = df, _a = uf.default;
      _a.use(new mf());
    });
    Dt2 = function() {
      function e2(r) {
        var o = this;
        this._insertTag = function(n) {
          var a;
          o.tags.length === 0 ? o.insertionPoint ? a = o.insertionPoint.nextSibling : o.prepend ? a = o.container.firstChild : a = o.before : a = o.tags[o.tags.length - 1].nextSibling, o.container.insertBefore(n, a), o.tags.push(n);
        }, this.isSpeedy = r.speedy === void 0 ? true : r.speedy, this.tags = [], this.ctr = 0, this.nonce = r.nonce, this.key = r.key, this.container = r.container, this.prepend = r.prepend, this.insertionPoint = r.insertionPoint, this.before = null;
      }
      var t = e2.prototype;
      return t.hydrate = function(o) {
        o.forEach(this._insertTag);
      }, t.insert = function(o) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(pi(this));
        var n = this.tags[this.tags.length - 1];
        if (false)
          var a;
        if (this.isSpeedy) {
          var c2 = li(n);
          try {
            c2.insertRule(o, c2.cssRules.length);
          } catch (e3) {
          }
        } else
          n.appendChild(document.createTextNode(o));
        this.ctr++;
      }, t.flush = function() {
        this.tags.forEach(function(o) {
          return o.parentNode && o.parentNode.removeChild(o);
        }), this.tags = [], this.ctr = 0;
      }, e2;
    }();
    W2 = "-ms-", Ye = "-moz-", O2 = "-webkit-", Ft2 = "comm", Xe = "rule", Qe = "decl";
    tn2 = "@import";
    Ut2 = "@keyframes";
    rn2 = Math.abs, ze2 = String.fromCharCode, on2 = Object.assign;
    Wt2 = 1, et = 1, ln2 = 0, te3 = 0, U2 = 0, tt = "";
    qt2 = ui;
    fi = function(t, r, o) {
      for (var n = 0, a = 0; n = a, a = ce2(), n === 38 && a === 12 && (r[o] = 1), !nt(a); )
        re3();
      return ot(t, te3);
    }, di = function(t, r) {
      var o = -1, n = 44;
      do
        switch (nt(n)) {
          case 0:
            n === 38 && ce2() === 12 && (r[o] = 1), t[o] += fi(te3 - 1, r, o);
            break;
          case 2:
            t[o] += st(n);
            break;
          case 4:
            if (n === 44) {
              t[++o] = ce2() === 58 ? "&\f" : "", r[o] = t[o].length;
              break;
            }
          default:
            t[o] += ze2(n);
        }
      while (n = re3());
      return t;
    }, mi = function(t, r) {
      return Ht2(di(Gt2(t), r));
    }, Pn2 = new WeakMap(), hi = function(t) {
      if (!(t.type !== "rule" || !t.parent || t.length < 1)) {
        for (var r = t.value, o = t.parent, n = t.column === o.column && t.line === o.line; o.type !== "rule"; )
          if (o = o.parent, !o)
            return;
        if (!(t.props.length === 1 && r.charCodeAt(0) !== 58 && !Pn2.get(o)) && !n) {
          Pn2.set(t, true);
          for (var a = [], c2 = mi(r, a), f = o.props, i = 0, s = 0; i < c2.length; i++)
            for (var l = 0; l < f.length; l++, s++)
              t.props[s] = a[i] ? c2[i].replace(/&\f/g, f[l]) : f[l] + " " + c2[i];
        }
      }
    }, yi = function(t) {
      if (t.type === "decl") {
        var r = t.value;
        r.charCodeAt(0) === 108 && r.charCodeAt(2) === 98 && (t.return = "", t.value = "");
      }
    };
    gi2 = [Tn2], xi = function(t) {
      var r = t.key;
      if (r === "css") {
        var o = document.querySelectorAll("style[data-emotion]:not([data-s])");
        Array.prototype.forEach.call(o, function(d2) {
          var y = d2.getAttribute("data-emotion");
          y.indexOf(" ") !== -1 && (document.head.appendChild(d2), d2.setAttribute("data-s", ""));
        });
      }
      var n = t.stylisPlugins || gi2, a = {}, c2, f = [];
      c2 = t.container || document.head, Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + r + ' "]'), function(d2) {
        for (var y = d2.getAttribute("data-emotion").split(" "), b2 = 1; b2 < y.length; b2++)
          a[y[b2]] = true;
        f.push(d2);
      });
      var i, s = [hi, yi];
      {
        var l, p = [xn2, vn2(function(d2) {
          l.insert(d2);
        })], u = bn2(s.concat(n, p)), m2 = function(y) {
          return Re2(hn2(y), u);
        };
        i = function(y, b2, P2, v2) {
          l = P2, m2(y ? y + "{" + b2.styles + "}" : b2.styles), v2 && (h2.inserted[b2.name] = true);
        };
      }
      var h2 = { key: r, sheet: new Dt2({ key: r, container: c2, nonce: t.nonce, speedy: t.speedy, prepend: t.prepend, insertionPoint: t.insertionPoint }), nonce: t.nonce, inserted: a, registered: {}, insert: i };
      return h2.sheet.hydrate(f), h2;
    }, Sn = xi;
    Ni = true;
    at2 = function(t, r, o) {
      var n = t.key + "-" + r.name;
      if ((o === false || Ni === false) && t.registered[n] === void 0 && (t.registered[n] = r.styles), t.inserted[r.name] === void 0) {
        var a = r;
        do {
          var c2 = t.insert(r === a ? "." + n : "", a, t.sheet, true);
          a = a.next;
        } while (a !== void 0);
      }
    };
    In2 = Mi;
    Bi = { animationIterationCount: 1, borderImageOutset: 1, borderImageSlice: 1, borderImageWidth: 1, boxFlex: 1, boxFlexGroup: 1, boxOrdinalGroup: 1, columnCount: 1, columns: 1, flex: 1, flexGrow: 1, flexPositive: 1, flexShrink: 1, flexNegative: 1, flexOrder: 1, gridRow: 1, gridRowEnd: 1, gridRowSpan: 1, gridRowStart: 1, gridColumn: 1, gridColumnEnd: 1, gridColumnSpan: 1, gridColumnStart: 1, msGridRow: 1, msGridRowSpan: 1, msGridColumn: 1, msGridColumnSpan: 1, fontWeight: 1, lineHeight: 1, opacity: 1, order: 1, orphans: 1, tabSize: 1, widows: 1, zIndex: 1, zoom: 1, WebkitLineClamp: 1, fillOpacity: 1, floodOpacity: 1, stopOpacity: 1, strokeDasharray: 1, strokeDashoffset: 1, strokeMiterlimit: 1, strokeOpacity: 1, strokeWidth: 1 }, zn2 = Bi;
    Ai = /[A-Z]|^ms/g, Ii = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Ln2 = function(t) {
      return t.charCodeAt(1) === 45;
    }, $n2 = function(t) {
      return t != null && typeof t != "boolean";
    }, Vr2 = qt2(function(e2) {
      return Ln2(e2) ? e2 : e2.replace(Ai, "-$&").toLowerCase();
    }), jn2 = function(t, r) {
      switch (t) {
        case "animation":
        case "animationName":
          if (typeof r == "string")
            return r.replace(Ii, function(o, n, a) {
              return ve2 = { name: n, styles: a, next: ve2 }, n;
            });
      }
      return zn2[t] !== 1 && !Ln2(t) && typeof r == "number" && r !== 0 ? r + "px" : r;
    };
    Dn2 = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
    Le2 = function(t, r, o) {
      if (t.length === 1 && typeof t[0] == "object" && t[0] !== null && t[0].styles !== void 0)
        return t[0];
      var n = true, a = "";
      ve2 = void 0;
      var c2 = t[0];
      c2 == null || c2.raw === void 0 ? (n = false, a += xt2(o, r, c2)) : a += c2[0];
      for (var f = 1; f < t.length; f++)
        a += xt2(o, r, t[f]), n && (a += c2[f]);
      var i;
      Dn2.lastIndex = 0;
      for (var s = "", l; (l = Dn2.exec(a)) !== null; )
        s += "-" + l[1];
      var p = In2(a) + s;
      return { name: p, styles: a, next: ve2 };
    };
    sr = {}.hasOwnProperty, Vn2 = Fn2(typeof HTMLElement != "undefined" ? Sn({ key: "css" }) : null), ji = Vn2.Provider;
    it2 = function(t) {
      return Li(function(r, o) {
        var n = Un2(Vn2);
        return t(r, n, o);
      });
    }, $e2 = Fn2({});
    Gr2 = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
    Wn2 = function(t, r) {
      var o = {};
      for (var n in r)
        sr.call(r, n) && (o[n] = r[n]);
      if (o[Gr2] = t, false)
        var a;
      return o;
    }, Di = function() {
      return null;
    }, Gn2 = it2(function(e2, t, r) {
      var o = e2.css;
      typeof o == "string" && t.registered[o] !== void 0 && (o = t.registered[o]);
      var n = e2[Gr2], a = [o], c2 = "";
      typeof e2.className == "string" ? c2 = gt2(t.registered, a, e2.className) : e2.className != null && (c2 = e2.className + " ");
      var f = Le2(a, void 0, Un2($e2));
      if (false)
        var i;
      var s = at2(t, f, typeof n == "string");
      c2 += t.key + "-" + f.name;
      var l = {};
      for (var p in e2)
        sr.call(e2, p) && p !== "css" && p !== Gr2 && (l[p] = e2[p]);
      l.ref = r, l.className = c2;
      var u = Wr(n, l), m2 = Wr(Di, null);
      return Wr($i, null, m2, u);
    });
    Nd = pe3(An2());
    w2 = function(t, r) {
      var o = arguments;
      if (r == null || !sr.call(r, "css"))
        return Hn2.apply(void 0, o);
      var n = o.length, a = new Array(n);
      a[0] = Gn2, a[1] = Wn2(t, r);
      for (var c2 = 2; c2 < n; c2++)
        a[c2] = o[c2];
      return Hn2.apply(null, a);
    };
    Vi = it2(function(e2, t) {
      var r = e2.styles, o = Le2([r], void 0, Fi($e2)), n = Ui();
      return Kn2(function() {
        var a = t.key + "-global", c2 = new Dt2({ key: a, nonce: t.sheet.nonce, container: t.sheet.container, speedy: t.sheet.isSpeedy }), f = false, i = document.querySelector('style[data-emotion="' + a + " " + o.name + '"]');
        return t.sheet.tags.length && (c2.before = t.sheet.tags[0]), i !== null && (f = true, i.setAttribute("data-emotion", a), c2.hydrate([i])), n.current = [c2, f], function() {
          c2.flush();
        };
      }, [t]), Kn2(function() {
        var a = n.current, c2 = a[0], f = a[1];
        if (f) {
          a[1] = false;
          return;
        }
        if (o.next !== void 0 && at2(t, o.next, true), c2.tags.length) {
          var i = c2.tags[c2.tags.length - 1].nextElementSibling;
          c2.before = i, c2.flush();
        }
        t.insert("", o, c2, false);
      }, [t, o.name]), null;
    });
    je2 = function() {
      var t = j2.apply(void 0, arguments), r = "animation-" + t.name;
      return { name: r, styles: "@keyframes " + r + "{" + t.styles + "}", anim: 1, toString: function() {
        return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
      } };
    };
    J1 = pe3(me());
    rl = typeof window != "undefined" ? cr.useLayoutEffect : cr.useEffect, cs = rl;
    hr = true, Kr2 = false, ol = { text: true, search: true, url: true, tel: true, email: true, password: true, number: true, date: true, month: true, week: true, time: true, datetime: true, "datetime-local": true };
    ds2 = (e2) => e2, pl = () => {
      let e2 = ds2;
      return { configure(t) {
        e2 = t;
      }, generate(t) {
        return e2(t);
      }, reset() {
        e2 = ds2;
      } };
    }, cl = pl(), ms = cl;
    ul = { active: "Mui-active", checked: "Mui-checked", completed: "Mui-completed", disabled: "Mui-disabled", error: "Mui-error", expanded: "Mui-expanded", focused: "Mui-focused", focusVisible: "Mui-focusVisible", required: "Mui-required", selected: "Mui-selected" };
    k1 = pe3(me());
    fl = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, dl = qt2(function(e2) {
      return fl.test(e2) || e2.charCodeAt(0) === 111 && e2.charCodeAt(1) === 110 && e2.charCodeAt(2) < 91;
    }), hs2 = dl;
    yl = hs2, gl = function(t) {
      return t !== "theme";
    }, ys2 = function(t) {
      return typeof t == "string" && t.charCodeAt(0) > 96 ? yl : gl;
    }, gs = function(t, r, o) {
      var n;
      if (r) {
        var a = r.shouldForwardProp;
        n = t.__emotion_forwardProp && a ? function(c2) {
          return t.__emotion_forwardProp(c2) && a(c2);
        } : a;
      }
      return typeof n != "function" && o && (n = t.__emotion_forwardProp), n;
    };
    xl = function() {
      return null;
    }, bl = function e(t, r) {
      var o = t.__emotion_real === t, n = o && t.__emotion_base || t, a, c2;
      r !== void 0 && (a = r.label, c2 = r.target);
      var f = gs(t, r, o), i = f || ys2(n), s = !i("as");
      return function() {
        var l = arguments, p = o && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
        if (a !== void 0 && p.push("label:" + a + ";"), l[0] == null || l[0].raw === void 0)
          p.push.apply(p, l);
        else {
          p.push(l[0][0]);
          for (var u = l.length, m2 = 1; m2 < u; m2++)
            p.push(l[m2], l[0][m2]);
        }
        var h2 = it2(function(d2, y, b2) {
          var P2 = s && d2.as || n, v2 = "", S3 = [], E2 = d2;
          if (d2.theme == null) {
            E2 = {};
            for (var T2 in d2)
              E2[T2] = d2[T2];
            E2.theme = ml($e2);
          }
          typeof d2.className == "string" ? v2 = gt2(y.registered, S3, d2.className) : d2.className != null && (v2 = d2.className + " ");
          var C2 = Le2(p.concat(S3), y.registered, E2), R2 = at2(y, C2, typeof P2 == "string");
          v2 += y.key + "-" + C2.name, c2 !== void 0 && (v2 += " " + c2);
          var F3 = s && f === void 0 ? ys2(P2) : i, $3 = {};
          for (var Z2 in d2)
            s && Z2 === "as" || F3(Z2) && ($3[Z2] = d2[Z2]);
          $3.className = v2, $3.ref = b2;
          var de3 = Yr2(P2, $3), ge2 = Yr2(xl, null);
          return Yr2(hl, null, ge2, de3);
        });
        return h2.displayName = a !== void 0 ? a : "Styled(" + (typeof n == "string" ? n : n.displayName || n.name || "Component") + ")", h2.defaultProps = t.defaultProps, h2.__emotion_real = h2, h2.__emotion_base = n, h2.__emotion_styles = p, h2.__emotion_forwardProp = f, Object.defineProperty(h2, "toString", { value: function() {
          return "." + c2;
        } }), h2.withComponent = function(d2, y) {
          return e(d2, g({}, r, y, { shouldForwardProp: gs(h2, y, true) })).apply(void 0, p);
        }, h2;
      };
    }, xs = bl;
    vl = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], Xr2 = xs.bind();
    vl.forEach(function(e2) {
      Xr2[e2] = Xr2(e2);
    });
    bs = Xr2;
    mh = pe3(me());
    Oe2 = Tl;
    gr = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 }, vs = { keys: ["xs", "sm", "md", "lg", "xl"], up: (e2) => `@media (min-width:${gr[e2]}px)` };
    x = Pl;
    J2 = Sl;
    Cl = { m: "margin", p: "padding" }, El = { t: "Top", r: "Right", b: "Bottom", l: "Left", x: ["Left", "Right"], y: ["Top", "Bottom"] }, Cs = { marginX: "mx", marginY: "my", paddingX: "px", paddingY: "py" }, _l = Jr2((e2) => {
      if (e2.length > 2)
        if (Cs[e2])
          e2 = Cs[e2];
        else
          return [e2];
      let [t, r] = e2.split(""), o = Cl[t], n = El[r] || "";
      return Array.isArray(n) ? n.map((a) => o + a) : [o + n];
    }), Zr2 = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], eo2 = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Es = [...Zr2, ...eo2];
    _s.propTypes = {};
    _s.filterProps = Zr2;
    ws.propTypes = {};
    ws.filterProps = eo2;
    oo2.propTypes = {};
    oo2.filterProps = Es;
    no2 = oo2;
    Rl = x({ prop: "border", themeKey: "borders", transform: kt2 }), Ol = x({ prop: "borderTop", themeKey: "borders", transform: kt2 }), Nl = x({ prop: "borderRight", themeKey: "borders", transform: kt2 }), Ml = x({ prop: "borderBottom", themeKey: "borders", transform: kt2 }), Bl = x({ prop: "borderLeft", themeKey: "borders", transform: kt2 }), Al = x({ prop: "borderColor", themeKey: "palette" }), Il = x({ prop: "borderTopColor", themeKey: "palette" }), zl = x({ prop: "borderRightColor", themeKey: "palette" }), Ll = x({ prop: "borderBottomColor", themeKey: "palette" }), $l = x({ prop: "borderLeftColor", themeKey: "palette" }), so2 = (e2) => {
      if (e2.borderRadius !== void 0 && e2.borderRadius !== null) {
        let t = De(e2.theme, "shape.borderRadius", 4, "borderRadius"), r = (o) => ({ borderRadius: Fe2(t, o) });
        return se3(e2, e2.borderRadius, r);
      }
      return null;
    };
    so2.propTypes = {};
    so2.filterProps = ["borderRadius"];
    jl = J2(Rl, Ol, Nl, Ml, Bl, Al, Il, zl, Ll, $l, so2), ao2 = jl;
    Dl = x({ prop: "displayPrint", cssProperty: false, transform: (e2) => ({ "@media print": { display: e2 } }) }), Fl = x({ prop: "display" }), Ul = x({ prop: "overflow" }), Vl = x({ prop: "textOverflow" }), Wl = x({ prop: "visibility" }), Gl = x({ prop: "whiteSpace" }), io2 = J2(Dl, Fl, Ul, Vl, Wl, Gl);
    Hl = x({ prop: "flexBasis" }), Kl = x({ prop: "flexDirection" }), ql = x({ prop: "flexWrap" }), Yl = x({ prop: "justifyContent" }), Xl = x({ prop: "alignItems" }), Ql = x({ prop: "alignContent" }), Jl = x({ prop: "order" }), Zl = x({ prop: "flex" }), ep = x({ prop: "flexGrow" }), tp = x({ prop: "flexShrink" }), rp = x({ prop: "alignSelf" }), op = x({ prop: "justifyItems" }), np = x({ prop: "justifySelf" }), sp = J2(Hl, Kl, ql, Yl, Xl, Ql, Jl, Zl, ep, tp, rp, op, np), lo2 = sp;
    po = (e2) => {
      if (e2.gap !== void 0 && e2.gap !== null) {
        let t = De(e2.theme, "spacing", 8, "gap"), r = (o) => ({ gap: Fe2(t, o) });
        return se3(e2, e2.gap, r);
      }
      return null;
    };
    po.propTypes = {};
    po.filterProps = ["gap"];
    co2 = (e2) => {
      if (e2.columnGap !== void 0 && e2.columnGap !== null) {
        let t = De(e2.theme, "spacing", 8, "columnGap"), r = (o) => ({ columnGap: Fe2(t, o) });
        return se3(e2, e2.columnGap, r);
      }
      return null;
    };
    co2.propTypes = {};
    co2.filterProps = ["columnGap"];
    uo2 = (e2) => {
      if (e2.rowGap !== void 0 && e2.rowGap !== null) {
        let t = De(e2.theme, "spacing", 8, "rowGap"), r = (o) => ({ rowGap: Fe2(t, o) });
        return se3(e2, e2.rowGap, r);
      }
      return null;
    };
    uo2.propTypes = {};
    uo2.filterProps = ["rowGap"];
    ap = x({ prop: "gridColumn" }), ip = x({ prop: "gridRow" }), lp = x({ prop: "gridAutoFlow" }), pp = x({ prop: "gridAutoColumns" }), cp = x({ prop: "gridAutoRows" }), up = x({ prop: "gridTemplateColumns" }), fp = x({ prop: "gridTemplateRows" }), dp = x({ prop: "gridTemplateAreas" }), mp = x({ prop: "gridArea" }), hp = J2(po, co2, uo2, ap, ip, lp, pp, cp, up, fp, dp, mp), fo2 = hp;
    yp = x({ prop: "color", themeKey: "palette" }), gp = x({ prop: "bgcolor", cssProperty: "backgroundColor", themeKey: "palette" }), xp = x({ prop: "backgroundColor", themeKey: "palette" }), bp = J2(yp, gp, xp), mo = bp;
    vp = x({ prop: "position" }), Tp = x({ prop: "zIndex", themeKey: "zIndex" }), Pp = x({ prop: "top" }), Sp = x({ prop: "right" }), Cp = x({ prop: "bottom" }), Ep = x({ prop: "left" }), ho = J2(vp, Tp, Pp, Sp, Cp, Ep);
    _p = x({ prop: "boxShadow", themeKey: "shadows" }), yo = _p;
    wp = x({ prop: "width", transform: Ne2 }), ks = (e2) => {
      if (e2.maxWidth !== void 0 && e2.maxWidth !== null) {
        let t = (r) => {
          var o, n, a;
          return { maxWidth: ((o = e2.theme) == null || (n = o.breakpoints) == null || (a = n.values) == null ? void 0 : a[r]) || gr[r] || Ne2(r) };
        };
        return se3(e2, e2.maxWidth, t);
      }
      return null;
    };
    ks.filterProps = ["maxWidth"];
    kp = x({ prop: "minWidth", transform: Ne2 }), Rp = x({ prop: "height", transform: Ne2 }), Op = x({ prop: "maxHeight", transform: Ne2 }), Np = x({ prop: "minHeight", transform: Ne2 }), ty = x({ prop: "size", cssProperty: "width", transform: Ne2 }), ry = x({ prop: "size", cssProperty: "height", transform: Ne2 }), Mp = x({ prop: "boxSizing" }), Bp = J2(wp, ks, kp, Rp, Op, Np, Mp), go = Bp;
    Ap = x({ prop: "fontFamily", themeKey: "typography" }), Ip = x({ prop: "fontSize", themeKey: "typography" }), zp = x({ prop: "fontStyle", themeKey: "typography" }), Lp = x({ prop: "fontWeight", themeKey: "typography" }), $p = x({ prop: "letterSpacing" }), jp = x({ prop: "lineHeight" }), Dp = x({ prop: "textAlign" }), Fp = x({ prop: "typography", cssProperty: false, themeKey: "typography" }), Up = J2(Fp, Ap, Ip, zp, Lp, $p, jp, Dp), xo = Up;
    Rs = { borders: ao2.filterProps, display: io2.filterProps, flexbox: lo2.filterProps, grid: fo2.filterProps, positions: ho.filterProps, palette: mo.filterProps, shadows: yo.filterProps, sizing: go.filterProps, spacing: no2.filterProps, typography: xo.filterProps }, Vp = { borders: ao2, display: io2, flexbox: lo2, grid: fo2, positions: ho, palette: mo, shadows: yo, sizing: go, spacing: no2, typography: xo }, bo = Object.keys(Rs).reduce((e2, t) => (Rs[t].forEach((r) => {
      e2[r] = Vp[t];
    }), e2), {});
    vo = Wp;
    To2.filterProps = ["sx"];
    Po2 = To2;
    Kp = ["values", "unit", "step"];
    qp = { borderRadius: 4 }, Os = qp;
    Yp = ["breakpoints", "palette", "spacing", "shape"];
    Me2 = Xp;
    Qp = Ns.createContext(null), Ms = Qp;
    Bs = Zp;
    ec = Me2();
    As = tc;
    rc = ["variant"];
    oc = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"], nc = ["theme"], sc = ["theme"];
    ac = (e2, t) => t.components && t.components[e2] && t.components[e2].styleOverrides ? t.components[e2].styleOverrides : null, ic = (e2, t) => {
      let r = [];
      t && t.components && t.components[e2] && t.components[e2].variants && (r = t.components[e2].variants);
      let o = {};
      return r.forEach((n) => {
        let a = br2(n.props);
        o[a] = n.style;
      }), o;
    }, lc = (e2, t, r, o) => {
      var n, a;
      let { ownerState: c2 = {} } = e2, f = [], i = r == null || (n = r.components) == null || (a = n[o]) == null ? void 0 : a.variants;
      return i && i.forEach((s) => {
        let l = true;
        Object.keys(s.props).forEach((p) => {
          c2[p] !== s.props[p] && e2[p] !== s.props[p] && (l = false);
        }), l && f.push(t[br2(s.props)]);
      }), f;
    };
    pc = Me2();
    cc = { black: "#000", white: "#fff" }, pt2 = cc;
    uc = { 50: "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 800: "#424242", 900: "#212121", A100: "#f5f5f5", A200: "#eeeeee", A400: "#bdbdbd", A700: "#616161" }, $s = uc;
    fc = { 50: "#f3e5f5", 100: "#e1bee7", 200: "#ce93d8", 300: "#ba68c8", 400: "#ab47bc", 500: "#9c27b0", 600: "#8e24aa", 700: "#7b1fa2", 800: "#6a1b9a", 900: "#4a148c", A100: "#ea80fc", A200: "#e040fb", A400: "#d500f9", A700: "#aa00ff" }, Ue2 = fc;
    dc = { 50: "#ffebee", 100: "#ffcdd2", 200: "#ef9a9a", 300: "#e57373", 400: "#ef5350", 500: "#f44336", 600: "#e53935", 700: "#d32f2f", 800: "#c62828", 900: "#b71c1c", A100: "#ff8a80", A200: "#ff5252", A400: "#ff1744", A700: "#d50000" }, Ve2 = dc;
    mc = { 50: "#fff3e0", 100: "#ffe0b2", 200: "#ffcc80", 300: "#ffb74d", 400: "#ffa726", 500: "#ff9800", 600: "#fb8c00", 700: "#f57c00", 800: "#ef6c00", 900: "#e65100", A100: "#ffd180", A200: "#ffab40", A400: "#ff9100", A700: "#ff6d00" }, ct2 = mc;
    hc = { 50: "#e3f2fd", 100: "#bbdefb", 200: "#90caf9", 300: "#64b5f6", 400: "#42a5f5", 500: "#2196f3", 600: "#1e88e5", 700: "#1976d2", 800: "#1565c0", 900: "#0d47a1", A100: "#82b1ff", A200: "#448aff", A400: "#2979ff", A700: "#2962ff" }, We2 = hc;
    yc = { 50: "#e1f5fe", 100: "#b3e5fc", 200: "#81d4fa", 300: "#4fc3f7", 400: "#29b6f6", 500: "#03a9f4", 600: "#039be5", 700: "#0288d1", 800: "#0277bd", 900: "#01579b", A100: "#80d8ff", A200: "#40c4ff", A400: "#00b0ff", A700: "#0091ea" }, Ge = yc;
    gc = { 50: "#e8f5e9", 100: "#c8e6c9", 200: "#a5d6a7", 300: "#81c784", 400: "#66bb6a", 500: "#4caf50", 600: "#43a047", 700: "#388e3c", 800: "#2e7d32", 900: "#1b5e20", A100: "#b9f6ca", A200: "#69f0ae", A400: "#00e676", A700: "#00c853" }, He2 = gc;
    xc = ["mode", "contrastThreshold", "tonalOffset"], js = { text: { primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.6)", disabled: "rgba(0, 0, 0, 0.38)" }, divider: "rgba(0, 0, 0, 0.12)", background: { paper: pt2.white, default: pt2.white }, action: { active: "rgba(0, 0, 0, 0.54)", hover: "rgba(0, 0, 0, 0.04)", hoverOpacity: 0.04, selected: "rgba(0, 0, 0, 0.08)", selectedOpacity: 0.08, disabled: "rgba(0, 0, 0, 0.26)", disabledBackground: "rgba(0, 0, 0, 0.12)", disabledOpacity: 0.38, focus: "rgba(0, 0, 0, 0.12)", focusOpacity: 0.12, activatedOpacity: 0.12 } }, Mo2 = { text: { primary: pt2.white, secondary: "rgba(255, 255, 255, 0.7)", disabled: "rgba(255, 255, 255, 0.5)", icon: "rgba(255, 255, 255, 0.5)" }, divider: "rgba(255, 255, 255, 0.12)", background: { paper: "#121212", default: "#121212" }, action: { active: pt2.white, hover: "rgba(255, 255, 255, 0.08)", hoverOpacity: 0.08, selected: "rgba(255, 255, 255, 0.16)", selectedOpacity: 0.16, disabled: "rgba(255, 255, 255, 0.3)", disabledBackground: "rgba(255, 255, 255, 0.12)", disabledOpacity: 0.38, focus: "rgba(255, 255, 255, 0.12)", focusOpacity: 0.12, activatedOpacity: 0.24 } };
    Ec = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
    Fs = { textTransform: "uppercase" }, Us = '"Roboto", "Helvetica", "Arial", sans-serif';
    wc = 0.2, kc = 0.14, Rc = 0.12;
    Oc = ["none", L2(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), L2(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), L2(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), L2(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), L2(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), L2(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), L2(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), L2(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), L2(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), L2(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), L2(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), L2(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), L2(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), L2(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), L2(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), L2(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), L2(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), L2(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), L2(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), L2(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), L2(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), L2(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), L2(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), L2(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Vs = Oc;
    Nc = ["duration", "easing", "delay"], Mc = { easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)", easeOut: "cubic-bezier(0.0, 0, 0.2, 1)", easeIn: "cubic-bezier(0.4, 0, 1, 1)", sharp: "cubic-bezier(0.4, 0, 0.6, 1)" }, Bc = { shortest: 150, shorter: 200, short: 250, standard: 300, complex: 375, enteringScreen: 225, leavingScreen: 195 };
    Ic = { mobileStepper: 1e3, speedDial: 1050, appBar: 1100, drawer: 1200, modal: 1300, snackbar: 1400, tooltip: 1500 }, Gs = Ic;
    zc = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
    Hs = Lc;
    $c = Hs(), Pr = $c;
    zo2 = (e2) => Nt(e2) && e2 !== "classes";
    jc = vr({ defaultTheme: Pr, rootShouldForwardProp: zo2 }), X2 = jc;
    Lo2 = dr2;
    At2 = fr;
    Ks = yr2;
    d1 = pe3(me());
    jo = Dc.createContext(null);
    Xg = pe3(me());
    Vc = Object.values || function(e2) {
      return Object.keys(e2).map(function(t) {
        return e2[t];
      });
    }, Wc = { component: "div", childFactory: function(t) {
      return t;
    } }, Fo2 = function(e2) {
      $o2(t, e2);
      function t(o, n) {
        var a;
        a = e2.call(this, o, n) || this;
        var c2 = a.handleExited.bind(Do2(a));
        return a.state = { contextValue: { isMounting: true }, handleExited: c2, firstRender: true }, a;
      }
      var r = t.prototype;
      return r.componentDidMount = function() {
        this.mounted = true, this.setState({ contextValue: { isMounting: false } });
      }, r.componentWillUnmount = function() {
        this.mounted = false;
      }, t.getDerivedStateFromProps = function(n, a) {
        var c2 = a.children, f = a.handleExited, i = a.firstRender;
        return { children: i ? qs(n, f) : Ys(n, c2, f), firstRender: false };
      }, r.handleExited = function(n, a) {
        var c2 = Er(this.props.children);
        n.key in c2 || (n.props.onExited && n.props.onExited(a), this.mounted && this.setState(function(f) {
          var i = g({}, f.children);
          return delete i[n.key], { children: i };
        }));
      }, r.render = function() {
        var n = this.props, a = n.component, c2 = n.childFactory, f = k2(n, ["component", "childFactory"]), i = this.state.contextValue, s = Vc(this.state.children).map(c2);
        return delete f.appear, delete f.enter, delete f.exit, a === null ? _r.createElement(jo.Provider, { value: i }, s) : _r.createElement(jo.Provider, { value: i }, _r.createElement(a, f, s));
      }, t;
    }(_r.Component);
    Fo2.propTypes = {};
    Fo2.defaultProps = Wc;
    Uo2 = Fo2;
    n1 = pe3(me());
    Qs = Gc;
    Hc = Y2("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), le3 = Hc;
    Kc = ["center", "classes", "className"], kr = (e2) => e2, Wo2 = 550, qc = 80, Yc = je2(Js || (Js = kr`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)), Xc = je2(Zs2 || (Zs2 = kr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)), Qc = je2(ea || (ea = kr`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)), Jc = X2("span", { name: "MuiTouchRipple", slot: "Root", skipSx: true })({ overflow: "hidden", pointerEvents: "none", position: "absolute", zIndex: 0, top: 0, right: 0, bottom: 0, left: 0, borderRadius: "inherit" }), Zc = X2(Qs, { name: "MuiTouchRipple", slot: "Ripple" })(ta2 || (ta2 = kr`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), le3.rippleVisible, Yc, Wo2, ({ theme: e2 }) => e2.transitions.easing.easeInOut, le3.ripplePulsate, ({ theme: e2 }) => e2.transitions.duration.shorter, le3.child, le3.childLeaving, Xc, Wo2, ({ theme: e2 }) => e2.transitions.easing.easeInOut, le3.childPulsate, Qc, ({ theme: e2 }) => e2.transitions.easing.easeInOut), eu = D2.forwardRef(function(t, r) {
      let o = ne3({ props: t, name: "MuiTouchRipple" }), { center: n = false, classes: a = {}, className: c2 } = o, f = k2(o, Kc), [i, s] = D2.useState([]), l = D2.useRef(0), p = D2.useRef(null);
      D2.useEffect(() => {
        p.current && (p.current(), p.current = null);
      }, [i]);
      let u = D2.useRef(false), m2 = D2.useRef(null), h2 = D2.useRef(null), d2 = D2.useRef(null);
      D2.useEffect(() => () => {
        clearTimeout(m2.current);
      }, []);
      let y = D2.useCallback((S3) => {
        let { pulsate: E2, rippleX: T2, rippleY: C2, rippleSize: R2, cb: F3 } = S3;
        s(($3) => [...$3, Vo2(Zc, { classes: { ripple: I2(a.ripple, le3.ripple), rippleVisible: I2(a.rippleVisible, le3.rippleVisible), ripplePulsate: I2(a.ripplePulsate, le3.ripplePulsate), child: I2(a.child, le3.child), childLeaving: I2(a.childLeaving, le3.childLeaving), childPulsate: I2(a.childPulsate, le3.childPulsate) }, timeout: Wo2, pulsate: E2, rippleX: T2, rippleY: C2, rippleSize: R2 }, l.current)]), l.current += 1, p.current = F3;
      }, [a]), b2 = D2.useCallback((S3 = {}, E2 = {}, T2) => {
        let { pulsate: C2 = false, center: R2 = n || E2.pulsate, fakeElement: F3 = false } = E2;
        if (S3.type === "mousedown" && u.current) {
          u.current = false;
          return;
        }
        S3.type === "touchstart" && (u.current = true);
        let $3 = F3 ? null : d2.current, Z2 = $3 ? $3.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 }, de3, ge2, xe;
        if (R2 || S3.clientX === 0 && S3.clientY === 0 || !S3.clientX && !S3.touches)
          de3 = Math.round(Z2.width / 2), ge2 = Math.round(Z2.height / 2);
        else {
          let { clientX: Ce, clientY: Ee } = S3.touches ? S3.touches[0] : S3;
          de3 = Math.round(Ce - Z2.left), ge2 = Math.round(Ee - Z2.top);
        }
        if (R2)
          xe = Math.sqrt((2 * Z2.width ** 2 + Z2.height ** 2) / 3), xe % 2 == 0 && (xe += 1);
        else {
          let Ce = Math.max(Math.abs(($3 ? $3.clientWidth : 0) - de3), de3) * 2 + 2, Ee = Math.max(Math.abs(($3 ? $3.clientHeight : 0) - ge2), ge2) * 2 + 2;
          xe = Math.sqrt(Ce ** 2 + Ee ** 2);
        }
        S3.touches ? h2.current === null && (h2.current = () => {
          y({ pulsate: C2, rippleX: de3, rippleY: ge2, rippleSize: xe, cb: T2 });
        }, m2.current = setTimeout(() => {
          h2.current && (h2.current(), h2.current = null);
        }, qc)) : y({ pulsate: C2, rippleX: de3, rippleY: ge2, rippleSize: xe, cb: T2 });
      }, [n, y]), P2 = D2.useCallback(() => {
        b2({}, { pulsate: true });
      }, [b2]), v2 = D2.useCallback((S3, E2) => {
        if (clearTimeout(m2.current), S3.type === "touchend" && h2.current) {
          h2.current(), h2.current = null, m2.current = setTimeout(() => {
            v2(S3, E2);
          });
          return;
        }
        h2.current = null, s((T2) => T2.length > 0 ? T2.slice(1) : T2), p.current = E2;
      }, []);
      return D2.useImperativeHandle(r, () => ({ pulsate: P2, start: b2, stop: v2 }), [P2, b2, v2]), Vo2(Jc, g({ className: I2(a.root, le3.root, c2), ref: d2 }, f, { children: Vo2(Uo2, { component: null, exit: true, children: i }) }));
    }), ra = eu;
    tu = Y2("MuiButtonBase", ["root", "disabled", "focusVisible"]), na = tu;
    ru = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "type"], su = (e2) => {
      let { disabled: t, focusVisible: r, focusVisibleClassName: o, classes: n } = e2, c2 = oe3({ root: ["root", t && "disabled", r && "focusVisible"] }, oa, n);
      return r && o && (c2.root += ` ${o}`), c2;
    }, au = X2("button", { name: "MuiButtonBase", slot: "Root", overridesResolver: (e2, t) => t.root })({ display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative", boxSizing: "border-box", WebkitTapHighlightColor: "transparent", backgroundColor: "transparent", outline: 0, border: 0, margin: 0, borderRadius: 0, padding: 0, cursor: "pointer", userSelect: "none", verticalAlign: "middle", MozAppearance: "none", WebkitAppearance: "none", textDecoration: "none", color: "inherit", "&::-moz-focus-inner": { borderStyle: "none" }, [`&.${na.disabled}`]: { pointerEvents: "none", cursor: "default" }, "@media print": { colorAdjust: "exact" } }), iu = ae3.forwardRef(function(t, r) {
      let o = ne3({ props: t, name: "MuiButtonBase" }), { action: n, centerRipple: a = false, children: c2, className: f, component: i = "button", disabled: s = false, disableRipple: l = false, disableTouchRipple: p = false, focusRipple: u = false, LinkComponent: m2 = "a", onBlur: h2, onClick: d2, onContextMenu: y, onDragLeave: b2, onFocus: P2, onFocusVisible: v2, onKeyDown: S3, onKeyUp: E2, onMouseDown: T2, onMouseLeave: C2, onMouseUp: R2, onTouchEnd: F3, onTouchMove: $3, onTouchStart: Z2, tabIndex: de3 = 0, TouchRippleProps: ge2, type: xe } = o, Ce = k2(o, ru), Ee = ae3.useRef(null), be = ae3.useRef(null), { isFocusVisibleRef: Xo2, onFocus: Ma, onBlur: Ba, ref: Aa } = Ks(), [Ie2, Lt2] = ae3.useState(false);
      s && Ie2 && Lt2(false), ae3.useImperativeHandle(n, () => ({ focusVisible: () => {
        Lt2(true), Ee.current.focus();
      } }), []), ae3.useEffect(() => {
        Ie2 && u && !l && be.current.pulsate();
      }, [l, u, Ie2]);
      function _e2(_2, Jo2, Za = p) {
        return At2((Zo2) => (Jo2 && Jo2(Zo2), !Za && be.current && be.current[_2](Zo2), true));
      }
      let Ia = _e2("start", T2), za = _e2("stop", y), La = _e2("stop", b2), $a = _e2("stop", R2), ja = _e2("stop", (_2) => {
        Ie2 && _2.preventDefault(), C2 && C2(_2);
      }), Da = _e2("start", Z2), Fa = _e2("stop", F3), Ua = _e2("stop", $3), Va = _e2("stop", (_2) => {
        Ba(_2), Xo2.current === false && Lt2(false), h2 && h2(_2);
      }, false), Wa = At2((_2) => {
        Ee.current || (Ee.current = _2.currentTarget), Ma(_2), Xo2.current === true && (Lt2(true), v2 && v2(_2)), P2 && P2(_2);
      }), Ar = () => {
        let _2 = Ee.current;
        return i && i !== "button" && !(_2.tagName === "A" && _2.href);
      }, Ir = ae3.useRef(false), Ga = At2((_2) => {
        u && !Ir.current && Ie2 && be.current && _2.key === " " && (Ir.current = true, be.current.stop(_2, () => {
          be.current.start(_2);
        })), _2.target === _2.currentTarget && Ar() && _2.key === " " && _2.preventDefault(), S3 && S3(_2), _2.target === _2.currentTarget && Ar() && _2.key === "Enter" && !s && (_2.preventDefault(), d2 && d2(_2));
      }), Ha = At2((_2) => {
        u && _2.key === " " && be.current && Ie2 && !_2.defaultPrevented && (Ir.current = false, be.current.stop(_2, () => {
          be.current.pulsate(_2);
        })), E2 && E2(_2), d2 && _2.target === _2.currentTarget && Ar() && _2.key === " " && !_2.defaultPrevented && d2(_2);
      }), $t2 = i;
      $t2 === "button" && (Ce.href || Ce.to) && ($t2 = m2);
      let dt2 = {};
      $t2 === "button" ? (dt2.type = xe === void 0 ? "button" : xe, dt2.disabled = s) : (!Ce.href && !Ce.to && (dt2.role = "button"), s && (dt2["aria-disabled"] = s));
      let Ka = Lo2(Aa, Ee), qa = Lo2(r, Ka), [Ya, Xa] = ae3.useState(false);
      ae3.useEffect(() => {
        Xa(true);
      }, []);
      let Qa = Ya && !l && !s, Qo2 = g({}, o, { centerRipple: a, component: i, disabled: s, disableRipple: l, disableTouchRipple: p, focusRipple: u, tabIndex: de3, focusVisible: Ie2 }), Ja = su(Qo2);
      return nu(au, g({ as: $t2, className: I2(Ja.root, f), ownerState: Qo2, onBlur: Va, onClick: d2, onContextMenu: za, onFocus: Wa, onKeyDown: Ga, onKeyUp: Ha, onMouseDown: Ia, onMouseLeave: ja, onMouseUp: $a, onDragLeave: La, onTouchEnd: Fa, onTouchMove: Ua, onTouchStart: Da, ref: qa, tabIndex: s ? -1 : de3, type: xe }, dt2, Ce, { children: [c2, Qa ? ou(ra, g({ ref: be, center: a }, ge2)) : null] }));
    }), qe2 = iu;
    z2 = Pe2;
    lu = Y2("MuiFab", ["root", "primary", "secondary", "extended", "circular", "focusVisible", "disabled", "colorInherit", "sizeSmall", "sizeMedium", "sizeLarge"]), Go2 = lu;
    pu = ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"], uu = (e2) => {
      let { color: t, variant: r, classes: o, size: n } = e2, a = { root: ["root", r, `size${z2(n)}`, t === "inherit" && "colorInherit", t === "primary" && "primary", t === "secondary" && "secondary"] };
      return oe3(a, sa, o);
    }, fu = X2(qe2, { name: "MuiFab", slot: "Root", overridesResolver: (e2, t) => {
      let { ownerState: r } = e2;
      return [t.root, t[r.variant], t[`size${z2(r.size)}`], r.color === "inherit" && t.colorInherit, r.color === "primary" && t.primary, r.color === "secondary" && t.secondary];
    } })(({ theme: e2, ownerState: t }) => g({}, e2.typography.button, { minHeight: 36, transition: e2.transitions.create(["background-color", "box-shadow", "border-color"], { duration: e2.transitions.duration.short }), borderRadius: "50%", padding: 0, minWidth: 0, width: 56, height: 56, boxShadow: e2.shadows[6], "&:active": { boxShadow: e2.shadows[12] }, color: e2.palette.getContrastText(e2.palette.grey[300]), backgroundColor: e2.palette.grey[300], "&:hover": { backgroundColor: e2.palette.grey.A100, "@media (hover: none)": { backgroundColor: e2.palette.grey[300] }, textDecoration: "none" }, [`&.${Go2.focusVisible}`]: { boxShadow: e2.shadows[6] }, [`&.${Go2.disabled}`]: { color: e2.palette.action.disabled, boxShadow: e2.shadows[0], backgroundColor: e2.palette.action.disabledBackground } }, t.size === "small" && { width: 40, height: 40 }, t.size === "medium" && { width: 48, height: 48 }, t.variant === "extended" && { borderRadius: 48 / 2, padding: "0 16px", width: "auto", minHeight: "auto", minWidth: 48, height: 48 }, t.variant === "extended" && t.size === "small" && { width: "auto", padding: "0 8px", borderRadius: 34 / 2, minWidth: 34, height: 34 }, t.variant === "extended" && t.size === "medium" && { width: "auto", padding: "0 16px", borderRadius: 40 / 2, minWidth: 40, height: 40 }, t.color === "inherit" && { color: "inherit" }), ({ theme: e2, ownerState: t }) => g({}, t.color === "primary" && { color: e2.palette.primary.contrastText, backgroundColor: e2.palette.primary.main, "&:hover": { backgroundColor: e2.palette.primary.dark, "@media (hover: none)": { backgroundColor: e2.palette.primary.main } } }, t.color === "secondary" && { color: e2.palette.secondary.contrastText, backgroundColor: e2.palette.secondary.main, "&:hover": { backgroundColor: e2.palette.secondary.dark, "@media (hover: none)": { backgroundColor: e2.palette.secondary.main } } })), du = aa.forwardRef(function(t, r) {
      let o = ne3({ props: t, name: "MuiFab" }), { children: n, className: a, color: c2 = "default", component: f = "button", disabled: i = false, disableFocusRipple: s = false, focusVisibleClassName: l, size: p = "large", variant: u = "circular" } = o, m2 = k2(o, pu), h2 = g({}, o, { color: c2, component: f, disabled: i, disableFocusRipple: s, size: p, variant: u }), d2 = uu(h2);
      return cu(fu, g({ className: I2(d2.root, a), component: f, disabled: i, focusRipple: !s, focusVisibleClassName: I2(d2.focusVisible, l), ownerState: h2, ref: r }, m2, { children: n }));
    }), ut2 = du;
    gx = pe3(me());
    mu = Y2("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "contained", "containedInherit", "containedPrimary", "containedSecondary", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]), zt2 = mu;
    hu = la.createContext({}), pa = hu;
    yu = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"], xu = (e2) => {
      let { color: t, disableElevation: r, fullWidth: o, size: n, variant: a, classes: c2 } = e2, f = { root: ["root", a, `${a}${z2(t)}`, `size${z2(n)}`, `${a}Size${z2(n)}`, t === "inherit" && "colorInherit", r && "disableElevation", o && "fullWidth"], label: ["label"], startIcon: ["startIcon", `iconSize${z2(n)}`], endIcon: ["endIcon", `iconSize${z2(n)}`] }, i = oe3(f, ia, c2);
      return g({}, c2, i);
    }, ua = (e2) => g({}, e2.size === "small" && { "& > *:nth-of-type(1)": { fontSize: 18 } }, e2.size === "medium" && { "& > *:nth-of-type(1)": { fontSize: 20 } }, e2.size === "large" && { "& > *:nth-of-type(1)": { fontSize: 22 } }), bu = X2(qe2, { shouldForwardProp: (e2) => zo2(e2) || e2 === "classes", name: "MuiButton", slot: "Root", overridesResolver: (e2, t) => {
      let { ownerState: r } = e2;
      return [t.root, t[r.variant], t[`${r.variant}${z2(r.color)}`], t[`size${z2(r.size)}`], t[`${r.variant}Size${z2(r.size)}`], r.color === "inherit" && t.colorInherit, r.disableElevation && t.disableElevation, r.fullWidth && t.fullWidth];
    } })(({ theme: e2, ownerState: t }) => g({}, e2.typography.button, { minWidth: 64, padding: "6px 16px", borderRadius: e2.shape.borderRadius, transition: e2.transitions.create(["background-color", "box-shadow", "border-color", "color"], { duration: e2.transitions.duration.short }), "&:hover": g({ textDecoration: "none", backgroundColor: ye(e2.palette.text.primary, e2.palette.action.hoverOpacity), "@media (hover: none)": { backgroundColor: "transparent" } }, t.variant === "text" && t.color !== "inherit" && { backgroundColor: ye(e2.palette[t.color].main, e2.palette.action.hoverOpacity), "@media (hover: none)": { backgroundColor: "transparent" } }, t.variant === "outlined" && t.color !== "inherit" && { border: `1px solid ${e2.palette[t.color].main}`, backgroundColor: ye(e2.palette[t.color].main, e2.palette.action.hoverOpacity), "@media (hover: none)": { backgroundColor: "transparent" } }, t.variant === "contained" && { backgroundColor: e2.palette.grey.A100, boxShadow: e2.shadows[4], "@media (hover: none)": { boxShadow: e2.shadows[2], backgroundColor: e2.palette.grey[300] } }, t.variant === "contained" && t.color !== "inherit" && { backgroundColor: e2.palette[t.color].dark, "@media (hover: none)": { backgroundColor: e2.palette[t.color].main } }), "&:active": g({}, t.variant === "contained" && { boxShadow: e2.shadows[8] }), [`&.${zt2.focusVisible}`]: g({}, t.variant === "contained" && { boxShadow: e2.shadows[6] }), [`&.${zt2.disabled}`]: g({ color: e2.palette.action.disabled }, t.variant === "outlined" && { border: `1px solid ${e2.palette.action.disabledBackground}` }, t.variant === "outlined" && t.color === "secondary" && { border: `1px solid ${e2.palette.action.disabled}` }, t.variant === "contained" && { color: e2.palette.action.disabled, boxShadow: e2.shadows[0], backgroundColor: e2.palette.action.disabledBackground }) }, t.variant === "text" && { padding: "6px 8px" }, t.variant === "text" && t.color !== "inherit" && { color: e2.palette[t.color].main }, t.variant === "outlined" && { padding: "5px 15px", border: `1px solid ${e2.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}` }, t.variant === "outlined" && t.color !== "inherit" && { color: e2.palette[t.color].main, border: `1px solid ${ye(e2.palette[t.color].main, 0.5)}` }, t.variant === "contained" && { color: e2.palette.getContrastText(e2.palette.grey[300]), backgroundColor: e2.palette.grey[300], boxShadow: e2.shadows[2] }, t.variant === "contained" && t.color !== "inherit" && { color: e2.palette[t.color].contrastText, backgroundColor: e2.palette[t.color].main }, t.color === "inherit" && { color: "inherit", borderColor: "currentColor" }, t.size === "small" && t.variant === "text" && { padding: "4px 5px", fontSize: e2.typography.pxToRem(13) }, t.size === "large" && t.variant === "text" && { padding: "8px 11px", fontSize: e2.typography.pxToRem(15) }, t.size === "small" && t.variant === "outlined" && { padding: "3px 9px", fontSize: e2.typography.pxToRem(13) }, t.size === "large" && t.variant === "outlined" && { padding: "7px 21px", fontSize: e2.typography.pxToRem(15) }, t.size === "small" && t.variant === "contained" && { padding: "4px 10px", fontSize: e2.typography.pxToRem(13) }, t.size === "large" && t.variant === "contained" && { padding: "8px 22px", fontSize: e2.typography.pxToRem(15) }, t.fullWidth && { width: "100%" }), ({ ownerState: e2 }) => e2.disableElevation && { boxShadow: "none", "&:hover": { boxShadow: "none" }, [`&.${zt2.focusVisible}`]: { boxShadow: "none" }, "&:active": { boxShadow: "none" }, [`&.${zt2.disabled}`]: { boxShadow: "none" } }), vu = X2("span", { name: "MuiButton", slot: "StartIcon", overridesResolver: (e2, t) => {
      let { ownerState: r } = e2;
      return [t.startIcon, t[`iconSize${z2(r.size)}`]];
    } })(({ ownerState: e2 }) => g({ display: "inherit", marginRight: 8, marginLeft: -4 }, e2.size === "small" && { marginLeft: -2 }, ua(e2))), Tu = X2("span", { name: "MuiButton", slot: "EndIcon", overridesResolver: (e2, t) => {
      let { ownerState: r } = e2;
      return [t.endIcon, t[`iconSize${z2(r.size)}`]];
    } })(({ ownerState: e2 }) => g({ display: "inherit", marginRight: -4, marginLeft: 8 }, e2.size === "small" && { marginRight: -2 }, ua(e2))), Pu = Rr2.forwardRef(function(t, r) {
      let o = Rr2.useContext(pa), n = lt2(o, t), a = ne3({ props: n, name: "MuiButton" }), { children: c2, color: f = "primary", component: i = "button", className: s, disabled: l = false, disableElevation: p = false, disableFocusRipple: u = false, endIcon: m2, focusVisibleClassName: h2, fullWidth: d2 = false, size: y = "medium", startIcon: b2, type: P2, variant: v2 = "text" } = a, S3 = k2(a, yu), E2 = g({}, a, { color: f, component: i, disabled: l, disableElevation: p, disableFocusRipple: u, fullWidth: d2, size: y, type: P2, variant: v2 }), T2 = xu(E2), C2 = b2 && ca(vu, { className: T2.startIcon, ownerState: E2, children: b2 }), R2 = m2 && ca(Tu, { className: T2.endIcon, ownerState: E2, children: m2 });
      return gu(bu, g({ ownerState: E2, className: I2(s, o.className), component: i, disabled: l, focusRipple: !u, focusVisibleClassName: I2(T2.focusVisible, h2), ref: r, type: P2 }, S3, { classes: T2, children: [C2, c2, R2] }));
    }), Ho2 = Pu;
    Wx = pe3(me());
    Su = Y2("MuiToggleButton", ["root", "disabled", "selected", "standard", "primary", "secondary", "sizeSmall", "sizeMedium", "sizeLarge"]), Ko = Su;
    Cu = ["children", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "onChange", "onClick", "selected", "size", "value"], _u = (e2) => {
      let { classes: t, fullWidth: r, selected: o, disabled: n, size: a, color: c2 } = e2, f = { root: ["root", o && "selected", n && "disabled", r && "fullWidth", `size${z2(a)}`, c2] };
      return oe3(f, fa, t);
    }, wu = X2(qe2, { name: "MuiToggleButton", slot: "Root", overridesResolver: (e2, t) => {
      let { ownerState: r } = e2;
      return [t.root, t[`size${z2(r.size)}`]];
    } })(({ theme: e2, ownerState: t }) => {
      let r = t.color === "standard" ? e2.palette.text.primary : e2.palette[t.color].main;
      return g({}, e2.typography.button, { borderRadius: e2.shape.borderRadius, padding: 11, border: `1px solid ${e2.palette.divider}`, color: e2.palette.action.active }, t.fullWidth && { width: "100%" }, { [`&.${Ko.disabled}`]: { color: e2.palette.action.disabled, border: `1px solid ${e2.palette.action.disabledBackground}` }, "&:hover": { textDecoration: "none", backgroundColor: ye(e2.palette.text.primary, e2.palette.action.hoverOpacity), "@media (hover: none)": { backgroundColor: "transparent" } }, [`&.${Ko.selected}`]: { color: r, backgroundColor: ye(r, e2.palette.action.selectedOpacity), "&:hover": { backgroundColor: ye(r, e2.palette.action.selectedOpacity + e2.palette.action.hoverOpacity), "@media (hover: none)": { backgroundColor: ye(r, e2.palette.action.selectedOpacity) } } } }, t.size === "small" && { padding: 7, fontSize: e2.typography.pxToRem(13) }, t.size === "large" && { padding: 15, fontSize: e2.typography.pxToRem(15) });
    }), ku = da.forwardRef(function(t, r) {
      let o = ne3({ props: t, name: "MuiToggleButton" }), { children: n, className: a, color: c2 = "standard", disabled: f = false, disableFocusRipple: i = false, fullWidth: s = false, onChange: l, onClick: p, selected: u, size: m2 = "medium", value: h2 } = o, d2 = k2(o, Cu), y = g({}, o, { color: c2, disabled: f, disableFocusRipple: i, fullWidth: s, size: m2 }), b2 = _u(y), P2 = (v2) => {
        p && (p(v2, h2), v2.defaultPrevented) || l && l(v2, h2);
      };
      return Eu(wu, g({ className: I2(b2.root, a), disabled: f, focusRipple: !i, ref: r, onClick: P2, onChange: l, value: h2, ownerState: y, "aria-pressed": u }, d2, { children: n }));
    }), Or = ku;
    cb = pe3(ps2()), fb = pe3(me());
    Ru = Y2("MuiToggleButtonGroup", ["root", "selected", "vertical", "disabled", "grouped", "groupedHorizontal", "groupedVertical"]), Se2 = Ru;
    Ou = ["children", "className", "color", "disabled", "exclusive", "fullWidth", "onChange", "orientation", "size", "value"], Mu = (e2) => {
      let { classes: t, orientation: r, fullWidth: o, disabled: n } = e2, a = { root: ["root", r === "vertical" && "vertical", o && "fullWidth"], grouped: ["grouped", `grouped${z2(r)}`, n && "disabled"] };
      return oe3(a, ma, t);
    }, Bu = X2("div", { name: "MuiToggleButtonGroup", slot: "Root", overridesResolver: (e2, t) => {
      let { ownerState: r } = e2;
      return [{ [`& .${Se2.grouped}`]: t.grouped }, { [`& .${Se2.grouped}`]: t[`grouped${z2(r.orientation)}`] }, t.root, r.orientation === "vertical" && t.vertical, r.fullWidth && t.fullWidth];
    } })(({ ownerState: e2, theme: t }) => g({ display: "inline-flex", borderRadius: t.shape.borderRadius }, e2.orientation === "vertical" && { flexDirection: "column" }, e2.fullWidth && { width: "100%" }, { [`& .${Se2.grouped}`]: g({}, e2.orientation === "horizontal" ? { "&:not(:first-of-type)": { marginLeft: -1, borderLeft: "1px solid transparent", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }, "&:not(:last-of-type)": { borderTopRightRadius: 0, borderBottomRightRadius: 0 }, [`&.${Se2.selected} + .${Se2.grouped}.${Se2.selected}`]: { borderLeft: 0, marginLeft: 0 } } : { "&:not(:first-of-type)": { marginTop: -1, borderTop: "1px solid transparent", borderTopLeftRadius: 0, borderTopRightRadius: 0 }, "&:not(:last-of-type)": { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }, [`&.${Se2.selected} + .${Se2.grouped}.${Se2.selected}`]: { borderTop: 0, marginTop: 0 } }) })), Au = Ae.forwardRef(function(t, r) {
      let o = ne3({ props: t, name: "MuiToggleButtonGroup" }), { children: n, className: a, color: c2 = "standard", disabled: f = false, exclusive: i = false, fullWidth: s = false, onChange: l, orientation: p = "horizontal", size: u = "medium", value: m2 } = o, h2 = k2(o, Ou), d2 = g({}, o, { disabled: f, fullWidth: s, orientation: p, size: u }), y = Mu(d2), b2 = (v2, S3) => {
        if (!l)
          return;
        let E2 = m2 && m2.indexOf(S3), T2;
        m2 && E2 >= 0 ? (T2 = m2.slice(), T2.splice(E2, 1)) : T2 = m2 ? m2.concat(S3) : [S3], l(v2, T2);
      }, P2 = (v2, S3) => {
        !l || l(v2, m2 === S3 ? null : S3);
      };
      return Nu(Bu, g({ role: "group", className: I2(y.root, a), ref: r, ownerState: d2 }, h2, { children: Ae.Children.map(n, (v2) => Ae.isValidElement(v2) ? Ae.cloneElement(v2, { className: I2(y.grouped, v2.props.className), onChange: i ? P2 : b2, selected: v2.props.selected === void 0 ? qo2(v2.props.value, m2) : v2.props.selected, size: v2.props.size || u, fullWidth: s, color: v2.props.color || c2, disabled: v2.props.disabled || f }) : null) }));
    }), Nr = Au;
    Nb = pe3(me());
    wb = Y2("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
    Iu = ["children", "className", "color", "component", "fontSize", "htmlColor", "titleAccess", "viewBox"], $u = (e2) => {
      let { color: t, fontSize: r, classes: o } = e2, n = { root: ["root", t !== "inherit" && `color${z2(t)}`, `fontSize${z2(r)}`] };
      return oe3(n, ha, o);
    }, ju = X2("svg", { name: "MuiSvgIcon", slot: "Root", overridesResolver: (e2, t) => {
      let { ownerState: r } = e2;
      return [t.root, r.color !== "inherit" && t[`color${z2(r.color)}`], t[`fontSize${z2(r.fontSize)}`]];
    } })(({ theme: e2, ownerState: t }) => {
      var r, o;
      return { userSelect: "none", width: "1em", height: "1em", display: "inline-block", fill: "currentColor", flexShrink: 0, transition: e2.transitions.create("fill", { duration: e2.transitions.duration.shorter }), fontSize: { inherit: "inherit", small: e2.typography.pxToRem(20), medium: e2.typography.pxToRem(24), large: e2.typography.pxToRem(35) }[t.fontSize], color: (r = (o = e2.palette[t.color]) == null ? void 0 : o.main) != null ? r : { action: e2.palette.action.active, disabled: e2.palette.action.disabled, inherit: void 0 }[t.color] };
    }), ga = ya.forwardRef(function(t, r) {
      let o = ne3({ props: t, name: "MuiSvgIcon" }), { children: n, className: a, color: c2 = "inherit", component: f = "svg", fontSize: i = "medium", htmlColor: s, titleAccess: l, viewBox: p = "0 0 24 24" } = o, u = k2(o, Iu), m2 = g({}, o, { color: c2, component: f, fontSize: i, viewBox: p }), h2 = $u(m2);
      return Lu(ju, g({ as: f, className: I2(h2.root, a), ownerState: m2, focusable: "false", viewBox: p, color: s, "aria-hidden": l ? void 0 : true, role: l ? "img" : void 0, ref: r }, u, { children: [n, l ? zu("title", { children: l }) : null] }));
    });
    ga.muiName = "SvgIcon";
    Mr = ga;
    xa = ue3(M3.createElement("path", { key: "12", d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" }), "Share");
    ba = ue3(M3.createElement("path", { key: "12", d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z" }), "TabletAndroid");
    va2 = ue3(M3.createElement("path", { key: "12", d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" }), "Tv");
    Ta = ue3(M3.createElement("path", { key: "12", d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z" }), "PhoneAndroid");
    Pa = ue3(M3.createElement("path", { key: "12", d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z" }), "QrCode");
    hf = ({ url: e2 }) => {
      let t = M3.useRef(null);
      return M3.useEffect(() => {
        (async () => {
          let { QRious: o } = await Promise.resolve().then(() => (ka(), wa)), n = { size: 200, element: t.current, foregroundAlpha: 0.9, foreground: "white", backgroundAlpha: 1, padding: 16, background: "#1e1e1e", value: e2 }, a = new o(n);
        })();
      }, [e2]), w2("canvas", { css: j2`
        border-radius: 16px;
        margin-bottom: 8px;
  `, ref: t });
    }, Ra = ({ url: e2 }) => {
      let [t, r] = M3.useState(false);
      return w2(ft2.div, { animate: { width: t ? 200 : 56, height: t ? 220 : 48 }, onClick: (o) => {
        r(!t);
      }, css: j2`
                margin-bottom: 12px;
              ` }, t ? w2(hf, { key: e2, url: e2 + "/edit/" }) : w2(ut2, { variant: "extended", color: "secondary", onClick: () => {
        r(!t);
      } }, w2(Pa, null)));
    };
    ({ Suspense: yf } = M3), Oa = [640, 1024, 1920], gf = [10, 25, 50, 75, 100], xf = M3.lazy(() => import("https://code.spike.land/api/room/sanyi/js")), eP = M3.lazy(() => import("https://code.spike.land/api/room/sanyi/js"));
    vf = ({ onShare: e2, onRestore: t, position: r, session: o }) => {
      let [n, a] = M3.useState(false), [c2, f] = M3.useState(75), [i, s] = M3.useState(innerHeight), [l, p] = M3.useState([o.children]);
      o.setChild = p;
      let [u, m2] = M3.useState(o.url), [h2, d2] = M3.useState(" "), [y, b2] = M3.useState(Oa[1]), P2 = M3.useRef(null), v2 = M3.useRef(null), S3 = l[l.length - 1];
      M3.useEffect(() => {
        window.addEventListener("resize", () => s(window.innerHeight));
      }), M3.useEffect(() => {
        let T2 = setInterval(() => {
          if (h2 !== o.errorText) {
            let C2 = o.errorText;
            d2(C2), a(false), setTimeout(() => {
              o.errorText === C2 && a(true);
            }, 2e3);
          }
          u !== o.url && m2(o.url);
        }, 200);
        return () => clearInterval(T2);
      }, [d2, m2, h2, u]);
      let E2 = c2 / 100;
      return w2(M3.Fragment, null, w2(ft2.div, { ref: P2, css: j2`
            right: 20px;
            background-color:rgba(92 ,92, 152, 0.8);
            backdrop-filter: blur(10px);
            top: 20px;
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${r || "fixed"};
          `, dragElastic: 0.5, dragConstraints: { left: 0, right: y - 20 - y / 6, top: -i + 100, bottom: innerHeight - 100 }, dragMomentum: false, drag: true }, w2("div", { css: j2` 
              display: flex;
                ` }, w2("div", { css: j2`
            display: flex;
            flex-direction: column;
            align-items: center;
          ` }, w2(Nr, { value: c2, size: "small", exclusive: true, onChange: (T2, C2) => C2 && f(C2) }, gf.map((T2) => w2(Or, { key: T2, value: T2 }, w2("span", { css: j2`
                       color: ${T2 === c2 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       ` }, T2, "%")))), w2(ft2.div, { animate: { width: y * E2 / devicePixelRatio, height: i * E2 }, css: j2`
              display: block;
              overflow: hidden;
              border-radius: 8px;
              opacity: 0.9;
           ` }, h2.trim() !== "" && w2("pre", { css: j2`
                    position: absolute;
                    z-index:3;
                    color: rgb(255, 240, 240);
                    padding: 24px;
                    font-size: 14pt;
                    background-color: rgb(255, 0, 0);
                    flex: 0 0 auto;
                    overflow: auto;
                    margin: 0;
                    font-family: monospace;
                    white-space: pre-wrap;
                ` }, n && h2.trim(), n && h2.trim() !== "" && w2("div", { css: j2`
                          text-align: right;
                        ` }, w2(Ho2, { variant: "contained", onClick: () => {
        t(), d2("");
      }, color: "primary" }, "Restore"))), w2(ft2.div, { animate: { transformOrigin: "0px 0px", width: y / devicePixelRatio, height: i, scale: E2 }, css: j2`
                  overflow:overlay;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              ` }, h2 ? w2("div", { dangerouslySetInnerHTML: Tf(o.html) }) : w2(M3.Suspense, { fallback: w2("div", null, "Error fallback") }, w2("div", { id: "zbody", key: o.i, ref: v2 }, S3)))), w2(Nr, { value: y, size: "small", exclusive: true, onChange: (T2, C2) => C2 && b2(C2) }, Oa.map((T2) => w2(Or, { key: T2, value: T2 }, T2 === 640 ? w2(Ta, { css: j2`
                        color: ${y === 640 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        ` }) : T2 === 1024 ? w2(ba, { css: j2`
                        color: ${y === 1024 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        ` }) : w2(va2, { css: j2`
                        color: ${y === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      ` }))))), w2("div", { css: j2`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              ` }, w2(Ra, { url: u }), w2(ut2, { variant: "extended", color: "primary", onClick: () => {
        e2();
      } }, w2(xa, null)), w2(bf, null)))));
    };
    ({ motion: ft2 } = Pf);
    sP = (e2, t) => {
      let r = Na.render(w2(Sf, { children: e2 }), t);
    }, aP = M3;
  }
});

// js/renderPreviewWindow.mjs
async function renderPreviewWindow(session) {
  const {
    DraggableWindow,
    jsx: jsx2,
    render: render2
  } = await Promise.resolve().then(() => (init_renderer(), renderer_exports));
  const onShare = async () => {
    const { shareItAsHtml: shareItAsHtml2 } = await Promise.resolve().then(() => (init_share(), share_exports));
    const link = await shareItAsHtml2(session);
    open(link + "/");
  };
  let preview = window.document.getElementById("preview");
  if (!preview) {
    const element = window.document.createElement("div");
    window.document.body.appendChild(element);
    preview = element;
  }
  render2(jsx2(DraggableWindow, {
    onShare,
    session,
    onRestore: () => {
      const model = session.editor.getModel();
      model.setValue(session.code);
    },
    position: session.mode === "window" ? "fixed" : "absolute"
  }), preview);
}
var init_renderPreviewWindow = __esm({
  "js/renderPreviewWindow.mjs"() {
  }
});

// js/quickStart.mjs
var quickStart_exports = {};
__export(quickStart_exports, {
  quickStart: () => quickStart,
  restartX: () => restartX,
  startMonacoWithSession: () => startMonacoWithSession
});
import { jsx } from "https://unpkg.com/@emotion/react@11.7.1/dist/emotion-react.browser.esm.js";
import ReactDOM from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react-dom.mjs";
async function startMonacoWithSession(session) {
  const shadDom = document.getElementById("edizzoo");
  const getEditor = await editor_default({
    language: "typescript",
    container: shadDom,
    code: session.code,
    onChange: (code, changes) => runner(code, changes)
  });
  session.editor = getEditor();
  const monaco = window.monaco;
  window.sess = session;
  async function getErrors(session2) {
    if (!monaco) {
      return [{ messageText: "Error with the error checking. Try to reload!" }];
    }
    const model = session2.editor.getModel();
    const worker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await worker(model);
    const filename = model.uri.toString();
    const diag = client.getSemanticDiagnostics(filename);
    const comp = client.getCompilerOptionsDiagnostics(filename);
    const syntax = client.getSyntacticDiagnostics(filename);
    const fastError = await Promise.race([diag, comp, syntax]);
    console.log(fastError);
    return [];
  }
  async function restart2(c2) {
    const restartCode2 = (await Promise.resolve().then(() => (init_restartCode(), restartCode_exports))).restart;
    return restartCode2(c2);
  }
  async function runner(c2, changes = null) {
    session.changes.push(changes);
    if (window.sendChannel && window.sendChannel.readyState === "open") {
      const Hash3 = (await import("https://unpkg.com/@spike.land/esm@0.2.49/dist/ipfs-only-hash.mjs")).default;
      const hashOfCode = await Hash3.of(c2);
      if (window.hashOfCode === window.hashOfStarterCode && window.hashOfCode === hashOfCode) {
        return;
      }
      window[hashOfCode] = c2;
      const prevHash = await Hash3.of(session.code);
      window[prevHash] = session.code;
      if (window.hashOfCode !== hashOfCode) {
        const starterCode = c2;
        const createDelta2 = (await import("https://unpkg.com/@spike.land/esm@0.2.49/dist/textdiff-create.mjs")).default;
        window.sendChannel.send(JSON.stringify({
          changes,
          i: session.i,
          hashOfCode,
          prevHash: window.hashOfStarterCode,
          codeDiff: createPatch(starterCode, c2, createDelta2)
        }));
      }
    }
    session.errorText = "";
    session.i++;
    const counter = session.i;
    try {
      const formatter2 = (await Promise.resolve().then(() => (init_formatter(), formatter_exports))).formatter;
      const cd = await formatter2(c2);
      const baberTransform2 = (await Promise.resolve().then(() => (init_babel(), babel_exports))).baberTransform;
      const transpiled = await baberTransform2(cd);
      let restartError = false;
      if (transpiled.length && session.lastErrors < 2) {
        if (counter < session.i)
          return;
        restartError = await restart2(c2);
      }
      if (session.i > counter)
        return;
      const err = await getErrors(session);
      if (session.i > counter)
        return;
      if (restartError) {
        err.push({ messageText: "Error while starting the app. Check the console!" });
      }
      if (err.length)
        console.log({ err });
      if (session.lastErrors && err.length === 0) {
        restart2(c2);
      }
      session.lastErrors = err.length;
      if (err.length === 0 && transpiled.length) {
        if (session.i > counter)
          return;
        session.code = cd;
        session.codeNonFormatted = c2;
        const saveCode2 = (await Promise.resolve().then(() => (init_data(), data_exports))).saveCode;
        saveCode2(session, counter);
      } else {
        console.log({ code: c2, transpiled });
        if (session.i > counter)
          return;
        if (cd.length < 1e3 && session.code.length < 1e3) {
          const diff = (await Promise.resolve().then(() => (init_shaDB(), shaDB_exports))).diff;
          const slices = await diff(session.code, cd);
          if (slices.c.length <= 3) {
            session.lastErrors = 0;
            return;
          }
          if (slices.c.length == 4) {
            session.lastErrors = 0;
            monaco.editor.setTheme("hc-black");
            return;
          }
        }
        if (err && err[0] && err[0].messageText) {
          console.error(err[0].messageText.toString());
        }
        return;
      }
      monaco.editor.setTheme("vs-dark");
    } catch (err) {
      monaco.editor.setTheme("vs-light");
      setTimeout(() => {
        monaco.editor.setTheme("hc-black");
      }, 50);
      session.errorText = err.message;
      console.error(err.message);
    }
  }
}
async function quickStart(session) {
  await renderPreviewWindow(session);
  await startMonacoWithSession(session);
  await restartX(session.transpiled, document.getElementById("zbody"), session.i + 1, session);
}
async function restartX(transpiled, target, counter, session) {
  if (session.i > counter)
    return false;
  if (session.actualT === transpiled)
    return false;
  session.actualT = transpiled;
  session.html = "";
  session.transpiled = "";
  let hadError = false;
  if (typeof transpiled !== "string" || transpiled === "") {
    hadError = true;
    return hadError;
  }
  let children;
  try {
    children = await getReactChild(transpiled);
  } catch (error) {
    session.errorText = error.message;
    console.error({ error, message: "error in rendering" });
    return true;
  }
  const zbody = target || document.createElement("div");
  ReactDOM.render(children, zbody);
  session.div = zbody;
  if (zbody.innerHTML) {
    session.transpiled = transpiled;
    session.html = zbody.innerHTML;
    session.children = children;
    session.setChild((c2) => [...c2, session.children]);
  }
  return !zbody.innerHTML;
}
async function getReactChild(transpiled, mode = "window") {
  const codeToHydrate = mode === "window" ? transpiled.replace("body{", "#zbody{") : transpiled;
  const objUrl = createJsBlob(codeToHydrate);
  const mod3 = await import(objUrl);
  URL.revokeObjectURL(objUrl);
  return jsx(mod3.default);
}
function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });
  return URL.createObjectURL(blob);
}
function createPatch(oldCode, newCode, createDelta2) {
  return JSON.stringify(createDelta2(oldCode, newCode));
}
var init_quickStart = __esm({
  "js/quickStart.mjs"() {
    init_editor();
    init_renderPreviewWindow();
    init_restartCode();
  }
});

// js/restartCode.mjs
var restartCode_exports = {};
__export(restartCode_exports, {
  restart: () => restart
});
var restart;
var init_restartCode = __esm({
  "js/restartCode.mjs"() {
    init_babel();
    init_quickStart();
    restart = async (code, target) => {
      const session = window.sess || {
        setChild: () => {
        }
      };
      window.sess = session;
      const transpiled = await baberTransform(code);
      return await restartX(transpiled, target, session.counter, session);
    };
  }
});

// js/ws.mjs
init_formatter();
import createDelta from "https://unpkg.com/@spike.land/esm@0.2.49/dist/textdiff-create.mjs";
import applyPatch from "https://unpkg.com/@spike.land/esm@0.2.49/dist/textdiff-patch.mjs";
import Hash2 from "https://unpkg.com/@spike.land/esm@0.2.49/dist/ipfs-only-hash.mjs";
var currentWebSocket = null;
var sess2 = false;
var mod2 = {};
function createPatch2(oldCode, newCode) {
  return JSON.stringify(createDelta(oldCode, newCode));
}
var chCode = async (code) => {
  if (!code)
    return;
  try {
    if (window.sess && window.monaco && window.monaco.editor.getModels().length) {
      const hashOfCode = await Hash2.of(code);
      window.hashOfCode = hashOfCode;
      window[hashOfCode] = code;
      window.monaco.editor.getModels()[0].setValue(code);
    } else {
      if (location.href.endsWith("/public")) {
        await restartCode(code);
        return;
      }
      const { run: run3 } = await Promise.resolve().then(() => (init_reactLoader(), reactLoader_exports));
      run3({ mode: "window", code, room: roomName });
    }
  } catch (e2) {
    console.error({ e: e2 });
  }
};
var hostname = "code.spike.land";
var roomName = "";
var username = "";
var lastSeenTimestamp = 0;
var lastSeenNow = 0;
var lastSeenCode = "";
var ws2;
var startTime;
var rejoined = false;
var sendChannel;
var rejoin = async () => {
  if (!rejoined) {
    rejoined = true;
    currentWebSocket = null;
    let timeSinceLastJoin = Date.now() - startTime;
    if (timeSinceLastJoin < 1e4) {
      await new Promise((resolve) => setTimeout(resolve, 1e4 - timeSinceLastJoin));
    }
    join();
  }
};
var intervalHandler = null;
var join = (room2, user) => {
  if (room2)
    roomName = room2;
  if (user)
    username = user;
  if (sess2)
    return;
  sess2 = true;
  setTimeout(() => {
    sess2 = false;
  }, 1e4);
  ws2 = new WebSocket("wss://" + hostname + "/api/room/" + roomName + "/websocket");
  rejoined = false;
  startTime = Date.now();
  ws2.addEventListener("open", () => {
    if (!intervalHandler) {
      intervalHandler = setInterval(() => {
        const now = Date.now();
        const diff = now - lastSeenNow;
        if (now - lastSeenNow > 3e4) {
          ws2.send(JSON.stringify({ name: username, time: lastSeenTimestamp + diff }));
        }
      }, 3e4);
    }
    console.log("connected");
    currentWebSocket = ws2;
    const broad = async ({ code, hashOfCode, starterCode, transpiled, html, css, i }) => {
      if (i != window.sess.i)
        return;
      const formattedCode = await formatter(code);
      const hashOfFormattedCode = await Hash2.of(formattedCode);
      if (code !== lastSeenCode && formattedCode !== lastSeenCode && hashOfFormattedCode !== window.hashOfCode) {
        lastSeenCode = code;
        let codeDiff;
        const prevHash = window.currentHashOfCode;
        if (hashOfCode === prevHash)
          return;
        if (code === window[prevHash])
          return;
        if (window.starterCode) {
          try {
            codeDiff = prevHash && window[prevHash] && createPatch2(window[prevHash], code);
          } catch (e2) {
            console.error({ e: e2 });
          }
        }
        const message = { hashOfCode };
        if (codeDiff) {
          message.name = username;
          message.codeDiff = codeDiff;
          message.hashOfCode = hashOfCode;
          message.i = i;
          message.hashOfStarterCode = prevHash;
          if (prevHash && mod2[prevHash]) {
            message.htmlDiff = createPatch2(mod2[prevHash].html, html);
            message.cssDiff = createPatch2(mod2[prevHash].css, css);
            message.transpiledDiff = createPatch2(mod2[prevHash].transpiled, transpiled);
          } else {
            message.html = html;
            message.css = css;
            message.transpiled = transpiled;
          }
          window.currentHashOfCode = hashOfCode;
          window[hashOfCode] = code;
          if (!mod2[hashOfCode]) {
            mod2[hashOfCode] = {
              transpiled,
              css,
              html
            };
          }
          window.starterCode = starterCode;
        } else {
          message.code = code;
          message.name = username;
          message.html = html;
          message.css = css;
          message.transpiled = transpiled;
          message.i = i;
          message.hashOfCode = hashOfCode;
        }
        const msgStr = JSON.stringify(message);
        if (sendChannel && sendChannel.readyState === "open") {
          sendChannel.send(msgStr);
        }
        try {
          currentWebSocket.send(msgStr);
        } catch (e2) {
          rejoin();
          setTimeout(() => currentWebSocket.send(msgStr), 50);
        }
      }
    };
    window.broad = broad;
    window.chCode = chCode;
    ws2.send(JSON.stringify({ name: username }));
  });
  ws2.addEventListener("message", processWsMessage);
  ws2.addEventListener("close", (event) => {
    console.log("WebSocket closed, reconnecting:", event.code, event.reason);
    rejoin();
  });
  ws2.addEventListener("error", (event) => {
    console.log("WebSocket error, reconnecting:", event);
    rejoin();
  });
};
var restartCode = async (c2) => {
  const { restart: restart2 } = await Promise.resolve().then(() => (init_restartCode(), restartCode_exports));
  restart2(c2, document.getElementById("zbody"));
};
var run2 = async () => {
  const room2 = location.pathname.slice(1).split("/")[2] || "code-main";
  join(room2);
};
var myHostname = window.location.hostname;
if (!myHostname) {
  myHostname = "localhost";
}
log("Hostname: " + myHostname);
var targetUsername = null;
var myPeerConnection = null;
function log(text) {
  var time = new Date();
  console.log("[" + time.toLocaleTimeString() + "] " + text);
}
function log_error(text) {
  var time = new Date();
  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}
async function createPeerConnection() {
  log("Setting up a connection...");
  const rcpOpts = {
    iceServers: ["stun3.l.google.com:19302"].map((url) => ({
      urls: `stun:${url}`
    }))
  };
  rcpOpts.iceServers = [{ "urls": "stun:stun.stunprotocol.org:3478" }, {
    "urls": "stun:stun.l.google.com:19302"
  }];
  myPeerConnection = new RTCPeerConnection(rcpOpts);
  myPeerConnection.onicecandidate = handleICECandidateEvent;
  myPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
  myPeerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
  myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
  myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  myPeerConnection.ontrack = handleTrackEvent;
  myPeerConnection.addEventListener("datachannel", receiveChannelCallback);
  function receiveChannelCallback(event) {
    console.log("Receive Channel Callback");
    sendChannel = event.channel;
    sendChannel.binaryType = "arraybuffer";
    sendChannel.addEventListener("close", onReceiveChannelClosed);
    sendChannel.addEventListener("message", processWsMessage);
  }
  function onReceiveChannelClosed() {
    console.log("Receive channel is closed");
    myPeerConnection.close();
    myPeerConnection = null;
    console.log("Closed remote peer connection");
  }
  const dataChannelOptions = {
    ordered: true,
    reliable: true,
    maxPacketLifeTime: 3e3
  };
  sendChannel = myPeerConnection.createDataChannel("myLabel", dataChannelOptions);
  sendChannel.binaryType = "arraybuffer";
  sendChannel.addEventListener("message", processWsMessage);
  sendChannel.onerror = (error) => {
    console.log("xxxxxx-  Data Channel Error:", error);
  };
  sendChannel.onmessage = processWsMessage;
  sendChannel.onopen = () => {
  };
  sendChannel.onclose = () => {
    console.log("xxxxxxxx- The Data Channel is Closed");
  };
  window.myPeerConnection = myPeerConnection;
  window.sendChannel = sendChannel;
}
async function handleNegotiationNeededEvent() {
  log("*** Negotiation needed");
  try {
    log("---> Creating offer");
    const offer = await myPeerConnection.createOffer();
    if (myPeerConnection.signalingState != "stable") {
      log("     -- The connection isn't stable yet; postponing...");
      return;
    }
    log("---> Setting local description to the offer");
    await myPeerConnection.setLocalDescription(offer);
    log("---> Sending the offer to the remote peer");
    ws2.send(JSON.stringify({
      target: targetUsername,
      type: "video-offer",
      sdp: myPeerConnection.localDescription
    }));
  } catch (err) {
    log("*** The following error occurred while handling the negotiationneeded event:");
  }
}
function handleTrackEvent(event) {
  log("*** Track event");
  document.getElementById("received_video").srcObject = event.streams[0];
  document.getElementById("hangup-button").disabled = false;
}
function handleICECandidateEvent(event) {
  if (event.candidate) {
    log("*** Outgoing ICE candidate: " + event.candidate);
    ws2.send(JSON.stringify({
      type: "new-ice-candidate",
      target: targetUsername,
      candidate: event.candidate
    }));
  }
}
function handleICEConnectionStateChangeEvent() {
  log("*** ICE connection state changed to " + myPeerConnection.iceConnectionState);
  switch (myPeerConnection.iceConnectionState) {
    case "closed":
    case "failed":
    case "disconnected":
      break;
  }
}
async function handleNewICECandidateMsg(msg) {
  log("*** Adding received ICE candidate: " + JSON.stringify(msg.candidate));
  var candidate = new RTCIceCandidate(msg.candidate);
  try {
    await myPeerConnection.addIceCandidate(candidate);
  } catch (err) {
    reportError(err);
  }
}
function handleSignalingStateChangeEvent() {
  log("*** myPeerConnection.signalingState  changed to: " + myPeerConnection.signalingState);
  switch (myPeerConnection.signalingState) {
    case "closed":
      break;
  }
}
function handleICEGatheringStateChangeEvent() {
  log("*** myPeerConnection.iceGatheringState changed to: " + myPeerConnection.iceGatheringState);
}
function reportError(errMessage) {
  log_error(`Error ${errMessage.name}: ${errMessage.message}`);
}
async function handleChatOffer(msg) {
  targetUsername = msg.name;
  log("Received chat offer from " + targetUsername);
  if (!myPeerConnection) {
    createPeerConnection();
  }
  var desc = new RTCSessionDescription(msg.sdp);
  if (myPeerConnection.signalingState != "stable") {
    log("  - But the signaling state isn't stable, so triggering rollback");
    await Promise.all([
      myPeerConnection.setLocalDescription({ type: "rollback" }),
      myPeerConnection.setRemoteDescription(desc)
    ]);
    return;
  } else {
    log("  - Setting remote description");
    await myPeerConnection.setRemoteDescription(desc);
  }
  log("---> Creating and sending answer to caller");
  await myPeerConnection.setLocalDescription(await myPeerConnection.createAnswer());
  ws2.send(JSON.stringify({
    target: targetUsername,
    type: "video-answer",
    sdp: myPeerConnection.localDescription
  }));
}
async function handleChatAnswerMsg(msg) {
  log("*** Call recipient has accepted our call");
  var desc = new RTCSessionDescription(msg.sdp);
  await myPeerConnection.setRemoteDescription(desc).catch(reportError);
}
var cids = {};
async function getCID(CID) {
  if (cids[CID] && typeof cids[CID] === "string")
    return cids[CID];
  if (cids[CID] && typeof cids[CID] === "function")
    return cids[CID]();
  const requestSrt = JSON.stringify({
    type: "get-cid",
    cid: CID
  });
  if (sendChannel && sendChannel.readyState === "open") {
    sendChannel.send(requestSrt);
  } else {
    ws2.send(requestSrt);
  }
  return new Promise((resolve) => {
    cids[CID] = resolve;
  });
}
async function processWsMessage(event) {
  const data = JSON.parse(event.data);
  if (data.code && !window.sess) {
    const session = {
      code: data.code,
      errorText: "",
      changes: [],
      setChild: () => {
      },
      transpiled: data.transpiled,
      html: data.html,
      i: data.i,
      css: data.css
    };
    const quickStart2 = (await Promise.resolve().then(() => (init_quickStart(), quickStart_exports))).quickStart;
    console.log("quick start", session);
    quickStart2(session);
    return;
  }
  if (data.name && data.hashOfCode && data.name !== username && targetUsername == null) {
    targetUsername = data.name;
    window.targetUsername = data.name;
    try {
      await createPeerConnection();
    } catch (e2) {
      console.log({ e: e2 });
      log_error("Error with p2p");
    }
  }
  if (data.type === "new-ice-candidate") {
    await handleNewICECandidateMsg(data);
    return;
  }
  if (data.type === "video-offer") {
    targetUsername = data.name;
    window.targetUsername = data.name;
    await handleChatOffer(data);
    return;
  }
  if (data.type === "get-cid" && data.cid) {
    const CID = data.cid;
    const content = data[CID];
    if (content) {
      const dataCID = await Hash2.of(content);
      if (dataCID !== CID)
        console.error("get-cid ERROR!!!! ???? !!!");
      if (cids[dataCID]) {
        if (typeof cids[dataCID] === "function") {
          cids[dataCID](content);
          cids[dataCID] = content;
        }
        return;
      }
    }
    if (window[CID]) {
      const hash = await Hash2.of(window[CID]);
      if (hash === CID) {
        sendChannel.send(JSON.stringify({ type: "get-cid", cid: CID, [CID]: window[CID] }));
      }
    }
    return;
  }
  if (window.sess && data.i <= window.sess.i) {
    return;
  }
  if (data.type === "video-answer") {
    await handleChatAnswerMsg(data);
    return;
  }
  if (data.timestamp) {
    lastSeenNow = Date.now();
    lastSeenTimestamp = data.timestamp;
  }
  if (data.name === username)
    return;
  if (data.hashOfCode) {
    if (!window[data.hashOfCode] || window[data.hashOfCode] !== data.hashOfCode) {
      window[data.hashOfCode] = await getCID(data.hashOfCode);
    }
    window.starterCode = window[data.hashOfCode];
    lastSeenCode = window[data.hashOfCode];
    chCode(lastSeenCode);
  }
  if (data.codeReq) {
    sendChannel.send(JSON.stringify({
      hashOfCode: window.hashOfCode,
      code: window[window.hashOfCode]
    }));
  }
  if (data.code && data.hashOfCode) {
    if (!window[data.hashOfCode]) {
      window.hashOfCode = data.hashOfCode;
      const code = data.code;
      const hashOfCode = await Hash2.of(code);
      window[hashOfCode] = code;
      if (data.hashOfCode === hashOfCode)
        chCode(data.code);
    }
  }
  if (data.changes && data.i && data.hashOfCode && data.prevHash && window[data.prevHash]) {
    const prevCode = window[data.prevHash];
    const prevHash = await Hash2.of(prevCode);
    if (data.prevHash !== prevHash) {
      sendChannel.send(JSON.stringify({
        type: "codeReq"
      }));
      return;
    }
    if (data.i <= window.sess.i)
      return;
    if (window.hashOfCode === data.prevHash) {
      let hashOfCode = "";
      if (window.monaco) {
        window.monaco.editor.getModels()[0].applyEdits(data.changes.changes);
        hashOfCode = await Hash2.of(window.monaco.editor.getModels()[0].getValue());
      }
      if (hashOfCode === data.hashOfCode) {
        window.hashOfCode = hashOfCode;
      } else {
        const code = applyPatch(window[data.prevHash], JSON.parse(data.codeDiff));
        const hashOfCode2 = await Hash2.of(code);
        if (hashOfCode2 === data.hashOfCode) {
          chCode(code);
          window.hashOfCode = hashOfCode2;
        } else {
          if (window[data.hashOfCode]) {
            const code3 = window[data.hashOfCode];
            chCode(code3);
            window.hashOfCode = hashOfCode2;
          }
          console.log("What is the Content for CID: " + data.hashOfCode + "???");
          const code2 = await getCID(data.hashOfCode);
          console.log({ code: code2 });
          window[data.hashOfCode] = code2;
        }
        if (window[data.hashOfCode] && window.monaco && window.monaco.editor) {
          const code2 = window[data.hashOfCode];
          window.monaco.editor.getModels()[0].setValue(code2);
          window.hashOfCode = hashOfCode2;
        } else {
          sendChannel.send(JSON.stringify({
            type: "codeReq"
          }));
        }
      }
    }
    window.hashOfCode = data.hashOfCode;
  }
  if (data.codeDiff && data.hashOfCode && data.prevHash && window[data.prevHash]) {
    if (data.hashOfCode && data.codeDiff && data.hashOfCode !== window.hashOfCode) {
      const hashOfCode = data.hashOfCode;
      const codeCandidate = applyPatch(window[data.prevHash], JSON.parse(data.codeDiff));
      const hashFromCodeDiff = await Hash2.of(codeCandidate);
      if (hashFromCodeDiff === hashOfCode) {
        window[hashOfCode] = codeCandidate;
        window.hashOfCode = hashOfCode;
        chCode(codeCandidate);
      }
    } else {
      console.error("we are out of sync...");
      ws2.close(1e3, "out of sync");
      return;
    }
  }
  lastSeenTimestamp = data.timestamp;
}

// js/starter.mjs
var import_v42 = __toModule(require_v4());
var room = "zoli";
var runTheApp = () => Promise.resolve().then(() => (init_reactLoader(), reactLoader_exports)).then(({ run: run3 }) => run3({ mode: "window", room }));
function starter_default() {
  const room2 = "zoli";
  const user = (0, import_v42.default)().substring(0, 8);
  console.log({ room: room2 }, { user });
  join(room2, user);
  setTimeout(() => window.sess || join(room2, user), 500);
  setTimeout(() => window.sess || runTheApp(), 1500);
}
export {
  starter_default as default
};
/** @license MUI v5.0.0-alpha.59
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license MUI v5.2.0
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license MUI v5.2.3
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=starter.b.mjs.map
