import { promises } from "node:fs";
import { env } from "node:process";
import type { Environment } from "./build-tasks";

const environment = process.env.NODE_ENV as Environment;
const { readdir } = promises;

export const makeEnv = (environment: Environment) => ({
  "process.env.NODE_ENV": JSON.stringify(environment || "development"),
  "process.env.NODE_DEBUG": JSON.stringify(false),
  "process.platform": JSON.stringify("browser"),
  "process.browser": JSON.stringify(true),
  "process.env.DEBUG": JSON.stringify(false),
  "process.versions.node": JSON.stringify("v20.3.1"),
  "process.versions.pnp": JSON.stringify(false),
  "process.version.node": JSON.stringify("v20.3.1"),
  "process.env.isBrowser": JSON.stringify(true),
  "process.env.isWebworker": JSON.stringify(true),
  "isBrowser": JSON.stringify(true),
  "isJest": JSON.stringify(false),

  "process.env.version": JSON.stringify("1.1.1"),
  global: "globalThis",
  "WORKER_DOM_DEBUG": JSON.stringify(false),
  "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
  version: JSON.stringify("v20.3.1"),

  nodeVersion: JSON.stringify("v20.3.1"),
  env: JSON.stringify({
    NODE_ENV: environment || "development",
    version: "v20.3.0",
    browser: JSON.stringify(true),
    isWebworker: JSON.stringify(true),
    NODE_DEBUG: JSON.stringify(true),
    DEBUG: JSON.stringify(false),
    isBrowser: JSON.stringify(true),
  }),
  browser: JSON.stringify(true),
});

export const getWasmFile = async () => {
  const dir = await readdir("./dist");
  for await (const file of dir) {
    if (file.includes("esbuild") && file.includes(".wasm")) {
      return file;
    }
  }
  throw new Error("WASM file not found");
};
