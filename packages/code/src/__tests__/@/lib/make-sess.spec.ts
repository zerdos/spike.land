import type { ICodeSession } from "@/lib/interfaces";
import {
  applySessionPatch,
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
  sessionToJSON,
} from "@/lib/make-sess";
import { describe, expect, test } from "vitest";

describe("Session Management", () => {
  const sampleSession: ICodeSession = {
    codeSpace: "ts",
    code: "const x = 5;",
    html: "<div>test</div>",
    css: ".test { color: red; }",
    transpiled: "var x = 5;",
    messages: [{ id: "1", role: "user", content: "test message" }],
  };

  test("should sanitize session", () => {
    const input = {
      codeSpace: "ts",
      code: "const x = 5;",
      html: undefined,
      ooo: "ooo",
      css: "",
      transpiled: "",
      messages: [],
    } as Partial<ICodeSession>;
    const result = sanitizeSession(input);
    expect(result).toMatchInlineSnapshot(`
      {
        "code": "const x = 5;",
        "codeSpace": "ts",
        "css": "",
        "html": "",
        "messages": [],
        "transpiled": "",
      }
    `);
  });

  test("should convert session to JSON with default values", () => {
    const input: ICodeSession = {
      codeSpace: "test",
      code: "test",
      html: "",
      css: "",
      transpiled: "",
      messages: [],
    };

    const result = sessionToJSON(input);
    const parsed = JSON.parse(result);

    expect(parsed).toEqual({
      codeSpace: "test",
      code: "test",
      html: "",
      css: "",
      transpiled: "",
      messages: [],
    });
  });

  test("should compute consistent session hash", () => {
    const hash1 = computeSessionHash(sampleSession);
    const hash2 = computeSessionHash({ ...sampleSession });

    expect(hash1).toBe(hash2);

    const modifiedSession = { ...sampleSession, code: "const x = 6;" };
    const hash3 = computeSessionHash(modifiedSession);

    expect(hash1).not.toBe(hash3);
  });

  test("should generate and apply session patch", () => {
    const oldSession = sanitizeSession({ ...sampleSession });
    const newSession = sanitizeSession({
      ...sampleSession,
      code: "const x = 10;",
    });

    const patch = generateSessionPatch(oldSession, newSession);

    expect(patch.oldHash).toBe(computeSessionHash(oldSession));
    expect(patch.hashCode).toBe(computeSessionHash(newSession));

    const patchedSession = applySessionPatch(oldSession, patch);
    expect(patchedSession).toEqual(newSession);
    expect(computeSessionHash(patchedSession)).toBe(patch.hashCode);
  });

  test("should handle identical sessions in generateSessionPatch", () => {
    const session = { ...sampleSession };
    const patch = generateSessionPatch(session, { ...session });

    expect(patch.oldHash).toBe(patch.hashCode);
    expect(patch.patch).toBeUndefined();
  });

  test("should handle create a diff ", () => {
    const session = {
      ...sampleSession,
      code: "const x = 10;",
      html: "<div>test2</div>",
      css: ".test2 { color : blue; }",
    };

    const patch = generateSessionPatch(sampleSession, session);

    const patchedSession = applySessionPatch(sampleSession, patch);
    expect(patchedSession).toEqual(session);
    const oldHash = computeSessionHash(sampleSession);
    const hashCode = computeSessionHash(session);

    expect(patch.oldHash).toBe(oldHash);
    expect(patch.hashCode).toBe(hashCode);
  });
});
