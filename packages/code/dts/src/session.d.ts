import type { Record } from "immutable";
import HTML from "./index.html";
import { CodePatch, ICodeSession } from "./makeSess";
import { md5 } from "./md5";
export { HTML, md5 };
export declare const importMap: {
  imports: {
    "@emotion/react/jsx-runtime": string;
    "react/jsx-runtime": string;
    "react-dom/client": string;
    "@emotion/react": string;
    "@emotion/cache": string;
    "@emotion/styled": string;
    react: string;
    "framer-motion": string;
    "react-dom": string;
    "foo-bar": string;
  };
};
type IUsername = string;
export type INewWSConnection = {
  uuid: string;
  timestamp: number;
  hashCode: string;
  type: "new-ws-connection";
};
type ICodeInitEvent = {
  name: IUsername;
  uuid: string;
  type: "code-init";
  hashOfCode: string;
} & ICodeSession;
type OtherEvent = {
  name: IUsername;
  uuid: string;
  target: IUsername | "broadcast";
  type: "start" | "open" | "quit" | "get-cid" | "provide-cid" | "new-ws";
  timestamp: number;
};
export type IEvent = INewWSConnection | OtherEvent | ICodeInitEvent;
export type IUserJSON = {
  name: IUsername;
  state: ICodeSession;
};
export type IUser = Record<
  IUserJSON & {
    room: string;
    state: Record<ICodeSession>;
  }
>;
export declare function db(codeSpace: string, initDb: (codeSpace: string) => Promise<LocalForage>): {
  syncDb: (oldSession: ICodeSession, newSession: ICodeSession, message: CodePatch) => Promise<void>;
  getItem: (key: string) => Promise<string | number | object>;
  setItem: <T>(key: string, value: T) => Promise<T>;
};
type SetItem<T> = (key: string, value: T, callback?: (err: Error, value: T) => void) => Promise<T>;
type GetItem<T> = (key: string, callback?: (err: Error, value: T | null) => void) => Promise<T | null>;
export declare const syncStorage: (
  setItem: SetItem<Partial<CodePatch | ICodeSession> | number | string>,
  getItem: GetItem<Partial<CodePatch | ICodeSession> | number | string>,
  oldSession: Partial<CodePatch & ICodeSession>,
  newSession: Partial<CodePatch | ICodeSession>,
  message: CodePatch,
) => Promise<void>;
