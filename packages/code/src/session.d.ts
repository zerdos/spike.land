import { Record } from "immutable";
import importMap from "./importmap.json";
import HTML from "./index.html";
import { md5 } from "./md5";
export { resetCSS } from "./getResetCss";
export { importMapReplace } from "./importMapReplace";
import type { Delta } from "./textDiff";
export { esmTransform } from "./esmTran";
export { importMap };
type IUsername = string;
export { HTML };
export { md5 };
export type ICodeSession = {
  code: string;
  i: number;
  codeSpace: string;
  html: string;
  transpiled: string;
  css: string;
};
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
export declare function initSession(room: string, u: IUserJSON): any;
type SetItem<T> = (key: string | number, value: T, callback?: (err: any, value: T) => void) => Promise<T>;
type GetItem<T> = (key: string | number, callback?: (err: any, value: T | null) => void) => Promise<T | null>;
export declare const syncStorage: (
  _setItem: SetItem<Partial<CodePatch | ICodeSession> | number>,
  _getItem: GetItem<Partial<CodePatch | ICodeSession> | number>,
  oldSession: ICodeSession,
  newSession: ICodeSession,
  message: {
    oldHash: number;
    newHash: number;
    reversePatch: Delta[];
    patch: Delta[];
  },
) => Promise<void>;
export type CodePatch = {
  oldHash: number;
  newHash: number;
  patch: Delta[];
  codeSpace: string;
  reversePatch: Delta[];
};
type IApplyPatch = (prop: CodePatch, codeSpace: string) => void;
type ICodeSess = {
  hashOfState: () => number;
  applyPatch: IApplyPatch;
  createPatchFromHashCode: (c: number, st: ICodeSession, updateHash?: (h: string) => void) => CodePatch | null;
  json: () => IUserJSON;
};
export declare class CodeSession implements ICodeSess {
  session: IUser;
  update(): void;
  cb: {
    [key: string]: () => void;
  };
  onUpdate(fn: () => void, regId: string): void;
  hashCodeSession: number;
  room: string;
  created: string;
  constructor(codeSpace: string, user: IUserJSON);
  hashOfState: () => any;
  createPatchFromHashCode: (oldHash: number, state: ICodeSession) => {
    oldHash: number;
    newHash: any;
    codeSpace: any;
    reversePatch: Delta[];
    patch: Delta[];
  };
  patchSync: (sess: ICodeSession, force?: boolean) => Record<
    IUserJSON & {
      room: string;
      state: Record<ICodeSession>;
    }
  >;
  applyPatch: ({ oldHash, newHash, patch }: CodePatch) => number | undefined;
  json(): any;
  setRoom(codeSpace: string): void;
}
export declare const hashKEY: (codeSpace: string) => any;
export declare const hashCode: (codeSpace: string) => string;
export declare function mST(codeSpace: string, p?: Delta[]): {
  i: number;
  transpiled: string;
  code: string;
  html: string;
  css: string;
  codeSpace: string;
};
export declare function string_(s: ICodeSession): string;
export declare const applyPatchSync: IApplyPatch;
export declare const applyPatch: IApplyPatch;
export declare const onSessionUpdate: (fn: () => void, regId: string | undefined, codeSpace: string) => void;
export declare const makePatchFrom: (n: number, st: ICodeSession) => {
  oldHash: number;
  newHash: any;
  codeSpace: any;
  reversePatch: Delta[];
  patch: Delta[];
};
export declare const makePatch: (st: ICodeSession) => {
  oldHash: number;
  newHash: any;
  codeSpace: any;
  reversePatch: Delta[];
  patch: Delta[];
};
export declare const startSession: (codeSpace: string, u: IUserJSON) => CodeSession;
export declare const patchSync: (sess: ICodeSession, force?: boolean) => Record<
  IUserJSON & {
    room: string;
    state: Record<ICodeSession>;
  }
>;
export { type Delta } from "./textDiff";
