import type { AppendFileOptions } from "../../types";
import { tryCatch } from "../../try-catch";
import { readFile } from "./readFile";
import { writeFile } from "./writeFile";

/**
 * Append content to a file
 * Node.js signature: appendFile(path, data[, options])
 * @param filePath Path to file
 * @param data Content to append
 * @param options Optional encoding/mode/flag options
 */
export async function appendFile(
  filePath: string,
  data: string | Uint8Array,
  _options?: AppendFileOptions | BufferEncoding | null,
): Promise<void> {
  const doAppend = async () => {
    let existingContent = "";
    const { data: readData, error: readError } = await tryCatch(readFile(filePath, "utf8"));
    if (readError) {
      console.warn(`File ${filePath} not found or unreadable for append, creating new file.`);
    } else {
      existingContent = readData || "";
    }

    const appendContent = typeof data === "string" ? data : new TextDecoder().decode(data);
    await writeFile(filePath, existingContent + appendContent);
  };

  const { error } = await tryCatch(doAppend());
  if (error) {
    console.warn(`Initial append failed for ${filePath}, attempting direct write:`, error);
    const contentToWrite = typeof data === "string" ? data : new TextDecoder().decode(data);
    const { error: directWriteError } = await tryCatch(writeFile(filePath, contentToWrite));
    if (directWriteError) {
      console.error(`Direct write also failed for ${filePath} after append attempt:`, directWriteError);
      throw directWriteError;
    }
  }
}
