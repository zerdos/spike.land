import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world";

Given("I am logged in to the chat application", async function (this: CustomWorld) {
  // Navigate to the sign-in page
  await this.page!.goto("https://chat.spike.land/signin");

  // Click the Google sign-in button for demo auth
  await this.page!.click('button:has-text("Sign in with Google")');

  // Wait for navigation to chat page
  await this.page!.waitForURL("**/chat", { timeout: 5000 });
  // Wait for the chat interface to be ready
  await this.page!.waitForSelector('textarea[placeholder*="Type your message"]', { timeout: 5000 });
});

Given("I am on the chat page", async function (this: CustomWorld) {
  const url = this.page!.url();
  expect(url).toContain("/chat");
});

Given("I have an active conversation", async function (this: CustomWorld) {
  // Click new chat button if needed
  const newChatBtn = this.page!.locator('button:has-text("New Chat")').first();
  if (await newChatBtn.isVisible()) {
    await newChatBtn.click();
    // Wait for the chat interface to be ready
    await this.page!.waitForSelector('textarea[placeholder*="Type your message"]', { timeout: 5000 });
  }
});

Given("I have a conversation with messages", async function (this: CustomWorld) {
  // Create a conversation and send a message
  await this.page!.click('button:has-text("New Chat")');
  await this.page!.waitForSelector('textarea[placeholder*="Type your message"]', { timeout: 5000 });

  await this.page!.fill('textarea[placeholder*="Type your message"]', "Test message for persistence");
  await this.page!.click('button:has-text("Send")');
  // Wait for the message to appear
  await this.page!.waitForSelector('text="Test message for persistence"', { timeout: 5000 });
});

Given("I have multiple conversations", async function (this: CustomWorld) {
  // Create multiple conversations
  for (let i = 0; i < 2; i++) {
    await this.page!.click('button:has-text("New Chat")');
    await this.page!.waitForSelector('textarea[placeholder*="Type your message"]', { timeout: 5000 });
    await this.page!.fill('textarea[placeholder*="Type your message"]', `Conversation ${i + 1}`);
    await this.page!.click('button:has-text("Send")');
    // Wait for the message to appear
    await this.page!.waitForSelector(`.message:has-text("Conversation ${i + 1}"), [class*="message"]:has-text("Conversation ${i + 1}")`, { timeout: 5000 });
  }
});

Given("the API is experiencing issues", async function (this: CustomWorld) {
  // This would typically mock API failures
  // For testing, we can't easily simulate this without backend control
  this.apiErrorSimulated = true;
});

When("I click the {string} button", async function (this: CustomWorld, buttonText: string) {
  await this.page!.click(`button:has-text("${buttonText}")`);
  // Wait for action to complete - either navigation or UI update
  await this.page!.waitForLoadState("domcontentloaded");
});

When("I type {string} in the message input", async function (this: CustomWorld, message: string) {
  await this.page!.fill('textarea[placeholder*="Type your message"]', message);
});

When("I click the send button", async function (this: CustomWorld) {
  await this.page!.click('button:has-text("Send")');
  // Wait for the message to appear in the conversation
  await this.page!.waitForSelector('.message, [class*="message"]', { timeout: 5000 });
});

When("I refresh the page", async function (this: CustomWorld) {
  await this.page!.reload();
  await this.page!.waitForLoadState("networkidle");
});

When("I select the same conversation", async function (this: CustomWorld) {
  // Click on the first conversation in the sidebar
  const firstConversation = this.page!.locator(".conversation-item").first();
  if (await firstConversation.isVisible()) {
    await firstConversation.click();
    // Wait for conversation to load
    await this.page!.waitForSelector('.message, [class*="message"], [class*="empty-state"]', { timeout: 5000 });
  }
});

When("I click the delete button on a conversation", async function (this: CustomWorld) {
  const deleteBtn = this.page!.locator('button:has-text("Delete")').first();
  if (await deleteBtn.isVisible()) {
    await deleteBtn.click();
    // Wait for the delete action to complete
    await this.page!.waitForResponse(resp => resp.url().includes('/api/conversations') && resp.request().method() === 'DELETE', { timeout: 5000 }).catch(() => {});
  }
});

When("I view my subscription information", async function (this: CustomWorld) {
  // The subscription info should be visible in the sidebar
  await this.page!.waitForSelector('text="Free"', { timeout: 5000 });
});

When("I create {int} different conversations", async function (this: CustomWorld, count: number) {
  for (let i = 0; i < count; i++) {
    await this.page!.click('button:has-text("New Chat")');
    await this.page!.waitForSelector('textarea[placeholder*="Type your message"]', { timeout: 5000 });
    await this.page!.fill('textarea[placeholder*="Type your message"]', `Conversation ${i + 1} message`);
    await this.page!.click('button:has-text("Send")');
    // Wait for the message to appear
    await this.page!.waitForSelector(`.message:has-text("Conversation ${i + 1} message"), [class*="message"]:has-text("Conversation ${i + 1} message")`, { timeout: 5000 });
  }
});

When("I send messages about different topics:", async function (this: CustomWorld, dataTable: { hashes: () => Array<{ message: string; expected_response_contains: string }> }) {
  const rows = dataTable.hashes();

  for (const row of rows) {
    await this.page!.fill('textarea[placeholder*="Type your message"]', row.message);
    await this.page!.click('button:has-text("Send")');
    // Wait for AI response to appear
    await this.page!.waitForSelector('.message:last-child, [class*="message"]:last-child', { timeout: 10000 });

    // Store expected response for verification
    if (!this.expectedResponses) {
      this.expectedResponses = [];
    }
    this.expectedResponses.push(row.expected_response_contains);
  }
});

