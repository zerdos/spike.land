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
// ReadableStream is available globally in browser environments
import { tryCatch } from "./try-catch";
import { createStats, createBigIntStats, type FileSystemFileEntry } from "./types";

/**
 * FileHandle implementation that wraps the OPFS FileSystemFileHandle
 */
class FileHandleImpl implements FileHandle {
  readonly fd: number;
  private _path: string;

  constructor(private fileHandle: FileSystemFileHandle, path: string) {
    this.fd = Math.floor(Math.random() * 1000000);
    this._path = path;
  }

  /**
   * Close the file handle
   * In OPFS, there's no explicit close needed
   */
  async close(): Promise<void> {
    return undefined;
  }

  /**
   * Read the entire file
   * Node.js signature: readFile([options])
   */
  readFile(options?: { encoding?: null; flag?: string } | null): Promise<Buffer>;
  readFile(
    options: { encoding: BufferEncoding; flag?: string } | BufferEncoding,
  ): Promise<string>;
  readFile(
    options?: BufferEncoding | (ObjectEncodingOptions & Abortable) | null,
  ): Promise<string | Buffer>;
  async readFile(
    options?: BufferEncoding | (ObjectEncodingOptions & Abortable) | null,
  ): Promise<string | Buffer> {
    const doReadFile = async () => {
      const file = await this.fileHandle.getFile();
      const content = await file.text();

      const encoding = typeof options === "string" ? options : options?.encoding;

      if (encoding === null || encoding === undefined) {
        return Buffer.from(content);
      }
      return content;
    };

    const { data, error } = await tryCatch(doReadFile());
    if (error) {
      console.error("Error in FileHandleImpl.readFile:", error);
      throw error;
    }
    if (data === null || data === undefined) {
      throw new Error("FileHandleImpl.readFile returned null or undefined");
    }
    return data;
  }

  /**
   * Write data to the file
   * Node.js signature: writeFile(data[, options])
   */
  async writeFile(
    data: string | Uint8Array,
    _options?: BufferEncoding | (ObjectEncodingOptions & Abortable) | null,
  ): Promise<void> {
    const doWriteFile = async () => {
      const writable = await this.fileHandle.createWritable();
      await writable.write(data as BufferSource | Blob | string);
      await writable.close();
    };

    const { error } = await tryCatch(doWriteFile());
    if (error) {
      console.error("Error in FileHandleImpl.writeFile:", error);
      throw error;
    }
  }

  /**
   * Append data to the file
   * Node.js signature: appendFile(data[, options])
   */
  async appendFile(
    data: string | Uint8Array,
    options?: BufferEncoding | (ObjectEncodingOptions & Abortable) | null,
  ): Promise<void> {
    const doAppendFile = async () => {
      const existingContent = await this.readFile();
      const appendContent = typeof data === "string" ? data : new TextDecoder().decode(data);
      await this.writeFile(existingContent + appendContent, options);
    };

    const { error } = await tryCatch(doAppendFile());
    if (error) {
      console.error("Error in FileHandleImpl.appendFile:", error);
      throw error;
    }
  }

  /**
   * Change file mode (permissions)
   * @throws Not implemented (OPFS doesn't support permissions)
   */
  async chmod(_mode: Mode): Promise<void> {
    const error = new Error("ENOTSUP: operation not supported, chmod") as NodeJS.ErrnoException;
    error.code = "ENOTSUP";
    error.syscall = "fchmod";
    throw error;
  }

  /**
   * Read data from file into a buffer
   * Node.js signature: read(buffer[, offset[, length[, position]]])
   */
  read<T extends NodeJS.ArrayBufferView>(
    buffer: T,
    offset?: number | null,
    length?: number | null,
    position?: number | null,
  ): Promise<{ bytesRead: number; buffer: T }>;
  read<T extends NodeJS.ArrayBufferView>(
    buffer: T,
    opts?: FileReadOptions,
  ): Promise<FileReadResult<T>>;
  async read<T extends NodeJS.ArrayBufferView>(
    buffer: T,
    offsetOrOpts?: number | null | FileReadOptions,
    length?: number | null,
    position?: number | null,
  ): Promise<{ bytesRead: number; buffer: T } | FileReadResult<T>> {
    const file = await this.fileHandle.getFile();
    const arrayBuffer = await file.arrayBuffer();
    const sourceView = new Uint8Array(arrayBuffer);

    let offset = 0;
    let readLength = buffer.byteLength;
    let readPosition = 0;

    if (offsetOrOpts !== null && offsetOrOpts !== undefined) {
      if (typeof offsetOrOpts === "object") {
        offset = offsetOrOpts.offset ?? 0;
        readLength = offsetOrOpts.length ?? buffer.byteLength;
        const pos = offsetOrOpts.position ?? 0;
        readPosition = typeof pos === "bigint" ? Number(pos) : pos;
      } else {
        offset = offsetOrOpts;
        readLength = length ?? buffer.byteLength;
        readPosition = position ?? 0;
      }
    }

    const targetView = new Uint8Array(
      buffer.buffer,
      buffer.byteOffset + offset,
      Math.min(readLength, buffer.byteLength - offset),
    );

    const bytesToRead = Math.min(
      readLength,
      sourceView.length - readPosition,
      targetView.length,
    );

    for (let i = 0; i < bytesToRead; i++) {
      const srcIndex = readPosition + i;
      targetView[i] = sourceView[srcIndex] ?? 0;
    }

    return {
      bytesRead: bytesToRead,
      buffer,
    };
  }

