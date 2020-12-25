import { Diff } from "https://unpkg.com/diff@5.0.0/dist/diff.js";
import { sha256 } from "https://unpkg.com/@zedvision/sha256@10.12.14/sha256.js";

export const diff = async (str1: string, str2: string) => {
  const sha1Str1 = sha256(str1);
  const res = Diff.diffChars(str1, str2);
  return {
    b: await sha1Str1,
    c: res.map((
      x: { added: boolean; removed: boolean; count: number; value: string },
    ) => x.added ? x.value : x.removed ? -x.count! : x.count!),
  };
};

export const isDiff = (str: string) => {
  if (str.length < 10) return false;
  const isKey =
    [...(str.slice(0, 8))].filter((x) => x < "0" || x > "f").length === 0;
  const maybeInst = str.slice(8);

  if (
    isKey && maybeInst[0] === "[" && maybeInst[maybeInst.length - 1] === "]"
  ) {
    try {
      return JSON.parse(maybeInst).length > 1;
    } catch {
      return false;
    }
  }

  return false;
};

type diffEl = string | number;

export const assemble = (oldValue: string, instructions: string) => {
  const instArr: diffEl[] = JSON.parse(instructions);
  let old = oldValue.slice();

  let ret = "";

  instArr.forEach((element) => {
    if (Number(element) === element) {
      const absNum = Math.abs(element);
      const currentString = old.slice(0, absNum);
      old = old.slice(absNum);
      if (element > 0) ret += String(currentString);
    } else {
      ret += String(element);
    }
  });
  return ret;
};
