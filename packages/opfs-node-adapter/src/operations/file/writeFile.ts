import type { WriteFileOptions } from "../../types";
import { tryCatch } from "../../try-catch";
import { getDirectoryHandleAndFileName } from "../../utils";

export async function writeFile(
  filePath: string,
  data: string | Uint8Array | Buffer,
  _options?: WriteFileOptions | BufferEncoding | null,
): Promise<void> {
  const doWrite = async () => {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
    if (!fileName) throw new Error("ENOENT: Invalid file path for writeFile");

    const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();

    let content: string | ArrayBuffer;
    if (typeof data === "string") {
      content = data;
    } else if (data instanceof Uint8Array) {
      content = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
    } else {
      content = String(data);
    }

    await writable.write(content);
    await writable.close();
  };

  const { error } = await tryCatch(doWrite());
  if (error) {
    console.error(`Error writing file ${filePath}:`, error);
    throw error;
  }
}
