import { describe, it, expect, beforeEach, vi } from "vitest";
import { handleClerkWebhook } from "../../src/webhooks/clerk";
import type { Env } from "../../src/types";

vi.mock("svix", () => ({
  Webhook: vi.fn().mockImplementation(() => ({
    verify: vi.fn(),
  })),
}));

describe("handleClerkWebhook", () => {
  let mockEnv: Env;

  beforeEach(() => {
    mockEnv = {
      DATABASE: {
        prepare: vi.fn().mockReturnThis(),
        bind: vi.fn().mockReturnThis(),
        run: vi.fn().mockResolvedValue({ success: true }),
      } as any,
      KV_STORE: {
        put: vi.fn().mockResolvedValue(undefined),
        delete: vi.fn().mockResolvedValue(undefined),
      } as any,
      CLERK_WEBHOOK_SECRET: "test-webhook-secret",
    } as Env;
  });

  describe("user.created event", () => {
    it("should create user on user.created event", async () => {
      const { Webhook } = await import("svix");
      const mockVerify = vi.fn().mockReturnValue({
        type: "user.created",
        data: {
          id: "clerk-user-123",
          email_addresses: [
            { email_address: "test@example.com" },
          ],
          first_name: "John",
          last_name: "Doe",
        },
      });
      (Webhook as any).mockImplementation(() => ({
        verify: mockVerify,
      }));

      const request = new Request("http://localhost/webhooks/clerk", {
        method: "POST",
        headers: {
          "svix-id": "msg-123",
          "svix-timestamp": "1234567890",
          "svix-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: "user.created",
          data: {
            id: "clerk-user-123",
            email_addresses: [
              { email_address: "test@example.com" },
            ],
            first_name: "John",
            last_name: "Doe",
          },
        }),
      });

      const authServiceMock = {
        createOrUpdateUser: vi.fn().mockResolvedValue("user-id"),
      };
      vi.spyOn(await import("../../src/utils/auth"), "AuthService").mockImplementation(
        () => authServiceMock as any
      );

      const response = await handleClerkWebhook(request, mockEnv);

      expect(response.status).toBe(200);
      expect(authServiceMock.createOrUpdateUser).toHaveBeenCalledWith({
        clerk_id: "clerk-user-123",
        email: "test@example.com",
        name: "John Doe",
      });
    });
  });

  describe("user.deleted event", () => {
    it("should delete user on user.deleted event", async () => {
      const { Webhook } = await import("svix");
      const mockVerify = vi.fn().mockReturnValue({
        type: "user.deleted",
        data: {
          id: "clerk-user-123",
        },
      });
      (Webhook as any).mockImplementation(() => ({
        verify: mockVerify,
      }));

      const request = new Request("http://localhost/webhooks/clerk", {
        method: "POST",
        headers: {
          "svix-id": "msg-123",
          "svix-timestamp": "1234567890",
          "svix-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: "user.deleted",
          data: {
            id: "clerk-user-123",
          },
        }),
      });

      const response = await handleClerkWebhook(request, mockEnv);

      expect(response.status).toBe(200);
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        "DELETE FROM users WHERE clerk_id = ?"
      );
      expect(mockEnv.DATABASE.bind).toHaveBeenCalledWith("clerk-user-123");
    });
  });

  describe("session events", () => {
    it("should cache session on session.created", async () => {
      const { Webhook } = await import("svix");
      const mockVerify = vi.fn().mockReturnValue({
        type: "session.created",
        data: {
          id: "session-123",
          user_id: "user-123",
          created_at: 1234567890,
          expire_at: 1234654290,
        },
      });
      (Webhook as any).mockImplementation(() => ({
        verify: mockVerify,
      }));

      const request = new Request("http://localhost/webhooks/clerk", {
        method: "POST",
        headers: {
          "svix-id": "msg-123",
          "svix-timestamp": "1234567890",
          "svix-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: "session.created",
          data: {
            id: "session-123",
            user_id: "user-123",
            created_at: 1234567890,
            expire_at: 1234654290,
          },
        }),
      });

      const response = await handleClerkWebhook(request, mockEnv);

      expect(response.status).toBe(200);
      expect(mockEnv.KV_STORE.put).toHaveBeenCalledWith(
        "session:session-123",
        expect.stringContaining("user-123"),
        { expirationTtl: 86400 }
      );
    });

    it("should delete cached session on session.ended", async () => {
      const { Webhook } = await import("svix");
      const mockVerify = vi.fn().mockReturnValue({
        type: "session.ended",
        data: {
          id: "session-123",
        },
      });
      (Webhook as any).mockImplementation(() => ({
        verify: mockVerify,
      }));

      const request = new Request("http://localhost/webhooks/clerk", {
        method: "POST",
        headers: {
          "svix-id": "msg-123",
          "svix-timestamp": "1234567890",
          "svix-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: "session.ended",
          data: {
            id: "session-123",
          },
        }),
      });

      const response = await handleClerkWebhook(request, mockEnv);

      expect(response.status).toBe(200);
      expect(mockEnv.KV_STORE.delete).toHaveBeenCalledWith("session:session-123");
    });
  });

  describe("error handling", () => {
    it("should return 400 for invalid signature", async () => {
      const { Webhook } = await import("svix");
      const mockVerify = vi.fn().mockImplementation(() => {
        throw new Error("Invalid signature");
      });
      (Webhook as any).mockImplementation(() => ({
        verify: mockVerify,
      }));

      const request = new Request("http://localhost/webhooks/clerk", {
        method: "POST",
        headers: {
          "svix-id": "msg-123",
          "svix-timestamp": "1234567890",
          "svix-signature": "invalid-signature",
        },
        body: JSON.stringify({ type: "test" }),
      });

      const response = await handleClerkWebhook(request, mockEnv);

      expect(response.status).toBe(400);
      expect(await response.text()).toBe("Invalid signature");
    });

    it("should handle unknown event types gracefully", async () => {
      const { Webhook } = await import("svix");
      const mockVerify = vi.fn().mockReturnValue({
        type: "unknown.event",
        data: {},
      });
      (Webhook as any).mockImplementation(() => ({
        verify: mockVerify,
      }));

      const request = new Request("http://localhost/webhooks/clerk", {
        method: "POST",
        headers: {
          "svix-id": "msg-123",
          "svix-timestamp": "1234567890",
          "svix-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: "unknown.event",
          data: {},
        }),
      });

      const response = await handleClerkWebhook(request, mockEnv);

      expect(response.status).toBe(200);
    });
  });
});