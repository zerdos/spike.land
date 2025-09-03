import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ChatPage extends BasePage {
  // Selectors
  private selectors = {
    chatInput: ".chat-input",
    sendButton: ".send-btn",
    messageUser: ".message-user",
    messageAssistant: ".message-assistant",
    typingIndicator: ".typing-indicator",
    errorMessage: ".error-message",
    connectionStatus: ".connection-status",
    creditDisplay: ".credits-remaining",
    subscriptionTier: ".subscription-tier",
    buyCreditsButton: 'button:has-text("Buy Credits")',
    upgradeButton: 'button:has-text("Upgrade to Pro")',
    otherUserTyping: ".other-user-typing",
  };

  async navigateToChatPage() {
    await this.navigate("/chat");
  }

  async sendMessage(message: string) {
    await this.fill(this.selectors.chatInput, message);
    await this.pressKey("Enter");
  }

  async typeMessage(message: string) {
    await this.fill(this.selectors.chatInput, message);
  }

  async clickSendButton() {
    await this.click(this.selectors.sendButton);
  }

  async waitForAIResponse(timeout: number = 10000) {
    await this.waitForElement(this.selectors.messageAssistant, timeout);
  }

  async getUserMessages(): Promise<string[]> {
    const messages = await this.page.locator(this.selectors.messageUser).all();
    return Promise.all(messages.map((m) => m.textContent() || ""));
  }

  async getAssistantMessages(): Promise<string[]> {
    const messages = await this.page.locator(this.selectors.messageAssistant).all();
    return Promise.all(messages.map((m) => m.textContent() || ""));
  }

  async isTypingIndicatorVisible(): Promise<boolean> {
    return await this.isElementVisible(this.selectors.typingIndicator);
  }

  async waitForTypingIndicatorToDisappear() {
    await this.page.waitForSelector(this.selectors.typingIndicator, {
      state: "hidden",
    });
  }

  async isChatInputDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.chatInput).isDisabled();
  }

  async isSendButtonDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.sendButton).isDisabled();
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.selectors.errorMessage);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.selectors.errorMessage);
  }

  async getConnectionStatus(): Promise<string> {
    const element = this.page.locator(this.selectors.connectionStatus);
    const classes = await element.getAttribute("class") || "";
    return classes.includes("connected") ? "connected" : "disconnected";
  }

  async getCreditsRemaining(): Promise<string> {
    return await this.getText(this.selectors.creditDisplay);
  }

  async getSubscriptionTier(): Promise<string> {
    return await this.getText(this.selectors.subscriptionTier);
  }

  async clickBuyCredits() {
    await this.click(this.selectors.buyCreditsButton);
  }

  async clickUpgrade() {
    await this.click(this.selectors.upgradeButton);
  }

  async isBuyCreditsButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.selectors.buyCreditsButton);
  }

  async simulateTypingFromOtherUser(userId: string, conversationId: string) {
    await this.evaluateScript(({ uid, cid }) => {
      window.dispatchEvent(
        new CustomEvent("ws-message", {
          detail: {
            type: "typing",
            userId: uid,
            conversationId: cid,
          },
        }),
      );
    }, { uid: userId, cid: conversationId });
  }

  async isOtherUserTypingVisible(): Promise<boolean> {
    return await this.isElementVisible(this.selectors.otherUserTyping);
  }

  async mockMessageAPIError(status: number, error: string) {
    await this.mockAPIResponse("/api/messages", {
      status,
      body: { success: false, error },
    });
  }

  async mockMessageAPISuccess(response: any) {
    await this.mockAPIResponse("/api/messages", {
      status: 200,
      body: { success: true, data: response },
    });
  }

  async verifyMessageInChat(message: string): Promise<boolean> {
    const allMessages = await this.page.locator(".message-user, .message-assistant")
      .allTextContents();
    return allMessages.some(m => m.includes(message));
  }
}
