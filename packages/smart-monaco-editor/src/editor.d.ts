/// <reference types="https://unpkg.com/monaco-editor@0.21.2/monaco.d.ts" />

interface ISmartMonacoEditor {
  monaco: monaco;
  editor: monaco.editor.IStandaloneCodeEditor;
}

interface StartMonacoProps {
  onChange: (code: string) => void;
  code: string;
  language: "html" | "javascript" | "typescript";
}

export interface SmartMonaco {
  (props: StartMonacoProps): Promise<ISmartMonacoEditor>;
}

export let smartMonaco: SmartMonaco;
