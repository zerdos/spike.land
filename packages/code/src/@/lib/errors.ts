/**
 * Base error class for application-specific errors
 */
export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown when WebSocket operations fail
 */
export class WebSocketError extends AppError {
  constructor(message: string, public readonly originalError?: Error) {
    super(message);
    if (originalError?.stack) {
      this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
    }
  }
}

/**
 * Error thrown when DOM operations fail
 */
export class DOMError extends AppError {
  constructor(message: string, public readonly elementId?: string) {
    super(`${message}${elementId ? ` (Element: ${elementId})` : ""}`);
  }
}

/**
 * Error thrown when route operations fail
 */
export class RouterError extends AppError {
  constructor(message: string, public readonly path?: string) {
    super(`${message}${path ? ` (Path: ${path})` : ""}`);
  }
}

/**
 * Error thrown when message handling fails
 */
export class MessageHandlingError extends AppError {
  constructor(message: string, public readonly data?: unknown) {
    super(message);
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
