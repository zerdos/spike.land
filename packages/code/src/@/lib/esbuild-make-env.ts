import type { Environment } from "./esbuild-build-tasks.ts";

export type { Environment };
export const environment = process.env["NODE_ENV"] as Environment;

export const makeEnv = (
  environment: Environment,
): {
  "process.env['NODE_ENV']": string;
  "process.env['NODE_DEBUG']": string;
  "process.platform": string;
  "process.browser": string;
  "process.env['BABEL_TYPES_8_BREAKING']": string;
  "process.env['DEBUG']": string;
  "process.versions.node": string;
  "process.versions.pnp": string;
  "process.version.node": string;
  "process.env['LANG']": string;
  "process.env.isBrowser": string;
  "process.env.isWebworker": string;
  "process.env['VI_TEST']": string;
  isBrowser: string;
  isJest: string;
  "process.env.version": string;
  global: string;
  WORKER_DOM_DEBUG: string;
  "process.env['DUMP_SESSION_KEYS']": string;
  version: string;
  nodeVersion: string;
  env: string;
  browser: string;
} => ({
  "process.env['NODE_ENV']": JSON.stringify(environment || "development"),
  "process.env['NODE_DEBUG']": JSON.stringify(false),
  "process.platform": JSON.stringify("browser"),
  "process.browser": JSON.stringify(true),
  "process.env['BABEL_TYPES_8_BREAKING']": JSON.stringify(false),
  "process.env['DEBUG']": JSON.stringify(false),
  "process.versions.node": JSON.stringify("v20.3.1"),
  "process.versions.pnp": JSON.stringify(false),
  "process.version.node": JSON.stringify("v20.3.1"),
  "process.env.isBrowser": JSON.stringify(true),
  "process.env['LANG']": JSON.stringify("en_US.UTF-8"),
  "process.env.isWebworker": JSON.stringify(true),
  "process.env['VI_TEST']": JSON.stringify(false),
  "isBrowser": JSON.stringify(true),
  "isJest": JSON.stringify(false),

  "process.env.version": JSON.stringify("1.1.1"),
  global: "globalThis",
  "WORKER_DOM_DEBUG": JSON.stringify(false),
  "process.env['DUMP_SESSION_KEYS']": JSON.stringify(false),
  version: JSON.stringify("v20.3.1"),

  nodeVersion: JSON.stringify("v20.3.1"),
  env: JSON.stringify({
    NODE_ENV: environment || "development",
    BABEL_TYPES_8_BREAKING: JSON.stringify(false),
    version: "v20.3.0",
    browser: JSON.stringify(true),
    isWebworker: JSON.stringify(true),
    NODE_DEBUG: JSON.stringify(true),
    DEBUG: JSON.stringify(false),
    isBrowser: JSON.stringify(true),
  }),
  browser: JSON.stringify(true),
});
