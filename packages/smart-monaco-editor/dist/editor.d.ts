interface StartMonacoProps {
    onChange: (code: string) => void;
    code: string;
    container: HTMLDivElement;
    language: "html" | "javascript" | "typescript";
    options: {
        gylph: boolean;
    };
}
declare const _default: ({ onChange, code, language, container, options }: StartMonacoProps) => Promise<{
    monaco: any;
    editor: any;
} | undefined>;
export default _default;
