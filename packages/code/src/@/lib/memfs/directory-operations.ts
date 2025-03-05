import { StatResult } from './types';
import { getDirectoryHandleAndFileName, handleDirectory, handleFile, normalizePath } from './utils';

/**
 * List directory contents
 * @param filePath Path to directory
 * @returns Array of file and directory names
 */
export const readdir = async (filePath: string): Promise<string[]> => {
  try {
    const { dirHandle } = await getDirectoryHandleAndFileName(filePath);
    const entries = await import('./utils').then(m => m.getDirectoryEntriesRecursive(dirHandle));
    return Object.keys(entries);
  } catch (error) {
    console.error(`Error reading directory ${filePath}:`, error);
    return [];
  }
};

/**
 * Create a directory
 * @param filePath Path to directory
 */
export const mkdir = async (filePath: string): Promise<void> => {
  const normalizedPath = normalizePath(filePath);
  const pathParts = normalizedPath.split("/").filter((x) => x);
  const folderName = pathParts.pop();
  
  if (!folderName) throw new Error("Invalid directory path");

  let currentHandle = await navigator.storage.getDirectory();

  for (const part of pathParts) {
    currentHandle = await currentHandle.getDirectoryHandle(part, {
      create: true,
    });
  }

  await currentHandle.getDirectoryHandle(folderName, { create: true });
};

/**
 * Remove a directory
 * @param filePath Path to directory
 */
export const rmdir = async (filePath: string): Promise<void> => {
  const normalizedPath = normalizePath(filePath);
  const pathParts = normalizedPath.split("/").filter((x) => x);
  
  if (pathParts.length === 0) throw new Error("Cannot remove root directory");
  
  const dirName = pathParts.pop();
  if (!dirName) throw new Error("Invalid directory path");

  let currentHandle = await navigator.storage.getDirectory();

  for (const part of pathParts) {
    currentHandle = await currentHandle.getDirectoryHandle(part, { create: false });
  }

  await currentHandle.removeEntry(dirName, { recursive: true });
};

/**
 * Get file or directory information
 * @param filePath Path to file or directory
 * @returns File or directory information
 */
export const stat = async (filePath: string): Promise<StatResult> => {
  try {
    const normalizedPath = normalizePath(filePath);
    
    // Handle root directory
    if (normalizedPath === "") {
      const rootHandle = await navigator.storage.getDirectory();
      return await handleDirectory(rootHandle, "/");
    }
    
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
    
    if (!fileName) {
      // It's a directory path
      return await handleDirectory(dirHandle, filePath);
    } else {
      try {
        // Try to get as file
        const fileHandle = await dirHandle.getFileHandle(fileName);
        return await handleFile(fileHandle, filePath);
      } catch (error) {
        try {
          // Try to get as directory
          const subDirHandle = await dirHandle.getDirectoryHandle(fileName);
          return await handleDirectory(subDirHandle, filePath);
        } catch (error) {
          return null;
        }
      }
    }
  } catch (error) {
    return null;
  }
};

/**
 * Check if a file or directory exists and is accessible
 * @param filePath Path to check
 * @param mode Access mode (not used in this implementation)
 */
export const access = async (filePath: string, mode?: number): Promise<void> => {
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
