import "./chunk-chunk-QSU7IXUL.mjs";
import {
  Uri,
  create,
  createModel,
  editor_api_exports,
  languages
} from "./chunk-chunk-6CYCXJJB.mjs";
import {
  __commonJS,
  __name,
  __privateAdd,
  __privateGet,
  __privateSet,
  __toESM,
  init_define_process
} from "./chunk-chunk-S6BTEEN4.mjs";

// (disabled):os
var require_os = __commonJS({
  "(disabled):os"() {
    init_define_process();
  }
});

// js/startMonaco.ts
init_define_process();

// node_modules/monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js
init_define_process();

// node_modules/monaco-editor/esm/vs/basic-languages/_.contribution.js
init_define_process();
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
}, "__copyProps");
var __reExport = /* @__PURE__ */ __name((target, mod2, secondTarget) => (__copyProps(target, mod2, "default"), secondTarget && __copyProps(secondTarget, mod2, "default")), "__reExport");
var monaco_editor_core_exports = {};
__reExport(monaco_editor_core_exports, editor_api_exports);
var languageDefinitions = {};
var lazyLanguageLoaders = {};
var LazyLanguageLoader = /* @__PURE__ */ __name(class {
  static getOrCreate(languageId) {
    if (!lazyLanguageLoaders[languageId]) {
      lazyLanguageLoaders[languageId] = new LazyLanguageLoader(languageId);
    }
    return lazyLanguageLoaders[languageId];
  }
  constructor(languageId) {
    this._languageId = languageId;
    this._loadingTriggered = false;
    this._lazyLoadPromise = new Promise((resolve, reject) => {
      this._lazyLoadPromiseResolve = resolve;
      this._lazyLoadPromiseReject = reject;
    });
  }
  load() {
    if (!this._loadingTriggered) {
      this._loadingTriggered = true;
      languageDefinitions[this._languageId].loader().then((mod2) => this._lazyLoadPromiseResolve(mod2), (err) => this._lazyLoadPromiseReject(err));
    }
    return this._lazyLoadPromise;
  }
}, "LazyLanguageLoader");
function registerLanguage(def) {
  const languageId = def.id;
  languageDefinitions[languageId] = def;
  monaco_editor_core_exports.languages.register(def);
  const lazyLanguageLoader = LazyLanguageLoader.getOrCreate(languageId);
  monaco_editor_core_exports.languages.registerTokensProviderFactory(languageId, {
    create: async () => {
      const mod2 = await lazyLanguageLoader.load();
      return mod2.language;
    }
  });
  monaco_editor_core_exports.languages.onLanguage(languageId, async () => {
    const mod2 = await lazyLanguageLoader.load();
    monaco_editor_core_exports.languages.setLanguageConfiguration(languageId, mod2.conf);
  });
}
__name(registerLanguage, "registerLanguage");

// node_modules/monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js
registerLanguage({
  id: "typescript",
  extensions: [".ts", ".tsx"],
  aliases: ["TypeScript", "ts", "typescript"],
  mimetypes: ["text/typescript"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/typescript/typescript"], resolve, reject);
      });
    } else {
      return import("./chunk-typescript-DR3PBWOI.mjs");
    }
  }
});

// node_modules/p-map/index.js
init_define_process();

// node_modules/aggregate-error/index.js
init_define_process();

// node_modules/indent-string/index.js
init_define_process();
function indentString(string, count = 1, options = {}) {
  const {
    indent = " ",
    includeEmptyLines = false
  } = options;
  if (typeof string !== "string") {
    throw new TypeError(
      `Expected \`input\` to be a \`string\`, got \`${typeof string}\``
    );
  }
  if (typeof count !== "number") {
    throw new TypeError(
      `Expected \`count\` to be a \`number\`, got \`${typeof count}\``
    );
  }
  if (count < 0) {
    throw new RangeError(
      `Expected \`count\` to be at least 0, got \`${count}\``
    );
  }
  if (typeof indent !== "string") {
    throw new TypeError(
      `Expected \`options.indent\` to be a \`string\`, got \`${typeof indent}\``
    );
  }
  if (count === 0) {
    return string;
  }
  const regex = includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
  return string.replace(regex, indent.repeat(count));
}
__name(indentString, "indentString");

