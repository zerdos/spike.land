import { md5 } from "@/lib/md5";
import { wait } from "@/lib/wait";
import { editor, languages, Range, Uri } from "@/workers/monaco-editor.worker";
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

// Type for the global editor API exposed for AI/automation tools
export interface SpikeEditorAPI {
  getValue: () => string;
  setValue: (code: string) => void;
  getSelection: () => { startLine: number; startColumn: number; endLine: number; endColumn: number; } | null;
  setSelection: (startLine: number, startColumn: number, endLine: number, endColumn: number) => void;
  goToLine: (line: number, column?: number) => void;
  find: (searchText: string) => void;
  replace: (searchText: string, replaceText: string) => void;
  replaceAll: (searchText: string, replaceText: string) => number;
  insertAt: (line: number, column: number, text: string) => void;
  getLineContent: (line: number) => string;
  getLineCount: () => number;
  focus: () => void;
  getCursorPosition: () => { lineNumber: number; column: number; };
  setCursorPosition: (line: number, column: number) => void;
  triggerAction: (actionId: string) => void;
  getErrors: () => Promise<string[]>;
}

declare global {
  interface Window {
    __spikeEditor?: SpikeEditorAPI;
  }
}

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
): Promise<EditorModel> {
  // Initialize languages and compiler options
  registerLanguages();

  // Process code and prepare for editor

  fetchAndCreateExtraModels(code, originToUse).then(() => refreshAta(code, ata))
    .catch((error) => {
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
  await loadMonacoCss();

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
        const extractMessageText = (
          message: string | { messageText: string; },
        ): string => {
          if (typeof message === "string") {
            return message;
          } else if (message && typeof message.messageText !== "undefined") {
            return extractMessageText(message.messageText);
          } else {
            return "Unknown diagnostic message";
          }
        };
        return diagnostics.map((
          d: { messageText: string | { messageText: string; }; },
        ) => extractMessageText(d.messageText));
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

  // Expose global API for AI/automation tools
  const spikeEditorAPI: SpikeEditorAPI = {
    getValue: () => model.getValue(),
    setValue: (code: string) => editorModel.setValue(code),
    getSelection: () => {
      const selection = myEditor.getSelection();
      if (!selection) return null;
      return {
        startLine: selection.startLineNumber,
        startColumn: selection.startColumn,
        endLine: selection.endLineNumber,
        endColumn: selection.endColumn,
      };
    },
    setSelection: (startLine: number, startColumn: number, endLine: number, endColumn: number) => {
      myEditor.setSelection(new Range(startLine, startColumn, endLine, endColumn));
    },
    goToLine: (line: number, column = 1) => {
      myEditor.setPosition({ lineNumber: line, column });
      myEditor.revealLineInCenter(line);
      myEditor.focus();
    },
    find: (searchText: string) => {
      myEditor.trigger("spikeEditor", "actions.find", { searchString: searchText });
    },
    replace: (searchText: string, replaceText: string) => {
      const currentValue = model.getValue();
      const newValue = currentValue.replace(searchText, replaceText);
      if (newValue !== currentValue) {
        editorModel.setValue(newValue);
      }
    },
    replaceAll: (searchText: string, replaceText: string) => {
      const currentValue = model.getValue();
      const regex = new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
      const matches = currentValue.match(regex);
      const count = matches ? matches.length : 0;
      if (count > 0) {
        const newValue = currentValue.replace(regex, replaceText);
        editorModel.setValue(newValue);
      }
      return count;
    },
    insertAt: (line: number, column: number, text: string) => {
      myEditor.executeEdits("spikeEditor", [{
        range: new Range(line, column, line, column),
        text,
        forceMoveMarkers: true,
      }]);
    },
    getLineContent: (line: number) => model.getLineContent(line),
    getLineCount: () => model.getLineCount(),
    focus: () => myEditor.focus(),
    getCursorPosition: () => {
      const position = myEditor.getPosition();
      return position ? { lineNumber: position.lineNumber, column: position.column } : { lineNumber: 1, column: 1 };
    },
    setCursorPosition: (line: number, column: number) => {
      myEditor.setPosition({ lineNumber: line, column });
    },
    triggerAction: (actionId: string) => {
      myEditor.trigger("spikeEditor", actionId, null);
    },
    getErrors: editorModel.getErrors,
  };

  // Expose to window for programmatic access
  window.__spikeEditor = spikeEditorAPI;

  // Update DOM to indicate editor is ready
  const editorContainer = document.getElementById("spike-editor-container");
  if (editorContainer) {
    editorContainer.setAttribute("data-editor-ready", "true");
  }

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
          console.warn(
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
      // Clean up global API
      if (window.__spikeEditor === spikeEditorAPI) {
        delete window.__spikeEditor;
      }
    },
  };
}
