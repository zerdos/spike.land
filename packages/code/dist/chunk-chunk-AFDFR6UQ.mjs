import {
  emotionCache_default
} from "./chunk-chunk-5L5QDEBB.mjs";
import {
  hashCode,
  mST,
  patchSync,
  require_lodash
} from "./chunk-chunk-AUL7LWHA.mjs";
import {
  Suspense,
  init_reactMod,
  lazy,
  reactMod_exports,
  useEffect,
  useState
} from "./chunk-chunk-ADALEOZA.mjs";
import {
  CacheProvider,
  css
} from "./chunk-chunk-HS3IGWOP.mjs";
import {
  jsx,
  jsxs
} from "./chunk-chunk-2RHEIFZB.mjs";
import {
  initAndTransform
} from "./chunk-chunk-334XPUVR.mjs";
import {
  md5
} from "./chunk-chunk-AZHCEBCB.mjs";
import {
  __commonJS,
  __toCommonJS,
  __toESM,
  init_define_process
} from "./chunk-chunk-2DK73MPQ.mjs";

// ../../.yarn/__virtual__/react-error-boundary-virtual-8f70cc21a5/0/global/cache/react-error-boundary-npm-3.1.4-2310dba89e-9.zip/node_modules/react-error-boundary/dist/react-error-boundary.umd.js
var require_react_error_boundary_umd = __commonJS({
  "../../.yarn/__virtual__/react-error-boundary-virtual-8f70cc21a5/0/global/cache/react-error-boundary-npm-3.1.4-2310dba89e-9.zip/node_modules/react-error-boundary/dist/react-error-boundary.umd.js"(exports, module) {
    init_define_process();
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, (init_reactMod(), __toCommonJS(reactMod_exports))) : typeof define === "function" && define.amd ? define(["exports", "react"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.ReactErrorBoundary = {}, global.React));
    })(exports, function(exports2, React) {
      "use strict";
      function _interopNamespace(e) {
        if (e && e.__esModule)
          return e;
        var n = /* @__PURE__ */ Object.create(null);
        if (e) {
          Object.keys(e).forEach(function(k) {
            if (k !== "default") {
              var d = Object.getOwnPropertyDescriptor(e, k);
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: function() {
                  return e[k];
                }
              });
            }
          });
        }
        n["default"] = e;
        return Object.freeze(n);
      }
      var React__namespace = _interopNamespace(React);
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        _setPrototypeOf(subClass, superClass);
      }
      var changedArray = function changedArray2(a, b) {
        if (a === void 0) {
          a = [];
        }
        if (b === void 0) {
          b = [];
        }
        return a.length !== b.length || a.some(function(item, index) {
          return !Object.is(item, b[index]);
        });
      };
      var initialState = {
        error: null
      };
      var ErrorBoundary2 = function(_React$Component) {
        _inheritsLoose(ErrorBoundary3, _React$Component);
        function ErrorBoundary3() {
          var _this;
          for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
            _args[_key] = arguments[_key];
          }
          _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;
          _this.state = initialState;
          _this.resetErrorBoundary = function() {
            var _this$props;
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            _this.props.onReset == null ? void 0 : (_this$props = _this.props).onReset.apply(_this$props, args);
            _this.reset();
          };
          return _this;
        }
        ErrorBoundary3.getDerivedStateFromError = function getDerivedStateFromError(error) {
          return {
            error
          };
        };
        var _proto = ErrorBoundary3.prototype;
        _proto.reset = function reset() {
          this.setState(initialState);
        };
        _proto.componentDidCatch = function componentDidCatch(error, info) {
          var _this$props$onError, _this$props2;
          (_this$props$onError = (_this$props2 = this.props).onError) == null ? void 0 : _this$props$onError.call(_this$props2, error, info);
        };
        _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
          var error = this.state.error;
          var resetKeys = this.props.resetKeys;
          if (error !== null && prevState.error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
            var _this$props$onResetKe, _this$props3;
            (_this$props$onResetKe = (_this$props3 = this.props).onResetKeysChange) == null ? void 0 : _this$props$onResetKe.call(_this$props3, prevProps.resetKeys, resetKeys);
            this.reset();
          }
        };
        _proto.render = function render2() {
          var error = this.state.error;
          var _this$props4 = this.props, fallbackRender = _this$props4.fallbackRender, FallbackComponent = _this$props4.FallbackComponent, fallback = _this$props4.fallback;
          if (error !== null) {
            var _props = {
              error,
              resetErrorBoundary: this.resetErrorBoundary
            };
            if (React__namespace.isValidElement(fallback)) {
              return fallback;
            } else if (typeof fallbackRender === "function") {
              return fallbackRender(_props);
            } else if (FallbackComponent) {
              return React__namespace.createElement(FallbackComponent, _props);
            } else {
              throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop");
            }
          }
          return this.props.children;
        };
        return ErrorBoundary3;
      }(React__namespace.Component);
      function withErrorBoundary(Component, errorBoundaryProps) {
        var Wrapped = function Wrapped2(props) {
          return React__namespace.createElement(ErrorBoundary2, errorBoundaryProps, React__namespace.createElement(Component, props));
        };
        var name = Component.displayName || Component.name || "Unknown";
        Wrapped.displayName = "withErrorBoundary(" + name + ")";
        return Wrapped;
      }
      function useErrorHandler(givenError) {
        var _React$useState = React__namespace.useState(null), error = _React$useState[0], setError = _React$useState[1];
        if (givenError != null)
          throw givenError;
        if (error != null)
          throw error;
        return setError;
      }
      exports2.ErrorBoundary = ErrorBoundary2;
      exports2.useErrorHandler = useErrorHandler;
      exports2.withErrorBoundary = withErrorBoundary;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// js/wait.ts
