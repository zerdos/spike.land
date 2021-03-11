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
