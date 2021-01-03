export namespace shaDB {
    function get(key: string, type: "string" | "json"): Promise<any>;
    function put(key: string, value: string): Promise<any>;
}
