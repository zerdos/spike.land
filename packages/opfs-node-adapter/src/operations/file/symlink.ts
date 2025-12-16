import type { LinkErrnoException } from "../../types";

/**
 * Create a symbolic link
 * Node.js signature: symlink(target, path[, type])
 * @throws ENOTSUP - OPFS does not support symbolic links
 */
export async function symlink(
  target: string,
  path: string,
  _type?: "file" | "dir" | "junction" | null,
): Promise<void> {
  const error = new Error(
    `ENOTSUP: operation not supported, symlink '${target}' -> '${path}'`,
  ) as LinkErrnoException;
  error.code = "ENOTSUP";
  error.syscall = "symlink";
  error.path = target;
  error.dest = path;
  throw error;
}
