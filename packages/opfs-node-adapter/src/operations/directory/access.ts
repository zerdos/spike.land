import { tryCatch } from "../../try-catch";
import { getDirectoryHandleAndFileName, normalizePath } from "../../utils";

/**
 * Check if a file or directory exists and is accessible
 * Node.js signature: access(path[, mode])
 * @param filePath Path to check
 * @param _mode Access mode (F_OK, R_OK, W_OK, X_OK)
 */
export async function access(filePath: string, _mode?: number): Promise<void> {
  const doAccess = async () => {
    const normalizedPath = normalizePath(filePath);

    if (normalizedPath === "") {
      return;
    }

    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);

    if (!fileName) {
      return;
    }

    const { data: fileHandle } = await tryCatch(dirHandle.getFileHandle(fileName));
    if (fileHandle) {
      return;
    }

    const { data: subDirHandle } = await tryCatch(dirHandle.getDirectoryHandle(fileName));
    if (subDirHandle) {
      return;
    }

    throw new Error(`ENOENT: no such file or directory, access '${filePath}'`);
  };

  const { error } = await tryCatch(doAccess());
  if (error) {
    throw error;
  }
}
