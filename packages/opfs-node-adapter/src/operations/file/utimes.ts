/**
 * Change file timestamps
 * Node.js signature: utimes(path, atime, mtime)
 * @throws ENOTSUP - OPFS doesn't support setting timestamps
 */
export async function utimes(
  path: string,
  _atime: string | number | Date,
  _mtime: string | number | Date,
): Promise<void> {
  const error = new Error(
    `ENOTSUP: operation not supported, utimes '${path}'`,
  ) as NodeJS.ErrnoException;
  error.code = "ENOTSUP";
  error.syscall = "utimes";
  error.path = path;
  throw error;
}
