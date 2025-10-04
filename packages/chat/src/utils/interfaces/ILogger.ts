/**
 * Logger interface for dependency injection in Chat package
 * Provides structured logging with different log levels
 */
export interface ILogger {
  /**
   * Log debug messages
   * @param message - Debug message
   * @param context - Optional context data
   */
  debug(message: string, context?: Record<string, unknown>): void;

  /**
   * Log informational messages
   * @param message - Info message
   * @param context - Optional context data
   */
  info(message: string, context?: Record<string, unknown>): void;

  /**
   * Log warning messages
   * @param message - Warning message
   * @param context - Optional context data
   */
  warn(message: string, context?: Record<string, unknown>): void;

  /**
   * Log error messages
   * @param message - Error message
   * @param error - Optional error object
   * @param context - Optional context data
   */
  error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void;
}

/**
 * Context information for logging
 */
export interface LogContext {
  readonly [key: string]: unknown;
}
