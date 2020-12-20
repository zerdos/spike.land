/// <reference lib="dom" />

interface ISmartMonacoEditor {
  monaco: monaco;
  editor: monaco.editor.IStandaloneCodeEditor;
}

interface StartMonacoProps {
  onChange: (code: string) => void;
  code: string;
  language: "html" | "javascript" | "typescript";
  options?: {
    gylph: boolean;
  };
}

declare interface SmartMonaco {
  (props: StartMonacoProps): Promise<ISmartMonacoEditor>;
}
