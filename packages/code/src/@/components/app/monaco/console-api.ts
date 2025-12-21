import type { editor as Editor, IDisposable, Uri } from "monaco-editor";
import { typescript } from "monaco-editor";
import { registerLanguages, setTypeScriptValidation } from "./language";

/**
 * Console API interface for debugging and configuring Monaco TypeScript settings
 */
export interface SpikeEditorConsoleAPI {
  // Compiler Options
  getCompilerOptions(): typescript.CompilerOptions;
  setCompilerOptions(options: Partial<typescript.CompilerOptions>): void;

  // Diagnostics
  getDiagnosticsOptions(): typescript.DiagnosticsOptions;
  setDiagnosticsOptions(options: typescript.DiagnosticsOptions): void;
  enableValidation(enable: boolean): void;

  // Extra Libraries
  getExtraLibs(): typescript.IExtraLibs;
  addExtraLib(content: string, filePath?: string): IDisposable;
  setExtraLibs(libs: Array<{ content: string; filePath?: string | undefined; }>): void;

  // Type Checking
  checkTypes(): Promise<typescript.Diagnostic[]>;
  getTypeScriptWorker(): Promise<typescript.TypeScriptWorker>;

  // Status & Debug
  isTypeScriptReady(): Promise<boolean>;
  registerLanguages(): void;
  getStatus(): Promise<{ registered: boolean; workerReady: boolean; }>;

  // Editor Access
  getEditor(): Editor.IStandaloneCodeEditor;
  getModel(): Editor.ITextModel;
  getUri(): string;

  // Convenience helpers
  ts: typeof typescript;
  help(): void;
}

/**
 * Create a console API for debugging Monaco TypeScript settings
 */
