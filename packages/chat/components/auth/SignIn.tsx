import { useState } from "react";
import { auth } from "../../lib/clerk";

interface SignInProps {
  onSuccess?: () => void;
  onSignUpClick?: () => void;
}

export function SignIn({ onSuccess, onSignUpClick }: SignInProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      auth.openSignIn();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Welcome Back</h2>
        <p>Sign in to continue to AI Chat Assistant</p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <button
          className={`auth-btn ${isLoading ? "loading" : ""}`}
          onClick={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <button
              className="auth-link"
              onClick={onSignUpClick}
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}