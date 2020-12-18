const starter =
  `import { useState } from "react";\nimport { css, Global } from "@emotion/react";\n\nconst Slider = () => {\n  const steps = 128;\n  const [sliderValue, setSlider] = useState(steps / 2);\n  return <>\n    <input max={steps}\n      css={\`\n        appearance: none;\n        width: 100%;\n        height: 40px; \n        background: rgb(\${255 / steps * sliderValue} \${255 / steps * (steps - sliderValue)} 0); \n        outline: none; \n    \`} type="range"\n      aria-label="font size changer"\n      value={sliderValue}\n      step="1"\n      onChangeCapture={(e) => setSlider(Number(e.currentTarget.value))}>\n    </input>\n    <p\n      css={css\`\n        font-size: \${72 / steps * sliderValue}px\n        \`}>\n      Example when the text gets bigger...\n    </p>\n    <p css={css\`\n        font-size: \${72 / steps * (steps - sliderValue)}px\n        \`}>\n      ...or smaller\n    </p>\n  </>\n}\n\nexport default () => <>\n  <Global styles={css\`\n      body{\n          margin: 0;\n          overflow: overlay;\n        }  \n    \`} />\n  <Slider />\n</>\n`;
const __default = async function () {
  const { importScript } = await import(
    "https://unpkg.com/@zedvision/code@8.6.0/dist/importScript.js"
  );
  const debts = [
    "https://unpkg.com/react@17.0.1/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17.0.1/umd/react-dom-server.browser.production.min.js",
    "https://unpkg.com/@emotion/react@11.1.2/dist/emotion-react.umd.min.js",
    "https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js",
    "https://unpkg.com/framer-motion@3.0.0/dist/framer-motion.js",
  ];
  for (let i = 0; i < debts.length; i++) {
    await importScript(debts[i]);
  }
  Object.assign(window, emotionReact);
  let styled = window["emotionStyled"];
  let DefaultElement;
  Object.assign(window, React);
  if (window.Motion) {
    Object.assign(window, window.Motion);
  }
  if (window.emotionStyled) {
    window.styled = window.emotionStyled;
  }
  Object.assign(window, React);
  const DraggableWindow = ({ onShare }) => {
    const [scale, changeScale] = React.useState(100);
    const ref = React.useRef(null);
    return jsx(
      motion.div,
      {
        ref: ref,
        css:
          `\n            background: red;\n            max-width: 80%;\n            left: 60%;\n            border: 4px solid red; \n            border-radius: 8px;\n          `,
        whileDrag: {
          scale: scale / 100 * 0.7,
        },
        animate: {
          scale: scale / 100,
        },
        dragElastic: 0.5,
        dragMomentum: false,
        transition: {},
        drag: true,
      },
      jsx(
        "div",
        {
          css: css
            `\n      display: block;\n      width: 100%;\n      text-align: right;\n      background: linear-gradient(0deg, darkred, red);\n    `,
        },
        jsx("button", {
          onClick: () => changeScale((x) => x - 10),
          css: buttonCss({
            color: "green",
            square: true,
          }),
        }, "-"),
        jsx(
          "div",
          {
            css: css
              `\n        color:white;\n        padding: 7px;\n        display:inline;\n        background: \n        font-family: Roboto;\n        font-weight: 600;\n        margin-left: 0px;\n        margin-right: -25px;\n      `,
          },
          scale,
          "%",
        ),
        jsx("button", {
          onClick: () => changeScale((x) => x + 10),
          css: buttonCss({
            color: "green",
            square: true,
          }),
        }, "+"),
        jsx("button", {
          css: buttonCss({}),
          onClick: () => {
            console.log(ref.current.clientHeight);
            onShare();
          },
        }, "\uD83C\uDF0E Export"),
      ),
      jsx("div", {
        css: css
          `  \n      display: block;\n      overflow: hidden;\n      min-width: 200px;\n      padding: 30px;\n      max-width: 600px;\n      background: white;\n      max-height: 800px;\n      overflow-y: scroll;\n      overflow-wrap: break-word;\n      border-radius: 0px 0px 8px 8px;\n    `,
        id: "root",
      }, "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"),
    );
  };
  const buttonCss = ({ color = "darkred", square = false }) =>
    css
      `\n              background: ${color};\n              margin-top: -4px;\n              margin-right: -4px;\n              color: white;\n              cursor: pointer;\n              font-weight: bold;\n              font-family: Roboto;\n              padding: 8px 16px;\n              outline: none;\n              border: none; \n              margin-left: 20px;\n              border-radius: 0px ${
        square ? 0 : 8
      }px 0px 0px;\n            `;
  DefaultElement = () =>
    jsx(
      React.Fragment,
      null,
      jsx(Global, {
        styles: css
          `\n      body{\n          margin: 0;\n          overflow: overlay;\n        }  \n    `,
      }),
      jsx(DraggableWindow, {
        onShare: () => console.log("yoo"),
      }),
    );
  document.body.children[0].innerHTML = ReactDOMServer.renderToString(
    jsx(DefaultElement),
  );
  await importScript(
    "https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js",
  );
  ReactDOM.hydrate(jsx(DefaultElement), document.body.children[0]);
};
const session = {
  firstLoad: true,
  errorCode: "",
  code: "",
};
function replaceWithEmpty(elementId = "root") {
  const el = document.createElement("div");
  const rootEl = document.getElementById(elementId);
  try {
    ReactDOM.unmountComponentAtNode(rootEl);
  } catch (e) {
    console.error("Error in un-mount", e);
  }
  if (rootEl) rootEl.replaceWith(el);
  else {
    document.body.appendChild(el);
  }
  el.id = elementId;
}
export async function run(mode = "window") {
  const { transpileCode } = await import("./transpile.js");
  session.code = await getCodeToLoad();
  if (mode === "editor") {
    const { renderDraggableEditor } = await import("./DraggableEditor.js");
    await renderDraggableEditor();
  }
  if (mode === "window") {
    const { shareItAsHtml } = await import("./share.js");
    await __default({
      onShare: async () => {
        const link = await shareItAsHtml({
          code: await transpileCode(session.code),
        });
        window.open(link);
      },
    });
  }
  const errorDiv = document.getElementById("error");
  const { getDB } = await import("./shaDB.min.js");
  const { getUserId, getProjects, saveCode } = await import("./data.js");
  const shaDB = await getDB();
  const uuid = await getUserId();
  const projects = await getProjects();
  const projectName = projects[0];
  const transpiled = await transpileCode(session.code);
  restartCode(transpiled);
  const { startMonaco } = await import("./editor.min.js");
  const modules = await startMonaco({
    language: "typescript",
    code: session.code,
    onChange,
  });
  async function runner(cd) {
    try {
      const transpiled1 = await transpileCode(cd);
      if (transpiled1.length) restartCode(transpiled1);
      const err = await getErrors(cd);
      if (err.length === 0) {
        session.code = cd;
        await saveCode(cd);
      } else {
        session.error = cd;
        const { diff } = await import("./diff.min.js");
        const slices = await diff(session.code, cd);
        if (slices.c.length <= 3) {
          modules.monaco.editor.setTheme("hc-black");
          return;
        }
        errorDiv.innerHTML = err[0].messageText.toString();
        errorDiv.style.display = "block";
        return;
      }
      errorDiv.style.display = "none";
      modules.monaco.editor.setTheme("vs-dark");
    } catch (err) {
      modules.monaco.editor.setTheme("vs-light");
      setTimeout(() => {
        modules.monaco.editor.setTheme("hc-black");
      }, 50);
      console.error(err);
    }
  }
  function onChange(code) {
    if (!modules) return;
    window.requestAnimationFrame(() => runner(code));
  }
  async function getErrors(code) {
    if (!modules || !modules.monaco) return;
    const { monaco } = modules;
    const { sha256 } = await import("./sha256.js");
    const shaCode = await sha256(code);
    const filename = `file:///${shaCode}.tsx`;
    const uri = monaco.Uri.parse(filename);
    const model = monaco.editor.getModel(uri) ||
      await monaco.editor.createModel(code, "typescript", uri);
    const worker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await worker(model.uri);
    const diag = client.getSemanticDiagnostics(filename);
    const comp = client.getCompilerOptionsDiagnostics(filename);
    const syntax = client.getSyntacticDiagnostics(filename);
    const fastError = await Promise.race([
      diag,
      comp,
      syntax,
    ]);
    model.dispose();
    return [
      ...fastError,
    ];
  }
  function restartCode(transPiled) {
    if (typeof transPiled !== "string" || transPiled === "") {
      return;
    }
    if (!session.firstLoad) replaceWithEmpty("root");
    const restart = () => {
      const codeToHydrate = mode === "window"
        ? transPiled.replace("body{", "#root{")
        : transPiled;
      const hydrate = new Function(
        `return function(){  \n          let DefaultElement;\n          ${codeToHydrate}\n          return ReactDOM.render(jsx(DefaultElement), document.getElementById("root"));\n      }`,
      )();
      hydrate();
    };
    restart();
  }
  async function getCodeToLoad() {
    const {
      getUserId: getUserId1,
      getProjects: getProjects1,
      saveCode: saveCode1,
    } = await import("./data.js");
    const { getDB: getDB1 } = await import("./shaDB.min.js");
    const db = await getDB1();
    const uuid1 = await getUserId1();
    const projects1 = await getProjects1();
    const projectName1 = projects1[0];
    const search = new URLSearchParams(window.location.search);
    const keyToLoad = search.get("h") || await db.get(projectName1);
    if (keyToLoad) {
      let code;
      try {
        code = await db.get(keyToLoad);
      } catch {
        console.error("error load key: " + keyToLoad);
      }
      if (code) return code;
      let text;
      try {
        const resp = await fetch("https://code.zed.vision/?h=" + keyToLoad);
        text = await resp.json();
      } catch (e) {
        const { sha256 } = await import("./sha256.js");
        const shaHash = await sha256(starter);
        db.put(shaHash, starter);
        await db.put(projectName1, shaHash);
        return starter;
      }
      return text;
    }
    return starter;
  }
  function setQueryStringParameter(name, value) {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);
    window.history.replaceState(
      {},
      "",
      decodeURIComponent(`${window.location.pathname}?${params}`),
    );
  }
}
const proxyMarker = Symbol("Comlink.proxy");
const createEndpoint = Symbol("Comlink.endpoint");
const releaseProxy = Symbol("Comlink.releaseProxy");
const throwMarker = Symbol("Comlink.thrown");
const isObject = (val) =>
  typeof val === "object" && val !== null || typeof val === "function";
