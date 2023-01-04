import { Mutex } from "async-mutex";
import { Record } from "immutable";
import imap from "./importMap";
import HTML from "./index.html";
import { md5 } from "./md5";
export { resetCSS } from "./getResetCss";
export { importMapReplace } from "./importMapReplace";
import type { Delta } from "./textDiff";
import { applyPatch as aPatch, createDelta } from "./textDiff";
export { esmTransform } from "./esmTran";
export const importMap = { imports: imap.imports };
// Import * as Immutable from "immutable"
export { aPatch, createDelta };
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

export function db(codeSpace: string, initDb: (codeSpace: string) => Promise<LocalForage>) {
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

      return await db.getItem(key);
    },
    setItem: async (key: string, value: object | string | number) => {
      const db = await initDb(codeSpace);

      return await db.setItem(key, value);
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
  _setItem: SetItem<Partial<CodePatch | ICodeSession> | number | string>,
  _getItem: GetItem<Partial<CodePatch | ICodeSession> | number | string>,
  oldSession: ICodeSession,
  newSession: ICodeSession,
  message: {
    oldHash: number;
    newHash: number;
    reversePatch: Delta[];
    patch: Delta[];
  },
) => {
  storageMutex.runExclusive(async () => {
    const setItem = (k: number, v: object) => _setItem(String(k), v);

    const getItem = (k: number) =>
      _getItem(String(k)) as unknown as GetItem<
        { oldHash: number; reversePatch?: typeof message.reversePatch }
      >;
    const hashOfOldSession = Record(oldSession)().hashCode();
    let historyHead = (await _getItem("head")) as unknown as number;
    if (!historyHead) {
      await setItem(hashOfOldSession, oldSession);
      await _setItem("head", hashOfOldSession);
      historyHead = hashOfOldSession;
    }

    await setItem(message.newHash, {
      ...newSession,
      oldHash: message.oldHash,
      reversePatch: message.reversePatch,
    });
    // await setItem(message.oldHash, {
    //   ...oldSession,
    //   newHash: message.newHash,
    //   patch: message.patch,
    // });
    const oldNode = (await getItem(historyHead)) as unknown as
      & ICodeSession
      & Partial<CodePatch>;
    // if (!oldNode) throw Error("corrupt storage");
    await setItem(historyHead, {
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
          transpiled: oldSession.transpiled,
          html: oldSession.html,
          css: oldSession.css,
        }),
    });
    await _setItem("head", message.newHash);
  });
};

export type CodePatch = {
  oldHash: number;
  newHash: number;
  patch: Delta[];
  reversePatch: Delta[];
};
type IApplyPatch = (
  prop: CodePatch,
  codeSpace: string,
) => void;

type ICodeSess = {
  hashOfState: () => number;
  applyPatch: IApplyPatch;
  createPatchFromHashCode: (
    c: number,
    st: ICodeSession,
    updateHash?: (h: string) => void,
  ) => CodePatch | null;
  json: () => IUserJSON;
};

const sessions: { [codeSpace: string]: CodeSession } = {};

const hashStore: { [key: string]: Record<ICodeSession> } = {};
export class CodeSession implements ICodeSess {
  session: IUser;
  update() {
    Object.keys(this.cb).map((k) => this.cb[k]).map((x) => {
      try {
        x();
      } catch (error) {
        console.error("error calling callback", { err: error });
      }
    });
  }

  cb: { [key: string]: () => void } = {};

  onUpdate(fn: () => void, regId: string) {
    this.cb[regId] = fn;
  }

  hashCodeSession = 0;
  room: string;
  created: string = new Date().toISOString();
  constructor(codeSpace: string, user: IUserJSON) {
    sessions[codeSpace] = this;
    this.room = codeSpace;
    const savedState: ICodeSession | null = null;

    // If (user.state.code === "" && room) {
    // const cacheKey = `state-${room}`;

    // if (storageAvailable("localStorage")) {
    //   const savedStateStr = localStorage.getItem(cacheKey);
    //   if (savedStateStr) {
    //     savedState = JSON.parse(savedStateStr);
    //   } else {
    //     fetch(`/live/${room}/mySession`).then(
    //       (resp) => resp.json(),
    //     ).then((session: IUserJSON) => {
    //       localStorage.setItem(cacheKey, JSON.stringify(session.state));
    //       this.session.set("state", Record(session.state)());
    //     });
    //   }
    // }
    // }

    this.session = initSession(codeSpace, {
      ...user,
      state: savedState
        ? savedState
        : JSON.parse(string_({ ...user.state, codeSpace })),
    })();
    hashStore[hashKEY(codeSpace)] = this.session.get("state");
  }

  hashOfState = () => {
    const state = this.session.get("state");
    const hashCode = state.hashCode();
    hashStore[hashCode] = state;
    return hashCode;
  };

