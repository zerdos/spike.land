import { vi } from "vitest";
import { setupAllMocks } from "./test-mocks/index.js";

// Mock WebSocket for tests
vi.stubGlobal(
  "WebSocketPair",
  class {
    0: WebSocket;
    1: WebSocket;
    constructor() {
      const mockWebSocket: WebSocket = new WebSocket("wss://example.com");
      this[0] = mockWebSocket;
      this[1] = { 
        ...mockWebSocket,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }
  },
);

// Mock global fetch
global.fetch = vi.fn();

// Set up all required mocks for testing
setupAllMocks();
