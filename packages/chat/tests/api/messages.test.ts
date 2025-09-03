import { describe, it, expect, beforeEach, vi } from "vitest";
import { MessagesAPI } from "../../src/api/messages";
import type { Env } from "../../src/types";

describe("MessagesAPI", () => {
  let api: MessagesAPI;
  let mockEnv: Env;

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
      vi.spyOn(api as any, "auth").verifyRequest = vi.fn().mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      vi.spyOn(api as any, "auth").getUserFromClerkId = vi.fn().mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      vi.spyOn(api as any, "auth").checkUserCredits = vi.fn().mockResolvedValue(true);
      vi.spyOn(api as any, "auth").deductCredits = vi.fn().mockResolvedValue(undefined);

      // Mock AI
      vi.spyOn(api as any, "ai").moderateContent = vi.fn().mockResolvedValue(true);
      vi.spyOn(api as any, "ai").generateResponse = vi.fn().mockResolvedValue("Hello! How can I help you?");
      vi.spyOn(api as any, "ai").countTokens = vi.fn().mockResolvedValue(10);
      vi.spyOn(api as any, "ai").generateTitle = vi.fn().mockResolvedValue("AI Chat");

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

      vi.spyOn(api as any, "auth").verifyRequest = vi.fn().mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      vi.spyOn(api as any, "auth").getUserFromClerkId = vi.fn().mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      vi.spyOn(api as any, "auth").checkUserCredits = vi.fn().mockResolvedValue(false);

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

      vi.spyOn(api as any, "auth").verifyRequest = vi.fn().mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      vi.spyOn(api as any, "auth").getUserFromClerkId = vi.fn().mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      vi.spyOn(api as any, "auth").checkUserCredits = vi.fn().mockResolvedValue(true);
      vi.spyOn(api as any, "ai").moderateContent = vi.fn().mockResolvedValue(false);

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        id: "conv-123",
        user_id: "user-1",
      });

      const response = await api.send(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Content violates our usage policy");
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

      vi.spyOn(api as any, "auth").verifyRequest = vi.fn().mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      vi.spyOn(api as any, "auth").getUserFromClerkId = vi.fn().mockResolvedValue({
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

      vi.spyOn(api as any, "auth").verifyRequest = vi.fn().mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      vi.spyOn(api as any, "auth").getUserFromClerkId = vi.fn().mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      vi.spyOn(api as any, "auth").checkUserCredits = vi.fn().mockResolvedValue(true);
      vi.spyOn(api as any, "auth").deductCredits = vi.fn().mockResolvedValue(undefined);

      vi.spyOn(api as any, "ai").generateResponse = vi.fn().mockResolvedValue("Regenerated response");
      vi.spyOn(api as any, "ai").countTokens = vi.fn().mockResolvedValue(15);

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
  });
});