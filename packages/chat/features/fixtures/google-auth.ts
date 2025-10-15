import type { Page } from "@playwright/test";
import type { TestUser } from "./auth.js";

export interface GoogleProfile {
  googleId: string;
  email: string;
  name: string;
  picture: string;
  provider: "google";
  emailVerified: boolean;
}

export interface GoogleAuthResponse {
  access_token: string;
  id_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: "Bearer";
  scope: string;
}

export class GoogleAuthFixtures {
  static readonly googleProfiles = {
    newUser: {
      googleId: "google_new_user_123",
      email: "newuser@gmail.com",
      name: "New Google User",
      picture: "https://lh3.googleusercontent.com/a/default-user",
      provider: "google" as const,
      emailVerified: true,
    },
    existingUser: {
      googleId: "google_existing_user_123",
      email: "existing@gmail.com",
      name: "Existing Google User",
      picture: "https://lh3.googleusercontent.com/a/existing-user",
      provider: "google" as const,
      emailVerified: true,
    },
  } as const;

  /**
   * Create a Google user profile from a test user
   */
  static createGoogleUser(testUser: TestUser): TestUser & { googleProfile: GoogleProfile } {
    return {
      ...testUser,
      googleProfile: {
        googleId: `google_${testUser.id}`,
        email: testUser.email,
        name: `${testUser.firstName} ${testUser.lastName}`,
        picture: `https://lh3.googleusercontent.com/a/${testUser.id}`,
        provider: "google",
        emailVerified: true,
      },
    };
  }

  /**
   * Set up Google OAuth authentication
   */
  static async setupGoogleAuth(page: Page, user: TestUser & { googleProfile?: GoogleProfile }): Promise<void> {
    const googleProfile = user.googleProfile || GoogleAuthFixtures.createGoogleUser(user).googleProfile;

    await page.addInitScript((profile) => {
      // Store Google profile
      localStorage.setItem("google_profile", JSON.stringify(profile));

      // Mock Google OAuth state
      sessionStorage.setItem("google_oauth_state", "state_" + Math.random().toString(36).substring(7));
      sessionStorage.setItem("google_oauth_nonce", "nonce_" + Math.random().toString(36).substring(7));
    }, googleProfile);

    // Set Google OAuth cookies
    await page.context().addCookies([
      {
        name: "google_auth",
        value: `ga_${googleProfile.googleId}`,
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
      },
    ]);
  }

  /**
   * Set up existing Google user
   */
  static async setupExistingGoogleUser(page: Page): Promise<void> {
    const existingUser = GoogleAuthFixtures.googleProfiles.existingUser;

    await page.addInitScript((profile) => {
      // Store existing user data
      localStorage.setItem("google_profile", JSON.stringify(profile));
      localStorage.setItem("has_previous_sessions", "true");

      // Store some conversation history
      const conversations = [
        {
          id: "conv_1",
          title: "Previous Chat 1",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "conv_2",
          title: "Previous Chat 2",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      localStorage.setItem("conversation_history", JSON.stringify(conversations));
    }, existingUser);
  }

  /**
   * Mock Google OAuth API endpoints
   */
  static async mockGoogleOAuthAPI(page: Page): Promise<void> {
    // Mock Google OAuth authorization endpoint
    await page.route("**/oauth2/v2/auth**", async (route) => {
      const url = new URL(route.request().url());
      const redirectUri = url.searchParams.get("redirect_uri");
      const state = url.searchParams.get("state");

      if (redirectUri) {
        const callbackUrl = new URL(redirectUri);
        callbackUrl.searchParams.set("code", "mock_auth_code_" + Math.random().toString(36).substring(7));
        callbackUrl.searchParams.set("state", state || "");

        await route.fulfill({
          status: 302,
          headers: {
            Location: callbackUrl.toString(),
          },
        });
      } else {
        await route.continue();
      }
    });

    // Mock Google OAuth token endpoint
    await page.route("**/oauth2/v4/token**", async (route) => {
      const mockTokenResponse: GoogleAuthResponse = {
        access_token: "mock_access_token_" + Math.random().toString(36).substring(7),
        id_token: "mock_id_token_" + Math.random().toString(36).substring(7),
        refresh_token: "mock_refresh_token_" + Math.random().toString(36).substring(7),
        expires_in: 3600,
        token_type: "Bearer",
        scope: "openid email profile",
      };

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockTokenResponse),
      });
    });

