import { sanitizeSession } from "@/lib/make-sess";
import { applyDiff, createDiff } from "@/lib/text-diff";
import { describe, expect, it } from "vitest";

const originalSession = sanitizeSession({
  code: "code",
  transpiled: "transpiled",
  messages: [{
    id: "1",
    role: "user",
    content: "test message",
  }, {
    id: "2",
    role: "assistant",
    content: "test message",
  }],
  html: "html",
  css: "css",
  codeSpace: "codeSpace",
});

describe("text-diff", () => {


  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
let consoleLogSpy: ReturnType<typeof vi.spyOn>;


  // Mock console before tests
beforeAll(() => {
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

});

// Restore console after tests
afterAll(() => {
  consoleErrorSpy.mockRestore();
  consoleLogSpy.mockRestore();
});


  describe("createDiff", () => {
    it("should create a diff for code changes", () => {
      const revision = sanitizeSession({
        ...originalSession,
        code: "new code",
      });
      const diff = createDiff(originalSession, revision);
      const reconstructed = applyDiff(originalSession, diff);
      expect(revision).toEqual(reconstructed);
    });

    it("should create a diff for multiple property changes", () => {
      const revision = sanitizeSession({
        ...originalSession,
        code: "new code",
        html: "new html",
        css: "new css",
      });
      const diff = createDiff(originalSession, revision);
      const reconstructed = applyDiff(originalSession, diff);
      expect(revision).toEqual(reconstructed);
    });

    it("should handle message array changes", () => {
      const revision = sanitizeSession({
        ...originalSession,
        messages: [
          ...originalSession.messages,
          {
            id: "3",
            role: "user",
            content: "new message",
          },
        ],
      });
      const diff = createDiff(originalSession, revision);
      const reconstructed = applyDiff(originalSession, diff);
      expect(revision).toEqual(reconstructed);
    });

    it("should handle empty messages array", () => {
      const revision = sanitizeSession({
        ...originalSession,
        messages: [],
      });
      const diff = createDiff(originalSession, revision);
      const reconstructed = applyDiff(originalSession, diff);
      expect(revision).toEqual(reconstructed);
    });

    it("should handle identical sessions", () => {
      const revision = sanitizeSession({ ...originalSession });
      const diff = createDiff(originalSession, revision);
      expect(diff).toEqual([]);
      const reconstructed = applyDiff(originalSession, diff);
      expect(revision).toEqual(reconstructed);
    });
  });

  describe("applyDiff", () => {
    it("should apply multiple diffs in sequence", () => {
      // First change
      const revision1 = sanitizeSession({
        ...originalSession,
        code: "intermediate code",
      });
      const diff1 = createDiff(originalSession, revision1);
      const intermediate = applyDiff(originalSession, diff1);

      // Second change
      const revision2 = sanitizeSession({
        ...revision1,
        code: "final code",
      });
      const diff2 = createDiff(revision1, revision2);
      const final = applyDiff(intermediate, diff2);

      expect(final).toEqual(revision2);
    });

    it("should handle empty diff array", () => {
      const result = applyDiff(originalSession, []);
      expect(result).toEqual(originalSession);
    });
  });
});
