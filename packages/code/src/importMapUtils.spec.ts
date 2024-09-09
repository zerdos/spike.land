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
    const code = 'import React from "react";';
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

  it("should replace relative imports", () => {
    const code = `import MyComponent from "./MyComponent";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import MyComponent from "${origin}/live/MyComponent/index.js"`);
  });

  it("should not replace absolute URLs", () => {
    const code = `import MyComponent from "https://example.com/MyComponent.js";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`/** importMapReplace */\n${code}`);
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
    expect(result).toContain(`export { default as MyComponent } from "${origin}/live/MyComponent/index.js"`);
    expect(result).toContain(`const dynamicImport = (module) => import(\`\${module}\`)`);
  });

  it("should add importMapReplace comment", () => {
    const code = `import React from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`/** importMapReplace */`);
  });

  it("should handle imports with file extensions", () => {
    const code = `
      import MyModule from "./myModule.js";
      import MyTypeScriptModule from "./myModule.ts";
      import MyJSXModule from "./myModule.jsx";
      import MyTSXModule from "./myModule.tsx";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import MyModule from "${origin}/live/myModule.js/index.js"`);
    expect(result).toContain(`import MyTypeScriptModule from "${origin}/live/myModule.ts/index.js"`);
    expect(result).toContain(`import MyJSXModule from "${origin}/live/myModule.jsx/index.js"`);
    expect(result).toContain(`import MyTSXModule from "${origin}/live/myModule.tsx/index.js"`);
  });

  it("should handle imports with query parameters", () => {
    const code = `
      import MyModule from "my-module?param1=value1&param2=value2";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import MyModule from "${origin}/*my-module?param1=value1&param2=value2?bundle"`);
  });

  it("should handle react-spring imports", () => {
    const code = `
      import { animated, useSpring } from "react-spring";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import { animated, useSpring } from "${origin}/*react-spring?bundle&exports=animated%2C%20useSpring"`);
  });

  it("should not modify code that already contains importMapReplace", () => {
    const code = `
/** importMapReplace */
      import React from "http://localhost:3000/reactMod.mjs";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
  });

  it("should handle specific named exports", () => {
    const code = `import { prop, prop2 } from "foo";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import { prop, prop2 } from "${origin}/*foo?bundle&exports=prop%2C%20prop2"`);
  });

  it("should handle specific exports from tslib", () => {
    const code = `import { __await, __rest } from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import { __await, __rest } from "${origin}/*tslib?bundle&exports=__await%2C%20__rest"`);
  });

  it("should handle specific named imports with aliases", () => {
    const code = `import { __await as aw, __rest as restNow } from "http://localhost:3000/*tslib?bundle&exports=__await%20as%20aw%2C%20__rest%20as%20restNow";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import { __await as aw, __rest as restNow } from "${origin}/*tslib?bundle&exports=__await%2C%20__rest"`);
  });
});
