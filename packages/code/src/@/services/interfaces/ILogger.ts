/**
 * Logger interface for dependency injection
 * Provides structured logging with different log levels
 */
export interface ILogger {
  /**
   * Log debug messages
   * @param message - Debug message
   * @param args - Additional arguments
   */
  debug(message: string, ...args: unknown[]): void;

  /**
   * Log informational messages
   * @param message - Info message
   * @param args - Additional arguments
   */
  info(message: string, ...args: unknown[]): void;

  /**
   * Log warning messages
   * @param message - Warning message
   * @param args - Additional arguments
   */
  warn(message: string, ...args: unknown[]): void;

  /**
   * Log error messages
   * @param message - Error message
   * @param error - Optional error object
   * @param context - Optional context data
   */
  error(message: string, error?: unknown, context?: Record<string, unknown>): void;
}

/**
 * Context information for logging
 */
export interface ILogContext {
  readonly [key: string]: unknown;
}
