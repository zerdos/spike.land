import { applyDelta, createDelta } from "@/lib/delta";
import { describe, expect, it } from "vitest";
import type { ICodeSession } from "@/lib/interfaces";

// Define an interface for the operation with _diff property
interface StringDiffOperation {
  op: string;
  path: string;
  value: string;
  _diff?: unknown;
}

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
    const modified = createSampleSession(
      longString + " Added some text at the end.",
    );

    // Create a diff
    const diff = createDelta(original, modified);

    // Apply the diff and check the result
    const result = applyDelta(original, diff);
    expect(result.code).toEqual(modified.code);
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
    const diff = createDelta(originalSession, modifiedSession);

    // Apply the diff and check the result
    const result = applyDelta(originalSession, diff);
    expect(result.messages[0].content).toEqual(
      modifiedSession.messages[0].content,
    );
  });
});
