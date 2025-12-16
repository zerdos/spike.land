import { describe, expect, it, vi, beforeEach } from "vitest";
import { readlink } from "../../../operations/file/readlink";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("readlink", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw ENOTSUP error", async () => {
    await expect(readlink("/path/to/symlink")).rejects.toThrow(
      "ENOTSUP: operation not supported, readlink '/path/to/symlink'",
    );
  });

  it("should throw error with correct code property", async () => {
    try {
      await readlink("/test/link");
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).code).toBe("ENOTSUP");
    }
  });

  it("should throw error with correct syscall property", async () => {
    try {
      await readlink("/another/link");
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).syscall).toBe("readlink");
    }
  });

  it("should include path in error message", async () => {
    const testPath = "/custom/path/link";
    try {
      await readlink(testPath);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as Error).message).toContain(testPath);
      expect((error as NodeJS.ErrnoException).path).toBe(testPath);
    }
  });

  it("should handle options parameter but still throw error", async () => {
    await expect(readlink("/path", { encoding: "utf8" })).rejects.toThrow("ENOTSUP");
    await expect(readlink("/path", "utf8")).rejects.toThrow("ENOTSUP");
    await expect(readlink("/path", null)).rejects.toThrow("ENOTSUP");
  });

  it("should have all required error properties", async () => {
    const testPath = "/verify/all/properties";
    try {
      await readlink(testPath);
      expect.fail("Should have thrown an error");
    } catch (error) {
      const errnoError = error as NodeJS.ErrnoException;
      expect(errnoError.code).toBe("ENOTSUP");
      expect(errnoError.syscall).toBe("readlink");
      expect(errnoError.path).toBe(testPath);
      expect(errnoError.message).toBe(`ENOTSUP: operation not supported, readlink '${testPath}'`);
    }
  });
});