const throwTransferHandler = {
  canHandle: (value) => isObject(value) && throwMarker in value,
  serialize({ value }) {
    let serialized;
    if (value instanceof Error) {
      serialized = {
        isError: true,
        value: {
          message: value.message,
          name: value.name,
          stack: value.stack,
        },
      };
    } else {
      serialized = {
        isError: false,
        value,
      };
    }
    return [
      serialized,
      [],
    ];
  },
  deserialize(serialized) {
    if (serialized.isError) {
      throw Object.assign(
        new Error(serialized.value.message),
        serialized.value,
      );
    }
    throw serialized.value;
  },
};
function isMessagePort(endpoint) {
  return endpoint.constructor.name === "MessagePort";
}
function closeEndPoint(endpoint) {
  if (isMessagePort(endpoint)) endpoint.close();
}
function throwIfProxyReleased(isReleased) {
  if (isReleased) {
    throw new Error("Proxy has been released and is not useable");
  }
}
function myFlat(arr) {
  return Array.prototype.concat.apply([], arr);
}
const transferCache = new WeakMap();
function transfer(obj, transfers) {
  transferCache.set(obj, transfers);
  return obj;
}
function proxy(obj) {
  return Object.assign(obj, {
    [proxyMarker]: true,
  });
}
function generateUUID() {
  return new Array(4).fill(0).map(() =>
    Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)
  ).join("-");
}
let transform;
async function save(content, type) {
  const { sha256 } = await import("./sha256.js");
  const { getZkey } = await import("./data.js");
  const hash = await sha256(content);
  const request = new Request("https://code.zed.vision", {
    body: content,
    method: "POST",
    headers: {
      "Content-Type": type + ";charset=UTF-8",
      "ZKEY": await getZkey(hash),
    },
  });
  await fetch(request);
  return `https://code.zed.vision/${hash}`;
}
async function getUserId() {
  const { getDB } = await import("./shaDB.min.js");
  const shaDB = await getDB();
  const uuid = await shaDB.get("uuid");
  if (!uuid) {
    const resp = await fetch("https://code.zed.vision/register");
    const data = await resp.json();
    shaDB.put("uuid", data.uuid);
    return data.uuid;
  }
  return uuid;
}
const getProjects = async () => {
  const { importScript } = await import(
    "https://unpkg.com/@zedvision/code@8.6.0/dist/importScript.js"
  );
  const { uuidv4 } = await importScript(
    "https://unpkg.com/uuid@latest/dist/umd/uuidv4.min.js",
  );
  const { getDB } = await import("./shaDB.min.js");
  const shaDB = await getDB();
  const uuid = await getUserId();
  const projects = await shaDB.get(uuid, "json");
  if (typeof projects === "string" || projects === null || !projects.list) {
    const projectId = uuidv4();
    await shaDB.put(
      uuid,
      JSON.stringify({
        list: [
          projectId,
        ],
        [projectId]: {
          created: Date.now(),
          lastOpen: Date.now(),
        },
      }),
    );
    return [
      projectId,
    ];
  }
  return projects.list;
};
const on = (i, a) => a.some((f) => i instanceof f);
let He1, Ee;
function sn() {
  return He1 || (He1 = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction,
  ]);
}
function an() {
  return Ee || (Ee = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey,
  ]);
}
const Pe = new WeakMap(),
  le = new WeakMap(),
  Ce = new WeakMap(),
  fe = new WeakMap(),
  ce1 = new WeakMap();
function un(i) {
  if (le.has(i)) return;
  const a = new Promise((f, g) => {
    const p = () => {
        i.removeEventListener("complete", w),
          i.removeEventListener("error", v),
          i.removeEventListener("abort", v);
      },
      w = () => {
        f(), p();
      },
      v = () => {
        g(i.error || new DOMException("AbortError", "AbortError")), p();
      };
    i.addEventListener("complete", w),
      i.addEventListener("error", v),
      i.addEventListener("abort", v);
  });
  le.set(i, a);
}
const de1 = (i) => ce1.get(i),
  ln = [
    "get",
    "getKey",
    "getAll",
    "getAllKeys",
    "count",
  ],
  fn = [
    "put",
    "add",
    "delete",
    "clear",
  ],
  he1 = new Map();
