import { CodeSessionBC } from "./services/CodeSessionBc";
import { RenderService } from "./services/render/RenderService";
import type { IWebSocketManager, WebSocketDependencies } from "./services/websocket/types";
import { WebSocketManager } from "./services/websocket/WebSocketManager";
import { ServiceWorkerManager } from "./services/worker/ServiceWorkerManager";

export const main = async (codeSpace: string) => {
  try {
    const renderService = new RenderService(codeSpace);
    // const cSess = new Code(codeSpace);
    // await cSess.init();
    const codeSessionBC = new CodeSessionBC(codeSpace);

    const websocketDependencies: WebSocketDependencies = {
      codeSessionBC,
      messageHandler: {
        handleRunMessage: async (transpiled: string) => {
          try {
            if (window.self !== window.parent) {
              return await renderService.handleRender(
                await renderService.updateRenderedApp({ transpiled }),
              );
            } else {
              console.warn(
                "Not in iframe: skipping code processing to prevent main window re-render.",
              );
              const { css, html } = codeSessionBC.session ||
                await codeSessionBC.init();
              return Promise.resolve({
                css,
                html,
              });
            }
          } catch (error) {
            console.error("Error handling run message:", error);
            return false;
          }
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
  } catch (error) {
    console.error("Error in main function:", error);
    throw error;
  }
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
