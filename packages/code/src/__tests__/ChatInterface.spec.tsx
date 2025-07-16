// Removed ChatDrawerProps import as it's no longer needed
import { useRef as _useRef, useState as _useState } from "react"; // Import React, useRef, useState
import { afterAll, beforeAll, vi } from "vitest";

// Mock dependencies first
vi.mock("@/hooks/use-code-space", () => ({
  getCodeSpace: vi.fn(() => "test-space"),
}));

vi.mock("@/hooks/use-dictation", () => ({
  useDictation: vi.fn(() => {
    return _useState("");
  }),
}));

vi.mock("@/hooks/useScreenshot", () => ({
  useScreenshot: vi.fn(() => ({
    isScreenshotLoading: false,
    screenshotImage: null,
    handleScreenshotClick: vi.fn(),
    handleCancelScreenshot: vi.fn(),
  })),
}));

// Removed handle-send-message mock as it's no longer used

vi.mock("@/external/use-local-storage", () => ({
  useLocalStorage: vi.fn((_key: string, defaultValue: unknown) => {
    let value = defaultValue;
    return [
      value,
      (newValue: unknown | ((prev: unknown) => unknown)) => {
        value = typeof newValue === "function" ? newValue(value) : newValue;
      },
    ];
  }),
}));

vi.mock("@/components/app/assistant-ui-drawer", () => ({
  AssistantUIDrawer: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    return isOpen
      ? (
        <div data-testid="assistant-ui-drawer">
          <button onClick={onClose}>Close</button>
          <button data-testid="reset-chat-button">Reset</button>
        </div>
      )
      : null;
  },
}));

// Mock BroadcastChannel with proper event handling
class MockBroadcastChannel {
  private static channels: Map<string, MockBroadcastChannel[]> = new Map<
    string,
    MockBroadcastChannel[]
  >();
  private listeners: Map<string, Set<(event: MessageEvent) => void>> = new Map<
    string,
    Set<(event: MessageEvent) => void>
  >();
  private messageHandlers: Array<(event: MessageEvent) => void> = [];

  constructor(public name: string) {
    const channels = MockBroadcastChannel.channels.get(name) || [];
    channels.push(this);
    MockBroadcastChannel.channels.set(name, channels);
  }

  postMessage(message: {
    instructions?: string;
    isStreaming?: boolean;
    editingMessageId?: string;
    chunk?: string;
    code?: string;
    transpiled?: string;
    debugInfo?: unknown;
  }) {
    const channels = MockBroadcastChannel.channels.get(this.name) || [];
    const event = new MessageEvent("message", { data: message });

    channels.forEach((channel) => {
      if (channel !== this) {
        if (channel.onmessage) {
          channel.onmessage(event);
        }
        channel.messageHandlers.forEach((handler) => handler(event));
        channel.listeners.get("message")?.forEach((listener) => listener(event));
      }
    });
  }

  addEventListener(type: string, listener: (event: MessageEvent) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(listener);
    this.messageHandlers.push(listener);
  }

  onmessage: ((event: MessageEvent) => void) | null = null;

  removeEventListener(type: string, listener: (event: MessageEvent) => void) {
    this.listeners.get(type)?.delete(listener);
    this.messageHandlers = this.messageHandlers.filter((h) => h !== listener);
  }

  close() {
    const channels = MockBroadcastChannel.channels.get(this.name) || [];
    const index = channels.indexOf(this);
    if (index > -1) {
      channels.splice(index, 1);
    }
    MockBroadcastChannel.channels.delete(this.name);
    this.listeners.clear();
    this.messageHandlers = [];
    this.onmessage = null;
  }

  static clearAll() {
    MockBroadcastChannel.channels.clear();
  }

  static hasChannel(name: string): boolean {
    return MockBroadcastChannel.channels.has(name);
  }
}

beforeAll(() => {
  global.BroadcastChannel = MockBroadcastChannel as unknown as typeof BroadcastChannel;
  // Mock scrollIntoView on all elements
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
    writable: true,
  });

  // Mock location.origin
  Object.defineProperty(window, "location", {
    configurable: true,
    value: {
      origin: "http://localhost:3000",
      href: "http://localhost:3000",
    },
  });

  // Mock sessionStorage
  const sessionStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  Object.defineProperty(window, "sessionStorage", {
    configurable: true,
    value: sessionStorageMock,
  });

  // Mock document.getElementById to return a scrollable element
  const originalGetElementById = document.getElementById;
  document.getElementById = vi.fn((id) => {
    if (id === "chat-messages-container") {
      const mockElement = document.createElement("div");
      mockElement.scrollIntoView = vi.fn();
      return mockElement;
    }
    return originalGetElementById.call(document, id);
  });

  // Mock window.matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterAll(() => {
  MockBroadcastChannel.clearAll();
});