  createPatchFromHashCode = (
    oldHash: number,
    state: ICodeSession,
    // updateHash?: (h: string) => void,
  ) => {
    const s = JSON.parse(string_(state));

    hashStore[hashKEY(this.room)] = this.session.get(
      "state",
    );
    let oldRec = hashStore[oldHash];
    let usedOldHash = oldHash;

    // if (!oldRec) {
    //   fetch(
    //     `/live/${this.room}/mST`,
    //   ).then(async (resp) => {
    //     if (!resp.ok) {
    //       console.error(location.origin + " is NOT OK", await resp.text());
    //       throw new Error(location.origin + " is NOT OK");
    //     }

    //     const { mST } = await resp.json();
    //     const hashC = md5(mST.transpiled);
    //     if (updateHash) {
    //       updateHash(hashC);
    //     }

    //     hashStore[hashC] = this.session.get("state").merge(mST);

    //     oldRec = hashStore[hashC];
    //     this.createPatchFromHashCode(hashC, state, updateHash);
    //   });
    //   return null;
    // }

    const oldString = string_(oldRec.toJSON());

    const newRec = oldRec.merge(s);
    const newString = string_(newRec.toJSON()).split(
      md5(newRec.get("transpiled")),
    ).join("css");
    const newNewRecord = this.session.get("state").merge(JSON.parse(newString));
    const newHash = newNewRecord.hashCode();
    hashStore[newHash] = newNewRecord;

    const patch = createPatch(oldString, newString);
    const reversePatch = createPatch(newString, oldString);
    return {
      oldHash: usedOldHash,
      newHash,
      reversePatch,
      patch,
    };
  };

  patchSync = (sess: ICodeSession, force = false) => {
    if (!force) {
      if (
        sess.code !== this.session.get("state").code
        && sess.i <= this.session.get("state").i
      ) throw new Error("Code update without I update error");
      sess.i;
      if (sess.i < this.session.get("state").i) {
        console.log("never going back!");
        sess.i = this.session.get("state").i + 1;
        // return;
      }
      if (
        sess.code !== this.session.get("state").code
        && sess.i <= this.session.get("state").i
      ) throw new Error("Code update without I update error");

      if (sess.transpiled.slice(0, 12) !== `/*${md5(sess.code)}*/`) {
        console.error(
          `missing: /*${md5(sess.code)}*/, transpiled: ${sess.transpiled.slice(0, 12)}`,
        );
        throw new Error("transpiled	hack issue");
      }

      if (sess.code.length < 5) {
        throw new Error("code deleted?");
      }

      if (sess.html.indexOf(md5(sess.transpiled)) === -1) {
        console.error(`missing md5trans from html: ${md5(sess.transpiled)}
      ${sess.html.slice(0, 64)}
      
      `);
        throw new Error(`render hack issue missing: ${md5(sess.transpiled)}.`);
      }

      if (sess.css.length && sess.css.indexOf(md5(sess.transpiled)) === -1) {
        console.error(`missing from css: ${md5(sess.transpiled)}`);
        throw new Error(`render hack issue missing: ${md5(sess.transpiled)}.`);
      }
    }

    const oldHash = this.session.get("state").hashCode();
    this.session = this.session.set(
      "state",
      this.session.get("state").merge(sess),
    );
    const newHash = this.session.get("state").hashCode();
    if (newHash !== oldHash && force !== true) {
      // console.log({ sess });\
      // queueMicrotask(() => {
      // this.createPatchFromHashCode(oldHash, mST(this.room));
      this.update();
      // });
    }
    return this.session;
  };

