import type { Mode } from "node:fs";

export async function lchmod(path: string, _mode: Mode): Promise<void> {
  const error = new Error(`ENOTSUP: operation not supported, lchmod '${path}'`) as NodeJS.ErrnoException;
  error.code = "ENOTSUP";
  error.syscall = "lchmod";
  error.path = path;
  throw error;
}
