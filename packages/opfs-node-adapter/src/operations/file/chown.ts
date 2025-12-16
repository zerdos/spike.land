/**
 * Change file ownership
 * Node.js signature: chown(path, uid, gid)
 * @throws ENOTSUP - OPFS doesn't support file ownership
 */
export async function chown(path: string, _uid: number, _gid: number): Promise<void> {
  const error = new Error(`ENOTSUP: operation not supported, chown '${path}'`) as NodeJS.ErrnoException;
  error.code = "ENOTSUP";
  error.syscall = "chown";
  error.path = path;
  throw error;
}