  // reverse = ({oldHash,
  // 	newHash,
  // 	patch}: CodePatch
  // 	)=>{
  // 		return 0;
  // 	}
  applyPatch = ({
    oldHash,
    newHash,
    patch,
  }: CodePatch) => {
    if (!(oldHash && newHash && patch.length)) return;
    // const codeSpace = this.room || "";
    hashStore[hashKEY(this.room)] = this.session.get("state");
    let maybeOldRec = hashStore[oldHash];
    // try {
    //   if (!maybeOldRec) {
    //     // console.log(Object.keys(hashStore));
    //     const resp = await fetch(
    //       `/live/${codeSpace}/mST`,
    //     );
    //     if (resp.ok) {
    //       const s: { hashCode: string; mST: ICodeSession } = await resp.json();

    //       // HashStore[Number(s.hashCode)] =

    //       const serverRecord = this.session.get("state").merge(
    //         JSON.parse(string_(s.mST)),
    //       );
    //       hashStore[md5(serverRecord.transpiled)] = serverRecord;
    //     } else {
    //       const { mST } = await import(
    //         `/live/${this.room}/mst.mjs?${Date.now()}`
    //       );
    //       const latestRec = this.session.get("state").merge(
    //         JSON.parse(string_(mST)),
    //       );
    //       hashStore[md5(latestRec.transpiled)] = latestRec;
    //     }
    //   }

    // maybeOldRec = hashStore[oldHash];
    if (!maybeOldRec) throw new Error(`cant find old record: ${oldHash}`);
    // } catch (err) {
    //   console.error({ err });
    //   throw new Error("oldHash not found");
    // }
    const oldString = string_(maybeOldRec.toJSON());

    const applied = aPatch(oldString, patch);
    const newState = JSON.parse(applied);
    const newRec: Record<ICodeSession> = this.session.get("state").merge(
      newState,
    );

    const newRecord = this.session.get("state").merge(newRec);
    // if (newRecord.i < this.session.get("state").i) {
    //   throw new Error("never going back!");
    // }
    // if (
    //   newRecord.code !== this.session.get("state").code
    //   && newRecord.i <= this.session.get("state").i
    // ) throw new Error("Code update without I update error");

    // const codeHash = md5(newRecord.code);

    // if (newRecord.transpiled.slice(0, 12) !== "/*" + codeHash + "*/") {
    //   console.error(
    //     `missing: ${codeHash}, transpiled`,
    //     newRecord.transpiled.slice(0, 12),
    //   );
    //   throw new Error("transpiled	hack issue");
    // }

    // if (newRecord.code.length < 5) {
    //   throw new Error("code deleted?");
    // }

    // const transHash = md5(newRecord.transpiled);
    // if (newRecord.html.indexOf(transHash) === -1) {
    //   console.error(`missing from html: ${transHash}
    //   ${newRecord.html}

    //   `);
    //   throw new Error(`render hack issue missing: ${transHash}.`);
    // }

    // if (newRecord.css.indexOf(transHash) === -1) {
    //   console.error(`missing from css: ${transHash}`);
    //   throw new Error(`render hack issue missing: ${transHash}.`);
    // }

    const newHashCheck = newRecord.hashCode();

    if (newHashCheck === newHash) {
      this.session = this.session.set("state", newRecord);
      //  Console.error("WRONG update");
      hashStore[newHash] = this.session.get("state");
    } else {
      throw new Error("Wrong patch");
    }
    return newHash;
  };

  json() {
    const user = this.session.toJSON();
    const state = user.state.toJSON();
    return { ...user, state };
  }

  setRoom(codeSpace: string) {
    const user = this.session.set("room", codeSpace);
    this.session = user;
  }
}
export const hashKEY = (codeSpace: string) => sessions[codeSpace]?.session.get("state").hashCode();
export function mST(codeSpace: string, p?: Delta[]) {
  if (p && p.length) {
    const sessAsJs = sessions[codeSpace]?.session.get("state").toJSON();

    const { i, transpiled, code, html, css }: ICodeSession = p
      ? JSON.parse(
        aPatch(
          string_(
            sessAsJs,
          ),
          p,
        ),
      )
      : sessAsJs;
    return sessions[codeSpace]?.session.get("state").merge({
      i,
      transpiled,
      code,
      html,
      css,
      codeSpace,
    }).toObject();
  }
  return sessions[codeSpace].session.get("state").toObject();
}

// function addOrigin(s: ICodeSession, originString: string) {
//   const { i, transpiled, code, html, css } = s;

//   const mst = { i, transpiled, code, html, css };

//   // mst.code = mst.code.replace("from '/live", `from './`);
//   // mst.code = mst.code.replace("from './", `from '${originString}/live/`);

//   return mst;
// }

export function string_(s: ICodeSession) {
  const { i, transpiled, code, html, css } = s;
  return JSON.stringify({ i, transpiled, code, html, css });
}

export const applyPatchSync: IApplyPatch = (x, codeSpace: string) => sessions[codeSpace]?.applyPatch(x);

export const applyPatch: IApplyPatch = (x, codeSpace: string) => {
  sessions[codeSpace]?.applyPatch(x);
  sessions[codeSpace]?.update();
};

export const onSessionUpdate = (
  fn: () => void,
  regId = "default",
  codeSpace: string,
) => sessions[codeSpace]?.onUpdate(fn, regId);
export const makePatchFrom = (
  n: number,
  st: ICodeSession,
  codeSpace: string,
  // update?: (h: string) => void,
) => ({
  codeSpace,
  i: st.i,
  ...(sessions[codeSpace]?.createPatchFromHashCode(n, st)),
});
export const makePatch = (
  st: ICodeSession,
  codeSpace: string,
  // update?: (h: string) => void,
) => ({
  ...makePatchFrom(hashKEY(codeSpace), st, codeSpace),
  codeSpace,
  i: st.i,
});

export const startSession = (
  codeSpace: string,
  // origin: string,
  u: IUserJSON,
  // originString: string,
): CodeSession =>
  sessions[codeSpace] || (sessions[codeSpace] = new CodeSession(codeSpace, {
    name: u.name,
    state: { ...u.state, codeSpace },
  }));

function createPatch(oldCode: string, newCode: string) {
  return createDelta(oldCode, newCode);
}

export const patchSync = (sess: ICodeSession, force = true) => sessions[sess.codeSpace].patchSync(sess, force);

export { type Delta } from "./textDiff";

export function hashCode(sess: ICodeSession) {
  return Record<ICodeSession>(sess)().hashCode();
}
