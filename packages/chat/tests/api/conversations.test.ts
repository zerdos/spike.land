import { describe, it, expect, beforeEach, vi } from "vitest";
import { ConversationsAPI } from "../../src/api/conversations";
import type { Env } from "../../src/types";

describe("ConversationsAPI", () => {
  let api: ConversationsAPI;
  let mockEnv: Env;
  let mockRequest: Request;

  beforeEach(() => {
    mockEnv = {
      DATABASE: {
        prepare: vi.fn().mockReturnThis(),
        bind: vi.fn().mockReturnThis(),
        all: vi.fn(),
        first: vi.fn(),
        run: vi.fn(),
      } as any,
      R2_BUCKET: {} as any,
      KV_STORE: {} as any,
      QUEUE: {} as any,
      CHAT_ROOM: {} as any,
      AI: {} as any,
      CLERK_SECRET_KEY: "test-key",
      CLERK_WEBHOOK_SECRET: "test-webhook-secret",
      STRIPE_SECRET_KEY: "test-stripe-key",
      STRIPE_WEBHOOK_SECRET: "test-stripe-webhook-secret",
      STRIPE_PRICE_ID_PRO: "price_pro",
      STRIPE_PRICE_ID_BUSINESS: "price_business",
      JWT_SECRET: "jwt-secret",
    };

    api = new ConversationsAPI(mockEnv);
  });

  describe("list", () => {
    it("should return unauthorized if no auth token", async () => {
      mockRequest = new Request("http://localhost/api/conversations", {
        method: "GET",
      });

      const response = await api.list(mockRequest);
      expect(response.status).toBe(401);
    });

    it("should return conversations for authenticated user", async () => {
      mockRequest = new Request("http://localhost/api/conversations", {
        method: "GET",
        headers: {
          Authorization: "Bearer valid-token",
        },
      });

      const mockConversations = [
        {
          id: "conv-1",
          user_id: "user-1",
          title: "Test Conversation",
          model: "llama-2-7b",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
      ];

      vi.spyOn(api as any, "auth").verifyRequest = vi.fn().mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      vi.spyOn(api as any, "auth").getUserFromClerkId = vi.fn().mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
      });

      mockEnv.DATABASE.all = vi.fn().mockResolvedValue({
        results: mockConversations,
      });

      const response = await api.list(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockConversations);
    });
  });

  describe("create", () => {
    it("should create a new conversation", async () => {
      mockRequest = new Request("http://localhost/api/conversations", {
        method: "POST",
        headers: {
          Authorization: "Bearer valid-token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "New Chat",
          model: "mistral-7b",
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

      const mockConversation = {
        id: "new-conv-id",
        user_id: "user-1",
        title: "New Chat",
        model: "mistral-7b",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      mockEnv.DATABASE.run = vi.fn().mockResolvedValue({ success: true });
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(mockConversation);

      const response = await api.create(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.title).toBe("New Chat");
      expect(data.data.model).toBe("mistral-7b");
    });
  });

  describe("get", () => {
    it("should get conversation with messages", async () => {
      const conversationId = "conv-123";
      mockRequest = new Request(`http://localhost/api/conversations/${conversationId}`, {
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

      const mockConversation = {
        id: conversationId,
        user_id: "user-1",
        title: "Test Conversation",
        model: "llama-2-7b",
      };

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

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(mockConversation);
      mockEnv.DATABASE.all = vi.fn().mockResolvedValue({ results: mockMessages });

      const response = await api.get(mockRequest, conversationId);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.conversation).toEqual(mockConversation);
      expect(data.data.messages).toEqual(mockMessages);
    });

    it("should return 404 if conversation not found", async () => {
      const conversationId = "non-existent";
      mockRequest = new Request(`http://localhost/api/conversations/${conversationId}`, {
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

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(null);

      const response = await api.get(mockRequest, conversationId);
      expect(response.status).toBe(404);
    });
  });

  describe("delete", () => {
    it("should delete a conversation", async () => {
      const conversationId = "conv-to-delete";
      mockRequest = new Request(`http://localhost/api/conversations/${conversationId}`, {
        method: "DELETE",
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

      mockEnv.DATABASE.run = vi.fn().mockResolvedValue({
        meta: { changes: 1 },
      });

      const response = await api.delete(mockRequest, conversationId);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe("Conversation deleted successfully");
    });

    it("should return 404 if conversation not found for deletion", async () => {
      const conversationId = "non-existent";
      mockRequest = new Request(`http://localhost/api/conversations/${conversationId}`, {
        method: "DELETE",
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

      mockEnv.DATABASE.run = vi.fn().mockResolvedValue({
        meta: { changes: 0 },
      });

      const response = await api.delete(mockRequest, conversationId);
      expect(response.status).toBe(404);
    });
  });
});