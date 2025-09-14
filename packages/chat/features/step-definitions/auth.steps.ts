import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { AuthFixtures } from "../fixtures/auth.js";
import type { CustomWorld } from "../support/world.js";

// Authentication setup steps
Given("I am logged in as a {string} user", async function(this: CustomWorld, userType: string) {
  const validUserTypes = ["free", "pro", "enterprise", "expired"] as const;
  const userTypeKey = `${userType}User` as keyof typeof AuthFixtures.testUsers;

  if (!validUserTypes.includes(userType as any)) {
    throw new Error(
      `Invalid user type: ${userType}. Valid types are: ${validUserTypes.join(", ")}`,
    );
  }

  await AuthFixtures.setupUserAuth(this.page, userTypeKey);
  await AuthFixtures.mockClerkAPI(this.page);
});

Given("I am not authenticated", async function(this: CustomWorld) {
  await AuthFixtures.clearAuth(this.page);
});

Given("I have an expired session", async function(this: CustomWorld) {
  await AuthFixtures.setupUserAuth(this.page, "freeUser", "expiredSession");
  await AuthFixtures.mockClerkAPI(this.page);
});

// Authentication actions
When("I successfully authenticate", async function(this: CustomWorld) {
  await AuthFixtures.setupUserAuth(this.page, "freeUser");
  await this.landingPage.mockSuccessfulAuth();
});

When("I authenticate as a {string} user", async function(this: CustomWorld, userType: string) {
  const userTypeKey = `${userType}User` as keyof typeof AuthFixtures.testUsers;
  await AuthFixtures.setupUserAuth(this.page, userTypeKey);
  await AuthFixtures.mockClerkAPI(this.page);

  // Trigger authentication event
  await this.page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("clerk:session", { detail: { status: "active" } }));
  });
});

When("I sign out", async function(this: CustomWorld) {
  await AuthFixtures.clearAuth(this.page);
  await this.page.evaluate(() => {
    window.dispatchEvent(
      new CustomEvent("clerk:session", { detail: { status: "unauthenticated" } }),
    );
  });
});

When("my session expires", async function(this: CustomWorld) {
  await this.page.evaluate(() => {
    localStorage.setItem(
      "clerk_session",
      JSON.stringify({
        id: "sess_expired123",
        status: "expired",
        lastActiveAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      }),
    );
  });

  await this.page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("clerk:session", { detail: { status: "expired" } }));
  });
});

// Authentication verification steps
Then("I should be authenticated", async function(this: CustomWorld) {
  const isAuthenticated = await AuthFixtures.verifyAuthenticated(this.page);
  expect(isAuthenticated).toBeTruthy();
});

Then("I should not be authenticated", async function(this: CustomWorld) {
  const isAuthenticated = await AuthFixtures.verifyAuthenticated(this.page);
  expect(isAuthenticated).toBeFalsy();
});

Then("I should see my user profile", async function(this: CustomWorld) {
  const currentUser = await AuthFixtures.getCurrentUser(this.page);
  expect(currentUser).toBeTruthy();
  expect(currentUser?.email).toBeTruthy();
  expect(currentUser?.firstName).toBeTruthy();
});

Then("I should see the login prompt", async function(this: CustomWorld) {
  await expect(this.page.locator('button:has-text("Login")')).toBeVisible({ timeout: 10000 });
});

Then(
  "I should see subscription status {string}",
  async function(this: CustomWorld, expectedStatus: string) {
    const currentUser = await AuthFixtures.getCurrentUser(this.page);
    expect(currentUser?.subscription?.status).toBe(expectedStatus);
  },
);

Then("I should have {int} credits", async function(this: CustomWorld, expectedCredits: number) {
  const currentUser = await AuthFixtures.getCurrentUser(this.page);
  expect(currentUser?.subscription?.credits).toBe(expectedCredits);
});

Then("I should see the {string} tier badge", async function(this: CustomWorld, tier: string) {
  await expect(this.page.locator(`[data-testid="subscription-tier"]:has-text("${tier}")`))
    .toBeVisible({ timeout: 5000 });
});
