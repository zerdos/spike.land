export declare const getDB: () => Promise<{
  get(
    key: string,
    format?: "string" | "json" | "stream",
  ): Promise<string | unknown | null>;
  put(key: string, val: string | ArrayBuffer): Promise<any>;
  delete(key: string): Promise<any>;
  clear(): Promise<any>;
  keys(): Promise<any>;
}>;
export declare const getDbObj: (dbPromise: any, isIdb?: boolean) => {
  get(
    key: string,
    format?: "string" | "json" | "stream",
  ): Promise<string | unknown | null>;
  put(key: string, val: string | ArrayBuffer): Promise<any>;
  delete(key: string): Promise<any>;
  clear(): Promise<any>;
  keys(): Promise<any>;
};
