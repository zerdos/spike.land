import { Given, Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";

When("I successfully authenticate", async function(this: CustomWorld) {
  await this.landingPage.mockSuccessfulAuth();
});

Then("I should be redirected to {string}", async function(this: CustomWorld, path: string) {
  await this.page.waitForURL(new RegExp(path));
});
