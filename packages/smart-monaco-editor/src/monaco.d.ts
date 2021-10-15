import * as monaco from "monaco-editor";

declare module "./monaco.js" {
  const getMonaco: () => {
    editor: monaco.editor.IStandaloneCodeEditor;
    Uri: { parse: (str: string) => monaco.Uri };
    languages: {
      typescript: {
        typescriptDefaults: monaco.languages.typescript.LanguageServiceDefaults;
        JsxEmit: monaco.languages.typescript.JsxEmit;
      };
    };
  };
}
