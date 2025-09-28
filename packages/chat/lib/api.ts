// API client for frontend
import type { APIResponse, Conversation, Message } from "../src/types/frontend";

interface ConversationResponse extends APIResponse {
  data?: Conversation[];
}

interface SingleConversationResponse extends APIResponse {
  data?: {
    conversation: Conversation;
    messages: Message[];
  };
}

interface SubscriptionResponse extends APIResponse {
  data?: {
    tier: string;
    credits: number;
    features: string;
    limit: number;
  };
}

interface MessageResponse extends APIResponse {
  data?: {
    id: string;
    content: string;
    creditsRemaining: number;
  };
}
// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  return token
    ? {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    : { "Content-Type": "application/json" };
};

export const api = {
  async createCheckoutSession(priceId: string): Promise<APIResponse> {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ priceId }),
    });
    return response.json() as Promise<APIResponse>;
  },

  async getSubscriptionStatus(): Promise<APIResponse> {
    const response = await fetch("/api/subscription/status", {
      headers: getAuthHeaders(),
    });
    return response.json() as Promise<APIResponse>;
  },

  async getConversations(): Promise<ConversationResponse> {
    const response = await fetch("/api/conversations", {
      headers: getAuthHeaders(),
    });
    return response.json() as Promise<ConversationResponse>;
  },

  async sendMessage(
    { conversationId, content }: { conversationId: string; content: string; },
  ): Promise<MessageResponse> {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ conversationId, content }),
    });
    return response.json() as Promise<MessageResponse>;
  },

  async getConversation(conversationId: string): Promise<SingleConversationResponse> {
    const response = await fetch(`/api/conversations/${conversationId}`, {
      headers: getAuthHeaders(),
    });
    return response.json() as Promise<SingleConversationResponse>;
  },

  async deleteConversation(conversationId: string): Promise<APIResponse> {
    const response = await fetch(`/api/conversations/${conversationId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return response.json() as Promise<APIResponse>;
  },

  async getSubscriptionInfo(): Promise<SubscriptionResponse> {
    const response = await fetch("/api/subscription", {
      headers: getAuthHeaders(),
    });
    return response.json() as Promise<SubscriptionResponse>;
  },

  async createConversation(
    { title, model }: { title: string; model?: string; },
  ): Promise<APIResponse<Conversation>> {
    const response = await fetch("/api/conversations", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, model }),
    });
    return response.json() as Promise<APIResponse<Conversation>>;
  },
};