  /**
   * Change file ownership
   * @throws Not implemented (OPFS doesn't support ownership)
   */
  async chown(_uid: number, _gid: number): Promise<void> {
    const error = new Error("ENOTSUP: operation not supported, chown") as NodeJS.ErrnoException;
    error.code = "ENOTSUP";
    error.syscall = "fchown";
    throw error;
  }

  /**
   * Create a readable stream
   * @throws ENOTSUP - Operation not supported in OPFS
   */
  createReadStream(
    _options?: {
      encoding?: BufferEncoding;
      start?: number;
      end?: number;
      highWaterMark?: number;
    },
  ): ReadStream {
    const error = new Error(
      "ENOTSUP: operation not supported, createReadStream",
    ) as NodeJS.ErrnoException;
    error.code = "ENOTSUP";
    error.syscall = "createReadStream";
    throw error;
  }

  /**
   * Create a writable stream
   * @throws ENOTSUP - Operation not supported in OPFS
   */
  createWriteStream(
    _options?: {
      encoding?: BufferEncoding | null;
      autoClose?: boolean;
      emitClose?: boolean;
      start?: number;
      highWaterMark?: number;
      flush?: boolean;
    },
  ): WriteStream {
    const error = new Error(
      "ENOTSUP: operation not supported, createWriteStream",
    ) as NodeJS.ErrnoException;
    error.code = "ENOTSUP";
    error.syscall = "createWriteStream";
    throw error;
  }

  /**
   * Flush data to storage device
   * In OPFS, writes are immediately persisted, so this is a no-op
   */
  async datasync(): Promise<void> {
    return;
  }

  /**
   * Get file status
   * Node.js signature: stat([options])
   */
  stat(opts?: { bigint?: false }): Promise<Stats>;
  stat(opts: { bigint: true }): Promise<BigIntStats>;
  async stat(opts?: { bigint?: boolean }): Promise<Stats | BigIntStats> {
    const file = await this.fileHandle.getFile();

    const entry: FileSystemFileEntry = {
      name: this.fileHandle.name,
      kind: "file",
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      relativePath: this._path,
      handle: this.fileHandle,
    };

    if (opts?.bigint) {
      return createBigIntStats(entry);
    }

    return createStats(entry);
  }

  /**
   * Flush metadata and data to storage device
   * In OPFS, writes are immediately persisted, so this is a no-op
   */
  async sync(): Promise<void> {
    return;
  }

  /**
   * Truncate the file
   * Node.js signature: truncate([len])
   */
  async truncate(len?: number): Promise<void> {
    const content = await this.readFile("utf8");
    await this.writeFile(content.substring(0, len ?? 0));
  }

  /**
   * Change file timestamps
   * @throws Not implemented (OPFS doesn't support setting timestamps)
   */
  async utimes(
    _atime: string | number | Date,
    _mtime: string | number | Date,
  ): Promise<void> {
    const error = new Error("ENOTSUP: operation not supported, utimes") as NodeJS.ErrnoException;
    error.code = "ENOTSUP";
    error.syscall = "futimes";
    throw error;
  }

  /**
   * Get a readable web stream
   * Returns a ReadableStream that streams the file contents
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readableWebStream(_options?: { autoClose?: boolean }): any {
    const fileHandle = this.fileHandle;

    return new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          const file = await fileHandle.getFile();
          const stream = file.stream();
          const reader = stream.getReader();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });
  }

  /**
   * Get a readline interface for the file
   * @throws ENOTSUP - readline module not available in browser environment
   */
  readLines(): Interface {
    const error = new Error(
      "ENOTSUP: operation not supported, readLines",
    ) as NodeJS.ErrnoException;
    error.code = "ENOTSUP";
    error.syscall = "readLines";
    throw error;
  }

  /**
   * Write multiple buffers to the file
   * Node.js signature: writev(buffers[, position])
   */
  async writev(
    buffers: NodeJS.ArrayBufferView[],
    position?: number,
  ): Promise<{ bytesWritten: number; buffers: NodeJS.ArrayBufferView[] }> {
    const totalLength = buffers.reduce((sum, buf) => sum + buf.byteLength, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const buf of buffers) {
      const view = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
      combined.set(view, offset);
      offset += buf.byteLength;
    }

    const writable = await this.fileHandle.createWritable();
    if (position !== undefined) {
      await writable.seek(position);
    }
    await writable.write(combined);
    await writable.close();

    return { bytesWritten: totalLength, buffers };
  }

