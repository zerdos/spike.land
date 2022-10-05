import { Record } from "immutable";

import { applyPatch as aPatch, createDelta, Delta } from "./textDiff";
// Import * as Immutable from "immutable"

export type { Delta };
type IUsername = string;

export interface ICodeSession {
  code: string;
  i: number;
  transpiled: string;
  html: string;
  css: string;
}

export interface INewWSConnection {
  uuid: string;
  timestamp: number;
  hashCode: number;
  type: "new-ws-connection";
}

interface ICodeInitEvent extends ICodeSession {
  name: IUsername;
  uuid: string;
  type: "code-init";
  hashOfCode: string;
}

interface OtherEvent {
  name: IUsername;
  uuid: string;
  target: IUsername | "broadcast";
  type: "start" | "open" | "quit" | "get-cid" | "provide-cid" | "new-ws";
  timestamp: number;
}

export type IEvent =
  | INewWSConnection
  | OtherEvent
  | ICodeInitEvent;

export interface IUserJSON {
  name: IUsername;
  state: ICodeSession;
}

export type IUser = Record<
  IUserJSON & {
    room: string;
    state: Record<ICodeSession>;
  }
>;

export function initSession(room: string, u: IUserJSON) {
  return Record({ ...u, room, state: Record(u.state)() });
}

type CodePatch = { oldHash: number; newHash: number; patch: Delta[] };
type IApplyPatch = (
  prop: CodePatch,
) => Promise<void>;

interface ICodeSess {
  hashOfState: () => number;
  applyPatch: IApplyPatch;
  createPatchFromHashCode: (
    c: number,
    st: ICodeSession,
    updateHash?: (h: string) => void,
  ) => Promise<CodePatch>;
  json: () => IUserJSON;
}

let session: CodeSession | null = null;

const hashStore: { [key: number]: Record<ICodeSession> } = {};
export class CodeSession implements ICodeSess {
  session: IUser;
  update(patch: CodePatch) {
    Object.keys(this.cb).map((k) => this.cb[k]).map((x) => {
      try {
        x(true, patch);
      } catch (err) {
        console.error("error calling callback", { err });
      }
    });
  }
  cb: { [key: string]: (_force: boolean, patch: CodePatch) => void } = {};
  onUpdate(fn: (force: boolean, patch: CodePatch) => void, regId: string) {
    this.cb[regId] = fn;
  }
  hashCodeSession: number = 0;
  room: string;
  created: string = new Date().toISOString();
  constructor(room: string, user: IUserJSON) {
    session = this;
    this.room = room;
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

    this.session = initSession(room, {
      ...user,
      state: savedState ? savedState : JSON.parse(str(user.state)),
    })();
  }

  hashOfState = () => {
    const state = this.session.get("state");
    const hashCode = state.hashCode();
    hashStore[hashCode] = state;
    return hashCode;
  };

  createPatchFromHashCode = async (
    oldHash: number,
    state: ICodeSession,
    updateHash?: (h: string) => void,
  ) => {
    const s = JSON.parse(str(state));

    let oldRec = hashStore[oldHash];
    let usedOldHash = oldHash;

    if (!oldRec) {
      const resp = await fetch(
        `/live/${this.room}/mST`,
      );
      if (!resp.ok) {
        console.error(location.origin + " is NOT OK", await resp.text());
        throw new Error(location.origin + " is NOT OK");
      }

      const { mST, hashCode } = await resp.json() ;
      if (updateHash) updateHash(hashCode);
      hashStore[hashCode] = this.session.get("state").merge(mST);

      usedOldHash = hashCode;
      oldRec = hashStore[hashCode];
    }

    const oldStr = str(oldRec.toJSON());

    const newRec = oldRec.merge(s);
    const newStr = str(newRec.toJSON());
    const newHash = newRec.hashCode();
    hashStore[newHash] = newRec;

    const patch = createPatch(oldStr, newStr);
    return {
      oldHash: usedOldHash,
      newHash,
      patch,
    };
  };

