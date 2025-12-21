import type { NextRequest } from "next/server";
import type { AuthContext, Env, User } from "../src/types";
import { AuthService } from "../src/utils/auth";
import { APIError, AuthenticationError, AuthorizationError, ErrorHandler } from "./error-handler";
import { applyRateLimit } from "./rate-limiting";
import type { RATE_LIMIT_RULES } from "./rate-limiting";

export interface MiddlewareContext {
  env: Env;
  request: NextRequest;
  authContext?: AuthContext;
  user?: User;
  requestId: string;
}

export interface MiddlewareOptions {
  requireAuth?: boolean;
  rateLimit?: keyof typeof RATE_LIMIT_RULES;
  subscriptionRequired?: "free" | "pro" | "enterprise";
  roles?: string[];
  validateBody?: boolean;
}

export type MiddlewareHandler = (
  context: MiddlewareContext,
  next: () => Promise<Response>,
) => Promise<Response>;

export class MiddlewareManager {
  private errorHandlerInstance: ErrorHandler;

  constructor(isDevelopment: boolean = false) {
    this.errorHandlerInstance = new ErrorHandler(isDevelopment);
  }

  /**
   * Authentication middleware
   */
  auth(required: boolean = true): MiddlewareHandler {
    return async (context, next) => {
      const { env, request } = context;
      const authService = new AuthService(env);

      try {
        const authContext = await authService.verifyRequest(request);

        if (!authContext && required) {
          throw new AuthenticationError("Authentication required");
        }

        if (authContext) {
          const user = await authService.getUserFromClerkId(authContext.clerkId);
          context.authContext = authContext;
          context.user = user || undefined;
        }

        return next();
      } catch (error) {
        if (error instanceof AuthenticationError && !required) {
          return next();
        }
        throw error;
      }
    };
  }

  /**
   * Rate limiting middleware
   */
  rateLimit(ruleName: keyof typeof RATE_LIMIT_RULES): MiddlewareHandler {
    return async (context, next) => {
      const { env, request, authContext } = context;

      // Get identifier for rate limiting
      const identifier = authContext?.userId ||
        request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-forwarded-for") ||
        "unknown";

      const rateLimitResponse = await applyRateLimit(env, request, ruleName, identifier);
      if (rateLimitResponse) {
        return rateLimitResponse;
      }

      return next();
    };
  }

  /**
   * Subscription requirement middleware
   */
  subscriptionRequired(minTier: "free" | "pro" | "enterprise"): MiddlewareHandler {
    return async (context, next) => {
      const { user } = context;

      if (!user) {
        throw new AuthenticationError("User authentication required for subscription check");
      }

      const tierHierarchy: Record<string, number> = { free: 0, pro: 1, enterprise: 2 };
      const userTier = user.subscription_tier || "free";
      const requiredTier = minTier;

      if (tierHierarchy[userTier] < tierHierarchy[requiredTier]) {
        throw new AuthorizationError(`${requiredTier} subscription required`);
      }

      return next();
    };
  }

  /**
   * Credit check middleware
   */
  creditsRequired(minCredits: number = 1): MiddlewareHandler {
    return async (context, next) => {
      const { user } = context;

      if (!user) {
        throw new AuthenticationError("User authentication required for credit check");
      }

      const userCredits = user.credits || 0;
      if (user.subscription_tier === "free" && userCredits < minCredits) {
        throw new AuthorizationError(
          `Insufficient credits. Required: ${minCredits}, Available: ${userCredits}`,
        );
      }

      return next();
    };
  }

  /**
   * Request validation middleware
   */
  validateRequest(options: {
    bodyRequired?: boolean;
    contentType?: string;
    maxBodySize?: number;
  } = {}): MiddlewareHandler {
    return async (context, next) => {
      const { request } = context;
      const {
        bodyRequired = false,
        contentType = "application/json",
        maxBodySize = 10 * 1024 * 1024,
      } = options;

      // Check content type for POST/PUT requests
      if (["POST", "PUT", "PATCH"].includes(request.method)) {
        const requestContentType = request.headers.get("content-type");

        if (bodyRequired && !requestContentType) {
          throw new APIError("Content-Type header is required", "MISSING_CONTENT_TYPE", 400);
        }

        if (requestContentType && !requestContentType.includes(contentType)) {
          throw new APIError(
            `Content-Type must be ${contentType}`,
            "INVALID_CONTENT_TYPE",
            415,
          );
        }

        // Check content length
        const contentLength = request.headers.get("content-length");
        if (contentLength && parseInt(contentLength) > maxBodySize) {
          throw new APIError(
            `Request body too large. Maximum size: ${maxBodySize} bytes`,
            "REQUEST_TOO_LARGE",
            413,
          );
        }
      }

      return next();
    };
  }

