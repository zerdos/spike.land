import type Monaco from "monaco-editor";
interface ISmartMonacoEditor {
  monaco: Monaco;
  editor: Monaco.Editor.IStandaloneCodeEditor;
}
interface StartMonacoProps {
  onChange: (code: string) => void;
  code: string;
  language: "html" | "javascript" | "typescript";
  options: {
    gylph: boolean;
  };
}
declare interface SmartMonaco {
  (props: StartMonacoProps): Promise<ISmartMonacoEditor>;
}
export declare const startMonaco: SmartMonaco;
export {};
