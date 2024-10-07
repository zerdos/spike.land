import type { ICodeSession } from "@/lib/interfaces";
import diff from "fast-diff";
import { hash, Record } from "immutable";

type Diff = [-1 | 0 | 1, string];
export type Delta = Diff | [0 | -1, number];

export function createDelta(original: string, revision: string) {
  const result = diff(original, revision);
  const delta: Delta[] = result.map((r) => r[0] === 1 ? r : [r[0], r[1].length]);
  return delta;
}

export function aPatch(original: string, delta: Delta[]) {
  let result = "";
  let index = 0;

  for (const item of delta) {
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

const aPC = (sess: ICodeSession, mess: CodePatch) =>
  makeSession(
    JSON.parse(aPatch(stringifySession(makeSession(sess)), mess.patch)),
  );

export function applyCodePatch(sess: ICodeSession, mess: CodePatch) {
  const newSess = aPC(sess, mess);
  if (makeHash(newSess) !== mess.newHash) {
    throw new Error("Unable to calculate CodePatch");
  }

  return newSess;
}

export const makeHash = (cx: ICodeSession) => String(hash(stringifySession(makeSession(cx))));

export const makeSession = (p: ICodeSession) => {
  // remove everything before the first import
  p.code = p.code.split("\n").filter((l) =>
    !(l.startsWith("//") && l.includes(".tsx")
      || l.trim() === ("// " + p.codeSpace))
  ).join("\n");

  p.code = `// ${p.codeSpace}.tsx\n${p.code}`;

  const rec = Record<ICodeSession>({
    i: p.i || 0,
    codeSpace: p.codeSpace || "",
    code: p.code || "export default ()=> <>Nothing</>",
    html: p.html || "",
    css: (p.css || ""),
    transpiled: typeof p.transpiled === "string" ? p.transpiled : "",
  });

  return rec(p).toJS();
};

export type CodePatch = {
  oldHash: string;
  newHash: string;
  patch: Delta[];
  reversePatch: Delta[];
};

export const createPatch = (
  oldSess: ICodeSession,
  newSess: ICodeSession,
): CodePatch => {
  const oldRec = makeSession(oldSess);
  const oldHash = makeHash(oldRec);
  const newRec = makeSession(newSess);
  const newHash = makeHash(newRec);

  const oldString = stringifySession(oldRec);
  const newString = stringifySession(newRec);

  const patch = createDelta(oldString, newString);
  const reversePatch = createDelta(newString, oldString);

  const codePatch: CodePatch = {
    oldHash,
    newHash,
    reversePatch,
    patch,
  };

  const newSess2 = applyCodePatch(oldSess, codePatch);

  if (makeHash(newSess2) !== codePatch.newHash) {
    throw new Error("Unable to calculate CodePatch");
  }

  return codePatch;
};

export function stringifySession(s: ICodeSession): string {
  const { i, codeSpace, code, html, css, transpiled } = s;
  return JSON.stringify({ i, codeSpace, code, html, css, transpiled });
}
