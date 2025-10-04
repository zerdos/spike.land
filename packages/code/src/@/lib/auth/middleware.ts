/**
 * Unified Backend Authentication Middleware
 * Provides security middleware for all backend services
 */

import type { Context, Next } from "hono";
import { createAuthManager } from "./manager";
import type { TokenPayload, User } from "./types";

// Rate limiting storage (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const csrfTokenStore = new Map<string, { token: string; expires: number }>();

export interface AuthMiddlewareOptions {
  requireAuth?: boolean;
  requireRoles?: string[];
  requirePermissions?: { resource: string; action: string }[];
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
  csrfProtection?: boolean;
  ipWhitelist?: string[];
  ipBlacklist?: string[];
}

/**
 * Create authentication middleware for Hono/Express/etc
 */
export function createAuthMiddleware(options: AuthMiddlewareOptions = {}) {
  const authManager = createAuthManager();

  return async (ctx: Context, next: Next) => {
    try {
      // Check IP restrictions
      const clientIP = getClientIP(ctx);
      if (options.ipBlacklist?.includes(clientIP)) {
        return createErrorResponse(ctx, 403, "IP_BLOCKED", "Access denied");
      }
      if (options.ipWhitelist && !options.ipWhitelist.includes(clientIP)) {
        return createErrorResponse(ctx, 403, "IP_NOT_WHITELISTED", "Access denied");
      }

      // Apply rate limiting
      if (options.rateLimit) {
        const rateLimitKey = `${clientIP}:${ctx.req.path}`;
        if (!checkRateLimit(rateLimitKey, options.rateLimit)) {
          return createErrorResponse(ctx, 429, "RATE_LIMITED", "Too many requests");
        }
      }

      // CSRF protection for state-changing methods
      if (options.csrfProtection && ["POST", "PUT", "PATCH", "DELETE"].includes(ctx.req.method)) {
        const csrfToken = ctx.req.header("X-CSRF-Token");
        const sessionId = ctx.get("sessionId");

        if (!csrfToken || !sessionId || !validateCSRFToken(sessionId, csrfToken)) {
          return createErrorResponse(ctx, 403, "CSRF_TOKEN_INVALID", "Invalid CSRF token");
        }
      }

      // Authentication check
      const authHeader = ctx.req.header("Authorization");
      let tokenPayload: TokenPayload | null = null;
      let user: User | null = null;

      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.slice(7);
        tokenPayload = await authManager.verifyToken(token);

        if (tokenPayload) {
          // Get user from token payload (in production, fetch from database)
          user = await getUserFromToken(tokenPayload);
          ctx.set("user", user);
          ctx.set("tokenPayload", tokenPayload);
          ctx.set("sessionId", tokenPayload.sessionId || tokenPayload.jti);
        }
      }

      // Check if authentication is required
      if (options.requireAuth && !user) {
        return createErrorResponse(ctx, 401, "AUTHENTICATION_REQUIRED", "Authentication required");
      }

      // Check role requirements
      if (options.requireRoles && user) {
        const userRoles = (user.metadata?.roles as string[]) || [];
        const hasRequiredRole = options.requireRoles.some((role) => userRoles.includes(role));

        if (!hasRequiredRole) {
          return createErrorResponse(
            ctx,
            403,
            "INSUFFICIENT_PERMISSIONS",
            "Insufficient permissions"
          );
        }
      }

      // Check permission requirements
      if (options.requirePermissions && user) {
        for (const { resource, action } of options.requirePermissions) {
          if (!hasPermission(user, resource, action)) {
            return createErrorResponse(
              ctx,
              403,
              "INSUFFICIENT_PERMISSIONS",
              `No permission for ${action} on ${resource}`
            );
          }
        }
      }

      // Add security headers
      addSecurityHeaders(ctx);

      // Log request
      logAuthRequest(ctx, user?.id, true);

      await next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      logAuthRequest(ctx, undefined, false, error);
      return createErrorResponse(ctx, 500, "AUTH_ERROR", "Authentication error");
    }
  };
}

/**
 * Create CSRF token middleware
 */
export function createCSRFMiddleware() {
  return async (ctx: Context, next: Next) => {
    if (ctx.req.method === "GET") {
      // Generate CSRF token for GET requests
      const sessionId = ctx.get("sessionId") || await generateToken();
      const csrfToken = await generateCSRFToken(sessionId);

      ctx.set("csrfToken", csrfToken);
      ctx.header("X-CSRF-Token", csrfToken);
    }

    await next();
  };
}

