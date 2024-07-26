import * as monaco from "monaco-editor";
import { ata, prettier } from "./shared";

const originToUse = location.origin;

const refreshAta = async (code: string, originToUse: string) => {
  try {
    const extraLibs = (await ata({ code, originToUse })).map((
      { filePath, content },
    ) => ({
      filePath: originToUse + filePath,
      content,
    }));
    console.log({ extraLibs });
    monaco.languages.typescript.typescriptDefaults.setExtraLibs(extraLibs);

    const mjsFiles = extraLibs.filter((lib) => lib.filePath.endsWith(".mjs"));
    mjsFiles.forEach((lib) => {
      const myUri = monaco.Uri.parse(lib.filePath!);
      if (monaco.editor.getModel(myUri)) {
        monaco.editor.getModel(myUri)?.setValue(lib.content);
        return;
      }
      monaco.editor.createModel(lib.content, "typescript", myUri);
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false,
      diagnosticCodesToIgnore: [2691],
    });
    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
  } catch (error) {
    console.error("Error refreshing ATA:", error);
  }
};

const lib = ["dom", "dom.iterable", "es2015", "es2016", "esnext"];

async function fetchAndCreateExtraModels(
  code: string,
  originToUse: string,
): Promise<void> {
  const search = new RegExp(
    ` from "(${originToUse})?/live/[a-zA-Z0-9\\-_]+`,
    "gm",
  );
  const models = code.matchAll(search);

  for (const match of models) {
    const codeSpace = match[0].split("/live/").pop();
    const extraModel = new URL(`/live/${codeSpace}/index.tsx`, originToUse)
      .toString();
    const mUri = monaco.Uri.parse(`${originToUse}/live/${codeSpace}/index.tsx`);

    const res = await fetch(extraModel);
    const content = await res.text();
    monaco.editor.getModel(mUri)
      || monaco.editor.createModel(content, "typescript", mUri);
  }
}

const monacoContribution = async (code: string) => {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: originToUse,
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    importHelpers: true,
    lib,
    esModuleInterop: false,
    strictNullChecks: false,
    strict: false,
    strictFunctionTypes: false,
    strictPropertyInitialization: false,
    strictBindCallApply: false,
    noImplicitAny: false,
    noImplicitThis: false,
    noImplicitReturns: false,
    checkJs: false,
    allowJs: false,
    experimentalDecorators: false,
    emitDecoratorMetadata: false,
    skipLibCheck: false,
    downlevelIteration: true,
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
    typeRoots: ["@types"],
    paths: {
      "tslib": ["/tslib"],
    },
    jsxImportSource: "@emotion/react",
    jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: false,
    include: [`${originToUse}/`],
  });

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true,
    diagnosticCodesToIgnore: [2691],
  });

  fetchAndCreateExtraModels(code, originToUse).then(() => refreshAta(code, originToUse));

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

const mod: Record<string, Awaited<ReturnType<typeof startMonacoPristine>>> = {};

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
    mod[codeSpace] = await startMonacoPristine({
      code,
      container,
      codeSpace,
      onChange,
    });
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
  const replacedCode = await monacoContribution(code);
  const uri = monaco.Uri.parse(`${originToUse}/live/${codeSpace}/index.tsx`);
  const model = monaco.editor.getModel(uri)
    || monaco.editor.createModel(replacedCode, "typescript", uri);

  const myEditor = monaco.editor.create(container, {
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
    extraEditorClassName: "custom-monaco-editor", // Add this line
  });

  // Add custom key bindings
  myEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyA, () => {
    const model = myEditor.getModel();
    if (model) {
      const lastLineNumber = model.getLineCount();
      const lastColumn = model.getLineMaxColumn(lastLineNumber);
      myEditor.setSelection(new monaco.Range(1, 1, lastLineNumber, lastColumn));
    }
  });

  // Enable paste for all platforms
  myEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
    navigator.clipboard.readText().then((text) => {
      myEditor.trigger("keyboard", "paste", { text: text });
    });
  });

  let abortController = new AbortController();
  const ttt = { checking: 0 };

  const tsCheck = async () => {
    if (ttt.checking) return;
    ttt.checking = 1;
    console.log("tsCheck");
    const typeScriptWorker = await (await monaco.languages.typescript.getTypeScriptWorker())(uri);

    const syntacticDiagnostics = await typeScriptWorker.getSyntacticDiagnostics(
      uri.toString(),
    );
    syntacticDiagnostics.forEach((d) => console.error(d));

    const semanticDiagnostics = await typeScriptWorker.getSemanticDiagnostics(
      uri.toString(),
    );
    let needNewAta = false;
    for (const d of semanticDiagnostics) {
      if (d.messageText.toString().includes("Cannot find module")) {
        needNewAta = true;
      }
    }

    if (needNewAta) await refreshAta(model.getValue(), originToUse);

    const suggestionDiagnostics = await typeScriptWorker
      .getSuggestionDiagnostics(uri.toString());
    suggestionDiagnostics.forEach((d) => console.error(d.messageText.toString()));

    ttt.checking = 0;
  };

  const editorModel = {
    getValue: () => model.getValue(),
    silent: false,
    getErrors: async () => {
      const diagnostics = await (await (await monaco.languages.typescript.getTypeScriptWorker())(
        uri,
      ))
        .getSuggestionDiagnostics(uri.toString());
      return diagnostics.map((d) => d.messageText.toString());
    },
    isEdit: false,
    setValue: (newCode: string) => {
      myEditor.getDomNode()?.blur();
      if (editorModel.isEdit) return;
      editorModel.silent = true;
      let state = null;
      try {
        state = myEditor.saveViewState();
        model.setValue(newCode);
        if (state) {
          myEditor.restoreViewState(state);
        }
      } catch (error) {
        console.error("Error while saving the state:", error);
      } finally {
        editorModel.silent = false;
        tsCheck();
      }
    },
  };

  myEditor.getDomNode()?.blur();

  myEditor.onDidFocusEditorText(() => {
    editorModel.isEdit = true;
    abortController.abort();
    abortController = new AbortController();
    setTimeout(() => {
      if (abortController.signal.aborted) return;
      editorModel.isEdit = false;
    }, 50);
  });

  myEditor.onDidBlurEditorText(async () => {
    editorModel.setValue(await prettier(model.getValue()));
    editorModel.isEdit = true;
  });

  BC.onmessage = (
    { data }: { data: { changes?: monaco.editor.IModelContentChange[] } },
  ) => {
    if (editorModel.silent) return;
    if (data.changes) {
      editorModel.silent = true;
      model.applyEdits(data.changes);
      editorModel.silent = false;
    }
  };

  model.onDidChangeContent(() => {
    const newCode = model.getValue();
    editorModel.isEdit = true;
    abortController.abort();
    abortController = new AbortController();

    setTimeout(() => {
      if (abortController.signal.aborted) return;
      editorModel.isEdit = false;
    }, 1000);

    if (!editorModel.silent) {
      onChange(newCode);
    }
  });

  return editorModel;
}
