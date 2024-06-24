import { Mutex } from "async-mutex";
import type { Record } from "immutable";
import imap from "./importMap";
import HTML from "./index.html?raw";
import { CodePatch, ICodeSession } from "./makeSess";
import { md5 } from "./md5";

// Export necessary modules and types
export { HTML, md5 };
export const importMap = { imports: imap.imports };
type IUsername = string;

// Define event types
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

// Define user types
export type IUserJSON = {
  name: IUsername;
  state: ICodeSession;
};

export type IUser = Record<
  IUserJSON & { room: string; state: Record<ICodeSession> }
>;

// Database utility functions
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
      return await syncStorage(
        setItem,
        getItem,
        oldSession,
        newSession,
        message,
      );
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

// Type definitions for storage operations
type SetItem<T> = (
  key: string,
  value: T,
  callback?: (err: Error, value: T) => void,
) => Promise<T>;
type GetItem<T> = (
  key: string,
  callback?: (err: Error, value: T | null) => void,
) => Promise<T | null>;

const storageMutex = new Mutex();

/**
 * Synchronize storage by applying patches to the session state.
 * @param setItem - Function to set an item in the storage.
 * @param getItem - Function to get an item from the storage.
 * @param oldSession - The previous state of the session.
 * @param newSession - The new state of the session.
 * @param message - The patch message to apply.
 */
export const syncStorage = async (
  setItem: SetItem<Partial<CodePatch | ICodeSession> | number | string>,
  getItem: GetItem<Partial<CodePatch | ICodeSession> | number | string>,
  oldSession: Partial<CodePatch & ICodeSession>,
  newSession: Partial<CodePatch | ICodeSession>,
  message: CodePatch,
) => {
  await storageMutex.runExclusive(async () => {
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

    const oldNode = (await getItem(String(historyHead))) as unknown as
      & ICodeSession
      & Partial<CodePatch>;
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
