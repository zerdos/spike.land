import { beforeEach, describe, expect, it, vi } from "vitest";
import { MessagesAPI } from "../../src/api/messages";
import type { Env } from "../../src/types";

vi.mock("../../src/utils/auth", () => ({
  AuthService: vi.fn().mockImplementation(() => ({
    verifyRequest: vi.fn(),
    getUserFromClerkId: vi.fn(),
    checkUserCredits: vi.fn(),
    deductCredits: vi.fn(),
    addCredits: vi.fn(),
    updateSubscription: vi.fn(),
    createOrUpdateUser: vi.fn(),
  })),
}));

vi.mock("../../src/utils/ai", () => ({
  AIService: vi.fn().mockImplementation(() => ({
    generateResponse: vi.fn(),
    countTokens: vi.fn(),
    moderateContent: vi.fn(),
    generateTitle: vi.fn(),
    summarizeConversation: vi.fn(),
    extractKeywords: vi.fn(),
  })),
}));

describe("MessagesAPI", () => {
  let api: MessagesAPI;
  let mockEnv: Env;
  let mockAuth: any;
  let mockAI: any;

  beforeEach(() => {
    mockEnv = {
      DATABASE: {
        prepare: vi.fn().mockReturnThis(),
        bind: vi.fn().mockReturnThis(),
        all: vi.fn(),
        first: vi.fn(),
        run: vi.fn(),
      } as any,
      R2_BUCKET: {
        put: vi.fn(),
      } as any,
      KV_STORE: {} as any,
      QUEUE: {} as any,
      CHAT_ROOM: {
        idFromName: vi.fn().mockReturnValue("room-id"),
        get: vi.fn().mockReturnValue({
          fetch: vi.fn().mockResolvedValue(new Response("OK")),
        }),
      } as any,
      AI: {
        run: vi.fn(),
      } as any,
      CLERK_SECRET_KEY: "test-key",
      CLERK_WEBHOOK_SECRET: "test-webhook-secret",
      STRIPE_SECRET_KEY: "test-stripe-key",
      STRIPE_WEBHOOK_SECRET: "test-stripe-webhook-secret",
      STRIPE_PRICE_ID_PRO: "price_pro",
      STRIPE_PRICE_ID_BUSINESS: "price_business",
      JWT_SECRET: "jwt-secret",
    };

    api = new MessagesAPI(mockEnv);
    mockAuth = (api as any).auth;
    mockAI = (api as any).ai;
  });

  describe("send", () => {
    it("should send a message and get AI response", async () => {
      const mockRequest = new Request("http://localhost/api/messages", {
        method: "POST",
        headers: {
          Authorization: "Bearer valid-token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: "conv-123",
          content: "Hello AI!",
        }),
      });

      // Mock auth
      mockAuth.verifyRequest.mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      mockAuth.getUserFromClerkId.mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      mockAuth.checkUserCredits.mockResolvedValue(true);
      mockAuth.deductCredits.mockResolvedValue(undefined);

      // Mock AI
      mockAI.moderateContent.mockResolvedValue(true);
      mockAI.generateResponse.mockResolvedValue("Hello! How can I help you?");
      mockAI.countTokens.mockResolvedValue(10);
      mockAI.generateTitle.mockResolvedValue("AI Chat");

      // Mock database
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        id: "conv-123",
        user_id: "user-1",
        title: "New Conversation",
        model: "llama-2-7b",
      });

      mockEnv.DATABASE.all = vi.fn().mockResolvedValue({
        results: [
          { role: "user", content: "Hello AI!" },
        ],
      });

      mockEnv.DATABASE.run = vi.fn().mockResolvedValue({ success: true });

      const response = await api.send(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.role).toBe("assistant");
      expect(data.data.content).toBe("Hello! How can I help you?");
      expect(data.data.tokens_used).toBe(10);
    });

    it("should return 402 if insufficient credits", async () => {
      const mockRequest = new Request("http://localhost/api/messages", {
        method: "POST",
        headers: {
          Authorization: "Bearer valid-token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: "conv-123",
          content: "Hello AI!",
        }),
      });

      mockAuth.verifyRequest.mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      mockAuth.getUserFromClerkId.mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      mockAuth.checkUserCredits.mockResolvedValue(false);

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        id: "conv-123",
        user_id: "user-1",
      });

      const response = await api.send(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(402);
      expect(data.error).toBe("Insufficient credits");
    });

    it("should reject unsafe content", async () => {
      const mockRequest = new Request("http://localhost/api/messages", {
        method: "POST",
        headers: {
          Authorization: "Bearer valid-token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: "conv-123",
          content: "Unsafe content here",
        }),
      });

      mockAuth.verifyRequest.mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      mockAuth.getUserFromClerkId.mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      mockAuth.checkUserCredits.mockResolvedValue(true);
      mockAI.moderateContent.mockResolvedValue(false);

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        id: "conv-123",
        user_id: "user-1",
      });

      const response = await api.send(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Content violates our usage policy");
    });

    it("should handle missing fields", async () => {
      const mockRequest = new Request("http://localhost/api/messages", {
        method: "POST",
        headers: {
          Authorization: "Bearer valid-token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "Hello AI!",
        }),
      });

      mockAuth.verifyRequest.mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      mockAuth.getUserFromClerkId.mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      const response = await api.send(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Missing required fields");
    });
  });

  describe("list", () => {
    it("should list messages for a conversation", async () => {
      const conversationId = "conv-123";
      const mockRequest = new Request(`http://localhost/api/messages/${conversationId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer valid-token",
        },
      });

      mockAuth.verifyRequest.mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      mockAuth.getUserFromClerkId.mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        id: conversationId,
        user_id: "user-1",
      });

      const mockMessages = [
        {
          id: "msg-1",
          conversation_id: conversationId,
          user_id: "user-1",
          role: "user",
          content: "Hello",
          created_at: "2024-01-01T00:00:00Z",
        },
        {
          id: "msg-2",
          conversation_id: conversationId,
          user_id: "user-1",
          role: "assistant",
          content: "Hi there!",
          created_at: "2024-01-01T00:01:00Z",
        },
      ];

      mockEnv.DATABASE.all = vi.fn().mockResolvedValue({
        results: mockMessages.slice().reverse(),
      });

      const response = await api.list(mockRequest, conversationId);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2);
      expect(data.data[0].role).toBe("user");
      expect(data.data[1].role).toBe("assistant");
    });

    it("should handle pagination parameters", async () => {
      const conversationId = "conv-123";
      const mockRequest = new Request(
        `http://localhost/api/messages/${conversationId}?limit=10&offset=5`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer valid-token",
          },
        },
      );

      mockAuth.verifyRequest.mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      mockAuth.getUserFromClerkId.mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        id: conversationId,
        user_id: "user-1",
      });

      mockEnv.DATABASE.all = vi.fn().mockResolvedValue({
        results: [],
      });

      const response = await api.list(mockRequest, conversationId);

      expect(mockEnv.DATABASE.bind).toHaveBeenCalledWith(conversationId, 10, 5);
      expect(response.status).toBe(200);
    });
  });

  describe("regenerate", () => {
    it("should regenerate an assistant message", async () => {
      const messageId = "msg-123";
      const mockRequest = new Request(`http://localhost/api/messages/${messageId}/regenerate`, {
        method: "POST",
        headers: {
          Authorization: "Bearer valid-token",
        },
      });

      mockAuth.verifyRequest.mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      mockAuth.getUserFromClerkId.mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      mockAuth.checkUserCredits.mockResolvedValue(true);
      mockAuth.deductCredits.mockResolvedValue(undefined);

      mockAI.generateResponse.mockResolvedValue("Regenerated response");
      mockAI.countTokens.mockResolvedValue(15);

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        id: messageId,
        conversation_id: "conv-123",
        user_id: "user-1",
        role: "assistant",
        model: "llama-2-7b",
      });

      mockEnv.DATABASE.all = vi.fn().mockResolvedValue({
        results: [
          { role: "user", content: "Tell me a joke" },
        ],
      });

      mockEnv.DATABASE.run = vi.fn().mockResolvedValue({ success: true });

      const response = await api.regenerate(mockRequest, messageId);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.content).toBe("Regenerated response");
      expect(data.data.tokens_used).toBe(15);
    });

    it("should return 404 if message not found", async () => {
      const messageId = "non-existent";
      const mockRequest = new Request(`http://localhost/api/messages/${messageId}/regenerate`, {
        method: "POST",
        headers: {
          Authorization: "Bearer valid-token",
        },
      });

      mockAuth.verifyRequest.mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      mockAuth.getUserFromClerkId.mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(null);

      const response = await api.regenerate(mockRequest, messageId);
      expect(response.status).toBe(404);
    });

    it("should not regenerate user messages", async () => {
      const messageId = "msg-user";
      const mockRequest = new Request(`http://localhost/api/messages/${messageId}/regenerate`, {
        method: "POST",
        headers: {
          Authorization: "Bearer valid-token",
        },
      });

      mockAuth.verifyRequest.mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      mockAuth.getUserFromClerkId.mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      // The SQL query filters for role='assistant', so a user message should return null
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(null);

      const response = await api.regenerate(mockRequest, messageId);
      expect(response.status).toBe(404);
    });
  });
});
