/**
 * @fileoverview Unified error infrastructure for the spike.land application.
 *
 * This module provides a comprehensive error handling system with:
 * - Typed error codes for categorization
 * - Specialized error classes for different error domains
 * - Factory functions for creating errors
 * - Type guards and utility functions
 *
 * @example Basic usage
 * ```typescript
 * import { WebSocketError, ErrorCode, createError } from "@/lib/errors";
 *
 * // Using a specific error class
 * throw new WebSocketError("Connection failed", originalError);
 *
 * // Using the factory function
 * throw createError(ErrorCode.NETWORK_ERROR, "Request failed", { url: "/api/data" });
 * ```
 *
 * @module errors
 */

/**
 * Error codes for categorizing application errors.
 *
 * Use these codes to identify the type of error and handle it appropriately.
 * Each code corresponds to a specific error domain in the application.
 *
 * @example
 * ```typescript
 * import { ErrorCode, getErrorCode } from "@/lib/errors";
 *
 * try {
 *   await fetchData();
 * } catch (error) {
 *   const code = getErrorCode(error);
 *   if (code === ErrorCode.NETWORK_ERROR) {
 *     showRetryButton();
 *   }
 * }
 * ```
 */
export enum ErrorCode {
  /** WebSocket connection, message, or protocol errors */
  WEBSOCKET_ERROR = "WEBSOCKET_ERROR",
  /** DOM manipulation or element access errors */
  DOM_ERROR = "DOM_ERROR",
  /** Routing or navigation errors */
  ROUTER_ERROR = "ROUTER_ERROR",
  /** Message parsing or handling errors */
  MESSAGE_ERROR = "MESSAGE_ERROR",
  /** Network request failures (fetch, HTTP errors) */
  NETWORK_ERROR = "NETWORK_ERROR",
  /** Data validation failures */
  VALIDATION_ERROR = "VALIDATION_ERROR",
  /** Cache read/write/invalidation errors */
  CACHE_ERROR = "CACHE_ERROR",
  /** Transpilation or code processing errors */
  TRANSPILE_ERROR = "TRANSPILE_ERROR",
  /** Session state or management errors */
  SESSION_ERROR = "SESSION_ERROR",
  /** Import or module loading errors */
  IMPORT_ERROR = "IMPORT_ERROR",
  /** Rendering or React-related errors */
  RENDER_ERROR = "RENDER_ERROR",
  /** Fallback for uncategorized errors */
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

/**
 * Base error class for application-specific errors.
 *
 * All specialized error classes extend this base class. It provides:
 * - Error code for categorization
 * - Optional details object for additional context
 * - Timestamp for when the error occurred
 * - JSON serialization support
 *
 * @example
 * ```typescript
 * import { AppError, ErrorCode } from "@/lib/errors";
 *
 * const error = new AppError("Something went wrong", ErrorCode.UNKNOWN_ERROR, {
 *   context: "user action",
 *   userId: "123",
 * });
 *
 * console.log(error.toJSON());
 * // { name: "AppError", message: "...", code: "UNKNOWN_ERROR", ... }
 * ```
 */
export class AppError extends Error {
  /** The error code identifying the error type */
  readonly code: ErrorCode;
  /** Additional context or data related to the error */
  readonly details?: unknown;
  /** Unix timestamp when the error was created */
  readonly timestamp: number;

  /**
   * Creates a new AppError instance.
   *
   * @param message - Human-readable error message
   * @param code - Error code for categorization (defaults to UNKNOWN_ERROR)
   * @param details - Optional additional context or data
   */
  constructor(message: string, code: ErrorCode = ErrorCode.UNKNOWN_ERROR, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    this.timestamp = Date.now();
    Error.captureStackTrace?.(this, this.constructor);
  }

  /**
   * Serializes the error to a plain object for logging or transmission.
   *
   * @returns A JSON-serializable representation of the error
   */
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
 * Error thrown when WebSocket operations fail.
 *
 * Use this for WebSocket connection issues, message send/receive failures,
 * and protocol-level errors.
 *
 * @example
 * ```typescript
 * import { WebSocketError } from "@/lib/errors";
 *
 * socket.onerror = (event) => {
 *   throw new WebSocketError("WebSocket connection lost", event.error);
 * };
 * ```
 */
export class WebSocketError extends AppError {
  /** The original error that caused this WebSocket error, if any */
  readonly originalError: Error | undefined;

