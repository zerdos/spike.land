import type { UserResource } from "@clerk/types";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../lib/clerk";

interface UserButtonProps {
  user: UserResource;
  onSignOut?: () => void;
}

export function UserButton({ user, onSignOut }: UserButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      onSignOut?.();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const displayName = user.firstName || user.username || user.emailAddresses[0]?.emailAddress ||
    "User";
  const userEmail = user.emailAddresses[0]?.emailAddress;
  const avatarUrl = user.imageUrl;

  return (
    <div className="user-button" ref={dropdownRef}>
      <button
        className="user-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="user-avatar">
          {avatarUrl
            ? <img src={avatarUrl} alt={displayName} className="avatar-image" />
            : (
              <div className="avatar-fallback">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
        </div>
        <div className="user-info">
          <div className="user-name">{displayName}</div>
          {userEmail && <div className="user-email">{userEmail}</div>}
        </div>
        <div className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
          ▼
        </div>
      </button>

      {isOpen && (
        <div className="user-dropdown">
          <div className="dropdown-header">
            <div className="dropdown-user-info">
              <div className="dropdown-name">{displayName}</div>
              {userEmail && <div className="dropdown-email">{userEmail}</div>}
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <button
            className="dropdown-item"
            onClick={() => {
              // Open Clerk user profile
              // clerk.openUserProfile();
              setIsOpen(false);
            }}
          >
            Manage Account
          </button>

          <div className="dropdown-divider"></div>

          <button
            className="dropdown-item danger"
            onClick={() => {
              handleSignOut();
              setIsOpen(false);
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