export function createConsoleAPI(
  editorInstance: Editor.IStandaloneCodeEditor,
  model: Editor.ITextModel,
  uri: Uri,
): SpikeEditorConsoleAPI {
  const api: SpikeEditorConsoleAPI = {
    // Compiler Options
    getCompilerOptions(): typescript.CompilerOptions {
      return typescript.typescriptDefaults.getCompilerOptions();
    },

    setCompilerOptions(options: Partial<typescript.CompilerOptions>): void {
      const current = typescript.typescriptDefaults.getCompilerOptions();
      typescript.typescriptDefaults.setCompilerOptions({
        ...current,
        ...options,
      });
      console.info("Compiler options updated:", options);
    },

    // Diagnostics
    getDiagnosticsOptions(): typescript.DiagnosticsOptions {
      return typescript.typescriptDefaults.getDiagnosticsOptions();
    },

    setDiagnosticsOptions(options: typescript.DiagnosticsOptions): void {
      typescript.typescriptDefaults.setDiagnosticsOptions(options);
      console.info("Diagnostics options updated:", options);
    },

    enableValidation(enable: boolean): void {
      setTypeScriptValidation(enable);
      console.info(`TypeScript validation ${enable ? "enabled" : "disabled"}`);
    },

    // Extra Libraries
    getExtraLibs(): typescript.IExtraLibs {
      return typescript.typescriptDefaults.getExtraLibs();
    },

    addExtraLib(content: string, filePath?: string): IDisposable {
      const result = typescript.typescriptDefaults.addExtraLib(content, filePath);
      console.info("Extra lib added:", filePath || "(inline)");
      return result;
    },

    setExtraLibs(libs: Array<{ content: string; filePath?: string | undefined; }>): void {
      const libsWithPaths = libs
        .filter((lib): lib is { content: string; filePath: string; } => lib.filePath !== undefined)
        .map(lib => ({
          content: lib.content,
          filePath: lib.filePath,
        }));
      typescript.typescriptDefaults.setExtraLibs(libsWithPaths);
      console.info("Extra libs set:", libsWithPaths.length, "libraries");
    },

    // Type Checking
    async checkTypes(): Promise<typescript.Diagnostic[]> {
      try {
        const worker = await typescript.getTypeScriptWorker();
        const tsWorker = await worker(uri);

        const [syntactic, semantic, suggestion] = await Promise.all([
          tsWorker.getSyntacticDiagnostics(uri.toString()),
          tsWorker.getSemanticDiagnostics(uri.toString()),
          tsWorker.getSuggestionDiagnostics(uri.toString()),
        ]);

        const all = [...syntactic, ...semantic, ...suggestion];
        console.info(`Type check complete: ${all.length} diagnostics`);
        if (all.length > 0) {
          console.table(all.map(d => ({
            code: d.code,
            message: typeof d.messageText === "string"
              ? d.messageText
              : d.messageText.messageText,
            start: d.start,
            length: d.length,
          })));
        }
        return all;
      } catch (error) {
        console.error("Type check failed:", error);
        throw error;
      }
    },

    async getTypeScriptWorker(): Promise<typescript.TypeScriptWorker> {
      const worker = await typescript.getTypeScriptWorker();
      return worker(uri);
    },

    // Status & Debug
    async isTypeScriptReady(): Promise<boolean> {
      try {
        await typescript.getTypeScriptWorker();
        return true;
      } catch {
        return false;
      }
    },

    registerLanguages(): void {
      registerLanguages();
      console.info("Languages re-registered");
    },

    async getStatus(): Promise<{ registered: boolean; workerReady: boolean; }> {
      let workerReady = false;
      try {
        await typescript.getTypeScriptWorker();
        workerReady = true;
      } catch {
        // Worker not ready
      }

      const registered = Object.keys(typescript.typescriptDefaults.getCompilerOptions()).length > 0;

      const status = { registered, workerReady };
      console.info("TypeScript status:", status);
      return status;
    },

    // Editor Access
    getEditor(): Editor.IStandaloneCodeEditor {
      return editorInstance;
    },

    getModel(): Editor.ITextModel {
      return model;
    },

    getUri(): string {
      return uri.toString();
    },

    // Convenience helpers
    ts: typescript,

    help(): void {
      console.info(`
spikeEditor Console API
=======================

COMPILER OPTIONS:
  spikeEditor.getCompilerOptions()                    - Get current compiler options
  spikeEditor.setCompilerOptions({ strict: true })    - Update compiler options

DIAGNOSTICS:
  spikeEditor.getDiagnosticsOptions()                 - Get diagnostics options
  spikeEditor.setDiagnosticsOptions({...})            - Set diagnostics options
  spikeEditor.enableValidation(true|false)            - Toggle validation

EXTRA LIBRARIES:
  spikeEditor.getExtraLibs()                          - List loaded type definitions
  spikeEditor.addExtraLib(content, path)              - Add type definition
  spikeEditor.setExtraLibs([{content, filePath}])     - Replace all extra libs

TYPE CHECKING:
  await spikeEditor.checkTypes()                      - Run type check, show errors
  await spikeEditor.getTypeScriptWorker()             - Get TS worker instance

STATUS & DEBUG:
  await spikeEditor.isTypeScriptReady()               - Check if TS is initialized
  await spikeEditor.getStatus()                       - Get registration status
  spikeEditor.registerLanguages()                     - Re-register languages

EDITOR ACCESS:
  spikeEditor.getEditor()                             - Get Monaco editor instance
  spikeEditor.getModel()                              - Get current text model
  spikeEditor.getUri()                                - Get model URI

DIRECT ACCESS:
  spikeEditor.ts                                      - Monaco typescript namespace
  spikeEditor.ts.typescriptDefaults                   - TypeScript defaults
  spikeEditor.ts.ScriptTarget                         - TS ScriptTarget enum
  spikeEditor.ts.ModuleKind                           - TS ModuleKind enum
  spikeEditor.ts.ModuleResolutionKind                 - TS ModuleResolutionKind enum

EXAMPLES:
  // Change module resolution
  spikeEditor.setCompilerOptions({
    moduleResolution: spikeEditor.ts.ModuleResolutionKind.NodeJs
  })

  // Add a type declaration
  spikeEditor.addExtraLib('declare const MY_VAR: string;', 'globals.d.ts')

  // Fix "TypeScript not registered" error
  spikeEditor.registerLanguages()
  await spikeEditor.checkTypes()
`);
    },
  };

  return api;
}
