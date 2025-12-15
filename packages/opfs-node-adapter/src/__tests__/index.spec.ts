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
    });

    it("should export watch/glob operations (not implemented)", () => {
      expect(FS).toHaveProperty("watch");
      expect(FS).toHaveProperty("glob");
      expect(FS).toHaveProperty("opendir");
      expect(FS).toHaveProperty("statfs");
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

  describe("not implemented methods should throw", () => {
    it("link should throw not implemented error", async () => {
      await expect(FS.link("/src", "/dest")).rejects.toThrow("not implemented yet");
    });

    it("symlink should throw not implemented error", async () => {
      await expect(FS.symlink("/target", "/path")).rejects.toThrow("not implemented yet");
    });

    it("readlink should throw not implemented error", async () => {
      await expect(FS.readlink("/path")).rejects.toThrow("not implemented yet");
    });

    it("chmod should throw not implemented error", async () => {
      await expect(FS.chmod("/path", 0o755)).rejects.toThrow("not implemented yet");
    });

    it("chown should throw not implemented error", async () => {
      await expect(FS.chown("/path", 1000, 1000)).rejects.toThrow("not implemented yet");
    });

    it("lchmod should throw not implemented error", async () => {
      await expect(FS.lchmod("/path", 0o755)).rejects.toThrow("not implemented yet");
    });

    it("lchown should throw not implemented error", async () => {
      await expect(FS.lchown("/path", 1000, 1000)).rejects.toThrow("not implemented yet");
    });

    it("utimes should throw not implemented error", async () => {
      await expect(FS.utimes("/path", new Date(), new Date())).rejects.toThrow("not implemented yet");
    });

    it("lutimes should throw not implemented error", async () => {
      await expect(FS.lutimes("/path", new Date(), new Date())).rejects.toThrow("not implemented yet");
    });

    it("watch should throw not implemented error", () => {
      expect(() => FS.watch("/path")).toThrow("not implemented yet");
    });

    it("glob should throw not implemented error", async () => {
      await expect(FS.glob("*.txt")).rejects.toThrow("not implemented yet");
    });

    it("opendir should throw not implemented error", async () => {
      await expect(FS.opendir("/path")).rejects.toThrow("not implemented yet");
    });

    it("statfs should throw not implemented error", async () => {
      await expect(FS.statfs("/path")).rejects.toThrow("not implemented yet");
    });

    it("cp should throw not implemented error", async () => {
      await expect(FS.cp("/src", "/dest")).rejects.toThrow("not implemented yet");
    });
  });
});
