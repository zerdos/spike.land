import { useState } from "react";
import { auth } from "../../lib/clerk";

interface SignUpProps {
  onSuccess?: () => void;
  onSignInClick?: () => void;
}

export function SignUp({ onSuccess, onSignInClick }: SignUpProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    try {
      auth.openSignUp();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Get Started</h2>
        <p>Create your account to start using AI Chat Assistant</p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <button
          className={`auth-btn ${isLoading ? "loading" : ""}`}
          onClick={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <button
              className="auth-link"
              onClick={onSignInClick}
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