/**
 * Create session middleware
 */
export function createSessionMiddleware() {
  const authManager = createAuthManager();

  return async (ctx: Context, next: Next) => {
    // Check for existing session
    const sessionCookie = getCookie(ctx, "session");
    const authHeader = ctx.req.header("Authorization");

    if (sessionCookie) {
      // Validate session cookie
      const session = await validateSessionCookie(sessionCookie);
      if (session) {
        ctx.set("session", session);
        ctx.set("sessionId", session.id);
      }
    } else if (authHeader?.startsWith("Bearer ")) {
      // Create session from bearer token
      const token = authHeader.slice(7);
      const payload = await authManager.verifyToken(token);

      if (payload) {
        const session = {
          id: payload.sessionId || payload.jti || await generateToken(),
          userId: payload.sub,
          expiresAt: new Date(payload.exp * 1000),
        };
        ctx.set("session", session);
        ctx.set("sessionId", session.id);
      }
    }

    await next();

    // Update session cookie if needed
    const session = ctx.get("session");
    if (session) {
      setCookie(ctx, "session", JSON.stringify(session), {
        httpOnly: true,
        secure: process.env["NODE_ENV"] === "production",
        sameSite: "lax",
        maxAge: 86400, // 24 hours
      });
    }
  };
}

/**
 * Security headers middleware
 */
