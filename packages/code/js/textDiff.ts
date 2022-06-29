import diff from "fast-diff";

type Diff = [-1 | 0 | 1, string];
export type Delta = Diff | [0 | -1, number];

export function createDelta(original: string, revision: string) {
  var result = diff(original, revision);
  const delta: Delta[] = result.map((r) =>
    r[0] === 1 ? r : [r[0], r[1].length]
  );
  return delta;
}

export function applyPatch(original: string, delta: Delta[]) {
  var result = "",
    index = 0;

  for (var i = 0; i < delta.length; i++) {
    var item = delta[i],
      operation = item[0],
      value = item[1];

    if (item[0] === -1 && typeof value === "number") {
      // DELETE
      index += value;
    } else if (operation == 0 && typeof value === "number") {
      // KEEP
      result += original.slice(index, index += value);
    } else {
      // INSERT
      result += value;
    }
  }
  return result;
}