  /**
   * Creates a new WebSocketError instance.
   *
   * @param message - Description of the WebSocket failure
   * @param originalError - The underlying error that caused this failure
   */
  constructor(message: string, originalError?: Error) {
    super(message, ErrorCode.WEBSOCKET_ERROR, { originalError });
    this.originalError = originalError;
    if (originalError?.stack) {
      this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
    }
  }
}

/**
 * Error thrown when DOM operations fail.
 *
 * Use this for element not found, invalid element state, or DOM manipulation failures.
 *
 * @example
 * ```typescript
 * import { DOMError } from "@/lib/errors";
 *
 * const element = document.getElementById("app");
 * if (!element) {
 *   throw new DOMError("Container element not found", "app");
 * }
 * ```
 */
export class DOMError extends AppError {
  /** The ID of the DOM element involved, if applicable */
  readonly elementId: string | undefined;

  /**
   * Creates a new DOMError instance.
   *
   * @param message - Description of the DOM operation failure
   * @param elementId - Optional ID of the element that caused the error
   */
  constructor(message: string, elementId?: string) {
    const fullMessage = `${message}${elementId ? ` (Element: ${elementId})` : ""}`;
    super(fullMessage, ErrorCode.DOM_ERROR, { elementId });
    this.elementId = elementId;
  }
}

/**
 * Error thrown when route operations fail.
 *
 * Use this for navigation failures, invalid routes, or routing state issues.
 *
 * @example
 * ```typescript
 * import { RouterError } from "@/lib/errors";
 *
 * if (!isValidRoute(path)) {
 *   throw new RouterError("Invalid route", path);
 * }
 * ```
 */
export class RouterError extends AppError {
  /** The path that caused the routing error, if applicable */
  readonly path: string | undefined;

  /**
   * Creates a new RouterError instance.
   *
   * @param message - Description of the routing failure
   * @param path - Optional path that caused the error
   */
  constructor(message: string, path?: string) {
    const fullMessage = `${message}${path ? ` (Path: ${path})` : ""}`;
    super(fullMessage, ErrorCode.ROUTER_ERROR, { path });
    this.path = path;
  }
}

/**
 * Error thrown when message handling fails.
 *
 * Use this for message parsing errors, invalid message formats,
 * or message processing failures.
 *
 * @example
 * ```typescript
 * import { MessageHandlingError } from "@/lib/errors";
 *
 * try {
 *   const data = JSON.parse(rawMessage);
 * } catch {
 *   throw new MessageHandlingError("Failed to parse message", rawMessage);
 * }
 * ```
 */
export class MessageHandlingError extends AppError {
  /** The message data that caused the error, if available */
  readonly data?: unknown;

  /**
   * Creates a new MessageHandlingError instance.
   *
   * @param message - Description of the message handling failure
   * @param data - Optional message data that caused the error
   */
  constructor(message: string, data?: unknown) {
    super(message, ErrorCode.MESSAGE_ERROR, { data });
    this.data = data;
  }
}

/**
 * Error thrown when network operations fail.
 *
 * Use this for fetch failures, HTTP error responses, timeout errors,
 * and other network-related issues.
 *
 * @example
 * ```typescript
 * import { NetworkError } from "@/lib/errors";
 *
 * const response = await fetch(url);
 * if (!response.ok) {
 *   throw new NetworkError("Request failed", url, response.status);
 * }
 * ```
 */
export class NetworkError extends AppError {
  /** The URL that was being accessed, if applicable */
  readonly url: string | undefined;
  /** The HTTP status code, if applicable */
  readonly statusCode: number | undefined;

  /**
   * Creates a new NetworkError instance.
   *
   * @param message - Description of the network failure
   * @param url - Optional URL that caused the error
   * @param statusCode - Optional HTTP status code
   */
  constructor(message: string, url?: string, statusCode?: number) {
    super(message, ErrorCode.NETWORK_ERROR, { url, statusCode });
    this.url = url;
    this.statusCode = statusCode;
  }
}

/**
 * Error thrown when cache operations fail.
 *
 * Use this for cache read/write failures, cache invalidation issues,
 * and cache storage errors.
 *
 * @example
 * ```typescript
 * import { CacheError } from "@/lib/errors";
 *
 * try {
 *   await caches.open("my-cache");
 * } catch (e) {
 *   throw new CacheError("Failed to open cache", "my-cache");
 * }
 * ```
 */
export class CacheError extends AppError {
  /** The name of the cache that caused the error, if applicable */
  readonly cacheName: string | undefined;

  /**
   * Creates a new CacheError instance.
   *
   * @param message - Description of the cache operation failure
   * @param cacheName - Optional name of the cache involved
   */
  constructor(message: string, cacheName?: string) {
    super(message, ErrorCode.CACHE_ERROR, { cacheName });
    this.cacheName = cacheName;
  }
}

/**
 * Error thrown when validation fails.
 *
 * Use this for input validation failures, schema validation errors,
 * and data constraint violations.
 *
 * @example
 * ```typescript
 * import { ValidationError } from "@/lib/errors";
 *
 * if (!isValidEmail(email)) {
 *   throw new ValidationError("Invalid email format", "email");
 * }
 * ```
 */
export class ValidationError extends AppError {
  /** The field or property that failed validation, if applicable */
  readonly field: string | undefined;

