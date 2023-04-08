import "monaco-editor/esm/vs/editor/edcore.main";
import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution";
import type {} from "monaco-editor";
import { editor, languages, Uri } from "monaco-editor";
import { language as tsxMonarchRules } from "monaco-editor/esm/vs/basic-languages/typescript/typescript.js";
import { ata, prettier } from "./shared";

const { createModel } = editor;
const create = editor.create;
const originToUse = location.origin;

languages.register({ id: "tsx" });

// Update the tokenizer to support TSX syntax
tsxMonarchRules.tokenizer.root = [
  ...tsxMonarchRules.tokenizer.root,
  [/<\s*[\w]+/, "tag"],
  [/<\s*\/\s*[\w]+\s*>/, "tag"],
];

// Register a tokens provider for the new language
languages.setMonarchTokensProvider("tsx", tsxMonarchRules);

const lib = [
  "dom",
  "dom.iterable",
  "es2015",
  "es2016",
  "esnext",
];
function fetchAndCreateExtraModels(
  code: string,
  originToUse: string,
): Promise<any>[] {
  const extraModels: Promise<any>[] = [];
  const search = new RegExp(
    ` from "(${originToUse})?/live/[a-zA-Z0-9\-\_]+`,
    "gm",
  );

  const models = code.matchAll(search);
  for (const match of models) {
    const codeSpace = match[0].split("/live/").pop();
    const extraModel = new URL(
      `/live/${codeSpace}/index.tsx`,
      originToUse,
    ).toString();

    const mUri = Uri.parse(`${originToUse}/live/${codeSpace}/index.tsx`);

    extraModels.push(
      fetch(extraModel)
        .then((res) => res.text())
        .then((content) => {
          editor.getModel(mUri) || createModel(content, "tsx", mUri);
          return true;
        }),
    );
  }

  return extraModels;
}

const monacoContribution = (code: string) => {
  languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: originToUse,
    target: languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
    module: languages.typescript.ModuleKind.CommonJS,
    importHelpers: true,
    lib,
    allowJs: true,
    skipLibCheck: false,
    downlevelIteration: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    forceConsistentCasingInFileNames: true,
    noFallthroughCasesInSwitch: true,
    resolveJsonModule: true,
    noEmit: true,
    traceResolution: true,
    declaration: true,
    noEmitOnError: true,
    sourceMap: true,
    maxNodeModuleJsDepth: 20,
    rootDir: `${originToUse}/`,
    paths: {
      "tslib": ["/*tslib?bundle=true"],
    },
    jsxImportSource: "@emotion/react",
    jsx: languages.typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: false,
    include: [`${originToUse}/`],
  });

  const extraModels = fetchAndCreateExtraModels(code, originToUse);

  ata({ code, originToUse }).then(async (extraLibs) => {
    languages.typescript.typescriptDefaults.setExtraLibs(extraLibs);

    if (extraModels.length) await Promise.all(extraModels);

    languages.typescript.typescriptDefaults
      .setDiagnosticsOptions({
        noSuggestionDiagnostics: false,
        noSemanticValidation: false,
        noSyntaxValidation: false,
        diagnosticCodesToIgnore: [2691],
      });
    languages.typescript.typescriptDefaults.setEagerModelSync(true);
  });

  // })();

  // languages.typescript.getTypeScriptWorker().then(ts=>setupTypeAcquisition({
  //   typescript: ts
  // })(code));

  // return code.split(";\n").map((x) =>
  // x.slice(0, 6) === "import"
  // ? x.replace(`from '/live/`, `from '${originToUse}/live/`)
  // : x
  // ).join(";\n");
  return code;
};

self.MonacoEnvironment = {
  baseUrl: originToUse,
  getWorkerUrl: (_: string, label: string) => {
    if (label === "json") {
      return `${originToUse}/language/json/json.js`;
    }

    if (label === "css" || label === "scss" || label === "less") {
      return `${originToUse}/language/css/css.js`;
    }

    if (label === "html" || label === "handlebars" || label === "razor") {
      return `${originToUse}/language//html/html.js`;
    }

    if (label === "typescript" || label === "javascript" || label === "tsx") {
      return `${originToUse}/workerScripts/ts.worker.js`;
    }

    return `${originToUse}/editor/editor.js`;
  },
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
  const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
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
      diagnosticCodesToIgnore: [2691],
    });

  // startMonaco.

  const uri = Uri.parse(`${originToUse}/live/${codeSpace}/index.tsx`);

  const model = editor.getModel(uri) || createModel(
    replaced,
    "tsx",
    uri,
  );

  const myEditor = create(container, {
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
      filterGraceful: true,
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

    useShadowDOM: false,
    tabSize: 2,
    insertSpaces: true,

    contextmenu: true,
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
  //  languages.typescript.typescriptDefaults.setEagerModelSync(true);

  // setTimeout(() => w.extraStuff(code, uri, languages.typescript), 1000);

  // const memoryCache = localForage.createInstance({
  //   name: "model-" + codeSpace,
  // });

  let ctr = new AbortController();

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
    isEdit: false,
    setValue: (code: string) => {
      myEditor.getDomNode()?.blur();
      // console.log("setValue! ", code);
      if (mod.isEdit) return;
      mod.silent = true;
      let state = null;
      try {
        // console.log("trying to change code");
        try {
          state = myEditor.saveViewState();
        } catch {
          console.error("error while saving monaco state");
        }

        // console.log("changing the code!");
        model.setValue(code);
        if (state) {
          myEditor.restoreViewState(state);
        }
      } catch {
        console.error("error while saving the state");
      } finally {
        setTimeout(() => {
          mod.silent = false;
        }, 500);
      }
    },
  };
  myEditor.getDomNode()?.blur();

  myEditor.onDidFocusEditorText(() => {
    mod.isEdit = true;
    ctr.abort();
    ctr = new AbortController();
    setTimeout(() => {
      if (ctr.signal.aborted) return;
      mod.isEdit = false;
    }, 200);
  });
  myEditor.onDidBlurEditorText(async () => {
    mod.setValue(await prettier(model.getValue()));
    mod.isEdit = true;
  });

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
  BC.onmessage = (
    { data }: { data: { changes?: editor.IModelContentChange[] } },
  ) => {
    if (mod.silent) return;
    if (data.changes) {
      mod.silent = true;
      model.applyEdits(data.changes);
      mod.silent = false;
    }
  };

  model.onDidChangeContent((_ev) => {
    mod.isEdit = true;
    ctr.abort();
    ctr = new AbortController();

    setTimeout(() => {
      if (ctr.signal.aborted) return;
      mod.isEdit = false;
    }, 1000);
    // globalThis[codeSpace].model = myEditor.getModel();
    // globalThis[codeSpace].viewState = myEditor.saveViewState();
    if (!mod.silent) {
      onChange(model.getValue());
      // BC.postMessage(JSON.parse(JSON.stringify({ changes: ev.changes })));
    }
    // console.log({ version: model.getVersionId(), ev });
  });

  return mod;
}
