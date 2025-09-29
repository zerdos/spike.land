"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    nickname: "",
    firstName: "",
    lastName: "",
    githubUsername: "",
  });
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/signin");
      return;
    }

    // Load initial data from user metadata
    const metadata = (user.publicMetadata as Record<string, unknown>) || {};
    setFormData({
      nickname: (metadata.nickname as string) || user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      githubUsername: (metadata.githubUsername as string) || "",
    });
  }, [isLoaded, user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setSavedMessage("");

    try {
      // Update Clerk user profile and public metadata in a single call
      await user.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.nickname,
        publicMetadata: {
          ...user.publicMetadata, // Preserve existing metadata
          nickname: formData.nickname,
          githubUsername: formData.githubUsername,
        },
      });

      setSavedMessage("Profile updated successfully!");
      setIsEditing(false);

      // Clear message after 3 seconds
      setTimeout(() => setSavedMessage(""), 3000);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setSavedMessage("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;

    // Reset to original values
    const metadata = (user.publicMetadata as Record<string, unknown>) || {};
    setFormData({
      nickname: (metadata.nickname as string) || user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      githubUsername: (metadata.githubUsername as string) || "",
    });
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (!isLoaded) {
    return (
      <div className="profile-page">
        <Header />
        <main className="profile-container">
          <div className="profile-loading">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const avatarUrl = user.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName || user.emailAddresses[0]?.emailAddress}`;
  const displayName = formData.nickname || user.fullName || user.firstName || user.emailAddresses[0]?.emailAddress || "User";

  return (
    <div className="profile-page">
      <Header />

      <main className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h1>Profile Settings</h1>
            <p>Manage your account information and preferences</p>
          </div>

          {savedMessage && (
            <div className={`profile-message ${savedMessage.includes("Failed") ? "error" : "success"}`}>
              {savedMessage}
            </div>
          )}

          <div className="profile-content">
            <div className="profile-avatar-section">
              <img
                src={avatarUrl}
                alt={displayName}
                className="profile-avatar"
              />
              <div className="profile-avatar-info">
                <h2>{displayName}</h2>
                <p>{user.emailAddresses[0]?.emailAddress}</p>
                {formData.githubUsername && (
                  <a
                    href={`https://github.com/${formData.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-github-link"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    @{formData.githubUsername}
                  </a>
                )}
              </div>
            </div>

            <div className="profile-form">
              <div className="profile-form-group">
                <label htmlFor="nickname">Nickname</label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your nickname"
                />
              </div>

              <div className="profile-form-row">
                <div className="profile-form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="profile-form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="profile-form-group">
                <label htmlFor="githubUsername">GitHub Username</label>
                <div className="profile-input-with-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  <input
                    type="text"
                    id="githubUsername"
                    name="githubUsername"
                    value={formData.githubUsername}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your GitHub username"
                  />
                </div>
              </div>

              <div className="profile-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={user.emailAddresses[0]?.emailAddress || ""}
                  disabled
                  className="profile-input-readonly"
                />
                <span className="profile-input-hint">Email cannot be changed here</span>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => router.push("/chat")}
                >
                  Back to Chat
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </>
            )}
          </div>

          <div className="profile-danger-zone">
            <h3>Danger Zone</h3>
            <p>Once you sign out, you&apos;ll need to sign in again to access your account.</p>
            <button
              className="btn btn-danger"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .profile-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .profile-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .profile-loading {
          text-align: center;
          font-size: 18px;
          color: #4a5568;
          padding: 60px 0;
        }

        .profile-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .profile-header {
          padding: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .profile-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .profile-header p {
          font-size: 16px;
          opacity: 0.9;
        }

        .profile-message {
          margin: 24px 32px 0;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .profile-message.success {
          background: #c6f6d5;
          color: #22543d;
          border: 1px solid #9ae6b4;
        }

        .profile-message.error {
          background: #fed7d7;
          color: #742a2a;
          border: 1px solid #fc8181;
        }

        .profile-content {
          padding: 32px;
        }

        .profile-avatar-section {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid #e2e8f0;
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #e2e8f0;
        }

        .profile-avatar-info {
          flex: 1;
        }

        .profile-avatar-info h2 {
          font-size: 24px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 4px;
        }

        .profile-avatar-info p {
          font-size: 14px;
          color: #718096;
          margin-bottom: 8px;
        }

        .profile-github-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #4a5568;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .profile-github-link:hover {
          color: #2d3748;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .profile-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .profile-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .profile-form-group label {
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
        }

        .profile-form-group input {
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.2s ease;
        }

        .profile-form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .profile-form-group input:disabled {
          background: #f7fafc;
          cursor: not-allowed;
          color: #718096;
        }

        .profile-input-readonly {
          background: #f7fafc !important;
          color: #718096 !important;
        }

        .profile-input-hint {
          font-size: 12px;
          color: #a0aec0;
        }

        .profile-input-with-icon {
          position: relative;
        }

        .profile-input-with-icon svg {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
        }

        .profile-input-with-icon input {
          padding-left: 44px;
        }

        .profile-actions {
          display: flex;
          gap: 12px;
          padding: 0 32px 32px;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #f7fafc;
        }

        .profile-danger-zone {
          padding: 32px;
          background: #fef5f5;
          border-top: 1px solid #fed7d7;
        }

        .profile-danger-zone h3 {
          font-size: 18px;
          font-weight: 600;
          color: #c53030;
          margin-bottom: 8px;
        }

        .profile-danger-zone p {
          font-size: 14px;
          color: #742a2a;
          margin-bottom: 16px;
        }

        .btn-danger {
          background: #e53e3e;
          color: white;
        }

        .btn-danger:hover:not(:disabled) {
          background: #c53030;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(229, 62, 62, 0.4);
        }

        @media (max-width: 640px) {
          .profile-avatar-section {
            flex-direction: column;
            text-align: center;
          }

          .profile-form-row {
            grid-template-columns: 1fr;
          }

          .profile-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}