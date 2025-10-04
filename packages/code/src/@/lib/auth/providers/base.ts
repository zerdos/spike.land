/**
 * Base Authentication Provider
 * Implements OWASP security best practices
 */

import type {
  AuthProvider,
  AuthResult,
  Session,
  SignInCredentials,
  TokenPayload,
  User,
  AuthError,
  AuthErrorCode,
} from "../types";

export abstract class BaseAuthProvider implements AuthProvider {
  abstract name: string;
  protected initialized = false;
  protected csrfTokens = new Map<string, { token: string; expires: number }>();

  // Security constants
  protected readonly TOKEN_EXPIRY = 3600; // 1 hour
  protected readonly REFRESH_TOKEN_EXPIRY = 604800; // 7 days
  protected readonly CSRF_TOKEN_EXPIRY = 900000; // 15 minutes
  protected readonly MAX_SESSION_AGE = 86400; // 24 hours

  abstract initialize(): Promise<void>;
  abstract signIn(credentials: SignInCredentials): Promise<AuthResult>;
  abstract signOut(): Promise<void>;
  abstract getSession(): Promise<Session | null>;
  abstract refreshSession(): Promise<Session | null>;
  abstract verifyToken(token: string): Promise<TokenPayload | null>;

  /**
   * Generate secure random token
   */
  protected async generateSecureToken(length: number = 32): Promise<string> {
    if (typeof window !== "undefined" && window.crypto) {
      const buffer = new Uint8Array(length);
      window.crypto.getRandomValues(buffer);
      return btoa(String.fromCharCode(...buffer))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
    }
    // Fallback for Node.js environment
    const crypto = await import("crypto");
    return crypto.randomBytes(length).toString("base64url");
  }

  /**
   * Hash sensitive data using SHA-256
   */
  protected async hashData(data: string): Promise<string> {
    if (typeof window !== "undefined" && window.crypto?.subtle) {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
    }
    // Fallback for Node.js environment
    const crypto = await import("crypto");
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  /**
   * Validate token expiration
   */
  protected isTokenExpired(exp: number): boolean {
    return Date.now() >= exp * 1000;
  }

  /**
   * Generate CSRF token
   */
  public async generateCSRFToken(sessionId: string): Promise<string> {
    const token = this.generateSecureToken();
    const hashedToken = await this.hashData(token);

    this.csrfTokens.set(sessionId, {
      token: hashedToken,
      expires: Date.now() + this.CSRF_TOKEN_EXPIRY,
    });

    // Clean expired tokens
    this.cleanExpiredCSRFTokens();

    return token;
  }

  /**
   * Validate CSRF token
   */
  public async validateCSRFToken(sessionId: string, token: string): Promise<boolean> {
    const storedData = this.csrfTokens.get(sessionId);

    if (!storedData) {
      return false;
    }

    if (Date.now() > storedData.expires) {
      this.csrfTokens.delete(sessionId);
      return false;
    }

    const hashedToken = await this.hashData(token);
    return this.constantTimeCompare(hashedToken, storedData.token);
  }

  /**
   * Constant-time string comparison to prevent timing attacks
   */
  protected constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }

  /**
   * Clean expired CSRF tokens
   */
  private cleanExpiredCSRFTokens(): void {
    const now = Date.now();
    for (const [sessionId, data] of this.csrfTokens.entries()) {
      if (now > data.expires) {
        this.csrfTokens.delete(sessionId);
      }
    }
  }

  /**
   * Sanitize user data before returning
   */
  protected sanitizeUser(user: User): User {
    const sanitized = { ...user };

    // Remove sensitive fields that shouldn't be exposed
    const sensitiveFields = ["password", "passwordHash", "salt", "mfaSecret"];
    for (const field of sensitiveFields) {
      delete (sanitized as Record<string, unknown>)[field];
    }

    return sanitized;
  }

  /**
   * Create auth error
   */
  protected createAuthError(
    code: AuthErrorCode,
    message: string,
    details?: Record<string, unknown>
  ): AuthError {
    return {
      code,
      message,
      ...(details ? { details } : {}),
    };
  }

  /**
   * Validate email format
   */
  protected isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  protected validatePasswordStrength(password: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Rate limiting check (to be implemented by subclasses with actual storage)
   */
  protected abstract checkRateLimit(identifier: string): Promise<boolean>;

  /**
   * Audit logging (to be implemented by subclasses)
   */
  protected abstract logAuthEvent(
    eventType: string,
    userId?: string,
    success?: boolean,
    metadata?: Record<string, unknown>
  ): Promise<void>;
}