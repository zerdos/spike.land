/**
 * Change symbolic link timestamps
 * Node.js signature: lutimes(path, atime, mtime)
 * @throws ENOTSUP - OPFS does not support symbolic links
 */
export async function lutimes(
  path: string,
  _atime: string | number | Date,
  _mtime: string | number | Date,
): Promise<void> {
  const error = new Error(
    `ENOTSUP: operation not supported, lutimes '${path}'`,
  ) as NodeJS.ErrnoException;
  error.code = "ENOTSUP";
  error.syscall = "lutimes";
  error.path = path;
  throw error;
}
