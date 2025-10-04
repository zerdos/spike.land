import { logger as defaultLogger } from "@/lib/logger";
import type { ILogger } from "../interfaces/ILogger";

/**
 * Adapter for the existing logger to implement ILogger interface
 * Provides dependency injection compatibility
 */
export class LoggerAdapter implements ILogger {
  constructor(private readonly baseLogger = defaultLogger) {}

  debug(message: string, ...args: unknown[]): void {
    this.baseLogger.debug(message, ...(args as Parameters<typeof this.baseLogger.debug>));
  }

  info(message: string, ...args: unknown[]): void {
    this.baseLogger.info(message, ...(args as Parameters<typeof this.baseLogger.info>));
  }

  warn(message: string, ...args: unknown[]): void {
    this.baseLogger.warn(message, ...(args as Parameters<typeof this.baseLogger.warn>));
  }

  error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    this.baseLogger.error(message, error, context);
  }
}

/**
 * Factory function to create logger instances
 */
export function createLogger(): ILogger {
  return new LoggerAdapter();
}
