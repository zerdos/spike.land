import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleCheckoutSession, handleOptions } from "../../src/api/stripe/checkout";
import type { Env, User } from "../../src/types";

vi.mock("@clerk/backend", () => ({
  getAuth: vi.fn(),
}));

vi.mock("../../src/lib/stripe", () => ({
  createStripeServer: vi.fn(),
  getTierById: vi.fn(),
  SUBSCRIPTION_TIERS: [
    { id: "free", name: "Free", price: 0, credits: 100, features: [] },
    { id: "pro", name: "Pro", price: 2000, credits: 2000, features: [] },
    { id: "enterprise", name: "Enterprise", price: 5000, credits: 10000, features: [] },
  ],
}));

describe("handleCheckoutSession", async () => {
  const { getAuth } = await import("@clerk/backend");
  const { createStripeServer, getTierById } = await import("../../src/lib/stripe");
  const mockGetAuth = getAuth as ReturnType<typeof vi.fn>;
  const mockCreateStripeServer = createStripeServer as ReturnType<typeof vi.fn>;
  const mockGetTierById = getTierById as ReturnType<typeof vi.fn>;
  let mockEnv: Env;
  let mockStripe: {
    customers: {
      create: ReturnType<typeof vi.fn>;
    };
    checkout: {
      sessions: {
        create: ReturnType<typeof vi.fn>;
      };
    };
  };

  beforeEach(() => {
    vi.resetAllMocks();

    mockStripe = {
      customers: {
        create: vi.fn(),
      },
      checkout: {
        sessions: {
          create: vi.fn(),
        },
      },
    };

    mockCreateStripeServer.mockReturnValue(mockStripe);

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
      STRIPE_PRICE_ID_PRO: "price_pro_123",
      STRIPE_PRICE_ID_ENTERPRISE: "price_business_123",
      JWT_SECRET: "test-jwt-secret",
    };
  });

  describe("unauthorized requests", () => {
    it("should return 401 when no userId in auth", async () => {
      mockGetAuth.mockReturnValue({ userId: null });

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Unauthorized");
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    it("should return 401 when userId is undefined", async () => {
      mockGetAuth.mockReturnValue({ userId: undefined });

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Unauthorized");
    });
  });

  describe("input validation", () => {
    beforeEach(() => {
      mockGetAuth.mockReturnValue({
        userId: "clerk-user-123",
        sessionClaims: { email: "test@example.com" },
      });
    });

    it("should return 400 when priceId is missing", async () => {
      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Missing required fields: priceId, successUrl, cancelUrl, tier");
    });

    it("should return 400 when successUrl is missing", async () => {
      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_123",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Missing required fields: priceId, successUrl, cancelUrl, tier");
    });

    it("should return 400 when cancelUrl is missing", async () => {
      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_123",
          successUrl: "http://localhost/success",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Missing required fields: priceId, successUrl, cancelUrl, tier");
    });

    it("should return 400 when tier is missing", async () => {
      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Missing required fields: priceId, successUrl, cancelUrl, tier");
    });

    it("should return 400 when all required fields are missing", async () => {
      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Missing required fields: priceId, successUrl, cancelUrl, tier");
    });

    it("should return 400 when tier is invalid", async () => {
      mockGetTierById.mockReturnValue(undefined);

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "invalid-tier",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Invalid subscription tier");
      expect(mockGetTierById).toHaveBeenCalledWith("invalid-tier");
    });
  });

  describe("successful checkout creation", () => {
    const mockUser: User = {
      id: "user-uuid-123",
      clerk_id: "clerk-user-123",
      email: "test@example.com",
      subscription_tier: "free",
      credits: 100,
      stripe_customer_id: "cus_existing123",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    };

    beforeEach(() => {
      mockGetAuth.mockReturnValue({
        userId: "clerk-user-123",
        sessionClaims: { email: "test@example.com" },
      });

      mockGetTierById.mockReturnValue({
        id: "pro",
        name: "Pro",
        price: 2000,
        credits: 2000,
        features: [],
      });
    });

    it("should create checkout session for existing user with Stripe customer", async () => {
      const mockDatabase = mockEnv.DATABASE as {
        prepare: ReturnType<typeof vi.fn>;
        bind: ReturnType<typeof vi.fn>;
        first: ReturnType<typeof vi.fn>;
        run: ReturnType<typeof vi.fn>;
      };

      mockDatabase.first.mockResolvedValue(mockUser);
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: "cs_test_123",
        url: "https://checkout.stripe.com/pay/cs_test_123",
      });

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_pro_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual({
        sessionId: "cs_test_123",
        url: "https://checkout.stripe.com/pay/cs_test_123",
      });

      expect(mockDatabase.prepare).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE clerk_id = ?",
      );
      expect(mockDatabase.bind).toHaveBeenCalledWith("clerk-user-123");

      expect(mockStripe.customers.create).not.toHaveBeenCalled();

      expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith({
        customer: "cus_existing123",
        payment_method_types: ["card"],
        line_items: [
          {
            price: "price_pro_123",
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: "http://localhost/success",
        cancel_url: "http://localhost/cancel",
        metadata: {
          userId: "user-uuid-123",
          tier: "pro",
        },
        subscription_data: {
          metadata: {
            userId: "user-uuid-123",
            tier: "pro",
          },
        },
      });
    });

    it("should create user if not exists in database", async () => {
      const mockDatabase = mockEnv.DATABASE as {
        prepare: ReturnType<typeof vi.fn>;
        bind: ReturnType<typeof vi.fn>;
        first: ReturnType<typeof vi.fn>;
        run: ReturnType<typeof vi.fn>;
      };

      let callCount = 0;
      mockDatabase.first.mockImplementation(() => {
        callCount++;
        return callCount === 1 ? null : undefined;
      });
      mockDatabase.run.mockResolvedValue({ success: true });
      mockStripe.customers.create.mockResolvedValue({ id: "cus_new123" });
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: "cs_test_456",
        url: "https://checkout.stripe.com/pay/cs_test_456",
      });

      vi.spyOn(crypto, "randomUUID").mockReturnValue("new-user-uuid-456");
      vi.spyOn(Date.prototype, "toISOString").mockReturnValue("2024-01-15T12:00:00Z");

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_pro_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      expect(mockDatabase.prepare).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO users"),
      );
      expect(mockDatabase.bind).toHaveBeenCalledWith(
        "new-user-uuid-456",
        "clerk-user-123",
        "test@example.com",
        "2024-01-15T12:00:00Z",
        "2024-01-15T12:00:00Z",
      );
      expect(mockDatabase.run).toHaveBeenCalled();

      expect(mockStripe.customers.create).toHaveBeenCalledWith({
        email: "test@example.com",
        metadata: {
          userId: "new-user-uuid-456",
          clerkId: "clerk-user-123",
        },
      });
    });

    it("should create Stripe customer if none exists for user", async () => {
      const userWithoutStripeCustomer: User = {
        ...mockUser,
        stripe_customer_id: undefined,
      };

      const mockDatabase = mockEnv.DATABASE as {
        prepare: ReturnType<typeof vi.fn>;
        bind: ReturnType<typeof vi.fn>;
        first: ReturnType<typeof vi.fn>;
        run: ReturnType<typeof vi.fn>;
      };

      mockDatabase.first.mockResolvedValue(userWithoutStripeCustomer);
      mockDatabase.run.mockResolvedValue({ success: true });
      mockStripe.customers.create.mockResolvedValue({ id: "cus_new_customer_789" });
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: "cs_test_789",
        url: "https://checkout.stripe.com/pay/cs_test_789",
      });

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_pro_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      expect(mockStripe.customers.create).toHaveBeenCalledWith({
        email: "test@example.com",
        metadata: {
          userId: "user-uuid-123",
          clerkId: "clerk-user-123",
        },
      });

      expect(mockDatabase.prepare).toHaveBeenCalledWith(
        "UPDATE users SET stripe_customer_id = ?, updated_at = ? WHERE id = ?",
      );
      expect(mockDatabase.bind).toHaveBeenCalledWith(
        "cus_new_customer_789",
        expect.any(String),
        "user-uuid-123",
      );

      expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith({
        customer: "cus_new_customer_789",
        payment_method_types: ["card"],
        line_items: [
          {
            price: "price_pro_123",
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: "http://localhost/success",
        cancel_url: "http://localhost/cancel",
        metadata: {
          userId: "user-uuid-123",
          tier: "pro",
        },
        subscription_data: {
          metadata: {
            userId: "user-uuid-123",
            tier: "pro",
          },
        },
      });
    });

    it("should handle enterprise tier checkout", async () => {
      mockGetTierById.mockReturnValue({
        id: "enterprise",
        name: "Enterprise",
        price: 5000,
        credits: 10000,
        features: [],
      });

      const mockDatabase = mockEnv.DATABASE as {
        prepare: ReturnType<typeof vi.fn>;
        bind: ReturnType<typeof vi.fn>;
        first: ReturnType<typeof vi.fn>;
        run: ReturnType<typeof vi.fn>;
      };

      mockDatabase.first.mockResolvedValue(mockUser);
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: "cs_enterprise_123",
        url: "https://checkout.stripe.com/pay/cs_enterprise_123",
      });

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_enterprise_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "enterprise",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: {
            userId: "user-uuid-123",
            tier: "enterprise",
          },
        }),
      );
    });
  });

  describe("error handling", () => {
    beforeEach(() => {
      mockGetAuth.mockReturnValue({
        userId: "clerk-user-123",
        sessionClaims: { email: "test@example.com" },
      });

      mockGetTierById.mockReturnValue({
        id: "pro",
        name: "Pro",
        price: 2000,
        credits: 2000,
        features: [],
      });
    });

    it("should return 500 when database query fails", async () => {
      const mockDatabase = mockEnv.DATABASE as {
        prepare: ReturnType<typeof vi.fn>;
        bind: ReturnType<typeof vi.fn>;
        first: ReturnType<typeof vi.fn>;
        run: ReturnType<typeof vi.fn>;
      };

      mockDatabase.first.mockRejectedValue(new Error("Database connection failed"));

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_pro_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Database error");
    });

    it("should return 500 when Stripe customer creation fails", async () => {
      const userWithoutStripeCustomer = {
        id: "user-uuid-123",
        clerk_id: "clerk-user-123",
        email: "test@example.com",
        subscription_tier: "free" as const,
        credits: 100,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      const mockDatabase = mockEnv.DATABASE as {
        prepare: ReturnType<typeof vi.fn>;
        bind: ReturnType<typeof vi.fn>;
        first: ReturnType<typeof vi.fn>;
        run: ReturnType<typeof vi.fn>;
      };

      mockDatabase.first.mockResolvedValue(userWithoutStripeCustomer);
      mockStripe.customers.create.mockRejectedValue(new Error("Stripe API error"));

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_pro_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Failed to create checkout session");
    });

    it("should return 500 when checkout session creation fails", async () => {
      const mockUser: User = {
        id: "user-uuid-123",
        clerk_id: "clerk-user-123",
        email: "test@example.com",
        subscription_tier: "free",
        credits: 100,
        stripe_customer_id: "cus_existing123",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      const mockDatabase = mockEnv.DATABASE as {
        prepare: ReturnType<typeof vi.fn>;
        bind: ReturnType<typeof vi.fn>;
        first: ReturnType<typeof vi.fn>;
        run: ReturnType<typeof vi.fn>;
      };

      mockDatabase.first.mockResolvedValue(mockUser);
      mockStripe.checkout.sessions.create.mockRejectedValue(
        new Error("Invalid price ID"),
      );

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_invalid",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Failed to create checkout session");
    });
  });

  describe("CORS headers", () => {
    beforeEach(() => {
      mockGetAuth.mockReturnValue({
        userId: "clerk-user-123",
        sessionClaims: { email: "test@example.com" },
      });

      mockGetTierById.mockReturnValue({
        id: "pro",
        name: "Pro",
        price: 2000,
        credits: 2000,
        features: [],
      });
    });

    it("should include CORS headers in successful response", async () => {
      const mockUser: User = {
        id: "user-uuid-123",
        clerk_id: "clerk-user-123",
        email: "test@example.com",
        subscription_tier: "free",
        credits: 100,
        stripe_customer_id: "cus_existing123",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      };

      const mockDatabase = mockEnv.DATABASE as {
        prepare: ReturnType<typeof vi.fn>;
        bind: ReturnType<typeof vi.fn>;
        first: ReturnType<typeof vi.fn>;
        run: ReturnType<typeof vi.fn>;
      };

      mockDatabase.first.mockResolvedValue(mockUser);
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: "cs_test_123",
        url: "https://checkout.stripe.com/pay/cs_test_123",
      });

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_pro_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);

      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe("POST, OPTIONS");
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type, Authorization",
      );
    });

    it("should include CORS headers in error responses", async () => {
      mockGetAuth.mockReturnValue({ userId: null });

      const request = new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_123",
          successUrl: "http://localhost/success",
          cancelUrl: "http://localhost/cancel",
          tier: "pro",
        }),
      });

      const response = await handleCheckoutSession(request, mockEnv);

      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Content-Type")).toBe("application/json");
    });
  });
});

describe("handleOptions", () => {
  it("should return 200 with CORS headers", async () => {
    const response = await handleOptions();

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe("POST, OPTIONS");
    expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
      "Content-Type, Authorization",
    );
  });

  it("should return null body", async () => {
    const response = await handleOptions();
    const text = await response.text();

    expect(text).toBe("");
  });
});