    // Mock Google UserInfo endpoint
    await page.route("**/oauth2/v2/userinfo**", async (route) => {
      const googleProfile = await page.evaluate(() => {
        const profile = localStorage.getItem("google_profile");
        return profile ? JSON.parse(profile) : null;
      });

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(googleProfile || GoogleAuthFixtures.googleProfiles.newUser),
      });
    });

    // Mock Clerk Google OAuth endpoints
    await page.route("**/v1/client/sign_ins**", async (route) => {
      if (route.request().url().includes("google")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            status: "needs_external_account",
            external_verification_redirect_url: "https://accounts.google.com/oauth2/v2/auth",
          }),
        });
      } else {
        await route.continue();
      }
    });

    // Mock Clerk OAuth callback
    await page.route("**/v1/client/sign_ins/**/attempt_external_verification**", async (route) => {
      const googleProfile = await page.evaluate(() => {
        const profile = localStorage.getItem("google_profile");
        return profile ? JSON.parse(profile) : null;
      });

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: "complete",
          session: {
            id: "sess_google_" + Math.random().toString(36).substring(7),
            user: {
              id: "user_google_" + (googleProfile?.googleId || "123"),
              email: googleProfile?.email || "user@gmail.com",
              firstName: googleProfile?.name?.split(" ")[0] || "Google",
              lastName: googleProfile?.name?.split(" ")[1] || "User",
              externalAccounts: [
                {
                  provider: "google",
                  providerUserId: googleProfile?.googleId || "google_123",
                  emailAddress: googleProfile?.email || "user@gmail.com",
                },
              ],
            },
            status: "active",
            lastActiveAt: new Date().toISOString(),
          },
        }),
      });
    });
  }

  /**
   * Simulate successful Google OAuth flow
   */
  static async simulateGoogleOAuthSuccess(page: Page, isMobile: boolean = false): Promise<void> {
    // Simulate OAuth popup/redirect
    await page.evaluate((mobile) => {
      // Trigger OAuth success event
      window.dispatchEvent(
        new CustomEvent("google:oauth:success", {
          detail: {
            code: "mock_auth_code",
            state: sessionStorage.getItem("google_oauth_state"),
            mobile,
          },
        }),
      );

      // Update Clerk session
      const googleProfile = localStorage.getItem("google_profile");
      if (googleProfile) {
        const profile = JSON.parse(googleProfile);
        const clerkSession = {
          id: "sess_google_" + profile.googleId,
          user: {
            id: "user_" + profile.googleId,
            email: profile.email,
            firstName: profile.name.split(" ")[0],
            lastName: profile.name.split(" ")[1] || "",
            externalAccounts: [
              {
                provider: "google",
                providerUserId: profile.googleId,
                emailAddress: profile.email,
              },
            ],
            subscription: {
              tier: "free",
              credits: 100,
              status: "active",
            },
          },
          status: "active",
          lastActiveAt: new Date().toISOString(),
        };

        localStorage.setItem("clerk_session", JSON.stringify(clerkSession));
        localStorage.setItem("auth_token", `token_${profile.googleId}`);
        localStorage.setItem("user_id", "user_" + profile.googleId);

        // Trigger Clerk session event
        window.dispatchEvent(
          new CustomEvent("clerk:session", {
            detail: { status: "active", session: clerkSession },
          }),
        );
      }
    }, isMobile);

    // Wait for auth to complete
    await page.waitForTimeout(1000);
  }

  /**
   * Simulate cancelled Google OAuth flow
   */
  static async simulateGoogleOAuthCancel(page: Page): Promise<void> {
    await page.evaluate(() => {
      // Trigger OAuth cancel event
      window.dispatchEvent(
        new CustomEvent("google:oauth:cancel", {
          detail: { reason: "user_cancelled" },
        }),
      );

      // Clear any partial auth state
      sessionStorage.removeItem("google_oauth_state");
      sessionStorage.removeItem("google_oauth_nonce");
    });
  }

  /**
   * Simulate failed Google OAuth flow
   */
  static async simulateGoogleOAuthError(page: Page): Promise<void> {
    await page.evaluate(() => {
      // Trigger OAuth error event
      window.dispatchEvent(
        new CustomEvent("google:oauth:error", {
          detail: {
            error: "access_denied",
            error_description: "Authentication failed",
          },
        }),
      );

      // Clear auth state
      sessionStorage.removeItem("google_oauth_state");
      sessionStorage.removeItem("google_oauth_nonce");
    });
  }

  /**
   * Get Google profile from page
   */
  static async getGoogleProfile(page: Page): Promise<GoogleProfile | null> {
    return await page.evaluate(() => {
      const profile = localStorage.getItem("google_profile");
      return profile ? JSON.parse(profile) : null;
    });
  }

  /**
   * Clear Google authentication
   */
  static async clearGoogleAuth(page: Page): Promise<void> {
    await page.evaluate(() => {
      localStorage.removeItem("google_profile");
      sessionStorage.removeItem("google_oauth_state");
      sessionStorage.removeItem("google_oauth_nonce");
    });

    // Clear Google cookies
    const cookies = await page.context().cookies();
    const googleCookies = cookies.filter((c) => c.name.includes("google"));
    for (const cookie of googleCookies) {
      await page.context().clearCookies({ name: cookie.name });
    }
  }
}