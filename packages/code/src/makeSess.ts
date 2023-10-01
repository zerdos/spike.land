import { hash, Record } from "immutable";
import { applyPatch as aPatch, createDelta, Delta } from "./textDiff";

export { aPatch };

const aPC = (sess: ICodeSession, mess: CodePatch) =>
  makeSession(JSON.parse(aPatch(string_(makeSession(sess)), mess.patch)));

export function applyCodePatch(sess: ICodeSession, mess: CodePatch) {
  const newSess = aPC(sess, mess);
  if (makeHash(newSess) !== mess.newHash) {
    throw new Error("we cant even calculate CodePatch");
  }

  return newSess;
}

export const makeHash = (cx: ICodeSession) => String(hash(string_(makeSession(cx))));

export const makeSession: (p: ICodeSession) => ICodeSession = (
  p = { i: 0, code: "", html: "", css: "" },
) =>
  Record({ i: 0, code: "", html: "", css: "" })({
    i: p.i || 0,
    code: p.code || "export default ()=> <>Nothing</>",
    html: p.html || "",
    css: (p.css || "").split(".css-").filter((x) =>
      x.startsWith("html") || (p.html || "").indexOf(x.slice(0, 5)) !== -1
    )
      .join(".css-"),
  }).toJS();

export type CodePatch = {
  oldHash: string;
  newHash: string;
  patch: Delta[];
  reversePatch: Delta[];
};
export const createPatch = (oldSess: ICodeSession, newSess: ICodeSession) => {
  const oldRec = makeSession(oldSess);
  const oldHash = makeHash(oldRec);
  const newRec = makeSession(newSess);
  const newHash = makeHash(newRec);

  const oldString = string_(oldRec);
  const newString = string_(newRec);

  const patch = createDelta(oldString, newString);
  const reversePatch = createDelta(newString, oldString);

  // const oldString = string_(oldRec);
  // const newString = string_(newRec);

  // const patch = createDelta(oldRec.code, newRec.code);
  // const reversePatch = createDelta(newRec.code, oldRec.code);
  const codePatch = {
    oldHash,
    newHash,
    reversePatch,
    patch,
  } as CodePatch;

  const newSess2 = applyCodePatch(oldSess, codePatch);

  if (makeHash(newSess2) !== codePatch.newHash) {
    throw new Error("we cant even calculate CodePatch");
  }

  return codePatch;
};

export type ICodeSession = {
  code: string;
  i: number;
  html: string;
  css: string;
};
export function string_(s: ICodeSession) {
  const { i, code, html, css } = s;
  return JSON.stringify({ i, code, html, css });
}
