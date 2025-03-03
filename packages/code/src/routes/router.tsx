import { Wrapper } from "@/components/app/wrapper";
import { getCodeSpace } from "@/hooks/use-code-space";
import { ICode, ICodeSession } from "@/lib/interfaces";
import { routes } from "@/lib/routes";
import { init } from "@/lib/tw-dev-setup";
import { ClerkProvider } from "@clerk/clerk-react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  type RegisteredRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { createContext, useEffect, useState } from "react";
import { AppToRender } from "../AppToRender";
import { Code } from "../services/CodeSession";
import { CodeSessionBC } from "../services/CodeSessionBc";

// Define route types
interface RouteWithPageParams {
  codeSpace: string;
  page: string;
}

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
    component: () => <>
    <h1>{path}</h1>
    <Wrapper codeSpace={routes[path as keyof typeof routes]} />
    </>,
  });

  dynamicRoutes.push(landingRoute);
});

const App: React.FC = () => {
  const [cSess, setState] = useState<ICode | null>(null);
  const codeSpace = getCodeSpace(location.pathname);

  useEffect(() => {
    if (codeSpace && location.pathname === `/live/${codeSpace}`) {
      (async () => {
        await init();
        const cSess = new Code(codeSpace);
        const baseUrl = import.meta.env.DEV ? "" : "https://testing.spike.land";
        const session = await fetch(`${baseUrl}/live/${codeSpace}/session.json`)
          .then((res) => res.json()) as ICodeSession;
        await cSess.init(session);

        setState(cSess);

        const { initializeApp } = await import("@/lib/hydrate");
        await initializeApp();
      })();
    }
  }, []);

  useEffect(() => {
    let unSub: () => void = () => {};

    if (cSess) {
      (async () => {
        Object.assign(globalThis, { cSess });
        const cSessBr = new CodeSessionBC(codeSpace);
        cSessBr.init(await cSess.getSession());

        unSub = cSessBr.sub((sess) => {
          cSess.setSession(sess);
          setState(cSess);
        });
      })();
    }
    return () => unSub();
  }, [cSess]);

  return cSess
    ? (
      <>
        <ClerkProvider
          publishableKey="pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ"
          afterSignOutUrl="/"
        >
          <AppToRender codeSpace={codeSpace} cSess={cSess} />
        </ClerkProvider>
      </>
    )
    : (
      <>
        <Wrapper codeSpace={codeSpace} />
      </>
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
    codeSpace: getCodeSpace(`/live/${codeSpace}`),
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
    codeSpace: getCodeSpace(`/live/${codeSpace}`),
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
