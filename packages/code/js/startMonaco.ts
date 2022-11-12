// import * as Comlink from "comlink";

import "monaco-editor/esm/vs/editor/editor.all";
import { editor, languages, Uri } from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution";
import "monaco-editor/esm/vs/language/typescript/monaco.contribution";

// import "monaco-editor/min/vs/basic-languages/typescript/typescript";
// import "monaco-editor/min/vs/language/typescript/tsMode";
// import { setupTypeAcquisition } from "@typescript/ata";
// import pMap from "p-map";

import * as w from "./monacoExtra";
// import {w} from "mextra.mjs";
import { getWorkerUrl } from "./monacoWorkers.mjs";
// Import {  createModel } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneEditor'
// import { languages, Uri, editor} from 'monaco-editor/esm/vs/editor/editor.api'
// const {createModel} = editor
const create = editor.create;
// const languages = monaco.languages;
const createModel = editor.createModel;
// const Uri = monaco.Uri;

let codeSpace = "";

const originToUse = location.origin.includes("spike")
  ? location.origin
  : "https://testing.spike.land/";

// Object.assign(globalThis, { setupTypeAcquisition });
const lib = [
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
  "webworker.iterable",
];

const monacoContribution = async (
  code: string,
) => {
  // Const {typescript} = languages;

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
      [originToUse + "^/*"]: [originToUse + "/*"],
    },
    typeRoots: [
      originToUse + "/@types/",
      originToUse + "/unpkg/@types/",
      originToUse + "/",
      originToUse + "/unpkg:/",
    ],

    jsxImportSource: "@emotion/react",
    jsx: languages.typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: false,
    include: [originToUse + "/node_modules"],
  });

  languages.typescript.typescriptDefaults.setEagerModelSync(true);
  // })();

  // languages.typescript.getTypeScriptWorker().then(ts=>setupTypeAcquisition({
  //   typescript: ts
  // })(code));

  return code;
};

self.MonacoEnvironment = {
  baseUrl: originToUse,
  getWorkerUrl,
};

const mod: Record<string, Record<string, unknown>> = {};

