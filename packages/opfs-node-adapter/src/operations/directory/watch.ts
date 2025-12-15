import type { FSWatcher } from "../../types";

/**
 * Watch for changes on a file or directory
 * Node.js signature: watch(filename[, options])
 * @throws Not implemented
 */
export function watch(
  _filename: string,
  _options?: { encoding?: BufferEncoding | null; persistent?: boolean; recursive?: boolean; signal?: AbortSignal },
): FSWatcher {
  throw new Error("OPFS adapter: watch is not implemented yet");
}
