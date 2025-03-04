import { setupServiceWorker } from "@/lib/hydrate";
import { IServiceWorkerManager } from "@/services/types";

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
