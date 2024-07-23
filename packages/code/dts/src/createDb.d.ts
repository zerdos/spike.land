import { ICodeSession } from "./makeSess";
export declare function initDb(codeSpace: string): Promise<LocalForage>;
export declare const ldb: (codeSpace: string) => {
  syncDb: (
    oldSession: ICodeSession,
    newSession: ICodeSession,
    message: import("./makeSess").CodePatch,
  ) => Promise<void>;
  getItem: (key: string) => Promise<string | number | object>;
  setItem: <T>(key: string, value: T) => Promise<T>;
};
