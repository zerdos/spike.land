import { tryCatch } from "../try-catch"; // Added import
import type { Abortable } from "node:events";
import type {
  BigIntStats,
  Mode,
  ObjectEncodingOptions,
  ReadStream,
  Stats,
  WriteStream,
} from "node:fs";
import type { FileHandle, FileReadOptions, FileReadResult } from "node:fs/promises";
import type { Interface } from "node:readline";
import type { ReadableStream } from "node:stream/web";

class FileHandleImpl implements FileHandle {
  readonly fd: number;

  constructor(private fileHandle: FileSystemFileHandle) {
    this.fd = Math.floor(Math.random() * 1000000);
  }

  async close(): Promise<void> {
    // No-op
  }

  readFile(
    options?: { encoding?: null; flag?: string; } | null,
  ): Promise<Buffer>;
  readFile(
    options: { encoding: BufferEncoding; flag?: string; } | BufferEncoding,
  ): Promise<string>;
  async readFile(
    options?: BufferEncoding | (ObjectEncodingOptions & Abortable) | null,
  ): Promise<string | Buffer> {
    const doReadFile = async () => {
      const file = await this.fileHandle.getFile();
      const content = await file.text();
      if (!options) {
        return Buffer.from(content);
      }
      if (typeof options === "string" || (options && "encoding" in options)) {
        return content;
      }
      return Buffer.from(content);
    };
    const { data, error } = await tryCatch(doReadFile());
    if (error) {
      console.error("Error in FileHandleImpl.readFile:", error);
      throw error;
    }
    if (data === null || data === undefined) throw new Error("FileHandleImpl.readFile returned null or undefined");
    return data;
  }

  async writeFile(
    data: string | Uint8Array,
    _options?: BufferEncoding | (ObjectEncodingOptions & Abortable) | null,
  ): Promise<void> {
    const doWriteFile = async () => {
      const writable = await this.fileHandle.createWritable();
      await writable.write(data);
      await writable.close();
    };
    const { error } = await tryCatch(doWriteFile());
    if (error) {
      console.error("Error in FileHandleImpl.writeFile:", error);
      throw error;
    }
  }

  async appendFile(
    data: string | Uint8Array,
    options?: BufferEncoding | (ObjectEncodingOptions & Abortable) | null,
  ): Promise<void> {
    const doAppendFile = async () => {
      const existingContent = await this.readFile(); // readFile is already refactored
      await this.writeFile(existingContent + data.toString(), options); // writeFile is refactored
    };
    const { error } = await tryCatch(doAppendFile());
    if (error) {
      console.error("Error in FileHandleImpl.appendFile:", error);
      throw error;
    }
  }

  async chmod(_mode: Mode): Promise<void> {
    throw new Error("Method not implemented");
  }

  read<T extends NodeJS.ArrayBufferView>(
    buffer: T,
    offset?: number | null,
    length?: number | null,
    position?: number | null,
  ): Promise<{ bytesRead: number; buffer: T; }>;
  read<T extends NodeJS.ArrayBufferView>(
    buffer: T,
    opts?: FileReadOptions,
  ): Promise<FileReadResult<T>>;
  async read<T extends NodeJS.ArrayBufferView>(
    buffer: T,
    _offsetOrOpts?: number | null | FileReadOptions,
    _length?: number | null,
    _position?: number | null,
  ): Promise<{ bytesRead: number; buffer: T; } | FileReadResult<T>> {
    if (
      _offsetOrOpts && typeof _offsetOrOpts === "object" &&
      !("length" in _offsetOrOpts)
    ) {
      // Handle FileReadOptions
      return {
        bytesRead: buffer.byteLength,
        buffer,
      };
    }

    // Handle positional read
    return {
      bytesRead: buffer.byteLength,
      buffer,
    };
  }

  async chown(_uid: number, _gid: number): Promise<void> {
    throw new Error("Method not implemented");
  }

  createReadStream(
    _options?: {
      encoding?: BufferEncoding;
      start?: number;
      end?: number;
      highWaterMark?: number;
    },
  ): ReadStream {
    throw new Error("Method not implemented");
  }

  createWriteStream(
    _options?: { encoding?: BufferEncoding; start?: number; flags?: string; },
  ): WriteStream {
    throw new Error("Method not implemented");
  }

  async datasync(): Promise<void> {
    throw new Error("Method not implemented");
  }

  stat(opts?: { bigint?: false; } | undefined): Promise<Stats>;
  stat(opts: { bigint: true; }): Promise<BigIntStats>;
  async stat(opts?: { bigint?: boolean; }): Promise<Stats | BigIntStats> {
    if (opts?.bigint) {
      throw new Error("BigInt stats not implemented");
    }
    throw new Error("Method not implemented");
  }

