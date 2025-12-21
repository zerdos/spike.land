import { beforeEach, describe, expect, it, vi } from "vitest";
import type Stripe from "stripe";
import { handleStripeWebhook } from "../../src/api/stripe/webhook";
import type { Env } from "../../src/types";
import { WEBHOOK_EVENTS } from "../../src/lib/stripe";

const mockConstructEvent = vi.fn();

vi.mock("../../src/lib/stripe", async () => {
  const actual = await vi.importActual<typeof import("../../src/lib/stripe")>(
    "../../src/lib/stripe",
  );
  return {
    ...actual,
    createStripeServer: vi.fn(() => ({
      webhooks: {
        constructEvent: mockConstructEvent,
      },
    })),
  };
});

describe("handleStripeWebhook", () => {
  let mockEnv: Env;

  beforeEach(() => {
    mockEnv = {
      DATABASE: {
        prepare: vi.fn().mockReturnThis(),
        bind: vi.fn().mockReturnThis(),
        run: vi.fn().mockResolvedValue({ success: true, meta: { changes: 1 } }),
        first: vi.fn().mockResolvedValue(null),
        all: vi.fn().mockResolvedValue({ results: [] }),
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

    vi.clearAllMocks();
  });

  describe("signature validation", () => {
    it("should return 400 when stripe-signature header is missing", async () => {
      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        body: JSON.stringify({ type: "test.event" }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Missing stripe-signature header");
    });

    it("should return 400 when signature is invalid", async () => {
      mockConstructEvent.mockImplementation(() => {
        throw new Error("Invalid signature");
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "invalid-signature",
        },
        body: JSON.stringify({ type: "test.event" }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe("Invalid signature");
    });
  });

  describe("checkout.session.completed", () => {
    it("should create subscription and update user credits", async () => {
      const mockSession: Stripe.Checkout.Session = {
        id: "cs_test_123",
        subscription: "sub_test_123",
        metadata: {
          userId: "user-123",
          tier: "pro",
        },
      } as any;

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
        data: { object: mockSession },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
          data: { object: mockSession },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe("Webhook processed successfully");

      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO subscriptions"),
      );
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE users"),
      );
    });

    it("should handle missing userId in checkout session metadata", async () => {
      const mockSession: Stripe.Checkout.Session = {
        id: "cs_test_123",
        subscription: "sub_test_123",
        metadata: {
          tier: "pro",
        },
      } as any;

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
        data: { object: mockSession },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
          data: { object: mockSession },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it("should handle missing subscription ID in checkout session", async () => {
      const mockSession: Stripe.Checkout.Session = {
        id: "cs_test_123",
        metadata: {
          userId: "user-123",
          tier: "pro",
        },
      } as any;

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
        data: { object: mockSession },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
          data: { object: mockSession },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it("should handle missing tier in checkout session metadata", async () => {
      const mockSession: Stripe.Checkout.Session = {
        id: "cs_test_123",
        subscription: "sub_test_123",
        metadata: {
          userId: "user-123",
        },
      } as any;

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
        data: { object: mockSession },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
          data: { object: mockSession },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe("customer.subscription.updated", () => {
    it("should update subscription in database", async () => {
      const mockSubscription: Stripe.Subscription = {
        id: "sub_test_123",
        status: "active",
        current_period_start: 1640995200,
        current_period_end: 1643673600,
        cancel_at_period_end: false,
      } as any;

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED,
        data: { object: mockSubscription },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED,
          data: { object: mockSubscription },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE subscriptions"),
      );
      expect(mockEnv.DATABASE.bind).toHaveBeenCalledWith(
        "active",
        expect.any(String),
        expect.any(String),
        false,
        expect.any(String),
        "sub_test_123",
      );
    });

    it("should downgrade user to free when subscription is canceled", async () => {
      const mockSubscription: Stripe.Subscription = {
        id: "sub_test_123",
        status: "canceled",
        current_period_start: 1640995200,
        current_period_end: 1643673600,
        cancel_at_period_end: false,
      } as any;

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({ user_id: "user-123" });

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED,
        data: { object: mockSubscription },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED,
          data: { object: mockSubscription },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE users"),
      );
      expect(mockEnv.DATABASE.bind).toHaveBeenCalledWith(
        expect.any(String),
        "user-123",
      );
    });

    it("should downgrade user to free when subscription is past_due", async () => {
      const mockSubscription: Stripe.Subscription = {
        id: "sub_test_123",
        status: "past_due",
        current_period_start: 1640995200,
        current_period_end: 1643673600,
        cancel_at_period_end: false,
      } as any;

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({ user_id: "user-123" });

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED,
        data: { object: mockSubscription },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED,
          data: { object: mockSubscription },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);

      const prepareCall = (mockEnv.DATABASE.prepare as any).mock.calls.find(
        (call: any[]) => call[0].includes("UPDATE users"),
      );
      expect(prepareCall).toBeDefined();
    });
  });

  describe("customer.subscription.deleted", () => {
    it("should downgrade user to free tier", async () => {
      const mockSubscription: Stripe.Subscription = {
        id: "sub_test_123",
      } as any;

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({ user_id: "user-123" });

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.SUBSCRIPTION_DELETED,
        data: { object: mockSubscription },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.SUBSCRIPTION_DELETED,
          data: { object: mockSubscription },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE subscriptions"),
      );
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        "SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?",
      );
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE users"),
      );

      const userUpdateCall = (mockEnv.DATABASE.bind as any).mock.calls.find(
        (call: any[]) => call[1] === "user-123",
      );
      expect(userUpdateCall).toBeDefined();
    });

    it("should handle subscription deletion when user record not found", async () => {
      const mockSubscription: Stripe.Subscription = {
        id: "sub_test_123",
      } as any;

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(null);

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.SUBSCRIPTION_DELETED,
        data: { object: mockSubscription },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.SUBSCRIPTION_DELETED,
          data: { object: mockSubscription },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe("invoice.payment_succeeded", () => {
    it("should reset credits for active subscription", async () => {
      const mockInvoice: Stripe.Invoice = {
        id: "inv_test_123",
        subscription: "sub_test_123",
      } as any;

      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce({ user_id: "user-123", status: "active" })
        .mockResolvedValueOnce({ subscription_tier: "pro" });

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
        data: { object: mockInvoice },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
          data: { object: mockInvoice },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        "SELECT user_id, status FROM subscriptions WHERE stripe_subscription_id = ?",
      );
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        "SELECT subscription_tier FROM users WHERE id = ?",
      );
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE users"),
      );

      const updateCall = (mockEnv.DATABASE.bind as any).mock.calls.find(
        (call: any[]) => call[0] === 2000,
      );
      expect(updateCall).toBeDefined();
    });

    it("should reset credits to 10000 for enterprise tier", async () => {
      const mockInvoice: Stripe.Invoice = {
        id: "inv_test_123",
        subscription: "sub_test_123",
      } as any;

      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce({ user_id: "user-123", status: "active" })
        .mockResolvedValueOnce({ subscription_tier: "enterprise" });

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
        data: { object: mockInvoice },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
          data: { object: mockInvoice },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);

      const updateCall = (mockEnv.DATABASE.bind as any).mock.calls.find(
        (call: any[]) => call[0] === 10000,
      );
      expect(updateCall).toBeDefined();
    });

    it("should reset credits to 100 for free tier", async () => {
      const mockInvoice: Stripe.Invoice = {
        id: "inv_test_123",
        subscription: "sub_test_123",
      } as any;

      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce({ user_id: "user-123", status: "active" })
        .mockResolvedValueOnce({ subscription_tier: "free" });

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
        data: { object: mockInvoice },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
          data: { object: mockInvoice },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);

      const updateCall = (mockEnv.DATABASE.bind as any).mock.calls.find(
        (call: any[]) => call[0] === 100,
      );
      expect(updateCall).toBeDefined();
    });

    it("should not reset credits for inactive subscription", async () => {
      const mockInvoice: Stripe.Invoice = {
        id: "inv_test_123",
        subscription: "sub_test_123",
      } as any;

      mockEnv.DATABASE.first = vi.fn().mockResolvedValueOnce({
        user_id: "user-123",
        status: "canceled",
      });

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
        data: { object: mockInvoice },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
          data: { object: mockInvoice },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it("should handle missing subscription ID in invoice", async () => {
      const mockInvoice: Stripe.Invoice = {
        id: "inv_test_123",
      } as any;

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
        data: { object: mockInvoice },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
          data: { object: mockInvoice },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe("invoice.payment_failed", () => {
    it("should mark subscription as past_due", async () => {
      const mockInvoice: Stripe.Invoice = {
        id: "inv_test_123",
        subscription: "sub_test_123",
      } as any;

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_FAILED,
        data: { object: mockInvoice },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.INVOICE_PAYMENT_FAILED,
          data: { object: mockInvoice },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);

      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE subscriptions"),
      );
      expect(mockEnv.DATABASE.bind).toHaveBeenCalledWith(
        expect.any(String),
        "sub_test_123",
      );

      const bindCalls = (mockEnv.DATABASE.bind as any).mock.calls;
      const pastDueCall = bindCalls.find((call: any[]) =>
        (mockEnv.DATABASE.prepare as any).mock.calls.some(
          (prepCall: any[]) =>
            prepCall[0].includes("status = 'past_due'") ||
            prepCall[0].includes("SET status = ?"),
        ),
      );
      expect(pastDueCall).toBeDefined();
    });

    it("should handle missing subscription ID in failed payment", async () => {
      const mockInvoice: Stripe.Invoice = {
        id: "inv_test_123",
      } as any;

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_FAILED,
        data: { object: mockInvoice },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.INVOICE_PAYMENT_FAILED,
          data: { object: mockInvoice },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe("unhandled event types", () => {
    it("should return 200 OK for unhandled event types", async () => {
      mockConstructEvent.mockReturnValue({
        type: "customer.created",
        data: { object: {} },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: "customer.created",
          data: { object: {} },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe("Webhook processed successfully");
    });

    it("should return 200 OK for subscription.created event", async () => {
      const mockSubscription: Stripe.Subscription = {
        id: "sub_test_123",
      } as any;

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.SUBSCRIPTION_CREATED,
        data: { object: mockSubscription },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.SUBSCRIPTION_CREATED,
          data: { object: mockSubscription },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe("error handling", () => {
    it("should return 200 even when database operation fails in event handler", async () => {
      const mockSession: Stripe.Checkout.Session = {
        id: "cs_test_123",
        subscription: "sub_test_123",
        metadata: {
          userId: "user-123",
          tier: "pro",
        },
      } as any;

      mockEnv.DATABASE.run = vi.fn().mockRejectedValue(new Error("Database error"));

      mockConstructEvent.mockReturnValue({
        type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
        data: { object: mockSession },
      });

      const request = new Request("http://localhost/api/stripe/webhook", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({
          type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
          data: { object: mockSession },
        }),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe("Webhook processed successfully");
    });
  });
});
