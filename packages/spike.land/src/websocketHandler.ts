import type { WebSocket } from "@cloudflare/workers-types";
import type { CodePatch, Delta } from "@spike-npm-land/code";
import {
  applyCodePatch,
  makeHash,
  stringifySession,
} from "@spike-npm-land/code";
import type { Code } from "./chatRoom";

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
  type?:
    | "new-ice-candidate"
    | "video-offer"
    | "video-answer"
    | "handshake"
    | "fetch";
  patch?: Delta[];
  reversePatch: Delta[];
  address?: string;
  hashCode?: string;
  i: number;
  candidate?: string;
  answer?: string;
  offer?: string;
  newHash?: string;
  oldHash?: string;
}

interface YMessage {
  type: "subscribe" | "unsubscribe" | "publish" | "ping" | "pong";
  topics: string[];
  topic: string;
  clients: number;
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
    webSocket.send(JSON.stringify({
      hashCode: makeHash(this.code.session),
      i: this.code.session.i,
      users,
      type: "handshake",
    }));

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

    webSocket.addEventListener(
      "message",
      (msg: MessageEvent) => this.processWsMessage(msg, session),
    );

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
      data = typeof msg.data === "string"
        ? JSON.parse(msg.data)
        : JSON.parse(new TextDecoder().decode(msg.data as ArrayBuffer));
    } catch (exp) {
      return respondWith({ error: "JSON parse error", exp: exp || {} });
    }

    const message = data as unknown as YMessage;

    if (!session.name && data.name) {
      this.wsSessions.filter((sess) => sess.name === data.name).forEach(
        (sess) => {
          sess.webSocket.close();
          sess.name = "";
        },
      );
      session.name = data.name;
      const oldHash = makeHash(this.code.session);
      if (data.hashCode !== oldHash) {
        return respondWith({
          error: `old hashes not matching`,
          i: this.code.session.i,
          hash: oldHash,
          strSess: stringifySession(this.code.session),
        });
      }
      // session.name = data.name;
      // this.broadcastUsers();
    }

    if (message && message.type) {
      switch (message.type) {
        case "unsubscribe":
          (message.topics || []).forEach((topicName) => {
            const subs = this.topics.get(topicName);
            if (subs) {
              subs.delete(session.webSocket);
            }
          });
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

    if (data.changes) {
      return this.broadcast(msg.data as string);
    }

    if (!session.name) {
      if (!data.name) {
        return respondWith({ msg: "no-name-no-party" });
      }

      this.wsSessions
        .filter((x) => x.name === data.name)
        .forEach((x) => {
          x.blockedMessages.reverse().forEach((m) => session.webSocket.send(m));
          x.quit = true;
        });
      this.wsSessions = this.wsSessions.filter((x) => !x.quit);

      session.name = data.name;
    }

    if (data.i && this.code.session.i && this.code.session.i > data.i) {
      return respondWith({ error: "i is not up to date" });
    }

    try {
      if (
        data.target && data.type &&
        ["new-ice-candidate", "video-offer", "video-answer"].includes(
          data.type,
        )
      ) {
        return this.user2user(data.target, { ...data, name: session.name });
      }

      if (data.patch && data.oldHash && data.newHash && data.reversePatch) {
        return this.handlePatch(
          data,
          respondWith,
          (obj) => this.broadcast(obj, session),
        );
      }
    } catch (exp) {
      console.error(exp);
      return respondWith({ error: "unknown error", exp: exp || {} });
    }
  }

  private handlePatch(
    data: IData,
    respondWith: (obj: unknown) => void,
    broadcast: (obj: unknown) => void,
  ) {
    const oldHash = makeHash(this.code.session);

    if (oldHash === data.newHash) {
      return;
    }

    if (oldHash !== data.oldHash) {
      return respondWith({
        error: `old hashes not matching`,
        i: this.code.session.i,
        hash: oldHash,
        strSess: stringifySession(this.code.session),
      });
    }

    try {
      const newState = applyCodePatch(this.code.session, {
        oldHash: data.oldHash,
        newHash: data.newHash!,
        patch: data.patch!,
        reversePatch: data.reversePatch,
      });

      this.code.session = newState;
      respondWith({ hashCode: data.newHash });
      broadcast(data as CodePatch);
      return this.code.setSession(newState);
    } catch (err) {
      return respondWith({ error: "Saving is really hard", exp: err || {} });
    }
  }

  private user2user(to: string, msg: unknown | string) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    this.wsSessions
      .filter((session) => session.name === to)
      .forEach((s) => {
        try {
          s.webSocket.send(message);
        } catch (error) {
          console.error("p2p error:", error);
        }
      });
  }

  public broadcast(msg: CodePatch | string, session?: WebsocketSession) {
    const message = typeof msg === "string"
      ? msg
      : JSON.stringify({ ...msg, i: this.code.session.i });

    if (typeof msg !== "string") {
      this.code.updateSessionStorage(msg);
    }

    console.log(`Broadcasting message to ${this.wsSessions.length} sessions`);

    let successfulBroadcasts = 0;
    this.wsSessions.forEach((s) => {
      if (s === session) {
        return;
      }
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
