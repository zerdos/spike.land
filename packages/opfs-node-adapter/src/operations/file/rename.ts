import { tryCatch } from "../../try-catch";
import { readFile } from "./readFile";
import { writeFile } from "./writeFile";
import { unlink } from "./unlink";
import { stat } from "../directory/stat";

/**
 * Rename a file or directory
 * Node.js signature: rename(oldPath, newPath)
 * @param oldPath Old path
 * @param newPath New path
 */
export async function rename(oldPath: string, newPath: string): Promise<void> {
  const doRenameFile = async () => {
    const content = await readFile(oldPath);
    await writeFile(newPath, content);
    await unlink(oldPath);
  };

  const { error: fileRenameError } = await tryCatch(doRenameFile());

  if (fileRenameError) {
    console.warn(`Renaming ${oldPath} as file failed, trying as directory:`, fileRenameError);
    const doRenameDirectory = async () => {
      const { readdir, mkdir, rmdir } = await import("../directory");
      const entries = await readdir(oldPath);
      await mkdir(newPath);

      for (const entry of entries) {
        const sourcePath = `${oldPath}/${entry}`;
        const destPath = `${newPath}/${entry}`;

        try {
          const statResult = await stat(sourcePath);

          if (statResult.isFile()) {
            const content = await readFile(sourcePath);
            await writeFile(destPath, content);
            await unlink(sourcePath);
          } else if (statResult.isDirectory()) {
            await mkdir(destPath);
            const subEntries = await readdir(sourcePath);
            for (const subEntry of subEntries) {
              await rename(`${sourcePath}/${subEntry}`, `${destPath}/${subEntry}`);
            }
            await rmdir(sourcePath);
          }
        } catch {
          // Skip entries that can't be stat'd
        }
      }
      await rmdir(oldPath);
    };

    const { error: dirRenameError } = await tryCatch(doRenameDirectory());
    if (dirRenameError) {
      console.error(`Error renaming ${oldPath} to ${newPath} (tried as file and directory):`, dirRenameError);
      throw dirRenameError;
    }
  }
}
