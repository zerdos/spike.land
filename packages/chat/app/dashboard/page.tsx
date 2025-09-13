import { useEffect, useState } from "react";
import type { Conversation, User } from "../../../src/types";
import { Header } from "../../components/layout/header";
import { api } from "../../lib/api";

interface DashboardPageProps {
  user?: User | null;
  onAuthRequired?: () => void;
}

interface DashboardStats {
  totalConversations: number;
  totalMessages: number;
  creditsUsed: number;
  creditsRemaining: number;
  subscriptionTier: string;
  memberSince: string;
}

export function DashboardPage({ user, onAuthRequired }: DashboardPageProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalConversations: 0,
    totalMessages: 0,
    creditsUsed: 0,
    creditsRemaining: 10,
    subscriptionTier: "Free",
    memberSince: new Date().toLocaleDateString(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("7days");

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken && !user) {
      onAuthRequired?.();
      return;
    }

    loadDashboardData();
  }, [user, onAuthRequired, selectedPeriod]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Load conversations
      const conversationsData = await api.getConversations();
      setConversations(conversationsData.slice(0, 5)); // Show only recent 5

      // Calculate stats from local storage and API
      const totalConversations = conversationsData.length;
      const storedCredits = localStorage.getItem("user_credits");
      const storedTier = localStorage.getItem("subscription_tier");

      // Mock some stats calculation
      const totalMessages = conversationsData.reduce((acc, conv) => {
        // Estimate 5 messages per conversation on average
        return acc + 5;
      }, 0);

      setStats({
        totalConversations,
        totalMessages,
        creditsUsed: Math.max(0, 100 - (storedCredits ? parseInt(storedCredits) : 10)),
        creditsRemaining: storedCredits ? parseInt(storedCredits) : 10,
        subscriptionTier: storedTier || "Free",
        memberSince: user?.created_at ? new Date(user.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
      });

    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getUsagePercentage = () => {
    const totalCredits = stats.creditsUsed + stats.creditsRemaining;
    return totalCredits > 0 ? (stats.creditsUsed / totalCredits) * 100 : 0;
  };

  const goToChat = (conversationId?: string) => {
    const url = conversationId ? `/chat?id=${conversationId}` : "/chat";
    window.location.href = url;
  };

  const goToPricing = () => {
    window.location.href = "/pricing";
  };

  const goToSettings = () => {
    window.location.href = "/settings";
  };

  if (!user && !localStorage.getItem("auth_token")) {
    return (
      <div className="auth-required">
        <div className="auth-content">
          <h1>Authentication Required</h1>
          <p>Please log in to access your dashboard.</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.href = "/"}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Header />

      <main className="dashboard-main">
        <div className="container">
          <header className="dashboard-header">
            <div className="header-content">
              <h1>Dashboard</h1>
              <p>Welcome back! Here's your AI chat overview.</p>
            </div>

            <div className="header-actions">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="period-selector"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="all">All time</option>
              </select>

              <button
                className="btn btn-primary"
                onClick={() => goToChat()}
              >
                New Chat
              </button>
            </div>
          </header>

          {isLoading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Loading dashboard...</p>
            </div>
          ) : (
            <div className="dashboard-content">
              {/* Stats Cards */}
              <section className="stats-section">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">💬</div>
                    <div className="stat-content">
                      <h3>{stats.totalConversations}</h3>
                      <p>Total Conversations</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">✉️</div>
                    <div className="stat-content">
                      <h3>{stats.totalMessages}</h3>
                      <p>Messages Sent</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">⚡</div>
                    <div className="stat-content">
                      <h3>{stats.creditsRemaining}</h3>
                      <p>Credits Remaining</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">👑</div>
                    <div className="stat-content">
                      <h3>{stats.subscriptionTier}</h3>
                      <p>Subscription Plan</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Usage Section */}
              <section className="usage-section">
                <div className="section-header">
                  <h2>Usage Overview</h2>
                  <button
                    className="btn btn-secondary"
                    onClick={goToPricing}
                  >
                    Upgrade Plan
                  </button>
                </div>

                <div className="usage-card">
                  <div className="usage-header">
                    <h3>Credit Usage</h3>
                    <span className="usage-text">
                      {stats.creditsUsed} used • {stats.creditsRemaining} remaining
                    </span>
                  </div>

                  <div className="usage-bar">
                    <div
                      className="usage-progress"
                      style={{ width: `${getUsagePercentage()}%` }}
                    />
                  </div>

                  <div className="usage-details">
                    <div className="usage-detail">
                      <span className="detail-label">Plan</span>
                      <span className="detail-value">{stats.subscriptionTier}</span>
                    </div>
                    <div className="usage-detail">
                      <span className="detail-label">Member since</span>
                      <span className="detail-value">{stats.memberSince}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Recent Conversations */}
              <section className="conversations-section">
                <div className="section-header">
                  <h2>Recent Conversations</h2>
                  <button
                    className="btn btn-secondary"
                    onClick={() => goToChat()}
                  >
                    View All
                  </button>
                </div>

                <div className="conversations-grid">
                  {conversations.length > 0 ? (
                    conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className="conversation-card"
                        onClick={() => goToChat(conversation.id)}
                      >
                        <div className="conversation-header">
                          <h3>{conversation.title}</h3>
                          <span className="conversation-model">{conversation.model}</span>
                        </div>
                        <p className="conversation-date">
                          {formatDate(conversation.updated_at)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="empty-conversations">
                      <div className="empty-icon">💬</div>
                      <h3>No conversations yet</h3>
                      <p>Start your first AI chat conversation!</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => goToChat()}
                      >
                        Start Chatting
                      </button>
                    </div>
                  )}
                </div>
              </section>

              {/* Quick Actions */}
              <section className="actions-section">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                  <button
                    className="action-card"
                    onClick={() => goToChat()}
                  >
                    <div className="action-icon">💬</div>
                    <h3>Start New Chat</h3>
                    <p>Begin a conversation with AI</p>
                  </button>

                  <button
                    className="action-card"
                    onClick={goToPricing}
                  >
                    <div className="action-icon">⬆️</div>
                    <h3>Upgrade Plan</h3>
                    <p>Get more credits and features</p>
                  </button>

                  <button
                    className="action-card"
                    onClick={goToSettings}
                  >
                    <div className="action-icon">⚙️</div>
                    <h3>Settings</h3>
                    <p>Manage your account preferences</p>
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .dashboard-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        .dashboard-main {
          padding-top: 80px;
          min-height: calc(100vh - 80px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .header-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .header-content p {
          color: #4a5568;
          font-size: 1.1rem;
        }

        .header-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .period-selector {
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          font-size: 14px;
          color: #4a5568;
          cursor: pointer;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
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

        .btn-secondary {
          background: white;
          color: #667eea;
          border: 1px solid #667eea;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
        }

        .loading-state {
          text-align: center;
          padding: 80px 20px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e2e8f0;
          border-top: 3px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content h3 {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 4px;
        }

        .stat-content p {
          color: #4a5568;
          font-size: 14px;
        }

        .usage-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .usage-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .usage-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
        }

        .usage-text {
          font-size: 14px;
          color: #4a5568;
        }

        .usage-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          margin-bottom: 16px;
          overflow: hidden;
        }

        .usage-progress {
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s ease;
        }

        .usage-details {
          display: flex;
          justify-content: space-between;
        }

        .usage-detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-label {
          font-size: 12px;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
        }

        .conversations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        .conversation-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .conversation-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .conversation-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .conversation-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .conversation-model {
          font-size: 12px;
          background: #e2e8f0;
          color: #4a5568;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .conversation-date {
          font-size: 14px;
          color: #4a5568;
          margin: 0;
        }

        .empty-conversations {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .empty-conversations h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .empty-conversations p {
          color: #4a5568;
          margin-bottom: 24px;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .action-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          border: none;
          cursor: pointer;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .action-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }

        .action-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .action-card p {
          color: #4a5568;
          font-size: 14px;
          margin: 0;
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

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            flex-direction: column;
          }

          .period-selector {
            width: 100%;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .usage-details {
            flex-direction: column;
            gap: 12px;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default DashboardPage;