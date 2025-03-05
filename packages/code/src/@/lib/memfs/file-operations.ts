import { getDirectoryHandleAndFileName } from './utils';
import { StatResult } from './types';
import { stat } from './directory-operations';

/**
 * Write content to a file
 * @param filePath Path to file
 * @param content Content to write
 */
export const writeFile = async (
  filePath: string,
  content: string,
): Promise<void> => {
  const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
  if (!fileName) throw new Error("Invalid file path");
  
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
};

/**
 * Append content to a file
 * @param filePath Path to file
 * @param content Content to append
 */
export const appendFile = async (
  filePath: string,
  content: string,
): Promise<void> => {
  try {
    // Try to read existing content
    const existingContent = await readFile(filePath).catch(() => "");
    
    // Write combined content
    await writeFile(filePath, existingContent + content);
  } catch (error) {
    // If file doesn't exist, create it with the new content
    await writeFile(filePath, content);
  }
};

/**
 * Read content from a file
 * @param filePath Path to file
 * @returns File content as string
 */
export const readFile = async (filePath: string): Promise<string> => {
  const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
  if (!fileName) throw new Error("Invalid file path");
  
  const fileHandle = await dirHandle.getFileHandle(fileName);
  const file = await fileHandle.getFile();
  return await file.text();
};

/**
 * Delete a file
 * @param filePath Path to file
 */
export const unlink = async (filePath: string): Promise<void> => {
  const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
  if (!fileName) throw new Error("Invalid file path");
  
  await dirHandle.removeEntry(fileName);
};

/**
 * Copy a file
 * @param srcPath Source file path
 * @param destPath Destination file path
 */
export const copyFile = async (srcPath: string, destPath: string): Promise<void> => {
  const content = await readFile(srcPath);
  await writeFile(destPath, content);
};

/**
 * Rename a file or directory
 * @param oldPath Old path
 * @param newPath New path
 */
export const rename = async (oldPath: string, newPath: string): Promise<void> => {
  // For files, copy content and delete original
  try {
    const content = await readFile(oldPath);
    await writeFile(newPath, content);
    await unlink(oldPath);
  } catch (error) {
    // If not a file, try as directory
    const entries = await import('./directory-operations').then(m => m.readdir(oldPath));
    await import('./directory-operations').then(m => m.mkdir(newPath));
    
    // Copy all entries recursively
    for (const entry of entries) {
      const sourcePath = `${oldPath}/${entry}`;
      const destPath = `${newPath}/${entry}`;
      
      // Check if it's a file or directory
      const statResult = await stat(sourcePath);
      if (statResult?.kind === "file") {
        const content = await readFile(sourcePath);
        await writeFile(destPath, content);
        await unlink(sourcePath);
      } else if (statResult?.kind === "directory") {
        // Recursively handle subdirectories
        await import('./directory-operations').then(m => m.mkdir(destPath));
        const subEntries = await import('./directory-operations').then(m => m.readdir(sourcePath));
        for (const subEntry of subEntries) {
          await rename(`${sourcePath}/${subEntry}`, `${destPath}/${subEntry}`);
        }
        await import('./directory-operations').then(m => m.rmdir(sourcePath));
      }
    }
    
    // Remove old directory
    await import('./directory-operations').then(m => m.rmdir(oldPath));
  }
};

/**
 * Truncate a file to a specified length
 * @param path File path
 * @param len Length to truncate to (default: 0)
 */
export const truncate = async (path: string, len: number = 0): Promise<void> => {
  const content = await readFile(path);
  await writeFile(path, content.substring(0, len));
};

/**
 * Read file synchronously from global object
 * @param filePath Path to file
 * @returns File content as string
 */
export const readFileSync = (filePath: string): string => {
  // Type assertion to let TypeScript know about the shape of the global object
  const globalFiles = globalThis as unknown as Record<string, string>;

  // Check if the filePath exists in the global object and return its content
  return Object.hasOwn(globalFiles, filePath) ? globalFiles[filePath] : "";
};
