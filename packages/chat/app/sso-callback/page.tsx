"use client";

import { useEffect } from "react";
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export default function SSOCallbackPage() {
  const { signIn, setActive: signInSetActive } = useSignIn() || {};
  const { signUp, setActive: signUpSetActive } = useSignUp() || {};
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Try to handle sign in first
        if (signIn?.status === "complete") {
          await signInSetActive?.({ session: signIn.createdSessionId! });
          router.push("/chat");
          return;
        }

        // If sign in didn't work, try sign up
        if (signUp?.status === "complete") {
          await signUpSetActive?.({ session: signUp.createdSessionId! });
          router.push("/chat");
          return;
        }

        // Handle OAuth callback
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");

        if (code) {
          // Try sign in with code
          try {
            const result = await signIn?.create({
              strategy: "oauth_google",
              code,
              redirectUrl: window.location.href.split("?")[0],
            });

            if (result?.status === "complete") {
              await signInSetActive?.({ session: result.createdSessionId! });

              // Store user info in localStorage for API usage
              if (result.userData) {
                localStorage.setItem("auth_token", result.createdSessionId || "");
                localStorage.setItem("user", JSON.stringify({
                  id: result.userData.id,
                  email: result.userData.emailAddresses?.[0]?.emailAddress,
                  name: result.userData.firstName + " " + result.userData.lastName,
                  provider: "google"
                }));
                localStorage.setItem("subscription_tier", "Free");
                localStorage.setItem("user_credits", "10");
              }

              router.push("/chat");
              return;
            }
          } catch (signInErr) {
            console.error("Sign in failed, trying sign up:", signInErr);

            // Try sign up if sign in failed
            try {
              const result = await signUp?.create({
                strategy: "oauth_google",
                code,
                redirectUrl: window.location.href.split("?")[0],
              });

              if (result?.status === "complete") {
                await signUpSetActive?.({ session: result.createdSessionId! });

                // Store user info in localStorage for API usage
                if (result.userData) {
                  localStorage.setItem("auth_token", result.createdSessionId || "");
                  localStorage.setItem("user", JSON.stringify({
                    id: result.userData.id,
                    email: result.userData.emailAddresses?.[0]?.emailAddress,
                    name: result.userData.firstName + " " + result.userData.lastName,
                    provider: "google"
                  }));
                  localStorage.setItem("subscription_tier", "Free");
                  localStorage.setItem("user_credits", "10");
                }

                router.push("/chat");
                return;
              }
            } catch (signUpErr) {
              console.error("Sign up also failed:", signUpErr);
              router.push("/signin?error=auth_failed");
            }
          }
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        router.push("/signin?error=callback_failed");
      }
    };

    handleCallback();
  }, [signIn, signUp, signInSetActive, signUpSetActive, router]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ marginBottom: "1rem" }}>Completing Sign In...</h2>
        <p>Please wait while we redirect you to the chat.</p>
        <div className="loading-spinner" style={{
          width: "40px",
          height: "40px",
          border: "3px solid #e2e8f0",
          borderTop: "3px solid #667eea",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "20px auto"
        }} />
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}