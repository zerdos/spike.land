/**
 * Change file timestamps
 * Node.js signature: utimes(path, atime, mtime)
 * @throws Not implemented (OPFS doesn't support setting timestamps)
 */
export async function utimes(
  _path: string,
  _atime: string | number | Date,
  _mtime: string | number | Date,
): Promise<void> {
  throw new Error("OPFS adapter: utimes is not implemented yet");
}
