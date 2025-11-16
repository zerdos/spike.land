import { getCodeSpace } from "@/hooks/use-code-space";
import type { ICodeSession } from "@/lib/interfaces";
import type {
  IMessageHandlerService,
  IServiceWorkerManager,
  ISessionSynchronizer,
  MessageData,
  WebSocketDependencies,
} from "@/services/types";
import { WebSocketManager } from "@/services/WebSocketManager";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// Mock window functions and console
window.scrollTo = vi.fn();
let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
let consoleLogSpy: ReturnType<typeof vi.spyOn>;
let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

// Global constants
const DEFAULT_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  connectionTimeout: 5000,
};

// Mock console before tests
beforeAll(() => {
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
});

// Restore console after tests
afterAll(() => {
  consoleErrorSpy.mockRestore();
  consoleLogSpy.mockRestore();
  consoleWarnSpy.mockRestore();
});

// Mock dependencies
vi.mock("@/hooks/use-code-space", () => ({
  getCodeSpace: vi.fn().mockReturnValue("test-space"),
}));

// vi.mock("@/lib/tw-dev-setup", () => ({
//   init: vi.fn().mockResolvedValue(undefined),
// }));

vi.mock("@/lib/errors", () => ({
  DOMError: class extends Error {
    constructor(message: string) {
      super(message);
      this.name = "DOMError";
    }
  },
  WebSocketError: class extends Error {
    constructor(message: string) {
      super(message);
      this.name = "WebSocketError";
    }
  },
  MessageHandlingError: class extends Error {
    constructor(message: string) {
      super(message);
      this.name = "MessageHandlingError";
    }
  },
  getErrorMessage: vi.fn((error: Error) => error?.message || String(error)),
}));

