import type { APIResponse } from "../src/types";

export interface ErrorDetails {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
  timestamp: string;
  requestId?: string;
}

export class APIError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;
  public readonly timestamp: string;

  constructor(
    message: string,
    code: string = "INTERNAL_ERROR",
    statusCode: number = 500,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "APIError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

// Predefined error types
export class ValidationError extends APIError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, "VALIDATION_ERROR", 400, details);
  }
}

export class AuthenticationError extends APIError {
  constructor(message: string = "Authentication required") {
    super(message, "AUTHENTICATION_ERROR", 401);
  }
}

export class AuthorizationError extends APIError {
  constructor(message: string = "Insufficient permissions") {
    super(message, "AUTHORIZATION_ERROR", 403);
  }
}

export class NotFoundError extends APIError {
  constructor(message: string = "Resource not found") {
    super(message, "NOT_FOUND", 404);
  }
}

export class ConflictError extends APIError {
  constructor(message: string = "Resource conflict") {
    super(message, "CONFLICT", 409);
  }
}

export class RateLimitError extends APIError {
  constructor(message: string = "Rate limit exceeded", details?: Record<string, unknown>) {
    super(message, "RATE_LIMIT_EXCEEDED", 429, details);
  }
}

export class DatabaseError extends APIError {
  constructor(message: string = "Database operation failed", details?: Record<string, unknown>) {
    super(message, "DATABASE_ERROR", 500, details);
  }
}

export class ExternalServiceError extends APIError {
  constructor(
    service: string,
    message: string = "External service error",
    details?: Record<string, unknown>,
  ) {
    super(`${service}: ${message}`, "EXTERNAL_SERVICE_ERROR", 502, {
      service,
      ...details,
    });
  }
}

export class AIServiceError extends APIError {
  constructor(message: string = "AI service error", details?: Record<string, unknown>) {
    super(message, "AI_SERVICE_ERROR", 502, details);
  }
}

export class WebSocketError extends APIError {
  constructor(message: string = "WebSocket error", details?: Record<string, unknown>) {
    super(message, "WEBSOCKET_ERROR", 400, details);
  }
}

export class SubscriptionError extends APIError {
  constructor(message: string = "Subscription error", details?: Record<string, unknown>) {
    super(message, "SUBSCRIPTION_ERROR", 402, details);
  }
}

export class FileUploadError extends APIError {
  constructor(message: string = "File upload error", details?: Record<string, unknown>) {
    super(message, "FILE_UPLOAD_ERROR", 400, details);
  }
}

// Error handler class
export class ErrorHandler {
  private isDevelopment: boolean;

  constructor(isDevelopment: boolean = false) {
    this.isDevelopment = isDevelopment;
  }

  /**
   * Handle and format errors for API responses
   */
  handleError(error: unknown, requestId?: string): Response {
    console.error("API Error:", error);

    let errorDetails: ErrorDetails;

    if (error instanceof APIError) {
      errorDetails = {
        code: error.code,
        message: error.message,
        statusCode: error.statusCode,
        details: error.details,
        timestamp: error.timestamp,
        requestId,
      };
    } else if (error instanceof Error) {
      errorDetails = {
        code: "INTERNAL_ERROR",
        message: this.isDevelopment ? error.message : "Internal server error",
        statusCode: 500,
        details: this.isDevelopment ? { stack: error.stack } : undefined,
        timestamp: new Date().toISOString(),
        requestId,
      };
    } else {
      errorDetails = {
        code: "UNKNOWN_ERROR",
        message: "An unexpected error occurred",
        statusCode: 500,
        timestamp: new Date().toISOString(),
        requestId,
      };
    }

    const response: APIResponse = {
      success: false,
      error: errorDetails.message,
      ...(this.isDevelopment && {
        errorDetails: {
          code: errorDetails.code,
          timestamp: errorDetails.timestamp,
          details: errorDetails.details,
          requestId: errorDetails.requestId,
        },
      }),
    };

    return new Response(JSON.stringify(response), {
      status: errorDetails.statusCode,
      headers: {
        "Content-Type": "application/json",
        "X-Error-Code": errorDetails.code,
        "X-Error-Timestamp": errorDetails.timestamp,
        ...(requestId && { "X-Request-ID": requestId }),
      },
    });
  }

