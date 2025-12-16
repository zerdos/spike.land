import { describe, expect, it, vi, beforeEach } from "vitest";
import { lchown } from "../../../operations/file/lchown";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("lchown", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw ENOTSUP error", async () => {
    await expect(lchown("/test/file.txt", 1000, 1000)).rejects.toThrow(
      "ENOTSUP: operation not supported, lchown '/test/file.txt'",
    );
  });

  it("should throw error with correct code property", async () => {
    try {
      await lchown("/test/file.txt", 1000, 1000);
      expect.fail("Expected lchown to throw");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).code).toBe("ENOTSUP");
    }
  });

  it("should throw error with correct syscall property", async () => {
    try {
      await lchown("/test/file.txt", 1000, 1000);
      expect.fail("Expected lchown to throw");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).syscall).toBe("lchown");
    }
  });

  it("should include path in error message", async () => {
    const testPath = "/some/custom/path.txt";
    try {
      await lchown(testPath, 1000, 1000);
      expect.fail("Expected lchown to throw");
    } catch (error) {
      expect((error as Error).message).toContain(testPath);
      expect((error as NodeJS.ErrnoException).path).toBe(testPath);
    }
  });

  it("should throw for different uid and gid values", async () => {
    await expect(lchown("/test/file.txt", 0, 0)).rejects.toThrow("ENOTSUP");
    await expect(lchown("/test/file.txt", 1001, 1001)).rejects.toThrow("ENOTSUP");
  });

  it("should throw for absolute paths", async () => {
    await expect(lchown("/absolute/path/file.txt", 1000, 1000)).rejects.toThrow("ENOTSUP");
  });

  it("should throw for relative paths", async () => {
    await expect(lchown("relative/path/file.txt", 1000, 1000)).rejects.toThrow("ENOTSUP");
  });
});
