import { describe, it, expect, beforeEach, vi } from "vitest";
import worker from "../../src/worker/index";
import type { Env } from "../../src/types";

describe("Worker", () => {
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
      R2_BUCKET: {} as any,
      KV_STORE: {} as any,
      QUEUE: {} as any,
      CHAT_ROOM: {
        idFromName: vi.fn().mockReturnValue("room-id"),
        get: vi.fn().mockReturnValue({
          fetch: vi.fn().mockResolvedValue(new Response("OK", { status: 101 })),
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

      vi.mock("../../src/api/conversations", () => ({
        ConversationsAPI: vi.fn().mockImplementation(() => ({
          list: vi.fn().mockResolvedValue(new Response("{}", { status: 200 })),
        })),
      }));

      const response = await worker.fetch(request, mockEnv);

      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });
  });

  describe("Route handling", () => {
    it("should route to conversations API for GET /api/conversations", async () => {
      const mockList = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true, data: [] }), { status: 200 })
      );

      vi.mock("../../src/api/conversations", () => ({
        ConversationsAPI: vi.fn().mockImplementation(() => ({
          list: mockList,
        })),
      }));

      const request = new Request("http://localhost/api/conversations", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
    });

    it("should route to messages API for POST /api/messages", async () => {
      const mockSend = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 })
      );

      vi.mock("../../src/api/messages", () => ({
        MessagesAPI: vi.fn().mockImplementation(() => ({
          send: mockSend,
        })),
      }));

      const request = new Request("http://localhost/api/messages", {
        method: "POST",
        body: JSON.stringify({ conversationId: "123", content: "test" }),
      });

      const response = await worker.fetch(request, mockEnv);

      expect(response.status).toBe(200);
    });

    it("should handle webhook routes", async () => {
      vi.mock("../../src/webhooks/clerk", () => ({
        handleClerkWebhook: vi.fn().mockResolvedValue(
          new Response("OK", { status: 200 })
        ),
      }));

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
  });

  describe("User profile endpoint", () => {
    it("should get user profile for authenticated request", async () => {
      const mockVerifyRequest = vi.fn().mockResolvedValue({
        userId: "user-1",
        clerkId: "clerk-1",
      });

      const mockGetUserFromClerkId = vi.fn().mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
        name: "Test User",
      });

      vi.mock("../../src/utils/auth", () => ({
        AuthService: vi.fn().mockImplementation(() => ({
          verifyRequest: mockVerifyRequest,
          getUserFromClerkId: mockGetUserFromClerkId,
        })),
      }));

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
      vi.mock("../../src/utils/auth", () => ({
        AuthService: vi.fn().mockImplementation(() => ({
          verifyRequest: vi.fn().mockResolvedValue(null),
        })),
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
      vi.mock("../../src/api/conversations", () => ({
        ConversationsAPI: vi.fn().mockImplementation(() => ({
          list: vi.fn().mockRejectedValue(new Error("Database error")),
        })),
      }));

      const request = new Request("http://localhost/api/conversations", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Internal server error");
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
});