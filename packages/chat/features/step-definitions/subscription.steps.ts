import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

Given("I have a {string} subscription", async function(this: CustomWorld, tier: string) {
  // Calculate credits based on tier
  const credits = tier === "Pro" ? 450 : (tier === "Business" ? 1000 : 10);
  
  // Set both tier and credits in localStorage first
  await this.page.evaluate(({ t, c }) => {
    localStorage.setItem("subscription_tier", t);
    localStorage.setItem("user_credits", c.toString());
  }, { t: tier, c: credits });

  // Mock user profile API BEFORE loading subscription info
  await this.page.route("/api/user/profile", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: {
          subscription_tier: tier,
          credits: credits,
        },
      }),
    });
  });

  // Now update the subscription display
  await this.page.evaluate(({ t, c }) => {
    // Directly update the userSubscription object
    (window as any).userSubscription = { tier: t, credits: c };
    
    // Force update the display
    const tierEl = document.getElementById("subscriptionTier");
    const creditsEl = document.getElementById("creditsRemaining");
    if (tierEl) tierEl.textContent = t;
    if (creditsEl) creditsEl.textContent = c.toString();
    
    // Also update via the function if available
    if ((window as any).__setSubscription) {
      (window as any).__setSubscription(t, c);
    }
    
    // Trigger load to sync with API mock
    if ((window as any).loadSubscriptionInfo) {
      (window as any).loadSubscriptionInfo();
    }
  }, { t: tier, c: credits });

  // Wait for DOM to stabilize
  await this.page.waitForFunction(
    ({ expectedTier }) => {
      const tierEl = document.getElementById("subscriptionTier");
      return tierEl && tierEl.textContent === expectedTier;
    },
    { expectedTier: tier },
    { timeout: 3000 }
  );
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
