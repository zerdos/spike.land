export async function lchown(_path: string, _uid: number, _gid: number): Promise<void> {
  throw new Error("OPFS adapter: lchown is not implemented yet");
}
