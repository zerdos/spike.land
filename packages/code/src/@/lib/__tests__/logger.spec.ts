import { beforeEach, describe, expect, it, vi } from "vitest";
import { debug, error, info, logger, LogLevel, warn } from "../logger";

describe("Logger", () => {
  let consoleSpy: {
    log: ReturnType<typeof vi.spyOn>;
  };

  beforeEach(() => {
    consoleSpy = {
      log: vi.spyOn(console, "log").mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    consoleSpy.log.mockRestore();
  });

  describe("LogLevel", () => {
    it("should have correct numeric values", () => {
      expect(LogLevel.DEBUG).toBe(0);
      expect(LogLevel.INFO).toBe(1);
      expect(LogLevel.WARN).toBe(2);
      expect(LogLevel.ERROR).toBe(3);
    });
  });

  describe("setLevel", () => {
    it("should change minimum log level", () => {
      logger.setLevel(LogLevel.WARN);
      logger.info("Should not log");
      expect(consoleSpy.log).not.toHaveBeenCalled();

      logger.warn("Should log");
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it("should filter debug messages when level is INFO", () => {
      logger.setLevel(LogLevel.INFO);
      logger.debug("Debug message");
      expect(consoleSpy.log).not.toHaveBeenCalled();

      logger.info("Info message");
      expect(consoleSpy.log).toHaveBeenCalled();
    });
  });

  describe("debug", () => {
    beforeEach(() => {
      logger.setLevel(LogLevel.DEBUG);
    });

    it("should log debug messages", () => {
      logger.debug("Debug message");
      expect(consoleSpy.log).toHaveBeenCalled();
      const call = consoleSpy.log.mock.calls[0]![0];
      expect(call).toContain("DEBUG");
      expect(call).toContain("Debug message");
    });

    it("should log debug with context", () => {
      logger.debug("Debug message", { userId: "123", action: "click" });
      expect(consoleSpy.log).toHaveBeenCalled();
      const contextArg = consoleSpy.log.mock.calls[0]![2];
      expect(contextArg).toEqual({ userId: "123", action: "click" });
    });

    it("should not log when level is higher than DEBUG", () => {
      logger.setLevel(LogLevel.INFO);
      logger.debug("Should not log");
      expect(consoleSpy.log).not.toHaveBeenCalled();
    });
  });

  describe("info", () => {
    beforeEach(() => {
      logger.setLevel(LogLevel.DEBUG);
    });

    it("should log info messages", () => {
      logger.info("Info message");
      expect(consoleSpy.log).toHaveBeenCalled();
      const call = consoleSpy.log.mock.calls[0]![0];
      expect(call).toContain("INFO");
      expect(call).toContain("Info message");
    });

    it("should log info with context", () => {
      logger.info("Operation completed", { duration: 150, status: "success" });
      expect(consoleSpy.log).toHaveBeenCalled();
      const contextArg = consoleSpy.log.mock.calls[0]![2];
      expect(contextArg).toEqual({ duration: 150, status: "success" });
    });
  });

  describe("warn", () => {
    beforeEach(() => {
      logger.setLevel(LogLevel.DEBUG);
    });

    it("should log warning messages", () => {
      logger.warn("Warning message");
      expect(consoleSpy.log).toHaveBeenCalled();
      const call = consoleSpy.log.mock.calls[0]![0];
      expect(call).toContain("WARN");
      expect(call).toContain("Warning message");
    });

    it("should log warn with context", () => {
      logger.warn("Deprecated API used", { api: "oldMethod", replacement: "newMethod" });
      expect(consoleSpy.log).toHaveBeenCalled();
      const contextArg = consoleSpy.log.mock.calls[0]![2];
      expect(contextArg).toEqual({ api: "oldMethod", replacement: "newMethod" });
    });
  });

  describe("error", () => {
    beforeEach(() => {
      logger.setLevel(LogLevel.DEBUG);
    });

    it("should log error messages", () => {
      logger.error("Error message");
      expect(consoleSpy.log).toHaveBeenCalled();
      const call = consoleSpy.log.mock.calls[0]![0];
      expect(call).toContain("ERROR");
      expect(call).toContain("Error message");
    });

    it("should log error with Error object", () => {
      const error = new Error("Test error");
      logger.error("Operation failed", error);
      expect(consoleSpy.log).toHaveBeenCalled();
      const contextArg = consoleSpy.log.mock.calls[0]![2] as Record<string, unknown>;
      expect(contextArg["error"]).toBeDefined();
      expect(contextArg["error"]).toHaveProperty("name", "Error");
      expect(contextArg["error"]).toHaveProperty("message", "Test error");
    });

    it("should include stack trace in development", () => {
      const error = new Error("Test error");
      error.stack = "Error: Test error\n    at test.ts:1:1";
      logger.error("Stack trace test", error);

      const contextArg = consoleSpy.log.mock.calls[0]![2] as Record<string, unknown>;
      expect(contextArg["error"]).toHaveProperty("stack");
    });

    it("should log error with additional context", () => {
      const error = new Error("Network error");
      logger.error("Request failed", error, { url: "/api/data", method: "GET" });
      const contextArg = consoleSpy.log.mock.calls[0]![2] as Record<string, unknown>;
      expect(contextArg["url"]).toBe("/api/data");
      expect(contextArg["method"]).toBe("GET");
    });

    it("should handle non-Error error objects", () => {
      logger.error("String error", "Something went wrong");
      const contextArg = consoleSpy.log.mock.calls[0]![2] as Record<string, unknown>;
      expect(contextArg["error"]).toBe("Something went wrong");
    });

    it("should handle error objects without Error instance", () => {
      logger.error("Custom error", { code: 500, message: "Internal error" });
      const contextArg = consoleSpy.log.mock.calls[0]![2] as Record<string, unknown>;
      expect(contextArg["error"]).toEqual({ code: 500, message: "Internal error" });
    });
  });

  describe("timestamp formatting", () => {
    it("should include ISO timestamp", () => {
      logger.info("Test message");
      const call = consoleSpy.log.mock.calls[0]![0];
      expect(call).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
    });
  });

  describe("child logger", () => {
    it("should create child logger with default context", () => {
      const childLogger = logger.child({ component: "TestComponent", id: "123" });
      childLogger.info("Child log");

      expect(consoleSpy.log).toHaveBeenCalled();
      const contextArg = consoleSpy.log.mock.calls[0]![2];
      expect(contextArg).toMatchObject({ component: "TestComponent", id: "123" });
    });

    it("should merge child context with log context", () => {
      const childLogger = logger.child({ component: "TestComponent" });
      childLogger.info("Child log", { action: "click" });

      const contextArg = consoleSpy.log.mock.calls[0]![2];
      expect(contextArg).toMatchObject({ component: "TestComponent", action: "click" });
    });

    it("should allow log context to override default context", () => {
      const childLogger = logger.child({ value: "default" });
      childLogger.info("Test", { value: "override" });

      const contextArg = consoleSpy.log.mock.calls[0]![2] as Record<string, unknown>;
      expect(contextArg["value"]).toBe("override");
    });

    it("should inherit log level from parent", () => {
      logger.setLevel(LogLevel.WARN);
      const childLogger = logger.child({ component: "Child" });

      childLogger.info("Should not log");
      expect(consoleSpy.log).not.toHaveBeenCalled();

      childLogger.warn("Should log");
      expect(consoleSpy.log).toHaveBeenCalled();
    });
  });

  describe("context handling", () => {
    beforeEach(() => {
      logger.setLevel(LogLevel.DEBUG);
    });

    it("should handle undefined context", () => {
      logger.info("No context");
      expect(consoleSpy.log).toHaveBeenCalled();
      expect(consoleSpy.log.mock.calls[0].length).toBeGreaterThanOrEqual(2);
    });

    it("should handle empty context object", () => {
      logger.info("Empty context", {});
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it("should handle complex nested context", () => {
      const context = {
        user: { id: "123", name: "Test User" },
        metadata: { timestamp: Date.now(), version: "1.0.0" },
        tags: ["important", "user-action"],
      };
      logger.info("Complex context", context);
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it("should handle context with null and undefined values", () => {
      logger.info("Null/undefined context", { nullValue: null, undefinedValue: undefined });
      expect(consoleSpy.log).toHaveBeenCalled();
    });
  });

  describe("production mode", () => {
    it("should log in production mode", () => {
      logger.setLevel(LogLevel.DEBUG);
      const productionLogger = logger.child({});

      productionLogger.info("Production log", { key: "value" });

      expect(consoleSpy.log).toHaveBeenCalled();
    });
  });

  describe("convenience functions", () => {
    it("should export debug function", () => {
      logger.setLevel(LogLevel.DEBUG);
      debug("Debug via function");
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it("should export info function", () => {
      info("Info via function");
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it("should export warn function", () => {
      warn("Warn via function");
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it("should export error function", () => {
      error("Error via function");
      expect(consoleSpy.log).toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should handle very long messages", () => {
      const longMessage = "A".repeat(10000);
      logger.info(longMessage);
      expect(consoleSpy.log).toHaveBeenCalled();
      const call = consoleSpy.log.mock.calls[0]![0];
      expect(call).toContain(longMessage);
    });

    it("should handle special characters in messages", () => {
      logger.info("Special chars: \n\t\r\0");
      expect(consoleSpy.log).toHaveBeenCalled();
    });

    it("should handle Unicode in messages", () => {
      logger.info("Unicode: 你好 🌍 مرحبا");
      expect(consoleSpy.log).toHaveBeenCalled();
      const call = consoleSpy.log.mock.calls[0]![0];
      expect(call).toContain("Unicode: 你好 🌍 مرحبا");
    });

    it("should handle circular references in context", () => {
      const circular: Record<string, unknown> = { key: "value" };
      circular["self"] = circular;

      expect(() => {
        logger.info("Circular reference", circular);
      }).not.toThrow();
    });
  });
});
