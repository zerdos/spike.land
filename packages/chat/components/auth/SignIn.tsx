import { useState, useEffect } from "react";
import { initializeClerk } from "../../frontend/lib/clerk";

interface SignInProps {
  onSuccess?: () => void;
  onSignUpClick?: () => void;
}

export function SignIn({ onSuccess, onSignUpClick }: SignInProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [_clerkReady, setClerkReady] = useState(false);

  useEffect(() => {
    // Initialize Clerk when component mounts
    const initClerk = async () => {
      try {
        await initializeClerk();
        setClerkReady(true);
      } catch (err) {
        console.error("Failed to initialize Clerk:", err);
        // Set ready anyway to show error message
        setClerkReady(true);
      }
    };

    initClerk();
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // For demo purposes, simulate email sign-in
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a demo user session
      const demoUser = {
        id: "email_" + Date.now(),
        email: "demo@example.com",
        name: "Demo User",
        provider: "email"
      };

      // Store auth token in localStorage
      localStorage.setItem("auth_token", "demo_email_token_" + Date.now());
      localStorage.setItem("user", JSON.stringify(demoUser));
      localStorage.setItem("subscription_tier", "Free");
      localStorage.setItem("user_credits", "10");

      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      // For demo purposes, simulate Google OAuth flow
      // In production, this would redirect to Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a demo user session
      const demoUser = {
        id: "google_" + Date.now(),
        email: "demo@gmail.com",
        name: "Demo User",
        provider: "google"
      };

      // Store auth token in localStorage
      localStorage.setItem("auth_token", "demo_google_token_" + Date.now());
      localStorage.setItem("user", JSON.stringify(demoUser));
      localStorage.setItem("subscription_tier", "Free");
      localStorage.setItem("user_credits", "10");

      onSuccess?.();
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Authentication failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Welcome Back</h2>
        <p>Sign in to continue to AI Chat Assistant</p>

        {error && (
          <div className="auth-error" data-testid="error-message" role="alert">
            {error}
          </div>
        )}

        <button
          className={`auth-btn google-btn ${googleLoading ? "loading" : ""}`}
          onClick={handleGoogleSignIn}
          disabled={isLoading || googleLoading}
          aria-label="Sign in with Google"
        >
          {googleLoading ? (
            "Connecting..."
          ) : (
            <>
              <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button
          className={`auth-btn ${isLoading ? "loading" : ""}`}
          onClick={handleSignIn}
          disabled={isLoading || googleLoading}
        >
          {isLoading ? "Signing In..." : "Sign In with Email"}
        </button>

        <div className="auth-footer">
          <p>
            Don&apos;t have an account?{" "}
            <button
              className="auth-link"
              onClick={onSignUpClick}
              disabled={isLoading || googleLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
