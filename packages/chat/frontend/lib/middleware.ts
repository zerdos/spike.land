// Authentication middleware utilities for frontend
import { auth } from "./clerk";

// Check if user is authenticated before making API calls
export const requireAuth = async (): Promise<boolean> => {
  if (!auth.isSignedIn()) {
    // Redirect to sign in if not authenticated
    auth.openSignIn();
    return false;
  }
  return true;
};

// Wrapper for protected API calls
export const withAuth = async <T>(
  apiCall: () => Promise<T>,
): Promise<T> => {
  const isAuthenticated = await requireAuth();
  if (!isAuthenticated) {
    throw new Error("Authentication required");
  }
  return await apiCall();
};

// Helper to check authentication status
export const checkAuthStatus = (): {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: any;
} => {
  return {
    isSignedIn: auth.isSignedIn(),
    isLoaded: true, // Clerk handles loading state internally
    user: auth.getCurrentUser(),
  };
};