  /**
   * Creates a new ValidationError instance.
   *
   * @param message - Description of the validation failure
   * @param field - Optional field name that failed validation
   */
  constructor(message: string, field?: string) {
    super(message, ErrorCode.VALIDATION_ERROR, { field });
    this.field = field;
  }
}

/**
 * Error thrown when transpilation fails.
 *
 * Use this for TypeScript/JSX transpilation errors, code transformation failures,
 * and compilation issues.
 *
 * @example
 * ```typescript
 * import { TranspileError } from "@/lib/errors";
 *
 * try {
 *   const result = await transpile(code);
 * } catch (e) {
 *   throw new TranspileError("Transpilation failed", code, e);
 * }
 * ```
 */
export class TranspileError extends AppError {
  /** The source code that failed to transpile, if available */
  readonly sourceCode: string | undefined;
  /** The original error from the transpiler, if any */
  readonly originalError: Error | undefined;

  /**
   * Creates a new TranspileError instance.
   *
   * @param message - Description of the transpilation failure
   * @param sourceCode - Optional source code that failed
   * @param originalError - Optional original error from the transpiler
   */
  constructor(message: string, sourceCode?: string, originalError?: Error) {
    super(message, ErrorCode.TRANSPILE_ERROR, { sourceCode, originalError });
    this.sourceCode = sourceCode;
    this.originalError = originalError;
    if (originalError?.stack) {
      this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
    }
  }
}

/**
 * Error thrown when session operations fail.
 *
 * Use this for session state errors, session synchronization issues,
 * and session management failures.
 *
 * @example
 * ```typescript
 * import { SessionError } from "@/lib/errors";
 *
 * if (!session.codeSpace) {
 *   throw new SessionError("Session missing codeSpace", sessionId);
 * }
 * ```
 */
export class SessionError extends AppError {
  /** The session ID involved, if applicable */
  readonly sessionId: string | undefined;

  /**
   * Creates a new SessionError instance.
   *
   * @param message - Description of the session failure
   * @param sessionId - Optional session ID
   */
  constructor(message: string, sessionId?: string) {
    super(message, ErrorCode.SESSION_ERROR, { sessionId });
    this.sessionId = sessionId;
  }
}

/**
 * Error thrown when module imports fail.
 *
 * Use this for dynamic import failures, module resolution errors,
 * and import-related issues.
 *
 * @example
 * ```typescript
 * import { ImportError } from "@/lib/errors";
 *
 * try {
 *   const module = await import(path);
 * } catch (e) {
 *   throw new ImportError("Failed to import module", path, e);
 * }
 * ```
 */
export class ImportError extends AppError {
  /** The module path that failed to import, if applicable */
  readonly modulePath: string | undefined;
  /** The original error from the import, if any */
  readonly originalError: Error | undefined;

  /**
   * Creates a new ImportError instance.
   *
   * @param message - Description of the import failure
   * @param modulePath - Optional path of the module that failed
   * @param originalError - Optional original error from the import
   */
  constructor(message: string, modulePath?: string, originalError?: Error) {
    super(message, ErrorCode.IMPORT_ERROR, { modulePath, originalError });
    this.modulePath = modulePath;
    this.originalError = originalError;
    if (originalError?.stack) {
      this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
    }
  }
}

/**
 * Error thrown when rendering fails.
 *
 * Use this for React rendering errors, component mount failures,
 * and render-related issues.
 *
 * @example
 * ```typescript
 * import { RenderError } from "@/lib/errors";
 *
 * try {
 *   root.render(<App />);
 * } catch (e) {
 *   throw new RenderError("Failed to render component", "App", e);
 * }
 * ```
 */
export class RenderError extends AppError {
  /** The component name that failed to render, if applicable */
  readonly componentName: string | undefined;
  /** The original error from rendering, if any */
  readonly originalError: Error | undefined;

