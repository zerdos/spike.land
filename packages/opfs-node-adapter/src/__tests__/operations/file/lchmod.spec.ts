import { describe, expect, it, vi, beforeEach } from "vitest";
import { lchmod } from "../../../operations/file/lchmod";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("lchmod", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw ENOTSUP error", async () => {
    await expect(lchmod("/test/file.txt", 0o755)).rejects.toThrow(
      "ENOTSUP: operation not supported, lchmod '/test/file.txt'"
    );
  });

  it("should throw error with correct code property", async () => {
    try {
      await lchmod("/test/file.txt", 0o755);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).code).toBe("ENOTSUP");
    }
  });

  it("should throw error with correct syscall property", async () => {
    try {
      await lchmod("/test/file.txt", 0o755);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).syscall).toBe("lchmod");
    }
  });

  it("should include path in error message", async () => {
    const testPath = "/some/custom/path.txt";
    try {
      await lchmod(testPath, 0o644);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as Error).message).toContain(testPath);
      expect((error as NodeJS.ErrnoException).path).toBe(testPath);
    }
  });

  it("should work with different mode values", async () => {
    const modes = [0o755, 0o644, 0o777, 0o400];
    for (const mode of modes) {
      try {
        await lchmod("/test/file.txt", mode);
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect((error as NodeJS.ErrnoException).code).toBe("ENOTSUP");
      }
    }
  });
});
