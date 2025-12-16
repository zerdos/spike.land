import { describe, expect, it, vi, beforeEach } from "vitest";
import { lutimes } from "../../../operations/file/lutimes";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("lutimes", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw ENOTSUP error", async () => {
    await expect(lutimes("/test/file.txt", new Date(), new Date())).rejects.toThrow(
      "ENOTSUP: operation not supported, lutimes '/test/file.txt'",
    );
  });

  it("should throw error with correct code property", async () => {
    try {
      await lutimes("/test/symlink", new Date(), new Date());
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).code).toBe("ENOTSUP");
    }
  });

  it("should throw error with correct syscall property", async () => {
    try {
      await lutimes("/test/link", new Date(), new Date());
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).syscall).toBe("lutimes");
    }
  });

  it("should include path in error message", async () => {
    const testPath = "/var/log/symlink";
    try {
      await lutimes(testPath, new Date(), new Date());
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as Error).message).toContain(testPath);
      expect((error as NodeJS.ErrnoException).path).toBe(testPath);
    }
  });

  it("should work with different timestamp formats", async () => {
    const tests = [
      { atime: new Date(), mtime: new Date() },
      { atime: Date.now(), mtime: Date.now() },
      { atime: "2023-01-01", mtime: "2023-12-31" },
    ];

    for (const { atime, mtime } of tests) {
      await expect(lutimes("/test/file", atime, mtime)).rejects.toThrow("ENOTSUP");
    }
  });
});
