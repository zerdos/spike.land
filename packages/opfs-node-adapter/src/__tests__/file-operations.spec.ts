import { appendFile, copyFile, readFile, rename, unlink, writeFile } from "../index";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MockFileSystemFile } from "./setup";
import { mockDirectoryHandle, mockFileSystem, mockNavigator, setupTest } from "./setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("memfs file operations", () => {
  beforeEach(() => {
    setupTest();
  });

  describe("readFile", () => {
    it("should read file content", async () => {
      const content = await readFile("/test.txt");
      expect(content).toBe("test content");
    });

    it("should throw error for non-existent file", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      mockDirectoryHandle.getFileHandle = vi.fn().mockRejectedValue(
        new Error("Not found"),
      );

      await expect(readFile("/nonexistent.txt")).rejects.toThrow();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error reading file /nonexistent.txt:",
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();

      // Restore original mock
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
    it("should write content to file", async () => {
      await writeFile("/new-file.txt", "new content");
      expect(mockDirectoryHandle.getFileHandle).toHaveBeenCalledWith(
        "new-file.txt",
        {
          create: true,
        },
      );

      const fileHandle = await mockDirectoryHandle.getFileHandle(
        "new-file.txt",
      );
      const writable = await fileHandle.createWritable();
      expect(writable.write).toHaveBeenCalledWith("new content");
      expect(writable.close).toHaveBeenCalled();
    });
  });

  describe("appendFile", () => {
    it("should append content to existing file", async () => {
      // First read the existing content
      const existingContent = await readFile("/test.txt");

      // Then append new content
      await appendFile("/test.txt", " appended");

      // Verify the file was written with combined content
      const fileHandle = await mockDirectoryHandle.getFileHandle("test.txt");
      const writable = await fileHandle.createWritable();
      expect(writable.write).toHaveBeenCalledWith(
        existingContent + " appended",
      );
    });

    it("should create file if it doesn't exist", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      await appendFile("/new-append.txt", "new content");
      expect(mockDirectoryHandle.getFileHandle).toHaveBeenCalledWith(
        "new-append.txt",
        {
          create: true,
        },
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

      // Verify source was read
      const sourceFileHandle = await mockDirectoryHandle.getFileHandle(
        "test.txt",
      );
      const sourceFile = await sourceFileHandle.getFile();
      expect(sourceFile.text).toHaveBeenCalled();

      // Verify destination was written
      const destFileHandle = await mockDirectoryHandle.getFileHandle(
        "copy.txt",
      );
      const writable = await destFileHandle.createWritable();
      expect(writable.write).toHaveBeenCalledWith("test content");
      expect(writable.close).toHaveBeenCalled();
    });
  });

  describe("rename", () => {
    it("should rename a file", async () => {
      await rename("/test.txt", "/renamed.txt");

      // Verify source was read
      const sourceFileHandle = await mockDirectoryHandle.getFileHandle(
        "test.txt",
      );
      const sourceFile = await sourceFileHandle.getFile();
      expect(sourceFile.text).toHaveBeenCalled();

      // Verify destination was written
      const destFileHandle = await mockDirectoryHandle.getFileHandle(
        "renamed.txt",
      );
      const writable = await destFileHandle.createWritable();
      expect(writable.write).toHaveBeenCalledWith("test content");

      // Verify source was deleted
      expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test.txt");
    });
  });
});
