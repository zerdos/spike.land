import { Clerk } from "@clerk/clerk-js";

// Initialize Clerk instance
export const clerk = new Clerk(
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ""
);

// Clerk initialization function
export async function initializeClerk() {
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
  getCurrentUser: () => clerk.user,

  // Get session token for API calls
  getSessionToken: async () => {
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
  isSignedIn: () => !!clerk.user,

  // Sign out user
  signOut: async () => {
    try {
      await clerk.signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  },

  // Open sign in modal
  openSignIn: () => {
    clerk.openSignIn();
  },

  // Open sign up modal
  openSignUp: () => {
    clerk.openSignUp();
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