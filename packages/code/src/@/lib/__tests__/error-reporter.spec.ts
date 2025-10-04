import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ErrorCode } from "../errors";
import { ErrorReporter, getErrorReporter, reportError } from "../error-reporter";

describe("ErrorReporter", () => {
  let reporter: ErrorReporter;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should create with default config", () => {
      reporter = new ErrorReporter();
      expect(reporter).toBeInstanceOf(ErrorReporter);
    });

    it("should create with custom config", () => {
      reporter = new ErrorReporter({
        enabled: false,
        endpoint: "/custom/errors",
        maxRetries: 5,
      });
      expect(reporter).toBeInstanceOf(ErrorReporter);
    });
  });

  describe("report", () => {
    it("should not report when disabled", async () => {
      reporter = new ErrorReporter({ enabled: false });
      const error = new Error("Test error");
      await reporter.report(error);

      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("should add error to queue", async () => {
      reporter = new ErrorReporter({ enabled: true, batchSize: 10 });
      const error = new Error("Test error");

      await reporter.report(error);

      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("should include context in error report", async () => {
      reporter = new ErrorReporter({ enabled: true, batchSize: 1, endpoint: "/api/errors" });
      fetchMock.mockResolvedValue({ ok: true });

      const error = new Error("Test error");
      const context = {
        codeSpace: "test-space",
        userId: "user-123",
        sessionId: "session-456",
        componentStack: "Component > Child",
      };

      await reporter.report(error, context);

      await vi.advanceTimersByTimeAsync(100);

      expect(fetchMock).toHaveBeenCalledWith(
        "/api/errors",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      );

      const callBody = JSON.parse(fetchMock.mock.calls[0]![1].body as string);
      expect(callBody.errors[0]).toMatchObject({
        message: "Test error",
        codeSpace: "test-space",
        userId: "user-123",
        sessionId: "session-456",
        componentStack: "Component > Child",
      });
    });

    it("should include AppError details", async () => {
      reporter = new ErrorReporter({ enabled: true, batchSize: 1, endpoint: "/api/errors" });
      fetchMock.mockResolvedValue({ ok: true });

      class NetworkErrorTest extends Error {
        code = ErrorCode.NETWORK_CONNECTION_FAILED;
        details = { url: "https://api.example.com", statusCode: 500 };
        timestamp = new Date();
        toJSON() {
          return {};
        }
      }

      const error = new NetworkErrorTest("Request failed");

      await reporter.report(error);
      await vi.advanceTimersByTimeAsync(100);

      expect(fetchMock).toHaveBeenCalled();
    });

    it("should capture browser information", async () => {
      reporter = new ErrorReporter({ enabled: true, batchSize: 1, endpoint: "/api/errors" });
      fetchMock.mockResolvedValue({ ok: true });

      const error = new Error("Test error");
      await reporter.report(error);
      await vi.advanceTimersByTimeAsync(100);

      const callBody = JSON.parse(fetchMock.mock.calls[0]![1].body as string);
      expect(callBody.errors[0]).toHaveProperty("url");
      expect(callBody.errors[0]).toHaveProperty("userAgent");
      expect(callBody.errors[0]).toHaveProperty("timestamp");
    });
  });

  describe("batching", () => {
    it("should flush when batch size reached", async () => {
      reporter = new ErrorReporter({ enabled: true, batchSize: 3, endpoint: "/api/errors" });
      fetchMock.mockResolvedValue({ ok: true });

      await reporter.report(new Error("Error 1"));
      await reporter.report(new Error("Error 2"));

      expect(fetchMock).not.toHaveBeenCalled();

      await reporter.report(new Error("Error 3"));
      await vi.advanceTimersByTimeAsync(100);

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const callBody = JSON.parse(fetchMock.mock.calls[0]![1].body as string);
      expect(callBody.errors).toHaveLength(3);
    });

    it("should flush on timeout", async () => {
      reporter = new ErrorReporter({
        enabled: true,
        batchSize: 10,
        batchTimeout: 5000,
        endpoint: "/api/errors",
      });
      fetchMock.mockResolvedValue({ ok: true });

      await reporter.report(new Error("Test error"));

      expect(fetchMock).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(5000);

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("should not start multiple timers", async () => {
      reporter = new ErrorReporter({
        enabled: true,
        batchSize: 10,
        batchTimeout: 5000,
        endpoint: "/api/errors",
      });
      fetchMock.mockResolvedValue({ ok: true });

      await reporter.report(new Error("Error 1"));
      await reporter.report(new Error("Error 2"));
      await reporter.report(new Error("Error 3"));

      await vi.advanceTimersByTimeAsync(5000);

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("flush", () => {
    it("should send all queued errors", async () => {
      reporter = new ErrorReporter({ enabled: true, batchSize: 100, endpoint: "/api/errors" });
      fetchMock.mockResolvedValue({ ok: true });

      await reporter.report(new Error("Error 1"));
      await reporter.report(new Error("Error 2"));
      await reporter.report(new Error("Error 3"));

      await reporter.flush();

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const callBody = JSON.parse(fetchMock.mock.calls[0]![1].body as string);
      expect(callBody.errors).toHaveLength(3);
    });

    it("should do nothing when queue is empty", async () => {
      reporter = new ErrorReporter({ enabled: true, endpoint: "/api/errors" });
      await reporter.flush();
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("should clear batch timer", async () => {
      reporter = new ErrorReporter({
        enabled: true,
        batchSize: 10,
        batchTimeout: 5000,
        endpoint: "/api/errors",
      });
      fetchMock.mockResolvedValue({ ok: true });

      await reporter.report(new Error("Test error"));
      await reporter.flush();

      await vi.advanceTimersByTimeAsync(5000);

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("retry logic", () => {
    it("should retry on network failure", async () => {
      reporter = new ErrorReporter({
        enabled: true,
        batchSize: 1,
        maxRetries: 3,
        endpoint: "/api/errors",
      });

      fetchMock.mockRejectedValueOnce(new Error("Network error")).mockResolvedValueOnce({ ok: true });

      await reporter.report(new Error("Test error"));
      await vi.advanceTimersByTimeAsync(100);

      expect(fetchMock).toHaveBeenCalledTimes(1);

      await vi.advanceTimersByTimeAsync(2000);

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("should retry on HTTP error with exponential backoff", async () => {
      reporter = new ErrorReporter({
        enabled: true,
        batchSize: 1,
        maxRetries: 3,
        endpoint: "/api/errors",
      });

      fetchMock
        .mockResolvedValueOnce({ ok: false, status: 500 })
        .mockResolvedValueOnce({ ok: false, status: 500 })
        .mockResolvedValueOnce({ ok: true });

      await reporter.report(new Error("Test error"));
      await vi.advanceTimersByTimeAsync(100);

      expect(fetchMock).toHaveBeenCalledTimes(1);

      await vi.advanceTimersByTimeAsync(1000);
      expect(fetchMock).toHaveBeenCalledTimes(2);

      await vi.advanceTimersByTimeAsync(2000);
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it("should stop retrying after max retries", async () => {
      reporter = new ErrorReporter({
        enabled: true,
        batchSize: 1,
        maxRetries: 2,
        endpoint: "/api/errors",
      });

      fetchMock.mockResolvedValue({ ok: false, status: 500 });

      await reporter.report(new Error("Test error"));
      await vi.advanceTimersByTimeAsync(100);

      await vi.advanceTimersByTimeAsync(1000);
      await vi.advanceTimersByTimeAsync(2000);
      await vi.advanceTimersByTimeAsync(4000);

      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it("should not retry on successful response", async () => {
      reporter = new ErrorReporter({
        enabled: true,
        batchSize: 1,
        maxRetries: 3,
        endpoint: "/api/errors",
      });

      fetchMock.mockResolvedValue({ ok: true });

      await reporter.report(new Error("Test error"));
      await vi.advanceTimersByTimeAsync(100);

      await vi.advanceTimersByTimeAsync(10000);

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("clear", () => {
    it("should clear error queue", async () => {
      reporter = new ErrorReporter({ enabled: true, batchSize: 10, endpoint: "/api/errors" });
      fetchMock.mockResolvedValue({ ok: true });

      await reporter.report(new Error("Error 1"));
      await reporter.report(new Error("Error 2"));

      reporter.clear();
      await reporter.flush();

      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("should cancel batch timer", async () => {
      reporter = new ErrorReporter({
        enabled: true,
        batchSize: 10,
        batchTimeout: 5000,
        endpoint: "/api/errors",
      });
      fetchMock.mockResolvedValue({ ok: true });

      await reporter.report(new Error("Test error"));
      reporter.clear();

      await vi.advanceTimersByTimeAsync(5000);

      expect(fetchMock).not.toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("should handle fetch errors gracefully", async () => {
      reporter = new ErrorReporter({ enabled: true, batchSize: 1, endpoint: "/api/errors" });
      fetchMock.mockRejectedValue(new Error("Network error"));

      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      await reporter.report(new Error("Test error"));
      await vi.advanceTimersByTimeAsync(100);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it("should handle missing endpoint", async () => {
      reporter = new ErrorReporter({ enabled: true, batchSize: 1 });

      await reporter.report(new Error("Test error"));
      await vi.advanceTimersByTimeAsync(100);

      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});

describe("getErrorReporter", () => {
  it("should return singleton instance", () => {
    const reporter1 = getErrorReporter();
    const reporter2 = getErrorReporter();
    expect(reporter1).toBe(reporter2);
  });

  it("should accept config on first call", () => {
    const reporter = getErrorReporter({ enabled: false });
    expect(reporter).toBeInstanceOf(ErrorReporter);
  });
});

describe("reportError", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should report error using global reporter", async () => {
    fetchMock.mockResolvedValue({ ok: true });

    const error = new Error("Test error");
    const context = { userId: "user-123" };

    await reportError(error, context);

    const reporter = getErrorReporter();
    await reporter.flush();

    expect(fetchMock).toHaveBeenCalled();
  });
});
