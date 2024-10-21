import { describe, expect, test } from "vitest";
import { getPartsStreaming } from "@/lib/get-parts";

describe("getParts", () => {
  test("should handle empty input", () => {
    const input = "";
    const result = getPartsStreaming(input, true);
    expect(result.parts).toMatchInlineSnapshot([]);
  });

  test("should handle text without code blocks", () => {
    const input = "This is a simple text message.";
    const result = getPartsStreaming(input, true);
    expect(result.parts).toMatchInlineSnapshot([
      {
        type: "text",
        content: "This is a simple text message.",
      },
    ]);
  });

  test("should handle text with a single code block", () => {
    const input =
      "Here is some code:\n```typescript\nconst x = 5;\nconsole.log(x);\n```";
    const result = getPartsStreaming(input, false);
    expect(result.parts).toMatchInlineSnapshot(`
      [
        {
          "content": "Here is some code:",
          "type": "text",
        },
        {
          "content": "const x = 5;
      console.log(x);
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
    const input =
      "Before\n<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE\nAfter";
    const result = getPartsStreaming(input, true);
    expect(result.parts).toMatchInlineSnapshot(`
      [
        {
          "content": "Before",
          "type": "text",
        },
        {
          "content": "<<<<<<< SEARCH
      old code
      =======
      new code
      >>>>>>> REPLACE
      ",
          "language": "diff",
          "type": "code",
        },
        {
          "content": "After",
          "type": "text",
        },
      ]
    `);
  });

  test("should handle nested code blocks", () => {
    const input =
      'Outer block:\n```javascript\nfunction example() {\n  console.log(`Inner block:\n```json\n{"key": "value"}\n````);\n}\n```';
    const result = getPartsStreaming(input, true);
    expect(result).toMatchInlineSnapshot(`
      {
        "parts": [
          {
            "content": "Outer block:",
            "type": "text",
          },
          {
            "content": "function example() {
        console.log(\`Inner block:
      ",
            "language": "javascript",
            "type": "code",
          },
          {
            "content": "json
      {"key": "value"}
      \`\`\`\`);
      }
      \`\`\`",
            "type": "text",
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

  test("should handle an incomplete code block at the end", () => {
    const input = "Some text\n```javascript\nlet x = 10;\nconsole.log(x);";
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
      console.log(x);",
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
    expect(result).toMatchInlineSnapshot(`
      {
        "parts": [
          {
            "content": "first change:",
            "type": "text",
          },
          {
            "content": "<<<<<<< SEARCH
            const a = 1;
            =======
            const a = 2;
            >>>>>>> REPLACE
      ",
            "language": "diff",
            "type": "code",
          },
          {
            "content": "second change:",
            "type": "text",
          },
          {
            "content": "<<<<<<< SEARCH
            let b = 3;
            =======
            let b = 4;
            >>>>>>> REPLACE
      ",
            "language": "diff",
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
    expect(result.parts[0]).toMatchInlineSnapshot(`
      {
        "content": "first change:",
        "type": "text",
      }
    `);
    expect(result.parts[1]).toMatchInlineSnapshot(`
      {
        "content": "<<<<<<< SEARCH
            const a = 1;
            =======
            const a = 2;
            =======
          second change:
            <<<<<<< SEARCH
            let b = 3;
            =======
            let b =
          ",
        "language": "diff",
        "type": "code",
      }
    `);
    expect(result.parts[2]).toMatchInlineSnapshot(`undefined`);
    expect(result.parts[3]).toMatchInlineSnapshot(`undefined`);
  });
});
