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

interface NewWSConnection {
  uuid: string;
  timestamp: number;
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
  | NewWSConnection
  | OtherEvent
  | ICodeInitEvent;

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
  room: string;
  addEvent: (e: IEvent) => void;
  json: () => IUserJSON;
  processEvents: () => void;
}

export class CodeSession implements ICodeSess {
  session: IUser;
  hashCodeSession: Number;
  public room: string = "";
  created: string = new Date().toISOString();
  constructor(user: IUserJSON) {
    let savedState = null;
    if (user.state.code === "" && user.room) {
      const cacheKey = `state-${user.room}`;

      if (storageAvailable("localStorage")) {
        const savedState = localStorage.getItem(cacheKey);
        if (savedState) JSON.parse(savedState);
        else {
          //...
        }
      }
    }
    this.session = initSession({
      ...user,
      capabilities: {
        ...user.capabilities,
        sessionStorage: storageAvailable("sessionStorage"),
      },
    })();
    this.hashCodeSession = this.session.get("state").hashCode();
  }

  public addEvent(e: IEvent) {
    this.session.get("events").push({
      ...e,
      uuid: uuid,
    });
  }

  processEvents() {
    const events = this.session.get("events");
    const event = events.shift();

    if (event) {
      switch (event.type) {
        case "code-init":
          const { code, transpiled, i, css, errorDiff, html } = event;
          const sess: ICodeSession = {
            code,
            transpiled,
            i,
            css,
            errorDiff,
            html,
          };

          this.session.set("events", events);
          this.session.set("state", Record(sess)());

          const cacheKey = `state-${this.session.get("room")}`;

          if (storageAvailable("localStorage")) {
            localStorage.setItem(cacheKey, JSON.stringify(sess));
          }
      }
    }
    // this.session.set(records)
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
    if (window.hasOwnProperty(type) === false) return;
    var storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}
