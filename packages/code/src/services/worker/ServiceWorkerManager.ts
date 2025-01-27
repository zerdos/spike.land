import type { IServiceWorkerManager } from "../websocket/types";

export class ServiceWorkerManager implements IServiceWorkerManager {
  public async setup(): Promise<void> {
    if (window.parent === window) {
      try {
        const { setupServiceWorker } = await import("@/lib/hydrate");
        await setupServiceWorker();
      } catch (error) {
        console.error("Error setting up service worker:", error);
        throw error;
      }
    }
  }
}
