export declare const cjs: (code: string) => Promise<string>;
export declare const transpile: (code: string, origin: string, wasmModule?: WebAssembly.Module) => Promise<string>;
export declare const build: ({ codeSpace, origin, format, wasmModule, }: {
    codeSpace: string;
    format: "esm" | "iife";
    origin: string;
    wasmModule?: WebAssembly.Module;
}) => Promise<string>;
