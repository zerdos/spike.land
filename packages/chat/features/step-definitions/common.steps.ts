import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

// Navigation steps
Given("I am on the landing page", async function(this: CustomWorld) {
  await this.landingPage.navigateToLandingPage();
  // Wait for Next.js hydration
  await this.page.waitForLoadState("domcontentloaded");
  await this.page.waitForSelector("main", { timeout: 10000 });
});

Given("the application is running", async function(this: CustomWorld) {
  // Verify the application is accessible and running
  const response = await this.page.evaluate(() => {
    return fetch(window.location.origin).then(res => res.ok);
  });
  expect(response).toBeTruthy();
});

Given("I am on the chat page", async function(this: CustomWorld) {
  await this.chatPage.navigateToChatPage();
  // Wait for Next.js hydration and page load
  await this.page.waitForLoadState("domcontentloaded");
  await this.page.waitForLoadState("networkidle", { timeout: 10000 });
  // Wait for React hydration to complete
  await this.page.waitForFunction(() => {
    return window.React !== undefined || document.querySelector("[data-react-root]") !== null;
  }, { timeout: 5000 }).catch(() => {
    console.log("React hydration timeout, continuing...");
  });
  // Ensure chat interface is shown if logged in
  await this.page.waitForSelector("#chatInterface", { state: "visible", timeout: 10000 }).catch(
    () => {
      console.log("Chat interface not visible, might not be logged in");
    },
  );
});

Given("I am logged in as a user", async function(this: CustomWorld) {
  // Set up authentication before navigation
  await this.page.addInitScript(() => {
    localStorage.setItem("auth_token", "test-token");
    localStorage.setItem("user_id", "test-user");
    localStorage.setItem(
      "clerk_session",
      JSON.stringify({
        id: "sess_test123",
        user: {
          id: "user_test123",
          emailAddresses: [{ emailAddress: "test@example.com" }],
          firstName: "Test",
          lastName: "User",
        },
        status: "active",
      }),
    );
  });

  // Mock Clerk session in cookies as well
  await this.page.context().addCookies([
    {
      name: "__session",
      value: "test-session-token",
      domain: "localhost",
      path: "/",
    },
    {
      name: "__clerk_session",
      value: "sess_test123",
      domain: "localhost",
      path: "/",
    },
  ]);
});

Given("I am using a mobile device", async function(this: CustomWorld) {
  await this.page.setViewportSize({ width: 375, height: 667 });
});

Given("I am using a {string} device", async function(this: CustomWorld, device: string) {
  const devices = {
    "iPhone 12": { width: 390, height: 844 },
    "Pixel 5": { width: 393, height: 851 },
    "iPad Mini": { width: 1024, height: 768 },
    "Galaxy S21": { width: 384, height: 854 },
  };

  const viewport = devices[device as keyof typeof devices] || { width: 375, height: 667 };
  await this.page.setViewportSize(viewport);
});

// Common actions
When("I click the {string} button", async function(this: CustomWorld, buttonText: string) {
  // Wait for the button to be available and interactive
  const button = this.page.locator(`button:has-text("${buttonText}")`).first();
  await button.waitFor({ state: "visible", timeout: 10000 });
  await button.waitFor({ state: "attached" });
  // Ensure button is not disabled
  await expect(button).toBeEnabled();
  await button.click();
});

When("I refresh the page", async function(this: CustomWorld) {
  await this.page.reload({ waitUntil: "domcontentloaded" });
  // Wait for Next.js hydration after reload
  await this.page.waitForLoadState("networkidle", { timeout: 10000 });
});

When("I navigate to the chat page", async function(this: CustomWorld) {
  await this.chatPage.navigateToChatPage();
});

// Common assertions
Then(
  "I should see the page title containing {string}",
  async function(this: CustomWorld, title: string) {
    const pageTitle = await this.page.title();
    expect(pageTitle).toContain(title);
  },
);

Then("I should see the {string} button", async function(this: CustomWorld, buttonText: string) {
  const button = this.page.locator(`button:has-text("${buttonText}")`).first();
  await expect(button).toBeVisible({ timeout: 10000 });
});

Then("I should be redirected to {string}", async function(this: CustomWorld, path: string) {
  // Wait for Next.js client-side navigation
  await this.page.waitForURL(new RegExp(path), { timeout: 15000 });
  const url = this.page.url();
  expect(url).toContain(path);

  // Ensure the page has loaded completely
  await this.page.waitForLoadState("domcontentloaded");
});

Then(
  "I should see an error message {string}",
  async function(this: CustomWorld, errorMessage: string) {
    const error = await this.chatPage.getErrorMessage();
    expect(error).toContain(errorMessage);
  },
);

Then("I should see a {string} button", async function(this: CustomWorld, buttonText: string) {
  const button = this.page.locator(`button:has-text("${buttonText}")`).first();
  await expect(button).toBeVisible({ timeout: 10000 });
});

Then("the layout should be responsive", async function(this: CustomWorld) {
  // Check that viewport meta tag exists
  const viewportMeta = await this.page.locator('meta[name="viewport"]').count();
  expect(viewportMeta).toBeGreaterThan(0);

  // Check that main content is visible and properly sized
  const mainContent = await this.page.locator("main, .main-content, #app").boundingBox();
  expect(mainContent).toBeTruthy();
});

Then("all features should be accessible", async function(this: CustomWorld) {
  // Check for navigation accessibility
  const navElements = await this.page.locator('[role="navigation"], nav').count();
  expect(navElements).toBeGreaterThan(0);

  // Check for proper ARIA labels
  const ariaElements = await this.page.locator("[aria-label], [aria-labelledby]").count();
  expect(ariaElements).toBeGreaterThan(0);
});
