import type { BrowserContext as _BrowserContext, Page } from "@playwright/test";

export interface TestUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subscription?: {
    tier: "free" | "pro" | "enterprise";
    credits: number;
    status: "active" | "canceled" | "past_due";
  };
}

export interface ClerkSession {
  id: string;
  user: TestUser;
  status: "active" | "expired";
  lastActiveAt: string;
}

export interface StripeCustomer {
  id: string;
  email: string;
  subscription?: {
    id: string;
    status: string;
    current_period_end: number;
    items: Array<{
      price: { id: string; nickname: string; };
      quantity: number;
    }>;
  };
}

export class AuthFixtures {
  static readonly testUsers = {
    freeUser: {
      id: "user_free123",
      email: "free@example.com",
      firstName: "Free",
      lastName: "User",
      subscription: {
        tier: "free" as const,
        credits: 10,
        status: "active" as const,
      },
    },
    proUser: {
      id: "user_pro123",
      email: "pro@example.com",
      firstName: "Pro",
      lastName: "User",
      subscription: {
        tier: "pro" as const,
        credits: 1000,
        status: "active" as const,
      },
    },
    enterpriseUser: {
      id: "user_enterprise123",
      email: "enterprise@example.com",
      firstName: "Enterprise",
      lastName: "User",
      subscription: {
        tier: "enterprise" as const,
        credits: 10000,
        status: "active" as const,
      },
    },
    expiredUser: {
      id: "user_expired123",
      email: "expired@example.com",
      firstName: "Expired",
      lastName: "User",
      subscription: {
        tier: "pro" as const,
        credits: 0,
        status: "canceled" as const,
      },
    },
  } as const;

  static readonly testSessions = {
    activeSession: {
      id: "sess_active123",
      status: "active" as const,
      lastActiveAt: new Date().toISOString(),
    },
    expiredSession: {
      id: "sess_expired123",
      status: "expired" as const,
      lastActiveAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  } as const;

  static readonly stripeCustomers = {
    freeCustomer: {
      id: "cus_free123",
      email: "free@example.com",
    },
    proCustomer: {
      id: "cus_pro123",
      email: "pro@example.com",
      subscription: {
        id: "sub_pro123",
        status: "active",
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        items: [
          {
            price: { id: "price_pro", nickname: "Pro Plan" },
            quantity: 1,
          },
        ],
      },
    },
    enterpriseCustomer: {
      id: "cus_enterprise123",
      email: "enterprise@example.com",
      subscription: {
        id: "sub_enterprise123",
        status: "active",
        current_period_end: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
        items: [
          {
            price: { id: "price_enterprise", nickname: "Enterprise Plan" },
            quantity: 1,
          },
        ],
      },
    },
  } as const;

  /**
   * Set up authentication for a test user in the browser context
   */
  static async setupUserAuth(
    page: Page,
    userType: keyof typeof AuthFixtures.testUsers,
    sessionType: keyof typeof AuthFixtures.testSessions = "activeSession",
  ): Promise<void> {
    const user = AuthFixtures.testUsers[userType];
    const session = AuthFixtures.testSessions[sessionType];

    await page.addInitScript(
      ({ user, session }) => {
        // Set localStorage
        localStorage.setItem("auth_token", `token_${user.id}`);
        localStorage.setItem("user_id", user.id);
        localStorage.setItem(
          "clerk_session",
          JSON.stringify({
            id: session.id,
            user,
            status: session.status,
            lastActiveAt: session.lastActiveAt,
          }),
        );
        localStorage.setItem("user_subscription", JSON.stringify(user.subscription));

        // Mock Clerk global object
        (window as typeof window & { __clerk_frontend_api: string; __clerk_publishable_key: string }).__clerk_frontend_api = "clerk_test_frontend_api";
        (window as typeof window & { __clerk_frontend_api: string; __clerk_publishable_key: string }).__clerk_publishable_key = "pk_test_publishable_key";
      },
      { user, session },
    );

    // Set cookies
    await page.context().addCookies([
      {
        name: "__session",
        value: `session_${user.id}`,
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
      },
      {
        name: "__clerk_session",
        value: session.id,
        domain: "localhost",
        path: "/",
        httpOnly: false,
        secure: false,
      },
      {
        name: "__clerk_user",
        value: user.id,
        domain: "localhost",
        path: "/",
        httpOnly: false,
        secure: false,
      },
    ]);
  }

  /**
   * Mock Clerk authentication API responses
   */
  static async mockClerkAPI(page: Page): Promise<void> {
    await page.route("**/v1/client**", async (route) => {
      const url = route.request().url();

      if (url.includes("/sessions")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            response: {
              sessions: [AuthFixtures.testSessions.activeSession],
            },
          }),
        });
      } else if (url.includes("/users")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            response: AuthFixtures.testUsers.freeUser,
          }),
        });
      } else {
        await route.continue();
      }
    });

    // Mock JWT verification
    await page.route("**/v1/jwks", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          keys: [
            {
              kty: "RSA",
              kid: "test-key-id",
              use: "sig",
              n: "test-modulus",
              e: "AQAB",
            },
          ],
        }),
      });
    });
  }

  /**
   * Clear all authentication state
   */
  static async clearAuth(page: Page): Promise<void> {
    await page.evaluate(() => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("clerk_session");
      localStorage.removeItem("user_subscription");
      sessionStorage.clear();
    });

    await page.context().clearCookies();
  }

  /**
   * Verify user is authenticated
   */
  static async verifyAuthenticated(page: Page): Promise<boolean> {
    return await page.evaluate(() => {
      const authToken = localStorage.getItem("auth_token");
      const clerkSession = localStorage.getItem("clerk_session");
      return !!(authToken && clerkSession);
    });
  }

  /**
   * Get current user from localStorage
   */
  static async getCurrentUser(page: Page): Promise<TestUser | null> {
    return await page.evaluate(() => {
      const clerkSession = localStorage.getItem("clerk_session");
      if (!clerkSession) return null;

      try {
        const session = JSON.parse(clerkSession);
        return session.user;
      } catch {
        return null;
      }
    });
  }
}
