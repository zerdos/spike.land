import { Wrapper } from "@/components/app/wrapper";
import { routes } from "@/lib/routes";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  type RegisteredRouter,
  RouterProvider,
} from "@tanstack/react-router";
import * as React from "react";
import { getCodeSpace } from "../hooks/use-code-space";

// Define route types
interface RouteParams {
  codeSpace: string;
}

type SearchParams = Record<string, string>;

// Root layout component
const RootLayout: React.FC = () => {
  return <Outlet />;
};

// Define root route
export const rootRoute = createRootRoute({
  component: RootLayout,
});

const dynamicRoutes = [];

Object.keys(routes).forEach((path) => {
  // Landing page route
  const landingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path,
    component: () => <Wrapper codeSpace={routes[path as keyof typeof routes]} />,
  });

  dynamicRoutes.push(landingRoute);
});

// Live page route with code space parameter
const liveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live/$codeSpace",
  parseParams: (params): RouteParams => ({
    codeSpace: params.codeSpace || "",
  }),
  stringifyParams: (params: RouteParams) => ({
    codeSpace: params.codeSpace,
  }),
  loader: async ({ params: { codeSpace } }) => ({
    codeSpace: getCodeSpace(`/live/${codeSpace}`),
  }),
  component: () => <div>Live Page</div>,
});
dynamicRoutes.push(liveRoute);

// Live CMS route
const liveCmsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live-cms/$codeSpace",
  parseParams: (params): RouteParams => ({
    codeSpace: params.codeSpace || "",
  }),
  stringifyParams: (params: RouteParams) => ({
    codeSpace: params.codeSpace,
  }),
  loader: async ({ params: { codeSpace } }) => ({
    codeSpace: getCodeSpace(`/live-cms/${codeSpace}`),
  }),
  component: () => <div>Live CMS Page</div>,
});
dynamicRoutes.push(liveCmsRoute);

// Register routes
const routeTree = rootRoute.addChildren([...dynamicRoutes]);

// Create and configure the router instance
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: React.createContext<
    {
      params: RouteParams;
      search: SearchParams;
    } | null
  >(null),
});

// Export types
export interface RouterState {
  resolvedLocation: {
    pathname: string;
    params: RouteParams;
  };
}

export type AppRouter = typeof router;

// Re-export RouterProvider
export { RouterProvider };

// Export RouterComponent with proper types
interface RouterComponentProps {
  router: RegisteredRouter;
}

export const RouterComponent: React.FC<RouterComponentProps> = ({ router }) => {
  return <RouterProvider router={router} />;
};

// Export wrapped App Router component
export const AppRouter: React.FC = () => {
  return <RouterComponent router={router} />;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: AppRouter;
  }
}
