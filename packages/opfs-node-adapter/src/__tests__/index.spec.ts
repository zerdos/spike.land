import FS from "../index";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockDirectoryHandle, mockFileSystem, mockNavigator, setupTest } from "./setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("opfs-node-adapter", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should have mocks set up correctly", () => {
    expect(mockNavigator).toBeDefined();
    expect(mockDirectoryHandle).toBeDefined();
    expect(mockFileSystem).toBeDefined();
  });

  describe("exported methods", () => {
    it("should export file operations", () => {
      expect(FS).toHaveProperty("readFile");
      expect(FS).toHaveProperty("writeFile");
      expect(FS).toHaveProperty("appendFile");
      expect(FS).toHaveProperty("copyFile");
      expect(FS).toHaveProperty("rename");
      expect(FS).toHaveProperty("truncate");
      expect(FS).toHaveProperty("unlink");
      expect(FS).toHaveProperty("readFileSync");
    });

    it("should export link operations (not implemented)", () => {
      expect(FS).toHaveProperty("link");
      expect(FS).toHaveProperty("symlink");
      expect(FS).toHaveProperty("readlink");
      expect(FS).toHaveProperty("realpath");
    });

    it("should export permission operations (not implemented)", () => {
      expect(FS).toHaveProperty("chmod");
      expect(FS).toHaveProperty("chown");
      expect(FS).toHaveProperty("lchmod");
      expect(FS).toHaveProperty("lchown");
    });

    it("should export timestamp operations (not implemented)", () => {
      expect(FS).toHaveProperty("utimes");
      expect(FS).toHaveProperty("lutimes");
    });

    it("should export directory operations", () => {
      expect(FS).toHaveProperty("mkdir");
      expect(FS).toHaveProperty("readdir");
      expect(FS).toHaveProperty("rmdir");
      expect(FS).toHaveProperty("rm");
      expect(FS).toHaveProperty("stat");
      expect(FS).toHaveProperty("lstat");
      expect(FS).toHaveProperty("access");
      expect(FS).toHaveProperty("cwd");
      expect(FS).toHaveProperty("mkdtemp");
      expect(FS).toHaveProperty("exists");
      expect(FS).toHaveProperty("statfs");
    });

    it("should export watch/glob operations", () => {
      expect(FS).toHaveProperty("watch");
      expect(FS).toHaveProperty("glob");
      expect(FS).toHaveProperty("opendir");
      expect(FS).toHaveProperty("cp");
    });

    it("should export file handle operations", () => {
      expect(FS).toHaveProperty("open");
      expect(FS).toHaveProperty("createFileHandle");
    });

    it("should export constants", () => {
      expect(FS).toHaveProperty("constants");
      expect(FS.constants).toHaveProperty("F_OK");
      expect(FS.constants).toHaveProperty("R_OK");
      expect(FS.constants).toHaveProperty("W_OK");
      expect(FS.constants).toHaveProperty("X_OK");
      expect(FS.constants).toHaveProperty("COPYFILE_EXCL");
    });
  });

  describe("ENOTSUP operations should throw proper errors", () => {
    it("link should throw ENOTSUP error", async () => {
      await expect(FS.link("/src", "/dest")).rejects.toThrow("ENOTSUP: operation not supported");
    });

    it("symlink should throw ENOTSUP error", async () => {
      await expect(FS.symlink("/target", "/path")).rejects.toThrow("ENOTSUP: operation not supported");
    });

    it("readlink should throw ENOTSUP error", async () => {
      await expect(FS.readlink("/path")).rejects.toThrow("ENOTSUP: operation not supported");
    });

    it("chmod should throw ENOTSUP error", async () => {
      await expect(FS.chmod("/path", 0o755)).rejects.toThrow("ENOTSUP: operation not supported");
    });

    it("chown should throw ENOTSUP error", async () => {
      await expect(FS.chown("/path", 1000, 1000)).rejects.toThrow("ENOTSUP: operation not supported");
    });

    it("lchmod should throw ENOTSUP error", async () => {
      await expect(FS.lchmod("/path", 0o755)).rejects.toThrow("ENOTSUP: operation not supported");
    });

    it("lchown should throw ENOTSUP error", async () => {
      await expect(FS.lchown("/path", 1000, 1000)).rejects.toThrow("ENOTSUP: operation not supported");
    });

    it("utimes should throw ENOTSUP error", async () => {
      await expect(FS.utimes("/path", new Date(), new Date())).rejects.toThrow(
        "ENOTSUP: operation not supported",
      );
    });

    it("lutimes should throw ENOTSUP error", async () => {
      await expect(FS.lutimes("/path", new Date(), new Date())).rejects.toThrow(
        "ENOTSUP: operation not supported",
      );
    });
  });

  describe("implemented operations should work", () => {
    it("watch should be implemented and not throw", async () => {
      const watcher = FS.watch("/path");
      expect(watcher).toBeDefined();
      expect(watcher.close).toBeInstanceOf(Function);
      await watcher.close();
    });

    it("glob should return results", async () => {
      const results = await FS.glob("*.txt");
      expect(Array.isArray(results)).toBe(true);
    });

    it("opendir should throw for non-existent path", async () => {
      await expect(FS.opendir("/nonexistent")).rejects.toThrow();
    });

    it("cp should throw ENOENT for non-existent source", async () => {
      await expect(FS.cp("/nonexistent", "/dest")).rejects.toThrow("ENOENT");
    });
  });
});
