import { describe, it, expect, beforeEach, vi } from "vitest";
import { stat } from "../../../operations/directory/stat";
import { mockDirectoryHandle, mockFileSystem, setupTest } from "../../setup";

vi.stubGlobal("navigator", {
  storage: {
    getDirectory: vi.fn().mockResolvedValue(mockDirectoryHandle),
  },
});

describe("stat", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should return Stats object for files", async () => {
    const fileStat = await stat("/test.txt");
    expect(fileStat.isFile()).toBe(true);
    expect(fileStat.isDirectory()).toBe(false);
    expect(typeof fileStat.size).toBe("number");
    expect(fileStat.size).toBe(100);
  });

  it("should throw for non-existent path", async () => {
    mockDirectoryHandle.getFileHandle = vi.fn().mockRejectedValue(new Error("Not found"));

    await expect(stat("/nonexistent")).rejects.toThrow("ENOENT");

    // Reset mock
    mockDirectoryHandle.getFileHandle = vi.fn(async (name, options) => {
      if (mockFileSystem[name]?.kind === "file") {
        return mockFileSystem[name];
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
