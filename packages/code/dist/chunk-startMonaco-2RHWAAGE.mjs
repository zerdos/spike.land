import "./chunk-chunk-ZRZ5VM3Q.mjs";
import {
  Uri,
  editor,
  editor_api_exports,
  languages
} from "./chunk-chunk-FKZ6EI2J.mjs";
import {
  __commonJS,
  __privateAdd,
  __privateGet,
  __privateSet,
  __toESM,
  init_define_process
} from "./chunk-chunk-JS5E2TTE.mjs";

// (disabled):os
var require_os = __commonJS({
  "(disabled):os"() {
    init_define_process();
  }
});

// js/startMonaco.ts
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.1-03d887d213-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.1-03d887d213-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/_.contribution.js
init_define_process();
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod2, secondTarget) => (__copyProps(target, mod2, "default"), secondTarget && __copyProps(secondTarget, mod2, "default"));
var monaco_editor_core_exports = {};
__reExport(monaco_editor_core_exports, editor_api_exports);
var languageDefinitions = {};
var lazyLanguageLoaders = {};
var LazyLanguageLoader = class {
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
};
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

// ../../.yarn/global/cache/monaco-editor-npm-0.34.1-03d887d213-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js
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
      return import("./chunk-typescript-HG2B6V3C.mjs");
    }
  }
});

// ../../.yarn/global/cache/p-map-npm-5.5.0-9758eb14ee-9.zip/node_modules/p-map/index.js
init_define_process();

// ../../.yarn/global/cache/aggregate-error-npm-4.0.1-12d0501fb7-9.zip/node_modules/aggregate-error/index.js
init_define_process();

// ../../.yarn/global/cache/indent-string-npm-5.0.0-35eaa3b052-9.zip/node_modules/indent-string/index.js
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

// ../../.yarn/global/cache/clean-stack-npm-4.2.0-bb0dff47b2-9.zip/node_modules/clean-stack/index.js
init_define_process();
var import_os = __toESM(require_os(), 1);

// ../../.yarn/global/cache/escape-string-regexp-npm-5.0.0-a663e825ce-9.zip/node_modules/escape-string-regexp/index.js
init_define_process();
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// ../../.yarn/global/cache/clean-stack-npm-4.2.0-bb0dff47b2-9.zip/node_modules/clean-stack/index.js
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

// ../../.yarn/global/cache/aggregate-error-npm-4.0.1-12d0501fb7-9.zip/node_modules/aggregate-error/index.js
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
_errors = new WeakMap();

// ../../.yarn/global/cache/p-map-npm-5.5.0-9758eb14ee-9.zip/node_modules/p-map/index.js
var AbortError = class extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
};
var getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage);
var getAbortedReason = (signal) => {
  const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
};
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
    const reject = (reason) => {
      isRejected = true;
      isResolved = true;
      reject_(reason);
    };
    if (signal) {
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason(signal));
      });
    }
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

// js/monacoWorkers.mjs
init_define_process();

// js/monaco-workers/language/typescript/ts.workerJs.js
var ts_workerJs_default = "./chunk-ts.workerJs-WHHQVOGL.js";

// js/monaco-workers/language/json/json.workerJs.js
var json_workerJs_default = "./chunk-json.workerJs-DWIESG6I.js";

// js/monaco-workers/language/css/css.workerJs.js
var css_workerJs_default = "./chunk-css.workerJs-BSFAE3OB.js";

// js/monaco-workers/language/html/html.workerJs.js
var html_workerJs_default = "./chunk-html.workerJs-QQ4U5JMH.js";

// js/monaco-workers/editor/editor.workerJs.js
var editor_workerJs_default = "./chunk-editor.workerJs-MVUVYYMA.js";

// js/monacoWorkers.mjs
var getWorkerUrl = (_moduleId, label) => {
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
};

