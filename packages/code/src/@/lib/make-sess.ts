import type { ICodeSession } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { applyDiff, createDiff } from "@/lib/text-diff";

export { createDiff };

export interface CodePatch {
  oldHash: string;
  hashCode: string;
  patch?: ReturnType<typeof createDiff>;
}

class SessionPatcher {
  public static computeSessionHash(cx: ICodeSession): string {
    const { codeSpace, code, html, css, transpiled, messages } = cx;
    const hashObj = {
      codeSpace,
      messages: md5(JSON.stringify([
        ...(messages || []).map((m) => md5(JSON.stringify(m))),
      ])),
      code: md5(code),
      html: md5(html),
      css: md5(css),
      transpiled: md5(transpiled),
    };
    return md5(JSON.stringify(hashObj));
  }

  public static sanitizeSession(p: unknown): ICodeSession {
    const session = p as ICodeSession;
    const messages = JSON.parse(JSON.stringify(session.messages || []));
    return {
      codeSpace: session.codeSpace || "",
      messages,
      code: session.code || "",
      html: session.html || "",
      css: session.css || "",
      transpiled: session.transpiled || "",
    };
  }

  public static sessionToJSON(s: ICodeSession): string {
    return JSON.stringify(SessionPatcher.sanitizeSession(s));
  }

  public static applySessionPatch(
    sess: ICodeSession,
    codePatch: CodePatch,
  ): ICodeSession {
    const sanitizedSession = SessionPatcher.sanitizeSession(sess);
    const currentHash = computeSessionHash(sanitizedSession);

    if (currentHash !== codePatch.oldHash) {
      throw new Error(
        `Old hash does not match: ${currentHash} !== ${codePatch.oldHash}`,
      );
    }

    if (!codePatch.patch) {
      return sanitizedSession;
    }

    const parsedSession = applyDiff(
      sanitizedSession,
      codePatch.patch,
    );

    const newHash = computeSessionHash(parsedSession);
    if (newHash !== codePatch.hashCode) {
      throw new Error("New hash does not match");
    }
    return parsedSession;
  }

  public static generateSessionPatch(
    oldSess: ICodeSession,
    newSess: ICodeSession,
  ): CodePatch {
    const sanitizedOldSess = SessionPatcher.sanitizeSession(oldSess);
    const sanitizedNewSess = SessionPatcher.sanitizeSession(newSess);

    const oldHash = computeSessionHash(sanitizedOldSess);
    const hashCode = computeSessionHash(sanitizedNewSess);

    if (oldHash === hashCode) {
      return {
        oldHash,
        hashCode,
      };
    }

    const patch = createDiff(sanitizedOldSess, sanitizedNewSess);
    return { oldHash, hashCode, patch };
  }
}

export const computeSessionHash = (s: ICodeSession) => SessionPatcher.computeSessionHash(s);
export const sanitizeSession = SessionPatcher.sanitizeSession;
export const sessionToJSON = SessionPatcher.sessionToJSON;
export const applySessionPatch = SessionPatcher.applySessionPatch;
export const generateSessionPatch = SessionPatcher.generateSessionPatch;
