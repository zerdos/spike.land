import type * as monaco from "monaco-editor";

declare module "./monaco.js" {
  const getMonaco: () => {
    editor: {
     create: typeof monaco.editor.create,
     createModel: typeof monaco.editor.createModel
    }
    Uri: typeof monaco.Uri
    languages: {
      typescript: {
        typescriptDefaults: monaco.languages.typescript.LanguageServiceDefaults;
        JsxEmit: monaco.languages.typescript.JsxEmit;
      };
    };
  };
}
