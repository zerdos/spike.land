import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import type { BigIntStatsFs, StatsFs } from "../../../operations/directory/statfs";
import { statfs } from "../../../operations/directory/statfs";
import { setupTest } from "../../setup";

describe("statfs", () => {
  const originalNavigator = globalThis.navigator;

  beforeEach(() => {
    setupTest();
  });

  afterEach(() => {
    Object.defineProperty(globalThis, "navigator", {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it("should return filesystem statistics with default options", async () => {
    const mockEstimate = vi.fn().mockResolvedValue({
      quota: 1024 * 1024 * 1024,
      usage: 512 * 1024 * 1024,
    });

    Object.defineProperty(globalThis, "navigator", {
      value: {
        storage: {
          estimate: mockEstimate,
        },
      },
      writable: true,
      configurable: true,
    });

    const stats = await statfs("/") as StatsFs;

    expect(mockEstimate).toHaveBeenCalledOnce();
    expect(stats).toEqual({
      type: 0,
      bsize: 4096,
      blocks: 262144,
      bfree: 131072,
      bavail: 131072,
      files: 0,
      ffree: 0,
    });
    expect(typeof stats.type).toBe("number");
    expect(typeof stats.bsize).toBe("number");
    expect(typeof stats.blocks).toBe("number");
  });

  it("should return bigint statistics when bigint option is true", async () => {
    const mockEstimate = vi.fn().mockResolvedValue({
      quota: 1024 * 1024 * 1024,
      usage: 512 * 1024 * 1024,
    });

    Object.defineProperty(globalThis, "navigator", {
      value: {
        storage: {
          estimate: mockEstimate,
        },
      },
      writable: true,
      configurable: true,
    });

    const stats = await statfs("/", { bigint: true }) as BigIntStatsFs;

    expect(mockEstimate).toHaveBeenCalledOnce();
    expect(stats).toEqual({
      type: 0n,
      bsize: 4096n,
      blocks: 262144n,
      bfree: 131072n,
      bavail: 131072n,
      files: 0n,
      ffree: 0n,
    });
    expect(typeof stats.type).toBe("bigint");
    expect(typeof stats.bsize).toBe("bigint");
    expect(typeof stats.blocks).toBe("bigint");
  });

  it("should handle zero usage", async () => {
    const mockEstimate = vi.fn().mockResolvedValue({
      quota: 1024 * 1024 * 100,
      usage: 0,
    });

    Object.defineProperty(globalThis, "navigator", {
      value: {
        storage: {
          estimate: mockEstimate,
        },
      },
      writable: true,
      configurable: true,
    });

    const stats = await statfs("/") as StatsFs;

    expect(stats.blocks).toBe(25600);
    expect(stats.bfree).toBe(25600);
    expect(stats.bavail).toBe(25600);
  });

  it("should handle full storage", async () => {
    const mockEstimate = vi.fn().mockResolvedValue({
      quota: 1024 * 1024 * 100,
      usage: 1024 * 1024 * 100,
    });

    Object.defineProperty(globalThis, "navigator", {
      value: {
        storage: {
          estimate: mockEstimate,
        },
      },
      writable: true,
      configurable: true,
    });

    const stats = await statfs("/") as StatsFs;

    expect(stats.blocks).toBe(25600);
    expect(stats.bfree).toBe(0);
    expect(stats.bavail).toBe(0);
  });

  it("should handle missing quota value", async () => {
    const mockEstimate = vi.fn().mockResolvedValue({
      usage: 1024,
    });

    Object.defineProperty(globalThis, "navigator", {
      value: {
        storage: {
          estimate: mockEstimate,
        },
      },
      writable: true,
      configurable: true,
    });

    const stats = await statfs("/") as StatsFs;

    expect(stats.blocks).toBe(0);
    expect(stats.bfree).toBe(0);
    expect(stats.bavail).toBe(0);
  });

  it("should handle missing usage value", async () => {
    const mockEstimate = vi.fn().mockResolvedValue({
      quota: 1024 * 1024,
    });

    Object.defineProperty(globalThis, "navigator", {
      value: {
        storage: {
          estimate: mockEstimate,
        },
      },
      writable: true,
      configurable: true,
    });

    const stats = await statfs("/") as StatsFs;

    expect(stats.blocks).toBe(256);
    expect(stats.bfree).toBe(256);
    expect(stats.bavail).toBe(256);
  });

  it("should throw error when Storage API is not available", async () => {
    Object.defineProperty(globalThis, "navigator", {
      value: {},
      writable: true,
      configurable: true,
    });

    await expect(statfs("/")).rejects.toThrow("OPFS adapter: Storage API is not available");
  });

  it("should throw error when navigator is not available", async () => {
    Object.defineProperty(globalThis, "navigator", {
      value: undefined,
      writable: true,
      configurable: true,
    });

    await expect(statfs("/")).rejects.toThrow("OPFS adapter: Storage API is not available");
  });

  it("should ignore the path parameter", async () => {
    const mockEstimate = vi.fn().mockResolvedValue({
      quota: 1024 * 1024,
      usage: 512 * 1024,
    });

    Object.defineProperty(globalThis, "navigator", {
      value: {
        storage: {
          estimate: mockEstimate,
        },
      },
      writable: true,
      configurable: true,
    });

    const stats1 = await statfs("/");
    const stats2 = await statfs("/some/path");
    const stats3 = await statfs("/another/different/path");

    expect(stats1).toEqual(stats2);
    expect(stats2).toEqual(stats3);
    expect(mockEstimate).toHaveBeenCalledTimes(3);
  });

  it("should have all required fields in the stats object", async () => {
    const mockEstimate = vi.fn().mockResolvedValue({
      quota: 1024 * 1024,
      usage: 512 * 1024,
    });

    Object.defineProperty(globalThis, "navigator", {
      value: {
        storage: {
          estimate: mockEstimate,
        },
      },
      writable: true,
      configurable: true,
    });

    const stats = await statfs("/") as StatsFs;

    expect(stats).toHaveProperty("type");
    expect(stats).toHaveProperty("bsize");
    expect(stats).toHaveProperty("blocks");
    expect(stats).toHaveProperty("bfree");
    expect(stats).toHaveProperty("bavail");
    expect(stats).toHaveProperty("files");
    expect(stats).toHaveProperty("ffree");
  });

  it("should return non-negative values", async () => {
    const mockEstimate = vi.fn().mockResolvedValue({
      quota: 1024 * 1024,
      usage: 512 * 1024,
    });

    Object.defineProperty(globalThis, "navigator", {
      value: {
        storage: {
          estimate: mockEstimate,
        },
      },
      writable: true,
      configurable: true,
    });

    const stats = await statfs("/") as StatsFs;

    expect(stats.type).toBeGreaterThanOrEqual(0);
    expect(stats.bsize).toBeGreaterThanOrEqual(0);
    expect(stats.blocks).toBeGreaterThanOrEqual(0);
    expect(stats.bfree).toBeGreaterThanOrEqual(0);
    expect(stats.bavail).toBeGreaterThanOrEqual(0);
    expect(stats.files).toBeGreaterThanOrEqual(0);
    expect(stats.ffree).toBeGreaterThanOrEqual(0);
  });

  it("should calculate blocks correctly with block size of 4096", async () => {
    const mockEstimate = vi.fn().mockResolvedValue({
      quota: 4096 * 100,
      usage: 4096 * 25,
    });

    Object.defineProperty(globalThis, "navigator", {
      value: {
        storage: {
          estimate: mockEstimate,
        },
      },
      writable: true,
      configurable: true,
    });

    const stats = await statfs("/") as StatsFs;

    expect(stats.bsize).toBe(4096);
    expect(stats.blocks).toBe(100);
    expect(stats.bfree).toBe(75);
  });

  it("should floor fractional blocks", async () => {
    const mockEstimate = vi.fn().mockResolvedValue({
      quota: 10000,
      usage: 2500,
    });

    Object.defineProperty(globalThis, "navigator", {
      value: {
        storage: {
          estimate: mockEstimate,
        },
      },
      writable: true,
      configurable: true,
    });

    const stats = await statfs("/") as StatsFs;

    expect(stats.blocks).toBe(2);
    expect(stats.bfree).toBe(1);
  });
});
