import type { LinkErrnoException } from "../../types";

/**
 * Create a hard link
 * Node.js signature: link(existingPath, newPath)
 * @throws ENOTSUP - Hard links are not supported in OPFS
 */
export async function link(existingPath: string, newPath: string): Promise<void> {
  const error = new Error(
    `ENOTSUP: operation not supported, link '${existingPath}' -> '${newPath}'`
  ) as LinkErrnoException;
  error.code = "ENOTSUP";
  error.syscall = "link";
  error.path = existingPath;
  error.dest = newPath;
  throw error;
}
