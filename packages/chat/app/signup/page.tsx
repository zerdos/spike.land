"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    // For now, use demo authentication
    localStorage.setItem("auth_token", "user-token-" + Date.now());
    localStorage.setItem("user_id", "user-" + Date.now());
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_name", name);

    setTimeout(() => {
      router.push("/chat");
    }, 500);
  };

  return (
    <div className="signup-page">
      <Header />

      <main className="signup-container">
        <div className="signup-card">
          <h1>Create Your Account</h1>
          <p className="signup-subtitle">Start your AI chat journey today</p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </div>

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
                placeholder="Create a password (min 6 characters)"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary signup-btn"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="signin-link">
            Already have an account?{" "}
            <a href="/signin">Sign in</a>
          </p>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .signup-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .signup-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 160px);
          padding: 40px 20px;
          margin-top: 80px;
        }

        .signup-card {
          background: white;
          border-radius: 20px;
          padding: 48px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 480px;
        }

        .signup-card h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 12px;
          text-align: center;
        }

        .signup-subtitle {
          color: #4a5568;
          text-align: center;
          margin-bottom: 32px;
        }

        .error-message {
          background: #fed7d7;
          color: #9b2c2c;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
        }

        .signup-form {
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

        .signin-link {
          text-align: center;
          color: #4a5568;
        }

        .signin-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }

        .signin-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .signup-card {
            padding: 32px 24px;
          }

          .signup-card h1 {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}