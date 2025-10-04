import type { AppError } from "./errors";
import type { ErrorCode } from "./errors";
import { getErrorCode, getErrorMessage } from "./errors";

export interface ErrorReport {
  message: string;
  code: ErrorCode;
  stack: string | undefined;
  url: string;
  userAgent: string;
  timestamp: string;
  codeSpace: string | undefined;
  userId: string | undefined;
  sessionId: string | undefined;
  componentStack: string | undefined;
  details: Record<string, unknown> | undefined;
}

export interface ErrorReporterConfig {
  enabled: boolean;
  endpoint?: string;
  maxRetries?: number;
  batchSize?: number;
  batchTimeout?: number;
}

const DEFAULT_CONFIG: Required<ErrorReporterConfig> = {
  enabled: true,
  endpoint: "/api/errors",
  maxRetries: 3,
  batchSize: 10,
  batchTimeout: 5000,
};

/**
 * ErrorReporter handles logging and reporting errors to external services
 */
export class ErrorReporter {
  private config: Required<ErrorReporterConfig>;
  private errorQueue: ErrorReport[] = [];
  private batchTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(config: Partial<ErrorReporterConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Report an error to the logging service
   */
  public async report(
    error: Error | AppError,
    context?: {
      codeSpace?: string;
      userId?: string;
      sessionId?: string;
      componentStack?: string;
    },
  ): Promise<void> {
    if (!this.config.enabled) {
      return;
    }

    const errorReport: ErrorReport = {
      message: getErrorMessage(error),
      code: getErrorCode(error),
      stack: error.stack || undefined,
      url: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      timestamp: new Date().toISOString(),
      codeSpace: context?.codeSpace,
      userId: context?.userId,
      sessionId: context?.sessionId,
      componentStack: context?.componentStack,
    };

    if (error instanceof Error && "details" in error) {
      errorReport.details = (error as AppError).details || undefined;
    }

    this.addToQueue(errorReport);
  }

  /**
   * Add error to batch queue
   */
  private addToQueue(errorReport: ErrorReport): void {
    this.errorQueue.push(errorReport);

    if (this.errorQueue.length >= this.config.batchSize) {
      this.flush();
    } else if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => {
        this.flush();
      }, this.config.batchTimeout);
    }
  }

  /**
   * Flush the error queue to the logging service
   */
  public async flush(): Promise<void> {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    if (this.errorQueue.length === 0) {
      return;
    }

    const errors = [...this.errorQueue];
    this.errorQueue = [];

    await this.sendErrors(errors);
  }

  /**
   * Send errors to the logging service with retry logic
   */
  private async sendErrors(
    errors: ErrorReport[],
    retryCount = 0,
  ): Promise<void> {
    try {
      console.warn("Error batch being logged:", {
        count: errors.length,
        errors: errors.map((e) => ({
          message: e.message,
          code: e.code,
          timestamp: e.timestamp,
        })),
      });

      if (!this.config.endpoint) {
        return;
      }

      const response = await fetch(this.config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ errors }),
      });

      if (!response.ok && retryCount < this.config.maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, retryCount) * 1000),
        );
        await this.sendErrors(errors, retryCount + 1);
      }
    } catch (error) {
      console.error("Failed to send error reports:", error);
    }
  }

  /**
   * Clear the error queue
   */
  public clear(): void {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }
    this.errorQueue = [];
  }
}

let globalReporter: ErrorReporter | null = null;

/**
 * Get the global error reporter instance
 */
export function getErrorReporter(
  config?: Partial<ErrorReporterConfig>,
): ErrorReporter {
  if (!globalReporter) {
    globalReporter = new ErrorReporter(config);
  }
  return globalReporter;
}

/**
 * Report an error using the global reporter
 */
export async function reportError(
  error: Error | AppError,
  context?: {
    codeSpace?: string;
    userId?: string;
    sessionId?: string;
    componentStack?: string;
  },
): Promise<void> {
  const reporter = getErrorReporter();
  await reporter.report(error, context);
}