  /**
   * Create success response
   */
  success<T = unknown>(
    data?: T,
    message?: string,
    statusCode: number = 200,
  ): Response {
    const response: APIResponse<T> = {
      success: true,
      ...(data !== undefined && { data }),
      ...(message && { message }),
    };

    return new Response(JSON.stringify(response), {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Create paginated response
   */
  paginatedSuccess<T = unknown>(
    data: T[],
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    },
    message?: string,
  ): Response {
    const response = {
      success: true,
      data,
      pagination,
      ...(message && { message }),
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Total-Count": pagination.total.toString(),
        "X-Page": pagination.page.toString(),
        "X-Per-Page": pagination.limit.toString(),
        "X-Total-Pages": pagination.totalPages.toString(),
      },
    });
  }

  /**
   * Validate required fields in request body
   */
  validateRequiredFields(
    body: Record<string, unknown>,
    requiredFields: string[],
  ): void {
    const missingFields = requiredFields.filter(field => {
      const value = body[field];
      return value === undefined || value === null || value === "";
    });

    if (missingFields.length > 0) {
      throw new ValidationError(
        `Missing required fields: ${missingFields.join(", ")}`,
        { missingFields, providedFields: Object.keys(body) },
      );
    }
  }

  /**
   * Validate field types
   */
  validateFieldTypes(
    body: Record<string, unknown>,
    fieldTypes: Record<string, string>,
  ): void {
    const typeErrors: string[] = [];

    Object.entries(fieldTypes).forEach(([field, expectedType]) => {
      const value = body[field];
      if (value === undefined || value === null) return;

      const actualType = typeof value;
      if (actualType !== expectedType) {
        typeErrors.push(`${field} must be of type ${expectedType}, got ${actualType}`);
      }
    });

    if (typeErrors.length > 0) {
      throw new ValidationError(
        `Type validation failed: ${typeErrors.join(", ")}`,
        { typeErrors },
      );
    }
  }

  /**
   * Validate string constraints
   */
  validateStringConstraints(
    body: Record<string, unknown>,
    constraints: Record<string, { minLength?: number; maxLength?: number; pattern?: RegExp; }>,
  ): void {
    const constraintErrors: string[] = [];

    Object.entries(constraints).forEach(([field, constraint]) => {
      const value = body[field];
      if (typeof value !== "string") return;

      if (constraint.minLength && value.length < constraint.minLength) {
        constraintErrors.push(`${field} must be at least ${constraint.minLength} characters long`);
      }

      if (constraint.maxLength && value.length > constraint.maxLength) {
        constraintErrors.push(
          `${field} must be no more than ${constraint.maxLength} characters long`,
        );
      }

      if (constraint.pattern && !constraint.pattern.test(value)) {
        constraintErrors.push(`${field} does not match required pattern`);
      }
    });

    if (constraintErrors.length > 0) {
      throw new ValidationError(
        `Constraint validation failed: ${constraintErrors.join(", ")}`,
        { constraintErrors },
      );
    }
  }

  /**
   * Generate unique request ID
   */
  generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }
}

// Utility functions for common error scenarios
export function throwIfNotFound<T>(value: T | null | undefined, message?: string): T {
  if (value === null || value === undefined) {
    throw new NotFoundError(message);
  }
  return value;
}

export function throwIfUnauthorized(condition: boolean, message?: string): void {
  if (!condition) {
    throw new AuthorizationError(message);
  }
}

export function throwIfInvalidInput(
  condition: boolean,
  message?: string,
  details?: Record<string, unknown>,
): void {
  if (!condition) {
    throw new ValidationError(message || "Invalid input", details);
  }
}

export function catchDatabaseError<T>(operation: () => Promise<T>): Promise<T> {
  return operation().catch(error => {
    console.error("Database operation failed:", error);
    throw new DatabaseError("Database operation failed", { originalError: error.message });
  });
}

export function catchExternalServiceError<T>(
  service: string,
  operation: () => Promise<T>,
): Promise<T> {
  return operation().catch(error => {
    console.error(`External service error (${service}):`, error);
    throw new ExternalServiceError(service, error.message, { originalError: error.message });
  });
}

// Error logging utilities
export function logError(error: unknown, context?: Record<string, unknown>): void {
  const timestamp = new Date().toISOString();

  if (error instanceof APIError) {
    console.error(`[${timestamp}] APIError:`, {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
      context,
    });
  } else if (error instanceof Error) {
    console.error(`[${timestamp}] Error:`, {
      name: error.name,
      message: error.message,
      stack: error.stack,
      context,
    });
  } else {
    console.error(`[${timestamp}] Unknown error:`, { error, context });
  }
}

// CORS headers
export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-User-Id, X-Conversation-Id",
  "Access-Control-Max-Age": "86400",
};

export function addCorsHeaders(response: Response): Response {
  const newResponse = new Response(response.body, response);
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });
  return newResponse;
}

export function createOptionsResponse(): Response {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