export function createSecurityHeadersMiddleware() {
  return async (ctx: Context, next: Next) => {
    addSecurityHeaders(ctx);
    await next();
  };
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(ctx: Context) {
  ctx.header(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  ctx.header("X-Frame-Options", "DENY");
  ctx.header("X-Content-Type-Options", "nosniff");
  ctx.header("Referrer-Policy", "strict-origin-when-cross-origin");
  ctx.header("Permissions-Policy", "geolocation=(), microphone=(), camera=()");

  if (process.env["NODE_ENV"] === "production") {
    ctx.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
}

/**
 * Check rate limit
 */
function checkRateLimit(
  key: string,
  config: { maxRequests: number; windowMs: number }
): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(key);

  if (!limit || now > limit.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return true;
  }

  if (limit.count >= config.maxRequests) {
    return false;
  }

  limit.count++;
  return true;
}

/**
 * Generate CSRF token
 */
async function generateCSRFToken(sessionId: string): Promise<string> {
  const token = await generateToken();
  const hashedToken = hashSync(token);

  csrfTokenStore.set(sessionId, {
    token: hashedToken,
    expires: Date.now() + 900000, // 15 minutes
  });

  // Clean expired tokens
  cleanExpiredCSRFTokens();

  return token;
}

/**
 * Validate CSRF token
 */
function validateCSRFToken(sessionId: string, token: string): boolean {
  const stored = csrfTokenStore.get(sessionId);

  if (!stored || Date.now() > stored.expires) {
    csrfTokenStore.delete(sessionId);
    return false;
  }

  const hashedToken = hashSync(token);
  return constantTimeCompare(hashedToken, stored.token);
}

/**
 * Simple synchronous hash function
 */
function hashSync(data: string): string {
  // Simple hash for CSRF tokens - not for passwords
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}

/**
 * Constant time comparison to prevent timing attacks
 */
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Clean expired CSRF tokens
 */
function cleanExpiredCSRFTokens() {
  const now = Date.now();
  for (const [sessionId, data] of csrfTokenStore.entries()) {
    if (now > data.expires) {
      csrfTokenStore.delete(sessionId);
    }
  }
}

/**
 * Get client IP address
 */
function getClientIP(ctx: Context): string {
  return (
    ctx.req.header("cf-connecting-ip") ||
    ctx.req.header("x-forwarded-for")?.split(",")[0] ||
    ctx.req.header("x-real-ip") ||
    "unknown"
  );
}

/**
 * Get user from token payload (mock implementation)
 */
async function getUserFromToken(payload: TokenPayload): Promise<User | null> {
  // In production, fetch from database
  return {
    id: payload.sub,
    email: "user@example.com",
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      roles: ["user"],
      permissions: {
        posts: ["read", "create"],
        comments: ["read", "create"],
      },
    },
  };
}

/**
 * Check if user has permission
 */
function hasPermission(user: User, resource: string, action: string): boolean {
  const permissions = user.metadata?.permissions as Record<string, string[]>;
  if (!permissions) return false;

  const resourcePermissions = permissions[resource];
  if (!resourcePermissions) return false;

  return resourcePermissions.includes(action) || resourcePermissions.includes("*");
}

/**
 * Validate session cookie
 */
async function validateSessionCookie(cookieValue: string): Promise<any> {
  try {
    const session = JSON.parse(cookieValue);
    if (new Date(session.expiresAt) < new Date()) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/**
 * Get cookie value
 */
function getCookie(ctx: Context, name: string): string | undefined {
  const cookies = ctx.req.header("cookie");
  if (!cookies) return undefined;

  const cookie = cookies
    .split(";")
    .find((c) => c.trim().startsWith(name + "="));

  if (!cookie) return undefined;
  return cookie.split("=")[1];
}

/**
 * Set cookie
 */
function setCookie(
  ctx: Context,
  name: string,
  value: string,
  options: {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
    maxAge?: number;
  }
) {
  let cookie = `${name}=${value}`;

  if (options.httpOnly) cookie += "; HttpOnly";
  if (options.secure) cookie += "; Secure";
  if (options.sameSite) cookie += `; SameSite=${options.sameSite}`;
  if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`;

  ctx.header("Set-Cookie", cookie);
}

/**
 * Generate random token
 */
async function generateToken(): Promise<string> {
  if (typeof globalThis.crypto !== "undefined") {
    const buffer = new Uint8Array(32);
    globalThis.crypto.getRandomValues(buffer);
    return btoa(String.fromCharCode(...buffer))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }
  // Fallback for Node.js
  const crypto = await import("crypto");
  return crypto.randomBytes(32).toString("base64url");
}

/**
 * Log authentication request
 */
function logAuthRequest(
  ctx: Context,
  userId?: string,
  success: boolean = true,
  error?: any
) {
  const log = {
    timestamp: new Date().toISOString(),
    method: ctx.req.method,
    path: ctx.req.path,
    ip: getClientIP(ctx),
    userAgent: ctx.req.header("user-agent"),
    userId,
    success,
    error: error?.message,
  };

  if (success) {
    console.log("Auth Request:", log);
  } else {
    console.error("Auth Request Failed:", log);
  }
}

/**
 * Create error response
 */
function createErrorResponse(
  ctx: Context,
  status: number,
  code: string,
  message: string
) {
  return ctx.json(
    {
      error: {
        code,
        message,
        timestamp: new Date().toISOString(),
      },
    },
    status
  );
}

/**
 * Create API key authentication middleware
 */
export function createAPIKeyMiddleware(validKeys: Set<string>) {
  return async (ctx: Context, next: Next) => {
    const apiKey = ctx.req.header("X-API-Key");

    if (!apiKey || !validKeys.has(apiKey)) {
      return createErrorResponse(ctx, 401, "INVALID_API_KEY", "Invalid API key");
    }

    // Log API key usage
    logAuthRequest(ctx, `api-key:${apiKey.slice(0, 8)}...`, true);

    await next();
  };
}

/**
 * Create webhook signature verification middleware
 */
export function createWebhookMiddleware(secret: string) {
  return async (ctx: Context, next: Next) => {
    const signature = ctx.req.header("X-Webhook-Signature");
    const timestamp = ctx.req.header("X-Webhook-Timestamp");

    if (!signature || !timestamp) {
      return createErrorResponse(ctx, 401, "MISSING_SIGNATURE", "Missing webhook signature");
    }

    // Check timestamp to prevent replay attacks
    const timestampMs = parseInt(timestamp);
    if (isNaN(timestampMs) || Date.now() - timestampMs > 300000) {
      // 5 minutes
      return createErrorResponse(ctx, 401, "EXPIRED_SIGNATURE", "Webhook signature expired");
    }

    // Verify signature
    const body = await ctx.req.text();
    const expectedSignature = hashSync(`${timestamp}.${body}.${secret}`);

    if (!constantTimeCompare(signature, expectedSignature)) {
      return createErrorResponse(ctx, 401, "INVALID_SIGNATURE", "Invalid webhook signature");
    }

    // Restore body for next middleware
    ctx.set("rawBody", body);

    await next();
  };
}

/**
 * Export middleware for different frameworks
 */
export const authMiddleware = {
  hono: createAuthMiddleware,
  csrf: createCSRFMiddleware,
  session: createSessionMiddleware,
  securityHeaders: createSecurityHeadersMiddleware,
  apiKey: createAPIKeyMiddleware,
  webhook: createWebhookMiddleware,
};