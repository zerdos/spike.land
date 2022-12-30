import React from "react";

class ErrorBoundary extends React.Component<
  { children: JSX.Element },
  { errorInfo?: { componentStack: string }; error?: Error }
> {
  constructor(props: { children: JSX.Element }) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      //   // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary as unknown as React.FC<{ children: any }>;
