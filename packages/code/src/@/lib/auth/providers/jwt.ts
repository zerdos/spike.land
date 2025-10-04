/**
 * JWT Authentication Provider
 * Implements JWT-based authentication with security best practices
 */

import { BaseAuthProvider } from "./base";
import type {
  AuthResult,
  Session,
  SignInCredentials,
  TokenPayload,
  User,
  AuthErrorCode,
} from "../types";
// Crypto functions will be imported dynamically based on environment

export interface JWTConfig {
  secret: string;
  issuer: string;
  audience?: string | string[];
  expiresIn?: number; // seconds
  refreshExpiresIn?: number; // seconds
  algorithm?: "HS256" | "HS384" | "HS512" | "RS256";
}

interface StoredUser extends User {
  passwordHash?: string;
  salt?: string;
  mfaSecret?: string;
  failedAttempts?: number;
  lockedUntil?: Date;
}

export class JWTAuthProvider extends BaseAuthProvider {
  name = "jwt";
  private config: JWTConfig;
  private users: Map<string, StoredUser> = new Map(); // In production, use database
  private sessions: Map<string, Session> = new Map();
  private refreshTokens: Map<string, { userId: string; expires: number }> = new Map();
  private rateLimitMap: Map<string, { attempts: number; resetAt: number }> = new Map();

  constructor(config: JWTConfig) {
    super();
    this.config = {
      expiresIn: 3600, // 1 hour default
      refreshExpiresIn: 604800, // 7 days default
      algorithm: "HS256",
      ...config,
    };
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    // In production, connect to database here
    this.initialized = true;

    // Start cleanup interval for expired sessions
    setInterval(() => this.cleanupExpiredSessions(), 3600000); // Every hour
  }

  async signIn(credentials: SignInCredentials): Promise<AuthResult> {
    try {
      // Validate input
      if (!credentials.email || !credentials.password) {
        return {
          success: false,
          error: this.createAuthError(
            "INVALID_CREDENTIALS" as AuthErrorCode,
            "Email and password are required"
          ),
        };
      }

      // Check rate limiting
      if (!(await this.checkRateLimit(credentials.email))) {
        await this.logAuthEvent("SIGN_IN", undefined, false, {
          email: credentials.email,
          reason: "Rate limited",
        });

        return {
          success: false,
          error: this.createAuthError(
            "RATE_LIMITED" as AuthErrorCode,
            "Too many sign-in attempts. Please try again later."
          ),
        };
      }

      // Validate email format
      if (!this.isValidEmail(credentials.email)) {
        return {
          success: false,
          error: this.createAuthError(
            "INVALID_CREDENTIALS" as AuthErrorCode,
            "Invalid email format"
          ),
        };
      }

      // Find user (in production, query database)
      const user = this.users.get(credentials.email);

      if (!user || !user.passwordHash || !user.salt) {
        // Log failed attempt
        await this.logAuthEvent("SIGN_IN", undefined, false, {
          email: credentials.email,
          reason: "User not found",
        });

        // Return generic error to prevent user enumeration
        return {
          success: false,
          error: this.createAuthError(
            "INVALID_CREDENTIALS" as AuthErrorCode,
            "Invalid email or password"
          ),
        };
      }

      // Check if account is locked
      if (user.lockedUntil && new Date() < user.lockedUntil) {
        await this.logAuthEvent("SIGN_IN", user.id, false, {
          reason: "Account locked",
        });

        return {
          success: false,
          error: this.createAuthError(
            "ACCOUNT_LOCKED" as AuthErrorCode,
            "Account is temporarily locked due to multiple failed attempts"
          ),
        };
      }

      // Verify password
      const passwordValid = await this.verifyPassword(
        credentials.password,
        user.passwordHash,
        user.salt
      );

      if (!passwordValid) {
        // Increment failed attempts
        user.failedAttempts = (user.failedAttempts || 0) + 1;

        // Lock account after 5 failed attempts
        if (user.failedAttempts >= 5) {
          user.lockedUntil = new Date(Date.now() + 1800000); // 30 minutes
          await this.logAuthEvent("ACCOUNT_LOCK", user.id, true, {
            reason: "Too many failed attempts",
          });
        }

        await this.logAuthEvent("SIGN_IN", user.id, false, {
          reason: "Invalid password",
          failedAttempts: user.failedAttempts,
        });

        return {
          success: false,
          error: this.createAuthError(
            "INVALID_CREDENTIALS" as AuthErrorCode,
            "Invalid email or password"
          ),
        };
      }

      // Check if MFA is enabled
      if (user.mfaSecret && !credentials.mfaCode) {
        return {
          success: false,
          requiresMFA: true,
          error: this.createAuthError(
            "MFA_REQUIRED" as AuthErrorCode,
            "Multi-factor authentication required"
          ),
        };
      }

      // Verify MFA if provided
      if (user.mfaSecret && credentials.mfaCode) {
        // Implement TOTP verification here
        // For now, just check if code is "123456" for demo
        if (credentials.mfaCode !== "123456") {
          await this.logAuthEvent("MFA_VERIFY", user.id, false);
          return {
            success: false,
            error: this.createAuthError(
              "INVALID_CREDENTIALS" as AuthErrorCode,
              "Invalid MFA code"
            ),
          };
        }
        await this.logAuthEvent("MFA_VERIFY", user.id, true);
      }

      // Reset failed attempts on successful login
      user.failedAttempts = 0;
      user.lockedUntil = undefined;

      // Create session
      const session = await this.createSession(user);

      // Log successful sign-in
      await this.logAuthEvent("SIGN_IN", user.id, true, {
        sessionId: session.id,
      });

      return {
        success: true,
        user: this.sanitizeUser(user),
        session,
      };
    } catch (error) {
      console.error("Sign-in error:", error);
      await this.logAuthEvent("SIGN_IN", undefined, false, {
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
    // In browser, clear local storage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        const payload = await this.verifyToken(token);
        if (payload?.sessionId) {
          this.sessions.delete(payload.sessionId);
          await this.logAuthEvent("SIGN_OUT", payload.sub, true);
        }
      }
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
    }
  }

  async getSession(): Promise<Session | null> {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (!token) return null;

      const payload = await this.verifyToken(token);
      if (!payload || !payload.sessionId) return null;

      return this.sessions.get(payload.sessionId) || null;
    }
    return null;
  }

