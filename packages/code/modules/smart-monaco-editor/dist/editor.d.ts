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
        editor: any;
        Uri: {
            parse: (str: string) => import("monaco-editor").Uri;
        };
        languages: {
            typescript: {
                typescriptDefaults: any;
            };
        };
    };
    editor: any;
} | undefined>;
export default _default;
