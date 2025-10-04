import { nanoid } from "nanoid";
import { DatabaseManager } from "../../lib/database";
import type { APIResponse, Env, Message, User as _User } from "../types";
import { AIService, type AIServiceResponse } from "../utils/ai";
import { AuthService } from "../utils/auth";
import type { ILogger } from "../utils/interfaces/ILogger";
import type { IRateLimiter, IAIService, IAuthService, IWebSocketBroadcaster } from "../utils/interfaces/IExternalServices";
import { logger as defaultLogger } from "../utils/logger";

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

/**
 * Dependencies for ChatAPI with dependency injection
 */
export interface ChatAPIDependencies {
  /** Logger instance for structured logging */
  logger: ILogger;
  /** Rate limiter for API throttling */
  rateLimiter: IRateLimiter;
  /** AI service for generating responses */
  aiService: IAIService;
  /** Authentication service */
  authService: IAuthService;
  /** WebSocket broadcaster */
  webSocketBroadcaster: IWebSocketBroadcaster;
  /** Database manager */
  db: DatabaseManager;
}

/**
 * ChatAPI refactored with dependency injection for better testability
 * and flexibility. External dependencies are now injected rather than
 * hard-coded.
 */
export class ChatAPI {
  private readonly logger: ILogger;
  private readonly rateLimiter: IRateLimiter;
  private readonly aiService: IAIService;
  private readonly authService: IAuthService;
  private readonly webSocketBroadcaster: IWebSocketBroadcaster;
  private readonly db: DatabaseManager;

  constructor(
    private readonly env: Env,
    dependencies: Partial<ChatAPIDependencies> = {},
  ) {
    // Use injected dependencies or fall back to defaults
    this.logger = dependencies.logger ?? this.createDefaultLogger();
    this.rateLimiter = dependencies.rateLimiter ?? this.createDefaultRateLimiter();
    this.aiService = dependencies.aiService ?? new AIService(env);
    this.authService = dependencies.authService ?? new AuthService(env);
    this.webSocketBroadcaster = dependencies.webSocketBroadcaster ?? this.createDefaultBroadcaster();
    this.db = dependencies.db ?? new DatabaseManager(env);
  }

  /**
   * Create default logger using existing logger utility
   */
  private createDefaultLogger(): ILogger {
    return defaultLogger;
  }

  /**
   * Create default rate limiter using KV store
   */
  private createDefaultRateLimiter(): IRateLimiter {
    return {
      checkLimit: async (key: string, limit: number, _window: number): Promise<boolean> => {
        const value = await this.env.KV_STORE.get(key);
        if (!value) return true;
        const requests = parseInt(value);
        return requests < limit;
      },
      increment: async (key: string, window: number): Promise<number> => {
        const value = await this.env.KV_STORE.get(key);
        const requests = value ? parseInt(value) + 1 : 1;
        await this.env.KV_STORE.put(key, requests.toString(), { expirationTtl: window });
        return requests;
      },
    };
  }

  /**
   * Create default WebSocket broadcaster
   */
  private createDefaultBroadcaster(): IWebSocketBroadcaster {
    return {
      broadcast: async (roomId: string, message: unknown): Promise<void> => {
        const id = this.env.CHAT_ROOM.idFromName(roomId);
        const room = this.env.CHAT_ROOM.get(id);
        await room.fetch(
          new Request("https://chat/broadcast", {
            method: "POST",
            body: JSON.stringify(message),
          }),
        );
      },
    };
  }

  async chat(request: Request): Promise<Response> {
    try {
      // Rate limiting check using injected rate limiter
      const clientIP = request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-forwarded-for") ||
        "unknown";
      const rateLimitKey = `chat_rate_limit:${clientIP}`;

      const isAllowed = await this.rateLimiter.checkLimit(rateLimitKey, 60, 60);
      if (!isAllowed) {
        this.logger.warn("Rate limit exceeded", { clientIP, key: rateLimitKey });
        return this.errorResponse(
          "Rate limit exceeded. Please try again later.",
          429,
        );
      }

      await this.rateLimiter.increment(rateLimitKey, 60);

      // Authentication using injected auth service
      const authContext = await this.authService.verifyRequest(request);
      if (!authContext) {
        this.logger.warn("Unauthorized request", { clientIP });
        return this.errorResponse("Unauthorized. Please provide valid authentication.", 401);
      }

      // Parse request body
      let body: ChatRequest;
      try {
        body = await request.json();
      } catch (parseError) {
        this.logger.error("Failed to parse request body", parseError);
        return this.errorResponse(
          `Invalid JSON in request body: ${parseError instanceof Error ? parseError.message : "Unknown error"}`,
          400,
        );
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
          402,
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
        conversationId,
      );

      // Add user message to conversation
      const userMessageId = nanoid();
      const _userMessage = await this.db.createMessage({
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

      // Generate AI response using injected AI service
      this.logger.debug("Generating AI response", { model, messageCount: messages.length });
      const aiResponse: AIServiceResponse = await this.aiService.generateResponse({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      });

      if (!aiResponse.success || !aiResponse.response) {
        this.logger.error("AI response generation failed", aiResponse.error);
        return this.errorResponse(
          aiResponse.error || "Failed to generate AI response",
          500,
        );
      }

      this.logger.info("AI response generated successfully", {
        conversationId,
        tokensUsed: aiResponse.tokensUsed,
      });

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

      // Broadcast to WebSocket clients using injected broadcaster
      try {
        const wsMessage = {
          type: "message",
          conversationId,
          message: assistantMessage,
          userId: authContext.userId,
        };

        await this.webSocketBroadcaster.broadcast(conversationId, wsMessage);
        this.logger.debug("WebSocket broadcast successful", { conversationId });
      } catch (wsError) {
        this.logger.error("WebSocket broadcast error", wsError);
        // Don't fail the request if WebSocket broadcast fails
      }

      const response: ChatResponse = {
        message: assistantMessage,
        conversationId,
        tokensUsed: aiResponse.tokensUsed || 0,
      };

      return this.successResponse(response);
    } catch (error) {
      this.logger.error("Chat API error", error);
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
