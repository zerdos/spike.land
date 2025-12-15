/**
 * Change file ownership
 * Node.js signature: chown(path, uid, gid)
 * @throws Not implemented (OPFS doesn't support ownership)
 */
export async function chown(_path: string, _uid: number, _gid: number): Promise<void> {
  throw new Error("OPFS adapter: chown is not implemented yet");
}
