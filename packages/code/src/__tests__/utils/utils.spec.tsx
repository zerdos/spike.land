import { getPartsStreaming } from "@/lib/get-parts";
import { describe, expect, test } from "vitest";

describe("getParts", () => {
  test("should handle empty input", () => {
    const input = "";
    const result = getPartsStreaming(input, true);
    expect(result.parts).toMatchInlineSnapshot(`[]`);
  });

  test("should handle text without code blocks", () => {
    const input = "This is a simple text message.";
    const result = getPartsStreaming(input, true);
    expect(result.parts).toMatchInlineSnapshot(`
      [
        {
          "content": "This is a simple text message.",
          "type": "text",
        },
      ]
    `);
  });

  test("should handle text with a single code block", () => {
    const input = "Here is some code:\n```typescript\nconst x = 5;\nconsole.warn(x);\n```";
    const result = getPartsStreaming(input, false);
    expect(result.parts).toMatchInlineSnapshot(`
      [
        {
          "content": "Here is some code:",
          "type": "text",
        },
        {
          "content": "const x = 5;
      console.warn(x);
      ",
          "language": "typescript",
          "type": "code",
        },
      ]
    `);
  });

  test("should handle text with multiple code blocks", () => {
    const input =
      'First block:\n```javascript\nlet a = 1;\n```\nSecond block:\n```python\nprint("Hello")\n```';
    const result = getPartsStreaming(input, true);
    expect(result).toMatchInlineSnapshot(`
      {
        "parts": [
          {
            "content": "First block:",
            "type": "text",
          },
          {
            "content": "let a = 1;
      ",
            "language": "javascript",
            "type": "code",
          },
          {
            "content": "Second block:",
            "type": "text",
          },
          {
            "content": "print("Hello")
      ",
            "language": "python",
            "type": "code",
          },
        ],
        "state": {
          "accumulatedContent": "",
          "accumulatedDiffContent": "",
          "isInCodeBlock": false,
          "isInDiffBlock": false,
        },
      }
    `);
  });

  test("should handle code blocks with no language specified", () => {
    const input = "Code without language:\n```\nsome code\n```";
    const result = getPartsStreaming(input, false);
    expect(result.parts).toMatchInlineSnapshot(`
      [
        {
          "content": "Code without language:",
          "type": "text",
        },
        {
          "content": "some code
      ",
          "language": "plaintext",
          "type": "code",
        },
      ]
    `);
  });

  test("should handle search and replace markers", () => {
    const input = "Before\n<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE\nAfter";
    const result = getPartsStreaming(input, true);
    expect(result.parts).toMatchSnapshot();
  });

  test("should handle nested code blocks", () => {
    const input =
      'Outer block:\n```javascript\nfunction example() {\n  console.warn(`Inner block:\n```json\n{"key": "value"}\n````);\n}\n```';
    const result = getPartsStreaming(input, true);
    expect(result).toMatchSnapshot();
  });

  test("should handle an incomplete code block at the end", () => {
    const input = "Some text\n```javascript\nlet x = 10;\nconsole.warn(x);";
    const result = getPartsStreaming(input, false);
    expect(result).toMatchInlineSnapshot(`
      {
        "parts": [
          {
            "content": "Some text",
            "type": "text",
          },
          {
            "content": "let x = 10;
      console.warn(x);",
            "language": "javascript",
            "type": "code",
          },
        ],
        "state": {
          "accumulatedContent": "",
          "accumulatedDiffContent": "",
          "isInCodeBlock": false,
          "isInDiffBlock": false,
        },
      }
    `);
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

    const result = getPartsStreaming(input, true);
    expect(result).toMatchSnapshot();
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

    const result = getPartsStreaming(input, false);
    expect(result.parts[0]).toMatchSnapshot();
    expect(result.parts[1]).toMatchSnapshot();
  });
});
