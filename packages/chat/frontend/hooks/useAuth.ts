import type { UserResource } from "@clerk/types";
import { useCallback, useEffect, useState } from "react";
import { auth, clerk, initializeClerk } from "../lib/clerk";

interface AuthState {
  user: UserResource | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoaded: false,
    isSignedIn: false,
    isLoading: true,
    error: null,
  });

  // Initialize Clerk on mount
  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        await initializeClerk();

        if (mounted) {
          setAuthState({
            user: clerk.user,
            isLoaded: clerk.loaded,
            isSignedIn: !!clerk.user,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error("Failed to initialize Clerk:", error);
        if (mounted) {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
            error: error instanceof Error ? error.message : "Authentication failed",
          }));
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    if (!clerk.loaded) return;

    const unsubscribe = clerk.addListener((payload) => {
      setAuthState({
        user: payload.user,
        isLoaded: true,
        isSignedIn: !!payload.user,
        isLoading: false,
        error: null,
      });
    });

    return () => unsubscribe();
  }, []); // clerk.loaded is not reactive, so no dependencies needed

  // Get session token for API calls
  const getSessionToken = useCallback(async () => {
    return await auth.getSessionToken();
  }, []);

  // Get auth headers for API requests
  const getAuthHeaders = useCallback(async (): Promise<HeadersInit> => {
    const token = await getSessionToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [getSessionToken]);

  // Sign out handler
  const signOut = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await auth.signOut();
      // State will be updated via the listener
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Sign out failed",
      }));
    }
  }, []);

  // Open sign in modal
  const openSignIn = useCallback(() => {
    auth.openSignIn();
  }, []);

  // Open sign up modal
  const openSignUp = useCallback(() => {
    auth.openSignUp();
  }, []);

  return {
    ...authState,
    getSessionToken,
    getAuthHeaders,
    signOut,
    openSignIn,
    openSignUp,
  };
}
