import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Env } from "../../src/types";
import worker from "../../src/worker/index";

// Mock modules at the top level
vi.mock("../../src/api/conversations", () => ({
  ConversationsAPI: vi.fn().mockImplementation(() => ({
    list: vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: [] }), { status: 200 }),
    ),
    create: vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: {} }), { status: 200 }),
    ),
    get: vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: {} }), { status: 200 }),
    ),
    delete: vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    ),
    updateTitle: vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    ),
  })),
}));

vi.mock("../../src/api/messages", () => ({
  MessagesAPI: vi.fn().mockImplementation(() => ({
    send: vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    ),
    list: vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: [] }), { status: 200 }),
    ),
    regenerate: vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    ),
  })),
}));

vi.mock("../../src/webhooks/clerk", () => ({
  handleClerkWebhook: vi.fn().mockResolvedValue(
    new Response("OK", { status: 200 }),
  ),
}));

vi.mock("../../src/webhooks/stripe", () => ({
  handleStripeWebhook: vi.fn().mockResolvedValue(
    new Response("OK", { status: 200 }),
  ),
}));

vi.mock("../../src/utils/auth", () => ({
  AuthService: vi.fn().mockImplementation(() => ({
    verifyRequest: vi.fn().mockResolvedValue(null),
    getUserFromClerkId: vi.fn().mockResolvedValue(null),
  })),
}));

