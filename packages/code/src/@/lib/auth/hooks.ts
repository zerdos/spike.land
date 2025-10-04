/**
 * Unified Authentication React Hooks
 * Provides consistent auth interface across all packages
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { AuthManager } from "./manager";
import { createAuthManager } from "./manager";
import type {
  AuthContext,
  AuthResult,
  Session,
  SignInCredentials,
  TokenPayload,
} from "./types";

// Global auth manager instance
let authManagerInstance: AuthManager | null = null;

/**
 * Get or create auth manager instance
 */
function getAuthManager(): AuthManager {
  if (!authManagerInstance) {
    authManagerInstance = createAuthManager();
  }
  return authManagerInstance;
}

/**
 * Main authentication hook
 */
export function useAuth() {
  const [authContext, setAuthContext] = useState<AuthContext>({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const [isSigningIn, setIsSigningIn] = useState(false);
  const authManager = useRef<AuthManager>(getAuthManager());

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    async function loadAuthState() {
      try {
        const context = await authManager.current.getAuthContext();
        if (mounted) {
          setAuthContext({
            ...context,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Failed to load auth state:", error);
        if (mounted) {
          setAuthContext({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
            error: {
              code: "INVALID_TOKEN" as any,
              message: "Failed to load authentication",
            },
          });
        }
      }
    }

    loadAuthState();

    // Set up periodic session refresh
    const refreshInterval = setInterval(async () => {
      if (authContext.isAuthenticated && authContext.session) {
        const session = await authManager.current.refreshSession();
        if (mounted && session) {
          setAuthContext((prev) => ({
            ...prev,
            session,
          }));
        }
      }
    }, 3600000); // Refresh every hour

    return () => {
      mounted = false;
      clearInterval(refreshInterval);
    };
  }, []); // Run only once on mount

  // Sign in
  const signIn = useCallback(async (credentials: SignInCredentials): Promise<AuthResult> => {
    setIsSigningIn(true);
    try {
      const result = await authManager.current.signIn(credentials);

      if (result.success && result.user && result.session) {
        setAuthContext({
          user: result.user,
          session: result.session,
          isAuthenticated: true,
          isLoading: false,
        });
      } else if (result.error) {
        setAuthContext((prev) => ({
          ...prev,
          error: result.error!,
        }));
      }

      return result;
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      await authManager.current.signOut();
      setAuthContext({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error("Sign out error:", error);
      // Still clear local state even if sign out fails
      setAuthContext({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  // Get current session token
  const getSessionToken = useCallback(async (): Promise<string | null> => {
    if (!authContext.session) return null;
    return authContext.session.token;
  }, [authContext.session]);

  // Get auth headers for API requests
  const getAuthHeaders = useCallback(async (): Promise<HeadersInit> => {
    const token = await getSessionToken();
    if (!token) return {};

    const csrfToken = await authManager.current.generateCSRFToken();
    return {
      Authorization: `Bearer ${token}`,
      "X-CSRF-Token": csrfToken,
    };
  }, [getSessionToken]);

  // Refresh session
  const refreshSession = useCallback(async (): Promise<Session | null> => {
    const session = await authManager.current.refreshSession();
    if (session) {
      setAuthContext((prev) => ({
        ...prev,
        session,
      }));
    }
    return session;
  }, []);

  // Verify token
  const verifyToken = useCallback(async (token: string): Promise<TokenPayload | null> => {
    return authManager.current.verifyToken(token);
  }, []);

  return {
    ...authContext,
    signIn,
    signOut,
    getSessionToken,
    getAuthHeaders,
    refreshSession,
    verifyToken,
    isSigningIn,
  };
}

/**
 * Hook for current user
 */
export function useUser() {
  const { user, isAuthenticated, isLoading } = useAuth();
  return {
    user,
    isAuthenticated,
    isLoading,
  };
}

/**
 * Hook for session management
 */
export function useSession() {
  const { session, refreshSession, getSessionToken } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const newSession = await refreshSession();
      return newSession;
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshSession]);

  return {
    session,
    refresh,
    getSessionToken,
    isRefreshing,
  };
}

/**
 * Hook for protected routes
 */
export function useRequireAuth(redirectTo: string = "/login") {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && typeof window !== "undefined") {
      window.location.href = redirectTo;
    }
  }, [isAuthenticated, isLoading, redirectTo]);

  return { isAuthenticated, isLoading };
}

/**
 * Hook for permission checking
 */
export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = useCallback(
    (resource: string, action: string): boolean => {
      if (!user) return false;

      // Admin users have all permissions
      const isAdmin = user.metadata?.["role"] === "admin";
      if (isAdmin) return true;

      // Check specific permissions based on user metadata
      const permissions = user.metadata?.["permissions"] as Record<string, string[]>;
      if (!permissions) return false;

      const resourcePermissions = permissions[resource];
      if (!resourcePermissions) return false;

      return (
        resourcePermissions.includes(action) ||
        resourcePermissions.includes("*")
      );
    },
    [user]
  );

  const requirePermission = useCallback(
    (resource: string, action: string): void => {
      if (!hasPermission(resource, action)) {
        throw new Error(`Insufficient permissions for ${action} on ${resource}`);
      }
    },
    [hasPermission]
  );

  return {
    hasPermission,
    requirePermission,
  };
}

/**
 * Hook for auth error handling
 */
export function useAuthError() {
  const { error } = useAuth();
  const [dismissedErrors, setDismissedErrors] = useState<Set<string>>(new Set());

  const dismissError = useCallback(() => {
    if (error) {
      setDismissedErrors((prev) => new Set([...prev, error.code]));
    }
  }, [error]);

  const isDismissed = error ? dismissedErrors.has(error.code) : false;
  const visibleError = isDismissed ? null : error;

  return {
    error: visibleError,
    dismissError,
  };
}

/**
 * Hook for MFA management
 */
export function useMFA() {
  const { user } = useAuth();
  const [isMFAEnabled, setIsMFAEnabled] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);

  useEffect(() => {
    if (user?.metadata?.["mfaEnabled"]) {
      setIsMFAEnabled(true);
    }
  }, [user]);

  const enableMFA = useCallback(async (method: "totp" | "sms" | "email") => {
    setIsEnabling(true);
    try {
      // Implement MFA enabling logic
      console.log("Enabling MFA with method:", method);
      setIsMFAEnabled(true);
    } catch (error) {
      console.error("Failed to enable MFA:", error);
      throw error;
    } finally {
      setIsEnabling(false);
    }
  }, []);

  const disableMFA = useCallback(async () => {
    try {
      // Implement MFA disabling logic
      console.log("Disabling MFA");
      setIsMFAEnabled(false);
    } catch (error) {
      console.error("Failed to disable MFA:", error);
      throw error;
    }
  }, []);

  return {
    isMFAEnabled,
    isEnabling,
    enableMFA,
    disableMFA,
  };
}

/**
 * Hook for session activity tracking
 */
export function useSessionActivity() {
  const { session } = useAuth();
  const [lastActivity, setLastActivity] = useState<Date | null>(null);
  const [idleTime, setIdleTime] = useState(0);
  const idleTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!session) return;

    const updateActivity = () => {
      setLastActivity(new Date());
      setIdleTime(0);
    };

    const events = ["mousedown", "keypress", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, updateActivity));

    // Start idle timer
    idleTimerRef.current = setInterval(() => {
      setIdleTime((prev) => prev + 1000);
    }, 1000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, updateActivity));
      if (idleTimerRef.current) {
        clearInterval(idleTimerRef.current);
      }
    };
  }, [session]);

  const isIdle = idleTime > 120000; // 2 minutes
  const willExpireSoon = session ?
    new Date(session.expiresAt).getTime() - Date.now() < 300000 : // 5 minutes
    false;

  return {
    lastActivity,
    idleTime,
    isIdle,
    willExpireSoon,
  };
}

/**
 * Hook for auth provider switching
 */
export function useAuthProvider() {
  const [activeProvider, setActiveProvider] = useState<string>("clerk");
  const authManager = useRef<AuthManager>(getAuthManager());

  const switchProvider = useCallback((providerName: string) => {
    try {
      authManager.current.setActiveProvider(providerName);
      setActiveProvider(providerName);

      // Reload auth state with new provider
      window.location.reload();
    } catch (error) {
      console.error("Failed to switch auth provider:", error);
      throw error;
    }
  }, []);

  return {
    activeProvider,
    switchProvider,
  };
}