import { afterEach, describe, expect, it, vi } from "vitest";
import { getDirectoryEntriesRecursive, getDirectoryHandleAndFileName } from "./memfs";

// Mock the navigator.storage API
const mockFileSystem: Record<string, any> = {
  "test.txt": {
    kind: "file",
    name: "test.txt",
    getFile: vi.fn().mockResolvedValue({
      size: 100,
      type: "text/plain",
      lastModified: Date.now(),
      text: vi.fn().mockResolvedValue("file content"),
    }),
  },
  "test": {
    kind: "directory",
    name: "test",
    getDirectoryHandle: vi.fn().mockResolvedValue({}),
    entries: vi.fn(async function*() {}), // Initially empty
  },
};

const mockDirectoryHandle = {
  getDirectoryHandle: vi.fn(async (name: string) => {
    if (mockFileSystem[name]?.kind === "directory") {
      return mockFileSystem[name];
    }
    throw new Error("Not a directory");
  }),
  getFileHandle: vi.fn(async (name: string) => {
    if (mockFileSystem[name]?.kind === "file") {
      return mockFileSystem[name];
    }
    throw new Error("Not a file");
  }),
  entries: vi.fn(async function*() {
    for (const name in mockFileSystem) {
      yield [name, mockFileSystem[name]];
    }
  }),
  removeEntry: vi.fn(),
};

const mockNavigator = {
  storage: {
    getDirectory: vi.fn().mockResolvedValue(mockDirectoryHandle),
  },
};

vi.stubGlobal("navigator", mockNavigator);

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
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName("/test/test.txt");
    expect(fileName).toEqual("test.txt");
    expect(dirHandle).toBeTruthy();
  });
});
