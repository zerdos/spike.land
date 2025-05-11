import { tryCatch } from "../try-catch";
import type { FileSystemDirectoryEntry, FileSystemEntry, FileSystemFileEntry } from "./types";

/**
 * Normalize a file path to handle different formats
 * @param filePath Path to normalize
 * @returns Normalized path
 */
export const normalizePath = (filePath: string): string => {
  // Remove leading slash if present
  let normalizedPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;

  // Remove trailing slash if present
  normalizedPath = normalizedPath.endsWith("/")
    ? normalizedPath.slice(0, -1)
    : normalizedPath;

  return normalizedPath;
};

/**
 * Process a file handle and return file information
 * @param handle FileSystemFileHandle to process
 * @param nestedPath Path to the file
 * @returns File information
 */
export const handleFile = async (
  handle: FileSystemFileHandle,
  nestedPath: string,
): Promise<FileSystemFileEntry> => {
  const doGetFile = async () => {
    const file = await handle.getFile();
    return {
      name: handle.name,
      kind: handle.kind,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      relativePath: nestedPath,
      handle,
    };
  };
  const { data, error } = await tryCatch(doGetFile());
  if (error) {
    console.error(`Error handling file ${nestedPath}:`, error);
    throw error;
  }
  if (!data) throw new Error(`Handling file ${nestedPath} returned no data`);
  return data;
};

/**
 * Process a directory handle and return directory information
 * @param handle FileSystemDirectoryHandle to process
 * @param nestedPath Path to the directory
 * @returns Directory information
 */
export const handleDirectory = async (
  handle: FileSystemDirectoryHandle,
  nestedPath = "",
): Promise<FileSystemDirectoryEntry> => {
  const doGetEntries = async () => {
    // Corrected return structure for handleDirectory
    return {
      name: handle.name,
      kind: handle.kind,
      relativePath: nestedPath,
      entries: await getDirectoryEntriesRecursive(handle, nestedPath),
      handle,
    };
  };
  const { data, error } = await tryCatch(doGetEntries());
  if (error) {
    console.error(`Error handling directory ${nestedPath}:`, error);
    throw error;
  }
  if (!data) throw new Error(`Handling directory ${nestedPath} returned no data`);
  return data;
};

/**
 * Get all entries in a directory recursively
 * @param directoryHandle Directory handle to process
 * @param relativePath Relative path to the directory
 * @returns Record of entries
 */
export const getDirectoryEntriesRecursive = async (
  directoryHandle: FileSystemDirectoryHandle,
  relativePath = ".",
): Promise<Record<string, FileSystemEntry>> => {
  const doGetRecursiveEntries = async () => {
    const entries: Record<string, FileSystemEntry> = {};
    // The for await...of itself can throw if directoryHandle.entries() is invalid or fails.
    // We wrap the iteration part.
    for await (const [_, handle] of directoryHandle.entries()) {
      const nestedPath = `${relativePath}/${handle.name}`;
      if (handle.kind === "file") {
        const fileHandle = handle as FileSystemFileHandle;
        // handleFile is already refactored
        const entry = await handleFile(fileHandle, nestedPath);
        entries[entry.name] = entry;
      } else if (handle.kind === "directory") {
        const dirHandle = handle as FileSystemDirectoryHandle;
        // handleDirectory is being refactored
        const entry = await handleDirectory(dirHandle, nestedPath);
        entries[entry.name] = entry;
      }
    }
    return entries;
  };

  const { data: entries, error } = await tryCatch(doGetRecursiveEntries());
  if (error) {
    console.error(`Error reading directory entries for ${relativePath}:`, error);
    return {}; // Return empty object on error as per original logic
  }
  return entries || {};
};

/**
 * Get directory handle and file name from a path
 * @param filePath Path to process
 * @returns Directory handle and file name
 */
export const getDirectoryHandleAndFileName = async (
  filePath: string,
): Promise<
  { dirHandle: FileSystemDirectoryHandle; fileName: string | undefined; }
> => {
  const doGetHandleAndName = async () => {
    const normalizedPath = normalizePath(filePath);
    const pathParts = normalizedPath.split("/").filter((x) => x);
    const fileName = pathParts.pop();

    let currentHandle = await navigator.storage.getDirectory();

    for (const part of pathParts) {
      currentHandle = await currentHandle.getDirectoryHandle(part, {
        create: true, // Assuming create:true is desired for intermediate paths
      });
    }
    return { dirHandle: currentHandle, fileName };
  };

  const { data, error } = await tryCatch(doGetHandleAndName());
  if (error) {
    console.error(`Error in getDirectoryHandleAndFileName for ${filePath}:`, error);
    throw error;
  }
  if (!data) throw new Error(`getDirectoryHandleAndFileName for ${filePath} returned no data`);
  return data;
};
