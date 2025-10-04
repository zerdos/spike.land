/**
 * Unified Authentication Manager
 * Manages multiple authentication providers with security best practices
 */

import type {
  AuthConfig,
  AuthContext,
  AuthProvider,
  AuthResult,
  Session,
  SignInCredentials,
  TokenPayload,
  User,
  AuthEventType,
  AuthAuditLog,
  SecurityHeaders,
} from "./types";
import { ClerkAuthProvider } from "./providers/clerk";
import { JWTAuthProvider } from "./providers/jwt";

export class AuthManager {
  private providers: Map<string, AuthProvider> = new Map();
  private activeProvider: AuthProvider | null = null;
  private config: AuthConfig;
  private auditLogs: AuthAuditLog[] = []; // In production, use database
  private sessionStore: Map<string, Session> = new Map();

  constructor(config: AuthConfig) {
    this.config = config;
    this.initializeProviders();
  }

  /**
   * Initialize configured authentication providers
   */
  private async initializeProviders(): Promise<void> {
    for (const providerConfig of this.config.providers) {
      if (!providerConfig.enabled) continue;

      let provider: AuthProvider | null = null;

      switch (providerConfig.type) {
        case "clerk":
          provider = new ClerkAuthProvider(providerConfig.config as any);
          break;
        case "jwt":
          provider = new JWTAuthProvider(providerConfig.config as any);
          break;
        case "oauth":
          // Implement OAuth provider
          break;
        case "custom":
          // Allow custom provider implementation
          break;
      }

      if (provider) {
        await provider.initialize();
        this.providers.set(providerConfig.type, provider);

        // Set first enabled provider as active
        if (!this.activeProvider) {
          this.activeProvider = provider;
        }
      }
    }
  }

  /**
   * Switch active authentication provider
   */
  public setActiveProvider(name: string): void {
    const provider = this.providers.get(name);
    if (!provider) {
      throw new Error(`Provider ${name} not found or not initialized`);
    }
    this.activeProvider = provider;
  }

  /**
   * Get current authentication context
   */
  public async getAuthContext(): Promise<AuthContext> {
    try {
      if (!this.activeProvider) {
        return {
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
        };
      }

      const session = await this.activeProvider.getSession();
      if (!session) {
        return {
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
        };
      }

      // Get user from session
      const user = await this.getUserFromSession(session);

      return {
        user,
        session,
        isAuthenticated: true,
        isLoading: false,
      };
    } catch (error) {
      console.error("Failed to get auth context:", error);
      return {
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
        error: {
          code: "INVALID_TOKEN" as any,
          message: "Failed to verify authentication",
        },
      };
    }
  }

  /**
   * Sign in with credentials
   */
  public async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    if (!this.activeProvider) {
      return {
        success: false,
        error: {
          code: "INVALID_CREDENTIALS" as any,
          message: "No authentication provider configured",
        },
      };
    }

    // Apply CSRF protection if enabled
    if (this.config.security.csrfProtection && typeof window !== "undefined") {
      const csrfToken = this.getCSRFToken();
      if (!csrfToken || !this.validateCSRFToken(csrfToken)) {
        this.logAuditEvent("SIGN_IN" as AuthEventType, undefined, false, {
          reason: "CSRF validation failed",
        });

        return {
          success: false,
          error: {
            code: "CSRF_TOKEN_INVALID" as any,
            message: "Security validation failed",
          },
        };
      }
    }

    const result = await this.activeProvider.signIn(credentials);

    if (result.success && result.session) {
      // Store session
      this.sessionStore.set(result.session.id, result.session);

      // Execute callbacks
      if (result.user && this.config.callbacks?.onSignIn) {
        await this.config.callbacks.onSignIn(result.user, result.session);
      }
    }

