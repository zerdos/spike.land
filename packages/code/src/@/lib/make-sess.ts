import { Record } from "@/external/immutable";
import type { ICodeSession } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { applyDiff, createDiff } from "@/lib/text-diff";
export { createDiff } from "@/lib/text-diff";
import type { Diff } from "@/lib/text-diff";
export type { Diff } from "@/lib/text-diff";

export interface CodePatch {
  oldHash: string;
  newHash: string;
  patch: Diff;
  reversePatch: Diff;
}

class SessionPatcher {
  public static computeSessionHash(cx: ICodeSession): string {
    const { i, codeSpace, code, html, css, transpiled } = cx;
    const hashObj = {
      i,
      codeSpace,
      messages: md5(JSON.stringify([
        ...(cx.messages || []).map((m) => md5(JSON.stringify(m))),
      ])),
      code: md5(code),
      html: md5(html),
      css: md5(css),
      transpiled: md5(transpiled),
    };
    return md5(JSON.stringify(hashObj));
  }

  public static sanitizeSession(p: ICodeSession): ICodeSession {
    p.messages = p.messages || [];
    p.code = p.code
      .split("\n")
      .filter((line) =>
        !(line.startsWith("//") && line.includes(".tsx")) &&
        line.trim() !== ("// " + p.codeSpace)
      )
      .join("\n");

    p.code = `// ${p.codeSpace}.tsx\n${p.code}`;

    return Record<ICodeSession>({
      i: p.i || 0,
      codeSpace: p.codeSpace || "",
      messages: p.messages,
      code: p.code || `export default () => <>\n  Nothing\n</>;`,
      html: p.html || "",
      css: p.css || "",
      transpiled: typeof p.transpiled === "string" ? p.transpiled : "",
    })(p).toJS() as ICodeSession;
  }

  public static sessionToJSON(s: ICodeSession): string {
    const { i, codeSpace, code, html, css, transpiled, messages } = s;
    return JSON.stringify({
      i,
      codeSpace,
      messages,
      code,
      html,
      css,
      transpiled,
    });
  }

  public static applySessionPatch(
    sess: ICodeSession,
    codePatch: CodePatch,
  ): ICodeSession {
    if (computeSessionHash(sess) !== codePatch.oldHash) {
      throw new Error("Old hash does not match");
    }
    const newSess = applyDiff(
      sess,
      codePatch.patch,
    );

    if (computeSessionHash(newSess) !== codePatch.newHash) {
      throw new Error("New hash does not match");
    }
    return newSess;
  }

  public static generateSessionPatch(
    oldSess: ICodeSession,
    newSess: ICodeSession,
  ): CodePatch {
    const oldHash = computeSessionHash(oldSess);
    const newHash = computeSessionHash(newSess);

    if (oldHash === newHash) {
      return { newHash: oldHash, oldHash, patch: [], reversePatch: [] };
    }

    const patch = createDiff(oldSess, newSess);
    const reversePatch = createDiff(newSess, oldSess);

    const codePatch: CodePatch = { oldHash, newHash, patch, reversePatch };
    if (computeSessionHash(applySessionPatch(oldSess, codePatch)) !== newHash) {
      throw new Error("Unable to calculate CodePatch");
    }
    return codePatch;
  }
}

export const computeSessionHash = (s: ICodeSession) => SessionPatcher.computeSessionHash(s);
export const sanitizeSession = SessionPatcher.sanitizeSession;
export const sessionToJSON = SessionPatcher.sessionToJSON;
export const applySessionPatch = SessionPatcher.applySessionPatch;
export const generateSessionPatch = SessionPatcher.generateSessionPatch;
