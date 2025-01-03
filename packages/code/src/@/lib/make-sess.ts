import { Record } from "@/external/immutable";
import type { ICodeSession } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { diffJson } from "diff";

export interface Change {
  count?: number | undefined;
  value: string;
  added: boolean; // for new content
  removed: boolean; // for removed content
}

export type Diff = Change;

export interface CodePatch {
  oldHash: string;
  newHash: string;
  patch: Diff[];
  reversePatch: Diff[];
}

class SessionPatcher {
  public static computeTextDelta(original: ICodeSession, revised: ICodeSession) {
    // Diff the objects as JSON
    return diffJson(original, revised);
  }

  public static applyTextDelta(sess: ICodeSession, changes: Change[]): string {
    const original = sessionToJSON(sess);
    let result = "";
    let currentPos = 0;

    for (const change of changes) {
      if (change.removed) {
        // Skip over the removed text in original
        currentPos += change.value.length;
      } else if (change.added) {
        // Add new text
        result += change.value;
      } else {
        // For unchanged text, copy from original
        result += original.slice(currentPos, currentPos + change.value.length);
        currentPos += change.value.length;
      }
    }

    return result;
  }

  public static computeSessionHash(cx: ICodeSession): string {
    const { i, codeSpace, messages, code, html, css, transpiled } = cx;
    const hashObj = {
      i,
      codeSpace,
      messages: md5(JSON.stringify([
        ...messages.map((m) => md5(JSON.stringify(m))),
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
    const patchedJson = applyTextDelta(
      sess,
      codePatch.patch,
    );
    const newSess = sanitizeSession(JSON.parse(patchedJson));
    if (computeSessionHash(newSess) !== codePatch.newHash) {
      throw new Error("Unable to calculate CodePatch");
    }
    return newSess;
  }

  public static generateSessionPatch(
    oldSess: ICodeSession,
    newSess: ICodeSession,
  ): CodePatch {
    const oldHash = computeSessionHash(oldSess);
    const newHash = computeSessionHash(newSess);

    const patch = computeTextDelta(oldSess, newSess);
    const reversePatch = computeTextDelta(newSess, oldSess);

    const codePatch: CodePatch = { oldHash, newHash, patch, reversePatch };
    if (computeSessionHash(applySessionPatch(oldSess, codePatch)) !== newHash) {
      throw new Error("Unable to calculate CodePatch");
    }
    return codePatch;
  }
}

export const applyTextDelta = SessionPatcher.applyTextDelta;
export const computeTextDelta = SessionPatcher.computeTextDelta;
export const computeSessionHash = (s: ICodeSession) => SessionPatcher.computeSessionHash(s);
export const sanitizeSession = SessionPatcher.sanitizeSession;
export const sessionToJSON = SessionPatcher.sessionToJSON;
export const applySessionPatch = SessionPatcher.applySessionPatch;
export const generateSessionPatch = SessionPatcher.generateSessionPatch;
