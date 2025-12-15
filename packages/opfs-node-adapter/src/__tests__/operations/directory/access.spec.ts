import { beforeEach, describe, expect, it, vi } from "vitest";
import { access } from "../../../operations/directory/access";
import type { MockFileSystemFile } from "../../setup";
import { mockDirectoryHandle, mockFileSystem, mockNavigator, setupTest } from "../../setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("access", () => {
  beforeEach(() => {
    setupTest();
  });

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

    // Reset mocks
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
