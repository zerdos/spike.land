export function getDB(storeName?: string): () => Promise<{
    get(key: any, format?: string): any;
    put(key: any, val: any): Promise<any>;
    delete(key: any): Promise<any>;
    clear(): Promise<any>;
    keys(): Promise<any>;
}>;
export namespace shaDB {
    function get(key: string, type: "string" | "json"): Promise<any>;
    function put(key: string, value: string): Promise<any>;
}
import { sha256 } from "../src/sha256.js";
import { diff } from "../src/diff.js";
import { assemble } from "../src/diff.js";
import { getDbObj } from "../src/getDbObj.js";
export { sha256, diff, assemble, getDbObj };
//# sourceMappingURL=shaDB.d.ts.map