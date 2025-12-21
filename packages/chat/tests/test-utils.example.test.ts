/**
 * Example test file demonstrating usage of test utilities
 * This file shows common patterns for testing the chat package
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Env, User } from "../src/types";
import {
  createMockAIService,
  createMockAuthService,
  createMockChatEnv,
  createMockConversation,
  createMockMessage,
  createMockPreparedStatement,
  createMockRequest,
  createMockStripe,
  createMockSubscription,
  createMockUser,
  setupWebSocketMocks,
} from "../src/test-utils";

describe("Test Utils Usage Examples", () => {
  let mockEnv: Env;

  beforeEach(() => {
    mockEnv = createMockChatEnv();
  });

  describe("Environment Mocks", () => {
    it("should create mock environment with all required bindings", () => {
      expect(mockEnv.DATABASE).toBeDefined();
      expect(mockEnv.R2_BUCKET).toBeDefined();
      expect(mockEnv.KV_STORE).toBeDefined();
      expect(mockEnv.QUEUE).toBeDefined();
      expect(mockEnv.CHAT_ROOM).toBeDefined();
      expect(mockEnv.AI).toBeDefined();
      expect(mockEnv.CLERK_SECRET_KEY).toBe("test-clerk-secret");
      expect(mockEnv.STRIPE_SECRET_KEY).toBe("test-stripe-secret");
    });

    it("should allow overriding environment values", () => {
      const customEnv = createMockChatEnv({
        CLERK_SECRET_KEY: "custom-clerk-key",
      });

      expect(customEnv.CLERK_SECRET_KEY).toBe("custom-clerk-key");
      expect(customEnv.STRIPE_SECRET_KEY).toBe("test-stripe-secret");
    });
  });

  describe("Database Mocks", () => {
    it("should mock D1 database queries", async () => {
      const mockUser = createMockUser();

      mockEnv.DATABASE.prepare = vi.fn().mockReturnValue(
        createMockPreparedStatement({
          first: mockUser,
        }),
      );

      const stmt = mockEnv.DATABASE.prepare("SELECT * FROM users WHERE id = ?");
      const result = await stmt.bind("user-123").first();

      expect(result).toEqual(mockUser);
    });

    it("should mock D1 database inserts", async () => {
      const mockStatement = createMockPreparedStatement({
        run: { success: true, meta: { changes: 1 } },
      });

      mockEnv.DATABASE.prepare = vi.fn().mockReturnValue(mockStatement);

      const stmt = mockEnv.DATABASE.prepare("INSERT INTO users VALUES (?, ?)");
      const result = await stmt.bind("user-123", "test@example.com").run();

      expect(result.success).toBe(true);
      expect(result.meta?.changes).toBe(1);
    });

    it("should mock D1 database queries with multiple results", async () => {
      const mockMessages = [
        createMockMessage({ id: "msg-1", content: "Hello" }),
        createMockMessage({ id: "msg-2", content: "World" }),
      ];

      mockEnv.DATABASE.prepare = vi.fn().mockReturnValue(
        createMockPreparedStatement({
          all: mockMessages,
        }),
      );

      const stmt = mockEnv.DATABASE.prepare("SELECT * FROM messages");
      const result = await stmt.all();

      expect(result.results).toHaveLength(2);
      expect(result.results[0].content).toBe("Hello");
    });
  });

  describe("Data Model Mocks", () => {
    it("should create mock user with defaults", () => {
      const user = createMockUser();

      expect(user.id).toBeDefined();
      expect(user.email).toBe("test@example.com");
      expect(user.subscription_tier).toBe("free");
      expect(user.credits).toBe(10);
    });

    it("should create mock user with overrides", () => {
      const user = createMockUser({
        email: "custom@example.com",
        subscription_tier: "pro",
        credits: 500,
      });

      expect(user.email).toBe("custom@example.com");
      expect(user.subscription_tier).toBe("pro");
      expect(user.credits).toBe(500);
    });

    it("should create mock conversation", () => {
      const conversation = createMockConversation({
        title: "Custom Title",
        model: "gpt-4",
      });

      expect(conversation.title).toBe("Custom Title");
      expect(conversation.model).toBe("gpt-4");
    });

    it("should create mock message", () => {
      const message = createMockMessage({
        role: "assistant",
        content: "AI response",
      });

      expect(message.role).toBe("assistant");
      expect(message.content).toBe("AI response");
    });

    it("should create mock subscription", () => {
      const subscription = createMockSubscription({
        status: "active",
        stripe_price_id: "price_business_test",
      });

      expect(subscription.status).toBe("active");
      expect(subscription.stripe_price_id).toBe("price_business_test");
    });
  });

  describe("Service Mocks", () => {
    it("should create mock AuthService", async () => {
      const authService = createMockAuthService();

      const authContext = await authService.verifyRequest(
        createMockRequest("http://localhost"),
      );
      expect(authContext?.userId).toBeDefined();

      const user = await authService.getUserFromClerkId("clerk-123");
      expect(user?.email).toBe("test@example.com");

      const hasCredits = await authService.checkUserCredits("user-123", 5);
      expect(hasCredits).toBe(true);
    });

    it("should create mock AIService", async () => {
      const aiService = createMockAIService();

      const response = await aiService.generateResponse({
        model: "llama-2-7b",
        messages: [{ role: "user", content: "Hello" }],
      });
      expect(response).toBe("Test AI response");

      const tokens = await aiService.countTokens("Hello world");
      expect(tokens).toBe(10);

      const isSafe = await aiService.moderateContent("Hello");
      expect(isSafe).toBe(true);
    });

    it("should create mock Stripe client", async () => {
      const stripe = createMockStripe();

      const customer = await stripe.customers.create({
        email: "test@example.com",
      });
      expect(customer.id).toBe("cus_test123");

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: "price_pro_test" }],
      });
      expect(subscription.id).toBe("sub_test123");
    });
  });

  describe("Request Mocks", () => {
    it("should create mock request with default headers", () => {
      const request = createMockRequest("http://localhost/api/conversations");

      expect(request.url).toBe("http://localhost/api/conversations");
      expect(request.headers).toBeDefined();
    });

    it("should create mock request with userId header", () => {
      const request = createMockRequest("http://localhost/websocket", {
        userId: "user-123",
      });

      expect(request.headers.get("X-User-Id")).toBe("user-123");
      expect(request.headers.get("Authorization")).toBe("Bearer test-token");
    });

    it("should create mock request with custom headers", () => {
      const request = createMockRequest("http://localhost/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "Hello" }),
      });

      expect(request.method).toBe("POST");
      expect(request.headers.get("Content-Type")).toBe("application/json");
    });
  });

  describe("WebSocket Mocks", () => {
    beforeEach(() => {
      setupWebSocketMocks();
    });

    it("should setup global WebSocket constants", () => {
      expect(global.WebSocket.READY_STATE_CONNECTING).toBe(0);
      expect(global.WebSocket.READY_STATE_OPEN).toBe(1);
      expect(global.WebSocket.READY_STATE_CLOSING).toBe(2);
      expect(global.WebSocket.READY_STATE_CLOSED).toBe(3);
    });

    it("should create WebSocketPair", () => {
      const [client, server] = new WebSocketPair();

      expect(client).toBeDefined();
      expect(server).toBeDefined();
      expect(client.accept).toBeDefined();
      expect(server.send).toBeDefined();
    });
  });

  describe("Integration Example", () => {
    it("should demonstrate a complete test scenario", async () => {
      const mockUser = createMockUser({
        id: "user-1",
        email: "user@example.com",
        credits: 100,
      });

      const mockConversation = createMockConversation({
        id: "conv-1",
        user_id: "user-1",
        title: "Test Chat",
      });

      mockEnv.DATABASE.prepare = vi.fn().mockReturnValue(
        createMockPreparedStatement({
          first: mockUser,
        }),
      );

      const stmt = mockEnv.DATABASE.prepare("SELECT * FROM users WHERE id = ?");
      const user = (await stmt.bind("user-1").first()) as User;

      expect(user.id).toBe("user-1");
      expect(user.email).toBe("user@example.com");
      expect(user.credits).toBe(100);
    });
  });
});
