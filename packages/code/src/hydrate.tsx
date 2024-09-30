
const setupServiceWorker = async () => {
  
  if (!navigator.serviceWorker || navigator.serviceWorker.controller===null || (navigator.serviceWorker.controller?.state  === "redundant")) {
    const { Workbox } = await import( "workbox-window");

    const wb = new Workbox("/sw.js");
  
    wb.register();
    setInterval(() => {
      wb.update();
    }, 60 * 60 * 1000); // every hour
  }
};


Object.assign(globalThis, { setupServiceWorker });

const createLangChainWorkflow = async (prompt: string) => {
  try {
    const { createWorkflow } = await import("@/lib/shared");
    return createWorkflow(prompt);
  } catch (error) {
    console.error("Error creating LangChain workflow:", error);
    throw error;
  }
};

export const initializeApp = async () => {
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
