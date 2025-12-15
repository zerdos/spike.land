import type { Mode } from "node:fs";

export async function chmod(_path: string, _mode: Mode): Promise<void> {
  throw new Error("OPFS adapter: chmod is not implemented yet");
}
