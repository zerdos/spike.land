import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFile } from "../../../operations/file/readFile";
import type { MockFileSystemFile } from "../../setup";
import { mockDirectoryHandle, mockFileSystem, mockNavigator, setupTest } from "../../setup";

vi.stubGlobal("navigator", mockNavigator);

describe("readFile", () => {
  beforeEach(() => {
    setupTest();
  });

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
