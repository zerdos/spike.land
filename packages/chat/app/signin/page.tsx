"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDemoLogin = () => {
    setIsLoading(true);

    // Store demo auth token
    localStorage.setItem("auth_token", "demo-token-" + Date.now());
    localStorage.setItem("user_id", "demo-user-" + Date.now());

    // Redirect to chat after a short delay
    setTimeout(() => {
      router.push("/chat");
    }, 500);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // For now, use demo authentication
    localStorage.setItem("auth_token", "user-token-" + Date.now());
    localStorage.setItem("user_id", "user-" + Date.now());
    localStorage.setItem("user_email", email);

    setTimeout(() => {
      router.push("/chat");
    }, 500);
  };

  return (
    <div className="signin-page">
      <Header />

      <main className="signin-container">
        <div className="signin-card">
          <h1>Sign In to AI Chat</h1>
          <p className="signin-subtitle">Welcome back! Please sign in to continue.</p>

          <form onSubmit={handleSignIn} className="signin-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary signin-btn"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            onClick={handleDemoLogin}
            className="btn btn-secondary demo-btn"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Continue with Demo Account"}
          </button>

          <p className="signup-link">
            Don't have an account?{" "}
            <a href="/signup">Sign up for free</a>
          </p>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .signin-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .signin-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 160px);
          padding: 40px 20px;
          margin-top: 80px;
        }

        .signin-card {
          background: white;
          border-radius: 20px;
          padding: 48px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 480px;
        }

        .signin-card h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 12px;
          text-align: center;
        }

        .signin-subtitle {
          color: #4a5568;
          text-align: center;
          margin-bottom: 32px;
        }

        .signin-form {
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group input:disabled {
          background: #f7fafc;
          cursor: not-allowed;
        }

        .btn {
          width: 100%;
          padding: 14px 24px;
          border-radius: 10px;
          font-size: 16px;
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

        .divider {
          text-align: center;
          margin: 24px 0;
          position: relative;
        }

        .divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: #e2e8f0;
        }

        .divider span {
          background: white;
          padding: 0 16px;
          position: relative;
          color: #718096;
          font-size: 14px;
        }

        .signup-link {
          text-align: center;
          margin-top: 24px;
          color: #4a5568;
        }

        .signup-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .signin-card {
            padding: 32px 24px;
          }

          .signin-card h1 {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}