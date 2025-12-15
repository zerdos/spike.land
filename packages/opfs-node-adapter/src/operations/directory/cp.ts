/**
 * Copy a file or directory recursively
 * Node.js signature: cp(source, destination[, options])
 * @throws Not implemented
 */
export async function cp(
  _source: string,
  _destination: string,
  _options?: {
    dereference?: boolean;
    errorOnExist?: boolean;
    filter?: (source: string, destination: string) => boolean | Promise<boolean>;
    force?: boolean;
    mode?: number;
    preserveTimestamps?: boolean;
    recursive?: boolean;
    verbatimSymlinks?: boolean;
  },
): Promise<void> {
  throw new Error("OPFS adapter: cp is not implemented yet");
}
