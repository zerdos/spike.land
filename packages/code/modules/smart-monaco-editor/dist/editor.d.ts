interface StartMonacoProps {
    onChange: (code: string) => void;
    code: string;
    container: HTMLElement;
    language: "html" | "javascript" | "typescript";
    options: {
        gylph: boolean;
    };
}
declare const _default: ({ onChange, code, language, container, options }: StartMonacoProps) => Promise<{
    monaco: {
        editor: import("monaco-editor").editor.IStandaloneCodeEditor;
        Uri: {
            parse: (str: string) => import("monaco-editor").Uri;
        };
        languages: {
            typescript: {
                typescriptDefaults: import("monaco-editor").languages.typescript.LanguageServiceDefaults;
                JsxEmit: import("monaco-editor").languages.typescript.JsxEmit;
            };
        };
    };
    editor: any;
} | undefined>;
export default _default;