function Ie1(i, a) {
  if (!(i instanceof IDBDatabase && !(a in i) && typeof a == "string")) return;
  if (he1.get(a)) return he1.get(a);
  const f = a.replace(/FromIndex$/, ""), g = a !== f, p = fn.includes(f);
  if (
    !(f in (g ? IDBIndex : IDBObjectStore).prototype) || !(p || ln.includes(f))
  ) {
    return;
  }
  const w = async function (v, ...L) {
    const j = this.transaction(v, p ? "readwrite" : "readonly");
    let F = j.store;
    g && (F = F.index(L.shift()));
    const B = await F[f](...L);
    return (p && await j.done, B);
  };
  return he1.set(a, w), w;
}
(function (i, a) {
  typeof exports == "object" && typeof module != "undefined"
    ? a(exports)
    : typeof define == "function" && define.amd
    ? define([
      "exports",
    ], a)
    : (i = i || self, a(i.Diff = {}));
})(this, function (i) {
  "use strict";
  function a() {
  }
  a.prototype = {
    diff: function (e, n) {
      var t = arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : {},
        r = t.callback;
      typeof t == "function" && (r = t, t = {}), this.options = t;
      var s = this;
      function o(y) {
        return r
          ? (setTimeout(function () {
            r(void 0, y);
          }, 0),
            !0)
          : y;
      }
      e = this.castInput(e),
        n = this.castInput(n),
        e = this.removeEmpty(this.tokenize(e)),
        n = this.removeEmpty(this.tokenize(n));
      var u = n.length,
        l = e.length,
        c = 1,
        d = u + l,
        m = [
          {
            newPos: -1,
            components: [],
          },
        ],
        x = this.extractCommon(m[0], n, e, 0);
      if (m[0].newPos + 1 >= u && x + 1 >= l) {
        return o([
          {
            value: this.join(n),
            count: n.length,
          },
        ]);
      }
      function h() {
        for (var y = -1 * c; y <= c; y += 2) {
          var S = void 0,
            E = m[y - 1],
            k = m[y + 1],
            N = (k ? k.newPos : 0) - y;
          E && (m[y - 1] = void 0);
          var D = E && E.newPos + 1 < u, O = k && 0 <= N && N < l;
          if (!D && !O) {
            m[y] = void 0;
            continue;
          }
          if (
            !D || O && E.newPos < k.newPos
              ? (S = g(k), s.pushComponent(S.components, void 0, !0))
              : (S = E, S.newPos++, s.pushComponent(S.components, !0, void 0)),
              N = s.extractCommon(S, n, e, y),
              S.newPos + 1 >= u && N + 1 >= l
          ) {
            return o(f(s, S.components, n, e, s.useLongestToken));
          }
          m[y] = S;
        }
        c++;
      }
      if (r) {
        (function y() {
          setTimeout(function () {
            if (c > d) return r();
            h() || y();
          }, 0);
        })();
      } else {
        for (; c <= d;) {
          var b = h();
          if (b) return b;
        }
      }
    },
    pushComponent: function (e, n, t) {
      var r = e[e.length - 1];
      r && r.added === n && r.removed === t
        ? e[e.length - 1] = {
          count: r.count + 1,
          added: n,
          removed: t,
        }
        : e.push({
          count: 1,
          added: n,
          removed: t,
        });
    },
    extractCommon: function (e, n, t, r) {
      for (
        var s = n.length, o = t.length, u = e.newPos, l = u - r, c = 0;
        u + 1 < s && l + 1 < o && this.equals(n[u + 1], t[l + 1]);
      ) {
        u++, l++, c++;
      }
      return c && e.components.push({
        count: c,
      }),
        e.newPos = u,
        l;
    },
    equals: function (e, n) {
      return this.options.comparator
        ? this.options.comparator(e, n)
        : e === n ||
          this.options.ignoreCase && e.toLowerCase() === n.toLowerCase();
    },
    removeEmpty: function (e) {
      for (var n = [], t = 0; t < e.length; t++) e[t] && n.push(e[t]);
      return n;
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
  function f(e, n, t, r, s) {
    for (var o = 0, u = n.length, l = 0, c = 0; o < u; o++) {
      var d = n[o];
      if (d.removed) {
        if (
          (d.value = e.join(r.slice(c, c + d.count)),
            c += d.count,
            o && n[o - 1].added)
        ) {
          var m = n[o - 1];
          n[o - 1] = n[o], n[o] = m;
        }
      } else {
        if (!d.added && s) {
          var x = t.slice(l, l + d.count);
          x = x.map(function (b, y) {
            var S = r[c + y];
            return S.length > b.length ? S : b;
          }), d.value = e.join(x);
        } else d.value = e.join(t.slice(l, l + d.count));
        l += d.count, d.added || (c += d.count);
      }
    }
    var h = n[u - 1];
    return (u > 1 && typeof h.value == "string" && (h.added || h.removed) &&
      e.equals("", h.value) && (n[u - 2].value += h.value, n.pop()),
      n);
  }
  function g(e) {
    return {
      newPos: e.newPos,
      components: e.components.slice(0),
    };
  }
  var p = new a();
  function w(e, n, t) {
    return p.diff(e, n, t);
  }
  function v(e, n) {
    if (typeof e == "function") n.callback = e;
    else if (e) for (var t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
    return n;
  }
  var L = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,
    j = /\S/,
    F = new a();
  F.equals = function (e, n) {
    return this.options.ignoreCase &&
      (e = e.toLowerCase(), n = n.toLowerCase()),
      e === n || this.options.ignoreWhitespace && !j.test(e) && !j.test(n);
  },
    F.tokenize = function (e) {
      for (
        var n = e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), t = 0;
        t < n.length - 1;
        t++
      ) {
        !n[t + 1] && n[t + 2] && L.test(n[t]) && L.test(n[t + 2]) &&
          (n[t] += n[t + 2], n.splice(t + 1, 2), t--);
      }
      return n;
    };
  function B(e, n, t) {
    return (t = v(t, {
      ignoreWhitespace: !0,
    }),
      F.diff(e, n, t));
  }
  function z(e, n, t) {
    return F.diff(e, n, t);
  }
  var M = new a();
  M.tokenize = function (e) {
    var n = [], t = e.split(/(\n|\r\n)/);
    t[t.length - 1] || t.pop();
    for (var r = 0; r < t.length; r++) {
      var s = t[r];
      r % 2 && !this.options.newlineIsToken
        ? n[n.length - 1] += s
        : (this.options.ignoreWhitespace && (s = s.trim()), n.push(s));
    }
    return n;
  };
  function ge(e, n, t) {
    return M.diff(e, n, t);
  }
  function Ae(e, n, t) {
    var r = v(t, {
      ignoreWhitespace: !0,
    });
    return M.diff(e, n, r);
  }
  var ve = new a();
  ve.tokenize = function (e) {
    return e.split(/(\S.+?[.!?])(?=\s+|$)/);
  };
  function Be(e, n, t) {
    return ve.diff(e, n, t);
  }
  var me = new a();
  me.tokenize = function (e) {
    return e.split(/([{}:;,]|\s+)/);
  };
  function Me(e, n, t) {
    return me.diff(e, n, t);
  }
  function Z(e) {
    return (typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? Z = function (n) {
        return typeof n;
      }
      : Z = function (n) {
        return n && typeof Symbol == "function" && n.constructor === Symbol &&
            n !== Symbol.prototype
          ? "symbol"
          : typeof n;
      },
      Z(e));
  }
  function C(e) {
    return Oe(e) || Te(e) || $e(e) || Je();
  }
  function Oe(e) {
    if (Array.isArray(e)) return ne(e);
  }
  function Te(e) {
    if (
      typeof Symbol != "undefined" && Symbol.iterator in Object(e)
    ) {
      return Array.from(e);
    }
  }
  function $e(e, n) {
    if (!e) return;
    if (typeof e == "string") return ne(e, n);
    var t = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (t === "Object" && e.constructor && (t = e.constructor.name),
        t === "Map" || t === "Set")
    ) {
      return Array.from(e);
    }
    if (
      t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
    ) {
      return ne(e, n);
    }
  }
  function ne(e, n) {
    (n == null || n > e.length) && (n = e.length);
    for (var t = 0, r = new Array(n); t < n; t++) r[t] = e[t];
    return r;
  }
  function Je() {
    throw new TypeError(
      `Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`,
    );
  }
  var We = Object.prototype.toString, V = new a();
  V.useLongestToken = !0,
    V.tokenize = M.tokenize,
    V.castInput = function (e) {
      var n = this.options,
        t = n.undefinedReplacement,
        r = n.stringifyReplacer,
        s = r === void 0
          ? function (o, u) {
            return typeof u == "undefined" ? t : u;
          }
          : r;
      return typeof e == "string"
        ? e
        : JSON.stringify(_(e, null, null, s), s, "  ");
    },
    V.equals = function (e, n) {
      return a.prototype.equals.call(
        V,
        e.replace(/,([\r\n])/g, "$1"),
        n.replace(/,([\r\n])/g, "$1"),
      );
    };
  function ze(e, n, t) {
    return V.diff(e, n, t);
  }
  function _(e, n, t, r, s) {
    n = n || [], t = t || [], r && (e = r(s, e));
    var o;
    for (o = 0; o < n.length; o += 1) if (n[o] === e) return t[o];
    var u;
    if (We.call(e) === "[object Array]") {
      for (
        (n.push(e), u = new Array(e.length), t.push(u), o = 0);
        o < e.length;
        o += 1
      ) {
        u[o] = _(e[o], n, t, r, s);
      }
      return (n.pop(), t.pop(), u);
    }
    if ((e && e.toJSON && (e = e.toJSON()), Z(e) === "object" && e !== null)) {
      n.push(e), u = {}, t.push(u);
      var l = [], c;
      for (c in e) e.hasOwnProperty(c) && l.push(c);
      for ((l.sort(), o = 0); o < l.length; o += 1) {c = l[o],
          u[c] = _(e[c], n, t, r, c);}
      n.pop(), t.pop();
    } else u = e;
    return u;
  }
  var G = new a();
  G.tokenize = function (e) {
    return e.slice();
  },
    G.join = G.removeEmpty = function (e) {
      return e;
    };
  function Ve(e, n, t) {
    return G.diff(e, n, t);
  }
  function X(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      t = e.split(/\r\n|[\n\v\f\r\x85]/),
      r = e.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      s = [],
      o = 0;
    function u() {
      var d = {};
      for (s.push(d); o < t.length;) {
        var m = t[o];
        if (/^(\-\-\-|\+\+\+|@@)\s/.test(m)) break;
        var x = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(m);
        x && (d.index = x[1]), o++;
      }
      for ((l(d), l(d), d.hunks = []); o < t.length;) {
        var h = t[o];
        if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(h)) break;
        if (/^@@/.test(h)) d.hunks.push(c());
        else {
          if (h && n.strict) {
            throw new Error(
              "Unknown line " + (o + 1) + " " + JSON.stringify(h),
            );
          }
          o++;
        }
      }
    }
    function l(d) {
      var m = /^(---|\+\+\+)\s+(.*)$/.exec(t[o]);
      if (m) {
        var x = m[1] === "---" ? "old" : "new",
          h = m[2].split("	", 2),
          b = h[0].replace(/\\\\/g, "\\");
        /^".*"$/.test(b) && (b = b.substr(1, b.length - 2)),
          d[x + "FileName"] = b,
          d[x + "Header"] = (h[1] || "").trim(),
          o++;
      }
    }
    function c() {
      var d = o,
        m = t[o++],
        x = m.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),
        h = {
          oldStart: +x[1],
          oldLines: typeof x[2] == "undefined" ? 1 : +x[2],
          newStart: +x[3],
          newLines: typeof x[4] == "undefined" ? 1 : +x[4],
          lines: [],
          linedelimiters: [],
        };
      h.oldLines === 0 && (h.oldStart += 1),
        h.newLines === 0 && (h.newStart += 1);
      for (
        var b = 0, y = 0;
        o < t.length &&
        !(t[o].indexOf("--- ") === 0 && o + 2 < t.length &&
          t[o + 1].indexOf("+++ ") === 0 && t[o + 2].indexOf("@@") === 0);
        o++
      ) {
        var S = t[o].length == 0 && o != t.length - 1 ? " " : t[o][0];
        if (
          S === "+" || S === "-" || S === " " || S === "\\"
        ) {
          h.lines.push(t[o]),
            h.linedelimiters.push(r[o] || `\n`),
            S === "+" ? b++ : S === "-" ? y++ : S === " " && (b++, y++);
        } else break;
      }
      if (
        (!b && h.newLines === 1 && (h.newLines = 0),
          !y && h.oldLines === 1 && (h.oldLines = 0),
          n.strict)
      ) {
        if (b !== h.newLines) {
          throw new Error(
            "Added line count did not match for hunk at line " + (d + 1),
          );
        }
        if (y !== h.oldLines) {
          throw new Error(
            "Removed line count did not match for hunk at line " + (d + 1),
          );
        }
      }
      return h;
    }
    for (; o < t.length;) u();
    return s;
  }
  function Ue(e, n, t) {
    var r = !0, s = !1, o = !1, u = 1;
    return function l() {
      if (r && !o) {
        if ((s ? u++ : r = !1, e + u <= t)) return u;
        o = !0;
      }
      if (!s) return (o || (r = !0), n <= e - u ? -u++ : (s = !0, l()));
    };
  }
  function we(e, n) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if ((typeof n == "string" && (n = X(n)), Array.isArray(n))) {
      if (n.length > 1) {
        throw new Error("applyPatch only works with a single input.");
      }
      n = n[0];
    }
    var r = e.split(/\r\n|[\n\v\f\r\x85]/),
      s = e.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      o = n.hunks,
      u = t.compareLine || function (ae, K, ee, W) {
        return K === W;
      },
      l = 0,
      c = t.fuzzFactor || 0,
      d = 0,
      m = 0,
      x,
      h;
    function b(ae, K) {
      for (var ee = 0; ee < ae.lines.length; ee++) {
        var W = ae.lines[ee],
          ue = W.length > 0 ? W[0] : " ",
          rn = W.length > 0 ? W.substr(1) : W;
        if (ue === " " || ue === "-") {
          if (!u(K + 1, r[K], ue, rn) && (l++, l > c)) return !1;
          K++;
        }
      }
      return !0;
    }
    for (var y = 0; y < o.length; y++) {
      for (
        var S = o[y],
          E = r.length - S.oldLines,
          k = 0,
          N = m + S.oldStart - 1,
          D = Ue(N, d, E);
        k !== void 0;
        k = D()
      ) {
        if (b(S, N + k)) {
          S.offset = m += k;
          break;
        }
      }
      if (k === void 0) return !1;
      d = S.offset + S.oldStart + S.oldLines;
    }
    for (var O = 0, U = 0; U < o.length; U++) {
      var H = o[U], I = H.oldStart + H.offset + O - 1;
      O += H.newLines - H.oldLines;
      for (var P = 0; P < H.lines.length; P++) {
        var A = H.lines[P],
          J = A.length > 0 ? A[0] : " ",
          se = A.length > 0 ? A.substr(1) : A,
          Q = H.linedelimiters[P];
        if (J === " ") I++;
        else if (J === "-") r.splice(I, 1), s.splice(I, 1);
        else if (J === "+") r.splice(I, 0, se), s.splice(I, 0, Q), I++;
        else if (J === "\\") {
          var Y = H.lines[P - 1] ? H.lines[P - 1][0] : null;
          Y === "+" ? x = !0 : Y === "-" && (h = !0);
        }
      }
    }
    if (x) for (; !r[r.length - 1];) r.pop(), s.pop();
    else h && (r.push(""), s.push(`\n`));
    for (var R = 0; R < r.length - 1; R++) r[R] = r[R] + s[R];
    return r.join("");
  }
  function Re(e, n) {
    typeof e == "string" && (e = X(e));
    var t = 0;
    function r() {
      var s = e[t++];
      if (!s) return n.complete();
      n.loadFile(s, function (o, u) {
        if (o) return n.complete(o);
        var l = we(u, s, n);
        n.patched(s, l, function (c) {
          if (c) return n.complete(c);
          r();
        });
      });
    }
    r();
  }
  function te(e, n, t, r, s, o, u) {
    u || (u = {}), typeof u.context == "undefined" && (u.context = 4);
    var l = ge(t, r, u);
    l.push({
      value: "",
      lines: [],
    });
    function c(k) {
      return k.map(function (N) {
        return " " + N;
      });
    }
    for (
      var d = [],
        m = 0,
        x = 0,
        h = [],
        b = 1,
        y = 1,
        S = function (k) {
          var N = l[k], D = N.lines || N.value.replace(/\n$/, "").split(`\n`);
          if ((N.lines = D, N.added || N.removed)) {
            var O;
            if (!m) {
              var U = l[k - 1];
              m = b,
                x = y,
                U &&
                (h = u.context > 0 ? c(U.lines.slice(-u.context)) : [],
                  m -= h.length,
                  x -= h.length);
            }
            (O = h).push.apply(
              O,
              C(D.map(function (Y) {
                return (N.added ? "+" : "-") + Y;
              })),
            ), N.added ? y += D.length : b += D.length;
          } else {
            if (m) {
              if (D.length <= u.context * 2 && k < l.length - 2) {
                var H;
                (H = h).push.apply(H, C(c(D)));
              } else {
                var I, P = Math.min(D.length, u.context);
                (I = h).push.apply(I, C(c(D.slice(0, P))));
                var A = {
                  oldStart: m,
                  oldLines: b - m + P,
                  newStart: x,
                  newLines: y - x + P,
                  lines: h,
                };
                if (k >= l.length - 2 && D.length <= u.context) {
                  var J = /\n$/.test(t),
                    se = /\n$/.test(r),
                    Q = D.length == 0 && h.length > A.oldLines;
                  !J && Q && t.length > 0 &&
                  h.splice(A.oldLines, 0, "\\ No newline at end of file"),
                    (!J && !Q || !se) && h.push("\\ No newline at end of file");
                }
                d.push(A), m = 0, x = 0, h = [];
              }
            }
            b += D.length, y += D.length;
          }
        },
        E = 0;
      E < l.length;
      E++
    ) {
      S(E);
    }
    return {
      oldFileName: e,
      newFileName: n,
      oldHeader: s,
      newHeader: o,
      hunks: d,
    };
  }
  function Ke(e) {
    var n = [];
    e.oldFileName == e.newFileName && n.push("Index: " + e.oldFileName),
      n.push(
        "===================================================================",
      ),
      n.push(
        "--- " + e.oldFileName + (typeof e.oldHeader == "undefined"
          ? ""
          : "	" + e.oldHeader),
      ),
      n.push(
        "+++ " + e.newFileName + (typeof e.newHeader == "undefined"
          ? ""
          : "	" + e.newHeader),
      );
    for (var t = 0; t < e.hunks.length; t++) {
      var r = e.hunks[t];
      r.oldLines === 0 && (r.oldStart -= 1),
        r.newLines === 0 && (r.newStart -= 1),
        n.push(
          "@@ -" + r.oldStart + "," + r.oldLines + " +" + r.newStart + "," +
            r.newLines + " @@",
        ),
        n.push.apply(n, r.lines);
    }
    return n.join(`\n`) + `\n`;
  }
  function ye(e, n, t, r, s, o, u) {
    return Ke(te(e, n, t, r, s, o, u));
  }
  function Ze(e, n, t, r, s, o) {
    return ye(e, e, n, t, r, s, o);
  }
  function _e(e, n) {
    return e.length !== n.length ? !1 : re(e, n);
  }
  function re(e, n) {
    if (n.length > e.length) return !1;
    for (var t = 0; t < n.length; t++) if (n[t] !== e[t]) return !1;
    return !0;
  }
  function Ge(e) {
    var n = oe(e.lines), t = n.oldLines, r = n.newLines;
    t !== void 0 ? e.oldLines = t : delete e.oldLines,
      r !== void 0 ? e.newLines = r : delete e.newLines;
  }
  function Xe(e, n, t) {
    e = Se(e, t), n = Se(n, t);
    var r = {};
    (e.index || n.index) && (r.index = e.index || n.index),
      (e.newFileName || n.newFileName) &&
      (xe(e)
        ? xe(n)
          ? (r.oldFileName = q(r, e.oldFileName, n.oldFileName),
            r.newFileName = q(r, e.newFileName, n.newFileName),
            r.oldHeader = q(r, e.oldHeader, n.oldHeader),
            r.newHeader = q(r, e.newHeader, n.newHeader))
          : (r.oldFileName = e.oldFileName,
            r.newFileName = e.newFileName,
            r.oldHeader = e.oldHeader,
            r.newHeader = e.newHeader)
        : (r.oldFileName = n.oldFileName || e.oldFileName,
          r.newFileName = n.newFileName || e.newFileName,
          r.oldHeader = n.oldHeader || e.oldHeader,
          r.newHeader = n.newHeader || e.newHeader)),
      r.hunks = [];
    for (
      var s = 0, o = 0, u = 0, l = 0; s < e.hunks.length || o < n.hunks.length;
    ) {
      var c = e.hunks[s] || {
          oldStart: Infinity,
        },
        d = n.hunks[o] || {
          oldStart: Infinity,
        };
      if (be(c, d)) r.hunks.push(Le(c, u)), s++, l += c.newLines - c.oldLines;
      else if (be(d, c)) {
        r.hunks.push(Le(d, l)), o++, u += d.newLines - d.oldLines;
      } else {
        var m = {
          oldStart: Math.min(c.oldStart, d.oldStart),
          oldLines: 0,
          newStart: Math.min(c.newStart + u, d.oldStart + l),
          newLines: 0,
          lines: [],
        };
        qe(m, c.oldStart, c.lines, d.oldStart, d.lines),
          o++,
          s++,
          r.hunks.push(m);
      }
    }
    return r;
  }
  function Se(e, n) {
    if (typeof e == "string") {
      if (/^@@/m.test(e) || /^Index:/m.test(e)) return X(e)[0];
      if (!n) {
        throw new Error("Must provide a base reference or pass in a patch");
      }
      return te(void 0, void 0, n, e);
    }
    return e;
  }
  function xe(e) {
    return e.newFileName && e.newFileName !== e.oldFileName;
  }
  function q(e, n, t) {
    return n === t ? n : (e.conflict = !0, {
      mine: n,
      theirs: t,
    });
  }
  function be(e, n) {
    return e.oldStart < n.oldStart && e.oldStart + e.oldLines < n.oldStart;
  }
  function Le(e, n) {
    return {
      oldStart: e.oldStart,
      oldLines: e.oldLines,
      newStart: e.newStart + n,
      newLines: e.newLines,
      lines: e.lines,
    };
  }
  function qe(e, n, t, r, s) {
    var o = {
        offset: n,
        lines: t,
        index: 0,
      },
      u = {
        offset: r,
        lines: s,
        index: 0,
      };
    for (
      (Ne(e, o, u), Ne(e, u, o));
      o.index < o.lines.length && u.index < u.lines.length;
    ) {
      var l = o.lines[o.index], c = u.lines[u.index];
      if ((l[0] === "-" || l[0] === "+") && (c[0] === "-" || c[0] === "+")) {
        Qe(e, o, u);
      } else if (l[0] === "+" && c[0] === " ") {
        var d;
        (d = e.lines).push.apply(d, C($(o)));
      } else if (c[0] === "+" && l[0] === " ") {
        var m;
        (m = e.lines).push.apply(m, C($(u)));
      } else {
        l[0] === "-" && c[0] === " "
          ? ke(e, o, u)
          : c[0] === "-" && l[0] === " "
          ? ke(e, u, o, !0)
          : l === c
          ? (e.lines.push(l), o.index++, u.index++)
          : ie(e, $(o), $(u));
      }
    }
    De(e, o), De(e, u), Ge(e);
  }
  function Qe(e, n, t) {
    var r = $(n), s = $(t);
    if (je(r) && je(s)) {
      if (re(r, s) && Fe(t, r, r.length - s.length)) {
        var o;
        (o = e.lines).push.apply(o, C(r));
        return;
      } else if (re(s, r) && Fe(n, s, s.length - r.length)) {
        var u;
        (u = e.lines).push.apply(u, C(s));
        return;
      }
    } else if (_e(r, s)) {
      var l;
      (l = e.lines).push.apply(l, C(r));
      return;
    }
    ie(e, r, s);
  }
  function ke(e, n, t, r) {
    var s = $(n), o = Ye(t, s);
    if (o.merged) {
      var u;
      (u = e.lines).push.apply(u, C(o.merged));
    } else ie(e, r ? o : s, r ? s : o);
  }
  function ie(e, n, t) {
    e.conflict = !0,
      e.lines.push({
        conflict: !0,
        mine: n,
        theirs: t,
      });
  }
  function Ne(e, n, t) {
    for (; n.offset < t.offset && n.index < n.lines.length;) {
      var r = n.lines[n.index++];
      e.lines.push(r), n.offset++;
    }
  }
  function De(e, n) {
    for (; n.index < n.lines.length;) {
      var t = n.lines[n.index++];
      e.lines.push(t);
    }
  }
  function $(e) {
    for (var n = [], t = e.lines[e.index][0]; e.index < e.lines.length;) {
      var r = e.lines[e.index];
      if ((t === "-" && r[0] === "+" && (t = "+"), t === r[0])) {
        n.push(r), e.index++;
      } else break;
    }
    return n;
  }
  function Ye(e, n) {
    for (
      var t = [], r = [], s = 0, o = !1, u = !1;
      s < n.length && e.index < e.lines.length;
    ) {
      var l = e.lines[e.index], c = n[s];
      if (c[0] === "+") break;
      if ((o = o || l[0] !== " ", r.push(c), s++, l[0] === "+")) {
        for (u = !0; l[0] === "+";) {
          t.push(l), l = e.lines[++e.index];
        }
      }
      c.substr(1) === l.substr(1) ? (t.push(l), e.index++) : u = !0;
    }
    if (((n[s] || "")[0] === "+" && o && (u = !0), u)) return t;
    for (; s < n.length;) r.push(n[s++]);
    return {
      merged: r,
      changes: t,
    };
  }
  function je(e) {
    return e.reduce(function (n, t) {
      return n && t[0] === "-";
    }, !0);
  }
  function Fe(e, n, t) {
    for (var r = 0; r < t; r++) {
      var s = n[n.length - t + r].substr(1);
      if (e.lines[e.index + r] !== " " + s) return !1;
    }
    return (e.index += t, !0);
  }
  function oe(e) {
    var n = 0, t = 0;
    return (e.forEach(function (r) {
      if (typeof r != "string") {
        var s = oe(r.mine), o = oe(r.theirs);
        n !== void 0 &&
        (s.oldLines === o.oldLines ? n += s.oldLines : n = void 0),
          t !== void 0 &&
          (s.newLines === o.newLines ? t += s.newLines : t = void 0);
      } else {
        t !== void 0 && (r[0] === "+" || r[0] === " ") && t++,
          n !== void 0 && (r[0] === "-" || r[0] === " ") && n++;
      }
    }),
      {
        oldLines: n,
        newLines: t,
      });
  }
  function en(e) {
    for (var n = [], t, r, s = 0; s < e.length; s++) {
      t = e[s],
        t.added ? r = 1 : t.removed ? r = -1 : r = 0,
        n.push([
          r,
          t.value,
        ]);
    }
    return n;
  }
  function nn(e) {
    for (var n = [], t = 0; t < e.length; t++) {
      var r = e[t];
      r.added ? n.push("<ins>") : r.removed && n.push("<del>"),
        n.push(tn(r.value)),
        r.added ? n.push("</ins>") : r.removed && n.push("</del>");
    }
    return n.join("");
  }
  function tn(e) {
    var n = e;
    return (n = n.replace(/&/g, "&amp;"),
      n = n.replace(/</g, "&lt;"),
      n = n.replace(/>/g, "&gt;"),
      n = n.replace(/"/g, "&quot;"),
      n);
  }
  i.Diff = a,
    i.applyPatch = we,
    i.applyPatches = Re,
    i.canonicalize = _,
    i.convertChangesToDMP = en,
    i.convertChangesToXML = nn,
    i.createPatch = Ze,
    i.createTwoFilesPatch = ye,
    i.diffArrays = Ve,
    i.diffChars = w,
    i.diffCss = Me,
    i.diffJson = ze,
    i.diffLines = ge,
    i.diffSentences = Be,
    i.diffTrimmedLines = Ae,
    i.diffWords = B,
    i.diffWordsWithSpace = z,
    i.merge = Xe,
    i.parsePatch = X,
    i.structuredPatch = te,
    Object.defineProperty(i, "__esModule", {
      value: !0,
    });
});
async function cn(i) {
  const a = await crypto.subtle.digest("SHA-256", i),
    f = Array.from(new Uint8Array(a)),
    g = f.map((p) => ("00" + p.toString(16)).slice(-2)).join("");
  return g;
}
const dn = (i) => {
    if (i.length < 10) return !1;
    const a = [
        ...i.slice(0, 8),
      ].filter((g) => g < "0" || g > "f").length === 0,
      f = i.slice(8);
    if (a && f[0] === "[" && f[f.length - 1] === "]") {
      try {
        return JSON.parse(f).length > 1;
      } catch {
        return !1;
      }
    }
    return !1;
  },
  hn = (i, a) => {
    const f = JSON.parse(a);
    let g = i.slice(), p = "";
    return f.forEach((w) => {
      if (Number(w) === w) {
        const v = Math.abs(w), L = g.slice(0, v);
        g = g.slice(v), w > 0 && (p += String(L));
      } else p += String(w);
    }),
      p;
  };
