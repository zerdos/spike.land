/**
 * Monaco Editor Module
 * 
 * This module provides a modular and responsive implementation of the Monaco editor
 * with enhanced TypeScript/TSX syntax highlighting and support for different device types.
 */

// Export types
export type { 
  EditorConfig, 
  EditorModel, 
  EditorState, 
  ExtraLib, 
  ResponsiveSettings 
} from './types';

// Export configuration utilities
export { 
  getEditorOptions, 
  getCompilerOptions, 
  getDiagnosticsOptions,
  baseEditorOptions,
  responsiveSettings,
  originToUse,
  lib
} from './config';

// Export language utilities
export {
  registerLanguages,
  configureJsxSupport,
  registerFormattingProvider,
  setTypeScriptValidation
} from './language';

// Export model management
export { startMonaco } from './model';

// Export utility functions
export {
  fetchAndCreateExtraModels,
  refreshAta,
  getImports,
  loadMonacoCss,
  setupResponsiveEditor,
  checkTypeScriptErrors
} from './utils';
