import { ata } from "@/lib/shared";
import { editor, languages, css,  Uri } from "@/external/monaco-editor";

const originToUse = location.origin;

const refreshAta = async (code: string) => {
  try {
    const extraLibs = (await ata({ code, originToUse: location.origin })).map((
      { filePath, content },
    ) => ({
      filePath: originToUse + filePath,
      content,
    }));
    console.log({ extraLibs });
    languages.typescript.typescriptDefaults.setExtraLibs(extraLibs);

    const mjsFiles = extraLibs.filter((lib) => lib.filePath.endsWith(".mjs"));
    mjsFiles.forEach((lib) => {
      const myUri = Uri.parse(lib.filePath!);
      if (editor.getModel(myUri)) {
        editor.getModel(myUri)?.setValue(lib.content);
        return;
      }
      editor.createModel(lib.content, "typescript", myUri);
    });

    languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false,
      diagnosticCodesToIgnore: [2691],
    });
    languages.typescript.typescriptDefaults.setEagerModelSync(true);
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
    ` from "(${originToUse})/live/[a-zA-Z0-9\\-_]+`,
    "gm",
  );
  const models = code.matchAll(search);

  const search2 = new RegExp(
    ` from "\./[a-zA-Z0-9\\-_]+`,
    "gm",
  );
  const models2 = code.matchAll(search2);

  const search3 = new RegExp(
    ` from "/live/[a-zA-Z0-9\\-_]+`,
    "gm",
  );
  const models3 = code.matchAll(search3);

  for (const match of [...models, ...models2, ...models3]) {
    const codeSpace = match[0].split("/").pop();
    const extraModel = new URL(`/live/${codeSpace}/index.tsx`, originToUse)
      .toString();
    const mUri = Uri.parse(`${originToUse}/live/${codeSpace}.tsx`);

    const res = await fetch(extraModel);
    const content = await res.text();
    editor.getModel(mUri)
      || editor.createModel(content, "typescript", mUri);
  }
}

const monacoContribution = async (code: string) => {
  languages.typescript.typescriptDefaults.setCompilerOptions({
    baseUrl: originToUse + "/",
    target: languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
    module: languages.typescript.ModuleKind.ESNext,
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
      "./*": ["/live/*"],
      "@/": [`${originToUse}/@/`],
      "/*": [`${originToUse}/`],
    },
    jsxImportSource: "@emotion/react",
    jsx: languages.typescript.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: false,
    include: [`${originToUse}/`],
  });

  languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSuggestionDiagnostics: true,
    noSemanticValidation: true,
    noSyntaxValidation: true,
    diagnosticCodesToIgnore: [2691],
  });

  fetchAndCreateExtraModels(code, originToUse).then(() => refreshAta(code));

  return code;
};

self.MonacoEnvironment = {
  baseUrl: originToUse,
  getWorkerUrl: (_moduleId: string, label: string) => {
    if (label === "html") {
      return `/@/monaco-editor/esm/html.worker.js`;
    }
    if (label === "json") {
      return `/@/monaco-editor/esm/json.worker.js`;
    }
    if (label === "css") {
      return `/@/monaco-editor/esm/css.worker.js`;
    }
    if (label === "typescript" || label === "javascript") {
      return `/@/monaco-editor/esm/ts.worker.js`;
    }
    return `/@/monaco-editor/esm/editor.worker.js`;
  },
};

const mod: Record<string, Awaited<ReturnType<typeof startMonacoPristine>>> = {};

