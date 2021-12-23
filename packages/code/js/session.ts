import {fromJS} from "immutable";

type IUsername = string;

interface ICodeSession{
    code: string;
    i: number,
    error: boolean,
    errorDiff: string
    transpiled: string
    html: string,
    css: string
}

interface IEvent {
    name: IUsername
    target: IUsername | "broadcast"
    type: "start" | "open" | "quit" | "get-cid" | "provide-cid"
}

interface IUser {
    name: IUsername,
    room: string,
    state: ICodeSession,
    users: {
        
    },
    events: IEvent
}

export default {
    initSession: (user: IUser) =>  fromJS(user)
}