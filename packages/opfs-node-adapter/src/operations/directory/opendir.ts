import type { DirInterface } from "../../types";

/**
 * Open a directory for reading
 * Node.js signature: opendir(path[, options])
 * @throws Not implemented
 */
export async function opendir(
  _path: string,
  _options?: { encoding?: BufferEncoding | null; bufferSize?: number },
): Promise<DirInterface> {
  throw new Error("OPFS adapter: opendir is not implemented yet");
}
