import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { router } from "./routes/router";
import "./index.css";

// Handle .tsx extension removal
if (location.pathname.endsWith(".tsx")) {
  location.href = location.href.replace(".tsx", "");
}

// Initialize router
router.load().then(() => {
  // Get root element
  const rootElement = document.getElementById("embed");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  // Create React root and render app
  const root = createRoot(rootElement);
  root.render(React.createElement(App));

  // Setup router subscriptions for code space handling
  router.subscribe("onResolved", ({ toLocation }) => {
    // Get codeSpace from route params if available
    const matches = router.state.matches;
    const codeSpaceMatch = matches.find(match => "codeSpace" in match.params);
    const codeSpace = codeSpaceMatch?.params.codeSpace;

    if (codeSpace) {
      (async () => {
        const pathname = toLocation.pathname;
        const isLiveRoute = pathname.startsWith("/live/");
        const isLiveCMSRoute = pathname.startsWith("/live-cms/");
        const isDehydrated = pathname.endsWith("dehydrated");

        if ((isLiveRoute || isLiveCMSRoute) && !isDehydrated) {
          const renderAppUrl = `/@/lib/render-app.mjs`;
          const { renderApp } = await import(/* @vite-ignore */ renderAppUrl);
          const rendered = await renderApp({ codeSpace, root });
          Object.assign(window, { rendered });
        }
      })();

      if (
        (toLocation.pathname.startsWith("/live") ||
          toLocation.pathname.startsWith("/live-cms")) &&
        !toLocation.pathname.endsWith("dehydrated") &&
        !toLocation.pathname.endsWith("/")
      ) {
        import("./ws").then(({ main }) => main());
      }
    }
  });
}).catch(console.error);