describe("Worker", () => {
  let mockEnv: Env;

  beforeEach(() => {
    vi.clearAllMocks();
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
      CHAT_ROOM: {
        idFromName: vi.fn().mockReturnValue("room-id"),
        get: vi.fn().mockReturnValue({
          fetch: vi.fn().mockResolvedValue(
            new Response(null, { status: 200 }),
          ),
        }),
      } as any,
      AI: {} as any,
      CLERK_SECRET_KEY: "test-clerk-key",
      CLERK_WEBHOOK_SECRET: "test-webhook-secret",
      STRIPE_SECRET_KEY: "test-stripe-key",
      STRIPE_WEBHOOK_SECRET: "test-webhook-secret",
      STRIPE_PRICE_ID_PRO: "price_pro",
      STRIPE_PRICE_ID_BUSINESS: "price_business",
      JWT_SECRET: "test-jwt-secret",
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("CORS handling", () => {
    it("should handle OPTIONS requests", async () => {
      const request = new Request("http://localhost/api/conversations", {
        method: "OPTIONS",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(204);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toContain("GET");
      expect(response.headers.get("Access-Control-Allow-Methods")).toContain("POST");
    });

    it("should add CORS headers to responses", async () => {
      const request = new Request("http://localhost/api/conversations", {
        method: "GET",
        headers: {
          Authorization: "Bearer token",
        },
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });
  });

  describe("Route handling", () => {
    it("should route to conversations API for GET /api/conversations", async () => {
      const request = new Request("http://localhost/api/conversations", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
    });

    it("should route to messages API for POST /api/messages", async () => {
      const request = new Request("http://localhost/api/messages", {
        method: "POST",
        body: JSON.stringify({ conversationId: "123", content: "test" }),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
    });

    it("should handle webhook routes", async () => {
      const request = new Request("http://localhost/api/webhooks/clerk", {
        method: "POST",
        body: JSON.stringify({ type: "user.created" }),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
    });

    it("should handle WebSocket upgrade for /ws/ routes", async () => {
      const request = new Request("http://localhost/ws/conv-123", {
        headers: {
          Upgrade: "websocket",
        },
      });

      const response = await worker.fetch(request, mockEnv);

      expect(mockEnv.CHAT_ROOM.idFromName).toHaveBeenCalledWith("conv-123");
      expect(mockEnv.CHAT_ROOM.get).toHaveBeenCalled();
    });

    it("should return 404 for unknown routes", async () => {
      const request = new Request("http://localhost/unknown/route");

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(404);
      expect(await response.text()).toBe("Not found");
    });

    it("should serve HTML at root path", async () => {
      const request = new Request("http://localhost/");

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/html; charset=utf-8");

      const html = await response.text();
      expect(html).toContain("<!DOCTYPE html>");
      expect(html).toContain("AI Chat Assistant");
      expect(html).toContain("API Status: Online");
    });

    it("should serve HTML at empty path", async () => {
      const request = new Request("http://localhost");

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/html; charset=utf-8");
    });
  });

  describe("User profile endpoint", () => {
    it("should get user profile for authenticated request", async () => {
      // Create a new mock instance with the needed methods
      const mockAuthInstance = {
        verifyRequest: vi.fn().mockResolvedValue({
          userId: "user-1",
          clerkId: "clerk-1",
        }),
        getUserFromClerkId: vi.fn().mockResolvedValue({
          id: "user-1",
          email: "test@example.com",
          name: "Test User",
        }),
      };

      // Override the mock to return our instance
      const { AuthService } = await import("../../src/utils/auth");
      (AuthService as any).mockImplementation(() => mockAuthInstance);

      const request = new Request("http://localhost/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: "Bearer valid-token",
        },
      });

      const response = await worker.fetch(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it("should return 401 for unauthenticated profile request", async () => {
      // Ensure AuthService returns null for unauthenticated requests
      const { AuthService } = await import("../../src/utils/auth");
      (AuthService as any).mockImplementation(() => ({
        verifyRequest: vi.fn().mockResolvedValue(null),
        getUserFromClerkId: vi.fn().mockResolvedValue(null),
      }));

      const request = new Request("http://localhost/api/user/profile", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(401);
    });
  });

  describe("Error handling", () => {
    it("should handle errors gracefully", async () => {
      // Create a mock that throws an error
      const mockConversationsInstance = {
        list: vi.fn().mockRejectedValue(new Error("Database error")),
      };

      const { ConversationsAPI } = await import("../../src/api/conversations");
      (ConversationsAPI as any).mockImplementation(() => mockConversationsInstance);

      const request = new Request("http://localhost/api/conversations", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Internal server error");
    });

    it("should handle invalid JSON in request body", async () => {
      // Create a mock that throws an error when parsing invalid JSON
      const mockConversationsInstance = {
        create: vi.fn().mockImplementation(async (req: Request) => {
          try {
            await req.json(); // This will throw for invalid JSON
          } catch {
            throw new Error("Invalid JSON");
          }
          return new Response(JSON.stringify({ success: true }), { status: 200 });
        }),
      };

      const { ConversationsAPI } = await import("../../src/api/conversations");
      (ConversationsAPI as any).mockImplementation(() => mockConversationsInstance);

      const request = new Request("http://localhost/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "invalid-json",
      });

      const response = await worker.fetch(request, mockEnv);

      // The error will be caught and a 500 returned
      expect(response.status).toBe(500);
    });
  });

  describe("Queue processing", () => {
    it("should process queue messages", async () => {
      const mockMessage = {
        body: { test: "data" },
        ack: vi.fn(),
        retry: vi.fn(),
      };

      const batch = {
        messages: [mockMessage],
      } as any;

      await worker.queue(batch, mockEnv);

      expect(mockMessage.ack).toHaveBeenCalled();
    });

    it("should retry failed queue messages", async () => {
      const mockMessage = {
        body: { test: "data" },
        ack: vi.fn().mockImplementation(() => {
          throw new Error("Processing failed");
        }),
        retry: vi.fn(),
      };

      const batch = {
        messages: [mockMessage],
      } as any;

      await worker.queue(batch, mockEnv);

      expect(mockMessage.retry).toHaveBeenCalled();
    });
  });

  describe("Helper methods", () => {
    it("should add CORS headers to responses", () => {
      const originalResponse = new Response("test", {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });

      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
      };

      const newResponse = worker.addCorsHeaders(originalResponse, corsHeaders);

      expect(newResponse.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(newResponse.headers.get("Access-Control-Allow-Methods")).toBe("GET, POST");
      expect(newResponse.headers.get("Content-Type")).toBe("text/plain");
    });
  });

  describe("Conversation endpoints", () => {
    it("should handle GET /api/conversations/:id", async () => {
      // Set up the mock to return successful responses
      const { ConversationsAPI } = await import("../../src/api/conversations");
      (ConversationsAPI as any).mockImplementation(() => ({
        get: vi.fn().mockResolvedValue(
          new Response(
            JSON.stringify({ success: true, data: { conversation: {}, messages: [] } }),
            { status: 200 },
          ),
        ),
      }));

      const request = new Request("http://localhost/api/conversations/conv-123", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
    });

    it("should handle DELETE /api/conversations/:id", async () => {
      // Set up the mock to return successful responses
      const { ConversationsAPI } = await import("../../src/api/conversations");
      (ConversationsAPI as any).mockImplementation(() => ({
        delete: vi.fn().mockResolvedValue(
          new Response(JSON.stringify({ success: true }), { status: 200 }),
        ),
      }));

      const request = new Request("http://localhost/api/conversations/conv-123", {
        method: "DELETE",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
    });

    it("should handle PUT /api/conversations/:id", async () => {
      // Set up the mock to return successful responses
      const { ConversationsAPI } = await import("../../src/api/conversations");
      (ConversationsAPI as any).mockImplementation(() => ({
        updateTitle: vi.fn().mockResolvedValue(
          new Response(JSON.stringify({ success: true }), { status: 200 }),
        ),
      }));

      const request = new Request("http://localhost/api/conversations/conv-123", {
        method: "PUT",
        body: JSON.stringify({ title: "New Title" }),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
    });
  });

  describe("Message endpoints", () => {
    it("should handle GET /api/messages/:conversationId", async () => {
      const request = new Request("http://localhost/api/messages/conv-123", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
    });

    it("should handle POST /api/messages/:id/regenerate", async () => {
      const request = new Request("http://localhost/api/messages/msg-123/regenerate", {
        method: "POST",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
    });
  });

  describe("Stripe webhook", () => {
    it("should handle Stripe webhook", async () => {
      const request = new Request("http://localhost/api/webhooks/stripe", {
        method: "POST",
        body: JSON.stringify({ type: "payment_intent.succeeded" }),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
    });
  });
});
