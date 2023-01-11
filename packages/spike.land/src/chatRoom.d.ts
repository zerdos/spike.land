/// <reference types="@cloudflare/workers-types" />
import { md5 } from "./../../code/src/session";
import { CodeEnv } from "./env";
import { Delta } from "../../code/src/textDiff";
export { md5 };
interface WebsocketSession {
    name: string;
    webSocket: WebSocket;
    quit?: boolean;
}
export declare class Code {
    private state;
    private env;
    private wsSessions;
    user2user(to: string, msg: unknown | string): void;
    broadcast(msg: unknown): void;
    private session;
    mST(p?: Delta[]): {
        code: string;
        i: number;
        html: string;
        css: string;
    };
    private backupSession;
    constructor(state: DurableObjectState, env: CodeEnv);
    fetch(request: Request): Promise<Response>;
    handleSession(webSocket: WebSocket): Promise<void>;
    processWsMessage(msg: {
        data: string | ArrayBuffer;
    }, session: WebsocketSession): Promise<void>;
}
