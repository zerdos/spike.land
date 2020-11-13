import type * as monaco from "https://unpkg.com/monaco-editor@0.21.2/monaco.d.ts";

interface ISmartMonacoEditor {
    monaco: Monaco;
    editor: Monaco.editor.IStandaloneCodeEditor;
  }

interface StartMonacoProps {
    onChange: (code: string) => void;
    code: string;
    language: "html" | "javascript" | "typescript";
  }

export interface Monaco extends monaco {
}

export interface SmartMonaco{
    (props: StartMonacoProps):Promise<ISmartMonacoEditor>
}

export let smartMonaco: SmartMonaco