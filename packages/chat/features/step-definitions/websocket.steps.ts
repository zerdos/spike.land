import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world.js";

Given("another user is in the same conversation", async function(this: CustomWorld) {
  // Mock another user in conversation
  await this.page.evaluate(() => {
    (window as any).__otherUserId = "other-user-123";
    (window as any).__conversationId = "conv-123";
  });
});

Given("I have an active WebSocket connection", async function(this: CustomWorld) {
  // Verify WebSocket is connected
  const status = await this.chatPage.getConnectionStatus();
  expect(status).toBe("connected");
});

When("the other user starts typing", async function(this: CustomWorld) {
  await this.chatPage.simulateTypingFromOtherUser("other-user-123", "conv-123");
});

When("the connection is lost", async function(this: CustomWorld) {
  // Simulate connection loss
  await this.page.evaluate(() => {
    window.dispatchEvent(new Event("offline"));
  });
});

Then(
  "I should see the connection status as {string}",
  async function(this: CustomWorld, status: string) {
    const actualStatus = await this.chatPage.getConnectionStatus();
    expect(actualStatus).toBe(status);
  },
);

Then("I should see a typing indicator for the other user", async function(this: CustomWorld) {
  const isVisible = await this.chatPage.isOtherUserTypingVisible();
  expect(isVisible).toBeTruthy();
});

Then(
  "the connection status should show {string}",
  async function(this: CustomWorld, status: string) {
    await this.page.waitForTimeout(500);
    const actualStatus = await this.chatPage.getConnectionStatus();
    expect(actualStatus.toLowerCase()).toContain(status.toLowerCase());
  },
);

Then(
  "the connection should be restored within {int} seconds",
  async function(this: CustomWorld, seconds: number) {
    // Wait for reconnection
    await this.page.waitForFunction(
      () => {
        const statusElement = document.querySelector(".connection-status");
        return statusElement?.classList.contains("connected");
      },
      { timeout: seconds * 1000 },
    );

    const status = await this.chatPage.getConnectionStatus();
    expect(status).toBe("connected");
  },
);
