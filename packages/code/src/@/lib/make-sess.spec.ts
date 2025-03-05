import { describe, expect, it, vi } from "vitest";
import { 
  computeSessionHash, 
  sanitizeSession, 
  sessionToJSON, 
  applySessionPatch, 
  generateSessionPatch,
  CodePatch
} from "./make-sess";
import type { ICodeSession } from "./interfaces";
import { md5 } from "./md5";

// Mock dependencies
vi.mock("./md5", () => ({
  md5: vi.fn((input) => `md5-${typeof input === 'string' ? input.substring(0, 10) : 'mock'}`)
}));

vi.mock("./text-diff", () => ({
  createDiff: vi.fn(() => [{ op: "replace", path: "/code", value: "updated code" }]),
  applyDiff: vi.fn((session, diff) => ({
    ...session,
    code: "updated code"
  }))
}));

describe("make-sess", () => {
  // Create a test session
  const createTestSession = (): ICodeSession => ({
    codeSpace: "test-space",
    code: "const test = 'test';",
    html: "<div>Test</div>",
    css: ".test { color: red; }",
    messages: [],
    transpiled: "const test = 'test';"
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
        transpiled: ""
      };
      
      const sanitized = sanitizeSession(partialSession);
      
      expect(sanitized.html).toBe("");
      expect(sanitized.css).toBe("");
      expect(sanitized.transpiled).toBe("");
    });
    
    it("should throw an error for invalid sessions", () => {
      const invalidSession = {
        code: "const test = 'test';"
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
        code: "const updated = 'updated';"
      };
      
      const patch = generateSessionPatch(oldSession, newSession);
      
      expect(patch).toBeDefined();
      expect(patch.oldHash).toBeDefined();
      expect(patch.hashCode).toBeDefined();
      expect(patch.patch).toBeDefined();
    });
    
    it("should return a patch without diff for identical sessions", () => {
      const session = createTestSession();
      
      const patch = generateSessionPatch(session, session);
      
      expect(patch).toBeDefined();
      expect(patch.oldHash).toBe(patch.hashCode);
      expect(patch.patch).toBeUndefined();
    });
  });
  
  describe("applySessionPatch", () => {
    it("should apply a patch to a session", () => {
      const session = createTestSession();
      const oldHash = "old-hash";
      const hashCode = "new-hash";
      
      // Mock the computeSessionHash function to return expected values
      vi.mocked(md5).mockReturnValueOnce(oldHash).mockReturnValueOnce(hashCode);
      
      const patch: CodePatch = {
        oldHash,
        hashCode,
        patch: [{ op: "replace" as const, path: "/code", value: "updated code" }]
      };
      
      const result = applySessionPatch(session, patch);
      
      expect(result).toBeDefined();
      expect(result.code).toBe("updated code");
    });
    
    it("should throw an error if old hash doesn't match", () => {
      const session = createTestSession();
      
      // Mock the computeSessionHash function to return a different hash
      vi.mocked(md5).mockReturnValueOnce("different-hash");
      
      const patch: CodePatch = {
        oldHash: "old-hash",
        hashCode: "new-hash",
        patch: [{ op: "replace" as const, path: "/code", value: "updated code" }]
      };
      
      expect(() => applySessionPatch(session, patch)).toThrow();
    });
    
    it("should return the sanitized session if no patch is provided", () => {
      const session = createTestSession();
      
      // Mock the computeSessionHash function to return the expected hash
      vi.mocked(md5).mockReturnValueOnce("same-hash");
      
      const patch: CodePatch = {
        oldHash: "same-hash",
        hashCode: "new-hash"
      };
      
      const result = applySessionPatch(session, patch);
      
      expect(result).toEqual(session);
    });
  });
});
