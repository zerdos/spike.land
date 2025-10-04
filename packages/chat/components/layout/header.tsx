"use client";

import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { UserAvatar } from "../UserAvatar";

interface HeaderProps {
  isScrolled?: boolean;
}

export function Header({ isScrolled = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();


  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/chat", label: "Chat" },
    { href: "/dashboard", label: "Dashboard", authRequired: true },
    { href: "/profile", label: "Profile", authRequired: true },
    { href: "/pricing", label: "Pricing" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-[20px] border-b border-gray-200/80 transition-all duration-300 ${isScrolled ? "bg-white/98 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border-gray-200" : ""}`}>
      <div className="max-w-[1200px] mx-auto px-5 relative">
        <div className="flex items-center justify-between h-20">
          <div>
            <a href="/" onClick={closeMenu} className="flex items-center gap-3 no-underline text-gray-800 font-bold text-xl transition-opacity duration-200 hover:opacity-80">
              <span className="text-3xl">🤖</span>
              <span className="lg:text-2xl">AI Chat</span>
            </a>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 list-none m-0 p-0">
              {navigationItems.map((item) => {
                if (item.authRequired && !isSignedIn) return null;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="no-underline text-gray-600 font-medium text-base lg:text-[17px] px-4 py-2 rounded-lg transition-all duration-200 relative hover:text-gray-800 hover:bg-gray-50 active:translate-y-px"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {isLoaded && isSignedIn && user ? (
              <UserAvatar />
            ) : (
              <div className="hidden md:flex gap-3">
                <button
                  className="px-6 py-3 rounded-lg text-sm font-semibold border border-[#667eea] cursor-pointer transition-all duration-200 inline-flex items-center justify-center no-underline bg-white text-[#667eea] hover:bg-[#667eea] hover:text-white"
                  onClick={() => window.location.href = "/signin"}
                >
                  Sign In
                </button>
                <button
                  className="px-6 py-3 rounded-lg text-sm font-semibold border-none cursor-pointer transition-all duration-200 inline-flex items-center justify-center no-underline bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-[0_4px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.6)]"
                  onClick={() => window.location.href = "/signup"}
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          <button
            className="flex flex-col justify-center w-8 h-8 bg-transparent border-none cursor-pointer p-0 relative z-[1001] md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="flex flex-col gap-[3px]">
              <span className="block w-5 h-0.5 bg-gray-600 transition-all duration-300 origin-center"></span>
              <span className="block w-5 h-0.5 bg-gray-600 transition-all duration-300 origin-center"></span>
              <span className="block w-5 h-0.5 bg-gray-600 transition-all duration-300 origin-center"></span>
            </span>
          </button>
        </div>

        <div className={`absolute top-full left-0 right-0 bg-white border-b border-gray-200 transition-all duration-300 max-h-[calc(100vh-80px)] overflow-y-auto ${isMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"}`}>
          <nav className="p-6 px-5">
            <ul className="list-none m-0 p-0 mb-6">
              {navigationItems.map((item) => {
                if (item.authRequired && !isSignedIn) return null;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block px-4 py-4 text-gray-600 no-underline font-medium rounded-lg mb-2 transition-all duration-200 hover:bg-gray-50 hover:text-gray-800"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {isLoaded && isSignedIn && user
              ? (
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {(user.firstName || user.emailAddresses[0]?.emailAddress || "U").charAt(0).toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600 font-medium">{user.emailAddresses[0]?.emailAddress || ""}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a href="/dashboard" className="block px-4 py-3 text-gray-600 no-underline rounded-lg text-sm font-medium transition-all duration-200 border-none bg-transparent cursor-pointer text-left w-full hover:bg-gray-50 hover:text-gray-800">
                      📊 Dashboard
                    </a>
                    <a href="/profile" className="block px-4 py-3 text-gray-600 no-underline rounded-lg text-sm font-medium transition-all duration-200 border-none bg-transparent cursor-pointer text-left w-full hover:bg-gray-50 hover:text-gray-800">
                      👤 Profile
                    </a>
                    <a href="/settings" className="block px-4 py-3 text-gray-600 no-underline rounded-lg text-sm font-medium transition-all duration-200 border-none bg-transparent cursor-pointer text-left w-full hover:bg-gray-50 hover:text-gray-800">
                      ⚙️ Settings
                    </a>
                    <a href="/pricing" className="block px-4 py-3 text-gray-600 no-underline rounded-lg text-sm font-medium transition-all duration-200 border-none bg-transparent cursor-pointer text-left w-full hover:bg-gray-50 hover:text-gray-800">
                      💎 Upgrade
                    </a>
                  </div>
                </div>
              )
              : (
                <div className="flex flex-col gap-3 border-t border-gray-200 pt-6">
                  <button
                    className="px-6 py-3 rounded-lg text-sm font-semibold border border-[#667eea] cursor-pointer transition-all duration-200 inline-flex items-center justify-center no-underline w-full bg-white text-[#667eea] hover:bg-[#667eea] hover:text-white"
                    onClick={() => {
                      closeMenu();
                      window.location.href = "/signin";
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="px-6 py-3 rounded-lg text-sm font-semibold border-none cursor-pointer transition-all duration-200 inline-flex items-center justify-center no-underline w-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-[0_4px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.6)]"
                    onClick={() => {
                      closeMenu();
                      window.location.href = "/signup";
                    }}
                  >
                    Get Started
                  </button>
                </div>
              )}
          </nav>
        </div>

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[999]"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
}

export default Header;
