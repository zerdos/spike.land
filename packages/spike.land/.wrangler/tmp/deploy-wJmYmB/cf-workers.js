// ../code/dist/chunk-chunk-JOC75PVD.mjs
var h = Object.create;
var e = Object.defineProperty;
var i = Object.getOwnPropertyDescriptor;
var j = Object.getOwnPropertyNames;
var k = Object.getPrototypeOf;
var l = Object.prototype.hasOwnProperty;
var m = (a, b2) => () => (a && (b2 = a(a = 0)), b2);
var q = (a, b2) => () => (b2 || a((b2 = { exports: {} }).exports, b2), b2.exports);
var g = (a, b2, c, f) => {
  if (b2 && typeof b2 == "object" || typeof b2 == "function")
    for (let d of j(b2))
      !l.call(a, d) && d !== c && e(a, d, { get: () => b2[d], enumerable: !(f = i(b2, d)) || f.enumerable });
  return a;
};
var s = (a, b2, c) => (c = a != null ? h(k(a)) : {}, g(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  b2 || !a || !a.__esModule ? e(c, "default", { value: a, enumerable: true }) : c,
  a
));
var w;
var o = m(() => {
  w = { version: "v20.3.1", versions: { node: "v20.3.1" }, env: { NODE_ENV: "development", version: "v20.3.0", browser: true, isWebworker: true, NODE_DEBUG: false, DEBUG: false, isBrowser: true }, browser: true };
});

// ../code/dist/chunk-chunk-7KK2F2U2.mjs
o();
var t = {
  "@emotion/react/jsx-runtime": "/emotion.mjs",
  "react/jsx-runtime": "/jsx.mjs",
  "react-dom/client": "/reactDomClient.mjs",
  "@emotion/react": "/emotion.mjs",
  "@emotion/cache": "/emotionCache.mjs",
  "@emotion/styled": "/emotionStyled.mjs",
  react: "/reactMod.mjs",
  "framer-motion": "/motion.mjs",
  "react-dom": "/reactDom.mjs",
  "foo-bar": "/fooBar.mjs"
};
var e2 = { imports: t };

