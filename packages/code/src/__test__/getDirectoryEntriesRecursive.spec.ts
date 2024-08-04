import {
  getDirectoryEntriesRecursive,
  getDirectoryHandleAndFileName,
} from "../memfs";

// Mock the FileSystemDirectoryHandle
class MockFileSystemDirectoryHandle {
  async *values() {
    yield { kind: "file", name: "file1.txt" };
    yield { kind: "directory", name: "subdir" };
  }
}

// Mock the navigator.storage API
Object.defineProperty(global, "navigator", {
  value: {
    storage: {
      getDirectory: jest.fn().mockResolvedValue(
        new MockFileSystemDirectoryHandle(),
      ),
    },
  },
  writable: true,
});

globalThis.navigator = {
  storage: {
    getDirectory: jest.fn().mockResolvedValue(Promise.resolve({
      getDirectoryHandle: jest.fn().mockResolvedValue({
        getDirectory: jest.fn().mockResolvedValue({}),
      }),
      values: jest.fn().mockReturnValue([
        {
          kind: "file",
          name: "test.txt",
          getFile: jest.fn().mockResolvedValue({
            size: 100,
            type: "text/plain",
            lastModified: Date.now(),
          }),
        },
        {
          kind: "directory",
          name: "test",
          values: jest.fn().mockReturnValue([]),
        },
      ]),
    })),
  },
} as any;

jest.mock("navigator.storage", () => ({
  getDirectory: jest.fn().mockResolvedValue({
    values: jest.fn().mockReturnValue([
      {
        kind: "file",
        name: "test.txt",
        getFile: jest.fn().mockResolvedValue({
          size: 100,
          type: "text/plain",
          lastModified: Date.now(),
        }),
      },
      {
        kind: "directory",
        name: "test",
        values: jest.fn().mockReturnValue([]),
      },
    ]),
  }),
}), { virtual: true });

describe("getDirectoryEntriesRecursive", () => {
  afterEach(() => {
    jest.clearAllMocks();
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
