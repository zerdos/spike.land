export type { FileHandle } from "node:fs/promises";

/**
 * Custom types for our implementation
 */
export type FileSystemEntry = Partial<FileSystemHandle> & {
  relativePath: string;
};

/**
 * FileSystemFileEntry type for file stats
 */
export interface FileSystemFileEntry {
  name: string;
  kind: "file";
  size: number;
  type: string;
  lastModified: number;
  relativePath: string;
  handle: FileSystemFileHandle;
}

/**
 * FileSystemDirectoryEntry type for directory stats
 */
export interface FileSystemDirectoryEntry {
  name: string;
  kind: "directory";
  relativePath: string;
  entries: Record<string, FileSystemEntry>;
  handle: FileSystemDirectoryHandle;
}

/**
 * StatResult type for stat operation
 */
export type StatResult = FileSystemFileEntry | FileSystemDirectoryEntry | null;

/**
 * Type for global object with files
 */
export type GlobalWithFiles = Record<string, string>;
