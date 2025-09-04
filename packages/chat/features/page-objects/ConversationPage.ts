import { BasePage } from "./BasePage.js";

export class ConversationPage extends BasePage {
  // Selectors
  private selectors = {
    newChatButton: 'button:has-text("New Chat")',
    conversationItem: ".conversation-item",
    conversationTitle: ".conversation-title",
    deleteButton: ".conversation-item .delete-btn",
    confirmButton: 'button:has-text("Confirm")',
    activeConversation: ".conversation-item.active",
    chatHeader: ".chat-header",
    conversationList: ".conversation-list",
    mobileMenuButton: ".mobile-menu-btn",
  };

  async clickNewChat() {
    await this.click(this.selectors.newChatButton);
  }

  async getConversationCount(): Promise<number> {
    return await this.getElementCount(this.selectors.conversationItem);
  }

  async getConversationTitles(): Promise<string[]> {
    const titles = await this.page.locator(this.selectors.conversationTitle).all();
    return Promise.all(titles.map((t) => t.textContent() || ""));
  }

  async getFirstConversationTitle(): Promise<string> {
    return await this.page.locator(this.selectors.conversationItem)
      .first()
      .textContent() || "";
  }

  async getNthConversationTitle(n: number): Promise<string> {
    return await this.page.locator(this.selectors.conversationItem)
      .nth(n)
      .textContent() || "";
  }

  async clickDeleteForConversation(index: number = 0) {
    const deleteButtons = await this.page.locator(this.selectors.deleteButton).all();
    if (deleteButtons[index]) {
      await deleteButtons[index].click();
    }
  }

  async confirmDeletion() {
    await this.click(this.selectors.confirmButton);
  }

  async selectConversation(index: number = 0) {
    const conversations = await this.page.locator(this.selectors.conversationItem).all();
    if (conversations[index]) {
      await conversations[index].click();
    }
  }

  async selectConversationByTitle(title: string) {
    await this.page.locator(this.selectors.conversationItem)
      .filter({ hasText: title })
      .click();
  }

  async isConversationActive(index: number = 0): Promise<boolean> {
    const conversations = await this.page.locator(this.selectors.conversationItem).all();
    if (conversations[index]) {
      const classes = await conversations[index].getAttribute("class") || "";
      return classes.includes("active");
    }
    return false;
  }

  async getActiveConversationCount(): Promise<number> {
    return await this.getElementCount(this.selectors.activeConversation);
  }

  async getChatHeaderText(): Promise<string> {
    return await this.getText(this.selectors.chatHeader);
  }

  async mockConversationsList(conversations: any[]) {
    await this.mockAPIResponse("/api/conversations", {
      status: 200,
      body: { success: true, data: conversations },
    });
  }

  async createMockConversation(conversation: any) {
    return {
      id: conversation.id || `conv-${Date.now()}`,
      user_id: conversation.user_id || "user-1",
      title: conversation.title || "New Conversation",
      model: conversation.model || "llama-2-7b",
      created_at: conversation.created_at || new Date().toISOString(),
      updated_at: conversation.updated_at || new Date().toISOString(),
    };
  }

  async isMobileMenuButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.selectors.mobileMenuButton);
  }

  async clickMobileMenu() {
    await this.click(this.selectors.mobileMenuButton);
  }

  async isConversationListVisible(): Promise<boolean> {
    return await this.isElementVisible(this.selectors.conversationList);
  }

  async waitForConversationListToLoad() {
    await this.waitForElement(this.selectors.conversationItem);
  }
}
