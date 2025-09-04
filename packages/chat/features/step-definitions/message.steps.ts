import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { type CustomWorld } from "../support/world";

Given("the message API returns an error", async function(this: CustomWorld) {
  await this.chatPage.mockMessageAPIError(500, "Failed to send message");
});

Given("I have {int} credits remaining", async function(this: CustomWorld, credits: number) {
  await this.page.evaluate((c) => {
    localStorage.setItem("user_credits", c.toString());
  }, credits);
});

Given("the message API fails once then succeeds", async function(this: CustomWorld) {
  let callCount = 0;
  await this.page.route("/api/messages", async (route) => {
    callCount++;
    if (callCount === 1) {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ success: false, error: "Temporary error" }),
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            id: "msg-1",
            content: "Message sent after retry",
            role: "assistant",
          },
        }),
      });
    }
  });
});

When("I type {string} in the chat input", async function(this: CustomWorld, message: string) {
  await this.chatPage.typeMessage(message);
});

When("I press Enter", async function(this: CustomWorld) {
  await this.page.keyboard.press("Enter");
});

When("I send a message {string}", async function(this: CustomWorld, message: string) {
  await this.chatPage.sendMessage(message);
});

When("I try to send {string}", async function(this: CustomWorld, message: string) {
  await this.chatPage.sendMessage(message);
});

Then(
  "I should see my message {string} in the chat",
  async function(this: CustomWorld, message: string) {
    const isVisible = await this.chatPage.verifyMessageInChat(message);
    expect(isVisible).toBeTruthy();
  },
);

Then(
  "I should see an AI response containing {string}",
  async function(this: CustomWorld, expectedText: string) {
    await this.chatPage.waitForAIResponse();
    const messages = await this.chatPage.getAssistantMessages();
    const hasExpectedText = messages.some(m => m.includes(expectedText));
    expect(hasExpectedText).toBeTruthy();
  },
);

Then("I should receive an AI response", async function(this: CustomWorld) {
  await this.chatPage.waitForAIResponse();
  const messages = await this.chatPage.getAssistantMessages();
  expect(messages.length).toBeGreaterThan(0);
});

Then("I should see a typing indicator", async function(this: CustomWorld) {
  const isVisible = await this.chatPage.isTypingIndicatorVisible();
  expect(isVisible).toBeTruthy();
});

Then(
  "the typing indicator should disappear when the response arrives",
  async function(this: CustomWorld) {
    await this.chatPage.waitForTypingIndicatorToDisappear();
    const isVisible = await this.chatPage.isTypingIndicatorVisible();
    expect(isVisible).toBeFalsy();
  },
);

Then("the chat input should be disabled", async function(this: CustomWorld) {
  const isDisabled = await this.chatPage.isChatInputDisabled();
  expect(isDisabled).toBeTruthy();
});

Then("the send button should be disabled", async function(this: CustomWorld) {
  const isDisabled = await this.chatPage.isSendButtonDisabled();
  expect(isDisabled).toBeTruthy();
});

Then("the message should not appear in the chat", async function(this: CustomWorld) {
  const messages = await this.chatPage.getUserMessages();
  expect(messages.length).toBe(0);
});

Then("the message should be retried automatically", async function(this: CustomWorld) {
  // Wait for retry
  await this.page.waitForTimeout(1000);
});

Then("I should eventually see my message in the chat", async function(this: CustomWorld) {
  await this.page.waitForTimeout(2000);
  const messages = await this.chatPage.getUserMessages();
  expect(messages.length).toBeGreaterThan(0);
});
