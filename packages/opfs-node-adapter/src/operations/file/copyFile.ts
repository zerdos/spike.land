import { readFile } from "./readFile";
import { writeFile } from "./writeFile";

export async function copyFile(
  srcPath: string,
  destPath: string,
  _mode?: number,
): Promise<void> {
  const content = await readFile(srcPath);
  await writeFile(destPath, content);
}