init_define_process();
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

// js/runner.tsx
init_define_process();
var import_lodash = __toESM(require_lodash(), 1);

// js/renderToString.tsx
init_define_process();

// js/starter.tsx
init_define_process();
init_reactMod();
var import_react_error_boundary = __toESM(require_react_error_boundary_umd(), 1);
Object.assign(globalThis, { md5 });
var importIt = async (url) => {
  let waitingTime = 100;
  let mod3;
  while (true) {
    try {
      try {
        mod3 = await importShim(url);
        return mod3;
      } catch {
        try {
          let resp = await fetch(url);
          if (resp.status === 307 && resp.headers.get("location")) {
            const i = Number(resp.headers.get("location").split("/").pop()) * 1;
            globalThis.codeSpaces = globalThis.codeSpaces = {};
            globalThis.codeSpaces[url] = i;
            return await importIt(resp.headers.get("location"));
          }
          if (resp.ok) {
            const trp = await resp.text();
            try {
              mod3 = await fetch(url.replace(".js", ".tsx")).then(
                async (resp2) => resp2 && !resp2.ok ? false : await resp2.text().then(
                  (code) => esmTransform(code).then(
                    (transpiled) => importShim(createJsBlob(transpiled))
                  )
                )
              ) || new Function(trp + ` return ${trp.slice(2, 10)}`)();
            } catch {
              console.error("something went nuts");
              return;
            }
            return mod3;
          }
        } catch (err) {
          console.error({ err });
          console.error(err && err?.message || "error has been thrown");
        }
      }
    } catch {
      console.error("bad something happened;");
    } finally {
      await wait(waitingTime *= 2);
    }
  }
};
if (!Object.hasOwn(globalThis, "apps")) {
  Object.assign(globalThis, { apps: {}, eCaches: {} });
}
var { apps: apps2, eCaches: eCaches2 } = globalThis;
var starterI = 1 * document.getElementById("root").getAttribute(
  "data-i"
);
function AutoUpdateApp({ codeSpace }) {
  const [{ App, i }, setApps] = useState({
    i: starterI - 1,
    App: lazy(
      () => importIt(`${location.origin}/live/${codeSpace}/index.js/${starterI - 1}`).then((m) => {
        setApps((x) => ({ ...x, i: x.i + 1 }));
        return m;
      })
    )
  });
  useEffect(() => {
    (async () => {
      const mod3 = await importIt(`${location.origin}/live/${codeSpace}/index.js/${i}`);
      setApps((x) => ({ ...x, i: x.i + 1, App: lazy(async () => mod3) }));
    })();
  }, [i, setApps]);
  return jsx(import_react_error_boundary.ErrorBoundary, {
    fallbackRender: ({ error }) => jsxs("div", {
      role: "alert",
      children: [
        jsx("div", {
          children: "Oh no"
        }),
        jsx("pre", {
          children: error.message
        })
      ]
    }),
    children: jsx(Suspense, {
      fallback: jsx("div", {
        style: { height: "100%" },
        dangerouslySetInnerHTML: {
          __html: `<style>${mST().css.split("body").join(`${codeSpace}-${hashCode()}`)}</style>${mST().html}`
        }
      }),
      children: jsx(App, {})
    })
  }, i);
}
async function appFactory(transpiled = "") {
  const { transpiled: mstTranspiled, i: mstI } = mST();
  const trp = transpiled.length > 0 ? transpiled : mstTranspiled;
  const hash = md5(trp);
  if (!apps2[hash] || !eCaches2[hash]) {
    try {
      eCaches2[hash] = eCaches2[hash] || emotionCache_default({
        key: hash,
        speedy: false
      });
      eCaches2[hash].compat = void 0;
      console.log(`i: ${mstI}: `);
      let mod3;
      try {
        mod3 = await importShim(createJsBlob(trp));
      } catch {
        mod3 = new Function(trp + ` return ${trp.slice(2, 10)}`)();
      }
      const App = mod3.default;
      apps2[hash] = ({ appId }) => jsx("div", {
        style: { height: 100 + "%" },
        id: appId,
        children: jsx(CacheProvider, {
          value: eCaches2[hash],
          children: jsx(App, {})
        }, hash)
      }, hash);
    } catch (error) {
      if (error instanceof SyntaxError) {
        const name = error.name;
        const message = error.message;
        apps2[hash] = () => jsxs("div", {
          css: css`background-color: orange;`,
          children: [
            jsx("h1", {
              children: "Syntax Error"
            }),
            jsx("h2", {
              children: hash
            }),
            jsxs("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            jsx("p", {
              children: JSON.stringify({ err: error })
            })
          ]
        });
      } else if (error instanceof Error) {
        const name = error.name;
        const message = error.message;
        apps2[hash] = () => jsxs("div", {
          css: css`background-color: orange;`,
          children: [
            jsx("h1", {
              children: "Syntax Error"
            }),
            jsxs("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            jsx("p", {
              children: JSON.stringify({ err: error })
            })
          ]
        });
      } else {
        apps2[hash] = () => jsx("div", {
          css: css`background-color: orange;`,
          children: jsxs("h1", {
            children: [
              "Unknown Error: $",
              hash
            ]
          })
        });
      }
    }
    if (transpiled !== "")
      return apps2[hash];
  }
  return apps2[hash];
}
function createJsBlob(code, fileName = "index.mjs") {
  const file = new File([code], fileName, {
    type: "application/javascript",
    lastModified: Date.now()
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}

// js/renderToString.tsx
var mod = {
  md5Hash: "",
  wait: 1,
  res: null,
  codeSpace: "",
  waitForDiv: async (md5Hash) => {
    if (mod.md5Hash !== md5Hash)
      return "";
    if (!mod.res?.innerHTML)
      await waitForAnimation();
    mod.wait *= 2;
    await wait(mod.wait);
    if (!mod.res?.innerHTML.includes(md5Hash)) {
      await waitForAnimation();
    }
    const html = mod.res?.innerHTML;
    if (html?.includes(md5Hash))
      return html;
    mod.wait = mod.wait * 2;
    return await mod.waitForDiv(md5Hash);
  },
  setApp: (md5Hash) => {
    const rootDiv = document.createElement("div");
    const root = ReactDOMClient.createRoot(rootDiv);
    const App = apps[md5Hash];
    mod.md5Hash = md5Hash;
    mod.res = rootDiv;
    root.render(jsx(App, {
      appId: `${mod.codeSpace}-${md5Hash}`
    }));
    return () => {
      root.unmount();
      rootDiv.remove();
    };
  }
};
var render = async (transpiled, codeSpace) => {
  mod.codeSpace = codeSpace;
  const md5hash = md5(transpiled);
  if (!apps[md5hash])
    await appFactory(transpiled);
  mod.wait = 1;
  const cleanup = mod.setApp(
    md5hash
  );
  try {
    const html = await mod.waitForDiv(md5hash);
    if (!html)
      return { html: null, css: null };
    const css2 = mineFromCaches(eCaches[md5hash]);
    const globalCss = document.querySelector(
      `style[data-emotion=${eCaches[md5hash].key}-global]`
    )?.innerHTML;
    return {
      html,
      css: globalCss ? globalCss + " " + css2 : css2
    };
  } finally {
    cleanup();
  }
};
function mineFromCaches(cache) {
  const keys = Object.keys(cache.inserted).map((x) => `.${cache.key}-${x}`);
  return Array.from(document.styleSheets).map((x) => x.cssRules[0]).filter(
    (x) => x && keys.includes(x.selectorText)
  ).map((x) => x.cssText).join("\n");
}
var waitForAnimation = () => {
  let animationFrame;
  console.log("wait for animation");
  const animated = new Promise((resolve) => animationFrame = resolve);
  requestAnimationFrame(() => animationFrame(true));
  return animated;
};

// js/toUmd.ts
init_define_process();
var mod2 = {
  printR(name, included) {
    if (included[name])
      return "";
    included[name] = true;
    const current = mod2.data[mod2.hashMap[name]];
    const currentCode = current.code;
    if (!current.deps || !current.deps.length) {
      return currentCode;
    }
    const myDepts = [...current.deps];
    const depts = myDepts.map((n) => mod2.printR(n, included)).join(" \n ");
    return depts + `
    
    ` + currentCode;
  },
  async toJs(name) {
    const js = mod2.printR(name, {});
    const modZ = Object.keys(mod2.data).map(
      (k) => [`"${mod2.hashMap[k]}"`, k.replace(/[^a-f]/g, "")]
    ).map((x) => x[0] + ": " + x[1]).join(", \n ");
    const res = `
     ${js}
  function require(name){
    return ({${modZ}})[name];
  }
  globalThis.UMD_require = require;
  
     `;
    const { transform } = await import("./chunk-esbuildEsm-FA542VTT.mjs");
    const t = await transform(res, {
      format: "esm",
      minify: true,
      keepNames: true,
      platform: "browser",
      treeShaking: true
    });
    const c = await transform(t.code, {
      format: "iife",
      minify: true,
      keepNames: true,
      platform: "browser",
      treeShaking: true
    });
    return c.code;
  },
  hashMap: {},
  data: {}
};
var toUmd = async (source, name) => {
  const { transform } = await import("./chunk-esbuildEsm-FA542VTT.mjs");
  const hash = md5(source);
  mod2.hashMap = { ...mod2.hashMap, [hash]: name, [name]: hash };
  if (!mod2.data[hash]) {
    const transformed = await transform(source, {
      format: "iife",
      keepNames: true,
      treeShaking: true,
      target: "es2021",
      loader: name.includes(".tsx") ? "tsx" : name.includes(".ts") ? "ts" : name.includes(".jsx") ? "jsx" : "js",
      globalName: hash.replace(/[^a-f]/g, "")
    });
    if (!transformed || !transformed.code) {
      console.log("transform result -code is empty");
      return;
    }
    mod2.data = {
      ...mod2.data,
      [hash]: {
        ...transformed,
        deps: findDeps(transformed.code)
      }
    };
    await Promise.all(mod2.data[hash].deps.map(async (dep) => {
      if (mod2.hashMap[dep]) {
        return;
      }
      const importMap = JSON.parse(
        document.querySelector("script[type=importmap]").innerHTML
      );
      let url = "";
      let urlHash = "";
      if (importMap.imports[dep]) {
        url = importMap.imports[dep];
        urlHash = md5(dep);
      } else if (dep.startsWith("./")) {
        url = new URL(dep, location.origin).toString();
        urlHash = md5(dep);
      } else {
        try {
          url = await (import.meta.resolve || importShim.resolve)(dep, name);
          urlHash = md5(dep);
        } catch {
          console.error(`failed to resolve: ${dep}`);
          return;
        }
      }
      if (mod2.hashMap[urlHash]) {
        return;
      }
      mod2.hashMap[dep] = url;
      const source2 = await (await fetch(url)).text();
      return toUmd(source2, dep);
    }));
  }
  return mod2;
};
var findDeps = (code) => {
  const regex = /require\("(.+?)"\)/gm;
  let m;
  const deps = [];
  while ((m = regex.exec(code)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    for (const [groupIndex, match] of m.entries()) {
      if (groupIndex == 1) {
        deps.push(match);
      }
      console.log(`Found match, group ${groupIndex}: ${match}`);
    }
  }
  return deps;
};

// js/runner.tsx
var debouncedSync = (0, import_lodash.default)(patchSync, 200, {
  leading: true,
  trailing: true,
  maxWait: 800
});
var counterMax = mST().i;
var IIFE = {};
var esmTransform = async (code) => {
  const transpiled = await initAndTransform(code, {
    loader: "tsx",
    format: "esm",
    treeShaking: true,
    platform: "browser",
    minify: false,
    globalName: md5(code),
    keepNames: true,
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        module: "ESNext",
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "@emotion/react"
      }
    },
    target: "es2021"
  });
  Object.assign(IIFE, { [md5(transpiled.code)]: md5(code) });
  return transpiled.code;
};
globalThis.esmTransform = esmTransform;
var umdTransform = async (code) => {
  const transpiled = await initAndTransform(code, {
    loader: "tsx",
    format: "iife",
    treeShaking: true,
    platform: "browser",
    minify: false,
    globalName: md5(code),
    keepNames: true,
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        module: "ESNext",
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "@emotion/react"
      }
    },
    target: "es2021"
  });
  Object.assign(IIFE, { [md5(transpiled.code)]: md5(code) });
  return transpiled.code;
};
Object.assign(globalThis, {
  toUmd: () => {
    toUmd(mST().code, "app");
  },
  IIFE,
  umdTransform
});
async function runner({ code, counter, codeSpace }) {
  if (counter <= counterMax)
    return;
  counterMax = counter;
  try {
    const transpiledCode = await esmTransform(code);
    const { html, css: css2 } = await render(transpiledCode, codeSpace);
    console.log({ html, css: css2 });
    if (!html || !css2) {
      return;
    }
    debouncedSync({
      ...mST(),
      code,
      i: counter,
      transpiled: transpiledCode,
      html,
      css: css2
    });
  } catch (error) {
    console.error({ error });
  } finally {
  }
}

export {
  wait,
  AutoUpdateApp,
  createJsBlob,
  runner
};
