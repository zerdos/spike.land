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

  it("should do partial3", () => {
    const diffContent = `
  ${"```jsx"}
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

  it("should do partial4", () => {
    const diffContent = `

To implement the functionality you wanted, we need to modify the \`divStyle\` to include the hover state that changes the text color to the value of the \`color\` variable. Below are the changes needed:

1. **Add hover effect to \`divStyle\`:**

\`\`\`tsx
<<<<<<< SEARCH
                       transition: color 0.3s ease;
=======
                       transition: color 0.3s ease;
                       &:hover {
                         color: \${color};
                       }
>>>>>>> REPLACE
\`\`\`

**Explanation:**
- We introduced the \`&:hover\` selector within the \`css\` block to define a hover effect.
- When the user hovers over the \`div\`, the text color will change to the value of the \`color\` variable, which is set to "white".

2. **No changes are needed in the return statement**, as it correctly reflects the intended behavior of the component.

With this change, the text color will change to white when a user hovers over the div, as per your requirement.

### Suggestions for improvement:
1. You might want to consider adding a background color transition as well for a more responsive visual effect on hover.
2. If you plan to use different colors dynamically, consider passing the \`color\` as a prop to make the component more reusable.
3. Implementing accessibility features, such as focus styles, could enhance usability for keyboard users.

`;

    const result = isDiffContent(diffContent);
    expect(result).toBe(true);
    expect(extractDiffContent(diffContent).original).toBe("transition: color 0.3s ease;");
    expect(extractDiffContent(diffContent).modified).toBe(
      "transition: color 0.3s ease;\n                       &:hover {\n                         color: ${color};\n                       }",
    );
  });
});
