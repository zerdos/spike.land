/** @jsxImportSource @emotion/react */

import { Record } from "immutable";

import createDelta from "textdiff-create";
import applyPatch from "textdiff-patch";
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

interface ICodeSess {
  hashCodeSession: number;
  hashCode: () => number;
  json: () => IUserJSON;
}

const hashStore: { [key: number]: Record<ICodeSession> } = {};
export class CodeSession implements ICodeSess {
  session: IUser;
  hashCodeSession: number;
  created: string = new Date().toISOString();
  constructor(private room: string, user: IUserJSON) {
    const savedState: ICodeSession | null = null;

    // If (user.state.code === "" && room) {
    // const cacheKey = `state-${room}`;

    // if (storageAvailable("localStorage")) {
    //   const savedStateStr = localStorage.getItem(cacheKey);
    //   if (savedStateStr) {
    //     savedState = JSON.parse(savedStateStr);
    //   } else {
    //     fetch(`https://spike.land/api/room/${room}/mySession`).then(
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

    this.hashCodeSession = this.session.get("state").hashCode();
    hashStore[this.session.get("state").hashCode()] = this.session.get("state");
  }

  public hashCode() {
    return this.session.get("state").hashCode();
  }

  public createPatchFromHashCode = async (
    oldHash: number,
    state: ICodeSession,
  ) => {
    if (!hashStore[oldHash]) {
      const resp = await fetch(
        `https://spike.land/api/room/${this.room}/session`,
      );

      const recRec = await resp.json();

      hashStore[oldHash] = Record<ICodeSession>(recRec)();
    }

    const oldRec = hashStore[oldHash];
    const oldState = JSON.stringify(oldRec.toJSON());

    const newRec = oldRec.merge(state);
    const newHash = newRec.hashCode();
    hashStore[newHash] = newRec;

    const newState = JSON.stringify(newRec.toJSON());
    const patch = createPatch(oldState, newState);
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

    const newState = JSON.stringify(newRec.toJSON());
    const patch = createPatch(oldState, newState);
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
    const oldHashCheck = this.session.get("state").hashCode();
    hashStore[oldHashCheck] = this.session.get("state");

    if (!hashStore[oldHash]) {
      const resp = await fetch(
        `https://spike.land/api/room/${this.room}/session`,
      );
      const newRec = await resp.json();

      const newRecord = this.session.get("state").merge(newRec);
      const newHashCheck = newRecord.hashCode();

      if (newHashCheck === newHash) {
        this.session = this.session.set("state", newRecord);
        //  Console.error("WRONG update");
      } else {
        console.log("WRONG");
        console.log({
          newHashCheck,
        });
      }
      return;
    }

    const oldST = hashStore[oldHash].toJSON();

    const oldState = JSON.stringify(oldST);
    const oldCode = oldST.code;
    const newState = JSON.parse(applyPatch(oldState, JSON.parse(patch)));
    const newRec: Record<ICodeSession> = Record<ICodeSession>(newState)();

    console.log({ newState });
    console.log(newRec.hashCode());

    const newRecord = this.session.get("state").merge(newRec);
    const newCode = newRecord.get("code");
    if (oldCode === newCode) {
      return;
    }

    console.log(newRecord.hashCode());
    const newHashCheck = newRecord.hashCode();

    if (newHashCheck === newHash) {
      this.session = this.session.set("state", newRecord);
      //  Console.error("WRONG update");
    } else {
      console.log("WRONG");
      console.log({
        newState,
      });
    }
  };

  public json() {
    const user = this.session.toJSON();
    const state = user.state.toJSON();
    return { ...user, state };
  }

  public setRoom(room: string) {
    const user = this.session.set("room", room);
    this.session = user;
  }
}

export const hashCode = () => session?.hashCode() || 0;

const session: CodeSession | null = null;
export const startSession = (room: string, u: IUserJSON): CodeSession =>
  session || new CodeSession(room, u);

function createPatch(oldCode: string, newCode: string) {
  return JSON.stringify(createDelta(oldCode, newCode));
}
