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

export function setupWebSocketPairMock() {
  if (!("WebSocketPair" in globalThis)) {
    (globalThis as any).WebSocketPair = function() {
      const wsStub: MockWebSocket = {
        send: vi.fn(),
        close: vi.fn(),
        accept: vi.fn(),
        addEventListener: vi.fn((type: string, listener: EventListener) => {
          if (type === "message") {
            wsStub.onmessage = listener as any;
          } else if (type === "close") {
            wsStub.onclose = listener as any;
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
