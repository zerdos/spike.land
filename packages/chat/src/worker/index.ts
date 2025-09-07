import { ConversationsAPI } from "../api/conversations";
import { MessagesAPI } from "../api/messages";
import type { Env } from "../types";
import { AuthService } from "../utils/auth";
import { handleClerkWebhook } from "../webhooks/clerk";
import { handleStripeWebhook } from "../webhooks/stripe";
import { chatHTML } from "./chatHTML";

export { ChatRoom } from "../durable-objects/ChatRoom";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-User-Id, X-Conversation-Id",
      "Access-Control-Max-Age": "86400",
    };

    if (method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      if (path === "/api/webhooks/clerk" && method === "POST") {
        return await handleClerkWebhook(request, env);
      }

      if (path === "/api/webhooks/stripe" && method === "POST") {
        return await handleStripeWebhook(request, env);
      }

      const conversationsAPI = new ConversationsAPI(env);
      const messagesAPI = new MessagesAPI(env);
      const authService = new AuthService(env);

      if (path === "/api/conversations" && method === "GET") {
        const response = await conversationsAPI.list(request);
        return this.addCorsHeaders(response, corsHeaders);
      }

      if (path === "/api/conversations" && method === "POST") {
        const response = await conversationsAPI.create(request);
        return this.addCorsHeaders(response, corsHeaders);
      }

      const conversationMatch = path.match(/^\/api\/conversations\/([^/]+)$/);
      if (conversationMatch) {
        const conversationId = conversationMatch[1];

        if (method === "GET") {
          const response = await conversationsAPI.get(request, conversationId);
          return this.addCorsHeaders(response, corsHeaders);
        }

        if (method === "DELETE") {
          const response = await conversationsAPI.delete(
            request,
            conversationId,
          );
          return this.addCorsHeaders(response, corsHeaders);
        }

        if (method === "PUT") {
          const response = await conversationsAPI.updateTitle(
            request,
            conversationId,
          );
          return this.addCorsHeaders(response, corsHeaders);
        }
      }

      if (path === "/api/messages" && method === "POST") {
        const response = await messagesAPI.send(request);
        return this.addCorsHeaders(response, corsHeaders);
      }

      const messagesMatch = path.match(/^\/api\/messages\/([^/]+)$/);
      if (messagesMatch && method === "GET") {
        const conversationId = messagesMatch[1];
        const response = await messagesAPI.list(request, conversationId);
        return this.addCorsHeaders(response, corsHeaders);
      }

      const regenerateMatch = path.match(
        /^\/api\/messages\/([^/]+)\/regenerate$/,
      );
      if (regenerateMatch && method === "POST") {
        const messageId = regenerateMatch[1];
        const response = await messagesAPI.regenerate(request, messageId);
        return this.addCorsHeaders(response, corsHeaders);
      }

      if (path === "/api/user/profile" && method === "GET") {
        const authContext = await authService.verifyRequest(request);

        if (!authContext) {
          const response = new Response(
            JSON.stringify({ success: false, error: "Unauthorized" }),
            { status: 401, headers: { "Content-Type": "application/json" } },
          );
          return this.addCorsHeaders(response, corsHeaders);
        }

        const user = await authService.getUserFromClerkId(authContext.clerkId);

        const response = new Response(
          JSON.stringify({ success: true, data: user }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
        return this.addCorsHeaders(response, corsHeaders);
      }

      if (path.startsWith("/ws/")) {
        const conversationId = path.replace("/ws/", "");
        const roomId = env.CHAT_ROOM.idFromName(conversationId);
        const room = env.CHAT_ROOM.get(roomId);

        return room.fetch(
          new Request("https://chat/websocket", {
            headers: request.headers,
          }),
        );
      }

      // Serve static assets
      if (path.startsWith("/assets/")) {
        // In development, assets are served from the dist folder
        // In production, this will be handled by Cloudflare's site configuration
        if (env.ASSETS) {
          return env.ASSETS.fetch(request);
        }
      }

      // Serve chat HTML at /chat path
      if (path === "/chat") {
        return new Response(chatHTML, {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            ...corsHeaders,
          },
        });
      }

      // Serve HTML at root path
      if (path === "/" || path === "") {
        return new Response(chatHTML, {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            ...corsHeaders,
          },
        });
        /*const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat AI Assistant - spike.land</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      width: 100%;
      max-width: 800px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
      padding: 40px;
      text-align: center;
    }

    h1 {
      color: #333;
      margin-bottom: 20px;
      font-size: 2.5em;
    }

    p {
      color: #666;
      margin-bottom: 30px;
      font-size: 1.2em;
      line-height: 1.6;
    }

    .api-section {
      text-align: left;
      margin-top: 40px;
      padding: 20px;
      background: #f7f7f9;
      border-radius: 10px;
    }

    .api-section h2 {
      color: #333;
      margin-bottom: 15px;
    }

    .endpoint {
      background: white;
      padding: 10px 15px;
      margin-bottom: 10px;
      border-radius: 5px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
    }

    .method {
      display: inline-block;
      padding: 2px 8px;
      margin-right: 10px;
      border-radius: 3px;
      font-weight: bold;
      font-size: 12px;
    }

    .method-get {
      background: #61affe;
      color: white;
    }

    .method-post {
      background: #49cc90;
      color: white;
    }

    .method-delete {
      background: #f93e3e;
      color: white;
    }

    .status {
      display: inline-block;
      padding: 5px 15px;
      background: #49cc90;
      color: white;
      border-radius: 5px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🤖 AI Chat Assistant</h1>
    <div class="status">API Status: Online ✅</div>
    <p>
      Welcome to the AI Chat Assistant API powered by Cloudflare Workers and AI.
      This service provides intelligent conversational AI capabilities with real-time messaging support.
    </p>
    
    <div class="api-section">
      <h2>Available API Endpoints:</h2>
      
      <div class="endpoint">
        <span class="method method-get">GET</span>
        /api/conversations
      </div>
      
      <div class="endpoint">
        <span class="method method-post">POST</span>
        /api/conversations
      </div>
      
      <div class="endpoint">
        <span class="method method-get">GET</span>
        /api/conversations/:id
      </div>
      
      <div class="endpoint">
        <span class="method method-delete">DELETE</span>
        /api/conversations/:id
      </div>
      
      <div class="endpoint">
        <span class="method method-post">POST</span>
        /api/messages
      </div>
      
      <div class="endpoint">
        <span class="method method-get">GET</span>
        /api/messages/:conversationId
      </div>
    </div>

    <div class="api-section">
      <h2>WebSocket Endpoint:</h2>
      <div class="endpoint">
        wss://spike-chat.spikeland.workers.dev/ws/:conversationId
      </div>
    </div>

    <p style="margin-top: 30px; font-size: 14px; color: #999;">
      Powered by Cloudflare Workers, D1 Database, R2 Storage, and AI Models
    </p>
  </div>
</body>
</html>`;

        const response = new Response(htmlContent, {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        });
        return this.addCorsHeaders(response, corsHeaders);*/
      }

      const response = new Response("Not found", { status: 404 });
      return this.addCorsHeaders(response, corsHeaders);
    } catch (error) {
      console.error("Worker error:", error);
      const response = new Response(
        JSON.stringify({ success: false, error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
      return this.addCorsHeaders(response, corsHeaders);
    }
  },

  addCorsHeaders(
    response: Response,
    headers: Record<string, string>,
  ): Response {
    const newResponse = new Response(response.body, response);
    Object.entries(headers).forEach(([key, value]) => {
      newResponse.headers.set(key, value);
    });
    return newResponse;
  },

  async queue(batch: MessageBatch<unknown>, _env: Env): Promise<void> {
    for (const message of batch.messages) {
      try {
        console.log("Processing queue message:", message.body);

        message.ack();
      } catch (error) {
        console.error("Queue processing error:", error);
        message.retry();
      }
    }
  },
};
