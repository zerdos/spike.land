/**
 * Structured logging service for Cloudflare Workers backend
 * Provides consistent logging with levels, timestamps, and context support
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogContext {
  [key: string]: unknown;
}

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  context?: LogContext;
}

class Logger {
  private minLevel: LogLevel;
  private isProduction: boolean;

  constructor() {
    // In Cloudflare Workers, check environment via globalThis
    this.isProduction = typeof globalThis !== "undefined" &&
      (globalThis as Record<string, unknown>)["ENVIRONMENT"] === "production";
    this.minLevel = this.isProduction ? LogLevel.INFO : LogLevel.DEBUG;
  }

  /**
   * Set the minimum log level
   */
  public setLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  /**
   * Log debug messages (development only)
   */
  public debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Log informational messages
   */
  public info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log warning messages
   */
  public warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log error messages
   */
  public error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext: LogContext = {
      ...context,
    };

    if (error instanceof Error) {
      errorContext["error"] = {
        name: error.name,
        message: error.message,
        stack: !this.isProduction ? error.stack : undefined,
      };
    } else if (error) {
      errorContext["error"] = error;
    }

    this.log(LogLevel.ERROR, message, errorContext);
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (level < this.minLevel) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      message,
      ...(context !== undefined && { context }),
    };

    // Always use structured JSON logging for Cloudflare Workers
    // Workers logs are collected and can be queried via Logpush
    if (this.isProduction) {
      this.logAsJSON(entry);
    } else {
      // In development, add some formatting for readability
      this.logToConsole(level, entry);
    }
  }

  /**
   * Log to console with basic formatting (development)
   */
  private logToConsole(_level: LogLevel, entry: LogEntry): void {
    const prefix = `[${entry.timestamp}] [${entry.level}]`;

    if (entry.context) {
      console.log(`${prefix} ${entry.message}`, entry.context);
    } else {
      console.log(`${prefix} ${entry.message}`);
    }
  }

  /**
   * Log as structured JSON (production)
   */
  private logAsJSON(entry: LogEntry): void {
    const output = JSON.stringify(entry);
    console.log(output);
  }

  /**
   * Create a child logger with default context
   */
  public child(defaultContext: LogContext): Logger {
    const childLogger = new Logger();
    childLogger.minLevel = this.minLevel;
    childLogger.isProduction = this.isProduction;

    // Override log method to include default context
    const originalLog = childLogger.log.bind(childLogger);
    childLogger.log = (_level: LogLevel, message: string, context?: LogContext) => {
      originalLog(_level, message, { ...defaultContext, ...context });
    };

    return childLogger;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const debug = logger.debug.bind(logger);
export const info = logger.info.bind(logger);
export const warn = logger.warn.bind(logger);
export const error = logger.error.bind(logger);
