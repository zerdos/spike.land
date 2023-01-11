import type { DurableObject } from "@cloudflare/workers-types";
import { ICodeSession } from "./../../code/src/session";
import { md5 } from "./../../code/src/session";
import { CodeEnv } from "./env";
import { Delta } from "../../code/src/textDiff";
export { md5 };
export interface WebsocketSession {
    name: string;
    webSocket: WebSocket;
    quit?: boolean;
}
export declare class Code implements DurableObject {
    private state;
    private env;
    wsSessions: WebsocketSession[];
    user2user(to: string, msg: unknown | string): void;
    broadcast(msg: unknown): void;
    session: ICodeSession;
    createPatch(oldSess: ICodeSession, newSess: ICodeSession): {
        oldHash: string;
        newHash: string;
        reversePatch: Delta[];
        patch: Delta[];
    };
    mST(p: Delta[]): ICodeSession;
    private backupSession;
    constructor(state: DurableObjectState, env: CodeEnv);
    fetch(request: Request): Promise<Response>;
    handleSession(webSocket: WebSocket): Promise<void>;
    processWsMessage(msg: {
        data: string | ArrayBuffer;
    }, session: WebsocketSession): Promise<void>;
}
