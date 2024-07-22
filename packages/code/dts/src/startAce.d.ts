import "ace-builds/src-min-noconflict/theme-monokai";
import "ace-builds/src-min-noconflict/mode-typescript";
export declare function startAce(code: string, cb: (_code: string) => void, container: HTMLDivElement): Promise<{
    getValue: () => string;
    getErrors: () => Promise<string[]>;
    setValue: (code: string) => void;
}>;
