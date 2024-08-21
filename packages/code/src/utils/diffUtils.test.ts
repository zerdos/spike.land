import { describe, expect, it } from "vitest";
import { extractDiffContent, isDiffContent } from "./diffUtils";

describe("diffUtils", () => {
  describe("extractDiffContent", () => {
    it("should extract original and modified content correctly", () => {
      const diffContent = `
<<<<<<< SEARCH
Original content
=======
Modified content
>>>>>>> REPLACE
      `;

      const result = extractDiffContent(diffContent);

      expect(result).toEqual({
        original: "Original content",
        modified: "Modified content",
      });
    });

    it("should handle empty original content", () => {
      const diffContent = `
<<<<<<< SEARCH
=======
Modified content
>>>>>>> REPLACE
      `;

      const result = extractDiffContent(diffContent);

      expect(result).toEqual({
        original: "",
        modified: "Modified content",
      });
    });

    it("should handle empty modified content", () => {
      const diffContent = `
<<<<<<< SEARCH
Original content
=======
>>>>>>> REPLACE
      `;

      const result = extractDiffContent(diffContent);

      expect(result).toEqual({
        original: "Original content",
        modified: "",
      });
    });

    it("should handle multi-line content", () => {
      const diffContent = `
<<<<<<< SEARCH
Original
content
with
multiple
lines
=======
Modified
content
with
multiple
lines
>>>>>>> REPLACE
      `;

      const result = extractDiffContent(diffContent);

      expect(result).toEqual({
        original: "Original\ncontent\nwith\nmultiple\nlines",
        modified: "Modified\ncontent\nwith\nmultiple\nlines",
      });
    });

    it("should return empty strings for invalid diff content", () => {
      const invalidContent = "This is not a valid diff content";

      const result = extractDiffContent(invalidContent);

      expect(result).toEqual({
        original: "",
        modified: "",
      });
    });
  });

  describe("isDiffContent", () => {
    it("should return true for valid diff content", () => {
      const diffContent = "<<<<<<< SEARCH\nOriginal\n=======\nModified\n>>>>>>> REPLACE";
      expect(isDiffContent(diffContent)).toBe(true);
    });

    it("should return false for invalid diff content", () => {
      const invalidContent = "This is not a valid diff content";
      expect(isDiffContent(invalidContent)).toBe(false);
    });

    it("should do partial", () => {
      const diffContent = `
      <<<<<<< SEARCH
      Original conte`;

      const result = isDiffContent(diffContent);
      expect(result).toBe(true);
      expect(extractDiffContent(diffContent).original).toBe("Original conte");
      expect(extractDiffContent(diffContent).modified).toBe("");
    });
  });

  it("should do partial2", () => {
    const diffContent = `
    <<<<<<< SEARCH
    Original conte
    =======
    z
    `;

    const result = isDiffContent(diffContent);
    expect(result).toBe(true);
    expect(extractDiffContent(diffContent).original).toBe("Original conte");
    expect(extractDiffContent(diffContent).modified).toBe("z");
  });
});
