import { lazy, Suspense } from "react";

// Lazy load heavy components with loading states
export const LazyWrapper = lazy(() =>
  import("@/components/app/wrapper").then((module) => ({
    default: module.Wrapper,
  }))
);

export const LazyEditor = lazy(() =>
  import("@/components/Editor").then((module) => ({
    default: module.default || module.Editor,
  }))
);

export const LazyQr = lazy(() =>
  import("@/components/Qr.lazy").then((module) => ({
    default: module.default,
  }))
);

export const LazyHistoryComponents = lazy(() =>
  import("@/components/History/HistoryFComponents").then((module) => ({
    default: module.default,
  }))
);

export const LazyMonacoEditor = lazy(() =>
  import("monaco-editor/esm/vs/editor/editor.api").then(() =>
    import("@/components/Editor").then((module) => ({
      default: module.default || module.Editor,
    }))
  )
);

// Loading fallback components
export const LoadingSpinner: React.FC<{ message?: string; }> = ({ message = "Loading..." }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  </div>
);

export const EditorLoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-pulse flex space-x-2">
        <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      <p className="text-sm text-muted-foreground">Loading editor...</p>
    </div>
  </div>
);

// Wrapper components with Suspense boundaries
export const SuspenseWrapper: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode; }> = ({
  children,
  fallback = <LoadingSpinner />,
}) => <Suspense fallback={fallback}>{children}</Suspense>;

export const EditorWithSuspense: React.FC<{ [key: string]: unknown; }> = (props) => (
  <Suspense fallback={<EditorLoadingFallback />}>
    <LazyMonacoEditor {...props} />
  </Suspense>
);