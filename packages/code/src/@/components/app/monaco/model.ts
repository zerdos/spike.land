import { md5 } from "@/lib/md5";
import { wait } from "@/lib/wait";
import { editor, languages, Uri, version as monacoVersion } from "@/workers/monaco-editor.worker";
import { getEditorOptions } from "./config";
import { originToUse } from "./config";
import { configureJsxSupport, registerFormattingProvider, registerLanguages } from "./language";
import type { EditorConfig, EditorModel, EditorState } from "./types";
import {
  checkTypeScriptErrors,
  fetchAndCreateExtraModels,
  getImports,
  loadMonacoCss,
  refreshAta,
  setupResponsiveEditor,
} from "./utils";

// Store for editor models
const modelStore: Record<string, EditorModel> = {};

/**
 * Initialize Monaco editor with the given configuration
 * @param config Editor configuration
 * @param ata Auto Type Acquisition function
 * @param prettierToThrow Prettier formatting function
 * @param version Monaco editor version
 */
export async function startMonaco(
  {
    code,
    container,
    codeSpace,
    onChange,
  }: EditorConfig,
  ata: (
    options: { code: string; originToUse: string; },
  ) => Promise<Array<{ filePath: string; content: string; }>>,
  prettierToThrow: (
    options: { code: string; toThrow: boolean; },
  ) => Promise<string>,
  version: string = monacoVersion,
): Promise<EditorModel> {
  // If we already have a model for this codeSpace, check if it's still valid
  if (modelStore[codeSpace]) {
    try {
      // Check if the container is still in the DOM
      if (container && document.body.contains(container)) {
        return modelStore[codeSpace];
      } else {
        // Container is no longer in the DOM, clean up the old model
        console.debug(
          `Container for ${codeSpace} is no longer in the DOM, creating new model`,
        );
        // Use requestAnimationFrame to ensure we're not unmounting during render
        requestAnimationFrame(() => {
          delete modelStore[codeSpace];
        });
      }
    } catch (error) {
      console.error(`Error checking model for ${codeSpace}:`, error);
      // Use requestAnimationFrame to ensure we're not unmounting during render
      requestAnimationFrame(() => {
        delete modelStore[codeSpace];
      });
    }
  }

  // Create a new model
  modelStore[codeSpace] = await createEditorModel(
    {
      code,
      container,
      codeSpace,
      onChange,
    },
    ata,
    prettierToThrow,
    version,
  );

  return modelStore[codeSpace];
}

/**
 * Create a new editor model
 * @param config Editor configuration
 * @param ata Auto Type Acquisition function
 * @param prettierToThrow Prettier formatting function
 * @param version Monaco editor version
 */
async function createEditorModel(
  {
    code,
    container,
    codeSpace,
    onChange,
  }: EditorConfig,
  ata: (
    options: { code: string; originToUse: string; },
  ) => Promise<Array<{ filePath: string; content: string; }>>,
  prettierToThrow: (
    options: { code: string; toThrow: boolean; },
  ) => Promise<string>,
  version: string = monacoVersion,
): Promise<EditorModel> {
  // Initialize languages and compiler options
  registerLanguages();

  // Process code and prepare for editor

  fetchAndCreateExtraModels(code, originToUse).then(() => refreshAta(code, ata)).catch((error) => {
    console.error("Error fetching extra models:", error);
  });
  // Create URI for the model
  const uri = Uri.parse(`${originToUse}/live/${codeSpace}.tsx`);
  let model = editor.getModel(uri);

  if (model) {
    model.setValue(code);
  } else {
    // Create a new model
    model = editor.createModel(code, "typescript", uri);

    // Configure JSX support for TSX files
    configureJsxSupport(uri.toString());
  }

  // Register formatting provider
  registerFormattingProvider(prettierToThrow);

  // Load Monaco CSS
  await loadMonacoCss(version);

  // Create editor with responsive options
  const editorOptions = getEditorOptions();
  const myEditor = editor.create(container, {
    ...editorOptions,
    model: model,
  });

  // Set up responsive behavior
  const cleanupResponsive = setupResponsiveEditor(myEditor);

  // Initialize state for tracking changes
  let abortController = new AbortController();
  const ttt = { checking: 0 };
  const recentlyChanged = new Set<string>();

  // Create editor model interface
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
        return diagnostics.map((d: any) => d.messageText.toString());
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

  // Set up focus/blur handlers
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

  // Function to handle content changes and formatting
  const onChangeAddRecentlyChanged = async () => {
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
  };

  // Set up state for tracking content updates
  const editorState: EditorState = {
    isUpdating: { current: false },
    pendingUpdate: { current: null },
    previousContent: { current: model.getValue() },
    previousImports: { current: getImports(model.getValue()) },
  };

  // Handle content changes
  model.onDidChangeContent(() => {
    if (editorModel.silent) return;

    // Handle concurrent updates
    if (editorState.isUpdating.current) {
      editorState.pendingUpdate.current = model.getValue();
      return;
    }

    const processUpdate = async () => {
      editorState.isUpdating.current = true;
      try {
        const content = editorState.pendingUpdate.current || model.getValue();
        editorState.pendingUpdate.current = null;

        // Check if imports have changed
        const currentImports = getImports(content);
        const importsChanged = JSON.stringify(currentImports) !==
          JSON.stringify(editorState.previousImports.current);

        // Check if the user has finished editing or if imports have changed
        if (!editorModel.isEdit || importsChanged) {
          console.log(
            "User finished editing or imports changed, saving changes",
          );
          editorState.previousImports.current = currentImports;

          // Save changes
          await onChangeAddRecentlyChanged();
        }

        // Always run type checking after changes
        if (ttt.checking === 0) {
          ttt.checking = 1;
          try {
            await checkTypeScriptErrors(model, uri);
          } finally {
            ttt.checking = 0;
          }
        }

        editorState.previousContent.current = content;

        // Handle any updates that came in while processing
        if (editorState.pendingUpdate.current) {
          const _nextContent = editorState.pendingUpdate.current;
          editorState.pendingUpdate.current = null;
          await processUpdate();
        }
      } finally {
        editorState.isUpdating.current = false;
      }
    };

    processUpdate().catch((error) => console.error("Error processing content update:", error));
  });

  // Add cleanup method to the model
  return {
    ...editorModel,
    dispose: () => {
      cleanupResponsive();
      myEditor.dispose();
      model.dispose();
      delete modelStore[codeSpace];
    },
  };
}
