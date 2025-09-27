import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";
import { AuthFixtures } from "../fixtures/auth.js";
import { GoogleAuthFixtures } from "../fixtures/google-auth.js";

// Google OAuth setup steps
Given("I have previously registered with Google", async function(this: CustomWorld) {
  // Set up existing Google user data
  await GoogleAuthFixtures.setupExistingGoogleUser(this.page);
  await GoogleAuthFixtures.mockGoogleOAuthAPI(this.page);
});

Given("I am logged in with Google as a {string} user", async function(this: CustomWorld, userType: string) {
  const validUserTypes = ["free", "pro", "enterprise"] as const;

  if (!validUserTypes.includes(userType as typeof validUserTypes[number])) {
    throw new Error(`Invalid user type: ${userType}. Valid types are: ${validUserTypes.join(", ")}`);
  }

  const userTypeKey = `${userType}User` as keyof typeof AuthFixtures.testUsers;
  const googleUser = GoogleAuthFixtures.createGoogleUser(AuthFixtures.testUsers[userTypeKey]);

  await GoogleAuthFixtures.setupGoogleAuth(this.page, googleUser);
  await GoogleAuthFixtures.mockGoogleOAuthAPI(this.page);
  await AuthFixtures.mockClerkAPI(this.page);
});

// Google OAuth action steps - Removed duplicate, using common.steps.ts instead

When("I complete the Google OAuth flow", async function(this: CustomWorld) {
  // Simulate successful Google OAuth flow
  await GoogleAuthFixtures.simulateGoogleOAuthSuccess(this.page);

  // Wait for redirect back to app
  await this.page.waitForURL(/^http:\/\/localhost:\d+\/(dashboard|chat)?/, { timeout: 15000 });

  // Wait for session to be established
  await this.page.waitForFunction(() => {
    return localStorage.getItem("clerk_session") !== null;
  }, { timeout: 10000 });
});

When("I complete the Google OAuth flow on mobile", async function(this: CustomWorld) {
  // Set mobile viewport
  await this.page.setViewportSize({ width: 390, height: 844 }); // iPhone 14 Pro size

  // Simulate successful Google OAuth flow on mobile
  await GoogleAuthFixtures.simulateGoogleOAuthSuccess(this.page, true);

  // Wait for redirect back to app
  await this.page.waitForURL(/^http:\/\/localhost:\d+\/(dashboard|chat)?/, { timeout: 15000 });
});

When("I cancel the Google OAuth flow", async function(this: CustomWorld) {
  // Simulate cancelled Google OAuth flow
  await GoogleAuthFixtures.simulateGoogleOAuthCancel(this.page);

  // Should redirect back to login page
  await this.page.waitForURL(/^http:\/\/localhost:\d+\/(login|signin)?/, { timeout: 10000 });
});

When("the Google OAuth flow fails with an error", async function(this: CustomWorld) {
  // Simulate failed Google OAuth flow
  await GoogleAuthFixtures.simulateGoogleOAuthError(this.page);

  // Should redirect back with error
  await this.page.waitForURL(/error=/, { timeout: 10000 });
});

When("I close the browser", async function(this: CustomWorld) {
  // Store session data before closing
  const sessionData = await this.page.evaluate(() => {
    return {
      clerkSession: localStorage.getItem("clerk_session"),
      authToken: localStorage.getItem("auth_token"),
      userId: localStorage.getItem("user_id"),
    };
  });

  // Store in context for later retrieval
  this.sessionData = sessionData;
});

When("I open the application again", async function(this: CustomWorld) {
  // Restore session data
  if (this.sessionData) {
    await this.page.addInitScript((data) => {
      if (data.clerkSession) localStorage.setItem("clerk_session", data.clerkSession);
      if (data.authToken) localStorage.setItem("auth_token", data.authToken);
      if (data.userId) localStorage.setItem("user_id", data.userId);
    }, this.sessionData);
  }

  await this.page.goto("/");
  await this.page.waitForLoadState("networkidle");
});

// Google OAuth verification steps
Then("my Google account information should be saved", async function(this: CustomWorld) {
  const googleProfile = await GoogleAuthFixtures.getGoogleProfile(this.page);
  expect(googleProfile).toBeTruthy();
  expect(googleProfile?.email).toMatch(/@gmail\.com$|@googlemail\.com$/);
  expect(googleProfile?.provider).toBe("google");
  expect(googleProfile?.googleId).toBeTruthy();
});

