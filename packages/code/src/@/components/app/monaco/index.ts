/**
 * Monaco Editor Module
 *
 * This module provides a modular and responsive implementation of the Monaco editor
 * with enhanced TypeScript/TSX syntax highlighting and support for different device types.
 */

// Export types
export type { EditorConfig, EditorModel, EditorState, ExtraLib, ResponsiveSettings } from "./types";

// Export configuration utilities
export {
  baseEditorOptions,
  getCompilerOptions,
  getDiagnosticsOptions,
  getEditorOptions,
  lib,
  originToUse,
  responsiveSettings,
} from "./config";

// Export language utilities
export {
  configureJsxSupport,
  registerFormattingProvider,
  registerLanguages,
  setTypeScriptValidation,
} from "./language";

// Export model management
export { startMonaco } from "./model";

// Export utility functions
export {
  checkTypeScriptErrors,
  fetchAndCreateExtraModels,
  getImports,
  loadMonacoCss,
  refreshAta,
  setupResponsiveEditor,
} from "./utils";

// Export console API
export { createConsoleAPI, type SpikeEditorConsoleAPI } from "./console-api";
