import { extractCodeModification, loadMessages, updateSearchReplace } from "@/lib/chat-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("updateSearchReplace", () => {
  it('should return the original code if instructions do not contain "SEARCH"', () => {
    const instructions = "Some random instructions";
    const codeNow = "const a = 1;";
    const result = updateSearchReplace(instructions, codeNow);
    expect(result).toBe(codeNow);
  });

  it("should return modified code when instructions contain valid search and replace markers", () => {
    const instructions = `
      <<<<<<< SEARCH
      const a = 1;
      =======
      const a = 2;
      >>>>>>> REPLACE
    `;
    const codeNow = "const a = 1;";
    const result = updateSearchReplace(instructions, codeNow);
    expect(result).toBe("const a = 2;");
  });

  it("should handle multiple modifications", () => {
    const inst = `
      <<<<<<< SEARCH
      const a = 1;
      =======
      const a = 2;
      >>>>>>> REPLACE

      <<<<<<< SEARCH
      let b = 3;
      =======
      let b = 4;
      >>>>>>> REPLACE
    `;
    const codeNow = "const a = 1;\nlet b = 3;";
    const instructions = extractCodeModification(inst);
    expect(instructions).toMatchSnapshot();

    const result = updateSearchReplace(inst, codeNow);
    expect(result).toBe("const a = 2;\nlet b = 4;");
  });

  it("should return the original code if an error occurs", () => {
    const instructions = `
      <<<<<<< SEARCH
      const asqqaa = 1;
      =======
      const a = 2;
      >s>>>>>> REPLACE
    `;
    const codeNow = "const a = 1; ";

    const result = updateSearchReplace(instructions, codeNow);
    expect(result).toBe(codeNow);
  });

  it("should handle broken search replace blocks", () => {
    const codeNow = `
    const a = 1;
    const b = 2;
    const c = 3;
    `;

    const instructions = `
\`\`\`tsx
    const a = 1;
    =======
    const a = 10;
    =======
    fooo bar blalalal
\`\`\`
    `;

    const result = updateSearchReplace(instructions, codeNow);
    expect(result).toBe(`
    const a = 10;
    const b = 2;
    const c = 3;
    `);
  });

  it("should handle multiple broken search replace blocks", () => {
    const codeNow = `
    const a = 1;
    const b = 2;
    const c = 3;
    `;

    const instructions = `
\`\`\`tsx
    const a = 1;
    =======
    const a = 10;
    =======
    fooo bar blalalal
\`\`\`


some text between
\`\`\`tsx
    const b = 2;
    =======
    const b = 20;
 \`\`\`
 
 

\`\`\`tsx
    <<<<<<< SEARCH
    const c = 3;
    =======
    const c = 30;
\`\`\`
\`\`\`tsx
    <<<<<<< SEARCH
    This is a broken block
    =======
    This should be ignored
\`\`\`
    `;

    const result = updateSearchReplace(instructions, codeNow);
    expect(result).toBe(`
    const a = 10;
    const b = 20;
    const c = 30;
    `);
  });
});

describe("extractCodeModification", () => {
  it("should extract code modifications from response", () => {
    const response = `
      Some text
      <<<<<<< SEARCH
      const a = 1;
      =======
      const a = 2;
      >>>>>>> REPLACE
      More text
    `;
    const result = extractCodeModification(response);
    expect(result).toHaveLength(1);
    expect(result[0]).toContain("<<<<<<< SEARCH");
    expect(result[0]).toContain("=======");
    expect(result[0]).toContain(">>>>>>> REPLACE");
  });

  it("should handle multiple code modifications", () => {
    const response = `
      <<<<<<< SEARCH
      const a = 1;
      =======
      const a = 2;
      >>>>>>> REPLACE
      Some text
      <<<<<<< SEARCH
      let b = 3;
      =======
      let b = 4;
      >>>>>>> REPLACE
    `;
    const result = extractCodeModification(response);
    expect(result).toHaveLength(2);
  });

  it("should handle code blocks with search and replace markers", () => {
    const response = `
      \`\`\`tsx
      <<<<<<< SEARCH
      const a = 1;
      =======
      const a = 2;
      >>>>>>> REPLACE
      \`\`\`
    `;
    const result = extractCodeModification(response);
    expect(result).toHaveLength(2);
    expect(result[0]).toContain("<<<<<<< SEARCH");
    expect(result[0]).toContain("=======");
    expect(result[0]).toContain(">>>>>>> REPLACE");
    expect(result[1]).toContain("const a = 1;");
    expect(result[1]).toContain("=======");
    expect(result[1]).toContain("const a = 2;");
  });
});

describe("loadMessages", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem");
    localStorage.clear();
  });

  it("should load messages from localStorage", () => {
    const codeSpace = "testSpace";
    const messages = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" },
    ];
    localStorage.setItem(`chatMessages-${codeSpace}`, JSON.stringify(messages));

    const result = loadMessages(codeSpace);
    expect(result).toEqual(messages);
    expect(localStorage.getItem).toHaveBeenCalledWith(
      `chatMessages-${codeSpace}`,
    );
  });

  it("should filter out messages without a role", () => {
    const codeSpace = "testSpace";
    const messages = [
      { role: "user", content: "Hello" },
      { content: "This should be filtered out" },
      { role: "assistant", content: "Hi there" },
    ];
    localStorage.setItem(`chatMessages-${codeSpace}`, JSON.stringify(messages));

    const result = loadMessages(codeSpace);
    expect(result).toEqual([
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" },
    ]);
  });

  it("should remove consecutive messages with the same role", () => {
    const codeSpace = "testSpace";
    const messages = [
      { role: "user", content: "Hello" },
      { role: "user", content: "How are you?" },
      { role: "assistant", content: "Hi there" },
      { role: "assistant", content: "I'm doing well" },
      { role: "user", content: "Great!" },
    ];
    localStorage.setItem(`chatMessages-${codeSpace}`, JSON.stringify(messages));

    const result = loadMessages(codeSpace);
    expect(result).toEqual([
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" },
      { role: "user", content: "Great!" },
    ]);
  });

  it("should return an empty array if no messages are found", () => {
    const codeSpace = "emptySpace";
    const result = loadMessages(codeSpace);
    expect(result).toEqual([]);
  });
});
