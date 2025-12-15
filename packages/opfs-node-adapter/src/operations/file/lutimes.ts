/**
 * Change symbolic link timestamps
 * Node.js signature: lutimes(path, atime, mtime)
 * @throws Not implemented
 */
export async function lutimes(
  _path: string,
  _atime: string | number | Date,
  _mtime: string | number | Date,
): Promise<void> {
  throw new Error("OPFS adapter: lutimes is not implemented yet");
}
