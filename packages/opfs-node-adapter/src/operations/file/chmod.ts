import type { Mode } from "node:fs";

export async function chmod(path: string, _mode: Mode): Promise<void> {
  const error = new Error(`ENOTSUP: operation not supported, chmod '${path}'`) as NodeJS.ErrnoException;
  error.code = "ENOTSUP";
  error.syscall = "chmod";
  error.path = path;
  throw error;
}
