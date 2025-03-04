import { md5 } from "@/lib/md5";
import { ata, prettierToThrow } from "@/lib/shared";
import { throttle } from "@/lib/throttle";
import { wait } from "@/lib/wait";
import { editor, languages, Uri, version} from "@/workers/monaco-editor.worker";
import type { editor as Editor } from "monaco-editor";

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
  lastValueHashToBeSet: string;
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

  const matches = patterns.flatMap((pattern) => [...code.matchAll(pattern)]);

  try {
    await Promise.all(matches.map(async (match) => {
      const codeSpace = match[0].split("/").pop();
      const extraModel = new URL(`/live/${codeSpace}/index.tsx`, originToUse)
        .toString();
      const mUri = Uri.parse(`${originToUse}/live/${codeSpace}.tsx`);

      if (!modelCache[mUri.toString()]) {
        const res = await fetch(extraModel);
        if (!res.ok) {
          throw new Error(`Failed to fetch model: ${res.statusText}`);
        }
        const content = await res.text();
        modelCache[mUri.toString()] = editor.createModel(
          content,
          "typescript",
          mUri,
        );
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
  // If we already have a model for this codeSpace, check if it's still valid
  if (mod[codeSpace]) {
    try {
      // Check if the container is still in the DOM
      if (container && document.body.contains(container)) {
        return mod[codeSpace];
      } else {
        // Container is no longer in the DOM, clean up the old model
        console.debug(`Container for ${codeSpace} is no longer in the DOM, creating new model`);
        // Use requestAnimationFrame to ensure we're not unmounting during render
        requestAnimationFrame(() => {
          delete mod[codeSpace];
        });
      }
    } catch (error) {
      console.error(`Error checking model for ${codeSpace}:`, error);
      // Use requestAnimationFrame to ensure we're not unmounting during render
      requestAnimationFrame(() => {
        delete mod[codeSpace];
      });
    }
  }

  // Create a new model
  mod[codeSpace] = await startMonacoPristine({
    code,
    container,
    codeSpace,
    onChange,
  });

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
      const currentCode = model.getValue();

      // First, check for import statements that might need type definitions
      const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+[^;]+|[^;]+)\s+from\s+['"]([^'"]+)['"]/g;
      const imports = [...currentCode.matchAll(importRegex)].map(match => match[1]);

      if (imports.length > 0) {
        console.log("Detected imports:", imports);
        // Always refresh ATA first when imports are present
        await refreshAta(currentCode);
        await fetchAndCreateExtraModels(currentCode, originToUse);

        // Wait a moment for types to be loaded
        await wait(100);
      }

      // Now check for errors
      const typeScriptWorker = await (await languages.typescript.getTypeScriptWorker())(uri);

      const [syntacticDiagnostics, semanticDiagnostics, suggestionDiagnostics] = await Promise.all([
        typeScriptWorker.getSyntacticDiagnostics(uri.toString()),
        typeScriptWorker.getSemanticDiagnostics(uri.toString()),
        typeScriptWorker.getSuggestionDiagnostics(uri.toString()),
      ]);

      // Log syntactic errors
      if (syntacticDiagnostics.length > 0) {
        console.error("Syntactic diagnostics:", syntacticDiagnostics);
      }

      // Check for missing modules and try to resolve them
      const missingModuleErrors = semanticDiagnostics.filter(d =>
        d.messageText.toString().includes("Cannot find module")
      );

      if (missingModuleErrors.length > 0) {
        console.log("Missing module errors detected:", missingModuleErrors);

        // Try another ATA refresh with more aggressive settings
        languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSuggestionDiagnostics: false,
          noSemanticValidation: false,
          noSyntaxValidation: false,
        });

        await refreshAta(currentCode);

        // Re-check after refreshing types
        const updatedSemanticDiagnostics = await typeScriptWorker.getSemanticDiagnostics(
          uri.toString(),
        );

        if (updatedSemanticDiagnostics.length < semanticDiagnostics.length) {
          console.log("Successfully resolved some type errors after ATA refresh");
        } else {
          console.warn(
            "Some modules still missing types after ATA refresh:",
            updatedSemanticDiagnostics.filter(d =>
              d.messageText.toString().includes("Cannot find module")
            ),
          );
        }
      }

      // Log suggestion diagnostics for debugging
      if (suggestionDiagnostics.length > 0) {
        console.log("Suggestion diagnostics:", suggestionDiagnostics);
      }
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
        const diagnostics = await typeScriptWorker.getSuggestionDiagnostics(
          uri.toString(),
        );
        return diagnostics.map((d) => d.messageText.toString());
      } catch (error) {
        console.error("Error getting diagnostics:", error);
        return ["Error fetching diagnostics"];
      }
    },
    isEdit: false,
    lastValueHashToBeSet: "",
    setValue: async (newCode: string) => {
      const lastHash = md5(newCode);

      // Prevent recursive updates
      if (editorModel.silent) {
        console.debug("Skipping setValue while silent");
        return;
      }

      // Check if this update is necessary
      const currentCode = model.getValue();
      if (currentCode === newCode) {
        console.debug("Skipping identical content update");
        return;
      }

      editorModel.lastValueHashToBeSet = lastHash;

      // Handle recently changed content
      if (recentlyChanged.has(lastHash)) {
        console.debug("Content was recently changed, debouncing update");
        await wait(1000);
        if (editorModel.lastValueHashToBeSet !== lastHash) {
          console.debug("Newer update pending, skipping this one");
          return;
        }
      }

      // Save editor state before update
      const viewState = myEditor.saveViewState();
      editorModel.silent = true;

      try {
        // Update in a single atomic operation
        await wait(0); // Break potential call stack
        model.pushEditOperations(
          [],
          [{
            range: model.getFullModelRange(),
            text: newCode,
          }],
          () => null,
        );

        // Restore view state if available
        if (viewState) {
          await wait(0); // Ensure DOM has updated
          myEditor.restoreViewState(viewState);
        }

        // Mark this content as recently changed
        recentlyChanged.add(lastHash);
        setTimeout(() => recentlyChanged.delete(lastHash), 1000);
      } catch (error) {
        console.error("Error updating editor value:", error);
      } finally {
        await wait(0); // Ensure all updates are processed
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
  const recentlyChanged = new Set<string>();

  const throttledTsCheck = throttle(() => tsCheck(), 10000);
  // Increase throttle time and add debounce for editor changes
  const throttledOnChange = throttle(
    async () => {
      const code = model.getValue();
      const formattedText = await prettierToThrow({
        code,
        toThrow: false,
      });
      const hashOfCode = md5(formattedText);
      recentlyChanged.add(hashOfCode);

      onChange(formattedText);
      setTimeout(() => {
        recentlyChanged.delete(hashOfCode);
      }, 1000);
    },
    300, // Reduce throttle time to 300ms for better responsiveness
    {
      edges: ["leading", "trailing"], // Trigger on both edges for faster initial response
    },
  );

  // Use refs to track ongoing content updates and previous content
  const isUpdating = { current: false };
  const pendingUpdate = { current: null as string | null };
  const previousContent = { current: model.getValue() };

  // Track previous imports to detect changes
  const getImports = (code: string) => {
    const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+[^;]+|[^;]+)\s+from\s+['"]([^'"]+)['"]/g;
    return [...code.matchAll(importRegex)].map(match => match[1]);
  };

  const previousImports = { current: getImports(model.getValue()) };

  model.onDidChangeContent(() => {
    if (editorModel.silent) return;

    // Handle concurrent updates
    if (isUpdating.current) {
      pendingUpdate.current = model.getValue();
      return;
    }

    const processUpdate = async () => {
      isUpdating.current = true;
      try {
        const content = pendingUpdate.current || model.getValue();
        pendingUpdate.current = null;

        // Check if imports have changed
        const currentImports = getImports(content);
        const importsChanged =
          JSON.stringify(currentImports) !== JSON.stringify(previousImports.current);

        if (importsChanged) {
          console.log("Imports changed, triggering immediate type check");
          previousImports.current = currentImports;

          // Skip throttling for import changes to provide faster feedback
          await throttledOnChange.flush();
          await tsCheck();
        } else {
          // Normal update flow for non-import changes
          await throttledOnChange();
          await throttledTsCheck();
        }

        previousContent.current = content;

        // Handle any updates that came in while processing
        if (pendingUpdate.current) {
          const nextContent = pendingUpdate.current;
          pendingUpdate.current = null;
          await processUpdate();
        }
      } finally {
        isUpdating.current = false;
      }
    };

    processUpdate().catch(error => console.error("Error processing content update:", error));
  });

  return editorModel;
}
