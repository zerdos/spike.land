/**
 * Get filesystem statistics
 * Node.js signature: statfs(path[, options])
 * @throws Not implemented
 */
export async function statfs(
  _path: string,
  _options?: { bigint?: boolean },
): Promise<Record<string, unknown>> {
  throw new Error("OPFS adapter: statfs is not implemented yet");
}
