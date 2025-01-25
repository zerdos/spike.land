import { ICodeSession } from "@/lib/interfaces";
import { applyPatch, compare, Operation } from "fast-json-patch";

export interface ICodeSessionDiff extends Array<Operation> {}

export function createDiff(
  original: ICodeSession,
  revision: ICodeSession,
): ICodeSessionDiff {
  return compare(original, revision);
}

export function applyDiff(
  sess: ICodeSession,
  patch: ICodeSessionDiff,
): ICodeSession {
  // Apply the patch operations
  return applyPatch(sess, patch).newDocument;
}
