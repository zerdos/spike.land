import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

// Navigation steps
Given("I am on the landing page", async function(this: CustomWorld) {
  await this.landingPage.navigateToLandingPage();
});

Given("I am on the chat page", async function(this: CustomWorld) {
  await this.chatPage.navigateToChatPage();
  // Wait a moment for page initialization
  await this.page.waitForTimeout(500);
  // Ensure chat interface is shown if logged in
  await this.page.waitForSelector("#chatInterface", { state: "visible", timeout: 5000 }).catch(() => {
    console.log("Chat interface not visible, might not be logged in");
  });
});

Given("I am logged in as a user", async function(this: CustomWorld) {
  await this.page.addInitScript(() => {
    localStorage.setItem("auth_token", "test-token");
    localStorage.setItem("user_id", "test-user");
  });
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
  await this.page.click(`button:has-text("${buttonText}")`);
});

When("I refresh the page", async function(this: CustomWorld) {
  await this.page.reload();
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
  const button = await this.page.locator(`button:has-text("${buttonText}")`).isVisible();
  expect(button).toBeTruthy();
});

Then("I should be redirected to {string}", async function(this: CustomWorld, path: string) {
  await this.page.waitForURL(new RegExp(path));
  const url = this.page.url();
  expect(url).toContain(path);
});

Then(
  "I should see an error message {string}",
  async function(this: CustomWorld, errorMessage: string) {
    const error = await this.chatPage.getErrorMessage();
    expect(error).toContain(errorMessage);
  },
);

Then("I should see a {string} button", async function(this: CustomWorld, buttonText: string) {
  const isVisible = await this.page.locator(`button:has-text("${buttonText}")`).isVisible();
  expect(isVisible).toBeTruthy();
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
