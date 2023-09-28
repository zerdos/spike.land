import { readDir } from "./esbuild-depts.mjs";
const environment = Deno.env.get("NODE_ENV") === "production"
  ? "production"
  : "development";

const isDevelopment = environment !== "production";

const outdir = "dist";
const target = "chrome88";

console.log(`
-------------------------------------------------
--------------${environment}---------------------   
-------------------------------------------------
-------------------------------------------------`);

export const makeEnv = (environment) => ({
  "process.env.NODE_ENV": `"${environment}"`,
  "process.env.NODE_DEBUG": JSON.stringify(false),
  "process.browser": JSON.stringify(true),
  "process.env.DEBUG": JSON.stringify(false),
  "isBrowser": JSON.stringify(true),
  "isJest": JSON.stringify(false),
  "process.env.version": '"1.1.1"',
  global: "globalThis",

  "WORKER_DOM_DEBUG": JSON.stringify(false),
  "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
  // "libFileMap": JSON.stringify({}),
  process: JSON.stringify({
    version: "v20.3.1",
    versions: {
      node: "v20.3.1",
    },
    cwd: function () {
      return "/";
    },

    env: {
      NODE_ENV: `${environment}`,
      version: "v20.3.0",
      cwd: function () {
        return "/";
      },
      browser: true,
      isWebworker: true,
      NODE_DEBUG: false,
      DEBUG: false,
      isBrowser: true,
    },
    browser: true,
  }),
});
const define = makeEnv(environment);

export const getWasmFile = async () => {
  const dir = await readDir("./dist");
  for await (const file of dir) {
    if (file.name.includes("esbuild") && file.name.includes(".wasm")) {
      return file.name;
    }
  }
};
