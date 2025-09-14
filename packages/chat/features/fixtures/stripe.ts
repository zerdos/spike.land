import type { Page } from "@playwright/test";

export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  prices: StripePrice[];
}

export interface StripePrice {
  id: string;
  product: string;
  unit_amount: number;
  currency: string;
  recurring?: {
    interval: "day" | "week" | "month" | "year";
    interval_count: number;
  };
  nickname?: string;
}

export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, string>;
  default_source?: string;
  subscriptions?: {
    data: StripeSubscription[];
  };
}

export interface StripeSubscription {
  id: string;
  customer: string;
  status: "active" | "canceled" | "incomplete" | "past_due" | "trialing" | "unpaid";
  current_period_start: number;
  current_period_end: number;
  items: {
    data: StripeSubscriptionItem[];
  };
}

export interface StripeSubscriptionItem {
  id: string;
  price: StripePrice;
  quantity: number;
}

export interface StripePaymentMethod {
  id: string;
  type: "card" | "bank_account";
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

export class StripeFixtures {
  static readonly products = {
    freeProduct: {
      id: "prod_free",
      name: "Free Plan",
      description: "Basic chat features with limited usage",
      prices: [
        {
          id: "price_free",
          product: "prod_free",
          unit_amount: 0,
          currency: "usd",
          nickname: "Free Plan",
        },
      ],
    },
    proProduct: {
      id: "prod_pro",
      name: "Pro Plan",
      description: "Advanced chat features with increased limits",
      prices: [
        {
          id: "price_pro_monthly",
          product: "prod_pro",
          unit_amount: 2000, // $20.00
          currency: "usd",
          recurring: {
            interval: "month" as const,
            interval_count: 1,
          },
          nickname: "Pro Plan - Monthly",
        },
        {
          id: "price_pro_yearly",
          product: "prod_pro",
          unit_amount: 20000, // $200.00
          currency: "usd",
          recurring: {
            interval: "year" as const,
            interval_count: 1,
          },
          nickname: "Pro Plan - Yearly",
        },
      ],
    },
    enterpriseProduct: {
      id: "prod_enterprise",
      name: "Enterprise Plan",
      description: "Full access with premium support",
      prices: [
        {
          id: "price_enterprise_monthly",
          product: "prod_enterprise",
          unit_amount: 10000, // $100.00
          currency: "usd",
          recurring: {
            interval: "month" as const,
            interval_count: 1,
          },
          nickname: "Enterprise Plan - Monthly",
        },
      ],
    },
  } as const;

  static readonly customers = {
    freeCustomer: {
      id: "cus_free_test123",
      email: "free@example.com",
      name: "Free User",
      metadata: {
        user_id: "user_free123",
        plan: "free",
      },
    },
    proCustomer: {
      id: "cus_pro_test123",
      email: "pro@example.com",
      name: "Pro User",
      metadata: {
        user_id: "user_pro123",
        plan: "pro",
      },
      subscriptions: {
        data: [
          {
            id: "sub_pro_test123",
            customer: "cus_pro_test123",
            status: "active" as const,
            current_period_start: Math.floor(Date.now() / 1000) - 24 * 60 * 60,
            current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
            items: {
              data: [
                {
                  id: "si_pro_test123",
                  price: StripeFixtures.products.proProduct.prices[0],
                  quantity: 1,
                },
              ],
            },
          },
        ],
      },
    },
    enterpriseCustomer: {
      id: "cus_enterprise_test123",
      email: "enterprise@example.com",
      name: "Enterprise User",
      metadata: {
        user_id: "user_enterprise123",
        plan: "enterprise",
      },
      subscriptions: {
        data: [
          {
            id: "sub_enterprise_test123",
            customer: "cus_enterprise_test123",
            status: "active" as const,
            current_period_start: Math.floor(Date.now() / 1000) - 24 * 60 * 60,
            current_period_end: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
            items: {
              data: [
                {
                  id: "si_enterprise_test123",
                  price: StripeFixtures.products.enterpriseProduct.prices[0],
                  quantity: 1,
                },
              ],
            },
          },
        ],
      },
    },
    expiredCustomer: {
      id: "cus_expired_test123",
      email: "expired@example.com",
      name: "Expired User",
      metadata: {
        user_id: "user_expired123",
        plan: "expired",
      },
      subscriptions: {
        data: [
          {
            id: "sub_expired_test123",
            customer: "cus_expired_test123",
            status: "canceled" as const,
            current_period_start: Math.floor(Date.now() / 1000) - 60 * 24 * 60 * 60,
            current_period_end: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60,
            items: {
              data: [
                {
                  id: "si_expired_test123",
                  price: StripeFixtures.products.proProduct.prices[0],
                  quantity: 1,
                },
              ],
            },
          },
        ],
      },
    },
  } as const;

  static readonly paymentMethods = {
    validVisa: {
      id: "pm_test_visa",
      type: "card" as const,
      card: {
        brand: "visa",
        last4: "4242",
        exp_month: 12,
        exp_year: 2025,
      },
    },
    validMastercard: {
      id: "pm_test_mastercard",
      type: "card" as const,
      card: {
        brand: "mastercard",
        last4: "5555",
        exp_month: 6,
        exp_year: 2026,
      },
    },
    expiredCard: {
      id: "pm_test_expired",
      type: "card" as const,
      card: {
        brand: "visa",
        last4: "0002",
        exp_month: 1,
        exp_year: 2020,
      },
    },
  } as const;

