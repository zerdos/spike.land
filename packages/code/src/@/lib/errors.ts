/**
 * Error codes for categorizing application errors
 */
export enum ErrorCode {
  WEBSOCKET_ERROR = "WEBSOCKET_ERROR",
  DOM_ERROR = "DOM_ERROR",
  ROUTER_ERROR = "ROUTER_ERROR",
  MESSAGE_ERROR = "MESSAGE_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  CACHE_ERROR = "CACHE_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

/**
 * Base error class for application-specific errors
 */
export class AppError extends Error {
  readonly code: ErrorCode;
  readonly details?: unknown;
  readonly timestamp: number;

  constructor(message: string, code: ErrorCode = ErrorCode.UNKNOWN_ERROR, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.timestamp = Date.now();
    Error.captureStackTrace?.(this, this.constructor);
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

/**
 * Error thrown when WebSocket operations fail
 */
export class WebSocketError extends AppError {
  readonly originalError: Error | undefined;

  constructor(message: string, originalError?: Error) {
    super(message, ErrorCode.WEBSOCKET_ERROR, { originalError });
    this.originalError = originalError;
    if (originalError?.stack) {
      this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
    }
  }
}

/**
 * Error thrown when DOM operations fail
 */
export class DOMError extends AppError {
  readonly elementId: string | undefined;

  constructor(message: string, elementId?: string) {
    const fullMessage = `${message}${elementId ? ` (Element: ${elementId})` : ""}`;
    super(fullMessage, ErrorCode.DOM_ERROR, { elementId });
    this.elementId = elementId;
  }
}

/**
 * Error thrown when route operations fail
 */
export class RouterError extends AppError {
  readonly path: string | undefined;

  constructor(message: string, path?: string) {
    const fullMessage = `${message}${path ? ` (Path: ${path})` : ""}`;
    super(fullMessage, ErrorCode.ROUTER_ERROR, { path });
    this.path = path;
  }
}

/**
 * Error thrown when message handling fails
 */
export class MessageHandlingError extends AppError {
  readonly data?: unknown;

  constructor(message: string, data?: unknown) {
    super(message, ErrorCode.MESSAGE_ERROR, { data });
    this.data = data;
  }
}

/**
 * Error thrown when network operations fail
 */
export class NetworkError extends AppError {
  readonly url: string | undefined;
  readonly statusCode: number | undefined;

  constructor(message: string, url?: string, statusCode?: number) {
    super(message, ErrorCode.NETWORK_ERROR, { url, statusCode });
    this.url = url;
    this.statusCode = statusCode;
  }
}

/**
 * Error thrown when cache operations fail
 */
export class CacheError extends AppError {
  readonly cacheName: string | undefined;

  constructor(message: string, cacheName?: string) {
    super(message, ErrorCode.CACHE_ERROR, { cacheName });
    this.cacheName = cacheName;
  }
}

/**
 * Error thrown when validation fails
 */
export class ValidationError extends AppError {
  readonly field: string | undefined;

  constructor(message: string, field?: string) {
    super(message, ErrorCode.VALIDATION_ERROR, { field });
    this.field = field;
  }
}

/**
 * Unified error factory for creating typed errors
 */
export function createError(
  code: ErrorCode,
  message: string,
  details?: unknown,
): AppError {
  switch (code) {
    case ErrorCode.WEBSOCKET_ERROR:
      return new WebSocketError(
        message,
        details instanceof Error ? details : undefined,
      );
    case ErrorCode.DOM_ERROR:
      return new DOMError(
        message,
        typeof details === "string" ? details : undefined,
      );
    case ErrorCode.ROUTER_ERROR:
      return new RouterError(
        message,
        typeof details === "string" ? details : undefined,
      );
    case ErrorCode.MESSAGE_ERROR:
      return new MessageHandlingError(message, details);
    case ErrorCode.NETWORK_ERROR: {
      const networkDetails = details as { url?: string; statusCode?: number } | undefined;
      return new NetworkError(message, networkDetails?.url, networkDetails?.statusCode);
    }
    case ErrorCode.CACHE_ERROR:
      return new CacheError(
        message,
        typeof details === "string" ? details : undefined,
      );
    case ErrorCode.VALIDATION_ERROR:
      return new ValidationError(
        message,
        typeof details === "string" ? details : undefined,
      );
    default:
      return new AppError(message, code, details);
  }
}

/**
 * Helper function to safely get error message from unknown error
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

/**
 * Helper function to safely get error code from unknown error
 */
export const getErrorCode = (error: unknown): ErrorCode => {
  if (error instanceof AppError) {
    return error.code;
  }
  return ErrorCode.UNKNOWN_ERROR;
};

/**
 * Type guard to check if an error is an AppError
 */
export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

/**
 * Wrap an unknown error into an AppError
 */
export const wrapError = (error: unknown, code?: ErrorCode): AppError => {
  if (error instanceof AppError) {
    return error;
  }
  const message = getErrorMessage(error);
  return new AppError(message, code ?? ErrorCode.UNKNOWN_ERROR, { originalError: error });
};
