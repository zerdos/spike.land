import { Abortable } from "node:events";
import type {
  BigIntStats,
  BufferEncodingOption,
  Dirent,
  MakeDirectoryOptions,
  Mode,
  ObjectEncodingOptions,
  OpenMode,
  PathLike,
  RmDirOptions,
  RmOptions,
  Stats,
  WriteFileOptions,
} from "node:fs";

/**
 * FileHandle interface that matches Node.js fs.promises.FileHandle
 */
export interface FileHandle {
  appendFile(data: string | Uint8Array, options?: WriteFileOptions): Promise<void>;
  chmod(mode: Mode): Promise<void>;
  chown(uid: number, gid: number): Promise<void>;
  close(): Promise<void>;
  datasync(): Promise<void>;
  fd: number;
  read<TBuffer extends Uint8Array>(
    buffer: TBuffer,
    offset?: number,
    length?: number,
    position?: number,
  ): Promise<{ bytesRead: number; buffer: TBuffer; }>;
  readFile(options?: { encoding?: null; flag?: OpenMode; } & Abortable): Promise<Buffer>;
  readFile(options: { encoding: BufferEncoding; flag?: OpenMode; } & Abortable): Promise<string>;
  readFile(
    options?: { encoding?: BufferEncoding | null; flag?: OpenMode; } & Abortable,
  ): Promise<string | Buffer>;
  stat(options?: { bigint?: false; } & Abortable): Promise<Stats>;
  stat(options: { bigint: true; } & Abortable): Promise<BigIntStats>;
  sync(): Promise<void>;
  truncate(len?: number): Promise<void>;
  utimes(atime: string | number | Date, mtime: string | number | Date): Promise<void>;
  write(
    buffer: Uint8Array,
    offset?: number,
    length?: number,
    position?: number,
  ): Promise<{ bytesWritten: number; buffer: Uint8Array; }>;
  write(
    data: string,
    position?: number,
    encoding?: BufferEncoding,
  ): Promise<{ bytesWritten: number; buffer: string; }>;
  writeFile(data: string | Uint8Array, options?: WriteFileOptions): Promise<void>;
}

/**
 * FSModule interface that matches Node.js fs.promises
 */
export interface FSModule {
  access(path: PathLike, mode?: number): Promise<void>;
  appendFile(
    path: PathLike | FileHandle,
    data: string | Uint8Array,
    options?: WriteFileOptions,
  ): Promise<void>;
  chmod(path: PathLike, mode: Mode): Promise<void>;
  chown(path: PathLike, uid: number, gid: number): Promise<void>;
  copyFile(src: PathLike, dest: PathLike, flags?: number): Promise<void>;
  lchmod(path: PathLike, mode: Mode): Promise<void>;
  lchown(path: PathLike, uid: number, gid: number): Promise<void>;
  link(existingPath: PathLike, newPath: PathLike): Promise<void>;
  lstat(path: PathLike, options?: { bigint?: false; } & Abortable): Promise<Stats>;
  lstat(path: PathLike, options: { bigint: true; } & Abortable): Promise<BigIntStats>;
  mkdir(path: PathLike, options: Mode | (MakeDirectoryOptions & Abortable)): Promise<void>;
  mkdtemp(prefix: string, options?: BufferEncodingOption): Promise<Buffer>;
  mkdtemp(prefix: string, options?: ObjectEncodingOptions | BufferEncoding | null): Promise<string>;
  open(path: PathLike, flags: string | number, mode?: Mode): Promise<FileHandle>;
  readdir(
    path: PathLike,
    options?: { encoding?: BufferEncoding | null; withFileTypes?: false; } & Abortable,
  ): Promise<string[]>;
  readdir(
    path: PathLike,
    options: { encoding: "buffer"; withFileTypes?: false; } & Abortable,
  ): Promise<Buffer[]>;
  readdir(
    path: PathLike,
    options?: { encoding?: BufferEncoding | null; withFileTypes?: true; } & Abortable,
  ): Promise<Dirent[]>;
  readFile(
    path: PathLike | FileHandle,
    options?: { encoding?: null; flag?: OpenMode; } & Abortable,
  ): Promise<Buffer>;
  readFile(
    path: PathLike | FileHandle,
    options: { encoding: BufferEncoding; flag?: OpenMode; } & Abortable,
  ): Promise<string>;
  readFile(
    path: PathLike | FileHandle,
    options?: { encoding?: BufferEncoding | null; flag?: OpenMode; } & Abortable,
  ): Promise<string | Buffer>;
  readlink(
    path: PathLike,
    options?: { encoding?: BufferEncoding | null; } & Abortable,
  ): Promise<string>;
  realpath(
    path: PathLike,
    options?: { encoding?: BufferEncoding | null; } & Abortable,
  ): Promise<string>;
  rename(oldPath: PathLike, newPath: PathLike): Promise<void>;
  rmdir(path: PathLike, options?: RmDirOptions & Abortable): Promise<void>;
  stat(path: PathLike, options?: { bigint?: false; } & Abortable): Promise<Stats>;
  stat(path: PathLike, options: { bigint: true; } & Abortable): Promise<BigIntStats>;
  symlink(target: PathLike, path: PathLike, type?: string | null): Promise<void>;
  truncate(path: PathLike, len?: number): Promise<void>;
  unlink(path: PathLike): Promise<void>;
  utimes(
    path: PathLike,
    atime: string | number | Date,
    mtime: string | number | Date,
  ): Promise<void>;
  writeFile(
    path: PathLike | FileHandle,
    data: string | Uint8Array,
    options?: WriteFileOptions,
  ): Promise<void>;
}

/**
 * Custom types for our implementation
 */
export type FileSystemEntry = Partial<FileSystemHandle> & { relativePath: string; };

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
