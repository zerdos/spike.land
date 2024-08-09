import { describe, it, expect } from 'vitest';
import { addSomeFixesIfNeeded } from "./prettierEsm";

describe("addSomeFixesIfNeeded", () => {
  it("adds default export if 'export default' is missing and 'const App' is present", () => {
    const code = "const App = () => {};";
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
  });

  it("adds import statement for '@emotion/react' if 'css={css`' is present and '@emotion/react' is missing", () => {
    const code = "css={css`color: red;`}";
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
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

  it("doesnt don stupid things", () => {
    const code = `
    <motion.pre
      className="absolute bottom-24 left-24 font-mono text-xs text-yellow-400"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      css={css\`
        white-space: pre;
      \`}
    >
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: \`${Math.random() * 100}%\`,
              left: \`${Math.random() * 100}%\`,
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"][
                Math.floor(Math.random() * 5)
              ],
            }}
            variants={fireworkVariants}
            initial="initial"
            animate="animate"
            transition={{ repeat: Infinity, repeatDelay: Math.random() * 3 + 1 }}
          />
        ))}
      </motion.div>
    </motion.pre>
  `;
    expect(addSomeFixesIfNeeded(code)).toMatchSnapshot();
  });
});