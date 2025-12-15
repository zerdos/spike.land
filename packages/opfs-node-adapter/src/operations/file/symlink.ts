/**
 * Create a symbolic link
 * Node.js signature: symlink(target, path[, type])
 * @throws Not implemented
 */
export async function symlink(
  _target: string,
  _path: string,
  _type?: "file" | "dir" | "junction" | null,
): Promise<void> {
  throw new Error("OPFS adapter: symlink is not implemented yet");
}
