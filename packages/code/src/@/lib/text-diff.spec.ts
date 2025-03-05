import { describe, expect, it } from "vitest";
import type { ICodeSession, Message } from "./interfaces";
import { applyDiff, createDiff, ICodeSessionDiff } from "./text-diff";

describe("text-diff", () => {
  // Create base session objects for testing
  const createBaseSession = (code: string = "const test = 'test';"): ICodeSession => ({
    codeSpace: "test-space",
    code,
    html: "<div>Test</div>",
    css: ".test { color: red; }",
    messages: [],
    transpiled: "const test = 'test';",
  });

  describe("createDiff", () => {
    it("should create a diff between two sessions with different code", () => {
      const oldSession = createBaseSession("const x = 1;");
      const newSession = createBaseSession("const x = 2;");

      const diff = createDiff(oldSession, newSession);

      expect(diff).toBeDefined();
      expect(Array.isArray(diff)).toBe(true);
      expect(diff.length).toBeGreaterThan(0);

      // Should contain a replace operation for the code
      expect(diff.some(op =>
        op.op === "replace" &&
        op.path === "/code" &&
        op.value === "const x = 2;"
      )).toBe(true);

      expect(diff).toMatchInlineSnapshot(`
        [
          {
            "op": "replace",
            "path": "/code",
            "value": "const x = 2;",
          },
        ]
      `);
    });

    it("should create an empty diff for identical sessions", () => {
      const session = createBaseSession();

      const diff = createDiff(session, session);

      expect(diff).toBeDefined();
      expect(Array.isArray(diff)).toBe(true);
      expect(diff.length).toBe(0);
    });

    it("should handle message additions", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();

      const message: Message = {
        id: "1",
        role: "user",
        content: "Test message",
      };

      newSession.messages = [message];

      const diff = createDiff(oldSession, newSession);

      expect(diff).toBeDefined();
      expect(Array.isArray(diff)).toBe(true);
      expect(diff.length).toBeGreaterThan(0);

      // Should contain an operation for the messages
      expect(diff.some(op => op.path.includes("/messages"))).toBe(true);
    });

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

      const diff = createDiff(oldSession, newSession);

      expect(diff).toBeDefined();
      expect(Array.isArray(diff)).toBe(true);
      expect(diff.length).toBeGreaterThan(0);
      expect(diff).toMatchInlineSnapshot(`
        [
          {
            "op": "replace",
            "path": "/messages/0/content",
            "value": [
              {
                "text": "Modified text",
                "type": "text",
              },
            ],
          },
        ]
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

      const diff = createDiff(oldSession, newSession);

      expect(diff).toBeDefined();
      expect(Array.isArray(diff)).toBe(true);
      expect(diff.length).toBeGreaterThan(0);
      expect(diff).toMatchInlineSnapshot(`
        [
          {
            "op": "replace",
            "path": "/messages/1/content",
            "value": [
              {
                "text": "Original text added",
                "type": "text",
              },
            ],
          },
        ]
      `);
    });
  });

  describe("applyDiff", () => {
    it("should apply a diff to a session", () => {
      const oldSession = createBaseSession("const x = 1;");
      const newSession = createBaseSession("const x = 2;");

      const diff = createDiff(oldSession, newSession);
      const result = applyDiff(oldSession, diff);

      expect(result).toEqual(newSession);
    });

    it("should return the original session for an empty diff", () => {
      const session = createBaseSession();
      const emptyDiff: ICodeSessionDiff = [];

      const result = applyDiff(session, emptyDiff);

      expect(result).toEqual(session);
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

      const diff = createDiff(oldSession, newSession);
      const result = applyDiff(oldSession, diff);

      expect(result).toEqual(newSession);
    });

    it("should handle appending content to messages", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();

      oldSession.messages = [
        { id: "1", role: "assistant", content: "Partial response" },
      ];

      newSession.messages = [
        { id: "1", role: "assistant", content: "Partial response with more text" },
      ];

      const diff = createDiff(oldSession, newSession);
      const result = applyDiff(oldSession, diff);

      expect(result.messages[0].content).toBe("Partial response with more text");
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

      const diff = createDiff(oldSession, newSession);
      const result = applyDiff(oldSession, diff);

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

      const diff = createDiff(oldSession, newSession);
      const result = applyDiff(oldSession, diff);

      expect(result.messages).toEqual([]);
    });

    it("should handle very large strings (>10000 chars) efficiently", () => {
      // Create a large string by repeating a pattern
      const baseString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
      const repeatedString = baseString.repeat(250); // ~14000 chars
      
      const oldSession = createBaseSession(repeatedString);
      const newSession = createBaseSession(repeatedString + "a"); // Add a single 'a' at the end
      
      const diff = createDiff(oldSession, newSession);
      const diffJson = JSON.stringify(diff);
      
      // Apply the diff and verify it works correctly
      const result = applyDiff(oldSession, diff);
      expect(result.code).toBe(newSession.code);
      
      // Log the diff size and structure for analysis
      console.log(`Large string diff size: ${diffJson.length} chars`);
      console.log(`Diff structure:`, JSON.stringify(diff[0], null, 2).substring(0, 200) + '...');
      
      // Check if the diff contains the _diff property which indicates optimization
      const hasDiffProperty = diff.some(op => (op as any)._diff !== undefined);
      expect(hasDiffProperty).toBe(true);
    });

    it("should handle large strings with newlines efficiently", () => {
      // Create a large string with many newlines to test line-level diffing
      let largeString = "";
      for (let i = 0; i < 1000; i++) {
        largeString += `Line ${i}: This is a test line with some content.\n`;
      }
      
      const oldSession = createBaseSession(largeString);
      const newSession = createBaseSession(largeString + "a"); // Add a single 'a' at the end
      
      const diff = createDiff(oldSession, newSession);
      const diffJson = JSON.stringify(diff);
      
      // Apply the diff and verify it works correctly
      const result = applyDiff(oldSession, diff);
      expect(result.code).toBe(newSession.code);
      
      // Log the diff size for analysis
      console.log(`Large string with newlines diff size: ${diffJson.length} chars`);
      
      // Check if the diff contains the _diff property which indicates optimization
      const hasDiffProperty = diff.some(op => (op as any)._diff !== undefined);
      expect(hasDiffProperty).toBe(true);
    });

    it("should optimize diff for appending a single character to large text", () => {
      // Create a test specifically for the append case
      const largeText = "a".repeat(15000);
      
      const oldSession = createBaseSession(largeText);
      const newSession = createBaseSession(largeText + "a");
      
      const diff = createDiff(oldSession, newSession);
      
      // Apply the diff and verify it works correctly
      const result = applyDiff(oldSession, diff);
      expect(result.code).toBe(newSession.code);
      
      // Log the diff for analysis
      const diffJson = JSON.stringify(diff);
      console.log(`Append single char diff size: ${diffJson.length} chars`);
      
      // Check if the diff contains the _diff property
      const hasDiffProperty = diff.some(op => (op as any)._diff !== undefined);
      expect(hasDiffProperty).toBe(true);
      
      // Examine the diff structure
      if (diff.length > 0 && (diff[0] as any)._diff) {
        const diffChanges = (diff[0] as any)._diff;
        console.log(`Number of diff changes: ${diffChanges.length}`);
        
        // Check if there are only a few changes (ideally just 2 - one unchanged and one added)
        expect(diffChanges.length).toBeLessThanOrEqual(3);
      }
    });

    it("should handle inserting content in the middle of a large file", () => {
      // Create a large string
      const largeText = "x".repeat(15000);
      
      // Insert content in the middle
      const middleIndex = Math.floor(largeText.length / 2);
      const insertedContent = 'console.log("yo");';
      const newText = largeText.substring(0, middleIndex) + insertedContent + largeText.substring(middleIndex);
      
      const oldSession = createBaseSession(largeText);
      const newSession = createBaseSession(newText);
      
      const diff = createDiff(oldSession, newSession);
      
      // Apply the diff and verify it works correctly
      const result = applyDiff(oldSession, diff);
      
      // Log the diff for analysis
      const diffJson = JSON.stringify(diff);
      console.log(`Insert in middle diff size: ${diffJson.length} chars`);
      
      // Check if the diff contains the _diff property
      const hasDiffProperty = diff.some(op => (op as any)._diff !== undefined);
      expect(hasDiffProperty).toBe(true);
      
      // Verify the result has the inserted content
      expect(result.code.includes(insertedContent)).toBe(true);
      
      // Check if the diff size is small (less than 500 chars)
      expect(diffJson.length).toBeLessThan(500);
    });

    it("should handle inserting content at the 2/3 point of a large file", () => {
      // Create a large string
      const largeText = "y".repeat(15000);
      
      // Insert content at the 2/3 point
      const insertIndex = Math.floor(largeText.length * 2 / 3);
      const insertedContent = 'debugger;';
      const newText = largeText.substring(0, insertIndex) + insertedContent + largeText.substring(insertIndex);
      
      const oldSession = createBaseSession(largeText);
      const newSession = createBaseSession(newText);
      
      const diff = createDiff(oldSession, newSession);
      
      // Apply the diff and verify it works correctly
      const result = applyDiff(oldSession, diff);
      
      // Log the diff for analysis
      const diffJson = JSON.stringify(diff);
      console.log(`Insert at 2/3 point diff size: ${diffJson.length} chars`);
      
      // Check if the diff contains the _diff property
      const hasDiffProperty = diff.some(op => (op as any)._diff !== undefined);
      expect(hasDiffProperty).toBe(true);
      
      // Verify the result has the inserted content
      expect(result.code.includes(insertedContent)).toBe(true);
      
      // Check if the diff size is small (less than 500 chars)
      expect(diffJson.length).toBeLessThan(500);
    });
  });
});
