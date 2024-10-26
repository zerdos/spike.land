import { addSomeFixesIfNeeded } from "@/lib/prettier";
import { describe, expect, it } from "vitest";

describe("addSomeFixesIfNeeded", () => {
  it("adds default export if 'export default' is missing and 'const App' is present", () => {
    const code = "const App = () => {};";
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
  });

  it("adds import statement for '@emotion/react' if 'css={css`' is present and '@emotion/react' is missing", () => {
    const code = "css={css`color: red;`}";

    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
  });

  it("doesn't add extra css' if 'css={css`' is present and '@emotion/react' is missing", () => {
    const code = `
    import { css } from "@emotion/css";


    css={css\`color: red;\`}
    
    `;

    const result = addSomeFixesIfNeeded(code);
    expect(result.includes("@emotion/react")).toBe(false);
    expect(result).toMatchSnapshot();
  });

  it("adds import statement for 'FC' if ' FC<{' is present and 'import type { FC }' is missing", () => {
    const code = "FC<{ prop: string }>";
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
  });

  it("adds import statement for 'useState' if 'useState(' is present and 'import { useState }' is missing", () => {
    const code = "useState(0)";
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
  });

  it("handles multiple occurrences of 'css={css`' correctly", () => {
    const code = "css={css`color: red;`} css={css`font-size: 16px;`}";
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
  });

  it("adds default export if 'export default' is missing", () => {
    const code = "export const myUtilityFN = () => {};";
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
  });

  it("removes block comments", () => {
    const code = `
    <div>
    {/** This is a comment */}
    </div>`;
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
  });

  it("handles external state", () => {
    const code = `
    
    import { css } from '@emotion/css'

const color = 'white'

render(
  <div
    className={css\`
  padding: 32px;
          background-color: hotpink;
          font-size: 24px;
      border-radius: 4px;
     &:hover {
        color: \${color
        };
      }
    \`}
  >
    Hover to change color.
  </div>
)
  
`;
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
  });
});
