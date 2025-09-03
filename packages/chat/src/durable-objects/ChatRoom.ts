import type { Env, WebSocketMessage } from "../types";

export class ChatRoom implements DurableObject {
  private state: DurableObjectState;
  private env: Env;
  private sessions: Map<string, WebSocket>;
  private userSessions: Map<string, Set<string>>;
  
  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
    this.sessions = new Map();
    this.userSessions = new Map();
  }
  
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname === "/websocket") {
      return this.handleWebSocket(request);
    }
    
    if (url.pathname === "/broadcast" && request.method === "POST") {
      const message = await request.json() as WebSocketMessage;
      await this.broadcast(message);
      return new Response("OK", { status: 200 });
    }
    
    return new Response("Not found", { status: 404 });
  }
  
  private handleWebSocket(request: Request): Response {
    const upgradeHeader = request.headers.get("Upgrade");
    if (upgradeHeader !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }
    
    const userId = request.headers.get("X-User-Id");
    const conversationId = request.headers.get("X-Conversation-Id");
    
    if (!userId || !conversationId) {
      return new Response("Missing authentication", { status: 401 });
    }
    
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    
    const sessionId = crypto.randomUUID();
    this.handleSession(server, sessionId, userId, conversationId);
    
    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }
  
  private handleSession(
    webSocket: WebSocket,
    sessionId: string,
    userId: string,
    conversationId: string
  ): void {
    webSocket.accept();
    
    this.sessions.set(sessionId, webSocket);
    
    if (!this.userSessions.has(userId)) {
      this.userSessions.set(userId, new Set());
    }
    this.userSessions.get(userId)?.add(sessionId);
    
    this.broadcast({
      type: "presence",
      userId,
      conversationId,
    });
    
    webSocket.addEventListener("message", async (event) => {
      try {
        const message = JSON.parse(event.data as string) as WebSocketMessage;
        
        if (message.type === "typing") {
          await this.broadcastToOthers(sessionId, {
            type: "typing",
            userId,
            conversationId,
          });
        } else if (message.type === "message") {
          await this.broadcast(message);
        }
      } catch (error) {
        webSocket.send(JSON.stringify({
          type: "error",
          error: "Invalid message format",
        }));
      }
    });
    
    webSocket.addEventListener("close", () => {
      this.sessions.delete(sessionId);
      this.userSessions.get(userId)?.delete(sessionId);
      
      if (this.userSessions.get(userId)?.size === 0) {
        this.userSessions.delete(userId);
      }
      
      this.broadcast({
        type: "presence",
        userId,
        conversationId,
      });
    });
    
    webSocket.addEventListener("error", () => {
      this.sessions.delete(sessionId);
      this.userSessions.get(userId)?.delete(sessionId);
    });
  }
  
  private async broadcast(message: WebSocketMessage): Promise<void> {
    const messageStr = JSON.stringify(message);
    const promises: Promise<void>[] = [];
    
    for (const [_, webSocket] of this.sessions) {
      if (webSocket.readyState === WebSocket.READY_STATE_OPEN) {
        promises.push(
          new Promise<void>((resolve) => {
            try {
              webSocket.send(messageStr);
            } catch {
            }
            resolve();
          })
        );
      }
    }
    
    await Promise.all(promises);
  }
  
  private async broadcastToOthers(
    excludeSessionId: string,
    message: WebSocketMessage
  ): Promise<void> {
    const messageStr = JSON.stringify(message);
    const promises: Promise<void>[] = [];
    
    for (const [sessionId, webSocket] of this.sessions) {
      if (
        sessionId !== excludeSessionId &&
        webSocket.readyState === WebSocket.READY_STATE_OPEN
      ) {
        promises.push(
          new Promise<void>((resolve) => {
            try {
              webSocket.send(messageStr);
            } catch {
            }
            resolve();
          })
        );
      }
    }
    
    await Promise.all(promises);
  }
  
  async alarm(): Promise<void> {
    for (const [sessionId, webSocket] of this.sessions) {
      if (webSocket.readyState !== WebSocket.READY_STATE_OPEN) {
        this.sessions.delete(sessionId);
      }
    }
  }
}