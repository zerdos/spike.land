import type { Abortable } from "node:events";
import type {
  BigIntStats,
  constants as fsConstants,
  Dirent,
  MakeDirectoryOptions,
  Mode,
  ObjectEncodingOptions,
  OpenDirOptions,
  PathLike,
  ReadStream,
  RmDirOptions,
  RmOptions,
  StatOptions,
  Stats,
  TimeLike,
  WatchOptions,
  WriteStream,
} from "node:fs";
import type { FileHandle, FlagAndOpenMode } from "node:fs/promises";

// Re-export Node.js types for consumers
export type {
  BigIntStats,
  Dirent,
  FileHandle,
  MakeDirectoryOptions,
  Mode,
  ObjectEncodingOptions,
  OpenDirOptions,
  PathLike,
  ReadStream,
  RmDirOptions,
  RmOptions,
  StatOptions,
  Stats,
  TimeLike,
  WatchOptions,
  WriteStream,
  FlagAndOpenMode,
};

// Re-export constants type
export type { fsConstants };

/**
 * Buffer encoding types
 */
export type BufferEncodingOption =
  | { encoding?: BufferEncoding | null }
  | BufferEncoding
  | null
  | undefined;

/**
 * Options for readFile
 */
export interface ReadFileOptions extends ObjectEncodingOptions, Abortable {
  flag?: string;
}

/**
 * Options for writeFile
 */
export interface WriteFileOptions extends ObjectEncodingOptions, Abortable {
  mode?: Mode;
  flag?: string;
  flush?: boolean;
}

/**
 * Options for appendFile
 */
export interface AppendFileOptions extends ObjectEncodingOptions, Abortable {
  mode?: Mode;
  flag?: string;
  flush?: boolean;
}

/**
 * Options for readdir
 */
export interface ReaddirOptions extends ObjectEncodingOptions {
  withFileTypes?: boolean;
  recursive?: boolean;
}

/**
 * Copy file constants
 */
export const constants = {
  COPYFILE_EXCL: 1,
  COPYFILE_FICLONE: 2,
  COPYFILE_FICLONE_FORCE: 4,
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
} as const;

/**
 * Custom types for our OPFS implementation
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
 * StatResult type for stat operation (internal use)
 */
export type StatResult = FileSystemFileEntry | FileSystemDirectoryEntry | null;

/**
 * Type for global object with files
 */
export type GlobalWithFiles = Record<string, string>;

/**
 * CopyFile options
 */
export interface CopyFileOptions {
  mode?: number;
}

/**
 * Cp options (recursive copy)
 */
export interface CpOptions {
  dereference?: boolean;
  errorOnExist?: boolean;
  filter?: (source: string, destination: string) => boolean | Promise<boolean>;
  force?: boolean;
  mode?: number;
  preserveTimestamps?: boolean;
  recursive?: boolean;
  verbatimSymlinks?: boolean;
}

/**
 * Watch event types
 */
export type WatchEventType = "rename" | "change";

/**
 * FSWatcher interface
 */
export interface FSWatcher extends AsyncIterable<{ eventType: WatchEventType; filename: string | null }> {
  close(): Promise<void>;
  ref(): FSWatcher;
  unref(): FSWatcher;
}

/**
 * OpenDir result
 */
export interface DirInterface extends AsyncIterable<Dirent> {
  close(): Promise<void>;
  closeSync(): void;
  path: string;
  read(): Promise<Dirent | null>;
  readSync(): Dirent | null;
}

/**
 * Extended ErrnoException with dest property for link/symlink operations
 */
export interface LinkErrnoException extends NodeJS.ErrnoException {
  dest?: string;
}

/**
 * Create a "not implemented yet" error with consistent message
 */
export function notImplementedError(methodName: string): Error {
  return new Error(`OPFS adapter: ${methodName} is not implemented yet`);
}

/**
 * Create a Stats-like object from OPFS file info
 */
export function createStats(entry: FileSystemFileEntry | FileSystemDirectoryEntry): Stats {
  const isFile = entry.kind === "file";
  const isDirectory = entry.kind === "directory";
  const size = isFile ? (entry as FileSystemFileEntry).size : 0;
  const mtime = isFile ? new Date((entry as FileSystemFileEntry).lastModified) : new Date();

  return {
    isFile: () => isFile,
    isDirectory: () => isDirectory,
    isBlockDevice: () => false,
    isCharacterDevice: () => false,
    isSymbolicLink: () => false,
    isFIFO: () => false,
    isSocket: () => false,
    dev: 0,
    ino: 0,
    mode: isDirectory ? 0o40755 : 0o100644,
    nlink: 1,
    uid: 0,
    gid: 0,
    rdev: 0,
    size,
    blksize: 4096,
    blocks: Math.ceil(size / 512),
    atimeMs: mtime.getTime(),
    mtimeMs: mtime.getTime(),
    ctimeMs: mtime.getTime(),
    birthtimeMs: mtime.getTime(),
    atime: mtime,
    mtime: mtime,
    ctime: mtime,
    birthtime: mtime,
  } as Stats;
}

/**
 * Create a BigIntStats-like object from OPFS file info
 */
export function createBigIntStats(entry: FileSystemFileEntry | FileSystemDirectoryEntry): BigIntStats {
  const isFile = entry.kind === "file";
  const isDirectory = entry.kind === "directory";
  const size = isFile ? BigInt((entry as FileSystemFileEntry).size) : 0n;
  const mtime = isFile ? new Date((entry as FileSystemFileEntry).lastModified) : new Date();
  const mtimeNs = BigInt(mtime.getTime()) * 1000000n;

  return {
    isFile: () => isFile,
    isDirectory: () => isDirectory,
    isBlockDevice: () => false,
    isCharacterDevice: () => false,
    isSymbolicLink: () => false,
    isFIFO: () => false,
    isSocket: () => false,
    dev: 0n,
    ino: 0n,
    mode: isDirectory ? 0o40755n : 0o100644n,
    nlink: 1n,
    uid: 0n,
    gid: 0n,
    rdev: 0n,
    size,
    blksize: 4096n,
    blocks: size / 512n,
    atimeMs: BigInt(mtime.getTime()),
    mtimeMs: BigInt(mtime.getTime()),
    ctimeMs: BigInt(mtime.getTime()),
    birthtimeMs: BigInt(mtime.getTime()),
    atimeNs: mtimeNs,
    mtimeNs: mtimeNs,
    ctimeNs: mtimeNs,
    birthtimeNs: mtimeNs,
    atime: mtime,
    mtime: mtime,
    ctime: mtime,
    birthtime: mtime,
  } as BigIntStats;
}

/**
 * Create a Dirent-like object
 */
export function createDirent(name: string, isFile: boolean, parentPath: string): Dirent {
  return {
    name,
    parentPath,
    path: `${parentPath}/${name}`,
    isFile: () => isFile,
    isDirectory: () => !isFile,
    isBlockDevice: () => false,
    isCharacterDevice: () => false,
    isSymbolicLink: () => false,
    isFIFO: () => false,
    isSocket: () => false,
  } as Dirent;
}