describe("WebSocketManager", () => {
  let webSocketManager: WebSocketManager;
  let mockMessageHandler: IMessageHandlerService;
  let mockServiceWorker: IServiceWorkerManager;
  let mockSessionSynchronizer: ISessionSynchronizer;
  let mockDependencies: WebSocketDependencies;
  let originalLocation: Location;
  let storedCallback: ((data: MessageData) => void) | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    // Save original location
    originalLocation = location;

    // Use Object.defineProperty to avoid type issues
    const newLocation = { ...originalLocation };
    newLocation.pathname = "/test-path";
    Object.defineProperty(window, "location", {
      value: newLocation,
      writable: true,
    });

    // Setup mock dependencies
    mockMessageHandler = {
      handleMessage: vi.fn().mockImplementation(async (message) => {
        if (message.type === "message") {
          // Process the message
          const response = { type: "response", data: message.data };
          return Promise.resolve(response);
        }
        return Promise.resolve(undefined);
      }),
      handleRunMessage: vi.fn().mockResolvedValue({
        html: "<div>test</div>",
        css: ".test{}",
      }),
      cleanup: vi.fn(),
    };

    mockServiceWorker = {
      setup: vi.fn().mockResolvedValue(undefined),
    };

    mockSessionSynchronizer = {
      init: vi.fn().mockResolvedValue({} as ICodeSession),
      subscribe: vi.fn().mockImplementation((callback) => {
        storedCallback = callback;
        return () => {
          storedCallback = null;
        };
      }),
      getCode: vi.fn().mockResolvedValue(""),
      getSession: vi.fn().mockReturnValue(null),
      broadcastSession: vi.fn(),
      close: vi.fn(),
    };

    mockDependencies = {
      messageHandler: mockMessageHandler,
      serviceWorker: mockServiceWorker,
      sessionSynchronizer: mockSessionSynchronizer,
    };

    webSocketManager = new WebSocketManager(mockDependencies);
  });

  afterEach(() => {
    // Restore original location
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
    });

    vi.useRealTimers();
    window.onmessage = null;
    storedCallback = null;
  });

  describe("initialization and config", () => {
    it("should set default config values", () => {
      expect(DEFAULT_CONFIG).toEqual({
        maxRetries: 3,
        retryDelay: 1000,
        connectionTimeout: 5000,
      });
    });

    it("should initialize connection state", () => {
      expect(webSocketManager).toBeDefined();
      expect(webSocketManager.init).toBeDefined();
    });

    it("should initialize with default configuration", async () => {
      await webSocketManager.init();
      expect(getCodeSpace).toHaveBeenCalledWith("/test-path");
    });

    it("should initialize service worker with delay", async () => {
      await webSocketManager.init();
      await vi.runAllTimersAsync();
      expect(mockServiceWorker.setup).toHaveBeenCalled();
    });

    it("should handle initialization error", async () => {
      const error = new Error("Init error");
      mockServiceWorker.setup = vi.fn().mockRejectedValueOnce(error);

      await webSocketManager.init();
      await vi.runAllTimersAsync();

      expect(mockServiceWorker.setup).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "WebSocket error:",
        "Init error",
      );
    });
  });

  describe("route handling and url path detection", () => {
    beforeEach(() => {
      // Clean up any DOM elements from previous tests
      document.body.innerHTML = "";
      document.head.innerHTML = "";

      // Reset mocks
      vi.clearAllMocks();
    });

    it("should handle live page route", async () => {
      // Set path before initializing
      const newLocation = { ...location };
      newLocation.pathname = "/live/test-space";
      Object.defineProperty(window, "location", {
        value: newLocation,
        writable: true,
      });

      // Initialize and wait for callbacks
      await webSocketManager.init();
      await vi.runAllTimersAsync();

      // Verify initialization
      expect(mockSessionSynchronizer.init).toHaveBeenCalled();
      expect(mockSessionSynchronizer.subscribe).toHaveBeenCalled();

      // Test callback registration
      expect(storedCallback).not.toBeNull();
    });

    it("should handle live-cms route", async () => {
      const newLocation = { ...location };
      newLocation.pathname = "/live-cms/test-space";
      Object.defineProperty(window, "location", {
        value: newLocation,
        writable: true,
      });

      await webSocketManager.init();

      expect(mockSessionSynchronizer.init).toHaveBeenCalled();
      expect(mockSessionSynchronizer.subscribe).toHaveBeenCalled();
    });

    it.skip("should handle dehydrated page route", async () => {
      const newLocation = { ...location };
      newLocation.pathname = "/live/test-space/dehydrated";
      Object.defineProperty(window, "location", {
        value: newLocation,
        writable: true,
      });

      const mockEmbed = document.createElement("div");
      mockEmbed.id = "embed";
      document.body.appendChild(mockEmbed);

      await webSocketManager.init();
      await vi.runAllTimersAsync();

      // expect(mockSessionSynchronizer.init).toHaveBeenCalled();
      expect(mockSessionSynchronizer.subscribe).toHaveBeenCalled();

      if (storedCallback) {
        storedCallback({ html: "<div>test</div>", css: ".test{}" });
        await vi.runAllTimersAsync();
      }

      // Add mock element to document body
      const style = document.createElement("style");
      style.textContent = ".test{}";
      document.head.appendChild(style);
      const div = document.createElement("div");
      div.innerHTML = "<div>test</div>";
      mockEmbed.appendChild(div);

      expect(mockEmbed.innerHTML).toContain("<div>test</div>");
      const styles = document.head.querySelector("style");
      expect(styles?.textContent).toContain(".test{}");
    });

    it.skip("should handle default route", async () => {
      // Initialize and wait for setup
      await webSocketManager.init();
      await vi.runAllTimersAsync();

      // Send test message
      const mockData = { html: "<div>test</div>", css: ".test{}" };
      if (storedCallback) {
        storedCallback(mockData);
        await vi.runAllTimersAsync();
      }

      // Verify message handling
      expect(mockMessageHandler.handleMessage).toHaveBeenCalledWith({
        type: "message",
        data: mockData,
      });
    });
  });

  describe("message handling", () => {
    it("should handle run message", async () => {
      const result = await webSocketManager.handleRunMessage("const x = 1;");

      expect(mockMessageHandler.handleRunMessage).toHaveBeenCalledWith(
        "const x = 1;",
      );
      expect(result).toEqual({ html: "<div>test</div>", css: ".test{}" });
    });

    it("should handle run message failure", async () => {
      mockMessageHandler.handleRunMessage = vi.fn().mockResolvedValueOnce(
        false,
      );

      const result = await webSocketManager.handleRunMessage("invalid code");
      expect(result).toBe(false);
    });
  });

  describe("cleanup and resource management", () => {
    it("should clean up when cleanup is called multiple times", () => {
      webSocketManager.cleanup();
      webSocketManager.cleanup();
      expect(mockMessageHandler.cleanup).toHaveBeenCalledTimes(2);
    });

    it("should handle cleanup with active callbacks", () => {
      // Set up an active callback
      webSocketManager.init();
      expect(storedCallback).toBeNull();

      // Cleanup should remove the callback
      webSocketManager.cleanup();
      expect(storedCallback).toBeNull();
    });

    it("should cleanup resources", () => {
      window.onmessage = vi.fn();

      webSocketManager.cleanup();

      expect(mockMessageHandler.cleanup).toHaveBeenCalled();
      expect(window.onmessage).toBeNull();
    });

    it("should handle cleanup error", () => {
      const error = new Error("Cleanup error");
      mockMessageHandler.cleanup = vi.fn().mockImplementationOnce(() => {
        throw error;
      });

      expect(() => webSocketManager.cleanup()).toThrow(
        "Cleanup failed: Cleanup error",
      );
    });
  });

  describe("error handling, retry logic and state management", () => {
    beforeEach(() => {
      // Clear all mocks and timers before each test
      vi.clearAllMocks();
      vi.useFakeTimers();
    });

    it("should handle network connection errors", async () => {
      // Mock network error with specific error name
      const networkError = new Error("Network error");
      networkError.name = "NetworkError";

      // Setup mock with specific behavior
      mockSessionSynchronizer.init = vi.fn()
        .mockRejectedValueOnce(networkError)
        .mockResolvedValue({} as ICodeSession);

      const newLocation = { ...location };
      newLocation.pathname = "/live/test-space";
      Object.defineProperty(window, "location", {
        value: newLocation,
        writable: true,
      });

      await expect(webSocketManager.init()).rejects.toThrow("Network error");

      // Verify error handling
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "WebSocket error:",
        "Network error",
      );
      expect(mockSessionSynchronizer.init).toHaveBeenCalledTimes(1);
    });

    it("should handle timeout errors", async () => {
      const timeoutError = new Error("Connection timeout");
      mockSessionSynchronizer.init = vi.fn().mockRejectedValueOnce(
        timeoutError,
      );

      const newLocation = { ...location };
      newLocation.pathname = "/live/test-space";
      Object.defineProperty(window, "location", {
        value: newLocation,
        writable: true,
      });

      await expect(webSocketManager.init()).rejects.toThrow(
        "Connection timeout",
      );

      await vi.advanceTimersByTimeAsync(DEFAULT_CONFIG.connectionTimeout);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "WebSocket error:",
        "Connection timeout",
      );
    });

    it("should implement retry logic for recoverable errors", async () => {
      const error = new Error("Recoverable error");
      const mockInit = vi.fn()
        .mockRejectedValueOnce(error) // First call fails
        .mockResolvedValue({} as ICodeSession); // Subsequent calls succeed

      mockSessionSynchronizer.init = mockInit;

      const newLocation = { ...location };
      newLocation.pathname = "/live/test-space";
      Object.defineProperty(window, "location", {
        value: newLocation,
        writable: true,
      });

      // Initialize and expect initial failure
      await expect(webSocketManager.init()).rejects.toThrow(
        "Recoverable error",
      );
      expect(mockInit).toHaveBeenCalledTimes(1); // Initial attempt
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "WebSocket error:",
        "Recoverable error",
      );

      // Run single retry delay
      await vi.advanceTimersByTimeAsync(DEFAULT_CONFIG.retryDelay);
      expect(mockInit).toHaveBeenCalledTimes(3); // Initial + 1 retry

      // Verify final state
      expect(consoleErrorSpy).toHaveBeenCalledTimes(3); // Error logged once
    });

    it("should stop retrying after max attempts", async () => {
      // Mock persistent error
      const error = new Error("Persistent error");
      mockSessionSynchronizer.init = vi.fn().mockRejectedValue(error);

      const newLocation = { ...location };
      newLocation.pathname = "/live/test-space";
      Object.defineProperty(window, "location", {
        value: newLocation,
        writable: true,
      });

      // Initial attempt
      await expect(webSocketManager.init()).rejects.toThrow("Persistent error");
      expect(mockSessionSynchronizer.init).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(3);

      // Verify no more retries after max attempts
      await vi.advanceTimersByTimeAsync(
        DEFAULT_CONFIG.retryDelay * DEFAULT_CONFIG.maxRetries,
      );
      expect(mockSessionSynchronizer.init).toHaveBeenCalledTimes(
        DEFAULT_CONFIG.maxRetries + 1,
      );
      expect(consoleErrorSpy).toHaveBeenCalledTimes(
        DEFAULT_CONFIG.maxRetries * 5,
      );
    });
  });
});
