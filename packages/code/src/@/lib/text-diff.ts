import { ICodeSession } from "./interfaces";

export function createDiff(original: ICodeSession, revision: ICodeSession) {
  console.log("createDiff", original, revision);

  const diff = {
    original: JSON.stringify(original),
    revised: JSON.stringify(revision),
  };

  return diff;
}

export function applyDiff(sess: ICodeSession, diff: ReturnType<typeof createDiff>): ICodeSession {
  console.log("applyDiff", sess, diff);
  const { original, revised } = diff;
  if (original === revised) {
    return sess;
  }
  if (original !== JSON.stringify(sess)) {
    throw new Error("Original does not match");
  }

  const parsedSession: ICodeSession = JSON.parse(revised);
  return parsedSession;
}
