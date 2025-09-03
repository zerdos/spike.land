import type { Env } from "../types";
import { ConversationsAPI } from "../api/conversations";
import { MessagesAPI } from "../api/messages";
import { handleClerkWebhook } from "../webhooks/clerk";
import { handleStripeWebhook } from "../webhooks/stripe";
import { AuthService } from "../utils/auth";

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
      
      const conversationMatch = path.match(/^\/api\/conversations\/([^\/]+)$/);
      if (conversationMatch) {
        const conversationId = conversationMatch[1];
        
        if (method === "GET") {
          const response = await conversationsAPI.get(request, conversationId);
          return this.addCorsHeaders(response, corsHeaders);
        }
        
        if (method === "DELETE") {
          const response = await conversationsAPI.delete(request, conversationId);
          return this.addCorsHeaders(response, corsHeaders);
        }
        
        if (method === "PUT") {
          const response = await conversationsAPI.updateTitle(request, conversationId);
          return this.addCorsHeaders(response, corsHeaders);
        }
      }
      
      if (path === "/api/messages" && method === "POST") {
        const response = await messagesAPI.send(request);
        return this.addCorsHeaders(response, corsHeaders);
      }
      
      const messagesMatch = path.match(/^\/api\/messages\/([^\/]+)$/);
      if (messagesMatch && method === "GET") {
        const conversationId = messagesMatch[1];
        const response = await messagesAPI.list(request, conversationId);
        return this.addCorsHeaders(response, corsHeaders);
      }
      
      const regenerateMatch = path.match(/^\/api\/messages\/([^\/]+)\/regenerate$/);
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
            { status: 401, headers: { "Content-Type": "application/json" } }
          );
          return this.addCorsHeaders(response, corsHeaders);
        }
        
        const user = await authService.getUserFromClerkId(authContext.clerkId);
        
        const response = new Response(
          JSON.stringify({ success: true, data: user }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
        return this.addCorsHeaders(response, corsHeaders);
      }
      
      if (path.startsWith("/ws/")) {
        const conversationId = path.replace("/ws/", "");
        const roomId = env.CHAT_ROOM.idFromName(conversationId);
        const room = env.CHAT_ROOM.get(roomId);
        
        return room.fetch(new Request("https://chat/websocket", {
          headers: request.headers,
        }));
      }
      
      const response = new Response("Not found", { status: 404 });
      return this.addCorsHeaders(response, corsHeaders);
      
    } catch (error) {
      console.error("Worker error:", error);
      const response = new Response(
        JSON.stringify({ success: false, error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
      return this.addCorsHeaders(response, corsHeaders);
    }
  },
  
  addCorsHeaders(response: Response, headers: Record<string, string>): Response {
    const newResponse = new Response(response.body, response);
    Object.entries(headers).forEach(([key, value]) => {
      newResponse.headers.set(key, value);
    });
    return newResponse;
  },
  
  async queue(batch: MessageBatch<any>, env: Env): Promise<void> {
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