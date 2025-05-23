import { importMapReplace } from "@/lib/importmap-utils";
import { describe, expect, it } from "vitest";

describe("importMapReplace", () => {
  const scenarios = {
    // Basic imports
    "Basic imports": {
      "basic named imports": `import { prop, prop2 } from "foo";`,
      "specific exports": `import { __await, __rest } from "tslib";`,
      "specific named imports with aliases":
        `import { __await as aw, __rest as restNow} from "tslib";`,
      "default import": `import React from "react";`,
      "default and named imports together": `import React, { useState, useEffect } from "react";`,
      "multiple named imports with complex names":
        `import { camelCase, snake_case, PascalCase, CONSTANT_CASE } from "utils";`,
    },

    // Worker imports
    "Worker imports": {
      "should transpile worker files to js with wildcard import":
        `import * as Monaco from "@/workers/monaco-editor.worker";`,
      "should transpile worker files to js with bare import":
        `import "@/workers/monaco-editor.worker";`,
      "service worker registration": `import { register } from "@/workers/service-worker";`,
      "web worker imports": `import Worker from "@/workers/computation.worker";`,
    },

    // Path handling
    "Path imports": {
      "relative imports without extension": `import { helper } from "./utils/helper";`,
      "parent directory relative imports": `import { shared } from "../shared/utils";`,
      "should preserve existing extensions in relative imports":
        `import { component } from "./components/Button";`,
      "deep nested paths": `import { util } from "../../../../very/deep/nested/path";`,
      "current directory marker": `import { tool } from "./././current/path";`,
      "relative imports with trailing slash": `import module from "./folder/";`,
      "directory imports": `import "./components/";`,
      "existing .js extensions": `import { func } from "./lib.js";`,
      "should prevent double .mjs extension": `import "./file.mjs";`,
    },

    // URL types
    "URL imports": {
      "data URLs": `import { foo } from "data:text/javascript,export const foo = 'bar'";`,
      "live URLs": `import { Component } from "/live/components/Button";`,
      "http URLs from same origin":
        `import { lib } from "http://localhost:3000/lib?bundle=true&exports=foo";`,
      "http URLs from different origin":
        `import { lib } from "http://example.com/lib?bundle=true&exports=foo";`,
      "https URLs": `import { secure } from "https://example.com/secure-module";`,
      "URLs with complex query parameters":
        `import { module } from "https://example.com/module?version=1.2.3&format=esm&debug=true";`,
      "URLs with hash fragments": `import { section } from "module#section";`,
      "URLs with version tags": `import { lib } from "https://esm.sh/lodash@4.17.21";`,
      "query and hash in imports": `import { lib } from "./module?foo=bar#section";`,
      "relative imports with query parameters": `import { util } from "./utils?foo=bar";`,
      "external lib":
        `import { MoonIcon, SunIcon, PlusIcon, TrashIcon, PencilIcon } from "lucide-react";`,
    },

    // Dynamic imports
    "Dynamic imports": {
      "dynamic imports": `const mod = await import("module");`,
      "dynamic imports with template literals": `const mod = await import(\`./modules/\${name}\`);`,
      "dynamic imports with complex expressions":
        `const mod = await import(process.env.NODE_ENV === 'production' ? 'prod' : 'dev');`,
      "dynamic imports with relative paths": `const mod = await import('./relative/path/module');`,
      "dynamic imports with string concatenation":
        `const mod = await import('./modules/' + name + '/index');`,
    },

    // Export variations
    "Export variations": {
      "import with export": `export { foo } from "bar";`,
      "export with rename": `export { foo as default } from "module";`,
      "multiple exports": `export { foo, bar as default, baz as customName } from "module";`,
      "export with destructuring": `export const { foo, bar } = await import("module");`,
      "export all from a module": `export * from "module";`,
      "re-export default": `export { default } from "module";`,
      "export all from relative module": `export * from "./utils/helpers";`,
    },

    // Special formatting cases
    "Special syntax": {
      "should prevent double processing": `/** importMapReplace */
      import { foo } from "bar";`,
      "imports with comments": `// This is a comment
      import { foo } from "bar"; // End of line comment`,
      "multi-line imports": `import {
        foo,
        bar,
        baz
      } from "module";`,
      "imports with unusual whitespace":
        `import    {    foo   ,   bar   }    from     "module"   ;`,
      "imports with unicode characters": `import { π, λ, γ } from "math-symbols";`,
      "import with empty specifiers": `import {} from "empty-module";`,
      "inline comments in import": `import /* inline comment */ { foo } from "module";`,
      "single quotes in imports": `import module from 'my-module';`,
      "import with $-prefixed variables": `import { $state, $effect } from "framework";`,
    },

    // Module types
    "Module types": {
      "CSS modules": `import styles from "./styles.module.css";`,
      "JSON modules": `import data from "./data.json";`,
      "WASM modules": `import * as wasm from "./module.wasm";`,
      "SVG modules": `import logo from "./logo.svg";`,
      "text file imports": `import text from "./file.txt";`,
    },

    // Package imports
    "Package imports": {
      "TypeScript path aliases": `import { component } from "@/components/Button";`,
      "scoped packages": `import { component } from "@scope/package/component";`,
      "Vue package default import": `import Vue from "vue";`,
      "external dependency import": `import { motion } from "framer-motion";`,
      "tilde aliases": `import { button } from "~components/Button";`,
    },

    // Import variations
    "Import variations": {
      "namespace imports": `import * as utils from "utils";`,
      "side-effect only imports": `import "polyfill";`,
      "mixed default and namespace imports": `import Default, * as All from "my-module";`,
    },

    // Edge cases
    "Edge cases": {
      "should not transform when bundling flag is false":
        `import { comp } from "http://localhost:3000/special?bundle=false";`,
      "live path with index.js appending": `import { Component } from "/live/components";`,
      "multiple import patterns in same file": `
        import { foo } from "module1";
        export { bar } from "module2";
        const mod = await import("module3");
        import "module4";
      `,
      "code with line comments": `
        // This is a comment
        import { foo } from "module"; // End line comment
        // Another comment
        export { bar } from "module2";
        // Final comment
      `,
      "no imports": `export default () => (
        <div>
          <h1>404 - for now.</h1>
          <h2>
            But you can edit even this page and share with your friends.
          </h2>
        </div>
      );`,
    },
    // App specific imports
    "App specific imports": {
      "should handle @/lib imports": `import { cn } from "@/lib/utils";`,
      "should handle react-extra libs": `import { extras } from "react-extras";`,
      "should not transform when already transformed":
        `import { foo } from "/special?bundle=true";`,
    },
  };

  // Test with default importMap
  for (const [description, testCases] of Object.entries(scenarios)) {
    for (const [name, code] of Object.entries(testCases)) {
      it(`${description}: ${name}`, () => {
        const result = importMapReplace(code);
        expect({ result, code }).toMatchSnapshot();
      });
    }
  }

  // Test with custom importMap
  it("should respect custom importMap", () => {
    const code = `import { feature } from "custom-module";`;
    const result = importMapReplace(code);
    expect({ result, code }).toMatchSnapshot();
  });
});
