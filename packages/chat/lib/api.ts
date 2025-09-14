// API client for frontend
export const api = {
  async createCheckoutSession(priceId: string) {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    return response.json();
  },

  async getSubscriptionStatus() {
    const response = await fetch("/api/subscription/status");
    return response.json();
  },

  async getConversations() {
    const response = await fetch("/api/conversations");
    return response.json();
  },

  async createConversation(title: string) {
    const response = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    return response.json();
  },

  async sendMessage(conversationId: string, message: string) {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId, message }),
    });
    return response.json();
  },
};
