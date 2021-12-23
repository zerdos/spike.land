import { fromJS, isKeyed } from "immutable";
// import * as Immutable from "immutable"

type IUsername = string;

interface ICodeSession {
  code: string;
  i: number;
  error: boolean;
  errorDiff: string;
  transpiled: string;
  html: string;
  css: string;
}

interface IEvent {
  name: IUsername;
  target: IUsername | "broadcast";
  type: "start" | "open" | "quit" | "get-cid" | "provide-cid";
}

export interface IUser {
  name: IUsername;
  room: string;
  state: ICodeSession;
  users: {};
  events: IEvent;
}

export default {
  initSession: (user: IUser) =>
    fromJS(user, function (key, value, path) {
      console.log(key, value, path);
      return isKeyed(value) ? value.toOrderedMap() : value.toList();
    }),
};
