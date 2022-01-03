import type { editor, languages, Uri } from "monaco-editor";

declare module "./monaco.js" {
  const getMonaco: () => {
    editor: {
      create: typeof editor.create;
      createModel: typeof editor.createModel;
    };
    Uri: typeof Uri;
    languages: {
      typescript: {
        typescriptDefaults: languages.typescript.LanguageServiceDefaults;
        JsxEmit: languages.typescript.JsxEmit;
      };
    };
  };
}
