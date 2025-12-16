import type { Dirent } from "node:fs";
import { tryCatch } from "../../try-catch";
import type { DirInterface, OpenDirOptions } from "../../types";
import { createDirent } from "../../types";
import { getDirectoryHandleAndFileName, getDirectoryEntriesRecursive } from "../../utils";

/**
 * Dir class that implements the DirInterface
 * Provides iteration over directory entries
 */
class Dir implements DirInterface {
  private entries: Dirent[];
  private currentIndex: number = 0;
  private closed: boolean = false;
  public readonly path: string;

  constructor(path: string, entries: Dirent[]) {
    this.path = path;
    this.entries = entries;
  }

  async read(): Promise<Dirent | null> {
    if (this.closed) {
      throw new Error("Directory handle is closed");
    }

    if (this.currentIndex >= this.entries.length) {
      return null;
    }

    const entry = this.entries[this.currentIndex++];
    return entry ?? null;
  }

  readSync(): Dirent | null {
    throw new Error("readSync is not supported in async OPFS context");
  }

  async close(): Promise<void> {
    this.closed = true;
    this.entries = [];
    this.currentIndex = 0;
  }

  closeSync(): void {
    throw new Error("closeSync is not supported in async OPFS context");
  }

  [Symbol.asyncIterator](): AsyncIterator<Dirent> {
    return {
      next: async (): Promise<IteratorResult<Dirent>> => {
        const entry = await this.read();
        if (entry === null) {
          return { done: true, value: undefined };
        }
        return { done: false, value: entry };
      },
    };
  }
}

/**
 * Open a directory for reading
 * Node.js signature: opendir(path[, options])
 * @param path Path to directory
 * @param options Optional encoding and buffer size options
 * @returns Dir object for iterating directory entries
 */
export async function opendir(
  path: string,
  _options?: OpenDirOptions,
): Promise<DirInterface> {
  const doOpendir = async () => {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(path);

    let targetHandle: FileSystemDirectoryHandle = dirHandle;

    if (fileName) {
      targetHandle = await dirHandle.getDirectoryHandle(fileName);
    }

    const entries = await getDirectoryEntriesRecursive(targetHandle);

    const direntEntries = Object.entries(entries).map(([name, entry]) => {
      const isFile = entry.kind === "file";
      return createDirent(name, isFile, path);
    });

    return new Dir(path, direntEntries);
  };

  const { data, error } = await tryCatch(doOpendir());
  if (error) {
    console.error(`Error opening directory ${path}:`, error);
    throw error;
  }
  if (!data) {
    throw new Error(`Opening directory ${path} returned no data`);
  }
  return data;
}
