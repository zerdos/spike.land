import { createHash } from "@deno/std/hash/mod.ts";

export const sha256 = (str: string) => {
  const hash = createHash("sha256");
  hash.update(str);
  const hashInHex = hash.toString();
  return hashInHex.substr(0, 8);
};
