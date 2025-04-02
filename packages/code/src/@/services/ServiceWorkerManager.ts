
import type { IServiceWorkerManager } from "@/services/types";
import { swVersion } from "@/lib/sw-version";
import type { Workbox } from "workbox-window";



/**
 * Type definitions for global window extensions
 */
declare global {
  interface Window {
    __WB_INSTANCE?: Workbox;
  }
}



export const setupServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  console.log("Setting up service worker...");

  // Skip if service workers aren't supported
  if (!("serviceWorker" in navigator)) {
    console.log("Service worker not supported in this browser");
    return null;
  }

  // Skip on localhost for development unless explicitly enabled
  if (location.hostname === "localhost" && !localStorage.getItem("enable_sw_dev")) {
    console.log(
      "Service worker disabled on localhost (enable with localStorage.enable_sw_dev = true)",
    );
    return null;
  }

  try {
    // Import Workbox dynamically

    // check if we have sw installed
    const oldRegistration = await navigator.serviceWorker.getRegistration();

    if (oldRegistration) {
      const oldSwVersion = localStorage.getItem("swVersion");
      const serverVersion = await fetch("/swVersion.json").then((res) =>
        res.json().then((data: { swVersion: string; }) => data.swVersion)
      );
      if (oldSwVersion === swVersion && serverVersion === swVersion) {
        console.log("Service worker is already registered");
        return oldRegistration;
      }

      oldRegistration.unregister();
    }

    const { Workbox } = await import("workbox-window");

    // Create and configure Workbox instance
    const wb = new Workbox("/sw.js");

    // Configure service worker event listeners
    configureServiceWorkerEvents(wb);

    // Register the service worker
    const registration = await wb.register().catch(error => {
      console.error("Service worker registration failed:", error);
      return null;
    });
    localStorage.setItem("swVersion", swVersion);

    if (registration) {
      console.log("Service worker registered successfully");
      window.__WB_INSTANCE = wb;
      return registration;
    }

    return null;
  } catch (error) {
    console.error("Error setting up service worker:", error);
    return null;
  }
};

/**
 * Configures event listeners for the service worker
 */
function configureServiceWorkerEvents(wb: Workbox): void {
  // Handle installation events
  wb.addEventListener("installed", event => {
    if (event.isUpdate) {
      console.log("Service worker has been updated");

      // Prompt user to update
      if (confirm("New version available! Reload to update?")) {
        window.location.reload();
      }
    } else {
      console.log("Service worker installed for the first time");
    }
  });

  // Handle controlling events
  wb.addEventListener("controlling", () => {
    console.log("Service worker is now controlling the page");
  });

  // Handle messages from service worker
  wb.addEventListener("message", event => {
    console.log("Message from service worker:", event.data);

    if (event.data?.type === "CACHE_UPDATED") {
      console.log("Cache has been updated:", event.data.message);
    }

    if (event.data === "reload") {
      window.location.reload();
    }
  });
}

// Setup global service worker message listeners
if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    console.log("Service worker message received:", event.data);

    if (event.data === "reload") {
      window.location.reload();
    }

    // Process structured messages
    if (event.data?.type) {
      switch (event.data.type) {
        case "CACHE_UPDATED":
          console.log("Cache has been updated:", event.data.message);
          break;

        case "ERROR":
          console.error("Service worker error:", event.data.message);
          break;

        default:
          console.log("Unknown message type from service worker:", event.data);
      }
    }
  });
}

interface IExtendedWindow extends Window {
  __IS_IFRAME__: boolean;
}

export class ServiceWorkerManager implements IServiceWorkerManager {
  async setup(): Promise<ServiceWorker | undefined> {
    // Do not setup service worker when running in an iframe.
    // Additionally, allow tests to simulate iframe mode via window.__IS_IFRAME__
    if (
      (window as unknown as IExtendedWindow).__IS_IFRAME__ === true ||
      window.self !== window.parent
    ) {
      return;
    }
    try {
      await setupServiceWorker();
    } catch (setupError) {
      console.error("Error setting up service worker:", { setupError });
      throw setupError;
    }
  }
}


Object.assign(window, { setupServiceWorker });