  /**
   * Mock Stripe API calls for testing
   */
  static async mockStripeAPI(page: Page): Promise<void> {
    // Mock Stripe.js loading
    await page.addInitScript(() => {
      // Mock Stripe global object
      (window as typeof window & { Stripe: (_publishableKey: string) => unknown }).Stripe = function(_publishableKey: string) {
        return {
          elements: () => ({
            create: (type: string, _options?: Record<string, unknown>) => ({
              mount: (selector: string) => {
                const element = document.querySelector(selector);
                if (element) {
                  element.innerHTML =
                    `<div data-testid="stripe-${type}">Mock ${type} element</div>`;
                }
              },
              unmount: () => {},
              on: (_event: string, _handler: (...args: unknown[]) => void) => {},
              focus: () => {},
              blur: () => {},
            }),
            getElement: (_type: string) => null,
          }),
          createPaymentMethod: async (_options: Record<string, unknown>) => ({
            paymentMethod: StripeFixtures.paymentMethods.validVisa,
            error: null,
          }),
          confirmCardPayment: async (_clientSecret: string, _options?: Record<string, unknown>) => ({
            paymentIntent: {
              id: "pi_test123",
              status: "succeeded",
            },
            error: null,
          }),
          confirmPayment: async (_options: Record<string, unknown>) => ({
            paymentIntent: {
              id: "pi_test123",
              status: "succeeded",
            },
            error: null,
          }),
          retrievePaymentIntent: async (_clientSecret: string) => ({
            paymentIntent: {
              id: "pi_test123",
              status: "succeeded",
            },
            error: null,
          }),
        };
      };
    });

    // Mock Stripe API endpoints
    await page.route("**/v1/customers/**", async (route) => {
      const url = route.request().url();
      const customerId = url.split("/customers/")[1]?.split("?")[0];

      if (customerId) {
        const customer = Object.values(StripeFixtures.customers).find(
          (c) => c.id === customerId,
        );

        if (customer) {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(customer),
          });
        } else {
          await route.fulfill({
            status: 404,
            contentType: "application/json",
            body: JSON.stringify({
              error: {
                type: "invalid_request_error",
                message: "No such customer",
              },
            }),
          });
        }
      } else {
        await route.continue();
      }
    });

    // Mock subscription endpoints
    await page.route("**/v1/subscriptions/**", async (route) => {
      const method = route.request().method();

      if (method === "POST") {
        // Create subscription
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            id: "sub_new_test123",
            customer: "cus_test123",
            status: "active",
            current_period_start: Math.floor(Date.now() / 1000),
            current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
            items: {
              data: [
                {
                  id: "si_new_test123",
                  price: StripeFixtures.products.proProduct.prices[0],
                  quantity: 1,
                },
              ],
            },
          }),
        });
      } else {
        await route.continue();
      }
    });

    // Mock payment intents
    await page.route("**/v1/payment_intents", async (route) => {
      const method = route.request().method();

      if (method === "POST") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            id: "pi_test123",
            client_secret: "pi_test123_secret_test",
            status: "requires_payment_method",
            amount: 2000,
            currency: "usd",
          }),
        });
      } else {
        await route.continue();
      }
    });

    // Mock webhook endpoints
    await page.route("**/webhooks/stripe", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ received: true }),
      });
    });
  }

  /**
   * Set up customer subscription state in browser
   */
  static async setupCustomerSubscription(
    page: Page,
    customerType: keyof typeof StripeFixtures.customers,
  ): Promise<void> {
    const customer = StripeFixtures.customers[customerType];

    await page.addInitScript(
      ({ customer }) => {
        localStorage.setItem("stripe_customer_id", customer.id);
        localStorage.setItem("stripe_customer", JSON.stringify(customer));

        if (customer.subscriptions?.data && customer.subscriptions.data.length > 0) {
          localStorage.setItem(
            "stripe_subscription",
            JSON.stringify(customer.subscriptions.data[0]),
          );
        }
      },
      { customer },
    );
  }

  /**
   * Simulate payment success
   */
  static async simulatePaymentSuccess(page: Page, amount: number = 2000): Promise<void> {
    await page.evaluate(
      ({ amount }) => {
        window.dispatchEvent(
          new CustomEvent("stripe:payment_success", {
            detail: {
              paymentIntent: {
                id: "pi_test_success",
                status: "succeeded",
                amount,
              },
            },
          }),
        );
      },
      { amount },
    );
  }

  /**
   * Simulate payment failure
   */
  static async simulatePaymentFailure(
    page: Page,
    errorMessage: string = "Your card was declined.",
  ): Promise<void> {
    await page.evaluate(
      ({ errorMessage }) => {
        window.dispatchEvent(
          new CustomEvent("stripe:payment_error", {
            detail: {
              error: {
                type: "card_error",
                code: "card_declined",
                message: errorMessage,
              },
            },
          }),
        );
      },
      { errorMessage },
    );
  }

  /**
   * Get current subscription status from localStorage
   */
  static async getCurrentSubscription(page: Page): Promise<StripeSubscription | null> {
    return await page.evaluate(() => {
      const subscription = localStorage.getItem("stripe_subscription");
      return subscription ? JSON.parse(subscription) : null;
    });
  }

  /**
   * Clear all Stripe-related data
   */
  static async clearStripeData(page: Page): Promise<void> {
    await page.evaluate(() => {
      localStorage.removeItem("stripe_customer_id");
      localStorage.removeItem("stripe_customer");
      localStorage.removeItem("stripe_subscription");
      localStorage.removeItem("stripe_payment_method");
    });
  }
}
