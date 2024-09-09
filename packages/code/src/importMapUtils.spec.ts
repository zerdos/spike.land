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

  it("should replace top-level imports", () => {
    const code = "import React from \"react\";";
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import React from "${origin}/reactMod.mjs"`);
  });

  it("should replace multiple top-level imports", () => {
    const code = `
      import React from "react";
      import { useState, useEffect } from "react";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import React from "${origin}/reactMod.mjs"`);
    expect(result).toContain(`import { useState, useEffect } from "${origin}/reactMod.mjs"`);
  });

  it("should replace imports with aliases", () => {
    const code = `import { useState as useStateAlias } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import { useState as useStateAlias } from "${origin}/reactMod.mjs"`);
  });

  it("should replace dynamic imports", () => {
    const code = `const React = import("react");`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`const React = import("${origin}/reactMod.mjs"`);
  });

  it("should not replace dynamic imports with template literals", () => {
    const code = "const dynamic = 'react'; const React = import(`${dynamic}`);";
    const result = importMapReplace(code, origin);
    expect(result).toContain(`const React = import(\`\${dynamic}\`)`);
  });

  it("should replace imports from @/ paths", () => {
    const code = `import { Button } from "@/components/ui/button";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import { Button } from "${origin}/@/components/ui/button.mjs"`);
  });

  it("should not replace relative imports", () => {
    const code = `import MyComponent from "./MyComponent";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import MyComponent from "http://localhost:3000/live/MyComponent/index.js";`);
  });

  it("should not replace absolute URLs", () => {
    const code = `import MyComponent from "https://example.com/MyComponent.js";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(code);
  });

  it("should replace exports", () => {
    const code = `export { default } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`export { default } from "${origin}/reactMod.mjs"`);
  });

  it("should handle multiple imports and exports", () => {
    const code = `
      import React from "react";
      import { useState } from "react";
      export { Button } from "@/components/ui/button";
      const lodash = import("lodash");
    `;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import React from "${origin}/reactMod.mjs"`);
    expect(result).toContain(`import { useState } from "${origin}/reactMod.mjs"`);
    expect(result).toContain(`export { Button } from "${origin}/@/components/ui/button.mjs"`);
    expect(result).toContain(`const lodash = import("${origin}/*lodash?bundle")`);
  });

  it("should handle imports with comments", () => {
    const code = `
      // This is a comment
      import React from "react"; // Inline comment
      /* Multi-line
         comment */
      import { useState } from "react";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import React from "${origin}/reactMod.mjs"`);
    expect(result).toContain(`import { useState } from "${origin}/reactMod.mjs"`);
  });

  it("should handle complex scenarios", () => {
    const code = `
      import React, { useState, useEffect as useEffectAlias } from "react";
      import { Button } from "@/components/ui/button";
      const lodash = import("lodash");
      export { default as MyComponent } from "./MyComponent";
      const dynamicImport = (module) => import(\`\${module}\`);
    `;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import React, { useState, useEffect as useEffectAlias } from "${origin}/reactMod.mjs"`);
    expect(result).toContain(`import { Button } from "${origin}/@/components/ui/button.mjs"`);
    expect(result).toContain(`const lodash = import("${origin}/*lodash?bundle")`);
    expect(result).toContain(
      `export { default as MyComponent } from "http://localhost:3000/live/MyComponent/index.js"`,
    );
    expect(result).toContain(`const dynamicImport = (module) => import(\`\${module}\`)`);
  });

  it("should add importMapReplace comment", () => {
    const code = `import React from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`/** importMapReplace */`);
  });
});
