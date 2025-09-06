import { When } from "@cucumber/cucumber";
import type { CustomWorld } from "../support/world.js";

When("I successfully authenticate", async function(this: CustomWorld) {
  await this.landingPage.mockSuccessfulAuth();
});

// Removed duplicate - already defined in common.steps.ts
