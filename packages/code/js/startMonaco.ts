// import localForage from "localforage";

import * as monaco from "monaco-editor";
const { editor, languages, Uri } = monaco;
import { RpcProvider } from "worker-rpc";

// import * as w from "./monacoExtra";
import { getWorkerUrl } from "./monacoWorkers.mjs";

const { createModel } = editor;
const create = editor.create;
const originToUse = window.origin.includes("spike")
  ? location.origin
  : "https://testing.spike.land/";

// Object.assign(globalThis, { setupTypeAcquisition });
const lib = [
  "dom",
  "dom.iterable",
  // "es2015.collection",
  // "es2015.core",
  "es2015",
  // "es2015.generator",
  // "es2015.iterable",
  // "es2015.promise",
  // "es2015.proxy",
  // "es2015.reflect",
  // "es2015.symbol",
  // "es2015.symbol.wellknown",
  // "es2016.array.include",
  "es2016",
  // "es2016.full",
  // "es2017",
  // "es2017.full",
  // "es2017.intl",
  // "es2017.object",
  // "es2017.sharedmemory",
  // "es2017.string",
  // "es2017.typedarrays",
  // "es2018.asyncgenerator",
  // "es2018.asynciterator",
  // "es2018",
  // "es2018.full",
  // "es2018.intl",
  // "es2018.promise",
  // "es2018.regexp",
  // "es2019.array",
  // "es2019",
  // "es2019.full",
  // "es2019.object",
  // "es2019.string",
  // "es2019.symbol",
  // "es2020.bigint",
  // "es2020",
  // "es2020.full",
  // "es2020.intl",
  // "es2020.promise",
  // "es2020.sharedmemory",
  // "es2020.string",
  // "es2020.symbol.wellknown",
  // "es2022",
  // "es2022.full",
  // "es2022.intl",
  // "es2022.promise",
  // "es2022.string",
  // "es2022.weakref",
  // "es5",
  // "es6",
  "esnext",
  // "webworker",
  // "webworker.importscripts",
  // "webworker.iterable",
];

const monacoContribution = async (
  code: string,
) => {
  // Const {typescript} = languages;

  languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: originToUse,
    target: languages.typescript.ScriptTarget.ESNext,

    importHelpers: true,
    typeRoots: ["/v99/@types", "/v99"],
    lib,
    allowJs: true,
    skipLibCheck: false,
    downlevelIteration: true,
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
    module: languages.typescript.ModuleKind.ESNext,
    noEmitOnError: true,
    sourceMap: false,
    maxNodeModuleJsDepth: 10,
    rootDir: originToUse + "/",
    paths: {},
    jsxImportSource: "@emotion/react",
    jsx: languages.typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: false,
    include: [originToUse + "/"],
  });

  const worker = new Worker("/ata.worker.js?" + globalThis.assetHash),
    rpcProvider = new RpcProvider(
      (message, transfer) => worker.postMessage(message, transfer),
    );

  worker.onmessage = e => rpcProvider.dispatch(e.data);

  rpcProvider
    .rpc("ata", { code, origin })
    .then(result => {
      languages.typescript.typescriptDefaults.setExtraLibs(result);
      languages.typescript.typescriptDefaults
        .setDiagnosticsOptions({
          noSuggestionDiagnostics: false,
          noSemanticValidation: false,
          noSyntaxValidation: false,
        });
    });

  languages.typescript.typescriptDefaults.setEagerModelSync(true);
  // })();

  // languages.typescript.getTypeScriptWorker().then(ts=>setupTypeAcquisition({
  //   typescript: ts
  // })(code));

  return code.split(";\n").map((x) =>
    x.slice(0, 6) === "import"
      ? x.replace(`from '/live/`, `from '${originToUse}/live/`)
      : x
  ).join(";\n");
};

self.MonacoEnvironment = {
  baseUrl: originToUse + "/",
  getWorkerUrl,
};

const mod: Record<string, Record<string, unknown>> = {};

export const startMonaco = async (
  { code, container, codeSpace, onChange }: {
    code: string;
    i: number;
    container: HTMLDivElement;
    codeSpace: string;
    onChange: (_code: string) => void;
  },
) =>
  mod[codeSpace] = mod[codeSpace]
    || await startMonacoPristine({ code, container, codeSpace, onChange });

