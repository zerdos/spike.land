/**
 * Error codes for categorizing application errors
 */
export enum ErrorCode {
  // Message handling errors
  MESSAGE_PARSE_FAILED = "MESSAGE_PARSE_FAILED",
  MESSAGE_VALIDATION_FAILED = "MESSAGE_VALIDATION_FAILED",
  MESSAGE_SEND_FAILED = "MESSAGE_SEND_FAILED",
  MESSAGE_RECEIVE_FAILED = "MESSAGE_RECEIVE_FAILED",

  // Validation errors
  VALIDATION_REQUIRED_FIELD = "VALIDATION_REQUIRED_FIELD",
  VALIDATION_INVALID_TYPE = "VALIDATION_INVALID_TYPE",
  VALIDATION_OUT_OF_RANGE = "VALIDATION_OUT_OF_RANGE",
  VALIDATION_INVALID_FORMAT = "VALIDATION_INVALID_FORMAT",

  // Network errors
  NETWORK_CONNECTION_FAILED = "NETWORK_CONNECTION_FAILED",
  NETWORK_REQUEST_TIMEOUT = "NETWORK_REQUEST_TIMEOUT",
  NETWORK_RESPONSE_INVALID = "NETWORK_RESPONSE_INVALID",
  NETWORK_OFFLINE = "NETWORK_OFFLINE",

  // Storage errors
  STORAGE_READ_FAILED = "STORAGE_READ_FAILED",
  STORAGE_WRITE_FAILED = "STORAGE_WRITE_FAILED",
  STORAGE_DELETE_FAILED = "STORAGE_DELETE_FAILED",
  STORAGE_QUOTA_EXCEEDED = "STORAGE_QUOTA_EXCEEDED",

  // WebSocket errors
  WEBSOCKET_CONNECTION_FAILED = "WEBSOCKET_CONNECTION_FAILED",
  WEBSOCKET_SEND_FAILED = "WEBSOCKET_SEND_FAILED",
  WEBSOCKET_CLOSED = "WEBSOCKET_CLOSED",

  // DOM errors
  DOM_ELEMENT_NOT_FOUND = "DOM_ELEMENT_NOT_FOUND",
  DOM_OPERATION_FAILED = "DOM_OPERATION_FAILED",

  // Router errors
  ROUTER_NAVIGATION_FAILED = "ROUTER_NAVIGATION_FAILED",
  ROUTER_INVALID_PATH = "ROUTER_INVALID_PATH",

  // Generic errors
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  INITIALIZATION_FAILED = "INITIALIZATION_FAILED",
}

/**
 * Base error class for application-specific errors
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly details: Record<string, unknown> | undefined;
  public readonly timestamp: Date;

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.UNKNOWN_ERROR,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details || undefined;
    this.timestamp = new Date();
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack,
    };
  }
}

/**
 * Error thrown when message handling operations fail
 */
export class MessageError extends AppError {
  constructor(
    message: string,
    code: ErrorCode = ErrorCode.MESSAGE_PARSE_FAILED,
    public readonly messageData?: unknown,
    details?: Record<string, unknown>,
  ) {
    super(message, code, { ...details, messageData });
  }
}

/**
 * Error thrown when validation fails
 */
export class ValidationError extends AppError {
  constructor(
    message: string,
    public readonly field?: string,
    public readonly value?: unknown,
    details?: Record<string, unknown>,
  ) {
    super(
      message,
      ErrorCode.VALIDATION_INVALID_TYPE,
      { ...details, field, value },
    );
  }
}

/**
 * Error thrown when network operations fail
 */
export class NetworkError extends AppError {
  constructor(
    message: string,
    code: ErrorCode = ErrorCode.NETWORK_CONNECTION_FAILED,
    public readonly url?: string,
    public readonly statusCode?: number,
    details?: Record<string, unknown>,
  ) {
    super(message, code, { ...details, url, statusCode });
  }
}

/**
 * Error thrown when storage operations fail
 */
export class StorageError extends AppError {
  constructor(
    message: string,
    code: ErrorCode = ErrorCode.STORAGE_READ_FAILED,
    public readonly key?: string,
    details?: Record<string, unknown>,
  ) {
    super(message, code, { ...details, key });
  }
}

/**
 * Error thrown when WebSocket operations fail
 */
export class WebSocketError extends AppError {
  constructor(
    message: string,
    public readonly originalError?: Error,
    code: ErrorCode = ErrorCode.WEBSOCKET_CONNECTION_FAILED,
  ) {
    super(message, code, { originalError: originalError?.message });
    if (originalError?.stack) {
      this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
    }
  }
}

/**
 * Error thrown when DOM operations fail
 */
export class DOMError extends AppError {
  constructor(
    message: string,
    public readonly elementId?: string,
    code: ErrorCode = ErrorCode.DOM_ELEMENT_NOT_FOUND,
  ) {
    super(`${message}${elementId ? ` (Element: ${elementId})` : ""}`, code, {
      elementId,
    });
  }
}

/**
 * Error thrown when route operations fail
 */
export class RouterError extends AppError {
  constructor(
    message: string,
    public readonly path?: string,
    code: ErrorCode = ErrorCode.ROUTER_NAVIGATION_FAILED,
  ) {
    super(`${message}${path ? ` (Path: ${path})` : ""}`, code, { path });
  }
}

/**
 * Error thrown when message handling fails
 */
export class MessageHandlingError extends MessageError {
  constructor(message: string, public readonly data?: unknown) {
    super(message, ErrorCode.MESSAGE_VALIDATION_FAILED, data);
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
 * Helper function to get error code from unknown error
 */
export const getErrorCode = (error: unknown): ErrorCode => {
  if (error instanceof AppError) {
    return error.code;
  }
  return ErrorCode.UNKNOWN_ERROR;
};

/**
 * Helper function to check if error is retryable
 */
export const isRetryableError = (error: unknown): boolean => {
  if (!(error instanceof AppError)) {
    return false;
  }

  const retryableCodes = [
    ErrorCode.NETWORK_CONNECTION_FAILED,
    ErrorCode.NETWORK_REQUEST_TIMEOUT,
    ErrorCode.WEBSOCKET_CONNECTION_FAILED,
    ErrorCode.STORAGE_READ_FAILED,
  ];

  return retryableCodes.includes(error.code);
};
