import { WebSocketManager } from "./services/websocket/WebSocketManager";

const webSocketManager = new WebSocketManager();

export const main = async () => {
  try {
    await webSocketManager.init();
  } catch (error) {
    console.error("Error in main function:", error);
    throw error;
  }
};

// Export for global access
Object.assign(globalThis, { webSocketManager });
