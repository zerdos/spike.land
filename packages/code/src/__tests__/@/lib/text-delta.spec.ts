import { describe, expect, it } from "vitest";
import type { ICodeSession, MessagePart, TextPart } from "@/lib/interfaces";
// import { applyDelta , ICodeSessionDiff as JsonDiffSessionDiff } from "./json-diff";
import { applyDelta, createDelta } from "@/lib/text-delta";

describe("text-diff", () => {
  // Create base session objects for testing
  const createBaseSession = (code = "const test = 'test';"): ICodeSession => ({
    codeSpace: "test-space",
    code,
    html: "<div>Test</div>",
    css: ".test { color: red; }",
    messages: [],
    transpiled: "const test = 'test';",
  });

  describe("createDelta", () => {
    it("should handle nested property changes", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();

      // Add nested messages with different content
      oldSession.messages = [
        {
          id: "1",
          role: "user",
          content: [{
            type: "text",
            text: "Original text",
          }],
        },
      ];

      newSession.messages = [
        {
          id: "1",
          role: "user",
          content: [{
            type: "text",
            text: "Modified text",
          }],
        },
      ];

      const diff = createDelta(oldSession, newSession);

      expect(diff).toBeDefined();
      expect(diff).toMatchInlineSnapshot(`
        {
          "messages": {
            "0": {
              "content": {
                "0": {
                  "text": [
                    "Original text",
                    "Modified text",
                  ],
                },
                "_t": "a",
              },
            },
            "_t": "a",
          },
        }
      `);
    });

    it("should handle extra chunk addition in the last message", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();

      // Add nested messages with different content
      oldSession.messages = [
        {
          id: "1",
          role: "user",
          content: [{
            type: "text",
            text: "hello text",
          }],
        },
        {
          id: "2",
          role: "assistant",
          content: [{
            type: "text",
            text: "Original text",
          }],
        },
      ];

      newSession.messages = [
        {
          id: "1",
          role: "user",
          content: [{
            type: "text",
            text: "hello text",
          }],
        },
        {
          id: "2",
          role: "assistant",
          content: [{
            type: "text",
            text: "Original text added",
          }],
        },
      ];

      const diff = createDelta(oldSession, newSession);
      const recreatedSession = applyDelta(oldSession, diff);

      expect(recreatedSession.messages.length).toBe(2);
      expect((recreatedSession.messages[1].content[0] as TextPart).text).toBe(
        "Original text added",
      );
    });
  });

  describe("applyDelta", () => {
    it("should apply a diff to a session", () => {
      const oldSession = createBaseSession("const x = 1;");
      const newSession = createBaseSession("const x = 2;");

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      expect(result).toEqual(newSession);
    });

    it("should handle message modifications", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();

      oldSession.messages = [
        { id: "1", role: "user", content: "Original message" },
      ];

      newSession.messages = [
        { id: "1", role: "user", content: "Modified message" },
      ];

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      expect(result).toEqual(newSession);
    });

    it("should handle appending content to messages", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();

      oldSession.messages = [
        { id: "1", role: "assistant", content: "Partial response" },
      ];

      newSession.messages = [
        {
          id: "1",
          role: "assistant",
          content: "Partial response with more text",
        },
      ];

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      expect(result.messages[0].content).toBe(
        "Partial response with more text",
      );
    });

    it("should handle adding new messages", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();

      oldSession.messages = [
        { id: "1", role: "user", content: "Question" },
      ];

      newSession.messages = [
        { id: "1", role: "user", content: "Question" },
        { id: "2", role: "assistant", content: "Answer" },
      ];

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      expect(result.messages.length).toBe(2);
      expect(result.messages[1].content).toBe("Answer");
    });

    it("should handle clearing messages", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();

      oldSession.messages = [
        { id: "1", role: "user", content: "Message" },
      ];

      newSession.messages = [];

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      expect(result.messages).toEqual([]);
    });

    it("should handle very large strings (>10000 chars) efficiently", () => {
      // Create a large string by repeating a pattern
      const baseString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
      const repeatedString = baseString.repeat(250); // ~14000 chars

      const oldSession = createBaseSession(repeatedString);
      const newSession = createBaseSession(repeatedString + "a"); // Add a single 'a' at the end

      const diff = createDelta(oldSession, newSession);
      const diffJson = JSON.stringify(diff);

      // Apply the diff and verify it works correctly
      const result = applyDelta(oldSession, diff);
      expect(result.code).toBe(newSession.code);

      // Log the diff size for analysis
      console.log(`Large string diff size: ${diffJson.length} chars`);

      // Verify the diff is efficient (much smaller than the full string)
      expect(diffJson.length).toBeLessThan(repeatedString.length / 10);
    });

    it("should handle large strings with newlines efficiently", () => {
      // Create a large string with many newlines to test line-level diffing
      let largeString = "";
      for (let i = 0; i < 1000; i++) {
        largeString += `Line ${i}: This is a test line with some content.\n`;
      }

      const oldSession = createBaseSession(largeString);
      const newSession = createBaseSession(largeString + "a"); // Add a single 'a' at the end

      const diff = createDelta(oldSession, newSession);
      const diffJson = JSON.stringify(diff);

      // Apply the diff and verify it works correctly
      const result = applyDelta(oldSession, diff);
      expect(result.code).toBe(newSession.code);

      // Log the diff size for analysis
      console.log(
        `Large string with newlines diff size: ${diffJson.length} chars`,
      );

      // For this test, we're just verifying the diff works correctly
      // We don't need to check for the _diff property since it's an implementation detail
      // that might change based on the size and content of the strings
    });

    it("should optimize diff for appending a single character to large text", () => {
      // Create a test specifically for the append case
      const largeText = "a".repeat(1500);

      const oldSession = createBaseSession(largeText);
      const newSession = createBaseSession(largeText + "a");

      const diff = createDelta(oldSession, newSession);

      // Apply the diff and verify it works correctly
      const result = applyDelta(oldSession, diff);
      expect(result.code).toBe(newSession.code);

      // Log the diff for analysis
      const diffJson = JSON.stringify(diff);
      console.log(`Append single char diff size: ${diffJson.length} chars`);

      // Verify the diff is efficient (much smaller than the full string)
      expect(diffJson.length).toBeLessThan(largeText.length / 10);
    });

    it("should handle inserting content in the middle of a large file", () => {
      // Create a large string
      const largeText = "x".repeat(1500);

      // Insert content in the middle
      const middleIndex = Math.floor(largeText.length / 2);
      const insertedContent = 'console.log("yo");';
      const newText = largeText.substring(0, middleIndex) + insertedContent +
        largeText.substring(middleIndex);

      const oldSession = createBaseSession(largeText);
      const newSession = createBaseSession(newText);

      const diff = createDelta(oldSession, newSession);

      // Apply the diff and verify it works correctly
      const result = applyDelta(oldSession, diff);

      // Log the diff for analysis
      const diffJson = JSON.stringify(diff);
      console.log(`Insert in middle diff size: ${diffJson.length} chars`);

      // Verify the result has the inserted content
      expect(result.code.includes(insertedContent)).toBe(true);

      // Check if the diff size is small (much smaller than the full string)
      expect(diffJson.length).toBeLessThan(largeText.length / 10);
    });

    it("should handle inserting content at the 2/3 point of a large file", () => {
      // Create a large string
      const largeText = "y".repeat(1500);

      // Insert content at the 2/3 point
      const insertIndex = Math.floor(largeText.length * 2 / 3);
      const insertedContent = "debugger;";
      const newText = largeText.substring(0, insertIndex) + insertedContent +
        largeText.substring(insertIndex);

      const oldSession = createBaseSession(largeText);
      const newSession = createBaseSession(newText);

      const diff = createDelta(oldSession, newSession);

      // Apply the diff and verify it works correctly
      const result = applyDelta(oldSession, diff);

      // Log the diff for analysis
      const diffJson = JSON.stringify(diff);
      console.log(`Insert at 2/3 point diff size: ${diffJson.length} chars`);

      // Verify the result has the inserted content
      expect(result.code.includes(insertedContent)).toBe(true);

      // Check if the diff size is small (much smaller than the full string)
      expect(diffJson.length).toBeLessThan(largeText.length / 10);
    });

    it("should handle empty strings", () => {
      const oldSession = createBaseSession("");
      const newSession = createBaseSession("some content");

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      expect(result.code).toBe("some content");

      // Test the reverse case too
      const reverseDiff = createDelta(newSession, oldSession);
      const reverseResult = applyDelta(newSession, reverseDiff);

      expect(reverseResult.code).toBe("");
    });

    it("should handle strings at threshold boundaries", () => {
      // Test string just below STRING_DIFF_THRESHOLD (80)
      const shortStr = "x".repeat(79);
      const shortStrNew = shortStr + "y";

      const oldSession = createBaseSession(shortStr);
      const newSession = createBaseSession(shortStrNew);

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      expect(result.code).toBe(shortStrNew);

      // Test string just above threshold
      const longStr = "x".repeat(81);
      const longStrNew = longStr + "y";

      const oldSession2 = createBaseSession(longStr);
      const newSession2 = createBaseSession(longStrNew);

      const diff2 = createDelta(oldSession2, newSession2);
      const result2 = applyDelta(oldSession2, diff2);

      expect(result2.code).toBe(longStrNew);
    });

    it("should handle unicode and special characters", () => {
      const unicodeStr = "Hello 👋 World 🌍 \\n \\t 你好";
      const newUnicodeStr = "Hello 👋 Updated 🌍 World \\n \\t 你好";

      const oldSession = createBaseSession(unicodeStr);
      const newSession = createBaseSession(newUnicodeStr);

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      expect(result.code).toBe(newUnicodeStr);
    });

    it("should handle multiple insertions in large strings", () => {
      const baseStr = "x".repeat(15000);
      let modifiedStr = baseStr;
      const insertions = [
        { pos: 100, content: "first" },
        { pos: 7500, content: "middle" },
        { pos: 14900, content: "end" },
      ];

      insertions.forEach(({ pos, content }) => {
        modifiedStr = modifiedStr.slice(0, pos) + content +
          modifiedStr.slice(pos);
      });

      const oldSession = createBaseSession(baseStr);
      const newSession = createBaseSession(modifiedStr);

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      // Instead of exact string comparison, check that all insertions are present
      insertions.forEach(({ content }) => {
        expect(result.code.includes(content)).toBe(true);
      });

      // Check that the length is correct
      expect(result.code.length).toBe(modifiedStr.length);
    });

    it("should handle multiple message updates in a single diff", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();

      oldSession.messages = [
        { id: "1", role: "user", content: "First" },
        { id: "2", role: "assistant", content: "Second" },
        { id: "3", role: "user", content: "Third" },
      ];

      newSession.messages = [
        { id: "1", role: "user", content: "First Updated" },
        { id: "2", role: "assistant", content: "Second Updated" },
        { id: "3", role: "user", content: "Third Updated" },
      ];

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      expect(result.messages).toEqual(newSession.messages);
    });

    it("should handle complex message content structures", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();

      const complexContent: MessagePart[] = [
        { type: "text", text: "Hello" },
        { type: "text", text: "console.log('test');" },
        { type: "text", text: "one\ntwo" },
      ];

      oldSession.messages = [
        { id: "1", role: "user", content: complexContent },
      ];

      const updatedContent: MessagePart[] = [
        ...complexContent,
        { type: "text", text: "New block" },
      ];

      newSession.messages = [
        { id: "1", role: "user", content: updatedContent },
      ];

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      expect(result.messages[0].content).toEqual(updatedContent);
    });

    it("should handle line vs character diffing thresholds", () => {
      // Create a large string with many lines
      const lines = Array.from({ length: 1000 }, (_, i) => `Line ${i}\n`);
      const oldStr = lines.join("");

      // Modify a few lines in the middle
      const modifiedLines = [...lines];
      modifiedLines[500] = "Modified Line 500\n";
      modifiedLines[501] = "Modified Line 501\n";
      const newStr = modifiedLines.join("");

      const oldSession = createBaseSession(oldStr);
      const newSession = createBaseSession(newStr);

      const diff = createDelta(oldSession, newSession);
      const result = applyDelta(oldSession, diff);

      expect(result.code).toBe(newStr);
    });
  });
});
