import { BasePage } from "./BasePage";

export class LandingPage extends BasePage {
  // Selectors
  private selectors = {
    loginButton: 'button:has-text("Login")',
    startChattingButton: "text=Start Chatting",
    title: "h1",
    heroSection: ".hero",
    featuresSection: ".features",
  };

  async navigateToLandingPage() {
    await this.navigate("/");
  }

  async clickLogin() {
    await this.click(this.selectors.loginButton);
  }

  async clickStartChatting() {
    await this.click(this.selectors.startChattingButton);
  }

  async isStartChattingButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.selectors.startChattingButton);
  }

  async getPageTitle(): Promise<string> {
    return await this.getTitle();
  }

  async mockSuccessfulAuth() {
    await this.evaluateScript(() => {
      window.dispatchEvent(
        new CustomEvent("auth-success", {
          detail: { userId: "test-user", token: "test-token" },
        }),
      );
    });
  }

  async waitForRedirectToChat() {
    await this.page.waitForURL(/\/chat/);
  }
}
