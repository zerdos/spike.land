import { importMapReplace } from "@/lib/importmap-utils";
import { describe, expect, it } from "vitest";

describe("importMapReplace", () => {
  const origin = "http://localhost:3000";

  // Basic imports
  it("should handle basic named imports", async () => {
    const code = `import { prop, prop2 } from "foo";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { prop, prop2 } from "http://localhost:3000/foo?bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled&exports=prop,prop2";"
    `);
  });

  it("should handle specific exports", async () => {
    const code = `import { __await, __rest } from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { __await, __rest } from "http://localhost:3000/tslib?bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled&exports=__await,__rest";"
    `);
  });

  it("should handle specific named imports with aliases", async () => {
    const code = `import { __await as aw, __rest as restNow} from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { __await as aw, __rest as restNow} from "http://localhost:3000/tslib?bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled&exports=__await,__rest";"
    `);
  });

  // Worker files
  it("should transpile worker files to js with wildcard import", async () => {
    const code = `import * as Monaco from "@/workers/monaco-editor.worker";`;
    const result = importMapReplace(code, "");
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import * as Monaco from "/@/workers/monaco-editor.worker.mjs";"
    `);
  });

  it("should transpile worker files to js with bare import", async () => {
    const code = `import "@/workers/monaco-editor.worker";`;
    const result = importMapReplace(code, "");
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import "/@/workers/monaco-editor.worker.js";"
    `);
  });

  // Relative paths
  it("should handle relative imports without extension", async () => {
    const code = `import { helper } from "./utils/helper";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { helper } from "utils/helper.mjs";"
    `);
  });

  it("should handle parent directory relative imports", async () => {
    const code = `import { shared } from "../shared/utils";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { shared } from "../shared/utils.mjs";"
    `);
  });

  it("should preserve existing extensions in relative imports", async () => {
    const code = `import { component } from "./components/Button";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { component } from "components/Button.mjs";"
    `);
  });

  // Data URLs
  it("should handle data URLs", async () => {
    const code = `import { foo } from "data:text/javascript,export const foo = 'bar'";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { foo } from "data:text/javascript,export const foo = /index.js"bar'";"
    `);
  });

  // Live URLs
  it("should handle live URLs", async () => {
    const code = `import { Component } from "/live/components/Button";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { Component } from "/live/components/Button/index.js";"
    `);
  });

  // HTTP URLs
  it("should handle http URLs from same origin", async () => {
    const code = `import { lib } from "http://localhost:3000/lib?bundle=true&exports=foo";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { lib } from "http://localhost:3000/lib?bundle=true&exports=foo";"
    `);
  });

  it("should handle http URLs from different origin", async () => {
    const code = `import { lib } from "http://example.com/lib?bundle=true&exports=foo";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { lib } from "http://example.com/lib?bundle=true&exports=foo";"
    `);
  });

  // Dynamic imports
  it("should handle dynamic imports", async () => {
    const code = `const mod = await import("module");`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      const mod = await import("http://localhost:3000/module?bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled");"
    `);
  });

  it("should handle dynamic imports with template literals", async () => {
    const code = "const mod = await import(`./modules/${name}`);";
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      const mod = await import(\`./modules/\${name}\`);"
    `);
  });

  // Special cases
  it("should handle import with export", async () => {
    const code = `export { foo } from "bar";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      export { foo } from "http://localhost:3000/bar?bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled";"
    `);
  });

  it("should prevent double processing", async () => {
    const code = `/** importMapReplace */
    import { foo } from "bar";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
  });
});
