import type { editor as Editor, typescript } from "monaco-editor";
import { typescript as ts } from "monaco-editor";
import type { ResponsiveSettings } from "./types";

// Validate origin and provide fallback
export const originToUse = (() => {
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

// Library definitions for TypeScript
export const lib = ["dom", "dom.iterable", "es2015", "es2016", "esnext"];

// Responsive editor settings for different device types
export const responsiveSettings: ResponsiveSettings = {
  // Mobile-specific settings
  mobile: {
    fontSize: 14,
    lineHeight: 1.5,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: "on",
    automaticLayout: true,
    scrollbar: {
      vertical: "visible",
      horizontal: "visible",
      verticalScrollbarSize: 14,
      horizontalScrollbarSize: 14,
      alwaysConsumeMouseWheel: false,
    },
    // Simplified UI for mobile
    folding: false,
    lineNumbers: "on",
    glyphMargin: false,
    guides: { indentation: false },
  },

  // Tablet-specific settings
  tablet: {
    fontSize: 14,
    lineHeight: 1.5,
    minimap: {
      enabled: true,
      maxColumn: 60,
      scale: 2,
      showSlider: "mouseover",
    },
    scrollBeyondLastLine: true,
    wordWrap: "on",
    automaticLayout: true,
    scrollbar: {
      vertical: "auto",
      horizontal: "auto",
      verticalScrollbarSize: 12,
      horizontalScrollbarSize: 12,
      alwaysConsumeMouseWheel: false,
    },
    folding: true,
    lineNumbers: "on",
  },

  // Desktop-specific settings
  desktop: {
    fontSize: 14,
    lineHeight: 1.5,
    minimap: {
      enabled: true,
      side: "right",
      showSlider: "mouseover",
    },
    scrollBeyondLastLine: true,
    scrollPredominantAxis: true,
    automaticLayout: true,
    wordWrap: "off",
    wordWrapColumn: 80,
    folding: true,
    lineNumbers: "on",
    scrollbar: {
      vertical: "auto",
      horizontal: "auto",
      scrollByPage: false,
      alwaysConsumeMouseWheel: true,
    },
  },
};

// Base editor configuration object
export const baseEditorOptions: Editor.IStandaloneEditorConstructionOptions = {
  // Common settings for all devices
  theme: "vs-dark",
  links: true,
  tabSize: 2,
  insertSpaces: true,
  bracketPairColorization: {
    enabled: true,
    independentColorPoolPerBracketType: true,
  },
  definitionLinkOpensInPeek: true,
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
  codeLens: true,
  accessibilitySupport: "auto",
  quickSuggestions: true,
  contextmenu: true,
  mouseWheelZoom: true,
  renderControlCharacters: true,
  renderLineHighlight: "all",
  renderValidationDecorations: "on",
  selectOnLineNumbers: true,
  selectionHighlight: true,
  showFoldingControls: "mouseover",
};

// Get editor options based on device type
export function getEditorOptions(): Editor.IStandaloneEditorConstructionOptions {
  // Detect device type
  const width = window.innerWidth;
  let deviceType: keyof ResponsiveSettings = "desktop";

  if (width < 768) {
    deviceType = "mobile";
  } else if (width < 1024) {
    deviceType = "tablet";
  }

  // Merge base options with device-specific options
  return {
    ...baseEditorOptions,
    ...responsiveSettings[deviceType],
  };
}

// TypeScript compiler options
export function getCompilerOptions(): typescript.CompilerOptions {
  return {
    baseUrl: originToUse + "/",
    target: ts.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    module: ts.ModuleKind.ESNext,
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
    jsx: ts.JsxEmit.ReactJSX,
    allowUmdGlobalAccess: false,
    include: [`${originToUse}/`],
  };
}

// Diagnostics options
export function getDiagnosticsOptions(enableValidation = false) {
  return {
    noSuggestionDiagnostics: !enableValidation,
    noSemanticValidation: !enableValidation,
    noSyntaxValidation: !enableValidation,
    // 2691: An import path cannot end with '.tsx'
    // 17004: Cannot use JSX unless the '--jsx' flag is provided (false positive - jsx IS configured)
    diagnosticCodesToIgnore: [2691, 17004],
  };
}

// Memoized model cache
export const modelCache: Record<string, Editor.ITextModel> = {};
