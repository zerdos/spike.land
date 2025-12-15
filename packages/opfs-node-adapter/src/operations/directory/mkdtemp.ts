import { mkdir } from "./mkdir";

/**
 * Create a unique temporary directory
 * Node.js signature: mkdtemp(prefix[, options])
 * @param prefix Directory prefix
 * @param options Encoding options
 * @returns Created directory path
 */
export async function mkdtemp(
  prefix: string,
  _options?: { encoding?: BufferEncoding | null } | BufferEncoding | null,
): Promise<string> {
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const dirPath = `${prefix}${randomSuffix}`;
  await mkdir(dirPath, { recursive: true });
  return dirPath;
}