  /**
   * Creates a new RenderError instance.
   *
   * @param message - Description of the render failure
   * @param componentName - Optional name of the component that failed
   * @param originalError - Optional original error from rendering
   */
  constructor(message: string, componentName?: string, originalError?: Error) {
    super(message, ErrorCode.RENDER_ERROR, { componentName, originalError });
    this.componentName = componentName;
    this.originalError = originalError;
    if (originalError?.stack) {
      this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
    }
  }
}

/**
 * Unified error factory for creating typed errors.
 *
 * Use this when you need to create errors dynamically based on an error code.
 * For static error creation, prefer using the specific error class directly.
 *
 * @param code - The error code determining which error class to use
 * @param message - The error message
 * @param details - Optional additional context (type depends on error code)
 * @returns An instance of the appropriate error class
 *
 * @example
 * ```typescript
 * import { createError, ErrorCode } from "@/lib/errors";
 *
 * // Create a network error with URL and status
 * const error = createError(ErrorCode.NETWORK_ERROR, "Request failed", {
 *   url: "/api/data",
 *   statusCode: 404,
 * });
 *
 * // Create a DOM error with element ID
 * const domError = createError(ErrorCode.DOM_ERROR, "Element not found", "my-element");
 * ```
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
    case ErrorCode.TRANSPILE_ERROR: {
      const transpileDetails = details as { sourceCode?: string; originalError?: Error } | undefined;
      return new TranspileError(
        message,
        transpileDetails?.sourceCode,
        transpileDetails?.originalError,
      );
    }
    case ErrorCode.SESSION_ERROR:
      return new SessionError(
        message,
        typeof details === "string" ? details : undefined,
      );
    case ErrorCode.IMPORT_ERROR: {
      const importDetails = details as { modulePath?: string; originalError?: Error } | undefined;
      return new ImportError(
        message,
        importDetails?.modulePath,
        importDetails?.originalError,
      );
    }
    case ErrorCode.RENDER_ERROR: {
      const renderDetails = details as { componentName?: string; originalError?: Error } | undefined;
      return new RenderError(
        message,
        renderDetails?.componentName,
        renderDetails?.originalError,
      );
    }
    default:
      return new AppError(message, code, details);
  }
}

/**
 * Helper function to safely get error message from unknown error.
 *
 * Use this when catching errors of unknown type to safely extract the message.
 *
 * @param error - The error to extract a message from
 * @returns The error message string
 *
 * @example
 * ```typescript
 * import { getErrorMessage } from "@/lib/errors";
 *
 * try {
 *   await riskyOperation();
 * } catch (error) {
 *   console.error("Operation failed:", getErrorMessage(error));
 * }
 * ```
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

/**
 * Helper function to safely get error code from unknown error.
 *
 * Use this when catching errors to determine their type for handling.
 *
 * @param error - The error to extract a code from
 * @returns The error code, or UNKNOWN_ERROR if not an AppError
 *
 * @example
 * ```typescript
 * import { getErrorCode, ErrorCode } from "@/lib/errors";
 *
 * try {
 *   await fetchData();
 * } catch (error) {
 *   if (getErrorCode(error) === ErrorCode.NETWORK_ERROR) {
 *     showRetryOption();
 *   }
 * }
 * ```
 */
export const getErrorCode = (error: unknown): ErrorCode => {
  if (error instanceof AppError) {
    return error.code;
  }
  return ErrorCode.UNKNOWN_ERROR;
};

/**
 * Type guard to check if an error is an AppError.
 *
 * Use this for type-safe error handling when you need to access AppError properties.
 *
 * @param error - The error to check
 * @returns True if the error is an AppError instance
 *
 * @example
 * ```typescript
 * import { isAppError } from "@/lib/errors";
 *
 * try {
 *   await operation();
 * } catch (error) {
 *   if (isAppError(error)) {
 *     console.log("Error code:", error.code);
 *     console.log("Error details:", error.details);
 *   }
 * }
 * ```
 */
export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

/**
 * Type guard to check if an error is a WebSocketError.
 *
 * @param error - The error to check
 * @returns True if the error is a WebSocketError instance
 */
export const isWebSocketError = (error: unknown): error is WebSocketError => {
  return error instanceof WebSocketError;
};

/**
 * Type guard to check if an error is a NetworkError.
 *
 * @param error - The error to check
 * @returns True if the error is a NetworkError instance
 */
export const isNetworkError = (error: unknown): error is NetworkError => {
  return error instanceof NetworkError;
};

/**
 * Type guard to check if an error is a ValidationError.
 *
 * @param error - The error to check
 * @returns True if the error is a ValidationError instance
 */
export const isValidationError = (error: unknown): error is ValidationError => {
  return error instanceof ValidationError;
};

/**
 * Wrap an unknown error into an AppError.
 *
 * Use this to normalize errors of unknown type into AppErrors for consistent handling.
 * If the error is already an AppError, it is returned unchanged.
 *
 * @param error - The error to wrap
 * @param code - Optional error code (defaults to UNKNOWN_ERROR)
 * @returns An AppError instance
 *
 * @example
 * ```typescript
 * import { wrapError, ErrorCode } from "@/lib/errors";
 *
 * try {
 *   await externalLibraryCall();
 * } catch (error) {
 *   throw wrapError(error, ErrorCode.NETWORK_ERROR);
 * }
 * ```
 */
export const wrapError = (error: unknown, code?: ErrorCode): AppError => {
  if (error instanceof AppError) {
    return error;
  }
  const message = getErrorMessage(error);
  return new AppError(message, code ?? ErrorCode.UNKNOWN_ERROR, { originalError: error });
};
