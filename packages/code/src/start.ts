import { renderApp } from "@/external/render-app";
import { App } from "./App";
import { router } from "./routes/router";
import "./index.css";
import { getCodeSpace } from "@/hooks/use-code-space";

// TypeScript interfaces
interface RouterLocation {
  pathname: string;
}

interface RouterResolvedEvent {
  toLocation: RouterLocation;
}

// Route checking utilities
const isLiveRoute = (pathname: string): boolean => pathname.startsWith("/live/");
const isLiveCMSRoute = (pathname: string): boolean => pathname.startsWith("/live-cms/");
const isDehydratedRoute = (pathname: string): boolean => pathname.endsWith("dehydrated");
const shouldRenderApp = (pathname: string): boolean => 
  (isLiveRoute(pathname) || isLiveCMSRoute(pathname)) && 
  !isDehydratedRoute(pathname) && 
  !pathname.endsWith("/");

// Error handling
const handleError = (error: unknown): void => {
  console.error("Application initialization failed:", error);
  // Here we could add more sophisticated error handling
  // Like error reporting to a service or showing user feedback
};

/**
 * Initialize the WebSocket connection for live code spaces
 */
const initializeWebSocket = async (): Promise<void> => {
  try {
    const { main } = await import("./ws");
    await main();
  } catch (error) {
    handleError(error);
  }
};

/**
 * Handle route resolution and app rendering
 */
const handleRouteResolution = async (
  codeSpace: string | null, 
  { toLocation }: RouterResolvedEvent
): Promise<void> => {
  if (!codeSpace) return;

  try {
    const { pathname } = toLocation;
    
    if (shouldRenderApp(pathname)) {
      const rendered = await renderApp({ codeSpace });
      Object.assign(window, { rendered });
    }
  } catch (error) {
    handleError(error);
  }
};

// Handle .tsx extension removal
if (location.pathname.endsWith(".tsx")) {
  location.href = location.href.replace(".tsx", "");
}

// Initialize application
router.load().then(async () => {
  try {
    const codeSpace = getCodeSpace(location.pathname);
    await renderApp({ App });

    if (location.pathname === `/live/${codeSpace}/iframe`) {
      await initializeWebSocket();
    }

    // Setup router subscriptions
    router.subscribe("onResolved", 
      (event: RouterResolvedEvent) => handleRouteResolution(codeSpace, event)
    );
  } catch (error) {
    handleError(error);
  }
}).catch(handleError);
