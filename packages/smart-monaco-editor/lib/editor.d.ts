interface StartMonaco {
  onChange: (code: string) => void;
  code: string;
  language: "html" | "javascript" | "typescript";
}
export declare const importSpecificVersion: (version: any) => Function;
export declare const startMonaco: (
  { onChange, code, language }: StartMonaco,
) => Promise<any>;
export {};
