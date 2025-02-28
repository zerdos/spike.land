import { describe, it, expect } from "vitest";
import {
  verifyCodeIntegrity,
  shouldReturnFullCode,
  compressCode,
  decompressCode,
  calculateCodeChanges,
  logCodeChanges,
  estimateTokenSavings,
} from "../code-utils";
import { md5 } from "@/lib/md5";

describe("code-utils", () => {
  describe("verifyCodeIntegrity", () => {
    it("should return true for matching code and hash", () => {
      const code = "function test() {}";
      const hash = md5(code);
      expect(verifyCodeIntegrity(code, hash)).toBe(true);
    });

    it("should return false for mismatched code and hash", () => {
      const code = "function test() {}";
      const hash = md5("different code");
      expect(verifyCodeIntegrity(code, hash)).toBe(false);
    });
  });


  describe("shouldReturnFullCode", () => {
    const smallCode = "small".repeat(100); // 500 chars
    const largeCode = "large".repeat(1000); // 5000 chars

    it("should return true for small files", () => {
      expect(shouldReturnFullCode("any instructions", smallCode)).toBe(true);
    });

    it("should return true for complex changes", () => {
      const complexInstructions = `
<<<<<<< SEARCH
${smallCode}
=======
${largeCode}
>>>>>>> REPLACE
`;
      expect(shouldReturnFullCode(complexInstructions, largeCode)).toBe(true);
    });

    it("should return false for simple changes to large files", () => {
      const simpleInstructions = `
<<<<<<< SEARCH
const x = 1;
=======
const x = 2;
>>>>>>> REPLACE
`;
      expect(shouldReturnFullCode(simpleInstructions, largeCode)).toBe(false);
    });
  });


  describe("calculateCodeChanges", () => {
    it("should calculate size and line changes", () => {
      const original = "line1\nline2\nline3";
      const modified = "line1\nmodified\nline3\nnew line";

      const changes = calculateCodeChanges(original, modified);
      expect(changes.sizeChange).toBeGreaterThan(0);
      expect(changes.lineCount.original).toBe(3);
      expect(changes.lineCount.modified).toBe(4);
      expect(changes.changedLines).toBe(2); // 1 modified + 1 added
    });

    it("should handle empty inputs", () => {
      const changes = calculateCodeChanges("", "");
      expect(changes.sizeChange).toBe(0);
      expect(changes.lineCount.original).toBe(1);
      expect(changes.lineCount.modified).toBe(1);
      expect(changes.changedLines).toBe(0);
    });
  });

  describe("logCodeChanges", () => {
    it("should not log anything for identical code", () => {
      const code = "function test() {}";
      // Mock console.log to verify it's not called
      const consoleSpy = vi.spyOn(console, "log");
      logCodeChanges(code, code);
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe("estimateTokenSavings", () => {
    it("should estimate tokens based on character count", () => {
      expect(estimateTokenSavings("test")).toBe(1); // 4 chars = 1 token
      expect(estimateTokenSavings("this is a longer test")).toBe(5); // 20 chars = 5 tokens
      expect(estimateTokenSavings("")).toBe(0);
    });
  });
});
