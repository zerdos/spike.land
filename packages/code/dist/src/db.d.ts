export function sha256(str: string): Promise<any>;
export namespace shaDB {
    function get(key: string, type: "string" | "json"): Promise<any>;
    function put(key: string, value: string): Promise<any>;
}
