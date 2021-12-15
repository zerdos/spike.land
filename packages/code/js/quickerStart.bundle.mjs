var xc = Object.create;
var jt = Object.defineProperty;
var kc = Object.getOwnPropertyDescriptor;
var Sc = Object.getOwnPropertyNames;
var Ec = Object.getPrototypeOf, Oc = Object.prototype.hasOwnProperty;
var po = (e) => jt(e, "__esModule", { value: !0 });
var Y = (e, t) => () => (e && (t = e(e = 0)), t);
var zr = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  Ce = (e, t) => {
    po(e);
    for (var r in t) jt(e, r, { get: t[r], enumerable: !0 });
  },
  Cc = (e, t, r) => {
    if (t && typeof t == "object" || typeof t == "function") {
      for (let n of Sc(t)) {
        !Oc.call(e, n) && n !== "default" &&
          jt(e, n, {
            get: () => t[n],
            enumerable: !(r = kc(t, n)) || r.enumerable,
          });
      }
    }
    return e;
  },
  _c = (e) =>
    Cc(
      po(jt(
        e != null ? xc(Ec(e)) : {},
        "default",
        e && e.__esModule && "default" in e
          ? { get: () => e.default, enumerable: !0 }
          : { value: e, enumerable: !0 },
      )),
      e,
    );
function Hc(e, t = 1, r = {}) {
  let { indent: n = " ", includeEmptyLines: o = !1 } = r;
  if (typeof e != "string") {
    throw new TypeError(
      `Expected \`input\` to be a \`string\`, got \`${typeof e}\``,
    );
  }
  if (typeof t != "number") {
    throw new TypeError(
      `Expected \`count\` to be a \`number\`, got \`${typeof t}\``,
    );
  }
  if (t < 0) {
    throw new RangeError(`Expected \`count\` to be at least 0, got \`${t}\``);
  }
  if (typeof n != "string") {
    throw new TypeError(
      `Expected \`options.indent\` to be a \`string\`, got \`${typeof n}\``,
    );
  }
  if (t === 0) return e;
  let i = o ? /^/gm : /^(?!\s*$)/gm;
  return e.replace(i, n.repeat(t));
}
function qc(e) {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Jc(e, { pretty: t = !1, basePath: r } = {}) {
  let n = r && new RegExp(`(at | \\()${qc(r.replace(/\\/g, "/"))}`, "g");
  if (typeof e == "string") {
    return e.replace(/\\/g, "/").split(`
`).filter((o) => {
      let i = o.match(mo);
      if (i === null || !i[1]) return !0;
      let a = i[1];
      return a.includes(".app/Contents/Resources/electron.asar") ||
          a.includes(".app/Contents/Resources/default_app.asar")
        ? !1
        : !Kc.test(a);
    }).filter((o) => o.trim() !== "").map(
      (
        o,
      ) => (n && (o = o.replace(n, "$1")),
        t && (o = o.replace(mo, (i, a) => i.replace(a, a.replace(Gc, "~")))),
        o),
    ).join(`
`);
  }
}
async function Qc(
  e,
  t,
  { concurrency: r = Number.POSITIVE_INFINITY, stopOnError: n = !0 } = {},
) {
  return new Promise((o, i) => {
    if (e[Symbol.iterator] === void 0 && e[Symbol.asyncIterator] === void 0) {
      throw new TypeError(
        `Expected \`input\` to be either an \`Iterable\` or \`AsyncIterable\`, got (${typeof e})`,
      );
    }
    if (typeof t != "function") {
      throw new TypeError("Mapper function is required");
    }
    if (
      !((Number.isSafeInteger(r) || r === Number.POSITIVE_INFINITY) && r >= 1)
    ) {
      throw new TypeError(
        `Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${r}\` (${typeof r})`,
      );
    }
    let a = [],
      l = [],
      c = new Map(),
      s = !1,
      u = !1,
      p = !1,
      h = 0,
      d = 0,
      f = e[Symbol.iterator] === void 0
        ? e[Symbol.asyncIterator]()
        : e[Symbol.iterator](),
      m = (v) => {
        s = !0, u = !0, i(v);
      },
      y = async () => {
        if (u) return;
        let v = await f.next(), g = d;
        if (d++, v.done) {
          if (p = !0, h === 0 && !u) {
            if (!n && l.length > 0) {
              m(new Yc(l));
              return;
            }
            if (u = !0, !c.size) {
              o(a);
              return;
            }
            let b = [];
            for (let [x, S] of a.entries()) c.get(x) !== go && b.push(S);
            o(b);
          }
          return;
        }
        h++,
          (async () => {
            try {
              let b = await v.value;
              if (u) return;
              let x = await t(b, g);
              x === go && c.set(g, x), a[g] = x, h--, await y();
            } catch (b) {
              if (n) m(b);
              else {
                l.push(b), h--;
                try {
                  await y();
                } catch (x) {
                  m(x);
                }
              }
            }
          })();
      };
    (async () => {
      for (let v = 0; v < r; v++) {
        try {
          await y();
        } catch (g) {
          m(g);
          break;
        }
        if (p || s) break;
      }
    })();
  });
}
async function Zc(e, t) {
  return Qc(e, (r) => r(), t);
}
async function tl(e, t) {
  let n = [{
    name: "react",
    url: "https://unpkg.com/@types/react@17.0.37/index.d.ts",
    depend: ["global", "csstype", "react-dom", "prop-types"],
  }, {
    name: "react/jsx-dev-runtime",
    url: "https://unpkg.com/@types/react@17.0.37/jsx-dev-runtime.d.ts",
    depend: ["global", "csstype", "react-dom", "prop-types"],
  }, {
    name: "react-exp",
    url: "https://unpkg.com/@types/react@17.0.37/experimental.d.ts",
    depend: [],
  }, {
    name: "global",
    url: "https://unpkg.com/@types/react@17.0.37/global.d.ts",
    depend: [],
  }, {
    name: "prop-types",
    url: "https://unpkg.com/@types/prop-types@15.7.2/index.d.ts",
    depend: [],
  }, {
    name: "react-dom",
    url: "https://unpkg.com/@types/react-dom@17.0.11/index.d.ts",
    depend: [],
  }, {
    name: "csstype",
    url: "https://unpkg.com/csstype@3.0.9/index.d.ts",
    depend: [],
  }, {
    name: "@emotion/styled/base.d.ts",
    url: "https://unpkg.com/@emotion/styled@11.6.0/types/base.d.ts",
    depend: ["@emotion/react", "@emotion/serialize", "react"],
  }, {
    name: "@emotion/styled/index.d.ts",
    url: "https://unpkg.com/@emotion/styled@11.6.0/types/index.d.ts",
    depend: ["@emotion/react", "@emotion/serialize", "react"],
  }, {
    name: "@emotion/cache/index.d.ts",
    url: "https://unpkg.com/@emotion/cache@11.6.0/types/index.d.ts",
    depend: ["@emotion/utils"],
  }, {
    name: "@emotion/react/index.d.ts",
    url: "https://unpkg.com/@emotion/react@11.7.0/types/index.d.ts",
    depend: ["@emotion/cache"],
  }, {
    name: "@emotion/react/jsx-namespace.d.ts",
    url: "https://unpkg.com/@emotion/react@11.7.0/types/jsx-namespace.d.ts",
    depend: ["@emotion/utils", "csstype"],
  }, {
    name: "@emotion/react/css-prop.d.ts",
    url: "https://unpkg.com/@emotion/react@11.7.0/types/css-prop.d.ts",
    depend: ["@emotion/utils", "csstype"],
  }, {
    name: "@emotion/react/helper.d.ts",
    url: "https://unpkg.com/@emotion/react@11.7.0/types/helper.d.ts",
    depend: ["@emotion/utils", "csstype"],
  }, {
    name: "@emotion/react/theming.d.ts",
    url: "https://unpkg.com/@emotion/react@11.7.0/types/theming.d.ts",
    depend: ["@emotion/utils", "csstype"],
  }, {
    name: "@emotion/serialize/index.d.ts",
    url: "https://unpkg.com/@emotion/serialize@1.0.2/types/index.d.ts",
    depend: ["@emotion/utils", "csstype"],
  }, {
    name: "@emotion/utils/index.d.ts",
    url: "https://unpkg.com/@emotion/utils@1.0.0/types/index.d.ts",
    depend: [],
  }, {
    name: "framer-motion",
    url: "https://unpkg.com/framer-motion@5.5.1/types/index.d.ts",
    depend: ["popmotion"],
  }, {
    name: "framer-motion/types/render/dom/motion.d.ts",
    url: " https://unpkg.com/framer-motion@5.5.1/types/render/dom/motion.d.ts",
    depend: ["popmotion"],
  }, {
    name: "popmotion",
    url: "https://unpkg.com/popmotion@11.0.0/lib/index.d.ts",
  }].map(({ name: o, url: i }) =>
    async () => {
      let a = await (await fetch(i)).text(),
        l = o.includes("@")
          ? `/node_modules/${o}`
          : o.endsWith(".d.ts")
          ? "/node_modules/@types" + o
          : "/node_modules/@types/" + o + "/index.d.ts";
      e(a, l);
    }
  );
  await Zc(n, { concurrency: 2 }),
    t({
      noSuggestionDiagnostics: !1,
      noSemanticValidation: !1,
      noSyntaxValidation: !1,
    });
}
var zc,
  Mt,
  Tc,
  jc,
  Mc,
  Ac,
  Pc,
  $c,
  Rc,
  Dc,
  Ic,
  Lc,
  fo,
  Nc,
  Bc,
  Fc,
  Uc,
  Wc,
  At,
  Vc,
  ho,
  mo,
  Kc,
  Gc,
  Xc,
  Pt,
  Yc,
  go,
  el,
  yo,
  bo = Y(() => {
    zc = Object.create,
      Mt = Object.defineProperty,
      Tc = Object.getOwnPropertyDescriptor,
      jc = Object.getOwnPropertyNames,
      Mc = Object.getPrototypeOf,
      Ac = Object.prototype.hasOwnProperty,
      Pc = (e, t, r) =>
        t in e
          ? Mt(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r,
          })
          : e[t] = r,
      $c = (e) => Mt(e, "__esModule", { value: !0 }),
      Rc = (e, t) =>
        function () {
          return t ||
            (0, e[Object.keys(e)[0]])((t = { exports: {} }).exports, t),
            t.exports;
        },
      Dc = (e, t, r) => {
        if (t && typeof t == "object" || typeof t == "function") {
          for (let n of jc(t)) {
            !Ac.call(e, n) && n !== "default" && Mt(e, n, {
              get: () => t[n],
              enumerable: !(r = Tc(t, n)) || r.enumerable,
            });
          }
        }
        return e;
      },
      Ic = (e) =>
        Dc(
          $c(Mt(
            e != null ? zc(Mc(e)) : {},
            "default",
            e && e.__esModule && "default" in e
              ? { get: () => e.default, enumerable: !0 }
              : { value: e, enumerable: !0 },
          )),
          e,
        ),
      Lc = (e, t, r) => (Pc(e, typeof t != "symbol" ? t + "" : t, r), r),
      fo = (e, t, r) => {
        if (!t.has(e)) throw TypeError("Cannot " + r);
      },
      Nc = (
        e,
        t,
        r,
      ) => (fo(e, t, "read from private field"), r ? r.call(e) : t.get(e)),
      Bc = (e, t, r) => {
        if (t.has(e)) {
          throw TypeError("Cannot add the same private member more than once");
        }
        t instanceof WeakSet ? t.add(e) : t.set(e, r);
      },
      Fc = (
        e,
        t,
        r,
        n,
      ) => (fo(e, t, "write to private field"),
        n ? n.call(e, r) : t.set(e, r),
        r),
      Uc = Rc({ "(disabled):os"() {} }),
      Wc = "0.31.0",
      At = { monaco: null },
      Vc = async () => {
        if (At.monaco) return At.monaco;
        let e = (n, o = []) =>
            typeof window == "undefined"
              ? {}
              : window.document.head.querySelector(`script[src="${n}"]`) &&
                  window || new Promise(function (i, a) {
                let l = window.document.createElement("script");
                l.src = n,
                  l.async = "async",
                  l.type = "application/javascript",
                  l.onload = () => {
                    o.length === 0 && i(window);
                    let c = {};
                    o.forEach((s) => Object.assign(c, window[s])), i(c);
                  },
                  l.onerror = a,
                  window.document.head.appendChild(l);
              }),
          t = `https://unpkg.com/monaco-editor@${Wc}/min/vs`,
          { require: r } = await e(`${t}/loader.js`);
        return r.config({ paths: { vs: t }, "vs/css": { disabled: !0 } }),
          At.monaco = await new Promise((n) =>
            r(["vs/editor/editor.main"], (o) => n(o))
          ),
          At.monaco;
      };
    ho = Ic(Uc());
    mo = /\s+at.*[(\s](.*)\)?/,
      Kc =
        /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/,
      Gc = typeof ho.default.homedir == "undefined"
        ? ""
        : ho.default.homedir().replace(/\\/g, "/");
    Xc = (e) => e.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, ""),
      Yc = class extends Error {
        constructor(e) {
          if (!Array.isArray(e)) {
            throw new TypeError(
              `Expected input to be an Array, got ${typeof e}`,
            );
          }
          e = e.map((r) =>
            r instanceof Error
              ? r
              : r !== null && typeof r == "object"
              ? Object.assign(new Error(r.message), r)
              : new Error(r)
          );
          let t = e.map((r) =>
            typeof r.stack == "string" ? Xc(Jc(r.stack)) : String(r)
          ).join(`
`);
          t = `
` + Hc(
            t,
            4,
          );
          super(t);
          Bc(this, Pt, void 0),
            Lc(this, "name", "AggregateError"),
            Fc(this, Pt, e);
        }
        get errors() {
          return Nc(this, Pt).slice();
        }
      };
    Pt = new WeakMap();
    go = Symbol("skip");
    el = Vc(),
      yo = async (
        { onChange: e, code: t, language: r, container: n, options: o },
      ) => {
        let i = await el,
          a = n.attachShadow({ mode: "closed" }),
          l = document.createElement("div");
        a.appendChild(l);
        let c = n.parentElement;
        if (c) {
          let { width: d, height: f } = c.getClientRects()[0];
          l.style.width = `${Math.min(window.innerWidth, d)}px`,
            l.style.height = `${f}px`,
            window.addEventListener("resize", (m) => {
              let { width: y, height: v } = c.getClientRects()[0];
              l.style.width = `${Math.min(window.innerWidth, y)}px`,
                l.style.height = `${v}px`;
            });
        }
        let s = document.createElement("style");
        s.innerText =
          '@import "https://unpkg.com/monaco-editor@0.30.1/min/vs/editor/editor.main.css";',
          a.appendChild(s),
          i.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: 99,
            lib: [
              "DOM",
              "DOM.Iterable",
              "ES2018.Regexp",
              "ES2018.AsyncIterable",
              "ES2018",
              "ES2019",
            ],
            allowNonTsExtensions: !0,
            moduleResolution: 2,
            declaration: !0,
            noEmit: !0,
            noEmitOnError: !0,
            jsx: 5,
            skipLibCheck: !0,
            esModuleInterop: !0,
            allowSyntheticDefaultImports: !0,
            allowUmdGlobalAccess: !0,
            noLibCheck: !0,
          }),
          i.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSuggestionDiagnostics: !0,
            noSemanticValidation: !0,
            noSyntaxValidation: !0,
          });
        let { Uri: u } = i,
          p = i.editor.create(l, {
            model: i.editor.createModel(t, "typescript", u.file("/index.ts")),
            lightbulb: { enabled: !0 },
            language: "typescript",
            theme: "vs-dark",
            codeLens: !0,
            suggest: { showStatusBar: !0, preview: !0 },
            smoothScrolling: !0,
            selectionHighlight: !0,
            selectOnLineNumbers: !0,
            cursorSmoothCaretAnimation: !0,
            cursorBlinking: "smooth",
            hideCursorInOverviewRuler: !0,
            cursorSurroundingLinesStyle: "all",
            cursorSurroundingLines: 8,
            formatOnPaste: !0,
            formatOnType: !0,
            useShadowDOM: !0,
          });
        function h() {
          return { target: 99, jsx: 1, allowNonTsExtensions: !0 };
        }
        return window.addEventListener("resize", () => {
          p.layout();
        }),
          p.onDidChangeModelContent((d) => e(p.getValue(), d)),
          setTimeout(() =>
            tl(
              (d, f) =>
                i.languages.typescript.typescriptDefaults.addExtraLib(d, f),
              (d) =>
                i.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                  d,
                ),
            ), 100),
          () => p;
      };
  });
var _a = {};
Ce(_a, {
  DraggableWindow: () => am,
  Fragment: () => Jo,
  Global: () => cu,
  Motion: () => Go,
  React: () => $,
  css: () => X,
  default: () => lm,
  jsx: () => T,
  motion: () => bt,
  render: () => cm,
});
import * as Go from "https://unpkg.com/@spike.land/esm@0.2.49/dist/framer-motion.mjs";
import $, {
  Fragment as Jo,
} from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as Xo from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react-dom.mjs";
import {
  createElement as Yo,
  useContext as bl,
  useLayoutEffect as Qo,
  useRef as vl,
} from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import {
  createContext as pi,
  createElement as Lr,
  forwardRef as Jl,
  Fragment as Xl,
  useContext as di,
} from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as vi from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as qt from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as Kt from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as ki from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as Gt from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as te from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import {
  createElement as Gr,
  Fragment as zu,
  useContext as _u,
} from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as Ji from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as Xi from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as L from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import Af from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import Zt from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import {
  Children as $f,
  cloneElement as er,
  isValidElement as tr,
} from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as rr from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { jsx as la } from "https://esm.sh/react/jsx-runtime";
import { jsx as hn } from "https://esm.sh/react/jsx-runtime";
import { jsx as rh } from "https://esm.sh/react/jsx-runtime";
import { jsxs as nh } from "https://esm.sh/react/jsx-runtime";
import { jsx as uh } from "https://esm.sh/react/jsx-runtime";
import * as or from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as ga from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { jsx as ya } from "https://esm.sh/react/jsx-runtime";
import { jsxs as vh } from "https://esm.sh/react/jsx-runtime";
import * as va from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { jsx as Th } from "https://esm.sh/react/jsx-runtime";
import * as Ae from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { jsx as Ih } from "https://esm.sh/react/jsx-runtime";
import * as ar from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import * as Sa from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs";
import { jsx as Wh } from "https://esm.sh/react/jsx-runtime";
import { jsxs as Vh } from "https://esm.sh/react/jsx-runtime";
import { jsx as Gh } from "https://esm.sh/react/jsx-runtime";
function wl(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++) {
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
  }
}
function xl(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key),
    e.nonce !== void 0 && t.setAttribute("nonce", e.nonce),
    t.appendChild(document.createTextNode("")),
    t.setAttribute("data-s", ""),
    t;
}
function Ol(e, t) {
  return (((t << 2 ^ Z(e, 0)) << 2 ^ Z(e, 1)) << 2 ^ Z(e, 2)) << 2 ^ Z(e, 3);
}
function ri(e) {
  return e.trim();
}
function Cl(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function A(e, t, r) {
  return e.replace(t, r);
}
function Rr(e, t) {
  return e.indexOf(t);
}
function Z(e, t) {
  return e.charCodeAt(t) | 0;
}
function nt(e, t, r) {
  return e.slice(t, r);
}
function fe(e) {
  return e.length;
}
function Dr(e) {
  return e.length;
}
function Lt(e, t) {
  return t.push(e), e;
}
function _l(e, t) {
  return e.map(t).join("");
}
function Bt(e, t, r, n, o, i, a) {
  return {
    value: e,
    root: t,
    parent: r,
    type: n,
    props: o,
    children: i,
    line: Nt,
    column: Ue,
    length: a,
    return: "",
  };
}
function ot(e, t) {
  return El(Bt("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function zl() {
  return B;
}
function Tl() {
  return B = ee > 0 ? Z(We, --ee) : 0, Ue--, B === 10 && (Ue = 1, Nt--), B;
}
function oe() {
  return B = ee < ni ? Z(We, ee++) : 0, Ue++, B === 10 && (Ue = 1, Nt++), B;
}
function he() {
  return Z(We, ee);
}
function Ft() {
  return ee;
}
function it(e, t) {
  return nt(We, e, t);
}
function at(e) {
  switch (e) {
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
function oi(e) {
  return Nt = Ue = 1, ni = fe(We = e), ee = 0, [];
}
function ii(e) {
  return We = "", e;
}
function Ut(e) {
  return ri(it(ee - 1, Ir(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function jl(e) {
  for (; (B = he()) && B < 33;) oe();
  return at(e) > 2 || at(B) > 3 ? "" : " ";
}
function Ml(e, t) {
  for (
    ;
    --t && oe() && !(B < 48 || B > 102 || B > 57 && B < 65 || B > 70 && B < 97);
  );
  return it(e, Ft() + (t < 6 && he() == 32 && oe() == 32));
}
function Ir(e) {
  for (; oe();) {
    switch (B) {
      case e:
        return ee;
      case 34:
      case 39:
        e !== 34 && e !== 39 && Ir(B);
        break;
      case 40:
        e === 41 && Ir(e);
        break;
      case 92:
        oe();
        break;
    }
  }
  return ee;
}
function Al(e, t) {
  for (; oe() && e + B !== 47 + 10 && !(e + B === 42 + 42 && he() === 47););
  return "/*" + it(t, ee - 1) + "*" + It(e === 47 ? e : oe());
}
function Pl(e) {
  for (; !at(he());) oe();
  return it(e, ee);
}
function $l(e) {
  return ii(Wt("", null, null, null, [""], e = oi(e), 0, [0], e));
}
function Wt(e, t, r, n, o, i, a, l, c) {
  for (
    var s = 0,
      u = 0,
      p = a,
      h = 0,
      d = 0,
      f = 0,
      m = 1,
      y = 1,
      v = 1,
      g = 0,
      b = "",
      x = o,
      S = i,
      w = n,
      k = b;
    y;
  ) {
    switch (f = g, g = oe()) {
      case 40:
        if (f != 108 && k.charCodeAt(p - 1) == 58) {
          Rr(k += A(Ut(g), "&", "&\f"), "&\f") != -1 && (v = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        k += Ut(g);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        k += jl(f);
        break;
      case 92:
        k += Ml(Ft() - 1, 7);
        continue;
      case 47:
        switch (he()) {
          case 42:
          case 47:
            Lt(Rl(Al(oe(), Ft()), t, r), c);
            break;
          default:
            k += "/";
        }
        break;
      case 123 * m:
        l[s++] = fe(k) * v;
      case 125 * m:
      case 59:
      case 0:
        switch (g) {
          case 0:
          case 125:
            y = 0;
          case 59 + u:
            d > 0 && fe(k) - p &&
              Lt(
                d > 32
                  ? si(k + ";", n, r, p - 1)
                  : si(A(k, " ", "") + ";", n, r, p - 2),
                c,
              );
            break;
          case 59:
            k += ";";
          default:
            if (
              Lt(w = ai(k, t, r, s, u, o, l, b, x = [], S = [], p), i),
                g === 123
            ) {
              if (u === 0) Wt(k, t, w, w, x, i, p, l, S);
              else {
                switch (h) {
                  case 100:
                  case 109:
                  case 115:
                    Wt(
                      e,
                      w,
                      w,
                      n && Lt(ai(e, w, w, 0, 0, o, l, b, o, x = [], p), S),
                      o,
                      S,
                      p,
                      l,
                      n ? x : S,
                    );
                    break;
                  default:
                    Wt(k, w, w, w, [""], S, 0, l, S);
                }
              }
            }
        }
        s = u = d = 0, m = v = 1, b = k = "", p = a;
        break;
      case 58:
        p = 1 + fe(k), d = f;
      default:
        if (m < 1) {
          if (g == 123) --m;
          else if (g == 125 && m++ == 0 && Tl() == 125) continue;
        }
        switch (k += It(g), g * m) {
          case 38:
            v = u > 0 ? 1 : (k += "\f", -1);
            break;
          case 44:
            l[s++] = (fe(k) - 1) * v, v = 1;
            break;
          case 64:
            he() === 45 && (k += Ut(oe())),
              h = he(),
              u = p = fe(b = k += Pl(Ft())),
              g++;
            break;
          case 45:
            f === 45 && fe(k) == 2 && (m = 0);
        }
    }
  }
  return i;
}
function ai(e, t, r, n, o, i, a, l, c, s, u) {
  for (
    var p = o - 1, h = o === 0 ? i : [""], d = Dr(h), f = 0, m = 0, y = 0;
    f < n;
    ++f
  ) {
    for (var v = 0, g = nt(e, p + 1, p = Sl(m = a[f])), b = e; v < d; ++v) {
      (b = ri(m > 0 ? h[v] + " " + g : A(g, /&\f/g, h[v]))) && (c[y++] = b);
    }
  }
  return Bt(e, t, r, o === 0 ? Pr : l, c, s, u);
}
function Rl(e, t, r) {
  return Bt(e, t, r, ei, It(zl()), nt(e, 2, -2), 0);
}
function si(e, t, r, n) {
  return Bt(e, t, r, $r, nt(e, 0, n), nt(e, n + 1, -1), n);
}
function ci(e, t) {
  switch (Ol(e, t)) {
    case 5103:
      return M + "print-" + e + e;
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
      return M + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return M + e + Dt + e + J + e + e;
    case 6828:
    case 4268:
      return M + e + J + e + e;
    case 6165:
      return M + e + J + "flex-" + e + e;
    case 5187:
      return M + e + A(e, /(\w+).+(:[^]+)/, M + "box-$1$2" + J + "flex-$1$2") +
        e;
    case 5443:
      return M + e + J + "flex-item-" + A(e, /flex-|-self/, "") + e;
    case 4675:
      return M + e + J + "flex-line-pack" +
        A(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return M + e + J + A(e, "shrink", "negative") + e;
    case 5292:
      return M + e + J + A(e, "basis", "preferred-size") + e;
    case 6060:
      return M + "box-" + A(e, "-grow", "") + M + e + J +
        A(e, "grow", "positive") + e;
    case 4554:
      return M + A(e, /([^-])(transform)/g, "$1" + M + "$2") + e;
    case 6187:
      return A(
        A(A(e, /(zoom-|grab)/, M + "$1"), /(image-set)/, M + "$1"),
        e,
        "",
      ) + e;
    case 5495:
    case 3959:
      return A(e, /(image-set\([^]*)/, M + "$1$`$1");
    case 4968:
      return A(
        A(e, /(.+:)(flex-)?(.*)/, M + "box-pack:$3" + J + "flex-pack:$3"),
        /s.+-b[^;]+/,
        "justify",
      ) + M + e + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return A(e, /(.+)-inline(.+)/, M + "$1$2") + e;
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
      if (fe(e) - 1 - t > 6) {
        switch (Z(e, t + 1)) {
          case 109:
            if (Z(e, t + 4) !== 45) break;
          case 102:
            return A(
              e,
              /(.+:)(.+)-([^]+)/,
              "$1" + M + "$2-$3$1" + Dt + (Z(e, t + 3) == 108 ? "$3" : "$2-$3"),
            ) + e;
          case 115:
            return ~Rr(e, "stretch")
              ? ci(A(e, "stretch", "fill-available"), t) + e
              : e;
        }
      }
      break;
    case 4949:
      if (Z(e, t + 1) !== 115) break;
    case 6444:
      switch (Z(e, fe(e) - 3 - (~Rr(e, "!important") && 10))) {
        case 107:
          return A(e, ":", ":" + M) + e;
        case 101:
          return A(
            e,
            /(.+:)([^;!]+)(;|!.+)?/,
            "$1" + M + (Z(e, 14) === 45 ? "inline-" : "") + "box$3$1" + M +
              "$2$3$1" + J + "$2box$3",
          ) + e;
      }
      break;
    case 5936:
      switch (Z(e, t + 11)) {
        case 114:
          return M + e + J + A(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return M + e + J + A(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return M + e + J + A(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return M + e + J + e + e;
  }
  return e;
}
function Ve(e, t) {
  for (var r = "", n = Dr(e), o = 0; o < n; o++) r += t(e[o], o, e, t) || "";
  return r;
}
function Dl(e, t, r, n) {
  switch (e.type) {
    case kl:
    case $r:
      return e.return = e.return || e.value;
    case ei:
      return "";
    case ti:
      return e.return = e.value + "{" + Ve(e.children, n) + "}";
    case Pr:
      e.value = e.props.join(",");
  }
  return fe(r = Ve(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function Il(e) {
  var t = Dr(e);
  return function (r, n, o, i) {
    for (var a = "", l = 0; l < t; l++) a += e[l](r, n, o, i) || "";
    return a;
  };
}
function Ll(e) {
  return function (t) {
    t.root || (t = t.return) && e(t);
  };
}
function Nl(e, t, r, n) {
  if (e.length > -1 && !e.return) {
    switch (e.type) {
      case $r:
        e.return = ci(e.value, e.length);
        break;
      case ti:
        return Ve([ot(e, { value: A(e.value, "@", "@" + M) })], n);
      case Pr:
        if (e.length) {
          return _l(e.props, function (o) {
            switch (Cl(o, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return Ve([
                  ot(e, { props: [A(o, /:(read-\w+)/, ":" + Dt + "$1")] }),
                ], n);
              case "::placeholder":
                return Ve([
                  ot(e, { props: [A(o, /:(plac\w+)/, ":" + M + "input-$1")] }),
                  ot(e, { props: [A(o, /:(plac\w+)/, ":" + Dt + "$1")] }),
                  ot(e, { props: [A(o, /:(plac\w+)/, J + "input-$1")] }),
                ], n);
            }
            return "";
          });
        }
    }
  }
}
function Bl(e) {
  var t = Object.create(null);
  return function (r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
function C() {
  return C = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) {
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
    }
    return e;
  },
    C.apply(this, arguments);
}
function fi(e, t, r) {
  var n = "";
  return r.split(" ").forEach(function (o) {
    e[o] !== void 0 ? t.push(e[o] + ";") : n += o + " ";
  }),
    n;
}
function Ql(e) {
  for (var t = 0, r, n = 0, o = e.length; o >= 4; ++n, o -= 4) {
    r = e.charCodeAt(n) & 255 | (e.charCodeAt(++n) & 255) << 8 |
      (e.charCodeAt(++n) & 255) << 16 | (e.charCodeAt(++n) & 255) << 24,
      r = (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16),
      r ^= r >>> 24,
      t = (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16) ^
        (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(n) & 255,
        t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13,
    t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16),
    ((t ^ t >>> 15) >>> 0).toString(36);
}
function st(e, t, r) {
  if (r == null) return "";
  if (r.__emotion_styles !== void 0) return r;
  switch (typeof r) {
    case "boolean":
      return "";
    case "object": {
      if (r.anim === 1) {
        return me = { name: r.name, styles: r.styles, next: me }, r.name;
      }
      if (r.styles !== void 0) {
        var n = r.next;
        if (n !== void 0) {
          for (
            ;
            n !== void 0;
          ) {
            me = { name: n.name, styles: n.styles, next: me }, n = n.next;
          }
        }
        var o = r.styles + ";";
        return o;
      }
      return ou(e, t, r);
    }
    case "function": {
      if (e !== void 0) {
        var i = me, a = r(e);
        return me = i, st(e, t, a);
      }
      break;
    }
    case "string":
      if (!1) var l, c;
      break;
  }
  if (t == null) return r;
  var s = t[r];
  return s !== void 0 ? s : r;
}
function ou(e, t, r) {
  var n = "";
  if (Array.isArray(r)) {
    for (var o = 0; o < r.length; o++) n += st(e, t, r[o]) + ";";
  } else {
    for (var i in r) {
      var a = r[i];
      if (typeof a != "object") {
        t != null && t[a] !== void 0
          ? n += i + "{" + t[a] + "}"
          : mi(a) && (n += Br(i) + ":" + gi(i, a) + ";");
      } else if (
        Array.isArray(a) && typeof a[0] == "string" &&
        (t == null || t[a[0]] === void 0)
      ) {
        for (var l = 0; l < a.length; l++) {
          mi(a[l]) && (n += Br(i) + ":" + gi(i, a[l]) + ";");
        }
      } else {
        var c = st(e, t, a);
        switch (i) {
          case "animation":
          case "animationName": {
            n += Br(i) + ":" + c + ";";
            break;
          }
          default:
            n += i + "{" + c + "}";
        }
      }
    }
  }
  return n;
}
function X() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) {
    t[r] = arguments[r];
  }
  return Vt(t);
}
function W(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), o, i;
  for (i = 0; i < n.length; i++) {
    o = n[i], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  }
  return r;
}
function wi(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") {
    if (Array.isArray(e)) {
      for (t = 0; t < e.length; t++) {
        e[t] && (r = wi(e[t])) && (n && (n += " "), n += r);
      }
    } else for (t in e) e[t] && (n && (n += " "), n += t);
  }
  return n;
}
function V() {
  for (var e = 0, t, r, n = ""; e < arguments.length;) {
    (t = arguments[e++]) && (r = wi(t)) && (n && (n += " "), n += r);
  }
  return n;
}
function Ht(e) {
  return e !== null && typeof e == "object" && e.constructor === Object;
}
function be(e, t, r = { clone: !0 }) {
  let n = r.clone ? C({}, e) : e;
  return Ht(e) && Ht(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" &&
      (Ht(t[o]) && o in e && Ht(e[o]) ? n[o] = be(e[o], t[o], r) : n[o] = t[o]);
  }),
    n;
}
function ct(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1) {
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  }
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
function lt(e) {
  if (typeof e != "string") throw new Error(ct(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function xi(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function pu(e) {
  let t = Kt.useRef(e);
  return uu(() => {
    t.current = e;
  }),
    Kt.useCallback((...r) => (0, t.current)(...r), []);
}
function du(e, t) {
  return ki.useMemo(() =>
    e == null && t == null ? null : (r) => {
      xi(e, r), xi(t, r);
    }, [e, t]);
}
function hu(e) {
  let { type: t, tagName: r } = e;
  return !!(r === "INPUT" && fu[t] && !e.readOnly ||
    r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function mu(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Jt = !0);
}
function Kr() {
  Jt = !1;
}
function gu() {
  this.visibilityState === "hidden" && qr && (Jt = !0);
}
function yu(e) {
  e.addEventListener("keydown", mu, !0),
    e.addEventListener("mousedown", Kr, !0),
    e.addEventListener("pointerdown", Kr, !0),
    e.addEventListener("touchstart", Kr, !0),
    e.addEventListener("visibilitychange", gu, !0);
}
function bu(e) {
  let { target: t } = e;
  try {
    return t.matches(":focus-visible");
  } catch (r) {}
  return Jt || hu(t);
}
function vu() {
  let e = Gt.useCallback((o) => {
      o != null && yu(o.ownerDocument);
    }, []),
    t = Gt.useRef(!1);
  function r() {
    return t.current
      ? (qr = !0,
        window.clearTimeout(Si),
        Si = window.setTimeout(() => {
          qr = !1;
        }, 100),
        t.current = !1,
        !0)
      : !1;
  }
  function n(o) {
    return bu(o) ? (t.current = !0, !0) : !1;
  }
  return { isFocusVisibleRef: t, onFocus: n, onBlur: r, ref: e };
}
function Ei(e, t) {
  let r = C({}, t);
  return Object.keys(e).forEach((n) => {
    r[n] === void 0 && (r[n] = e[n]);
  }),
    r;
}
function He(e, t, r) {
  let n = {};
  return Object.keys(e).forEach((o) => {
    n[o] = e[o].reduce(
      (i, a) => (a && (r && r[a] && i.push(r[a]), i.push(t(a))), i),
      [],
    ).join(" ");
  }),
    n;
}
function De(e, t) {
  return Su[t] || `${ku.generate(e)}-${t}`;
}
function Ie(e, t) {
  let r = {};
  return t.forEach((n) => {
    r[n] = De(e, n);
  }),
    r;
}
function Du(e, t) {
  return Ru(e, t);
}
function Iu(e, t) {
  return t ? be(e, t, { clone: !1 }) : e;
}
function ze(e, t, r) {
  let n = e.theme || {};
  if (Array.isArray(t)) {
    let o = n.breakpoints || zi;
    return t.reduce((i, a, l) => (i[o.up(o.keys[l])] = r(t[l]), i), {});
  }
  if (typeof t == "object") {
    let o = n.breakpoints || zi;
    return Object.keys(t).reduce((i, a) => {
      if (Object.keys(o.values || Xr).indexOf(a) !== -1) {
        let l = o.up(a);
        i[l] = r(t[a], a);
      } else {
        let l = a;
        i[l] = t[l];
      }
      return i;
    }, {});
  }
  return r(t);
}
function Lu(e = {}) {
  var t;
  return (e == null || (t = e.keys) == null ? void 0 : t.reduce((r, n) => {
    let o = e.up(n);
    return r[o] = {}, r;
  }, {})) || {};
}
function Nu(e, t) {
  return e.reduce((r, n) => {
    let o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function Yr(e, t) {
  return !t || typeof t != "string"
    ? null
    : t.split(".").reduce((r, n) => r && r[n] ? r[n] : null, e);
}
function Ti(e, t, r, n = r) {
  let o;
  return typeof e == "function"
    ? o = e(r)
    : Array.isArray(e)
    ? o = e[r] || n
    : o = Yr(e, r) || n,
    t && (o = t(o)),
    o;
}
function Bu(e) {
  let { prop: t, cssProperty: r = e.prop, themeKey: n, transform: o } = e,
    i = (a) => {
      if (a[t] == null) return null;
      let l = a[t], c = a.theme, s = Yr(c, n) || {};
      return ze(a, l, (u) => {
        let p = Ti(s, o, u);
        return u === p && typeof u == "string" &&
          (p = Ti(s, o, `${t}${u === "default" ? "" : lt(u)}`, u)),
          r === !1 ? p : { [r]: p };
      });
    };
  return i.propTypes = {}, i.filterProps = [t], i;
}
function Fu(...e) {
  let t = e.reduce((n, o) => (o.filterProps.forEach((i) => {
      n[i] = o;
    }),
      n), {}),
    r = (n) => Object.keys(n).reduce((o, i) => t[i] ? ut(o, t[i](n)) : o, {});
  return r.propTypes = {},
    r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []),
    r;
}
function Uu(e) {
  let t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
function pt(e, t, r, n) {
  let o = Yr(e, t) || r;
  return typeof o == "number"
    ? (i) => typeof i == "string" ? i : o * i
    : Array.isArray(o)
    ? (i) => typeof i == "string" ? i : o[i]
    : typeof o == "function"
    ? o
    : () => {};
}
function Ai(e) {
  return pt(e, "spacing", 8, "spacing");
}
function dt(e, t) {
  if (typeof t == "string" || t == null) return t;
  let r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function qu(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = dt(t, r), n), {});
}
function Ku(e, t, r, n) {
  if (t.indexOf(r) === -1) return null;
  let o = Hu(r), i = qu(o, n), a = e[r];
  return ze(e, a, i);
}
function en(e, t) {
  let r = Ai(e.theme);
  return Object.keys(e).map((n) => Ku(e, t, n, r)).reduce(ut, {});
}
function Pi(e) {
  return en(e, Qr);
}
function $i(e) {
  return en(e, Zr);
}
function tn(e) {
  return en(e, Mi);
}
function ft(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function je(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
function ld(e, t, r) {
  let n = { [e]: t, theme: r }, o = Ki[e];
  return o ? o(n) : { [e]: t };
}
function ud(...e) {
  let t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function pd(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function sn(e) {
  let { sx: t, theme: r = {} } = e || {};
  if (!t) return null;
  function n(o) {
    let i = o;
    if (typeof o == "function") i = o(r);
    else if (typeof o != "object") return o;
    let a = Lu(r.breakpoints), l = Object.keys(a), c = a;
    return Object.keys(i).forEach((s) => {
      let u = pd(i[s], r);
      if (u != null) {
        if (typeof u == "object") {
          if (Ki[s]) c = ut(c, Gi(s, u, r));
          else {
            let p = ze({ theme: r }, u, (h) => ({ [s]: h }));
            ud(p, u) ? c[s] = sn({ sx: u, theme: r }) : c = ut(c, p);
          }
        } else c = ut(c, Gi(s, u, r));
      }
    }),
      Nu(l, c);
  }
  return Array.isArray(t) ? t.map(n) : n(t);
}
function hd(e) {
  let {
      values: t = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      unit: r = "px",
      step: n = 5,
    } = e,
    o = W(e, fd),
    i = Object.keys(t);
  function a(u) {
    return `@media (min-width:${typeof t[u] == "number" ? t[u] : u}${r})`;
  }
  function l(u) {
    return `@media (max-width:${
      (typeof t[u] == "number" ? t[u] : u) - n / 100
    }${r})`;
  }
  function c(u, p) {
    let h = i.indexOf(p);
    return `@media (min-width:${
      typeof t[u] == "number" ? t[u] : u
    }${r}) and (max-width:${
      (h !== -1 && typeof t[i[h]] == "number" ? t[i[h]] : p) - n / 100
    }${r})`;
  }
  function s(u) {
    return i.indexOf(u) + 1 < i.length ? c(u, i[i.indexOf(u) + 1]) : a(u);
  }
  return C(
    { keys: i, values: t, up: a, down: l, between: c, only: s, unit: r },
    o,
  );
}
function yd(e = 8) {
  if (e.mui) return e;
  let t = Ai({ spacing: e }),
    r = (...n) =>
      (n.length === 0 ? [1] : n).map((o) => {
        let i = t(o);
        return typeof i == "number" ? `${i}px` : i;
      }).join(" ");
  return r.mui = !0, r;
}
function vd(e = {}, ...t) {
  let { breakpoints: r = {}, palette: n = {}, spacing: o, shape: i = {} } = e,
    a = W(e, bd),
    l = hd(r),
    c = yd(o),
    s = be({
      breakpoints: l,
      direction: "ltr",
      components: {},
      palette: C({ mode: "light" }, n),
      spacing: c,
      shape: C({}, gd, i),
    }, a);
  return s = t.reduce((u, p) => be(u, p), s), s;
}
function kd() {
  return Xi.useContext(xd);
}
function Sd(e) {
  return Object.keys(e).length === 0;
}
function Ed(e = null) {
  let t = kd();
  return !t || Sd(t) ? e : t;
}
function _d(e = Cd) {
  return Od(e);
}
function Yi(e) {
  return e.length === 0;
}
function Qi(e) {
  let { variant: t } = e, r = W(e, Td), n = t || "";
  return Object.keys(r).sort().forEach((o) => {
    o === "color"
      ? n += Yi(n) ? e[o] : lt(e[o])
      : n += `${Yi(n) ? o : lt(o)}${lt(e[o].toString())}`;
  }),
    n;
}
function ht(e) {
  return Object.keys(e).length === 0;
}
function Xt(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function Id(e = {}) {
  let {
    defaultTheme: t = Dd,
    rootShouldForwardProp: r = Xt,
    slotShouldForwardProp: n = Xt,
  } = e;
  return (o, i = {}) => {
    let {
        name: a,
        slot: l,
        skipVariantsResolver: c,
        skipSx: s,
        overridesResolver: u,
      } = i,
      p = W(i, jd),
      h = c !== void 0 ? c : l && l !== "Root" || !1,
      d = s || !1,
      f,
      m = Xt;
    l === "Root" ? m = r : l && (m = n);
    let y = Du(o, C({ shouldForwardProp: m, label: f }, p));
    return (v, ...g) => {
      let b = g
          ? g.map((w) =>
            typeof w == "function" && w.__emotion_real !== w
              ? (k) => {
                let { theme: j } = k, D = W(k, Md);
                return w(C({ theme: ht(j) ? t : j }, D));
              }
              : w
          )
          : [],
        x = v;
      a && u && b.push((w) => {
        let k = ht(w.theme) ? t : w.theme, j = Pd(a, k);
        return j ? u(w, j) : null;
      }),
        a && !h && b.push((w) => {
          let k = ht(w.theme) ? t : w.theme;
          return Rd(w, $d(a, k), k, a);
        }),
        d || b.push((w) => {
          let k = ht(w.theme) ? t : w.theme;
          return dd(C({}, w, { theme: k }));
        });
      let S = b.length - g.length;
      if (Array.isArray(v) && S > 0) {
        let w = new Array(S).fill("");
        x = [...v, ...w], x.raw = [...v.raw, ...w];
      } else {
        typeof v == "function" && (x = (w) => {
          let { theme: k } = w, j = W(w, Ad);
          return v(C({ theme: ht(k) ? t : k }, j));
        });
      }
      return y(x, ...b);
    };
  };
}
function Ld(e) {
  let { theme: t, name: r, props: n } = e;
  return !t || !t.components || !t.components[r] ||
      !t.components[r].defaultProps
    ? n
    : Ei(t.components[r].defaultProps, n);
}
function Nd({ props: e, name: t, defaultTheme: r }) {
  let n = zd(r);
  return Ld({ theme: n, name: t, props: e });
}
function ln(e, t = 0, r = 1) {
  return Math.min(Math.max(t, e), r);
}
function Bd(e) {
  e = e.substr(1);
  let t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g"), r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)),
    r
      ? `rgb${r.length === 4 ? "a" : ""}(${
        r.map((n, o) =>
          o < 3
            ? parseInt(n, 16)
            : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3
        ).join(", ")
      })`
      : "";
}
function Le(e) {
  if (e.type) return e;
  if (e.charAt(0) === "#") return Le(Bd(e));
  let t = e.indexOf("("), r = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1) {
    throw new Error(ct(9, e));
  }
  let n = e.substring(t + 1, e.length - 1), o;
  if (r === "color") {
    if (
      n = n.split(" "),
        o = n.shift(),
        n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].substr(1)),
        ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(
          o,
        ) === -1
    ) {
      throw new Error(ct(10, o));
    }
  } else n = n.split(",");
  return n = n.map((i) => parseFloat(i)), { type: r, values: n, colorSpace: o };
}
function Yt(e) {
  let { type: t, colorSpace: r } = e, { values: n } = e;
  return t.indexOf("rgb") !== -1
    ? n = n.map((o, i) => i < 3 ? parseInt(o, 10) : o)
    : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`),
    t.indexOf("color") !== -1
      ? n = `${r} ${n.join(" ")}`
      : n = `${n.join(", ")}`,
    `${t}(${n})`;
}
function Fd(e) {
  e = Le(e);
  let { values: t } = e,
    r = t[0],
    n = t[1] / 100,
    o = t[2] / 100,
    i = n * Math.min(o, 1 - o),
    a = (s, u = (s + r / 30) % 12) =>
      o - i * Math.max(Math.min(u - 3, 9 - u, 1), -1),
    l = "rgb",
    c = [
      Math.round(a(0) * 255),
      Math.round(a(8) * 255),
      Math.round(a(4) * 255),
    ];
  return e.type === "hsla" && (l += "a", c.push(t[3])),
    Yt({ type: l, values: c });
}
function Zi(e) {
  e = Le(e);
  let t = e.type === "hsl" ? Le(Fd(e)).values : e.values;
  return t = t.map((
    r,
  ) => (e.type !== "color" && (r /= 255),
    r <= .03928 ? r / 12.92 : ((r + .055) / 1.055) ** 2.4)
  ),
    Number((.2126 * t[0] + .7152 * t[1] + .0722 * t[2]).toFixed(3));
}
function Ud(e, t) {
  let r = Zi(e), n = Zi(t);
  return (Math.max(r, n) + .05) / (Math.min(r, n) + .05);
}
function Me(e, t) {
  return e = Le(e),
    t = ln(t),
    (e.type === "rgb" || e.type === "hsl") && (e.type += "a"),
    e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t,
    Yt(e);
}
function Wd(e, t) {
  if (e = Le(e), t = ln(t), e.type.indexOf("hsl") !== -1) e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1) {
    for (let r = 0; r < 3; r += 1) {
      e.values[r] *= 1 - t;
    }
  }
  return Yt(e);
}
function Vd(e, t) {
  if (e = Le(e), t = ln(t), e.type.indexOf("hsl") !== -1) {
    e.values[2] += (100 - e.values[2]) * t;
  } else if (e.type.indexOf("rgb") !== -1) {
    for (let r = 0; r < 3; r += 1) e.values[r] += (255 - e.values[r]) * t;
  } else if (e.type.indexOf("color") !== -1) {
    for (let r = 0; r < 3; r += 1) e.values[r] += (1 - e.values[r]) * t;
  }
  return Yt(e);
}
function Hd(e, t, r) {
  return C({
    toolbar: {
      minHeight: 56,
      [`${e.up("xs")} and (orientation: landscape)`]: { minHeight: 48 },
      [e.up("sm")]: { minHeight: 64 },
    },
  }, r);
}
function ta(e, t, r, n) {
  let o = n.light || n, i = n.dark || n * 1.5;
  e[t] ||
    (e.hasOwnProperty(r)
      ? e[t] = e[r]
      : t === "light"
      ? e.light = Vd(e.main, o)
      : t === "dark" && (e.dark = Wd(e.main, i)));
}
function rf(e = "light") {
  return e === "dark"
    ? { main: Ge[200], light: Ge[50], dark: Ge[400] }
    : { main: Ge[700], light: Ge[400], dark: Ge[800] };
}
function nf(e = "light") {
  return e === "dark"
    ? { main: qe[200], light: qe[50], dark: qe[400] }
    : { main: qe[500], light: qe[300], dark: qe[700] };
}
function of(e = "light") {
  return e === "dark"
    ? { main: Ke[500], light: Ke[300], dark: Ke[700] }
    : { main: Ke[700], light: Ke[400], dark: Ke[800] };
}
function af(e = "light") {
  return e === "dark"
    ? { main: Je[400], light: Je[300], dark: Je[700] }
    : { main: Je[700], light: Je[500], dark: Je[900] };
}
function sf(e = "light") {
  return e === "dark"
    ? { main: Xe[400], light: Xe[300], dark: Xe[700] }
    : { main: Xe[800], light: Xe[500], dark: Xe[900] };
}
function cf(e = "light") {
  return e === "dark"
    ? { main: gt[400], light: gt[300], dark: gt[700] }
    : { main: "#ed6c02", light: gt[500], dark: gt[900] };
}
function lf(e) {
  let { mode: t = "light", contrastThreshold: r = 3, tonalOffset: n = .2 } = e,
    o = W(e, tf),
    i = e.primary || rf(t),
    a = e.secondary || nf(t),
    l = e.error || of(t),
    c = e.info || af(t),
    s = e.success || sf(t),
    u = e.warning || cf(t);
  function p(f) {
    return Ud(f, un.text.primary) >= r ? un.text.primary : ea.text.primary;
  }
  let h = (
      {
        color: f,
        name: m,
        mainShade: y = 500,
        lightShade: v = 300,
        darkShade: g = 700,
      },
    ) => {
      if (
        f = C({}, f),
          !f.main && f[y] && (f.main = f[y]),
          !f.hasOwnProperty("main")
      ) {
        throw new Error(ct(11, m ? ` (${m})` : "", y));
      }
      if (typeof f.main != "string") {
        throw new Error(ct(12, m ? ` (${m})` : "", JSON.stringify(f.main)));
      }
      return ta(f, "light", v, n),
        ta(f, "dark", g, n),
        f.contrastText || (f.contrastText = p(f.main)),
        f;
    },
    d = { dark: un, light: ea };
  return be(
    C({
      common: mt,
      mode: t,
      primary: h({ color: i, name: "primary" }),
      secondary: h({
        color: a,
        name: "secondary",
        mainShade: "A400",
        lightShade: "A200",
        darkShade: "A700",
      }),
      error: h({ color: l, name: "error" }),
      warning: h({ color: u, name: "warning" }),
      info: h({ color: c, name: "info" }),
      success: h({ color: s, name: "success" }),
      grey: Gd,
      contrastThreshold: r,
      getContrastText: p,
      augmentColor: h,
      tonalOffset: n,
    }, d[t]),
    o,
  );
}
function pf(e) {
  return Math.round(e * 1e5) / 1e5;
}
function df(e, t) {
  let r = typeof t == "function" ? t(e) : t,
    {
      fontFamily: n = na,
      fontSize: o = 14,
      fontWeightLight: i = 300,
      fontWeightRegular: a = 400,
      fontWeightMedium: l = 500,
      fontWeightBold: c = 700,
      htmlFontSize: s = 16,
      allVariants: u,
      pxToRem: p,
    } = r,
    h = W(r, uf),
    d = o / 14,
    f = p || ((v) => `${v / s * d}rem`),
    m = (v, g, b, x, S) =>
      C(
        { fontFamily: n, fontWeight: v, fontSize: f(g), lineHeight: b },
        n === na ? { letterSpacing: `${pf(x / g)}em` } : {},
        S,
        u,
      ),
    y = {
      h1: m(i, 96, 1.167, -1.5),
      h2: m(i, 60, 1.2, -.5),
      h3: m(a, 48, 1.167, 0),
      h4: m(a, 34, 1.235, .25),
      h5: m(a, 24, 1.334, 0),
      h6: m(l, 20, 1.6, .15),
      subtitle1: m(a, 16, 1.75, .15),
      subtitle2: m(l, 14, 1.57, .1),
      body1: m(a, 16, 1.5, .15),
      body2: m(a, 14, 1.43, .15),
      button: m(l, 14, 1.75, .4, ra),
      caption: m(a, 12, 1.66, .4),
      overline: m(a, 12, 2.66, 1, ra),
    };
  return be(
    C({
      htmlFontSize: s,
      pxToRem: f,
      fontFamily: n,
      fontSize: o,
      fontWeightLight: i,
      fontWeightRegular: a,
      fontWeightMedium: l,
      fontWeightBold: c,
    }, y),
    h,
    { clone: !1 },
  );
}
function R(...e) {
  return [
    `${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${ff})`,
    `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${hf})`,
    `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${mf})`,
  ].join(",");
}
function oa(e) {
  return `${Math.round(e)}ms`;
}
function xf(e) {
  if (!e) return 0;
  let t = e / 36;
  return Math.round((4 + 15 * t ** .25 + t / 5) * 10);
}
function kf(e) {
  let t = C({}, vf, e.easing), r = C({}, wf, e.duration);
  return C(
    {
      getAutoHeightDuration: xf,
      create: (n = ["all"], o = {}) => {
        let {
            duration: i = r.standard,
            easing: a = t.easeInOut,
            delay: l = 0,
          } = o,
          c = W(o, bf);
        return (Array.isArray(n) ? n : [n]).map((s) =>
          `${s} ${typeof i == "string" ? i : oa(i)} ${a} ${
            typeof l == "string" ? l : oa(l)
          }`
        ).join(",");
      },
    },
    e,
    { easing: t, duration: r },
  );
}
function Cf(e = {}, ...t) {
  let {
      mixins: r = {},
      palette: n = {},
      transitions: o = {},
      typography: i = {},
    } = e,
    a = W(e, Of),
    l = lf(n),
    c = cn(e),
    s = be(c, {
      mixins: Hd(c.breakpoints, c.spacing, r),
      palette: l,
      shadows: yf.slice(),
      typography: df(l, i),
      transitions: kf(o),
      zIndex: C({}, Ef),
    });
  return s = be(s, a), s = t.reduce((u, p) => be(u, p), s), s;
}
function Ne({ props: e, name: t }) {
  return Nd({ props: e, name: t, defaultTheme: ia });
}
function pn(e, t) {
  return pn = Object.setPrototypeOf || function (r, n) {
    return r.__proto__ = n, r;
  },
    pn(e, t);
}
function Mf(e, t) {
  e.prototype = Object.create(t.prototype),
    e.prototype.constructor = e,
    pn(e, t);
}
function Pf(e) {
  if (e === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return e;
}
function dn(e, t) {
  var r = function (o) {
      return t && tr(o) ? t(o) : o;
    },
    n = Object.create(null);
  return e && $f.map(e, function (o) {
    return o;
  }).forEach(function (o) {
    n[o.key] = r(o);
  }),
    n;
}
function Rf(e, t) {
  e = e || {}, t = t || {};
  function r(u) {
    return u in t ? t[u] : e[u];
  }
  var n = Object.create(null), o = [];
  for (var i in e) i in t ? o.length && (n[i] = o, o = []) : o.push(i);
  var a, l = {};
  for (var c in t) {
    if (n[c]) {
      for (a = 0; a < n[c].length; a++) {
        var s = n[c][a];
        l[n[c][a]] = r(s);
      }
    }
    l[c] = r(c);
  }
  for (a = 0; a < o.length; a++) l[o[a]] = r(o[a]);
  return l;
}
function Be(e, t, r) {
  return r[t] != null ? r[t] : e.props[t];
}
function Df(e, t) {
  return dn(e.children, function (r) {
    return er(r, {
      onExited: t.bind(null, r),
      in: !0,
      appear: Be(r, "appear", e),
      enter: Be(r, "enter", e),
      exit: Be(r, "exit", e),
    });
  });
}
function If(e, t, r) {
  var n = dn(e.children), o = Rf(t, n);
  return Object.keys(o).forEach(function (i) {
    var a = o[i];
    if (tr(a)) {
      var l = i in t, c = i in n, s = t[i], u = tr(s) && !s.props.in;
      c && (!l || u)
        ? o[i] = er(a, {
          onExited: r.bind(null, a),
          in: !0,
          exit: Be(a, "exit", e),
          enter: Be(a, "enter", e),
        })
        : !c && l && !u
        ? o[i] = er(a, { in: !1 })
        : c && l && tr(s) &&
          (o[i] = er(a, {
            onExited: r.bind(null, a),
            in: s.props.in,
            exit: Be(a, "exit", e),
            enter: Be(a, "enter", e),
          }));
    }
  }),
    o;
}
function Ff(e) {
  let {
      className: t,
      classes: r,
      pulsate: n = !1,
      rippleX: o,
      rippleY: i,
      rippleSize: a,
      in: l,
      onExited: c,
      timeout: s,
    } = e,
    [u, p] = rr.useState(!1),
    h = V(t, r.ripple, r.rippleVisible, n && r.ripplePulsate),
    d = { width: a, height: a, top: -(a / 2) + i, left: -(a / 2) + o },
    f = V(r.child, u && r.childLeaving, n && r.childPulsate);
  return !l && !u && p(!0),
    rr.useEffect(() => {
      if (!l && c != null) {
        let m = setTimeout(c, s);
        return () => {
          clearTimeout(m);
        };
      }
    }, [c, l, s]),
    la("span", {
      className: h,
      style: d,
      children: la("span", { className: f }),
    });
}
function Zf(e) {
  return De("MuiButtonBase", e);
}
function ch(e) {
  return De("MuiFab", e);
}
function mh(e) {
  return De("MuiButton", e);
}
function _h(e) {
  return De("MuiToggleButton", e);
}
function $h(e, t) {
  return t === void 0 || e === void 0
    ? !1
    : Array.isArray(t)
    ? t.indexOf(e) >= 0
    : e === t;
}
function Rh(e) {
  return De("MuiToggleButtonGroup", e);
}
function Uh(e) {
  return De("MuiSvgIcon", e);
}
function yt(e, t) {
  let r = (n, o) =>
    Gh(Oa, C({ "data-testid": `${t}Icon`, ref: o }, n, { children: e }));
  return r.muiName = Oa.muiName, ar.memo(ar.forwardRef(r));
}
function im() {
  return T(
    "div",
    null,
    T(rm, { fallback: T("div", null, "Sanyi...") }, T(om, null)),
  );
}
function sm(e) {
  return { __html: e };
}
var rl,
  $t,
  nl,
  ol,
  il,
  al,
  vo,
  sl,
  _e,
  cl,
  ll,
  ae,
  ul,
  pl,
  dl,
  fl,
  hl,
  de,
  ml,
  gl,
  wo,
  xo,
  Rt,
  ko,
  So,
  Eo,
  Oo,
  Co,
  N,
  _o,
  Tr,
  zo,
  To,
  ne,
  jr,
  jo,
  Mo,
  Ao,
  Po,
  $o,
  Ro,
  Do,
  Io,
  Mr,
  Lo,
  No,
  Bo,
  Fo,
  Uo,
  Wo,
  Vo,
  Ho,
  qo,
  Ko,
  Ar,
  yl,
  Zo,
  J,
  Dt,
  M,
  ei,
  Pr,
  $r,
  kl,
  ti,
  Sl,
  It,
  El,
  Nt,
  Ue,
  ni,
  ee,
  B,
  We,
  li,
  Fl,
  Ul,
  Wl,
  ui,
  Vl,
  Hl,
  ql,
  Kl,
  Gl,
  Yl,
  Nr,
  Zl,
  eu,
  tu,
  ru,
  nu,
  hi,
  mi,
  Br,
  gi,
  yi,
  me,
  Vt,
  Fr,
  bi,
  bg,
  Ur,
  Wr,
  Vr,
  iu,
  au,
  su,
  vg,
  T,
  cu,
  Hr,
  wg,
  lu,
  uu,
  Jt,
  qr,
  Si,
  fu,
  Oi,
  wu,
  xu,
  ku,
  Su,
  xg,
  Eu,
  Ou,
  Cu,
  Tu,
  ju,
  Ci,
  _i,
  Mu,
  Au,
  Pu,
  $u,
  Jr,
  Ru,
  Eg,
  ut,
  Xr,
  zi,
  O,
  Te,
  Wu,
  Vu,
  ji,
  Hu,
  Qr,
  Zr,
  Mi,
  Ri,
  Gu,
  Ju,
  Xu,
  Yu,
  Qu,
  Zu,
  ep,
  tp,
  rp,
  np,
  rn,
  op,
  Di,
  ip,
  ap,
  sp,
  cp,
  lp,
  up,
  Ii,
  pp,
  dp,
  fp,
  hp,
  mp,
  gp,
  yp,
  bp,
  vp,
  wp,
  xp,
  kp,
  Sp,
  Ep,
  Li,
  nn,
  on,
  an,
  Op,
  Cp,
  _p,
  zp,
  Tp,
  jp,
  Mp,
  Ap,
  Pp,
  $p,
  Ni,
  Rp,
  Dp,
  Ip,
  Lp,
  Bi,
  Np,
  Bp,
  Fp,
  Up,
  Wp,
  Vp,
  Fi,
  Hp,
  Ui,
  qp,
  Wi,
  Kp,
  Gp,
  Jp,
  Xp,
  Og,
  Cg,
  Yp,
  Qp,
  Vi,
  Zp,
  ed,
  td,
  rd,
  nd,
  od,
  id,
  ad,
  sd,
  Hi,
  qi,
  cd,
  Ki,
  Gi,
  dd,
  fd,
  md,
  gd,
  bd,
  cn,
  wd,
  xd,
  Od,
  Cd,
  zd,
  Td,
  jd,
  Md,
  Ad,
  Pd,
  $d,
  Rd,
  Dd,
  qd,
  mt,
  Kd,
  Gd,
  Jd,
  qe,
  Xd,
  Ke,
  Yd,
  gt,
  Qd,
  Ge,
  Zd,
  Je,
  ef,
  Xe,
  tf,
  ea,
  un,
  uf,
  ra,
  na,
  ff,
  hf,
  mf,
  gf,
  yf,
  bf,
  vf,
  wf,
  Sf,
  Ef,
  Of,
  _f,
  zf,
  ia,
  aa,
  Tf,
  ge,
  sa,
  Qt,
  jf,
  _g,
  ca,
  Tg,
  Lf,
  Nf,
  fn,
  Bf,
  Ag,
  Uf,
  Wf,
  se,
  Vf,
  nr,
  ua,
  pa,
  da,
  fa,
  mn,
  Hf,
  qf,
  Kf,
  Gf,
  Jf,
  Xf,
  Yf,
  Qf,
  eh,
  th,
  oh,
  ih,
  ah,
  sh,
  gn,
  F,
  lh,
  ha,
  ph,
  dh,
  fh,
  hh,
  ma,
  Lg,
  gh,
  ir,
  yh,
  bh,
  wh,
  xh,
  ba,
  kh,
  Sh,
  Eh,
  Oh,
  Ch,
  Fg,
  zh,
  wa,
  jh,
  Mh,
  Ah,
  Ph,
  xa,
  Wg,
  Vg,
  Dh,
  ve,
  Lh,
  Nh,
  Bh,
  Fh,
  ka,
  qg,
  Kg,
  Hh,
  qh,
  Kh,
  Ea,
  Oa,
  Jh,
  Xh,
  Yh,
  Qh,
  Zh,
  em,
  tm,
  rm,
  Ca,
  nm,
  om,
  Yg,
  am,
  bt,
  cm,
  lm,
  za = Y(() => {
    rl = Object.create,
      $t = Object.defineProperty,
      nl = Object.getOwnPropertyDescriptor,
      ol = Object.getOwnPropertyNames,
      il = Object.getPrototypeOf,
      al = Object.prototype.hasOwnProperty,
      vo = (e) => $t(e, "__esModule", { value: !0 }),
      sl = (e, t) => () => (e && (t = e(e = 0)), t),
      _e = (e, t) =>
        () => (t || e((t = { exports: {} }).exports, t), t.exports),
      cl = (e, t) => {
        vo(e);
        for (var r in t) $t(e, r, { get: t[r], enumerable: !0 });
      },
      ll = (e, t, r) => {
        if (t && typeof t == "object" || typeof t == "function") {
          for (let n of ol(t)) {
            !al.call(e, n) && n !== "default" && $t(e, n, {
              get: () => t[n],
              enumerable: !(r = nl(t, n)) || r.enumerable,
            });
          }
        }
        return e;
      },
      ae = (e) =>
        ll(
          vo($t(
            e != null ? rl(il(e)) : {},
            "default",
            e && e.__esModule && "default" in e
              ? { get: () => e.default, enumerable: !0 }
              : { value: e, enumerable: !0 },
          )),
          e,
        ),
      ul = _e((e) => {
        "use strict";
        var t = typeof Symbol == "function" && Symbol.for,
          r = t ? Symbol.for("react.element") : 60103,
          n = t ? Symbol.for("react.portal") : 60106,
          o = t ? Symbol.for("react.fragment") : 60107,
          i = t ? Symbol.for("react.strict_mode") : 60108,
          a = t ? Symbol.for("react.profiler") : 60114,
          l = t ? Symbol.for("react.provider") : 60109,
          c = t ? Symbol.for("react.context") : 60110,
          s = t ? Symbol.for("react.async_mode") : 60111,
          u = t ? Symbol.for("react.concurrent_mode") : 60111,
          p = t ? Symbol.for("react.forward_ref") : 60112,
          h = t ? Symbol.for("react.suspense") : 60113,
          d = t ? Symbol.for("react.suspense_list") : 60120,
          f = t ? Symbol.for("react.memo") : 60115,
          m = t ? Symbol.for("react.lazy") : 60116,
          y = t ? Symbol.for("react.block") : 60121,
          v = t ? Symbol.for("react.fundamental") : 60117,
          g = t ? Symbol.for("react.responder") : 60118,
          b = t ? Symbol.for("react.scope") : 60119;
        function x(w) {
          if (typeof w == "object" && w !== null) {
            var k = w.$$typeof;
            switch (k) {
              case r:
                switch (w = w.type, w) {
                  case s:
                  case u:
                  case o:
                  case a:
                  case i:
                  case h:
                    return w;
                  default:
                    switch (w = w && w.$$typeof, w) {
                      case c:
                      case p:
                      case m:
                      case f:
                      case l:
                        return w;
                      default:
                        return k;
                    }
                }
              case n:
                return k;
            }
          }
        }
        function S(w) {
          return x(w) === u;
        }
        e.AsyncMode = s,
          e.ConcurrentMode = u,
          e.ContextConsumer = c,
          e.ContextProvider = l,
          e.Element = r,
          e.ForwardRef = p,
          e.Fragment = o,
          e.Lazy = m,
          e.Memo = f,
          e.Portal = n,
          e.Profiler = a,
          e.StrictMode = i,
          e.Suspense = h,
          e.isAsyncMode = function (w) {
            return S(w) || x(w) === s;
          },
          e.isConcurrentMode = S,
          e.isContextConsumer = function (w) {
            return x(w) === c;
          },
          e.isContextProvider = function (w) {
            return x(w) === l;
          },
          e.isElement = function (w) {
            return typeof w == "object" && w !== null && w.$$typeof === r;
          },
          e.isForwardRef = function (w) {
            return x(w) === p;
          },
          e.isFragment = function (w) {
            return x(w) === o;
          },
          e.isLazy = function (w) {
            return x(w) === m;
          },
          e.isMemo = function (w) {
            return x(w) === f;
          },
          e.isPortal = function (w) {
            return x(w) === n;
          },
          e.isProfiler = function (w) {
            return x(w) === a;
          },
          e.isStrictMode = function (w) {
            return x(w) === i;
          },
          e.isSuspense = function (w) {
            return x(w) === h;
          },
          e.isValidElementType = function (w) {
            return typeof w == "string" || typeof w == "function" || w === o ||
              w === u || w === a || w === i || w === h || w === d ||
              typeof w == "object" && w !== null &&
                (w.$$typeof === m || w.$$typeof === f || w.$$typeof === l ||
                  w.$$typeof === c || w.$$typeof === p || w.$$typeof === v ||
                  w.$$typeof === g || w.$$typeof === b || w.$$typeof === y);
          },
          e.typeOf = x;
      }),
      pl = _e((e, t) => {
        "use strict";
        t.exports = ul();
      }),
      dl = _e((e, t) => {
        "use strict";
        var r = pl(),
          n = {
            childContextTypes: !0,
            contextType: !0,
            contextTypes: !0,
            defaultProps: !0,
            displayName: !0,
            getDefaultProps: !0,
            getDerivedStateFromError: !0,
            getDerivedStateFromProps: !0,
            mixins: !0,
            propTypes: !0,
            type: !0,
          },
          o = {
            name: !0,
            length: !0,
            prototype: !0,
            caller: !0,
            callee: !0,
            arguments: !0,
            arity: !0,
          },
          i = {
            $$typeof: !0,
            render: !0,
            defaultProps: !0,
            displayName: !0,
            propTypes: !0,
          },
          a = {
            $$typeof: !0,
            compare: !0,
            defaultProps: !0,
            displayName: !0,
            propTypes: !0,
            type: !0,
          },
          l = {};
        l[r.ForwardRef] = i, l[r.Memo] = a;
        function c(y) {
          return r.isMemo(y) ? a : l[y.$$typeof] || n;
        }
        var s = Object.defineProperty,
          u = Object.getOwnPropertyNames,
          p = Object.getOwnPropertySymbols,
          h = Object.getOwnPropertyDescriptor,
          d = Object.getPrototypeOf,
          f = Object.prototype;
        function m(y, v, g) {
          if (typeof v != "string") {
            if (f) {
              var b = d(v);
              b && b !== f && m(y, b, g);
            }
            var x = u(v);
            p && (x = x.concat(p(v)));
            for (var S = c(y), w = c(v), k = 0; k < x.length; ++k) {
              var j = x[k];
              if (!o[j] && !(g && g[j]) && !(w && w[j]) && !(S && S[j])) {
                var D = h(v, j);
                try {
                  s(y, j, D);
                } catch (K) {}
              }
            }
          }
          return y;
        }
        t.exports = m;
      }),
      fl = _e((e, t) => {
        "use strict";
        var r = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
        t.exports = r;
      }),
      hl = _e((e, t) => {
        "use strict";
        var r = fl();
        function n() {}
        function o() {}
        o.resetWarningCache = n,
          t.exports = function () {
            function i(c, s, u, p, h, d) {
              if (d !== r) {
                var f = new Error(
                  "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
                );
                throw f.name = "Invariant Violation", f;
              }
            }
            i.isRequired = i;
            function a() {
              return i;
            }
            var l = {
              array: i,
              bool: i,
              func: i,
              number: i,
              object: i,
              string: i,
              symbol: i,
              any: i,
              arrayOf: a,
              element: i,
              elementType: i,
              instanceOf: a,
              node: i,
              objectOf: a,
              oneOf: a,
              oneOfType: a,
              shape: a,
              exact: a,
              checkPropTypes: o,
              resetWarningCache: n,
            };
            return l.PropTypes = l, l;
          };
      }),
      de = _e((e, t) => {
        t.exports = hl()();
        var r, n;
      }),
      ml = _e((e) => {
        "use strict";
        var t = 60103,
          r = 60106,
          n = 60107,
          o = 60108,
          i = 60114,
          a = 60109,
          l = 60110,
          c = 60112,
          s = 60113,
          u = 60120,
          p = 60115,
          h = 60116,
          d = 60121,
          f = 60122,
          m = 60117,
          y = 60129,
          v = 60131;
        typeof Symbol == "function" && Symbol.for &&
          (g = Symbol.for,
            t = g("react.element"),
            r = g("react.portal"),
            n = g("react.fragment"),
            o = g("react.strict_mode"),
            i = g("react.profiler"),
            a = g("react.provider"),
            l = g("react.context"),
            c = g("react.forward_ref"),
            s = g("react.suspense"),
            u = g("react.suspense_list"),
            p = g("react.memo"),
            h = g("react.lazy"),
            d = g("react.block"),
            f = g("react.server.block"),
            m = g("react.fundamental"),
            y = g("react.debug_trace_mode"),
            v = g("react.legacy_hidden"));
        var g;
        function b(E) {
          if (typeof E == "object" && E !== null) {
            var re = E.$$typeof;
            switch (re) {
              case t:
                switch (E = E.type, E) {
                  case n:
                  case i:
                  case o:
                  case s:
                  case u:
                    return E;
                  default:
                    switch (E = E && E.$$typeof, E) {
                      case l:
                      case c:
                      case h:
                      case p:
                      case a:
                        return E;
                      default:
                        return re;
                    }
                }
              case r:
                return re;
            }
          }
        }
        var x = a,
          S = t,
          w = c,
          k = n,
          j = h,
          D = p,
          K = r,
          G = i,
          ie = o,
          Q = s;
        e.ContextConsumer = l,
          e.ContextProvider = x,
          e.Element = S,
          e.ForwardRef = w,
          e.Fragment = k,
          e.Lazy = j,
          e.Memo = D,
          e.Portal = K,
          e.Profiler = G,
          e.StrictMode = ie,
          e.Suspense = Q,
          e.isAsyncMode = function () {
            return !1;
          },
          e.isConcurrentMode = function () {
            return !1;
          },
          e.isContextConsumer = function (E) {
            return b(E) === l;
          },
          e.isContextProvider = function (E) {
            return b(E) === a;
          },
          e.isElement = function (E) {
            return typeof E == "object" && E !== null && E.$$typeof === t;
          },
          e.isForwardRef = function (E) {
            return b(E) === c;
          },
          e.isFragment = function (E) {
            return b(E) === n;
          },
          e.isLazy = function (E) {
            return b(E) === h;
          },
          e.isMemo = function (E) {
            return b(E) === p;
          },
          e.isPortal = function (E) {
            return b(E) === r;
          },
          e.isProfiler = function (E) {
            return b(E) === i;
          },
          e.isStrictMode = function (E) {
            return b(E) === o;
          },
          e.isSuspense = function (E) {
            return b(E) === s;
          },
          e.isValidElementType = function (E) {
            return typeof E == "string" || typeof E == "function" || E === n ||
              E === i || E === y || E === o || E === s || E === u || E === v ||
              typeof E == "object" && E !== null &&
                (E.$$typeof === h || E.$$typeof === p || E.$$typeof === a ||
                  E.$$typeof === l || E.$$typeof === c || E.$$typeof === m ||
                  E.$$typeof === d || E[0] === f);
          },
          e.typeOf = b;
      }),
      gl = _e((e, t) => {
        "use strict";
        t.exports = ml();
      }),
      wo = {};
    cl(wo, { QRious: () => Ar });
    yl = sl(() => {
      xo = Object.create,
        Rt = Object.defineProperty,
        ko = Object.getOwnPropertyDescriptor,
        So = Object.getOwnPropertyNames,
        Eo = Object.getPrototypeOf,
        Oo = Object.prototype.hasOwnProperty,
        Co = (e) => Rt(e, "__esModule", { value: !0 }),
        N = (e, t) =>
          () => (t || e((t = { exports: {} }).exports, t), t.exports),
        _o = (e, t, r) => {
          if (t && typeof t == "object" || typeof t == "function") {
            for (let n of So(t)) {
              !Oo.call(e, n) && n !== "default" &&
                Rt(e, n, {
                  get: () => t[n],
                  enumerable: !(r = ko(t, n)) || r.enumerable,
                });
            }
          }
          return e;
        },
        Tr = (e) =>
          _o(
            Co(Rt(
              e != null ? xo(Eo(e)) : {},
              "default",
              e && e.__esModule && "default" in e
                ? { get: () => e.default, enumerable: !0 }
                : { value: e, enumerable: !0 },
            )),
            e,
          ),
        zo = N((e, t) => {
          "use strict";
          var r = function () {},
            n = Object.prototype.hasOwnProperty,
            o = Array.prototype.slice;
          function i(c, s) {
            var u;
            return typeof Object.create == "function"
              ? u = Object.create(c)
              : (r.prototype = c, u = new r(), r.prototype = null),
              s && l(!0, u, s),
              u;
          }
          function a(c, s, u, p) {
            var h = this;
            return typeof c != "string" && (p = u, u = s, s = c, c = null),
              typeof s != "function" && (p = u,
                u = s,
                s = function () {
                  return h.apply(this, arguments);
                }),
              l(!1, s, h, p),
              s.prototype = i(h.prototype, u),
              s.prototype.constructor = s,
              s.class_ = c || h.class_,
              s.super_ = h,
              s;
          }
          function l(c, s, u) {
            u = o.call(arguments, 2);
            for (var p, h, d = 0, f = u.length; d < f; d++) {
              h = u[d];
              for (p in h) (!c || n.call(h, p)) && (s[p] = h[p]);
            }
          }
          t.exports = a;
        }),
        To = N((e, t) => {
          "use strict";
          var r = zo();
          function n() {}
          n.class_ = "Nevis", n.super_ = Object, n.extend = r, t.exports = n;
        }),
        ne = N((e, t) => {
          "use strict";
          t.exports = To();
        }),
        jr = N((e, t) => {
          "use strict";
          var r = ne(),
            n = r.extend(function (o, i, a) {
              this.qrious = o,
                this.element = i,
                this.element.qrious = o,
                this.enabled = Boolean(a);
            }, {
              draw: function (o) {},
              getElement: function () {
                return this.enabled || (this.enabled = !0, this.render()),
                  this.element;
              },
              getModuleSize: function (o) {
                var i = this.qrious,
                  a = i.padding || 0,
                  l = Math.floor((i.size - a * 2) / o.width);
                return Math.max(1, l);
              },
              getOffset: function (o) {
                var i = this.qrious, a = i.padding;
                if (a != null) return a;
                var l = this.getModuleSize(o),
                  c = Math.floor((i.size - l * o.width) / 2);
                return Math.max(0, c);
              },
              render: function (o) {
                this.enabled && (this.resize(), this.reset(), this.draw(o));
              },
              reset: function () {},
              resize: function () {},
            });
          t.exports = n;
        }),
        jo = N((e, t) => {
          "use strict";
          var r = jr(),
            n = r.extend({
              draw: function (o) {
                var i,
                  a,
                  l = this.qrious,
                  c = this.getModuleSize(o),
                  s = this.getOffset(o),
                  u = this.element.getContext("2d");
                for (
                  u.fillStyle = l.foreground,
                    u.globalAlpha = l.foregroundAlpha,
                    i = 0;
                  i < o.width;
                  i++
                ) {
                  for (a = 0; a < o.width; a++) {
                    o.buffer[a * o.width + i] &&
                      u.fillRect(c * i + s, c * a + s, c, c);
                  }
                }
              },
              reset: function () {
                var o = this.qrious,
                  i = this.element.getContext("2d"),
                  a = o.size;
                i.lineWidth = 1,
                  i.clearRect(0, 0, a, a),
                  i.fillStyle = o.background,
                  i.globalAlpha = o.backgroundAlpha,
                  i.fillRect(0, 0, a, a);
              },
              resize: function () {
                var o = this.element;
                o.width = o.height = this.qrious.size;
              },
            });
          t.exports = n;
        }),
        Mo = N((e, t) => {
          "use strict";
          var r = ne(),
            n = r.extend(null, {
              BLOCK: [
                0,
                11,
                15,
                19,
                23,
                27,
                31,
                16,
                18,
                20,
                22,
                24,
                26,
                28,
                20,
                22,
                24,
                24,
                26,
                28,
                28,
                22,
                24,
                24,
                26,
                26,
                28,
                28,
                24,
                24,
                26,
                26,
                26,
                28,
                28,
                24,
                26,
                26,
                26,
                28,
                28,
              ],
            });
          t.exports = n;
        }),
        Ao = N((e, t) => {
          "use strict";
          var r = ne(),
            n = r.extend(null, {
              BLOCKS: [
                1,
                0,
                19,
                7,
                1,
                0,
                16,
                10,
                1,
                0,
                13,
                13,
                1,
                0,
                9,
                17,
                1,
                0,
                34,
                10,
                1,
                0,
                28,
                16,
                1,
                0,
                22,
                22,
                1,
                0,
                16,
                28,
                1,
                0,
                55,
                15,
                1,
                0,
                44,
                26,
                2,
                0,
                17,
                18,
                2,
                0,
                13,
                22,
                1,
                0,
                80,
                20,
                2,
                0,
                32,
                18,
                2,
                0,
                24,
                26,
                4,
                0,
                9,
                16,
                1,
                0,
                108,
                26,
                2,
                0,
                43,
                24,
                2,
                2,
                15,
                18,
                2,
                2,
                11,
                22,
                2,
                0,
                68,
                18,
                4,
                0,
                27,
                16,
                4,
                0,
                19,
                24,
                4,
                0,
                15,
                28,
                2,
                0,
                78,
                20,
                4,
                0,
                31,
                18,
                2,
                4,
                14,
                18,
                4,
                1,
                13,
                26,
                2,
                0,
                97,
                24,
                2,
                2,
                38,
                22,
                4,
                2,
                18,
                22,
                4,
                2,
                14,
                26,
                2,
                0,
                116,
                30,
                3,
                2,
                36,
                22,
                4,
                4,
                16,
                20,
                4,
                4,
                12,
                24,
                2,
                2,
                68,
                18,
                4,
                1,
                43,
                26,
                6,
                2,
                19,
                24,
                6,
                2,
                15,
                28,
                4,
                0,
                81,
                20,
                1,
                4,
                50,
                30,
                4,
                4,
                22,
                28,
                3,
                8,
                12,
                24,
                2,
                2,
                92,
                24,
                6,
                2,
                36,
                22,
                4,
                6,
                20,
                26,
                7,
                4,
                14,
                28,
                4,
                0,
                107,
                26,
                8,
                1,
                37,
                22,
                8,
                4,
                20,
                24,
                12,
                4,
                11,
                22,
                3,
                1,
                115,
                30,
                4,
                5,
                40,
                24,
                11,
                5,
                16,
                20,
                11,
                5,
                12,
                24,
                5,
                1,
                87,
                22,
                5,
                5,
                41,
                24,
                5,
                7,
                24,
                30,
                11,
                7,
                12,
                24,
                5,
                1,
                98,
                24,
                7,
                3,
                45,
                28,
                15,
                2,
                19,
                24,
                3,
                13,
                15,
                30,
                1,
                5,
                107,
                28,
                10,
                1,
                46,
                28,
                1,
                15,
                22,
                28,
                2,
                17,
                14,
                28,
                5,
                1,
                120,
                30,
                9,
                4,
                43,
                26,
                17,
                1,
                22,
                28,
                2,
                19,
                14,
                28,
                3,
                4,
                113,
                28,
                3,
                11,
                44,
                26,
                17,
                4,
                21,
                26,
                9,
                16,
                13,
                26,
                3,
                5,
                107,
                28,
                3,
                13,
                41,
                26,
                15,
                5,
                24,
                30,
                15,
                10,
                15,
                28,
                4,
                4,
                116,
                28,
                17,
                0,
                42,
                26,
                17,
                6,
                22,
                28,
                19,
                6,
                16,
                30,
                2,
                7,
                111,
                28,
                17,
                0,
                46,
                28,
                7,
                16,
                24,
                30,
                34,
                0,
                13,
                24,
                4,
                5,
                121,
                30,
                4,
                14,
                47,
                28,
                11,
                14,
                24,
                30,
                16,
                14,
                15,
                30,
                6,
                4,
                117,
                30,
                6,
                14,
                45,
                28,
                11,
                16,
                24,
                30,
                30,
                2,
                16,
                30,
                8,
                4,
                106,
                26,
                8,
                13,
                47,
                28,
                7,
                22,
                24,
                30,
                22,
                13,
                15,
                30,
                10,
                2,
                114,
                28,
                19,
                4,
                46,
                28,
                28,
                6,
                22,
                28,
                33,
                4,
                16,
                30,
                8,
                4,
                122,
                30,
                22,
                3,
                45,
                28,
                8,
                26,
                23,
                30,
                12,
                28,
                15,
                30,
                3,
                10,
                117,
                30,
                3,
                23,
                45,
                28,
                4,
                31,
                24,
                30,
                11,
                31,
                15,
                30,
                7,
                7,
                116,
                30,
                21,
                7,
                45,
                28,
                1,
                37,
                23,
                30,
                19,
                26,
                15,
                30,
                5,
                10,
                115,
                30,
                19,
                10,
                47,
                28,
                15,
                25,
                24,
                30,
                23,
                25,
                15,
                30,
                13,
                3,
                115,
                30,
                2,
                29,
                46,
                28,
                42,
                1,
                24,
                30,
                23,
                28,
                15,
                30,
                17,
                0,
                115,
                30,
                10,
                23,
                46,
                28,
                10,
                35,
                24,
                30,
                19,
                35,
                15,
                30,
                17,
                1,
                115,
                30,
                14,
                21,
                46,
                28,
                29,
                19,
                24,
                30,
                11,
                46,
                15,
                30,
                13,
                6,
                115,
                30,
                14,
                23,
                46,
                28,
                44,
                7,
                24,
                30,
                59,
                1,
                16,
                30,
                12,
                7,
                121,
                30,
                12,
                26,
                47,
                28,
                39,
                14,
                24,
                30,
                22,
                41,
                15,
                30,
                6,
                14,
                121,
                30,
                6,
                34,
                47,
                28,
                46,
                10,
                24,
                30,
                2,
                64,
                15,
                30,
                17,
                4,
                122,
                30,
                29,
                14,
                46,
                28,
                49,
                10,
                24,
                30,
                24,
                46,
                15,
                30,
                4,
                18,
                122,
                30,
                13,
                32,
                46,
                28,
                48,
                14,
                24,
                30,
                42,
                32,
                15,
                30,
                20,
                4,
                117,
                30,
                40,
                7,
                47,
                28,
                43,
                22,
                24,
                30,
                10,
                67,
                15,
                30,
                19,
                6,
                118,
                30,
                18,
                31,
                47,
                28,
                34,
                34,
                24,
                30,
                20,
                61,
                15,
                30,
              ],
              FINAL_FORMAT: [
                30660,
                29427,
                32170,
                30877,
                26159,
                25368,
                27713,
                26998,
                21522,
                20773,
                24188,
                23371,
                17913,
                16590,
                20375,
                19104,
                13663,
                12392,
                16177,
                14854,
                9396,
                8579,
                11994,
                11245,
                5769,
                5054,
                7399,
                6608,
                1890,
                597,
                3340,
                2107,
              ],
              LEVELS: { L: 1, M: 2, Q: 3, H: 4 },
            });
          t.exports = n;
        }),
        Po = N((e, t) => {
          "use strict";
          var r = ne(),
            n = r.extend(null, {
              EXPONENT: [
                1,
                2,
                4,
                8,
                16,
                32,
                64,
                128,
                29,
                58,
                116,
                232,
                205,
                135,
                19,
                38,
                76,
                152,
                45,
                90,
                180,
                117,
                234,
                201,
                143,
                3,
                6,
                12,
                24,
                48,
                96,
                192,
                157,
                39,
                78,
                156,
                37,
                74,
                148,
                53,
                106,
                212,
                181,
                119,
                238,
                193,
                159,
                35,
                70,
                140,
                5,
                10,
                20,
                40,
                80,
                160,
                93,
                186,
                105,
                210,
                185,
                111,
                222,
                161,
                95,
                190,
                97,
                194,
                153,
                47,
                94,
                188,
                101,
                202,
                137,
                15,
                30,
                60,
                120,
                240,
                253,
                231,
                211,
                187,
                107,
                214,
                177,
                127,
                254,
                225,
                223,
                163,
                91,
                182,
                113,
                226,
                217,
                175,
                67,
                134,
                17,
                34,
                68,
                136,
                13,
                26,
                52,
                104,
                208,
                189,
                103,
                206,
                129,
                31,
                62,
                124,
                248,
                237,
                199,
                147,
                59,
                118,
                236,
                197,
                151,
                51,
                102,
                204,
                133,
                23,
                46,
                92,
                184,
                109,
                218,
                169,
                79,
                158,
                33,
                66,
                132,
                21,
                42,
                84,
                168,
                77,
                154,
                41,
                82,
                164,
                85,
                170,
                73,
                146,
                57,
                114,
                228,
                213,
                183,
                115,
                230,
                209,
                191,
                99,
                198,
                145,
                63,
                126,
                252,
                229,
                215,
                179,
                123,
                246,
                241,
                255,
                227,
                219,
                171,
                75,
                150,
                49,
                98,
                196,
                149,
                55,
                110,
                220,
                165,
                87,
                174,
                65,
                130,
                25,
                50,
                100,
                200,
                141,
                7,
                14,
                28,
                56,
                112,
                224,
                221,
                167,
                83,
                166,
                81,
                162,
                89,
                178,
                121,
                242,
                249,
                239,
                195,
                155,
                43,
                86,
                172,
                69,
                138,
                9,
                18,
                36,
                72,
                144,
                61,
                122,
                244,
                245,
                247,
                243,
                251,
                235,
                203,
                139,
                11,
                22,
                44,
                88,
                176,
                125,
                250,
                233,
                207,
                131,
                27,
                54,
                108,
                216,
                173,
                71,
                142,
                0,
              ],
              LOG: [
                255,
                0,
                1,
                25,
                2,
                50,
                26,
                198,
                3,
                223,
                51,
                238,
                27,
                104,
                199,
                75,
                4,
                100,
                224,
                14,
                52,
                141,
                239,
                129,
                28,
                193,
                105,
                248,
                200,
                8,
                76,
                113,
                5,
                138,
                101,
                47,
                225,
                36,
                15,
                33,
                53,
                147,
                142,
                218,
                240,
                18,
                130,
                69,
                29,
                181,
                194,
                125,
                106,
                39,
                249,
                185,
                201,
                154,
                9,
                120,
                77,
                228,
                114,
                166,
                6,
                191,
                139,
                98,
                102,
                221,
                48,
                253,
                226,
                152,
                37,
                179,
                16,
                145,
                34,
                136,
                54,
                208,
                148,
                206,
                143,
                150,
                219,
                189,
                241,
                210,
                19,
                92,
                131,
                56,
                70,
                64,
                30,
                66,
                182,
                163,
                195,
                72,
                126,
                110,
                107,
                58,
                40,
                84,
                250,
                133,
                186,
                61,
                202,
                94,
                155,
                159,
                10,
                21,
                121,
                43,
                78,
                212,
                229,
                172,
                115,
                243,
                167,
                87,
                7,
                112,
                192,
                247,
                140,
                128,
                99,
                13,
                103,
                74,
                222,
                237,
                49,
                197,
                254,
                24,
                227,
                165,
                153,
                119,
                38,
                184,
                180,
                124,
                17,
                68,
                146,
                217,
                35,
                32,
                137,
                46,
                55,
                63,
                209,
                91,
                149,
                188,
                207,
                205,
                144,
                135,
                151,
                178,
                220,
                252,
                190,
                97,
                242,
                86,
                211,
                171,
                20,
                42,
                93,
                158,
                132,
                60,
                57,
                83,
                71,
                109,
                65,
                162,
                31,
                45,
                67,
                216,
                183,
                123,
                164,
                118,
                196,
                23,
                73,
                236,
                127,
                12,
                111,
                246,
                108,
                161,
                59,
                82,
                41,
                157,
                85,
                170,
                251,
                96,
                134,
                177,
                187,
                204,
                62,
                90,
                203,
                89,
                95,
                176,
                156,
                169,
                160,
                81,
                11,
                245,
                22,
                235,
                122,
                117,
                44,
                215,
                79,
                174,
                213,
                233,
                230,
                231,
                173,
                232,
                116,
                214,
                244,
                234,
                168,
                80,
                88,
                175,
              ],
            });
          t.exports = n;
        }),
        $o = N((e, t) => {
          "use strict";
          var r = ne(),
            n = r.extend(null, {
              BLOCK: [
                3220,
                1468,
                2713,
                1235,
                3062,
                1890,
                2119,
                1549,
                2344,
                2936,
                1117,
                2583,
                1330,
                2470,
                1667,
                2249,
                2028,
                3780,
                481,
                4011,
                142,
                3098,
                831,
                3445,
                592,
                2517,
                1776,
                2234,
                1951,
                2827,
                1070,
                2660,
                1345,
                3177,
              ],
            });
          t.exports = n;
        }),
        Ro = N((e, t) => {
          "use strict";
          var r = ne(),
            n = Mo(),
            o = Ao(),
            i = Po(),
            a = $o(),
            l = r.extend(function (c) {
              var s, u, p, h, d, f = c.value.length;
              for (
                this._badness = [],
                  this._level = o.LEVELS[c.level],
                  this._polynomial = [],
                  this._value = c.value,
                  this._version = 0,
                  this._stringBuffer = [];
                this._version < 40 &&
                (this._version++,
                  p = (this._level - 1) * 4 + (this._version - 1) * 16,
                  h = o.BLOCKS[p++],
                  d = o.BLOCKS[p++],
                  s = o.BLOCKS[p++],
                  u = o.BLOCKS[p],
                  p = s * (h + d) + d - 3 + (this._version <= 9),
                  !(f <= p));
              );
              this._dataBlock = s,
                this._eccBlock = u,
                this._neccBlock1 = h,
                this._neccBlock2 = d;
              var m = this.width = 17 + 4 * this._version;
              this.buffer = l._createArray(m * m),
                this._ecc = l._createArray(s + (s + u) * (h + d) + d),
                this._mask = l._createArray((m * (m + 1) + 1) / 2),
                this._insertFinders(),
                this._insertAlignments(),
                this.buffer[8 + m * (m - 8)] = 1,
                this._insertTimingGap(),
                this._reverseMask(),
                this._insertTimingRowAndColumn(),
                this._insertVersion(),
                this._syncMask(),
                this._convertBitStream(f),
                this._calculatePolynomial(),
                this._appendEccToData(),
                this._interleaveBlocks(),
                this._pack(),
                this._finish();
            }, {
              _addAlignment: function (c, s) {
                var u, p = this.buffer, h = this.width;
                for (p[c + h * s] = 1, u = -2; u < 2; u++) {
                  p[c + u + h * (s - 2)] = 1,
                    p[c - 2 + h * (s + u + 1)] = 1,
                    p[c + 2 + h * (s + u)] = 1,
                    p[c + u + 1 + h * (s + 2)] = 1;
                }
                for (u = 0; u < 2; u++) {
                  this._setMask(c - 1, s + u),
                    this._setMask(c + 1, s - u),
                    this._setMask(c - u, s - 1),
                    this._setMask(c + u, s + 1);
                }
              },
              _appendData: function (c, s, u, p) {
                var h, d, f, m = this._polynomial, y = this._stringBuffer;
                for (d = 0; d < p; d++) y[u + d] = 0;
                for (d = 0; d < s; d++) {
                  if (h = i.LOG[y[c + d] ^ y[u]], h !== 255) {
                    for (f = 1; f < p; f++) {
                      y[u + f - 1] = y[u + f] ^
                        i.EXPONENT[l._modN(h + m[p - f])];
                    }
                  } else for (f = u; f < u + p; f++) y[f] = y[f + 1];
                  y[u + p - 1] = h === 255 ? 0 : i.EXPONENT[l._modN(h + m[0])];
                }
              },
              _appendEccToData: function () {
                var c,
                  s = 0,
                  u = this._dataBlock,
                  p = this._calculateMaxLength(),
                  h = this._eccBlock;
                for (c = 0; c < this._neccBlock1; c++) {
                  this._appendData(s, u, p, h), s += u, p += h;
                }
                for (c = 0; c < this._neccBlock2; c++) {
                  this._appendData(s, u + 1, p, h), s += u + 1, p += h;
                }
              },
              _applyMask: function (c) {
                var s, u, p, h, d = this.buffer, f = this.width;
                switch (c) {
                  case 0:
                    for (h = 0; h < f; h++) {
                      for (p = 0; p < f; p++) {
                        !(p + h & 1) && !this._isMasked(p, h) &&
                          (d[p + h * f] ^= 1);
                      }
                    }
                    break;
                  case 1:
                    for (h = 0; h < f; h++) {
                      for (p = 0; p < f; p++) {
                        !(h & 1) && !this._isMasked(p, h) &&
                          (d[p + h * f] ^= 1);
                      }
                    }
                    break;
                  case 2:
                    for (h = 0; h < f; h++) {
                      for (s = 0, p = 0; p < f; p++, s++) {
                        s === 3 && (s = 0),
                          !s && !this._isMasked(p, h) && (d[p + h * f] ^= 1);
                      }
                    }
                    break;
                  case 3:
                    for (u = 0, h = 0; h < f; h++, u++) {
                      for (u === 3 && (u = 0), s = u, p = 0; p < f; p++, s++) {
                        s === 3 && (s = 0),
                          !s && !this._isMasked(p, h) && (d[p + h * f] ^= 1);
                      }
                    }
                    break;
                  case 4:
                    for (h = 0; h < f; h++) {
                      for (s = 0, u = h >> 1 & 1, p = 0; p < f; p++, s++) {
                        s === 3 && (s = 0, u = !u),
                          !u && !this._isMasked(p, h) && (d[p + h * f] ^= 1);
                      }
                    }
                    break;
                  case 5:
                    for (u = 0, h = 0; h < f; h++, u++) {
                      for (u === 3 && (u = 0), s = 0, p = 0; p < f; p++, s++) {
                        s === 3 && (s = 0),
                          !((p & h & 1) + !(!s | !u)) &&
                          !this._isMasked(p, h) && (d[p + h * f] ^= 1);
                      }
                    }
                    break;
                  case 6:
                    for (u = 0, h = 0; h < f; h++, u++) {
                      for (u === 3 && (u = 0), s = 0, p = 0; p < f; p++, s++) {
                        s === 3 && (s = 0),
                          !((p & h & 1) + (s && s === u) & 1) &&
                          !this._isMasked(p, h) && (d[p + h * f] ^= 1);
                      }
                    }
                    break;
                  case 7:
                    for (u = 0, h = 0; h < f; h++, u++) {
                      for (u === 3 && (u = 0), s = 0, p = 0; p < f; p++, s++) {
                        s === 3 && (s = 0),
                          !((s && s === u) + (p + h & 1) & 1) &&
                          !this._isMasked(p, h) && (d[p + h * f] ^= 1);
                      }
                    }
                    break;
                }
              },
              _calculateMaxLength: function () {
                return this._dataBlock * (this._neccBlock1 + this._neccBlock2) +
                  this._neccBlock2;
              },
              _calculatePolynomial: function () {
                var c, s, u = this._eccBlock, p = this._polynomial;
                for (p[0] = 1, c = 0; c < u; c++) {
                  for (p[c + 1] = 1, s = c; s > 0; s--) {
                    p[s] = p[s]
                      ? p[s - 1] ^ i.EXPONENT[l._modN(i.LOG[p[s]] + c)]
                      : p[s - 1];
                  }
                  p[0] = i.EXPONENT[l._modN(i.LOG[p[0]] + c)];
                }
                for (c = 0; c <= u; c++) p[c] = i.LOG[p[c]];
              },
              _checkBadness: function () {
                var c,
                  s,
                  u,
                  p,
                  h,
                  d = 0,
                  f = this._badness,
                  m = this.buffer,
                  y = this.width;
                for (h = 0; h < y - 1; h++) {
                  for (p = 0; p < y - 1; p++) {
                    (m[p + y * h] && m[p + 1 + y * h] && m[p + y * (h + 1)] &&
                        m[p + 1 + y * (h + 1)] ||
                      !(m[p + y * h] || m[p + 1 + y * h] ||
                        m[p + y * (h + 1)] || m[p + 1 + y * (h + 1)])) &&
                      (d += l.N2);
                  }
                }
                var v = 0;
                for (h = 0; h < y; h++) {
                  for (u = 0, f[0] = 0, c = 0, p = 0; p < y; p++) {
                    s = m[p + y * h],
                      c === s ? f[u]++ : f[++u] = 1,
                      c = s,
                      v += c ? 1 : -1;
                  }
                  d += this._getBadness(u);
                }
                v < 0 && (v = -v);
                var g = 0, b = v;
                for (b += b << 2, b <<= 1; b > y * y;) b -= y * y, g++;
                for (d += g * l.N4, p = 0; p < y; p++) {
                  for (
                    u = 0, f[0] = 0, c = 0, h = 0;
                    h < y;
                    h++
                  ) {
                    s = m[p + y * h], c === s ? f[u]++ : f[++u] = 1, c = s;
                  }
                  d += this._getBadness(u);
                }
                return d;
              },
              _convertBitStream: function (c) {
                var s, u, p = this._ecc, h = this._version;
                for (u = 0; u < c; u++) p[u] = this._value.charCodeAt(u);
                var d = this._stringBuffer = p.slice(),
                  f = this._calculateMaxLength();
                c >= f - 2 && (c = f - 2, h > 9 && c--);
                var m = c;
                if (h > 9) {
                  for (d[m + 2] = 0, d[m + 3] = 0; m--;) {
                    s = d[m], d[m + 3] |= 255 & s << 4, d[m + 2] = s >> 4;
                  }
                  d[2] |= 255 & c << 4, d[1] = c >> 4, d[0] = 64 | c >> 12;
                } else {
                  for (d[m + 1] = 0, d[m + 2] = 0; m--;) {
                    s = d[m], d[m + 2] |= 255 & s << 4, d[m + 1] = s >> 4;
                  }
                  d[1] |= 255 & c << 4, d[0] = 64 | c >> 4;
                }
                for (m = c + 3 - (h < 10); m < f;) d[m++] = 236, d[m++] = 17;
              },
              _getBadness: function (c) {
                var s, u = 0, p = this._badness;
                for (s = 0; s <= c; s++) p[s] >= 5 && (u += l.N1 + p[s] - 5);
                for (s = 3; s < c - 1; s += 2) {
                  p[s - 2] === p[s + 2] && p[s + 2] === p[s - 1] &&
                    p[s - 1] === p[s + 1] && p[s - 1] * 3 === p[s] &&
                    (p[s - 3] === 0 || s + 3 > c || p[s - 3] * 3 >= p[s] * 4 ||
                      p[s + 3] * 3 >= p[s] * 4) &&
                    (u += l.N3);
                }
                return u;
              },
              _finish: function () {
                this._stringBuffer = this.buffer.slice();
                var c, s, u = 0, p = 3e4;
                for (
                  s = 0;
                  s < 8 &&
                  (this._applyMask(s),
                    c = this._checkBadness(),
                    c < p && (p = c, u = s),
                    u !== 7);
                  s++
                ) {
                  this.buffer = this._stringBuffer.slice();
                }
                u !== s && this._applyMask(u),
                  p = o.FINAL_FORMAT[u + (this._level - 1 << 3)];
                var h = this.buffer, d = this.width;
                for (s = 0; s < 8; s++, p >>= 1) {
                  p & 1 &&
                    (h[d - 1 - s + d * 8] = 1,
                      s < 6 ? h[8 + d * s] = 1 : h[8 + d * (s + 1)] = 1);
                }
                for (s = 0; s < 7; s++, p >>= 1) {
                  p & 1 &&
                    (h[8 + d * (d - 7 + s)] = 1,
                      s ? h[6 - s + d * 8] = 1 : h[7 + d * 8] = 1);
                }
              },
              _interleaveBlocks: function () {
                var c,
                  s,
                  u = this._dataBlock,
                  p = this._ecc,
                  h = this._eccBlock,
                  d = 0,
                  f = this._calculateMaxLength(),
                  m = this._neccBlock1,
                  y = this._neccBlock2,
                  v = this._stringBuffer;
                for (c = 0; c < u; c++) {
                  for (s = 0; s < m; s++) p[d++] = v[c + s * u];
                  for (s = 0; s < y; s++) p[d++] = v[m * u + c + s * (u + 1)];
                }
                for (s = 0; s < y; s++) p[d++] = v[m * u + c + s * (u + 1)];
                for (c = 0; c < h; c++) {
                  for (s = 0; s < m + y; s++) p[d++] = v[f + c + s * h];
                }
                this._stringBuffer = p;
              },
              _insertAlignments: function () {
                var c, s, u, p = this._version, h = this.width;
                if (p > 1) {
                  for (c = n.BLOCK[p], u = h - 7;;) {
                    for (
                      s = h - 7;
                      s > c - 3 && (this._addAlignment(s, u), !(s < c));
                    ) {
                      s -= c;
                    }
                    if (u <= c + 9) break;
                    u -= c, this._addAlignment(6, u), this._addAlignment(u, 6);
                  }
                }
              },
              _insertFinders: function () {
                var c, s, u, p, h = this.buffer, d = this.width;
                for (c = 0; c < 3; c++) {
                  for (
                    s = 0,
                      p = 0,
                      c === 1 && (s = d - 7),
                      c === 2 && (p = d - 7),
                      h[p + 3 + d * (s + 3)] = 1,
                      u = 0;
                    u < 6;
                    u++
                  ) {
                    h[p + u + d * s] = 1,
                      h[p + d * (s + u + 1)] = 1,
                      h[p + 6 + d * (s + u)] = 1,
                      h[p + u + 1 + d * (s + 6)] = 1;
                  }
                  for (u = 1; u < 5; u++) {
                    this._setMask(p + u, s + 1),
                      this._setMask(p + 1, s + u + 1),
                      this._setMask(p + 5, s + u),
                      this._setMask(p + u + 1, s + 5);
                  }
                  for (u = 2; u < 4; u++) {
                    h[p + u + d * (s + 2)] = 1,
                      h[p + 2 + d * (s + u + 1)] = 1,
                      h[p + 4 + d * (s + u)] = 1,
                      h[p + u + 1 + d * (s + 4)] = 1;
                  }
                }
              },
              _insertTimingGap: function () {
                var c, s, u = this.width;
                for (s = 0; s < 7; s++) {
                  this._setMask(7, s),
                    this._setMask(u - 8, s),
                    this._setMask(7, s + u - 7);
                }
                for (c = 0; c < 8; c++) {
                  this._setMask(c, 7),
                    this._setMask(c + u - 8, 7),
                    this._setMask(c, u - 8);
                }
              },
              _insertTimingRowAndColumn: function () {
                var c, s = this.buffer, u = this.width;
                for (c = 0; c < u - 14; c++) {
                  c & 1
                    ? (this._setMask(8 + c, 6), this._setMask(6, 8 + c))
                    : (s[8 + c + u * 6] = 1, s[6 + u * (8 + c)] = 1);
                }
              },
              _insertVersion: function () {
                var c,
                  s,
                  u,
                  p,
                  h = this.buffer,
                  d = this._version,
                  f = this.width;
                if (d > 6) {
                  for (c = a.BLOCK[d - 7], s = 17, u = 0; u < 6; u++) {
                    for (p = 0; p < 3; p++, s--) {
                      1 & (s > 11 ? d >> s - 12 : c >> s)
                        ? (h[5 - u + f * (2 - p + f - 11)] = 1,
                          h[2 - p + f - 11 + f * (5 - u)] = 1)
                        : (this._setMask(5 - u, 2 - p + f - 11),
                          this._setMask(2 - p + f - 11, 5 - u));
                    }
                  }
                }
              },
              _isMasked: function (c, s) {
                var u = l._getMaskBit(c, s);
                return this._mask[u] === 1;
              },
              _pack: function () {
                var c,
                  s,
                  u,
                  p = 1,
                  h = 1,
                  d = this.width,
                  f = d - 1,
                  m = d - 1,
                  y = (this._dataBlock + this._eccBlock) *
                      (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
                for (s = 0; s < y; s++) {
                  for (c = this._stringBuffer[s], u = 0; u < 8; u++, c <<= 1) {
                    128 & c && (this.buffer[f + d * m] = 1);
                    do h
                      ? f--
                      : (f++,
                        p
                          ? m !== 0
                            ? m--
                            : (f -= 2, p = !p, f === 6 && (f--, m = 9))
                          : m !== d - 1
                          ? m++
                          : (f -= 2, p = !p, f === 6 && (f--, m -= 8))),
                      h = !h; while (this._isMasked(f, m));
                  }
                }
              },
              _reverseMask: function () {
                var c, s, u = this.width;
                for (c = 0; c < 9; c++) {
                  this._setMask(c, 8);
                }
                for (c = 0; c < 8; c++) {
                  this._setMask(c + u - 8, 8), this._setMask(8, c);
                }
                for (s = 0; s < 7; s++) this._setMask(8, s + u - 7);
              },
              _setMask: function (c, s) {
                var u = l._getMaskBit(c, s);
                this._mask[u] = 1;
              },
              _syncMask: function () {
                var c, s, u = this.width;
                for (s = 0; s < u; s++) {
                  for (c = 0; c <= s; c++) {
                    this.buffer[c + u * s] && this._setMask(c, s);
                  }
                }
              },
            }, {
              _createArray: function (c) {
                var s, u = [];
                for (s = 0; s < c; s++) u[s] = 0;
                return u;
              },
              _getMaskBit: function (c, s) {
                var u;
                return c > s && (u = c, c = s, s = u),
                  u = s,
                  u += s * s,
                  u >>= 1,
                  u += c,
                  u;
              },
              _modN: function (c) {
                for (; c >= 255;) c -= 255, c = (c >> 8) + (c & 255);
                return c;
              },
              N1: 3,
              N2: 3,
              N3: 40,
              N4: 10,
            });
          t.exports = l;
        }),
        Do = N((e, t) => {
          "use strict";
          var r = jr(),
            n = r.extend({
              draw: function () {
                this.element.src = this.qrious.toDataURL();
              },
              reset: function () {
                this.element.src = "";
              },
              resize: function () {
                var o = this.element;
                o.width = o.height = this.qrious.size;
              },
            });
          t.exports = n;
        }),
        Io = N((e, t) => {
          "use strict";
          var r = ne(),
            n = r.extend(function (o, i, a, l) {
              this.name = o,
                this.modifiable = Boolean(i),
                this.defaultValue = a,
                this._valueTransformer = l;
            }, {
              transform: function (o) {
                var i = this._valueTransformer;
                return typeof i == "function" ? i(o, this) : o;
              },
            });
          t.exports = n;
        }),
        Mr = N((e, t) => {
          "use strict";
          var r = ne(),
            n = r.extend(null, {
              abs: function (o) {
                return o != null ? Math.abs(o) : null;
              },
              hasOwn: function (o, i) {
                return Object.prototype.hasOwnProperty.call(o, i);
              },
              noop: function () {},
              toUpperCase: function (o) {
                return o != null ? o.toUpperCase() : null;
              },
            });
          t.exports = n;
        }),
        Lo = N((e, t) => {
          "use strict";
          var r = ne(),
            n = Mr(),
            o = r.extend(function (i) {
              this.options = {},
                i.forEach(function (a) {
                  this.options[a.name] = a;
                }, this);
            }, {
              exists: function (i) {
                return this.options[i] != null;
              },
              get: function (i, a) {
                return o._get(this.options[i], a);
              },
              getAll: function (i) {
                var a, l = this.options, c = {};
                for (a in l) n.hasOwn(l, a) && (c[a] = o._get(l[a], i));
                return c;
              },
              init: function (i, a, l) {
                typeof l != "function" && (l = n.noop);
                var c, s;
                for (c in this.options) {
                  n.hasOwn(this.options, c) &&
                    (s = this.options[c],
                      o._set(s, s.defaultValue, a),
                      o._createAccessor(s, a, l));
                }
                this._setAll(i, a, !0);
              },
              set: function (i, a, l) {
                return this._set(i, a, l);
              },
              setAll: function (i, a) {
                return this._setAll(i, a);
              },
              _set: function (i, a, l, c) {
                var s = this.options[i];
                if (!s) throw new Error("Invalid option: " + i);
                if (!s.modifiable && !c) {
                  throw new Error("Option cannot be modified: " + i);
                }
                return o._set(s, a, l);
              },
              _setAll: function (i, a, l) {
                if (!i) return !1;
                var c, s = !1;
                for (c in i) {
                  n.hasOwn(i, c) && this._set(c, i[c], a, l) && (s = !0);
                }
                return s;
              },
            }, {
              _createAccessor: function (i, a, l) {
                var c = {
                  get: function () {
                    return o._get(i, a);
                  },
                };
                i.modifiable && (c.set = function (s) {
                  o._set(i, s, a) && l(s, i);
                }), Object.defineProperty(a, i.name, c);
              },
              _get: function (i, a) {
                return a["_" + i.name];
              },
              _set: function (i, a, l) {
                var c = "_" + i.name,
                  s = l[c],
                  u = i.transform(
                    a != null ? a : i.defaultValue,
                  );
                return l[c] = u, u !== s;
              },
            });
          t.exports = o;
        }),
        No = N((e, t) => {
          "use strict";
          var r = ne(),
            n = r.extend(function () {
              this._services = {};
            }, {
              getService: function (o) {
                var i = this._services[o];
                if (!i) {
                  throw new Error(
                    "Service is not being managed with name: " + o,
                  );
                }
                return i;
              },
              setService: function (o, i) {
                if (this._services[o]) {
                  throw new Error("Service is already managed with name: " + o);
                }
                i && (this._services[o] = i);
              },
            });
          t.exports = n;
        }),
        Bo = N((e, t) => {
          "use strict";
          var r = ne(),
            n = jo(),
            o = Ro(),
            i = Do(),
            a = Io(),
            l = Lo(),
            c = No(),
            s = Mr(),
            u = new l([
              new a("background", !0, "white"),
              new a("backgroundAlpha", !0, 1, s.abs),
              new a("element"),
              new a("foreground", !0, "black"),
              new a("foregroundAlpha", !0, 1, s.abs),
              new a("level", !0, "L", s.toUpperCase),
              new a("mime", !0, "image/png"),
              new a("padding", !0, null, s.abs),
              new a("size", !0, 100, s.abs),
              new a("value", !0, ""),
            ]),
            p = new c(),
            h = r.extend(function (d) {
              u.init(d, this, this.update.bind(this));
              var f = u.get("element", this),
                m = p.getService("element"),
                y = f && m.isCanvas(f) ? f : m.createCanvas(),
                v = f && m.isImage(f) ? f : m.createImage();
              this._canvasRenderer = new n(this, y, !0),
                this._imageRenderer = new i(this, v, v === f),
                this.update();
            }, {
              get: function () {
                return u.getAll(this);
              },
              set: function (d) {
                u.setAll(d, this) && this.update();
              },
              toDataURL: function (d) {
                return this.canvas.toDataURL(d || this.mime);
              },
              update: function () {
                var d = new o({ level: this.level, value: this.value });
                this._canvasRenderer.render(d), this._imageRenderer.render(d);
              },
            }, {
              use: function (d) {
                p.setService(d.getName(), d);
              },
            });
          Object.defineProperties(h.prototype, {
            canvas: {
              get: function () {
                return this._canvasRenderer.getElement();
              },
            },
            image: {
              get: function () {
                return this._imageRenderer.getElement();
              },
            },
          }), t.exports = h;
        }),
        Fo = N((e, t) => {
          "use strict";
          t.exports = Bo();
        }),
        Uo = N((e, t) => {
          "use strict";
          var r = ne(), n = r.extend({ getName: function () {} });
          t.exports = n;
        }),
        Wo = N((e, t) => {
          "use strict";
          var r = Uo(),
            n = r.extend({
              createCanvas: function () {},
              createImage: function () {},
              getName: function () {
                return "element";
              },
              isCanvas: function (o) {},
              isImage: function (o) {},
            });
          t.exports = n;
        }),
        Vo = Tr(Fo()),
        Ho = Tr(Wo()),
        qo = Ho.default.extend({
          createCanvas: function () {
            return document.createElement("canvas");
          },
          createImage: function () {
            return document.createElement("img");
          },
          isCanvas: function (e) {
            return e instanceof HTMLCanvasElement;
          },
          isImage: function (e) {
            return e instanceof HTMLImageElement;
          },
        }),
        Ko = qo,
        Ar = Vo.default,
        Ar.use(new Ko());
    });
    Zo = function () {
      function e(r) {
        var n = this;
        this._insertTag = function (o) {
          var i;
          n.tags.length === 0
            ? n.insertionPoint
              ? i = n.insertionPoint.nextSibling
              : n.prepend
              ? i = n.container.firstChild
              : i = n.before
            : i = n.tags[n.tags.length - 1].nextSibling,
            n.container.insertBefore(o, i),
            n.tags.push(o);
        },
          this.isSpeedy = r.speedy === void 0 ? !0 : r.speedy,
          this.tags = [],
          this.ctr = 0,
          this.nonce = r.nonce,
          this.key = r.key,
          this.container = r.container,
          this.prepend = r.prepend,
          this.insertionPoint = r.insertionPoint,
          this.before = null;
      }
      var t = e.prototype;
      return t.hydrate = function (r) {
        r.forEach(this._insertTag);
      },
        t.insert = function (r) {
          this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 &&
            this._insertTag(xl(this));
          var n = this.tags[this.tags.length - 1];
          if (!1) var o;
          if (this.isSpeedy) {
            var i = wl(n);
            try {
              i.insertRule(r, i.cssRules.length);
            } catch (a) {}
          } else n.appendChild(document.createTextNode(r));
          this.ctr++;
        },
        t.flush = function () {
          this.tags.forEach(function (r) {
            return r.parentNode && r.parentNode.removeChild(r);
          }),
            this.tags = [],
            this.ctr = 0;
        },
        e;
    }(),
      J = "-ms-",
      Dt = "-moz-",
      M = "-webkit-",
      ei = "comm",
      Pr = "rule",
      $r = "decl",
      kl = "@import",
      ti = "@keyframes",
      Sl = Math.abs,
      It = String.fromCharCode,
      El = Object.assign;
    Nt = 1, Ue = 1, ni = 0, ee = 0, B = 0, We = "";
    li = Bl,
      Fl = function (e, t, r) {
        for (
          var n = 0, o = 0;
          n = o, o = he(), n === 38 && o === 12 && (t[r] = 1), !at(o);
        ) {
          oe();
        }
        return it(e, ee);
      },
      Ul = function (e, t) {
        var r = -1, n = 44;
        do switch (at(n)) {
          case 0:
            n === 38 && he() === 12 && (t[r] = 1), e[r] += Fl(ee - 1, t, r);
            break;
          case 2:
            e[r] += Ut(n);
            break;
          case 4:
            if (n === 44) {
              e[++r] = he() === 58 ? "&\f" : "", t[r] = e[r].length;
              break;
            }
          default:
            e[r] += It(n);
        } while (n = oe());
        return e;
      },
      Wl = function (e, t) {
        return ii(Ul(oi(e), t));
      },
      ui = new WeakMap(),
      Vl = function (e) {
        if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
          for (
            var t = e.value,
              r = e.parent,
              n = e.column === r.column && e.line === r.line;
            r.type !== "rule";
          ) {
            if (r = r.parent, !r) return;
          }
          if (
            !(e.props.length === 1 && t.charCodeAt(0) !== 58 && !ui.get(r)) &&
            !n
          ) {
            ui.set(e, !0);
            for (
              var o = [], i = Wl(t, o), a = r.props, l = 0, c = 0;
              l < i.length;
              l++
            ) {
              for (var s = 0; s < a.length; s++, c++) {
                e.props[c] = o[l]
                  ? i[l].replace(/&\f/g, a[s])
                  : a[s] + " " + i[l];
              }
            }
          }
        }
      },
      Hl = function (e) {
        if (e.type === "decl") {
          var t = e.value;
          t.charCodeAt(0) === 108 && t.charCodeAt(2) === 98 &&
            (e.return = "", e.value = "");
        }
      },
      ql = [Nl],
      Kl = function (e) {
        var t = e.key;
        if (t === "css") {
          var r = document.querySelectorAll(
            "style[data-emotion]:not([data-s])",
          );
          Array.prototype.forEach.call(r, function (f) {
            var m = f.getAttribute("data-emotion");
            m.indexOf(" ") !== -1 &&
              (document.head.appendChild(f), f.setAttribute("data-s", ""));
          });
        }
        var n = e.stylisPlugins || ql, o = {}, i, a = [];
        i = e.container || document.head,
          Array.prototype.forEach.call(
            document.querySelectorAll('style[data-emotion^="' + t + ' "]'),
            function (f) {
              for (
                var m = f.getAttribute("data-emotion").split(" "), y = 1;
                y < m.length;
                y++
              ) {
                o[m[y]] = !0;
              }
              a.push(f);
            },
          );
        var l, c = [Vl, Hl];
        {
          var s,
            u = [
              Dl,
              Ll(function (f) {
                s.insert(f);
              }),
            ],
            p = Il(c.concat(n, u)),
            h = function (f) {
              return Ve($l(f), p);
            };
          l = function (f, m, y, v) {
            s = y,
              h(f ? f + "{" + m.styles + "}" : m.styles),
              v && (d.inserted[m.name] = !0);
          };
        }
        var d = {
          key: t,
          sheet: new Zo({
            key: t,
            container: i,
            nonce: e.nonce,
            speedy: e.speedy,
            prepend: e.prepend,
            insertionPoint: e.insertionPoint,
          }),
          nonce: e.nonce,
          inserted: o,
          registered: {},
          insert: l,
        };
        return d.sheet.hydrate(a), d;
      },
      Gl = Kl;
    Yl = !0;
    Nr = function (e, t, r) {
      var n = e.key + "-" + t.name;
      if (
        (r === !1 || Yl === !1) && e.registered[n] === void 0 &&
        (e.registered[n] = t.styles), e.inserted[t.name] === void 0
      ) {
        var o = t;
        do {
          var i = e.insert(t === o ? "." + n : "", o, e.sheet, !0);
          o = o.next;
        } while (o !== void 0);
      }
    };
    Zl = Ql,
      eu = {
        animationIterationCount: 1,
        borderImageOutset: 1,
        borderImageSlice: 1,
        borderImageWidth: 1,
        boxFlex: 1,
        boxFlexGroup: 1,
        boxOrdinalGroup: 1,
        columnCount: 1,
        columns: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        flexOrder: 1,
        gridRow: 1,
        gridRowEnd: 1,
        gridRowSpan: 1,
        gridRowStart: 1,
        gridColumn: 1,
        gridColumnEnd: 1,
        gridColumnSpan: 1,
        gridColumnStart: 1,
        msGridRow: 1,
        msGridRowSpan: 1,
        msGridColumn: 1,
        msGridColumnSpan: 1,
        fontWeight: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        tabSize: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1,
        WebkitLineClamp: 1,
        fillOpacity: 1,
        floodOpacity: 1,
        stopOpacity: 1,
        strokeDasharray: 1,
        strokeDashoffset: 1,
        strokeMiterlimit: 1,
        strokeOpacity: 1,
        strokeWidth: 1,
      },
      tu = eu,
      ru = /[A-Z]|^ms/g,
      nu = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
      hi = function (e) {
        return e.charCodeAt(1) === 45;
      },
      mi = function (e) {
        return e != null && typeof e != "boolean";
      },
      Br = li(function (e) {
        return hi(e) ? e : e.replace(ru, "-$&").toLowerCase();
      }),
      gi = function (e, t) {
        switch (e) {
          case "animation":
          case "animationName":
            if (typeof t == "string") {
              return t.replace(nu, function (r, n, o) {
                return me = { name: n, styles: o, next: me }, n;
              });
            }
        }
        return tu[e] !== 1 && !hi(e) && typeof t == "number" && t !== 0
          ? t + "px"
          : t;
      };
    yi = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
      Vt = function (e, t, r) {
        if (
          e.length === 1 && typeof e[0] == "object" && e[0] !== null &&
          e[0].styles !== void 0
        ) {
          return e[0];
        }
        var n = !0, o = "";
        me = void 0;
        var i = e[0];
        i == null || i.raw === void 0 ? (n = !1, o += st(r, t, i)) : o += i[0];
        for (var a = 1; a < e.length; a++) {o += st(r, t, e[a]),
            n && (o += i[a]);}
        var l;
        yi.lastIndex = 0;
        for (var c = "", s; (s = yi.exec(o)) !== null;) c += "-" + s[1];
        var u = Zl(o) + c;
        return { name: u, styles: o, next: me };
      },
      Fr = {}.hasOwnProperty,
      bi = pi(
        typeof HTMLElement != "undefined" ? Gl({ key: "css" }) : null,
      ),
      bg = bi.Provider,
      Ur = function (e) {
        return Jl(function (t, r) {
          var n = di(bi);
          return e(t, n, r);
        });
      },
      Wr = pi({}),
      Vr = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__",
      iu = function (e, t) {
        var r = {};
        for (var n in t) Fr.call(t, n) && (r[n] = t[n]);
        if (r[Vr] = e, !1) var o;
        return r;
      },
      au = function () {
        return null;
      },
      su = Ur(function (e, t, r) {
        var n = e.css;
        typeof n == "string" && t.registered[n] !== void 0 &&
          (n = t.registered[n]);
        var o = e[Vr], i = [n], a = "";
        typeof e.className == "string"
          ? a = fi(t.registered, i, e.className)
          : e.className != null && (a = e.className + " ");
        var l = Vt(i, void 0, di(Wr));
        if (!1) var c;
        var s = Nr(t, l, typeof o == "string");
        a += t.key + "-" + l.name;
        var u = {};
        for (var p in e) {
          Fr.call(e, p) && p !== "css" && p !== Vr &&
            (u[p] = e[p]);
        }
        u.ref = r, u.className = a;
        var h = Lr(o, u), d = Lr(au, null);
        return Lr(Xl, null, d, h);
      }),
      vg = ae(dl()),
      T = function (e, t) {
        var r = arguments;
        if (t == null || !Fr.call(t, "css")) return Yo.apply(void 0, r);
        var n = r.length, o = new Array(n);
        o[0] = su, o[1] = iu(e, t);
        for (var i = 2; i < n; i++) o[i] = r[i];
        return Yo.apply(null, o);
      },
      cu = Ur(function (e, t) {
        var r = e.styles, n = Vt([r], void 0, bl(Wr)), o = vl();
        return Qo(function () {
          var i = t.key + "-global",
            a = new Zo({
              key: i,
              nonce: t.sheet.nonce,
              container: t.sheet.container,
              speedy: t.sheet.isSpeedy,
            }),
            l = !1,
            c = document.querySelector(
              'style[data-emotion="' + i + " " + n.name + '"]',
            );
          return t.sheet.tags.length && (a.before = t.sheet.tags[0]),
            c !== null &&
            (l = !0, c.setAttribute("data-emotion", i), a.hydrate([c])),
            o.current = [a, l],
            function () {
              a.flush();
            };
        }, [t]),
          Qo(function () {
            var i = o.current, a = i[0], l = i[1];
            if (l) {
              i[1] = !1;
              return;
            }
            if (n.next !== void 0 && Nr(t, n.next, !0), a.tags.length) {
              var c = a.tags[a.tags.length - 1].nextElementSibling;
              a.before = c, a.flush();
            }
            t.insert("", n, a, !1);
          }, [t, n.name]),
          null;
      });
    Hr = function () {
      var e = X.apply(void 0, arguments), t = "animation-" + e.name;
      return {
        name: t,
        styles: "@keyframes " + t + "{" + e.styles + "}",
        anim: 1,
        toString: function () {
          return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
        },
      };
    };
    wg = ae(de());
    lu = typeof window != "undefined" ? qt.useLayoutEffect : qt.useEffect,
      uu = lu;
    Jt = !0,
      qr = !1,
      fu = {
        text: !0,
        search: !0,
        url: !0,
        tel: !0,
        email: !0,
        password: !0,
        number: !0,
        date: !0,
        month: !0,
        week: !0,
        time: !0,
        datetime: !0,
        "datetime-local": !0,
      };
    Oi = (e) => e,
      wu = () => {
        let e = Oi;
        return {
          configure(t) {
            e = t;
          },
          generate(t) {
            return e(t);
          },
          reset() {
            e = Oi;
          },
        };
      },
      xu = wu(),
      ku = xu,
      Su = {
        active: "Mui-active",
        checked: "Mui-checked",
        completed: "Mui-completed",
        disabled: "Mui-disabled",
        error: "Mui-error",
        expanded: "Mui-expanded",
        focused: "Mui-focused",
        focusVisible: "Mui-focusVisible",
        required: "Mui-required",
        selected: "Mui-selected",
      };
    xg = ae(de()),
      Eu =
        /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
      Ou = li(function (e) {
        return Eu.test(e) ||
          e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 &&
            e.charCodeAt(2) < 91;
      }),
      Cu = Ou,
      Tu = Cu,
      ju = function (e) {
        return e !== "theme";
      },
      Ci = function (e) {
        return typeof e == "string" && e.charCodeAt(0) > 96 ? Tu : ju;
      },
      _i = function (e, t, r) {
        var n;
        if (t) {
          var o = t.shouldForwardProp;
          n = e.__emotion_forwardProp && o
            ? function (i) {
              return e.__emotion_forwardProp(i) && o(i);
            }
            : o;
        }
        return typeof n != "function" && r && (n = e.__emotion_forwardProp), n;
      },
      Mu = function () {
        return null;
      },
      Au = function e(t, r) {
        var n = t.__emotion_real === t, o = n && t.__emotion_base || t, i, a;
        r !== void 0 && (i = r.label, a = r.target);
        var l = _i(t, r, n), c = l || Ci(o), s = !c("as");
        return function () {
          var u = arguments,
            p = n && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0)
            : [];
          if (
            i !== void 0 && p.push("label:" + i + ";"),
              u[0] == null || u[0].raw === void 0
          ) {
            p.push.apply(p, u);
          } else {
            p.push(u[0][0]);
            for (var h = u.length, d = 1; d < h; d++) p.push(u[d], u[0][d]);
          }
          var f = Ur(function (m, y, v) {
            var g = s && m.as || o, b = "", x = [], S = m;
            if (m.theme == null) {
              S = {};
              for (var w in m) S[w] = m[w];
              S.theme = _u(Wr);
            }
            typeof m.className == "string"
              ? b = fi(y.registered, x, m.className)
              : m.className != null && (b = m.className + " ");
            var k = Vt(p.concat(x), y.registered, S),
              j = Nr(y, k, typeof g == "string");
            b += y.key + "-" + k.name, a !== void 0 && (b += " " + a);
            var D = s && l === void 0 ? Ci(g) : c, K = {};
            for (var G in m) s && G === "as" || D(G) && (K[G] = m[G]);
            K.className = b, K.ref = v;
            var ie = Gr(g, K), Q = Gr(Mu, null);
            return Gr(zu, null, Q, ie);
          });
          return f.displayName = i !== void 0
            ? i
            : "Styled(" + (typeof o == "string"
              ? o
              : o.displayName || o.name || "Component") +
              ")",
            f.defaultProps = t.defaultProps,
            f.__emotion_real = f,
            f.__emotion_base = o,
            f.__emotion_styles = p,
            f.__emotion_forwardProp = l,
            Object.defineProperty(f, "toString", {
              value: function () {
                return "." + a;
              },
            }),
            f.withComponent = function (m, y) {
              return e(m, C({}, r, y, { shouldForwardProp: _i(f, y, !0) }))
                .apply(void 0, p);
            },
            f;
        };
      },
      Pu = Au,
      $u = [
        "a",
        "abbr",
        "address",
        "area",
        "article",
        "aside",
        "audio",
        "b",
        "base",
        "bdi",
        "bdo",
        "big",
        "blockquote",
        "body",
        "br",
        "button",
        "canvas",
        "caption",
        "cite",
        "code",
        "col",
        "colgroup",
        "data",
        "datalist",
        "dd",
        "del",
        "details",
        "dfn",
        "dialog",
        "div",
        "dl",
        "dt",
        "em",
        "embed",
        "fieldset",
        "figcaption",
        "figure",
        "footer",
        "form",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hgroup",
        "hr",
        "html",
        "i",
        "iframe",
        "img",
        "input",
        "ins",
        "kbd",
        "keygen",
        "label",
        "legend",
        "li",
        "link",
        "main",
        "map",
        "mark",
        "marquee",
        "menu",
        "menuitem",
        "meta",
        "meter",
        "nav",
        "noscript",
        "object",
        "ol",
        "optgroup",
        "option",
        "output",
        "p",
        "param",
        "picture",
        "pre",
        "progress",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "script",
        "section",
        "select",
        "small",
        "source",
        "span",
        "strong",
        "style",
        "sub",
        "summary",
        "sup",
        "table",
        "tbody",
        "td",
        "textarea",
        "tfoot",
        "th",
        "thead",
        "time",
        "title",
        "tr",
        "track",
        "u",
        "ul",
        "var",
        "video",
        "wbr",
        "circle",
        "clipPath",
        "defs",
        "ellipse",
        "foreignObject",
        "g",
        "image",
        "line",
        "linearGradient",
        "mask",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "radialGradient",
        "rect",
        "stop",
        "svg",
        "text",
        "tspan",
      ],
      Jr = Pu.bind();
    $u.forEach(function (e) {
      Jr[e] = Jr(e);
    });
    Ru = Jr;
    Eg = ae(de());
    ut = Iu,
      Xr = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      zi = {
        keys: ["xs", "sm", "md", "lg", "xl"],
        up: (e) => `@media (min-width:${Xr[e]}px)`,
      };
    O = Bu;
    Te = Fu;
    Wu = { m: "margin", p: "padding" },
      Vu = {
        t: "Top",
        r: "Right",
        b: "Bottom",
        l: "Left",
        x: ["Left", "Right"],
        y: ["Top", "Bottom"],
      },
      ji = { marginX: "mx", marginY: "my", paddingX: "px", paddingY: "py" },
      Hu = Uu((e) => {
        if (e.length > 2) {
          if (ji[e]) e = ji[e];
          else return [e];
        }
        let [t, r] = e.split(""), n = Wu[t], o = Vu[r] || "";
        return Array.isArray(o) ? o.map((i) => n + i) : [n + o];
      }),
      Qr = [
        "m",
        "mt",
        "mr",
        "mb",
        "ml",
        "mx",
        "my",
        "margin",
        "marginTop",
        "marginRight",
        "marginBottom",
        "marginLeft",
        "marginX",
        "marginY",
        "marginInline",
        "marginInlineStart",
        "marginInlineEnd",
        "marginBlock",
        "marginBlockStart",
        "marginBlockEnd",
      ],
      Zr = [
        "p",
        "pt",
        "pr",
        "pb",
        "pl",
        "px",
        "py",
        "padding",
        "paddingTop",
        "paddingRight",
        "paddingBottom",
        "paddingLeft",
        "paddingX",
        "paddingY",
        "paddingInline",
        "paddingInlineStart",
        "paddingInlineEnd",
        "paddingBlock",
        "paddingBlockStart",
        "paddingBlockEnd",
      ],
      Mi = [...Qr, ...Zr];
    Pi.propTypes = {};
    Pi.filterProps = Qr;
    $i.propTypes = {};
    $i.filterProps = Zr;
    tn.propTypes = {};
    tn.filterProps = Mi;
    Ri = tn;
    Gu = O({ prop: "border", themeKey: "borders", transform: ft }),
      Ju = O({ prop: "borderTop", themeKey: "borders", transform: ft }),
      Xu = O({ prop: "borderRight", themeKey: "borders", transform: ft }),
      Yu = O({ prop: "borderBottom", themeKey: "borders", transform: ft }),
      Qu = O({ prop: "borderLeft", themeKey: "borders", transform: ft }),
      Zu = O({ prop: "borderColor", themeKey: "palette" }),
      ep = O({ prop: "borderTopColor", themeKey: "palette" }),
      tp = O({ prop: "borderRightColor", themeKey: "palette" }),
      rp = O({ prop: "borderBottomColor", themeKey: "palette" }),
      np = O({ prop: "borderLeftColor", themeKey: "palette" }),
      rn = (e) => {
        if (e.borderRadius !== void 0 && e.borderRadius !== null) {
          let t = pt(e.theme, "shape.borderRadius", 4, "borderRadius"),
            r = (n) => ({ borderRadius: dt(t, n) });
          return ze(e, e.borderRadius, r);
        }
        return null;
      };
    rn.propTypes = {};
    rn.filterProps = ["borderRadius"];
    op = Te(Gu, Ju, Xu, Yu, Qu, Zu, ep, tp, rp, np, rn),
      Di = op,
      ip = O({
        prop: "displayPrint",
        cssProperty: !1,
        transform: (e) => ({ "@media print": { display: e } }),
      }),
      ap = O({ prop: "display" }),
      sp = O({ prop: "overflow" }),
      cp = O({ prop: "textOverflow" }),
      lp = O({ prop: "visibility" }),
      up = O({ prop: "whiteSpace" }),
      Ii = Te(ip, ap, sp, cp, lp, up),
      pp = O({ prop: "flexBasis" }),
      dp = O({ prop: "flexDirection" }),
      fp = O({ prop: "flexWrap" }),
      hp = O({ prop: "justifyContent" }),
      mp = O({ prop: "alignItems" }),
      gp = O({ prop: "alignContent" }),
      yp = O({ prop: "order" }),
      bp = O({ prop: "flex" }),
      vp = O({ prop: "flexGrow" }),
      wp = O({ prop: "flexShrink" }),
      xp = O({ prop: "alignSelf" }),
      kp = O({ prop: "justifyItems" }),
      Sp = O({ prop: "justifySelf" }),
      Ep = Te(pp, dp, fp, hp, mp, gp, yp, bp, vp, wp, xp, kp, Sp),
      Li = Ep,
      nn = (e) => {
        if (e.gap !== void 0 && e.gap !== null) {
          let t = pt(e.theme, "spacing", 8, "gap"),
            r = (n) => ({ gap: dt(t, n) });
          return ze(e, e.gap, r);
        }
        return null;
      };
    nn.propTypes = {};
    nn.filterProps = ["gap"];
    on = (e) => {
      if (e.columnGap !== void 0 && e.columnGap !== null) {
        let t = pt(e.theme, "spacing", 8, "columnGap"),
          r = (n) => ({ columnGap: dt(t, n) });
        return ze(e, e.columnGap, r);
      }
      return null;
    };
    on.propTypes = {};
    on.filterProps = ["columnGap"];
    an = (e) => {
      if (e.rowGap !== void 0 && e.rowGap !== null) {
        let t = pt(e.theme, "spacing", 8, "rowGap"),
          r = (n) => ({ rowGap: dt(t, n) });
        return ze(e, e.rowGap, r);
      }
      return null;
    };
    an.propTypes = {};
    an.filterProps = ["rowGap"];
    Op = O({ prop: "gridColumn" }),
      Cp = O({ prop: "gridRow" }),
      _p = O({ prop: "gridAutoFlow" }),
      zp = O({ prop: "gridAutoColumns" }),
      Tp = O({ prop: "gridAutoRows" }),
      jp = O({ prop: "gridTemplateColumns" }),
      Mp = O({ prop: "gridTemplateRows" }),
      Ap = O({ prop: "gridTemplateAreas" }),
      Pp = O({ prop: "gridArea" }),
      $p = Te(nn, on, an, Op, Cp, _p, zp, Tp, jp, Mp, Ap, Pp),
      Ni = $p,
      Rp = O({ prop: "color", themeKey: "palette" }),
      Dp = O({
        prop: "bgcolor",
        cssProperty: "backgroundColor",
        themeKey: "palette",
      }),
      Ip = O({ prop: "backgroundColor", themeKey: "palette" }),
      Lp = Te(Rp, Dp, Ip),
      Bi = Lp,
      Np = O({ prop: "position" }),
      Bp = O({ prop: "zIndex", themeKey: "zIndex" }),
      Fp = O({ prop: "top" }),
      Up = O({ prop: "right" }),
      Wp = O({ prop: "bottom" }),
      Vp = O({ prop: "left" }),
      Fi = Te(Np, Bp, Fp, Up, Wp, Vp),
      Hp = O({ prop: "boxShadow", themeKey: "shadows" }),
      Ui = Hp;
    qp = O({ prop: "width", transform: je }),
      Wi = (e) => {
        if (e.maxWidth !== void 0 && e.maxWidth !== null) {
          let t = (r) => {
            var n, o, i;
            return {
              maxWidth: ((n = e.theme) == null || (o = n.breakpoints) == null ||
                  (i = o.values) == null
                ? void 0
                : i[r]) || Xr[r] || je(r),
            };
          };
          return ze(e, e.maxWidth, t);
        }
        return null;
      };
    Wi.filterProps = ["maxWidth"];
    Kp = O({ prop: "minWidth", transform: je }),
      Gp = O({ prop: "height", transform: je }),
      Jp = O({ prop: "maxHeight", transform: je }),
      Xp = O({ prop: "minHeight", transform: je }),
      Og = O({ prop: "size", cssProperty: "width", transform: je }),
      Cg = O({ prop: "size", cssProperty: "height", transform: je }),
      Yp = O({ prop: "boxSizing" }),
      Qp = Te(qp, Wi, Kp, Gp, Jp, Xp, Yp),
      Vi = Qp,
      Zp = O({ prop: "fontFamily", themeKey: "typography" }),
      ed = O({ prop: "fontSize", themeKey: "typography" }),
      td = O({ prop: "fontStyle", themeKey: "typography" }),
      rd = O({ prop: "fontWeight", themeKey: "typography" }),
      nd = O({ prop: "letterSpacing" }),
      od = O({ prop: "lineHeight" }),
      id = O({ prop: "textAlign" }),
      ad = O({ prop: "typography", cssProperty: !1, themeKey: "typography" }),
      sd = Te(ad, Zp, ed, td, rd, nd, od, id),
      Hi = sd,
      qi = {
        borders: Di.filterProps,
        display: Ii.filterProps,
        flexbox: Li.filterProps,
        grid: Ni.filterProps,
        positions: Fi.filterProps,
        palette: Bi.filterProps,
        shadows: Ui.filterProps,
        sizing: Vi.filterProps,
        spacing: Ri.filterProps,
        typography: Hi.filterProps,
      },
      cd = {
        borders: Di,
        display: Ii,
        flexbox: Li,
        grid: Ni,
        positions: Fi,
        palette: Bi,
        shadows: Ui,
        sizing: Vi,
        spacing: Ri,
        typography: Hi,
      },
      Ki = Object.keys(qi).reduce((e, t) => (qi[t].forEach((r) => {
        e[r] = cd[t];
      }),
        e), {});
    Gi = ld;
    sn.filterProps = ["sx"];
    dd = sn, fd = ["values", "unit", "step"];
    md = { borderRadius: 4 }, gd = md;
    bd = ["breakpoints", "palette", "spacing", "shape"];
    cn = vd, wd = Ji.createContext(null), xd = wd;
    Od = Ed, Cd = cn();
    zd = _d, Td = ["variant"];
    jd = [
      "name",
      "slot",
      "skipVariantsResolver",
      "skipSx",
      "overridesResolver",
    ],
      Md = ["theme"],
      Ad = ["theme"];
    Pd = (e, t) =>
      t.components && t.components[e] && t.components[e].styleOverrides
        ? t.components[e].styleOverrides
        : null,
      $d = (e, t) => {
        let r = [];
        t && t.components && t.components[e] && t.components[e].variants &&
          (r = t.components[e].variants);
        let n = {};
        return r.forEach((o) => {
          let i = Qi(o.props);
          n[i] = o.style;
        }),
          n;
      },
      Rd = (e, t, r, n) => {
        var o, i;
        let { ownerState: a = {} } = e,
          l = [],
          c = r == null || (o = r.components) == null || (i = o[n]) == null
            ? void 0 : i.variants;
        return c && c.forEach((s) => {
          let u = !0;
          Object.keys(s.props).forEach((p) => {
            a[p] !== s.props[p] && e[p] !== s.props[p] && (u = !1);
          }), u && l.push(t[Qi(s.props)]);
        }),
          l;
      };
    Dd = cn();
    qd = { black: "#000", white: "#fff" },
      mt = qd,
      Kd = {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
        A100: "#f5f5f5",
        A200: "#eeeeee",
        A400: "#bdbdbd",
        A700: "#616161",
      },
      Gd = Kd,
      Jd = {
        50: "#f3e5f5",
        100: "#e1bee7",
        200: "#ce93d8",
        300: "#ba68c8",
        400: "#ab47bc",
        500: "#9c27b0",
        600: "#8e24aa",
        700: "#7b1fa2",
        800: "#6a1b9a",
        900: "#4a148c",
        A100: "#ea80fc",
        A200: "#e040fb",
        A400: "#d500f9",
        A700: "#aa00ff",
      },
      qe = Jd,
      Xd = {
        50: "#ffebee",
        100: "#ffcdd2",
        200: "#ef9a9a",
        300: "#e57373",
        400: "#ef5350",
        500: "#f44336",
        600: "#e53935",
        700: "#d32f2f",
        800: "#c62828",
        900: "#b71c1c",
        A100: "#ff8a80",
        A200: "#ff5252",
        A400: "#ff1744",
        A700: "#d50000",
      },
      Ke = Xd,
      Yd = {
        50: "#fff3e0",
        100: "#ffe0b2",
        200: "#ffcc80",
        300: "#ffb74d",
        400: "#ffa726",
        500: "#ff9800",
        600: "#fb8c00",
        700: "#f57c00",
        800: "#ef6c00",
        900: "#e65100",
        A100: "#ffd180",
        A200: "#ffab40",
        A400: "#ff9100",
        A700: "#ff6d00",
      },
      gt = Yd,
      Qd = {
        50: "#e3f2fd",
        100: "#bbdefb",
        200: "#90caf9",
        300: "#64b5f6",
        400: "#42a5f5",
        500: "#2196f3",
        600: "#1e88e5",
        700: "#1976d2",
        800: "#1565c0",
        900: "#0d47a1",
        A100: "#82b1ff",
        A200: "#448aff",
        A400: "#2979ff",
        A700: "#2962ff",
      },
      Ge = Qd,
      Zd = {
        50: "#e1f5fe",
        100: "#b3e5fc",
        200: "#81d4fa",
        300: "#4fc3f7",
        400: "#29b6f6",
        500: "#03a9f4",
        600: "#039be5",
        700: "#0288d1",
        800: "#0277bd",
        900: "#01579b",
        A100: "#80d8ff",
        A200: "#40c4ff",
        A400: "#00b0ff",
        A700: "#0091ea",
      },
      Je = Zd,
      ef = {
        50: "#e8f5e9",
        100: "#c8e6c9",
        200: "#a5d6a7",
        300: "#81c784",
        400: "#66bb6a",
        500: "#4caf50",
        600: "#43a047",
        700: "#388e3c",
        800: "#2e7d32",
        900: "#1b5e20",
        A100: "#b9f6ca",
        A200: "#69f0ae",
        A400: "#00e676",
        A700: "#00c853",
      },
      Xe = ef,
      tf = ["mode", "contrastThreshold", "tonalOffset"],
      ea = {
        text: {
          primary: "rgba(0, 0, 0, 0.87)",
          secondary: "rgba(0, 0, 0, 0.6)",
          disabled: "rgba(0, 0, 0, 0.38)",
        },
        divider: "rgba(0, 0, 0, 0.12)",
        background: { paper: mt.white, default: mt.white },
        action: {
          active: "rgba(0, 0, 0, 0.54)",
          hover: "rgba(0, 0, 0, 0.04)",
          hoverOpacity: .04,
          selected: "rgba(0, 0, 0, 0.08)",
          selectedOpacity: .08,
          disabled: "rgba(0, 0, 0, 0.26)",
          disabledBackground: "rgba(0, 0, 0, 0.12)",
          disabledOpacity: .38,
          focus: "rgba(0, 0, 0, 0.12)",
          focusOpacity: .12,
          activatedOpacity: .12,
        },
      },
      un = {
        text: {
          primary: mt.white,
          secondary: "rgba(255, 255, 255, 0.7)",
          disabled: "rgba(255, 255, 255, 0.5)",
          icon: "rgba(255, 255, 255, 0.5)",
        },
        divider: "rgba(255, 255, 255, 0.12)",
        background: { paper: "#121212", default: "#121212" },
        action: {
          active: mt.white,
          hover: "rgba(255, 255, 255, 0.08)",
          hoverOpacity: .08,
          selected: "rgba(255, 255, 255, 0.16)",
          selectedOpacity: .16,
          disabled: "rgba(255, 255, 255, 0.3)",
          disabledBackground: "rgba(255, 255, 255, 0.12)",
          disabledOpacity: .38,
          focus: "rgba(255, 255, 255, 0.12)",
          focusOpacity: .12,
          activatedOpacity: .24,
        },
      };
    uf = [
      "fontFamily",
      "fontSize",
      "fontWeightLight",
      "fontWeightRegular",
      "fontWeightMedium",
      "fontWeightBold",
      "htmlFontSize",
      "allVariants",
      "pxToRem",
    ];
    ra = { textTransform: "uppercase" },
      na = '"Roboto", "Helvetica", "Arial", sans-serif';
    ff = .2, hf = .14, mf = .12;
    gf = [
      "none",
      R(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      R(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
      R(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
      R(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
      R(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
      R(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
      R(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
      R(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
      R(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
      R(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
      R(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
      R(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
      R(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
      R(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
      R(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
      R(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
      R(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
      R(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
      R(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
      R(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
      R(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
      R(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
      R(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
      R(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
    ],
      yf = gf,
      bf = ["duration", "easing", "delay"],
      vf = {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
      wf = {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      };
    Sf = {
      mobileStepper: 1e3,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
      Ef = Sf,
      Of = [
        "breakpoints",
        "mixins",
        "spacing",
        "palette",
        "transitions",
        "typography",
        "shape",
      ];
    _f = Cf,
      zf = _f(),
      ia = zf,
      aa = (e) => Xt(e) && e !== "classes",
      Tf = Id({ defaultTheme: ia, rootShouldForwardProp: aa }),
      ge = Tf;
    sa = du, Qt = pu, jf = vu, _g = ae(de());
    ca = Af.createContext(null);
    Tg = ae(de());
    Lf = Object.values || function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    },
      Nf = {
        component: "div",
        childFactory: function (e) {
          return e;
        },
      },
      fn = function (e) {
        Mf(t, e);
        function t(n, o) {
          var i;
          i = e.call(this, n, o) || this;
          var a = i.handleExited.bind(Pf(i));
          return i.state = {
            contextValue: { isMounting: !0 },
            handleExited: a,
            firstRender: !0,
          },
            i;
        }
        var r = t.prototype;
        return r.componentDidMount = function () {
          this.mounted = !0,
            this.setState({ contextValue: { isMounting: !1 } });
        },
          r.componentWillUnmount = function () {
            this.mounted = !1;
          },
          t.getDerivedStateFromProps = function (n, o) {
            var i = o.children, a = o.handleExited, l = o.firstRender;
            return {
              children: l ? Df(n, a) : If(n, i, a),
              firstRender: !1,
            };
          },
          r.handleExited = function (n, o) {
            var i = dn(this.props.children);
            n.key in i ||
              (n.props.onExited && n.props.onExited(o),
                this.mounted && this.setState(function (a) {
                  var l = C({}, a.children);
                  return delete l[n.key], { children: l };
                }));
          },
          r.render = function () {
            var n = this.props,
              o = n.component,
              i = n.childFactory,
              a = W(n, ["component", "childFactory"]),
              l = this.state.contextValue,
              c = Lf(this.state.children).map(i);
            return delete a.appear,
              delete a.enter,
              delete a.exit,
              o === null ? Zt.createElement(ca.Provider, { value: l }, c)
              : Zt.createElement(
                ca.Provider,
                { value: l },
                Zt.createElement(o, a, c),
              );
          },
          t;
      }(Zt.Component);
    fn.propTypes = {};
    fn.defaultProps = Nf;
    Bf = fn, Ag = ae(de());
    Uf = Ff,
      Wf = Ie("MuiTouchRipple", [
        "root",
        "ripple",
        "rippleVisible",
        "ripplePulsate",
        "child",
        "childLeaving",
        "childPulsate",
      ]),
      se = Wf,
      Vf = ["center", "classes", "className"],
      nr = (e) => e,
      mn = 550,
      Hf = 80,
      qf = Hr(
        ua || (ua = nr`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`),
      ),
      Kf = Hr(
        pa || (pa = nr`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`),
      ),
      Gf = Hr(
        da || (da = nr`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`),
      ),
      Jf = ge("span", { name: "MuiTouchRipple", slot: "Root", skipSx: !0 })({
        overflow: "hidden",
        pointerEvents: "none",
        position: "absolute",
        zIndex: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: "inherit",
      }),
      Xf = ge(Uf, { name: "MuiTouchRipple", slot: "Ripple" })(
        fa || (fa = nr`
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
`),
        se.rippleVisible,
        qf,
        mn,
        ({ theme: e }) => e.transitions.easing.easeInOut,
        se.ripplePulsate,
        ({ theme: e }) => e.transitions.duration.shorter,
        se.child,
        se.childLeaving,
        Kf,
        mn,
        ({ theme: e }) => e.transitions.easing.easeInOut,
        se.childPulsate,
        Gf,
        ({ theme: e }) => e.transitions.easing.easeInOut,
      ),
      Yf = L.forwardRef(function (e, t) {
        let r = Ne({ props: e, name: "MuiTouchRipple" }),
          { center: n = !1, classes: o = {}, className: i } = r,
          a = W(r, Vf),
          [l, c] = L.useState([]),
          s = L.useRef(0),
          u = L.useRef(null);
        L.useEffect(() => {
          u.current && (u.current(), u.current = null);
        }, [l]);
        let p = L.useRef(!1),
          h = L.useRef(null),
          d = L.useRef(null),
          f = L.useRef(null);
        L.useEffect(() =>
          () => {
            clearTimeout(h.current);
          }, []);
        let m = L.useCallback((b) => {
            let { pulsate: x, rippleX: S, rippleY: w, rippleSize: k, cb: j } =
              b;
            c(
              (D) => [
                ...D,
                hn(Xf, {
                  classes: {
                    ripple: V(o.ripple, se.ripple),
                    rippleVisible: V(o.rippleVisible, se.rippleVisible),
                    ripplePulsate: V(o.ripplePulsate, se.ripplePulsate),
                    child: V(o.child, se.child),
                    childLeaving: V(o.childLeaving, se.childLeaving),
                    childPulsate: V(o.childPulsate, se.childPulsate),
                  },
                  timeout: mn,
                  pulsate: x,
                  rippleX: S,
                  rippleY: w,
                  rippleSize: k,
                }, s.current),
              ],
            ),
              s.current += 1,
              u.current = j;
          }, [o]),
          y = L.useCallback((b = {}, x = {}, S) => {
            let {
              pulsate: w = !1,
              center: k = n || x.pulsate,
              fakeElement: j = !1,
            } = x;
            if (b.type === "mousedown" && p.current) {
              p.current = !1;
              return;
            }
            b.type === "touchstart" && (p.current = !0);
            let D = j ? null : f.current,
              K = D
                ? D.getBoundingClientRect()
                : { width: 0, height: 0, left: 0, top: 0 },
              G,
              ie,
              Q;
            if (
              k || b.clientX === 0 && b.clientY === 0 ||
              !b.clientX && !b.touches
            ) {
              G = Math.round(K.width / 2), ie = Math.round(K.height / 2);
            } else {
              let { clientX: E, clientY: re } = b.touches ? b.touches[0] : b;
              G = Math.round(E - K.left), ie = Math.round(re - K.top);
            }
            if (k) {
              Q = Math.sqrt((2 * K.width ** 2 + K.height ** 2) / 3),
                Q % 2 == 0 && (Q += 1);
            } else {
              let E = Math.max(
                      Math.abs(
                        (D
                          ? D.clientWidth
                          : 0) - G,
                      ),
                      G,
                    ) * 2 +
                  2,
                re = Math.max(Math.abs((D ? D.clientHeight : 0) - ie), ie) * 2 +
                  2;
              Q = Math.sqrt(E ** 2 + re ** 2);
            }
            b.touches
              ? d.current === null && (d.current = () => {
                m({
                  pulsate: w,
                  rippleX: G,
                  rippleY: ie,
                  rippleSize: Q,
                  cb: S,
                });
              },
                h.current = setTimeout(() => {
                  d.current && (d.current(), d.current = null);
                }, Hf))
              : m({
                pulsate: w,
                rippleX: G,
                rippleY: ie,
                rippleSize: Q,
                cb: S,
              });
          }, [n, m]),
          v = L.useCallback(() => {
            y({}, { pulsate: !0 });
          }, [y]),
          g = L.useCallback((b, x) => {
            if (clearTimeout(h.current), b.type === "touchend" && d.current) {
              d.current(),
                d.current = null,
                h.current = setTimeout(() => {
                  g(b, x);
                });
              return;
            }
            d.current = null,
              c((S) => S.length > 0 ? S.slice(1) : S),
              u.current = x;
          }, []);
        return L.useImperativeHandle(
          t,
          () => ({ pulsate: v, start: y, stop: g }),
          [v, y, g],
        ),
          hn(
            Jf,
            C({ className: V(o.root, se.root, i), ref: f }, a, {
              children: hn(Bf, { component: null, exit: !0, children: l }),
            }),
          );
      }),
      Qf = Yf;
    eh = Ie("MuiButtonBase", ["root", "disabled", "focusVisible"]),
      th = eh,
      oh = [
        "action",
        "centerRipple",
        "children",
        "className",
        "component",
        "disabled",
        "disableRipple",
        "disableTouchRipple",
        "focusRipple",
        "focusVisibleClassName",
        "LinkComponent",
        "onBlur",
        "onClick",
        "onContextMenu",
        "onDragLeave",
        "onFocus",
        "onFocusVisible",
        "onKeyDown",
        "onKeyUp",
        "onMouseDown",
        "onMouseLeave",
        "onMouseUp",
        "onTouchEnd",
        "onTouchMove",
        "onTouchStart",
        "tabIndex",
        "TouchRippleProps",
        "type",
      ],
      ih = (e) => {
        let {
            disabled: t,
            focusVisible: r,
            focusVisibleClassName: n,
            classes: o,
          } = e,
          i = He(
            { root: ["root", t && "disabled", r && "focusVisible"] },
            Zf,
            o,
          );
        return r && n && (i.root += ` ${n}`), i;
      },
      ah = ge("button", {
        name: "MuiButtonBase",
        slot: "Root",
        overridesResolver: (e, t) => t.root,
      })({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        WebkitTapHighlightColor: "transparent",
        backgroundColor: "transparent",
        outline: 0,
        border: 0,
        margin: 0,
        borderRadius: 0,
        padding: 0,
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        MozAppearance: "none",
        WebkitAppearance: "none",
        textDecoration: "none",
        color: "inherit",
        "&::-moz-focus-inner": { borderStyle: "none" },
        [`&.${th.disabled}`]: { pointerEvents: "none", cursor: "default" },
        "@media print": { colorAdjust: "exact" },
      }),
      sh = te.forwardRef(function (e, t) {
        let r = Ne({ props: e, name: "MuiButtonBase" }),
          {
            action: n,
            centerRipple: o = !1,
            children: i,
            className: a,
            component: l = "button",
            disabled: c = !1,
            disableRipple: s = !1,
            disableTouchRipple: u = !1,
            focusRipple: p = !1,
            LinkComponent: h = "a",
            onBlur: d,
            onClick: f,
            onContextMenu: m,
            onDragLeave: y,
            onFocus: v,
            onFocusVisible: g,
            onKeyDown: b,
            onKeyUp: x,
            onMouseDown: S,
            onMouseLeave: w,
            onMouseUp: k,
            onTouchEnd: j,
            onTouchMove: D,
            onTouchStart: K,
            tabIndex: G = 0,
            TouchRippleProps: ie,
            type: Q,
          } = r,
          E = W(r, oh),
          re = te.useRef(null),
          pe = te.useRef(null),
          { isFocusVisibleRef: so, onFocus: Zs, onBlur: ec, ref: tc } = jf(),
          [Re, zt] = te.useState(!1);
        c && Re && zt(!1),
          te.useImperativeHandle(n, () => ({
            focusVisible: () => {
              zt(!0), re.current.focus();
            },
          }), []),
          te.useEffect(() => {
            Re && p && !s && pe.current.pulsate();
          }, [s, p, Re]);
        function ye(z, lo, wc = u) {
          return Qt(
            (uo) => (lo && lo(uo), !wc && pe.current && pe.current[z](uo), !0),
          );
        }
        let rc = ye("start", S),
          nc = ye("stop", m),
          oc = ye("stop", y),
          ic = ye("stop", k),
          ac = ye("stop", (z) => {
            Re && z.preventDefault(), w && w(z);
          }),
          sc = ye("start", K),
          cc = ye("stop", j),
          lc = ye("stop", D),
          uc = ye("stop", (z) => {
            ec(z), so.current === !1 && zt(!1), d && d(z);
          }, !1),
          pc = Qt((z) => {
            re.current || (re.current = z.currentTarget),
              Zs(z),
              so.current === !0 && (zt(!0), g && g(z)),
              v && v(z);
          }),
          Cr = () => {
            let z = re.current;
            return l && l !== "button" && !(z.tagName === "A" && z.href);
          },
          _r = te.useRef(!1),
          dc = Qt((z) => {
            p && !_r.current && Re && pe.current && z.key === " " &&
            (_r.current = !0,
              pe.current.stop(z, () => {
                pe.current.start(z);
              })),
              z.target === z.currentTarget && Cr() && z.key === " " &&
              z.preventDefault(),
              b && b(z),
              z.target === z.currentTarget && Cr() && z.key === "Enter" && !c &&
              (z.preventDefault(), f && f(z));
          }),
          fc = Qt((z) => {
            p && z.key === " " && pe.current && Re && !z.defaultPrevented &&
            (_r.current = !1,
              pe.current.stop(z, () => {
                pe.current.pulsate(z);
              })),
              x && x(z),
              f && z.target === z.currentTarget && Cr() && z.key === " " &&
              !z.defaultPrevented && f(z);
          }),
          Tt = l;
        Tt === "button" && (E.href || E.to) && (Tt = h);
        let rt = {};
        Tt === "button"
          ? (rt.type = Q === void 0 ? "button" : Q, rt.disabled = c)
          : (!E.href && !E.to && (rt.role = "button"),
            c && (rt["aria-disabled"] = c));
        let hc = sa(tc, re), mc = sa(t, hc), [gc, yc] = te.useState(!1);
        te.useEffect(() => {
          yc(!0);
        }, []);
        let bc = gc && !s && !c,
          co = C({}, r, {
            centerRipple: o,
            component: l,
            disabled: c,
            disableRipple: s,
            disableTouchRipple: u,
            focusRipple: p,
            tabIndex: G,
            focusVisible: Re,
          }),
          vc = ih(co);
        return nh(
          ah,
          C(
            {
              as: Tt,
              className: V(vc.root, a),
              ownerState: co,
              onBlur: uc,
              onClick: f,
              onContextMenu: nc,
              onFocus: pc,
              onKeyDown: dc,
              onKeyUp: fc,
              onMouseDown: rc,
              onMouseLeave: ac,
              onMouseUp: ic,
              onDragLeave: oc,
              onTouchEnd: cc,
              onTouchMove: lc,
              onTouchStart: sc,
              ref: mc,
              tabIndex: c ? -1 : G,
              type: Q,
            },
            rt,
            E,
            {
              children: [i, bc ? rh(Qf, C({ ref: pe, center: o }, ie)) : null],
            },
          ),
        );
      }),
      gn = sh,
      F = lt;
    lh = Ie("MuiFab", [
      "root",
      "primary",
      "secondary",
      "extended",
      "circular",
      "focusVisible",
      "disabled",
      "colorInherit",
      "sizeSmall",
      "sizeMedium",
      "sizeLarge",
    ]),
      ha = lh,
      ph = [
        "children",
        "className",
        "color",
        "component",
        "disabled",
        "disableFocusRipple",
        "focusVisibleClassName",
        "size",
        "variant",
      ],
      dh = (e) => {
        let { color: t, variant: r, classes: n, size: o } = e,
          i = {
            root: [
              "root",
              r,
              `size${F(o)}`,
              t === "inherit" && "colorInherit",
              t === "primary" && "primary",
              t === "secondary" && "secondary",
            ],
          };
        return He(i, ch, n);
      },
      fh = ge(gn, {
        name: "MuiFab",
        slot: "Root",
        overridesResolver: (e, t) => {
          let { ownerState: r } = e;
          return [
            t.root,
            t[r.variant],
            t[`size${F(r.size)}`],
            r.color === "inherit" && t.colorInherit,
            r.color === "primary" && t.primary,
            r.color === "secondary" && t.secondary,
          ];
        },
      })(({ theme: e, ownerState: t }) =>
        C(
          {},
          e.typography.button,
          {
            minHeight: 36,
            transition: e.transitions.create([
              "background-color",
              "box-shadow",
              "border-color",
            ], { duration: e.transitions.duration.short }),
            borderRadius: "50%",
            padding: 0,
            minWidth: 0,
            width: 56,
            height: 56,
            boxShadow: e.shadows[6],
            "&:active": { boxShadow: e.shadows[12] },
            color: e.palette.getContrastText(e.palette.grey[300]),
            backgroundColor: e.palette.grey[300],
            "&:hover": {
              backgroundColor: e.palette.grey.A100,
              "@media (hover: none)": { backgroundColor: e.palette.grey[300] },
              textDecoration: "none",
            },
            [`&.${ha.focusVisible}`]: { boxShadow: e.shadows[6] },
            [`&.${ha.disabled}`]: {
              color: e.palette.action.disabled,
              boxShadow: e.shadows[0],
              backgroundColor: e.palette.action.disabledBackground,
            },
          },
          t.size === "small" && { width: 40, height: 40 },
          t.size === "medium" && { width: 48, height: 48 },
          t.variant === "extended" &&
            {
              borderRadius: 48 / 2,
              padding: "0 16px",
              width: "auto",
              minHeight: "auto",
              minWidth: 48,
              height: 48,
            },
          t.variant === "extended" && t.size === "small" &&
            {
              width: "auto",
              padding: "0 8px",
              borderRadius: 34 / 2,
              minWidth: 34,
              height: 34,
            },
          t.variant === "extended" && t.size === "medium" &&
            {
              width: "auto",
              padding: "0 16px",
              borderRadius: 40 / 2,
              minWidth: 40,
              height: 40,
            },
          t.color === "inherit" && { color: "inherit" },
        ), ({ theme: e, ownerState: t }) =>
        C(
          {},
          t.color === "primary" &&
            {
              color: e.palette.primary.contrastText,
              backgroundColor: e.palette.primary.main,
              "&:hover": {
                backgroundColor: e.palette.primary.dark,
                "@media (hover: none)": {
                  backgroundColor: e.palette.primary.main,
                },
              },
            },
          t.color === "secondary" &&
            {
              color: e.palette.secondary.contrastText,
              backgroundColor: e.palette.secondary.main,
              "&:hover": {
                backgroundColor: e.palette.secondary.dark,
                "@media (hover: none)": {
                  backgroundColor: e.palette.secondary.main,
                },
              },
            },
        )),
      hh = vi.forwardRef(function (e, t) {
        let r = Ne({ props: e, name: "MuiFab" }),
          {
            children: n,
            className: o,
            color: i = "default",
            component: a = "button",
            disabled: l = !1,
            disableFocusRipple: c = !1,
            focusVisibleClassName: s,
            size: u = "large",
            variant: p = "circular",
          } = r,
          h = W(r, ph),
          d = C({}, r, {
            color: i,
            component: a,
            disabled: l,
            disableFocusRipple: c,
            size: u,
            variant: p,
          }),
          f = dh(d);
        return uh(
          fh,
          C(
            {
              className: V(f.root, o),
              component: a,
              disabled: l,
              focusRipple: !c,
              focusVisibleClassName: V(f.focusVisible, s),
              ownerState: d,
              ref: t,
            },
            h,
            { children: n },
          ),
        );
      }),
      ma = hh,
      Lg = ae(de());
    gh = Ie("MuiButton", [
      "root",
      "text",
      "textInherit",
      "textPrimary",
      "textSecondary",
      "outlined",
      "outlinedInherit",
      "outlinedPrimary",
      "outlinedSecondary",
      "contained",
      "containedInherit",
      "containedPrimary",
      "containedSecondary",
      "disableElevation",
      "focusVisible",
      "disabled",
      "colorInherit",
      "textSizeSmall",
      "textSizeMedium",
      "textSizeLarge",
      "outlinedSizeSmall",
      "outlinedSizeMedium",
      "outlinedSizeLarge",
      "containedSizeSmall",
      "containedSizeMedium",
      "containedSizeLarge",
      "sizeMedium",
      "sizeSmall",
      "sizeLarge",
      "fullWidth",
      "startIcon",
      "endIcon",
      "iconSizeSmall",
      "iconSizeMedium",
      "iconSizeLarge",
    ]),
      ir = gh,
      yh = ga.createContext({}),
      bh = yh,
      wh = [
        "children",
        "color",
        "component",
        "className",
        "disabled",
        "disableElevation",
        "disableFocusRipple",
        "endIcon",
        "focusVisibleClassName",
        "fullWidth",
        "size",
        "startIcon",
        "type",
        "variant",
      ],
      xh = (e) => {
        let {
            color: t,
            disableElevation: r,
            fullWidth: n,
            size: o,
            variant: i,
            classes: a,
          } = e,
          l = {
            root: [
              "root",
              i,
              `${i}${F(t)}`,
              `size${F(o)}`,
              `${i}Size${F(o)}`,
              t === "inherit" && "colorInherit",
              r && "disableElevation",
              n && "fullWidth",
            ],
            label: ["label"],
            startIcon: ["startIcon", `iconSize${F(o)}`],
            endIcon: ["endIcon", `iconSize${F(o)}`],
          },
          c = He(l, mh, a);
        return C({}, a, c);
      },
      ba = (e) => C(
        {},
        e.size === "small" && { "& > *:nth-of-type(1)": { fontSize: 18 } },
        e.size === "medium" && { "& > *:nth-of-type(1)": { fontSize: 20 } },
        e.size === "large" && { "& > *:nth-of-type(1)": { fontSize: 22 } },
      ),
      kh = ge(gn, {
        shouldForwardProp: (e) => aa(e) || e === "classes",
        name: "MuiButton",
        slot: "Root",
        overridesResolver: (e, t) => {
          let { ownerState: r } = e;
          return [
            t.root,
            t[r.variant],
            t[`${r.variant}${F(r.color)}`],
            t[`size${F(r.size)}`],
            t[`${r.variant}Size${F(r.size)}`],
            r.color === "inherit" && t.colorInherit,
            r.disableElevation && t.disableElevation,
            r.fullWidth && t.fullWidth,
          ];
        },
      })(({ theme: e, ownerState: t }) =>
        C(
          {},
          e.typography.button,
          {
            minWidth: 64,
            padding: "6px 16px",
            borderRadius: e.shape.borderRadius,
            transition: e.transitions.create([
              "background-color",
              "box-shadow",
              "border-color",
              "color",
            ], { duration: e.transitions.duration.short }),
            "&:hover": C(
              {
                textDecoration: "none",
                backgroundColor: Me(
                  e.palette.text.primary,
                  e.palette.action.hoverOpacity,
                ),
                "@media (hover: none)": { backgroundColor: "transparent" },
              },
              t.variant === "text" && t.color !== "inherit" &&
                {
                  backgroundColor: Me(
                    e.palette[t.color].main,
                    e.palette.action.hoverOpacity,
                  ),
                  "@media (hover: none)": { backgroundColor: "transparent" },
                },
              t.variant === "outlined" && t.color !== "inherit" &&
                {
                  border: `1px solid ${e.palette[t.color].main}`,
                  backgroundColor: Me(
                    e.palette[t.color].main,
                    e.palette.action.hoverOpacity,
                  ),
                  "@media (hover: none)": { backgroundColor: "transparent" },
                },
              t.variant === "contained" &&
                {
                  backgroundColor: e.palette.grey.A100,
                  boxShadow: e.shadows[4],
                  "@media (hover: none)": {
                    boxShadow: e.shadows[2],
                    backgroundColor: e.palette.grey[300],
                  },
                },
              t.variant === "contained" && t.color !== "inherit" &&
                {
                  backgroundColor: e.palette[t.color].dark,
                  "@media (hover: none)": {
                    backgroundColor: e.palette[t.color].main,
                  },
                },
            ),
            "&:active": C(
              {},
              t.variant === "contained" && { boxShadow: e.shadows[8] },
            ),
            [`&.${ir.focusVisible}`]: C(
              {},
              t.variant === "contained" && { boxShadow: e.shadows[6] },
            ),
            [`&.${ir.disabled}`]: C(
              { color: e.palette.action.disabled },
              t.variant === "outlined" &&
                { border: `1px solid ${e.palette.action.disabledBackground}` },
              t.variant === "outlined" && t.color === "secondary" &&
                { border: `1px solid ${e.palette.action.disabled}` },
              t.variant === "contained" &&
                {
                  color: e.palette.action.disabled,
                  boxShadow: e.shadows[0],
                  backgroundColor: e.palette.action.disabledBackground,
                },
            ),
          },
          t.variant === "text" && { padding: "6px 8px" },
          t.variant === "text" && t.color !== "inherit" &&
            { color: e.palette[t.color].main },
          t.variant === "outlined" &&
            {
              padding: "5px 15px",
              border: `1px solid ${
                e.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.23)"
                  : "rgba(255, 255, 255, 0.23)"
              }`,
            },
          t.variant === "outlined" && t.color !== "inherit" &&
            {
              color: e.palette[t.color].main,
              border: `1px solid ${Me(e.palette[t.color].main, .5)}`,
            },
          t.variant === "contained" &&
            {
              color: e.palette.getContrastText(e.palette.grey[300]),
              backgroundColor: e.palette.grey[300],
              boxShadow: e.shadows[2],
            },
          t.variant === "contained" && t.color !== "inherit" &&
            {
              color: e.palette[t.color].contrastText,
              backgroundColor: e.palette[t.color].main,
            },
          t.color === "inherit" &&
            { color: "inherit", borderColor: "currentColor" },
          t.size === "small" && t.variant === "text" &&
            { padding: "4px 5px", fontSize: e.typography.pxToRem(13) },
          t.size === "large" && t.variant === "text" &&
            { padding: "8px 11px", fontSize: e.typography.pxToRem(15) },
          t.size === "small" && t.variant === "outlined" &&
            { padding: "3px 9px", fontSize: e.typography.pxToRem(13) },
          t.size === "large" && t.variant === "outlined" &&
            { padding: "7px 21px", fontSize: e.typography.pxToRem(15) },
          t.size === "small" && t.variant === "contained" &&
            { padding: "4px 10px", fontSize: e.typography.pxToRem(13) },
          t.size === "large" && t.variant === "contained" &&
            { padding: "8px 22px", fontSize: e.typography.pxToRem(15) },
          t.fullWidth && { width: "100%" },
        ), ({ ownerState: e }) =>
        e.disableElevation &&
        {
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
          [`&.${ir.focusVisible}`]: { boxShadow: "none" },
          "&:active": { boxShadow: "none" },
          [`&.${ir.disabled}`]: { boxShadow: "none" },
        }),
      Sh = ge("span", {
        name: "MuiButton",
        slot: "StartIcon",
        overridesResolver: (e, t) => {
          let { ownerState: r } = e;
          return [t.startIcon, t[`iconSize${F(r.size)}`]];
        },
      })(({ ownerState: e }) => C(
        { display: "inherit", marginRight: 8, marginLeft: -4 },
        e.size === "small" && { marginLeft: -2 },
        ba(e),
      )),
      Eh = ge("span", {
        name: "MuiButton",
        slot: "EndIcon",
        overridesResolver: (e, t) => {
          let { ownerState: r } = e;
          return [t.endIcon, t[`iconSize${F(r.size)}`]];
        },
      })(({ ownerState: e }) => C(
        { display: "inherit", marginRight: -4, marginLeft: 8 },
        e.size === "small" && { marginRight: -2 },
        ba(e),
      )),
      Oh = or.forwardRef(function (e, t) {
        let r = or.useContext(bh),
          n = Ei(r, e),
          o = Ne({ props: n, name: "MuiButton" }),
          {
            children: i,
            color: a = "primary",
            component: l = "button",
            className: c,
            disabled: s = !1,
            disableElevation: u = !1,
            disableFocusRipple: p = !1,
            endIcon: h,
            focusVisibleClassName: d,
            fullWidth: f = !1,
            size: m = "medium",
            startIcon: y,
            type: v,
            variant: g = "text",
          } = o,
          b = W(o, wh),
          x = C({}, o, {
            color: a,
            component: l,
            disabled: s,
            disableElevation: u,
            disableFocusRipple: p,
            fullWidth: f,
            size: m,
            type: v,
            variant: g,
          }),
          S = xh(x),
          w = y &&
            ya(Sh, { className: S.startIcon, ownerState: x, children: y }),
          k = h && ya(Eh, { className: S.endIcon, ownerState: x, children: h });
        return vh(
          kh,
          C(
            {
              ownerState: x,
              className: V(c, r.className),
              component: l,
              disabled: s,
              focusRipple: !p,
              focusVisibleClassName: V(S.focusVisible, d),
              ref: t,
              type: v,
            },
            b,
            { classes: S, children: [w, i, k] },
          ),
        );
      }),
      Ch = Oh,
      Fg = ae(de());
    zh = Ie("MuiToggleButton", [
      "root",
      "disabled",
      "selected",
      "standard",
      "primary",
      "secondary",
      "sizeSmall",
      "sizeMedium",
      "sizeLarge",
    ]),
      wa = zh,
      jh = [
        "children",
        "className",
        "color",
        "disabled",
        "disableFocusRipple",
        "fullWidth",
        "onChange",
        "onClick",
        "selected",
        "size",
        "value",
      ],
      Mh = (e) => {
        let {
            classes: t,
            fullWidth: r,
            selected: n,
            disabled: o,
            size: i,
            color: a,
          } = e,
          l = {
            root: [
              "root",
              n && "selected",
              o && "disabled",
              r && "fullWidth",
              `size${F(i)}`,
              a,
            ],
          };
        return He(l, _h, t);
      },
      Ah = ge(gn, {
        name: "MuiToggleButton",
        slot: "Root",
        overridesResolver: (e, t) => {
          let { ownerState: r } = e;
          return [t.root, t[`size${F(r.size)}`]];
        },
      })(({ theme: e, ownerState: t }) => {
        let r = t.color === "standard"
          ? e.palette.text.primary
          : e.palette[t.color].main;
        return C(
          {},
          e.typography.button,
          {
            borderRadius: e.shape.borderRadius,
            padding: 11,
            border: `1px solid ${e.palette.divider}`,
            color: e.palette.action.active,
          },
          t.fullWidth && { width: "100%" },
          {
            [`&.${wa.disabled}`]: {
              color: e.palette.action.disabled,
              border: `1px solid ${e.palette.action.disabledBackground}`,
            },
            "&:hover": {
              textDecoration: "none",
              backgroundColor: Me(
                e.palette.text.primary,
                e.palette.action.hoverOpacity,
              ),
              "@media (hover: none)": { backgroundColor: "transparent" },
            },
            [`&.${wa.selected}`]: {
              color: r,
              backgroundColor: Me(r, e.palette.action.selectedOpacity),
              "&:hover": {
                backgroundColor: Me(
                  r,
                  e.palette.action.selectedOpacity +
                    e.palette.action.hoverOpacity,
                ),
                "@media (hover: none)": {
                  backgroundColor: Me(r, e.palette.action.selectedOpacity),
                },
              },
            },
          },
          t.size === "small" &&
            { padding: 7, fontSize: e.typography.pxToRem(13) },
          t.size === "large" &&
            { padding: 15, fontSize: e.typography.pxToRem(15) },
        );
      }),
      Ph = va.forwardRef(function (e, t) {
        let r = Ne({ props: e, name: "MuiToggleButton" }),
          {
            children: n,
            className: o,
            color: i = "standard",
            disabled: a = !1,
            disableFocusRipple: l = !1,
            fullWidth: c = !1,
            onChange: s,
            onClick: u,
            selected: p,
            size: h = "medium",
            value: d,
          } = r,
          f = W(r, jh),
          m = C({}, r, {
            color: i,
            disabled: a,
            disableFocusRipple: l,
            fullWidth: c,
            size: h,
          }),
          y = Mh(m),
          v = (g) => {
            u && (u(g, d), g.defaultPrevented) || s && s(g, d);
          };
        return Th(
          Ah,
          C(
            {
              className: V(y.root, o),
              disabled: a,
              focusRipple: !l,
              ref: t,
              onClick: v,
              onChange: s,
              value: d,
              ownerState: m,
              "aria-pressed": p,
            },
            f,
            { children: n },
          ),
        );
      }),
      xa = Ph,
      Wg = ae(gl()),
      Vg = ae(de());
    Dh = Ie("MuiToggleButtonGroup", [
      "root",
      "selected",
      "vertical",
      "disabled",
      "grouped",
      "groupedHorizontal",
      "groupedVertical",
    ]),
      ve = Dh,
      Lh = [
        "children",
        "className",
        "color",
        "disabled",
        "exclusive",
        "fullWidth",
        "onChange",
        "orientation",
        "size",
        "value",
      ],
      Nh = (e) => {
        let { classes: t, orientation: r, fullWidth: n, disabled: o } = e,
          i = {
            root: ["root", r === "vertical" && "vertical", n && "fullWidth"],
            grouped: ["grouped", `grouped${F(r)}`, o && "disabled"],
          };
        return He(i, Rh, t);
      },
      Bh = ge("div", {
        name: "MuiToggleButtonGroup",
        slot: "Root",
        overridesResolver: (e, t) => {
          let { ownerState: r } = e;
          return [
            { [`& .${ve.grouped}`]: t.grouped },
            { [`& .${ve.grouped}`]: t[`grouped${F(r.orientation)}`] },
            t.root,
            r.orientation === "vertical" && t.vertical,
            r.fullWidth && t.fullWidth,
          ];
        },
      })(({ ownerState: e, theme: t }) =>
        C(
          { display: "inline-flex", borderRadius: t.shape.borderRadius },
          e.orientation === "vertical" && { flexDirection: "column" },
          e.fullWidth && { width: "100%" },
          {
            [`& .${ve.grouped}`]: C(
              {},
              e.orientation === "horizontal"
                ? {
                  "&:not(:first-of-type)": {
                    marginLeft: -1,
                    borderLeft: "1px solid transparent",
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  },
                  "&:not(:last-of-type)": {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                  [`&.${ve.selected} + .${ve.grouped}.${ve.selected}`]: {
                    borderLeft: 0,
                    marginLeft: 0,
                  },
                }
                : {
                  "&:not(:first-of-type)": {
                    marginTop: -1,
                    borderTop: "1px solid transparent",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  },
                  "&:not(:last-of-type)": {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                  [`&.${ve.selected} + .${ve.grouped}.${ve.selected}`]: {
                    borderTop: 0,
                    marginTop: 0,
                  },
                },
            ),
          },
        )
      ),
      Fh = Ae.forwardRef(function (e, t) {
        let r = Ne({ props: e, name: "MuiToggleButtonGroup" }),
          {
            children: n,
            className: o,
            color: i = "standard",
            disabled: a = !1,
            exclusive: l = !1,
            fullWidth: c = !1,
            onChange: s,
            orientation: u = "horizontal",
            size: p = "medium",
            value: h,
          } = r,
          d = W(r, Lh),
          f = C({}, r, { disabled: a, fullWidth: c, orientation: u, size: p }),
          m = Nh(f),
          y = (g, b) => {
            if (!s) return;
            let x = h && h.indexOf(b), S;
            h && x >= 0
              ? (S = h.slice(), S.splice(x, 1))
              : S = h ? h.concat(b) : [b], s(g, S);
          },
          v = (g, b) => {
            !s || s(g, h === b ? null : b);
          };
        return Ih(
          Bh,
          C(
            { role: "group", className: V(m.root, o), ref: t, ownerState: f },
            d,
            {
              children: Ae.Children.map(n, (g) =>
                Ae.isValidElement(g)
                  ? Ae.cloneElement(g, {
                    className: V(m.grouped, g.props.className),
                    onChange: l ? v : y,
                    selected: g.props.selected === void 0
                      ? $h(g.props.value, h)
                      : g.props.selected,
                    size: g.props.size || p,
                    fullWidth: c,
                    color: g.props.color || i,
                    disabled: g.props.disabled || a,
                  })
                  : null),
            },
          ),
        );
      }),
      ka = Fh,
      qg = ae(de());
    Kg = Ie("MuiSvgIcon", [
      "root",
      "colorPrimary",
      "colorSecondary",
      "colorAction",
      "colorError",
      "colorDisabled",
      "fontSizeInherit",
      "fontSizeSmall",
      "fontSizeMedium",
      "fontSizeLarge",
    ]),
      Hh = [
        "children",
        "className",
        "color",
        "component",
        "fontSize",
        "htmlColor",
        "titleAccess",
        "viewBox",
      ],
      qh = (e) => {
        let { color: t, fontSize: r, classes: n } = e,
          o = {
            root: [
              "root",
              t !== "inherit" && `color${F(t)}`,
              `fontSize${F(r)}`,
            ],
          };
        return He(o, Uh, n);
      },
      Kh = ge("svg", {
        name: "MuiSvgIcon",
        slot: "Root",
        overridesResolver: (e, t) => {
          let { ownerState: r } = e;
          return [
            t.root,
            r.color !== "inherit" && t[`color${F(r.color)}`],
            t[`fontSize${F(r.fontSize)}`],
          ];
        },
      })(({ theme: e, ownerState: t }) => {
        var r, n;
        return {
          userSelect: "none",
          width: "1em",
          height: "1em",
          display: "inline-block",
          fill: "currentColor",
          flexShrink: 0,
          transition: e.transitions.create("fill", {
            duration: e.transitions.duration.shorter,
          }),
          fontSize: {
            inherit: "inherit",
            small: e.typography.pxToRem(20),
            medium: e.typography.pxToRem(24),
            large: e.typography.pxToRem(35),
          }[t.fontSize],
          color: (r = (n = e.palette[t.color]) == null
              ? void 0
              : n.main) != null
            ? r
            : {
              action: e.palette.action.active,
              disabled: e.palette.action.disabled,
              inherit: void 0,
            }[t.color],
        };
      }),
      Ea = Sa.forwardRef(function (e, t) {
        let r = Ne({ props: e, name: "MuiSvgIcon" }),
          {
            children: n,
            className: o,
            color: i = "inherit",
            component: a = "svg",
            fontSize: l = "medium",
            htmlColor: c,
            titleAccess: s,
            viewBox: u = "0 0 24 24",
          } = r,
          p = W(r, Hh),
          h = C({}, r, { color: i, component: a, fontSize: l, viewBox: u }),
          d = qh(h);
        return Vh(
          Kh,
          C(
            {
              as: a,
              className: V(d.root, o),
              ownerState: h,
              focusable: "false",
              viewBox: u,
              color: c,
              "aria-hidden": s ? void 0 : !0,
              role: s ? "img" : void 0,
              ref: t,
            },
            p,
            { children: [n, s ? Wh("title", { children: s }) : null] },
          ),
        );
      });
    Ea.muiName = "SvgIcon";
    Oa = Ea;
    Jh = yt(
      $.createElement("path", {
        key: "12",
        d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z",
      }),
      "Share",
    ),
      Xh = yt(
        $.createElement("path", {
          key: "12",
          d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z",
        }),
        "TabletAndroid",
      ),
      Yh = yt(
        $.createElement("path", {
          key: "12",
          d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z",
        }),
        "Tv",
      ),
      Qh = yt(
        $.createElement("path", {
          key: "12",
          d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z",
        }),
        "PhoneAndroid",
      ),
      Zh = yt(
        $.createElement("path", {
          key: "12",
          d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z",
        }),
        "QrCode",
      ),
      em = ({ url: e }) => {
        let t = $.useRef(null);
        return $.useEffect(() => {
          (async () => {
            let { QRious: r } = await Promise.resolve().then(() => (yl(), wo)),
              n = {
                size: 200,
                element: t.current,
                foregroundAlpha: .9,
                foreground: "white",
                backgroundAlpha: 1,
                padding: 16,
                background: "#1e1e1e",
                value: e,
              },
              o = new r(n);
          })();
        }, [e]),
          T("canvas", {
            css: X`
        border-radius: 16px;
        margin-bottom: 8px;
  `,
            ref: t,
          });
      },
      tm = ({ url: e }) => {
        let [t, r] = $.useState(!1);
        return T(
          bt.div,
          {
            animate: {
              width: t ? 200 : 56,
              height: t ? 220 : 48,
            },
            onClick: (n) => {
              r(!t);
            },
            css: X`
                margin-bottom: 12px;
              `,
          },
          t ? T(em, { key: e, url: e + "/edit/" }) : T(ma, {
            variant: "extended",
            color: "secondary",
            onClick: () => {
              r(!t);
            },
          }, T(Zh, null)),
        );
      },
      { Suspense: rm } = $,
      Ca = [640, 1024, 1920],
      nm = [10, 25, 50, 75, 100],
      om = $.lazy(() => import("https://code.spike.land/api/room/sanyi/js")),
      Yg = $.lazy(() => import("https://code.spike.land/api/room/sanyi/js"));
    am = ({ onShare: e, onRestore: t, position: r, session: n }) => {
      let [o, i] = $.useState(!1),
        [a, l] = $.useState(75),
        [c, s] = $.useState(innerHeight),
        [u, p] = $.useState([n.children]);
      n.setChild = p;
      let [h, d] = $.useState(n.url),
        [f, m] = $.useState(" "),
        [y, v] = $.useState(Ca[1]),
        g = $.useRef(null),
        b = $.useRef(null),
        x = u[u.length - 1];
      $.useEffect(() => {
        window.addEventListener("resize", () => s(window.innerHeight));
      }),
        $.useEffect(() => {
          let w = setInterval(() => {
            if (f !== n.errorText) {
              let k = n.errorText;
              m(k),
                i(!1),
                setTimeout(() => {
                  n.errorText === k && i(!0);
                }, 2e3);
            }
            h !== n.url && d(n.url);
          }, 200);
          return () => clearInterval(w);
        }, [m, d, f, h]);
      let S = a / 100;
      return T(
        $.Fragment,
        null,
        T(
          bt.div,
          {
            ref: g,
            css: X`
            right: 20px;
            background-color:rgba(92 ,92, 152, 0.8);
            backdrop-filter: blur(10px);
            top: 20px;
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${r || "fixed"};
          `,
            dragElastic: .5,
            dragConstraints: {
              left: 0,
              right: y - 20 - y / 6,
              top: -c + 100,
              bottom: innerHeight - 100,
            },
            dragMomentum: !1,
            drag: !0,
          },
          T(
            "div",
            {
              css: X` 
              display: flex;
                `,
            },
            T(
              "div",
              {
                css: X`
            display: flex;
            flex-direction: column;
            align-items: center;
          `,
              },
              T(
                ka,
                {
                  value: a,
                  size: "small",
                  exclusive: !0,
                  onChange: (w, k) => k && l(k),
                },
                nm.map((w) =>
                  T(
                    xa,
                    { key: w, value: w },
                    T(
                      "span",
                      {
                        css: X`
                       color: ${
                          w === a ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"
                        };
                       `,
                      },
                      w,
                      "%",
                    ),
                  )
                ),
              ),
              T(
                bt.div,
                {
                  animate: { width: y * S / devicePixelRatio, height: c * S },
                  css: X`
              display: block;
              overflow: hidden;
              border-radius: 8px;
              opacity: 0.9;
           `,
                },
                f.trim() !== "" && T(
                  "pre",
                  {
                    css: X`
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
                `,
                  },
                  o && f.trim(),
                  o && f.trim() !== "" && T(
                    "div",
                    {
                      css: X`
                          text-align: right;
                        `,
                    },
                    T(Ch, {
                      variant: "contained",
                      onClick: () => {
                        t(), m("");
                      },
                      color: "primary",
                    }, "Restore"),
                  ),
                ),
                T(
                  bt.div,
                  {
                    animate: {
                      transformOrigin: "0px 0px",
                      width: y / devicePixelRatio,
                      height: c,
                      scale: S,
                    },
                    css: X`
                  overflow:overlay;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `,
                  },
                  f ? T("div", { dangerouslySetInnerHTML: sm(n.html) })
                  : T($.Suspense, {
                    fallback: T("div", null, "Error fallback"),
                  }, T("div", { id: "zbody", key: n.i, ref: b }, x)),
                ),
              ),
              T(
                ka,
                {
                  value: y,
                  size: "small",
                  exclusive: !0,
                  onChange: (w, k) => k && v(k),
                },
                Ca.map((w) =>
                  T(
                    xa,
                    { key: w, value: w },
                    w === 640
                      ? T(Qh, {
                        css: X`
                        color: ${
                          y === 640 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"
                        };
                        `,
                      })
                      : w === 1024
                      ? T(Xh, {
                        css: X`
                        color: ${
                          y === 1024 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"
                        };
                        `,
                      })
                      : T(Yh, {
                        css: X`
                        color: ${
                          y === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"
                        };
                      `,
                      }),
                  )
                ),
              ),
            ),
            T(
              "div",
              {
                css: X`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              `,
              },
              T(tm, { url: h }),
              T(ma, {
                variant: "extended",
                color: "primary",
                onClick: () => {
                  e();
                },
              }, T(Jh, null)),
              T(im, null),
            ),
          ),
        ),
      );
    };
    ({ motion: bt } = Go),
      cm = (e, t) => {
        let r = Xo.render(T(Jo, { children: e }), t);
      },
      lm = $;
  });
var Fa = {};
Ce(Fa, {
  assemble: () => Na,
  diff: () => La,
  getDB: () => On,
  getDbObj: () => Ba,
  sha256: () => ce,
  shaDB: () => P,
});
import zm from "https://unpkg.com/@spike.land/esm@0.2.49/dist/ipfs-only-hash.mjs";
function pm() {
  return Ta ||
    (Ta = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function dm() {
  return ja ||
    (ja = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ]);
}
function fm(e) {
  let t = new Promise((r, n) => {
    let o = () => {
        e.removeEventListener("success", i), e.removeEventListener("error", a);
      },
      i = () => {
        r(Pe(e.result)), o();
      },
      a = () => {
        n(e.error), o();
      };
    e.addEventListener("success", i), e.addEventListener("error", a);
  });
  return t.then((r) => {
    r instanceof IDBCursor && Ma.set(r, e);
  }).catch(() => {}),
    vn.set(t, e),
    t;
}
function hm(e) {
  if (yn.has(e)) return;
  let t = new Promise((r, n) => {
    let o = () => {
        e.removeEventListener("complete", i),
          e.removeEventListener("error", a),
          e.removeEventListener("abort", a);
      },
      i = () => {
        r(), o();
      },
      a = () => {
        n(e.error || new DOMException("AbortError", "AbortError")), o();
      };
    e.addEventListener("complete", i),
      e.addEventListener("error", a),
      e.addEventListener("abort", a);
  });
  yn.set(e, t);
}
function mm(e) {
  wn = e(wn);
}
function gm(e) {
  return e === IDBDatabase.prototype.transaction &&
      !("objectStoreNames" in IDBTransaction.prototype)
    ? function (t, ...r) {
      let n = e.call(xn(this), t, ...r);
      return Aa.set(n, t.sort ? t.sort() : [t]), Pe(n);
    }
    : dm().includes(e)
    ? function (...t) {
      return e.apply(xn(this), t), Pe(Ma.get(this));
    }
    : function (...t) {
      return Pe(e.apply(xn(this), t));
    };
}
function ym(e) {
  return typeof e == "function"
    ? gm(e)
    : (e instanceof IDBTransaction && hm(e),
      um(e, pm()) ? new Proxy(e, wn) : e);
}
function Pe(e) {
  if (e instanceof IDBRequest) return fm(e);
  if (bn.has(e)) return bn.get(e);
  let t = ym(e);
  return t !== e && (bn.set(e, t), vn.set(t, e)), t;
}
function bm(e, t, { blocked: r, upgrade: n, blocking: o, terminated: i } = {}) {
  let a = indexedDB.open(e, t), l = Pe(a);
  return n && a.addEventListener("upgradeneeded", (c) => {
    n(Pe(a.result), c.oldVersion, c.newVersion, Pe(a.transaction));
  }),
    r && a.addEventListener("blocked", () => r()),
    l.then((c) => {
      i && c.addEventListener("close", () => i()),
        o && c.addEventListener("versionchange", () => o());
    }).catch(() => {}),
    l;
}
function Pa(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
  if (kn.get(t)) return kn.get(t);
  let r = t.replace(/FromIndex$/, ""), n = t !== r, o = wm.includes(r);
  if (
    !(r in (n ? IDBIndex : IDBObjectStore).prototype) || !(o || vm.includes(r))
  ) {
    return;
  }
  let i = async function (a, ...l) {
    let c = this.transaction(a, o ? "readwrite" : "readonly"), s = c.store;
    return n && (s = s.index(l.shift())),
      (await Promise.all([s[r](...l), o && c.done]))[0];
  };
  return kn.set(t, i), i;
}
function we() {}
function xm(e, t, r, n, o) {
  for (var i = 0, a = t.length, l = 0, c = 0; i < a; i++) {
    var s = t[i];
    if (s.removed) {
      if (
        s.value = e.join(n.slice(c, c + s.count)),
          c += s.count,
          i && t[i - 1].added
      ) {
        var u = t[i - 1];
        t[i - 1] = t[i], t[i] = u;
      }
    } else {
      if (!s.added && o) {
        var p = r.slice(l, l + s.count);
        p = p.map(function (d, f) {
          var m = n[c + f];
          return m.length > d.length ? m : d;
        }), s.value = e.join(p);
      } else s.value = e.join(r.slice(l, l + s.count));
      l += s.count, s.added || (c += s.count);
    }
  }
  var h = t[a - 1];
  return a > 1 && typeof h.value == "string" && (h.added || h.removed) &&
    e.equals("", h.value) && (t[a - 2].value += h.value, t.pop()),
    t;
}
function km(e) {
  return { newPos: e.newPos, components: e.components.slice(0) };
}
function Em(e, t, r) {
  return Sm.diff(e, t, r);
}
function sr(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
    ? sr = function (t) {
      return typeof t;
    }
    : sr = function (t) {
      return t && typeof Symbol == "function" && t.constructor === Symbol &&
          t !== Symbol.prototype
        ? "symbol"
        : typeof t;
    },
    sr(e);
}
function Sn(e, t, r, n, o) {
  t = t || [], r = r || [], n && (e = n(o, e));
  var i;
  for (i = 0; i < t.length; i += 1) if (t[i] === e) return r[i];
  var a;
  if (_m.call(e) === "[object Array]") {
    for (
      t.push(e), a = new Array(e.length), r.push(a), i = 0;
      i < e.length;
      i += 1
    ) {
      a[i] = Sn(e[i], t, r, n, o);
    }
    return t.pop(), r.pop(), a;
  }
  if (e && e.toJSON && (e = e.toJSON()), sr(e) === "object" && e !== null) {
    t.push(e), a = {}, r.push(a);
    var l = [], c;
    for (c in e) e.hasOwnProperty(c) && l.push(c);
    for (l.sort(), i = 0; i < l.length; i += 1) {
      c = l[i], a[c] = Sn(e[c], t, r, n, c);
    }
    t.pop(), r.pop();
  } else a = e;
  return a;
}
function On(e = "defaultStore") {
  return async () => {
    let t = bm("spike-land-alpha", 1, {
      upgrade(r) {
        r.createObjectStore(e);
      },
      blocked() {},
      blocking() {},
      terminated() {},
    });
    return Ba({
      async get(r) {
        return (await t).get(e, r);
      },
      async put(r, n) {
        return (await t).put(e, n, r);
      },
      async delete(r) {
        return (await t).delete(e, r);
      },
      async clear() {
        return (await t).clear(e);
      },
      async keys() {
        return (await t).getAllKeys(e);
      },
    });
  };
}
var um,
  Ta,
  ja,
  Ma,
  yn,
  Aa,
  bn,
  vn,
  wn,
  xn,
  vm,
  wm,
  kn,
  Sm,
  $a,
  Ra,
  Da,
  Ia,
  Om,
  Cm,
  _m,
  vt,
  En,
  La,
  Tm,
  Na,
  ce,
  Ba,
  P,
  cr = Y(() => {
    um = (e, t) => t.some((r) => e instanceof r);
    Ma = new WeakMap(),
      yn = new WeakMap(),
      Aa = new WeakMap(),
      bn = new WeakMap(),
      vn = new WeakMap();
    wn = {
      get(e, t, r) {
        if (e instanceof IDBTransaction) {
          if (t === "done") return yn.get(e);
          if (t === "objectStoreNames") return e.objectStoreNames || Aa.get(e);
          if (t === "store") {
            return r.objectStoreNames[1]
              ? void 0
              : r.objectStore(r.objectStoreNames[0]);
          }
        }
        return Pe(e[t]);
      },
      set(e, t, r) {
        return e[t] = r, !0;
      },
      has(e, t) {
        return e instanceof IDBTransaction && (t === "done" || t === "store")
          ? !0
          : t in e;
      },
    };
    xn = (e) => vn.get(e);
    vm = ["get", "getKey", "getAll", "getAllKeys", "count"],
      wm = ["put", "add", "delete", "clear"],
      kn = new Map();
    mm((e) => ({
      ...e,
      get: (t, r, n) => Pa(t, r) || e.get(t, r, n),
      has: (t, r) => !!Pa(t, r) || e.has(t, r),
    }));
    we.prototype = {
      diff: function (e, t) {
        var r = arguments.length > 2 && arguments[2] !== void 0
            ? arguments[2]
            : {},
          n = r.callback;
        typeof r == "function" && (n = r, r = {}), this.options = r;
        var o = this;
        function i(f) {
          return n
            ? (setTimeout(function () {
              n(void 0, f);
            }, 0),
              !0)
            : f;
        }
        e = this.castInput(e),
          t = this.castInput(t),
          e = this.removeEmpty(this.tokenize(e)),
          t = this.removeEmpty(this.tokenize(t));
        var a = t.length,
          l = e.length,
          c = 1,
          s = a + l,
          u = [{ newPos: -1, components: [] }],
          p = this.extractCommon(u[0], t, e, 0);
        if (u[0].newPos + 1 >= a && p + 1 >= l) {
          return i([{
            value: this.join(t),
            count: t.length,
          }]);
        }
        function h() {
          for (var f = -1 * c; f <= c; f += 2) {
            var m = void 0,
              y = u[f - 1],
              v = u[f + 1],
              g = (v ? v.newPos : 0) - f;
            y && (u[f - 1] = void 0);
            var b = y && y.newPos + 1 < a, x = v && 0 <= g && g < l;
            if (!b && !x) {
              u[f] = void 0;
              continue;
            }
            if (
              !b || x && y.newPos < v.newPos
                ? (m = km(v), o.pushComponent(m.components, void 0, !0))
                : (m = y,
                  m.newPos++,
                  o.pushComponent(m.components, !0, void 0)),
                g = o.extractCommon(m, t, e, f),
                m.newPos + 1 >= a && g + 1 >= l
            ) {
              return i(xm(o, m.components, t, e, o.useLongestToken));
            }
            u[f] = m;
          }
          c++;
        }
        if (n) {
          (function f() {
            setTimeout(function () {
              if (c > s) return n();
              h() || f();
            }, 0);
          })();
        } else {
          for (; c <= s;) {
            var d = h();
            if (d) return d;
          }
        }
      },
      pushComponent: function (e, t, r) {
        var n = e[e.length - 1];
        n && n.added === t && n.removed === r
          ? e[e.length - 1] = { count: n.count + 1, added: t, removed: r }
          : e.push({ count: 1, added: t, removed: r });
      },
      extractCommon: function (e, t, r, n) {
        for (
          var o = t.length, i = r.length, a = e.newPos, l = a - n, c = 0;
          a + 1 < o && l + 1 < i && this.equals(t[a + 1], r[l + 1]);
        ) {
          a++, l++, c++;
        }
        return c && e.components.push({ count: c }), e.newPos = a, l;
      },
      equals: function (e, t) {
        return this.options.comparator
          ? this.options.comparator(e, t)
          : e === t ||
            this.options.ignoreCase && e.toLowerCase() === t.toLowerCase();
      },
      removeEmpty: function (e) {
        for (var t = [], r = 0; r < e.length; r++) e[r] && t.push(e[r]);
        return t;
      },
      castInput: function (e) {
        return e;
      },
      tokenize: function (e) {
        return e.split("");
      },
      join: function (e) {
        return e.join("");
      },
    };
    Sm = new we();
    $a = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,
      Ra = /\S/,
      Da = new we();
    Da.equals = function (e, t) {
      return this.options.ignoreCase &&
        (e = e.toLowerCase(), t = t.toLowerCase()),
        e === t || this.options.ignoreWhitespace && !Ra.test(e) && !Ra.test(t);
    };
    Da.tokenize = function (e) {
      for (
        var t = e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), r = 0;
        r < t.length - 1;
        r++
      ) {
        !t[r + 1] && t[r + 2] && $a.test(t[r]) && $a.test(t[r + 2]) &&
          (t[r] += t[r + 2], t.splice(r + 1, 2), r--);
      }
      return t;
    };
    Ia = new we();
    Ia.tokenize = function (e) {
      var t = [], r = e.split(/(\n|\r\n)/);
      r[r.length - 1] || r.pop();
      for (var n = 0; n < r.length; n++) {
        var o = r[n];
        n % 2 && !this.options.newlineIsToken
          ? t[t.length - 1] += o
          : (this.options.ignoreWhitespace && (o = o.trim()), t.push(o));
      }
      return t;
    };
    Om = new we();
    Om.tokenize = function (e) {
      return e.split(/(\S.+?[.!?])(?=\s+|$)/);
    };
    Cm = new we();
    Cm.tokenize = function (e) {
      return e.split(/([{}:;,]|\s+)/);
    };
    _m = Object.prototype.toString, vt = new we();
    vt.useLongestToken = !0;
    vt.tokenize = Ia.tokenize;
    vt.castInput = function (e) {
      var t = this.options,
        r = t.undefinedReplacement,
        n = t.stringifyReplacer,
        o = n === void 0
          ? function (i, a) {
            return typeof a == "undefined" ? r : a;
          }
          : n;
      return typeof e == "string"
        ? e
        : JSON.stringify(Sn(e, null, null, o), o, "  ");
    };
    vt.equals = function (e, t) {
      return we.prototype.equals.call(
        vt,
        e.replace(/,([\r\n])/g, "$1"),
        t.replace(/,([\r\n])/g, "$1"),
      );
    };
    En = new we();
    En.tokenize = function (e) {
      return e.slice();
    };
    En.join = En.removeEmpty = function (e) {
      return e;
    };
    La = async (e, t) => {
      let r = zm.of(e), n = Em(e, t);
      return {
        b: await r,
        c: n.map((o) => o.added ? o.value : o.removed ? -o.count : o.count),
      };
    },
      Tm = (e) => {
        if (e.length < 10) return !1;
        let t = [...e.slice(0, 8)].filter((n) =>
            n < "0" || n > "f"
          ).length === 0,
          r = e.slice(8);
        if (t && r[0] === "[" && r[r.length - 1] === "]") {
          try {
            return JSON.parse(r).length > 1;
          } catch (n) {
            return !1;
          }
        }
        return !1;
      },
      Na = (e, t) => {
        let r = JSON.parse(t), n = e.slice(), o = "";
        return r.forEach((i) => {
          if (Number(i) === i) {
            let a = Math.abs(i), l = n.slice(0, a);
            n = n.slice(a), i > 0 && (o += String(l));
          } else o += String(i);
        }),
          o;
      },
      ce = async (e) =>
        Array.from(
          new Uint8Array(
            await crypto.subtle.digest(
              "SHA-256",
              typeof e == "string" ? new TextEncoder().encode(e) : e,
            ),
          ).slice(0, 4),
        ).map((t) => ("00" + t.toString(16)).slice(-2)).join(""),
      Ba = (e) => {
        let t = {
          async get(r, n = "string") {
            let o;
            try {
              if (o = await e.get(r), !o) return null;
            } catch (a) {
              return null;
            }
            if (n === "json") {
              try {
                return JSON.parse(o);
              } catch (a) {
                return o;
              }
            }
            let i = await o;
            if (n === "string") {
              if (typeof i == "string" && n === "string") {
                let a = i;
                if (Tm(a)) {
                  let l = a.slice(0, 8), c = a.slice(8), s = await t.get(l);
                  return Na(s, c);
                }
                return i;
              }
              return new TextDecoder().decode(i);
            }
            return o;
          },
          async put(r, n) {
            let o;
            try {
              let a = await t.get(r);
              if (
                typeof a == "string" && typeof n == "string" &&
                a.length === 8 && a !== n
              ) {
                let l = await t.get(n), c = await t.get(a);
                if (typeof c == "string") {
                  let s = await ce(c);
                  if (s === a) {
                    let u = await La(l, c), p = u.b + JSON.stringify(u.c);
                    await t.put(s, p);
                  }
                }
              }
            } catch (a) {
              o = "";
            }
            if (o !== "" && n === o) return n;
            let i;
            return typeof n != "string"
              ? i = new TextDecoder().decode(n)
              : i = n,
              await e.put(r, i);
          },
          async delete(r) {
            return await e.delete(r);
          },
          async clear() {
            return await e.clear();
          },
          async keys() {
            return await e.getAllKeys();
          },
        };
        return t;
      };
    P = {
      get: async (e, t) => (await (await On("shaDB"))()).get(e, t),
      put: async (e, t) => (await (await On("shaDB"))()).put(e, t),
    };
  });
var jm,
  Cn,
  Wa = Y(() => {
    jm = {
      "@babel/runtime/": "https://cdn.skypack.dev/@babel/runtime/",
      "@emotion/cache":
        "https://unpkg.com/@emotion/cache@11.7.1/dist/emotion-cache.browser.esm.js",
      "@emotion/hash":
        "https://unpkg.com/@emotion/hash@0.8.0/dist/hash.browser.esm.js",
      "@emotion/is-prop-valid":
        "https://unpkg.com/@emotion/is-prop-valid@1.1.1/dist/emotion-is-prop-valid.browser.esm.js",
      "@emotion/memoize":
        "https://unpkg.com/@emotion/memoize@0.7.5/dist/emotion-memoize.browser.esm.js",
      "@emotion/react":
        "https://unpkg.com/@emotion/react@11.7.1/dist/emotion-react.browser.esm.js",
      "@emotion/serialize":
        "https://unpkg.com/@emotion/serialize@1.0.2/dist/emotion-serialize.browser.esm.js",
      "@emotion/sheet":
        "https://unpkg.com/@emotion/sheet@1.1.0/dist/emotion-sheet.browser.esm.js",
      "@emotion/styled":
        "https://unpkg.com/@emotion/styled@11.6.0/dist/emotion-styled.browser.esm.js",
      "@emotion/utils":
        "https://unpkg.com/@emotion/utils@1.0.0/dist/emotion-utils.browser.esm.js",
      "@emotion/unitless":
        "https://unpkg.com/@emotion/unitless@0.7.5/dist/unitless.browser.esm.js",
      "@emotion/weak-memoize":
        "https://unpkg.com/@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.esm.js",
      "prop-types": "https://esm.sh/prop-types",
      "textdiff-create":
        "https://unpkg.com/@spike.land/esm@0.2.49/dist/textdiff-create.mjs",
      "textdiff-patch":
        "https://unpkg.com/@spike.land/esm@0.2.49/dist/textdiff-patch.mjs",
      "framer-motion":
        "https://unpkg.com/@spike.land/esm@0.2.49/dist/framer-motion.mjs",
      framesync: "https://unpkg.com/framesync@6.1.0/dist/es/index.mjs",
      "hey-listen": "https://unpkg.com/hey-listen@1.0.8/dist/hey-listen.es.js",
      "hoist-non-react-statics": "https://esm.sh/hoist-non-react-statics",
      popmotion: "https://unpkg.com/popmotion@11.0.3/dist/es/index.mjs",
      react: "https://unpkg.com/@spike.land/esm@0.2.49/dist/react.mjs",
      "react-dom":
        "https://unpkg.com/@spike.land/esm@0.2.49/dist/react-dom.mjs",
      "react-is": "https://unpkg.com/@spike.land/esm@0.2.49/dist/react-is.mjs",
      "react-transition-group": "https://esm.sh/react-transition-group",
      "react/jsx-runtime": "https://esm.sh/react/jsx-runtime",
      "@spike.land/renderer":
        "https://unpkg.com/@spike.land/renderer@0.2.56/dist/renderer.mjs",
      "style-value-types":
        "https://unpkg.com/style-value-types@5.1.0/dist/es/index.mjs",
      stylis: "https://unpkg.com/stylis@4.0.13/dist/stylis.mjs",
      "@spike.land/qrious":
        "https://unpkg.com/@spike.land/qrious@0.2.51/dist/QRious.mjs",
      tslib: "https://unpkg.com/tslib@2.3.1/tslib.es6.js",
      "ipfs-only-hash":
        "https://unpkg.com/@spike.land/esm@0.2.49/dist/ipfs-only-hash.mjs",
      "@zedvision/swm":
        "https://unpkg.com/@zedvision/swm@4.0.0/public/swm-esm.js",
      "uuid/": "https://unpkg.com/uuid@8.3.2/dist/esm-browser/",
      "@spike.land/code":
        "https://unpkg.com/@spike.land/code@0.2.56/js/reactLoader.mjs",
      "@spike.land/smart-monaco-editor":
        "https://unpkg.com/@spike.land/smart-monaco-editor@0.2.55/dist/editor.mjs",
      comlink: "https://unpkg.com/comlink@4.3.1/dist/esm/comlink.mjs",
      "@spike.land/ipfs":
        "https://unpkg.com/@spike.land/ipfs@0.2.51/dist/ipfs.client.mjs",
      "workbox-window":
        "https://unpkg.com/workbox-window@6.4.2/build/workbox-window.prod.es5.mjs",
      dev: "./starter.mjs",
    }, Cn = { imports: jm };
  });
function lr({ html: e }) {
  var i;
  let t = String(
      (i = window.document.getElementById("zbody")) == null
        ? void 0
        : i.getAttribute("class"),
    ),
    r = "";
  if (window.document.querySelector("head > style[data-emotion=css]")) {
    try {
      let a =
        window.document.querySelector("head > style[data-emotion=css]").sheet;
      a && (r = Array.from(a.cssRules).map((l) => l.cssText).filter((l) => {
        let c = l.substring(5, 10),
          s = t.indexOf(c) !== -1,
          u = e.indexOf(c) !== -1;
        return s || u;
      }).join(`
  `).replace("#zbody", "body"));
    } catch (a) {
      console.error({ e: a });
    }
  }
  if (window.document.querySelector("head > style[data-emotion=css-global]")) {
    try {
      let a =
        window.document.querySelector("head > style[data-emotion=css-global]")
          .sheet;
      a && (r += Array.from(a.cssRules).map((l) => l.cssText).join(`
  `).replace("#zbody", "body"));
    } catch (a) {
      console.error({ e: a });
    }
  }
  return r;
}
function Va({ html: e, css: t }) {
  let r = e.indexOf("<title>"), n = e.indexOf("</title>");
  return `<!DOCTYPE html>
<html lang="en"> 
<head profile="http://www.w3.org/2005/10/profile">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="Description" content="Generated with spike.land">
<title>${r < n && r >= -1 ? e.slice(r, n) : "(code).spike.land :)"}</title>
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
${t}</style>
</head>
<body>
<a class="skip-link" href="#zbody">Jump to the page</a>
<main id="zbody">
  ${e}
</main>
<script>window.process = {env: {NODE_ENV:"production" }}<\/script>
<script type="importmap-shim">
${JSON.stringify({ imports: { ...Cn.imports, app: "./app.js" } })}
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
var Ha,
  _n = Y(() => {
    Wa();
    Ha = () =>
      `<!DOCTYPE html>
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
${JSON.stringify({ imports: { ...Cn.imports, app: ["./app.js"] } })}
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
  });
var Ye,
  ur = Y(() => {
    Ye = (e) => {
      let t, r = !1, { pathname: n } = window.location;
      if (n.indexOf("/ipfs/") !== -1) {
        let o = n.slice(6, 52);
        r = !0, t = `/ipfs/${o}/js/workers/${e}`;
      } else {
        location.origin !== "https://code.spike.land"
          ? (r = !0,
            t = window.URL.createObjectURL(
              new Blob([
                `self.importScripts("https://code.spike.land/js/workers/${e}");`,
              ]),
            ))
          : t = `https://code.spike.land/js/workers/${e}`;
      }
      return { workerSrc: t, forceNormalWorker: r };
    };
  });
function Ya(e, t, r) {
  t = t || [], r = r || 0;
  for (var n = r; e >= d0;) t[r++] = e & 255 | Xa, e /= 128;
  for (; e & p0;) t[r++] = e & 255 | Xa, e >>>= 7;
  return t[r] = e | 0, Ya.bytes = r - n + 1, t;
}
function Tn(e, t) {
  var r = 0, t = t || 0, n = 0, o = t, i, a = e.length;
  do {
    if (o >= a) throw Tn.bytes = 0, new RangeError("Could not decode varint");
    i = e[o++], r += n < 28 ? (i & Qa) << n : (i & Qa) * Math.pow(2, n), n += 7;
  } while (i >= h0);
  return Tn.bytes = o - t, r;
}
function A0(e, t) {
  if (e.length >= 255) throw new TypeError("Alphabet too long");
  for (var r = new Uint8Array(256), n = 0; n < r.length; n++) r[n] = 255;
  for (var o = 0; o < e.length; o++) {
    var i = e.charAt(o), a = i.charCodeAt(0);
    if (r[a] !== 255) throw new TypeError(i + " is ambiguous");
    r[a] = o;
  }
  var l = e.length,
    c = e.charAt(0),
    s = Math.log(l) / Math.log(256),
    u = Math.log(256) / Math.log(l);
  function p(f) {
    if (
      f instanceof Uint8Array ||
      (ArrayBuffer.isView(f)
        ? f = new Uint8Array(f.buffer, f.byteOffset, f.byteLength)
        : Array.isArray(f) && (f = Uint8Array.from(f))),
        !(f instanceof Uint8Array)
    ) {
      throw new TypeError("Expected Uint8Array");
    }
    if (f.length === 0) return "";
    for (var m = 0, y = 0, v = 0, g = f.length; v !== g && f[v] === 0;) {
      v++, m++;
    }
    for (var b = (g - v) * u + 1 >>> 0, x = new Uint8Array(b); v !== g;) {
      for (
        var S = f[v], w = 0, k = b - 1;
        (S !== 0 || w < y) && k !== -1;
        k--, w++
      ) {
        S += 256 * x[k] >>> 0, x[k] = S % l >>> 0, S = S / l >>> 0;
      }
      if (S !== 0) throw new Error("Non-zero carry");
      y = w, v++;
    }
    for (var j = b - y; j !== b && x[j] === 0;) j++;
    for (var D = c.repeat(m); j < b; ++j) D += e.charAt(x[j]);
    return D;
  }
  function h(f) {
    if (typeof f != "string") throw new TypeError("Expected String");
    if (f.length === 0) return new Uint8Array();
    var m = 0;
    if (f[m] !== " ") {
      for (var y = 0, v = 0; f[m] === c;) y++, m++;
      for (var g = (f.length - m) * s + 1 >>> 0, b = new Uint8Array(g); f[m];) {
        var x = r[f.charCodeAt(m)];
        if (x === 255) return;
        for (var S = 0, w = g - 1; (x !== 0 || S < v) && w !== -1; w--, S++) {
          x += l * b[w] >>> 0, b[w] = x % 256 >>> 0, x = x / 256 >>> 0;
        }
        if (x !== 0) throw new Error("Non-zero carry");
        v = S, m++;
      }
      if (f[m] !== " ") {
        for (var k = g - v; k !== g && b[k] === 0;) k++;
        for (var j = new Uint8Array(y + (g - k)), D = y; k !== g;) {
          j[D++] = b[k++];
        }
        return j;
      }
    }
  }
  function d(f) {
    var m = h(f);
    if (m) return m;
    throw new Error(`Non-${t} character`);
  }
  return { encode: p, decodeUnsafe: h, decode: d };
}
function d1(e) {
  if (e != null) {
    return typeof e == "number"
      ? e & 4095
      : (e = e.toString(),
        e.substring(0, 1) === "0"
          ? parseInt(e, 8) & 4095
          : parseInt(e, 10) & 4095);
  }
}
function f1(e) {
  if (e == null) return;
  let t;
  if (
    e.secs != null && (t = { secs: e.secs, nsecs: e.nsecs }),
      e.Seconds != null &&
      (t = { secs: e.Seconds, nsecs: e.FractionalNanoseconds }),
      Array.isArray(e) && (t = { secs: e[0], nsecs: e[1] }),
      e instanceof Date
  ) {
    let r = e.getTime(), n = Math.floor(r / 1e3);
    t = { secs: n, nsecs: (r - n * 1e3) * 1e3 };
  }
  if (Object.prototype.hasOwnProperty.call(t, "secs")) {
    if (t != null && t.nsecs != null && (t.nsecs < 0 || t.nsecs > 999999999)) {
      throw (0, p1.default)(
        new Error("mtime-nsecs must be within the range [0,999999999]"),
        "ERR_INVALID_MTIME_NSECS",
      );
    }
    return t;
  }
}
function x1(e) {
  return ArrayBuffer.isView(e) || e instanceof ArrayBuffer;
}
function uy(e) {
  let t = 0;
  return new Promise((r, n) =>
    e.forEach((o) =>
      o.then(r).catch(() => {
        ++t === e.length && n();
      })
    )
  );
}
function Vn(e, t) {
  t || (t = e.reduce((o, i) => o + i.length, 0));
  let r = new Uint8Array(t), n = 0;
  for (let o of e) r.set(o, n), n += o.length;
  return r;
}
function vs(e, t, r, n) {
  return {
    name: e,
    prefix: t,
    encoder: { name: e, prefix: t, encode: r },
    decoder: { decode: n },
  };
}
function hy(e, t = "utf8") {
  let r = xs[t];
  if (!r) throw new Error(`Unsupported encoding "${t}"`);
  return r.decoder.decode(`${r.prefix}${e}`);
}
function Kn(e, t = "utf8") {
  let r = xs[t];
  if (!r) throw new Error(`Unsupported encoding "${t}"`);
  return r.encoder.encode(e).substring(1);
}
async function F1(e, t) {
  if (typeof window == "undefined") return;
  let r = typeof t == "number" ? t : 999;
  try {
    let { ipfsClient: n, ipfsCat: o } = globalThis;
    if (r === 0) throw new Error("No more retry");
    let i = (await n.add(e, { onlyHash: !0 })).cid.toString();
    await o(i, { timeout: 1500 });
    let a = e.slice(-8),
      l = await fetch(
        `https://code.spike.land/signal?signal=${a}&securityrandomparam=${
          Math.random() * 1e4
        }`,
      ).then((s) => s.text()),
      c = await fetch(`https://code.spike.land/ipfs/${l}`).then((s) =>
        s.text()
      );
    return () => U1(c);
  } catch (n) {
    if (r > 1) return F1(e, r - 1);
  }
}
function U1(e) {
  try {
    return typeof e != "string" ? e : JSON.parse(e);
  } catch (t) {
    return e;
  }
}
async function my(e, t) {
  let { ipfsClient: r } = globalThis;
  if (xr(`sending signal: ${e}`), t) {
    xr("sending data as well....");
    let o = typeof t != "string" ? JSON.stringify(t) : t;
    xr(o);
    let i = (await r.add(o)).cid.toString(), { pathname: a } = new URL(e);
    await fetch(
      `https://code.spike.land/signal/?cid=${i}&signal=${a.slice(1)}`,
    ), fetch(`https://code.spike.land/ipfs/${i}`);
  }
  let { path: n } = await r.add(e);
  return xr(`signal sent --- ${n}`), { success: !0 };
}
var Mm,
  pr,
  Am,
  Pm,
  $m,
  Rm,
  qa,
  I,
  le,
  Dm,
  Qe,
  Im,
  Lm,
  Ka,
  Nm,
  Bm,
  Fm,
  Um,
  Wm,
  Vm,
  Hm,
  qm,
  Fe,
  Ga,
  Km,
  Ja,
  Gm,
  Jm,
  Xm,
  Ym,
  Qm,
  Zm,
  e0,
  t0,
  r0,
  zn,
  n0,
  o0,
  i0,
  a0,
  wt,
  s0,
  c0,
  dr,
  l0,
  Xa,
  u0,
  p0,
  d0,
  f0,
  h0,
  Qa,
  m0,
  g0,
  y0,
  b0,
  v0,
  w0,
  x0,
  k0,
  S0,
  E0,
  O0,
  C0,
  fr,
  jn,
  hr,
  mr,
  ny,
  _0,
  gr,
  z0,
  T0,
  Za,
  j0,
  M0,
  Mn,
  es,
  P0,
  $0,
  R0,
  D0,
  I0,
  L0,
  ts,
  N0,
  An,
  xt,
  B0,
  F0,
  H,
  xe,
  U0,
  rs,
  kt,
  W0,
  V0,
  H0,
  q0,
  K0,
  G0,
  J0,
  X0,
  U,
  Y0,
  Q0,
  Z0,
  St,
  e1,
  ns,
  os,
  yr,
  br,
  t1,
  r1,
  n1,
  ke,
  Se,
  o1,
  Et,
  i1,
  a1,
  s1,
  Pn,
  vr,
  c1,
  $n,
  Ee,
  l1,
  is,
  u1,
  Rn,
  p1,
  $e,
  Ze,
  Dn,
  _,
  q,
  oy,
  iy,
  ay,
  sy,
  cy,
  h1,
  m1,
  Ot,
  as,
  g1,
  y1,
  b1,
  v1,
  et,
  In,
  Ln,
  w1,
  Nn,
  Bn,
  Fn,
  Un,
  Wn,
  ss,
  k1,
  S1,
  wr,
  ly,
  cs,
  E1,
  ls,
  O1,
  us,
  C1,
  ps,
  _1,
  ds,
  z1,
  T1,
  fs,
  j1,
  M1,
  hs,
  A1,
  P1,
  $1,
  R1,
  ms,
  Hn,
  D1,
  gs,
  I1,
  L1,
  ys,
  N1,
  py,
  dy,
  bs,
  fy,
  ws,
  qn,
  B1,
  xs,
  xr,
  Gn,
  ks = Y(() => {
    Mm = Object.create,
      pr = Object.defineProperty,
      Am = Object.getOwnPropertyDescriptor,
      Pm = Object.getOwnPropertyNames,
      $m = Object.getPrototypeOf,
      Rm = Object.prototype.hasOwnProperty,
      qa = (e) => pr(e, "__esModule", { value: !0 }),
      I = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
      le = (e, t) => {
        qa(e);
        for (var r in t) pr(e, r, { get: t[r], enumerable: !0 });
      },
      Dm = (e, t, r) => {
        if (t && typeof t == "object" || typeof t == "function") {
          for (let n of Pm(t)) {
            !Rm.call(e, n) && n !== "default" && pr(e, n, {
              get: () => t[n],
              enumerable: !(r = Am(t, n)) || r.enumerable,
            });
          }
        }
        return e;
      },
      Qe = (e) =>
        Dm(
          qa(pr(
            e != null ? Mm($m(e)) : {},
            "default",
            e && e.__esModule && "default" in e
              ? { get: () => e.default, enumerable: !0 }
              : { value: e, enumerable: !0 },
          )),
          e,
        ),
      Im = I((e, t) => {
        "use strict";
        var r = async (n) => {
          let o = [];
          for await (let i of n) o.push(i);
          return o;
        };
        t.exports = r;
      }),
      Lm = I((e, t) => {
        "use strict";
        async function* r(n, o = {}) {
          let i = n.getReader();
          try {
            for (;;) {
              let a = await i.read();
              if (a.done) return;
              yield a.value;
            }
          } finally {
            o.preventCancel !== !0 && i.cancel(), i.releaseLock();
          }
        }
        t.exports = r;
      }),
      Ka = I((e, t) => {
        "use strict";
        function r(o, i) {
          for (let a in i) {
            Object.defineProperty(o, a, {
              value: i[a],
              enumerable: !0,
              configurable: !0,
            });
          }
          return o;
        }
        function n(o, i, a) {
          if (!o || typeof o == "string") {
            throw new TypeError("Please pass an Error to err-code");
          }
          a || (a = {}),
            typeof i == "object" && (a = i, i = ""),
            i && (a.code = i);
          try {
            return r(o, a);
          } catch (l) {
            a.message = o.message, a.stack = o.stack;
            let c = function () {};
            return c.prototype = Object.create(Object.getPrototypeOf(o)),
              r(new c(), a);
          }
        }
        t.exports = n;
      }),
      Nm = I((e, t) => {
        "use strict";
        t.exports = r;
        function r(n, o) {
          for (
            var i = new Array(arguments.length - 1), a = 0, l = 2, c = !0;
            l < arguments.length;
          ) {
            i[a++] = arguments[l++];
          }
          return new Promise(function (s, u) {
            i[a] = function (p) {
              if (c) {
                if (c = !1, p) u(p);
                else {
                  for (
                    var h = new Array(arguments.length - 1), d = 0;
                    d < h.length;
                  ) {
                    h[d++] = arguments[d];
                  }
                  s.apply(null, h);
                }
              }
            };
            try {
              n.apply(o || null, i);
            } catch (p) {
              c && (c = !1, u(p));
            }
          });
        }
      }),
      Bm = I((e) => {
        "use strict";
        var t = e;
        t.length = function (a) {
          var l = a.length;
          if (!l) return 0;
          for (var c = 0; --l % 4 > 1 && a.charAt(l) === "=";) ++c;
          return Math.ceil(a.length * 3) / 4 - c;
        };
        var r = new Array(64), n = new Array(123);
        for (o = 0; o < 64;) {
          n[
            r[o] = o < 26
              ? o + 65
              : o < 52
              ? o + 71
              : o < 62
              ? o - 4
              : o - 59 | 43
          ] = o++;
        }
        var o;
        t.encode = function (a, l, c) {
          for (var s = null, u = [], p = 0, h = 0, d; l < c;) {
            var f = a[l++];
            switch (h) {
              case 0:
                u[p++] = r[f >> 2], d = (f & 3) << 4, h = 1;
                break;
              case 1:
                u[p++] = r[d | f >> 4], d = (f & 15) << 2, h = 2;
                break;
              case 2:
                u[p++] = r[d | f >> 6], u[p++] = r[f & 63], h = 0;
                break;
            }
            p > 8191 &&
              ((s || (s = [])).push(String.fromCharCode.apply(String, u)),
                p = 0);
          }
          return h && (u[p++] = r[d], u[p++] = 61, h === 1 && (u[p++] = 61)),
            s
              ? (p && s.push(String.fromCharCode.apply(String, u.slice(0, p))),
                s.join(""))
              : String.fromCharCode.apply(String, u.slice(0, p));
        };
        var i = "invalid encoding";
        t.decode = function (a, l, c) {
          for (var s = c, u = 0, p, h = 0; h < a.length;) {
            var d = a.charCodeAt(h++);
            if (d === 61 && u > 1) break;
            if ((d = n[d]) === void 0) throw Error(i);
            switch (u) {
              case 0:
                p = d, u = 1;
                break;
              case 1:
                l[c++] = p << 2 | (d & 48) >> 4, p = d, u = 2;
                break;
              case 2:
                l[c++] = (p & 15) << 4 | (d & 60) >> 2, p = d, u = 3;
                break;
              case 3:
                l[c++] = (p & 3) << 6 | d, u = 0;
                break;
            }
          }
          if (u === 1) throw Error(i);
          return c - s;
        },
          t.test = function (a) {
            return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
              .test(a);
          };
      }),
      Fm = I((e, t) => {
        "use strict";
        t.exports = r;
        function r() {
          this._listeners = {};
        }
        r.prototype.on = function (n, o, i) {
          return (this._listeners[n] || (this._listeners[n] = [])).push({
            fn: o,
            ctx: i || this,
          }),
            this;
        },
          r.prototype.off = function (n, o) {
            if (n === void 0) this._listeners = {};
            else if (o === void 0) this._listeners[n] = [];
            else {
              for (var i = this._listeners[n], a = 0; a < i.length;) {
                i[a].fn === o ? i.splice(a, 1) : ++a;
              }
            }
            return this;
          },
          r.prototype.emit = function (n) {
            var o = this._listeners[n];
            if (o) {
              for (var i = [], a = 1; a < arguments.length;) {
                i.push(arguments[a++]);
              }
              for (a = 0; a < o.length;) o[a].fn.apply(o[a++].ctx, i);
            }
            return this;
          };
      }),
      Um = I((e, t) => {
        "use strict";
        t.exports = r(r);
        function r(l) {
          return typeof Float32Array != "undefined"
            ? function () {
              var c = new Float32Array([-0]),
                s = new Uint8Array(c.buffer),
                u = s[3] === 128;
              function p(m, y, v) {
                c[0] = m,
                  y[v] = s[0],
                  y[v + 1] = s[1],
                  y[v + 2] = s[2],
                  y[v + 3] = s[3];
              }
              function h(m, y, v) {
                c[0] = m,
                  y[v] = s[3],
                  y[v + 1] = s[2],
                  y[v + 2] = s[1],
                  y[v + 3] = s[0];
              }
              l.writeFloatLE = u ? p : h, l.writeFloatBE = u ? h : p;
              function d(m, y) {
                return s[0] = m[y],
                  s[1] = m[y + 1],
                  s[2] = m[y + 2],
                  s[3] = m[y + 3],
                  c[0];
              }
              function f(m, y) {
                return s[3] = m[y],
                  s[2] = m[y + 1],
                  s[1] = m[y + 2],
                  s[0] = m[y + 3],
                  c[0];
              }
              l.readFloatLE = u ? d : f, l.readFloatBE = u ? f : d;
            }()
            : function () {
              function c(u, p, h, d) {
                var f = p < 0 ? 1 : 0;
                if (f && (p = -p), p === 0) u(1 / p > 0 ? 0 : 2147483648, h, d);
                else if (isNaN(p)) u(2143289344, h, d);
                else if (p > 34028234663852886e22) {
                  u(
                    (f << 31 | 2139095040) >>> 0,
                    h,
                    d,
                  );
                } else if (p < 11754943508222875e-54) {
                  u(
                    (f << 31 | Math.round(p / 1401298464324817e-60)) >>> 0,
                    h,
                    d,
                  );
                } else {
                  var m = Math.floor(Math.log(p) / Math.LN2),
                    y = Math.round(p * Math.pow(2, -m) * 8388608) & 8388607;
                  u((f << 31 | m + 127 << 23 | y) >>> 0, h, d);
                }
              }
              l.writeFloatLE = c.bind(null, n),
                l.writeFloatBE = c.bind(null, o);
              function s(u, p, h) {
                var d = u(p, h),
                  f = (d >> 31) * 2 + 1,
                  m = d >>> 23 & 255,
                  y = d & 8388607;
                return m === 255
                  ? y ? NaN : f * (1 / 0)
                  : m === 0
                  ? f * 1401298464324817e-60 * y
                  : f * Math.pow(2, m - 150) * (y + 8388608);
              }
              l.readFloatLE = s.bind(null, i), l.readFloatBE = s.bind(null, a);
            }(),
            typeof Float64Array != "undefined"
              ? function () {
                var c = new Float64Array([-0]),
                  s = new Uint8Array(c.buffer),
                  u = s[7] === 128;
                function p(m, y, v) {
                  c[0] = m,
                    y[v] = s[0],
                    y[v + 1] = s[1],
                    y[v + 2] = s[2],
                    y[v + 3] = s[3],
                    y[v + 4] = s[4],
                    y[v + 5] = s[5],
                    y[v + 6] = s[6],
                    y[v + 7] = s[7];
                }
                function h(m, y, v) {
                  c[0] = m,
                    y[v] = s[7],
                    y[v + 1] = s[6],
                    y[v + 2] = s[5],
                    y[v + 3] = s[4],
                    y[v + 4] = s[3],
                    y[v + 5] = s[2],
                    y[v + 6] = s[1],
                    y[v + 7] = s[0];
                }
                l.writeDoubleLE = u ? p : h, l.writeDoubleBE = u ? h : p;
                function d(m, y) {
                  return s[0] = m[y],
                    s[1] = m[y + 1],
                    s[2] = m[y + 2],
                    s[3] = m[y + 3],
                    s[4] = m[y + 4],
                    s[5] = m[y + 5],
                    s[6] = m[y + 6],
                    s[7] = m[y + 7],
                    c[0];
                }
                function f(m, y) {
                  return s[7] = m[y],
                    s[6] = m[y + 1],
                    s[5] = m[y + 2],
                    s[4] = m[y + 3],
                    s[3] = m[y + 4],
                    s[2] = m[y + 5],
                    s[1] = m[y + 6],
                    s[0] = m[y + 7],
                    c[0];
                }
                l.readDoubleLE = u ? d : f, l.readDoubleBE = u ? f : d;
              }()
              : function () {
                function c(u, p, h, d, f, m) {
                  var y = d < 0 ? 1 : 0;
                  if (y && (d = -d), d === 0) {
                    u(0, f, m + p), u(1 / d > 0 ? 0 : 2147483648, f, m + h);
                  } else if (isNaN(d)) {
                    u(0, f, m + p), u(2146959360, f, m + h);
                  } else if (d > 17976931348623157e292) {
                    u(0, f, m + p), u((y << 31 | 2146435072) >>> 0, f, m + h);
                  } else {
                    var v;
                    if (d < 22250738585072014e-324) {
                      v = d / 5e-324,
                        u(v >>> 0, f, m + p),
                        u((y << 31 | v / 4294967296) >>> 0, f, m + h);
                    } else {
                      var g = Math.floor(Math.log(d) / Math.LN2);
                      g === 1024 && (g = 1023),
                        v = d * Math.pow(2, -g),
                        u(v * 4503599627370496 >>> 0, f, m + p),
                        u(
                          (y << 31 | g + 1023 << 20 | v * 1048576 & 1048575) >>>
                            0,
                          f,
                          m + h,
                        );
                    }
                  }
                }
                l.writeDoubleLE = c.bind(null, n, 0, 4),
                  l.writeDoubleBE = c.bind(null, o, 4, 0);
                function s(u, p, h, d, f) {
                  var m = u(d, f + p),
                    y = u(d, f + h),
                    v = (y >> 31) * 2 + 1,
                    g = y >>> 20 & 2047,
                    b = 4294967296 * (y & 1048575) + m;
                  return g === 2047 ? b ? NaN : v * (1 / 0) : g === 0
                    ? v * 5e-324 * b
                    : v * Math.pow(2, g - 1075) * (b + 4503599627370496);
                }
                l.readDoubleLE = s.bind(null, i, 0, 4),
                  l.readDoubleBE = s.bind(null, a, 4, 0);
              }(),
            l;
        }
        function n(l, c, s) {
          c[s] = l & 255,
            c[s + 1] = l >>> 8 & 255,
            c[s + 2] = l >>> 16 & 255,
            c[s + 3] = l >>> 24;
        }
        function o(l, c, s) {
          c[s] = l >>> 24,
            c[s + 1] = l >>> 16 & 255,
            c[s + 2] = l >>> 8 & 255,
            c[s + 3] = l & 255;
        }
        function i(l, c) {
          return (l[c] | l[c + 1] << 8 | l[c + 2] << 16 | l[c + 3] << 24) >>> 0;
        }
        function a(l, c) {
          return (l[c] << 24 | l[c + 1] << 16 | l[c + 2] << 8 | l[c + 3]) >>> 0;
        }
      }),
      Wm = I((exports, module) => {
        "use strict";
        module.exports = inquire;
        function inquire(moduleName) {
          try {
            var mod = eval("quire".replace(/^/, "re"))(moduleName);
            if (mod && (mod.length || Object.keys(mod).length)) return mod;
          } catch (e) {}
          return null;
        }
      }),
      Vm = I((e) => {
        "use strict";
        var t = e;
        t.length = function (r) {
          for (var n = 0, o = 0, i = 0; i < r.length; ++i) {
            o = r.charCodeAt(i),
              o < 128
                ? n += 1
                : o < 2048
                ? n += 2
                : (o & 64512) == 55296 && (r.charCodeAt(i + 1) & 64512) == 56320
                ? (++i, n += 4)
                : n += 3;
          }
          return n;
        },
          t.read = function (r, n, o) {
            var i = o - n;
            if (i < 1) return "";
            for (var a = null, l = [], c = 0, s; n < o;) {
              s = r[n++],
                s < 128
                  ? l[c++] = s
                  : s > 191 && s < 224
                  ? l[c++] = (s & 31) << 6 | r[n++] & 63
                  : s > 239 && s < 365
                  ? (s =
                    ((s & 7) << 18 | (r[n++] & 63) << 12 | (r[n++] & 63) << 6 |
                      r[n++] & 63) - 65536,
                    l[c++] = 55296 + (s >> 10),
                    l[c++] = 56320 + (s & 1023))
                  : l[c++] = (s & 15) << 12 | (r[n++] & 63) << 6 | r[n++] & 63,
                c > 8191 &&
                ((a || (a = [])).push(String.fromCharCode.apply(String, l)),
                  c = 0);
            }
            return a
              ? (c && a.push(String.fromCharCode.apply(String, l.slice(0, c))),
                a.join(""))
              : String.fromCharCode.apply(String, l.slice(0, c));
          },
          t.write = function (r, n, o) {
            for (var i = o, a, l, c = 0; c < r.length; ++c) {
              a = r.charCodeAt(c),
                a < 128
                  ? n[o++] = a
                  : a < 2048
                  ? (n[o++] = a >> 6 | 192, n[o++] = a & 63 | 128)
                  : (a & 64512) == 55296 &&
                      ((l = r.charCodeAt(c + 1)) & 64512) == 56320
                  ? (a = 65536 + ((a & 1023) << 10) + (l & 1023),
                    ++c,
                    n[o++] = a >> 18 | 240,
                    n[o++] = a >> 12 & 63 | 128,
                    n[o++] = a >> 6 & 63 | 128,
                    n[o++] = a & 63 | 128)
                  : (n[o++] = a >> 12 | 224,
                    n[o++] = a >> 6 & 63 | 128,
                    n[o++] = a & 63 | 128);
            }
            return o - i;
          };
      }),
      Hm = I((e, t) => {
        "use strict";
        t.exports = r;
        function r(n, o, i) {
          var a = i || 8192, l = a >>> 1, c = null, s = a;
          return function (u) {
            if (u < 1 || u > l) {
              return n(u);
            }
            s + u > a && (c = n(a), s = 0);
            var p = o.call(c, s, s += u);
            return s & 7 && (s = (s | 7) + 1), p;
          };
        }
      }),
      qm = I((e, t) => {
        "use strict";
        t.exports = n;
        var r = Fe();
        function n(l, c) {
          this.lo = l >>> 0, this.hi = c >>> 0;
        }
        var o = n.zero = new n(0, 0);
        o.toNumber = function () {
          return 0;
        },
          o.zzEncode = o.zzDecode = function () {
            return this;
          },
          o.length = function () {
            return 1;
          };
        var i = n.zeroHash = "\0\0\0\0\0\0\0\0";
        n.fromNumber = function (l) {
          if (l === 0) {
            return o;
          }
          var c = l < 0;
          c && (l = -l);
          var s = l >>> 0, u = (l - s) / 4294967296 >>> 0;
          return c &&
            (u = ~u >>> 0,
              s = ~s >>> 0,
              ++s > 4294967295 && (s = 0, ++u > 4294967295 && (u = 0))),
            new n(s, u);
        },
          n.from = function (l) {
            if (typeof l == "number") return n.fromNumber(l);
            if (r.isString(l)) {
              if (r.Long) l = r.Long.fromString(l);
              else return n.fromNumber(parseInt(l, 10));
            }
            return l.low || l.high ? new n(l.low >>> 0, l.high >>> 0) : o;
          },
          n.prototype.toNumber = function (l) {
            if (!l && this.hi >>> 31) {
              var c = ~this.lo + 1 >>> 0, s = ~this.hi >>> 0;
              return c || (s = s + 1 >>> 0), -(c + s * 4294967296);
            }
            return this.lo + this.hi * 4294967296;
          },
          n.prototype.toLong = function (l) {
            return r.Long
              ? new r.Long(this.lo | 0, this.hi | 0, Boolean(l))
              : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(l) };
          };
        var a = String.prototype.charCodeAt;
        n.fromHash = function (l) {
          return l === i ? o : new n(
            (a.call(l, 0) | a.call(l, 1) << 8 | a.call(l, 2) << 16 |
              a.call(l, 3) << 24) >>> 0,
            (a.call(l, 4) | a.call(l, 5) << 8 | a.call(l, 6) << 16 |
              a.call(l, 7) << 24) >>> 0,
          );
        },
          n.prototype.toHash = function () {
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
          },
          n.prototype.zzEncode = function () {
            var l = this.hi >> 31;
            return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ l) >>> 0,
              this.lo = (this.lo << 1 ^ l) >>> 0,
              this;
          },
          n.prototype.zzDecode = function () {
            var l = -(this.lo & 1);
            return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ l) >>> 0,
              this.hi = (this.hi >>> 1 ^ l) >>> 0,
              this;
          },
          n.prototype.length = function () {
            var l = this.lo,
              c = (this.lo >>> 28 | this.hi << 4) >>> 0,
              s = this.hi >>> 24;
            return s === 0
              ? c === 0
                ? l < 16384 ? l < 128 ? 1 : 2 : l < 2097152
                  ? 3
                  : 4
                : c < 16384
                ? c < 128 ? 5 : 6
                : c < 2097152
                ? 7
                : 8
              : s < 128
              ? 9
              : 10;
          };
      }),
      Fe = I((e) => {
        "use strict";
        var t = e;
        t.asPromise = Nm(),
          t.base64 = Bm(),
          t.EventEmitter = Fm(),
          t.float = Um(),
          t.inquire = Wm(),
          t.utf8 = Vm(),
          t.pool = Hm(),
          t.LongBits = qm(),
          t.isNode = Boolean(
            typeof global != "undefined" && global && global.process &&
              global.process.versions && global.process.versions.node,
          ),
          t.global = t.isNode && global ||
            typeof window != "undefined" && window ||
            typeof self != "undefined" && self || e,
          t.emptyArray = Object.freeze ? Object.freeze([]) : [],
          t.emptyObject = Object.freeze ? Object.freeze({}) : {},
          t.isInteger = Number.isInteger || function (o) {
            return typeof o == "number" && isFinite(o) && Math.floor(o) === o;
          },
          t.isString = function (o) {
            return typeof o == "string" || o instanceof String;
          },
          t.isObject = function (o) {
            return o && typeof o == "object";
          },
          t.isset = t.isSet = function (o, i) {
            var a = o[i];
            return a != null && o.hasOwnProperty(i)
              ? typeof a != "object" ||
                (Array.isArray(a) ? a.length : Object.keys(a).length) > 0
              : !1;
          },
          t.Buffer = function () {
            try {
              var o = t.inquire("buffer").Buffer;
              return o.prototype.utf8Write ? o : null;
            } catch (i) {
              return null;
            }
          }(),
          t._Buffer_from = null,
          t._Buffer_allocUnsafe = null,
          t.newBuffer = function (o) {
            return typeof o == "number"
              ? t.Buffer ? t._Buffer_allocUnsafe(o) : new t.Array(o)
              : t.Buffer
              ? t._Buffer_from(o)
              : typeof Uint8Array == "undefined"
              ? o
              : new Uint8Array(o);
          },
          t.Array = typeof Uint8Array != "undefined" ? Uint8Array : Array,
          t.Long = t.global.dcodeIO && t.global.dcodeIO.Long || t.global.Long ||
            t.inquire("long"),
          t.key2Re = /^true|false|0|1$/,
          t.key32Re = /^-?(?:0|[1-9][0-9]*)$/,
          t.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,
          t.longToHash = function (o) {
            return o ? t.LongBits.from(o).toHash() : t.LongBits.zeroHash;
          },
          t.longFromHash = function (o, i) {
            var a = t.LongBits.fromHash(o);
            return t.Long
              ? t.Long.fromBits(a.lo, a.hi, i)
              : a.toNumber(Boolean(i));
          };
        function r(o, i, a) {
          for (var l = Object.keys(i), c = 0; c < l.length; ++c) {
            (o[l[c]] === void 0 || !a) && (o[l[c]] = i[l[c]]);
          }
          return o;
        }
        t.merge = r,
          t.lcFirst = function (o) {
            return o.charAt(0).toLowerCase() + o.substring(1);
          };
        function n(o) {
          function i(a, l) {
            if (!(this instanceof i)) {
              return new i(a, l);
            }
            Object.defineProperty(this, "message", {
              get: function () {
                return a;
              },
            }),
              Error.captureStackTrace
                ? Error.captureStackTrace(this, i)
                : Object.defineProperty(this, "stack", {
                  value: new Error().stack || "",
                }),
              l && r(this, l);
          }
          return (i.prototype = Object.create(Error.prototype)).constructor = i,
            Object.defineProperty(i.prototype, "name", {
              get: function () {
                return o;
              },
            }),
            i.prototype.toString = function () {
              return this.name + ": " + this.message;
            },
            i;
        }
        t.newError = n,
          t.ProtocolError = n("ProtocolError"),
          t.oneOfGetter = function (o) {
            for (var i = {}, a = 0; a < o.length; ++a) i[o[a]] = 1;
            return function () {
              for (var l = Object.keys(this), c = l.length - 1; c > -1; --c) {
                if (
                  i[l[c]] === 1 && this[l[c]] !== void 0 && this[l[c]] !== null
                ) {
                  return l[c];
                }
              }
            };
          },
          t.oneOfSetter = function (o) {
            return function (i) {
              for (var a = 0; a < o.length; ++a) {
                o[a] !== i && delete this[o[a]];
              }
            };
          },
          t.toJSONOptions = {
            longs: String,
            enums: String,
            bytes: String,
            json: !0,
          },
          t._configure = function () {
            var o = t.Buffer;
            if (!o) {
              t._Buffer_from = t._Buffer_allocUnsafe = null;
              return;
            }
            t._Buffer_from = o.from !== Uint8Array.from && o.from ||
              function (i, a) {
                return new o(i, a);
              },
              t._Buffer_allocUnsafe = o.allocUnsafe || function (i) {
                return new o(i);
              };
          };
      }),
      Ga = I((e, t) => {
        "use strict";
        t.exports = u;
        var r = Fe(), n, o = r.LongBits, i = r.base64, a = r.utf8;
        function l(g, b, x) {
          this.fn = g, this.len = b, this.next = void 0, this.val = x;
        }
        function c() {}
        function s(g) {
          this.head = g.head,
            this.tail = g.tail,
            this.len = g.len,
            this.next = g.states;
        }
        function u() {
          this.len = 0,
            this.head = new l(c, 0, 0),
            this.tail = this.head,
            this.states = null;
        }
        var p = function () {
          return r.Buffer
            ? function () {
              return (u.create = function () {
                return new n();
              })();
            }
            : function () {
              return new u();
            };
        };
        u.create = p(),
          u.alloc = function (g) {
            return new r.Array(g);
          },
          r.Array !== Array &&
          (u.alloc = r.pool(u.alloc, r.Array.prototype.subarray)),
          u.prototype._push = function (g, b, x) {
            return this.tail = this.tail.next = new l(g, b, x),
              this.len += b,
              this;
          };
        function h(g, b, x) {
          b[x] = g & 255;
        }
        function d(g, b, x) {
          for (; g > 127;) b[x++] = g & 127 | 128, g >>>= 7;
          b[x] = g;
        }
        function f(g, b) {
          this.len = g, this.next = void 0, this.val = b;
        }
        f.prototype = Object.create(l.prototype),
          f.prototype.fn = d,
          u.prototype.uint32 = function (g) {
            return this.len += (this.tail = this.tail.next = new f(
              (g = g >>> 0) < 128
                ? 1
                : g < 16384
                ? 2
                : g < 2097152
                ? 3
                : g < 268435456
                ? 4
                : 5,
              g,
            )).len,
              this;
          },
          u.prototype.int32 = function (g) {
            return g < 0 ? this._push(m, 10, o.fromNumber(g)) : this.uint32(g);
          },
          u.prototype.sint32 = function (g) {
            return this.uint32((g << 1 ^ g >> 31) >>> 0);
          };
        function m(g, b, x) {
          for (; g.hi;) {
            b[x++] = g.lo & 127 | 128,
              g.lo = (g.lo >>> 7 | g.hi << 25) >>> 0,
              g.hi >>>= 7;
          }
          for (; g.lo > 127;) b[x++] = g.lo & 127 | 128, g.lo = g.lo >>> 7;
          b[x++] = g.lo;
        }
        u.prototype.uint64 = function (g) {
          var b = o.from(g);
          return this._push(m, b.length(), b);
        },
          u.prototype.int64 = u.prototype.uint64,
          u.prototype.sint64 = function (g) {
            var b = o.from(g).zzEncode();
            return this._push(m, b.length(), b);
          },
          u.prototype.bool = function (g) {
            return this._push(
              h,
              1,
              g ? 1 : 0,
            );
          };
        function y(g, b, x) {
          b[x] = g & 255,
            b[x + 1] = g >>> 8 & 255,
            b[x + 2] = g >>> 16 & 255,
            b[x + 3] = g >>> 24;
        }
        u.prototype.fixed32 = function (g) {
          return this._push(y, 4, g >>> 0);
        },
          u.prototype.sfixed32 = u.prototype.fixed32,
          u.prototype.fixed64 = function (g) {
            var b = o.from(g);
            return this._push(y, 4, b.lo)._push(y, 4, b.hi);
          },
          u.prototype.sfixed64 = u.prototype.fixed64,
          u.prototype.float = function (g) {
            return this._push(r.float.writeFloatLE, 4, g);
          },
          u.prototype.double = function (g) {
            return this._push(r.float.writeDoubleLE, 8, g);
          };
        var v = r.Array.prototype.set
          ? function (g, b, x) {
            b.set(g, x);
          }
          : function (g, b, x) {
            for (var S = 0; S < g.length; ++S) {
              b[x + S] = g[S];
            }
          };
        u.prototype.bytes = function (g) {
          var b = g.length >>> 0;
          if (!b) {
            return this._push(h, 1, 0);
          }
          if (r.isString(g)) {
            var x = u.alloc(b = i.length(g));
            i.decode(g, x, 0), g = x;
          }
          return this.uint32(b)._push(v, b, g);
        },
          u.prototype.string = function (g) {
            var b = a.length(g);
            return b
              ? this.uint32(b)._push(a.write, b, g)
              : this._push(h, 1, 0);
          },
          u.prototype.fork = function () {
            return this.states = new s(this),
              this.head = this.tail = new l(c, 0, 0),
              this.len = 0,
              this;
          },
          u.prototype.reset = function () {
            return this.states
              ? (this.head = this.states.head,
                this.tail = this.states.tail,
                this.len = this.states.len,
                this.states = this.states.next)
              : (this.head = this.tail = new l(c, 0, 0), this.len = 0),
              this;
          },
          u.prototype.ldelim = function () {
            var g = this.head, b = this.tail, x = this.len;
            return this.reset().uint32(x),
              x && (this.tail.next = g.next, this.tail = b, this.len += x),
              this;
          },
          u.prototype.finish = function () {
            for (
              var g = this.head.next,
                b = this.constructor.alloc(this.len),
                x = 0;
              g;
            ) {
              g.fn(g.val, b, x), x += g.len, g = g.next;
            }
            return b;
          },
          u._configure = function (g) {
            n = g, u.create = p(), n._configure();
          };
      }),
      Km = I((e, t) => {
        "use strict";
        t.exports = o;
        var r = Ga();
        (o.prototype = Object.create(r.prototype)).constructor = o;
        var n = Fe();
        function o() {
          r.call(this);
        }
        o._configure = function () {
          o.alloc = n._Buffer_allocUnsafe,
            o.writeBytesBuffer =
              n.Buffer && n.Buffer.prototype instanceof Uint8Array &&
                n.Buffer.prototype.set.name === "set"
                ? function (a, l, c) {
                  l.set(a, c);
                }
                : function (a, l, c) {
                  if (a.copy) a.copy(l, c, 0, a.length);
                  else for (var s = 0; s < a.length;) l[c++] = a[s++];
                };
        },
          o.prototype.bytes = function (a) {
            n.isString(a) && (a = n._Buffer_from(a, "base64"));
            var l = a.length >>> 0;
            return this.uint32(l),
              l && this._push(o.writeBytesBuffer, l, a),
              this;
          };
        function i(a, l, c) {
          a.length < 40 ? n.utf8.write(a, l, c) : l.utf8Write
            ? l.utf8Write(a, c)
            : l.write(a, c);
        }
        o.prototype.string = function (a) {
          var l = n.Buffer.byteLength(a);
          return this.uint32(l), l && this._push(i, l, a), this;
        }, o._configure();
      }),
      Ja = I((e, t) => {
        "use strict";
        t.exports = l;
        var r = Fe(), n, o = r.LongBits, i = r.utf8;
        function a(d, f) {
          return RangeError(
            "index out of range: " + d.pos + " + " + (f || 1) + " > " + d.len,
          );
        }
        function l(d) {
          this.buf = d, this.pos = 0, this.len = d.length;
        }
        var c = typeof Uint8Array != "undefined"
            ? function (d) {
              if (d instanceof Uint8Array || Array.isArray(d)) {
                return new l(d);
              }
              throw Error("illegal buffer");
            }
            : function (d) {
              if (Array.isArray(d)) return new l(d);
              throw Error("illegal buffer");
            },
          s = function () {
            return r.Buffer
              ? function (d) {
                return (l.create = function (f) {
                  return r.Buffer.isBuffer(f) ? new n(f) : c(f);
                })(d);
              }
              : c;
          };
        l.create = s(),
          l.prototype._slice = r.Array.prototype.subarray ||
            r.Array.prototype.slice,
          l.prototype.uint32 = function () {
            var d = 4294967295;
            return function () {
              if (
                d = (this.buf[this.pos] & 127) >>> 0,
                  this.buf[this.pos++] < 128 ||
                  (d = (d | (this.buf[this.pos] & 127) << 7) >>> 0,
                    this.buf[this.pos++] < 128) ||
                  (d = (d | (this.buf[this.pos] & 127) << 14) >>> 0,
                    this.buf[this.pos++] < 128) ||
                  (d = (d | (this.buf[this.pos] & 127) << 21) >>> 0,
                    this.buf[this.pos++] < 128) ||
                  (d = (d | (this.buf[this.pos] & 15) << 28) >>> 0,
                    this.buf[this.pos++] < 128)
              ) {
                return d;
              }
              if ((this.pos += 5) > this.len) {
                throw this.pos = this.len, a(this, 10);
              }
              return d;
            };
          }(),
          l.prototype.int32 = function () {
            return this.uint32() | 0;
          },
          l.prototype.sint32 = function () {
            var d = this.uint32();
            return d >>> 1 ^ -(d & 1) | 0;
          };
        function u() {
          var d = new o(0, 0), f = 0;
          if (this.len - this.pos > 4) {
            for (; f < 4; ++f) {
              if (
                d.lo = (d.lo | (this.buf[this.pos] & 127) << f * 7) >>> 0,
                  this.buf[this.pos++] < 128
              ) {
                return d;
              }
            }
            if (
              d.lo = (d.lo | (this.buf[this.pos] & 127) << 28) >>> 0,
                d.hi = (d.hi | (this.buf[this.pos] & 127) >> 4) >>> 0,
                this.buf[this.pos++] < 128
            ) {
              return d;
            }
            f = 0;
          } else {
            for (; f < 3; ++f) {
              if (this.pos >= this.len) throw a(this);
              if (
                d.lo = (d.lo | (this.buf[this.pos] & 127) << f * 7) >>> 0,
                  this.buf[this.pos++] < 128
              ) {
                return d;
              }
            }
            return d.lo = (d.lo | (this.buf[this.pos++] & 127) << f * 7) >>> 0,
              d;
          }
          if (this.len - this.pos > 4) {
            for (; f < 5; ++f) {
              if (
                d.hi = (d.hi | (this.buf[this.pos] & 127) << f * 7 + 3) >>> 0,
                  this.buf[this.pos++] < 128
              ) {
                return d;
              }
            }
          } else {
            for (; f < 5; ++f) {
              if (this.pos >= this.len) throw a(this);
              if (
                d.hi = (d.hi | (this.buf[this.pos] & 127) << f * 7 + 3) >>> 0,
                  this.buf[this.pos++] < 128
              ) {
                return d;
              }
            }
          }
          throw Error("invalid varint encoding");
        }
        l.prototype.bool = function () {
          return this.uint32() !== 0;
        };
        function p(d, f) {
          return (d[f - 4] | d[f - 3] << 8 | d[f - 2] << 16 |
            d[f - 1] << 24) >>> 0;
        }
        l.prototype.fixed32 = function () {
          if (this.pos + 4 > this.len) throw a(this, 4);
          return p(this.buf, this.pos += 4);
        },
          l.prototype.sfixed32 = function () {
            if (this.pos + 4 > this.len) throw a(this, 4);
            return p(this.buf, this.pos += 4) | 0;
          };
        function h() {
          if (this.pos + 8 > this.len) throw a(this, 8);
          return new o(p(this.buf, this.pos += 4), p(this.buf, this.pos += 4));
        }
        l.prototype.float = function () {
          if (this.pos + 4 > this.len) throw a(this, 4);
          var d = r.float.readFloatLE(this.buf, this.pos);
          return this.pos += 4, d;
        },
          l.prototype.double = function () {
            if (this.pos + 8 > this.len) throw a(this, 4);
            var d = r.float.readDoubleLE(this.buf, this.pos);
            return this.pos += 8, d;
          },
          l.prototype.bytes = function () {
            var d = this.uint32(), f = this.pos, m = this.pos + d;
            if (m > this.len) throw a(this, d);
            return this.pos += d,
              Array.isArray(this.buf)
                ? this.buf.slice(f, m)
                : f === m
                ? new this.buf.constructor(0)
                : this._slice.call(this.buf, f, m);
          },
          l.prototype.string = function () {
            var d = this.bytes();
            return i.read(d, 0, d.length);
          },
          l.prototype.skip = function (d) {
            if (typeof d == "number") {
              if (this.pos + d > this.len) throw a(this, d);
              this.pos += d;
            } else {
              do if (this.pos >= this.len) {
                throw a(this);
              } while (
                this.buf[this.pos++] & 128
              );
            }
            return this;
          },
          l.prototype.skipType = function (d) {
            switch (d) {
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
                for (; (d = this.uint32() & 7) != 4;) this.skipType(d);
                break;
              case 5:
                this.skip(4);
                break;
              default:
                throw Error(
                  "invalid wire type " + d + " at offset " + this.pos,
                );
            }
            return this;
          },
          l._configure = function (d) {
            n = d, l.create = s(), n._configure();
            var f = r.Long
              ? "toLong"
              : "toNumber";
            r.merge(l.prototype, {
              int64: function () {
                return u.call(this)[f](!1);
              },
              uint64: function () {
                return u.call(this)[f](!0);
              },
              sint64: function () {
                return u.call(this).zzDecode()[f](!1);
              },
              fixed64: function () {
                return h.call(this)[f](!0);
              },
              sfixed64: function () {
                return h.call(this)[f](!1);
              },
            });
          };
      }),
      Gm = I((e, t) => {
        "use strict";
        t.exports = o;
        var r = Ja();
        (o.prototype = Object.create(r.prototype)).constructor = o;
        var n = Fe();
        function o(i) {
          r.call(this, i);
        }
        o._configure = function () {
          n.Buffer && (o.prototype._slice = n.Buffer.prototype.slice);
        },
          o.prototype.string = function () {
            var i = this.uint32();
            return this.buf.utf8Slice
              ? this.buf.utf8Slice(
                this.pos,
                this.pos = Math.min(this.pos + i, this.len),
              )
              : this.buf.toString(
                "utf-8",
                this.pos,
                this.pos = Math.min(this.pos + i, this.len),
              );
          },
          o._configure();
      }),
      Jm = I((e, t) => {
        "use strict";
        t.exports = n;
        var r = Fe();
        (n.prototype = Object.create(r.EventEmitter.prototype)).constructor = n;
        function n(o, i, a) {
          if (typeof o != "function") {
            throw TypeError("rpcImpl must be a function");
          }
          r.EventEmitter.call(this),
            this.rpcImpl = o,
            this.requestDelimited = Boolean(i),
            this.responseDelimited = Boolean(a);
        }
        n.prototype.rpcCall = function o(i, a, l, c, s) {
          if (!c) throw TypeError("request must be specified");
          var u = this;
          if (!s) return r.asPromise(o, u, i, a, l, c);
          if (!u.rpcImpl) {
            setTimeout(function () {
              s(Error("already ended"));
            }, 0);
            return;
          }
          try {
            return u.rpcImpl(
              i,
              a[u.requestDelimited ? "encodeDelimited" : "encode"](c).finish(),
              function (p, h) {
                if (p) return u.emit("error", p, i), s(p);
                if (h === null) {
                  u.end(!0);
                  return;
                }
                if (!(h instanceof l)) {
                  try {
                    h = l[u.responseDelimited ? "decodeDelimited" : "decode"](
                      h,
                    );
                  } catch (d) {
                    return u.emit("error", d, i), s(d);
                  }
                }
                return u.emit("data", h, i), s(null, h);
              },
            );
          } catch (p) {
            u.emit("error", p, i),
              setTimeout(function () {
                s(p);
              }, 0);
            return;
          }
        },
          n.prototype.end = function (o) {
            return this.rpcImpl &&
              (o || this.rpcImpl(null, null, null),
                this.rpcImpl = null,
                this.emit("end").off()),
              this;
          };
      }),
      Xm = I((e) => {
        "use strict";
        var t = e;
        t.Service = Jm();
      }),
      Ym = I((e, t) => {
        "use strict";
        t.exports = {};
      }),
      Qm = I((e) => {
        "use strict";
        var t = e;
        t.build = "minimal",
          t.Writer = Ga(),
          t.BufferWriter = Km(),
          t.Reader = Ja(),
          t.BufferReader = Gm(),
          t.util = Fe(),
          t.rpc = Xm(),
          t.roots = Ym(),
          t.configure = r;
        function r() {
          t.util._configure(),
            t.Writer._configure(t.BufferWriter),
            t.Reader._configure(t.BufferReader);
        }
        r();
      }),
      Zm = I((e, t) => {
        "use strict";
        t.exports = Qm();
      }),
      e0 = I((e, t) => {
        "use strict";
        function r(n) {
          let [o, i] = n[Symbol.asyncIterator]
              ? [n[Symbol.asyncIterator](), Symbol.asyncIterator]
              : [n[Symbol.iterator](), Symbol.iterator],
            a = [];
          return {
            peek: () => o.next(),
            push: (l) => {
              a.push(l);
            },
            next: () => a.length ? { done: !1, value: a.shift() } : o.next(),
            [i]() {
              return this;
            },
          };
        }
        t.exports = r;
      }),
      t0 = Qe(Im()),
      r0 = (e) => {
        let { name: t, message: r, stack: n, code: o, detail: i } = e;
        return { name: t, message: r, stack: n, code: o, detail: i };
      },
      zn = (e) => {
        if (e instanceof Error) return e;
        {
          let { name: t, message: r, stack: n, code: o } = e;
          return Object.assign(n0(t, r), { name: t, stack: n, code: o });
        }
      },
      n0 = (e, t) => {
        switch (e) {
          case "RangeError":
            return new RangeError(t);
          case "ReferenceError":
            return ReferenceError(t);
          case "SyntaxError":
            return new SyntaxError(t);
          case "TypeError":
            return new TypeError(t);
          case "URIError":
            return new URIError(t);
          default:
            return new Error(t);
        }
      },
      o0 = class extends Error {
        get name() {
          return this.constructor.name;
        }
      },
      i0 = class extends Error {
        get name() {
          return this.constructor.name;
        }
      },
      a0 = class extends Error {
        get name() {
          return this.constructor.name;
        }
      },
      wt = class {
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
            (e.timerID = setTimeout(wt.timeout, e.timeout, this, t)),
            e.signal &&
            e.signal.addEventListener("abort", () => this.abort(t), {
              once: !0,
            }),
            this.port && wt.postQuery(this.port, t, e),
            e.result;
        }
        connect(e) {
          if (this.port) throw new Error("Transport is already open");
          this.port = e,
            this.port.addEventListener("message", this),
            this.port.start();
          for (let [t, r] of Object.entries(this.queries)) {
            wt.postQuery(e, t, r);
          }
        }
        disconnect() {
          let e = new a0();
          for (let [t, r] of Object.entries(this.queries)) {
            r.fail(e), this.abort(t);
          }
          this.port &&
            (this.port.removeEventListener("message", this), this.port.close());
        }
        static timeout(e, t) {
          let { queries: r } = e, n = r[t];
          n &&
            (delete r[t],
              n.fail(new o0("request timed out")),
              e.port && e.port.postMessage({ type: "abort", id: t }));
        }
        abort(e) {
          let { queries: t } = this, r = t[e];
          r &&
            (delete t[e],
              r.fail(new i0()),
              this.port && this.port.postMessage({ type: "abort", id: e }),
              r.timerID != null && clearTimeout(r.timerID));
        }
        static postQuery(e, t, r) {
          e.postMessage({
            type: "query",
            namespace: r.namespace,
            method: r.method,
            id: t,
            input: r.toJSON(),
          }, r.transfer());
        }
        handleEvent(e) {
          let { id: t, result: r } = e.data, n = this.queries[t];
          n &&
            (delete this.queries[t],
              r.ok ? n.succeed(r.value) : n.fail(zn(r.error)),
              n.timerID != null && clearTimeout(n.timerID));
        }
      },
      s0 = class {
        constructor(e, t, r) {
          this.result = new Promise((n, o) => {
            this.succeed = n,
              this.fail = o,
              this.signal = r.signal,
              this.input = r,
              this.namespace = e,
              this.method = t,
              this.timeout = r.timeout == null ? 1 / 0 : r.timeout,
              this.timerID = null;
          });
        }
        toJSON() {
          return this.input;
        }
        transfer() {
          return this.input.transfer;
        }
      },
      c0 = class {
        constructor(e, t, r) {
          this.transport = r;
          let n = this;
          for (let o of t) {
            n[o] = (i) => this.transport.execute(new s0(e, o.toString(), i));
          }
        }
      },
      dr = class {
        constructor(e, t, r) {
          this.remote = new c0(e, t, r);
        }
      },
      l0 = Ya,
      Xa = 128,
      u0 = 127,
      p0 = ~u0,
      d0 = Math.pow(2, 31);
    f0 = Tn, h0 = 128, Qa = 127;
    m0 = Math.pow(2, 7),
      g0 = Math.pow(2, 14),
      y0 = Math.pow(2, 21),
      b0 = Math.pow(2, 28),
      v0 = Math.pow(2, 35),
      w0 = Math.pow(2, 42),
      x0 = Math.pow(2, 49),
      k0 = Math.pow(2, 56),
      S0 = Math.pow(2, 63),
      E0 = function (e) {
        return e < m0 ? 1 : e < g0 ? 2 : e < y0 ? 3 : e < b0
          ? 4
          : e < v0
          ? 5
          : e < w0
          ? 6
          : e < x0
          ? 7
          : e < k0
          ? 8
          : e < S0
          ? 9
          : 10;
      },
      O0 = { encode: l0, decode: f0, encodingLength: E0 },
      C0 = O0,
      fr = C0,
      jn = (e) => [fr.decode(e), fr.decode.bytes],
      hr = (e, t, r = 0) => (fr.encode(e, t, r), t),
      mr = (e) => fr.encodingLength(e),
      ny = new Uint8Array(0),
      _0 = (e, t) => {
        if (e === t) return !0;
        if (e.byteLength !== t.byteLength) return !1;
        for (let r = 0; r < e.byteLength; r++) if (e[r] !== t[r]) return !1;
        return !0;
      },
      gr = (e) => {
        if (e instanceof Uint8Array && e.constructor.name === "Uint8Array") {
          return e;
        }
        if (e instanceof ArrayBuffer) return new Uint8Array(e);
        if (ArrayBuffer.isView(e)) {
          return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
        }
        throw new Error("Unknown type, must be binary type");
      },
      z0 = (e) => new TextEncoder().encode(e),
      T0 = (e) => new TextDecoder().decode(e),
      Za = (e, t) => {
        let r = t.byteLength,
          n = mr(e),
          o = n + mr(r),
          i = new Uint8Array(o + r);
        return hr(e, i, 0), hr(r, i, n), i.set(t, o), new Mn(e, r, t, i);
      },
      j0 = (e) => {
        let t = gr(e),
          [r, n] = jn(t),
          [o, i] = jn(t.subarray(n)),
          a = t.subarray(n + i);
        if (a.byteLength !== o) throw new Error("Incorrect length");
        return new Mn(r, o, a, t);
      },
      M0 = (e, t) =>
        e === t ? !0
        : e.code === t.code && e.size === t.size && _0(e.bytes, t.bytes),
      Mn = class {
        constructor(e, t, r, n) {
          this.code = e, this.size = t, this.digest = r, this.bytes = n;
        }
      },
      es = {};
    le(es, { base58btc: () => xe, base58flickr: () => U0 });
    P0 = A0,
      $0 = P0,
      R0 = $0,
      D0 = class {
        constructor(e, t, r) {
          this.name = e, this.prefix = t, this.baseEncode = r;
        }
        encode(e) {
          if (e instanceof Uint8Array) {
            return `${this.prefix}${this.baseEncode(e)}`;
          }
          throw Error("Unknown type, must be binary type");
        }
      },
      I0 = class {
        constructor(e, t, r) {
          this.name = e, this.prefix = t, this.baseDecode = r;
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
          return ts(this, e);
        }
      },
      L0 = class {
        constructor(e) {
          this.decoders = e;
        }
        or(e) {
          return ts(this, e);
        }
        decode(e) {
          let t = e[0], r = this.decoders[t];
          if (r) return r.decode(e);
          throw RangeError(
            `Unable to decode multibase string ${
              JSON.stringify(e)
            }, only inputs prefixed with ${
              Object.keys(this.decoders)
            } are supported`,
          );
        }
      },
      ts = (e, t) =>
        new L0({
          ...e.decoders || { [e.prefix]: e },
          ...t.decoders || { [t.prefix]: t },
        }),
      N0 = class {
        constructor(e, t, r, n) {
          this.name = e,
            this.prefix = t,
            this.baseEncode = r,
            this.baseDecode = n,
            this.encoder = new D0(e, t, r),
            this.decoder = new I0(e, t, n);
        }
        encode(e) {
          return this.encoder.encode(e);
        }
        decode(e) {
          return this.decoder.decode(e);
        }
      },
      An = ({ name: e, prefix: t, encode: r, decode: n }) => new N0(e, t, r, n),
      xt = ({ prefix: e, name: t, alphabet: r }) => {
        let { encode: n, decode: o } = R0(r, t);
        return An({ prefix: e, name: t, encode: n, decode: (i) => gr(o(i)) });
      },
      B0 = (e, t, r, n) => {
        let o = {};
        for (let u = 0; u < t.length; ++u) o[t[u]] = u;
        let i = e.length;
        for (; e[i - 1] === "=";) --i;
        let a = new Uint8Array(i * r / 8 | 0), l = 0, c = 0, s = 0;
        for (let u = 0; u < i; ++u) {
          let p = o[e[u]];
          if (p === void 0) throw new SyntaxError(`Non-${n} character`);
          c = c << r | p, l += r, l >= 8 && (l -= 8, a[s++] = 255 & c >> l);
        }
        if (l >= r || 255 & c << 8 - l) {
          throw new SyntaxError("Unexpected end of data");
        }
        return a;
      },
      F0 = (e, t, r) => {
        let n = t[t.length - 1] === "=", o = (1 << r) - 1, i = "", a = 0, l = 0;
        for (let c = 0; c < e.length; ++c) {
          for (l = l << 8 | e[c], a += 8; a > r;) {
            a -= r, i += t[o & l >> a];
          }
        }
        if (a && (i += t[o & l << r - a]), n) {
          for (; i.length * r & 7;) i += "=";
        }
        return i;
      },
      H = ({ name: e, prefix: t, bitsPerChar: r, alphabet: n }) =>
        An({
          prefix: t,
          name: e,
          encode(o) {
            return F0(o, n, r);
          },
          decode(o) {
            return B0(o, n, r, e);
          },
        }),
      xe = xt({
        name: "base58btc",
        prefix: "z",
        alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
      }),
      U0 = xt({
        name: "base58flickr",
        prefix: "Z",
        alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
      }),
      rs = {};
    le(rs, {
      base32: () => kt,
      base32hex: () => q0,
      base32hexpad: () => G0,
      base32hexpadupper: () => J0,
      base32hexupper: () => K0,
      base32pad: () => V0,
      base32padupper: () => H0,
      base32upper: () => W0,
      base32z: () => X0,
    });
    kt = H({
      prefix: "b",
      name: "base32",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567",
      bitsPerChar: 5,
    }),
      W0 = H({
        prefix: "B",
        name: "base32upper",
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
        bitsPerChar: 5,
      }),
      V0 = H({
        prefix: "c",
        name: "base32pad",
        alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
        bitsPerChar: 5,
      }),
      H0 = H({
        prefix: "C",
        name: "base32padupper",
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
        bitsPerChar: 5,
      }),
      q0 = H({
        prefix: "v",
        name: "base32hex",
        alphabet: "0123456789abcdefghijklmnopqrstuv",
        bitsPerChar: 5,
      }),
      K0 = H({
        prefix: "V",
        name: "base32hexupper",
        alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
        bitsPerChar: 5,
      }),
      G0 = H({
        prefix: "t",
        name: "base32hexpad",
        alphabet: "0123456789abcdefghijklmnopqrstuv=",
        bitsPerChar: 5,
      }),
      J0 = H({
        prefix: "T",
        name: "base32hexpadupper",
        alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
        bitsPerChar: 5,
      }),
      X0 = H({
        prefix: "h",
        name: "base32z",
        alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
        bitsPerChar: 5,
      }),
      U = class {
        constructor(e, t, r, n) {
          this.code = t,
            this.version = e,
            this.multihash = r,
            this.bytes = n,
            this.byteOffset = n.byteOffset,
            this.byteLength = n.byteLength,
            this.asCID = this,
            this._baseCache = new Map(),
            Object.defineProperties(this, {
              byteOffset: br,
              byteLength: br,
              code: yr,
              version: yr,
              multihash: yr,
              bytes: yr,
              _baseCache: br,
              asCID: br,
            });
        }
        toV0() {
          switch (this.version) {
            case 0:
              return this;
            default: {
              let { code: e, multihash: t } = this;
              if (e !== St) {
                throw new Error(
                  "Cannot convert a non dag-pb CID to CIDv0",
                );
              }
              if (t.code !== e1) {
                throw new Error(
                  "Cannot convert non sha2-256 multihash CID to CIDv0",
                );
              }
              return U.createV0(t);
            }
          }
        }
        toV1() {
          switch (this.version) {
            case 0: {
              let { code: e, digest: t } = this.multihash, r = Za(e, t);
              return U.createV1(this.code, r);
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
            M0(this.multihash, e.multihash);
        }
        toString(e) {
          let { bytes: t, version: r, _baseCache: n } = this;
          switch (r) {
            case 0:
              return Q0(t, n, e || xe.encoder);
            default:
              return Z0(t, n, e || kt.encoder);
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
          return r1(/^0\.0/, n1), !!(e && (e[os] || e.asCID === e));
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
          if (e instanceof U) return e;
          if (e != null && e.asCID === e) {
            let { version: t, code: r, multihash: n, bytes: o } = e;
            return new U(t, r, n, o || ns(t, r, n.bytes));
          } else if (e != null && e[os] === !0) {
            let { version: t, multihash: r, code: n } = e, o = j0(r);
            return U.create(t, n, o);
          } else return null;
        }
        static create(e, t, r) {
          if (typeof t != "number") {
            throw new Error("String codecs are no longer supported");
          }
          switch (e) {
            case 0: {
              if (t !== St) {
                throw new Error(
                  `Version 0 CID must use dag-pb (code: ${St}) block encoding`,
                );
              }
              return new U(e, t, r, r.bytes);
            }
            case 1: {
              let n = ns(e, t, r.bytes);
              return new U(e, t, r, n);
            }
            default:
              throw new Error("Invalid version");
          }
        }
        static createV0(e) {
          return U.create(0, St, e);
        }
        static createV1(e, t) {
          return U.create(1, e, t);
        }
        static decode(e) {
          let [t, r] = U.decodeFirst(e);
          if (r.length) throw new Error("Incorrect length");
          return t;
        }
        static decodeFirst(e) {
          let t = U.inspectBytes(e),
            r = t.size - t.multihashSize,
            n = gr(e.subarray(r, r + t.multihashSize));
          if (n.byteLength !== t.multihashSize) {throw new Error(
              "Incorrect length",
            );}
          let o = n.subarray(t.multihashSize - t.digestSize),
            i = new Mn(t.multihashCode, t.digestSize, o, n);
          return [
            t.version === 0
              ? U.createV0(i)
              : U.createV1(t.codec, i),
            e.subarray(t.size),
          ];
        }
        static inspectBytes(e) {
          let t = 0,
            r = () => {
              let [u, p] = jn(e.subarray(t));
              return t += p, u;
            },
            n = r(),
            o = St;
          if (
            n === 18 ? (n = 0, t = 0) : n === 1 && (o = r()), n !== 0 && n !== 1
          ) {
            throw new RangeError(`Invalid CID version ${n}`);
          }
          let i = t, a = r(), l = r(), c = t + l, s = c - i;
          return {
            version: n,
            codec: o,
            multihashCode: a,
            digestSize: l,
            multihashSize: s,
            size: c,
          };
        }
        static parse(e, t) {
          let [r, n] = Y0(e, t), o = U.decode(n);
          return o._baseCache.set(r, e), o;
        }
      },
      Y0 = (e, t) => {
        switch (e[0]) {
          case "Q": {
            let r = t || xe;
            return [xe.prefix, r.decode(`${xe.prefix}${e}`)];
          }
          case xe.prefix: {
            let r = t || xe;
            return [xe.prefix, r.decode(e)];
          }
          case kt.prefix: {
            let r = t || kt;
            return [kt.prefix, r.decode(e)];
          }
          default: {
            if (t == null) {
              throw Error(
                "To parse non base32 or base58btc encoded CID multibase decoder must be provided",
              );
            }
            return [e[0], t.decode(e)];
          }
        }
      },
      Q0 = (e, t, r) => {
        let { prefix: n } = r;
        if (n !== xe.prefix) {
          throw Error(`Cannot string encode V0 in ${r.name} encoding`);
        }
        let o = t.get(n);
        if (o == null) {
          let i = r.encode(e).slice(1);
          return t.set(n, i), i;
        } else return o;
      },
      Z0 = (e, t, r) => {
        let { prefix: n } = r, o = t.get(n);
        if (o == null) {
          let i = r.encode(e);
          return t.set(n, i), i;
        } else return o;
      },
      St = 112,
      e1 = 18,
      ns = (e, t, r) => {
        let n = mr(e), o = n + mr(t), i = new Uint8Array(o + r.byteLength);
        return hr(e, i, 0), hr(t, i, n), i.set(r, o), i;
      },
      os = Symbol.for("@ipld/js-cid/CID"),
      yr = { writable: !1, configurable: !1, enumerable: !0 },
      br = { writable: !1, enumerable: !1, configurable: !1 },
      t1 = "0.0.0-dev",
      r1 = (e, t) => {
        if (e.test(t1)) console.warn(t);
        else throw new Error(t);
      },
      n1 =
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
`,
      ke = (e, t) => (t && t.add(e.multihash.bytes.buffer), e),
      Se = (e) => {
        let t = e;
        return t._baseCache ||
          Object.defineProperty(t, "_baseCache", { value: new Map() }),
          t.asCID || Object.defineProperty(t, "asCID", { get: () => t }),
          Object.setPrototypeOf(t.multihash.digest, Uint8Array.prototype),
          Object.setPrototypeOf(t.multihash.bytes, Uint8Array.prototype),
          Object.setPrototypeOf(t.bytes, Uint8Array.prototype),
          Object.setPrototypeOf(t, U.prototype),
          Object.defineProperty(t, Symbol.for("@ipld/js-cid/CID"), {
            value: !0,
          }),
          t;
      },
      o1 = (e, t) => (t && t.add(e.buffer), e),
      Et = class extends dr {
        constructor(e) {
          super("block", ["put", "get", "rm", "stat"], e);
        }
      };
    Et.prototype.get = async function (e, t = {}) {
      let { transfer: r } = t,
        { block: n } = await this.remote.get({ ...t, cid: ke(e, r) });
      return n;
    };
    Et.prototype.put = async function (e, t = {}) {
      let { transfer: r } = t;
      delete t.progress;
      let n = await this.remote.put({
        ...t,
        block: e instanceof Uint8Array ? e : o1(e, r),
      });
      return Se(n.cid);
    };
    Et.prototype.rm = async function* (e, t = {}) {
      let { transfer: r } = t;
      yield* (await this.remote.rm({
        ...t,
        cids: Array.isArray(e) ? e.map((n) => ke(n, r)) : [ke(e, r)],
      })).map(i1);
    };
    Et.prototype.stat = async function (e, t = {}) {
      let { transfer: r } = t,
        n = await this.remote.stat({ ...t, cid: ke(e, r) });
      return { ...n, cid: Se(n.cid) };
    };
    i1 = (e) => {
      let t = Se(e.cid);
      return e.error ? { cid: t, error: zn(e.error) } : { cid: t };
    },
      a1 = ({ dagNode: e, cids: t }) => {
        for (let r of t) Se(r);
        return e;
      },
      s1 = (e, t) => {
        let r = [];
        return Pn(e, r, t), { dagNode: e, cids: r };
      },
      Pn = (e, t, r) => {
        if (e != null && typeof e == "object") {
          let n = U.asCID(e);
          if (n) t.push(n), ke(n, r);
          else if (e instanceof ArrayBuffer) r && r.add(e);
          else if (ArrayBuffer.isView(e)) r && r.add(e.buffer);
          else if (Array.isArray(e)) for (let o of e) Pn(o, t, r);
          else for (let o of Object.values(e)) Pn(o, t, r);
        }
      },
      vr = class extends dr {
        constructor(e) {
          super("dag", ["put", "get", "resolve"], e);
        }
      };
    vr.prototype.put = async function (e, t = {}) {
      let r = await this.remote.put({ ...t, dagNode: s1(e, t.transfer) });
      return Se(r);
    };
    vr.prototype.get = async function (e, t = {}) {
      let { value: r, remainderPath: n } = await this.remote.get({
        ...t,
        cid: ke(e, t.transfer),
      });
      return { value: a1(r), remainderPath: n };
    };
    vr.prototype.resolve = async function (e, t = {}) {
      let { cid: r, remainderPath: n } = await this.remote.resolve({
        ...t,
        cid: c1(e, t.transfer),
      });
      return { cid: Se(r), remainderPath: n };
    };
    c1 = (e, t) => typeof e == "string" ? e : ke(e, t),
      $n = async function* ({ port: e }, t) {
        let r = (a) => {},
          n = () => new Promise((a) => r = a),
          o = () => (e.postMessage({ method: "next" }), n());
        e.onmessage = (a) => r(a.data);
        let i = !1;
        try {
          for (; !i;) {
            let { done: a, value: l, error: c } = await o();
            if (i = a, c != null) throw zn(c);
            l != null && (yield t(l));
          }
        } finally {
          i || e.postMessage({ method: "return" }), e.close();
        }
      },
      Ee = (e, t, r) => {
        let { port1: n, port2: o } = new MessageChannel(),
          i = l1(e),
          a = new Set();
        return n.onmessage = async ({ data: { method: l } }) => {
          switch (l) {
            case "next": {
              try {
                let { done: c, value: s } = await i.next();
                if (c) n.postMessage({ type: "next", done: !0 }), n.close();
                else {
                  a.clear();
                  let u = t(s, a);
                  u1(n, { type: "next", done: !1, value: u }, a);
                }
              } catch (c) {
                n.postMessage({ type: "throw", error: r0(c) }), n.close();
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
        },
          n.start(),
          r.add(o),
          { type: "RemoteIterable", port: o };
      },
      l1 = (e) => {
        if (e != null) {
          if (typeof e[Symbol.asyncIterator] == "function") {
            return e[Symbol.asyncIterator]();
          }
          if (typeof e[Symbol.iterator] == "function") {
            return e[Symbol.iterator]();
          }
        }
        throw TypeError("Value must be async or sync iterable");
      },
      is = (e, t) => {
        let { port1: r, port2: n } = new MessageChannel();
        return r.onmessage = ({ data: o }) => e.apply(null, o),
          t.add(n),
          { type: "RemoteCallback", port: n };
      },
      u1 = (e, t, r) => e.postMessage(t, r),
      Rn = Qe(Lm()),
      p1 = Qe(Ka()),
      $e = Qe(Zm()),
      Ze = $e.default.Reader,
      Dn = $e.default.Writer,
      _ = $e.default.util,
      q = $e.default.roots["ipfs-unixfs"] ||
        ($e.default.roots["ipfs-unixfs"] = {}),
      oy = q.Data = (() => {
        function e(t) {
          if (this.blocksizes = [], t) {
            for (var r = Object.keys(t), n = 0; n < r.length; ++n) {
              t[r[n]] != null && (this[r[n]] = t[r[n]]);
            }
          }
        }
        return e.prototype.Type = 0,
          e.prototype.Data = _.newBuffer([]),
          e.prototype.filesize = _.Long ? _.Long.fromBits(0, 0, !0) : 0,
          e.prototype.blocksizes = _.emptyArray,
          e.prototype.hashType = _.Long ? _.Long.fromBits(0, 0, !0) : 0,
          e.prototype.fanout = _.Long ? _.Long.fromBits(0, 0, !0) : 0,
          e.prototype.mode = 0,
          e.prototype.mtime = null,
          e.encode = function (t, r) {
            if (
              r || (r = Dn.create()),
                r.uint32(8).int32(t.Type),
                t.Data != null && Object.hasOwnProperty.call(t, "Data") &&
                r.uint32(18).bytes(t.Data),
                t.filesize != null &&
                Object.hasOwnProperty.call(t, "filesize") &&
                r.uint32(24).uint64(t.filesize),
                t.blocksizes != null && t.blocksizes.length
            ) {
              for (var n = 0; n < t.blocksizes.length; ++n) {
                r.uint32(32).uint64(t.blocksizes[n]);
              }
            }
            return t.hashType != null &&
              Object.hasOwnProperty.call(t, "hashType") &&
              r.uint32(40).uint64(t.hashType),
              t.fanout != null && Object.hasOwnProperty.call(t, "fanout") &&
              r.uint32(48).uint64(t.fanout),
              t.mode != null && Object.hasOwnProperty.call(t, "mode") &&
              r.uint32(56).uint32(t.mode),
              t.mtime != null && Object.hasOwnProperty.call(t, "mtime") &&
              q.UnixTime.encode(t.mtime, r.uint32(66).fork()).ldelim(),
              r;
          },
          e.decode = function (t, r) {
            t instanceof Ze || (t = Ze.create(t));
            for (
              var n = r === void 0 ? t.len : t.pos + r, o = new q.Data();
              t.pos < n;
            ) {
              var i = t.uint32();
              switch (i >>> 3) {
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
                      (i & 7) == 2
                  ) {
                    for (var a = t.uint32() + t.pos; t.pos < a;) {
                      o.blocksizes.push(t.uint64());
                    }
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
                  o.mtime = q.UnixTime.decode(t, t.uint32());
                  break;
                default:
                  t.skipType(i & 7);
                  break;
              }
            }
            if (!o.hasOwnProperty("Type")) {
              throw _.ProtocolError("missing required 'Type'", { instance: o });
            }
            return o;
          },
          e.fromObject = function (t) {
            if (t instanceof q.Data) return t;
            var r = new q.Data();
            switch (t.Type) {
              case "Raw":
              case 0:
                r.Type = 0;
                break;
              case "Directory":
              case 1:
                r.Type = 1;
                break;
              case "File":
              case 2:
                r.Type = 2;
                break;
              case "Metadata":
              case 3:
                r.Type = 3;
                break;
              case "Symlink":
              case 4:
                r.Type = 4;
                break;
              case "HAMTShard":
              case 5:
                r.Type = 5;
                break;
            }
            if (
              t.Data != null && (typeof t.Data == "string"
                ? _.base64.decode(
                  t.Data,
                  r.Data = _.newBuffer(_.base64.length(t.Data)),
                  0,
                )
                : t.Data.length && (r.Data = t.Data)),
                t.filesize != null &&
                (_.Long
                  ? (r.filesize = _.Long.fromValue(t.filesize)).unsigned = !0
                  : typeof t.filesize == "string"
                  ? r.filesize = parseInt(t.filesize, 10)
                  : typeof t.filesize == "number"
                  ? r.filesize = t.filesize
                  : typeof t.filesize == "object" &&
                    (r.filesize = new _.LongBits(
                      t.filesize.low >>> 0,
                      t.filesize.high >>> 0,
                    ).toNumber(!0))),
                t.blocksizes
            ) {
              if (!Array.isArray(t.blocksizes)) {
                throw TypeError(".Data.blocksizes: array expected");
              }
              r.blocksizes = [];
              for (var n = 0; n < t.blocksizes.length; ++n) {
                _.Long ? (r.blocksizes[n] = _.Long.fromValue(t.blocksizes[n]))
                  .unsigned = !0 : typeof t.blocksizes[n] == "string"
                  ? r.blocksizes[n] = parseInt(t.blocksizes[n], 10)
                  : typeof t.blocksizes[n] == "number"
                  ? r.blocksizes[n] = t.blocksizes[n]
                  : typeof t.blocksizes[n] == "object" &&
                    (r.blocksizes[n] = new _.LongBits(
                      t.blocksizes[n].low >>> 0,
                      t.blocksizes[n].high >>> 0,
                    ).toNumber(!0));
              }
            }
            if (
              t.hashType != null && (_.Long
                ? (r.hashType = _.Long.fromValue(t.hashType)).unsigned = !0
                : typeof t.hashType == "string"
                ? r.hashType = parseInt(t.hashType, 10)
                : typeof t.hashType == "number"
                ? r.hashType = t.hashType
                : typeof t.hashType == "object" &&
                  (r.hashType = new _.LongBits(
                    t.hashType.low >>> 0,
                    t.hashType.high >>> 0,
                  ).toNumber(!0))),
                t.fanout != null && (_.Long
                  ? (r.fanout = _.Long.fromValue(t.fanout)).unsigned = !0
                  : typeof t.fanout == "string"
                  ? r.fanout = parseInt(t.fanout, 10)
                  : typeof t.fanout == "number"
                  ? r.fanout = t.fanout
                  : typeof t.fanout == "object" &&
                    (r.fanout = new _.LongBits(
                      t.fanout.low >>> 0,
                      t.fanout.high >>> 0,
                    ).toNumber(!0))),
                t.mode != null && (r.mode = t.mode >>> 0),
                t.mtime != null
            ) {
              if (typeof t.mtime != "object") {
                throw TypeError(".Data.mtime: object expected");
              }
              r.mtime = q.UnixTime.fromObject(t.mtime);
            }
            return r;
          },
          e.toObject = function (t, r) {
            r || (r = {});
            var n = {};
            if ((r.arrays || r.defaults) && (n.blocksizes = []), r.defaults) {
              if (
                n.Type = r.enums === String ? "Raw" : 0,
                  r.bytes === String
                    ? n.Data = ""
                    : (n.Data = [],
                      r.bytes !== Array && (n.Data = _.newBuffer(n.Data))),
                  _.Long
              ) {
                var o = new _.Long(0, 0, !0);
                n.filesize = r.longs === String
                  ? o.toString()
                  : r.longs === Number
                  ? o.toNumber()
                  : o;
              } else {
                n.filesize = r.longs === String
                  ? "0"
                  : 0;
              }
              if (_.Long) {
                var o = new _.Long(0, 0, !0);
                n.hashType = r.longs === String
                  ? o.toString()
                  : r.longs === Number
                  ? o.toNumber()
                  : o;
              } else n.hashType = r.longs === String ? "0" : 0;
              if (_.Long) {
                var o = new _.Long(0, 0, !0);
                n.fanout = r.longs === String ? o.toString()
                : r.longs === Number ? o.toNumber() : o;
              } else n.fanout = r.longs === String ? "0" : 0;
              n.mode = 0, n.mtime = null;
            }
            if (
              t.Type != null && t.hasOwnProperty("Type") &&
              (n.Type = r.enums === String
                ? q.Data.DataType[t.Type]
                : t.Type),
                t.Data != null && t.hasOwnProperty("Data") &&
                (n.Data = r.bytes === String
                  ? _.base64.encode(t.Data, 0, t.Data.length)
                  : r.bytes === Array
                  ? Array.prototype.slice.call(t.Data)
                  : t.Data),
                t.filesize != null && t.hasOwnProperty("filesize") &&
                (typeof t.filesize == "number"
                  ? n.filesize = r.longs === String
                    ? String(t.filesize)
                    : t.filesize
                  : n.filesize = r.longs === String
                    ? _.Long.prototype.toString.call(t.filesize)
                    : r.longs === Number
                    ? new _.LongBits(
                      t.filesize.low >>> 0,
                      t.filesize.high >>> 0,
                    ).toNumber(!0)
                    : t.filesize),
                t.blocksizes && t.blocksizes.length
            ) {
              n.blocksizes = [];
              for (var i = 0; i < t.blocksizes.length; ++i) {
                typeof t.blocksizes[i] == "number"
                  ? n.blocksizes[i] = r.longs === String
                    ? String(t.blocksizes[i]) : t.blocksizes[i]
                  : n.blocksizes[i] = r.longs === String
                    ? _.Long.prototype.toString.call(t.blocksizes[i])
                    : r.longs === Number
                    ? new _.LongBits(
                      t.blocksizes[i].low >>> 0,
                      t.blocksizes[i].high >>> 0,
                    ).toNumber(!0)
                    : t.blocksizes[i];
              }
            }
            return t.hashType != null && t.hasOwnProperty("hashType") &&
              (typeof t.hashType == "number"
                ? n.hashType = r.longs === String
                  ? String(t.hashType)
                  : t.hashType
                : n.hashType = r.longs === String
                  ? _.Long.prototype.toString.call(t.hashType)
                  : r.longs === Number
                  ? new _.LongBits(t.hashType.low >>> 0, t.hashType.high >>> 0)
                    .toNumber(!0)
                  : t.hashType),
              t.fanout != null && t.hasOwnProperty("fanout") &&
              (typeof t.fanout == "number"
                ? n.fanout = r.longs === String
                  ? String(t.fanout)
                  : t.fanout
                : n.fanout = r.longs === String
                  ? _.Long.prototype.toString.call(t.fanout)
                  : r.longs === Number
                  ? new _.LongBits(t.fanout.low >>> 0, t.fanout.high >>> 0)
                    .toNumber(!0)
                  : t.fanout),
              t.mode != null && t.hasOwnProperty("mode") && (n.mode = t.mode),
              t.mtime != null && t.hasOwnProperty("mtime") &&
              (n.mtime = q.UnixTime.toObject(t.mtime, r)),
              n;
          },
          e.prototype.toJSON = function () {
            return this.constructor.toObject(
              this,
              $e.default.util.toJSONOptions,
            );
          },
          e.DataType = function () {
            let t = {}, r = Object.create(t);
            return r[t[0] = "Raw"] = 0,
              r[t[1] = "Directory"] = 1,
              r[t[2] = "File"] = 2,
              r[t[3] = "Metadata"] = 3,
              r[t[4] = "Symlink"] = 4,
              r[t[5] = "HAMTShard"] = 5,
              r;
          }(),
          e;
      })(),
      iy = q.UnixTime = (() => {
        function e(t) {
          if (t) {
            for (var r = Object.keys(t), n = 0; n < r.length; ++n) {
              t[r[n]] != null && (this[r[n]] = t[r[n]]);
            }
          }
        }
        return e.prototype.Seconds = _.Long ? _.Long.fromBits(0, 0, !1) : 0,
          e.prototype.FractionalNanoseconds = 0,
          e.encode = function (t, r) {
            return r || (r = Dn.create()),
              r.uint32(8).int64(t.Seconds),
              t.FractionalNanoseconds != null &&
              Object.hasOwnProperty.call(t, "FractionalNanoseconds") &&
              r.uint32(21).fixed32(t.FractionalNanoseconds),
              r;
          },
          e.decode = function (t, r) {
            t instanceof Ze || (t = Ze.create(t));
            for (
              var n = r === void 0 ? t.len : t.pos + r,
                o = new q.UnixTime();
              t.pos < n;
            ) {
              var i = t.uint32();
              switch (i >>> 3) {
                case 1:
                  o.Seconds = t.int64();
                  break;
                case 2:
                  o.FractionalNanoseconds = t.fixed32();
                  break;
                default:
                  t.skipType(i & 7);
                  break;
              }
            }
            if (!o.hasOwnProperty("Seconds")) {
              throw _.ProtocolError("missing required 'Seconds'", {
                instance: o,
              });
            }
            return o;
          },
          e.fromObject = function (t) {
            if (t instanceof q.UnixTime) return t;
            var r = new q.UnixTime();
            return t.Seconds != null &&
              (_.Long
                ? (r.Seconds = _.Long.fromValue(t.Seconds)).unsigned = !1
                : typeof t.Seconds == "string"
                ? r.Seconds = parseInt(t.Seconds, 10)
                : typeof t.Seconds == "number"
                ? r.Seconds = t.Seconds
                : typeof t.Seconds == "object" &&
                  (r.Seconds = new _.LongBits(
                    t.Seconds.low >>> 0,
                    t.Seconds.high >>> 0,
                  ).toNumber())),
              t.FractionalNanoseconds != null &&
              (r.FractionalNanoseconds = t.FractionalNanoseconds >>> 0),
              r;
          },
          e.toObject = function (t, r) {
            r || (r = {});
            var n = {};
            if (r.defaults) {
              if (_.Long) {
                var o = new _.Long(0, 0, !1);
                n.Seconds = r.longs === String ? o.toString()
                : r.longs === Number
                  ? o.toNumber()
                  : o;
              } else n.Seconds = r.longs === String ? "0" : 0;
              n.FractionalNanoseconds = 0;
            }
            return t.Seconds != null && t.hasOwnProperty("Seconds") &&
              (typeof t.Seconds == "number"
                ? n.Seconds = r.longs === String ? String(t.Seconds) : t.Seconds
                : n.Seconds = r.longs === String
                  ? _.Long.prototype.toString.call(t.Seconds)
                  : r.longs === Number
                  ? new _.LongBits(t.Seconds.low >>> 0, t.Seconds.high >>> 0)
                    .toNumber()
                  : t.Seconds),
              t.FractionalNanoseconds != null &&
              t.hasOwnProperty("FractionalNanoseconds") &&
              (n.FractionalNanoseconds = t.FractionalNanoseconds),
              n;
          },
          e.prototype.toJSON = function () {
            return this.constructor.toObject(
              this,
              $e.default.util.toJSONOptions,
            );
          },
          e;
      })(),
      ay = q.Metadata = (() => {
        function e(t) {
          if (t) {
            for (
              var r = Object.keys(t), n = 0;
              n < r.length;
              ++n
            ) {
              t[r[n]] != null && (this[r[n]] = t[r[n]]);
            }
          }
        }
        return e.prototype.MimeType = "",
          e.encode = function (t, r) {
            return r || (r = Dn.create()),
              t.MimeType != null && Object.hasOwnProperty.call(t, "MimeType") &&
              r.uint32(10).string(t.MimeType),
              r;
          },
          e.decode = function (t, r) {
            t instanceof Ze || (t = Ze.create(t));
            for (
              var n = r === void 0 ? t.len : t.pos + r,
                o = new q.Metadata();
              t.pos < n;
            ) {
              var i = t.uint32();
              switch (i >>> 3) {
                case 1:
                  o.MimeType = t.string();
                  break;
                default:
                  t.skipType(i & 7);
                  break;
              }
            }
            return o;
          },
          e.fromObject = function (t) {
            if (t instanceof q.Metadata) return t;
            var r = new q.Metadata();
            return t.MimeType != null && (r.MimeType = String(t.MimeType)), r;
          },
          e.toObject = function (t, r) {
            r || (r = {});
            var n = {};
            return r.defaults && (n.MimeType = ""),
              t.MimeType != null && t.hasOwnProperty("MimeType") &&
              (n.MimeType = t.MimeType),
              n;
          },
          e.prototype.toJSON = function () {
            return this.constructor.toObject(
              this,
              $e.default.util.toJSONOptions,
            );
          },
          e;
      })(),
      sy = parseInt("0644", 8),
      cy = parseInt("0755", 8);
    h1 = Qe(e0()),
      m1 = Qe(Ka()),
      Ot = class extends dr {
        constructor(e) {
          super("core", ["add", "addAll", "cat", "ls"], e);
        }
      };
    Ot.prototype.addAll = async function* (e, t = {}) {
      let { timeout: r, signal: n } = t,
        o = t.transfer || new Set(),
        i = t.progress ? is(t.progress, o) : void 0,
        a = await this.remote.addAll({
          ...t,
          input: v1(e, o),
          progress: void 0,
          progressCallback: i,
          transfer: o,
          timeout: r,
          signal: n,
        });
      yield* $n(a.data, as);
    };
    Ot.prototype.add = async function (e, t = {}) {
      let { timeout: r, signal: n } = t,
        o = t.transfer || new Set(),
        i = t.progress ? is(t.progress, o) : void 0,
        a = await this.remote.add({
          ...t,
          input: await b1(e, o),
          progress: void 0,
          progressCallback: i,
          transfer: o,
          timeout: r,
          signal: n,
        });
      return as(a.data);
    };
    Ot.prototype.cat = async function* (e, t = {}) {
      let r = U.asCID(e),
        n = r ? ke(r) : e,
        o = await this.remote.cat({ ...t, path: n });
      yield* $n(o.data, y1);
    };
    Ot.prototype.ls = async function* (e, t = {}) {
      let r = U.asCID(e),
        n = r ? ke(r) : e,
        o = await this.remote.ls({ ...t, path: n });
      yield* $n(o.data, g1);
    };
    as = ({ path: e, cid: t, mode: r, mtime: n, size: o }) => ({
      path: e,
      cid: Se(t),
      mode: r,
      mtime: n,
      size: o,
    }),
      g1 = (
        { name: e, path: t, size: r, cid: n, type: o, mode: i, mtime: a },
      ) => ({
        cid: Se(n),
        type: o,
        name: e,
        path: t,
        mode: i,
        mtime: a,
        size: r,
      }),
      y1 = (e) => e,
      b1 = async (e, t) => {
        if (
          e instanceof Blob || typeof e == "string" ||
          e instanceof ArrayBuffer || ArrayBuffer.isView(e)
        ) {
          return e;
        }
        {
          let r = Nn(e);
          if (r) return Ee(await Wn(r), In, t);
          let n = Bn(e);
          if (n) return Ee(await Wn(n), et, t);
          let o = Fn(e);
          if (o) return Ee(await Wn((0, Rn.default)(o)), et, t);
          let i = Un(e);
          if (i) return Ln(i, t);
          throw TypeError("Unexpected input: " + typeof e);
        }
      },
      v1 = (e, t) => {
        let r = Nn(e);
        if (r) return Ee(r, In, t);
        let n = Bn(e);
        if (n) return Ee(n, et, t);
        let o = Fn(e);
        if (o) return Ee((0, Rn.default)(o), et, t);
        throw TypeError("Unexpected input: " + typeof e);
      },
      et = (e, t) => {
        if (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) return e;
        if (e instanceof Blob) return { path: "", content: e };
        if (typeof e == "string") return { path: "", content: e };
        {
          let r = Un(e);
          if (r) return Ln(r, t);
          throw TypeError("Unexpected input: " + typeof e);
        }
      },
      In = (e, t) => {
        if (typeof e == "number") {
          throw TypeError("Iterable of numbers is not supported");
        }
        if (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) return e;
        if (e instanceof Blob) return { path: "", content: e };
        if (typeof e == "string") return { path: "", content: e };
        {
          let r = Un(e);
          if (r) return Ln(r, t);
          throw TypeError("Unexpected input: " + typeof e);
        }
      },
      Ln = ({ path: e, mode: t, mtime: r, content: n }, o) => {
        let i = { path: e, mode: d1(t), mtime: f1(r) };
        return n && (i.content = w1(n, o)), i;
      },
      w1 = (e, t) => {
        if (e == null) return "";
        if (
          e instanceof ArrayBuffer || ArrayBuffer.isView(e) ||
          e instanceof Blob || typeof e == "string"
        ) {
          return e;
        }
        {
          let r = Nn(e);
          if (r) return Ee(r, In, t);
          let n = Bn(e);
          if (n) return Ee(n, et, t);
          let o = Fn(e);
          if (o) return Ee((0, Rn.default)(o), et, t);
          throw TypeError("Unexpected input: " + typeof e);
        }
      },
      Nn = (e) => {
        let t = e;
        return t && typeof t[Symbol.iterator] == "function" ? t : null;
      },
      Bn = (e) => {
        let t = e;
        return t && typeof t[Symbol.asyncIterator] == "function" ? t : null;
      },
      Fn = (e) => e && typeof e.getReader == "function" ? e : null,
      Un = (e) => typeof e == "object" && (e.path || e.content) ? e : null,
      Wn = async (e) => {
        let t = (0, h1.default)(e), { value: r, done: n } = await t.peek();
        if (n) return [];
        if (
          t.push(r),
            Number.isInteger(r) || x1(r) || typeof r == "string" ||
            r instanceof String
        ) {
          return t;
        }
        throw (0, m1.default)(
          new Error(
            "Unexpected input: multiple items passed - if you are using ipfs.add, please use ipfs.addAll instead",
          ),
          "ERR_UNEXPECTED_INPUT",
        );
      };
    ss = class extends dr {
      constructor(e) {
        super("files", ["stat"], e);
      }
    };
    ss.prototype.stat = async function (e, t = {}) {
      let { size: r, hash: n, withLocal: o, timeout: i, signal: a } = t,
        { stat: l } = await this.remote.stat({
          path: k1(e),
          size: r,
          hash: n,
          withLocal: o,
          timeout: i,
          signal: a,
        });
      return S1(l);
    };
    k1 = (e) => U.asCID(e) ? `/ipfs/${e.toString()}` : e.toString(),
      S1 = (e) => ({ ...e, cid: Se(e.cid) }),
      wr = class extends Ot {
        constructor(e) {
          super(e);
          this.transport = e,
            this.dag = new vr(this.transport),
            this.files = new ss(this.transport),
            this.block = new Et(this.transport);
        }
        static attach(e, t) {
          e.transport.connect(t);
        }
        static detached() {
          return new wr(new wt(void 0));
        }
        static from(e) {
          return new wr(new wt(e));
        }
      },
      ly = ["https://ipfs.io/ipfs/:hash", "https://cf-ipfs.com/ipfs/:hash"];
    cs = {};
    le(cs, { identity: () => E1 });
    E1 = An({
      prefix: "\0",
      name: "identity",
      encode: (e) => T0(e),
      decode: (e) => z0(e),
    }), ls = {};
    le(ls, { base2: () => O1 });
    O1 = H({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 }),
      us = {};
    le(us, { base8: () => C1 });
    C1 = H({
      prefix: "7",
      name: "base8",
      alphabet: "01234567",
      bitsPerChar: 3,
    }), ps = {};
    le(ps, { base10: () => _1 });
    _1 = xt({ prefix: "9", name: "base10", alphabet: "0123456789" }), ds = {};
    le(ds, { base16: () => z1, base16upper: () => T1 });
    z1 = H({
      prefix: "f",
      name: "base16",
      alphabet: "0123456789abcdef",
      bitsPerChar: 4,
    }),
      T1 = H({
        prefix: "F",
        name: "base16upper",
        alphabet: "0123456789ABCDEF",
        bitsPerChar: 4,
      }),
      fs = {};
    le(fs, { base36: () => j1, base36upper: () => M1 });
    j1 = xt({
      prefix: "k",
      name: "base36",
      alphabet: "0123456789abcdefghijklmnopqrstuvwxyz",
    }),
      M1 = xt({
        prefix: "K",
        name: "base36upper",
        alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      }),
      hs = {};
    le(hs, {
      base64: () => A1,
      base64pad: () => P1,
      base64url: () => $1,
      base64urlpad: () => R1,
    });
    A1 = H({
      prefix: "m",
      name: "base64",
      alphabet:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      bitsPerChar: 6,
    }),
      P1 = H({
        prefix: "M",
        name: "base64pad",
        alphabet:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        bitsPerChar: 6,
      }),
      $1 = H({
        prefix: "u",
        name: "base64url",
        alphabet:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
        bitsPerChar: 6,
      }),
      R1 = H({
        prefix: "U",
        name: "base64urlpad",
        alphabet:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
        bitsPerChar: 6,
      }),
      ms = {};
    le(ms, { sha256: () => I1, sha512: () => L1 });
    Hn = ({ name: e, code: t, encode: r }) => new D1(e, t, r),
      D1 = class {
        constructor(e, t, r) {
          this.name = e, this.code = t, this.encode = r;
        }
        async digest(e) {
          if (e instanceof Uint8Array) {
            let t = await this.encode(e);
            return Za(this.code, t);
          } else throw Error("Unknown type, must be binary type");
        }
      },
      gs = (e) => async (t) => new Uint8Array(await crypto.subtle.digest(e, t)),
      I1 = Hn({ name: "sha2-256", code: 18, encode: gs("SHA-256") }),
      L1 = Hn({ name: "sha2-512", code: 19, encode: gs("SHA-512") }),
      ys = {};
    le(ys, { identity: () => N1 });
    N1 = Hn({ name: "identity", code: 0, encode: (e) => gr(e) }),
      py = new TextEncoder(),
      dy = new TextDecoder(),
      bs = { ...cs, ...ls, ...us, ...ps, ...ds, ...rs, ...fs, ...es, ...hs },
      fy = { ...ms, ...ys };
    ws = vs("utf8", "u", (e) => {
      let t = new TextDecoder("utf8");
      return "u" + t.decode(e);
    }, (e) => new TextEncoder().encode(e.substring(1))),
      qn = vs("ascii", "a", (e) => {
        let t = "a";
        for (let r = 0; r < e.length; r++) t += String.fromCharCode(e[r]);
        return t;
      }, (e) => {
        e = e.substring(1);
        let t = new Uint8Array(e.length);
        for (let r = 0; r < e.length; r++) t[r] = e.charCodeAt(r);
        return t;
      }),
      B1 = {
        utf8: ws,
        "utf-8": ws,
        hex: bs.base16,
        latin1: qn,
        ascii: qn,
        binary: qn,
        ...bs,
      },
      xs = B1;
    xr = (e) => {
      typeof e == "string" ? console.log(e)
      : typeof e == "object" ? console.table({ msg: e }) : console.log(e);
    };
    Gn = t0.default;
  });
var Os = {};
Ce(Os, {
  all: () => Gn,
  concat: () => Vn,
  ipfsCat: () => Es,
  ipfsClient: () => Xn,
  toString: () => Kn,
});
var Ss,
  W1,
  Jn,
  Xn,
  Es,
  Cs = Y(() => {
    ur();
    ks();
    ({ workerSrc: Ss, forceNormalWorker: W1 } = Ye("ipfsWorker.js"));
    if (typeof SharedWorker != "undefined" && !W1) {
      Jn = new SharedWorker(Ss).port;
    } else {
      let e = new Worker(Ss),
        { port1: t, port2: r } = new MessageChannel(),
        n = { clientInit: !0, port: t };
      e.postMessage(n, [t]), Jn = r;
    }
    Xn = wr.from(Jn),
      Es = async (e, t) => {
        let r = t || {}, n = Xn.cat(e, r), o = Vn(await Gn(n));
        return Kn(o);
      };
    globalThis.ipfsClient = Xn;
    globalThis.ipfsCat = Es;
  });
var Yn = {};
Ce(Yn, { shareItAsHtml: () => V1 });
async function H1(e) {
  let { all: t, ipfsClient: r } = await Promise.resolve().then(
    () => (Cs(), Os),
  );
  try {
    return (await t(r.addAll(e))).map((o) => {
      let i = o.cid.toString();
      return { path: o.path, CID: i };
    });
  } catch (n) {
    console.error({ error: n });
  }
}
var V1,
  Qn = Y(() => {
    cr();
    _n();
    V1 = async ({ transpiled: e, code: t, html: r }) => {
      let n = [
          {
            path: "/app/index.html",
            content: Va({ html: r, css: lr({ html: r }), transpiled: e }),
          },
          { path: "/app/app.js", content: e },
          { path: "/app/app.tsx", content: t },
          { path: "/app/edit/index.html", content: Ha() },
        ],
        o = await ce(JSON.stringify(n)),
        i = await P.get(o, "string");
      if (i === null) {
        let l = (await H1(n)).find((s) => s.path === "app");
        if (typeof l == "undefined") return null;
        i = `https://ipfs.io/ipfs/${l.CID}`;
        let { pathname: c } = new URL(window.location.href);
        (c.endsWith("/edit/") || c.endsWith("/edit")) &&
        history.pushState({}, "", `/ipfs/${l.CID}/edit/`), await P.put(o, i);
      }
      return i;
    };
  });
async function _s(e) {
  let { DraggableWindow: t, jsx: r, render: n } = await Promise.resolve().then(
      () => (za(), _a),
    ),
    o = async () => {
      let { shareItAsHtml: a } = await Promise.resolve().then(() => (Qn(), Yn)),
        l = await a(e);
      open(l + "/");
    },
    i = window.document.getElementById("preview");
  if (!i) {
    let a = window.document.createElement("div");
    window.document.body.appendChild(a), i = a;
  }
  n(
    r(t, {
      onShare: o,
      session: e,
      onRestore: () => {
        e.editor.getModel().setValue(e.code);
      },
      position: e.mode === "window" ? "fixed" : "absolute",
    }),
    i,
  );
}
var zs = Y(() => {});
var Ms = {};
Ce(Ms, { baberTransform: () => kr });
import { wrap as Ts } from "https://unpkg.com/comlink@4.3.1/dist/esm/comlink.mjs";
async function kr(e) {
  return tt === null ? (await K1(), kr(e)) : await tt(e);
}
async function K1() {
  if (q1 || typeof SharedWorker == "undefined") {
    let t = new Worker(js),
      { port1: r, port2: n } = new MessageChannel(),
      o = { comlinkInit: !0, port: r };
    return t.postMessage(o, [r]), tt = await Ts(n), tt;
  }
  let e = new SharedWorker(js);
  return e.port.start(), tt = await Ts(e.port), tt;
}
var js,
  q1,
  tt,
  Zn = Y(() => {
    ur();
    ({ workerSrc: js, forceNormalWorker: q1 } = Ye("babel.worker.js")),
      tt = null;
  });
var As = {};
Ce(As, { restart: () => G1 });
var G1,
  Ps = Y(() => {
    Zn();
    $s();
    G1 = async (e, t) => {
      let r = window.sess || { setChild: () => {} };
      window.sess = r;
      let n = await kr(e);
      return await eo(n, t, r.counter, r);
    };
  });
var Ls = {};
Ce(Ls, { formatter: () => Y1 });
import { wrap as Rs } from "https://unpkg.com/comlink@4.3.1/dist/esm/comlink.mjs";
async function Y1(e) {
  if (Oe === null) {
    X1-- < 0 && setTimeout(Is);
    try {
      return await (await fetch(
        "https://x-spike-land.zed-vision.workers.dev/api/prettier",
        { method: "POST", body: e },
      )).text();
    } catch (r) {
      return Oe = await Is(), await Oe(e);
    }
  }
  return await Oe(e);
}
async function Is() {
  if (
    Oe && console.log("INIT INIT"), J1 || typeof SharedWorker == "undefined"
  ) {
    let t = new Worker(Ds),
      { port1: r, port2: n } = new MessageChannel(),
      o = { comlinkInit: !0, port: r };
    return t.postMessage(o, [r]), Oe = await Rs(n), Oe;
  }
  let e = new SharedWorker(Ds);
  return e.port.start(), Oe = await Rs(e.port), Oe;
}
var Ds,
  J1,
  Oe,
  X1,
  Ns = Y(() => {
    ur();
    ({ workerSrc: Ds, forceNormalWorker: J1 } = Ye("prettierWorker.js")),
      Oe = null,
      X1 = 2;
  });
var Fs = zr((zy, no) => {
  var Bs = typeof crypto != "undefined" && crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto) ||
    typeof msCrypto != "undefined" &&
      typeof window.msCrypto.getRandomValues == "function" &&
      msCrypto.getRandomValues.bind(msCrypto);
  Bs
    ? (to = new Uint8Array(16),
      no.exports = function () {
        return Bs(to), to;
      })
    : (ro = new Array(16),
      no.exports = function () {
        for (var t = 0, r; t < 16; t++) {
          (t & 3) == 0 && (r = Math.random() * 4294967296),
            ro[t] = r >>> ((t & 3) << 3) & 255;
        }
        return ro;
      });
  var to, ro;
});
var Vs = zr((Ty, Ws) => {
  var Us = [];
  for (Ct = 0; Ct < 256; ++Ct) Us[Ct] = (Ct + 256).toString(16).substr(1);
  var Ct;
  function Q1(e, t) {
    var r = t || 0, n = Us;
    return [
      n[e[r++]],
      n[e[r++]],
      n[e[r++]],
      n[e[r++]],
      "-",
      n[e[r++]],
      n[e[r++]],
      "-",
      n[e[r++]],
      n[e[r++]],
      "-",
      n[e[r++]],
      n[e[r++]],
      "-",
      n[e[r++]],
      n[e[r++]],
      n[e[r++]],
      n[e[r++]],
      n[e[r++]],
      n[e[r++]],
    ].join("");
  }
  Ws.exports = Q1;
});
var qs = zr((jy, Hs) => {
  var Z1 = Fs(), eg = Vs();
  function tg(e, t, r) {
    var n = t && r || 0;
    typeof e == "string" &&
    (t = e === "binary" ? new Array(16) : null, e = null), e = e || {};
    var o = e.random || (e.rng || Z1)();
    if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, t) {
      for (var i = 0; i < 16; ++i) {
        t[n + i] = o[i];
      }
    }
    return t || eg(o);
  }
  Hs.exports = tg;
});
var Ys = {};
Ce(Ys, {
  edit: () => ng,
  getCodeToLoad: () => og,
  getIPFSCodeToLoad: () => Xs,
  getProjects: () => Gs,
  getUserId: () => ao,
  saveCode: () => ig,
});
import io from "https://unpkg.com/@spike.land/esm@0.2.49/dist/ipfs-only-hash.mjs";
async function rg(e, t) {
  ue = await ao();
  let r = await P.get(ue, "json") || { list: [] },
    n = (0, oo.default)(),
    o = {
      ...r,
      projects: { ...r.projects, [e]: { projectId: n, lastOpen: Date.now() } },
      [n]: { lastOpen: Date.now() },
      list: [n, ...r.list],
    };
  await P.put(ue, JSON.stringify(o)), await P.put(n, t);
}
async function ao() {
  if (ue) return ue;
  let e = await P.get("uuid", "string");
  if (!e) {
    let r = await (await fetch("https://spike.land/register")).json();
    return ue || (ue = r.uuid, await P.put("uuid", r.uuid), r.uuid);
  }
  return e;
}
async function Js() {
  if (Sr) return Sr;
  let e = await Gs();
  return e.rootUrl ? e : (Sr = e[0], Sr);
}
async function ng(e) {
  console.log(e);
  let t = window.location.href.endsWith("/edit/")
      ? window.location.href.slice(0, -5)
      : window.location.href.slice(0, -4),
    r = await fetch(`${t}/app.tsx`).then((a) => a.text()),
    n = await ce(r);
  await P.put(n, r);
  let o = JSON.stringify({ code: n, transpiled: "", html: "", url: t }),
    i = await ce(o);
  await P.put(i, o),
    await rg(e, i),
    console.log("done"),
    location.href = "https://code.spike.land";
}
async function Xs(e) {
  let t = e ||
      (window.location.href.endsWith("/edit/")
        ? window.location.href.slice(0, -5)
        : window.location.href.slice(0, -4)),
    o = {
      code: await (await fetch(t + "app.tsx")).text(),
      url: t,
      transpiled: "",
      html: "",
    };
  return console.log({ ret: o }), o;
}
async function og(e) {
  let t, r = e || await Js();
  if (r.rootUrl) return Xs(r.rootUrl);
  let n = await P.get(r, "string"), o = await P.get(n, "json");
  if (e !== "") {
    let l =
      await (await fetch(`https://code.spike.land/api/room/${e}/hashOfCode`))
        .text();
    if (l === "" && o === null) t = await Or();
    else if (o && o.code && l) {
      let s = await P.get(o.code, "string"), u = await io.of(s);
      u && l === u && (t = s);
    }
    return t ||
      (l
        ? t = await (await fetch(`https://code.spike.land/api/room/${e}/code`))
          .text()
        : t = await Or()),
      {
        code: t,
        transpiled: o && await P.get(o.transpiled, "string") || "",
        html: o && await P.get(o.html, "string") || "",
      };
  }
  return {
    code: await P.get(o, "string") || await Or(),
    transpiled: null,
    html: null,
  };
}
function Or() {
  return fetch("https://code.spike.land/js/examples/rca.tsx").then((e) =>
    e.text()
  );
}
var oo,
  Ks,
  ue,
  Gs,
  Sr,
  _t,
  Er,
  ig,
  Qs = Y(() => {
    cr();
    oo = _c(qs());
    _n();
    Ks = {},
      Gs = async () => {
        ue = await ao();
        let e = await P.get(ue, "json"), t = null;
        if (e && e.signal) return e.signal;
        if (typeof e == "string" || e === null || !e.list) {
          let r = (0, oo.default)();
          return await P.put(
            ue,
            JSON.stringify({ ...e, list: [r], [r]: { lastOpen: Date.now() } }),
          ),
            t !== null && await P.put(r, t),
            [r];
        }
        return t !== null && await P.put(e.list[0], t), e.list;
      };
    _t = { code: "", html: null, transpiled: null, url: null },
      Er = { code: "", html: null, transpiled: null },
      ig = async (e, t) => {
        let { code: r, codeNonFormatted: n, html: o, transpiled: i } = e;
        if (Er.code = r || await Or(), e.i > t) return;
        if (e.code !== Er.code) return null;
        if (Er.code === _t.code && _t.url !== null) return _t.url;
        if (Er.code = e.code, window.broad && n) {
          let h = await io.of(n);
          Ks.codeNonFormatted = n,
            setTimeout(async () =>
              Ks.codeNonFormatted === n &&
              window.broad({
                starterCode: window.starterCode,
                code: n,
                transpiled: i,
                i: e.i,
                html: e.html,
                css: lr({ html: o }),
                hashOfStarterCode: window.starterCode &&
                  await io.of(window.starterCode),
                hashOfCode: h,
              }), 500);
        }
        let { shareItAsHtml: a } = await Promise.resolve().then(
            () => (Qn(), Yn),
          ),
          l = a({ code: r, html: o, transpiled: i });
        if (e.i > t) return;
        let c = await l, s = e.room || await Js();
        if (e.i > t) return;
        e.url = c;
        let u = {
            url: await ce(c),
            code: await ce(r),
            html: await ce(o),
            transpiled: await ce(i),
          },
          p = await ce(JSON.stringify(u));
        return await P.put(p, JSON.stringify(u)),
          r && await P.put(u.code, r),
          o && await P.put(u.html, o),
          i && await P.put(u.transpiled, i),
          await P.put(s, p),
          Object.assign(_t, { html: o, code: r, transpiled: i, url: c }),
          _t;
      };
  });
import { jsx as ag } from "https://unpkg.com/@emotion/react@11.7.1/dist/emotion-react.browser.esm.js";
import sg from "https://unpkg.com/@spike.land/esm@0.2.49/dist/react-dom.mjs";
async function cg(e) {
  let t = document.getElementById("edizzoo"),
    r = await yo({
      language: "typescript",
      container: t,
      code: e.code,
      onChange: (l, c) => a(l, c),
    });
  e.editor = r();
  let n = window.monaco;
  window.sess = e;
  async function o(l) {
    if (!n) {
      return [{ messageText: "Error with the error checking. Try to reload!" }];
    }
    let c = l.editor.getModel(),
      u = await (await n.languages.typescript.getTypeScriptWorker())(c),
      p = c.uri.toString(),
      h = u.getSemanticDiagnostics(p),
      d = u.getCompilerOptionsDiagnostics(p),
      f = u.getSyntacticDiagnostics(p),
      m = await Promise.race([h, d, f]);
    return console.log(m), [];
  }
  async function i(l) {
    return (await Promise.resolve().then(() => (Ps(), As))).restart(l);
  }
  async function a(l, c = null) {
    if (
      e.changes.push(c),
        window.sendChannel && window.sendChannel.readyState === "open"
    ) {
      let u = (await import(
          "https://unpkg.com/@spike.land/esm@0.2.49/dist/ipfs-only-hash.mjs"
        )).default,
        p = await u.of(l);
      if (
        window.hashOfCode === window.hashOfStarterCode &&
        window.hashOfCode === p
      ) {
        return;
      }
      window[p] = l;
      let h = await u.of(e.code);
      if (window[h] = e.code, window.hashOfCode !== p) {
        let d = l,
          f = (await import(
            "https://unpkg.com/@spike.land/esm@0.2.49/dist/textdiff-create.mjs"
          )).default;
        window.sendChannel.send(
          JSON.stringify({
            changes: c,
            i: e.i,
            hashOfCode: p,
            prevHash: window.hashOfStarterCode,
            codeDiff: pg(d, l, f),
          }),
        );
      }
    }
    e.errorText = "", e.i++;
    let s = e.i;
    try {
      let p = await (await Promise.resolve().then(() => (Ns(), Ls))).formatter(
          l,
        ),
        d = await (await Promise.resolve().then(() => (Zn(), Ms)))
          .baberTransform(p),
        f = !1;
      if (d.length && e.lastErrors < 2) {
        if (s < e.i) return;
        f = await i(l);
      }
      if (e.i > s) return;
      let m = await o(e);
      if (e.i > s) return;
      if (
        f &&
        m.push({
          messageText: "Error while starting the app. Check the console!",
        }),
          m.length && console.log({ err: m }),
          e.lastErrors && m.length === 0 && i(l),
          e.lastErrors = m.length,
          m.length === 0 && d.length
      ) {
        if (e.i > s) return;
        e.code = p,
          e.codeNonFormatted = l,
          (await Promise.resolve().then(() => (Qs(), Ys))).saveCode(e, s);
      } else {
        if (console.log({ code: l, transpiled: d }), e.i > s) return;
        if (p.length < 1e3 && e.code.length < 1e3) {
          let v = await (await Promise.resolve().then(() => (cr(), Fa))).diff(
            e.code,
            p,
          );
          if (v.c.length <= 3) {
            e.lastErrors = 0;
            return;
          }
          if (v.c.length == 4) {
            e.lastErrors = 0, n.editor.setTheme("hc-black");
            return;
          }
        }
        m && m[0] && m[0].messageText &&
          console.error(m[0].messageText.toString());
        return;
      }
      n.editor.setTheme("vs-dark");
    } catch (u) {
      n.editor.setTheme("vs-light"),
        setTimeout(() => {
          n.editor.setTheme("hc-black");
        }, 50),
        e.errorText = u.message,
        console.error(u.message);
    }
  }
}
async function Ly(e) {
  await _s(e),
    await cg(e),
    await eo(e.transpiled, document.getElementById("zbody"), e.i + 1, e);
}
async function eo(e, t, r, n) {
  if (n.i > r || n.actualT === e) return !1;
  n.actualT = e, n.html = "", n.transpiled = "";
  let o = !1;
  if (typeof e != "string" || e === "") return o = !0, o;
  let i;
  try {
    i = await lg(e);
  } catch (l) {
    return n.errorText = l.message,
      console.error({ error: l, message: "error in rendering" }),
      !0;
  }
  let a = t || document.createElement("div");
  return sg.render(i, a),
    n.div = a,
    a.innerHTML &&
    (n.transpiled = e,
      n.html = a.innerHTML,
      n.children = i,
      n.setChild((l) => [...l, n.children])),
    !a.innerHTML;
}
async function lg(e, t = "window") {
  let r = t === "window" ? e.replace("body{", "#zbody{") : e,
    n = ug(r),
    o = await import(n);
  return URL.revokeObjectURL(n), ag(o.default);
}
function ug(e) {
  let t = new Blob([e], { type: "application/javascript" });
  return URL.createObjectURL(t);
}
function pg(e, t, r) {
  return JSON.stringify(r(e, t));
}
var $s = Y(() => {
  bo();
  zs();
});
$s();
export { cg as startMonacoWithSession, eo as restartX, Ly as quickStart };
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
