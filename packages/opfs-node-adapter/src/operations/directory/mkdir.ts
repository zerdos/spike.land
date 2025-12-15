import type { MakeDirectoryOptions } from "node:fs";
import { tryCatch } from "../../try-catch";
import { normalizePath } from "../../utils";

/**
 * Create a directory
 * Node.js signature: mkdir(path[, options])
 * @param filePath Path to directory
 * @param options Optional mode or recursive option
 * @returns undefined or the first path created if recursive
 */
export async function mkdir(
  filePath: string,
  options?: MakeDirectoryOptions | number,
): Promise<string | undefined> {
  const recursive = typeof options === "object" && options?.recursive === true;

  const doMkdir = async (): Promise<string | undefined> => {
    const normalizedPath = normalizePath(filePath);
    const pathParts = normalizedPath.split("/").filter((x) => x);
    const folderName = pathParts.pop();

    if (!folderName) throw new Error("ENOENT: Invalid directory path for mkdir");

    let currentHandle = await navigator.storage.getDirectory();
    let firstCreated: string | undefined;
    let currentPath = "";

    for (const part of pathParts) {
      currentPath += `/${part}`;
      const { data: existingHandle, error } = await tryCatch(
        currentHandle.getDirectoryHandle(part, { create: false }),
      );

      if (error || !existingHandle) {
        if (!recursive) {
          throw new Error(`ENOENT: no such file or directory, mkdir '${currentPath}'`);
        }
        currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
        if (!firstCreated) firstCreated = currentPath;
      } else {
        currentHandle = existingHandle;
      }
    }

    currentPath += `/${folderName}`;
    const { error: finalError } = await tryCatch(
      currentHandle.getDirectoryHandle(folderName, { create: false }),
    );

    if (finalError) {
      await currentHandle.getDirectoryHandle(folderName, { create: true });
      if (!firstCreated) firstCreated = currentPath;
    }

    return recursive ? firstCreated : undefined;
  };

  const { data, error } = await tryCatch(doMkdir());
  if (error) {
    console.error(`Error creating directory ${filePath}:`, error);
    throw error;
  }
  return data;
}
