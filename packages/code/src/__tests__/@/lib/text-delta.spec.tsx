import { applyDelta, createDelta } from "@/lib/delta";
import type { ICodeSession } from "@/lib/interfaces";
import { describe, expect, it } from "vitest";

// Define an interface for the operation with _diff property

describe("text-diff with string optimization", () => {
  // Create a sample session with a long string property
  const createSampleSession = (code: string): ICodeSession => ({
    codeSpace: "test-space",
    code,
    html: "<div>Test</div>",
    css: ".test { color: red; }",
    transpiled: "const x = 1;"
  });

  it("should use string diff for long strings", () => {
    // Create a long string (> 80 chars)
    const longString =
      "This is a very long string that exceeds the threshold of 80 characters. It should trigger the string diff optimization.";

    // Create original and modified sessions
    const original = createSampleSession(longString);
    const modified = createSampleSession(
      longString + " Added some text at the end.",
    );

    // Create a diff
    const diff = createDelta(original, modified);

    // Apply the diff and check the result
    const result = applyDelta(original, diff);
    expect(result.code).toEqual(modified.code);
  });

});
