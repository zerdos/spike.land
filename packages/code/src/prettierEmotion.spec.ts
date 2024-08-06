import { addSomeFixesIfNeeded } from "./prettierEsm";

describe("addSomeFixesIfNeeded", () => {
  it("adds default export if 'export default' is missing and 'const App' is present", () => {
    const code = "const App = () => {};";
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot()
  });

  it("adds import statement for '@emotion/react' if 'css={css`' is present and '@emotion/react' is missing", () => {
    const code = "css={css`color: red;`}";
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot()
  });

  it("adds import statement for 'FC' if ' FC<{' is present and 'import type { FC }' is missing", () => {
    const code = "FC<{ prop: string }>";
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot()
  });

  it("adds import statement for 'useState' if 'useState(' is present and 'import { useState }' is missing", () => {
    const code = "useState(0)";
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot()
  });

  it("handles multiple occurrences of 'css={css`' correctly", () => {
      const code = "css={css`color: red;`} css={css`font-size: 16px;`}";

      expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
  });
});