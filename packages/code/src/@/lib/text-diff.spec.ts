import { describe, expect, it } from "vitest";
import { createDiff, applyDiff, ICodeSessionDiff } from "./text-diff";
import type { ICodeSession, Message } from "./interfaces";

describe("text-diff", () => {
  // Create base session objects for testing
  const createBaseSession = (code: string = "const test = 'test';"): ICodeSession => ({
    codeSpace: "test-space",
    code,
    html: "<div>Test</div>",
    css: ".test { color: red; }",
    messages: [],
    transpiled: "const test = 'test';"
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
        content: "Test message"
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
            text: "Original text" 
          }]
        }
      ];
      
      newSession.messages = [
        {
          id: "1",
          role: "user",
          content: [{ 
            type: "text", 
            text: "Modified text" 
          }]
        }
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
            text: "hello text" 
          }]
        },
        {
          id: "2",
          role: "assistant",
          content: [{ 
            type: "text", 
            text: "Original text" 
          }]
        }
      ];
      
      newSession.messages = [
        {
          id: "1",
          role: "user",
          content: [{ 
            type: "text", 
            text: "hello text" 
          }]
        },
        {
          id: "2",
          role: "assistant",
          content: [{ 
            type: "text", 
            text: "Original text added" 
          }]
        }
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
        { id: "1", role: "user", content: "Original message" }
      ];
      
      newSession.messages = [
        { id: "1", role: "user", content: "Modified message" }
      ];
      
      const diff = createDiff(oldSession, newSession);
      const result = applyDiff(oldSession, diff);
      
      expect(result).toEqual(newSession);
    });
    
    it("should handle appending content to messages", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();
      
      oldSession.messages = [
        { id: "1", role: "assistant", content: "Partial response" }
      ];
      
      newSession.messages = [
        { id: "1", role: "assistant", content: "Partial response with more text" }
      ];
      
      const diff = createDiff(oldSession, newSession);
      const result = applyDiff(oldSession, diff);
      
      expect(result.messages[0].content).toBe("Partial response with more text");
    });
    
    it("should handle adding new messages", () => {
      const oldSession = createBaseSession();
      const newSession = createBaseSession();
      
      oldSession.messages = [
        { id: "1", role: "user", content: "Question" }
      ];
      
      newSession.messages = [
        { id: "1", role: "user", content: "Question" },
        { id: "2", role: "assistant", content: "Answer" }
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
        { id: "1", role: "user", content: "Message" }
      ];
      
      newSession.messages = [];
      
      const diff = createDiff(oldSession, newSession);
      const result = applyDiff(oldSession, diff);
      
      expect(result.messages).toEqual([]);
    });
  });
});
