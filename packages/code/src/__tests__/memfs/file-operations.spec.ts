import { beforeEach, describe, expect, it, vi } from "vitest";
import { 
  readdir,
  writeFile,
  readFile,
  unlink
} from "@/lib/memfs";
import { 
  mockDirectoryHandle, 
  mockFileSystem,
  mockNavigator, 
  setupTest,
  MockFileSystemFile,
  MockFileSystemEntry
} from "./setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("memfs file operations", () => {
  beforeEach(() => {
    setupTest();
  });

  describe("readdir", () => {
    it("should list directory contents", async () => {
      const files = await readdir("/");
      expect(files).toEqual(["test.txt", "test"]);
    });

    it("should handle empty directories", async () => {
      // Mock an empty directory
      mockDirectoryHandle.entries = vi.fn(async function*(): AsyncGenerator<[string, MockFileSystemEntry], void, unknown> {
        // Yield nothing
      });
      
      const files = await readdir("/");
      expect(files).toEqual([]);
      
      // Restore original mock
      mockDirectoryHandle.entries = vi.fn(async function*(): AsyncGenerator<[string, MockFileSystemEntry], void, unknown> {
        for (const name in mockFileSystem) {
          yield [name, mockFileSystem[name]];
        }
      });
    });
  });

  describe("writeFile", () => {
    it("should write content to a file", async () => {
      const testContent = "new file content";
      const testPath = "/test/newfile.txt";
      
      await writeFile(testPath, testContent);
      
      // Verify the directory handle was retrieved
      expect(mockDirectoryHandle.getDirectoryHandle).toHaveBeenCalledWith("test", { create: true });
      
      // Verify the file was created and written to
      const testDirHandle = await mockDirectoryHandle.getDirectoryHandle("test");
      expect(testDirHandle.getFileHandle).toHaveBeenCalledWith("newfile.txt", { create: true });
    });

    it("should throw error for invalid file path", async () => {
      await expect(writeFile("/", "content")).rejects.toThrow("Invalid file path");
    });
  });

  describe("readFile", () => {
    it("should read content from a file", async () => {
      const content = await readFile("/test.txt");
      expect(content).toBe("file content");
    });

    it("should throw error for invalid file path", async () => {
      await expect(readFile("/")).rejects.toThrow("Invalid file path");
    });

    it("should throw error for non-existent file", async () => {
      mockDirectoryHandle.getFileHandle = vi.fn().mockRejectedValue(new Error("File not found"));
      
      await expect(readFile("/nonexistent.txt")).rejects.toThrow();
      
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

  describe("unlink", () => {
    it("should delete a file", async () => {
      await unlink("/test.txt");
      expect(mockDirectoryHandle.removeEntry).toHaveBeenCalledWith("test.txt");
    });

    it("should throw error for invalid file path", async () => {
      await expect(unlink("/")).rejects.toThrow("Invalid file path");
    });
  });
});
