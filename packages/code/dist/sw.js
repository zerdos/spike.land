"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // js/md5.js
  var cache = globalThis.md5cache = globalThis.md5cache || /* @__PURE__ */ new Map();
  var md5 = /* @__PURE__ */ __name((code) => cache.get(code) || cache.set(
    code,
    md5FULL(code).split("0").join("k").split("1").join("g").split("2").join("j").split("3").join("k").split("4").join("b").split("5").join("n").split("6").join("o").split("7").join("x").split("8").join("q").split("9").join("z").slice(0, 8)
  ).get(code), "md5");
  function md5FULL(inputString) {
    const hc = "0123456789abcdef";
    function rh(n) {
      let j;
      let s = "";
      for (j = 0; j <= 3; j++) {
        s += hc.charAt(n >> j * 8 + 4 & 15) + hc.charAt(n >> j * 8 & 15);
      }
      return s;
    }
    __name(rh, "rh");
    function ad(x2, y) {
      const l = (x2 & 65535) + (y & 65535);
      const m = (x2 >> 16) + (y >> 16) + (l >> 16);
      return m << 16 | l & 65535;
    }
    __name(ad, "ad");
    function rl(n, c2) {
      return n << c2 | n >>> 32 - c2;
    }
    __name(rl, "rl");
    function cm(q, a2, b2, x2, s, t) {
      return ad(rl(ad(ad(a2, q), ad(x2, t)), s), b2);
    }
    __name(cm, "cm");
    function ff(a2, b2, c2, d2, x2, s, t) {
      return cm(b2 & c2 | ~b2 & d2, a2, b2, x2, s, t);
    }
    __name(ff, "ff");
    function gg(a2, b2, c2, d2, x2, s, t) {
      return cm(b2 & d2 | c2 & ~d2, a2, b2, x2, s, t);
    }
    __name(gg, "gg");
    function hh(a2, b2, c2, d2, x2, s, t) {
      return cm(b2 ^ c2 ^ d2, a2, b2, x2, s, t);
    }
    __name(hh, "hh");
    function ii(a2, b2, c2, d2, x2, s, t) {
      return cm(c2 ^ (b2 | ~d2), a2, b2, x2, s, t);
    }
    __name(ii, "ii");
    function sb(x2) {
      let i2;
      const nblk = (x2.length + 8 >> 6) + 1;
      const blks = Array.from({ length: nblk * 16 });
      for (i2 = 0; i2 < nblk * 16; i2++) {
        blks[i2] = 0;
      }
      for (i2 = 0; i2 < x2.length; i2++) {
        blks[i2 >> 2] |= x2.charCodeAt(i2) << i2 % 4 * 8;
      }
      blks[i2 >> 2] |= 128 << i2 % 4 * 8;
      blks[nblk * 16 - 2] = x2.length * 8;
      return blks;
    }
    __name(sb, "sb");
    let i;
    const x = sb(inputString);
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    let olda;
    let oldb;
    let oldc;
    let oldd;
    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;
      a = ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = ff(c, d, a, b, x[i + 10], 17, -42063);
      b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = hh(a, b, c, d, x[i + 5], 4, -378558);
      d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = ad(a, olda);
      b = ad(b, oldb);
      c = ad(c, oldc);
      d = ad(d, oldd);
    }
    return rh(a) + rh(b) + rh(c) + rh(d);
  }
  __name(md5FULL, "md5FULL");

  // js/sw.ts
  var lastChecked = 0;
  var npmCache;
  var chunkCache;
  var fileCache;
  var cacheName = "default";
  var getCacheName = /* @__PURE__ */ __name(() => fetch(location.origin + "/files.json").then((files) => files.ok ? files.text() : null).then((content) => md5(content)).then(
    (cn) => cn === cacheName || (fileCache = null) || (cacheName = cn)
  ).finally(() => cacheName), "getCacheName");
  addEventListener("fetch", async (_event) => {
    const event = _event;
    const request = event.request;
    const url = new URL(request.url);
    return event.respondWith((async () => {
      let myCache = url.pathname.includes("npm:/v9") || url.pathname.includes("npm:/v1") ? npmCache = npmCache || await caches.open(url.pathname.slice(0, 10)) : url.pathname.includes("chunk-") ? chunkCache = chunkCache || await caches.open("chunks") : fileCache = fileCache || await caches.open("files");
      if (Date.now() - lastChecked > 1e4) {
        lastChecked = Date.now();
        getCacheName();
      }
      const cacheKey = new Request(request.url + (fileCache === myCache ? "?files=" + cacheName : ""));
      const cachedResp = await myCache.match(cacheKey);
      if (cachedResp)
        return cachedResp.clone();
      if (!url.toString().includes(location.origin))
        return fetch(request);
      const resp = await fetch(request);
      if (resp.ok && resp.headers.get("Cache-Control") !== "no-cache" && !resp.headers.get("Location")) {
        await myCache.put(cacheKey, resp.clone());
      }
      return resp;
    })());
  });
})();
