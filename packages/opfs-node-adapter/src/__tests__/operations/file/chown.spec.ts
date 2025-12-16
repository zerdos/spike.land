import { describe, expect, it, vi, beforeEach } from "vitest";
import { chown } from "../../../operations/file/chown";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("chown", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw ENOTSUP error", async () => {
    await expect(chown("/test/file.txt", 1000, 1000)).rejects.toThrow(
      "ENOTSUP: operation not supported, chown '/test/file.txt'"
    );
  });

  it("should throw error with correct code property", async () => {
    try {
      await chown("/test/file.txt", 1000, 1000);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).code).toBe("ENOTSUP");
    }
  });

  it("should throw error with correct syscall property", async () => {
    try {
      await chown("/test/file.txt", 1000, 1000);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).syscall).toBe("chown");
    }
  });

  it("should throw error with correct path property", async () => {
    try {
      await chown("/test/file.txt", 1000, 1000);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).path).toBe("/test/file.txt");
    }
  });

  it("should include path in error message", async () => {
    const testPath = "/path/to/file.txt";
    try {
      await chown(testPath, 500, 500);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as Error).message).toContain(testPath);
    }
  });

  it("should throw error regardless of uid and gid values", async () => {
    await expect(chown("/test", 0, 0)).rejects.toThrow("ENOTSUP");
    await expect(chown("/test", 1000, 1000)).rejects.toThrow("ENOTSUP");
    await expect(chown("/test", 65534, 65534)).rejects.toThrow("ENOTSUP");
  });
});
