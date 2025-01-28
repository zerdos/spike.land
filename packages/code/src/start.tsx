import { renderApp } from "@/lib/render-app";
import { App } from "./App";
import { router } from "./routes/router";
import "./index.css";

// Handle .tsx extension removal
if (location.pathname.endsWith(".tsx")) {
  location.href = location.href.replace(".tsx", "");
}

// Initialize router
router.load().then(async () => {
  // Get root element
  await renderApp({
    App,
  });

  // Setup router subscriptions for code space handling
  router.subscribe("onResolved", ({ toLocation }: {
    toLocation: { pathname: string; };
  }) => {
    // Get codeSpace from route params if available
    const matches: Array<{
      params: { codeSpace: string; };
    }> = router.state.matches;
    const codeSpaceMatch = matches.find(match => "codeSpace" in match.params);
    const codeSpace = codeSpaceMatch?.params.codeSpace;

    if (codeSpace) {
      (async () => {
        const pathname = toLocation.pathname;
        const isLiveRoute = pathname.startsWith("/live/");
        const isLiveCMSRoute = pathname.startsWith("/live-cms/");
        const isDehydrated = pathname.endsWith("dehydrated");

        if ((isLiveRoute || isLiveCMSRoute) && !isDehydrated) {
          const rendered = await renderApp({ codeSpace });
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
