import { readFile } from "./readFile";
import { writeFile } from "./writeFile";

export async function truncate(path: string, len = 0): Promise<void> {
  const content = await readFile(path, "utf8");
  await writeFile(path, content.substring(0, len));
}
