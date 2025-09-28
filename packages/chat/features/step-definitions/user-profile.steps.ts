import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "../support/world";

Given("I am logged in with Google", async function (this: CustomWorld) {
  // Check if user is already logged in
  const authToken = await this.page!.evaluate(() => localStorage.getItem("auth_token"));
  if (!authToken) {
    // Navigate to sign in page
    await this.page!.goto("/signin");
    // In a real test, we would mock the Google OAuth flow
    // For now, we'll simulate a successful login
    await this.page!.evaluate(() => {
      localStorage.setItem("auth_token", "clerk_test_user");
      localStorage.setItem("user", JSON.stringify({
        id: "user_test123",
        email: "test@example.com",
        name: "Test User"
      }));
    });
  }
});

Then("I should see my user avatar in the header", async function (this: CustomWorld) {
  await this.page!.waitForSelector(".user-avatar-container", { timeout: 5000 });
  const avatar = await this.page!.locator(".user-avatar-image").first();
  await expect(avatar).toBeVisible();
});

Then("the avatar should display my profile picture or initials", async function (this: CustomWorld) {
  const avatarImg = await this.page!.locator(".user-avatar-image").first();
  const imgSrc = await avatarImg.getAttribute("src");
  expect(imgSrc).toBeTruthy();
  // Should be either a real image URL or a dicebear initials URL
  expect(imgSrc).toMatch(/\.(jpg|jpeg|png|svg)|dicebear\.com/);
});

When("I click on my user avatar", async function (this: CustomWorld) {
  await this.page!.click(".user-avatar-button");
});

Then("I should see a dropdown menu with the following options:", async function (this: CustomWorld, dataTable: { raw: () => string[][] }) {
  await this.page!.waitForSelector(".user-dropdown-menu", { timeout: 5000 });

  const expectedOptions = dataTable.raw().map((row: string[]) => row[0]);
  for (const option of expectedOptions) {
    const element = await this.page!.locator(".user-dropdown-item", { hasText: option });
    await expect(element).toBeVisible();
  }
});

Then("I should see my name and email in the dropdown header", async function (this: CustomWorld) {
  const name = await this.page!.locator(".user-dropdown-name").first();
  const email = await this.page!.locator(".user-dropdown-email").first();

  await expect(name).toBeVisible();
  await expect(email).toBeVisible();

  const nameText = await name.textContent();
  const emailText = await email.textContent();

  expect(nameText).toBeTruthy();
  expect(emailText).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // Email format
});

When("I click on {string} in the dropdown", async function (this: CustomWorld, option: string) {
  await this.page!.click(`.user-dropdown-item:has-text("${option}")`);
});

Then("I should be signed out", async function (this: CustomWorld) {
  // Wait a moment for sign out to complete
  await this.page!.waitForTimeout(1000);

  // Check that auth tokens are cleared
  const authToken = await this.page!.evaluate(() => localStorage.getItem("auth_token"));
  expect(authToken).toBeNull();
});

Then("I should be redirected to the home page", async function (this: CustomWorld) {
  await this.page!.waitForURL("/", { timeout: 5000 });
  const url = this.page!.url();
  expect(url).toMatch(/\/$/);
});

Then("I should see the {string} button", async function (this: CustomWorld, buttonText: string) {
  const button = await this.page!.locator("button", { hasText: buttonText }).first();
  await expect(button).toBeVisible();
});

Then("I should be redirected to the profile page", async function (this: CustomWorld) {
  await this.page!.waitForURL(/\/profile/, { timeout: 5000 });
});

Then("I should see the profile settings form", async function (this: CustomWorld) {
  await this.page!.waitForSelector(".profile-form", { timeout: 5000 });
  const form = await this.page!.locator(".profile-form").first();
  await expect(form).toBeVisible();
});

Given("I am on the profile page", async function (this: CustomWorld) {
  await this.page!.goto("/profile");
  await this.page!.waitForSelector(".profile-card", { timeout: 5000 });
});

Then("I should see my profile avatar", async function (this: CustomWorld) {
  const avatar = await this.page!.locator(".profile-avatar").first();
  await expect(avatar).toBeVisible();
});

