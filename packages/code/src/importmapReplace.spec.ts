import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { importMapReplace } from "./importMapUtils";

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

  it("should replace top-level imports", async () => {
    const code = "import React from \"react\";";
    const result = importMapReplace(code, origin);
    expect(result).toBe(`import React from "${origin}/*react?bundle=true";`);
  });

  it("should replace multiple top-level imports", async () => {
    const code = `
      import React from "react";
      import { useState, useEffect } from "react";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`
      import React from "${origin}/*react?bundle=true";
      import { useState, useEffect } from "${origin}/*react?bundle=true&exports=useState,useEffect";
    `);
  });

  it("should replace imports with aliases", async () => {
    const code = `import { useState as useStateAlias } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`import { useState as useStateAlias } from "${origin}/*react?bundle=true&exports=useState";`);
  });

  it("should replace dynamic imports", async () => {
    const code = `const React = import("react");`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`const React = import("${origin}/*react?bundle=true");`);
  });

  it("should replace dynamic imports with template literals", async () => {
    const code = "const dynamic = 'react'; const React = import(`${dynamic}`);";
    const result = importMapReplace(code, origin);
    expect(result).toBe(
      `const dynamic = 'react'; const React = import("${origin}/*" + \`\${dynamic}\` + "?bundle=true");`,
    );
  });

  it("should replace imports from @/ paths", async () => {
    const code = `import { Button } from "@/components/ui/button";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`import { Button } from "${origin}/*@/components/ui/button?bundle=true&exports=Button";`);
  });

  it("should not replace relative imports", async () => {
    const code = `import MyComponent from "./MyComponent";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
  });

  it("should not replace absolute URLs", async () => {
    const code = `import MyComponent from "https://example.com/MyComponent.js";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
  });

  it("should replace exports", async () => {
    const code = `export { default } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`export { default } from "${origin}/*react?bundle=true";`);
  });

  it("should handle multiple imports and exports", async () => {
    const code = `
      import React from "react";
      import { useState } from "react";
      export { Button } from "@/components/ui/button";
      const lodash = import("lodash");
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`
      import React from "${origin}/*react?bundle=true";
      import { useState } from "${origin}/*react?bundle=true&exports=useState";
      export { Button } from "${origin}/*@/components/ui/button?bundle=true&exports=Button";
      const lodash = import("${origin}/*lodash?bundle=true");
    `);
  });

  it("should handle imports with comments", async () => {
    const code = `
      // This is a comment
      import React from "react"; // Inline comment
      /* Multi-line
         comment */
      import { useState } from "react";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`
      // This is a comment
      import React from "${origin}/*react?bundle=true"; // Inline comment
      /* Multi-line
         comment */
      import { useState } from "${origin}/*react?bundle=true&exports=useState";
    `);
  });

  it("should handle complex scenarios", async () => {
    const code = `
      import React, { useState, useEffect as useEffectAlias } from "react";
      import { Button } from "@/components/ui/button";
      const lodash = import("lodash");
      export { default as MyComponent } from "./MyComponent";
      const dynamicImport = (module) => import(\`\${module}\`);
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`
      import React, { useState, useEffect as useEffectAlias } from "${origin}/*react?bundle=true&exports=useState,useEffect";
      import { Button } from "${origin}/*@/components/ui/button?bundle=true&exports=Button";
      const lodash = import("${origin}/*lodash?bundle=true");
      export { default as MyComponent } from "./MyComponent";
      const dynamicImport = (module) => import("${origin}/*" + \`\${module}\` + "?bundle=true");
    `);
  });
});
