"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { ChatInterface } from "../../components/ChatInterface";
import { ConversationList } from "../../components/ConversationList";
import { Header } from "../../components/layout/header";
import { SubscriptionStatus } from "../../components/SubscriptionStatus";
import { api } from "../../lib/api";
import type { Conversation, Message } from "../../src/types/frontend";

export function ChatPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user: clerkUser } = useUser();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscription, setSubscription] = useState({
    tier: "Free",
    credits: 10,
    features: "Basic chat, 10 messages per day",
    limit: 10,
  });


  useEffect(() => {
    // Check authentication using Clerk
    if (!isLoaded) return;

    if (!isSignedIn) {
      // No Clerk session, redirect to signin
      router.push("/signin");
      return;
    }

    // User is authenticated via Clerk
    // No need to store auth tokens - Clerk handles this securely via httpOnly cookies
    // We can optionally store non-sensitive user info for UI display only
    if (clerkUser) {
      localStorage.setItem("user", JSON.stringify({
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        name: clerkUser.fullName || clerkUser.firstName || "User"
      }));
    }

    loadConversations();
    loadSubscriptionInfo();
  }, [isLoaded, isSignedIn, clerkUser, router]);

  const loadConversations = async () => {
    try {
      const response = await api.getConversations();
      if (response.success && response.data) {
        setConversations(response.data);
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  const loadSubscriptionInfo = async () => {
    const storedTier = typeof window !== "undefined" ? localStorage.getItem("subscription_tier") : null;
    const storedCredits = typeof window !== "undefined" ? localStorage.getItem("user_credits") : null;

    if (storedTier || storedCredits) {
      setSubscription((prev) => ({
        ...prev,
        tier: storedTier || prev.tier,
        credits: storedCredits ? parseInt(storedCredits) : prev.credits,
      }));
    }

    try {
      const response = await api.getSubscriptionInfo();
      if (response.success && response.data) {
        setSubscription({
          tier: response.data.tier || "Free",
          credits: response.data.credits || 10,
          features: response.data.features || "Basic chat, 10 messages per day",
          limit: response.data.limit || 10,
        });
      }
    } catch (error) {
      console.error("Failed to load subscription info:", error);
    }
  };

  const createNewConversation = async () => {
    const newConv: Conversation = {
      id: "conv-" + Date.now(),
      user_id: clerkUser?.id || "unknown",
      title: "New Conversation",
      model: "llama-2-7b",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setCurrentConversation(newConv);
    setConversations((prev) => [newConv, ...prev]);
    setMessages([]);
    setSidebarOpen(false);

    try {
      const response = await api.createConversation({
        title: "New Conversation",
        model: "llama-2-7b",
      });
      if (response.success && response.data) {
        setCurrentConversation(response.data);
        setConversations((prev) => prev.map((c) => (c.id === newConv.id ? response.data! : c)));
      }
    } catch (error) {
      console.error("Failed to create conversation via API:", error);
    }
  };

  const selectConversation = async (conv: Conversation) => {
    setCurrentConversation(conv);
    setMessages([]);
    setSidebarOpen(false);

    try {
      const response = await api.getConversation(conv.id);
      if (response.success && response.data?.messages) {
        setMessages(response.data.messages);
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

      if (response.success && response.data) {
        const assistantMessage: Message = {
          id: response.data.id || "msg-" + Date.now(),
          conversation_id: currentConversation.id,
          role: "assistant",
          content: response.data.content || "Hello! How can I help you today?",
          created_at: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        setSubscription((prev) => ({
          ...prev,
          credits: response.data!.creditsRemaining,
        }));
        if (typeof window !== "undefined") {
          localStorage.setItem("user_credits", response.data!.creditsRemaining.toString());
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateMessage = async (messageId: string) => {
    console.log("Regenerating message:", messageId);
  };

  const upgradeSubscription = async () => {
    try {
      const response = await api.createCheckoutSession("pro");
      if (response.success && (response.data as { url?: string; })?.url) {
        window.location.href = (response.data as { url: string; }).url;
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      window.location.href = "/pricing";
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="auth-required">
        <div className="auth-content">
          <h1>Loading...</h1>
          <p>Initializing authentication...</p>
        </div>
      </div>
    );
  }

  // Show auth required screen if not signed in
  if (!isSignedIn) {
    return (
      <div className="auth-required">
        <div className="auth-content">
          <h1>Authentication Required</h1>
          <p>Please log in to access the chat interface.</p>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/signin")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <Header />

      <div className="chat-layout">
        <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
          <div className="sidebar-header">
            <button
              className="btn btn-primary new-chat-btn"
              onClick={createNewConversation}
              aria-label="Create new conversation"
            >
              <span className="btn-icon">+</span>
              New Chat
            </button>

            <SubscriptionStatus
              subscription={subscription}
              onUpgrade={upgradeSubscription}
            />
          </div>

          <div className="sidebar-content">
            <ConversationList
              conversations={conversations}
              currentConversation={currentConversation}
              onSelect={selectConversation}
              onDelete={deleteConversation}
            />
          </div>
        </div>

        <div className="chat-main">
          <button
            className="mobile-sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <span className="hamburger"></span>
          </button>

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
              <div className="empty-state">
                <div className="empty-content">
                  <div className="empty-icon">💬</div>
                  <h2>Welcome to AI Chat</h2>
                  <p>
                    Select a conversation from the sidebar or create a new one to start chatting
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={createNewConversation}
                  >
                    Start New Conversation
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <style jsx>
        {`
        .chat-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        .chat-layout {
          display: flex;
          height: calc(100vh - 80px);
          margin-top: 80px;
        }

        .sidebar {
          width: 320px;
          background: white;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .new-chat-btn {
          width: 100%;
          padding: 16px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .new-chat-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-icon {
          font-size: 18px;
          font-weight: 700;
        }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
        }

        .chat-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: white;
          position: relative;
        }

        .mobile-sidebar-toggle {
          display: none;
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 1000;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .hamburger {
          display: block;
          width: 20px;
          height: 2px;
          background: #4a5568;
          position: relative;
        }

        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 2px;
          background: #4a5568;
          transition: 0.3s;
        }

        .hamburger::before {
          top: -6px;
        }

        .hamburger::after {
          bottom: -6px;
        }

        .empty-state {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .empty-content {
          text-align: center;
          max-width: 400px;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 24px;
        }

        .empty-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 16px;
        }

        .empty-content p {
          color: #4a5568;
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .btn {
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .auth-required {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
        }

        .auth-content {
          text-align: center;
          padding: 40px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .auth-content h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 16px;
        }

        .auth-content p {
          color: #4a5568;
          margin-bottom: 32px;
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 900;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: 0;
            top: 80px;
            height: calc(100vh - 80px);
            transform: translateX(-100%);
            z-index: 1000;
          }

          .sidebar-open {
            transform: translateX(0);
          }

          .mobile-sidebar-toggle {
            display: block;
          }

          .sidebar-overlay {
            display: block;
          }

          .chat-main {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 280px;
          }

          .sidebar-header {
            padding: 16px;
          }

          .new-chat-btn {
            padding: 14px;
          }
        }
      `}
      </style>
    </div>
  );
}

export default ChatPage;
