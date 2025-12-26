import { applySessionDelta, computeSessionHash, tryCatch } from "@spike-npm-land/code";
import type { Code } from "./chatRoom";

/**
 * WebSocket ready state constants
 * Using explicit constants instead of magic numbers for better maintainability
 */
const WebSocketState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
} as const;

export interface WebsocketSession {
  webSocket: WebSocket;
  name?: string;
  quit: boolean;
  subscribedTopics: Set<string>;
  lastPingTime?: number;
  lastPongTime?: number;
  blockedMessages: (string | object)[];
}

/**
 * Interface for parsed WebSocket message data
 */
interface WsMessageData {
  type?: string;
  topics?: string[];
  topic?: string;
  data?: unknown;
  oldHash?: string;
  target?: string;
  name?: string;
}

/**
 * Extract error message from unknown error type
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
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

  /**
   * Adds a new WebsocketSession to the session list in a type-safe way.
   */
  pushToWsSession(session: WebsocketSession) {
    this.wsSessions.push(session);
  }

  /**
   * Utility to safely send a message over a WebSocket.
   * @returns true if message was sent successfully, false otherwise
   */
  private safeSend(ws: WebSocket, message: string | object): boolean {
    if (ws.readyState === WebSocketState.OPEN) {
      try {
        ws.send(typeof message === "string" ? message : JSON.stringify(message));
        return true;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        console.error("WebSocket send error:", { error: errorMessage });
        return false;
      }
    }
    return false;
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

    // Setup ping interval with proper timing to avoid race conditions
    // Ping interval: 30 seconds - how often we send pings
    // Pong timeout: 45 seconds - how long we wait for a pong response
    // This ensures the pong check happens AFTER the expected pong should arrive
    const PING_INTERVAL_MS = 30000;
    const PONG_TIMEOUT_MS = 45000;

    const pingInterval = setInterval(() => {
      const now = Date.now();

      // Only check for timeout if we've sent at least one ping
      if (session.lastPingTime) {
        // Check if we haven't received a pong within the timeout period
        // The timeout is longer than the ping interval to account for network latency
        const lastPongTime = session.lastPongTime || 0;
        const timeSinceLastPong = now - lastPongTime;

        if (timeSinceLastPong > PONG_TIMEOUT_MS) {
          // No pong received within timeout period, close the connection
          console.warn("WebSocket ping timeout - closing connection", {
            timeSinceLastPong,
            timeoutMs: PONG_TIMEOUT_MS,
          });
          webSocket.close();
          clearInterval(pingInterval);
          return;
        }
      }

      // Send a new ping and record the time
      session.lastPingTime = now;
      const hashCode = computeSessionHash(this.code.getSession());
      const sent = this.safeSend(webSocket, { type: "ping", hashCode });
      if (!sent) {
        // Failed to send ping, connection may be closed
        console.warn("Failed to send ping - WebSocket may be closed");
        clearInterval(pingInterval);
      }
    }, PING_INTERVAL_MS);

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
    let data: WsMessageData;
    try {
      data = JSON.parse(msg.data as string) as WsMessageData;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to parse WebSocket message:", {
        error: errorMessage,
        rawData: typeof msg.data === "string" ? msg.data.substring(0, 100) : typeof msg.data,
      });
      this.safeSend(session.webSocket, {
        type: "error",
        message: "Invalid JSON message",
        details: errorMessage,
      });
      return;
    }

    if (data.type === "ping") {
      this.safeSend(session.webSocket, { type: "pong" });
      return;
    }

    if (data.type === "pong") {
      session.lastPongTime = Date.now();
      return;
    }

    if (data.type === "subscribe") {
      const topics = data.topics ?? [];
      for (const topic of topics) {
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
        topics: topics,
      });
      return;
    }

    if (data.type === "unsubscribe") {
      const topics = data.topics ?? [];
      for (const topic of topics) {
        session.subscribedTopics.delete(topic);
        this.topics.get(topic)?.delete(session.webSocket);
      }
      // Send acknowledgment for unsubscribe
      this.safeSend(session.webSocket, {
        type: "ack",
        action: "unsubscribe",
        topics: topics,
      });
      return;
    }

    if (data.type === "publish") {
      const pubTopic = data.topic ?? "";
      const subscribers = this.topics.get(pubTopic);
      if (subscribers) {
        const message = JSON.stringify({
          type: "message",
          topic: pubTopic,
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
        topic: pubTopic,
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
      const { error } = await tryCatch(this.code.updateAndBroadcastSession(patchedSession));
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
      if (targetSession && targetSession.webSocket.readyState === WebSocketState.OPEN) {
        this.safeSend(targetSession.webSocket, msg.data as string);
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
      // Only exclude if we have an exclusion session and it matches
      if (excludeSession && session === excludeSession) {
        continue;
      }
      this.safeSend(
        session.webSocket,
        message,
      );
    }
  }
}
