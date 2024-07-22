import { hash, Record } from "immutable";
import { applyPatch as aPatch, createDelta } from "./textDiff";
export { aPatch };
const aPC = (sess, mess) => makeSession(JSON.parse(aPatch(string_(makeSession(sess)), mess.patch)));
export function applyCodePatch(sess, mess) {
    const newSess = aPC(sess, mess);
    if (makeHash(newSess) !== mess.newHash) {
        throw new Error("Unable to calculate CodePatch");
    }
    return newSess;
}
export const makeHash = (cx) => String(hash(string_(makeSession(cx))));
export const makeSession = (p = {}) => Record({
    i: 0,
    code: "",
    html: "",
    css: "",
})({
    i: p.i || 0,
    code: p.code || "export default ()=> <>Nothing</>",
    html: p.html || "",
    css: (p.css || "")
        .split(".css-")
        .filter((x) => x.startsWith("html") || (p.html || "").includes(x.slice(0, 5)))
        .join(".css-"),
}).toJS();
export const createPatch = (oldSess, newSess) => {
    const oldRec = makeSession(oldSess);
    const oldHash = makeHash(oldRec);
    const newRec = makeSession(newSess);
    const newHash = makeHash(newRec);
    const oldString = string_(oldRec);
    const newString = string_(newRec);
    const patch = createDelta(oldString, newString);
    const reversePatch = createDelta(newString, oldString);
    const codePatch = {
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
export function string_(s) {
    const { i, code, html, css } = s;
    return JSON.stringify({ i, code, html, css });
}
