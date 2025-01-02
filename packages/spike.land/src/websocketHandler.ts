import type { WebSocket } from "@cloudflare/workers-types";
import type { CodePatch, Delta, ICodeSession } from "@spike-npm-land/code";
import {
  applySessionPatch,
  computeSessionHash,
  sessionToJSON,
} from "@spike-npm-land/code";

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
  patch?: Delta[];
  /** Make reversePatch optional **/
  reversePatch?: Delta[];
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

  constructor(private session: ICodeSession) {}

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
        hashCode: computeSessionHash(this.session),
        i: this.session.i,
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

    webSocket.addEventListener("message", (msg) => this.processWsMessage(msg, session));

    const closeOrErrorHandler = () => {
      session.quit = true;
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }

  private send(conn: WebSocket, message: YMessage | { type: "pong" }) {
    const wsReadyStateConnecting = 0;
    const wsReadyStateOpen = 1;

    if (conn.readyState !== wsReadyStateConnecting && conn.readyState !== wsReadyStateOpen) {
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

    const respondWith = (obj: unknown) => session.webSocket.send(JSON.stringify(obj));

    let data: IData;
    try {
      const rawData = typeof msg.data === "string" ? msg.data : new TextDecoder().decode(msg.data as ArrayBuffer);
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
      // Close any existing sessions using the same name
      this.wsSessions.filter((sess) => sess.name === data.name).forEach((sess) => {
        sess.webSocket.close();
        sess.name = "";
        sess.quit = true;
      });
      // Now set the new name
      session.name = data.name;

      // Validate the hash if provided
      if (data.hashCode) {
        const oldHash = computeSessionHash(this.session);
        if (data.hashCode !== oldHash) {
          return respondWith({
            error: `old hashes not matching`,
            i: this.session.i,
            hash: oldHash,
            strSess: sessionToJSON(this.session),
          });
        }
      }

      // Optional: broadcast a list of current users after this new user
      // this.broadcastUsers();
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

    // If changes exist, broadcast them. This is up to your app logic:
    if (data.changes) {
      // Instead of sending the raw `msg.data as string`,
      // let's wrap changes in a JSON message:
      const changesMsg = JSON.stringify({ type: "changes", changes: data.changes });
      return this.broadcast(changesMsg);
    }

    // Check `i` field for synchronization
    if (data.i && this.session.i && this.session.i > data.i) {
      return respondWith({ error: "i is not up to date" });
    }

    try {
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
        return this.handlePatch(data, respondWith, (obj) => this.broadcast(obj, session));
      }
    } catch (exp) {
      console.error(exp);
      return respondWith({ error: "unknown error", exp: exp || {} });
    }
  }

  private handlePatch(
    data: IData,
    respondWith: (obj: unknown) => void,
    broadcast: (obj: unknown) => void
  ) {
    const oldHash = computeSessionHash(this.session);

    if (oldHash === data.newHash) {
      // Already up-to-date, no action needed
      return;
    }
    if (oldHash !== data.oldHash) {
      return respondWith({
        error: `old hashes not matching`,
        i: this.session.i,
        hash: oldHash,
        strSess: sessionToJSON(this.session),
      });
    }

    try {
      // If applySessionPatch expects a CodePatch, ensure `data` is the correct shape
      const newState = applySessionPatch(this.session, data as CodePatch);
      this.session = newState;
      broadcast(data as CodePatch);
      return respondWith({ hashCode: data.newHash });
    } catch (err) {
      return respondWith({ error: "Saving is really hard", exp: err || {} });
    }
  }

  private user2user(to: string, msg: unknown | string) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    this.wsSessions.filter((s) => s.name === to).forEach((s) => {
      try {
        s.webSocket.send(message);
      } catch (error) {
        console.error("p2p error:", error);
      }
    });
  }

  public broadcast(msg: CodePatch | string, session?: WebsocketSession) {
    const message =
      typeof msg === "string" ? msg : JSON.stringify({ ...msg, i: this.session.i });

    // If your ICodeSession has a method to store patches, call it here.
    if (typeof msg !== "string" && this.session.updateSessionStorage) {
      this.session.updateSessionStorage(msg);
    }

    console.log(`Broadcasting message to ${this.wsSessions.length} sessions`);
    let successfulBroadcasts = 0;

    this.wsSessions.forEach((s) => {
      if (s === session) {
        return; // skip sending to the same session that triggered the broadcast
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

  // Optional: broadcast updated user list
  // private broadcastUsers() {
  //   const userList = this.wsSessions.filter((x) => x.name).map((x) => x.name);
  //   this.wsSessions.forEach((s) => {
  //     try {
  //       s.webSocket.send(JSON.stringify({ type: "users", userList }));
  //     } catch (error) {
  //       s.quit = true;
  //     }
  //   });
  //   this.wsSessions = this.wsSessions.filter((s) => !s.quit);
  // }
}