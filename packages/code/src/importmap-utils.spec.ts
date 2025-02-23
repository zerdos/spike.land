import { importMapReplace } from "@/lib/importmap-utils";
import { describe, expect, it } from "vitest";

describe("importMapReplace", () => {
  const origin = "http://localhost:3000";

  const scenarios = {
    // Basic imports
    "basic named imports": `import { prop, prop2 } from "foo";`,
    "specific exports": `import { __await, __rest } from "tslib";`,
    "specific named imports with aliases":
      `import { __await as aw, __rest as restNow} from "tslib";`,
    "default import": 
      `import React from "react";`,
    "default and named imports together":
      `import React, { useState, useEffect } from "react";`,
    "multiple named imports with complex names":
      `import { camelCase, snake_case, PascalCase, CONSTANT_CASE } from "utils";`,
    
    // Worker and special imports
    "should transpile worker files to js with wildcard import":
      `import * as Monaco from "@/workers/monaco-editor.worker";`,
    "should transpile worker files to js with bare import":
      `import "@/workers/monaco-editor.worker";`,
    "service worker registration":
      `import { register } from "@/workers/service-worker";`,
    "web worker imports":
      `import Worker from "@/workers/computation.worker";`,
      
    // Path handling
    "relative imports without extension": 
      `import { helper } from "./utils/helper";`,
    "parent directory relative imports":
      `import { shared } from "../shared/utils";`,
    "should preserve existing extensions in relative imports":
      `import { component } from "./components/Button";`,
    "deep nested paths":
      `import { util } from "../../../../very/deep/nested/path";`,
    "current directory marker":
      `import { tool } from "./././current/path";`,
    
    // URL types
    "data URLs":
      `import { foo } from "data:text/javascript,export const foo = 'bar'";`,
    "live URLs":
      `import { Component } from "/live/components/Button";`,
    "http URLs from same origin":
      `import { lib } from "http://localhost:3000/lib?bundle=true&exports=foo";`,
    "http URLs from different origin":
      `import { lib } from "http://example.com/lib?bundle=true&exports=foo";`,
    "https URLs":
      `import { secure } from "https://example.com/secure-module";`,
    "URLs with complex query parameters":
      `import { module } from "https://example.com/module?version=1.2.3&format=esm&debug=true";`,
    
    // Dynamic imports
    "dynamic imports":
      `const mod = await import("module");`,
    "dynamic imports with template literals":
      `const mod = await import(\`./modules/\${name}\`);`,
    "dynamic imports with complex expressions":
      `const mod = await import(process.env.NODE_ENV === 'production' ? 'prod' : 'dev');`,
    "dynamic imports with relative paths":
      `const mod = await import('./relative/path/module');`,
    
    // Export variations
    "import with export":
      `export { foo } from "bar";`,
    "export with rename":
      `export { foo as default } from "module";`,
    "multiple exports":
      `export { foo, bar as default, baz as customName } from "module";`,
    "export with destructuring":
      `export const { foo, bar } = await import("module");`,
    
    // Special cases and edge cases
    "should prevent double processing":
      `/** importMapReplace */
    import { foo } from "bar";`,
    "imports with comments":
      `// This is a comment
    import { foo } from "bar"; // End of line comment`,
    "multi-line imports":
      `import {
      foo,
      bar,
      baz
    } from "module";`,
    "imports with unusual whitespace":
      `import    {    foo   ,   bar   }    from     "module"   ;`,
    "imports with unicode characters":
      `import { π, λ, γ } from "math-symbols";`,
    "import with empty specifiers":
      `import {} from "empty-module";`,
    
    // Module types
    "CSS modules":
      `import styles from "./styles.module.css";`,
    "JSON modules":
      `import data from "./data.json";`,
    "WASM modules":
      `import * as wasm from "./module.wasm";`,
    "TypeScript path aliases":
      `import { component } from "@components/Button";`,
    
    // URL parameters and fragments
    "URLs with hash fragments":
      `import { section } from "module#section";`,
    "URLs with version tags":
      `import { lib } from "https://esm.sh/lodash@4.17.21";`,
    "scoped packages":
      `import { component } from "@scope/package/component";`,
  };

  for (const [description, code] of Object.entries(scenarios)) {
    it("should handle " +description, async () => {
      const result = importMapReplace(code, origin);
      expect({result, code}).toMatchSnapshot();
    });
  }

});
