import { importMapReplace } from "@/lib/importmap-utils";
import { describe, expect, it } from "vitest";

describe("importMapReplace", () => {
  const origin = "http://localhost:3000";

  it("should do clever top-level exports", async () => {
    const code = `import { prop, prop2 } from "foo";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`
/** importMapReplace */
import { prop, prop2 } from "${origin}/foo?bundle=true&external=react/jsx-runtime,react-dom/server,react-dom/client,@emotion/react,react,framer-motion,react-dom,recharts&exports=prop,prop2";`);
  });

  it("should handle specific exports", async () => {
    const code = `import { __await, __rest } from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`
/** importMapReplace */
import { __await, __rest } from "${origin}/tslib?bundle=true&external=react/jsx-runtime,react-dom/server,react-dom/client,@emotion/react,react,framer-motion,react-dom,recharts&exports=__await,__rest";`);
  });

  it("should handle specific named imports", async () => {
    const code = `import { __await as aw, __rest  as restNow} from "tslib";`;
    const result = importMapReplace(code, origin);
    expect(result).toBe(`
/** importMapReplace */
import { __await as aw, __rest  as restNow} from "${origin}/tslib?bundle=true&external=react/jsx-runtime,react-dom/server,react-dom/client,@emotion/react,react,framer-motion,react-dom,recharts&exports=__await,__rest";`);
  });
});
