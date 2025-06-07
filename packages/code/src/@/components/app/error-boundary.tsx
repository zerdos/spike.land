import { ContextManager } from "@/lib/context-manager";
import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; codeSpace?: string; },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; codeSpace?: string; }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.codeSpace) {
      const contextManager = new ContextManager(this.props.codeSpace);
      contextManager.updateContext("errorLog", error.toString());
    }

    this.setState({ errorInfo });
    console.error("Detailed error information:", {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      stack: error.stack,
    });
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h1 className="text-lg font-bold mb-2">
            Oops! Something went wrong.
          </h1>
          <p>
            We are sorry for the inconvenience. Please try refreshing the page or contact support if
            the problem persists.
          </p>
          {process.env["NODE_ENV"] !== "production" && (
            <details className="mt-4">
              <summary>Error Details</summary>
              <pre className="mt-2 p-2 bg-red-50 rounded">
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
