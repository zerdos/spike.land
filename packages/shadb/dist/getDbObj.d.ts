export declare const getDbObj: (dbPromise: any, isIdb?: boolean) => {
    get<T>(key: string, format?: "string" | "json" | "stream"): Promise<string | T>;
    put(key: string, val: string | ArrayBuffer): Promise<any>;
    delete(key: string): Promise<any>;
    clear(): Promise<any>;
    keys(): Promise<any>;
};
