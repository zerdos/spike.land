import { editor, languages, Uri } from "@/external/monaco-editor";
import { ata, prettierToThrow } from "@/lib/shared";
import { throttle } from "@/utils/throttle";
import type { editor as Editor } from "monaco-editor";
import { version } from "monaco-editor/package.json";

// Types and interfaces for better type safety
interface ExtraLib {
  filePath: string;
  content: string;
}

interface EditorConfig {
  code: string;
  container: HTMLDivElement;
  codeSpace: string;
  onChange: (code: string) => void;
}

interface EditorModel {
  getValue: () => string;
  silent: boolean;
  getErrors: () => Promise<string[]>;
  isEdit: boolean;
  setValue: (newCode: string) => void;
}

// Validate origin and provide fallback
const originToUse = (() => {
  try {
    const origin = location.origin;
    if (!origin || typeof origin !== "string") {
      throw new Error("Invalid origin");
    }
    return origin;
  } catch (error) {
    console.error("Error getting origin:", error);
    return "http://localhost:3000"; // Fallback for development
  }
})();

// Memoized model cache
const modelCache: Record<string, Editor.ITextModel> = {};

const refreshAta = async (code: string): Promise<void> => {
  try {
    const extraLibs: ExtraLib[] = (await ata({ code, originToUse })).map(
      ({ filePath, content }) => ({
        filePath: originToUse + filePath,
        content,
      }),
    );

    console.log("Setting extra libraries:", { extraLibs });
    languages.typescript.typescriptDefaults.setExtraLibs(extraLibs);

    const mjsFiles = extraLibs.filter((lib) => lib.filePath.endsWith(".mjs"));
    for (const lib of mjsFiles) {
      const myUri = Uri.parse(lib.filePath);
      const existingModel = editor.getModel(myUri);

      if (existingModel) {
        existingModel.setValue(lib.content);
      } else {
        editor.createModel(lib.content, "typescript", myUri);
      }
    }

    languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSuggestionDiagnostics: false,
      noSemanticValidation: false,
      noSyntaxValidation: false,
      diagnosticCodesToIgnore: [2691],
    });
    languages.typescript.typescriptDefaults.setEagerModelSync(true);
  } catch (error) {
    console.error("Error refreshing ATA:", error);
    throw new Error(
      `Failed to refresh ATA: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

const lib = ["dom", "dom.iterable", "es2015", "es2016", "esnext"];

async function fetchAndCreateExtraModels(
  code: string,
  originToUse: string,
): Promise<void> {
  const patterns = [
    new RegExp(` from "(${originToUse})/live/[a-zA-Z0-9\\-_]+`, "gm"),
    new RegExp(` from "\\./(?!@/)[a-zA-Z0-9\\-_]+`, "gm"),
    new RegExp(` from "/live/[a-zA-Z0-9\\-_]+`, "gm"),
  ];

  const matches = patterns.flatMap(pattern => [...code.matchAll(pattern)]);

  try {
    await Promise.all(matches.map(async (match) => {
      const codeSpace = match[0].split("/").pop();
      const extraModel = new URL(`/live/${codeSpace}/index.tsx`, originToUse).toString();
      const mUri = Uri.parse(`${originToUse}/live/${codeSpace}.tsx`);

      if (!modelCache[mUri.toString()]) {
        const res = await fetch(extraModel);
        if (!res.ok) {
          throw new Error(`Failed to fetch model: ${res.statusText}`);
        }
        const content = await res.text();
        modelCache[mUri.toString()] = editor.createModel(content, "typescript", mUri);
      }
    }));
  } catch (error) {
    console.error("Error fetching extra models:", error);
    throw error;
  }
}

// Editor configuration object
const editorOptions: Editor.IStandaloneEditorConstructionOptions = {
  scrollbar: {
    vertical: "auto",
    horizontal: "auto",
    scrollByPage: false,
    alwaysConsumeMouseWheel: true,
  },
  scrollBeyondLastLine: true,
  scrollPredominantAxis: true,
  automaticLayout: true,
  wordWrap: "off",
  wordWrapColumn: 80,
  links: true,
  tabSize: 2,
  insertSpaces: true,
  minimap: {
    enabled: true,
    autohide: false,
    side: "right",
    showSlider: "mouseover",
  },
  bracketPairColorization: {
    enabled: true,
    independentColorPoolPerBracketType: true,
  },
  definitionLinkOpensInPeek: true,
  theme: "vs-dark",
  autoClosingBrackets: "languageDefined",
  autoIndent: "advanced",
  formatOnType: true,
  formatOnPaste: true,
  renderWhitespace: "boundary",
  cursorBlinking: "blink",
  smoothScrolling: true,
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: "on",
  fontFamily: "monospace",
  fontSize: 14,
  lineNumbers: "on",
  folding: true,
  codeLens: true,
};

