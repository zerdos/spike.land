import { importMapReplace, defaultImportMap, ImportMap } from "@/lib/importmap-utils";
import { describe, expect, it, beforeEach } from "vitest";

describe("importMapReplace", () => {
  // Helper function to test transformations
  const expectTransformation = (input: string, expected: string, customImportMap?: ImportMap["imports"]) => {
    const result = importMapReplace(input, customImportMap);
    // Remove the marker comment for comparison
    const resultWithoutMarker = result.replace(/^\/\*\* importMapReplace \*\/\n/, "");
    expect(resultWithoutMarker).toBe(expected);
  };

  // Helper to verify no transformation (except adding marker)
  const expectNoTransformation = (input: string, customImportMap?: ImportMap["imports"]) => {
    const result = importMapReplace(input, customImportMap);
    const resultWithoutMarker = result.replace(/^\/\*\* importMapReplace \*\/\n/, "");
    expect(resultWithoutMarker).toBe(input);
  };

  describe("Basic Import Transformations", () => {
    it("should transform simple imports without extension", () => {
      expectTransformation(
        `import "./utils";`,
        `import "./utils.mjs";`
      );
    });

    it("should transform named imports from external packages", () => {
      expectTransformation(
        `import { useState } from "react";`,
        `import { useState } from "/react";`
      );
    });

    it("should transform default imports", () => {
      expectTransformation(
        `import React from "react";`,
        `import React from "/react";`
      );
    });

    it("should transform mixed default and named imports", () => {
      expectTransformation(
        `import React, { useState, useEffect } from "react";`,
        `import React, { useState, useEffect } from "/react";`
      );
    });

    it("should transform namespace imports", () => {
      expectTransformation(
        `import * as utils from "./utils";`,
        `import * as utils from "./utils.mjs";`
      );
    });

    it("should handle imports with aliases", () => {
      expectTransformation(
        `import { foo as bar, baz as qux } from "./module";`,
        `import { foo as bar, baz as qux } from "./module.mjs";`
      );
    });

    it("should preserve side-effect only imports", () => {
      expectTransformation(
        `import "./polyfill";`,
        `import "./polyfill.mjs";`
      );
    });
  });

  describe("Worker File Transformations", () => {
    it("should transform worker files to .mjs with from clause", () => {
      expectTransformation(
        `import Worker from "@/workers/computation.worker";`,
        `import Worker from "/@/workers/computation.mjs";`
      );
    });

    it("should transform worker files to .js without from clause", () => {
      expectTransformation(
        `import "@/workers/service.worker";`,
        `import "/@/workers/service.js";`
      );
    });

    it("should handle worker files in subdirectories", () => {
      expectTransformation(
        `import { register } from "@/workers/sw/register";`,
        `import { register } from "/@/workers/sw/register.mjs";`
      );
    });

    it("should handle files with .worker in the name", () => {
      expectTransformation(
        `import Worker from "./my.worker.file";`,
        `import Worker from "./my.worker.mjs";`
      );
    });
  });

  describe("Component File Transformations", () => {
    it("should transform component imports", () => {
      expectTransformation(
        `import Button from "@/components/Button";`,
        `import Button from "/@/components/Button.mjs";`
      );
    });

    it("should transform service imports", () => {
      expectTransformation(
        `import { api } from "@/services/api";`,
        `import { api } from "/@/services/api.mjs";`
      );
    });

    it("should transform util imports", () => {
      expectTransformation(
        `import { cn } from "@/utils/cn";`,
        `import { cn } from "/@/utils/cn.mjs";`
      );
    });

    it("should handle nested component paths", () => {
      expectTransformation(
        `import Modal from "@/components/ui/Modal";`,
        `import Modal from "/@/components/ui/Modal.mjs";`
      );
    });
  });

  describe("Path Extension Handling", () => {
    it("should preserve existing .js extensions", () => {
      expectTransformation(
        `import { func } from "./lib.js";`,
        `import { func } from "./lib.js";`
      );
    });

    it("should preserve existing .mjs extensions", () => {
      expectTransformation(
        `import { func } from "./lib.mjs";`,
        `import { func } from "./lib.mjs";`
      );
    });

    it("should add .mjs to paths without extension", () => {
      expectTransformation(
        `import { helper } from "./utils/helper";`,
        `import { helper } from "./utils/helper.mjs";`
      );
    });

    it("should handle directory imports with trailing slash", () => {
      expectTransformation(
        `import module from "./folder/";`,
        `import module from "./folder/index.mjs";`
      );
    });

    it("should handle all supported file extensions", () => {
      const extensions = [".ts", ".tsx", ".jsx", ".json", ".css", ".svg"];
      extensions.forEach(ext => {
        expectTransformation(
          `import file from "./file${ext}";`,
          `import file from "./file${ext}";`
        );
      });
    });
  });

  describe("External Package Handling", () => {
    it("should add bundle parameters to external packages", () => {
      expectTransformation(
        `import lodash from "lodash";`,
        `import lodash from "/lodash?bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled";`
      );
    });

    it("should include exports parameter for named imports", () => {
      expectTransformation(
        `import { debounce, throttle } from "lodash";`,
        `import { debounce, throttle } from "/lodash?bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled&exports=debounce,throttle";`
      );
    });

    it("should handle scoped packages", () => {
      expectTransformation(
        `import { icon } from "@fortawesome/icons";`,
        `import { icon } from "/@fortawesome/icons?bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled&exports=icon";`
      );
    });

    it("should preserve existing query parameters", () => {
      expectTransformation(
        `import pkg from "package?version=1.0.0";`,
        `import pkg from "/package?bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled&version=1.0.0";`
      );
    });
  });

  describe("URL and Special Path Handling", () => {
    it("should not transform data URLs", () => {
      expectNoTransformation(
        `import { foo } from "data:text/javascript,export const foo = 'bar'";`
      );
    });

    it("should not transform http URLs", () => {
      expectNoTransformation(
        `import { lib } from "http://example.com/lib.js";`
      );
    });

    it("should not transform https URLs", () => {
      expectNoTransformation(
        `import { lib } from "https://cdn.example.com/lib.js";`
      );
    });

    it("should not transform paths with bundle=true", () => {
      expectNoTransformation(
        `import { lib } from "/lib?bundle=true";`
      );
    });

    it("should preserve /live/ paths", () => {
      expectNoTransformation(
        `import { Component } from "/live/components/Button";`
      );
    });

    it("should handle paths with hash fragments", () => {
      expectTransformation(
        `import { section } from "./module#section";`,
        `import { section } from "./module.mjs#section";`
      );
    });

    it("should handle paths with query and hash", () => {
      expectTransformation(
        `import { lib } from "./module?foo=bar#section";`,
        `import { lib } from "./module.mjs?foo=bar#section";`
      );
    });
  });

  describe("Dynamic Import Handling", () => {
    it("should transform simple dynamic imports", () => {
      expectTransformation(
        `const mod = await import("./module");`,
        `const mod = await import("./module.mjs");`
      );
    });

    it("should transform dynamic imports with external packages", () => {
      expectTransformation(
        `const React = await import("react");`,
        `const React = await import("/react");`
      );
    });

    it("should not transform dynamic imports with template literals", () => {
      expectNoTransformation(
        `const mod = await import(\`./modules/\${name}\`);`
      );
    });

    it("should handle dynamic imports in various contexts", () => {
      expectTransformation(
        `if (condition) {
          const mod = await import("./conditional");
        }`,
        `if (condition) {
          const mod = await import("./conditional.mjs");
        }`
      );
    });

    it("should handle Promise-style dynamic imports", () => {
      expectTransformation(
        `import("./async").then(mod => console.log(mod));`,
        `import("./async.mjs").then(mod => console.log(mod));`
      );
    });
  });

  describe("Export Statement Handling", () => {
    it("should transform re-exports", () => {
      expectTransformation(
        `export { foo } from "./module";`,
        `export { foo } from "./module.mjs";`
      );
    });

    it("should transform re-exports with rename", () => {
      expectTransformation(
        `export { foo as bar } from "./module";`,
        `export { foo as bar } from "./module.mjs";`
      );
    });

    it("should transform export all statements", () => {
      expectTransformation(
        `export * from "./module";`,
        `export * from "./module.mjs";`
      );
    });

    it("should transform re-export default", () => {
      expectTransformation(
        `export { default } from "./module";`,
        `export { default } from "./module.mjs";`
      );
    });

    it("should handle complex re-exports", () => {
      expectTransformation(
        `export { foo, bar as baz, default as MyDefault } from "./module";`,
        `export { foo, bar as baz, default as MyDefault } from "./module.mjs";`
      );
    });
  });

  describe("Import Map Handling", () => {
    it("should use paths from import map", () => {
      expectTransformation(
        `import React from "react";`,
        `import React from "/reactMod.mjs";`
      );
    });

    it("should handle emotion imports", () => {
      expectTransformation(
        `import styled from "@emotion/styled";`,
        `import styled from "/emotionStyled.mjs";`
      );
    });

    it("should handle react jsx runtime", () => {
      expectTransformation(
        `import { jsx } from "react/jsx-runtime";`,
        `import { jsx } from "/jsx.mjs";`
      );
    });

    it("should respect custom import map", () => {
      const customImportMap: ImportMap["imports"] = {
        "custom-module": "/custom/path.js",
        "another": "/another/path.mjs"
      };
      
      expectTransformation(
        `import { feature } from "custom-module";`,
        `import { feature } from "custom-module";`,
        customImportMap
      );
    });

    it("should handle @/ prefix in import map", () => {
      expectTransformation(
        `import something from "/@/some/path";`,
        `import something from "/@/some/path";`
      );
    });
  });

  describe("Edge Cases and Complex Scenarios", () => {
    it("should handle multi-line imports", () => {
      expectTransformation(
        `import {
          foo,
          bar,
          baz
        } from "./module";`,
        `import {
          foo,
          bar,
          baz
        } from "./module.mjs";`
      );
    });

    it("should handle imports with comments", () => {
      expectTransformation(
        `// Comment before
        import { foo } from "./module"; // Comment after`,
        `// Comment before
        import { foo } from "./module.mjs"; // Comment after`
      );
    });

    it("should handle unusual whitespace", () => {
      expectTransformation(
        `import    {    foo   }    from     "./module"   ;`,
        `import    {    foo   }    from     "./module.mjs"   ;`
      );
    });

    it("should handle empty import specifiers", () => {
      expectTransformation(
        `import {} from "./module";`,
        `import {} from "./module.mjs";`
      );
    });

    it("should handle single quotes", () => {
      expectTransformation(
        `import module from './my-module';`,
        `import module from './my-module.mjs';`
      );
    });

    it("should handle unicode in imports", () => {
      expectTransformation(
        `import { π, λ } from "./math";`,
        `import { π, λ } from "./math.mjs";`
      );
    });

    it("should not transform paths with template literals", () => {
      expectNoTransformation(
        "import { mod } from \"./path/${variable}/module\";"
      );
    });

    it("should not transform paths with concatenation", () => {
      expectNoTransformation(
        `import { mod } from "./path" + "/module";`
      );
    });

    it("should prevent double processing", () => {
      const alreadyProcessed = `/** importMapReplace */
import { foo } from "./module.mjs";`;
      expectNoTransformation(alreadyProcessed);
    });

    it("should handle multiple import types in same file", () => {
      const input = `import { a } from "./moduleA";
export { b } from "./moduleB";
import c from "external-package";
const d = await import("./dynamic");
export * from "./reexport";`;

      const expected = `import { a } from "./moduleA.mjs";
export { b } from "./moduleB.mjs";
import c from "/external-package?bundle=true&external=react,react-dom,framer-motion,@emotion/react,@emotion/styled";
const d = await import("./dynamic.mjs");
export * from "./reexport.mjs";`;

      expectTransformation(input, expected);
    });

    it("should handle code with no imports", () => {
      const input = `const foo = "bar";
export default foo;`;
      expectTransformation(input, input);
    });

    it("should handle deeply nested relative paths", () => {
      expectTransformation(
        `import { util } from "../../../../utils/helper";`,
        `import { util } from "../../../../utils/helper.mjs";`
      );
    });

    it("should handle current directory markers", () => {
      expectTransformation(
        `import { tool } from "./././current/path";`,
        `import { tool } from "./././current/path.mjs";`
      );
    });

    it("should handle imports in JSX", () => {
      const input = `const Component = () => {
  React.lazy(() => import("./LazyComponent"));
  return <div>Hello</div>;
};`;

      const expected = `const Component = () => {
  React.lazy(() => import("./LazyComponent.mjs"));
  return <div>Hello</div>;
};`;

      expectTransformation(input, expected);
    });
  });

  describe("Windows Path Handling", () => {
    it("should normalize CRLF to LF", () => {
      const windowsCode = `import { foo } from "./module";\r\nexport { bar } from "./another";`;
      const result = importMapReplace(windowsCode);
      expect(result).not.toContain("\r\n");
      expect(result).toContain("\n");
    });
  });

  describe("Performance and Optimization", () => {
    it("should handle large files efficiently", () => {
      const largeFile = Array(1000).fill(`import { component } from "./module";`).join("\n");
      const start = performance.now();
      importMapReplace(largeFile);
      const duration = performance.now() - start;
      expect(duration).toBeLessThan(100); // Should process in less than 100ms
    });

    it("should not transform already processed esm.sh imports", () => {
      const esmCode = `/* esm.sh */
import { foo } from "./already-processed";`;
      expectNoTransformation(esmCode);
    });
  });

  describe("Import Pattern Variations", () => {
    it("should handle imports without semicolons", () => {
      expectTransformation(
        `import { foo } from "./module"`,
        `import { foo } from "./module.mjs"`
      );
    });

    it("should handle imports with trailing semicolons in exports", () => {
      expectTransformation(
        `export { foo } from "./module";`,
        `export { foo } from "./module.mjs";`
      );
    });

    it("should handle mixed quote styles", () => {
      const input = `import { a } from './module1';
import { b } from "./module2";`;
      
      const expected = `import { a } from './module1.mjs';
import { b } from "./module2.mjs";`;
      
      expectTransformation(input, expected);
    });
  });
});