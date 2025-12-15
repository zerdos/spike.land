import type { ReadFileOptions } from "../../types";
import { tryCatch } from "../../try-catch";
import { getDirectoryHandleAndFileName } from "../../utils";

export function readFile(
  filePath: string,
  options?: ReadFileOptions | BufferEncoding | null,
): Promise<string>;
export function readFile(
  filePath: string,
  options: { encoding: BufferEncoding; flag?: string },
): Promise<string>;
export function readFile(
  filePath: string,
  options: { encoding?: null; flag?: string },
): Promise<Buffer>;
export async function readFile(
  filePath: string,
  options?: ReadFileOptions | BufferEncoding | null,
): Promise<string | Buffer> {
  const doRead = async () => {
    const { dirHandle, fileName } = await getDirectoryHandleAndFileName(filePath);
    if (!fileName) throw new Error("ENOENT: Invalid file path for readFile");

    const fileHandle = await dirHandle.getFileHandle(fileName);
    const file = await fileHandle.getFile();
    const content = await file.text();

    const encoding = typeof options === "string" ? options : options?.encoding;

    if (encoding === null || encoding === undefined) {
      return Buffer.from(content);
    }
    return content;
  };

  const { data, error } = await tryCatch(doRead());
  if (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
  if (data === null || data === undefined) {
    throw new Error(`ENOENT: Read file ${filePath} returned null or undefined`);
  }
  return data;
}
