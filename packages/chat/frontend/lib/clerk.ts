import { Clerk } from "@clerk/clerk-js";

// Get Clerk publishable key from environment
const getPublishableKey = () => {
  if (typeof window !== "undefined") {
    // Try different environment variable sources
    return (
      (window as any).__NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY__ ||
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
      (typeof import.meta !== "undefined" && import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY) ||
      ""
    );
  }
  return "";
};

// Initialize Clerk instance only on client side
export const clerk = typeof window !== "undefined"
  ? new Clerk(getPublishableKey())
  : null as any;

// Clerk initialization function
export async function initializeClerk() {
  if (!clerk) {
    console.warn("Clerk not available (server-side rendering)");
    return null;
  }
  try {
    await clerk.load();
    return clerk;
  } catch (error) {
    console.error("Failed to initialize Clerk:", error);
    throw error;
  }
}

// Auth utilities
export const auth = {
  // Get current user
  getCurrentUser: () => clerk?.user,

  // Get session token for API calls
  getSessionToken: async () => {
    if (!clerk) return null;
    try {
      const session = clerk.session;
      if (!session) return null;
      return await session.getToken();
    } catch (error) {
      console.error("Failed to get session token:", error);
      return null;
    }
  },

  // Check if user is signed in
  isSignedIn: () => !!clerk?.user,

  // Sign out user
  signOut: async () => {
    if (!clerk) return;
    try {
      await clerk.signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  },

  // Open sign in modal
  openSignIn: () => {
    if (clerk) clerk.openSignIn();
  },

  // Open sign up modal
  openSignUp: () => {
    if (clerk) clerk.openSignUp();
  },

  // Get sign in object for OAuth
  get signIn() {
    return clerk?.client?.signIn;
  },

  // Get sign up object for OAuth
  get signUp() {
    return clerk?.client?.signUp;
  },

  // Check if Google OAuth is enabled
  isGoogleOAuthEnabled: () => {
    const signInMethods = clerk?.client?.signIn?.supportedExternalProviders;
    return signInMethods?.includes("oauth_google") || false;
  },

  // Create a new sign in
  createSignIn: async () => {
    if (!clerk?.client) return null;
    try {
      const signIn = await clerk.client.signIn.create({});
      return signIn;
    } catch (error) {
      console.error("Failed to create sign in:", error);
      return null;
    }
  },
};

// Helper to get auth headers for API calls
export const getAuthHeaders = async (): Promise<HeadersInit> => {
  const token = await auth.getSessionToken();
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

export default clerk;
