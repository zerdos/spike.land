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
    expect(result).toBe(`import React from "${origin}/reactMod.mjs";`);
  });

  it("should replace top-level imports with dot in the path", async () => {
    const code = "import React from \"react.gl\";";
    const result = importMapReplace(code, origin);
    expect(result).toBe(`import React from "${origin}/*react.gl?bundle";`);
  });

  it("should not replace relative imports", async () => {
    const code = "import React from \"./box\";";
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
  });

  it("should replace shadcn imports", async () => {
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
    expect(result).toContain(`import { css } from "${origin}/emotion.mjs"`);
    expect(result).toContain(`import $ from "${origin}/reactMod.mjs"`);
    expect(result).toContain(`import { Button } from "${origin}/@/components/ui/button.mjs"`);
    expect(result).toContain(`import { css  as $kdkd } from "${origin}/emotion.mjs"`);
    expect(result).toContain(`import { useEffect, useState, useRef } from "${origin}/reactMod.mjs"`);
    expect(result).toContain(`import QRTerminal from "${origin}/*qrcode-terminal?bundle"`);
  });

  it("should replace multiple imports", async () => {
    const code = `
    import { css } from "@emotion/react";
    import $ from "react";

    import { css  as $kdkd } from "@emotion/react";

    import { useEffect, useState, useRef } from "react";
    import type { FC } from "react";
    import QRTerminal from "qrcode-terminal";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import { css } from "${origin}/emotion.mjs"`);
    expect(result).toContain(`import $ from "${origin}/reactMod.mjs"`);
    expect(result).toContain(`import { css  as $kdkd } from "${origin}/emotion.mjs"`);
    expect(result).toContain(`import { useEffect, useState, useRef } from "${origin}/reactMod.mjs"`);
    expect(result).toContain(`import QRTerminal from "${origin}/*qrcode-terminal?bundle"`);
  });

  it("should replace top-level exports, except the ones in importmap", async () => {
    const code = `import { useState } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`import { useState } from "${origin}/reactMod.mjs";`);
  });

  it("should replace top-level exports", async () => {
    const code = `export { default } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`export { default } from "${origin}/reactMod.mjs";`);
  });

  it("should replace dynamic imports", async () => {
    const code = `const React = import("react");`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`const React = import("${origin}/reactMod.mjs");`);
  });

  it("should replace dynamic imports with template literals", async () => {
    const code = "const dynamic = 'dd'; const React = import(`${dynamic}dom`);";
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
  });

  it("should replace shadcn dynamic imports", async () => {
    const code = "import React from \"@/components/ui/alert\";";
    const result = importMapReplace(code, origin);
    expect(result).toBe(`import React from "${origin}/@/components/ui/alert.mjs";`);
  });

  it("should ignore relative URLs", async () => {
    const code = `import MyComponent from "./MyComponent";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
  });

  it("should ignore absolute URLs", async () => {
    const code = "import MyComponent from \"http://example.com/MyComponent.js\";";
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
  });

  it("should apply custom mappings", async () => {
    const code = "import CustomPackage from \"custom-package\";";
    const result = importMapReplace(code, origin);
    expect(result).toBe(`import CustomPackage from "${origin}/*custom-package?bundle";`);
  });

  it("should replace dynamic imports with await", async () => {
    const code = "const module = await import(\"some-module\");";
    const result = importMapReplace(code, origin);
    expect(result).toBe(`const module = await import("${origin}/*some-module?bundle");`);
  });

  it("should replace dynamic imports inside a function", async () => {
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
    expect(result).toContain(`import{Buffer as De}from"/v125/buffer@6.0.3/es2024/buffer.bundle.mjs"`);
    expect(result).toContain(`let { Mp3Encoder: t } = await import("${origin}/*lamejs?bundle");`);
    expect(result).toContain(
      `import{timeDay as _,timeSunday as bt,timeMonday as b,timeThursday as w,timeYear as S,utcDay as $,utcSunday as Vt,utcMonday as V,utcThursday as p,utcYear as F}from"${origin}/*d3-time?bundle=true&exports=timeDay,timeSunday,timeMonday,timeThursday,timeYear,utcDay,utcSunday,utcMonday,utcThursday,utcYear"`,
    );
    expect(result).toContain(`let{default:c}=await import("${origin}/*axios?bundle");`);
    expect(result).toContain(`let{default:d}=await import("https://unpkg.com/axios/dist/axios.min.js");`);
    expect(result).toContain(`const module = await import("${origin}/*some-module?bundle");`);
  });

  it("should process complex import scenarios", async () => {
    const code =
      `eturn d.className=f,a&&(d.ref=a),O.createElement(O.Fragment,null,O.createElement(On,{cache:t,serialized:m,isStringTag:typeof c=="string"}),O.createElement(c,d))}),dr=Rn;import"react";var va=Y(Yr());var xa=Z.Fragment;function Sa(e,t,a){return me.call(t,"css")?Z.jsx(dr,pr(e,t),a):Z.jsx(e,t,a)}function Ea(e,t,a){return me.call(t,"css")?Z.jsxs(dr,pr(e,t),a):Z.jsxs(e,t,a)}";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`import"${origin}/reactMod.mjs"`);
  });

  it("should replace the live urls", async () => {
    const code = `import Box from "/live/Box";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`import Box from "${origin}/live/Box/index.js";`);
  });

  it("should not modify non-import code", async () => {
    const code = `eturn e[t] === r ||
              (e[t] = r,
                (t === "prop" || t === "value" || t === "name" ||
                  t === "params" || t === "important" || t === "text") &&
                e.markDirty()),
              !0;`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
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
    expect(result).toContain(`import{Buffer as De}from"/v125/buffer@6.0.3/es2024/buffer.bundle.mjs"`);
    expect(result).toContain(`let { Mp3Encoder: t } = await import("${origin}/*lamejs?bundle");`);
    expect(result).toContain(
      `import{timeDay as _,timeSunday as bt,timeMonday as b,timeThursday as w,timeYear as S,utcDay as $,utcSunday as Vt,utcMonday as V,utcThursday as p,utcYear as F}from"${origin}/*d3-time?bundle=true&exports=timeDay,timeSunday,timeMonday,timeThursday,timeYear,utcDay,utcSunday,utcMonday,utcThursday,utcYear"`,
    );
    expect(result).toContain(`let{default:c}=await import("${origin}/*axios?bundle");`);
    expect(result).toContain(`let{default:d}=await import("https://unpkg.com/axios/dist/axios.min.js");`);
    expect(result).toContain(`const module = await import("${origin}/*some-module?bundle");`);
    expect(result).toContain(`import"${origin}/jsx.mjs"`);
    expect(result).toContain(`import"${origin}/reactMod.mjs"`);
  });

  it("should replace imports from react-spring", async () => {
    const code = `import { useSpring, animated } from "react-spring"; // Importing react-spring`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(
      `import { useSpring, animated } from "${origin}/*react-spring?bundle=true&exports=useSpring,animated"; // Importing react-spring`,
    );
  });

  it("should do clever top-level exports", async () => {
    const code = `import { prop, prop2 } from "foo";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`"${origin}/*foo?bundle=true&exports=prop,prop2"`);
  });

  it("should handle specific exports", async () => {
    const code = `import { __await, __rest } from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`"${origin}/*tslib?bundle=true&exports=__await,__rest"`);
  });

  it("should handle specific named imports", async () => {
    const code = `import { __await as aw, __rest  as restNow} from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toContain(`"${origin}/*tslib?bundle=true&exports=__await,__rest"`);
  });

  it("doesn't modify non-import statements", async () => {
    const code = `const setup = {
    jsxImportSource: "@emotion/react",
    };`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
  });

  it("should handle multiple imports on a single line", async () => {
    const code = `import React from "react"; import { useState } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(
      `import React from "${origin}/reactMod.mjs"; import { useState } from "${origin}/reactMod.mjs";`,
    );
  });

  it("should handle imports with comments", async () => {
    const code = `// This is a comment
import React from "react"; // This is an inline comment
/* This is a block comment */
import { useState } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`// This is a comment
import React from "${origin}/reactMod.mjs"; // This is an inline comment
/* This is a block comment */
import { useState } from "${origin}/reactMod.mjs";`);
  });
});
