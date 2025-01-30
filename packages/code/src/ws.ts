import { getCodeSpace } from "@/hooks/use-code-space";
import { CodeSessionBC } from "./services/CodeSessionBc";
import { MessageHandlerService } from "./services/message/MessageHandlerService";
import type { WebSocketDependencies } from "./services/websocket/types";
import { WebSocketManager } from "./services/websocket/WebSocketManager";
import { ServiceWorkerManager } from "./services/worker/ServiceWorkerManager";




export const main = async () => {
  try {
    const codeSpace = getCodeSpace(location.pathname);
    
    const websocketDependencies: WebSocketDependencies = {
      codeSessionBC: new CodeSessionBC(codeSpace),
      messageHandler: new MessageHandlerService(),
      serviceWorker: new ServiceWorkerManager(),
    };

    
    const webSocketManager = new WebSocketManager(websocketDependencies, {
      maxRetries: 3,
      retryDelay: 1000,
      connectionTimeout: 5000,
    }
    
    );
    await webSocketManager.init();
  } catch (error) {
    console.error("Error in main function:", error);
    throw error;
  }
};

// Export for global access

