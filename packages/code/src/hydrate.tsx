// import { Workbox } from "workbox-window";

const setupServiceWorker = async () => {
//   if (
//     !navigator.serviceWorker || localStorage.getItem("sw") === "false"
//     || location.origin.indexOf("localhost") !== -1
//   ) {
//     return null;
//   }

  try {
    const { Workbox } = await import("workbox-window");
    const sw = new Workbox(`/sw.js`);
    // 
    await sw.register();

//     const {swVersion} = await import(`${location.origin}/swVersion.mjs`);
//     localStorage.getItem("swVersion") !== swVersion && sw.messageSkipWaiting();  
//     localStorage.setItem("swVersion", swVersion);
    
//     return sw;
  } catch (e) {
    console.error("Error setting up service worker:", e);
    return null;
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

    // await setupServiceWorker();
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};