  /**
   * CORS middleware
   */
  cors(): MiddlewareHandler {
    return async (context, next) => {
      const { request } = context;

      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, X-User-Id, X-Conversation-Id",
            "Access-Control-Max-Age": "86400",
          },
        });
      }

      const response = await next();

      // Add CORS headers to response
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-User-Id, X-Conversation-Id",
      );

      return response;
    };
  }

  /**
   * Request ID middleware
   */
  requestId(): MiddlewareHandler {
    return async (context, next) => {
      context.requestId = this.errorHandlerInstance.generateRequestId();

      const response = await next();
      response.headers.set("X-Request-ID", context.requestId);

      return response;
    };
  }

  /**
   * Logging middleware
   */
  logging(): MiddlewareHandler {
    return async (context, next) => {
      const { request, requestId } = context;
      const startTime = Date.now();

      console.log(`[${requestId}] ${request.method} ${new URL(request.url).pathname} - Started`);

      try {
        const response = await next();
        const duration = Date.now() - startTime;

        console.log(
          `[${requestId}] ${request.method} ${new URL(request.url).pathname} - ` +
            `${response.status} (${duration}ms)`,
        );

        return response;
      } catch (error) {
        const duration = Date.now() - startTime;
        console.error(
          `[${requestId}] ${request.method} ${new URL(request.url).pathname} - ` +
            `Error (${duration}ms):`,
          error,
        );
        throw error;
      }
    };
  }

  /**
   * Error handling middleware (should be the outermost middleware)
   */
  errorHandler(): MiddlewareHandler {
    return async (context, next) => {
      try {
        return await next();
      } catch (error) {
        return this.errorHandlerInstance.handleError(error, context.requestId);
      }
    };
  }

  /**
   * Compose multiple middlewares into a single handler
   */
  compose(...middlewares: MiddlewareHandler[]): MiddlewareHandler {
    return (context, next) => {
      let index = -1;

      const dispatch = (i: number): Promise<Response> => {
        if (i <= index) {
          return Promise.reject(new Error("next() called multiple times"));
        }
        index = i;

        let middleware = middlewares[i];
        if (i === middlewares.length) {
          middleware = (_, n) => n();
        }

        if (!middleware) {
          return next();
        }

        try {
          return Promise.resolve(
            middleware(context, () => dispatch(i + 1)),
          );
        } catch (error) {
          return Promise.reject(error);
        }
      };

      return dispatch(0);
    };
  }

  /**
   * Create a middleware stack with common middlewares
   */
  createStack(options: MiddlewareOptions = {}): MiddlewareHandler {
    const middlewares: MiddlewareHandler[] = [
      this.errorHandler(),
      this.requestId(),
      this.logging(),
      this.cors(),
      this.validateRequest({ bodyRequired: options.validateBody }),
    ];

    if (options.requireAuth) {
      middlewares.push(this.auth(true));
    }

    if (options.rateLimit) {
      middlewares.push(this.rateLimit(options.rateLimit));
    }

    if (options.subscriptionRequired) {
      middlewares.push(this.subscriptionRequired(options.subscriptionRequired));
    }

    return this.compose(...middlewares);
  }

  /**
   * Execute middleware stack with a handler
   */
  async execute(
    env: Env,
    request: NextRequest,
    handler: (context: MiddlewareContext) => Promise<Response>,
    options: MiddlewareOptions = {},
  ): Promise<Response> {
    const context: MiddlewareContext = {
      env,
      request,
      requestId: "",
    };

    const middleware = this.createStack(options);

    return middleware(context, () => handler(context));
  }
}

// Convenience functions for common middleware patterns
export function createAPIHandler(
  handler: (context: MiddlewareContext) => Promise<Response>,
  options: MiddlewareOptions = {},
) {
  const middlewareManager = new MiddlewareManager(process.env.NODE_ENV === "development");

  return async (request: NextRequest): Promise<Response> => {
    const env = process.env as unknown as Env;
    return middlewareManager.execute(env, request, handler, options);
  };
}

export function createAuthenticatedHandler(
  handler: (context: MiddlewareContext) => Promise<Response>,
  options: Omit<MiddlewareOptions, "requireAuth"> = {},
) {
  return createAPIHandler(handler, { ...options, requireAuth: true });
}

export function createRateLimitedHandler(
  handler: (context: MiddlewareContext) => Promise<Response>,
  rateLimit: keyof typeof RATE_LIMIT_RULES,
  options: Omit<MiddlewareOptions, "rateLimit"> = {},
) {
  return createAPIHandler(handler, { ...options, rateLimit });
}

// Utility function to extract common request data
export async function parseRequestBody<T = Record<string, unknown>>(
  request: NextRequest,
): Promise<T> {
  try {
    const body = await request.json();
    return body as T;
  } catch (_error) {
    throw new APIError("Invalid JSON in request body", "INVALID_JSON", 400);
  }
}

export function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function getUserAgent(request: NextRequest): string {
  return request.headers.get("user-agent") || "unknown";
}

// Request context helpers
export function hasPermission(
  user: User | undefined,
  resource: string,
  action: string,
): boolean {
  // Basic permission check - can be extended based on requirements
  if (!user) return false;

  // Admin users have all permissions
  if (user.subscription_tier === "enterprise") return true;

  // Define basic permissions based on subscription tiers
  const permissions: Record<string, Record<string, string[]>> = {
    free: {
      conversations: ["read", "create"],
      messages: ["read", "create"],
      user: ["read", "update"],
    },
    pro: {
      conversations: ["read", "create", "update", "delete"],
      messages: ["read", "create", "update", "delete", "regenerate"],
      user: ["read", "update"],
      attachments: ["read", "create", "delete"],
    },
    enterprise: {
      "*": ["*"], // All permissions
    },
  };

  const userTier = user.subscription_tier || "free";
  const resourcePermissions = permissions[userTier]?.[resource] || [];

  return (
    resourcePermissions.includes(action) ||
    resourcePermissions.includes("*") ||
    permissions[userTier]?.["*"]?.includes("*")
  );
}

export function requirePermission(
  user: User | undefined,
  resource: string,
  action: string,
): void {
  if (!hasPermission(user, resource, action)) {
    throw new AuthorizationError(
      `Insufficient permissions for ${action} on ${resource}`,
    );
  }
}
