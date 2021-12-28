(function () {
  const A = navigator.userAgent.match(/(Edge|Safari)\/\d+\.\d+/);
  const e = A && "Edge" === A[1];
  const t = A && "Safari" === A[1];
  let o;
  function createBlob(A, e = "text/javascript") {
    return URL.createObjectURL(new Blob([A], { type: e }));
  }
  const noop = () => {};
  const B = document.querySelector("base[href]");
  B && (o = B.href);
  if (!o && "undefined" !== typeof location) {
    o = location.href.split("#")[0].split("?")[0];
    const A = o.lastIndexOf("/");
    -1 !== A && (o = o.slice(0, A + 1));
  }
  function isURL(A) {
    try {
      new URL(A);
      return true;
    } catch {
      return false;
    }
  }
  const E = /\\/g;
  function resolveIfNotPlainOrUrl(A, e) {
    e = e && e.split("#")[0].split("?")[0];
    -1 !== A.indexOf("\\") && (A = A.replace(E, "/"));
    if ("/" === A[0] && "/" === A[1]) return e.slice(0, e.indexOf(":") + 1) + A;
    if (
      "." === A[0] &&
        ("/" === A[1] ||
          "." === A[1] && ("/" === A[2] || 2 === A.length && (A += "/")) ||
          1 === A.length && (A += "/")) || "/" === A[0]
    ) {
      const t = e.slice(0, e.indexOf(":") + 1);
      let o;
      if ("/" === e[t.length + 1]) {
        if ("file:" !== t) {
          o = e.slice(t.length + 2);
          o = o.slice(o.indexOf("/") + 1);
        } else o = e.slice(8);
      } else o = e.slice(t.length + ("/" === e[t.length]));
      if ("/" === A[0]) return e.slice(0, e.length - o.length - 1) + A;
      const B = o.slice(0, o.lastIndexOf("/") + 1) + A;
      const E = [];
      let s = -1;
      for (let A = 0; A < B.length; A++) {
        if (-1 !== s) {
          if ("/" === B[A]) {
            E.push(B.slice(s, A + 1));
            s = -1;
          }
        } else if ("." === B[A]) {
          if (
            "." !== B[A + 1] || "/" !== B[A + 2] && A + 2 !== B.length
          ) {
            "/" === B[A + 1] || A + 1 === B.length ? A += 1 : s = A;
          } else {
            E.pop();
            A += 2;
          }
        } else s = A;
      }
      -1 !== s && E.push(B.slice(s));
      return e.slice(0, e.length - o.length) + E.join("");
    }
  }
  function resolveUrl(A, e) {
    return resolveIfNotPlainOrUrl(A, e) ||
      (-1 !== A.indexOf(":") ? A : resolveIfNotPlainOrUrl("./" + A, e));
  }
  function resolveAndComposePackages(A, e, t, o) {
    for (let B in A) {
      const E = resolveIfNotPlainOrUrl(B, t) || B;
      if (e[E]) {
        throw Error(`Rejected map override "${E}" from ${e[E]} to ${A[E]}.`);
      }
      let s = A[B];
      if ("string" !== typeof s) continue;
      const r = resolveImportMap(o, resolveIfNotPlainOrUrl(s, t) || s, t);
      r
        ? e[E] = r
        : console.warn(`Mapping "${B}" -> "${A[B]}" does not resolve`);
    }
  }
  function resolveAndComposeImportMap(A, e, t) {
    const o = {
      imports: Object.assign({}, t.imports),
      scopes: Object.assign({}, t.scopes),
    };
    A.imports && resolveAndComposePackages(A.imports, o.imports, e, t);
    if (A.scopes) {
      for (let B in A.scopes) {
        const E = resolveUrl(B, e);
        resolveAndComposePackages(
          A.scopes[B],
          o.scopes[E] || (o.scopes[E] = {}),
          e,
          t,
        );
      }
    }
    return o;
  }
  function getMatch(A, e) {
    if (e[A]) return A;
    let t = A.length;
    do {
      const o = A.slice(0, t + 1);
      if (o in e) return o;
    } while (-1 !== (t = A.lastIndexOf("/", t - 1)));
  }
  function applyPackages(A, e) {
    const t = getMatch(A, e);
    if (t) {
      const o = e[t];
      if (null === o) return;
      return o + A.slice(t.length);
    }
  }
  function resolveImportMap(A, e, t) {
    let o = t && getMatch(t, A.scopes);
    while (o) {
      const t = applyPackages(e, A.scopes[o]);
      if (t) return t;
      o = getMatch(o.slice(0, o.lastIndexOf("/")), A.scopes);
    }
    return applyPackages(e, A.imports) || -1 !== e.indexOf(":") && e;
  }
  const s = document.querySelector("script[type=esms-options]");
  const r = s
    ? JSON.parse(s.innerHTML)
    : self.esmsInitOptions
    ? self.esmsInitOptions
    : {};
  let g = !!r.shimMode;
  const n = globalHook(g && r.resolve);
  const I = r.skip ? new RegExp(r.skip) : null;
  let i = r.nonce;
  if (!i) {
    const A = document.querySelector("script[nonce]");
    A && (i = A.nonce || A.getAttribute("nonce"));
  }
  const c = globalHook(r.onerror || noop);
  const l = r.onpolyfill ? globalHook(r.onpolyfill) : () =>
    console.info(
      'OK: "Uncaught TypeError" module failure has been polyfilled',
    );
  const { revokeBlobURLs: a, noLoadEventRetriggers: f, enforceIntegrity: p } =
    r;
  const u = r.fetch ? globalHook(r.fetch) : fetch;
  function globalHook(A) {
    return "string" === typeof A ? self[A] : A;
  }
  const w = Array.isArray(r.polyfillEnable) ? r.polyfillEnable : [];
  const L = w.includes("css-modules");
  const h = w.includes("json-modules");
  function setShimMode() {
    g = true;
  }
  let k = false;
  let d;
  try {
    d = (0, eval)("u=>import(u)");
    k = true;
  } catch (A) {}
  if (!k) {
    let A;
    window.addEventListener("error", (e) => A = e);
    d = (e, { errUrl: t = e }) => {
      A = void 0;
      const B = createBlob(`import*as m from'${e}';self._esmsi=m;`);
      const E = Object.assign(document.createElement("script"), {
        type: "module",
        src: B,
      });
      E.setAttribute("noshim", "");
      document.head.appendChild(E);
      return new Promise((e, s) => {
        E.addEventListener("load", () => {
          document.head.removeChild(E);
          if (self._esmsi) {
            e(self._esmsi, o);
            self._esmsi = null;
          } else {
            s(
              A.error ||
                new Error(
                  `Error loading or executing the graph of ${t} (check the console for ${B}).`,
                ),
            );
            A = void 0;
          }
        });
      });
    };
  }
  let m = false;
  let D = false;
  let y = false;
  let N = false;
  let H = false;
  const v = Promise.resolve(k).then((A) => {
    if (A) {
      H = true;
      return Promise.all([
        d(createBlob("import.meta")).then(() => y = true, noop),
        L &&
        d(createBlob('import"data:text/css,{}"assert{type:"css"}')).then(
          () => D = true,
          noop,
        ),
        h &&
        d(createBlob('import"data:text/json,{}"assert{type:"json"}')).then(
          () => m = true,
          noop,
        ),
        new Promise((A) => {
          self._$s = (t) => {
            document.head.removeChild(e);
            t && (N = true);
            delete self._$s;
            A();
          };
          const e = document.createElement("iframe");
          e.style.display = "none";
          document.head.appendChild(e);
          e.src = createBlob(
            `<script type=importmap nonce="${i}">{"imports":{"x":"data:text/javascript,"}}<\/script><script nonce="${i}">import('x').then(()=>1,()=>0).then(v=>parent._$s(v))<\/script>`,
            "text/html",
          );
        }),
      ]);
    }
  });
  const F = 1 === new Uint8Array(new Uint16Array([1]).buffer)[0];
  function parse(A, e = "@") {
    if (!U) return R.then(() => parse(A));
    const t = A.length + 1,
      o = (U.__heap_base.value || U.__heap_base) + 4 * t -
        U.memory.buffer.byteLength;
    o > 0 && U.memory.grow(Math.ceil(o / 65536));
    const B = U.sa(t - 1);
    if ((F ? C : Q)(A, new Uint16Array(U.memory.buffer, B, t)), !U.parse()) {
      throw Object.assign(
        new Error(
          `Parse error ${e}:${A.slice(0, U.e()).split("\n").length}:${
            U.e() - A.lastIndexOf("\n", U.e() - 1)
          }`,
        ),
        { idx: U.e() },
      );
    }
    const E = [], s = [];
    for (; U.ri();) {
      const e = U.is(),
        t = U.ie(),
        o = U.ai(),
        B = U.id(),
        s = U.ss(),
        r = U.se();
      let g;
      U.ip() && (g = J(A.slice(-1 === B ? e - 1 : e, -1 === B ? t + 1 : t))),
        E.push({ n: g, s: e, e: t, ss: s, se: r, d: B, a: o });
    }
    for (; U.re();) {
      const e = A.slice(U.es(), U.ee()), t = e[0];
      s.push('"' === t || "'" === t ? J(e) : e);
    }
    function J(A) {
      try {
        return (0, eval)(A);
      } catch (A) {}
    }
    return [E, s, !!U.f()];
  }
  function Q(A, e) {
    const t = A.length;
    let o = 0;
    for (; o < t;) {
      const t = A.charCodeAt(o);
      e[o++] = (255 & t) << 8 | t >>> 8;
    }
  }
  function C(A, e) {
    const t = A.length;
    let o = 0;
    for (; o < t;) e[o] = A.charCodeAt(o++);
  }
  let U;
  const R = WebAssembly.compile(
    (K =
      "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",
      "undefined" != typeof Buffer
        ? Buffer.from(K, "base64")
        : Uint8Array.from(atob(K), (A) => A.charCodeAt(0))),
  ).then(WebAssembly.instantiate).then(({ exports: A }) => {
    U = A;
  });
  var K;
  async function defaultResolve(A, e) {
    return resolveImportMap(Y, resolveIfNotPlainOrUrl(A, e) || A, e);
  }
  async function _resolve(A, e) {
    const t = resolveIfNotPlainOrUrl(A, e);
    return { r: resolveImportMap(Y, t || A, e), b: !t && !isURL(A) };
  }
  const M = n
    ? async (A, e) => ({ r: await n(A, e, defaultResolve), b: false })
    : _resolve;
  let S = 0;
  const q = {};
  async function loadAll(A, e) {
    if (!A.b && !e[A.u]) {
      e[A.u] = 1;
      await A.L;
      await Promise.all(A.d.map((A) => loadAll(A, e)));
      A.n || (A.n = A.d.some((A) => A.n));
    }
  }
  let Y = { imports: {}, scopes: {} };
  let G = false;
  let b;
  const O = v.then(() => {
    if (!g) {
      if (
        document.querySelectorAll(
          "script[type=module-shim],script[type=importmap-shim],link[rel=modulepreload-shim]",
        ).length
      ) {
        setShimMode();
      } else {
        let A = false;
        for (
          const e of document.querySelectorAll(
            "script[type=module],script[type=importmap]",
          )
        ) {
          if (A) {
            if ("importmap" === e.type) {
              G = true;
              break;
            }
          } else "module" === e.type && (A = true);
        }
      }
    }
    b = H && y && N && (!h || m) && (!L || D) && !G && true;
    if (g || !b) {
      new MutationObserver((A) => {
        for (const e of A) {
          if ("childList" === e.type) {
            for (const A of e.addedNodes) {
              if ("SCRIPT" === A.tagName) {
                A.type === (g ? "module-shim" : "module") && processScript(A);
                A.type === (g ? "importmap-shim" : "importmap") &&
                  processImportMap(A);
              } else {
                "LINK" === A.tagName && A.rel === (g
                      ? "modulepreload-shim"
                      : "modulepreload") &&
                  processPreload(A);
              }
            }
          }
        }
      }).observe(document, { childList: true, subtree: true });
      processImportMaps();
      processScriptsAndPreloads();
      return R;
    }
  });
  let $ = O;
  let P = true;
  let x = true;
  async function topLevelLoad(A, e, t, o, B) {
    g || (x = false);
    await $;
    if (!g && b) {
      if (o) return null;
      await B;
      return d(t ? createBlob(t) : A, { errUrl: A || t });
    }
    const E = getOrCreateLoad(A, e, t);
    const s = {};
    await loadAll(E, s);
    X = void 0;
    resolveDeps(E, s);
    await B;
    if (t && !g && !E.n && true) {
      const A = await d(createBlob(t), { errUrl: t });
      a && revokeObjectURLs(Object.keys(s));
      return A;
    }
    if (P && !g && E.n && o) {
      l();
      P = false;
    }
    const r = await d(g || E.n || !o ? E.b : E.u, { errUrl: E.u });
    E.s && (await d(E.s)).u$_(r);
    a && revokeObjectURLs(Object.keys(s));
    return r;
  }
  function revokeObjectURLs(A) {
    let e = 0;
    const t = A.length;
    const o = self.requestIdleCallback
      ? self.requestIdleCallback
      : self.requestAnimationFrame;
    o(cleanup);
    function cleanup() {
      const B = 100 * e;
      if (!(B > t)) {
        for (const e of A.slice(B, B + 100)) {
          const A = q[e];
          A && URL.revokeObjectURL(A.b);
        }
        e++;
        o(cleanup);
      }
    }
  }
  async function importShim(A, e = o, t) {
    await O;
    if (x || g || !b) {
      processImportMaps();
      g || (x = false);
    }
    await $;
    return topLevelLoad((await M(A, e)).r || throwUnresolved(A, e), {
      credentials: "same-origin",
    });
  }
  self.importShim = importShim;
  g && (importShim.getImportMap = () => JSON.parse(JSON.stringify(Y)));
  const j = {};
  async function importMetaResolve(A, e = this.url) {
    return (await M(A, `${e}`)).r || throwUnresolved(A, e);
  }
  self._esmsm = j;
  function urlJsString(A) {
    return `'${A.replace(/'/g, "\\'")}'`;
  }
  let X;
  function resolveDeps(A, t) {
    if (A.b || !t[A.u]) return;
    t[A.u] = 0;
    for (const e of A.d) resolveDeps(e, t);
    const [o] = A.a;
    const B = A.S;
    let E = e && X ? `import '${X}';` : "";
    if (o.length) {
      let e = 0, t = 0;
      for (const { s: s, se: r, d: g } of o) {
        if (-1 === g) {
          const o = A.d[t++];
          let g = o.b;
          if (g) {
            if (o.s) {
              E += `${B.slice(e, s - 1)}/*${B.slice(s - 1, r)}*/${
                urlJsString(g)
              };import*as m$_${t} from'${o.b}';import{u$_ as u$_${t}}from'${o.s}';u$_${t}(m$_${t})`;
              e = r;
              o.s = void 0;
              continue;
            }
          } else {
            (g = o.s) ||
              (g = o.s = createBlob(
                `export function u$_(m){${
                  o.a[1].map((A) =>
                    "default" === A ? "$_default=m.default" : `${A}=m.${A}`
                  ).join(",")
                }}${
                  o.a[1].map((A) =>
                    "default" === A
                      ? "let $_default;export{$_default as default}"
                      : `export let ${A}`
                  ).join(";")
                }\n//# sourceURL=${o.r}?cycle`,
              ));
          }
          E += `${B.slice(e, s - 1)}/*${B.slice(s - 1, r)}*/${urlJsString(g)}`;
          e = r;
        } else if (-2 === g) {
          j[A.r] = { url: A.r, resolve: importMetaResolve };
          E += `${B.slice(e, s)}self._esmsm[${urlJsString(A.r)}]`;
          e = r;
        } else {
          E += `${B.slice(e, g + 6)}Shim(${B.slice(s, r)}, ${
            A.r && urlJsString(A.r)
          }`;
          e = r;
        }
      }
      E += B.slice(e);
    } else E += B;
    let s = false;
    E = E.replace(
      T,
      (e, t, o) => (s = !t, e.replace(o, () => new URL(o, A.r))),
    );
    s || (E += "\n//# sourceURL=" + A.r);
    A.b = X = createBlob(E);
    A.S = void 0;
  }
  const T = /\n\/\/# source(Mapping)?URL=([^\n]+)\s*((;|\/\/[^#][^\n]*)\s*)*$/;
  const _ = /^(text|application)\/(x-)?javascript(;|$)/;
  const Z = /^(text|application)\/json(;|$)/;
  const V = /^(text|application)\/css(;|$)/;
  const z =
    /url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g;
  let W = [];
  let AA = 0;
  function pushFetchPool() {
    if (++AA > 100) return new Promise((A) => W.push(A));
  }
  function popFetchPool() {
    AA--;
    W.length && W.shift()();
  }
  async function doFetch(A, e) {
    if (p && !e.integrity) throw Error(`No integrity for ${A}`);
    const t = pushFetchPool();
    t && await t;
    try {
      var o = await u(A, e);
    } finally {
      popFetchPool();
    }
    if (!o.ok) throw Error(`${o.status} ${o.statusText} ${o.url}`);
    const B = o.headers.get("content-type");
    if (_.test(B)) return { r: o.url, s: await o.text(), t: "js" };
    if (Z.test(B)) {
      return { r: o.url, s: `export default ${await o.text()}`, t: "json" };
    }
    if (V.test(B)) {
      return {
        r: o.url,
        s: `var s=new CSSStyleSheet();s.replaceSync(${
          JSON.stringify((await o.text()).replace(z, (e, t, o, B) =>
            `url(${t}${resolveUrl(o || B, A)}${t})`))
        });export default s;`,
        t: "css",
      };
    }
    throw Error(`Unsupported Content-Type "${B}"`);
  }
  function getOrCreateLoad(A, e, t) {
    let o = q[A];
    if (o) return o;
    o = q[A] = {
      u: A,
      r: void 0,
      f: void 0,
      S: void 0,
      L: void 0,
      a: void 0,
      d: void 0,
      b: void 0,
      s: void 0,
      n: false,
      t: null,
    };
    o.f = (async () => {
      if (!t) {
        let B;
        ({ r: o.r, s: t, t: B } = await (CA[A] || doFetch(A, e)));
        if (B && !g) {
          if ("css" === B && !L || "json" === B && !h) {
            throw Error(
              `${B}-modules require <script type="esms-options">{ "polyfillEnable": ["${B}-modules"] }<\/script>`,
            );
          }
          ("css" === B && !D || "json" === B && !m) && (o.n = true);
        }
      }
      try {
        o.a = parse(t, o.u);
      } catch (A) {
        console.warn(A);
        o.a = [[], []];
      }
      o.S = t;
      return o;
    })();
    o.L = o.f.then(async () => {
      let A = e;
      o.d = (await Promise.all(o.a[0].map(async ({ n: e, d: t }) => {
        (t >= 0 && !H || 2 === t && !y) && (o.n = true);
        if (!e) return;
        const { r: B, b: E } = await M(e, o.r || o.u);
        !E || N && !G || (o.n = true);
        if (-1 === t) {
          B || throwUnresolved(e, o.r || o.u);
          if (I && I.test(B)) return { b: B };
          A.integrity && (A = Object.assign({}, A, { integrity: void 0 }));
          return getOrCreateLoad(B, A).f;
        }
      }))).filter((A) => A);
    });
    return o;
  }
  function processScriptsAndPreloads() {
    for (
      const A of document.querySelectorAll(
        g ? "script[type=module-shim]" : "script[type=module]",
      )
    ) {
      processScript(A);
    }
    for (
      const A of document.querySelectorAll(
        g ? "link[rel=modulepreload-shim]" : "link[rel=modulepreload]",
      )
    ) {
      processPreload(A);
    }
  }
  function processImportMaps() {
    for (
      const A of document.querySelectorAll(
        g ? 'script[type="importmap-shim"]' : 'script[type="importmap"]',
      )
    ) {
      processImportMap(A);
    }
  }
  function getFetchOpts(A) {
    const e = {};
    A.integrity && (e.integrity = A.integrity);
    A.referrerpolicy && (e.referrerPolicy = A.referrerpolicy);
    "use-credentials" === A.crossorigin
      ? e.credentials = "include"
      : "anonymous" === A.crossorigin
      ? e.credentials = "omit"
      : e.credentials = "same-origin";
    return e;
  }
  let eA = Promise.resolve();
  let QA = 1;
  function domContentLoadedCheck() {
    0 !== --QA || f || document.dispatchEvent(new Event("DOMContentLoaded"));
  }
  document.addEventListener("DOMContentLoaded", async () => {
    await O;
    domContentLoadedCheck();
    if (g || !b) {
      processImportMaps();
      processScriptsAndPreloads();
    }
  });
  let tA = 1;
  "complete" === document.readyState
    ? readyStateCompleteCheck()
    : document.addEventListener("readystatechange", async () => {
      processImportMaps();
      await O;
      readyStateCompleteCheck();
    });
  function readyStateCompleteCheck() {
    0 !== --tA || f || document.dispatchEvent(new Event("readystatechange"));
  }
  function processImportMap(A) {
    if (!A.ep && (A.src || A.innerHTML)) {
      A.ep = true;
      if (A.src) {
        if (!g) return;
        G = true;
      }
      if (x) {
        $ = $.then(async () => {
          Y = resolveAndComposeImportMap(
            A.src ? await (await u(A.src)).json() : JSON.parse(A.innerHTML),
            A.src || o,
            Y,
          );
        }).catch((A) =>
          setTimeout(() => {
            throw A;
          })
        );
        g || (x = false);
      }
    }
  }
  function processScript(A) {
    if (A.ep) return;
    if (null !== A.getAttribute("noshim")) return;
    if (!A.src && !A.innerHTML) return;
    A.ep = true;
    const e = tA > 0;
    const B = QA > 0;
    e && tA++;
    B && QA++;
    const E = null === A.getAttribute("async") && e;
    const s = topLevelLoad(
      A.src || `${o}?${S++}`,
      getFetchOpts(A),
      !A.src && A.innerHTML,
      !g,
      E && eA,
    ).catch((A) => {
      t ? console.error(A) : setTimeout(() => {
        throw A;
      });
      c(A);
    });
    E && (eA = s.then(readyStateCompleteCheck));
    B && s.then(domContentLoadedCheck);
  }
  const CA = {};
  function processPreload(A) {
    if (!A.ep) {
      A.ep = true;
      CA[A.href] || (CA[A.href] = doFetch(A.href, getFetchOpts(A)));
    }
  }
  function throwUnresolved(A, e) {
    throw Error(
      "Unable to resolve specifier '" + A + (e ? "' from " + e : "'"),
    );
  }
})();

//# sourceMappingURL=es-module-shims.wasm.js.map
