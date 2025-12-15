import type { RmDirOptions } from "node:fs";
import { tryCatch } from "../../try-catch";
import { normalizePath } from "../../utils";

/**
 * Remove a directory
 * Node.js signature: rmdir(path[, options])
 * @param filePath Path to directory
 * @param options Optional recursive option (deprecated, use rm instead)
 */
export async function rmdir(
  filePath: string,
  options?: RmDirOptions,
): Promise<void> {
  const recursive = options?.recursive ?? true;

  const doRmdir = async () => {
    const normalizedPath = normalizePath(filePath);
    const pathParts = normalizedPath.split("/").filter((x) => x);

    if (pathParts.length === 0) throw new Error("EPERM: Cannot remove root directory");

    const dirName = pathParts.pop();
    if (!dirName) throw new Error("ENOENT: Invalid directory path for rmdir");

    let currentHandle = await navigator.storage.getDirectory();

    for (const part of pathParts) {
      currentHandle = await currentHandle.getDirectoryHandle(part, { create: false });
    }

    await currentHandle.removeEntry(dirName, { recursive });
  };

  const { error } = await tryCatch(doRmdir());
  if (error) {
    console.error(`Error removing directory ${filePath}:`, error);
    throw error;
  }
}