  async refreshSession(): Promise<Session | null> {
    if (typeof window !== "undefined") {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) return null;

      const tokenData = this.refreshTokens.get(refreshToken);
      if (!tokenData || Date.now() > tokenData.expires) {
        this.refreshTokens.delete(refreshToken);
        return null;
      }

      const user = this.users.get(tokenData.userId);
      if (!user) return null;

      // Create new session
      const session = await this.createSession(user);
      await this.logAuthEvent("SESSION_REFRESH", user.id, true, {
        sessionId: session.id,
      });

      return session;
    }
    return null;
  }

  async verifyToken(token: string): Promise<TokenPayload | null> {
    try {
      // Parse JWT (simplified - use proper JWT library in production)
      const parts = token.split(".");
      if (parts.length !== 3) return null;

      const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());

      // Verify signature
      const signature = await this.createSignature(parts[0] + "." + parts[1]);
      if (signature !== parts[2]) {
        await this.logAuthEvent("TOKEN_VALIDATION", payload.sub, false, {
          reason: "Invalid signature",
        });
        return null;
      }

      // Check expiration
      if (this.isTokenExpired(payload.exp)) {
        await this.logAuthEvent("TOKEN_VALIDATION", payload.sub, false, {
          reason: "Token expired",
        });
        return null;
      }

      // Verify issuer and audience
      if (payload.iss !== this.config.issuer) return null;
      if (
        this.config.audience &&
        !this.isValidAudience(payload.aud, this.config.audience)
      ) {
        return null;
      }

      return payload;
    } catch (error) {
      console.error("Token verification error:", error);
      return null;
    }
  }

  protected async checkRateLimit(identifier: string): Promise<boolean> {
    const now = Date.now();
    const limit = this.rateLimitMap.get(identifier);

    if (!limit || now > limit.resetAt) {
      this.rateLimitMap.set(identifier, {
        attempts: 1,
        resetAt: now + 900000, // 15 minutes
      });
      return true;
    }

    if (limit.attempts >= 5) {
      return false;
    }

    limit.attempts++;
    return true;
  }

  protected async logAuthEvent(
    eventType: string,
    userId?: string,
    success: boolean = true,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    // In production, save to database or logging service
    console.log("Auth Event:", {
      eventType,
      userId,
      success,
      metadata,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Create a new user (for demo/testing)
   */
  async createUser(email: string, password: string, name?: string): Promise<User> {
    // Validate password strength
    const passwordCheck = this.validatePasswordStrength(password);
    if (!passwordCheck.valid) {
      throw new Error(passwordCheck.errors.join(", "));
    }

    const salt = this.generateSecureToken(32);
    const passwordHash = await this.hashPassword(password, salt);

    const user: StoredUser = {
      id: this.generateSecureToken(16),
      email,
      name,
      emailVerified: false,
      passwordHash,
      salt,
      createdAt: new Date(),
      updatedAt: new Date(),
      failedAttempts: 0,
    };

    this.users.set(email, user);
    return this.sanitizeUser(user);
  }

  /**
   * Hash password using PBKDF2
   */
  private async hashPassword(password: string, salt: string): Promise<string> {
    if (typeof window !== "undefined" && window.crypto?.subtle) {
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(password);
      const saltBuffer = encoder.encode(salt);

      const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        "PBKDF2",
        false,
        ["deriveBits"]
      );

      const derivedBits = await window.crypto.subtle.deriveBits(
        {
          name: "PBKDF2",
          salt: saltBuffer,
          iterations: 100000,
          hash: "SHA-512",
        },
        keyMaterial,
        512
      );

      const hashArray = Array.from(new Uint8Array(derivedBits));
      return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
    }

    // Fallback for Node.js
    const crypto = await import("crypto");
    return crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  }

  /**
   * Verify password
   */
  private async verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
    const passwordHash = await this.hashPassword(password, salt);
    return this.constantTimeCompare(passwordHash, hash);
  }

  /**
   * Create JWT signature
   */
  private async createSignature(data: string): Promise<string> {
    if (typeof window !== "undefined" && window.crypto?.subtle) {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data + "." + this.config.secret);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return btoa(String.fromCharCode(...hashArray))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
    }

    // Fallback for Node.js
    const crypto = await import("crypto");
    return crypto.createHash("sha256")
      .update(data + "." + this.config.secret)
      .digest("base64url");
  }

  /**
   * Constant time comparison
   */
  private constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  }

  /**
   * Create session with JWT
   */
  private async createSession(user: User): Promise<Session> {
    const sessionId = this.generateSecureToken();
    const now = Math.floor(Date.now() / 1000);

    const payload: TokenPayload = {
      sub: user.id,
      iat: now,
      exp: now + (this.config.expiresIn || 3600),
      jti: sessionId,
      iss: this.config.issuer,
      aud: this.config.audience,
      sessionId,
    };

    // Create JWT
    const header = Buffer.from(JSON.stringify({
      alg: this.config.algorithm,
      typ: "JWT",
    })).toString("base64url");

    const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = await this.createSignature(header + "." + payloadStr);
    const token = `${header}.${payloadStr}.${signature}`;

    // Create refresh token
    const refreshToken = this.generateSecureToken();
    this.refreshTokens.set(refreshToken, {
      userId: user.id,
      expires: Date.now() + (this.config.refreshExpiresIn || 604800) * 1000,
    });

    const session: Session = {
      id: sessionId,
      userId: user.id,
      token,
      refreshToken,
      expiresAt: new Date(payload.exp * 1000),
      createdAt: new Date(),
      deviceInfo: typeof window !== "undefined" ? {
        userAgent: navigator.userAgent,
        ip: "unknown",
      } : undefined,
    };

    this.sessions.set(sessionId, session);

    // Store in browser
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("refresh_token", refreshToken);
    }

    return session;
  }

  /**
   * Validate audience claim
   */
  private isValidAudience(
    tokenAud: string | string[] | undefined,
    expectedAud: string | string[]
  ): boolean {
    if (!tokenAud) return false;

    const tokenAudArray = Array.isArray(tokenAud) ? tokenAud : [tokenAud];
    const expectedAudArray = Array.isArray(expectedAud) ? expectedAud : [expectedAud];

    return tokenAudArray.some((aud) => expectedAudArray.includes(aud));
  }

  /**
   * Clean up expired sessions
   */
  private cleanupExpiredSessions(): void {
    const now = Date.now();

    // Clean sessions
    for (const [id, session] of this.sessions.entries()) {
      if (session.expiresAt.getTime() < now) {
        this.sessions.delete(id);
      }
    }

    // Clean refresh tokens
    for (const [token, data] of this.refreshTokens.entries()) {
      if (data.expires < now) {
        this.refreshTokens.delete(token);
      }
    }

    // Clean rate limit map
    for (const [id, data] of this.rateLimitMap.entries()) {
      if (data.resetAt < now) {
        this.rateLimitMap.delete(id);
      }
    }

    // Clean CSRF tokens
    for (const [id, data] of this.csrfTokens.entries()) {
      if (data.expires < now) {
        this.csrfTokens.delete(id);
      }
    }
  }
}