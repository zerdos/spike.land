import { describe, expect, it, vi, beforeEach } from "vitest";
import { symlink } from "../../../operations/file/symlink";
import { mockNavigator, setupTest } from "../../setup";
import type { LinkErrnoException } from "../../../types";

vi.stubGlobal("navigator", mockNavigator);

describe("symlink", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw ENOTSUP error", async () => {
    await expect(symlink("/target", "/path")).rejects.toThrow(
      "ENOTSUP: operation not supported, symlink '/target' -> '/path'",
    );
  });

  it("should have correct error code property", async () => {
    try {
      await symlink("/target", "/path");
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as LinkErrnoException).code).toBe("ENOTSUP");
    }
  });

  it("should have correct syscall property", async () => {
    try {
      await symlink("/target", "/path");
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as LinkErrnoException).syscall).toBe("symlink");
    }
  });

  it("should include both paths in error", async () => {
    try {
      await symlink("/source/file.txt", "/dest/link.txt");
      expect.fail("Should have thrown an error");
    } catch (error) {
      const err = error as LinkErrnoException;
      expect(err.path).toBe("/source/file.txt");
      expect(err.dest).toBe("/dest/link.txt");
      expect(err.message).toContain("/source/file.txt");
      expect(err.message).toContain("/dest/link.txt");
    }
  });

  it("should throw error regardless of type parameter", async () => {
    await expect(symlink("/target", "/path", "file")).rejects.toThrow("ENOTSUP");
    await expect(symlink("/target", "/path", "dir")).rejects.toThrow("ENOTSUP");
    await expect(symlink("/target", "/path", "junction")).rejects.toThrow("ENOTSUP");
    await expect(symlink("/target", "/path", null)).rejects.toThrow("ENOTSUP");
  });
});
