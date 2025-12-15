import { tryCatch } from "../../try-catch";
import { getDirectoryHandleAndFileName } from "../../utils";

/**
 * Delete a file
 * Node.js signature: unlink(path)
 * @param filePath Path to file
 */
export async function unlink(filePath: string): Promise<void> {
  const doUnlink = async () => {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
    if (!fileName) throw new Error("ENOENT: Invalid file path for unlink");
    await dirHandle.removeEntry(fileName);
  };

  const { error } = await tryCatch(doUnlink());
  if (error) {
    console.error(`Error unlinking file ${filePath}:`, error);
    throw error;
  }
}
