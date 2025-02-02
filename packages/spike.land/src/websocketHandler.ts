// packages/spike.land/src/websocketHandler.ts

import type { MessageEvent, WebSocket } from "@cloudflare/workers-types";
import type { CodePatch } from "@spike-npm-land/code";
import { applySessionPatch, computeSessionHash } from "@spike-npm-land/code";
import type { Code } from "./chatRoom";

const PING_TIMEOUT = 30000;

export interface WebsocketSession {
  name: string;
  webSocket: WebSocket;
  quit: boolean;
  subscribedTopics: Set<string>;
  pongReceived: boolean;
  blockedMessages: string[];
  pingTimeoutId?: number;
}

interface IData {
  name?: string;
  changes?: object[];
  codeSpace?: string;
  target?: string;
  type?:
    | "new-ice-candidate"
    | "video-offer"
    | "video-answer"
    | "handshake"
    | "fetch"
    | "ping"
    | "pong"
    | "subscribe"
    | "unsubscribe"
    | "publish";
  patch?: unknown[];
  address?: string;
  hashCode?: string;
  candidate?: string;
  answer?: string;
  offer?: string;
  oldHash?: string;
}

interface YMessage {
  type: "subscribe" | "unsubscribe" | "publish" | "ping" | "pong";
  topics?: string[];
  topic?: string;
  clients?: number;
}

export class WebSocketHandler {
  private topics = new Map<string, Set<WebSocket>>();
  private wsSessions: WebsocketSession[] = [];

  constructor(private code: Code) {}

  // Schedule periodic ping for a session
  private schedulePing(session: WebsocketSession): void {
    if (session.pingTimeoutId) {
      clearTimeout(session.pingTimeoutId);
    }
    session.pingTimeoutId = setTimeout(() => {
      if (!session.pongReceived) {
        session.webSocket.close();
      } else {
        session.pongReceived = false;
        try {
          session.webSocket.send(JSON.stringify({ type: "ping" }));
        } catch {
          session.webSocket.close();
        }
        this.schedulePing(session);
      }
    }, PING_TIMEOUT) as unknown as number;
  }

  public handleWebsocketSession(webSocket: WebSocket): void {
    // Polyfill addEventListener if not available
    if (typeof webSocket.addEventListener !== "function") {
      webSocket.addEventListener = function(type, listener) {
        const handlerName = "on" + type;
        Object.defineProperty(webSocket, handlerName, ()=>listener);  
      };
    }
    try {
      webSocket.accept();
    } catch (e) {
      // Ignore error if accept is not implemented
    }
    const session: WebsocketSession = {
      name: "",
      quit: false,
      webSocket,
      pongReceived: true,
      subscribedTopics: new Set(),
      blockedMessages: [],
    };
    this.wsSessions.push(session);
    const users = this.wsSessions.filter((x) => x.name).map((x) => x.name);
    webSocket.send(JSON.stringify({
      hashCode: computeSessionHash(this.code.getSession()),
      users,
      type: "handshake",
    }));
    this.schedulePing(session);
    const closeOrErrorHandler = () => {
      session.quit = true;
      if (session.pingTimeoutId) {
        clearTimeout(session.pingTimeoutId);
      }
    };
    webSocket.addEventListener("message", (msg: MessageEvent) => {
      this.processWsMessage(msg, session);
    });
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }

  private send(conn: WebSocket, message: YMessage | { type: "pong"; }): void {
    const wsReadyStateConnecting = 0;
    const wsReadyStateOpen = 1;
    if (
      conn.readyState !== wsReadyStateConnecting &&
      conn.readyState !== wsReadyStateOpen
    ) {
      conn.close();
      return;
    }
    try {
      conn.send(JSON.stringify(message));
    } catch {
      conn.close();
    }
  }

