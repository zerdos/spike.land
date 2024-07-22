import { RpcProvider } from "worker-rpc";
export declare const getPort: () => MessagePort;
export declare const init: (swVersion: string, port?: MessagePort | null) => RpcProvider;
export declare const prettier: (code: string) => Promise<string>;
export declare const ata: ({ code, originToUse }: {
    code: string;
    originToUse: string;
}) => Promise<{
    content: string;
    filePath: string;
}[]>;
export declare const tsx: (code: string) => Promise<{
    content: string;
    filePath: string;
}[]>;
export declare const transpile: ({ code, originToUse }: {
    code: string;
    originToUse: string;
}) => Promise<string>;
export declare const build: ({ codeSpace, origin, format }: {
    codeSpace: string;
    origin: string;
    format: "esm" | "iife";
}) => Promise<string>;
export declare const connect: (codeSpace: string) => RpcProvider;
