import { describe, expect, it, vi, beforeEach } from "vitest";
import { utimes } from "../../../operations/file/utimes";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("utimes", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw ENOTSUP error", async () => {
    await expect(utimes("/test/file.txt", new Date(), new Date())).rejects.toThrow(
      "ENOTSUP: operation not supported, utimes '/test/file.txt'",
    );
  });

  it("should throw error with correct code property", async () => {
    try {
      await utimes("/test/file.txt", 12345, 67890);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).code).toBe("ENOTSUP");
    }
  });

  it("should throw error with correct syscall property", async () => {
    try {
      await utimes("/test/file.txt", "2024-01-01", "2024-01-02");
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).syscall).toBe("utimes");
    }
  });

  it("should include path in error message", async () => {
    const testPath = "/some/custom/path.txt";
    try {
      await utimes(testPath, new Date(), new Date());
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as Error).message).toContain(testPath);
      expect((error as NodeJS.ErrnoException).path).toBe(testPath);
    }
  });

  it("should accept different timestamp formats", async () => {
    const testCases = [
      { atime: new Date(), mtime: new Date() },
      { atime: Date.now(), mtime: Date.now() },
      { atime: "2024-01-01", mtime: "2024-01-02" },
      { atime: 1234567890, mtime: 9876543210 },
    ];

    for (const { atime, mtime } of testCases) {
      await expect(utimes("/test.txt", atime, mtime)).rejects.toThrow("ENOTSUP");
    }
  });
});
