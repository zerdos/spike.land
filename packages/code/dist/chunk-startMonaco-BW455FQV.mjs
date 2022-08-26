import {
  __commonJS,
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField,
  __toESM,
  init_define_process
} from "./chunk-chunk-532LUWKD.mjs";

// (disabled):os
var require_os = __commonJS({
  "(disabled):os"() {
    init_define_process();
  }
});

// js/startMonaco.ts
init_define_process();

// package.json
var dependencies = {
  "@emotion/react": "^11.10.0",
  "@emotion/serialize": "^1.1.0",
  "@emotion/styled": "11.10.0",
  "@mui/material": "5.10.2",
  "@types/react": "18.0.17",
  "@types/react-dom": "18.0.6",
  "ace-builds": "1.9.6",
  "async-mutex": "0.3.2",
  "big-integer": "1.6.51",
  "clean-stack": "^4.2.0",
  csstype: "^3.1.0",
  "es-module-shims": "1.5.17",
  "esbuild-wasm": "0.15.5",
  "fast-diff": "1.2.0",
  "framer-motion": "7.2.1",
  immutable: "4.1.0",
  "lodash.debounce": "4.0.8",
  "lodash.throttle": "4.1.1",
  "monaco-editor": "0.34.0",
  "p-map": "5.5.0",
  preact: "10.10.6",
  "preact-render-to-string": "5.2.2",
  prettier: "2.7.1",
  "prop-types": "^15.8.1",
  qrious: "^4.0.2",
  react: "^18.2.0",
  "react-dom": "^18.2.0",
  "react-qrious": "2.5.5",
  "react-reverse-portal": "^2.1.1",
  tslib: "^2.4.0"
};

// js/startMonaco.ts
import { Uri } from "monaco-editor";

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
    __publicField(this, "name", "AggregateError");
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

// js/startMonaco.ts
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker.js?worker";
var version = dependencies["monaco-editor"];
var started = false;
var monacoContribution = async (typescript, editor, code) => {
  typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
  typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: location.origin + "/live/",
    target: typescript.ScriptTarget.ESNext,
    lib: [
      "dom",
      "dom.iterable",
      "esnext"
    ],
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
    moduleResolution: typescript.ModuleResolutionKind.NodeJs,
    declaration: false,
    module: typescript.ModuleKind.ESNext,
    noEmitOnError: true,
    maxNodeModuleJsDepth: 10,
    jsxImportSource: "@emotion/react",
    jsx: typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: true
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
    editor.createModel(
      await fetch(extraModel).then((res) => res.text()),
      "typescript",
      Uri.parse(extraModel)
    );
  }
  (async () => {
    const { dtsFiles } = await import("./chunk-types-DB62PIL7.mjs");
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
      emotionReactDts,
      emotionReactCssPropDts,
      emotionReactHelperDts,
      emotionThemingDts,
      emotionSerializeDts,
      emotionUtilsDts
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
        url: emotionReactDts,
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
        url: emotionReactCssPropDts,
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/react/helper",
        url: emotionReactHelperDts,
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/serialize",
        url: emotionSerializeDts,
        depend: ["@emotion/utils", "csstype"]
      },
      {
        name: "@emotion/utils",
        url: emotionUtilsDts,
        depend: []
      },
      {
        name: "framer-motion",
        url: framerDts,
        depend: ["popmotion"]
      }
    ];
    try {
      const mapper = async ({ name, url }) => typescript.typescriptDefaults.addExtraLib(
        await (await fetch(
          url
        )).text(),
        location.origin + `/live/${name}.d.ts`
      );
      await pMap(importHelper, mapper, { concurrency: 2 });
    } catch {
      console.error("Error in loading d.td");
    }
    typescript.typescriptDefaults.setEagerModelSync(true);
    typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
  })();
};
window.MonacoEnvironment = {
  getWorker: function(_workerId, label) {
    if (label === "typescript" || label === "javascript") {
      return tsWorker();
    }
    return editorWorker();
  }
};
var startMonaco = async ({ code, container, name }) => {
  const { languages, editor } = await import("monaco-editor");
  const returnModules = {
    editor: {},
    monaco: { editor, languages, Uri }
  };
  console.log("monaco-editor");
  if (!started)
    started = true;
  else
    return returnModules;
  const innerStyle = document.createElement("style");
  innerStyle.innerText = `@import url(/npm:monaco-editor@${version}/?css);`;
  container.appendChild(innerStyle);
  await monacoContribution(languages.typescript, editor, code);
  returnModules.editor = editor.create(container, {
    model: editor.createModel(
      code,
      "typescript",
      Uri.parse(location.origin + "/live/" + name + ".tsx")
    ),
    language: "typescript",
    scrollbar: {
      scrollByPage: false,
      alwaysConsumeMouseWheel: false
    },
    scrollBeyondLastLine: false,
    scrollPredominantAxis: false,
    smoothScrolling: true,
    suggest: {
      insertMode: "replace",
      filterGraceful: true,
      snippetsPreventQuickSuggestions: true,
      localityBonus: true,
      shareSuggestSelections: true,
      showIcons: true,
      showStatusBar: false,
      preview: true,
      previewMode: "prefix",
      showInlineDetails: true,
      showMethods: true,
      showFunctions: true,
      showConstructors: true,
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
    definitionLinkOpensInPeek: true,
    theme: "vs-dark",
    autoClosingBrackets: "beforeWhitespace"
  });
  return returnModules;
};
export {
  startMonaco
};
//# sourceMappingURL=chunk-startMonaco-BW455FQV.mjs.map
