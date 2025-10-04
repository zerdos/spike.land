import { ErrorBoundary } from "@/components/app/error-boundary";
import { getCodeSpace } from "@/hooks/use-code-space";
import type { ICode } from "@/lib/interfaces";
import { routes } from "@/lib/routes";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  type RegisteredRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { createContext, Suspense, useEffect, useState } from "react";
import { initializeSessionSync, loadApp } from "../app-loader";
import { Wrapper } from "@/components/app/wrapper";

// Simple loading component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

const LazyWrapper = Wrapper;
// init()
// Define route types
interface RouteWithPageParams {
  codeSpace: string;
  page: string;
}

interface RouteParams {
  codeSpace: string;
}

type SearchParams = Record<string, string>;

// Root layout component with error boundary and suspense
const RootLayout: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
};

// Define root route
export const rootRoute = createRootRoute({
  component: RootLayout,
});

const dynamicRoutes = [];

Object.keys(routes).forEach((path) => {
  // Landing page route with lazy loading
  const landingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => (
      <SuspenseWrapper>
        <LazyWrapper codeSpace={routes[path as keyof typeof routes]} />
      </SuspenseWrapper>
    ),
  });

  dynamicRoutes.push(landingRoute);
});

/**
 * Main application component that handles loading app context and session sync
 */
const App: React.FC = () => {
  const [appContext, setAppContext] = useState<
    {
      codeSpace: string;
      cSess: ICode;
      AppComponent: React.FC<{ codeSpace: string; cSess: ICode; }>;
    } | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = location.pathname;
  const codeSpace = getCodeSpace(pathname);

  // Load app context on mount
  useEffect(() => {
    if (codeSpace && pathname === (`/live/${codeSpace}`)) {
      setIsLoading(true);
      console.warn("Loading app for codeSpace:", codeSpace);

      loadApp(pathname)
        .then((context) => {
          if (context) {
            console.warn("App loaded successfully:", context);
            setAppContext(context);
          }
        })
        .catch((error) => {
          console.error("Error loading app:", error);
        })
        .finally(() => {
          // Set loading state to false after app loading
          console.warn("App loading finished");
          setIsLoading(false);
        });
    } else {
      // If no codeSpace is found, set loading to false
      // console.warn("No codeSpace found for pathname:", { pathname, codeSpace });
      setIsLoading(false);
    }
  }, [pathname, codeSpace]); // Added codeSpace to dependency array

  // Initialize session sync when app context is available
  useEffect(() => {
    let unsubscribe: () => void = () => {};

    if (appContext) {
      const { codeSpace, cSess } = appContext;

      initializeSessionSync(codeSpace, cSess)
        .then((unSub) => {
          unsubscribe = unSub;
        })
        .catch((error) => {
          console.error("Error initializing session sync:", error);
        });
    }

    return () => unsubscribe();
  }, [appContext]);

  // Handle loading state
  if (isLoading) {
    return (
      <iframe
        src={`/live/${codeSpace}/`}
        style={{ width: "100hw", height: "100vh" }}
      />
    );
  }

  if (!codeSpace) {
    return <div>Invalid route or codeSpace not found</div>;
  }

  // Render app or wrapper based on app context with error boundary
  return (
    <ErrorBoundary codeSpace={codeSpace}>
      {appContext
        ? (
          <appContext.AppComponent
            codeSpace={appContext.codeSpace}
            cSess={appContext.cSess}
          />
        )
        : (
          <SuspenseWrapper>
            <LazyWrapper codeSpace={codeSpace} />
          </SuspenseWrapper>
        )}
    </ErrorBoundary>
  );
};

// Live page route with code space and page parameters
const liveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live/$codeSpace/$page",
  parseParams: (params): RouteWithPageParams => ({
    codeSpace: params.codeSpace || "",
    page: params.page || "",
  }),
  stringifyParams: (params: RouteWithPageParams) => ({
    codeSpace: params.codeSpace,
    page: params.page,
  }),
  loader: async ({ params: { codeSpace } }) => ({
    codeSpace,
    page: "",
  }),
  component: () => <App />,
});
dynamicRoutes.push(liveRoute);

// Editor route with just code space parameter
const EditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live/$codeSpace",
  parseParams: (params): RouteParams => ({
    codeSpace: params.codeSpace || "",
  }),
  stringifyParams: (params: RouteParams) => ({
    codeSpace: params.codeSpace,
  }),
  loader: async ({ params: { codeSpace } }) => ({
    codeSpace,
  }),
  component: () => <App />,
});
dynamicRoutes.push(EditorRoute);

const routeTree = rootRoute.addChildren([...dynamicRoutes]);

// Create and configure the router instance
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: createContext<
    {
      params: RouteParams | RouteWithPageParams;
      search: SearchParams;
    } | null
  >(null),
});

// Export types
export interface RouterState {
  resolvedLocation: {
    pathname: string;
    params: RouteParams | RouteWithPageParams;
  };
}

export type AppRouter = typeof router;

// Export RouterComponent with proper types
interface RouterComponentProps {
  router: RegisteredRouter;
}

export const RouterComponent: React.FC<RouterComponentProps> = ({ router }) => {
  return <RouterProvider router={router} />;
};

// Export wrapped App Router component
export const AppRouterComponent: React.FC = () => {
  return <RouterComponent router={router} />;
};
