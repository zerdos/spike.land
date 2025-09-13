import type { Env } from "../src/types";

export interface RateLimitRule {
  requests: number;
  window: number; // in seconds
}

export interface RateLimitOptions {
  key: string;
  rule: RateLimitRule;
  identifier?: string; // IP, user ID, etc.
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  totalRequests: number;
}

export class RateLimiter {
  private kv: KVNamespace;

  constructor(env: Env) {
    this.kv = env.KV_STORE;
  }

  /**
   * Check if a request is within rate limits
   */
  async checkRateLimit(options: RateLimitOptions): Promise<RateLimitResult> {
    const { key, rule, identifier = "" } = options;
    const rateLimitKey = `rate_limit:${key}:${identifier}`;

    try {
      // Get current count and window start time
      const current = await this.kv.get(rateLimitKey);
      const now = Math.floor(Date.now() / 1000);

      if (!current) {
        // First request in this window
        const windowData = {
          count: 1,
          windowStart: now,
        };

        await this.kv.put(
          rateLimitKey,
          JSON.stringify(windowData),
          { expirationTtl: rule.window }
        );

        return {
          allowed: true,
          remaining: rule.requests - 1,
          resetTime: now + rule.window,
          totalRequests: 1,
        };
      }

      const windowData = JSON.parse(current);
      const windowAge = now - windowData.windowStart;

      if (windowAge >= rule.window) {
        // Window has expired, start a new one
        const newWindowData = {
          count: 1,
          windowStart: now,
        };

        await this.kv.put(
          rateLimitKey,
          JSON.stringify(newWindowData),
          { expirationTtl: rule.window }
        );

        return {
          allowed: true,
          remaining: rule.requests - 1,
          resetTime: now + rule.window,
          totalRequests: 1,
        };
      }

      // Check if within limits
      if (windowData.count >= rule.requests) {
        return {
          allowed: false,
          remaining: 0,
          resetTime: windowData.windowStart + rule.window,
          totalRequests: windowData.count,
        };
      }

      // Increment counter
      const updatedWindowData = {
        count: windowData.count + 1,
        windowStart: windowData.windowStart,
      };

      await this.kv.put(
        rateLimitKey,
        JSON.stringify(updatedWindowData),
        { expirationTtl: rule.window - windowAge }
      );

      return {
        allowed: true,
        remaining: rule.requests - updatedWindowData.count,
        resetTime: windowData.windowStart + rule.window,
        totalRequests: updatedWindowData.count,
      };

    } catch (error) {
      console.error("Rate limiting error:", error);
      // On error, allow the request (fail open)
      return {
        allowed: true,
        remaining: rule.requests - 1,
        resetTime: now + rule.window,
        totalRequests: 1,
      };
    }
  }

  /**
   * Create rate limit response headers
   */
  createRateLimitHeaders(result: RateLimitResult, rule: RateLimitRule): Record<string, string> {
    return {
      "X-RateLimit-Limit": rule.requests.toString(),
      "X-RateLimit-Remaining": result.remaining.toString(),
      "X-RateLimit-Reset": result.resetTime.toString(),
      "X-RateLimit-Window": rule.window.toString(),
    };
  }

  /**
   * Reset rate limit for a specific key
   */
  async resetRateLimit(key: string, identifier?: string): Promise<void> {
    const rateLimitKey = `rate_limit:${key}:${identifier || ""}`;
    await this.kv.delete(rateLimitKey);
  }
}

// Predefined rate limit rules
export const RATE_LIMIT_RULES = {
  // API endpoints
  chat: { requests: 60, window: 60 }, // 60 requests per minute
  conversations_read: { requests: 120, window: 60 }, // 120 reads per minute
  conversations_write: { requests: 20, window: 60 }, // 20 writes per minute
  messages_read: { requests: 200, window: 60 }, // 200 reads per minute
  messages_write: { requests: 60, window: 60 }, // 60 writes per minute
  websocket: { requests: 100, window: 60 }, // 100 WebSocket messages per minute

  // Authentication
  auth_verify: { requests: 300, window: 60 }, // 300 auth checks per minute

  // User actions
  user_signup: { requests: 5, window: 300 }, // 5 signups per 5 minutes
  password_reset: { requests: 3, window: 900 }, // 3 resets per 15 minutes

  // Subscription actions
  subscription_create: { requests: 2, window: 60 }, // 2 subscription actions per minute
  payment_create: { requests: 3, window: 300 }, // 3 payments per 5 minutes

  // File uploads
  file_upload: { requests: 10, window: 60 }, // 10 uploads per minute

  // AI-specific limits
  ai_generation: { requests: 30, window: 60 }, // 30 AI generations per minute
  ai_regeneration: { requests: 10, window: 60 }, // 10 regenerations per minute
} as const;

