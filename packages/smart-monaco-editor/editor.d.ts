interface StartMonaco {
    onChange: (code: string) => void;
    code: string;
    language: "html" | "javascript" | "typescript";
}
export declare const startMonaco: ({ onChange, code, language }: StartMonaco) => Promise<any>;
export {};
