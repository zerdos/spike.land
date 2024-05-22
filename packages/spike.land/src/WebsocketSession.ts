import { WebSocket } from "@cloudflare/workers-types";
import { Delta } from "../../code/src/textDiff";


export interface WebsocketSession {
  name: string;
  webSocket: WebSocket;
  quit?: boolean;
  subscribedTopics: Set<string>;
  pongReceived: boolean;
  blockedMessages: string[];
}
export const pingTimeout = 30000;
export interface IData {
  name?: string;
  changes?: object[];
  codeSpace?: string;
  target?: string;
  type?: "new-ice-candidate" | "video-offer" | "video-answer" | "handshake" | "fetch";
  patch?: Delta[];
  reversePatch?: Delta[];
  address?: string;
  hashCode?: string;
  i: number;
  candidate?: string;
  answer?: string;
  offer?: string;
  newHash?: string;
  oldHash?: string;
}
export interface YMessage {
  type: 'subscribe' | 'unsubscribe' | 'publish' | 'ping' | 'pong';
  topics?: string[];
  topic?: string;
  clients?: number;
}
