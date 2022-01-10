// js/dist/startMonaco.mjs
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var require_os = __commonJS({
  "(disabled):os"() {
  }
});
var version = "0.31.1";
var exp = {
  monaco: null
};
var getMonaco = async () => {
  if (exp.monaco)
    return exp.monaco;
  const importScript = (src, res = []) => {
    if (typeof window === "undefined")
      return {};
    return document.head.querySelector(`script[src="${src}"]`) && window || new Promise(function(resolve, reject) {
      const s = document.createElement("script");
      s.src = src;
      s.async = "async";
      s.type = "application/javascript";
      s.onload = () => {
        if (res.length === 0) {
          resolve(window);
        }
        const ret = {};
        res.forEach((x) => Object.assign(ret, window[x]));
        resolve(ret);
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  };
  const vsPath = `https://unpkg.com/monaco-editor@${version}/min/vs`;
  const { require: require2 } = await importScript(`${vsPath}/loader.js`);
  require2.config({ paths: { "vs": vsPath }, "vs/css": { disabled: true } });
  exp.monaco = await new Promise((resolve) => require2(["vs/editor/editor.main"], (_m) => resolve(_m)));
  return exp.monaco;
};
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
var import_os = __toESM(require_os(), 1);
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var extractPathRegex = /\s+at.*[(\s](.*)\)?/;
var pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
var homeDir = typeof import_os.default.homedir === "undefined" ? "" : import_os.default.homedir().replace(/\\/g, "/");
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
      line = line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, "~")));
    }
    return line;
  }).join("\n");
}
var cleanInternalStack = (stack) => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, "");
var _errors;
var AggregateError = class extends Error {
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
_errors = /* @__PURE__ */ new WeakMap();
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
var pMapSkip = Symbol("skip");
async function pAll(iterable, options) {
  return pMap(iterable, (element) => element(), options);
}
var monacoProm = getMonaco();
var editor_default = async ({ onChange, code, language, container, options }) => {
  const monaco = await monacoProm;
  const { editor: Editor, languages } = monaco;
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
    module: 99,
    declaration: true,
    "inlineSources": true,
    noEmit: true,
    noEmitOnError: true,
    jsxFactory: "jsx",
    jsx: 4,
    skipLibCheck: false,
    allowUmdGlobalAccess: true
  });
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
  const { Uri } = monaco;
  const editor = monaco.editor.create(container, {
    model: monaco.editor.createModel(code, "typescript", Uri.parse("file:///index.ts")),
    language: "typescript",
    theme: "vs-dark"
  });
  window.addEventListener("resize", () => {
    editor.layout();
  });
  editor.onDidChangeModelContent((e) => onChange(editor.getValue(), e));
  setTimeout(() => loadExtraLibs((content, filePath) => window.monaco.languages.typescript.typescriptDefaults.addExtraLib(content, filePath), (opts) => window.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(opts)), 100);
  async function loadExtraLibs(addExtraLib, setDiagnosticsOptions) {
    const importHelper = [
      {
        name: "react",
        url: "https://unpkg.com/@types/react@17.0.38/index.d.ts",
        depend: ["global", "csstype", "react-dom", "prop-types"]
      },
      {
        name: "react/jsx-dev-runtime",
        url: "https://unpkg.com/@types/react@17.0.38/jsx-dev-runtime.d.ts",
        depend: ["global", "csstype", "react-dom", "prop-types"]
      },
      {
        name: "react-exp",
        url: "https://unpkg.com/@types/react@17.0.38/experimental.d.ts",
        depend: []
      },
      {
        name: "global",
        url: "https://unpkg.com/@types/react@17.0.38/global.d.ts",
        depend: []
      },
      {
        name: "prop-types",
        url: "https://unpkg.com/@types/prop-types@15.7.4/index.d.ts",
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
        url: "https://unpkg.com/framer-motion@5.5.6/types/index.d.ts",
        depend: ["popmotion"]
      },
      {
        name: "framer-motion/types/render/dom/motion.d.ts",
        url: " https://unpkg.com/framer-motion@5.5.6/types/render/dom/motion.d.ts",
        depend: ["popmotion"]
      },
      {
        name: "popmotion",
        url: "https://unpkg.com/popmotion@11.0.0/lib/index.d.ts"
      }
    ];
    const dts = importHelper.map(({ name, url }) => async () => {
      const content = await (await fetch(url)).text();
      const nameOfLib = Uri.parse(name.includes("@") ? `/node_modules/${name}` : name.endsWith(".d.ts") ? "/node_modules/@types/" + name : "/node_modules/@types/" + name + "/index.d.ts").fsPath;
      languages.typescript.typescriptDefaults.addExtraLib(content, nameOfLib);
    });
    pAll(dts, { concurrency: 2 });
    languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
    return () => editor;
  }
};
export {
  editor_default as default
};
//# sourceMappingURL=startMonaco-PIYHIV5W.mjs.map
