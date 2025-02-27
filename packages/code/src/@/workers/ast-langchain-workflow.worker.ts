Object.assign(globalThis, {
  process: {
    cwd: () => "/",
    emitWarning: () => {},
    env: { NODE_ENV: "development" },
    platform: "browser",
  },
});

import { createAstWorkflow } from "@/workflows/ast-code-workflow";

export { createAstWorkflow };
// Export the workflow for global access
Object.assign(globalThis, { createAstWorkflow });
