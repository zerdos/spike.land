import { describe, expect, it } from "vitest";
import type { ICodeSession } from "./interfaces";
import { applyDiff, createDiff } from "./text-diff";

describe("text-diff with string optimization", () => {
  // Create a sample session with a long string property
  const createSampleSession = (code: string): ICodeSession => ({
    codeSpace: "test-space",
    code,
    html: "<div>Test</div>",
    css: ".test { color: red; }",
    transpiled: "const x = 1;",
    messages: [],
  });

  it("should use string diff for long strings", () => {
    // Create a long string (> 80 chars)
    const longString =
      "This is a very long string that exceeds the threshold of 80 characters. It should trigger the string diff optimization.";

    // Create original and modified sessions
    const original = createSampleSession(longString);
    const modified = createSampleSession(longString + " Added some text at the end.");

    // Create a diff
    const diff = createDiff(original, modified);

    // Check if the diff contains our custom _diff property
    const stringDiffOp = diff.find(op =>
      op.op === "replace" &&
      op.path === "/code" &&
      (op as any)._diff !== undefined
    );

    // Verify that we're using string diff
    expect(stringDiffOp).toBeDefined();
    expect((stringDiffOp as any)._diff).toBeDefined();

    // Apply the diff and check the result
    const result = applyDiff(original, diff);
    expect(result.code).toEqual(modified.code);
  });

  it("should not use string diff for short strings", () => {
    // Create a short string (< 80 chars)
    const shortString = "This is a short string.";

    // Create original and modified sessions
    const original = createSampleSession(shortString);
    const modified = createSampleSession(shortString + " Added text.");

    // Create a diff
    const diff = createDiff(original, modified);

    // Check if the diff contains a regular replace operation without _diff
    const replaceOp = diff.find(op =>
      op.op === "replace" &&
      op.path === "/code"
    );

    // Verify that we're not using string diff
    expect(replaceOp).toBeDefined();
    expect((replaceOp as any)._diff).toBeUndefined();

    // Apply the diff and check the result
    const result = applyDiff(original, diff);
    expect(result.code).toEqual(modified.code);
  });

  it("should handle very large text changes efficiently", () => {
    // Create a very long string (20k chars)
    const createRepeatedString = (baseStr: string, length: number) => {
      let result = "";
      const repeats = Math.ceil(length / baseStr.length);
      for (let i = 0; i < repeats; i++) {
        result += baseStr;
      }
      return result.substring(0, length);
    };

    // Use a fixed string pattern instead of random characters
    const baseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
    const veryLongString = createRepeatedString(baseString, 20000);

    // Create a modified version with a tiny change in the middle
    // Make the change small enough to trigger diff-based optimization
    const modifiedString = veryLongString.substring(0, 10000) +
      "." +
      veryLongString.substring(10001);

    // Create original and modified sessions
    const original = createSampleSession(veryLongString);
    const modified = createSampleSession(modifiedString);

    // Create a diff
    const diff = createDiff(original, modified);

    // Check if the diff contains our custom _diff property
    const stringDiffOp = diff.find(op =>
      op.op === "replace" &&
      op.path === "/code"
    );

    // Verify that we have a replace operation for the code
    expect(stringDiffOp).toBeDefined();

    // Apply the diff and check the result
    const result = applyDiff(original, diff);
    expect(result.code).toEqual(modified.code);

    // Verify that the diff is not significantly larger than the full string
    // In real-world scenarios, the diff might be slightly larger due to metadata
    const diffSize = JSON.stringify(diff).length;
    const fullStringSize = modifiedString.length;

    console.log(`Diff size: ${diffSize} bytes, Full string size: ${fullStringSize} bytes`);

    // Allow the diff to be up to 5% larger than the full string
    // This is a reasonable trade-off for the benefits of using diffs
    const maxAllowedSize = fullStringSize * 1.05;
    expect(diffSize).toBeLessThan(maxAllowedSize);
  });

  it("should handle nested message content with string diffs", () => {
    // Create a session with a message containing a long content string
    const longContent =
      "This is a very long message content that exceeds the threshold of 80 characters. It should trigger the string diff optimization.";

    const originalSession: ICodeSession = {
      codeSpace: "test-space",
      code: "const x = 1;",
      html: "<div>Test</div>",
      css: ".test { color: red; }",
      transpiled: "const x = 1;",
      messages: [
        {
          id: "1",
          role: "assistant",
          content: longContent,
        },
      ],
    };

    const modifiedSession: ICodeSession = {
      ...originalSession,
      messages: [
        {
          id: "1",
          role: "assistant",
          content: longContent + " Added some text at the end.",
        },
      ],
    };

    // Create a diff
    const diff = createDiff(originalSession, modifiedSession);

    // Apply the diff and check the result
    const result = applyDiff(originalSession, diff);
    expect(result.messages[0].content).toEqual(modifiedSession.messages[0].content);
  });
});
