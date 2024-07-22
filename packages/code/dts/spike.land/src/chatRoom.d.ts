import type { DurableObject, DurableObjectState, WebSocket } from "@cloudflare/workers-types";
import { CodePatch, ICodeSession } from "./../../code/src/makeSess";
import { md5 } from "./../../code/src/md5";
import Env from "./env";
export { md5 };
export interface WebsocketSession {
  name: string;
  webSocket: WebSocket;
  quit?: boolean;
  subscribedTopics: Set<string>;
  pongReceived: boolean;
  blockedMessages: string[];
}
interface YMessage {
  type: "subscribe" | "unsubscribe" | "publish" | "ping" | "pong";
  topics: string[];
  topic: string;
  clients: number;
}
export declare class Code implements DurableObject {
  private state;
  private env;
  topics: Map<string, Set<WebSocket>>;
  wsSessions: WebsocketSession[];
  userSessions: WebsocketSession[];
  transpiled: string;
  origin: string;
  user2user(to: string, msg: unknown | string): void;
  broadcast(msg: CodePatch | string): void;
  session: ICodeSession;
  backupSession: ICodeSession;
  constructor(state: DurableObjectState, env: Env);
  fetch(request: Request): Promise<Response>;
  send(
    conn: WebSocket,
    message: YMessage | {
      type: "pong";
    },
  ): void;
  processWsMessage(msg: {
    data: string | ArrayBuffer;
  }, session: WebsocketSession): Promise<void>;
}
