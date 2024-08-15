import { describe, expect, it } from "vitest";
import { updateSearchReplace } from "./chatUtils";

describe("updateSearchReplace", () => {
  it("should return the original code if instructions do not contain \"SEARCH\"", () => {
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
    const instructions = `
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
    const result = updateSearchReplace(instructions, codeNow);
    expect(result).toBe("const a = 2;\nlet b = 4;");
  });

  it("should return the original code if an error occurs", () => {
    const instructions = `
      <<<<<<< SEARCH
      const a = 1;
      =======
      const a = 2;
      >>>>>>> REPLACE
    `;
    const codeNow = "const a = 1; ";

    const em = () => {
      throw new Error("Mock error");
    };

    const result = updateSearchReplace(instructions, codeNow, em);
    expect(result).toBe(codeNow);
  });
});
