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
export const api = {
  async createCheckoutSession(priceId: string): Promise<APIResponse> {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    return response.json() as Promise<APIResponse>;
  },

  async getSubscriptionStatus(): Promise<APIResponse> {
    const response = await fetch("/api/subscription/status");
    return response.json() as Promise<APIResponse>;
  },

  async getConversations(): Promise<ConversationResponse> {
    const response = await fetch("/api/conversations");
    return response.json() as Promise<ConversationResponse>;
  },

  async sendMessage({ conversationId, content }: { conversationId: string; content: string }): Promise<MessageResponse> {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId, content }),
    });
    return response.json() as Promise<MessageResponse>;
  },

  async getConversation(conversationId: string): Promise<SingleConversationResponse> {
    const response = await fetch(`/api/conversations/${conversationId}`);
    return response.json() as Promise<SingleConversationResponse>;
  },

  async deleteConversation(conversationId: string): Promise<APIResponse> {
    const response = await fetch(`/api/conversations/${conversationId}`, {
      method: "DELETE",
    });
    return response.json() as Promise<APIResponse>;
  },

  async getSubscriptionInfo(): Promise<SubscriptionResponse> {
    const response = await fetch("/api/subscription");
    return response.json() as Promise<SubscriptionResponse>;
  },

  async createConversation({ title, model }: { title: string; model?: string }): Promise<APIResponse<Conversation>> {
    const response = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, model }),
    });
    return response.json() as Promise<APIResponse<Conversation>>;
  },
};
