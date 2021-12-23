import { fromJS, isKeyed } from "immutable";
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

export interface IEvent {
  name: IUsername;
  target: IUsername | "broadcast";
  type: "start" | "open" | "quit" | "get-cid" | "provide-cid";
}

export interface IUser {
  name: IUsername;
  room: string;
  state: ICodeSession;
  users: {};
  events: IEvent[];
}

export interface TheInMutableSession {
  toJs: () => ICodeSession;
}

export default {
  initSession: (user: IUser) =>
    fromJS(user, function (key, value, path) {
      console.log(key, value, path);
      return isKeyed(value) ? value.toOrderedMap() : value.toList();
    }) as unknown as TheInMutableSession,
};
