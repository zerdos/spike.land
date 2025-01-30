import type { ICode } from "@/lib/interfaces";

export const renderPreviewWindow = async (
  { codeSpace, cSess, AppToRender }: {
    codeSpace: string;
    cSess: ICode;
    AppToRender: React.FC<{ codeSpace: string; cSess: ICode; }>;
  },
) => {
  //   import { renderApp } from "@/lib/render-app";
  // import { ClerkProvider } from "@clerk/clerk-react";
  // import { AppToRender } from "./AppToRender";

  const renderAppPromise = import("@/external/render-app");
  const ClerkProviderPromise = import("@clerk/clerk-react");

  const [
    { renderApp },
    { ClerkProvider },
  ] = await Promise.all([renderAppPromise, ClerkProviderPromise]);

  const App = () => (
    <ClerkProvider
      publishableKey="pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ"
      afterSignOutUrl="/"
    >
      <AppToRender codeSpace={codeSpace} cSess={cSess} />
    </ClerkProvider>
  );

  return renderApp({ App });
};

export const setupServiceWorker = async () => {
  console.log("Setting up service worker...");
  if (location.hostname === "localhost") return;

  const { Workbox } = await import("workbox-window");
  console.log("Workbox imported");

  const wb = new Workbox("/sw.js");
  const sw = await wb.register();


  console.log("Workbox instance created");

  console.log("Active service worker:", sw);

  if (!sw) {
    console.log("Service worker not found, registering");
    return wb.active;
  }

  if (sw.active?.state === "redundant") {
    console.log("Service worker is redundant, updating");
    await wb.update();
    return wb.active;
  }

  if (sw.active?.state === "activated") {
    console.log("Service worker is already activated");

    return sw;
  }
  

  console.log("Service worker setup completed");
 return sw;
};
// };

Object.assign(globalThis, { setupServiceWorker });

export const initializeApp = async () => {
  console.log("Initializing app...");

  try {
    const [
      { enhancedFetch },
      { useArchive, useSpeedy },
    ] = await Promise.all([
      import("@/lib/enhanced-fetch"),
      import("@/lib/use-archive"),
    ]);
    console.log("Modules imported successfully");

    // Object.assign(globalThis, { createWorkflow: createLangChainWorkflow });
    Object.assign(globalThis, {
      enhancedFetch,
      useArchive,
      useSpeedy,
    });
    console.log("Global objects assigned");

    console.log("App initialization completed");
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};
if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    console.log("Service worker message received:", event.data);
    if (event.data === "reload") {
      location.reload();
    }
  });
}
