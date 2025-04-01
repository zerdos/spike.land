import type { ICodeSession } from "@spike-npm-land/code";
import { applySessionDelta, computeSessionHash, tryCatch } from "@spike-npm-land/code";
import type { Code } from "./chatRoom";

export interface WebsocketSession {
  webSocket: WebSocket;
  name?: string;
  quit: boolean;
  subscribedTopics: Set<string>;
  lastPingTime?: number;
  lastPongTime?: number;
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
      lastPongTime: Date.now(),
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
      const now = Date.now();
      const pingTimeout = 30000; // 30 seconds timeout

      // Only check for timeout if we've sent at least one ping
      if (session.lastPingTime) {
        // Check if the last pong is older than our ping timeout
        if (!session.lastPongTime || (now - session.lastPongTime) > pingTimeout) {
          // No pong received within timeout period, close the connection
          webSocket.close();
          clearInterval(pingInterval);
          return;
        }
      }

      // Send a new ping and record the time
      session.lastPingTime = now;
      const hashCode = computeSessionHash(this.code.getSession());
      webSocket.send(JSON.stringify({ type: "ping", hashCode }));
    }, 30000);

    // Handle messages
    webSocket.onmessage = (msg: MessageEvent) => this.processWsMessage(msg, session);

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
      session.lastPongTime = Date.now();
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
      // Send acknowledgment for subscribe
      session.webSocket.send(JSON.stringify({
        type: "ack",
        action: "subscribe",
        topics: data.topics,
      }));
      return;
    }

    if (data.type === "unsubscribe") {
      for (const topic of data.topics) {
        session.subscribedTopics.delete(topic);
        this.topics.get(topic)?.delete(session.webSocket);
      }
      // Send acknowledgment for unsubscribe
      session.webSocket.send(JSON.stringify({
        type: "ack",
        action: "unsubscribe",
        topics: data.topics,
      }));
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
      // Send acknowledgment for publish
      session.webSocket.send(JSON.stringify({
        type: "ack",
        action: "publish",
        topic: data.topic,
      }));
      return;
    }

    if (data.oldHash) {
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

      const patchedSession = applySessionDelta(currentSession, data);
      const { error } = await tryCatch(this.code.updateAndBroadcastSession(patchedSession));
      if (error) {
        session.webSocket.send(JSON.stringify({
          type: "error",
          message: "Failed to apply patch " + error.message,
        }));
        return;
      }

      // Only send acknowledgment if no error occurred
      session.webSocket.send(JSON.stringify({
        type: "ack",
        hashCode: computeSessionHash(patchedSession),
      }));

      return;
    }

    if (data.target) {
      const targetSession = this.wsSessions.find((s) => s.name === data.target);
      if (targetSession && targetSession.webSocket.readyState === 1) {
        targetSession.webSocket.send(msg.data);
      }
      return;
    }

    if (data.name && session.name !== data.name) {
      session.name = data.name;
      // Send acknowledgment for name update
      session.webSocket.send(JSON.stringify({
        type: "ack",
        action: "nameUpdate",
        name: data.name,
      }));
    }

    // Add catch-all response for any unhandled message types
    session.webSocket.send(JSON.stringify({
      type: "ack",
      message: "Message received",
      receivedType: data.type || "unknown",
    }));
  };

  getActiveUsers(codeSpace: string): string[] {
    return this.wsSessions
      .filter((session) => session.subscribedTopics.has(codeSpace))
      .map((session) => session.name || "anonymous")
      .filter(Boolean);
  }

  broadcast(message: any, excludeSession?: WebsocketSession) {
    for (const session of this.wsSessions) {
      if (session.webSocket.readyState === 1 && session !== excludeSession) {
        try {
          session.webSocket.send(
            typeof message === "string" ? message : JSON.stringify(message),
          );
        } catch (error) {
          console.error("Error broadcasting to session:", error);
          session.webSocket.close();
        }
      }
    }
  }
}
