import { updateSearchReplace, extractCodeModification } from "@/lib/chat-utils";
import { replacePreservingWhitespace } from "@/lib/diff-utils";
import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock dependencies
vi.mock("@/lib/diff-utils", () => ({
  replacePreservingWhitespace: vi.fn((text, search, replace) => {
    // Simple implementation for testing
    return text.replace(search, replace);
  }),
}));

describe("updateSearchReplace", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should apply a single search/replace modification", () => {
    const originalCode = "const x = 1;";
    const instructions = `
<<<<<<< SEARCH
const x = 1;
=======
const x = 2;
>>>>>>> REPLACE
`;

    const result = updateSearchReplace(instructions, originalCode);

    expect(replacePreservingWhitespace).toHaveBeenCalledWith(
      originalCode,
      "const x = 1;",
      "const x = 2;"
    );
    expect(result).toBe("const x = 2;");
  });

  it("should apply multiple search/replace modifications in order", () => {
    const originalCode = "const x = 1;\nconst y = 2;";
    const instructions = `
<<<<<<< SEARCH
const x = 1;
=======
const x = 10;
>>>>>>> REPLACE

<<<<<<< SEARCH
const y = 2;
=======
const y = 20;
>>>>>>> REPLACE
`;

    // Mock replacePreservingWhitespace to handle multiple calls
    (replacePreservingWhitespace as any)
      .mockReturnValueOnce("const x = 10;\nconst y = 2;")
      .mockReturnValueOnce("const x = 10;\nconst y = 20;");

    const result = updateSearchReplace(instructions, originalCode);

    expect(replacePreservingWhitespace).toHaveBeenCalledTimes(2);
    expect(replacePreservingWhitespace).toHaveBeenNthCalledWith(
      1,
      originalCode,
      "const x = 1;",
      "const x = 10;"
    );
    expect(replacePreservingWhitespace).toHaveBeenNthCalledWith(
      2,
      "const x = 10;\nconst y = 2;",
      "const y = 2;",
      "const y = 20;"
    );
    expect(result).toBe("const x = 10;\nconst y = 20;");
  });

  it("should handle search/replace blocks in code blocks", () => {
    const originalCode = "function test() {\n  return 42;\n}";
    const instructions = `
Here's the change:

\`\`\`
<<<<<<< SEARCH
function test() {
  return 42;
}
=======
function test() {
  return 100;
}
>>>>>>> REPLACE
\`\`\`
`;

    const result = updateSearchReplace(instructions, originalCode);

    expect(replacePreservingWhitespace).toHaveBeenCalledWith(
      originalCode,
      "function test() {\n  return 42;\n}",
      "function test() {\n  return 100;\n}"
    );
  });

  it("should handle empty replace sections (deletions)", () => {
    const originalCode = "const x = 1;\nconst toDelete = true;\nconst y = 2;";
    const instructions = `
<<<<<<< SEARCH
const toDelete = true;
=======
>>>>>>> REPLACE
`;

    const result = updateSearchReplace(instructions, originalCode);

    expect(replacePreservingWhitespace).toHaveBeenCalledWith(
      originalCode,
      "const toDelete = true;",
      ""
    );
  });

  it("should handle empty search sections (insertions)", () => {
    const originalCode = "const x = 1;\nconst y = 2;";
    const instructions = `
<<<<<<< SEARCH
const x = 1;
=======
const x = 1;
const newVar = 'inserted';
>>>>>>> REPLACE
`;

    const result = updateSearchReplace(instructions, originalCode);

    expect(replacePreservingWhitespace).toHaveBeenCalledWith(
      originalCode,
      "const x = 1;",
      "const x = 1;\nconst newVar = 'inserted';"
    );
  });

  it("should return the original code if no valid modifications are found", () => {
    const originalCode = "const x = 1;";
    const instructions = "No valid search/replace blocks here";

    const result = updateSearchReplace(instructions, originalCode);

    expect(replacePreservingWhitespace).not.toHaveBeenCalled();
    expect(result).toBe(originalCode);
  });

  it("should handle errors during replacement", () => {
    const originalCode = "const x = 1;";
    const instructions = `
<<<<<<< SEARCH
const x = 1;
=======
const x = 2;
>>>>>>> REPLACE
`;

    // Mock replacePreservingWhitespace to throw an error
    (replacePreservingWhitespace as any).mockImplementationOnce(() => {
      throw new Error("Test error");
    });

    // Mock console.error
    const originalConsoleError = console.error;
    console.error = vi.fn();

    try {
      const result = updateSearchReplace(instructions, originalCode);
      
      // Should return original code on error
      expect(result).toBe(originalCode);
      expect(console.error).toHaveBeenCalledWith(
        "Error applying code modifications:",
        expect.any(Error)
      );
    } finally {
      console.error = originalConsoleError;
    }
  });
});

describe("extractCodeModification", () => {
  // Mock the extractCodeModification function for testing
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should extract modifications from regular format", () => {
    const response = `
Here's the change:

<<<<<<< SEARCH
const x = 1;
=======
const x = 2;
>>>>>>> REPLACE
`;

    const result = extractCodeModification(response);

    expect(result).toHaveLength(1);
    expect(result[0]).toContain("<<<<<<< SEARCH");
    expect(result[0]).toContain("const x = 1;");
    expect(result[0]).toContain("=======");
    expect(result[0]).toContain("const x = 2;");
    expect(result[0]).toContain(">>>>>>> REPLACE");
  });

  it("should extract modifications from code blocks", () => {
    const response = `
Here's the change:

\`\`\`
<<<<<<< SEARCH
const x = 1;
=======
const x = 2;
>>>>>>> REPLACE
\`\`\`
`;

    // We're testing the actual implementation here
    const result = extractCodeModification(response);
    
    // Just verify that we get at least one result with the expected content
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toContain("<<<<<<< SEARCH");
    expect(result[0]).toContain("const x = 1;");
    expect(result[0]).toContain("=======");
    expect(result[0]).toContain("const x = 2;");
    expect(result[0]).toContain(">>>>>>> REPLACE");
  });

  it("should extract multiple modifications", () => {
    const response = `
First change:

<<<<<<< SEARCH
const x = 1;
=======
const x = 2;
>>>>>>> REPLACE

Second change:

\`\`\`
<<<<<<< SEARCH
const y = 1;
=======
const y = 2;
>>>>>>> REPLACE
\`\`\`
`;

    // We're testing the actual implementation here
    const result = extractCodeModification(response);
    
    // Just verify that we get at least two results
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it("should return empty array if no modifications found", () => {
    const response = "No modifications here";

    const result = extractCodeModification(response);

    expect(result).toEqual([]);
  });
});
