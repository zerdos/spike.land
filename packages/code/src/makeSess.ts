import { hash, Record } from "immutable";
import { applyPatch as aPatch, createDelta, Delta } from "./textDiff";

export { aPatch };

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

export const makeSession = (p: Partial<ICodeSession> = {}): ICodeSession =>
  Record<ICodeSession>({
    i: 0,
    code: "",
    html: "",
    css: "",
  })({
    i: p.i || 0,
    code: p.code || "export default ()=> <>Nothing</>",
    html: p.html || "",
    css: (p.css || ""),
  }).toJS() as ICodeSession;

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

export type ICodeSession = {
  code: string;
  i: number;
  html: string;
  css: string;
};

export function stringifySession(s: ICodeSession): string {
  const { i, code, html, css } = s;
  return JSON.stringify({ i, code, html, css });
}
