"use client";

import { useState, useRef, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export function UserAvatar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setIsDropdownOpen(false);
  };

  const avatarUrl = user.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName || user.emailAddresses[0]?.emailAddress}`;
  const displayName = user.fullName || user.firstName || user.emailAddresses[0]?.emailAddress || "User";

  return (
    <div className="user-avatar-container" ref={dropdownRef}>
      <button
        className="user-avatar-button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label="User menu"
        aria-expanded={isDropdownOpen}
      >
        <img
          src={avatarUrl}
          alt={displayName}
          className="user-avatar-image"
        />
        <span className="user-avatar-name">{displayName}</span>
        <svg
          className={`user-avatar-chevron ${isDropdownOpen ? "open" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="user-dropdown-menu">
          <div className="user-dropdown-header">
            <img
              src={avatarUrl}
              alt={displayName}
              className="user-dropdown-avatar"
            />
            <div className="user-dropdown-info">
              <div className="user-dropdown-name">{displayName}</div>
              <div className="user-dropdown-email">
                {user.emailAddresses[0]?.emailAddress}
              </div>
            </div>
          </div>

          <div className="user-dropdown-divider" />

          <button
            className="user-dropdown-item"
            onClick={handleProfileClick}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 14C2 11.7909 4.68629 10 8 10C11.3137 10 14 11.7909 14 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Profile Settings</span>
          </button>

          <button
            className="user-dropdown-item"
            onClick={() => router.push("/dashboard")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect
                x="2"
                y="2"
                width="5"
                height="5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="9"
                y="2"
                width="5"
                height="5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="2"
                y="9"
                width="5"
                height="5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="9"
                y="9"
                width="5"
                height="5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Dashboard</span>
          </button>

          <div className="user-dropdown-divider" />

          <button
            className="user-dropdown-item user-dropdown-signout"
            onClick={handleSignOut}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 11L14 8L11 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 8H6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      )}

      <style jsx>{`
        .user-avatar-container {
          position: relative;
        }

        .user-avatar-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .user-avatar-button:hover {
          background: #f7fafc;
          border-color: #cbd5e0;
        }

        .user-avatar-image {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-avatar-name {
          font-size: 14px;
          font-weight: 500;
          color: #2d3748;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-avatar-chevron {
          transition: transform 0.2s ease;
          color: #4a5568;
        }

        .user-avatar-chevron.open {
          transform: rotate(180deg);
        }

        .user-dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          width: 280px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          animation: dropdownFadeIn 0.2s ease;
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .user-dropdown-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
        }

        .user-dropdown-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-dropdown-info {
          flex: 1;
          min-width: 0;
        }

        .user-dropdown-name {
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-dropdown-email {
          font-size: 12px;
          color: #718096;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-dropdown-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 0;
        }

        .user-dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #4a5568;
          text-align: left;
          transition: all 0.2s ease;
        }

        .user-dropdown-item:hover {
          background: #f7fafc;
          color: #2d3748;
        }

        .user-dropdown-item svg {
          flex-shrink: 0;
        }

        .user-dropdown-signout {
          color: #e53e3e;
        }

        .user-dropdown-signout:hover {
          background: #fff5f5;
          color: #c53030;
        }

        @media (max-width: 640px) {
          .user-avatar-name {
            display: none;
          }

          .user-dropdown-menu {
            width: 240px;
          }
        }
      `}</style>
    </div>
  );
}