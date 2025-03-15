import { vi } from "vitest";
import { setupAllMocks } from "./test-mocks";

// Mock WebSocket for tests
class MockWebSocket {
  constructor(url: string) {
    console.log("Mock WebSocket created with URL:", url); // For debugging
  }
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  dispatchEvent = vi.fn();
  send = vi.fn();
  close = vi.fn();
}

setupAllMocks();

vi.stubGlobal("WebSocket", MockWebSocket); // commented out

// vi.stubGlobal( // commented out
//     "WebSocketPair",
//     class {
//         0: WebSocket;
//         1: WebSocket;
//         constructor() {
//             // Use the MockWebSocket class here
//             const mockWebSocket: WebSocket = new (globalThis as any).WebSocket("wss://example.com");
//             this[0] = mockWebSocket;
//             this[1] = {
//                 ...mockWebSocket,
//                 addEventListener: vi.fn(),
//                 removeEventListener: vi.fn(),
//                 dispatchEvent: vi.fn(),
//             };
//         }
//     },
// );

// Mock global fetch
// global.fetch = vi.fn(); // commented out

// Set up all required mocks for testing
// setupAllMocks(); // commented out
