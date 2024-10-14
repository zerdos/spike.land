export const setupServiceWorker = async () => {
  console.log("Setting up service worker...");
  if (location.hostname === "localhost") {return;}

  // if (!navigator.serviceWorker || navigator.serviceWorker.controller===null || (navigator.serviceWorker.controller?.state  === "redundant")) {
  const { Workbox } = await import("workbox-window");
  console.log("Workbox imported");

  const wb = new Workbox("/sw.js");
  const sw = await wb.register();

  console.log("Workbox instance created");

  console.log("Active service worker:", sw);

  if (!sw) {
    console.log("Service worker not found, registering");
    return;
  }

  if (sw.active?.state === "redundant") {
    console.log("Service worker is redundant, updating");
    return wb.update();
  }

  if (sw.active?.state === "activated") {
    console.log("Service worker is already activated");
    return;
  }

  console.log("Service worker setup completed");
};
// };

Object.assign(globalThis, { setupServiceWorker });

const createLangChainWorkflow = async (prompt: string) => {
  console.log("Creating LangChain workflow with prompt:", prompt);
  try {
    const { createWorkflow } = await import("@/lib/shared");
    const workflow = await createWorkflow(prompt);
    console.log("LangChain workflow created successfully");
    return workflow;
  } catch (error) {
    console.error("Error creating LangChain workflow:", error);
    throw error;
  }
};

export const initializeApp = async () => {
  console.log("Initializing app...");

  try {
    const [
      { enhancedFetch },
      { useArchive, useSpeedy },
    ] = await Promise.all([
      import("./enhancedFetch"),
      import("./hooks/useArchive"),
    ]);
    console.log("Modules imported successfully");

    Object.assign(globalThis, { createWorkflow: createLangChainWorkflow });
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
navigator.serviceWorker.addEventListener("message", (event) => {
  console.log("Service worker message received:", event.data);
  if (event.data === "reload") {
    location.reload();
  }
});