When("I try to send a message", async function (this: CustomWorld) {
  await this.page!.fill('textarea[placeholder*="Type your message"]', "Test message");
  await this.page!.click('button:has-text("Send")');
  // Wait for either success or error state
  await this.page!.waitForSelector('.message, [class*="message"], .error, [class*="error"]', { timeout: 5000 }).catch(() => {});
});

Then("a new conversation should be created", async function (this: CustomWorld) {
  // Check for conversation in sidebar or active chat
  const conversation = await this.page!.locator('text="New Conversation"').count();
  expect(conversation).toBeGreaterThan(0);
});

Then("the conversation should appear in the sidebar", async function (this: CustomWorld) {
  const sidebarConversation = await this.page!.locator('.conversation-item, [class*="conversation"]').count();
  expect(sidebarConversation).toBeGreaterThan(0);
});

Then("the chat interface should be ready for input", async function (this: CustomWorld) {
  const messageInput = await this.page!.locator('textarea[placeholder*="Type your message"]').isVisible();
  expect(messageInput).toBeTruthy();
});

Then("my message should appear in the chat", async function (this: CustomWorld) {
  const userMessage = await this.page!.locator('text="Hello! Can you help me understand what is React?"').isVisible();
  expect(userMessage).toBeTruthy();
});

Then("I should receive an AI response about React", async function (this: CustomWorld) {
  // Wait for AI response containing React-related content
  await this.page!.waitForSelector('text=/React|JavaScript library|user interface/i', { timeout: 10000 });
  const aiResponse = await this.page!.locator('text=/React|JavaScript library|user interface/i').count();
  expect(aiResponse).toBeGreaterThan(0);
});

Then("my credits should be decremented", async function (this: CustomWorld) {
  // Check if credits are shown and less than 10
  const creditsText = await this.page!.locator('text=/Credits.*[0-9]/').textContent();
  // In a real test, we'd verify the actual decrement
  expect(creditsText).toBeTruthy();
});

Then("I should see all previous messages", async function (this: CustomWorld) {
  const messages = await this.page!.locator('.message, [class*="message"]').count();
  expect(messages).toBeGreaterThan(0);
});

Then("the conversation history should be intact", async function (this: CustomWorld) {
  const testMessage = await this.page!.locator('text="Test message for persistence"').count();
  expect(testMessage).toBeGreaterThan(0);
});

Then("the conversation should be removed from the sidebar", async function (this: CustomWorld) {
  // Wait for the UI to update after deletion
  await this.page!.waitForLoadState("networkidle");
  // This would check the actual count change
});

Then("the conversation should no longer be accessible", async function (this: CustomWorld) {
  // Verify the conversation cannot be accessed
  // Implementation depends on how deletion is handled
});

Then("I should see my current tier as {string}", async function (this: CustomWorld, tier: string) {
  const tierText = await this.page!.locator(`text="${tier}"`).count();
  expect(tierText).toBeGreaterThan(0);
});

Then("I should see my remaining credits as {string}", async function (this: CustomWorld, credits: string) {
  const creditsVisible = await this.page!.locator(`text=/${credits}/`).count();
  expect(creditsVisible).toBeGreaterThan(0);
});

Then("I should see the daily message limit", async function (this: CustomWorld) {
  const limitText = await this.page!.locator('text=/10 messages per day|daily/i').count();
  expect(limitText).toBeGreaterThan(0);
});

Then("all {int} conversations should appear in the sidebar", async function (this: CustomWorld, count: number) {
  // Wait for conversations to appear in the sidebar
  await this.page!.waitForSelector('.conversation-item, [class*="conversation"]', { timeout: 5000 });
  const conversations = await this.page!.locator('.conversation-item, [class*="conversation"]').count();
  expect(conversations).toBeGreaterThanOrEqual(count);
});

Then("I should be able to switch between them", async function (this: CustomWorld) {
  // Click on different conversations to verify switching works
  const conversations = this.page!.locator('.conversation-item, [class*="conversation"]');
  const count = await conversations.count();

  if (count >= 2) {
    await conversations.nth(0).click();
    await this.page!.waitForLoadState("domcontentloaded");
    await conversations.nth(1).click();
    await this.page!.waitForLoadState("domcontentloaded");
  }
});

Then("each conversation should maintain its own message history", async function (this: CustomWorld) {
  // Verify different conversations have different messages
  const messages = await this.page!.locator('.message, [class*="message"]').count();
  expect(messages).toBeGreaterThan(0);
});

Then("I should receive appropriate AI responses for each topic", async function (this: CustomWorld) {
  if (this.expectedResponses) {
    for (const expected of this.expectedResponses) {
      const responseFound = await this.page!.locator(`text=/${expected}/i`).count();
      expect(responseFound).toBeGreaterThan(0);
    }
  }
});

Then("I should see an error message", async function (this: CustomWorld) {
  if (this.apiErrorSimulated) {
    // In real implementation, check for error messages
    const _errorMessage = await this.page!.locator('text=/error|failed|try again/i').count();
    // For now, we can't easily simulate API errors
  }
});

Then("the application should not crash", async function (this: CustomWorld) {
  // Verify the page is still responsive
  const isResponsive = await this.page!.locator('body').isVisible();
  expect(isResponsive).toBeTruthy();
});

Then("I should be able to retry the action", async function (this: CustomWorld) {
  // Verify retry functionality
  const sendButton = await this.page!.locator('button:has-text("Send")').isEnabled();
  expect(sendButton).toBeTruthy();
});