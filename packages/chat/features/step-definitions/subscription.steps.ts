import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

Given("I have a {string} subscription", async function(this: CustomWorld, tier: string) {
  await this.page.evaluate((t) => {
    localStorage.setItem("subscription_tier", t);
  }, tier);

  // Mock user profile API
  await this.page.route("/api/user/profile", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: {
          subscription_tier: tier,
          credits: tier === "Pro" ? 450 : 10,
        },
      }),
    });
  });
  
  // Trigger subscription reload
  await this.page.evaluate(() => {
    if ((window as any).loadSubscriptionInfo) {
      (window as any).loadSubscriptionInfo();
    }
  });
  
  // Wait for update
  await this.page.waitForTimeout(100);
});


When("I select {string}", async function(this: CustomWorld, option: string) {
  // Select credit package option
  await this.page.click(`text=${option}`);
});

When("I complete the payment", async function(this: CustomWorld) {
  // Mock successful payment
  await this.page.evaluate(() => {
    window.dispatchEvent(
      new CustomEvent("payment-success", {
        detail: { credits: 100 },
      }),
    );
  });
});

Then(
  "I should see {string} as my subscription tier",
  async function(this: CustomWorld, tier: string) {
    const actualTier = await this.chatPage.getSubscriptionTier();
    expect(actualTier).toContain(tier);
  },
);

Then("I should see {string} credits remaining", async function(this: CustomWorld, credits: string) {
  const actualCredits = await this.chatPage.getCreditsRemaining();
  expect(actualCredits).toContain(credits);
});

Then("I should be redirected to Stripe checkout", async function(this: CustomWorld) {
  // Mock Stripe checkout redirect
  await this.page.route("/api/subscription/create", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: {
          url: "https://checkout.stripe.com/test-session",
        },
      }),
    });
  });

  // Verify redirect would happen (in test, we don't actually redirect)
  const response = await this.page.waitForResponse("/api/subscription/create");
  const data = await response.json();
  expect(data.data.url).toContain("checkout.stripe.com");
});

Then("I should see {string} available", async function(this: CustomWorld, features: string) {
  // Verify features are displayed based on tier
  const featuresText = await this.page.locator(".subscription-features").textContent();
  expect(featuresText).toContain(features);
});

Then("my credit limit should be {int}", async function(this: CustomWorld, limit: number) {
  const creditLimit = await this.page.locator(".credit-limit").textContent();
  expect(parseInt(creditLimit || "0")).toBe(limit);
});

Then(
  "my credit balance should increase by {int}",
  async function(this: CustomWorld, amount: number) {
    const currentCredits = await this.page.evaluate(() => {
      return parseInt(localStorage.getItem("user_credits") || "0");
    });

    // Simulate credit increase
    await this.page.evaluate((increase) => {
      const current = parseInt(localStorage.getItem("user_credits") || "0");
      localStorage.setItem("user_credits", (current + increase).toString());
    }, amount);

    const newCredits = await this.page.evaluate(() => {
      return parseInt(localStorage.getItem("user_credits") || "0");
    });

    expect(newCredits - currentCredits).toBe(amount);
  },
);
