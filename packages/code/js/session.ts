import { fromJS, isKeyed, Record } from "immutable";
// import * as Immutable from "immutable"

type IUsername = string;

export interface ICodeSession {
  code: string;
  i: number;
  errorDiff: string;
  transpiled: string;
  html: string;
  css: string;
}

type NewWSConnection = {
  uuid: string;
  timestamp: number;
};

export type IEvent = NewWSConnection | {
  name: IUsername;
  uuid: string;
  target: IUsername | "broadcast";
  type: "start" | "open" | "quit" | "get-cid" | "provide-cid" | "new-ws";
  timestamp: number;
};

export interface IUserJSON {
  name: IUsername;
  room: string;
  state: ICodeSession;
  users: {};
  events: IEvent[];
}

export interface IUser extends
  Record.Factory<{
    name: IUsername;
    room: string;
    state: Record.Factory<ICodeSession>;
    users: {};
    events: IEvent[];
  }> {
}

function initSession(u: IUserJSON) {
  return Record({ ...u, state: Record(u.state) });
}

export interface ICodeSess {
  addEvent: (e: IEvent) => void;
  json: () => IUserJSON;
}

export class CodeSession implements ICodeSess {
  session: IUser;
  created: string = new Date().toISOString();
  constructor(user: IUserJSON) {
    this.session = initSession({ ...user });
  }
  public addEvent(e: IEvent) {
    this.session().get("events").push(e);
  }
  public json() {
    const user = this.session().toJSON();
    const state = user.state().toJSON();
    return { ...user, state };
  }
}

let session: CodeSession | null = null;

export default (u: IUserJSON): ICodeSess => session || new CodeSession(u);
