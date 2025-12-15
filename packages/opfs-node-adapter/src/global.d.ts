// Type declarations for File System Access API extensions
// These extend the standard DOM types to include the entries() method

declare global {
  interface FileSystemDirectoryHandle {
    entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
    keys(): AsyncIterableIterator<string>;
    values(): AsyncIterableIterator<FileSystemHandle>;
    [Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemHandle]>;
  }

  interface StorageManager {
    getDirectory(): Promise<FileSystemDirectoryHandle>;
  }
}

export {};
