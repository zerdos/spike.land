import type { editor as Editor } from "monaco-editor";

// Types and interfaces for better type safety
export interface ExtraLib {
  filePath: string;
  content: string;
}

export interface EditorConfig {
  code: string;
  container: HTMLDivElement;
  codeSpace: string;
  onChange: (code: string) => void;
}

export interface EditorModel {
  getValue: () => string;
  lastValueHashToBeSet: string;
  silent: boolean;
  getErrors: () => Promise<string[]>;
  isEdit: boolean;
  setValue: (newCode: string) => void | Promise<void>;
  dispose?: () => void;
  editor: Editor.IStandaloneCodeEditor;
}

export interface EditorState {
  isUpdating: { current: boolean; };
  pendingUpdate: { current: string | null; };
  previousContent: { current: string; };
  previousImports: { current: string[]; };
}

export interface ResponsiveSettings {
  mobile: Partial<Editor.IStandaloneEditorConstructionOptions>;
  tablet: Partial<Editor.IStandaloneEditorConstructionOptions>;
  desktop: Partial<Editor.IStandaloneEditorConstructionOptions>;
}
