import { Workbox } from "workbox-window";

const setupServiceWorker = async () => {
  if (navigator.serviceWorker) {
    const wb = new Workbox("/sw.js");
  
    wb.register();
    setInterval(() => {
      wb.update();
    }, 60 * 60 * 1000); //
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
