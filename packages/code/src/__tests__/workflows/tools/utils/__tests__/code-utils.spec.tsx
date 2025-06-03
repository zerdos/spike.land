import {
  calculateCodeChanges,
  estimateTokenSavings,
  logCodeChanges,
  shouldReturnFullCode,
  verifyCodeIntegrity,
} from "@/../workflows/tools/utils/code-utils";
import { md5 } from "@/lib/md5";
import { describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("@/lib/md5", () => ({
  md5: vi.fn((input) => `md5-${typeof input === "string" ? input.substring(0, 10) : "mock"}`),
}));

describe("code-utils", () => {
  describe("verifyCodeIntegrity", () => {
    it("should return true when code hash matches provided hash", () => {
      const code = "const test = 'test';";
      const hash = "md5-const test";

      vi.mocked(md5).mockReturnValueOnce(hash);

      const result = verifyCodeIntegrity(code, hash);

      expect(result).toBe(true);
      expect(md5).toHaveBeenCalledWith(code);
    });

    it("should return false when code hash doesn't match provided hash", () => {
      const code = "const test = 'test';";
      const hash = "incorrect-hash";

      vi.mocked(md5).mockReturnValueOnce("md5-const test");

      const result = verifyCodeIntegrity(code, hash);

      expect(result).toBe(false);
      expect(md5).toHaveBeenCalledWith(code);
    });

    it("should return false when code is empty", () => {
      const code = "";
      const hash = "md5-empty";

      const result = verifyCodeIntegrity(code, hash);

      expect(result).toBe(false);
    });

    it("should return false when hash is empty", () => {
      const code = "const test = 'test';";
      const hash = "";

      const result = verifyCodeIntegrity(code, hash);

      expect(result).toBe(false);
    });
  });

  describe("calculateCodeChanges", () => {
    it("should calculate metrics for code changes", () => {
      const oldCode = "line 1\nline 2\nline 3";
      const newCode = "line 1\nmodified line 2\nline 3\nline 4";

      const result = calculateCodeChanges(oldCode, newCode);

      expect(result).toHaveProperty("sizeChange");
      expect(result).toHaveProperty("lineCount");
      expect(result).toHaveProperty("changedLines");
      expect(result.lineCount.original).toBe(3);
      expect(result.lineCount.modified).toBe(4);
      expect(result.changedLines).toBeGreaterThan(0);
    });

    it("should handle identical code", () => {
      const code = "line 1\nline 2\nline 3";

      const result = calculateCodeChanges(code, code);

      expect(result.sizeChange).toBe(0);
      expect(result.changedLines).toBe(0);
    });

    it("should handle empty old code", () => {
      const oldCode = "";
      const newCode = "line 1\nline 2";

      const result = calculateCodeChanges(oldCode, newCode);

      expect(result.sizeChange).toBe(newCode.length);
      expect(result.lineCount.original).toBe(1); // Empty string has 1 line
      expect(result.lineCount.modified).toBe(2);
    });

    it("should handle empty new code", () => {
      const oldCode = "line 1\nline 2";
      const newCode = "";

      const result = calculateCodeChanges(oldCode, newCode);

      expect(result.sizeChange).toBe(-oldCode.length);
      expect(result.lineCount.original).toBe(2);
      expect(result.lineCount.modified).toBe(1); // Empty string has 1 line
    });
  });

  describe("logCodeChanges", () => {
    beforeEach(() => {
      vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should log code changes to console", () => {
      const oldCode = "line 1\nline 2\nline 3";
      const newCode = "line 1\nmodified line 2\nline 3\nline 4";

      logCodeChanges(oldCode, newCode);

      expect(console.warn).toHaveBeenCalled();
    });

    it("should not log when codes are identical", () => {
      const code = "line 1\nline 2\nline 3";

      logCodeChanges(code, code);

      expect(console.warn).not.toHaveBeenCalledWith(
        expect.stringContaining("Code modified successfully"),
      );
    });

    it("should handle large code changes", () => {
      const oldCode = "a".repeat(1000);
      const newCode = "b".repeat(1000);

      logCodeChanges(oldCode, newCode);

      expect(console.warn).toHaveBeenCalled();
    });
  });

  describe("shouldReturnFullCode", () => {
    // Mock the config constants
    const originalSmallFileThreshold = (globalThis as Record<string, unknown>).SMALL_FILE_THRESHOLD;
    const originalComplexChangeThreshold = (globalThis as Record<string, unknown>).COMPLEX_CHANGE_THRESHOLD;
    const originalSignificantChangeRatio = (globalThis as Record<string, unknown>).SIGNIFICANT_CHANGE_RATIO;

    beforeEach(() => {
      // Mock updateSearchReplace
      vi.mock("@/lib/chat-utils", () => ({
        updateSearchReplace: vi.fn().mockReturnValue([]),
      }));

      // Set mock values for constants
      (globalThis as Record<string, unknown>).SMALL_FILE_THRESHOLD = 1000;
      (globalThis as Record<string, unknown>).COMPLEX_CHANGE_THRESHOLD = 500;
      (globalThis as Record<string, unknown>).SIGNIFICANT_CHANGE_RATIO = 0.3;
    });

    afterEach(() => {
      // Restore original values
      (globalThis as Record<string, unknown>).SMALL_FILE_THRESHOLD = originalSmallFileThreshold;
      (globalThis as Record<string, unknown>).COMPLEX_CHANGE_THRESHOLD = originalComplexChangeThreshold;
      (globalThis as Record<string, unknown>).SIGNIFICANT_CHANGE_RATIO = originalSignificantChangeRatio;
    });

    it("should return true for small files", () => {
      const instructions = "Some instructions";
      const smallCode = "const x = 5;"; // Less than SMALL_FILE_THRESHOLD

      const result = shouldReturnFullCode(instructions, smallCode);

      expect(result).toBe(true);
    });

    it("should return true for complex changes", () => {
      const complexInstructions = "a".repeat(1000); // More than COMPLEX_CHANGE_THRESHOLD
      const largeCode = "a".repeat(2000); // More than SMALL_FILE_THRESHOLD

      const result = shouldReturnFullCode(complexInstructions, largeCode);

      expect(result).toBe(true);
    });
  });

  describe("estimateTokenSavings", () => {
    it("should estimate tokens based on character count", () => {
      const code = "a".repeat(100);

      const result = estimateTokenSavings(code);

      expect(result).toBe(25); // 100 characters / 4 = 25 tokens
    });

    it("should return 0 for empty code", () => {
      const result = estimateTokenSavings("");

      expect(result).toBe(0);
    });

    it("should return 0 for null or undefined input", () => {
      const result1 = estimateTokenSavings(null as unknown as string);
      const result2 = estimateTokenSavings(undefined as unknown as string);

      expect(result1).toBe(0);
      expect(result2).toBe(0);
    });
  });
});
