/**
 * Structured logging service for frontend application
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
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = import.meta.env?.DEV ?? process.env["NODE_ENV"] !== "production";
    this.minLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO;
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
        stack: this.isDevelopment ? error.stack : undefined,
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

    // In development, use colored console output
    if (this.isDevelopment) {
      this.logToConsole(level, entry);
    } else {
      // In production, use structured JSON logging
      this.logAsJSON(entry);
    }
  }

  /**
   * Log to console with colors (development)
   */
  private logToConsole(level: LogLevel, entry: LogEntry): void {
    const styles = {
      [LogLevel.DEBUG]: "color: #888",
      [LogLevel.INFO]: "color: #2196F3",
      [LogLevel.WARN]: "color: #FF9800",
      [LogLevel.ERROR]: "color: #F44336; font-weight: bold",
    };

    const prefix = `[${entry.timestamp}] [${entry.level}]`;
    const style = styles[level];

    if (entry.context) {
      console.log(`%c${prefix} ${entry.message}`, style, entry.context);
    } else {
      console.log(`%c${prefix} ${entry.message}`, style);
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
    childLogger.isDevelopment = this.isDevelopment;

    // Override log method to include default context
    const originalLog = childLogger.log.bind(childLogger);
    childLogger.log = (level: LogLevel, message: string, context?: LogContext) => {
      originalLog(level, message, { ...defaultContext, ...context });
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
