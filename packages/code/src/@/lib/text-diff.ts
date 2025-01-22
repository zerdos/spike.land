import { sessionToJSON } from "@/lib/make-sess";
import diff from "microdiff";
import type { Difference } from "microdiff";
import { ICodeSession } from "./interfaces";

export function createDiff(original: ICodeSession, revision: ICodeSession) {
  return diff(original, revision, { cyclesFix: false });
}

export function applyDiff(sess: ICodeSession, diff: Difference[]) {
  const original = { ...sess };

  const set = (
    obj: Record<string | number, unknown>,
    path: Array<string | number>,
    value: unknown,
  ) => {
    let ref = obj;
    for (let i = 0; i < path.length - 1; i++) {
      ref = ref[path[i]] as Record<string | number, unknown>;
    }
    ref[path[path.length - 1]] = value;
  };
  const unset = (obj: Record<string | number, unknown>, path: Array<string | number>) => {
    let ref = obj;
    for (let i = 0; i < path.length - 1; i++) {
      ref = ref[path[i]] as Record<string | number, unknown>;
    }
    delete ref[path[path.length - 1]];
  };

  for (const item of diff) {
    switch (item.type) {
      case "CREATE":
        set(original, item.path, item.value);
        break;
      case "REMOVE":
        unset(original, item.path);
        break;
      case "CHANGE":
        set(original, item.path, item.value);
        break;
    }
  }

  return sessionToJSON(original);
}
