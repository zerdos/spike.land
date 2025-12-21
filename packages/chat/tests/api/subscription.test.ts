import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  handleCreatePortalSession,
  handleOptions,
  handleSubscriptionStatus,
} from "../../src/api/subscription";
import type { Env, User } from "../../src/types";

vi.mock("@clerk/backend", () => ({
  getAuth: vi.fn(),
}));

vi.mock("../../src/lib/stripe", () => ({
  createStripeServer: vi.fn(),
}));

describe("Subscription API", () => {
  let mockEnv: Env;
  let mockGetAuth: ReturnType<typeof vi.fn>;
  let mockCreateStripeServer: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    mockEnv = {
      DATABASE: {
        prepare: vi.fn().mockReturnThis(),
        bind: vi.fn().mockReturnThis(),
        all: vi.fn(),
        first: vi.fn(),
        run: vi.fn(),
      } as unknown as D1Database,
      R2_BUCKET: {} as R2Bucket,
      KV_STORE: {} as KVNamespace,
      QUEUE: {} as Queue,
      CHAT_ROOM: {} as DurableObjectNamespace,
      AI: {} as Ai,
      CLERK_SECRET_KEY: "test-clerk-key",
      CLERK_WEBHOOK_SECRET: "test-clerk-webhook-secret",
      STRIPE_SECRET_KEY: "test-stripe-key",
      STRIPE_WEBHOOK_SECRET: "test-stripe-webhook-secret",
      STRIPE_PRICE_ID_PRO: "price_pro",
      STRIPE_PRICE_ID_ENTERPRISE: "price_business",
      JWT_SECRET: "test-jwt-secret",
    };

    const clerkModule = await import("@clerk/backend");
    mockGetAuth = clerkModule.getAuth as ReturnType<typeof vi.fn>;

    const stripeModule = await import("../../src/lib/stripe");
    mockCreateStripeServer = stripeModule.createStripeServer as ReturnType<typeof vi.fn>;

    vi.clearAllMocks();
  });

  describe("handleSubscriptionStatus", () => {
    it("should return 401 when user is not authenticated", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/status", {
        method: "GET",
      });

      mockGetAuth.mockReturnValue({ userId: null });

      const response = await handleSubscriptionStatus(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Unauthorized");
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    it("should return 404 when user is not found in database", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/status", {
        method: "GET",
      });

      mockGetAuth.mockReturnValue({ userId: "clerk-user-123" });
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(null);

      const response = await handleSubscriptionStatus(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe("User not found");
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE clerk_id = ?",
      );
      expect(mockEnv.DATABASE.bind).toHaveBeenCalledWith("clerk-user-123");
    });

    it("should return default status for free tier user", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/status", {
        method: "GET",
      });

      const freeUser: User = {
        id: "user-123",
        clerk_id: "clerk-user-123",
        email: "free@example.com",
        subscription_tier: "free",
        credits: 100,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      mockGetAuth.mockReturnValue({ userId: "clerk-user-123" });
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(freeUser);

      const response = await handleSubscriptionStatus(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual({
        tier: "free",
        credits: 100,
        status: "active",
      });
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe("GET, OPTIONS");
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type, Authorization",
      );
    });

    it("should return subscription details for pro user with active subscription", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/status", {
        method: "GET",
      });

      const proUser: User = {
        id: "user-456",
        clerk_id: "clerk-user-456",
        email: "pro@example.com",
        subscription_tier: "pro",
        credits: 2000,
        stripe_customer_id: "cus_123",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      const subscription = {
        id: "sub-123",
        user_id: "user-456",
        stripe_subscription_id: "sub_stripe_123",
        status: "active",
        current_period_end: "2024-12-31T23:59:59Z",
        cancel_at_period_end: false,
        created_at: "2024-01-01T00:00:00Z",
      };

      mockGetAuth.mockReturnValue({ userId: "clerk-user-456" });
      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce(proUser)
        .mockResolvedValueOnce(subscription);

      const response = await handleSubscriptionStatus(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual({
        tier: "pro",
        credits: 2000,
        status: "active",
        currentPeriodEnd: "2024-12-31T23:59:59Z",
        cancelAtPeriodEnd: false,
      });
    });

    it("should return subscription details for enterprise user with canceled subscription", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/status", {
        method: "GET",
      });

      const enterpriseUser: User = {
        id: "user-789",
        clerk_id: "clerk-user-789",
        email: "enterprise@example.com",
        subscription_tier: "enterprise",
        credits: 5000,
        stripe_customer_id: "cus_enterprise",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      const subscription = {
        id: "sub-789",
        user_id: "user-789",
        stripe_subscription_id: "sub_stripe_789",
        status: "past_due",
        current_period_end: "2024-12-31T23:59:59Z",
        cancel_at_period_end: true,
        created_at: "2024-01-01T00:00:00Z",
      };

      mockGetAuth.mockReturnValue({ userId: "clerk-user-789" });
      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce(enterpriseUser)
        .mockResolvedValueOnce(subscription);

      const response = await handleSubscriptionStatus(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual({
        tier: "enterprise",
        credits: 5000,
        status: "past_due",
        currentPeriodEnd: "2024-12-31T23:59:59Z",
        cancelAtPeriodEnd: true,
      });
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        "SELECT * FROM subscriptions WHERE user_id = ? AND status != 'canceled' ORDER BY created_at DESC LIMIT 1",
      );
    });

    it("should handle paid tier user without subscription record", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/status", {
        method: "GET",
      });

      const proUserNoSub: User = {
        id: "user-999",
        clerk_id: "clerk-user-999",
        email: "pro-nosub@example.com",
        subscription_tier: "pro",
        credits: 1500,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      mockGetAuth.mockReturnValue({ userId: "clerk-user-999" });
      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce(proUserNoSub)
        .mockResolvedValueOnce(null);

      const response = await handleSubscriptionStatus(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual({
        tier: "pro",
        credits: 1500,
        status: "active",
      });
    });

    it("should handle errors and return 500", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/status", {
        method: "GET",
      });

      mockGetAuth.mockImplementation(() => {
        throw new Error("Database connection failed");
      });

      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const response = await handleSubscriptionStatus(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Failed to get subscription status");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Subscription status error:",
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe("handleCreatePortalSession", () => {
    it("should return 401 when user is not authenticated", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnUrl: "https://example.com/dashboard" }),
      });

      mockGetAuth.mockReturnValue({ userId: null });

      const response = await handleCreatePortalSession(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Unauthorized");
    });

    it("should return 400 when returnUrl is missing", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      mockGetAuth.mockReturnValue({ userId: "clerk-user-123" });

      const response = await handleCreatePortalSession(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Missing returnUrl");
    });

    it("should return 404 when user is not found", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnUrl: "https://example.com/dashboard" }),
      });

      mockGetAuth.mockReturnValue({ userId: "clerk-user-123" });
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(null);

      const response = await handleCreatePortalSession(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe("No Stripe customer found");
    });

    it("should return 404 when user has no Stripe customer ID", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnUrl: "https://example.com/dashboard" }),
      });

      const userWithoutStripe: User = {
        id: "user-123",
        clerk_id: "clerk-user-123",
        email: "free@example.com",
        subscription_tier: "free",
        credits: 100,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      mockGetAuth.mockReturnValue({ userId: "clerk-user-123" });
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(userWithoutStripe);

      const response = await handleCreatePortalSession(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe("No Stripe customer found");
    });

    it("should create portal session successfully", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnUrl: "https://example.com/dashboard" }),
      });

      const userWithStripe: User = {
        id: "user-456",
        clerk_id: "clerk-user-456",
        email: "pro@example.com",
        subscription_tier: "pro",
        credits: 2000,
        stripe_customer_id: "cus_test_123",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      const mockStripeClient = {
        billingPortal: {
          sessions: {
            create: vi.fn().mockResolvedValue({
              id: "bps_test_123",
              url: "https://billing.stripe.com/session/test_123",
            }),
          },
        },
      };

      mockGetAuth.mockReturnValue({ userId: "clerk-user-456" });
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(userWithStripe);
      mockCreateStripeServer.mockReturnValue(mockStripeClient);

      const response = await handleCreatePortalSession(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual({
        url: "https://billing.stripe.com/session/test_123",
      });
      expect(mockCreateStripeServer).toHaveBeenCalledWith(mockEnv);
      expect(mockStripeClient.billingPortal.sessions.create).toHaveBeenCalledWith({
        customer: "cus_test_123",
        return_url: "https://example.com/dashboard",
      });
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe("POST, OPTIONS");
    });

    it("should handle Stripe API errors", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnUrl: "https://example.com/dashboard" }),
      });

      const userWithStripe: User = {
        id: "user-456",
        clerk_id: "clerk-user-456",
        email: "pro@example.com",
        subscription_tier: "pro",
        credits: 2000,
        stripe_customer_id: "cus_test_123",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      const mockStripeClient = {
        billingPortal: {
          sessions: {
            create: vi.fn().mockRejectedValue(new Error("Stripe API error")),
          },
        },
      };

      mockGetAuth.mockReturnValue({ userId: "clerk-user-456" });
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(userWithStripe);
      mockCreateStripeServer.mockReturnValue(mockStripeClient);

      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const response = await handleCreatePortalSession(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Failed to create portal session");
      expect(consoleErrorSpy).toHaveBeenCalledWith("Portal session error:", expect.any(Error));

      consoleErrorSpy.mockRestore();
    });

    it("should handle malformed JSON body", async () => {
      const mockRequest = new Request("http://localhost/api/subscription/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "invalid json",
      });

      mockGetAuth.mockReturnValue({ userId: "clerk-user-123" });

      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const response = await handleCreatePortalSession(mockRequest, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Failed to create portal session");

      consoleErrorSpy.mockRestore();
    });
  });

  describe("handleOptions", () => {
    it("should return CORS headers for preflight requests", async () => {
      const response = await handleOptions();

      expect(response.status).toBe(200);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe("GET, POST, OPTIONS");
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type, Authorization",
      );
      expect(await response.text()).toBe("");
    });
  });
});
