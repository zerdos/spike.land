import { Mutex } from "async-mutex";
import Immutable from "immutable";
import { Record } from "immutable";
import imap from "./importMap";
import HTML from "./index.html";
import { md5 } from "./md5";
export { resetCSS } from "./getResetCss";
export { importMapReplace } from "./importMapReplace";
import type { Delta } from "./textDiff";
import { applyPatch as aPatch, createDelta } from "./textDiff";
export { esmTransform } from "./esbuildEsm";
export const importMap = { imports: imap.imports };
// Import * as Immutable from "immutable"
export { aPatch, createDelta };
type IUsername = string;

export { HTML };

export { md5 };

export const makeHash = (cx: ICodeSession) => String(Immutable.hash(string_(cx)));

export const makeSession: (p: ICodeSession) => ICodeSession = (
  p = { i: 0, code: "", html: "", css: "" },
) =>
  Record({ i: 0, code: "", html: "", css: "" })({
    i: p.i || 0,
    code: p.code || `export default ()=> <>Nothing</>`,
    html: p.html || "",
    css: (p.css || "").split(".css-").filter((x) =>
      x.startsWith("html") || (p.html || "").indexOf(x.slice(0, 5)) !== -1
    )
      .join(".css-"),
  }).toJS();

export type ICodeSession = {
  code: string;
  i: number;
  html: string;
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

export type IEvent =
  | INewWSConnection
  | OtherEvent
  | ICodeInitEvent;

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

export function db(
  codeSpace: string,
  initDb: (codeSpace: string) => Promise<LocalForage>,
) {
  const mod = {
    syncDb: async (
      oldSession: ICodeSession,
      newSession: ICodeSession,
      message: CodePatch,
    ) => {
      const { getItem, setItem } = mod;

      const syncDb = async (
        oldSession: ICodeSession,
        newSession: ICodeSession,
        message: CodePatch,
      ) =>
        await syncStorage(
          setItem,
          getItem,
          oldSession,
          newSession,
          message,
        );
      return await syncDb(oldSession, newSession, message);
    },
    getItem: async (key: string) => {
      const db = await initDb(codeSpace);

      return await db.getItem(key) as unknown as object | string | number;
    },
    setItem: async <T>(key: string, value: T) => {
      const db = await initDb(codeSpace);

      return await db.setItem(key, value) as T;
    },
  };
  return mod;
}

export function initSession(room: string, u: IUserJSON) {
  return Record({ ...u, room, state: Record(u.state)() });
}

type SetItem<T> = (
  key: string,
  value: T,
  callback?: (err: any, value: T) => void,
) => Promise<T>;

type GetItem<T> = (
  key: string,
  callback?: (err: any, value: T | null) => void,
) => Promise<T | null>;

const storageMutex = new Mutex();
export const syncStorage = async (
  setItem: SetItem<Partial<CodePatch | ICodeSession> | number | string>,
  getItem: GetItem<Partial<CodePatch | ICodeSession> | number | string>,
  oldSession: Partial<CodePatch & ICodeSession>,
  newSession: Partial<CodePatch | ICodeSession>,
  message: CodePatch,
) => {
  storageMutex.runExclusive(async () => {
    const hashOfOldSession = oldSession.newHash!;
    let historyHead = String(await getItem("head"));
    if (!historyHead) {
      await setItem(String(hashOfOldSession), oldSession);
      await setItem("head", hashOfOldSession);
      historyHead = hashOfOldSession;
    }

    await setItem(String(message.newHash), {
      ...newSession,
      oldHash: message.oldHash,
      reversePatch: message.reversePatch,
    });
    // await setItem(message.oldHash, {
    //   ...oldSession,
    //   newHash: message.newHash,
    //   patch: message.patch,
    // });
    const oldNode = (await getItem(String(historyHead))) as unknown as
      & ICodeSession
      & Partial<CodePatch>;
    // if (!oldNode) throw Error("corrupt storage");
    await setItem(String(historyHead), {
      newHash: message.newHash,
      patch: message.patch,

      ...(oldNode
        ? {
          i: oldNode.i,
          oldHash: oldNode.oldHash,
          reversePatch: oldNode.reversePatch,
        }
        : {
          code: oldSession.code,
          html: oldSession.html,
          css: oldSession.css,
        }),
    });
    await setItem("head", message.newHash);
  });
};

export type CodePatch = {
  oldHash: string;
  newHash: string;
  patch: Delta[];
  reversePatch: Delta[];
};

// function addOrigin(s: ICodeSession, originString: string) {
//   const { i, code, html, css } = s;

//   const mst = { i, code, html, css };

//   // mst.code = mst.code.replace("from '/live", `from './`);
//   // mst.code = mst.code.replace("from './", `from '${originString}/live/`);

//   return mst;
// }

export function string_(s: ICodeSession) {
  const { i, code, html, css } = s;
  return JSON.stringify({ i, code, html, css });
}
