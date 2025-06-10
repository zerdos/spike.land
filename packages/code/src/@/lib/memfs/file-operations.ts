import { tryCatch } from "../try-catch";
import { stat } from "./directory-operations";
import { getDirectoryHandleAndFileName } from "./utils";

/**
 * Write content to a file
 * @param filePath Path to file
 * @param content Content to write
 */
export const writeFile = async (
  filePath: string,
  content: string,
): Promise<void> => {
  const doWrite = async () => {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(
      filePath,
    );
    if (!fileName) throw new Error("Invalid file path for writeFile");

    const fileHandle = await dirHandle.getFileHandle(fileName, {
      create: true,
    });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  };
  const { error } = await tryCatch(doWrite());
  if (error) {
    console.error(`Error writing file ${filePath}:`, error);
    throw error;
  }
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
  const doAppend = async () => {
    let existingContent = "";
    const { data: readData, error: readError } = await tryCatch(
      readFile(filePath),
    );
    if (readError) {
      // If readFile fails (e.g. file not found), existingContent remains ""
      console.warn(
        `File ${filePath} not found or unreadable for append, creating new file.`,
      );
    } else {
      existingContent = readData || "";
    }
    await writeFile(filePath, existingContent + content);
  };

  const { error } = await tryCatch(doAppend());
  if (error) {
    // If the initial try (including potential readFile failure) fails,
    // attempt to write the file directly as a fallback (covers file not existing).
    console.warn(
      `Initial append failed for ${filePath}, attempting direct write:`,
      error,
    );
    const { error: directWriteError } = await tryCatch(
      writeFile(filePath, content),
    );
    if (directWriteError) {
      console.error(
        `Direct write also failed for ${filePath} after append attempt:`,
        directWriteError,
      );
      throw directWriteError;
    }
  }
};

/**
 * Read content from a file
 * @param filePath Path to file
 * @returns File content as string
 */
export const readFile = async (filePath: string): Promise<string> => {
  const doRead = async () => {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(
      filePath,
    );
    if (!fileName) throw new Error("Invalid file path for readFile");

    const fileHandle = await dirHandle.getFileHandle(fileName);
    const file = await fileHandle.getFile();
    return file.text();
  };
  const { data, error } = await tryCatch(doRead());
  if (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
  if (data === null || data === undefined) {
    throw new Error(`Read file ${filePath} returned null or undefined`);
  }
  return data;
};

/**
 * Delete a file
 * @param filePath Path to file
 */
export const unlink = async (filePath: string): Promise<void> => {
  const doUnlink = async () => {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(
      filePath,
    );
    if (!fileName) throw new Error("Invalid file path for unlink");
    await dirHandle.removeEntry(fileName);
  };
  const { error } = await tryCatch(doUnlink());
  if (error) {
    console.error(`Error unlinking file ${filePath}:`, error);
    throw error;
  }
};

/**
 * Copy a file
 * @param srcPath Source file path
 * @param destPath Destination file path
 */
export const copyFile = async (
  srcPath: string,
  destPath: string,
): Promise<void> => {
  const content = await readFile(srcPath);
  await writeFile(destPath, content);
};

/**
 * Rename a file or directory
 * @param oldPath Old path
 * @param newPath New path
 */
export const rename = async (
  oldPath: string,
  newPath: string,
): Promise<void> => {
  const doRenameFile = async () => {
    const content = await readFile(oldPath);
    await writeFile(newPath, content);
    await unlink(oldPath);
  };

  const { error: fileRenameError } = await tryCatch(doRenameFile());

  if (fileRenameError) {
    // If not a file or file operation failed, try as directory
    console.warn(
      `Renaming ${oldPath} as file failed, trying as directory:`,
      fileRenameError,
    );
    const doRenameDirectory = async () => {
      const entries = await import("./directory-operations").then((m) => m.readdir(oldPath));
      await import("./directory-operations").then((m) => m.mkdir(newPath));

      for (const entry of entries) {
        const sourcePath = `${oldPath}/${entry}`;
        const destPath = `${newPath}/${entry}`;
        const statResult = await stat(sourcePath);

        if (statResult?.kind === "file") {
          const content = await readFile(sourcePath);
          await writeFile(destPath, content);
          await unlink(sourcePath);
        } else if (statResult?.kind === "directory") {
          await import("./directory-operations").then((m) => m.mkdir(destPath));
          const subEntries = await import("./directory-operations").then((m) =>
            m.readdir(sourcePath)
          );
          for (const subEntry of subEntries) {
            await rename(
              `${sourcePath}/${subEntry}`,
              `${destPath}/${subEntry}`,
            ); // Recursive call
          }
          await import("./directory-operations").then((m) => m.rmdir(sourcePath));
        }
      }
      await import("./directory-operations").then((m) => m.rmdir(oldPath));
    };
    const { error: dirRenameError } = await tryCatch(doRenameDirectory());
    if (dirRenameError) {
      console.error(
        `Error renaming ${oldPath} to ${newPath} (tried as file and directory):`,
        dirRenameError,
      );
      throw dirRenameError;
    }
  }
};

/**
 * Truncate a file to a specified length
 * @param path File path
 * @param len Length to truncate to (default: 0)
 */
export const truncate = async (path: string, len = 0): Promise<void> => {
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
  return Object.hasOwn(globalFiles, filePath)
    ? (globalFiles[filePath] || "")
    : "";
};
