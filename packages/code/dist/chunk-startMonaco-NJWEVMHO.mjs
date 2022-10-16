import {
  init_define_process
} from "./chunk-chunk-5VN25EFX.mjs";
import {
  __spreadValues
} from "./chunk-chunk-72WFF2DN.mjs";

// js/startMonaco.ts
init_define_process();

// js/monacoWorkers.mjs
init_define_process();

// js/monaco-workers/language/typescript/ts.workerJs.js
var ts_workerJs_default = "./chunk-ts.workerJs-ZFAKEJYP.js";

// js/monaco-workers/language/json/json.workerJs.js
var json_workerJs_default = "./chunk-json.workerJs-O5IMJVSK.js";

// js/monaco-workers/language/css/css.workerJs.js
var css_workerJs_default = "./chunk-css.workerJs-HKX47AK3.js";

// js/monaco-workers/language/html/html.workerJs.js
var html_workerJs_default = "./chunk-html.workerJs-QMP2W336.js";

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
self.MonacoEnvironment = {
  baseUrl: location.origin,
  getWorkerUrl
};
var mod = {};
var startMonaco = async ({ code, container, name }) => {
  const tsD = await Promise.all([
    import("./chunk-editor.api-F2LDHCVY.mjs"),
    import("./chunk-editor.all-X222YROY.mjs"),
    import("./chunk-typescript.contribution-4ILHBLWW.mjs"),
    import("./chunk-monaco.contribution-5BUUCS3C.mjs")
  ]);
  const { editor, languages, Uri } = tsD[0];
  const create = editor.create;
  const createModel = editor.createModel;
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
      Uri.parse(`${location.origin}/live/${codeSpace}.tsx`)
    );
    const editor2 = create(container2, {
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
    requestAnimationFrame(async () => {
      const { wait } = await import("./chunk-wait-T732MTVE.mjs");
      while (!globalThis.ts) {
        await wait(1e3);
      }
      console.log("globalThis.ts is defined, whoooo");
      const { setupTypeAcquisition } = await import("./chunk-dist-WJDHTJW5.mjs");
      setupTypeAcquisition({
        typescript: globalThis.ts,
        fetcher: async (...args) => {
          console.log("YEAH IT WANTS TO FETCH", __spreadValues({}, args));
          return new Response("OK");
        },
        projectName: codeSpace,
        delegate: {
          started: () => console.log("ATA Started"),
          progress: (downloaded, estimatedTotal) => console.log({ downloaded, estimatedTotal })
        }
      })(code2);
    });
    return {
      getTypeScriptWorker: async () => languages.typescript.getTypeScriptWorker(),
      setValue: (code3) => {
        let state = null;
        try {
          state = editor2.saveViewState();
        } catch (e) {
          console.error("error while saving the state");
        }
        model.setValue(code3);
        if (state) {
          editor2.restoreViewState(state);
        }
      },
      model
    };
  }
  async function monacoContribution(code2) {
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
      traceResolution: true,
      moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
      moduleSpecifierCompletion: 2,
      declaration: true,
      module: languages.typescript.ModuleKind.CommonJS,
      noEmitOnError: true,
      sourceMap: true,
      mapRoot: location.origin + "/src/sourcemaps",
      maxNodeModuleJsDepth: 10,
      rootDir: location.origin + "/live",
      paths: {
        [location.origin + "/live/node_modules/"]: [location.origin + "/*"],
        [location.origin + "/live/*"]: [location.origin + "/live/*"],
        [location.origin + "*"]: [location.origin + "/*"],
        [location.origin + "/node_modules/*"]: [location.origin + "/*"],
        [location.origin + "node_modules/*"]: [location.origin + "/*"],
        [location.origin + "/*"]: [location.origin + "/*"],
        [location.origin + "^/*"]: [location.origin + "/*"]
      },
      typeRoots: [
        location.origin + "/@types/",
        location.origin + "/unpkg/@types/",
        location.origin + "/",
        location.origin + "/unpkg:/"
      ],
      jsxImportSource: "@emotion/react",
      jsx: languages.typescript.JsxEmit.ReactJSX,
      allowUmdGlobalAccess: false,
      include: [location.origin + "/node_modules"]
    });
    const regex1 = / from '\.\./gi;
    const regex2 = / from '\./gi;
    const search = new RegExp(
      ` from '(${location.origin}/)?live/[a-zA-Z]+`,
      "gm"
    );
    const replaced = code2.replaceAll(regex1, ` from '${location.origin}/live`).replaceAll(regex2, ` from '${location.origin}/live`);
    const models = replaced.matchAll(search);
    for (const match of models) {
      console.log("***** EXTRA MODELS *****");
      const extraModel = new URL(match[0].slice(7) + ".tsx", location.origin).toString();
      console.log(extraModel);
      createModel(
        await fetch(extraModel).then(async (res) => res.text()),
        "typescript",
        Uri.parse(extraModel)
      );
      return replaced;
    }
    (async () => {
      const { dtsFiles } = await import("./chunk-types-YMSNMYS5.mjs");
      const {
        reactDts,
        jsxRuntimeDts,
        emotionReactDts,
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
          url: emotionReactDts,
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
        const mapper = async ({ name: name2, url, force }) => (code2.indexOf(name2) !== -1 || force) && languages.typescript.typescriptDefaults.addExtraLib(
          await (await fetch(
            url
          )).text(),
          location.origin + `/node_modules/${name2}/index.d.ts`
        );
        const pMap = (await import("./chunk-p-map-IPQ7GTZV.mjs")).default;
        await pMap(importHelper, mapper, { concurrency: 2 });
      } catch (e) {
        console.error("Error in loading d.ts");
      }
      languages.typescript.typescriptDefaults.setEagerModelSync(true);
      languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSuggestionDiagnostics: false,
        noSemanticValidation: false,
        noSyntaxValidation: false
      });
    })();
    return code2;
  }
};
export {
  startMonaco
};