  /**
   * Read into multiple buffers
   * Node.js signature: readv(buffers[, position])
   */
  async readv(
    buffers: NodeJS.ArrayBufferView[],
    position?: number,
  ): Promise<{ bytesRead: number; buffers: NodeJS.ArrayBufferView[] }> {
    const file = await this.fileHandle.getFile();
    const arrayBuffer = await file.arrayBuffer();
    const source = new Uint8Array(arrayBuffer);

    let currentPos = position ?? 0;
    let totalBytesRead = 0;

    for (const buf of buffers) {
      const target = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
      const bytesToRead = Math.min(target.length, source.length - currentPos);

      if (bytesToRead <= 0) break;

      for (let i = 0; i < bytesToRead; i++) {
        target[i] = source[currentPos + i] ?? 0;
      }

      currentPos += bytesToRead;
      totalBytesRead += bytesToRead;
    }

    return { bytesRead: totalBytesRead, buffers };
  }


  /**
   * Write data to the file
   * Node.js signature: write(buffer[, offset[, length[, position]]])
   *                   write(string[, position[, encoding]])
   */
  write<TBuffer extends Uint8Array>(
    buffer: TBuffer,
    offset?: number | null,
    length?: number | null,
    position?: number | null,
  ): Promise<{ bytesWritten: number; buffer: TBuffer }>;
  write<TBuffer extends Uint8Array>(
    buffer: TBuffer,
    opts?: { offset?: number; length?: number; position?: number },
  ): Promise<{ bytesWritten: number; buffer: TBuffer }>;
  write(
    data: string,
    position?: number | null,
    encoding?: BufferEncoding | null,
  ): Promise<{ bytesWritten: number; buffer: string }>;
  async write(
    data: string | Uint8Array,
    _offsetOrOpts?:
      | number
      | null
      | { offset?: number; length?: number; position?: number },
    _lengthOrEncoding?: number | BufferEncoding | null,
    _position?: number | null,
  ): Promise<{ bytesWritten: number; buffer: string | Uint8Array }> {
    let writeData: Uint8Array;
    if (typeof data === "string") {
      const encoder = new TextEncoder();
      writeData = encoder.encode(data);
    } else {
      writeData = data;
    }

    const doWrite = async () => {
      const writable = await this.fileHandle.createWritable();
      const arrayBuffer = writeData.buffer.slice(
        writeData.byteOffset,
        writeData.byteOffset + writeData.byteLength,
      ) as ArrayBuffer;
      await writable.write(arrayBuffer);
      await writable.close();
      return {
        bytesWritten: writeData.length,
        buffer: data,
      };
    };

    const { data: writeResult, error } = await tryCatch(doWrite());
    if (error) {
      console.error("Error in FileHandleImpl.write:", error);
      throw error;
    }
    if (!writeResult) {
      throw new Error("FileHandleImpl.write did not return a result");
    }
    return writeResult as { bytesWritten: number; buffer: string | Uint8Array };
  }

  /**
   * Async disposable support
   */
  [Symbol.asyncDispose](): Promise<void> {
    return this.close();
  }
}

/**
 * Create a FileHandle implementation
 * @param fileHandle Native FileSystemFileHandle
 * @param path File path
 * @returns FileHandle implementation
 */
export function createFileHandle(
  fileHandle: FileSystemFileHandle,
  path: string,
): FileHandle {
  return new FileHandleImpl(fileHandle, path) as unknown as FileHandle;
}

/**
 * Open a file and return a FileHandle
 * Node.js signature: open(path, flags[, mode])
 * @param path File path
 * @param flags Open flags ('r', 'w', 'w+', 'a', 'a+', 'r+')
 * @param mode File mode (unused in OPFS)
 * @returns FileHandle
 */
export async function open(
  path: string,
  flags: string | number = "r",
  _mode?: Mode,
): Promise<FileHandle> {
  const doOpen = async () => {
    const { getDirectoryHandleAndFileName } = await import("./utils");
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(path);
    if (!fileName) throw new Error("ENOENT: Invalid file path for open");

    const flagStr = typeof flags === "number" ? "r" : flags;
    const create =
      flagStr === "w" ||
      flagStr === "w+" ||
      flagStr === "a" ||
      flagStr === "a+" ||
      flagStr === "wx" ||
      flagStr === "wx+";

    const fileHandle = await dirHandle.getFileHandle(fileName, { create });
    return createFileHandle(fileHandle, path);
  };

  const { data: fileHandle, error } = await tryCatch(doOpen());
  if (error) {
    console.error(`Error opening file ${path}:`, error);
    throw error;
  }
  if (!fileHandle) throw new Error(`ENOENT: Opening file ${path} returned no handle`);
  return fileHandle;
}
