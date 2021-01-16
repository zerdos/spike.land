import {
  IStandaloneCodeEditor,
  LanguageServiceDefaults,
  Uri,
  UriComponents,
} from "monaco-editor";

declare module "./monaco.js" {
  const getMonaco: () => {
    editor: IStandaloneCodeEditor;
    Uri: { parse: (str: string) => Uri };
    languages: {
      typescript: {
        typescriptDefaults: LanguageServiceDefaults;
      };
    };
  };
}
