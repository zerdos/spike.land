import type { KVNamespace } from "@cloudflare/workers-types";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import { KVLogger } from "./Logs";

class MockDate extends Date {
  constructor() {
    super("2023-01-01T12:00:00Z");
  }

  toISOString() {
    return "2023-01-01T12:00:00.000Z";
  }
}

type SpyInstance = ReturnType<typeof vi.spyOn>;

describe("KVLogger", () => {
  let mockKVNamespace: {
    get: Mock;
    put: Mock;
    list: Mock;
  };
  let mockConsoleLog: SpyInstance;
  let mockConsoleError: SpyInstance;
  let logger: KVLogger;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Mock global Date
    const originalDate = global.Date;
    const mockDate = vi.fn(() => new MockDate());
    mockDate.prototype = MockDate.prototype;
    global.Date = mockDate as unknown as DateConstructor;

    // Restore after test
    afterEach(() => {
      global.Date = originalDate;
    });

    // Mock KVNamespace
    mockKVNamespace = {
      get: vi.fn(),
      put: vi.fn(),
      list: vi.fn(),
    };

    // Mock console methods
    mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => { });
    mockConsoleError = vi.spyOn(console, "error").mockImplementation(() => { });

    // Create logger instance
    logger = new KVLogger("test-prefix", mockKVNamespace as unknown as KVNamespace);

    // Set up default mock behaviors
    mockKVNamespace.get.mockImplementation((key: string) => {
      if (key === "test-prefix:counter") return "0";
      return null;
    });
    mockKVNamespace.put.mockResolvedValue(undefined);
    mockKVNamespace.list.mockResolvedValue({ keys: [] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("log method", () => {
    it("should save log entry with timestamp", async () => {
      // Use vi.setSystemTime for consistent date
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2023-01-01T12:00:00Z"));

      await logger.log("Test message");

      // Restore real timers after test
      vi.useRealTimers();

      // Verify log entry saved with timestamp in key
      expect(mockKVNamespace.put).toHaveBeenCalledWith(
        "test-prefix:2023-01-01:12:00:00",
        JSON.stringify({ level: "info", message: "Test message" }),
      );

      expect(mockConsoleLog).toHaveBeenCalledWith(
        "Log entry saved: test-prefix:2023-01-01:12:00:00",
      );
    });

    it("should handle different log levels", async () => {
      // Use vi.setSystemTime for consistent date
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2023-01-01T12:00:00Z"));

      await logger.log("Warning message", "warn");

      // Restore real timers after test
      vi.useRealTimers();

      expect(mockKVNamespace.put).toHaveBeenCalledWith(
        "test-prefix:2023-01-01:12:00:00",
        JSON.stringify({ level: "warn", message: "Warning message" }),
      );
    });

    it("should handle log saving errors", async () => {
      // Use vi.setSystemTime for consistent date
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2023-01-01T12:00:00Z"));

      // Simulate put method throwing an error
      mockKVNamespace.put.mockRejectedValueOnce(new Error("Storage error"));

      await logger.log("Error log");

      // Verify error is logged to console
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Failed to save log entry:",
        expect.any(Error),
      );
    });
  });

  describe("getLogs method", () => {
    it("should retrieve and sort logs for a specific date", async () => {
      // Mock list and get methods to return sample logs
      mockKVNamespace.list.mockResolvedValue({
        keys: [
          { name: "test-prefix:2023-01-01:10:30:00" },
          { name: "test-prefix:2023-01-01:09:15:00" },
        ],
      });

      mockKVNamespace.get
        .mockResolvedValueOnce(JSON.stringify({ level: "info", message: "Log 2" }))
        .mockResolvedValueOnce(JSON.stringify({ level: "warn", message: "Log 1" }));

      const logs = await logger.getLogs("2023-01-01");

      expect(logs).toEqual([
        {
          timestamp: "2023-01-01T09:15:00",
          level: "warn",
          message: "Log 1",
        },
        {
          timestamp: "2023-01-01T10:30:00",
          level: "info",
          message: "Log 2",
        },
      ]);
    });

    it("should handle empty log list", async () => {
      const logs = await logger.getLogs("2023-01-02");

      expect(logs).toEqual([]);
    });

    it("should handle log retrieval errors", async () => {
      // Simulate list method throwing an error
      mockKVNamespace.list.mockRejectedValueOnce(new Error("Retrieval error"));

      const logs = await logger.getLogs("2023-01-03");

      // Verify error is logged and empty array is returned
      expect(mockConsoleError).toHaveBeenCalledWith(
        "Failed to retrieve logs:",
        expect.any(Error),
      );
      expect(logs).toEqual([]);
    });
  });
});
