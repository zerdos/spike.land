import {
  __commonJS,
  __toESM,
  init_define_process
} from "./chunk-chunk-JAPAFYDL.mjs";

// (disabled):os
var require_os = __commonJS({
  "(disabled):os"() {
    init_define_process();
  }
});

// js/startMonaco.ts
init_define_process();

// package.json
var package_default = {
  name: "@spike.land/code",
  version: "0.9.1",
  description: "spike.land",
  type: "module",
  entry: "./index.js",
  source: "index.js",
  main: "public/static/bundle.mjs",
  files: [
    "**/*"
  ],
  exports: {
    "./package.json": "./package.json",
    "./js/starter.ts": "./js/starter.ts",
    "./js/rtc.ts": "./js/rtc.ts",
    "./js/session": {
      import: "./dist/session.mjs",
      node: "./dist/session.js"
    },
    "./js/textDiff": "./js/textDiff.ts",
    "./js/esbuildEsm": "./js/esbuildEsm.ts",
    "./js/binary": "./js/binary.ts",
    "./js/importmap.json": "./js/importmap.json",
    "./js/mockedMap.json": "./js/mockedMap.json",
    "./shasums": "./shasums.ts"
  },
  scripts: {
    test: "uvu -r esbuild-register tests",
    typecheck: "cd monorepo/packages/code && yarn tsc",
    clean: "rm -rf .tsBuildInfo js/vendor && js/vendor && yarn favicons",
    "build:sw": "esbuild --outfile=../sites/spike.land/public/sw.js --platform=browser --bundle --minify ./js/sw.js && yarn sw",
    start: "cd ../../.. && yarn start",
    push: "cd ../../.. && yarn push",
    "build:preact": "esbuild --bundle js/preact.ts  --target=esnext --minify --format=esm --platform=browser  --outfile=../../sites/spike.land/public/react.mjs",
    "build:orbit-db": "esbuild --bundle js/preact.ts  --target=esnext --minify --format=esm --platform=browser  --outfile=../../sites/spike.land/public/react.mjs",
    "build:framer-motion": 'yarn esbuild --bundle js/motion.tsx  --target=esnext --minify --format=esm  --platform=browser  --define:process.env.NODE_ENV=\\"production\\" --external:react --external:@emotion/is-prop-valid  --external:react --outfile=../../sites/spike.land/public/framer-motion.mjs',
    "build:emotion": 'esbuild --bundle js/emotion.tsx  --target=esnext --format=esm --external:react --external:react/jsx-runtime --platform=browser --define:process.env.NODE_ENV=\\"production\\" --outfile=../../sites/spike.land/public/emotion.mjs',
    prebuild: "yarn test || echo FAILED",
    build: "rm -rf dist && yarn favicons && node esbuild-dev.mjs",
    favicons: "cp -af js/assets/favicons/. ./dist && mkdir -p  ../../sites/spike.land/public/assets && cp js/assets/synthwave.webp   ../../sites/spike.land/public/assets/",
    "workbox-cli": "workbox-cli",
    sw: "echo ok",
    xsw: "yarn workbox injectManifest workbox-config.json"
  },
  keywords: [
    "monaco",
    "editor",
    "react",
    "typescript",
    "html",
    "vscode"
  ],
  authors: [
    "Zoltan Erdos <zolika84@gmail.com>"
  ],
  bugs: {
    url: "https://github.com/zerdos/spike.land"
  },
  homepage: "/",
  repository: "https://github.com/zerdos/spike.land",
  author: "Zoltan Erdos <zolika84@gmail.com>",
  license: "BSD-3-Clause",
  publishConfig: {
    access: "public"
  },
  dependencies: {
    "@emotion/css-prettifier": "^1.1.0",
    "@emotion/react": "^11.10.4",
    "@emotion/serialize": "^1.1.0",
    "@emotion/styled": "11.10.4",
    "@mui/material": "5.10.3",
    "@types/react-dom": "18.0.6",
    "ace-builds": "1.9.6",
    "async-mutex": "0.3.2",
    "big-integer": "1.6.51",
    "clean-stack": "^4.2.0",
    comlink: "^4.3.1",
    csstype: "^3.1.0",
    "es-module-shims": "^1.5.17",
    "esbuild-wasm": "0.15.6",
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
  },
  devDependencies: {
    "@types/events": "^3.0.0",
    "@types/lodash.debounce": "^4.0.7",
    "@types/lodash.throttle": "^4.1.7",
    "@types/node": "18.7.14",
    "@types/prettier": "2.7.0",
    "@types/react": "^18.0.18",
    "@types/xo": "^0.39.3",
    esbuild: "^0.15.6",
    "esbuild-plugin-import-map": "2.1.0",
    typescript: "4.8.2",
    uvu: "0.5.6",
    xo: "^0.52.2"
  },
  gitHead: "445587aa294dbba9f178dd8b7f2979878bd92a2c"
};

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
var AggregateError = class extends Error {
  #errors;
  name = "AggregateError";
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
    this.#errors = errors;
  }
  get errors() {
    return this.#errors.slice();
  }
};

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
var version = package_default.dependencies["monaco-editor"];
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
  "es2018.asynciterable",
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
var monacoContribution = async (typescript, editor, Uri, code) => {
  typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true
  });
  typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: location.origin + "/",
    target: typescript.ScriptTarget.ESNext,
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
    moduleResolution: typescript.ModuleResolutionKind.NodeJs,
    moduleSpecifierCompletion: 2,
    declaration: true,
    module: typescript.ModuleKind.CommonJS,
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
    typeRoots: [location.origin + "/npm:/@types/", location.origin + "/unpkg/@types/", location.origin + "/npm:/", location.origin + "/unpkg:/"],
    jsxImportSource: "@emotion/react",
    jsx: typescript.JsxEmit.ReactJSX,
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
    editor.createModel(
      await fetch(extraModel).then((res) => res.text()),
      "typescript",
      Uri.parse(extraModel)
    );
  }
  (async () => {
    const { dtsFiles } = await import("./chunk-types-KHUWRLXM.mjs");
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
    typescript.typescriptDefaults.addExtraLib(
      await (await fetch(
        "/node_modules/framer-motion/package.json"
      )).text(),
      location.origin + `/node_modules/framer-motion/package.json`
    );
    try {
      const mapper = async ({ name, url }) => typescript.typescriptDefaults.addExtraLib(
        await (await fetch(
          url
        )).text(),
        location.origin + `/node_modules/${name}/index.d.ts`
      );
      await pMap(importHelper, mapper, { concurrency: 2 });
    } catch {
      console.error("Error in loading d.ts");
    }
    typescript.typescriptDefaults.setEagerModelSync(true);
    typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
  })();
  return code;
};
window.MonacoEnvironment = {
  getWorker: async function(_workerId, label) {
    if (label === "typescript" || label === "javascript") {
      const tsWorker = (await import("monaco-editor/esm/vs/language/typescript/ts.worker?worker")).default;
      return tsWorker();
    }
    if (label === "json") {
      const jsonWorker = (await import("monaco-editor/esm/vs/language/json/json.worker?worker")).default;
      return jsonWorker();
    }
    const editorWorker = (await import("monaco-editor/esm/vs/editor/editor.worker?worker")).default;
    return editorWorker();
  }
};
var startMonaco = async ({ code, container, name }) => {
  const { languages, editor, Uri } = await import("monaco-editor");
  const codeSpace = name;
  const innerStyle = document.createElement("style");
  innerStyle.innerText = `@import url(${location.origin}/npm:/monaco-editor@${version}/?css);`;
  container.appendChild(innerStyle);
  const replaced = await monacoContribution(languages.typescript, editor, Uri, code);
  editor.createModel(JSON.stringify(package_default), "json", Uri.parse(`${location.origin}/package.json`));
  const model = editor.createModel(
    replaced,
    "typescript",
    Uri.parse(`${location.origin}/live/${codeSpace}.tsx`)
  );
  return {
    editor: editor.create(container, {
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
      bracketPairColorization: { independentColorPoolPerBracketType: true, enabled: true },
      codeLens: true,
      "semanticHighlighting.enabled": true,
      dragAndDrop: true,
      codeActionsOnSaveTimeout: 300,
      dropIntoEditor: { enabled: true },
      mouseStyle: "copy",
      definitionLinkOpensInPeek: true,
      theme: "vs-dark",
      autoClosingBrackets: "beforeWhitespace"
    }),
    model,
    monaco: { editor, languages, Uri }
  };
};
export {
  startMonaco
};