// js/startMonaco.ts
var create = editor.create;
var createModel = editor.createModel;
var originToUse = location.origin.includes("spike") ? location.origin : "https://testing.spike.land/";
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
var monacoContribution = async (code) => {
  languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
  languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: originToUse + "/",
    target: languages.typescript.ScriptTarget.ESNext,
    importHelpers: false,
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
    traceResolution: true,
    moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
    moduleSpecifierCompletion: 2,
    declaration: true,
    module: languages.typescript.ModuleKind.CommonJS,
    noEmitOnError: true,
    sourceMap: true,
    mapRoot: originToUse + "/src/sourcemaps",
    maxNodeModuleJsDepth: 10,
    rootDir: originToUse + "/live",
    paths: {
      [originToUse + "/live/node_modules/"]: [originToUse + "/*"],
      [originToUse + "/live/*"]: [originToUse + "/live/*"],
      [originToUse + "*"]: [originToUse + "/*"],
      [originToUse + "/node_modules/*"]: [originToUse + "/*"],
      [originToUse + "node_modules/*"]: [originToUse + "/*"],
      [originToUse + "/*"]: [originToUse + "/*"],
      [originToUse + "^/*"]: [originToUse + "/*"]
    },
    typeRoots: [
      originToUse + "/@types/",
      originToUse + "/unpkg/@types/",
      originToUse + "/",
      originToUse + "/unpkg:/"
    ],
    jsxImportSource: "@emotion/react",
    jsx: languages.typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: false,
    include: [originToUse + "/node_modules"]
  });
  const regex1 = / from '\.\./gi;
  const regex2 = / from '\./gi;
  const search = new RegExp(
    ` from '(${originToUse}/)?live/[a-zA-Z]+`,
    "gm"
  );
  const replaced = code.replaceAll(regex1, ` from '${originToUse}/live`).replaceAll(regex2, ` from '${originToUse}/live`);
  const models = replaced.matchAll(search);
  for (const match of models) {
    const extraModel = new URL(match[0].slice(7) + ".tsx", originToUse).toString();
    createModel(
      await fetch(extraModel).then(async (res) => res.text()),
      "typescript",
      Uri.parse(extraModel)
    );
  }
  (async () => {
    const { dtsFiles } = await import("./chunk-types-TJKL6VK4.mjs");
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
        force: true,
        url: "/node_modules/@emotion/react/types/index.d.ts",
        depend: ["@emotion/cache"]
      },
      {
        name: "@emotion/react/jsx-runtime",
        force: true,
        url: emotionJSXRuntimeDTS,
        depend: ["@emotion/cache"]
      },
      {
        name: "@emotion/react/jsx-dev-runtime",
        url: emotionJSXRuntimeDTS,
        force: true,
        depend: ["@emotion/cache"]
      },
      {
        name: "@emotion/react/jsx-namespace",
        url: emotionJSXNameSpaceDTS,
        force: true,
        depend: ["@emotion/utils", "type"]
      },
      {
        name: "@emotion/react/theming",
        url: emotionThemingDts,
        depend: ["@emotion/utils", "type"]
      },
      {
        name: "@emotion/react/css-prop",
        force: true,
        url: "/node_modules/@emotion/react/types/css-prop.d.ts",
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@use-gesture/react",
        url: "/node_modules/@use-gesture/react/dist/declarations/src/index.d.ts",
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/react/helper",
        url: "/node_modules/@emotion/react/types/helper.d.ts",
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/serialize",
        force: true,
        url: "/node_modules/@emotion/serialize/dist/declarations/types/index.d.ts",
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/utils",
        force: true,
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
      const mapper = async ({ name, url, force }) => (code.indexOf(name) !== -1 || force) && languages.typescript.typescriptDefaults.addExtraLib(
        await (await fetch(
          url
        )).text(),
        originToUse + `/node_modules/${name}/index.d.ts`
      );
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
};
self.MonacoEnvironment = {
  baseUrl: originToUse,
  getWorkerUrl
};
var mod = {};
var startMonaco = async ({ code, container, name, onChange }) => {
  if (mod[name]) {
    return mod[name];
  }
  const returnValue = await startMonacoPristine({ code, container, name });
  mod[name] = returnValue;
  return returnValue;
  async function startMonacoPristine({ code: code2, container: container2, name: name2 }) {
    const codeSpace = name2;
    const replaced = await monacoContribution(
      code2
    );
    const model = createModel(
      replaced,
      "typescript",
      Uri.parse(`${originToUse}/live/${codeSpace}.tsx`)
    );
    const innerContainer = container2;
    const editor2 = create(innerContainer, {
      model,
      scrollbar: {
        scrollByPage: false,
        alwaysConsumeMouseWheel: false
      },
      scrollBeyondLastLine: true,
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
      useShadowDOM: false,
      experimental: {
        stickyScroll: {
          enabled: true
        }
      },
      roundedSelection: true,
      linkedEditing: true,
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
    const mod2 = {
      silent: false,
      code: code2,
      tsWorker: languages.typescript.getTypeScriptWorker().then(
        (ts) => ts(model.uri)
      ).catch((e) => {
        console.log("ts error, will retry", e);
      })
    };
    model.onDidChangeContent(() => {
      if (mod2.silent)
        return;
      const code3 = model.getValue();
      if (mod2.code === code3)
        return;
      mod2.code = code3;
      onChange(code3);
    });
    return {
      getValue: () => mod2.code,
      getErrors: () => mod2.tsWorker.then(
        (ts) => ts?.getSemanticDiagnostics(
          originToUse + "/live/" + codeSpace + ".tsx"
        ).then((diag) => diag.map((d) => d.messageText.toString()))
      ),
      setValue: (code3) => {
        mod2.silent = true;
        let state = null;
        try {
          state = editor2.saveViewState();
        } catch {
          console.error("error while saving the state");
        }
        model.setValue(code3);
        if (state) {
          editor2.restoreViewState(state);
        }
        mod2.silent = false;
      }
    };
  }
};
export {
  startMonaco
};
