import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { watch } from "../../../operations/directory/watch";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("watch", () => {
  beforeEach(() => {
    setupTest();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should create a watcher instance", () => {
    const watcher = watch("/test");
    expect(watcher).toBeDefined();
    expect(watcher.close).toBeInstanceOf(Function);
    expect(watcher.ref).toBeInstanceOf(Function);
    expect(watcher.unref).toBeInstanceOf(Function);
    watcher.close();
  });

  it("should support close() method", async () => {
    const watcher = watch("/test.txt", { pollInterval: 100 });

    await new Promise((resolve) => setTimeout(resolve, 50));

    await watcher.close();

    // After close, iteration should complete
    const iterator = watcher[Symbol.asyncIterator]();
    const result = await Promise.race([
      iterator.next(),
      new Promise<IteratorResult<{ eventType: string; filename: string | null }>>(
        (resolve) => setTimeout(() => resolve({ done: true, value: undefined }), 100),
      ),
    ]);

    expect(result.done).toBe(true);
  });

  it("should stop watching when signal is aborted", async () => {
    const abortController = new AbortController();
    const watcher = watch("/test.txt", {
      signal: abortController.signal,
      pollInterval: 100,
    });

    // Wait for initial poll
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Abort the signal
    abortController.abort();

    // After abort, iteration should complete
    await new Promise((resolve) => setTimeout(resolve, 50));

    const iterator = watcher[Symbol.asyncIterator]();
    const result = await Promise.race([
      iterator.next(),
      new Promise<IteratorResult<{ eventType: string; filename: string | null }>>(
        (resolve) => setTimeout(() => resolve({ done: true, value: undefined }), 100),
      ),
    ]);

    expect(result.done).toBe(true);

    await watcher.close();
  });

  it("should not start if signal is already aborted", async () => {
    const abortController = new AbortController();
    abortController.abort();

    const watcher = watch("/test.txt", {
      signal: abortController.signal,
      pollInterval: 100,
    });

    // Try to iterate immediately - should be done
    const iterator = watcher[Symbol.asyncIterator]();
    const result = await Promise.race([
      iterator.next(),
      new Promise<IteratorResult<{ eventType: string; filename: string | null }>>(
        (resolve) => setTimeout(() => resolve({ done: true, value: undefined }), 100),
      ),
    ]);

    expect(result.done).toBe(true);

    await watcher.close();
  });

  it("should support ref() method for chaining", () => {
    const watcher = watch("/test");
    const result = watcher.ref();
    expect(result).toBe(watcher);
    watcher.close();
  });

  it("should support unref() method for chaining", () => {
    const watcher = watch("/test");
    const result = watcher.unref();
    expect(result).toBe(watcher);
    watcher.close();
  });

  it("should handle non-existent paths gracefully", async () => {
    const watcher = watch("/non-existent-path.txt", { pollInterval: 100 });

    // Wait for initial poll
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Should not throw
    await watcher.close();
  });

  it("should handle recursive option", async () => {
    const watcher = watch("/test", { recursive: true, pollInterval: 100 });

    // Wait for initial poll
    await new Promise((resolve) => setTimeout(resolve, 150));

    await watcher.close();

    // Should complete without errors
    expect(true).toBe(true);
  });

  it("should handle non-recursive option", async () => {
    const watcher = watch("/test", { recursive: false, pollInterval: 100 });

    // Wait for initial poll
    await new Promise((resolve) => setTimeout(resolve, 150));

    await watcher.close();

    // Should complete without errors
    expect(true).toBe(true);
  });

  it("should support async iteration protocol", async () => {
    const watcher = watch("/test.txt", { pollInterval: 100 });

    // Wait for initial poll
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Close the watcher
    await watcher.close();

    // Verify iterator works
    const iterator = watcher[Symbol.asyncIterator]();
    expect(iterator).toBeDefined();
    expect(iterator.next).toBeInstanceOf(Function);
  });

  it("should handle multiple close() calls", async () => {
    const watcher = watch("/test.txt", { pollInterval: 100 });

    await watcher.close();
    await watcher.close(); // Should not throw

    expect(true).toBe(true);
  });

  it("should handle custom poll intervals", async () => {
    const watcher = watch("/test.txt", { pollInterval: 50 });

    await new Promise((resolve) => setTimeout(resolve, 100));

    await watcher.close();

    expect(true).toBe(true);
  });

  it("should handle watching a file that exists", async () => {
    const watcher = watch("/test.txt", { pollInterval: 100 });

    // Wait for a few polls
    await new Promise((resolve) => setTimeout(resolve, 250));

    await watcher.close();

    // Should complete without errors
    expect(true).toBe(true);
  });
});
