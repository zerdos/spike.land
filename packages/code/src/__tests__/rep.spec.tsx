import { replacePreservingWhitespace } from "@/lib/diff-utils";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("replacePreservingWhitespace", () => {
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

  it("1. should replace a word in the middle of a sentence", () => {
    const result = replacePreservingWhitespace(
      "The quick brown fox",
      "quick",
      "slow",
    );
    expect(result).toEqual("The slow brown fox");
  });

  it("2. should preserve leading whitespace", () => {
    const result = replacePreservingWhitespace(
      "   The quick brown fox",
      "The",
      "A",
    );
    expect(result).toEqual("   A quick brown fox");
  });

  it("3. should preserve trailing whitespace", () => {
    const result = replacePreservingWhitespace(
      "The quick brown fox   ",
      "fox",
      "cat",
    );
    expect(result).toEqual("The quick brown cat   ");
  });

  it("4. should handle multiple occurrences", () => {
    const result = replacePreservingWhitespace(
      "The quick quick brown quick fox",
      "quick",
      "slow",
    );
    expect(result).toEqual("The slow slow brown slow fox");
  });

  it("5. should handle special characters in search string", () => {
    const result = replacePreservingWhitespace(
      "The (quick) brown fox",
      "(quick)",
      "[slow]",
    );
    expect(result).toEqual("The [slow] brown fox");
  });

  it("6. should not replace if search string is not found", () => {
    const result = replacePreservingWhitespace(
      "The quick brown fox",
      "lazy",
      "energetic",
    );
    expect(result).toEqual("The quick brown fox");
  });

  it("8. should handle empty replace string", () => {
    const result = replacePreservingWhitespace(
      "The quick brown fox",
      "quick",
      "",
    );
    expect(result).toEqual("The  brown fox");
  });

  it("9. should handle search string with varying whitespace", () => {
    const result = replacePreservingWhitespace(
      "The   quick   brown   fox",
      "quick",
      "slow",
    );
    expect(result).toEqual("The   slow   brown   fox");
  });

  it("10. should handle replace string longer than search string", () => {
    const result = replacePreservingWhitespace(
      "The quick brown fox",
      "quick",
      "very slow",
    );
    expect(result).toEqual("The very slow brown fox");
  });

  it("11. should deal with tricky ones", () => {
    const result = replacePreservingWhitespace(
      `The 
        quick 
        brown 
        fox`,
      "quick brown",
      "very slow",
    );
    expect(result).toEqual(`The 
        very slow 
        fox`);
  });

  it("should handle code blocks with comments", () => {
    const result = replacePreservingWhitespace(
      `function foo() {
  // Some comment
  const a = 1;
  const b = 2;
}`,
      `// Some comment
  const a = 1;`,
      `// Modified code
  const x = 42;`,
    );
    expect(result).toBe(`function foo() {
  // Modified code
  const x = 42;
  const b = 2;
}`);
  });
});
