import { importMapReplace } from "@/lib/importmap-utils";
import { describe, expect, it } from "vitest";

describe("importMapReplace", () => {
  const origin = "http://localhost:3000";

  const scenarios = {
    // Basic imports
    "should handle basic named imports": `import { prop, prop2 } from "foo";`,
    "should handle specific exports": `import { __await, __rest } from "tslib";`,
    "should handle specific named imports with aliases":
      `import { __await as aw, __rest as restNow} from "tslib";`,
    "should handle default import": 
      `import React from "react";`,
    "should handle default and named imports together":
      `import React, { useState, useEffect } from "react";`,
    "should handle multiple named imports with complex names":
      `import { camelCase, snake_case, PascalCase, CONSTANT_CASE } from "utils";`,
    
    // Worker and special imports
    "should transpile worker files to js with wildcard import":
      `import * as Monaco from "@/workers/monaco-editor.worker";`,
    "should transpile worker files to js with bare import":
      `import "@/workers/monaco-editor.worker";`,
    "should handle service worker registration":
      `import { register } from "@/workers/service-worker";`,
    "should handle web worker imports":
      `import Worker from "@/workers/computation.worker";`,
      
    // Path handling
    "should handle relative imports without extension": 
      `import { helper } from "./utils/helper";`,
    "should handle parent directory relative imports":
      `import { shared } from "../shared/utils";`,
    "should preserve existing extensions in relative imports":
      `import { component } from "./components/Button";`,
    "should handle deep nested paths":
      `import { util } from "../../../../very/deep/nested/path";`,
    "should handle current directory marker":
      `import { tool } from "./././current/path";`,
    
    // URL types
    "should handle data URLs":
      `import { foo } from "data:text/javascript,export const foo = 'bar'";`,
    "should handle live URLs":
      `import { Component } from "/live/components/Button";`,
    "should handle http URLs from same origin":
      `import { lib } from "http://localhost:3000/lib?bundle=true&exports=foo";`,
    "should handle http URLs from different origin":
      `import { lib } from "http://example.com/lib?bundle=true&exports=foo";`,
    "should handle https URLs":
      `import { secure } from "https://example.com/secure-module";`,
    "should handle URLs with complex query parameters":
      `import { module } from "https://example.com/module?version=1.2.3&format=esm&debug=true";`,
    
    // Dynamic imports
    "should handle dynamic imports":
      `const mod = await import("module");`,
    "should handle dynamic imports with template literals":
      `const mod = await import(\`./modules/\${name}\`);`,
    "should handle dynamic imports with complex expressions":
      `const mod = await import(process.env.NODE_ENV === 'production' ? 'prod' : 'dev');`,
    "should handle dynamic imports with relative paths":
      `const mod = await import('./relative/path/module');`,
    
    // Export variations
    "should handle import with export":
      `export { foo } from "bar";`,
    "should handle export with rename":
      `export { foo as default } from "module";`,
    "should handle multiple exports":
      `export { foo, bar as default, baz as customName } from "module";`,
    "should handle export with destructuring":
      `export const { foo, bar } = await import("module");`,
    
    // Special cases and edge cases
    "should prevent double processing":
      `/** importMapReplace */
    import { foo } from "bar";`,
    "should handle imports with comments":
      `// This is a comment
    import { foo } from "bar"; // End of line comment`,
    "should handle multi-line imports":
      `import {
      foo,
      bar,
      baz
    } from "module";`,
    "should handle imports with unusual whitespace":
      `import    {    foo   ,   bar   }    from     "module"   ;`,
    "should handle imports with unicode characters":
      `import { π, λ, γ } from "math-symbols";`,
    "should handle import with empty specifiers":
      `import {} from "empty-module";`,
    
    // Module types
    "should handle CSS modules":
      `import styles from "./styles.module.css";`,
    "should handle JSON modules":
      `import data from "./data.json";`,
    "should handle WASM modules":
      `import * as wasm from "./module.wasm";`,
    "should handle TypeScript path aliases":
      `import { component } from "@components/Button";`,
    
    // URL parameters and fragments
    "should handle URLs with hash fragments":
      `import { section } from "module#section";`,
    "should handle URLs with version tags":
      `import { lib } from "https://esm.sh/lodash@4.17.21";`,
    "should handle scoped packages":
      `import { component } from "@scope/package/component";`,
  };

  for (const [description, code] of Object.entries(scenarios)) {
    it(description, async () => {
      const result = importMapReplace(code, origin);
      expect({result, code}).toMatchSnapshot();
    });
  }

});
