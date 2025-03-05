import { vi } from "vitest";

// Define mock types that match the File System Access API
export interface MockFileSystemFile {
  kind: "file";
  name: string;
  getFile: () => Promise<{
    size: number;
    type: string;
    lastModified: number;
    text: () => Promise<string>;
  }>;
  createWritable: () => Promise<{
    write: (content: string) => Promise<void>;
    close: () => Promise<void>;
  }>;
}

export interface MockFileSystemDirectory {
  kind: "directory";
  name: string;
  getDirectoryHandle: (name: string, options?: { create?: boolean }) => Promise<MockFileSystemDirectory>;
  getFileHandle: (name: string, options?: { create?: boolean }) => Promise<MockFileSystemFile>;
  entries: () => AsyncGenerator<[string, MockFileSystemEntry], void, unknown>;
  removeEntry: (name: string) => Promise<void>;
}

export type MockFileSystemEntry = MockFileSystemFile | MockFileSystemDirectory;

// Create mock file system entries
export const mockFileSystem: Record<string, MockFileSystemEntry> = {
  "test.txt": {
    kind: "file" as const,
    name: "test.txt",
    getFile: vi.fn().mockResolvedValue({
      size: 100,
      type: "text/plain",
      lastModified: Date.now(),
      text: vi.fn().mockResolvedValue("file content"),
    }),
    createWritable: vi.fn().mockResolvedValue({
      write: vi.fn().mockResolvedValue(undefined),
      close: vi.fn().mockResolvedValue(undefined),
    }),
  },
  "test": {
    kind: "directory" as const,
    name: "test",
    getDirectoryHandle: vi.fn().mockImplementation(async (name, options) => {
      if (options?.create) {
        const newDir = {
          kind: "directory" as const,
          name,
          getDirectoryHandle: vi.fn().mockResolvedValue({} as MockFileSystemDirectory),
          getFileHandle: vi.fn().mockResolvedValue({} as MockFileSystemFile),
          entries: vi.fn(async function*(): AsyncGenerator<[string, MockFileSystemEntry], void, unknown> {
            // Empty generator
          }),
          removeEntry: vi.fn().mockResolvedValue(undefined),
        };
        mockFileSystem[name] = newDir;
        return newDir;
      }
      throw new Error("Directory not found");
    }),
    getFileHandle: vi.fn().mockImplementation(async (name, options) => {
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
      throw new Error("File not found");
    }),
    entries: vi.fn(async function*(): AsyncGenerator<[string, MockFileSystemEntry], void, unknown> {
      // Empty generator for test directory
    }),
    removeEntry: vi.fn().mockResolvedValue(undefined),
  },
};

// Create mock root directory handle
export const mockDirectoryHandle: MockFileSystemDirectory = {
  kind: "directory",
  name: "root",
  getDirectoryHandle: vi.fn(async (name, options) => {
    if (mockFileSystem[name]?.kind === "directory") {
      return mockFileSystem[name] as MockFileSystemDirectory;
    }
    if (options?.create) {
      const newDir: MockFileSystemDirectory = {
        kind: "directory",
        name,
        getDirectoryHandle: vi.fn().mockImplementation(async (subName, subOptions) => {
          if (subOptions?.create) {
            const newSubDir: MockFileSystemDirectory = {
              kind: "directory",
              name: subName,
              getDirectoryHandle: vi.fn().mockResolvedValue({} as MockFileSystemDirectory),
              getFileHandle: vi.fn().mockResolvedValue({} as MockFileSystemFile),
              entries: vi.fn(async function*(): AsyncGenerator<[string, MockFileSystemEntry], void, unknown> {
                // Empty generator
              }),
              removeEntry: vi.fn().mockResolvedValue(undefined),
            };
            return newSubDir;
          }
          throw new Error("Directory not found");
        }),
        getFileHandle: vi.fn().mockImplementation(async (subName, subOptions) => {
          if (subOptions?.create) {
            const newFile: MockFileSystemFile = {
              kind: "file",
              name: subName,
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
            return newFile;
          }
          throw new Error("File not found");
        }),
        entries: vi.fn(async function*(): AsyncGenerator<[string, MockFileSystemEntry], void, unknown> {
          // Empty generator
        }),
        removeEntry: vi.fn().mockResolvedValue(undefined),
      };
      mockFileSystem[name] = newDir;
      return newDir;
    }
    throw new Error("Not a directory");
  }),
  getFileHandle: vi.fn(async (name, options) => {
    if (mockFileSystem[name]?.kind === "file") {
      return mockFileSystem[name] as MockFileSystemFile;
    }
    if (options?.create) {
      const newFile: MockFileSystemFile = {
        kind: "file",
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
  }),
  entries: vi.fn(async function*(): AsyncGenerator<[string, MockFileSystemEntry], void, unknown> {
    for (const name in mockFileSystem) {
      yield [name, mockFileSystem[name]];
    }
  }),
  removeEntry: vi.fn(async (name) => {
    if (mockFileSystem[name]) {
      delete mockFileSystem[name];
      return;
    }
    throw new Error(`Entry ${name} not found`);
  }),
};

// Mock navigator.storage
export const mockNavigator = {
  storage: {
    getDirectory: vi.fn().mockResolvedValue(mockDirectoryHandle),
  },
};

// Setup function to reset mocks and file system state
export function setupTest() {
  // Reset mocks
  vi.clearAllMocks();
  
  // Reset the mock file system to a known state
  Object.keys(mockFileSystem).forEach(key => {
    if (key !== "test.txt" && key !== "test") {
      delete mockFileSystem[key];
    }
  });
  
  // Ensure test.txt has expected content
  if (mockFileSystem["test.txt"]?.kind === "file") {
    const fileEntry = mockFileSystem["test.txt"] as MockFileSystemFile;
    fileEntry.getFile = vi.fn().mockResolvedValue({
      size: 100,
      type: "text/plain",
      lastModified: Date.now(),
      text: vi.fn().mockResolvedValue("file content"),
    });
  }
}
