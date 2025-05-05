import { describe, expect, it, vi } from "vitest";
import type { ICodeSession } from "@/lib/interfaces";
import {
  computeSessionHash,
  generateSessionPatch,
  sanitizeSession,
  sessionToJSON,
} from "@/lib/make-sess";
import { md5 } from "@/lib/md5";

// Mock dependencies
vi.mock("@/lib/md5", () => ({
  md5: vi.fn((input) => {
    if (typeof input === "string") {
      return `md5-${input.substring(0, 10)}`;
    }
    if (typeof input === "object") {
      return `md5-${JSON.stringify(input).substring(0, 10)}`;
    }
    return "md5-mock";
  }),
}));

vi.mock("@/lib/text-delta", () => ({
  createDelta: vi.fn(
    () => [{ op: "replace", path: "/code", value: "updated code" }],
  ),
  applyDelta: vi.fn((session, _diff) => ({
    ...session,
    code: "updated code",
  })),
}));

describe("make-sess", () => {
  // Create a test session
  const createTestSession = (): ICodeSession => ({
    codeSpace: "test-space",
    code: "const test = 'test';",
    html: "<div>Test</div>",
    css: ".test { color: red; }",
    messages: [],
    transpiled: "const test = 'test';",
  });

  describe("computeSessionHash", () => {
    it("should compute a hash for a session", () => {
      const session = createTestSession();

      const hash = computeSessionHash(session);

      expect(hash).toBeDefined();
      expect(typeof hash).toBe("string");
      expect(vi.mocked(md5)).toHaveBeenCalled();
    });
  });

  describe("sanitizeSession", () => {
    it("should sanitize a complete session", () => {
      const session = createTestSession();

      const sanitized = sanitizeSession(session);

      expect(sanitized).toEqual(session);
    });

    it("should fill in missing fields", () => {
      const partialSession = {
        codeSpace: "test-space",
        code: "const test = 'test';",
        messages: [],
        html: "",
        css: "",
        transpiled: "",
      };

      const sanitized = sanitizeSession(partialSession);

      expect(sanitized.html).toBe("");
      expect(sanitized.css).toBe("");
      expect(sanitized.transpiled).not.toBe("");
    });

    it("should throw an error for invalid sessions", () => {
      const invalidSession = {
        code: "const test = 'test';",
      };

      expect(() => sanitizeSession(invalidSession as ICodeSession)).toThrow();
    });
  });

  describe("sessionToJSON", () => {
    it("should convert a session to JSON", () => {
      const session = createTestSession();

      const json = sessionToJSON(session);

      expect(json).toBeDefined();
      expect(typeof json).toBe("string");
      expect(() => JSON.parse(json)).not.toThrow();
    });
  });

  describe("generateSessionPatch", () => {
    it("should generate a patch between two sessions", () => {
      const oldSession = createTestSession();
      const newSession = {
        ...oldSession,
        code: "const updated = 'updated';",
      };

      const patch = generateSessionPatch(oldSession, newSession);

      expect(patch).toBeDefined();
      expect(patch.oldHash).toBeDefined();
      expect(patch.hashCode).toBeDefined();
      expect(patch.delta).toBeDefined();
    });

    it("should return a patch with empty diff for identical sessions", () => {
      const session = createTestSession();

      const patch = generateSessionPatch(session, session);

      expect(patch).toBeDefined();
      expect(patch.oldHash).toBe(patch.hashCode);
    });
  });
});
