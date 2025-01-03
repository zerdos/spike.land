import diff from "fast-diff";

type Diff = [-1 | 0 | 1, string];
export type Diff = Diff | [0 | -1, number];

export function computeTextDelta(original: string, revision: string) {
  const result = diff(original, revision);
  const Diff: Diff[] = result.map((r) => r[0] === 1 ? r : [r[0], r[1].length]);
  return Diff;
}

export function applyPatch(original: string, Diff: Diff[]) {
  let result = "";
  let index = 0;

  for (const item of Diff) {
    const operation = item[0];
    const value = item[1];

    if (item[0] === -1 && typeof value === "number") {
      // DELETE
      index += value;
    } else if (operation === 0 && typeof value === "number") {
      // KEEP
      result += original.slice(index, index += value);
    } else {
      // INSERT
      result += value;
    }
  }

  return result;
}
