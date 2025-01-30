import { getCodeSpace } from "@/hooks/use-code-space";
import { CodeSessionBC } from "./services/CodeSessionBc";
import type { WebSocketDependencies } from "./services/websocket/types";
import { WebSocketManager } from "./services/websocket/WebSocketManager";
import { ServiceWorkerManager } from "./services/worker/ServiceWorkerManager";
import { CodeProcessor } from "./services/code/CodeProcessor";

export const main = async () => {
  try {
    const codeSpace = getCodeSpace(location.pathname);
    // const cSess = new Code(codeSpace);
    // await cSess.init();
    
    const websocketDependencies: WebSocketDependencies = {
      codeSessionBC: new CodeSessionBC(codeSpace),
     messageHandler: {

          handleRunMessage: CodeProcessor.runCode,
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
    }
    
    );
    await webSocketManager.init();
   
    Object.assign(window, { webSocketManager });

  } catch (error) {
    console.error("Error in main function:", error);
    throw error;
  }
};

// Export for global access

