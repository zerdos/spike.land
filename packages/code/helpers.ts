import { promises } from "node:fs";
import { env } from "node:process";
import type { Environment } from "./build-tasks";

const environment = process.env.NODE_ENV as Environment;
const { readdir } = promises;

function safeStringify(obj, indent = 2) {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (_key, value) =>
      typeof value === "object" && value !== null
        ? cache.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache.push(value) && value // Store value in our collection
        : value,
    indent,
  );
  cache = null;
  return retVal;
}

// Then use it like this:
const processInfo = safeStringify({
  version: "v20.3.1",
  nodeVersion: "v20.3.1",
  env: {
    NODE_ENV: environment || "development",
    version: "v20.3.0",
    browser: true,
    isWebworker: true,
    NODE_DEBUG: false,
    DEBUG: false,
    isBrowser: true,
  },
  browser: true,
});

export const makeEnv = (environment: Environment) => ({
  "process.env.NODE_ENV": JSON.stringify(environment || "development"),
  "process.env.NODE_DEBUG": JSON.stringify(false),
  "process.platform": JSON.stringify("browser"),
  "process.browser": JSON.stringify(true),
  "process.env.DEBUG": JSON.stringify(false),
  "isBrowser": JSON.stringify(true),
  "isJest": JSON.stringify(false),
  "process.env.version": JSON.stringify("1.1.1"),
  global: "globalThis",
  "WORKER_DOM_DEBUG": JSON.stringify(false),
  "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
  processInfo,
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
