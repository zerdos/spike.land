"use client";

import { useEffect, useState } from "react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";
import type { User } from "../src/types";

interface LandingPageProps {
  onAuth?: (user: User) => void;
}

export function LandingPage({ onAuth }: LandingPageProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartChatting = () => {
    setIsLoading(true);

    const mockUser: User = {
      id: "demo-user-" + Date.now(),
      email: "demo@example.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setTimeout(() => {
      if (onAuth) {
        onAuth(mockUser);
      } else {
        // Navigate to chat page if no auth handler
        window.location.href = "/chat";
      }
      setIsLoading(false);
    }, 500);
  };

  const handleLogin = () => {
    window.location.href = "/signin";
  };

  return (
    <div className="landing-page">
      <Header isScrolled={isScrolled} />

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to AI Chat Assistant
            </h1>
            <p className="hero-subtitle">
              Experience the power of AI-driven conversations with state-of-the-art language models
            </p>

            <div className="hero-buttons">
              <button
                className="btn btn-primary start-chatting-btn"
                onClick={handleStartChatting}
                disabled={isLoading}
                aria-label="Start a new chat session"
              >
                {isLoading
                  ? (
                    <>
                      <span className="spinner" />
                      Loading...
                    </>
                  )
                  : (
                    "Start Chatting"
                  )}
              </button>

              <button
                className="btn btn-secondary login-btn"
                onClick={handleLogin}
                disabled={isLoading}
                aria-label="Login to your account"
              >
                Login
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="chat-preview">
              <div className="chat-bubble user">
                How can AI help me today?
              </div>
              <div className="chat-bubble assistant">
                I&apos;m here to help with coding, writing, analysis, and more!
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Why Choose Our AI Chat?</h2>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🧠</div>
                <h3>Intelligent Responses</h3>
                <p>Get thoughtful, context-aware answers powered by advanced language models</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Real-time Chat</h3>
                <p>Experience lightning-fast responses with live collaboration features</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">💎</div>
                <h3>Flexible Pricing</h3>
                <p>Start free and upgrade for unlimited access with premium features</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure & Private</h3>
                <p>Your conversations are encrypted and protected with enterprise-grade security</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Cross-Platform</h3>
                <p>Access your chats from any device with our responsive design</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Specialized Models</h3>
                <p>Choose from different AI models optimized for various tasks</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Start Your AI Journey?</h2>
              <p>Join thousands of users already experiencing the future of AI chat</p>
              <button
                className="btn btn-primary cta-button"
                onClick={handleStartChatting}
                disabled={isLoading}
              >
                Get Started Free
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>
        {`
        .landing-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .main-content {
          padding-top: 80px;
        }

        .hero-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          min-height: calc(100vh - 160px);
          padding: 80px 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-content {
          max-width: 500px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 24px;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #4a5568;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 140px;
          justify-content: center;
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
          border: 2px solid #667eea;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .btn-secondary:hover:not(:disabled) {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .chat-preview {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .chat-bubble {
          padding: 12px 16px;
          border-radius: 16px;
          margin-bottom: 12px;
          animation: fadeInUp 0.8s ease;
        }

        .chat-bubble.user {
          background: #667eea;
          color: white;
          margin-left: 40px;
          border-bottom-right-radius: 4px;
        }

        .chat-bubble.assistant {
          background: #f7fafc;
          color: #2d3748;
          margin-right: 40px;
          border-bottom-left-radius: 4px;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .features-section {
          padding: 100px 40px;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 60px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }

        .feature-card {
          padding: 32px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 16px;
        }

        .feature-card p {
          color: #4a5568;
          line-height: 1.6;
        }

        .cta-section {
          padding: 100px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-content p {
          font-size: 1.25rem;
          margin-bottom: 32px;
          opacity: 0.9;
        }

        .cta-button {
          background: white;
          color: #667eea;
          font-size: 18px;
          padding: 18px 36px;
        }

        .cta-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
            padding: 40px 20px;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}
      </style>
    </div>
  );
}

export default LandingPage;
