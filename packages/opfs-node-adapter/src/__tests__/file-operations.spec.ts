import { appendFile, copyFile, readFile, rename, truncate, unlink, writeFile, realpath } from "../index";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MockFileSystemFile } from "./setup";
import { mockDirectoryHandle, mockFileSystem, mockNavigator, setupTest } from "./setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("opfs-node-adapter file operations", () => {
  beforeEach(() => {
    setupTest();
  });

  describe("readFile", () => {
    it("should read file content as string with encoding", async () => {
      const content = await readFile("/test.txt", "utf8");
      expect(content).toBe("test content");
    });

    it("should throw error for non-existent file", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      mockDirectoryHandle.getFileHandle = vi.fn().mockRejectedValue(
        new Error("Not found"),
      );

      await expect(readFile("/nonexistent.txt", "utf8")).rejects.toThrow();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error reading file /nonexistent.txt:",
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();

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

  describe("writeFile", () => {
    it("should write string content to file", async () => {
      await writeFile("/new-file.txt", "new content");
      expect(mockDirectoryHandle.getFileHandle).toHaveBeenCalledWith(
        "new-file.txt",
        { create: true },
      );

      const fileHandle = await mockDirectoryHandle.getFileHandle("new-file.txt");
      const writable = await fileHandle.createWritable();
      expect(writable.write).toHaveBeenCalledWith("new content");
      expect(writable.close).toHaveBeenCalled();
    });

    it("should write Uint8Array content to file", async () => {
      const data = new Uint8Array([72, 101, 108, 108, 111]);
      await writeFile("/binary-file.txt", data);
      expect(mockDirectoryHandle.getFileHandle).toHaveBeenCalledWith(
        "binary-file.txt",
        { create: true },
      );
    });
  });

  describe("appendFile", () => {
    it("should append content to existing file", async () => {
      const existingContent = await readFile("/test.txt", "utf8");
      await appendFile("/test.txt", " appended");

      const fileHandle = await mockDirectoryHandle.getFileHandle("test.txt");
      const writable = await fileHandle.createWritable();
      expect(writable.write).toHaveBeenCalledWith(existingContent + " appended");
    });

    it("should create file if it doesn't exist", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      await appendFile("/new-append.txt", "new content");
      expect(mockDirectoryHandle.getFileHandle).toHaveBeenCalledWith(
        "new-append.txt",
        { create: true },
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "File /new-append.txt not found or unreadable for append, creating new file.",
      );

      consoleErrorSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });
  });

  describe("unlink", () => {
    it("should delete a file", async () => {
      await unlink("/test.txt");
      expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test.txt");
    });
  });

  describe("copyFile", () => {
    it("should copy a file", async () => {
      await copyFile("/test.txt", "/copy.txt");

      const sourceFileHandle = await mockDirectoryHandle.getFileHandle("test.txt");
      const sourceFile = await sourceFileHandle.getFile();
      expect(sourceFile.text).toHaveBeenCalled();

      const destFileHandle = await mockDirectoryHandle.getFileHandle("copy.txt");
      const writable = await destFileHandle.createWritable();
      expect(writable.write).toHaveBeenCalled();
      expect(writable.close).toHaveBeenCalled();
    });
  });

  describe("rename", () => {
    it("should rename a file", async () => {
      await rename("/test.txt", "/renamed.txt");

      const sourceFileHandle = await mockDirectoryHandle.getFileHandle("test.txt");
      const sourceFile = await sourceFileHandle.getFile();
      expect(sourceFile.text).toHaveBeenCalled();

      const destFileHandle = await mockDirectoryHandle.getFileHandle("renamed.txt");
      const writable = await destFileHandle.createWritable();
      expect(writable.write).toHaveBeenCalled();

      expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test.txt");
    });
  });

  describe("truncate", () => {
    it("should truncate a file to specified length", async () => {
      await truncate("/test.txt", 4);

      const fileHandle = await mockDirectoryHandle.getFileHandle("test.txt");
      const writable = await fileHandle.createWritable();
      expect(writable.write).toHaveBeenCalledWith("test");
    });

    it("should truncate a file to zero length by default", async () => {
      await truncate("/test.txt");

      const fileHandle = await mockDirectoryHandle.getFileHandle("test.txt");
      const writable = await fileHandle.createWritable();
      expect(writable.write).toHaveBeenCalledWith("");
    });
  });

  describe("realpath", () => {
    it("should normalize path with leading slash", async () => {
      const result = await realpath("/test/file.txt");
      expect(result).toBe("/test/file.txt");
    });

    it("should add leading slash if missing", async () => {
      const result = await realpath("test/file.txt");
      expect(result).toBe("/test/file.txt");
    });

    it("should remove trailing slash", async () => {
      const result = await realpath("/test/dir/");
      expect(result).toBe("/test/dir");
    });

    it("should handle root path", async () => {
      const result = await realpath("/");
      expect(result).toBe("/");
    });

    it("should collapse multiple slashes", async () => {
      const result = await realpath("/test//file.txt");
      expect(result).toBe("/test/file.txt");
    });
  });
});
