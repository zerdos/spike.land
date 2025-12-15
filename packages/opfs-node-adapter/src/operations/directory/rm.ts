import type { RmOptions } from "node:fs";
import { tryCatch } from "../../try-catch";
import { normalizePath } from "../../utils";

/**
 * Remove a file or directory
 * Node.js signature: rm(path[, options])
 * @param path Path to remove
 * @param options Remove options
 */
export async function rm(
  path: string,
  options?: RmOptions,
): Promise<void> {
  const recursive = options?.recursive ?? false;
  const force = options?.force ?? false;

  const doRm = async () => {
    const normalizedPath = normalizePath(path);
    const pathParts = normalizedPath.split("/").filter((x) => x);

    if (pathParts.length === 0) throw new Error("EPERM: Cannot remove root directory");

    const entryName = pathParts.pop();
    if (!entryName) throw new Error("ENOENT: Invalid path for rm");

    let currentHandle = await navigator.storage.getDirectory();

    for (const part of pathParts) {
      currentHandle = await currentHandle.getDirectoryHandle(part, { create: false });
    }

    await currentHandle.removeEntry(entryName, { recursive });
  };

  const { error } = await tryCatch(doRm());
  if (error) {
    if (force && (error as Error).message?.includes("NotFoundError")) {
      return;
    }
    console.error(`Error removing ${path}:`, error);
    throw error;
  }
}
