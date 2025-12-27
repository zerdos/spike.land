import { type MockInstance, vi } from "vitest";

export interface MockWebSocket {
  accept: MockInstance;
  send: MockInstance;
  close: MockInstance;
  addEventListener: MockInstance;
  readyState: number;
  onmessage: ((event: MessageEvent) => void) | null;
  onclose: ((event: CloseEvent) => void) | null;
}

// Extend globalThis type for WebSocketPair
declare global {
  interface GlobalThis {
    WebSocketPair?: new() => [MockWebSocket, MockWebSocket];
  }
}

export function setupWebSocketPairMock() {
  if (!("WebSocketPair" in globalThis)) {
    (globalThis as { WebSocketPair?: () => [MockWebSocket, MockWebSocket] }).WebSocketPair = function() {
      const wsStub: MockWebSocket = {
        send: vi.fn(),
        close: vi.fn(),
        accept: vi.fn(),
        addEventListener: vi.fn((type: string, listener: EventListener) => {
          if (type === "message") {
            wsStub.onmessage = listener as (event: MessageEvent) => void;
          } else if (type === "close") {
            wsStub.onclose = listener as (event: CloseEvent) => void;
          }
        }),
        readyState: 1,
        onmessage: null,
        onclose: null,
      };
      return [wsStub, wsStub];
    };
  }
}