  patchSync = (sess: ICodeSession) => {
    const oldHash = this.session.hashCode();
    this.session = this.session.set(
      "state",
      this.session.get("state").merge(sess),
    );
    const newHash = this.session.hashCode();
    if (newHash !== oldHash) {
      console.log({ sess });
      (self["requestAnimationFrame"] || setTimeout)(() => this.createPatchFromHashCode(oldHash, mST()).then((x) => this.update(x)));
    }
  };

  applyPatch = async ({
    oldHash,
    newHash,
    patch,
  }: CodePatch) => {
    const codeSpace = this.room || "";

    if (
      !(Object.keys(hashStore).map((x) => Number(x)).includes(
        Number(oldHash),
      )) &&
      codeSpace
    ) {
      console.log(Object.keys(hashStore));
      const resp = await fetch(
        `/live/${codeSpace}/mST`,
      );
      if (resp.ok) {
        const s: { hashCode: string; mST: ICodeSession } = await resp.json();

        // hashStore[Number(s.hashCode)] =

        const serverRecord = this.session.get("state").merge(
          JSON.parse(str(s.mST)),
        );
        hashStore[serverRecord.hashCode()] = serverRecord;
      } else {
        const { mST } = await import(
        `/live/${this.room}/mst.mjs?${Date.now()}`
        );
        const latestRec = this.session.get("state").merge(
          JSON.parse(str(mST)),
        );
        hashStore[latestRec.hashCode()] = latestRec;
      }
    }

    const oldStr = str(hashStore[oldHash].toJSON());
    const applied = aPatch(oldStr, patch);
    const newState = JSON.parse(applied);
    const newRec: Record<ICodeSession> = this.session.get("state").merge(
      newState,
    );

    const newRecord = this.session.get("state").merge(newRec);

    const newHashCheck = newRecord.hashCode();

    if (newHashCheck === newHash) {
      this.session = this.session.set("state", newRecord);
      //  Console.error("WRONG update");
    } else {
      new Error("Wrong patch");
      return;
    }
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

export const hashCode = () => {
 return session ? session.hashOfState() : 0
};


export function mST(){
  if (!session) {
    return {
      i: 0,
      transpiled: "",
      code: "",
      html: "",
      css: "",
    };
  }

  // if (originStr) return addOrigin(session.json().state, originStr);

  const { i, transpiled, code, html, css } = session.session.toJSON().state;
return { i, transpiled, code, html, css };
};

function addOrigin(s: ICodeSession, originStr: string) {
  const { i, transpiled, code, html, css } = s;

  const mst = { i, transpiled, code, html, css };

  mst.code = mst.code.replace(`from '/live`, `from '${originStr}/live`);
  mst.code = mst.code.replace(`from './`, `from '${originStr}/live/`);

  mst.transpiled = mst.transpiled.replace(
    `from "/live`,
    `from "${originStr}/live`,
  );

  mst.transpiled = mst.transpiled.replace(
    `from "./`,
    `from "${originStr}/live/`,
  );
  return mst;
}
function str(s: ICodeSession) {
  const { i, transpiled, code, html, css } = s;
  return JSON.stringify({ i, transpiled, code, html, css });
}

export const applyPatch: IApplyPatch = async (x) => {
  await session?.applyPatch(x);
  session?.update(x);
};
export const onSessionUpdate = (
  fn: (_force: boolean, messageData: object) => void,
  regId = "default",
) => session?.onUpdate(fn, regId);
export const makePatchFrom = (
  n: number,
  st: ICodeSession,
  update?: (h: string) => void,
) => (session as CodeSession).createPatchFromHashCode(n, st, update);
export const makePatch = (st: ICodeSession, update?: (h: string) => void) =>
  makePatchFrom(hashCode(), st, update);

export const startSession = (
  room: string,
  u: IUserJSON,
  originStr: string,
): CodeSession =>
  session ||
  new CodeSession(room, { name: u.name, state: addOrigin(u.state, originStr) });

function createPatch(oldCode: string, newCode: string) {
  return createDelta(oldCode, newCode);
}

export const patchSync = (sess: ICodeSession) => session?.patchSync(sess);
