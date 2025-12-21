import { beforeEach, describe, expect, it, vi } from "vitest";
import type Stripe from "stripe";
import type { Env } from "../../../src/types";
import { handleStripeWebhook } from "../../../src/api/stripe/webhook";
import { WEBHOOK_EVENTS } from "../../../src/lib/stripe";

vi.mock("../../../src/lib/stripe", async () => {
  const actual = await vi.importActual("../../../src/lib/stripe");
  return {
    ...actual,
    createStripeServer: vi.fn(),
  };
});

describe("handleStripeWebhook", () => {
  let mockEnv: Env;
  let mockStripe: {
    webhooks: {
      constructEvent: ReturnType<typeof vi.fn>;
    };
  };

  beforeEach(async () => {
    mockEnv = {
      DATABASE: {
        prepare: vi.fn().mockReturnThis(),
        bind: vi.fn().mockReturnThis(),
        run: vi.fn().mockResolvedValue({ success: true }),
        first: vi.fn().mockResolvedValue(null),
      } as unknown as D1Database,
      STRIPE_SECRET_KEY: "sk_test_123",
      STRIPE_WEBHOOK_SECRET: "whsec_test_123",
    } as Env;

    mockStripe = {
      webhooks: {
        constructEvent: vi.fn(),
      },
    };

    const { createStripeServer } = vi.mocked(
      await import("../../../src/lib/stripe"),
    );
    createStripeServer.mockReturnValue(mockStripe as unknown as ReturnType<typeof createStripeServer>);
  });

  describe("signature validation", () => {
    it("should return 400 when stripe-signature header is missing", async () => {
      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({
        success: false,
        error: "Missing stripe-signature header",
      });
    });

    it("should return 400 when signature is invalid", async () => {
      mockStripe.webhooks.constructEvent.mockImplementation(() => {
        throw new Error("Invalid signature");
      });

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "invalid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({
        success: false,
        error: "Invalid signature",
      });
    });

    it("should verify signature using webhook secret", async () => {
      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: "checkout.session.completed",
        data: {
          object: {} as Stripe.Checkout.Session,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const requestBody = JSON.stringify({});
      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: requestBody,
      });

      await handleStripeWebhook(request, mockEnv);

      expect(mockStripe.webhooks.constructEvent).toHaveBeenCalledWith(
        requestBody,
        "valid-signature",
        "whsec_test_123",
      );
    });
  });

  describe("checkout.session.completed - subscription mode", () => {
    it("should create subscription and update user tier when checkout completes", async () => {
      const session: Partial<Stripe.Checkout.Session> = {
        id: "cs_test_123",
        subscription: "sub_test_123",
        metadata: {
          userId: "user_123",
          tier: "pro",
        },
      };

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
        data: {
          object: session as Stripe.Checkout.Session,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);

      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO subscriptions"),
      );

      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE users"),
      );
    });

    it("should not create subscription when userId is missing from metadata", async () => {
      const session: Partial<Stripe.Checkout.Session> = {
        id: "cs_test_123",
        subscription: "sub_test_123",
        metadata: {
          tier: "pro",
        },
      };

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
        data: {
          object: session as Stripe.Checkout.Session,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);
      expect(mockEnv.DATABASE.prepare).not.toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO subscriptions"),
      );
    });

    it("should not create subscription when subscriptionId is missing", async () => {
      const session: Partial<Stripe.Checkout.Session> = {
        id: "cs_test_123",
        metadata: {
          userId: "user_123",
          tier: "pro",
        },
      };

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
        data: {
          object: session as Stripe.Checkout.Session,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);
      expect(mockEnv.DATABASE.prepare).not.toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO subscriptions"),
      );
    });

    it("should not create subscription when tier is missing from metadata", async () => {
      const session: Partial<Stripe.Checkout.Session> = {
        id: "cs_test_123",
        subscription: "sub_test_123",
        metadata: {
          userId: "user_123",
        },
      };

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
        data: {
          object: session as Stripe.Checkout.Session,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);
      expect(mockEnv.DATABASE.prepare).not.toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO subscriptions"),
      );
    });

    it("should set correct credits for enterprise tier", async () => {
      const session: Partial<Stripe.Checkout.Session> = {
        id: "cs_test_123",
        subscription: "sub_test_123",
        metadata: {
          userId: "user_123",
          tier: "enterprise",
        },
      };

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
        data: {
          object: session as Stripe.Checkout.Session,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      await handleStripeWebhook(request, mockEnv);

      const updateCall = (mockEnv.DATABASE.prepare as ReturnType<typeof vi.fn>).mock.calls
        .find((call: string[]) =>
          call[0] && typeof call[0] === "string" && call[0].includes("UPDATE users")
        );
      expect(updateCall).toBeDefined();
    });
  });

  describe("customer.subscription.updated", () => {
    it("should update subscription status and period dates", async () => {
      const subscription: Partial<Stripe.Subscription> = {
        id: "sub_test_123",
        status: "active",
        current_period_start: 1640000000,
        current_period_end: 1642592000,
        cancel_at_period_end: false,
      };

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED,
        data: {
          object: subscription as Stripe.Subscription,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE subscriptions"),
      );
    });

    it("should downgrade user to free when subscription is canceled", async () => {
      const subscription: Partial<Stripe.Subscription> = {
        id: "sub_test_123",
        status: "canceled",
        current_period_start: 1640000000,
        current_period_end: 1642592000,
        cancel_at_period_end: false,
      };

      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce({ user_id: "user_123" });

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED,
        data: {
          object: subscription as Stripe.Subscription,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);

      const updateUserCall = (mockEnv.DATABASE.prepare as ReturnType<typeof vi.fn>).mock.calls
        .find((call: string[]) =>
          call[0] && typeof call[0] === "string" &&
          call[0].includes("UPDATE users") &&
          call[0].includes("subscription_tier = 'free'")
        );
      expect(updateUserCall).toBeDefined();
    });

    it("should downgrade user to free when subscription is past_due", async () => {
      const subscription: Partial<Stripe.Subscription> = {
        id: "sub_test_123",
        status: "past_due",
        current_period_start: 1640000000,
        current_period_end: 1642592000,
        cancel_at_period_end: false,
      };

      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce({ user_id: "user_123" });

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED,
        data: {
          object: subscription as Stripe.Subscription,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);

      const updateUserCall = (mockEnv.DATABASE.prepare as ReturnType<typeof vi.fn>).mock.calls
        .find((call: string[]) =>
          call[0] && typeof call[0] === "string" &&
          call[0].includes("UPDATE users") &&
          call[0].includes("subscription_tier = 'free'")
        );
      expect(updateUserCall).toBeDefined();
    });
  });

  describe("customer.subscription.deleted", () => {
    it("should mark subscription as canceled and downgrade user to free", async () => {
      const subscription: Partial<Stripe.Subscription> = {
        id: "sub_test_123",
      };

      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce({ user_id: "user_123" });

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.SUBSCRIPTION_DELETED,
        data: {
          object: subscription as Stripe.Subscription,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);

      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE subscriptions"),
      );

      const updateUserCall = (mockEnv.DATABASE.prepare as ReturnType<typeof vi.fn>).mock.calls
        .find((call: string[]) =>
          call[0] && typeof call[0] === "string" &&
          call[0].includes("UPDATE users") &&
          call[0].includes("subscription_tier = 'free'")
        );
      expect(updateUserCall).toBeDefined();
    });

    it("should handle missing user gracefully", async () => {
      const subscription: Partial<Stripe.Subscription> = {
        id: "sub_test_123",
      };

      mockEnv.DATABASE.first = vi.fn().mockResolvedValueOnce(null);

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.SUBSCRIPTION_DELETED,
        data: {
          object: subscription as Stripe.Subscription,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);
    });
  });

  describe("invoice.payment_succeeded", () => {
    it("should reset credits for active subscription with pro tier", async () => {
      const invoice: Partial<Stripe.Invoice> = {
        id: "in_test_123",
        subscription: "sub_test_123",
      };

      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce({ user_id: "user_123", status: "active" })
        .mockResolvedValueOnce({ subscription_tier: "pro" });

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
        data: {
          object: invoice as Stripe.Invoice,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);

      const updateUserCall = (mockEnv.DATABASE.prepare as ReturnType<typeof vi.fn>).mock.calls
        .find((call: string[]) =>
          call[0] && typeof call[0] === "string" && call[0].includes("UPDATE users")
        );
      expect(updateUserCall).toBeDefined();

      const bindCall = (mockEnv.DATABASE.bind as ReturnType<typeof vi.fn>).mock.calls
        .find((call: number[]) => call[0] === 2000);
      expect(bindCall).toBeDefined();
    });

    it("should reset credits for active subscription with enterprise tier", async () => {
      const invoice: Partial<Stripe.Invoice> = {
        id: "in_test_123",
        subscription: "sub_test_123",
      };

      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce({ user_id: "user_123", status: "active" })
        .mockResolvedValueOnce({ subscription_tier: "enterprise" });

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
        data: {
          object: invoice as Stripe.Invoice,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);

      const bindCall = (mockEnv.DATABASE.bind as ReturnType<typeof vi.fn>).mock.calls
        .find((call: number[]) => call[0] === 10000);
      expect(bindCall).toBeDefined();
    });

    it("should reset credits for active subscription with free tier", async () => {
      const invoice: Partial<Stripe.Invoice> = {
        id: "in_test_123",
        subscription: "sub_test_123",
      };

      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce({ user_id: "user_123", status: "active" })
        .mockResolvedValueOnce({ subscription_tier: "free" });

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
        data: {
          object: invoice as Stripe.Invoice,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);

      const bindCall = (mockEnv.DATABASE.bind as ReturnType<typeof vi.fn>).mock.calls
        .find((call: number[]) => call[0] === 100);
      expect(bindCall).toBeDefined();
    });

    it("should not reset credits when subscription is not found", async () => {
      const invoice: Partial<Stripe.Invoice> = {
        id: "in_test_123",
        subscription: "sub_test_123",
      };

      mockEnv.DATABASE.first = vi.fn().mockResolvedValueOnce(null);

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
        data: {
          object: invoice as Stripe.Invoice,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);
    });

    it("should not reset credits when subscription is not active", async () => {
      const invoice: Partial<Stripe.Invoice> = {
        id: "in_test_123",
        subscription: "sub_test_123",
      };

      mockEnv.DATABASE.first = vi
        .fn()
        .mockResolvedValueOnce({ user_id: "user_123", status: "past_due" });

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
        data: {
          object: invoice as Stripe.Invoice,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);
    });

    it("should handle invoice without subscription", async () => {
      const invoice: Partial<Stripe.Invoice> = {
        id: "in_test_123",
      };

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED,
        data: {
          object: invoice as Stripe.Invoice,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);
    });
  });

  describe("invoice.payment_failed", () => {
    it("should mark subscription as past_due when payment fails", async () => {
      const invoice: Partial<Stripe.Invoice> = {
        id: "in_test_123",
        subscription: "sub_test_123",
      };

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_FAILED,
        data: {
          object: invoice as Stripe.Invoice,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);

      const updateCall = (mockEnv.DATABASE.prepare as ReturnType<typeof vi.fn>).mock.calls
        .find((call: string[]) =>
          call[0] && typeof call[0] === "string" &&
          call[0].includes("UPDATE subscriptions") &&
          call[0].includes("status = 'past_due'")
        );
      expect(updateCall).toBeDefined();
    });

    it("should handle invoice without subscription", async () => {
      const invoice: Partial<Stripe.Invoice> = {
        id: "in_test_123",
      };

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.INVOICE_PAYMENT_FAILED,
        data: {
          object: invoice as Stripe.Invoice,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);
    });
  });

  describe("unhandled events", () => {
    it("should handle unknown event types gracefully", async () => {
      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: "unknown.event.type",
        data: {
          object: {} as Record<string, unknown>,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
    });
  });

  describe("error handling", () => {
    it("should return 400 when signature verification throws error", async () => {
      mockStripe.webhooks.constructEvent.mockImplementation(() => {
        throw new Error("Signature verification failed");
      });

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({
        success: false,
        error: "Invalid signature",
      });
    });

    it("should handle database errors gracefully during checkout", async () => {
      const session: Partial<Stripe.Checkout.Session> = {
        id: "cs_test_123",
        subscription: "sub_test_123",
        metadata: {
          userId: "user_123",
          tier: "pro",
        },
      };

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.CHECKOUT_COMPLETED,
        data: {
          object: session as Stripe.Checkout.Session,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);
      mockEnv.DATABASE.run = vi.fn().mockRejectedValue(new Error("Database error"));

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);

      expect(response.status).toBe(200);
    });
  });

  describe("customer.subscription.created", () => {
    it("should handle subscription created event", async () => {
      const subscription: Partial<Stripe.Subscription> = {
        id: "sub_test_123",
        status: "active",
      };

      const mockEvent: Stripe.Event = {
        id: "evt_123",
        object: "event",
        type: WEBHOOK_EVENTS.SUBSCRIPTION_CREATED,
        data: {
          object: subscription as Stripe.Subscription,
        },
      } as Stripe.Event;

      mockStripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const request = new Request("http://localhost/webhooks/stripe", {
        method: "POST",
        headers: {
          "stripe-signature": "valid-signature",
        },
        body: JSON.stringify({}),
      });

      const response = await handleStripeWebhook(request, mockEnv);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
    });
  });
});
