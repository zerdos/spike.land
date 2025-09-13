import { nanoid } from "nanoid";
import type { Env, APIResponse, Message, AuthContext, User } from "../types";
import { AuthService } from "../utils/auth";
import { AIService, type AIServiceResponse } from "../utils/ai";
import { DatabaseManager } from "../../lib/database";

export interface ChatRequest {
  message: string;
  conversationId?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatResponse {
  message: Message;
  conversationId: string;
  tokensUsed: number;
}

export class ChatAPI {
  private env: Env;
  private authService: AuthService;
  private aiService: AIService;
  private db: DatabaseManager;

  constructor(env: Env) {
    this.env = env;
    this.authService = new AuthService(env);
    this.aiService = new AIService(env);
    this.db = new DatabaseManager(env);
  }

  async chat(request: Request): Promise<Response> {
    try {
      // Rate limiting check
      const clientIP = request.headers.get("cf-connecting-ip") ||
                      request.headers.get("x-forwarded-for") ||
                      "unknown";
      const rateLimitKey = `chat_rate_limit:${clientIP}`;

      const rateLimitCheck = await this.env.KV_STORE.get(rateLimitKey);
      if (rateLimitCheck) {
        const requests = parseInt(rateLimitCheck);
        if (requests >= 60) { // 60 requests per minute
          return this.errorResponse(
            "Rate limit exceeded. Please try again later.",
            429
          );
        }
        await this.env.KV_STORE.put(
          rateLimitKey,
          (requests + 1).toString(),
          { expirationTtl: 60 }
        );
      } else {
        await this.env.KV_STORE.put(rateLimitKey, "1", { expirationTtl: 60 });
      }

      // Authentication
      const authContext: AuthContext | null = await this.authService.verifyRequest(request);
      if (!authContext) {
        return this.errorResponse("Unauthorized. Please provide valid authentication.", 401);
      }

      // Parse request body
      let body: ChatRequest;
      try {
        body = await request.json();
      } catch {
        return this.errorResponse("Invalid JSON in request body", 400);
      }

      // Validate required fields
      if (!body.message || typeof body.message !== "string" || body.message.trim().length === 0) {
        return this.errorResponse("Message is required and must be a non-empty string", 400);
      }

      // Check user subscription and credits
      const user = await this.authService.getUserFromClerkId(authContext.clerkId);
      if (!user) {
        return this.errorResponse("User not found", 404);
      }

      if (user.subscription_tier === "free" && (user.credits || 0) <= 0) {
        return this.errorResponse(
          "Insufficient credits. Please upgrade your subscription or purchase more credits.",
          402
        );
      }

      // Generate AI response
      const model = body.model || "@cf/meta/llama-3.1-8b-instruct";
      const temperature = body.temperature || 0.7;
      const maxTokens = body.maxTokens || 2048;

      let conversationId = body.conversationId;

      // Create conversation if not provided
      if (!conversationId) {
        conversationId = nanoid();
        const conversation = await this.db.createConversation({
          id: conversationId,
          user_id: authContext.userId,
          title: body.message.substring(0, 50) + "...",
          model,
        });
        conversationId = conversation.id;
      }

      // Get conversation history
      const { messages: conversationHistory } = await this.db.getMessagesByConversationId(
        conversationId
      );

      // Add user message to conversation
      const userMessageId = nanoid();
      const userMessage = await this.db.createMessage({
        id: userMessageId,
        conversation_id: conversationId,
        user_id: authContext.userId,
        role: "user",
        content: body.message.trim(),
      });

      // Prepare messages for AI
      const messages = [
        ...conversationHistory.map(msg => ({
          role: msg.role as "user" | "assistant" | "system",
          content: msg.content,
        })),
        { role: "user" as const, content: body.message },
      ];

      // Generate AI response
      const aiResponse: AIServiceResponse = await this.aiService.generateResponse({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      });

      if (!aiResponse.success || !aiResponse.response) {
        return this.errorResponse(
          aiResponse.error || "Failed to generate AI response",
          500
        );
      }

      // Save AI response
      const assistantMessageId = nanoid();
      const assistantMessage = await this.db.createMessage({
        id: assistantMessageId,
        conversation_id: conversationId,
        role: "assistant",
        content: aiResponse.response,
        tokens_used: aiResponse.tokensUsed,
      });

      // Update user credits
      if (user.subscription_tier === "free") {
        const newCredits = Math.max(0, (user.credits || 0) - 1);
        await this.db.updateUser(user.id, { credits: newCredits });
      }

      // Broadcast to WebSocket clients
      try {
        const wsMessage = {
          type: "message",
          conversationId,
          message: assistantMessage,
          userId: authContext.userId,
        };

        const roomId = this.env.CHAT_ROOM.idFromName(conversationId);
        const room = this.env.CHAT_ROOM.get(roomId);
        await room.fetch(new Request("https://chat/broadcast", {
          method: "POST",
          body: JSON.stringify(wsMessage),
        }));
      } catch (wsError) {
        console.error("WebSocket broadcast error:", wsError);
        // Don't fail the request if WebSocket broadcast fails
      }

      const response: ChatResponse = {
        message: assistantMessage,
        conversationId,
        tokensUsed: aiResponse.tokensUsed || 0,
      };

      return this.successResponse(response);

    } catch (error) {
      console.error("Chat API error:", error);
      return this.errorResponse("Internal server error", 500);
    }
  }

  private successResponse<T>(data: T, message?: string, statusCode: number = 200): Response {
    const response: APIResponse<T> = {
      success: true,
      data,
      ...(message && { message }),
    };

    return new Response(JSON.stringify(response), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }

  private errorResponse(error: string, statusCode: number = 500): Response {
    const response: APIResponse = {
      success: false,
      error,
    };

    return new Response(JSON.stringify(response), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}