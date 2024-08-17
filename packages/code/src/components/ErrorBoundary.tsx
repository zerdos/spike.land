import React from "react";

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    // Update state so the next render will show the fallback UI.

    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can log the error to an error reporting service
    console.error("Error:", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h1 className="text-lg font-bold mb-2">
            Oops! Something went wrong.
          </h1>
          <p>
            We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem
            persists.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
