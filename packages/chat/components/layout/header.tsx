import { useEffect, useState } from "react";

interface HeaderProps {
  isScrolled?: boolean;
  user?: { id: string; email: string; } | null;
}

export function Header({ isScrolled = false, user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    // Check for authenticated user if not provided
    if (!user) {
      const authToken = localStorage.getItem("auth_token");
      const userEmail = localStorage.getItem("user_email");
      const userId = localStorage.getItem("user_id");

      if (authToken && userId) {
        setCurrentUser({
          id: userId,
          email: userEmail || "demo@example.com",
        });
      }
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_credits");
    localStorage.removeItem("subscription_tier");
    window.location.href = "/";
  };

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/chat", label: "Chat" },
    { href: "/dashboard", label: "Dashboard", authRequired: true },
    { href: "/pricing", label: "Pricing" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <a href="/" onClick={closeMenu}>
              <span className="logo-icon">🤖</span>
              <span className="logo-text">AI Chat</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-list">
              {navigationItems.map((item) => {
                if (item.authRequired && !currentUser) return null;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="nav-link"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Actions */}
          <div className="user-actions">
            {currentUser
              ? (
                <div className="user-menu">
                  <div className="user-info">
                    <span className="user-avatar">
                      {currentUser.email.charAt(0).toUpperCase()}
                    </span>
                    <span className="user-email">{currentUser.email}</span>
                  </div>

                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      onClick={toggleMenu}
                      aria-label="User menu"
                      aria-expanded={isMenuOpen}
                    >
                      <span className="chevron">▼</span>
                    </button>

                    {isMenuOpen && (
                      <div className="dropdown-menu">
                        <a href="/dashboard" className="dropdown-item">
                          📊 Dashboard
                        </a>
                        <a href="/settings" className="dropdown-item">
                          ⚙️ Settings
                        </a>
                        <a href="/pricing" className="dropdown-item">
                          💎 Upgrade
                        </a>
                        <div className="dropdown-separator" />
                        <button
                          onClick={handleLogout}
                          className="dropdown-item logout"
                        >
                          🚪 Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
              : (
                <div className="auth-buttons">
                  <button
                    className="btn btn-secondary"
                    onClick={() => window.location.href = "/"}
                  >
                    Sign In
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => window.location.href = "/chat"}
                  >
                    Get Started
                  </button>
                </div>
              )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`nav-mobile ${isMenuOpen ? "open" : ""}`}>
          <nav className="mobile-nav-content">
            <ul className="mobile-nav-list">
              {navigationItems.map((item) => {
                if (item.authRequired && !currentUser) return null;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="mobile-nav-link"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {currentUser
              ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <span className="user-avatar">
                      {currentUser.email.charAt(0).toUpperCase()}
                    </span>
                    <span className="user-email">{currentUser.email}</span>
                  </div>

                  <div className="mobile-user-actions">
                    <a href="/dashboard" className="mobile-action-item">
                      📊 Dashboard
                    </a>
                    <a href="/settings" className="mobile-action-item">
                      ⚙️ Settings
                    </a>
                    <a href="/pricing" className="mobile-action-item">
                      💎 Upgrade
                    </a>
                    <button
                      onClick={handleLogout}
                      className="mobile-action-item logout"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
              )
              : (
                <div className="mobile-auth-section">
                  <button
                    className="btn btn-secondary mobile-btn"
                    onClick={() => {
                      closeMenu();
                      window.location.href = "/";
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="btn btn-primary mobile-btn"
                    onClick={() => {
                      closeMenu();
                      window.location.href = "/chat";
                    }}
                  >
                    Get Started
                  </button>
                </div>
              )}
          </nav>
        </div>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div
            className="mobile-overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </div>

      <style jsx>
        {`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s ease;
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border-bottom-color: rgba(226, 232, 240, 1);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .logo a {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #2d3748;
          font-weight: 700;
          font-size: 1.25rem;
          transition: opacity 0.2s ease;
        }

        .logo a:hover {
          opacity: 0.8;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .nav-desktop {
          display: none;
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          text-decoration: none;
          color: #4a5568;
          font-weight: 500;
          font-size: 16px;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #2d3748;
          background: #f7fafc;
        }

        .nav-link:active {
          transform: translateY(1px);
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .user-info {
          display: none;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .user-email {
          font-size: 14px;
          color: #4a5568;
          font-weight: 500;
        }

        .dropdown {
          position: relative;
        }

        .dropdown-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          color: #4a5568;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }

        .dropdown-toggle:hover {
          background: #f7fafc;
        }

        .chevron {
          font-size: 12px;
          transition: transform 0.2s ease;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          padding: 8px;
          margin-top: 8px;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 12px 16px;
          color: #4a5568;
          text-decoration: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
        }

        .dropdown-item:hover {
          background: #f7fafc;
          color: #2d3748;
        }

        .dropdown-item.logout {
          color: #e53e3e;
        }

        .dropdown-item.logout:hover {
          background: #fed7d7;
        }

        .dropdown-separator {
          height: 1px;
          background: #e2e8f0;
          margin: 8px 0;
        }

        .auth-buttons {
          display: flex;
          gap: 12px;
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
          text-decoration: none;
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

        .mobile-toggle {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          position: relative;
          z-index: 1001;
        }

        .hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: #4a5568;
          margin: 3px 0;
          transition: 0.3s;
          transform-origin: center;
        }

        .nav-mobile {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }

        .nav-mobile.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-content {
          padding: 24px 20px;
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          margin-bottom: 24px;
        }

        .mobile-nav-link {
          display: block;
          padding: 16px;
          color: #4a5568;
          text-decoration: none;
          font-weight: 500;
          border-radius: 8px;
          margin-bottom: 8px;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover {
          background: #f7fafc;
          color: #2d3748;
        }

        .mobile-user-section {
          border-top: 1px solid #e2e8f0;
          padding-top: 24px;
        }

        .mobile-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .mobile-user-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-action-item {
          display: block;
          padding: 12px 16px;
          color: #4a5568;
          text-decoration: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
          width: 100%;
        }

        .mobile-action-item:hover {
          background: #f7fafc;
          color: #2d3748;
        }

        .mobile-action-item.logout {
          color: #e53e3e;
        }

        .mobile-action-item.logout:hover {
          background: #fed7d7;
        }

        .mobile-auth-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 1px solid #e2e8f0;
          padding-top: 24px;
        }

        .mobile-btn {
          width: 100%;
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        @media (min-width: 768px) {
          .nav-desktop {
            display: block;
          }

          .user-info {
            display: flex;
          }

          .mobile-toggle {
            display: none;
          }
        }

        @media (max-width: 767px) {
          .auth-buttons {
            display: none;
          }

          .user-info {
            display: none;
          }

          .dropdown-menu {
            right: -20px;
          }
        }

        @media (min-width: 1024px) {
          .header-content {
            height: 90px;
          }

          .logo-text {
            font-size: 1.5rem;
          }

          .nav-link {
            font-size: 17px;
          }
        }
      `}
      </style>
    </header>
  );
}

export default Header;
