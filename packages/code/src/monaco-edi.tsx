import { ata, prettierToThrow } from "@/lib/shared";
import { editor, languages, Uri } from "monaco-editor";
// import { version } from "monaco-editor/package.json";
import { throttle } from "es-toolkit";

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
    ` from "\\./(?!@/)[a-zA-Z0-9\\-_]+`,
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
    if (!editor.getModel(mUri)) {
      editor.createModel(content, "typescript", mUri);
    }
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
  const model = editor.getModel(uri) ||
    editor.createModel(replacedCode, "typescript", uri);

  languages.registerDocumentFormattingEditProvider("typescript", {
    provideDocumentFormattingEdits: async (model) => {
      const formattedText = await prettierToThrow({
        code: model.getValue(),
        toThrow: false,
      });
      return [
        {
          range: model.getFullModelRange(),
          text: formattedText,
        },
      ];
    },
  });

  const link = document.createElement("link");

  // const promiseIsResolved = new Promise<void>((resolve) => {
  //   link.onload = () => resolve();
  // });

  // link.rel = "stylesheet";
  // link.href =
    // `${location.origin}/monaco-editor@${version}/min/vs/editor/editor.main.css`;
  // // document.head.appendChild(link);

  // await promiseIsResolved;

  const myEditor = editor.create(container, {
    model, // Assuming 'model' is defined elsewhere
    // Scrollbar settings
    scrollbar: {
      vertical: "auto", // Automatically shows/hides vertical scrollbar
      horizontal: "auto", // Automatically shows/hides horizontal scrollbar
      scrollByPage: false,
      alwaysConsumeMouseWheel: true, // Defaults to true
    },
    scrollBeyondLastLine: true, // Allows scrolling beyond the last line
    scrollPredominantAxis: true, // Scrolls only in the predominant direction
    automaticLayout: true, // Automatically adjusts layout on window resize
    wordWrap: "off", // Disables word wrapping (default)
    wordWrapColumn: 80, // Column at which to wrap lines (used if wordWrap is set)
    links: true, // Detects and hyperlinks URLs
    tabSize: 2, // Sets tab size to 2 spaces
    insertSpaces: true, // Inserts spaces when pressing Tab
    minimap: {
      enabled: true, // Displays the minimap
      autohide: false, // Minimap is always visible
      side: "right", // Positions minimap on the right
      showSlider: "mouseover", // Slider appears on mouseover
    },
    bracketPairColorization: {
      enabled: true, // Enables bracket pair colorization
      independentColorPoolPerBracketType: true,
    },
    definitionLinkOpensInPeek: true, // Opens definitions in a peek view
    theme: "vs-dark", // Sets the editor theme to dark
    autoClosingBrackets: "languageDefined", // Auto-closes brackets based on language
    autoIndent: "advanced", // Enhances auto-indentation
    formatOnType: true, // Formats code as you type
    formatOnPaste: true, // Formats code when pasted
    renderWhitespace: "boundary", // Renders whitespace characters at boundaries
    cursorBlinking: "blink", // Sets cursor to blink
    smoothScrolling: true, // Enables smooth scrolling
    suggestOnTriggerCharacters: true, // Shows suggestions on trigger characters
    acceptSuggestionOnEnter: "on", // Accepts suggestions when pressing Enter
    fontFamily: "monospace", // Uses monospace font for better readability
    fontSize: 14, // Sets font size to 14px
    lineNumbers: "on", // Displays line numbers
    folding: true, // Enables code folding
    codeLens: true, // Shows inline code actions
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
    const typeScriptWorker =
      await (await languages.typescript.getTypeScriptWorker())(uri);

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

    console.log({ suggestionDiagnostics });

    ttt.checking = 0;
  };

  const editorModel = {
    getValue: () => model.getValue(),
    silent: false,
    getErrors: async () => {
      const diagnostics =
        await (await (await languages.typescript.getTypeScriptWorker())(
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

  const throttledTsCheck = throttle(() => tsCheck(), 10000);

  model.onDidChangeContent(() => {
    onChange(model.getValue());
    throttledTsCheck();
  });

  return editorModel;
}
