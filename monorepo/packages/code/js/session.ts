/** @jsxImportSource @emotion/react */

import { Record } from "immutable";

import { applyPatch, createDelta, Delta } from "./textDiff";
// Import * as Immutable from "immutable"

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
  createPatchFromHashCode: (c: number, st: ICodeSession) => Promise<CodePatch>;
  json: () => IUserJSON;
}

let session: CodeSession | null = null;

const hashStore: { [key: number]: Record<ICodeSession> } = {};
export class CodeSession implements ICodeSess {
  session: IUser;
  hashCodeSession: number = 0;
  created: string = new Date().toISOString();
  constructor(private room: string, user: IUserJSON) {
    session = this;
    const savedState: ICodeSession | null = null;

    // If (user.state.code === "" && room) {
    // const cacheKey = `state-${room}`;

    // if (storageAvailable("localStorage")) {
    //   const savedStateStr = localStorage.getItem(cacheKey);
    //   if (savedStateStr) {
    //     savedState = JSON.parse(savedStateStr);
    //   } else {
    //     fetch(`//live/${room}/mySession`).then(
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

  public hashOfState() {
    const state = this.session.get("state");
    const hashCode = state.hashCode();
    hashStore[hashCode] = state;
    return hashCode;
  }

  public createPatchFromHashCode = async (
    oldHash: number,
    state: ICodeSession,
  ) => {
    const s = JSON.parse(str(state));

    if (!hashStore[oldHash]) {
      const resp = await fetch(
        `//live/${this.room}
        `,
      );

      const { mST, hashCode } = await resp.json();
      hashStore[hashCode] = this.session.get("state").merge(mST);
    }

    const oldRec = hashStore[oldHash];
    const oldStr = str(oldRec.toJSON());

    const newRec = oldRec.merge(s);
    const newStr = str(newRec.toJSON());
    const newHash = newRec.hashCode();
    hashStore[newHash] = newRec;

    const patch = createPatch(oldStr, newStr);
    return {
      oldHash,
      newHash,
      patch,
    };
  };

  public applyPatch = async ({
    oldHash,
    newHash,
    patch,
  }: CodePatch) => {
    const x = this.hashOfState();

    const bestGuesses = this.room || "";

    if (
      !Object.keys(hashStore).map((x) => Number(x)).includes(Number(oldHash)) &&
      bestGuesses
    ) {
      console.log(Object.keys(hashStore));
      const resp = await fetch(
        `//live/${bestGuesses}/mST`,
      );

      const s = await resp.json() as { hashCode: string; mST: ICodeSession };

      // hashStore[Number(s.hashCode)] =

      const serverRecord = this.session.get("state").merge(
        JSON.parse(str(s.mST)),
      );
      hashStore[serverRecord.hashCode()] = serverRecord;
    }

    const oldStr = str(hashStore[oldHash].toJSON());
    const applied = applyPatch(oldStr, patch);
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

  public json() {
    const user = this.session.toJSON();
    const state = user.state.toJSON();
    return { ...user, state };
  }

  public setRoom(codeSpace: string) {
    const user = this.session.set("room", codeSpace);
    this.session = user;
  }
}

export const hashCode = () => session ? session.hashOfState() : 0;

export const mST: () => ICodeSession = () => {
  if (!session) {
    return {
      i: 0,
      transpiled: "",
      code: "",
      html: "",
      css: "",
    };
  }

  const { i, transpiled, code, html, css } = session.json().state;
  return { i, transpiled, code, html, css };
};

function str(s: ICodeSession) {
  const { i, transpiled, code, html, css } = s;
  return JSON.stringify({ i, transpiled, code, html, css });
}

export const patch: IApplyPatch = async (x) => {
  await session?.applyPatch(x);
  if (globalThis.update) {
    await globalThis.update();
  }
};
export const makePatchFrom = (n: number, st: ICodeSession) =>
  session?.createPatchFromHashCode(n, st);
export const makePatch = (st: ICodeSession) => makePatchFrom(hashCode(), st);

export const startSession = (room: string, u: IUserJSON): CodeSession =>
  session || new CodeSession(room, u);

function createPatch(oldCode: string, newCode: string) {
  return createDelta(oldCode, newCode);
}
