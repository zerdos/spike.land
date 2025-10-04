import { ErrorCode, getErrorCode, getErrorMessage, isRetryableError } from "@/lib/errors";
import { reportError } from "@/lib/error-reporter";
import { ContextManager } from "@/lib/context-manager";
import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  codeSpace?: string;
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  retryCount: number;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (this.props.codeSpace) {
      try {
        const contextManager = new ContextManager(this.props.codeSpace);
        const componentStack = errorInfo.componentStack;
        const errorLog = {
          error: error.toString(),
          code: getErrorCode(error),
          timestamp: new Date().toISOString(),
          componentStack: componentStack !== null ? componentStack : undefined,
        };
        contextManager.updateContext("errorLog", JSON.stringify(errorLog));
      } catch (contextError) {
        console.error("Failed to log error to context:", contextError);
      }
    }

    this.setState({ errorInfo });

    const errorDetails = {
      message: getErrorMessage(error),
      code: getErrorCode(error),
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      retryable: isRetryableError(error),
    };

    console.error("Error Boundary caught error:", errorDetails);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.logErrorToService(error, errorInfo);
  }

  private logErrorToService(error: Error, errorInfo: React.ErrorInfo): void {
    try {
      const context: {
        codeSpace?: string;
        componentStack?: string;
      } = {};

      if (this.props.codeSpace) {
        context.codeSpace = this.props.codeSpace;
      }

      if (errorInfo.componentStack) {
        context.componentStack = errorInfo.componentStack;
      }

      reportError(error, context).catch((loggingError) => {
        console.error("Failed to log error:", loggingError);
      });
    } catch (loggingError) {
      console.error("Failed to log error:", loggingError);
    }
  }

  private resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: this.state.retryCount + 1,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private renderErrorUI(): React.ReactNode {
    const { error } = this.state;
    const { fallback } = this.props;

    if (!error) {
      return null;
    }

    if (fallback) {
      return fallback(error, this.resetError);
    }

    const errorCode = getErrorCode(error);
    const canRetry = isRetryableError(error);
    const isNetworkError = errorCode === ErrorCode.NETWORK_CONNECTION_FAILED ||
      errorCode === ErrorCode.NETWORK_OFFLINE ||
      errorCode === ErrorCode.NETWORK_REQUEST_TIMEOUT;

    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full bg-card border border-destructive rounded-lg shadow-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-destructive mb-2">
                {isNetworkError ? "Network Error" : "Something went wrong"}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {isNetworkError
                  ? "We're having trouble connecting. Please check your internet connection and try again."
                  : "We encountered an unexpected error. Please try refreshing the page."}
              </p>

              {process.env["NODE_ENV"] !== "production" && (
                <details className="mb-4">
                  <summary className="cursor-pointer text-sm font-medium text-foreground hover:text-primary">
                    Error Details
                  </summary>
                  <div className="mt-2 p-3 bg-muted rounded text-xs font-mono overflow-auto max-h-48">
                    <div className="mb-2">
                      <strong>Error:</strong> {error.message}
                    </div>
                    <div className="mb-2">
                      <strong>Code:</strong> {errorCode}
                    </div>
                    {error.stack && (
                      <div>
                        <strong>Stack:</strong>
                        <pre className="mt-1 whitespace-pre-wrap">{error.stack}</pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              <div className="flex gap-2">
                {canRetry && this.state.retryCount < 3 && (
                  <button
                    onClick={this.resetError}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 text-sm font-medium"
                  >
                    Try Again
                  </button>
                )}
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 text-sm font-medium"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  override render(): React.ReactNode {
    if (this.state.hasError) {
      return this.renderErrorUI();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
