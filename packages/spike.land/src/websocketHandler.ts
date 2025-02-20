import { applySessionPatch, computeSessionHash, ICodeSession } from "@spike-npm-land/code";
import type { Code } from "./chatRoom";

export interface WebsocketSession {
  webSocket: WebSocket;
  name?: string;
  quit: boolean;
  subscribedTopics: Set<string>;
  pongReceived: boolean;
  blockedMessages: any[];
}

export class WebSocketHandler {
  private wsSessions: WebsocketSession[] = [];
  private topics = new Map<string, Set<WebSocket>>();
  private code: Code;

  constructor(code: Code) {
    this.code = code;
  }

  getWsSessions() {
    return this.wsSessions;
  }

  setTopics(topics: Map<string, Set<WebSocket>>) {
    this.topics = topics;
  }

  pushToWsSession(session: Partial<ICodeSession>) {
    this.wsSessions.push(session as WebsocketSession);
  }

  handleWebsocketSession(webSocket: WebSocket) {
    webSocket.accept();

    const session: WebsocketSession = {
      webSocket,
      quit: false,
      subscribedTopics: new Set(),
      pongReceived: true,
      blockedMessages: [],
    };

    this.wsSessions.push(session);

    // Send initial handshake
    webSocket.send(JSON.stringify({
      type: "handshake",
      hash: computeSessionHash(this.code.getSession()),
    }));

    // Setup ping interval
    const pingInterval = setInterval(() => {
      if (!session.pongReceived) {
        webSocket.close();
        clearInterval(pingInterval);
        return;
      }
      session.pongReceived = false;
      webSocket.send(JSON.stringify({ type: "ping" }));
    }, 30000);

    // Handle messages
    webSocket.addEventListener("message", (msg: MessageEvent) => {
      this.processWsMessage(msg, session);
    });

    // Handle close
    webSocket.addEventListener("close", () => {
      session.quit = true;
      clearInterval(pingInterval);
      const index = this.wsSessions.indexOf(session);
      if (index > -1) {
        this.wsSessions.splice(index, 1);
      }
    });
  }

  processWsMessage = async (msg: MessageEvent, session: WebsocketSession) => {
    const data = JSON.parse(msg.data as string);

    if (data.type === "ping") {
      session.webSocket.send(JSON.stringify({ type: "pong" }));
      return;
    }

    if (data.type === "pong") {
      session.pongReceived = true;
      return;
    }

    if (data.type === "subscribe") {
      for (const topic of data.topics) {
        session.subscribedTopics.add(topic);
        if (!this.topics.has(topic)) {
          this.topics.set(topic, new Set());
        }
        this.topics.get(topic)?.add(session.webSocket);
      }
      return;
    }

    if (data.type === "unsubscribe") {
      for (const topic of data.topics) {
        session.subscribedTopics.delete(topic);
        this.topics.get(topic)?.delete(session.webSocket);
      }
      return;
    }

    if (data.type === "publish") {
      const subscribers = this.topics.get(data.topic);
      if (subscribers) {
        const message = JSON.stringify({
          type: "message",
          topic: data.topic,
          data: data.data,
        });
        for (const subscriber of subscribers) {
          subscriber.send(message);
        }
      }
      return;
    }

    if (data.patch) {
      try {
        const currentSession = this.code.getSession();
        const currentHash = computeSessionHash(currentSession);

        if (currentHash !== data.oldHash) {
          console.error("Hash mismatch");
          session.webSocket.send(JSON.stringify({
            type: "error",
            message: "Session hash mismatch",
          }));
          return;
        }

        const patchedSession = applySessionPatch(currentSession, data);
        await this.code.updateAndBroadcastSession(patchedSession);

        session.webSocket.send(JSON.stringify({
          type: "ack",
          hashCode: computeSessionHash(patchedSession),
        }));
      } catch (error) {
        console.error("Error applying patch:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        session.webSocket.send(JSON.stringify({
          type: "error",
          message: "Failed to apply patch " + errorMessage,
        }));
      }
      return;
    }

    if (data.target) {
      const targetSession = this.wsSessions.find(s => s.name === data.target);
      if (targetSession && targetSession.webSocket.readyState === 1) {
        targetSession.webSocket.send(msg.data);
      }
      return;
    }

    if (data.name) {
      session.name = data.name;
    }
  };

  getActiveUsers(codeSpace: string): string[] {
    return this.wsSessions
      .filter(session => session.subscribedTopics.has(codeSpace))
      .map(session => session.name || "anonymous")
      .filter(Boolean);
  }

  broadcast(message: any, excludeSession?: WebsocketSession) {
    for (const session of this.wsSessions) {
      if (session.webSocket.readyState === 1 && session !== excludeSession) {
        try {
          session.webSocket.send(typeof message === "string" ? message : JSON.stringify(message));
        } catch (error) {
          console.error("Error broadcasting to session:", error);
          session.webSocket.close();
        }
      }
    }
  }
}
