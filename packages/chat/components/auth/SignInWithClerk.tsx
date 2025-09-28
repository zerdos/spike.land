"use client";

import { useSignIn, useAuth, useClerk } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SignInProps {
  onSuccess?: () => void;
  onSignUpClick?: () => void;
}

export function SignInWithClerk({ onSuccess, onSignUpClick }: SignInProps) {
  const { isLoaded, signIn } = useSignIn();
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If already signed in, redirect to chat
    if (isSignedIn) {
      router.push("/chat");
    }
  }, [isSignedIn, router]);

  const handleGoogleSignIn = async () => {
    if (!isLoaded || !signIn) {
      setError("Authentication system is loading. Please try again.");
      return;
    }

    setGoogleLoading(true);
    setError(null);

    try {
      // Start the OAuth flow with Google
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/chat",
      });
    } catch (err: unknown) {
      console.error("Google sign-in error:", err);

      // Handle specific error cases
      const clerkError = err as { errors?: Array<{ code?: string; message?: string }> };
      if (clerkError?.errors?.[0]?.code === "form_identifier_not_found") {
        // User doesn't exist, try to sign up
        try {
          router.push("/signup");
        } catch (signUpErr) {
          console.error("Sign up redirect error:", signUpErr);
          setError("Please create an account first.");
        }
      } else if (clerkError?.errors?.[0]?.message) {
        setError(clerkError.errors[0].message);
      } else {
        setError("Authentication failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (!isLoaded) {
      setError("Authentication system is loading. Please try again.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Open Clerk's built-in sign-in modal
      openSignIn();
      onSuccess?.();
    } catch (err: unknown) {
      console.error("Email sign-in error:", err);
      const clerkError = err as { errors?: Array<{ message?: string }> };
      setError(clerkError?.errors?.[0]?.message || "Sign in failed. Please try again.");
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
          <div className="auth-error" data-testid="error-message" role="alert">
            {error}
          </div>
        )}

        <button
          className={`auth-btn google-btn ${googleLoading ? "loading" : ""}`}
          onClick={handleGoogleSignIn}
          disabled={!isLoaded || isLoading || googleLoading}
          aria-label="Sign in with Google"
        >
          {googleLoading ? (
            "Connecting to Google..."
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
          onClick={handleEmailSignIn}
          disabled={!isLoaded || isLoading || googleLoading}
        >
          {isLoading ? "Opening Sign In..." : "Sign In with Email"}
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