import { Given } from "@cucumber/cucumber";
import type { CustomWorld } from "../support/world.js";

Given("the network connection is offline", async function(this: CustomWorld) {
  await this.page.context().setOffline(true);
});
