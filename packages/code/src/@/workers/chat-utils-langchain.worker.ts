

Object.assign(globalThis, {
    process: {
      cwd: () => "/",
      emitWarning: () => {},
      env: { NODE_ENV: "development" },
      platform: "browser",
    },
  });

import { createWorkflow } from "@/workflows/chat-langchain-workflow";


export { createWorkflow };
// Export the workflow for global access
Object.assign(globalThis, { createWorkflow });
