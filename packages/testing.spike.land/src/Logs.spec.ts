import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { KVLogger } from "./Logs.js";

type SpyInstance = ReturnType<typeof vi.spyOn>;

// Create a minimal mock that matches the actual usage in tests
const createMockKVNamespace = () => ({
  get: vi.fn().mockResolvedValue(null),
  put: vi.fn().mockResolvedValue(undefined),
  list: vi.fn().mockResolvedValue({ keys: [] }),
  delete: vi.fn().mockResolvedValue(undefined),
  getWithMetadata: vi.fn().mockResolvedValue({ value: null, metadata: null }),
});

describe("KVLogger", () => {
  let mockKVNamespace: ReturnType<typeof createMockKVNamespace>;
  let mockConsoleLog: SpyInstance;
  let mockConsoleError: SpyInstance;
  let logger: KVLogger;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-01-01T12:00:00Z"));

    // Create mock with direct type assertion
    mockKVNamespace = createMockKVNamespace();

    // Mock console methods
    mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});
    mockConsoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    // Create logger instance
    logger = new KVLogger(
      "test-prefix",
      mockKVNamespace as unknown as KVNamespace,
    );

    // Set up default mock behaviors
    mockKVNamespace.put.mockResolvedValue(undefined);
    mockKVNamespace.list.mockResolvedValue({ keys: [] });
    mockKVNamespace.get.mockResolvedValue(null);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("log method", () => {
    it("should save log entry with timestamp", async () => {
      await logger.log("Test message");

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
      await logger.log("Warning message", "warn");

      expect(mockKVNamespace.put).toHaveBeenCalledWith(
        "test-prefix:2023-01-01:12:00:00",
        JSON.stringify({ level: "warn", message: "Warning message" }),
      );
    });

    it("should handle log saving errors", async () => {
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
        .mockResolvedValueOnce(
          JSON.stringify({ level: "info", message: "Log 2" }),
        )
        .mockResolvedValueOnce(
          JSON.stringify({ level: "warn", message: "Log 1" }),
        );

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