Then("I should have {int} credits as a new free user", async function(this: CustomWorld, expectedCredits: number) {
  const currentUser = await AuthFixtures.getCurrentUser(this.page);
  expect(currentUser?.subscription?.credits).toBe(expectedCredits);
  expect(currentUser?.subscription?.tier).toBe("free");
});

Then("I should see my previous conversation history", async function(this: CustomWorld) {
  await this.page.waitForSelector('[data-testid="conversation-list"]', { timeout: 10000 });
  const conversations = await this.page.locator('[data-testid="conversation-item"]').count();
  expect(conversations).toBeGreaterThan(0);
});

Then("my subscription tier should be preserved", async function(this: CustomWorld) {
  const currentUser = await AuthFixtures.getCurrentUser(this.page);
  const savedTier = await this.page.evaluate(() => {
    const subscription = localStorage.getItem("user_subscription");
    return subscription ? JSON.parse(subscription).tier : null;
  });

  expect(currentUser?.subscription?.tier).toBe(savedTier);
});

Then("I should see a message {string}", async function(this: CustomWorld, message: string) {
  await expect(this.page.locator(`text="${message}"`)).toBeVisible({ timeout: 5000 });
});

Then("I should see an error message {string}", async function(this: CustomWorld, errorMessage: string) {
  const errorElement = this.page.locator('[data-testid="error-message"], [role="alert"]');
  await expect(errorElement).toContainText(errorMessage, { timeout: 5000 });
});

Then("I should be able to retry authentication", async function(this: CustomWorld) {
  const retryButton = this.page.locator('button:has-text("Try Again"), button:has-text("Sign in with Google")');
  await expect(retryButton).toBeVisible({ timeout: 5000 });
  await expect(retryButton).toBeEnabled();
});

Then("my credits should be restored", async function(this: CustomWorld) {
  const currentUser = await AuthFixtures.getCurrentUser(this.page);
  const previousCredits = await this.page.evaluate(() => {
    const subscription = localStorage.getItem("user_subscription");
    return subscription ? JSON.parse(subscription).credits : null;
  });

  expect(currentUser?.subscription?.credits).toBe(previousCredits);
});

Then("my Google authentication should remain active", async function(this: CustomWorld) {
  const googleProfile = await GoogleAuthFixtures.getGoogleProfile(this.page);
  expect(googleProfile).toBeTruthy();
  expect(googleProfile?.provider).toBe("google");

  const isAuthenticated = await AuthFixtures.verifyAuthenticated(this.page);
  expect(isAuthenticated).toBeTruthy();
});

Then("the mobile interface should adapt to authenticated state", async function(this: CustomWorld) {
  // Check mobile menu is visible
  const mobileMenu = this.page.locator('[data-testid="mobile-menu"], [aria-label="Menu"]');
  await expect(mobileMenu).toBeVisible({ timeout: 5000 });

  // Check user avatar or profile indicator
  const userIndicator = this.page.locator('[data-testid="user-avatar"], [data-testid="user-menu"]');
  await expect(userIndicator).toBeVisible({ timeout: 5000 });
});

Then("I should still be authenticated", async function(this: CustomWorld) {
  const isAuthenticated = await AuthFixtures.verifyAuthenticated(this.page);
  expect(isAuthenticated).toBeTruthy();

  // Verify session is still valid
  const session = await this.page.evaluate(() => {
    const clerkSession = localStorage.getItem("clerk_session");
    return clerkSession ? JSON.parse(clerkSession) : null;
  });

  expect(session).toBeTruthy();
  expect(session?.status).toBe("active");
});

Then("my conversation history should be available", async function(this: CustomWorld) {
  // Navigate to conversations if not already there
  const conversationsVisible = await this.page.locator('[data-testid="conversation-list"]').isVisible();

  if (!conversationsVisible) {
    await this.page.click('[data-testid="conversations-link"], button:has-text("History")');
  }

  await this.page.waitForSelector('[data-testid="conversation-list"]', { timeout: 10000 });
  const conversations = await this.page.locator('[data-testid="conversation-item"]').count();
  expect(conversations).toBeGreaterThan(0);
});