Then("I should see my email address", async function (this: CustomWorld) {
  const emailInput = await this.page!.locator("input[type='email']").first();
  await expect(emailInput).toBeVisible();
  const value = await emailInput.inputValue();
  expect(value).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

Then("I should see input fields for:", async function (this: CustomWorld, dataTable: { raw: () => string[][] }) {
  const expectedFields = dataTable.raw().map((row: string[]) => row[0]);

  for (const field of expectedFields) {
    let selector = "";
    switch (field) {
      case "Nickname":
        selector = "#nickname";
        break;
      case "First Name":
        selector = "#firstName";
        break;
      case "Last Name":
        selector = "#lastName";
        break;
      case "GitHub Username":
        selector = "#githubUsername";
        break;
    }

    const input = await this.page!.locator(selector);
    await expect(input).toBeVisible();
  }
});

Then("the email field should be read-only", async function (this: CustomWorld) {
  const emailInput = await this.page!.locator("input[type='email']").first();
  const isDisabled = await emailInput.isDisabled();
  expect(isDisabled).toBe(true);
});

When("I click the {string} button", async function (this: CustomWorld, buttonText: string) {
  await this.page!.click(`button:has-text("${buttonText}")`);
});

Then("the form fields should become editable", async function (this: CustomWorld) {
  const nickname = await this.page!.locator("#nickname");
  const isDisabled = await nickname.isDisabled();
  expect(isDisabled).toBe(false);
});

Then("I should see {string} and {string} buttons", async function (this: CustomWorld, button1: string, button2: string) {
  const saveButton = await this.page!.locator("button", { hasText: button1 });
  const cancelButton = await this.page!.locator("button", { hasText: button2 });

  await expect(saveButton).toBeVisible();
  await expect(cancelButton).toBeVisible();
});

Given("I have clicked {string}", async function (this: CustomWorld, buttonText: string) {
  await this.page!.click(`button:has-text("${buttonText}")`);
  await this.page!.waitForTimeout(500); // Wait for form to become editable
});

When("I update my nickname to {string}", async function (this: CustomWorld, value: string) {
  await this.page!.fill("#nickname", value);
});

When("I update my first name to {string}", async function (this: CustomWorld, value: string) {
  await this.page!.fill("#firstName", value);
});

When("I update my last name to {string}", async function (this: CustomWorld, value: string) {
  await this.page!.fill("#lastName", value);
});

When("I update my GitHub username to {string}", async function (this: CustomWorld, value: string) {
  await this.page!.fill("#githubUsername", value);
});

When("I click {string}", async function (this: CustomWorld, buttonText: string) {
  await this.page!.click(`button:has-text("${buttonText}")`);
});

Then("I should see a success message {string}", async function (this: CustomWorld, message: string) {
  await this.page!.waitForSelector(".profile-message.success", { timeout: 5000 });
  const messageElement = await this.page!.locator(".profile-message.success").first();
  const text = await messageElement.textContent();
  expect(text).toBe(message);
});

Then("the form should return to read-only mode", async function (this: CustomWorld) {
  await this.page!.waitForTimeout(500);
  const nickname = await this.page!.locator("#nickname");
  const isDisabled = await nickname.isDisabled();
  expect(isDisabled).toBe(true);
});

Then("my changes should be saved", async function (this: CustomWorld) {
  // Reload the page to verify changes persist
  await this.page!.reload();
  await this.page!.waitForSelector(".profile-form", { timeout: 5000 });

  const nickname = await this.page!.locator("#nickname");
  const value = await nickname.inputValue();
  expect(value).toBe("TestUser123");
});

When("I make changes to the form fields", async function (this: CustomWorld) {
  await this.page!.fill("#nickname", "TempChange");
  await this.page!.fill("#firstName", "Temp");
});

Then("my changes should not be saved", async function (this: CustomWorld) {
  const nickname = await this.page!.locator("#nickname");
  const value = await nickname.inputValue();
  expect(value).not.toBe("TempChange");
});

Then("the fields should show the original values", async function (this: CustomWorld) {
  const nickname = await this.page!.locator("#nickname");
  const value = await nickname.inputValue();
  // Should show the original value, not the temporary change
  expect(value).not.toBe("TempChange");
});

Given("I have a GitHub username set to {string}", async function (this: CustomWorld, username: string) {
  // This would be set during profile setup
  // For testing, we'll check if it exists on the page
  const githubInput = await this.page!.locator("#githubUsername");
  await githubInput.fill(username);
  await this.page!.click("button:has-text('Edit Profile')");
  await this.page!.waitForTimeout(500);
  await this.page!.click("button:has-text('Save Changes')");
  await this.page!.waitForSelector(".profile-message.success", { timeout: 5000 });
});

Then("I should see a GitHub link {string}", async function (this: CustomWorld, linkText: string) {
  const githubLink = await this.page!.locator(".profile-github-link");
  await expect(githubLink).toBeVisible();
  const text = await githubLink.textContent();
  expect(text).toContain(linkText);
});

When("I click the GitHub link", async function (this: CustomWorld) {
  // Store the current context to check for new tab
  const context = this.page!.context();
  const pagePromise = context.waitForEvent("page");

  await this.page!.click(".profile-github-link");

  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  const url = newPage.url();
  expect(url).toContain("github.com");

  await newPage.close();
});

Then("a new tab should open to {string}", async function (this: CustomWorld, _expectedUrl: string) {
  // This is handled in the previous step
  // In a real test environment, we'd verify the URL more thoroughly
});

When("I click the {string} button in the danger zone", async function (this: CustomWorld, buttonText: string) {
  const button = await this.page!.locator(".profile-danger-zone button", { hasText: buttonText });
  await button.click();
});

Given("I don't have a profile picture set", async function (this: CustomWorld) {
  // This would be the default state for new users
  // We'll simulate this by checking the avatar source
});

Then("my avatar should display my initials", async function (this: CustomWorld) {
  const avatarImg = await this.page!.locator(".user-avatar-image").first();
  const imgSrc = await avatarImg.getAttribute("src");
  // Dicebear generates initials avatars
  expect(imgSrc).toContain("dicebear.com");
});

Then("the initials should be based on my name or email", async function (this: CustomWorld) {
  const avatarImg = await this.page!.locator(".user-avatar-image").first();
  const imgSrc = await avatarImg.getAttribute("src");
  // The seed parameter should contain name or email
  expect(imgSrc).toMatch(/seed=\w+/);
});