/**
 * Middleware function to apply rate limiting
 */
export async function applyRateLimit(
  env: Env,
  request: Request,
  ruleName: keyof typeof RATE_LIMIT_RULES,
  identifier?: string
): Promise<Response | null> {
  const rateLimiter = new RateLimiter(env);

  // Get identifier from request if not provided
  const clientIdentifier = identifier ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-user-id") ||
    "unknown";

  const rule = RATE_LIMIT_RULES[ruleName];
  const result = await rateLimiter.checkRateLimit({
    key: ruleName,
    rule,
    identifier: clientIdentifier,
  });

  if (!result.allowed) {
    const headers = rateLimiter.createRateLimitHeaders(result, rule);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Rate limit exceeded. Please try again later.",
        retryAfter: result.resetTime - Math.floor(Date.now() / 1000),
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": (result.resetTime - Math.floor(Date.now() / 1000)).toString(),
          ...headers,
        },
      }
    );
  }

  return null; // No rate limit exceeded
}

/**
 * Get rate limit status for a user/IP
 */
export async function getRateLimitStatus(
  env: Env,
  ruleName: keyof typeof RATE_LIMIT_RULES,
  identifier: string
): Promise<{
  rule: RateLimitRule;
  current: RateLimitResult;
}> {
  const rateLimiter = new RateLimiter(env);
  const rule = RATE_LIMIT_RULES[ruleName];

  // This doesn't increment the counter, just checks status
  const rateLimitKey = `rate_limit:${ruleName}:${identifier}`;
  const current = await env.KV_STORE.get(rateLimitKey);
  const now = Math.floor(Date.now() / 1000);

  if (!current) {
    return {
      rule,
      current: {
        allowed: true,
        remaining: rule.requests,
        resetTime: now + rule.window,
        totalRequests: 0,
      },
    };
  }

  const windowData = JSON.parse(current);
  const windowAge = now - windowData.windowStart;

  if (windowAge >= rule.window) {
    return {
      rule,
      current: {
        allowed: true,
        remaining: rule.requests,
        resetTime: now + rule.window,
        totalRequests: 0,
      },
    };
  }

  return {
    rule,
    current: {
      allowed: windowData.count < rule.requests,
      remaining: Math.max(0, rule.requests - windowData.count),
      resetTime: windowData.windowStart + rule.window,
      totalRequests: windowData.count,
    },
  };
}

/**
 * Create a rate limit response with proper headers
 */
export function createRateLimitResponse(
  result: RateLimitResult,
  rule: RateLimitRule,
  message?: string
): Response {
  const rateLimiter = new (class {
    createRateLimitHeaders = RateLimiter.prototype.createRateLimitHeaders;
  })();

  const headers = rateLimiter.createRateLimitHeaders(result, rule);

  return new Response(
    JSON.stringify({
      success: false,
      error: message || "Rate limit exceeded. Please try again later.",
      rateLimitInfo: {
        limit: rule.requests,
        remaining: result.remaining,
        resetTime: result.resetTime,
        window: rule.window,
      },
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": (result.resetTime - Math.floor(Date.now() / 1000)).toString(),
        ...headers,
      },
    }
  );
}

/**
 * Subscription-based rate limiting
 */
export function getSubscriptionRateLimit(subscriptionTier: "free" | "pro" | "business"): {
  chat: RateLimitRule;
  messages: RateLimitRule;
  websocket: RateLimitRule;
} {
  switch (subscriptionTier) {
    case "free":
      return {
        chat: { requests: 20, window: 60 }, // 20 per minute
        messages: { requests: 50, window: 60 }, // 50 per minute
        websocket: { requests: 30, window: 60 }, // 30 per minute
      };
    case "pro":
      return {
        chat: { requests: 100, window: 60 }, // 100 per minute
        messages: { requests: 200, window: 60 }, // 200 per minute
        websocket: { requests: 150, window: 60 }, // 150 per minute
      };
    case "business":
      return {
        chat: { requests: 500, window: 60 }, // 500 per minute
        messages: { requests: 1000, window: 60 }, // 1000 per minute
        websocket: { requests: 500, window: 60 }, // 500 per minute
      };
    default:
      return {
        chat: { requests: 10, window: 60 },
        messages: { requests: 20, window: 60 },
        websocket: { requests: 10, window: 60 },
      };
  }
}