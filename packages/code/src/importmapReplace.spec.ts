import { describe, expect, it } from "vitest";
import { importMapReplace } from "./importMapUtils";

describe("importMapReplace", () => {
  const origin = "http://localhost:3000";

  it("should replace top-level imports", () => {
    const code = "import React from \"react\";";
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\nimport React from "${origin}/reactMod.mjs";`);
  });

  it("should replace top-level imports with dot in the module name", () => {
    const code = "import React from \"react.gl\";";
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\nimport React from "${origin}/*react.gl?bundle";`);
  });

  it("should handle relative imports", () => {
    const code = "import React from \"./box\";";
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\nimport React from "${origin}/live/box/index.js";`);
  });

  it("should replace shadcn-ui imports", () => {
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
    expect(result).toBe(`/** importMapReplace */
    import { css } from "${origin}/*@emotion/react?bundle";
    import $ from "${origin}/reactMod.mjs";
    import { Button } from "${origin}/@/components/ui/button.mjs";

    import { css  as $kdkd } from "${origin}/*@emotion/react?bundle";

    import { useEffect, useState, useRef } from "${origin}/reactMod.mjs";
    import type { FC } from "${origin}/reactMod.mjs";
    import QRTerminal from "${origin}/*qrcode-terminal?bundle";
    `);
  });

  it("should replace top-level exports", () => {
    const code = `export { default } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\nexport { default } from "${origin}/reactMod.mjs";`);
  });

  it("should replace dynamic imports", () => {
    const code = `const React = import("react");`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\nconst React = import("${origin}/reactMod.mjs");`);
  });

  it("should handle dynamic imports with template literals", () => {
    const code = "const dynamic = 'dd'; const React = import(`${dynamic}dom`);";
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\nconst dynamic = 'dd'; const React = import(\`\${dynamic}dom\`);`);
  });

  it("should ignore absolute URLs", () => {
    const code = "import MyComponent from \"http://example.com/MyComponent.js\";";
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\n${code}`);
  });

  it("should replace dynamic imports with await", () => {
    const code = "const module = await import(\"some-module\");";
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\nconst module = await import("${origin}/*some-module?bundle");`);
  });

  it("should replace dynamic imports inside an async function", () => {
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
    expect(result).toBe(`/** importMapReplace */
    import{Buffer as De}from"/v125/buffer@6.0.3/es2024/buffer.bundle.mjs"
    let { Mp3Encoder: t } = await import("${origin}/*lamejs?bundle");
    import{timeDay as _,timeSunday as bt,timeMonday as b,timeThursday as w,timeYear as S,utcDay as $,utcSunday as Vt,utcMonday as V,utcThursday as p,utcYear as F}from"${origin}/*d3-time?bundle";
      async function loadModule() {
        let{default:c}=await import("${origin}/*axios?bundle");
        let{default:d}=await import("https://unpkg.com/axios/dist/axios.min.js");
        
        const module = await import("${origin}/*some-module?bundle");
        // do something with module
      }
    `);
  });

  it("should process JSX-related imports", () => {
    const code =
      `eturn d.className=f,a&&(d.ref=a),O.createElement(O.Fragment,null,O.createElement(On,{cache:t,serialized:m,isStringTag:typeof c=="string"}),O.createElement(c,d))}),dr=Rn;import"react";var va=Y(Yr());var xa=Z.Fragment;function Sa(e,t,a){return me.call(t,"css")?Z.jsx(dr,pr(e,t),a):Z.jsx(e,t,a)}function Ea(e,t,a){return me.call(t,"css")?Z.jsxs(dr,pr(e,t),a):Z.jsxs(e,t,a)}";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */
eturn d.className=f,a&&(d.ref=a),O.createElement(O.Fragment,null,O.createElement(On,{cache:t,serialized:m,isStringTag:typeof c=="string"}),O.createElement(c,d))}),dr=Rn;import"${origin}/reactMod.mjs";var va=Y(Yr());var xa=Z.Fragment;function Sa(e,t,a){return me.call(t,"css")?Z.jsx(dr,pr(e,t),a):Z.jsx(e,t,a)}function Ea(e,t,a){return me.call(t,"css")?Z.jsxs(dr,pr(e,t),a):Z.jsxs(e,t,a)}";`);
  });

  it("should replace the live URLs", () => {
    const code = `import Box from "/live/Box";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\nimport Box from "${origin}/live/Box/index.js";`);
  });

  it("should not modify non-import statements", () => {
    const code = ` eturn e[t] === r ||
              (e[t] = r,
                (t === "prop" || t === "value" || t === "name" ||
                  t === "params" || t === "important" || t === "text") &&
                e.markDirty()),
              !0;`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\n${code}`);
  });

  it("should replace dynamic imports at the end of the file", () => {
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
    expect(result).toBe(`/** importMapReplace */
    import{Buffer as De}from"/v125/buffer@6.0.3/es2024/buffer.bundle.mjs"
    let { Mp3Encoder: t } = await import("${origin}/*lamejs?bundle");
    import{timeDay as _,timeSunday as bt,timeMonday as b,timeThursday as w,timeYear as S,utcDay as $,utcSunday as Vt,utcMonday as V,utcThursday as p,utcYear as F}from"${origin}/*d3-time?bundle";
      async function loadModule() {
        let{default:c}=await import("${origin}/*axios?bundle");
        let{default:d}=await import("https://unpkg.com/axios/dist/axios.min.js");
        
        const module = await import("${origin}/*some-module?bundle");
        // do something with module
      }
        import"${origin}/reactMod.mjs";
        import"${origin}/reactMod.mjs";
        async function y(s){await s(m)}
        export{n as Particles,n as default,y as initParticlesEngine};
    `);
  });

  it("should replace imports from react-spring", () => {
    const code = `
    import { useSpring, animated } from "react-spring"; // Importing react-spring
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */
    import { useSpring, animated } from "${origin}/*react-spring?bundle"; // Importing react-spring
    `);
  });

  it("should handle specific named exports", () => {
    const code = `import { prop, prop2 } from "foo";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(
      `/** importMapReplace */\nimport { prop, prop2 } from "${origin}/*foo?bundle&exports=prop%2C%20prop2";`,
    );
  });

  it("should handle specific exports from tslib", () => {
    const code = `import { __await, __rest } from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(
      `/** importMapReplace */\nimport { __await, __rest } from "${origin}/*tslib?bundle&exports=__await%2C%20__rest";`,
    );
  });

  it("should handle specific named imports with aliases", () => {
    const code =
      `import { __await as aw, __rest  as restNow} from "http://localhost:3000/*tslib?bundle&exports=__await%20as%20aw%2C%20__rest%20as%20restNow";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(
      `/** importMapReplace */\nimport { __await as aw, __rest  as restNow} from "${origin}/*tslib?bundle&exports=__await%2C%20__rest";`,
    );
  });

  it("should handle import statements with multiple named imports", () => {
    const code = `import { useState, useEffect, useCallback } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(
      `/** importMapReplace */\nimport { useState, useEffect, useCallback } from "${origin}/reactMod.mjs";`,
    );
  });

  it("should handle import statements with both default and named imports", () => {
    const code = `import React, { useState, useEffect } from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(
      `/** importMapReplace */\nimport React, { useState, useEffect } from "${origin}/reactMod.mjs";`,
    );
  });

  it("should handle import statements with namespace imports", () => {
    const code = `import * as React from "react";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\nimport * as React from "${origin}/reactMod.mjs";`);
  });

  it("should handle import statements with default imports and aliases", () => {
    const code = `import ReactDOM from "react-dom/client";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */\nimport ReactDOM from "${origin}/*react-dom/client?bundle";`);
  });

  it("should handle multiple import statements", () => {
    const code = `
      import React from "react";
      import { useState } from "react";
      import axios from "axios";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */
      import React from "${origin}/reactMod.mjs";
      import { useState } from "${origin}/reactMod.mjs";
      import axios from "${origin}/*axios?bundle";
    `);
  });

  it("should handle imports with file extensions", () => {
    const code = `
      import MyModule from "./myModule.js";
      import MyTypeScriptModule from "./myModule.ts";
      import MyJSXModule from "./myModule.jsx";
      import MyTSXModule from "./myModule.tsx";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */
      import MyModule from "${origin}/live/myModule.js/index.js";
      import MyTypeScriptModule from "${origin}/live/myModule.ts/index.js";
      import MyJSXModule from "${origin}/live/myModule.jsx/index.js";
      import MyTSXModule from "${origin}/live/myModule.tsx/index.js";
    `);
  });

  it("should handle imports starting with @/", () => {
    const code = `
      import MyComponent from "@/components/MyComponent";
      import MyUtil from "@/utils/MyUtil";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */
      import MyComponent from "${origin}/@/components/MyComponent.mjs";
      import MyUtil from "${origin}/@/utils/MyUtil.mjs";
    `);
  });

  it("should not modify code that already contains importMapReplace", () => {
    const code = `
/** importMapReplace */
      import React from "http://localhost:3000/reactMod.mjs";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(code);
  });

  it("should handle imports with query parameters", () => {
    const code = `
      import MyModule from "my-module?param1=value1&param2=value2";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */
      import MyModule from "${origin}/*my-module?param1=value1&param2=value2&bundle";
    `);
  });

  it("should handle exports", () => {
    const code = `
    export { default } from "/v135/@okikio/sharedworker@1.0.7/X-ZS8q/es2022/sharedworker.bundle.mjs";
    `;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`/** importMapReplace */
    export { default } from "/v135/@okikio/sharedworker@1.0.7/X-ZS8q/es2022/sharedworker.bundle.mjs";
    `);
  });
});
