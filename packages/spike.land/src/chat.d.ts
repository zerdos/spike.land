/// <reference types="@cloudflare/workers-types" />
import { CodeEnv } from "./env";
declare const api: ExportedHandler<CodeEnv>;
export declare const getImportMapStr: (orig: string) => string;
export default api;
