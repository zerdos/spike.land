/**
 * Create a hard link
 * Node.js signature: link(existingPath, newPath)
 * @throws Not implemented
 */
export async function link(_existingPath: string, _newPath: string): Promise<void> {
  throw new Error("OPFS adapter: link is not implemented yet");
}
