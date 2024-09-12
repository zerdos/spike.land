import { extractCodeModification, updateSearchReplace } from "@/lib/chat-utils";
import { extractDiffContent, isDiffContent } from "@/lib/diff-utils";
import { describe, expect, it } from "vitest";

describe("diffUtils", () => {
  describe("extractDiffContent", () => {

    it("should handle broken search replace blocks", () => {
      const instructions = `
      foooo
  \`\`\`tsx
const a = 1;
=======
const a = 10;
=======
     fooo bar blalalal
  \`\`\`
  
  baaar
     `;
  
     const extracted = extractCodeModification(instructions)
      expect(extracted).toBe(`<<<<<<< SEARCH
const a = 1;
=======
const a = 10;
>>>>>>> REPLACE`);
   });

   
  
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

  it("should do partial5", () => {
    const diffContent = `
Certainly! I'll modify the component to make it darker, remove the Mac-style buttons, and provide alternative options for the copy icon. Here are the changes:

### Change 1: Darker Theme and Remove Mac Buttons

\`\`\`tsx
<<<<<<< SEARCH
    <div className='w-full font-mono text-sm rounded-lg overflow-hidden shadow-lg bg-white'>
      <div className='bg-gray-200 px-4 py-2 flex items-center space-x-2'>
        <div className='w-3 h-3 rounded-full bg-red-500'></div>
        <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
        <div className='w-3 h-3 rounded-full bg-green-500'></div>
      </div>
      <div className='bg-gray-100 text-gray-800 py-2 px-4 text-sm border-b border-gray-300 flex justify-between items-center'>
=======
    <div className='w-full font-mono text-sm rounded-lg overflow-hidden shadow-lg bg-gray-900'>
      <div className='bg-gray-800 text-gray-200 py-2 px-4 text-sm border-b border-gray-700 flex justify-between items-center'>
>>>>>>> REPLACE
\`\`\`

**Purpose**: This change applies a dark theme to the component and removes the Mac-style buttons, creating a sleeker, more professional look.

### Change 2: Update SyntaxHighlighter Style for Dark Theme

\`\`\`tsx
<<<<<<< SEARCH
        style={{
          ...tomorrow,
          'pre[class*="language-"]': {
            ...tomorrow['pre[class*="language-"]'],
            background: "#f8f8f8",
            padding: "1rem",
          },
          'code[class*="language-"]': {
            ...tomorrow['code[class*="language-"]'],
            color: "#333",
          },
        }}
=======
        style={{
          ...tomorrow,
          'pre[class*="language-"]': {
            ...tomorrow['pre[class*="language-"]'],
            background: "#1a202c",
            padding: "1rem",
          },
          'code[class*="language-"]': {
            ...tomorrow['code[class*="language-"]'],
            color: "#e2e8f0",
          },
        }}
>>>>>>> REPLACE
\`\`\`

**Purpose**: This change adjusts the code block style to fit the dark theme, using a dark background color and light text color.

### Change 3: Provide Alternative Copy Icon Options

First, let's import additional icons:

\`\`\`tsx
<<<<<<< SEARCH
import { ClipboardIcon } from "@heroicons/react/24/outline";
=======
import { ClipboardIcon, DocumentDuplicateIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
>>>>>>> REPLACE
\`\`\`

Now, let's create a state to toggle between icons and update the button:

\`\`\`tsx
<<<<<<< SEARCH
  const [copied, setCopied] = useState(false);
=======
  const [copied, setCopied] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);
  const icons = [ClipboardIcon, DocumentDuplicateIcon, ClipboardDocumentIcon];
  const Icon = icons[iconIndex];
>>>>>>> REPLACE
\`\`\`

Replace the copy button with this updated version:

\`\`\`tsx
<<<<<<< SEARCH
        <div className='relative'>
          <button
            className='text-gray-600 hover:text-gray-800 ml-2 transition-colors duration-200'
            onClick={() => {
              navigator.clipboard.writeText(value);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}>
            <ClipboardIcon className='w-5 h-5' />
          </button>
          {copied && (
            <div className='absolute right-0 mt-2 py-1 px-2 bg-gray-800 text-white text-xs rounded shadow-lg'>
              Copied!
            </div>
          )}
        </div>
=======
        <div className='relative'>
          <button
            className='text-gray-300 hover:text-white ml-2 transition-colors duration-200'
            onClick={() => {
              navigator.clipboard.writeText(value);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              setIconIndex((iconIndex + 1) % icons.length);
            }}>
            <Icon className='w-5 h-5' />
          </button>
          {copied && (
            <div className='absolute right-0 mt-2 py-1 px-2 bg-gray-700 text-white text-xs rounded shadow-lg'>
              Copied!
            </div>
          )}
        </div>
>>>>>>> REPLACE
\`\`\`

**Purpose**: This change provides multiple icon options for the copy button, cycling through them on each click. It also adjusts the colors to fit the dark theme.

### Suggested Improvements:
1. Add a theme toggle button to switch between light and dark modes.
2. Implement a custom tooltip component for better control over the "Copied!" message appearance and animation.
3. Add a subtle hover effect to the entire component to enhance interactivity.
4. Consider adding line numbers as an optional feature for longer code blocks.

These changes create a darker, more professional look for the code block component, remove the Mac-style buttons for a cleaner appearance, and provide multiple icon options for the copy functionality. The component now has a more versatile and customizable feel, suitable for various user preferences in your online code editor.
    `;

    const result = extractCodeModification(diffContent);
    expect(result.length).toBe(3311);
    expect(result).toMatchSnapshot();
  });

  describe("updateSearchReplace", () => {
    it("should handle broken code blocks", () => {
      const oldCode = `
<<<<<<< SEARCH
const example = () => {
  console.log("Hello");
  =======
  console.log("World");
  =======
  return "Hello World";
};
>>>>>>> REPLACE
      `;

      const codeNow = `
const example = () => {
  console.log("Hello");
  return "Hello World";
};
      `;

      const result = updateSearchReplace(oldCode, codeNow);
      const expected = `
const example = () => {
  console.log("World");
  return "Hello World";
};
      `;

      expect(result.trim()).toBe(expected.trim());
    });
  });
});
