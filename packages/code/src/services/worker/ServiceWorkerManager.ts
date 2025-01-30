import type { IServiceWorkerManager } from "../websocket/types";

export class ServiceWorkerManager implements IServiceWorkerManager {
  public async setup() {
 //   if (window.parent === window) {
      try {
        const { setupServiceWorker } = await import("@/lib/hydrate");
        return await setupServiceWorker() as ServiceWorker;

      } catch (error) {
        console.error("Error setting up service worker:", error);
        return navigator.serviceWorker.controller!
      }
 //   }
  }
}