const monacoContribution = async (code: string): Promise<string> => {
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

  fetchAndCreateExtraModels(code, originToUse);
  refreshAta(code);

  return code;
};

const mod: Record<string, EditorModel> = {};

export const startMonaco = async ({
  code,
  container,
  codeSpace,
  onChange,
}: EditorConfig): Promise<EditorModel> => {
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
}: EditorConfig): Promise<EditorModel> {
  const replacedCode = await monacoContribution(code);
  const uri = Uri.parse(`${originToUse}/live/${codeSpace}.tsx`);
  let model = editor.getModel(uri);

  if (model) {
    model.setValue(replacedCode);
  } else {
    model = editor.createModel(replacedCode, "typescript", uri);
  }

  languages.registerDocumentFormattingEditProvider("typescript", {
    provideDocumentFormattingEdits: async (model) => {
      try {
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
      } catch (error) {
        console.error("Error formatting document:", error);
        return [];
      }
    },
  });

  const link = document.createElement("link");
  const promiseIsResolved = new Promise<void>((resolve) => {
    link.onload = () => resolve();
  });

  link.rel = "stylesheet";
  link.href = `${originToUse}/monaco-editor@${version}/min/vs/editor/editor.main.css`;
  document.head.appendChild(link);

  await promiseIsResolved;

  const myEditor = editor.create(container, {
    ...editorOptions,
    model: model, // Explicitly set the model when creating the editor
  });

  let abortController = new AbortController();
  const ttt = { checking: 0 };

  const tsCheck = async () => {
    if (ttt.checking) return;
    ttt.checking = 1;

    try {
      console.log("Running TypeScript check");
      const typeScriptWorker = await (await languages.typescript.getTypeScriptWorker())(uri);

      const [syntacticDiagnostics, semanticDiagnostics, suggestionDiagnostics] = await Promise.all([
        typeScriptWorker.getSyntacticDiagnostics(uri.toString()),
        typeScriptWorker.getSemanticDiagnostics(uri.toString()),
        typeScriptWorker.getSuggestionDiagnostics(uri.toString()),
      ]);

      syntacticDiagnostics.forEach((d) => console.error("Syntactic diagnostic:", d));

      const needNewAta = semanticDiagnostics.some(d =>
        d.messageText.toString().includes("Cannot find module")
      );

      if (needNewAta) {
        await refreshAta(model.getValue());
      }

      console.log("Suggestion diagnostics:", suggestionDiagnostics);
    } catch (error) {
      console.error("Error during TypeScript check:", error);
    } finally {
      ttt.checking = 0;
    }
  };

  const editorModel: EditorModel = {
    getValue: () => model.getValue(),
    silent: false,
    getErrors: async () => {
      try {
        const worker = await languages.typescript.getTypeScriptWorker();
        const typeScriptWorker = await worker(uri);
        const diagnostics = await typeScriptWorker.getSuggestionDiagnostics(uri.toString());
        return diagnostics.map((d) => d.messageText.toString());
      } catch (error) {
        console.error("Error getting diagnostics:", error);
        return ["Error fetching diagnostics"];
      }
    },
    isEdit: false,
    setValue: (newCode: string) => {
      editorModel.silent = true;
      const state = myEditor.saveViewState();

      try {
        model.setValue(newCode);
        if (state) {
          console.log("Restoring editor state");
          myEditor.restoreViewState(state);
        }
      } catch (error) {
        console.error("Error setting editor value:", error);
      } finally {
        model.setValue(newCode);
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

  myEditor.onDidBlurEditorText(() => {
    editorModel.isEdit = false;
  });

  const throttledTsCheck = throttle(() => tsCheck(), 10000);
  const throttledOnChange = throttle(() => onChange(model.getValue()), 1000, {
    edges: ["leading", "trailing"],
  });

  model.onDidChangeContent(() => {
    throttledOnChange();
    throttledTsCheck();
  });

  return editorModel;
}
