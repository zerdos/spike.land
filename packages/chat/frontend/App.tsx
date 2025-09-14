import { useEffect, useState } from "react";
import type { Conversation, Message, User } from "../src/types";
import { UserButton } from "./components/auth/UserButton";
import { ChatInterface } from "./components/ChatInterface";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { ConversationList } from "./components/ConversationList";
import { LandingPage } from "./components/LandingPage";
import { SubscriptionStatus } from "./components/SubscriptionStatus";
import { useAuth } from "./hooks/useAuth";
import { useWebSocket } from "./hooks/useWebSocket";
import { api } from "./lib/api";

export function App() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState({
    tier: "Free",
    credits: 0,
    features: "Basic chat, 10 messages per day",
    limit: 10,
  });

  const { isConnected, sendMessage: sendWebSocketMessage } = useWebSocket({
    onMessage: (data) => {
      if (data.type === "message" && currentConversation) {
        setMessages((prev) => [...prev, data.message]);
      }
    },
  });

  // Handle Clerk authentication state
  useEffect(() => {
    if (auth.isSignedIn && auth.user) {
      // Convert Clerk user to our User type
      const userData: User = {
        id: auth.user.id,
        clerk_id: auth.user.id,
        email: auth.user.emailAddresses[0]?.emailAddress || "",
        name: auth.user.fullName || auth.user.firstName || "",
        created_at: new Date(auth.user.createdAt || Date.now()).toISOString(),
        updated_at: new Date(auth.user.updatedAt || Date.now()).toISOString(),
      };
      setUser(userData);
    } else {
      setUser(null);
    }
  }, [auth.isSignedIn, auth.user]);

  useEffect(() => {
    if (user && auth.isSignedIn) {
      loadConversations();
      loadSubscriptionInfo();
    }
  }, [user, auth.isSignedIn]);

  // Fallback auth check for demo mode
  const checkAuth = () => {
    const authToken = localStorage.getItem("auth_token") || localStorage.getItem("authToken");
    if (authToken && authToken.startsWith("demo-")) {
      const userId = localStorage.getItem("user_id") || "demo-user";
      setUser({
        id: userId,
        email: "demo@example.com",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  };

  const handleAuth = (userData: User) => {
    setUser(userData);
    localStorage.setItem("auth_token", "demo-token-" + Date.now());
    localStorage.setItem("user_id", userData.id);
  };

  const loadConversations = async () => {
    try {
      const data = await api.getConversations();
      setConversations(data);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  const loadSubscriptionInfo = async () => {
    const storedTier = localStorage.getItem("subscription_tier");
    const storedCredits = localStorage.getItem("user_credits");

    if (storedTier || storedCredits) {
      setSubscription((prev) => ({
        ...prev,
        tier: storedTier || prev.tier,
        credits: storedCredits ? parseInt(storedCredits) : prev.credits,
      }));
    }

    try {
      const data = await api.getSubscriptionInfo();
      setSubscription({
        tier: data.tier || "Free",
        credits: data.credits || 0,
        features: data.features || "Basic chat, 10 messages per day",
        limit: data.limit || 10,
      });
    } catch (error) {
      console.error("Failed to load subscription info:", error);
    }
  };

  const createNewConversation = async () => {
    const newConv: Conversation = {
      id: "conv-" + Date.now(),
      user_id: user?.id || "demo-user",
      title: "New Conversation",
      model: "llama-2-7b",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setCurrentConversation(newConv);
    setConversations((prev) => [newConv, ...prev]);
    setMessages([]);

    try {
      const data = await api.createConversation({
        title: "New Conversation",
        model: "llama-2-7b",
      });
      if (data.id) {
        setCurrentConversation(data);
        setConversations((prev) => prev.map((c) => (c.id === newConv.id ? data : c)));
      }
    } catch (error) {
      console.error("Failed to create conversation via API:", error);
    }
  };

  const selectConversation = async (conv: Conversation) => {
    setCurrentConversation(conv);
    setMessages([]);

    try {
      const data = await api.getConversation(conv.id);
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const deleteConversation = async (conversationId: string) => {
    if (!confirm("Are you sure you want to delete this conversation?")) {
      return;
    }

    try {
      await api.deleteConversation(conversationId);
      setConversations((prev) => prev.filter((c) => c.id !== conversationId));
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentConversation || subscription.credits <= 0) {
      throw new Error("Cannot send message");
    }

    const userMessage: Message = {
      id: "msg-" + Date.now(),
      conversation_id: currentConversation.id,
      role: "user",
      content,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await api.sendMessage({
        conversationId: currentConversation.id,
        content,
      });

      const assistantMessage: Message = {
        id: response.id || "msg-" + Date.now(),
        conversation_id: currentConversation.id,
        role: "assistant",
        content: response.content || "Hello! How can I help you today?",
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Update credits
      if (response.creditsRemaining !== undefined) {
        setSubscription((prev) => ({
          ...prev,
          credits: response.creditsRemaining,
        }));
        localStorage.setItem("user_credits", response.creditsRemaining.toString());
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateMessage = async (messageId: string) => {
    // Implementation for regenerating messages
    console.log("Regenerating message:", messageId);
  };

  const upgradeSubscription = async () => {
    try {
      const response = await api.createCheckoutSession("pro");
      if (response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      window.location.href = "https://checkout.stripe.com/demo";
    }
  };

  // Show loading state while Clerk is initializing
  if (!auth.isLoaded) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // Show auth screen if not signed in
  if (!auth.isSignedIn || !user) {
    return <LandingPage onAuth={handleAuth} />;
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={createNewConversation}>
            New Chat
          </button>
          {auth.user && <UserButton user={auth.user} onSignOut={auth.signOut} />}
          <SubscriptionStatus
            subscription={subscription}
            onUpgrade={upgradeSubscription}
          />
          <ConnectionStatus isConnected={isConnected} />
        </div>
        <ConversationList
          conversations={conversations}
          currentConversation={currentConversation}
          onSelect={selectConversation}
          onDelete={deleteConversation}
        />
      </div>

      <div className="chat-container">
        {currentConversation
          ? (
            <ChatInterface
              conversation={currentConversation}
              messages={messages}
              onSendMessage={sendMessage}
              onRegenerateMessage={regenerateMessage}
              isLoading={isLoading}
            />
          )
          : (
            <div className="auth-container">
              <h1>Welcome to AI Chat Assistant</h1>
              <p>Select a conversation or create a new one to start chatting</p>
              <button className="auth-btn" onClick={createNewConversation}>
                Start New Chat
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
