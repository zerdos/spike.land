import type {
  APIResponse,
  Attachment,
  Conversation,
  Message,
  Subscription,
  User,
} from "../../src/types";

const API_BASE = "/api";

class ChatAPI {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = await this.getAuthToken();

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const data: APIResponse<T> = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Request failed");
    }

    return data.data!;
  }

  private async getAuthToken(): Promise<string> {
    // This would integrate with Clerk to get the current session token
    // For now, returning a placeholder
    return "clerk-token-here";
  }

  async getConversations(): Promise<Conversation[]> {
    return this.request<Conversation[]>("/conversations");
  }

  async createConversation(data: {
    title?: string;
    model?: string;
  }): Promise<Conversation> {
    return this.request<Conversation>("/conversations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getConversation(id: string): Promise<{
    conversation: Conversation;
    messages: Message[];
  }> {
    return this.request(`/conversations/${id}`);
  }

  async deleteConversation(id: string): Promise<void> {
    await this.request(`/conversations/${id}`, {
      method: "DELETE",
    });
  }

  async updateConversationTitle(id: string, title: string): Promise<void> {
    await this.request(`/conversations/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
    });
  }

  async sendMessage(data: {
    conversationId: string;
    content: string;
    attachments?: Attachment[];
  }): Promise<Message> {
    return this.request<Message>("/messages", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getMessages(
    conversationId: string,
    limit: number = 50,
    offset: number = 0,
  ): Promise<Message[]> {
    return this.request<Message[]>(
      `/messages/${conversationId}?limit=${limit}&offset=${offset}`,
    );
  }

  async regenerateMessage(messageId: string): Promise<Message> {
    return this.request<Message>(`/messages/${messageId}/regenerate`, {
      method: "POST",
    });
  }

  async getUserProfile(): Promise<User> {
    return this.request("/user/profile");
  }

  async createCheckoutSession(priceId: string): Promise<{ url: string; }> {
    return this.request("/subscription/create", {
      method: "POST",
      body: JSON.stringify({ priceId }),
    });
  }

  async createCustomerPortal(): Promise<{ url: string; }> {
    return this.request("/subscription/manage", {
      method: "POST",
    });
  }

  async getSubscriptionStatus(): Promise<Subscription> {
    return this.request("/subscription/status");
  }
}

export const chatAPI = new ChatAPI();
