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
    const file = await this.fileHandle.getFile();
    const content = await file.text();
    if (!options) {
      return Buffer.from(content);
    }
    if (typeof options === "string" || (options && "encoding" in options)) {
      return content;
    }
    return Buffer.from(content);
  }

  async writeFile(
    data: string | Uint8Array,
    _options?: BufferEncoding | (ObjectEncodingOptions & Abortable) | null,
  ): Promise<void> {
    const writable = await this.fileHandle.createWritable();
    await writable.write(data);
    await writable.close();
  }

  async appendFile(
    data: string | Uint8Array,
    options?: BufferEncoding | (ObjectEncodingOptions & Abortable) | null,
  ): Promise<void> {
    const existingContent = await this.readFile();
    await this.writeFile(existingContent + data.toString(), options);
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

    if (_offsetOrOpts && typeof _offsetOrOpts === "object") {
      // Handle options object
    }

    const writable = await this.fileHandle.createWritable();
    await writable.write(data);
    await writable.close();

    return {
      bytesWritten: data.length,
      buffer: data,
    };
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
  const { getDirectoryHandleAndFileName } = await import("./utils");
  const { dirHandle, fileName } = await getDirectoryHandleAndFileName(path);
  if (!fileName) throw new Error("Invalid file path");

  const create = flags === "w" || flags === "w+" || flags === "a" ||
    flags === "a+";
  const fileHandle = await dirHandle.getFileHandle(fileName, { create });

  return createFileHandle(fileHandle, path);
};
