import type { Env, WebSocketMessage } from "../types";

interface WebSocketContext {
  userId: string;
  conversationId: string;
  sessionId: string;
  webSocket: WebSocket;
}

interface ConnectionHeaders {
  userId?: string;
  conversationId?: string;
}

interface WebSocketHandlerOptions {
  onConnect?: (context: WebSocketContext) => void | Promise<void>;
  onDisconnect?: (context: WebSocketContext) => void | Promise<void>;
  onMessage?: (context: WebSocketContext, message: WebSocketMessage) => void | Promise<void>;
  onError?: (context: WebSocketContext, error: Error) => void | Promise<void>;
}

export class WebSocketMiddleware {
  private sessions: Map<string, WebSocketContext> = new Map();
  private userSessions: Map<string, Set<string>> = new Map();

  constructor(
    private env: Env,
    private options: WebSocketHandlerOptions = {},
  ) {}

  async handleUpgrade(request: Request): Promise<Response> {
    const upgradeHeader = request.headers.get("Upgrade");
    if (upgradeHeader !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }

    const headers = this.extractHeaders(request);
    if (!headers.userId || !headers.conversationId) {
      return new Response("Missing authentication headers", { status: 401 });
    }

    // Use proper Cloudflare Workers WebSocketPair
    const webSocketPair = new WebSocketPair();
    const client = webSocketPair[0];
    const server = webSocketPair[1];
    const sessionId = crypto.randomUUID();

    const context: WebSocketContext = {
      userId: headers.userId,
      conversationId: headers.conversationId,
      sessionId,
      webSocket: server,
    };

    await this.setupConnection(context);

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }

  private extractHeaders(request: Request): ConnectionHeaders {
    return {
      userId: request.headers.get("X-User-Id") || undefined,
      conversationId: request.headers.get("X-Conversation-Id") || undefined,
    };
  }

  private async setupConnection(context: WebSocketContext): Promise<void> {
    context.webSocket.accept();

    this.sessions.set(context.sessionId, context);
    this.addUserSession(context.userId, context.sessionId);

    context.webSocket.addEventListener("message", async (event) => {
      try {
        const data = this.parseMessage(event.data);
        if (this.options.onMessage) {
          await this.options.onMessage(context, data);
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        await this.handleError(context, err);
      }
    });

    context.webSocket.addEventListener("close", async () => {
      await this.cleanup(context);
      if (this.options.onDisconnect) {
        await this.options.onDisconnect(context);
      }
    });

    context.webSocket.addEventListener("error", async () => {
      await this.cleanup(context);
      const error = new Error("WebSocket connection error");
      if (this.options.onError) {
        await this.options.onError(context, error);
      }
    });

    if (this.options.onConnect) {
      await this.options.onConnect(context);
    }
  }

  private parseMessage(data: string | ArrayBuffer | MessageEvent["data"]): WebSocketMessage {
    try {
      const messageText = typeof data === "string" ? data : data.toString();
      const parsed = JSON.parse(messageText) as unknown;

      if (!this.isValidWebSocketMessage(parsed)) {
        throw new Error("Invalid message format");
      }

      return parsed;
    } catch (_error) {
      throw new Error("Failed to parse WebSocket message");
    }
  }

  private isValidWebSocketMessage(data: unknown): data is WebSocketMessage {
    if (!data || typeof data !== "object") {
      return false;
    }

    const msg = data as Record<string, unknown>;
    return typeof msg.type === "string";
  }

  private addUserSession(userId: string, sessionId: string): void {
    if (!this.userSessions.has(userId)) {
      this.userSessions.set(userId, new Set());
    }
    this.userSessions.get(userId)?.add(sessionId);
  }

  private async cleanup(context: WebSocketContext): Promise<void> {
    this.sessions.delete(context.sessionId);
    this.userSessions.get(context.userId)?.delete(context.sessionId);

    if (this.userSessions.get(context.userId)?.size === 0) {
      this.userSessions.delete(context.userId);
    }
  }

  private async handleError(context: WebSocketContext, error: Error): Promise<void> {
    const errorMessage: WebSocketMessage = {
      type: "error",
      error: error.message,
    };

    try {
      context.webSocket.send(JSON.stringify(errorMessage));
    } catch (_sendError) {
      console.error("Failed to send error message:", _sendError);
    }

    if (this.options.onError) {
      await this.options.onError(context, error);
    }
  }

  async broadcast(message: WebSocketMessage, excludeSessionId?: string): Promise<void> {
    const messageStr = JSON.stringify(message);
    const promises: Promise<void>[] = [];

    for (const [sessionId, context] of this.sessions) {
      if (excludeSessionId && sessionId === excludeSessionId) {
        continue;
      }

      if (context.webSocket.readyState === WebSocket.OPEN) {
        promises.push(
          this.sendMessage(context.webSocket, messageStr),
        );
      }
    }

    await Promise.all(promises);
  }

  async broadcastToUser(userId: string, message: WebSocketMessage): Promise<void> {
    const userSessionIds = this.userSessions.get(userId);
    if (!userSessionIds) {
      return;
    }

    const messageStr = JSON.stringify(message);
    const promises: Promise<void>[] = [];

    for (const sessionId of userSessionIds) {
      const context = this.sessions.get(sessionId);
      if (context && context.webSocket.readyState === WebSocket.OPEN) {
        promises.push(
          this.sendMessage(context.webSocket, messageStr),
        );
      }
    }

    await Promise.all(promises);
  }

  private async sendMessage(webSocket: WebSocket, message: string): Promise<void> {
    return new Promise<void>((resolve) => {
      try {
        webSocket.send(message);
      } catch (error) {
        console.error("Failed to send WebSocket message:", error);
      }
      resolve();
    });
  }

  getActiveUserCount(): number {
    return this.userSessions.size;
  }

  getActiveSessionCount(): number {
    return this.sessions.size;
  }

  getUserSessions(userId: string): WebSocketContext[] {
    const sessionIds = this.userSessions.get(userId);
    if (!sessionIds) {
      return [];
    }

    const contexts: WebSocketContext[] = [];
    for (const sessionId of sessionIds) {
      const context = this.sessions.get(sessionId);
      if (context) {
        contexts.push(context);
      }
    }

    return contexts;
  }

  async cleanupStaleConnections(): Promise<void> {
    const staleSessions: string[] = [];

    for (const [sessionId, context] of this.sessions) {
      if (context.webSocket.readyState !== WebSocket.OPEN) {
        staleSessions.push(sessionId);
      }
    }

    for (const sessionId of staleSessions) {
      const context = this.sessions.get(sessionId);
      if (context) {
        await this.cleanup(context);
      }
    }
  }
}

export function createWebSocketMiddleware(
  env: Env,
  options?: WebSocketHandlerOptions,
): WebSocketMiddleware {
  return new WebSocketMiddleware(env, options);
}
