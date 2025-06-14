import { renderApp } from "@/lib/render-app";
import { tryCatch } from "@/lib/try-catch";
import { App } from "./App";
import { router } from "./app/router";
import "./index.css";
import { getCodeSpace } from "@/hooks/use-code-space";
import { initializeWebSocket, shouldInitWebSocket } from "./app-loader";

/**
 * Global error handler
 */
const handleError = (error: unknown): void => {
  if (error instanceof Error) {
    console.error("Application initialization failed: ", error.message);
    return;
  }
  console.error("Application initialization failed:", { error });
  // Could add more sophisticated error handling here
  // Like error reporting to a service or showing user feedback
};

// Handle .tsx extension removal
if (location.pathname.endsWith(".tsx")) {
  location.href = location.href.replace(".tsx", "");
}

// Initialize application
router.load().then(async () => {
  const pathname = location.pathname;
  const codeSpace = getCodeSpace(pathname);

  if (codeSpace && shouldInitWebSocket(pathname, codeSpace)) {
    const { error } = await tryCatch(initializeWebSocket(codeSpace));
    if (error) {
      console.error("WebSocket initialization error:", {
        error,
        codeSpace,
        pathname,
      });
    }
  }

  // Render the main app
  const { error } = await tryCatch(
    renderApp({ App, codeSpace: "", transpiled: "", code: "" }),
  );
  if (error) {
    console.error("Error rendering app:", { error, App, pathname, codeSpace });
  }
}).catch(handleError);
