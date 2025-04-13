/**
 * Error types that are safe to retry
 */
export const RETRYABLE_ERRORS = [
  "ECONNRESET",
  "ETIMEDOUT",
  "ECONNABORTED",
  "RATE_LIMIT_EXCEEDED",
  "429",
  "500",
  "503",
] as const;

export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  retryableErrors?: string[];
  onRetry?: (attempt: number, error: Error, nextDelay: number) => void;
}

/**
 * Generic retry function with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    retryableErrors = RETRYABLE_ERRORS,
    onRetry = (attempt, error, delay) =>
      console.warn(
        `Retry ${attempt}/${maxRetries} after error: ${error.message}. Next attempt in ${delay}ms`,
      ),
  } = options;

  let attempt = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;

      if (
        !(error instanceof Error) ||
        attempt >= maxRetries ||
        !retryableErrors.some((e) => error.message.includes(e))
      ) {
        throw error;
      }

      onRetry(attempt, error, delay);
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Exponential backoff with max delay cap
      delay = Math.min(delay * 2, maxDelay);
    }
  }
}

/**
 * Helper to determine if an error should be retried
 */
export function isRetryableError(error: unknown): boolean {
  return error instanceof Error &&
    RETRYABLE_ERRORS.some((e) => error.message.includes(e));
}
