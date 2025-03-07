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
  normalizedPath = normalizedPath.endsWith("/") ? normalizedPath.slice(0, -1) : normalizedPath;

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
  return {
    name: handle.name,
    kind: handle.kind,
    relativePath: nestedPath,
    entries: await getDirectoryEntriesRecursive(handle, nestedPath),
    handle,
  };
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
  const entries: Record<string, FileSystemEntry> = {};

  try {
    for await (const [_, handle] of directoryHandle.entries()) {
      const nestedPath = `${relativePath}/${handle.name}`;
      if (handle.kind === "file") {
        const fileHandle = handle as FileSystemFileHandle;
        const entry = await handleFile(fileHandle, nestedPath);
        entries[entry.name] = entry;
      } else if (handle.kind === "directory") {
        const dirHandle = handle as FileSystemDirectoryHandle;
        const entry = await handleDirectory(dirHandle, nestedPath);
        entries[entry.name] = entry;
      }
    }
  } catch (error) {
    console.error("Error reading directory entries:", error);
  }

  return entries;
};

/**
 * Get directory handle and file name from a path
 * @param filePath Path to process
 * @returns Directory handle and file name
 */
export const getDirectoryHandleAndFileName = async (
  filePath: string,
): Promise<{ dirHandle: FileSystemDirectoryHandle; fileName: string | undefined; }> => {
  const normalizedPath = normalizePath(filePath);
  const pathParts = normalizedPath.split("/").filter((x) => x);
  const fileName = pathParts.pop();

  let currentHandle = await navigator.storage.getDirectory();

  for (const part of pathParts) {
    currentHandle = await currentHandle.getDirectoryHandle(part, {
      create: true,
    });
  }

  return { dirHandle: currentHandle, fileName };
};
