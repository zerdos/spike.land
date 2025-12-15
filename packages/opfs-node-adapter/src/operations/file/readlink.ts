export async function readlink(
  _path: string,
  _options?: { encoding?: BufferEncoding | null } | BufferEncoding | null,
): Promise<string | Buffer> {
  throw new Error("OPFS adapter: readlink is not implemented yet");
}
