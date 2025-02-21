import { importMapReplace } from "@/lib/importmap-utils";
import { describe, expect, it } from "vitest";

describe("importMapReplace", () => {
  const origin = "http://localhost:3000";

  it("should do clever top-level exports", async () => {
    const code = `import { prop, prop2 } from "foo";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { prop, prop2 } from "http://localhost:3000/foo?bundle=true&external=react,react-dom,framer-motion,@emotion/react&exports=prop,prop2";"
    `);
  });

  it("should transpile the worker files to js in the end", async () => {
    const code = `import * as Monaco from "@/workers/monaco-editor.worker";`;
    const result = importMapReplace(code, "");
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import * as Monaco from "/@/workers/monaco-editor.worker.mjs";"
    `);
  });

  it("should transpile the worker files to js in the end with normal import", async () => {
    const code = `import "@/workers/monaco-editor.worker";`;
    const result = importMapReplace(code, "");
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import "/@/workers/monaco-editor.worker.js";"
    `);
  });

  it("should handle specific exports", async () => {
    const code = `import { __await, __rest } from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { __await, __rest } from "http://localhost:3000/tslib?bundle=true&external=react,react-dom,framer-motion,@emotion/react&exports=__await,__rest";"
    `);
  });

  it("should handle specific named imports", async () => {
    const code = `import { __await as aw, __rest  as restNow} from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "/** importMapReplace */
      import { __await as aw, __rest  as restNow} from "http://localhost:3000/tslib?bundle=true&external=react,react-dom,framer-motion,@emotion/react&exports=__await,__rest";"
    `);
  });
});