//  editor.getEditors().map((x) => x.dispose());

// const returnValue = await startMonacoPristine({ code, container, codeSpace, onChange });
// mod[name] = returnValue;xp

async function startMonacoPristine(
  { code, container, codeSpace, onChange }: {
    code: string;
    container: HTMLDivElement;
    codeSpace: string;
    onChange: (_code: string) => void;
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

  // startMonaco.

  const uri = Uri.parse(`${originToUse}/live/${codeSpace}/index.tsx`);

  const model = editor.getModel(uri) || createModel(
    replaced,
    "typescript",
    uri,
  );

  const addExtraM = async () => {
    const search = new RegExp(
      ` from '(${originToUse}/)?live/[a-zA-Z]+`,
      "gm",
    );

    // 0123456
    const models = replaced.matchAll(search);
    // Console.log("load more models", replaced, models);

    for (const match of models) {
      console.log("***** EXTRA MODELS *****");
      //
      const codeSpace = match[0].split("/live/").pop();
      const extraModel = new URL(
        "/live/" + codeSpace + "/index.tsx",
        originToUse,
      ).toString();

      const mUri = Uri.parse(`${originToUse}/live/${codeSpace}/index.tsx`);

      const content = await fetch(extraModel).then((res) => res.text());

      editor.getModel(mUri) || createModel(
        content,
        "typescript",
        mUri,
      );
    }

    // const globalUrl = `${originToUse}/node_modules/@types/react/global.d.ts`;

    // const globalDTS = await fetch(globalUrl).then(resp => resp.text());

    // const sharedWorker = new SharedWorker(
    //   "/sharedWorker.js?" + globalThis.assetHash,
    // );

    console.log("******");
    console.log("******");
    console.log("******");
    console.log("******");

    console.log("******");
    console.log("******");
    console.log("******");
    console.log("******");
    console.log("******");

    // sharedWorker.port.addEventListener("message", (e) => {
    //   if (e.data.type !== "ata") return;

    //   console.log("******");
    //   console.log("******");
    //   console.log({ data: e.data.extraLibs });

    //   console.log("******");
    //   console.log("******");

    //   languages.typescript.typescriptDefaults.setExtraLibs(e.data.extraLibs);
    //   languages.typescript.typescriptDefaults
    //     .setDiagnosticsOptions({
    //       noSuggestionDiagnostics: false,
    //       noSemanticValidation: false,
    //       noSyntaxValidation: false,
    //     });
    // });

    // sharedWorker.port.start();

    // sharedWorker.port.postMessage({ code, baseUrl: originToUse, type: "ata" });

    console.log("******");
    console.log("******");
    // console.log(e.data)});
    console.log("******");
    console.log("******");
    console.log("******");
    console.log("******");

    // const { run } = await import("./ata");

    // sharedWorker.port.start()
    // sharedWorker.port.postMessage({type: "ata", code, codeSpace, baseUrl: originToUse})
    // fetch(`${location.origin}/live/${codeSpace}/ata`).then(x => x.json()).then(x => {
    //   console.log({ x });
    //   languages.typescript.typescriptDefaults.setExtraLibs(
    //     [
    //       ...x.map((x: { filePath: string; content: string }) => ({
    //         content: x.content,
    //         filePath: originToUse + "/" + x.filePath,
    //       })),
    //       // {
    //       //   filePath: globalUrl,
    //       //   content: globalDTS,
    //       // },
    //     ],
    //   );
    // }).then(() =>
    //   languages.typescript.typescriptDefaults
    //     .setDiagnosticsOptions({
    //       noSuggestionDiagnostics: false,
    //       noSemanticValidation: false,
    //       noSyntaxValidation: false,
    //     })
    // );
  };

  // const container = document.getElementById('container');
  const shadowRoot = container.attachShadow({
    mode: "closed",
  });

  const innerContainer = document.createElement("div");
  shadowRoot.appendChild(innerContainer);
  innerContainer.style.width = "100%";
  innerContainer.style.height = "100%";

  const innerStyle = document.createElement("style");
  innerStyle.innerText = `@import "${originToUse}/node_modules/monaco-editor/min/vs/editor/editor.main.css";`;
  shadowRoot.appendChild(innerStyle);
  // const innerContainer = document.createElement("div");

  // innerContainer.style.width = "100%";
  // innerContainer.style.display = "block";
  // innerContainer.style.height = "100%";

  // const innerStyle = document.createElement("style");
  // innerStyle.innerText = `@import "/Editor.css";`;
  // shadowRoot.appendChild(innerStyle);
  //
  // const target = container;

  const myEditor = create(innerContainer, {
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
      snippetsPreventQuickSuggestions: true,
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
      showModules: true,

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
      showFolders: false,
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

    useShadowDOM: true,
    contextmenu: true,
    // dimension: true,

    experimental: {
      stickyScroll: {
        enabled: true,
      },
    },
    linkedEditing: true,
    stablePeek: true,
    roundedSelection: true,
    //  Editing: true,
    bracketPairColorization: {
      independentColorPoolPerBracketType: true,
      enabled: true,
    },
    // bracketPairGuides: {
    // bracketPairs: true,
    // bracketPairsHorizontal : true,
    // highlightActiveBracketPair: true,
    ///  indentation: true,
    // highlightActiveIndentation:  'always'
    // },
    codeLens: true,
    "semanticHighlighting.enabled": true,
    dragAndDrop: true,
    codeActionsOnSaveTimeout: 100,
    dropIntoEditor: { enabled: true },
    // GotoLocation: true,]]
    mouseStyle: "default",
    definitionLinkOpensInPeek: true,
    theme: "vs-dark",
    autoClosingBrackets: "beforeWhitespace",
  });
  // if (globalThis[codeSpace]){
  // globalThis[codeSpace]!.model  && myEditor.setModel( globalThis[codeSpace]!.model );
  //   globalThis[codeSpace].viewState && myEditor.restoreViewState(globalThis[codeSpace].viewState);
  // }
  languages.typescript.typescriptDefaults.setEagerModelSync(true);
  setTimeout(() => {
    addExtraM();
  }, 500);

  // setTimeout(() => w.extraStuff(code, uri, languages.typescript), 1000);

  // const memoryCache = localForage.createInstance({
  //   name: "model-" + codeSpace,
  // });
  myEditor.onDidBlurEditorText(() => console.log("blur"));
  const mod = {
    getValue: () => model.getValue(),
    silent: false,
    getErrors: async () => {
      return (await (await languages.typescript.getTypeScriptWorker())(uri))
        .getSuggestionDiagnostics(uri.toString())
        .then((diag) => diag.map((d) => d.messageText.toString()))
        .catch(
          (e) => {
            console.log("ts error, will retry", e);
          },
        );
    },
    setValue: (code: string) => {
      console.log("setValue! ", code);
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
        model.setValue(code);
        if (state) {
          myEditor.restoreViewState(state);
        }
      } catch {
        console.error("error while saving the state");
      } finally {
        mod.silent = false;
      }
    },
  };

  // let start = await memoryCache.getItem("start");

  // if (!start) {
  //   memoryCache.setItem("start", model.getValue());
  //   memoryCache.setItem("versionId", model.getVersionId());
  // } else {
  //   let i;
  //   const versionId = await memoryCache.getItem("versionId");
  //  const evs =await Promise.all( new Array(versionId).fill(0).map((_,i)=>memoryCache.getItem(i.toString())))
  //  evs.map(ev=>model.applyEdits(ev.changes));

  // }

  // globalThis[codeSpace] =  globalThis[codeSpace] = {model:  myEditor.getModel(),
  // viewState: myEditor.saveViewState()};

  model.onDidChangeContent((ev) => {
    // globalThis[codeSpace].model = myEditor.getModel();
    // globalThis[codeSpace].viewState = myEditor.saveViewState();

    console.log({ version: model.getVersionId(), ev });
    const val = model.getValue();
    fs.promises.unlink(`/live/${codeSpace}/index.tsx`).then(() =>
      fs.writeFile(`/live/${codeSpace}/index.tsx`, val, { mode: 755, encoding: "utf8" }, (err) => {
        console.error({ err });
      })
    );
    mod.silent == false && onChange(val);
  });

  return mod;
}
