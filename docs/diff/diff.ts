import { Diff } from "https://unpkg.com/diff@5.0.0/dist/diff.js";
import { sha256 } from "../code/src/sha256.ts";

export const diff = async (str1: string, str2: string) => {
  const sha1Str1 = sha256(str1);
  const res = Diff.diffChars(str1, str2);
  return {
    b: await sha1Str1,
    c: res.map((x) => x.added ? x.value : x.removed ? -x.count : x.count),
  };
};
