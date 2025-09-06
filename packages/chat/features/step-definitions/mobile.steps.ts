import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

Then("I should see the mobile menu button", async function(this: CustomWorld) {
  const isVisible = await this.conversationPage.isMobileMenuButtonVisible();
  expect(isVisible).toBeTruthy();
});

Then("the desktop sidebar should not be visible", async function(this: CustomWorld) {
  const isVisible = await this.conversationPage.isConversationListVisible();
  expect(isVisible).toBeFalsy();
});

When("I click the mobile menu button", async function(this: CustomWorld) {
  await this.conversationPage.clickMobileMenu();
});

Then("the sidebar should slide in", async function(this: CustomWorld) {
  await this.page.waitForTimeout(300); // Wait for animation
  const isVisible = await this.conversationPage.isConversationListVisible();
  expect(isVisible).toBeTruthy();
});

Then(
  "all interactive buttons should be at least {int}px tall",
  async function(this: CustomWorld, minHeight: number) {
    const buttons = await this.page.locator("button, .btn, [role='button']").all();

    for (const button of buttons) {
      const box = await button.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(minHeight);
      }
    }
  },
);

Then("tap targets should have adequate spacing", async function(this: CustomWorld) {
  const tapTargets = await this.page.locator("button, a, input, textarea, [role='button']").all();

  for (let i = 0; i < tapTargets.length - 1; i++) {
    const box1 = await tapTargets[i].boundingBox();
    const box2 = await tapTargets[i + 1].boundingBox();

    if (box1 && box2) {
      // Check minimum spacing between tap targets (8px recommended)
      const horizontalSpacing = Math.abs(box2.x - (box1.x + box1.width));
      const verticalSpacing = Math.abs(box2.y - (box1.y + box1.height));

      // At least one direction should have adequate spacing
      const hasAdequateSpacing = horizontalSpacing >= 8 || verticalSpacing >= 8;
      expect(hasAdequateSpacing).toBeTruthy();
    }
  }
});
