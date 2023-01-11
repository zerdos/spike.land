import type { WebSocket } from "@cloudflare/workers-types";
import { WebsocketSession } from "./chatRoom";
export declare const signaller: (sessions: WebsocketSession[], connection: WebSocket) => Promise<void>;
