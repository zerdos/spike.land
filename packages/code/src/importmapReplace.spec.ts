import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { importMapReplace } from "./importMapUtils"; // Updated import

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
    expect(result).toMatchSnapshot();
  });

  it("should replace top-level imports with dot in the module name", async () => {
    const code = "import React from \"react.gl\";";
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should handle relative imports", async () => {
    const code = "import React from \"./box\";";
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace shadcn-ui imports", async () => {
    const code = `
    import { css } from "@emotion/react";
    import $ from "react";
    import { Button } from "@/components/ui/button";

    import { css  as $kdkd } from "@emotion/react";

    import { useEffect, useState, useRef } from "react";
    import type { FC } from "react";
    import QRTerminal from "qrcode-terminal";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should handle multiple imports from different modules", async () => {
    const code = `
    import { css } from "@emotion/react";
    import $ from "react";

    import { css  as $kdkd } from "@emotion/react";

    import { useEffect, useState, useRef } from "react";
    import type { FC } from "react";
    import QRTerminal from "qrcode-terminal";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace top-level exports, except the ones in importmap", async () => {
    const code = `import { useState } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace top-level default exports", async () => {
    const code = `export { default } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace dynamic imports", async () => {
    const code = `const React = import("react");`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should handle dynamic imports with template literals", async () => {
    const code = "const dynamic = 'dd'; const React = import(`${dynamic}dom`);";
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
    expect(result).includes("React = import(`${dynamic}dom`);");
  });

  it("should replace shadcn-ui dynamic imports", async () => {
    const code = "import React from \"@/components/ui/alert\";";
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should ignore relative URLs", async () => {
    const code = `import MyComponent from "./MyComponent";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should ignore absolute URLs", async () => {
    const code = "import MyComponent from \"http://example.com/MyComponent.js\";";
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should apply custom mappings", async () => {
    const code = "import CustomPackage from \"custom-package\";";
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace dynamic imports with await", async () => {
    const code = "const module = await import(\"some-module\");";
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace dynamic imports inside an async function", async () => {
    const code = `
    import{Buffer as De}from"/v125/buffer@6.0.3/es2024/buffer.bundle.mjs"
    let { Mp3Encoder: t } = await import("lamejs");
    import{timeDay as _,timeSunday as bt,timeMonday as b,timeThursday as w,timeYear as S,utcDay as $,utcSunday as Vt,utcMonday as V,utcThursday as p,utcYear as F}from"d3-time";
      async function loadModule() {
        let{default:c}=await import("axios");
        let{default:d}=await import("https://unpkg.com/axios/dist/axios.min.js");
        
        const module = await import("some-module");
        // do something with module
      }
    `;

    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should process JSX-related imports", async () => {
    const code =
      `eturn d.className=f,a&&(d.ref=a),O.createElement(O.Fragment,null,O.createElement(On,{cache:t,serialized:m,isStringTag:typeof c=="string"}),O.createElement(c,d))}),dr=Rn;import"react";var va=Y(Yr());var xa=Z.Fragment;function Sa(e,t,a){return me.call(t,"css")?Z.jsx(dr,pr(e,t),a):Z.jsx(e,t,a)}function Ea(e,t,a){return me.call(t,"css")?Z.jsxs(dr,pr(e,t),a):Z.jsxs(e,t,a)}";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace the live URLs", async () => {
    const code = `import Box from "/live/Box";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should not modify non-import statements", async () => {
    const code = ` eturn e[t] === r ||
              (e[t] = r,
                (t === "prop" || t === "value" || t === "name" ||
                  t === "params" || t === "important" || t === "text") &&
                e.markDirty()),
              !0;`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace dynamic imports at the end of the file", async () => {
    const code = `
    import{Buffer as De}from"/v125/buffer@6.0.3/es2024/buffer.bundle.mjs"
    let { Mp3Encoder: t } = await import("lamejs");
    import{timeDay as _,timeSunday as bt,timeMonday as b,timeThursday as w,timeYear as S,utcDay as $,utcSunday as Vt,utcMonday as V,utcThursday as p,utcYear as F}from"d3-time";
      async function loadModule() {
        let{default:c}=await import("axios");
        let{default:d}=await import("https://unpkg.com/axios/dist/axios.min.js");
        
        const module = await import("some-module");
        // do something with module
      }
        import"react/jsx-runtime";
        import"react";
        async function y(s){await s(m)}
        export{n as Particles,n as default,y as initParticlesEngine};
    `;

    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should replace imports from react-spring", async () => {
    const code = `
    import { useSpring, animated } from "react-spring"; // Importing react-spring
    `;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should handle specific named exports", async () => {
    const code = `import { prop, prop2 } from "foo";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`"${origin}/*foo?bundle=true&exports=prop,prop2"`);
    expect(result).toMatchSnapshot();
  });

  it("should handle specific exports from tslib", async () => {
    const code = `import { __await, __rest } from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`"${origin}/*tslib?bundle=true&exports=__await,__rest"`);
    expect(result).toMatchSnapshot();
  });

  it("should handle specific named imports with aliases", async () => {
    const code = `import { __await as aw, __rest  as restNow} from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`"${origin}/*tslib?bundle=true&exports=__await,__rest"`);
    expect(result).toMatchSnapshot();
  });

  it("should handle import statements with multiple named imports", async () => {
    const code = `import { useState, useEffect, useCallback } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should handle import statements with both default and named imports", async () => {
    const code = `import React, { useState, useEffect } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should handle import statements with namespace imports", async () => {
    const code = `import * as React from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should handle import statements with default imports and aliases", async () => {
    const code = `import ReactDOM from "react-dom/client";`;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it.only("should handle multiple import statements", async () => {
    const code = `
      import React from "react";
      import { useState } from "react";
      import axios from "axios";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  // New test cases
  it("should handle imports with file extensions", async () => {
    const code = `
      import MyModule from "./myModule.js";
      import MyTypeScriptModule from "./myModule.ts";
      import MyJSXModule from "./myModule.jsx";
      import MyTSXModule from "./myModule.tsx";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should handle imports starting with @/", async () => {
    const code = `
      import MyComponent from "@/components/MyComponent";
      import MyUtil from "@/utils/MyUtil";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });

  it("should not modify code that already contains importMapReplace", async () => {
    const code = `
      /** importMapReplace */
      import React from "react";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
  });

  it("should handle imports with query parameters", async () => {
    const code = `
      import MyModule from "my-module?param1=value1&param2=value2";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toMatchSnapshot();
  });
});
