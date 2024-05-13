import { editor, languages, Uri } from "monaco-editor";
import * as monaco from "monaco-editor";
import { ata, prettier } from "./shared";

const { createModel } = editor;
const create = editor.create;
const originToUse = location.origin;

const refreshAta = async(code: string, originToUse: string) =>{
  return await ata({ code, originToUse }).then(extraLibs => {
    console.log({ extraLibs });
    languages.typescript.typescriptDefaults.setExtraLibs(extraLibs);

    languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false,
      diagnosticCodesToIgnore: [2691],
    });
    languages.typescript.typescriptDefaults.setEagerModelSync(true);
  });
}

const lib = ["dom", "dom.iterable", "es2015", "es2016", "esnext"];

async function fetchAndCreateExtraModels(code: string, originToUse: string): Promise<void> {
  const search = new RegExp(` from "(${originToUse})?/live/[a-zA-Z0-9\-\_]+`, "gm");
  const models = code.matchAll(search);

  for (const match of models) {
    const codeSpace = match[0].split("/live/").pop();
    const extraModel = new URL(`/live/${codeSpace}/index.tsx`, originToUse).toString();
    const mUri = Uri.parse(`${originToUse}/live/${codeSpace}/index.tsx`);

    const res = await fetch(extraModel);
    const content = await res.text();
    editor.getModel(mUri) || createModel(content, "typescript", mUri);
  }
}

const monacoContribution = async (code: string) => {
  languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: originToUse,
    target: languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
    module: languages.typescript.ModuleKind.ESNext,
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
      "tslib": ["/tslib"],
    },
    jsxImportSource: "@emotion/react",
    jsx: languages.typescript.JsxEmit.ReactJSXDev,
    allowUmdGlobalAccess: false,
    include: [`${originToUse}/`],
  });

  await fetchAndCreateExtraModels(code, originToUse);

  languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true,
    diagnosticCodesToIgnore: [2691],
  });

  refreshAta(code, originToUse);

  return code;
};

self.MonacoEnvironment = {
  baseUrl: originToUse,
  getWorkerUrl: (_moduleId: string, label: string) => {
    if (label === "typescript" || label === "javascript") {
      return `${originToUse}/language/typescript/ts.worker.mjs`;
    }
    return `${originToUse}/editor/editor.worker.mjs`;
  },
};

const mod: Record<string, Record<string, unknown>> = {};

export const startMonaco = async ({
  code,
  container,
  codeSpace,
  onChange,
}: {
  code: string;
  container: HTMLDivElement;
  codeSpace: string;
  onChange: (_code: string) => void;
}) => {
  if (!mod[codeSpace]) {
    mod[codeSpace] = await startMonacoPristine({ code, container, codeSpace, onChange });
  }
  return mod[codeSpace];
};

async function startMonacoPristine({
  code,
  container,
  codeSpace,
  onChange,
}: {
  code: string;
  container: HTMLDivElement;
  codeSpace: string;
  onChange: (_code: string) => void;
}) {
  const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

  const replaced = await monacoContribution(code);
  const uri = Uri.parse(`${originToUse}/live/${codeSpace}/index.tsx`);
  const model = editor.getModel(uri) || createModel(replaced, "typescript", uri);

  const myEditor = create(container, {
    model,
    scrollbar: {
      scrollByPage: false,
      alwaysConsumeMouseWheel: false,
    },
    scrollBeyondLastLine: true,
    scrollPredominantAxis: true,
    automaticLayout: true,
    links: false,
    useShadowDOM: false,
    tabSize: 2,
    insertSpaces: true,
    bracketPairColorization: {
      independentColorPoolPerBracketType: true,
      enabled: true,
    },
    definitionLinkOpensInPeek: true,
    theme: "vs-dark",
    autoClosingBrackets: "languageDefined",
  });

  let ctr = new AbortController();

  const ttt = {
    checking: 0
  }
  
  const tsCheck = async () => {
    if (ttt.checking) return;
    ttt.checking = 1;
    console.log("tsCheck");
    const typeScriptWorker = await (await languages.typescript.getTypeScriptWorker())(uri);
    typeScriptWorker.getSyntacticDiagnostics(uri.toString()).then(syntacticDiagnostics=>syntacticDiagnostics.forEach((d) => console.error(d)));

    const semanticDiagnostics = await typeScriptWorker.getSemanticDiagnostics(uri.toString());
    let needNewAta = false;
    semanticDiagnostics.forEach(async (d) => {
      const message = d.messageText.toString();
      if (message.includes("Cannot find module")) {
        needNewAta = true;
       
      }
    });

    if (needNewAta)  await refreshAta(model.getValue(), originToUse);;

     await typeScriptWorker
      .getSuggestionDiagnostics(uri.toString())
      .then((diag) => diag.forEach((d) => console.error(d.messageText.toString())))
      .catch((e) => {
        console.log("ts error, will retry", e);
      });

      ttt.checking=0;
  };

  const mod = {
    getValue: () => model.getValue(),
    silent: false,
    getErrors: async () => {
      return (await (await languages.typescript.getTypeScriptWorker())(uri))
        .getSuggestionDiagnostics(uri.toString())
        .then((diag) => diag.map((d) => d.messageText.toString()))
        .catch((e) => {
          console.log("ts error, will retry", e);
        });
    },
    isEdit: false,
    setValue: (code: string) => {
      myEditor.getDomNode()?.blur();
      if (mod.isEdit) return;
      mod.silent = true;
      let state = null;
      try {
        state = myEditor.saveViewState();
        model.setValue(code);
        if (state) {
          myEditor.restoreViewState(state);
        }
      } catch (error) {
        console.error("Error while saving the state:", error);
      } finally {
        mod.silent = false;
        tsCheck();
        // setTimeout(() => {
        //   tsCheck();
        // }, 500);
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
    }, 50);
  });

  myEditor.onDidBlurEditorText(async () => {
    mod.setValue(await prettier(model.getValue()));
    mod.isEdit = true;
  });

  BC.onmessage = ({ data }: { data: { changes?: monaco.editor.IModelContentChange[] } }) => {
    if (mod.silent) return;
    if (data.changes) {
      mod.silent = true;
      model.applyEdits(data.changes);
      mod.silent = false;
    }
  };

  model.onDidChangeContent(() => {
    const newCode = model.getValue();
    mod.isEdit = true;
    ctr.abort();
    ctr = new AbortController();

    setTimeout(() => {
      if (ctr.signal.aborted) return;
      mod.isEdit = false;
    }, 1000);

    if (!mod.silent) {
      onChange(newCode);
    }
  });

  return mod;
}
