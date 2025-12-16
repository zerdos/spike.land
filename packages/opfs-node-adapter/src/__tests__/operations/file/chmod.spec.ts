import { describe, expect, it, vi, beforeEach } from "vitest";
import { chmod } from "../../../operations/file/chmod";
import { mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("chmod", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw ENOTSUP error", async () => {
    await expect(chmod("/test/file.txt", 0o755)).rejects.toThrow(
      "ENOTSUP: operation not supported, chmod '/test/file.txt'"
    );
  });

  it("should throw error with correct code property", async () => {
    try {
      await chmod("/test/file.txt", 0o755);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).code).toBe("ENOTSUP");
    }
  });

  it("should throw error with correct syscall property", async () => {
    try {
      await chmod("/test/file.txt", 0o755);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).syscall).toBe("chmod");
    }
  });

  it("should throw error with correct path property", async () => {
    try {
      await chmod("/test/file.txt", 0o755);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as NodeJS.ErrnoException).path).toBe("/test/file.txt");
    }
  });

  it("should include path in error message", async () => {
    const testPath = "/some/other/path.txt";
    try {
      await chmod(testPath, 0o644);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as Error).message).toContain(testPath);
    }
  });

  it("should throw error regardless of mode value", async () => {
    const modes = [0o644, 0o755, 0o777, 0o400];

    for (const mode of modes) {
      try {
        await chmod("/test/file.txt", mode);
        expect.fail(`Should have thrown an error for mode ${mode.toString(8)}`);
      } catch (error) {
        expect((error as NodeJS.ErrnoException).code).toBe("ENOTSUP");
      }
    }
  });
});
