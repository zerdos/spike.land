import { tryCatch } from "../try-catch";
import type { StatResult } from "./types";
import { getDirectoryHandleAndFileName, handleDirectory, handleFile, normalizePath } from "./utils";

/**
 * List directory contents
 * @param filePath Path to directory
 * @returns Array of file and directory names
 */
export const readdir = async (filePath: string): Promise<string[]> => {
  const doReaddir = async () => {
    const { dirHandle } = await getDirectoryHandleAndFileName(filePath);
    const entries = await import("./utils").then((m) => m.getDirectoryEntriesRecursive(dirHandle));
    return Object.keys(entries);
  };
  const { data, error } = await tryCatch(doReaddir());
  if (error) {
    console.error(`Error reading directory ${filePath}:`, error);
    return []; // Return empty array on error as per original logic
  }
  return data || [];
};

/**
 * Create a directory
 * @param filePath Path to directory
 */
export const mkdir = async (filePath: string): Promise<void> => {
  const doMkdir = async () => {
    const normalizedPath = normalizePath(filePath);
    const pathParts = normalizedPath.split("/").filter((x) => x);
    const folderName = pathParts.pop();

    if (!folderName) throw new Error("Invalid directory path for mkdir");

    let currentHandle = await navigator.storage.getDirectory();

    for (const part of pathParts) {
      currentHandle = await currentHandle.getDirectoryHandle(part, {
        create: true,
      });
    }
    await currentHandle.getDirectoryHandle(folderName, { create: true });
  };
  const { error } = await tryCatch(doMkdir());
  if (error) {
    console.error(`Error creating directory ${filePath}:`, error);
    throw error;
  }
};

/**
 * Remove a directory
 * @param filePath Path to directory
 */
export const rmdir = async (filePath: string): Promise<void> => {
  const doRmdir = async () => {
    const normalizedPath = normalizePath(filePath);
    const pathParts = normalizedPath.split("/").filter((x) => x);

    if (pathParts.length === 0) throw new Error("Cannot remove root directory");

    const dirName = pathParts.pop();
    if (!dirName) throw new Error("Invalid directory path for rmdir");

    let currentHandle = await navigator.storage.getDirectory();

    for (const part of pathParts) {
      currentHandle = await currentHandle.getDirectoryHandle(part, {
        create: false, // Important: should be false for rmdir parent lookup
      });
    }
    await currentHandle.removeEntry(dirName, { recursive: true });
  };
  const { error } = await tryCatch(doRmdir());
  if (error) {
    console.error(`Error removing directory ${filePath}:`, error);
    throw error;
  }
};

/**
 * Get file or directory information
 * @param filePath Path to file or directory
 * @returns File or directory information
 */
export const stat = async (filePath: string): Promise<StatResult> => {
  const doStat = async (): Promise<StatResult> => {
    const normalizedPath = normalizePath(filePath);

    if (normalizedPath === "") {
      const rootHandle = await navigator.storage.getDirectory();
      return handleDirectory(rootHandle, "/");
    }

    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(
      filePath,
    );

    if (!fileName) {
      return handleDirectory(dirHandle, filePath);
    }

    // Try to get as file first
    const { data: fileHandle, error: fileError } = await tryCatch(
      dirHandle.getFileHandle(fileName),
    );
    if (fileHandle) {
      return handleFile(fileHandle, filePath);
    }

    // If not a file, try as directory
    const { data: subDirHandle, error: dirError } = await tryCatch(
      dirHandle.getDirectoryHandle(fileName),
    );
    if (subDirHandle) {
      return handleDirectory(subDirHandle, filePath);
    }
    // If neither file nor directory, log errors and return null
    console.warn(
      `stat: Could not find ${filePath} as file or directory. File error: ${fileError}, Dir error: ${dirError}`,
    );
    return null;
  };

  // The outermost tryCatch is to catch errors from getDirectoryHandleAndFileName or if path is truly invalid
  const { data, error } = await tryCatch(doStat());
  if (error) {
    console.warn(`Error in stat for ${filePath}:`, error); // Use warn as it might be a "file not found" scenario
    return null;
  }
  return data;
};

/**
 * Check if a file or directory exists and is accessible
 * @param filePath Path to check
 * @param mode Access mode (not used in this implementation)
 */
export const access = async (
  filePath: string,
  _mode?: number,
): Promise<void> => {
  const statResult = await stat(filePath);
  if (statResult === null) {
    throw new Error(`ENOENT: no such file or directory, access '${filePath}'`);
  }
};

/**
 * Get current working directory
 * @returns Root directory "/"
 */
export const cwd = async (): Promise<string> => "/";
