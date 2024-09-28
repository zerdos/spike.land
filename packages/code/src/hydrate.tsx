// import { Workbox } from "workbox-window";

const setupServiceWorker = async () => {
//   if (
//     !navigator.serviceWorker || localStorage.getItem("sw") === "false"
//     || location.origin.indexOf("localhost") !== -1
//   ) {
//     return null;
//   }

if ('serviceWorker' in navigator) {
  setInterval(() => {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        registration.update();
      }
    });
  }, 60 * 60 * 1000); 
}

fetch('/sw-config.json')
  .then((response) => response.json() as Promise<{ killSwitch: boolean, version: "v14" }>)
  .then((config) => {
    if (config.killSwitch && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.unregister().then(() => {
            window.location.reload();
          });
        }
      });
    }
  })
  .catch((error) => {
    console.error('Failed to fetch configuration:', error);
  });


  try {
    const { Workbox } = await import("workbox-window");
    const sw = new Workbox(`/sw.js`);
    // 
    await sw.register();

//     const {swVersion} = await import(`${location.origin}/swVersion.mjs`);
//     localStorage.getItem("swVersion") !== swVersion && sw.messageSkipWaiting();  
//     localStorage.setItem("swVersion", swVersion);
    
//     return sw;
return null;
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
