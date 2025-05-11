import { swVersion } from "@/lib/sw-version";
import { tryCatch } from "@/lib/try-catch";
import type { IServiceWorkerManager } from "@/services/types";
import type { Workbox } from "workbox-window";

/**
 * Type definitions for global window extensions
 */
declare global {
  interface Window {
    __WB_INSTANCE?: Workbox;
  }
}

export const setupServiceWorker = async (): Promise<
  ServiceWorkerRegistration | null
> => {
  console.log("Setting up service worker...");

  // Skip if service workers aren't supported
  if (!("serviceWorker" in navigator)) {
    console.log("Service worker not supported in this browser");
    return null;
  }

  // Skip on localhost for development unless explicitly enabled
  if (
    location.hostname === "localhost" && !localStorage.getItem("enable_sw_dev")
  ) {
    console.log(
      "Service worker disabled on localhost (enable with localStorage.enable_sw_dev = true)",
    );
    return null;
  }

  const setupPromise = async () => {
    const oldRegistration = await navigator.serviceWorker.getRegistration();

    if (oldRegistration) {
      const oldSwVersion = localStorage.getItem("swVersion");
      const serverVersionResult = await tryCatch(
        fetch("/swVersion.json").then((res) =>
          res.json().then((data: { swVersion: string }) => data.swVersion)
        )
      );

      if (serverVersionResult.error) {
        console.warn("Failed to fetch server SW version, proceeding with registration:", serverVersionResult.error);
      } else if (oldSwVersion === swVersion && serverVersionResult.data === swVersion) {
        console.log("Service worker is already registered and up-to-date");
        return oldRegistration;
      }
      await oldRegistration.unregister();
    }

    const { Workbox } = await import("workbox-window");
    const wb = new Workbox("/sw.js");
    configureServiceWorkerEvents(wb);

    const registrationResult = await tryCatch(wb.register());
    if (registrationResult.error) {
      console.error("Service worker registration failed:", registrationResult.error);
      return null;
    }
    localStorage.setItem("swVersion", swVersion);

    if (registrationResult.data) {
      console.log("Service worker registered successfully");
      window.__WB_INSTANCE = wb;
      return registrationResult.data;
    }
    return null;
  };

  const { data: registration, error } = await tryCatch(setupPromise());

  if (error) {
    console.error("Error setting up service worker:", error);
    return null;
  }
  return registration;
};

/**
 * Configures event listeners for the service worker
 */
function configureServiceWorkerEvents(wb: Workbox): void {
  // Handle installation events
  wb.addEventListener("installed", (event) => {
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
  wb.addEventListener("message", (event) => {
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
    const { error } = await tryCatch(setupServiceWorker());
    if (error) {
      console.error("Error setting up service worker:", { error });
      throw error;
    }
  }
}

Object.assign(window, { setupServiceWorker });
