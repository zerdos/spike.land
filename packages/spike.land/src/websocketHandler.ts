// packages/spike.land/src/websocketHandler.ts

import type { WebSocket } from "@cloudflare/workers-types";
import type { CodePatch, Diff } from "@spike-npm-land/code";
import {
  applySessionPatch,
  computeSessionHash,
} from "@spike-npm-land/code";
import { Code } from "./chatRoom";

const PING_TIMEOUT = 30000;

export interface WebsocketSession {
  name: string;
  webSocket: WebSocket;
  quit: boolean;
  subscribedTopics: Set<string>;
  pongReceived: boolean;
  blockedMessages: string[];
}

interface IData {
  name?: string;
  changes?: object[];
  codeSpace?: string;
  target?: string;
  type?: "new-ice-candidate" | "video-offer" | "video-answer" | "handshake" | "fetch";
  patch?: Diff[];
  reversePatch?: Diff[];
  address?: string;
  hashCode?: string;
  i?: number;
  candidate?: string;
  answer?: string;
  offer?: string;
  newHash?: string;
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

  handleWebsocketSession(webSocket: WebSocket) {
    webSocket.accept();

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
    webSocket.send(
      JSON.stringify({
        hashCode: computeSessionHash(this.code.session),
        i: this.code.session.i,
        users,
        type: "handshake",
      })
    );

    const pingInterval = setInterval(() => {
      if (!session.pongReceived) {
        webSocket.close();
        clearInterval(pingInterval);
      } else {
        session.pongReceived = false;
        try {
          webSocket.send(JSON.stringify({ type: "ping" }));
        } catch {
          webSocket.close();
        }
      }
    }, PING_TIMEOUT);

    webSocket.addEventListener("message", (msg) => this.processWsMessage(msg as any, session));

    const closeOrErrorHandler = () => {
      session.quit = true;
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }

  private send(conn: WebSocket, message: YMessage | { type: "pong" }) {
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

  private processWsMessage(msg: MessageEvent, session: WebsocketSession) {
    if (session.quit) {
      session.webSocket.close(1011, "WebSocket broken.");
      return;
    }

    const respondWith = (obj: unknown) =>
      session.webSocket.send(JSON.stringify(obj));

    let data: IData;
    try {
      const rawData =
        typeof msg.data === "string"
          ? msg.data
          : new TextDecoder().decode(msg.data as ArrayBuffer);
      data = JSON.parse(rawData);
    } catch (exp) {
      return respondWith({ error: "JSON parse error", exp: exp || {} });
    }

    const message = data as unknown as YMessage;

    // Consolidate name-check logic in one place
    if (!session.name) {
      if (!data.name) {
        return respondWith({ msg: "no-name-no-party" });
      }
      this.wsSessions
        .filter((sess) => sess.name === data.name)
        .forEach((sess) => {
          sess.webSocket.close();
          sess.name = "";
          sess.quit = true;
        });
      session.name = data.name;

      if (data.hashCode) {
        const oldHash = computeSessionHash(this.code.session);
        if (data.hashCode !== oldHash) {
          return respondWith({
            error: `old hashes not matching`,
            i: this.code.session.i,
            hash: oldHash,
          });
        }
      }
    }

    // Process standard messages
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
          break;
        case "ping":
          this.send(session.webSocket, { type: "pong" });
          break;
      }
    }

    // If changes exist, broadcast them:
    if (data.changes) {
      const changesMsg = JSON.stringify({ type: "changes", changes: data.changes });
      return this.broadcast(changesMsg);
    }

    // Video / ICE candidate messages
    if (
      data.target &&
      data.type &&
      ["new-ice-candidate", "video-offer", "video-answer"].includes(data.type)
    ) {
      return this.user2user(data.target, { ...data, name: session.name });
    }

    // Patching
    if (data.patch && data.oldHash && data.newHash && data.reversePatch) {
      return this.handlePatch(data as CodePatch, respondWith, session);
    }
  }

  private async handlePatch(
    data: CodePatch,
    respondWith: (obj: unknown) => void,
    session: WebsocketSession
  ) {
    const oldHash = computeSessionHash(this.code.session);
    if (oldHash === data.newHash) {
      return; // Already up-to-date
    }
    if (oldHash !== data.oldHash) {
      return respondWith({
        error: `old hashes not matching`,
        i: this.code.session.i,
        hash: oldHash,
      });
    }

    try {
    
      try {
       
        
        console.log("Applying patch...", data);
        const newState = applySessionPatch(this.code.session, data);
        console.log("New state after patch:", newState);
        await this.code.updateAndBroadcastSession(newState, session);
        return respondWith({
          newHash: computeSessionHash(newState),
          i: newState.i,
         });
      } catch (err) {
        console.error("Error applying patch:", err);
        return respondWith({ error: "patch-application-failed", exp: err || {} });
      }
    } catch (err) {
      respondWith({ error: "Saving is really hard", exp: err || {} });
    }
  }

  private user2user(to: string, msg: unknown | string) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    this.wsSessions
      .filter((s) => s.name === to)
      .forEach((s) => {
        try {
          s.webSocket.send(message);
        } catch (error) {
          console.error("p2p error:", error);
        }
      });
  }

  public broadcast(msg: CodePatch | string, session?: WebsocketSession) {
    const message =
      typeof msg === "string" ? msg : JSON.stringify({ ...msg, i: this.code.session.i });

    console.log(`Broadcasting message to ${this.wsSessions.length} sessions`);
    let successfulBroadcasts = 0;

    this.wsSessions.forEach((s) => {
      if (s === session) return;
      try {
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