import { describe, expect, it } from "vitest";
import { applyDiff, createDiff } from "./text-diff";
import type { ICodeSession } from "./interfaces";

describe("diff-utils", () => {
  // Helper function to create a test session
  const createTestSession = (code: string = "const test = 'test';"): ICodeSession => ({
    codeSpace: "test-space",
    code,
    html: "<div>Test</div>",
    css: ".test { color: red; }",
    messages: [],
    transpiled: code,
  });

  describe("createDiff", () => {
    it("should create a diff between two sessions", () => {
      const oldSession = createTestSession("const x = 1;");
      const newSession = createTestSession("const x = 2;");
      
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
    });
    
    it("should create an empty diff for identical sessions", () => {
      const session = createTestSession();
      
      const diff = createDiff(session, session);
      
      expect(diff).toBeDefined();
      expect(Array.isArray(diff)).toBe(true);
      expect(diff.length).toBe(0);
    });
    
    it("should optimize message operations", () => {
      const oldSession = createTestSession();
      const newSession = createTestSession();
      
      // Add a message to the new session
      newSession.messages = [
        { id: "1", role: "user", content: "Test message" }
      ];
      
      const diff = createDiff(oldSession, newSession);
      
      expect(diff).toBeDefined();
      expect(Array.isArray(diff)).toBe(true);
      
      // Should contain an add operation for the message
      expect(diff.some(op => 
        op.op === "add" && 
        op.path === "/messages/-"
      )).toBe(true);
    });
    
    it("should optimize message content updates", () => {
      const oldSession = createTestSession();
      const newSession = createTestSession();
      
      // Add a message to both sessions, but with different content
      oldSession.messages = [
        { id: "1", role: "assistant", content: "Partial response" }
      ];
      
      newSession.messages = [
        { id: "1", role: "assistant", content: "Partial response with more text" }
      ];
      
      const diff = createDiff(oldSession, newSession);
      
      expect(diff).toBeDefined();
      expect(Array.isArray(diff)).toBe(true);
      
      // Should contain operations for updating the message content
      expect(diff.some(op => 
        (op.op === "add" && op.path.includes("/appendContent")) ||
        (op.op === "replace" && op.path.includes("/content"))
      )).toBe(true);
    });
  });
  
  describe("applyDiff", () => {
    it("should apply a diff to a session", () => {
      const oldSession = createTestSession("const x = 1;");
      const newSession = createTestSession("const x = 2;");
      
      const diff = createDiff(oldSession, newSession);
      const result = applyDiff(oldSession, diff);
      
      expect(result).toEqual(newSession);
    });
    
    it("should handle empty diffs", () => {
      const session = createTestSession();
      const emptyDiff = createDiff(session, session);
      
      const result = applyDiff(session, emptyDiff);
      
      expect(result).toEqual(session);
    });
    
    it("should handle message append operations", () => {
      const oldSession = createTestSession();
      oldSession.messages = [
        { id: "1", role: "assistant", content: "Partial response" }
      ];
      
      // Create a custom diff with an appendContent operation
      const diff = [
        {
          op: "add" as const,
          path: "/messages/0/appendContent",
          value: " with more text"
        }
      ];
      
      const result = applyDiff(oldSession, diff);
      
      expect(result.messages[0].content).toBe("Partial response with more text");
    });
    
    it("should handle errors gracefully", () => {
      const session = createTestSession();
      
      // Create an invalid diff
      const invalidDiff = [
        {
          op: "replace" as const,
          path: "/nonexistent",
          value: "test"
        }
      ];
      
      // Should not throw and should return a copy of the original session
      const result = applyDiff(session, invalidDiff);
      
      expect(result).toEqual(session);
      expect(result).not.toBe(session); // Should be a new object
    });
  });
});
