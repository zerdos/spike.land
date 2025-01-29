import { renderApp } from "@/external/render-app";
import { App } from "./App";
import { router } from "./routes/router";
import "./index.css";
import { getCodeSpace } from "@/hooks/use-code-space";

// Handle .tsx extension removal
if (location.pathname.endsWith(".tsx")) {
  location.href = location.href.replace(".tsx", "");
}

// Initialize router
router.load().then(async () => {
  const codeSpace = getCodeSpace(toLocation.pathname);
  // Get root element
  await renderApp({
    App,
  });

  if (
    location.pathname === `/live/${codeSpace}/iframe`
  ) {
    import("./ws").then(({ main }) => main());
  }

  // Setup router subscriptions for code space handling
  router.subscribe("onResolved", ({ toLocation }: {
    toLocation: { pathname: string; };
  }) => {
    if (codeSpace) {
      (async () => {
        const pathname = toLocation.pathname;
        const isLiveRoute = pathname.startsWith("/live/");
        const isLiveCMSRoute = pathname.startsWith("/live-cms/");
        const isDehydrated = pathname.endsWith("dehydrated");

        if ((isLiveRoute || isLiveCMSRoute) && !isDehydrated && !pathname.endsWith("/")) {
          const rendered = await renderApp({ codeSpace });
          Object.assign(window, { rendered });
        }
      })();
    }
  });
}).catch(console.error);