export const startMonaco = async (
  { code, container, name, onChange }: {
    code: string;
    container: HTMLDivElement;
    name: string;
    onChange: (_code: string) => void;
  },
) => {
  editor.getEditors().map((x) => x.dispose());
  // editor.getModels().map(x => x.dispose());
  codeSpace = name;
  //  console.log({code, container, name});
  if (mod[name]) {
    return mod[name] as unknown as typeof returnValue;
  }

  const returnValue = await startMonacoPristine({ code, container, name });
  // mod[name] = returnValue;

  async function startMonacoPristine(
    { code, container }: {
      code: string;
      container: HTMLDivElement;
      name: string;
    },
  ) {
    // If (mod[name]) return mod[name];

    // Const innerStyle = document.createElement("style");
    // monacoCss
    // innerStyle.innerText = `@import url(${originToUse}/npm:/monaco-editor@${version}/?css);`;
    // container.appendChild(innerStyle);

    const replaced = await monacoContribution(
      code,
    );

    // Editor.createModel(JSON.stringify(packageJson) , "json", Uri.parse(`${originToUse}/package.json`))
    // languages.typescript.typescriptDefaults.inlayHintsOptions

    languages.typescript.typescriptDefaults
      .setDiagnosticsOptions({
        noSuggestionDiagnostics: true,
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });

    const uri = Uri.parse(`${originToUse}/live/${codeSpace}/index.tsx`);

    const model = editor.getModel(uri) || createModel(
      replaced,
      "typescript",
      uri,
    );

    // const shadowRoot = container.attachShadow({
    //   mode: "closed",
    // });

    // const innerContainer = document.createElement("div");

    // innerContainer.style.width = "100%";
    // innerContainer.style.display = "block";
    // innerContainer.style.height = "100%";

    // const target = shadowRoot.appendChild(innerContainer);

    // const innerStyle = document.createElement("style");
    // innerStyle.innerText = `@import "/Editor.css";`;
    // shadowRoot.appendChild(innerStyle);
    //
    const target = container;

    const myEditor = create(target, {
      model,
      scrollbar: {
        scrollByPage: false,
        alwaysConsumeMouseWheel: false,
      },
      scrollBeyondLastLine: true,
      scrollPredominantAxis: false,

      smoothScrolling: true,
      suggest: {
        /**
         * Overwrite word ends on accept. Default to false.
         */
        insertMode: "replace",
        /**
         * Enable graceful matching. Defaults to true.
         */
        filterGraceful: false,
        /**
         * Prevent quick suggestions when a snippet is active. Defaults to true.
         */
        snippetsPreventQuickSuggestions: false,
        /**
         * Favors words that appear close to the cursor.
         */
        localityBonus: true,
        /**
         * Enable using global storage for remembering suggestions.
         */
        shareSuggestSelections: true,
        /**
         * Enable or disable icons in suggestions. Defaults to true.
         */
        showIcons: true,
        /**
         * Enable or disable the suggest status bar.
         */
        showStatusBar: true,
        /**
         * Enable or disable the rendering of the suggestion preview.
         */
        preview: true,
        /**
         * Configures the mode of the preview.
         */
        previewMode: "subwordSmart",
        /**
         * Show details inline with the label. Defaults to true.
         */
        showInlineDetails: true,

        /**
         * Show method-suggestions.
         */
        showMethods: true,
        /**
         * Show function-suggestions.
         */
        showFunctions: true,
        /**
         * Show constructor-suggestions.
         */
        showConstructors: true,
        /**
         * Show deprecated-suggestions.
         */

        /**
         * Show field-suggestions.
         */
        showFields: true,

        /**
         * Show color-suggestions.
         */
        showColors: true,
        /**
         * Show file-suggestions.
         */
        showFiles: true,
        /**
         * Show reference-suggestions.
         */
        showReferences: true,
        /**
         * Show folder-suggestions.
         */
        showFolders: true,
        /**
         * Show typeParameter-suggestions.
         */
        showTypeParameters: true,
        /**
         * Show issue-suggestions.
         */
        showIssues: true,
        /**
         * Show user-suggestions.
         */
        showUsers: true,
        /**
         * Show snippet-suggestions.
         */
        showSnippets: true,
      },

      automaticLayout: true,

      useShadowDOM: false,

      roundedSelection: true,
      //  Editing: true,
      bracketPairColorization: {
        independentColorPoolPerBracketType: true,
        enabled: true,
      },
      // bracketPairGuides: {
      //   bracketPairs: true,
      //   bracketPairsHorizontal : true,
      //   highlightActiveBracketPair: true,
      //   indentation: true,
      //   highlightActiveIndentation:  'always'
      // },
      codeLens: true,
      "semanticHighlighting.enabled": true,
      dragAndDrop: true,
      codeActionsOnSaveTimeout: 300,
      dropIntoEditor: { enabled: true },
      // GotoLocation: true,]]
      mouseStyle: "default",
      definitionLinkOpensInPeek: true,
      theme: "vs-dark",
      autoClosingBrackets: "beforeWhitespace",
    });

    languages.typescript.typescriptDefaults.setEagerModelSync(true);
    setTimeout(() => w.extraStuff(code, uri, languages.typescript), 1000);

    const mod = {
      model,
      getValue: () => model.getValue(),
      silent: false,
      getErrors: async () => {
        return (await (await languages.typescript.getTypeScriptWorker())(uri)).getSuggestionDiagnostics(uri.toString())
          .then((diag) => diag.map((d) => d.messageText.toString()))
          .catch(
            (e) => {
              console.log("ts error, will retry", e);
            },
          );
      },
      setValue: (code: string) =>
        ((mod) => {
          mod.silent = true;
          let state = null;
          try {
            console.log("trying to change code");
            try {
              state = myEditor.saveViewState();
            } catch {
              console.error("error while saving monaco state");
            }

            console.log("trying to change code");
            mod.model.setValue(code);
            if (state) {
              myEditor.restoreViewState(state);
            }
          } catch {
            console.error("error while saving the state");
          } finally {
            mod.silent = false;
          }
        })(mod),
    };

    model.onDidChangeContent(() => {
      if (mod.silent) return;
      onChange(model.getValue());
    });

    return mod;
  }
};
