import { describe, expect, test } from "vitest";
import { getParts } from "./utils";

describe("getParts", () => {
  test("should handle text without code blocks", () => {
    const input = "This is a simple text message.";
    const result = getParts(input, true);
    expect(result).toEqual([
      {
        type: "text",
        content: "This is a simple text message.",
      },
    ]);
  });

  test("should handle text with a single code block", () => {
    const input = "Here is some code:\n```typescript\nconst x = 5;\nconsole.log(x);\n```";
    const result = getParts(input, false);
    expect(result).toEqual([
      {
        type: "text",
        content: "Here is some code:\n",
      },
      {
        type: "code",
        language: "typescript",
        content: "const x = 5;\nconsole.log(x);",
      },
    ]);
  });

  test("should handle text with multiple code blocks", () => {
    const input = "First block:\n```javascript\nlet a = 1;\n```\nSecond block:\n```python\nprint(\"Hello\")\n```";
    const result = getParts(input, true);
    expect(result).toEqual([
      {
        type: "text",
        content: "First block:\n",
      },
      {
        type: "code",
        language: "javascript",
        content: "let a = 1;",
      },
      {
        type: "text",
        content: "\nSecond block:\n",
      },
      {
        type: "code",
        language: "python",
        content: "print(\"Hello\")",
      },
    ]);
  });

  test("should handle code blocks with no language specified", () => {
    const input = "Code without language:\n```\nsome code\n```";
    const result = getParts(input, false);
    expect(result).toEqual([
      {
        type: "text",
        content: "Code without language:\n",
      },
      {
        type: "code",
        language: "plaintext",
        content: "some code",
      },
    ]);
  });

  test("should handle search and replace markers", () => {
    const input = "Before\n<<<<<<< SEARCH\nold code\n>>>>>>> REPLACE\nnew code\nAfter";
    const result = getParts(input, true);
    expect(result).toEqual([
      {
        type: "text",
        content: "Before\n",
      },
      {
        type: "code",
        language: "diff",
        content: "<<<<<<< SEARCH\nold code\n>>>>>>> REPLACE\nnew code",
      },
      {
        type: "text",
        content: "\nAfter",
      },
    ]);
  });

  test("should handle an incomplete code block at the end", () => {
    const input = "Some text\n```javascript\nlet x = 10;";
    const result = getParts(input, false);
    expect(result).toEqual([
      {
        type: "text",
        content: "Some text\n",
      },
      {
        type: "code",
        language: "javascript",
        content: "let x = 10;",
        isStreaming: true,
      },
    ]);
  });
});
