export function getDbObj(db: any): {
  get(key: any, format?: string): any;
  put(key: any, val: any): Promise<any>;
  delete(key: any): Promise<any>;
  clear(): Promise<any>;
  keys(): Promise<any>;
};
//# sourceMappingURL=getDbObj.d.ts.map
