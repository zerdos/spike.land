import diff from "fast-diff";
export function createDelta(original, revision) {
  const result = diff(original, revision);
  const delta = result.map((r) => r[0] === 1 ? r : [r[0], r[1].length]);
  return delta;
}
export function applyPatch(original, delta) {
  let result = "";
  let index = 0;
  for (const item of delta) {
    const operation = item[0];
    const value = item[1];
    if (item[0] === -1 && typeof value === "number") {
      index += value;
    } else if (operation === 0 && typeof value === "number") {
      result += original.slice(index, index += value);
    } else {
      result += value;
    }
  }
  return result;
}
