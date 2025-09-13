import type { Env, WebSocketMessage, AuthContext } from "../types";
import { AuthService } from "../utils/auth";
import { DatabaseManager } from "../../lib/database";

export class WebSocketAPI {
  private env: Env;
  private authService: AuthService;
  private db: DatabaseManager;

  constructor(env: Env) {
    this.env = env;
    this.authService = new AuthService(env);
    this.db = new DatabaseManager(env);
  }

  async handleWebSocketUpgrade(request: Request): Promise<Response> {
    try {
      // Check if this is a WebSocket upgrade request
      const upgrade = request.headers.get("Upgrade");
      if (upgrade !== "websocket") {
        return new Response("Expected WebSocket upgrade", { status: 400 });
      }

      // Extract conversation ID from URL
      const url = new URL(request.url);
      const conversationId = url.searchParams.get("conversationId") ||
                            url.pathname.split("/").pop();

      if (!conversationId) {
        return new Response("Conversation ID is required", { status: 400 });
      }

      // Authentication for WebSocket connection
      const authContext: AuthContext | null = await this.authService.verifyRequest(request);
      if (!authContext) {
        return new Response("Unauthorized", { status: 401 });
      }

      // Verify user has access to this conversation
      const conversation = await this.db.getConversationById(conversationId);
      if (!conversation || conversation.user_id !== authContext.userId) {
        return new Response("Conversation not found or access denied", { status: 404 });
      }

      // Forward to Durable Object WebSocket handler
      const roomId = this.env.CHAT_ROOM.idFromName(conversationId);
      const room = this.env.CHAT_ROOM.get(roomId);

      // Create a new request with authentication context
      const roomRequest = new Request(
        `https://chat/websocket?conversationId=${conversationId}&userId=${authContext.userId}`,
        {
          method: request.method,
          headers: {
            ...Object.fromEntries(request.headers.entries()),
            "X-User-Id": authContext.userId,
            "X-Conversation-Id": conversationId,
          },
        }
      );

      return room.fetch(roomRequest);

    } catch (error) {
      console.error("WebSocket connection error:", error);
      return new Response("Internal server error", { status: 500 });
    }
  }

  async broadcastMessage(request: Request): Promise<Response> {
    try {
      const authContext: AuthContext | null = await this.authService.verifyRequest(request);
      if (!authContext) {
        return new Response("Unauthorized", { status: 401 });
      }

      // Parse request body
      let message: WebSocketMessage;
      try {
        message = await request.json();
      } catch {
        return new Response("Invalid JSON in request body", { status: 400 });
      }

      // Validate required fields
      if (!message.conversationId || !message.type) {
        return new Response("Conversation ID and message type are required", { status: 400 });
      }

      // Verify user has access to this conversation
      const conversation = await this.db.getConversationById(message.conversationId);
      if (!conversation || conversation.user_id !== authContext.userId) {
        return new Response("Conversation not found or access denied", { status: 404 });
      }

      // Rate limiting for WebSocket messages
      const clientIP = request.headers.get("cf-connecting-ip") ||
                      request.headers.get("x-forwarded-for") ||
                      "unknown";
      const rateLimitKey = `websocket_rate_limit:${clientIP}:${authContext.userId}`;

      const rateLimitCheck = await this.env.KV_STORE.get(rateLimitKey);
      if (rateLimitCheck) {
        const requests = parseInt(rateLimitCheck);
        if (requests >= 100) { // 100 WebSocket messages per minute
          return new Response("Rate limit exceeded", { status: 429 });
        }
        await this.env.KV_STORE.put(
          rateLimitKey,
          (requests + 1).toString(),
          { expirationTtl: 60 }
        );
      } else {
        await this.env.KV_STORE.put(rateLimitKey, "1", { expirationTtl: 60 });
      }

      // Add user ID to message for verification
      const wsMessage: WebSocketMessage = {
        ...message,
        userId: authContext.userId,
      };

      // Forward to Durable Object
      const roomId = this.env.CHAT_ROOM.idFromName(message.conversationId);
      const room = this.env.CHAT_ROOM.get(roomId);

      const roomRequest = new Request("https://chat/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": authContext.userId,
          "X-Conversation-Id": message.conversationId,
        },
        body: JSON.stringify(wsMessage),
      });

      const roomResponse = await room.fetch(roomRequest);

      if (!roomResponse.ok) {
        return new Response("Failed to broadcast message", { status: 500 });
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Message broadcasted successfully",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );

    } catch (error) {
      console.error("WebSocket broadcast error:", error);
      return new Response("Internal server error", { status: 500 });
    }
  }

  async getConnectionInfo(request: Request): Promise<Response> {
    try {
      const authContext: AuthContext | null = await this.authService.verifyRequest(request);
      if (!authContext) {
        return new Response("Unauthorized", { status: 401 });
      }

      const url = new URL(request.url);
      const conversationId = url.searchParams.get("conversationId");

      if (!conversationId) {
        return new Response("Conversation ID is required", { status: 400 });
      }

      // Get WebSocket connection info from Durable Object
      const roomId = this.env.CHAT_ROOM.idFromName(conversationId);
      const room = this.env.CHAT_ROOM.get(roomId);

      const roomRequest = new Request("https://chat/info", {
        headers: {
          "X-User-Id": authContext.userId,
          "X-Conversation-Id": conversationId,
        },
      });

      const roomResponse = await room.fetch(roomRequest);

      if (!roomResponse.ok) {
        return new Response("Failed to get connection info", { status: 500 });
      }

      const connectionInfo = await roomResponse.json();

      return new Response(
        JSON.stringify({
          success: true,
          data: connectionInfo,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );

    } catch (error) {
      console.error("WebSocket info error:", error);
      return new Response("Internal server error", { status: 500 });
    }
  }
}