import type { Dirent } from "node:fs";
import { tryCatch } from "../../try-catch";
import type { ReaddirOptions } from "../../types";
import { createDirent } from "../../types";
import { getDirectoryHandleAndFileName, getDirectoryEntriesRecursive } from "../../utils";

/**
 * List directory contents
 * Node.js signature: readdir(path[, options])
 * @param filePath Path to directory
 * @param options Optional encoding/withFileTypes options
 * @returns Array of file names or Dirent objects
 */
export function readdir(
  filePath: string,
  options?: ReaddirOptions | BufferEncoding | null,
): Promise<string[]>;
export function readdir(
  filePath: string,
  options: ReaddirOptions & { withFileTypes: true },
): Promise<Dirent[]>;
export function readdir(
  filePath: string,
  options: ReaddirOptions & { withFileTypes?: false },
): Promise<string[]>;
export async function readdir(
  filePath: string,
  options?: ReaddirOptions | BufferEncoding | null,
): Promise<string[] | Dirent[]> {
  const withFileTypes = typeof options === "object" && options?.withFileTypes === true;

  const doReaddir = async () => {
    const { dirHandle } = await getDirectoryHandleAndFileName(filePath);
    const entries = await getDirectoryEntriesRecursive(dirHandle);

    if (withFileTypes) {
      return Object.entries(entries).map(([name, entry]) => {
        const isFile = entry.kind === "file";
        return createDirent(name, isFile, filePath);
      });
    }

    return Object.keys(entries);
  };

  const { data, error } = await tryCatch(doReaddir());
  if (error) {
    console.error(`Error reading directory ${filePath}:`, error);
    return [];
  }
  return data || [];
}