    return result;
  }

  /**
   * Sign out current user
   */
  public async signOut(): Promise<void> {
    if (!this.activeProvider) return;

    const session = await this.activeProvider.getSession();
    if (session) {
      // Execute callbacks
      if (this.config.callbacks?.onSignOut) {
        await this.config.callbacks.onSignOut(session.userId);
      }

      // Clear session
      this.sessionStore.delete(session.id);
    }

    await this.activeProvider.signOut();
  }

  /**
   * Verify authentication token
   */
  public async verifyToken(token: string): Promise<TokenPayload | null> {
    if (!this.activeProvider) return null;

    const payload = await this.activeProvider.verifyToken(token);

    if (payload) {
      this.logAuditEvent("TOKEN_VALIDATION" as AuthEventType, payload.sub, true);
    } else {
      this.logAuditEvent("TOKEN_VALIDATION" as AuthEventType, undefined, false, {
        reason: "Invalid or expired token",
      });
    }

    return payload;
  }

  /**
   * Refresh current session
   */
  public async refreshSession(): Promise<Session | null> {
    if (!this.activeProvider) return null;

    const session = await this.activeProvider.refreshSession();

    if (session) {
      this.sessionStore.set(session.id, session);

      if (this.config.callbacks?.onSessionRefresh) {
        await this.config.callbacks.onSessionRefresh(session);
      }

      this.logAuditEvent("SESSION_REFRESH" as AuthEventType, session.userId, true, {
        sessionId: session.id,
      });
    }

    return session;
  }

  /**
   * Get security headers for responses
   */
  public getSecurityHeaders(): SecurityHeaders {
    const defaultHeaders: SecurityHeaders = {
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://clerk.com wss://clerk.com",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    };

    return {
      ...defaultHeaders,
      ...this.config.security.headers,
    };
  }

  /**
   * Check if request IP is allowed
   */
  public isIPAllowed(ip: string): boolean {
    const { ipWhitelist, ipBlacklist } = this.config.security;

    // Check blacklist first
    if (ipBlacklist && ipBlacklist.includes(ip)) {
      return false;
    }

    // If whitelist exists, IP must be in it
    if (ipWhitelist && ipWhitelist.length > 0) {
      return ipWhitelist.includes(ip);
    }

    return true;
  }

  /**
   * Validate password against policy
   */
  public validatePassword(password: string): { valid: boolean; errors: string[] } {
    const policy = this.config.security.passwordPolicy;
    if (!policy) return { valid: true, errors: [] };

    const errors: string[] = [];

    if (password.length < policy.minLength) {
      errors.push(`Password must be at least ${policy.minLength} characters`);
    }

    if (policy.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (policy.requireLowercase && !/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (policy.requireNumbers && !/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (policy.requireSpecialChars && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    // Check against common passwords (implement with a list)
    if (policy.preventCommonPasswords) {
      const commonPasswords = ["password", "123456", "qwerty", "admin", "letmein"];
      if (commonPasswords.includes(password.toLowerCase())) {
        errors.push("Password is too common");
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generate CSRF token
   */
  public async generateCSRFToken(): Promise<string> {
    if (!this.activeProvider) {
      throw new Error("No active authentication provider");
    }

    const session = await this.activeProvider.getSession();
    if (!session) {
      throw new Error("No active session");
    }

    // Use provider's CSRF token generation if available
    if ("generateCSRFToken" in this.activeProvider) {
      return await (this.activeProvider as any).generateCSRFToken(session.id);
    }

    // Fallback to basic implementation
    const token = globalThis.crypto.getRandomValues(new Uint8Array(32));
    const base64Token = btoa(String.fromCharCode(...token));

    if (typeof window !== "undefined") {
      sessionStorage.setItem("csrf_token", base64Token);
    }

    return base64Token;
  }

  /**
   * Get CSRF token from storage
   */
  private getCSRFToken(): string | null {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("csrf_token");
    }
    return null;
  }

  /**
   * Validate CSRF token
   */
  private validateCSRFToken(token: string): boolean {
    if (!this.activeProvider) return false;

    // Use provider's CSRF validation if available
    if ("validateCSRFToken" in this.activeProvider) {
      const session = this.sessionStore.values().next().value;
      if (session) {
        return (this.activeProvider as any).validateCSRFToken(session.id, token);
      }
    }

    // Fallback to basic validation
    const storedToken = this.getCSRFToken();
    return storedToken === token;
  }

  /**
   * Get user from session
   */
  private async getUserFromSession(session: Session): Promise<User | null> {
    // In production, fetch user from database using session.userId
    // For now, return a mock user
    return {
      id: session.userId,
      email: "user@example.com",
      name: "User",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Log audit event
   */
  private logAuditEvent(
    eventType: AuthEventType,
    userId?: string,
    success: boolean = true,
    metadata?: Record<string, unknown>
  ): void {
    const sessionId = this.sessionStore.values().next().value?.id;
    const log: AuthAuditLog = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      eventType,
      ...(userId ? { userId } : {}),
      ...(sessionId ? { sessionId } : {}),
      ip: typeof window !== "undefined" ? "browser" : "server",
      userAgent: typeof window !== "undefined" ? navigator.userAgent : "server",
      success,
      ...(metadata ? { metadata } : {}),
      timestamp: new Date(),
    };

    this.auditLogs.push(log);

    // In production, save to database
    console.log("Audit Log:", log);

    // Trigger callback if configured
    if (!success && this.config.callbacks?.onAuthError) {
      this.config.callbacks.onAuthError({
        code: "INVALID_CREDENTIALS" as any,
        message: `${eventType} failed`,
        ...(metadata ? { details: metadata } : {}),
      });
    }
  }

  /**
   * Get audit logs (for admin/debugging)
   */
  public getAuditLogs(filter?: {
    userId?: string;
    eventType?: AuthEventType;
    startDate?: Date;
    endDate?: Date;
  }): AuthAuditLog[] {
    let logs = [...this.auditLogs];

    if (filter) {
      if (filter.userId) {
        logs = logs.filter((log) => log.userId === filter.userId);
      }
      if (filter.eventType) {
        logs = logs.filter((log) => log.eventType === filter.eventType);
      }
      if (filter.startDate) {
        logs = logs.filter((log) => log.timestamp >= filter.startDate!);
      }
      if (filter.endDate) {
        logs = logs.filter((log) => log.timestamp <= filter.endDate!);
      }
    }

    return logs;
  }

  /**
   * Clear expired sessions
   */
  public cleanupSessions(): void {
    const now = new Date();
    for (const [id, session] of this.sessionStore.entries()) {
      if (session.expiresAt < now) {
        this.sessionStore.delete(id);
      }
    }
  }
}

/**
 * Create default authentication manager
 */
export function createAuthManager(config: Partial<AuthConfig> = {}): AuthManager {
  const defaultConfig: AuthConfig = {
    providers: [
      {
        type: "clerk",
        config: {
          publishableKey: process.env["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"] || "",
          secretKey: process.env["CLERK_SECRET_KEY"],
        },
        enabled: !!process.env["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"],
      },
      {
        type: "jwt",
        config: {
          secret: process.env["JWT_SECRET"] || "default-secret-change-in-production",
          issuer: "spike.land",
          audience: ["spike.land", "api.spike.land"],
          expiresIn: 3600,
          refreshExpiresIn: 604800,
        },
        enabled: !process.env["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"],
      },
    ],
    session: {
      maxAge: 86400, // 24 hours
      updateAge: 3600, // 1 hour
      absoluteTimeout: 604800, // 7 days
      idleTimeout: 7200, // 2 hours
      sameSite: "lax",
      secure: process.env["NODE_ENV"] === "production",
      httpOnly: true,
    },
    security: {
      csrfProtection: true,
      rateLimiting: {
        enabled: true,
        maxAttempts: 5,
        windowMs: 900000, // 15 minutes
        blockDurationMs: 1800000, // 30 minutes
      },
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        preventCommonPasswords: true,
        preventReuse: 5,
        maxAge: 90,
      },
      mfaPolicy: {
        required: false,
        allowedMethods: ["totp", "email"],
        gracePeriodDays: 7,
      },
    },
    ...config,
  };

  return new AuthManager(defaultConfig);
}