async function pn(i) {
  const a = new TextEncoder().encode(i), f = await cn(a);
  return f.substr(0, 8);
}
const gn = async (i, a) => {
  const f = pn(i), g = Diff.diffChars(i, a);
  return {
    b: await f,
    c: g.map((p) => p.added ? p.value : p.removed ? -p.count : p.count),
  };
};
async function vn(i) {
  const a = await crypto.subtle.digest("SHA-256", i),
    f = Array.from(new Uint8Array(a)),
    g = f.map((p) => ("00" + p.toString(16)).slice(-2)).join("");
  return g;
}
async function mn(i) {
  const a = new TextEncoder().encode(i), f = await vn(a);
  return f.substr(0, 8);
}
const wn = (i, a = !1) => {
  const f = {
    async get(g, p = "string") {
      let w;
      try {
        if (
          (a ? w = await (await i).get("codeStore", g) : w = await i.get(g), !w)
        ) {
          return null;
        }
      } catch (v) {
        return null;
      }
      if (p === "json") return JSON.parse(w);
      if (p === "string") {
        const v = await w;
        if (typeof v == "string" && p === "string") {
          const F = v;
          if (dn(v)) {
            const B = v.slice(0, 8), z = v.slice(8), M = await f.get(B);
            return hn(M, z);
          }
          return v;
        }
        const L = new TextDecoder(), j = L.decode(v);
        return j;
      }
      return w;
    },
    async put(g, p) {
      let w;
      try {
        const L = await f.get(g);
        if (
          typeof L == "string" && typeof p == "string" && L.length === 8 &&
          L !== p
        ) {
          const j = await f.get(p), F = await f.get(L);
          if (typeof F == "string") {
            const B = await mn(F);
            if (B === L) {
              const z = await gn(j, F), M = z.b + JSON.stringify(z.c);
              f.put(B, M);
            }
          }
        }
      } catch {
        w = "";
      }
      if (w !== "" && p === w) return p;
      let v;
      return (typeof p != "string" ? v = new TextDecoder().decode(p) : v = p,
        a ? (await i).put("codeStore", v, g) : await i.put(g, v));
    },
    async delete(g) {
      return (await i).delete("codeStore", g);
    },
    async clear() {
      return (await i).clear("codeStore");
    },
    async keys() {
      return (await i).getAllKeys("codeStore");
    },
  };
  return f;
};
function getDepts(code) {
  const debts = [
    "https://unpkg.com/react@17.0.1/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17.0.1/umd/react-dom-server.browser.production.min.js",
    "https://unpkg.com/@emotion/react@11.1.2/dist/emotion-react.umd.min.js",
    "https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js",
  ];
  if (code.indexOf("framer-motion") !== -1) {
    debts.push("https://unpkg.com/framer-motion@3.0.0/dist/framer-motion.js");
  }
  if (code.indexOf("qrious") !== -1) {
    debts.push("https://unpkg.com/@zedvision/qrious@8.5.7/dist/qrious.min.js");
  }
  return debts;
}
function p(l) {
  return new Promise(function (i, a) {
    var o;
    o = window.document.createElement("script"),
      o.src = l,
      o.onload = () => i(window),
      o.onerror = a,
      window.document.head.appendChild(o);
  });
}
(function (d, h) {
  typeof exports == "object" && typeof module != "undefined"
    ? h(exports)
    : typeof define == "function" && define.amd
    ? define([
      "exports",
    ], h)
    : (d = d || self, h(d.Diff = {}));
})(this, function (d) {
  "use strict";
  function h() {
  }
  h.prototype = {
    diff: function (n, t) {
      var r = arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : {},
        f = r.callback;
      typeof r == "function" && (f = r, r = {}), this.options = r;
      var i = this;
      function l(c) {
        return f
          ? (setTimeout(function () {
            f(void 0, c);
          }, 0),
            !0)
          : c;
      }
      n = this.castInput(n),
        t = this.castInput(t),
        n = this.removeEmpty(this.tokenize(n)),
        t = this.removeEmpty(this.tokenize(t));
      var s = t.length,
        o = n.length,
        u = 1,
        p1 = s + o,
        v = [
          {
            newPos: -1,
            components: [],
          },
        ],
        a = this.extractCommon(v[0], t, n, 0);
      if (v[0].newPos + 1 >= s && a + 1 >= o) {
        return l([
          {
            value: this.join(t),
            count: t.length,
          },
        ]);
      }
      function w() {
        for (var c = -1 * u; c <= u; c += 2) {
          var L = void 0,
            F = v[c - 1],
            m = v[c + 1],
            N = (m ? m.newPos : 0) - c;
          F && (v[c - 1] = void 0);
          var y = F && F.newPos + 1 < s, A = m && 0 <= N && N < o;
          if (!y && !A) {
            v[c] = void 0;
            continue;
          }
          if (
            !y || A && F.newPos < m.newPos
              ? (L = H(m), i.pushComponent(L.components, void 0, !0))
              : (L = F, L.newPos++, i.pushComponent(L.components, !0, void 0)),
              N = i.extractCommon(L, t, n, c),
              L.newPos + 1 >= s && N + 1 >= o
          ) {
            return l(x(i, L.components, t, n, i.useLongestToken));
          }
          v[c] = L;
        }
        u++;
      }
      if (f) {
        (function c() {
          setTimeout(function () {
            if (u > p1) return f();
            w() || c();
          }, 0);
        })();
      } else {
        for (; u <= p1;) {
          var g = w();
          if (g) return g;
        }
      }
    },
    pushComponent: function (n, t, r) {
      var f = n[n.length - 1];
      f && f.added === t && f.removed === r
        ? n[n.length - 1] = {
          count: f.count + 1,
          added: t,
          removed: r,
        }
        : n.push({
          count: 1,
          added: t,
          removed: r,
        });
    },
    extractCommon: function (n, t, r, f) {
      for (
        var i = t.length, l = r.length, s = n.newPos, o = s - f, u = 0;
        s + 1 < i && o + 1 < l && this.equals(t[s + 1], r[o + 1]);
      ) {
        s++, o++, u++;
      }
      return u && n.components.push({
        count: u,
      }),
        n.newPos = s,
        o;
    },
    equals: function (n, t) {
      return this.options.comparator
        ? this.options.comparator(n, t)
        : n === t ||
          this.options.ignoreCase && n.toLowerCase() === t.toLowerCase();
    },
    removeEmpty: function (n) {
      for (var t = [], r = 0; r < n.length; r++) n[r] && t.push(n[r]);
      return t;
    },
    castInput: function (n) {
      return n;
    },
    tokenize: function (n) {
      return n.split("");
    },
    join: function (n) {
      return n.join("");
    },
  };
  function x(e, n, t, r, f) {
    for (var i = 0, l = n.length, s = 0, o = 0; i < l; i++) {
      var u = n[i];
      if (u.removed) {
        if (
          (u.value = e.join(r.slice(o, o + u.count)),
            o += u.count,
            i && n[i - 1].added)
        ) {
          var v = n[i - 1];
          n[i - 1] = n[i], n[i] = v;
        }
      } else {
        if (!u.added && f) {
          var p1 = t.slice(s, s + u.count);
          p1 = p1.map(function (w, g) {
            var c = r[o + g];
            return c.length > w.length ? c : w;
          }), u.value = e.join(p1);
        } else u.value = e.join(t.slice(s, s + u.count));
        s += u.count, u.added || (o += u.count);
      }
    }
    var a = n[l - 1];
    return (l > 1 && typeof a.value == "string" && (a.added || a.removed) &&
      e.equals("", a.value) && (n[l - 2].value += a.value, n.pop()),
      n);
  }
  function H(e) {
    return {
      newPos: e.newPos,
      components: e.components.slice(0),
    };
  }
  var S = new h();
  function W(e, n, t) {
    return S.diff(e, n, t);
  }
  function $(e, n) {
    if (typeof e == "function") n.callback = e;
    else if (e) for (var t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
    return n;
  }
  var B = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,
    fe1 = /\S/,
    P = new h();
  P.equals = function (e, n) {
    return this.options.ignoreCase &&
      (e = e.toLowerCase(), n = n.toLowerCase()),
      e === n || this.options.ignoreWhitespace && !fe1.test(e) && !fe1.test(n);
  },
    P.tokenize = function (e) {
      for (
        var n = e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), t = 0;
        t < n.length - 1;
        t++
      ) {
        !n[t + 1] && n[t + 2] && B.test(n[t]) && B.test(n[t + 2]) &&
          (n[t] += n[t + 2], n.splice(t + 1, 2), t--);
      }
      return n;
    };
  function me(e, n, t) {
    return (t = $(t, {
      ignoreWhitespace: !0,
    }),
      P.diff(e, n, t));
  }
  function xe(e, n, t) {
    return P.diff(e, n, t);
  }
  var U = new h();
  U.tokenize = function (e) {
    var n = [], t = e.split(/(\n|\r\n)/);
    t[t.length - 1] || t.pop();
    for (var r = 0; r < t.length; r++) {
      var f = t[r];
      r % 2 && !this.options.newlineIsToken
        ? n[n.length - 1] += f
        : (this.options.ignoreWhitespace && (f = f.trim()), n.push(f));
    }
    return n;
  };
  function le1(e, n, t) {
    return U.diff(e, n, t);
  }
  function Fe(e, n, t) {
    var r = $(t, {
      ignoreWhitespace: !0,
    });
    return U.diff(e, n, r);
  }
  var se = new h();
  se.tokenize = function (e) {
    return e.split(/(\S.+?[.!?])(?=\s+|$)/);
  };
  function Ne(e, n, t) {
    return se.diff(e, n, t);
  }
  var oe = new h();
  oe.tokenize = function (e) {
    return e.split(/([{}:;,]|\s+)/);
  };
  function Se(e, n, t) {
    return oe.diff(e, n, t);
  }
  function V(e) {
    return (typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? V = function (n) {
        return typeof n;
      }
      : V = function (n) {
        return n && typeof Symbol == "function" && n.constructor === Symbol &&
            n !== Symbol.prototype
          ? "symbol"
          : typeof n;
      },
      V(e));
  }
  function b(e) {
    return He2(e) || Ie2(e) || be(e) || Ae();
  }
  function He2(e) {
    if (Array.isArray(e)) return j(e);
  }
  function Ie2(e) {
    if (typeof Symbol != "undefined" && Symbol.iterator in Object(e)) {
      return Array.from(e);
    }
  }
  function be(e, n) {
    if (!e) return;
    if (typeof e == "string") return j(e, n);
    var t = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (t === "Object" && e.constructor && (t = e.constructor.name),
        t === "Map" || t === "Set")
    ) {
      return Array.from(e);
    }
    if (
      t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
    ) {
      return j(e, n);
    }
  }
  function j(e, n) {
    (n == null || n > e.length) && (n = e.length);
    for (var t = 0, r = new Array(n); t < n; t++) r[t] = e[t];
    return r;
  }
  function Ae() {
    throw new TypeError(
      `Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`,
    );
  }
  var Ee1 = Object.prototype.toString, J = new h();
  J.useLongestToken = !0,
    J.tokenize = U.tokenize,
    J.castInput = function (e) {
      var n = this.options,
        t = n.undefinedReplacement,
        r = n.stringifyReplacer,
        f = r === void 0
          ? function (i, l) {
            return typeof l == "undefined" ? t : l;
          }
          : r;
      return typeof e == "string"
        ? e
        : JSON.stringify(X(e, null, null, f), f, "  ");
    },
    J.equals = function (e, n) {
      return h.prototype.equals.call(
        J,
        e.replace(/,([\r\n])/g, "$1"),
        n.replace(/,([\r\n])/g, "$1"),
      );
    };
  function Te(e, n, t) {
    return J.diff(e, n, t);
  }
  function X(e, n, t, r, f) {
    n = n || [], t = t || [], r && (e = r(f, e));
    var i;
    for (i = 0; i < n.length; i += 1) if (n[i] === e) return t[i];
    var l;
    if (Ee1.call(e) === "[object Array]") {
      for (
        (n.push(e), l = new Array(e.length), t.push(l), i = 0);
        i < e.length;
        i += 1
      ) {
        l[i] = X(e[i], n, t, r, f);
      }
      return (n.pop(), t.pop(), l);
    }
    if ((e && e.toJSON && (e = e.toJSON()), V(e) === "object" && e !== null)) {
      n.push(e), l = {}, t.push(l);
      var s = [], o;
      for (o in e) e.hasOwnProperty(o) && s.push(o);
      for ((s.sort(), i = 0); i < s.length; i += 1) {
        o = s[i], l[o] = X(e[o], n, t, r, o);
      }
      n.pop(), t.pop();
    } else l = e;
    return l;
  }
  var Z = new h();
  Z.tokenize = function (e) {
    return e.slice();
  },
    Z.join = Z.removeEmpty = function (e) {
      return e;
    };
  function Oe(e, n, t) {
    return Z.diff(e, n, t);
  }
  function G(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      t = e.split(/\r\n|[\n\v\f\r\x85]/),
      r = e.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      f = [],
      i = 0;
    function l() {
      var u = {};
      for (f.push(u); i < t.length;) {
        var p1 = t[i];
        if (/^(\-\-\-|\+\+\+|@@)\s/.test(p1)) break;
        var v = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(p1);
        v && (u.index = v[1]), i++;
      }
      for ((s(u), s(u), u.hunks = []); i < t.length;) {
        var a = t[i];
        if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(a)) break;
        if (/^@@/.test(a)) u.hunks.push(o());
        else {
          if (a && n.strict) {
            throw new Error(
              "Unknown line " + (i + 1) + " " + JSON.stringify(a),
            );
          }
          i++;
        }
      }
    }
    function s(u) {
      var p1 = /^(---|\+\+\+)\s+(.*)$/.exec(t[i]);
      if (p1) {
        var v = p1[1] === "---" ? "old" : "new",
          a = p1[2].split("	", 2),
          w = a[0].replace(/\\\\/g, "\\");
        /^".*"$/.test(w) && (w = w.substr(1, w.length - 2)),
          u[v + "FileName"] = w,
          u[v + "Header"] = (a[1] || "").trim(),
          i++;
      }
    }
    function o() {
      var u = i,
        p1 = t[i++],
        v = p1.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),
        a = {
          oldStart: +v[1],
          oldLines: typeof v[2] == "undefined" ? 1 : +v[2],
          newStart: +v[3],
          newLines: typeof v[4] == "undefined" ? 1 : +v[4],
          lines: [],
          linedelimiters: [],
        };
      a.oldLines === 0 && (a.oldStart += 1),
        a.newLines === 0 && (a.newStart += 1);
      for (
        var w = 0, g = 0;
        i < t.length &&
        !(t[i].indexOf("--- ") === 0 && i + 2 < t.length &&
          t[i + 1].indexOf("+++ ") === 0 && t[i + 2].indexOf("@@") === 0);
        i++
      ) {
        var c = t[i].length == 0 && i != t.length - 1 ? " " : t[i][0];
        if (c === "+" || c === "-" || c === " " || c === "\\") {
          a.lines.push(t[i]),
            a.linedelimiters.push(r[i] || `\n`),
            c === "+" ? w++ : c === "-"
              ? g++
              : c === " " && (w++, g++);
        } else break;
      }
      if (
        (!w && a.newLines === 1 && (a.newLines = 0),
          !g && a.oldLines === 1 && (a.oldLines = 0),
          n.strict)
      ) {
        if (w !== a.newLines) {
          throw new Error(
            "Added line count did not match for hunk at line " + (u + 1),
          );
        }
        if (g !== a.oldLines) {
          throw new Error(
            "Removed line count did not match for hunk at line " + (u + 1),
          );
        }
      }
      return a;
    }
    for (; i < t.length;) l();
    return f;
  }
  function ze(e, n, t) {
    var r = !0, f = !1, i = !1, l = 1;
    return function s() {
      if (r && !i) {
        if ((f ? l++ : r = !1, e + l <= t)) return l;
        i = !0;
      }
      if (!f) return (i || (r = !0), n <= e - l ? -l++ : (f = !0, s()));
    };
  }
  function ue(e, n) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if ((typeof n == "string" && (n = G(n)), Array.isArray(n))) {
      if (n.length > 1) {
        throw new Error("applyPatch only works with a single input.");
      }
      n = n[0];
    }
    var r = e.split(/\r\n|[\n\v\f\r\x85]/),
      f = e.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      i = n.hunks,
      l = t.compareLine || function (re, D, K, C) {
        return D === C;
      },
      s = 0,
      o = t.fuzzFactor || 0,
      u = 0,
      p1 = 0,
      v,
      a;
    function w(re, D) {
      for (var K = 0; K < re.lines.length; K++) {
        var C = re.lines[K],
          ie = C.length > 0 ? C[0] : " ",
          Xe = C.length > 0 ? C.substr(1) : C;
        if (ie === " " || ie === "-") {
          if (!l(D + 1, r[D], ie, Xe) && (s++, s > o)) return !1;
          D++;
        }
      }
      return !0;
    }
    for (var g = 0; g < i.length; g++) {
      for (
        var c = i[g],
          L = r.length - c.oldLines,
          F = 0,
          m = p1 + c.oldStart - 1,
          N = ze(m, u, L);
        F !== void 0;
        F = N()
      ) {
        if (w(c, m + F)) {
          c.offset = p1 += F;
          break;
        }
      }
      if (F === void 0) return !1;
      u = c.offset + c.oldStart + c.oldLines;
    }
    for (var y = 0, A = 0; A < i.length; A++) {
      var I = i[A], E = I.oldStart + I.offset + y - 1;
      y += I.newLines - I.oldLines;
      for (var T = 0; T < I.lines.length; T++) {
        var O = I.lines[T],
          z = O.length > 0 ? O[0] : " ",
          Y = O.length > 0 ? O.substr(1) : O,
          te = I.linedelimiters[T];
        if (z === " ") E++;
        else if (z === "-") r.splice(E, 1), f.splice(E, 1);
        else if (z === "+") r.splice(E, 0, Y), f.splice(E, 0, te), E++;
        else if (z === "\\") {
          var R = I.lines[T - 1] ? I.lines[T - 1][0] : null;
          R === "+" ? v = !0 : R === "-" && (a = !0);
        }
      }
    }
    if (v) for (; !r[r.length - 1];) r.pop(), f.pop();
    else {
      a && (r.push(""), f.push(`\n`));
    }
    for (var q = 0; q < r.length - 1; q++) r[q] = r[q] + f[q];
    return r.join("");
  }
  function We(e, n) {
    typeof e == "string" && (e = G(e));
    var t = 0;
    function r() {
      var f = e[t++];
      if (!f) return n.complete();
      n.loadFile(f, function (i, l) {
        if (i) return n.complete(i);
        var s = ue(l, f, n);
        n.patched(f, s, function (o) {
          if (o) return n.complete(o);
          r();
        });
      });
    }
    r();
  }
  function _(e, n, t, r, f, i, l) {
    l || (l = {}), typeof l.context == "undefined" && (l.context = 4);
    var s = le1(t, r, l);
    s.push({
      value: "",
      lines: [],
    });
    function o(F) {
      return F.map(function (m) {
        return " " + m;
      });
    }
    for (
      var u = [],
        p1 = 0,
        v = 0,
        a = [],
        w = 1,
        g = 1,
        c = function (m) {
          var N = s[m], y = N.lines || N.value.replace(/\n$/, "").split(`\n`);
          if ((N.lines = y, N.added || N.removed)) {
            var A;
            if (!p1) {
              var I = s[m - 1];
              p1 = w,
                v = g,
                I &&
                (a = l.context > 0 ? o(I.lines.slice(-l.context)) : [],
                  p1 -= a.length,
                  v -= a.length);
            }
            (A = a).push.apply(
              A,
              b(y.map(function (q) {
                return (N.added ? "+" : "-") + q;
              })),
            ), N.added ? g += y.length : w += y.length;
          } else {
            if (p1) {
              if (y.length <= l.context * 2 && m < s.length - 2) {
                var E;
                (E = a).push.apply(E, b(o(y)));
              } else {
                var T, O = Math.min(y.length, l.context);
                (T = a).push.apply(T, b(o(y.slice(0, O))));
                var z = {
                  oldStart: p1,
                  oldLines: w - p1 + O,
                  newStart: v,
                  newLines: g - v + O,
                  lines: a,
                };
                if (m >= s.length - 2 && y.length <= l.context) {
                  var Y = /\n$/.test(t),
                    te = /\n$/.test(r),
                    R = y.length == 0 && a.length > z.oldLines;
                  !Y && R && t.length > 0 &&
                  a.splice(z.oldLines, 0, "\\ No newline at end of file"),
                    (!Y && !R || !te) && a.push("\\ No newline at end of file");
                }
                u.push(z), p1 = 0, v = 0, a = [];
              }
            }
            w += y.length, g += y.length;
          }
        },
        L = 0;
      L < s.length;
      L++
    ) {
      c(L);
    }
    return {
      oldFileName: e,
      newFileName: n,
      oldHeader: f,
      newHeader: i,
      hunks: u,
    };
  }
  function Me(e) {
    var n = [];
    e.oldFileName == e.newFileName && n.push("Index: " + e.oldFileName),
      n.push(
        "===================================================================",
      ),
      n.push(
        "--- " + e.oldFileName + (typeof e.oldHeader == "undefined"
          ? ""
          : "	" + e.oldHeader),
      ),
      n.push(
        "+++ " + e.newFileName + (typeof e.newHeader == "undefined"
          ? ""
          : "	" + e.newHeader),
      );
    for (var t = 0; t < e.hunks.length; t++) {
      var r = e.hunks[t];
      r.oldLines === 0 && (r.oldStart -= 1),
        r.newLines === 0 && (r.newStart -= 1),
        n.push(
          "@@ -" + r.oldStart + "," + r.oldLines + " +" + r.newStart + "," +
            r.newLines + " @@",
        ),
        n.push.apply(n, r.lines);
    }
    return n.join(`\n`) + `\n`;
  }
  function ae(e, n, t, r, f, i, l) {
    return Me(_(e, n, t, r, f, i, l));
  }
  function qe(e, n, t, r, f, i) {
    return ae(e, e, n, t, r, f, i);
  }
  function Ce1(e, n) {
    return e.length !== n.length ? !1 : k(e, n);
  }
  function k(e, n) {
    if (n.length > e.length) return !1;
    for (var t = 0; t < n.length; t++) if (n[t] !== e[t]) return !1;
    return !0;
  }
  function Je(e) {
    var n = ne(e.lines), t = n.oldLines, r = n.newLines;
    t !== void 0 ? e.oldLines = t : delete e.oldLines,
      r !== void 0 ? e.newLines = r : delete e.newLines;
  }
  function $e(e, n, t) {
    e = de2(e, t), n = de2(n, t);
    var r = {};
    (e.index || n.index) && (r.index = e.index || n.index),
      (e.newFileName || n.newFileName) && (ce2(e)
        ? ce2(n)
          ? (r.oldFileName = Q(r, e.oldFileName, n.oldFileName),
            r.newFileName = Q(r, e.newFileName, n.newFileName),
            r.oldHeader = Q(r, e.oldHeader, n.oldHeader),
            r.newHeader = Q(r, e.newHeader, n.newHeader))
          : (r.oldFileName = e.oldFileName,
            r.newFileName = e.newFileName,
            r.oldHeader = e.oldHeader,
            r.newHeader = e.newHeader)
        : (r.oldFileName = n.oldFileName || e.oldFileName,
          r.newFileName = n.newFileName || e.newFileName,
          r.oldHeader = n.oldHeader || e.oldHeader,
          r.newHeader = n.newHeader || e.newHeader)),
      r.hunks = [];
    for (
      var f = 0, i = 0, l = 0, s = 0; f < e.hunks.length || i < n.hunks.length;
    ) {
      var o = e.hunks[f] || {
          oldStart: Infinity,
        },
        u = n.hunks[i] || {
          oldStart: Infinity,
        };
      if (pe(o, u)) r.hunks.push(ve(o, l)), f++, s += o.newLines - o.oldLines;
      else if (pe(u, o)) {
        r.hunks.push(ve(u, s)), i++, l += u.newLines - u.oldLines;
      } else {
        var p1 = {
          oldStart: Math.min(o.oldStart, u.oldStart),
          oldLines: 0,
          newStart: Math.min(o.newStart + l, u.oldStart + s),
          newLines: 0,
          lines: [],
        };
        Re(p1, o.oldStart, o.lines, u.oldStart, u.lines),
          i++,
          f++,
          r.hunks.push(p1);
      }
    }
    return r;
  }
  function de2(e, n) {
    if (typeof e == "string") {
      if (/^@@/m.test(e) || /^Index:/m.test(e)) return G(e)[0];
      if (!n) {
        throw new Error("Must provide a base reference or pass in a patch");
      }
      return _(void 0, void 0, n, e);
    }
    return e;
  }
  function ce2(e) {
    return e.newFileName && e.newFileName !== e.oldFileName;
  }
  function Q(e, n, t) {
    return n === t ? n : (e.conflict = !0, {
      mine: n,
      theirs: t,
    });
  }
  function pe(e, n) {
    return e.oldStart < n.oldStart && e.oldStart + e.oldLines < n.oldStart;
  }
  function ve(e, n) {
    return {
      oldStart: e.oldStart,
      oldLines: e.oldLines,
      newStart: e.newStart + n,
      newLines: e.newLines,
      lines: e.lines,
    };
  }
  function Re(e, n, t, r, f) {
    var i = {
        offset: n,
        lines: t,
        index: 0,
      },
      l = {
        offset: r,
        lines: f,
        index: 0,
      };
    for (
      (we(e, i, l), we(e, l, i));
      i.index < i.lines.length && l.index < l.lines.length;
    ) {
      var s = i.lines[i.index], o = l.lines[l.index];
      if ((s[0] === "-" || s[0] === "+") && (o[0] === "-" || o[0] === "+")) {
        De(e, i, l);
      } else if (s[0] === "+" && o[0] === " ") {
        var u;
        (u = e.lines).push.apply(u, b(M(i)));
      } else if (o[0] === "+" && s[0] === " ") {
        var p1;
        (p1 = e.lines).push.apply(p1, b(M(l)));
      } else {
        s[0] === "-" && o[0] === " " ? he2(e, i, l)
        : o[0] === "-" && s[0] === " "
          ? he2(e, l, i, !0)
          : s === o
          ? (e.lines.push(s), i.index++, l.index++)
          : ee(e, M(i), M(l));
      }
    }
    ge(e, i), ge(e, l), Je(e);
  }
  function De(e, n, t) {
    var r = M(n), f = M(t);
    if (ye(r) && ye(f)) {
      if (k(r, f) && Le(t, r, r.length - f.length)) {
        var i;
        (i = e.lines).push.apply(i, b(r));
        return;
      } else if (k(f, r) && Le(n, f, f.length - r.length)) {
        var l;
        (l = e.lines).push.apply(l, b(f));
        return;
      }
    } else if (Ce1(r, f)) {
      var s;
      (s = e.lines).push.apply(s, b(r));
      return;
    }
    ee(e, r, f);
  }
  function he2(e, n, t, r) {
    var f = M(n), i = Be(t, f);
    if (i.merged) {
      var l;
      (l = e.lines).push.apply(l, b(i.merged));
    } else ee(e, r ? i : f, r ? f : i);
  }
  function ee(e, n, t) {
    e.conflict = !0,
      e.lines.push({
        conflict: !0,
        mine: n,
        theirs: t,
      });
  }
  function we(e, n, t) {
    for (; n.offset < t.offset && n.index < n.lines.length;) {
      var r = n.lines[n.index++];
      e.lines.push(r), n.offset++;
    }
  }
  function ge(e, n) {
    for (; n.index < n.lines.length;) {
      var t = n.lines[n.index++];
      e.lines.push(t);
    }
  }
  function M(e) {
    for (var n = [], t = e.lines[e.index][0]; e.index < e.lines.length;) {
      var r = e.lines[e.index];
      if ((t === "-" && r[0] === "+" && (t = "+"), t === r[0])) {
        n.push(r), e.index++;
      } else break;
    }
    return n;
  }
  function Be(e, n) {
    for (
      var t = [], r = [], f = 0, i = !1, l = !1;
      f < n.length && e.index < e.lines.length;
    ) {
      var s = e.lines[e.index], o = n[f];
      if (o[0] === "+") break;
      if ((i = i || s[0] !== " ", r.push(o), f++, s[0] === "+")) {
        for (l = !0; s[0] === "+";) {
          t.push(s), s = e.lines[++e.index];
        }
      }
      o.substr(1) === s.substr(1) ? (t.push(s), e.index++) : l = !0;
    }
    if (((n[f] || "")[0] === "+" && i && (l = !0), l)) return t;
    for (; f < n.length;) r.push(n[f++]);
    return {
      merged: r,
      changes: t,
    };
  }
  function ye(e) {
    return e.reduce(function (n, t) {
      return n && t[0] === "-";
    }, !0);
  }
  function Le(e, n, t) {
    for (var r = 0; r < t; r++) {
      var f = n[n.length - t + r].substr(1);
      if (e.lines[e.index + r] !== " " + f) return !1;
    }
    return (e.index += t, !0);
  }
  function ne(e) {
    var n = 0, t = 0;
    return (e.forEach(function (r) {
      if (typeof r != "string") {
        var f = ne(r.mine), i = ne(r.theirs);
        n !== void 0 &&
        (f.oldLines === i.oldLines ? n += f.oldLines : n = void 0),
          t !== void 0 &&
          (f.newLines === i.newLines ? t += f.newLines : t = void 0);
      } else {
        t !== void 0 && (r[0] === "+" || r[0] === " ") && t++,
          n !== void 0 && (r[0] === "-" || r[0] === " ") && n++;
      }
    }),
      {
        oldLines: n,
        newLines: t,
      });
  }
  function Pe1(e) {
    for (var n = [], t, r, f = 0; f < e.length; f++) {
      t = e[f],
        t.added ? r = 1 : t.removed ? r = -1 : r = 0,
        n.push([
          r,
          t.value,
        ]);
    }
    return n;
  }
  function Ue(e) {
    for (var n = [], t = 0; t < e.length; t++) {
      var r = e[t];
      r.added ? n.push("<ins>") : r.removed && n.push("<del>"),
        n.push(Ve(r.value)),
        r.added ? n.push("</ins>") : r.removed && n.push("</del>");
    }
    return n.join("");
  }
  function Ve(e) {
    var n = e;
    return (n = n.replace(/&/g, "&amp;"),
      n = n.replace(/</g, "&lt;"),
      n = n.replace(/>/g, "&gt;"),
      n = n.replace(/"/g, "&quot;"),
      n);
  }
  d.Diff = h,
    d.applyPatch = ue,
    d.applyPatches = We,
    d.canonicalize = X,
    d.convertChangesToDMP = Pe1,
    d.convertChangesToXML = Ue,
    d.createPatch = qe,
    d.createTwoFilesPatch = ae,
    d.diffArrays = Oe,
    d.diffChars = W,
    d.diffCss = Se,
    d.diffJson = Te,
    d.diffLines = le1,
    d.diffSentences = Ne,
    d.diffTrimmedLines = Fe,
    d.diffWords = me,
    d.diffWordsWithSpace = xe,
    d.merge = $e,
    d.parsePatch = G,
    d.structuredPatch = _,
    Object.defineProperty(d, "__esModule", {
      value: !0,
    });
});
async function Ze(d) {
  const h = await crypto.subtle.digest("SHA-256", d),
    x = Array.from(new Uint8Array(h)),
    H = x.map((S) => ("00" + S.toString(16)).slice(-2)).join("");
  return H;
}
async function Ge(d) {
  const h = new TextEncoder().encode(d), x = await Ze(h);
  return x.substr(0, 8);
}
async function arrBuffSha256(msgBuffer) {
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join(
    "",
  );
  return hashHex;
}
function requestResponseMessage(ep, msg, transfers) {
  return new Promise((resolve) => {
    const id = generateUUID();
    ep.addEventListener("message", function l(ev) {
      if (!ev.data || !ev.data.id || ev.data.id !== id) {
        return;
      }
      ep.removeEventListener("message", l);
      resolve(ev.data);
    });
    if (ep.start) {
      ep.start();
    }
    ep.postMessage(
      Object.assign({
        id,
      }, msg),
      transfers,
    );
  });
}
function saveHtml(html) {
  return save(html, "text/html");
}
function saveJs(js) {
  return save(js, "application/javascript");
}
const proxyTransferHandler = {
  canHandle: (val) => isObject(val) && val[proxyMarker],
  serialize(obj) {
    const { port1, port2 } = new MessageChannel();
    expose(obj, port1);
    return [
      port2,
      [
        port2,
      ],
    ];
  },
  deserialize(port) {
    port.start();
    return wrap(port);
  },
};
const transferHandlers = new Map([
  [
    "proxy",
    proxyTransferHandler,
  ],
  [
    "throw",
    throwTransferHandler,
  ],
]);
function expose(obj, ep = self) {
  ep.addEventListener("message", function callback(ev) {
    if (!ev || !ev.data) {
      return;
    }
    const { id, type, path } = Object.assign({
      path: [],
    }, ev.data);
    const argumentList = (ev.data.argumentList || []).map(fromWireValue);
    let returnValue;
    try {
      const parent = path.slice(0, -1).reduce((obj1, prop) => obj1[prop], obj);
      const rawValue = path.reduce((obj1, prop) => obj1[prop], obj);
      switch (type) {
        case 0:
          {
            returnValue = rawValue;
          }
          break;
        case 1:
          {
            parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
            returnValue = true;
          }
          break;
        case 2:
          {
            returnValue = rawValue.apply(parent, argumentList);
          }
          break;
        case 3:
          {
            const value = new rawValue(...argumentList);
            returnValue = proxy(value);
          }
          break;
        case 4:
          {
            const { port1, port2 } = new MessageChannel();
            expose(obj, port2);
            returnValue = transfer(port1, [
              port1,
            ]);
          }
          break;
        case 5:
          {
            returnValue = undefined;
          }
          break;
      }
    } catch (value) {
      returnValue = {
        value,
        [throwMarker]: 0,
      };
    }
    Promise.resolve(returnValue).catch((value) => {
      return {
        value,
        [throwMarker]: 0,
      };
    }).then((returnValue1) => {
      const [wireValue, transferables] = toWireValue(returnValue1);
      ep.postMessage(
        Object.assign(Object.assign({}, wireValue), {
          id,
        }),
        transferables,
      );
      if (type === 5) {
        ep.removeEventListener("message", callback);
        closeEndPoint(ep);
      }
    });
  });
  if (ep.start) {
    ep.start();
  }
}
function wrap(ep, target) {
  return createProxy(ep, [], target);
}
function createProxy(ep, path = [], target = function () {
}) {
  let isProxyReleased = false;
  const proxy1 = new Proxy(target, {
    get(_target, prop) {
      throwIfProxyReleased(isProxyReleased);
      if (prop === releaseProxy) {
        return () => {
          return requestResponseMessage(ep, {
            type: 5,
            path: path.map((p1) => p1.toString()),
          }).then(() => {
            closeEndPoint(ep);
            isProxyReleased = true;
          });
        };
      }
      if (prop === "then") {
        if (path.length === 0) {
          return {
            then: () => proxy1,
          };
        }
        const r = requestResponseMessage(ep, {
          type: 0,
          path: path.map((p1) => p1.toString()),
        }).then(fromWireValue);
        return r.then.bind(r);
      }
      return createProxy(ep, [
        ...path,
        prop,
      ]);
    },
    set(_target, prop, rawValue) {
      throwIfProxyReleased(isProxyReleased);
      const [value, transferables] = toWireValue(rawValue);
      return requestResponseMessage(ep, {
        type: 1,
        path: [
          ...path,
          prop,
        ].map((p1) => p1.toString()),
        value,
      }, transferables).then(fromWireValue);
    },
    apply(_target, _thisArg, rawArgumentList) {
      throwIfProxyReleased(isProxyReleased);
      const last = path[path.length - 1];
      if (last === createEndpoint) {
        return requestResponseMessage(ep, {
          type: 4,
        }).then(fromWireValue);
      }
      if (last === "bind") {
        return createProxy(ep, path.slice(0, -1));
      }
      const [argumentList, transferables] = processArguments(rawArgumentList);
      return requestResponseMessage(ep, {
        type: 2,
        path: path.map((p1) => p1.toString()),
        argumentList,
      }, transferables).then(fromWireValue);
    },
    construct(_target, rawArgumentList) {
      throwIfProxyReleased(isProxyReleased);
      const [argumentList, transferables] = processArguments(rawArgumentList);
      return requestResponseMessage(ep, {
        type: 3,
        path: path.map((p1) => p1.toString()),
        argumentList,
      }, transferables).then(fromWireValue);
    },
  });
  return proxy1;
}
function processArguments(argumentList) {
  const processed = argumentList.map(toWireValue);
  return [
    processed.map((v) => v[0]),
    myFlat(processed.map((v) => v[1])),
  ];
}
function toWireValue(value) {
  for (const [name, handler] of transferHandlers) {
    if (handler.canHandle(value)) {
      const [serializedValue, transferables] = handler.serialize(value);
      return [
        {
          type: 3,
          name,
          value: serializedValue,
        },
        transferables,
      ];
    }
  }
  return [
    {
      type: 0,
      value,
    },
    transferCache.get(value) || [],
  ];
}
function fromWireValue(value) {
  switch (value.type) {
    case 3:
      return transferHandlers.get(value.name).deserialize(value.value);
    case 0:
      return value.value;
  }
}
function init() {
  const worker = new Worker("./dist/transpile.worker.js");
  transform = wrap(worker);
  return transform;
}
init();
function yn(i) {
  const a = new Promise((f, g) => {
    const p1 = () => {
        i.removeEventListener("success", w), i.removeEventListener("error", v);
      },
      w = () => {
        f(T(i.result)), p1();
      },
      v = () => {
        g(i.error), p1();
      };
    i.addEventListener("success", w), i.addEventListener("error", v);
  });
  return a.then((f) => {
    f instanceof IDBCursor && Pe.set(f, i);
  }).catch(() => {
  }),
    ce1.set(a, i),
    a;
}
let pe = {
  get(i, a, f) {
    if (i instanceof IDBTransaction) {
      if (a === "done") return le.get(i);
      if (a === "objectStoreNames") return i.objectStoreNames || Ce.get(i);
      if (a === "store") {
        return f.objectStoreNames[1]
          ? void 0
          : f.objectStore(f.objectStoreNames[0]);
      }
    }
    return T(i[a]);
  },
  set(i, a, f) {
    return (i[a] = f, !0);
  },
  has(i, a) {
    return i instanceof IDBTransaction && (a === "done" || a === "store")
      ? !0
      : a in i;
  },
};
function Sn(i) {
  pe = i(pe);
}
function xn(i) {
  return i === IDBDatabase.prototype.transaction &&
      !("objectStoreNames" in IDBTransaction.prototype)
    ? function (a, ...f) {
      const g = i.call(de1(this), a, ...f);
      return Ce.set(
        g,
        a.sort ? a.sort() : [
          a,
        ],
      ),
        T(g);
    }
    : an().includes(i)
    ? function (...a) {
      return i.apply(de1(this), a), T(Pe.get(this));
    }
    : function (...a) {
      return T(i.apply(de1(this), a));
    };
}
function bn(i) {
  return typeof i == "function"
    ? xn(i)
    : (i instanceof IDBTransaction && un(i),
      on(i, sn()) ? new Proxy(i, pe) : i);
}
function T(i) {
  if (i instanceof IDBRequest) return yn(i);
  if (fe.has(i)) return fe.get(i);
  const a = bn(i);
  return a !== i && (fe.set(i, a), ce1.set(a, i)), a;
}
function Ln(
  i,
  a,
  { blocked: f, upgrade: g, blocking: p1, terminated: w } = {},
) {
  const v = indexedDB.open(i, a), L = T(v);
  return g && v.addEventListener("upgradeneeded", (j) => {
    g(T(v.result), j.oldVersion, j.newVersion, T(v.transaction));
  }),
    f && v.addEventListener("blocked", () => f()),
    L.then((j) => {
      w && j.addEventListener("close", () => w()),
        p1 && j.addEventListener("versionchange", () => p1());
    }).catch(() => {
    }),
    L;
}
Sn((i) => ({
  ...i,
  get: (a, f, g) => Ie1(a, f) || i.get(a, f, g),
  has: (a, f) => !!Ie1(a, f) || i.has(a, f),
}));
