"use client";

import { useEffect, useState } from "react";
import type { User } from "../../src/types";
import { Header } from "../../components/layout/header";
import { api as _api } from "../../lib/api";

interface SettingsPageProps {
  user?: User | null;
  onAuthRequired?: () => void;
}

interface UserSettings {
  theme: "light" | "dark" | "system";
  language: string;
  notifications: {
    email: boolean;
    browser: boolean;
    marketing: boolean;
  };
  privacy: {
    dataCollection: boolean;
    analytics: boolean;
    shareUsage: boolean;
  };
  chat: {
    defaultModel: string;
    temperature: number;
    maxTokens: number;
    autoSave: boolean;
  };
}

export function SettingsPage({ user, onAuthRequired }: SettingsPageProps) {
  const [settings, setSettings] = useState<UserSettings>({
    theme: "system",
    language: "en",
    notifications: {
      email: true,
      browser: true,
      marketing: false,
    },
    privacy: {
      dataCollection: true,
      analytics: true,
      shareUsage: false,
    },
    chat: {
      defaultModel: "llama-2-7b",
      temperature: 0.7,
      maxTokens: 2048,
      autoSave: true,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken && !user) {
      onAuthRequired?.();
      return;
    }

    loadSettings();
  }, [user, onAuthRequired]);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      // Load settings from localStorage for demo
      const savedSettings = localStorage.getItem("user_settings");
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage for demo
      localStorage.setItem("user_settings", JSON.stringify(settings));

      // In a real app, you would save to the API
      // await api.updateUserSettings(settings);

      // Show success feedback
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      setIsSaving(false);
    }
  };

  const handleSettingChange = (section: keyof UserSettings, key: string, value: unknown) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        // await api.deleteAccount();
        localStorage.clear();
        window.location.href = "/";
      } catch (error) {
        console.error("Failed to delete account:", error);
      }
    }
    setShowDeleteModal(false);
  };

  const exportData = async () => {
    try {
      // In a real app, you would fetch all user data from the API
      const userData = {
        user,
        settings,
        conversations: JSON.parse(localStorage.getItem("conversations") || "[]"),
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(userData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-chat-data-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export data:", error);
    }
  };

  const tabs = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "chat", name: "Chat", icon: "💬" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "privacy", name: "Privacy", icon: "🔒" },
    { id: "account", name: "Account", icon: "👤" },
  ];

  const modelOptions = [
    { value: "llama-2-7b", label: "Llama 2 7B" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "claude-3-haiku", label: "Claude 3 Haiku" },
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "zh", label: "中文" },
    { value: "ja", label: "日本語" },
  ];

  if (!user && !localStorage.getItem("auth_token")) {
    return (
      <div className="auth-required">
        <div className="auth-content">
          <h1>Authentication Required</h1>
          <p>Please log in to access your settings.</p>
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
    <div className="settings-page">
      <Header />

      <main className="settings-main">
        <div className="container">
          <header className="settings-header">
            <h1>Settings</h1>
            <p>Manage your account preferences and chat settings</p>
          </header>

          <div className="settings-layout">
            {/* Sidebar */}
            <nav className="settings-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="nav-icon">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>

            {/* Content */}
            <div className="settings-content">
              {isLoading
                ? (
                  <div className="loading-state">
                    <div className="loading-spinner" />
                    <p>Loading settings...</p>
                  </div>
                )
                : (
                  <>
                    {activeTab === "general" && (
                      <div className="settings-section">
                        <h2>General Settings</h2>

                        <div className="setting-group">
                          <label htmlFor="theme">Theme</label>
                          <select
                            id="theme"
                            value={settings.theme}
                            onChange={(e) => handleSettingChange("theme", "", e.target.value)}
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="system">System</option>
                          </select>
                        </div>

                        <div className="setting-group">
                          <label htmlFor="language">Language</label>
                          <select
                            id="language"
                            value={settings.language}
                            onChange={(e) => handleSettingChange("language", "", e.target.value)}
                          >
                            {languageOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {activeTab === "chat" && (
                      <div className="settings-section">
                        <h2>Chat Settings</h2>

                        <div className="setting-group">
                          <label htmlFor="defaultModel">Default AI Model</label>
                          <select
                            id="defaultModel"
                            value={settings.chat.defaultModel}
                            onChange={(e) =>
                              handleSettingChange("chat", "defaultModel", e.target.value)}
                          >
                            {modelOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="setting-group">
                          <label htmlFor="temperature">
                            Temperature: {settings.chat.temperature}
                          </label>
                          <input
                            type="range"
                            id="temperature"
                            min="0"
                            max="2"
                            step="0.1"
                            value={settings.chat.temperature}
                            onChange={(e) =>
                              handleSettingChange(
                                "chat",
                                "temperature",
                                parseFloat(e.target.value),
                              )}
                          />
                          <div className="range-labels">
                            <span>Focused</span>
                            <span>Creative</span>
                          </div>
                        </div>

                        <div className="setting-group">
                          <label htmlFor="maxTokens">Max Tokens</label>
                          <input
                            type="number"
                            id="maxTokens"
                            min="100"
                            max="4096"
                            value={settings.chat.maxTokens}
                            onChange={(e) =>
                              handleSettingChange("chat", "maxTokens", parseInt(e.target.value))}
                          />
                        </div>

                        <div className="setting-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={settings.chat.autoSave}
                              onChange={(e) =>
                                handleSettingChange("chat", "autoSave", e.target.checked)}
                            />
                            Auto-save conversations
                          </label>
                        </div>
                      </div>
                    )}

                    {activeTab === "notifications" && (
                      <div className="settings-section">
                        <h2>Notification Settings</h2>

                        <div className="setting-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={settings.notifications.email}
                              onChange={(e) =>
                                handleSettingChange("notifications", "email", e.target.checked)}
                            />
                            Email notifications
                          </label>
                          <p className="setting-description">
                            Receive important updates and notifications via email
                          </p>
                        </div>

                        <div className="setting-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={settings.notifications.browser}
                              onChange={(e) =>
                                handleSettingChange("notifications", "browser", e.target.checked)}
                            />
                            Browser notifications
                          </label>
                          <p className="setting-description">
                            Show desktop notifications for new messages
                          </p>
                        </div>

                        <div className="setting-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={settings.notifications.marketing}
                              onChange={(e) =>
                                handleSettingChange("notifications", "marketing", e.target.checked)}
                            />
                            Marketing emails
                          </label>
                          <p className="setting-description">
                            Receive updates about new features and special offers
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === "privacy" && (
                      <div className="settings-section">
                        <h2>Privacy Settings</h2>

                        <div className="setting-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={settings.privacy.dataCollection}
                              onChange={(e) =>
                                handleSettingChange("privacy", "dataCollection", e.target.checked)}
                            />
                            Allow data collection
                          </label>
                          <p className="setting-description">
                            Help improve our service by sharing anonymous usage data
                          </p>
                        </div>

                        <div className="setting-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={settings.privacy.analytics}
                              onChange={(e) =>
                                handleSettingChange("privacy", "analytics", e.target.checked)}
                            />
                            Analytics and performance
                          </label>
                          <p className="setting-description">
                            Allow us to analyze usage patterns to improve performance
                          </p>
                        </div>

                        <div className="setting-group">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={settings.privacy.shareUsage}
                              onChange={(e) =>
                                handleSettingChange("privacy", "shareUsage", e.target.checked)}
                            />
                            Share usage statistics
                          </label>
                          <p className="setting-description">
                            Share anonymous usage statistics with third parties
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === "account" && (
                      <div className="settings-section">
                        <h2>Account Management</h2>

                        <div className="account-info">
                          <div className="info-item">
                            <label>Email</label>
                            <span>{user?.email || "demo@example.com"}</span>
                          </div>
                          <div className="info-item">
                            <label>Member since</label>
                            <span>
                              {user?.created_at
                                ? new Date(user.created_at).toLocaleDateString()
                                : new Date().toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="account-actions">
                          <button
                            className="btn btn-secondary"
                            onClick={exportData}
                          >
                            Export My Data
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={() => setShowDeleteModal(true)}
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="settings-footer">
                      <button
                        className="btn btn-primary"
                        onClick={saveSettings}
                        disabled={isSaving}
                      >
                        {isSaving
                          ? (
                            <>
                              <span className="spinner" />
                              Saving...
                            </>
                          )
                          : (
                            "Save Changes"
                          )}
                      </button>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </main>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Account</h3>
            <p>
              Are you sure you want to delete your account? This will permanently remove all your
              conversations and data. This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>
        {`
        .settings-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        .settings-main {
          padding-top: 80px;
          min-height: calc(100vh - 80px);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .settings-header {
          margin-bottom: 40px;
        }

        .settings-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .settings-header p {
          color: #4a5568;
          font-size: 1.1rem;
        }

        .settings-layout {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 40px;
        }

        .settings-nav {
          background: white;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          height: fit-content;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 16px;
          border: none;
          background: none;
          color: #4a5568;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
        }

        .nav-item:hover {
          background: #f7fafc;
          color: #2d3748;
        }

        .nav-item.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .nav-icon {
          font-size: 16px;
        }

        .settings-content {
          background: white;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .loading-state {
          text-align: center;
          padding: 60px 20px;
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

        .settings-section h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e2e8f0;
        }

        .setting-group {
          margin-bottom: 24px;
        }

        .setting-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .setting-group select,
        .setting-group input[type="text"],
        .setting-group input[type="number"] {
          width: 100%;
          max-width: 300px;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.2s ease;
        }

        .setting-group select:focus,
        .setting-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .setting-group input[type="range"] {
          width: 100%;
          max-width: 300px;
          margin: 8px 0;
        }

        .range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #4a5568;
          max-width: 300px;
        }

        .checkbox-label {
          display: flex !important;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .checkbox-label input[type="checkbox"] {
          width: auto !important;
          max-width: none !important;
        }

        .setting-description {
          font-size: 13px;
          color: #4a5568;
          margin-top: 8px;
          margin-bottom: 0;
        }

        .account-info {
          background: #f7fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-item label {
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .info-item span {
          color: #4a5568;
        }

        .account-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
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
          gap: 8px;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .btn-secondary {
          background: white;
          color: #667eea;
          border: 1px solid #667eea;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #667eea;
          color: white;
        }

        .btn-danger {
          background: #e53e3e;
          color: white;
        }

        .btn-danger:hover:not(:disabled) {
          background: #c53030;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .settings-footer {
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
          margin-top: 32px;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal {
          background: white;
          border-radius: 12px;
          padding: 32px;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .modal h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 16px;
        }

        .modal p {
          color: #4a5568;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
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
          .settings-layout {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .settings-nav {
            display: flex;
            overflow-x: auto;
            gap: 8px;
            padding: 16px 0;
            background: none;
            box-shadow: none;
          }

          .nav-item {
            white-space: nowrap;
            min-width: auto;
            padding: 12px 16px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .nav-item.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .settings-content {
            padding: 24px;
          }

          .account-actions {
            flex-direction: column;
          }

          .modal {
            margin: 20px;
            padding: 24px;
          }

          .modal-actions {
            flex-direction: column;
          }
        }
      `}
      </style>
    </div>
  );
}

export default SettingsPage;
