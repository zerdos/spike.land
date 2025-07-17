// Remove unused import
import { applySessionDelta, computeSessionHash, tryCatch } from "@spike-npm-land/code";
import type { Code } from "./chatRoom";

export interface WebsocketSession {
  webSocket: WebSocket;
  name?: string;
  quit: boolean;
  subscribedTopics: Set<string>;
  lastPingTime?: number;
  lastPongTime?: number;
  blockedMessages: (string | object)[];
}

export class WebSocketHandler {
  private wsSessions: WebsocketSession[] = [];
  private topics = new Map<string, Set<WebSocket>>();
  private code: Code;

  constructor(code: Code) {
    this.code = code;
    // Explicitly bind methods
    this.broadcast = this.broadcast.bind(this);
  }

  getWsSessions() {
    return this.wsSessions;
  }

  setTopics(topics: Map<string, Set<WebSocket>>) {
    this.topics = topics;
  }

  /**
   * Adds a new WebsocketSession to the session list in a type-safe way.
   */
  pushToWsSession(session: WebsocketSession) {
    this.wsSessions.push(session);
  }

  /**
   * Utility to safely send a message over a WebSocket.
   */
  private safeSend(ws: WebSocket, message: string | object) {
    if (ws.readyState === 1) {
      try {
        ws.send(
          typeof message === "string" ? message : JSON.stringify(message),
        );
      } catch (err) {
        console.error("WebSocket send error:", err);
      }
    }
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
    this.safeSend(webSocket, {
      type: "handshake",
      hash: computeSessionHash(this.code.getSession()),
    });

    // Setup ping interval
    const pingInterval = setInterval(() => {
      const now = Date.now();
      const pingTimeout = 30000; // 30 seconds timeout

      // Only check for timeout if we've sent at least one ping
      if (session.lastPingTime) {
        // Check if the last pong is older than our ping timeout
        if (
          !session.lastPongTime || (now - session.lastPongTime) > pingTimeout
        ) {
          // No pong received within timeout period, close the connection
          webSocket.close();
          clearInterval(pingInterval);
          return;
        }
      }

      // Send a new ping and record the time
      session.lastPingTime = now;
      const hashCode = computeSessionHash(this.code.getSession());
      this.safeSend(webSocket, { type: "ping", hashCode });
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
      this.safeSend(session.webSocket, { type: "pong" });
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
      this.safeSend(session.webSocket, {
        type: "ack",
        action: "subscribe",
        topics: data.topics,
      });
      return;
    }

    if (data.type === "unsubscribe") {
      for (const topic of data.topics) {
        session.subscribedTopics.delete(topic);
        this.topics.get(topic)?.delete(session.webSocket);
      }
      // Send acknowledgment for unsubscribe
      this.safeSend(session.webSocket, {
        type: "ack",
        action: "unsubscribe",
        topics: data.topics,
      });
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
          this.safeSend(subscriber, message);
        }
      }
      // Send acknowledgment for publish
      this.safeSend(session.webSocket, {
        type: "ack",
        action: "publish",
        topic: data.topic,
      });
      return;
    }

    if (data.oldHash) {
      const currentSession = this.code.getSession();
      const currentHash = computeSessionHash(currentSession);

      if (currentHash !== data.oldHash) {
        console.error("Hash mismatch");
        this.safeSend(session.webSocket, {
          type: "error",
          message: "Session hash mismatch",
        });
        return;
      }

      const patchedSession = applySessionDelta(currentSession, data);
      const { error } = await tryCatch(
        this.code.updateAndBroadcastSession(patchedSession),
      );
      if (error) {
        this.safeSend(session.webSocket, {
          type: "error",
          message: "Failed to apply patch " + error.message,
        });
        return;
      }

      // Only send acknowledgment if no error occurred
      this.safeSend(session.webSocket, {
        type: "ack",
        hashCode: computeSessionHash(patchedSession),
      });

      return;
    }

    if (data.target) {
      const targetSession = this.wsSessions.find((s) => s.name === data.target);
      if (targetSession && targetSession.webSocket.readyState === 1) {
        this.safeSend(targetSession.webSocket, msg.data);
      }
      return;
    }

    if (data.name && session.name !== data.name) {
      session.name = data.name;

      // Deliver blocked messages from previous sessions with the same name
      for (const prevSession of this.wsSessions) {
        if (
          prevSession !== session &&
          prevSession.name === data.name &&
          Array.isArray(prevSession.blockedMessages) &&
          prevSession.blockedMessages.length > 0
        ) {
          for (const blockedMsg of prevSession.blockedMessages) {
            try {
              this.safeSend(
                session.webSocket,
                blockedMsg,
              );
            } catch (_e) {
              // If sending fails, re-queue to current session
              session.blockedMessages.push(blockedMsg);
            }
          }
          prevSession.blockedMessages = [];
        }
      }

      // Send acknowledgment for name update
      this.safeSend(session.webSocket, {
        type: "ack",
        action: "nameUpdate",
        name: data.name,
      });
    }

    // Add catch-all response for any unhandled message types
    this.safeSend(session.webSocket, {
      type: "ack",
      message: "Message received",
      receivedType: data.type || "unknown",
    });
  };

  getActiveUsers(codeSpace: string): string[] {
    return this.wsSessions
      .filter((session) => session.subscribedTopics.has(codeSpace))
      .map((session) => session.name || "anonymous")
      .filter(Boolean);
  }

  broadcast(message: object | string, excludeSession?: WebsocketSession) {
    for (const session of this.wsSessions) {
      // Skip only if excludeSession is provided and matches
      if (!excludeSession || session !== excludeSession) {
        this.safeSend(session.webSocket, message);
      }
    }
  }
}
