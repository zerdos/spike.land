import { access, exists, lstat, mkdir, mkdtemp, rm, rmdir, stat } from "../index";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MockFileSystemFile } from "./setup";
import { mockDirectoryHandle, mockFileSystem, mockNavigator, setupTest } from "./setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("opfs-node-adapter directory operations", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    setupTest();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  describe("mkdir", () => {
    it("should create a directory", async () => {
      await mkdir("/newdir");
      expect(mockDirectoryHandle.getDirectoryHandle).toHaveBeenCalledWith(
        "newdir",
        { create: true },
      );
    });

    it("should create nested directories with recursive option", async () => {
      await mkdir("/test/nested", { recursive: true });
      expect(mockDirectoryHandle.getDirectoryHandle).toHaveBeenCalledWith(
        "test",
        { create: false },
      );
    });

    it("should throw error for invalid directory path", async () => {
      await expect(mkdir("/")).rejects.toThrow("Invalid directory path");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error creating directory"),
        expect.any(Error),
      );
    });

    it("should return undefined when not recursive", async () => {
      const result = await mkdir("/newdir");
      expect(result).toBeUndefined();
    });
  });

  describe("stat", () => {
    it("should return Stats object for files", async () => {
      const fileStat = await stat("/test.txt");
      expect(fileStat.isFile()).toBe(true);
      expect(fileStat.isDirectory()).toBe(false);
      expect(typeof fileStat.size).toBe("number");
      expect(fileStat.size).toBe(100);
    });

    it("should throw for non-existent path", async () => {
      mockDirectoryHandle.getFileHandle = vi.fn().mockRejectedValue(
        new Error("Not found"),
      );

      await expect(stat("/nonexistent")).rejects.toThrow("ENOENT");

      mockDirectoryHandle.getFileHandle = vi.fn(async (name, options) => {
        if (mockFileSystem[name]?.kind === "file") {
          return mockFileSystem[name] as MockFileSystemFile;
        }
        if (options?.create) {
          const newFile = {
            kind: "file" as const,
            name,
            getFile: vi.fn().mockResolvedValue({
              size: 0,
              type: "text/plain",
              lastModified: Date.now(),
              text: vi.fn().mockResolvedValue(""),
            }),
            createWritable: vi.fn().mockResolvedValue({
              write: vi.fn().mockResolvedValue(undefined),
              close: vi.fn().mockResolvedValue(undefined),
            }),
          };
          mockFileSystem[name] = newFile;
          return newFile;
        }
        throw new Error("Not a file");
      });
    });
  });

  describe("lstat", () => {
    it("should return Stats object (same as stat since no symlinks in OPFS)", async () => {
      const fileStat = await lstat("/test.txt");
      expect(fileStat.isFile()).toBe(true);
      expect(fileStat.isDirectory()).toBe(false);
    });
  });

  describe("rmdir", () => {
    it("should remove a directory", async () => {
      await rmdir("/test");
      expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test", {
        recursive: true,
      });
    });

    it("should throw error for root directory", async () => {
      await expect(rmdir("/")).rejects.toThrow("Cannot remove root directory");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error removing directory"),
        expect.any(Error),
      );
    });
  });

  describe("rm", () => {
    it("should remove a file", async () => {
      await rm("/test.txt");
      expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test.txt", {
        recursive: false,
      });
    });

    it("should remove recursively with option", async () => {
      await rm("/test", { recursive: true });
      expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test", {
        recursive: true,
      });
    });

    it("should throw error for root directory", async () => {
      await expect(rm("/")).rejects.toThrow("Cannot remove root directory");
    });
  });

  describe("access", () => {
    it("should not throw for existing file", async () => {
      await expect(access("/test.txt")).resolves.toBeUndefined();
    });

    it("should throw for non-existent file", async () => {
      mockDirectoryHandle.getFileHandle = vi.fn().mockRejectedValue(
        new Error("Not found"),
      );
      mockDirectoryHandle.getDirectoryHandle = vi.fn().mockRejectedValue(
        new Error("Not found"),
      );

      await expect(access("/nonexistent")).rejects.toThrow("ENOENT");

      mockDirectoryHandle.getFileHandle = vi.fn(async (name, options) => {
        if (mockFileSystem[name]?.kind === "file") {
          return mockFileSystem[name] as MockFileSystemFile;
        }
        if (options?.create) {
          const newFile = {
            kind: "file" as const,
            name,
            getFile: vi.fn().mockResolvedValue({
              size: 0,
              type: "text/plain",
              lastModified: Date.now(),
              text: vi.fn().mockResolvedValue(""),
            }),
            createWritable: vi.fn().mockResolvedValue({
              write: vi.fn().mockResolvedValue(undefined),
              close: vi.fn().mockResolvedValue(undefined),
            }),
          };
          mockFileSystem[name] = newFile;
          return newFile;
        }
        throw new Error("Not a file");
      });
    });
  });

  describe("exists", () => {
    it("should return true for existing file", async () => {
      const result = await exists("/test.txt");
      expect(result).toBe(true);
    });

    it("should return false for non-existent file", async () => {
      mockDirectoryHandle.getFileHandle = vi.fn().mockRejectedValue(
        new Error("Not found"),
      );
      mockDirectoryHandle.getDirectoryHandle = vi.fn().mockRejectedValue(
        new Error("Not found"),
      );

      const result = await exists("/nonexistent");
      expect(result).toBe(false);

      setupTest();
    });
  });

  describe("mkdtemp", () => {
    it("should create a temporary directory with random suffix", async () => {
      setupTest();
      const result = await mkdtemp("test-");
      expect(result).toMatch(/^test-.{6}$/);
      expect(mockDirectoryHandle.getDirectoryHandle).toHaveBeenCalled();
    });
  });
});
