import { RenderService } from "@/services/RenderService";
import { ServiceWorkerManager } from "@/services/ServiceWorkerManager";
import { SessionSynchronizer } from "@/services/SessionSynchronizer";
import type { IWebSocketManager, WebSocketDependencies } from "@/services/types";
import { WebSocketManager } from "@/services/WebSocketManager";
import { tryCatch } from "@/lib/try-catch";

export const main = async (codeSpace: string) => {
  const mainProcess = async () => {
    const renderService = new RenderService(codeSpace);
    const sessionSynchronizer = new SessionSynchronizer(codeSpace);

    const websocketDependencies: WebSocketDependencies = {
      sessionSynchronizer,
      messageHandler: {
        handleRunMessage: async (transpiled: string) => {
          const runMessagePromise = async () => {
            if (window.self !== window.parent) {
              return await renderService.handleRender(
                await renderService.updateRenderedApp({ transpiled }),
              );
            } else {
              console.warn(
                "Not in iframe: skipping code processing to prevent main window re-render.",
              );
              const session = sessionSynchronizer.getSession() ||
                await sessionSynchronizer.init();
              const { css, html } = session;
              return { css, html }; // Removed Promise.resolve as tryCatch handles promises
            }
          };
          const { data, error } = await tryCatch(runMessagePromise());
          if (error) {
            console.error("Error handling run message:", error);
            return false;
          }
          return data;
        },
        handleMessage: (event) => {
          console.log("Message received:", event);
          return Promise.resolve({ success: true });
        },
        cleanup: () => {
          console.log("Cleaning up message handler");
        },
      },
      serviceWorker: new ServiceWorkerManager(),
    };

    const webSocketManager = new WebSocketManager(websocketDependencies, {
      maxRetries: 3,
      retryDelay: 1000,
      connectionTimeout: 5000,
    });
    await webSocketManager.init();

    Object.assign(window, { webSocketManager });
    return webSocketManager;
  };

  const { data, error } = await tryCatch(mainProcess());
  if (error) {
    console.error("Error in main function:", error);
    throw error;
  }
  return data;
};

// Export for global access

export const testHandleRunMessage = async (
  transpiled: string,
  webSocketManager: IWebSocketManager,
) => {
  if (window.self !== window.parent) {
    return await webSocketManager.handleRunMessage(transpiled);
  } else {
    console.warn(
      "Not in iframe: skipping code processing to prevent main window re-render.",
    );
    return false;
  }
};
