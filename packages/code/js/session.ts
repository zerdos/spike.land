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

interface ICapabilities {
  prettier: boolean;
  babel: boolean;
  sessionStorage?: boolean;
  webRRT: boolean;
  prerender: boolean;
  IPFS: boolean;
}

export interface IUserJSON {
  name: IUsername;
  capabilities: ICapabilities;
  room: string;
  state: ICodeSession;
  users: {};
  events: IEvent[];
}

interface IQTaskEvent {
  uuid: string;
  name: string;
  operation: string;
  data: string;
}

export interface IUser extends
  Record<{
    name: IUsername;
    room: string;
    state: Record<ICodeSession>;
    capabilities: ICapabilities;
    users: {};
    events: IEvent[];
  }> {
}

function initSession(u: IUserJSON) {
  return Record({ ...u, state: Record(u.state)() });
}

export interface ICodeSess {
  addEvent: (e: IEvent) => void;
  json: () => IUserJSON;
  processEvents: () => void;
}

export class CodeSession implements ICodeSess {
  session: IUser;
  hashCodeSession: Number;
  created: string = new Date().toISOString();
  constructor(user: IUserJSON) {
    this.session = initSession({ ...user, capabilities: {...user.capabilities, sessionStorage: storageAvailable("sessionStorage")} })();
    this.hashCodeSession = this.session.get("state").hashCode();
  }

  public addEvent(e: IEvent) {
    this.session.get("events").push(e);
  }

  processEvents() {
    const event = this.session.get("events").shift();
  }

  public json() {
    const user = this.session.toJSON();
    const state = user.state.toJSON();
    return { ...user, state };
  }
}

let session: CodeSession | null = null;

export default (u: IUserJSON): ICodeSess => session || new CodeSession(u);

function storageAvailable(type: string) {
  try {
    var storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}
