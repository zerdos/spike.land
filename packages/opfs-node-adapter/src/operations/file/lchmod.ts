import type { Mode } from "node:fs";

export async function lchmod(_path: string, _mode: Mode): Promise<void> {
  throw new Error("OPFS adapter: lchmod is not implemented yet");
}
