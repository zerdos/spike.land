import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ChatAPIDependencies } from "../../src/api/chat";
import { ChatAPI } from "../../src/api/chat";
import type { Env, Message, User } from "../../src/types";

describe("ChatAPI", () => {
  let chatAPI: ChatAPI;
  let mockEnv: Env;
  let mockDependencies: Partial<ChatAPIDependencies>;
  let mockLogger: ChatAPIDependencies["logger"];
  let mockRateLimiter: ChatAPIDependencies["rateLimiter"];
  let mockAIService: ChatAPIDependencies["aiService"];
  let mockAuthService: ChatAPIDependencies["authService"];
  let mockWebSocketBroadcaster: ChatAPIDependencies["webSocketBroadcaster"];
  let mockDB: ChatAPIDependencies["db"];

  const mockUser: User = {
    id: "user-123",
    clerk_id: "clerk-abc",
    email: "test@example.com",
    subscription_tier: "free",
    credits: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(() => {
    mockLogger = {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    mockRateLimiter = {
      checkLimit: vi.fn().mockResolvedValue(true),
      increment: vi.fn().mockResolvedValue(1),
    };

    mockAIService = {
      generateResponse: vi.fn().mockResolvedValue({
        success: true,
        response: "AI response message",
        tokensUsed: 50,
      }),
      moderateContent: vi.fn().mockResolvedValue(true),
      countTokens: vi.fn().mockResolvedValue(50),
      generateTitle: vi.fn().mockResolvedValue("Generated Title"),
    };

    mockAuthService = {
      verifyRequest: vi.fn().mockResolvedValue({
        clerkId: "clerk-abc",
        userId: "user-123",
      }),
      getUserFromClerkId: vi.fn().mockResolvedValue(mockUser),
      checkUserCredits: vi.fn().mockResolvedValue(true),
      deductCredits: vi.fn().mockResolvedValue(undefined),
    };

    mockWebSocketBroadcaster = {
      broadcast: vi.fn().mockResolvedValue(undefined),
    };

    mockDB = {
      createConversation: vi.fn().mockResolvedValue({
        id: "conv-123",
        user_id: "user-123",
        title: "Test Conversation",
        model: "@cf/meta/llama-3.1-8b-instruct",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
      createMessage: vi.fn().mockImplementation((data) => Promise.resolve({
        ...data,
        created_at: new Date().toISOString(),
      })),
      getMessagesByConversationId: vi.fn().mockResolvedValue({
        messages: [],
      }),
      updateUser: vi.fn().mockResolvedValue(undefined),
    } as never;

    mockEnv = {
      KV_STORE: {} as never,
      DATABASE: {} as never,
      CHAT_ROOM: {} as never,
      R2_BUCKET: {} as never,
    } as Env;

    mockDependencies = {
      logger: mockLogger,
      rateLimiter: mockRateLimiter,
      aiService: mockAIService,
      authService: mockAuthService,
      webSocketBroadcaster: mockWebSocketBroadcaster,
      db: mockDB,
    };

    chatAPI = new ChatAPI(mockEnv, mockDependencies);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("constructor", () => {
    it("should create instance with injected dependencies", () => {
      expect(chatAPI).toBeInstanceOf(ChatAPI);
    });

    it("should use default dependencies when none provided", () => {
      const apiWithDefaults = new ChatAPI(mockEnv);
      expect(apiWithDefaults).toBeInstanceOf(ChatAPI);
    });
  });

  describe("chat - rate limiting", () => {
    it("should check rate limit before processing", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
        headers: {
          "cf-connecting-ip": "192.168.1.1",
        },
      });

      await chatAPI.chat(request);

      expect(mockRateLimiter.checkLimit).toHaveBeenCalledWith(
        "chat_rate_limit:192.168.1.1",
        60,
        60,
      );
    });

    it("should increment rate limit counter", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
        headers: {
          "cf-connecting-ip": "192.168.1.1",
        },
      });

      await chatAPI.chat(request);

      expect(mockRateLimiter.increment).toHaveBeenCalledWith(
        "chat_rate_limit:192.168.1.1",
        60,
      );
    });

    it("should return 429 when rate limit exceeded", async () => {
      mockRateLimiter.checkLimit.mockResolvedValueOnce(false);

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
        headers: {
          "cf-connecting-ip": "192.168.1.1",
        },
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(429);
      const body = await response.json();
      expect(body.success).toBe(false);
      expect(body.error).toContain("Rate limit exceeded");
    });

    it("should use x-forwarded-for header if cf-connecting-ip not available", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
        headers: {
          "x-forwarded-for": "10.0.0.1",
        },
      });

      await chatAPI.chat(request);

      expect(mockRateLimiter.checkLimit).toHaveBeenCalledWith(
        "chat_rate_limit:10.0.0.1",
        60,
        60,
      );
    });

    it("should use 'unknown' as IP when headers not available", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      await chatAPI.chat(request);

      expect(mockRateLimiter.checkLimit).toHaveBeenCalledWith(
        "chat_rate_limit:unknown",
        60,
        60,
      );
    });
  });

  describe("chat - authentication", () => {
    it("should verify request authentication", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      await chatAPI.chat(request);

      expect(mockAuthService.verifyRequest).toHaveBeenCalledWith(request);
    });

    it("should return 401 when authentication fails", async () => {
      mockAuthService.verifyRequest.mockResolvedValueOnce(null);

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(401);
      const body = await response.json();
      expect(body.error).toContain("Unauthorized");
    });

    it("should get user from clerk ID", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      await chatAPI.chat(request);

      expect(mockAuthService.getUserFromClerkId).toHaveBeenCalledWith("clerk-abc");
    });

    it("should return 404 when user not found", async () => {
      mockAuthService.getUserFromClerkId.mockResolvedValueOnce(null);

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(404);
    });
  });

  describe("chat - request validation", () => {
    it("should validate message field is present", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toContain("Message is required");
    });

    it("should validate message is non-empty string", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "   " }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(400);
    });

    it("should validate message is string type", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: 123 }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(400);
    });

    it("should return 400 on invalid JSON", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: "invalid json {",
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toContain("Invalid JSON");
    });
  });

  describe("chat - credits check", () => {
    it("should check user has sufficient credits", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      await chatAPI.chat(request);

      expect(mockUser.credits).toBeGreaterThan(0);
    });

    it("should return 402 when user has insufficient credits", async () => {
      mockAuthService.getUserFromClerkId.mockResolvedValueOnce({
        ...mockUser,
        subscription_tier: "free",
        credits: 0,
      });

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(402);
      const body = await response.json();
      expect(body.error).toContain("Insufficient credits");
    });

    it("should allow paid users even with zero credits", async () => {
      mockAuthService.getUserFromClerkId.mockResolvedValueOnce({
        ...mockUser,
        subscription_tier: "pro",
        credits: 0,
      });

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(200);
    });
  });

  describe("chat - conversation management", () => {
    it("should create new conversation when not provided", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello, this is a new conversation" }),
      });

      await chatAPI.chat(request);

      expect(mockDB.createConversation).toHaveBeenCalledWith(
        expect.objectContaining({
          user_id: "user-123",
          title: expect.stringContaining("Hello, this is a new conversation"),
          model: "@cf/meta/llama-3.1-8b-instruct",
        }),
      );
    });

    it("should use existing conversation when ID provided", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Follow-up message",
          conversationId: "existing-conv-456",
        }),
      });

      await chatAPI.chat(request);

      expect(mockDB.createConversation).not.toHaveBeenCalled();
      expect(mockDB.getMessagesByConversationId).toHaveBeenCalledWith("existing-conv-456");
    });

    it("should truncate long titles to 50 characters", async () => {
      const longMessage = "A".repeat(100);
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: longMessage }),
      });

      await chatAPI.chat(request);

      expect(mockDB.createConversation).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringMatching(/^.{50}\.\.\./),
        }),
      );
    });

    it("should use custom model when provided", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
          model: "@cf/meta/llama-3-70b-instruct",
        }),
      });

      await chatAPI.chat(request);

      expect(mockAIService.generateResponse).toHaveBeenCalledWith(
        expect.objectContaining({
          model: "@cf/meta/llama-3-70b-instruct",
        }),
      );
    });
  });

  describe("chat - AI response generation", () => {
    it("should generate AI response with correct parameters", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
          temperature: 0.8,
          maxTokens: 1024,
        }),
      });

      await chatAPI.chat(request);

      expect(mockAIService.generateResponse).toHaveBeenCalledWith({
        model: "@cf/meta/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: "Hello" }],
        temperature: 0.8,
        max_tokens: 1024,
      });
    });

    it("should use default temperature and maxTokens", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      await chatAPI.chat(request);

      expect(mockAIService.generateResponse).toHaveBeenCalledWith(
        expect.objectContaining({
          temperature: 0.7,
          max_tokens: 2048,
        }),
      );
    });

    it("should include conversation history in AI request", async () => {
      mockDB.getMessagesByConversationId.mockResolvedValueOnce({
        messages: [
          { role: "user", content: "Previous message" },
          { role: "assistant", content: "Previous response" },
        ],
      });

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "New message",
          conversationId: "conv-123",
        }),
      });

      await chatAPI.chat(request);

      expect(mockAIService.generateResponse).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: [
            { role: "user", content: "Previous message" },
            { role: "assistant", content: "Previous response" },
            { role: "user", content: "New message" },
          ],
        }),
      );
    });

    it("should return 500 when AI generation fails", async () => {
      mockAIService.generateResponse.mockResolvedValueOnce({
        success: false,
        error: "AI service unavailable",
      });

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toContain("AI service unavailable");
    });

    it("should return 500 when AI response is empty", async () => {
      mockAIService.generateResponse.mockResolvedValueOnce({
        success: true,
        response: null,
      });

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(500);
    });
  });

  describe("chat - message storage", () => {
    it("should save user message to database", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "User message",
          conversationId: "conv-123",
        }),
      });

      await chatAPI.chat(request);

      expect(mockDB.createMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          conversation_id: "conv-123",
          user_id: "user-123",
          role: "user",
          content: "User message",
        }),
      );
    });

    it("should save assistant message to database", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      await chatAPI.chat(request);

      expect(mockDB.createMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          role: "assistant",
          content: "AI response message",
          tokens_used: 50,
        }),
      );
    });

    it("should trim user message before saving", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "  Message with spaces  " }),
      });

      await chatAPI.chat(request);

      expect(mockDB.createMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          content: "Message with spaces",
        }),
      );
    });
  });

  describe("chat - credits management", () => {
    it("should deduct credits for free users", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      await chatAPI.chat(request);

      expect(mockDB.updateUser).toHaveBeenCalledWith("user-123", { credits: 9 });
    });

    it("should not deduct credits for paid users", async () => {
      mockAuthService.getUserFromClerkId.mockResolvedValueOnce({
        ...mockUser,
        subscription_tier: "pro",
      });

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      await chatAPI.chat(request);

      expect(mockDB.updateUser).not.toHaveBeenCalled();
    });

    it("should not allow negative credits", async () => {
      mockAuthService.getUserFromClerkId.mockResolvedValueOnce({
        ...mockUser,
        credits: 0,
      });

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);
      expect(response.status).toBe(402);
    });
  });

  describe("chat - WebSocket broadcasting", () => {
    it("should broadcast message to WebSocket room", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({
          message: "Hello",
          conversationId: "conv-123",
        }),
      });

      await chatAPI.chat(request);

      expect(mockWebSocketBroadcaster.broadcast).toHaveBeenCalledWith(
        "conv-123",
        expect.objectContaining({
          type: "message",
          conversationId: "conv-123",
          userId: "user-123",
          message: expect.objectContaining({
            role: "assistant",
            content: "AI response message",
          }),
        }),
      );
    });

    it("should not fail request if WebSocket broadcast fails", async () => {
      mockWebSocketBroadcaster.broadcast.mockRejectedValueOnce(new Error("Broadcast failed"));

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(200);
      expect(mockLogger.error).toHaveBeenCalledWith(
        "WebSocket broadcast error",
        expect.any(Error),
      );
    });
  });

  describe("chat - response formatting", () => {
    it("should return successful response with message", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.message).toBeDefined();
      expect(body.data.conversationId).toBeDefined();
      expect(body.data.tokensUsed).toBe(50);
    });

    it("should include conversation ID in response", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);
      const body = await response.json();

      expect(body.data.conversationId).toBe("conv-123");
    });

    it("should set correct content-type header", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);

      expect(response.headers.get("Content-Type")).toBe("application/json");
    });
  });

  describe("chat - logging", () => {
    it("should log debug information during processing", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      await chatAPI.chat(request);

      expect(mockLogger.debug).toHaveBeenCalledWith(
        "Generating AI response",
        expect.objectContaining({ model: expect.any(String), messageCount: 1 }),
      );
    });

    it("should log successful AI response generation", async () => {
      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      await chatAPI.chat(request);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "AI response generated successfully",
        expect.objectContaining({ tokensUsed: 50 }),
      );
    });

    it("should log rate limit warnings", async () => {
      mockRateLimiter.checkLimit.mockResolvedValueOnce(false);

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
        headers: { "cf-connecting-ip": "1.2.3.4" },
      });

      await chatAPI.chat(request);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        "Rate limit exceeded",
        expect.objectContaining({ clientIP: "1.2.3.4" }),
      );
    });

    it("should log errors with context", async () => {
      mockAIService.generateResponse.mockRejectedValueOnce(new Error("AI error"));

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      await chatAPI.chat(request);

      expect(mockLogger.error).toHaveBeenCalledWith(
        "Chat API error",
        expect.any(Error),
      );
    });
  });

  describe("chat - error handling", () => {
    it("should catch and handle unexpected errors", async () => {
      mockDB.createMessage.mockRejectedValueOnce(new Error("Database error"));

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toBe("Internal server error");
    });

    it("should handle authentication service errors", async () => {
      mockAuthService.verifyRequest.mockRejectedValueOnce(new Error("Auth error"));

      const request = new Request("https://api.example.com/chat", {
        method: "POST",
        body: JSON.stringify({ message: "Hello" }),
      });

      const response = await chatAPI.chat(request);

      expect(response.status).toBe(500);
    });
  });
});
