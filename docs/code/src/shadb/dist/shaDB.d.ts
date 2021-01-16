export function getDB(storeName?: string): () => Promise<{
  get(key: any, format?: string): any;
  put(key: any, val: any): Promise<any>;
  delete(key: any): Promise<any>;
  clear(): Promise<any>;
  keys(): Promise<any>;
}>;