export const startMonaco = async ({
  code,
  container,
  codeSpace,
  onChange
}: {
  code: string;
  container: HTMLDivElement;
  codeSpace: string;
  onChange: (_code: string) => void;
}): Promise<{
  getValue: () => string;
  silent: boolean;
  getErrors: () => Promise<string[]>;
  isEdit: boolean;
  setValue: (_newCode: string) => void;
}> => {
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
  const replacedCode = await monacoContribution(code);
  const uri = Uri.parse(`${originToUse}/live/${codeSpace}.tsx`);
  const model = editor.getModel(uri)
    || editor.createModel(replacedCode, "typescript", uri);

    const shadowRoot = container.attachShadow({
      mode: 'closed'
    });

    const innerContainer = document.createElement('div');
			shadowRoot.appendChild(innerContainer);
			innerContainer.style.width = container.getClientRects()[0].width + 'px';
			innerContainer.style.height =  container.getClientRects()[0].width + 'px';

      

      const monacoInnerStyle = document.createElement('style');
      
      monacoInnerStyle.innerText = css;
      
      shadowRoot.appendChild(monacoInnerStyle);

		
      Object.assign(globalThis, { monacoInnerStyle });
    

  const myEditor = editor.create(innerContainer, {
    model,
    scrollbar: {
      scrollByPage: false,
      alwaysConsumeMouseWheel: false,
    },
    scrollBeyondLastLine: true,
    scrollPredominantAxis: true,
    automaticLayout: false,
    useShadowDOM: false,
    wordWrapColumn: 80,
    links: true,
    tabSize: 2,
    minimap: {
      enabled: true,
      autohide: true,

      
      
    },
    insertSpaces: false,
    bracketPairColorization: {
      independentColorPoolPerBracketType: true,
      enabled: true,
    },
    definitionLinkOpensInPeek: true,
    theme: "vs-dark",
    autoClosingBrackets: "languageDefined",
  });

  // Add custom key bindings
  // myEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyA, () => {
  //   const model = myEditor.getModel();
  //   if (model) {
  //     const lastLineNumber = model.getLineCount();
  //     const lastColumn = model.getLineMaxColumn(lastLineNumber);
  //     myEditor.setSelection(new monaco.Range(1, 1, lastLineNumber, lastColumn));
  //   }
  // });

  // // Enable paste for all platforms
  // myEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
  //   navigator.clipboard.readText().then((text) => {
  //     myEditor.trigger("keyboard", "paste", { text: text });
  //   });
  // });

  let abortController = new AbortController();
  const ttt = { checking: 0 };

  const tsCheck = async () => {
    if (ttt.checking) return;
    ttt.checking = 1;
    console.log("tsCheck");
    const typeScriptWorker = await (await languages.typescript.getTypeScriptWorker())(uri);

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

    if (needNewAta) await refreshAta(model.getValue());

    const suggestionDiagnostics = await typeScriptWorker
      .getSuggestionDiagnostics(uri.toString());
    suggestionDiagnostics.forEach((d) => console.error(d.messageText.toString()));

    ttt.checking = 0;
  };

  const editorModel = {
    getValue: () => model.getValue(),
    silent: false,
    getErrors: async () => {
      const diagnostics = await (await (await languages.typescript.getTypeScriptWorker())(
        uri,
      ))
        .getSuggestionDiagnostics(uri.toString());
      return diagnostics.map((d) => d.messageText.toString());
    },
    isEdit: false,
    setValue: (_newCode: string) => {
      // const newCode = cSess.session.code;
      //      if (cSess && cSess.session && cSess.session.code && newCode !== cSess.session.code) return;
      // myEditor.getDomNode()?.blur();
      //      if (editorModel.isEdit) return;
      editorModel.silent = true;
      let state = null;
      try {
        state = myEditor.saveViewState();
        model.setValue(_newCode);

        if (state) {
          myEditor.restoreViewState(state);
        }
      } catch (error) {
        console.error("Error while saving the state:", error);
      } finally {
        model.setValue(_newCode);
        editorModel.silent = false;
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
    editorModel.isEdit = false;
  });

  model.onDidChangeContent(() => {
    const newCode = model.getValue();
    editorModel.isEdit = true;
    abortController.abort();
    const { signal } = abortController = new AbortController();

    setTimeout(() => {
      if (signal.aborted) return;
      editorModel.isEdit = false;
      tsCheck();
    }, 200);

    if (!editorModel.silent) {
      onChange(newCode);
    }
  });

  return editorModel;
}
