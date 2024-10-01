import { describe, expect, test } from "vitest";
import { getParts } from "@/lib/get-parts";

describe("getParts", () => {
  test("should handle empty input", () => {
    const input = "";
    const result = getParts(input, true);
    expect(result).toEqual([]);
  });

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
        content: "Here is some code:",
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
        content: "First block:",
      },
      {
        type: "code",
        language: "javascript",
        content: "let a = 1;",
      },
      {
        type: "text",
        content: "Second block:",
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
        content: "Code without language:",
      },
      {
        type: "code",
        language: "plaintext",
        content: "some code",
      },
    ]);
  });

  test("should handle search and replace markers", () => {
    const input = "Before\n<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE\nAfter";
    const result = getParts(input, true);
    expect(result).toEqual([
      {
        type: "text",
        content: "Before",
      },
      {
        type: "code",
        language: "diff",
        content: "<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE",
      },
      {
        type: "text",
        content: "After",
      },
    ]);
  });

  test("should handle nested code blocks", () => {
    const input = "Outer block:\n```javascript\nfunction example() {\n  console.log(`Inner block:\n\`\`\`json\n{\"key\": \"value\"}\n\`\`\``);\n}\n```";
    const result = getParts(input, true);
    expect(result).toEqual([
      {
        type: "text",
        content: "Outer block:",
      },
      {
        type: "code",
        language: "javascript",
        content: "function example() {\n  console.log(`Inner block:\n\`\`\`json\n{\"key\": \"value\"}\n\`\`\``);\n}",
      },
    ]);
  });

  test("should handle an incomplete code block at the end", () => {
    const input = "Some text\n```javascript\nlet x = 10;\nconsole.log(x);";
    const result = getParts(input, false);
    expect(result).toEqual([
      {
        type: "text",
        content: "Some text",
      },
      {
        type: "code",
        language: "javascript",
        content: "let x = 10;\nconsole.log(x);",
        isStreaming: true,
      },
    ]);
  });

  test("should handle multiple search and replace markers", () => {
    const input = `
    first change:
      <<<<<<< SEARCH
      const a = 1;
      =======
      const a = 2;
      >>>>>>> REPLACE
    second change:
      <<<<<<< SEARCH
      let b = 3;
      =======
      let b = 4;
      >>>>>>> REPLACE
    `;

    const result = getParts(input, true);
    expect(result).toEqual([
      {
        type: "text",
        content: "first change:",
      },
      {
        type: "code",
        language: "diff",
        content: "<<<<<<< SEARCH\n      const a = 1;\n      =======\n      const a = 2;\n      >>>>>>> REPLACE",
      },
      {
        type: "text",
        content: "second change:",
      },
      {
        type: "code",
        language: "diff",
        content: "<<<<<<< SEARCH\n      let b = 3;\n      =======\n      let b = 4;\n      >>>>>>> REPLACE",
      },
    ]);
  });

  test("should handle incomplete search and replace markers", () => {
    const input = `
    first change:
      <<<<<<< SEARCH
      const a = 1;
      =======
      const a = 2;
      =======
    second change:
      <<<<<<< SEARCH
      let b = 3;
      =======
      let b =
    `;

    const result = getParts(input, true);
    expect(result[0].content.trim()).toEqual("first change:");
    expect(result[1].content.trim()).toEqual(
      "<<<<<<< SEARCH\n      const a = 1;\n      =======\n      const a = 2;\n      ======="
    );
    expect(result[2].content.trim()).toEqual("second change:");
    expect(result[3].content.trim()).toEqual(
      "<<<<<<< SEARCH\n      let b = 3;\n      =======\n      let b ="
    );
  });
});
