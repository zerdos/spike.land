import { Workbox } from "workbox-window";

import { useCodeSpace } from "./hooks/useCodeSpace";

import { handleDefaultPage, handleDehydratedPage, run as handleLivePage } from "./ws";

const codeSpace = useCodeSpace();

const setupServiceWorker = async () => {
  if (
    !navigator.serviceWorker || localStorage.getItem("sw") === "false"
    || location.origin.indexOf("localhost") !== -1
  ) {
    return null;
  }

  try {
    const sw = new Workbox(`/sw.js`);
    return sw.register();
  } catch (e) {
    console.error("Error setting up service worker:", e);
    return null;
  }
};

const createLangChainWorkflow = async (prompt: string) => {
  try {
    const { createWorkflow } = await import("./shared");
    return createWorkflow(prompt);
  } catch (error) {
    console.error("Error creating LangChain workflow:", error);
    throw error;
  }
};

const initializeApp = async () => {
  try {
    const [
      { enhancedFetch },
      { useArchive, useSpeedy },
    ] = await Promise.all([
      import("./enhancedFetch"),
      import("./hooks/useArchive"),
    ]);

    Object.assign(globalThis, { createWorkflow: createLangChainWorkflow });
    Object.assign(globalThis, {
      enhancedFetch,
      useArchive,
      useSpeedy,
    });

    await setupServiceWorker();
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};

const main = async () => {
  try {
    if (location.pathname === `/live/${codeSpace}`) {
      await handleLivePage();
      await initializeApp();
    } else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
      handleDehydratedPage();
    } else if (location.pathname === `/live/${codeSpace}/iframe`) {
      await handleDefaultPage();
    }
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

if (location.pathname.startsWith("/live")) {
  main();
}
