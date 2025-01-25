import { importMapReplace } from "@/lib/importmap-utils"; // Updated import
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("importMapReplace", () => {
  const origin = "http://localhost:3000";

  beforeAll(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              "name": "some-module",
              "version": "1.0.0",
              "main": "index.js",
              "browser": "browser.js",
              "module": "module.js",
              "types": "index.d.ts",
              "files": [
                "index.js",
                "browser.js",
                "module.js",
                "index.d.ts",
              ],
            }),
        })
      ),
    );
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  // ... (keep all the existing tests)

  it("should do clever top-level exports", async () => {
    const code = `import { prop, prop2 } from "foo";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "
      /** importMapReplace */
      import { prop, prop2 } from "http://localhost:3000/foo?bundle=true&external=react,react-dom,framer-motion,@emotion/react&exports=prop,prop2";"
    `);
  });

  it("should handle specific exports", async () => {
    const code = `import { __await, __rest } from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "
      /** importMapReplace */
      import { __await, __rest } from "http://localhost:3000/tslib?bundle=true&external=react,react-dom,framer-motion,@emotion/react&exports=__await,__rest";"
    `);
  });

  it("should handle specific named imports", async () => {
    const code = `import { __await as aw, __rest  as restNow} from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchInlineSnapshot(`
      "
      /** importMapReplace */
      import { __await as aw, __rest  as restNow} from "http://localhost:3000/tslib?bundle=true&external=react,react-dom,framer-motion,@emotion/react&exports=__await,__rest";"
    `);
  });
});