// node_modules/clean-stack/index.js
init_define_process();
var import_os = __toESM(require_os(), 1);

// node_modules/clean-stack/node_modules/escape-string-regexp/index.js
init_define_process();
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
__name(escapeStringRegexp, "escapeStringRegexp");

// node_modules/clean-stack/index.js
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
    if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar") || match.includes("node_modules/electron/dist/resources/electron.asar") || match.includes("node_modules/electron/dist/resources/default_app.asar")) {
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
__name(cleanStack, "cleanStack");

// node_modules/aggregate-error/index.js
var cleanInternalStack = /* @__PURE__ */ __name((stack) => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, ""), "cleanInternalStack");
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
      return typeof error.stack === "string" && error.stack.length > 0 ? cleanInternalStack(cleanStack(error.stack)) : String(error);
    }).join("\n");
    message = "\n" + indentString(message, 4);
    super(message);
    __privateAdd(this, _errors, void 0);
    this.name = "AggregateError";
    __privateSet(this, _errors, errors);
  }
  get errors() {
    return __privateGet(this, _errors).slice();
  }
};
__name(AggregateError, "AggregateError");
_errors = new WeakMap();

// node_modules/p-map/index.js
var AbortError = class extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
};
__name(AbortError, "AbortError");
var getDOMException = /* @__PURE__ */ __name((errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage), "getDOMException");
var getAbortedReason = /* @__PURE__ */ __name((signal) => {
  const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
}, "getAbortedReason");
async function pMap(iterable, mapper, {
  concurrency = Number.POSITIVE_INFINITY,
  stopOnError = true,
  signal
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
    const reject = /* @__PURE__ */ __name((reason) => {
      isRejected = true;
      isResolved = true;
      reject_(reason);
    }, "reject");
    if (signal) {
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason(signal));
      });
    }
    const next = /* @__PURE__ */ __name(async () => {
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
          if (skippedIndexesMap.size === 0) {
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
    }, "next");
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
__name(pMap, "pMap");
var pMapSkip = Symbol("skip");

// js/monacoWorkers.mjs
init_define_process();

// js/monaco-workers/language/typescript/ts.workerJs.js
var ts_workerJs_default = "./chunk-ts.workerJs-A4TYHMWX.js";

// js/monaco-workers/language/json/json.workerJs.js
var json_workerJs_default = "./chunk-json.workerJs-UDWKIPFI.js";

// js/monaco-workers/language/css/css.workerJs.js
var css_workerJs_default = "./chunk-css.workerJs-LGWHXYI7.js";

// js/monaco-workers/language/html/html.workerJs.js
var html_workerJs_default = "./chunk-html.workerJs-FTAMYN24.js";

// js/monaco-workers/editor/editor.workerJs.js
var editor_workerJs_default = "./chunk-editor.workerJs-LAQ26VOO.js";

// js/monacoWorkers.mjs
var getWorkerUrl = /* @__PURE__ */ __name((_moduleId, label) => {
  if (label === "json") {
    return new URL(json_workerJs_default, location.origin).toString();
  }
  if (label === "css" || label === "scss" || label === "less") {
    return new URL(css_workerJs_default, location.origin).toString();
  }
  if (label === "html" || label === "handlebars" || label === "razor") {
    return new URL(html_workerJs_default, location.origin).toString();
  }
  if (label === "typescript" || label === "javascript") {
    return new URL(ts_workerJs_default, location.origin).toString();
  }
  return new URL(editor_workerJs_default, location.origin).toString();
}, "getWorkerUrl");

// js/startMonaco.ts
var lib = [
  "dom",
  "dom.iterable",
  "es2015.collection",
  "es2015.core",
  "es2015",
  "es2015.generator",
  "es2015.iterable",
  "es2015.promise",
  "es2015.proxy",
  "es2015.reflect",
  "es2015.symbol",
  "es2015.symbol.wellknown",
  "es2016.array.include",
  "es2016",
  "es2016.full",
  "es2017",
  "es2017.full",
  "es2017.intl",
  "es2017.object",
  "es2017.sharedmemory",
  "es2017.string",
  "es2017.typedarrays",
  "es2018.asyncgenerator",
  "es2018.asynciterator",
  "es2018",
  "es2018.full",
  "es2018.intl",
  "es2018.promise",
  "es2018.regexp",
  "es2019.array",
  "es2019",
  "es2019.full",
  "es2019.object",
  "es2019.string",
  "es2019.symbol",
  "es2020.bigint",
  "es2020",
  "es2020.full",
  "es2020.intl",
  "es2020.promise",
  "es2020.sharedmemory",
  "es2020.string",
  "es2020.symbol.wellknown",
  "es2021",
  "es2021.full",
  "es2021.intl",
  "es2021.promise",
  "es2021.string",
  "es2021.weakref",
  "es5",
  "es6",
  "esnext",
  "esnext.full",
  "esnext.intl",
  "esnext.promise",
  "esnext.string",
  "esnext.weakref",
  "scripthost",
  "webworker",
  "webworker.importscripts",
  "webworker.iterable"
];
var monacoContribution = /* @__PURE__ */ __name(async (code) => {
  languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
  languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: location.origin + "/",
    target: languages.typescript.ScriptTarget.ESNext,
    importHelpers: true,
    lib,
    allowJs: true,
    skipLibCheck: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    noFallthroughCasesInSwitch: true,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    allowNonTsExtensions: true,
    "traceResolution": true,
    moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
    moduleSpecifierCompletion: 2,
    declaration: true,
    module: languages.typescript.ModuleKind.CommonJS,
    noEmitOnError: true,
    "sourceMap": true,
    "mapRoot": location.origin + "/src/sourcemaps",
    maxNodeModuleJsDepth: 10,
    "rootDir": location.origin + "/live",
    paths: {
      [location.origin + "/live/node_modules/"]: [location.origin + "/npm:/*"],
      [location.origin + "/live/*"]: [location.origin + "/live/*"],
      [location.origin + "/npm:*"]: [location.origin + "/npm:/*"],
      [location.origin + "/node_modules/*"]: [location.origin + "/npm:/*"],
      [location.origin + "node_modules/*"]: [location.origin + "/npm:/*"],
      [location.origin + "/npm:/*"]: [location.origin + "/npm:/*"],
      [location.origin + "^/*"]: [location.origin + "/npm:/*"]
    },
    typeRoots: [
      location.origin + "/npm:/@types/",
      location.origin + "/unpkg/@types/",
      location.origin + "/npm:/",
      location.origin + "/unpkg:/"
    ],
    jsxImportSource: "@emotion/react",
    jsx: languages.typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: false,
    "include": [location.origin + "/node_modules"]
  });
  const regex1 = / from \'\.\./ig;
  const regex2 = / from \'\./ig;
  const search = new RegExp(` from '${origin}/live/[a-zA-Z]+`, "gm");
  const replaced = code.replaceAll(regex1, ` from '${location.origin}/live`).replaceAll(regex2, ` from '${location.origin}/live`);
  const models = replaced.matchAll(search);
  for (const match of models) {
    console.log("***** EXTRA MODELS *****");
    const extraModel = match[0].slice(7) + ".tsx";
    console.log(extraModel);
    createModel(
      await fetch(extraModel).then((res) => res.text()),
      "typescript",
      Uri.parse(extraModel)
    );
  }
  (async () => {
    const { dtsFiles } = await import("./chunk-types-PZAC3NPM.mjs");
    const {
      reactDts,
      jsxRuntimeDts,
      propTypesDts,
      cssTypeDts,
      framerDts,
      emotionStyled,
      emotionStyleBase,
      emotionCache,
      emotionJSXNameSpaceDTS,
      emotionJSXRuntimeDTS,
      emotionThemingDts
    } = dtsFiles;
    const importHelper = [
      {
        name: "react",
        url: reactDts,
        depend: ["global", "csstype", "prop-types"]
      },
      {
        name: "react/jsx-runtime",
        url: jsxRuntimeDts,
        depend: ["global", "csstype", "prop-types"]
      },
      {
        name: "react/jsx-dev-runtime",
        url: jsxRuntimeDts,
        depend: ["global", "csstype", "prop-types"]
      },
      {
        name: "prop-types",
        url: propTypesDts,
        depend: []
      },
      {
        name: "csstype",
        url: cssTypeDts,
        depend: []
      },
      {
        name: "@emotion/base",
        url: emotionStyleBase,
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react"
        ]
      },
      {
        name: "@emotion/styled",
        url: emotionStyled,
        depend: [
          "@emotion/react",
          "@emotion/serialize",
          "react"
        ]
      },
      {
        name: "@emotion/cache",
        url: emotionCache,
        depend: ["@emotion/utils"]
      },
      {
        name: "@emotion/react",
        url: "/node_modules/@emotion/react/types/index.d.ts",
        depend: ["@emotion/cache"]
      },
      {
        name: "@emotion/react/jsx-runtime",
        url: emotionJSXRuntimeDTS,
        depend: ["@emotion/cache"]
      },
      {
        name: "@emotion/react/jsx-dev-runtime",
        url: emotionJSXRuntimeDTS,
        depend: ["@emotion/cache"]
      },
      {
        name: "@emotion/react/jsx-namespace",
        url: emotionJSXNameSpaceDTS,
        depend: ["@emotion/utils", "type"]
      },
      {
        name: "@emotion/react/theming",
        url: emotionThemingDts,
        depend: ["@emotion/utils", "type"]
      },
      {
        name: "@emotion/react/css-prop",
        url: "/node_modules/@emotion/react/types/css-prop.d.ts",
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/react/helper",
        url: "/node_modules/@emotion/react/types/helper.d.ts",
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/serialize",
        url: `/node_modules/@emotion/serialize/dist/declarations/types/index.d.ts`,
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/utils",
        url: "/node_modules/@emotion/utils/dist/declarations/types/index.d.ts",
        depend: []
      },
      {
        name: "framer-motion",
        url: framerDts,
        depend: ["popmotion"]
      }
    ];
    try {
      const mapper = /* @__PURE__ */ __name(async ({ name, url }) => languages.typescript.typescriptDefaults.addExtraLib(
        await (await fetch(
          url
        )).text(),
        location.origin + `/node_modules/${name}/index.d.ts`
      ), "mapper");
      await pMap(importHelper, mapper, { concurrency: 2 });
    } catch {
      console.error("Error in loading d.ts");
    }
    languages.typescript.typescriptDefaults.setEagerModelSync(true);
    languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
  })();
  return code;
}, "monacoContribution");
self.MonacoEnvironment = {
  getWorkerUrl
};
var mod = {};
var startMonaco = /* @__PURE__ */ __name(async ({ code, container, name }) => {
  if (mod[name])
    return mod[name];
  const codeSpace = name;
  const replaced = await monacoContribution(
    code
  );
  const model = createModel(
    replaced,
    "typescript",
    Uri.parse(`${location.origin}/live/${codeSpace}.tsx`)
  );
  const editor = create(container, {
    model,
    scrollbar: {
      scrollByPage: false,
      alwaysConsumeMouseWheel: false
    },
    scrollBeyondLastLine: false,
    scrollPredominantAxis: false,
    smoothScrolling: true,
    suggest: {
      insertMode: "replace",
      filterGraceful: false,
      snippetsPreventQuickSuggestions: false,
      localityBonus: true,
      shareSuggestSelections: true,
      showIcons: true,
      showStatusBar: true,
      preview: true,
      previewMode: "subwordSmart",
      showInlineDetails: true,
      showMethods: true,
      showFunctions: true,
      showConstructors: true,
      showFields: true,
      showColors: true,
      showFiles: true,
      showReferences: true,
      showFolders: true,
      showTypeParameters: true,
      showIssues: true,
      showUsers: true,
      showSnippets: true
    },
    automaticLayout: true,
    useShadowDOM: true,
    bracketPairColorization: {
      independentColorPoolPerBracketType: true,
      enabled: true
    },
    codeLens: true,
    "semanticHighlighting.enabled": true,
    dragAndDrop: true,
    codeActionsOnSaveTimeout: 300,
    dropIntoEditor: { enabled: true },
    mouseStyle: "default",
    definitionLinkOpensInPeek: true,
    theme: "vs-dark",
    autoClosingBrackets: "beforeWhitespace"
  });
  return mod[name] = {
    getTypeScriptWorker: () => languages.typescript.getTypeScriptWorker(),
    setValue: (code2) => {
      let state = null;
      try {
        state = editor.saveViewState();
      } catch (e) {
        console.error("error while saving the state");
      }
      model.setValue(code2);
      if (state)
        editor.restoreViewState(state);
    },
    model
  };
}, "startMonaco");
export {
  startMonaco
};
