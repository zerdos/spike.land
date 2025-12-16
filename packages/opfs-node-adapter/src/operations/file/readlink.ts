export async function readlink(
  path: string,
  _options?: { encoding?: BufferEncoding | null } | BufferEncoding | null,
): Promise<string | Buffer> {
  const error = new Error(`ENOTSUP: operation not supported, readlink '${path}'`) as NodeJS.ErrnoException;
  error.code = "ENOTSUP";
  error.syscall = "readlink";
  error.path = path;
  throw error;
}
