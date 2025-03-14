import { languages } from "@/workers/monaco-editor.worker";
import { getCompilerOptions, getDiagnosticsOptions } from "./config";

/**
 * Register TypeScript and TSX languages with Monaco editor
 * This includes setting up proper syntax highlighting for JSX/TSX
 * with special handling for dot notation components like motion.div
 */
export function registerLanguages(): void {
  // Configure TypeScript language defaults
  languages.typescript.typescriptDefaults.setCompilerOptions(getCompilerOptions());
  languages.typescript.typescriptDefaults.setDiagnosticsOptions(getDiagnosticsOptions());
  
  // Set mode configuration for TypeScript
  languages.typescript.typescriptDefaults.setModeConfiguration({
    completionItems: true,
    hovers: true,
    documentSymbols: true,
    references: true,
    diagnostics: true,
    documentHighlights: true,
    documentRangeFormattingEdits: true,
  });
  
  // Configure language features for TypeScript/TSX
  languages.onLanguage('typescript', () => {
    languages.setLanguageConfiguration('typescript', {
      // This pattern supports component names with dot notation like motion.div
      wordPattern: /(-?\d*\.\d\w*)|([a-zA-Z_$][\w$]*(?:\.[\w$]+)*)/g,
      comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
      },
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
        { open: '`', close: '`' },
        { open: '/**', close: ' */' },
      ],
      surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: '\'', close: '\'' },
        { open: '`', close: '`' },
      ],
      folding: {
        markers: {
          start: /^\s*\/\/\s*#?region\b/,
          end: /^\s*\/\/\s*#?endregion\b/
        }
      },
      indentationRules: {
        increaseIndentPattern: /^((?!\/\/).)*(\{[^}"'`]*|\([^)"'`]*|\[[^\]"'`]*)$/,
        decreaseIndentPattern: /^\s*(}|\)|\])$/,
      }
    });
  });
}

/**
 * Configure TypeScript for JSX/TSX syntax highlighting
 * @param uri The URI of the file
 */
export function configureJsxSupport(uri: string): void {
  // If this is a TSX file, ensure JSX syntax highlighting is enabled
  if (uri.endsWith('.tsx')) {
    // Register JSX tokens provider if needed
    languages.typescript.typescriptDefaults.setCompilerOptions({
      ...languages.typescript.typescriptDefaults.getCompilerOptions(),
      jsx: languages.typescript.JsxEmit.ReactJSX,
      jsxFactory: 'React.createElement',
      jsxFragmentFactory: 'React.Fragment',
      jsxImportSource: '@emotion/react'
    });
  }
}

/**
 * Register document formatting provider for TypeScript
 * @param prettierToThrow Function to format code using Prettier
 */
export function registerFormattingProvider(
  prettierToThrow: (options: { code: string; toThrow: boolean }) => Promise<string>
): void {
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
}

/**
 * Enable or disable TypeScript validation
 * @param enable Whether to enable validation
 */
export function setTypeScriptValidation(enable: boolean): void {
  languages.typescript.typescriptDefaults.setDiagnosticsOptions(getDiagnosticsOptions(enable));
}
