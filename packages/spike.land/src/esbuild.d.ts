import { type TransformOptions } from "esbuild-wasm";
export declare const initAndTransform: (code: string, opts: TransformOptions, origin: string) => Promise<string>;
export declare function esmTransform(code: string, origin: string): Promise<string>;
declare const _default: {
  fetch(request: Request): Promise<Response | undefined>;
};
export default _default;
