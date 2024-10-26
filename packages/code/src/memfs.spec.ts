import { afterEach, describe, expect, it, vi } from "vitest";
import { getDirectoryEntriesRecursive, getDirectoryHandleAndFileName } from "./memfs";

// Mock the navigator.storage API
const mockNavigator = {
  storage: {
    getDirectory: vi.fn().mockResolvedValue({
      getDirectoryHandle: vi.fn().mockResolvedValue({
        getDirectory: vi.fn().mockResolvedValue({}),
      }),
      values: vi.fn().mockReturnValue([
        {
          kind: "file",
          name: "test.txt",
          getFile: vi.fn().mockResolvedValue({
            size: 100,
            type: "text/plain",
            lastModified: Date.now(),
          }),
        },
        {
          kind: "directory",
          name: "test",
          values: vi.fn().mockReturnValue([]),
        },
      ]),
    }),
  },
};

vi.stubGlobal("navigator", mockNavigator);

vi.mock("navigator.storage", () => ({
  getDirectory: vi.fn().mockResolvedValue({
    values: vi.fn().mockReturnValue([
      {
        kind: "file",
        name: "test.txt",
        getFile: vi.fn().mockResolvedValue({
          size: 100,
          type: "text/plain",
          lastModified: Date.now(),
        }),
      },
      {
        kind: "directory",
        name: "test",
        values: vi.fn().mockReturnValue([]),
      },
    ]),
  }),
}));

describe("getDirectoryEntriesRecursive", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return all entries in directory", async () => {
    const directoryHandle = await navigator.storage.getDirectory();
    const entries = await getDirectoryEntriesRecursive(directoryHandle);
    expect(Object.keys(entries)).toEqual(["test.txt", "test"]);
  });
});

describe("getDirectoryHandleAndFileName", () => {
  it("should return directory handle and file name", async () => {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(
      "/test/test.txt",
    );
    expect(fileName).toEqual("test.txt");
    expect(dirHandle).toBeTruthy();
  });
});
