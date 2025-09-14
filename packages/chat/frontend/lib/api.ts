import type {
  APIResponse,
  Attachment,
  Conversation,
  Message,
  Subscription,
  User,
} from "../../src/types";
import { auth } from "./clerk";

const API_BASE = "/api";

class ChatAPI {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    // Check for mock responses first (used in tests)
    const mockKey = `${options.method || "GET"} ${endpoint}`;
    if (typeof window !== "undefined" && (window as unknown as { __mockAPIResponses?: Record<string, unknown> }).__mockAPIResponses) {
      const mockResponse = (window as unknown as { __mockAPIResponses: Record<string, unknown> }).__mockAPIResponses[mockKey];
      if (mockResponse) {
        // Don't delete for GET requests, allow reuse
        if (options.method && options.method !== "GET") {
          delete (window as unknown as { __mockAPIResponses: Record<string, unknown> }).__mockAPIResponses[mockKey];
        }
        return Promise.resolve(mockResponse.data || mockResponse);
      }
    }

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
    // Check localStorage for test/demo tokens first (for testing)
    const authToken = localStorage.getItem("auth_token") || localStorage.getItem("authToken");
    if (authToken && authToken.startsWith("demo-")) {
      return authToken;
    }

    // Get Clerk session token
    const clerkToken = await auth.getSessionToken();
    if (clerkToken) {
      return clerkToken;
    }

    throw new Error("No authentication token available");
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

  async getSubscriptionInfo(): Promise<{
    tier: string;
    credits: number;
    features: string;
    limit: number;
  }> {
    try {
      const profile = await this.getUserProfile();
      return {
        tier: profile.subscription_tier || "Free",
        credits: profile.credits || 0,
        features: this.getFeaturesByTier(profile.subscription_tier || "free"),
        limit: this.getLimitByTier(profile.subscription_tier || "free"),
      };
    } catch {
      // Fallback to subscription endpoint
      try {
        const sub = await this.getSubscriptionStatus();
        const tier = this.getTierFromSubscription(sub);
        return {
          tier,
          credits: 0, // Would need to get from user profile
          features: this.getFeaturesByTier(tier.toLowerCase() as "free" | "pro" | "enterprise"),
          limit: this.getLimitByTier(tier.toLowerCase() as "free" | "pro" | "enterprise"),
        };
      } catch {
        // Default values
        return {
          tier: "Free",
          credits: 0,
          features: "Basic chat, 10 messages per day",
          limit: 10,
        };
      }
    }
  }

  private getTierFromSubscription(sub: Subscription): string {
    if (sub.status === "active") {
      if (sub.stripe_price_id?.includes("pro")) return "Pro";
      if (sub.stripe_price_id?.includes("business")) return "Business";
    }
    return "Free";
  }

  private getFeaturesByTier(tier: "free" | "pro" | "business"): string {
    switch (tier) {
      case "pro":
        return "Unlimited chat, priority support";
      case "business":
        return "All features, API access";
      default:
        return "Basic chat, 10 messages per day";
    }
  }

  private getLimitByTier(tier: "free" | "pro" | "business"): number {
    switch (tier) {
      case "pro":
        return 1000;
      case "business":
        return 99999;
      default:
        return 10;
    }
  }
}

export const chatAPI = new ChatAPI();
export const api = chatAPI; // Alias for compatibility
