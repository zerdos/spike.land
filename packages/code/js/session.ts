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

export interface IEvent {
  name: IUsername;
  target: IUsername | "broadcast";
  type: "start" | "open" | "quit" | "get-cid" | "provide-cid";
}

export interface IUserJSON {
  name: IUsername;
  room: string;
  state: ICodeSession;
  users: {};
  events: IEvent[];
}

export interface IUser {
  name: IUsername;
  room: string;
  state: Record.Factory<ICodeSession>;
  users: {};
  events: IEvent[];
}

export default {
  initSession: (user: IUserJSON) =>
    Record({
      ...user,
      state: Record(user.state),
    }),
};
