import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

Given("I have created a new conversation", async function(this: CustomWorld) {
  await this.conversationPage.clickNewChat();
  // Wait for the conversation to actually appear in the list
  await this.page.waitForFunction(
    () => document.querySelectorAll(".conversation-item").length > 0,
    { timeout: 5000 }
  );
  await this.page.waitForTimeout(100); // Small additional wait for stability
});

Given("I have the following conversations:", async function(this: CustomWorld, dataTable) {
  const conversations = dataTable.hashes();
  await this.conversationPage.mockConversationsList(conversations);
});

Given("I have a conversation titled {string}", async function(this: CustomWorld, title: string) {
  const conversation = await this.conversationPage.createMockConversation({ title });
  await this.conversationPage.mockConversationsList([conversation]);
  await this.page.reload();
});

When("I click the delete button for the conversation", async function(this: CustomWorld) {
  await this.conversationPage.clickDeleteForConversation(0);
});

When("I confirm the deletion", async function(this: CustomWorld) {
  await this.conversationPage.confirmDeletion();
});

When("I click on the conversation", async function(this: CustomWorld) {
  await this.conversationPage.selectConversation(0);
});

Then(
  "I should see {int} conversation(s) in the list",
  async function(this: CustomWorld, count: number) {
    const actualCount = await this.conversationPage.getConversationCount();
    expect(actualCount).toBe(count);
  },
);

Then("the conversation title should be {string}", async function(this: CustomWorld, title: string) {
  const titles = await this.conversationPage.getConversationTitles();
  expect(titles[0]).toContain(title);
});

Then(
  "the first conversation should be titled {string}",
  async function(this: CustomWorld, title: string) {
    const firstTitle = await this.conversationPage.getFirstConversationTitle();
    expect(firstTitle).toContain(title);
  },
);

Then(
  "the second conversation should be titled {string}",
  async function(this: CustomWorld, title: string) {
    const secondTitle = await this.conversationPage.getNthConversationTitle(1);
    expect(secondTitle).toContain(title);
  },
);

Then("the conversation should be marked as active", async function(this: CustomWorld) {
  const activeCount = await this.conversationPage.getActiveConversationCount();
  expect(activeCount).toBe(1);
});

Then("the chat header should show {string}", async function(this: CustomWorld, title: string) {
  const headerText = await this.conversationPage.getChatHeaderText();
  expect(headerText).toContain(title);
});
