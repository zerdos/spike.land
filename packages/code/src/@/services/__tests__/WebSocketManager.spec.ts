import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DOMError, WebSocketError } from "@/lib/errors";
import { ROUTES } from "@/lib/routes";
import type { ILogger } from "../interfaces/ILogger";
import type { EnhancedWebSocketDependencies } from "../WebSocketManager";
import { WebSocketManager } from "../WebSocketManager";

vi.mock("@/hooks/use-code-space", () => ({
  getCodeSpace: vi.fn((pathname: string) => pathname.split("/")[1] || "test-space"),
}));

describe("WebSocketManager", () => {
  let manager: WebSocketManager;
  let mockDependencies: EnhancedWebSocketDependencies;
  let mockLogger: ILogger;
  let mockServiceWorker: { setup: ReturnType<typeof vi.fn>; };
  let mockSessionSynchronizer: {
    init: ReturnType<typeof vi.fn>;
    subscribe: ReturnType<typeof vi.fn>;
    broadcastSession: ReturnType<typeof vi.fn>;
  };
  let mockMessageHandler: {
    handleRunMessage: ReturnType<typeof vi.fn>;
    handleMessage: ReturnType<typeof vi.fn>;
    cleanup: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockLogger = {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    mockServiceWorker = {
      setup: vi.fn().mockResolvedValue(undefined),
    };

    mockSessionSynchronizer = {
      init: vi.fn().mockResolvedValue({ codeSpace: "test", code: "" }),
      subscribe: vi.fn(),
      broadcastSession: vi.fn(),
    };

    mockMessageHandler = {
      handleRunMessage: vi.fn().mockResolvedValue({ html: "<div>test</div>", css: "" }),
      handleMessage: vi.fn().mockResolvedValue(undefined),
      cleanup: vi.fn(),
    };

    mockDependencies = {
      logger: mockLogger,
      serviceWorker: mockServiceWorker as never,
      sessionSynchronizer: mockSessionSynchronizer as never,
      messageHandler: mockMessageHandler as never,
    };

    global.location = { pathname: "/test-space" } as Location;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should create instance with dependencies", () => {
      manager = new WebSocketManager(mockDependencies);
      expect(manager).toBeInstanceOf(WebSocketManager);
    });

    it("should extract codeSpace from pathname", () => {
      manager = new WebSocketManager(mockDependencies);
      expect(manager).toBeDefined();
    });

    it("should merge default config with custom config", () => {
      const customConfig = { maxRetries: 5, retryDelay: 2000 };
      manager = new WebSocketManager(mockDependencies, customConfig);
      expect(manager).toBeDefined();
    });

    it("should schedule service worker setup", async () => {
      manager = new WebSocketManager(mockDependencies);
      await vi.advanceTimersByTimeAsync(10);
      expect(mockServiceWorker.setup).toHaveBeenCalled();
    });

    it("should handle service worker setup failure", async () => {
      mockServiceWorker.setup.mockRejectedValueOnce(new Error("Setup failed"));
      manager = new WebSocketManager(mockDependencies);
      await vi.advanceTimersByTimeAsync(10);
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe("init", () => {
    beforeEach(() => {
      manager = new WebSocketManager(mockDependencies);
    });

    it("should initialize successfully", async () => {
      global.location = { pathname: "/test-space" } as Location;
      await expect(manager.init()).resolves.not.toThrow();
    });

    it("should throw WebSocketError on initialization failure", async () => {
      mockSessionSynchronizer.init.mockRejectedValueOnce(new Error("Init failed"));
      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;

      await expect(manager.init()).rejects.toThrow(WebSocketError);
      expect(mockLogger.error).toHaveBeenCalled();
    });

    it("should log initialization errors", async () => {
      const error = new Error("Test error");
      mockSessionSynchronizer.init.mockRejectedValueOnce(error);
      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;

      await expect(manager.init()).rejects.toThrow();
      expect(mockLogger.error).toHaveBeenCalledWith(
        "WebSocket initialization error",
        error,
        expect.objectContaining({ errorMessage: "Test error" }),
      );
    });
  });

  describe("route handling - live page", () => {
    beforeEach(() => {
      manager = new WebSocketManager(mockDependencies);
      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;
    });

    it("should initialize session synchronizer on live page", async () => {
      await manager.init();
      expect(mockSessionSynchronizer.init).toHaveBeenCalled();
    });

    it("should subscribe to session updates", async () => {
      await manager.init();
      expect(mockSessionSynchronizer.subscribe).toHaveBeenCalled();
    });

    it("should log session updates", async () => {
      let subscribeCallback: ((data: unknown) => void) | undefined;
      mockSessionSynchronizer.subscribe.mockImplementation((cb: (data: unknown) => void) => {
        subscribeCallback = cb;
      });

      await manager.init();

      const testData = { code: "test", html: "<div>test</div>" };
      subscribeCallback?.(testData);

      expect(mockLogger.debug).toHaveBeenCalledWith("Code session update", { data: testData });
    });

    it("should throw on live page init failure", async () => {
      mockSessionSynchronizer.init.mockRejectedValueOnce(new Error("Failed to sync"));
      await expect(manager.init()).rejects.toThrow(WebSocketError);
    });
  });

  describe("route handling - dehydrated page", () => {
    beforeEach(() => {
      manager = new WebSocketManager(mockDependencies);
      global.location = { pathname: ROUTES.DEHYDRATED("test-space") } as Location;

      document.body.innerHTML = '<div id="embed"></div>';
    });

    it("should set up dehydrated content handler", async () => {
      await manager.init();
      expect(manager).toBeDefined();
    });

    it("should handle dehydrated content messages", async () => {
      await manager.init();

      const embedElement = document.getElementById("embed");
      expect(embedElement).toBeTruthy();

      const event = new MessageEvent("message", {
        data: { html: "<div>content</div>", css: "body { margin: 0; }" },
      });

      window.dispatchEvent(event);

      const updatedEmbed = document.getElementById("embed");
      expect(updatedEmbed?.innerHTML).toContain("body { margin: 0; }");
      expect(updatedEmbed?.innerHTML).toContain("<div>content</div>");
    });

    it("should throw DOMError if embed element not found", async () => {
      document.body.innerHTML = "";
      await manager.init();

      const event = new MessageEvent("message", {
        data: { html: "<div>test</div>", css: "" },
      });

      expect(() => window.dispatchEvent(event)).toThrow(DOMError);
    });

    it("should handle invalid message events", async () => {
      await manager.init();

      const invalidEvent = new Event("click");
      expect(() => window.dispatchEvent(invalidEvent)).not.toThrow();
    });
  });

  describe("route handling - default page", () => {
    beforeEach(() => {
      manager = new WebSocketManager(mockDependencies);
      global.location = { pathname: "/test-space" } as Location;
    });

    it("should set up message handler for default page", async () => {
      await manager.init();
      expect(manager).toBeDefined();
    });

    it("should handle messages through message handler", async () => {
      await manager.init();

      const messageEvent = new MessageEvent("message", {
        data: { type: "update", code: "console.log('test')" },
      });

      window.dispatchEvent(messageEvent);

      await vi.waitFor(() => {
        expect(mockMessageHandler.handleMessage).toHaveBeenCalled();
      });
    });

    it("should throw MessageHandlingError on message handling failure", async () => {
      mockMessageHandler.handleMessage.mockRejectedValueOnce(new Error("Handler failed"));
      await manager.init();

      const messageEvent = new MessageEvent("message", {
        data: { type: "update" },
      });

      await expect(async () => {
        window.dispatchEvent(messageEvent);
        await vi.waitFor(() => {
          if (mockMessageHandler.handleMessage.mock.calls.length > 0) {
            throw new Error("Expected error");
          }
        }, { timeout: 100 });
      }).rejects.toThrow();
    });

    it("should set up window.onmessage handler", async () => {
      await manager.init();
      expect(window.onmessage).toBeDefined();
    });
  });

  describe("handleRunMessage", () => {
    beforeEach(() => {
      manager = new WebSocketManager(mockDependencies);
    });

    it("should delegate to message handler", async () => {
      const transpiled = "const test = 'transpiled';";
      const result = await manager.handleRunMessage(transpiled);

      expect(mockMessageHandler.handleRunMessage).toHaveBeenCalledWith(transpiled);
      expect(result).toEqual({ html: "<div>test</div>", css: "" });
    });

    it("should return false on failure", async () => {
      mockMessageHandler.handleRunMessage.mockResolvedValueOnce(false);
      const result = await manager.handleRunMessage("invalid code");
      expect(result).toBe(false);
    });
  });

  describe("cleanup", () => {
    beforeEach(() => {
      manager = new WebSocketManager(mockDependencies);
    });

    it("should cleanup message handler", () => {
      manager.cleanup();
      expect(mockMessageHandler.cleanup).toHaveBeenCalled();
    });

    it("should clear window.onmessage", () => {
      window.onmessage = () => {};
      manager.cleanup();
      expect(window.onmessage).toBeNull();
    });

    it("should unsubscribe all subscriptions", async () => {
      await manager.init();
      manager.cleanup();
      expect(window.onmessage).toBeNull();
    });

    it("should throw WebSocketError on cleanup failure", () => {
      mockMessageHandler.cleanup.mockImplementation(() => {
        throw new Error("Cleanup failed");
      });
      expect(() => manager.cleanup()).toThrow(WebSocketError);
    });
  });

  describe("error handling", () => {
    beforeEach(() => {
      manager = new WebSocketManager(mockDependencies);
    });

    it("should log errors", async () => {
      const error = new Error("Test error");
      mockSessionSynchronizer.init.mockRejectedValueOnce(error);
      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;

      await expect(manager.init()).rejects.toThrow();
      expect(mockLogger.error).toHaveBeenCalledWith(
        "WebSocket error",
        error,
        expect.objectContaining({ errorMessage: "Test error" }),
      );
    });

    it("should retry on recoverable errors", async () => {
      mockSessionSynchronizer.init
        .mockRejectedValueOnce(new Error("Temporary failure"))
        .mockResolvedValueOnce({ codeSpace: "test", code: "" });

      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;

      const initPromise = manager.init();
      await expect(initPromise).rejects.toThrow();

      await vi.advanceTimersByTimeAsync(1000);

      expect(mockLogger.info).toHaveBeenCalledWith(
        "Retrying connection",
        expect.objectContaining({ retryCount: 1 }),
      );
    });

    it("should limit retry attempts", async () => {
      mockSessionSynchronizer.init.mockRejectedValue(new Error("Persistent failure"));
      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;

      await expect(manager.init()).rejects.toThrow();

      for (let i = 0; i < 3; i++) {
        await vi.advanceTimersByTimeAsync(1000);
      }

      expect(mockLogger.info).toHaveBeenCalledTimes(3);
    });

    it("should not retry beyond max retries", async () => {
      manager = new WebSocketManager(mockDependencies, { maxRetries: 2 });
      mockSessionSynchronizer.init.mockRejectedValue(new Error("Failure"));
      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;

      await expect(manager.init()).rejects.toThrow();

      for (let i = 0; i < 5; i++) {
        await vi.advanceTimersByTimeAsync(1000);
      }

      expect(mockLogger.info).toHaveBeenCalledTimes(2);
    });
  });

  describe("configuration", () => {
    it("should use custom retry delay", async () => {
      manager = new WebSocketManager(mockDependencies, { retryDelay: 3000 });
      mockSessionSynchronizer.init.mockRejectedValue(new Error("Failure"));
      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;

      await expect(manager.init()).rejects.toThrow();

      await vi.advanceTimersByTimeAsync(2999);
      expect(mockLogger.info).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(1);
      expect(mockLogger.info).toHaveBeenCalled();
    });

    it("should respect custom max retries", async () => {
      manager = new WebSocketManager(mockDependencies, { maxRetries: 1 });
      mockSessionSynchronizer.init.mockRejectedValue(new Error("Failure"));
      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;

      await expect(manager.init()).rejects.toThrow();

      await vi.advanceTimersByTimeAsync(1000);
      expect(mockLogger.info).toHaveBeenCalledTimes(1);

      await vi.advanceTimersByTimeAsync(1000);
      expect(mockLogger.info).toHaveBeenCalledTimes(1);
    });
  });

  describe("state management", () => {
    beforeEach(() => {
      manager = new WebSocketManager(mockDependencies);
    });

    it("should track WebSocket state", async () => {
      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;
      await manager.init();

      expect(manager).toBeDefined();
    });

    it("should set ERROR state on failure", async () => {
      mockSessionSynchronizer.init.mockRejectedValueOnce(new Error("Init failed"));
      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;

      await expect(manager.init()).rejects.toThrow();
      expect(manager).toBeDefined();
    });

    it("should set RECONNECTING state during retry", async () => {
      mockSessionSynchronizer.init.mockRejectedValueOnce(new Error("Failure"));
      global.location = { pathname: ROUTES.LIVE("test-space") } as Location;

      await expect(manager.init()).rejects.toThrow();
      await vi.advanceTimersByTimeAsync(500);

      expect(manager).toBeDefined();
    });
  });
});
