import { renderApp } from "@/lib/render-app";
import { App } from "./App";
import { router } from "./routes/router";
import "./index.css";
import { getCodeSpace } from "@/hooks/use-code-space";
import { RouterError } from "@/lib/errors";
import { 
  initializeWebSocket, 
  shouldRenderApp, 
  shouldInitWebSocket 
} from "@/lib/app-loader";

/**
 * Global error handler
 */
const handleError = (error: unknown): void => {
  console.error("Application initialization failed:", error);
  // Could add more sophisticated error handling here
  // Like error reporting to a service or showing user feedback
};

// Handle .tsx extension removal
if (location.pathname.endsWith(".tsx")) {
  location.href = location.href.replace(".tsx", "");
}

// Initialize application
router.load().then(async () => {
  try {
    const pathname = location.pathname;
    const codeSpace = getCodeSpace(pathname);

    // Initialize WebSocket for iframe routes
    if (codeSpace && shouldInitWebSocket(pathname, codeSpace)) {
      try {
        await initializeWebSocket(codeSpace);
      } catch (error) {
        console.error("WebSocket initialization failed:", error);
        throw new RouterError(
          "WebSocket initialization failed",
          `/live/${codeSpace}/iframe`
        );
      }
    }

    // Render the main app
    await renderApp({ App });

  } catch (error) {
    handleError(error);
  }
}).catch(handleError);
