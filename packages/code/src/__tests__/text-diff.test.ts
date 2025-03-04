import { createDiff, applyDiff, ICodeSessionDiff } from "@/lib/text-diff";
import type { ICodeSession, Message } from "@/lib/interfaces";
import { describe, expect, it } from "vitest";
import { Operation, AddOperation, ReplaceOperation, TestOperation } from "fast-json-patch";

// Helper function to create a basic session
function createSession(
  code = "",
  messages: Message[] = [],
  codeSpace = "test",
  html = "",
  css = "",
  transpiled = ""
): ICodeSession {
  return {
    code,
    messages,
    codeSpace,
    html,
    css,
    transpiled,
  };
}

// Helper function to create a message
function createMessage(
  role: "user" | "assistant" | "system",
  content: string,
  id = Date.now().toString()
): Message {
  return { id, role, content };
}

// Type for our custom operations
type CustomOperation = 
  | AddOperation<any> 
  | ReplaceOperation<any> 
  | TestOperation<any>
  | { op: "add"; path: string; value: any };

describe("text-diff", () => {
  describe("createDiff", () => {
    // Test basic non-message changes
    it("should create a diff for code changes", () => {
      const original = createSession("const x = 1;");
      const revision = createSession("const x = 2;");
      
      const diff = createDiff(original, revision);
      
      expect(diff).toHaveLength(1);
      expect(diff[0].op).toBe("replace");
      expect(diff[0].path).toBe("/code");
      expect((diff[0] as ReplaceOperation<any>).value).toBe("const x = 2;");
    });
    
    it("should create a diff for multiple property changes", () => {
      const original = createSession("const x = 1;", [], "test", "<div></div>", "body {}", "");
      const revision = createSession("const x = 2;", [], "test", "<span></span>", "body { color: red; }", "");
      
      const diff = createDiff(original, revision);
      
      expect(diff.length).toBeGreaterThanOrEqual(3);
      expect(diff.some(op => op.path === "/code" && (op as ReplaceOperation<any>).value === "const x = 2;")).toBe(true);
      expect(diff.some(op => op.path === "/html" && (op as ReplaceOperation<any>).value === "<span></span>")).toBe(true);
      expect(diff.some(op => op.path === "/css" && (op as ReplaceOperation<any>).value === "body { color: red; }")).toBe(true);
    });
    
    // Test message deletion (removeMessages)
    it("should optimize message deletion", () => {
      const original = createSession("", [
        createMessage("user", "Hello"),
        createMessage("assistant", "Hi there")
      ]);
      const revision = createSession("", []);
      
      const diff = createDiff(original, revision);
      
      expect(diff).toHaveLength(1);
      expect(diff[0].op).toBe("replace");
      expect(diff[0].path).toBe("/messages");
      expect((diff[0] as ReplaceOperation<any>).value).toEqual([]);
    });
    
    // Test adding a new message (addMessage)
    it("should optimize adding a new message", () => {
      const original = createSession("", [
        createMessage("user", "Hello", "1")
      ]);
      const revision = createSession("", [
        createMessage("user", "Hello", "1"),
        createMessage("assistant", "Hi there", "2")
      ]);
      
      const diff = createDiff(original, revision);
      
      expect(diff).toHaveLength(1);
      expect(diff[0].op).toBe("add");
      expect(diff[0].path).toBe("/messages/-");
      expect((diff[0] as AddOperation<any>).value).toEqual(createMessage("assistant", "Hi there", "2"));
    });
    
    // Test message chunk addition (addMessageChunk)
    it("should optimize adding a small chunk to the last message", () => {
      const original = createSession("", [
        createMessage("user", "Hello", "1"),
        createMessage("assistant", "Hi", "2")
      ]);
      const revision = createSession("", [
        createMessage("user", "Hello", "1"),
        createMessage("assistant", "Hi there", "2")
      ]);
      
      const diff = createDiff(original, revision);
      
      // Should use content replacement for small chunks
      expect(diff.length).toBeGreaterThanOrEqual(1);
      expect(diff.some(op => op.op === "replace" && op.path.includes("/content"))).toBe(true);
      expect(diff.some(op => (op as ReplaceOperation<any>).value === "Hi there")).toBe(true);
    });
    
    it("should replace content for large chunks", () => {
      const original = createSession("", [
        createMessage("user", "Hello", "1"),
        createMessage("assistant", "Hi", "2")
      ]);
      
      // Create a large content string
      const largeContent = "Hi" + "X".repeat(1000);
      const revision = createSession("", [
        createMessage("user", "Hello", "1"),
        createMessage("assistant", largeContent, "2")
      ]);
      
      const diff = createDiff(original, revision);
      
      // Should use replace for large content
      expect(diff.some(op => op.op === "replace" && op.path.includes("/content"))).toBe(true);
    });
    
    // Test edge cases
    it("should handle message content that doesn't start with original content", () => {
      const original = createSession("", [
        createMessage("assistant", "Hello world", "1")
      ]);
      const revision = createSession("", [
        createMessage("assistant", "Different content", "1")
      ]);
      
      const diff = createDiff(original, revision);
      
      expect(diff.some(op => op.op === "replace" && op.path.includes("/content"))).toBe(true);
      expect(diff.some(op => (op as ReplaceOperation<any>).value === "Different content")).toBe(true);
    });
    
    it("should handle changes to multiple messages", () => {
      const original = createSession("", [
        createMessage("user", "Hello", "1"),
        createMessage("assistant", "Hi", "2"),
        createMessage("user", "How are you?", "3")
      ]);
      const revision = createSession("", [
        createMessage("user", "Hello", "1"),
        createMessage("assistant", "Hello there", "2"),
        createMessage("user", "How are you today?", "3")
      ]);
      
      const diff = createDiff(original, revision);
      
      // Should fall back to standard JSON patch for multiple message changes
      expect(diff.length).toBeGreaterThan(1);
    });
    
    it("should handle changes to message properties other than content", () => {
      const original = createSession("", [
        createMessage("user", "Hello", "1"),
        createMessage("assistant", "Hi", "2")
      ]);
      
      // Change the role of the last message
      const revision = createSession("", [
        createMessage("user", "Hello", "1"),
        { ...createMessage("system", "Hi", "2"), type: "command" } as Message
      ]);
      
      const diff = createDiff(original, revision);
      
      // Should replace the whole message
      expect(diff.some(op => op.op === "replace" && op.path === "/messages/1")).toBe(true);
    });
  });
  
  describe("applyDiff", () => {
    it("should apply standard property changes", () => {
      const original = createSession("const x = 1;");
      const revision = createSession("const x = 2;");
      
      const diff = createDiff(original, revision);
      const result = applyDiff(original, diff);
      
      expect(result.code).toBe("const x = 2;");
    });
    
    it("should apply message deletion", () => {
      const original = createSession("", [
        createMessage("user", "Hello"),
        createMessage("assistant", "Hi there")
      ]);
      const revision = createSession("", []);
      
      const diff = createDiff(original, revision);
      const result = applyDiff(original, diff);
      
      expect(result.messages).toEqual([]);
    });
    
    it("should apply new message addition", () => {
      const original = createSession("", [
        createMessage("user", "Hello", "1")
      ]);
      const newMessage = createMessage("assistant", "Hi there", "2");
      const revision = createSession("", [
        createMessage("user", "Hello", "1"),
        newMessage
      ]);
      
      const diff = createDiff(original, revision);
      const result = applyDiff(original, diff);
      
      expect(result.messages).toHaveLength(2);
      expect(result.messages[1]).toEqual(newMessage);
    });
    
    it("should apply message chunk addition", () => {
      const original = createSession("", [
        createMessage("user", "Hello", "1"),
        createMessage("assistant", "Hi", "2")
      ]);
      const revision = createSession("", [
        createMessage("user", "Hello", "1"),
        createMessage("assistant", "Hi there", "2")
      ]);
      
      const diff = createDiff(original, revision);
      const result = applyDiff(original, diff);
      
      expect(result.messages[1].content).toBe("Hi there");
    });
    
    it("should handle custom appendContent operation", () => {
      const original = createSession("", [
        createMessage("assistant", "Hello", "1")
      ]);
      
      // Manually create a diff with appendContent operation
      const customDiff: CustomOperation[] = [
        {
          op: "test",
          path: "/messages/0/id",
          value: "1"
        },
        {
          op: "test",
          path: "/messages/0/role",
          value: "assistant"
        },
        {
          op: "add",
          path: "/messages/0/appendContent",
          value: " world"
        }
      ];
      
      const result = applyDiff(original, customDiff as any);
      
      expect(result.messages[0].content).toBe("Hello world");
    });
    
    it("should handle invalid appendContent operation gracefully", () => {
      const original = createSession("", [
        createMessage("assistant", "Hello", "1")
      ]);
      
      // Create an invalid appendContent operation (wrong index)
      const customDiff: CustomOperation[] = [
        {
          op: "add",
          path: "/messages/999/appendContent",
          value: " world"
        }
      ];
      
      // Should not throw an error
      expect(() => applyDiff(original, customDiff as any)).not.toThrow();
      
      // Result should be unchanged
      const result = applyDiff(original, customDiff as any);
      expect(result.messages[0].content).toBe("Hello");
    });
    
    it("should handle complex diffs with multiple operations", () => {
      const original = createSession(
        "const x = 1;", 
        [createMessage("user", "Hello", "1")],
        "test",
        "<div></div>",
        "body {}"
      );
      
      const revision = createSession(
        "const x = 2;", 
        [
          createMessage("user", "Hello", "1"),
          createMessage("assistant", "Hi there", "2")
        ],
        "test",
        "<span></span>",
        "body { color: red; }"
      );
      
      const diff = createDiff(original, revision);
      const result = applyDiff(original, diff);
      
      expect(result.code).toBe("const x = 2;");
      expect(result.html).toBe("<span></span>");
      expect(result.css).toBe("body { color: red; }");
      expect(result.messages).toHaveLength(2);
      expect(result.messages[1].content).toBe("Hi there");
    });
  });
});
