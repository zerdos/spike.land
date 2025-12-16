export async function lchown(path: string, _uid: number, _gid: number): Promise<void> {
  const error = new Error(
    `ENOTSUP: operation not supported, lchown '${path}'`,
  ) as NodeJS.ErrnoException;
  error.code = "ENOTSUP";
  error.syscall = "lchown";
  error.path = path;
  throw error;
}
