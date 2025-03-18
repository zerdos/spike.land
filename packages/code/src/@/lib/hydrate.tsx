// import type { ICode } from "@/lib/interfaces";
import type { Workbox } from "workbox-window";

// export const renderPreviewWindow = async (
//   { codeSpace, cSess, AppToRender }: {
//     codeSpace: string;
//     cSess: ICode;
//     AppToRender: React.FC<{ codeSpace: string; cSess: ICode; }>;
//   },
// ) => {
//   //   import { renderApp } from "@/lib/render-app";
//   // import { ClerkProvider } from "@clerk/clerk-react";
//   // import { AppToRender } from "./AppToRender";

//   const renderAppPromise = import("@/external/render-app");
//   const ClerkProviderPromise = import("@clerk/clerk-react");

//   const [
//     { renderApp },
//     { ClerkProvider },
//   ] = await Promise.all([renderAppPromise, ClerkProviderPromise]);

//   const App = () => (
//     <ClerkProvider
//       publishableKey="pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ"
//       afterSignOutUrl="/"
//     >
//       <AppToRender codeSpace={codeSpace} cSess={cSess} />
//     </ClerkProvider>
//   );

//   return renderApp({ App });
// };

// Add global type definition for the Workbox instance
declare global {
  interface Window {
    __WB_INSTANCE?: Workbox;
  }
}

export const setupServiceWorker = async () => {
  console.log("Setting up service worker...");
  
  // Check if service workers are supported
  if (!("serviceWorker" in navigator)) {
    console.log("Service worker not supported in this browser");
    return null;
  }
  
  // Skip service worker on localhost for development unless specifically enabled
  if (location.hostname === "localhost" && !localStorage.getItem("enable_sw_dev")) {
    console.log("Service worker disabled on localhost. Set localStorage.enable_sw_dev = true to enable.");
    return null;
  }

  try {
    // Import Workbox from CDN
    const { Workbox, messageSW } = await import("workbox-window");
    console.log("Workbox imported successfully");

    // Create a new Workbox instance with the service worker URL
    const wb = new Workbox("/sw.js");
    
    // Listen for service worker state changes
    wb.addEventListener('installed', event => {
      if (event.isUpdate) {
        console.log('Service worker has been updated');
        
        // Notify user of update - you could show a UI prompt here
        if (confirm('New version available! Reload to update?')) {
          window.location.reload();
        }
      } else {
        console.log('Service worker installed for the first time');
      }
    });
    
    // Listen for controlled changes
    wb.addEventListener('controlling', () => {
      console.log('Service worker is now controlling the page');
    });
    
    // Handle service worker messages
    wb.addEventListener('message', event => {
      console.log('Message from service worker:', event.data);
      
      // Handle cache update notifications
      if (event.data?.type === 'CACHE_UPDATED') {
        console.log('Cache has been updated:', event.data.message);
      }
      
      // Handle reload requests
      if (event.data === 'reload') {
        window.location.reload();
      }
    });
    
    // Register the service worker
    const sw = await wb.register().catch(error => {
      console.error('Service worker registration failed:', error);
      return null;
    });
    
    if (sw) {
      console.log("Service worker registered successfully", sw);
      
      // Store the Workbox instance for future reference
      window.__WB_INSTANCE = wb as Workbox;
      

      console.log("Service worker is ready to use");
      
      return sw;
    }
    
    return null;
  } catch (error) {
    console.error("Error setting up service worker:", error);
    return null;
  }
};

// Add to window for debug access
Object.assign(window, { setupServiceWorker });

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

// Setup service worker message listeners outside the function to ensure they're available
if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    console.log("Service worker message received:", event.data);
    
    if (event.data === "reload") {
      window.location.reload();
    }
    
    // Handle any structured messages
    if (event.data?.type) {
      switch (event.data.type) {
        case 'CACHE_UPDATED':
          console.log('Cache has been updated:', event.data.message);
          // You could show a toast notification here
          break;
          
        case 'ERROR':
          console.error('Service worker error:', event.data.message);
          break;
          
        default:
          console.log('Unknown message type from service worker:', event.data);
      }
    }
  });
}
