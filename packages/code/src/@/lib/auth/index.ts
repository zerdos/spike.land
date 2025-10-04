/**
 * Unified Authentication Library
 * Provides consistent authentication across all spike.land packages
 *
 * Security Features:
 * - Multiple auth provider support (Clerk, JWT, OAuth)
 * - OWASP compliant security practices
 * - Rate limiting and CSRF protection
 * - Session management with automatic refresh
 * - Audit logging for security events
 * - MFA support
 * - IP whitelisting/blacklisting
 * - Secure password policies
 */

// Export types
export * from "./types";

// Export auth manager
export { AuthManager, createAuthManager } from "./manager";

// Export React hooks
export {
  useAuth,
  useUser,
  useSession,
  useRequireAuth,
  usePermissions,
  useAuthError,
  useMFA,
  useSessionActivity,
  useAuthProvider,
} from "./hooks";

// Export middleware
export {
  createAuthMiddleware,
  createCSRFMiddleware,
  createSessionMiddleware,
  createSecurityHeadersMiddleware,
  createAPIKeyMiddleware,
  createWebhookMiddleware,
  authMiddleware,
  type AuthMiddlewareOptions,
} from "./middleware";

// Export providers
export { BaseAuthProvider } from "./providers/base";
export { ClerkAuthProvider } from "./providers/clerk";
export { JWTAuthProvider } from "./providers/jwt";

// Export security utilities
export { securityUtils } from "./security";

// Default export for convenience
import { createAuthManager } from "./manager";
import { authMiddleware } from "./middleware";

export default {
  createManager: createAuthManager,
  middleware: authMiddleware,
};