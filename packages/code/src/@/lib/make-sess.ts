import type { ICodeSession } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { applyDelta, createDelta } from "./delta";
export interface SessionDelta {
  oldHash: string;
  hashCode: string;
  delta: ReturnType<typeof createDelta>;
}

class SessionPatcher {
  public static computeSessionHash(cx: ICodeSession): string {
    const { codeSpace, code, html, css, transpiled } = cx;
    const hashObj = {
      codeSpace,
      code: md5(code),
      html: md5(html),
      css: md5(css),
      transpiled: md5(transpiled),
    };
    return md5(JSON.stringify(hashObj));
  }

  public static sanitizeSession(p: Partial<ICodeSession>): ICodeSession {
    return {
      codeSpace: p.codeSpace || "",
      code: p.code || "",
      html: p.html || "",
      css: p.css || "",
      transpiled: p.transpiled || `import { createElement as e } from "react";
      export default () => (
        e("div", null,
          e("h1", null, "404 - for now."),
          e("h2", null, "But you can edit even this page and share with your friends.")
        )
      );`,
    };
  }

  public static sessionToJSON(s: ICodeSession): string {
    return JSON.stringify(SessionPatcher.sanitizeSession(s));
  }

  public static applySessionDelta(
    sess: ICodeSession,
    sessionDelta: SessionDelta,
  ): ICodeSession {
    const sanitizedSession = SessionPatcher.sanitizeSession(sess);
    const currentHash = SessionPatcher.computeSessionHash(sanitizedSession);

    if (currentHash !== sessionDelta.oldHash) {
      throw new Error(
        `Old hash does not match: ${currentHash} !== ${sessionDelta.oldHash}`,
      );
    }

    if (!sessionDelta.delta) {
      return sanitizedSession;
    }

    const parsedSession = applyDelta(
      sanitizedSession,
      sessionDelta.delta as ReturnType<typeof createDelta>,
    ) as ICodeSession;

    const newHash = SessionPatcher.computeSessionHash(parsedSession);
    if (newHash !== sessionDelta.hashCode) {
      throw new Error(
        "New hash does not match:" + newHash + " !== " + sessionDelta.hashCode +
          "\n" +
          JSON.stringify(sessionDelta) + "\n" + JSON.stringify(parsedSession),
      );
    }
    return parsedSession;
  }

  public static generateSessionPatch(
    oldSess: ICodeSession,
    newSess: ICodeSession,
  ): SessionDelta {
    const sanitizedOldSess = SessionPatcher.sanitizeSession(oldSess);
    const sanitizedNewSess = SessionPatcher.sanitizeSession(newSess);

    const oldHash = SessionPatcher.computeSessionHash(sanitizedOldSess);
    const hashCode = SessionPatcher.computeSessionHash(sanitizedNewSess);

    // If the sessions are identical, return a patch with an empty delta
    if (oldHash === hashCode) {
      return {
        oldHash,
        hashCode,
        delta: [] as unknown as ReturnType<typeof createDelta>,
      };
    }

    // Create a delta between the sessions
    const delta = createDelta(sanitizedOldSess, sanitizedNewSess);
    const sessionDelta = {
      oldHash,
      hashCode,
      delta,
    };

    // Validate that the patch can be applied
    const patchedSession = applyDelta(sanitizedOldSess, delta) as ICodeSession;
    const patchedHash = SessionPatcher.computeSessionHash(patchedSession);
    if (patchedHash !== hashCode) {
      // If the patch is invalid, throw an error in such a format, that it can be easily added as a new integration test
      throw new Error(
        `Patch is invalid: ${patchedHash} !== ${hashCode}\n` +
          `Old: ${JSON.stringify(sanitizedOldSess)}\n` +
          `New: ${JSON.stringify(sanitizedNewSess)}\n` +
          `Patch: ${JSON.stringify(delta)}\n` +
          `Patched: ${JSON.stringify(patchedSession)}\n` +
          `Old hash: ${oldHash}\n` +
          `New hash: ${hashCode}`,
      );
    }

    return sessionDelta;
  }
}

export const computeSessionHash = (s: ICodeSession) => SessionPatcher.computeSessionHash(s);
export const sanitizeSession = SessionPatcher.sanitizeSession;
export const sessionToJSON = SessionPatcher.sessionToJSON;
export const applySessionDelta = SessionPatcher.applySessionDelta;
export const generateSessionPatch = SessionPatcher.generateSessionPatch;