// ../code/dist/chunk-chunk-G3VM4647.mjs
o();
function x(s2, e3) {
  if (s2.indexOf("importMapReplace") !== -1)
    return s2;
  let f = /(import\s*(?:[\w{},*\s]+|[\w{} as,*\s|\$]+|\w+|\$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g, g3 = /(export\s*(?:[\w{},*\s]+|[\w{} as,*\s|\$]+|\w+|\$|\$\w+)\s*from\s*)(['"`][^'`"]+['"`])/g, $2 = /(import\()(['"`][^'`"]+['"`])(\))/g, i2 = (r, n, m2, a) => {
    let t3 = m2.slice(1, -1);
    if (t3.startsWith(e3 + "/live") && t3.indexOf("index.js") === -1)
      return n + `"${t3}/index.js"` + String(a).replace(/[0-9]/g, "");
    if (t3.startsWith("/"))
      return n + `"${e3}${t3}"` + String(a).replace(/[0-9]/g, "");
    if (t3.startsWith(".") || t3.startsWith("http")) {
      if (t3.startsWith("http") && !t3.startsWith(e3)) {
        let w2 = new URL(t3), h2 = new URL(w2.pathname, e3);
        return n + '"' + h2.toString() + '"' + String(a).replace(/[0-9]/g, "");
      }
      return r;
    }
    return t3.startsWith("/live") ? n + `"${e3}${t3}/index.js"` + String(a).replace(/[0-9]/g, "") : n + `"${e3}/*${t3}?bundle"` + String(a).replace(/[0-9]/g, "");
  }, l2 = s2;
  if (typeof s2 != "string") {
    let r = new Uint8Array(s2);
    l2 = new TextDecoder().decode(r);
  }
  let o2 = l2.replace(f, i2).replace(g3, i2).replace($2, i2);
  return Object.keys(t).forEach((r) => {
    o2 = o2.split(`${e3}/*${r}?bundle`).join(
      e3 + t[r]
    );
  }), o2;
}

// ../code/dist/chunk-chunk-5SM5JUUR.mjs
var hi = q((V_, fi) => {
  "use strict";
  o();
  var ht2 = -1, rt2 = 1, U2 = 0;
  function Nr(t3, r, e3, n, i2) {
    if (t3 === r)
      return t3 ? [[U2, t3]] : [];
    if (e3 != null) {
      var o2 = po(t3, r, e3);
      if (o2)
        return o2;
    }
    var a = an2(t3, r), s2 = t3.substring(0, a);
    t3 = t3.substring(a), r = r.substring(a), a = ne2(t3, r);
    var u = t3.substring(t3.length - a);
    t3 = t3.substring(0, t3.length - a), r = r.substring(0, r.length - a);
    var f = io(t3, r);
    return s2 && f.unshift([U2, s2]), u && f.push([U2, u]), sn2(f, i2), n && so(f), f;
  }
  function io(t3, r) {
    var e3;
    if (!t3)
      return [[rt2, r]];
    if (!r)
      return [[ht2, t3]];
    var n = t3.length > r.length ? t3 : r, i2 = t3.length > r.length ? r : t3, o2 = n.indexOf(i2);
    if (o2 !== -1)
      return e3 = [
        [rt2, n.substring(0, o2)],
        [U2, i2],
        [rt2, n.substring(o2 + i2.length)]
      ], t3.length > r.length && (e3[0][0] = e3[2][0] = ht2), e3;
    if (i2.length === 1)
      return [
        [ht2, t3],
        [rt2, r]
      ];
    var a = ao2(t3, r);
    if (a) {
      var s2 = a[0], u = a[1], f = a[2], h2 = a[3], p = a[4], _2 = Nr(s2, f), l2 = Nr(u, h2);
      return _2.concat([[U2, p]], l2);
    }
    return oo(t3, r);
  }
  function oo(t3, r) {
    for (var e3 = t3.length, n = r.length, i2 = Math.ceil((e3 + n) / 2), o2 = i2, a = 2 * i2, s2 = new Array(a), u = new Array(a), f = 0; f < a; f++)
      s2[f] = -1, u[f] = -1;
    s2[o2 + 1] = 0, u[o2 + 1] = 0;
    for (var h2 = e3 - n, p = h2 % 2 !== 0, _2 = 0, l2 = 0, v = 0, d = 0, w2 = 0; w2 < i2; w2++) {
      for (var y = -w2 + _2; y <= w2 - l2; y += 2) {
        var I2 = o2 + y, A2;
        y === -w2 || y !== w2 && s2[I2 - 1] < s2[I2 + 1] ? A2 = s2[I2 + 1] : A2 = s2[I2 - 1] + 1;
        for (var q2 = A2 - y; A2 < e3 && q2 < n && t3.charAt(A2) === r.charAt(q2); )
          A2++, q2++;
        if (s2[I2] = A2, A2 > e3)
          l2 += 2;
        else if (q2 > n)
          _2 += 2;
        else if (p) {
          var L = o2 + h2 - y;
          if (L >= 0 && L < a && u[L] !== -1) {
            var x2 = e3 - u[L];
            if (A2 >= x2)
              return ti(t3, r, A2, q2);
          }
        }
      }
      for (var et = -w2 + v; et <= w2 - d; et += 2) {
        var L = o2 + et, x2;
        et === -w2 || et !== w2 && u[L - 1] < u[L + 1] ? x2 = u[L + 1] : x2 = u[L - 1] + 1;
        for (var mt2 = x2 - et; x2 < e3 && mt2 < n && t3.charAt(e3 - x2 - 1) === r.charAt(n - mt2 - 1); )
          x2++, mt2++;
        if (u[L] = x2, x2 > e3)
          d += 2;
        else if (mt2 > n)
          v += 2;
        else if (!p) {
          var I2 = o2 + h2 - et;
          if (I2 >= 0 && I2 < a && s2[I2] !== -1) {
            var A2 = s2[I2], q2 = o2 + A2 - I2;
            if (x2 = e3 - x2, A2 >= x2)
              return ti(t3, r, A2, q2);
          }
        }
      }
    }
    return [
      [ht2, t3],
      [rt2, r]
    ];
  }
  function ti(t3, r, e3, n) {
    var i2 = t3.substring(0, e3), o2 = r.substring(0, n), a = t3.substring(e3), s2 = r.substring(n), u = Nr(i2, o2), f = Nr(a, s2);
    return u.concat(f);
  }
  function an2(t3, r) {
    if (!t3 || !r || t3.charAt(0) !== r.charAt(0))
      return 0;
    for (var e3 = 0, n = Math.min(t3.length, r.length), i2 = n, o2 = 0; e3 < i2; )
      t3.substring(o2, i2) == r.substring(o2, i2) ? (e3 = i2, o2 = e3) : n = i2, i2 = Math.floor((n - e3) / 2 + e3);
    return oi(t3.charCodeAt(i2 - 1)) && i2--, i2;
  }
  function ri(t3, r) {
    var e3 = t3.length, n = r.length;
    if (e3 == 0 || n == 0)
      return 0;
    e3 > n ? t3 = t3.substring(e3 - n) : e3 < n && (r = r.substring(0, e3));
    var i2 = Math.min(e3, n);
    if (t3 == r)
      return i2;
    for (var o2 = 0, a = 1; ; ) {
      var s2 = t3.substring(i2 - a), u = r.indexOf(s2);
      if (u == -1)
        return o2;
      a += u, (u == 0 || t3.substring(i2 - a) == r.substring(0, a)) && (o2 = a, a++);
    }
  }
  function ne2(t3, r) {
    if (!t3 || !r || t3.slice(-1) !== r.slice(-1))
      return 0;
    for (var e3 = 0, n = Math.min(t3.length, r.length), i2 = n, o2 = 0; e3 < i2; )
      t3.substring(t3.length - i2, t3.length - o2) == r.substring(r.length - i2, r.length - o2) ? (e3 = i2, o2 = e3) : n = i2, i2 = Math.floor((n - e3) / 2 + e3);
    return ai2(t3.charCodeAt(t3.length - i2)) && i2--, i2;
  }
  function ao2(t3, r) {
    var e3 = t3.length > r.length ? t3 : r, n = t3.length > r.length ? r : t3;
    if (e3.length < 4 || n.length * 2 < e3.length)
      return null;
    function i2(l2, v, d) {
      for (var w2 = l2.substring(d, d + Math.floor(l2.length / 4)), y = -1, I2 = "", A2, q2, L, x2; (y = v.indexOf(w2, y + 1)) !== -1; ) {
        var et = an2(
          l2.substring(d),
          v.substring(y)
        ), mt2 = ne2(
          l2.substring(0, d),
          v.substring(0, y)
        );
        I2.length < mt2 + et && (I2 = v.substring(y - mt2, y) + v.substring(y, y + et), A2 = l2.substring(0, d - mt2), q2 = l2.substring(d + et), L = v.substring(0, y - mt2), x2 = v.substring(y + et));
      }
      return I2.length * 2 >= l2.length ? [
        A2,
        q2,
        L,
        x2,
        I2
      ] : null;
    }
    var o2 = i2(
      e3,
      n,
      Math.ceil(e3.length / 4)
    ), a = i2(
      e3,
      n,
      Math.ceil(e3.length / 2)
    ), s2;
    if (!o2 && !a)
      return null;
    a ? o2 ? s2 = o2[4].length > a[4].length ? o2 : a : s2 = a : s2 = o2;
    var u, f, h2, p;
    t3.length > r.length ? (u = s2[0], f = s2[1], h2 = s2[2], p = s2[3]) : (h2 = s2[0], p = s2[1], u = s2[2], f = s2[3]);
    var _2 = s2[4];
    return [u, f, h2, p, _2];
  }
  function so(t3) {
    for (var r = false, e3 = [], n = 0, i2 = null, o2 = 0, a = 0, s2 = 0, u = 0, f = 0; o2 < t3.length; )
      t3[o2][0] == U2 ? (e3[n++] = o2, a = u, s2 = f, u = 0, f = 0, i2 = t3[o2][1]) : (t3[o2][0] == rt2 ? u += t3[o2][1].length : f += t3[o2][1].length, i2 && i2.length <= Math.max(a, s2) && i2.length <= Math.max(u, f) && (t3.splice(e3[n - 1], 0, [
        ht2,
        i2
      ]), t3[e3[n - 1] + 1][0] = rt2, n--, n--, o2 = n > 0 ? e3[n - 1] : -1, a = 0, s2 = 0, u = 0, f = 0, i2 = null, r = true)), o2++;
    for (r && sn2(t3), ho(t3), o2 = 1; o2 < t3.length; ) {
      if (t3[o2 - 1][0] == ht2 && t3[o2][0] == rt2) {
        var h2 = t3[o2 - 1][1], p = t3[o2][1], _2 = ri(h2, p), l2 = ri(p, h2);
        _2 >= l2 ? (_2 >= h2.length / 2 || _2 >= p.length / 2) && (t3.splice(o2, 0, [
          U2,
          p.substring(0, _2)
        ]), t3[o2 - 1][1] = h2.substring(
          0,
          h2.length - _2
        ), t3[o2 + 1][1] = p.substring(_2), o2++) : (l2 >= h2.length / 2 || l2 >= p.length / 2) && (t3.splice(o2, 0, [
          U2,
          h2.substring(0, l2)
        ]), t3[o2 - 1][0] = rt2, t3[o2 - 1][1] = p.substring(
          0,
          p.length - l2
        ), t3[o2 + 1][0] = ht2, t3[o2 + 1][1] = h2.substring(l2), o2++), o2++;
      }
      o2++;
    }
  }
  var ei2 = /[^a-zA-Z0-9]/, ni2 = /\s/, ii = /[\r\n]/, uo = /\n\r?\n$/, fo = /^\r?\n\r?\n/;
  function ho(t3) {
    function r(l2, v) {
      if (!l2 || !v)
        return 6;
      var d = l2.charAt(l2.length - 1), w2 = v.charAt(0), y = d.match(ei2), I2 = w2.match(ei2), A2 = y && d.match(ni2), q2 = I2 && w2.match(ni2), L = A2 && d.match(ii), x2 = q2 && w2.match(ii), et = L && l2.match(uo), mt2 = x2 && v.match(fo);
      return et || mt2 ? 5 : L || x2 ? 4 : y && !A2 && q2 ? 3 : A2 || q2 ? 2 : y || I2 ? 1 : 0;
    }
    for (var e3 = 1; e3 < t3.length - 1; ) {
      if (t3[e3 - 1][0] == U2 && t3[e3 + 1][0] == U2) {
        var n = t3[e3 - 1][1], i2 = t3[e3][1], o2 = t3[e3 + 1][1], a = ne2(n, i2);
        if (a) {
          var s2 = i2.substring(i2.length - a);
          n = n.substring(0, n.length - a), i2 = s2 + i2.substring(0, i2.length - a), o2 = s2 + o2;
        }
        for (var u = n, f = i2, h2 = o2, p = r(n, i2) + r(i2, o2); i2.charAt(0) === o2.charAt(0); ) {
          n += i2.charAt(0), i2 = i2.substring(1) + o2.charAt(0), o2 = o2.substring(1);
          var _2 = r(n, i2) + r(i2, o2);
          _2 >= p && (p = _2, u = n, f = i2, h2 = o2);
        }
        t3[e3 - 1][1] != u && (u ? t3[e3 - 1][1] = u : (t3.splice(e3 - 1, 1), e3--), t3[e3][1] = f, h2 ? t3[e3 + 1][1] = h2 : (t3.splice(e3 + 1, 1), e3--));
      }
      e3++;
    }
  }
  function sn2(t3, r) {
    t3.push([U2, ""]);
    for (var e3 = 0, n = 0, i2 = 0, o2 = "", a = "", s2; e3 < t3.length; ) {
      if (e3 < t3.length - 1 && !t3[e3][1]) {
        t3.splice(e3, 1);
        continue;
      }
      switch (t3[e3][0]) {
        case rt2:
          i2++, a += t3[e3][1], e3++;
          break;
        case ht2:
          n++, o2 += t3[e3][1], e3++;
          break;
        case U2:
          var u = e3 - i2 - n - 1;
          if (r) {
            if (u >= 0 && ui(t3[u][1])) {
              var f = t3[u][1].slice(-1);
              if (t3[u][1] = t3[u][1].slice(
                0,
                -1
              ), o2 = f + o2, a = f + a, !t3[u][1]) {
                t3.splice(u, 1), e3--;
                var h2 = u - 1;
                t3[h2] && t3[h2][0] === rt2 && (i2++, a = t3[h2][1] + a, h2--), t3[h2] && t3[h2][0] === ht2 && (n++, o2 = t3[h2][1] + o2, h2--), u = h2;
              }
            }
            if (si(t3[e3][1])) {
              var f = t3[e3][1].charAt(0);
              t3[e3][1] = t3[e3][1].slice(1), o2 += f, a += f;
            }
          }
          if (e3 < t3.length - 1 && !t3[e3][1]) {
            t3.splice(e3, 1);
            break;
          }
          if (o2.length > 0 || a.length > 0) {
            o2.length > 0 && a.length > 0 && (s2 = an2(a, o2), s2 !== 0 && (u >= 0 ? t3[u][1] += a.substring(
              0,
              s2
            ) : (t3.splice(0, 0, [
              U2,
              a.substring(0, s2)
            ]), e3++), a = a.substring(s2), o2 = o2.substring(s2)), s2 = ne2(a, o2), s2 !== 0 && (t3[e3][1] = a.substring(a.length - s2) + t3[e3][1], a = a.substring(
              0,
              a.length - s2
            ), o2 = o2.substring(
              0,
              o2.length - s2
            )));
            var p = i2 + n;
            o2.length === 0 && a.length === 0 ? (t3.splice(e3 - p, p), e3 = e3 - p) : o2.length === 0 ? (t3.splice(e3 - p, p, [rt2, a]), e3 = e3 - p + 1) : a.length === 0 ? (t3.splice(e3 - p, p, [ht2, o2]), e3 = e3 - p + 1) : (t3.splice(
              e3 - p,
              p,
              [ht2, o2],
              [rt2, a]
            ), e3 = e3 - p + 2);
          }
          e3 !== 0 && t3[e3 - 1][0] === U2 ? (t3[e3 - 1][1] += t3[e3][1], t3.splice(e3, 1)) : e3++, i2 = 0, n = 0, o2 = "", a = "";
          break;
      }
    }
    t3[t3.length - 1][1] === "" && t3.pop();
    var _2 = false;
    for (e3 = 1; e3 < t3.length - 1; )
      t3[e3 - 1][0] === U2 && t3[e3 + 1][0] === U2 && (t3[e3][1].substring(
        t3[e3][1].length - t3[e3 - 1][1].length
      ) === t3[e3 - 1][1] ? (t3[e3][1] = t3[e3 - 1][1] + t3[e3][1].substring(
        0,
        t3[e3][1].length - t3[e3 - 1][1].length
      ), t3[e3 + 1][1] = t3[e3 - 1][1] + t3[e3 + 1][1], t3.splice(e3 - 1, 1), _2 = true) : t3[e3][1].substring(0, t3[e3 + 1][1].length) == t3[e3 + 1][1] && (t3[e3 - 1][1] += t3[e3 + 1][1], t3[e3][1] = t3[e3][1].substring(t3[e3 + 1][1].length) + t3[e3 + 1][1], t3.splice(e3 + 1, 1), _2 = true)), e3++;
    _2 && sn2(t3, r);
  }
  function oi(t3) {
    return t3 >= 55296 && t3 <= 56319;
  }
  function ai2(t3) {
    return t3 >= 56320 && t3 <= 57343;
  }
  function si(t3) {
    return ai2(t3.charCodeAt(0));
  }
  function ui(t3) {
    return oi(t3.charCodeAt(t3.length - 1));
  }
  function co(t3) {
    for (var r = [], e3 = 0; e3 < t3.length; e3++)
      t3[e3][1].length > 0 && r.push(t3[e3]);
    return r;
  }
  function on2(t3, r, e3, n) {
    return ui(t3) || si(n) ? null : co([
      [U2, t3],
      [ht2, r],
      [rt2, e3],
      [U2, n]
    ]);
  }
  function po(t3, r, e3) {
    var n = typeof e3 == "number" ? { index: e3, length: 0 } : e3.oldRange, i2 = typeof e3 == "number" ? null : e3.newRange, o2 = t3.length, a = r.length;
    if (n.length === 0 && (i2 === null || i2.length === 0)) {
      var s2 = n.index, u = t3.slice(0, s2), f = t3.slice(s2), h2 = i2 ? i2.index : null;
      t: {
        var p = s2 + a - o2;
        if (h2 !== null && h2 !== p || p < 0 || p > a)
          break t;
        var _2 = r.slice(0, p), l2 = r.slice(p);
        if (l2 !== f)
          break t;
        var v = Math.min(s2, p), d = u.slice(0, v), w2 = _2.slice(0, v);
        if (d !== w2)
          break t;
        var y = u.slice(v), I2 = _2.slice(v);
        return on2(d, y, I2, f);
      }
      t: {
        if (h2 !== null && h2 !== s2)
          break t;
        var A2 = s2, _2 = r.slice(0, A2), l2 = r.slice(A2);
        if (_2 !== u)
          break t;
        var q2 = Math.min(o2 - A2, a - A2), L = f.slice(f.length - q2), x2 = l2.slice(l2.length - q2);
        if (L !== x2)
          break t;
        var y = f.slice(0, f.length - q2), I2 = l2.slice(0, l2.length - q2);
        return on2(u, y, I2, L);
      }
    }
    if (n.length > 0 && i2 && i2.length === 0)
      t: {
        var d = t3.slice(0, n.index), L = t3.slice(n.index + n.length), v = d.length, q2 = L.length;
        if (a < v + q2)
          break t;
        var w2 = r.slice(0, v), x2 = r.slice(a - q2);
        if (d !== w2 || L !== x2)
          break t;
        var y = t3.slice(v, o2 - q2), I2 = r.slice(v, a - q2);
        return on2(d, y, I2, L);
      }
    return null;
  }
  function ie(t3, r, e3, n) {
    return Nr(t3, r, e3, n, true);
  }
  ie.INSERT = rt2;
  ie.DELETE = ht2;
  ie.EQUAL = U2;
  fi.exports = ie;
});
o();
o();
o();
o();
var gt = "delete";
var z = 5;
var Q = 1 << z;
var J = Q - 1;
var g2 = {};
function mr() {
  return { value: false };
}
function nt(t3) {
  t3 && (t3.value = true);
}
function Ht() {
}
function xt(t3) {
  return t3.size === void 0 && (t3.size = t3.__iterate(se)), t3.size;
}
function it(t3, r) {
  if (typeof r != "number") {
    var e3 = r >>> 0;
    if ("" + e3 !== r || e3 === 4294967295)
      return NaN;
    r = e3;
  }
  return r < 0 ? xt(t3) + r : r;
}
function se() {
  return true;
}
function zt(t3, r, e3) {
  return (t3 === 0 && !hn(t3) || e3 !== void 0 && t3 <= -e3) && (r === void 0 || e3 !== void 0 && r >= e3);
}
function lt(t3, r) {
  return fn(t3, r, 0);
}
function At(t3, r) {
  return fn(t3, r, r);
}
function fn(t3, r, e3) {
  return t3 === void 0 ? e3 : hn(t3) ? r === 1 / 0 ? r : Math.max(0, r + t3) | 0 : r === void 0 || r === t3 ? t3 : Math.min(r, t3) | 0;
}
function hn(t3) {
  return t3 < 0 || t3 === 0 && 1 / t3 === -1 / 0;
}
o();
o();
var ue = "@@__IMMUTABLE_ITERABLE__@@";
function D(t3) {
  return !!(t3 && t3[ue]);
}
o();
var fe = "@@__IMMUTABLE_KEYED__@@";
function b(t3) {
  return !!(t3 && t3[fe]);
}
o();
var he = "@@__IMMUTABLE_INDEXED__@@";
function j2(t3) {
  return !!(t3 && t3[he]);
}
o();
function Rt(t3) {
  return b(t3) || j2(t3);
}
var O = function(r) {
  return D(r) ? r : W(r);
};
var C = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return b(e3) ? e3 : vt(e3);
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r;
}(O);
var pt = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return j2(e3) ? e3 : Z(e3);
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r;
}(O);
var yt = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return D(e3) && !Rt(e3) ? e3 : Tt(e3);
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r;
}(O);
O.Keyed = C;
O.Indexed = pt;
O.Set = yt;
o();
var ce = "@@__IMMUTABLE_SEQ__@@";
function Jt(t3) {
  return !!(t3 && t3[ce]);
}
o();
o();
var pe = "@@__IMMUTABLE_RECORD__@@";
function St(t3) {
  return !!(t3 && t3[pe]);
}
function F(t3) {
  return D(t3) || St(t3);
}
o();
var dt = "@@__IMMUTABLE_ORDERED__@@";
function K(t3) {
  return !!(t3 && t3[dt]);
}
o();
var Bt = 0;
var at = 1;
var G = 2;
var _e = typeof Symbol == "function" && Symbol.iterator;
var cn = "@@iterator";
var Vt = _e || cn;
var S = function(r) {
  this.next = r;
};
S.prototype.toString = function() {
  return "[Iterator]";
};
S.KEYS = Bt;
S.VALUES = at;
S.ENTRIES = G;
S.prototype.inspect = S.prototype.toSource = function() {
  return this.toString();
};
S.prototype[Vt] = function() {
  return this;
};
function E(t3, r, e3, n) {
  var i2 = t3 === 0 ? r : t3 === 1 ? e3 : [r, e3];
  return n ? n.value = i2 : n = {
    value: i2,
    done: false
  }, n;
}
function N() {
  return { value: void 0, done: true };
}
function lr(t3) {
  return Array.isArray(t3) ? true : !!Pr(t3);
}
function me(t3) {
  return t3 && typeof t3.next == "function";
}
function vr(t3) {
  var r = Pr(t3);
  return r && r.call(t3);
}
function Pr(t3) {
  var r = t3 && (_e && t3[_e] || t3[cn]);
  if (typeof r == "function")
    return r;
}
function pn(t3) {
  var r = Pr(t3);
  return r && r === t3.entries;
}
function _n(t3) {
  var r = Pr(t3);
  return r && r === t3.keys;
}
o();
var vi = Object.prototype.hasOwnProperty;
var _t = vi;
o();
function di(t3) {
  return Array.isArray(t3) || typeof t3 == "string" ? true : t3 && typeof t3 == "object" && Number.isInteger(t3.length) && t3.length >= 0 && (t3.length === 0 ? (
    // Only {length: 0} is considered Array-like.
    Object.keys(t3).length === 1
  ) : (
    // An object is only Array-like if it has a property where the last value
    // in the array-like may be found (which could be undefined).
    t3.hasOwnProperty(t3.length - 1)
  ));
}
var dr = di;
var W = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return e3 == null ? ve() : F(e3) ? e3.toSeq() : yi(e3);
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.prototype.toSeq = function() {
    return this;
  }, r.prototype.toString = function() {
    return this.__toString("Seq {", "}");
  }, r.prototype.cacheResult = function() {
    return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), this.size = this._cache.length), this;
  }, r.prototype.__iterate = function(n, i2) {
    var o2 = this._cache;
    if (o2) {
      for (var a = o2.length, s2 = 0; s2 !== a; ) {
        var u = o2[i2 ? a - ++s2 : s2++];
        if (n(u[1], u[0], this) === false)
          break;
      }
      return s2;
    }
    return this.__iterateUncached(n, i2);
  }, r.prototype.__iterator = function(n, i2) {
    var o2 = this._cache;
    if (o2) {
      var a = o2.length, s2 = 0;
      return new S(function() {
        if (s2 === a)
          return N();
        var u = o2[i2 ? a - ++s2 : s2++];
        return E(n, u[0], u[1]);
      });
    }
    return this.__iteratorUncached(n, i2);
  }, r;
}(O);
var vt = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return e3 == null ? ve().toKeyedSeq() : D(e3) ? b(e3) ? e3.toSeq() : e3.fromEntrySeq() : St(e3) ? e3.toSeq() : gr(e3);
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.prototype.toKeyedSeq = function() {
    return this;
  }, r;
}(W);
var Z = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return e3 == null ? ve() : D(e3) ? b(e3) ? e3.entrySeq() : e3.toIndexedSeq() : St(e3) ? e3.toSeq().entrySeq() : de(e3);
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.of = function() {
    return r(arguments);
  }, r.prototype.toIndexedSeq = function() {
    return this;
  }, r.prototype.toString = function() {
    return this.__toString("Seq [", "]");
  }, r;
}(W);
var Tt = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return (D(e3) && !Rt(e3) ? e3 : Z(e3)).toSetSeq();
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.of = function() {
    return r(arguments);
  }, r.prototype.toSetSeq = function() {
    return this;
  }, r;
}(W);
W.isSeq = Jt;
W.Keyed = vt;
W.Set = Tt;
W.Indexed = Z;
W.prototype[ce] = true;
var wt = /* @__PURE__ */ function(t3) {
  function r(e3) {
    this._array = e3, this.size = e3.length;
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.prototype.get = function(n, i2) {
    return this.has(n) ? this._array[it(this, n)] : i2;
  }, r.prototype.__iterate = function(n, i2) {
    for (var o2 = this._array, a = o2.length, s2 = 0; s2 !== a; ) {
      var u = i2 ? a - ++s2 : s2++;
      if (n(o2[u], u, this) === false)
        break;
    }
    return s2;
  }, r.prototype.__iterator = function(n, i2) {
    var o2 = this._array, a = o2.length, s2 = 0;
    return new S(function() {
      if (s2 === a)
        return N();
      var u = i2 ? a - ++s2 : s2++;
      return E(n, u, o2[u]);
    });
  }, r;
}(Z);
var le = /* @__PURE__ */ function(t3) {
  function r(e3) {
    var n = Object.keys(e3).concat(
      Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e3) : []
    );
    this._object = e3, this._keys = n, this.size = n.length;
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.prototype.get = function(n, i2) {
    return i2 !== void 0 && !this.has(n) ? i2 : this._object[n];
  }, r.prototype.has = function(n) {
    return _t.call(this._object, n);
  }, r.prototype.__iterate = function(n, i2) {
    for (var o2 = this._object, a = this._keys, s2 = a.length, u = 0; u !== s2; ) {
      var f = a[i2 ? s2 - ++u : u++];
      if (n(o2[f], f, this) === false)
        break;
    }
    return u;
  }, r.prototype.__iterator = function(n, i2) {
    var o2 = this._object, a = this._keys, s2 = a.length, u = 0;
    return new S(function() {
      if (u === s2)
        return N();
      var f = a[i2 ? s2 - ++u : u++];
      return E(n, f, o2[f]);
    });
  }, r;
}(vt);
le.prototype[dt] = true;
var gi = /* @__PURE__ */ function(t3) {
  function r(e3) {
    this._collection = e3, this.size = e3.length || e3.size;
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.prototype.__iterateUncached = function(n, i2) {
    if (i2)
      return this.cacheResult().__iterate(n, i2);
    var o2 = this._collection, a = vr(o2), s2 = 0;
    if (me(a))
      for (var u; !(u = a.next()).done && n(u.value, s2++, this) !== false; )
        ;
    return s2;
  }, r.prototype.__iteratorUncached = function(n, i2) {
    if (i2)
      return this.cacheResult().__iterator(n, i2);
    var o2 = this._collection, a = vr(o2);
    if (!me(a))
      return new S(N);
    var s2 = 0;
    return new S(function() {
      var u = a.next();
      return u.done ? u : E(n, s2++, u.value);
    });
  }, r;
}(Z);
var mn;
function ve() {
  return mn || (mn = new wt([]));
}
function gr(t3) {
  var r = ge(t3);
  if (r)
    return r.fromEntrySeq();
  if (typeof t3 == "object")
    return new le(t3);
  throw new TypeError(
    "Expected Array or collection object of [k, v] entries, or keyed object: " + t3
  );
}
function de(t3) {
  var r = ge(t3);
  if (r)
    return r;
  throw new TypeError(
    "Expected Array or collection object of values: " + t3
  );
}
function yi(t3) {
  var r = ge(t3);
  if (r)
    return pn(t3) ? r.fromEntrySeq() : _n(t3) ? r.toSetSeq() : r;
  if (typeof t3 == "object")
    return new le(t3);
  throw new TypeError(
    "Expected Array or collection object of values, or keyed object: " + t3
  );
}
function ge(t3) {
  return dr(t3) ? new wt(t3) : lr(t3) ? new gi(t3) : void 0;
}
o();
o();
o();
var ye = "@@__IMMUTABLE_MAP__@@";
function kt(t3) {
  return !!(t3 && t3[ye]);
}
function Kr(t3) {
  return kt(t3) && K(t3);
}
o();
o();
o();
function $r(t3) {
  return !!(t3 && typeof t3.equals == "function" && typeof t3.hashCode == "function");
}
function Y(t3, r) {
  if (t3 === r || t3 !== t3 && r !== r)
    return true;
  if (!t3 || !r)
    return false;
  if (typeof t3.valueOf == "function" && typeof r.valueOf == "function") {
    if (t3 = t3.valueOf(), r = r.valueOf(), t3 === r || t3 !== t3 && r !== r)
      return true;
    if (!t3 || !r)
      return false;
  }
  return !!($r(t3) && $r(r) && t3.equals(r));
}
o();
o();
var Zt = typeof Math.imul == "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function(r, e3) {
  r |= 0, e3 |= 0;
  var n = r & 65535, i2 = e3 & 65535;
  return n * i2 + ((r >>> 16) * i2 + n * (e3 >>> 16) << 16 >>> 0) | 0;
};
function Xt(t3) {
  return t3 >>> 1 & 1073741824 | t3 & 3221225471;
}
var Si = Object.prototype.valueOf;
function H(t3) {
  if (t3 == null)
    return ln(t3);
  if (typeof t3.hashCode == "function")
    return Xt(t3.hashCode(t3));
  var r = Mi(t3);
  if (r == null)
    return ln(r);
  switch (typeof r) {
    case "boolean":
      return r ? 1108378657 : 1108378656;
    case "number":
      return wi(r);
    case "string":
      return r.length > zi ? bi(r) : Ie(r);
    case "object":
    case "function":
      return Ei(r);
    case "symbol":
      return Ii(r);
    default:
      if (typeof r.toString == "function")
        return Ie(r.toString());
      throw new Error("Value type " + typeof r + " cannot be hashed.");
  }
}
function ln(t3) {
  return t3 === null ? 1108378658 : (
    /* undefined */
    1108378659
  );
}
function wi(t3) {
  if (t3 !== t3 || t3 === 1 / 0)
    return 0;
  var r = t3 | 0;
  for (r !== t3 && (r ^= t3 * 4294967295); t3 > 4294967295; )
    t3 /= 4294967295, r ^= t3;
  return Xt(r);
}
function bi(t3) {
  var r = be[t3];
  return r === void 0 && (r = Ie(t3), we === Ai && (we = 0, be = {}), we++, be[t3] = r), r;
}
function Ie(t3) {
  for (var r = 0, e3 = 0; e3 < t3.length; e3++)
    r = 31 * r + t3.charCodeAt(e3) | 0;
  return Xt(r);
}
function Ii(t3) {
  var r = gn[t3];
  return r !== void 0 || (r = yn(), gn[t3] = r), r;
}
function Ei(t3) {
  var r;
  if (Ee && (r = Oe.get(t3), r !== void 0) || (r = t3[Pt], r !== void 0) || !dn && (r = t3.propertyIsEnumerable && t3.propertyIsEnumerable[Pt], r !== void 0 || (r = Oi(t3), r !== void 0)))
    return r;
  if (r = yn(), Ee)
    Oe.set(t3, r);
  else {
    if (vn !== void 0 && vn(t3) === false)
      throw new Error("Non-extensible objects are not allowed as keys.");
    if (dn)
      Object.defineProperty(t3, Pt, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: r
      });
    else if (t3.propertyIsEnumerable !== void 0 && t3.propertyIsEnumerable === t3.constructor.prototype.propertyIsEnumerable)
      t3.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(
          this,
          arguments
        );
      }, t3.propertyIsEnumerable[Pt] = r;
    else if (t3.nodeType !== void 0)
      t3[Pt] = r;
    else
      throw new Error("Unable to set a non-enumerable property on object.");
  }
  return r;
}
var vn = Object.isExtensible;
var dn = function() {
  try {
    return Object.defineProperty({}, "@", {}), true;
  } catch {
    return false;
  }
}();
function Oi(t3) {
  if (t3 && t3.nodeType > 0)
    switch (t3.nodeType) {
      case 1:
        return t3.uniqueID;
      case 9:
        return t3.documentElement && t3.documentElement.uniqueID;
    }
}
function Mi(t3) {
  return t3.valueOf !== Si && typeof t3.valueOf == "function" ? t3.valueOf(t3) : t3;
}
function yn() {
  var t3 = ++Se;
  return Se & 1073741824 && (Se = 0), t3;
}
var Ee = typeof WeakMap == "function";
var Oe;
Ee && (Oe = /* @__PURE__ */ new WeakMap());
var gn = /* @__PURE__ */ Object.create(null);
var Se = 0;
var Pt = "__immutablehash__";
typeof Symbol == "function" && (Pt = Symbol(Pt));
var zi = 16;
var Ai = 255;
var we = 0;
var be = {};
o();
var yr = /* @__PURE__ */ function(t3) {
  function r(e3, n) {
    this._iter = e3, this._useKeys = n, this.size = e3.size;
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.prototype.get = function(n, i2) {
    return this._iter.get(n, i2);
  }, r.prototype.has = function(n) {
    return this._iter.has(n);
  }, r.prototype.valueSeq = function() {
    return this._iter.valueSeq();
  }, r.prototype.reverse = function() {
    var n = this, i2 = Wr(this, true);
    return this._useKeys || (i2.valueSeq = function() {
      return n._iter.toSeq().reverse();
    }), i2;
  }, r.prototype.map = function(n, i2) {
    var o2 = this, a = Te(this, n, i2);
    return this._useKeys || (a.valueSeq = function() {
      return o2._iter.toSeq().map(n, i2);
    }), a;
  }, r.prototype.__iterate = function(n, i2) {
    var o2 = this;
    return this._iter.__iterate(function(a, s2) {
      return n(a, s2, o2);
    }, i2);
  }, r.prototype.__iterator = function(n, i2) {
    return this._iter.__iterator(n, i2);
  }, r;
}(vt);
yr.prototype[dt] = true;
var Me = /* @__PURE__ */ function(t3) {
  function r(e3) {
    this._iter = e3, this.size = e3.size;
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.prototype.includes = function(n) {
    return this._iter.includes(n);
  }, r.prototype.__iterate = function(n, i2) {
    var o2 = this, a = 0;
    return i2 && xt(this), this._iter.__iterate(
      function(s2) {
        return n(s2, i2 ? o2.size - ++a : a++, o2);
      },
      i2
    );
  }, r.prototype.__iterator = function(n, i2) {
    var o2 = this, a = this._iter.__iterator(at, i2), s2 = 0;
    return i2 && xt(this), new S(function() {
      var u = a.next();
      return u.done ? u : E(
        n,
        i2 ? o2.size - ++s2 : s2++,
        u.value,
        u
      );
    });
  }, r;
}(Z);
var ze = /* @__PURE__ */ function(t3) {
  function r(e3) {
    this._iter = e3, this.size = e3.size;
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.prototype.has = function(n) {
    return this._iter.includes(n);
  }, r.prototype.__iterate = function(n, i2) {
    var o2 = this;
    return this._iter.__iterate(function(a) {
      return n(a, a, o2);
    }, i2);
  }, r.prototype.__iterator = function(n, i2) {
    var o2 = this._iter.__iterator(at, i2);
    return new S(function() {
      var a = o2.next();
      return a.done ? a : E(n, a.value, a.value, a);
    });
  }, r;
}(Tt);
var Ae = /* @__PURE__ */ function(t3) {
  function r(e3) {
    this._iter = e3, this.size = e3.size;
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.prototype.entrySeq = function() {
    return this._iter.toSeq();
  }, r.prototype.__iterate = function(n, i2) {
    var o2 = this;
    return this._iter.__iterate(function(a) {
      if (a) {
        wn(a);
        var s2 = D(a);
        return n(
          s2 ? a.get(1) : a[1],
          s2 ? a.get(0) : a[0],
          o2
        );
      }
    }, i2);
  }, r.prototype.__iterator = function(n, i2) {
    var o2 = this._iter.__iterator(at, i2);
    return new S(function() {
      for (; ; ) {
        var a = o2.next();
        if (a.done)
          return a;
        var s2 = a.value;
        if (s2) {
          wn(s2);
          var u = D(s2);
          return E(
            n,
            u ? s2.get(0) : s2[0],
            u ? s2.get(1) : s2[1],
            a
          );
        }
      }
    });
  }, r;
}(vt);
Me.prototype.cacheResult = yr.prototype.cacheResult = ze.prototype.cacheResult = Ae.prototype.cacheResult = je;
function Re(t3) {
  var r = bt(t3);
  return r._iter = t3, r.size = t3.size, r.flip = function() {
    return t3;
  }, r.reverse = function() {
    var e3 = t3.reverse.apply(this);
    return e3.flip = function() {
      return t3.reverse();
    }, e3;
  }, r.has = function(e3) {
    return t3.includes(e3);
  }, r.includes = function(e3) {
    return t3.has(e3);
  }, r.cacheResult = je, r.__iterateUncached = function(e3, n) {
    var i2 = this;
    return t3.__iterate(function(o2, a) {
      return e3(a, o2, i2) !== false;
    }, n);
  }, r.__iteratorUncached = function(e3, n) {
    if (e3 === G) {
      var i2 = t3.__iterator(e3, n);
      return new S(function() {
        var o2 = i2.next();
        if (!o2.done) {
          var a = o2.value[0];
          o2.value[0] = o2.value[1], o2.value[1] = a;
        }
        return o2;
      });
    }
    return t3.__iterator(
      e3 === at ? Bt : at,
      n
    );
  }, r;
}
function Te(t3, r, e3) {
  var n = bt(t3);
  return n.size = t3.size, n.has = function(i2) {
    return t3.has(i2);
  }, n.get = function(i2, o2) {
    var a = t3.get(i2, g2);
    return a === g2 ? o2 : r.call(e3, a, i2, t3);
  }, n.__iterateUncached = function(i2, o2) {
    var a = this;
    return t3.__iterate(
      function(s2, u, f) {
        return i2(r.call(e3, s2, u, f), u, a) !== false;
      },
      o2
    );
  }, n.__iteratorUncached = function(i2, o2) {
    var a = t3.__iterator(G, o2);
    return new S(function() {
      var s2 = a.next();
      if (s2.done)
        return s2;
      var u = s2.value, f = u[0];
      return E(
        i2,
        f,
        r.call(e3, u[1], f, t3),
        s2
      );
    });
  }, n;
}
function Wr(t3, r) {
  var e3 = this, n = bt(t3);
  return n._iter = t3, n.size = t3.size, n.reverse = function() {
    return t3;
  }, t3.flip && (n.flip = function() {
    var i2 = Re(t3);
    return i2.reverse = function() {
      return t3.flip();
    }, i2;
  }), n.get = function(i2, o2) {
    return t3.get(r ? i2 : -1 - i2, o2);
  }, n.has = function(i2) {
    return t3.has(r ? i2 : -1 - i2);
  }, n.includes = function(i2) {
    return t3.includes(i2);
  }, n.cacheResult = je, n.__iterate = function(i2, o2) {
    var a = this, s2 = 0;
    return o2 && xt(t3), t3.__iterate(
      function(u, f) {
        return i2(u, r ? f : o2 ? a.size - ++s2 : s2++, a);
      },
      !o2
    );
  }, n.__iterator = function(i2, o2) {
    var a = 0;
    o2 && xt(t3);
    var s2 = t3.__iterator(G, !o2);
    return new S(function() {
      var u = s2.next();
      if (u.done)
        return u;
      var f = u.value;
      return E(
        i2,
        r ? f[0] : o2 ? e3.size - ++a : a++,
        f[1],
        u
      );
    });
  }, n;
}
function qe(t3, r, e3, n) {
  var i2 = bt(t3);
  return n && (i2.has = function(o2) {
    var a = t3.get(o2, g2);
    return a !== g2 && !!r.call(e3, a, o2, t3);
  }, i2.get = function(o2, a) {
    var s2 = t3.get(o2, g2);
    return s2 !== g2 && r.call(e3, s2, o2, t3) ? s2 : a;
  }), i2.__iterateUncached = function(o2, a) {
    var s2 = this, u = 0;
    return t3.__iterate(function(f, h2, p) {
      if (r.call(e3, f, h2, p))
        return u++, o2(f, n ? h2 : u - 1, s2);
    }, a), u;
  }, i2.__iteratorUncached = function(o2, a) {
    var s2 = t3.__iterator(G, a), u = 0;
    return new S(function() {
      for (; ; ) {
        var f = s2.next();
        if (f.done)
          return f;
        var h2 = f.value, p = h2[0], _2 = h2[1];
        if (r.call(e3, _2, p, t3))
          return E(o2, n ? p : u++, _2, f);
      }
    });
  }, i2;
}
function bn(t3, r, e3) {
  var n = It().asMutable();
  return t3.__iterate(function(i2, o2) {
    n.update(r.call(e3, i2, o2, t3), 0, function(a) {
      return a + 1;
    });
  }), n.asImmutable();
}
function In(t3, r, e3) {
  var n = b(t3), i2 = (K(t3) ? st() : It()).asMutable();
  t3.__iterate(function(a, s2) {
    i2.update(
      r.call(e3, a, s2, t3),
      function(u) {
        return u = u || [], u.push(n ? [s2, a] : a), u;
      }
    );
  });
  var o2 = De(t3);
  return i2.map(function(a) {
    return M(t3, o2(a));
  }).asImmutable();
}
function En(t3, r, e3) {
  var n = b(t3), i2 = [[], []];
  t3.__iterate(function(a, s2) {
    i2[r.call(e3, a, s2, t3) ? 1 : 0].push(
      n ? [s2, a] : a
    );
  });
  var o2 = De(t3);
  return i2.map(function(a) {
    return M(t3, o2(a));
  });
}
function Ur(t3, r, e3, n) {
  var i2 = t3.size;
  if (zt(r, e3, i2))
    return t3;
  var o2 = lt(r, i2), a = At(e3, i2);
  if (o2 !== o2 || a !== a)
    return Ur(t3.toSeq().cacheResult(), r, e3, n);
  var s2 = a - o2, u;
  s2 === s2 && (u = s2 < 0 ? 0 : s2);
  var f = bt(t3);
  return f.size = u === 0 ? u : t3.size && u || void 0, !n && Jt(t3) && u >= 0 && (f.get = function(h2, p) {
    return h2 = it(this, h2), h2 >= 0 && h2 < u ? t3.get(h2 + o2, p) : p;
  }), f.__iterateUncached = function(h2, p) {
    var _2 = this;
    if (u === 0)
      return 0;
    if (p)
      return this.cacheResult().__iterate(h2, p);
    var l2 = 0, v = true, d = 0;
    return t3.__iterate(function(w2, y) {
      if (!(v && (v = l2++ < o2)))
        return d++, h2(w2, n ? y : d - 1, _2) !== false && d !== u;
    }), d;
  }, f.__iteratorUncached = function(h2, p) {
    if (u !== 0 && p)
      return this.cacheResult().__iterator(h2, p);
    if (u === 0)
      return new S(N);
    var _2 = t3.__iterator(h2, p), l2 = 0, v = 0;
    return new S(function() {
      for (; l2++ < o2; )
        _2.next();
      if (++v > u)
        return N();
      var d = _2.next();
      return n || h2 === at || d.done ? d : h2 === Bt ? E(h2, v - 1, void 0, d) : E(h2, v - 1, d.value[1], d);
    });
  }, f;
}
function On(t3, r, e3) {
  var n = bt(t3);
  return n.__iterateUncached = function(i2, o2) {
    var a = this;
    if (o2)
      return this.cacheResult().__iterate(i2, o2);
    var s2 = 0;
    return t3.__iterate(
      function(u, f, h2) {
        return r.call(e3, u, f, h2) && ++s2 && i2(u, f, a);
      }
    ), s2;
  }, n.__iteratorUncached = function(i2, o2) {
    var a = this;
    if (o2)
      return this.cacheResult().__iterator(i2, o2);
    var s2 = t3.__iterator(G, o2), u = true;
    return new S(function() {
      if (!u)
        return N();
      var f = s2.next();
      if (f.done)
        return f;
      var h2 = f.value, p = h2[0], _2 = h2[1];
      return r.call(e3, _2, p, a) ? i2 === G ? f : E(i2, p, _2, f) : (u = false, N());
    });
  }, n;
}
function Le(t3, r, e3, n) {
  var i2 = bt(t3);
  return i2.__iterateUncached = function(o2, a) {
    var s2 = this;
    if (a)
      return this.cacheResult().__iterate(o2, a);
    var u = true, f = 0;
    return t3.__iterate(function(h2, p, _2) {
      if (!(u && (u = r.call(e3, h2, p, _2))))
        return f++, o2(h2, n ? p : f - 1, s2);
    }), f;
  }, i2.__iteratorUncached = function(o2, a) {
    var s2 = this;
    if (a)
      return this.cacheResult().__iterator(o2, a);
    var u = t3.__iterator(G, a), f = true, h2 = 0;
    return new S(function() {
      var p, _2, l2;
      do {
        if (p = u.next(), p.done)
          return n || o2 === at ? p : o2 === Bt ? E(o2, h2++, void 0, p) : E(o2, h2++, p.value[1], p);
        var v = p.value;
        _2 = v[0], l2 = v[1], f && (f = r.call(e3, l2, _2, s2));
      } while (f);
      return o2 === G ? p : E(o2, _2, l2, p);
    });
  }, i2;
}
function Mn(t3, r) {
  var e3 = b(t3), n = [t3].concat(r).map(function(a) {
    return D(a) ? e3 && (a = C(a)) : a = e3 ? gr(a) : de(Array.isArray(a) ? a : [a]), a;
  }).filter(function(a) {
    return a.size !== 0;
  });
  if (n.length === 0)
    return t3;
  if (n.length === 1) {
    var i2 = n[0];
    if (i2 === t3 || e3 && b(i2) || j2(t3) && j2(i2))
      return i2;
  }
  var o2 = new wt(n);
  return e3 ? o2 = o2.toKeyedSeq() : j2(t3) || (o2 = o2.toSetSeq()), o2 = o2.flatten(true), o2.size = n.reduce(function(a, s2) {
    if (a !== void 0) {
      var u = s2.size;
      if (u !== void 0)
        return a + u;
    }
  }, 0), o2;
}
function xe(t3, r, e3) {
  var n = bt(t3);
  return n.__iterateUncached = function(i2, o2) {
    if (o2)
      return this.cacheResult().__iterate(i2, o2);
    var a = 0, s2 = false;
    function u(f, h2) {
      f.__iterate(function(p, _2) {
        return (!r || h2 < r) && D(p) ? u(p, h2 + 1) : (a++, i2(p, e3 ? _2 : a - 1, n) === false && (s2 = true)), !s2;
      }, o2);
    }
    return u(t3, 0), a;
  }, n.__iteratorUncached = function(i2, o2) {
    if (o2)
      return this.cacheResult().__iterator(i2, o2);
    var a = t3.__iterator(i2, o2), s2 = [], u = 0;
    return new S(function() {
      for (; a; ) {
        var f = a.next();
        if (f.done !== false) {
          a = s2.pop();
          continue;
        }
        var h2 = f.value;
        if (i2 === G && (h2 = h2[1]), (!r || s2.length < r) && D(h2))
          s2.push(a), a = h2.__iterator(i2, o2);
        else
          return e3 ? f : E(i2, u++, h2, f);
      }
      return N();
    });
  }, n;
}
function zn(t3, r, e3) {
  var n = De(t3);
  return t3.toSeq().map(function(i2, o2) {
    return n(r.call(e3, i2, o2, t3));
  }).flatten(true);
}
function An(t3, r) {
  var e3 = bt(t3);
  return e3.size = t3.size && t3.size * 2 - 1, e3.__iterateUncached = function(n, i2) {
    var o2 = this, a = 0;
    return t3.__iterate(
      function(s2) {
        return (!a || n(r, a++, o2) !== false) && n(s2, a++, o2) !== false;
      },
      i2
    ), a;
  }, e3.__iteratorUncached = function(n, i2) {
    var o2 = t3.__iterator(at, i2), a = 0, s2;
    return new S(function() {
      return (!s2 || a % 2) && (s2 = o2.next(), s2.done) ? s2 : a % 2 ? E(n, a++, r) : E(n, a++, s2.value, s2);
    });
  }, e3;
}
function qt(t3, r, e3) {
  r || (r = Rn);
  var n = b(t3), i2 = 0, o2 = t3.toSeq().map(function(a, s2) {
    return [s2, a, i2++, e3 ? e3(a, s2, t3) : a];
  }).valueSeq().toArray();
  return o2.sort(function(a, s2) {
    return r(a[3], s2[3]) || a[2] - s2[2];
  }).forEach(
    n ? function(a, s2) {
      o2[s2].length = 2;
    } : function(a, s2) {
      o2[s2] = a[1];
    }
  ), n ? vt(o2) : j2(t3) ? Z(o2) : Tt(o2);
}
function Sr(t3, r, e3) {
  if (r || (r = Rn), e3) {
    var n = t3.toSeq().map(function(i2, o2) {
      return [i2, e3(i2, o2, t3)];
    }).reduce(function(i2, o2) {
      return Sn(r, i2[1], o2[1]) ? o2 : i2;
    });
    return n && n[0];
  }
  return t3.reduce(function(i2, o2) {
    return Sn(r, i2, o2) ? o2 : i2;
  });
}
function Sn(t3, r, e3) {
  var n = t3(e3, r);
  return n === 0 && e3 !== r && (e3 == null || e3 !== e3) || n > 0;
}
function wr(t3, r, e3, n) {
  var i2 = bt(t3), o2 = new wt(e3).map(function(a) {
    return a.size;
  });
  return i2.size = n ? o2.max() : o2.min(), i2.__iterate = function(a, s2) {
    for (var u = this.__iterator(at, s2), f, h2 = 0; !(f = u.next()).done && a(f.value, h2++, this) !== false; )
      ;
    return h2;
  }, i2.__iteratorUncached = function(a, s2) {
    var u = e3.map(
      function(p) {
        return p = O(p), vr(s2 ? p.reverse() : p);
      }
    ), f = 0, h2 = false;
    return new S(function() {
      var p;
      return h2 || (p = u.map(function(_2) {
        return _2.next();
      }), h2 = n ? p.every(function(_2) {
        return _2.done;
      }) : p.some(function(_2) {
        return _2.done;
      })), h2 ? N() : E(
        a,
        f++,
        r.apply(
          null,
          p.map(function(_2) {
            return _2.value;
          })
        )
      );
    });
  }, i2;
}
function M(t3, r) {
  return t3 === r ? t3 : Jt(t3) ? r : t3.constructor(r);
}
function wn(t3) {
  if (t3 !== Object(t3))
    throw new TypeError("Expected [K, V] tuple: " + t3);
}
function De(t3) {
  return b(t3) ? C : j2(t3) ? pt : yt;
}
function bt(t3) {
  return Object.create(
    (b(t3) ? vt : j2(t3) ? Z : Tt).prototype
  );
}
function je() {
  return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, this) : W.prototype.cacheResult.call(this);
}
function Rn(t3, r) {
  return t3 === void 0 && r === void 0 ? 0 : t3 === void 0 ? 1 : r === void 0 ? -1 : t3 > r ? 1 : t3 < r ? -1 : 0;
}
o();
function Ri(t3, r) {
  r = r || 0;
  for (var e3 = Math.max(0, t3.length - r), n = new Array(e3), i2 = 0; i2 < e3; i2++)
    n[i2] = t3[i2 + r];
  return n;
}
var ut = Ri;
o();
o();
function Ti(t3, r) {
  if (!t3)
    throw new Error(r);
}
var Qt = Ti;
function qi(t3) {
  Qt(
    t3 !== 1 / 0,
    "Cannot perform this action with an infinite size."
  );
}
var B = qi;
o();
o();
o();
o();
function Li(t3) {
  if (dr(t3) && typeof t3 != "string")
    return t3;
  if (K(t3))
    return t3.toArray();
  throw new TypeError(
    "Invalid keyPath: expected Ordered Collection or Array: " + t3
  );
}
var Yr = Li;
o();
o();
var xi = Object.prototype.toString;
function Di(t3) {
  if (!t3 || typeof t3 != "object" || xi.call(t3) !== "[object Object]")
    return false;
  var r = Object.getPrototypeOf(t3);
  if (r === null)
    return true;
  for (var e3 = r, n = Object.getPrototypeOf(r); n !== null; )
    e3 = n, n = Object.getPrototypeOf(e3);
  return e3 === r;
}
var Hr = Di;
function ji(t3) {
  return typeof t3 == "object" && (F(t3) || Array.isArray(t3) || Hr(t3));
}
var ot = ji;
o();
function Ci(t3) {
  try {
    return typeof t3 == "string" ? JSON.stringify(t3) : String(t3);
  } catch {
    return JSON.stringify(t3);
  }
}
var Dt = Ci;
o();
o();
function Ce(t3, r) {
  return F(t3) ? t3.has(r) : ot(t3) && _t.call(t3, r);
}
function br(t3, r, e3) {
  return F(t3) ? t3.get(r, e3) : Ce(t3, r) ? typeof t3.get == "function" ? t3.get(r) : t3[r] : e3;
}
o();
o();
function Fi(t3) {
  if (Array.isArray(t3))
    return ut(t3);
  var r = {};
  for (var e3 in t3)
    _t.call(t3, e3) && (r[e3] = t3[e3]);
  return r;
}
var Kt = Fi;
function Fe(t3, r) {
  if (!ot(t3))
    throw new TypeError(
      "Cannot update non-data-structure value: " + t3
    );
  if (F(t3)) {
    if (!t3.remove)
      throw new TypeError(
        "Cannot update immutable value without .remove() method: " + t3
      );
    return t3.remove(r);
  }
  if (!_t.call(t3, r))
    return t3;
  var e3 = Kt(t3);
  return Array.isArray(e3) ? e3.splice(r, 1) : delete e3[r], e3;
}
o();
function Ne(t3, r, e3) {
  if (!ot(t3))
    throw new TypeError(
      "Cannot update non-data-structure value: " + t3
    );
  if (F(t3)) {
    if (!t3.set)
      throw new TypeError(
        "Cannot update immutable value without .set() method: " + t3
      );
    return t3.set(r, e3);
  }
  if (_t.call(t3, r) && e3 === t3[r])
    return t3;
  var n = Kt(t3);
  return n[r] = e3, n;
}
function ft(t3, r, e3, n) {
  n || (n = e3, e3 = void 0);
  var i2 = Tn(
    F(t3),
    t3,
    Yr(r),
    0,
    e3,
    n
  );
  return i2 === g2 ? e3 : i2;
}
function Tn(t3, r, e3, n, i2, o2) {
  var a = r === g2;
  if (n === e3.length) {
    var s2 = a ? i2 : r, u = o2(s2);
    return u === s2 ? r : u;
  }
  if (!a && !ot(r))
    throw new TypeError(
      "Cannot update within non-data-structure value in path [" + e3.slice(0, n).map(Dt) + "]: " + r
    );
  var f = e3[n], h2 = a ? g2 : br(r, f, g2), p = Tn(
    h2 === g2 ? t3 : F(h2),
    h2,
    e3,
    n + 1,
    i2,
    o2
  );
  return p === h2 ? r : p === g2 ? Fe(r, f) : Ne(
    a ? t3 ? X() : {} : r,
    f,
    p
  );
}
function Be(t3, r, e3) {
  return ft(t3, r, g2, function() {
    return e3;
  });
}
function Gt(t3, r) {
  return Be(this, t3, r);
}
o();
o();
function Pe(t3, r) {
  return ft(t3, r, function() {
    return g2;
  });
}
function tr(t3) {
  return Pe(this, t3);
}
o();
o();
function Ir(t3, r, e3, n) {
  return ft(t3, [r], e3, n);
}
function rr(t3, r, e3) {
  return arguments.length === 1 ? t3(this) : Ir(this, t3, r, e3);
}
o();
function er(t3, r, e3) {
  return ft(this, t3, r, e3);
}
o();
function Jr() {
  for (var t3 = [], r = arguments.length; r--; )
    t3[r] = arguments[r];
  return qn(this, t3);
}
function Vr(t3) {
  for (var r = [], e3 = arguments.length - 1; e3-- > 0; )
    r[e3] = arguments[e3 + 1];
  if (typeof t3 != "function")
    throw new TypeError("Invalid merger function: " + t3);
  return qn(this, r, t3);
}
function qn(t3, r, e3) {
  for (var n = [], i2 = 0; i2 < r.length; i2++) {
    var o2 = C(r[i2]);
    o2.size !== 0 && n.push(o2);
  }
  return n.length === 0 ? t3 : t3.toSeq().size === 0 && !t3.__ownerID && n.length === 1 ? t3.constructor(n[0]) : t3.withMutations(function(a) {
    for (var s2 = e3 ? function(f, h2) {
      Ir(
        a,
        h2,
        g2,
        function(p) {
          return p === g2 ? f : e3(p, f, h2);
        }
      );
    } : function(f, h2) {
      a.set(h2, f);
    }, u = 0; u < n.length; u++)
      n[u].forEach(s2);
  });
}
o();
o();
function Er(t3, r, e3) {
  return kr(t3, r, Ni(e3));
}
function kr(t3, r, e3) {
  if (!ot(t3))
    throw new TypeError(
      "Cannot merge into non-data-structure value: " + t3
    );
  if (F(t3))
    return typeof e3 == "function" && t3.mergeWith ? t3.mergeWith.apply(t3, [e3].concat(r)) : t3.merge ? t3.merge.apply(t3, r) : t3.concat.apply(t3, r);
  for (var n = Array.isArray(t3), i2 = t3, o2 = n ? pt : C, a = n ? function(u) {
    i2 === t3 && (i2 = Kt(i2)), i2.push(u);
  } : function(u, f) {
    var h2 = _t.call(i2, f), p = h2 && e3 ? e3(i2[f], u, f) : u;
    (!h2 || p !== i2[f]) && (i2 === t3 && (i2 = Kt(i2)), i2[f] = p);
  }, s2 = 0; s2 < r.length; s2++)
    o2(r[s2]).forEach(a);
  return i2;
}
function Ni(t3) {
  function r(e3, n, i2) {
    return ot(e3) && ot(n) && Bi(e3, n) ? kr(e3, [n], r) : t3 ? t3(e3, n, i2) : n;
  }
  return r;
}
function Bi(t3, r) {
  var e3 = W(t3), n = W(r);
  return j2(e3) === j2(n) && b(e3) === b(n);
}
function Zr() {
  for (var t3 = [], r = arguments.length; r--; )
    t3[r] = arguments[r];
  return Er(this, t3);
}
function Xr(t3) {
  for (var r = [], e3 = arguments.length - 1; e3-- > 0; )
    r[e3] = arguments[e3 + 1];
  return Er(this, r, t3);
}
o();
function nr(t3) {
  for (var r = [], e3 = arguments.length - 1; e3-- > 0; )
    r[e3] = arguments[e3 + 1];
  return ft(this, t3, X(), function(n) {
    return kr(n, r);
  });
}
o();
function ir(t3) {
  for (var r = [], e3 = arguments.length - 1; e3-- > 0; )
    r[e3] = arguments[e3 + 1];
  return ft(
    this,
    t3,
    X(),
    function(n) {
      return Er(n, r);
    }
  );
}
o();
function Et(t3) {
  var r = this.asMutable();
  return t3(r), r.wasAltered() ? r.__ensureOwner(this.__ownerID) : this;
}
o();
function Ot() {
  return this.__ownerID ? this : this.__ensureOwner(new Ht());
}
o();
function Mt() {
  return this.__ensureOwner();
}
o();
function or() {
  return this.__altered;
}
var It = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return e3 == null ? X() : kt(e3) && !K(e3) ? e3 : X().withMutations(function(n) {
      var i2 = t3(e3);
      B(i2.size), i2.forEach(function(o2, a) {
        return n.set(a, o2);
      });
    });
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.of = function() {
    for (var n = [], i2 = arguments.length; i2--; )
      n[i2] = arguments[i2];
    return X().withMutations(function(o2) {
      for (var a = 0; a < n.length; a += 2) {
        if (a + 1 >= n.length)
          throw new Error("Missing value for key: " + n[a]);
        o2.set(n[a], n[a + 1]);
      }
    });
  }, r.prototype.toString = function() {
    return this.__toString("Map {", "}");
  }, r.prototype.get = function(n, i2) {
    return this._root ? this._root.get(0, void 0, n, i2) : i2;
  }, r.prototype.set = function(n, i2) {
    return Dn(this, n, i2);
  }, r.prototype.remove = function(n) {
    return Dn(this, n, g2);
  }, r.prototype.deleteAll = function(n) {
    var i2 = O(n);
    return i2.size === 0 ? this : this.withMutations(function(o2) {
      i2.forEach(function(a) {
        return o2.remove(a);
      });
    });
  }, r.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._root = null, this.__hash = void 0, this.__altered = true, this) : X();
  }, r.prototype.sort = function(n) {
    return st(qt(this, n));
  }, r.prototype.sortBy = function(n, i2) {
    return st(qt(this, i2, n));
  }, r.prototype.map = function(n, i2) {
    var o2 = this;
    return this.withMutations(function(a) {
      a.forEach(function(s2, u) {
        a.set(u, n.call(i2, s2, u, o2));
      });
    });
  }, r.prototype.__iterator = function(n, i2) {
    return new Pi(this, n, i2);
  }, r.prototype.__iterate = function(n, i2) {
    var o2 = this, a = 0;
    return this._root && this._root.iterate(function(s2) {
      return a++, n(s2[1], s2[0], o2);
    }, i2), a;
  }, r.prototype.__ensureOwner = function(n) {
    return n === this.__ownerID ? this : n ? $e(this.size, this._root, n, this.__hash) : this.size === 0 ? X() : (this.__ownerID = n, this.__altered = false, this);
  }, r;
}(C);
It.isMap = kt;
var T = It.prototype;
T[ye] = true;
T[gt] = T.remove;
T.removeAll = T.deleteAll;
T.setIn = Gt;
T.removeIn = T.deleteIn = tr;
T.update = rr;
T.updateIn = er;
T.merge = T.concat = Jr;
T.mergeWith = Vr;
T.mergeDeep = Zr;
T.mergeDeepWith = Xr;
T.mergeIn = nr;
T.mergeDeepIn = ir;
T.withMutations = Et;
T.wasAltered = or;
T.asImmutable = Mt;
T["@@transducer/init"] = T.asMutable = Ot;
T["@@transducer/step"] = function(t3, r) {
  return t3.set(r[0], r[1]);
};
T["@@transducer/result"] = function(t3) {
  return t3.asImmutable();
};
var Or = function(r, e3) {
  this.ownerID = r, this.entries = e3;
};
Or.prototype.get = function(r, e3, n, i2) {
  for (var o2 = this.entries, a = 0, s2 = o2.length; a < s2; a++)
    if (Y(n, o2[a][0]))
      return o2[a][1];
  return i2;
};
Or.prototype.update = function(r, e3, n, i2, o2, a, s2) {
  for (var u = o2 === g2, f = this.entries, h2 = 0, p = f.length; h2 < p && !Y(i2, f[h2][0]); h2++)
    ;
  var _2 = h2 < p;
  if (_2 ? f[h2][1] === o2 : u)
    return this;
  if (nt(s2), (u || !_2) && nt(a), !(u && f.length === 1)) {
    if (!_2 && !u && f.length >= Hi)
      return Ki(r, f, i2, o2);
    var l2 = r && r === this.ownerID, v = l2 ? f : ut(f);
    return _2 ? u ? h2 === p - 1 ? v.pop() : v[h2] = v.pop() : v[h2] = [i2, o2] : v.push([i2, o2]), l2 ? (this.entries = v, this) : new Or(r, v);
  }
};
var ar = function(r, e3, n) {
  this.ownerID = r, this.bitmap = e3, this.nodes = n;
};
ar.prototype.get = function(r, e3, n, i2) {
  e3 === void 0 && (e3 = H(n));
  var o2 = 1 << ((r === 0 ? e3 : e3 >>> r) & J), a = this.bitmap;
  return a & o2 ? this.nodes[Cn(a & o2 - 1)].get(
    r + z,
    e3,
    n,
    i2
  ) : i2;
};
ar.prototype.update = function(r, e3, n, i2, o2, a, s2) {
  n === void 0 && (n = H(i2));
  var u = (e3 === 0 ? n : n >>> e3) & J, f = 1 << u, h2 = this.bitmap, p = (h2 & f) !== 0;
  if (!p && o2 === g2)
    return this;
  var _2 = Cn(h2 & f - 1), l2 = this.nodes, v = p ? l2[_2] : void 0, d = We(
    v,
    r,
    e3 + z,
    n,
    i2,
    o2,
    a,
    s2
  );
  if (d === v)
    return this;
  if (!p && d && l2.length >= Ji)
    return Wi(r, l2, h2, u, d);
  if (p && !d && l2.length === 2 && jn(l2[_2 ^ 1]))
    return l2[_2 ^ 1];
  if (p && d && l2.length === 1 && jn(d))
    return d;
  var w2 = r && r === this.ownerID, y = p ? d ? h2 : h2 ^ f : h2 | f, I2 = p ? d ? Fn(l2, _2, d, w2) : Yi(l2, _2, w2) : Ui(l2, _2, d, w2);
  return w2 ? (this.bitmap = y, this.nodes = I2, this) : new ar(r, y, I2);
};
var Mr = function(r, e3, n) {
  this.ownerID = r, this.count = e3, this.nodes = n;
};
Mr.prototype.get = function(r, e3, n, i2) {
  e3 === void 0 && (e3 = H(n));
  var o2 = (r === 0 ? e3 : e3 >>> r) & J, a = this.nodes[o2];
  return a ? a.get(r + z, e3, n, i2) : i2;
};
Mr.prototype.update = function(r, e3, n, i2, o2, a, s2) {
  n === void 0 && (n = H(i2));
  var u = (e3 === 0 ? n : n >>> e3) & J, f = o2 === g2, h2 = this.nodes, p = h2[u];
  if (f && !p)
    return this;
  var _2 = We(
    p,
    r,
    e3 + z,
    n,
    i2,
    o2,
    a,
    s2
  );
  if (_2 === p)
    return this;
  var l2 = this.count;
  if (!p)
    l2++;
  else if (!_2 && (l2--, l2 < Vi))
    return $i(r, h2, l2, u);
  var v = r && r === this.ownerID, d = Fn(h2, u, _2, v);
  return v ? (this.count = l2, this.nodes = d, this) : new Mr(r, l2, d);
};
var sr = function(r, e3, n) {
  this.ownerID = r, this.keyHash = e3, this.entries = n;
};
sr.prototype.get = function(r, e3, n, i2) {
  for (var o2 = this.entries, a = 0, s2 = o2.length; a < s2; a++)
    if (Y(n, o2[a][0]))
      return o2[a][1];
  return i2;
};
sr.prototype.update = function(r, e3, n, i2, o2, a, s2) {
  n === void 0 && (n = H(i2));
  var u = o2 === g2;
  if (n !== this.keyHash)
    return u ? this : (nt(s2), nt(a), Ue(this, r, e3, n, [i2, o2]));
  for (var f = this.entries, h2 = 0, p = f.length; h2 < p && !Y(i2, f[h2][0]); h2++)
    ;
  var _2 = h2 < p;
  if (_2 ? f[h2][1] === o2 : u)
    return this;
  if (nt(s2), (u || !_2) && nt(a), u && p === 2)
    return new Lt(r, this.keyHash, f[h2 ^ 1]);
  var l2 = r && r === this.ownerID, v = l2 ? f : ut(f);
  return _2 ? u ? h2 === p - 1 ? v.pop() : v[h2] = v.pop() : v[h2] = [i2, o2] : v.push([i2, o2]), l2 ? (this.entries = v, this) : new sr(r, this.keyHash, v);
};
var Lt = function(r, e3, n) {
  this.ownerID = r, this.keyHash = e3, this.entry = n;
};
Lt.prototype.get = function(r, e3, n, i2) {
  return Y(n, this.entry[0]) ? this.entry[1] : i2;
};
Lt.prototype.update = function(r, e3, n, i2, o2, a, s2) {
  var u = o2 === g2, f = Y(i2, this.entry[0]);
  if (f ? o2 === this.entry[1] : u)
    return this;
  if (nt(s2), u) {
    nt(a);
    return;
  }
  return f ? r && r === this.ownerID ? (this.entry[1] = o2, this) : new Lt(r, this.keyHash, [i2, o2]) : (nt(a), Ue(this, r, e3, H(i2), [i2, o2]));
};
Or.prototype.iterate = sr.prototype.iterate = function(t3, r) {
  for (var e3 = this.entries, n = 0, i2 = e3.length - 1; n <= i2; n++)
    if (t3(e3[r ? i2 - n : n]) === false)
      return false;
};
ar.prototype.iterate = Mr.prototype.iterate = function(t3, r) {
  for (var e3 = this.nodes, n = 0, i2 = e3.length - 1; n <= i2; n++) {
    var o2 = e3[r ? i2 - n : n];
    if (o2 && o2.iterate(t3, r) === false)
      return false;
  }
};
Lt.prototype.iterate = function(t3, r) {
  return t3(this.entry);
};
var Pi = /* @__PURE__ */ function(t3) {
  function r(e3, n, i2) {
    this._type = n, this._reverse = i2, this._stack = e3._root && Ln(e3._root);
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.prototype.next = function() {
    for (var n = this._type, i2 = this._stack; i2; ) {
      var o2 = i2.node, a = i2.index++, s2 = void 0;
      if (o2.entry) {
        if (a === 0)
          return Ke(n, o2.entry);
      } else if (o2.entries) {
        if (s2 = o2.entries.length - 1, a <= s2)
          return Ke(
            n,
            o2.entries[this._reverse ? s2 - a : a]
          );
      } else if (s2 = o2.nodes.length - 1, a <= s2) {
        var u = o2.nodes[this._reverse ? s2 - a : a];
        if (u) {
          if (u.entry)
            return Ke(n, u.entry);
          i2 = this._stack = Ln(u, i2);
        }
        continue;
      }
      i2 = this._stack = this._stack.__prev;
    }
    return N();
  }, r;
}(S);
function Ke(t3, r) {
  return E(t3, r[0], r[1]);
}
function Ln(t3, r) {
  return {
    node: t3,
    index: 0,
    __prev: r
  };
}
function $e(t3, r, e3, n) {
  var i2 = Object.create(T);
  return i2.size = t3, i2._root = r, i2.__ownerID = e3, i2.__hash = n, i2.__altered = false, i2;
}
var xn;
function X() {
  return xn || (xn = $e(0));
}
function Dn(t3, r, e3) {
  var n, i2;
  if (t3._root) {
    var o2 = mr(), a = mr();
    if (n = We(
      t3._root,
      t3.__ownerID,
      0,
      void 0,
      r,
      e3,
      o2,
      a
    ), !a.value)
      return t3;
    i2 = t3.size + (o2.value ? e3 === g2 ? -1 : 1 : 0);
  } else {
    if (e3 === g2)
      return t3;
    i2 = 1, n = new Or(t3.__ownerID, [[r, e3]]);
  }
  return t3.__ownerID ? (t3.size = i2, t3._root = n, t3.__hash = void 0, t3.__altered = true, t3) : n ? $e(i2, n) : X();
}
function We(t3, r, e3, n, i2, o2, a, s2) {
  return t3 ? t3.update(
    r,
    e3,
    n,
    i2,
    o2,
    a,
    s2
  ) : o2 === g2 ? t3 : (nt(s2), nt(a), new Lt(r, n, [i2, o2]));
}
function jn(t3) {
  return t3.constructor === Lt || t3.constructor === sr;
}
function Ue(t3, r, e3, n, i2) {
  if (t3.keyHash === n)
    return new sr(r, n, [t3.entry, i2]);
  var o2 = (e3 === 0 ? t3.keyHash : t3.keyHash >>> e3) & J, a = (e3 === 0 ? n : n >>> e3) & J, s2, u = o2 === a ? [Ue(t3, r, e3 + z, n, i2)] : (s2 = new Lt(r, n, i2), o2 < a ? [t3, s2] : [s2, t3]);
  return new ar(r, 1 << o2 | 1 << a, u);
}
function Ki(t3, r, e3, n) {
  t3 || (t3 = new Ht());
  for (var i2 = new Lt(t3, H(e3), [e3, n]), o2 = 0; o2 < r.length; o2++) {
    var a = r[o2];
    i2 = i2.update(t3, 0, void 0, a[0], a[1]);
  }
  return i2;
}
function $i(t3, r, e3, n) {
  for (var i2 = 0, o2 = 0, a = new Array(e3), s2 = 0, u = 1, f = r.length; s2 < f; s2++, u <<= 1) {
    var h2 = r[s2];
    h2 !== void 0 && s2 !== n && (i2 |= u, a[o2++] = h2);
  }
  return new ar(t3, i2, a);
}
function Wi(t3, r, e3, n, i2) {
  for (var o2 = 0, a = new Array(Q), s2 = 0; e3 !== 0; s2++, e3 >>>= 1)
    a[s2] = e3 & 1 ? r[o2++] : void 0;
  return a[n] = i2, new Mr(t3, o2 + 1, a);
}
function Cn(t3) {
  return t3 -= t3 >> 1 & 1431655765, t3 = (t3 & 858993459) + (t3 >> 2 & 858993459), t3 = t3 + (t3 >> 4) & 252645135, t3 += t3 >> 8, t3 += t3 >> 16, t3 & 127;
}
function Fn(t3, r, e3, n) {
  var i2 = n ? t3 : ut(t3);
  return i2[r] = e3, i2;
}
function Ui(t3, r, e3, n) {
  var i2 = t3.length + 1;
  if (n && r + 1 === i2)
    return t3[r] = e3, t3;
  for (var o2 = new Array(i2), a = 0, s2 = 0; s2 < i2; s2++)
    s2 === r ? (o2[s2] = e3, a = -1) : o2[s2] = t3[s2 + a];
  return o2;
}
function Yi(t3, r, e3) {
  var n = t3.length - 1;
  if (e3 && r === n)
    return t3.pop(), t3;
  for (var i2 = new Array(n), o2 = 0, a = 0; a < n; a++)
    a === r && (o2 = 1), i2[a] = t3[a + o2];
  return i2;
}
var Hi = Q / 4;
var Ji = Q / 2;
var Vi = Q / 4;
o();
o();
var Ye = "@@__IMMUTABLE_LIST__@@";
function Qr(t3) {
  return !!(t3 && t3[Ye]);
}
var $t = /* @__PURE__ */ function(t3) {
  function r(e3) {
    var n = Ar();
    if (e3 == null)
      return n;
    if (Qr(e3))
      return e3;
    var i2 = t3(e3), o2 = i2.size;
    return o2 === 0 ? n : (B(o2), o2 > 0 && o2 < Q ? Rr(0, o2, z, null, new Ct(i2.toArray())) : n.withMutations(function(a) {
      a.setSize(o2), i2.forEach(function(s2, u) {
        return a.set(u, s2);
      });
    }));
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.of = function() {
    return this(arguments);
  }, r.prototype.toString = function() {
    return this.__toString("List [", "]");
  }, r.prototype.get = function(n, i2) {
    if (n = it(this, n), n >= 0 && n < this.size) {
      n += this._origin;
      var o2 = Pn(this, n);
      return o2 && o2.array[n & J];
    }
    return i2;
  }, r.prototype.set = function(n, i2) {
    return ki(this, n, i2);
  }, r.prototype.remove = function(n) {
    return this.has(n) ? n === 0 ? this.shift() : n === this.size - 1 ? this.pop() : this.splice(n, 1) : this;
  }, r.prototype.insert = function(n, i2) {
    return this.splice(n, 0, i2);
  }, r.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = this._origin = this._capacity = 0, this._level = z, this._root = this._tail = this.__hash = void 0, this.__altered = true, this) : Ar();
  }, r.prototype.push = function() {
    var n = arguments, i2 = this.size;
    return this.withMutations(function(o2) {
      jt(o2, 0, i2 + n.length);
      for (var a = 0; a < n.length; a++)
        o2.set(i2 + a, n[a]);
    });
  }, r.prototype.pop = function() {
    return jt(this, 0, -1);
  }, r.prototype.unshift = function() {
    var n = arguments;
    return this.withMutations(function(i2) {
      jt(i2, -n.length);
      for (var o2 = 0; o2 < n.length; o2++)
        i2.set(o2, n[o2]);
    });
  }, r.prototype.shift = function() {
    return jt(this, 1);
  }, r.prototype.concat = function() {
    for (var n = arguments, i2 = [], o2 = 0; o2 < arguments.length; o2++) {
      var a = n[o2], s2 = t3(
        typeof a != "string" && lr(a) ? a : [a]
      );
      s2.size !== 0 && i2.push(s2);
    }
    return i2.length === 0 ? this : this.size === 0 && !this.__ownerID && i2.length === 1 ? this.constructor(i2[0]) : this.withMutations(function(u) {
      i2.forEach(function(f) {
        return f.forEach(function(h2) {
          return u.push(h2);
        });
      });
    });
  }, r.prototype.setSize = function(n) {
    return jt(this, 0, n);
  }, r.prototype.map = function(n, i2) {
    var o2 = this;
    return this.withMutations(function(a) {
      for (var s2 = 0; s2 < o2.size; s2++)
        a.set(s2, n.call(i2, a.get(s2), s2, o2));
    });
  }, r.prototype.slice = function(n, i2) {
    var o2 = this.size;
    return zt(n, i2, o2) ? this : jt(
      this,
      lt(n, o2),
      At(i2, o2)
    );
  }, r.prototype.__iterator = function(n, i2) {
    var o2 = i2 ? this.size : 0, a = Nn(this, i2);
    return new S(function() {
      var s2 = a();
      return s2 === zr ? N() : E(n, i2 ? --o2 : o2++, s2);
    });
  }, r.prototype.__iterate = function(n, i2) {
    for (var o2 = i2 ? this.size : 0, a = Nn(this, i2), s2; (s2 = a()) !== zr && n(s2, i2 ? --o2 : o2++, this) !== false; )
      ;
    return o2;
  }, r.prototype.__ensureOwner = function(n) {
    return n === this.__ownerID ? this : n ? Rr(
      this._origin,
      this._capacity,
      this._level,
      this._root,
      this._tail,
      n,
      this.__hash
    ) : this.size === 0 ? Ar() : (this.__ownerID = n, this.__altered = false, this);
  }, r;
}(pt);
$t.isList = Qr;
var $ = $t.prototype;
$[Ye] = true;
$[gt] = $.remove;
$.merge = $.concat;
$.setIn = Gt;
$.deleteIn = $.removeIn = tr;
$.update = rr;
$.updateIn = er;
$.mergeIn = nr;
$.mergeDeepIn = ir;
$.withMutations = Et;
$.wasAltered = or;
$.asImmutable = Mt;
$["@@transducer/init"] = $.asMutable = Ot;
$["@@transducer/step"] = function(t3, r) {
  return t3.push(r);
};
$["@@transducer/result"] = function(t3) {
  return t3.asImmutable();
};
var Ct = function(r, e3) {
  this.array = r, this.ownerID = e3;
};
Ct.prototype.removeBefore = function(r, e3, n) {
  if (n === e3 ? 1 << e3 : this.array.length === 0)
    return this;
  var i2 = n >>> e3 & J;
  if (i2 >= this.array.length)
    return new Ct([], r);
  var o2 = i2 === 0, a;
  if (e3 > 0) {
    var s2 = this.array[i2];
    if (a = s2 && s2.removeBefore(r, e3 - z, n), a === s2 && o2)
      return this;
  }
  if (o2 && !a)
    return this;
  var u = ur(this, r);
  if (!o2)
    for (var f = 0; f < i2; f++)
      u.array[f] = void 0;
  return a && (u.array[i2] = a), u;
};
Ct.prototype.removeAfter = function(r, e3, n) {
  if (n === (e3 ? 1 << e3 : 0) || this.array.length === 0)
    return this;
  var i2 = n - 1 >>> e3 & J;
  if (i2 >= this.array.length)
    return this;
  var o2;
  if (e3 > 0) {
    var a = this.array[i2];
    if (o2 = a && a.removeAfter(r, e3 - z, n), o2 === a && i2 === this.array.length - 1)
      return this;
  }
  var s2 = ur(this, r);
  return s2.array.splice(i2 + 1), o2 && (s2.array[i2] = o2), s2;
};
var zr = {};
function Nn(t3, r) {
  var e3 = t3._origin, n = t3._capacity, i2 = Tr(n), o2 = t3._tail;
  return a(t3._root, t3._level, 0);
  function a(f, h2, p) {
    return h2 === 0 ? s2(f, p) : u(f, h2, p);
  }
  function s2(f, h2) {
    var p = h2 === i2 ? o2 && o2.array : f && f.array, _2 = h2 > e3 ? 0 : e3 - h2, l2 = n - h2;
    return l2 > Q && (l2 = Q), function() {
      if (_2 === l2)
        return zr;
      var v = r ? --l2 : _2++;
      return p && p[v];
    };
  }
  function u(f, h2, p) {
    var _2, l2 = f && f.array, v = p > e3 ? 0 : e3 - p >> h2, d = (n - p >> h2) + 1;
    return d > Q && (d = Q), function() {
      for (; ; ) {
        if (_2) {
          var w2 = _2();
          if (w2 !== zr)
            return w2;
          _2 = null;
        }
        if (v === d)
          return zr;
        var y = r ? --d : v++;
        _2 = a(
          l2 && l2[y],
          h2 - z,
          p + (y << h2)
        );
      }
    };
  }
}
function Rr(t3, r, e3, n, i2, o2, a) {
  var s2 = Object.create($);
  return s2.size = r - t3, s2._origin = t3, s2._capacity = r, s2._level = e3, s2._root = n, s2._tail = i2, s2.__ownerID = o2, s2.__hash = a, s2.__altered = false, s2;
}
var Bn;
function Ar() {
  return Bn || (Bn = Rr(0, 0, z));
}
function ki(t3, r, e3) {
  if (r = it(t3, r), r !== r)
    return t3;
  if (r >= t3.size || r < 0)
    return t3.withMutations(function(a) {
      r < 0 ? jt(a, r).set(0, e3) : jt(a, 0, r + 1).set(r, e3);
    });
  r += t3._origin;
  var n = t3._tail, i2 = t3._root, o2 = mr();
  return r >= Tr(t3._capacity) ? n = He(n, t3.__ownerID, 0, r, e3, o2) : i2 = He(
    i2,
    t3.__ownerID,
    t3._level,
    r,
    e3,
    o2
  ), o2.value ? t3.__ownerID ? (t3._root = i2, t3._tail = n, t3.__hash = void 0, t3.__altered = true, t3) : Rr(t3._origin, t3._capacity, t3._level, i2, n) : t3;
}
function He(t3, r, e3, n, i2, o2) {
  var a = n >>> e3 & J, s2 = t3 && a < t3.array.length;
  if (!s2 && i2 === void 0)
    return t3;
  var u;
  if (e3 > 0) {
    var f = t3 && t3.array[a], h2 = He(
      f,
      r,
      e3 - z,
      n,
      i2,
      o2
    );
    return h2 === f ? t3 : (u = ur(t3, r), u.array[a] = h2, u);
  }
  return s2 && t3.array[a] === i2 ? t3 : (o2 && nt(o2), u = ur(t3, r), i2 === void 0 && a === u.array.length - 1 ? u.array.pop() : u.array[a] = i2, u);
}
function ur(t3, r) {
  return r && t3 && r === t3.ownerID ? t3 : new Ct(t3 ? t3.array.slice() : [], r);
}
function Pn(t3, r) {
  if (r >= Tr(t3._capacity))
    return t3._tail;
  if (r < 1 << t3._level + z) {
    for (var e3 = t3._root, n = t3._level; e3 && n > 0; )
      e3 = e3.array[r >>> n & J], n -= z;
    return e3;
  }
}
function jt(t3, r, e3) {
  r !== void 0 && (r |= 0), e3 !== void 0 && (e3 |= 0);
  var n = t3.__ownerID || new Ht(), i2 = t3._origin, o2 = t3._capacity, a = i2 + r, s2 = e3 === void 0 ? o2 : e3 < 0 ? o2 + e3 : i2 + e3;
  if (a === i2 && s2 === o2)
    return t3;
  if (a >= s2)
    return t3.clear();
  for (var u = t3._level, f = t3._root, h2 = 0; a + h2 < 0; )
    f = new Ct(
      f && f.array.length ? [void 0, f] : [],
      n
    ), u += z, h2 += 1 << u;
  h2 && (a += h2, i2 += h2, s2 += h2, o2 += h2);
  for (var p = Tr(o2), _2 = Tr(s2); _2 >= 1 << u + z; )
    f = new Ct(
      f && f.array.length ? [f] : [],
      n
    ), u += z;
  var l2 = t3._tail, v = _2 < p ? Pn(t3, s2 - 1) : _2 > p ? new Ct([], n) : l2;
  if (l2 && _2 > p && a < o2 && l2.array.length) {
    f = ur(f, n);
    for (var d = f, w2 = u; w2 > z; w2 -= z) {
      var y = p >>> w2 & J;
      d = d.array[y] = ur(d.array[y], n);
    }
    d.array[p >>> z & J] = l2;
  }
  if (s2 < o2 && (v = v && v.removeAfter(n, 0, s2)), a >= _2)
    a -= _2, s2 -= _2, u = z, f = null, v = v && v.removeBefore(n, 0, a);
  else if (a > i2 || _2 < p) {
    for (h2 = 0; f; ) {
      var I2 = a >>> u & J;
      if (I2 !== _2 >>> u & J)
        break;
      I2 && (h2 += (1 << u) * I2), u -= z, f = f.array[I2];
    }
    f && a > i2 && (f = f.removeBefore(n, u, a - h2)), f && _2 < p && (f = f.removeAfter(
      n,
      u,
      _2 - h2
    )), h2 && (a -= h2, s2 -= h2);
  }
  return t3.__ownerID ? (t3.size = s2 - a, t3._origin = a, t3._capacity = s2, t3._level = u, t3._root = f, t3._tail = v, t3.__hash = void 0, t3.__altered = true, t3) : Rr(a, s2, u, f, v);
}
function Tr(t3) {
  return t3 < Q ? 0 : t3 - 1 >>> z << z;
}
var st = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return e3 == null ? fr() : Kr(e3) ? e3 : fr().withMutations(function(n) {
      var i2 = C(e3);
      B(i2.size), i2.forEach(function(o2, a) {
        return n.set(a, o2);
      });
    });
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.of = function() {
    return this(arguments);
  }, r.prototype.toString = function() {
    return this.__toString("OrderedMap {", "}");
  }, r.prototype.get = function(n, i2) {
    var o2 = this._map.get(n);
    return o2 !== void 0 ? this._list.get(o2)[1] : i2;
  }, r.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._map.clear(), this._list.clear(), this.__altered = true, this) : fr();
  }, r.prototype.set = function(n, i2) {
    return $n(this, n, i2);
  }, r.prototype.remove = function(n) {
    return $n(this, n, g2);
  }, r.prototype.__iterate = function(n, i2) {
    var o2 = this;
    return this._list.__iterate(
      function(a) {
        return a && n(a[1], a[0], o2);
      },
      i2
    );
  }, r.prototype.__iterator = function(n, i2) {
    return this._list.fromEntrySeq().__iterator(n, i2);
  }, r.prototype.__ensureOwner = function(n) {
    if (n === this.__ownerID)
      return this;
    var i2 = this._map.__ensureOwner(n), o2 = this._list.__ensureOwner(n);
    return n ? Je(i2, o2, n, this.__hash) : this.size === 0 ? fr() : (this.__ownerID = n, this.__altered = false, this._map = i2, this._list = o2, this);
  }, r;
}(It);
st.isOrderedMap = Kr;
st.prototype[dt] = true;
st.prototype[gt] = st.prototype.remove;
function Je(t3, r, e3, n) {
  var i2 = Object.create(st.prototype);
  return i2.size = t3 ? t3.size : 0, i2._map = t3, i2._list = r, i2.__ownerID = e3, i2.__hash = n, i2.__altered = false, i2;
}
var Kn;
function fr() {
  return Kn || (Kn = Je(X(), Ar()));
}
function $n(t3, r, e3) {
  var n = t3._map, i2 = t3._list, o2 = n.get(r), a = o2 !== void 0, s2, u;
  if (e3 === g2) {
    if (!a)
      return t3;
    i2.size >= Q && i2.size >= n.size * 2 ? (u = i2.filter(function(f, h2) {
      return f !== void 0 && o2 !== h2;
    }), s2 = u.toKeyedSeq().map(function(f) {
      return f[0];
    }).flip().toMap(), t3.__ownerID && (s2.__ownerID = u.__ownerID = t3.__ownerID)) : (s2 = n.remove(r), u = o2 === i2.size - 1 ? i2.pop() : i2.set(o2, void 0));
  } else if (a) {
    if (e3 === i2.get(o2)[1])
      return t3;
    s2 = n, u = i2.set(o2, [r, e3]);
  } else
    s2 = n.set(r, i2.size), u = i2.set(i2.size, [r, e3]);
  return t3.__ownerID ? (t3.size = s2.size, t3._map = s2, t3._list = u, t3.__hash = void 0, t3.__altered = true, t3) : Je(s2, u);
}
o();
o();
var Ve = "@@__IMMUTABLE_STACK__@@";
function qr(t3) {
  return !!(t3 && t3[Ve]);
}
var xr = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return e3 == null ? Gr() : qr(e3) ? e3 : Gr().pushAll(e3);
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.of = function() {
    return this(arguments);
  }, r.prototype.toString = function() {
    return this.__toString("Stack [", "]");
  }, r.prototype.get = function(n, i2) {
    var o2 = this._head;
    for (n = it(this, n); o2 && n--; )
      o2 = o2.next;
    return o2 ? o2.value : i2;
  }, r.prototype.peek = function() {
    return this._head && this._head.value;
  }, r.prototype.push = function() {
    var n = arguments;
    if (arguments.length === 0)
      return this;
    for (var i2 = this.size + arguments.length, o2 = this._head, a = arguments.length - 1; a >= 0; a--)
      o2 = {
        value: n[a],
        next: o2
      };
    return this.__ownerID ? (this.size = i2, this._head = o2, this.__hash = void 0, this.__altered = true, this) : Lr(i2, o2);
  }, r.prototype.pushAll = function(n) {
    if (n = t3(n), n.size === 0)
      return this;
    if (this.size === 0 && qr(n))
      return n;
    B(n.size);
    var i2 = this.size, o2 = this._head;
    return n.__iterate(
      function(a) {
        i2++, o2 = {
          value: a,
          next: o2
        };
      },
      /* reverse */
      true
    ), this.__ownerID ? (this.size = i2, this._head = o2, this.__hash = void 0, this.__altered = true, this) : Lr(i2, o2);
  }, r.prototype.pop = function() {
    return this.slice(1);
  }, r.prototype.clear = function() {
    return this.size === 0 ? this : this.__ownerID ? (this.size = 0, this._head = void 0, this.__hash = void 0, this.__altered = true, this) : Gr();
  }, r.prototype.slice = function(n, i2) {
    if (zt(n, i2, this.size))
      return this;
    var o2 = lt(n, this.size), a = At(i2, this.size);
    if (a !== this.size)
      return t3.prototype.slice.call(this, n, i2);
    for (var s2 = this.size - o2, u = this._head; o2--; )
      u = u.next;
    return this.__ownerID ? (this.size = s2, this._head = u, this.__hash = void 0, this.__altered = true, this) : Lr(s2, u);
  }, r.prototype.__ensureOwner = function(n) {
    return n === this.__ownerID ? this : n ? Lr(this.size, this._head, n, this.__hash) : this.size === 0 ? Gr() : (this.__ownerID = n, this.__altered = false, this);
  }, r.prototype.__iterate = function(n, i2) {
    var o2 = this;
    if (i2)
      return new wt(this.toArray()).__iterate(
        function(u, f) {
          return n(u, f, o2);
        },
        i2
      );
    for (var a = 0, s2 = this._head; s2 && n(s2.value, a++, this) !== false; )
      s2 = s2.next;
    return a;
  }, r.prototype.__iterator = function(n, i2) {
    if (i2)
      return new wt(this.toArray()).__iterator(n, i2);
    var o2 = 0, a = this._head;
    return new S(function() {
      if (a) {
        var s2 = a.value;
        return a = a.next, E(n, o2++, s2);
      }
      return N();
    });
  }, r;
}(pt);
xr.isStack = qr;
var tt = xr.prototype;
tt[Ve] = true;
tt.shift = tt.pop;
tt.unshift = tt.push;
tt.unshiftAll = tt.pushAll;
tt.withMutations = Et;
tt.wasAltered = or;
tt.asImmutable = Mt;
tt["@@transducer/init"] = tt.asMutable = Ot;
tt["@@transducer/step"] = function(t3, r) {
  return t3.unshift(r);
};
tt["@@transducer/result"] = function(t3) {
  return t3.asImmutable();
};
function Lr(t3, r, e3, n) {
  var i2 = Object.create(tt);
  return i2.size = t3, i2._head = r, i2.__ownerID = e3, i2.__hash = n, i2.__altered = false, i2;
}
var Wn;
function Gr() {
  return Wn || (Wn = Lr(0));
}
o();
o();
o();
var ke = "@@__IMMUTABLE_SET__@@";
function hr(t3) {
  return !!(t3 && t3[ke]);
}
function te(t3) {
  return hr(t3) && K(t3);
}
o();
o();
function Zi(t3, r) {
  if (t3 === r)
    return true;
  if (!D(r) || t3.size !== void 0 && r.size !== void 0 && t3.size !== r.size || t3.__hash !== void 0 && r.__hash !== void 0 && t3.__hash !== r.__hash || b(t3) !== b(r) || j2(t3) !== j2(r) || K(t3) !== K(r))
    return false;
  if (t3.size === 0 && r.size === 0)
    return true;
  var e3 = !Rt(t3);
  if (K(t3)) {
    var n = t3.entries();
    return r.every(function(u, f) {
      var h2 = n.next().value;
      return h2 && Y(h2[1], u) && (e3 || Y(h2[0], f));
    }) && n.next().done;
  }
  var i2 = false;
  if (t3.size === void 0)
    if (r.size === void 0)
      typeof t3.cacheResult == "function" && t3.cacheResult();
    else {
      i2 = true;
      var o2 = t3;
      t3 = r, r = o2;
    }
  var a = true, s2 = r.__iterate(function(u, f) {
    if (e3 ? !t3.has(u) : i2 ? !Y(u, t3.get(f, g2)) : !Y(t3.get(f, g2), u))
      return a = false, false;
  });
  return a && t3.size === s2;
}
var Dr = Zi;
o();
function Xi(t3, r) {
  var e3 = function(n) {
    t3.prototype[n] = r[n];
  };
  return Object.keys(r).forEach(e3), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(r).forEach(e3), t3;
}
var Ft = Xi;
o();
function cr(t3) {
  if (!t3 || typeof t3 != "object")
    return t3;
  if (!D(t3)) {
    if (!ot(t3))
      return t3;
    t3 = W(t3);
  }
  if (b(t3)) {
    var r = {};
    return t3.__iterate(function(n, i2) {
      r[i2] = cr(n);
    }), r;
  }
  var e3 = [];
  return t3.__iterate(function(n) {
    e3.push(cr(n));
  }), e3;
}
o();
var Wt = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return e3 == null ? jr() : hr(e3) && !K(e3) ? e3 : jr().withMutations(function(n) {
      var i2 = t3(e3);
      B(i2.size), i2.forEach(function(o2) {
        return n.add(o2);
      });
    });
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.of = function() {
    return this(arguments);
  }, r.fromKeys = function(n) {
    return this(C(n).keySeq());
  }, r.intersect = function(n) {
    return n = O(n).toArray(), n.length ? V.intersect.apply(r(n.pop()), n) : jr();
  }, r.union = function(n) {
    return n = O(n).toArray(), n.length ? V.union.apply(r(n.pop()), n) : jr();
  }, r.prototype.toString = function() {
    return this.__toString("Set {", "}");
  }, r.prototype.has = function(n) {
    return this._map.has(n);
  }, r.prototype.add = function(n) {
    return re(this, this._map.set(n, n));
  }, r.prototype.remove = function(n) {
    return re(this, this._map.remove(n));
  }, r.prototype.clear = function() {
    return re(this, this._map.clear());
  }, r.prototype.map = function(n, i2) {
    var o2 = this, a = false, s2 = re(
      this,
      this._map.mapEntries(function(u) {
        var f = u[1], h2 = n.call(i2, f, f, o2);
        return h2 !== f && (a = true), [h2, h2];
      }, i2)
    );
    return a ? s2 : this;
  }, r.prototype.union = function() {
    for (var n = [], i2 = arguments.length; i2--; )
      n[i2] = arguments[i2];
    return n = n.filter(function(o2) {
      return o2.size !== 0;
    }), n.length === 0 ? this : this.size === 0 && !this.__ownerID && n.length === 1 ? this.constructor(n[0]) : this.withMutations(function(o2) {
      for (var a = 0; a < n.length; a++)
        typeof n[a] == "string" ? o2.add(n[a]) : t3(n[a]).forEach(function(s2) {
          return o2.add(s2);
        });
    });
  }, r.prototype.intersect = function() {
    for (var n = [], i2 = arguments.length; i2--; )
      n[i2] = arguments[i2];
    if (n.length === 0)
      return this;
    n = n.map(function(a) {
      return t3(a);
    });
    var o2 = [];
    return this.forEach(function(a) {
      n.every(function(s2) {
        return s2.includes(a);
      }) || o2.push(a);
    }), this.withMutations(function(a) {
      o2.forEach(function(s2) {
        a.remove(s2);
      });
    });
  }, r.prototype.subtract = function() {
    for (var n = [], i2 = arguments.length; i2--; )
      n[i2] = arguments[i2];
    if (n.length === 0)
      return this;
    n = n.map(function(a) {
      return t3(a);
    });
    var o2 = [];
    return this.forEach(function(a) {
      n.some(function(s2) {
        return s2.includes(a);
      }) && o2.push(a);
    }), this.withMutations(function(a) {
      o2.forEach(function(s2) {
        a.remove(s2);
      });
    });
  }, r.prototype.sort = function(n) {
    return Nt(qt(this, n));
  }, r.prototype.sortBy = function(n, i2) {
    return Nt(qt(this, i2, n));
  }, r.prototype.wasAltered = function() {
    return this._map.wasAltered();
  }, r.prototype.__iterate = function(n, i2) {
    var o2 = this;
    return this._map.__iterate(function(a) {
      return n(a, a, o2);
    }, i2);
  }, r.prototype.__iterator = function(n, i2) {
    return this._map.__iterator(n, i2);
  }, r.prototype.__ensureOwner = function(n) {
    if (n === this.__ownerID)
      return this;
    var i2 = this._map.__ensureOwner(n);
    return n ? this.__make(i2, n) : this.size === 0 ? this.__empty() : (this.__ownerID = n, this._map = i2, this);
  }, r;
}(yt);
Wt.isSet = hr;
var V = Wt.prototype;
V[ke] = true;
V[gt] = V.remove;
V.merge = V.concat = V.union;
V.withMutations = Et;
V.asImmutable = Mt;
V["@@transducer/init"] = V.asMutable = Ot;
V["@@transducer/step"] = function(t3, r) {
  return t3.add(r);
};
V["@@transducer/result"] = function(t3) {
  return t3.asImmutable();
};
V.__empty = jr;
V.__make = Yn;
function re(t3, r) {
  return t3.__ownerID ? (t3.size = r.size, t3._map = r, t3) : r === t3._map ? t3 : r.size === 0 ? t3.__empty() : t3.__make(r);
}
function Yn(t3, r) {
  var e3 = Object.create(V);
  return e3.size = t3 ? t3.size : 0, e3._map = t3, e3.__ownerID = r, e3;
}
var Un;
function jr() {
  return Un || (Un = Yn(X()));
}
o();
var Xe = /* @__PURE__ */ function(t3) {
  function r(e3, n, i2) {
    if (!(this instanceof r))
      return new r(e3, n, i2);
    if (Qt(i2 !== 0, "Cannot step a Range by 0"), e3 = e3 || 0, n === void 0 && (n = 1 / 0), i2 = i2 === void 0 ? 1 : Math.abs(i2), n < e3 && (i2 = -i2), this._start = e3, this._end = n, this._step = i2, this.size = Math.max(0, Math.ceil((n - e3) / i2 - 1) + 1), this.size === 0) {
      if (Ze)
        return Ze;
      Ze = this;
    }
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.prototype.toString = function() {
    return this.size === 0 ? "Range []" : "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  }, r.prototype.get = function(n, i2) {
    return this.has(n) ? this._start + it(this, n) * this._step : i2;
  }, r.prototype.includes = function(n) {
    var i2 = (n - this._start) / this._step;
    return i2 >= 0 && i2 < this.size && i2 === Math.floor(i2);
  }, r.prototype.slice = function(n, i2) {
    return zt(n, i2, this.size) ? this : (n = lt(n, this.size), i2 = At(i2, this.size), i2 <= n ? new r(0, 0) : new r(
      this.get(n, this._end),
      this.get(i2, this._end),
      this._step
    ));
  }, r.prototype.indexOf = function(n) {
    var i2 = n - this._start;
    if (i2 % this._step === 0) {
      var o2 = i2 / this._step;
      if (o2 >= 0 && o2 < this.size)
        return o2;
    }
    return -1;
  }, r.prototype.lastIndexOf = function(n) {
    return this.indexOf(n);
  }, r.prototype.__iterate = function(n, i2) {
    for (var o2 = this.size, a = this._step, s2 = i2 ? this._start + (o2 - 1) * a : this._start, u = 0; u !== o2 && n(s2, i2 ? o2 - ++u : u++, this) !== false; )
      s2 += i2 ? -a : a;
    return u;
  }, r.prototype.__iterator = function(n, i2) {
    var o2 = this.size, a = this._step, s2 = i2 ? this._start + (o2 - 1) * a : this._start, u = 0;
    return new S(function() {
      if (u === o2)
        return N();
      var f = s2;
      return s2 += i2 ? -a : a, E(n, i2 ? o2 - ++u : u++, f);
    });
  }, r.prototype.equals = function(n) {
    return n instanceof r ? this._start === n._start && this._end === n._end && this._step === n._step : Dr(this, n);
  }, r;
}(Z);
var Ze;
o();
o();
function Cr(t3, r, e3) {
  for (var n = Yr(r), i2 = 0; i2 !== n.length; )
    if (t3 = br(t3, n[i2++], g2), t3 === g2)
      return e3;
  return t3;
}
function ee(t3, r) {
  return Cr(this, t3, r);
}
o();
o();
function Qe(t3, r) {
  return Cr(t3, r, g2) !== g2;
}
function Hn(t3) {
  return Qe(this, t3);
}
o();
function Ge() {
  B(this.size);
  var t3 = {};
  return this.__iterate(function(r, e3) {
    t3[e3] = r;
  }), t3;
}
O.isIterable = D;
O.isKeyed = b;
O.isIndexed = j2;
O.isAssociative = Rt;
O.isOrdered = K;
O.Iterator = S;
Ft(O, {
  // ### Conversion to other types
  toArray: function() {
    B(this.size);
    var r = new Array(this.size || 0), e3 = b(this), n = 0;
    return this.__iterate(function(i2, o2) {
      r[n++] = e3 ? [o2, i2] : i2;
    }), r;
  },
  toIndexedSeq: function() {
    return new Me(this);
  },
  toJS: function() {
    return cr(this);
  },
  toKeyedSeq: function() {
    return new yr(this, true);
  },
  toMap: function() {
    return It(this.toKeyedSeq());
  },
  toObject: Ge,
  toOrderedMap: function() {
    return st(this.toKeyedSeq());
  },
  toOrderedSet: function() {
    return Nt(b(this) ? this.valueSeq() : this);
  },
  toSet: function() {
    return Wt(b(this) ? this.valueSeq() : this);
  },
  toSetSeq: function() {
    return new ze(this);
  },
  toSeq: function() {
    return j2(this) ? this.toIndexedSeq() : b(this) ? this.toKeyedSeq() : this.toSetSeq();
  },
  toStack: function() {
    return xr(b(this) ? this.valueSeq() : this);
  },
  toList: function() {
    return $t(b(this) ? this.valueSeq() : this);
  },
  // ### Common JavaScript methods and properties
  toString: function() {
    return "[Collection]";
  },
  __toString: function(r, e3) {
    return this.size === 0 ? r + e3 : r + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + e3;
  },
  // ### ES6 Collection methods (ES6 Array and Map)
  concat: function() {
    for (var r = [], e3 = arguments.length; e3--; )
      r[e3] = arguments[e3];
    return M(this, Mn(this, r));
  },
  includes: function(r) {
    return this.some(function(e3) {
      return Y(e3, r);
    });
  },
  entries: function() {
    return this.__iterator(G);
  },
  every: function(r, e3) {
    B(this.size);
    var n = true;
    return this.__iterate(function(i2, o2, a) {
      if (!r.call(e3, i2, o2, a))
        return n = false, false;
    }), n;
  },
  filter: function(r, e3) {
    return M(this, qe(this, r, e3, true));
  },
  partition: function(r, e3) {
    return En(this, r, e3);
  },
  find: function(r, e3, n) {
    var i2 = this.findEntry(r, e3);
    return i2 ? i2[1] : n;
  },
  forEach: function(r, e3) {
    return B(this.size), this.__iterate(e3 ? r.bind(e3) : r);
  },
  join: function(r) {
    B(this.size), r = r !== void 0 ? "" + r : ",";
    var e3 = "", n = true;
    return this.__iterate(function(i2) {
      n ? n = false : e3 += r, e3 += i2 != null ? i2.toString() : "";
    }), e3;
  },
  keys: function() {
    return this.__iterator(Bt);
  },
  map: function(r, e3) {
    return M(this, Te(this, r, e3));
  },
  reduce: function(r, e3, n) {
    return Jn(
      this,
      r,
      e3,
      n,
      arguments.length < 2,
      false
    );
  },
  reduceRight: function(r, e3, n) {
    return Jn(
      this,
      r,
      e3,
      n,
      arguments.length < 2,
      true
    );
  },
  reverse: function() {
    return M(this, Wr(this, true));
  },
  slice: function(r, e3) {
    return M(this, Ur(this, r, e3, true));
  },
  some: function(r, e3) {
    B(this.size);
    var n = false;
    return this.__iterate(function(i2, o2, a) {
      if (r.call(e3, i2, o2, a))
        return n = true, false;
    }), n;
  },
  sort: function(r) {
    return M(this, qt(this, r));
  },
  values: function() {
    return this.__iterator(at);
  },
  // ### More sequential methods
  butLast: function() {
    return this.slice(0, -1);
  },
  isEmpty: function() {
    return this.size !== void 0 ? this.size === 0 : !this.some(function() {
      return true;
    });
  },
  count: function(r, e3) {
    return xt(
      r ? this.toSeq().filter(r, e3) : this
    );
  },
  countBy: function(r, e3) {
    return bn(this, r, e3);
  },
  equals: function(r) {
    return Dr(this, r);
  },
  entrySeq: function() {
    var r = this;
    if (r._cache)
      return new wt(r._cache);
    var e3 = r.toSeq().map(Gi).toIndexedSeq();
    return e3.fromEntrySeq = function() {
      return r.toSeq();
    }, e3;
  },
  filterNot: function(r, e3) {
    return this.filter(tn(r), e3);
  },
  findEntry: function(r, e3, n) {
    var i2 = n;
    return this.__iterate(function(o2, a, s2) {
      if (r.call(e3, o2, a, s2))
        return i2 = [a, o2], false;
    }), i2;
  },
  findKey: function(r, e3) {
    var n = this.findEntry(r, e3);
    return n && n[0];
  },
  findLast: function(r, e3, n) {
    return this.toKeyedSeq().reverse().find(r, e3, n);
  },
  findLastEntry: function(r, e3, n) {
    return this.toKeyedSeq().reverse().findEntry(r, e3, n);
  },
  findLastKey: function(r, e3) {
    return this.toKeyedSeq().reverse().findKey(r, e3);
  },
  first: function(r) {
    return this.find(se, null, r);
  },
  flatMap: function(r, e3) {
    return M(this, zn(this, r, e3));
  },
  flatten: function(r) {
    return M(this, xe(this, r, true));
  },
  fromEntrySeq: function() {
    return new Ae(this);
  },
  get: function(r, e3) {
    return this.find(function(n, i2) {
      return Y(i2, r);
    }, void 0, e3);
  },
  getIn: ee,
  groupBy: function(r, e3) {
    return In(this, r, e3);
  },
  has: function(r) {
    return this.get(r, g2) !== g2;
  },
  hasIn: Hn,
  isSubset: function(r) {
    return r = typeof r.includes == "function" ? r : O(r), this.every(function(e3) {
      return r.includes(e3);
    });
  },
  isSuperset: function(r) {
    return r = typeof r.isSubset == "function" ? r : O(r), r.isSubset(this);
  },
  keyOf: function(r) {
    return this.findKey(function(e3) {
      return Y(e3, r);
    });
  },
  keySeq: function() {
    return this.toSeq().map(Qi).toIndexedSeq();
  },
  last: function(r) {
    return this.toSeq().reverse().first(r);
  },
  lastKeyOf: function(r) {
    return this.toKeyedSeq().reverse().keyOf(r);
  },
  max: function(r) {
    return Sr(this, r);
  },
  maxBy: function(r, e3) {
    return Sr(this, e3, r);
  },
  min: function(r) {
    return Sr(
      this,
      r ? Vn(r) : Zn
    );
  },
  minBy: function(r, e3) {
    return Sr(
      this,
      e3 ? Vn(e3) : Zn,
      r
    );
  },
  rest: function() {
    return this.slice(1);
  },
  skip: function(r) {
    return r === 0 ? this : this.slice(Math.max(0, r));
  },
  skipLast: function(r) {
    return r === 0 ? this : this.slice(0, -Math.max(0, r));
  },
  skipWhile: function(r, e3) {
    return M(this, Le(this, r, e3, true));
  },
  skipUntil: function(r, e3) {
    return this.skipWhile(tn(r), e3);
  },
  sortBy: function(r, e3) {
    return M(this, qt(this, e3, r));
  },
  take: function(r) {
    return this.slice(0, Math.max(0, r));
  },
  takeLast: function(r) {
    return this.slice(-Math.max(0, r));
  },
  takeWhile: function(r, e3) {
    return M(this, On(this, r, e3));
  },
  takeUntil: function(r, e3) {
    return this.takeWhile(tn(r), e3);
  },
  update: function(r) {
    return r(this);
  },
  valueSeq: function() {
    return this.toIndexedSeq();
  },
  // ### Hashable Object
  hashCode: function() {
    return this.__hash || (this.__hash = to(this));
  }
  // ### Internal
  // abstract __iterate(fn, reverse)
  // abstract __iterator(type, reverse)
});
var k2 = O.prototype;
k2[ue] = true;
k2[Vt] = k2.values;
k2.toJSON = k2.toArray;
k2.__toStringMapper = Dt;
k2.inspect = k2.toSource = function() {
  return this.toString();
};
k2.chain = k2.flatMap;
k2.contains = k2.includes;
Ft(C, {
  // ### More sequential methods
  flip: function() {
    return M(this, Re(this));
  },
  mapEntries: function(r, e3) {
    var n = this, i2 = 0;
    return M(
      this,
      this.toSeq().map(function(o2, a) {
        return r.call(e3, [a, o2], i2++, n);
      }).fromEntrySeq()
    );
  },
  mapKeys: function(r, e3) {
    var n = this;
    return M(
      this,
      this.toSeq().flip().map(function(i2, o2) {
        return r.call(e3, i2, o2, n);
      }).flip()
    );
  }
});
var Fr = C.prototype;
Fr[fe] = true;
Fr[Vt] = k2.entries;
Fr.toJSON = Ge;
Fr.__toStringMapper = function(t3, r) {
  return Dt(r) + ": " + Dt(t3);
};
Ft(pt, {
  // ### Conversion to other types
  toKeyedSeq: function() {
    return new yr(this, false);
  },
  // ### ES6 Collection methods (ES6 Array and Map)
  filter: function(r, e3) {
    return M(this, qe(this, r, e3, false));
  },
  findIndex: function(r, e3) {
    var n = this.findEntry(r, e3);
    return n ? n[0] : -1;
  },
  indexOf: function(r) {
    var e3 = this.keyOf(r);
    return e3 === void 0 ? -1 : e3;
  },
  lastIndexOf: function(r) {
    var e3 = this.lastKeyOf(r);
    return e3 === void 0 ? -1 : e3;
  },
  reverse: function() {
    return M(this, Wr(this, false));
  },
  slice: function(r, e3) {
    return M(this, Ur(this, r, e3, false));
  },
  splice: function(r, e3) {
    var n = arguments.length;
    if (e3 = Math.max(e3 || 0, 0), n === 0 || n === 2 && !e3)
      return this;
    r = lt(r, r < 0 ? this.count() : this.size);
    var i2 = this.slice(0, r);
    return M(
      this,
      n === 1 ? i2 : i2.concat(ut(arguments, 2), this.slice(r + e3))
    );
  },
  // ### More collection methods
  findLastIndex: function(r, e3) {
    var n = this.findLastEntry(r, e3);
    return n ? n[0] : -1;
  },
  first: function(r) {
    return this.get(0, r);
  },
  flatten: function(r) {
    return M(this, xe(this, r, false));
  },
  get: function(r, e3) {
    return r = it(this, r), r < 0 || this.size === 1 / 0 || this.size !== void 0 && r > this.size ? e3 : this.find(function(n, i2) {
      return i2 === r;
    }, void 0, e3);
  },
  has: function(r) {
    return r = it(this, r), r >= 0 && (this.size !== void 0 ? this.size === 1 / 0 || r < this.size : this.indexOf(r) !== -1);
  },
  interpose: function(r) {
    return M(this, An(this, r));
  },
  interleave: function() {
    var r = [this].concat(ut(arguments)), e3 = wr(this.toSeq(), Z.of, r), n = e3.flatten(true);
    return e3.size && (n.size = e3.size * r.length), M(this, n);
  },
  keySeq: function() {
    return Xe(0, this.size);
  },
  last: function(r) {
    return this.get(-1, r);
  },
  skipWhile: function(r, e3) {
    return M(this, Le(this, r, e3, false));
  },
  zip: function() {
    var r = [this].concat(ut(arguments));
    return M(this, wr(this, kn, r));
  },
  zipAll: function() {
    var r = [this].concat(ut(arguments));
    return M(this, wr(this, kn, r, true));
  },
  zipWith: function(r) {
    var e3 = ut(arguments);
    return e3[0] = this, M(this, wr(this, r, e3));
  }
});
var Ut = pt.prototype;
Ut[he] = true;
Ut[dt] = true;
Ft(yt, {
  // ### ES6 Collection methods (ES6 Array and Map)
  get: function(r, e3) {
    return this.has(r) ? r : e3;
  },
  includes: function(r) {
    return this.has(r);
  },
  // ### More sequential methods
  keySeq: function() {
    return this.valueSeq();
  }
});
var pr = yt.prototype;
pr.has = k2.includes;
pr.contains = pr.includes;
pr.keys = pr.values;
Ft(vt, Fr);
Ft(Z, Ut);
Ft(Tt, pr);
function Jn(t3, r, e3, n, i2, o2) {
  return B(t3.size), t3.__iterate(function(a, s2, u) {
    i2 ? (i2 = false, e3 = a) : e3 = r.call(n, e3, a, s2, u);
  }, o2), e3;
}
function Qi(t3, r) {
  return r;
}
function Gi(t3, r) {
  return [r, t3];
}
function tn(t3) {
  return function() {
    return !t3.apply(this, arguments);
  };
}
function Vn(t3) {
  return function() {
    return -t3.apply(this, arguments);
  };
}
function kn() {
  return ut(arguments);
}
function Zn(t3, r) {
  return t3 < r ? 1 : t3 > r ? -1 : 0;
}
function to(t3) {
  if (t3.size === 1 / 0)
    return 0;
  var r = K(t3), e3 = b(t3), n = r ? 1 : 0, i2 = t3.__iterate(
    e3 ? r ? function(o2, a) {
      n = 31 * n + Xn(H(o2), H(a)) | 0;
    } : function(o2, a) {
      n = n + Xn(H(o2), H(a)) | 0;
    } : r ? function(o2) {
      n = 31 * n + H(o2) | 0;
    } : function(o2) {
      n = n + H(o2) | 0;
    }
  );
  return ro(i2, n);
}
function ro(t3, r) {
  return r = Zt(r, 3432918353), r = Zt(r << 15 | r >>> -15, 461845907), r = Zt(r << 13 | r >>> -13, 5), r = (r + 3864292196 | 0) ^ t3, r = Zt(r ^ r >>> 16, 2246822507), r = Zt(r ^ r >>> 13, 3266489909), r = Xt(r ^ r >>> 16), r;
}
function Xn(t3, r) {
  return t3 ^ r + 2654435769 + (t3 << 6) + (t3 >> 2) | 0;
}
var Nt = /* @__PURE__ */ function(t3) {
  function r(e3) {
    return e3 == null ? rn() : te(e3) ? e3 : rn().withMutations(function(n) {
      var i2 = yt(e3);
      B(i2.size), i2.forEach(function(o2) {
        return n.add(o2);
      });
    });
  }
  return t3 && (r.__proto__ = t3), r.prototype = Object.create(t3 && t3.prototype), r.prototype.constructor = r, r.of = function() {
    return this(arguments);
  }, r.fromKeys = function(n) {
    return this(C(n).keySeq());
  }, r.prototype.toString = function() {
    return this.__toString("OrderedSet {", "}");
  }, r;
}(Wt);
Nt.isOrderedSet = te;
var Yt = Nt.prototype;
Yt[dt] = true;
Yt.zip = Ut.zip;
Yt.zipWith = Ut.zipWith;
Yt.zipAll = Ut.zipAll;
Yt.__empty = rn;
Yt.__make = Gn;
function Gn(t3, r) {
  var e3 = Object.create(Yt);
  return e3.size = t3 ? t3.size : 0, e3._map = t3, e3.__ownerID = r, e3;
}
var Qn;
function rn() {
  return Qn || (Qn = Gn(fr()));
}
o();
o();
function eo(t3) {
  if (St(t3))
    throw new Error(
      "Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead."
    );
  if (F(t3))
    throw new Error(
      "Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead."
    );
  if (t3 === null || typeof t3 != "object")
    throw new Error(
      "Can not call `Record` with a non-object as default values. Use a plain javascript object instead."
    );
}
var P = function(r, e3) {
  var n;
  eo(r);
  var i2 = function(s2) {
    var u = this;
    if (s2 instanceof i2)
      return s2;
    if (!(this instanceof i2))
      return new i2(s2);
    if (!n) {
      n = true;
      var f = Object.keys(r), h2 = o2._indices = {};
      o2._name = e3, o2._keys = f, o2._defaultValues = r;
      for (var p = 0; p < f.length; p++) {
        var _2 = f[p];
        h2[_2] = p, o2[_2] ? typeof console == "object" && console.warn && console.warn(
          "Cannot define " + nn(this) + ' with property "' + _2 + '" since that property name is part of the Record API.'
        ) : no(o2, _2);
      }
    }
    return this.__ownerID = void 0, this._values = $t().withMutations(function(l2) {
      l2.setSize(u._keys.length), C(s2).forEach(function(v, d) {
        l2.set(u._indices[d], v === u._defaultValues[d] ? void 0 : v);
      });
    }), this;
  }, o2 = i2.prototype = Object.create(R);
  return o2.constructor = i2, e3 && (i2.displayName = e3), i2;
};
P.prototype.toString = function() {
  for (var r = nn(this) + " { ", e3 = this._keys, n, i2 = 0, o2 = e3.length; i2 !== o2; i2++)
    n = e3[i2], r += (i2 ? ", " : "") + n + ": " + Dt(this.get(n));
  return r + " }";
};
P.prototype.equals = function(r) {
  return this === r || St(r) && _r(this).equals(_r(r));
};
P.prototype.hashCode = function() {
  return _r(this).hashCode();
};
P.prototype.has = function(r) {
  return this._indices.hasOwnProperty(r);
};
P.prototype.get = function(r, e3) {
  if (!this.has(r))
    return e3;
  var n = this._indices[r], i2 = this._values.get(n);
  return i2 === void 0 ? this._defaultValues[r] : i2;
};
P.prototype.set = function(r, e3) {
  if (this.has(r)) {
    var n = this._values.set(
      this._indices[r],
      e3 === this._defaultValues[r] ? void 0 : e3
    );
    if (n !== this._values && !this.__ownerID)
      return en(this, n);
  }
  return this;
};
P.prototype.remove = function(r) {
  return this.set(r);
};
P.prototype.clear = function() {
  var r = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : en(this, r);
};
P.prototype.wasAltered = function() {
  return this._values.wasAltered();
};
P.prototype.toSeq = function() {
  return _r(this);
};
P.prototype.toJS = function() {
  return cr(this);
};
P.prototype.entries = function() {
  return this.__iterator(G);
};
P.prototype.__iterator = function(r, e3) {
  return _r(this).__iterator(r, e3);
};
P.prototype.__iterate = function(r, e3) {
  return _r(this).__iterate(r, e3);
};
P.prototype.__ensureOwner = function(r) {
  if (r === this.__ownerID)
    return this;
  var e3 = this._values.__ensureOwner(r);
  return r ? en(this, e3, r) : (this.__ownerID = r, this._values = e3, this);
};
P.isRecord = St;
P.getDescriptiveName = nn;
var R = P.prototype;
R[pe] = true;
R[gt] = R.remove;
R.deleteIn = R.removeIn = tr;
R.getIn = ee;
R.hasIn = k2.hasIn;
R.merge = Jr;
R.mergeWith = Vr;
R.mergeIn = nr;
R.mergeDeep = Zr;
R.mergeDeepWith = Xr;
R.mergeDeepIn = ir;
R.setIn = Gt;
R.update = rr;
R.updateIn = er;
R.withMutations = Et;
R.asMutable = Ot;
R.asImmutable = Mt;
R[Vt] = R.entries;
R.toJSON = R.toObject = k2.toObject;
R.inspect = R.toSource = function() {
  return this.toString();
};
function en(t3, r, e3) {
  var n = Object.create(Object.getPrototypeOf(t3));
  return n._values = r, n.__ownerID = e3, n;
}
function nn(t3) {
  return t3.constructor.displayName || t3.constructor.name || "Record";
}
function _r(t3) {
  return gr(t3._keys.map(function(r) {
    return [r, t3.get(r)];
  }));
}
function no(t3, r) {
  try {
    Object.defineProperty(t3, r, {
      get: function() {
        return this.get(r);
      },
      set: function(e3) {
        Qt(this.__ownerID, "Cannot set on an immutable record."), this.set(r, e3);
      }
    });
  } catch {
  }
}
o();
o();
o();
o();
var ci = s(hi(), 1);
function pi(t3, r) {
  let e3 = "", n = 0;
  for (let i2 of r) {
    let o2 = i2[0], a = i2[1];
    i2[0] === -1 && typeof a == "number" ? n += a : o2 === 0 && typeof a == "number" ? e3 += t3.slice(n, n += a) : e3 += a;
  }
  return e3;
}
var _o = (t3, r) => Br(JSON.parse(pi(ae(Br(t3)), r.patch)));
function mo(t3, r) {
  let e3 = _o(t3, r);
  if (oe(e3) !== r.newHash)
    throw new Error("we cant even calculate CodePatch");
  return e3;
}
var oe = (t3) => String(H(ae(Br(t3))));
var Br = (t3 = { i: 0, code: "", html: "", css: "" }) => P({ i: 0, code: "", html: "", css: "" })({
  i: t3.i || 0,
  code: t3.code || "export default ()=> <>Nothing</>",
  html: t3.html || "",
  css: (t3.css || "").split(".css-").filter(
    (r) => r.startsWith("html") || (t3.html || "").indexOf(r.slice(0, 5)) !== -1
  ).join(".css-")
}).toJS();
function ae(t3) {
  let { i: r, code: e3, html: n, css: i2 } = t3;
  return JSON.stringify({ i: r, code: e3, html: n, css: i2 });
}
o();
o();
o();
var ct = class t2 {
  constructor() {
    this._dataLength = 0, this._bufferLength = 0, this._state = new Int32Array(4), this._buffer = new ArrayBuffer(68), this._buffer8 = new Uint8Array(this._buffer, 0, 68), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
  }
  static hashStr(r, e3 = false) {
    return this.onePassHasher.start().appendStr(r).end(e3);
  }
  static hashAsciiStr(r, e3 = false) {
    return this.onePassHasher.start().appendAsciiStr(r).end(e3);
  }
  static _hex(r) {
    let e3 = t2.hexChars, n = t2.hexOut, i2, o2, a, s2;
    for (s2 = 0; s2 < 4; s2 += 1)
      for (o2 = s2 * 8, i2 = r[s2], a = 0; a < 8; a += 2)
        n[o2 + 1 + a] = e3.charAt(i2 & 15), i2 >>>= 4, n[o2 + 0 + a] = e3.charAt(i2 & 15), i2 >>>= 4;
    return n.join("");
  }
  static _md5cycle(r, e3) {
    let n = r[0], i2 = r[1], o2 = r[2], a = r[3];
    n += (i2 & o2 | ~i2 & a) + e3[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + i2 | 0, a += (n & i2 | ~n & o2) + e3[1] - 389564586 | 0, a = (a << 12 | a >>> 20) + n | 0, o2 += (a & n | ~a & i2) + e3[2] + 606105819 | 0, o2 = (o2 << 17 | o2 >>> 15) + a | 0, i2 += (o2 & a | ~o2 & n) + e3[3] - 1044525330 | 0, i2 = (i2 << 22 | i2 >>> 10) + o2 | 0, n += (i2 & o2 | ~i2 & a) + e3[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + i2 | 0, a += (n & i2 | ~n & o2) + e3[5] + 1200080426 | 0, a = (a << 12 | a >>> 20) + n | 0, o2 += (a & n | ~a & i2) + e3[6] - 1473231341 | 0, o2 = (o2 << 17 | o2 >>> 15) + a | 0, i2 += (o2 & a | ~o2 & n) + e3[7] - 45705983 | 0, i2 = (i2 << 22 | i2 >>> 10) + o2 | 0, n += (i2 & o2 | ~i2 & a) + e3[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + i2 | 0, a += (n & i2 | ~n & o2) + e3[9] - 1958414417 | 0, a = (a << 12 | a >>> 20) + n | 0, o2 += (a & n | ~a & i2) + e3[10] - 42063 | 0, o2 = (o2 << 17 | o2 >>> 15) + a | 0, i2 += (o2 & a | ~o2 & n) + e3[11] - 1990404162 | 0, i2 = (i2 << 22 | i2 >>> 10) + o2 | 0, n += (i2 & o2 | ~i2 & a) + e3[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + i2 | 0, a += (n & i2 | ~n & o2) + e3[13] - 40341101 | 0, a = (a << 12 | a >>> 20) + n | 0, o2 += (a & n | ~a & i2) + e3[14] - 1502002290 | 0, o2 = (o2 << 17 | o2 >>> 15) + a | 0, i2 += (o2 & a | ~o2 & n) + e3[15] + 1236535329 | 0, i2 = (i2 << 22 | i2 >>> 10) + o2 | 0, n += (i2 & a | o2 & ~a) + e3[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + i2 | 0, a += (n & o2 | i2 & ~o2) + e3[6] - 1069501632 | 0, a = (a << 9 | a >>> 23) + n | 0, o2 += (a & i2 | n & ~i2) + e3[11] + 643717713 | 0, o2 = (o2 << 14 | o2 >>> 18) + a | 0, i2 += (o2 & n | a & ~n) + e3[0] - 373897302 | 0, i2 = (i2 << 20 | i2 >>> 12) + o2 | 0, n += (i2 & a | o2 & ~a) + e3[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + i2 | 0, a += (n & o2 | i2 & ~o2) + e3[10] + 38016083 | 0, a = (a << 9 | a >>> 23) + n | 0, o2 += (a & i2 | n & ~i2) + e3[15] - 660478335 | 0, o2 = (o2 << 14 | o2 >>> 18) + a | 0, i2 += (o2 & n | a & ~n) + e3[4] - 405537848 | 0, i2 = (i2 << 20 | i2 >>> 12) + o2 | 0, n += (i2 & a | o2 & ~a) + e3[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + i2 | 0, a += (n & o2 | i2 & ~o2) + e3[14] - 1019803690 | 0, a = (a << 9 | a >>> 23) + n | 0, o2 += (a & i2 | n & ~i2) + e3[3] - 187363961 | 0, o2 = (o2 << 14 | o2 >>> 18) + a | 0, i2 += (o2 & n | a & ~n) + e3[8] + 1163531501 | 0, i2 = (i2 << 20 | i2 >>> 12) + o2 | 0, n += (i2 & a | o2 & ~a) + e3[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + i2 | 0, a += (n & o2 | i2 & ~o2) + e3[2] - 51403784 | 0, a = (a << 9 | a >>> 23) + n | 0, o2 += (a & i2 | n & ~i2) + e3[7] + 1735328473 | 0, o2 = (o2 << 14 | o2 >>> 18) + a | 0, i2 += (o2 & n | a & ~n) + e3[12] - 1926607734 | 0, i2 = (i2 << 20 | i2 >>> 12) + o2 | 0, n += (i2 ^ o2 ^ a) + e3[5] - 378558 | 0, n = (n << 4 | n >>> 28) + i2 | 0, a += (n ^ i2 ^ o2) + e3[8] - 2022574463 | 0, a = (a << 11 | a >>> 21) + n | 0, o2 += (a ^ n ^ i2) + e3[11] + 1839030562 | 0, o2 = (o2 << 16 | o2 >>> 16) + a | 0, i2 += (o2 ^ a ^ n) + e3[14] - 35309556 | 0, i2 = (i2 << 23 | i2 >>> 9) + o2 | 0, n += (i2 ^ o2 ^ a) + e3[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + i2 | 0, a += (n ^ i2 ^ o2) + e3[4] + 1272893353 | 0, a = (a << 11 | a >>> 21) + n | 0, o2 += (a ^ n ^ i2) + e3[7] - 155497632 | 0, o2 = (o2 << 16 | o2 >>> 16) + a | 0, i2 += (o2 ^ a ^ n) + e3[10] - 1094730640 | 0, i2 = (i2 << 23 | i2 >>> 9) + o2 | 0, n += (i2 ^ o2 ^ a) + e3[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + i2 | 0, a += (n ^ i2 ^ o2) + e3[0] - 358537222 | 0, a = (a << 11 | a >>> 21) + n | 0, o2 += (a ^ n ^ i2) + e3[3] - 722521979 | 0, o2 = (o2 << 16 | o2 >>> 16) + a | 0, i2 += (o2 ^ a ^ n) + e3[6] + 76029189 | 0, i2 = (i2 << 23 | i2 >>> 9) + o2 | 0, n += (i2 ^ o2 ^ a) + e3[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + i2 | 0, a += (n ^ i2 ^ o2) + e3[12] - 421815835 | 0, a = (a << 11 | a >>> 21) + n | 0, o2 += (a ^ n ^ i2) + e3[15] + 530742520 | 0, o2 = (o2 << 16 | o2 >>> 16) + a | 0, i2 += (o2 ^ a ^ n) + e3[2] - 995338651 | 0, i2 = (i2 << 23 | i2 >>> 9) + o2 | 0, n += (o2 ^ (i2 | ~a)) + e3[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + i2 | 0, a += (i2 ^ (n | ~o2)) + e3[7] + 1126891415 | 0, a = (a << 10 | a >>> 22) + n | 0, o2 += (n ^ (a | ~i2)) + e3[14] - 1416354905 | 0, o2 = (o2 << 15 | o2 >>> 17) + a | 0, i2 += (a ^ (o2 | ~n)) + e3[5] - 57434055 | 0, i2 = (i2 << 21 | i2 >>> 11) + o2 | 0, n += (o2 ^ (i2 | ~a)) + e3[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + i2 | 0, a += (i2 ^ (n | ~o2)) + e3[3] - 1894986606 | 0, a = (a << 10 | a >>> 22) + n | 0, o2 += (n ^ (a | ~i2)) + e3[10] - 1051523 | 0, o2 = (o2 << 15 | o2 >>> 17) + a | 0, i2 += (a ^ (o2 | ~n)) + e3[1] - 2054922799 | 0, i2 = (i2 << 21 | i2 >>> 11) + o2 | 0, n += (o2 ^ (i2 | ~a)) + e3[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + i2 | 0, a += (i2 ^ (n | ~o2)) + e3[15] - 30611744 | 0, a = (a << 10 | a >>> 22) + n | 0, o2 += (n ^ (a | ~i2)) + e3[6] - 1560198380 | 0, o2 = (o2 << 15 | o2 >>> 17) + a | 0, i2 += (a ^ (o2 | ~n)) + e3[13] + 1309151649 | 0, i2 = (i2 << 21 | i2 >>> 11) + o2 | 0, n += (o2 ^ (i2 | ~a)) + e3[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + i2 | 0, a += (i2 ^ (n | ~o2)) + e3[11] - 1120210379 | 0, a = (a << 10 | a >>> 22) + n | 0, o2 += (n ^ (a | ~i2)) + e3[2] + 718787259 | 0, o2 = (o2 << 15 | o2 >>> 17) + a | 0, i2 += (a ^ (o2 | ~n)) + e3[9] - 343485551 | 0, i2 = (i2 << 21 | i2 >>> 11) + o2 | 0, r[0] = n + r[0] | 0, r[1] = i2 + r[1] | 0, r[2] = o2 + r[2] | 0, r[3] = a + r[3] | 0;
  }
  /**
   * Initialise buffer to be hashed
   */
  start() {
    return this._dataLength = 0, this._bufferLength = 0, this._state.set(t2.stateIdentity), this;
  }
  // Char to code point to to array conversion:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
  // #Example.3A_Fixing_charCodeAt_to_handle_non-Basic-Multilingual-Plane_characters_if_their_presence_earlier_in_the_string_is_unknown
  /**
   * Append a UTF-8 string to the hash buffer
   * @param str String to append
   */
  appendStr(r) {
    let e3 = this._buffer8, n = this._buffer32, i2 = this._bufferLength, o2, a;
    for (a = 0; a < r.length; a += 1) {
      if (o2 = r.charCodeAt(a), o2 < 128)
        e3[i2++] = o2;
      else if (o2 < 2048)
        e3[i2++] = (o2 >>> 6) + 192, e3[i2++] = o2 & 63 | 128;
      else if (o2 < 55296 || o2 > 56319)
        e3[i2++] = (o2 >>> 12) + 224, e3[i2++] = o2 >>> 6 & 63 | 128, e3[i2++] = o2 & 63 | 128;
      else {
        if (o2 = (o2 - 55296) * 1024 + (r.charCodeAt(++a) - 56320) + 65536, o2 > 1114111)
          throw new Error("Unicode standard supports code points up to U+10FFFF");
        e3[i2++] = (o2 >>> 18) + 240, e3[i2++] = o2 >>> 12 & 63 | 128, e3[i2++] = o2 >>> 6 & 63 | 128, e3[i2++] = o2 & 63 | 128;
      }
      i2 >= 64 && (this._dataLength += 64, t2._md5cycle(this._state, n), i2 -= 64, n[0] = n[16]);
    }
    return this._bufferLength = i2, this;
  }
  /**
   * Append an ASCII string to the hash buffer
   * @param str String to append
   */
  appendAsciiStr(r) {
    let e3 = this._buffer8, n = this._buffer32, i2 = this._bufferLength, o2, a = 0;
    for (; ; ) {
      for (o2 = Math.min(r.length - a, 64 - i2); o2--; )
        e3[i2++] = r.charCodeAt(a++);
      if (i2 < 64)
        break;
      this._dataLength += 64, t2._md5cycle(this._state, n), i2 = 0;
    }
    return this._bufferLength = i2, this;
  }
  /**
   * Append a byte array to the hash buffer
   * @param input array to append
   */
  appendByteArray(r) {
    let e3 = this._buffer8, n = this._buffer32, i2 = this._bufferLength, o2, a = 0;
    for (; ; ) {
      for (o2 = Math.min(r.length - a, 64 - i2); o2--; )
        e3[i2++] = r[a++];
      if (i2 < 64)
        break;
      this._dataLength += 64, t2._md5cycle(this._state, n), i2 = 0;
    }
    return this._bufferLength = i2, this;
  }
  /**
   * Get the state of the hash buffer
   */
  getState() {
    let r = this._state;
    return {
      buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)),
      buflen: this._bufferLength,
      length: this._dataLength,
      state: [r[0], r[1], r[2], r[3]]
    };
  }
  /**
   * Override the current state of the hash buffer
   * @param state New hash buffer state
   */
  setState(r) {
    let e3 = r.buffer, n = r.state, i2 = this._state, o2;
    for (this._dataLength = r.length, this._bufferLength = r.buflen, i2[0] = n[0], i2[1] = n[1], i2[2] = n[2], i2[3] = n[3], o2 = 0; o2 < e3.length; o2 += 1)
      this._buffer8[o2] = e3.charCodeAt(o2);
  }
  /**
   * Hash the current state of the hash buffer and return the result
   * @param raw Whether to return the value as an `Int32Array`
   */
  end(r = false) {
    let e3 = this._bufferLength, n = this._buffer8, i2 = this._buffer32, o2 = (e3 >> 2) + 1;
    this._dataLength += e3;
    let a = this._dataLength * 8;
    if (n[e3] = 128, n[e3 + 1] = n[e3 + 2] = n[e3 + 3] = 0, i2.set(t2.buffer32Identity.subarray(o2), o2), e3 > 55 && (t2._md5cycle(this._state, i2), i2.set(t2.buffer32Identity)), a <= 4294967295)
      i2[14] = a;
    else {
      let s2 = a.toString(16).match(/(.*?)(.{0,8})$/);
      if (s2 === null)
        return;
      let u = parseInt(s2[2], 16), f = parseInt(s2[1], 16) || 0;
      i2[14] = u, i2[15] = f;
    }
    return t2._md5cycle(this._state, i2), r ? this._state : t2._hex(this._state);
  }
};
ct.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
ct.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
ct.hexChars = "0123456789abcdef";
ct.hexOut = [];
ct.onePassHasher = new ct();
if (ct.hashStr("hello") !== "5d41402abc4b2a76b9719d911017c592")
  throw new Error("Md5 self test failed.");
o();
o();
var _i = {
  0: "k",
  1: "g",
  2: "j",
  3: "k",
  4: "b",
  5: "n",
  6: "o",
  7: "x",
  8: "q",
  9: "z"
};
var ym = (t3) => {
  let r = typeof t3 == "string" ? t3 : JSON.stringify(t3) || "";
  return (ct.hashStr(r).toString().replace(/0/g, "").split("").map((o2) => _i[o2] ? _i[o2] : o2).join("") + "aaaaaaaa").slice(0, 8);
};
var Im = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <link rel="manifest" href="/manifest.json" crossorigin="use-credentials">
  <meta name="sharedArrayBuffer" description="using cross-origin-isolation in the web browser">
  <base href="/">
  <link rel="shortcut icon" type="image/png" href="/assets/favicons/chunk-chunk-fe2f7da4f9ccc2.png">
  <title>Instant React Editor</title>
 
  <style>
    html,
    body {
      overflow: hidden;
      margin: 0;
      height: 100%;
      --webkit-overflow-scrolling: touch;
      overscroll-behavior-x: none;
    }

    q {
      display: none;
    }


    @media screen and (prefers-color-scheme: dark) {
      body {
        background-color: #121212;
        ;
        color: hsl(210, 10%, 62%);
        --text-color-normal: hsl(210, 10%, 62%);
        --text-color-light: hsl(210, 15%, 35%);
        --text-color-richer: hsl(210, 50%, 72%);
        --text-color-highlight: hsl(25, 70%, 45%);
      }
    }


    @media screen and (prefers-color-scheme: light) {
      body {
        background-color: white;
        color: black;
        --text-color-normal: #0a244d;
        --text-color-light: #8cabd9;
      }
    }

    /**reset*/
  </style>
    <!-- <script async src="/workerScripts/superFetch.js"><\/script> -->
</head>
<body>
  <div id="root"></div>
  <script src="/swVersion.js"><\/script>
  <script src="/hydrate.mjs?v=ASSET_HASH" type="module"><\/script>

  <!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "cc7e2ceaa75d4111b26b0ec989795375"}'><\/script><!-- End Cloudflare Web Analytics -->
</body>
</html>`;

// ../code/dist/dist.shasum.js
var dist_shasum_default = `
4e28ba7c654c256813c401a45abd3baec23f5b49
`.trim();

// ../code/dist/cf-workers.mjs
import vt2 from "__STATIC_CONTENT_MANIFEST";
var Vt2 = q((Un2, _t2) => {
  "use strict";
  o();
  function Ne2() {
    this._types = /* @__PURE__ */ Object.create(null), this._extensions = /* @__PURE__ */ Object.create(null);
    for (let t3 = 0; t3 < arguments.length; t3++)
      this.define(arguments[t3]);
    this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);
  }
  Ne2.prototype.define = function(t3, e3) {
    for (let a in t3) {
      let n = t3[a].map(function(i2) {
        return i2.toLowerCase();
      });
      a = a.toLowerCase();
      for (let i2 = 0; i2 < n.length; i2++) {
        let o2 = n[i2];
        if (o2[0] !== "*") {
          if (!e3 && o2 in this._types)
            throw new Error(
              'Attempt to change mapping for "' + o2 + '" extension from "' + this._types[o2] + '" to "' + a + '". Pass `force=true` to allow this, otherwise remove "' + o2 + '" from the list of extensions for "' + a + '".'
            );
          this._types[o2] = a;
        }
      }
      if (e3 || !this._extensions[a]) {
        let i2 = n[0];
        this._extensions[a] = i2[0] !== "*" ? i2 : i2.substr(1);
      }
    }
  };
  Ne2.prototype.getType = function(t3) {
    t3 = String(t3);
    let e3 = t3.replace(/^.*[/\\]/, "").toLowerCase(), a = e3.replace(/^.*\./, "").toLowerCase(), n = e3.length < t3.length;
    return (a.length < e3.length - 1 || !n) && this._types[a] || null;
  };
  Ne2.prototype.getExtension = function(t3) {
    return t3 = /^\s*([^;\s]*)/.test(t3) && RegExp.$1, t3 && this._extensions[t3.toLowerCase()] || null;
  };
  _t2.exports = Ne2;
});
var Nt2 = q((qn2, It2) => {
  "use strict";
  o();
  It2.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
});
var zt2 = q(($n2, Ut2) => {
  "use strict";
  o();
  Ut2.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
});
var Mt2 = q((Hn2, qt2) => {
  "use strict";
  o();
  var Ra = Vt2();
  qt2.exports = new Ra(Nt2(), zt2());
});
var $t2 = q((Z2) => {
  "use strict";
  o();
  Object.defineProperty(Z2, "__esModule", { value: true });
  Z2.InternalError = Z2.NotFoundError = Z2.MethodNotAllowedError = Z2.KVError = void 0;
  var ue2 = class t3 extends Error {
    constructor(e3, a = 500) {
      super(e3), Object.setPrototypeOf(this, new.target.prototype), this.name = t3.name, this.status = a;
    }
  };
  Z2.KVError = ue2;
  var Ze2 = class extends ue2 {
    constructor(e3 = "Not a valid request method", a = 405) {
      super(e3, a);
    }
  };
  Z2.MethodNotAllowedError = Ze2;
  var et = class extends ue2 {
    constructor(e3 = "Not Found", a = 404) {
      super(e3, a);
    }
  };
  Z2.NotFoundError = et;
  var tt2 = class extends ue2 {
    constructor(e3 = "Internal Error in KV Asset Handler", a = 500) {
      super(e3, a);
    }
  };
  Z2.InternalError = tt2;
});
var Lt2 = q((J2) => {
  "use strict";
  o();
  Object.defineProperty(J2, "__esModule", { value: true });
  J2.InternalError = J2.NotFoundError = J2.MethodNotAllowedError = J2.serveSinglePageApp = J2.mapRequestToAsset = J2.getAssetFromKV = void 0;
  var Dt2 = Mt2(), he2 = $t2();
  Object.defineProperty(J2, "MethodNotAllowedError", { enumerable: true, get: function() {
    return he2.MethodNotAllowedError;
  } });
  Object.defineProperty(J2, "NotFoundError", { enumerable: true, get: function() {
    return he2.NotFoundError;
  } });
  Object.defineProperty(J2, "InternalError", { enumerable: true, get: function() {
    return he2.InternalError;
  } });
  var at2 = {
    browserTTL: null,
    edgeTTL: 2 * 60 * 60 * 24,
    bypassCache: false
    // do not bypass Cloudflare's cache
  }, Ht2 = (t3) => typeof t3 == "string" ? JSON.parse(t3) : t3, Pa = {
    ASSET_NAMESPACE: typeof __STATIC_CONTENT < "u" ? __STATIC_CONTENT : void 0,
    ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST < "u" ? Ht2(__STATIC_CONTENT_MANIFEST) : {},
    cacheControl: at2,
    defaultMimeType: "text/plain",
    defaultDocument: "index.html",
    pathIsEncoded: false,
    defaultETag: "strong"
  };
  function nt2(t3) {
    return Object.assign({}, Pa, t3);
  }
  var Ue2 = (t3, e3) => {
    e3 = nt2(e3);
    let a = new URL(t3.url), n = a.pathname;
    return n.endsWith("/") ? n = n.concat(e3.defaultDocument) : Dt2.getType(n) || (n = n.concat("/" + e3.defaultDocument)), a.pathname = n, new Request(a.toString(), t3);
  };
  J2.mapRequestToAsset = Ue2;
  function ja(t3, e3) {
    e3 = nt2(e3), t3 = Ue2(t3, e3);
    let a = new URL(t3.url);
    return a.pathname.endsWith(".html") ? new Request(`${a.origin}/${e3.defaultDocument}`, t3) : t3;
  }
  J2.serveSinglePageApp = ja;
  var Aa = async (t3, e3) => {
    e3 = nt2(e3);
    let a = t3.request, n = e3.ASSET_NAMESPACE, i2 = Ht2(e3.ASSET_MANIFEST);
    if (typeof n > "u")
      throw new he2.InternalError("there is no KV namespace bound to the script");
    let o2 = new URL(a.url).pathname.replace(/^\/+/, ""), s2 = e3.pathIsEncoded, r;
    if (e3.mapRequestToAsset)
      r = e3.mapRequestToAsset(a);
    else if (i2[o2])
      r = a;
    else if (i2[decodeURIComponent(o2)])
      s2 = true, r = a;
    else {
      let f = Ue2(a), k3 = new URL(f.url).pathname.replace(/^\/+/, "");
      i2[decodeURIComponent(k3)] ? (s2 = true, r = f) : r = Ue2(a, e3);
    }
    if (!["GET", "HEAD"].includes(r.method))
      throw new he2.MethodNotAllowedError(`${r.method} is not a valid request method`);
    let h2 = new URL(r.url), x2 = (s2 ? decodeURIComponent(h2.pathname) : h2.pathname).replace(/^\/+/, ""), l2 = caches.default, p = Dt2.getType(x2) || e3.defaultMimeType;
    (p.startsWith("text") || p === "application/javascript") && (p += "; charset=utf-8");
    let d = false;
    typeof i2 < "u" && i2[x2] && (x2 = i2[x2], d = true);
    let m2 = new Request(`${h2.origin}/${x2}`, a), u = (() => {
      switch (typeof e3.cacheControl) {
        case "function":
          return e3.cacheControl(a);
        case "object":
          return e3.cacheControl;
        default:
          return at2;
      }
    })(), b2 = (f = x2, k3 = e3.defaultETag) => {
      if (!f)
        return "";
      switch (k3) {
        case "weak":
          return f.startsWith("W/") ? f : f.startsWith('"') && f.endsWith('"') ? `W/${f}` : `W/"${f}"`;
        case "strong":
          return f.startsWith('W/"') && (f = f.replace("W/", "")), f.endsWith('"') || (f = `"${f}"`), f;
        default:
          return "";
      }
    };
    e3.cacheControl = Object.assign({}, at2, u), (e3.cacheControl.bypassCache || e3.cacheControl.edgeTTL === null || a.method == "HEAD") && (d = false);
    let T2 = typeof e3.cacheControl.browserTTL == "number", g3 = null;
    if (d && (g3 = await l2.match(m2)), g3)
      if (g3.status > 300 && g3.status < 400)
        g3.body && "cancel" in Object.getPrototypeOf(g3.body) && g3.body.cancel(), g3 = new Response(null, g3);
      else {
        let f = {
          headers: new Headers(g3.headers),
          status: 0,
          statusText: ""
        };
        f.headers.set("cf-cache-status", "HIT"), g3.status ? (f.status = g3.status, f.statusText = g3.statusText) : f.headers.has("Content-Range") ? (f.status = 206, f.statusText = "Partial Content") : (f.status = 200, f.statusText = "OK"), g3 = new Response(g3.body, f);
      }
    else {
      let f = await n.get(x2, "arrayBuffer");
      if (f === null)
        throw new he2.NotFoundError(`could not find ${x2} in your content namespace`);
      g3 = new Response(f), d && (g3.headers.set("Accept-Ranges", "bytes"), g3.headers.set("Content-Length", String(f.byteLength)), g3.headers.has("etag") || g3.headers.set("etag", b2(x2)), g3.headers.set("Cache-Control", `max-age=${e3.cacheControl.edgeTTL}`), t3.waitUntil(l2.put(m2, g3.clone())), g3.headers.set("CF-Cache-Status", "MISS"));
    }
    if (g3.headers.set("Content-Type", p), g3.status === 304) {
      let f = b2(g3.headers.get("etag")), k3 = m2.headers.get("if-none-match"), w2 = g3.headers.get("CF-Cache-Status");
      f && (k3 && k3 === f && w2 === "MISS" ? g3.headers.set("CF-Cache-Status", "EXPIRED") : g3.headers.set("CF-Cache-Status", "REVALIDATED"), g3.headers.set("etag", b2(f, "weak")));
    }
    return T2 ? g3.headers.set("Cache-Control", `max-age=${e3.cacheControl.browserTTL}`) : g3.headers.delete("Cache-Control"), g3;
  };
  J2.getAssetFromKV = Aa;
});
o();
o();
var wa = s(Lt2(), 1);
o();
o();
o();
function Wt2(t3) {
  let e3, a, n, i2, o2, s2, r;
  return c(), {
    feed: h2,
    reset: c
  };
  function c() {
    e3 = true, a = "", n = 0, i2 = -1, o2 = void 0, s2 = void 0, r = "";
  }
  function h2(x2) {
    a = a ? a + x2 : x2, e3 && Fa(a) && (a = a.slice(Bt2.length)), e3 = false;
    let l2 = a.length, p = 0, d = false;
    for (; p < l2; ) {
      d && (a[p] === `
` && ++p, d = false);
      let m2 = -1, u = i2, b2;
      for (let T2 = n; m2 < 0 && T2 < l2; ++T2)
        b2 = a[T2], b2 === ":" && u < 0 ? u = T2 - p : b2 === "\r" ? (d = true, m2 = T2 - p) : b2 === `
` && (m2 = T2 - p);
      if (m2 < 0) {
        n = l2 - p, i2 = u;
        break;
      } else
        n = 0, i2 = -1;
      v(a, p, u, m2), p += m2 + 1;
    }
    p === l2 ? a = "" : p > 0 && (a = a.slice(p));
  }
  function v(x2, l2, p, d) {
    if (d === 0) {
      r.length > 0 && (t3({
        type: "event",
        id: o2,
        event: s2 || void 0,
        data: r.slice(0, -1)
        // remove trailing newline
      }), r = "", o2 = void 0), s2 = void 0;
      return;
    }
    let m2 = p < 0, u = x2.slice(l2, l2 + (m2 ? d : p)), b2 = 0;
    m2 ? b2 = d : x2[l2 + p + 1] === " " ? b2 = p + 2 : b2 = p + 1;
    let T2 = l2 + b2, g3 = d - b2, f = x2.slice(T2, T2 + g3).toString();
    if (u === "data")
      r += f ? "".concat(f, `
`) : `
`;
    else if (u === "event")
      s2 = f;
    else if (u === "id" && !f.includes("\0"))
      o2 = f;
    else if (u === "retry") {
      let k3 = parseInt(f, 10);
      Number.isNaN(k3) || t3({
        type: "reconnect-interval",
        value: k3
      });
    }
  }
}
var Bt2 = [239, 187, 191];
function Fa(t3) {
  return Bt2.every((e3, a) => t3.charCodeAt(a) === e3);
}
o();
var Qt2 = (t3, e3 = 21) => (a = e3) => {
  let n = "", i2 = a;
  for (; i2--; )
    n += t3[Math.random() * t3.length | 0];
  return n;
};
function _a(t3) {
  let e3 = new TextDecoder(), a;
  return new TransformStream({
    async start(n) {
      a = Wt2(
        (i2) => {
          if ("data" in i2 && i2.type === "event" && i2.data === "[DONE]" || // Replicate doesn't send [DONE] but does send a 'done' event
          // @see https://replicate.com/docs/streaming
          i2.event === "done") {
            n.terminate();
            return;
          }
          if ("data" in i2) {
            let o2 = t3 ? t3(i2.data) : i2.data;
            o2 && n.enqueue(o2);
          }
        }
      );
    },
    transform(n) {
      a.feed(e3.decode(n));
    }
  });
}
function Jt2(t3) {
  let e3 = new TextEncoder(), a = "", n = t3 || {};
  return new TransformStream({
    async start() {
      n.onStart && await n.onStart();
    },
    async transform(i2, o2) {
      o2.enqueue(e3.encode(i2)), a += i2, n.onToken && await n.onToken(i2);
    },
    async flush() {
      let i2 = Va(n);
      n.onCompletion && await n.onCompletion(a), n.onFinal && !i2 && await n.onFinal(a);
    }
  });
}
function Va(t3) {
  return "experimental_onFunctionCall" in t3;
}
function Ia() {
  let t3 = true;
  return (e3) => (t3 && (e3 = e3.trimStart(), e3 && (t3 = false)), e3);
}
function Na(t3, e3, a) {
  if (!t3.ok)
    if (t3.body) {
      let i2 = t3.body.getReader();
      return new ReadableStream({
        async start(o2) {
          let { done: s2, value: r } = await i2.read();
          if (!s2) {
            let c = new TextDecoder().decode(r);
            o2.error(new Error(`Response error: ${c}`));
          }
        }
      });
    } else
      return new ReadableStream({
        start(i2) {
          i2.error(new Error("Response error: No response body"));
        }
      });
  return (t3.body || Ua()).pipeThrough(_a(e3)).pipeThrough(Jt2(a));
}
function Ua() {
  return new ReadableStream({
    start(t3) {
      t3.close();
    }
  });
}
function za(t3) {
  let e3 = t3[Symbol.asyncIterator]();
  return new ReadableStream({
    async pull(a) {
      let { done: n, value: i2 } = await e3.next();
      n ? a.close() : a.enqueue(i2);
    },
    async cancel(a) {
      var n;
      await ((n = e3.return) == null ? void 0 : n.call(e3, a));
    }
  });
}
var be2 = {
  code: "0",
  name: "text",
  parse: (t3) => {
    if (typeof t3 != "string")
      throw new Error('"text" parts expect a string value.');
    return { type: "text", value: t3 };
  }
};
var ye2 = {
  code: "1",
  name: "function_call",
  parse: (t3) => {
    if (t3 == null || typeof t3 != "object" || !("function_call" in t3) || typeof t3.function_call != "object" || t3.function_call == null || !("name" in t3.function_call) || !("arguments" in t3.function_call) || typeof t3.function_call.name != "string" || typeof t3.function_call.arguments != "string")
      throw new Error(
        '"function_call" parts expect an object with a "function_call" property.'
      );
    return {
      type: "function_call",
      value: t3
    };
  }
};
var Ce2 = {
  code: "2",
  name: "data",
  parse: (t3) => {
    if (!Array.isArray(t3))
      throw new Error('"data" parts expect an array value.');
    return { type: "data", value: t3 };
  }
};
var Se2 = {
  code: "3",
  name: "error",
  parse: (t3) => {
    if (typeof t3 != "string")
      throw new Error('"error" parts expect a string value.');
    return { type: "error", value: t3 };
  }
};
var Oe2 = {
  code: "4",
  name: "assistant_message",
  parse: (t3) => {
    if (t3 == null || typeof t3 != "object" || !("id" in t3) || !("role" in t3) || !("content" in t3) || typeof t3.id != "string" || typeof t3.role != "string" || t3.role !== "assistant" || !Array.isArray(t3.content) || !t3.content.every(
      (e3) => e3 != null && typeof e3 == "object" && "type" in e3 && e3.type === "text" && "text" in e3 && e3.text != null && typeof e3.text == "object" && "value" in e3.text && typeof e3.text.value == "string"
    ))
      throw new Error(
        '"assistant_message" parts expect an object with an "id", "role", and "content" property.'
      );
    return {
      type: "assistant_message",
      value: t3
    };
  }
};
var ke2 = {
  code: "5",
  name: "assistant_control_data",
  parse: (t3) => {
    if (t3 == null || typeof t3 != "object" || !("threadId" in t3) || !("messageId" in t3) || typeof t3.threadId != "string" || typeof t3.messageId != "string")
      throw new Error(
        '"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.'
      );
    return {
      type: "assistant_control_data",
      value: {
        threadId: t3.threadId,
        messageId: t3.messageId
      }
    };
  }
};
var Ee2 = {
  code: "6",
  name: "data_message",
  parse: (t3) => {
    if (t3 == null || typeof t3 != "object" || !("role" in t3) || !("data" in t3) || typeof t3.role != "string" || t3.role !== "data")
      throw new Error(
        '"data_message" parts expect an object with a "role" and "data" property.'
      );
    return {
      type: "data_message",
      value: t3
    };
  }
};
var Gt2 = [
  be2,
  ye2,
  Ce2,
  Se2,
  Oe2,
  ke2,
  Ee2
];
var qa = {
  [be2.code]: be2,
  [ye2.code]: ye2,
  [Ce2.code]: Ce2,
  [Se2.code]: Se2,
  [Oe2.code]: Oe2,
  [ke2.code]: ke2,
  [Ee2.code]: Ee2
};
var ei = {
  [be2.name]: be2.code,
  [ye2.name]: ye2.code,
  [Ce2.name]: Ce2.code,
  [Se2.name]: Se2.code,
  [Oe2.name]: Oe2.code,
  [ke2.name]: ke2.code,
  [Ee2.name]: Ee2.code
};
var Ma = Gt2.map((t3) => t3.code);
var $a = (t3) => {
  let e3 = t3.indexOf(":");
  if (e3 === -1)
    throw new Error("Failed to parse stream string. No separator found.");
  let a = t3.slice(0, e3);
  if (!Ma.includes(a))
    throw new Error(`Failed to parse stream string. Invalid code ${a}.`);
  let n = a, i2 = t3.slice(e3 + 1), o2 = JSON.parse(i2);
  return qa[n].parse(o2);
};
function ze2(t3, e3) {
  let a = Gt2.find((n) => n.name === t3);
  if (!a)
    throw new Error(`Invalid stream part type: ${t3}`);
  return `${a.code}:${JSON.stringify(e3)}
`;
}
function Da(t3) {
  if (!t3)
    return new TransformStream({
      transform: async (n, i2) => {
        i2.enqueue(n);
      }
    });
  let e3 = new TextEncoder(), a = new TextDecoder();
  return new TransformStream({
    transform: async (n, i2) => {
      let o2 = a.decode(n);
      i2.enqueue(e3.encode(ze2("text", o2)));
    }
  });
}
var ai = Qt2(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);
function Ha(t3) {
  let e3 = new TextDecoder();
  return t3 ? function(a) {
    return e3.decode(a, { stream: true }).split(`
`).filter((i2) => i2 !== "").map($a).filter(Boolean);
  } : function(a) {
    return a ? e3.decode(a, { stream: true }) : "";
  };
}
function La() {
  let t3 = Kt2();
  return (e3) => t3(JSON.parse(e3));
}
async function* Wa(t3) {
  let e3 = Kt2();
  for await (let a of t3) {
    let n = e3(a);
    n && (yield n);
  }
}
function Kt2() {
  let t3 = Ia(), e3;
  return (a) => {
    var n, i2, o2, s2, r, c, h2, v, x2, l2;
    return it2(a) && ((o2 = (i2 = (n = a.choices[0]) == null ? void 0 : n.delta) == null ? void 0 : i2.function_call) != null && o2.name) ? (e3 = true, `{"function_call": {"name": "${(r = (s2 = a.choices[0]) == null ? void 0 : s2.delta) == null ? void 0 : r.function_call.name}", "arguments": "`) : it2(a) && ((v = (h2 = (c = a.choices[0]) == null ? void 0 : c.delta) == null ? void 0 : h2.function_call) != null && v.arguments) ? `${a.choices[0].delta.function_call.arguments.replace(/\\/g, "\\\\").replace(/\//g, "\\/").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\f/g, "\\f")}` : e3 && (((x2 = a.choices[0]) == null ? void 0 : x2.finish_reason) === "function_call" || ((l2 = a.choices[0]) == null ? void 0 : l2.finish_reason) === "stop") ? (e3 = false, '"}}') : t3(
      it2(a) && a.choices[0].delta.content ? a.choices[0].delta.content : Ba(a) ? a.choices[0].text : ""
    );
  };
}
var Xt2 = Symbol(
  "internal_openai_fn_messages"
);
function it2(t3) {
  return "choices" in t3 && t3.choices && t3.choices[0] && "delta" in t3.choices[0];
}
function Ba(t3) {
  return "choices" in t3 && t3.choices && t3.choices[0] && "text" in t3.choices[0];
}
function ot2(t3, e3) {
  let a = e3, n;
  if (Symbol.asyncIterator in t3 ? n = za(Wa(t3)).pipeThrough(
    Jt2(
      a != null && a.experimental_onFunctionCall ? {
        ...a,
        onFinal: void 0
      } : {
        ...a
      }
    )
  ) : n = Na(
    t3,
    La(),
    a != null && a.experimental_onFunctionCall ? {
      ...a,
      onFinal: void 0
    } : {
      ...a
    }
  ), a && a.experimental_onFunctionCall) {
    let i2 = Qa(a);
    return n.pipeThrough(i2);
  } else
    return n.pipeThrough(
      Da(a == null ? void 0 : a.experimental_streamData)
    );
}
function Qa(t3) {
  let e3 = new TextEncoder(), a = true, n = "", i2 = "", o2 = false, s2 = t3[Xt2] || [], r = t3 == null ? void 0 : t3.experimental_streamData, c = Ha();
  return new TransformStream({
    async transform(h2, v) {
      let x2 = c(h2);
      if (i2 += x2, a && x2.startsWith('{"function_call":')) {
        o2 = true, n += x2, a = false;
        return;
      }
      if (o2)
        n += x2;
      else {
        v.enqueue(
          r ? e3.encode(ze2("text", x2)) : h2
        );
        return;
      }
    },
    async flush(h2) {
      try {
        if (!a && t3.experimental_onFunctionCall && o2 && t3.experimental_onFunctionCall) {
          o2 = false;
          let x2 = JSON.parse(n), l2 = JSON.parse(x2.function_call.arguments), p = [
            ...s2
          ], d = await t3.experimental_onFunctionCall(
            {
              name: x2.function_call.name,
              arguments: l2
            },
            (T2) => (p = [
              ...s2,
              {
                role: "assistant",
                content: "",
                function_call: x2.function_call
              },
              {
                role: "function",
                name: x2.function_call.name,
                content: JSON.stringify(T2)
              }
            ], p)
          );
          if (d) {
            if (typeof d == "string") {
              h2.enqueue(
                r ? e3.encode(ze2("text", d)) : e3.encode(d)
              );
              return;
            }
          } else {
            h2.enqueue(
              e3.encode(
                r ? ze2(
                  "function_call",
                  // parse to prevent double-encoding:
                  JSON.parse(n)
                ) : n
              )
            );
            return;
          }
          let m2 = {
            ...t3,
            onStart: void 0
          };
          t3.onFinal = void 0;
          let b2 = ot2(d, {
            ...m2,
            [Xt2]: p
          }).getReader();
          for (; ; ) {
            let { done: T2, value: g3 } = await b2.read();
            if (T2)
              break;
            h2.enqueue(g3);
          }
        }
      } finally {
        t3.onFinal && i2 && await t3.onFinal(i2);
      }
    }
  });
}
var ni = new TextDecoder("utf-8");
o();
var A = "https://api.openai.com/v1".replace(/\/+$/, "");
var Xa = typeof fetch > "u" ? void 0 : fetch;
var st2 = class {
  basePath;
  fetch;
  configuration;
  constructor(e3, a = A, n = Xa) {
    this.basePath = a, this.fetch = n, e3 && (this.configuration = e3, this.basePath = e3.basePath || this.basePath);
  }
};
var rt = class extends Error {
  field;
  constructor(e3, a) {
    super(a), this.field = e3, this.name = "RequiredError";
  }
};
var F2 = "https://example.com";
var j3 = function(t3, e3, a) {
  if (a == null)
    throw new rt(e3, `Required parameter ${e3} was null or undefined when calling ${t3}.`);
};
function lt2(t3, e3, a = "") {
  e3 != null && (typeof e3 == "object" ? Array.isArray(e3) ? e3.forEach((n) => lt2(t3, n, a)) : Object.keys(e3).forEach((n) => lt2(t3, e3[n], `${a}${a !== "" ? "." : ""}${n}`)) : t3.has(a) ? t3.append(a, e3) : t3.set(a, e3));
}
var _ = function(t3, ...e3) {
  let a = new URLSearchParams(t3.search);
  lt2(a, e3), t3.search = a.toString();
};
var ee2 = function(t3, e3, a) {
  let n = typeof t3 != "string";
  return (n && a && a.isJsonMime ? a.isJsonMime(e3.headers["Content-Type"]) : n) ? JSON.stringify(t3 !== void 0 ? t3 : {}) : t3 || "";
};
var V2 = function(t3) {
  return t3.pathname + t3.search + t3.hash;
};
var I = function(t3, e3, a, n) {
  return (i2 = e3, o2 = a) => {
    if (typeof i2 > "u")
      throw new Error("You must pass a fetch polyfill if you're running in an environment without a global fetch");
    let s2 = t3.url;
    if (n != null && n.defaultQueryParams) {
      let r = s2.indexOf("?") === -1 ? "?" : "&";
      s2 += r + n.defaultQueryParams;
    }
    return i2(((n == null ? void 0 : n.basePath) || o2) + s2, t3.options);
  };
};
var N2 = typeof fetch > "u" ? void 0 : fetch;
var Ja = function(t3) {
  return {
    /**
     *
     * @summary Immediately cancel a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to cancel
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cancelFineTune: async (e3, a = {}) => {
      j3("cancelFineTune", "fineTuneId", e3);
      let n = "/fine-tunes/{fine_tune_id}/cancel".replace("{fine_tune_id}", encodeURIComponent(String(e3))), i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "POST",
        ...o2,
        ...a
      }, r = {};
      _(i2, {});
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
     * @param {CreateAnswerRequest} createAnswerRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    createAnswer: async (e3, a = {}) => {
      j3("createAnswer", "createAnswerRequest", e3);
      let n = "/answers", i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "POST",
        ...o2,
        ...a
      }, r = {}, c = {};
      r["Content-Type"] = "application/json", _(i2, c);
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, s2.body = ee2(e3, s2, t3), {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Creates a model response for the given chat conversation.
     * @param {CreateChatCompletionRequest} createChatCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createChatCompletion: async (e3, a = {}) => {
      j3("createChatCompletion", "createChatCompletionRequest", e3);
      let n = "/chat/completions", i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "POST",
        ...o2,
        ...a
      }, r = {}, c = {};
      r["Content-Type"] = "application/json", _(i2, c);
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, s2.body = ee2(e3, s2, t3), {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
     * @param {CreateClassificationRequest} createClassificationRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    createClassification: async (e3, a = {}) => {
      j3("createClassification", "createClassificationRequest", e3);
      let n = "/classifications", i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "POST",
        ...o2,
        ...a
      }, r = {}, c = {};
      r["Content-Type"] = "application/json", _(i2, c);
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, s2.body = ee2(e3, s2, t3), {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Creates a completion for the provided prompt and parameters.
     * @param {CreateCompletionRequest} createCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createCompletion: async (e3, a = {}) => {
      j3("createCompletion", "createCompletionRequest", e3);
      let n = "/completions", i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "POST",
        ...o2,
        ...a
      }, r = {}, c = {};
      r["Content-Type"] = "application/json", _(i2, c);
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, s2.body = ee2(e3, s2, t3), {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Creates a new edit for the provided input, instruction, and parameters.
     * @param {CreateEditRequest} createEditRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createEdit: async (e3, a = {}) => {
      j3("createEdit", "createEditRequest", e3);
      let n = "/edits", i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "POST",
        ...o2,
        ...a
      }, r = {}, c = {};
      r["Content-Type"] = "application/json", _(i2, c);
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, s2.body = ee2(e3, s2, t3), {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Creates an embedding vector representing the input text.
     * @param {CreateEmbeddingRequest} createEmbeddingRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createEmbedding: async (e3, a = {}) => {
      j3("createEmbedding", "createEmbeddingRequest", e3);
      let n = "/embeddings", i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "POST",
        ...o2,
        ...a
      }, r = {}, c = {};
      r["Content-Type"] = "application/json", _(i2, c);
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, s2.body = ee2(e3, s2, t3), {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
     * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
     * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createFile: async (e3, a, n = {}) => {
      j3("createFile", "file", e3), j3("createFile", "purpose", a);
      let i2 = "/files", o2 = new URL(i2, F2), s2;
      t3 && (s2 = t3.baseOptions);
      let r = {
        method: "POST",
        ...s2,
        ...n
      }, c = {}, h2 = {}, v = new (t3 && t3.formDataCtor || FormData)();
      e3 !== void 0 && v.append("file", e3), a !== void 0 && v.append("purpose", a), c["Content-Type"] = "multipart/form-data", _(o2, h2);
      let x2 = s2 && s2.headers ? s2.headers : {};
      return r.headers = {
        ...c,
        ...v.getHeaders(),
        ...x2,
        ...n.headers
      }, r.body = v, {
        url: V2(o2),
        options: r
      };
    },
    /**
     *
     * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {CreateFineTuneRequest} createFineTuneRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createFineTune: async (e3, a = {}) => {
      j3("createFineTune", "createFineTuneRequest", e3);
      let n = "/fine-tunes", i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "POST",
        ...o2,
        ...a
      }, r = {}, c = {};
      r["Content-Type"] = "application/json", _(i2, c);
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, s2.body = ee2(e3, s2, t3), {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Creates an image given a prompt.
     * @param {CreateImageRequest} createImageRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createImage: async (e3, a = {}) => {
      j3("createImage", "createImageRequest", e3);
      let n = "/images/generations", i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "POST",
        ...o2,
        ...a
      }, r = {}, c = {};
      r["Content-Type"] = "application/json", _(i2, c);
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, s2.body = ee2(e3, s2, t3), {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Creates an edited or extended image given an original image and a prompt.
     * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
     * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
     * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
     * @param {number} [n] The number of images to generate. Must be between 1 and 10.
     * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
     * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
     * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createImageEdit: async (e3, a, n, i2, o2, s2, r, c = {}) => {
      j3("createImageEdit", "image", e3), j3("createImageEdit", "prompt", a);
      let h2 = "/images/edits", v = new URL(h2, F2), x2;
      t3 && (x2 = t3.baseOptions);
      let l2 = {
        method: "POST",
        ...x2,
        ...c
      }, p = {}, d = {}, m2 = new (t3 && t3.formDataCtor || FormData)();
      e3 !== void 0 && m2.append("image", e3), n !== void 0 && m2.append("mask", n), a !== void 0 && m2.append("prompt", a), i2 !== void 0 && m2.append("n", i2), o2 !== void 0 && m2.append("size", o2), s2 !== void 0 && m2.append("response_format", s2), r !== void 0 && m2.append("user", r), p["Content-Type"] = "multipart/form-data", _(v, d);
      let u = x2 && x2.headers ? x2.headers : {};
      return l2.headers = {
        ...p,
        ...m2.getHeaders(),
        ...u,
        ...c.headers
      }, l2.body = m2, {
        url: V2(v),
        options: l2
      };
    },
    /**
     *
     * @summary Creates a variation of a given image.
     * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
     * @param {number} [n] The number of images to generate. Must be between 1 and 10.
     * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
     * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
     * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createImageVariation: async (e3, a, n, i2, o2, s2 = {}) => {
      j3("createImageVariation", "image", e3);
      let r = "/images/variations", c = new URL(r, F2), h2;
      t3 && (h2 = t3.baseOptions);
      let v = {
        method: "POST",
        ...h2,
        ...s2
      }, x2 = {}, l2 = {}, p = new (t3 && t3.formDataCtor || FormData)();
      e3 !== void 0 && p.append("image", e3), a !== void 0 && p.append("n", a), n !== void 0 && p.append("size", n), i2 !== void 0 && p.append("response_format", i2), o2 !== void 0 && p.append("user", o2), x2["Content-Type"] = "multipart/form-data", _(c, l2);
      let d = h2 && h2.headers ? h2.headers : {};
      return v.headers = {
        ...x2,
        ...p.getHeaders(),
        ...d,
        ...s2.headers
      }, v.body = p, {
        url: V2(c),
        options: v
      };
    },
    /**
     *
     * @summary Classifies if text violates OpenAI\'s Content Policy
     * @param {CreateModerationRequest} createModerationRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createModeration: async (e3, a = {}) => {
      j3("createModeration", "createModerationRequest", e3);
      let n = "/moderations", i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "POST",
        ...o2,
        ...a
      }, r = {}, c = {};
      r["Content-Type"] = "application/json", _(i2, c);
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, s2.body = ee2(e3, s2, t3), {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
     * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
     * @param {CreateSearchRequest} createSearchRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    createSearch: async (e3, a, n = {}) => {
      j3("createSearch", "engineId", e3), j3("createSearch", "createSearchRequest", a);
      let i2 = "/engines/{engine_id}/search".replace("{engine_id}", encodeURIComponent(String(e3))), o2 = new URL(i2, F2), s2;
      t3 && (s2 = t3.baseOptions);
      let r = {
        method: "POST",
        ...s2,
        ...n
      }, c = {}, h2 = {};
      c["Content-Type"] = "application/json", _(o2, h2);
      let v = s2 && s2.headers ? s2.headers : {};
      return r.headers = {
        ...c,
        ...v,
        ...n.headers
      }, r.body = ee2(a, r, t3), {
        url: V2(o2),
        options: r
      };
    },
    /**
     *
     * @summary Transcribes audio into the input language.
     * @param {File} file The audio file object (not file name) to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
     * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
     * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
     * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
     * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
     * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createTranscription: async (e3, a, n, i2, o2, s2, r = {}) => {
      j3("createTranscription", "file", e3), j3("createTranscription", "model", a);
      let c = "/audio/transcriptions", h2 = new URL(c, F2), v;
      t3 && (v = t3.baseOptions);
      let x2 = {
        method: "POST",
        ...v,
        ...r
      }, l2 = {}, p = {}, d = new (t3 && t3.formDataCtor || FormData)();
      e3 !== void 0 && d.append("file", e3), a !== void 0 && d.append("model", a), n !== void 0 && d.append("prompt", n), i2 !== void 0 && d.append("response_format", i2), o2 !== void 0 && d.append("temperature", o2), s2 !== void 0 && d.append("language", s2), l2["Content-Type"] = "multipart/form-data", _(h2, p);
      let m2 = v && v.headers ? v.headers : {};
      return x2.headers = {
        ...l2,
        ...d.getHeaders(),
        ...m2,
        ...r.headers
      }, x2.body = d, {
        url: V2(h2),
        options: x2
      };
    },
    /**
     *
     * @summary Translates audio into into English.
     * @param {File} file The audio file object (not file name) translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
     * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
     * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
     * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
     * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createTranslation: async (e3, a, n, i2, o2, s2 = {}) => {
      j3("createTranslation", "file", e3), j3("createTranslation", "model", a);
      let r = "/audio/translations", c = new URL(r, F2), h2;
      t3 && (h2 = t3.baseOptions);
      let v = {
        method: "POST",
        ...h2,
        ...s2
      }, x2 = {}, l2 = {}, p = new (t3 && t3.formDataCtor || FormData)();
      e3 !== void 0 && p.append("file", e3), a !== void 0 && p.append("model", a), n !== void 0 && p.append("prompt", n), i2 !== void 0 && p.append("response_format", i2), o2 !== void 0 && p.append("temperature", o2), x2["Content-Type"] = "multipart/form-data", _(c, l2);
      let d = h2 && h2.headers ? h2.headers : {};
      return v.headers = {
        ...x2,
        ...p.getHeaders(),
        ...d,
        ...s2.headers
      }, v.body = p, {
        url: V2(c),
        options: v
      };
    },
    /**
     *
     * @summary Delete a file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteFile: async (e3, a = {}) => {
      j3("deleteFile", "fileId", e3);
      let n = "/files/{file_id}".replace("{file_id}", encodeURIComponent(String(e3))), i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "DELETE",
        ...o2,
        ...a
      }, r = {};
      _(i2, {});
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
     * @param {string} model The model to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteModel: async (e3, a = {}) => {
      j3("deleteModel", "model", e3);
      let n = "/models/{model}".replace("{model}", encodeURIComponent(String(e3))), i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "DELETE",
        ...o2,
        ...a
      }, r = {};
      _(i2, {});
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Returns the contents of the specified file
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    downloadFile: async (e3, a = {}) => {
      j3("downloadFile", "fileId", e3);
      let n = "/files/{file_id}/content".replace("{file_id}", encodeURIComponent(String(e3))), i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "GET",
        ...o2,
        ...a
      }, r = {};
      _(i2, {});
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    listEngines: async (e3 = {}) => {
      let a = "/engines", n = new URL(a, F2), i2;
      t3 && (i2 = t3.baseOptions);
      let o2 = {
        method: "GET",
        ...i2,
        ...e3
      }, s2 = {};
      _(n, {});
      let c = i2 && i2.headers ? i2.headers : {};
      return o2.headers = {
        ...s2,
        ...c,
        ...e3.headers
      }, {
        url: V2(n),
        options: o2
      };
    },
    /**
     *
     * @summary Returns a list of files that belong to the user\'s organization.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listFiles: async (e3 = {}) => {
      let a = "/files", n = new URL(a, F2), i2;
      t3 && (i2 = t3.baseOptions);
      let o2 = {
        method: "GET",
        ...i2,
        ...e3
      }, s2 = {};
      _(n, {});
      let c = i2 && i2.headers ? i2.headers : {};
      return o2.headers = {
        ...s2,
        ...c,
        ...e3.headers
      }, {
        url: V2(n),
        options: o2
      };
    },
    /**
     *
     * @summary Get fine-grained status updates for a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to get events for.
     * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listFineTuneEvents: async (e3, a, n = {}) => {
      j3("listFineTuneEvents", "fineTuneId", e3);
      let i2 = "/fine-tunes/{fine_tune_id}/events".replace("{fine_tune_id}", encodeURIComponent(String(e3))), o2 = new URL(i2, F2), s2;
      t3 && (s2 = t3.baseOptions);
      let r = {
        method: "GET",
        ...s2,
        ...n
      }, c = {}, h2 = {};
      a !== void 0 && (h2.stream = a), _(o2, h2);
      let v = s2 && s2.headers ? s2.headers : {};
      return r.headers = {
        ...c,
        ...v,
        ...n.headers
      }, {
        url: V2(o2),
        options: r
      };
    },
    /**
     *
     * @summary List your organization\'s fine-tuning jobs
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listFineTunes: async (e3 = {}) => {
      let a = "/fine-tunes", n = new URL(a, F2), i2;
      t3 && (i2 = t3.baseOptions);
      let o2 = {
        method: "GET",
        ...i2,
        ...e3
      }, s2 = {};
      _(n, {});
      let c = i2 && i2.headers ? i2.headers : {};
      return o2.headers = {
        ...s2,
        ...c,
        ...e3.headers
      }, {
        url: V2(n),
        options: o2
      };
    },
    /**
     *
     * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listModels: async (e3 = {}) => {
      let a = "/models", n = new URL(a, F2), i2;
      t3 && (i2 = t3.baseOptions);
      let o2 = {
        method: "GET",
        ...i2,
        ...e3
      }, s2 = {};
      _(n, {});
      let c = i2 && i2.headers ? i2.headers : {};
      return o2.headers = {
        ...s2,
        ...c,
        ...e3.headers
      }, {
        url: V2(n),
        options: o2
      };
    },
    /**
     *
     * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
     * @param {string} engineId The ID of the engine to use for this request
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    retrieveEngine: async (e3, a = {}) => {
      j3("retrieveEngine", "engineId", e3);
      let n = "/engines/{engine_id}".replace("{engine_id}", encodeURIComponent(String(e3))), i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "GET",
        ...o2,
        ...a
      }, r = {};
      _(i2, {});
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Returns information about a specific file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveFile: async (e3, a = {}) => {
      j3("retrieveFile", "fileId", e3);
      let n = "/files/{file_id}".replace("{file_id}", encodeURIComponent(String(e3))), i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "GET",
        ...o2,
        ...a
      }, r = {};
      _(i2, {});
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {string} fineTuneId The ID of the fine-tune job
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveFineTune: async (e3, a = {}) => {
      j3("retrieveFineTune", "fineTuneId", e3);
      let n = "/fine-tunes/{fine_tune_id}".replace("{fine_tune_id}", encodeURIComponent(String(e3))), i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "GET",
        ...o2,
        ...a
      }, r = {};
      _(i2, {});
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, {
        url: V2(i2),
        options: s2
      };
    },
    /**
     *
     * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
     * @param {string} model The ID of the model to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveModel: async (e3, a = {}) => {
      j3("retrieveModel", "model", e3);
      let n = "/models/{model}".replace("{model}", encodeURIComponent(String(e3))), i2 = new URL(n, F2), o2;
      t3 && (o2 = t3.baseOptions);
      let s2 = {
        method: "GET",
        ...o2,
        ...a
      }, r = {};
      _(i2, {});
      let h2 = o2 && o2.headers ? o2.headers : {};
      return s2.headers = {
        ...r,
        ...h2,
        ...a.headers
      }, {
        url: V2(i2),
        options: s2
      };
    }
  };
};
var U = function(t3) {
  let e3 = Ja(t3);
  return {
    /**
     *
     * @summary Immediately cancel a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to cancel
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async cancelFineTune(a, n) {
      let i2 = await e3.cancelFineTune(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
     * @param {CreateAnswerRequest} createAnswerRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    async createAnswer(a, n) {
      let i2 = await e3.createAnswer(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Creates a model response for the given chat conversation.
     * @param {CreateChatCompletionRequest} createChatCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createChatCompletion(a, n) {
      let i2 = await e3.createChatCompletion(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
     * @param {CreateClassificationRequest} createClassificationRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    async createClassification(a, n) {
      let i2 = await e3.createClassification(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Creates a completion for the provided prompt and parameters.
     * @param {CreateCompletionRequest} createCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createCompletion(a, n) {
      let i2 = await e3.createCompletion(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Creates a new edit for the provided input, instruction, and parameters.
     * @param {CreateEditRequest} createEditRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createEdit(a, n) {
      let i2 = await e3.createEdit(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Creates an embedding vector representing the input text.
     * @param {CreateEmbeddingRequest} createEmbeddingRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createEmbedding(a, n) {
      let i2 = await e3.createEmbedding(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
     * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
     * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createFile(a, n, i2) {
      let o2 = await e3.createFile(a, n, i2);
      return I(o2, N2, A, t3);
    },
    /**
     *
     * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {CreateFineTuneRequest} createFineTuneRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createFineTune(a, n) {
      let i2 = await e3.createFineTune(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Creates an image given a prompt.
     * @param {CreateImageRequest} createImageRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createImage(a, n) {
      let i2 = await e3.createImage(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Creates an edited or extended image given an original image and a prompt.
     * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
     * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
     * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
     * @param {number} [n] The number of images to generate. Must be between 1 and 10.
     * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
     * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
     * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createImageEdit(a, n, i2, o2, s2, r, c, h2) {
      let v = await e3.createImageEdit(a, n, i2, o2, s2, r, c, h2);
      return I(v, N2, A, t3);
    },
    /**
     *
     * @summary Creates a variation of a given image.
     * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
     * @param {number} [n] The number of images to generate. Must be between 1 and 10.
     * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
     * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
     * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createImageVariation(a, n, i2, o2, s2, r) {
      let c = await e3.createImageVariation(a, n, i2, o2, s2, r);
      return I(c, N2, A, t3);
    },
    /**
     *
     * @summary Classifies if text violates OpenAI\'s Content Policy
     * @param {CreateModerationRequest} createModerationRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createModeration(a, n) {
      let i2 = await e3.createModeration(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
     * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
     * @param {CreateSearchRequest} createSearchRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    async createSearch(a, n, i2) {
      let o2 = await e3.createSearch(a, n, i2);
      return I(o2, N2, A, t3);
    },
    /**
     *
     * @summary Transcribes audio into the input language.
     * @param {File} file The audio file object (not file name) to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
     * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
     * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
     * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
     * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
     * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createTranscription(a, n, i2, o2, s2, r, c) {
      let h2 = await e3.createTranscription(a, n, i2, o2, s2, r, c);
      return I(h2, N2, A, t3);
    },
    /**
     *
     * @summary Translates audio into into English.
     * @param {File} file The audio file object (not file name) translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
     * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
     * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
     * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
     * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createTranslation(a, n, i2, o2, s2, r) {
      let c = await e3.createTranslation(a, n, i2, o2, s2, r);
      return I(c, N2, A, t3);
    },
    /**
     *
     * @summary Delete a file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteFile(a, n) {
      let i2 = await e3.deleteFile(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
     * @param {string} model The model to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteModel(a, n) {
      let i2 = await e3.deleteModel(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Returns the contents of the specified file
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async downloadFile(a, n) {
      let i2 = await e3.downloadFile(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    async listEngines(a) {
      let n = await e3.listEngines(a);
      return I(n, N2, A, t3);
    },
    /**
     *
     * @summary Returns a list of files that belong to the user\'s organization.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listFiles(a) {
      let n = await e3.listFiles(a);
      return I(n, N2, A, t3);
    },
    /**
     *
     * @summary Get fine-grained status updates for a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to get events for.
     * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listFineTuneEvents(a, n, i2) {
      let o2 = await e3.listFineTuneEvents(a, n, i2);
      return I(o2, N2, A, t3);
    },
    /**
     *
     * @summary List your organization\'s fine-tuning jobs
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listFineTunes(a) {
      let n = await e3.listFineTunes(a);
      return I(n, N2, A, t3);
    },
    /**
     *
     * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listModels(a) {
      let n = await e3.listModels(a);
      return I(n, N2, A, t3);
    },
    /**
     *
     * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
     * @param {string} engineId The ID of the engine to use for this request
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     */
    async retrieveEngine(a, n) {
      let i2 = await e3.retrieveEngine(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Returns information about a specific file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async retrieveFile(a, n) {
      let i2 = await e3.retrieveFile(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {string} fineTuneId The ID of the fine-tune job
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async retrieveFineTune(a, n) {
      let i2 = await e3.retrieveFineTune(a, n);
      return I(i2, N2, A, t3);
    },
    /**
     *
     * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
     * @param {string} model The ID of the model to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async retrieveModel(a, n) {
      let i2 = await e3.retrieveModel(a, n);
      return I(i2, N2, A, t3);
    }
  };
};
var qe2 = class extends st2 {
  /**
   *
   * @summary Immediately cancel a fine-tune job.
   * @param {string} fineTuneId The ID of the fine-tune job to cancel
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  cancelFineTune(e3, a) {
    return U(this.configuration).cancelFineTune(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
   * @param {CreateAnswerRequest} createAnswerRequest
   * @param {*} [options] Override http request option.
   * @deprecated
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createAnswer(e3, a) {
    return U(this.configuration).createAnswer(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Creates a model response for the given chat conversation.
   * @param {CreateChatCompletionRequest} createChatCompletionRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createChatCompletion(e3, a) {
    return U(this.configuration).createChatCompletion(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
   * @param {CreateClassificationRequest} createClassificationRequest
   * @param {*} [options] Override http request option.
   * @deprecated
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createClassification(e3, a) {
    return U(this.configuration).createClassification(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Creates a completion for the provided prompt and parameters.
   * @param {CreateCompletionRequest} createCompletionRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createCompletion(e3, a) {
    return U(this.configuration).createCompletion(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Creates a new edit for the provided input, instruction, and parameters.
   * @param {CreateEditRequest} createEditRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createEdit(e3, a) {
    return U(this.configuration).createEdit(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Creates an embedding vector representing the input text.
   * @param {CreateEmbeddingRequest} createEmbeddingRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createEmbedding(e3, a) {
    return U(this.configuration).createEmbedding(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
   * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
   * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createFile(e3, a, n) {
    return U(this.configuration).createFile(e3, a, n).then((i2) => i2(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
   * @param {CreateFineTuneRequest} createFineTuneRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createFineTune(e3, a) {
    return U(this.configuration).createFineTune(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Creates an image given a prompt.
   * @param {CreateImageRequest} createImageRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createImage(e3, a) {
    return U(this.configuration).createImage(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Creates an edited or extended image given an original image and a prompt.
   * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
   * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
   * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
   * @param {number} [n] The number of images to generate. Must be between 1 and 10.
   * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
   * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
   * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createImageEdit(e3, a, n, i2, o2, s2, r, c) {
    return U(this.configuration).createImageEdit(e3, a, n, i2, o2, s2, r, c).then((h2) => h2(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Creates a variation of a given image.
   * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
   * @param {number} [n] The number of images to generate. Must be between 1 and 10.
   * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
   * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
   * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createImageVariation(e3, a, n, i2, o2, s2) {
    return U(this.configuration).createImageVariation(e3, a, n, i2, o2, s2).then((r) => r(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Classifies if text violates OpenAI\'s Content Policy
   * @param {CreateModerationRequest} createModerationRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createModeration(e3, a) {
    return U(this.configuration).createModeration(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
   * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
   * @param {CreateSearchRequest} createSearchRequest
   * @param {*} [options] Override http request option.
   * @deprecated
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createSearch(e3, a, n) {
    return U(this.configuration).createSearch(e3, a, n).then((i2) => i2(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Transcribes audio into the input language.
   * @param {File} file The audio file object (not file name) to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
   * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
   * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
   * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
   * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
   * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createTranscription(e3, a, n, i2, o2, s2, r) {
    return U(this.configuration).createTranscription(e3, a, n, i2, o2, s2, r).then((c) => c(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Translates audio into into English.
   * @param {File} file The audio file object (not file name) translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
   * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
   * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
   * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
   * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  createTranslation(e3, a, n, i2, o2, s2) {
    return U(this.configuration).createTranslation(e3, a, n, i2, o2, s2).then((r) => r(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Delete a file.
   * @param {string} fileId The ID of the file to use for this request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  deleteFile(e3, a) {
    return U(this.configuration).deleteFile(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
   * @param {string} model The model to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  deleteModel(e3, a) {
    return U(this.configuration).deleteModel(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Returns the contents of the specified file
   * @param {string} fileId The ID of the file to use for this request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  downloadFile(e3, a) {
    return U(this.configuration).downloadFile(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
   * @param {*} [options] Override http request option.
   * @deprecated
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  listEngines(e3) {
    return U(this.configuration).listEngines(e3).then((a) => a(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Returns a list of files that belong to the user\'s organization.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  listFiles(e3) {
    return U(this.configuration).listFiles(e3).then((a) => a(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Get fine-grained status updates for a fine-tune job.
   * @param {string} fineTuneId The ID of the fine-tune job to get events for.
   * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  listFineTuneEvents(e3, a, n) {
    return U(this.configuration).listFineTuneEvents(e3, a, n).then((i2) => i2(this.fetch, this.basePath));
  }
  /**
   *
   * @summary List your organization\'s fine-tuning jobs
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  listFineTunes(e3) {
    return U(this.configuration).listFineTunes(e3).then((a) => a(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  listModels(e3) {
    return U(this.configuration).listModels(e3).then((a) => a(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
   * @param {string} engineId The ID of the engine to use for this request
   * @param {*} [options] Override http request option.
   * @deprecated
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  retrieveEngine(e3, a) {
    return U(this.configuration).retrieveEngine(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Returns information about a specific file.
   * @param {string} fileId The ID of the file to use for this request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  retrieveFile(e3, a) {
    return U(this.configuration).retrieveFile(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
   * @param {string} fineTuneId The ID of the fine-tune job
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  retrieveFineTune(e3, a) {
    return U(this.configuration).retrieveFineTune(e3, a).then((n) => n(this.fetch, this.basePath));
  }
  /**
   *
   * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
   * @param {string} model The ID of the model to use for this request
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof OpenAIApi
   */
  retrieveModel(e3, a) {
    return U(this.configuration).retrieveModel(e3, a).then((n) => n(this.fetch, this.basePath));
  }
};
function Ga() {
  for (var t3 = "--------------------------", e3 = 0; e3 < 24; e3++)
    t3 += Math.floor(Math.random() * 10).toString(16);
  return t3;
}
var ct2 = class extends FormData {
  _boundary;
  constructor(...e3) {
    super(...e3), this._boundary = Ga();
  }
  getHeaders() {
    var e3 = {
      "content-type": "multipart/form-data; boundary=" + this._boundary
    };
    return e3;
  }
};
var Me2 = class {
  /**
   * parameter for apiKey security
   * @param name security name
   * @memberof Configuration
   */
  apiKey;
  /**
   * OpenAI organization id
   *
   * @type {string}
   * @memberof Configuration
   */
  organization;
  /**
   * parameter for basic security
   *
   * @type {string}
   * @memberof Configuration
   */
  username;
  /**
   * parameter for basic security
   *
   * @type {string}
   * @memberof Configuration
   */
  password;
  /**
   * parameter for oauth2 security
   * @param name security name
   * @param scopes oauth2 scope
   * @memberof Configuration
   */
  accessToken;
  /**
   * override base path
   *
   * @type {string}
   * @memberof Configuration
   */
  basePath;
  /**
   * base options for calls
   *
   * @type {any}
   * @memberof Configuration
   */
  baseOptions;
  /**
   * The FormData constructor that will be used to create multipart form data
   * requests. You can inject this here so that execution environments that
   * do not support the FormData class can still run the generated client.
   *
   * @type {new () => FormData}
   */
  defaultQueryParams;
  formDataCtor;
  constructor(e3 = {}) {
    this.apiKey = e3.apiKey, this.organization = e3.organization, this.username = e3.username, this.password = e3.password, this.accessToken = e3.accessToken, this.basePath = e3.basePath, this.baseOptions = e3.baseOptions, this.defaultQueryParams = e3.defaultQueryParams, this.formDataCtor = e3.formDataCtor, this.baseOptions || (this.baseOptions = {}), this.baseOptions.headers = {
      // "User-Agent": `OpenAI/NodeJS/${packageJson.version}`,
      Authorization: `Bearer ${this.apiKey}`,
      ...this.baseOptions.headers
    }, this.organization && (this.baseOptions.headers["OpenAI-Organization"] = this.organization), this.formDataCtor || (this.formDataCtor = ct2);
  }
  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  isJsonMime(e3) {
    let a = new RegExp("^(application/json|[^;/ 	]+/[^;/ 	]+[+]json)[ 	]*(;.*)?$", "i");
    return e3 !== null && (a.test(e3) || e3.toLowerCase() === "application/json-patch+json");
  }
};
async function pt2(t3, e3, a) {
  t3[0] !== "generate" && t3[0] !== "chat" && new Response("401", { status: 401 });
  let n = new Me2({
    apiKey: "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"
  }), i2 = new qe2(n);
  if (e3.method === "POST") {
    let { messages: o2 } = await e3.json(), s2 = await i2.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: o2
    }), r = ot2(s2);
    return new Response(r);
  }
  return new Response("401", { status: 401 });
}
async function Ka(t3, e3) {
  let n = new URL(t3.url).pathname.slice(1).split("/");
  return pt2(n, t3, e3);
}
var Ya = {};
Ya.fetch = Ka;
o();
o();
var Za = Object.create;
var ca = Object.defineProperty;
var en2 = Object.getOwnPropertyDescriptor;
var tn2 = Object.getOwnPropertyNames;
var an = Object.getPrototypeOf;
var nn2 = Object.prototype.hasOwnProperty;
var on = (t3, e3) => () => (e3 || t3((e3 = { exports: {} }).exports, e3), e3.exports);
var sn = (t3, e3, a, n) => {
  if (e3 && typeof e3 == "object" || typeof e3 == "function")
    for (let i2 of tn2(e3))
      !nn2.call(t3, i2) && i2 !== a && ca(t3, i2, { get: () => e3[i2], enumerable: !(n = en2(e3, i2)) || n.enumerable });
  return t3;
};
var rn2 = (t3, e3, a) => (a = t3 != null ? Za(an(t3)) : {}, sn(e3 || !t3 || !t3.__esModule ? ca(a, "default", { value: t3, enumerable: true }) : a, t3));
var ln2 = on((t3, e3) => {
  (function(a, n) {
    "use strict";
    var i2 = "1.0.37", o2 = "", s2 = "?", r = "function", c = "undefined", h2 = "object", v = "string", x2 = "major", l2 = "model", p = "name", d = "type", m2 = "vendor", u = "version", b2 = "architecture", T2 = "console", g3 = "mobile", f = "tablet", k3 = "smarttv", w2 = "wearable", y = "embedded", q2 = 500, $2 = "Amazon", B2 = "Apple", X2 = "ASUS", D2 = "BlackBerry", L = "Browser", M2 = "Chrome", W2 = "Edge", re2 = "Firefox", ce2 = "Google", bt2 = "Huawei", We2 = "LG", Be2 = "Microsoft", yt2 = "Motorola", Pe2 = "Opera", je2 = "Samsung", Ct2 = "Sharp", Ae2 = "Sony", Qe2 = "Xiaomi", Xe2 = "Zebra", St2 = "Facebook", Ot2 = "Chromium OS", kt2 = "Mac OS", Oa = function(E2, P2) {
      var S2 = {};
      for (var z2 in E2)
        P2[z2] && P2[z2].length % 2 === 0 ? S2[z2] = P2[z2].concat(E2[z2]) : S2[z2] = E2[z2];
      return S2;
    }, Fe2 = function(E2) {
      for (var P2 = {}, S2 = 0; S2 < E2.length; S2++)
        P2[E2[S2].toUpperCase()] = E2[S2];
      return P2;
    }, Et2 = function(E2, P2) {
      return typeof E2 === v ? ge2(P2).indexOf(ge2(E2)) !== -1 : false;
    }, ge2 = function(E2) {
      return E2.toLowerCase();
    }, ka = function(E2) {
      return typeof E2 === v ? E2.replace(/[^\d\.]/g, o2).split(".")[0] : n;
    }, Je2 = function(E2, P2) {
      if (typeof E2 === v)
        return E2 = E2.replace(/^\s\s*/, o2), typeof P2 === c ? E2 : E2.substring(0, q2);
    }, we2 = function(E2, P2) {
      for (var S2 = 0, z2, ie, Y2, R2, C2, ae2; S2 < P2.length && !C2; ) {
        var Ke2 = P2[S2], Pt2 = P2[S2 + 1];
        for (z2 = ie = 0; z2 < Ke2.length && !C2 && Ke2[z2]; )
          if (C2 = Ke2[z2++].exec(E2), C2)
            for (Y2 = 0; Y2 < Pt2.length; Y2++)
              ae2 = C2[++ie], R2 = Pt2[Y2], typeof R2 === h2 && R2.length > 0 ? R2.length === 2 ? typeof R2[1] == r ? this[R2[0]] = R2[1].call(this, ae2) : this[R2[0]] = R2[1] : R2.length === 3 ? typeof R2[1] === r && !(R2[1].exec && R2[1].test) ? this[R2[0]] = ae2 ? R2[1].call(this, ae2, R2[2]) : n : this[R2[0]] = ae2 ? ae2.replace(R2[1], R2[2]) : n : R2.length === 4 && (this[R2[0]] = ae2 ? R2[3].call(this, ae2.replace(R2[1], R2[2])) : n) : this[R2] = ae2 || n;
        S2 += 2;
      }
    }, Ge2 = function(E2, P2) {
      for (var S2 in P2)
        if (typeof P2[S2] === h2 && P2[S2].length > 0) {
          for (var z2 = 0; z2 < P2[S2].length; z2++)
            if (Et2(P2[S2][z2], E2))
              return S2 === s2 ? n : S2;
        } else if (Et2(P2[S2], E2))
          return S2 === s2 ? n : S2;
      return E2;
    }, Ea = { "1.0": "/8", "1.2": "/1", "1.3": "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }, Tt2 = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", "8.1": "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Rt2 = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [u, [p, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [u, [p, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [p, u], [/opios[\/ ]+([\w\.]+)/i], [u, [p, Pe2 + " Mini"]], [/\bopr\/([\w\.]+)/i], [u, [p, Pe2]], [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i], [u, [p, "Baidu"]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [p, u], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [u, [p, "UC" + L]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i, /micromessenger\/([\w\.]+)/i], [u, [p, "WeChat"]], [/konqueror\/([\w\.]+)/i], [u, [p, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [u, [p, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [u, [p, "Yandex"]], [/slbrowser\/([\w\.]+)/i], [u, [p, "Smart Lenovo " + L]], [/(avast|avg)\/([\w\.]+)/i], [[p, /(.+)/, "$1 Secure " + L], u], [/\bfocus\/([\w\.]+)/i], [u, [p, re2 + " Focus"]], [/\bopt\/([\w\.]+)/i], [u, [p, Pe2 + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [u, [p, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [u, [p, "Dolphin"]], [/coast\/([\w\.]+)/i], [u, [p, Pe2 + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [u, [p, "MIUI " + L]], [/fxios\/([-\w\.]+)/i], [u, [p, re2]], [/\bqihu|(qi?ho?o?|360)browser/i], [[p, "360 " + L]], [/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i], [[p, /(.+)/, "$1 " + L], u], [/samsungbrowser\/([\w\.]+)/i], [u, [p, je2 + " Internet"]], [/(comodo_dragon)\/([\w\.]+)/i], [[p, /_/g, " "], u], [/metasr[\/ ]?([\d\.]+)/i], [u, [p, "Sogou Explorer"]], [/(sogou)mo\w+\/([\d\.]+)/i], [[p, "Sogou Mobile"], u], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i], [p, u], [/(lbbrowser)/i, /\[(linkedin)app\]/i], [p], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[p, St2], u], [/(Klarna)\/([\w\.]+)/i, /(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(alipay)client\/([\w\.]+)/i, /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i], [p, u], [/\bgsa\/([\w\.]+) .*safari\//i], [u, [p, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [u, [p, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [u, [p, M2 + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[p, M2 + " WebView"], u], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [u, [p, "Android " + L]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [p, u], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [u, [p, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [u, p], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [p, [u, Ge2, Ea]], [/(webkit|khtml)\/([\w\.]+)/i], [p, u], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[p, "Netscape"], u], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [u, [p, re2 + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [p, u], [/(cobalt)\/([\w\.]+)/i], [p, [u, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[b2, "amd64"]], [/(ia32(?=;))/i], [[b2, ge2]], [/((?:i[346]|x)86)[;\)]/i], [[b2, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[b2, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[b2, "armhf"]], [/windows (ce|mobile); ppc;/i], [[b2, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[b2, /ower/, o2, ge2]], [/(sun4\w)[;\)]/i], [[b2, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[b2, ge2]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [l2, [m2, je2], [d, f]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [l2, [m2, je2], [d, g3]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [l2, [m2, B2], [d, g3]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [l2, [m2, B2], [d, f]], [/(macintosh);/i], [l2, [m2, B2]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [l2, [m2, Ct2], [d, g3]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [l2, [m2, bt2], [d, f]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [l2, [m2, bt2], [d, g3]], [/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[l2, /_/g, " "], [m2, Qe2], [d, g3]], [/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i, /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[l2, /_/g, " "], [m2, Qe2], [d, f]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [l2, [m2, "OPPO"], [d, g3]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [l2, [m2, "Vivo"], [d, g3]], [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i], [l2, [m2, "Realme"], [d, g3]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [l2, [m2, yt2], [d, g3]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [l2, [m2, yt2], [d, f]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [l2, [m2, We2], [d, f]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [l2, [m2, We2], [d, g3]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [l2, [m2, "Lenovo"], [d, f]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[l2, /_/g, " "], [m2, "Nokia"], [d, g3]], [/(pixel c)\b/i], [l2, [m2, ce2], [d, f]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [l2, [m2, ce2], [d, g3]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [l2, [m2, Ae2], [d, g3]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[l2, "Xperia Tablet"], [m2, Ae2], [d, f]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [l2, [m2, "OnePlus"], [d, g3]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [l2, [m2, $2], [d, f]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[l2, /(.+)/g, "Fire Phone $1"], [m2, $2], [d, g3]], [/(playbook);[-\w\),; ]+(rim)/i], [l2, m2, [d, f]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [l2, [m2, D2], [d, g3]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [l2, [m2, X2], [d, f]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [l2, [m2, X2], [d, g3]], [/(nexus 9)/i], [l2, [m2, "HTC"], [d, f]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [m2, [l2, /_/g, " "], [d, g3]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [l2, [m2, "Acer"], [d, f]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [l2, [m2, "Meizu"], [d, g3]], [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i], [l2, [m2, "Ulefone"], [d, g3]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m2, l2, [d, g3]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m2, l2, [d, f]], [/(surface duo)/i], [l2, [m2, Be2], [d, f]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [l2, [m2, "Fairphone"], [d, g3]], [/(u304aa)/i], [l2, [m2, "AT&T"], [d, g3]], [/\bsie-(\w*)/i], [l2, [m2, "Siemens"], [d, g3]], [/\b(rct\w+) b/i], [l2, [m2, "RCA"], [d, f]], [/\b(venue[\d ]{2,7}) b/i], [l2, [m2, "Dell"], [d, f]], [/\b(q(?:mv|ta)\w+) b/i], [l2, [m2, "Verizon"], [d, f]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [l2, [m2, "Barnes & Noble"], [d, f]], [/\b(tm\d{3}\w+) b/i], [l2, [m2, "NuVision"], [d, f]], [/\b(k88) b/i], [l2, [m2, "ZTE"], [d, f]], [/\b(nx\d{3}j) b/i], [l2, [m2, "ZTE"], [d, g3]], [/\b(gen\d{3}) b.+49h/i], [l2, [m2, "Swiss"], [d, g3]], [/\b(zur\d{3}) b/i], [l2, [m2, "Swiss"], [d, f]], [/\b((zeki)?tb.*\b) b/i], [l2, [m2, "Zeki"], [d, f]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m2, "Dragon Touch"], l2, [d, f]], [/\b(ns-?\w{0,9}) b/i], [l2, [m2, "Insignia"], [d, f]], [/\b((nxa|next)-?\w{0,9}) b/i], [l2, [m2, "NextBook"], [d, f]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m2, "Voice"], l2, [d, g3]], [/\b(lvtel\-)?(v1[12]) b/i], [[m2, "LvTel"], l2, [d, g3]], [/\b(ph-1) /i], [l2, [m2, "Essential"], [d, g3]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [l2, [m2, "Envizen"], [d, f]], [/\b(trio[-\w\. ]+) b/i], [l2, [m2, "MachSpeed"], [d, f]], [/\btu_(1491) b/i], [l2, [m2, "Rotor"], [d, f]], [/(shield[\w ]+) b/i], [l2, [m2, "Nvidia"], [d, f]], [/(sprint) (\w+)/i], [m2, l2, [d, g3]], [/(kin\.[onetw]{3})/i], [[l2, /\./g, " "], [m2, Be2], [d, g3]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [l2, [m2, Xe2], [d, f]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [l2, [m2, Xe2], [d, g3]], [/smart-tv.+(samsung)/i], [m2, [d, k3]], [/hbbtv.+maple;(\d+)/i], [[l2, /^/, "SmartTV"], [m2, je2], [d, k3]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m2, We2], [d, k3]], [/(apple) ?tv/i], [m2, [l2, B2 + " TV"], [d, k3]], [/crkey/i], [[l2, M2 + "cast"], [m2, ce2], [d, k3]], [/droid.+aft(\w+)( bui|\))/i], [l2, [m2, $2], [d, k3]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [l2, [m2, Ct2], [d, k3]], [/(bravia[\w ]+)( bui|\))/i], [l2, [m2, Ae2], [d, k3]], [/(mitv-\w{5}) bui/i], [l2, [m2, Qe2], [d, k3]], [/Hbbtv.*(technisat) (.*);/i], [m2, l2, [d, k3]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[m2, Je2], [l2, Je2], [d, k3]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, k3]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m2, l2, [d, T2]], [/droid.+; (shield) bui/i], [l2, [m2, "Nvidia"], [d, T2]], [/(playstation [345portablevi]+)/i], [l2, [m2, Ae2], [d, T2]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [l2, [m2, Be2], [d, T2]], [/((pebble))app/i], [m2, l2, [d, w2]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [l2, [m2, B2], [d, w2]], [/droid.+; (glass) \d/i], [l2, [m2, ce2], [d, w2]], [/droid.+; (wt63?0{2,3})\)/i], [l2, [m2, Xe2], [d, w2]], [/(quest( 2| pro)?)/i], [l2, [m2, St2], [d, w2]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m2, [d, y]], [/(aeobc)\b/i], [l2, [m2, $2], [d, y]], [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i], [l2, [d, g3]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [l2, [d, f]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, f]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, g3]], [/(android[-\w\. ]{0,9});.+buil/i], [l2, [m2, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [u, [p, W2 + "HTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [u, [p, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [p, u], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [u, p]], os: [[/microsoft (windows) (vista|xp)/i], [p, u], [/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i], [p, [u, Ge2, Tt2]], [/windows nt 6\.2; (arm)/i, /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i, /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[u, Ge2, Tt2], [p, "Windows"]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[u, /_/g, "."], [p, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[p, kt2], [u, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [u, p], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [p, u], [/\(bb(10);/i], [u, [p, D2]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [u, [p, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [u, [p, re2 + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [u, [p, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [u, [p, "watchOS"]], [/crkey\/([\d\.]+)/i], [u, [p, M2 + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[p, Ot2], u], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [p, u], [/(sunos) ?([\w\.\d]*)/i], [[p, "Solaris"], u], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [p, u]] }, G2 = function(E2, P2) {
      if (typeof E2 === h2 && (P2 = E2, E2 = n), !(this instanceof G2))
        return new G2(E2, P2).getResult();
      var S2 = typeof a !== c && a.navigator ? a.navigator : n, z2 = E2 || (S2 && S2.userAgent ? S2.userAgent : o2), ie = S2 && S2.userAgentData ? S2.userAgentData : n, Y2 = P2 ? Oa(Rt2, P2) : Rt2, R2 = S2 && S2.userAgent == z2;
      return this.getBrowser = function() {
        var C2 = {};
        return C2[p] = n, C2[u] = n, we2.call(C2, z2, Y2.browser), C2[x2] = ka(C2[u]), R2 && S2 && S2.brave && typeof S2.brave.isBrave == r && (C2[p] = "Brave"), C2;
      }, this.getCPU = function() {
        var C2 = {};
        return C2[b2] = n, we2.call(C2, z2, Y2.cpu), C2;
      }, this.getDevice = function() {
        var C2 = {};
        return C2[m2] = n, C2[l2] = n, C2[d] = n, we2.call(C2, z2, Y2.device), R2 && !C2[d] && ie && ie.mobile && (C2[d] = g3), R2 && C2[l2] == "Macintosh" && S2 && typeof S2.standalone !== c && S2.maxTouchPoints && S2.maxTouchPoints > 2 && (C2[l2] = "iPad", C2[d] = f), C2;
      }, this.getEngine = function() {
        var C2 = {};
        return C2[p] = n, C2[u] = n, we2.call(C2, z2, Y2.engine), C2;
      }, this.getOS = function() {
        var C2 = {};
        return C2[p] = n, C2[u] = n, we2.call(C2, z2, Y2.os), R2 && !C2[p] && ie && ie.platform != "Unknown" && (C2[p] = ie.platform.replace(/chrome os/i, Ot2).replace(/macos/i, kt2)), C2;
      }, this.getResult = function() {
        return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
      }, this.getUA = function() {
        return z2;
      }, this.setUA = function(C2) {
        return z2 = typeof C2 === v && C2.length > q2 ? Je2(C2, q2) : C2, this;
      }, this.setUA(z2), this;
    };
    G2.VERSION = i2, G2.BROWSER = Fe2([p, u, x2]), G2.CPU = Fe2([b2]), G2.DEVICE = Fe2([l2, m2, d, T2, g3, k3, f, w2, y]), G2.ENGINE = G2.OS = Fe2([p, u]), typeof t3 !== c ? (typeof e3 !== c && e3.exports && (t3 = e3.exports = G2), t3.UAParser = G2) : typeof define === r && define.amd ? define(function() {
      return G2;
    }) : typeof a !== c && (a.UAParser = G2);
    var pe2 = typeof a !== c && (a.jQuery || a.Zepto);
    if (pe2 && !pe2.ua) {
      var _e2 = new G2();
      pe2.ua = _e2.getResult(), pe2.ua.get = function() {
        return _e2.getUA();
      }, pe2.ua.set = function(E2) {
        _e2.setUA(E2);
        var P2 = _e2.getResult();
        for (var S2 in P2)
          pe2.ua[S2] = P2[S2];
      };
    }
  })(typeof window == "object" ? window : t3);
});
var pa = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
var He2 = (t3) => {
  if (typeof t3 != "string")
    throw new TypeError("Invalid argument expected string");
  let e3 = t3.match(pa);
  if (!e3)
    throw new Error(`Invalid argument not valid semver ('${t3}' received)`);
  return e3.shift(), e3;
};
var Yt2 = (t3) => t3 === "*" || t3 === "x" || t3 === "X";
var Zt2 = (t3) => {
  let e3 = parseInt(t3, 10);
  return isNaN(e3) ? t3 : e3;
};
var cn2 = (t3, e3) => typeof t3 != typeof e3 ? [String(t3), String(e3)] : [t3, e3];
var pn2 = (t3, e3) => {
  if (Yt2(t3) || Yt2(e3))
    return 0;
  let [a, n] = cn2(Zt2(t3), Zt2(e3));
  return a > n ? 1 : a < n ? -1 : 0;
};
var ve2 = (t3, e3) => {
  for (let a = 0; a < Math.max(t3.length, e3.length); a++) {
    let n = pn2(t3[a] || "0", e3[a] || "0");
    if (n !== 0)
      return n;
  }
  return 0;
};
var da = (t3, e3) => {
  let a = He2(t3), n = He2(e3), i2 = a.pop(), o2 = n.pop(), s2 = ve2(a, n);
  return s2 !== 0 ? s2 : i2 && o2 ? ve2(i2.split("."), o2.split(".")) : i2 || o2 ? i2 ? -1 : 1 : 0;
};
var ma = (t3, e3, a) => {
  dn2(a);
  let n = da(t3, e3);
  return ua[a].includes(n);
};
var ua = { ">": [1], ">=": [0, 1], "=": [0], "<=": [-1, 0], "<": [-1], "!=": [-1, 1] };
var ea = Object.keys(ua);
var dn2 = (t3) => {
  if (typeof t3 != "string")
    throw new TypeError(`Invalid operator type, expected string but got ${typeof t3}`);
  if (ea.indexOf(t3) === -1)
    throw new Error(`Invalid operator, expected one of ${ea.join("|")}`);
};
var De2 = (t3, e3) => {
  if (e3 = e3.replace(/([><=]+)\s+/g, "$1"), e3.includes("||"))
    return e3.split("||").some((u) => De2(t3, u));
  if (e3.includes(" - ")) {
    let [u, b2] = e3.split(" - ", 2);
    return De2(t3, `>=${u} <=${b2}`);
  } else if (e3.includes(" "))
    return e3.trim().replace(/\s{2,}/g, " ").split(" ").every((u) => De2(t3, u));
  let a = e3.match(/^([<>=~^]+)/), n = a ? a[1] : "=";
  if (n !== "^" && n !== "~")
    return ma(t3, e3, n);
  let [i2, o2, s2, , r] = He2(t3), [c, h2, v, , x2] = He2(e3), l2 = [i2, o2, s2], p = [c, h2 ?? "x", v ?? "x"];
  if (x2 && (!r || ve2(l2, p) !== 0 || ve2(r.split("."), x2.split(".")) === -1))
    return false;
  let d = p.findIndex((u) => u !== "0") + 1, m2 = n === "~" ? 2 : d > 1 ? d : 1;
  return !(ve2(l2.slice(0, m2), p.slice(0, m2)) !== 0 || ve2(l2.slice(m2), p.slice(m2)) === -1);
};
var mn2 = (t3) => typeof t3 == "string" && /^[v\d]/.test(t3) && pa.test(t3);
var ta = rn2(ln2(), 1);
var ht = /* @__PURE__ */ new Set(["es2015", "es2016", "es2017", "es2018", "es2019", "es2020", "es2021", "es2022", "esnext", "deno", "denonext", "node"]);
var aa = { ArbitraryModuleNamespaceNames: { Chrome: [90, 0, 0], ES: [2022, 0, 0], Firefox: [87, 0, 0], Node: [16, 0, 0] }, ArraySpread: { Chrome: [46, 0, 0], Deno: [1, 0, 0], Edge: [13, 0, 0], ES: [2015, 0, 0], Firefox: [36, 0, 0], Hermes: [0, 7, 0], IOS: [10, 0, 0], Node: [5, 0, 0], Opera: [33, 0, 0], Safari: [10, 0, 0] }, Arrow: { Chrome: [49, 0, 0], Deno: [1, 0, 0], Edge: [13, 0, 0], ES: [2015, 0, 0], Firefox: [45, 0, 0], IOS: [10, 0, 0], Node: [6, 0, 0], Opera: [36, 0, 0], Safari: [10, 0, 0] }, AsyncAwait: { Chrome: [55, 0, 0], Deno: [1, 0, 0], Edge: [15, 0, 0], ES: [2017, 0, 0], Firefox: [52, 0, 0], IOS: [11, 0, 0], Node: [7, 6, 0], Opera: [42, 0, 0], Safari: [11, 0, 0] }, AsyncGenerator: { Chrome: [63, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2018, 0, 0], Firefox: [57, 0, 0], IOS: [12, 0, 0], Node: [10, 0, 0], Opera: [50, 0, 0], Safari: [12, 0, 0] }, Bigint: { Chrome: [67, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2020, 0, 0], Firefox: [68, 0, 0], Hermes: [0, 12, 0], IOS: [14, 0, 0], Node: [10, 4, 0], Opera: [54, 0, 0], Rhino: [1, 7, 14], Safari: [14, 0, 0] }, Class: { Chrome: [49, 0, 0], Deno: [1, 0, 0], Edge: [13, 0, 0], ES: [2015, 0, 0], Firefox: [45, 0, 0], IOS: [10, 0, 0], Node: [6, 0, 0], Opera: [36, 0, 0], Safari: [10, 0, 0] }, ClassField: { Chrome: [73, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2022, 0, 0], Firefox: [69, 0, 0], IOS: [14, 0, 0], Node: [12, 0, 0], Opera: [60, 0, 0], Safari: [14, 0, 0] }, ClassPrivateAccessor: { Chrome: [84, 0, 0], Deno: [1, 0, 0], Edge: [84, 0, 0], ES: [2022, 0, 0], Firefox: [90, 0, 0], IOS: [15, 0, 0], Node: [14, 6, 0], Opera: [70, 0, 0], Safari: [15, 0, 0] }, ClassPrivateBrandCheck: { Chrome: [91, 0, 0], Deno: [1, 9, 0], Edge: [91, 0, 0], ES: [2022, 0, 0], Firefox: [90, 0, 0], IOS: [15, 0, 0], Node: [16, 4, 0], Opera: [77, 0, 0], Safari: [15, 0, 0] }, ClassPrivateField: { Chrome: [84, 0, 0], Deno: [1, 0, 0], Edge: [84, 0, 0], ES: [2022, 0, 0], Firefox: [90, 0, 0], IOS: [15, 0, 0], Node: [14, 6, 0], Opera: [70, 0, 0], Safari: [14, 1, 0] }, ClassPrivateMethod: { Chrome: [84, 0, 0], Deno: [1, 0, 0], Edge: [84, 0, 0], ES: [2022, 0, 0], Firefox: [90, 0, 0], IOS: [15, 0, 0], Node: [14, 6, 0], Opera: [70, 0, 0], Safari: [15, 0, 0] }, ClassPrivateStaticAccessor: { Chrome: [84, 0, 0], Deno: [1, 0, 0], Edge: [84, 0, 0], ES: [2022, 0, 0], Firefox: [90, 0, 0], IOS: [15, 0, 0], Node: [14, 6, 0], Opera: [70, 0, 0], Safari: [15, 0, 0] }, ClassPrivateStaticField: { Chrome: [74, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2022, 0, 0], Firefox: [90, 0, 0], IOS: [15, 0, 0], Node: [12, 0, 0], Opera: [62, 0, 0], Safari: [14, 1, 0] }, ClassPrivateStaticMethod: { Chrome: [84, 0, 0], Deno: [1, 0, 0], Edge: [84, 0, 0], ES: [2022, 0, 0], Firefox: [90, 0, 0], IOS: [15, 0, 0], Node: [14, 6, 0], Opera: [70, 0, 0], Safari: [15, 0, 0] }, ClassStaticBlocks: { Chrome: [91, 0, 0], Edge: [94, 0, 0], ES: [2022, 0, 0], Firefox: [93, 0, 0], Node: [16, 11, 0], Opera: [80, 0, 0] }, ClassStaticField: { Chrome: [73, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2022, 0, 0], Firefox: [75, 0, 0], IOS: [15, 0, 0], Node: [12, 0, 0], Opera: [60, 0, 0], Safari: [14, 1, 0] }, ConstAndLet: { Chrome: [49, 0, 0], Deno: [1, 0, 0], Edge: [14, 0, 0], ES: [2015, 0, 0], Firefox: [51, 0, 0], IOS: [11, 0, 0], Node: [6, 0, 0], Opera: [36, 0, 0], Safari: [11, 0, 0] }, Decorators: {}, DefaultArgument: { Chrome: [49, 0, 0], Deno: [1, 0, 0], Edge: [14, 0, 0], ES: [2015, 0, 0], Firefox: [53, 0, 0], IOS: [10, 0, 0], Node: [6, 0, 0], Opera: [36, 0, 0], Safari: [10, 0, 0] }, Destructuring: { Chrome: [51, 0, 0], Deno: [1, 0, 0], Edge: [18, 0, 0], ES: [2015, 0, 0], Firefox: [53, 0, 0], Hermes: [0, 7, 0], IOS: [10, 0, 0], Node: [6, 5, 0], Opera: [38, 0, 0], Safari: [10, 0, 0] }, DynamicImport: { Chrome: [63, 0, 0], Edge: [79, 0, 0], ES: [2015, 0, 0], Firefox: [67, 0, 0], IOS: [11, 0, 0], Node: [13, 2, 0], Opera: [50, 0, 0], Safari: [11, 1, 0] }, ExponentOperator: { Chrome: [52, 0, 0], Deno: [1, 0, 0], Edge: [14, 0, 0], ES: [2016, 0, 0], Firefox: [52, 0, 0], Hermes: [0, 7, 0], IOS: [10, 3, 0], Node: [7, 0, 0], Opera: [39, 0, 0], Rhino: [1, 7, 14], Safari: [10, 1, 0] }, ExportStarAs: { Chrome: [72, 0, 0], Edge: [79, 0, 0], ES: [2020, 0, 0], Firefox: [80, 0, 0], Node: [12, 0, 0], Opera: [60, 0, 0] }, ForAwait: { Chrome: [63, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2018, 0, 0], Firefox: [57, 0, 0], IOS: [12, 0, 0], Node: [10, 0, 0], Opera: [50, 0, 0], Safari: [12, 0, 0] }, ForOf: { Chrome: [51, 0, 0], Deno: [1, 0, 0], Edge: [15, 0, 0], ES: [2015, 0, 0], Firefox: [53, 0, 0], Hermes: [0, 7, 0], IOS: [10, 0, 0], Node: [6, 5, 0], Opera: [38, 0, 0], Safari: [10, 0, 0] }, Generator: { Chrome: [50, 0, 0], Deno: [1, 0, 0], Edge: [13, 0, 0], ES: [2015, 0, 0], Firefox: [53, 0, 0], IOS: [10, 0, 0], Node: [6, 0, 0], Opera: [37, 0, 0], Safari: [10, 0, 0] }, Hashbang: { Chrome: [74, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], Firefox: [67, 0, 0], Hermes: [0, 7, 0], IOS: [13, 4, 0], Node: [12, 5, 0], Opera: [62, 0, 0], Safari: [13, 1, 0] }, ImportAssertions: { Chrome: [91, 0, 0], Node: [16, 14, 0] }, ImportMeta: { Chrome: [64, 0, 0], Edge: [79, 0, 0], ES: [2020, 0, 0], Firefox: [62, 0, 0], IOS: [12, 0, 0], Node: [10, 4, 0], Opera: [51, 0, 0], Safari: [11, 1, 0] }, InlineScript: {}, LogicalAssignment: { Chrome: [85, 0, 0], Deno: [1, 2, 0], Edge: [85, 0, 0], ES: [2021, 0, 0], Firefox: [79, 0, 0], Hermes: [0, 7, 0], IOS: [14, 0, 0], Node: [15, 0, 0], Opera: [71, 0, 0], Safari: [14, 0, 0] }, NestedRestBinding: { Chrome: [49, 0, 0], Deno: [1, 0, 0], Edge: [14, 0, 0], ES: [2016, 0, 0], Firefox: [47, 0, 0], Hermes: [0, 7, 0], IOS: [10, 3, 0], Node: [6, 0, 0], Opera: [36, 0, 0], Safari: [10, 1, 0] }, NewTarget: { Chrome: [46, 0, 0], Deno: [1, 0, 0], Edge: [14, 0, 0], ES: [2015, 0, 0], Firefox: [41, 0, 0], Hermes: [0, 7, 0], IOS: [10, 0, 0], Node: [5, 0, 0], Opera: [33, 0, 0], Safari: [10, 0, 0] }, NodeColonPrefixImport: { Node: [14, 13, 1] }, NodeColonPrefixRequire: { Node: [16, 0, 0] }, NullishCoalescing: { Chrome: [80, 0, 0], Deno: [1, 0, 0], Edge: [80, 0, 0], ES: [2020, 0, 0], Firefox: [72, 0, 0], Hermes: [0, 7, 0], IOS: [13, 4, 0], Node: [14, 0, 0], Opera: [67, 0, 0], Safari: [13, 1, 0] }, ObjectAccessors: { Chrome: [5, 0, 0], Deno: [1, 0, 0], Edge: [12, 0, 0], ES: [5, 0, 0], Firefox: [2, 0, 0], Hermes: [0, 7, 0], IE: [9, 0, 0], IOS: [6, 0, 0], Node: [0, 4, 0], Opera: [10, 10, 0], Rhino: [1, 7, 13], Safari: [3, 1, 0] }, ObjectExtensions: { Chrome: [44, 0, 0], Deno: [1, 0, 0], Edge: [12, 0, 0], ES: [2015, 0, 0], Firefox: [34, 0, 0], Hermes: [0, 7, 0], IOS: [10, 0, 0], Node: [4, 0, 0], Opera: [31, 0, 0], Safari: [10, 0, 0] }, ObjectRestSpread: { Chrome: [60, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2018, 0, 0], Firefox: [55, 0, 0], Hermes: [0, 7, 0], IOS: [11, 3, 0], Node: [8, 3, 0], Opera: [47, 0, 0], Safari: [11, 1, 0] }, OptionalCatchBinding: { Chrome: [66, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2019, 0, 0], Firefox: [58, 0, 0], Hermes: [0, 12, 0], IOS: [11, 3, 0], Node: [10, 0, 0], Opera: [53, 0, 0], Safari: [11, 1, 0] }, OptionalChain: { Chrome: [91, 0, 0], Deno: [1, 9, 0], Edge: [91, 0, 0], ES: [2020, 0, 0], Firefox: [74, 0, 0], Hermes: [0, 12, 0], IOS: [13, 4, 0], Node: [16, 1, 0], Opera: [77, 0, 0], Safari: [13, 1, 0] }, RegexpDotAllFlag: { Chrome: [62, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2018, 0, 0], Firefox: [78, 0, 0], Hermes: [0, 7, 0], IOS: [11, 3, 0], Node: [8, 10, 0], Opera: [49, 0, 0], Safari: [11, 1, 0] }, RegexpLookbehindAssertions: { Chrome: [62, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2018, 0, 0], Firefox: [78, 0, 0], Hermes: [0, 7, 0], Node: [8, 10, 0], Opera: [49, 0, 0] }, RegexpMatchIndices: { Chrome: [90, 0, 0], Edge: [90, 0, 0], ES: [2022, 0, 0], Firefox: [88, 0, 0], IOS: [15, 0, 0], Opera: [76, 0, 0], Safari: [15, 0, 0] }, RegexpNamedCaptureGroups: { Chrome: [64, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2018, 0, 0], Firefox: [78, 0, 0], IOS: [11, 3, 0], Node: [10, 0, 0], Opera: [51, 0, 0], Safari: [11, 1, 0] }, RegexpSetNotation: {}, RegexpStickyAndUnicodeFlags: { Chrome: [50, 0, 0], Deno: [1, 0, 0], Edge: [13, 0, 0], ES: [2015, 0, 0], Firefox: [46, 0, 0], Hermes: [0, 7, 0], IOS: [12, 0, 0], Node: [6, 0, 0], Opera: [37, 0, 0], Safari: [12, 0, 0] }, RegexpUnicodePropertyEscapes: { Chrome: [64, 0, 0], Deno: [1, 0, 0], Edge: [79, 0, 0], ES: [2018, 0, 0], Firefox: [78, 0, 0], IOS: [11, 3, 0], Node: [10, 0, 0], Opera: [51, 0, 0], Safari: [11, 1, 0] }, RestArgument: { Chrome: [47, 0, 0], Deno: [1, 0, 0], Edge: [12, 0, 0], ES: [2015, 0, 0], Firefox: [43, 0, 0], IOS: [10, 0, 0], Node: [6, 0, 0], Opera: [34, 0, 0], Safari: [10, 0, 0] }, TemplateLiteral: { Chrome: [41, 0, 0], Deno: [1, 0, 0], Edge: [13, 0, 0], ES: [2015, 0, 0], Firefox: [34, 0, 0], IOS: [9, 0, 0], Node: [10, 0, 0], Opera: [28, 0, 0], Safari: [9, 0, 0] }, TopLevelAwait: { Chrome: [89, 0, 0], Edge: [89, 0, 0], ES: [2022, 0, 0], Firefox: [89, 0, 0], IOS: [15, 0, 0], Node: [14, 8, 0], Opera: [75, 0, 0], Safari: [15, 0, 0] }, TypeofExoticObjectIsObject: { Chrome: [0, 0, 0], Edge: [0, 0, 0], ES: [2020, 0, 0], Firefox: [0, 0, 0], IOS: [0, 0, 0], Node: [0, 0, 0], Opera: [0, 0, 0], Safari: [0, 0, 0] }, UnicodeEscapes: { Chrome: [44, 0, 0], Deno: [1, 0, 0], Edge: [12, 0, 0], ES: [2015, 0, 0], Firefox: [53, 0, 0], Hermes: [0, 7, 0], IOS: [9, 0, 0], Node: [4, 0, 0], Opera: [31, 0, 0], Safari: [9, 0, 0] } };
var ha = (t3, e3) => {
  let a = Object.keys(aa), n = e3.split(".").slice(0, 3).map((i2) => parseInt(i2, 10));
  return n.findIndex((i2) => isNaN(i2)) !== -1 ? [] : (n.length === 1 ? n.push(0, 0) : n.length === 2 && n.push(0), a.filter((i2) => {
    let o2 = aa[i2][t3];
    return o2 ? o2[0] > n[0] || o2[0] === n[0] && o2[1] > n[1] || o2[0] === n[0] && o2[1] === n[1] && o2[2] > n[2] : true;
  }));
};
var un = (t3) => {
  let e3 = (0, ta.default)(t3).browser;
  return e3.name === "HeadlessChrome" ? e3.name = "Chrome" : e3.name === "Safari" && t3.includes("iPhone;") && (e3.name = "iOS"), (0, ta.default)(t3).browser;
};
var hn2 = ["es2022", "es2021", "es2020", "es2019", "es2018", "es2017", "es2016", "es2015"].map((t3) => [t3, ha(t3.slice(0, 2).toUpperCase(), t3.slice(2)).length]);
var fn2 = "1.33.2";
var vn2 = /^\d+\.\d+\.\d+/;
var dt2 = (t3) => {
  if (!t3 || t3.startsWith("curl/"))
    return "esnext";
  if (t3.startsWith("Deno/")) {
    let n = t3.slice(5).match(vn2);
    return n && ma(n[0], fn2, "<") ? "deno" : "denonext";
  }
  if (t3 === "undici" || t3.startsWith("Node/") || t3.startsWith("Bun/"))
    return "node";
  let e3 = un(t3);
  if (!e3.name || !e3.version)
    return "esnext";
  let a = ha(e3.name, e3.version);
  for (let [n, i2] of hn2)
    if (a.length <= i2)
      return n;
  return "esnext";
};
function xn2(t3) {
  let e3 = t3.slice(1).split("/");
  return e3.length >= 2 && e3.some((a) => ht.has(a));
}
var gn2 = /* @__PURE__ */ new Set(["preact", "react", "solid-js", "svelte", "vue", "@vue/reactivity", "@vue/runtime-core", "@vue/runtime-dom", "@vue/shared"]);
var wn2 = /* @__PURE__ */ new Set(["wasm", "css", "less", "sass", "scss", "stylus", "styl", "json", "jsonc", "csv", "xml", "plist", "tmLanguage", "tmTheme", "yml", "yaml", "pdf", "txt", "glsl", "frag", "vert", "md", "mdx", "markdown", "html", "htm", "vue", "svelte", "svg", "png", "jpg", "jpeg", "webp", "gif", "ico", "eot", "ttf", "otf", "woff", "woff2", "m4a", "mp3", "m3a", "ogg", "oga", "wav", "weba", "mp4", "m4v", "ogv", "webm", "zip", "gz", "tar", "tgz"]);
var bn2 = { "@unocss/reset": "tailwind.css", "inter-ui": "inter.css", "normalize.css": "normalize.css", "modern-normalize": "modern-normalize.css", "reset-css": "reset.css" };
var yn2 = { "@types/react@17": "17.0.71", "@types/react@18": "18.2.38", "isomorphic-ws@4": "5.0.0", "resolve@1.22": "1.22.2" };
function fa(t3) {
  if (t3)
    return globalThis.__AS_KV__ ?? (globalThis.__AS_KV__ = { async getWithMetadata(e3, a) {
      let n = await t3.get(e3);
      return n === null ? { value: null, metadata: null } : { value: n.body, metadata: n.customMetadata ?? null };
    }, async put(e3, a, n) {
      await t3.put(e3, a, { customMetadata: n == null ? void 0 : n.metadata });
    } });
}
function mt(t3, e3) {
  for (let [a, n] of Object.entries(yn2))
    if (`${t3}@${e3}`.startsWith(a))
      return n;
  return e3;
}
function Cn2(t3, e3) {
  return e3 !== "" && t3.startsWith(e3) ? t3.slice(e3.length) : t3;
}
function te2(t3, e3, a = false) {
  let n = a ? t3.lastIndexOf(e3) : t3.indexOf(e3);
  return n >= 0 ? [t3.slice(0, n), t3.slice(n + e3.length)] : [t3, ""];
}
function ne(t3, e3, a = 600) {
  let n = Q2();
  return n.set("Location", t3.toString()), e3 === 301 ? n.set("Cache-Control", "public, max-age=31536000, immutable") : n.set("Cache-Control", `public, max-age=${a}`), new Response(null, { status: e3, headers: n });
}
function fe2(t3, e3 = 500) {
  return new Response(t3, { status: e3, headers: Q2() });
}
function na(t3) {
  let e3 = Q2();
  return e3.set("Content-Type", "application/javascript; charset=utf-8"), e3.set("Cache-Control", "private, no-cache, no-store, must-revalidate"), new Response(["/* esm.sh - error */", `throw new Error("[esm.sh] " + "npm: package '${t3}' not found");`, "export default null;"].join(`
`), { status: 404, headers: e3 });
}
function Sn2(t3) {
  if (t3.method === "OPTIONS" && t3.headers.has("Origin")) {
    let e3 = new Headers({ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": t3.headers.get("Access-Control-Request-Method"), "Access-Control-Allow-Headers": t3.headers.get("Access-Control-Request-Headers") });
    return e3.append("Vary", "Origin"), e3.append("Vary", "Access-Control-Request-Method"), e3.append("Vary", "Access-Control-Request-Headers"), new Response(null, { headers: e3 });
  }
}
function Q2() {
  return new Headers({ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*", Vary: "Origin" });
}
function ut2(t3, e3, ...a) {
  for (let n of a)
    e3.has(n) && t3.set(n, e3.get(n));
}
async function On2(t3) {
  let e3 = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(t3));
  return Array.from(new Uint8Array(e3)).map((a) => a.toString(16).padStart(2, "0")).join("");
}
var ia = { "application/javascript": ["js", "mjs"], "application/typescript": ["ts", "mts", "tsx"], "application/wasm": ["wasm"], "application/json": ["json", "map"], "application/jsonc": ["jsonc"], "application/pdf": ["pdf"], "application/xml": ["xml", "plist", "tmLanguage", "tmTheme"], "application/zip": ["zip"], "application/gzip": ["gz"], "application/tar": ["tar"], "application/tar+gzip": ["tar.gz", "tgz"], "text/html": ["html", "htm"], "text/markdown": ["md", "markdown"], "text/mdx": ["mdx"], "text/jsx": ["jsx"], "text/vue": ["vue"], "text/svelte": ["svelte"], "text/css": ["css"], "text/less": ["less"], "text/sass": ["sass", "scss"], "text/stylus": ["stylus", "styl"], "text/csv": ["csv"], "text/yaml": ["yaml", "yml"], "text/plain": ["txt", "glsl"], "font/ttf": ["ttf"], "font/otf": ["otf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "font/collection": ["ttc"], "image/jpeg": ["jpg", "jpeg"], "image/png": ["png"], "image/gif": ["gif"], "image/webp": ["webp"], "image/avif": ["avif"], "image/svg+xml": ["svg", "svgz"], "image/x-icon": ["ico"], "audio/mp4": ["m4a"], "audio/mpeg": ["mp3", "m3a"], "audio/ogg": ["ogg", "oga"], "audio/wav": ["wav"], "audio/webm": ["weba"], "video/mp4": ["mp4", "m4v"], "video/ogg": ["ogv"], "video/webm": ["webm"], "x-shader/x-fragment": ["frag"], "x-shader/x-vertex": ["vert"] };
var va = /* @__PURE__ */ new Map();
for (let t3 in ia)
  for (let e3 of ia[t3])
    va.set(e3, t3);
function Te2(t3) {
  let [e3] = te2(t3, "?"), [, a] = te2(e3, ".", true);
  return a === "gz" && e3.endsWith(".tar.gz") && (a = "tar.gz"), va.get(a) ?? "application/octet-stream";
}
var oa = /^[a-zA-Z0-9][\w\.\-]*$/;
var sa = /^\d+\.\d+\.\d+/;
var ra = /^[a-f0-9]{10,}$/;
var kn2 = /^(v\d+|stable)$/;
var En2 = /^\/(v\d+|stable)\//;
var la = "https://registry.npmjs.org";
var Tn2 = "https://esm.sh";
var se2 = "public, max-age=31536000, immutable";
var ft2 = { get: () => Promise.resolve(null), put: () => Promise.resolve() };
var Rn2 = class {
  cache;
  middleware;
  constructor(t3) {
    this.middleware = t3;
  }
  async fetch(t3, e3, a) {
    let n = Sn2(t3);
    if (n)
      return n;
    let i2 = new URL(t3.url), o2 = t3.headers.get("User-Agent"), s2 = this.cache ?? (this.cache = await caches.open("esm.sh/v135")), r = { cache: s2, url: i2, data: {}, waitUntil: (w2) => a.waitUntil(w2), withCache: async (w2, y) => {
      var L;
      let q2 = t3.method === "HEAD", $2 = ht.has(i2.searchParams.get("target") ?? ""), B2 = new URL(i2), X2 = (y == null ? void 0 : y.varyUA) && !$2;
      if (X2) {
        let M2 = dt2(o2);
        B2.searchParams.set("target", M2), i2.searchParams.set("target", M2);
      }
      for (let M2 of ["x-real-origin", "x-esm-worker-version"]) {
        let W2 = t3.headers.get(M2);
        W2 && B2.searchParams.set(M2, W2);
      }
      let D2 = await s2.match(B2);
      if (D2) {
        if (q2) {
          let { status: M2, headers: W2 } = D2;
          return new Response(null, { status: M2, headers: W2 });
        }
        return D2;
      }
      if (D2 = await w2(), X2) {
        let M2 = new Headers(D2.headers);
        M2.append("Vary", "User-Agent"), D2 = new Response(D2.body, { status: D2.status, headers: M2 });
      }
      if ((L = D2.headers.get("Cache-Control")) != null && L.startsWith("public, max-age=") && a.waitUntil(s2.put(B2, D2.clone())), q2) {
        let { status: M2, headers: W2 } = D2;
        return new Response(null, { status: M2, headers: W2 });
      }
      return D2;
    } };
    Reflect.has(a, "connInfo") && Object.assign(r, Reflect.get(a, "connInfo"));
    let c = decodeURIComponent(i2.pathname), h2 = "v135";
    if ((o2 === "undici" || o2 != null && o2.startsWith("Node/") || o2 != null && o2.startsWith("Deno/") || o2 != null && o2.startsWith("Bun/")) && (c === "/" || /^\/v\d+\/?$/.test(c)))
      return r.withCache(() => K2(t3, e3, r, c, Q2()), { varyUA: true });
    switch (c) {
      case "/error.js":
        return r.withCache(() => K2(t3, e3, r, c + i2.search, Q2()), { varyUA: true });
      case "/status.json":
        return K2(t3, e3, r, c, Q2());
      case "/esma-target":
        return r.withCache(() => {
          let w2 = Q2();
          return w2.set("cache-control", se2), new Response(dt2(o2), { headers: w2 });
        }, { varyUA: true });
    }
    if (this.middleware) {
      let w2 = await this.middleware(t3, e3, r);
      if (w2)
        return w2;
    }
    if (t3.method === "POST" && (c === "/build" || c === "/transform")) {
      let w2 = await t3.text(), y = "esm-build-" + await On2(w2), q2 = Reflect.get(e3, "R2") ?? ft2, $2 = Reflect.get(e3, "KV") ?? fa(q2), { value: B2 } = await $2.getWithMetadata(y, "stream");
      if (B2) {
        let L = Q2();
        return L.set("content-type", "application/json"), L.set("cache-control", "private, no-store, no-cache, must-revalidate"), L.set("X-Content-Source", "esm-worker"), new Response(B2, { headers: L });
      }
      let X2 = await K2(new Request(t3.url, { method: "POST", headers: t3.headers, body: w2 }), e3, r, `${c}${i2.search}`, Q2());
      if (X2.status !== 200)
        return X2;
      let D2 = await X2.arrayBuffer();
      return r.waitUntil($2.put(y, D2)), new Response(D2, { status: X2.status, headers: X2.headers });
    }
    if (t3.method !== "GET" && t3.method !== "HEAD")
      return fe2("Method Not Allowed", 405);
    if (c === "/favicon.ico" || c.startsWith("/.") || c.endsWith(".php"))
      return r.withCache(() => new Response(null, { status: 404, headers: { "cache-control": se2 } }));
    if (c === "/" || c.startsWith("/embed/"))
      return K2(t3, e3, r, `${c}${i2.search}`, Q2());
    if (i2.search.endsWith("/jsx-runtime") || i2.search.endsWith("/jsx-dev-runtime")) {
      let [w2, y] = te2(i2.search, "/", true);
      c = c + "/" + y, i2.search = w2, i2.pathname = c;
    }
    if (/:\d+:\d+$/.test(c) && (c = te2(c, ":")[0]), c.startsWith("/+"))
      return r.withCache(() => $e2(t3, e3, r, c + i2.search), { varyUA: true });
    let v = En2.test(c), x2 = !v && kn2.test(i2.searchParams.get("pin") ?? "");
    if (v) {
      let w2 = c.split("/");
      h2 = w2[1], c = "/" + w2.slice(2).join("/");
    } else
      x2 && (h2 = i2.searchParams.get("pin"));
    if (c === "/server" || c === "/build" || c === "/run" || c === "/hot" || c.startsWith("/hot-plugins/"))
      return !v && !x2 ? ne(new URL(`/${h2}${c}${i2.search}`, i2), 302, 86400) : r.withCache(() => K2(t3, e3, r, `/${h2}${c}${i2.search}`, Q2()), { varyUA: true });
    if (c.startsWith("/hot/")) {
      let w2 = c.slice(5), y = te2(w2, ".", true)[1], q2 = Te2(c), $2 = "";
      switch (y) {
        case "css":
          $2 = ".hot-app{visibility:hidden;}";
          break;
        case "json":
          $2 = "null";
          break;
      }
      return new Response($2, { status: 200, headers: { "Content-Type": q2 } });
    }
    let l2 = c.startsWith("/gh/");
    l2 && (c = "/@" + c.slice(4));
    let p = c.startsWith("/*");
    if (p && (c = "/" + c.slice(2)), v && (c === "/node.ns.d.ts" || c.startsWith("/node_") && c.endsWith(".js") && !c.slice(1).includes("/")))
      return r.withCache(() => $e2(t3, e3, r, `/${h2}${c}${i2.search}`, true), { varyUA: true });
    let d = "", m2 = "", u = "", b2 = "", T2 = "";
    if (c.startsWith("/@")) {
      let [w2, y, ...q2] = decodeURIComponent(c).slice(2).split("/");
      d = "@" + w2, [m2, u] = te2(y, "@"), q2.length > 0 && (b2 = "/" + q2.join("/"));
    } else {
      let [w2, ...y] = decodeURIComponent(c).slice(1).split("/");
      [m2, u] = te2(w2, "@"), y.length > 0 && (b2 = "/" + y.join("/"));
    }
    if (d !== "" && !oa.test(d.slice(1)))
      return fe2(`Invalid scope name '${d}'`, 400);
    if (m2 === "")
      return fe2("Invalid path", 400);
    let g3 = m2.startsWith("~") && ra.test(m2.slice(1));
    if (!g3 && !oa.test(m2))
      return fe2(`Invalid package name '${m2}'`, 400);
    let f = m2;
    if (d && (f = d + "/" + m2, l2 && (f = f.slice(1))), u && ([u, T2] = te2(u, "&"), l2 || (u.startsWith("=") || u.startsWith("v") ? u = u.slice(1) : /^\d+$/.test(u) ? u = "^" + u : /^\d+.\d+$/.test(u) && (u = "~" + u))), g3 && (u = "0.0.0"), l2 && !(u && (ra.test(u) || sa.test(Cn2(u, "v")))))
      return r.withCache(() => K2(t3, e3, r, i2.pathname + i2.search, Q2()));
    if (!l2 && !(u && sa.test(u)))
      return r.withCache(async () => {
        var L;
        let w2 = new Headers();
        e3.NPM_TOKEN && w2.set("Authorization", `Bearer ${e3.NPM_TOKEN}`);
        let y = await fetch(new URL(f, e3.NPM_REGISTRY ?? la), { headers: w2 });
        if (!y.ok)
          return y.status === 404 || y.status === 401 ? na(f) : new Response(y.body, { status: y.status, headers: Q2() });
        let q2 = await y.json(), $2 = "/";
        v && ($2 += h2 + "/"), p && ($2 += "*");
        let B2 = T2 ? "&" + T2 : "", X2 = (L = q2["dist-tags"]) == null ? void 0 : L[u || "latest"];
        if (X2) {
          let M2 = `${$2}${f}@${mt(f, X2)}${B2}${b2}${i2.search}`;
          return ne(new URL(M2, i2), 302);
        }
        let D2 = Object.keys(q2.versions ?? []).filter(mn2).sort(da);
        if (!u) {
          let M2 = D2.filter((W2) => !W2.includes("-")).pop() ?? D2.pop();
          if (M2) {
            let W2 = `${$2}${f}@${mt(f, M2)}${B2}${b2}${i2.search}`;
            return ne(new URL(W2, i2), 302);
          }
        }
        try {
          let M2 = u.includes("-") ? D2 : D2.filter((W2) => !W2.includes("-"));
          for (let W2 = M2.length - 1; W2 >= 0; W2--) {
            let re2 = M2[W2];
            if (De2(re2, u)) {
              let ce2 = `${$2}${f}@${mt(f, re2)}${B2}${b2}${i2.search}`;
              return ne(new URL(ce2, i2), 302);
            }
          }
        } catch {
          return fe2(`Invalid package version '${u}'`);
        }
        return fe2("Could not get the package version");
      });
    if (f.startsWith("@types/") && (b2 === "" || !b2.endsWith(".d.ts")))
      return r.withCache(async () => {
        let w2 = `/${h2}${c}`;
        if (b2 !== "")
          w2 += "~.d.ts";
        else {
          let y = new Headers();
          e3.NPM_TOKEN && y.set("Authorization", `Bearer ${e3.NPM_TOKEN}`);
          let q2 = await fetch(new URL(f, e3.NPM_REGISTRY ?? la), { headers: y });
          if (!q2.ok)
            return q2.status === 404 || q2.status === 401 ? na(f) : new Response(q2.body, { status: q2.status, headers: y });
          let $2 = await q2.json();
          w2 += "/" + ($2.types || $2.typings || $2.main || "index.d.ts");
        }
        return ne(new URL(w2, i2), 301);
      });
    let k3;
    if (!l2 && (k3 = bn2[f]) && b2 === "")
      return ne(new URL(`/${f}@${u}/${k3}`, i2), 301);
    if (i2.searchParams.has("css") && b2 === "") {
      let w2 = `/${h2}`;
      l2 && (w2 += "/gh");
      let y = i2.searchParams.get("target");
      (!y || !ht.has(y)) && (y = dt2(o2));
      let q2 = v || x2;
      return ne(new URL(`${w2}/${f}@${u}/${y}/${m2}.css`, i2), q2 ? 301 : 302, 86400);
    }
    if (v && b2.endsWith(".wasm"))
      return r.withCache(() => K2(t3, e3, r, i2.pathname, Q2()));
    if (!v && b2 !== "") {
      let w2 = te2(b2, ".", true)[1];
      if (b2.endsWith(".d.ts") || b2.endsWith(".d.mts"))
        return ne(new URL("/v135" + i2.pathname, i2), 301);
      if (w2 === "wasm" && i2.searchParams.has("module"))
        return r.withCache(() => K2(t3, e3, r, i2.pathname + "?module", Q2()));
      if (wn2.has(w2))
        return r.withCache(() => {
          let y = `${l2 ? "/gh" : ""}/${f}@${u}${b2}`;
          return Pn2(t3, r, e3, y);
        });
    }
    return T2 && new URLSearchParams(T2).forEach((w2, y) => {
      i2.searchParams.set(y, w2);
    }), i2.hostname === "raw.esm.sh" && i2.searchParams.set("raw", ""), v && (b2.endsWith(".d.ts") || xn2(b2)) ? r.withCache(() => {
      let w2 = `/${h2}`;
      l2 && (w2 += "/gh");
      let y = `${w2}/${f}@${u}${b2}${i2.search}`;
      return $e2(t3, e3, r, y, true);
    }) : r.withCache(() => {
      let w2 = "";
      v ? w2 += `/${h2}` : gn2.has(f) && (w2 += "/v128"), l2 && (w2 += "/gh");
      let y = `${w2}/${p ? "*" : ""}${f}@${u}${b2}${i2.search}`;
      return $e2(t3, e3, r, y);
    }, { varyUA: true });
  }
};
async function K2(t3, e3, a, n, i2) {
  var h2;
  let o2 = new Headers();
  ut2(o2, t3.headers, "Content-Type", "Referer", "User-Agent", "X-Esm-Worker-Version", "X-Forwarded-For", "X-Real-Ip", "X-Real-Origin"), o2.has("X-Esm-Worker-Version") || o2.set("X-Esm-Worker-Version", "v135"), o2.has("X-Real-Origin") || o2.set("X-Real-Origin", a.url.origin), e3.ESM_TOKEN && o2.set("Authorization", `Bearer ${e3.ESM_TOKEN}`);
  let s2 = await fetch(new URL(n, e3.ESM_ORIGIN ?? Tn2), { method: t3.method === "HEAD" ? "GET" : t3.method, body: t3.body, headers: o2, redirect: "manual" }), r = await s2.arrayBuffer();
  if (!s2.ok) {
    if (s2.status === 500 && ((h2 = s2.headers.get("Content-Type")) != null && h2.startsWith("text/html")))
      return new Response("Bad Gateway", { status: 502, headers: i2 });
    if (s2.status === 301 || s2.status === 302)
      return ne(s2.headers.get("Location"), s2.status);
    if (s2.headers.has("Cache-Control"))
      i2.set("Cache-Control", s2.headers.get("Cache-Control"));
    else if (s2.status === 400)
      i2.set("Cache-Control", se2);
    else if (s2.status === 404) {
      let v = new TextDecoder().decode(r);
      /package .+ not found/.test(v) || i2.set("Cache-Control", se2);
    }
    return ut2(i2, s2.headers, "Content-Type"), new Response(r, { status: s2.status, headers: i2 });
  }
  ut2(i2, s2.headers, "Cache-Control", "Content-Type", "Content-Length", "X-Esm-Id", "X-Typescript-Types");
  let c = [];
  for (let v of ["X-Esm-Id", "X-Typescript-Types"])
    i2.has(v) && c.push(v);
  return c.length > 0 && i2.set("Access-Control-Expose-Headers", c.join(", ")), new Response(r, { headers: i2 });
}
async function $e2(t3, e3, a, n, i2) {
  var g3;
  let o2 = n.slice(1);
  o2.startsWith("stable/") ? o2 = "v128/" + o2.slice(7) : o2.startsWith("+") && (o2 = "modules/" + o2);
  let s2 = Q2(), [r] = te2(n, "?", true), c = Reflect.get(e3, "R2") ?? ft2, h2 = Reflect.get(e3, "KV") ?? fa(c), v = t3.headers.has("X-Real-Origin"), x2 = !(a.url.searchParams.has("raw") || r.endsWith(".d.ts") || r.endsWith(".d.mts") || r.endsWith(".map"));
  if (!v)
    if (x2) {
      let { value: f, metadata: k3 } = await h2.getWithMetadata(o2, "stream");
      if (f && k3) {
        let w2 = f;
        i2 && typeof DecompressionStream < "u" && (w2 = w2.pipeThrough(new DecompressionStream("gzip"))), s2.set("Content-Type", k3.contentType), s2.set("Cache-Control", se2);
        let y = [];
        return k3.buildId && (s2.set("X-Esm-Id", k3.buildId), y.push("X-Esm-Id")), k3.dts && (s2.set("X-TypeScript-Types", k3.dts), y.push("X-TypeScript-Types")), y.length > 0 && s2.set("Access-Control-Expose-Headers", y.join(", ")), s2.set("X-Content-Source", "esm-worker"), new Response(w2, { headers: s2 });
      }
    } else {
      let f = await c.get(o2);
      if (f) {
        let k3 = ((g3 = f.httpMetadata) == null ? void 0 : g3.contentType) || Te2(n);
        return s2.set("Content-Type", k3), s2.set("Cache-Control", se2), s2.set("X-Content-Source", "esm-worker"), new Response(f.body, { headers: s2 });
      }
    }
  let l2 = await K2(t3, e3, a, n, s2);
  if (!l2.ok)
    return l2;
  let p = await l2.arrayBuffer(), d = l2.headers.get("Content-Type") || Te2(n), m2 = l2.headers.get("Cache-Control"), u = l2.headers.get("X-Esm-Id"), b2 = l2.headers.get("X-TypeScript-Types"), T2 = [];
  if (s2.set("Content-Type", d), m2 && s2.set("Cache-Control", m2), u && (s2.set("X-Esm-Id", u), T2.push("X-Esm-Id")), b2 && (s2.set("X-TypeScript-Types", b2), T2.push("X-TypeScript-Types")), T2.length > 0 && s2.set("Access-Control-Expose-Headers", T2.join(", ")), s2.set("X-Content-Source", "origin"), !v && (m2 == null ? void 0 : m2.includes("immutable")))
    if (!x2)
      a.waitUntil(c.put(o2, p.slice(0), { httpMetadata: { contentType: d } }));
    else {
      let f = p.slice(0);
      i2 && typeof CompressionStream < "u" && (f = new Response(f).body.pipeThrough(new CompressionStream("gzip"))), a.waitUntil(h2.put(o2, f, { metadata: { contentType: d, dts: b2, buildId: u } }));
    }
  return new Response(p, { headers: s2 });
}
async function Pn2(t3, e3, a, n) {
  var c;
  let i2 = Q2(), o2 = Reflect.get(a, "R2") ?? ft2, s2 = await o2.get(n.slice(1));
  if (s2)
    return i2.set("Content-Type", ((c = s2.httpMetadata) == null ? void 0 : c.contentType) || Te2(n)), i2.set("Cache-Control", se2), i2.set("X-Content-Source", "esm-worker"), new Response(s2.body, { headers: i2 });
  let r = await K2(t3, a, e3, n, i2);
  if (r.ok) {
    let h2 = r.headers.get("content-type") || Te2(n), v = await r.arrayBuffer();
    return e3.waitUntil(o2.put(n.slice(1), v.slice(0), { httpMetadata: { contentType: h2 } })), i2.set("Content-Type", h2), i2.set("Cache-Control", se2), i2.set("X-Content-Source", "origin"), new Response(v, { headers: i2 });
  }
  return r;
}
function xa(t3) {
  return new Rn2(t3);
}
var ga = xa();
o();
async function xe2(t3, e3) {
  try {
    return await e3();
  } catch (a) {
    if (t3.headers.get("Upgrade") === "websocket") {
      let n = "";
      a instanceof Error && (n = a.stack, console.log({ error: a.stack, message: a.message }));
      let i2 = new WebSocketPair();
      return i2[1].accept(), i2[1].send(JSON.stringify({ error: n })), i2[1].close(1011, "Uncaught exception during session setup"), new Response(null, { status: 101, webSocket: i2[0] });
    } else {
      let n = "We have no idea what happened";
      return a instanceof Error && (n = a.stack || n, console.log({ error: a.stack, message: a.message })), new Response(n, { status: 500 });
    }
  }
}
o();
var Re2 = JSON.parse(vt2);
function jn2(t3) {
  let e3 = /[.]{1}[a-f0-9]{10}[.]+/gm;
  return t3.indexOf("chunk-") !== -1 || e3.test(t3);
}
async function Le2(t3, e3, a) {
  switch (t3[0]) {
    case "generate":
    case "chat":
      return pt2(t3, e3, a);
    case "room": {
      if (!t3[1])
        if (e3.method === "POST") {
          let r = a.CODE.newUniqueId();
          return new Response(r.toString(), {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cross-Origin-Embedder-Policy": "require-corp"
            }
          });
        } else
          return new Response("Method not allowed", { status: 405 });
      let n = t3[1].replace(".tsx", ""), i2;
      if (n.match(/^[0-9a-f]{64}$/))
        i2 = a.CODE.idFromString(n);
      else if (n.length <= 32)
        i2 = a.CODE.idFromName(n);
      else
        return new Response("Name too long", { status: 404 });
      let o2 = a.CODE.get(i2), s2 = new URL(e3.url);
      return s2.pathname = "/" + t3.slice(2).join("/"), e3.headers.get("Sec-Fetch-Dest") === "script" && (s2.pathname += "/index.js"), s2.searchParams.append("room", n), o2.fetch(new Request(s2.toString(), e3));
    }
    default:
      return new Response("Not found", { status: 404 });
  }
}
function An2(t3) {
  let e3 = new URL(`/${t3}`, "https://example.com").pathname.slice(1), a = e3.split("/"), n = a.pop() || a.pop();
  return !n || n && !n.includes(".") ? false : !!Re2[e3];
}
async function Fn2(t3, e3, a, n) {
  let i2 = new URL(e3.url), o2 = new URL(t3.join("/"), i2.origin), s2 = new Request(e3.url), c = await (await caches.open(dist_shasum_default)).match(s2);
  if (c && c.ok && !c.bodyUsed && c.status === 200)
    return c;
  switch (t3[0]) {
    case "ping":
      return new Response("ping" + Math.random(), {
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
          "Content-Encoding": "gzip",
          "Cache-Control": "no-cache"
        }
      });
    case "websocket": {
      if (e3.headers.get("Upgrade") != "websocket")
        return new Response("expected websocket", { status: 400 });
      let h2 = new WebSocketPair();
      return h2[1].accept(), new Response(null, { status: 101, webSocket: h2[0] });
    }
    case "files.json":
      return new Response(JSON.stringify({ ...Re2, ASSET_HASH: dist_shasum_default }), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Content-Encoding": "gzip",
          "Cache-Control": "no-cache",
          ASSET_HASH: dist_shasum_default
        }
      });
    case "swVersion.mjs":
      return new Response(
        `export const swVersion = "${dist_shasum_default}";`,
        {
          headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Cache-Control": "no-cache",
            "Content-Encoding": "gzip"
          }
        }
      );
    case "swVersion.js":
      return new Response(
        `self.swVersion = "${dist_shasum_default}"; self.files=${JSON.stringify(Re2)}; `,
        {
          headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Cache-Control": "no-cache",
            "Content-Encoding": "gzip"
          }
        }
      );
    case "importMap.json":
      return new Response(JSON.stringify(e2), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Cache-Control": "no-cache",
          "Content-Encoding": "gzip",
          ASSET_HASH: dist_shasum_default
        }
      });
    case "api":
      return Le2(t3.slice(1), e3, a);
    case "ata":
      return Le2(t3.slice(1), e3, a);
    case "ipns":
    case "ipfs": {
      let h2 = new URL(e3.url, "https://cloudflare-ipfs.com"), v = new URL(h2.pathname, "https://cloudflare-ipfs.com"), x2 = await fetch(v.toString());
      if (!x2.ok)
        return x2;
      let l2 = new URL(h2.pathname, "https://ipfs.io");
      return await fetch(l2.toString());
    }
    case "live": {
      if (e3.url.endsWith("index.mjs")) {
        if (e3.method === "PUT") {
          let v = e3.url;
          return await a.R2.put(v, e3.body), new Response(`Put ${v} successfully!`);
        } else if (e3.method === "GET") {
          let v = e3.url, x2 = await a.R2.get(v);
          if (!x2) {
            let p = [...t3.slice(1)].map((d) => d.replace(/\.mjs$/, ".js"));
            return Le2(
              ["room", ...p],
              e3,
              a
            );
          }
          let l2 = new Headers();
          return x2.writeHttpMetadata(l2), l2.set("etag", x2.httpEtag), l2.set("Cache-Control", "public, max-age=31536000"), l2.set("Access-Control-Allow-Origin", "*"), l2.set("Cross-Origin-Embedder-Policy", "require-corp"), l2.set("Content-Type", "application/javascript; charset=UTF-8"), new Response(x2.body, {
            headers: l2
          });
        }
      }
      let h2 = [...t3.slice(1)];
      return Le2(
        ["room", ...h2],
        e3,
        a
      ).catch(
        (v) => new Response("Error," + (v == null ? void 0 : v.message), {
          status: 500,
          statusText: v == null ? void 0 : v.message
        })
      );
    }
    default:
      {
        if (!An2(t3.join("/"))) {
          let v = ga.fetch(e3, a, n), x2 = await fetch(
            ["https://unpkg.com", ...t3].join("/")
          );
          if (x2.ok)
            return new Response(await x2.blob(), {
              headers: x2.headers
            });
          let l2 = await v;
          if (!l2.ok)
            return l2;
          let p = new Headers(l2.headers);
          e3.url.indexOf(".wasm") !== -1 && p.append("Content-Type", "application/wasm"), p.append("Cross-Origin-Embedder-Policy", "require-corp");
          let d = p.get("Content-type");
          if (e3.url.indexOf(".wasm") === -1 && !e3.url.endsWith(".map") && e3.url.indexOf(".worker") === -1 && d && d.indexOf("charset"))
            try {
              return new Response(
                x(await l2.text(), i2.origin),
                {
                  ...l2,
                  headers: p
                }
              );
            } catch {
              return new Response(l2.body, { ...l2, headers: p });
            }
          return new Response(l2.body, { ...l2, headers: p });
        }
        let h2 = o2.pathname.slice(0, 7) === "/assets/" ? o2.pathname.slice(8) : o2.pathname.slice(1);
        if (Re2[h2]) {
          let v = await (0, wa.getAssetFromKV)(
            {
              request: e3,
              waitUntil(l2) {
                return n.waitUntil(l2);
              }
            },
            {
              ASSET_NAMESPACE: a.__STATIC_CONTENT,
              ASSET_MANIFEST: vt2
            }
          );
          if (!v.ok)
            return v;
          let x2 = new Headers(v.headers);
          return v.headers.forEach((l2, p) => x2.append(p, l2)), jn2(e3.url) && x2.append(
            "Cache-Control",
            "public, max-age=604800, immutable"
          ), x2.append("Cross-Origin-Embedder-Policy", "require-corp"), v = new Response(v.body, { ...v, headers: x2 }), v;
        }
      }
      return new Response("not found :((( ", { status: 404 });
  }
}
var ba = {};
var ya = ba;
function _n2() {
  return new Response(null, { status: 401, statusText: "no robots" });
}
function Vn2(t3, e3) {
  return new Response(
    `<meta http-equiv="refresh" content="0; URL=${t3.origin}/live/${e3}" />`,
    {
      status: 307,
      headers: {
        Location: `${t3.origin}/live/${e3}`,
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "no-cache",
        "Content-Encoding": "gzip",
        ASSET_HASH: dist_shasum_default
      }
    }
  );
}
async function In2(t3, e3, a) {
  return t3.cf && t3.cf.asOrganization && t3.cf.asOrganization.startsWith("YANDEX") ? _n2() : xe2(t3, async () => {
    var o2, s2;
    console.log(`handling request: ${t3.url}`);
    let n = new URL(t3.url), i2 = n.pathname.slice(1).split("/");
    if (!i2[0]) {
      let r = Math.floor(Math.floor(Date.now() / 1e3) / 7200);
      console.log({ asOrganization: (o2 = t3.cf) == null ? void 0 : o2.asOrganization });
      let c = ym(
        (((s2 = t3.cf) == null ? void 0 : s2.asOrganization) || "default") + r + `
      and reset every 2 hours
      time`
      );
      return Vn2(n, c);
    }
    return Fn2(i2, t3, e3, a);
  });
}
ba.fetch = In2;
o();
o();
var Ca = `
*:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *)) {
all: unset;
display: revert;
}

*,
*::before,
*::after {
box-sizing: border-box;
}

a, button {
cursor: revert;
}

ol, ul, menu {
list-style: none;
}

img {
max-width: 100%;
}

table {
border-collapse: collapse;
}

input, textarea {
-webkit-user-select: auto;
}

textarea {
white-space: revert;
}

/* minimum style to allow to style meter element */
meter {
-webkit-appearance: revert;
appearance: revert;
}

/* reset default text opacity of input placeholder */
::placeholder {
color: unset;
}

/* fix the feature of 'hidden' attribute.
display:revert; revert to element instead of a/live/editttribute */
:where([hidden]) {
display: none;
}

/* revert for bug in Chromium browsers
- fix for the content editable attribute will work properly.
- webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element*/
:where([contenteditable]:not([contenteditable="false"])) {
-moz-user-modify: read-write;
-webkit-user-modify: read-write;
overflow-wrap: break-word;
-webkit-line-break: after-white-space;
-webkit-user-select: auto;
}

/* apply back the draggable feature - exist only in Chromium and Safari */
:where([draggable="true"]) {
-webkit-user-drag: element;
}`;
var xt2 = class {
  constructor(e3, a) {
    this.state = e3;
    this.env = a;
    this.#e = [];
    this.#t = "";
    this.#a = "";
    this.session = Br({ i: 0, code: "", html: "", css: "" });
    this.#n = Br({
      code: `export default () => (
        <div>
          <h1>404 - for now.</h1>
      
          <h2>
            But you can edit even this page and share with your friends.
          </h2>
        </div>
      );`,
      i: 1,
      html: "<div></div>",
      css: ""
    });
    this.state.blockConcurrencyWhile(async () => {
      try {
        let n = await this.state.storage.get("session");
        if (!n || !n.i) {
          let i2 = await fetch(
            "https://spike.land/live/code-main/index.tsx"
          ).then((s2) => s2.text());
          this.#n.code = i2, await this.state.storage.put("session", this.#n), n = this.#n;
          let o2 = oe(n);
          await this.state.storage.put("head", o2);
        }
        this.session = n;
      } catch {
        this.session = this.#n;
      }
    });
  }
  #e;
  #t;
  #a;
  user2user(e3, a) {
    let n = typeof a != "string" ? JSON.stringify(a) : a;
    this.#e.filter((i2) => i2.name === e3).map((i2) => {
      try {
        i2.webSocket.send(n);
      } catch {
        console.error("p2p error");
      }
    });
  }
  // private users:
  broadcast(e3) {
    let a;
    if (typeof e3 == "string")
      a = e3;
    else {
      let n = oe(this.session);
      this.state.storage.put(n, {
        ...this.session,
        oldHash: e3.oldHash,
        reversePatch: e3.reversePatch
      }), this.state.storage.get(e3.oldHash).then(async (i2) => {
        await this.state.storage.put(e3.oldHash, {
          oldHash: (i2 || { oldHash: "" }).oldHash || "",
          reversePatch: (i2 || { reversePatch: "" }).reversePatch || [],
          newHash: e3.newHash,
          patch: e3.patch
        }), await this.state.storage.put("head", n);
      }), this.#t = "", a = JSON.stringify({ ...e3, i: this.session.i });
    }
    this.#e.map((n) => {
      try {
        n.webSocket.send(a);
      } catch {
        n.quit = true, n.blockedMessages.push(a);
      }
    });
  }
  #n;
  fetch(e3) {
    return xe2(
      e3,
      async () => {
        let a = new URL(e3.url);
        this.session.code = this.session.code.split("https://spike.land/").join(
          `${a.origin}/`
        );
        let n = a.searchParams.get("room"), { code: i2, css: o2, html: s2, i: r } = this.session;
        this.#a.length === 0 && (this.#a = a.origin);
        let c = fetch(
          `https://js.spike.land?v=${dist_shasum_default}`,
          {
            method: "POST",
            body: i2,
            headers: { TR_ORIGIN: this.#a }
          }
        ).then(async (v) => this.#t = x(await v.text(), a.origin));
        this.#t.length === 0 && await c;
        let h2 = a.pathname.slice(1).split("/");
        switch (h2.length === 0 && h2.push(""), h2[0]) {
          case "websocket": {
            if (e3.headers.get("Upgrade") != "websocket")
              return new Response("expected websocket", { status: 400 });
            let v = new WebSocketPair();
            return await (async (l2) => {
              l2.accept();
              let p = {
                name: "",
                quit: false,
                webSocket: l2,
                blockedMessages: []
              };
              this.#e.push(p);
              let d = this.#e.filter((u) => u.name).map((u) => u.name);
              l2.send(
                JSON.stringify({
                  hashCode: oe(this.session),
                  i: this.session.i,
                  // sessionI: JSON.parse(JSON.stringify(this.session)).i || JSON.stringify(this.session),
                  users: d,
                  // runner: this.#codeShaSum,
                  // codeShaSum,
                  type: "handshake"
                })
              ), l2.addEventListener(
                "message",
                (u) => this.processWsMessage(u, p)
              );
              let m2 = () => {
                p.quit = true;
              };
              l2.addEventListener("close", m2), l2.addEventListener("error", m2);
            })(v[1]), new Response(null, { status: 101, webSocket: v[0] });
          }
          case "code":
          case "index.tsx":
            return new Response(i2, {
              status: 200,
              headers: new Headers({
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                content_hash: ym(i2),
                "Content-Type": "application/javascript; charset=UTF-8"
              })
            });
          case "session.json":
          case "session": {
            if (h2[1]) {
              let x2 = await this.state.storage.get(
                h2[1],
                {
                  allowConcurrency: false
                }
              );
              if (x2) {
                let l2 = Br(
                  typeof x2 == "string" ? JSON.parse(x2) : x2
                );
                return new Response(ae(l2), {
                  status: 200,
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Cross-Origin-Embedder-Policy": "require-corp",
                    "Cache-Control": "no-cache",
                    "Content-Encoding": "gzip",
                    content_hash: ym(x2),
                    "Content-Type": "application/json; charset=UTF-8"
                  }
                });
              } else
                return new Response(
                  JSON.stringify({ success: false, statusCode: 404 }),
                  {
                    status: 404,
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Cross-Origin-Embedder-Policy": "require-corp",
                      "Content-Encoding": "gzip",
                      "Cache-Control": "no-cache",
                      "Content-Type": "application/json; charset=UTF-8"
                    }
                  }
                );
            }
            let v = ae(this.session);
            return new Response(v, {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                "Content-Encoding": "gzip",
                content_hash: ym(v),
                "Content-Type": "application/json; charset=UTF-8"
              }
            });
          }
          case "lazy":
            return new Response(
              `import { jsx as jsX } from "@emotion/react";
           import {LoadRoom} from "/live/lazy/js";
           export default ()=>jsX(LoadRoom, { room:"${n}"}) ;
           `,
              {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Encoding": "gzip",
                  "Cross-Origin-Embedder-Policy": "require-corp",
                  "Cache-Control": "no-cache",
                  "Content-Type": "application/javascript; charset=UTF-8"
                }
              }
            );
          case "request":
            return new Response(JSON.stringify({ ...e3 }), {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                "Content-Encoding": "gzip",
                "Content-Type": "application/json; charset=UTF-8"
              }
            });
          case "list": {
            let v = await this.state.storage.list({
              allowConcurrency: true
            });
            return new Response(JSON.stringify({ ...v }), {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Content-Encoding": "gzip",
                "Cache-Control": "no-cache",
                "Content-Type": "application/json; charset=UTF-8"
              }
            });
          }
          case "room":
            return new Response(JSON.stringify({ codeSpace: n }), {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                "Content-Type": "application/json; charset=UTF-8"
              }
            });
          case "path":
            return new Response(h2.join("----"), {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                "Content-Type": "application/javascript; charset=UTF-8"
              }
            });
          case "index.mjs":
          case "index.js":
          case "js": {
            this.#t = this.#t.length > 0 ? this.#t : await fetch("https://js.spike.land", {
              method: "POST",
              body: this.session.code,
              headers: { TR_ORIGIN: this.#a }
            }).then((x2) => x2.text());
            let v = this.#t.split("https://spike.land/").join(
              `${this.#a}/`
            );
            return new Response(v, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                "x-typescript-types": this.#a + "/live/index.tsx",
                content_hash: ym(v),
                "Content-Type": "application/javascript; charset=UTF-8"
              }
            });
          }
          case "env":
            return new Response(JSON.stringify(this.env), {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Content-Type": "text/html; charset=UTF-8"
              }
            });
          case "hashCode": {
            let v = String(Number(h2[1])), x2 = await this.state.storage.get(
              v,
              { allowConcurrency: true }
            );
            return new Response(JSON.stringify(x2 || {}), {
              status: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cache-Control": "no-cache",
                "Content-Type": "application/json; charset=UTF-8"
              }
            });
          }
          case "":
          case void 0:
          case null:
          case "hydrated":
          case "worker":
          case "dehydrated":
          case "iframe":
          case "public": {
            let v = Im.replace(
              "/**reset*/",
              Ca + o2
            ).replace(
              '<script src="/swVersion.js"><\/script>',
              `<script>
              window.swVersion = "${dist_shasum_default}"
              <\/script>`
            ).replace("ASSET_HASH", dist_shasum_default).replace(
              '<div id="root"></div>',
              `<div id="root" style="height: 100%;">
                        <div id="${n}-css" data-i="${r}" style="height: 100%;">
                          ${s2}
                        </div>
                </div>              
              `
            ), x2 = new Headers();
            return x2.set("Access-Control-Allow-Origin", "*"), x2.set("Cross-Origin-Embedder-Policy", "require-corp"), x2.set("Cross-Origin-Resource-Policy", "cross-origin"), x2.set("Cross-Origin-Opener-Policy", "same-origin"), x2.set(
              "Cache-Control",
              "no-cache"
            ), x2.set("Content-Encoding", "gzip"), x2.set("Content-Type", "text/html; charset=UTF-8"), x2.set("content_hash", ym(v)), new Response(v, {
              status: 200,
              headers: x2
            });
          }
          default:
            return new Response("Not found", { status: 404 });
        }
      }
    );
  }
  async processWsMessage(e3, a) {
    if (a.quit) {
      a.webSocket.close(1011, "WebSocket broken.");
      return;
    }
    let { name: n } = a, i2 = (s2) => a.webSocket.send(JSON.stringify(s2)), o2;
    try {
      o2 = typeof e3.data == "string" ? JSON.parse(e3.data) : JSON.parse(new TextDecoder().decode(e3.data));
    } catch (s2) {
      return i2({
        error: "JSON parse error",
        exp: s2 || {}
      });
    }
    if (o2.changes)
      return this.broadcast(e3.data);
    if (!n) {
      if (!o2.name)
        return i2({
          msg: "no-name-no-party"
        });
      this.#e.filter((s2) => s2.name === o2.name).map(
        (s2) => s2.blockedMessages.reverse().map((r) => a.webSocket.send(r)) && s2
      ).map((s2) => s2.quit = true), this.#e = this.#e.filter((s2) => !s2.quit), a.name = o2.name;
    }
    if (o2.type == "handshake") {
      let s2 = o2.hashCode;
      for (; s2 && s2 !== oe(this.session); ) {
        let r = await this.state.storage.get("" + s2, {
          allowConcurrency: true
        }), c = await this.state.storage.get(
          "" + r.newHash,
          {
            allowConcurrency: true
          }
        );
        return i2({
          oldHash: s2,
          newHash: r.newHash,
          patch: r.patch,
          reversePatch: c.reversePatch
        });
      }
    }
    if (o2.i && this.session.i && this.session.i > o2.i)
      return i2({ error: "i is not up to date" });
    try {
      try {
        if (o2.target && o2.type && ["new-ice-candidate", "video-offer", "video-answer"].includes(
          o2.type
        ))
          return this.user2user(o2.target, { ...o2, name: n });
        if (o2.patch && o2.oldHash && o2.newHash && o2.reversePatch) {
          let s2 = this.session;
          if (oe(this.session) !== o2.oldHash)
            return i2({
              error: "old hashes not matching",
              i: this.session.i,
              strSess: this.session
            });
          let c = mo(s2, {
            oldHash: o2.oldHash,
            newHash: o2.newHash,
            patch: o2.patch,
            reversePatch: o2.reversePatch
          });
          try {
            this.session = c, await this.state.storage.put("session", this.session), this.broadcast(o2);
          } catch (h2) {
            return i2({
              error: "Saving it its really hard",
              exp: h2 || {}
            });
          }
          return i2({
            hashCode: o2.newHash
          });
        }
      } catch (s2) {
        return console.error({ exp: s2 }), i2({
          error: "unknown error - e1",
          exp: s2 || {}
        });
      }
    } catch (s2) {
      return console.error({ exp: s2 }), i2({
        error: "unknown error - e2",
        exp: s2 || {}
      });
    }
  }
};
o();
var gt2 = class {
  constructor() {
    this.nextAllowedTime = 0;
  }
  // Our protocol is: POST when the IP performs an action, or GET to simply read the current limit.
  // Either way, the result is the number of seconds to wait before allowing the IP to perform its
  // next action.
  async fetch(e3) {
    return await xe2(e3, async () => {
      let a = Date.now() / 1e3;
      this.nextAllowedTime = Math.max(a, this.nextAllowedTime), e3.method == "POST" && (this.nextAllowedTime += 1);
      let n = Math.max(0, this.nextAllowedTime - a - 1);
      return new Response(`${n}`);
    });
  }
};
o();
var wt2 = class {
  async fetch() {
    return new Response("OK");
  }
};
var ao = ya;
export {
  xt2 as Code,
  gt2 as CodeRateLimiter,
  wt2 as Users,
  ao as default
};
//# sourceMappingURL=cf-workers.js.map