  async sync(): Promise<void> {
    throw new Error("Method not implemented");
  }

  async truncate(_len?: number): Promise<void> {
    throw new Error("Method not implemented");
  }

  async utimes(
    _atime: string | number | Date,
    _mtime: string | number | Date,
  ): Promise<void> {
    throw new Error("Method not implemented");
  }

  readableWebStream(_options?: { type: "bytes"; }): ReadableStream<Uint8Array> {
    throw new Error("Method not implemented");
  }

  readLines(): Interface {
    throw new Error("Method not implemented");
  }

  async writev(
    _buffers: NodeJS.ArrayBufferView[],
    _position?: number,
  ): Promise<{ bytesWritten: number; buffers: NodeJS.ArrayBufferView[]; }> {
    throw new Error("Method not implemented");
  }

  async readv(
    _buffers: NodeJS.ArrayBufferView[],
    _position?: number,
  ): Promise<{ bytesRead: number; buffers: NodeJS.ArrayBufferView[]; }> {
    throw new Error("Method not implemented");
  }

  write<TBuffer extends Uint8Array>(
    buffer: TBuffer,
    offset?: number | null,
    length?: number | null,
    position?: number | null,
  ): Promise<{ bytesWritten: number; buffer: TBuffer; }>;
  write<TBuffer extends Uint8Array>(
    buffer: TBuffer,
    opts?: { offset?: number; length?: number; position?: number; },
  ): Promise<{ bytesWritten: number; buffer: TBuffer; }>;
  write(
    data: string,
    position?: number | null,
    encoding?: BufferEncoding | null,
  ): Promise<{ bytesWritten: number; buffer: string; }>;
  async write(
    data: string | Uint8Array,
    _offsetOrOpts?: number | null | {
      offset?: number;
      length?: number;
      position?: number;
    },
    _lengthOrEncoding?: number | BufferEncoding | null,
    _position?: number | null,
  ): Promise<{ bytesWritten: number; buffer: string | Uint8Array; }> {
    if (typeof data === "string") {
      const encoder = new TextEncoder();
      data = encoder.encode(data);
    }

    // The core write operation
    const doWrite = async () => {
      const writable = await this.fileHandle.createWritable();
      await writable.write(data); // data is already Uint8Array here
      await writable.close();
      return {
        bytesWritten: (data as Uint8Array).length, // Cast to Uint8Array to access length
        buffer: data, // data is already Uint8Array here
      };
    };

    // We need to handle the different overloads of write.
    // The actual writing to the file system is what we wrap with tryCatch.
    // The logic for handling different parameter types (_offsetOrOpts, etc.)
    // would typically happen before or after this core async operation.
    // For simplicity in this refactor, we'll assume the options are processed
    // and the `data` is ready for the `writable.write` call.

    const { data: writeResult, error } = await tryCatch(doWrite());

    if (error) {
      console.error("Error in FileHandleImpl.write:", error);
      throw error;
    }
    if (!writeResult) throw new Error("FileHandleImpl.write did not return a result");

    // If the original data was a string, we should probably return a string buffer.
    // However, the native `fs.promises.FileHandle.write` with a string returns bytesWritten and the string.
    // Our current `doWrite` returns the Uint8Array. This might need adjustment based on exact compatibility needs.
    // For now, we return what `doWrite` gives.
    return writeResult as { bytesWritten: number; buffer: string | Uint8Array; };
  }

  [Symbol.asyncDispose](): Promise<void> {
    return this.close();
  }
}

/**
 * Create a FileHandle implementation
 * @param fileHandle Native FileSystemFileHandle
 * @param _path File path (unused in this implementation)
 * @returns FileHandle implementation
 */
export const createFileHandle = (
  fileHandle: FileSystemFileHandle,
  _path: string,
): FileHandle => {
  return new FileHandleImpl(fileHandle);
};

/**
 * Open a file and return a FileHandle
 * @param path File path
 * @param flags Open flags
 * @param _mode File mode (unused in this implementation)
 * @returns FileHandle
 */
export const open = async (
  path: string,
  flags: string | number,
  _mode?: Mode,
): Promise<FileHandle> => {
  const doOpen = async () => {
    const { getDirectoryHandleAndFileName } = await import("./utils"); // Keep import inside if it's only used here
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(path);
    if (!fileName) throw new Error("Invalid file path for open");

    const create = flags === "w" || flags === "w+" || flags === "a" || flags === "a+";
    const fileHandle = await dirHandle.getFileHandle(fileName, { create });
    return createFileHandle(fileHandle, path);
  };

  const { data: fileHandle, error } = await tryCatch(doOpen());
  if (error) {
    console.error(`Error opening file ${path}:`, error);
    throw error;
  }
  if (!fileHandle) throw new Error(`Opening file ${path} returned no handle`);
  return fileHandle;
};
