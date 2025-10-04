/**
 * Clerk Authentication Provider
 * Integrates with Clerk for authentication
 */

import type { UserResource } from "@clerk/types";
import { BaseAuthProvider } from "./base";
import type {
  AuthResult,
  Session,
  SignInCredentials,
  TokenPayload,
  User,
  AuthErrorCode,
} from "../types";

export interface ClerkConfig {
  publishableKey: string;
  secretKey?: string;
  domain?: string;
}

export class ClerkAuthProvider extends BaseAuthProvider {
  name = "clerk";
  private clerk: any; // Clerk instance
  private config: ClerkConfig;
  private sessionCache: Map<string, { session: Session; expires: number }> = new Map();

  constructor(config: ClerkConfig) {
    super();
    this.config = config;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Dynamic import for browser environment
      if (typeof window !== "undefined") {
        const { Clerk } = await import("@clerk/clerk-js");
        this.clerk = new Clerk(this.config.publishableKey);
        await this.clerk.load();
      } else if (this.config.secretKey) {
        // Server-side Clerk SDK
        const { createClerkClient } = await import("@clerk/backend");
        this.clerk = createClerkClient({
          secretKey: this.config.secretKey,
        });
      }

      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize Clerk:", error);
      throw new Error("Authentication service initialization failed");
    }
  }

  async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    try {
      // Check rate limiting
      const identifier = credentials.email || "unknown";
      if (!(await this.checkRateLimit(identifier))) {
        return {
          success: false,
          error: this.createAuthError(
            "RATE_LIMITED" as AuthErrorCode,
            "Too many sign-in attempts. Please try again later."
          ),
        };
      }

      if (typeof window !== "undefined") {
        // Browser environment
        const signInAttempt = await this.clerk.client.signIn.create({
          identifier: credentials.email,
          password: credentials.password,
        });

        if (signInAttempt.status === "complete") {
          await this.clerk.setActive({ session: signInAttempt.createdSessionId });
          const user = this.mapClerkUser(this.clerk.user);
          const session = await this.createSession(user);

          // Log successful sign-in
          await this.logAuthEvent("SIGN_IN", user.id, true, {
            email: credentials.email,
          });

          return {
            success: true,
            user,
            session,
          };
        }

        // Handle MFA or other requirements
        if (signInAttempt.status === "needs_second_factor") {
          return {
            success: false,
            requiresMFA: true,
            error: this.createAuthError(
              "MFA_REQUIRED" as AuthErrorCode,
              "Multi-factor authentication required"
            ),
          };
        }
      } else {
        // Server-side authentication
        return {
          success: false,
          error: this.createAuthError(
            "INVALID_CREDENTIALS" as AuthErrorCode,
            "Server-side sign-in not implemented"
          ),
        };
      }

      // Log failed sign-in
      await this.logAuthEvent("SIGN_IN", undefined, false, {
        email: credentials.email,
        reason: "Invalid credentials",
      });

      return {
        success: false,
        error: this.createAuthError(
          "INVALID_CREDENTIALS" as AuthErrorCode,
          "Invalid email or password"
        ),
      };
    } catch (error) {
      console.error("Sign-in error:", error);

      await this.logAuthEvent("SIGN_IN", undefined, false, {
        email: credentials.email,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      return {
        success: false,
        error: this.createAuthError(
          "INVALID_CREDENTIALS" as AuthErrorCode,
          "Authentication failed"
        ),
      };
    }
  }

  async signOut(): Promise<void> {
    try {
      if (typeof window !== "undefined" && this.clerk) {
        const userId = this.clerk.user?.id;
        await this.clerk.signOut();

        // Clear session cache
        this.sessionCache.clear();

        // Log sign-out
        if (userId) {
          await this.logAuthEvent("SIGN_OUT", userId, true);
        }
      }
    } catch (error) {
      console.error("Sign-out error:", error);
      await this.logAuthEvent("SIGN_OUT", undefined, false, {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  }

  async getSession(): Promise<Session | null> {
    try {
      if (typeof window !== "undefined" && this.clerk?.session) {
        const clerkSession = this.clerk.session;
        const user = this.mapClerkUser(this.clerk.user);

        // Check cache first
        const cached = this.sessionCache.get(clerkSession.id);
        if (cached && Date.now() < cached.expires) {
          return cached.session;
        }

        const session: Session = {
          id: clerkSession.id,
          userId: user.id,
          token: await clerkSession.getToken(),
          expiresAt: new Date(clerkSession.expireAt),
          createdAt: new Date(clerkSession.createdAt),
          lastActivityAt: new Date(clerkSession.lastActiveAt),
          deviceInfo: {
            userAgent: navigator.userAgent,
            ip: "unknown", // Would need server-side to get real IP
          },
        };

        // Cache the session
        this.sessionCache.set(clerkSession.id, {
          session,
          expires: Date.now() + 60000, // Cache for 1 minute
        });

        return session;
      }

      return null;
    } catch (error) {
      console.error("Get session error:", error);
      return null;
    }
  }

  async refreshSession(): Promise<Session | null> {
    try {
      if (typeof window !== "undefined" && this.clerk?.session) {
        await this.clerk.session.touch();
        return this.getSession();
      }
      return null;
    } catch (error) {
      console.error("Refresh session error:", error);
      return null;
    }
  }

  async verifyToken(token: string): Promise<TokenPayload | null> {
    try {
      if (this.config.secretKey) {
        // Server-side token verification
        const { verifyToken } = await import("@clerk/backend");
        const verified = await verifyToken(token, {
          secretKey: this.config.secretKey,
        });

        if (!verified) return null;

        return {
          sub: verified.sub,
          iat: verified.iat,
          exp: verified.exp,
          jti: verified.jti,
          sessionId: verified.sid,
        };
      }

      // Client-side cannot verify tokens directly
      console.warn("Token verification requires secret key");
      return null;
    } catch (error) {
      console.error("Token verification error:", error);
      return null;
    }
  }

  protected async checkRateLimit(_identifier: string): Promise<boolean> {
    // Implement using Clerk's rate limiting or custom solution
    // For now, return true to allow all requests
    return true;
  }

  protected async logAuthEvent(
    eventType: string,
    userId?: string,
    success: boolean = true,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    // Log to console for now, implement proper audit logging
    console.log("Auth Event:", {
      eventType,
      userId,
      success,
      metadata,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Map Clerk user to our User interface
   */
  private mapClerkUser(clerkUser: UserResource | null): User {
    if (!clerkUser) {
      throw new Error("No user found");
    }

    const name = clerkUser.fullName || clerkUser.firstName;
    const createdAt = clerkUser.createdAt ? new Date(clerkUser.createdAt) : new Date();
    const updatedAt = clerkUser.updatedAt ? new Date(clerkUser.updatedAt) : new Date();

    return this.sanitizeUser({
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || "",
      emailVerified: clerkUser.primaryEmailAddress?.verification?.status === "verified",
      ...(name ? { name } : {}),
      image: clerkUser.imageUrl,
      metadata: {
        clerkId: clerkUser.id,
        createdAt: clerkUser.createdAt,
        updatedAt: clerkUser.updatedAt,
      },
      createdAt,
      updatedAt,
    });
  }

  /**
   * Create a session for the user
   */
  private async createSession(user: User): Promise<Session> {
    const sessionId = this.generateSecureToken();
    const token = this.generateSecureToken();

    const session: Session = {
      id: sessionId,
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + this.TOKEN_EXPIRY * 1000),
      createdAt: new Date(),
      deviceInfo: typeof window !== "undefined" ? {
        userAgent: navigator.userAgent,
        ip: "unknown",
      } : undefined,
    };

    return session;
  }
}