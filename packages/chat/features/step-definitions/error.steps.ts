import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world.js";

Given("the network connection is offline", async function(this: CustomWorld) {
  await this.page.context().setOffline(true);
});