  private processWsMessage = (msg: MessageEvent, session: WebsocketSession): void => {
    if (session.quit) {
      session.webSocket.close(1011, "WebSocket broken.");
      return;
    }
    const respondWith = (obj: unknown): void => {
      try {
        session.webSocket.send(JSON.stringify(obj));
      } catch {
        session.quit = true;
        session.webSocket.close();
      }
    };
    let data: IData;
    try {
      const rawData = typeof msg.data === "string"
        ? msg.data
        : new TextDecoder().decode(msg.data as ArrayBuffer);
      data = JSON.parse(rawData) as IData;
    } catch (exp) {
      respondWith({ error: "JSON parse error", exp: exp || {} });
      return;
    }
    const message = data as YMessage;
    if (!session.name) {
      if (!data.name) {
        return respondWith({ msg: "no-name-no-party" });
      }
      this.wsSessions
        .filter(sess => sess !== session && sess.name === data.name)
        .forEach((sess) => {
          sess.webSocket.close();
          sess.name = "";
          sess.quit = true;
        });
      session.name = data.name;
      if (data.hashCode) {
        const oldHash = computeSessionHash(this.code.getSession());
        if (data.hashCode !== oldHash) {
          return respondWith({ error: `old hashes not matching`, hash: oldHash });
        }
      }
    }
    if (message && message.type) {
      switch (message.type) {
        case "unsubscribe":
          if (message.topics) {
            message.topics.forEach((topicName) => {
              const subs = this.topics.get(topicName);
              if (subs) {
                subs.delete(session.webSocket);
              }
            });
          }
          break;
        case "publish":
          if (message.topic) {
            const receivers = this.topics.get(message.topic);
            if (receivers) {
              message.clients = receivers.size;
              receivers.forEach((receiver) => this.send(receiver, message));
            }
          }
          break;
        case "pong":
          session.pongReceived = true;
          this.schedulePing(session);
          break;
        case "ping":
          this.send(session.webSocket, { type: "pong" });
          break;
      }
    }
    if (data.changes) {
      const changesMsg = JSON.stringify({
        type: "changes",
        changes: data.changes,
      });
      return this.broadcast(changesMsg);
    }
    if (
      data.target &&
      data.type &&
      ["new-ice-candidate", "video-offer", "video-answer"].includes(data.type)
    ) {
      return this.user2user(data.target, { ...data, name: session.name });
    }
    if (data.patch && data.oldHash && data.hashCode) {
      this.handlePatch(data as CodePatch, respondWith, session);
      return;
    }
  };

  private async handlePatch(
    data: CodePatch,
    respondWith: (obj: unknown) => void,
    session: WebsocketSession,
  ): Promise<void> {
    try {
      console.log("Applying patch...", data);
      const newState = applySessionPatch(this.code.getSession(), data);
      console.log("New state after patch:", newState);
      this.code.updateAndBroadcastSession(newState, session);
      return respondWith({
        hashCode: computeSessionHash(newState),
      });
    } catch (err) {
      console.error("Error applying patch:", err);
      respondWith({ error: "patch-application-failed", exp: err || {} });
    }
  }

  private user2user(to: string, msg: unknown | string): void {
    const outMessage = typeof msg === "string" ? msg : JSON.stringify(msg);
    this.wsSessions
      .filter((s) => s.name === to)
      .forEach((s) => {
        try {
          s.webSocket.send(outMessage);
        } catch (error) {
          console.error("p2p error:", error);
        }
      });
  }

  public broadcast(msg: CodePatch | string, session?: WebsocketSession): void {
    let message: string;
    try {
      message = typeof msg === "string" ? msg : JSON.stringify(msg);
    } catch (error) {
      console.error("Error in broadcast:", error);
      return;
    }
    console.log(`Broadcasting message to ${this.wsSessions.length} sessions`);
    let successfulBroadcasts = 0;
    this.wsSessions.forEach((s) => {
      if (session && s === session) {
        try {
          session.webSocket.send(
            JSON.stringify({ hashCode: computeSessionHash(this.code.getSession()) }),
          );
          return;
        } catch (error) {
          console.error(`Failed to send message to session ${session.name}:`, error);
          session.quit = true;
          session.webSocket.close();
          return;
        }
      }
      if (s.quit) return;
      try {
        s.blockedMessages.forEach((m) => s.webSocket.send(m));
        s.blockedMessages = [];
        s.webSocket.send(message);
        successfulBroadcasts++;
      } catch (error) {
        console.error(`Failed to send message to session ${s.name}:`, error);
        s.quit = true;
        s.blockedMessages.push(message);
      }
    });
    console.log(`Successfully broadcasted to ${successfulBroadcasts} sessions`);
    const initialSessionCount = this.wsSessions.length;
    this.wsSessions = this.wsSessions.filter((s) => !s.quit);
    const removedSessions = initialSessionCount - this.wsSessions.length;
    if (removedSessions > 0) {
      console.log(`Removed ${removedSessions} disconnected sessions`);
    }
  }
}
