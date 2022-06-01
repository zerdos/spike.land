/** @jsxImportSource @emotion/react */

import { Record } from "immutable";

import { applyPatch, createDelta } from "./textDiff";
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

type CodePatch = { oldHash: number; newHash: number; patch: string }
type IApplyPatch = (
  prop: CodePatch,
) => Promise<ICodeSess>;

interface ICodeSess {
  hashCodeSession: number;
  hashCode: () => number;
  applyPatch: IApplyPatch;
  createPatch: (st: ICodeSession)=> CodePatch
  createPatchFromHashCode: (c: number, st: ICodeSession) => CodePatch
  json: () => IUserJSON;
}

let session: ICodeSess | null = null;

const hashStore: { [key: number]: Record<ICodeSession> } = {};
export class CodeSession implements ICodeSess {
  session: IUser;
  hashCodeSession: number;
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
    //     fetch(`https://spike.land/live/${room}/mySession`).then(
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
      state: savedState ? savedState : user.state,
    })();

    this.hashCodeSession = this.hashCode();
  }

  public hashCode() {
    const state = this.session.get("state");
    const hashCode = state.hashCode();
    hashStore[hashCode] = state;
    return hashCode;
  }

  public createPatchFromHashCode = async (
    oldHash: number,
    state: ICodeSession,
  ) => {
    if (!hashStore[oldHash]) {
      const resp = await fetch(
        `https://spike.land/live/${this.room || globalThis.codeSpace}/mST`,
      );

      const { mST, hashCode } = await resp.json();
      hashStore[hashCode] = this.session.get("state").merge(mST);
    }

    const oldRec = hashStore[oldHash];
    const oldState = JSON.stringify(oldRec.toJSON());

    const newRec = oldRec.merge(state);
    const newHash = newRec.hashCode();
    hashStore[newHash] = newRec;


    const patch = createPatch(oldRec.code, newRec.code);
    return {
      oldHash,
      newHash,
      patch,
    };
  };

  public createPatch(state: ICodeSession) {
    if (state.code === this.session.get("state").get("code")) {
      return {
        oldHash: this.session.get("state").hashCode(),
        newHash: this.session.get("state").hashCode(),
        patch: "",
      };
    }

    const oldState = JSON.stringify(this.session.get("state").toJSON());

    const oldHash = this.session.get("state").hashCode();
    hashStore[oldHash] = this.session.get("state");
    const oldRec = this.session.get("state");

    const newRec = oldRec.merge(state);
    const newHash = newRec.hashCode();

    hashStore[newHash] = newRec;

    const newState = newRec.toJSON();
    const patch = createPatch(oldRec.code, newRec.code);
    return {
      oldHash,
      newHash,
      patch,
    };
  }

  public applyPatch = async ({
    oldHash,
    newHash,
    patch,
  }: { oldHash: number; newHash: number; patch: string }) => {
    const meHash = this.hashCode();

    const bestGuesses = this.room || globalThis.codeSpace;

    if (!hashStore[oldHash] && bestGuesses) {
      const resp = await fetch(
        `https://spike.land/live/${bestGuesses}/mST`,
      );

      const { mST, hashCode } = await resp.json();
      hashStore[hashCode] = this.session.get("state").merge(mST);
    } else {
      return;
    }


    const oldCode = oldST.code;
    const newCode = JSON.parse(applyPatch(oldCode, JSON.parse(patch)));
    const newRec: Record<ICodeSession> = Record<ICodeSession>({...oldST, code: newCode})();

    console.log({ newState });
    console.log(newRec.hashCode());

    const newRecord = this.session.get("state").merge(newRec);

    const newHashCheck = newRecord.hashCode();

    if (newHashCheck === newHash) {
      this.session = this.session.set("state", newRecord);
      //  Console.error("WRONG update");
    } else {
      console.log("WRONG");
      console.log({
        newState,
      });
      throw new Error("Wrong patch");
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

export const hashCode = () => session?.hashCode() || 0;
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

export const patch: IApplyPatch = async (x) => session!.applyPatch(x);
export const makePatch = (st: ICodeSession)=>session.createPatch(st);
export const makePatchFrom = (n: number, st: ICodeSession)=>session.createPatchFromHashCode(n, st);

export const startSession = (room: string, u: IUserJSON): CodeSession =>
  session || new CodeSession(room, u);

function createPatch(oldCode: string, newCode: string) {
  return JSON.stringify(createDelta(oldCode, newCode));
}
