import {
  appFactory,
  saveCode
} from "./chunk-chunk-XJX2QQCA.mjs";
import {
  hashCode,
  mST,
  patchSync
} from "./chunk-chunk-LDHU2TDS.mjs";
import "./chunk-chunk-E3ZWTQPQ.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-YMIN6QMO.mjs";
import {
  createRoot,
  flushSync,
  init_react_preact,
  useEffect
} from "./chunk-chunk-3G2TDKOV.mjs";
import {
  __toESM,
  init_define_process
} from "./chunk-chunk-NZ5A3UGY.mjs";

// js/runner.tsx
init_define_process();

// js/renderToString.tsx
init_define_process();

// js/md5.js
init_define_process();
function md5(inputString) {
  var hc = "0123456789abcdef";
  function rh(n) {
    var j, s = "";
    for (j = 0; j <= 3; j++) {
      s += hc.charAt(n >> j * 8 + 4 & 15) + hc.charAt(n >> j * 8 & 15);
    }
    return s;
  }
  function ad(x2, y) {
    var l = (x2 & 65535) + (y & 65535);
    var m = (x2 >> 16) + (y >> 16) + (l >> 16);
    return m << 16 | l & 65535;
  }
  function rl(n, c2) {
    return n << c2 | n >>> 32 - c2;
  }
  function cm(q, a2, b2, x2, s, t) {
    return ad(rl(ad(ad(a2, q), ad(x2, t)), s), b2);
  }
  function ff(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 & c2 | ~b2 & d2, a2, b2, x2, s, t);
  }
  function gg(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 & d2 | c2 & ~d2, a2, b2, x2, s, t);
  }
  function hh(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 ^ c2 ^ d2, a2, b2, x2, s, t);
  }
  function ii(a2, b2, c2, d2, x2, s, t) {
    return cm(c2 ^ (b2 | ~d2), a2, b2, x2, s, t);
  }
  function sb(x2) {
    var i2;
    var nblk = (x2.length + 8 >> 6) + 1;
    var blks = new Array(nblk * 16);
    for (i2 = 0; i2 < nblk * 16; i2++)
      blks[i2] = 0;
    for (i2 = 0; i2 < x2.length; i2++) {
      blks[i2 >> 2] |= x2.charCodeAt(i2) << i2 % 4 * 8;
    }
    blks[i2 >> 2] |= 128 << i2 % 4 * 8;
    blks[nblk * 16 - 2] = x2.length * 8;
    return blks;
  }
  var i, x = sb(inputString), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, olda, oldb, oldc, oldd;
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

// js/renderToString.tsx
init_react_preact();
init_react_preact();
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var temp = document.createElement("div");
var tempRoot = createRoot(temp);
var mod = {};
var TestBed = ({ md5Hash, children }) => {
  let resolv;
  mod[md5Hash] = new Promise((res) => resolv = res);
  useEffect(() => {
    resolv(true);
  }, []);
  return (0, import_jsx_runtime.jsx)("div", {
    id: md5Hash,
    children
  });
};
var renderFromString = async (code, transpiled, codeSpace) => {
  const md5Code = "ID" + md5(code).slice(0, 14);
  const App = await appFactory(transpiled);
  tempRoot.render((0, import_jsx_runtime.jsx)(TestBed, {
    md5Hash: md5Code,
    children: (0, import_jsx_runtime.jsx)(App, {})
  }, md5Code));
  await new Promise((_res) => flushSync(_res, true));
  if (!mod[md5Code])
    return null;
  if (!await mod[md5Code])
    return null;
  const html = temp.querySelector(`#${md5Code}`)?.innerHTML;
  tempRoot.unmount();
  setTimeout(() => {
    const hash = hashCode();
    setTimeout(() => {
      if (hash !== hashCode())
        return;
      const { css, html: html2, code: code2 } = mST();
      const newMd5Code = "ID" + md5(code2).slice(0, 14);
      if (newMd5Code !== md5Code)
        return;
      const tmp = document.getElementById("root-" + codeSpace);
      const htmlHtml = tmp.innerHTML;
      const newCss = extractCritical(htmlHtml);
      if (css !== newCss || html2 !== htmlHtml) {
        patchSync({
          ...mST(),
          html: htmlHtml,
          css: newCss
        });
      }
    }, 50);
  }, 100);
  return html ? {
    html,
    css: extractCritical(html)
  } : null;
};
var extractCritical = (html) => {
  try {
    const rules = {};
    for (let i in document.styleSheets) {
      const styleSheet = document.styleSheets[i];
      if (styleSheet?.cssRules) {
        Array.from(styleSheet.cssRules).forEach((rule) => {
          if (rule && rule.cssText && rule.cssText.slice(0, 5) === ".css-") {
            const selector = rule.cssText.slice(1, 11);
            if (!rules[selector] && html.includes(selector) && !rule.cssText.slice(10).includes(".css-")) {
              rules[selector] = rule.cssText;
            }
          }
        });
      }
    }
    return Object.keys(rules).map((r) => rules[r]).join(" ");
  } catch {
    console.error("no css");
    return "";
  }
};

// js/runner.tsx
var mod2 = {
  i: 0,
  esbuildInit: async () => await (await await import("./chunk-esbuildEsm-ENX776PL.mjs")).init()
};
async function runner({ code, counter, codeSpace }) {
  const esbuild = await mod2.esbuildInit();
  mod2.i = counter;
  if (code === mST().code)
    return;
  if (mod2.i > counter)
    return;
  try {
    const transpiled = await esbuild.transform(code, {
      loader: "tsx",
      format: "esm",
      treeShaking: true,
      tsconfigRaw: {
        "compilerOptions": {
          "jsx": "react-jsx",
          "jsxImportSource": "@emotion/react"
        }
      },
      target: "es2021"
    });
    if (transpiled.code === mST().transpiled)
      return;
    let restartError = false;
    if (transpiled.code.length > 0) {
      try {
        const res = await renderFromString(code, transpiled.code, codeSpace);
        if (res === null) {
          console.error("COULD NOT RENDER:");
          console.error({ code, transpiled: transpiled.code });
          return;
        }
        const { html, css } = res;
        await saveCode({
          code,
          transpiled: transpiled.code,
          i: counter,
          html,
          css
        });
        return;
      } catch (error) {
        console.error("EXCEPTION");
        console.error(error);
        restartError = true;
        console.error({ restartError });
        return;
      }
    }
  } catch (error) {
    console.error({ error });
  }
}
export {
  runner
};
