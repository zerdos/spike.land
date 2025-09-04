import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world.js";

Given("the network connection is offline", async function(this: CustomWorld) {
  await this.page.context().setOffline(true);
});

Then("I should see an error message {string}", async function(this: CustomWorld, message: string) {
  const errorVisible = await this.chatPage.isErrorMessageVisible();
  expect(errorVisible).toBeTruthy();

  const errorText = await this.chatPage.getErrorMessage();
  expect(errorText).toContain(message);
});
